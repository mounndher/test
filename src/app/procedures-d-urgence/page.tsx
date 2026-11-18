import type { Metadata } from "next";
import ExpertisePage, { type ExpertisePageData } from "@/components/ExpertisePage";
import { buildPageMetadata } from "@/lib/seo";

// TODO [À CONFIRMER] Contenu éditorial et réponses FAQ à relire et valider par Maître Blexmann.
const TITLE = "Avocat référé et urgence Paris | Blexmann Avocats";
const DESCRIPTION =
  "Référé commercial, saisie conservatoire ou requête probatoire (art. 145 CPC) à Paris : Blexmann Avocats intervient. Exposez votre situation.";
const PATH = "/procedures-d-urgence";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const DATA: ExpertisePageData = {
  path: PATH,
  breadcrumbLabel: "Procédures d’urgence",
  eyebrow: "Référé et procédures d’urgence — Paris",
  h1: "Avocat en référé et procédures d’urgence à Paris",
  intro: [
    "Impayé manifeste pesant sur la trésorerie, pratique illicite en cours, risque de disparition de preuves informatiques ou comptables, crainte d’insolvabilité organisée : certaines situations exigent une mesure judiciaire provisoire ou conservatoire sans attendre l’issue d’un procès au fond.",
    "Blexmann Avocats prépare et plaide les procédures de référé et sur requête — en demande comme en défense — devant le président du tribunal des activités économiques de Paris et du tribunal judiciaire de Paris.",
  ],
  situationsTitle: "Situations justifiant une procédure rapide ou conservatoire",
  situationsText:
    "Le droit processuel français offre plusieurs voies distinctes selon que le débat doit être contradictoire (référé, assignation à bref délai) ou requiert un effet de surprise légitime (ordonnance sur requête).",
  situationsBullets: [
    "Référé-provision et référé-injonction (art. 873, al. 2 et 835, al. 2 CPC) : obtention d’une provision sur une créance non sérieusement contestable ou exécution d’une obligation évidente (livraison, restitution, communication de documents sociaux).",
    "Prévention d’un dommage imminent et cessation d’un trouble manifestement illicite (art. 873, al. 1er CPC) : arrêt d’un dénigrement, d’une violation manifeste de clause de non-concurrence ou d’un blocage abusif.",
    "Mesures d’instruction in futurum (art. 145 CPC) : désignation d’un technicien pour une expertise judiciaire ou d’un commissaire de justice sur requête afin de conserver ou d’établir, avant tout procès, la preuve de faits dont pourrait dépendre la solution d’un litige.",
    "Mesures conservatoires (art. L. 511-1 et s. du Code des procédures civiles d’exécution) : saisie conservatoire de créances bancaires ou sûreté judiciaire lorsque la créance paraît fondée en son principe et que des circonstances en menacent le recouvrement.",
  ],
  enjeuxTitle: "Conditions strictes de recevabilité et risques à anticiper",
  enjeuxParagraphs: [
    "Le juge des référés est le juge de l’évidence et du provisoire : une demande insuffisamment étayée se heurte au rejet pour existence d’une contestation sérieuse. De même, une ordonnance obtenue sur requête ou une saisie conservatoire pratiquée sans justification rigoureuse s’expose à une procédure de rétractation ou de mainlevée.",
    "À l’inverse, pour l’entreprise qui reçoit une assignation en référé, subit un constat sur requête ou découvre une saisie conservatoire sur ses comptes, la réactivité procédurale est essentielle pour protéger son exploitation et le secret des affaires.",
  ],
  enjeuxPoints: [
    "Choix du fondement exact : urgence (art. 872 CPC), dommage imminent ou trouble manifestement illicite (art. 873, al. 1er), obligation non sérieusement contestable (art. 873, al. 2) ou motif légitime probatoire (art. 145 CPC).",
    "Pour les requêtes non contradictoires : démonstration précise des circonstances justifiant de déroger au principe du contradictoire et proportionnalité du périmètre de la mesure (séquestre provisoire au titre du secret des affaires).",
    "Pour les saisies conservatoires : respect strict des délais légaux de dénonciation au débiteur et d’introduction de la procédure visant à obtenir un titre exécutoire, à peine de caducité.",
    "Articulation cohérente entre la mesure provisoire et la stratégie ultérieure au fond ou transactionnelle.",
  ],
  conduiteTitle: "Intervention du cabinet en demande et en défense",
  conduiteParagraphs: [
    "En demande, le cabinet vérifie que les conditions légales de la voie rapide choisie sont effectivement réunies, constitue un dossier probatoire lisible, saisit le juge compétent et coordonne l’exécution de l’ordonnance avec le commissaire de justice.",
    "En défense, le cabinet met en évidence les contestations sérieuses faisant obstacle au référé, sollicite la rétractation d’une ordonnance sur requête disproportionnée, demande la mainlevée d’une saisie conservatoire injustifiée ou veille à la protection des pièces couvertes par le secret des affaires.",
  ],
  faqs: [
    {
      q: "Une ordonnance de référé est-elle immédiatement exécutoire ?",
      a: "Oui, l’ordonnance de référé bénéficie de plein droit de l’exécution provisoire (art. 514 CPC) : elle peut être mise à exécution dès sa signification, même en cas d’appel, sauf aménagement particulier prévu par la loi. Elle n’a en revanche pas autorité de la chose jugée au principal, ce qui signifie que le juge du fond reste libre de son appréciation si le litige se poursuit.",
    },
    {
      q: "Dans quel cas demander une mesure d’instruction de l’article 145 du Code de procédure civile ?",
      a: "Lorsqu’il existe un motif légitime de conserver ou d’établir, avant l’introduction de toute instance au fond, la preuve de faits dont pourrait dépendre l’issue d’un litige (désordres techniques, inexécution informatique, suspicion de concurrence déloyale). Elle est demandée en référé (expertise contradictoire) ou, uniquement si un risque avéré de déperdition des preuves justifie de ne pas avertir l’adversaire, sur requête.",
    },
    {
      q: "Que faire si les comptes de l’entreprise font l’objet d’une saisie conservatoire ?",
      a: "Il faut immédiatement examiner l’ordonnance d’autorisation, le procès-verbal de saisie et le respect des formalités et délais légaux par le créancier. Si la créance ne paraît pas fondée en son principe ou s’il n’existe aucune menace réelle sur son recouvrement, le débiteur peut saisir le juge de l’exécution d’une demande de mainlevée ou proposer une garantie de substitution.",
    },
    {
      q: "Peut-on contester un constat réalisé au siège sur ordonnance sur requête ?",
      a: "Oui, par la voie du référé-rétractation devant le juge qui a rendu l’ordonnance. Le contrôle porte notamment sur le motif légitime, la justification concrète de la dérogation au contradictoire et le caractère circonscrit de la mission. Les pièces saisies peuvent par ailleurs être placées sous séquestre provisoire pour assurer la protection du secret des affaires (art. R. 153-1 et s. C. com.).",
    },
  ],
  related: [
    { label: "Contentieux commercial et contractuel à Paris", href: "/contentieux-commercial" },
    {
      label: "Rupture brutale et concurrence déloyale à Paris",
      href: "/rupture-brutale-concurrence-deloyale",
    },
    { label: "Conflits entre associés et actionnaires à Paris", href: "/conflits-entre-associes" },
    { label: "Responsabilité des dirigeants à Paris", href: "/responsabilite-des-dirigeants" },
  ],
  contactSubject: "Procédure d'urgence",
};

export default function Page() {
  return <ExpertisePage data={DATA} />;
}
