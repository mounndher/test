import type { Metadata } from "next";
import Link from "next/link";
import { admin, Badge, Card, PageTitle } from "@/components/admin/AdminUI";
import { moveExpertiseAction, readExpertises, toggleExpertiseAction } from "@/lib/cms-actions";

export const metadata: Metadata = {
  title: { absolute: "Pages d’expertise — Administration" },
  robots: { index: false, follow: false },
};

export default async function ExpertisesAdminPage() {
  const expertises = await readExpertises();

  return (
    <div>
      <PageTitle
        title="Pages d’expertise"
        subtitle="Les sept domaines d’intervention : accroche, contenu détaillé, scénarios, domaines liés et FAQ. L’URL de chaque page est figée pour préserver le référencement."
      />
      <div className="mt-8 space-y-2">
        {expertises.map((expertise, index) => (
          <Card key={expertise.id} className="!p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <Badge>{expertise.indexLabel}</Badge>
                <div>
                  <Link
                    href={`/admin/expertises/${expertise.slug}`}
                    className="font-display text-[1.05rem] leading-snug text-[#111827] hover:text-[#8C6D46]"
                  >
                    {expertise.domain}
                  </Link>
                  <p className={`mt-1 text-xs ${admin.muted}`}>/{expertise.slug} · ancre #{expertise.anchorId}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={expertise.enabled ? "success" : "warning"}>
                  {expertise.enabled ? "Publiée" : "Masquée"}
                </Badge>
                <form action={moveExpertiseAction}>
                  <input type="hidden" name="id" value={expertise.id} />
                  <input type="hidden" name="direction" value="up" />
                  <button type="submit" className={`${admin.btnGhost} !px-2 !py-1`} aria-label="Monter" disabled={index === 0}>
                    ↑
                  </button>
                </form>
                <form action={moveExpertiseAction}>
                  <input type="hidden" name="id" value={expertise.id} />
                  <input type="hidden" name="direction" value="down" />
                  <button
                    type="submit"
                    className={`${admin.btnGhost} !px-2 !py-1`}
                    aria-label="Descendre"
                    disabled={index === expertises.length - 1}
                  >
                    ↓
                  </button>
                </form>
                <form action={toggleExpertiseAction}>
                  <input type="hidden" name="id" value={expertise.id} />
                  <input type="hidden" name="enabled" value={expertise.enabled ? "false" : "true"} />
                  <button type="submit" className={`${admin.btnGhost} !px-2 !py-1`}>
                    {expertise.enabled ? "Masquer" : "Afficher"}
                  </button>
                </form>
                <Link href={`/admin/expertises/${expertise.slug}`} className={`${admin.btn} !px-3 !py-2`}>
                  Modifier
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
