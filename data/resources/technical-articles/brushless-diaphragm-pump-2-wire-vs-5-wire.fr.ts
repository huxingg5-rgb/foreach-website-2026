import type { BrushlessWiringArticleCopy } from "./brushless-diaphragm-pump-2-wire-vs-5-wire.types";

export const brushlessWiringArticleFrCopy = {
  metadata: {
    title:
      "Pompe à membrane brushless 2 fils ou 5 fils : quelles différences et comment choisir ?",
    seoTitle: "Pompe à membrane brushless 2 fils vs 5 fils | FOREACH",
    seoDescription:
      "Découvrez les différences entre les configurations 2 fils et 5 fils d'une pompe à membrane brushless, les fonctions VCC, GND, PWM, DIR et FG, les cas d'utilisation et les options disponibles pour les séries FOREACH DPL30, DPL60, DPL30H et DPGL800.",
    coverAlt: "Moteur brushless FOREACH DPL60 à 2 fils",
  },
  kicker: "Pompe à membrane brushless · 2 fils ou 5 fils",
  deck:
    "Lors du choix d'une pompe à membrane miniature, un même type de moteur CC brushless peut être proposé avec 2 fils ou 5 fils. La différence principale ne concerne pas le principe de pompage, mais le niveau de commande et d'information sur l'état du moteur dont l'équipement a besoin.",
  conclusion: {
    title: "1. La réponse en bref",
    label: "En bref :",
    text:
      "Le moteur brushless 2 fils sert principalement à l'alimentation et à la marche/arrêt. Son câblage simple convient au fonctionnement à vitesse fixe. En plus de l'alimentation, le moteur 5 fils peut ajouter une commande de vitesse PWM, une commande du sens de rotation et un retour de vitesse. Il convient donc mieux lorsque le contrôleur principal doit intervenir. Si la pompe doit seulement fonctionner de manière stable, privilégiez 2 fils ; si une régulation, un retour ou une commande plus complexe est nécessaire, choisissez 5 fils.",
  },
  twoWire: {
    title: "2. Qu'est-ce qu'un moteur brushless 2 fils ?",
    intro: "La configuration 2 fils conserve généralement uniquement les connexions d'alimentation de base :",
    headers: ["Connexion", "Fonction principale"],
    rows: [
      ["VCC", "Positif de l'alimentation"],
      ["GND", "Négatif de l'alimentation / masse"],
    ],
    paragraphs: [
      "La commande d'entraînement de base est déjà intégrée dans le moteur. Le moteur fonctionne lorsqu'il est alimenté et s'arrête lorsque l'alimentation est coupée.",
      "Les principaux avantages de la configuration 2 fils sont donc un câblage simple, une commande simple et une intégration aisée dans le système.",
    ],
    figureAlt: "Moteur brushless FOREACH DPL60 à 2 fils",
    figureCaption:
      "Figure 1 | Moteur brushless DPL60 à 2 fils. La configuration conserve les connexions d'alimentation de base.",
    selectionTitle: "Quand choisir 2 fils ?",
    selectionIntro:
      "La configuration 2 fils est généralement à privilégier lorsque l'équipement répond aux conditions suivantes :",
    selectionItems: [
      "La pompe fonctionne longtemps à vitesse fixe.",
      "Seule la commande de marche et d'arrêt est nécessaire.",
      "La vitesse du moteur n'a pas besoin d'être lue.",
      "Aucune commande de vitesse PWM externe n'est nécessaire.",
      "Les ressources d'interface du contrôleur principal sont limitées.",
      "L'objectif est de réduire la complexité du faisceau et de la logique de commande.",
    ],
    closing:
      "Pour de nombreuses applications de transfert de liquide, de vidange et de nettoyage dans une plage de débit fixe, 2 fils couvre les besoins de base si l'appareil ne nécessite pas de variation dynamique de vitesse.",
  },
  fiveWire: {
    title: "3. Qu'est-ce qu'un moteur brushless 5 fils ?",
    intro:
      "En plus du positif d'alimentation et de la masse, la configuration 5 fils ajoute des connexions de commande et de retour.",
    exampleIntro: "Voici un exemple de configuration courante :",
    headers: ["Connexion", "Fonction principale"],
    rows: [
      ["VCC", "Positif de l'alimentation"],
      ["GND", "Masse"],
      ["PWM", "Signal de commande de vitesse, optionnel"],
      ["DIR", "Signal de commande du sens de rotation, optionnel"],
      ["FG", "Signal de retour de vitesse, optionnel"],
    ],
    paragraphs: [
      "Par rapport à 2 fils, le principal avantage de 5 fils est que le contrôleur de l'équipement peut piloter plus précisément le fonctionnement du moteur et obtenir un retour de vitesse.",
      "Par exemple, un signal PWM permet de régler la vitesse du moteur, tandis qu'un signal FG peut aider à déterminer si le moteur fonctionne normalement. L'ordre exact des fils et la logique de commande peuvent varier selon le modèle ; il faut toujours suivre la spécification électrique du produit choisi.",
    ],
    figureAlt: "Moteur brushless FOREACH DPL60 à 5 fils",
    figureCaption:
      "Figure 2 | Moteur brushless DPL60 à 5 fils. Des connexions de commande et de retour peuvent s'ajouter à l'alimentation.",
    selectionTitle: "Quand choisir 5 fils ?",
    selectionIntro:
      "La configuration 5 fils est plus adaptée lorsque l'équipement présente les besoins suivants :",
    selectionItems: [
      "La vitesse de la pompe doit être réglée par PWM.",
      "Les différentes phases de fonctionnement exigent des vitesses différentes.",
      "La vitesse du moteur doit être lue.",
      "Le système doit déterminer si la pompe fonctionne normalement.",
      "La pompe doit être coordonnée avec le contrôleur principal.",
      "Les exigences d'automatisation et de surveillance du fonctionnement sont élevées.",
    ],
    closing:
      "Dans les équipements de DIV, les instruments d'analyse et les systèmes d'automatisation de laboratoire, par exemple, 5 fils est souvent plus adapté lorsque le circuit fluidique change la vitesse de la pompe entre plusieurs phases ou lorsque le contrôleur doit recevoir un retour du moteur.",
  },
  diagramSectionTitle: "4. Logique de câblage des configurations 2 fils et 5 fils",
  diagram: {
    ariaLabel: "Schéma de commande des moteurs brushless 2 fils et 5 fils",
    twoWireTitle: "2 fils",
    twoWireSubtitle: "Vitesse fixe · Marche/arrêt simple",
    fiveWireTitle: "5 fils",
    fiveWireSubtitle: "Alimentation + commande + retour",
    motor: "Moteur brushless",
    integratedDriver: "Driver intégré",
    controlInterface: "Interface de commande",
    redPower: "Rouge · Positif",
    blackGround: "Noir · Masse",
    optional: "Optionnel",
    typicalUse: "Utilisation type",
    twoWireUses: [
      "Fonctionnement à vitesse fixe",
      "Marche/arrêt par alimentation",
      "Sans régulation ni retour externe",
    ],
    fiveWireUses: [
      "Commande de vitesse PWM",
      "Commande de direction DIR",
      "Retour de vitesse FG",
      "Intégration au contrôleur",
    ],
    footer: "2/5 fils décrit le câblage et la commande, pas le type avec/sans balais",
    caption:
      "Figure 3 | Logique de commande des moteurs brushless 2 fils et 5 fils. Les couleurs et fonctions suivent la spécification : VCC rouge, GND noir, PWM bleu, DIR jaune et FG vert. PWM, DIR et FG sont des fonctions optionnelles de commande ou de retour. L'ordre exact des broches, les paramètres électriques, la logique d'entrée/sortie et la configuration finale dépendent de la spécification officielle et de la confirmation du projet pour le modèle choisi.",
  },
  comparison: {
    title: "5. Principales différences entre les moteurs brushless 2 fils et 5 fils",
    headers: ["Comparaison", "Brushless 2 fils", "Brushless 5 fils"],
    rows: [
      ["Alimentation de base", "Prise en charge", "Prise en charge"],
      ["Commande marche/arrêt", "Prise en charge", "Prise en charge"],
      ["Commande PWM", "Commande externe généralement inutile", "Peut être prise en charge"],
      ["Retour de vitesse", "Généralement absent", "Retour FG possible"],
      ["Commande du sens", "Généralement sans commande externe", "Peut être prise en charge"],
      ["Complexité du câblage", "Faible", "Plus élevée"],
      ["Besoin d'interfaces", "Faible", "Plus élevé"],
      ["Applications adaptées", "Fonctionnement fixe", "Régulation, retour et automatisation"],
    ],
    conclusion:
      "Le choix 2 fils ou 5 fils ne correspond donc pas à un niveau de performance, mais à des besoins de commande système différents.",
  },
  selection: {
    title: "6. Quand utiliser 2 fils ou 5 fils ?",
    intro: "Le choix découle directement des besoins de commande de l'équipement.",
    twoWireTitle: "Choisir 2 fils",
    twoWireIntro: "Si la séquence nécessaire est :",
    twoWireLogicTitle: "Logique type 2 fils",
    twoWireLogic: "Mise sous tension → transfert ou vidange du liquide → arrêt",
    twoWireClosing:
      "et si la vitesse ne doit pas changer pendant le fonctionnement et que l'état du moteur n'a pas besoin d'être lu, la configuration brushless 2 fils est généralement privilégiée.",
    fiveWireTitle: "Choisir 5 fils",
    fiveWireIntro: "Si la séquence nécessaire est :",
    fiveWireLogicTitle: "Logique type 5 fils",
    fiveWireLogic:
      "Le contrôleur modifie la vitesse selon la phase → reçoit le retour de fonctionnement → pilote la pompe plus précisément",
    fiveWireClosing: "la configuration brushless 5 fils est plus adaptée.",
    decision:
      "La première question n'est donc pas de savoir si 2 fils ou 5 fils est meilleur, mais si le contrôleur principal doit participer au réglage de la vitesse de la pompe et à la surveillance de son état.",
    fixedSpeedCaution:
      "Si l'équipement exige seulement une vitesse fixe, choisir 5 fils n'améliore pas automatiquement le résultat et augmente au contraire la complexité du faisceau, des interfaces et du logiciel de commande.",
    futureControl:
      "À l'inverse, si une variation de vitesse, une surveillance du fonctionnement ou un pilotage fluidique plus précis sera nécessaire par la suite, choisir 5 fils dès la conception réserve davantage de possibilités au système de commande.",
    confusionTitle: "Une notion souvent confondue",
    confusionText:
      "Avec balais / brushless décrit le type de moteur ; 2 fils / 5 fils décrit la sortie des fils et le mode de commande. Ce ne sont pas les mêmes notions. Deux fils ne signifie pas moteur à balais, et cinq fils ne définit pas à lui seul un moteur brushless.",
  },
  products: {
    title: "Quelles pompes à membrane miniatures FOREACH peuvent utiliser 2 ou 5 fils ?",
    intro:
      "Plusieurs séries de pompes à membrane miniatures FOREACH permettent de confirmer une sortie de fils adaptée au modèle précis et aux besoins de commande du projet, notamment :",
    cards: [
      {
        label: "Pompe à membrane miniature pour liquide",
        model: "DPL30",
        note: "À confirmer selon le modèle et le projet",
        slug: "dpl30-liquid-diaphragm-pump",
      },
      {
        label: "Pompe à membrane miniature pour liquide",
        model: "DPL60",
        note: "À confirmer selon le modèle et le projet",
        slug: "dpl60-liquid-diaphragm-pump",
      },
      {
        label: "Pompe à membrane miniature haute pression",
        model: "DPL30H",
        note: "À confirmer selon le modèle et le projet",
        slug: "dpl30h-liquid-diaphragm-pump",
      },
      {
        label: "Pompe de mélange gaz-liquide",
        model: "DPGL800",
        note: "À confirmer selon le modèle et le projet",
        slug: "dpgl800-gas-liquid-diaphragm-pump",
      },
    ],
    paragraphs: [
      "Lors du choix d'un modèle de ces séries, il faut confirmer les exigences de sortie de fils du système de commande en plus du débit, de la pression, de l'auto-amorçage, de la tension, du type de moteur et des matériaux en contact avec le fluide.",
      "Si l'appareil exige seulement une marche/arrêt simple, évaluez d'abord 2 fils. S'il nécessite une régulation, un retour ou une automatisation plus complexe, confirmez la configuration 5 fils.",
      "La configuration finale, l'ordre exact des fils, l'interface électrique et le mode de commande dépendent de la spécification officielle du modèle et des documents de confirmation du projet.",
    ],
  },
  faqTitle: "FAQ",
  faqItems: [
    {
      question:
        "1. Quelle est la principale différence entre une pompe à membrane brushless 2 fils et 5 fils ?",
      answer:
        "La principale différence concerne les fonctions de commande. Deux fils sert surtout à l'alimentation et au fonctionnement de base ; cinq fils peut également fournir une commande de vitesse PWM, une commande du sens de rotation et un retour de vitesse FG.",
    },
    {
      question: "2. Un moteur brushless 2 fils est-il en réalité un moteur à balais ?",
      answer:
        "Non. Avec balais / brushless décrit le type de moteur, tandis que 2 fils / 5 fils décrit la sortie et le mode de commande. Un moteur brushless peut utiliser différentes configurations de fils selon la conception de commande.",
    },
    {
      question:
        "3. Une pompe à membrane brushless 5 fils est-elle toujours meilleure qu'une version 2 fils ?",
      answer:
        "Non. Si l'équipement exige seulement une vitesse fixe, 2 fils est généralement plus simple et plus facile à intégrer. Les avantages de 5 fils deviennent utiles lorsqu'une régulation, un retour ou une intégration au contrôleur principal est nécessaire.",
    },
    {
      question: "4. Quand une commande de vitesse PWM est-elle nécessaire ?",
      answer:
        "La commande PWM peut être envisagée lorsque les différentes phases exigent des vitesses différentes, par exemple une aspiration rapide, une vidange à faible vitesse ou un changement de cadence du circuit fluidique.",
    },
    {
      question: "5. À quoi sert le retour FG ?",
      answer:
        "FG fournit généralement un retour sur le fonctionnement ou la vitesse du moteur. Le contrôleur peut utiliser ce signal pour déterminer si le moteur tourne ou l'associer au logiciel de commande pour surveiller son état.",
    },
    {
      question:
        "6. Les séries DPL30, DPL60, DPL30H et DPGL800 peuvent-elles utiliser des configurations 2 fils et 5 fils ?",
      answer:
        "La configuration adaptée peut être choisie selon le modèle précis et les besoins de commande du projet. Pour les projets DPL30, DPL60, DPL30H et DPGL800, le besoin de 2 ou 5 fils se confirme lors de la sélection. La configuration finale et les définitions exactes de connexion dépendent de la spécification applicable et de la confirmation du projet.",
    },
  ],
  cta: {
    title: "Besoin de confirmer 2 fils ou 5 fils ?",
    description:
      "Pour un projet DPL30, DPL60, DPL30H ou DPGL800, indiquez la tension d'alimentation, le débit cible, la pression de service et le besoin éventuel de commande PWM, de commande DIR ou de retour FG afin de confirmer la configuration appropriée.",
    contactLabel: "Contacter un ingénieur",
    productsLabel: "Voir le centre produits",
  },
  sourceNote:
    "Remarque : les schémas 2 fils et 5 fils de cet article expliquent les relations fonctionnelles et ne constituent pas des instructions de câblage finales. Les couleurs, l'ordre des fils, les paramètres d'entrée/sortie et la logique de commande peuvent varier selon le modèle. La spécification officielle ou le document de confirmation du projet fait foi.",
} satisfies BrushlessWiringArticleCopy;
