import type { Metadata } from "next";
import Link from "next/link";
import { loginAction } from "./actions";

export const metadata: Metadata = {
  title: { absolute: "Connexion — Administration Blexmann Avocats" },
  robots: { index: false, follow: false },
};

const ERRORS: Record<string, string> = {
  identifiants: "Adresse électronique ou mot de passe incorrect.",
  limite: "Trop de tentatives successives. Merci de patienter quelques minutes.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { erreur } = await searchParams;
  const message = erreur ? (ERRORS[erreur] ?? ERRORS.identifiants) : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <p className="font-display text-2xl uppercase leading-none tracking-[0.14em] text-navy">
          Blexmann
        </p>
        <p className="eyebrow mt-3 text-bronze">Avocats — espace d’administration</p>

        <form action={loginAction} className="mt-10 border border-rule bg-ivory p-7 sm:p-9">
          <h1 className="font-display text-[1.5rem] leading-snug text-navy">Connexion</h1>

          {message && (
            <p
              role="alert"
              className="mt-5 border border-red-800/30 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-900"
            >
              {message}
            </p>
          )}

          <div className="mt-6">
            <label htmlFor="admin-email" className="eyebrow block text-mute">
              Adresse électronique
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              required
              className="mt-1 w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-[1rem] text-ink outline-none transition-colors focus:border-gold"
            />
          </div>

          <div className="mt-6">
            <label htmlFor="admin-password" className="eyebrow block text-mute">
              Mot de passe
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-[1rem] text-ink outline-none transition-colors focus:border-gold"
            />
          </div>

          <button
            type="submit"
            className="eyebrow mt-8 inline-flex w-full items-center justify-center gap-3 bg-navy px-7 py-4 text-ivory transition-colors duration-300 hover:bg-navytint"
          >
            Se connecter
          </button>

          <p className="mt-5 text-xs leading-relaxed text-mute">
            Espace réservé aux personnes habilitées du cabinet. Les tentatives sont limitées et
            les sessions expirent après 12 heures.
          </p>
        </form>

        <Link
          href="/"
          className="eyebrow mt-8 inline-flex items-center gap-3 border-b border-gold pb-2 text-navy transition-colors hover:text-bronze"
        >
          ← Retour au site
        </Link>
      </div>
    </main>
  );
}
