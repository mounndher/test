import type { Metadata } from "next";
import Link from "next/link";
import { admin, Badge, Card, Field, PageTitle, Submit } from "@/components/admin/AdminUI";
import { deleteFaqAction, moveFaqAction, readExpertises, readFaqs, saveFaqAction } from "@/lib/cms-actions";

export const metadata: Metadata = {
  title: { absolute: "FAQ — Administration" },
  robots: { index: false, follow: false },
};

const SCOPES = [
  { value: "home", label: "Accueil" },
  { value: "expertise", label: "Pages d’expertise" },
  { value: "cabinet", label: "Le Cabinet" },
  { value: "contact", label: "Contact" },
];

export default async function FaqsAdminPage({ searchParams }: { searchParams: Promise<{ scope?: string }> }) {
  const { scope: scopeParam } = await searchParams;
  const scope = SCOPES.some((s) => s.value === scopeParam) ? (scopeParam as string) : "home";
  const [faqs, expertises] = await Promise.all([readFaqs(), readExpertises()]);
  const filtered = faqs.filter((f) => f.scope === scope);
  const expertiseName = (ownerId: number | null) =>
    expertises.find((e) => e.id === ownerId)?.domain ?? "—";

  return (
    <div>
      <PageTitle
        title="FAQ"
        subtitle="Questions-réponses de l’accueil, des pages d’expertise, du cabinet et du contact. L’ordre défini ici est celui du site et du balisage FAQPage."
      />

      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Filtrer par périmètre">
        {SCOPES.map((s) => (
          <Link
            key={s.value}
            href={`/admin/faqs?scope=${s.value}`}
            className={`${s.value === scope ? admin.btn : admin.btnGhost} !px-3 !py-2`}
          >
            {s.label} ({faqs.filter((f) => f.scope === s.value).length})
          </Link>
        ))}
      </nav>

      <div className="mt-6 space-y-2">
        {filtered.map((faq, index) => (
          <Card key={faq.id} className="!p-4">
            <form action={saveFaqAction} className="grid grid-cols-1 gap-3">
              <input type="hidden" name="id" value={faq.id} />
              <input type="hidden" name="scope" value={faq.scope} />
              <input type="hidden" name="ownerId" value={faq.ownerId ?? ""} />
              <input type="hidden" name="position" value={faq.position} />
              <Field label="Question" name="question" defaultValue={faq.question} required />
              <Field label="Réponse" name="answer" rows={3} defaultValue={faq.answer} required />
              <div className="flex flex-wrap items-center gap-3">
                <Badge>{faq.scope === "expertise" ? expertiseName(faq.ownerId) : faq.scope}</Badge>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="enabled" defaultChecked={faq.enabled} className="h-4 w-4 accent-[#111827]" />
                  Active
                </label>
                <Submit variant="ghost">Enregistrer</Submit>
              </div>
            </form>
            <div className="mt-3 flex items-center gap-2 border-t border-[#EFEBE2] pt-3">
              <form action={moveFaqAction}>
                <input type="hidden" name="id" value={faq.id} />
                <input type="hidden" name="direction" value="up" />
                <button type="submit" className={`${admin.btnGhost} !px-2 !py-1`} disabled={index === 0} aria-label="Monter">↑</button>
              </form>
              <form action={moveFaqAction}>
                <input type="hidden" name="id" value={faq.id} />
                <input type="hidden" name="direction" value="down" />
                <button type="submit" className={`${admin.btnGhost} !px-2 !py-1`} disabled={index === filtered.length - 1} aria-label="Descendre">↓</button>
              </form>
              <form action={deleteFaqAction}>
                <input type="hidden" name="id" value={faq.id} />
                <button type="submit" className={admin.btnDanger}>Supprimer</button>
              </form>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className={`${admin.card} px-4 py-6 text-sm ${admin.muted}`}>Aucune question pour ce périmètre.</p>
        )}
      </div>

      <Card className="mt-8">
        <h2 className="font-display text-[1.15rem] text-[#111827]">Ajouter une question</h2>
        <form action={saveFaqAction} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input type="hidden" name="scope" value={scope} />
          <Field label="Question" name="question" required />
          <Field label="Position" name="position" type="number" defaultValue={filtered.length} />
          <div className="sm:col-span-2">
            <Field label="Réponse" name="answer" rows={3} required />
          </div>
          {scope === "expertise" && (
            <div>
              <label htmlFor="f-ownerId" className={admin.label}>Page d’expertise</label>
              <select id="f-ownerId" name="ownerId" className={admin.input} defaultValue={String(expertises[0]?.id ?? "")}>
                {expertises.map((e) => (
                  <option key={e.id} value={e.id}>{e.domain}</option>
                ))}
              </select>
            </div>
          )}
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" name="enabled" defaultChecked className="h-4 w-4 accent-[#111827]" />
            Active
          </label>
          <div className="sm:col-span-2">
            <Submit>Ajouter la question</Submit>
          </div>
        </form>
      </Card>
    </div>
  );
}
