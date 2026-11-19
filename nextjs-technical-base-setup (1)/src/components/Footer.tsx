"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuditComment from "@/components/AuditComment";
import { BookingLink } from "@/components/BookingCta";
import { CTA, FOOTER, SITE } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const contactHref =
    pathname === "/" ? "#contact" : pathname === "/contact" ? "#contact-form" : "/contact";
  const resolveHref = (href: string) =>
    pathname === "/" && href.startsWith("/#") ? href.slice(1) : href;

  return (
    <footer className="border-t border-ivory/10 bg-navy pb-20 text-ivory md:pb-0">
      <div className="mx-auto w-full max-w-[92rem] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <p className="font-display text-2xl uppercase leading-none tracking-[0.14em] text-ivory">
              {SITE.wordmark}
            </p>
            <p className="eyebrow mt-3 text-goldsoft">
              {SITE.wordmarkSuffix} — {SITE.tagline}
            </p>
            <address className="mt-6 max-w-[34ch] text-sm not-italic leading-relaxed text-ivory/75">
              {SITE.name}
              <br />
              {SITE.address.street}
              <br />
              {SITE.address.postalCode} {SITE.address.locality}
            </address>
            <p className="mt-5 text-sm text-ivory/75">
              {/* TODO: Verify with lawyer: Phone */}
              <AuditComment text="TODO: Verify with lawyer: Phone" />
              <a href={SITE.phoneHref} className="link-underline inline-block py-1">
                {SITE.phone}
              </a>
              <br />
              <a href={`mailto:${SITE.email}`} className="link-underline inline-block break-all py-1">
                {SITE.email}
              </a>
            </p>
          </div>

          {FOOTER.columns.map((col) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className="col-span-6 sm:col-span-4 lg:col-span-2 lg:col-start-auto"
            >
              <p className="eyebrow text-goldsoft">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={resolveHref(item.href)}
                      className="link-underline text-sm text-ivory/80 transition-colors hover:text-ivory"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-12 sm:col-span-8 lg:col-span-2">
            <p className="eyebrow text-goldsoft">Rendez-vous</p>
            <ul className="mt-5 space-y-1.5 text-sm leading-relaxed text-ivory/75">
              {SITE.appointmentOptions.map((opt) => (
                <li key={opt}>{opt}</li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col items-start gap-2 text-sm">
              <BookingLink className="link-underline text-ivory/80 transition-colors hover:text-ivory" />
              <Link
                href={contactHref}
                className="link-underline text-ivory/80 transition-colors hover:text-ivory"
              >
                {CTA.write}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-ivory/15 pt-7">
          <p className="max-w-[80ch] text-xs leading-relaxed text-ivory/65">
            {SITE.confidentialityNotice}
          </p>
          <p className="mt-3 max-w-[80ch] text-xs leading-relaxed text-ivory/65">
            {FOOTER.disclaimer}
          </p>
          <div className="mt-6 flex flex-col gap-3 text-xs text-ivory/65 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {/* TODO: Verify with lawyer: Phone, Toque number, SIREN, Founding year 2013, and replace 2020 labor law articles with recent commercial litigation articles */}
              <AuditComment text="TODO: Verify with lawyer: Phone, Toque number, SIREN, Founding year 2013, and replace 2020 labor law articles with recent commercial litigation articles" />
              © {year} {SITE.name} — {SITE.barreau} · Toque {SITE.toque} · {SITE.siren}
            </p>
            <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/mentions-legales" className="link-underline hover:text-ivory">
                Mentions légales
              </Link>
              <Link href="/politique-de-confidentialite" className="link-underline hover:text-ivory">
                Politique de confidentialité
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
