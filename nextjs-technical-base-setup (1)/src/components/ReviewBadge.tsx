import { Star } from "lucide-react";
import { REVIEWS } from "@/content/site";

/**
 * Minimalist Google Reviews proof card (rating + count + link to the listing).
 * The figures come from REVIEWS in @/content/site — see the TODO there: they must be
 * verified (listing exists, count accurate, bar advertising rules) before publication.
 */
export default function ReviewBadge() {
  return (
    <a
      href={REVIEWS.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Note ${REVIEWS.rating} sur 5, basée sur ${REVIEWS.count} avis Google — voir la fiche du cabinet`}
      className="group mt-10 flex items-center gap-4 border border-rule bg-ivory px-5 py-4 transition-colors duration-300 hover:border-gold"
    >
      <span className="font-display text-3xl leading-none text-navy">{REVIEWS.rating}</span>
      <span>
        <span aria-hidden="true" className="flex gap-0.5 text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} strokeWidth={0} fill="currentColor" />
          ))}
        </span>
        <span className="mt-1.5 block text-xs leading-relaxed text-mute">
          Basé sur {REVIEWS.count} avis Google
        </span>
      </span>
      <span
        aria-hidden="true"
        className="ml-auto shrink-0 text-bronze transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}
