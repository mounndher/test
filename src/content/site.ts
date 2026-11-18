/**
 * Single source of truth for all editorial content and client data — Blexmann Avocats.
 *
 * Unified editorial voice:
 * - Strict institutional third-person singular ("Le cabinet" / "Blexmann Avocats").
 * - No mixing of "nous", "je", and "il".
 *
 * Homepage copy is deliberately short (summary + link to the detailed page).
 * The full detailed text lives on the 7 expertise pages and on /le-cabinet.
 *
 * TODO: Verify with lawyer: Phone, Toque number, SIREN, Founding year 2013, the mailbox
 * pblexmann@blexmann-avocats.fr (domain aligned with the canonical domain), and replace
 * 2020 labor law articles with recent commercial litigation articles.
 */

export const SITE = {
  name: "Blexmann Avocats",
  wordmark: "Blexmann",
  wordmarkSuffix: "Avocats",
  legalName: "Blexmann Avocats",
  domain: "blexmann-avocats.fr",
  url: "https://blexmann-avocats.fr",
  tagline: "Contentieux des affaires",
  // TODO: Verify with lawyer: Phone (+33 (0)1 89 86 48 60)
  phone: "+33 (0)1 89 86 48 60",
  phoneE164: "+33189864860",
  phoneHref: "tel:+33189864860",
  // TODO: Verify with lawyer: this mailbox must exist on the blexmann-avocats.fr domain
  email: "pblexmann@blexmann-avocats.fr",
  address: {
    street: "53 avenue Victor Hugo",
    postalCode: "75116",
    locality: "Paris",
    arrondissement: "Paris 16e",
    country: "France",
    countryCode: "FR",
  },
  barreau: "Barreau de Paris",
  // TODO: Verify with lawyer: SIREN (489 346 007) and exact active SIRET
  siren: "SIREN 489 346 007",
  // TODO: Verify with lawyer: Oath date (4 janvier 2006) and Toque number (E0140)
  oathDate: "4 janvier 2006",
  toque: "E0140",
  // TODO: Verify with lawyer: Founding year 2013
  founded: 2013,
  heroQuote:
    "Anticiper le risque judiciaire et défendre vos intérêts commerciaux avec méthode et réactivité.",
  confidentialityNotice:
    "Votre demande est traitée avec discrétion et dans le respect du secret professionnel.",
  appointmentOptions: ["Au cabinet (Paris)", "En visioconférence", "Par téléphone"] as const,
  linkedin: null as string | null,
} as const;

export const CTA = {
  /** Primary action everywhere: open the Cal.com booking modal. */
  booking: "Prendre rendez-vous",
  /** Secondary action: write first via the contact form. */
  write: "Exposer ma situation",
  submit: "Envoyer ma demande",
  reassurance: "Réponse sous 24 h ouvrées. Échange confidentiel.",
} as const;

/**
 * Primary navigation. "Publications" is intentionally not listed: the page is a
 * secondary, noindex page reachable from the footer and from "Le Cabinet" only.
 */
