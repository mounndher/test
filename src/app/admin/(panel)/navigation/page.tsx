import type { Metadata } from "next";
import { admin, Badge, Card, Field, PageTitle, Select, Submit } from "@/components/admin/AdminUI";
import { deleteNavAction, moveNavAction, readNav, saveNavAction } from "@/lib/cms-actions";

export const metadata: Metadata = {
  title: { absolute: "Navigation — Administration" },
  robots: { index: false, follow: false },
};

const LOCATIONS = [
  { value: "header", label: "En-tête principal" },
  { value: "footer-nav", label: "Pied de page — Navigation" },
  { value: "footer-expertises", label: "Pied de page — Expertises" },
  { value: "footer-info", label: "Pied de page — Informations" },
];

export default async function NavigationAdminPage() {
  const items = await readNav();

  return (
    <div>
      <PageTitle
        title="Navigation"
        subtitle="Liens de l’en-tête et des trois colonnes du pied de page. L’ordre est celui du site ; chaque lien peut être masqué sans être supprimé."
      />

      {LOCATIONS.map((location) => {
        const scoped = items.filter((item) => item.location === location.value);
        return (
          <section key={location.value} className="mt-10">
            <h2 className={`text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${admin.accent}`}>
              {location.label} ({scoped.length})
            </h2>
            <div className="mt-3 space-y-2">
              {scoped.map((item, index) => (
                <Card key={item.id} className="!p-4">
                  <form action={saveNavAction} className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1.2fr_1.4fr_5rem_auto]">
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="location" value={item.location} />
                    <Field label="Libellé" name="label" defaultValue={item.label} required />
                    <Field label="URL" name="href" defaultValue={item.href} required />
                    <Field label="Ordre" name="position" type="number" defaultValue={item.position} />
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-xs">
                        <input type="checkbox" name="visible" defaultChecked={item.visible} className="h-4 w-4 accent-[#111827]" />
                        Visible
                      </label>
                      <Submit variant="ghost">Enregistrer</Submit>
                    </div>
                  </form>
                  <div className="mt-3 flex items-center gap-2 border-t border-[#EFEBE2] pt-3">
                    <Badge tone={item.visible ? "success" : "warning"}>{item.visible ? "Visible" : "Masqué"}</Badge>
                    <form action={moveNavAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="direction" value="up" />
                      <button type="submit" className={`${admin.btnGhost} !px-2 !py-1`} disabled={index === 0} aria-label="Monter">↑</button>
                    </form>
                    <form action={moveNavAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="direction" value="down" />
                      <button type="submit" className={`${admin.btnGhost} !px-2 !py-1`} disabled={index === scoped.length - 1} aria-label="Descendre">↓</button>
                    </form>
                    <form action={deleteNavAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <button type="submit" className={admin.btnDanger}>Supprimer</button>
                    </form>
                  </div>
                </Card>
              ))}
              {scoped.length === 0 && (
                <p className={`${admin.card} px-4 py-4 text-sm ${admin.muted}`}>Aucun lien.</p>
              )}
            </div>
          </section>
        );
      })}

      <Card className="mt-10">
        <h2 className="font-display text-[1.15rem] text-[#111827]">Ajouter un lien</h2>
        <form action={saveNavAction} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Emplacement" name="location" value="header" options={LOCATIONS} />
          <Field label="Libellé" name="label" required />
          <Field label="URL" name="href" placeholder="/contact" required />
          <Field label="Ordre" name="position" type="number" defaultValue={99} />
          <div className="sm:col-span-2">
            <Submit>Ajouter</Submit>
          </div>
        </form>
      </Card>
    </div>
  );
}
