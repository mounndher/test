import type { Metadata } from "next";
import Link from "next/link";
import AdminLoginForm from "@/components/AdminLoginForm";

export const metadata: Metadata = {
  title: { absolute: "Connexion — Administration Blexmann Avocats" },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <p className="font-display text-2xl uppercase leading-none tracking-[0.14em] text-navy">Blexmann</p>
        <p className="eyebrow mt-3 text-bronze">Avocats — espace d’administration</p>
        <AdminLoginForm />
        <Link href="/" className="eyebrow mt-8 inline-flex items-center gap-3 border-b border-gold pb-2 text-navy transition-colors hover:text-bronze">← Retour au site</Link>
      </div>
    </main>
  );
}
