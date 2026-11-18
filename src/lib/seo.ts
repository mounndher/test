import type { Metadata } from "next";
import { SITE } from "@/content/site";

const DEFAULT_OG_IMAGE = {
  url: "/images/hero-facade.jpg",
  width: 1536,
  height: 1024,
  alt: "Façade haussmannienne à Paris 16e — Blexmann Avocats, contentieux des affaires",
} as const;

type PageMetadataInput = {
  /** Exact <title> string (rendered without extra template suffix). Keep under 60 characters. */
  title: string;
  /** Concise meta description. Keep under 155 characters. */
  description: string;
  /** Route path starting with "/" (e.g. "/contentieux-commercial"). */
  path: string;
  type?: "website" | "article";
  /** Secondary pages kept out of search results (still crawlable links). */
  noindex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
  noindex = false,
}: PageMetadataInput): Metadata {
  const canonicalUrl = path === "/" ? SITE.url : `${SITE.url}${path}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE.name,
      locale: "fr_FR",
      type,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    robots: noindex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
  };
}

export { DEFAULT_OG_IMAGE };
