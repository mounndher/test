import AuditComment from "@/components/AuditComment";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Expertises from "@/components/Expertises";
import QuandFaireAppel from "@/components/QuandFaireAppel";
import Approche from "@/components/Approche";
import Cabinet from "@/components/Cabinet";
import HomeFaq from "@/components/HomeFaq";
import JsonLd from "@/components/JsonLd";
import PremierContact from "@/components/PremierContact";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { HOME_FAQS } from "@/content/site";

const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeFaqJsonLd} />
      <AuditComment text="TODO: Verify with lawyer: Phone, Toque number, SIREN, Founding year 2013, the contact mailbox on blexmann-avocats.fr, and replace 2020 labor law articles with recent commercial litigation articles" />
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Expertises />
        <QuandFaireAppel />
        <Approche />
        <Cabinet />
        <HomeFaq />
        <PremierContact />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
