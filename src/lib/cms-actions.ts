"use server";

import { revalidatePath } from "next/cache";
import { asc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  activityLog,
  expertises,
  facts,
  faqItems,
  media,
  navItems,
  pages,
  publications,
  revisions,
  sections,
  siteSettings,
} from "@/db/schema";
import { readSession } from "@/lib/auth";

/**
 * Toutes les actions d'administration. Chaque écriture :
 * 1. vérifie la session (défense en profondeur, en plus du layout et du proxy) ;
 * 2. écrit en base ;
 * 3. journalise dans activity_log ;
 * 4. appelle revalidatePath pour que le site public régénère les pages concernées.
 */
const PUBLIC_PATHS = [
  "/",
  "/contact",
  "/le-cabinet",
  "/publications",
  "/contentieux-commercial",
  "/conflits-entre-associes",
  "/responsabilite-des-dirigeants",
  "/contentieux-post-acquisition",
  "/rupture-brutale-concurrence-deloyale",
  "/procedures-d-urgence",
  "/contentieux-international",
  "/mentions-legales",
  "/politique-de-confidentialite",
];

async function requireAdmin() {
  const session = await readSession();
  if (!session) throw new Error("Session administrateur requise.");
  return session;
}

function text(value: FormDataEntryValue | null, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function lines(value: FormDataEntryValue | null): string[] {
  return text(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

async function log(adminId: number, action: string, entityType: string, entityId: number | null, details: unknown) {
  await db.insert(activityLog).values({ adminId, action, entityType, entityId, details });
}

async function snapshot(entityType: string, entityId: number, adminId: number) {
  const data = await db.execute(
    sql`select to_jsonb(t) as snapshot from ${sql.raw(entityType)} t where id = ${entityId}`,
  );
  const row = (data.rows?.[0] ?? null) as { snapshot?: unknown } | null;
  if (row?.snapshot) {
    await db.insert(revisions).values({ entityType, entityId, snapshot: row.snapshot as object, createdBy: adminId });
  }
}

/** Revalidation ciblée : accueil + pages modifiées + métadonnées partagées. */
function refresh(paths: string[] = PUBLIC_PATHS) {
  for (const path of paths) revalidatePath(path);
  revalidatePath("/admin");
}

/* ───────────────────────────── Réglages ───────────────────────────── */

export async function saveSettingsAction(formData: FormData) {
  const admin = await requireAdmin();
  const key = text(formData.get("key"));
  if (!key || key === "protected-texts") throw new Error("Réglage non modifiable.");

  const current = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
  const existing = (current[0]?.value ?? {}) as Record<string, unknown>;
  const patch: Record<string, unknown> = {};

  for (const [field, raw] of formData.entries()) {
    if (field === "key" || field === "$ACTION_ID") continue;
    if (field.endsWith("__number")) {
      patch[field.replace("__number", "")] = Number(raw) || 0;
    } else if (field.endsWith("__bool")) {
      patch[field.replace("__bool", "")] = raw === "on" || raw === "true";
    } else if (field.endsWith("__lines")) {
      patch[field.replace("__lines", "")] = lines(raw);
    } else {
      patch[field] = text(raw);
    }
  }

  const merged = { ...existing, ...patch };
  if (key === "identity" && typeof merged.founded === "string") merged.founded = Number(merged.founded);
  if (key === "contact") {
    const email = String(merged.email ?? "");
    merged.phoneHref = `tel:${String(merged.phoneE164 ?? merged.phoneHref ?? "").replace(/[^\d+]/g, "")}`;
    if (email) merged.email = email;
  }

  await db
    .insert(siteSettings)
    .values({ key, value: merged, updatedAt: new Date() })
    .onConflictDoUpdate({ target: siteSettings.key, set: { value: merged, updatedAt: new Date() } });

  await log(admin.adminId, "settings.update", "site_settings", null, { key, fields: Object.keys(patch) });
  refresh();
}

/* ───────────────────────────── Accueil : sections ───────────────────────────── */

export async function toggleSectionAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  const enabled = text(formData.get("enabled")) === "true";
  await db.update(sections).set({ enabled, updatedAt: new Date() }).where(eq(sections.id, id));
  await log(admin.adminId, "section.toggle", "sections", id, { enabled });
  refresh();
}

export async function moveSectionAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  const direction = text(formData.get("direction")) === "up" ? -1 : 1;
  const rows = await db.select({ id: sections.id, position: sections.position }).from(sections).orderBy(asc(sections.position));
  const index = rows.findIndex((r) => r.id === id);
  const swapWith = index + direction;
  if (index >= 0 && swapWith >= 0 && swapWith < rows.length) {
    const a = rows[index];
    const b = rows[swapWith];
    await db.update(sections).set({ position: b.position }).where(eq(sections.id, a.id));
    await db.update(sections).set({ position: a.position }).where(eq(sections.id, b.id));
    await log(admin.adminId, "section.move", "sections", id, { direction });
    refresh();
  }
}

export async function saveSectionAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  const rows = await db.select().from(sections).where(eq(sections.id, id)).limit(1);
  const section = rows[0];
  if (!section) return;

  const { $ACTION_ID, id: _id, ...raw } = Object.fromEntries(formData.entries()) as Record<string, string>;
  void $ACTION_ID;
  void _id;
  const patch: Record<string, string | string[]> = {};
  for (const [field, value] of Object.entries(raw)) {
    patch[field.replace(/__lines$/, "")] = field.endsWith("__lines") ? lines(value) : value;
  }
  const content = { ...((section.content ?? {}) as Record<string, unknown>), ...patch };
  await snapshot("sections", id, admin.adminId);
  await db.update(sections).set({ content, updatedAt: new Date() }).where(eq(sections.id, id));
  await log(admin.adminId, "section.update", "sections", id, { fields: Object.keys(patch) });
  refresh();
}

