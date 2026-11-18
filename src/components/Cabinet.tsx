import Image from "next/image";
import Link from "next/link";
import AuditComment from "@/components/AuditComment";
import { ABOUT, SITE } from "@/content/site";
import { Reveal, Section } from "@/components/ui";

export default function Cabinet() {
  return (
    <Section id="cabinet" index="04" label="Le Cabinet" tone="paper">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-6">
          <Reveal>
            <p className="eyebrow text-bronze">{ABOUT.eyebrow}</p>
            <h2 id="cabinet-title" className="display-lg mt-5 font-display text-navy">
              {ABOUT.name}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-8 max-w-[38ch] font-display text-[1.35rem] leading-[1.45] text-ink sm:text-[1.55rem]">
              {ABOUT.homeLead}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            {/* TODO: Verify with lawyer: Founding year 2013 */}
            <AuditComment text="TODO: Verify with lawyer: Founding year 2013" />
            <p className="measure mt-6 text-[1.0625rem] leading-[1.6] text-ink/80">
              {ABOUT.homeParagraph}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="rule-double mt-12 grid grid-cols-1 gap-y-6 pt-7 sm:grid-cols-2 sm:gap-x-6">
              {ABOUT.homeFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className="eyebrow text-mute">{fact.label}</dt>
                  <dd className="mt-2 font-display text-[1.05rem] leading-snug text-navy">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-9">
              <Link
                href="/le-cabinet"
                className="eyebrow group inline-flex items-center gap-3 border-b border-gold pb-2 text-navy transition-colors hover:text-bronze"
              >
                Présentation complète de {SITE.name}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <Reveal delay={0.1}>
            <figure className="relative">
              <div className="relative aspect-[4/3] overflow-hidden bg-navy lg:aspect-[4/5]">
                <Image
                  src="/images/cabinet-salon.jpg"
                  alt="Salon de réception de Blexmann Avocats, 53 avenue Victor Hugo à Paris 16e"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="eyebrow mt-4 text-mute">
                {SITE.name} — {SITE.address.street}, {SITE.address.arrondissement}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
