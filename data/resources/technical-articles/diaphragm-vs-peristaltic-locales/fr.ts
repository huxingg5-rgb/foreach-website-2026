import { createComparisonCopy, type ComparisonTranslation } from "./shared";

const translation: ComparisonTranslation = {
  metadata: {
    title: "Pompe à membrane miniature ou péristaltique : avantages, limites et choix pour les instruments",
    seoTitle: "Pompe à membrane ou péristaltique : différences et choix | FOREACH",
    seoDescription: "Comparez les pompes à membrane miniatures et péristaltiques : différences, avantages, précision et entretien pour le lavage, les réactifs et les déchets.",
    coverAlt: "Pompe à membrane miniature haute pression pour liquides FOREACH DPL30H-BS, à moteur sans balais",
  },
  deck: "Comparez les pompes à membrane miniatures pour liquides et les pompes péristaltiques dans les analyseurs et les équipements de laboratoire. Examinez leur fonctionnement, leurs avantages et inconvénients, la précision du dosage et les coûts d’entretien, puis appliquez ces critères au choix d’une pompe pour le lavage, le transfert de réactifs ou l’aspiration de déchets liquides.",
  lead: "Une pompe à membrane miniature pour liquides peut convenir à un circuit fixe, nettoyable et réutilisable. Une pompe péristaltique mérite d’être évaluée lorsque le circuit mouillé doit être remplacé entre lots ou que le transfert doit être bidirectionnel. Les deux solutions doivent satisfaire les exigences réelles de fluide, de débit, de pression et d’entretien ; précision, pulsations et coût dépendent de la configuration.",
  scopeLabel: "Périmètre",
  scope: "Cette comparaison concerne les pompes électriques à membrane miniatures pour liquides et les pompes péristaltiques à galets intégrées aux instruments. Les grosses pompes pneumatiques à double membrane et les pompes industrielles à tuyau ont d’autres domaines de fonctionnement. Une pompe à membrane pour gaz n’est pas automatiquement adaptée au pompage de liquide.",
  overview: {
    title: "Pompes à membrane miniatures et péristaltiques : différences et tableau comparatif",
    headers: ["Critère", "Pompe à membrane miniature pour liquides", "Pompe péristaltique"],
    rows: [
      ["Principaux avantages", "Chambre réutilisable ; moins de consommables liés à l’écrasement d’un tube ; intégration aisée dans un circuit fixe.", "Le liquide reste dans le tube, ce qui facilite son remplacement et l’isolement du fluide. Les modèles réversibles permettent un transfert dans les deux sens."],
      ["Principales limites", "Nettoyage de la chambre et des clapets ; particules ou cristaux susceptibles de perturber les clapets ; débit pulsé.", "Fatigue du tube et remplacement périodique. Le montage et l’usure peuvent modifier le débit et les doses."],
      ["Changement de fluide", "Traiter les résidus dans la chambre, la membrane, les clapets et les tubes externes.", "Remplacer les composants mouillés peut simplifier le changement, mais les éléments communs restent à traiter."],
      ["Entretien", "Membrane, clapets, joints et propreté interne.", "Durée de vie du tube, montage, fuites et étalonnage après remplacement."],
      ["Situations à privilégier", "Alimentation, appoint et circulation dans un circuit fixe nettoyable et réutilisable.", "Circuit mouillé remplacé par lot, ensembles à usage unique et transfert bidirectionnel."],
      ["Précision et pulsations", "À évaluer selon le modèle, la commande et les mesures au point d’utilisation.", "Essais également nécessaires, y compris l’évolution pendant la durée d’utilisation du tube."],
    ],
    note: "Ces avantages dépendent du circuit. Vérifiez les matériaux mouillés, le débit à la pression de travail, le cycle de service et l’accès pour l’entretien. Le type de pompe ne suffit pas à établir une meilleure précision ou un coût global inférieur.",
  },
  principle: {
    title: "Comment fonctionnent les pompes à membrane et péristaltiques ?",
    paragraphs: [
      "Une pompe à membrane modifie le volume de sa chambre par le déplacement d’une membrane souple. Les clapets d’entrée et de sortie dirigent aspiration et refoulement. Le liquide touche la chambre, la membrane et les clapets : compatibilité et nettoyage doivent donc couvrir l’ensemble des pièces mouillées.",
      "Une pompe péristaltique déplace des galets le long d’un tube souple. La compression pousse le liquide ; derrière le galet, le tube reprend sa forme et se remplit. En fonctionnement normal, le liquide reste dans le tube sans toucher les galets. Le tube sert à la fois de barrière et de pièce déformée de manière répétée ; matériau, dimensions, reprise de forme et état influencent les performances.",
    ],
    diaphragmAlt: "Animation du déplacement de la membrane et de l’ouverture alternée des clapets d’entrée et de sortie",
    diaphragmCaption: "À l’aspiration, le volume de la chambre augmente, le clapet d’entrée s’ouvre et celui de sortie se ferme. Au refoulement, la séquence s’inverse.",
    animationLabel: "Ouvrir l’animation",
    peristalticAlt: "Trois positions du rotor illustrant l’écrasement du tube et le sens de déplacement du liquide",
    peristalticCaption: "Les galets créent des points d’occlusion mobiles qui déplacent le liquide. La reprise de forme du tube derrière les galets permet une nouvelle entrée de liquide.",
  },
  details: {
    title: "Avantages et inconvénients : précision, pulsations et entretien des deux pompes",
    groups: [
      { title: "Comment le circuit mouillé influence-t-il le nettoyage et le changement de fluide ?", paragraphs: [
        "Avec une pompe à membrane, un changement de fluide impose le nettoyage des pièces internes mouillées ; remplacer les tubes externes n’élimine pas les résidus de la chambre et des clapets. Une chambre réutilisable peut convenir à un circuit fixe alimenté par le même liquide de lavage si l’efficacité du nettoyage est validée. Vérifiez séparément les matériaux de la tête, de la membrane et des clapets avec le liquide et les agents de nettoyage.",
        "Avec une pompe péristaltique, remplacer le tube élimine les résidus de ce tronçon et peut s’intégrer au changement de lot. Les réservoirs, raccords et composants en aval partagés doivent aussi être nettoyés ou remplacés. Stérilité et contamination résiduelle s’évaluent sur le circuit complet. Le tube doit résister aux produits chimiques, à la température, à la pression et aux compressions répétées ; un tube de transfert ordinaire n’est pas nécessairement un tube de pompe adapté.",
      ] },
      { title: "Quels éléments faut-il entretenir ?", paragraphs: [
        "La pompe à membrane évite la fatigue d’un tube écrasé par des galets, mais membrane, clapets et joints restent des pièces d’usure. Dépôts, fibres ou cristaux peuvent gêner la fermeture d’un clapet et provoquer retour de liquide, amorçage plus lent ou baisse de débit. Contrôlez propreté, étanchéité et débit réel, puis vérifiez si la tête choisie autorise un entretien sur site.",
        "Le tube péristaltique se déforme à chaque passage des galets. Sa fatigue peut modifier la reprise de forme et le débit ; une rupture peut entraîner une fuite. L’entretien comprend inspection, remplacement selon les conditions réelles, montage correct et nouvel étalonnage si nécessaire. La facilité de remplacement est utile, mais tubes, main-d’œuvre et arrêts restent des coûts récurrents.",
        "Prévoyez un accès d’entretien pour chaque solution. Comparez achat, consommables, nettoyage, main-d’œuvre, étalonnage et arrêts sur un même programme d’utilisation. Le type de pompe ou son prix d’achat ne détermine pas seul le coût sur toute la durée de vie.",
      ] },
      { title: "Que change un besoin de réaspiration ou de transfert bidirectionnel ?", paragraphs: [
        "Dans une pompe à membrane classique, les clapets fixent le sens du liquide ; inverser le moteur n’inverse généralement pas le débit. Une conception spéciale ou une commutation du circuit peut être nécessaire. Une péristaltique réversible peut inverser le flux en inversant le rotor, ce qui convient à la réaspiration ou au transfert entre deux récipients. Vérifiez tête, tube, entraînement et commande, puis mesurez le liquide résiduel et les gouttes après réaspiration.",
      ] },
      { title: "Quelle pompe est la plus précise ou la moins pulsatoire ?", paragraphs: [
        "Le type de pompe ne suffit pas à répondre. Le mouvement de la membrane et des clapets, comme la compression et la reprise de forme du tube, produit un débit périodique. Une moyenne stable peut masquer des pointes et des creux. L’appoint d’un réservoir peut surtout dépendre du volume cumulé, alors qu’une cellule de mesure peut exiger aussi une stabilité instantanée. Mesurez au point d’utilisation avant de choisir amortissement, combinaison de têtes ou compensation de commande.",
        "Comparez les doses avec le même volume cible, liquide, niveau d’entrée, pression de sortie et cycle. Relevez l’écart moyen et la dispersion des doses, ainsi que le redémarrage après arrêt. Pour la péristaltique, comparez un tube neuf à un tube proche de son remplacement prévu. Conservez les conditions avec les résultats : le débit libre ne prouve pas la précision du dosage dans l’instrument.",
      ] },
    ],
    linkLabels: ["Mesurer et réduire les pulsations d’une pompe à membrane", "Précision et répétabilité du dosage de réactifs"],
  },
  selection: {
    title: "Circuits d’instruments : quand choisir une pompe à membrane ou péristaltique ?",
    intro: "Évaluez d’abord la membrane pour un circuit fixe, nettoyable et réutilisable véhiculant le même liquide. Évaluez d’abord la péristaltique si le circuit mouillé change par lot ou si le flux doit être inversé par le moteur. Affinez ensuite selon débit, contre-pression, matériaux et entretien.",
    diaphragmTitle: "Quand privilégier l’évaluation d’une pompe à membrane ?",
    diaphragmParagraphs: [
      "L’alimentation fixe en liquide de lavage, l’appoint de réservoirs et la circulation dans les analyseurs sont des cas pertinents. Ces tâches utilisent souvent une composition stable et exigent un volume dans un délai donné ou un débit sous charge. La chambre réutilisable réduit les changements de tube, à condition que les matériaux soient compatibles, le nettoyage efficace et l’entretien des pièces réalisable.",
      "Avec des tubes fins, filtres ou buses de lavage, vérifiez le débit à la contre-pression requise. Pression maximale et débit libre ne constituent pas un seul point de fonctionnement. Si changer régulièrement un tube dans l’instrument est difficile, comparez les intervalles d’entretien tout en prévoyant un accès de réparation.",
    ],
    peristalticTitle: "Quand privilégier l’évaluation d’une pompe péristaltique ?",
    peristalticParagraphs: [
      "Lorsqu’un lot de réactif, d’échantillon ou de milieu de culture impose de remplacer les pièces mouillées, le tube amovible facilite cette opération et l’emploi d’ensembles à usage unique. Incluez flacons, raccords, vannes et aiguilles partagés : changer seulement le tronçon dans la tête ne supprime pas les résidus ailleurs. Un procédé stérile demande de valider l’assemblage complet et sa manipulation.",
      "Une péristaltique réversible peut limiter les composants de commutation pour réaspirer après distribution ou transférer dans les deux sens entre récipients. Confirmez compatibilité chimique, pression et durée d’utilisation du tube ; prévoyez accès et temps pour son remplacement et le nouvel étalonnage.",
    ],
    tableTitle: "Choix d’une pompe pour le lavage, les réactifs et les déchets liquides",
    headers: ["Tâche", "Première solution à évaluer", "Conditions à vérifier"],
    rows: [
      ["Alimentation fixe de lavage ou appoint d’un réservoir", "Pompe à membrane miniature pour liquides", "Liquide stable et circuit nettoyable ; vérifier le temps de remplissage avec le débit sous charge."],
      ["Circulation fixe avec moins de changements de tube", "Pompe à membrane miniature pour liquides", "Service continu ou intermittent et entretien de la membrane, des clapets et des joints."],
      ["Réactifs, échantillons ou milieux avec changement par lot", "Pompe péristaltique", "Définir l’ensemble remplaçable ; compatibilité et durée de vie du tube, résidus dans les raccords communs."],
      ["Réaspiration ou transfert dans les deux sens", "Pompe péristaltique réversible", "Tête et entraînement compatibles ; volume réaspiré, résidus et gouttes."],
      ["Déchets connus évacués par un circuit fixe", "Une pompe à membrane compatible peut être évaluée d’abord", "Particules, cristaux, obstruction des clapets et fonctionnement gaz-liquide autorisé. Comparer une péristaltique si l’isolement impose de remplacer le tube."],
      ["Petites doses en cycles courts ou alimentation peu pulsatoire d’un détecteur", "Choix sur essais au point d’utilisation", "Erreur de dose, répétabilité ou forme d’onde ; amortissement, commande ou dosage de précision si nécessaire."],
    ],
    limitsTitle: "Quand le type de pompe ne permet-il pas de trancher ?",
    limits: [
      "Une composition de déchets variable, des particules, fibres, cristaux ou arrivées intermittentes d’air imposent de vérifier le fluide et les passages pour les deux technologies. L’absence de clapets dans une tête péristaltique ne garantit pas le passage de toute particule sans dommage. Distinguez pompage direct et mise sous vide d’un flacon collecteur : une pompe pour gaz non prévue pour le liquide doit être protégée contre son entrée. L’auto-amorçage n’autorise pas une marche à sec illimitée.",
      "Pour le dosage précis, mesurez la dose à la sortie. Retard au démarrage, gaz piégé, pression, élasticité des tubes et liquide résiduel dans l’aiguille influencent le résultat. Testez le cycle complet. Si aucune solution ne respecte la tolérance, comparez des pompes à piston de précision ou des mécanismes de dosage à seringue.",
    ],
  },
  validation: {
    title: "Que faut-il valider après le choix de la pompe ?",
    steps: [
      "Définir transfert, appoint, évacuation, circulation ou dosage et le résultat requis en sortie.",
      "Décrire liquide et produits de nettoyage : concentration, température, viscosité, particules et bulles.",
      "Fixer débit ou dose, conditions d’aspiration, pression de sortie, cycle marche-arrêt et durée quotidienne.",
      "Cartographier tout le circuit mouillé et décider quels éléments seront nettoyés ou remplacés.",
      "Comparer courbes, matériaux, commande, encombrement et accès d’entretien des modèles précis.",
      "Tester le circuit installé dans les conditions et aux étapes d’utilisation prévues ; relever débit ou dose, fuites, démarrage et critères d’acceptation du procédé.",
    ],
    paragraph: "Les informations FOREACH DPL30 et DPL60 permettent d’entamer une comparaison au niveau du modèle. Utilisez les spécifications actuelles et la courbe débit-pression de la configuration choisie. Le choix d’un modèle ne démontre pas, à lui seul, la compatibilité avec un réactif, la précision de dosage ou le remplacement direct d’une péristaltique.",
    linkLabels: ["Voir les pompes à membrane FOREACH pour liquides", "Guide de sélection DPL30", "Guide de sélection DPL60", "Hauteur d’aspiration, temps d’amorçage et redémarrage"],
  },
  faqTitle: "Questions fréquentes",
  faqItems: [
    { question: "Deux pompes annoncées à 300 mL/min peuvent-elles être interchangées directement ?", answer: "Cette valeur ne suffit pas. Vérifiez liquide, vitesse ou tension et conditions d’entrée et de sortie de chaque donnée. Tubes fins, filtres et aiguilles peuvent conduire à des débits réels différents. Le remplacement modifie aussi matériaux mouillés, nettoyage, commande et entretien. Comparez débit, dose, démarrages et service dans le circuit d’origine. Si celui-ci impose de remplacer le parcours mouillé à chaque lot, une chambre à membrane réutilisable exige également de réévaluer le nettoyage." },
    { question: "À quelle fréquence remplacer le tube d’une pompe péristaltique ?", answer: "Il n’existe pas d’intervalle universel et il ne faut pas attendre une fuite. Matériau, dimensions, compression, vitesse, température, liquide et pressions influencent la durée de vie. Partez des recommandations applicables du fournisseur, puis définissez un intervalle préventif à partir des heures réelles, de l’évolution du débit et de l’état du tube. Aplatissement persistant, mauvaise reprise de forme, fissures, gonflement ou dérive notable exigent un contrôle. Une pompe à membrane réduit ce consommable, mais membrane, clapets et joints demandent aussi de l’entretien." },
    { question: "Pourquoi la dose change-t-elle avec un tube neuf de mêmes dimensions ?", answer: "La dimension nominale ne garantit pas un volume identique par tour. Tolérances du diamètre et de la paroi, position, tension et déformation initiale peuvent le modifier. Suivez les consignes de montage et de rodage, puis étalonnez avec le liquide et le circuit réels. Recueillez plusieurs doses ; mesurez leur volume ou leur masse, convertie avec la masse volumique du liquide. Vérifiez l’erreur moyenne et la répétabilité. Contrôlez de nouveau après un changement de fluide, de tuyauterie ou de contre-pression plutôt que de conserver l’ancien coefficient." },
    { question: "La pompe tourne mais n’aspire pas, ou son débit baisse : que vérifier ?", answer: "Contrôlez d’abord l’alimentation en liquide, l’immersion du tube et le sens des raccordements, puis les prises d’air, plis, filtres bouchés et la contre-pression. Si le circuit externe est correct, vérifiez type de tube, montage, occlusion et reprise de forme sur une péristaltique ; contamination des clapets, dépôts et dommages de membrane ou joints sur une pompe à membrane. Comparez avec le même liquide, niveau et réglage. Arrêtez et dépressurisez avant tout entretien autorisé de la tête, conformément à sa notice. Augmenter la vitesse n’identifie pas la cause." },
    { question: "Changer de technologie élimine-t-il les gouttes ou le retour de liquide à l’arrêt ?", answer: "Distinguez d’abord siphonnage lié aux niveaux, décharge de pression résiduelle et liquide retenu à l’extrémité. Les clapets d’une pompe à membrane dirigent le cycle ; leur fonction ne garantit pas la fermeture requise par le système. Une péristaltique repose sur l’occlusion du tube, que le montage ou l’usure peuvent compromettre ; du liquide peut aussi rester en aval. Évaluez une fermeture, une protection antisiphon ou une réaspiration validée selon la cause et testez l’arrêt. Le changement de pompe seul ne garantit pas l’absence de gouttes." },
    { question: "Lors d’un changement de réactif, suffit-il de remplacer le tube dans la tête péristaltique ?", answer: "Seulement si ce tronçon couvre tout le circuit mouillé à remplacer. Lignes d’aspiration, raccords de flacons, vannes, connecteurs et aiguilles réutilisés peuvent retenir l’ancien réactif. Tracez le parcours complet, attribuez nettoyage ou remplacement à chaque pièce et contrôlez les premières doses après changement selon les limites de résidus. Dans une pompe à membrane, incluez chambre, membrane et clapets. Le tube jetable facilite le changement mais ne prouve pas, seul, la stérilité ou l’absence de contamination résiduelle." },
  ],
  cta: { title: "Vous évaluez une pompe à membrane pour votre circuit ?", description: "Précisez liquide, débit ou dose, conditions d’entrée et de sortie, cycle de service et nettoyage pour examiner les configurations et la validation dans l’instrument.", contactLabel: "Discuter de votre application", productsLabel: "Voir les pompes à membrane" },
};

export const diaphragmVsPeristalticFr = createComparisonCopy("fr", translation);
