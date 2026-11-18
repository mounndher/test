import type { Metadata } from "next";
import Link from "next/link";
import AuditComment from "@/components/AuditComment";
import LegalArticle from "@/components/LegalArticle";
import { SITE } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";

const TITLE = "Mentions légales | Blexmann Avocats";
const DESCRIPTION =
  "Mentions légales de Blexmann Avocats, avocat en contentieux des affaires inscrit au Barreau de Paris, 53 avenue Victor Hugo, 75116 Paris.";
const PATH = "/mentions-legales";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

export default function MentionsLegalesPage() {
  return (
    <LegalArticle title="Mentions légales" updated="Avril 2026">
      <h2>1. Éditeur du site</h2>
      {/* TODO: Verify with lawyer: Phone, Toque number, SIREN, Founding year 2013 */}
      <AuditComment text="TODO: Verify with lawyer: Phone, Toque number, SIREN, Founding year 2013" />
      <p>Le présent site internet (le «&nbsp;Site&nbsp;») est édité par&nbsp;:</p>
      <p>
        <strong>{SITE.name}</strong>
        <br />
        Maître Pierre {SITE.wordmark}, avocat inscrit au {SITE.barreau} (Toque {SITE.toque})
        <br />
        Forme d&rsquo;exercice&nbsp;: exercice individuel
        <br />
        Adresse professionnelle&nbsp;: {SITE.address.street}, {SITE.address.postalCode}{" "}
        {SITE.address.locality}
        <br />
        Téléphone&nbsp;:{" "}
        <a href={SITE.phoneHref} className="link-underline">
          {SITE.phone}
        </a>
        <br />
        Adresse électronique&nbsp;:{" "}
        <a href={`mailto:${SITE.email}`} className="link-underline">
          {SITE.email}
        </a>
        <br />
        {SITE.siren}
        <br />
        Directeur de la publication&nbsp;: Maître Pierre {SITE.wordmark}
      </p>

      <h2>2. Statut professionnel</h2>
      <p>
        Le cabinet exerce la profession d&rsquo;avocat à titre individuel, conformément aux
        dispositions légales et réglementaires applicables, notamment&nbsp;:
      </p>
      <ul>
        <li>
          la loi n°&nbsp;71-1130 du 31&nbsp;décembre&nbsp;1971 portant réforme de certaines
          professions judiciaires et juridiques&nbsp;;
        </li>
        <li>
          le décret n°&nbsp;91-1197 du 27&nbsp;novembre&nbsp;1991 organisant la profession
          d&rsquo;avocat&nbsp;;
        </li>
        <li>le Règlement intérieur national de la profession d&rsquo;avocat (RIN)&nbsp;;</li>
        <li>les règles déontologiques applicables au {SITE.barreau}.</li>
      </ul>
      <p>
        <strong>Ordre professionnel de rattachement</strong>
        <br />
        Ordre des avocats au Barreau de Paris
        <br />
        4 boulevard du Palais, 75001 Paris
        <br />
        Tél.&nbsp;: 01 80 27 19 20 —{" "}
        <a
          href="https://www.avocatparis.org"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          www.avocatparis.org
        </a>
      </p>
      <p>
        <strong>Titre professionnel</strong>&nbsp;: Avocat, titre délivré en France.
      </p>

      {/* TODO: Verify with lawyer: Final production hosting provider (Vercel Inc. or OVH) */}
      <h2>3. Hébergement du site</h2>
      <p>
        Le Site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723,
        États-Unis —{" "}
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          vercel.com
        </a>
        .
      </p>

      <h2>4. Objet et contenu du site</h2>
      <p>
        Le Site a pour objet de présenter {SITE.name} et ses domaines d&rsquo;intervention en
        contentieux des affaires. Les informations qui y figurent sont fournies à titre purement
        informatif et général&nbsp;; elles ne constituent ni une consultation juridique, ni un
        conseil personnalisé, ni l&rsquo;établissement d&rsquo;une relation avocat-client.
      </p>
      <p>
        La consultation du Site ne saurait se substituer à l&rsquo;examen individualisé d&rsquo;une
        situation particulière par un avocat.
      </p>

      <h2>5. Absence de relation avocat-client automatique</h2>
      <p>
        La consultation du Site, la préparation d&rsquo;une demande depuis la rubrique de contact ou
        l&rsquo;envoi d&rsquo;un courrier électronique à {SITE.name} ne crée pas, en soi, de
        relation avocat-client. Une telle relation ne débute qu&rsquo;après l&rsquo;acceptation
        expresse du dossier par le cabinet, précédée notamment de la vérification de l&rsquo;absence
        de conflit d&rsquo;intérêts. Il est recommandé de ne transmettre aucune pièce sensible lors
        d&rsquo;un premier message.
      </p>

      <h2>6. Responsabilité</h2>
      <p>
        Le cabinet veille au soin apporté aux informations publiées sur le Site, sans pouvoir en
        assurer l&rsquo;exhaustivité ni l&rsquo;actualité permanente au regard des évolutions
        législatives et jurisprudentielles. L&rsquo;utilisateur demeure seul responsable de
        l&rsquo;usage réservé à ces informations générales.
      </p>

      <h2>7. Liens hypertextes</h2>
      <p>
        Le Site comporte des liens vers des sites tiers (notamment des publications externes et des
        sites institutionnels), fournis à titre documentaire. Le cabinet n&rsquo;exerce aucun
        contrôle sur ces ressources externes et décline toute responsabilité quant à leur contenu ou
        à leurs pratiques en matière de données personnelles.
      </p>

      <h2>8. Propriété intellectuelle</h2>
      <p>
        L&rsquo;ensemble des éléments composant le Site — textes, structure éditoriale, éléments
        graphiques et visuels — est protégé par le Code de la propriété intellectuelle. Toute
        reproduction, représentation, adaptation ou exploitation, totale ou partielle, sans
        l&rsquo;autorisation écrite préalable du cabinet, est interdite.
      </p>

      <h2>9. Données personnelles</h2>
      <p>
        Les modalités relatives aux données personnelles dans le cadre d&rsquo;une prise de contact
        avec le cabinet sont présentées dans la{" "}
        <Link href="/politique-de-confidentialite" className="link-underline">
          politique de confidentialité
        </Link>
        .
      </p>

      <h2>10. Honoraires</h2>
      <p>
        Les modalités d&rsquo;honoraires sont présentées avant toute intervention et font
        l&rsquo;objet d&rsquo;une convention d&rsquo;honoraires écrite conformément aux règles de la
        profession d&rsquo;avocat.
      </p>

      <h2>11. Cookies</h2>
      <p>
        Le Site ne dépose aucun cookie publicitaire ni traceur de mesure d&rsquo;audience soumis à
        consentement. Seuls les éléments techniques strictement nécessaires à l&rsquo;affichage du
        Site peuvent intervenir.
      </p>

      <h2>12. Médiation de la consommation</h2>
      <p>
        Conformément aux articles L.&nbsp;612-1 et suivants du Code de la consommation, tout client
        ayant la qualité de consommateur a la possibilité, en cas de litige, de recourir
        gratuitement au médiateur de la consommation de la profession d&rsquo;avocat&nbsp;: Conseil
        national des barreaux (CNB), 180&nbsp;boulevard Haussmann, 75008 Paris —{" "}
        <a
          href="https://mediateur-consommation-avocat.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          mediateur-consommation-avocat.fr
        </a>
        .
      </p>

      <h2>13. Droit applicable</h2>
      <p>
        Le Site est soumis au droit français. Tout litige relatif à son utilisation relève de la
        compétence des juridictions françaises.
      </p>
    </LegalArticle>
  );
}
