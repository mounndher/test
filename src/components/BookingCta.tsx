"use client";

import Link from "next/link";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { BOOKING, CTA, SITE } from "@/content/site";

const DIALOG_ID = "booking-dialog";
const NAMESPACE = "blexmann-rendez-vous";
const ACTION_CLASS =
  "eyebrow inline-flex min-h-12 items-center justify-center px-6 py-3 text-center transition-colors duration-300";
const DEFAULT_CLASS = `${ACTION_CLASS} bg-navy text-ivory hover:bg-navytint`;

const BookingContext = createContext<((trigger: HTMLAnchorElement) => boolean) | null>(null);

export default function BookingCta({ className = DEFAULT_CLASS }: { className?: string }) {
  const openBooking = useContext(BookingContext);

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    // Let the real link handle modified clicks and browsers without dialog/JS support.
    if (
      event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    ) return;
    if (openBooking?.(event.currentTarget)) event.preventDefault();
  }

  return (
    <a
      href={BOOKING.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-haspopup="dialog"
      aria-controls={DIALOG_ID}
      onClick={onClick}
      className={className}
    >
      {CTA.primary}
    </a>
  );
}

function BookingNotes({
  className = "",
  tone = "light",
  onPolicyClick,
}: {
  className?: string;
  tone?: "light" | "dark";
  onPolicyClick?: () => void;
}) {
  return (
    <div className={`space-y-1 text-xs leading-relaxed ${tone === "dark" ? "text-ivory/75" : "text-mute"} ${className}`}>
      <p>Merci de ne communiquer aucune information sensible lors de la réservation.</p>
      <p>
        En réservant, vous acceptez la{" "}
        <Link
          href="/politique-de-confidentialite"
          onClick={onPolicyClick}
          className="underline underline-offset-2"
        >
          politique de confidentialité
        </Link>
        .
      </p>
    </div>
  );
}

export function BookingActions({
  contactHref,
  tone = "light",
  phoneLabel,
  className = "",
}: {
  contactHref: string;
  tone?: "light" | "dark";
  phoneLabel?: string;
  className?: string;
}) {
  const dark = tone === "dark";
  const secondaryClass = `${ACTION_CLASS} border ${dark
    ? "border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/10"
    : "border-navy/35 text-navy hover:border-navy hover:bg-paper"}`;

  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <BookingCta className={dark ? `${ACTION_CLASS} bg-ivory text-navy hover:bg-goldsoft` : DEFAULT_CLASS} />
        <Link href={contactHref} className={secondaryClass}>{CTA.secondary}</Link>
        {phoneLabel && <a href={SITE.phoneHref} className={secondaryClass}>{phoneLabel}</a>}
      </div>
      <BookingNotes className="mt-3" tone={tone} />
    </div>
  );
}

/** One native dialog for all triggers, with the official Cal embed loaded on demand. */
export function BookingProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");

  useEffect(() => {
    const container = calendarRef.current;
    if (!open || !container) return;

    let active = true;
    let unavailable = false;
    let unsubscribe: (() => void) | undefined;
    const timeout = window.setTimeout(showFallback, 12_000);

    function showFallback() {
      if (!active) return;
      unavailable = true;
      window.clearTimeout(timeout);
      setStatus("unavailable");
    }

    async function loadCalendar(element: HTMLDivElement) {
      try {
        const { getCalApi } = await import("@calcom/embed-react");
        if (!active || unavailable) return;
        const cal = await getCalApi({ namespace: NAMESPACE });
        if (!active || unavailable) return;

        const onReady = () => {
          if (!active || unavailable) return;
          window.clearTimeout(timeout);
          element.querySelector("iframe")?.setAttribute("title", "Calendrier de réservation du cabinet");
          setStatus("ready");
        };
        cal("on", { action: "linkReady", callback: onReady });
        cal("on", { action: "linkFailed", callback: showFallback });
        unsubscribe = () => {
          cal("off", { action: "linkReady", callback: onReady });
          cal("off", { action: "linkFailed", callback: showFallback });
        };
        cal("ui", { theme: "light", styles: { branding: { brandColor: "#101d2b" } } });
        cal("inline", { elementOrSelector: element, calLink: BOOKING.calLink, config: { theme: "light" } });
      } catch {
        showFallback();
      }
    }

    void loadCalendar(container);
    return () => {
      active = false;
      window.clearTimeout(timeout);
      unsubscribe?.();
    };
  }, [open]);

  function openBooking(trigger: HTMLAnchorElement) {
    const dialog = dialogRef.current;
    if (!dialog || typeof dialog.showModal !== "function") return false;
    if (dialog.open) return true;
    try {
      dialog.showModal();
    } catch {
      return false;
    }
    triggerRef.current = trigger;
    setStatus("loading");
    setOpen(true);
    return true;
  }

  function closeBooking() {
    dialogRef.current?.close();
  }

  return (
    <BookingContext.Provider value={openBooking}>
      {children}
      <dialog
        id={DIALOG_ID}
        ref={dialogRef}
        aria-labelledby="booking-title"
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus({ preventScroll: true });
          triggerRef.current = null;
        }}
        className="fixed inset-0 m-auto max-h-[92dvh] w-11/12 max-w-4xl overflow-y-auto overscroll-contain border border-rule bg-ivory text-ink shadow-2xl backdrop:bg-navy/70"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-rule bg-ivory px-4 py-3 sm:px-6">
          <h2 id="booking-title" className="font-display text-2xl text-navy">{CTA.primary}</h2>
          <button
            type="button"
            aria-label="Fermer la fenêtre de réservation"
            onClick={closeBooking}
            className="grid size-11 shrink-0 place-items-center border border-rule text-xl leading-none text-navy hover:bg-paper"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="px-4 pb-5 sm:px-6">
          <BookingNotes className="mt-4" onPolicyClick={closeBooking} />
          <p className="mt-3 text-sm text-navy">
            <a href={BOOKING.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              Ouvrir le calendrier sur Cal.com <span aria-hidden="true">↗</span>
            </a>
          </p>
          {open && status !== "ready" && (
            <p role="status" className="mt-4 border-t border-rule pt-4 text-sm text-mute">
              {status === "loading"
                ? "Chargement du calendrier…"
                : "Le calendrier ne s’affiche pas ici. Vous pouvez l’ouvrir directement sur Cal.com."}
            </p>
          )}
          {open && status !== "unavailable" && <div ref={calendarRef} className="mt-4 min-w-0" />}
        </div>
      </dialog>
    </BookingContext.Provider>
  );
}
