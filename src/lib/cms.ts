import { asc, eq } from "drizzle-orm";
import {
  facts as factsTable,
  expertises as expertisesTable,
  faqItems as faqTable,
  media as mediaTable,
  navItems as navTable,
  pages as pagesTable,
  publications as publicationsTable,
  sections as sectionsTable,
  siteSettings as settingsTable,
} from "@/db/schema";
import { EXTERNAL_PUBLICATIONS } from "@/content/articles";
import { EXPERTISE_PAGE_CONTENT } from "@/content/expertise-pages";
import { CABINET_FAQS, CONTACT_FAQS } from "@/content/page-faqs";
import {
  ABOUT,
  CONTACT,
  CTA,
  EXPERTISES,
  FOOTER,
  HOME_FAQS,
  NAV,
  REVIEWS,
  SITE,
} from "@/content/site";
import type { ExpertisePageData } from "@/components/ExpertisePage";

/**
 * Couche d'accès aux données du site public (principe P1).
 * Toute lecture passe par `safeQuery` : si la base est absente, injoignable ou vide,
 * on retombe silencieusement sur le contenu embarqué de `src/content/*`.
 * Le site ne peut donc jamais être indisponible à cause de PostgreSQL.
 */
async function safeQuery<T>(run: (db: Awaited<ReturnType<typeof loadDb>>) => Promise<T>, fallback: T): Promise<T> {
  try {
    const db = await loadDb();
    const value = await run(db);
    if (value === null || value === undefined) return fallback;
    if (Array.isArray(value) && value.length === 0) return fallback;
    return value;
  } catch {
    return fallback;
  }
}

type Db = typeof import("@/db").db;
async function loadDb(): Promise<Db> {
  const mod = await import("@/db");
  return mod.db;
}

/* ───────────────────────────── Réglages ───────────────────────────── */

export type CmsSettings = {
  identity: Record<string, unknown>;
  contact: Record<string, unknown>;
  cta: Record<string, string>;
  booking: { calLink: string; calUrl: string };
  reviews: { rating: string; count: number; mapsUrl: string; enabled: boolean };
};

const SETTINGS_FALLBACK: CmsSettings = {
  identity: { ...SITE },
  contact: {
    phone: SITE.phone,
    phoneE164: SITE.phoneE164,
    phoneHref: SITE.phoneHref,
    email: SITE.email,
    address: SITE.address,
    appointmentOptions: SITE.appointmentOptions,
  },
  cta: { ...CTA },
  booking: { calLink: "pierre-blexmann", calUrl: "https://cal.com/pierre-blexmann" },
  reviews: { ...REVIEWS, enabled: true },
};

export async function getSettings(): Promise<CmsSettings> {
  const rows = await safeQuery(
    async (db: Db) => db.select().from(settingsTable),
    [] as { key: string; value: unknown }[],
  );
  const stored = Object.fromEntries(rows.map((r: { key: string; value: unknown }) => [r.key, r.value as Record<string, unknown>]));
  const s = SETTINGS_FALLBACK;
  return {
    identity: { ...s.identity, ...(stored.identity ?? {}) },
    contact: { ...s.contact, ...(stored.contact ?? {}) },
    cta: { ...s.cta, ...(stored.cta ?? {}) },
    booking: { ...s.booking, ...(stored.booking ?? {}) },
    reviews: { ...s.reviews, ...(stored.reviews ?? {}) },
  } as CmsSettings;
}

/* ───────────────────────────── Navigation ───────────────────────────── */

export type NavLink = { label: string; href: string };

const NAV_FALLBACK: Record<string, NavLink[]> = {
  header: NAV.map((n) => ({ label: n.label, href: n.href })),
  "footer-nav": FOOTER.columns[0].items.map((n) => ({ ...n })),
  "footer-expertises": FOOTER.columns[1].items.map((n) => ({ ...n })),
  "footer-info": FOOTER.columns[2].items.map((n) => ({ ...n })),
};

export async function getNav(location: keyof typeof NAV_FALLBACK): Promise<NavLink[]> {
  return safeQuery(
    async (db) => {
      const rows = await db
        .select({ label: navTable.label, href: navTable.href })
        .from(navTable)
        .where(eq(navTable.location, location))
        .orderBy(asc(navTable.position));
      return rows.filter(() => true);
    },
    NAV_FALLBACK[location] ?? [],
  );
}

