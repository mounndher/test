"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { BookingLink } from "@/components/BookingCta";
import { NAV, SITE } from "@/content/site";

export type HeaderNavItem = { label: string; href: string };

function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const main = tone === "dark" ? "text-navy" : "text-ivory";
  const sub = tone === "dark" ? "text-bronze" : "text-goldsoft";
  return (
    <Link
      href="/"
      className="flex shrink-0 items-baseline gap-2.5 sm:gap-3"
      aria-label={`${SITE.name} — accueil`}
    >
      <span
        className={`font-display text-[1.35rem] leading-none uppercase tracking-[0.14em] sm:text-[1.55rem] ${main}`}
      >
        {SITE.wordmark}
      </span>{" "}
      <span
        aria-hidden="true"
        className={`h-4 w-px translate-y-0.5 ${tone === "dark" ? "bg-gold" : "bg-goldsoft"}`}
      />
      <span className={`eyebrow text-[0.6rem] sm:text-[0.65rem] ${sub}`}>
        {SITE.wordmarkSuffix}
      </span>
    </Link>
  );
}

export default function Header({ nav = NAV as unknown as HeaderNavItem[] }: { nav?: HeaderNavItem[] } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  const resolveNavHref = (href: string) =>
    pathname === "/" && href.startsWith("/#") ? href.slice(1) : href;

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <header
      className={`sticky top-0 z-50 bg-ivory transition-shadow duration-300 ${
        scrolled
          ? "border-b border-rule shadow-[0_10px_30px_-24px_rgba(16,29,43,0.55)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-12">
        <Wordmark />

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-6 xl:flex xl:gap-8"
        >
          {nav.map((item) => {
            const isActive = !item.href.includes("#") && pathname === item.href;
            return (
              <Link
                key={item.label}
                href={resolveNavHref(item.href)}
                scroll={true}
                aria-current={isActive ? "page" : undefined}
                className={`eyebrow link-underline whitespace-nowrap transition-colors hover:text-navy focus-visible:text-navy ${
                  isActive ? "text-navy" : "text-ink/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <BookingLink className="eyebrow hidden whitespace-nowrap bg-navy px-5 py-3 text-ivory transition-colors duration-300 hover:bg-navytint sm:inline-block" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-11 w-11 items-center justify-center border border-ink/20 text-navy transition-colors hover:border-ink xl:hidden"
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            key="menu"
            initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-rule bg-ivory xl:hidden"
          >
            <nav aria-label="Navigation mobile" className="px-5 pb-10 pt-2 sm:px-8">
              <ul>
                {nav.map((item, i) => {
                  const isActive = !item.href.includes("#") && pathname === item.href;
                  return (
                    <li key={item.label} className="border-b border-rule">
                      <Link
                        href={resolveNavHref(item.href)}
                        scroll={true}
                        onClick={close}
                        aria-current={isActive ? "page" : undefined}
                        className="flex items-baseline justify-between gap-4 py-4 font-display text-2xl text-navy transition-colors hover:text-bronze"
                      >
                        {item.label}
                        <span className="eyebrow text-bronze">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <BookingLink
                onNavigate={close}
                className="eyebrow mt-6 flex items-center justify-center gap-3 bg-navy px-6 py-4 text-ivory"
              />
              <p className="mt-5 text-sm text-mute">
                <a href={SITE.phoneHref} className="link-underline">
                  {SITE.phone}
                </a>
                <span aria-hidden="true"> · </span>
                <a href={`mailto:${SITE.email}`} className="link-underline break-all">
                  {SITE.email}
                </a>
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}