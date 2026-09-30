import type { DiaphragmPumpEngineeringArticleCopy } from "../diaphragm-pump-engineering-article.types";
import {
  getValvelessMeteringPumpOverviewArticleHref,
  getValvelessMeteringPumpOverviewProductHref,
  valvelessMeteringPumpOverviewCoverImage,
} from "./shared";

const locale = "fr" as const;
const productHref = (slug?: string) =>
  getValvelessMeteringPumpOverviewProductHref(locale, slug);
const articleHref = (slug: string) =>
  getValvelessMeteringPumpOverviewArticleHref(locale, slug);

export const valvelessMeteringPumpOverviewFr = {
  metadata: {
    title: "Qu’est-ce qu’une pompe doseuse sans clapet ? Principe, applications et sélection",
    seoTitle: "Qu’est-ce qu’une pompe doseuse sans clapet ? | FOREACH",
    seoDescription:
      "Découvrez le fonctionnement d’une pompe doseuse sans clapet, le calcul de la cylindrée et du débit, ses applications et la sélection d’une pompe RPL ou DRPL.",
    coverImage: valvelessMeteringPumpOverviewCoverImage,
    coverAlt: "Pompes doseuses sans clapet à piston céramique FOREACH RPL et DRPL",
  },
  deck:
    "Une pompe doseuse sans clapet est une pompe volumétrique qui combine la rotation et le mouvement alternatif axial d’un piston afin de commuter le trajet du fluide, d’aspirer puis de refouler le liquide. Son mécanisme de pompage ne repose pas sur des clapets anti-retour classiques à l’aspiration et au refoulement. Elle peut servir au dosage de réactifs, au titrage, au remplissage et à la distribution proportionnelle de deux liquides, mais ses performances doivent être vérifiées avec le fluide, la pression, la tuyauterie, l’entraînement et le nettoyage réels.",
  leadBlocks: [
    {
      type: "paragraph",
      text:
        "Une pompe doseuse sans clapet est une pompe volumétrique qui combine la rotation et le mouvement alternatif axial d’un piston afin de commuter le trajet du fluide, d’aspirer puis de refouler le liquide. Son mécanisme de pompage ne repose pas sur des clapets anti-retour classiques à l’aspiration et au refoulement. Elle peut servir au dosage de réactifs, au titrage, au remplissage et à la distribution proportionnelle de deux liquides, mais ses performances doivent être vérifiées avec le fluide, la pression, la tuyauterie, l’entraînement et le nettoyage réels.",
    },
    {
      type: "notice",
      label: "Limite importante :",
      text:
        "sans clapet décrit le mécanisme de pompage. Cela ne signifie pas que l’instrument complet ne puisse jamais nécessiter une vanne de commutation, une vanne d’isolement ou un autre composant de commande fluidique.",
    },
  ],
  sections: [
    {
      title: "Comment fonctionne une pompe doseuse sans clapet ?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Le piston céramique tourne tout en se déplaçant axialement. La rotation aligne alternativement la chambre de dosage avec l’entrée et la sortie, tandis que le déplacement axial modifie le volume de la chambre. Lorsque les deux mouvements conservent la relation de phase requise, la pompe répète un cycle d’aspiration et de refoulement.",
        },
        {
          type: "figure",
          src:
            "/images/resources/technical-articles/what-is-a-valveless-metering-pump/valveless-metering-pump-working-cycle-fr.webp",
          alt: "Cycle en quatre étapes d’aspiration et de refoulement d’une pompe doseuse sans clapet",
          width: 1390,
          height: 646,
          caption:
            "Cycle de fonctionnement d’une pompe doseuse sans clapet : la rotation du piston commute l’aspiration et le refoulement, tandis que son mouvement axial alternatif aspire puis refoule le liquide.",
        },
        {
          type: "table",
          headers: ["Étape", "État du piston et des orifices", "Action du fluide"],
          rows: [
            ["Préparation de l’aspiration", "La chambre tourne vers l’entrée et le piston commence à reculer", "L’entrée communique avec la chambre"],
            ["Aspiration", "Le piston continue de reculer et le volume de la chambre augmente", "Le liquide pénètre dans la chambre"],
            ["Commutation du trajet", "Le piston fait tourner la chambre de l’entrée vers la sortie", "L’entrée se ferme et la sortie se prépare à s’ouvrir"],
            ["Refoulement", "Le piston avance et le volume de la chambre diminue", "Le liquide sort par l’orifice de refoulement"],
          ],
        },
        {
          type: "paragraph",
          text:
            "La géométrie des orifices, la phase des mouvements et le réglage de la cylindrée dépendent de la conception de la tête de pompe. Ce cycle explique le principe, mais la fiche du modèle et l’essai du système restent les références de sélection.",
        },
      ],
    },
    {
      title: "Cylindrée par tour, volume dosé et débit moyen",
      blocks: [
        {
          type: "paragraph",
          text:
            "La cylindrée d’une pompe doseuse sans clapet est généralement exprimée en μL/tr : le volume nominal délivré pendant un tour complet au réglage actuel. Le volume dosé dépend aussi du nombre de tours, tandis que le débit moyen dépend également de la vitesse de rotation. Il s’agit de trois grandeurs distinctes.",
        },
        {
          type: "formula",
          expression: "Volume dosé = cylindrée par tour × nombre de tours",
          note: "Conservez des unités de volume cohérentes. Il s’agit d’une estimation nominale pour des cycles complets.",
        },
        {
          type: "formula",
          expression: "Débit moyen = cylindrée par tour × vitesse de rotation",
          note: "Avec des μL/tr et des tr/min, le résultat est exprimé en μL/min.",
        },
        {
          type: "figure",
          src:
            "/images/resources/technical-articles/what-is-a-valveless-metering-pump/rpl-manual-flow-adjustment.webp",
          alt: "Bouton de réglage manuel du débit d’une pompe doseuse sans clapet FOREACH RPL",
          width: 1200,
          height: 1200,
          caption:
            "Réglage manuel du débit sur une pompe RPL : la rotation du bouton modifie le réglage mécanique de la cylindrée.",
        },
        {
          type: "notice",
          text:
            "La limite basse de la plage de cylindrée ne correspond pas au plus petit dosage fiable. Les faibles volumes dépendent aussi du positionnement de l’entraînement, du jeu mécanique, du fluide, des bulles, de la compliance des tubes, du liquide retenu à l’extrémité de l’aiguille et de la méthode de mesure. Validez l’exactitude et la répétabilité dans les conditions visées.",
        },
      ],
    },
    {
      title: "Avantages et limites du mécanisme sans clapet",
      blocks: [
        {
          type: "table",
          headers: ["Point technique", "Valeur potentielle", "Limite à vérifier"],
          rows: [
            ["Aucun clapet anti-retour classique dans le mécanisme de pompage", "Réduit la dépendance à l’assise et au mouvement des clapets à chaque cycle", "Les particules, la cristallisation et les dépôts peuvent encore affecter les ajustements céramiques et les orifices"],
            ["Mouvements rotatif et alternatif couplés", "Réunit la commutation du trajet et le déplacement positif dans une tête", "Nécessite un positionnement, une phase et des cycles complets corrects"],
            ["Ensemble piston céramique", "Favorise un dosage répétable avec des matériaux mouillés choisis pour le fluide", "La compatibilité dépend de la concentration, de la température, du temps de contact et du liquide de nettoyage"],
            ["Réglage mécanique de la cylindrée et de la vitesse", "Permet d’adapter le volume dosé et la durée du procédé", "Les réglages doivent être étalonnés par méthode gravimétrique ou volumétrique dans le circuit réel"],
          ],
        },
        {
          type: "paragraph",
          text:
            "Sans clapet ne signifie pas automatiquement sans pulsation, compatible avec le fonctionnement à sec, impossible à colmater ou adapté à toute viscosité et toute contre-pression. Une alimentation insuffisante, des bulles, une résistance en sortie, des dépôts ou un nettoyage inadapté peuvent toujours modifier la stabilité du dosage et la durée de vie.",
        },
      ],
    },
    {
      title: "Où utilise-t-on les pompes doseuses sans clapet ?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Les tâches courantes comprennent la distribution de réactifs, l’ajout de titrant, l’ajout de solutions d’étalonnage ou de tampons, le remplissage quantitatif et la distribution proportionnelle de deux liquides. Ces appellations décrivent la tâche dans l’instrument ; elles ne signifient pas que tout instrument réalisant cette tâche doive utiliser une pompe sans clapet.",
        },
        {
          type: "table",
          headers: ["Série FOREACH", "Configuration présentée", "Tâche typique"],
          rows: [
            ["RPL-P4", "12–80 μL/tr, une tête", "Ajout de petits volumes de réactif, titrage et distributions répétées"],
            ["RPL-P6.35", "50–300 μL/tr, une tête", "Distribution de réactifs, titrage et remplissage quantitatif"],
            ["RPL-P15", "300–1200 μL/tr, une tête", "Ajouts de plus grand volume, ajout de tampon et transfert dosé"],
            ["DRPL-0109", "Deux têtes, 1:9 ; 100 μL + 900 μL", "Distribution proportionnelle de concentré et de diluant"],
            ["DRPL-0119", "Deux têtes, 1:19 ; 60 μL + 1140 μL", "Distribution de deux liquides avec un rapport de dilution plus élevé"],
          ],
        },
        {
          type: "notice",
          text:
            "Une pompe DRPL dose deux flux liquides. L’homogénéité finale du mélange dépend également de la jonction, du mélangeur, du volume en aval et de la séquence de commande.",
        },
      ],
    },
    {
      title: "Comment sélectionner une pompe doseuse sans clapet",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Définissez d’abord la tâche : dosage ponctuel, titrage, remplissage, alimentation continue ou distribution proportionnelle de deux liquides.",
            "Fixez le volume cible, le temps disponible, le nombre de cycles quotidiens et l’erreur acceptable, puis calculez la cylindrée, le nombre de tours et la vitesse nécessaires.",
            "Notez l’identité et la concentration du fluide, sa viscosité, le risque de particules ou de cristallisation, la température de travail, le liquide de nettoyage et la durée d’arrêt.",
            "Notez le niveau du réservoir, la hauteur d’aspiration, la longueur et le diamètre intérieur des tubes ainsi que les restrictions en sortie dues aux filtres, aiguilles, mélangeurs et autres composants.",
            "Confirmez les matériaux mouillés, les ports de travail et de lavage, le montage, le moteur et le mode de commande, en distinguant la configuration présentée des options propres au projet.",
            "Mesurez le volume dosé, la répétabilité, le temps, les bulles, les fuites et la récupération après nettoyage dans le circuit réel avant de figer les paramètres de production.",
          ],
        },
      ],
    },
    {
      title: "Contrôles d’installation, de mise en service et de maintenance",
      blocks: [
        {
          type: "figure",
          src:
            "/images/resources/technical-articles/what-is-a-valveless-metering-pump/valveless-metering-pump-installation-orientation.png",
          alt: "Orientations d’installation autorisées et interdites de la pompe doseuse sans clapet FOREACH",
          width: 2113,
          height: 1024,
          caption:
            "Orientations d’installation de la pompe doseuse sans clapet : utilisez les positions signalées par une coche verte et évitez celle signalée par une croix rouge. Respectez les instructions d’installation propres au modèle.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Éliminez l’air du tube d’entrée et de la chambre avant d’évaluer l’exactitude, afin de ne pas confondre le volume des bulles avec une erreur de la pompe.",
            "Maintenez une alimentation stable et évitez une hauteur d’aspiration excessive, des tubes longs et étroits ou un filtre colmaté qui créent une perte de charge excessive à l’entrée.",
            "N’interprétez pas une valeur de tenue en pression comme la contre-pression de fonctionnement continu autorisée ; utilisez la définition de la fiche technique et un essai du circuit réel.",
            "Pour les fluides qui cristallisent, se déposent ou changent fréquemment, définissez le rinçage à l’arrêt, la compatibilité du liquide de nettoyage et la gestion des déchets.",
            "Consignez le fluide, la température, le réglage de cylindrée, la vitesse, la contre-pression, le nombre de cycles et la méthode de mesure afin que le résultat soit reproductible.",
          ],
        },
      ],
    },
    {
      title: "Produits et informations complémentaires pour la sélection",
      blocks: [
        {
          type: "links",
          ordered: true,
          items: [
            { href: productHref(), label: "Voir les pompes doseuses sans clapet" },
            { href: articleHref("rpl-valveless-metering-pump-selection-guide"), label: "Consulter le guide de sélection RPL à une tête" },
          ],
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes sur les pompes doseuses sans clapet",
  faqItems: [
    {
      question: "Quelle différence existe-t-il entre une pompe doseuse sans clapet et une autre pompe doseuse ?",
      answer:
        "La principale différence tient au mécanisme de pompage et de commutation. Une pompe sans clapet utilise la rotation et le mouvement alternatif du piston pour alterner entre l’entrée et la sortie tout en modifiant le volume de la chambre, sans clapets anti-retour classiques. D’autres pompes peuvent utiliser des clapets, des membranes ou d’autres mécanismes. Le choix final dépend toujours du volume, de la pression, du fluide et de la commande.",
    },
    {
      question: "Une cylindrée plus faible par tour signifie-t-elle toujours un dosage minimal plus petit ?",
      answer:
        "Non. La cylindrée par tour est la sortie nominale d’un cycle complet. Le plus petit dosage fiable dépend également du positionnement du moteur, du jeu, du fluide, des tubes, des bulles, de l’extrémité de l’aiguille et de la méthode de mesure. Confirmez-le par des essais répétés dans les conditions visées.",
    },
    {
      question: "Sans clapet signifie-t-il que l’instrument complet n’a jamais besoin de vanne ?",
      answer:
        "Non. Sans clapet décrit le mécanisme de pompage. Le système complet peut encore nécessiter des vannes de commutation, d’isolement, de contrôle du reflux ou de sécurité selon les fonctions d’alimentation, de nettoyage, de retour et de protection.",
    },
    {
      question: "Quelle est la différence entre RPL et DRPL ?",
      answer:
        "RPL est une pompe doseuse sans clapet à une tête pour un seul trajet de fluide dosé. DRPL est une configuration à deux têtes qui distribue deux liquides selon un rapport volumique défini. Le dosage des deux flux et leur mélange en aval sont deux fonctions distinctes qui doivent être validées séparément.",
    },
  ],
  cta: {
    title: "Vous devez étudier une application réelle de pompe sans clapet ?",
    description:
      "Communiquez à FOREACH le volume ou le débit moyen cible, le temps disponible, le fluide, les conditions d’entrée et de sortie, les interfaces et le mode de commande afin d’examiner une configuration RPL ou DRPL et ses conditions de validation.",
    contactLabel: "Étudier l’application",
    productsLabel: "Voir les pompes doseuses sans clapet",
    productsHref: productHref(),
  },
} satisfies DiaphragmPumpEngineeringArticleCopy;
