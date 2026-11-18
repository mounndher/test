import type { Metadata } from "next";
import AuditComment from "@/components/AuditComment";
import LegalArticle from "@/components/LegalArticle";
import { SITE } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";

const TITLE = "Politique de confidentialité | Blexmann Avocats";
const DESCRIPTION =
  "Politique de confidentialité de Blexmann Avocats à Paris 16e : prise de contact par messagerie électronique, finalités RGPD et exercice des droits.";
const PATH = "/politique-de-confidentialite";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalArticle title="Politique de confidentialité" updated="Avril 2026">
      <h2>1. Responsable du traitement</h2>
      {/* TODO: Verify with lawyer: Phone and SIREN */}
      <AuditComment text="TODO: Verify with lawyer: Phone and SIREN" />
      <p>
        Le responsable du traitement des données personnelles reçues dans le cadre d&rsquo;une prise
        de contact est&nbsp;:
        <br />
        <strong>{SITE.name}</strong> (Maître Pierre {SITE.wordmark}, exercice individuel),{" "}
        {SITE.address.street}, {SITE.address.postalCode} {SITE.address.locality} — {SITE.siren}
        <br />
        Contact&nbsp;:{" "}
        <a href={`mailto:${SITE.email}`} className="link-underline">
          {SITE.email}
        </a>{" "}
        —{" "}
        <a href={SITE.phoneHref} className="link-underline">
          {SITE.phone}
        </a>
      </p>

      <h2>2. Modalités de prise de contact depuis le Site</h2>
      <p>
        Le formulaire de contact proposé sur le Site transmet la demande saisie par le visiteur,
        par courrier électronique, à la messagerie professionnelle du cabinet. Aucune saisie
        n&rsquo;est enregistrée dans une base de données du Site. L&rsquo;acheminement du message
        est assuré par un prestataire technique d&rsquo;envoi de courriels (Resend), qui agit pour
        le compte du cabinet. Afin de prévenir les envois abusifs, un dispositif technique limite
        le nombre d&rsquo;envois successifs depuis une même adresse IP&nbsp;; cette information est
        conservée en mémoire pendant quelques minutes seulement et n&rsquo;est pas enregistrée de
        manière durable.
      </p>
      {/* TODO: Verify with lawyer: wording on the email delivery provider (Resend), possible data transfers outside the EU and the processing agreement */}
      <AuditComment text="TODO: Verify with lawyer: wording on the email delivery provider (Resend), possible data transfers outside the EU and the processing agreement" />
      <p>
        Le visiteur reste libre de ne pas utiliser le formulaire et d&rsquo;écrire directement au
        cabinet par courriel ou par téléphone, aux coordonnées indiquées ci-dessus.
      </p>
      <p>
        Comme pour toute consultation de site internet, l&rsquo;hébergeur traite uniquement les
        journaux techniques de connexion strictement nécessaires au bon affichage et à la sécurité
        du service.
      </p>

      <h2>3. Données reçues en cas d&rsquo;envoi d&rsquo;un courriel</h2>
      <p>
        Lorsque vous adressez un courriel à {SITE.name}, le cabinet reçoit exclusivement les
        informations que vous y mentionnez&nbsp;: nom et prénom, adresse électronique, numéro de
        téléphone et dénomination sociale lorsqu&rsquo;ils sont renseignés, nature du dossier,
        modalité de rendez-vous souhaitée et exposé factuel de la situation.
      </p>
      <p>
        Aucune donnée particulière au sens de l&rsquo;article&nbsp;9 du Règlement (UE) 2016/679
        (RGPD) n&rsquo;est sollicitée à ce stade. Il est recommandé de ne joindre aucune pièce
        sensible lors du premier courriel&nbsp;; les modalités de communication de pièces seront
        convenues directement avec le cabinet lors du premier échange.
      </p>

      <h2>4. Finalités, bases légales et secret professionnel</h2>
      <p>
        Les informations reçues par courrier électronique ou par téléphone sont traitées par le
        cabinet aux seules fins suivantes&nbsp;:
      </p>
      <ul>
        <li>
          <strong>
            Prise de connaissance de la demande, vérifications déontologiques préalables (notamment
            d&rsquo;absence de conflit d&rsquo;intérêts) et organisation d&rsquo;un premier
            rendez-vous
          </strong>
          &nbsp;: exécution de mesures précontractuelles prises à la demande de la personne
          concernée (article&nbsp;6, §&nbsp;1, b du RGPD) et intérêt légitime du cabinet à répondre
          aux demandes reçues dans le respect des règles de la profession (article&nbsp;6, §&nbsp;1,
          f du RGPD).
        </li>
      </ul>
      <p>
        {SITE.confidentialityNotice} L&rsquo;envoi d&rsquo;une demande ne crée pas, en soi, de
        relation avocat-client&nbsp;: celle-ci débute uniquement après l&rsquo;acceptation expresse
        du dossier par le cabinet, après vérification notamment de l&rsquo;absence de conflit
        d&rsquo;intérêts, conformément à la loi du 31&nbsp;décembre&nbsp;1971 (art.&nbsp;66-5) et au
        Règlement intérieur national (RIN).
      </p>

      <h2>5. Destinataires</h2>
      <p>
        Les messages adressés à {SITE.email} sont destinés exclusivement au cabinet pour
        l&rsquo;examen de la demande. Les données ne font l&rsquo;objet d&rsquo;aucune cession ni
        exploitation commerciale et transitent uniquement par les services de messagerie
        électronique nécessaires à leur acheminement.
      </p>

      <h2>6. Durée de conservation</h2>
      <p>
        Lorsqu&rsquo;une prise de contact ne donne pas lieu à l&rsquo;ouverture d&rsquo;un dossier,
        les échanges sont conservés pendant la durée strictement nécessaire au traitement de la
        demande et aux vérifications déontologiques utiles, puis supprimés. En cas
        d&rsquo;acceptation d&rsquo;un dossier, les données sont conservées pendant la durée de la
        mission puis archivées selon les délais de prescription applicables à la profession
        d&rsquo;avocat.
      </p>

      <h2>7. Exercice de vos droits</h2>
      <p>
        Dans les conditions prévues par le RGPD et la loi «&nbsp;Informatique et Libertés&nbsp;»,
        vous disposez d&rsquo;un droit d&rsquo;accès, de rectification, d&rsquo;effacement, de
        limitation du traitement, d&rsquo;opposition ainsi que, le cas échéant, d&rsquo;un droit à
        la portabilité de vos données, et de la faculté de définir des directives relatives au sort
        de vos données après votre décès.
      </p>
      <p>
        Ces droits s&rsquo;exercent par courriel à{" "}
        <a href={`mailto:${SITE.email}`} className="link-underline">
          {SITE.email}
        </a>{" "}
        ou par courrier postal adressé à {SITE.name}, {SITE.address.street},{" "}
        {SITE.address.postalCode} {SITE.address.locality}. Un justificatif d&rsquo;identité peut
        être sollicité en cas de doute raisonnable sur l&rsquo;identité du demandeur.
      </p>
      <p>
        Vous disposez également de la faculté d&rsquo;introduire une réclamation auprès de la
        Commission nationale de l&rsquo;informatique et des libertés (CNIL) — 3&nbsp;place de
        Fontenoy, TSA&nbsp;80715, 75334 Paris Cedex&nbsp;07 —{" "}
        <a
          href="https://www.cnil.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          www.cnil.fr
        </a>
        .
      </p>

      <h2>8. Cookies et mesure d&rsquo;audience</h2>
      <p>
        Le Site ne dépose aucun cookie publicitaire, aucun traceur marketing et aucun outil tiers de
        mesure d&rsquo;audience. Les polices de caractères et les visuels sont servis directement
        par le Site&nbsp;; la consultation des liens externes (tels que les publications parues sur
        Village de la Justice) relève de la politique propre à chaque site tiers.
      </p>

      <h2>9. Sécurité des échanges</h2>
      <p>
        Le cabinet met en œuvre des mesures organisationnelles et techniques appropriées pour
        protéger sa messagerie professionnelle. Pour la transmission ultérieure de pièces sensibles
        ou volumineuses, les modalités adaptées sont convenues directement avec le cabinet à
        l&rsquo;issue du premier contact.
      </p>
    </LegalArticle>
  );
}
