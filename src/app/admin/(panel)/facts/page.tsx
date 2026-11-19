import type { Metadata } from "next";
import { admin, Badge, Card, Field, PageTitle, Select, Submit } from "@/components/admin/AdminUI";
import { deleteFactAction, readFacts, saveFactAction } from "@/lib/cms-actions";

export const metadata: Metadata = {
  title: { absolute: "Repères & Chiffres — Administration" },
  robots: { index: false, follow: false },
};

const SCOPES = [
  { value: "trust-strip", label: "Bandeau de confiance (hero)" },
  { value: "home", label: "Page d’accueil" },
  { value: "cabinet", label: "Page Le Cabinet" },
];

export default async function FactsAdminPage() {
  const facts = await readFacts();

  return (
    <div>
      <PageTitle
        title="Repères & Chiffres"
        subtitle="Libellés factuels affichés sous le hero, sur l’accueil et sur la page Le Cabinet. Chaque repère comporte un intitulé et une valeur."
      />

      {SCOPES.map((scope) => {
        const scoped = facts.filter((f) => f.scope === scope.value);
        return (
          <section key={scope.value} className="mt-10">
            <h2 className={`text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${admin.accent}`}>
              {scope.label} ({scoped.length})
            </h2>
            <div className="mt-3 space-y-2">
              {scoped.map((fact) => (
                <Card key={fact.id} className="!p-4">
                  <form action={saveFactAction} className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_1fr_6rem_auto]">
                    <input type="hidden" name="id" value={fact.id} />
                    <input type="hidden" name="scope" value={fact.scope} />
                    <Field label="Intitulé" name="label" defaultValue={fact.label} required />
                    <Field label="Valeur" name="value" defaultValue={fact.value} />
                    <Field label="Ordre" name="position" type="number" defaultValue={fact.position} />
                    <div className="flex gap-2">
                      <Submit variant="ghost">Enregistrer</Submit>
                    </div>
                  </form>
                  <form action={deleteFactAction} className="mt-2">
                    <input type="hidden" name="id" value={fact.id} />
                    <button type="submit" className={admin.btnDanger}>Supprimer</button>
                  </form>
                </Card>
              ))}
              {scoped.length === 0 && (
                <p className={`${admin.card} px-4 py-4 text-sm ${admin.muted}`}>Aucun repère.</p>
              )}
            </div>
          </section>
        );
      })}

      <Card className="mt-10">
        <h2 className="font-display text-[1.15rem] text-[#111827]">Ajouter un repère</h2>
        <form action={saveFactAction} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Emplacement" name="scope" value="home" options={SCOPES} />
          <Field label="Intitulé" name="label" required />
          <Field label="Valeur" name="value" />
          <Field label="Ordre" name="position" type="number" defaultValue={99} />
          <div className="sm:col-span-2">
            <Submit>Ajouter</Submit>
          </div>
        </form>
      </Card>
      <p className={`mt-6 text-xs ${admin.muted}`}>
        <Badge>Rappel</Badge> Les mentions de barreau, de toque et d’année de fondation doivent rester
        exactes.
      </p>
    </div>
  );
}
