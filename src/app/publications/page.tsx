import type { Metadata } from "next";
import Link from "next/link";
import AuditComment from "@/components/AuditComment";
import { BookingActions } from "@/components/BookingCta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { EXTERNAL_PUBLICATIONS } from "@/content/articles";
import { EXPERTISES, SITE } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";

const TITLE = "Publications externes | Blexmann Avocats";
const DESCRIPTION =
  "Publications externes parues sur Village de la Justice — Blexmann Avocats, contentieux des affaires à Paris 16e. Contenus documentaires et informatifs.";
const PATH = "/publications";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "website",
  // Secondary page: the 2020 employment-law articles must not dilute the business-litigation focus.
  noindex: true,
});

export default function Page() {
  return (
    <>
      <Header />
      <main id="main" className="bg-ivory">
        <article className="mx-auto w-full max-w-[92rem] px-5 pb-24 pt-10 sm:px-8 lg:px-12 lg:pb-32 lg:pt-14">
          <Breadcrumbs
            items={[{ label: "Accueil", href: "/" }, { label: "Publications externes" }]}
          />
          <p className="eyebrow mt-10 text-bronze">Références éditoriales</p>
          <h1 className="display-lg mt-6 max-w-[22ch] font-display text-navy">
            Publications externes
          </h1>
          <div aria-hidden="true" className="mt-8 h-px w-full max-w-[28rem] bg-gold" />

          {/* TODO: Verify with lawyer: replace 2020 labor law articles with recent commercial litigation articles */}
          <AuditComment text="TODO: Verify with lawyer: replace 2020 labor law articles with recent commercial litigation articles" />
          <p className="measure mt-8 text-[1.0625rem] leading-[1.75] text-ink/85">
            Cette page rassemble des contributions publiées à titre externe par Maître Pierre
            Blexmann sur la revue juridique Village de la Justice. Rédigées en 2020 sur
            l&rsquo;administration de la preuve en droit du travail, elles témoignent de travaux
            antérieurs publiés hors du site et demeurent distinctes de l&rsquo;activité principale
            actuelle de {SITE.name}, consacrée au contentieux des affaires.
          </p>

          <h2 className="mt-14 font-display text-[1.6rem] leading-snug text-navy">
            Articles publiés sur Village de la Justice
          </h2>
          <ul className="rule-double mt-6 border-b border-rule">
            {EXTERNAL_PUBLICATIONS.map((pub, i) => (
              <li key={pub.id} className="border-t border-rule first:border-t-0">
                <article className="grid grid-cols-12 gap-x-4 gap-y-3 py-8 sm:py-9">
                  <div className="col-span-12 sm:col-span-2">
                    <span className="font-display text-lg italic text-bronze">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="eyebrow mt-2 text-mute">{pub.status}</p>
                    <p className="mt-1 text-xs text-mute">
                      <time dateTime={pub.isoDate}>{pub.publishedDate}</time>
                    </p>
                  </div>
                  <div className="col-span-12 sm:col-span-7">
                    <h3 className="font-display text-[1.25rem] leading-snug text-navy sm:text-[1.4rem]">
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
                    <p className="measure mt-3 text-[0.9375rem] leading-[1.7] text-ink/85">
                      {pub.excerpt}
                    </p>
                    <p className="eyebrow mt-4 text-mute">
                      {pub.venue} · {pub.author} · {pub.theme}
                    </p>
                  </div>
                  <div className="col-span-12 flex items-start sm:col-span-3 sm:justify-end">
                    <a
                      href={pub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="eyebrow group inline-flex items-center gap-3 border-b border-gold pb-2 text-navy transition-colors hover:text-bronze"
                    >
                      Lire sur Village de la Justice
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <p className="measure mt-6 text-xs leading-relaxed text-mute">
            Contenus à portée strictement informative et documentaire&nbsp;: ces publications ne
            constituent ni une consultation juridique ni un conseil personnalisé, ne tiennent pas
            nécessairement compte des évolutions législatives ou jurisprudentielles postérieures à
            leur parution, et leur lecture ne crée aucune relation avocat-client.
          </p>

          <section aria-labelledby="domaines-actuels-title" className="mt-16 bg-paper/70 p-6 sm:p-9">
            <p className="eyebrow text-bronze">Pratique actuelle du cabinet</p>
            <h2
              id="domaines-actuels-title"
              className="mt-3 font-display text-[1.5rem] leading-snug text-navy"
            >
              Domaines d&rsquo;intervention en contentieux des affaires
            </h2>
            <p className="measure mt-3 text-[0.95rem] leading-[1.75] text-ink/80">
              Pour un litige touchant aux contrats commerciaux, à la gouvernance, à la
              responsabilité d&rsquo;un dirigeant ou à une opération de cession, consultez les pages
              dédiées de {SITE.name}&nbsp;:
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {EXPERTISES.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-gold" />
                  <Link
                    href={item.href}
                    className="link-underline text-sm leading-relaxed text-navy hover:text-bronze"
                  >
                    {item.domain}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-20 bg-navy px-6 py-12 sm:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-[42ch] font-display text-2xl leading-snug text-ivory">
                Confronté à un litige commercial ou sociétaire&nbsp;? Exposez les faits au cabinet.
              </p>
              <BookingActions contactHref="/contact#contact-form" tone="dark" />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
