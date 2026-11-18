"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { useCallback, useState, type MouseEvent, type ReactNode } from "react";
import { CTA, SITE } from "@/content/site";

/**
 * Cal.com booking — official embed (@calcom/embed-react), opened as a modal popup.
 *
 * Core Web Vitals: the embed script is NOT loaded on page load. It is imported
 * lazily on the first click only. Every trigger is a real <a href="https://cal.com/…">
 * so the booking still works without JavaScript (new tab, rel noopener) and a
 * runtime window.open() fallback covers embed loading failures.
 */
export const CAL_LINK = "pierre-blexmann";
export const CAL_URL = `https://cal.com/${CAL_LINK}`;

type CalApi = Awaited<ReturnType<(typeof import("@calcom/embed-react"))["getCalApi"]>>;

let calPromise: Promise<CalApi> | null = null;

function loadCal(): Promise<CalApi> {
  if (!calPromise) {
    calPromise = import("@calcom/embed-react")
      .then(async ({ getCalApi }) => {
        const cal = await getCalApi();
        cal("ui", {
          styles: { branding: { brandColor: "#101d2b" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
        return cal;
      })
      .catch((error: unknown) => {
        calPromise = null;
        throw error;
      });
  }
  return calPromise;
}

/** True once the Cal.com modal / iframe is actually in the DOM. */
function modalVisible(): boolean {
  if (typeof document === "undefined") return false;
  if (document.querySelector('[data-cal-modal], cal-modal, .cal-modal, [id*="cal-modal"]'))
    return true;
  return [...document.querySelectorAll("iframe")].some((f) => (f.src || "").includes("cal.com"));
}

/**
 * getCalApi() resolves as soon as the snippet is installed, BEFORE the remote script
 * loads. If that script is blocked / offline the modal never appears and no error is
 * thrown — so we confirm the modal actually showed up, otherwise we fall back.
 */
async function waitForModal(ms: number): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < ms) {
    if (modalVisible()) return true;
    await new Promise((r) => setTimeout(r, 100));
  }
  return modalVisible();
}

/** Rejects if the embed does not initialise in time (e.g. script blocked / offline). */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("cal embed timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

function useBooking() {
  const [busy, setBusy] = useState(false);
  const open = useCallback(
    async (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (busy) return;
      setBusy(true);
      try {
        const cal = await withTimeout(loadCal(), 5000);
        cal("modal", { calLink: CAL_LINK });
        if (!(await waitForModal(4000))) throw new Error("cal modal did not appear");
      } catch {
        // Embed unavailable or too slow: fall back to the public Cal.com page in a new tab.
        calPromise = null;
        window.open(CAL_URL, "_blank", "noopener,noreferrer");
      } finally {
        setBusy(false);
      }
    },
    [busy],
  );
  return { busy, open };
}

/** Inline booking trigger (header, footer, mobile bar…) with the site's own styling. */
export function BookingLink({
  className = "",
  children,
  onNavigate,
}: {
  className?: string;
  children?: ReactNode;
  onNavigate?: () => void;
}) {
  const { busy, open } = useBooking();
  return (
    <a
      href={CAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-booking-link
      aria-busy={busy}
      onClick={(e) => {
        onNavigate?.();
        void open(e);
      }}
      className={className}
    >
      {children ?? CTA.booking}
    </a>
  );
}

type BookingCtaProps = {
  /** "light" for ivory/paper backgrounds, "navy" for dark bands. */
  tone?: "light" | "navy";
  layout?: "row" | "stack";
  /** Where "Exposer ma situation" goes (contact form anchor or /contact?sujet=…). */
  secondaryHref?: string;
  showSecondary?: boolean;
  showPhone?: boolean;
  /** Consent + sensitive-information notes under the buttons. */
  notes?: boolean;
  className?: string;
};

export default function BookingCta({
  tone = "light",
  layout = "row",
  secondaryHref = "#contact",
  showSecondary = true,
  showPhone = false,
  notes = false,
  className = "",
}: BookingCtaProps) {
  const { busy, open } = useBooking();
  const navy = tone === "navy";

  const primaryClass = `eyebrow group inline-flex items-center justify-center gap-3 px-7 py-4 transition-colors duration-300 ${
    navy ? "bg-ivory text-navy hover:bg-goldsoft" : "bg-navy text-ivory hover:bg-navytint"
  } ${layout === "stack" ? "w-full" : ""} ${busy ? "opacity-70" : ""}`;

  const secondaryClass = `eyebrow inline-flex items-center justify-center gap-3 border px-7 py-4 transition-colors duration-300 ${
    navy
      ? "border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/10"
      : "border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-ivory"
  } ${layout === "stack" ? "w-full" : ""}`;

  return (
    <div className={className}>
      <div
        className={
          layout === "stack"
            ? "flex flex-col items-stretch gap-3"
            : "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        }
      >
        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-booking-link
          aria-busy={busy}
          onClick={(e) => void open(e)}
          className={primaryClass}
        >
          {CTA.booking}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            {busy ? "…" : "→"}
          </span>
        </a>

        {showSecondary && (
          <Link href={secondaryHref} className={secondaryClass}>
            {CTA.write}
          </Link>
        )}

        {showPhone && (
          <a
            href={SITE.phoneHref}
            className={`eyebrow inline-flex items-center justify-center gap-2 px-1 py-4 ${
              navy ? "text-ivory/85 hover:text-ivory" : "text-navy hover:text-bronze"
            }`}
          >
            <Phone size={14} strokeWidth={1.75} aria-hidden="true" />
            <span className="link-underline">Appeler · {SITE.phone}</span>
          </a>
        )}
      </div>

      {notes && (
        <div
          className={`mt-4 space-y-1 text-xs leading-relaxed ${
            navy ? "text-ivory/65" : "text-mute"
          }`}
        >
          <p>
            En réservant, vous acceptez la{" "}
            <Link
              href="/politique-de-confidentialite"
              className={`link-underline ${navy ? "text-ivory" : "text-navy"}`}
            >
              politique de confidentialité
            </Link>.
          </p>
          <p>Merci de ne communiquer aucune information sensible lors de la réservation.</p>
        </div>
      )}
    </div>
  );
}
