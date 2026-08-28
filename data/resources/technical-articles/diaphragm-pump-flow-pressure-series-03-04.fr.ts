import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const TUBE_DIAMETER_ARTICLE_ASSET_BASE =
  "/images/resources/technical-articles/tube-inner-diameter-affects-diaphragm-pump-flow";

const SUCTION_DISCHARGE_ARTICLE_ASSET_BASE =
  "/images/resources/technical-articles/suction-vs-discharge-resistance-diaphragm-pump";

export const tubeInnerDiameterAffectsDiaphragmPumpFlowFrCopy = {
  metadata: {
    title: "Pourquoi le débit réel change-t-il autant lorsque le diamètre du tube est modifié avec la même micropompe à membrane ?",
    seoTitle: "Débit après changement du diamètre intérieur du tube : diagnostic par pression | FOREACH",
    seoDescription:
      "Si le débit d'une micropompe à membrane diminue après un changement de tube, il faut distinguer diamètre intérieur, longueur, passage interne des raccords et état de la pompe. Ce guide propose de mesurer conjointement pression d'entrée, pression de sortie et débit.",
    coverImage: `${TUBE_DIAMETER_ARTICLE_ASSET_BASE}/article-cover.webp`,
    coverAlt: "Tubes et essai de débit d'une micropompe à membrane FOREACH dans une vidéo Douyin officielle",
  },
  deck:
    "Même si la pompe n'est pas remplacée, le débit installé peut également changer en raison du diamètre intérieur, de la longueur, de la courbure et du diamètre minimum du tuyau. Lorsque vous rencontrez \"le débit chute après avoir changé les tuyaux\", le moyen efficace d'y remédier n'est pas de douter d'abord de la pompe, ni de rendre tous les tuyaux plus épais, mais de mesurer simultanément la pression d'entrée, la pression de sortie et le débit cumulé pour déterminer où la résistance est ajoutée.",
  leadBlocks: [
    {
      type: "notice",
      text:
        "Confirmez d'abord que la variation est réelle, puis comparez la pression en amont de la pompe, la pression en aval et le débit : une baisse de la pression absolue d'entrée oriente vers l'aspiration, tandis qu'une hausse de la contre-pression de sortie oriente vers le refoulement. Si les deux pressions restent proches de l'état initial mais que le débit demeure anormal, contrôlez les prises d'air, l'alimentation, les clapets de la pompe, le fluide et la méthode de mesure.",
    },
    {
      type: "paragraph",
      text:
        "Le diamètre extérieur du tuyau est principalement lié à l'installation de l'interface, et le fluide passe par le trou intérieur. Les tuyaux ayant le même diamètre extérieur peuvent avoir des diamètres intérieurs différents en raison des différentes épaisseurs de paroi ; une flexion, un serrage excessif de l'attache ou une insertion trop profonde du joint peuvent également former un canal efficace localement plus petit que le diamètre intérieur nominal. Ce qui doit réellement être inventorié, c'est le diamètre effectif minimum de l'ensemble du trajet du liquide et la chute de pression de chaque section, et non la taille unique indiquée sur l'emballage.",
    },
    {
      type: "figure",
      src: `${TUBE_DIAMETER_ARTICLE_ASSET_BASE}/article-figure-en.webp`,
      alt: "Les changements dans le diamètre intérieur du tube déplacent la courbe du système et modifient le point de fonctionnement de la micropompe à membrane.",
      width: 2560,
      height: 2160,
      caption:
        "Changer le tuyau ne modifiera pas directement la courbe de la pompe, mais cela modifiera la différence de pression requise par le système à chaque débit, et finalement déplacera le point d'intersection de la courbe de la pompe et de la courbe du système. L'image montre le principe de diagnostic et ne représente pas les données réelles mesurées du modèle spécifique.",
    },
  ],
  sections: [
    {
      title: "1. Tout d’abord, transformez « le débit a chuté après le changement de tuyau » en données comparables.",
      blocks: [
        {
          type: "paragraph",
          text:
            "Les débits avant et après le remplacement des canalisations ne peuvent être comparés que lorsque les limites des tests sont cohérentes. Tout changement dans la tension aux bornes de la pompe, le fluide, la température du liquide, le niveau de stockage du liquide, l'extrémité de sortie, la durée de fonctionnement et la méthode des statistiques de débit peut être superposé aux changements dans le pipeline. Il est recommandé de conserver l'ancien tuyau comme référence et d'effectuer des tests A/B sur la même pompe.",
        },
        {
          type: "table",
          headers: ["Éléments qui doivent être corrigés ou enregistrés", "Méthode d'enregistrement suggérée", "Une erreur de jugement à éviter"],
          rows: [
            ["Pompes et entraînements", "La même pompe ; enregistrer la tension de charge d'extrémité de la pompe, le courant et les paramètres PWM", "Mauvaise évaluation de la perte de pression d'alimentation ou du changement de régulation de vitesse en raison de l'influence du diamètre du tuyau"],
            ["Milieu et température", "Même lot de médias ; enregistrer la température du liquide, la viscosité ou l'état de la formule", "Interpréter à tort les changements de viscosité comme des différences de tuyaux"],
            ["Limite du chemin du liquide", "Niveau fixe, hauteur de pointe, position de la vanne, filtre et pointeau", "Changer plusieurs éléments de résistance à la fois, impossible de les positionner"],
            ["État du tuyau", "Enregistrez le matériau, le diamètre intérieur mesuré, la longueur, le lot, le rayon de courbure et la méthode de fixation.", "Comparez uniquement par diamètre extérieur ou nom de produit"],
            ["Mesure de débit", "Utiliser le même temps cumulé et effectuer une validation croisée par méthode de pesée si nécessaire", "Le débit pulsé rend les lectures instantanées incomparables"],
          ],
        },
        {
          type: "notice",
          text:
            "Si le débit se rétablit après la réinstallation de l'ancien tuyau, mais que le problème réapparaît après la réinstallation du nouveau tuyau, il y a une raison suffisante pour concentrer l'enquête sur le nouveau tuyau, ses joints, sa direction et son état d'assemblage.",
        },
      ],
    },
    {
      title: "2. Utiliser la pression d'entrée, la pression de sortie et le débit pour localiser le côté du goulot d'étranglement",
      blocks: [
        {
          type: "paragraph",
          text:
            "Le point de mesure de la pression doit être aussi proche que possible de l'entrée et de la sortie de la pompe. Maintenez le diamètre de pression constant avant et après le changement de tuyau et enregistrez le débit moyen après stabilisation. Le simple fait de regarder la baisse du débit ne peut que confirmer que le point de fonctionnement a changé ; l'enregistrement des pressions aux deux extrémités ensemble permet de déterminer plus facilement si le changement provient de la section d'aspiration, de la section de refoulement ou de l'extérieur du trajet du liquide.",
        },
        {
          type: "formula",
          expression: "ΔPpump = Pout - Pin",
          note:
            "Pin et Pout doivent utiliser la même référence de pression. Lors de la comparaison de la pression différentielle de la pompe, la pression relative ou la pression absolue peut être utilisée uniformément ; lorsqu'il s'agit de cavitation, la pression absolue doit être utilisée.",
        },
        {
          type: "table",
          headers: ["Principaux phénomènes après remplacement de canalisation", "preuve de pression", "Contrôle prioritaire"],
          rows: [
            ["La perfusion devient plus lente et le débit diminue", "La pression d'entrée diminue par rapport à la ligne de base et la pression de sortie n'augmente pas de manière significative.", "Le tuyau d'aspiration est trop fin ou trop long, plié et aplati, le joint d'entrée a un diamètre réduit et il fuit."],
            ["Capable de drainer le fluide, mais le débit de décharge diminue", "L'entrée est proche de la ligne de base et la contre-pression de sortie augmente", "Tube de décharge, raccord de sortie, filtre, vanne, aiguille ou chambre d'extrémité"],
            ["L'entrée est plus basse et la sortie est plus haute", "La différence de pression aux deux extrémités de la pompe augmente en même temps", "Ajoutez de la résistance aux sections d'aspiration et de refoulement, ou l'ensemble du pipeline est modifié en même temps."],
            ["La pression est proche de la ligne de base mais le débit est toujours faible", "La pression statique moyenne aux deux extrémités ne change pas de manière significative.", "Fuite à l'entrée, bulles d'air, dynamique des vannes, tension aux bornes de la pompe, fluide ou réponse de mesure"],
            ["Le débit monte et descend de façon cyclique", "La forme d'onde de pression fluctue de manière synchronisée", "Écrasement ou fermeture périodique du tuyau, bulles, raccords non étanches, orientation des vannes ou mesure inadaptée d'un débit pulsé"],
          ],
        },
        {
          type: "paragraph",
          text:
            "La pression moyenne peut masquer les pulsations transitoires dans une pompe à membrane. Si le problème ne survient que lors des phases de démarrage, de commutation de vanne ou de débit élevé, la forme d'onde de pression, les bulles dans la section transparente du tuyau et la déformation du tuyau doivent être observées en même temps au lieu de simplement retranscrire une valeur d'affichage stable.",
        },
      ],
    },
    {
      title: "3. Pourquoi une petite modification du diamètre intérieur peut entraîner une modification significative de la chute de pression ?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Lorsque des conditions idéales telles que des tuyaux droits circulaires de diamètres égaux, un fluide newtonien et un écoulement laminaire pleinement développé sont établies, la sensibilité de la chute de pression du tuyau droit au diamètre intérieur peut être estimée à l'aide de la relation de Hagen-Poiseuille :",
        },
        {
          type: "formula",
          expression: "ΔP = 128μLQ / (πd⁴)",
          note:
            "μ est la viscosité dynamique, L la longueur du tube, Q le débit volumique et d le diamètre intérieur. Cette formule ne tient compte ni des effets d'entrée, ni des raccords, vannes et filtres, ni de la déformation du tuyau ou des pulsations de la pompe à membrane ; elle ne sert qu'à une estimation préliminaire lorsque ses hypothèses sont respectées.",
        },
        {
          type: "paragraph",
          text:
            "Dans une comparaison théorique en gardant le débit, la longueur et la viscosité identiques, lorsque le diamètre intérieur est réduit de 3,2 mm à 2,0 mm, le rapport de chute de pression du tuyau droit est d'environ 6,55 ; lorsqu'il est réduit à 1,6 mm, le rapport est d'environ 16. Cela montre que le diamètre intérieur mérite d'être vérifié en priorité, mais cela ne signifie pas que le débit réel sera réduit de 6,55 fois ou 16 fois. Le débit réel se stabilisera à nouveau au point où la nouvelle courbe du système croise la courbe de la pompe.",
        },
        {
          type: "links",
          items: [
            {
              prefix: "Pour comprendre la relation complète entre les courbes de pompe, les courbes du système et les points de fonctionnement, lisez",
              label: "Guide de lecture de la courbe débit-pression de la pompe à membrane",
              href: "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide",
              suffix: ".",
            },
            {
              prefix: "Une estimation préliminaire du trajet du liquide peut être utilisée",
              label: "Outil de calcul de la résistance des fluides",
              href: "/resources/calculators/fluid-resistance/",
              suffix: ", en fin de compte, il doit encore être basé sur le test réel du circuit liquide.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Ne vous contentez pas de regarder le tuyau : le diamètre minimum peut être caché à l'intérieur des joints et des composants",
      blocks: [
        {
          type: "table",
          headers: ["Points limites possibles", "Méthodes d'inspection sur place", "Base du jugement"],
          rows: [
            ["Corps de tuyau", "Mesurez le diamètre intérieur réel, la longueur totale et la section transversale pliée", "La pression et le débit seront-ils rétablis après le remplacement du tuyau droit court ?"],
            ["Connecteur ou adaptateur pagode", "Vérifiez le diamètre interne minimum du trou, le pas et la profondeur d'insertion.", "La chute de pression diminue-t-elle après avoir contourné ou remplacé le connecteur ?"],
            ["Vannes et filtres", "Testez respectivement les états à vide, d'accès aux nouveaux composants et chargé.", "Si la différence de pression avant et après le composant devient le principal élément de pression"],
            ["Aiguilles, buses et capillaires", "Vérifier le diamètre intérieur, la longueur et la forme de l'entrée", "Même très court, cet élément peut dominer la résistance de tout le circuit"],
            ["position fixe du flexible", "Observez les attaches, les boucles, les virages serrés et les zones ramollies par les températures élevées.", "Y a-t-il un aplatissement partiel ou une fermeture périodique pendant le fonctionnement ?"],
          ],
        },
        {
          type: "paragraph",
          text:
            "Les dimensions des raccords de tuyaux dans les données du produit sont d'abord utilisées pour illustrer l'adaptation de l'interface et ne signifient pas que le même débit peut être maintenu avec n'importe quelle longueur, n'importe quel matériau et n'importe quelle méthode d'acheminement des tuyaux. Si les filtres, les vannes ou les aiguilles représentent déjà la majorité de la chute de pression, il peut y avoir peu de gain à augmenter le diamètre intérieur d'un tuyau droit simple.",
        },
      ],
    },
    {
      title: "5. Processus de diagnostic de remplacement segmenté recommandé",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Enregistrez la pression d'entrée, la pression de sortie, la tension aux bornes de la pompe, le courant, le débit cumulé et le temps de démarrage sous l'ancienne configuration de canalisation pour établir une référence reproductible.",
            "Remplacez un seul côté du tuyau, en laissant l'autre côté et les composants d'extrémité inchangés ; Testez d'abord le côté aspiration, puis le côté refoulement.",
            "Utilisez d'abord un tuyau droit court pour tester le corps du tuyau, puis ajoutez progressivement des coudes, des joints, des vannes et des filtres selon la direction réelle.",
            "Chaque fois qu'un élément est ajouté, la pression change et les changements de débit avant et après l'élément sont enregistrés pour trouver l'étape avec la plus grande augmentation de chute de pression.",
            "En cas de suspicion d'une réduction du diamètre du joint ou local, utilisez un composant de dérivation avec un diamètre connu pour vérifier le remplacement et ne jugez pas sur la base de l'apparence.",
            "Répétez l'essai dans la position d'installation finale, avec le niveau de liquide et le fluide réels ainsi que le programme de commande complet ; conservez le lot de tuyaux, les photographies et la version des données.",
          ],
        },
        {
          type: "notice",
          text:
            "Le but des tests segmentaires n'est pas de prouver qu'« un certain diamètre de tuyau doit être correct », mais de mapper les changements de débit aux changements de pression mesurables. Ce n'est qu'ainsi qu'il y aura des limites de projet réutilisables lorsque des lots seront modifiés, que le câblage sera modifié ou que des composants seront ajoutés.",
        },
      ],
    },
    {
      title: "6. Quand le problème ne peut-il pas être attribué au diamètre du tuyau ?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Si le test A/B ne peut pas être reproduit ou si la pression aux deux extrémités ne change pas de manière constante avec les changements dans la canalisation, la portée du diagnostic doit être élargie. Les fuites d'entrée, l'air emprisonné, la viscosité et la température du liquide, l'orientation de la vanne, l'état du filtre, l'alimentation électrique de la pompe, l'usure de l'échantillon et la réponse du débitmètre au débit pulsé peuvent tous provoquer des phénomènes similaires.",
        },
        {
          type: "table",
          headers: ["Autres éléments de confirmation", "suggérer des preuves", "Limites nécessitant une confirmation technique"],
          rows: [
            ["La pompe est-elle normale ?", "Répétez le test dans la boucle de référence à résistance moyenne et faible spécifiée.", "Les limites de jugement doivent être dérivées des spécifications contrôlées du modèle correspondant ou des spécifications d'inspection."],
            ["Le nouveau tuyau est-il qualifié ?", "Diamètre intérieur mesuré réel, épaisseur de paroi, dureté, résistance à la déformation par lots et par pression négative", "Les tolérances dimensionnelles et matérielles doivent être confirmées par la chaîne d'approvisionnement et la R&D"],
            ["Le point de fonctionnement répond-il au besoin de l'équipement ?", "Enregistrer en continu le débit, la pression, l'échauffement et le démarrage dans les conditions réelles", "Les critères d'acceptation doivent découler du temps de cycle, de la précision de dosage et des objectifs de durée de vie"],
            ["Est-ce stable à long terme ?", "Répétez les tests à la fin de la durée de vie du filtre, au niveau minimum de liquide et aux limites de température.", "Les analyses d'eau claire à court terme ne peuvent pas être utilisées comme substitut à la vérification réelle du support."],
          ],
        },
      ],
    },
  ],
  faqTitle: "FAQ : Questions fréquemment posées sur les modifications de débit après le remplacement d'un tuyau",
  faqItems: [
    {
      question: "Pourquoi le débit est-il toujours différent après le remplacement de tuyaux de même diamètre extérieur ?",
      answer:
        "Étant donné que la tolérance d'épaisseur de paroi modifiera le diamètre intérieur, la dureté du matériau, l'état de flexion et la résistance à la déformation par pression négative modifieront également le diamètre effectif. Le diamètre intérieur réel, la longueur, le rayon de courbure et le lot doivent être enregistrés plutôt que de simplement comparer le diamètre extérieur.",
    },
    {
      question: "Le débit augmentera-t-il définitivement si tous les tuyaux sont remplacés par des diamètres intérieurs plus grands ?",
      answer:
        "Pas nécessairement. Si la taille minimale de l'alésage de l'aiguille, du filtre, de la vanne, du connecteur ou de la cavité d'extrémité domine la résistance du système, les avantages de l'augmentation du diamètre intérieur d'un tube droit ordinaire peuvent être limités. Les principaux goulots d’étranglement doivent d’abord être identifiés à l’aide de différences de pression segmentées.",
    },
    {
      question: "Une fois que le diamètre du tuyau devient plus petit, la pompe augmentera-t-elle automatiquement jusqu'à la pression nominale ?",
      answer:
        "Cela ne peut pas être déduit. Les changements de tuyauterie modifient la courbe du système et la pompe fonctionne à l'intersection de sa propre courbe de performance et de la nouvelle courbe du système. La nouvelle pression et le nouveau débit dépendent de l'ensemble du circuit hydraulique, des courbes d'entraînement et de la pompe, et la pression nominale ne constitue pas un point de fonctionnement automatiquement atteint.",
    },
    {
      question: "La réduction soudaine du diamètre d’une petite section seulement affectera-t-elle de manière significative le débit ?",
      answer:
        "Peut-être. En plus de la perte le long du tube mince lui-même, le diamètre raccourci entraînera également des pertes locales telles que le retrait et la dilatation ; lorsque son diamètre est beaucoup plus petit que le reste du trajet du liquide, il peut néanmoins devenir un point de restriction majeur. Cela doit être confirmé par une mesure réelle avec un bypass ou des pièces de rechange.",
    },
    {
      question: "Comment déterminer rapidement s’il s’agit d’un problème de nouvelle canalisation ou d’un problème de pompe ?",
      answer:
        "Utilisez la même pompe pour effectuer un test A/B répétable entre les anciens et les nouveaux tuyaux, tout en enregistrant la pression d'entrée, la pression de sortie, la tension aux bornes de la pompe et le débit cumulé. Ce n'est que lorsque l'ancien tuyau est restauré après le remontage et que le nouveau tuyau peut déclencher des exceptions à plusieurs reprises que le problème peut être localisé au nouveau tuyau et à son assemblage.",
    },
  ],
  cta: {
    title: "Le débit est anormal après remplacement du tuyau. Devons-nous localiser ensemble le goulot d’étranglement de la conduite de liquide ?",
    description:
      "Vous pouvez fournir le modèle de pompe, le fluide, le diamètre intérieur et la longueur réels du tuyau, le passage du raccord, les pressions d'entrée et de sortie, la tension aux bornes de la pompe et le débit avant et après remplacement. Ces données permettront à l'ingénieur d'évaluer le point de fonctionnement réel.",
    contactLabel: "Contacter un ingénieur",
    productsLabel: "Voir les produits de pompes à membrane",
    productsHref: "/products/pumps/miniature-diaphragm-pumps",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const suctionVsDischargeResistanceDiaphragmPumpFrCopy = {
  metadata: {
    title: "Quelle résistance affecte le plus une micropompe à membrane : celle du tube d'aspiration ou celle du tube de refoulement ?",
    seoTitle: "Résistance d'aspiration et contre-pression de refoulement d'une micropompe | FOREACH",
    seoDescription:
      "Les résistances d'aspiration et de refoulement augmentent la pression différentielle exigée, mais produisent des symptômes différents. Ce guide utilise la pression absolue d'entrée, la contre-pression de sortie et le débit pour distinguer problèmes d'amorçage, cavitation et pression sans débit.",
    coverImage: `${SUCTION_DISCHARGE_ARTICLE_ASSET_BASE}/article-cover.webp`,
    coverAlt: "Essai d'aspiration et de refoulement d'une micropompe à membrane FOREACH dans une vidéo Douyin officielle",
  },
  deck:
    "Les pertes des deux côtés augmentent la pression différentielle de la micropompe, sans qu'un côté soit toujours prioritaire. L'aspiration conditionne surtout l'amorçage, le remplissage de la chambre, la sensibilité aux prises d'air, le dégazage et la cavitation ; le refoulement se manifeste plutôt par une contre-pression accrue, un débit réduit ou un fonctionnement contre une obstruction. Le diagnostic doit enregistrer sur le même axe temporel la pression absolue d'entrée, la pression de sortie et le débit.",
  leadBlocks: [
    {
      type: "notice",
      text:
        "A partir du point de fonctionnement, les pertes des deux côtés vont augmenter la pression différentielle de la pompe ; À partir du mode de défaillance, le côté aspiration est également soumis à la pression absolue d'entrée et aux conditions d'étanchéité, de sorte que la même valeur de perte de pression peut produire des performances sur site complètement différentes.",
    },
    {
      type: "figure",
      src: `${SUCTION_DISCHARGE_ARTICLE_ASSET_BASE}/article-figure-en.webp`,
      alt: "Comparaison des effets de la résistance à l'aspiration et de la résistance au refoulement sur l'état de fonctionnement des pompes à membrane",
      width: 2560,
      height: 1920,
      caption:
        "La résistance côté aspiration réduit la pression absolue à l'entrée de la pompe, et la résistance côté refoulement augmente la contre-pression de sortie ; les deux augmenteront la différence de pression que la pompe doit établir, mais les preuves de l’enquête et les limites de risque sont différentes.",
    },
  ],
  sections: [
    {
      title: "1. Mettez d’abord la résistance des deux côtés dans la même relation de pression",
      blocks: [
        {
          type: "formula",
          expression: "ΔPpump = Pout - Pin",
          note:
            "Pin et Pout doivent utiliser une référence de pression constante. Du point de vue de la pression différentielle de la pompe, la pression relative ou la pression absolue peut être utilisée uniformément ; lors de l’analyse de la cavitation, la pression absolue d’entrée doit être utilisée seule.",
        },
        {
          type: "paragraph",
          text:
            "Dans une comparaison approximative avec d'autres conditions égales, une perte de pression supplémentaire de 20 kPa avant la pompe, ou une contre-pression supplémentaire de 20 kPa après la pompe, peut déplacer le point de fonctionnement vers un débit inférieur. Cependant, la perte du côté aspiration réduira également la pression absolue locale à l’entrée de la pompe et dans la chambre de la pompe, et amplifiera les effets des petites fuites d’air, des baisses de niveau de liquide et des précipitations de gaz. Par conséquent, la gravité du défaut ne peut pas être jugée uniquement par la pression différentielle totale.",
        },
        {
          type: "table",
          headers: ["Comparer les dimensions", "La résistance côté aspiration augmente", "La résistance côté décharge augmente"],
          rows: [
            ["changement de pression direct", "La pression absolue d'entrée diminue et la valeur absolue de la pression manométrique négative augmente", "Augmentation de la jauge de sortie ou de la pression absolue"],
            ["Symptômes de démarrage courants", "L’introduction initiale du liquide est lente et il peut être difficile d’établir une colonne de liquide stable.", "Le liquide peut généralement encore être drainé, mais la vidange est plus lente"],
            ["Manifestation habituelle", "Bulles, fluctuations de débit et bruit qui s'aggravent lorsque le niveau de liquide baisse", "La pression de sortie augmente, le débit diminue et la pression monte en cas d'obstruction"],
            ["Principaux risques supplémentaires", "Sensible aux fuites d’air, au réapprovisionnement insuffisant en fluide dans la chambre de pompe, au dégagement de gaz ou à la cavitation", "Charge du moteur et de la structure, échauffement, résistance à la pression du filtre ou de la canalisation"],
            ["mesures clés", "Pression absolue près de l'entrée de la pompe et sa forme d'onde", "Contre-pression près de la sortie de la pompe et sa forme d'onde"],
          ],
        },
      ],
    },
    {
      title: "2. Lorsque la résistance du côté aspiration est trop élevée, pourquoi est-il plus facile de « ne pas pouvoir aspirer » ?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Plus la conduite d'aspiration est longue, plus le diamètre intérieur est petit, plus elle présente de courbures ou plus la chute de pression à travers la vanne d'entrée, le filtre et les raccords est importante, plus la pression absolue d'entrée de la pompe est généralement basse. Lorsque le niveau de stockage du liquide diminue ou que la hauteur d'aspiration augmente, l'effet de pression statique se superpose également. Lors du premier démarrage, il y a de l'air dans le tube et la chambre de la pompe doit être purgée et la colonne de liquide établie en premier, de sorte que le problème est souvent plus évident que lors d'un fonctionnement stable.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Le temps de démarrage initial est nettement plus long et se rétablira temporairement après le remplissage ou la diminution de la hauteur d'aspiration.",
            "Il y a une légère fuite d'air dans le joint d'entrée et il se peut qu'il n'y ait pas de fuite de liquide de l'extérieur, mais la pompe a du mal à établir une colonne de liquide stable.",
            "Le débit diminue à mesure que le niveau du liquide de stockage diminue, ou devient plus instable à haute température et dans des milieux volatils.",
            "Des bulles étaient visibles dans la section transparente du tuyau, et les pulsations de pression et de débit se sont intensifiées, accompagnées d'un bruit anormal.",
          ],
        },
        {
          type: "notice",
          text:
            "La pression manométrique d’entrée négative ne peut pas être directement comparée à la pression de vapeur liquide. Pour juger de la cavitation, la pression absolue doit être utilisée et la pression de vapeur saturée doit être obtenue en fonction de la température réelle du milieu. Les lectures des capteurs proches de l'entrée de la pompe ne sont toujours pas égales à la pression locale instantanée la plus basse dans la chambre de la pompe, et des marges de perte dynamiques et locales doivent être conservées.",
        },
        {
          type: "formula",
          expression: "Pin,abs = Patm + Pin,gauge",
          note:
            "Cette conversion peut être effectuée lorsque le capteur de pression relative prend la pression atmosphérique locale comme point zéro ; Une pression manométrique négative rendra la pression absolue d'entrée inférieure à la pression atmosphérique locale. Les sources de fluide sous pression fermées ou différentes conditions de référence doivent être converties en fonction de la pression réelle.",
        },
        {
          type: "formula",
          expression: "Plocal,abs > Pvapor(T) + engineering margin",
          note:
            "Il s’agit de l’expression de contraintes techniques nécessaires pour éviter la vaporisation de liquides dans des zones localisées de basse pression. La vapeur doit correspondre au milieu et à la température réels ; la marge requise doit être déterminée en fonction de la pulsation de pression, de l'emplacement du point de mesure, de la perte dans le pipeline et des résultats de vérification.",
        },
      ],
    },
    {
      title: "3. Lorsque la résistance côté refoulement est trop grande, pourquoi ressemble-t-elle davantage à « il y a une pression mais un débit insuffisant » ?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Des tubes minces, des vannes, des filtres, des aiguilles, des buses et des chambres à pression positive du côté refoulement peuvent augmenter la contre-pression de sortie. À mesure que la contre-pression augmente, la micropompe à membrane se déplace généralement le long de sa courbe débit-pression jusqu'à un point de fonctionnement à débit inférieur ; dans le même temps, le courant de fonctionnement, l'augmentation de la température, les pulsations de pression et la charge structurelle peuvent également changer.",
        },
        {
          type: "table",
          headers: ["Phénomène sur place", "Preuve soutenant une plus grande résistance du côté décharge", "Doit être exclu"],
          rows: [
            ["Peut drainer le liquide normalement mais s'écoule lentement", "La pression d'entrée est proche de la ligne de base et la contre-pression de sortie augmente considérablement.", "Viscosité moyenne, tension aux bornes de la pompe et erreur du débitmètre"],
            ["Le débit diminue après une période d'utilisation du filtre", "La différence de pression entre l'avant et l'arrière de l'élément filtrant augmente avec le temps", "Pertes d'aspiration dues au filtre d'entrée"],
            ["Le débit change brusquement après la commutation de la vanne", "La pression de sortie change de manière synchrone sous la position de vanne correspondante", "Sens de la vanne, ouverture incomplète ou synchronisation du contrôle"],
            ["Montée en pression ou déclenchement de la protection lorsque l'extrémité est bouchée", "La pression de sortie augmente rapidement et le débit se rapproche de zéro", "Pression nominale admissible et dispositifs de décharge sûrs pour l'ensemble du circuit liquide"],
          ],
        },
        {
          type: "paragraph",
          text:
            "La pression nominale ne permet pas de maintenir la pression pendant une longue période et ne peut pas non plus remplacer la vérification de la pression du système. Les tuyaux, joints, vannes, filtres, capteurs et cavités doivent tous être vérifiés en fonction de leurs valeurs nominales contrôlées respectives ; la logique de protection et la durée admissible dans des conditions de blocage doivent être confirmées par l'ingénierie du produit et de la machine complète.",
        },
      ],
    },
    {
      title: "4. Utilisez la combinaison de pression et de phénomène pour distinguer les défauts des deux côtés",
      blocks: [
        {
          type: "table",
          headers: ["phénomène", "Caractéristiques de la pression d'entrée", "Caractéristiques de la pression de sortie", "Prioriser le dépannage"],
          rows: [
            ["Démarrage lent ou échec d’aspiration du liquide pour la première fois", "La pression absolue d'entrée est faible ou fluctue anormalement", "Pas nécessairement augmenté de manière significative", "Conduite d'aspiration, niveau de liquide, joints qui fuient, vanne d'entrée et filtre d'entrée"],
            ["Du liquide a été aspiré mais le débit est faible", "proche de la ligne de base", "La contre-pression est supérieure à la ligne de base", "Tubes à décharge, filtres, vannes, aiguilles et chambres d'extrémité"],
            ["Le débit fluctue et des bulles apparaissent", "Pression absolue ou forme d'onde anormale", "Fluctuations simultanées possibles", "Dégazage, prise d'air à l'entrée, vaporisation locale ou déformation des clapets et du tuyau"],
            ["Refoulement ou siphon après arrêt", "Affecté par le niveau de liquide, la pression statique et l'étanchéité", "État de libération de pression résiduelle anormal", "Clapets anti-retour, hauteurs d'installation, chemins de siphon et risque de fuite"],
            ["La pression aux deux extrémités s'écarte de la ligne de base", "Chute de pression absolue à l'entrée", "La contre-pression de sortie augmente", "Il y a une nouvelle résistance des deux côtés en même temps et des contournements sont nécessaires par sections."],
          ],
        },
        {
          type: "paragraph",
          text:
            "Placez les capteurs aussi près que possible de l'entrée et de la sortie de la pompe, puis synchronisez l'enregistrement avec le débit, le niveau de liquide, la position des vannes, la tension aux bornes de la pompe et le temps. Une seule mesure à une extrémité éloignée omet les pertes entre le point de mesure et la pompe ; une simple moyenne stable peut masquer les transitoires du démarrage et de la commutation des vannes.",
        },
      ],
    },
    {
      title: "5. Le filtre doit-il être placé avant ou après la pompe ? La décision dépend de l'objectif et des limites à respecter",
      blocks: [
        {
          type: "paragraph",
          text:
            "La position du filtre ne peut pas être résumée par « tous les composants à haute résistance doivent être placés du côté refoulement ». Avant de décider de l'emplacement, vous devez d'abord clarifier le but de la filtration, l'endroit où les particules sont générées, la tolérance de la pompe aux particules, la pression positive ou négative autorisée du matériau filtrant, la pire différence de pression après un blocage et si le système doit protéger la pompe ou protéger l'aval.",
        },
        {
          type: "table",
          headers: ["Options de mise en page", "Finalités auxquelles il peut s’appliquer", "Des limites à vérifier"],
          rows: [
            ["Filtrage à l'entrée", "Empêcher les particules en amont de pénétrer dans la pompe et protéger ses clapets et sa chambre", "Pression absolue d'entrée avec l'élément filtrant chargé, premier amorçage, temps d'auto-amorçage, risque de prise d'air et résistance du média filtrant à l'écrasement"],
            ["Quitter le filtrage", "Protéger les composants en aval ou effectuer une filtration fine des liquides post-pompage", "Contre-pression ajoutée, différence de pression maximale en cas de colmatage, résistance à la pression du boîtier du filtre, point de fonctionnement de la pompe et protection contre la surpression"],
            ["Filtration grossière en entrée + filtration fine en sortie", "Les risques de particules en amont cohabitent avec les exigences de propreté en aval", "Différence de pression superposée et stratégie de maintenance de deux filtres en fin de vie"],
            ["Ne pas installer de filtre universel", "Le milieu est propre et le système dispose d’un contrôle de contamination", "La tolérance aux particules des pompes et des composants en aval doit être confirmée par des données contrôlées"],
          ],
        },
        {
          type: "notice",
          text:
            "Si le filtre est situé à l'entrée, la pression absolue d'entrée et la capacité de démarrage doivent être vérifiées selon les conditions les plus défavorables après le chargement ; s'il est situé à la sortie, la contre-pression, le point de fonctionnement de la pompe et la résistance à la pression de tous les composants en aval doivent être vérifiés selon les conditions les plus défavorables après le chargement. La sélection de l'emplacement doit être déterminée par une combinaison d'objectifs de filtrage et de résultats de vérification.",
        },
      ],
    },
    {
      title: "6. Séquence pratique de configuration et de vérification du circuit liquide",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Dessinez le chemin complet du liquide depuis la source de liquide jusqu'à l'extrémité, en marquant la différence de niveau de liquide, le diamètre intérieur du tuyau, la longueur, les vannes, les joints, les filtres et le diamètre minimum.",
            "Gardez la pompe aussi près que possible de la source de liquide pour réduire la hauteur d'aspiration inutile ; Gardez le tuyau d'arrivée d'eau court, avec un diamètre suffisant, peu de coudes et une étanchéité fiable.",
            "Définissez des points de mesure de pression à proximité de l'entrée et de la sortie de la pompe, et enregistrez la pression absolue du côté entrée ou conservez une référence de pression qui peut être convertie de manière fiable.",
            "Établissez d'abord une ligne de base de faible résistance, puis ajoutez des composants respectivement du côté aspiration et du côté refoulement, et confirmez les chutes de pression respectives via une dérivation segmentée.",
            "Les conditions de fonctionnement les plus défavorables sont testées à nouveau au niveau de liquide le plus bas, à la température réelle du fluide, à la fin de la durée de vie du filtre, à la commutation des vannes et à la position d'installation finale.",
            "Enregistrez simultanément le débit, la forme d'onde de pression, la tension aux bornes de la pompe, le courant, l'heure de démarrage, les bulles, le bruit et l'augmentation de la température pour former un enregistrement d'acceptation traçable.",
          ],
        },
        {
          type: "links",
          items: [
            {
              prefix: "Pour approfondir la lecture du point de fonctionnement et de la courbe de pression :",
              label: "Guide de lecture de la courbe débit-pression de la pompe à membrane",
              href: "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide",
              suffix: ".",
            },
          ],
        },
      ],
    },
    {
      title: "7. Quelles conclusions doivent être confirmées par des tests de produits réels ou par l'ingénierie",
      blocks: [
        {
          type: "table",
          headers: ["Contenu à confirmer", "Raisons qui ne peuvent être déterminées par cet article seul", "suggérer des preuves"],
          rows: [
            ["Pression absolue d'entrée admissible et limite d'auto-amorçage", "Affecté par le modèle, la vitesse, le fluide, la température, le pipeline et l'état de la vanne", "Spécifications contrôlées par le modèle correspondant et test de démarrage du circuit fluide réel"],
            ["Marge de sécurité pour la cavitation ou le dégagement de gaz", "La pression instantanée la plus basse dans la chambre de pompe est difficile à représenter entièrement par un seul point de mesure d'entrée.", "Forme d'onde de pression, pression de vapeur moyenne, observation du tube transparent et vérification de la durabilité"],
            ["Contre-pression de sortie continue maximale", "La pression nominale, la pression maximale et la limite de décrochage à court terme ne sont pas les mêmes concepts", "Spécifications du produit, tests d'échauffement, de courant, de durée de vie et de stratégie de protection"],
            ["Emplacement d'installation du filtre", "Dépend de l'objectif de filtration, du risque de particules, de la tolérance de la pompe et de la résistance à la pression du filtre.", "Analyse des risques et tests complets des machines en fin de vie"],
            ["Critères d'acceptation des échecs", "Différents équipements ont des exigences différentes en matière de temps de démarrage, de fluctuation du débit, de bruit et d'erreur de dose.", "Exigences complètes de la machine, spécifications d'inspection et statistiques sur les prototypes"],
          ],
        },
        {
          type: "paragraph",
          text:
            "Cet article donne une méthode d'identification des défauts et non une valeur garantie pour un type de pompe spécifique. La pression d'entrée, la contre-pression, la position du filtre et les conditions de fonctionnement continu admissibles doivent être ramenées aux données contrôlées du modèle correspondant et vérifiées avec le fluide final et le circuit liquide complet.",
        },
      ],
    },
  ],
  faqTitle: "FAQ : questions fréquemment posées sur la résistance à l'aspiration et la contre-pression de refoulement",
  faqItems: [
    {
      question: "Si la perte de pression côté aspiration et côté refoulement augmente de 10 kPa chacun, l'impact sera-t-il exactement le même ?",
      answer:
        "Les contributions à la pression différentielle totale de la pompe peuvent être similaires, mais les modes de défaillance sont différents. Le côté aspiration réduira également la pression absolue d'entrée, augmentant le risque de réapprovisionnement insuffisant en fluide, la sensibilité aux fuites d'air, la séparation des gaz et la cavitation ; le côté refoulement montrera plus directement une augmentation de la contre-pression et une diminution du débit.",
    },
    {
      question: "Le filtre doit-il être installé avant ou après la pompe ?",
      answer:
        "Cela dépend du but de la filtration, de la source des particules, de la résistance aux particules de la pompe et de la différence de pression admissible du filtre. La filtration d'entrée doit vérifier la pression absolue d'entrée après le chargement et la première introduction de liquide ; la filtration de sortie doit vérifier la contre-pression après le chargement, la résistance à la pression du boîtier du filtre et la protection contre les surpressions. On ne peut pas généraliser.",
    },
    {
      question: "La pompe fait du bruit mais ne refoule pas de liquide. Quel côté dois-je vérifier en premier ?",
      answer:
        "Confirmez d'abord la source de liquide, le niveau de liquide, le tuyau d'entrée, la fuite du joint, la direction de la vanne et l'introduction initiale du liquide, puis confirmez si la sortie est bloquée ou si la contre-pression est trop élevée. Le moyen le plus rapide de faire la distinction est de mesurer simultanément la pression à proximité de l’entrée et de la sortie de la pompe et d’observer les bulles dans la section transparente du tuyau.",
    },
    {
      question: "La cavitation peut-elle être jugée en examinant uniquement la pression négative d'entrée ?",
      answer:
        "Non. La pression d'entrée doit être convertie en pression absolue et comparée à la pression de vapeur saturante du fluide à sa température réelle. Il faut aussi tenir compte de la pression locale instantanée minimale dans la chambre, des pulsations et des pertes entre le point de mesure et la chambre de la pompe. La confirmation finale exige des essais avec le fluide réel.",
    },
    {
      question: "Est-il forcément préférable d'avoir la pompe en dessous du niveau du liquide ?",
      answer:
        "Une pression statique positive à l'entrée facilite généralement le remplissage de la pompe, sans être préférable dans tous les cas. Il faut aussi évaluer le siphonnage, le reflux après arrêt, les fuites, les variations de pression de la source et les limites de sécurité de l'équipement, puis confirmer la pression d'entrée admissible de la pompe et des composants en amont.",
    },
    {
      question: "La mesure uniquement de la pression de sortie peut-elle déterminer les problèmes de conduite de liquide ?",
      answer:
        "Non. La pression de sortie ne peut pas indiquer des pertes d’aspiration à l’entrée, des fuites d’air ou une pression absolue d’entrée insuffisante. Au moins la pression d'entrée, la pression de sortie et le débit doivent être mesurés simultanément, et le niveau de liquide, la position de la vanne, la température du fluide et l'alimentation électrique de l'extrémité de la pompe doivent être enregistrés.",
    },
  ],
  cta: {
    title: "Besoin de distinguer une aspiration insuffisante d'une contre-pression de sortie excessive ?",
    description:
      "Vous pouvez fournir le modèle de pompe, le fluide et sa température, la différence de niveau, les dimensions des tuyaux d'aspiration et de refoulement, la position du filtre, la pression absolue d'entrée, la contre-pression de sortie et le débit mesuré. Ces données permettront à l'ingénieur de diagnostiquer l'ensemble du circuit.",
    contactLabel: "Contacter un ingénieur",
    productsLabel: "Voir les produits de pompes à membrane",
    productsHref: "/products/pumps/miniature-diaphragm-pumps",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