export const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Expertises", href: "/#expertises" },
  { label: "Approche", href: "/#approche" },
  { label: "Le Cabinet", href: "/le-cabinet" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const CONTACT_SUBJECTS = [
  "Contentieux commercial et contractuel",
  "Conflits entre associés ou actionnaires",
  "Responsabilité des dirigeants",
  "Contentieux post-acquisition",
  "Rupture brutale ou concurrence déloyale",
  "Procédure d'urgence",
  "Contentieux international",
  "Autre litige d'entreprise",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

export type Expertise = {
  id: string;
  index: string;
  /** Card heading — keeps the SEO keyword of the practice area. */
  domain: string;
  /** One-line hook shown on the homepage card. */
  hook: string;
  contactSubject: ContactSubject;
  /** Dedicated page route for this practice area (full detailed text). */
  href: string;
};

/**
 * Seven core practice areas. The ids are historic in-page anchors and must stay stable.
 */
export const EXPERTISES: Expertise[] = [
  {
    id: "commercial-contractuel",
    index: "01",
    domain: "Contentieux commercial et contractuel",
    hook: "Impayés, inexécution, résiliation : sécuriser la créance et la position contractuelle.",
    contactSubject: "Contentieux commercial et contractuel",
    href: "/contentieux-commercial",
  },
  {
    id: "associes-actionnaires",
    index: "02",
    domain: "Conflits entre associés et actionnaires",
    hook: "Blocage de gouvernance, abus de majorité ou de minorité, sortie du capital.",
    contactSubject: "Conflits entre associés ou actionnaires",
    href: "/conflits-entre-associes",
  },
  {
    id: "responsabilite-dirigeants",
    index: "03",
    domain: "Responsabilité des dirigeants",
    hook: "Faute de gestion alléguée, révocation, mise en cause personnelle : organiser la défense.",
    contactSubject: "Responsabilité des dirigeants",
    href: "/responsabilite-des-dirigeants",
  },
  {
    id: "post-acquisition",
    index: "04",
    domain: "Contentieux post-acquisition",
    hook: "Garantie d’actif et de passif, earn-out, ajustement de prix après une cession.",
    contactSubject: "Contentieux post-acquisition",
    href: "/contentieux-post-acquisition",
  },
  {
    id: "rupture-concurrente",
    index: "05",
    domain: "Rupture brutale et concurrence déloyale",
    hook: "Relation commerciale rompue sans préavis suffisant, dénigrement, détournement de clientèle.",
    contactSubject: "Rupture brutale ou concurrence déloyale",
    href: "/rupture-brutale-concurrence-deloyale",
  },
  {
    id: "urgence",
    index: "06",
    domain: "Procédures d'urgence",
    hook: "Référé-provision, mesures d’instruction (art. 145 CPC), saisies conservatoires.",
    contactSubject: "Procédure d'urgence",
    href: "/procedures-d-urgence",
  },
  {
    id: "international",
    index: "07",
    domain: "Contentieux à dimension internationale",
    hook: "Compétence, loi applicable, exequatur : cadrer le litige transfrontalier dès l’origine.",
    contactSubject: "Contentieux international",
    href: "/contentieux-international",
  },
];

export const APPROACH_INTRO = {
  title: "Un litige se traite. Une stratégie se choisit.",
  body: "Chaque dossier commence par une question : quelle issue sert réellement l’entreprise ? Objectifs, coûts, risques procéduraux et état des preuves déterminent la voie retenue, judiciaire ou amiable.",
  principle:
    "Vous décidez en connaissance de cause, sur la base d’une analyse claire et motivée.",
} as const;

export const APPROACH = [
  {
    index: "I",
    title: "Comprendre les enjeux économiques et opérationnels",
    body: "Avant toute initiative, le cabinet examine l’activité de l’entreprise, ses échéances et ce que le différend expose : trésorerie, gouvernance, partenaires clés.",
  },
  {
    index: "II",
    title: "Définir la stratégie juridique adaptée",
    body: "Mise en demeure, référé, action au fond, médiation ou arbitrage : chaque option est comparée selon les preuves, les délais et le coût global.",
  },
  {
    index: "III",
    title: "Défendre vos intérêts à chaque étape",
    body: "De la première notification à l’exécution de la décision ou au protocole transactionnel, le cabinet anticipe les échéances et explique chaque acte en amont.",
  },
] as const;

export const MARD = {
  kicker: "Juridictions étatiques & modes alternatifs",
  title: "Choisir la voie, pas seulement la procédure.",
  /** Full text — used on /le-cabinet. */
  body: "Le cabinet intervient devant les juridictions étatiques françaises comme dans le cadre des modes alternatifs de règlement des différends — négociation, médiation, conciliation et arbitrage. Cette double pratique permet d’orienter le dossier selon l’objectif prioritaire : obtenir un titre exécutoire, préserver une relation d’affaires ou encadrer une issue amiable par un protocole confidentiel.",
  /** Short text — used on the homepage. */
  homeBody:
    "Le cabinet intervient devant les juridictions françaises comme en négociation, médiation, conciliation et arbitrage. Cette double pratique permet de viser l’objectif prioritaire : un titre exécutoire, une relation d’affaires préservée ou un protocole confidentiel.",
} as const;

export const WHY = {
  eyebrow: "Engagements du cabinet",
  title: "Pourquoi confier votre contentieux à Blexmann Avocats ?",
  body: "Quatre engagements structurent le traitement de chaque dossier, du premier diagnostic à son dénouement.",
  commitments: [
    {
      index: "01",
      title: "Implication directe",
      body: "Un suivi personnel et continu, avec un interlocuteur unique qui maîtrise les pièces et le calendrier.",
    },
    {
      index: "02",
      title: "Pragmatisme économique",
      body: "Avant d’assigner, le cabinet met en balance voies judiciaires et amiables selon leur coût, leurs risques et leur intérêt pour l’activité.",
    },
    {
      index: "03",
      title: "Transparence",
      body: "À chaque étape, une information lisible sur l’état du dossier, les risques identifiés et les honoraires convenus.",
    },
    {
      index: "04",
      title: "Un périmètre clair, un regard international",
      body: "Établi à Paris 16e, le cabinet intervient devant les juridictions françaises et analyse dès le départ les éléments d’extranéité : juridiction compétente, loi applicable, exécution.",
    },
  ],
  closing: "Une conduite de dossier lisible, fondée sur les pièces et l’intérêt économique du client.",
} as const;

export const ABOUT = {
  eyebrow: "Fondateur — Blexmann Avocats",
  name: "Maître Pierre Blexmann",
  role: "Avocat au Barreau de Paris",
  /** Full text — used on /le-cabinet. */
  lead: "Dirigeants, associés et entreprises confrontés à des litiges commerciaux : le cabinet consacre sa pratique aux différends qui engagent la trésorerie, la gouvernance et la continuité de l’activité.",
  paragraphs: [
    "Fondé en 2013 par Maître Pierre Blexmann au 53 avenue Victor Hugo (Paris 16e), Blexmann Avocats applique une ligne constante : chaque dossier est conduit avec méthode — diagnostic précis, choix assumés, calendrier maîtrisé.",
    "Le cabinet accompagne dirigeants, associés et entreprises confrontés à des litiges commerciaux, contractuels, sociétaires ou comportant une dimension internationale, devant les juridictions françaises ainsi que dans le cadre de négociations, médiations, conciliations et arbitrages.",
    "La relation nouée par le cabinet repose sur l’écoute, l’examen rigoureux des faits et la clarté des échanges, dans le respect des règles déontologiques et du secret professionnel. Des contributions juridiques signées par Maître Pierre Blexmann ont par ailleurs été publiées sur la revue Village de la Justice.",
  ],
  /** Short texts — used on the homepage. */
  homeLead:
    "Le cabinet consacre sa pratique aux différends qui engagent la trésorerie, la gouvernance et la continuité de l’activité.",
  homeParagraph:
    "Fondé en 2013 par Maître Pierre Blexmann, le cabinet conduit chaque dossier avec méthode : diagnostic précis, choix assumés, calendrier maîtrisé, dans le respect des règles déontologiques.",
  homeFacts: [
    { label: "Fondation", value: "2013 — exercice individuel" },
    { label: "Pratique", value: "Contentieux des affaires et modes amiables" },
    { label: "Consultations", value: "Au cabinet (Paris), visioconférence, téléphone" },
  ],
  /** Full profile facts for the dedicated /le-cabinet page. */
  facts: [
    { label: "Fondation du cabinet", value: "2013 — exercice individuel" },
    { label: "Prestation de serment", value: "4 janvier 2006" },
    { label: "Adresse", value: "53 avenue Victor Hugo, 75116 Paris" },
    { label: "Pratique", value: "Contentieux des affaires et modes amiables" },
    { label: "Consultations", value: "Au cabinet (Paris), en visioconférence ou par téléphone" },
  ],
} as const;

/**
 * Five homepage FAQ entries (also exposed as FAQPage JSON-LD — visible text and
 * structured data come from this single source). Two to three sentences each.
 */
export const HOME_FAQS = [
  {
    q: "Quels sont les délais et le coût d’une procédure d’injonction de payer ?",
    a: "La requête est déposée sur pièces pour les créances certaines, liquides et exigibles ; s’ajoutent les honoraires convenus avec le cabinet et les frais de commissaire de justice pour signifier l’ordonnance. Les délais varient selon la juridiction et la complétude du dossier. Le débiteur dispose d’un mois à compter de la signification pour former opposition.",
  },
  {
    q: "Comment agir face à un associé qui bloque les décisions de l’entreprise ?",
    a: "Le cabinet examine d’abord les statuts, le pacte d’associés et les procès-verbaux pour identifier les règles de majorité et les clauses de sortie. Selon la gravité du blocage, il engage une négociation ou une médiation, ou saisit le juge (mandataire ad hoc, abus de minorité ou d’égalité).",
  },
  {
    q: "Combien coûte l’intervention d’un avocat en contentieux des affaires ?",
    a: "Les honoraires sont libres et fixés avant toute diligence, par une convention écrite. Selon le dossier, ils peuvent être calculés au temps passé ou par forfait d’étape, complétés le cas échéant par un honoraire de résultat.",
  },
  {
    q: "Faut-il privilégier une mise en demeure ou une assignation directe ?",
    a: "Une mise en demeure est le plus souvent un préalable utile, voire nécessaire : elle constate le manquement, fait courir les intérêts moratoires et ouvre une fenêtre de règlement amiable. Une saisine immédiate (référé, mesure probatoire, saisie conservatoire) s’impose lorsqu’une preuve risque de disparaître ou qu’un recouvrement est menacé.",
  },
  {
    q: "Comment se déroule le premier rendez-vous ?",
    a: "Après un bref exposé des faits et la vérification de l’absence de conflit d’intérêts, le premier rendez-vous se tient au cabinet (Paris 16e), en visioconférence ou par téléphone. Il permet d’analyser les pièces essentielles, d’évaluer les options et de présenter les modalités d’honoraires avant toute intervention.",
  },
] as const;

export const FIRST_CONTACT = {
  eyebrow: "Premier contact",
  title: "Comment se déroule la première prise de contact ?",
  steps: [
    {
      title: "Vous réservez un créneau ou exposez les faits",
      body: "Choisissez un créneau en ligne, ou décrivez votre situation en quelques lignes.",
    },
    {
      title: "Le cabinet vérifie l’absence de conflit d’intérêts",
      body: "Cette vérification déontologique précède tout échange sur le fond du dossier.",
    },
    {
      title: "Premier rendez-vous",
      body: "Au cabinet (Paris), en visio ou par téléphone, avec présentation des modalités d’honoraires.",
    },
  ],
} as const;

export const CONTACT = {
  eyebrow: "Contact",
  title: "Commençons par les faits.",
  body: "Exposez en quelques lignes le contexte du différend, les parties concernées et toute échéance en cours. Premier rendez-vous au cabinet (Paris), en visioconférence ou par téléphone.",
  formHelper:
    "Les champs marqués d’un astérisque (*) sont obligatoires. Merci de ne communiquer aucune information sensible lors de ce premier message.",
  formNote:
    "Votre demande est traitée avec discrétion et dans le respect du secret professionnel. L’envoi de ce formulaire ne crée pas, en soi, de relation avocat-client : celle-ci suppose l’acceptation expresse du dossier par le cabinet, après vérification notamment de l’absence de conflit d’intérêts.",
  subjects: CONTACT_SUBJECTS,
} as const;

export const FOOTER = {
  columns: [
    { title: "Navigation", items: NAV.map((n) => ({ label: n.label, href: n.href })) },
    {
      title: "Expertises",
      items: [
        { label: "Contentieux commercial", href: "/contentieux-commercial" },
        { label: "Conflits entre associés", href: "/conflits-entre-associes" },
        { label: "Responsabilité des dirigeants", href: "/responsabilite-des-dirigeants" },
        { label: "Contentieux post-acquisition", href: "/contentieux-post-acquisition" },
        { label: "Rupture brutale & concurrence", href: "/rupture-brutale-concurrence-deloyale" },
        { label: "Procédures d’urgence", href: "/procedures-d-urgence" },
        { label: "Contentieux international", href: "/contentieux-international" },
      ],
    },
    {
      title: "Informations",
      items: [
        { label: "Publications externes", href: "/publications" },
        { label: "Questions fréquentes", href: "/#faq" },
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
      ],
    },
  ],
  disclaimer:
    "Les informations diffusées sur ce site ont un caractère strictement général et informatif : elles ne constituent ni une consultation juridique ni un conseil personnalisé, et leur lecture ne crée aucune relation avocat-client.",
} as const;
