import type { Metadata } from "next";
import AuditComment from "@/components/AuditComment";
import Header from "@/components/HeaderServer";
import Footer from "@/components/FooterServer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import { CONTACT, SITE } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";
import { CONTACT_FAQS as FAQS } from "@/content/page-faqs";

const TITLE = "Contact — Blexmann Avocats | Paris 16e";
const DESCRIPTION =
  "Contacter Blexmann Avocats à Paris 16e (53 avenue Victor Hugo) : rendez-vous au cabinet, en visioconférence ou par téléphone en contentieux des affaires.";
const PATH = "/contact";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "website",
});


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
        <div className="mx-auto w-full max-w-[92rem] px-5 pb-24 pt-10 sm:px-8 lg:px-12 lg:pb-32 lg:pt-14">
          <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Contact" }]} />
          <p className="eyebrow mt-10 text-bronze">{SITE.name}</p>
          <h1 className="display-lg mt-6 max-w-[22ch] font-display text-navy">
            Contacter le cabinet
          </h1>
          <div aria-hidden="true" className="mt-8 h-px w-full max-w-[28rem] bg-gold" />
          <p className="measure mt-8 text-[1.0625rem] leading-[1.75] text-ink/85">{CONTACT.body}</p>

          <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12 lg:col-span-4">
              <dl className="rule-double space-y-6 pt-7">
                <div>
                  <dt className="eyebrow text-mute">Adresse</dt>
                  <dd className="mt-2 font-display text-lg leading-snug text-navy">
                    {SITE.name}
                    <br />
                    {SITE.address.street}
                    <br />
                    {SITE.address.postalCode} {SITE.address.locality}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-mute">Téléphone</dt>
                  <dd className="mt-2">
                    {/* TODO: Verify with lawyer: Phone */}
                    <AuditComment text="TODO: Verify with lawyer: Phone" />
                    <a
                      href={SITE.phoneHref}
                      className="link-underline font-display text-lg text-navy hover:text-bronze"
                    >
                      {SITE.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-mute">Adresse électronique</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="link-underline break-all font-display text-lg text-navy hover:text-bronze"
                    >
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-mute">Modalités de rendez-vous</dt>
                  <dd className="mt-2">
                    <ul className="space-y-1.5 font-display text-lg leading-snug text-navy">
                      {SITE.appointmentOptions.map((option) => (
                        <li key={option} className="flex items-center gap-3">
                          <span aria-hidden="true" className="h-px w-4 shrink-0 bg-gold" />
                          <span>{option}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <ContactForm formId="c" />
            </div>
          </div>

          <h2 className="mt-20 font-display text-[1.6rem] leading-snug text-navy">
            Questions pratiques avant votre envoi
          </h2>
          <FaqList items={FAQS} maxWidth />
        </div>
      </main>
      <Footer />
    </>
  );
}
