import Link from "next/link";
import { CTA, EXPERTISES } from "@/content/site";
import { Reveal, Section } from "@/components/ui";

/**
 * Seven visible cards (title + one-line hook + link) instead of a hidden accordion.
 * Server component. Each <li id> keeps the historic anchors (#commercial-contractuel, …).
 */
export default function Expertises() {
  return (
    <Section id="expertises" index="01" label="Expertises">
      <Reveal>
        <h2 id="expertises-title" className="display-lg max-w-[20ch] font-display text-navy">
          Derrière chaque litige, un enjeu économique concret.
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="measure mt-6 text-[1.0625rem] leading-[1.6] text-ink/80">
          Sept domaines d’intervention en contentieux des affaires, à Paris. Chaque page détaille
          les situations traitées et la conduite du dossier.
        </p>
      </Reveal>

      <Reveal delay={0.12} className="mt-14">
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {EXPERTISES.map((item) => (
            <li key={item.id} id={item.id} className="scroll-mt-24">
              <article className="group relative flex h-full flex-col border border-rule bg-ivory p-6 transition-colors duration-300 focus-within:border-gold hover:border-gold sm:p-7">
                <span aria-hidden="true" className="font-display text-lg italic text-bronze">
                  {item.index}
                </span>
                <h3 className="mt-4 font-display text-[1.35rem] leading-snug text-navy transition-colors group-hover:text-bronze">
                  <Link href={item.href} className="after:absolute after:inset-0">
                    {item.domain}
                  </Link>
                </h3>
                <p className="mt-3 max-w-[40ch] text-[1rem] leading-[1.6] text-ink/80">
                  {item.hook}
                </p>
                <span
                  aria-hidden="true"
                  className="eyebrow mt-auto flex items-center gap-3 pt-6 text-navy"
                >
                  Consulter la page
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </article>
            </li>
          ))}

          <li className="sm:col-span-2 xl:col-span-2">
            <div className="flex h-full flex-col justify-between gap-6 bg-navy p-6 text-ivory sm:p-7">
              <p className="max-w-[34ch] font-display text-[1.35rem] leading-snug">
                Votre situation relève d’un autre litige d’entreprise ? Exposez les faits en quelques
                lignes.
              </p>
              <a
                href="#contact"
                className="eyebrow group inline-flex w-fit items-center gap-3 bg-ivory px-7 py-4 text-navy transition-colors duration-300 hover:bg-goldsoft"
              >
                {CTA.primary}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </li>
        </ul>
      </Reveal>
    </Section>
  );
}
