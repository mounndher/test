import { SITE } from "@/content/site";
import { parseContactBody, validateContact, type ContactFields } from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_URL = "https://api.resend.com/emails";
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_BODY_BYTES = 20_000;

/**
 * Basic in-memory rate limiter (per server instance). It stops casual abuse;
 * for a distributed deployment, back it with a shared store (e.g. Upstash).
 */
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  const limited = recent.length >= MAX_REQUESTS_PER_WINDOW;
  if (!limited) recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (now - (times[times.length - 1] ?? 0) >= WINDOW_MS) hits.delete(key);
    }
  }
  return limited;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function reply(body: Record<string, unknown>, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

const fallback = `Vous pouvez écrire directement à ${SITE.email} ou appeler le ${SITE.phone}.`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(values: ContactFields) {
  const rows: [string, string][] = [
    ["Nom et prénom", values.nom.trim()],
    ["Adresse électronique", values.email.trim()],
    ["Téléphone", values.telephone.trim() || "—"],
    ["Société", values.societe.trim() || "—"],
    ["Nature du dossier", values.sujet],
    ["Modalité d’échange souhaitée", values.appointmentMode],
  ];
  const message = values.message.trim();

  const text = [
    ...rows.map(([label, value]) => `${label} : ${value}`),
    "",
    "Exposé de la situation :",
    message,
    "",
    `— Demande reçue via le formulaire de ${SITE.domain}. Consentement à la politique de confidentialité : oui.`,
  ].join("\n");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#101d2b;line-height:1.5">
<h2 style="font-weight:600;font-size:18px">Nouvelle demande de rendez-vous</h2>
<table style="border-collapse:collapse">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#5d5c56">${escapeHtml(label)}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
    )
    .join("")}</table>
<h3 style="font-size:15px;margin-top:20px">Exposé de la situation</h3>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>
<p style="color:#5d5c56;font-size:12px">Demande reçue via le formulaire de ${escapeHtml(SITE.domain)}. Consentement à la politique de confidentialité : oui.</p>
</div>`;

  return { text, html, subject: `Demande de rendez-vous — ${values.sujet}` };
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return reply({ ok: false, error: "Format de requête non pris en charge." }, 415);
  }

  if (isRateLimited(clientIp(request))) {
    return reply(
      {
        ok: false,
        error: `Trop de tentatives successives. Merci de patienter quelques minutes avant de réessayer. ${fallback}`,
      },
      429,
      { "Retry-After": String(Math.ceil(WINDOW_MS / 1000)) },
    );
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) {
    return reply({ ok: false, error: "Votre message est trop volumineux." }, 413);
  }

  let json: unknown;
  try {
    json = JSON.parse(rawBody);
  } catch {
    return reply({ ok: false, error: "Requête illisible. Merci de réessayer." }, 400);
  }

  const { trap, ...values } = parseContactBody(json);

  // Honeypot: real visitors never see this field. Pretend success, send nothing.
  if (trap.trim() !== "") return reply({ ok: true });

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) return reply({ ok: false, errors }, 400);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return reply(
      { ok: false, error: `L’envoi en ligne est momentanément indisponible. ${fallback}` },
      503,
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL || `${SITE.name} <contact@${SITE.domain}>`;
  const { text, html, subject } = buildEmail(values);

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email.trim(),
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`[contact] Resend responded with HTTP ${response.status}`);
      return reply(
        { ok: false, error: `Votre demande n’a pas pu être envoyée. ${fallback}` },
        502,
      );
    }
    return reply({ ok: true });
  } catch (error) {
    console.error("[contact] Resend request failed", error instanceof Error ? error.name : error);
    return reply(
      { ok: false, error: `Votre demande n’a pas pu être envoyée. ${fallback}` },
      502,
    );
  }
}
