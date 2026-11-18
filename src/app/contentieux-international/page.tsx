import type { Metadata } from "next";
import ExpertisePage, { type ExpertisePageData } from "@/components/ExpertisePage";
import { buildPageMetadata } from "@/lib/seo";

// TODO [À CONFIRMER] Contenu éditorial et réponses FAQ à relire et valider par Maître Blexmann.
const TITLE = "Contentieux commercial international | Blexmann Avocats";
const DESCRIPTION =
  "Contrat international, compétence, loi applicable ou exequatur à Paris : Blexmann Avocats analyse votre dossier. Exposez votre situation.";
const PATH = "/contentieux-international";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const DATA: ExpertisePageData = {
  path: PATH,
  breadcrumbLabel: "Contentieux international",
  eyebrow: "Contentieux commercial international — Paris",
  h1: "Avocat en contentieux commercial international à Paris",
  intro: [
    "Impayé d’un acheteur étranger, rupture d’un contrat de distribution international, livraison défectueuse transfrontalière ou exécution en France d’une décision étrangère : dès qu’un litige comporte un élément d’extranéité, les questions de procédure internationale conditionnent directement l’efficacité du recours.",
    "Établi à Paris 16e, Blexmann Avocats représente dirigeants, associés et entreprises devant les juridictions françaises et dans les modes alternatifs de règlement des différends lorsque le dossier comporte un élément d’extranéité.",
  ],
  situationsTitle: "Situations transfrontalières traitées",
  situationsText:
    "Avant même de débattre du fond, un contentieux international impose de déterminer devant quel juge ou arbitre agir, selon quel droit substantiel et où la décision pourra être effectivement exécutée.",
  situationsBullets: [
    "Inexécution de contrats internationaux : contrats de vente internationale de marchandises, d’agence commerciale, de distribution, de prestation de services ou de sous-traitance industrielle.",
    "Conflits de juridictions et exceptions d’incompétence : mise en œuvre ou contestation d’une clause attributive de juridiction ou d’une clause compromissoire, risques de procédures parallèles (litispendance).",
    "Détermination du droit applicable : articulation entre la loi choisie par les parties, les règlements européens, les conventions internationales (telles que la Convention de Vienne sur la vente internationale de marchandises) et les lois de police.",
    "Circulation et exécution des décisions : reconnaissance et exécution en France de jugements étrangers ou de sentences arbitrales (exequatur), et anticipation de l’exécution à l’étranger d’une décision française.",
  ],
  enjeuxTitle: "Enjeux procéduraux et points d’analyse dès l’origine",
  enjeuxParagraphs: [
    "Engager une action devant une juridiction incompétente ou obtenir un jugement difficilement exécutable dans le pays où se situent les actifs du débiteur entraîne une perte de temps et des coûts considérables (significations internationales, traductions assermentées, débats préliminaires de compétence).",
    "C’est pourquoi le cabinet procède systématiquement à une vérification préalable du cadre de droit international privé avant toute mise en demeure ou assignation.",
  ],
  enjeuxPoints: [
    "Validité et opposabilité des clauses attributives de juridiction (notamment au regard du règlement UE n° 1215/2012 dit « Bruxelles I bis ») ou des clauses d’arbitrage et de médiation.",
    "Identification de la loi applicable au contrat (règlement UE n° 593/2008 dit « Rome I ») ou à la responsabilité extracontractuelle (règlement « Rome II »), ainsi que des délais de prescription qui en découlent.",
    "Modalités de notification ou de signification internationale des actes et exigences de traduction des pièces.",
    "Localisation des actifs de la contrepartie et régime de reconnaissance ou d’exequatur applicable (espace judiciaire européen ou États tiers).",
  ],
  conduiteTitle: "Voies contentieuses, modes amiables et rôle du cabinet",
  conduiteParagraphs: [
    "Devant les juridictions françaises — et notamment devant le tribunal des activités économiques de Paris, le tribunal judiciaire et la cour d’appel de Paris — le cabinet assure la représentation en demande comme en défense, y compris sur les incidents de compétence et les demandes d’exequatur.",
    "Au regard des coûts et de la durée propres au contentieux transfrontalier, le cabinet évalue également l’intérêt d’une négociation structurée, d’une médiation ou d’une procédure arbitrale afin de privilégier une issue juridiquement solide et concrètement exécutable.",
  ],
  faqs: [
    {
      q: "Comment savoir si les tribunaux français sont compétents pour un litige avec une société étrangère ?",
      a: "On vérifie d’abord si le contrat contient une clause attributive de juridiction ou une clause d’arbitrage valable et opposable. À défaut, au sein de l’Union européenne, le règlement Bruxelles I bis (n° 1215/2012) désigne en principe les juridictions du domicile du défendeur, tout en ouvrant des options spéciales — par exemple, en matière contractuelle, le lieu de livraison des marchandises ou de fourniture des services. Hors Union européenne, les conventions bilatérales ou les règles françaises de compétence internationale s’appliquent.",
    },
    {
      q: "Quelle loi s’applique si le contrat international ne le précise pas ?",
      a: "Pour les contrats relevant du règlement européen Rome I (n° 593/2008), à défaut de choix exprès ou certain des parties, la loi applicable dépend du type de contrat : par exemple la loi de la résidence habituelle du vendeur pour une vente de marchandises (sous réserve de l’application éventuelle de la Convention de Vienne) ou celle du prestataire pour une prestation de services.",
    },
    {
      q: "Un jugement commercial rendu en France s’exécute-t-il directement dans un autre pays ?",
      a: "Dans les autres États membres de l’Union européenne, le règlement Bruxelles I bis permet la reconnaissance et l’exécution des décisions commerciales sans procédure préalable d’exequatur, sur production du certificat prévu par le règlement (sauf motif exceptionnel de refus). Dans un État tiers, la reconnaissance et l’exécution dépendent des conventions internationales existantes et du droit local de cet État.",
    },
    {
      q: "Pourquoi vérifier la présence d’une clause d’arbitrage avant d’assigner ?",
      a: "En vertu du principe dit de « compétence-compétence » (art. 1448 du Code de procédure civile), lorsqu’un litige relevant d’une convention d’arbitrage est porté devant une juridiction étatique française, celle-ci doit se déclarer incompétente si une partie le soulève, sauf si le tribunal arbitral n’est pas encore saisi et si la convention d’arbitrage est manifestement nulle ou manifestement inapplicable.",
    },
  ],
  related: [
    { label: "Contentieux commercial et contractuel à Paris", href: "/contentieux-commercial" },
    { label: "Contentieux post-acquisition à Paris", href: "/contentieux-post-acquisition" },
    {
      label: "Rupture brutale et concurrence déloyale à Paris",
      href: "/rupture-brutale-concurrence-deloyale",
    },
    { label: "Référé et procédures d’urgence à Paris", href: "/procedures-d-urgence" },
  ],
  contactSubject: "Contentieux international",
};

export default function Page() {
  return <ExpertisePage data={DATA} />;
}
