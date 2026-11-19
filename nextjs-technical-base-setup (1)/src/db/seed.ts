/**
 * Seed de la base d'administration (lot A1) — miroir fidèle du contenu publié.
 *
 * Commande : npx tsx src/db/seed.ts
 * - Idempotent : relancer réinitialise les tables de contenu (jamais les comptes admin).
 * - Premier administrateur : créé depuis ADMIN_EMAIL / ADMIN_PASSWORD (variables d'env.) ;
 *   à défaut, un mot de passe aléatoire est généré et affiché UNE seule fois.
 * - Le site public ne lit pas encore la base : ce seed ne change rien au rendu.
 */
import "dotenv/config";
import { randomBytes } from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { db } from "./index";
import {
  admins,
  expertises,
  facts,
  faqItems,
  media,
  navItems,
  pages,
  publications,
  sections,
  siteSettings,
} from "./schema";
import {
  ABOUT,
  APPROACH,
  APPROACH_INTRO,
  CONTACT,
  CTA,
  EXPERTISES,
  FIRST_CONTACT,
  FOOTER,
  HOME_FAQS,
  MARD,
  NAV,
  REVIEWS,
  SITE,
  WHY,
} from "../content/site";
import { EXTERNAL_PUBLICATIONS } from "../content/articles";
import { EXPERTISE_PAGE_CONTENT, type ExpertisePageEntry } from "../content/expertise-pages";
import { CABINET_FAQS, CONTACT_FAQS } from "../content/page-faqs";
import { hashPassword } from "../lib/password";

/** Métadonnées de l'accueil — miroir des constantes de src/app/layout.tsx. */
const HOME = {
  path: "/",
  title: "Avocat contentieux des affaires Paris | Blexmann Avocats",
  description:
    "Blexmann Avocats, avocat en contentieux des affaires à Paris 16e : litiges commerciaux, conflits entre associés, responsabilité des dirigeants et référés.",
  ogType: "website",
};

const PUBLISHED_AT = new Date("2026-04-01T00:00:00.000Z");

type PageMetadataLike = {
  title?: { absolute?: string };
  description?: string;
  alternates?: { canonical?: string };
  openGraph?: { type?: string };
  robots?: { index?: boolean };
};

/** Pages internes dont les métadonnées restent définies dans leur module Next. */
const DYNAMIC_PAGES = [
  "contact",
  "le-cabinet",
  "publications",
  "mentions-legales",
  "politique-de-confidentialite",
] as const;

async function readPageMetadata(slug: string) {
  const mod = (await import(`../app/${slug}/page.tsx`)) as { metadata: PageMetadataLike };
  const meta = mod.metadata;
  const title = meta.title?.absolute;
  if (!title || !meta.description || !meta.alternates?.canonical) {
    throw new Error(`Métadonnées incomplètes pour /${slug}`);
  }
  return {
    path: meta.alternates.canonical,
    title,
    description: meta.description,
    ogType: meta.openGraph?.type ?? "website",
    noindex: meta.robots?.index === false,
  };
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL ?? "admin@blexmann-avocats.local";
  const existing = await db
    .select({ id: admins.id })
    .from(admins)
    .where(eq(admins.email, email))
    .limit(1);
  if (existing.length > 0) {
    console.log(`• administrateur déjà présent : ${email} (inchangé)`);
    return;
  }
  const generated = !process.env.ADMIN_PASSWORD;
  const password = process.env.ADMIN_PASSWORD ?? randomBytes(9).toString("base64url");
  await db.insert(admins).values({
    email,
    passwordHash: hashPassword(password),
    name: "Administrateur",
  });
  console.log(`• administrateur créé : ${email}`);
  if (generated) {
    console.log(`  mot de passe généré (affiché une seule fois) : ${password}`);
  }
}

async function seedPages() {
  const rows = [
    { ...HOME, noindex: false },
    ...Object.values(EXPERTISE_PAGE_CONTENT).map((entry) => ({
      path: entry.path,
      title: entry.title,
      description: entry.description,
      ogType: "article",
      noindex: false,
    })),
    ...(await Promise.all(DYNAMIC_PAGES.map(readPageMetadata))),
  ].map((row, position) => ({
    ...row,
    status: "published",
    position,
    publishedAt: PUBLISHED_AT,
  }));

  const inserted = await db
    .insert(pages)
    .values(rows)
    .returning({ id: pages.id, path: pages.path });
  console.log(`• pages : ${inserted.length}`);
  return inserted;
}

