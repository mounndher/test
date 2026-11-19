"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { admins } from "@/db/schema";
import { verifyPassword } from "@/lib/password";
import { createSession, setSessionCookie } from "@/lib/auth";

/**
 * Limitation des tentatives de connexion (5 par fenêtre de 10 minutes, par adresse
 * électronique). En mémoire, donc par instance serveur — comme pour /api/contact.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  const limited = recent.length >= MAX_ATTEMPTS;
  if (!limited) recent.push(now);
  attempts.set(key, recent);
  if (attempts.size > 2000) {
    for (const [k, times] of attempts) {
      if (now - (times[times.length - 1] ?? 0) >= WINDOW_MS) attempts.delete(k);
    }
  }
  return limited;
}

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (email === "" || password === "") redirect("/admin/login?erreur=identifiants");
  if (rateLimited(`login:${email}`)) redirect("/admin/login?erreur=limite");

  const rows = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  const admin = rows[0];
  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    redirect("/admin/login?erreur=identifiants");
  }

  const token = await createSession(admin.id);
  await db.update(admins).set({ lastLoginAt: new Date() }).where(eq(admins.id, admin.id));
  await setSessionCookie(token);
  redirect("/admin");
}
