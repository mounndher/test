import type { Metadata } from "next";
import Link from "next/link";
import { admin, Badge, Card, PageTitle } from "@/components/admin/AdminUI";
import { readActivity, readExpertises, readFacts, readFaqs, readMedia, readNav, readPages, readPublications, readSections } from "@/lib/cms-actions";

export const metadata: Metadata = {
  title: { absolute: "Tableau de bord — Administration Blexmann Avocats" },
  robots: { index: false, follow: false },
};

const LINK_LABELS: Record<string, string> = {
  "settings.update": "Réglages enregistrés",
  "section.toggle": "Section activée/désactivée",
  "section.move": "Section réordonnée",
  "section.update": "Section modifiée",
  "expertise.update": "Expertise modifiée",
  "expertise.toggle": "Expertise activée/désactivée",
  "expertise.move": "Expertise réordonnée",
  "faq.update": "FAQ modifiée",
  "faq.create": "FAQ ajoutée",
  "faq.delete": "FAQ supprimée",
  "faq.move": "FAQ réordonnée",
  "publication.update": "Publication modifiée",
  "publication.create": "Publication ajoutée",
  "publication.delete": "Publication supprimée",
  "publication.toggle": "Publication publiée/dépubliée",
  "fact.update": "Repère modifié",
  "fact.create": "Repère ajouté",
  "fact.delete": "Repère supprimé",
  "nav.update": "Lien de navigation modifié",
  "nav.create": "Lien de navigation ajouté",
  "nav.delete": "Lien de navigation supprimé",
  "nav.move": "Navigation réordonnée",
  "page.seo": "SEO de page modifié",
  "media.update": "Média modifié",
  "media.create": "Média ajouté",
  "media.delete": "Média supprimé",
  "revision.restore": "Version restaurée",
};

export default async function AdminDashboardPage() {
  const [pages, sections, expertises, faqs, publications, facts, nav, media, activity] = await Promise.all([
    readPages(),
    readSections(),
    readExpertises(),
    readFaqs(),
    readPublications(),
    readFacts(),
    readNav(),
    readMedia(),
    readActivity(10),
  ]);

  const kpis = [
    { label: "Pages", value: pages.length, href: "/admin/seo", icon: "Seo" },
    { label: "Sections", value: sections.length, href: "/admin/homepage" },
    { label: "Expertises", value: expertises.length, href: "/admin/expertises" },
    { label: "Questions FAQ", value: faqs.length, href: "/admin/faqs" },
    { label: "Publications", value: publications.length, href: "/admin/publications" },
    { label: "Repères", value: facts.length, href: "/admin/facts" },
    { label: "Liens", value: nav.length, href: "/admin/navigation" },
    { label: "Médias", value: media.length, href: "/admin/media" },
  ];

  const quickActions = [
    { title: "Modifier la page d’accueil", detail: "Sections, ordre et visibilité", href: "/admin/homepage" },
    { title: "Gérer les expertises", detail: "7 pages, hooks et FAQ", href: "/admin/expertises" },
    { title: "Changer les images", detail: "Médiathèque et textes alternatifs", href: "/admin/media" },
    { title: "Modifier le SEO", detail: "Titres, descriptions, indexation", href: "/admin/seo" },
  ];

  return (
    <div>
      <PageTitle
        title="Tableau de bord"
        subtitle="Toutes les données du site sont enregistrées en base. Chaque enregistrement régénère immédiatement les pages publiques concernées."
        action={
          <a href="/" target="_blank" rel="noopener noreferrer" className={admin.btn}>
            Voir le site ↗
          </a>
        }
      />

      <h2 className={`mt-10 text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${admin.accent}`}>
        Contenu en base
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className={`${admin.card} group px-4 py-4 transition-colors hover:border-[#8C6D46]`}
          >
            <p className={`text-[0.66rem] font-semibold uppercase tracking-[0.14em] ${admin.muted}`}>{kpi.label}</p>
            <p className="mt-2 font-display text-3xl leading-none text-[#111827]">{kpi.value}</p>
            <p className="mt-2 text-[0.66rem] uppercase tracking-[0.14em] text-[#8C6D46] opacity-0 transition-opacity group-hover:opacity-100">
              Gérer →
            </p>
          </Link>
        ))}
      </div>

      <h2 className={`mt-12 text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${admin.accent}`}>
        Actions rapides
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {quickActions.map((action) => (
          <Link key={action.href} href={action.href} className={`${admin.card} block p-5 transition-colors hover:border-[#8C6D46]`}>
            <p className="font-display text-[1.1rem] leading-snug text-[#111827]">{action.title}</p>
            <p className={`mt-1 text-sm ${admin.muted}`}>{action.detail}</p>
            <p className="mt-3 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[#8C6D46]">Gérer →</p>
          </Link>
        ))}
      </div>

      <h2 className={`mt-12 text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${admin.accent}`}>
        Dernières modifications
      </h2>
      <Card className="mt-4 !p-0">
        {activity.length === 0 ? (
          <p className={`px-5 py-6 text-sm ${admin.muted}`}>Aucune modification enregistrée pour le moment.</p>
        ) : (
          <ul className="divide-y divide-[#EFEBE2]">
            {activity.map((entry) => (
              <li key={entry.id} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3">
                <span className="text-sm text-[#111827]">{LINK_LABELS[entry.action] ?? entry.action}</span>
                <span className="flex items-center gap-3">
                  <Badge>{entry.entityType ?? "—"}</Badge>
                  <span className={`text-xs ${admin.muted}`}>
                    {new Date(entry.createdAt).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <p className={`mt-10 border-t border-[#E3DED4] pt-5 text-xs leading-relaxed ${admin.muted}`}>
        Les textes juridiques protégés (mentions légales, secret professionnel, absence de relation
        avocat-client, bases légales RGPD) restent hors de l’administration : ils ne sont modifiables que dans
        le code, après relecture.
      </p>
    </div>
  );
}
