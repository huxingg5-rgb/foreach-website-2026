import type { DiaphragmPumpEngineeringArticleCopy } from "../diaphragm-pump-engineering-article.types";
import {
  getMeteringPumpAccuracyRepeatabilityArticleHref,
  getMeteringPumpAccuracyRepeatabilityProductHref,
  meteringPumpAccuracyRepeatabilityCoverImage,
} from "./shared";

const locale = "fr" as const;
const articleHref = (slug: string) =>
  getMeteringPumpAccuracyRepeatabilityArticleHref(locale, slug);
const productHref = getMeteringPumpAccuracyRepeatabilityProductHref(locale);

export const meteringPumpAccuracyRepeatabilityFr = {
  metadata: {
    title:
      "Dosage imprécis ou peu répétable ? Causes et diagnostic d’une pompe doseuse",
    seoTitle: "Exactitude et répétabilité des pompes doseuses | FOREACH",
    seoDescription:
      "Diagnostiquez les erreurs de dosage et le manque de répétabilité en contrôlant bulles, alimentation, fluide, tuyaux, aiguille et commande moteur.",
    coverImage: meteringPumpAccuracyRepeatabilityCoverImage,
    coverAlt: "pompe doseuse sans clapet FOREACH RPL-P4",
  },
  deck: "Si le même programme produit encore des volumes instables, commencez par classer la forme de l’erreur, puis contrôlez les bulles, l’alimentation amont, le fluide, les tuyaux, la sortie et les paramètres moteur. Cette méthode permet un premier diagnostic directement exploitable.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Conclusion : si les dosages successifs sont proches les uns des autres mais restent décalés par rapport à la cible, il s’agit généralement d’un problème d’exactitude ou d’un biais systématique ; contrôlez d’abord l’étalonnage, le calcul du déplacement et le point de fonctionnement réel. Si les résultats varient fortement avec le même programme, il s’agit généralement d’un problème de répétabilité ; contrôlez d’abord les bulles, l’alimentation amont, la compliance du tuyau, l’aiguille et la régularité de l’entraînement. Si le résultat dérive avec le temps, vérifiez la température, la viscosité, la cristallisation, la contamination et l’usure. Le déplacement par tour ne définit pas directement le volume minimal fiable ; les performances finales doivent être validées avec le fluide cible et le circuit complet.",
    },
  ],
  sections: [
    {
      title: "Identifiez le problème à partir du comportement du dosage",
      blocks: [
        {
          type: "table",
          headers: [
            "Comportement observé",
            "À contrôler en priorité",
            "Première action",
          ],
          rows: [
            [
              "Tous les dosages sont trop élevés ou trop faibles, avec peu de dispersion",
              "Point de fonctionnement, étalonnage, valeur cible ou conversion gravimétrique",
              "Repesez le fluide cible et vérifiez le déplacement, le nombre de tours et la densité",
            ],
            [
              "Les résultats varient fortement avec le même programme",
              "Bulles, alimentation insuffisante, compliance du tuyau ou liquide retenu sur l’aiguille",
              "Réamorcez et observez l’entrée, la tête de pompe et la pointe",
            ],
            [
              "Les premiers dosages sont incorrects puis se stabilisent",
              "La tête de pompe ou le tuyau n’est pas complètement rempli",
              "Ajoutez des cycles d’amorçage et commencez les mesures après stabilisation",
            ],
            [
              "Le résultat dérive après un certain temps de fonctionnement",
              "Température, viscosité, cristallisation, contamination ou usure",
              "Stabilisez la température et comparez les résultats avant et après nettoyage",
            ],
            [
              "Absence de débit occasionnelle, goutte suspendue ou projections",
              "Obstruction amont, bulles, diamètre d’aiguille ou rampes moteur",
              "Contrôlez les filtres, raccords, aiguille et rampes d’accélération",
            ],
          ],
        },
      ],
    },
    {
      title: "Contrôlez le circuit et la commande dans cet ordre",
      blocks: [
        {
          type: "table",
          headers: ["Élément", "Comment le vérifier", "Action corrective"],
          rows: [
            [
              "Tête de pompe et bulles",
              "Amorcez lentement et observez les bulles qui restent, se compriment ou se déplacent dans les deux sens dans la tête ou le tuyau d’entrée",
              "Réamorcez et purgez, puis vérifiez que les raccords n’aspirent plus d’air",
            ],
            [
              "Alimentation amont",
              "Réduisez temporairement la hauteur d’aspiration ou raccourcissez le tuyau d’entrée, puis répétez l’essai",
              "Réduisez l’aspiration, raccourcissez le tuyau et contrôlez la résistance du filtre",
            ],
            [
              "Fluide et température",
              "Exécutez le même programme avec le fluide cible et un fluide de référence, puis comparez après changement de fluide ou de température",
              "Stabilisez le fluide et la température, puis réétalonnez et testez avec le fluide cible",
            ],
            [
              "Sortie et aiguille",
              "Recherchez les gouttes suspendues, le liquide résiduel ou les projections et vérifiez que chaque goutte entre dans le récipient",
              "Nettoyez ou remplacez l’aiguille et fixez sa position, les conditions de sortie et les paramètres marche-arrêt",
            ],
            [
              "Compliance du tuyau et raccords",
              "Conservez les mêmes réglages de pompe et comparez après installation d’un tuyau plus court ou moins déformable",
              "Utilisez un tuyau plus court, de diamètre intérieur adapté et avec des raccordements fiables",
            ],
            [
              "Moteur et programme",
              "Vérifiez que le nombre de tours, la vitesse, la phase marche-arrêt et les rampes sont identiques à chaque cycle",
              "Fixez le cycle complet et les paramètres d’entraînement avant toute comparaison",
            ],
          ],
        },
      ],
    },
    {
      title: "Effectuez un contrôle rapide en 10 dosages",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Nettoyez et amorcez complètement la tête de pompe et les tuyaux en éliminant les bulles visibles.",
            "Maintenez constants le fluide, la température, le niveau du réservoir, les tuyaux, le filtre, l’aiguille et la position de sortie.",
            "Notez le modèle de pompe, le réglage du déplacement, le nombre de tours, la vitesse et les rampes.",
            "Réalisez 10 dosages consécutifs avec le même programme et pesez chaque dosage séparément, pas seulement le total.",
            "Convertissez la masse en volume avec la densité du fluide cible, calculez la moyenne et comparez-la à la cible.",
            "Calculez l’écart-type d’échantillon ou le RSD pour évaluer le regroupement des résultats.",
            "Ne modifiez qu’une condition avant de répéter l’essai afin de préserver l’identification de la cause.",
          ],
        },
        {
          type: "formula",
          expression:
            "Écart moyen par rapport à la cible (%) = (volume moyen mesuré − volume cible) ÷ volume cible × 100 %",
          note: "Une valeur positive indique une moyenne supérieure à la cible et une valeur négative, une moyenne inférieure. Un décalage persistant oriente d’abord vers l’étalonnage, le point de fonctionnement et la conversion.",
        },
        {
          type: "formula",
          expression:
            "Volume mesuré = masse nette du liquide ÷ densité du fluide cible",
          note: "Utilisez des unités cohérentes. Pour les petits volumes, vérifiez que la résolution de la balance, l’évaporation et le temps de pesée permettent une conclusion valable.",
        },
        {
          type: "formula",
          expression:
            "RSD (%) = écart-type d’échantillon ÷ volume moyen mesuré × 100 %",
          note: "Un RSD élevé oriente d’abord vers les bulles, l’alimentation, les tuyaux, la sortie et la régularité de l’entraînement.",
        },
        {
          type: "table",
          headers: [
            "Résultat des 10 cycles",
            "Orientation prioritaire",
            "Étape suivante",
          ],
          rows: [
            [
              "Résultats regroupés, mais moyenne toujours haute ou basse",
              "Étalonnage, conversion du déplacement, densité ou contre-pression",
              "Réétalonnez avec le fluide cible et vérifiez le point de fonctionnement",
            ],
            [
              "Moyenne proche de la cible, mais résultats individuels dispersés",
              "Bulles, alimentation, compliance du tuyau ou entraînement",
              "Purgez puis stabilisez séparément les conditions du circuit et de la commande",
            ],
            [
              "Premiers résultats décalés, puis stabilisation",
              "Amorçage insuffisant ou chambre incomplètement remplie",
              "Ajoutez des cycles d’amorçage et de rejet",
            ],
            [
              "Résultat qui évolue progressivement avec le temps",
              "Température, viscosité, cristallisation, contamination ou usure",
              "Stabilisez la température et comparez avant et après nettoyage",
            ],
            [
              "Résultat modifié après remplacement de l’aiguille ou du tuyau",
              "Variation de la résistance de sortie ou du volume du circuit",
              "Revalidez avec le nouveau circuit",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Dix mesures conviennent à un premier diagnostic sur site, mais ne remplacent pas une validation formelle. Définissez le nombre d’échantillons, l’écart admissible et les instruments selon les exigences du projet.",
        },
      ],
    },
    {
      title: "Recontrôlez après chacune de ces modifications",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Changement de fluide, de concentration, de lot ou de température de travail ;",
            "Changement de tuyau, de filtre, de raccord, d’aiguille ou de buse ;",
            "Changement de hauteur du réservoir, d’aspiration, de contre-pression ou de position de sortie ;",
            "Changement de déplacement, de tours, de vitesse, de rampes ou du programme marche-arrêt ;",
            "Nettoyage de la tête, remplacement de pièces mouillées ou élimination de dépôts cristallisés ;",
            "Décalage de la moyenne, augmentation de la dispersion ou dérive dans le temps.",
          ],
        },
        {
          type: "paragraph",
          text: "Pour une sélection ou un diagnostic, indiquez le volume ou le débit cible, le temps de cycle, le fluide et sa température, le niveau d’entrée, les dimensions des tuyaux, la contre-pression, l’aiguille et le mode d’entraînement. Ces informations définissent mieux le point de fonctionnement réel qu’un simple pourcentage d’exactitude.",
        },
      ],
    },
    {
      title: "Utilisez le déplacement RPL uniquement pour la présélection",
      blocks: [
        {
          type: "paragraph",
          text: "Le déplacement par tour des RPL permet de délimiter une plage nominale. Le dosage réel doit encore être testé avec le nombre de tours, le temps de cycle, le fluide et le circuit complet.",
        },
        {
          type: "table",
          headers: [
            "Modèle",
            "Déplacement par tour",
            "Tâches à évaluer en priorité",
          ],
          rows: [
            [
              "RPL-P4",
              "12–80 μL/rev",
              "Dosage de petits volumes, ajout de titrant et distributions répétées",
            ],
            [
              "RPL-P6.35",
              "50–300 μL/rev",
              "Distribution de réactif, ajout de titrant et remplissage volumétrique",
            ],
            [
              "RPL-P15",
              "300–1200 μL/rev",
              "Remplissage de plus grands volumes, ajout de tampon et transfert quantitatif",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "La limite basse par tour n’est pas le volume minimal fiable. Après le choix du modèle, validez-le avec le fluide, les tuyaux, la contre-pression, l’aiguille et le programme de commande réels.",
        },
      ],
    },
    {
      title: "Pages associées",
      blocks: [
        {
          type: "links",
          ordered: true,
          items: [
            {
              href: articleHref("what-is-a-valveless-metering-pump"),
              label:
                "Qu’est-ce qu’une pompe doseuse sans clapet ? Principe, applications et sélection",
            },
            {
              href: articleHref("rpl-valveless-metering-pump-selection-guide"),
              label:
                "Guide de sélection de la pompe doseuse sans clapet RPL à une tête",
            },
            {
              href: productHref,
              label: "Voir les pompes doseuses sans clapet RPL et DRPL",
            },
          ],
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes sur le diagnostic du dosage",
  faqItems: [
    {
      question:
        "Les résultats sont proches mais restent toujours inférieurs à la cible. Que faut-il contrôler ?",
      answer:
        "Les résultats sont regroupés mais le point de fonctionnement présente un biais persistant. Avec le fluide cible, vérifiez le déplacement, le nombre de tours, la conversion de densité, la contre-pression et l’étalonnage.",
    },
    {
      question:
        "Pourquoi le volume change-t-il après un changement de fluide ?",
      answer:
        "La viscosité, la densité, la tension superficielle et la volatilité modifient le remplissage de la tête, la résistance des tuyaux et le détachement de la goutte. Après un changement de fluide, réamorcez et refaites un contrôle gravimétrique.",
    },
    {
      question:
        "La limite basse par tour correspond-elle au volume minimal fiable ?",
      answer:
        "Non. Le positionnement de l’entraînement, le cycle complet, les bulles, les tuyaux, l’aiguille et la méthode de mesure interviennent également. La valeur doit être validée dans le circuit cible.",
    },
  ],
  cta: {
    title:
      "Besoin de diagnostiquer un dosage ou de sélectionner un modèle RPL ?",
    description:
      "Communiquez à FOREACH le volume ou débit cible, le temps de cycle, le fluide, les tuyaux, la contre-pression, l’aiguille et l’entraînement afin d’examiner le point de fonctionnement et les conditions de validation.",
    contactLabel: "Discuter de la sélection technique",
    productsLabel: "Voir les pompes doseuses sans clapet",
    productsHref: productHref,
  },
} satisfies DiaphragmPumpEngineeringArticleCopy;