async function seedSections(pageIds: { id: number; path: string }[]) {
  const homeId = pageIds.find((p) => p.path === "/")?.id;
  if (homeId === undefined) throw new Error("Page d'accueil introuvable");

  const homeSections: { key: string; content: Record<string, unknown> }[] = [
    { key: "hero", content: { quote: SITE.heroQuote } },
    { key: "trust-strip", content: {} },
    { key: "expertises", content: {} },
    { key: "quand-faire-appel", content: {} },
    {
      key: "approche",
      content: { intro: APPROACH_INTRO, pillars: APPROACH, mardHomeBody: MARD.homeBody, why: WHY },
    },
    {
      key: "cabinet",
      content: { homeLead: ABOUT.homeLead, homeParagraph: ABOUT.homeParagraph },
    },
    { key: "faq", content: {} },
    { key: "publications", content: {} },
    {
      key: "premier-contact",
      content: {
        eyebrow: FIRST_CONTACT.eyebrow,
        title: FIRST_CONTACT.title,
        steps: FIRST_CONTACT.steps,
      },
    },
    {
      key: "contact",
      content: { eyebrow: CONTACT.eyebrow, title: CONTACT.title, body: CONTACT.body },
    },
  ];

  await db.insert(sections).values(
    homeSections.map((section, position) => ({
      pageId: homeId,
      key: section.key,
      enabled: true,
      position,
      content: section.content,
    })),
  );
  console.log(`• sections (accueil) : ${homeSections.length}`);
}

function expertiseEntry(slug: string): ExpertisePageEntry {
  const entry = EXPERTISE_PAGE_CONTENT[slug as keyof typeof EXPERTISE_PAGE_CONTENT];
  if (!entry) throw new Error(`Contenu détaillé manquant pour ${slug}`);
  return entry;
}

