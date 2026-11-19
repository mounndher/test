import { eq } from "drizzle-orm";
import { db } from "@/db";
import { admins } from "@/db/schema";
import { verifyPassword } from "@/lib/password";
import { createSession, setSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, number[]>();

function limited(key: string) {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  const blocked = recent.length >= MAX_ATTEMPTS;
  if (!blocked) recent.push(now);
  attempts.set(key, recent);
  if (attempts.size > 2000) {
    for (const [k, times] of attempts) if (now - (times[times.length - 1] ?? 0) >= WINDOW_MS) attempts.delete(k);
  }
  return blocked;
}

function reply(code: string, status: number, headers: Record<string, string> = {}) {
  return Response.json({ ok: false, code }, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

/** JSON login endpoint: no multipart Server Action transport involved. */
export async function POST(request: Request) {
  // CSRF protection: JSON-only requests (no simple cross-origin form POST), SameSite=Lax
  // session cookie, and no CORS headers allowing another origin to read the response.
  // The public host is not compared here because Vercel's proxy may rewrite Host.
  if (!request.headers.get("content-type")?.includes("application/json")) return reply("unavailable", 415);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(`login:${ip}`)) return reply("limite", 429, { "Retry-After": "600" });
  if (Number(request.headers.get("content-length") ?? 0) > 4096) return reply("unavailable", 413);

  let body: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 4096) return reply("unavailable", 413);
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return reply("unavailable", 400);
    body = parsed as Record<string, unknown>;
  } catch {
    return reply("unavailable", 400);
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password || email.length > 254 || password.length > 1024) return reply("identifiants", 400);

  try {
    const rows = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
    const admin = rows[0];
    if (!admin || !verifyPassword(password, admin.passwordHash)) return reply("identifiants", 401);
    const token = await createSession(admin.id);
    await db.update(admins).set({ lastLoginAt: new Date() }).where(eq(admins.id, admin.id));
    await setSessionCookie(token);
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("[admin-login] database/session error:", error instanceof Error ? error.name : "unknown");
    return reply("unavailable", 503);
  }
}
