import type { Metadata } from "next";
import ExpertisePage, { type ExpertisePageData } from "@/components/ExpertisePage";
import { buildPageMetadata } from "@/lib/seo";

// TODO [À CONFIRMER] Contenu éditorial et réponses FAQ à relire et valider par Maître Blexmann.
const TITLE = "Contentieux post-acquisition Paris | Blexmann Avocats";
const DESCRIPTION =
  "Garantie d’actif et de passif, earn-out ou prix de cession contesté à Paris : Blexmann Avocats instruit votre dossier. Exposez votre situation.";
const PATH = "/contentieux-post-acquisition";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const DATA: ExpertisePageData = {
  path: PATH,
  breadcrumbLabel: "Contentieux post-acquisition",
  eyebrow: "Contentieux post-acquisition — Paris",
  h1: "Avocat en contentieux post-acquisition à Paris",
  intro: [
    "Découverte d’un passif fiscal, social ou litigieux après le closing, désaccord sur les comptes de cession, refus de verser un complément de prix (earn-out) ou violation d’un engagement de non-concurrence : les mois suivant une opération de cession cristallisent des litiges à forts enjeux financiers.",
    "Blexmann Avocats accompagne acquéreurs, cédants, associés et dirigeants dans l’instruction, la négociation et le règlement contentieux de leurs différends post-acquisition à Paris.",
  ],
  situationsTitle: "Différends survenant après une cession de titres ou de fonds",
  situationsText:
    "Les contentieux post-cession mêlent étroitement droit des contrats, droit des sociétés et analyse comptable. La moindre imprécision dans une notification peut compromettre une réclamation pourtant fondée.",
  situationsBullets: [
    "Mise en jeu ou contestation d’une garantie d’actif et de passif (GAP) : inexactitude des déclarations du cédant, redressement fiscal ou URSSAF, litige commercial ou prud’homal ayant une origine antérieure à la cession.",
    "Ajustement de prix et complément de prix (earn-out) : contestation des comptes de référence (trésorerie nette, dette nette, BFR), désaccord sur l’atteinte des indicateurs de performance ou sur la conduite de la société cible durant la période d’earn-out.",
    "Vices du consentement et manquement au devoir précontractuel d’information : réticence dolosive ou dissimulation d’éléments déterminants lors de la phase d’audit (art. 1112-1 et 1137 du Code civil).",
    "Engagements post-closing : violation d’une clause de non-concurrence ou de non-débauchage, inexécution d’une convention d’accompagnement ou blocage d’une garantie bancaire / d’un séquestre.",
  ],
  enjeuxTitle: "Enjeux financiers et lecture rigoureuse des actes",
  enjeuxParagraphs: [
    "Pour l’acquéreur, un passif non révélé ou une surévaluation des actifs altère directement la rentabilité de l’opération et les équilibres de financement. Pour le cédant, un appel en garantie infondé ou le blocage d’un complément de prix immobilise une part substantielle du produit de cession.",
    "Le cabinet procède dès sa saisine à un audit précis du protocole de cession (SPA), de la convention de garantie et de leurs annexes afin de sécuriser le calendrier contractuel et de qualifier les fondements mobilisables.",
  ],
  enjeuxPoints: [
    "Formalisme et délais d’appel en garantie : délai contractuel de notification, mode d’envoi imposé, pièces à joindre et droit d’information ou d’association du cédant à la défense face aux tiers.",
    "Mécanismes financiers de la GAP : seuil de déclenchement, franchise, plafond d’indemnisation, déduction des provisions ou économies d’impôt, et sûretés adossées (garantie à première demande, caution, séquestre).",
    "Clause de détermination du prix : périmètre comptable retenu et éventuel recours à un tiers estimateur (art. 1592 ou 1843-4 du Code civil).",
    "Clause de règlement des différends : conciliation préalable, compétence du tribunal des activités économiques de Paris ou clause compromissoire d’arbitrage.",
  ],
  conduiteTitle: "Conduite de la réclamation, négociation et contentieux",
  conduiteParagraphs: [
    "Le cabinet rédige les notifications de réclamation ou les réponses en contestation dans le respect strict des stipulations de la convention, et travaille en lien avec les conseils financiers et comptables du client pour étayer ou discuter le chiffrage du préjudice.",
    "Selon l’évolution des échanges et les clauses du contrat, le cabinet mène les pourparlers en vue d’un accord transactionnel ou représente le client devant la juridiction étatique compétente, en référé comme au fond, ou dans le cadre d’une procédure arbitrale.",
  ],
  faqs: [
    {
      q: "Que se passe-t-il si le délai de notification prévu par la garantie de passif est dépassé ?",
      a: "Tout dépend de la sanction stipulée dans la convention de garantie : certains actes prévoient expressément la déchéance du droit à indemnisation en cas de notification tardive, tandis que d’autres ne réduisent l’indemnisation qu’à hauteur du préjudice causé au cédant par ce retard. Une vérification immédiate de la clause s’impose dès la connaissance d’un fait générateur.",
    },
    {
      q: "Peut-on agir en cas de dissimulation découverte hors plafond ou hors délai de la GAP ?",
      a: "Lorsque la preuve d’une manœuvre ou d’une dissimulation intentionnelle d’une information déterminante est rapportée, une action fondée sur le dol (art. 1137 du Code civil) obéit à son propre régime légal de prescription et n’est pas enfermée dans les plafonds conventionnels de la garantie de passif. La charge de la preuve de l’intention dolosive demeure toutefois exigeante.",
    },
    {
      q: "Comment sont tranchés les litiges portant sur un complément de prix (earn-out) ?",
      a: "L’analyse porte d’abord sur la précision des critères comptables ou opérationnels fixés au contrat, sur la permanence des méthodes comptables appliquées et sur le respect de la bonne foi dans la gestion de la société pendant la période de référence. En cas de désaccord technique sur le calcul, l’acte prévoit fréquemment l’intervention d’un tiers estimateur indépendant, tandis que les fautes contractuelles relèvent du juge ou de l’arbitre.",
    },
    {
      q: "Une clause de non-concurrence du cédant est-elle toujours opposable ?",
      a: "Dans une cession de droits sociaux ou de fonds de commerce, la clause de non-concurrence est valable si elle est limitée dans le temps et dans l’espace (ou quant à l’activité) et proportionnée aux intérêts légitimes de la société acquise ; contrairement au droit du travail, elle n’exige pas de contrepartie financière distincte du prix de cession.",
    },
  ],
  related: [
    { label: "Conflits entre associés et actionnaires à Paris", href: "/conflits-entre-associes" },
    { label: "Contentieux commercial et contractuel à Paris", href: "/contentieux-commercial" },
    { label: "Responsabilité des dirigeants à Paris", href: "/responsabilite-des-dirigeants" },
    { label: "Contentieux commercial international", href: "/contentieux-international" },
  ],
  contactSubject: "Contentieux post-acquisition",
};

export default function Page() {
  return <ExpertisePage data={DATA} />;
}
