import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const ARTICLE_01_ASSET_BASE =
  "/images/resources/technical-articles/300-vs-600-ml-min-diaphragm-pump-selection";
const ARTICLE_02_ASSET_BASE =
  "/images/resources/technical-articles/300-ml-min-diaphragm-pump-flow-margin";

export const diaphragmPump300Vs600SelectionFrCopy = {
  metadata: {
    title:
      "Comment choisir entre des micropompes à membrane de 300 et 600 mL/min ? Calculez d'abord le débit requis, puis le point de fonctionnement réel",
    seoTitle:
      "Micropompe à membrane de 300 ou 600 mL/min : débit et point de fonctionnement | FOREACH",
    seoDescription:
      "Comparer des micropompes à membrane de 300 et 600 mL/min ne se limite pas au débit à vide. Ce guide relie le volume par cycle, le temps de pompage effectif, la pression du circuit, la courbe de pompe et la validation sur prototype.",
    coverImage: `${ARTICLE_01_ASSET_BASE}/article-cover.webp`,
    coverAlt: "Micropompes à membrane FOREACH et essai de débit dans une vidéo Douyin officielle",
  },
  deck:
    "300 et 600 mL/min désignent des classes de débit, pas des valeurs fixes une fois la pompe intégrée. Il faut convertir la tâche liquide en débit minimal, déterminer la pression exigée par le circuit réel, puis confirmer le point de fonctionnement à l'aide de la courbe de pompe et d'un essai sur prototype.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Pour les tâches de nettoyage, de remplacement du fluide, de préremplissage, de circulation et d'évacuation des déchets, l'équipement n'a pas besoin d'une valeur de catalogue isolée de ses conditions, mais d'atteindre le volume cible dans le délai et le circuit prescrits. Les pompes des classes 300 mL/min et 600 mL/min ne sont comparables que si le débit et la pression sont rapportés au même point de fonctionnement.",
    },
    {
      type: "notice",
      label: "Conclusion du projet :",
      text: "Calculez d'abord le débit requis, puis calculez ou mesurez la différence de pression du système à ce débit cible. Consultez ensuite la courbe débit-pression officielle et vérifiez-la sur le circuit complet du prototype. Ne combinez pas le débit à vide et la pression nominale pour créer un point de fonctionnement inexistant.",
    },
  ],
  sections: [
    {
      title: "1. Replacer d'abord « 300 » et « 600 » dans leurs conditions d'essai",
      blocks: [
        {
          type: "paragraph",
          text: "300 mL/min ou 600 mL/min dans les spécifications des micropompes à membrane décrit généralement le débit à vide ou le débit maximum dans des conditions spécifiées de fluide, d'alimentation électrique et de faible différence de pression. Une fois la pompe installée dans l'instrument, le tuyau d'aspiration, le tuyau de refoulement, la vanne, le connecteur, le filtre, la cellule d'écoulement, l'aiguille, la différence de niveau de liquide et la viscosité moyenne modifieront la différence de pression à travers la pompe et le débit réel se déplacera vers un autre point de la courbe.",
        },
        {
          type: "figure",
          src: `${ARTICLE_01_ASSET_BASE}/article-figure-en.webp`,
          alt: "Processus de sélection de micropompe à membrane à partir du débit requis par la tâche, de la résistance du système au point de fonctionnement réel",
          width: 2560,
          height: 1920,
          caption:
            "Chemin de sélection pour les micropompes à membrane de 300 mL/min et 600 mL/min. Les courbes et valeurs de la figure sont utilisées pour illustrer la méthode et ne représentent pas les courbes réelles mesurées de modèles spécifiques.",
        },
        {
          type: "table",
          headers: ["quantité à comparer", "sens correct", "ne devrait pas être compris de cette façon"],
          rows: [
            [
              "Flux à vide",
              "Spécifiez les points de terminaison du débit ou les niveaux de débit dans des conditions de faible charge",
              "L'appareil peut produire en continu ce débit sous n'importe quelle contre-pression.",
            ],
            [
              "Pression nominale",
              "Les indicateurs de capacité de pression peuvent être utilisés dans des conditions spécifiées",
              "La pompe maintient toujours un débit à vide sous cette pression",
            ],
            [
              "Point de fonctionnement réel",
              "L'intersection de la courbe de la pompe et de la courbe du système actuel",
              "Peut être déterminé en fonction du modèle de pompe ou de la pression statique de sortie uniquement",
            ],
          ],
        },
      ],
    },
    {
      title: "2. Étape 1 : Calculez le débit minimum en utilisant le volume de la tâche et le temps de pompage effectif",
      blocks: [
        {
          type: "formula",
          expression: "Qrequired = Vtask ÷ teffective",
          note: "V tâche est le volume unique de livraison, de nettoyage ou de déchets, et t efficace est le temps de pompage réel autorisé dans le programme. Si mL est utilisé pour V et min est utilisé pour t, le résultat est directement mL/min ; si s est utilisé pour t, mL/s est obtenu en premier, puis multiplié par 60 pour convertir en mL/min.",
        },
        {
          type: "paragraph",
          text: "Les battements de l’équipement ne correspondent souvent pas au temps de pompage effectif. Les délais de commutation des vannes, d'évaluation du niveau, de trempage, de ventilation et de contrôle occupent des cycles, et ces phases sans pompage doivent être déduites du temps de cycle total lors du calcul. Si le programme comporte un segment de purge rapide à court terme, la demande moyenne et la demande de pointe du segment doivent également être définies séparément.",
        },
        {
          type: "table",
          headers: [
            "Indiquer les tâches (cas non clients)",
            "Volume de tâches",
            "Temps de pompage efficace",
            "débit moyen le plus bas",
            "Points clés à vérifier plus tard",
          ],
          rows: [
            ["Préremplissage de petit volume", "120 mL", "45 s", "160 mL/min", "Démarrage, auto-amorçage et purge d'air"],
            ["Nettoyage rapide", "400 mL", "60 s", "400 mL/min", "Chute de pression dans les canalisations à haut débit"],
            ["cycle des déchets", "250 mL", "50 s", "300 mL/min", "Changements de niveau de liquide et contre-pression aux bornes"],
          ],
        },
        {
          type: "notice",
          label: "Inspection de l'unité :",
          text: "Par exemple, 120 mL ÷ 45 s = 2,667 mL/s ; convertie en minutes, elle est de 160 mL/min. L'unité de temps n'est pas unifiée, ce qui est l'endroit le plus susceptible de provoquer une erreur de 60 fois dans le calcul du débit requis par la tâche.",
        },
      ],
    },
    {
      title: "3. Étape 2 : Écrire la résistance du trajet du liquide dans un bilan de pression directionnelle",
      blocks: [
        {
          type: "paragraph",
          text: "Définissez d'abord le sens d'écoulement de la source vers le terminal et utilisez partout soit la pression relative, soit la pression absolue. La différence de pression que la pompe doit fournir au débit cible Q peut alors être décomposée selon la formule suivante ; les pertes régulières et singulières sont comptées positivement dans le sens de l'écoulement.",
        },
        {
          type: "formula",
          expression:
            "ΔPrequired(Q) = ΔPfriction(Q) + ΣΔPlocal(Q) + [Pterminal − Psource] + ρg[zterminal − zsource]",
          note: "La différence zterminal − zsource est signée : elle est positive lorsque le terminal se trouve au-dessus de la source, car la pompe doit vaincre la pression statique, et négative lorsque la gravité favorise l'écoulement. Pterminal − Psource est calculé avec la même référence de pression et conserve également son signe.",
        },
        {
          type: "paragraph",
          text: "Cette relation est utilisée pour éviter les termes manquants et ne signifie pas que tous les composants peuvent être prédits avec précision à l'aide d'une formule simplifiée. Les composants clés tels que les filtres, les vannes, les aiguilles et les cellules d'écoulement doivent donner la priorité à la courbe de chute de pression du fabricant ou aux données réelles mesurées au débit correspondant ; le côté aspiration doit également vérifier séparément la pression absolue d'entrée, le réapprovisionnement en fluide et le risque de cavitation.",
        },
        {
          type: "table",
          headers: ["Source de résistance", "pourquoi des changements", "Impact sur la sélection"],
          rows: [
            ["canalisation", "Différents diamètres intérieurs, longueurs, courbures et déformations des tuyaux", "La même pompe a des débits différents dans des tuyaux différents"],
            ["Vannes et raccords", "Le diamètre interne, le Cv/Kv et la réduction locale sont différents", "Peut devenir le goulot d'étranglement de toute la ligne de liquide"],
            ["filtrer", "La chute de pression est différente entre les pièces neuves et après chargement", "Devrait couvrir les États proches du point de remplacement"],
            ["Niveau de liquide et pression du récipient", "Modifications du niveau de liquide source, de la hauteur du terminal ou de la pression du récipient", "Changera le terme de pression statique et les conditions d’entrée"],
            ["structure terminale", "Résistance à l'aiguille, à la buse, à la chambre à pression positive ou à la Flow Cell", "Peut transformer les problèmes de débit en problèmes de contre-pression élevée"],
          ],
        },
      ],
    },
    {
      title: "4. Exemple avec les paramètres publics de FOREACH : un débit supérieur n'implique pas une capacité supérieure sur tous les plans",
      blocks: [
        {
          type: "paragraph",
          text: "Les DPL30 et DPL60 dans les informations publiques de FOREACH peuvent être utilisés pour illustrer différentes dimensions de paramètres. Les niveaux de débit à vide des deux sont différents, la pression nominale publique est de 100 kPa et les hauteurs d'auto-amorçage sont respectivement de 6 mH₂O et 3 mH₂O. Le débit, l'auto-amorçage et la pression doivent être vérifiés séparément.",
        },
        {
          type: "table",
          headers: ["Comparer les dimensions", "Paramètres représentatifs du DPL30", "Paramètres représentatifs du DPL60", "Signification de la sélection"],
          rows: [
            ["débit public à vide", "300 mL/min", "600 mL/min", "Le point final de faible différence de pression ne constitue pas une valeur garantie pour la machine installée."],
            ["Évaluation de la pression publique", "100 kPa", "100 kPa", "Le débit disponible doit être lu à la pression cible"],
            ["Hauteur publique auto-amorçante", "6 mH₂O", "3 mH₂O", "Un débit plus élevé ne signifie pas un auto-amorçage plus élevé"],
            ["Connexions couramment utilisées", "Tuyau de 3,2 mm de diamètre intérieur", "Tuyau de 3,2 mm de diamètre intérieur", "Même interface ne signifie pas même résistance du système"],
            [
              "Prioriser les scénarios d’évaluation",
              "Débit de service réduit ou concentration accrue sur la hauteur d'aspiration",
              "Transferts de plus grands volumes, changements de fluide ou nettoyage rapides",
              "Le point de fonctionnement réel reste la référence finale",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Si la restriction principale provient d'une aiguille fine, d'un tube étroit, d'un filtre ou d'une chambre à pression positive, vérifiez d'abord la différence de pression totale au débit cible. Lorsque les plates-formes à flux ordinaires n'ont pas une capacité suffisante dans ce domaine, les plates-formes haute pression telles que la DPL30H doivent être évaluées au lieu de simplement remplacer 300 mL/min par 600 mL/min.",
        },
        {
          type: "links",
          items: [
            {
              prefix: "Voir",
              label: "Pompe à membrane liquide DPL30",
              href: "/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump",
              suffix: ".",
            },
            {
              prefix: "Voir",
              label: "Pompe à membrane liquide DPL60",
              href: "/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump",
              suffix: ".",
            },
            {
              prefix: "Comprendre",
              label: "Méthode de lecture de la courbe débit-pression de la micropompe à membrane",
              href: "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide",
              suffix: ".",
            },
          ],
        },
      ],
    },
    {
      title: "5. Placez les pompes candidates au même point de fonctionnement pour comparaison.",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Notez le volume de la tâche, la durée de pompage effective, le nombre de cycles par jour et s'il y a des périodes de débit de pointe.",
            "Dessinez le chemin complet du fluide de la source à l'extrémité, en enregistrant le diamètre du tuyau, la longueur du tuyau, les vannes, les raccords, les filtres, les aiguilles, les chambres, les pressions des récipients et les différences de hauteur signées.",
            "Calculez ou mesurez la perte d'entrée, la perte de sortie et la différence de pression à travers la pompe au débit cible.",
            "Alignez les définitions de fluide, de température, d’alimentation électrique, de vitesse et de pression de la courbe de pompe candidate pour lire le débit disponible autour de la pression différentielle cible.",
            "Couvre les niveaux de liquide minimum, la charge du filtre, la tension minimale autorisée, les limites des supports et les différences d'échantillons pour confirmer que les conditions de fonctionnement les plus défavorables répondent toujours à la mission.",
            "Vérifiez ensuite l'auto-amorçage, les matériaux, la durée de vie, le bruit, l'échauffement, la plage de contrôle et l'espace d'installation, et publiez-le dans le prototype complet.",
          ],
        },
      ],
    },
    {
      title: "6. La vérification du prototype doit couvrir la ligne de base et les conditions les plus défavorables",
      blocks: [
        {
          type: "table",
          headers: ["variables", "conditions de base", "conditions les plus défavorables", "enregistrement suggéré"],
          rows: [
            ["Niveau du réservoir", "Niveau de liquide maximum ou commun", "Niveau de liquide minimum autorisé", "Pression d'entrée, heure de démarrage, débit"],
            ["filtrer", "nouvelles pièces", "Chute de pression équivalente près du point de remplacement", "Différence de pression du filtre et débit de la pompe"],
            ["Alimentation", "Tension nominale", "Tension minimale admissible à l'extrémité de la pompe", "Tension, courant, vitesse et démarrage"],
            ["Fluide", "Température et viscosité de référence", "Limites admissibles", "Débit, bulles et réponse des clapets"],
            ["Échantillons de pompe", "Plusieurs échantillons initiaux", "Échantillons peu performants ou à différents stades de vie", "Moyenne, dispersion, tendance et fuites"],
          ],
        },
        {
          type: "notice",
          label: "Limites des preuves :",
          text: "Les paramètres de cet article expliquent le référentiel de sélection publié ; les formules et les exemples servent à une première évaluation technique. Le résultat final doit reposer sur des spécifications contrôlées, des courbes officielles, le fluide réel et des essais sur le prototype complet.",
        },
      ],
    },
    {
      title: "Conclusion : Choisissez le point de fonctionnement qui répond à la tâche, pas une référence plus grande",
      blocks: [
        {
          type: "paragraph",
          text: "Une pompe de la classe 300 mL/min peut mieux convenir à un besoin de débit modéré avec une hauteur d'aspiration exigeante ; une pompe de 600 mL/min peut être plus adaptée aux changements rapides de fluide et aux transferts de plus grand volume. Toute conclusion doit toutefois préciser la version de pression, le niveau de liquide, le fluide, l'alimentation et la version du circuit. Réunir le débit requis, la différence de pression du système et la courbe de pompe dans une même matrice de validation évite le sous-dimensionnement comme le surdimensionnement inutile.",
        },
      ],
    },
  ],
  faqTitle: "FAQ｜Sélection de micropompes à membrane de 300 mL/min et 600 mL/min",
  faqItems: [
    {
      question: "L'équipement nécessite 300 mL/min. Dois-je sélectionner directement une pompe de 600 mL/min et laisser une marge ?",
      answer:
        "Cela ne peut pas être jugé directement. La différence de pression, le niveau de liquide, le fluide et le temps de pompage effectif correspondant à la demande de 300 mL/min doivent d'abord être clarifiés, puis la courbe de pompe candidate doit être lue. Une plate-forme surdimensionnée peut également réduire la résolution du contrôle à basse vitesse et augmenter le bruit, l'ondulation, la consommation d'énergie et les coûts d'espace.",
    },
    {
      question: "Si la vitesse de la pompe de 600 mL/min est réglée à 300 mL/min, est-ce équivalent à une pompe de 300 mL/min ?",
      answer:
        "Pas équivalent. La chambre de pompe, la réponse de la valve, l'auto-amorçage, la pulsation, le moteur et la stabilité à basse vitesse des deux types de produits peuvent être différents. Le réglage de la vitesse modifiera également la courbe de la pompe et doit être testé à la vitesse cible et à la contre-pression réelle.",
    },
    {
      question: "Pourquoi les DPL30 et DPL60 ne sont-ils pas interchangeables même s'ils ont tous deux une pression nominale de 100 kPa ?",
      answer:
        "La pression nominale n'est qu'une seule dimension. Différents débits à vide, hauteurs d'auto-amorçage, puissance, structure, courbe de travail et plage de contrôle déterminent leurs plages de travail disponibles dans l'équipement.",
    },
    {
      question: "Quand faut-il passer d’une plateforme de débit conventionnelle à une pompe à membrane haute pression ?",
      answer:
        "Lorsque la différence de pression totale du système au débit cible est proche ou dépasse la courbe disponible d'une pompe conventionnelle et que la résistance principale provient d'aiguilles fines, de tubes étroits, de filtres, de chambres à pression positive ou d'extrémités à haute résistance, une plate-forme de pression plus élevée doit être évaluée et la pression de service admissible de l'ensemble de la conduite de liquide doit être vérifiée simultanément.",
    },
  ],
  cta: {
    title: "Besoin de comparer des pompes à membrane de 300 mL/min à des pompes à membrane de 600 mL/min ?",
    description:
      "Le volume de la tâche, le temps de pompage effectif, le fluide, le diamètre du tuyau, la longueur du tuyau, le niveau de liquide, la pression d'entrée, la contre-pression de sortie, les vannes, les filtres et les conditions d'alimentation électrique peuvent être fournis pour faciliter l'évaluation des pompes candidates en fonction de points de fonctionnement réels.",
    contactLabel: "Contacter un ingénieur",
    productsLabel: "Voir les produits de pompes à membrane",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const diaphragmPump300MlMinFlowMarginFrCopy = {
  metadata: {
    title: "Quelle marge de débit prévoir lors de l'intégration d'une micropompe à membrane de 300 mL/min ? Exemple FOREACH",
    seoTitle:
      "Marge de débit d'une micropompe de 300 mL/min : pire cas et critères d'acceptation | FOREACH",
    seoDescription:
      "La marge de débit installé d'une micropompe à membrane de 300 mL/min n'est pas un pourcentage fixe. Le guide définit des scénarios de pire cas et intègre contre-pression, colmatage du filtre, alimentation, fluide, dispersion des échantillons, incertitude de mesure et critères d'acceptation.",
    coverImage: `${ARTICLE_02_ASSET_BASE}/article-cover.webp`,
    coverAlt: "Essai de débit d'une micropompe à membrane FOREACH dans une vidéo Douyin officielle",
  },
  deck:
    "La marge ne s'obtient pas en multipliant systématiquement le débit cible par 1,2 ou 1,3. Elle compare le débit disponible conservateur à la demande maximale dans un même scénario de pire cas, selon une méthode prédéfinie de traitement de l'incertitude et des critères d'acceptation explicites.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Chaque circuit consomme la marge différemment : la perte de charge du filtre augmente avec son colmatage ; le niveau minimal dégrade les conditions d'entrée ; et la viscosité, l'alimentation, les tolérances de tuyauterie, la dispersion entre pompes et les stades de vie déplacent aussi le point de fonctionnement. Soustraire la demande moyenne aux 300 mL/min à vide ne produit pas à lui seul une marge démontrable pour la libération.",
    },
    {
      type: "notice",
      label: "Conclusion du projet :",
      text: "Définissez d'abord la demande maximale de l'appareil, puis obtenez un débit disponible prudent pour chacun des pires scénarios pouvant se produire. Ce n'est que lorsque la limite inférieure du débit disponible dans le même scénario correspond à la limite supérieure de la demande et à la marge minimale spécifiée par le projet que la marge peut être jugée suffisante.",
    },
  ],
  sections: [
    {
      title: "1. Pourquoi n'est-il pas rigoureux d'appliquer systématiquement une marge de 20 % ou 30 % ?",
      blocks: [
        {
          type: "paragraph",
          text: "20 à 30 % peuvent être utilisés comme rappel lors de la phase de conception, mais ils ne doivent pas devenir directement la norme de publication pour tous les projets. Certains équipements sont principalement affectés par la chute de pression à la fin de la durée de vie du filtre, et d'autres sont affectés par le niveau minimum de liquide, la viscosité à basse température ou la tension aux bornes de la pompe ; les sources des changements et les conséquences admissibles sont différentes, et les marges requises sont également différentes.",
        },
        {
          type: "figure",
          src: `${ARTICLE_02_ASSET_BASE}/article-figure-en.webp`,
          alt: "La limite supérieure de la demande et la limite inférieure disponible sont combinées pour calculer la marge de débit conservatrice de la micropompe à membrane et passent par les deux portes de libération.",
          width: 2560,
          height: 2160,
          caption:
            "La marge de débit doit comparer la demande maximale à la capacité disponible dans les conditions d'exploitation les plus défavorables, plutôt que de comparer le débit cible au débit à vide. La courbe de la figure est une représentation schématique de la méthode.",
        },
        {
          type: "paragraph",
          text: "Le calcul du solde inclut à la fois l’augmentation de la demande et la diminution de l’offre. Du côté de la demande, il convient de couvrir le volume de tâches maximal, la durée effective la plus courte et la tolérance autorisée ; le côté alimentation doit couvrir la pression réelle, l’alimentation électrique, les médias, les filtres, les différences d’échantillons et les étapes de vie.",
        },
      ],
    },
    {
      title: "2. Écrivez la marge dans une relation vérifiable",
      blocks: [
        {
          type: "formula",
          expression: "M = Qavailable,worst ÷ Qrequired,max − 1",
          note: "Qavailable,worst doit provenir de la courbe ou d'une mesure réelle à la pression prescrite et dans le scénario le plus défavorable ; il ne peut pas être remplacé par la valeur à vide de 300 mL/min. Qrequired,max est déterminé à partir du volume maximal de la tâche, du temps de pompage effectif le plus court et de la tolérance sur le besoin.",
        },
        {
          type: "paragraph",
          text: "Le M donné par la formule n'appartient qu'au scénario défini. Si la version du circuit liquide, l'état du filtre, le média, le contrôle de la pompe ou les limites environnementales changent, ils doivent être recalculés ou testés, et le pourcentage obtenu à un moment donné ne peut pas être copié directement sur un autre équipement.",
        },
      ],
    },
    {
      title: "3. Les conditions les plus défavorables ne doivent être combinées que si elles peuvent coexister dans un même scénario",
      blocks: [
        {
          type: "paragraph",
          text: "Le pire des cas est de ne pas superposer mécaniquement les valeurs extrêmes de chaque colonne du tableau. Il doit décrire un ensemble de conditions qui peuvent réellement se produire dans un appareil au cours d'une certaine phase de fonctionnement, état du cycle de vie et conditions environnementales, et expliquer pourquoi chaque condition existe en même temps. Les limites qui ne peuvent pas se produire simultanément doivent être divisées en plusieurs scénarios et évaluées séparément.",
        },
        {
          type: "table",
          headers: ["Traitement de scène", "Exemple", "Méthode comptable"],
          rows: [
            [
              "Peut être combiné",
              "Si les spécifications permettent à l'unité de démarrer à basse température, tension minimale aux bornes de la pompe, niveau de liquide minimum et lorsque le filtre est proche du point de changement",
              "En tant que test de scénario de démarrage à basse température en fin de vie, fondé sur des données probantes",
            ],
            [
              "doit être évalué séparément",
              "Basse température, viscosité élevée et température maximale du liquide appartiennent à des limites environnementales mutuellement exclusives.",
              "Créez séparément des scènes à basse température et des scènes à haute température, et ne les superposez pas dans le même calcul.",
            ],
            [
              "Besoin de preuves supplémentaires",
              "Multipliez la durée de vie de la pompe, les échantillons aux performances les plus faibles et les tolérances extrêmes du diamètre des tuyaux par le pire des cas en un seul point.",
              "Confirmer la corrélation statistique, la couverture de l'échantillon et les sources de tolérance avant de définir des limites prudentes",
            ],
          ],
        },
        {
          type: "notice",
          label: "Enregistrement de scène :",
          text: "Chaque scénario le plus défavorable doit au moins comporter un nom, une étape du cycle de vie, la version du circuit de fluide, le fluide et la température, l'alimentation électrique, le niveau de fluide, l'état du filtre, l'état de l'échantillon de la pompe et les procédures de contrôle. De cette manière, le test peut être reproduit et les valeurs extrêmes mutuellement exclusives peuvent être évitées pour former des états de périphérique inexistants.",
        },
      ],
    },
    {
      title: "4. Quels facteurs consommeront la marge de débit ?",
      blocks: [
        {
          type: "table",
          headers: ["facteurs", "Que vérifier", "Pourquoi le solde est-il consommé ?"],
          rows: [
            ["Demande maximale d'équipement", "Volume maximum, durée de validité minimale, segment de pointe et tolérance du programme", "La demande moyenne peut sous-estimer la valeur maximale"],
            ["pression du système", "Pression d'entrée, pression de sortie et différence de pression totale au débit cible", "Le débit diminue généralement à mesure que la différence de pression augmente"],
            ["état du filtre", "Pièces neuves, courbes de chargement et chute de pression à proximité du point de remplacement", "Le point d'exploitation évoluera vers un débit plus faible à mesure qu'il se chargera"],
            ["Tuyauterie et assemblage", "Diamètre intérieur réel, longueur, courbure, diamètre de raccord et tolérance du lot", "La réduction locale du diamètre peut devenir la principale résistance"],
            ["Fluide et environnement", "Viscosité, température, dégazage, particules et réponse des clapets", "Les courbes publiques obtenues avec de l'eau ne représentent pas nécessairement le fluide réel"],
            ["Puissance et contrôle", "Tension minimale de la pompe, limite de courant, plage PWM et perte de pression du faisceau", "La vitesse et la capacité de démarrage peuvent diminuer"],
            ["Échantillons et durée de vie", "Dispersion de pompes multiples, rodage, heures de fonctionnement et tendances de performances", "Un seul échantillon initial ne peut pas représenter la production de masse et les étapes de vie."],
            ["Système de mesure", "Méthode de débit, temps d'échantillonnage, étalonnage, répétabilité et effets environnementaux", "L’incertitude des mesures comprime les marges démontrables"],
          ],
        },
      ],
    },
    {
      title: "5. Intégrer l'incertitude de mesure aux critères d'acceptation",
      blocks: [
        {
          type: "paragraph",
          text: "Le même débit réel peut également donner des résultats différents en raison de la précision du débitmètre, de la résolution de pesée, de la conversion de densité, du temps d'échantillonnage, de la pulsation et de la répétabilité. Les projets doivent déterminer des budgets d'incertitude, des règles de couverture et des règles de décision avant les tests, plutôt que des interprétations ad hoc lorsque les résultats approchent des limites.",
        },
        {
          type: "formula",
          expression: "Mconservative = Qavailable,lower ÷ Qrequired,upper − 1",
          note: "Qavailable,lower est établi à partir de l'essai du scénario le plus défavorable, en intégrant l'incertitude de mesure, la répétabilité et les règles de couverture des échantillons. Qrequired,upper inclut le volume de la tâche, le temps effectif et la tolérance de commande. Le projet doit définir à l'avance le niveau de confiance statistique ou la règle de couverture technique appliquée aux deux limites.",
        },
        {
          type: "table",
          headers: ["Élément de libération", "Critère préliminaire recommandé"],
          rows: [
            [
              "Capacité de débit",
              "Qavailable,lower ≥ Qrequired,upper ; si le projet fixe également une marge minimale Mmin, il faut aussi respecter Mconservative ≥ Mmin",
            ],
            ["Démarrage et auto-amorçage", "Chaque scénario prescrit atteint le taux de réussite défini par le projet et le temps de démarrage maximum"],
            ["limite de pression", "L'état stable et l'état transitoire autorisé ne dépassent pas les limites de fonctionnement autorisées de chaque composant du circuit liquide dans le contexte et la température réels."],
            ["Élévation électrique et de température", "La tension aux bornes de la pompe, le courant, la protection du variateur et l'augmentation de température en régime permanent sont tous dans les limites de conception."],
            ["Répétabilité et couverture des échantillons", "Le nombre d'échantillons spécifié, le nombre de répétitions et les étapes de vie répondent tous aux mêmes critères"],
          ],
        },
        {
          type: "paragraph",
          text: "Si le projet utilise une règle de détermination avec une bande de garde, la taille de la bande de garde doit être déterminée par les capacités de mesure et le risque d'erreur d'appréciation. Il n’existe pas de valeur k uniforme ni de pourcentage fixe adapté à tous les systèmes de mesure. La clé est de rendre les règles traçables, recalculables et figées avant les tests.",
        },
      ],
    },
    {
      title: "6. Calcul schématique : la marge originale et la marge prouvable sont différentes",
      blocks: [
        {
          type: "paragraph",
          text: "Les chiffres suivants sont uniquement utilisés pour illustrer la méthode et ne représentent pas la mesure réelle de l'équipement du client ou des produits FOREACH. Supposons une demande maximale de 180 mL/min ; la pompe candidate peut délivrer 260 mL/min à la tension nominale et à la contre-pression cible ; dans le pire des cas confirmé qui pourrait se produire, le débit disponible mesuré dans le pire des cas est de 230 mL/min.",
        },
        {
          type: "formula",
          expression: "Mraw = 230 ÷ 180 − 1 ≈ 27.8%",
          note: "Si elle est calculée directement en utilisant une charge vide de 300 mL/min, une marge surfacique de 66,7 % sera obtenue, mais ce chiffre n'inclut pas la pression du système et les conditions les plus défavorables.",
        },
        {
          type: "paragraph",
          text: "Supposons que le projet obtienne une limite inférieure du débit disponible de 225 mL/min selon les règles d'incertitude établies, et intègre le volume de tâche et la tolérance temporelle pour obtenir une limite supérieure de demande de 185 mL/min. La marge conservatrice est d'environ 21,6 %. Le projet devrait comparer 21,6 % avec le minimum M prédéfini, plutôt que d'utiliser 27,8 % ou 66,7 % pour choisir une conclusion qui lui est plus bénéfique.",
        },
        {
          type: "formula",
          expression: "Mconservative = 225 ÷ 185 − 1 ≈ 21.6%",
          note: "225 mL/min et 185 mL/min sont deux limites schématiques. Les projets réels doivent utiliser leurs propres capacités de mesure, tolérances de tâches, plans d'échantillonnage et règles de jugement.",
        },
      ],
    },
    {
      title: "7. En prenant comme exemple la pompe FOREACH 300 mL/min, vous devez partir de la contre-pression cible.",
      blocks: [
        {
          type: "paragraph",
          text: "Les informations publiques du FOREACH DPL30 indiquent un débit à vide de 300 mL/min, une pression nominale de 100 kPa et une hauteur d'auto-amorçage de 6 mH₂O. La marge disponible ne se calcule pas par « 300 moins le débit cible » : elle doit partir de la courbe officielle à la contre-pression cible, puis être vérifiée sur le circuit final en mesurant l'entrée, la sortie et le débit réel.",
        },
        {
          type: "paragraph",
          text: "Il est recommandé que la vérification soit divisée en trois niveaux : les conditions d'exploitation de base, les fluctuations normales et les scénarios les plus défavorables. Si les besoins en équipement sont toujours proches de 300 mL/min sous une contre-pression élevée, la plate-forme de pression requise doit être revérifiée ; le point final à vide ne deviendra pas une capacité de travail à haute contre-pression en raison d'une augmentation du pourcentage de marge.",
        },
        {
          type: "links",
          items: [
            {
              prefix: "Voir",
              label: "Pompe à membrane liquide DPL30",
              href: "/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump",
              suffix: ".",
            },
            {
              prefix: "Référence",
              label: "Guide de sélection de la pompe à membrane liquide DPL30",
              href: "/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide",
              suffix: ".",
            },
          ],
        },
      ],
    },
    {
      title: "8. Matrice de test de marge et enregistrement des données",
      blocks: [
        {
          type: "table",
          headers: ["dimensions d'essai", "niveau de référence", "limite ou niveau de vie", "Sortie suggérée"],
          rows: [
            ["Alimentation", "Tension nominale aux bornes de la pompe", "Tension minimale autorisée aux bornes de la pompe", "Débit, heure de démarrage, courant"],
            ["filtrer", "nouvelles pièces", "Chute de pression équivalente près du point de remplacement", "Différence de pression du filtre, pression et débit aux deux extrémités de la pompe"],
            ["niveau de liquide", "Niveau de liquide commun ou maximum", "Niveau de liquide minimum autorisé", "Pression d'entrée, premier démarrage et temps de stabilisation"],
            ["moyen", "Milieu de référence et température", "Limites de viscosité, de température et de vapeur autorisées", "Débit, bulles, bruit et réponse des valves"],
            ["échantillon de pompe", "Plusieurs échantillons initiaux", "Échantillons à faible performance ou en phase de vie", "Modes moyenne, dispersion, tendance et défaillance"],
            ["Système de mesure", "Mesure de référence après étalonnage", "Faible débit ou débit pulsé et échantillonnage prolongé", "Données brutes, incertitude et décision d'acceptation"],
          ],
        },
        {
          type: "notice",
          label: "Limites des preuves :",
          text: "Les formules et les chiffres de cet article servent à établir la méthode de calcul ; ils ne constituent pas un engagement général de marge. La libération formelle doit citer les spécifications contrôlées, la version de la courbe, la version du circuit, le fluide réel, la définition du scénario, les données d'essai d'origine et les critères d'acceptation approuvés.",
        },
      ],
    },
    {
      title: "Conclusion : La marge doit être prouvée par des scénarios, des données et des critères.",
      blocks: [
        {
          type: "paragraph",
          text: "Une marge de débit raisonnable n’est pas plus grande, mieux c’est, ni un ratio empirique fixe. Il devrait répondre à trois questions : comment la demande maximale est obtenue, pourquoi le pire des cas peut se produire et quelle capacité démontrable reste après avoir pris en compte l'incertitude de mesure. Écrivez ces conditions dans la matrice de test et les règles de publication. Ce n'est que lorsque la version du filtre, du pipeline, du média ou du contrôle sera modifiée ultérieurement que vous saurez quelle partie doit être revalidée.",
        },
      ],
    },
  ],
  faqTitle: "FAQ｜ Marge de débit de la micropompe à membrane de 300 mL/min",
  faqItems: [
    {
      question: "Si la pompe de 300 mL/min est utilisée pour une demande de 200 mL/min, a-t-elle naturellement une marge de 50 % ?",
      answer:
        "Non. Ce calcul n'est possible que si le débit disponible prudent de la pompe sous la même pression cible, le même fluide, la même alimentation électrique et le pire scénario est toujours de 300 mL/min et que la limite de demande supérieure est de 200 mL/min. La valeur à vide ne peut pas être directement utilisée comme débit disponible.",
    },
    {
      question: "La marge de 20 à 30 % peut-elle être directement utilisée comme norme d’entreprise ?",
      answer:
        "Il peut être utilisé comme référence de conception pour déclencher une vérification détaillée, mais il ne doit pas être utilisé comme critère de publication distinct. Les normes de l'entreprise doivent également stipuler les principes de combinaison de scénarios, les versions de circuits liquides, la couverture des échantillons et de la durée de vie, l'incertitude de mesure, les limites supérieures des exigences et des critères de réussite clairs.",
    },
    {
      question: "Pourquoi le filtre doit-il être vérifié le plus près possible du point de remplacement ?",
      answer:
        "La chute de pression augmente généralement une fois le filtre chargé et le point de fonctionnement de la pompe peut se déplacer vers des débits plus faibles. Le test peut utiliser l'élément filtrant réel au stade de vie ou utiliser la chute de pression équivalente avec des preuves pour reproduire la limite. L’état du nouvel élément filtrant ne peut pas être considéré comme l’état à long terme.",
    },
    {
      question: "Comment prouver que plusieurs pires conditions peuvent survenir en même temps ?",
      answer:
        "Remettez-les dans un état d'équipement spécifique : même étape du cycle de vie, environnement, niveaux de fluides, état du filtre, alimentation électrique et procédures de contrôle, et confirmez que les spécifications du produit permettent cette combinaison. Les conditions mutuellement exclusives doivent être divisées en différents scénarios, et les valeurs extrêmes dépourvues de preuves de corrélation ne doivent pas être multipliées mécaniquement.",
    },
    {
      question: "Le débit mesuré est exactement égal à la demande minimale. Peut-il être jugé qualifié ?",
      answer:
        "Vous ne pouvez généralement pas simplement considérer que les lectures sont égales. L'incertitude des mesures, la répétabilité, la dispersion des échantillons et les tolérances des exigences doivent également être prises en compte selon des règles de décision prédéfinies ; si la borne inférieure du débit disponible est inférieure à la borne supérieure de la demande, une marge suffisante n'a pas été démontrée.",
    },
  ],
  cta: {
    title: "Besoin de calculer la marge de débit lors de l'intégration d'une pompe à membrane de 300 mL/min ?",
    description:
      "Vous pouvez fournir le volume maximal par tâche, le temps de pompage effectif, la différence de pression du circuit, le fluide et sa température, la tension minimale, le niveau de liquide, l'état du filtre au cours de sa durée de vie, le plan d'échantillonnage et les moyens de mesure disponibles. Ces données permettent d'établir des scénarios défavorables reproductibles et des critères d'acceptation.",
    contactLabel: "Contacter un ingénieur",
    productsLabel: "Voir les produits de pompes à membrane",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
