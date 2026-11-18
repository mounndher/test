import Image from "next/image";
import AuditComment from "@/components/AuditComment";
import BookingCta from "@/components/BookingCta";
import { SITE } from "@/content/site";

/**
 * Server component, no entrance animation on the text: the H1 and the image are the
 * LCP candidates and must be painted immediately (only the gold rule draws itself, in CSS).
 * The Cal.com embed is loaded lazily on click by <BookingCta /> — nothing at page load.
 */
export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative bg-ivory">
      <div className="mx-auto grid w-full max-w-[92rem] grid-cols-12">
        {/* Left — the ivory sheet carrying the headline */}
        <div className="col-span-12 order-2 px-5 pb-16 pt-12 sm:px-8 lg:order-1 lg:col-span-7 lg:px-12 lg:pb-24 lg:pt-20 xl:col-span-7">
          <p className="eyebrow text-bronze">
            {SITE.name} — {SITE.address.arrondissement}
          </p>

          <h1 id="hero-title" className="display-xl mt-7 font-display text-navy">
            Avocat en contentieux des affaires à Paris.
            <br />
            Défendre vos intérêts, <span className="italic">maîtriser</span> vos enjeux.
          </h1>

          <div aria-hidden="true" className="hero-rule mt-9 h-px w-full bg-gold" />

          <p className="measure mt-8 text-[1.0625rem] leading-[1.6] text-ink/85 sm:text-lg">
            Un impayé, un blocage entre associés, une garantie de passif contestée : le litige pèse
            sur la trésorerie et la gouvernance bien avant l’audience.{" "}
            {/* TODO: Verify with lawyer: Founding year 2013 */}
            <AuditComment text="TODO: Verify with lawyer: Founding year 2013" />
            Depuis {SITE.founded}, {SITE.name} accompagne dirigeants, associés et entreprises
            confrontés à des litiges commerciaux.
          </p>

          {/* TODO: Verify with lawyer: Phone */}
          <AuditComment text="TODO: Verify with lawyer: Phone" />
          <BookingCta
            className="mt-10"
            secondaryHref="#contact"
            showPhone
            notes
          />
        </div>

        {/* Right — the navy buckram cover, with the vertical spine */}
        <div className="relative col-span-12 order-1 min-h-[38vh] overflow-hidden bg-navy sm:min-h-[44vh] lg:order-2 lg:col-span-5 lg:min-h-[calc(100vh-5.5rem)] xl:col-span-5">
          <Image
            src="/images/hero-facade.jpg"
            alt="Façade haussmannienne parisienne à Paris 16e — Blexmann Avocats, avocat en contentieux des affaires"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-center opacity-[0.62] mix-blend-luminosity"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/20"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-navy/70 via-transparent to-transparent"
          />

          <div className="absolute inset-y-0 right-0 flex w-12 items-center justify-center border-l border-ivory/15 bg-navy/40 backdrop-blur-[2px] sm:w-14">
            <span className="vertical-rl eyebrow text-[0.6rem] tracking-[0.4em] text-goldsoft">
              {SITE.address.arrondissement}
            </span>
          </div>

          <figure className="absolute bottom-6 left-5 max-w-[26ch] sm:bottom-8 sm:left-8 lg:left-10">
            <figcaption className="font-display text-lg italic leading-snug text-ivory/90">
              {SITE.heroQuote}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
