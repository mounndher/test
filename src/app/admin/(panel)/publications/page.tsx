import type { Metadata } from "next";
import { admin, Badge, Card, Field, PageTitle, Select, Submit } from "@/components/admin/AdminUI";
import {
  deletePublicationAction,
  readPublications,
  savePublicationAction,
  togglePublicationAction,
} from "@/lib/cms-actions";

export const metadata: Metadata = {
  title: { absolute: "Publications — Administration" },
  robots: { index: false, follow: false },
};

export default async function PublicationsAdminPage() {
  const publications = await readPublications();

  return (
    <div>
      <PageTitle
        title="Publications"
        subtitle="Articles publiés à titre externe (Village de la Justice). Chaque publication est un lien sortant vérifié : titre, date, résumé et URL."
      />

      <div className="mt-8 space-y-2">
        {publications.map((publication) => (
          <Card key={publication.id} className="!p-4">
            <form action={savePublicationAction} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input type="hidden" name="id" value={publication.id} />
              <input type="hidden" name="externalId" value={publication.externalId} />
              <input type="hidden" name="position" value={publication.position} />
              <div className="sm:col-span-2">
                <Field label="Titre" name="title" defaultValue={publication.title} required />
              </div>
              <div className="sm:col-span-2">
                <Field label="Résumé" name="excerpt" rows={2} defaultValue={publication.excerpt ?? ""} />
              </div>
              <Field label="Support" name="venue" defaultValue={publication.venue} />
              <Field label="Auteur" name="author" defaultValue={publication.author} />
              <Field label="Thème" name="theme" defaultValue={publication.theme ?? ""} />
              <Field label="Date affichée" name="publishedLabel" defaultValue={publication.publishedLabel} />
              <Field label="Date (ISO)" name="publishedOn" type="date" defaultValue={String(publication.publishedOn)} />
              <Select
                label="Statut"
                name="status"
                value={publication.status}
                options={[
                  { value: "published", label: "Publiée" },
                  { value: "draft", label: "Brouillon" },
                ]}
              />
              <div className="sm:col-span-2">
                <Field label="URL" name="url" defaultValue={publication.url} required />
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:col-span-2">
                <Submit>Enregistrer</Submit>
                <Badge tone={publication.status === "published" ? "success" : "warning"}>
                  {publication.status === "published" ? "En ligne" : "Brouillon"}
                </Badge>
              </div>
            </form>
            <div className="mt-3 flex gap-2 border-t border-[#EFEBE2] pt-3">
              <form action={togglePublicationAction}>
                <input type="hidden" name="id" value={publication.id} />
                <button type="submit" className={admin.btnGhost}>
                  {publication.status === "published" ? "Dépublier" : "Publier"}
                </button>
              </form>
              <form action={deletePublicationAction}>
                <input type="hidden" name="id" value={publication.id} />
                <button type="submit" className={admin.btnDanger}>Supprimer</button>
              </form>
            </div>
          </Card>
        ))}
        {publications.length === 0 && (
          <p className={`${admin.card} px-4 py-6 text-sm ${admin.muted}`}>Aucune publication.</p>
        )}
      </div>

      <Card className="mt-8">
        <h2 className="font-display text-[1.15rem] text-[#111827]">Ajouter une publication</h2>
        <form action={savePublicationAction} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Titre" name="title" required />
          </div>
          <div className="sm:col-span-2">
            <Field label="Résumé" name="excerpt" rows={2} />
          </div>
          <Field label="Support" name="venue" defaultValue="Village de la Justice" />
          <Field label="Auteur" name="author" defaultValue="Pierre Blexmann, avocat" />
          <Field label="Thème" name="theme" />
          <Field label="Date affichée" name="publishedLabel" placeholder="12 mars 2026" />
          <Field label="Date (ISO)" name="publishedOn" type="date" />
          <Select
            label="Statut"
            name="status"
            value="draft"
            options={[
              { value: "published", label: "Publiée" },
              { value: "draft", label: "Brouillon" },
            ]}
          />
          <div className="sm:col-span-2">
            <Field label="URL" name="url" type="url" placeholder="https://…" required />
          </div>
          <div className="sm:col-span-2">
            <Submit>Ajouter</Submit>
          </div>
        </form>
      </Card>
    </div>
  );
}
