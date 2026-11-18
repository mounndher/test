import { CONTACT_SUBJECTS, SITE } from "@/content/site";

/**
 * Contact form contract shared by the browser (instant feedback) and the
 * server route (authoritative validation). Messages are identical on both sides.
 */
export type ContactFields = {
  nom: string;
  email: string;
  telephone: string;
  societe: string;
  sujet: string;
  message: string;
  appointmentMode: string;
  consent: boolean;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 4000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d\s.-]{6,30}$/;

export function validateContact(values: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  const nom = values.nom.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (nom.length < 2) errors.nom = "Veuillez indiquer votre nom et votre prénom.";
  if (nom.length > 100) errors.nom = "Ce champ est trop long (100 caractères maximum).";
  if (!EMAIL_PATTERN.test(email) || email.length > 254)
    errors.email = "Veuillez indiquer une adresse électronique valide.";
  if (values.telephone.trim() && !PHONE_PATTERN.test(values.telephone.trim()))
    errors.telephone = "Veuillez indiquer un numéro de téléphone valide.";
  if (values.societe.trim().length > 150)
    errors.societe = "Ce champ est trop long (150 caractères maximum).";
  if (!(CONTACT_SUBJECTS as readonly string[]).includes(values.sujet))
    errors.sujet = "Veuillez sélectionner la nature de votre dossier.";
  if (!(SITE.appointmentOptions as readonly string[]).includes(values.appointmentMode))
    errors.appointmentMode = "Veuillez choisir une modalité de rendez-vous.";
  if (message.length < MESSAGE_MIN)
    errors.message = "Veuillez décrire brièvement votre situation (20 caractères minimum).";
  if (message.length > MESSAGE_MAX)
    errors.message = "Votre message est trop long (4 000 caractères maximum).";
  if (!values.consent)
    errors.consent =
      "Veuillez confirmer avoir pris connaissance de la politique de confidentialité avant d’envoyer votre demande.";
  return errors;
}

/** Coerces an untrusted JSON body into ContactFields (+ the honeypot value). */
export function parseContactBody(raw: unknown): ContactFields & { trap: string } {
  const body = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;
  const text = (value: unknown) => (typeof value === "string" ? value : "");
  return {
    nom: text(body.nom),
    email: text(body.email),
    telephone: text(body.telephone),
    societe: text(body.societe),
    sujet: text(body.sujet),
    message: text(body.message),
    appointmentMode: text(body.appointmentMode),
    consent: body.consent === true,
    trap: text(body.siteweb),
  };
}
