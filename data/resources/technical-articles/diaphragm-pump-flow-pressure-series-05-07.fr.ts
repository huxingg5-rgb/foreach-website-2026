import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const PRESSURE_TERMS_ASSET_BASE =
  "/images/resources/technical-articles/diaphragm-pump-pressure-rating-terms";
const PRESSURE_LEVEL_SELECTION_ASSET_BASE =
  "/images/resources/technical-articles/100-kpa-vs-600-kpa-diaphragm-pump-selection";
const HIGH_BACKPRESSURE_BUDGET_ASSET_BASE =
  "/images/resources/technical-articles/high-backpressure-fluid-path-pressure-budget";

export const diaphragmPumpPressureRatingTermsFrCopy = {
  metadata: {
    title:
      "Quelle différence entre pression nominale de service, pression de sortie maximale, pression d'épreuve et pression d'éclatement d'une micropompe à membrane ?",
    seoTitle:
      "Pression nominale, maximale, d'épreuve et d'éclatement d'une micropompe | FOREACH",
    seoDescription:
      "La pression nominale de service, la pression de sortie maximale, la pression d'épreuve et la pression d'éclatement décrivent des limites différentes. Ce guide fournit un tableau terminologique, une liste des données à confirmer et une méthode de vérification des spécifications.",
    coverImage: PRESSURE_TERMS_ASSET_BASE + "/article-cover.webp",
    coverAlt: "Micropompe à membrane FOREACH et banc d'essai de pression dans une vidéo Douyin officielle",
  },
  deck: "Une valeur de pression n'a de sens technique qu'avec sa définition, le fluide d'essai, la condition d'entrée, le débit, la durée et le critère d'acceptation. La pression nominale peut délimiter le fonctionnement autorisé ; la pression de sortie maximale, la pression d'épreuve et la pression d'éclatement ne constituent pas à elles seules des points de fonctionnement continu.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Rated Pressure, Max. Pressure, Output Pressure, Proof Pressure, Pressure Test et Burst Pressure apparaissent fréquemment dans les fiches de micropompes à membrane. En chinois, ces termes peuvent être regroupés de manière imprécise sous « pression », « pression maximale » ou « résistance à la pression », ce qui conduit facilement à comparer dans une même colonne des données décrivant des limites différentes.",
    },
    {
      type: "paragraph",
      text: "Pour déterminer si un paramètre de pression peut servir à sélectionner un modèle, sa valeur numérique ne suffit pas. Il faut au minimum confirmer le fluide d'essai, la température, la pression d'entrée, le débit correspondant, la durée, le régime de service et le critère d'acceptation. Même si plusieurs fiches indiquent 600 kPa, elles ne décrivent pas la même performance lorsque ces conditions diffèrent.",
    },
    {
      type: "notice",
      label: "Conclusion du projet :",
      text: "La pression de service nominale, la pression de sortie maximale, la pression d'épreuve et la pression d'éclatement correspondent à des limites différentes. Sans spécification contrôlée ni définition de l'essai, une donnée d'épreuve ou d'éclatement ne doit pas être reformulée comme pression admissible en fonctionnement continu.",
    },
  ],
  sections: [
    {
      title: "1. Pourquoi une même valeur de 600 kPa peut-elle décrire des limites totalement différentes ?",
      blocks: [
        {
          type: "paragraph",
          text: "La pression de service réelle indique la différence de pression que la pompe doit vaincre pendant le fonctionnement de l'équipement. La pression de service nominale définit la plage autorisée ou prescrite par la documentation contrôlée dans des conditions précises. La pression de sortie maximale décrit généralement une extrémité de la courbe de performances ; la pression d'épreuve et la pression d'éclatement vérifient respectivement une limite structurelle et une limite de rupture. Chaque terme répond à une question différente.",
        },
        {
          type: "figure",
          src: PRESSURE_TERMS_ASSET_BASE + "/article-figure-en.webp",
          alt: "Cinq fiches expliquent la pression de service réelle, la pression nominale, la pression de sortie maximale, la pression d'épreuve et la pression d'éclatement d'une micropompe à membrane",
          width: 2560,
          height: 2040,
          caption:
            "Figure 5. Les termes de pression courants d'une micropompe à membrane ne doivent pas être comparés comme s'ils désignaient la même limite.",
        },
      ],
    },
    {
      title: "2. À quelles questions répondent les cinq termes courants ?",
      blocks: [
        {
          type: "table",
          headers: [
            "Terme",
            "Signification technique",
            "Peut-il servir directement de point continu ?",
            "À confirmer",
          ],
          rows: [
            [
              "Pression de service réelle",
              "Différence de pression réelle entre l'entrée et la sortie de la pompe pendant le fonctionnement",
              "C'est une donnée de fonctionnement à vérifier",
              "Conditions d'entrée, débit et caractère permanent ou transitoire",
            ],
            [
              "Pression de service nominale",
              "Plage de pression de service autorisée ou prescrite par la documentation contrôlée dans des conditions définies",
              "Peut servir de limite si ses conditions d'application sont respectées",
              "Fluide, température, régime de service et courbe débit-pression",
            ],
            [
              "Pression de sortie maximale",
              "Extrémité ou plage de pression que la pompe peut atteindre ou garantir",
              "Ne peut généralement pas être considérée seule comme un point de fonctionnement continu",
              "Quel débit subsiste à ce point et pendant combien de temps il peut être maintenu",
            ],
            [
              "Pression d'épreuve ou pression d'essai",
              "Pression appliquée à une structure ou à un joint avec un fluide, une durée et des critères définis",
              "Non",
              "Fluide d'essai, durée et critères de fuite ou de déformation",
            ],
            [
              "Pression d'éclatement",
              "Limite à laquelle l'échantillon présente un dommage permanent ou une défaillance fonctionnelle",
              "Jamais",
              "État de l'échantillon, vitesse de montée en pression et critère de rupture",
            ],
          ],
        },
        {
          type: "notice",
          label: "Limite de la documentation contrôlée :",
          text: "Les pages publiques servent à une présélection et à formuler les bonnes questions ; les données d'entrée finales de conception doivent provenir d'une version en vigueur de la spécification contrôlée. Si celle-ci ne publie pas la pression d'épreuve ou d'éclatement, ces valeurs ne doivent pas être déduites du matériau, de la structure ou de paramètres voisins.",
        },
      ],
    },
    {
      title: "3. Pourquoi une valeur de pression ne représente-t-elle pas à elle seule la capacité de fonctionnement ?",
      blocks: [
        {
          type: "paragraph",
          text: "Pour la pompe à membrane pour liquides haute pression FOREACH DPL30H, le site indique une « pression nominale de 600 kPa ». Cette valeur doit être interprétée avec le débit correspondant, le fluide, les conditions d'entrée, la température, le régime de service et la courbe débit-pression complète. Elle ne peut pas être extrapolée automatiquement comme pression d'épreuve, pression d'éclatement ou capacité de transfert continu dans n'importe quelles conditions.",
        },
        {
          type: "paragraph",
          text: "Lorsqu'une fiche emploie Rated Pressure, Max. Pressure, Output Pressure, Pressure Test ou Burst Pressure, confirmez d'abord la définition du champ, puis les conditions d'essai et le critère d'acceptation. Une même valeur après conversion des unités n'implique pas une même limite technique.",
        },
        {
          type: "table",
          headers: ["Champ de la fiche", "Information minimale confirmable", "Ce qui ne peut pas être déduit directement"],
          rows: [
            [
              "Rated Pressure / pression de service nominale",
              "La documentation contrôlée définit la limite de service dans les conditions spécifiées",
              "Que le débit à vide soit conservé à cette pression ou que celle-ci convienne à tous les fluides",
            ],
            [
              "Max. Pressure / Output Pressure",
              "La fiche fournit une extrémité ou une plage de pression de sortie",
              "Que cette valeur soit admissible en fonctionnement continu de longue durée",
            ],
            [
              "Pressure Test / Proof Pressure",
              "La structure ou le joint a été vérifié sous pression dans des conditions définies",
              "Que la pression d'essai soit la pression de service nominale ou la pression d'éclatement",
            ],
            [
              "Burst Pressure / pression d'éclatement",
              "Limite de dommage permanent ou de défaillance fonctionnelle de l'échantillon",
              "Que la pression de service admissible du système puisse être augmentée pour cette raison",
            ],
          ],
        },
      ],
    },
    {
      title: "4. Lors de la vérification des paramètres de pression, posez au moins neuf questions",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "La définition formelle du terme dans une spécification contrôlée.",
            "Si le milieu de test est de l'eau, du gaz ou un autre liquide.",
            "La température du fluide et la température ambiante.",
            "Si l'entrée de la pompe est à la pression atmosphérique, en dépression ou en surpression.",
            "Le débit correspondant à cette pression, et s'il existe une courbe débit-pression complète.",
            "Si le test est en régime permanent ou transitoire et combien de temps il dure.",
            "Si le régime de service est continu, intermittent ou n'autorise qu'une brève montée en pression.",
            "Si le critère d'acceptation exige de maintenir le transfert, de ne présenter ni fuite ni déformation, ou simplement de ne pas éclater.",
            "Si le nombre d'échantillons, l'alimentation électrique, les pipelines et les méthodes de connexion sont conformes aux conditions du projet.",
          ],
        },
      ],
    },
    {
      title: "5. Comment éviter les abus lorsque les spécifications ne sont pas clairement rédigées",
      blocks: [
        {
          type: "paragraph",
          text: "Si la page publique n'affiche qu'une valeur de pression, marquez-la d'abord comme « paramètre à confirmer » et ne la classez pas vous-même comme pression nominale, d'épreuve ou d'éclatement. Le tableau du projet doit conserver le texte original de la spécification contrôlée et ajouter des champs tels que « définition du terme », « débit correspondant », « durée », « régime de service » et « critère d'acceptation ».",
        },
        {
          type: "paragraph",
          text: "Ce principe s'applique aussi strictement au contenu de FOREACH : si la spécification contrôlée publie une pression nominale, elle doit être décrite comme telle ; les valeurs non publiées de pression d'épreuve ou d'éclatement ne doivent pas être déduites de la structure, du matériau ou de paramètres voisins. Un article Web peut expliquer la méthode de sélection, mais ne remplace pas le dossier de libération du produit.",
        },
      ],
    },
    {
      title: "Données du site FOREACH et limites des preuves",
      blocks: [
        {
          type: "links",
          items: [
            {
              label: "FOREACH : Guide de sélection de la pompe à membrane pour liquide haute pression DPL30H",
              href: "/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide",
            },
          ],
        },
        {
          type: "notice",
          label: "Limites des preuves :",
          text: "Les informations publiques du site servent à expliquer la signification des paramètres de pression et la méthode de sélection. Les formules et les exemples sont réservés à une première évaluation technique et ne remplacent ni les spécifications contrôlées, ni l'évaluation avec le fluide réel, ni la validation du prototype complet.",
        },
      ],
    },
  ],
  faqTitle: "Foire aux questions | Comment faire la distinction entre les termes de pression des pompes à membrane ?",
  faqItems: [
    {
      question: "La pression de sortie maximale est-elle la pression lorsque la pompe est bloquée ?",
      answer:
        "Certaines fiches peuvent définir l'extrémité de la courbe de performances près du débit nul, mais ce n'est pas généralisable. Il faut vérifier la spécification contrôlée du modèle, sa courbe débit-pression et la méthode d'essai.",
    },
    {
      question: "Si la résistance à la pression est supérieure à la pression nominale, cela signifie-t-il que la pression de service peut être augmentée à long terme ?",
      answer:
        "Non. Les tests de résistance à la pression ou de pression comportent généralement des critères de support, de durée et de qualification spécifiés. Il vérifie uniquement la structure correspondante ou la limite d'étanchéité et ne représente pas les performances opérationnelles et la durée de vie à long terme.",
    },
    {
      question: "Plus la pression d'éclatement est élevée, meilleure est la pompe ?",
      answer:
        "Vous ne pouvez pas juger ainsi. La pression d'éclatement appartient à la limite du dommage ; la sélection réelle accorde plus d'attention à la pression de service admissible au débit cible, à la compatibilité des fluides, à la durée de vie et à la limite de sécurité de l'ensemble du trajet du liquide.",
    },
    {
      question: "6 bars et 600 kPa sont-ils exactement identiques ?",
      answer:
        "La conversion d'unité est équivalente : 1 bar = 100 kPa. Cependant, la terminologie, les conditions d'essai et le régime de fonctionnement peuvent différer d'une page à l'autre ; une unité équivalente n'implique pas la même portée de performances.",
    },
    {
      question: "Comment enregistrer le champ de pression dans le tableau des paramètres du projet ?",
      answer:
        "Conservez le texte d'origine et le modèle complet de la spécification contrôlée, puis ajoutez des champs normalisés : pression de service nominale, pression de sortie maximale, pression d'épreuve, pression d'éclatement, débit à la pression cible, fluide, température, conditions d'entrée, durée, régime de service et critère d'acceptation.",
    },
  ],
  cta: {
    title: "Besoin de vérifier les paramètres de pression de votre micropompe à membrane ?",
    description:
      "Vous pouvez transmettre le débit cible, les pressions d'entrée et de sortie, le fluide et sa température, le régime de service et le circuit complet. L'ingénieur vérifiera les points de fonctionnement candidats à partir des spécifications et des courbes contrôlées.",
    contactLabel: "Contacter un ingénieur",
    productsLabel: "Voir les produits de pompes à membrane",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const diaphragmPump100KpaVs600KpaSelectionFrCopy = {
  metadata: {
    title: "100 kPa suffisent-ils ? Comment décider si le circuit exige une micropompe à membrane de 600 kPa",
    seoTitle: "Micropompe de 100 ou 600 kPa : sélection par bilan de pression | FOREACH",
    seoDescription:
      "Le nom de l'application ne suffit pas pour décider si 100 kPa conviennent. Le choix entre 100 et 600 kPa doit tenir compte du débit cible, des tubes, vannes, filtres, aiguilles, de la pression terminale et de la courbe de pompe.",
    coverImage: PRESSURE_LEVEL_SELECTION_ASSET_BASE + "/article-cover.webp",
    coverAlt: "Micropompe à membrane FOREACH et essai de pression du circuit dans une vidéo Douyin officielle",
  },
  deck: "100 et 600 kPa ne correspondent pas à une version normale et à une version simplement améliorée. Il faut d'abord établir le bilan de pression de tout le circuit au débit cible, puis lire la courbe de la pompe candidate. Une classe de pression supérieure n'est utile que si la contre-pression réelle du circuit la justifie.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "La pression nominale d'une pompe ne peut pas être déterminée par des noms d'application tels que « nettoyage », « échantillonnage » et « distribution par aiguille ». La même application peut tomber dans des plages de travail complètement différentes en raison de différents débits, diamètres de tuyaux, conditions de filtre, tailles d'aiguilles ou pressions de chambre d'extrémité.",
    },
    {
      type: "paragraph",
      text: "Le point de départ de la sélection doit être le débit cible Q cible et la différence de pression en régime permanent la plus défavorable entre l'entrée et la sortie de la pompe à ce débit. Les transitoires tels que le démarrage et la commutation des vannes doivent ensuite être vérifiés individuellement en tant que limites de protection, plutôt que d'utiliser une vague « contre-pression du système » pour remplacer l'état de fonctionnement complet.",
    },
    {
      type: "notice",
      label: "Conclusion du projet :",
      text: "Calculez ou mesurez d'abord la pression hydraulique requise sous le débit cible, puis lisez le débit correspondant sur la courbe de la pompe. La pression nominale n'est qu'une limite et ne peut pas prouver que la pompe maintiendra un débit à vide à ce point final de pression.",
    },
  ],
  sections: [
    {
      title: "1. Pour déterminer le niveau de pression, il faut d'abord indiquer le débit cible.",
      blocks: [
        {
          type: "paragraph",
          text: "La perte de charge hydraulique varie avec le débit. Un même tuyau n'exige pas la même pression à 100 mL/min et à 300 mL/min ; la perte de charge d'une même aiguille varie aussi avec la viscosité du fluide. Par conséquent, « cet équipement nécessite environ 100 kPa » ne constitue pas une condition de sélection complète sans débit associé.",
        },
        {
          type: "formula",
          expression:
            "ΔPrequired(Qtarget) = Pout(Qtarget) − Pin(Qtarget)",
          note: "Le budget de pression doit correspondre au débit cible. La pression la plus défavorable en régime permanent et les limites transitoires telles que le démarrage, la commutation ou le blocage d'une vanne doivent être enregistrées séparément.",
        },
        {
          type: "figure",
          src: PRESSURE_LEVEL_SELECTION_ASSET_BASE + "/article-figure-en.webp",
          alt: "Déterminez le débit cible, répertoriez les pertes dans la conduite de liquide et lisez le processus de prise de décision du niveau de pression de la courbe de la pompe.",
          width: 2560,
          height: 2160,
          caption:
            "Figure 6 Pour déterminer si 100 kPa sont suffisants, commencez par la pression totale requise au débit cible.",
        },
      ],
    },
    {
      title: "2. Répertoriez tous les éléments de consommation de pression",
      blocks: [
        {
          type: "table",
          headers: ["terme de pression", "Sources typiques", "Pourquoi ne peut-on pas l'omettre"],
          rows: [
            [
              "perte côté aspiration",
              "Tube d'aspiration, soupape d'admission, filtre, niveau de liquide bas",
              "Affecte la pression absolue d'entrée et le réapprovisionnement en fluide de la chambre de pompe.",
            ],
            [
              "Perte du tuyau droit côté refoulement",
              "Tubes fins, tubes longs, viscosité plus élevée",
              "Augmente à mesure que le débit cible augmente",
            ],
            [
              "perte locale",
              "Raccords, coudes, vannes, Flow Cells",
              "Le diamètre interne peut devenir le point le plus étroit",
            ],
            [
              "Chute de pression du filtre",
              "Pièces neuves en fin de vie",
              "Il pourrait augmenter considérablement à long terme",
            ],
            [
              "résistance aux bornes",
              "Aiguille, buse, chambre à pression positive",
              "Devient souvent la principale source de contre-pression élevée",
            ],
            [
              "pression statique et transitoire",
              "Différence de hauteur, commutation de vanne, blocage, démarrage et arrêt",
              "La pression statique pénètre dans le budget d’équilibre ; les transitoires sont utilisés pour les contrôles des limites de protection",
            ],
          ],
        },
      ],
    },
    {
      title: "3. Quels circuits de liquide sont les plus susceptibles de tomber dans la plage de pression inférieure ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les caractéristiques suivantes signifient généralement une exigence de pression relativement faible, mais nécessitent néanmoins des calculs et des tests : conduites courtes, grands diamètres intérieurs, moins de vannes, sorties ouvertes, faible viscosité du fluide, pas de filtres à haute résistance ni d'aiguilles fines, et le niveau du réservoir ne crée pas de pression négative d'aspiration significative.",
        },
        {
          type: "paragraph",
          text: "Les pressions nominales publiques des pompes à membrane liquide ordinaires FOREACH DPL30 et DPL60 sont toutes deux de 100 kPa et les niveaux de débit à vide correspondants sont respectivement de 300 mL/min et 600 mL/min. Ils ne conviennent pas à un nom industriel fixe, mais à un chemin de liquide dont le point de fonctionnement cible peut se situer dans la courbe contrôlée et la plage de conditions de fonctionnement autorisées.",
        },
      ],
    },
    {
      title: "4. Quelles structures sont les plus susceptibles d’entrer dans la plage de contre-pression élevée ?",
      blocks: [
        {
          type: "list",
          items: [
            "Aiguilles fines, capillaires, micro-buses ou cellules à circulation étroites.",
            "Tuyau dur longue distance, de petit diamètre intérieur ou réduction soudaine du diamètre en plusieurs étapes.",
            "Filtres de haute précision, notamment lorsque la perte de charge augmente en fin de vie.",
            "Délivrez du liquide dans une cavité qui a déjà une pression positive.",
            "Un rinçage rapide ou une pulvérisation à grande vitesse est nécessaire en peu de temps.",
            "Plusieurs vannes, joints et capteurs sont connectés en série et les pertes locales s'accumulent.",
          ],
        },
        {
          type: "paragraph",
          text: "La pompe à membrane pour liquides haute pression FOREACH DPL30H publie un débit à vide de 300 mL/min et une pression nominale de 600 kPa. Ces deux valeurs ne correspondent pas au même point de fonctionnement ; pour connaître le débit restant sous forte contre-pression, il faut consulter une version en vigueur de la courbe débit-pression.",
        },
      ],
    },
    {
      title: "5. Trois scénarios illustratifs : pourquoi la pression totale estimée ne suffit pas",
      blocks: [
        {
          type: "table",
          headers: [
            "Scénarios illustratifs (hors cas clients)",
            "Cibler le débit",
            "Demande de pression à l’état d’équilibre la moins défavorable",
            "jugement préliminaire",
          ],
          rows: [
            [
              "Tuyau court, sortie ouverte, peu de vannes",
              "180 mL/min",
              "Environ 40 kPa",
              "Il peut y avoir une marge pour le plateau de pression inférieur, continuez à lire la courbe",
            ],
            [
              "Aiguille fine, filtre, chambre à pression positive",
              "250 mL/min",
              "Environ 95 kPa",
              "Près de la limite de 100 kPa, nous ne pouvons pas nous contenter de regarder la valeur nominale",
            ],
            [
              "Aiguille fine, tube long, extrémité haute pression",
              "220 mL/min",
              "Environ 180 kPa",
              "Une plate-forme commune de 100 kPa ne devrait généralement pas être un candidat direct",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Les 95 kPa dans l'illustration ne signifient pas « qu'une pompe de 100 kPa fera certainement l'affaire ». Si 100 kPa est la pression nominale de la pompe candidate, le point cible est proche de la limite et le débit, la charge du filtre, la température du fluide, la dispersion de l'échantillon et la marge de conception à ce point doivent également être vérifiés ; les pics de démarrage ou de commutation des vannes font l'objet d'un contrôle indépendant de protection contre les transitoires.",
        },
      ],
    },
    {
      title: "6. Les pompes haute pression ne sont pas automatiquement meilleures que les pompes basse pression",
      blocks: [
        {
          type: "paragraph",
          text: "Si le circuit de liquide ne nécessite pas de contre-pression élevée, la sélection directe d'une plate-forme de 600 kPa peut augmenter les contraintes sur les méthodes de connexion, les limites de matériaux et de température, l'alimentation électrique, la stratégie de contrôle, l'espace d'installation et le coût. En prenant comme exemple les informations publiques FOREACH, la hauteur d'auto-amorçage du DPL30 est de 6 mH₂O, la limite supérieure de la température du milieu est de +80 ℃ ; la hauteur d'auto-amorçage du DPL30H est de 3 mH₂O, la limite supérieure de la température du milieu est de +40 ℃ et il utilise une connexion par virole de tube dur de 6 × 4 mm.",
        },
        {
          type: "paragraph",
          text: "Une pression plus élevée n'est donc pas une amélioration universelle, mais un autre ensemble de limites pour les circuits à forte résistance. Une plateforme haute pression n'est un choix efficace que si le point de fonctionnement cible, le fluide, les conditions d'entrée et le régime de service correspondent.",
        },
      ],
    },
    {
      title: "7. Quatre conditions avant la libération finale",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Les exigences normales de pression en régime permanent et le pire des cas en régime permanent au débit cible ont été calculées ou mesurées.",
            "La courbe de pompe contrôlée montre que les conditions de fonctionnement en régime permanent les plus défavorables respectent toujours le débit cible et maintiennent les marges de pression et de débit définies par le projet.",
            "Les pressions de service admissibles des tuyaux, joints, vannes, filtres, capteurs et chambres ont été vérifiées ; Les données de pression d'essai ou de résistance à la pression ne remplacent pas la pression de service admissible.",
            "L'équipement complet a été vérifié pour le démarrage, l'état stable, la commutation des vannes, la protection contre le blocage, les fuites et le fonctionnement à long terme.",
          ],
        },
        {
          type: "notice",
          label: "Limites du système :",
          text: "La pression de service minimale admissible de l'ensemble du circuit hydraulique est déterminée par la pression de service la plus basse admissible de tous les composants sous pression. La pression nominale d'une pompe ne remplace pas la qualification de pression de fonctionnement des tuyaux, raccords, vannes, filtres, capteurs ou chambres.",
        },
      ],
    },
    {
      title: "Données du site FOREACH et limites des preuves",
      blocks: [
        {
          type: "links",
          items: [
            {
              label: "FOREACH : Guide de sélection de la pompe à membrane pour liquide haute pression DPL30H",
              href: "/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide",
            },
            {
              label: "FOREACH : Guide de sélection de la pompe à membrane liquide DPL30",
              href: "/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide",
            },
            {
              label: "FOREACH : Guide de sélection de la pompe à membrane liquide DPL60",
              href: "/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide",
            },
          ],
        },
        {
          type: "notice",
          label: "Limites des preuves :",
          text: "Les informations, formules et exemples du site servent uniquement à une première évaluation technique. Ils ne remplacent ni les spécifications contrôlées, ni les courbes complètes, ni l'évaluation avec le fluide réel, ni la validation du prototype complet.",
        },
      ],
    },
  ],
  faqTitle: "Foire aux questions | Comment choisir entre des micropompes à membrane 100 kPa et 600 kPa ?",
  faqItems: [
    {
      question: "Le système estime une contre-pression de 80 kPa. Une pompe de 100 kPa est-elle suffisante ?",
      answer:
        "Vous ne pouvez pas juger sur la base de seulement deux chiffres. Le débit cible correspondant à 80 kPa doit être confirmé et s'il s'agit de l'état stable le plus défavorable, et le débit et la marge à ce stade doivent être lus sur la courbe de la pompe contrôlée.",
    },
    {
      question: "Tous les déficits de débit peuvent-ils être résolus en utilisant une pompe de 600 kPa ?",
      answer:
        "Non. Si le problème vient d'une prise d'air à l'aspiration, d'une vanne défaillante, d'une alimentation insuffisante, d'une viscosité élevée ou d'un remplissage insuffisant à l'entrée, une plateforme haute pression peut ne pas le résoudre et peut aussi introduire de nouvelles contraintes dans le système.",
    },
    {
      question: "Une aiguille fine nécessite-t-elle forcément 600 kPa ?",
      answer:
        "Pas nécessairement. Les exigences de pression dépendent du diamètre intérieur de l'aiguille, de la longueur efficace, du débit cible, de la viscosité du fluide et de la pression terminale et doivent être évaluées à l'aide des données de chute de pression du fournisseur, de calculs ou de mesures réelles.",
    },
    {
      question: "Pourquoi une pompe de 100 kPa ne peut-elle toujours pas fournir un débit à vide à 100 kPa ?",
      answer:
        "Le débit à vide et la pression nominale sont généralement des paramètres de performance différents. À mesure que la différence de pression à travers la pompe augmente, le débit diminue généralement et le débit correspondant à la pression cible doit être lu sur la courbe.",
    },
    {
      question: "Pourquoi devrions-nous vérifier la pression de service minimale admissible de l’ensemble du circuit hydraulique ?",
      answer:
        "La pression de service admissible du système est déterminée par la pression de service admissible la plus basse de tous les composants sous pression. La pression d'épreuve ou pression d'essai est utilisée à différentes fins de vérification et ne peut pas remplacer la pression de service admissible des tuyaux, raccords, vannes, filtres et chambres.",
    },
  ],
  cta: {
    title: "Besoin de juger si le circuit de liquide est adapté à une plateforme de 100 kPa ou de 600 kPa ?",
    description:
      "Vous pouvez transmettre le fluide, le débit cible, les conditions d'entrée, les canalisations, les vannes, les filtres, les aiguilles, la pression terminale et le régime de service. L'ingénieur aidera à vérifier le bilan de pression et les courbes des pompes candidates.",
    contactLabel: "Transmettre les conditions de fonctionnement",
    productsLabel: "Voir les produits de pompes à membrane",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const highBackpressureFluidPathPressureBudgetFrCopy = {
  metadata: {
    title: "Comment établir le bilan de pression d'un circuit à forte contre-pression ? Exemple de sélection FOREACH à 600 kPa",
    seoTitle: "Bilan de pression d'un circuit à forte contre-pression et pompe de 600 kPa | FOREACH",
    seoDescription:
      "Avant de choisir une pompe pour un circuit à forte contre-pression, il faut budgétiser séparément les pertes d'aspiration, de refoulement, des vannes, filtres, aiguilles, de la chambre terminale et de la hauteur statique ; marge et protection transitoire sont vérifiées à part.",
    coverImage: HIGH_BACKPRESSURE_BUDGET_ASSET_BASE + "/article-cover.webp",
    coverAlt: "Essai d'un circuit sous contre-pression avec une micropompe FOREACH dans une vidéo Douyin officielle",
  },
  deck: "Dans un circuit à forte contre-pression, indiquer simplement au fournisseur que 6 bar sont requis ne suffit pas. Chaque perte stable doit être calculée au débit cible, en séparant régime normal, pire régime permanent, marge de pression et limites de protection transitoire, puis comparée à la courbe contrôlée de la pompe candidate.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Une conduite de liquide à haute contre-pression se compose généralement d'une bouteille de stockage de liquide, d'un tuyau d'aspiration, d'une pompe, d'une vanne, d'un connecteur, d'un filtre, d'une aiguille ou d'une buse et d'une cavité d'extrémité. Chaque composant a le potentiel de consommer une pression différentielle ; la pompe doit surmonter ces pertes en régime permanent au débit cible pour accomplir la tâche de livraison.",
    },
    {
      type: "paragraph",
      text: "Le bilan de pression ne doit pas combiner les conditions de fonctionnement normales, les conditions de fonctionnement les plus défavorables, les marges de conception et les pics de commutation ou de colmatage des vannes en un seul chiffre. Les deux premiers sont utilisés pour déterminer le point de fonctionnement, les marges sont utilisées pour déterminer la tolérance d'un candidat aux écarts et les transitoires sont utilisés pour définir les limites de détection, d'arrêt, de décompression et de protection des composants.",
    },
    {
      type: "notice",
      label: "Conclusion du projet :",
      text: "L'état stable normal, l'état stable dans le pire des cas, la marge de pression et la protection contre les transitoires doivent être enregistrés séparément. Les pics transitoires ne sont pas des points de fonctionnement continus et ne doivent pas être ajoutés mécaniquement au bilan en régime permanent sous la forme d'une perte de pression.",
    },
  ],
  sections: [
    {
      title: "1. Le point de départ du bilan de pression n'est pas la pompe, mais le trajet complet du liquide",
      blocks: [
        {
          type: "formula",
          expression:
            "ΔPsteady(Qtarget) = Pout,steady(Qtarget) − Pin,steady(Qtarget)",
          note: "Unifiez d'abord la pression manométrique, la pression absolue et la direction du signe, puis calculez les pressions d'entrée et de sortie sous le même débit cible.",
        },
        {
          type: "paragraph",
          text: "S'il est nécessaire de le diviser par composant, le budget en régime permanent peut être composé de la perte en régime permanent du côté aspiration, de la perte en régime permanent du tuyau de refoulement, de la perte locale de la vanne et du joint, de la perte de charge du filtre, de la chute de pression de l'aiguille ou de la buse, de la pression de la chambre terminale et de la différence de pression statique. Seules les données appartenant au même état, au même flux cible et de même signe peuvent entrer dans le même budget d’équilibre.",
        },
        {
          type: "figure",
          src: HIGH_BACKPRESSURE_BUDGET_ASSET_BASE + "/article-figure-en.webp",
          alt: "Le diagramme à deux voies montre respectivement le bilan de pression continue et la limite de protection contre la pression transitoire du circuit hydraulique à haute contre-pression.",
          width: 2560,
          height: 2360,
          caption:
            "Figure 7 Budget de pression hydraulique à haute contre-pression : démontez la perte en régime permanent de chaque section, puis vérifiez-la avec la courbe de la pompe ; la valeur de crête transitoire entre dans la conception de protection séparément.",
        },
      ],
    },
    {
      title: "2. Pour un circuit à forte contre-pression, fournir au moins douze catégories de données",
      blocks: [
        {
          type: "table",
          headers: ["Projet", "Données requises", "Source de données"],
          rows: [
            [
              "moyen",
              "Nom, concentration, température, viscosité, s'il contient des particules ou des bulles",
              "Conditions de formule et de procédé",
            ],
            [
              "Cibler le débit",
              "Déviation minimale, nominale, maximale et admissible",
              "Battement d'équipement",
            ],
            [
              "Conditions de stockage",
              "Plage de niveau de liquide, pression du récipient, s'il faut sécher l'aspiration pour la première fois",
              "Disposition des équipements",
            ],
            [
              "tube d'aspiration",
              "Diamètre intérieur, longueur, matériaux, coudes et joints",
              "Dessins ou objets",
            ],
            [
              "tuyau de décharge",
              "Diamètre intérieur, longueur, matériaux, coudes et joints",
              "Dessins ou objets",
            ],
            ["Pièces de vannes", "Modèle complet, diamètre, Cv ou courbe de perte de charge", "Informations sur le fournisseur"],
            [
              "filtrer",
              "Modèle complet, perte de charge pièce neuve, perte de charge fin de vie",
              "Informations sur le fournisseur ou mesure réelle",
            ],
            [
              "Aiguille ou buse",
              "Modèle complet, alésage, longueur, données débit-chute de pression",
              "Informations sur le fournisseur ou mesure réelle",
            ],
            ["cavité terminale", "Plage de pression normale, de pression négative ou de pression positive", "définition du système"],
            [
              "Régime de service",
              "Continu ou intermittent, fréquence de démarrage et d'arrêt, durée unique",
              "Battement du programme",
            ],
            [
              "Transitoires et anomalies",
              "Commutation de vanne, blocage, valeurs de pointe de démarrage et d'arrêt, durée et actions de protection",
              "Tests dynamiques",
            ],
            [
              "Alimentation et contrôle",
              "Plage de tension, PWM, limite de courant, feedback",
              "conception électrique",
            ],
          ],
        },
      ],
    },
    {
      title: "3. Établir séparément les quatre limites",
      blocks: [
        {
          type: "subheading",
          title: "1. Point de fonctionnement normal en régime permanent",
        },
        {
          type: "formula",
          expression:
            "ΔPnormal,steady(Qtarget) = Pout,normal-steady(Qtarget) − Pin,normal-steady(Qtarget)",
          note: "Les niveaux de liquide typiques, les nouveaux filtres, la tension nominale et les fluides à température normale sont utilisés pour confirmer les points de fonctionnement quotidiens et les plages de contrôle.",
        },
        {
          type: "subheading",
          title: "2. Le point de fonctionnement en régime permanent le plus défavorable",
        },
        {
          type: "formula",
          expression:
            "ΔPworst,steady(Qtarget) = Pout,worst-steady(Qtarget) − Pin,worst-steady(Qtarget)",
          note: "Le niveau de fluide minimum, la fin de vie du filtre, la viscosité du fluide ou les limites de température et la pression finale maximale durable sont utilisés pour identifier les exigences les plus défavorables en matière de conduite de fluide.",
        },
        {
          type: "subheading",
          title: "3. Marge de pression",
        },
        {
          type: "formula",
          expression:
            "Mpressure(Qtarget) = ΔPcandidate-allowed(Qtarget) − ΔPworst,steady(Qtarget)",
          note: "Les limites des pompes candidates doivent être dérivées de courbes ou de spécifications contrôlées pour le même fluide, la même température, les mêmes conditions d'entrée, l'alimentation électrique minimale autorisée et le même cycle de service ; les marges acceptables doivent être définies individuellement par le projet.",
        },
        {
          type: "subheading",
          title: "4. Protection transitoire et anormale",
        },
        {
          type: "paragraph",
          text: "Pour les pics provoqués par la commutation, le démarrage et l'arrêt de la vanne, le blocage des bornes, le dysfonctionnement de la vanne ou le serrage du pipeline, la pression maximale, la durée, le lieu d'apparition et les conditions de déclenchement doivent être enregistrés, et la plage du capteur de pression, le seuil d'arrêt, le chemin de décompression et les limites transitoires admissibles de chaque composant doivent être vérifiés respectivement. Il s'agit d'une entrée de conception de protection et non d'un point de fonctionnement de dimensionnement continu pour la pompe.",
        },
        {
          type: "table",
          headers: ["frontière", "Ce qui devrait être inclus", "Objectif"],
          rows: [
            [
              "état d'équilibre normal",
              "Niveau de liquide typique, nouveau filtre, tension nominale, fluide à température normale",
              "Confirmer le point de fonctionnement normal et la plage de contrôle",
            ],
            [
              "L'état stationnaire le plus défavorable",
              "Niveau de liquide minimum, fin de vie du filtre, limites de pression moyenne et finale ; Alimentation électrique minimale autorisée, veuillez vérifier la capacité de la pompe séparément",
              "Confirmer le débit cible, la marge et la disponibilité à long terme",
            ],
            [
              "marge de pression",
              "Limites de fonctionnement autorisées pour la pompe candidate moins la demande à l’état d’équilibre la moins défavorable",
              "Absorber la dispersion liée à la fabrication, à la mesure, au vieillissement et aux conditions de fonctionnement",
            ],
            [
              "Protection transitoire ou anormale",
              "Commutation de vanne, blocage, mauvaise commutation, serrage, valeur de crête start-stop",
              "Déterminer les limites de détection, d'arrêt, de décompression et de protection des composants",
            ],
          ],
        },
      ],
    },
    {
      title: "4. Exemple de bilan : additionner les pertes permanentes et traiter séparément les transitoires et la marge",
      blocks: [
        {
          type: "paragraph",
          text: "Ce qui suit montre uniquement les méthodes et ne représente pas l’équipement réel du client. Supposons un débit cible de 220 mL/min ; dans les conditions de régime permanent les plus défavorables mais durables, les données mesurées ou fournies par le fournisseur donnent : pertes côté aspiration 10 kPa, conduite de refoulement droite 18 kPa, vanne 12 kPa, fin de vie du filtre 35 kPa, aiguille 95 kPa, chambre d'extrémité 20 kPa.",
        },
        {
          type: "formula",
          expression:
            "ΔPworst,steady(220 mL/min) ≈ 10 + 18 + 12 + 35 + 95 + 20 = 190 kPa",
          note: "Ces six éléments ne peuvent être ajoutés que s’ils appartiennent au même débit cible et au même régime permanent le plus défavorable.",
        },
        {
          type: "paragraph",
          text: "190 kPa montre que les plates-formes ordinaires de classe 100 kPa ne devraient généralement pas être des candidates directes, mais cela n'empêche pas de déclarer que n'importe quelle pompe de 600 kPa suffira. L'étape suivante consiste à lire la courbe contrôlée de la pompe candidate à 220 mL/min et à calculer la marge de pression tout en vérifiant le fluide, la température, les conditions d'entrée, les connexions, l'alimentation électrique et le cycle de service.",
        },
        {
          type: "paragraph",
          text: "S'il existe une valeur maximale à court terme lors de la commutation de la vanne, elle doit être enregistrée comme un événement transitoire indépendant et la protection doit être conçue en fonction de son amplitude, de sa durée et du lieu de son apparition. Cela ne s'ajoute pas au point de fonctionnement en régime permanent de 190 kPa, et la marge de pression ne s'ajoute pas non plus à l'équation en régime permanent sous forme de chute de pression supplémentaire.",
        },
      ],
    },
    {
      title: "5. Exemple avec FOREACH DPL30H : traduire l'analyse en sélection de produit",
      blocks: [
        {
          type: "paragraph",
          text: "Les paramètres publics de la pompe à membrane liquide haute pression FOREACH DPL30H comprennent un débit à vide de 300 mL/min, une pression nominale de 600 kPa, une hauteur d'auto-amorçage de 3 mH₂O et une connexion par virole à tube dur de 6 × 4 mm. Il peut entrer dans le pool de candidats à haute contre-pression, mais la sélection se concentre toujours sur le débit qui peut être fourni à la contre-pression cible et si le point de fonctionnement se situe dans le milieu, la température et la plage de fonctionnement autorisées par les spécifications contrôlées.",
        },
        {
          type: "paragraph",
          text: "Si la résistance principale provient de l'aiguille et du filtre, leurs chutes de pression dans des conditions réelles de fluide, de température et de durée de vie doivent être obtenues ; Si le problème principal vient d'une pression négative à l'entrée ou d'un réapprovisionnement insuffisant en fluide, la capacité de pression de sortie élevée ne peut pas automatiquement compenser les conditions du côté aspiration.",
        },
        {
          type: "links",
          items: [
            {
              prefix: "Pour l'acceptation du produit, veuillez vous référer à :",
              label: "Guide de sélection de la pompe à membrane liquide haute pression DPL30H",
              href: "/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide",
              suffix: ".",
            },
          ],
        },
      ],
    },
    {
      title: "6. Après le bilan de pression, vérifier la plus faible pression de service admissible de tout le circuit",
      blocks: [
        {
          type: "paragraph",
          text: "Les pompes sont conçues pour 600 kPa, ce qui ne signifie pas que tous les tuyaux, raccords, vannes, filtres, capteurs de pression et chambres rigides de 6 × 4 mm sont automatiquement qualifiés pour un fonctionnement autorisé à 600 kPa. La pression de service admissible de l'ensemble du circuit hydraulique est déterminée par la pression de service la plus basse autorisée de tous les composants sous pression.",
        },
        {
          type: "list",
          items: [
            "Confirmez le matériau du tuyau, la tolérance du diamètre extérieur, la qualité de coupe, la profondeur d'insertion et les exigences de verrouillage de la virole.",
            "Confirmez la pression de service admissible, la pression d'essai et les conditions correspondantes de la vanne, du filtre, du capteur et de la chambre respectivement, et ne mélangez pas les termes.",
            "Sélectionnez la plage du capteur, l'arrêt de surpression et le chemin de décompression en fonction de l'état stable normal, de l'état stable le plus défavorable et de la limite de protection transitoire.",
            "Tests complets de maintien de la pression, de fuite, de démarrage et d'arrêt, de commutation de vannes, de protection contre les blocages et de phases de vie.",
          ],
        },
      ],
    },
    {
      title: "7. Modèle recommandé pour transmettre les conditions de fonctionnement lors d'une demande",
      blocks: [
        {
          type: "table",
          headers: ["Champ", "Remplissez l'exemple (veuillez remplacer par un projet réel)"],
          rows: [
            ["Milieu et température", "Eau purifiée, 20-30℃"],
            ["Cibler le débit", "Nominal 220 mL/min, minimum 200 mL/min"],
            [
              "Conditions d'entrée",
              "Le niveau de liquide dans le réservoir est à 0,4 m en dessous de la pompe ; il y a de l'air dans le tube au premier démarrage",
            ],
            [
              "Ligne de décharge",
              "2,0 mm ID, 1,2 m de longueur, 2 vannes, 1 filtre et aiguille d'extrémité",
            ],
            [
              "Données de pression à l'état stable",
              "Enregistrez respectivement l'état d'équilibre normal et l'état d'équilibre le plus défavorable, comme la fin de la durée de vie du filtre.",
            ],
            [
              "Transitoires et protection",
              "Enregistrement individuel des pics de commutation des vannes, des durées, des seuils d'arrêt et des chemins de décompression",
            ],
            ["Régime de service", "45 s par cycle, 1 200 cycles par jour ; indiquer aussi la plage de température ambiante"],
            ["contrôle", "24 V, régulation de vitesse PWM, nécessite un retour FG"],
            [
              "Vérifier la cible",
              "Débit, pression en régime permanent, pics transitoires, démarrage, élévation de température, fuites et tendances de durée de vie",
            ],
          ],
        },
      ],
    },
    {
      title: "Données du site FOREACH et limites des preuves",
      blocks: [
        {
          type: "links",
          items: [
            {
              label: "FOREACH : Guide de sélection de la pompe à membrane pour liquide haute pression DPL30H",
              href: "/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide",
            },
          ],
        },
        {
          type: "notice",
          label: "Limites des preuves :",
          text: "Les informations publiques du site servent uniquement à décrire la méthode ; la conception finale doit reposer sur des spécifications contrôlées, une évaluation avec le fluide réel, des essais de pression dynamique et une validation de la machine complète.",
        },
      ],
    },
  ],
  faqTitle: "Foire aux questions | Comment budgétiser les conduites hydrauliques à haute contre-pression ?",
  faqItems: [
    {
      question: "Le bilan de pression doit-il être exact pour chaque composant ?",
      answer:
        "Lors de la phase de sélection préliminaire, la principale résistance peut être identifiée en premier ; au moment d’entrer dans la phase de finalisation, toutes les réductions évidentes et les éléments clés doivent être vérifiés. Dans les circuits microfluidiques, un joint de petit diamètre peut également devenir la principale source de chute de pression.",
    },
    {
      question: "Que faire si les données du filtre en fin de vie ne sont pas disponibles ?",
      answer:
        "Demandez d’abord au fournisseur la courbe débit-chute de pression du modèle correspondant, puis établissez les limites via des tests de charge ou un étranglement équivalent. Vous ne pouvez pas utiliser uniquement les données des nouveaux éléments filtrants pour représenter l’ensemble du cycle de vie.",
    },
    {
      question: "Le pic de pression instantané peut-il être ajouté directement à la pression en régime permanent ?",
      answer:
        "Cela ne devrait pas être traité de cette façon. La valeur de crête transitoire doit être enregistrée séparément en fonction de l'amplitude, de la durée, du lieu d'occurrence et des conditions de déclenchement pour la plage du capteur, l'arrêt, la décompression et la vérification des limites transitoires des composants ; il ne s'agit pas d'une pression de service continue et n'ajoute pas de point de fonctionnement en régime permanent.",
    },
    {
      question: "Si le budget de pression est inférieur à 600 kPa, puis-je absolument utiliser une pompe de 600 kPa ?",
      answer:
        "Pas nécessairement. Confirmez aussi le débit à la pression cible, la marge de pression, le fluide, la température, les conditions d'entrée, le régime de service, la commande, le raccordement et la plus faible pression de service admissible de tout le circuit.",
    },
    {
      question: "À quelle étape du projet convient-il d'établir le bilan de pression ?",
      answer:
        "Au stade de la conception, des calculs préliminaires sont d’abord effectués. Au stade du prototype, des capteurs sont utilisés pour mesurer l’état stable normal, l’état stable le plus défavorable et la valeur de crête transitoire. Des limites contrôlées de travail, de marge et de protection sont formées avant que la conception ne soit gelée.",
    },
  ],
  cta: {
    title: "Besoin de vérifier votre budget de pression pour une conduite de fluide à haute contre-pression ?",
    description:
      "Le fluide, le débit cible, les conditions d'entrée, le trajet complet du liquide, la pression à l'état stable normale et la plus défavorable, les événements transitoires, le système de fonctionnement et les exigences de contrôle peuvent être soumis, et l'ingénieur aidera à vérifier la courbe de la pompe candidate et l'ensemble des limites du trajet.",
    contactLabel: "Transmettre les conditions de fonctionnement",
    productsLabel: "Voir les pompes à membrane haute pression",
    productsHref:
      "/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
