import type { Dpgl800ArticleCopy } from "./dpgl800-gas-liquid-diaphragm-pump.types";

export const dpgl800ArticleFrCopy = {
  metadata: {
    title: "Comment choisir une pompe à membrane gaz-liquide : débit, vide et temps de mise sous vide du DPGL800",
    seoTitle: "Comment choisir une pompe à membrane gaz-liquide | DPGL800 | FOREACH",
    seoDescription: "Guide DPGL800 gaz-liquide : débit de gaz à vide de 6 L/min, vide ＜-90 kPa, pression 30 kPa et temps de mise sous vide d'une chambre d'essai de 5 L.",
    coverAlt: "Pompe à membrane gaz-liquide sans balais FOREACH DPGL800, 6 L/min et vide ＜-90 kPa",
  },
  section1: {
    title: "1. Pourquoi le DPGL800 ne se choisit pas comme une pompe à liquide classique",
    paragraphs: [
      "Le DPGL800 est conçu pour les gaz et les mélanges gaz-liquide : aspiration d'effluents contenant de l'air, purge de conduites, création d'un vide ou aspiration maintenue lors d'arrivées intermittentes de liquide.",
      "Le débit seul ne suffit donc pas. Il faut préciser l'état du fluide, le vide cible, le temps disponible, le volume du système, la pression de refoulement, les pertes, les matériaux mouillés et le raccordement. La plateforme DPGL800-24BS est sans balais, alimentée en DC 24 V ±10%, pour une puissance ≤17 W.",
    ],
  },
  section2: {
    title: "2. Données à établir avant la sélection",
    intro: "Ces informations permettent de savoir si 6 L/min et ＜-90 kPa conviennent au cycle réel.",
    headers: ["Point", "Information attendue", "Impact"],
    rows: [
      ["État du fluide", "Gaz, mélange, bouchons liquides, mousse ou particules", "Détermine la pompe, les matériaux et l'essai"],
      ["Objectif d'aspiration", "Vide cible et temps autorisé", "Vide limite et vitesse d'évacuation sont distincts"],
      ["Volume du système", "Volume gazeux de la chambre, des tubes, filtres et accessoires", "Modifie directement le temps de mise sous vide"],
      ["Refoulement", "Échappement libre ou contre-pression", "Déplace le débit de fonctionnement"],
      ["Circuit", "Longueur, diamètre, vannes, raccords, filtres, joints et fuite", "Les restrictions et fuites ralentissent l'évacuation"],
      ["Fluide et température", "Composition, concentration, plage +5℃ à +40℃", "Nécessaire à la compatibilité"],
      ["Intégration", "Encombrement, taraudage G1/8, orientation et câblage", "Valide l'intégration mécanique"],
    ],
  },
  section3: {
    title: "3. Que représente réellement 6 L/min ?",
    paragraphs: [
      "La valeur 6 L/min correspond au débit de gaz, sans charge, d'une seule tête. Elle situe la gamme de performance, mais ne représente ni un débit réel de liquide pur ni un débit constant sous n'importe quel vide ou contre-pression.",
      "Le débit évolue avec le vide d'aspiration et la résistance au refoulement. Tubes, vannes, raccords, filtres, étanchéité, bouchons liquides et proportion gaz-liquide modifient également le point de fonctionnement, qui doit être validé sur le système complet.",
    ],
    noticeStrong: "6 L/min et ＜-90 kPa ne sont pas un même point de fonctionnement.",
    noticeText: "6 L/min est une référence de débit de gaz sans charge ; ＜-90 kPa est la capacité de vide maximale. Le débit n'est pas garanti à 6 L/min sous ＜-90 kPa.",
  },
  section4: {
    title: "4. Caractéristiques essentielles du DPGL800-24BS",
    intro: "Ces limites restent identiques dans toutes les versions ; les matériaux et l'orientation dépendent du code complet.",
    headers: ["Paramètre", "DPGL800-24BS"],
    rows: [
      ["Moteur", "CC sans balais"], ["Tension", "DC 24 V ±10%"], ["Puissance", "≤17 W"],
      ["Débit sans charge d'une tête", "6 L/min (capacité gaz, pas débit réel de liquide pur)"],
      ["Pression positive maximale", "30 kPa"], ["Pression négative / vide maximal", "＜-90 kPa"],
      ["Fluides", "Gaz et mélanges gaz-liquide"], ["Température fluide / ambiante", "+5℃ à +40℃"],
      ["Raccordement", "Taraudage G1/8"], ["Masse", "Environ 600 g"],
      ["Durée de vie spécifiée", "10000 h à la tension nominale, en fonctionnement continu"],
      ["Matériaux mouillés", "Tête PPS ; membrane EPDM ou PTFE et clapet EPDM ou FFKM selon modèle"],
    ],
  },
  section5: {
    title: "5. Lire la courbe débit de gaz–pression",
    paragraphs: [
      "À proximité d'une pression différentielle nulle, le débit atteint environ 6 L/min. Il change ensuite lorsque le vide à l'entrée ou la pression de sortie augmente.",
      "On part de la plage de pression demandée par l'instrument, puis on lit le débit disponible en conservant une marge. La courbe montre la tendance ; la limite officielle de pression positive reste 30 kPa.",
    ],
    figureAlt: "Courbe débit de gaz-pression du DPGL800 montrant environ 6 L/min près de zéro pression",
    figureCaption: "Courbe débit-pression DPGL800 ; 6 L/min et ＜-90 kPa sont des points distincts",
    notice: "Tubes, vannes, raccords, filtres, étanchéité et proportion gaz-liquide déplacent le point réel : un essai du circuit installé reste nécessaire.",
  },
  section6: {
    title: "6. Interpréter le temps de mise sous vide de la chambre d'essai de 5 L",
    paragraphs: [
      "La courbe mesure le temps nécessaire dans une chambre fixe de 5 L et un circuit d'essai défini. À l'approche du vide limite, la dernière partie prend généralement plus de temps ; une simple règle proportionnelle n'est donc pas valable.",
      "Les 5 L constituent une condition d'essai, pas une limite de capacité, de produit ou d'application. Un système réel de 0,5 L, 2 L ou 10 L donnera un autre résultat, influencé aussi par les tubes, vannes, raccords, filtres, joints et fuites.",
    ],
    figureAlt: "Courbe de temps de mise sous vide du DPGL800 dans une chambre d'essai fixe de 5 L jusqu'à -90 kPa",
    figureCaption: "Mise sous vide DPGL800 dans une chambre d'essai de 5 L ; 5 L ne limite pas l'application",
    notice: "Pour calculer le temps de cycle, essayez le volume, le circuit et le taux de fuite réels au lieu d'extrapoler directement la courbe 5 L.",
  },
  section7: {
    title: "7. Aspiration gaz-liquide ou transfert continu de liquide pur",
    paragraphs: [
      "Le DPGL800 convient aux gaz, mélanges gaz-liquide, effluents, purges et créations de vide. Ses 6 L/min sont définis pour le gaz et ne constituent pas un débit dosé continu de liquide pur.",
      "Pour un liquide pur stable, comparez le débit sous pression, l'auto-amorçage, la pulsation et la compatibilité. En présence de beaucoup d'air ou d'un vide élevé, validez le DPGL800 dans le circuit réel.",
    ],
    dpl60Prefix: "Pour une solution de transfert continu de liquide de classe 600 mL/min, consultez le",
    dpl60Label: "guide de sélection de la pompe à membrane DPL60",
    dpl60Suffix: ".",
  },
  section8: {
    title: "8. Taraudages G1/8, dimensions et orientation",
    paragraphs: [
      "Le DPGL800 utilise des taraudages G1/8. Le passage du raccord, l'étanchéité et le diamètre du tube influencent pertes et fuites. Vérifiez la longueur d'environ 118,8 mm, les perçages, la masse d'environ 600 g et le dégagement du câble.",
      "L'orientation est donnée par le code modèle. Le plan montre les directions possibles ; la livraison doit correspondre au modèle complet et au plan approuvé.",
    ],
    figureAlt: "Plan dimensionnel du DPGL800 avec taraudages G1/8, perçages de fixation et encombrement",
    figureCaption: "Dimensions DPGL800 ; utiliser le plan 2D approuvé et le modèle final pour l'intégration",
    headers: ["Code", "Direction", "Contrôle"],
    rows: [["3", "Droite", "Raccord et maintenance à droite"], ["6", "Bas", "Rayon de courbure inférieur"], ["9", "Gauche", "Raccord et maintenance à gauche"], ["C", "Haut", "Dégagement supérieur"]],
  },
  section9: {
    title: "9. Codification et interprétation du DPGL800",
    intro: "Le code complet décrit série, tension, moteur, raccord, orientation, matériaux mouillés et personnalisation.",
    modelCode: "DPGL800 - 24 - B - S - 6 - EP/PS - X",
    modelCodeDescription: "Série · tension · moteur sans balais · raccord fileté · orientation · matériaux membrane/clapet/tête · personnalisation",
    headers: ["Champ", "Code", "Signification"],
    rows: [
      ["Série", "DPGL800", "Pompe à membrane gaz et gaz-liquide"], ["Tension", "24 / 12", "DC 24 V ; le code 12 V existe dans la nomenclature"],
      ["Moteur", "B", "CC sans balais"], ["Raccord", "S", "Taraudage G1/8"], ["Orientation", "3 / 6 / 9 / C", "Droite / bas / gauche / haut"],
      ["Matériaux", "EP/PS / FF/PS", "EPDM+EPDM+PPS / PTFE+FFKM+PPS"], ["Personnalisation", "X", "Identifiant d'une configuration spéciale"],
    ],
    exampleTitle: "Exemple : DPGL800-24BS6-EP/PS",
    exampleText: "Série DPGL800, 24 V, sans balais, taraudage G1/8, ports vers le bas, membrane EPDM, clapet EPDM et tête PPS.",
    standardModelsTitle: "Trois modèles standard actuels",
    standardModelsIntro: "Les références et modèles restent du texte HTML indexable pour les bureaux d'études et les achats.",
    standardModelHeaders: ["Référence", "Modèle", "Tension", "Moteur", "Direction", "Membrane", "Clapet", "Tête"],
    standardModelRows: [
      ["459039", "DPGL800-24BS6-EP/PS", "24 V", "Sans balais", "Bas", "EPDM", "EPDM", "PPS"],
      ["459040", "DPGL800-24BS6-FF/PS", "24 V", "Sans balais", "Bas", "PTFE", "FFKM", "PPS"],
      ["459041", "DPGL800-24BSC-EP/PS", "24 V", "Sans balais", "Haut", "EPDM", "EPDM", "PPS"],
    ],
    notice: "Le code 12 V existe dans la nomenclature, mais aucun SKU standard 12 V n'est actuellement proposé. Il ne faut pas en déduire un modèle standard.",
  },
  section10: {
    title: "10. Séquence complète de sélection",
    steps: [
      ["Définir le fluide", "Préciser proportion gaz-liquide, bouchons, mousse, particules et phases liquides prolongées."],
      ["Fixer vide et cycle", "Indiquer le vide cible et le temps autorisé, pas seulement ＜-90 kPa."],
      ["Calculer le volume effectif", "Inclure chambre, tubes, filtres, vannes et accessoires."],
      ["Définir la contre-pression", "Repérer le point réel sur la courbe débit-pression."],
      ["Vérifier les matériaux", "Choisir EP/PS ou FF/PS selon composition, concentration, température et contact."],
      ["Choisir l'orientation", "Sélectionner 3, 6, 9 ou C et vérifier raccords G1/8 et espace."],
      ["Vérifier alimentation et durée", "DC 24 V ±10%, ≤17 W et condition continue de 10000 h."],
      ["Valider le système", "Mesurer vide, temps, débit, fuite, bruit, échauffement et transitions gaz-liquide."],
    ],
  },
  section11: {
    title: "11. Matériaux et limites d'utilisation",
    intro: "La compatibilité concerne tout le chemin mouillé : tête, membrane, clapet, raccords, joints et tubes.",
    headers: ["Combinaison", "Construction", "Critère"],
    rows: [
      ["EP/PS", "Membrane EPDM + clapet EPDM + tête PPS", "Base d'évaluation ; valider avec le fluide réel"],
      ["FF/PS", "Membrane PTFE + clapet FFKM + tête PPS", "Pour exigences accrues ; pas une compatibilité universelle"],
      ["Température", "+5℃ à +40℃", "Fluide et ambiance dans la plage"],
      ["Durée de vie", "10000 h", "À tension nominale en continu ; charge, température, cycles et fluide influencent le réel"],
    ],
  },
  conclusion: {
    title: "Conclusion",
    paragraphs: [
      "Traitez séparément le débit de gaz sans charge de 6 L/min, le vide maximal de ＜-90 kPa et le temps mesuré dans la chambre de 5 L, puis appliquez le volume, les pertes, les fuites, le fluide et les matériaux réels.",
      "Pour un liquide pur continu, comparez une pompe comme la DPL60. Pour l'air, les effluents, la purge ou un vide élevé, validez le DPGL800 sur le circuit gaz-liquide final.",
    ],
  },
  internalLinks: {
    productPrefix: "Retrouvez configurations, dimensions et téléchargements sur la",
    productLabel: "page produit DPGL800",
    productSuffix: ".",
    categoryPrefix: "Pour comparer d'autres débits, pressions et fluides, revenez aux",
    categoryLabel: "pompes à membrane",
    categorySuffix: ".",
  },
} as const satisfies Dpgl800ArticleCopy;
