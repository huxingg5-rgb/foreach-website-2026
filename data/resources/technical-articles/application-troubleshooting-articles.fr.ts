import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const LAB_WASTE_ASSET_BASE =
  "/images/resources/technical-articles/lab-liquid-waste-aspiration-troubleshooting";
const IVD_WASTE_ASSET_BASE =
  "/images/resources/technical-articles/ivd-waste-aspiration-pump-selection";
const GAS_LIQUID_PUMP_HREF =
  "/fr/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump";

export const labLiquidWasteAspirationTroubleshootingFrCopy = {
  metadata: {
    title:
      "Que faire si une pompe d’aspiration des effluents de laboratoire perd de la puissance ? Recherche de fuite, filtre colmaté et remontée de liquide",
    seoTitle:
      "Pompe d’aspiration des effluents : fuite, filtre colmaté et remontée de liquide",
    seoDescription:
      "La pompe d’aspiration des effluents de laboratoire aspire moins, n’aspire plus le liquide ou met plus de temps à établir le vide ? Contrôlez les fuites du couvercle et des conduites, le colmatage du filtre hydrophobe, l’antidébordement, l’embout et la remontée d’effluent, puis validez dépression, débit gazeux et système complet.",
    coverImage:
      LAB_WASTE_ASSET_BASE + "/waste-aspiration-protection-path-fr.webp",
    coverAlt:
      "Schéma d’un système d’aspiration sous vide comprenant pompe d’effluents de laboratoire, flacon collecteur, dispositif antidébordement et filtre hydrophobe",
  },
  deck: "Dans un système d’aspiration des effluents de laboratoire, la pompe se trouve généralement après le flacon collecteur, le dispositif antidébordement et le filtre hydrophobe ; elle crée une dépression en retirant le gaz du flacon. Lorsque l’aspiration diminue, il faut d’abord distinguer une évolution de la pompe d’une fuite, d’un filtre colmaté, de l’activation de l’antidébordement, d’un embout bouché ou d’une remontée d’effluent.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "La pompe d’aspiration des effluents de laboratoire est aussi appelée pompe d’aspiration sous vide ou pompe à vide pour effluents. Elle sert à recueillir milieux de culture, surnageants et solutions de lavage dans les opérations de culture cellulaire, de lavage de microplaques et sur les postes automatisés. Ce n’est pas un composant isolé : elle constitue la source de vide de toute la chaîne d’aspiration.",
    },
    {
      type: "notice",
      label: "Conclusion d’abord :",
      text: "La pompe extrait le gaz et établit la dépression ; le flacon collecteur, l’antidébordement et le filtre retiennent les effluents et la mousse en amont. Si la mesure de référence à la pompe reste normale et que le ralentissement n’apparaît qu’après reconnexion du système complet, contrôlez d’abord les périphériques au lieu de remplacer immédiatement la pompe par un modèle à dépression plus élevée.",
    },
  ],
  sections: [
    {
      title:
        "1. Quel est le rôle de la pompe d’aspiration des effluents dans le système ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le trajet type est « embout d’aspiration—tube d’aspiration—flacon collecteur—dispositif antidébordement—filtre hydrophobe—pompe d’aspiration ». Liquide, air et mousse entrent par l’embout ; en fonctionnement normal, les effluents restent dans le flacon. La pompe retire le gaz au-dessus du liquide et crée une différence de pression entre l’embout et le flacon.",
        },
        {
          type: "figure",
          src:
            LAB_WASTE_ASSET_BASE + "/waste-aspiration-protection-path-fr.webp",
          alt: "Position de la pompe d’aspiration des effluents de laboratoire après le flacon collecteur, l’antidébordement et le filtre hydrophobe",
          width: 1600,
          height: 900,
          caption:
            "Figure 1 | La pompe est la source de vide ; le flacon collecteur, l’antidébordement et le filtre sont les protections périphériques en amont. Le passage du liquide et de la mousse à travers la pompe ne doit pas être considéré comme un trajet normal.",
        },
        {
          type: "table",
          headers: [
            "Étape",
            "Milieu entrant dans l’embout",
            "Charge vue par la pompe",
            "Données à enregistrer",
          ],
          rows: [
            [
              "Contact avec la surface du liquide",
              "Principalement liquide",
              "La phase gazeuse du flacon est extraite en continu",
              "Temps d’aspiration, hauteur de colonne et volume résiduel",
            ],
            [
              "Baisse du niveau",
              "Alternance de liquide et d’air",
              "L’entrée d’air et la charge gazeuse augmentent",
              "Courbe de pression, hauteur de mousse et bruit",
            ],
            [
              "Fond atteint",
              "Principalement air",
              "Le point de fonctionnement devient l’extraction de gaz et le maintien du vide",
              "Pression stabilisée, durée d’aspiration à sec et échauffement",
            ],
            [
              "Remplissage excessif anormal",
              "Le liquide ou la mousse dépasse la protection",
              "Du liquide peut apparaître en amont de la pompe",
              "Niveau, temps de verrouillage et état du filtre",
            ],
          ],
        },
        {
          type: "notice",
          label: "Définition :",
          text: "Dans cet article, la « remontée de liquide » désigne le passage d’effluent ou de mousse au-delà du flacon collecteur, de l’antidébordement ou de la barrière filtrante, jusqu’à la conduite en amont de la pompe, voire dans sa chambre. Ce n’est pas une phase normale d’aspiration et la capacité gaz-liquide de la pompe ne doit pas constituer l’unique protection.",
        },
      ],
    },
    {
      title:
        "2. La capacité d’aspiration ne se juge pas uniquement à la dépression maximale",
      blocks: [
        {
          type: "paragraph",
          text: "La dépression maximale indique la limite de vide dont la pompe peut s’approcher ; le débit gazeux à vide indique l’ordre de grandeur transporté sous faible différence de pression. Ces deux valeurs ne correspondent pas au même point de fonctionnement. Avec les tubes, le filtre, le couvercle et les raccords installés, la vitesse d’aspiration réelle résulte à la fois de la courbe de pompe et des pertes de charge du système.",
        },
        {
          type: "formula",
          expression: "S_eq ≈ (V_g / t_build) × ln(p₀ / p₁)",
          note: "V_g est le volume gazeux réel pendant l’essai et t_build le temps nécessaire pour faire passer la pression absolue de p₀ à p₁. Cette relation permet de comparer la capacité équivalente de mise sous vide d’un même système, mais elle ne correspond pas au débit nominal de la pompe ; humidité, fuites, dégazage des matériaux et température modifient le résultat.",
        },
        {
          type: "table",
          headers: [
            "Observation",
            "Cause plutôt extérieure à la pompe",
            "Cause plutôt liée à la pompe ou à l’entraînement",
          ],
          rows: [
            [
              "Référence normale avec un tube court et propre, ralentissement sur l’équipement complet",
              "Filtre, fuite, tube, embout ou antidébordement",
              "Moins probable",
            ],
            [
              "Baisse progressive de la référence à la pompe et de l’équipement complet",
              "Vérifier aussi l’alimentation et l’environnement",
              "Contrôler clapets, membrane, entraînement ou usure",
            ],
            [
              "Le vide s’établit, mais l’aspiration du liquide reste lente",
              "Embout bouché, tube étroit, hauteur d’aspiration ou viscosité",
              "Ce seul constat ne prouve pas une défaillance de la pompe",
            ],
            [
              "Remontée rapide de la pression après arrêt de la pompe",
              "Fuite au couvercle, aux raccords, aux tubes ou à la limite antiretour",
              "Isoler par tronçons avant de conclure",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "La sélection technique doit spécifier simultanément le débit gazeux disponible à la dépression visée, le temps de mise sous vide d’un volume défini, l’échauffement en fonctionnement continu, les conditions d’alimentation et les pertes de charge du système complet. Une simple demande de « forte aspiration » ne permet pas de déterminer le point de fonctionnement dans l’équipement réel.",
        },
      ],
    },
    {
      title:
        "3. Fuite, filtre colmaté et remontée d’effluent laissent des indices différents",
      blocks: [
        {
          type: "table",
          headers: [
            "Défaut",
            "Manifestation habituelle",
            "Méthode de vérification sûre",
            "Point d’intervention",
          ],
          rows: [
            [
              "Fuite au couvercle ou au raccord",
              "La dépression cible n’est jamais atteinte et le bruit d’aspiration d’air persiste",
              "Isoler par tronçons et comparer les courbes pression-temps",
              "Joints, filetages, tubes et contraintes de montage",
            ],
            [
              "Filtre hydrophobe humide ou colmaté",
              "L’aspiration faiblit progressivement et la perte de charge du filtre augmente",
              "Remplacer par un filtre conforme aux consignes de maintenance, puis refaire l’essai",
              "Rechercher ensuite l’origine de la mousse, des gouttes et de la contamination",
            ],
            [
              "Tube ou embout obstrué",
              "Une seule branche est lente alors que la pompe établit encore le vide",
              "Rétablir la géométrie du tube, nettoyer l’embout et refaire l’essai",
              "Pli, écrasement, cristallisation et résidus protéiques",
            ],
            [
              "Antidébordement activé",
              "L’aspiration s’arrête ou le débit chute brutalement près du niveau plein",
              "Contrôler le niveau et l’état de réarmement selon la procédure",
              "Ne pas forcer le contournement de la protection pour poursuivre l’aspiration",
            ],
            [
              "Remontée d’effluent dans la pompe",
              "Liquide visible dans le filtre, bruit de pompe modifié ou échappement anormal",
              "Arrêter, isoler et évaluer conformément à la procédure de décontamination",
              "Ne pas supposer qu’un simple séchage suffit pour reprendre l’utilisation",
            ],
          ],
        },
        {
          type: "subheading",
          title: "Confirmer une fuite par la méthode de remontée de pression",
        },
        {
          type: "paragraph",
          text: "Dans un état propre, sec, thermiquement relativement stable et conforme à la procédure de maintenance, le système peut être évacué jusqu’à une pression absolue définie, puis la pompe isolée afin d’enregistrer la remontée de pression dans un volume gazeux connu. Des essais répétés et une référence prise sur un équipement neuf révèlent mieux la dégradation progressive de l’étanchéité qu’une appréciation fondée uniquement sur le bruit.",
        },
        {
          type: "formula",
          expression: "q_L = V_gas × (Δp / Δt)",
          note: "q_L est la charge gazeuse équivalente obtenue par la méthode de remontée de pression. V_gas doit être le volume gazeux réel et Δp la variation de pression absolue. L’évaporation d’un flacon humide, l’éclatement de mousse et le dégazage des matériaux augmentent aussi le résultat ; utilisez-le d’abord pour des comparaisons relatives dans les mêmes conditions, et non comme seuil universel d’acceptation.",
        },
        {
          type: "notice",
          label: "Limite du diagnostic :",
          text: "Ne retirez pas le flacon collecteur, le filtre ou l’antidébordement pour effectuer un essai de dérivation prolongé en présence d’effluents. Pour comparer la référence à la pompe, utilisez une limite d’essai contrôlée, propre et conforme à la procédure de maintenance de l’équipement.",
        },
      ],
    },
    {
      title:
        "4. La compatibilité doit couvrir effluent, vapeur et gouttes accidentelles",
      blocks: [
        {
          type: "paragraph",
          text: "En fonctionnement normal, la pompe d’aspiration touche principalement du gaz, mais elle peut aussi rencontrer des vapeurs d’effluent, des aérosols et des gouttes entraînées accidentellement. L’évaluation des matériaux ne doit pas s’arrêter au flacon et aux tubes : elle doit couvrir l’entrée de pompe, les matériaux en contact dans la chambre, la membrane, les clapets et la destination de l’échappement.",
        },
        {
          type: "table",
          headers: [
            "Informations à déclarer sur le milieu",
            "Pourquoi elles sont importantes",
            "Ce qui ne peut pas les remplacer",
          ],
          rows: [
            [
              "Composition, concentration, température et pH",
              "Déterminent gonflement, corrosion et charge de vapeur",
              "La mention « effluents de laboratoire » ne suffit pas",
            ],
            [
              "Mousse, protéines, particules et cristallisation",
              "Peuvent colmater embout, clapets et filtre",
              "Un essai avec un verre d’eau claire ne suffit pas",
            ],
            [
              "Désinfectants et procédure de nettoyage",
              "Le temps de séjour et l’ordre de mélange modifient le risque",
              "Le seul nom du matériau ne suffit pas",
            ],
            [
              "Risque biologique et volatilité",
              "Déterminent filtration, échappement et protection de maintenance",
              "L’étanchéité aux gaz ne vaut pas validation de biosécurité",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Les effluents infectieux, corrosifs, inflammables, volatils ou contenant des solvants organiques exigent une évaluation spécifique selon les règles EHS du laboratoire, la procédure de gestion des déchets et le milieu réel. Pouvoir aspirer du gaz ou traiter un mélange gaz-liquide ne démontre ni biosécurité, ni protection antidéflagrante, ni compatibilité avec tous les produits chimiques.",
        },
      ],
    },
    {
      title:
        "5. La validation du système doit réunir conditions normales, chargées et anormales",
      blocks: [
        {
          type: "table",
          headers: [
            "Condition d’essai",
            "Entrée maîtrisée",
            "À enregistrer au minimum",
            "Objectif",
          ],
          rows: [
            [
              "Référence propre de la pompe",
              "Volume gazeux, conduites, alimentation et température fixes",
              "Temps de mise sous vide, pression, courant, échauffement et bruit",
              "Établir une base de comparaison pour la pompe",
            ],
            [
              "Cycle réel d’effluents",
              "Liquide, mousse, durée à sec et cycle de fonctionnement réels",
              "Temps d’aspiration, volume résiduel et hauteur de mousse",
              "Vérifier l’accomplissement de la tâche",
            ],
            [
              "Chargement du filtre",
              "État simulé et défini d’humidité ou de contamination",
              "Perte de charge du filtre, temps de mise sous vide et alarme",
              "Confirmer le point de maintenance et sa détectabilité",
            ],
            [
              "Fuite légère maîtrisée",
              "Fuite répétable introduite à un emplacement sûr défini",
              "Remontée de pression, délai d’alarme et variation d’aspiration",
              "Distinguer aspiration d’air normale et défaut d’étanchéité",
            ],
            [
              "Niveau élevé et mousse",
              "Augmentation progressive du niveau et de la mousse",
              "Temps de verrouillage et présence de liquide en aval",
              "Valider la limite de protection contre le liquide",
            ],
            [
              "Arrêt et redémarrage",
              "Montage final, état après maintenance et durée d’arrêt maximale",
              "Première mise sous vide, temps de récupération et nombre d’anomalies",
              "Valider la reprise après utilisation prolongée",
            ],
          ],
        },
        {
          type: "notice",
          label: "Méthode d’acceptation :",
          text: "Ne cherchez pas une dépression, un taux de fuite ou une perte de charge de filtre fixes applicables à tous les laboratoires. L’analyse de risques doit d’abord définir les conséquences inacceptables, puis convertir le temps d’aspiration, le volume résiduel, la présence de liquide en aval, le délai d’alarme et l’intervalle de maintenance en limites de projet.",
        },
      ],
    },
    {
      title: "6. Si l’aspiration diminue, suivez ces six étapes",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Arrêtez le système et vérifiez s’il y a eu remplissage excessif, franchissement de la mousse ou remontée d’effluent ; pour un effluent dangereux, isolez d’abord selon la procédure.",
            "Contrôlez le niveau du flacon et l’activation éventuelle de l’antidébordement ; ne forcez pas son contournement.",
            "Vérifiez si le filtre hydrophobe est humide, contaminé, colmaté ou monté dans le mauvais sens.",
            "Contrôlez tubes, embout et branches en amont : pli, écrasement, déboîtement ou obstruction par des résidus.",
            "Recherchez les fuites au couvercle, aux joints et aux raccords, puis confirmez-les par tronçons avec la référence pression-temps.",
            "Après exclusion des défauts périphériques, contrôlez la pompe, l’alimentation, l’entraînement et la logique de commande à partir d’une référence propre.",
          ],
        },
        {
          type: "figure",
          src:
            LAB_WASTE_ASSET_BASE +
            "/waste-aspiration-troubleshooting-sequence-fr.webp",
          alt: "Séquence de diagnostic d’une pompe d’aspiration des effluents de laboratoire lorsque l’aspiration diminue : niveau, filtre, conduites, étanchéité et pompe",
          width: 1600,
          height: 900,
          caption:
            "Figure 2 | Contrôlez d’abord les périphériques, puis la pompe. Avant démontage, arrêtez le système, libérez la dépression et traitez les effluents selon leur risque et la procédure du laboratoire.",
        },
      ],
    },
    {
      title: "7. Conclusion technique, références et limites d’utilisation",
      blocks: [
        {
          type: "paragraph",
          text: "La pompe d’aspiration est la source de vide, pas le flacon collecteur. Lorsque l’aspiration diminue, comparer séparément la référence propre de la pompe et la courbe du système complet localise généralement le problème plus vite qu’une augmentation directe de la dépression maximale. La collecte, l’antidébordement, la filtration, la détection de fuite et les alarmes déterminent si l’anomalie reste confinée en amont de la pompe.",
        },
        {
          type: "links",
          items: [
            {
              prefix: "Application associée :",
              label: "Automatisation de laboratoire",
              href: "/fr/applications/lab-automation/",
              suffix: ".",
            },
            {
              prefix: "Référence :",
              label:
                "Présentation KNF des systèmes d’aspiration de fluides de laboratoire",
              href: "https://knf.com/en/global/solutions/lab-applications/fluid-aspiration",
              suffix: ".",
            },
            {
              prefix: "Référence :",
              label:
                "Protection et maintenance du système d’aspiration sous vide VACUSAFE d’INTEGRA",
              href: "https://www.integra-biosciences.com/global/en/aspiration-systems/vacusafe",
              suffix: ".",
            },
            {
              prefix: "Référence :",
              label:
                "Méthode de remontée de pression et calcul du taux de fuite d’un système de vide",
              href: "https://www.leybold.com/content/leybold/en-us/knowledge/vacuum-fundamentals/leak-detection/pressure-rise-and-drop-tests.html",
              suffix: ".",
            },
          ],
        },
        {
          type: "notice",
          label: "Limite d’utilisation :",
          text: "Cet article concerne la sélection et le diagnostic généraux des systèmes d’aspiration des effluents de laboratoire. Il ne constitue pas une classification de danger, ni une conclusion de compatibilité des matériaux, de biosécurité, de protection antidéflagrante ou d’aptitude médicale. Le milieu, l’installation, les risques et la durée de vie réels doivent être validés dans le projet.",
        },
      ],
    },
  ],
  faqTitle:
    "Questions fréquentes sur les pompes d’aspiration des effluents de laboratoire",
  faqItems: [
    {
      question: "Si l’aspiration diminue, que faut-il contrôler en premier ?",
      answer:
        "Arrêtez d’abord le système et vérifiez un remplissage excessif, un franchissement de mousse ou une remontée de liquide. Contrôlez ensuite, dans l’ordre, l’antidébordement, le filtre hydrophobe, les tubes et l’embout, puis les fuites au couvercle et aux raccords. Après exclusion des périphériques, vérifiez la pompe avec une référence propre.",
    },
    {
      question:
        "La pompe établit le vide, mais le liquide est toujours aspiré lentement. Pourquoi ?",
      answer:
        "L’établissement du vide prouve seulement que le circuit gazeux atteint une pression donnée. Un embout bouché, un tube étroit, une hauteur de colonne, un tube déformé, la viscosité de l’effluent ou la résistance du filtre peuvent encore limiter la vitesse d’aspiration réelle.",
    },
    {
      question:
        "Un filtre hydrophobe humide ou colmaté peut-il réduire l’aspiration ?",
      answer:
        "Oui. Humidité, contamination ou montage incorrect augmentent la résistance du circuit gazeux, avec un temps de mise sous vide plus long et une aspiration progressivement plus lente. Après remplacement, recherchez aussi l’origine de la mousse ou des gouttes.",
    },
    {
      question:
        "Comment identifier une fuite au couvercle, aux raccords ou aux tubes ?",
      answer:
        "Dans un état maîtrisé, propre, sec et thermiquement stable, isolez le système par tronçons et comparez la courbe de remontée de pression d’un volume gazeux connu. L’évaporation d’humidité et le dégazage des matériaux influencent aussi le résultat ; comparez donc avec une référence prise dans les mêmes conditions.",
    },
    {
      question:
        "La pompe peut-elle encore être utilisée après une remontée d’effluent ?",
      answer:
        "Un simple séchage ne permet pas de le présumer. Arrêtez et isolez l’équipement ; inspectez filtre, conduites et chambre de pompe conformément au risque du milieu, à la procédure de décontamination et aux consignes du fabricant, puis évaluez matériaux, performances et sécurité de l’échappement.",
    },
    {
      question:
        "La dépression maximale suffit-elle pour sélectionner une pompe d’aspiration des effluents ?",
      answer:
        "Non. Il faut aussi examiner le débit gazeux utile à la dépression visée, le volume gazeux du flacon, le temps de mise sous vide, les fuites, les pertes de filtration, l’échauffement continu, le cycle réel et les protections contre les anomalies.",
    },
  ],
  cta: {
    title:
      "Vous sélectionnez ou diagnostiquez une pompe d’aspiration des effluents de laboratoire ?",
    description:
      "Indiquez le type d’effluent, le temps d’aspiration visé, le volume du flacon, la dépression cible, le diamètre et la longueur des tubes, le filtre, l’antidébordement et les conditions anormales pour vérifier le point de fonctionnement, les limites de matériaux et le plan de validation du système.",
    contactLabel: "Contacter un ingénieur",
    productsLabel: "Voir les pompes à membrane gaz-liquide",
    productsHref: GAS_LIQUID_PUMP_HREF,
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const ivdWasteAspirationPumpSelectionFrCopy = {
  metadata: {
    title:
      "Aspiration des effluents IVD : pompe à liquide ou pompe à vide ? Différences entre aspiration directe et indirecte",
    seoTitle:
      "Effluents IVD : pompe à liquide ou à vide, aspiration directe ou indirecte",
    seoDescription:
      "Analyse du transfert direct par pompe à liquide, de l’aspiration indirecte sous vide et des conditions gaz-liquide pour les effluents de lavage d’aiguilles et de cuves IVD : trajet, débit, vide, antidébordement, matériaux et validation du système.",
    coverImage:
      IVD_WASTE_ASSET_BASE + "/ivd-direct-vs-vacuum-aspiration-fr.webp",
    coverAlt:
      "Comparaison du trajet du milieu entre transfert direct par pompe à liquide et aspiration indirecte sous vide des effluents IVD",
  },
  deck: "Dans les appareils IVD, le lavage des aiguilles, celui des cuves de réaction et l’évacuation courante sont tous appelés « aspiration des effluents ». Pourtant, selon que les effluents traversent directement une pompe à liquide ou entrent d’abord dans un flacon collecteur mis sous vide par une pompe, la logique de sélection change entièrement.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Avant toute sélection, répondez à quatre questions : les effluents traversent-ils la pompe ? L’air continue-t-il d’entrer après l’aspiration du liquide ? Le système exige-t-il une évacuation continue ou une purge courte et périodique ? Les effluents contiennent-ils mousse, particules, cristaux ou nettoyants corrosifs ?",
    },
    {
      type: "notice",
      label: "Différence essentielle :",
      text: "En transfert direct, la pompe assure le transport du liquide et touche tous les effluents. En aspiration indirecte sous vide, elle extrait surtout le gaz situé au-dessus du flacon et les effluents y restent normalement. La capacité gaz-liquide décrit un comportement vis-à-vis du milieu ; ce n’est pas une troisième architecture autorisant la suppression des protections.",
    },
  ],
  sections: [
    {
      title: "1. Tracer d’abord le trajet des effluents, puis choisir la pompe",
      blocks: [
        {
          type: "figure",
          src:
            IVD_WASTE_ASSET_BASE + "/ivd-direct-vs-vacuum-aspiration-fr.webp",
          alt: "Comparaison de la position de la pompe, du flacon collecteur et de l’antidébordement entre transfert direct et aspiration indirecte sous vide IVD",
          width: 1600,
          height: 900,
          caption:
            "Figure 1 | En transfert direct, les effluents traversent la pompe ; en aspiration indirecte, ils restent dans le flacon et la pompe établit le vide côté gaz. Les protections appartiennent au système et ne constituent pas des fonctions intégrées à la pompe.",
        },
        {
          type: "table",
          headers: [
            "Concept",
            "Milieu principal en contact avec la pompe",
            "Les effluents traversent-ils la tête ?",
            "Tâche principale",
          ],
          rows: [
            [
              "Transfert direct par pompe à liquide",
              "Effluents, avec bulles éventuelles",
              "Oui",
              "Envoyer directement les effluents vers le récipient",
            ],
            [
              "Aspiration indirecte sous vide",
              "Air, humidité et aérosols",
              "Non en fonctionnement normal",
              "Établir et maintenir la dépression du flacon collecteur",
            ],
            [
              "Capacité gaz-liquide",
              "Alternance de liquide, bulles et air",
              "Dépend de l’architecture",
              "Gérer aspiration à sec, bouchons liquides ou humidité, pas le dosage précis",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "La capacité gaz-liquide peut servir sur un trajet direct ou comme tolérance aux anomalies côté vide. Elle ne dispense pas de définir le milieu principal traité par la pompe, ni de conserver détection de niveau, antidébordement et filtration.",
        },
      ],
    },
    {
      title: "2. Les effluents IVD sont rarement un liquide unique et stable",
      blocks: [
        {
          type: "paragraph",
          text: "L’évacuation des postes de lavage d’aiguilles et des cuves de réaction est généralement intermittente : à l’ouverture de la vanne, le liquide entre d’abord ; des bulles apparaissent lorsque le niveau baisse ; une aspiration d’air peut se poursuivre après la disparition du liquide pour réduire le résidu. Les tensioactifs créent de la mousse, tandis que les restes de protéines ou de réactifs peuvent se déposer, cristalliser ou obturer de petits passages.",
        },
        {
          type: "table",
          headers: [
            "Phase du cycle",
            "État du milieu",
            "Paramètre souvent mal interprété",
            "Éléments à valider",
          ],
          rows: [
            [
              "Entrée de liquide",
              "Effluent continu ou intermittent",
              "Assimiler le débit gazeux à vide au débit liquide",
              "Volume réellement évacué, contre-pression, viscosité et résidu",
            ],
            [
              "Baisse du niveau",
              "Alternance de bouchons liquides et de bulles",
              "Ne regarder que le débit moyen",
              "Oscillations de pression, réamorçage et séquence des vannes",
            ],
            [
              "Aspiration à sec",
              "Principalement air",
              "Considérer la marche à sec sans effet",
              "Durée admissible à sec, échauffement, bruit et durée de vie",
            ],
            [
              "Repos après nettoyage",
              "Résidus, dépôts ou cristallisation",
              "Tester uniquement un équipement neuf à l’eau claire",
              "Redémarrage, récupération après nettoyage et étanchéité durable",
            ],
          ],
        },
        {
          type: "notice",
          label: "Limite des paramètres :",
          text: "Le débit gazeux à vide, le débit liquide continu et la vitesse réelle d’aspiration des effluents sont trois indicateurs différents. La dépression maximale ne signifie pas non plus que le débit à vide subsiste à cette pression. Le temps final d’évacuation doit être mesuré dans le circuit réel.",
        },
      ],
    },
    {
      title:
        "3. Transfert direct : trajet court, mais tous les risques passent par la pompe",
      blocks: [
        {
          type: "paragraph",
          text: "Le transfert direct place la pompe dans la conduite d’effluents. Il convient aux systèmes avec peu de branches, une évacuation continue ou un pilotage direct du transport liquide. En contrepartie, nettoyants, résidus d’échantillons, mousse, cristaux et particules entrent dans la tête ; membrane, clapets, chambre et contre-pression aval font alors partie de la validation.",
        },
        {
          type: "table",
          headers: [
            "Dimension",
            "Avantage du transfert direct",
            "Contrainte à assumer",
          ],
          rows: [
            [
              "Structure",
              "Trajet court et relativement peu de composants",
              "La pompe touche tous les effluents",
            ],
            [
              "Évacuation",
              "Envoi continu possible vers le réservoir d’effluents",
              "Contre-pression de sortie et retour doivent être maîtrisés",
            ],
            [
              "Branches multiples",
              "Chaque branche indépendante se règle facilement",
              "Le nombre de pompes ou de vannes commandées peut augmenter",
            ],
            [
              "Maintenance",
              "Pas de vidange périodique d’un flacon sous vide",
              "Résidus dans la pompe, nettoyage et dépôts sur les clapets deviennent plus critiques",
            ],
            [
              "Aspiration à sec",
              "Peut réduire le volume résiduel final",
              "Confirmer que la pompe accepte l’alternance gaz-liquide et le réamorçage",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Il ne suffit pas de vérifier que la pompe « parvient à aspirer le liquide ». Il faut aussi contrôler la transition du fonctionnement humide vers l’aspiration à sec, le réamorçage après cette phase, l’éventuelle perte d’étanchéité des clapets due aux dépôts après de nombreux cycles et le volume résiduel final dans la pire condition d’effluent.",
        },
      ],
    },
    {
      title:
        "4. Aspiration indirecte sous vide : pompe isolée des effluents, protections indispensables",
      blocks: [
        {
          type: "paragraph",
          text: "L’aspiration indirecte utilise une pompe à vide pour abaisser la pression de la phase gazeuse au-dessus du flacon collecteur et attirer les effluents par différence de pression. Une source de vide peut desservir plusieurs branches au moyen d’un bloc de vannes sans toucher directement la majeure partie des effluents ; mais récipient, niveau, filtration, antidébordement, mise à l’air et séquence de vannes doivent fonctionner ensemble.",
        },
        {
          type: "table",
          headers: [
            "Élément de protection",
            "Objectif principal",
            "Risque typique en cas d’absence",
          ],
          rows: [
            [
              "Flacon collecteur compatible avec le vide",
              "Contenir les effluents et supporter la différence de pression",
              "Déformation, fuite ou entrée de liquide dans la conduite de vide",
            ],
            [
              "Détection de niveau",
              "Déclencher alarme ou arrêt au niveau plein",
              "Les effluents et la mousse continuent de remonter",
            ],
            [
              "Dispositif antidébordement",
              "Empêcher un liquide anormal d’atteindre la pompe",
              "Contamination de la pompe, du filtre et de l’échappement",
            ],
            [
              "Filtration hydrophobe",
              "Limiter la migration des gouttes et aérosols",
              "Augmentation des pertes ou disparition de la protection aval",
            ],
            [
              "Mise à l’air et décompression",
              "Libérer la dépression avant maintenance",
              "Projection à l’ouverture ou flacon difficile à ouvrir",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "« La pompe ne touche pas les effluents » n’est qu’un objectif en fonctionnement normal. Mousse, remplissage excessif, défaillance du niveau ou condensation peuvent encore amener des gouttes côté vide ; une pompe à gaz ordinaire raccordée à un flacon vide ne constitue donc pas à elle seule un système complet d’aspiration des effluents.",
        },
      ],
    },
    {
      title:
        "5. Quand intégrer la capacité gaz-liquide dans les critères de sélection ?",
      blocks: [
        {
          type: "table",
          headers: [
            "Condition pouvant être évaluée",
            "Capacité qui ne peut pas en être déduite",
          ],
          rows: [
            [
              "Alternance répétée de bouchons liquides et d’air en fin de transfert direct",
              "Ne prouve pas un dosage précis d’échantillon ou de réactif",
            ],
            [
              "Effluents de lavage d’aiguille avec bulles ou mousse",
              "N’autorise pas n’importe quel volume de mousse, de particules ou de bouchon liquide",
            ],
            [
              "Purge périodique des conduites et brève aspiration à sec",
              "N’implique pas les mêmes performances en transfert continu de liquide pur",
            ],
            [
              "Contact possible du côté vide avec humidité ou faible condensation",
              "Ne permet pas de supprimer collecte, antidébordement ou filtration",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Si le liquide traverse la pompe par conception, précisez proportion gaz-liquide, durée des bouchons liquides, temps d’aspiration à sec, particules et mousse. Si la pompe se situe après le flacon, précisez volume gazeux, taux de fuite, perte de filtration et limite anormale de présence de liquide. Les matériaux des deux architectures doivent être validés avec le milieu réel.",
        },
        {
          type: "notice",
          label: "Séparation des fonctions :",
          text: "L’évacuation des effluents et le dosage des réactifs ont des objectifs de commande distincts. La pompe d’effluents ou à vide ne doit pas assurer en plus le dosage précis des échantillons ou réactifs ; la capacité gaz-liquide ne prouve ni faible pulsation ni distribution très répétable.",
        },
      ],
    },
    {
      title:
        "6. Transfert direct ou aspiration indirecte : choisir selon la tâche, pas un seul chiffre",
      blocks: [
        {
          type: "figure",
          src: IVD_WASTE_ASSET_BASE + "/ivd-waste-pump-decision-tree-fr.webp",
          alt: "Arbre de sélection pour l’aspiration des effluents IVD selon le passage du milieu dans la pompe, le besoin de débit continu et l’alternance gaz-liquide",
          width: 1600,
          height: 900,
          caption:
            "Figure 2 | La première question est de savoir si les effluents traversent la pompe ; viennent ensuite liquide continu, établissement du vide ou alternance gaz-liquide. Débit gazeux à vide, débit d’effluent et dépression maximale ne sont pas interchangeables.",
        },
        {
          type: "table",
          headers: [
            "Critère de sélection",
            "Transfert direct par pompe à liquide",
            "Aspiration indirecte sous vide",
          ],
          rows: [
            [
              "Les effluents traversent-ils la pompe ?",
              "Oui",
              "Non en fonctionnement normal",
            ],
            [
              "Évacuation continue",
              "Relativement simple",
              "Prévoir la vidange du flacon collecteur",
            ],
            [
              "Extension à plusieurs branches",
              "Ajouter des pompes ou des vannes commandées",
              "Une source de vide peut desservir plusieurs branches selon la séquence des vannes",
            ],
            [
              "Risque principal pour les matériaux",
              "Tous les effluents touchent directement la pompe",
              "Humidité, aérosols et remontée accidentelle",
            ],
            [
              "Point principal de maintenance",
              "Résidus internes, clapets et membrane",
              "Flacon, filtre, niveau et étanchéité",
            ],
            [
              "Critère clé d’acceptation",
              "Volume réellement évacué, aspiration à sec et réamorçage",
              "Temps de mise sous vide, interaction entre branches et antidébordement",
            ],
          ],
        },
        {
          type: "formula",
          expression: "Q_cycle = V_waste / t_cycle",
          note: "Q_cycle décrit uniquement le besoin moyen d’effluent par cycle. Le transfert direct doit aussi couvrir le débit instantané, la contre-pression de sortie et l’aspiration à sec. L’aspiration indirecte doit couvrir le volume gazeux du flacon, le temps de mise sous vide, les fuites et la récupération de pression après ouverture des vannes.",
        },
      ],
    },
    {
      title: "7. Six erreurs de sélection fréquentes et leur prévention",
      blocks: [
        {
          type: "table",
          headers: [
            "Erreur fréquente",
            "Pourquoi elle conduit à l’échec",
            "Prévention",
          ],
          rows: [
            [
              "Assimiler le débit gazeux à vide au débit d’effluent",
              "Le milieu d’essai et les pertes de charge diffèrent",
              "Mesurer temps d’évacuation et résidu dans le circuit réel",
            ],
            [
              "Comparer uniquement la dépression maximale",
              "La vitesse réelle dépend des conduites, vannes, filtres et fuites",
              "Enregistrer la courbe pression-temps du système complet",
            ],
            [
              "Dimensionner seulement avec le volume de solution de lavage",
              "Beaucoup d’air entre après le liquide",
              "Comptabiliser volume liquide, durée à sec et cycle",
            ],
            [
              "Omettre l’antidébordement en aspiration indirecte",
              "La mousse et le niveau plein peuvent atteindre le côté vide",
              "Prévoir niveau, arrêt, filtration et protection secondaire",
            ],
            [
              "Ne considérer que le nom du matériau",
              "Concentration, température et durée de contact modifient le résultat",
              "Valider immersion, circulation, nettoyage et durée de vie",
            ],
            [
              "Utiliser la pompe d’effluents pour un dosage précis",
              "Évacuation et dosage ont des objectifs différents",
              "Concevoir séparément dosage des réactifs et aspiration des effluents",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Les données significatives du système ne sont pas « aspire/n’aspire pas », mais le temps d’évacuation par cycle, le volume résiduel final, le réamorçage après aspiration à sec, les interactions entre branches, la perte de charge du filtre, le temps de mise sous vide du flacon, l’évolution des matériaux et la réponse de la protection au niveau plein.",
        },
      ],
    },
    {
      title:
        "8. Liste de validation après installation, références et limites d’utilisation",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Définir nettoyants, résidus d’échantillon, mousse, particules, cristaux et éventuelles vapeurs dangereuses.",
            "Confirmer si la pompe touche la majeure partie des effluents ou seulement le gaz humide au-dessus du flacon.",
            "Tester avec diamètre et longueur réels, vannes, filtre et niveau de liquide le plus défavorable.",
            "Mesurer temps d’évacuation par cycle, volume résiduel, durée à sec et capacité de réamorçage.",
            "Valider récupération de pression et interactions lorsque plusieurs branches agissent ensemble ou en séquence.",
            "Valider alarme de niveau, arrêt au niveau plein, antidébordement, mise à l’air et maintenance.",
            "Achever les validations de compatibilité, nettoyage, dépôts, cycles continus et durée de vie.",
          ],
        },
        {
          type: "links",
          items: [
            {
              prefix: "Application associée :",
              label: "Circuit fluidique des instruments de diagnostic in vitro",
              href: "/fr/applications/ivd/",
              suffix: ".",
            },
            {
              prefix: "Référence :",
              label:
                "Comparaison KNF du transfert direct de liquide et du transfert indirect sous vide",
              href: "https://knf.com/en/it/stories-events/news-stories/article/direct-liquid-transfer-vs-vacuum-over-liquid-transfer",
              suffix: ".",
            },
            {
              prefix: "Référence :",
              label:
                "Note KNF sur les effluents de lavage d’aiguilles et les conditions gaz-liquide",
              href: "https://knf.com/fileadmin/Local_files/USA/Downloads/OEM_Process_downloads/application_note/Application_Note_needle-washing_KNF_USA.pdf",
              suffix: ".",
            },
            {
              prefix: "Référence :",
              label:
                "Informations Iwaki sur les pompes de transfert gaz-liquide et de collecte d’effluents",
              href: "https://www.iwaki.hk/catalog/products_details.php?cPath=6&id=40&language=en",
              suffix: ".",
            },
          ],
        },
        {
          type: "notice",
          label: "Limite d’utilisation :",
          text: "Cet article traite le circuit général des effluents dans les appareils IVD et ne s’applique pas au dosage précis des échantillons ou réactifs. Avant l’intégration de toute pompe, il faut valider les risques du système, les matériaux, la durée de vie, la sécurité électrique médicale et les exigences du système qualité. Les milieux inflammables, toxiques ou corrosifs nécessitent une solution spécifique.",
        },
      ],
    },
  ],
  faqTitle:
    "Questions fréquentes sur la sélection pour l’aspiration des effluents IVD",
  faqItems: [
    {
      question:
        "Une dépression plus forte accélère-t-elle toujours l’aspiration des effluents IVD ?",
      answer:
        "Pas nécessairement. La vitesse réelle dépend aussi du diamètre et de la longueur des tubes, des vannes, de la perte de charge du filtre, des fuites, du volume du flacon et des propriétés du liquide. Une dépression excessive peut également accroître projections et mousse.",
    },
    {
      question:
        "Le débit gazeux à vide peut-il être converti directement en débit d’effluent liquide ?",
      answer:
        "Non. Le milieu, la pression et les pertes de charge du système diffèrent. Le débit d’effluent doit être mesuré avec les conduites, vannes, niveaux et contre-pression réels.",
    },
    {
      question:
        "Une pompe à liquide ordinaire peut-elle aspirer directement les effluents de lavage d’aiguilles ?",
      answer:
        "Il faut vérifier qu’elle accepte l’aspiration à sec et l’alternance gaz-liquide prévues, qu’elle peut se réamorcer et que ses matériaux sont compatibles ; mousse, résidus et dépôts à long terme doivent aussi être validés.",
    },
    {
      question:
        "L’aspiration indirecte garantit-elle que la pompe à vide ne touche jamais de liquide ?",
      answer:
        "Il n’existe pas de garantie absolue. Remplissage excessif, mousse, condensation ou défaillance d’une protection peuvent encore amener du liquide côté vide ; détection de niveau, antidébordement et filtration sont donc indispensables.",
    },
    {
      question:
        "Une pompe à vide peut-elle alimenter plusieurs branches d’effluents simultanément ?",
      answer:
        "Cela peut être évalué, mais il faut valider le nombre de branches ouvertes, la séquence des vannes, le volume du flacon, la récupération de pression et les interactions entre branches. Une fuite sur une branche peut ralentir les autres.",
    },
    {
      question:
        "Comment sélectionner les matériaux si les effluents contiennent hypochlorite, tensioactifs ou résidus protéiques ?",
      answer:
        "Le nom du matériau ne suffit pas. Validez immersion, circulation et durée de vie avec la concentration, la température, le temps de contact, le cycle de nettoyage et les dépôts réels, pour la pompe, les tubes, les vannes et les joints.",
    },
  ],
  cta: {
    title:
      "Vous comparez transfert direct et aspiration indirecte pour les effluents IVD ?",
    description:
      "Indiquez le volume d’effluent par cycle, la durée d’aspiration à sec, le nombre de branches, le volume du flacon, les conduites et vannes, le milieu réel, la mousse et la protection contre le niveau plein pour examiner l’architecture, le point de fonctionnement et la matrice de validation.",
    contactLabel: "Contacter un ingénieur",
    productsLabel: "Voir les pompes à membrane gaz-liquide",
    productsHref: GAS_LIQUID_PUMP_HREF,
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