/* ───────────────────────────── Expertises ───────────────────────────── */

export async function saveExpertiseAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  const rows = await db.select().from(expertises).where(eq(expertises.id, id)).limit(1);
  const current = rows[0];
  if (!current) return;

  const patch = {
    hook: text(formData.get("hook")),
    eyebrow: text(formData.get("eyebrow")),
    h1: text(formData.get("h1")),
    intro: lines(formData.get("intro")),
    situationsTitle: text(formData.get("situationsTitle")),
    situationsText: text(formData.get("situationsText")),
    situationsBullets: lines(formData.get("situationsBullets")),
    enjeuxTitle: text(formData.get("enjeuxTitle")),
    enjeuxParagraphs: lines(formData.get("enjeuxParagraphs")),
    enjeuxPoints: lines(formData.get("enjeuxPoints")),
    conduiteTitle: text(formData.get("conduiteTitle")),
    conduiteParagraphs: lines(formData.get("conduiteParagraphs")),
    scenariosTitle: text(formData.get("scenariosTitle")),
    contactSubject: text(formData.get("contactSubject"), current.contactSubject),
  };
  await snapshot("expertises", id, admin.adminId);
  await db.update(expertises).set({ ...patch, updatedAt: new Date() }).where(eq(expertises.id, id));
  await log(admin.adminId, "expertise.update", "expertises", id, { slug: current.slug });
  refresh([...PUBLIC_PATHS, `/${current.slug}`, "/admin/expertises"]);
}

export async function toggleExpertiseAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  const enabled = text(formData.get("enabled")) === "true";
  await db.update(expertises).set({ enabled, updatedAt: new Date() }).where(eq(expertises.id, id));
  await log(admin.adminId, "expertise.toggle", "expertises", id, { enabled });
  refresh();
}

export async function moveExpertiseAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  const direction = text(formData.get("direction")) === "up" ? -1 : 1;
  const rows = await db.select({ id: expertises.id, position: expertises.position }).from(expertises).orderBy(asc(expertises.position));
  const index = rows.findIndex((r) => r.id === id);
  const target = index + direction;
  if (index >= 0 && target >= 0 && target < rows.length) {
    await db.update(expertises).set({ position: rows[target].position }).where(eq(expertises.id, rows[index].id));
    await db.update(expertises).set({ position: rows[index].position }).where(eq(expertises.id, rows[target].id));
    await log(admin.adminId, "expertise.move", "expertises", id, { direction });
    refresh();
  }
}

