"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  BookOpen,
  FileText,
  HelpCircle,
  History,
  Image as ImageIcon,
  LayoutDashboard,
  Menu,
  Newspaper,
  Settings,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/settings", label: "Réglages du site", icon: Settings },
  { href: "/admin/homepage", label: "Page d’accueil", icon: Sparkles },
  { href: "/admin/expertises", label: "Pages d’expertise", icon: BookOpen },
  { href: "/admin/faqs", label: "FAQ", icon: HelpCircle },
  { href: "/admin/publications", label: "Publications", icon: Newspaper },
  { href: "/admin/facts", label: "Repères & Chiffres", icon: BarChart3 },
  { href: "/admin/navigation", label: "Navigation", icon: SlidersHorizontal },
  { href: "/admin/seo", label: "SEO par page", icon: FileText },
  { href: "/admin/media", label: "Médiathèque", icon: ImageIcon },
  { href: "/admin/revisions", label: "Historique", icon: History },
] as const;

export default function Sidebar({
  email,
  logout,
}: {
  email: string;
  logout: () => Promise<void>;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  const nav = (
    <nav className="flex flex-1 flex-col gap-0.5 px-3" aria-label="Navigation de l’administration">
      {LINKS.map((link) => {
        const Icon = link.icon;
        const active = isActive(link.href, "exact" in link ? link.exact : false);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 text-[0.8rem] transition-colors ${
              active
                ? "bg-[#111827] text-[#F7F5F0]"
                : "text-[#3F3F3A] hover:bg-[#EFEBE2] hover:text-[#111827]"
            }`}
          >
            <Icon size={15} strokeWidth={1.6} aria-hidden="true" />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  const footer = (
    <div className="border-t border-[#2B3542] px-4 py-4">
      <p className="truncate text-[0.7rem] text-[#B9BEC7]" title={email}>
        {email}
      </p>
      <form action={logout} className="mt-3">
        <button
          type="submit"
          className="w-full border border-[#3A4655] px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#E7E3DA] transition-colors hover:border-[#8C6D46] hover:text-white"
        >
          Quitter
        </button>
      </form>
    </div>
  );

  return (
    <>
      {/* Barre mobile */}
      <div className="flex items-center justify-between border-b border-[#E3DED4] bg-white px-4 py-3 lg:hidden">
        <p className="font-display text-base uppercase tracking-[0.14em] text-[#111827]">Blexmann Avocats</p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="admin-sidebar"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="border border-[#D8D2C6] p-2 text-[#111827]"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Sidebar desktop + panneau mobile */}
      <aside
        id="admin-sidebar"
        className={`${open ? "flex" : "hidden"} w-full flex-col bg-[#111827] py-6 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:shrink-0`}
      >
        <div className="px-5 pb-6">
          <p className="font-display text-lg uppercase leading-tight tracking-[0.14em] text-[#F7F5F0]">
            Blexmann Avocats
          </p>
          <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-[#C6A87C]">Admin</p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 border-b border-[#8C6D46] pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#E7E3DA] transition-colors hover:text-white"
          >
            Voir le site ↗
          </a>
        </div>
        {nav}
        {footer}
      </aside>
    </>
  );
}