/* ───────────────────────────── Accueil : sections ───────────────────────────── */

export type HomeSection = { key: string; enabled: boolean; position: number; content: Record<string, unknown> };

const HOME_PATH = "/";
export async function getHomeSections(): Promise<HomeSection[]> {
  return safeQuery(
    async (db) => {
      const page = await db.select({ id: pagesTable.id }).from(pagesTable).where(eq(pagesTable.path, HOME_PATH)).limit(1);
      const pageId = page[0]?.id;
      if (!pageId) return [];
      const rows = await db
        .select({ key: sectionsTable.key, enabled: sectionsTable.enabled, position: sectionsTable.position, content: sectionsTable.content })
        .from(sectionsTable)
        .where(eq(sectionsTable.pageId, pageId))
        .orderBy(asc(sectionsTable.position));
      return rows.map((r: { key: string; enabled: boolean; position: number; content: unknown }) => ({
        key: r.key,
        enabled: r.enabled,
        position: r.position,
        content: (r.content ?? {}) as Record<string, unknown>,
      }));
    },
    [] as HomeSection[],
  );
}

export async function isSectionEnabled(key: string): Promise<boolean> {
  const sections = await getHomeSections();
  if (sections.length === 0) return true;
  return sections.find((s) => s.key === key)?.enabled ?? true;
}

/* ───────────────────────────── Expertises ───────────────────────────── */

export type CmsExpertise = ExpertisePageData & {
  slug: string;
  anchorId: string;
  index: string;
  domain: string;
  hook: string;
  enabled: boolean;
};