/* ───────────────────────────── FAQ ───────────────────────────── */

export async function saveFaqAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id")) || null;
  const scope = text(formData.get("scope"), "home");
  const ownerIdRaw = text(formData.get("ownerId"));
  const ownerId = ownerIdRaw ? Number(ownerIdRaw) : null;
  const values = {
    scope,
    ownerId,
    question: text(formData.get("question")),
    answer: text(formData.get("answer")),
    enabled: text(formData.get("enabled")) === "on" || text(formData.get("enabled")) === "true",
    position: Number(formData.get("position")) || 0,
    updatedAt: new Date(),
  };
  if (!values.question || !values.answer) return;

  if (id) {
    await snapshot("faq_items", id, admin.adminId);
    await db.update(faqItems).set(values).where(eq(faqItems.id, id));
    await log(admin.adminId, "faq.update", "faq_items", id, { scope });
  } else {
    const inserted = await db.insert(faqItems).values(values).returning({ id: faqItems.id });
    await log(admin.adminId, "faq.create", "faq_items", inserted[0]?.id ?? null, { scope });
  }
  refresh();
}

export async function deleteFaqAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  await db.delete(faqItems).where(eq(faqItems.id, id));
  await log(admin.adminId, "faq.delete", "faq_items", id, {});
  refresh();
}

export async function moveFaqAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  const direction = text(formData.get("direction")) === "up" ? -1 : 1;
  const rows = await db.select({ id: faqItems.id, scope: faqItems.scope, position: faqItems.position }).from(faqItems).orderBy(asc(faqItems.position));
  const index = rows.findIndex((r) => r.id === id);
  const target = index + direction;
  if (index >= 0 && target >= 0 && target < rows.length) {
    await db.update(faqItems).set({ position: rows[target].position }).where(eq(faqItems.id, rows[index].id));
    await db.update(faqItems).set({ position: rows[index].position }).where(eq(faqItems.id, rows[target].id));
    await log(admin.adminId, "faq.move", "faq_items", id, { direction });
    refresh();
  }
}

/* ───────────────────────────── Publications ───────────────────────────── */

export async function savePublicationAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id")) || null;
  const values = {
    externalId: text(formData.get("externalId")) || `pub-${Date.now()}`,
    title: text(formData.get("title")),
    excerpt: text(formData.get("excerpt")),
    venue: text(formData.get("venue"), "Village de la Justice"),
    author: text(formData.get("author")),
    theme: text(formData.get("theme")),
    publishedLabel: text(formData.get("publishedLabel")),
    publishedOn: text(formData.get("publishedOn")) || new Date().toISOString().slice(0, 10),
    url: text(formData.get("url")),
    status: text(formData.get("status"), "published"),
    position: Number(formData.get("position")) || 0,
    updatedAt: new Date(),
  };
  if (!values.title || !values.url) return;

  if (id) {
    await snapshot("publications", id, admin.adminId);
    await db.update(publications).set(values).where(eq(publications.id, id));
    await log(admin.adminId, "publication.update", "publications", id, { title: values.title });
  } else {
    const inserted = await db.insert(publications).values(values).returning({ id: publications.id });
    await log(admin.adminId, "publication.create", "publications", inserted[0]?.id ?? null, { title: values.title });
  }
  refresh(["/", "/publications"]);
}

export async function deletePublicationAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  await db.delete(publications).where(eq(publications.id, id));
  await log(admin.adminId, "publication.delete", "publications", id, {});
  refresh(["/", "/publications"]);
}

export async function togglePublicationAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  const rows = await db.select({ status: publications.status }).from(publications).where(eq(publications.id, id)).limit(1);
  const next = rows[0]?.status === "published" ? "draft" : "published";
  await db.update(publications).set({ status: next, updatedAt: new Date() }).where(eq(publications.id, id));
  await log(admin.adminId, "publication.toggle", "publications", id, { status: next });
  refresh(["/", "/publications"]);
}

/* ───────────────────────────── Repères ───────────────────────────── */

