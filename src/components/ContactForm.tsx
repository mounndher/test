"use client";

import Link from "next/link";
import { AlertCircle, CheckCircle2, ChevronDown, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CONTACT, CTA, SITE } from "@/content/site";
import { validateContact, type ContactErrors, type ContactFields } from "@/lib/contact";

const EMPTY: ContactFields = {
  nom: "",
  email: "",
  telephone: "",
  societe: "",
  sujet: "",
  message: "",
  appointmentMode: SITE.appointmentOptions[0],
  consent: false,
};

const SUCCESS_MESSAGE =
  "Merci, votre demande a bien été transmise au cabinet. Une réponse vous sera adressée sous 24 h ouvrées.";
const FALLBACK = `Vous pouvez écrire directement à ${SITE.email} ou appeler le ${SITE.phone}.`;
const GENERIC_ERROR = `Votre demande n’a pas pu être envoyée. Merci de réessayer dans un instant. ${FALLBACK}`;

const ALL_TOUCHED = {
  nom: true,
  email: true,
  telephone: true,
  societe: true,
  sujet: true,
  appointmentMode: true,
  message: true,
  consent: true,
};

const fieldClass = (invalid: boolean) =>
  `w-full border-0 border-b bg-transparent px-0 py-3 text-[1rem] text-ink outline-none transition-colors placeholder:text-mute/85 focus:border-gold ${
    invalid ? "border-red-700/70" : "border-ink/25 hover:border-ink/50"
  }`;

