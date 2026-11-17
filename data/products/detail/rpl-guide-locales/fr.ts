import type { RplGuideParameters, RplGuideText } from "./types";

export function getFrenchRplGuide(p: RplGuideParameters): RplGuideText {
  const motor = `${p.rinse ? "six" : "quatre"} fils, 1,5 A/phase, pas entier de 1,8°`;
  return {
    productType: "Pompe doseuse sans valve",
    lead: `${p.model} aspire et refoule le liquide par la rotation et le mouvement alternatif d’un piston céramique. Définissez la dose, le temps disponible, le liquide de procédé et le liquide de nettoyage avant de choisir la cylindrée, la vitesse et les tubes. Mesurez le volume réellement délivré à la sortie utilisée.`,
    features: [
      ["Régler séparément cylindrée et vitesse", `${p.range} μL/rev désigne la plage de cylindrée par tour. Le réglage mécanique modifie le volume par tour ; la vitesse modifie le temps nécessaire pour effectuer ces tours.`],
      ["Ensemble doseur céramique", `La configuration présentée associe une tête en PVDF à un ensemble en ${p.ceramic}. Vérifiez la compatibilité de toutes les pièces en contact avec le liquide.`],
      ["Monter la pompe pour faciliter la purge", "L’orientation de la tête, le sens d’écoulement et la position du moteur influencent la purge et la protection contre les fuites. Prévoyez l’espace nécessaire au réglage de la tête et aux tubes."],
      [p.rinse ? "Circuits de procédé et de rinçage séparés" : "Nettoyage par le circuit de procédé", p.rinse ? "Les orifices de procédé transportent le réactif ; ceux de rinçage nettoient la zone du piston. Un filetage identique ne rend pas ces orifices interchangeables." : "Évacuez les résidus par le circuit de procédé. Pour les liquides salins ou cristallisables, définissez ensemble le produit de nettoyage, le volume de rinçage et la procédure d’arrêt."],
    ],
    documents: [
      ["Modèle et cylindrée", `${p.model} : ${p.range} μL/rev. Précisez le réglage de cylindrée, l’entraînement et la détection de position à la commande.`],
      ["Orifices et matériaux en contact", `Orifices de procédé : ${p.port} ; tête en PVDF et ensemble en ${p.ceramic}. ${p.rinse ? "Orifices de rinçage : 1/4-28 UNF-2B." : "Cette configuration ne comporte pas d’orifices RINSE indépendants."}`],
      ["Conditions d’essai des performances", `Conditions d’essai : eau pure, ${p.testRpm} tr/min, pression du circuit ≤50 kPa et rotation du moteur en marche avant. Évaluez l’exactitude, la répétabilité et la durée de vie en tenant compte de ces conditions.`],
      ["Vérifications d’intégration", "Vérifiez l’orientation, le dégagement de réglage de la tête, les enroulements, l’interface du capteur optique et le câblage fourni avant la mise en service de l’entraînement et du circuit."],
    ],
    sections: {
      principle: {
        title: "Comment le piston aspire et refoule le liquide",
        intro: "Le piston céramique tourne tout en se déplaçant axialement. La rotation met le passage du méplat du piston en communication avec l’entrée puis la sortie ; le mouvement axial fait varier le volume de la chambre de dosage. Un cycle complet comprend l’aspiration, la fin d’aspiration, le refoulement et la fin de refoulement.",
      },
      displacement: {
        title: "Choisir la cylindrée, la vitesse et le temps de dosage",
        intro: `Le réglage mécanique fixe la cylindrée par tour ; le nombre de tours complets détermine la dose nominale ; la vitesse agit sur le temps de délivrance. La plage de ${p.range} μL/rev de ${p.model} n’est ni un débit par minute ni une garantie de dose minimale fiable.`,
        rows: [
          ["Distribution par dose", "Dose nominale = cylindrée × nombre de tours complets", "Choisissez une cylindrée adaptée à la dose, puis vérifiez les effets des démarrages et arrêts, les gouttes résiduelles et la première dose après une pause. Validez séparément les fractions de tour."],
          ["Alimentation continue", "Débit moyen nominal = cylindrée × vitesse de rotation", "Le produit de μL/rev par tr/min donne des μL/min. L’alimentation, la contre-pression et le liquide influencent aussi le débit réel. Un débit moyen ne signifie pas une absence de pulsations."],
          ["Temps de délivrance", "Vérifier la vitesse admissible pour le modèle et l’entraînement", "Vérifiez la vitesse avec l’entraînement et les conditions choisis. Le cycle de l’appareil comprend aussi le changement de récipient, le mouvement de l’aiguille et le temps de stabilisation."],
          ["Pression et exactitude", "Distinguer tenue en pression, contre-pression d’essai et point de fonctionnement", `La tenue à 150 kPa ne démontre pas un fonctionnement continu validé à cette contre-pression. Les résultats à ${p.testRpm} tr/min ne s’appliquent pas automatiquement à toutes les vitesses.`],
        ],
      },
      materials: {
        title: "Choisir la tête, la céramique et le liquide de nettoyage",
        intro: `La configuration présentée utilise une tête en PVDF et un ensemble en ${p.ceramic}. Prenez en compte les liquides de procédé et de nettoyage, leur concentration, la température et la durée de contact. La résistance chimique de la céramique ne suffit pas à établir celle de toute la pompe.`,
        rows: [
          ["Liquide de procédé", "Noter composition, viscosité, particules et tendance à cristalliser", "Pour un liquide chargé ou cristallisable, évaluez filtration, rinçage et arrêt avant de vérifier le mouvement et le volume délivré avec un échantillon."],
          ["Liquide de nettoyage", p.rinse ? "Concevoir séparément nettoyage du circuit et rinçage du piston" : "Définir le nettoyage par le circuit de procédé de ce modèle", p.rinse ? "Le circuit RINSE n’assure pas lui-même le pompage et nécessite une alimentation externe de rinçage. Utilisez un liquide compatible avec tous les matériaux en contact ; contrôlez précipités, bulles et joints après un changement de liquide." : "Utilisez un liquide compatible capable de chasser les résidus. Après un changement de liquide, recherchez précipités, bulles et anomalies des joints."],
          ["Résidus à l’arrêt", "Éviter le séchage des liquides salins ou cristallisables dans l’ensemble doseur", "Chassez le liquide de procédé avant l’arrêt. Réamorcez et testez avant de redémarrer ; en cas de blocage, arrêtez l’entraînement et contactez l’assistance technique."],
        ],
      },
      drive: {
        title: "Entraînement, enroulements et détection de position initiale",
        intro: `Le moteur comporte ${motor}. Câblez séparément le moteur et le capteur optique. Confirmez le mode d’entraînement avant de vérifier alimentation et signaux.`,
        rows: [
          ["Raccordement des enroulements", motor, p.rinse ? "Les raccordements en enroulement complet ou demi-enroulement influencent le couple et la vitesse. Réglez le courant selon le schéma et le pilote choisis." : "Noir et vert forment un enroulement ; rouge et bleu forment l’autre. Raccordez les deux phases au pilote sans utiliser un schéma à six fils."],
          ["Alimentation du capteur optique", "5–24 VDC ±10%", "Vérifiez alimentation, masse, type de sortie et entrée du contrôleur, puis la commutation. Le signal de position ne mesure pas chaque dose délivrée."],
          ["Démarrage et positionnement", "Vérifier rotation, position initiale et position d’arrêt", "Confirmez le mouvement et le sens du débit à basse vitesse avant de régler accélération, décélération et nombre de cycles. Coupez l’alimentation avant toute modification du câblage."],
        ],
        note: "Vérifiez couleurs, connecteurs et réglages de courant selon le moteur et le capteur optique fournis. Ne branchez ni ne débranchez leurs faisceaux sous tension.",
      },
      installation: {
        title: p.rinse ? "Orientation, orifices de procédé et de rinçage" : "Orientation, fixation et orifices de procédé",
        intro: "Montez la pompe pour que l’air puisse quitter la tête et qu’une fuite accidentelle ne s’écoule pas vers le moteur. Intégrez les différences de hauteur entre réservoir, tête et aiguille de distribution dans la conception du circuit.",
        rows: [
          ["Orifices de procédé", p.port, "Vérifiez filetages, surfaces d’étanchéité, raccords et tubes. Soutenez les tubes pour qu’ils ne tirent pas sur la tête."],
          [p.rinse ? "Orifices de rinçage du piston" : "Nettoyage du circuit de procédé", p.rinse ? "1/4-28 UNF-2B ; des bouchons peuvent être montés par défaut" : "Chasser les résidus par les orifices de procédé", p.rinse ? "Raccordez l’alimentation et le retour de rinçage selon leur repérage, sans les confondre avec l’entrée et la sortie du réactif. Confirmez liquide et raccordement avant utilisation." : "Cette configuration ne comporte pas d’orifices RINSE indépendants. Adaptez le rinçage au liquide utilisé et ne modifiez pas les orifices de la tête."],
          ["Fixation mécanique", "Respecter le plan, l’angle de réglage et l’orientation du modèle", "Prévoyez l’accès aux raccords, câbles, réglage de cylindrée et maintenance. Après fixation, contrôlez de nouveau l’orientation et les efforts exercés par les tubes."],
        ],
      },
      commissioning: {
        title: "Première utilisation et vérification du volume délivré",
        intro: p.rinse ? "Vérifiez les positions de départ et d’arrêt du piston et de la palette du capteur avant l’amorçage. L’illustration correspond au sens horaire vu de l’avant du moteur. En rotation inverse, les positions de l’entrée, du méplat et de la palette sont inversées." : "Obtenez un amorçage stable, sans bulles, avant de régler la dose. Ne compensez pas un débit instable dû à l’air en modifiant la cylindrée.",
        steps: [
          ["Contrôler hors tension", "Vérifiez modèle, réglage de cylindrée, enroulements et câblage du capteur ; identifiez les circuits de procédé et de rinçage."],
          ["Amorcer et purger", "Utilisez un liquide compatible à basse vitesse. Recherchez bulles et fuites du réservoir jusqu’à la sortie et vérifiez le sens d’écoulement."],
          ["Fixer les conditions d’essai", p.rinse ? "Gardez constants cylindrée, vitesse, contre-pression, aiguille et tubes. Effectuez un tour complet par mesure et relevez 10 fois la masse délivrée." : "Gardez constants cylindrée, cycles, vitesse, contre-pression, aiguille et tubes. Recueillez plusieurs fois la même dose cible."],
          ["Séparer première dose et doses successives", "Relevez la première dose après une pause, les doses successives et les gouttes résiduelles. Corrigez selon les mesures et recommencez après changement de liquide ou de tubes."],
        ],
        note: "En mesure gravimétrique, convertissez la masse en volume avec la densité réelle du liquide à la température d’essai. Consignez la méthode et chaque résultat.",
      },
      care: {
        title: "Entretien courant, arrêt et diagnostic",
        intro: "Distinguez d’abord les problèmes d’alimentation, de mouvement et de sortie, puis vérifiez-les un à un. Contactez l’assistance technique avant démontage ou intervention sur l’ensemble doseur.",
        rows: [
          ["Absence de débit ou bulles récurrentes", "Niveau, étanchéité d’entrée, sens du débit et orientation", "Écartez prise d’air, réservoir vide et tubes pliés avant de réamorcer. N’augmentez pas simplement la vitesse."],
          ["Doses successives stables, première dose incorrecte", "Rétraction à la pause, gouttes en pointe et position d’arrêt", "Relevez séparément la durée de pause et la première dose. Adaptez la séquence d’arrêt et de mouvement avec le circuit complet."],
          ["Débit qui diminue avec le temps", "Cristaux, résistance d’aspiration, raccords obstrués et réglages du pilote", "Arrêtez la pompe et appliquez un nettoyage compatible. Vérifiez tubes et filtres ; ne forcez jamais la rotation d’un piston bloqué."],
          ["Fuite ou bruit inhabituel", "Efforts sur les raccords, joints et fixation", "Arrêtez le fonctionnement. Conservez photos et informations sur le liquide et l’entraînement, puis contactez l’assistance technique."],
        ],
      },
    },
    figures: {
      cycle: { alt: "Cycle de dosage RPL en quatre phases : aspiration, fin d’aspiration, refoulement et fin de refoulement", caption: "1 Aspiration → 2 Fin d’aspiration → 3 Refoulement → 4 Fin de refoulement." },
      components: { alt: `Composants de ${p.model} avec repères de réglage, orifices, capteur et montage`, caption: p.rinse ? "1 Molette de réglage · 2 Échelle · 3 Orifice de rinçage · 4 Orifice de procédé · 5 Tête · 6 Capteur optique · 7 Support · 8 Connecteur électrique." : "1 Molette de réglage · 2 Échelle · 3 Tête · 4 Orifice de procédé · 5 Capteur optique · 6 Support · 7 Connecteur électrique." },
      adjustment: { alt: `Réglage mécanique de la cylindrée de ${p.model} en quatre étapes`, caption: "1 Desserrer la vis de blocage → 2 Lire l’échelle → 3 Régler et vérifier par pesée → 4 Resserrer la vis." },
      motor4: { alt: "Enroulements du moteur RPL-P4 à quatre fils : paires noir–vert et rouge–bleu", caption: "Moteur à quatre fils : noir–vert pour un enroulement ; rouge–bleu pour l’autre." },
      motor6: { alt: "Numérotation des broches et enroulements du moteur RPL à six fils", caption: "Moteur à six fils : numérotation du connecteur et enroulements. RED, BLK, YEL, BLU, WHT et ORG désignent rouge, noir, jaune, bleu, blanc et orange." },
      optical: { alt: "Capteur optique RPL : repères d’alimentation, masse, sorties et charges", caption: "1 Marron : alimentation · 2 Noir : sortie 1, ON en présence de lumière · 3 Blanc : sortie 2, ON sans lumière · 4 Bleu : 0 V · 5 Charge. Isoler les sorties inutilisées." },
      installation: { alt: `Orientations correctes et incorrectes de ${p.model} et flèches de débit`, caption: "Respecter les flèches de débit, faciliter la purge et éviter les fuites vers le moteur. ✓ Orientation correcte ; ✕ incorrecte." },
      position: { alt: "Méplat du piston RPL face à l’entrée et palette optique en position de départ et d’arrêt", caption: "Position de départ et d’arrêt : méplat face à l’entrée ; le capteur détecte le bord de la palette." },
      measurement: { alt: "Circuit de mesure gravimétrique RPL avec réservoir, tubes, pompe, aiguille et balance", caption: "1 Réservoir d’alimentation · 2 Tube d’entrée · 3 Pompe RPL et entraînement · 4 Tube de sortie · 5 Aiguille de prélèvement à bout plat · 6 Balance de précision · 7 Récipient collecteur." },
    },
  };
}
