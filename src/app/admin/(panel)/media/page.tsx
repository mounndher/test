import type { Metadata } from "next";
import Image from "next/image";
import { admin, Card, Field, PageTitle, Submit } from "@/components/admin/AdminUI";
import { deleteMediaAction, readMedia, saveMediaAction, uploadMediaAction } from "@/lib/cms-actions";

export const metadata: Metadata = {
  title: { absolute: "Médiathèque — Administration" },
  robots: { index: false, follow: false },
};

export default async function MediaAdminPage() {
  const media = await readMedia();

  return (
    <div>
      <PageTitle
        title="Médiathèque"
        subtitle="Images du site, textes alternatifs et remplacement. Le texte alternatif est obligatoire : il est lu par les lecteurs d’écran et utilisé par les moteurs de recherche."
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {media.map((item) => (
          <Card key={item.id} className="!p-4">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#EFEBE2]">
              <Image src={item.url} alt={item.alt} fill sizes="320px" className="object-cover" />
            </div>
            <form action={saveMediaAction} className="mt-3 grid grid-cols-1 gap-3">
              <input type="hidden" name="id" value={item.id} />
              <Field label="URL du fichier" name="url" defaultValue={item.url} />
              <Field label="Texte alternatif" name="alt" rows={2} defaultValue={item.alt} required />
              <div className="flex flex-wrap gap-2">
                <Submit variant="ghost">Enregistrer</Submit>
              </div>
            </form>
            <form action={deleteMediaAction} className="mt-2">
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className={admin.btnDanger}>Supprimer</button>
            </form>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="font-display text-[1.15rem] text-[#111827]">Téléverser une image</h2>
          <form action={uploadMediaAction} className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="f-file" className={admin.label}>Fichier (JPEG, PNG, WebP, AVIF — 4 Mo max.)</label>
              <input
                id="f-file"
                name="file"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                required
                className={`${admin.input} file:mr-3 file:border-0 file:bg-[#111827] file:px-3 file:py-1.5 file:text-[0.66rem] file:uppercase file:tracking-[0.14em] file:text-white`}
              />
            </div>
            <Field label="Texte alternatif" name="alt" required />
            <div>
              <Submit>Téléverser</Submit>
            </div>
          </form>
        </Card>

        <Card>
          <h2 className="font-display text-[1.15rem] text-[#111827]">Référencer une image existante</h2>
          <form action={saveMediaAction} className="mt-4 grid grid-cols-1 gap-4">
            <Field label="URL (ex. /images/hero-facade.jpg)" name="url" required />
            <Field label="Texte alternatif" name="alt" required />
            <div>
              <Submit>Ajouter</Submit>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
