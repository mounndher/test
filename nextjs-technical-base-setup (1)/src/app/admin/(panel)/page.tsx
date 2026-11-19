import type { Metadata } from "next";
import { sql } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import { db } from "@/db";
import {
  expertises,
  facts,
  faqItems,
  media,
  navItems,
  pages,
  publications,
  sections,
  siteSettings,
} from "@/db/schema";

export const metadata: Metadata = {
  title: { absolute: "Tableau de bord — Administration Blexmann Avocats" },
  robots: { index: false, follow: false },
};

async function count(table: PgTable): Promise<number> {
  const result = await db.select({ n: sql<number>`count(*)::int` }).from(table);
  return result[0]?.n ?? 0;
}

const MODULES = [
  { name: "Réglages du site", detail: "Identité, coordonnées, CTA, Cal.com, badge d’avis", lot: "A3" },
  { name: "Page d’accueil", detail: "10 sections : activation, ordre, textes", lot: "A4" },
  { name: "Pages d’expertise", detail: "7 pages : accroches, contenus détaillés, FAQ", lot: "A5" },
  { name: "SEO par page", detail: "Titres, descriptions, canonical, indexation", lot: "A6" },
  { name: "Médiathèque", detail: "Images et textes alternatifs", lot: "A7" },
  { name: "Publication & historique", detail: "Brouillons, aperçu, restauration de versions", lot: "A8" },
] as const;

export default async function AdminDashboardPage() {
  const [
    pagesCount,
    sectionsCount,
    expertisesCount,
    faqCount,
    publicationsCount,
    factsCount,
    navCount,
    mediaCount,
    settingsCount,
  ] = await Promise.all([
    count(pages),
    count(sections),
    count(expertises),
    count(faqItems),
    count(publications),
    count(facts),
    count(navItems),
    count(media),
    count(siteSettings),
  ]);

  const stats: { label: string; value: number }[] = [
    { label: "Pages", value: pagesCount },
    { label: "Sections", value: sectionsCount },
    { label: "Expertises", value: expertisesCount },
    { label: "Questions FAQ", value: faqCount },
    { label: "Publications", value: publicationsCount },
    { label: "Repères", value: factsCount },
    { label: "Liens de navigation", value: navCount },
    { label: "Médias", value: mediaCount },
    { label: "Clés de réglages", value: settingsCount },
  ];

  return (
    <div>
      <h1 className="display-md font-display text-navy">Tableau de bord</h1>
      <p className="mt-3 max-w-[60ch] text-[1rem] leading-[1.6] text-ink/80">
        Le contenu du site est désormais enregistré en base. Les modules d’édition arrivent
        lot par lot&nbsp;; jusque-là, le site public continue d’être servi depuis le contenu
        embarqué, sans changement visible.
      </p>

      <h2 className="eyebrow mt-12 text-bronze">Contenu en base</h2>
      <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-rule bg-ivory px-5 py-4">
            <dt className="eyebrow text-mute">{stat.label}</dt>
            <dd className="mt-2 font-display text-3xl leading-none text-navy">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="eyebrow mt-12 text-bronze">Modules</h2>
      <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {MODULES.map((module) => (
          <li key={module.name} className="border border-rule bg-ivory p-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-display text-[1.15rem] leading-snug text-navy">{module.name}</p>
              <span className="eyebrow shrink-0 text-mute">Lot {module.lot}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{module.detail}</p>
            <p className="eyebrow mt-3 text-mute">À venir</p>
          </li>
        ))}
      </ul>

      <p className="mt-12 max-w-[68ch] border-t border-rule pt-6 text-xs leading-relaxed text-mute">
        Les textes juridiques protégés (mentions légales, secret professionnel, absence de
        relation avocat-client, bases légales RGPD) restent délibérément hors de
        l’administration&nbsp;: ils ne sont modifiables que dans le code, après relecture.
      </p>
    </div>
  );
}
