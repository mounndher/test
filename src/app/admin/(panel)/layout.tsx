import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import { readSession } from "@/lib/auth";
import { logoutAction } from "./actions";

/**
 * Garde serveur de l'espace d'administration + coquille à deux colonnes.
 * Toute requête sans session valide (empreinte en base, non expirée, non révoquée)
 * est renvoyée vers la connexion.
 */
export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  const session = await readSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F5F0] lg:flex-row">
      <Sidebar email={session.email} logout={logoutAction} />
      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto w-full max-w-[76rem]">{children}</div>
      </main>
    </div>
  );
}
