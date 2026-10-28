import type { DiaphragmPumpEngineeringArticleCopy } from "../../diaphragm-pump-engineering-article.types";
import { coverImage, paragraph as p, list, table, formula, links, ratingRows, flowSlug, overviewSlug, materialsSlug } from "./shared";

// Terminologie Stäubli : raccord rapide, about, obturation, perte de charge et pression résiduelle.
// https://www.staubli.com/fr/fr/fluid-connectors/produits/quick-and-dry-disconnect-couplings/types-of-quick-couplings.html
const deck = "La pression de service d'un raccord rapide dépend de sa série, des matériaux et des conditions d'utilisation. Les configurations standard FOREACH Q20 et Q40 en POM/NBR et PP/EPDM sont données pour 8,3 bar (environ 0,83 MPa), contre 4,2 bar (environ 0,42 MPa) pour Q60 en PP/EPDM. Il faut vérifier la perte de charge au débit requis, les pointes de pression, le fluide et la température. La présence de clapets d'obturation ne signifie pas que la connexion ou la déconnexion sous pression est autorisée.";

export const copy = {
  metadata: { title: "Pression des raccords rapides : température et connexion sous pression", seoTitle: "Raccords rapides : pression de service et température | FOREACH", seoDescription: "Vérifiez la pression de service des Q20, Q40 et Q60 : perte de charge, contre-pression, température, pression résiduelle et validation de l'assemblage.", coverImage, coverAlt: "Demi-raccords rapides Q20, Q40 et Q60 séparés sur fond blanc" },
  deck,
  leadBlocks: [p(deck), p("Ce guide concerne les raccords à deux demi-raccords séparables, corps femelle et about mâle, utilisés dans les circuits d'alimentation, de lavage, d'effluents et de réservoirs des instruments. L'article consacré au débit évalue la pression différentielle consommée. Celui-ci examine la tenue de la connexion complète dans les conditions réelles, avec calculs de contre-pression, procédure de maintenance et validation sur équipement."), links("fr", [[flowSlug, "Débit des raccords rapides : courbes de perte de charge et calculs Kv/Cv"]])],
  sections: [
    { title: "Quelle est la pression de service des raccords rapides Q20, Q40 et Q60 ?", tocLabel: "Pression de service", blocks: [
      p("Les deux combinaisons standard Q20 et Q40 indiquées ci-dessous sont données pour 8,3 bar ; Q60-PP pour 4,2 bar. La température et le diamètre intérieur du tuyau permettent une première sélection. Les maxima de pression et de température ne constituent pas automatiquement un point de fonctionnement admissible simultané."),
      table(["Série", "Corps / joint torique", "Pression de service", "Plage de température", "Diamètre intérieur du tuyau"], ratingRows("Maximum 71 °C ; minimum à confirmer pour le modèle", true)),
      p("Une pression identique ne rend pas POM/NBR et PP/EPDM équivalents : comparez la compatibilité chimique et la température de nettoyage. Après changement du matériau d'un joint, vérifiez à nouveau le couple corps/about complet. La tenue thermique du joint ne relève pas celle de tout le raccord."),
      list("1 bar = 0,1 MPa ≈ 14,5 psi ≈ 1,02 kgf/cm².", "8,3 bar ≈ 0,83 MPa ≈ 8,5 kgf/cm² ; 120 psi est l'équivalence approchée du catalogue.", "4,2 bar ≈ 0,42 MPa ≈ 4,3 kgf/cm² ; 60 psi est l'équivalence approchée du catalogue."),
      p("Précisez toujours l'unité. L'expression courante « kilos de pression » désigne généralement des kgf/cm², et non une masse."),
      p("Les documents disponibles divergent sur la température minimale du Q60. Seule la limite supérieure concordante de 71 °C est donc reprise. Obtenez les données du modèle pour la pression admissible à la température considérée, le fonctionnement en dépression et les autres matériaux."),
    ] },
    { title: "Un raccord rapide de plus grand passage résiste-t-il à une pression supérieure ?", tocLabel: "Passage et tenue", blocks: [
      p("Le passage contribue à la capacité de débit ; la tenue en pression dépend aussi du corps, du verrouillage, de la géométrie d'étanchéité et des matériaux. Q60 accepte des tuyaux plus grands, mais sa configuration standard PP est donnée pour 4,2 bar, contre 8,3 bar pour les Q20/Q40 ci-dessus. La taille seule ne détermine pas la pression admissible."),
      formula("Effort dû à la pression : F = ΔP × Aeff", "ΔP est la pression différentielle en Pa, Aeff la surface effectivement soumise à cette pression en m², et F l'effort en N. Le diamètre intérieur du tuyau ne remplace pas le diamètre effectif de pression."),
      p("À pression différentielle égale, une surface effective accrue augmente l'effort sur les organes de retenue et d'étanchéité. Cela ne permet ni de calculer la pression assignée du raccord ni d'expliquer à lui seul la valeur inférieure du Q60. La spécification de la configuration reste la référence."),
      list("Vérifier le débit : estimer la perte de charge à partir de la courbe applicable ou de Kv/Cv.", "Vérifier la pression : retenir la pression maximale à la connexion. Un meilleur débit du Q60 n'autorise pas à dépasser 4,2 bar.", "Vérifier les branches en parallèle : elles répartissent le débit et peuvent réduire les pertes, sans augmenter la pression admissible de chaque raccord."),
    ] },
    { title: "Comment distinguer pression de service, perte de charge et contre-pression ?", tocLabel: "Pertes et contre-pression", blocks: [
      p("La pression de service indique ce que la connexion peut supporter dans des conditions définies. La perte de charge est la diminution de pression due au passage du fluide. Une faible perte n'exclut donc pas une surpression lorsque les deux côtés sont déjà fortement pressurisés."),
      table(["Grandeur", "Utilité", "Ne permet pas de conclure sur"], [
        ["Pression de service assignée", "Service admissible pour le fluide, la température et la configuration spécifiés", "La pression autorisée pour connecter ou déconnecter"],
        ["Perte de charge ΔP", "Pression différentielle consommée au débit souhaité", "La pression d'entrée ou de sortie par rapport à l'ambiance"],
        ["Pression d'essai maintenue pendant une durée définie", "Comportement d'un échantillon selon une durée, un fluide, une température et des critères définis", "Une pression de service continu non confirmée"],
        ["Pression d'éclatement", "Pression de rupture lors d'un essai destructif", "Le service normal, les pointes autorisées ou les opérations de connexion"],
        ["Valeur maximale de l'axe", "Étendue du tracé, par exemple une échelle verticale à 4,83 bar", "La pression ou le débit assigné du produit"],
      ]),
      formula("Pamont = Paval + ΔPraccord", "Estimation en régime permanent, avec différences d'altitude et de vitesse négligeables. Les deux pressions doivent avoir la même référence. Les exemples utilisent des pressions relatives à l'atmosphère."),
      list("Q40 avec tuyau de 3/8″ : à 12 L/min, pour une densité relative de 1,0 et Kv ≈ 1,22, la perte est d'environ 0,35 bar. Avec 3,0 bar en aval, on obtient environ 3,35 bar en amont ; avec 8,0 bar en aval, environ 8,35 bar, au-delà des 8,3 bar autorisés. Comparer uniquement 0,35 bar de perte à la pression de service serait incorrect.", "Q60 avec tuyau de 1/2″ : à 50 L/min, la courbe indique environ 0,8 bar de perte. Une contre-pression aval de 3,6 bar porte l'amont à environ 4,4 bar, au-delà des 4,2 bar du Q60-PP. Un débit visible sur la courbe ne suffit pas à valider ce point de fonctionnement."),
      p("Il s'agit d'exemples calculés expliquant la relation entre les pressions, et non d'essais d'une connexion complète."),
      p("Si l'aval est à l'atmosphère ou à une pression relative positive, la pression relative amont est au moins égale à la perte de charge. Les zones de la courbe Q60 dépassant 4,2 bar de perte ne sont donc pas utilisables directement pour ces conditions. Une ligne d'aspiration peut fonctionner en dépression ; son étanchéité doit être vérifiée séparément, sans rendre admissibles les portions hors spécification."),
      links("fr", [[flowSlug, "Courbes Q20, Q40 et Q60 et hypothèses des calculs Kv/Cv"]]),
    ] },
    { title: "Quelles pressions du circuit faut-il vérifier pour choisir un raccord rapide ?", tocLabel: "Vérifications de pression", blocks: [
      p("Évaluez la pression à l'emplacement du raccord, pas seulement la plaque de la pompe ou une lecture en régime normal. Une sortie obstruée, une vanne à fermeture rapide ou un volume de liquide emprisonné après l'arrêt peuvent modifier la situation."),
      table(["Situation", "Données à relever", "Utilisation"], [
        ["Alimentation et lavage normaux", "Pressions amont et aval au débit cible", "Vérifier pression d'entrée et budget de pertes ; le débit libre de la pompe ne suffit pas"],
        ["Démarrage, arrêt et commutation", "Pression transitoire maximale près du raccord", "Choisir une réponse capteur et un échantillonnage permettant de mesurer les pointes"],
        ["Sortie bouchée ou vannes aval fermées", "Maximum possible avec pompe, régulation et limitation", "Prévoir une limitation ou un interverrouillage adapté et vérifier son action"],
        ["Arrêt pour maintenance", "Pression résiduelle des deux côtés et dans les tronçons isolés", "L'arrêt de la pompe ne prouve pas la dépressurisation"],
        ["Réchauffement d'un volume fermé", "Pression après hausse de température du liquide ou de l'ambiance", "Prévoir les effets de dilatation et un moyen de décharge ou de protection"],
        ["Aspiration de pompe", "Pression minimale, bulles et stabilité d'alimentation", "Vérifier le domaine de dépression indépendamment de la tenue en pression positive"],
      ]),
      p("En cas de fluctuations, retenez le cas défavorable mesuré ou validé, et non la moyenne. À proximité de la limite, intégrez l'incertitude de mesure, les écarts de régulation, la température et l'état des joints après utilisation. Aucun coefficient de sécurité universel n'est fixé ici."),
    ] },
    { title: "Comment la température modifie-t-elle la tenue en pression d'un raccord rapide ?", tocLabel: "Effet de la température", blocks: [
      p("La chaleur modifie la rigidité et la tenue mécanique à long terme du corps polymère, ainsi que la compression et le retour élastique des joints. À l'approche des limites du matériau ou du produit, la pression de service courante ne peut pas être reprise sans vérification. Pression et température forment une condition combinée."),
      table(["Condition réelle", "Premier constat", "Vérifications complémentaires"], [
        ["Lavage à 80 °C avec PP/EPDM", "Dépasse la limite de 71 °C des configurations standard décrites", "Adapter le lavage ou la connexion ; réduire la pression ne valide pas une surtempérature"],
        ["Lavage à 80 °C avec Q20/Q40 POM/NBR", "Reste sous 82 °C, sans démontrer une tenue à 8,3 bar à 80 °C", "Pression à cette température, durée, compatibilité chimique et cycles thermiques"],
        ["Joint torique plus résistant à la chaleur", "Sa plage n'est pas celle du raccord complet", "Limites du corps, des clapets, du couple corps/about et du tuyau"],
        ["Démarrage à froid ou réfrigération", "Aptitude à confirmer par modèle", "Retour du joint, verrouillage et fluide ; ne pas appliquer au Q60 le minimum d'une autre série"],
      ]),
      p("Une connexion étanche à l'eau ne garantit pas la même étanchéité ou résistance avec un réactif ou un détergent. Pour les pièces en contact avec le fluide, consignez :"),
      list("Nature et concentration du fluide.", "Températures maximale et minimale de service.", "Durée de contact et fréquence de nettoyage."),
      p("Les données disponibles ne fournissent pas de courbes complètes de déclassement pression–température pour ces configurations. Il ne faut ni inventer un pourcentage de réduction ni utiliser simultanément les deux valeurs maximales."),
      links("fr", [[materialsSlug, "Matériaux des raccords et compatibilité chimique"]]),
    ] },
    { title: "Peut-on connecter ou déconnecter un raccord rapide sous pression ?", tocLabel: "Connexion et dépressurisation", blocks: [
      p("Ni la présence de clapets ni l'indication « 8,3 bar de pression de service » ne l'autorisent. Le clapet ferme le passage du demi-raccord qui le porte après séparation. Les opérations sous pression font intervenir effort d'accouplement, déverrouillage, libération de liquide et pression différentielle ; leurs conditions doivent être confirmées séparément."),
      p("La pression résiduelle peut s'opposer au mouvement du clapet ou à l'accouplement et empêcher l'engagement complet. Du liquide peut être projeté avant ou pendant la fermeture. La double obturation isole les deux côtés, sans garantir zéro goutte ni évacuer automatiquement la pression emprisonnée."),
      p("Pour les configurations Q20, Q40 et Q60 décrites, sans autorisation explicite du modèle précisant les conditions d'opération sous pression, procédez après arrêt, isolement et dépressurisation :"),
      list("Arrêter la pompe ou la source de pression et empêcher un redémarrage intempestif. Laisser refroidir le fluide chaud à une température compatible avec la maintenance.", "Isoler réservoirs, branches et sources pouvant encore alimenter le circuit. Repérer les volumes emprisonnés de chaque côté, notamment entre clapets antiretour et vannes fermées.", "Utiliser les voies de décharge et de vidange prévues par l'équipement, puis vérifier la dépressurisation au raccord. Ne pas desserrer celui-ci pour sonder ou relâcher la pression.", "Soutenir le tuyau et recueillir le liquide résiduel avant de déverrouiller et séparer les deux parties. En cas de résistance inhabituelle, vérifier à nouveau la pression et le verrouillage.", "Avant reconnexion, contrôler joints toriques, portées et verrouillage. Vérifier l'engagement complet, puis l'absence de fuite ou d'entrée d'air et la stabilité d'alimentation au redémarrage."),
      p("Après séparation de demi-raccords obturés, chaque ligne peut rester sous pression. Contrôlez à nouveau les deux côtés avant la reconnexion ; une déconnexion antérieure ne prouve pas leur dépressurisation."),
      links("fr", [[overviewSlug, "Corps, abouts et configurations d'obturation"]]),
    ] },
    { title: "Que vérifier lors de l'installation d'un raccord rapide de grand passage ?", tocLabel: "Installation Q60", blocks: [
      p("Évaluez l'ensemble : corps, about, joints, raccordements, tuyau et retenue. La configuration Q60 PP/EPDM est donnée pour 4,2 bar, mais cela ne confère pas cette tenue au tuyau raccordé. La pression admissible la plus faible dans les conditions réelles limite l'assemblage."),
      list("Tuyau : Q60 couvre des diamètres intérieurs de 9,5 à 19,0 mm. Ce diamètre n'est ni le passage minimal interne ni le diamètre effectif servant à calculer les efforts de verrouillage.", "Configuration 3/4″ (19,0 mm) : aucune courbe de débit n'est disponible dans les données de référence. Obtenir les données correspondantes ou réaliser un essai ; ne pas extrapoler la courbe 1/2″ selon le rapport des diamètres.", "Support : les grands tuyaux remplis imposent poids et flexion. Des supports doivent reprendre les efforts latéraux permanents ; ne pas suspendre la ligne au verrou du raccord.", "Corps à traversée de cloison : Q60 accepte une épaisseur maximale de 7,5 mm, un perçage Ø31 mm et un filetage de fixation M30×3.5. Prévoir l'espace de déverrouillage, retrait, serrage de l'écrou et courbure du tuyau.", "Aspiration : vérifier la perte de charge, l'entrée d'air en dépression et la purge après reconnexion. L'absence de fuite liquide vers l'extérieur ne démontre pas l'étanchéité à l'air en aspiration."),
      p("Consignez l'encombrement et les raccordements avec le fluide, la température, les pointes de pression et les conditions de maintenance. Le gain de débit doit rester compatible avec les limites de pression et les interventions prévues."),
    ] },
    { title: "Comment valider la pression et l'étanchéité d'un raccord rapide dans l'équipement ?", tocLabel: "Validation de l'ensemble", blocks: [
      p("Utilisez le couple corps/about, les joints, le tuyau et les supports prévus pour l'installation. Un bref maintien en pression à l'eau et à température ambiante ne représente pas le nettoyage à chaud, les cycles de pression ou les démontages répétés."),
      table(["Vérification", "Données à consigner", "Objectif"], [
        ["Configuration et service", "Références complètes, matériaux, clapets, tuyau, diamètre, fluide et température", "Tester l'assemblage réellement prévu"],
        ["Pression stable et perte de charge", "Pressions aux deux extrémités et débit délivré", "Distinguer tenue en pression et budget différentiel"],
        ["Démarrages et commutations", "Signal de pression, pics, réponse capteur et échantillonnage", "Détecter les surpressions masquées par la moyenne"],
        ["Protections et anomalies", "Seuils d'action et pression maximale après déclenchement", "Vérifier sortie obstruée et vannes fermées sans neutraliser les protections pour provoquer une surpression"],
        ["Température et fluide réel", "Fuites, déformation et verrouillage après cycles thermiques et de lavage", "Évaluer leurs effets sur la connexion complète"],
        ["Arrêt, dépressurisation et reconnexion", "Pression résiduelle des deux côtés, engagement, liquide retenu et reprise du débit", "Valider la maintenance ; la pression de service n'autorise pas un essai de connexion sous pression"],
        ["Service en aspiration", "Pression minimale, bulles, bas niveau du réservoir et purge après reconnexion", "Vérifier entrées d'air et stabilité"],
      ]),
      p("Définissez avant l'essai la pression admissible, la durée de maintien, le nombre de cycles et les critères de fuite selon le modèle et l'équipement. Aucun multiplicateur de surpression, seuil d'éclatement ou nombre de cycles de vie universel n'est donné ici. Un essai sans fuite ne démontre pas la fiabilité à long terme."),
    ] },
    { title: "Pour approfondir la sélection des raccords rapides", tocLabel: "Lectures complémentaires", blocks: [links("fr", [[flowSlug, "Courbes de perte de charge et calculs Kv/Cv"], [overviewSlug, "Raccords rapides : corps, abouts et obturation"], [materialsSlug, "Matériaux PP, PA, POM, PVDF et PEEK"]], true)] },
  ],
  faqTitle: "Questions fréquentes sur la pression des raccords rapides", faqTocLabel: "Questions fréquentes",
  faqItems: [
    { question: "Un raccord donné pour 8,3 bar convient-il à un circuit fonctionnant habituellement à 8 bar ?", answer: "Ces deux chiffres ne suffisent pas. Si les 8 bar sont mesurés en aval, ajoutez la perte de charge ; s'il s'agit de la pression amont stabilisée, vérifiez pointes, écarts de régulation et pression admissible à la température réelle. Une sélection proche de la limite nécessite l'examen de toutes les conditions de service." },
    { question: "La pression du raccord s'applique-t-elle aussi à l'ensemble équipé d'un tuyau ?", answer: "Pas automatiquement. Le matériau et l'épaisseur du tuyau, la température et la retenue des extrémités peuvent être limitants. Retenez la pression admissible la plus faible entre les deux demi-raccords, joints, tuyau et autres connexions, puis validez étanchéité et retenue mécanique de l'ensemble." },
    { question: "Comment comparer les données de pression de deux fournisseurs ?", answer: "Distinguez la pression de service, la pression d'essai maintenue pendant une durée définie et la pression d'éclatement. Comparez couples complets, clapets, joints, fluide, température, durée, cycles et critères de défaillance. Si une opération sous pression est nécessaire, obtenez séparément les conditions de connexion et de déconnexion. Des valeurs établies dans des conditions différentes ne se classent pas simplement par ordre de grandeur ; un remplacement doit être validé dans l'équipement." },
  ],
  cta: { title: "Vérifier le raccord pour vos conditions de service", description: "Documentez la connexion complète et ses conditions d'utilisation. Les ingénieurs FOREACH peuvent vous aider à examiner les configurations Q20, Q40 et Q60 et les validations nécessaires.", contactLabel: "Échanger sur la sélection", productsLabel: "Voir les modèles de raccords", productsHref: "/fr/products/fittings/quick-connect-fittings/" },
} satisfies DiaphragmPumpEngineeringArticleCopy;
