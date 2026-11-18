import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AuditComment from "@/components/AuditComment";
import { BookingActions } from "@/components/BookingCta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import { ABOUT, EXPERTISES, MARD, SITE } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";

const TITLE = "Maître Pierre Blexmann | Blexmann Avocats Paris";
const DESCRIPTION =
  "Blexmann Avocats, fondé en 2013 par Maître Pierre Blexmann à Paris 16e (53 avenue Victor Hugo) : contentieux des affaires, médiation et arbitrage.";
const PATH = "/le-cabinet";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "website",
});

const FAQS = [
  {
    q: "Quelles sont les modalités de rendez-vous proposées par le cabinet ?",
    a: "Le cabinet reçoit sur rendez-vous au cabinet (Paris, 53 avenue Victor Hugo, 75116), en visioconférence ou par téléphone, selon vos contraintes géographiques et votre agenda.",
  },
  {
    q: "Devant quelles juridictions le cabinet intervient-il ?",
    a: "Établi à Paris, le cabinet représente ses clients devant les juridictions françaises compétentes en contentieux des affaires — notamment le tribunal des activités économiques de Paris, le tribunal judiciaire et la cour d’appel de Paris — ainsi que dans le cadre des modes alternatifs de règlement des différends (négociation, médiation, conciliation, arbitrage).",
  },
  {
    q: "Comment sont encadrés l’acceptation d’un dossier et les honoraires ?",
    a: "Une relation avocat-client ne s’établit qu’après l’acceptation expresse du dossier par le cabinet, précédée notamment de la vérification de l’absence de conflit d’intérêts. Les modalités d’honoraires sont présentées avant toute intervention et formalisées par une convention écrite.",
  },
] as const;

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE.url}${PATH}#profile`,
  url: `${SITE.url}${PATH}`,
  mainEntity: { "@id": `${SITE.url}/#founder` },
};

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <Header />
      <main id="main" className="bg-ivory">
        <JsonLd data={faqJsonLd} />
        <JsonLd data={profileJsonLd} />
        <article className="mx-auto w-full max-w-[92rem] px-5 pb-24 pt-10 sm:px-8 lg:px-12 lg:pb-32 lg:pt-14">
          <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Le Cabinet" }]} currentPath={PATH} />
          <p className="eyebrow mt-10 text-bronze">{ABOUT.eyebrow}</p>
          <h1 className="display-lg mt-6 max-w-[22ch] font-display text-navy">{ABOUT.name}</h1>
          <div aria-hidden="true" className="mt-8 h-px w-full max-w-[28rem] bg-gold" />

          <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12 lg:col-span-7">
              <p className="max-w-[38ch] font-display text-[1.35rem] leading-[1.45] text-ink sm:text-[1.55rem]">
                {ABOUT.lead}
              </p>

              <h2 className="mt-14 font-display text-[1.6rem] leading-snug text-navy">
                Parcours et exercice professionnel
              </h2>
              {/* TODO: Verify with lawyer: Founding year 2013, Oath date, Toque number, SIREN */}
              <AuditComment text="TODO: Verify with lawyer: Founding year 2013, Oath date, Toque number, SIREN" />
              {ABOUT.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 32)}
                  className="measure mt-4 text-[1rem] leading-[1.75] text-ink/85"
                >
                  {p}
                </p>
              ))}

              <h2 className="mt-14 font-display text-[1.6rem] leading-snug text-navy">
                Conduite des dossiers et voies de résolution
              </h2>
              <p className="measure mt-4 text-[1rem] leading-[1.75] text-ink/85">{MARD.body}</p>
              <p className="measure mt-4 text-[1rem] leading-[1.75] text-ink/85">
                Avant toute procédure, le cabinet fait porter son analyse sur le fondement
                juridique, la qualité des preuves disponibles, les délais applicables et les
                conséquences concrètes pour l&rsquo;exploitation. Les modalités d&rsquo;honoraires
                sont présentées avant toute intervention.
              </p>

              <h2 className="mt-14 font-display text-[1.6rem] leading-snug text-navy">
                Domaines d&rsquo;intervention en contentieux des affaires
              </h2>
              <ul className="mt-6 space-y-3">
                {EXPERTISES.map((e) => (
                  <li key={e.id} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-5 shrink-0 bg-gold" />
                    <Link
                      href={e.href}
                      className="link-underline text-[1rem] leading-[1.7] text-navy hover:text-bronze"
                    >
                      {e.domain}
                    </Link>
                  </li>
                ))}
              </ul>

              <h2 className="mt-14 font-display text-[1.6rem] leading-snug text-navy">
                Publications externes
              </h2>
              <p className="measure mt-4 text-[1rem] leading-[1.75] text-ink/85">
                Des contributions rédigées par Maître Pierre Blexmann ont été publiées en 2020 sur
                la revue juridique Village de la Justice, consacrées au régime de la preuve en droit
                du travail.
              </p>
              <p className="mt-4">
                <Link
                  href="/publications"
                  className="eyebrow group inline-flex items-center gap-3 border-b border-gold pb-2 text-navy transition-colors hover:text-bronze"
                >
                  Consulter les publications externes
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </p>

              <h2 className="mt-14 font-display text-[1.6rem] leading-snug text-navy">
                Questions fréquentes
              </h2>
              <FaqList items={FAQS} />
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <figure className="relative">
                <div className="relative aspect-[4/5] overflow-hidden bg-navy">
                  <Image
                    src="/images/cabinet-salon.jpg"
                    alt="Salon de réception de Blexmann Avocats, 53 avenue Victor Hugo à Paris 16e"
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="eyebrow mt-4 text-mute">
                  {SITE.name} — {SITE.address.street}, {SITE.address.arrondissement}
                </figcaption>
              </figure>

              <dl className="rule-double mt-10 grid grid-cols-1 gap-x-6 gap-y-6 pt-7 sm:grid-cols-2 lg:grid-cols-1">
                {ABOUT.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="eyebrow text-mute">{fact.label}</dt>
                    <dd className="mt-2 font-display text-[1.05rem] leading-snug text-navy">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-20 bg-navy px-6 py-12 sm:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="max-w-[42ch] font-display text-2xl leading-snug text-ivory">
                  Quelques lignes sur les faits suffisent pour solliciter un premier rendez-vous.
                </p>
                <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-ivory/75">
                  {SITE.confidentialityNotice}
                </p>
              </div>
              <BookingActions contactHref="/contact#contact-form" tone="dark" />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
