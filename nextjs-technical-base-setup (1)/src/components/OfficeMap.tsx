import { SITE } from "@/content/site";

/**
 * Office location — Google Maps embed (no API key required).
 * Grayscale filter keeps the map in the site's sober neutral palette.
 * Lazy-loaded: the iframe only fetches Google resources near the viewport.
 *
 * Privacy note: this iframe loads third-party Google resources (possible cookies).
 * The privacy policy (§8 cookies) must mention it — see TODO in the policy page.
 */
const MAP_QUERY = encodeURIComponent(
  `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.locality}`,
);
const EMBED_SRC = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const OPEN_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

export default function OfficeMap() {
  return (
    <figure className="mt-16">
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-rule bg-paper sm:aspect-[21/9]">
        <iframe
          title={`Carte — ${SITE.name}, ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.locality}`}
          src={EMBED_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0 grayscale contrast-[0.95]"
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span className="eyebrow text-mute">
          {SITE.address.street}, {SITE.address.postalCode} {SITE.address.locality}
        </span>
        <a
          href={OPEN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow link-underline text-navy transition-colors hover:text-bronze"
        >
          Ouvrir dans Google Maps ↗
        </a>
      </figcaption>
    </figure>
  );
}
