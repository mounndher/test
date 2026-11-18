"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CTA, SITE } from "@/content/site";

/**
 * Sticky mobile conversion bar — visible on small screens only.
 * Desktop keeps the header CTA and in-section links.
 */
export default function MobileCtaBar() {
  const pathname = usePathname();
  const ctaHref =
    pathname === "/" ? "#contact" : pathname === "/contact" ? "#contact-form" : "/contact";

  return (
    <nav
      aria-label="Actions rapides"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ivory/15 bg-navy/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <div className="grid grid-cols-2 gap-px">
        <a
          href={SITE.phoneHref}
          aria-label={`Appeler le cabinet au ${SITE.phone}`}
          className="eyebrow flex items-center justify-center px-4 py-4 text-ivory transition-colors active:bg-navytint"
        >
          Appeler
        </a>
        <Link
          href={ctaHref}
          className="eyebrow flex items-center justify-center bg-ivory px-4 py-4 text-navy transition-colors active:bg-goldsoft"
        >
          {CTA.primary}
        </Link>
      </div>
    </nav>
  );
}
