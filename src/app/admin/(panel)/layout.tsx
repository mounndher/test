import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth";
import { logoutAction } from "./actions";

/**
 * Garde serveur de l'espace d'administration : toute requête sans session valide
 * (empreinte connue, non expirée, non révoquée) est renvoyée vers la connexion.
 * Le proxy ajoute un premier filtre (présence du cookie) sans accès base.
 */
export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  const session = await readSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-rule bg-ivory">
        <div className="mx-auto flex w-full max-w-[80rem] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <p className="font-display text-lg uppercase leading-none tracking-[0.14em] text-navy">
              Blexmann
            </p>
            <p className="eyebrow mt-2 text-bronze">Administration</p>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden text-sm text-mute sm:inline">{session.email}</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="eyebrow border border-ink/25 px-4 py-2.5 text-navy transition-colors hover:border-ink hover:bg-navy hover:text-ivory"
              >
                Quitter
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[80rem] px-5 py-10 sm:px-8 sm:py-14">{children}</main>
    </div>
  );
}
