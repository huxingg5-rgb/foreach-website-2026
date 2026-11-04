import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";
import { medicalPvcTubingDiameters, medicalPvcTubingImages, medicalPvcTubingSizeRows } from "./medical-pvc-tubing.shared";

/* =========================================================
   Tubes PVC de qualité médicale — français
   Adapté aux lecteurs internationaux (contexte BPF UE /
   FED-STD-209E à la place de la réglementation chinoise) ;
   pas une traduction littérale. Liens : chemins du site chinois,
   localizeTubingArticle ajoute /fr ; /about/... est écrit en entier.
========================================================= */

const photos = {
  line: { ...medicalPvcTubingImages.line, alt: "Opérateur en combinaison de salle propre à capuche réglant le pupitre d’une extrudeuse de tubes dans la salle propre ISO 8 de FOREACH" },
  gauge: { ...medicalPvcTubingImages.gauge, alt: "Mesureur de diamètre en ligne sans contact sur une ligne d’extrusion ; le tube transparent passe dans la fenêtre de mesure entre des galets de guidage" },
  resin: { ...medicalPvcTubingImages.resin, alt: "Sécheurs de matière et chargeurs sous vide dans la salle propre" },
  die: { ...medicalPvcTubingImages.die, alt: "Gros plan de la filière d’extrusion et de l’entrée de calibrage ; le tube transparent sort de la filière et entre dans le bain d’eau" },
  tank: { ...medicalPvcTubingImages.tank, alt: "Bac de refroidissement et de calibrage dans la salle propre, avec diffuseurs d’air et éclairage au plafond" },
};

export const medicalPvcTubingMentionsFr = ["tubes PVC de qualité médicale", "tolérances dimensionnelles", "salle propre ISO 8", "ISO 13485"];

