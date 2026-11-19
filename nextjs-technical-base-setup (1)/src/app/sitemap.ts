import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

const LAST_MODIFIED = new Date("2026-04-01T00:00:00.000Z");

/**
 * Indexable pages only. /publications is a secondary noindex page and is deliberately
 * left out of the sitemap.
 */
const PATHS: { path: string; changeFrequency: "monthly" | "yearly"; priority: number }[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/contentieux-commercial", changeFrequency: "monthly", priority: 0.8 },
  { path: "/conflits-entre-associes", changeFrequency: "monthly", priority: 0.8 },
  { path: "/responsabilite-des-dirigeants", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contentieux-post-acquisition", changeFrequency: "monthly", priority: 0.8 },
  { path: "/rupture-brutale-concurrence-deloyale", changeFrequency: "monthly", priority: 0.8 },
  { path: "/procedures-d-urgence", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contentieux-international", changeFrequency: "monthly", priority: 0.8 },
  { path: "/le-cabinet", changeFrequency: "yearly", priority: 0.7 },
  // Listed so the sitemap covers every route; the page itself stays noindex (secondary page).
  { path: "/publications", changeFrequency: "yearly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.3 },
  { path: "/politique-de-confidentialite", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map(({ path, changeFrequency, priority }) => ({
    url: path ? `${SITE.url}${path}` : SITE.url,
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  }));
}
