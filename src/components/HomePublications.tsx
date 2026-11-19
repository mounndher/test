import Link from "next/link";
import { getPublications } from "@/lib/cms";
import { Reveal, Section } from "@/components/ui";

/**
 * Compact homepage section for the three verified external publications.
 * Honest framing: 2020 employment-law articles, informational only, distinct from
 * the firm's current business-litigation practice (no claim of recent publishing).
 */
export default async function HomePublications() {
  const publications = await getPublications();
  if (publications.length === 0) return null;

  return (
    <Section id="publications" index="06" label="Publications">
      <div className="grid grid-cols-12 gap-x-6 gap-y-8">
        <Reveal className="col-span-12 lg:col-span-6">
          <h2 id="publications-title" className="display-lg font-display text-navy">
            Publications de Maître Pierre Blexmann
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="col-span-12 lg:col-span-5 lg:col-start-8">
          <p className="text-[1.0625rem] leading-[1.6] text-ink/80">
            Trois articles publiés en 2020 sur Village de la Justice, relatifs au régime de la
            preuve en droit du travail. Ils ont une portée strictement informative et ne
            relèvent pas du contentieux des affaires, activité principale du cabinet.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="mt-12">
        <ul className="rule-double border-b border-rule">
          {publications.map((pub) => (
            <li key={pub.id} className="border-t border-rule py-5">
              <article className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div className="min-w-0">
                  <p className="eyebrow text-mute">
                    <time dateTime={pub.isoDate}>{pub.publishedDate}</time> · {pub.venue}
                  </p>
                  <h3 className="mt-2 font-display text-[1.15rem] leading-snug text-navy">
                    <a
                      href={pub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-bronze"
                    >
                      {pub.title}
                      <span aria-hidden="true" className="ml-2 text-bronze">
                        ↗
                      </span>
                    </a>
                  </h3>
                </div>
                <a
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow shrink-0 link-underline text-navy transition-colors hover:text-bronze"
                >
                  Lire sur Village de la Justice
                </a>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-8">
          <Link
            href="/publications"
            className="eyebrow group inline-flex items-center gap-3 border-b border-gold pb-2 text-navy transition-colors hover:text-bronze"
          >
            Toutes les publications
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </p>
      </Reveal>
    </Section>
  );
}
