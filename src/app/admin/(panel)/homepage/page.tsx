import type { Metadata } from "next";
import { admin, Badge, Card, Field, ImageSelect, PageTitle, Submit } from "@/components/admin/AdminUI";
import {
  moveSectionAction,
  readFacts,
  readFaqs,
  readMedia,
  readSections,
  saveFaqAction,
  saveSectionAction,
  toggleSectionAction,
} from "@/lib/cms-actions";

export const metadata: Metadata = {
  title: { absolute: "Page d’accueil — Administration" },
  robots: { index: false, follow: false },
};

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero (titre, accroche, citation)",
  "trust-strip": "Bandeau de confiance",
  expertises: "Cartes d’expertise",
  "quand-faire-appel": "Quand faire appel",
  approche: "Approche & engagements",
  cabinet: "Le Cabinet",
  faq: "FAQ",
  publications: "Publications",
  "premier-contact": "Premier contact (3 étapes)",
  contact: "Contact",
};

export default async function HomepageAdminPage() {
  const [sections, facts, faqs, media] = await Promise.all([
    readSections(),
    readFacts(),
    readFaqs(),
    readMedia(),
  ]);
  const homeFacts = facts.filter((f) => f.scope === "home");
  const homeFaqs = faqs.filter((f) => f.scope === "home");

  return (
    <div>
      <PageTitle
        title="Page d’accueil"
        subtitle="Activez, désactivez et réordonnez les dix sections de la page d’accueil, puis modifiez leur contenu. Les ancres historiques sont conservées."
      />

      <h2 className={`mt-8 text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${admin.accent}`}>Sections</h2>
      <div className="mt-3 space-y-2">
        {sections.map((section, index) => {
          const content = (section.content ?? {}) as Record<string, unknown>;
          const textEntries = Object.entries(content).filter(
            ([, value]) => typeof value === "string" || typeof value === "number",
          );
          const listEntries = Object.entries(content).filter(([, value]) => Array.isArray(value));
          return (
            <Card key={section.id} className="!p-0">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFEBE2] px-4 py-3">
                <div className="flex items-center gap-3">
                  <Badge>{String(index + 1).padStart(2, "0")}</Badge>
                  <div>
                    <p className="text-sm font-medium text-[#111827]">{SECTION_LABELS[section.key] ?? section.key}</p>
                    <p className={`text-[0.66rem] uppercase tracking-[0.14em] ${admin.muted}`}>{section.key}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={section.enabled ? "success" : "warning"}>{section.enabled ? "Visible" : "Masquée"}</Badge>
                  <form action={moveSectionAction}>
                    <input type="hidden" name="id" value={section.id} />
                    <input type="hidden" name="direction" value="up" />
                    <button type="submit" className={`${admin.btnGhost} !px-2 !py-1`} aria-label="Monter">↑</button>
                  </form>
                  <form action={moveSectionAction}>
                    <input type="hidden" name="id" value={section.id} />
                    <input type="hidden" name="direction" value="down" />
                    <button type="submit" className={`${admin.btnGhost} !px-2 !py-1`} aria-label="Descendre">↓</button>
                  </form>
                  <form action={toggleSectionAction}>
                    <input type="hidden" name="id" value={section.id} />
                    <input type="hidden" name="enabled" value={section.enabled ? "false" : "true"} />
                    <button type="submit" className={`${admin.btnGhost} !px-2 !py-1`}>
                      {section.enabled ? "Masquer" : "Afficher"}
                    </button>
                  </form>
                </div>
              </div>

              <details className="px-4 py-3">
                <summary className="cursor-pointer text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#8C6D46]">
                  Modifier le contenu
                </summary>
                <form action={saveSectionAction} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input type="hidden" name="id" value={section.id} />
                  {textEntries.map(([key, value]) => (
                    <Field key={key} label={key} name={key} defaultValue={String(value)} />
                  ))}
                  {listEntries.map(([key, value]) => (
                    <div key={key} className="sm:col-span-2">
                      <Field
                        label={`${key} (une valeur par ligne)`}
                        name={`${key}__lines`}
                        rows={Math.min(10, Math.max(3, (value as unknown[]).length + 1))}
                        defaultValue={(value as unknown[]).map((v) => (typeof v === "string" ? v : JSON.stringify(v))).join("\n")}
                      />
                    </div>
                  ))}
                  {textEntries.length === 0 && listEntries.length === 0 && (
                    <p className={`text-sm sm:col-span-2 ${admin.muted}`}>Cette section n’a pas de texte éditable.</p>
                  )}
                  <div className="sm:col-span-2">
                    <ImageSelect label="Image de la section" name="image" value={String(content.image ?? "")} options={media} />
                  </div>
                  <div className="sm:col-span-2">
                    <Submit>Enregistrer la section</Submit>
                  </div>
                </form>
              </details>
            </Card>
          );
        })}
      </div>

      <h2 className={`mt-12 text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${admin.accent}`}>
        Repères de l’accueil ({homeFacts.length})
      </h2>
      <p className={`mt-1 text-xs ${admin.muted}`}>
        Gestion complète (ajout, modification, suppression, ordre) dans <a href="/admin/facts" className="underline">Repères &amp; Chiffres</a>.
      </p>

      <h2 className={`mt-10 text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${admin.accent}`}>
        FAQ de l’accueil ({homeFaqs.length})
      </h2>
      <div className="mt-3 space-y-2">
        {homeFaqs.map((faq) => (
          <Card key={faq.id} className="!p-4">
            <form action={saveFaqAction} className="grid grid-cols-1 gap-3">
              <input type="hidden" name="id" value={faq.id} />
              <input type="hidden" name="scope" value="home" />
              <input type="hidden" name="position" value={faq.position} />
              <Field label="Question" name="question" defaultValue={faq.question} required />
              <Field label="Réponse" name="answer" rows={3} defaultValue={faq.answer} required />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="enabled" defaultChecked={faq.enabled} className="h-4 w-4 accent-[#111827]" />
                Affichée sur le site
              </label>
              <div>
                <Submit variant="ghost">Enregistrer</Submit>
              </div>
            </form>
          </Card>
        ))}
      </div>
    </div>
  );
}