export async function saveFactAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id")) || null;
  const values = {
    scope: text(formData.get("scope"), "home"),
    label: text(formData.get("label")),
    value: text(formData.get("value")),
    position: Number(formData.get("position")) || 0,
    updatedAt: new Date(),
  };
  if (!values.label) return;
  if (id) {
    await snapshot("facts", id, admin.adminId);
    await db.update(facts).set(values).where(eq(facts.id, id));
    await log(admin.adminId, "fact.update", "facts", id, { scope: values.scope });
  } else {
    await db.insert(facts).values(values);
    await log(admin.adminId, "fact.create", "facts", null, { scope: values.scope });
  }
  refresh(["/", "/le-cabinet"]);
}

export async function deleteFactAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  await db.delete(facts).where(eq(facts.id, id));
  await log(admin.adminId, "fact.delete", "facts", id, {});
  refresh(["/", "/le-cabinet"]);
}

/* ───────────────────────────── Navigation ───────────────────────────── */

export async function saveNavAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id")) || null;
  const values = {
    location: text(formData.get("location"), "header"),
    label: text(formData.get("label")),
    href: text(formData.get("href"), "/"),
    position: Number(formData.get("position")) || 0,
    visible: text(formData.get("visible")) !== "off",
    updatedAt: new Date(),
  };
  if (!values.label) return;
  if (id) {
    await db.update(navItems).set(values).where(eq(navItems.id, id));
    await log(admin.adminId, "nav.update", "nav_items", id, { location: values.location });
  } else {
    await db.insert(navItems).values(values);
    await log(admin.adminId, "nav.create", "nav_items", null, { location: values.location });
  }
  refresh();
}

export async function deleteNavAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  await db.delete(navItems).where(eq(navItems.id, id));
  await log(admin.adminId, "nav.delete", "nav_items", id, {});
  refresh();
}

export async function moveNavAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  const direction = text(formData.get("direction")) === "up" ? -1 : 1;
  const rows = await db.select({ id: navItems.id, position: navItems.position, location: navItems.location }).from(navItems).orderBy(asc(navItems.position));
  const index = rows.findIndex((r) => r.id === id);
  const target = index + direction;
  if (index >= 0 && target >= 0 && target < rows.length) {
    await db.update(navItems).set({ position: rows[target].position }).where(eq(navItems.id, rows[index].id));
    await db.update(navItems).set({ position: rows[index].position }).where(eq(navItems.id, rows[target].id));
    await log(admin.adminId, "nav.move", "nav_items", id, { direction });
    refresh();
  }
}

/* ───────────────────────────── SEO ───────────────────────────── */

export async function savePageSeoAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  const values = {
    title: text(formData.get("title")),
    description: text(formData.get("description")),
    ogImage: text(formData.get("ogImage")) || null,
    canonicalOverride: text(formData.get("canonicalOverride")) || null,
    noindex: text(formData.get("noindex")) === "on" || text(formData.get("noindex")) === "true",
    updatedAt: new Date(),
  };
  if (!values.title) return;
  await snapshot("pages", id, admin.adminId);
  await db.update(pages).set(values).where(eq(pages.id, id));
  await log(admin.adminId, "page.seo", "pages", id, { title: values.title });
  refresh();
}

/* ───────────────────────────── Médias ───────────────────────────── */

export async function saveMediaAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id")) || null;
  const url = text(formData.get("url"));
  const alt = text(formData.get("alt"));
  if (id) {
    await db.update(media).set({ url: url || undefined, alt, updatedAt: new Date() }).where(eq(media.id, id));
    await log(admin.adminId, "media.update", "media", id, { url });
  } else {
    if (!url || !alt) return;
    await db.insert(media).values({ storageKey: url, url, alt, mime: "image/jpeg" });
    await log(admin.adminId, "media.create", "media", null, { url });
  }
  refresh();
}

export async function deleteMediaAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  await db.delete(media).where(eq(media.id, id));
  await log(admin.adminId, "media.delete", "media", id, {});
  refresh();
}

/* ───────────────────────────── Historique ───────────────────────────── */

