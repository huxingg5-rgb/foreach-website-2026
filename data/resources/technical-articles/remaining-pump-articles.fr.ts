import type { DiaphragmPumpEngineeringArticleCopy, DiaphragmPumpEngineeringArticleSlug } from "./diaphragm-pump-engineering-article.types";

export const remainingPumpArticlesFr = {
  "ink-circulation-supply-return-pump-diaphragm-pump": {
    "metadata": {
      "title": "Quelle différence entre une pompe de circulation, une pompe d’alimentation et une pompe de retour d’encre ?",
      "seoTitle": "Circulation, alimentation et retour d’encre : les pompes | FOREACH",
      "seoDescription": "Comprendre les fonctions des pompes d’encre, les architectures jet d’encre, la pression de tête, le débit installé et la validation des pompes à membrane.",
      "coverImage": "/images/resources/technical-articles/ink-circulation-supply-return-pump/ink-supply-return-circulation-cover.webp",
      "coverAlt": "Pompe à membrane miniature pour liquides FOREACH série DPL présentée dans une vidéo produit"
    },
    "deck": "Alimentation, retour et circulation d’encre désignent des fonctions hydrauliques, pas trois technologies mécaniques fixes. La pompe d’alimentation transporte l’encre vers un réservoir secondaire ou la tête ; la pompe de retour ramène l’encre inutilisée vers un réservoir ; la pompe de circulation entretient le débit dans une boucle. Le besoin d’une, deux ou plusieurs pompes dépend de la tête, des réservoirs, de la régulation par gravité ou dépression, des filtres et de l’architecture aller-retour.",
    "leadBlocks": [
      {
        "type": "notice",
        "label": "Réponse courte :",
        "text": "Ne déduisez pas le nombre de pompes de leur nom fonctionnel. Dessinez le trajet réel Réservoir → Alimentation → Réservoir secondaire / Amortisseur → Tête → Retour, puis définissez débit, pression, présence d’air et compatibilité des matériaux pour chaque tronçon."
      },
      {
        "type": "links",
        "items": [
          {
            "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
            "label": "catégorie des pompes à membrane miniatures pour liquides",
            "prefix": "Consultez la ",
            "suffix": " pour identifier les modèles à évaluer."
          }
        ]
      }
    ],
    "sections": [
      {
        "title": "1. Que signifient ces trois noms ?",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Nom fonctionnel",
              "Tâche habituelle",
              "Ce qu’il ne faut pas supposer"
            ],
            "rows": [
              [
                "Pompe d’alimentation en encre",
                "Transporte l’encre du réservoir principal vers un réservoir secondaire, un étage de régulation de pression ou la tête",
                "Elle ne met pas toujours directement la tête sous pression"
              ],
              [
                "Pompe de retour d’encre",
                "Ramène l’encre non éjectée du circuit aval vers un réservoir secondaire ou principal",
                "Tous les systèmes n’exigent pas une pompe de retour indépendante"
              ],
              [
                "Pompe de circulation d’encre",
                "Entretient un débit continu ou intermittent dans le réservoir, le filtre, les tubes et/ou la tête",
                "Elle ne correspond pas à une technologie ni à une position unique"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Une pompe peut assurer alimentation et circulation. Deux pompes peuvent piloter séparément alimentation et retour. D’autres systèmes établissent le point de fonctionnement par le niveau du réservoir secondaire, la gravité, la dépression pneumatique, les vannes et les amortisseurs. Ces noms décrivent les tâches du système, sans définir son architecture mécanique."
          }
        ]
      },
      {
        "title": "2. Faut-il toujours des pompes séparées pour l’alimentation et le retour ?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Non. Une architecture à deux pompes peut établir la pression différentielle de circulation en ajustant leurs vitesses relatives. Une architecture traditionnelle peut utiliser des réservoirs de charge d’alimentation et de retour, le niveau et la dépression pneumatique maintenant le ménisque de la tête. Certaines têtes sans circulation interne nécessitent un réapprovisionnement et un entretien, sans écoulement permanent à travers la tête."
          },
          {
            "type": "notice",
            "label": "Limite du schéma :",
            "text": "Le schéma explique des fonctions. Il ne constitue pas une architecture universelle pour toutes les imprimantes DOD, CIJ, à balayage ou à passage unique."
          }
        ]
      },
      {
        "title": "3. Pourquoi certains systèmes jet d’encre font-ils circuler l’encre ?",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Maintenir les pigments susceptibles de sédimenter en mouvement dans les zones efficacement parcourues et réduire les gradients locaux de concentration.",
              "Dans les têtes à circulation interne, amener l’écoulement près des buses pour réduire les risques de séchage, de précipitation ou de stagnation.",
              "Associer circulation, dégazage, filtration et régulation thermique pour stabiliser l’état de l’encre à la tête.",
              "Faciliter l’évacuation de l’air pendant l’amorçage, le réapprovisionnement ou l’entretien."
            ]
          },
          {
            "type": "paragraph",
            "text": "La circulation continue n’est pas nécessaire dans tous les systèmes jet d’encre. Les encres à colorants, les têtes sans circulation interne, les circuits courts ou les systèmes à cartouche/réservoir secondaire peuvent utiliser une circulation intermittente, limitée à l’encre blanche, ou une autre architecture d’entretien. Respectez les exigences de l’encre et de la tête."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/white-ink-circulation-pump-selection-sedimentation/",
                "label": "guide de circulation de l’encre blanche, de sédimentation des pigments et de zones mortes",
                "prefix": "Pour l’encre blanche, consultez le ",
                "suffix": "."
              }
            ]
          }
        ]
      },
      {
        "title": "4. Pourquoi utiliser des pompes à membrane miniatures dans les circuits d’encre ?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Dans un circuit OEM peu encombrant, une pompe à membrane miniature pour liquides peut assurer un transfert compact et auto-amorçant, avec un débit réglable par le moteur ou la commande du système. Elle peut être évaluée pour le réapprovisionnement principal, l’alimentation basse pression, le retour ou la circulation externe."
          },
          {
            "type": "notice",
            "label": "Performances propres au modèle :",
            "text": "La faible pulsation, l’aptitude à fonctionner à sec, la résistance à l’abrasion et aux solvants, ainsi que l’aptitude à faire circuler durablement de l’encre blanche doivent être démontrées pour le modèle et les conditions précis. Les données publiques actuelles de FOREACH ne prouvent pas à elles seules que DPL30 ou DPL60 convient à une encre donnée."
          }
        ]
      },
      {
        "title": "5. Pourquoi le débit libre ne suffit-il pas ?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Le débit libre correspond à une condition d’essai à faible résistance, pas au point de fonctionnement installé. La viscosité, la perte de charge du filtre, les modules de dégazage, le diamètre intérieur et la longueur des tubes, les raccords, les vannes, les passages de la tête et le dénivelé composent la résistance du système. Le débit installé résulte de l’intersection des courbes de la pompe et du système."
          },
          {
            "type": "formula",
            "expression": "Point de fonctionnement installé = Courbe de pompe ∩ Courbe du système",
            "note": "Mesurez-le avec l’encre prévue et le circuit complet."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "guide de la courbe débit-pression des pompes à membrane"
              },
              {
                "href": "/resources/technical-articles/300-vs-600-ml-min-ink-circulation-return-pump-selection/",
                "label": "guide de sélection d’une pompe d’encre de 300 ou 600 mL/min"
              }
            ]
          }
        ]
      },
      {
        "title": "6. Pourquoi une pression plus élevée n’est-elle pas préférable près de la tête ?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les têtes DOD exigent normalement un ménisque maîtrisé. Une pression positive excessive peut provoquer un suintement ou des gouttes ; une dépression excessive peut rétracter le ménisque, limiter le remplissage ou aspirer de l’air. La pression différentielle de circulation et la pression du ménisque sont liées, mais restent deux variables de régulation distinctes."
          },
          {
            "type": "notice",
            "label": "Limite d’application de DPL30H :",
            "text": "Une capacité haute pression de 600 kPa ne rend pas une pompe plus adaptée à l’alimentation directe d’une tête. N’évaluez une pompe haute pression que dans un étage de transfert à forte résistance, isolé de la zone de tête sensible à la pression, avec régulation, décharge de pression et essais de défaut."
          }
        ]
      },
      {
        "title": "7. Comment présélectionner DPL30 et DPL60 ?",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Série FOREACH",
              "Limites produit vérifiées",
              "Évaluation pour le jet d’encre"
            ],
            "rows": [
              [
                "DPL30",
                "Débit à vide de classe 300 mL/min ; pression nominale de 100 kPa ; diamètre intérieur du tube de 3.2 mm",
                "Candidat pour alimentation, retour ou circulation externe à débit plus faible ; consulter la courbe et valider les performances installées"
              ],
              [
                "DPL60",
                "Débit à vide de classe 600 mL/min ; pression nominale de 100 kPa ; diamètre intérieur du tube de 3.2 mm",
                "Candidat pour un débit cible supérieur ou une marge face à la résistance ; vérifier les effets du filtre et de la viscosité"
              ]
            ]
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump/",
                "label": "Page produit DPL30"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/dpl60-liquid-diaphragm-pump/",
                "label": "Page produit DPL60"
              }
            ]
          }
        ]
      },
      {
        "title": "8. La compatibilité avec chaque encre doit être validée séparément",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les encres aqueuses, à solvant, polymérisables aux UV et pigmentées diffèrent par leurs solvants, monomères, dispersants, particules, viscosités et températures. Le nom d’un matériau ne remplace pas les essais de concentration, température, durée d’immersion, circulation dynamique, démarrage-arrêt et précipitation."
          },
          {
            "type": "notice",
            "label": "Réponse directe :",
            "text": "DPL30 ou DPL60 n’est pas automatiquement compatible avec une encre blanche, UV ou à solvant parce que sa classe de débit paraît adaptée. La compatibilité avec l’encre précise doit être validée."
          }
        ]
      },
      {
        "title": "9. Liste de contrôle pour sélectionner la pompe du système jet d’encre",
        "blocks": [
          {
            "type": "list",
            "ordered": true,
            "items": [
              "Confirmer DOD ou CIJ, l’aptitude de la tête à la circulation interne et ses limites de pression d’alimentation, de retour et de ménisque.",
              "Représenter réservoir principal, réservoir secondaire, amortisseur, dégazeur, filtre, vannes et lignes d’alimentation et de retour.",
              "Définir le débit de travail en impression, veille, amorçage, nettoyage, purge d’air et redémarrage après arrêt.",
              "Estimer la résistance à la viscosité et à la température réelles de l’encre, puis examiner la courbe officielle de la pompe.",
              "Valider pulsations, bulles, encrassement du filtre, zones mortes, variations de niveau et défauts des capteurs de pression.",
              "Terminer les essais d’immersion des matériaux mouillés et de circulation dynamique prolongée avant de confirmer durée de vie et intervalles d’entretien."
            ]
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire/",
                "label": "guide de commande des pompes à membrane sans balais à 2 ou 5 fils",
                "prefix": "Pour intégrer la commande, consultez le ",
                "suffix": "."
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "FAQ sur la circulation, l’alimentation et le retour d’encre",
    "faqItems": [
      {
        "question": "Qu’est-ce qu’une pompe de circulation d’encre ?",
        "answer": "Ce nom fonctionnel désigne une pompe qui entretient le flux d’encre dans un réservoir, des tubes, un filtre et/ou une tête à circulation interne. Il ne définit ni une technologie mécanique ni une position unique."
      },
      {
        "question": "Qu’est-ce qu’une pompe de retour d’encre ?",
        "answer": "Elle ramène l’encre non éjectée depuis le circuit aval vers un réservoir secondaire ou principal. Une pompe de retour distincte n’est utilisée que si l’architecture l’exige."
      },
      {
        "question": "La pompe d’alimentation et la pompe de circulation sont-elles la même ?",
        "answer": "C’est possible. Une pompe d’alimentation peut créer la circulation ; un système à deux pompes peut réguler séparément alimentation et retour. Décidez à partir du circuit réel."
      },
      {
        "question": "Tous les systèmes jet d’encre ont-ils besoin de circulation continue ?",
        "answer": "Non. Cela dépend de la formulation de l’encre, de la circulation interne possible dans la tête, de la stratégie de veille et de l’entretien. Certains systèmes ne font circuler que l’encre blanche ou fonctionnent par intervalles."
      },
      {
        "question": "Pourquoi ne pas simplement augmenter la pression avant la tête ?",
        "answer": "Les buses exigent un ménisque stable. Une pression d’alimentation trop élevée peut provoquer un suintement ; une dépression excessive peut limiter le remplissage ou aspirer de l’air."
      },
      {
        "question": "Les valeurs de DPL30 et DPL60 correspondent-elles au débit de circulation installé ?",
        "answer": "Non. Les valeurs de 300 et 600 mL/min désignent des classes de débit à vide. Le débit installé dépend de la courbe de pompe, de la viscosité, du filtre, des tubes et de la différence de pression aller-retour."
      },
      {
        "question": "DPL30 est-elle automatiquement compatible avec l’encre blanche ?",
        "answer": "Non. La présélection ne peut d’abord porter que sur le débit et la pression. Compatibilité chimique, particules, sédimentation, circulation prolongée et redémarrage après arrêt doivent être validés."
      },
      {
        "question": "DPL30H convient-elle mieux à l’alimentation d’une tête grâce à sa pression plus élevée ?",
        "answer": "On ne peut pas le supposer. DPL30H est destinée aux circuits à forte résistance ; une haute pression n’est pas intrinsèquement adaptée à une tête sensible à la pression."
      }
    ],
    "cta": {
      "title": "Sélectionner la pompe à partir du circuit réel d’alimentation et de retour",
      "description": "Précisez type d’encre, viscosité et température, débit cible installé, plage de pression de la tête, filtre, tubes, position de la pompe et stratégie d’amorçage et d’arrêt.",
      "contactLabel": "Transmettre les conditions du circuit d’encre",
      "productsLabel": "Voir les pompes à membrane pour liquides",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  },
  "300-vs-600-ml-min-ink-circulation-return-pump-selection": {
    "metadata": {
      "title": "300 ou 600 mL/min : comment choisir une pompe de circulation ou de retour d’encre ?",
      "seoTitle": "Choisir une pompe d’encre de 300 ou 600 mL/min | FOREACH",
      "seoDescription": "Évaluez une pompe de circulation ou de retour d’encre de 300 ou 600 mL/min selon le débit cible, la courbe, la viscosité, le filtre, les tubes et les pressions aller-retour.",
      "coverImage": "/images/resources/technical-articles/ink-circulation-flow-selection/ink-pump-300-vs-600-flow-selection-cover.webp",
      "coverAlt": "Pompes à membrane miniatures pour liquides FOREACH DPL30 et DPL60 présentées dans une vidéo produit"
    },
    "deck": "Définissez le débit de travail requis dans le circuit de circulation ou de retour, puis calculez ou mesurez la pression différentielle du système à ce débit. Les valeurs de 300 mL/min pour DPL30 et 600 mL/min pour DPL60 sont des classes de débit à vide, pas des débits garantis avec encre, filtres, tubes et tête. Plus la cible approche la limite nominale, plus la courbe et les essais du circuit installé sont déterminants.",
    "leadBlocks": [
      {
        "type": "notice",
        "label": "Présélection rapide :",
        "text": "En dessous de 300 mL/min, évaluez d’abord DPL30. À partir de 300 mL/min, évaluez généralement DPL60 en premier. Ces plages identifient des candidats, sans garantir leurs performances."
      },
      {
        "type": "links",
        "items": [
          {
            "href": "/resources/technical-articles/ink-circulation-supply-return-pump-diaphragm-pump/",
            "label": "guide des fonctions d’alimentation, de retour et de circulation d’encre",
            "prefix": "Si la tâche de la pompe n’est pas définie, commencez par le ",
            "suffix": "."
          }
        ]
      }
    ],
    "sections": [
      {
        "title": "1. 300 ou 600 mL/min : commencer par cette présélection",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Débit de travail cible",
              "Premier candidat",
              "À vérifier"
            ],
            "rows": [
              [
                "0–100 mL/min",
                "DPL30 comme candidat",
                "Stabilité à basse vitesse, pulsation, commande et échauffement"
              ],
              [
                ">100–200 mL/min",
                "DPL30 comme candidat",
                "Point de la courbe à la pression différentielle cible"
              ],
              [
                ">200–<300 mL/min",
                "DPL30 comme candidat",
                "Marge en haut de plage ; évaluer aussi DPL60 si nécessaire"
              ],
              [
                "300–400 mL/min",
                "DPL60 comme candidat",
                "Filtre, viscosité et pression différentielle aller-retour"
              ],
              [
                ">400–500 mL/min",
                "DPL60 comme candidat",
                "Marge sur la courbe et état du filtre chargé"
              ],
              [
                ">500–600 mL/min",
                "DPL60 comme candidat",
                "Très proche de la limite à débit libre ; tester et envisager une pompe plus grande"
              ]
            ]
          },
          {
            "type": "notice",
            "label": "Seuil de 300 :",
            "text": "Si la cible est exactement 300 mL/min, ne supposez pas qu’une DPL30 de classe 300 mL/min l’atteindra. Sous une pression différentielle réelle, présélectionnez d’abord DPL60."
          }
        ]
      },
      {
        "title": "2. Le débit cible n’est pas le débit libre de la pompe",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Le débit cible est celui requis en impression, veille ou circulation sous la pression différentielle réelle. Le débit libre est mesuré près d’une limite à faible résistance, dans des conditions d’essai définies. Encre, filtres, tubes, vannes, raccords, dégazeurs et passages de la tête expliquent l’écart."
          },
          {
            "type": "formula",
            "expression": "Débit de travail cible ≠ Débit libre de la pompe",
            "note": "Seule l’intersection des courbes de pompe et de système constitue un point de fonctionnement installé vérifiable."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "guide des courbes débit-pression"
              },
              {
                "href": "/resources/technical-articles/300-vs-600-ml-min-diaphragm-pump-selection/",
                "label": "critères généraux de choix entre 300 et 600 mL/min"
              }
            ]
          }
        ]
      },
      {
        "title": "3. Comment viscosité, diamètre intérieur et longueur modifient-ils le débit ?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Pour un écoulement laminaire stationnaire idéal d’un fluide newtonien dans un tube droit circulaire, la relation de Hagen–Poiseuille explique la tendance : une viscosité, une longueur et un débit cible plus élevés demandent davantage de pression différentielle ; le diamètre intérieur a une influence particulièrement forte."
          },
          {
            "type": "formula",
            "expression": "ΔP ∝ μLQ / D⁴",
            "note": "μ désigne la viscosité dynamique, L la longueur, Q le débit et D le diamètre intérieur. Utilisez cette relation pour les tendances, pas comme modèle complet de sélection d’une pompe jet d’encre."
          },
          {
            "type": "paragraph",
            "text": "Un système réel comprend aussi filtres, raccords, vannes, coudes, dégazeurs, branches et passages complexes de la tête. Certaines encres ont un comportement non newtonien ou dépendant de la température. Utilisez l’équation pour une première étude de sensibilité, puis les courbes des composants et les pressions mesurées dans le circuit pour décider."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/tube-inner-diameter-affects-diaphragm-pump-flow/",
                "label": "pourquoi le diamètre intérieur influence fortement le débit"
              },
              {
                "href": "/resources/technical-articles/suction-vs-discharge-resistance-diaphragm-pump/",
                "label": "résistance à l’aspiration et au refoulement"
              }
            ]
          }
        ]
      },
      {
        "title": "4. Ne dimensionnez pas uniquement avec un filtre propre",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La perte de charge du filtre dépend du seuil de filtration, de la surface, du débit, de la viscosité, de la température et de l’encrassement. Les encres blanches ou très pigmentées ajoutent des enjeux de dispersion et de dépôts durables. Une pompe choisie uniquement avec un filtre propre peut perdre sa marge en service."
          },
          {
            "type": "list",
            "items": [
              "Relever la pression différentielle avec un filtre propre, normalement chargé et proche du seuil de remplacement.",
              "Mesurer ensemble pressions d’entrée et de sortie, débit, courant et température de l’encre.",
              "Respecter les exigences de filtration de la tête et du fournisseur d’encre ; ne pas compenser une filtration incorrecte par davantage de pression."
            ]
          }
        ]
      },
      {
        "title": "5. Les débits aller-retour sont indissociables de la régulation de pression",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Une tête DOD à circulation interne peut dépendre des pressions d’alimentation et de retour, de leur différence et de la pression du ménisque. Augmenter la circulation exige généralement plus de pression différentielle ; une commande ou un amortissement insuffisant peut perturber le ménisque, provoquer un suintement, limiter le remplissage, aspirer de l’air ou transmettre les pulsations."
          },
          {
            "type": "notice",
            "label": "Règle d’ingénierie :",
            "text": "Évaluez la pompe avec les réservoirs secondaires, amortisseurs, capteurs de pression, dispositifs de décharge ou de dérivation et la stratégie de commande. Ne supposez jamais que la pression maximale de la pompe peut être appliquée directement à la tête."
          }
        ]
      },
      {
        "title": "6. Limites vérifiées de DPL30 et DPL60",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Paramètre",
              "DPL30",
              "DPL60"
            ],
            "rows": [
              [
                "Classe de débit à vide",
                "300 mL/min",
                "600 mL/min"
              ],
              [
                "Pression nominale",
                "100 kPa",
                "100 kPa"
              ],
              [
                "Hauteur d’auto-amorçage",
                "6 mH₂O",
                "3 mH₂O"
              ],
              [
                "Raccordement standard",
                "Tube de diamètre intérieur 3.2 mm",
                "Tube de diamètre intérieur 3.2 mm"
              ],
              [
                "Conclusion jet d’encre",
                "Candidat à débit inférieur uniquement",
                "Candidat à débit supérieur uniquement"
              ]
            ]
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump/",
                "label": "Page DPL30, classe 300 mL/min"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/dpl60-liquid-diaphragm-pump/",
                "label": "Page DPL60, classe 600 mL/min"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "catégorie des pompes à membrane miniatures pour liquides"
              }
            ]
          },
          {
            "type": "notice",
            "label": "Limite de compatibilité :",
            "text": "Le tableau ne démontre ni compatibilité avec l’encre ni maintien du débit à vide à 100 kPa. La compatibilité avec l’encre précise doit être validée."
          }
        ]
      },
      {
        "title": "7. Validation conseillée sur banc et dans l’équipement",
        "blocks": [
          {
            "type": "list",
            "ordered": true,
            "items": [
              "Distinguer impression, veille, circulation, amorçage et nettoyage, chacun avec sa plage de débit et de pression.",
              "Mesurer la viscosité ou obtenir les données du fournisseur aux températures minimale, nominale et maximale de l’encre.",
              "Reproduire les tubes, filtres, vannes, raccords, dégazeur et dénivelés réels.",
              "Démarrer à basse vitesse et enregistrer débit, pressions aller-retour, ménisque, pulsation, courant et échauffement.",
              "Valider les filtres propres et chargés, le niveau bas du réservoir et les obstructions partielles.",
              "Effectuer des essais de circulation prolongée, de sédimentation au repos et de récupération au redémarrage avant de figer pompe et commande."
            ]
          }
        ]
      },
      {
        "title": "8. Quand chercher au-delà de DPL30 et DPL60 ?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Élargissez les candidats ou modifiez l’architecture si la cible approche ou dépasse 600 mL/min, si la pression différentielle ne laisse plus de marge sur la courbe DPL60, si la tête exige moins de pulsations, si l’encre contient des particules sensibles au cisaillement ou à l’abrasion, ou si le cycle de service est particulièrement exigeant. DPL60 ne doit pas être présentée comme une solution garantie."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/white-ink-circulation-pump-selection-sedimentation/",
                "label": "validation complémentaire pour la circulation d’encre blanche",
                "prefix": "Pour l’encre blanche, poursuivez avec la ",
                "suffix": "."
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "FAQ : choisir une pompe d’encre de 300 ou 600 mL/min",
    "faqItems": [
      {
        "question": "Comment choisir entre 300 et 600 mL/min pour circuler l’encre ?",
        "answer": "Définissez d’abord le débit de travail et la pression différentielle. En dessous de 300 mL/min, évaluez DPL30 en premier ; à partir de 300 mL/min, généralement DPL60. Validez ensuite la courbe et le circuit installé."
      },
      {
        "question": "Pourquoi ne pas utiliser directement le débit libre ?",
        "answer": "Filtres, viscosité, tubes, vannes, raccords et passages de la tête créent des pertes de charge. Le débit installé se trouve à l’intersection des courbes de pompe et de système."
      },
      {
        "question": "DPL30 garantit-elle un débit cible de 250 mL/min ?",
        "answer": "Non. 250 mL/min est proche de sa classe à vide de 300 mL/min. Vérifiez la courbe à la pression différentielle cible et envisagez DPL60 en parallèle."
      },
      {
        "question": "Peut-on choisir DPL30 pour une cible exactement égale à 300 mL/min ?",
        "answer": "Pas sur la seule valeur nominale. La perte de charge réelle supprime généralement la marge à débit libre : présélectionnez DPL60 et testez le circuit installé."
      },
      {
        "question": "DPL60 garantit-elle une circulation d’encre blanche à 500 mL/min ?",
        "answer": "Non. C’est seulement un candidat dans cette plage. Viscosité réelle, filtre, pression différentielle, compatibilité des matériaux et circulation prolongée doivent être validés."
      },
      {
        "question": "Pourquoi le diamètre intérieur est-il plus sensible que la longueur ?",
        "answer": "Dans la tendance idéale laminaire, la perte de charge est proportionnelle à la longueur et inversement proportionnelle à la quatrième puissance du diamètre intérieur. Les circuits réels exigent aussi les courbes des pertes locales et des composants."
      },
      {
        "question": "Quand mesurer la perte de charge du filtre ?",
        "answer": "Au minimum à l’état propre, normalement chargé et proche du remplacement, à la température réelle de l’encre et au débit cible."
      },
      {
        "question": "Une pression de pompe plus élevée compense-t-elle tout déficit de débit ?",
        "answer": "Non. La tête possède une plage de pression de ménisque et les composants ont leurs limites. Répartissez autrement résistance, capacité de pompe et régulation au lieu d’augmenter aveuglément la pression."
      }
    ],
    "cta": {
      "title": "Transformer 300 ou 600 mL/min en point de fonctionnement vérifié",
      "description": "Précisez débit cible, viscosité et température de l’encre, perte de charge du filtre, tubes, pressions aller-retour et cycles de fonctionnement et de repos.",
      "contactLabel": "Transmettre les conditions de débit d’encre",
      "productsLabel": "Comparer DPL30 et DPL60",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  },
  "white-ink-circulation-pump-selection-sedimentation": {
    "metadata": {
      "title": "Pourquoi la recirculation de l’encre blanche est-elle plus difficile et comment choisir sa pompe ?",
      "seoTitle": "Circulation d’encre blanche et sédimentation | FOREACH",
      "seoDescription": "Comprendre la sédimentation du TiO₂, le trajet et le débit, les zones mortes, les filtres, la viscosité, la pression et le redémarrage avant de présélectionner DPL30 ou DPL60.",
      "coverImage": "/images/resources/technical-articles/white-ink-circulation-pump/white-ink-circulation-dead-zone-cover.webp",
      "coverAlt": "Boucle d’encre blanche avec réservoir, pompe à membrane, filtre et branche limitant les zones mortes"
    },
    "deck": "L’encre blanche utilise généralement des pigments à indice de réfraction et masse volumique élevés pour assurer l’opacité. Le TiO₂ est courant, mais l’écart de densité, la dispersion, l’agglomération et le temps d’arrêt influencent la sédimentation. L’objectif n’est pas simplement d’augmenter le débit. Réservoir, tubes, filtre et région de la tête exigent un écoulement maîtrisé atteignant les zones mortes critiques, tout en respectant pression de tête, état de l’encre et compatibilité des matériaux.",
    "leadBlocks": [
      {
        "type": "notice",
        "label": "Réponse courte :",
        "text": "Choisissez la pompe avec la formulation de l’encre, la tête à circulation interne, le trajet, le filtre et la stratégie d’arrêt. DPL30 et DPL60 ne sont que des candidats par classe de débit. La compatibilité avec l’encre précise doit être validée."
      },
      {
        "type": "links",
        "items": [
          {
            "href": "/resources/technical-articles/ink-circulation-supply-return-pump-diaphragm-pump/",
            "label": "architecture d’alimentation, de retour et de circulation d’encre",
            "prefix": "Définissez d’abord la tâche de la pompe à l’aide de l’",
            "suffix": "."
          }
        ]
      }
    ],
    "sections": [
      {
        "title": "1. Pourquoi la sédimentation de l’encre blanche est-elle plus difficile à maîtriser ?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "L’encre blanche doit opacifier des supports sombres ou transparents et utilise souvent des pigments inorganiques tels que le TiO₂. Sa densité élevée crée un écart important avec le véhicule, favorisant la sédimentation gravitationnelle. Taille des particules, agglomération, dispersant, teneur en solides, viscosité du véhicule, température et durée d’arrêt modifient la stabilité réelle."
          },
          {
            "type": "notice",
            "label": "Les encres blanches ne sont pas toutes identiques :",
            "text": "Les encres blanches aqueuses, à solvant et UV ont des pigments, distributions de taille, dispersions et rhéologies différents. Ne supposez pas qu’elles sont toutes très visqueuses ou présentent une vitesse de sédimentation fixe."
          }
        ]
      },
      {
        "title": "2. Que décrit le modèle de sédimentation de Stokes ?",
        "blocks": [
          {
            "type": "formula",
            "expression": "Vₛ ∝ (ρp − ρf)d² / μ",
            "note": "La tendance indique qu’un écart de densité ou une taille de particule/agglomérat plus élevés accélèrent la sédimentation, tandis qu’une viscosité supérieure de la phase continue la réduit."
          },
          {
            "type": "paragraph",
            "text": "La relation suppose des particules idéales et une suspension diluée. Une encre blanche concentrée peut présenter distribution de tailles, interactions, floculation, thixotropie, écoulement non newtonien et sédimentation entravée. Utilisez Stokes pour expliquer les tendances, pas pour calculer le débit de circulation ni remplacer les données du fournisseur et les essais en boucle."
          }
        ]
      },
      {
        "title": "3. Quels sont les objectifs de la circulation d’encre blanche ?",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Réduire les gradients locaux de concentration de pigment dans les réservoirs, tubes et passages de la tête.",
              "Dans les têtes à circulation interne, maintenir près des buses le mouvement des fluides qui sédimentent ou sèchent rapidement.",
              "Associer agitation, régulation thermique, dégazage et filtration pour stabiliser l’état de l’encre.",
              "Améliorer la réhomogénéisation et le redémarrage après repos, sans supposer que tout dépôt dur peut être redispersé."
            ]
          },
          {
            "type": "paragraph",
            "text": "La circulation réduit le risque de sédimentation, mais ne corrige pas une formulation instable, une filtration incorrecte, des dépôts durcis ou des zones stagnantes. L’agitation du réservoir et la circulation externe sont des tâches distinctes pouvant exiger des actionneurs différents."
          }
        ]
      },
      {
        "title": "4. Pourquoi les zones mortes comptent-elles plus qu’un seul chiffre de débit ?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Même si la boucle principale atteint le débit cible, les extrémités de branches, cavités de vannes, ressauts de raccords, coins de réservoir, points bas, volumes surdimensionnés et dérivations peuvent rester presque stagnants. Raccourcissez les branches aveugles, réduisez le volume retenu, évitez les points bas d’accumulation et vérifiez que l’écoulement atteint la zone de tête à protéger."
          }
        ]
      },
      {
        "title": "5. Pourquoi ne pas simplement augmenter le débit d’encre blanche ?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Un débit supérieur améliore le renouvellement à certains endroits, mais augmente les pertes de charge des filtres et petits tubes. Sans régulation aller-retour adaptée, les perturbations atteignent le ménisque. Une vitesse excessive peut également accroître pulsation, mousse, dégagement de gaz, échauffement ou usure des particules et pièces mouillées. Pour les encres UV, respectez les limites du fournisseur concernant lumière, température et exposition des matériaux."
          },
          {
            "type": "notice",
            "label": "Objectif approprié :",
            "text": "Trouvez la circulation minimale efficace couvrant les trajets critiques, respectant la plage de pression de la tête et conservant une marge pour l’encrassement du filtre, plutôt que la vitesse maximale de pompe."
          }
        ]
      },
      {
        "title": "6. Comment filtre, viscosité, pression et pigment interagissent-ils ?",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Variable",
              "Effet sur la circulation d’encre blanche",
              "Validation"
            ],
            "rows": [
              [
                "Viscosité et température",
                "Modifient la perte de charge des tubes, le point de pompe et l’état de projection",
                "Mesurer viscosité, débit et pression sur toute la plage thermique"
              ],
              [
                "Filtre",
                "La perte de charge augmente avec débit, viscosité et encrassement ; le seuil de filtration dépend aussi de la tête",
                "Tester les états propre, normalement chargé et proche du remplacement"
              ],
              [
                "Pigment/agglomérats",
                "Influencent sédimentation, obstruction et risque d’abrasion",
                "Observer taille, dispersion, sédimentation et circulation prolongée"
              ],
              [
                "Pressions aller-retour",
                "Définissent le différentiel de circulation et influencent le ménisque",
                "Mesurer ensemble alimentation, retour, pression différentielle et état de tête"
              ],
              [
                "Tubes/trajet",
                "Déterminent répartition des vitesses, pertes de charge et zones mortes",
                "Utiliser un circuit d’essai transparent, des mesures de pression par tronçon et des contrôles d’équilibrage"
              ]
            ]
          }
        ]
      },
      {
        "title": "7. DPL30 ou DPL60 peut-elle servir de pompe d’encre blanche ?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "DPL30 ou DPL60 peut figurer parmi les premiers candidats selon le débit cible et la classe de pression de 100 kPa, mais aucune ne doit être présentée comme une pompe d’encre blanche déjà validée. DPL30 est de classe 300 mL/min et DPL60 de classe 600 mL/min ; ces valeurs sont des débits à vide, pas les débits installés avec l’encre blanche."
          },
          {
            "type": "table",
            "headers": [
              "Candidat",
              "Fait vérifié pour la présélection",
              "Encore à vérifier"
            ],
            "rows": [
              [
                "DPL30",
                "Classe 300 mL/min ; 100 kPa",
                "Point de fonctionnement, stabilité à basse vitesse, pulsation, particules et matériaux mouillés"
              ],
              [
                "DPL60",
                "Classe 600 mL/min ; 100 kPa",
                "Point de fonctionnement, marge du filtre, circulation prolongée et matériaux"
              ],
              [
                "DPL30H",
                "Classe 300 mL/min ; positionnement haute pression à 600 kPa",
                "La haute pression n’implique pas la compatibilité avec la tête ; ce n’est pas le candidat par défaut ici"
              ]
            ]
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump/",
                "label": "Page produit DPL30"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/dpl60-liquid-diaphragm-pump/",
                "label": "Page produit DPL60"
              },
              {
                "href": "/resources/technical-articles/300-vs-600-ml-min-ink-circulation-return-pump-selection/",
                "label": "choix du débit d’encre entre 300 et 600 mL/min"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "catégorie des pompes à membrane miniatures pour liquides"
              }
            ]
          },
          {
            "type": "notice",
            "label": "Point à retenir explicitement :",
            "text": "DPL30 n’est pas automatiquement compatible avec l’encre blanche et DPL60 n’est pas une pompe d’encre blanche par défaut. La compatibilité avec l’encre précise exige une validation."
          }
        ]
      },
      {
        "title": "8. Pourquoi tester circulation prolongée et redémarrage après arrêt ?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Un bref essai à l’eau ne représente pas l’exposition durable aux pigments, solvants ou monomères, dispersants et températures. Les essais dynamiques doivent suivre débit, pression différentielle, pulsation, courant, échauffement, évolution des matériaux, dépôts et charge du filtre. Les essais au repos doivent couvrir sédimentation, accumulation aux points bas, collage des vannes et temps de réhomogénéisation."
          },
          {
            "type": "list",
            "items": [
              "Utiliser des cycles de fonctionnement, veille et mise hors tension représentatifs de l’imprimante.",
              "Comparer la concentration ou des indicateurs optiques à plusieurs points de prélèvement avant et après repos.",
              "Valider séquence de redémarrage, durée d’agitation/circulation, purge d’air, différentiel du filtre et état de tête.",
              "Inspecter tubes, tête de pompe, membrane, vannes, joints et assemblages collés pour détecter variations dimensionnelles, de dureté, gonflement, fissuration ou extraction de constituants."
            ]
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/300-ml-min-micro-liquid-diaphragm-pump-epdm-ptfe-ffkm/",
                "label": "guide de validation des matériaux EPDM, PTFE et FFKM",
                "prefix": "Pour présélectionner les matériaux, consultez le ",
                "suffix": "."
              }
            ]
          }
        ]
      },
      {
        "title": "9. Liste de contrôle pour choisir la pompe d’encre blanche",
        "blocks": [
          {
            "type": "list",
            "ordered": true,
            "items": [
              "Demander au fournisseur le système pigmentaire, les données viscosité-température, la filtration et les conditions admissibles de cisaillement et circulation.",
              "Confirmer la circulation interne de la tête, le différentiel admissible et la plage du ménisque.",
              "Repérer agitation du réservoir, boucle principale, branches, tête, points bas et toutes les zones mortes.",
              "Évaluer DPL30, DPL60 ou d’autres candidats à partir des courbes ; ne jamais assimiler débit libre et point de fonctionnement.",
              "Valider filtres propres et chargés, changements de niveau, bulles, défauts de pression et plage thermique.",
              "Terminer circulation prolongée, sédimentation au repos, récupération au redémarrage et essais des matériaux mouillés avant mise en service."
            ]
          }
        ]
      }
    ],
    "faqTitle": "FAQ sur la circulation d’encre blanche",
    "faqItems": [
      {
        "question": "Pourquoi faire circuler l’encre blanche ?",
        "answer": "La circulation réduit localement sédimentation et gradients de concentration des pigments denses dans les réservoirs, tubes et têtes à circulation interne, tout en soutenant régulation thermique, filtration et purge d’air."
      },
      {
        "question": "Pourquoi le TiO₂ tend-il à sédimenter ?",
        "answer": "Sa densité diffère fortement de celle du véhicule. Selon la tendance idéale, des particules ou agglomérats plus grands sédimentent plus vite ; dispersion, concentration en solides et rhéologie modifient le comportement réel."
      },
      {
        "question": "La circulation peut-elle supprimer toute sédimentation ?",
        "answer": "Ce n’est pas garanti. Elle réduit la sédimentation dans les zones efficacement parcourues, mais une formulation instable, des dépôts durs et des zones mortes restent problématiques."
      },
      {
        "question": "Un débit de circulation supérieur est-il toujours meilleur ?",
        "answer": "Non. Il augmente les pertes de charge et peut affecter tête, pulsation, mousse, température ou usure. Validez la condition minimale efficace."
      },
      {
        "question": "Qu’est-ce qu’une zone morte dans une boucle d’encre blanche ?",
        "answer": "Une région à faible débit ou stagnante : branche aveugle, point bas, cavité de vanne, coin de réservoir ou passage de tête non atteint par la recirculation."
      },
      {
        "question": "La loi de Stokes fixe-t-elle directement le débit de circulation ?",
        "answer": "Non. Elle explique une tendance idéale de sédimentation. Les interactions, agglomérats et comportements non newtoniens d’une encre concentrée nécessitent des essais."
      },
      {
        "question": "DPL30 est-elle automatiquement compatible avec l’encre blanche ?",
        "answer": "Non. C’est seulement un candidat de classe 300 mL/min. Matériaux, particules, filtration, circulation prolongée et redémarrage doivent être validés."
      },
      {
        "question": "Suffit-il de redémarrer la pompe après un arrêt ?",
        "answer": "Pas toujours. Agitation du réservoir, circulation progressive à basse vitesse, purge d’air et entretien de tête peuvent aussi être nécessaires. Déterminez la séquence par essais de l’encre et du système."
      }
    ],
    "cta": {
      "title": "Valider la pompe et la boucle avec l’encre blanche réelle",
      "description": "Précisez chimie de l’encre, pigments et particules, données viscosité-température, plage de pression de la tête, trajet de circulation, filtre et cycle de repos.",
      "contactLabel": "Transmettre les conditions de circulation d’encre blanche",
      "productsLabel": "Voir les pompes à membrane pour liquides",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  },
  "300-ml-min-micro-liquid-diaphragm-pump-self-priming-loss": {
    "metadata": {
      "title": "Pourquoi une pompe à membrane miniature de 300 mL/min perd-elle son auto-amorçage avec le temps ?",
      "seoTitle": "Perte d’auto-amorçage d’une pompe de 300 mL/min | FOREACH",
      "seoDescription": "Diagnostiquer clapets non étanches, prises d’air, pertes à l’aspiration, pression de vapeur et évolution des matériaux d’une pompe à membrane miniature.",
      "coverImage": "/images/resources/technical-articles/dpl30-troubleshooting/300-ml-min-liquid-diaphragm-pump-self-priming-test.webp",
      "coverAlt": "Pompe à membrane miniature pour liquides FOREACH DPL30 de 300 mL/min"
    },
    "deck": "La perte d’auto-amorçage signifie que la pompe et son circuit d’aspiration ne créent et ne maintiennent plus la même faible pression absolue à l’entrée qu’à l’origine. Fuite des clapets, prise d’air, pertes accrues à l’aspiration, pression de vapeur et évolution des matériaux peuvent produire le même symptôme. La seule rotation du moteur ne permet pas d’en identifier la cause.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "L’auto-amorçage n’est pas une hauteur fixe indépendante des conditions. Il dépend de la pression absolue minimale créée à l’entrée, de la pression en surface, de la hauteur, des pertes de ligne, de la température et de la pression de vapeur du liquide."
      },
      {
        "type": "notice",
        "label": "Définir le périmètre :",
        "text": "L’article concerne le transfert de liquides. Les 300 mL/min de DPL30 désignent le débit libre ; ses 6 mH₂O d’auto-amorçage sont une performance mesurée dans des conditions spécifiées. Aucun des deux n’est une garantie inconditionnelle pour tout circuit et tout liquide."
      }
    ],
    "sections": [
      {
        "title": "1. Traduire la hauteur d’auto-amorçage en bilan de pression",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Pendant l’aspiration, la membrane agrandit la chambre et abaisse la pression absolue à l’entrée. Le liquide entre seulement si la pression au-dessus de sa surface surmonte la hauteur hydrostatique et toutes les pertes d’aspiration."
          },
          {
            "type": "formula",
            "expression": "ΔP_h = ρgh",
            "note": "Pour de l’eau proche de 20 °C, une colonne de 6 m représente environ 58.7 kPa de différence statique. Tubes, raccords, vannes, filtres et rétrécissements locaux ajoutent des pertes."
          },
          {
            "type": "formula",
            "expression": "H_available ≈ (P_surface,abs − P_in,min,abs − ΔP_suction loss) / (ρg)",
            "note": "Ce modèle aide à comprendre la marge d’aspiration ; ce n’est pas une équation de réception DPL30. Une perte de 10 kPa de capacité utile de dépression équivaut à environ 1.02 m de colonne d’eau."
          },
          {
            "type": "notice",
            "label": "Interprétation diagnostique :",
            "text": "Tout changement augmentant la pression minimale d’entrée ou les pertes d’aspiration peut réduire la hauteur, allonger le premier amorçage ou empêcher le redémarrage d’un circuit sec."
          }
        ]
      },
      {
        "title": "2. Un clapet peut bouger sans assurer l’étanchéité",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les clapets d’entrée et de sortie doivent s’ouvrir, se fermer et retenir le différentiel à chaque cycle. Particules, résidus cristallisés, liquide séché, usure ou faible déformation peuvent laisser un clapet visuellement intact, mais fuyard après fermeture."
          },
          {
            "type": "paragraph",
            "text": "La fuite inverse dissipe une partie du différentiel créé par la membrane. L’étanchéité des clapets, le volume retenu et la présence de vapeur ou de gaz influencent débit utile et auto-amorçage. Cette explication du mécanisme n’est pas une donnée de performance DPL30."
          },
          {
            "type": "notice",
            "label": "À mesurer :",
            "text": "Vérifiez la vitesse de baisse de pression à l’entrée, sa remontée après arrêt et le rétablissement de la hauteur et du débit après nettoyage. L’inspection visuelle ne suffit pas."
          }
        ]
      },
      {
        "title": "3. Une prise d’air à l’aspiration peut ne jamais laisser sortir de liquide",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Pendant l’amorçage, l’entrée est normalement sous la pression atmosphérique. Un tuyau vieilli, collier desserré, plan de joint rayé ou raccord de bouchon fuyard peut aspirer de l’air sans fuite de liquide vers l’extérieur, réduisant hauteur, pression ou débit."
          },
          {
            "type": "formula",
            "expression": "Q_pump = Q_liquid + Q_air leak",
            "note": "Dans cette approximation diagnostique, l’air occupe une partie du volume aspiré disponible pour le liquide. Les volumes doivent être comparés à une même pression de référence ; la compressibilité du gaz empêche d’en faire un modèle diphasique complet."
          },
          {
            "type": "paragraph",
            "text": "Cela explique un fonctionnement après remplissage manuel, mais des difficultés après vidange complète. L’amorçage à sec commence avec un circuit rempli d’air et dépend davantage de l’étanchéité des clapets et de l’entrée."
          }
        ]
      },
      {
        "title": "4. Température, pression de vapeur et pertes d’aspiration comptent aussi",
        "blocks": [
          {
            "type": "formula",
            "expression": "P_in,abs > P_vapour + P_margin",
            "note": "La pression locale d’entrée doit dépasser la pression de vapeur avec une marge d’ingénierie ; sinon dégazage, vaporisation et cavitation peuvent apparaître."
          },
          {
            "type": "paragraph",
            "text": "Des tubes longs ou étroits, coudes, vannes et filtres augmentent les pertes ; une température plus élevée augmente la pression de vapeur, une viscosité supérieure accroît la perte de charge. La même pompe peut donc réagir différemment avec de l’eau à 20 °C, une solution chaude de nettoyage, un réactif alcoolisé ou une formulation tensioactive."
          },
          {
            "type": "notice",
            "label": "Ne classez pas toute bulle comme une prise d’air :",
            "text": "Les bulles peuvent provenir d’une fuite extérieure, de gaz dissous libérés ou d’une vaporisation locale. Relevez pression absolue d’entrée, température, premier lieu d’apparition et effet d’un liquide dégazé."
          }
        ]
      },
      {
        "title": "5. De faibles changements de matériau peuvent d’abord modifier l’étanchéité",
        "blocks": [
          {
            "type": "paragraph",
            "text": "ISO 1817 décrit les effets des liquides sur le caoutchouc : absorption, extraction de constituants solubles et réaction chimique. Même sans fissure visible, les changements de volume, masse, dureté ou retour élastique peuvent modifier le contact clapet-siège."
          },
          {
            "type": "formula",
            "expression": "ΔV, Δm, ΔH + étanchéité dynamique",
            "note": "L’immersion compare l’évolution des matériaux, mais clapets et membranes nécessitent une validation dynamique de la pompe complète avec liquide, température, différentiel et nombre de cycles réels."
          },
          {
            "type": "paragraph",
            "text": "Les données officielles DPL30 indiquent deux associations mouillées : membrane EPDM, clapets EPDM et tête PPS ; ou membrane PTFE, clapets FFKM et tête PPS. Ces noms servent à présélectionner, pas à prouver une compatibilité universelle avec les réactifs."
          }
        ]
      },
      {
        "title": "6. Séparer pompe et instrument à l’aide d’une boucle de référence",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Gardez la même pompe, la même alimentation et le liquide d’essai spécifié. Remplacez l’entrée par un tube court, de grand diamètre et étanche, avec la surface du liquide proche de l’entrée. Faites-le avant d’ouvrir la pompe ou de remplacer le moteur."
          },
          {
            "type": "table",
            "headers": [
              "Résultat de référence",
              "Évolution de pression d’entrée",
              "Contrôles prioritaires"
            ],
            "rows": [
              [
                "Auto-amorçage rétabli",
                "Dépression établie à la vitesse initiale",
                "Tubes d’aspiration de l’instrument, évent du flacon, filtre, vannes, raccords et hauteur"
              ],
              [
                "Toujours inférieur à l’état initial",
                "Pression minimale plus haute ou baisse plus lente",
                "Contamination de tête, étanchéité des clapets, course de membrane et évolution des matériaux"
              ],
              [
                "Remontée rapide après arrêt",
                "Mauvaise tenue de pression",
                "Prise d’air externe ou fuite inverse interne ; isoler les tronçons pour les distinguer"
              ],
              [
                "L’eau fonctionne, mais pas le liquide de procédé",
                "Bulles ou pression instable",
                "Pression de vapeur, viscosité, dégazage et compatibilité des matériaux"
              ]
            ]
          },
          {
            "type": "list",
            "items": [
              "Temps de premier amorçage et hauteur maximale stable",
              "Pression absolue minimale d’entrée et temps pour l’atteindre",
              "Débit réel, tension d’alimentation, courant et température du liquide",
              "Tendance de remontée de pression après arrêt",
              "Mesures comparables à 0 h, à mi-vie et en fin de vie"
            ]
          }
        ]
      }
    ],
    "faqTitle": "FAQ | Perte d’auto-amorçage d’une pompe miniature de 300 mL/min",
    "faqItems": [
      {
        "question": "La baisse d’auto-amorçage signifie-t-elle toujours que le moteur vieillit ?",
        "answer": "Non. Prises d’air, clapets contaminés ou fuyards, résistance accrue, température et pression de vapeur, ou évolution des matériaux peuvent précéder une panne moteur. Comparez d’abord la trace de pression et une boucle de référence."
      },
      {
        "question": "Pourquoi fonctionne-t-elle après amorçage humide, mais pas à sec ?",
        "answer": "Le démarrage à sec exige une faible pression à travers un circuit rempli d’air, donc une bonne étanchéité des clapets et de l’entrée. Le préremplissage réduit cette exigence et peut masquer temporairement une petite fuite."
      },
      {
        "question": "Peut-on exclure une prise d’air en l’absence de fuite de liquide ?",
        "answer": "Non. Un raccord sous pression atmosphérique peut aspirer de l’air sans laisser sortir de liquide. Utilisez isolement par tronçon, tenue de pression ou référence à tube court."
      },
      {
        "question": "Les 6 mH₂O garantissent-ils une remontée de 6 m après installation ?",
        "answer": "Non. La valeur dépend des conditions d’essai. Tubes, raccords, vannes, filtres, propriétés du liquide, alimentation et dispersion entre échantillons consomment la marge."
      },
      {
        "question": "Que signifie une remontée rapide de pression après arrêt ?",
        "answer": "Une mauvaise tenue due à une prise d’air externe ou une fuite inverse interne. Isolez la pompe du circuit d’aspiration extérieur pour localiser la cause."
      }
    ],
    "cta": {
      "title": "Diagnostiquer une baisse d’auto-amorçage DPL30",
      "description": "Fournissez temps d’amorçage initiaux et actuels, traces de pression, hauteur, dimensions des tubes, liquide, température, alimentation et heures d’usage pour séparer les causes liées à la tête, aux matériaux et au circuit.",
      "contactLabel": "Contacter un ingénieur",
      "productsLabel": "Voir la pompe à membrane miniature DPL30",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump"
    }
  },
  "300-ml-min-micro-liquid-diaphragm-pump-motor-runs-no-flow": {
    "metadata": {
      "title": "Le moteur d’une pompe à membrane miniature de 300 mL/min tourne sans débit : que vérifier d’abord ?",
      "seoTitle": "Le moteur tourne, mais la pompe ne débite pas | FOREACH",
      "seoDescription": "Diagnostiquer l’absence de débit par les prises d’air, obstructions, clapets, contre-pression et courant moteur.",
      "coverImage": "/images/resources/technical-articles/dpl30-troubleshooting/300-ml-min-liquid-diaphragm-pump-motor-power-check.webp",
      "coverAlt": "Pompe à membrane miniature FOREACH DPL30 utilisée pour diagnostiquer un circuit liquide"
    },
    "deck": "La rotation du moteur confirme l’activité de l’entraînement, pas le remplissage effectif, l’action directionnelle des clapets ni une charge de refoulement admissible. Le diagnostic le plus rapide associe pression d’entrée, pression de sortie, débit et courant, au lieu de se fier seulement au bruit.",
    "leadBlocks": [
      {
        "type": "formula",
        "expression": "Q_net ≈ fV_sη_fillη_valve − Q_leak",
        "note": "Ce modèle diagnostique distingue fréquence, volume utile par course, efficacité de remplissage, efficacité des clapets et fuite. Ce n’est pas une équation produit DPL30."
      },
      {
        "type": "notice",
        "label": "Intervenir en sécurité :",
        "text": "Coupez l’alimentation et dépressurisez avant d’ouvrir tubes ou tête de pompe. Vidangez et décontaminez selon le risque chimique ou biologique réel."
      }
    ],
    "sections": [
      {
        "title": "1. Un moteur en marche ne prouve pas le pompage",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Une pompe à membrane exige une course effective, le remplissage de chambre, l’action directionnelle des clapets et assez de pression pour vaincre le différentiel du système. Toute défaillance peut laisser le moteur audible avec une sortie sèche."
          },
          {
            "type": "paragraph",
            "text": "Ramenez le symptôme à deux mesures : l’entrée crée-t-elle une dépression et la sortie une pression anormale ? Elles cernent généralement la panne plus vite qu’un démontage immédiat."
          }
        ]
      },
      {
        "title": "2. Dépression faible ou absente : contrôler fuites, clapets et course",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Si la pression baisse à peine sans entrée de liquide, vérifiez prises d’air, orifices inversés, clapets non étanches, contamination de tête et mouvement de membrane ou transmission sans déplacement utile."
          },
          {
            "type": "paragraph",
            "text": "Raccords non étanches, particules dans la tête, vanne fermée, filtre obstrué et pièces incompatibles avec le liquide causent souvent défaut d’amorçage ou faibles performances. Isolez ces variables une à une."
          },
          {
            "type": "notice",
            "label": "Essai rapide :",
            "text": "Utilisez un tube d’entrée transparent, court et étanche ; confirmez sens du débit et niveau de source, puis réessayez. Inspectez la tête seulement si la dépression reste impossible."
          }
        ]
      },
      {
        "title": "3. Forte dépression sans liquide : inspecter le trajet source-pompe",
        "blocks": [
          {
            "type": "formula",
            "expression": "P_in,abs = P_tank,abs − ρgh − ΔP_tube − ΣΔP_components",
            "note": "La pression d’entrée dépend du réservoir, de la hauteur et des pertes des tubes et composants. Un récipient fermé sans apport d’air voit P_tank,abs diminuer au prélèvement."
          },
          {
            "type": "paragraph",
            "text": "Une forte dépression suggère que la pompe aspire, mais que l’alimentation est limitée. Vérifiez filtre d’entrée, tube écrasé ou plié, ouverture des vannes, évent du flacon, niveau et hauteur."
          },
          {
            "type": "list",
            "ordered": true,
            "items": [
              "Mettre la source à l’air lorsque le procédé le permet.",
              "Raccourcir et élargir l’entrée et réduire la hauteur inutile.",
              "Contourner temporairement filtres et vannes non critiques, puis les rétablir un à un.",
              "Relever pression d’entrée et délai avant débit après chaque modification."
            ]
          }
        ]
      },
      {
        "title": "4. Le liquide entre sans ressortir : vérifier contre-pression et restrictions",
        "blocks": [
          {
            "type": "formula",
            "expression": "ΔP_pump = P_out − P_in",
            "note": "La pompe doit vaincre le différentiel total entrée-sortie, pas uniquement la pression relative de sortie."
          },
          {
            "type": "paragraph",
            "text": "Sortie bouchée, filtre chargé, vanne fermée, aiguille fine, buse ou récipient pressurisé peuvent augmenter la pression de refoulement. Vannes, buses, tubes et raccords modifient aussi la contre-pression et le point de fonctionnement."
          },
          {
            "type": "notice",
            "label": "Limite de la valeur nominale :",
            "text": "Les 300 mL/min de DPL30 sont un débit libre, pas un débit garanti sous toute contre-pression. Évaluez un circuit résistant à son débit cible et à son différentiel total."
          }
        ]
      },
      {
        "title": "5. Cerner la panne par les pressions d’entrée et de sortie",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Symptôme",
              "Pression d’entrée",
              "Pression de sortie",
              "Contrôles prioritaires"
            ],
            "rows": [
              [
                "Moteur en marche sans amorçage",
                "Presque aucune dépression",
                "Faible",
                "Prise d’air, orifices inversés, étanchéité des clapets, course de membrane"
              ],
              [
                "La dépression augmente sans arrivée de liquide",
                "Nettement plus basse",
                "Faible",
                "Entrée obstruée, hauteur excessive, source sans évent"
              ],
              [
                "Entrée de liquide mais faible débit de sortie",
                "Proche de la référence",
                "Élevée",
                "Vanne de sortie, filtre, aiguille, buse ou contre-pression"
              ],
              [
                "Débit et bulles fluctuants",
                "Fluctuante",
                "Peut fluctuer simultanément",
                "Prise d’air, dégazage, vaporisation ou cavitation"
              ],
              [
                "Amorçage humide réussi, sec impossible",
                "Insuffisante au démarrage à sec",
                "Rétablie une fois mouillée",
                "Étanchéité interne/externe et fermeture des clapets"
              ]
            ]
          }
        ]
      },
      {
        "title": "6. Ajouter le courant moteur sans l’utiliser seul",
        "blocks": [
          {
            "type": "formula",
            "expression": "Enregistrer : P_in(t) + P_out(t) + Q(t) + I(t)",
            "note": "Ensemble, ces signaux distinguent résistance du circuit, défaut de pompage et variation de charge de l’entraînement."
          },
          {
            "type": "paragraph",
            "text": "Fonctionnement à vide, charge liquide normale, forte contre-pression et blocage mécanique donnent souvent des traces de courant différentes. Le courant dépend aussi de l’alimentation, du moteur et de la commande : comparez des conditions équivalentes sans en faire un verdict isolé."
          },
          {
            "type": "list",
            "ordered": true,
            "items": [
              "Confirmer liquide source, sens des orifices, tension spécifiée et sortie ouverte.",
              "Établir une référence à l’eau avec tube court et relever les quatre signaux.",
              "Rétablir les composants d’entrée un à un pour localiser le défaut d’aspiration.",
              "Rétablir les composants de sortie un à un pour localiser la contre-pression.",
              "Ouvrir la tête seulement après isolement du circuit externe."
            ]
          }
        ]
      }
    ],
    "faqTitle": "FAQ | Le moteur tourne, mais aucun liquide ne sort",
    "faqItems": [
      {
        "question": "Un bruit moteur normal prouve-t-il le bon état de la pompe ?",
        "answer": "Non. Il ne prouve ni course utile, remplissage, étanchéité des clapets, ni différentiel admissible du système."
      },
      {
        "question": "Pourquoi une forte dépression peut-elle orienter d’abord ailleurs que vers la pompe ?",
        "answer": "Elle montre que la pompe crée l’aspiration. Source sans évent, entrée bouchée, hauteur excessive ou tube écrasé deviennent prioritaires."
      },
      {
        "question": "Faut-il augmenter la tension pour forcer le liquide ?",
        "answer": "Non. Vérifiez la tension spécifiée et localisez d’abord restriction ou contre-pression. Augmenter la tension peut surcharger moteur, transmission ou tête."
      },
      {
        "question": "Pourquoi les 300 mL/min disparaissent-ils quand la sortie est restreinte ?",
        "answer": "Il s’agit d’un débit libre. La résistance supplémentaire déplace le point sur la courbe de pompe et diminue le débit réel."
      },
      {
        "question": "Quelles sont les mesures minimales utiles ?",
        "answer": "Alimentation fiable avec mesure du courant, pression absolue ou dépression d’entrée, pression de sortie et débit, par exemple volume recueilli pendant une durée connue."
      }
    ],
    "cta": {
      "title": "Le moteur DPL30 tourne, mais le circuit ne débite toujours pas ?",
      "description": "Fournissez pressions d’entrée/sortie, tubes installés, hauteur de source, charge de refoulement, liquide, tension, courant et différences entre amorçage sec et humide pour isoler entrée, pompe et sortie.",
      "contactLabel": "Contacter un ingénieur",
      "productsLabel": "Voir la pompe à membrane miniature DPL30",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump"
    }
  },
  "300-ml-min-micro-liquid-diaphragm-pump-water-vs-reagent": {
    "metadata": {
      "title": "Pourquoi le débit et l’auto-amorçage d’une pompe de 300 mL/min baissent-ils en remplaçant l’eau par un réactif ?",
      "seoTitle": "Pompe à membrane : performances avec eau et réactif | FOREACH",
      "seoDescription": "Comprendre l’influence de la viscosité, de la pression de vapeur, du dégazage et des matériaux sur le débit et l’auto-amorçage avec un réactif.",
      "coverImage": "/images/resources/technical-articles/dpl30-troubleshooting/300-ml-min-liquid-diaphragm-pump-water-versus-reagent-flow-test.webp",
      "coverAlt": "Pompe à membrane miniature FOREACH DPL30 pour valider un réactif de procédé"
    },
    "deck": "Réussir un essai à l’eau démontre une performance seulement à cette température, avec ces tubes, ce niveau, cette alimentation et cette durée. Un réactif peut modifier viscosité, densité, pression de vapeur, tension superficielle, mouillage, dégazage et matériaux, déplaçant le point de fonctionnement de la même pompe.",
    "leadBlocks": [
      {
        "type": "formula",
        "expression": "Changement de liquide : μ, ρ, P_vapour, γ, θ, gaz dissous",
        "note": "Ces variables influencent pertes de charge, hauteur statique, marge de vaporisation, mouillage et bulles. Le contact prolongé ajoute une évolution des matériaux dans le temps."
      },
      {
        "type": "notice",
        "label": "Limite DPL30 :",
        "text": "Le liquide d’essai officiel DPL30 est l’eau purifiée. Tout autre liquide doit être évalué à sa concentration, température, durée de contact et dans ses conditions réelles. Un essai à l’eau réussi ne prouve aucune compatibilité universelle avec les réactifs."
      }
    ],
    "sections": [
      {
        "title": "1. Commencer par viscosité et circuit, pas uniquement par le débit libre",
        "blocks": [
          {
            "type": "formula",
            "expression": "ΔP = 128μLQ / (πD⁴)",
            "note": "La relation de Hagen–Poiseuille suppose un tube circulaire rigide et un écoulement laminaire newtonien pleinement développé. Elle estime tendances et ordres de grandeur, pas tout un circuit installé."
          },
          {
            "type": "paragraph",
            "text": "Dans ces hypothèses, la perte de charge est proportionnelle à la viscosité et inversement proportionnelle à la quatrième puissance du diamètre. Une hausse modérée de viscosité ou une petite réduction du diamètre réel peut consommer une part notable du différentiel disponible."
          },
          {
            "type": "table",
            "headers": [
              "Condition illustrative",
              "1.0 mPa·s",
              "3.0 mPa·s",
              "Interprétation"
            ],
            "rows": [
              [
                "300 mL/min dans 1 m de tube idéal de diamètre intérieur 3.2 mm",
                "Environ 1.94 kPa",
                "Environ 5.83 kPa",
                "La demande du tube droit idéal augmente d’environ 3.89 kPa ; raccords, vannes, filtres et coudes réels ajoutent des pertes"
              ]
            ]
          },
          {
            "type": "formula",
            "expression": "Re = ρvD / μ",
            "note": "L’exemple à l’eau donne Re proche de 2000, près de la limite conventionnelle de transition laminaire. Considérez ce calcul comme illustratif et vérifiez le réactif et le circuit complet."
          }
        ]
      },
      {
        "title": "2. Une pression de vapeur supérieure réduit la marge d’aspiration",
        "blocks": [
          {
            "type": "formula",
            "expression": "P_in,abs > P_vapour + P_margin",
            "note": "Lorsque la pression locale d’entrée approche la pression de vapeur saturante, formation de vapeur, bulles et cavitation deviennent plus probables."
          },
          {
            "type": "paragraph",
            "text": "Selon les données d’Antoine du NIST, près de 20 °C la pression de vapeur saturante vaut environ 2.34 kPa pour l’eau et 5.85 kPa pour l’éthanol. Un réactif réel n’est pas de l’éthanol pur, mais la comparaison montre pourquoi une viscosité similaire ne garantit pas la même aspiration."
          },
          {
            "type": "paragraph",
            "text": "La hausse de température augmente encore la pression de vapeur. Simultanément, tubes d’aspiration longs et étroits, hauteur élevée, filtre chargé ou forte viscosité abaissent la pression locale d’entrée."
          }
        ]
      },
      {
        "title": "3. Des bulles dans un tube transparent ne prouvent pas une prise d’air",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Origine des bulles",
              "Déclencheur habituel",
              "Comment distinguer"
            ],
            "rows": [
              [
                "Entrée d’air extérieure",
                "Raccord, tuyau ou joint de bouchon fuyard sous dépression",
                "Isolement par tronçon, tenue de pression et référence à tube court"
              ],
              [
                "Libération de gaz dissous",
                "Baisse de pression d’entrée, réactif non dégazé ou tensioactif",
                "Comparer à un liquide dégazé et observer le premier point d’apparition"
              ],
              [
                "Vaporisation locale ou cavitation",
                "Pression de vapeur, température et pertes d’aspiration élevées",
                "Réduire température, hauteur et restriction d’entrée ; comparer bruit et récupération de débit"
              ]
            ]
          },
          {
            "type": "notice",
            "label": "Éléments nécessaires :",
            "text": "Relevez pression absolue d’entrée, température, premier point de bulles, fluctuations de débit et effet d’un liquide dégazé avant de conclure à une membrane rompue."
          }
        ]
      },
      {
        "title": "4. Séparer effets immédiats du liquide et effets durables des matériaux",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Un changement immédiat de liquide oriente vers viscosité, pression de vapeur, mouillage, dégazage ou résistance. Une baisse progressive sur des jours ou semaines exige aussi de contrôler absorption, extraction, gonflement, dureté, dépôts et cristallisation."
          },
          {
            "type": "paragraph",
            "text": "ISO 1817 et ASTM D471 comparent masse, volume, dureté et propriétés mécaniques du caoutchouc avant et après exposition. Leurs essais contrôlés ne permettent pas de déduire directement la durée de vie dynamique d’une pièce finie d’une simple immersion."
          },
          {
            "type": "notice",
            "label": "Chaîne mouillée complète :",
            "text": "Ne validez pas uniquement la membrane PTFE. Incluez clapets FFKM, tête PPS, tubes, raccords et joints externes de la combinaison réelle."
          }
        ]
      },
      {
        "title": "5. Passer de l’essai à l’eau à une validation comparable du réactif",
        "blocks": [
          {
            "type": "formula",
            "expression": "R_Q = Q_reagent / Q_water ; R_H = H_reagent / H_water",
            "note": "RQ et RH comparent débit et aspiration du réactif à la référence à l’eau. Les programmes de durée peuvent suivre RQ(t) et RH(t)."
          },
          {
            "type": "list",
            "ordered": true,
            "items": [
              "Garder pompe, tension, hauteur d’entrée, longueur et diamètre intérieur identiques.",
              "Relever température, viscosité, densité et limites de composition connues de l’eau et du réactif.",
              "Mesurer pressions d’entrée/sortie, débit, premier amorçage et bulles.",
              "Comparer immédiatement après le changement pour isoler l’effet sur le point de fonctionnement.",
              "Effectuer cycles et contacts à l’arrêt correspondant à la durée de vie cible et suivre le maintien des performances.",
              "Confirmer les pires concentrations, températures, niveaux, charges de filtre et tolérances de tubes dans l’équipement."
            ]
          }
        ]
      },
      {
        "title": "6. Demander le point réel, pas seulement si la pompe transporte le réactif",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La question d’ingénierie est : avec température, viscosité, pression de vapeur, compatibilité et résistance réelles du réactif, quels débit, auto-amorçage et durée de vie cette pompe de classe 300 mL/min peut-elle fournir ?"
          },
          {
            "type": "paragraph",
            "text": "Cette question rassemble débit libre, courbes, propriétés du fluide, matériaux et critères de réception dans une matrice de validation, au lieu de généraliser un seul essai à l’eau."
          }
        ]
      }
    ],
    "faqTitle": "FAQ | Passer de l’eau à un réactif",
    "faqItems": [
      {
        "question": "Pourquoi le débit change-t-il fortement si la viscosité augmente peu ?",
        "answer": "Diamètre effectif, pertes des raccords et filtres, pression de vapeur, dégazage, mouillage et matériaux peuvent changer simultanément. Mesurez les deux pressions pour situer le déplacement du point."
      },
      {
        "question": "Serrer les raccords suffit-il à supprimer les bulles ?",
        "answer": "Pas toujours. Il peut s’agir de gaz dissous ou de vapeur. Comparez pression absolue, température, position des bulles et essai dégazé."
      },
      {
        "question": "Un essai à l’eau réussi prouve-t-il la compatibilité des matériaux ?",
        "answer": "Non. Le réactif exige présélection, immersion, cycles dynamiques, contact à l’arrêt et vérification du maintien des performances de la pompe complète."
      },
      {
        "question": "Hagen–Poiseuille prédit-elle directement le débit installé ?",
        "answer": "Non. Ses hypothèses de géométrie et d’écoulement sont précises. Tubes flexibles, coudes, raccords, vannes, filtres, effets d’entrée et comportement non newtonien nécessitent des mesures du système complet."
      },
      {
        "question": "Comment comparer plusieurs réactifs ?",
        "answer": "Utilisez les mêmes pompe, alimentation, tubes et niveau ; comparez débit, auto-amorçage, pression minimale, temps de premier amorçage, bulles et maintien à long terme, en relevant température et lot."
      }
    ],
    "cta": {
      "title": "Passer de la validation DPL30 à l’eau à celle d’un réactif",
      "description": "Précisez composition, concentration, température, viscosité, volatilité, débit cible, hauteur, tubes, filtres et besoins de fonctionnement continu/contact à l’arrêt pour établir une matrice avec le fluide réel.",
      "contactLabel": "Contacter un ingénieur",
      "productsLabel": "Voir la pompe à membrane miniature DPL30",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump"
    }
  },
  "300-ml-min-micro-liquid-diaphragm-pump-epdm-ptfe-ffkm": {
    "metadata": {
      "title": "Comment choisir EPDM, PTFE et FFKM pour une pompe à membrane miniature de 300 mL/min ?",
      "seoTitle": "Choisir EPDM, PTFE et FFKM pour une micropompe | FOREACH",
      "seoDescription": "Comparer compatibilité chimique, gonflement, étanchéité dynamique et validation au fluide réel pour sélectionner EPDM, PTFE et FFKM.",
      "coverImage": "/images/resources/technical-articles/dpl30-troubleshooting/300-ml-min-liquid-diaphragm-pump-wetted-material-inspection.webp",
      "coverAlt": "Pompe à membrane miniature FOREACH DPL30 avec différentes associations de matériaux mouillés"
    },
    "deck": "EPDM, PTFE et FFKM ne forment pas un classement simple de qualité croissante. EPDM et FFKM sont des élastomères, PTFE un fluoropolymère ; membrane, clapets et tête remplissent des tâches mécaniques différentes. Le choix concerne une structure mouillée complète sollicitée dynamiquement, pas un seul nom.",
    "leadBlocks": [
      {
        "type": "notice",
        "label": "Associations officielles DPL30 :",
        "text": "Membrane EPDM / clapets EPDM / tête PPS, ou membrane PTFE / clapets FFKM / tête PPS. Ne recombinez pas ces matériaux en configurations commerciales non publiées."
      },
      {
        "type": "paragraph",
        "text": "Les clapets doivent se déformer, revenir et refermer rapidement ; les membranes fléchir régulièrement tout en isolant le liquide ; la tête conserver géométrie et interfaces d’étanchéité. Une résistance chimique plus large ne garantit pas une meilleure dynamique à chaque emplacement."
      }
    ],
    "sections": [
      {
        "title": "1. Comparer les fonctions avant de classer les matériaux",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Matériau",
              "Famille",
              "Points principaux dans la pompe",
              "Conclusion à ne pas supposer"
            ],
            "rows": [
              [
                "EPDM",
                "Élastomère réticulé",
                "Présélection pour fluides aqueux et polaires, retour élastique, gonflement et extraction",
                "Le seul nom EPDM ne prouve pas la compatibilité avec toute formulation aqueuse"
              ],
              [
                "PTFE",
                "Fluoropolymère",
                "Résistance chimique étendue, construction de membrane, fatigue en flexion et structure composite",
                "Ce n’est pas automatiquement le meilleur matériau de clapet dynamique ni un matériau universel"
              ],
              [
                "FFKM",
                "Famille des perfluoroélastomères",
                "Résistance chimique étendue et étanchéité élastique, avec comportement propre au mélange",
                "La limite chimique ou thermique d’une nuance ne vaut pas pour tous les FFKM"
              ]
            ]
          }
        ]
      },
      {
        "title": "2. Pourquoi l’EPDM est-il souvent un premier candidat pour l’eau ?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "L’EPDM est couramment utilisé avec eau chaude, vapeur, nombreux acides, bases, nettoyants et liquides polaires, mais convient généralement mal aux huiles et carburants pétroliers. Le résultat dépend toujours du mélange, de la température, de la concentration et des contraintes."
          },
          {
            "type": "formula",
            "expression": "δ² = δ_D² + δ_P² + δ_H²",
            "note": "Les paramètres de solubilité de Hansen distinguent interactions de dispersion, polaires et par liaison hydrogène. Ils aident à interpréter affinité et gonflement, mais le mélange réel doit être testé."
          },
          {
            "type": "paragraph",
            "text": "Un élastomère réticulé peut ne pas se dissoudre comme un thermoplastique non réticulé ; un liquide peut néanmoins diffuser dans son réseau et provoquer absorption et gonflement. Il peut aussi extraire plastifiants ou constituants solubles, modifiant masse, dureté et retour élastique."
          }
        ]
      },
      {
        "title": "3. PTFE est chimiquement stable, mais sa construction dynamique compte",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La structure fortement fluorée du PTFE, les liaisons carbone–fluor robustes et la protection de la chaîne carbonée par le fluor contribuent à sa stabilité chimique et thermique élevée. Cela ne signifie pas une compatibilité illimitée en toutes conditions."
          },
          {
            "type": "paragraph",
            "text": "Le PTFE n’est pas un élastomère de caoutchouc. Pour une membrane alternative, validez construction réelle, supports ou couches composites, déformation admissible, différentiel, fréquence et cycles cibles. Demander seulement si elle est en PTFE ne suffit pas."
          },
          {
            "type": "notice",
            "label": "Limite fonctionnelle :",
            "text": "Une membrane PTFE ne change qu’une partie de la frontière mouillée. Elle ne remplace pas la validation des clapets FFKM, de la tête PPS, des tubes et raccords."
          }
        ]
      },
      {
        "title": "4. FFKM conserve l’étanchéité élastique, mais les mélanges diffèrent",
        "blocks": [
          {
            "type": "paragraph",
            "text": "FFKM désigne une famille de perfluoroélastomères combinant résistance chimique étendue et étanchéité élastique. Ce n’est pas une formule unique, ni simplement un « perfluoroéther », ni une température universelle."
          },
          {
            "type": "paragraph",
            "text": "Les nuances FFKM utilisent différents mélanges pour eau chaude/vapeur, acides, amines, hautes températures ou performance mécanique. Au sein de la famille, variations de volume et maintien des propriétés diffèrent sous une même exposition."
          },
          {
            "type": "notice",
            "label": "Bonne pratique de spécification :",
            "text": "Reliez chaque affirmation de produit chimique, concentration et température à une nuance précise et à la construction réelle de la pièce, puis validez l’usage prévu."
          }
        ]
      },
      {
        "title": "5. Étape 1 : immerger sans inventer de limite universelle",
        "blocks": [
          {
            "type": "paragraph",
            "text": "ISO 1817 et ASTM D471 comparent les propriétés du caoutchouc avant et après exposition : masse, volume, dimensions, dureté, résistance à la traction et allongement. Couvrez concentration, température et durée réelles, ainsi que les différences avant/après séchage si pertinentes."
          },
          {
            "type": "formula",
            "expression": "Δm% = (m₁−m₀)/m₀×100% ; ΔV% = (V₁−V₀)/V₀×100% ; ΔH = H₁−H₀",
            "note": "Le maintien de la résistance et de l’allongement peut aussi être relevé. Une méthode normalisée ne crée pas de seuil universel de ±5% pour chaque clapet ou membrane."
          },
          {
            "type": "paragraph",
            "text": "Les exigences fonctionnelles fixent les limites : quelle variation d’épaisseur, de dureté ou de retour un clapet tolère-t-il en restant étanche ? Quelle évolution une membrane tolère-t-elle tout en respectant course, pression et durée de vie ?"
          }
        ]
      },
      {
        "title": "6. Étape 2 : valider dynamiquement la pompe complète",
        "blocks": [
          {
            "type": "formula",
            "expression": "R_Q(t) = Q_t / Q_0 ; R_H(t) = H_t / H_0",
            "note": "Suivez maintien du débit et de l’auto-amorçage avec pression minimale d’entrée, fuite, courant, bruit et constats au démontage."
          },
          {
            "type": "list",
            "ordered": true,
            "items": [
              "Tester les éprouvettes à concentration, température et lot de liquide les plus défavorables.",
              "Faire cycler l’association réelle de tête en continu et en démarrages-arrêts.",
              "Inclure contact prolongé à l’arrêt, transitions humide–sec, nettoyage et réamorçage.",
              "Comparer débit, pression, auto-amorçage et fuite à 0 h, à mi-vie et en fin de vie.",
              "Inspecter portées de clapets, déformation de membrane, dépôts, fissures et changements dimensionnels.",
              "Qualifier pompe, tubes, raccords, vannes externes et joints comme une chaîne mouillée unique."
            ]
          },
          {
            "type": "notice",
            "label": "Écart typique :",
            "text": "Une éprouvette réussit l’immersion alors que le clapet échoue en endurance. Compatibilité chimique statique, fatigue cyclique, contact au siège et vitesse de retour sont des dimensions distinctes."
          }
        ]
      },
      {
        "title": "7. Comment utiliser les associations officielles DPL30 pour sélectionner ?",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Association officielle",
              "Rôle de candidat",
              "Encore à confirmer"
            ],
            "rows": [
              [
                "Membrane EPDM + clapets EPDM + tête PPS",
                "Premier candidat pour fluides aqueux et polaires compatibles",
                "Mélange, concentration, température, contact à l’arrêt, endurance dynamique et matériaux mouillés externes"
              ],
              [
                "Membrane PTFE + clapets FFKM + tête PPS",
                "Candidat à évaluer pour des fluides chimiquement plus complexes",
                "Nuance FFKM, limite du PPS, construction de membrane, compatibilité des tubes et raccords"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Le tableau décrit des voies de présélection, pas des promesses de compatibilité. La conclusion finale doit préciser composition, concentration, température, pression, durée de contact, nettoyage et durée de vie cible."
          }
        ]
      }
    ],
    "faqTitle": "FAQ | EPDM, PTFE et FFKM dans une micropompe",
    "faqItems": [
      {
        "question": "Le PTFE est-il toujours préférable à l’EPDM pour une membrane ?",
        "answer": "Non. Sa résistance chimique est souvent plus large, mais une membrane dynamique doit aussi répondre à la construction, fatigue en flexion, pression et endurance. Comparez les membranes finies, pas seulement les noms."
      },
      {
        "question": "Le FFKM est-il compatible avec tout produit chimique ?",
        "answer": "Non. C’est une famille dont les mélanges varient en réponse chimique, plage thermique, volume et maintien mécanique. La nuance et l’usage doivent être validés."
      },
      {
        "question": "Si l’EPDM convient à l’eau, convient-il à tout réactif aqueux ?",
        "answer": "Non. Une formulation aqueuse peut contenir alcools, tensioactifs, sels, acides, bases, oxydants ou additifs ; concentration, température et durée changent le résultat."
      },
      {
        "question": "Un faible gonflement d’éprouvette valide-t-il la pompe entière ?",
        "answer": "Non. Étanchéité des clapets, fatigue de membrane, dépôts, récupération après nettoyage, transitions humide–sec et endurance exigent un essai dynamique complet."
      },
      {
        "question": "Quels composants inclure dans la validation de compatibilité ?",
        "answer": "Tête, membrane, clapets d’entrée/sortie, tubes, raccords, vannes externes, filtres et joints. Le composant mouillé le plus faible fixe la limite du système."
      }
    ],
    "cta": {
      "title": "Choisir DPL30 en EPDM ou en PTFE/FFKM",
      "description": "Précisez composition, concentration, température, pression, contact, nettoyage et nombre de cycles pour planifier présélection, immersion et validation dynamique de la pompe complète.",
      "contactLabel": "Contacter un ingénieur",
      "productsLabel": "Voir la pompe à membrane miniature DPL30",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump"
    }
  }
} satisfies Partial<Record<DiaphragmPumpEngineeringArticleSlug, DiaphragmPumpEngineeringArticleCopy>>;
