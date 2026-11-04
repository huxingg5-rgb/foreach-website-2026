import type { DiaphragmPumpEngineeringArticleCopy } from "../../diaphragm-pump-engineering-article.types";
import { dpgl800Card, dpgl800CurveImage, dpl30Card, dpl30CurveImage, imageBase, principleDiagram } from "./shared";

// French localization of what-is-a-diaphragm-pump.zh.ts. Product and category names follow the
// miniature diaphragm pump product pages; third-party photos keep their CC BY-SA attribution.
export const copy = {
  "metadata": {
    "title": "Qu’est-ce qu’une pompe à membrane ? Principe de fonctionnement, types, avantages, limites et choix",
    "seoTitle": "Qu’est-ce qu’une pompe à membrane ? Principe, types et choix | FOREACH",
    "seoDescription": "Fonctionnement d’une pompe à membrane, différences entre pompes AODD, électriques, doseuses, à vide et miniatures, avantages, limites, applications et critères de choix.",
    "coverImage": dpl30Card,
    "coverAlt": "Pompe à membrane miniature pour liquides FOREACH DPL30"
  },
  "deck": "Une pompe à membrane est une pompe volumétrique qui déplace un liquide ou un gaz grâce à une membrane souple animée d’un mouvement alternatif et à des clapets anti-retour d’aspiration et de refoulement. Ce guide présente son fonctionnement, les principaux types, ses avantages et ses limites, ses applications et les critères de choix.",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "Une pompe à membrane est une pompe volumétrique. Une membrane souple effectue un mouvement de va-et-vient et, avec deux clapets anti-retour placés à l’entrée et à la sortie, aspire le liquide ou le gaz par l’entrée puis le refoule par la sortie."
    },
    {
      "type": "paragraph",
      "text": "Le fluide pompé n’est en contact qu’avec la chambre de pompage, la membrane et les clapets, jamais avec le moteur, les roulements ou les autres organes d’entraînement. Sans joint dynamique, la pompe à membrane est peu sujette aux fuites et convient aux fluides corrosifs, sensibles à la contamination ou devant rester propres."
    },
    {
      "type": "paragraph",
      "text": "Le principe est le même pour une grande pompe pneumatique qui transfère des boues dans une usine chimique et pour une pompe à membrane miniature qui délivre de quelques millilitres à plusieurs centaines de millilitres par minute dans un instrument."
    }
  ],
  "sections": [
    {
      "title": "Comment fonctionne une pompe à membrane ?",
      "tocLabel": "Principe de fonctionnement",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Chaque cycle se compose d’une course d’aspiration et d’une course de refoulement. Le fluide est déplacé par la variation du volume de la chambre et l’action coordonnée de deux clapets anti-retour."
        },
        {
          "type": "figure",
          "src": principleDiagram("fr"),
          "alt": "Schéma des courses d’aspiration et de refoulement d’une pompe à membrane",
          "width": 1520,
          "height": 640,
          "caption": "Principe de la pompe à membrane : les barres rouges indiquent les clapets anti-retour fermés, les flèches bleues le sens d’écoulement."
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Course d’aspiration : la membrane est tirée vers le bas, le volume de la chambre augmente et la pression baisse. Sous l’effet de la différence de pression, le clapet d’aspiration s’ouvre tandis que le clapet de refoulement reste fermé, et le fluide entre dans la chambre.",
            "Course de refoulement : la membrane est poussée vers le haut, le volume de la chambre diminue et la pression augmente. Le clapet de refoulement s’ouvre, le clapet d’aspiration se ferme et le fluide est chassé de la chambre."
          ]
        },
        {
          "type": "paragraph",
          "text": "Les deux courses alternent en continu et produisent un débit continu mais pulsé. Une pompe à chambre unique ne débite que pendant la course de refoulement, d’où des pulsations marquées ; les conceptions à double membrane ou à plusieurs chambres refoulent à tour de rôle et donnent un débit bien plus régulier."
        },
        {
          "type": "subheading",
          "title": "Composants clés"
        },
        {
          "type": "list",
          "items": [
            "Membrane : elle sépare le fluide de l’entraînement et se déforme de façon répétée pour faire varier le volume de la chambre. Les matériaux courants sont l’EPDM, le FKM et le PTFE, choisis selon l’agressivité chimique et la température du fluide.",
            "Clapets anti-retour : ils n’autorisent l’écoulement que dans un sens. Leur étanchéité influe directement sur l’auto-amorçage et sur le débit réel.",
            "Tête de pompe : le corps qui forme la chambre et se trouve en contact avec le fluide, généralement en plastiques techniques tels que le PP, le PPS ou le PVDF ; les pompes industrielles existent aussi en alliage d’aluminium ou en acier inoxydable.",
            "Mécanisme d’entraînement : la source d’énergie qui actionne la membrane — moteur avec excentrique ou bielle, air comprimé ou électroaimant. Chaque mode d’entraînement correspond à un type de pompe à membrane."
          ]
        },
        {
          "type": "subheading",
          "title": "De quoi dépend le débit ?"
        },
        {
          "type": "paragraph",
          "text": "Le débit théorique est égal à la cylindrée par course multipliée par la fréquence des courses. Une fois la pompe installée, le débit réel dépend aussi de la hauteur d’aspiration, de la contre-pression au refoulement, du diamètre des tubes et de la viscosité du fluide ; il est généralement inférieur au débit libre indiqué dans la fiche technique."
        },
        {
          "type": "paragraph",
          "text": "Lors du choix, il faut donc consulter la courbe débit-pression de la pompe et vérifier le débit disponible à la pression réelle du circuit, plutôt que de se fier au seul débit maximal."
        },
        {
          "type": "paragraph",
          "text": "Voici la courbe débit-pression de la pompe à membrane miniature pour liquides FOREACH DPL30. À pression nulle, le débit dépasse légèrement 300 mL/min ; lorsque la contre-pression au refoulement atteint 100 kPa, il tombe à environ 160 mL/min, soit à peu près la moitié. Le débit baisse aussi lorsque la dépression à l’aspiration augmente (hauteur d’aspiration plus grande ou résistance plus forte à l’entrée)."
        },
        {
          "type": "figure",
          "src": dpl30CurveImage("fr"),
          "alt": "Courbe débit-pression de la pompe à membrane miniature pour liquides FOREACH DPL30",
          "width": 2080,
          "height": 668,
          "caption": "Courbe débit-pression de la DPL30 : à gauche de l’axe horizontal, la pression négative à l’aspiration ; à droite, la pression positive au refoulement ; en ordonnée, le débit.",
          "link": {
            "href": "/fr/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
            "label": "En savoir plus : comment lire la courbe débit-pression d’une pompe à membrane"
          }
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "Pour estimer la perte de charge de vos tuyaux, utilisez le ",
              "href": "/fr/resources/calculators/fluid-resistance/",
              "label": "calculateur de perte de charge",
              "suffix": " avec le diamètre, la longueur et le débit, puis lisez sur la courbe le débit correspondant à cette pression."
            }
          ]
        }
      ]
    },
    {
      "title": "Quels sont les types de pompes à membrane ?",
      "tocLabel": "Principaux types",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Les pompes à membrane se classent principalement selon leur mode d’entraînement et leur usage. Dans l’industrie, les plus courantes sont les pompes pneumatiques à double membrane ; dans les instruments et les équipements, ce sont les pompes à membrane électriques miniatures."
        },
        {
          "type": "table",
          "headers": ["Type", "Entraînement", "Ordre de grandeur du débit", "Usages courants"],
          "rows": [
            ["Pompe pneumatique à double membrane (AODD)", "L’air comprimé actionne deux membranes en alternance", "Élevé : de dizaines à centaines de litres par minute", "Chimie, peintures, eaux usées, boues"],
            ["Pompe à membrane électrique", "Un moteur entraîne la membrane par excentrique ou bielle", "Très large : de quelques millilitres à des dizaines de litres par minute", "Transfert dans les équipements, pulvérisation, purification de l’eau"],
            ["Pompe à membrane électromagnétique / pompe doseuse à membrane", "Électroaimant ou moteur, longueur et fréquence de course réglables", "Faible à moyen, priorité à la précision de dosage", "Dosage de réactifs en traitement de l’eau, injection de produits chimiques"],
            ["Pompe à vide / pompe à gaz à membrane", "Entraînée par moteur ; transfère des gaz", "Exprimé en débit d’aspiration", "Filtration sous vide au laboratoire, prélèvement de gaz, aspiration de liquides sous vide"],
            ["Pompe à membrane miniature", "Version miniaturisée de la pompe électrique, moteur CC à balais ou sans balais", "De quelques à plusieurs centaines de millilitres par minute (liquides)", "Instruments d’analyse, automatisation de laboratoire, surveillance environnementale, circuits d’encre"]
          ]
        },
        {
          "type": "subheading",
          "title": "Pompes pneumatiques à double membrane (AODD)"
        },
        {
          "type": "paragraph",
          "text": "Une pompe AODD utilise de l’air comprimé pour actionner deux membranes en alternance : l’une aspire pendant que l’autre refoule. Elle ne nécessite pas d’électricité, ce qui la rend adaptée aux zones à risque d’explosion, et elle peut transférer des boues chargées de particules ainsi que des liquides très visqueux. En contrepartie, elle exige une alimentation en air comprimé, consomme beaucoup d’air et son échappement est bruyant."
        },
        {
          "type": "figure",
          "src": `${imageBase}/aodd-tapflo-t50.jpg`,
          "alt": "Pompe pneumatique à double membrane Tapflo T50",
          "width": 900,
          "height": 480,
          "caption": "Pompe pneumatique à double membrane Tapflo T50. Photo : Aleksander Ma, CC BY-SA 4.0, via Wikimedia Commons."
        },
        {
          "type": "subheading",
          "title": "Pompes à membrane électriques"
        },
        {
          "type": "paragraph",
          "text": "Dans une pompe à membrane électrique, un moteur anime la membrane d’un mouvement alternatif par l’intermédiaire d’un excentrique ou d’une bielle. Le débit suit la vitesse du moteur et se règle par la tension d’alimentation ou par l’électronique de commande. Les grandes pompes électriques servent au transfert industriel ; les petites sont intégrées dans toutes sortes d’équipements."
        },
        {
          "type": "subheading",
          "title": "Pompes à membrane électromagnétiques et pompes doseuses à membrane"
        },
        {
          "type": "paragraph",
          "text": "Une pompe à membrane électromagnétique pousse la membrane à l’aide d’un électroaimant et effectue une course à chaque impulsion électrique. Le dosage se règle en ajustant la fréquence des impulsions et la longueur de course. Les pompes doseuses à membrane privilégient la précision de dosage et sont couramment utilisées pour le dosage de réactifs en traitement de l’eau et l’injection de produits chimiques."
        },
        {
          "type": "subheading",
          "title": "Pompes à vide et pompes à gaz à membrane"
        },
        {
          "type": "paragraph",
          "text": "Ces pompes à membrane transfèrent des gaz. La chambre ne contient pas d’huile : le gaz aspiré n’est donc pas contaminé par de l’huile. On les utilise couramment pour la filtration sous vide au laboratoire, le prélèvement de gaz et l’aspiration de liquides sous vide dans les équipements."
        },
        {
          "type": "figure",
          "src": dpgl800CurveImage("fr"),
          "alt": "Courbe débit de gaz-pression de la pompe à membrane gaz-liquide FOREACH DPGL800",
          "width": 2363,
          "height": 1100,
          "caption": "Courbe débit de gaz-pression de la FOREACH DPGL800 : à pression nulle, le débit de gaz par tête est d’environ 6 L/min ; plus le vide est poussé, plus le débit baisse, jusqu’à devenir presque nul vers -90 kPa, le vide limite de la pompe."
        },
        {
          "type": "subheading",
          "title": "Pompes à membrane miniatures"
        },
        {
          "type": "paragraph",
          "text": "Compactes, peu gourmandes en énergie et alimentées en courant continu, les pompes à membrane miniatures s’intègrent facilement dans les instruments et les équipements. Le choix repose surtout sur trois distinctions :"
        },
        {
          "type": "list",
          "items": [
            "Pompes à liquide et pompes gaz-liquide : les pompes à liquide transfèrent des liquides pour le lavage, l’appoint ou la circulation. Les pompes gaz-liquide peuvent aspirer du gaz et du liquide en même temps et conviennent à l’aspiration des effluents et à l’aspiration de liquides sous vide.",
            "Moteur à balais ou sans balais : le moteur sans balais dure plus longtemps et fonctionne plus silencieusement, ce qui convient à un fonctionnement continu prolongé ; le moteur à balais, plus simple et moins coûteux, convient à un usage intermittent.",
            "Pression standard ou haute pression : les circuits à forte contre-pression au refoulement, par exemple avec des tubes fins, de longues conduites ou des buses, nécessitent un modèle haute pression."
          ]
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "Les pompes à membrane miniatures FOREACH suivent ces trois distinctions : ",
              "href": "/fr/products/pumps/miniature-diaphragm-pumps/dpl30-bb/",
              "label": "DPL30",
              "suffix": " (300 mL/min) et "
            },
            {
              "href": "/fr/products/pumps/miniature-diaphragm-pumps/dpl60-bb/",
              "label": "DPL60",
              "suffix": " (600 mL/min) sont des pompes à liquide à pression standard, de pression nominale 100 kPa ; "
            },
            {
              "href": "/fr/products/pumps/miniature-diaphragm-pumps/dpl30h-bs/",
              "label": "DPL30H",
              "suffix": " est la pompe à liquide haute pression, de pression nominale 600 kPa. Les trois séries existent avec moteur à balais ou sans balais. "
            },
            {
              "href": "/fr/products/pumps/miniature-diaphragm-pumps/dpgl800-bs/",
              "label": "DPGL800",
              "suffix": " est une pompe à membrane gaz-liquide 24 V sans balais, avec 6 L/min de gaz à vide par tête, destinée à l’aspiration des effluents et à l’aspiration sous vide ; elle n’est pas prévue pour pomper du liquide pur."
            }
          ]
        },
        {
          "type": "figure",
          "src": dpl30Card,
          "alt": "Pompe à membrane miniature pour liquides FOREACH DPL30",
          "width": 2000,
          "height": 1500,
          "caption": "Pompe à membrane miniature pour liquides FOREACH DPL30."
        },
        {
          "type": "figure",
          "src": dpgl800Card,
          "alt": "Pompe à membrane miniature gaz-liquide FOREACH DPGL800",
          "width": 1500,
          "height": 1500,
          "caption": "Pompe à membrane miniature gaz-liquide FOREACH DPGL800."
        }
      ]
    },
    {
      "title": "Avantages et limites des pompes à membrane",
      "tocLabel": "Avantages et limites",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Les principaux atouts de la pompe à membrane sont une étanchéité fiable et l’auto-amorçage ; ses principales limites sont un débit pulsé et sensible à la contre-pression. Il faut peser les deux avant de choisir."
        },
        {
          "type": "subheading",
          "title": "Avantages"
        },
        {
          "type": "list",
          "items": [
            "Pas de joint dynamique, peu de risque de fuite : la membrane sépare le fluide de l’entraînement, sans joint d’arbre ni autre point de fuite.",
            "Auto-amorçage : au démarrage, la pompe évacue l’air de la conduite d’aspiration puis aspire le liquide, sans amorçage préalable. La hauteur d’aspiration reste toutefois limitée : quelques mètres de colonne d’eau seulement pour les micropompes.",
            "Marche à sec brève tolérée par la plupart des modèles : un manque temporaire de liquide dans la conduite ne les endommage généralement pas ; reportez-vous au manuel du produit pour les limites.",
            "Transfert de gaz et de mélanges gaz-liquide : les modèles gaz-liquide s’utilisent directement pour l’aspiration des effluents et l’aspiration de liquides sous vide.",
            "Matériaux mouillés au choix : la membrane, les clapets et la tête de pompe peuvent être choisis selon le fluide, qu’il s’agisse d’acides, de bases, de solvants ou de réactifs divers.",
            "Faible cisaillement : la pompe agite et cisaille moins le fluide qu’une pompe à engrenages ou centrifuge, ce qui convient aux fluides sensibles au cisaillement."
          ]
        },
        {
          "type": "subheading",
          "title": "Limites"
        },
        {
          "type": "list",
          "items": [
            "Débit pulsé : les circuits qui exigent un débit régulier nécessitent un amortisseur de pulsations ou une pompe à plusieurs chambres.",
            "Débit variable selon la contre-pression : plus les tubes sont fins et longs, plus le débit réel baisse. Pour un dosage précis, une pompe à piston ou un pousse-seringue convient mieux.",
            "Bruit et vibrations : le mode de fixation et l’isolation vibratoire influent nettement sur le bruit de l’équipement.",
            "Usure de la membrane et des clapets : ce sont des pièces d’usure, dont la durée de vie dépend des conditions de service et du type de moteur.",
            "Sensibilité des pompes miniatures aux particules et à la viscosité : leurs clapets présentent de faibles jeux ; pour les fluides chargés de particules, très visqueux ou qui se vaporisent facilement, vérifiez l’adéquation au préalable."
          ]
        }
      ]
    },
    {
      "title": "Où utilise-t-on les pompes à membrane ?",
      "tocLabel": "Applications",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Dans l’industrie, les pompes AODD servent surtout au transfert de produits chimiques, de peintures et d’eaux usées. Dans les instruments et les équipements automatisés, les pompes à membrane miniatures assurent principalement le lavage, l’appoint, la circulation et l’aspiration des effluents :"
        },
        {
          "type": "table",
          "headers": ["Domaine", "Rôle de la pompe à membrane"],
          "rows": [
            ["Instruments d’analyse", "Alimentation en solution de lavage, appoint, circulation et aspiration des effluents ; lavage d’aiguille en chromatographie liquide"],
            ["Surveillance environnementale", "Prélèvement d’échantillons d’eau, transfert de réactifs et vidange ; évacuation des condensats lors du prétraitement des gaz"],
            ["Automatisation de laboratoire", "Lavage des plaques dans les laveurs de microplaques ; nettoyage des équipements de préparation d’échantillons"],
            ["Sciences de la vie", "Renouvellement du milieu en culture cellulaire, lavage automatisé et gestion des effluents"],
            ["Biologie de synthèse", "Alimentation et évacuation des effluents des microbioréacteurs"],
            ["Diagnostic in vitro (IVD)", "Lavage et effluents des analyseurs de biochimie, d’hématologie, d’immunoanalyse et de coagulation"],
            ["Impression et circuits d’encre", "Circulation d’alimentation et de retour de l’encre pour éviter la sédimentation de l’encre blanche et des autres encres"]
          ]
        },
        {
          "type": "paragraph",
          "text": "Dans un même équipement, le lavage, l’appoint et l’aspiration des effluents imposent souvent des exigences différentes à la pompe : le lavage privilégie le débit et la pression, tandis que l’aspiration des effluents exige de gérer des mélanges gaz-liquide. Il est préférable de choisir la pompe tâche par tâche."
        }
      ]
    },
    {
      "title": "Comment choisir une pompe à membrane ?",
      "tocLabel": "Critères de choix",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Ne choisissez pas une pompe à membrane sur le seul débit maximal de la fiche technique. Partez du fluide et du circuit réel, et vérifiez les points suivants dans l’ordre :"
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Quel est le fluide ? Liquide, gaz ou mélange gaz-liquide ; corrosif ou chargé de particules ; viscosité et température. Ces éléments déterminent le type de pompe et les matériaux mouillés.",
            "Quel débit faut-il ? Raisonnez au point de fonctionnement réel après installation, avec une marge, au lieu de comparer directement les débits libres des fiches techniques.",
            "Quelles sont la hauteur d’aspiration et la contre-pression ? La hauteur à aspirer à l’entrée et la résistance à la sortie déterminent le choix entre un modèle standard et un modèle haute pression.",
            "Les matériaux mouillés sont-ils compatibles ? Vérifiez séparément la membrane, les clapets et la tête de pompe, pas seulement l’un d’eux.",
            "Moteur et commande : à balais ou sans balais, tension d’alimentation, besoin de variation de vitesse et de retour d’état.",
            "Mode de fonctionnement et durée de vie : continu ou intermittent, nombre d’heures par jour ; estimez la durée de vie selon les conditions réelles.",
            "Installation et tubes : bruit, vibrations, pulsations, diamètre des tubes et mise à l’air du réservoir."
          ]
        },
        {
          "type": "subheading",
          "title": "Matériaux en contact avec le fluide"
        },
        {
          "type": "paragraph",
          "text": "Matériaux courants en contact avec le fluide dans les pompes à membrane (règles générales : vérifiez chaque fluide selon sa composition, sa concentration et sa température)"
        },
        {
          "type": "table",
          "headers": ["Matériau", "Pièces concernées", "Points forts", "Points de vigilance"],
          "rows": [
            ["EPDM (caoutchouc éthylène-propylène-diène)", "Membrane, clapets", "Résiste à l’eau, aux acides et bases dilués et aux alcools ; adapté aux milieux aqueux", "Ne résiste pas aux huiles minérales, aux carburants ni aux solvants hydrocarbonés"],
            ["FKM (fluoroélastomère)", "Membrane, clapets", "Résiste aux huiles, aux carburants et à la plupart des acides", "Ne résiste pas aux cétones comme l’acétone, aux amines ni aux bases fortes"],
            ["FFKM (perfluoroélastomère)", "Clapets, joints", "Résistance chimique proche du PTFE, avec l’élasticité d’un caoutchouc", "Coût élevé"],
            ["PTFE (polytétrafluoroéthylène)", "Membrane", "Très inerte ; résiste à la plupart des acides et bases forts et des solvants organiques", "Moins élastique que le caoutchouc"],
            ["PPS (polysulfure de phénylène)", "Tête de pompe", "Résiste à la chaleur et aux produits chimiques ; bonne stabilité dimensionnelle", "Compatibilité seulement limitée avec l’acide chlorhydrique concentré, le peroxyde d’hydrogène et les milieux similaires"],
            ["PP (polypropylène)", "Tête de pompe", "Résiste aux acides, aux bases et aux solvants organiques courants ; faible coût", "Tenue en température plus faible ; ne résiste pas au xylène, au dichlorométhane ni aux solvants similaires"],
            ["PVDF (polyfluorure de vinylidène)", "Tête de pompe", "Résiste aux produits chimiques, bonnes propriétés mécaniques", "Compatibilité seulement limitée avec les cétones comme l’acétone"]
          ]
        },
        {
          "type": "paragraph",
          "text": "Les pompes à membrane miniatures pour liquides FOREACH (DPL30, DPL60 et DPL30H) ont une tête en PPS et deux combinaisons de matériaux en contact avec le fluide : membrane EPDM avec clapets EPDM, ou membrane PTFE avec clapets FFKM. Pour de l’eau purifiée, commencez par évaluer la combinaison EPDM ; pour les réactifs et les liquides de nettoyage, vérifiez les deux combinaisons selon la composition, la concentration et la température réelles, y compris les fluides utilisés pour le nettoyage."
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "Pour un fluide précis, consultez le ",
              "href": "/fr/resources/material-compatibility/",
              "label": "tableau de compatibilité des matériaux",
              "suffix": " (PPS, PTFE, etc.) ; pour choisir entre les deux combinaisons, voir "
            },
            {
              "href": "/fr/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
              "label": "Quels matériaux choisir pour une pompe à membrane miniature ?",
              "suffix": "."
            }
          ]
        },
        {
          "type": "paragraph",
          "text": "Au stade du prototype, mesurez le débit et la pression dans le circuit réel et validez les résultats avant de figer la conception."
        }
      ]
    },
    {
      "title": "Conclusion",
      "tocLabel": "Conclusion",
      "blocks": [
        {
          "type": "paragraph",
          "text": "La pompe à membrane déplace le fluide grâce à une membrane animée d’un mouvement alternatif et à deux clapets anti-retour. Étanche et auto-amorçante, elle est largement utilisée, du transfert industriel aux circuits fluidiques des instruments. Pour la choisir, définissez d’abord le fluide et le point de fonctionnement réel, puis vérifiez les matériaux, le moteur et les conditions d’installation."
        },
        {
          "type": "paragraph",
          "text": "Si vous cherchez une pompe à membrane miniature pour votre équipement, FOREACH propose des pompes à membrane miniatures pour liquides et gaz-liquide. Communiquez-nous le fluide, le débit visé et la configuration du circuit : nos ingénieurs vous aideront à déterminer le point de fonctionnement et le modèle adapté."
        },
        {
          "type": "subheading",
          "title": "Pour aller plus loin"
        },
        {
          "type": "links",
          "ordered": true,
          "items": [
            {
              "href": "/fr/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
              "label": "Comment lire la courbe débit-pression d’une pompe à membrane ?"
            },
            {
              "href": "/fr/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
              "label": "Quels matériaux choisir pour une pompe à membrane miniature ?"
            },
            {
              "href": "/fr/resources/technical-articles/diaphragm-pump-vs-peristaltic-pump/",
              "label": "Pompe à membrane miniature ou péristaltique : avantages, limites et choix pour les instruments"
            },
            {
              "href": "/fr/resources/technical-articles/miniature-diaphragm-pump-flow-pulsation-reduction/",
              "label": "Pulsations de débit d’une micropompe à membrane : mesure et réduction"
            },
            {
              "href": "/fr/resources/technical-articles/self-priming-miniature-liquid-diaphragm-pump-selection/",
              "label": "Choisir une micropompe à membrane auto-amorçante pour liquides : hauteur, durée et démarrage à sec ou humide"
            },
            {
              "href": "/fr/resources/technical-articles/brushed-vs-brushless-diaphragm-pump-3000h-10000h/",
              "label": "Pourquoi une pompe à membrane avec balais dure-t-elle environ 3 000 heures et une version sans balais 10 000 heures ?"
            }
          ]
        }
      ]
    }
  ],
  "faqTitle": "Questions fréquentes",
  "faqItems": [
    {
      "question": "Une pompe à membrane peut-elle fonctionner à sec ?",
      "answer": "La plupart des pompes à membrane ne sont pas endommagées par une brève marche à sec, car elles n’ont pas de joint dynamique lubrifié par le liquide. Une marche à sec prolongée accélère toutefois l’usure de la membrane et des clapets ; reportez-vous au manuel du produit pour les limites."
    },
    {
      "question": "Une pompe à membrane est-elle auto-amorçante ?",
      "answer": "Oui. Elle peut aspirer le liquide même lorsque la conduite d’aspiration contient de l’air, mais la hauteur d’aspiration est limitée. Pour les pompes à membrane miniatures pour liquides FOREACH, elle est de 6 mH₂O pour la DPL30 et de 3 mH₂O pour la DPL60 et la DPL30H. Si l’auto-amorçage se dégrade, les causes courantes sont une prise d’air à l’aspiration ou l’usure des clapets."
    },
    {
      "question": "Pourquoi le débit est-il inférieur au débit nominal une fois la pompe installée ?",
      "answer": "Le débit nominal est généralement un débit libre, sans contre-pression. Une fois la pompe installée, le diamètre et la longueur des tubes, la hauteur d’aspiration et la contre-pression réduisent le débit ; un réservoir non mis à l’air ou une prise d’air à l’aspiration le diminuent aussi."
    },
    {
      "question": "Pompe à membrane ou pompe péristaltique : laquelle choisir ?",
      "answer": "La pompe péristaltique déplace le fluide en écrasant un tube souple ; son débit suit directement la vitesse de rotation, mais le tube doit être remplacé régulièrement. La pompe à membrane ne demande pas de changement de tube et s’amorce bien, mais son débit est pulsé. La pompe péristaltique est plus courante pour le dosage ; la pompe à membrane est privilégiée pour le transfert, le lavage et l’aspiration des effluents qui doivent demander peu d’entretien sur la durée."
    },
    {
      "question": "Quelle différence entre une pompe à membrane pneumatique et une pompe électrique ?",
      "answer": "La pompe pneumatique est entraînée par de l’air comprimé, offre de forts débits et sert surtout au transfert industriel. La pompe électrique est entraînée par un moteur, peut être très compacte et se commande facilement, ce qui la rend adaptée à l’intégration dans les instruments et les équipements."
    },
    {
      "question": "Une pompe à membrane permet-elle un dosage précis ?",
      "answer": "Le débit d’une pompe à membrane classique varie avec la contre-pression ; elle ne convient donc pas au dosage de haute précision. Pour un dosage précis, choisissez une pompe doseuse à membrane, une pompe à piston ou un pousse-seringue."
    },
    {
      "question": "Quelle est la durée de vie d’une pompe à membrane ?",
      "answer": "Elle dépend surtout du type de moteur et des conditions de service. Pour les pompes à membrane miniatures FOREACH, la durée de vie nominale est d’environ 3 000 heures en version à balais et d’environ 10 000 heures en version sans balais ; le fonctionnement continu, une forte contre-pression et une température élevée réduisent la durée de vie réelle."
    }
  ],
  "cta": {
    "title": "Besoin d’une pompe à membrane miniature pour votre équipement ?",
    "description": "Indiquez le fluide, le débit visé, la hauteur d’aspiration, la contre-pression et la configuration du circuit : les ingénieurs FOREACH vous aideront à déterminer le point de fonctionnement et le modèle adapté.",
    "contactLabel": "Contacter un ingénieur",
    "productsLabel": "Voir les pompes à membrane miniatures",
    "productsHref": "/fr/products/pumps/miniature-diaphragm-pumps/"
  }
} satisfies DiaphragmPumpEngineeringArticleCopy;