export async function restoreRevisionAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  const rows = await db.select().from(revisions).where(eq(revisions.id, id)).limit(1);
  const revision = rows[0];
  if (!revision) return;
  const snapshot = revision.snapshot as Record<string, unknown>;
  const table = revision.entityType;
  const entityId = revision.entityId;

  const allowed: Record<string, true> = {
    sections: true,
    expertises: true,
    faq_items: true,
    publications: true,
    facts: true,
    pages: true,
  };
  if (!allowed[table]) throw new Error("Restauration non prise en charge pour cette entité.");

  const entries = Object.entries(snapshot).filter(([key]) => key !== "id" && key !== "created_at" && key !== "updated_at");
  const assignments = entries.map(([key]) => sql`${sql.identifier(key)} = ${snapshot[key] as never}`);
  await db.execute(
    sql`update ${sql.identifier(table)} set ${sql.join(assignments, sql`, `)} where id = ${entityId}`,
  );
  await log(admin.adminId, "revision.restore", table, entityId, { revisionId: id });
  refresh();
}

export async function logoutEverywhereAction() {
  const admin = await requireAdmin();
  await log(admin.adminId, "session.logout_all", "admins", admin.adminId, {});
  refresh(["/admin/login"]);
}

/* ───────────────────────────── Lecture pour l'admin ───────────────────────────── */

export type AdminSections = Awaited<ReturnType<typeof readSections>>;
export async function readSections() {
  return db.select().from(sections).orderBy(asc(sections.position));
}

export async function readActivity(limit = 12) {
  return db
    .select({ id: activityLog.id, action: activityLog.action, entityType: activityLog.entityType, createdAt: activityLog.createdAt, details: activityLog.details })
    .from(activityLog)
    .orderBy(sql`${activityLog.createdAt} desc`)
    .limit(limit);
}

export async function readRevisions(limit = 40) {
  return db.select().from(revisions).orderBy(sql`${revisions.createdAt} desc`).limit(limit);
}

export async function readPages() {
  return db.select().from(pages).orderBy(asc(pages.id));
}

export async function readPublications() {
  return db.select().from(publications).orderBy(asc(publications.position));
}

export async function readFaqs() {
  return db.select().from(faqItems).orderBy(asc(faqItems.position));
}

export async function readFacts() {
  return db.select().from(facts).orderBy(asc(facts.position));
}

export async function readNav() {
  return db.select().from(navItems).orderBy(asc(navItems.position));
}

export async function readMedia() {
  return db.select().from(media).orderBy(asc(media.id));
}

export async function readExpertises() {
  return db.select().from(expertises).orderBy(asc(expertises.position));
}

export async function readSettings() {
  return db.select().from(siteSettings).orderBy(asc(siteSettings.key));
}

/* ───────────────────────────── Téléversement d'image ───────────────────────────── */

/**
 * Téléversement local (bac à sable / VPS) : écrit le fichier dans public/uploads.
 * En production serverless (Vercel), le disque n'est pas persistant : brancher un
 * stockage objet (Vercel Blob / S3) et renseigner `storageKey` en conséquence.
 * TODO [À CONFIRMER] : choix du stockage objet avant mise en production.
 */
export async function uploadMediaAction(formData: FormData) {
  const admin = await requireAdmin();
  const file = formData.get("file");
  const alt = text(formData.get("alt"));
  if (!(file instanceof File) || file.size === 0) return;
  if (file.size > 4_000_000) throw new Error("Fichier trop volumineux (4 Mo maximum).");
  if (!/^image\/(jpeg|png|webp|avif)$/.test(file.type)) throw new Error("Format d’image non pris en charge.");

  const { writeFile, mkdir } = await import("node:fs/promises");
  const { join } = await import("node:path");
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").slice(-60);
  const fileName = `${Date.now()}-${safeName}`;
  const dir = join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, fileName), Buffer.from(await file.arrayBuffer()));

  const url = `/uploads/${fileName}`;
  await db.insert(media).values({
    storageKey: url,
    url,
    alt: alt || "Image du cabinet Blexmann Avocats",
    mime: file.type,
    bytes: file.size,
  });
  await log(admin.adminId, "media.create", "media", null, { url });
  refresh();
}
