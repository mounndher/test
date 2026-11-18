import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import { SITE } from "@/content/site";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import MobileCtaBar from "@/components/MobileCtaBar";
import "./globals.css";

// Headings only ever use weight 400: a static weight is far lighter than the variable font
// (fewer bytes competing with the hero image for the LCP).
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  variable: "--font-inter",
});

const TITLE = "Avocat contentieux des affaires Paris | Blexmann Avocats";
const DESCRIPTION =
  "Blexmann Avocats, avocat en contentieux des affaires à Paris 16e : litiges commerciaux, conflits entre associés, responsabilité des dirigeants et référés.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: DESCRIPTION,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE.url,
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#101D2B",
  width: "device-width",
  initialScale: 1,
};

/**
 * Site-wide Schema.org @graph using strictly verified factual information.
 * TODO: Verify with lawyer: Phone, Toque number, SIREN, Founding year 2013.
 */
const siteGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LegalService", "Attorney"],
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      image: `${SITE.url}${DEFAULT_OG_IMAGE.url}`,
      description: DESCRIPTION,
      foundingDate: String(SITE.founded),
      legalName: SITE.legalName,
      telephone: SITE.phoneE164,
      email: SITE.email,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "demande de rendez-vous",
        telephone: SITE.phoneE164,
        email: SITE.email,
        areaServed: "FR",
        availableLanguage: "fr",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        postalCode: SITE.address.postalCode,
        addressLocality: SITE.address.locality,
        addressCountry: SITE.address.countryCode,
      },
      areaServed: [
        { "@type": "City", name: "Paris" },
        { "@type": "AdministrativeArea", name: "Île-de-France" },
        { "@type": "Country", name: "France" },
      ],
      knowsAbout: [
        "Contentieux des affaires",
        "Contentieux commercial et contractuel",
        "Conflits entre associés et actionnaires",
        "Responsabilité des dirigeants",
        "Contentieux post-acquisition",
        "Rupture brutale des relations commerciales et concurrence déloyale",
        "Référé et procédures d’urgence",
        "Contentieux commercial international",
        "Modes alternatifs de règlement des différends",
      ],
      founder: { "@id": `${SITE.url}/#founder` },
    },
    {
      "@type": "Person",
      "@id": `${SITE.url}/#founder`,
      name: "Pierre Blexmann",
      jobTitle: "Avocat au Barreau de Paris",
      worksFor: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraphJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-ivory text-ink antialiased">
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a
          href="#main"
          className="eyebrow sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-navy focus:px-4 focus:py-3 focus:text-ivory"
        >
          Aller au contenu
        </a>
        {children}
        <MobileCtaBar />
      </body>
    </html>
  );
}
