import type { ExpertisePageData } from "@/components/ExpertisePage";

/**
 * Contenu éditorial complet des 7 pages d'expertise — source unique partagée par
 * le rendu des pages et par le seed de la base d'administration (src/db/seed.ts).
 *
 * TODO [À CONFIRMER] Contenu éditorial et réponses FAQ à relire et valider par Maître Blexmann.
 */
export type ExpertisePageEntry = {
  title: string;
  description: string;
  path: string;
  data: ExpertisePageData;
};

export const EXPERTISE_PAGE_CONTENT = {
  "contentieux-commercial": {
    title: "Avocat litige commercial Paris | Blexmann Avocats",
    description:
      "Impayés, inexécution et résiliation de contrats à Paris : Blexmann Avocats assiste dirigeants et entreprises. Exposez votre situation.",
    path: "/contentieux-commercial",
    data: {
  path: "/contentieux-commercial",
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
},
  },
  "conflits-entre-associes": {
    title: "Avocat conflit entre associés Paris | Blexmann Avocats",
    description:
      "Blocage de gouvernance, abus de majorité ou sortie d’associé à Paris : Blexmann Avocats défend vos droits sociaux. Exposez votre situation.",
    path: "/conflits-entre-associes",
    data: {
  path: "/conflits-entre-associes",
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
},
  },
  "responsabilite-des-dirigeants": {
    title: "Responsabilité des dirigeants Paris | Blexmann Avocats",
    description:
      "Faute de gestion, révocation ou mise en cause personnelle à Paris : Blexmann Avocats assure la défense des dirigeants. Exposez votre situation.",
    path: "/responsabilite-des-dirigeants",
    data: {
  path: "/responsabilite-des-dirigeants",
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
},
  },
  "contentieux-post-acquisition": {
    title: "Contentieux post-acquisition Paris | Blexmann Avocats",
    description:
      "Garantie d’actif et de passif, earn-out ou prix de cession contesté à Paris : Blexmann Avocats instruit votre dossier. Exposez votre situation.",
    path: "/contentieux-post-acquisition",
    data: {
  path: "/contentieux-post-acquisition",
  breadcrumbLabel: "Contentieux post-acquisition",
  eyebrow: "Contentieux post-acquisition — Paris",
  h1: "Avocat en contentieux post-acquisition à Paris",
  intro: [
    "Découverte d’un passif fiscal, social ou litigieux après le closing, désaccord sur les comptes de cession, refus de verser un complément de prix (earn-out) ou violation d’un engagement de non-concurrence : les mois suivant une opération de cession cristallisent des litiges à forts enjeux financiers.",
    "Blexmann Avocats accompagne acquéreurs, cédants, associés et dirigeants dans l’instruction, la négociation et le règlement contentieux de leurs différends post-acquisition à Paris.",
  ],
  situationsTitle: "Différends survenant après une cession de titres ou de fonds",
  situationsText:
    "Les contentieux post-cession mêlent étroitement droit des contrats, droit des sociétés et analyse comptable. La moindre imprécision dans une notification peut compromettre une réclamation pourtant fondée.",
  situationsBullets: [
    "Mise en jeu ou contestation d’une garantie d’actif et de passif (GAP) : inexactitude des déclarations du cédant, redressement fiscal ou URSSAF, litige commercial ou prud’homal ayant une origine antérieure à la cession.",
    "Ajustement de prix et complément de prix (earn-out) : contestation des comptes de référence (trésorerie nette, dette nette, BFR), désaccord sur l’atteinte des indicateurs de performance ou sur la conduite de la société cible durant la période d’earn-out.",
    "Vices du consentement et manquement au devoir précontractuel d’information : réticence dolosive ou dissimulation d’éléments déterminants lors de la phase d’audit (art. 1112-1 et 1137 du Code civil).",
    "Engagements post-closing : violation d’une clause de non-concurrence ou de non-débauchage, inexécution d’une convention d’accompagnement ou blocage d’une garantie bancaire / d’un séquestre.",
  ],
  enjeuxTitle: "Enjeux financiers et lecture rigoureuse des actes",
  enjeuxParagraphs: [
    "Pour l’acquéreur, un passif non révélé ou une surévaluation des actifs altère directement la rentabilité de l’opération et les équilibres de financement. Pour le cédant, un appel en garantie infondé ou le blocage d’un complément de prix immobilise une part substantielle du produit de cession.",
    "Le cabinet procède dès sa saisine à un audit précis du protocole de cession (SPA), de la convention de garantie et de leurs annexes afin de sécuriser le calendrier contractuel et de qualifier les fondements mobilisables.",
  ],
  enjeuxPoints: [
    "Formalisme et délais d’appel en garantie : délai contractuel de notification, mode d’envoi imposé, pièces à joindre et droit d’information ou d’association du cédant à la défense face aux tiers.",
    "Mécanismes financiers de la GAP : seuil de déclenchement, franchise, plafond d’indemnisation, déduction des provisions ou économies d’impôt, et sûretés adossées (garantie à première demande, caution, séquestre).",
    "Clause de détermination du prix : périmètre comptable retenu et éventuel recours à un tiers estimateur (art. 1592 ou 1843-4 du Code civil).",
    "Clause de règlement des différends : conciliation préalable, compétence du tribunal des activités économiques de Paris ou clause compromissoire d’arbitrage.",
  ],
  conduiteTitle: "Conduite de la réclamation, négociation et contentieux",
  conduiteParagraphs: [
    "Le cabinet rédige les notifications de réclamation ou les réponses en contestation dans le respect strict des stipulations de la convention, et travaille en lien avec les conseils financiers et comptables du client pour étayer ou discuter le chiffrage du préjudice.",
    "Selon l’évolution des échanges et les clauses du contrat, le cabinet mène les pourparlers en vue d’un accord transactionnel ou représente le client devant la juridiction étatique compétente, en référé comme au fond, ou dans le cadre d’une procédure arbitrale.",
  ],
  faqs: [
    {
      q: "Que se passe-t-il si le délai de notification prévu par la garantie de passif est dépassé ?",
      a: "Tout dépend de la sanction stipulée dans la convention de garantie : certains actes prévoient expressément la déchéance du droit à indemnisation en cas de notification tardive, tandis que d’autres ne réduisent l’indemnisation qu’à hauteur du préjudice causé au cédant par ce retard. Une vérification immédiate de la clause s’impose dès la connaissance d’un fait générateur.",
    },
    {
      q: "Peut-on agir en cas de dissimulation découverte hors plafond ou hors délai de la GAP ?",
      a: "Lorsque la preuve d’une manœuvre ou d’une dissimulation intentionnelle d’une information déterminante est rapportée, une action fondée sur le dol (art. 1137 du Code civil) obéit à son propre régime légal de prescription et n’est pas enfermée dans les plafonds conventionnels de la garantie de passif. La charge de la preuve de l’intention dolosive demeure toutefois exigeante.",
    },
    {
      q: "Comment sont tranchés les litiges portant sur un complément de prix (earn-out) ?",
      a: "L’analyse porte d’abord sur la précision des critères comptables ou opérationnels fixés au contrat, sur la permanence des méthodes comptables appliquées et sur le respect de la bonne foi dans la gestion de la société pendant la période de référence. En cas de désaccord technique sur le calcul, l’acte prévoit fréquemment l’intervention d’un tiers estimateur indépendant, tandis que les fautes contractuelles relèvent du juge ou de l’arbitre.",
    },
    {
      q: "Une clause de non-concurrence du cédant est-elle toujours opposable ?",
      a: "Dans une cession de droits sociaux ou de fonds de commerce, la clause de non-concurrence est valable si elle est limitée dans le temps et dans l’espace (ou quant à l’activité) et proportionnée aux intérêts légitimes de la société acquise ; contrairement au droit du travail, elle n’exige pas de contrepartie financière distincte du prix de cession.",
    },
  ],
  related: [
    { label: "Conflits entre associés et actionnaires à Paris", href: "/conflits-entre-associes" },
    { label: "Contentieux commercial et contractuel à Paris", href: "/contentieux-commercial" },
    { label: "Responsabilité des dirigeants à Paris", href: "/responsabilite-des-dirigeants" },
    { label: "Contentieux commercial international", href: "/contentieux-international" },
  ],
  contactSubject: "Contentieux post-acquisition",
},
  },
  "rupture-brutale-concurrence-deloyale": {
    title: "Rupture brutale & concurrence Paris | Blexmann Avocats",
    description:
      "Rupture brutale de relation commerciale établie ou concurrence déloyale à Paris : Blexmann Avocats défend vos intérêts. Exposez votre situation.",
    path: "/rupture-brutale-concurrence-deloyale",
    data: {
  path: "/rupture-brutale-concurrence-deloyale",
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
},
  },
  "procedures-d-urgence": {
    title: "Avocat référé et urgence Paris | Blexmann Avocats",
    description:
      "Référé commercial, saisie conservatoire ou requête probatoire (art. 145 CPC) à Paris : Blexmann Avocats intervient. Exposez votre situation.",
    path: "/procedures-d-urgence",
    data: {
  path: "/procedures-d-urgence",
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
},
  },
  "contentieux-international": {
    title: "Contentieux commercial international | Blexmann Avocats",
    description:
      "Contrat international, compétence, loi applicable ou exequatur à Paris : Blexmann Avocats analyse votre dossier. Exposez votre situation.",
    path: "/contentieux-international",
    data: {
  path: "/contentieux-international",
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
  // TODO [À CONFIRMER] : intitulés de cadres juridiques cités en titre (Convention de Vienne,
  // Bruxelles I bis, Convention de New York) — à valider avec Maître Blexmann avant publication.
  scenariosTitle: "Quatre situations fréquentes",
  scenarios: [
    {
      title: "Contrat avec un fournisseur étranger (Convention de Vienne)",
      body: "Impayé, retard de livraison ou marchandise non conforme : le cabinet qualifie le contrat, vérifie la clause de litige et détermine devant quelle juridiction agir avant toute mise en demeure.",
    },
    {
      title: "Associé ou actionnaire étranger au capital",
      body: "Blocage de gouvernance ou sortie contestée avec un associé établi hors de France : les statuts et le pacte restent le point de départ, la nationalité de l’associé n’efface pas les voies sociétaires habituelles.",
    },
    {
      title: "Exécution d’une décision à l’étranger, ou d’une décision étrangère en France (exequatur)",
      body: "Avant toute procédure, le cabinet vérifie les conditions de reconnaissance applicables, le pays de situation des actifs et les formalités (traductions, exequatur) requises pour rendre la décision effective.",
    },
    {
      title: "Clause compromissoire et arbitrage",
      body: "Un contrat international peut imposer l’arbitrage : le cabinet examine la validité de la clause, la juridiction compétente pour l’incident et la voie d’exécution de la sentence.",
    },
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
    {
      q: "Un différend avec un fournisseur étranger peut-il être traité en France ?",
      a: "Cela dépend de la clause de litige du contrat, du lieu d’exécution et des règles de compétence applicables. Le cabinet vérifie ces éléments avant toute saisine afin d’éviter une contestation préalable de compétence qui ferait perdre un temps précieux.",
    },
    {
      q: "Que se passe-t-il lorsqu’un associé étranger bloque une décision sociale ?",
      a: "L’analyse porte sur les statuts, le pacte d’associés et les règles de majorité, indépendamment de la nationalité de l’associé. Le cabinet recherche d’abord une issue négociée, puis engage les voies sociétaires appropriées si le blocage persiste.",
    },
    {
      q: "Comment faire reconnaître une décision étrangère en France ?",
      a: "La reconnaissance dépend du pays d’origine, des conventions applicables et des conditions posées par la loi française. Le cabinet instruit la demande en vérifiant ces conditions, les traductions assermentées et les formalités de procédure avant de saisir le juge compétent.",
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
},
  },
} satisfies Record<string, ExpertisePageEntry>;
