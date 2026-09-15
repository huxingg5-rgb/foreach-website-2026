import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

export const diaphragmPumpRdArticlesFr = {
  "self-priming-miniature-liquid-diaphragm-pump-selection": {
    "metadata": {
      "title": "Choisir une micropompe à membrane auto-amorçante pour liquides : hauteur, durée et démarrage à sec ou humide",
      "seoTitle": "Pompe miniature à membrane auto-amorçante : sélection | Foreach Technology",
      "seoDescription": "Vérifiez la hauteur d’aspiration, le délai d’arrivée du liquide et la stabilité de l’alimentation. Les caractéristiques DPL30, DPL60 et DPL30H servent à présélectionner une pompe, puis à valider son démarrage dans l’instrument.",
      "coverImage": "/images/resources/technical-articles/diaphragm-pump-rd/covers/dpl30-brushless-port-side-photo.jpg",
      "coverAlt": "Vue côté raccords d’une pompe à membrane miniature Foreach DPL30 montrant les raccords de liquide et le moteur"
    },
    "deck": "Vérifiez la hauteur d’aspiration, le délai d’arrivée du liquide et la stabilité de l’alimentation. Les caractéristiques DPL30, DPL60 et DPL30H servent à présélectionner une pompe, puis à valider son démarrage dans l’instrument.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "Un instrument peut demander du liquide de lavage dès sa mise sous tension. Même lorsque le dénivelé entre réservoir et entrée reste inférieur à la hauteur d’auto-amorçage annoncée, le premier cycle peut être trop lent, un changement de flacon exiger plusieurs démarrages, ou des bulles subsister au point d’utilisation."
      },
      {
        "type": "paragraph",
        "text": "La hauteur ne décrit qu’une dimension de l’auto-amorçage. La R&D doit aussi préciser l’état initial de la chambre et des tuyaux, l’évacuation de l’air, l’arrivée du premier liquide et l’obtention d’un débit stable. Évaluez ces conditions avec le débit réel de fonctionnement de la pompe Foreach DPL."
      }
    ],
    "sections": [
      {
        "title": "Définir un démarrage mesurable",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La membrane fait varier le volume de chambre ; les clapets orientent aspiration et refoulement. Une conduite initialement vide présente d’abord de l’air, puis une alternance gaz-liquide, enfin un circuit rempli. L’étanchéité des clapets, la compressibilité et la cylindrée effective diffèrent entre ces phases."
          },
          {
            "type": "paragraph",
            "text": "La capacité à aspirer du liquide et celle à alimenter le point final dans le délai autorisé doivent avoir des critères distincts."
          },
          {
            "type": "table",
            "headers": [
              "Grandeur",
              "Définition proposée",
              "Question de conception"
            ],
            "rows": [
              [
                "Hauteur géométrique d’aspiration",
                "Dénivelé entre niveau minimal autorisé et entrée de pompe",
                "Quelle charge statique ajoute l’installation ?"
              ],
              [
                "Délai du premier liquide",
                "Commande effective de départ jusqu’à la première arrivée au point indiqué",
                "Combien dure le remplissage initial ou le changement de flacon ?"
              ],
              [
                "Délai de débit stable",
                "Départ jusqu’au respect des limites de débit et de bulles au point final",
                "Quand lancer l’action suivante ?"
              ],
              [
                "Reprise après arrêt",
                "Démarrages répétés après durée d’arrêt et liquide résiduel définis",
                "Le fonctionnement intermittent reprend-il correctement ?"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Indiquez le point d’observation. Du liquide à la sortie de pompe ne prouve pas le remplissage d’un tuyau aval, d’une chambre de vanne ou d’une aiguille de lavage. Définissez variation admissible, durée d’observation et bulles selon l’instrument ; une goutte visible ne suffit pas."
          },
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/diaphragm-pump-rd/fr/01.svg",
            "alt": "Trois événements pendant l’amorçage",
            "width": 1000,
            "height": 650,
            "caption": "Schéma : première arrivée du liquide et alimentation stable au point final sont deux événements distincts. Les écarts ne sont pas des temps mesurés sur une pompe."
          }
        ]
      },
      {
        "title": "Séparer les caractéristiques Foreach",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les valeurs ci-dessous proviennent de la page 5 des spécifications chinoises respectives. Elles ne constituent pas un point de fonctionnement simultané. [F1–F3]"
          },
          {
            "type": "table",
            "headers": [
              "Série",
              "Débit à vide",
              "Pression nominale",
              "Hauteur d’auto-amorçage",
              "Raccordement standard"
            ],
            "rows": [
              [
                "DPL30",
                "300 mL/min",
                "100 kPa",
                "6 mH₂O",
                "Tuyau souple de diamètre intérieur 3,2 mm"
              ],
              [
                "DPL60",
                "600 mL/min",
                "100 kPa",
                "3 mH₂O",
                "Tuyau souple de diamètre intérieur 3,2 mm"
              ],
              [
                "DPL30H",
                "300 mL/min",
                "600 kPa",
                "3 mH₂O",
                "Raccord à compression pour tube rigide 6 × 4 mm, extérieur × intérieur"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Un débit à vide supérieur ne signifie pas une plus grande hauteur d’aspiration. Une pression de sortie supérieure ne remplace pas l’évaluation de l’entrée. Comparez DPL60 pour davantage de débit et DPL30H pour une contre-pression plus élevée, puis revérifiez niveau minimal et démarrage."
          },
          {
            "type": "paragraph",
            "text": "Ces tableaux ne précisent ni délai d’amorçage associé, ni état sec/humide, ni circuit complet d’essai. La valeur 6 mH₂O ne permet donc pas de promettre un amorçage rapide depuis 6 m avec tout fluide et toute tuyauterie, ni de calculer seule le délai de l’instrument."
          }
        ]
      },
      {
        "title": "Pourquoi augmenter le diamètre ne garantit pas un amorçage rapide",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Dans un circuit rempli, diamètre, longueur et restrictions déterminent une partie des pertes d’aspiration. Au démarrage, le volume d’air à évacuer compte aussi. Un diamètre accru peut réduire la résistance au liquide tout en augmentant le volume à remplir."
          },
          {
            "type": "paragraph",
            "text": "Un tube droit de 1 m contient environ 8,0 mL pour 3,2 mm de diamètre intérieur, et 12,6 mL pour 4,0 mm. Ce sont des calculs géométriques sans raccords, vannes ni chambre, pas des mesures de pompe."
          },
          {
            "type": "paragraph",
            "text": "Ne divisez pas ces volumes par le débit liquide à vide pour prédire l’amorçage. La capacité d’évacuation d’air, les clapets et la pression de sortie interviennent. Gardez une aspiration aussi courte que possible et réduisez raccords et volume de remplissage inutiles. En cas d’amorçage difficile, vérifiez séparément fuites d’entrée, clapets ou filtres obstrués, air piégé dans la tête et pression de sortie."
          },
          {
            "type": "paragraph",
            "text": "Dans un réservoir ouvert, la baisse du niveau augmente la charge statique. Dans un réservoir fermé, vérifiez aussi l’admission d’air : la pression du volume gazeux peut baisser sans modification du dénivelé. Points hauts, vannes et raccords retiennent parfois des quantités d’air variables entre démarrages."
          }
        ]
      },
      {
        "title": "Essayer séparément les états sec et humide",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Un démarrage humide correspond généralement à une chambre ou des surfaces critiques de clapets déjà mouillées. Pour l’état sec, définissez si chambre et conduite sont vidées, la méthode de vidange et la restauration de cet état. Ne mélangez pas les résultats."
          },
          {
            "type": "paragraph",
            "text": "Le mouillage modifie potentiellement le contact des clapets et l’évacuation initiale. Une reprise réussie après préremplissage ne prouve pas le premier démarrage après stockage. Séparez pompe neuve ou vidée, arrêt court, arrêt long et entrée d’air au changement de flacon."
          },
          {
            "type": "paragraph",
            "text": "L’auto-amorçage n’autorise pas une marche à sec illimitée. Confirmez durée, facteur de marche et échauffement pour le modèle exact. Des vidanges ou alternances gaz-liquide répétées nécessitent leur propre évaluation. DPGL800 spécifie gaz et mélanges gaz-liquide ; ses 6 L/min de gaz à vide par tête ne permettent pas de calculer l’amorçage d’un circuit liquide DPL. [F4]"
          }
        ]
      },
      {
        "title": "Localiser la limitation par comparaison",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Établissez une référence étanche avec l’eau purifiée spécifiée, une conduite courte et une faible hauteur. Ajoutez progressivement le circuit réel, un facteur principal à la fois. Conservez modèle, matériaux, alimentation, état de mouillage, pressions, tension aux bornes, délais et emplacement des bulles."
          },
          {
            "type": "table",
            "headers": [
              "Comparaison",
              "Observer",
              "Rechercher"
            ],
            "rows": [
              [
                "Aspiration courte et réelle",
                "Délai et pression d’entrée",
                "Résistance, volume ou fuite"
              ],
              [
                "Niveau habituel et minimal",
                "Retard ou instabilité au point final",
                "Charge statique et marge d’aspiration"
              ],
              [
                "Faible contre-pression et sortie réelle",
                "Départ avec conduite vide",
                "Évacuation d’air, clapets et pression de démarrage"
              ],
              [
                "Préremplissage et vidange définie",
                "Premier départ et reprise",
                "Mouillage, air retenu et état initial"
              ],
              [
                "Eau purifiée et fluide réel",
                "Délai, pression et bulles",
                "Viscosité, dégazage et compatibilité"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Les prises de mesure ajoutent volume et risques de fuite : vérifiez leur étanchéité. Utilisez des composants adaptés au fluide et à la pression ; évitez refoulement bloqué prolongé et marche à sec arbitraire. Consignez séparément la création de dépression et l’arrivée du liquide : rotation ou baisse de pression ne prouvent pas l’alimentation du point demandé."
          }
        ]
      },
      {
        "title": "Documenter la décision de sélection",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Identifiez le modèle et les matériaux qui amorcent au niveau minimal, à la température et avec la sortie réelles, la dispersion des démarrages et les séquences ou préremplissages nécessaires. Respectez effectifs, répétitions et étapes de vieillissement du projet. Un seul démarrage d’une pompe neuve ne valide pas la série."
          },
          {
            "type": "paragraph",
            "text": "Pour DPL30, DPL60 ou DPL30H, fournissez dénivelé, volume et résistance du circuit, débit cible, contre-pression, formulation du fluide, état sec/humide et attente admissible."
          }
        ]
      },
      {
        "title": "Spécifications et références",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les paramètres produits proviennent des spécifications Foreach ci-dessous. Vérifiez les principes et essais proposés pour le modèle précis et les conditions réelles."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00001_A04_cn_DPL30规格书.pdf",
                "label": "[F1] Foreach DPL30 spécification en chinois (A04)",
                "suffix": "p. 5–6 : performances et configuration ; p. 3–4 : montage"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00002_A02_cn_DPL60规格书.pdf",
                "label": "[F2] Foreach DPL60 spécification en chinois (A02)",
                "suffix": "p. 5–6 : performances et configuration ; p. 3–4 : montage"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2504-00001_A00_cn_DPL30H规格书.pdf",
                "label": "[F3] Foreach DPL30H spécification en chinois (A00)",
                "suffix": "p. 5–6 : performances et configuration ; p. 3–4 : montage"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2506-00001_A00_cn_DPGL800气液混合泵规格书.pdf",
                "label": "[F4] Foreach DPGL800 spécification en chinois (A00)",
                "suffix": "p. 5–6 : performances et configuration ; p. 3–4 : montage"
              }
            ]
          }
        ]
      },
      {
        "title": "Guides de sélection et de validation associés",
        "blocks": [
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-flow-pulsation-reduction/",
                "label": "Mesure et réduction des pulsations"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-noise-vibration-reduction/",
                "label": "Réduction du bruit et des vibrations"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-backflow-check-valve/",
                "label": "Retour à l’arrêt et conception anti-siphon"
              },
              {
                "href": "/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
                "label": "Compatibilité des matériaux en contact"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "Courbes débit-pression et point de fonctionnement"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "Sélection de pompes miniatures à membrane pour liquides"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/",
                "label": "Gamme de pompes miniatures à membrane"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Questions fréquentes",
    "faqItems": [
      {
        "question": "La hauteur supérieure de DPL30 garantit-elle un démarrage plus facile que DPL60 ?",
        "answer": "Non. Volume, clapets, fluide et contre-pression interviennent aussi. Comparez à état initial identique."
      },
      {
        "question": "Fonctionner après préremplissage prouve-t-il l’adéquation de la pompe ?",
        "answer": "Cela aide au diagnostic. Vérifiez toutefois si l’instrument autorise cette étape et si les états neuf, vieilli et changement de flacon respectent la tâche."
      },
      {
        "question": "Peut-on omettre les essais lorsque le dénivelé est inférieur à la hauteur annoncée ?",
        "answer": "Non. Le dénivelé ne couvre pas fuites, pertes de charge, admission d’air au réservoir et évacuation de l’air déplacé."
      }
    ],
    "cta": {
      "title": "Étudiez votre sélection de pompe pour liquides",
      "description": "Précisez le fluide, le débit requis, les pressions, les conduites et les conditions de démarrage et d’arrêt pour définir modèle, matériaux et essais.",
      "contactLabel": "Contacter le support technique",
      "productsLabel": "Voir les pompes miniatures pour liquides",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  },
  "miniature-diaphragm-pump-flow-pulsation-reduction": {
    "metadata": {
      "title": "Pulsations de débit d’une micropompe à membrane : mesure et réduction",
      "seoTitle": "Pulsations de débit des pompes miniatures : réduction | Foreach Technology",
      "seoDescription": "Distinguez les fluctuations réelles des erreurs de mesure, puis comparez amortissement, tuyauterie et vitesse. Validez au point d’utilisation et dans des conditions hydrauliques équivalentes.",
      "coverImage": "/images/resources/technical-articles/diaphragm-pump-rd/covers/dpl60-brushless-horizontal-photo.jpg",
      "coverAlt": "Vue horizontale d’une pompe à membrane miniature Foreach DPL60 montrant la tête et le moteur"
    },
    "deck": "Distinguez les fluctuations réelles des erreurs de mesure, puis comparez amortissement, tuyauterie et vitesse. Validez au point d’utilisation et dans des conditions hydrauliques équivalentes.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "Si les pulsations sont excessives, vérifiez d’abord la forme d’onde réelle et le volume livré à la charge. Contrôlez aspiration, alimentation et mesure avant de modifier amortissement, tubes ou vitesse. Un affichage instable ne démontre ni panne ni amplitude réelle des pulsations."
      },
      {
        "type": "paragraph",
        "text": "Un débit périodique, un volume total décroissant et un échantillonnage erroné appellent respectivement une évaluation applicative, un diagnostic hydraulique ou de panne, et une correction de la mesure. Renforcer le filtrage peut seulement stabiliser le nombre affiché."
      }
    ],
    "sections": [
      {
        "title": "Débit moyen et débit instantané",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Le déplacement alternatif et les clapets font varier le débit. Tuyaux, filtres et charge couplent débit et pression. Des membranes déphasées ou un amortisseur compatible constituent des pistes de conception. Mesurez leur effet au niveau de la charge réelle avant de spécifier les performances de pulsation."
          },
          {
            "type": "paragraph",
            "text": "La moyenne mesure la livraison sur un intervalle ; la forme instantanée décrit son arrivée à la charge. Deux ondes peuvent partager une moyenne mais différer par pics, interruptions et brefs retours. Le remplissage d’un réservoir peut dépendre surtout du volume total ; cellules de mesure, cycles courts et charges sensibles à la pression dépendent aussi de l’onde. Précisez position et durée : sortie de pompe et aval d’un amortisseur ne sont pas des mesures équivalentes."
          },
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/diaphragm-pump-rd/fr/02.svg",
            "alt": "Même moyenne, débits instantanés différents",
            "width": 1000,
            "height": 650,
            "caption": "Schéma de principe : courbes synthétiques de même moyenne et d’amplitudes différentes. Le débit est normalisé ; il ne s’agit pas de mesures Foreach."
          }
        ]
      },
      {
        "title": "Contrôler le volume cumulé",
        "blocks": [
          {
            "type": "paragraph",
            "text": "À conditions hydrauliques identiques, pesez la masse nette recueillie pendant un intervalle et convertissez avec la masse volumique à température réelle. Le NIST emploie également la variation de masse dans le temps ; la précision de son installation ne devient pas celle de cet essai proposé. [N1]"
          },
          {
            "type": "paragraph",
            "text": "Avec masse en g, masse volumique en g/mL et temps en s, le débit moyen en mL/min vaut 60 × masse nette ÷ masse volumique ÷ durée. Ne supposez pas une valeur de 1 pour tout liquide. Tenez compte d’évaporation, projections et rétention sur le récipient."
          },
          {
            "type": "paragraph",
            "text": "Conservez les mêmes intervalles, buse et contre-pression. Comparer tout le démarrage du débitmètre à une collecte stabilisée, ou retirer une restriction pour peser, change les conditions. Pour le régime stable, attendez la stabilisation de pression et du liquide stocké dans les tubes. Pour les cycles marche-arrêt, intégrez cycle entier, variations de stockage et décharge après arrêt."
          },
          {
            "type": "paragraph",
            "text": "Répétez des fenêtres égales en enregistrant masse, total du débitmètre et pression. Des totaux concordants et stables peuvent coexister avec une pulsation réelle. Si la pesée reste stable mais que la moyenne du capteur dérive, vérifiez gamme, étalonnage, échantillonnage et bulles. Si les deux varient, cherchez une variation réelle de livraison."
          }
        ]
      },
      {
        "title": "Fréquence d’affichage et bande passante",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Réponse du capteur, acquisition et moyenne internes, communications, filtrage logiciel et écran ont des échelles de temps différentes. Relire le même résultat n’ajoute pas d’information d’échantillonnage."
          },
          {
            "type": "paragraph",
            "text": "Un échantillonnage insuffisant du débit pulsé peut provoquer un repliement spectral. Pour un affichage lent, acquérez suffisamment de points dans la bande passante utile puis calculez la moyenne sur la fenêtre requise. Déclenchement, durée de mesure et moyenne interne influencent l’acquisition ; la fréquence de lecture ne définit pas à elle seule la bande passante."
          },
          {
            "type": "paragraph",
            "text": "Vérifiez dynamique, fluide d’étalonnage et plage utile avant de choisir acquisition et antirepliement. Dépasser deux fois la fréquence maximale d’intérêt est une condition élémentaire, pas une garantie de mesure fidèle des pics étroits. Bande passante et résolution temporelle suffisantes restent nécessaires ; confirmez les réglages avec le fabricant. Une moyenne dans la gamme n’exclut pas une saturation des crêtes. En cas de retour bref, vérifiez la mesure bidirectionnelle et le signe de l’intégration."
          }
        ]
      },
      {
        "title": "Lire l’onde avec les autres signaux",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Enregistrez débit, pressions et retour moteur ou tension sur la même base de temps. Un tronçon transparent localise les bulles, mais leur aspect seul ne distingue pas fuite, dégazage et vaporisation locale. Vérifiez ensemble étalonnage du fluide, réponse aux pulsations rapides, bulles et perturbations mécaniques afin de ne pas confondre erreur de mesure et variation réelle de la pompe."
          },
          {
            "type": "table",
            "headers": [
              "Observation",
              "Premier contrôle",
              "Piste"
            ],
            "rows": [
              [
                "Période répétable, total stable",
                "Vitesse et pression synchronisées",
                "Cycle de pompage et dynamique hydraulique"
              ],
              [
                "Interruptions avec bulles",
                "Origine des bulles et pression d’entrée",
                "Fuite, alimentation insuffisante ou gaz libéré"
              ],
              [
                "Moyenne plus faible après ajout d’un filtre",
                "Perte de charge et point de travail",
                "Résistance ou état du filtre"
              ],
              [
                "Moyenne sensible aux réglages d’acquisition",
                "Échantillonnage, gamme et total",
                "Repliement, saturation ou traitement"
              ],
              [
                "Débit varie avec vitesse ou tension",
                "Alimentation et commande",
                "Instabilité électrique ou de régulation"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Ce sont des indices, pas des correspondances de panne uniques. Un pic de pression ne donne pas directement le débit instantané : résistance dynamique et position du capteur interviennent."
          }
        ]
      },
      {
        "title": "L’amortissement modifie aussi la réponse",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Si livraison et mesure sont correctes mais que la charge refuse l’onde, évaluez un amortisseur compatible, la compliance des tuyaux, la vitesse autorisée ou une autre configuration. Un amortisseur stocke et restitue du liquide selon la phase de pression ; choisissez pression, fluide, raccords et encombrement adaptés."
          },
          {
            "type": "paragraph",
            "text": "Davantage de compliance peut retarder la mise en pression et prolonger la décharge après arrêt. Un tuyau souple long change aussi pertes de charge et volume d’amorçage. Contrôlez démarrage, moyenne stabilisée et volume résiduel, pas uniquement la courbe lissée."
          },
          {
            "type": "paragraph",
            "text": "Une variation de vitesse impose de revoir le point de travail : clapets et déplacement effectif par cycle ne restent pas nécessairement proportionnels à basse vitesse. En boucle fermée, vérifiez acquisition, filtres et dynamique de l’actionneur afin que la commande ne poursuive pas chaque pulsation et n’oscille pas. Employez uniquement les interfaces réellement disponibles."
          }
        ]
      },
      {
        "title": "Comparer les solutions au point d’utilisation",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Mesure",
              "Objectif",
              "À revérifier"
            ],
            "rows": [
              [
                "Corriger fuites, manque d’alimentation ou tension",
                "Retirer les fluctuations anormales superposées",
                "Niveau minimal, bulles, tension et total"
              ],
              [
                "Ajouter un amortisseur adapté",
                "Réduire la variation réelle à la charge",
                "Pression admissible, fluide, nettoyage, démarrage et décharge résiduelle"
              ],
              [
                "Modifier compliance ou position des tubes",
                "Changer la réponse dynamique",
                "Pertes de charge, remplissage et onde finale"
              ],
              [
                "Régler la vitesse autorisée",
                "Modifier période et point de fonctionnement",
                "Clapets, débit requis, mesure et stabilité de boucle"
              ],
              [
                "Comparer les structures de pompage",
                "Agir à la source",
                "Mesures à tâche identique, pas seulement type de moteur"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Définissez « faible pulsation » avec fluide, débit, contre-pression, point et bande passante. Consignez limite et calcul ; un affichage fortement filtré n’est pas une spécification hydraulique."
          }
        ]
      },
      {
        "title": "Évaluer les séries Foreach DPL",
        "blocks": [
          {
            "type": "paragraph",
            "text": "DPL30, DPL60 et DPL30H fournissent débit à vide et courbes débit-pression. Ce ne sont pas des ondes instantanées et elles ne définissent pas amplitude crête à crête, spectre ou atténuation dans chaque condition. [F1–F3]"
          },
          {
            "type": "paragraph",
            "text": "Les 600 mL/min de DPL60 ne prouvent pas une pulsation supérieure à DPL30 ; un moteur sans balais ne garantit pas non plus une faible pulsation. Comparez matériaux, vitesse, aspiration et circuit dans les mêmes conditions. Conservez moyenne et fenêtre, maxima/minima, pression, bande passante, point de mesure, température, bulles et modèle complet. L’acceptation vient des exigences de l’instrument, pas d’un pourcentage universel sans conditions."
          }
        ]
      },
      {
        "title": "Spécifications et références",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les paramètres produits proviennent des spécifications Foreach ci-dessous. Vérifiez les principes et essais proposés pour le modèle précis et les conditions réelles."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00001_A04_cn_DPL30规格书.pdf",
                "label": "[F1] Foreach DPL30 spécification en chinois (A04)",
                "suffix": "p. 5–6 : performances et configuration ; p. 3–4 : montage"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00002_A02_cn_DPL60规格书.pdf",
                "label": "[F2] Foreach DPL60 spécification en chinois (A02)",
                "suffix": "p. 5–6 : performances et configuration ; p. 3–4 : montage"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2504-00001_A00_cn_DPL30H规格书.pdf",
                "label": "[F3] Foreach DPL30H spécification en chinois (A00)",
                "suffix": "p. 5–6 : performances et configuration ; p. 3–4 : montage"
              },
              {
                "href": "https://www.nist.gov/laboratories/tools-instruments/gravimetric-standard-liquid-micro-flow",
                "label": "[N1] NIST : étalon gravimétrique de microdébit liquide"
              }
            ]
          }
        ]
      },
      {
        "title": "Guides de sélection et de validation associés",
        "blocks": [
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/self-priming-miniature-liquid-diaphragm-pump-selection/",
                "label": "Auto-amorçage et temps de démarrage"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-noise-vibration-reduction/",
                "label": "Réduction du bruit et des vibrations"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-backflow-check-valve/",
                "label": "Retour à l’arrêt et conception anti-siphon"
              },
              {
                "href": "/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
                "label": "Compatibilité des matériaux en contact"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "Courbes débit-pression et point de fonctionnement"
              },
              {
                "href": "/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire/",
                "label": "Commande des pompes sans balais à deux et cinq fils"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "Sélection de pompes miniatures à membrane pour liquides"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/",
                "label": "Gamme de pompes miniatures à membrane"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Questions fréquentes",
    "faqItems": [
      {
        "question": "Une pesée stable prouve-t-elle que la pulsation est sans effet ?",
        "answer": "Non. Elle valide le total ; les tâches courtes et composants sensibles à la pression peuvent subir l’onde instantanée."
      },
      {
        "question": "Augmenter le filtrage du débitmètre suffit-il ?",
        "answer": "Cela modifie affichage et délai de commande, pas les fluctuations physiques. Conservez données brutes et totaux."
      },
      {
        "question": "Faut-il immédiatement ajouter un amortisseur ?",
        "answer": "Écartez d’abord fuite d’air, erreur de gamme et échantillonnage. Puis validez nettoyage, remplissage, réponse et décharge à l’arrêt."
      }
    ],
    "cta": {
      "title": "Étudiez votre sélection de pompe pour liquides",
      "description": "Précisez le fluide, le débit requis, les pressions, les conduites et les conditions de démarrage et d’arrêt pour définir modèle, matériaux et essais.",
      "contactLabel": "Contacter le support technique",
      "productsLabel": "Voir les pompes miniatures pour liquides",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  },
  "miniature-diaphragm-pump-noise-vibration-reduction": {
    "metadata": {
      "title": "Bruit des micropompes à membrane : causes, isolation vibratoire et réduction",
      "seoTitle": "Bruit des pompes miniatures à membrane : causes et solutions | Foreach Technology",
      "seoDescription": "Analysez le bruit à point de fonctionnement identique. Vérifiez moteur, tête, support, tuyauterie et carter, puis contrôlez débit, échauffement et fiabilité après les modifications.",
      "coverImage": "/images/resources/technical-articles/diaphragm-pump-rd/covers/dpl30-brushless-bottom-photo.jpg",
      "coverAlt": "Vue de dessous d’une pompe à membrane miniature Foreach DPL30 montrant la base et les trous de fixation"
    },
    "deck": "Analysez le bruit à point de fonctionnement identique. Vérifiez moteur, tête, support, tuyauterie et carter, puis contrôlez débit, échauffement et fiabilité après les modifications.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "Face à une micropompe bruyante, examinez fonctionnement et transmission vibratoire avant de choisir isolateurs, support ou amortissement hydraulique. Les essais sur banc et dans l’instrument nécessitent débit, pression et conditions acoustiques comparables."
      },
      {
        "type": "paragraph",
        "text": "Une pompe acceptable sur banc peut produire ronflement, tonalité ou chocs périodiques après fixation et raccordement. Déterminez si l’excitation a changé ou si le montage amplifie une excitation existante. Remplacer la pompe est un essai utile, mais une autre unité peut donner le même résultat si le chemin de transmission persiste."
      }
    ],
    "sections": [
      {
        "title": "Distinguer sources et chemins de transmission",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Rotation, mécanisme d’entraînement et membrane génèrent des excitations mécaniques. Les clapets et variations de pression excitent aussi le circuit. L’énergie atteint le microphone par l’air ou traverse supports, colliers, raccords et carter, dont les panneaux rayonnent ensuite."
          },
          {
            "type": "paragraph",
            "text": "L’installation peut dégrader l’aspiration, accroître la contre-pression ou perturber la tension. Elle peut aussi conserver le point de travail tout en augmentant la réponse structurelle. Les deux effets peuvent coexister. Réduire le couplage mécanique peut limiter la transmission vibratoire. Étudiez aussi l’excitation des conduites et du boîtier par les fluctuations de pression. Dimensionnez l’isolation selon les raccordements, dimensions et charges Foreach réels, puis comparez au même point de fonctionnement."
          },
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/diaphragm-pump-rd/fr/03.svg",
            "alt": "Suivre les chemins de transmission du bruit",
            "width": 1000,
            "height": 650,
            "caption": "Schéma de diagnostic : les excitations mécaniques et hydrauliques peuvent produire du bruit par plusieurs chemins. Vérifiez-les au même point de fonctionnement."
          }
        ]
      },
      {
        "title": "Les décibels nécessitent des conditions de mesure",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La page 5 des spécifications chinoises DPL30, DPL60 et DPL30H indique bruit ≤80 dB. Les documents consultés ne précisent pas distance, pondérations fréquentielle et temporelle, bruit de fond, montage ni condition hydraulique associés. [F1–F3]"
          },
          {
            "type": "paragraph",
            "text": "Conservez cette formulation : elle ne signifie pas 80 dB(A) à 1 m ni le même niveau dans tout instrument. Une limite n’est pas non plus la valeur typique mesurée de chaque pompe."
          },
          {
            "type": "paragraph",
            "text": "En développement, comparez une pression acoustique pondérée A à une position convenue, en conservant spectres ou enregistrements. Pour l’acceptation, appliquez la méthode du projet. Le niveau de pression acoustique dépend du point et du champ ; le niveau de puissance acoustique décrit la puissance émise. Les valeurs ne sont pas interchangeables. Consignez bruit de fond, réflexions et réglages de mesure, en conservant les mêmes conditions pour attribuer les variations à la modification de montage ou de fonctionnement étudiée."
          },
          {
            "type": "table",
            "headers": [
              "Condition",
              "À conserver ou consigner"
            ],
            "rows": [
              [
                "Pompe et commande",
                "Modèle complet, moteur, tension, vitesse ou consigne"
              ],
              [
                "Hydraulique",
                "Température, pressions, débit moyen et bulles"
              ],
              [
                "Montage",
                "Support, fixations, isolateurs, serrage, colliers et câbles"
              ],
              [
                "Acoustique",
                "Étalonnage, position, pondération, durée et bruit de fond"
              ],
              [
                "Instrument",
                "Carter ouvert/fermé, autres moteurs/ventilateurs, état thermique"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Un téléphone aide à comparer le caractère sonore, mais gain automatique, suppression du bruit et réponse du microphone modifient l’amplitude. Un enregistrement non étalonné ne démontre pas une baisse de décibels."
          }
        ]
      },
      {
        "title": "Ajouter progressivement les éléments du montage",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Établissez une fixation de référence répétable, puis ajoutez support définitif, tubes et colliers réels, enfin carter. Tenir la pompe suspendue à la main n’est pas une référence satisfaisante : la prise et les tissus modifient les vibrations. Documentez le dispositif de fixation."
          },
          {
            "type": "paragraph",
            "text": "Maintenez le point de travail. Si un tube modifie pression ou débit, consignez cette différence au lieu d’attribuer tout changement sonore à la structure."
          },
          {
            "type": "table",
            "headers": [
              "Résultat",
              "Premier examen",
              "Essai suivant"
            ],
            "rows": [
              [
                "Une bande augmente après fixation",
                "Rigidité, fixation et modes du support",
                "Modifier support ou isolation et répéter"
              ],
              [
                "Colliers ou liaisons rigides augmentent le bruit",
                "Transmission du tube au carter",
                "Isoler progressivement les liaisons"
              ],
              [
                "Fermer le carter change le son",
                "Rayonnement, cavité acoustique et couplages",
                "Comparer vibration du carter et spectre sonore"
              ],
              [
                "Bulles et bruit augmentent ensemble",
                "Alimentation, fuite ou dégazage",
                "Pression d’entrée et état visible du circuit"
              ],
              [
                "Vitesse ou tension devient instable",
                "Alimentation, commande ou entraînement",
                "Enregistrer les signaux électriques"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Intervenez sur la structure à l’arrêt. Réutilisez positions et réglages de mesure, avec répétitions pour distinguer environnement et dispersion d’assemblage."
          }
        ]
      },
      {
        "title": "Rechercher une résonance par variation de vitesse",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Si la configuration le permet, faites varier la vitesse dans la plage autorisée, en enregistrant son, vibration, débit et pressions. Une plage étroite plus bruyante peut indiquer une excitation proche d’un maximum de réponse structurelle ; écartez aussi un changement de clapets ou d’alimentation à cette vitesse."
          },
          {
            "type": "paragraph",
            "text": "Comparez spectres, fréquence de rotation, cycles de pompage et commande. La vitesse donne la fréquence d’un tour, mais événements de pompage et impulsions de retour par tour dépendent du mécanisme et du moteur. Fréquence PWM, retour de vitesse et pulsation liquide ne sont pas identiques."
          },
          {
            "type": "paragraph",
            "text": "Si un nouveau support déplace la plage bruyante sans changer sensiblement hydraulique et alimentation, cela justifie de poursuivre l’analyse de résonance. L’impression auditive seule ne suffit pas."
          }
        ]
      },
      {
        "title": "Valider ensemble isolation et performances",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Un isolateur plus souple n’est pas toujours meilleur : rigidité, précharge, orientation et fréquence gouvernent son effet. Trop de mouvement peut solliciter raccords et câbles. Recherchez les liaisons de contournement : contact avec le carter, tuyau tendu ou collier rigide."
          },
          {
            "type": "paragraph",
            "text": "DPL30 et DPL60 utilisent un tuyau souple de diamètre intérieur 3,2 mm ; DPL30H, un tube rigide 6 × 4 mm avec raccord à compression. Ne remplacez pas ce dernier par un flexible ordinaire pour réduire les vibrations. Un long tuyau souple modifie également l’hydraulique. [F1–F3]"
          },
          {
            "type": "paragraph",
            "text": "Pour une excitation hydraulique, examinez amortissement et conduites ; pour les panneaux, support, isolation et traitement amortissant. En ajoutant une mousse acoustique ou un capot, vérifiez échauffement moteur, ventilation, visibilité des fuites et accès de maintenance. Retenez une modification seulement si bruit, débit, température et fiabilité restent acceptables ensemble."
          }
        ]
      },
      {
        "title": "Comparer Foreach pour une même tâche",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les moteurs avec et sans balais diffèrent par durée de vie et commande, mais sans balais ne signifie pas automatiquement silencieux. Comparer DPL30 et DPL60 chacune à pleine vitesse et à vide ne permet pas de choisir pour l’instrument."
          },
          {
            "type": "paragraph",
            "text": "Comparez au même débit demandé, à la contre-pression réelle, avec le même fluide et montage ; notez les vitesses différentes. La capacité de pression de DPL30H ne prouve pas un avantage acoustique général. Consignez excitation, transmission, conditions avant/après et respect du démarrage, débit et échauffement. Fournissez photos, schéma de circuit et point de travail avec les sons lors d’un échange technique Foreach."
          }
        ]
      },
      {
        "title": "Spécifications et références",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les paramètres produits proviennent des spécifications Foreach ci-dessous. Vérifiez les principes et essais proposés pour le modèle précis et les conditions réelles."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00001_A04_cn_DPL30规格书.pdf",
                "label": "[F1] Foreach DPL30 spécification en chinois (A04)",
                "suffix": "p. 5–6 : performances et configuration ; p. 3–4 : montage"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00002_A02_cn_DPL60规格书.pdf",
                "label": "[F2] Foreach DPL60 spécification en chinois (A02)",
                "suffix": "p. 5–6 : performances et configuration ; p. 3–4 : montage"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2504-00001_A00_cn_DPL30H规格书.pdf",
                "label": "[F3] Foreach DPL30H spécification en chinois (A00)",
                "suffix": "p. 5–6 : performances et configuration ; p. 3–4 : montage"
              }
            ]
          }
        ]
      },
      {
        "title": "Guides de sélection et de validation associés",
        "blocks": [
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/self-priming-miniature-liquid-diaphragm-pump-selection/",
                "label": "Auto-amorçage et temps de démarrage"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-flow-pulsation-reduction/",
                "label": "Mesure et réduction des pulsations"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-backflow-check-valve/",
                "label": "Retour à l’arrêt et conception anti-siphon"
              },
              {
                "href": "/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
                "label": "Compatibilité des matériaux en contact"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "Courbes débit-pression et point de fonctionnement"
              },
              {
                "href": "/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire/",
                "label": "Commande des pompes sans balais à deux et cinq fils"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "Sélection de pompes miniatures à membrane pour liquides"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/",
                "label": "Gamme de pompes miniatures à membrane"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Questions fréquentes",
    "faqItems": [
      {
        "question": "Un bruit qui apparaît seulement dans le carter exclut-il un problème de pompe ?",
        "answer": "Non. Comparez d’abord pressions, débit, tension et bulles, puis distinguez excitation modifiée et amplification du montage."
      },
      {
        "question": "Passer à un moteur sans balais réduit-il toujours le bruit ?",
        "answer": "Non. Vitesse, tête, structure et circuit contribuent également au résultat."
      },
      {
        "question": "Faut-il seulement revérifier les décibels après amélioration ?",
        "answer": "Contrôlez aussi débit, démarrage, échauffement, raccords et apparition de nouvelles tonalités ou effets marche-arrêt."
      }
    ],
    "cta": {
      "title": "Étudiez votre sélection de pompe pour liquides",
      "description": "Précisez le fluide, le débit requis, les pressions, les conduites et les conditions de démarrage et d’arrêt pour définir modèle, matériaux et essais.",
      "contactLabel": "Contacter le support technique",
      "productsLabel": "Voir les pompes miniatures pour liquides",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  },
  "miniature-diaphragm-pump-backflow-check-valve": {
    "metadata": {
      "title": "Retour de liquide après arrêt d’une micropompe à membrane : clapet antiretour et prévention du siphonnage",
      "seoTitle": "Retour de liquide à l’arrêt : clapet et conception anti-siphon | Foreach Technology",
      "seoDescription": "Distinguez le retour vers l’amont du siphonnage dans le sens direct et des gouttes résiduelles. Vérifiez ouverture, refermeture, séquence de commande et étanchéité statique dans le circuit complet.",
      "coverImage": "/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushless-2-wire-real-product-photo.webp",
      "coverAlt": "Photographie de la pompe miniature à membrane pour liquides Foreach DPL30 sans balais à deux fils"
    },
    "deck": "Distinguez le retour vers l’amont du siphonnage dans le sens direct et des gouttes résiduelles. Vérifiez ouverture, refermeture, séquence de commande et étanchéité statique dans le circuit complet.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "En cas de retour apparent à l’arrêt, confirmez d’abord le déplacement vers l’amont et l’origine de la différence de pression inverse. Décidez ensuite si un clapet supplémentaire est nécessaire. Un écoulement continu dans le sens du pompage appelle un contrôle de gravité ou de siphon ; quelques gouttes brèves nécessitent aussi l’examen de la pression et du volume résiduels."
      },
      {
        "type": "paragraph",
        "text": "Direction, durée et pression motrice déterminent la réponse. Un clapet ordinaire ajouté systématiquement peut rester inefficace tout en créant pertes de charge et difficultés de démarrage."
      }
    ],
    "sections": [
      {
        "title": "L’arrêt moteur ne supprime pas pression et stockage",
        "blocks": [
          {
            "type": "paragraph",
            "text": "L’arrêt met fin au pompage actif, mais pas immédiatement au dénivelé, à la pression du réservoir, au gaz comprimé ou aux déformations élastiques. Un flexible pressurisé ou un amortisseur peut encore restituer du liquide."
          },
          {
            "type": "paragraph",
            "text": "Les clapets de tête dirigent aspiration et refoulement ; ils ne constituent pas automatiquement un organe de coupure validé. Sans caractéristiques d’étanchéité statique, d’ouverture et de fuite, leur présence ne prouve pas l’isolement. Évaluez séparément pression d’ouverture, capacité de débit direct et fuite interne à l’état fermé ; une propriété ne remplace pas les autres."
          },
          {
            "type": "paragraph",
            "text": "Les spécifications DPL30, DPL60 et DPL30H ne définissent pas de seuil d’écoulement direct à l’arrêt, débit de fuite inverse statique ou volume après arrêt permettant de promettre une coupure. Définissez et testez ces fonctions dans l’instrument. [F1–F3]"
          }
        ]
      },
      {
        "title": "Distinguer retour, siphon et égouttage",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Observation",
              "Mécanisme possible",
              "Vérification utile"
            ],
            "rows": [
              [
                "Gouttes brèves puis arrêt",
                "Liquide final, retour élastique, amortisseur ou gaz",
                "Pression baisse et volume cumulé atteint un plateau"
              ],
              [
                "Écoulement continu dans le sens initial",
                "Dénivelé ou pression du récipient, éventuellement siphon",
                "Débit change avec niveau ou pression"
              ],
              [
                "Liquide retourne au réservoir",
                "Pression aval, gravité inverse ou fuite de clapet",
                "Mesurer débit inverse et pression, exclure redistribution élastique"
              ],
              [
                "Quelques gouttes à la buse",
                "Mouillage, tension superficielle et rétention",
                "Pression amont stable et origine dans le tronçon final"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Ce sont des catégories de diagnostic, pas une preuve de panne. Plusieurs sources peuvent contribuer à la décharge résiduelle. Un léger recul peut redistribuer un volume élastique sans être une fuite inverse à travers la pompe."
          },
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/diaphragm-pump-rd/fr/04.svg",
            "alt": "Volume cumulé après l’arrêt",
            "width": 1000,
            "height": 650,
            "caption": "Schéma de principe : un plateau peut indiquer la libération d’un volume stocké fini ; une hausse continue nécessite de vérifier la pression motrice résiduelle. Mesurez séparément le flux inverse."
          }
        ]
      },
      {
        "title": "Pourquoi un clapet peut laisser passer un siphon direct",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Une hauteur ou pression amont suffisante et une colonne continue peuvent maintenir l’écoulement dans le sens du pompage. Lorsque le tube franchit un point haut puis débouche plus bas, examinez continuité du siphon, pression au sommet et air retenu."
          },
          {
            "type": "paragraph",
            "text": "Exemple géométrique : avec de l’eau, deux extrémités à pression atmosphérique et une sortie libre, une surface source 0,5 m au-dessus de la sortie fournit environ 4,9 kPa statiques. Le calcul utilise environ 1000 kg/m³ et 9,81 m/s², avant pertes de charge ; il ne décrit pas l’ouverture ou l’étanchéité d’une pompe Foreach. Pour une sortie immergée, utilisez le niveau libre du récipient récepteur et les pressions des deux volumes gazeux."
          },
          {
            "type": "paragraph",
            "text": "Le sens libre du clapet correspond souvent au pompage. Si la pression restante le maintient ouvert, l’écoulement continue. Vérifiez pression de refermeture, hystérésis, effet de pression aval et fuite en position fermée, en plus de la pression d’ouverture. Une valeur nominale unique ne suffit pas."
          },
          {
            "type": "paragraph",
            "text": "Les pistes comprennent repositionnement du réservoir ou de la sortie, dispositif antisiphon/de contre-pression adapté, ou vanne de coupure commandée. Pour un dispositif anti-siphon ou de contre-pression à ressort, vérifiez ouverture, refermeture, précharge et perte réelle au débit demandé. Confirmez compatibilité du fluide, pression admissible et raccordements du circuit complet."
          }
        ]
      },
      {
        "title": "Traiter séparément liquide résiduel et fuite inverse",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Si le volume cumulé atteint un plateau, contrôlez pression à l’arrêt, compliance des tuyaux, gaz, amortisseur et volume entre coupure et buse. Tubes élastiques et gaz comprimé stockent de l’énergie ; amortir les pulsations peut donc prolonger la décharge finale."
          },
          {
            "type": "paragraph",
            "text": "Un clapet fermé loin en amont ne retient pas tout le liquide déjà situé en aval. Pour un égouttage strictement limité, évaluez une coupure proche de la sortie et la séquence pompe-vanne, avec rétention, nettoyage et maintenance. Une réaspiration nécessite une hydraulique ou un actionneur compatible ; une commande d’inversion du moteur ne prouve pas un transfert liquide réversible."
          },
          {
            "type": "paragraph",
            "text": "Pour un retour réel, identifiez la pression motrice avant d’évaluer étanchéité et clapets supplémentaires. Particules, cristallisation, incompatibilité ou déformation durable peuvent modifier le contact. Vérifiez par essais de propreté, fluide et vieillissement, sans attribuer d’emblée le défaut à un matériau."
          }
        ]
      },
      {
        "title": "Recalculer le point de travail avant d’ajouter une vanne",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La perte de charge ajoutée consomme la capacité de pression différentielle. Utilisez la courbe au débit et fluide réels, en contrôlant ouverture et fermeture. Si elle comprend déjà la perte totale en position ouverte, ne rajoutez pas la pression nominale d’ouverture."
          },
          {
            "type": "paragraph",
            "text": "DPL30 et DPL60 indiquent 100 kPa ; DPL30H, 600 kPa. Ces valeurs ne sont pas simultanées avec le débit à vide. [F1–F3] Après ajout de contre-pression, relisez ou mesurez le débit à pression cible, puis répétez amorçage et niveau minimal."
          },
          {
            "type": "paragraph",
            "text": "Coordonnez pompe et vanne : fermer l’aval en maintenant la pompe peut faire monter rapidement la pression. Limitez le refoulement bloqué anormal et prévoyez la protection nécessaire selon le composant le moins résistant du circuit, pas seulement la pompe. Évaluez pression résiduelle et variation thermique du liquide piégé entre deux coupures."
          }
        ]
      },
      {
        "title": "Valider également l’état arrêté",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Conservez la géométrie finale, atteignez le régime défini, puis déclenchez arrêt et enregistrement avec le même événement. Enregistrez pression, tension ou autorisation, commande de vanne et volume recueilli après arrêt. Pour le retour, employez un instrument bidirectionnel adapté ou une mesure définie et recoupée du volume de colonne."
          },
          {
            "type": "table",
            "headers": [
              "Essai",
              "Conditions",
              "Résultat"
            ],
            "rows": [
              [
                "Écoulement direct à l’arrêt",
                "Niveau source maximal, sortie minimale, pressions des récipients",
                "Persistance du débit et pression motrice"
              ],
              [
                "Décharge résiduelle",
                "Contre-pressions, tuyaux et amortisseurs différents",
                "Volume cumulé et temps d’arrêt effectif"
              ],
              [
                "Étanchéité inverse",
                "Faibles et fortes pressions inverses possibles",
                "Volume inverse durant l’attente définie"
              ],
              [
                "Redémarrage",
                "Arrêts courts, habituels et prolongés",
                "Reprise, bulles et volume du premier cycle"
              ],
              [
                "Après endurance",
                "Fluide, nettoyage et étapes de vie requises",
                "Évolution des fuites, décharge et démarrage"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Laissez la redistribution brève de pression et volume se stabiliser avant d’interpréter une fuite persistante. Étalonnez la goutte ou pesez : sa taille varie avec buse et fluide. Délais et volumes admissibles viennent de l’instrument, pas d’une promesse antiretour non définie."
          }
        ]
      },
      {
        "title": "Préciser la fonction demandée à l’arrêt",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Pour Foreach, fournissez positions, récipients ouverts/fermés, contre-pression à l’arrêt, vannes et buse, attente maximale et volumes résiduel/inverse acceptables, en plus du débit normal. Les valeurs standard déterminent les candidats ; la commande à l’arrêt se valide avec le circuit et la séquence réels."
          },
          {
            "type": "paragraph",
            "text": "Si l’instrument demande un isolement, confiez cette fonction à un composant ou système validé. Cela évite de considérer les clapets de tête comme une coupure démontrée ou d’ajouter une résistance qui ne résout pas le problème final."
          }
        ]
      },
      {
        "title": "Spécifications et références",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les paramètres produits proviennent des spécifications Foreach ci-dessous. Vérifiez les principes et essais proposés pour le modèle précis et les conditions réelles."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00001_A04_cn_DPL30规格书.pdf",
                "label": "[F1] Foreach DPL30 spécification en chinois (A04)",
                "suffix": "p. 5–6 : performances et configuration ; p. 3–4 : montage"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00002_A02_cn_DPL60规格书.pdf",
                "label": "[F2] Foreach DPL60 spécification en chinois (A02)",
                "suffix": "p. 5–6 : performances et configuration ; p. 3–4 : montage"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2504-00001_A00_cn_DPL30H规格书.pdf",
                "label": "[F3] Foreach DPL30H spécification en chinois (A00)",
                "suffix": "p. 5–6 : performances et configuration ; p. 3–4 : montage"
              }
            ]
          }
        ]
      },
      {
        "title": "Guides de sélection et de validation associés",
        "blocks": [
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/self-priming-miniature-liquid-diaphragm-pump-selection/",
                "label": "Auto-amorçage et temps de démarrage"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-flow-pulsation-reduction/",
                "label": "Mesure et réduction des pulsations"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-noise-vibration-reduction/",
                "label": "Réduction du bruit et des vibrations"
              },
              {
                "href": "/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
                "label": "Compatibilité des matériaux en contact"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "Courbes débit-pression et point de fonctionnement"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "Sélection de pompes miniatures à membrane pour liquides"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/",
                "label": "Gamme de pompes miniatures à membrane"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Questions fréquentes",
    "faqItems": [
      {
        "question": "Un seul clapet empêche-t-il siphon et retour ?",
        "answer": "Pas nécessairement. Il limite normalement le sens inverse ; le sens direct exige de vérifier pression motrice, ouverture et refermeture."
      },
      {
        "question": "DPL30H réduira-t-elle les gouttes à l’arrêt ?",
        "answer": "Une capacité de pression supérieure ne démontre pas une meilleure étanchéité statique. Identifiez l’origine puis examinez vannes et tubes."
      },
      {
        "question": "Un petit volume résiduel indique-t-il une panne ?",
        "answer": "Non. Il peut venir du liquide final et de la détente du système. Comparez son volume dans l’intervalle défini à l’exigence applicative."
      }
    ],
    "cta": {
      "title": "Étudiez votre sélection de pompe pour liquides",
      "description": "Précisez le fluide, le débit requis, les pressions, les conduites et les conditions de démarrage et d’arrêt pour définir modèle, matériaux et essais.",
      "contactLabel": "Contacter le support technique",
      "productsLabel": "Voir les pompes miniatures pour liquides",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  }
} satisfies Record<string, DiaphragmPumpEngineeringArticleCopy>;
