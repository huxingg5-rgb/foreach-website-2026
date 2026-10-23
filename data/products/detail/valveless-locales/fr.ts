import { getRplSelectionGuide } from "@/data/resources/technical-articles/rpl-selection-links";
import type { ValvelessLocaleCopy } from "./types";
import { getValvelessPumpNames } from "../valveless-pump-names";

const rplSelectionGuideHref = getRplSelectionGuide("fr").href;

export const fr: ValvelessLocaleCopy = {
  ...getValvelessPumpNames("fr"),
  category: { title: "Pompes doseuses de précision sans valve", metaDescription: "Pompes doseuses sans valve FOREACH RPL et DRPL pour réactifs, titrage, remplissage et dilution. Comparez volumes par tour, rapports et matériaux en contact.", paragraphs: [
    "Les pompes doseuses de précision sans valve FOREACH aspirent et refoulent le liquide par le mouvement combiné de rotation et de translation d'un piston en céramique. Elles assurent la distribution de réactifs, l'ajout de titrant, le remplissage et le dosage proportionnel dans les analyseurs automatisés, les équipements de laboratoire et les systèmes de conditionnement de réactifs. Les RPL à une tête alimentent un circuit ; les DRPL à double tête délivrent deux liquides selon un rapport volumique défini.",
    "Le nom dépend de la fonction : pompe de distribution de réactifs, pompe de dosage de titrant ou pompe de remplissage. Pour la dilution d'un concentré et la préparation de tampons, une configuration à double tête assure l'apport proportionnel du concentré et du diluant. Ces appellations décrivent une tâche, pas un mécanisme de pompe différent.",
    `Les plages de cylindrée RPL sont de 12–80 μL/rev, 50–300 μL/rev et 300–1200 μL/rev. Les RPL-P6.35 et RPL-P15 permettent un réglage mécanique de la cylindrée, associé au choix de la vitesse du moteur pour adapter le débit. La cylindrée par tour, [le volume d'une dose](${rplSelectionGuideHref}) et le débit par minute sont des grandeurs distinctes. L'exactitude et la répétabilité doivent être vérifiées avec le liquide, la contre-pression et la séquence réels.`,
    "Les DRPL proposent des rapports volumiques concentré/diluant de 1:9 et 1:19 pour la dilution de réactifs, la préparation de tampons et le dosage proportionnel. Précisez les volumes des deux circuits, le rapport et le temps de cycle. La pompe délivre les liquides ; leur homogénéité dépend des jonctions et du mélange en aval.",
    "La RPL-P6.35 associe une tête en polyfluorure de vinylidène (PVDF) à un ensemble céramique en dioxyde de zirconium (ZrO₂). La RPL-P15 associe une tête en polyfluorure de vinylidène (PVDF) à un ensemble en oxyde d'aluminium (Al₂O₃). Vérifiez la compatibilité de tous les composants en contact avec le réactif et le liquide de nettoyage. Prévoyez le nettoyage en cas de cristallisation ou de résidus ; raccords, commande et montage dépendent de la configuration.",
    "Indiquez le volume par dose ou le débit, le temps de cycle, la composition du liquide, la contre-pression et l'encombrement disponible. Pour une préparation proportionnelle, ajoutez le rapport volumique et la quantité attendue sur chaque circuit."
  ] },
  single: { title: "Pompes doseuses sans valve RPL à une tête", paragraphs: [
    `Les pompes RPL FOREACH assurent un transfert quantitatif sur un seul circuit dans les analyseurs, les titrateurs, les modules de distribution et les systèmes de remplissage de réactifs. Les RPL-P4, RPL-P6.35 et RPL-P15 couvrent respectivement 12–80 μL/rev, 50–300 μL/rev et 300–1200 μL/rev. Choisissez la cylindrée selon [le volume à distribuer et le temps disponible](${rplSelectionGuideHref}).`,
    "Selon la tâche, une RPL peut servir de pompe de distribution de réactifs, de dosage de titrant, de distribution de tampon ou de remplissage volumétrique. La RPL-P4 vise les petits volumes ; la RPL-P6.35, la distribution et le titrage ; la RPL-P15, les opérations nécessitant davantage de volume par tour.",
    "Les RPL-P6.35 et RPL-P15 combinent réglage mécanique de la cylindrée et sélection de la vitesse pour adapter le débit. La cylindrée par tour n'est pas le volume minimal fiable. Vérifiez la quantité délivrée avec le liquide, la contre-pression et la séquence de distribution prévus.",
    "La RPL-P6.35 possède une tête en polyfluorure de vinylidène (PVDF), un ensemble en dioxyde de zirconium (ZrO₂) et un raccord de travail 1/4-28 UNF-2B. La RPL-P15 possède une tête en polyfluorure de vinylidène (PVDF), un ensemble en oxyde d'aluminium (Al₂O₃) et un raccord de travail G1/8. Confirmez nettoyage, tuyauterie et montage pour la configuration retenue."
  ] },
  dual: { title: "Pompes doseuses sans valve DRPL à double tête", paragraphs: [
    "Les pompes DRPL FOREACH délivrent deux liquides proportionnellement dans les modules de dilution d'analyseurs et les équipements de préparation de laboratoire ou de réactifs. Les DRPL-0109 et DRPL-0119 offrent respectivement des rapports volumiques concentré/diluant de 1:9 et 1:19.",
    "Selon la fonction, elles peuvent être désignées comme pompes de dilution de concentrés, pompes proportionnelles ou pompes doseuses à deux circuits. Elles alimentent le procédé en concentré et en diluant selon le rapport demandé.",
    "1:9 signifie une part de concentré plus neuf parts de diluant ; 1:19, une part plus dix-neuf. Définissez les quantités des deux circuits, le volume total et le temps de cycle. Le dosage proportionnel et le mélange sont deux fonctions distinctes : vérifiez l'homogénéité avec le circuit aval.",
    "Précisez composition, viscosité, alimentation et contre-pression de chaque liquide, ainsi que le rapport, la tuyauterie, la commande et l'espace disponible. Contrôlez séparément les matériaux en contact avec le liquide et la configuration de chaque circuit."
  ] },
  materials: { pvdf: "polyfluorure de vinylidène (PVDF)", alumina: "oxyde d'aluminium (Al₂O₃)", zirconia: "dioxyde de zirconium (ZrO₂)" },
  // Adapted from the reviewed Chinese cards and three-paragraph introductions (2026-10-23).
  cards: {
    "p4": "RPL-P4, pompe miniature sans valve à piston céramique, 12–80 μL/rev, pour les petites doses de réactifs et l'ajout de titrant.",
    "p635": "RPL-P6.35, pompe sans valve à piston rotatif, 50–300 μL/rev, avec raccords de rinçage pour la distribution de réactifs et le remplissage volumétrique.",
    "p15": "RPL-P15, pompe doseuse à piston céramique, 300–1200 μL/rev, avec raccords de rinçage pour le remplissage de réactifs et la distribution de tampons.",
    "dual9": "DRPL-0109, pompe doseuse à double tête et pistons céramiques pour la dilution de réactifs et la préparation de tampons au rapport volumique concentré/diluant 1:9.",
    "dual19": "DRPL-0119, pompe doseuse à double tête et pistons pour la dilution de réactifs concentrés et le dosage proportionnel au rapport volumique concentré/diluant 1:19."
  },
  introductions: {
    "p4": {
      "title": "RPL-P4 : pompe doseuse sans valve à piston céramique, 12–80 μL/rev, pour réactifs et titrage",
      "paragraphs": [
        "La RPL-P4 est une pompe doseuse sans valve à une tête et piston céramique, d'une cylindrée de 12–80 μL par tour. La rotation du piston relie alternativement la chambre à l'aspiration puis au refoulement ; son mouvement axial alternatif aspire et chasse le liquide. Le mécanisme ne nécessite donc pas de clapets antiretour distincts à l'entrée et à la sortie. Le volume nominal distribué dépend de la cylindrée et du nombre de tours, avec un entraînement adapté aux séquences de dosage répétées.",
        "Elle peut être sélectionnée pour la distribution de petits volumes de réactifs dans les analyseurs automatisés, l'ajout de titrant dans les titrateurs et le remplissage volumétrique de flacons ou de tubes au laboratoire. Sa faible cylindrée facilite l'adaptation du nombre de cycles aux petites doses. À proximité du point final d'un titrage, il reste nécessaire de vérifier le positionnement de l'entraînement et le volume réellement délivré à la pointe.",
        "La configuration présentée associe une tête en polyfluorure de vinylidène (PVDF) à un ensemble céramique en alumine (Al₂O₃) et se raccorde au circuit de l'instrument par des raccords de tuyauterie. Vérifiez la compatibilité des matériaux en contact avec le réactif et le liquide de nettoyage. La plage de cylindrée ne correspond pas à un volume minimal de dosage validé."
      ],
      "commonApplications": [
        "Analyseurs automatisés : distribution et dosage de petits volumes de réactifs",
        "Titrateurs automatiques : alimentation en titrant et ajouts successifs",
        "Équipements de laboratoire : remplissage volumétrique de flacons et de tubes"
      ],
      "metaDescription": "Pompe doseuse sans valve RPL-P4, 12–80 μL/rev, pour petites doses de réactifs et titrage. Tête en PVDF et ensemble céramique en alumine."
    },
    "p635": {
      "title": "RPL-P6.35 : pompe doseuse sans valve, 50–300 μL/rev, avec rinçage pour distribution et remplissage",
      "paragraphs": [
        "La RPL-P6.35 est une pompe doseuse sans valve à une tête et piston céramique, d'une cylindrée de 50–300 μL par tour. La rotation du piston alterne la connexion entre aspiration et refoulement, tandis que son déplacement axial fait varier le volume de la chambre pour aspirer et délivrer le liquide. Le mécanisme fonctionne sans clapets antiretour d'entrée et de sortie séparés. Le réglage mécanique fixe le volume nominal par tour ; la vitesse du moteur permet d'adapter le débit moyen et la durée de distribution.",
        "Les applications comprennent l'ajout de réactifs par étapes dans les analyseurs automatisés, l'alimentation en titrant des titrateurs de laboratoire et le remplissage volumétrique de tubes et de petits flacons. Une dose peut être obtenue en un ou plusieurs cycles complets, selon le volume cible et le temps disponible dans le cycle de l'instrument.",
        "La configuration présentée comprend une tête en polyfluorure de vinylidène (PVDF), un ensemble céramique en zircone (ZrO₂) et des raccords de rinçage de la zone du piston. Le circuit de travail assure l'aspiration et le refoulement du réactif ; le circuit de rinçage nettoie la zone du piston. Adaptez le nettoyage courant et à l'arrêt aux propriétés du liquide, puis réétalonnez le volume délivré après tout réglage de cylindrée ou changement du circuit."
      ],
      "commonApplications": [
        "Analyseurs automatisés : distribution et ajout de réactifs par étapes",
        "Titrateurs de laboratoire : alimentation et dosage du titrant",
        "Conditionnement de réactifs : remplissage volumétrique de tubes et de petits flacons"
      ],
      "metaDescription": "RPL-P6.35, pompe doseuse sans valve de 50–300 μL/rev pour réactifs, titrage et remplissage. Tête en PVDF, céramique en zircone et raccords de rinçage."
    },
    "p15": {
      "title": "RPL-P15 : pompe doseuse sans valve, 300–1200 μL/rev, avec rinçage pour remplissage et distribution de tampons",
      "paragraphs": [
        "La RPL-P15 est une pompe doseuse sans valve à une tête et piston céramique, d'une cylindrée de 300–1200 μL par tour. La rotation du piston alterne les connexions d'aspiration et de refoulement, et son mouvement axial assure le pompage sans clapets antiretour séparés. Le réglage mécanique de la cylindrée, la vitesse du moteur et le nombre de tours permettent d'adapter le débit moyen et le volume distribué à chaque opération.",
        "Elle peut être sélectionnée pour le remplissage volumétrique de flacons de réactifs, la distribution de tampons déjà préparés dans les postes de laboratoire et l'alimentation dosée d'instruments d'analyse. Pour un même volume cible, une cylindrée plus élevée réduit le nombre de tours nécessaire et facilite l'adaptation du temps de distribution aux volumes plus importants.",
        "La configuration présentée associe une tête en polyfluorure de vinylidène (PVDF), un ensemble céramique en alumine (Al₂O₃) et des raccords de rinçage de la zone du piston. Le nettoyage peut ainsi être organisé selon les propriétés du réactif. Vérifiez la compatibilité des matériaux avec le liquide distribué et le liquide de nettoyage ; étalonnez les volumes et les débits dans le circuit réel de l'instrument."
      ],
      "commonApplications": [
        "Conditionnement de réactifs : remplissage volumétrique de flacons",
        "Postes de préparation de laboratoire : distribution de tampons préparés et réapprovisionnement des réservoirs",
        "Modules d'alimentation d'analyseurs : transfert et alimentation dosés"
      ],
      "metaDescription": "RPL-P15, pompe doseuse sans valve de 300–1200 μL/rev pour remplissage de réactifs et distribution de tampons. PVDF, alumine et raccords de rinçage."
    },
    "dual9": {
      "title": "DRPL-0109 : pompe doseuse sans valve à double tête pour dilution 1:9 et dosage proportionnel",
      "paragraphs": [
        "La DRPL-0109 est une pompe doseuse sans valve à double tête et pistons céramiques, destinée à délivrer un concentré et un diluant au rapport volumique 1:9. Chaque tête assure le dosage d'un liquide. La rotation et le mouvement axial alternatif des pistons réalisent la commutation, l'aspiration et le refoulement sans clapets antiretour séparés dans le mécanisme. Les deux circuits de dosage sont réunis dans un même ensemble pour faciliter l'intégration d'une alimentation à rapport fixe.",
        "Les applications comprennent la dilution en ligne de réactifs concentrés dans les analyseurs automatisés, la préparation de tampons au laboratoire et le dosage proportionnel par lots en production de réactifs. Le rapport 1:9 signifie un volume de concentré pour neuf volumes de diluant. Choisissez cette configuration lorsque la recette exige ce rapport et des apports répétés des deux liquides.",
        "Chaque circuit de travail se raccorde à sa propre source de liquide. Les raccords de rinçage permettent de nettoyer la zone du piston en fonction du fluide de chaque circuit. Les sorties doivent être réunies et mélangées en aval pour former la solution de travail. Vérifiez séparément le rapport des volumes délivrés et l'homogénéité ; adaptez les matériaux en contact et les liquides de nettoyage à la configuration."
      ],
      "commonApplications": [
        "Analyseurs automatisés : dilution en ligne au rapport concentré/diluant 1:9",
        "Équipements de laboratoire : préparation de tampons à rapport fixe",
        "Production de réactifs : dosage proportionnel de deux liquides par lots"
      ],
      "metaDescription": "DRPL-0109, pompe doseuse sans valve à double tête, rapport concentré/diluant 1:9, pour dilution de réactifs et préparation de tampons."
    },
    "dual19": {
      "title": "DRPL-0119 : pompe doseuse sans valve à double tête pour dilution 1:19 et préparation de solutions",
      "paragraphs": [
        "La DRPL-0119 est une pompe doseuse sans valve à double tête et pistons céramiques, destinée à délivrer un concentré et un diluant au rapport volumique 1:19. Les deux têtes dosent séparément les liquides. La rotation du piston alterne la connexion à l'entrée et à la sortie, et son mouvement axial assure l'aspiration et le refoulement. Le mécanisme ne comporte pas de clapets antiretour d'entrée et de sortie indépendants et permet l'alimentation de deux circuits à rapport fixe.",
        "Elle peut être sélectionnée pour la dilution de réactifs concentrés dans les analyseurs, la préparation de solutions de travail au laboratoire et l'alimentation proportionnelle par lots. Le rapport 1:19 signifie un volume de concentré pour dix-neuf volumes de diluant. Le choix dépend de la recette ; cette configuration apporte une proportion de diluant plus élevée que la configuration 1:9.",
        "Raccordez chaque circuit de travail à sa source et utilisez les raccords de rinçage pour organiser le nettoyage de la zone des pistons. Adaptez les cycles au volume à préparer et au temps disponible, avec les éléments de mélange et de stockage nécessaires en aval. Pour changer de rapport, il faut revoir la configuration des têtes et des cylindrées ; une variation de vitesse globale ne suffit pas à transformer le rapport 1:19."
      ],
      "commonApplications": [
        "Analyseurs automatisés : dilution de réactifs au rapport concentré/diluant 1:19",
        "Systèmes de laboratoire : préparation de solutions de travail à rapport fixe",
        "Préparation de réactifs : alimentation proportionnelle en concentré et diluant par lots"
      ],
      "metaDescription": "DRPL-0119, pompe doseuse sans valve à double tête, rapport concentré/diluant 1:19, pour dilution de concentrés et préparation de solutions de travail."
    }
  },
  intros: {
    p4: "La RPL-P4 assure le dosage de petits volumes sur un seul circuit. Selon sa fonction, elle est appelée pompe de distribution de réactifs, de dosage de titrant ou de remplissage volumétrique. Ces noms ne désignent pas des mécanismes différents. Les applications ci-dessous relient volume, séquence et temps de cycle.",
    p635: "La RPL-P6.35 est destinée à la distribution et au remplissage de réactifs sur un circuit. Les appellations pompe de distribution de réactifs, de dosage de titrant et de remplissage décrivent la tâche. Sa cylindrée est supérieure à celle de la RPL-P4 ; choisissez selon volume et durée, pas selon le seul secteur d'activité.",
    p15: "La RPL-P15 répond aux tâches nécessitant une cylindrée plus importante : remplissage de réactifs, distribution de tampons ou alimentation quantitative. Le remplissage contrôle le volume par récipient, l'alimentation continue le volume par unité de temps, et le réapprovisionnement doit être coordonné avec la mesure de niveau.",
    dual: "La {{model}} prépare deux liquides au rapport volumique concentré/diluant {{ratio}}. Elle peut être appelée pompe de dilution de concentrés, pompe proportionnelle ou pompe doseuse à deux circuits. {{ratio}} désigne le rapport entre les liquides, ni un réglage de vitesse ni un volume final de seulement {{parts}} fois celui du concentré."
  },
  reagentSetup: {
    p4: "À la mise en service, amorcez et purgez le circuit, fixez cylindrée et nombre de tours, puis mesurez des doses répétées et corrigez la quantité délivrée. Comparez la distribution continue et la première dose après une pause. Un écart initial invite à rechercher bulles, gouttes retenues ou retrait du liquide. L'apport de réactif depuis un réservoir ne constitue pas une validation de l'aspiration et du transfert d'échantillons.",
    p635: "L'amorçage du circuit de travail et le lavage de la zone du piston sont distincts. Le premier établit une colonne de liquide stable ; le second traite les résidus autour du piston. Pour les réactifs salins ou cristallisants, définissez un liquide de nettoyage compatible et une séquence d'arrêt. Un raccord de lavage ne garantit pas la compatibilité avec tout liquide corrosif."
  },
  applications: {
    reagent: { title: "Analyse automatisée et diagnostic in vitro : distribution de réactifs", paragraphs: [
      "Dans les analyseurs et les circuits de diagnostic in vitro (IVD), le réactif passe du flacon à la cuve de réaction par la pompe, la tuyauterie et l'aiguille. Le composant peut être appelé pompe de distribution ou de dosage de réactifs. Précisez le volume de chaque étape analytique et le temps disponible, pas uniquement le débit par minute.",
      "La cylindrée et le nombre de tours complets déterminent la dose nominale. Exemple de calcul : {{exampleQ}} μL/rev × 5 tours = {{exampleDose}} μL. À vitesse constante de 150 rpm, ces tours prennent 2 secondes, hors accélération, arrêt et autres mouvements. Il s'agit d'un calcul de dimensionnement, pas d'une performance mesurée. Réétalonnez après un changement de cylindrée.",
      "{{reagentSetup}}"
    ] },
    titration: { title: "Titrage automatique : ajout incrémental de titrant", paragraphs: [
      "Dans un titrateur de laboratoire, la pompe de dosage de titrant alimente la cuve sous la commande de l'instrument. La séquence comprend ajout, mélange, réponse de l'électrode, puis décision sur l'ajout suivant. La pompe délivre le liquide ; l'instrument détecte et détermine le point final.",
      "Définissez séparément la vitesse d'ajout initiale et le plus petit incrément fiable près du point final. À cylindrée et nombre de tours complets identiques, réduire la vitesse allonge surtout la durée, sans réduire la dose. {{minimum}} μL/rev est la limite basse de cylindrée, pas un incrément minimal de titrage validé. Ne le divisez pas simplement par le nombre de pas moteur.",
      "Mesurez des incréments répétés avec le titrant, l'aiguille et la tuyauterie prévus. Contrôlez les gouttes après arrêt et laissez le temps au mélange et à la stabilisation de la mesure. Positionnement et démarrage/arrêt doivent convenir à la séquence ; l'exactitude de la pompe n'est pas celle de l'analyse complète."
    ] },
    smallfill: { title: "Production de réactifs et laboratoire : remplissage de petits récipients", paragraphs: [
      "Sur un poste de petits flacons ou de tubes, la RPL-P4 peut être évaluée comme pompe de remplissage de réactifs ou de distribution volumétrique. Après l'ajout par l'aiguille, l'instrument présente le récipient suivant. Évaluez le volume réellement reçu par chaque récipient, en fonctionnement continu et après une pause.",
      "Décomposez le cycle en distribution, indexation, mouvement de l'aiguille et stabilisation. Pour 400 μL à 80 μL/rev et 150 rpm, les 2 secondes calculées ne représentent que le fonctionnement théorique de la pompe, pas une cadence validée de 30 flacons par minute. Si le cycle est trop long, examinez ensemble cylindrée, vitesse et mouvements du poste.",
      "Mesurez séparément les premiers remplissages, les remplissages consécutifs et la reprise après pause. En contrôle gravimétrique, convertissez la masse avec la densité du liquide à la température d'essai et une balance adaptée. Pour les liquides moussants ou adhérents, vérifiez les résidus sur l'aiguille et l'entrée complète de la goutte dans le récipient."
    ] },
    midfill: { title: "Conditionnement de réactifs : remplissage du microlitre au millilitre", paragraphs: [
      "Pour le remplissage répété de tubes et de petits flacons, la RPL-P6.35 peut être désignée comme pompe de remplissage de réactifs ou de distribution de liquides. Une dose peut cumuler plusieurs tours complets ; elle n'est pas limitée à la cylindrée d'un tour. Coordonnez la distribution avec l'indexation et le mouvement de l'aiguille.",
      "Exemple de calcul : à 200 μL/rev, une dose nominale de 1 mL demande 5 tours. À 150 rpm constants, le fonctionnement théorique de la pompe dure 2 secondes. Ajoutez indexation, mouvement de l'aiguille et stabilisation pour obtenir le cycle du poste. Ce calcul ne constitue pas une cadence ni une exactitude vérifiée.",
      "Testez remplissages consécutifs et reprise avec la tuyauterie et l'aiguille prévues, en surveillant gouttes et mousse. Vérifiez la tête en polyfluorure de vinylidène (PVDF), la céramique en dioxyde de zirconium (ZrO₂), les raccords et tous les composants mouillés avec le réactif et le liquide de nettoyage."
    ] },
    largefill: { title: "Production de réactifs de diagnostic : remplissage volumétrique de flacons", paragraphs: [
      "En production de réactifs ou en conditionnement de laboratoire, le liquide va du réservoir au flacon par la pompe et l'aiguille. La RPL-P15 peut être évaluée comme pompe de remplissage de réactifs ou de distribution volumétrique. Conciliez volume par récipient et cycle : une même dose exige un nombre de tours différent selon la cylindrée.",
      "Exemple de calcul : 5 mL nominaux à 1000 μL/rev demandent 5 tours complets, soit théoriquement 2 secondes à 150 rpm constants. Indexation, accélération, arrêt et mouvement de l'aiguille s'ajoutent ; ce n'est pas une promesse de cadence de production. Étalonnez le volume réellement délivré à la sortie.",
      "Avant d'augmenter la vitesse, vérifiez alimentation en entrée, restriction de l'aiguille et détachement des gouttes. Pour les liquides moussants, examinez aussi hauteur et mouvement de remplissage. Mesurez les doses consécutives et la première après pause pour évaluer le poste complet."
    ] },
    buffer: { title: "Préparation de laboratoire : distribution de tampon et réapprovisionnement", paragraphs: [
      "Une pompe répartissant un tampon déjà préparé peut être appelée pompe de distribution de tampon ; celle qui remplit un réservoir intermédiaire, pompe de réapprovisionnement. Ces fonctions diffèrent de la préparation à partir de deux liquides. La RPL-P15 à une tête ne commande pas seule un rapport concentré/diluant.",
      "Pour la distribution répétée, associez volume, cylindrée et nombre de tours. Pour le réapprovisionnement, une mesure de niveau ou une commande de l'instrument décide du démarrage et de l'arrêt. Mesure de niveau, protection contre la marche à sec et prévention du débordement relèvent du système et ne sont pas implicitement incluses dans la pompe.",
      "Avec des tampons salins, prévoyez un rinçage compatible à l'arrêt pour limiter séchage et cristallisation autour du piston. Les raccords de travail G1/8 et de lavage 1/4-28 UNF-2B desservent des circuits distincts. Suivez le plan de configuration et recherchez l'air introduit lors du réapprovisionnement."
    ] },
    continuous: { title: "Alimentation d'instruments d'analyse : transfert dosé continu", paragraphs: [
      "Pour alimenter un instrument sur une durée prolongée, la RPL-P15 peut être évaluée comme pompe doseuse de liquide ou pompe d'alimentation quantitative. Contrairement au remplissage par récipient, les données principales sont le débit moyen, la durée et la tolérance du procédé aval aux fluctuations.",
      "Le débit moyen nominal s'estime par cylindrée × vitesse. Exemple : 500 μL/rev × 120 rpm = 60000 μL/min, soit 60 mL/min. Cette moyenne ne signifie pas un débit instantané constant et ne remplace pas une mesure avec le liquide et la contre-pression réels.",
      "Mesurez le volume collecté sur une durée définie à la résistance de sortie réelle et l'effet des pulsations sur le procédé. Tout mélangeur ou restriction ajouté impose une nouvelle vérification de la contre-pression et de l'alimentation. Une conception sans valve ne garantit ni débit sans pulsations ni fonctionnement continu illimité."
    ] },
    dilution: { title: "Analyseurs automatisés : dilution de concentrés dans l'instrument", paragraphs: [
      "Un circuit aspire le concentré, l'autre le diluant ; les sorties se rejoignent et se mélangent avant le réservoir de solution de travail. La {{model}} peut alors être appelée pompe de dilution de concentrés ou de réactifs. Le pompage proportionnel fournit les liquides ; le mélange aval détermine l'homogénéité.",
      "Calcul du rapport : {{ratio}} représente une part de concentré plus {{parts}} parts de diluant. Si les volumes sont additifs, le diluant sans soluté cible et le mélange sans réaction, le volume final vaut {{factor}} fois celui du concentré et la concentration cible 1/{{factor}} de sa valeur initiale. La configuration {{concentrate}} μL + {{diluent}} μL donne nominalement {{total}} mL. Confirmez la concentration par mesure des volumes et contrôle de la solution.",
      "Amorcez et purgez les deux circuits avant d'évaluer le liquide entrant dans le mélangeur, notamment au démarrage ou après changement de liquide. Un réservoir vide ou des bulles sur un seul circuit peuvent fausser la concentration malgré un volume total apparemment acceptable. Mesurez chaque sortie séparément avant d'analyser le mélange."
    ] },
    preparation: { title: "Laboratoire et préparation de réactifs : dilution de tampon à rapport fixe", paragraphs: [
      "Un composant réunissant concentré et diluant peut être appelé pompe de préparation de tampon ou pompe proportionnelle. Choisissez la {{model}} parce que la formulation demande le rapport volumique {{ratio}}, et non simplement parce que l'application emploie le mot tampon.",
      "Exemple : un lot nominal de 100 mL au rapport {{ratio}} demande {{batchConcentrate}} mL de concentré et {{batchDiluent}} mL de diluant. C'est un calcul de formulation, pas une garantie d'exactitude du lot. Contrôlez force ionique, acidité et état de dissolution selon les exigences de la formulation.",
      "Des proportions correctes n'assurent pas automatiquement l'homogénéité. Choisissez jonction, mélangeur et réservoir selon volume, chronologie des apports et temps de séjour. Testez les mélanges susceptibles de précipiter ou de mousser. Un piston céramique ne prouve pas la compatibilité de tous les composants des deux circuits."
    ] },
    batch: { title: "Production de réactifs : dosage proportionnel par lots", paragraphs: [
      "Pour introduire deux liquides dans une cuve à rapport fixe, la {{model}} peut être décrite comme pompe proportionnelle ou pompe doseuse à deux circuits. Précisez rapport, volume total et durée de préparation. Le remplissage ultérieur des flacons est une tâche séparée, pas une fonction intégrée implicite de la pompe à double tête.",
      "Modifier les deux débits d'un même facteur ne change pas leur rapport. Une variation globale de vitesse ne transforme donc pas une configuration 1:9 en 1:19. Une autre formulation exige de revoir têtes et cylindrées. Au début et à la fin d'un lot, prenez en compte volumes internes, temps d'arrivée au mélangeur et liquide résiduel.",
      "Les raccords de travail présentés sont 1/4-28 UNF-2B pour le réactif A et G1/8 pour B ; les deux raccords de lavage sont 1/4-28 UNF-2B. Vérifiez l'affectation A/B aux liquides sur le plan, sans la déduire de la taille du raccord. Contrôlez pression et alimentation séparément sur les deux circuits."
    ] }
  },
  modelFaqs: {
    "p635": [
      {
        "question": "Comment choisir entre RPL-P6.35 et RPL-P4 ?",
        "answer": "Leurs cylindrées sont respectivement de 50–300 μL/rev et 12–80 μL/rev. Partez du volume cible et du temps disponible pour estimer la cylindrée et le nombre de tours, puis comparez les performances aux petites doses et les options d'entraînement. Une cylindrée plus élevée ne signifie pas une meilleure exactitude."
      },
      {
        "question": "Quels sont les effets du réglage de cylindrée et de la vitesse ?",
        "answer": "Le réglage mécanique modifie le volume nominal par tour complet. La vitesse détermine le nombre de tours par unité de temps. Estimez la dose par cylindrée × nombre de tours et le débit moyen par cylindrée × vitesse, puis étalonnez la quantité réellement délivrée."
      },
      {
        "question": "Quelle différence entre les raccords de rinçage et de travail ?",
        "answer": "Dans la configuration présentée, les deux utilisent un filetage 1/4-28 UNF-2B mais desservent des circuits distincts. Les raccords de travail assurent l'aspiration et le refoulement du réactif ; ceux de rinçage nettoient la zone du piston. Le même filetage ne les rend pas interchangeables. Suivez le plan de la configuration fournie."
      }
    ],
    "p15": [
      {
        "question": "Quelle différence entre RPL-P15 et RPL-P6.35 ?",
        "answer": "Leurs cylindrées sont respectivement de 300–1200 μL/rev et 50–300 μL/rev. La RPL-P15 peut être étudiée pour le remplissage ou l'alimentation de volumes plus importants. Comparez le volume cible, le temps disponible et les besoins de petites doses, pas seulement le débit."
      },
      {
        "question": "La valeur 300–1200 μL/rev correspond-elle à un débit ?",
        "answer": "Non. Elle indique la cylindrée par tour ; le débit dépend aussi de la vitesse. Par exemple, 500 μL/rev × 120 rpm donnent un débit moyen nominal de 60 mL/min. Étalonnez le débit réel avec le liquide et la contre-pression prévus. Un débit moyen ne signifie pas une alimentation sans pulsations."
      },
      {
        "question": "La RPL-P15 peut-elle préparer seule un mélange proportionnel ?",
        "answer": "C'est une pompe à une tête destinée au dosage ou à l'alimentation d'un seul liquide. La préparation proportionnelle de deux liquides nécessite un second circuit et une commande adaptée. Pour les rapports fixes concentré/diluant 1:9 ou 1:19, une configuration DRPL à double tête peut être étudiée séparément."
      }
    ]
  },
  faqSingle: [
    { question: "Que signifient les différentes appellations de la pompe ?", answer: "Pompe doseuse sans valve décrit le mécanisme et la fonction de dosage. Pompe de distribution de réactifs, de dosage de titrant ou de remplissage décrit la tâche dans l'instrument. Ces appellations ne signifient pas que toutes les pompes de l'application utilisent le même mécanisme." },
    { question: "{{range}} correspond-il au volume de chaque dose ?", answer: "Il s'agit de la cylindrée par tour, pas d'une dose garantie ni d'un volume minimal fiable. Pour des tours complets, multipliez cylindrée et nombre de tours afin d'estimer la dose nominale, puis étalonnez à la sortie. Ne supposez pas une distribution proportionnelle pour tout angle partiel arbitraire." },
    { question: "Réduire la vitesse réduit-il la dose ?", answer: "À cylindrée et nombre de tours complets identiques, une vitesse moindre allonge principalement la durée. Une dose plus petite demande un réglage de cylindrée et une commande adaptés. Le débit moyen s'estime par cylindrée × vitesse, mais doit être vérifié avec le liquide et le circuit réels." },
    { question: "Quels matériaux et raccords sont présentés pour la {{model}} ?", answer: "{{materialDetails}} Vérifiez réactif et liquide de nettoyage avec tous les composants mouillés, pas seulement la tête. Confirmez entraînement, montage et interfaces de la configuration fournie." },
    { question: "Comment interpréter exactitude, pression et durée de vie ?", answer: "Confirmez définitions et conditions d'essai : liquide, température, cylindrée, vitesse et contre-pression. La tenue en pression n'est pas automatiquement la contre-pression de service autorisée ; la durée en cycles ne garantit pas toutes les conditions. Une pompe sans valve ne dispense pas nécessairement l'instrument de vannes de commutation ou d'arrêt." }
  ],
  faqDual: [
    { question: "Quel facteur de dilution représente {{ratio}} ?", answer: "Le rapport est concentré/diluant : une part plus {{parts}} parts. Avec volumes additifs, absence de soluté cible dans le diluant et absence de réaction, le volume final est de {{factor}} parts et la concentration de 1/{{factor}} de celle du concentré. Rapport des liquides et facteur final de dilution sont différents." },
    { question: "Quelles quantités sont présentées pour la {{model}} ?", answer: "La configuration présentée associe {{concentrate}} μL de concentré et {{diluent}} μL de diluant, soit nominalement {{total}} mL. Confirmez le volume par lot selon l'entraînement et la séquence ; ces valeurs ne constituent pas un minimum validé dans toutes les conditions." },
    { question: "Le dosage proportionnel garantit-il le mélange ?", answer: "Non. La pompe établit la relation entre deux quantités délivrées. Jonctions, mélange et stockage déterminent l'homogénéité. Mesurez séparément les deux sorties et contrôlez la solution ; le seul volume total ne confirme ni rapport ni concentration." },
    { question: "La vitesse permet-elle de passer de 1:9 à 1:19 ?", answer: "Pas par un réglage global seul. Si les deux sorties varient du même facteur, leur rapport reste constant. Un nouveau rapport demande de confirmer la configuration des têtes et des cylindrées." },
    { question: "Comment définir les deux circuits ?", answer: "Les raccords de travail A et B sont présentés en 1/4-28 UNF-2B et G1/8, ceux de lavage en 1/4-28 UNF-2B. Vérifiez les matériaux de chaque circuit dans sa spécification, sans reprendre ceux d'un modèle RPL. Distinguez contre-pression de service et tenue en pression." }
  ],
  materialDetails: {
    p4: "La configuration présentée utilise une tête en polyfluorure de vinylidène (PVDF), un ensemble en oxyde d'aluminium (Al₂O₃) et un raccord de travail 1/4-28 UNF-2B.",
    p635: "La configuration présentée utilise une tête et un bouchon en polyfluorure de vinylidène (PVDF), un ensemble en dioxyde de zirconium (ZrO₂), et des raccords de travail et de lavage 1/4-28 UNF-2B. Des filetages identiques ne rendent pas les circuits interchangeables.",
    p15: "La configuration présentée utilise une tête et un bouchon en polyfluorure de vinylidène (PVDF), un ensemble en oxyde d'aluminium (Al₂O₃), un raccord de travail G1/8 et un raccord de lavage 1/4-28 UNF-2B."
  },
  selectionSingle: "Indiquez composition, volume par dose ou débit continu, durée d'ajout autorisée, durée quotidienne, alimentation en entrée, contre-pression et commande. Dimensionnez cylindrée et cycle, puis vérifiez le circuit réel. Les applications proposées ne constituent pas une validation dans chaque instrument cité.",
  selectionDual: "Indiquez les deux liquides, le rapport volumique, le volume du lot ou le débit total, la durée de préparation, les conditions d'entrée et contre-pressions, ainsi que le mélange aval. Évaluez séparément dosage proportionnel, commande et homogénéité ; les applications ne sont pas des validations universelles.",
  specs: { "产品类型": "Type de produit", "排量范围": "Cylindrée par tour", "转速": "Vitesse", "准确度": "Exactitude", "准确性": "Exactitude", "重复性": "Répétabilité", "耐压": "Tenue en pression", "寿命": "Durée de vie", "泵头材质": "Matériau de la tête", "堵头材质": "Matériau du bouchon", "陶瓷套件": "Ensemble céramique", "工作液路接口": "Raccord du circuit de travail", "清洗液路接口": "Raccord du circuit de lavage", "整体尺寸": "Dimensions hors tout", "重量": "Masse", "配置方式": "Configuration", "稀释比": "Rapport volumique concentré/diluant", "浓缩液份数": "Parts de concentré", "稀释液份数": "Parts de diluant", "浓缩液定量（μL）": "Volume de concentré (μL)", "稀释液定量（μL）": "Volume de diluant (μL)", "配液量（mL）": "Volume combiné (mL)", "流量 QMin，mL/min": "Débit minimal QMin (mL/min)", "流量 QMax，mL/min": "Débit maximal QMax (mL/min)", "试剂A 工作液路接口": "Raccord de travail du réactif A", "试剂B 工作液路接口": "Raccord de travail du réactif B", "试剂A 清洗液路接口": "Raccord de lavage du réactif A", "试剂B 清洗液路接口": "Raccord de lavage du réactif B", "试剂A 端耐压": "Tenue en pression du circuit A", "试剂B 端耐压": "Tenue en pression du circuit B", "尺寸/mm": "Dimensions (mm)" },
  customConfiguration: "Configuration sur mesure", metalFitting: "G1/8 (raccord instantané métallique par défaut)",
  applicationsTab: "Applications", applicationsTitle: "Applications types", selectionTitle: "Définir la tâche fluidique et la configuration",
  ctaTitle: "Confirmer la configuration {{model}} pour votre instrument", ctaButton: "Envoyer les besoins",
  drawingUnavailable: "Aucun plan 2D public n'est disponible pour la {{model}}. Ajoutez une demande de plan à la liste de sélection et transmettez votre demande ; la configuration et la révision du plan restent à confirmer.",
  modelUnavailable: "Aucun modèle 3D public n'est disponible pour la {{model}}. Indiquez l'espace de montage et la configuration pour demander un fichier adapté.",
  specNotesSingle: ["La cylindrée par tour n'est ni la dose ni le volume minimal fiable ; vérifiez le résultat avec l'entraînement, le liquide et le circuit.", "Exactitude, répétabilité et durée de vie dépendent des conditions d'essai. Confirmez la contre-pression de service séparément de la tenue en pression."],
  specNotesDual: ["Le rapport compare les volumes de concentré et de diluant. Mesurez chaque circuit séparément ; le volume total ne suffit pas à établir la concentration.", "Dosage proportionnel et mélange sont distincts. Vérifiez matériaux mouillés, contre-pression de service et conditions de performance de chaque circuit."]
};
