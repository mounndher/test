import type { Metadata } from "next";
import { admin, Badge, Card, Field, ImageSelect, PageTitle, Submit } from "@/components/admin/AdminUI";
import { readMedia, readPages, savePageSeoAction } from "@/lib/cms-actions";

export const metadata: Metadata = {
  title: { absolute: "SEO par page — Administration" },
  robots: { index: false, follow: false },
};

export default async function SeoAdminPage() {
  const [pages, media] = await Promise.all([readPages(), readMedia()]);

  return (
    <div>
      <PageTitle
        title="SEO par page"
        subtitle="Titre (≤ 60 caractères conseillés), description (≤ 155), image OpenGraph, canonical et indexation. Ces valeurs alimentent generateMetadata côté site."
      />

      <div className="mt-8 space-y-2">
        {pages.map((page) => (
          <Card key={page.id} className="!p-4">
            <form action={savePageSeoAction} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input type="hidden" name="id" value={page.id} />
              <div className="flex items-center justify-between gap-3 sm:col-span-2">
                <p className="font-display text-[1.05rem] text-[#111827]">{page.path}</p>
                <div className="flex items-center gap-2">
                  <Badge tone={page.noindex ? "warning" : "success"}>{page.noindex ? "noindex" : "indexable"}</Badge>
                  <span className={`text-xs ${admin.muted}`}>{page.title.length} c. · {page.description.length} c.</span>
                </div>
              </div>
              <div className="sm:col-span-2">
                <Field label="Titre" name="title" defaultValue={page.title} required />
              </div>
              <div className="sm:col-span-2">
                <Field label="Description" name="description" rows={2} defaultValue={page.description} required />
              </div>
              <Field label="Canonical (facultatif)" name="canonicalOverride" defaultValue={page.canonicalOverride ?? ""} />
              <ImageSelect label="Image OpenGraph" name="ogImage" value={page.ogImage} options={media} />
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <input type="checkbox" name="noindex" defaultChecked={page.noindex} className="h-4 w-4 accent-[#111827]" />
                Exclure de l’indexation (noindex, follow)
              </label>
              <div className="sm:col-span-2">
                <Submit>Enregistrer le SEO</Submit>
              </div>
            </form>
          </Card>
        ))}
      </div>
    </div>
  );
}
