import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCta from "@/components/BookingCta";
import JsonLd from "@/components/JsonLd";
import FaqList, { type FaqItem } from "@/components/FaqList";
import { EXPERTISES, SITE, type ContactSubject } from "@/content/site";

export type Faq = FaqItem;

export type ExpertisePageData = {
  path: string;
  breadcrumbLabel: string;
  eyebrow: string;
  h1: string;
  intro: string[];
  situationsTitle: string;
  situationsText: string;
  situationsBullets: string[];
  enjeuxTitle: string;
  enjeuxParagraphs: string[];
  enjeuxPoints: string[];
  conduiteTitle: string;
  conduiteParagraphs: string[];
  faqs: Faq[];
  related: { label: string; href: string }[];
  contactSubject: ContactSubject;
};

const APPOINTMENT_LINE =
  "Premier rendez-vous au cabinet (Paris), en visioconférence ou par téléphone.";

export default function ExpertisePage({ data }: { data: ExpertisePageData }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const serviceType =
    EXPERTISES.find((e) => e.href === data.path)?.domain ?? data.breadcrumbLabel;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}${data.path}#service`,
    name: serviceType,
    serviceType,
    description: data.intro[0],
    url: `${SITE.url}${data.path}`,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "City", name: "Paris" },
  };

  const contactHref = `/contact?sujet=${encodeURIComponent(data.contactSubject)}#contact-form`;

  return (
    <>
      <Header />
      <main id="main" className="bg-ivory">
        <JsonLd data={faqJsonLd} />
        <JsonLd data={serviceJsonLd} />
        <article className="mx-auto w-full max-w-[92rem] px-5 pb-24 pt-10 sm:px-8 lg:px-12 lg:pb-32 lg:pt-14">
          <Breadcrumbs
            items={[{ label: "Accueil", href: "/" }, { label: data.breadcrumbLabel }]}
          />
          <p className="eyebrow mt-10 text-bronze">{data.eyebrow}</p>
          <h1 className="display-lg mt-6 max-w-[22ch] font-display text-navy">{data.h1}</h1>
          <div aria-hidden="true" className="mt-8 h-px w-full max-w-[28rem] bg-gold" />

          {/* Booking block — near the top */}
          <div className="mt-10 border border-rule bg-paper/60 p-6 sm:p-8">
            <p className="max-w-[52ch] font-display text-[1.25rem] leading-snug text-navy">
              {APPOINTMENT_LINE}
            </p>
            <BookingCta className="mt-5" secondaryHref={contactHref} showPhone notes />
          </div>

          <div className="mt-10 grid grid-cols-12 gap-x-6">
            <div className="col-span-12 lg:col-span-8 xl:col-span-7">
              {data.intro.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="measure mt-5 text-[1.0625rem] leading-[1.75] text-ink/85 first:mt-0"
                >
                  {p}
                </p>
              ))}

              <h2 className="mt-14 font-display text-[1.6rem] leading-snug text-navy">
                {data.situationsTitle}
              </h2>
              <p className="measure mt-4 text-[1rem] leading-[1.75] text-ink/85">
                {data.situationsText}
              </p>
              <ul className="mt-6 space-y-3.5">
                {data.situationsBullets.map((b) => (
                  <li key={b.slice(0, 36)} className="flex items-start gap-3 text-ink/85">
                    <span aria-hidden="true" className="mt-2.5 h-px w-5 shrink-0 bg-gold" />
                    <span className="measure text-[1rem] leading-[1.7]">{b}</span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-14 font-display text-[1.6rem] leading-snug text-navy">
                {data.enjeuxTitle}
              </h2>
              {data.enjeuxParagraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="measure mt-4 text-[1rem] leading-[1.75] text-ink/85"
                >
                  {p}
                </p>
              ))}
              <div className="mt-6 border-l-2 border-gold bg-paper/60 px-6 py-5">
                <p className="eyebrow text-bronze">Points d&rsquo;examen prioritaires</p>
                <ul className="mt-4 space-y-2.5">
                  {data.enjeuxPoints.map((pt) => (
                    <li key={pt.slice(0, 36)} className="flex items-start gap-3 text-ink/85">
                      <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-gold" />
                      <span className="text-[0.95rem] leading-[1.65]">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h2 className="mt-14 font-display text-[1.6rem] leading-snug text-navy">
                {data.conduiteTitle}
              </h2>
              {data.conduiteParagraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="measure mt-4 text-[1rem] leading-[1.75] text-ink/85"
                >
                  {p}
                </p>
              ))}

              <h2 className="mt-14 font-display text-[1.6rem] leading-snug text-navy">
                Questions fréquentes
              </h2>
              <FaqList items={data.faqs} />
            </div>

            <aside className="col-span-12 mt-14 lg:col-span-4 lg:mt-0">
              <div className="bg-paper/70 p-6 sm:p-8 lg:sticky lg:top-28">
                <p className="eyebrow text-bronze">Domaines liés</p>
                <ul className="mt-5 space-y-4">
                  {data.related.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="link-underline font-display text-[1.05rem] leading-snug text-navy hover:text-bronze"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div aria-hidden="true" className="my-6 h-px w-full bg-rule" />
                <p className="eyebrow text-mute">Premier échange</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/80">
                  {SITE.name}
                  <br />
                  {SITE.address.street}, {SITE.address.postalCode} {SITE.address.locality}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-mute">{APPOINTMENT_LINE}</p>
                <p className="mt-3 text-sm">
                  <a href={SITE.phoneHref} className="link-underline text-navy">
                    {SITE.phone}
                  </a>
                </p>
                <BookingCta
                  layout="stack"
                  secondaryHref={contactHref}
                  className="mt-5"
                />
              </div>
            </aside>
          </div>

          {/* Booking block — bottom */}
          <div className="mt-20 bg-navy px-6 py-12 sm:px-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="eyebrow text-goldsoft">Soumettre un dossier</p>
                <p className="mt-4 max-w-[42ch] font-display text-2xl leading-snug text-ivory">
                  Exposez les faits, les parties et vos éventuelles échéances en quelques lignes.
                </p>
                <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-ivory/80">
                  {SITE.confidentialityNotice}
                </p>
                <p className="mt-4 max-w-[66ch] text-xs leading-relaxed text-ivory/65">
                  Les informations de cette page ont un caractère général et informatif&nbsp;; elles
                  ne constituent ni une consultation juridique ni un conseil personnalisé, et leur
                  lecture ne crée aucune relation avocat-client.
                </p>
              </div>
              <div className="shrink-0 lg:max-w-sm">
                <p className="text-sm leading-relaxed text-ivory/80">{APPOINTMENT_LINE}</p>
                <BookingCta
                  tone="navy"
                  layout="stack"
                  secondaryHref={contactHref}
                  showPhone
                  notes
                  className="mt-4"
                />
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
