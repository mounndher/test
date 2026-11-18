/**
 * Editorial content for the Publications externes section and /publications page.
 *
 * Strict editorial integrity:
 * - Only verified external publications actually authored and published by
 *   Maître Pierre Blexmann are listed, each with its verified publication date
 *   and destination URL on Village de la Justice.
 * - These 2020 contributions cover evidentiary rules in employment law and are
 *   explicitly contextualized as prior external publications, without presenting
 *   employment law as the firm's current core practice (contentieux des affaires).
 * - Zero fabricated articles, dates, authors, or links.
 *
 * TODO [RECOMMANDATION ÉDITORIALE — À RÉDIGER / VALIDER PAR L'AVOCAT]
 * Sujets d'articles alignés sur le positionnement en contentieux des affaires,
 * à publier uniquement une fois rédigés et validés par Maître Pierre Blexmann :
 * 1. Garantie d'actif et de passif : délais de notification, franchise, plafond et preuve du préjudice.
 * 2. Rupture brutale des relations commerciales établies (art. L. 442-1, II C. com.) : critères du préavis suffisant et calcul de la marge perdue.
 * 3. Conflits entre associés : débloquer la gouvernance ou organiser une sortie du capital.
 * 4. Injonction de payer devant le tribunal des activités économiques : conditions, pièces utiles et gestion de l'opposition.
 * 5. Référé-provision commercial (art. 873 al. 2 CPC) : caractériser l'absence de contestation sérieuse.
 * 6. Responsabilité civile du dirigeant : distinction entre faute de gestion, faute séparable et insuffisance d'actif.
 */

export type ExternalPublication = {
  id: string;
  status: "Publication externe";
  theme: string;
  venue: string;
  publishedDate: string;
  isoDate: string;
  title: string;
  author: string;
  excerpt: string;
  href: string;
};

/**
 * Verified external publications authored by Maître Pierre Blexmann
 * and published on Village de la Justice (avril–juin 2020).
 * TODO: Verify with lawyer: replace 2020 labor law articles with recent commercial litigation articles when authored and approved.
 */
export const EXTERNAL_PUBLICATIONS: ExternalPublication[] = [
  {
    id: "village-justice-discrimination-1",
    status: "Publication externe",
    theme: "Contribution antérieure · Droit de la preuve",
    venue: "Village de la Justice",
    publishedDate: "8 avril 2020",
    isoDate: "2020-04-08",
    title:
      "Comment prouver la discrimination dans le cadre des relations de travail ? (1re partie)",
    author: "Pierre Blexmann, avocat",
    excerpt:
      "Présentation du régime légal d’aménagement de la charge de la preuve (art. L. 1134-1 du Code du travail) : motifs prohibés, faisceau d’éléments de fait à réunir et justification objective attendue en défense.",
    href: "https://www.village-justice.com/articles/comment-prouver-discrimination-dans-cadre-des-relations-travail-1ere-partie,34583.html",
  },
  {
    id: "village-justice-discrimination-2",
    status: "Publication externe",
    theme: "Contribution antérieure · Droit de la preuve",
    venue: "Village de la Justice",
    publishedDate: "26 mai 2020",
    isoDate: "2020-05-26",
    title:
      "Comment prouver la discrimination dans le cadre des relations de travail ? (2e partie)",
    author: "Pierre Blexmann, avocat",
    excerpt:
      "Examen des modes et moyens de preuve admis devant le juge : preuve directe, méthode comparative, forme et portée probatoire des attestations (art. 202 CPC) et exigences procédurales.",
    href: "https://www.village-justice.com/articles/comment-prouver-discrimination-dans-cadre-des-relations-travail-2eme-partie,35197.html",
  },
  {
    id: "village-justice-discrimination-3",
    status: "Publication externe",
    theme: "Contribution antérieure · Droit de la preuve",
    venue: "Village de la Justice",
    publishedDate: "9 juin 2020",
    isoDate: "2020-06-09",
    title:
      "Comment prouver la discrimination dans le cadre des relations de travail ? (3e partie)",
    author: "Pierre Blexmann, avocat",
    excerpt:
      "Analyse du rôle des différents acteurs et autorités susceptibles de concourir à la réunion et à la conservation des éléments de preuve dans ce contentieux.",
    href: "https://www.village-justice.com/articles/comment-prouver-discrimination-dans-cadre-des-relations-travail-3eme-partie,35663.html",
  },
];
