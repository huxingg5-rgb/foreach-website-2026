import type { DiaphragmPumpEngineeringArticleCopy } from "../../diaphragm-pump-engineering-article.types";
import { getFlowTableRows } from "./shared";

// Editorial localization; FOREACH facts retained. Industry terminology checked against CPC and Nordson MEDICAL.
const flowTableLabels = {
  "outsideRange": "Hors graphique",
  "flowAtOneBar": "Débit pour une perte de 1 bar (L/min)",
  "coefficients": "Kv / Cv estimés",
  "steepCurve": "Pente trop forte pour une estimation exploitable"
};

export const copy = {
  "metadata": {
    "title": "Débit des raccords rapides : courbes de perte de charge et calculs Kv/Cv",
    "seoTitle": "Raccords rapides : débit, perte de charge et Kv/Cv | FOREACH",
    "seoDescription": "Sélectionnez les raccords Q20, Q40 et Q60 à partir des courbes débit–perte de charge et des estimations Kv/Cv. Clapets, aspiration des pompes et circuits multibranches.",
    "coverImage": "/images/resources/technical-articles/instrument-fluidics/quick-disconnect-coupling-flow-pressure-drop-cover.webp",
    "coverAlt": "Raccords rapides Q60 gris, accouplés et désaccouplés, sur fond blanc"
  },
  "deck": "Le débit admissible d'un raccord rapide dépend de la perte de charge disponible, du diamètre du tube, des clapets et du fluide. Partez du débit requis, puis utilisez une courbe débit–perte de charge ou une estimation Kv/Cv pour vérifier que la perte du raccord reste compatible avec le circuit. À travers les séries FOREACH Q20, Q40 et Q60, ce guide présente la lecture des courbes, les calculs et la sélection pour l'aspiration d'une pompe ou l'alimentation de plusieurs branches.",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "Le débit admissible d'un raccord rapide dépend de la perte de charge disponible, du diamètre du tube, des clapets et du fluide. Partez du débit requis, puis utilisez une courbe débit–perte de charge ou une estimation Kv/Cv pour vérifier que la perte du raccord reste compatible avec le circuit. À travers les séries FOREACH Q20, Q40 et Q60, ce guide présente la lecture des courbes, les calculs et la sélection pour l'aspiration d'une pompe ou l'alimentation de plusieurs branches."
    },
    {
      "type": "paragraph",
      "text": "Pour un liquide de viscosité proche de l'eau en régime turbulent, estimez la perte de charge par ΔP ≈ SG × (Q ÷ Kv)², ou le débit par Q ≈ Kv × √(ΔP ÷ SG). Q s'exprime en m³/h, ΔP en bar et SG désigne la densité relative. Les sections suivantes fournissent des lectures approximatives, des Kv/Cv estimés et des exemples, avec l'influence des clapets, de la viscosité et de l'emplacement du raccord."
    }
  ],
  "sections": [
    {
      "title": "Quels facteurs déterminent le débit d'un raccord rapide ?",
      "blocks": [
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/quick-disconnect-couplings-photo.webp",
          "alt": "Trois ensembles de raccords rapides avec corps et embouts droits, coudés et filetés",
          "caption": "Raccords rapides présentant différentes formes et terminaisons.",
          "width": 2000,
          "height": 2000
        },
        {
          "type": "paragraph",
          "text": "Le débit est créé par la pompe ou la source de pression ; le raccord impose une perte de charge. En régime turbulent courant, celle-ci varie approximativement comme le carré du débit. Sur la courbe Q40 de 3/8″, elle passe d'environ 0.23 bar à 10 L/min à 0.95 bar à 20 L/min : doubler le débit multiplie presque la perte par quatre."
        },
        {
          "type": "paragraph",
          "text": "À débit identique, les principaux facteurs sont les suivants :"
        },
        {
          "type": "list",
          "items": [
            "Diamètre du tube : dans une même série, passer de 1/8″ à 1/4″ peut réduire la perte de charge de plus d'un ordre de grandeur.",
            "Clapets : un passage droit sans clapet oppose moins de résistance ; les obturateurs et leurs ressorts occupent une partie du passage.",
            "Terminaison : les embouts cannelés droits, coudés et filetés présentent des géométries internes différentes.",
            "Fluide : une densité relative ou une viscosité plus élevée augmente la perte au même débit."
          ]
        },
        {
          "type": "paragraph",
          "text": "Le diamètre intérieur indiqué est celui du tube compatible, pas le diamètre minimal de passage du raccord. Voir l'explication des dimensions dans Qu'est-ce qu'un raccord rapide ?"
        }
      ]
    },
    {
      "title": "Comment lire une courbe débit–perte de charge ?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "L'axe horizontal indique le débit : L/min pour les liquides et Nm³/min pour les gaz. L'axe vertical représente la perte de charge du raccord en bar. Chaque courbe correspond à un diamètre de raccordement. Deux lectures sont possibles :"
        },
        {
          "type": "list",
          "items": [
            "Débit connu : remontez du débit requis jusqu'à la courbe concernée, puis lisez la perte de charge sur l'axe vertical.",
            "Perte de charge admissible connue : rejoignez horizontalement la courbe, puis descendez sur l'axe des débits."
          ]
        },
        {
          "type": "table",
          "headers": [
            "Élément du graphique",
            "Signification",
            "À ne pas confondre avec"
          ],
          "rows": [
            [
              "Perte de charge sur l'axe vertical",
              "Différence de pression entre l'amont et l'aval du raccord",
              "Pression de refoulement de la pompe ou pression de service admissible du raccord"
            ],
            [
              "Dernière graduation de débit",
              "Limite du domaine représenté",
              "Débit nominal du raccord"
            ],
            [
              "Courbe pour gaz",
              "Débit volumique de gaz ramené aux conditions normales",
              "Une conversion directe en débit de liquide"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Repères de conversion : 0.69 bar correspond à environ 10 psi ; 1.9 L/min à 0.5 US gpm ; et 4.83 bar à 70 psi."
        }
      ]
    },
    {
      "title": "Tableaux débit–perte de charge des séries Q20, Q40 et Q60",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Ces tableaux donnent des lectures approximatives des courbes de liquide pour une présélection et pour comparer les diamètres au sein d'une série. Kv et Cv sont estimés à partir des courbes pour des calculs préliminaires dans leur domaine d'application. Les résultats calculés ne coïncident pas nécessairement avec chaque point lu ; la réception du produit repose sur les essais de l'ensemble accouplé."
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/q20-series-white.webp",
          "alt": "Raccord rapide Q20 accouplé et désaccouplé",
          "caption": "Série Q20",
          "width": 1500,
          "height": 1500
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/q40-series-white.webp",
          "alt": "Raccord rapide Q40 accouplé et désaccouplé",
          "caption": "Série Q40",
          "width": 1500,
          "height": 1500
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/q60-series-white.webp",
          "alt": "Raccord rapide Q60 accouplé et désaccouplé",
          "caption": "Série Q60",
          "width": 1500,
          "height": 1500
        },
        {
          "type": "subheading",
          "title": "Série Q20 : diamètre intérieur du tube de 1.6–6.4 mm"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/localized/q20-flow-pressure-drop.fr.svg",
          "alt": "Courbes débit–perte de charge Q20 pour gaz et liquide",
          "caption": "Figure 1 | Courbes Q20. En haut : gaz en Nm³/min. En bas : liquide en L/min. Les deux axes verticaux indiquent la perte de charge en bar.",
          "width": 1000,
          "height": 1260
        },
        {
          "type": "paragraph",
          "text": "Q20 : débit de liquide et perte de charge (bar)"
        },
        {
          "type": "table",
          "headers": [
            "Débit (L/min)",
            "1/16″ (1.6 mm)",
            "1/8″ (3.2 mm)",
            "1/4″ (6.4 mm)"
          ],
          "rows": getFlowTableRows("q20", flowTableLabels)
        },
        {
          "type": "paragraph",
          "text": "« Hors graphique » signifie que la perte de charge à ce débit dépasse la limite représentée de 4.83 bar."
        },
        {
          "type": "paragraph",
          "text": "Le Q20 de 1/16″ convient aux très faibles débits : environ 1 bar de perte dès 0.1 L/min et plus de 4 bar à 0.5 L/min. Pour l'alimentation depuis un réservoir ou le lavage au-delà de 1 L/min, examinez d'abord les raccordements de 1/8″ ou 1/4″."
        },
        {
          "type": "subheading",
          "title": "Série Q40 : diamètre intérieur du tube de 6.4–9.5 mm"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/localized/q40-flow-pressure-drop.fr.svg",
          "alt": "Courbes débit–perte de charge Q40 pour gaz et liquide",
          "caption": "Figure 2 | Courbes Q40. En haut : gaz en Nm³/min. En bas : liquide en L/min. Les deux axes verticaux indiquent la perte de charge en bar.",
          "width": 1000,
          "height": 1428
        },
        {
          "type": "paragraph",
          "text": "Q40 : débit de liquide et perte de charge (bar)"
        },
        {
          "type": "table",
          "headers": [
            "Débit (L/min)",
            "1/4″ (6.4 mm)",
            "3/8″ (9.5 mm)"
          ],
          "rows": getFlowTableRows("q40", flowTableLabels)
        },
        {
          "type": "subheading",
          "title": "Série Q60 : diamètre intérieur du tube de 9.5–19.0 mm"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/localized/q60-flow-pressure-drop.fr.svg",
          "alt": "Courbes débit–perte de charge Q60 pour gaz et liquide",
          "caption": "Figure 3 | Courbes Q60. En haut : gaz en Nm³/min. En bas : liquide en L/min. Les deux axes verticaux indiquent la perte de charge en bar.",
          "width": 1000,
          "height": 1355
        },
        {
          "type": "paragraph",
          "text": "Q60 : débit de liquide et perte de charge (bar)"
        },
        {
          "type": "table",
          "headers": [
            "Débit (L/min)",
            "3/8″ (9.5 mm)",
            "1/2″ (12.7 mm)"
          ],
          "rows": getFlowTableRows("q60", flowTableLabels)
        },
        {
          "type": "paragraph",
          "text": "* Cette perte dépasse la pression de service de Q60-PP, soit 4.2 bar. Le point sert uniquement à illustrer la tendance de la courbe."
        },
        {
          "type": "paragraph",
          "text": "Les courbes Q60 présentées concernent les raccordements de 3/8″ et 1/2″. Ne les extrapolez pas au 3/4″ (19.0 mm) au prorata du diamètre. La pression de service de Q60-PP est de 4.2 bar. Si l'aval est à la pression atmosphérique ou à une pression manométrique positive, les points dépassant cette perte de charge ne constituent pas des conditions d'utilisation admissibles. Voir l'article sur la pression de service dans les lectures complémentaires."
        }
      ]
    },
    {
      "title": "Calculer le débit et la perte de charge avec Kv ou Cv",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Utilisez les coefficients dans le domaine des courbes et sous les conditions d'écoulement applicables. Kv est le débit d'eau en m³/h pour une perte de 1 bar ; Cv est le débit d'eau en US gpm pour une perte de 1 psi. La conversion est Cv ≈ 1.156 × Kv. N'extrapolez pas hors du graphique."
        },
        {
          "type": "formula",
          "expression": "Perte de charge à partir du débit : ΔP = SG × (Q ÷ Kv)²"
        },
        {
          "type": "formula",
          "expression": "Débit à partir de la perte admissible : Q = Kv × √(ΔP ÷ SG)"
        },
        {
          "type": "paragraph",
          "text": "Q est en m³/h (1 m³/h ≈ 16.7 L/min), ΔP en bar et SG est la densité relative du liquide, égale à 1 pour l'eau."
        },
        {
          "type": "paragraph",
          "text": "Exemple 1 — Un circuit de lavage demande 12 L/min avec un Q40 de 3/8″ (Kv ≈ 1.22) et une densité relative de 1.0. Comme 12 L/min = 0.72 m³/h, ΔP = 1.0 × (0.72 ÷ 1.22)² ≈ 0.35 bar, proche des 0.33 bar du tableau."
        },
        {
          "type": "paragraph",
          "text": "Exemple 2 — Une branche ne réserve que 0.5 bar au raccord Q20 de 1/4″ (Kv ≈ 0.43). Q = 0.43 × √0.5 ≈ 0.30 m³/h, soit environ 5 L/min."
        },
        {
          "type": "paragraph",
          "text": "Exemple 3 — Deux paires identiques en série produisent deux fois la perte d'une seule paire au même débit. Leur Kv équivalent est le Kv d'une paire divisé par √2. Pour des composants différents en série : 1/Kv_total² = 1/Kv₁² + 1/Kv₂² + … ."
        },
        {
          "type": "paragraph",
          "text": "Saisissez Cv dans une ligne Cv du calculateur de résistance hydraulique FOREACH pour intégrer le raccord au calcul du circuit, avec les tubes et les vannes. Le guide du calculateur, proposé en fin d'article, détaille la méthode."
        },
        {
          "type": "paragraph",
          "text": "Ces équations s'appliquent aux liquides de viscosité proche de l'eau en régime turbulent. À très faible débit ou avec une viscosité plus élevée, l'écoulement peut devenir proche du régime laminaire, où la perte évolue de manière plus linéaire. L'estimation quadratique perd alors en précision : réalisez un essai avec le fluide réel. Les Kv/Cv de cet article restent des estimations de présélection."
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/fr/resources/calculators/fluid-resistance/",
              "label": "Ouvrir le calculateur de résistance hydraulique"
            }
          ]
        }
      ]
    },
    {
      "title": "Quel est l'effet des clapets d'obturation sur la perte de charge ?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Une moitié équipée d'un clapet ferme automatiquement son passage au désaccouplement. Une fois connectée, l'obturateur et son ressort restreignent encore le passage et augmentent la perte par rapport à un modèle droit comparable sans clapet. Avec un clapet dans chaque moitié, deux obturateurs se trouvent sur le trajet du fluide, généralement avec une restriction plus importante."
        },
        {
          "type": "paragraph",
          "text": "Si la marge de débit est faible :"
        },
        {
          "type": "list",
          "items": [
            "Prévoyez un clapet uniquement du côté qui doit se fermer au désaccouplement ; utilisez une moitié sans clapet de l'autre côté si l'application le permet.",
            "Si les deux côtés doivent se fermer, envisagez un diamètre de raccordement supérieur avant de supprimer les clapets nécessaires.",
            "Un accouplement incomplet peut empêcher l'ouverture totale des clapets et réduire fortement le débit. Vérifiez d'abord le verrouillage complet des deux moitiés."
          ],
          "ordered": true
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "Pour le liquide résiduel et les écoulements au désaccouplement, consultez ",
              "label": "Qu'est-ce qu'un raccord rapide ?",
              "href": "/fr/resources/technical-articles/what-is-a-quick-disconnect-fitting/",
              "suffix": "."
            }
          ]
        }
      ]
    },
    {
      "title": "Comment faire correspondre les codes des modèles aux courbes ?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Pour les modèles à embout cannelé, les deux chiffres qui suivent la série indiquent le diamètre intérieur du tube compatible. Le tableau permet de retrouver la légende de courbe correspondant au modèle :"
        },
        {
          "type": "table",
          "headers": [
            "Code dimensionnel",
            "Diamètre intérieur du tube",
            "Légende de courbe",
            "Série"
          ],
          "rows": [
            [
              "01",
              "1.6 mm",
              "1/16″",
              "Q20"
            ],
            [
              "02",
              "3.2 mm",
              "1/8″",
              "Q20"
            ],
            [
              "03",
              "4.8 mm",
              "3/16″ (non couvert par ces courbes)",
              "Q20"
            ],
            [
              "04",
              "6.4 mm",
              "1/4″",
              "Q20、Q40"
            ],
            [
              "06",
              "9.5 mm",
              "3/8″",
              "Q40、Q60"
            ],
            [
              "08",
              "12.7 mm",
              "1/2″",
              "Q60"
            ],
            [
              "12",
              "19.0 mm",
              "3/4″ (non couvert par ces courbes)",
              "Q60"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Dans Q2004-PNV-SPPE, Q20 désigne la série ; 04 correspond au tube de 6.4 mm (1/4″) ; P à la moitié mâle ; N à un montage hors panneau ; V à la présence d'un clapet ; S, PP et E à une terminaison droite, un corps PP et un joint EPDM. Les terminaisons filetées suivent un autre codage —Q4005 indique par exemple un raccordement fileté— : vérifiez toujours le modèle complet."
        }
      ]
    },
    {
      "title": "Pourquoi limiter davantage la perte de charge à l'aspiration d'une pompe ?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Pour un réservoir ouvert, une atmosphère (environ 1 bar), augmentée de la charge statique positive au-dessus de la pompe, représente une limite théorique, pas une réserve de pression exploitable. Le besoin de pression à l'entrée de la pompe et les pertes des tubes et filtres réduisent la marge, laissant souvent quelques dixièmes de bar au raccord. Une perte excessive diminue le débit fourni et favorise le dégazage du liquide."
        },
        {
          "type": "paragraph",
          "text": "À l'aspiration, retenez une perte de charge plus faible. À 2 L/min, le Q20 de 1/8″ consomme environ 1.0 bar, proche de la limite atmosphérique théorique ; celui de 1/4″ consomme environ 0.07 bar."
        },
        {
          "type": "paragraph",
          "text": "Vérifiez aussi l'étanchéité sous vide. L'air introduit au raccordement et le temps de purge peuvent modifier le premier volume délivré. Pour un lavage intermittent, dimensionnez sur le débit instantané pendant l'action, pas sur la consommation moyenne par minute."
        }
      ]
    },
    {
      "title": "Quel débit retenir pour un raccord alimentant plusieurs branches ?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Le raccord d'entrée commun doit laisser passer la somme des débits des branches actives simultanément :"
        },
        {
          "type": "formula",
          "expression": "Q_entrée = Q_branche1 + Q_branche2 + … (branches simultanément actives uniquement)"
        },
        {
          "type": "paragraph",
          "text": "Trois branches de lavage demandant chacune 0.5 L/min nécessitent 1.5 L/min lorsqu'elles fonctionnent ensemble. D'après Kv, un Q20 de 1/8″ produit environ 0.56 bar de perte, contre 0.04 bar pour le 1/4″. À l'aspiration, examinez d'abord le 1/4″ et vérifiez la marge de pression avec l'ensemble complet."
        },
        {
          "type": "paragraph",
          "text": "Si les branches fonctionnent successivement, retenez la demande maximale d'une étape. Un débit total suffisant ne garantit pas une répartition homogène : longueur des tubes, vannes et orifices des aiguilles créent des résistances différentes. Mesurez le débit à chaque sortie."
        }
      ]
    },
    {
      "title": "Peut-on utiliser les courbes de gaz pour un liquide ? Quel rôle joue la viscosité ?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Non. Les courbes de gaz donnent un débit volumique ramené aux conditions normales. Le gaz est compressible et son débit dépend aussi de la pression d'entrée. Les lois d'écoulement diffèrent : une conversion d'unités ne rend pas ces courbes interchangeables."
        },
        {
          "type": "paragraph",
          "text": "La densité relative figure déjà dans les équations précédentes. La viscosité demande une vérification distincte : les formulations contenant du glycérol, des protéines ou des sels concentrés peuvent être plus visqueuses que l'eau, notamment à basse température. Leur perte de charge peut dépasser les valeurs du tableau. Testez l'ensemble avec le liquide réel à sa température d'utilisation."
        }
      ]
    },
    {
      "title": "Comment vérifier le débit et la perte de charge après installation ?",
      "blocks": [
        {
          "type": "table",
          "headers": [
            "Contrôle",
            "Données à relever",
            "Objectif"
          ],
          "rows": [
            [
              "Configuration complète",
              "Références des deux moitiés, clapets, diamètre intérieur et longueur des tubes",
              "Comparer des ensembles équivalents"
            ],
            [
              "Perte de charge du raccord",
              "Pressions amont et aval au débit cible ; relever séparément le débit de sortie avant et après montage pour le contrôle fonctionnel",
              "Vérifier la marge de pression disponible"
            ],
            [
              "Une branche en service",
              "Débit de sortie, délai de démarrage et répétabilité des cycles",
              "Vérifier la réponse au besoin du procédé"
            ],
            [
              "Plusieurs branches simultanées",
              "Débit total, répartition et perte à l'entrée commune",
              "Vérifier la répartition des débits"
            ],
            [
              "Aspiration",
              "Pression d'entrée, bulles et alimentation à bas niveau",
              "Évaluer l'entrée d'air sous vide et la marge d'alimentation"
            ],
            [
              "Après utilisation du filtre",
              "Évolution du débit de sortie",
              "Évaluer la marge dans la durée"
            ],
            [
              "Redémarrage après désaccouplement",
              "Étanchéité, air introduit et temps de récupération après purge",
              "Évaluer l'effet de la maintenance sur les cycles suivants"
            ]
          ]
        }
      ]
    },
    {
      "title": "Lectures complémentaires sur les raccords rapides",
      "blocks": [
        {
          "type": "links",
          "items": [
            {
              "href": "/fr/resources/technical-articles/quick-disconnect-coupling-pressure-rating/",
              "label": "Pression des raccords rapides : température et connexion sous pression"
            },
            {
              "href": "/fr/resources/technical-articles/what-is-a-quick-disconnect-fitting/",
              "label": "Qu'est-ce qu'un raccord rapide ? Connexion mâle/femelle, clapets et sélection"
            },
            {
              "href": "/fr/resources/technical-articles/fitting-material-selection-guide/",
              "label": "Choisir le matériau d'un raccord : PP, PA, POM, PVDF et PEEK"
            },
            {
              "href": "/fr/resources/technical-articles/fluid-resistance-calculator-liquid-path-design-guide/",
              "label": "Calculateur de résistance hydraulique : débit et pertes de charge"
            }
          ],
          "ordered": true
        }
      ]
    }
  ],
  "faqTitle": "Questions fréquentes sur le débit et la perte de charge",
  "faqItems": [
    {
      "question": "Comment calculer le débit d'un raccord rapide ?",
      "answer": "Fixez la perte admissible et utilisez Q = Kv × √(ΔP ÷ SG), avec Q en m³/h et ΔP en bar. Vous pouvez aussi rejoindre la courbe depuis la perte admissible et lire le débit correspondant. Respectez les hypothèses d'écoulement du liquide indiquées plus haut."
    },
    {
      "question": "Quelle perte de charge est acceptable ?",
      "answer": "Il n'existe pas de seuil universel : il dépend de la pression disponible dans le circuit. Au refoulement, partez de la pression fournie par la pompe au débit cible. À l'aspiration, la marge utile est limitée ; une atmosphère plus la charge statique n'est qu'un plafond théorique pour un réservoir ouvert. Réduisez les pertes du raccord."
    },
    {
      "question": "Un raccordement plus gros augmente-t-il toujours le débit ?",
      "answer": "Dans une même série et à configuration de clapets identique, un raccordement plus gros réduit les pertes. À 2 L/min, le Q20 de 1/8″ donne environ 1.0 bar contre 0.07 bar pour le 1/4″. Les tubes, vannes et orifices limitent toujours le débit global ; évaluez le gain sur tout le circuit."
    },
    {
      "question": "Comment choisir un raccord rapide pour un débit élevé ?",
      "answer": "Définissez débit cible, perte admissible et pression maximale. Choisissez les moitiés, le diamètre et les clapets, puis consultez la courbe du liquide et vérifiez pression de service et température. Pour une entrée commune, additionnez les besoins simultanés et mesurez après montage la perte du raccord et le débit de chaque sortie."
    },
    {
      "question": "La courbe de gaz convient-elle pour choisir un raccord de liquide de lavage ?",
      "answer": "Non. Utilisez la courbe de liquide ou une estimation Kv suivie d'un essai. Gaz et liquides obéissent à des relations d'écoulement différentes."
    }
  ],
  "cta": {
    "title": "Définir le raccord adapté à votre circuit",
    "description": "Précisez le débit, le fluide, la température, la position —aspiration ou refoulement— et la perte admissible. Les ingénieurs FOREACH peuvent vous aider à choisir les moitiés, les raccordements et les clapets des séries Q20, Q40 et Q60.",
    "contactLabel": "Échanger sur la sélection",
    "productsLabel": "Voir les modèles de raccords rapides",
    "productsHref": "/fr/products/fittings/quick-connect-fittings/"
  }
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
