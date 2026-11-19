import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * Schéma de l'administration du site — Blexmann Avocats.
 *
 * Principes retenus :
 * P1 — Le site public ne dépend jamais de la base : toute lecture passe par une couche
 *      qui retombe sur le contenu embarqué dans `src/content/*` si la base est absente.
 * P3 — Les textes juridiques protégés (mentions légales, secret professionnel, absence de
 *      relation avocat-client, bases légales RGPD) ne sont PAS stockés ici : ils restent
 *      dans le code et ne sont donc pas éditables depuis l'admin.
 *
 * Les tables de contenu sont volontairement séparées des tables d'authentification et
 * d'audit, afin qu'une réinitialisation du contenu ne touche jamais les comptes.
 */

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

/* ───────────────────────────── Authentification ───────────────────────────── */

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  /** scrypt — format « scrypt:<salt hex>:<hash hex> », voir src/lib/password.ts */
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  role: text("role").notNull().default("admin"),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  ...timestamps,
}, (table) => [uniqueIndex("admins_email_idx").on(table.email)]);

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id").notNull().references(() => admins.id, { onDelete: "cascade" }),
  /** Jamais le jeton brut : uniquement son empreinte SHA-256. */
  tokenHash: text("token_hash").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  ip: text("ip"),
  userAgent: text("user_agent"),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  createdAt: timestamps.createdAt,
}, (table) => [
  uniqueIndex("sessions_token_hash_idx").on(table.tokenHash),
  index("sessions_admin_id_idx").on(table.adminId),
]);

/* ───────────────────────────── Réglages globaux ───────────────────────────── */

/**
 * Réglages clé/valeur : identité, coordonnées, libellés de CTA, lien Cal.com,
 * badge d'avis, citation du hero… Chaque clé est un objet JSON validé côté serveur.
 */
export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  ...timestamps,
});

/* ───────────────────────────── Pages et sections ───────────────────────────── */

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  /** Chemin de route, ex. « / », « /contact », « /contentieux-commercial ». */
  path: text("path").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  ogType: text("og_type").notNull().default("website"),
  ogImage: text("og_image"),
  /** Laisse la main sur le canonical ; vide = dérivé du chemin. */
  canonicalOverride: text("canonical_override"),
  noindex: boolean("noindex").notNull().default(false),
  status: text("status").notNull().default("published"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  ...timestamps,
}, (table) => [uniqueIndex("pages_path_idx").on(table.path)]);

/**
 * Sections de page (accueil notamment) : activation, ordre et contenu propre.
 * Les clés reprennent les ancres existantes pour ne casser aucun lien historique.
 */
export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  pageId: integer("page_id").notNull().references(() => pages.id, { onDelete: "cascade" }),
  key: text("key").notNull(),
  enabled: boolean("enabled").notNull().default(true),
  position: integer("position").notNull().default(0),
  content: jsonb("content").notNull().default({}),
  ...timestamps,
}, (table) => [uniqueIndex("sections_page_key_idx").on(table.pageId, table.key)]);

/* ───────────────────────────── Contenu métier ───────────────────────────── */

/** Les 7 domaines d'intervention. `slug` reste figé : il porte l'URL et le SEO. */
export const expertises = pgTable("expertises", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull(),
  /** Ancre historique conservée sur l'accueil, ex. « commercial-contractuel ». */
  anchorId: text("anchor_id").notNull(),
  indexLabel: text("index_label").notNull(),
  domain: text("domain").notNull(),
  hook: text("hook"),
  eyebrow: text("eyebrow"),
  breadcrumbLabel: text("breadcrumb_label"),
  h1: text("h1"),
  intro: jsonb("intro").notNull().default([]),
  situationsTitle: text("situations_title"),
  situationsText: text("situations_text"),
  situationsBullets: jsonb("situations_bullets").notNull().default([]),
  enjeuxTitle: text("enjeux_title"),
  enjeuxParagraphs: jsonb("enjeux_paragraphs").notNull().default([]),
  enjeuxPoints: jsonb("enjeux_points").notNull().default([]),
  conduiteTitle: text("conduite_title"),
  conduiteParagraphs: jsonb("conduite_paragraphs").notNull().default([]),
  scenariosTitle: text("scenarios_title"),
  scenarios: jsonb("scenarios").notNull().default([]),
  related: jsonb("related").notNull().default([]),
  /** Libellé présélectionné dans le formulaire de contact. */
  contactSubject: text("contact_subject").notNull(),
  enabled: boolean("enabled").notNull().default(true),
  position: integer("position").notNull().default(0),
  ...timestamps,
}, (table) => [uniqueIndex("expertises_slug_idx").on(table.slug)]);

