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
    <LegalArticle title="Politique de confidentialité" updated="Novembre 2026">
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
      <h3>2.1. Formulaire de contact — envoi via Resend</h3>
      <p>
        Le formulaire de contact proposé sur le Site transmet la demande saisie par le visiteur
        à la messagerie professionnelle du cabinet. Aucune saisie n&rsquo;est enregistrée dans une
        base de données du Site. L&rsquo;acheminement du message est assuré par un prestataire
        technique d&rsquo;envoi d&rsquo;e-mails (Resend), qui agit pour le compte du cabinet.
      </p>
      <p>
        Afin de prévenir les envois abusifs, un dispositif technique limite le nombre
        d&rsquo;envois successifs depuis une même adresse IP&nbsp;; cette information est conservée
        en mémoire pendant quelques minutes seulement et n&rsquo;est pas enregistrée de manière
        durable.
      </p>
      {/* TODO: Verify with lawyer: wording on the email delivery provider (Resend), possible data transfers outside the EU and the processing agreement */}
      <AuditComment text="TODO: Verify with lawyer: wording on the email delivery provider (Resend), possible data transfers outside the EU and the processing agreement" />

      <h3>2.2. Réservation en ligne — module Cal.com</h3>
      <p>
        La prise de rendez-vous en ligne est assurée par le service tiers Cal.com, qui traite les
        informations saisies lors de la réservation pour le compte du cabinet. Le module
        d&rsquo;ouverture de la réservation peut charger des contenus techniques tiers, uniquement
        lorsque le visiteur utilise le bouton de réservation.
      </p>
      <p>
        Les données de réservation font l&rsquo;objet d&rsquo;un traitement distinct décrit au
        point&nbsp;3 bis ci-dessous. Pour les informations relatives au service, le visiteur peut
        consulter la{" "}
        <a
          href="https://cal.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          politique de confidentialité de Cal.com
        </a>
        .
      </p>
      {/* TODO: Verify with lawyer: Cal.com entity, possible data transfers outside the EU and the processing agreement */}
      <AuditComment text="TODO: Verify with lawyer: Cal.com entity, possible data transfers outside the EU and the processing agreement" />
      <p>
        Le visiteur reste libre de ne pas utiliser le formulaire ou le module de réservation et
        d&rsquo;écrire directement au cabinet par e-mail ou par téléphone, aux coordonnées indiquées
        ci-dessus.
      </p>
      <p>
        Comme pour toute consultation de site internet, l&rsquo;hébergeur traite uniquement les
        journaux techniques de connexion strictement nécessaires au bon affichage et à la sécurité
        du service.
      </p>

      <h2>3. Données reçues lors de la prise de contact</h2>
      <p>
        Lorsque vous prenez contact avec {SITE.name}, le cabinet reçoit les informations que vous
        lui transmettez&nbsp;: nom et prénom, adresse électronique, numéro de téléphone et
        dénomination sociale lorsqu&rsquo;ils sont renseignés, nature du dossier, modalité de
        rendez-vous souhaitée et exposé factuel de la situation.
      </p>
      <p>
        Aucune donnée particulière au sens de l&rsquo;article&nbsp;9 du Règlement (UE) 2016/679
        (RGPD) n&rsquo;est sollicitée à ce stade. Il est recommandé de ne communiquer aucune pièce
        sensible lors du premier contact&nbsp;; les modalités de communication de pièces seront
        convenues directement avec le cabinet lors du premier échange.
      </p>

      {/* TODO [À CONFIRMER] : région d'hébergement des données de réservation Cal.com et accord de sous-traitance (DPA) à confirmer avec l'avocat. */}
      <h2>3 bis. Données de réservation en ligne (Cal.com)</h2>
      <p>
        Lorsqu&rsquo;un visiteur réserve un premier rendez-vous via le module Cal.com, les
        informations nécessaires à cette réservation sont traitées par Cal.com pour le compte du
        cabinet. Ce traitement est distinct de celui du formulaire de contact.
      </p>
      <h3>Données concernées</h3>
      <ul>
        <li>Nom et prénom renseignés lors de la réservation&nbsp;;</li>
        <li>Adresse électronique du visiteur&nbsp;;</li>
        <li>Créneau de rendez-vous choisi&nbsp;;</li>
        <li>Informations saisies par le visiteur dans le module de réservation.</li>
      </ul>
      <h3>Finalités et bases légales</h3>
      <p>
        Ces informations sont utilisées pour organiser le premier rendez-vous et permettre au
        cabinet de procéder à la vérification de l&rsquo;absence de conflit d&rsquo;intérêts. Selon
        les opérations de traitement concernées, les bases légales invoquées sont les suivantes&nbsp;:
      </p>
      <ul>
        <li>
          <strong>Mesures précontractuelles</strong>&nbsp;: exécution de mesures précontractuelles
          prises à la demande de la personne concernée, sur le fondement de l&rsquo;article&nbsp;6,
          §&nbsp;1, b du RGPD.
        </li>
        <li>
          <strong>Intérêt légitime</strong>&nbsp;: intérêt légitime du cabinet à organiser les
          rendez-vous et à effectuer les vérifications déontologiques utiles, sur le fondement de
          l&rsquo;article&nbsp;6, §&nbsp;1, f du RGPD.
        </li>
      </ul>
      <h3>Conservation des données de réservation</h3>
      <p>
        Si aucun dossier n&rsquo;est ouvert à la suite de la réservation, les informations de
        réservation sont supprimées. [Délai précis de suppression et modalités de mise en œuvre à
        confirmer.]
      </p>
      <p>
        Si un dossier est ouvert, les informations nécessaires à la mission sont conservées
        selon les durées et modalités applicables au cabinet. [Durée de conservation, archivage et
        délais de prescription applicables à confirmer.]
      </p>
      <h3>Hébergement et garanties de transfert</h3>
      <p>
        Les modalités d&rsquo;hébergement des données de réservation et les garanties encadrant
        d&rsquo;éventuels transferts hors de l&rsquo;Espace économique européen doivent être
        précisées en fonction du service effectivement configuré.
      </p>
      <p>
        [Localisation de l&rsquo;hébergement des données de réservation à confirmer&nbsp;;
        pays concernés par d’éventuels transferts à confirmer&nbsp;; garanties et accords de
        sous-traitance à confirmer.]
      </p>
      {/* TODO [À CONFIRMER] : Cal.com — région d'hébergement, transferts hors UE, durées de conservation et accord de sous-traitance (DPA). */}
      <AuditComment text="TODO [À CONFIRMER] : Cal.com — région d'hébergement, transferts hors UE, durées de conservation et accord de sous-traitance (DPA)." />

      <h2>4. Finalités, bases légales et secret professionnel</h2>
      <p>
        Les informations reçues via le formulaire de contact ou par téléphone sont traitées par le
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
        Les demandes adressées à {SITE.email} sont destinées au cabinet pour l&rsquo;examen de la
        demande. Les réservations effectuées via Cal.com sont traitées par ce prestataire pour le
        compte du cabinet. Les données ne font l&rsquo;objet d&rsquo;aucune cession ni exploitation
        commerciale par le cabinet.
      </p>
      <p>
        Selon les opérations concernées, les prestataires techniques suivants peuvent intervenir&nbsp;:
      </p>
      <ul>
        <li>
          <strong>Cal.com</strong>&nbsp;: réservation des rendez-vous en ligne.
        </li>
        <li>
          <strong>Resend</strong>&nbsp;: acheminement des demandes du formulaire de contact vers la
          messagerie professionnelle du cabinet.
        </li>
        <li>
          <strong>Vercel</strong>&nbsp;: hébergement du Site et traitement des journaux techniques
          nécessaires à son affichage et à sa sécurité.
        </li>
        <li>
          [Outil de visioconférence, le cas échéant&nbsp;: nom du prestataire et modalités de
          traitement à confirmer.]
        </li>
      </ul>
      <p>
        [Localisation des traitements, pays concernés par d’éventuels transferts et garanties
        applicables à confirmer pour chaque prestataire.]
      </p>
      {/* TODO: Verify with lawyer: Vercel hosting region/log retention and video conferencing provider, if used */}
      <AuditComment text="TODO: Verify with lawyer: Vercel hosting region/log retention and video conferencing provider, if used" />

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
        Ces droits s&rsquo;exercent par e-mail à{" "}
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
        Le Site n&rsquo;intègre aucun cookie publicitaire ni traceur marketing. Le module de
        réservation Cal.com peut charger des contenus techniques tiers (scripts ou autres
        ressources), susceptibles d&rsquo;entraîner le dépôt de cookies ou l&rsquo;établissement de
        connexions vers des services tiers.
      </p>
      <p>
        [Nature, finalités et durées des cookies ou autres traceurs réellement utilisés par le
        module Cal.com à confirmer après vérification dans le navigateur, ainsi que les mesures de
        consentement requises.]
      </p>
      {/* TODO: Vérifier dans le navigateur les cookies et contenus tiers réellement chargés par Cal.com, avant et après ouverture de la modale (finalités, durées et consentement requis). */}
      <p>
        Les polices de caractères et les visuels sont servis directement par le Site&nbsp;; la
        consultation des liens externes (tels que les publications parues sur Village de la
        Justice) relève de la politique propre à chaque site tiers.
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
