/**
 * FAQ des pages /le-cabinet et /contact — source unique partagée par le rendu
 * et par le seed de la base d'administration (src/db/seed.ts).
 */
export const CABINET_FAQS = [
  {
    q: "Quelles sont les modalités de rendez-vous proposées par le cabinet ?",
    a: "Le cabinet reçoit sur rendez-vous au cabinet (Paris, 53 avenue Victor Hugo, 75116), en visioconférence ou par téléphone, selon vos contraintes géographiques et votre agenda.",
  },
  {
    q: "Devant quelles juridictions le cabinet intervient-il ?",
    a: "Établi à Paris, le cabinet représente ses clients devant les juridictions françaises compétentes en contentieux des affaires — notamment le tribunal des activités économiques de Paris, le tribunal judiciaire et la cour d’appel de Paris — ainsi que dans le cadre des modes alternatifs de règlement des différends (négociation, médiation, conciliation, arbitrage).",
  },
  {
    q: "Comment sont encadrés l’acceptation d’un dossier et les honoraires ?",
        // TODO [À CONFIRMER] : formulation sur les honoraires (présentée avant toute intervention) à valider avec l'avocat.
    a: "Une relation avocat-client ne s’établit qu’après l’acceptation expresse du dossier par le cabinet, précédée notamment de la vérification de l’absence de conflit d’intérêts. Les modalités d’honoraires sont présentées avant toute intervention et formalisées par une convention écrite.",
  },
] as const;

export const CONTACT_FAQS = [
  {
    q: "Comment fonctionne l’envoi de ma demande ?",
    a: "Le formulaire transmet votre demande directement au cabinet, par courriel, sans ouvrir votre messagerie. Merci de ne communiquer aucune pièce sensible lors de ce premier envoi.",
  },
  {
    q: "Quelles modalités de rendez-vous sont proposées ?",
    a: "Les consultations peuvent se tenir au cabinet (Paris, 53 avenue Victor Hugo, 75116), en visioconférence ou par téléphone, selon vos disponibilités et la nature du dossier.",
  },
  {
    q: "L’envoi d’une demande crée-t-il automatiquement une relation avocat-client ?",
    a: "Non. L’envoi d’un courriel de prise de contact ne crée pas, en soi, de relation avocat-client : celle-ci débute uniquement après l’acceptation expresse du dossier par le cabinet, à l’issue des vérifications d’usage — notamment l’absence de conflit d’intérêts — et la conclusion d’une convention d’honoraires.",
  },
] as const;