export const medicalPvcTubingCopyFr: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "Tubes PVC de qualité médicale : évaluer les tolérances, la production en salle propre et les certifications",
    seoTitle: "Tubes PVC de qualité médicale : tolérances, salle propre ISO 8 et certifications | FOREACH",
    seoDescription: "Ce qui distingue un tube PVC de qualité médicale d’un tuyau vinyle de quincaillerie : propriétés, tolérances DI/DE et mesure en ligne, extrusion en salle propre ISO 8, ISO 13485 et RoHS.",
    coverImage: photos.line.src,
    coverAlt: photos.line.alt,
  },
  deck: "Les tubes PVC de qualité médicale et les tuyaux vinyle courants partent du même polymère. Ce qui les sépare, c’est le compound et son plastifiant, la régularité dimensionnelle, l’environnement de production et la documentation de chaque lot. Ce guide passe en revue quatre points de contrôle — propriétés du matériau, précision dimensionnelle, production en salle propre et certifications — et montre comment FOREACH extrude et contrôle ses tubes PVC dans une salle propre ISO 8 (classe 100 000).",
  leadBlocks: [
    { type: "paragraph", text: "Un tube PVC de qualité médicale est un tube souple en polychlorure de vinyle utilisé dans les dispositifs médicaux, les systèmes de diagnostic in vitro (DIV) et les instruments d’analyse, le plus souvent pour les lignes de lavage, de réactifs, d’échantillons et de déchets, ainsi que pour les lignes de gaz basse pression. Chimiquement, il appartient à la même famille que le tuyau vinyle transparent vendu en quincaillerie ou en animalerie. La différence tient au niveau de maîtrise du compound, des dimensions, de l’environnement de production et de la documentation." },
    { type: "paragraph", text: "Pour le spécifier, vérifiez quatre points dans l’ordre : le matériau convient-il au fluide et à la température ; les tolérances de diamètre intérieur (DI) et extérieur (DE) garantissent-elles l’étanchéité des raccords et un débit constant d’un appareil à l’autre ; l’environnement de production empêche-t-il particules et débris d’entrer dans le tube ; le fournisseur peut-il appuyer chaque lot sur un système qualité certifié, des rapports de conformité et une traçabilité. Le guide se termine par une liste de questions à joindre à votre demande de prix." },
  ],
  sections: [
    { title: "Tube PVC de qualité médicale ou tuyau vinyle courant : quelles différences ?", tocLabel: "Médical ou courant", blocks: [
      { type: "paragraph", text: "Les deux sont en PVC plastifié. La vraie question n’est pas de savoir si le tube est en PVC, mais si la formulation est figée, le procédé maîtrisé et un problème traçable jusqu’à son origine. Le tableau résume les différences habituelles." },
      { type: "table", headers: ["Point de contrôle", "Tuyau vinyle courant", "Tube pour dispositifs médicaux et instruments"], rows: [
        ["Matière première", "Peut contenir du rebroyé ou du PVC recyclé ; composition difficile à tracer d’un lot à l’autre", "Compound vierge, formulation figée et lots de résine enregistrés"],
        ["Plastifiant", "Souvent du DEHP ou d’autres ortho-phtalates, rarement déclarés", "Système plastifiant déclaré ; rapports d’essai sur les substances restreintes disponibles"],
        ["Contrôle dimensionnel", "Contrôles ponctuels ; fiches techniques souvent limitées aux cotes nominales", "DE mesuré en ligne pendant l’extrusion ; DI et paroi contrôlés par lot selon des tolérances déclarées"],
        ["Environnement de production", "Atelier standard", "Extrusion en salle propre qui tient particules, fibres et huile hors du tube"],
        ["Documentation", "Généralement aucun enregistrement de lot", "Fabriqué sous un SMQ certifié, avec enregistrements traçables de matière, de procédé et de contrôle"],
        ["Usages typiques", "Jardin, évacuation, aquariophilie, transfert d’eau courant", "Lignes de fluides et de gaz des dispositifs médicaux, instruments DIV et d’analyse, automatisation de laboratoire"],
      ] },
      { type: "paragraph", text: "« Qualité médicale » sous-entend généralement aussi des données de biocompatibilité sur le compound, par exemple des essais USP Classe VI ou ISO 10993. Ces données concernent une formulation précise, pas le PVC en tant que matériau. Si le tube est en contact avec le patient ou des solutions médicamenteuses, ou s’il entre dans un dispositif réglementé, demandez les données de la référence exacte et menez l’évaluation au niveau de l’appareil." },
    ] },
    { title: "Propriétés des tubes PVC", tocLabel: "Propriétés", blocks: [
      { type: "paragraph", text: "Le tube PVC est transparent, souple, peu perméable aux gaz et économique. On voit le liquide et les bulles dans la ligne, ce qui le rend adapté aux fluides aqueux à température ambiante et à basse pression. Ses limites : une plage de température modeste, une faible résistance à la plupart des solvants organiques et un plastifiant susceptible de migrer ou d’être extrait." },
      { type: "table", headers: ["Propriété", "Tube PVC FOREACH (valeur typique)", "Conséquence pour la conception"], rows: [
        ["Dureté (Shore A)", "55A / 65A", "Le 55A, plus souple, s’emmanche plus facilement sur les cannelures ; le 65A garde sa forme et résiste à l’écrasement sous vide"],
        ["DI / DE", `${medicalPvcTubingDiameters.inner} mm / ${medicalPvcTubingDiameters.outer} mm`, "Un même DI existe en plusieurs épaisseurs de paroi : spécifiez DI × DE, pas seulement la « taille »"],
        ["Température de service", "-42 à 75 °C", "Valeur typique ; à confirmer avec votre fluide, votre pression et vos raccords"],
        ["Température de fragilité", "-46 °C", "Prévoir une marge en environnement froid"],
        ["Résistance à la traction", "14.3 MPa", "Adapté aux lignes basse pression"],
        ["Masse volumique / absorption d’eau", "1.18 g/cm³ / 0.12%", "—"],
      ] },
      { type: "paragraph", text: "Le PVC ne devient souple qu’avec un plastifiant, et les formulations traditionnelles utilisent des ortho-phtalates comme le DEHP. La directive déléguée (UE) 2015/863 — souvent appelée RoHS 3 — a ajouté le DEHP, le BBP, le DBP et le DIBP aux substances restreintes par RoHS, avec une limite de 0.1 % en masse dans les matériaux homogènes. Pour les dispositifs médicaux (y compris de DIV) et les instruments de contrôle et de surveillance, la restriction s’applique depuis le 22 juillet 2021. Si votre appareil est mis sur le marché de l’UE, le rapport RoHS du tube doit couvrir les quatre substances." },
      { type: "paragraph", text: "Le PVC plastifié peut aussi retenir certains composants du fluide. Des médicaments lipophiles comme la nitroglycérine et le diazépam sont connus pour être absorbés par les tubes PVC, et des protéines comme l’insuline s’adsorbent sur la paroi. Pour les réactifs, échantillons ou étalons sensibles à la concentration, comparez la concentration avant et après la ligne avec votre fluide réel ; pour les solvants organiques, passez à un tube fluoropolymère comme le PTFE ou le FEP." },
      { type: "notice", label: "Documentation FOREACH", text: "Des rapports d’essai RoHS sont disponibles pour les tubes PVC FOREACH par référence. Si vous avez besoin de résultats confirmés séparément pour le DEHP, le BBP, le DBP et le DIBP, précisez-le dans votre demande." },
      { type: "links", items: [
        { label: "Tubes PVC : dureté, cheminement et raccords pour tubes souples", href: "/resources/technical-articles/what-is-pvc-tubing/" },
      ] },
    ] },
    { title: "Précision dimensionnelle : pourquoi les tolérances DI et DE comptent", tocLabel: "Précision dimensionnelle", blocks: [
      { type: "paragraph", text: "Pour un tube souple, la précision désigne la régularité du DI, du DE, de l’épaisseur de paroi, de la concentricité et de l’ovalisation — ainsi que de la longueur de coupe pour les tubes coupés à longueur. Deux couronnes de même cote nominale peuvent se comporter différemment dans un même instrument si leurs dimensions réelles dérivent." },
      { type: "list", items: [
        "Étanchéité et tenue du raccord : les raccords cannelés assurent l’étanchéité par la dilatation élastique du DI et de la paroi ; les raccords instantanés qui serrent sur le DE exigent un DE dans la tolérance. Un tube trop gros fuit ou s’arrache ; un tube trop petit se monte mal et abîme l’extrémité.",
        "Régularité du débit : en écoulement laminaire, la résistance est inversement proportionnelle à la puissance quatre du DI. Un petit écart de DI devient un écart de résistance bien plus grand : débit, temps d’amorçage et efficacité de lavage varient d’un appareil à l’autre.",
        "Régularité de la paroi : un tube à paroi irrégulière ou ovalisé s’écrase localement sous vide et se plie plus facilement dans les courbes.",
      ] },
      { type: "formula", expression: "R = 128μL / (πd⁴) ; un écart de DI de ±5 % fait varier la résistance d’environ −18 % à +23 %", note: "R = résistance hydraulique, μ = viscosité dynamique, L = longueur, d = diamètre intérieur (écoulement laminaire, tube rond rigide). Pour un tube de 0.8 mm de DI, ±0.05 mm fait varier la résistance d’environ −22 % à +29 %. Plus le diamètre est petit, plus une même tolérance absolue pèse." },
      { type: "figure", ...photos.gauge, caption: "Mesureur de diamètre en ligne sur une ligne d’extrusion FOREACH : le tube traverse en continu la fenêtre de mesure et son DE est mesuré pendant la production." },
      { type: "paragraph", text: "Les lignes d’extrusion de tubes FOREACH sont équipées d’un mesureur de diamètre en ligne sans contact (Proton Products InteliSENS, série DGk). Il mesure le DE sur plusieurs axes simultanément grâce à une optique LED/CCD à semi-conducteurs, calcule le diamètre moyen et l’ovalisation, et peut déclencher une alarme lorsque le DE sort de la bande de tolérance. Contrairement aux contrôles ponctuels ligne arrêtée, la mesure en ligne couvre toute la longueur de chaque couronne." },
      { type: "paragraph", text: "Un mesureur de DE ne voit pas l’intérieur du tube. Le DI et l’épaisseur de paroi sont mesurés hors ligne sur des sections coupées ; le laboratoire qualité de FOREACH dispose d’un instrument de mesure par imagerie et de systèmes de vision pour le contrôle dimensionnel. Chaque référence a des tolérances DI/DE et un plan d’échantillonnage définis, que nous pouvons fournir avec la spécification." },
      { type: "links", items: [
        { label: "Vérifier DI et perte de charge avec le calculateur de résistance hydraulique", href: "/resources/calculators/fluid-resistance/" },
        { label: "Calculer le taux d’expansion d’un raccord cannelé", href: "/resources/technical-articles/barbed-fitting-expansion-ratio/" },
      ] },
    ] },
    { title: "Production en salle propre : ce que signifie ISO 8 (classe 100 000)", tocLabel: "Salle propre", blocks: [
      { type: "paragraph", text: "Beaucoup de fiches fournisseurs parlent encore de « classe 100 000 ». Cette désignation vient de la norme fédérale américaine FED-STD-209E, annulée en 2001. La norme en vigueur est l’ISO 14644-1, et la classe équivalente est ISO 8 : au plus 3 520 000 particules ≥0.5 µm par mètre cube d’air. L’air extérieur d’une ville typique en contient environ 35 millions, soit à peu près ISO 9." },
      { type: "table", headers: ["Classe ISO 14644-1", "Ancienne classe FED-STD-209E", "Particules ≥0.5 µm par m³ (max.)"], rows: [
        ["ISO 5", "Classe 100", "3 520"],
        ["ISO 6", "Classe 1 000", "35 200"],
        ["ISO 7", "Classe 10 000", "352 000"],
        ["ISO 8", "Classe 100 000", "3 520 000"],
        ["ISO 9", "— (environ l’air ambiant ordinaire)", "35 200 000"],
      ] },
      { type: "figure", ...photos.line, caption: "Zone d’extrusion en salle propre de FOREACH : un opérateur en combinaison à capuche et masque règle les paramètres au pupitre de l’extrudeuse." },
      { type: "paragraph", text: "FOREACH exploite ses lignes d’extrusion de tubes dans une salle propre ISO 8 (classe 100 000). Le soufflage d’air filtré HEPA, la cascade de pressions, l’habillage et la maîtrise des entrées de matières tiennent particules, fibres, cheveux et huile à l’écart de la matière fondue, de la paroi et des extrémités ouvertes du tube. Sur un tube transparent, ce type de contamination apparaît sous forme de points noirs ou de débris à l’intérieur — ou plus tard comme bruit de fond particulaire dans votre analyse." },
      { type: "paragraph", text: "Gardez en tête la portée de la salle propre : elle maîtrise la contamination particulaire et microbienne pendant la production. Elle ne rend pas le tube stérile et ne dit rien de sa biocompatibilité. Les lignes qui doivent être stériles nécessitent une étape de stérilisation validée ; la biocompatibilité dépend des données d’essai sur le compound et sur le tube fini." },
      { type: "paragraph", text: "À titre de repère, l’ISO 8 correspond à la limite particulaire « au repos » de la classe D de l’annexe 1 des BPF de l’UE, celle que l’industrie pharmaceutique réserve aux étapes les moins critiques, comme la manipulation de composants après lavage. Une salle propre ISO 8 pour tubes est donc un environnement maîtrisé pour garder le produit propre, et non une zone de fabrication aseptique." },
    ] },
    { title: "Comment FOREACH extrude ses tubes PVC", tocLabel: "Extrusion", blocks: [
      { type: "paragraph", text: "Un tube PVC se fabrique en fondant les granulés de compound dans une extrudeuse, en donnant à la matière fondue sa forme de tube dans la filière, puis en la refroidissant, la calibrant, la mesurant et l’enroulant. Sur les lignes FOREACH, toutes les étapes ci-dessous se déroulent en salle propre :" },
      { type: "list", ordered: true, items: [
        "Préparation de la matière : les granulés sont séchés si la matière l’exige, puis acheminés en circuit fermé par un chargeur sous vide jusqu’à la trémie de l’extrudeuse, sans la poussière d’un chargement manuel en sacs ouverts.",
        "Extrusion : la vis fond et homogénéise le compound, et la matière fondue prend la forme d’un tube dans la filière. Les températures et la vitesse de vis sont réglées au pupitre, et les données clés du procédé sont enregistrées dans le MES.",
        "Refroidissement et calibrage : le tube entre dans un bac de calibrage refroidi à l’eau, où ses DI et DE définitifs sont fixés.",
        "Mesure en ligne : le tube fini traverse en continu le mesureur de diamètre, qui mesure le DE et l’ovalisation en temps réel et déclenche une alarme hors limites.",
        "Tirage, enroulage et contrôle : le tube est enroulé ou coupé à longueur, contrôlé hors ligne (DI, épaisseur de paroi, aspect), puis emballé.",
      ] },
      { type: "figure", ...photos.resin, caption: "Sécheurs et chargeurs sous vide en salle propre : les granulés sont acheminés vers l’extrudeuse par des conduites fermées." },
      { type: "figure", ...photos.die, caption: "Filière et entrée de calibrage : le tube sort de la filière et entre directement dans le bain de refroidissement." },
      { type: "figure", ...photos.tank, caption: "Bac de refroidissement et de calibrage en salle propre ; le tube y refroidit avant la mesure et le tirage." },
    ] },
    { title: "Certifications et documentation : SMQ, rapports de conformité et traçabilité des lots", tocLabel: "Certifications", blocks: [
      { type: "paragraph", text: "Quand un fournisseur annonce un tube « certifié », demandez ce qui a été certifié exactement. Un certificat de système de management de la qualité montre que les processus de l’entreprise sont maîtrisés ; un rapport de conformité montre que les substances restreintes du matériau sont sous les limites réglementaires ; les enregistrements de lot permettent de remonter d’un problème à sa cause. L’un ne remplace pas les autres." },
      { type: "table", headers: ["Niveau", "Ce qu’il prouve", "Disponible chez FOREACH"], rows: [
        ["Système de management de la qualité", "Conception, achats, production, contrôle et livraison sont maîtrisés", "Certification ISO 9001 et ISO 13485"],
        ["Conformité matière", "Les substances restreintes sont sous les limites réglementaires", "Rapports RoHS et autres rapports de conformité par référence"],
        ["Données de biocompatibilité", "Le compound ou le tube fini a passé des essais USP Classe VI, ISO 10993 ou équivalents", "À confirmer par projet sur demande"],
        ["Traçabilité des lots", "Lot de résine, paramètres de procédé et résultats de contrôle retrouvables", "Données clés de matière, de procédé et de contrôle enregistrées dans le PDM, l’ERP et le MES"],
      ] },
      { type: "paragraph", text: "L’ISO 13485 est la norme de management de la qualité du secteur des dispositifs médicaux. Elle certifie le système du fournisseur — la façon dont conception, achats, production et modifications sont gérés — et non un tube en particulier. Elle ne fait pas du tube un dispositif médical et ne remplace pas les essais de biocompatibilité." },
      { type: "links", items: [
        { label: "Système qualité FOREACH", href: "/fr/about/quality/" },
      ] },
    ] },
    { title: "7 questions à poser à un fournisseur de tubes PVC de qualité médicale", tocLabel: "Questions fournisseur", blocks: [
      { type: "paragraph", text: "Joignez ces questions à votre demande de prix. Plus les réponses sont précises, plus la qualification est courte." },
      { type: "list", ordered: true, items: [
        "Le compound est-il vierge ? Serons-nous prévenus avant tout changement de formulation ou de fournisseur de résine ?",
        "Quel plastifiant utilisez-vous ? Pouvez-vous fournir des rapports d’essai sur les substances restreintes, et votre rapport RoHS couvre-t-il le DEHP, le BBP, le DBP et le DIBP ?",
        "Quelles sont les tolérances de DI, de DE et d’épaisseur de paroi ? Le DE est-il mesuré en ligne, et comment le DI et la paroi sont-ils échantillonnés ?",
        "Où le tube est-il extrudé, coupé et emballé ? Quelle est la classe de la salle propre, et fait-elle l’objet d’une surveillance ?",
        "Quels certificats de système qualité détenez-vous ? Existe-t-il des données USP Classe VI ou ISO 10993 pour le compound ou le tube fini ?",
        "Chaque livraison peut-elle être rattachée au lot de résine, à la date de production et aux enregistrements de contrôle ?",
        "Pouvez-vous fournir des échantillons pour des essais avec nos fluides, températures et raccords réels ?",
      ] },
      { type: "paragraph", text: "Vous pouvez poser toutes ces questions directement à FOREACH ; nos ingénieurs confirmeront les documents disponibles pour chaque référence." },
    ] },
    { title: "Tubes PVC FOREACH : dimensions et options sur mesure", tocLabel: "Dimensions FOREACH", blocks: [
      { type: "paragraph", text: "Les tubes PVC FOREACH existent en dureté 55A et 65A. Vous pouvez les acheter en couronne, coupés à longueur selon votre plan ou sous forme d’ensembles tube et raccords. Le tableau résume les dimensions actuellement disponibles." },
      { type: "table", headers: ["Dureté", "Références", "Plage de DI (mm)", "Plage de DE (mm)"], rows: medicalPvcTubingSizeRows },
      { type: "paragraph", text: "Pour une commande ou une nomenclature, conservez la référence complète, la dureté, DI × DE et l’unité d’emballage. Pour des longueurs coupées, des ensembles ou des dimensions spéciales, envoyez aussi le fluide, la température, la pression ou le vide, le cheminement et les plans des raccords, afin que nous confirmions faisabilité, minimum de commande et délai." },
      { type: "links", items: [
        { label: "Voir les spécifications complètes des tubes PVC", href: "/products/tubing/pvc-tubing/" },
        { label: "Raccords rapides", href: "/products/fittings/quick-connect-fittings/" },
        { label: "Raccords cannelés", href: "/products/fittings/barbed-fittings/" },
      ] },
    ] },
    { title: "Découvrir d’autres tubes pour instruments", tocLabel: "Tubes associés", blocks: [
      { type: "links", items: [
        { label: "Tubes PVC : dureté, cheminement et raccords pour tubes souples", href: "/resources/technical-articles/what-is-pvc-tubing/" },
        { label: "Tubes PTFE : matériau, résistance hydraulique et raccords", href: "/resources/technical-articles/what-is-ptfe-tubing/" },
        { label: "Tubes FEP : transparence et raccordements à collet", href: "/resources/technical-articles/what-is-fep-tubing/" },
        { label: "Tubes PFA : réactifs et maîtrise de la propreté", href: "/resources/technical-articles/what-is-pfa-tubing/" },
      ] },
    ] },
  ],
  faqTitle: "Questions fréquentes sur les tubes PVC de qualité médicale",
  faqItems: [
    { question: "Pourquoi un tube PVC de qualité médicale coûte-t-il plus cher qu’un tuyau vinyle de quincaillerie ?", answer: "L’écart vient de l’ensemble du système de production et de qualité : compound vierge et système plastifiant déclaré, coût de fonctionnement d’une salle propre, mesure en ligne et contrôles hors ligne avec les rebuts qu’ils écartent, enregistrements de lot et rapports de conformité pour chaque livraison. Changer seulement de plastifiant pèse généralement assez peu. Un tuyau courant convient au jardin ou à l’évacuation ; dans le circuit fluidique d’un instrument, les reprises et arrêts dus à une dérive dimensionnelle ou à des débris coûtent en général bien plus que la différence de prix." },
    { question: "Un tube fabriqué en salle propre ISO 8 est-il stérile ?", answer: "Non. La salle propre maîtrise la contamination particulaire et microbienne pendant la production ; le tube n’est pas stérilisé avant expédition. Si la ligne doit être stérile, le fabricant de l’appareil ou de l’ensemble la stérilise et valide le procédé, avec une méthode adaptée au compound PVC concerné." },
    { question: "Le tube PVC absorbe-t-il des médicaments ou des réactifs ?", answer: "Certaines substances, oui. Des médicaments lipophiles comme la nitroglycérine et le diazépam sont absorbés par le PVC plastifié, et des protéines comme l’insuline s’adsorbent sur la paroi intérieure de nombreux matériaux de tube. Pour les réactifs, échantillons ou étalons sensibles à la concentration, comparez la concentration avant et après la ligne avec votre fluide réel, et réduisez la longueur mouillée ou passez au PTFE ou au FEP si nécessaire." },
    { question: "Qu’implique RoHS pour les tubes PVC des instruments vendus dans l’UE ?", answer: "La directive (UE) 2015/863 (RoHS 3) limite le DEHP, le BBP, le DBP et le DIBP à 0.1 % chacun en masse dans les matériaux homogènes, et la restriction s’applique aux dispositifs médicaux (y compris de DIV) et aux instruments de contrôle et de surveillance depuis le 22 juillet 2021. Vérifiez que le rapport RoHS du tube couvre les quatre phtalates, et précisez dans votre demande toute exigence REACH ou autre." },
    { question: "FOREACH peut-il couper le tube PVC à longueur ou fournir des ensembles ?", answer: "Oui. Le tube est disponible en couronne, coupé à longueur selon votre plan, ou en ensembles avec raccords cannelés ou rapides. Indiquez la longueur, le DI/DE, la dureté, les raccords d’extrémité et les conditions d’utilisation : nos ingénieurs confirmeront faisabilité, minimum de commande et délai." },
  ],
  cta: {
    title: "Demander des échantillons et la documentation des tubes PVC",
    description: "Indiquez-nous l’application, le fluide, le DI/DE, la dureté, la longueur et les documents nécessaires — rapports RoHS, enregistrements de lot, etc. — et les ingénieurs FOREACH vous aideront à confirmer la spécification et à préparer des échantillons d’essai.",
    contactLabel: "Contacter un ingénieur",
    productsLabel: "Voir les spécifications PVC",
    productsHref: "/products/tubing/pvc-tubing/",
  },
};