/**
 * FAQ polymorphe : `scope` + `ownerId` remplacent sept tables dédiées.
 * scope = home | expertise | cabinet | contact | expertise-page
 */
export const faqItems = pgTable("faq_items", {
  id: serial("id").primaryKey(),
  scope: text("scope").notNull(),
  ownerId: integer("owner_id"),
  position: integer("position").notNull().default(0),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  enabled: boolean("enabled").notNull().default(true),
  ...timestamps,
}, (table) => [index("faq_items_scope_owner_idx").on(table.scope, table.ownerId)]);

/** Publications externes (Village de la Justice). Lien sortant uniquement. */
export const publications = pgTable("publications", {
  id: serial("id").primaryKey(),
  externalId: text("external_id").notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  venue: text("venue").notNull(),
  author: text("author").notNull(),
  theme: text("theme"),
  publishedLabel: text("published_label").notNull(),
  publishedOn: date("published_on").notNull(),
  url: text("url").notNull(),
  status: text("status").notNull().default("published"),
  position: integer("position").notNull().default(0),
  ...timestamps,
}, (table) => [uniqueIndex("publications_external_id_idx").on(table.externalId)]);

/** Repères affichés : hero, fiche cabinet, page cabinet. */
export const facts = pgTable("facts", {
  id: serial("id").primaryKey(),
  scope: text("scope").notNull(),
  label: text("label").notNull(),
  value: text("value").notNull(),
  position: integer("position").notNull().default(0),
  ...timestamps,
}, (table) => [index("facts_scope_idx").on(table.scope)]);

export const navItems = pgTable("nav_items", {
  id: serial("id").primaryKey(),
  location: text("location").notNull(),
  label: text("label").notNull(),
  href: text("href").notNull(),
  position: integer("position").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
  ...timestamps,
}, (table) => [index("nav_items_location_idx").on(table.location)]);

/**
 * Médias : la colonne `storageKey` prépare un stockage objet (Vercel Blob / S3)
 * sans imposer de migration ultérieure des contenus qui y font référence.
 */
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  storageKey: text("storage_key").notNull(),
  url: text("url").notNull(),
  alt: text("alt").notNull(),
  width: integer("width"),
  height: integer("height"),
  mime: text("mime"),
  bytes: integer("bytes"),
  ...timestamps,
}, (table) => [uniqueIndex("media_storage_key_idx").on(table.storageKey)]);

/* ───────────────────────────── Historique et audit ───────────────────────────── */

export const revisions = pgTable("revisions", {
  id: serial("id").primaryKey(),
  entityType: text("entity_type").notNull(),
  entityId: integer("entity_id").notNull(),
  snapshot: jsonb("snapshot").notNull(),
  createdBy: integer("created_by").references(() => admins.id, { onDelete: "set null" }),
  createdAt: timestamps.createdAt,
}, (table) => [index("revisions_entity_idx").on(table.entityType, table.entityId)]);

export const activityLog = pgTable("activity_log", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id").references(() => admins.id, { onDelete: "set null" }),
  action: text("action").notNull(),
  entityType: text("entity_type"),
  entityId: integer("entity_id"),
  details: jsonb("details"),
  createdAt: timestamps.createdAt,
}, (table) => [index("activity_log_admin_idx").on(table.adminId)]);
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  subject: text("subject").notNull(),
  mode: text("mode"),
  message: text("message").notNull(),
  status: text("status").notNull().default("unread"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type Admin = typeof admins.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Page = typeof pages.$inferSelect;
export type Section = typeof sections.$inferSelect;
export type Expertise = typeof expertises.$inferSelect;
export type FaqItem = typeof faqItems.$inferSelect;
export type Publication = typeof publications.$inferSelect;
export type Fact = typeof facts.$inferSelect;
export type NavItem = typeof navItems.$inferSelect;
export type Medium = typeof media.$inferSelect;
export type Revision = typeof revisions.$inferSelect;
