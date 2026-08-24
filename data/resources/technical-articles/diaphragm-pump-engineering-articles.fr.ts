import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const FLOW_ASSET_BASE =
  "/images/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide";
const LIFE_ASSET_BASE =
  "/images/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life";

export const diaphragmPumpFlowPressureCurveFrCopy = {
  metadata: {
    title:
      "Comment lire la courbe débit-pression d’une pompe à membrane ?",
    seoTitle:
      "Courbe débit-pression d’une pompe à membrane et point de fonctionnement | FOREACH",
    seoDescription:
      "Comprendre le débit installé à partir de la courbe de pompe, de la résistance du circuit, de la pression d’entrée et de sortie, de la viscosité et du diamètre du tube.",
    coverImage: `${FLOW_ASSET_BASE}/article-cover.webp`,
    coverAlt:
      "Pompe à membrane miniature FOREACH sur un banc de mesure débit-pression",
  },
  deck:
    "Une valeur catalogue de 300 ou 600 mL/min n’est pas un débit fixe dans l’instrument. Le débit réel correspond à l’intersection de la courbe de pompe et de la courbe du circuit, dans les conditions réelles de fluide, de pression, de tuyauterie et d’alimentation.",
  leadBlocks: [
    {
      type: "paragraph",
      text:
        "Une même pompe peut approcher son débit libre avec de l’eau, un tube court et peu de contre-pression, puis débiter nettement moins avec un filtre, une vanne, une aiguille, un faible diamètre intérieur ou un réactif visqueux. Cet écart ne prouve pas à lui seul un défaut de pompe.",
    },
    {
      type: "notice",
      label: "Point essentiel :",
      text:
        "le débit installé dépend simultanément de la pompe, du circuit et des conditions de mesure.",
    },
    {
      type: "figure",
      src: `${FLOW_ASSET_BASE}/article-cover.webp`,
      alt: "Pompe à membrane miniature raccordée à une instrumentation de laboratoire",
      width: 1304,
      height: 837,
      caption:
        "Le débit libre est un point de départ. Le point de fonctionnement doit être validé avec le circuit final.",
    },
  ],
  sections: [
    {
      title: "1. Vérifier d’abord la définition et les conditions de la courbe",
      blocks: [
        {
          type: "table",
          headers: ["Paramètre", "À définir", "Erreur fréquente"],
          rows: [
            ["Alimentation", "Tension aux bornes, limite de courant et PWM", "Comparer des vitesses différentes"],
            ["Fluide", "Viscosité, température, densité et gaz", "Extrapoler une courbe eau à un autre réactif"],
            ["Pression", "Dépression d’entrée, pression de sortie et emplacement des prises", "Additionner des valeurs non définies"],
            ["Circuit", "Diamètre, longueur, vannes, filtres et restriction terminale", "Assimiler le banc au montage réel"],
          ],
        },
        { type: "formula", expression: "ΔPpump = Pout - Pin" },
      ],
    },
    {
      title: "2. Courbe de pompe, courbe système et point de fonctionnement",
      blocks: [
        {
          type: "paragraph",
          text:
            "La courbe de pompe tend vers un débit plus faible lorsque la pression différentielle augmente. La courbe système monte, car un débit plus élevé exige davantage de pression dans les tubes, raccords, vannes et filtres. Leur intersection est le point installé.",
        },
        {
          type: "formula",
          expression:
            "ΔPsystem = ΔPstatic + ΔPfriction + ΣΔPlocal + ΔPterminal",
        },
        {
          type: "figure",
          src: `${FLOW_ASSET_BASE}/pump-system-operating-point-en.webp`,
          alt: "Courbe de pompe et courbes système avec leurs points de fonctionnement",
          width: 1200,
          height: 658,
          caption:
            "Un tube plus large déplace le point vers un débit supérieur ; un filtre colmaté ou une restriction plus fine le déplace vers un débit inférieur et une ΔP plus élevée. Schéma de principe.",
        },
      ],
    },
    {
      title: "3. Le diamètre intérieur peut dominer la perte de charge",
      blocks: [
        {
          type: "formula",
          expression: "ΔP = 128μLQ / (πD⁴)",
          note:
            "En régime laminaire stable dans un tube circulaire, la perte dépend fortement de D et augmente avec la viscosité, la longueur et le débit.",
        },
        {
          type: "figure",
          src: `${FLOW_ASSET_BASE}/tube-diameter-pressure-loss-en.webp`,
          alt: "Pertes de charge comparées pour des tubes de 1,6, 2,0 et 3,2 millimètres",
          width: 1200,
          height: 600,
          caption:
            "Avec de l’eau à 20 °C, 1 m et 100 mL/min, passer de 3,2 à 1,6 mm multiplie approximativement par 16 la perte du tube droit idéal. Le montage réel ajoute vannes, filtres et hauteur statique.",
        },
      ],
    },
    {
      title: "4. Confirmer le point installé avec un essai reproductible",
      blocks: [
        {
          type: "figure",
          src: `${FLOW_ASSET_BASE}/installed-flow-test-loop-en.webp`,
          alt: "Boucle d’essai reproductible du point de fonctionnement d’une pompe à membrane",
          width: 1200,
          height: 600,
          caption:
            "Contrôler le fluide et sa température, mesurer Pin et Pout, enregistrer tension et courant à la pompe et vérifier le débit par masse ou volume cumulé.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Amorcer et purger selon une procédure identique.",
            "Fixer tube, vannes, filtre, hauteur et méthode de mesure.",
            "Attendre l’état thermique et hydraulique défini.",
            "Enregistrer simultanément pression, tension, courant, température et débit.",
            "Répéter chaque condition au moins trois fois et conserver les données brutes.",
          ],
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes",
  faqItems: [
    {
      question: "Pourquoi le débit installé est-il inférieur à la valeur catalogue ?",
      answer:
        "La tuyauterie, les filtres, les vannes, la hauteur, les pressions d’entrée et de sortie, la viscosité, la tension aux bornes et la méthode de mesure déplacent le point de fonctionnement.",
    },
    {
      question: "300 mL/min signifie-t-il 300 mL/min à la pression nominale ?",
      answer:
        "Pas nécessairement. Le débit libre et la pression nominale peuvent décrire des points différents. Il faut lire la courbe mesurée à la pression requise.",
    },
    {
      question: "Que faut-il mesurer dans l’instrument ?",
      answer:
        "Les pressions d’entrée et de sortie, la tension et le courant aux bornes, la température du fluide, la masse ou le volume cumulé et le temps d’échantillonnage.",
    },
  ],
  cta: {
    title: "Besoin d’identifier le point de fonctionnement réel ?",
    description:
      "Transmettez le débit cible, les pressions, le fluide et sa viscosité, les tubes, filtres, vannes, l’alimentation et le cycle de service afin de définir une pompe et un essai adaptés.",
    contactLabel: "Contacter un ingénieur",
    productsLabel: "Voir les pompes à membrane",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const microDiaphragmPumpContinuousDutyLifeFrCopy = {
  metadata: {
    title:
      "Combien de temps une pompe à membrane miniature peut-elle fonctionner en continu ?",
    seoTitle:
      "Fonctionnement continu et durée de vie d’une pompe à membrane | FOREACH",
    seoDescription:
      "Comprendre service continu, heures cumulées, moteurs à balais et sans balais, profil de mission, critères de défaillance, essais d’endurance et fiabilité B10.",
    coverImage: `${LIFE_ASSET_BASE}/article-cover.webp`,
    coverAlt:
      "Pompe à membrane miniature FOREACH pendant un essai de fonctionnement continu",
  },
  deck:
    "Compatible avec un fonctionnement continu ne signifie pas durée de vie illimitée. Service continu, heures cumulées, vie calendaire et fiabilité statistique sont des notions différentes, toutes liées à la charge, au fluide, à la commande et à l’environnement.",
  leadBlocks: [
    {
      type: "paragraph",
      text:
        "Dans un équipement OEM, il ne suffit pas que le moteur continue à tourner. La pompe doit démarrer, fournir le débit sous pression, rester dans ses limites électriques et thermiques, ne pas fuir et conserver la fonction requise pendant le profil d’utilisation réel.",
    },
    {
      type: "notice",
      label: "Règle d’ingénierie :",
      text:
        "toujours associer une valeur de durée de vie à la tension, la charge, le fluide, la température, le mode de fonctionnement, le nombre d’échantillons et le critère de défaillance.",
    },
    {
      type: "figure",
      src: `${LIFE_ASSET_BASE}/article-cover.webp`,
      alt: "Pompe à membrane raccordée à une instrumentation d’endurance",
      width: 1304,
      height: 837,
      caption:
        "Le service continu est un mode d’utilisation ; la durée de vie s’arrête lorsqu’une limite fonctionnelle définie est atteinte.",
    },
  ],
  sections: [
    {
      title: "1. Traduire le profil de mission en exigence de durée de vie",
      blocks: [
        {
          type: "formula",
          expression: "Ttotal = Σ(Ni × ti)",
          note:
            "Les heures alimentées sont calculées par état ; le nombre de démarrages et la répartition de charge sont suivis séparément.",
        },
        {
          type: "figure",
          src: `${LIFE_ASSET_BASE}/duty-profile-lifetime-demand-en.webp`,
          alt: "Profil de mission avec heures, démarrages et répartition de charge",
          width: 1200,
          height: 675,
          caption:
            "La durée calendaire ne correspond pas aux heures de pompe. Enregistrer heures actives, démarrages, pression, courant et température par état.",
        },
      ],
    },
    {
      title: "2. Moteur à balais et moteur sans balais",
      blocks: [
        {
          type: "paragraph",
          text:
            "Le moteur à courant continu à balais utilise un contact mécanique avec le collecteur, donc une usure et des arcs électriques. La commutation électronique supprime ce mécanisme, mais pas la durée de vie des roulements, bobinages, composants, membrane ou clapets.",
        },
        {
          type: "figure",
          src: `${LIFE_ASSET_BASE}/brushed-vs-brushless-commutation-en.webp`,
          alt: "Comparaison de la commutation mécanique et électronique",
          width: 1200,
          height: 675,
          caption:
            "Le sans-balais supprime l’usure des balais ; le reste du moteur et la tête de pompe restent à valider.",
        },
      ],
    },
    {
      title: "3. Reproduire la charge réelle et définir la défaillance avant l’essai",
      blocks: [
        { type: "formula", expression: "Pcopper = I²R" },
        {
          type: "figure",
          src: `${LIFE_ASSET_BASE}/lifetime-load-factors-en.webp`,
          alt: "Chaîne entre charge hydraulique, courant, température, contraintes et durée de vie",
          width: 1200,
          height: 675,
          caption:
            "Contre-pression, restriction d’entrée, PWM, démarrages, fluide et température peuvent modifier le mode de défaillance dominant.",
        },
        {
          type: "notice",
          text:
            "Définir avant l’essai les limites de démarrage, débit, courant, température, fuite, bruit et commande. Une pompe qui tourne encore peut déjà être hors spécification.",
        },
      ],
    },
    {
      title: "4. L’endurance d’une unité n’est pas une déclaration B10",
      blocks: [
        {
          type: "figure",
          src: `${LIFE_ASSET_BASE}/reliability-evidence-levels-en.webp`,
          alt: "Niveaux de preuve de l’endurance unitaire à la fiabilité statistique",
          width: 1200,
          height: 675,
          caption:
            "Une unité atteignant 10 000 h démontre cet essai individuel ; B10 exige des échantillons, des défaillances définies, une analyse statistique et un niveau de confiance.",
        },
        { type: "formula", expression: "R(t) = exp[-(t / η)^β]" },
        {
          type: "figure",
          src: `${LIFE_ASSET_BASE}/b10-weibull-reliability-en.webp`,
          alt: "Courbe de Weibull conceptuelle avec B10 à R de t égal à 0,9",
          width: 1200,
          height: 675,
          caption:
            "B10 est le temps correspondant à 10 % de défaillances cumulées dans le modèle. Le graphique ne représente pas des données mesurées d’un modèle FOREACH.",
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes",
  faqItems: [
    {
      question: "Une pompe miniature peut-elle fonctionner 24 h sur 24 ?",
      answer:
        "Elle ne doit être considérée en service continu que si la configuration est validée avec la tension, la pression, le fluide, la température et le refroidissement prévus. Les heures de vie continuent de s’accumuler.",
    },
    {
      question: "Pourquoi une version sans balais dure-t-elle souvent plus longtemps ?",
      answer:
        "Elle élimine l’usure mécanique balai-collecteur. Les roulements, bobinages, composants et la tête de pompe gardent leurs propres limites.",
    },
    {
      question: "Une unité ayant atteint 10 000 h permet-elle d’annoncer B10 ?",
      answer:
        "Non. B10 est une métrique de population qui exige plusieurs échantillons, une définition de défaillance, des données de durée de vie, un modèle statistique et une confiance.",
    },
  ],
  cta: {
    title: "Faut-il choisir une version 3 000 ou 10 000 heures ?",
    description:
      "Transmettez la durée de service cible, les heures quotidiennes, les démarrages, le fluide, les pressions, le PWM, la température et la maintenance afin de comparer balais et sans-balais.",
    contactLabel: "Contacter un ingénieur",
    productsLabel: "Voir les pompes à membrane",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
