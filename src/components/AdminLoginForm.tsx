"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const ERROR_MESSAGES: Record<string, string> = {
  identifiants: "Adresse électronique ou mot de passe incorrect.",
  limite: "Trop de tentatives successives. Merci de patienter quelques minutes.",
  unavailable: "La connexion est momentanément indisponible. Merci de réessayer dans un instant.",
};

export default function AdminLoginForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      if (response.ok) {
        router.push("/admin");
        router.refresh();
        return;
      }
      const result = (await response.json().catch(() => ({}))) as { code?: string };
      setError(ERROR_MESSAGES[result.code ?? "unavailable"] ?? ERROR_MESSAGES.unavailable);
    } catch {
      setError(ERROR_MESSAGES.unavailable);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} aria-busy={busy} className="mt-10 border border-rule bg-ivory p-6 sm:p-9">
      <h1 className="font-display text-[1.5rem] leading-snug text-navy">Connexion</h1>
      {error && (
        <p role="alert" className="mt-5 border border-red-800/30 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-900">
          {error}
        </p>
      )}
      <div className="mt-6">
        <label htmlFor="admin-email" className="eyebrow block text-mute">Adresse électronique</label>
        <input id="admin-email" name="email" type="email" autoComplete="username" required className="mt-1 w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-[1rem] text-ink outline-none transition-colors focus:border-gold" />
      </div>
      <div className="mt-6">
        <label htmlFor="admin-password" className="eyebrow block text-mute">Mot de passe</label>
        <input id="admin-password" name="password" type="password" autoComplete="current-password" required className="mt-1 w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-[1rem] text-ink outline-none transition-colors focus:border-gold" />
      </div>
      <button type="submit" disabled={busy} className="eyebrow mt-8 inline-flex w-full items-center justify-center gap-3 bg-navy px-7 py-4 text-ivory transition-colors duration-300 hover:bg-navytint disabled:cursor-not-allowed disabled:opacity-60">
        {busy ? "Connexion en cours…" : "Se connecter"}
      </button>
      <p className="mt-5 text-xs leading-relaxed text-mute">
        Espace réservé aux personnes habilitées du cabinet. Les tentatives sont limitées et les sessions expirent après 12 heures.
      </p>
    </form>
  );
}