export default function ContactForm({ formId = "f" }: { formId?: string }) {
  const [values, setValues] = useState<ContactFields>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState(GENERIC_ERROR);
  const [trap, setTrap] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  // Set while focus is moved programmatically to the outcome message, so the field that
  // loses focus (e.g. after pressing Enter in it) is not validated against the emptied form.
  const skipBlur = useRef(false);

  useEffect(() => {
    const applySubject = (subject: unknown) => {
      if (
        typeof subject === "string" &&
        CONTACT.subjects.includes(subject as (typeof CONTACT.subjects)[number])
      ) {
        setValues((prev) => ({ ...prev, sujet: subject }));
        setErrors((prev) => ({ ...prev, sujet: undefined }));
      }
    };
    try {
      const param = new URLSearchParams(window.location.search).get("sujet");
      if (param) applySubject(param);
    } catch {
      /* ignore malformed query strings */
    }
    const onSelectSubject = (event: Event) => {
      applySubject((event as CustomEvent<string>).detail);
    };
    window.addEventListener("blexmann:select-subject", onSelectSubject);
    return () => window.removeEventListener("blexmann:select-subject", onSelectSubject);
  }, []);

  // Move focus to the outcome message so keyboard / screen-reader users notice it.
  useEffect(() => {
    if (status === "success" || status === "error") {
      statusRef.current?.focus();
      skipBlur.current = false;
    }
  }, [status]);

  const set = <K extends keyof ContactFields>(key: K, value: ContactFields[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) {
      const err = validateContact(next);
      setErrors((prev) => ({ ...prev, [key]: err[key] }));
    }
  };

  const blur = (key: keyof ContactFields) => {
    if (skipBlur.current) return;
    setTouched((t) => ({ ...t, [key]: true }));
    const err = validateContact(values);
    setErrors((prev) => ({ ...prev, [key]: err[key] }));
  };

  const focusFirst = (found: ContactErrors) => {
    const first = Object.keys(found)[0];
    if (first) document.getElementById(`${formId}-${first}`)?.focus();
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const found = validateContact(values);
    setErrors(found);
    setTouched(ALL_TOUCHED);

    if (Object.keys(found).length > 0) {
      setStatus("idle");
      focusFirst(found);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, siteweb: trap }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        errors?: ContactErrors;
      } | null;

      if (response.ok && data?.ok) {
        setValues(EMPTY);
        setErrors({});
        setTouched({});
        setTrap("");
        skipBlur.current = true;
        setStatus("success");
        return;
      }

      if (response.status === 400 && data?.errors) {
        setErrors(data.errors);
        setTouched(ALL_TOUCHED);
        setStatus("idle");
        focusFirst(data.errors);
        return;
      }

      setErrorMessage(data?.error || GENERIC_ERROR);
      setStatus("error");
    } catch {
      setErrorMessage(GENERIC_ERROR);
      setStatus("error");
    }
  }

  const err = (key: keyof ContactFields) => (touched[key] ? errors[key] : undefined);
  const describedBy = (key: keyof ContactFields, fallback?: string) =>
    err(key) ? `${formId}-e-${key}` : fallback;
  const submitting = status === "submitting";

  return (
    <form
      id="contact-form"
      method="post"
      onSubmit={onSubmit}
      noValidate
      aria-busy={submitting}
      aria-describedby={`${formId}-form-note`}
      className="scroll-mt-24 bg-paper/60 p-6 sm:p-9"
    >
      <p className="eyebrow text-bronze">{CTA.secondary}</p>
      <p className="measure mt-3 text-sm leading-relaxed text-mute">{CONTACT.formHelper}</p>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div hidden aria-hidden="true">
        <label htmlFor={`${formId}-siteweb`}>Ne pas remplir ce champ</label>
        <input
          id={`${formId}-siteweb`}
          name="siteweb"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-nom`} className="eyebrow block text-mute">
            Nom et prénom *
          </label>
          <input
            id={`${formId}-nom`}
            name="nom"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            maxLength={100}
            aria-invalid={!!err("nom")}
            aria-describedby={describedBy("nom")}
            value={values.nom}
            onChange={(e) => set("nom", e.target.value)}
            onBlur={() => blur("nom")}
            placeholder="Jean Dupont"
            className={fieldClass(!!err("nom"))}
          />
          {err("nom") && (
            <p id={`${formId}-e-nom`} className="mt-2 text-xs text-red-800">
              {err("nom")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className="eyebrow block text-mute">
            Adresse électronique *
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            maxLength={254}
            aria-invalid={!!err("email")}
            aria-describedby={describedBy("email")}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
            placeholder="vous@entreprise.fr"
            className={fieldClass(!!err("email"))}
          />
          {err("email") && (
            <p id={`${formId}-e-email`} className="mt-2 text-xs text-red-800">
              {err("email")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-telephone`} className="eyebrow block text-mute">
            Téléphone (facultatif, pour être rappelé)
          </label>
          <input
            id={`${formId}-telephone`}
            name="telephone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            aria-invalid={!!err("telephone")}
            aria-describedby={describedBy("telephone")}
            value={values.telephone}
            onChange={(e) => set("telephone", e.target.value)}
            onBlur={() => blur("telephone")}
            placeholder="06 00 00 00 00"
            className={fieldClass(!!err("telephone"))}
          />
          {err("telephone") && (
            <p id={`${formId}-e-telephone`} className="mt-2 text-xs text-red-800">
              {err("telephone")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-societe`} className="eyebrow block text-mute">
            Société (facultatif)
          </label>
          <input
            id={`${formId}-societe`}
            name="societe"
            type="text"
            autoComplete="organization"
            maxLength={150}
            aria-invalid={!!err("societe")}
            aria-describedby={describedBy("societe")}
            value={values.societe}
            onChange={(e) => set("societe", e.target.value)}
            onBlur={() => blur("societe")}
            placeholder="Dénomination sociale ou fonction"
            className={fieldClass(!!err("societe"))}
          />
          {err("societe") && (
            <p id={`${formId}-e-societe`} className="mt-2 text-xs text-red-800">
              {err("societe")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-sujet`} className="eyebrow block text-mute">
            Nature du dossier *
          </label>
          <div className="relative">
            <select
              id={`${formId}-sujet`}
              name="sujet"
              required
              aria-required="true"
              aria-invalid={!!err("sujet")}
              aria-describedby={describedBy("sujet")}
              value={values.sujet}
              onChange={(e) => set("sujet", e.target.value)}
              onBlur={() => blur("sujet")}
              className={`${fieldClass(!!err("sujet"))} appearance-none rounded-none pr-8`}
            >
              <option value="">Sélectionnez la nature du dossier…</option>
              {CONTACT.subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-mute"
            />
          </div>
          {err("sujet") && (
            <p id={`${formId}-e-sujet`} className="mt-2 text-xs text-red-800">
              {err("sujet")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-appointmentMode`} className="eyebrow block text-mute">
            Modalité de rendez-vous souhaitée
          </label>
          <div className="relative">
            <select
              id={`${formId}-appointmentMode`}
              name="appointmentMode"
              value={values.appointmentMode}
              onChange={(e) => set("appointmentMode", e.target.value)}
              className={`${fieldClass(false)} appearance-none rounded-none pr-8`}
            >
              {SITE.appointmentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-mute"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-message`} className="eyebrow block text-mute">
            Décrivez brièvement la situation *
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            required
            aria-required="true"
            maxLength={4000}
            aria-invalid={!!err("message")}
            aria-describedby={describedBy("message", `${formId}-h-message`)}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => blur("message")}
            placeholder="Qui sont les parties ? Que s’est-il passé ? Une échéance est-elle en cours (mise en demeure, assignation, audience) ?"
            className={`${fieldClass(!!err("message"))} resize-y`}
          />
          <p id={`${formId}-h-message`} className="mt-2 text-xs text-mute">
            {values.message.trim().length} caractères (20 minimum) — sans pièce sensible jointe à
            ce stade.
          </p>
          {err("message") && (
            <p id={`${formId}-e-message`} className="mt-2 text-xs text-red-800">
              {err("message")}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id={`${formId}-consent`}
              name="consent"
              type="checkbox"
              required
              aria-required="true"
              aria-invalid={!!err("consent")}
              aria-describedby={describedBy("consent")}
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
              onBlur={() => blur("consent")}
              className="mt-1 h-4 w-4 shrink-0 accent-[#101D2B]"
            />
            <label htmlFor={`${formId}-consent`} className="text-sm leading-relaxed text-ink/85">
              J&apos;ai pris connaissance de la{" "}
              <Link
                href="/politique-de-confidentialite"
                className="link-underline text-navy underline-offset-2"
              >
                politique de confidentialité
              </Link>{" "}
              et j&apos;accepte que les informations transmises via ce formulaire soient traitées par
              le cabinet pour l&apos;examen de ma demande.
            </label>
          </div>
          {err("consent") && (
            <p id={`${formId}-e-consent`} className="mt-2 text-xs text-red-800">
              {err("consent")}
            </p>
          )}
        </div>
      </div>

      <div aria-live="polite" className="mt-6">
        {status === "success" && (
          <div
            ref={statusRef}
            tabIndex={-1}
            role="status"
            className="flex items-start gap-3 border border-navy/20 bg-ivory px-4 py-4 text-sm leading-relaxed text-navy outline-none"
          >
            <CheckCircle2
              size={17}
              strokeWidth={1.5}
              aria-hidden="true"
              className="mt-0.5 shrink-0"
            />
            <p>{SUCCESS_MESSAGE}</p>
          </div>
        )}
        {status === "error" && (
          <div
            ref={statusRef}
            tabIndex={-1}
            role="alert"
            className="flex items-start gap-3 border border-red-800/30 bg-red-50 px-4 py-4 text-sm leading-relaxed text-red-900 outline-none"
          >
            <AlertCircle
              size={17}
              strokeWidth={1.5}
              aria-hidden="true"
              className="mt-0.5 shrink-0"
            />
            <p>{errorMessage}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-5 border-t border-rule pt-7 sm:flex-row sm:items-start sm:justify-between">
        <p id={`${formId}-form-note`} className="max-w-[44ch] text-xs leading-relaxed text-mute">
          {CONTACT.formNote}
        </p>
        <div className="flex shrink-0 flex-col gap-3 sm:items-end">
          <button
            type="submit"
            disabled={submitting}
            className="eyebrow group inline-flex items-center justify-center gap-3 bg-navy px-7 py-4 text-ivory transition-colors duration-300 hover:bg-navytint disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send size={15} strokeWidth={1.75} aria-hidden="true" />
            {submitting ? "Envoi en cours…" : CTA.submit}
          </button>
          <p className="text-xs text-mute sm:text-right">{CTA.reassurance}</p>
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-mute">
        Vous pouvez également écrire directement à{" "}
        <a href={`mailto:${SITE.email}`} className="link-underline break-all text-navy">
          {SITE.email}
        </a>{" "}
        ou joindre le cabinet au{" "}
        <a href={SITE.phoneHref} className="link-underline text-navy">
          {SITE.phone}
        </a>
        .
      </p>
    </form>
  );
}
