import type { Metadata } from "next";
import ExpertisePage, { type ExpertisePageData } from "@/components/ExpertisePage";
import { buildPageMetadata } from "@/lib/seo";

// TODO [À CONFIRMER] Contenu éditorial et réponses FAQ à relire et valider par Maître Blexmann.
const TITLE = "Avocat conflit entre associés Paris | Blexmann Avocats";
const DESCRIPTION =
  "Blocage de gouvernance, abus de majorité ou sortie d’associé à Paris : Blexmann Avocats défend vos droits sociaux. Exposez votre situation.";
const PATH = "/conflits-entre-associes";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const DATA: ExpertisePageData = {
  path: PATH,
  breadcrumbLabel: "Conflits entre associés",
  eyebrow: "Conflits entre associés et actionnaires — Paris",
  h1: "Avocat en conflits entre associés et actionnaires à Paris",
  intro: [
    "Mésentente entre fondateurs, refus d’approuver les comptes ou un financement indispensable, rétention d’information, mise à l’écart d’un associé dirigeant : lorsqu’un conflit s’installe au capital, la gouvernance se fige et l’activité opérationnelle en subit rapidement les effets.",
    "Blexmann Avocats accompagne associés majoritaires ou minoritaires, actionnaires et dirigeants dans leurs différends sociétaires à Paris, afin de débloquer la prise de décision, faire respecter les droits sociaux ou encadrer une séparation.",
  ],
  situationsTitle: "Situations fréquentes en contentieux d’associés",
  situationsText:
    "Dans les SAS, SARL et sociétés civiles ou par actions, la crise naît souvent d’une divergence stratégique, financière ou patrimoniale que les statuts n’avaient pas pleinement anticipée.",
  situationsBullets: [
    "Paralysie des organes sociaux : égalité 50/50 ou minorité de blocage empêchant l’approbation des comptes, une augmentation de capital ou un investissement structurant.",
    "Abus de majorité, de minorité ou d’égalité : décisions prises contrairement à l’intérêt social dans l’unique dessein de favoriser certains associés au détriment des autres, ou opposition injustifiée bloquant une opération essentielle à la société.",
    "Contestation d’assemblées et défaut d’information : irrégularités de convocation, atteinte au droit de communication des documents sociaux, conventions réglementées litigieuses.",
    "Sortie conflictuelle du capital : mise en œuvre d’une clause d’exclusion statutaire, application de promesses de cession (good/bad leaver) issues d’un pacte d’associés, blocage de compte courant ou désaccord sur la valorisation des titres.",
  ],
  enjeuxTitle: "Impact sur l’entreprise et analyse préalable",
  enjeuxParagraphs: [
    "Un conflit d’associés prolongé inquiète les partenaires bancaires, retarde les décisions commerciales, fragilise les équipes et dégrade la valorisation de la société. Agir dans la précipitation — convocation irrégulière, révocation vexatoire, exclusion mal motivée — offre au surplus un terrain de contestation immédiat à la partie adverse.",
    "Avant toute démarche, le cabinet clarifie l’objectif réellement poursuivi (rétablir l’équilibre de gouvernance, sécuriser le contrôle ou négocier une sortie dans des conditions maîtrisées) et audite l’architecture juridique de la société.",
  ],
  enjeuxPoints: [
    "Articulation entre les statuts et le pacte d’associés : règles de majorité, clauses d’agrément, de préemption, d’inaliénabilité, d’exclusion et de sortie forcée.",
    "Régularité formelle des convocations, ordres du jour, procès-verbaux et respect du droit d’information des associés.",
    "Situation financière liée à la sortie : méthodes de valorisation des droits sociaux, sort du compte courant d’associé, cautions personnelles et engagements de non-concurrence.",
    "Distinction entre l’intérêt propre de l’associé et l’intérêt social de la société.",
  ],
  conduiteTitle: "Approches négociées, voies judiciaires et rôle du cabinet",
  conduiteParagraphs: [
    "Lorsqu’une issue amiable préserve mieux la valeur de l’entreprise, le cabinet conduit des pourparlers confidentiels ou accompagne une médiation en vue d’un protocole de séparation complet (cession de titres, remboursement de compte courant, garanties, mainlevée de cautions, non-dénigrement).",
    "Lorsque la voie judiciaire s’impose devant le tribunal des activités économiques ou le tribunal judiciaire, le cabinet engage ou conteste les actions adaptées : communication forcée de pièces en référé, expertise de gestion (art. L. 223-37 ou L. 225-231 du Code de commerce), désignation d’un mandataire ad hoc, action en nullité de délibérations ou en dommages-intérêts, et recours à l’évaluation des droits sociaux prévue à l’article 1843-4 du Code civil.",
  ],
  faqs: [
    {
      q: "Comment caractériser un abus de majorité ou un abus de minorité ?",
      a: "L’abus de majorité suppose une décision contraire à l’intérêt social et adoptée dans l’unique dessein de favoriser les majoritaires au détriment des minoritaires (par exemple une mise en réserve systématique injustifiée accompagnée d’avantages accordés aux seuls majoritaires). L’abus de minorité suppose le refus d’un minoritaire de voter une opération essentielle à la survie ou au développement indispensable de la société, dans un but purement égoïste.",
    },
    {
      q: "Peut-on exclure un associé en cas de mésentente ?",
      a: "Un associé ne peut être contraint de céder ses titres en dehors des cas prévus par la loi ou par une clause d’exclusion valablement stipulée dans les statuts (ou d’une promesse de cession contenue dans un pacte). Même en présence d’une telle clause, le respect strict de la procédure prévue, des motifs visés et du contradictoire est contrôlé par le juge.",
    },
    {
      q: "Que devient le compte courant d’un associé en cas de conflit ?",
      a: "Sauf stipulation contraire des statuts, d’une convention de blocage ou d’un pacte d’associés, l’associé peut en principe demander à tout moment le remboursement de son compte courant créditeur, sous réserve d’éventuels délais de paiement judiciaires accordés à la société. Son traitement fait systématiquement partie des points clés d’une négociation de sortie.",
    },
    {
      q: "Comment est fixé le prix des parts ou actions en cas de désaccord ?",
      a: "Les parties examinent d’abord la formule de prix éventuellement prévue par les statuts ou le pacte d’associés. Dans les cas où la loi ou les actes renvoient à l’article 1843-4 du Code civil, un tiers estimateur indépendant est désigné d’un commun accord ou par le président du tribunal ; il est tenu d’appliquer les règles et modalités de détermination de la valeur prévues par les statuts ou les conventions liant les parties.",
    },
  ],
  related: [
    { label: "Responsabilité des dirigeants à Paris", href: "/responsabilite-des-dirigeants" },
    { label: "Contentieux post-acquisition à Paris", href: "/contentieux-post-acquisition" },
    { label: "Référé et procédures d’urgence à Paris", href: "/procedures-d-urgence" },
    { label: "Présentation de Maître Pierre Blexmann", href: "/le-cabinet" },
  ],
  contactSubject: "Conflits entre associés ou actionnaires",
};

export default function Page() {
  return <ExpertisePage data={DATA} />;
}
