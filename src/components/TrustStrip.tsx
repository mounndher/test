import AuditComment from "@/components/AuditComment";
import { SITE } from "@/content/site";

const ITEMS = [
  SITE.barreau,
  `Toque ${SITE.toque}`,
  `Depuis ${SITE.founded}`,
  SITE.address.arrondissement,
  "Confidentialité",
] as const;

/** Factual trust strip under the hero — no claims, only verifiable professional facts. */
export default function TrustStrip() {
  return (
    <section aria-label="Repères du cabinet" className="border-y border-rule bg-paper">
      {/* TODO: Verify with lawyer: Toque number, Founding year 2013 */}
      <AuditComment text="TODO: Verify with lawyer: Toque number, Founding year 2013" />
      <ul className="mx-auto flex w-full max-w-[92rem] flex-wrap items-center justify-center gap-x-9 gap-y-3 px-5 py-5 sm:px-8 lg:justify-between lg:px-12">
        {ITEMS.map((item) => (
          <li key={item} className="eyebrow flex items-center gap-3 text-navy">
            <span aria-hidden="true" className="h-px w-4 bg-gold" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
