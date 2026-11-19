"use client";

import { BookingLink } from "@/components/BookingCta";
import { SITE } from "@/content/site";

/**
 * Sticky mobile conversion bar — visible on small screens only.
 * "Appeler" (tel:) + "Prendre rendez-vous" (Cal.com modal, plain-link fallback).
 */
export default function MobileCtaBar() {
  return (
    <nav
      aria-label="Actions rapides"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ivory/15 bg-navy/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <div className="grid grid-cols-2 gap-px">
        <a
          href={SITE.phoneHref}
          className="eyebrow flex items-center justify-center px-4 py-4 text-ivory transition-colors active:bg-navytint"
        >
          Appeler
        </a>
        <BookingLink className="eyebrow flex items-center justify-center bg-ivory px-4 py-4 text-navy transition-colors active:bg-goldsoft" />
      </div>
    </nav>
  );
}
