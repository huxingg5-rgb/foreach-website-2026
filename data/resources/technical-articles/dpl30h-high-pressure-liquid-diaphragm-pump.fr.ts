import type { Dpl30hArticleCopy } from "./dpl30h-high-pressure-liquid-diaphragm-pump.types";

export const dpl30hArticleFrCopy: Dpl30hArticleCopy = {
  metadata: {
    title: "Comment choisir une pompe à membrane haute pression : guide DPL30H 300 mL/min et 600 kPa",
    seoTitle: "Sélection de la pompe à membrane haute pression DPL30H | FOREACH",
    seoDescription: "Sélectionnez la FOREACH DPL30H selon le débit à la contre-pression cible, 600 kPa, le tube rigide 6×4 mm, le moteur, les matériaux, la codification et la méthode de sélection.",
    coverAlt: "Pompes à membrane liquide haute pression FOREACH DPL30H à moteur à balais et brushless avec raccord pour tube rigide 6×4 mm",
  },
  section1: {
    title: "1. Pourquoi un circuit à forte contre-pression exige une autre sélection",
    paragraphs: [
      "Filtres, tubes rigides fins, vannes, chambres de mélange et longues lignes créent des pertes de charge. Le débit réel baisse lorsque la contre-pression augmente : le débit à vide ne suffit donc pas pour choisir. La DPL30H vise les circuits nécessitant une marge de pression supérieure, avec 300 mL/min à vide et 600 kPa de pression nominale.",
      "La DPL30H assure l'auto-amorçage et l'isolation gaz-liquide. Le fluide nominal est l'eau purifiée ; tout autre liquide doit être évalué selon sa concentration, sa température, la durée d'exposition, la pression et la durée de vie réelles.",
      "Ce n'est pas simplement une pompe standard agrandie : pression, raccord rigide, matériaux mouillés et commande moteur forment une seule limite système.",
    ],
  },
  section2: {
    title: "2. Confirmer d'abord six données d'application",
    intro: "Définissez le circuit fluidique avant de décoder la référence.",
    headers: ["Donnée", "À définir", "Importance"],
    rows: [
      ["Débit cible", "Débit continu requis à la contre-pression cible", "300 mL/min à vide n'est pas le débit au point de fonctionnement"],
      ["Contre-pression", "Pertes totales des filtres, vannes, tubes, chambres et dénivelé", "Détermine la pression à vaincre"],
      ["Fluide", "Identité, concentration, température et produits de nettoyage", "Permet de présélectionner EP/PS ou FF/PS"],
      ["Ligne", "Tube rigide 6×4 mm (DE×DI) et tous les raccords", "La fiabilité concerne l'ensemble de la ligne"],
      ["Commande", "Marche/arrêt ou aussi vitesse, sens et retour tachymétrique", "Détermine moteur à balais ou brushless cinq fils"],
      ["Durée de vie", "Temps quotidien, service continu/intermittent et maintenance", "Oriente la configuration et la validation"],
    ],
  },
  section3: {
    title: "3. 300 mL/min et 600 kPa ne constituent pas un même point",
    paragraphs: [
      "300 mL/min est le débit à vide de la DPL30H ; 600 kPa est sa pression nominale. Ces valeurs décrivent deux aspects différents et ne doivent jamais devenir « 300 mL/min à 600 kPa ».",
      "Le débit diminue quand la pression positive en sortie augmente. Partez de la contre-pression cible, lisez le débit disponible sur la courbe officielle, puis ajoutez une marge pour les variations, le colmatage du filtre et les tolérances.",
    ],
    noticeStrong: "La vraie question pour une pompe à membrane haute pression est « quel débit reste disponible à la contre-pression cible ? », pas seulement quel débit à vide est le plus élevé.",
    noticeText: "300 mL/min est un débit à vide ; 600 kPa est une pression nominale. Ce n'est pas le même point de fonctionnement.",
  },
  section4: {
    title: "4. Caractéristiques et limites de la DPL30H",
    intro: "Utilisez ces valeurs pour la présélection, puis confirmez fluide, ligne et commande.",
    headers: ["Paramètre", "DPL30H", "Remarque"],
    rows: [
      ["Débit à vide", "300 mL/min", "Non garanti à 600 kPa"], ["Pression nominale", "600 kPa", "Lire le point sur la courbe débit-pression"],
      ["Hauteur d'auto-amorçage", "3 mH₂O", "Dépend du fluide, du tube et de l'étanchéité"], ["Puissance", "≤7 W", "Dimensionner l'alimentation pour le démarrage"],
      ["Fluide nominal", "Eau purifiée", "Évaluer les autres liquides en conditions réelles"], ["Température du fluide", "+5 °C à +40 °C", "Ne pas reprendre la limite DPL30 de +80 °C"],
      ["Raccord", "Raccord à pince/compression pour tube rigide 6×4 mm (DE×DI)", "Contrôler le composant le moins résistant"], ["Bruit", "≤80 dB", "Le montage influence le bruit système"],
      ["Tête", "PPS", "Membrane et clapet varient selon le modèle"], ["Membrane", "EPDM ou PTFE selon modèle", "Aucun matériau n'est universel"],
      ["Clapet", "EPDM ou FFKM selon modèle", "Valider avec le fluide et la température"],
    ],
  },
  section5: {
    title: "5. DPL30 et DPL30H : même débit à vide, fonctions distinctes",
    paragraphs: ["Toutes deux indiquent 300 mL/min à vide, mais pression, auto-amorçage, tube et température diffèrent. La DPL30H est une plateforme haute contre-pression pour tube rigide, pas une simple évolution de la DPL30."],
    headers: ["Critère", "DPL30", "DPL30H"],
    rows: [
      ["Débit à vide", "300 mL/min", "300 mL/min"], ["Pression nominale", "100 kPa", "600 kPa"],
      ["Auto-amorçage", "6 mH₂O", "3 mH₂O"], ["Tube", "Flexible, DI 3,2 mm", "Raccord pour tube rigide 6×4 mm"],
      ["Température maximale", "+80 °C", "+40 °C"], ["Priorité", "Basse pression, aspiration et limite thermique supérieure", "Haute contre-pression, ligne rigide et tenue système"],
    ],
    dpl30Prefix: "Pour environ 100 kPa, un tube flexible DI 3,2 mm et une limite thermique supérieure, consultez le",
    dpl30Label: "guide de sélection DPL30",
    dpl30Suffix: ".",
  },
  section6: {
    title: "6. Lire la courbe débit-pression DPL30H",
    paragraphs: [
      "La courbe officielle montre un débit proche de 300 mL/min lorsque la pression de sortie est voisine de zéro. Le débit décroît avec la pression positive ; la pompe débite encore à forte contre-pression, mais sous sa valeur à vide.",
      "La courbe définit une zone candidate et ne remplace pas la validation. Intégrez la perte du filtre en fin de vie, les transitoires de vannes, les tolérances des tubes et la marge de débit.",
    ],
    figureAlt: "Courbe officielle débit-pression de la pompe DPL30H montrant la baisse du débit avec la pression positive",
    figureCaption: "Courbe DPL30H : 300 mL/min est l'extrémité à vide ; le débit de service baisse avec la contre-pression.",
    notice: "N'extrapolez pas de points précis non indiqués et n'écrivez pas « 300 mL/min à 600 kPa ».",
  },
  section7: {
    title: "7. Tube rigide 6×4 mm : le composant le moins résistant gouverne",
    paragraphs: [
      "Le raccord à pince/compression reçoit un tube rigide 6×4 mm (DE×DI). Vérifiez matériau, tolérance du diamètre extérieur, coupe, insertion et serrage, puis réalisez des essais de pression et de fuite.",
      "Raccords, vannes, filtres, capteurs et chambres appartiennent aussi au circuit. La pression nominale de la pompe ne qualifie pas ces éléments.",
    ],
    noticeStrong: "La valeur DPL30H de 600 kPa ne signifie pas que chaque tube 6×4, raccord, vanne, filtre ou chambre supporte automatiquement 600 kPa.",
    noticeText: "La pression admissible du système est fixée par le composant le moins bien classé du circuit complet.",
  },
  section8: {
    title: "8. Versions à balais et brushless",
    paragraphs: [
      "La version à balais permet une simple alimentation 12/24 V. La version brushless cinq fils ajoute sens, réglage de vitesse et retour tachymétrique. Les encombrements diffèrent : vérifiez chaque plan.",
      "La durée de vie est donnée à tension nominale en service continu ; contre-pression, cycles, température, fluide et refroidissement peuvent la modifier.",
    ],
    brushedFigureAlt: "Plan d'encombrement de la pompe haute pression DPL30H à moteur à balais",
    brushedFigureCaption: "Dimensions de la DPL30H à balais ; utiliser le plan maîtrisé pour la conception.",
    brushlessFigureAlt: "Dimensions et câblage cinq fils de la pompe haute pression DPL30H brushless",
    brushlessFigureCaption: "Dimensions de la DPL30H brushless et définition des cinq fils.",
    motorHeaders: ["Critère", "À balais", "Brushless"],
    motorRows: [
      ["Tension", "12 V ou 24 V", "12 V ou 24 V"], ["Poids approx.", "135 g", "155 g"],
      ["Durée de vie indicative", "3000 h", "10000 h"], ["Condition", "Continu à tension nominale", "Continu à tension nominale"],
      ["Commande", "Alimentation marche/arrêt", "Sens, PWM/0–5 V, retour FG"],
    ],
    wiringTitle: "Interface brushless cinq fils",
    wiringIntro: "Respecter les plages de tension, les entrées flottantes et le décodage FG.",
    wiringHeaders: ["Signal", "Couleur", "Fonction"],
    wiringRows: [
      ["VCC", "Rouge", "Alimentation +"], ["GND", "Noir", "Masse"],
      ["DIR", "Jaune", "Haut ou ouvert : horaire ; bas : antihoraire"], ["FG", "Vert", "Signal vitesse"], ["PWM", "Bleu", "Consigne vitesse"],
    ],
    wiringNotes: [
      "PWM de 0 à 0,25 V : arrêt.", "PWM flottant ou 4,5 à 5 V : pleine vitesse.",
      "Réglage par PWM ou tension analogique 0–5 V ; la vitesse est proportionnelle au rapport cyclique PWM.",
      "FG fournit trois impulsions carrées par tour de rotor.",
    ],
  },
  section9: {
    title: "9. Choisir les matériaux EP/PS ou FF/PS",
    intro: "Le suffixe identifie les matériaux mouillés, pas une compatibilité chimique universelle.",
    headers: ["Code", "Membrane", "Clapet", "Tête", "Présélection"],
    rows: [
      ["EP/PS", "EPDM", "EPDM", "PPS", "Partir de l'eau purifiée puis vérifier le fluide réel"],
      ["FF/PS", "PTFE", "FFKM", "PPS", "Autre combinaison candidate, à valider également"],
    ],
    noticeStrong: "Le code matériau ne remplace pas un essai de compatibilité.",
    noticeText: "Évaluez produit, concentration, température, pression, exposition et durée de vie ; testez des échantillons si nécessaire.",
  },
  section10: {
    title: "10. Codification et séquence complète de sélection",
    intro: "Le code combine tension, moteur, raccord, orientation, matériaux et personnalisation.",
    modelCode: "DPL30H - 24 - D - S - C - EP/PS - X",
    modelCodeDescription: "Cette lecture concerne uniquement DPL30H et n'est pas déduite de DPL60.",
    headers: ["Champ", "Valeurs", "Sens"],
    rows: [
      ["Tension", "24 / 12", "24 V ou 12 V"], ["Moteur", "D / B / C", "D à balais, B brushless, C sans fer"],
      ["Raccord", "S", "Raccord défini par la spécification"], ["Orientation", "C / 3 / 6 / 9", "C haut, 3 droite, 6 bas, 9 gauche"],
      ["Matériaux", "EP/PS / FF/PS", "EPDM+EPDM+PPS ou PTFE+FFKM+PPS"], ["Personnalisation", "X", "Exigence spéciale"],
    ],
    standardModelsTitle: "Modèles DPL30H standard",
    standardModelsIntro: "Huit SKU couvrent balais/brushless, 12/24 V et deux matériaux.",
    standardModelHeaders: ["SKU", "Modèle", "Moteur", "Tension", "Matériaux"],
    standardModelRows: [
      ["459007", "DPL30H-24DS-EP/PS", "À balais", "24 V", "EP/PS"], ["459008", "DPL30H-24BS-EP/PS", "Brushless", "24 V", "EP/PS"],
      ["459019", "DPL30H-12DS-EP/PS", "À balais", "12 V", "EP/PS"], ["459020", "DPL30H-12BS-EP/PS", "Brushless", "12 V", "EP/PS"],
      ["459034", "DPL30H-24DS-FF/PS", "À balais", "24 V", "FF/PS"], ["459035", "DPL30H-24BS-FF/PS", "Brushless", "24 V", "FF/PS"],
      ["459036", "DPL30H-12DS-FF/PS", "À balais", "12 V", "FF/PS"], ["459037", "DPL30H-12BS-FF/PS", "Brushless", "12 V", "FF/PS"],
    ],
    notice: "Un SKU standard exige encore de vérifier point de fonctionnement, matériaux, tube et commande.",
    stepsTitle: "Séquence recommandée",
    steps: [
      ["Définir le point", "Spécifier le débit à la contre-pression cible."], ["Calculer les pertes", "Inclure filtre en fin de vie, vannes, tube, chambres et dénivelé."],
      ["Vérifier la pression", "Limiter selon l'élément le plus faible et tester."], ["Choisir les matériaux", "Valider EP/PS ou FF/PS avec le fluide réel."],
      ["Choisir moteur et tension", "Considérer commande, FG, durée de vie et alimentation."], ["Valider le prototype", "Mesurer débit, pression, échauffement, bruit, fuite et durée de vie."],
    ],
  },
  conclusion: {
    title: "Conclusion : sélectionner par le débit à la contre-pression cible",
    paragraphs: [
      "La DPL30H ne doit pas être présentée comme une combinaison de 300 mL/min et 600 kPa. Sa valeur réside dans une marge de pression vérifiable, le raccord rigide 6×4 mm et des options claires de moteur et de matériaux.",
      "Si la priorité est un débit à vide supérieur de 400–600 mL/min plutôt qu'une pression de 600 kPa, comparez la DPL60. Pour la DPL30H, validez la courbe, l'élément le moins résistant et le fluide réel.",
    ],
  },
  internalLinks: {
    dpl60Prefix: "Si la priorité est un débit de 400–600 mL/min plutôt que la haute pression, consultez le", dpl60Label: "guide de sélection DPL60", dpl60Suffix: ".",
    productPrefix: "Voir la", productLabel: "page de la série DPL30H", productSuffix: " pour les produits à balais et brushless.",
    categoryPrefix: "Parcourir la", categoryLabel: "catégorie des pompes à membrane", categorySuffix: " pour comparer d'autres plages.",
  },
};
