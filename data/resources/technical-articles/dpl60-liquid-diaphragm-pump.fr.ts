import type { Dpl60ArticleCopy } from "./dpl60-liquid-diaphragm-pump.types";

export const dpl60ArticleFrCopy = {
  metadata: {
    title: "Comment choisir une pompe à membrane de 600 mL/min : guide DPL60 débit, pression et modèles",
    seoTitle: "Pompe à membrane 600 mL/min : point de fonctionnement et modèles DPL60",
    seoDescription:
      "Guide de sélection de la pompe à membrane pour liquides FOREACH DPL60 : débit à vide 600 mL/min, pression nominale 100 kPa, courbe, moteurs, matériaux, codification et huit SKU.",
  },
  diagram: {
    ariaLabel: "Explication du point de fonctionnement de la pompe DPL60",
    suctionTitle: "Condition d'aspiration",
    dischargeTitle: "Condition de refoulement",
    inletOpen: "Dépression d'entrée",
    outletClosed: "Résistance du circuit",
    suctionDescription: "L'aspiration modifie le débit réel",
    inletClosed: "Contre-pression",
    outletOpen: "Débit réel",
    dischargeDescription: "Les courbes pompe et réseau fixent le point de fonctionnement",
    caption: "Point de fonctionnement du DPL60",
  },
  section1: {
    title: "1. À quel besoin répond le DPL60 de 600 mL/min ?",
    paragraphs: [
      "Le DPL60 est la pompe à membrane miniature pour liquides de FOREACH destinée aux circuits instrumentaux demandant un débit plus élevé. Elle convient au lavage, au rinçage, à la circulation, au transfert de volumes plus importants et à l'évacuation des effluents.",
      "Les 600 mL/min correspondent au débit de référence à vide. La pression nominale est de 100 kPa, la hauteur d'auto-amorçage de 3 mH₂O, avec des versions 12 V ou 24 V CC, à balais ou sans balais, et des combinaisons EP/PS ou FF/PS.",
      "Comme toute pompe à membrane miniature, elle utilise le mouvement alternatif d'une membrane et des clapets anti-retour. Pour le DPL60, le point essentiel est cependant le fonctionnement après intégration dans le circuit fluidique réel.",
      "Pour un besoin principalement proche de 300 mL/min, comparez le DPL30. Si la contre-pression est la contrainte dominante, évaluez une pompe de pression supérieure plutôt que de vous fier au seul débit à vide.",
    ],
  },
  section2: {
    title: "2. Que faut-il définir avant de choisir une pompe de 600 mL/min ?",
    intro:
      "La classe de débit ne suffit pas. Il faut définir ensemble le point de fonctionnement, le liquide, l'aspiration, les matériaux en contact, le moteur, le cycle de service et la résistance totale du circuit.",
    headers: ["Critère", "À confirmer", "Erreur fréquente"],
    rows: [
      ["Débit cible", "Débit à vide ou débit requis à une pression donnée", "Considérer 600 mL/min comme un débit installé constant"],
      ["Pression réseau", "Pertes dans filtres, vannes, raccords, tubes fins, buses et point final", "Lire 100 kPa sans vérifier le débit à la pression cible"],
      ["Aspiration", "Dénivelé, longueur, étanchéité et état au premier démarrage", "Supposer 3 mH₂O garantis dans toute installation"],
      ["Matériaux mouillés", "Tête, membrane, clapets et conditions complètes du fluide", "Déduire la compatibilité globale du seul PTFE ou FFKM"],
      ["Moteur et alimentation", "12 V / 24 V, balais / sans balais et signaux de commande", "Choisir uniquement selon le prix ou la durée de vie"],
      ["Circuit", "Longueur, coudes et composants avec tube de 3,2 mm de diamètre intérieur", "Ignorer résistance et fuites du circuit assemblé"],
      ["Service", "Fonctionnement continu ou intermittent, durée quotidienne, démarrages et thermique", "Comparer les durées de vie sans leurs conditions d'essai"],
    ],
  },
  section3: {
    title: "3. Pourquoi 600 mL/min n'est-il pas un débit fixe dans l'instrument ?",
    paragraphs: [
      "Les 600 mL/min du DPL60 sont une référence à vide, dans la zone de faible différence de pression. Les 100 kPa constituent une spécification de pression distincte, pas le même point de fonctionnement.",
      "Après montage, tuyaux, filtres, vannes, raccords, restrictions, différences de niveau et propriétés du liquide créent dépression d'entrée et pression de sortie. Le débit évolue selon la courbe officielle.",
      "Si l'instrument doit maintenir environ 600 mL/min, déterminez la pression du circuit à ce débit, vérifiez la marge sur la courbe puis validez le circuit complet.",
    ],
    noticeStrong: "Le DPL60 est une pompe de classe 600 mL/min, pas une pompe à débit constant de 600 mL/min.",
    noticeText:
      "Il ne faut pas combiner « débit à vide 600 mL/min » et « pression nominale 100 kPa » pour annoncer 600 mL/min à 100 kPa.",
  },
  section4: {
    title: "4. Caractéristiques techniques complètes du DPL60",
    intro:
      "Les valeurs suivantes proviennent de la spécification en vigueur. Les versions à balais et sans balais partagent la même classe de performance, mais leur masse et leur durée de vie diffèrent.",
    headers: ["Paramètre", "Version à balais", "Version sans balais"],
    rows: [
      { label: "Produit", value: "Pompe à membrane pour liquides DPL60" },
      { label: "Exemples de modèles", brushed: "DPL60-24DB, DPL60-12DB", brushless: "DPL60-24BB, DPL60-12BB" },
      { label: "Moteur", brushed: "CC à balais", brushless: "CC sans balais" },
      { label: "Tension nominale", value: "12 V CC ±10 % ou 24 V CC ±10 %" },
      { label: "Puissance nominale", value: "≤8,4 W" },
      { label: "Débit à vide", value: "600 mL/min" },
      { label: "Pression nominale", value: "100 kPa" },
      { label: "Hauteur d'auto-amorçage", value: "3 mH₂O" },
      { label: "Fluide spécifié", value: "Eau purifiée ; autres liquides à évaluer" },
      { label: "Température du fluide", value: "+5 °C à +80 °C" },
      { label: "Tube", value: "Diamètre intérieur 3,2 mm" },
      { label: "Tête de pompe", value: "PPS" },
      { label: "Membrane", value: "EPDM ou PTFE selon le modèle" },
      { label: "Clapet", value: "EPDM ou FFKM selon le modèle" },
      { label: "Masse", brushed: "Environ 170 g", brushless: "Environ 195 g" },
      { label: "Durée de vie spécifiée", brushed: "3 000 h, tension nominale, fonctionnement continu", brushless: "10 000 h, tension nominale, fonctionnement continu" },
    ],
  },
  section5: {
    title: "5. Comment lire la courbe débit-pression du DPL60 ?",
    paragraphs: [
      "La courbe officielle indique l'évolution du débit lorsque la dépression d'entrée ou la pression positive de sortie varie. Le débit est le plus élevé près d'une différence de pression nulle et change avec la difficulté d'aspiration ou la contre-pression.",
      "Utilisez la courbe pour trouver le débit disponible à la pression cible, et non pour répéter l'étiquette 600 mL/min. Avec filtres, petites vannes, longs tubes fins ou chambres pressurisées, estimez ou mesurez d'abord les pertes de charge.",
    ],
    figureAlt: "Courbe officielle débit-pression de la pompe DPL60",
    figureCaption: "Courbe débit-pression du DPL60 ; 600 mL/min est la référence à vide",
    notice:
      "Viscosité, tracé, raccords, vannes, filtres, montage et niveau du liquide peuvent déplacer le point réel. Validez le circuit complet.",
  },
  section6: {
    title: "6. Comment choisir les matériaux en contact du DPL60 ?",
    intro:
      "Les principales pièces en contact sont la tête PPS, la membrane et les clapets. La compatibilité doit porter sur l'ensemble des matériaux et les conditions réelles du fluide.",
    headers: ["Combinaison", "Membrane / clapet", "Tête et évaluation"],
    rows: [
      ["EP/PS", "Membrane EPDM + clapet EPDM", "PPS ; confirmer fluide, concentration, température et contact"],
      ["FF/PS", "Membrane PTFE + clapet FFKM", "PPS ; confirmer fluide, concentration, température et contact"],
    ],
    epTitle: "Combinaison EP/PS",
    epText:
      "EP/PS signifie membrane EPDM, clapets EPDM et tête PPS. C'est une configuration de départ pour l'eau purifiée et certains liquides conventionnels après évaluation.",
    ffTitle: "Combinaison FF/PS",
    ffText:
      "FF/PS signifie membrane PTFE, clapets FFKM et tête PPS. Elle peut être évaluée pour des exigences chimiques supérieures, sans rendre toute la pompe universellement compatible.",
    noticeStrong: "Le fluide de travail spécifié est l'eau purifiée.",
    noticeText:
      "Pour un autre liquide, précisez identité, composition, concentration, température, durée de contact et nettoyage ; évaluez le chemin mouillé complet et validez un échantillon.",
  },
  section7: {
    title: "7. DPL60 à balais ou sans balais ?",
    intro:
      "Outre la durée de vie, la masse, l'encombrement moteur, le câblage et la commande diffèrent. Réservez l'espace d'après le plan officiel correspondant.",
    headers: ["Comparaison", "À balais", "Sans balais"],
    rows: [
      ["Moteur", "CC à balais", "CC sans balais"],
      ["Durée de vie", "3 000 h", "10 000 h"],
      ["Condition", "Tension nominale, fonctionnement continu", "Tension nominale, fonctionnement continu"],
      ["Usage typique", "Durée limitée, commande simple, coût sensible", "Longue durée, objectif de vie élevé ou commande et retour"],
      ["Masse", "Environ 170 g", "Environ 195 g"],
      ["Commande", "Alimentation / marche-arrêt", "PWM, DIR et FG selon configuration"],
    ],
    afterTable:
      "La durée de vie conserve ses conditions d'essai. Contre-pression, alimentation, température, démarrages, refroidissement et fluide modifient la durée réelle.",
    brushedTitle: "Dimensions de la version à balais",
    brushedAlt: "Plan recadré des dimensions du DPL60 à balais",
    brushedCaption: "Zone utile du plan DPL60 à balais ; utiliser le plan 2D officiel pour le montage",
    brushedText:
      "Vérifiez longueur, tête, perçages, embout cannelé et direction du tube sur le plan à balais ; n'utilisez ni l'enveloppe du DPL30 ni celle de la version sans balais.",
    brushlessTitle: "Dimensions de la version sans balais",
    brushlessAlt: "Plan recadré des dimensions du DPL60 sans balais",
    brushlessCaption: "Zone utile du plan DPL60 sans balais ; utiliser le plan 2D officiel pour le montage",
    brushlessText:
      "Le corps moteur, la longueur totale et le faisceau diffèrent. Confirmez la variante de production, car des moteurs équivalents peuvent présenter des différences locales de montage.",
  },
  section8: {
    title: "8. Codification DPL60 et huit modèles standard",
    intro:
      "Le code complet identifie série, tension, moteur, nombre de fils, raccordement, orientation, matériaux membrane/clapet/tête et personnalisation.",
    noticeStrong: "DPL60 - 24 - D - 2 - B - C - EP/PS - X",
    noticeText: "Série · tension · moteur · fils · raccordement · orientation · matériaux mouillés · personnalisation",
    headers: ["Champ", "Code", "Signification"],
    rows: [
      ["Série", "DPL60", "Pompe DPL60 de classe 600 mL/min"],
      ["Tension", "24 / 12", "24 V CC / 12 V CC"],
      ["Moteur", "D / B / C / BP", "D : CC à balais ; B : CC sans balais ; C : sans fer ; BP : sans balais avec PWM externe"],
      ["Fils", "2 / 3 / 5", "2, 3 ou 5 ; les champs par défaut peuvent être omis"],
      ["Raccordement", "B / S", "B : embout cannelé ; S : filetage"],
      ["Orientation", "3 / 6 / 9 / C", "3 : droite ; 6 : bas ; 9 : gauche ; C : haut, omis par défaut"],
      ["Matériaux", "EP/PS / FF/PS", "EPDM + EPDM + PPS / PTFE + FFKM + PPS"],
      ["Personnalisation", "X", "Code projet ; absent sans personnalisation"],
    ],
    exampleTitle: "Exemple : DPL60-24DB-EP/PS",
    exampleText:
      "Ce modèle se développe en DPL60-24-D-2-B-C-EP/PS ; les deux fils et l'orientation vers le haut par défaut sont omis.",
    exampleHeaders: ["Champ", "Interprétation"],
    exampleRows: [
      ["DPL60", "Série de pompe de classe 600 mL/min"],
      ["24", "24 V CC"],
      ["D", "Moteur CC à balais"],
      ["2 (omis)", "Deux fils"],
      ["B", "Embout cannelé"],
      ["C (omis)", "Orientation vers le haut"],
      ["EP/PS", "Membrane EPDM + clapet EPDM + tête PPS"],
    ],
    notice:
      "« DB » n'est pas un code unique : D désigne le moteur à balais et B l'embout cannelé. Dans DPL60-24BB-EP/PS, le premier B désigne le moteur sans balais et le second l'embout.",
    standardModelsTitle: "Huit modèles DPL60 standard actuels",
    standardModelsIntro:
      "Le tableau officiel couvre 12 V / 24 V × balais / sans balais × EP/PS / FF/PS. Tous les modèles et codes article sont du texte HTML indexable.",
    standardModelHeaders: ["N°", "Code article", "Modèle standard", "Tension", "Moteur", "Membrane", "Clapet", "Tête"],
    standardModelRows: [
      ["1", "459003", "DPL60-24DB-EP/PS", "24 V", "À balais", "EPDM", "EPDM", "PPS"],
      ["2", "459004", "DPL60-24BB-EP/PS", "24 V", "Sans balais", "EPDM", "EPDM", "PPS"],
      ["3", "459015", "DPL60-12DB-EP/PS", "12 V", "À balais", "EPDM", "EPDM", "PPS"],
      ["4", "459016", "DPL60-12BB-EP/PS", "12 V", "Sans balais", "EPDM", "EPDM", "PPS"],
      ["5", "459030", "DPL60-24DB-FF/PS", "24 V", "À balais", "PTFE", "FFKM", "PPS"],
      ["6", "459031", "DPL60-24BB-FF/PS", "24 V", "Sans balais", "PTFE", "FFKM", "PPS"],
      ["7", "459032", "DPL60-12DB-FF/PS", "12 V", "À balais", "PTFE", "FFKM", "PPS"],
      ["8", "459033", "DPL60-12BB-FF/PS", "12 V", "Sans balais", "PTFE", "FFKM", "PPS"],
    ],
  },
  section9: {
    title: "9. Séquence complète de sélection",
    steps: [
      ["Définir le débit utile", "Distinguer 600 mL/min presque à vide du débit requis à une pression donnée."],
      ["Déterminer la pression", "Comptabiliser tubes, raccords, filtres, vannes, restrictions, dénivelé et pression finale."],
      ["Lire la courbe officielle", "Localiser le point cible et confirmer la marge."],
      ["Définir le liquide", "Préciser identité, composition, concentration, température, viscosité, particules et contact."],
      ["Définir l'aspiration", "Noter hauteur, longueur et diamètre, étanchéité et premier démarrage."],
      ["Choisir tension et moteur", "Sélectionner 12 V / 24 V et balais / sans balais selon alimentation, service, vie et commande."],
      ["Choisir les matériaux", "Évaluer EP/PS ou FF/PS pour les conditions complètes."],
      ["Vérifier l'intégration", "Contrôler tube 3,2 mm, dimensions, orientation, faisceau et accès."],
      ["Valider dans l'instrument", "Tester débit, amorçage, bruit, température, stabilité et fonctionnement prolongé."],
    ],
  },
  section10: {
    title: "10. Usages adaptés et limites",
    intro:
      "Le DPL60 peut être évalué pour les liquides à débit plus élevé dans les systèmes IVD, l'automatisation de laboratoire et les instruments analytiques : lavage, rinçage, circulation, transfert et effluents.",
    headers: ["Sujet", "Limite"],
    rows: [
      ["600 mL/min", "Référence à vide, pas un débit fixe dans toutes les installations."],
      ["100 kPa", "Pression nominale distincte du débit à vide ; lire la courbe."],
      ["Autres liquides", "Fluide spécifié : eau purifiée ; les autres exigent évaluation et essai."],
      ["Auto-amorçage", "3 mH₂O dans les conditions spécifiées ; le démarrage dépend de toute l'aspiration."],
      ["Durée de vie", "3 000 h et 10 000 h restent liés à la tension nominale et au service continu."],
      ["Validation finale", "Spécifications, courbes, plans et matériaux guident ; l'instrument réel tranche."],
    ],
  },
  section11: {
    title: "Conclusion",
    paragraphs: [
      "Choisissez le DPL60 en séparant « pompe de classe 600 mL/min » du débit réel, puis combinez pression 100 kPa, courbe, fluide, aspiration, matériaux, alimentation, vie moteur et encombrement.",
      "Si l'équipement doit rester proche de 600 mL/min sous contre-pression, basez-vous sur la courbe à cette pression et sur l'essai du circuit complet, pas sur le débit à vide.",
    ],
  },
  internalLinks: {
    dpl30Prefix: "Pour le cycle complet membrane-clapets ou une comparaison en classe 300 mL/min, consultez le",
    dpl30Label: "guide de sélection DPL30",
    dpl30Suffix: ".",
    productPrefix: "Pour les configurations, plans et téléchargements, ouvrez la",
    productLabel: "page produit DPL60",
    productSuffix: ".",
    categoryPrefix: "Pour comparer d'autres classes de débit et pression, revenez aux",
    categoryLabel: "pompes à membrane pour liquides",
    categorySuffix: ".",
  },
} as const satisfies Dpl60ArticleCopy;
