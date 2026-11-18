import type { Metadata } from "next";
import ExpertisePage, { type ExpertisePageData } from "@/components/ExpertisePage";
import { buildPageMetadata } from "@/lib/seo";

// TODO [À CONFIRMER] Contenu éditorial et réponses FAQ à relire et valider par Maître Blexmann.
const TITLE = "Rupture brutale & concurrence Paris | Blexmann Avocats";
const DESCRIPTION =
  "Rupture brutale de relation commerciale établie ou concurrence déloyale à Paris : Blexmann Avocats défend vos intérêts. Exposez votre situation.";
const PATH = "/rupture-brutale-concurrence-deloyale";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const DATA: ExpertisePageData = {
  path: PATH,
  breadcrumbLabel: "Rupture brutale & concurrence",
  eyebrow: "Rupture brutale et concurrence déloyale — Paris",
  h1: "Rupture brutale et concurrence déloyale : avocat à Paris",
  intro: [
    "Déréférencement soudain, arrêt ou chute massive de commandes sans préavis écrit suffisant, détournement de clientèle, dénigrement ou reprise parasitaire d’investissements : ces pratiques déstabilisent brutalement le chiffre d’affaires et l’organisation commerciale.",
    "Blexmann Avocats accompagne tant les entreprises qui subissent une rupture brutale ou un acte déloyal que celles qui entendent sécuriser la fin d’une relation commerciale ou se défendre face à une assignation.",
  ],
  situationsTitle: "Situations relevant de ce contentieux",
  situationsText:
    "La rupture brutale d’une relation commerciale établie (art. L. 442-1, II du Code de commerce) et la concurrence déloyale ou parasitaire (art. 1240 du Code civil) répondent à des fondements juridiques et probatoires distincts, qu’il convient de ne pas confondre.",
  situationsBullets: [
    "Rupture totale ou partielle d’une relation commerciale établie : interruption des commandes, baisse significative de volume, modification unilatérale substantielle des conditions tarifaires ou recours soudain à un appel d’offres sans préavis écrit suffisant.",
    "Concurrence déloyale : dénigrement de produits, de services ou de la situation d’une entreprise auprès de clients ou partenaires, confusion entretenue sur l’origine commerciale, désorganisation d’une entreprise concurrente.",
    "Débauchage fautif et captation de clientèle : départ concerté de collaborateurs accompagné d’un détournement de fichiers, de savoir-faire ou de contrats en cours.",
    "Parasitisme économique : appropriation indue et sans bourse délier d’une valeur économique individualisée (investissements commerciaux, techniques ou créatifs) en se plaçant dans le sillage d’un opérateur.",
  ],
  enjeuxTitle: "Enjeux de marge, de preuve et de compétence juridictionnelle",
  enjeuxParagraphs: [
    "Pour l’entreprise évincée, l’absence de préavis suffisant prive du temps nécessaire pour réorienter son outil de production ou sa force commerciale ; le préjudice indemnisable se mesure principalement à la marge sur coûts variables perdue durant le préavis qui aurait dû être accordé. En matière de concurrence déloyale, la poursuite du trouble érode durablement la clientèle si la preuve n’est pas figée rapidement.",
    "Par ailleurs, les litiges fondés sur l’article L. 442-1, II du Code de commerce relèvent de juridictions commerciales spécialement désignées par la loi (dont le tribunal des activités économiques de Paris, avec compétence exclusive de la cour d’appel de Paris en appel) : saisir une juridiction non habilitée expose à une fin de non-recevoir.",
  ],
  enjeuxPoints: [
    "Caractère établi de la relation (durée, continuité, volume d’affaires, absence de précarité) et appréciation du préavis suffisant au regard des usages et d’une éventuelle dépendance économique (étant rappelé le plafond légal de dix-huit mois de préavis de l’art. L. 442-1, II C. com.).",
    "Existence d’une notification écrite claire annonçant la rupture, ou de manquements suffisamment graves justifiant une rupture sans préavis.",
    "Constitution de la preuve en concurrence déloyale : constats de commissaire de justice (notamment en ligne), attestations régulières, mesure d’instruction sur requête (art. 145 CPC) lorsque nécessaire.",
    "Justification comptable rigoureuse de la marge sur coûts variables et des coûts spécifiques non amortis.",
  ],
  conduiteTitle: "Stratégie d’action, défense et intervention du cabinet",
  conduiteParagraphs: [
    "En demande, le cabinet organise la préservation des preuves, évalue avec les éléments comptables du client le préavis exigible et le préjudice réparable, adresse une mise en demeure circonstanciée et, à défaut d’accord transactionnel, saisit la juridiction spécialisée ou le juge des référés pour faire cesser un trouble manifestement illicite.",
    "En amont ou en défense, le cabinet aide l’entreprise à encadrer par écrit la fin d’une relation commerciale ou conteste le caractère établi de la relation, la durée de préavis revendiquée et le calcul de marge présenté par la partie adverse.",
  ],
  faqs: [
    {
      q: "Comment est calculée l’indemnité en cas de rupture brutale de relation commerciale ?",
      a: "La réparation porte sur le préjudice résultant de la brutalité de la rupture, et non de la rupture elle-même. Elle correspond en principe à la marge sur coûts variables (chiffre d’affaires hors taxes diminué des charges variant directement avec le volume d’activité) que la victime aurait pu réaliser pendant la durée du préavis manquant, attestée par des éléments comptables précis.",
    },
    {
      q: "Le préavis inscrit dans le contrat protège-t-il automatiquement l’auteur de la rupture ?",
      a: "Pas nécessairement : en présence d’une relation commerciale établie, le juge vérifie si le délai contractuel tenait suffisamment compte de la durée totale de la relation et des autres circonstances au moment de la notification. Toutefois, selon l’article L. 442-1, II du Code de commerce, en cas de litige sur la durée du préavis, la responsabilité de l’auteur de la rupture ne peut être engagée du chef d’une durée insuffisante dès lors qu’il a respecté un préavis d’au moins dix-huit mois.",
    },
    {
      q: "Le recrutement d’anciens salariés par un concurrent suffit-il à prouver la concurrence déloyale ?",
      a: "Non, en vertu de la liberté du travail et de la liberté d’entreprendre, l’embauche d’un salarié non lié par une clause de non-concurrence et le démarchage loyal d’une clientèle sont licites. La concurrence déloyale suppose des manœuvres fautives : détournement de fichiers confidentiels, dénigrement, confusion volontairement créée ou débauchage massif désorganisant réellement l’entreprise.",
    },
    {
      q: "Quel tribunal saisir pour une action en rupture brutale de relation commerciale ?",
      a: "Seules huit juridictions commerciales spécialement désignées par le Code de commerce (art. L. 442-4, III et D. 442-2), parmi lesquelles le tribunal des activités économiques de Paris, peuvent statuer sur ce fondement, et la cour d’appel de Paris est seule compétente pour connaître des appels formés contre leurs décisions.",
    },
  ],
  related: [
    { label: "Contentieux commercial et contractuel à Paris", href: "/contentieux-commercial" },
    { label: "Référé et procédures d’urgence à Paris", href: "/procedures-d-urgence" },
    { label: "Contentieux commercial international", href: "/contentieux-international" },
    { label: "Présentation de Maître Pierre Blexmann", href: "/le-cabinet" },
  ],
  contactSubject: "Rupture brutale ou concurrence déloyale",
};

export default function Page() {
  return <ExpertisePage data={DATA} />;
}
