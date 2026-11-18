import type { Metadata } from "next";
import ExpertisePage, { type ExpertisePageData } from "@/components/ExpertisePage";
import { buildPageMetadata } from "@/lib/seo";

// TODO [À CONFIRMER] Contenu éditorial et réponses FAQ à relire et valider par Maître Blexmann.
const TITLE = "Responsabilité des dirigeants Paris | Blexmann Avocats";
const DESCRIPTION =
  "Faute de gestion, révocation ou mise en cause personnelle à Paris : Blexmann Avocats assure la défense des dirigeants. Exposez votre situation.";
const PATH = "/responsabilite-des-dirigeants";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const DATA: ExpertisePageData = {
  path: PATH,
  breadcrumbLabel: "Responsabilité des dirigeants",
  eyebrow: "Responsabilité des dirigeants — Paris",
  h1: "Avocat en responsabilité des dirigeants à Paris",
  intro: [
    "Action en responsabilité pour faute de gestion, contestation d’une révocation de mandat social, mise en cause par un tiers ou par les organes d’une procédure collective : ces contentieux touchent directement le patrimoine personnel et la réputation professionnelle du mandataire social.",
    "Blexmann Avocats conseille et défend les dirigeants de droit ou de fait mis en cause — ainsi que les sociétés et associés confrontés aux manquements d’un mandataire — devant les juridictions parisiennes, dans le respect du secret professionnel.",
  ],
  situationsTitle: "Situations de mise en cause d’un dirigeant",
  situationsText:
    "La responsabilité d’un gérant, président, directeur général ou administrateur obéit à des régimes distincts selon l’identité du demandeur et le contexte financier de la société.",
  situationsBullets: [
    "Responsabilité envers la société et les associés (art. L. 223-22 et L. 225-251 du Code de commerce) : infraction aux dispositions légales, dépassement des pouvoirs statutaires, faute de gestion alléguée, action sociale ut singuli exercée par un associé.",
    "Responsabilité envers les tiers : recherche d’une faute intentionnelle d’une particulière gravité et incompatible avec l’exercice normal des fonctions sociales (faute séparable des fonctions).",
    "Contentieux liés à une procédure collective : action en responsabilité pour insuffisance d’actif en cas de liquidation judiciaire (art. L. 651-2 C. com., étant rappelé que la simple négligence est écartée par la loi) et mesures professionnelles associées.",
    "Révocation du mandataire social : contestation d’une révocation intervenue sans juste motif lorsque celui-ci est requis, ou dans des circonstances brutales et vexatoires portant atteinte au principe du contradictoire.",
  ],
  enjeuxTitle: "Enjeux patrimoniaux et analyse de la défense",
  enjeuxParagraphs: [
    "Une demande dirigée contre un dirigeant à titre personnel crée une exposition patrimoniale distincte de celle de la personne morale et s’accompagne fréquemment de mesures de pression (révocation simultanée, blocage de rémunération, contestation d’engagements de caution). Une réaction tardive ou non documentée fragilise durablement la position du mandataire.",
    "Le cabinet reconstitue le contexte exact dans lequel les décisions critiquées ont été prises : une décision de gestion s’apprécie au regard des informations disponibles à sa date, et non à la seule lumière de résultats ultérieurs défavorables.",
  ],
  enjeuxPoints: [
    "Qualification précise du fondement invoqué (faute de gestion, violation statutaire, faute séparable, insuffisance d’actif) et vérification de la prescription triennale applicable.",
    "Documentation de la gouvernance : procès-verbaux, rapports de gestion, délégations de pouvoirs, autorisations préalables des associés et alertes comptables.",
    "Examen du lien de causalité et du caractère personnel ou social du préjudice allégué, ainsi que des éventuelles polices d’assurance responsabilité des dirigeants (RCMS / D&O).",
    "Vérification systématique de l’absence de conflit d’intérêts lorsque la société et le dirigeant sont assignés dans la même instance.",
  ],
  conduiteTitle: "Défense procédurale et intervention du cabinet",
  conduiteParagraphs: [
    "Dès la réception d’une mise en demeure, d’une convocation en vue d’une révocation ou d’une assignation, le cabinet prépare l’argumentation en fait et en droit, rassemble les justificatifs comptables et sociaux, et assure la représentation devant le tribunal des activités économiques, le tribunal judiciaire ou la cour d’appel.",
    "Lorsqu’une sortie négociée du mandat social ou une transaction encadrée permet d’éteindre durablement le différend, le cabinet en négocie et sécurise la rédaction afin de protéger les intérêts financiers et professionnels du client.",
  ],
  faqs: [
    {
      q: "Un mauvais résultat financier suffit-il à engager la responsabilité du dirigeant ?",
      a: "Non, pas à lui seul. Le juge distingue l’aléa normal de la vie des affaires de la faute de gestion caractérisée (acte contraire à l’intérêt social, imprudence grave, poursuite abusive d’une exploitation déficitaire, violation des statuts ou de la loi). En matière d’insuffisance d’actif (art. L. 651-2 C. com.), la loi exclut en outre expressément la simple négligence.",
    },
    {
      q: "Un cocontractant de la société peut-il agir directement contre le dirigeant ?",
      a: "En principe, la société répond seule des fautes commises par son dirigeant dans l’exercice de ses fonctions. La responsabilité personnelle du dirigeant envers un tiers suppose la démonstration d’une faute séparable de ses fonctions, c’est-à-dire une faute intentionnelle d’une particulière gravité incompatible avec l’exercice normal du mandat social.",
    },
    {
      q: "La révocation d’un président de SAS peut-elle donner lieu à indemnisation ?",
      a: "Même lorsque les statuts prévoient une révocation libre (ad nutum), celle-ci ne doit pas intervenir dans des conditions brutales, vexatoires ou sans que le dirigeant ait été mis en mesure de présenter ses observations préalablement à la décision. Par ailleurs, les statuts ou un acte extrastatutaire peuvent prévoir l’exigence d’un juste motif ou une indemnité conventionnelle.",
    },
    {
      q: "La société et son dirigeant peuvent-ils avoir le même avocat ?",
      a: "Uniquement s’il n’existe aucun conflit d’intérêts, même potentiel, entre la personne morale et le mandataire social. Dès lors que les intérêts divergent — par exemple en cas d’action sociale ou de procédure collective — des conseils distincts sont impératifs en application des règles déontologiques.",
    },
  ],
  related: [
    { label: "Conflits entre associés et actionnaires à Paris", href: "/conflits-entre-associes" },
    { label: "Contentieux post-acquisition à Paris", href: "/contentieux-post-acquisition" },
    { label: "Référé et procédures d’urgence à Paris", href: "/procedures-d-urgence" },
    { label: "Présentation de Maître Pierre Blexmann", href: "/le-cabinet" },
  ],
  contactSubject: "Responsabilité des dirigeants",
};

export default function Page() {
  return <ExpertisePage data={DATA} />;
}
