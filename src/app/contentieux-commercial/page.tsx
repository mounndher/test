import type { Metadata } from "next";
import ExpertisePage, { type ExpertisePageData } from "@/components/ExpertisePage";
import { buildPageMetadata } from "@/lib/seo";

// TODO [À CONFIRMER] Contenu éditorial et réponses FAQ à relire et valider par Maître Blexmann.
const TITLE = "Avocat litige commercial Paris | Blexmann Avocats";
const DESCRIPTION =
  "Impayés, inexécution et résiliation de contrats à Paris : Blexmann Avocats assiste dirigeants et entreprises. Exposez votre situation.";
const PATH = "/contentieux-commercial";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const DATA: ExpertisePageData = {
  path: PATH,
  breadcrumbLabel: "Contentieux commercial",
  eyebrow: "Contentieux commercial et contractuel — Paris",
  h1: "Avocat en litiges commerciaux et contractuels à Paris",
  intro: [
    "Factures échues restées impayées, prestation interrompue en cours de chantier ou de déploiement, marchandise non conforme, résiliation unilatérale contestée : le différend commercial pèse directement sur la trésorerie, les marges et l’organisation opérationnelle de l’entreprise.",
    "Blexmann Avocats accompagne dirigeants, associés et entreprises confrontés à des litiges commerciaux et contractuels, en demande comme en défense, notamment devant le tribunal des activités économiques de Paris (ancien tribunal de commerce), le tribunal judiciaire et la cour d’appel de Paris.",
  ],
  situationsTitle: "Situations conduisant à saisir le cabinet",
  situationsText:
    "Un litige contractuel naît rarement d’un seul désaccord isolé : il s’installe au fil de relances infructueuses, de réserves contestées ou d’avenants non formalisés. Intervenir tôt permet de qualifier précisément le manquement et d’éviter des écrits maladroits.",
  situationsBullets: [
    "Créances commerciales et factures impayées : défaut de règlement persistant, retenues unilatérales injustifiées, contestation tardive après livraison ou réception.",
    "Inexécution ou mauvaise exécution contractuelle : retards significatifs, non-conformité de fournitures ou de prestations intellectuelles et informatiques, inexécution d’obligations d’exclusivité ou d’approvisionnement.",
    "Résiliation, résolution et exception d’inexécution : rupture anticipée d’un contrat à durée déterminée, mise en jeu d’une clause résolutoire ou suspension de prestations (art. 1217 et suivants du Code civil).",
    "Différends de sous-traitance, de distribution ou de partenariat : pénalités contractuelles, appels en garantie et responsabilités croisées entre intervenants.",
  ],
  enjeuxTitle: "Conséquences économiques et points d’examen juridique",
  enjeuxParagraphs: [
    "Au-delà du principal réclamé, un contrat inexécuté immobilise le besoin en fonds de roulement, désorganise la chaîne d’approvisionnement et expose parfois l’entreprise à l’égard de ses propres clients. À l’inverse, engager une procédure sans vérifier la solidité du dossier ou la solvabilité du débiteur expose à des frais inutiles et à une demande reconventionnelle.",
    "Le cabinet procède d’abord à une lecture rigoureuse de l’ensemble contractuel et probatoire afin de mesurer les forces et les points de fragilité du dossier avant toute prise de position officielle.",
  ],
  enjeuxPoints: [
    "Périmètre contractuel exact : contrat signé, avenants, conditions générales opposables, bons de commande et devis acceptés.",
    "Clauses structurantes : clause résolutoire, clause limitative de responsabilité ou clause pénale, clause de conciliation préalable obligatoire, clause attributive de juridiction.",
    "Preuve de l’exécution et du préjudice : procès-verbaux de réception, bons de livraison, échanges écrits, perte subie et gain manqué documentés.",
    "Prescription, situation financière du cocontractant et opportunité d’une mesure conservatoire préalable.",
  ],
  conduiteTitle: "Voies d’action et intervention du cabinet",
  conduiteParagraphs: [
    "Selon la nature de la créance et le degré de contestation adverse, le cabinet compare les leviers disponibles : mise en demeure argumentée ouvrant la voie à un protocole transactionnel, requête en injonction de payer (art. 1405 et s. CPC), référé-provision lorsque l’obligation n’est pas sérieusement contestable (art. 873, al. 2 CPC), ou assignation au fond en exécution forcée, résolution et dommages-intérêts.",
    "En défense, le cabinet vérifie la recevabilité de la demande (prescription, défaut de tentative amiable contractuelle, incompétence), conteste le bien-fondé ou le quantum réclamé et formule, s’il y a lieu, les demandes reconventionnelles utiles. Chaque étape est exposée clairement avant d’être engagée.",
  ],
  faqs: [
    {
      q: "Une mise en demeure est-elle indispensable avant d’assigner un cocontractant ?",
      a: "Sauf exception, la mise en demeure préalable est essentielle : elle constate officiellement l’inexécution, fixe un délai raisonnable pour s’exécuter, fait courir les intérêts moratoires et conditionne souvent la résolution du contrat ou la mise en œuvre d’une clause résolutoire. Sa rédaction doit être précise, car elle fixe le premier cadre du litige.",
    },
    {
      q: "Comment choisir entre injonction de payer, référé-provision et assignation au fond ?",
      a: "L’injonction de payer, procédure initialement non contradictoire sur pièces, convient aux créances contractuelles certaines, liquides et exigibles peu susceptibles d’être discutées. Le référé-provision permet un débat contradictoire resserré lorsque l’obligation n’est pas sérieusement contestable. Si le litige porte sur l’interprétation du contrat, la qualité des prestations ou le chiffrage d’un préjudice complexe, l’assignation au fond s’impose.",
    },
    {
      q: "Peut-on suspendre ses propres prestations lorsqu’un client ne paie plus ?",
      a: "L’exception d’inexécution (art. 1219 du Code civil) autorise une partie à refuser d’exécuter son obligation si l’autre n’exécute pas la sienne, à condition que cette inexécution soit suffisamment grave et que la riposte demeure proportionnée. Une suspension hâtive ou disproportionnée risquant d’être requalifiée en rupture fautive, il est prudent de la faire valider avant de la notifier.",
    },
    {
      q: "Une relation commerciale sans contrat écrit signé peut-elle être défendue ?",
      a: "Oui. À l’égard des commerçants, les actes de commerce se prouvent par tous moyens (art. L. 110-3 du Code de commerce) : devis validés par courriel, bons de commande, factures antérieurement réglées, correspondances et commencement d’exécution permettent d’établir le contenu de l’accord.",
    },
  ],
  related: [
    {
      label: "Rupture brutale et concurrence déloyale à Paris",
      href: "/rupture-brutale-concurrence-deloyale",
    },
    { label: "Référé et procédures d’urgence à Paris", href: "/procedures-d-urgence" },
    { label: "Contentieux post-acquisition à Paris", href: "/contentieux-post-acquisition" },
    { label: "Contentieux commercial international", href: "/contentieux-international" },
  ],
  contactSubject: "Contentieux commercial et contractuel",
};

export default function Page() {
  return <ExpertisePage data={DATA} />;
}