const EXPERTISE_FALLBACK: CmsExpertise[] = EXPERTISES.map((short, i) => {
  const slug = short.href.replace(/^\//, "");
  const entry = EXPERTISE_PAGE_CONTENT[slug as keyof typeof EXPERTISE_PAGE_CONTENT];
  const data = entry.data as ExpertisePageData & {
    scenariosTitle?: string;
    scenarios?: { title: string; body: string }[];
  };
  return {
    ...data,
    slug,
    anchorId: short.id,
    index: short.index,
    domain: short.domain,
    hook: short.hook,
    enabled: true,
    contactSubject: short.contactSubject,
    related: data.related,
    faqs: data.faqs,
    path: data.path,
    breadcrumbLabel: data.breadcrumbLabel,
    eyebrow: data.eyebrow,
    h1: data.h1,
    intro: data.intro,
    situationsTitle: data.situationsTitle,
    situationsText: data.situationsText,
    situationsBullets: data.situationsBullets,
    enjeuxTitle: data.enjeuxTitle,
    enjeuxParagraphs: data.enjeuxParagraphs,
    enjeuxPoints: data.enjeuxPoints,
    conduiteTitle: data.conduiteTitle,
    conduiteParagraphs: data.conduiteParagraphs,
    scenariosTitle: data.scenariosTitle,
    scenarios: data.scenarios,
    position: i,
  } as unknown as CmsExpertise;
});

export async function getExpertises(): Promise<CmsExpertise[]> {
  const rows = await safeQuery(
    async (db: Db) => db.select().from(expertisesTable).orderBy(asc(expertisesTable.position)),
    [] as (typeof expertisesTable.$inferSelect)[],
  );
  if (rows.length === 0) return EXPERTISE_FALLBACK;
  const faqRows = await safeQuery(async (db: Db) => db.select().from(faqTable).where(eq(faqTable.scope, "expertise")).orderBy(asc(faqTable.position)), []);
  return rows.map((r) => {
    const fallback = EXPERTISE_FALLBACK.find((f) => f.slug === r.slug);
    const faqs = faqRows
      .filter((f: typeof faqTable.$inferSelect) => f.ownerId === r.id && f.enabled)
      .map((f: typeof faqTable.$inferSelect) => ({ q: f.question, a: f.answer }));
    return {
      ...(fallback ?? ({} as CmsExpertise)),
      slug: r.slug,
      anchorId: r.anchorId,
      index: r.indexLabel,
      domain: r.domain,
      hook: r.hook ?? fallback?.hook ?? "",
      enabled: r.enabled,
      path: `/${r.slug}`,
      breadcrumbLabel: r.breadcrumbLabel ?? fallback?.breadcrumbLabel ?? r.domain,
      eyebrow: r.eyebrow ?? fallback?.eyebrow ?? r.domain,
      h1: r.h1 ?? fallback?.h1 ?? r.domain,
      intro: (r.intro as string[]) ?? fallback?.intro ?? [],
      situationsTitle: r.situationsTitle ?? fallback?.situationsTitle ?? "",
      situationsText: r.situationsText ?? fallback?.situationsText ?? "",
      situationsBullets: (r.situationsBullets as string[]) ?? fallback?.situationsBullets ?? [],
      enjeuxTitle: r.enjeuxTitle ?? fallback?.enjeuxTitle ?? "",
      enjeuxParagraphs: (r.enjeuxParagraphs as string[]) ?? fallback?.enjeuxParagraphs ?? [],
      enjeuxPoints: (r.enjeuxPoints as string[]) ?? fallback?.enjeuxPoints ?? [],
      conduiteTitle: r.conduiteTitle ?? fallback?.conduiteTitle ?? "",
      conduiteParagraphs: (r.conduiteParagraphs as string[]) ?? fallback?.conduiteParagraphs ?? [],
      scenariosTitle: r.scenariosTitle ?? fallback?.scenariosTitle,
      scenarios: (r.scenarios as { title: string; body: string }[]) ?? fallback?.scenarios,
      related: (r.related as { label: string; href: string }[]) ?? fallback?.related ?? [],
      contactSubject: r.contactSubject as ExpertisePageData["contactSubject"],
      faqs: faqs.length > 0 ? faqs : (fallback?.faqs ?? []),
    } as CmsExpertise;
  });
}

export async function getExpertise(slug: string): Promise<CmsExpertise | undefined> {
  const all = await getExpertises();
  return all.find((e) => e.slug === slug && e.enabled) ?? all.find((e) => e.slug === slug);
}

/* ───────────────────────────── FAQ ───────────────────────────── */

export type CmsFaq = { id?: number; scope: string; ownerId: number | null; question: string; answer: string; enabled: boolean; position: number };

export async function getFaqs(scope: string, ownerId: number | null = null): Promise<CmsFaq[]> {
  const fallback: Record<string, CmsFaq[]> = {
    home: HOME_FAQS.map((f, i) => ({ scope: "home", ownerId: null, question: f.q, answer: f.a, enabled: true, position: i })),
    cabinet: CABINET_FAQS.map((f, i) => ({ scope: "cabinet", ownerId: null, question: f.q, answer: f.a, enabled: true, position: i })),
    contact: CONTACT_FAQS.map((f, i) => ({ scope: "contact", ownerId: null, question: f.q, answer: f.a, enabled: true, position: i })),
    expertise: [],
  };
  return safeQuery(
    async (db) => {
      const rows = await db.select().from(faqTable).where(eq(faqTable.scope, scope)).orderBy(asc(faqTable.position));
      const scoped = ownerId === null ? rows : rows.filter((r: typeof faqTable.$inferSelect) => r.ownerId === ownerId);
      return scoped.map((r: typeof faqTable.$inferSelect) => ({ id: r.id, scope: r.scope, ownerId: r.ownerId, question: r.question, answer: r.answer, enabled: r.enabled, position: r.position }));
    },
    fallback[scope] ?? [],
  );
}

export async function getHomeFaqs() {
  const faqs = await getFaqs("home");
  return faqs.filter((f) => f.enabled).map((f) => ({ q: f.question, a: f.answer }));
}

/* ───────────────────────────── Publications ───────────────────────────── */

export type CmsPublication = {
  id?: number;
  externalId: string;
  title: string;
  excerpt: string;
  venue: string;
  author: string;
  theme: string;
  publishedDate: string;
  isoDate: string;
  href: string;
  status: string;
  position: number;
};

const PUBLICATION_FALLBACK: CmsPublication[] = EXTERNAL_PUBLICATIONS.map((p, i) => ({
  externalId: p.id,
  title: p.title,
  excerpt: p.excerpt,
  venue: p.venue,
  author: p.author,
  theme: p.theme,
  publishedDate: p.publishedDate,
  isoDate: p.isoDate,
  href: p.href,
  status: "published",
  position: i,
}));

export async function getPublications(includeDrafts = false): Promise<CmsPublication[]> {
  return safeQuery(
    async (db) => {
      const rows = await db.select().from(publicationsTable).orderBy(asc(publicationsTable.position));
      return rows
        .filter((r: typeof publicationsTable.$inferSelect) => includeDrafts || r.status === "published")
        .map((r: typeof publicationsTable.$inferSelect) => ({
          id: r.id,
          externalId: r.externalId,
          title: r.title,
          excerpt: r.excerpt ?? "",
          venue: r.venue,
          author: r.author,
          theme: r.theme ?? "",
          publishedDate: r.publishedLabel,
          isoDate: String(r.publishedOn),
          href: r.url,
          status: r.status,
          position: r.position,
        }));
    },
    PUBLICATION_FALLBACK,
  );
}

/* ───────────────────────────── Repères ───────────────────────────── */

export type CmsFact = { id?: number; scope: string; label: string; value: string; position: number };

const FACTS_FALLBACK: Record<string, CmsFact[]> = {
  "trust-strip": [SITE.barreau, `Toque ${SITE.toque}`, `Depuis ${SITE.founded}`, SITE.address.arrondissement, "Confidentialité"].map((label, i) => ({ scope: "trust-strip", label, value: "", position: i })),
  home: ABOUT.homeFacts.map((f, i) => ({ scope: "home", ...f, position: i })),
  cabinet: ABOUT.facts.map((f, i) => ({ scope: "cabinet", ...f, position: i })),
};

export async function getFacts(scope: keyof typeof FACTS_FALLBACK): Promise<CmsFact[]> {
  return safeQuery(
    async (db) => {
      const rows = await db.select().from(factsTable).where(eq(factsTable.scope, scope)).orderBy(asc(factsTable.position));
      return rows.map((r: typeof factsTable.$inferSelect) => ({ id: r.id, scope: r.scope, label: r.label, value: r.value, position: r.position }));
    },
    FACTS_FALLBACK[scope] ?? [],
  );
}

/* ───────────────────────────── SEO / pages ───────────────────────────── */

export type CmsPage = {
  id?: number;
  path: string;
  title: string;
  description: string;
  ogType: string;
  ogImage: string | null;
  canonicalOverride: string | null;
  noindex: boolean;
};

export async function getPages(): Promise<CmsPage[]> {
  return safeQuery(
    async (db) => {
      const rows = await db.select().from(pagesTable).orderBy(asc(pagesTable.id));
      return rows.map((r: typeof pagesTable.$inferSelect) => ({
        id: r.id,
        path: r.path,
        title: r.title,
        description: r.description,
        ogType: r.ogType,
        ogImage: r.ogImage,
        canonicalOverride: r.canonicalOverride,
        noindex: r.noindex,
      }));
    },
    [] as CmsPage[],
  );
}

export async function getPageByPath(path: string): Promise<CmsPage | undefined> {
  const pages = await getPages();
  return pages.find((p) => p.path === path);
}

/* ───────────────────────────── Médias ───────────────────────────── */

export type CmsMedia = { id?: number; url: string; alt: string; width: number | null; height: number | null };

const MEDIA_FALLBACK: CmsMedia[] = [
  { url: "/images/hero-facade.jpg", alt: "Façade haussmannienne parisienne à Paris 16e — Blexmann Avocats, avocat en contentieux des affaires", width: 1536, height: 1024 },
  { url: "/images/cabinet-salon.jpg", alt: "Salon de réception de Blexmann Avocats, 53 avenue Victor Hugo à Paris 16e", width: 1536, height: 1024 },
  { url: "/images/cabinet-desk.jpg", alt: "Bureau d'avocat en contentieux commercial à Paris", width: 1024, height: 1536 },
  { url: "/images/paris-passage.jpg", alt: "Architecture parisienne au crépuscule — Blexmann Avocats à Paris", width: 1024, height: 1536 },
];

export async function getMedia(): Promise<CmsMedia[]> {
  return safeQuery(
    async (db) => {
      const rows = await db.select().from(mediaTable).orderBy(asc(mediaTable.id));
      return rows.map((r: typeof mediaTable.$inferSelect) => ({ id: r.id, url: r.url, alt: r.alt, width: r.width, height: r.height }));
    },
    MEDIA_FALLBACK,
  );
}