async function seedExpertises() {
  const rows = EXPERTISES.map((short, position) => {
    const slug = short.href.replace(/^\//, "");
    const data = expertiseEntry(slug).data;
    return {
      slug,
      anchorId: short.id,
      indexLabel: short.index,
      domain: short.domain,
      hook: short.hook,
      eyebrow: data.eyebrow,
      breadcrumbLabel: data.breadcrumbLabel,
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
      scenariosTitle: data.scenariosTitle ?? null,
      scenarios: data.scenarios ?? [],
      related: data.related,
      contactSubject: short.contactSubject,
      enabled: true,
      position,
    };
  });
  const inserted = await db
    .insert(expertises)
    .values(rows)
    .returning({ id: expertises.id, slug: expertises.slug });
  console.log(`• expertises : ${inserted.length}`);
  return inserted;
}

async function seedFaqs(insertedExpertises: { id: number; slug: string }[]) {
  const rows: {
    scope: string;
    ownerId: number | null;
    position: number;
    question: string;
    answer: string;
  }[] = [];

  HOME_FAQS.forEach((faq, i) =>
    rows.push({ scope: "home", ownerId: null, position: i, question: faq.q, answer: faq.a }),
  );

  for (const expertise of insertedExpertises) {
    const entry = EXPERTISE_PAGE_CONTENT[expertise.slug as keyof typeof EXPERTISE_PAGE_CONTENT];
    entry.data.faqs.forEach((faq, i) =>
      rows.push({
        scope: "expertise",
        ownerId: expertise.id,
        position: i,
        question: faq.q,
        answer: faq.a,
      }),
    );
  }

  CABINET_FAQS.forEach((faq, i) =>
    rows.push({ scope: "cabinet", ownerId: null, position: i, question: faq.q, answer: faq.a }),
  );
  CONTACT_FAQS.forEach((faq, i) =>
    rows.push({ scope: "contact", ownerId: null, position: i, question: faq.q, answer: faq.a }),
  );

  await db.insert(faqItems).values(rows);
  console.log(`• FAQ : ${rows.length} questions-réponses`);
}

async function seedSettingsPublicationsFactsNavMedia() {
  await db.insert(siteSettings).values([
    {
      key: "identity",
      value: {
        name: SITE.name,
        wordmark: SITE.wordmark,
        wordmarkSuffix: SITE.wordmarkSuffix,
        legalName: SITE.legalName,
        domain: SITE.domain,
        url: SITE.url,
        tagline: SITE.tagline,
        barreau: SITE.barreau,
        siren: SITE.siren,
        toque: SITE.toque,
        oathDate: SITE.oathDate,
        founded: SITE.founded,
      },
    },
    {
      key: "contact",
      value: {
        phone: SITE.phone,
        phoneE164: SITE.phoneE164,
        phoneHref: SITE.phoneHref,
        email: SITE.email,
        address: SITE.address,
        appointmentOptions: SITE.appointmentOptions,
      },
    },
    { key: "cta", value: { ...CTA } },
    { key: "booking", value: { calLink: "pierre-blexmann", calUrl: "https://cal.com/pierre-blexmann" } },
    // TODO [À CONFIRMER] : note et nombre d'avis Google — désactiver le badge tant que non validés.
    { key: "reviews", value: { ...REVIEWS, enabled: true } },
    // confidentialityNotice : texte protégé, stocké en lecture seule pour référence.
    { key: "protected-texts", value: { confidentialityNotice: SITE.confidentialityNotice } },
  ]);
  console.log("• réglages : 6 clés");

  await db.insert(publications).values(
    EXTERNAL_PUBLICATIONS.map((pub, position) => ({
      externalId: pub.id,
      title: pub.title,
      excerpt: pub.excerpt,
      venue: pub.venue,
      author: pub.author,
      theme: pub.theme,
      publishedLabel: pub.publishedDate,
      publishedOn: pub.isoDate,
      url: pub.href,
      status: "published",
      position,
    })),
  );
  console.log(`• publications : ${EXTERNAL_PUBLICATIONS.length}`);

  const trustStrip = [
    SITE.barreau,
    `Toque ${SITE.toque}`,
    `Depuis ${SITE.founded}`,
    SITE.address.arrondissement,
    "Confidentialité",
  ].map((label, position) => ({ scope: "trust-strip", label, value: "", position }));
  await db.insert(facts).values([
    ...trustStrip,
    ...ABOUT.homeFacts.map((fact, position) => ({ scope: "home", ...fact, position })),
    ...ABOUT.facts.map((fact, position) => ({ scope: "cabinet", ...fact, position })),
  ]);
  console.log(`• repères : ${trustStrip.length + ABOUT.homeFacts.length + ABOUT.facts.length}`);

  const nav = [
    ...NAV.map((item, position) => ({ location: "header", ...item, position })),
    ...FOOTER.columns[0].items.map((item, position) => ({ location: "footer-nav", ...item, position })),
    ...FOOTER.columns[1].items.map((item, position) => ({ location: "footer-expertises", ...item, position })),
    ...FOOTER.columns[2].items.map((item, position) => ({ location: "footer-info", ...item, position })),
  ];
  await db.insert(navItems).values(nav.map((item) => ({ ...item, visible: true })));
  console.log(`• navigation : ${nav.length} liens`);

  await db.insert(media).values([
    {
      storageKey: "/images/hero-facade.jpg",
      url: "/images/hero-facade.jpg",
      alt: "Façade haussmannienne parisienne à Paris 16e — Blexmann Avocats, avocat en contentieux des affaires",
      width: 1536,
      height: 1024,
      mime: "image/jpeg",
      bytes: 485346,
    },
    {
      storageKey: "/images/cabinet-salon.jpg",
      url: "/images/cabinet-salon.jpg",
      alt: "Salon de réception de Blexmann Avocats, 53 avenue Victor Hugo à Paris 16e",
      width: 1536,
      height: 1024,
      mime: "image/jpeg",
      bytes: 302502,
    },
    {
      storageKey: "/images/cabinet-desk.jpg",
      url: "/images/cabinet-desk.jpg",
      alt: "Bureau d'avocat en contentieux commercial à Paris — dossiers, préparation de stratégie et résolution des litiges",
      width: 1024,
      height: 1536,
      mime: "image/jpeg",
      bytes: 177723,
    },
    {
      storageKey: "/images/paris-passage.jpg",
      url: "/images/paris-passage.jpg",
      alt: "Architecture parisienne au crépuscule — Blexmann Avocats, contentieux des affaires à Paris",
      width: 1024,
      height: 1536,
      mime: "image/jpeg",
      bytes: 454640,
    },
  ]);
  console.log("• médias : 4 images référencées");
}

async function main() {
  await seedAdmin();

  // Réinitialisation du contenu uniquement (les comptes et l'audit sont préservés).
  await db.delete(sections);
  await db.delete(faqItems);
  await db.delete(expertises);
  await db.delete(publications);
  await db.delete(facts);
  await db.delete(navItems);
  await db.delete(media);
  await db.delete(pages);
  await db.delete(siteSettings);

  const insertedPages = await seedPages();
  await seedSections(insertedPages);
  const insertedExpertises = await seedExpertises();
  await seedFaqs(insertedExpertises);
  await seedSettingsPublicationsFactsNavMedia();

  console.log("\nComptages exacts :");
  for (const [label, table] of [
    ["pages", pages],
    ["sections", sections],
    ["expertises", expertises],
    ["faq_items", faqItems],
    ["publications", publications],
    ["facts", facts],
    ["nav_items", navItems],
    ["media", media],
    ["site_settings", siteSettings],
    ["admins", admins],
  ] as const) {
    const result = await db.select({ n: sql<number>`count(*)::int` }).from(table);
    console.log(`  ${label.padEnd(15)} ${result[0]?.n ?? 0}`);
  }
  console.log("\nSeed terminé.");
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error("Échec du seed :", error);
    process.exit(1);
  });
