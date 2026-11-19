import type { Metadata } from "next";
import { admin, Badge, Card, PageTitle, Submit } from "@/components/admin/AdminUI";
import { readRevisions, restoreRevisionAction } from "@/lib/cms-actions";

export const metadata: Metadata = {
  title: { absolute: "Historique — Administration" },
  robots: { index: false, follow: false },
};

const ENTITY_LABELS: Record<string, string> = {
  sections: "Section d’accueil",
  expertises: "Expertise",
  faq_items: "Question FAQ",
  publications: "Publication",
  facts: "Repère",
  pages: "Page (SEO)",
};

export default async function RevisionsAdminPage() {
  const revisions = await readRevisions();

  return (
    <div>
      <PageTitle
        title="Historique"
        subtitle="Instantané du contenu avant chaque enregistrement. « Restaurer » réapplique la version choisie et régénère immédiatement les pages publiques."
      />

      <div className="mt-8 space-y-2">
        {revisions.map((revision) => (
          <Card key={revision.id} className="!p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-[#111827]">
                  {ENTITY_LABELS[revision.entityType] ?? revision.entityType} #{revision.entityId}
                </p>
                <p className={`mt-1 text-xs ${admin.muted}`}>
                  {new Date(revision.createdAt).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{revision.entityType}</Badge>
                <form action={restoreRevisionAction}>
                  <input type="hidden" name="id" value={revision.id} />
                  <Submit variant="ghost">Restaurer cette version</Submit>
                </form>
              </div>
            </div>
            <details className="mt-3">
              <summary className="cursor-pointer text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8C6D46]">
                Voir l’instantané
              </summary>
              <pre className="mt-2 max-h-64 overflow-auto bg-[#F7F5F0] p-3 text-[0.7rem] leading-relaxed text-[#3F3F3A]">
                {JSON.stringify(revision.snapshot, null, 2).slice(0, 4000)}
              </pre>
            </details>
          </Card>
        ))}
        {revisions.length === 0 && (
          <p className={`${admin.card} px-4 py-6 text-sm ${admin.muted}`}>
            Aucune version enregistrée pour le moment : un instantané est créé à chaque enregistrement.
          </p>
        )}
      </div>
    </div>
  );
}
