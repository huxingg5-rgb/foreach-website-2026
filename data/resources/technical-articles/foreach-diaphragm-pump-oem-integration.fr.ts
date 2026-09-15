import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

export const foreachDiaphragmPumpOemIntegrationFrCopy = {
  "metadata": {
    "title": "Intégration OEM des pompes à membrane miniatures Foreach : point de fonctionnement, validation et mise en production",
    "seoTitle": "Pompes à membrane OEM Foreach | Sélection et validation",
    "seoDescription": "Guide technique des DPL30, DPL60, DPL30H et DPGL800 : bilans de débit et de pression, autoamorçage, matériaux, commande moteur, montage, essais de prototypes et mise en production.",
    "coverImage": "/images/products/pumps/diaphragm-pumps/dpl60/images/foreach-dpl60-600ml-min-brushless-pwm-miniature-liquid-diaphragm-pump-front-side.webp",
    "coverAlt": "Photographie d’une pompe à membrane miniature pour liquides Foreach DPL60, montrant les embouts cannelés et le moteur"
  },
  "deck": "La stabilité d’une pompe à membrane miniature intégrée dans un instrument OEM dépend de l’adéquation entre la fonction fluidique, les conditions d’entrée et de sortie, les matériaux, la commande et la structure de l’appareil. À partir des DPL30, DPL60, DPL30H et DPGL800 Foreach, cet article explique comment établir des configurations candidates, réaliser des essais reproductibles et transformer les résultats en exigences de fourniture en série, en examinant débit, pression, présence de gaz, matériaux mouillés et interfaces électriques.",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "Un analyseur peut devoir alimenter le liquide de lavage, rincer une chambre de réaction, évacuer les déchets et amorcer les conduites. Ces opérations imposent des exigences différentes : débit et couverture au point de lavage, reprise de l’aspiration après ingestion de gaz, débit sous contre-pression dans un tube fin, ou échauffement et durée de vie en circulation prolongée. Choisir un débit ne constitue que la première étape de l’intégration OEM."
    },
    {
      "type": "paragraph",
      "text": "L’intégration OEM désigne ici la sélection, l’adaptation et la validation d’une pompe à membrane miniature Foreach comme composant interne d’un instrument. Il faut distinguer modèles standard, configurations optionnelles et développement spécifique. Le dossier technique doit définir référence complète, limites du circuit, interfaces électriques et mécaniques, réception et gestion des modifications, afin d’unifier les bases utilisées par la R&D, les achats, la production et le service après-vente."
    },
    {
      "type": "paragraph",
      "text": "Les valeurs produit proviennent des fiches techniques chinoises Foreach citées en fin d’article. Les exemples de calcul illustrent une méthode de conception et ne sont pas des mesures d’un modèle. Réactifs réels, mélanges, montages particuliers et cycles de travail doivent être validés avec la configuration concernée dans le circuit complet."
    }
  ],
  "sections": [
    {
      "title": "1. Transformer les opérations de l’appareil en exigences vérifiables",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Une demande limitée à « 24 V, 300 mL/min, autoamorçage » ne précise pas les conditions auxquelles le débit doit être atteint. Décrire d’abord l’origine et la destination du liquide, les composants en amont et en aval, les variations de niveau et de pression, puis les critères de réussite de l’opération."
        },
        {
          "type": "table",
          "headers": [
            "Fonction de l’appareil",
            "Conditions à quantifier",
            "Observations recommandées"
          ],
          "rows": [
            [
              "Alimentation du lavage et rinçage de chambres",
              "Volume par opération, durée utile, branches simultanées, résistance des buses ou du bloc de vannes",
              "Volume réellement délivré, répartition entre branches, couverture du lavage et résidus"
            ],
            [
              "Transfert auxiliaire de réactifs ou de tampons",
              "Composition, concentration, température, débit cible, bulles et pulsations admissibles",
              "Stabilité de l’alimentation, évolution du fluide et bulles en aval"
            ],
            [
              "Circulation",
              "Débit de circulation, résistance du circuit, durée de fonctionnement et volume stocké",
              "Échauffement, variation de niveau, dérive du débit et stabilité du fluide"
            ],
            [
              "Aspiration des déchets et vidange des conduites",
              "Ordre d’arrivée du liquide et de l’air, volume résiduel, hauteur d’aspiration et pression de sortie",
              "Durée, résidus, reprise après ingestion de gaz et reflux à l’arrêt"
            ],
            [
              "Alimentation sous forte contre-pression",
              "Colmatage du filtre, pression terminale et pression transitoire maximale",
              "Débit sous contre-pression cible, échauffement et tenue en pression du circuit complet"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Il faut distinguer transfert et dosage. Une durée de marche imposée ne garantit pas à elle seule une précision volumétrique. Transitoires de démarrage et d’arrêt, élasticité des tubes, étanchéité des vannes, contre-pression et bulles modifient le volume délivré. Évaluer la nécessité d’un étalonnage, d’une mesure de débit en boucle fermée ou d’autres composants de dosage."
        },
        {
          "type": "paragraph",
          "text": "Définir les conditions normales et limites : bouteille pleine ou presque vide, tube sec ou mouillé, filtre neuf ou proche du seuil de remplacement, une ou plusieurs branches ouvertes, démarrage à froid ou à chaud. On obtient ainsi une plage vérifiable plutôt qu’un point isolé."
        }
      ]
    },
    {
      "title": "2. Présélectionner les quatre séries Foreach pour un projet OEM",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Les fiches DPL30, DPL60 et DPL30H utilisent l’eau purifiée comme fluide de référence et demandent au client d’évaluer les autres liquides. Celle du DPGL800 indique gaz et mélanges gaz/liquide. Identifier l’état du fluide avant de comparer débit et pression."
        },
        {
          "type": "table",
          "headers": [
            "Série",
            "Principales valeurs de la fiche technique",
            "Pistes d’évaluation OEM et limites"
          ],
          "rows": [
            [
              "DPL30, pompe à membrane pour liquides",
              "Débit libre 300 mL/min ; pression nominale 100 kPa ; hauteur d’autoamorçage 6 mH₂O",
              "Alimentation, lavage et petits circuits ; vérifier le débit cible avec l’aspiration et la contre-pression réelles"
            ],
            [
              "DPL60, pompe à membrane pour liquides",
              "Débit libre 600 mL/min ; pression nominale 100 kPa ; hauteur d’autoamorçage 3 mH₂O",
              "Lavage, circulation et vidange nécessitant davantage de liquide ; un débit libre supérieur ne garantit pas une durée divisée par deux dans chaque circuit"
            ],
            [
              "DPL30H, pompe à membrane haute pression pour liquides",
              "Débit libre 300 mL/min ; pression nominale 600 kPa ; hauteur d’autoamorçage 3 mH₂O",
              "Alimentation, filtration et rinçage sous contre-pression plus élevée ; 300 mL/min et 600 kPa correspondent à des conditions distinctes"
            ],
            [
              "DPGL800, pompe à membrane gaz/liquide",
              "Débit libre de gaz 6 L/min par tête ; pression positive maximale 30 kPa ; pression négative maximale < −90 kPa",
              "Aspiration de gaz et de mélanges, mise sous vide et évacuation ; 6 L/min n’est pas un débit de liquide et deux têtes ne garantissent pas 12 L/min"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "DPL30, DPL60 et DPL30H proposent des versions 12 V / 24 V, à balais ou sans balais. Le tableau de sélection standard de cette révision DPGL800 indique 24 V sans balais. Les caractères du code de commande décrivent des dimensions de configuration ; ils ne prouvent pas que toutes les combinaisons sont des modèles standard disponibles."
        },
        {
          "type": "figure",
          "src": "/images/products/pumps/diaphragm-pumps/dpl60/images/foreach-dpl60-600ml-min-brushless-pwm-miniature-liquid-diaphragm-pump-front-side.webp",
          "alt": "Photographie d’une DPL60 Foreach sans balais, avec embouts cannelés de chaque côté de la tête",
          "width": 1500,
          "height": 1499,
          "caption": "DPL60 : la disposition des embouts, du moteur et de la tête aide à évaluer le cheminement des tuyaux et l’espace de montage. Brochage, dimensions et matériaux doivent être confirmés pour la référence choisie."
        },
        {
          "type": "notice",
          "label": "Pour comparer les paramètres :",
          "text": "Débit libre, pression nominale, hauteur d’autoamorçage et vide maximal ne sont pas des performances simultanées. La pression nominale ne définit ni pression de blocage, ni pression d’éclatement, ni autorisation de fonctionnement prolongé contre une vanne fermée."
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/products/pumps/miniature-diaphragm-pumps/",
              "label": "Consulter les pompes à membrane miniatures Foreach et leurs configurations"
            }
          ]
        }
      ]
    },
    {
      "title": "3. Déduire le débit cible du volume de lavage et du temps de cycle",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Calculer le débit moyen nécessaire, puis vérifier qu’il est atteint dans le circuit réel. Délivrer 30 mL en 15 s utiles exige 120 mL/min. Déduire séparément du temps total les commutations de vannes, retards de démarrage, amorçage et délai d’arrivée du liquide au point d’utilisation."
        },
        {
          "type": "formula",
          "expression": "Q_req = 60 × V / t_eff",
          "note": "Q_req est en mL/min, V est le volume à délivrer (mL) et t_eff la durée utile (s). Exemple : 60 × 30 / 15 = 120 mL/min."
        },
        {
          "type": "paragraph",
          "text": "Si quatre branches fonctionnent simultanément, additionner leurs débits simultanés. Si elles sont rincées successivement, calculer la demande selon la séquence. Additionner toutes les valeurs nominales masque la simultanéité réelle et peut imposer inutilement un débit élevé. À l’inverse, mesurer uniquement le débit total peut cacher une alimentation insuffisante dans la branche la plus résistante."
        },
        {
          "type": "subheading",
          "title": "Relier la marge de débit à des variations identifiables"
        },
        {
          "type": "paragraph",
          "text": "La marge couvre les dispersions de fabrication, variations de viscosité, colmatage du filtre, baisse de niveau, fluctuations d’alimentation et dérive à l’usage. Déterminer comment ces facteurs modifient la courbe de pompe ou la résistance du circuit avant de fixer la marge. Un pourcentage uniforme ne remplace pas les essais aux limites."
        },
        {
          "type": "formula",
          "expression": "M_Q = (Q_available,worst − Q_req) / Q_req × 100%",
          "note": "Q_available,worst est le débit disponible dans les conditions défavorables définies, établi par une courbe adaptée ou des essais. Si l’on mesure 150 mL/min pour un besoin de 120 mL/min, la marge est de 25 %. La valeur 150 mL/min est hypothétique et ne constitue pas une garantie d’un modèle Foreach."
        },
        {
          "type": "paragraph",
          "text": "Définir aussi le débit maximal admissible. Un débit excessif peut provoquer projections, mousse ou déclenchements erronés dans une buse, une chambre ou un détecteur de niveau. Vérifier conjointement minimum et maximum et, si nécessaire, prévoir régulation de vitesse, commande de vannes ou retour de mesure."
        }
      ]
    },
    {
      "title": "4. Établir le bilan de pression et vérifier séparément aspiration et refoulement",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Tubes, raccords, vannes et filtres créent des pertes de charge ; le dénivelé impose également une pression. Établir le différentiel nécessaire au débit cible, puis le comparer aux performances de la pompe avec le même fluide, la même alimentation et la même vitesse."
        },
        {
          "type": "formula",
          "expression": "Δp_pump = (p_dest − p_source) + ρg(z_dest − z_source) + ΣΔp_loss",
          "note": "Bilan simplifié pour un liquide incompressible en régime permanent, avec différence de hauteur cinétique négligée ou traitée séparément. Les pressions utilisent la même référence et sont en Pa ; ρ en kg/m³, g en m/s² et z en m. Calculer ou mesurer les pertes au débit cible."
        },
        {
          "type": "paragraph",
          "text": "Conserver les pressions individuelles d’entrée et de sortie, en plus du différentiel total. Une dépression à l’entrée et une contre-pression en sortie affectent simultanément remplissage et refoulement. Des courbes mesurées séparément en aspiration et en refoulement ne peuvent pas être assemblées arbitrairement pour prédire le débit sous ces deux charges simultanées."
        },
        {
          "type": "subheading",
          "title": "Exemple de bilan pour un circuit de lavage à 120 mL/min"
        },
        {
          "type": "paragraph",
          "text": "Supposons un fluide proche de l’eau, une source à pression atmosphérique, la pompe située 0.5 m au-dessus de la source et la sortie 0.5 m au-dessus de la pompe. Les pertes et pressions suivantes sont des hypothèses au débit cible, destinées uniquement à illustrer le calcul."
        },
        {
          "type": "table",
          "headers": [
            "Terme du bilan",
            "Valeur d’exemple",
            "Conséquence de conception"
          ],
          "rows": [
            [
              "Dénivelé entre source et entrée de pompe",
              "Environ 4.9 kPa",
              "Abaisse la pression relative d’entrée ; vérifier à nouveau au niveau bas"
            ],
            [
              "Pertes dans la conduite d’aspiration et ses raccords",
              "3 kPa",
              "Déterminent la pression d’entrée avec le dénivelé"
            ],
            [
              "Dénivelé entre sortie de pompe et point terminal",
              "Environ 4.9 kPa",
              "Augmente la pression de sortie nécessaire"
            ],
            [
              "Pertes dans la conduite de refoulement et le bloc de vannes",
              "8 kPa",
              "Calculer pour le chemin réellement ouvert"
            ],
            [
              "Perte du filtre",
              "6 kPa propre ; 20 kPa au seuil de remplacement",
              "Couvrir le colmatage jusqu’à un critère de remplacement défini"
            ],
            [
              "Pression relative du récipient terminal",
              "15 kPa",
              "Condition de pression à destination"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Au seuil de remplacement du filtre, la pression relative d’entrée est d’environ −7.9 kPa, celle requise en sortie de 47.9 kPa, soit 55.8 kPa aux bornes de la pompe. Avec un filtre propre, le différentiel total est d’environ 41.8 kPa. La pompe doit fournir le débit cible avec dépression d’entrée et contre-pression de sortie simultanées. Le seul fait que 100 kPa nominaux dépassent 55.8 kPa ne démontre pas l’adéquation."
        },
        {
          "type": "paragraph",
          "text": "Mesurer la relation entre Q, pression d’entrée et pression de sortie, avec filtre propre puis chargé. Si le débit manque, localiser d’abord les principales pertes : élargir un tube fin, raccourcir l’aspiration, améliorer la mise à l’air du bouchon ou choisir une vanne et un filtre adaptés peut traiter la cause plus directement qu’augmenter la classe de pression de la pompe."
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/calculators/fluid-resistance/",
              "label": "Estimer les pertes des tubes et composants avec le calculateur de résistance fluidique"
            },
            {
              "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
              "label": "Pour approfondir : courbe débit–pression et point de fonctionnement"
            }
          ]
        }
      ]
    },
    {
      "title": "5. Autoamorçage et tuyauterie : étudier l’entrée de pompe séparément",
      "blocks": [
        {
          "type": "paragraph",
          "text": "L’autoamorçage évacue d’abord l’air du tube d’aspiration et de la chambre, puis établit une colonne liquide. Hauteur d’autoamorçage, délai de première sortie et délai de stabilisation sont donc distincts. La hauteur du catalogue ne garantit pas une longueur de conduite quelconque et ne remplace pas les essais à chaud, avec aspiration longue ou entrées d’air répétées."
        },
        {
          "type": "subheading",
          "title": "Pourquoi un petit diamètre intérieur augmente-t-il fortement les pertes d’aspiration ?"
        },
        {
          "type": "formula",
          "expression": "Δp = 128 μ L Q / (π d⁴)",
          "note": "La relation de Hagen–Poiseuille suppose un écoulement laminaire pleinement développé d’un fluide newtonien dans un tube droit, rigide et circulaire. Q est en m³/s, μ en Pa·s, L et d en m. Traiter séparément coudes, vannes, effets d’entrée, déformation du tuyau et mélanges gaz/liquide."
        },
        {
          "type": "paragraph",
          "text": "Pour un fluide proche de l’eau, μ = 1.0 mPa·s et ρ = 1000 kg/m³, à 120 mL/min dans un tube de 1 m et de diamètre intérieur 2.0 mm, la perte calculée est d’environ 5.09 kPa et Re d’environ 1270. Avec 3.2 mm dans les mêmes conditions, elle vaut environ 0.78 kPa et Re environ 800. Les deux calculs utilisent l’approximation laminaire ; les pertes diffèrent d’un facteur d’environ 6.55."
        },
        {
          "type": "paragraph",
          "text": "Le fait qu’un tuyau s’emboîte sur un raccord ne garantit pas une résistance acceptable. Augmenter le diamètre augmente aussi volume interne et volume de renouvellement : comparer durée d’amorçage, consommation de réactif et résidus. Un filtre d’aspiration trop fin réduit davantage la pression d’entrée lorsqu’il se charge ; le choisir selon les particules et la perte admissible."
        },
        {
          "type": "subheading",
          "title": "Distinguer entrée d’air, dégazage et vaporisation"
        },
        {
          "type": "paragraph",
          "text": "Un raccord d’aspiration non étanche laisse entrer de l’air. Une mauvaise mise à l’air du bouchon crée progressivement une dépression dans la source ; une baisse de pression peut libérer les gaz dissous. Une pression absolue locale trop basse peut aussi approcher la pression de vapeur. Température, volatilité et altitude modifient les conditions d’aspiration ; la seule pression relative ou rotation du moteur ne suffit pas."
        },
        {
          "type": "paragraph",
          "text": "Dans les limites autorisées, raccourcir l’aspiration, relever le niveau de la source ou employer des raccords dont l’étanchéité à l’air est confirmée, puis observer débit et bulles. L’absence de fuite liquide visible ne prouve pas l’absence d’entrée d’air sous vide. Après amorçage, enregistrer encore le délai de stabilisation du débit de sortie."
        },
        {
          "type": "figure",
          "src": "/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushless-2-wire-real-product-photo.webp",
          "alt": "Photographie de la DPL30 Foreach sans balais à deux fils, avec embouts cannelés, tête et fils d’alimentation",
          "width": 1200,
          "height": 1200,
          "caption": "DPL30 sans balais à deux fils : tenir compte du diamètre intérieur du tuyau, de son insertion et maintien, du rayon de courbure et des efforts sur le faisceau. La photo ne remplace ni plan coté ni définition du câblage."
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/technical-articles/self-priming-miniature-liquid-diaphragm-pump-selection/",
              "label": "Pour approfondir : sélection et validation de l’autoamorçage"
            }
          ]
        }
      ]
    },
    {
      "title": "6. Forte contre-pression : valider la capacité de pompage et la protection du système",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Filtration, blocs de vannes successifs, conduites longues et fines ou pulvérisation peuvent exiger un refoulement élevé. Les 300 mL/min à débit libre et 600 kPa nominaux de la DPL30H en font une candidate, mais son débit varie avec la pression : cela ne signifie pas 300 mL/min à 600 kPa."
        },
        {
          "type": "paragraph",
          "text": "Définir d’abord le débit et la pression réellement nécessaires au point d’utilisation. Vérifier ensuite la pression admissible des raccords, vannes, filtres, capteurs et tubes à la température réelle. Une pompe plus haute pression n’augmente pas la résistance des autres composants ; le plus faible peut limiter tout le système."
        },
        {
          "type": "figure",
          "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushless-diaphragm-analyzer-wash-pump.webp",
          "alt": "Photographie de la DPL30H haute pression sans balais, montrant les raccords à compression et les trous de fixation",
          "width": 1500,
          "height": 1500,
          "caption": "DPL30H : évaluer la position des raccords et fixations avec le trajet des tubes rigides et le support. Cette révision indique un tube de diamètre extérieur 6 mm et intérieur 4 mm. Le montage des tuyaux DPL30/DPL60 n’est pas directement transposable."
        },
        {
          "type": "paragraph",
          "text": "Inclure la séquence de commande : fermer la vanne aval avant d’arrêter la pompe peut créer une surpression transitoire. Après coupure, tuyaux, volumes tampons et liquide sous pression peuvent encore stocker de l’énergie. Prévoir mesure, arrêt, décharge ou dérivation selon le risque ; vérifier les délais d’échantillonnage et d’action. Les essais de fermeture et de défaut doivent avoir lieu dans un montage maîtrisé et protégé, avec conditions convenues."
        },
        {
          "type": "paragraph",
          "text": "Cette fiche DPL30H indique +5 à +40 ℃ pour le fluide, contre +5 à +80 ℃ sur les pages DPL30/DPL60. Ne pas transférer les plages entre séries. Même dans la plage de la pompe, vérifier raccords, tubes, vannes et environnement de l’instrument."
        }
      ]
    },
    {
      "title": "7. Aspiration gaz/liquide : déterminer si le liquide traverse la pompe",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Deux architectures sont courantes : faire traverser directement la pompe par le liquide ou le mélange, ou collecter les déchets dans un récipient fermé et aspirer son espace gazeux. Les données de sélection et les essais diffèrent ; l’appellation « pompe à déchets » ne les rend pas équivalentes."
        },
        {
          "type": "table",
          "headers": [
            "Architecture",
            "Données principales",
            "Situations anormales à vérifier"
          ],
          "rows": [
            [
              "Aspiration directe de mélange gaz/liquide",
              "Propriétés du liquide, proportion gaz/liquide et variations, hauteur d’aspiration, contre-pression",
              "Retour du liquide après une longue phase gazeuse, mousse, bouchons liquides, résidus à l’arrêt et redémarrage"
            ],
            [
              "Mise sous vide d’un récipient à déchets",
              "Volume gazeux, pression absolue cible, fuites d’air et courbe d’aspiration",
              "Surremplissage, mousse dépassant le séparateur, filtre de protection mouillé ou bouché"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Cette fiche DPGL800 présente la courbe de débit gazeux d’une tête et une courbe de mise en pression pour 5 L. Elles permettent une évaluation dans les conditions correspondantes. La durée réelle dépend du volume gazeux effectif, du raccordement, des résistances, des fuites et de la pression. Diviser le volume de déchets liquides par 6 L/min ne donne pas le temps de vidange."
        },
        {
          "type": "formula",
          "expression": "t ≈ (V_g / S_eff) × ln(p₀ / p₁)",
          "note": "Estimation grossière pour un volume fermé, approximativement isotherme, sans fuite et à vitesse de pompage effective presque constante. p₀ et p₁ sont des pressions absolues ; V_g et S_eff doivent utiliser des unités cohérentes. Si la vitesse varie avec la pression, intégrer la courbe ou mesurer. Les 6 L/min libres par tête ne sont pas une vitesse constante pendant toute l’évacuation."
        },
        {
          "type": "paragraph",
          "text": "Avec une entrée d’air continue, le vide stabilisé dépend de la capacité effective d’aspiration et de la charge gazeuse. Distinguer dans le logiciel évacuation en cours, vide atteint, délai dépassé et récipient plein. Deux têtes en série, en parallèle ou indépendantes modifient performances et charges ; documenter le raccordement et obtenir les données adaptées."
        },
        {
          "type": "figure",
          "src": "/images/products/pumps/diaphragm-pumps/dpgl800/images/foreach-dpgl800-6l-min-gas-brushless-diaphragm-vacuum-pump.webp",
          "alt": "Photographie du DPGL800 Foreach gaz/liquide : deux têtes, montage et accessoires de raccordement",
          "width": 1500,
          "height": 1500,
          "caption": "DPGL800 à deux têtes : la photo comprend des adaptateurs montés. Les orifices nus sont indiqués G1/8 femelle dans cette fiche. Confirmer séparément accessoires et raccordement des têtes."
        },
        {
          "type": "paragraph",
          "text": "Si le liquide ne doit pas atteindre le côté aspiration de gaz, prévoir séparation gaz/liquide, protection contre le trop-plein et détection associée. Même une pompe compatible avec les mélanges doit être testée avec mousse, condensats corrosifs, dépôts et fonctionnement prolongé chargé de liquide."
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/technical-articles/ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump/",
              "label": "Pour approfondir : pompe pour liquides ou gaz/liquide en aspiration de déchets IVD"
            }
          ]
        }
      ]
    },
    {
      "title": "8. Matériaux mouillés : valider la configuration complète et le procédé",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Les éléments mouillés comprennent tête, membrane, éléments de clapet, joints et raccordements selon la construction. Examiner tous les matériaux ; une membrane PTFE ne rend pas toute la pompe compatible avec n’importe quel fluide. Exposition réelle, grade, formulation, température et durée de contact influencent le résultat."
        },
        {
          "type": "paragraph",
          "text": "La sélection DPL30 distingue EP/PS et FF/PS : membrane EPDM, clapets EPDM et tête PPS pour la première ; membrane PTFE, clapets FFKM et tête PPS pour la seconde. Vérifier ces combinaisons avec le fluide précis. Changer membrane et clapets peut modifier élasticité, ouverture, fermeture, étanchéité et transfert ; relier essais matériaux et essais fonctionnels."
        },
        {
          "type": "subheading",
          "title": "Pourquoi un essai à l’eau pure ne représente pas un usage prolongé avec des réactifs"
        },
        {
          "type": "paragraph",
          "text": "Solvants, sels, tensioactifs et agents nettoyants influencent mouillage, viscosité, mousse et contact avec les matériaux. Circulation et évaporation peuvent concentrer le fluide ; un arrêt prolongé peut laisser cristaux ou résidus secs ; le nettoyage peut alterner plusieurs produits. Ces facteurs expliquent des écarts avec un essai à l’eau pure à température ambiante."
        },
        {
          "type": "table",
          "headers": [
            "Étape de validation",
            "Conditions d’essai",
            "Contrôles recommandés"
          ],
          "rows": [
            [
              "Présélection des matériaux",
              "Composition exacte, concentration maximale, température et durée de contact",
              "Masse, dimensions, gonflement, ramollissement et fissures ; extractibles et contamination selon le projet"
            ],
            [
              "Essais dynamiques de la pompe complète",
              "Fluide réel, point de fonctionnement, démarrages et alternance gaz/liquide",
              "Évolution du débit, amorçage, différentiel de pression, étanchéité, bruit et courant"
            ],
            [
              "Arrêt et nettoyage",
              "Arrêt maximal, séchage des résidus, nettoyants et séquences réels",
              "Cristallisation, collage, redémarrage, résidus et récupération des performances"
            ],
            [
              "Aptitude au procédé",
              "Conditions représentatives des échantillons ou analyses réels",
              "Effets sur blanc analytique, contamination, transfert résiduel et résultat de l’instrument"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "L’immersion élimine les incompatibilités évidentes, sans reproduire entièrement la flexion répétée de la membrane ni l’étanchéité dynamique des clapets. Associer observations avant/après immersion et essais de pompe, en consignant matériaux et référence complète. Si la formule du réactif est confidentielle, transmettre les informations nécessaires à l’évaluation sous un accord de protection adapté."
        },
        {
          "type": "paragraph",
          "text": "Le dossier d’achat doit détailler matériaux de tête, membrane, clapets et joints, plutôt que « version anticorrosion ». En cas de divergence entre résumé, tableau de sélection ou document ancien, clarifier la configuration de commande et les documents approuvés par les deux parties avant de figer prototype et série."
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
              "label": "Pour approfondir : choix des matériaux mouillés des pompes à membrane miniatures"
            }
          ]
        }
      ]
    },
    {
      "title": "9. Moteur et commande : vérifier alimentation, vitesse et retour d’état",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Le choix avec ou sans balais n’est qu’un début. Préciser tension, démarrage, chute dans le faisceau, interface de puissance, consigne, retour et états de défaut. Les fiches DPL30/DPL60 décrivent deux fils par défaut et d’autres options de sortie. Un échantillon peut différer d’un schéma générique : vérifier sa référence complète avant câblage."
        },
        {
          "type": "table",
          "headers": [
            "Fonction de commande",
            "À confirmer",
            "Vérification souvent oubliée"
          ],
          "rows": [
            [
              "Alimentation et démarrage",
              "Tension nominale et plage, courant de démarrage, faisceau et connecteurs",
              "Stabilité de la tension aux bornes de la pompe et du contrôleur lors de démarrages simultanés de pompes ou d’électrovannes"
            ],
            [
              "Alimentation à deux fils",
              "Marche/arrêt, autorisation de variation de tension ou de hachage, comportement à la mise sous tension",
              "Redémarrage à basse tension et sous charge ; ne pas appliquer une commande unique à toutes les versions sans balais à deux fils"
            ],
            [
              "Entrée de vitesse indépendante",
              "Niveau, fréquence, rapport cyclique, impédance et comportement flottant",
              "Vitesse minimale stable, démarrage, zone morte et consigne définie à la mise sous tension"
            ],
            [
              "Retour de vitesse FG",
              "Impulsions par tour, type de sortie, résistance de rappel et fenêtre de mesure",
              "Parasites, impulsions manquées à basse vitesse, maintien du signal lors d’un blocage ou d’une aspiration à sec"
            ],
            [
              "Sens de rotation",
              "Fonction DIR et états logiques autorisés",
              "Vérifier le sens de transfert imposé par les clapets après inversion moteur ; ne pas en déduire un débit réversible"
            ]
          ]
        },
        {
          "type": "subheading",
          "title": "Le retour de vitesse n’est pas une mesure directe du débit"
        },
        {
          "type": "formula",
          "expression": "Q ≈ V_eff × n",
          "note": "V_eff est le volume effectivement délivré par tour et n la vitesse. V_eff varie avec pression, gaz, fluide, clapets et étanchéité ; une vitesse fixe ne garantit donc pas un débit fixe."
        },
        {
          "type": "paragraph",
          "text": "Cette table DPL30H sans balais indique 3 impulsions carrées FG par tour : n = 60f/3, avec f en Hz. Ne pas étendre cette valeur aux autres moteurs. Un FG normal peut coexister avec manque de liquide, entrée d’air ou défaut de clapet ; choisir une mesure de débit, pression ou niveau adaptée à la tâche."
        },
        {
          "type": "paragraph",
          "text": "La même fiche DPL30H indique arrêt à 0–0.25 V sur PWM, pleine vitesse en entrée flottante ou à 4.5–5 V, et commande PWM ou 0–5 V. Prévoir les états à la mise sous tension, réinitialisation, rupture de câble et avant initialisation. Fréquence PWM, courant d’entrée et circuit de sortie non précisés doivent être confirmés pour la configuration, sans recopier un autre modèle."
        },
        {
          "type": "paragraph",
          "text": "Le nombre de fils visible sur la photo DPGL800 ne définit pas leurs fonctions. Cette table électrique indique VCC et GND ; confirmer séparément les autres besoins de commande ou retour. Pour chaque configuration, enregistrer tension à la pompe, vitesse ou consigne avec le débit réel afin de séparer défauts d’alimentation, de commande et de circuit."
        },
        {
          "type": "paragraph",
          "text": "Une boucle fermée doit prendre en compte position du capteur, filtrage, délais, zone morte et limites de sortie. Éviter de corriger fortement la vitesse à chaque pulsation. Fixer la bande passante selon la réponse et les fluctuations admissibles, puis tester changements de consigne et commutations de branches."
        }
      ]
    },
    {
      "title": "10. Intégration mécanique : dimensions, efforts aux raccords et maintenance",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Les dimensions hors tout ne couvrent que le corps. Prévoir courbure des tuyaux, longueur d’assemblage des tubes rigides, accès aux connecteurs, maintien du faisceau, refroidissement et remplacement. La documentation DPL30/DPL60 sans balais mentionne des moteurs A/B aux performances équivalentes mais aux montages différents : l’équivalence électrique ne prouve pas l’interchangeabilité mécanique."
        },
        {
          "type": "paragraph",
          "text": "Cette version DPL30/DPL60 reçoit un tuyau de diamètre intérieur 3.2 mm. Matériau, épaisseur, dureté, profondeur d’insertion et fixation influencent étanchéité et résistance à l’arrachement. Pour la DPL30H à compression, vérifier matériau, diamètre extérieur, coupe, montage et support afin de ne pas transmettre durablement les efforts de flexion aux orifices."
        },
        {
          "type": "paragraph",
          "text": "Les vibrations passent par supports et tubes jusqu’au boîtier, dont les grandes parois peuvent les amplifier. Évaluer isolateurs, charge, rigidité et contraintes de tuyauterie ensemble. Un support trop souple augmente le déplacement ; un tube rigide ou faisceau trop tendu peut court-circuiter l’isolateur. Comparer avec orientation, couple de serrage et boîtier réels."
        },
        {
          "type": "paragraph",
          "text": "Prévoir vidange des résidus, démontage des raccords, réamorçage et contrôle de fuite après remplacement. Documenter orientations spéciales et longueurs de faisceau dans plans et configuration, pour éviter de transférer en série les bricolages de tuyauterie ou de câblage du prototype."
        }
      ]
    },
    {
      "title": "11. Pulsations, bruit et reflux : évaluer le résultat dans le procédé",
      "blocks": [
        {
          "type": "paragraph",
          "text": "La membrane fait varier périodiquement le volume de chambre et les clapets assurent le transfert. Les fluctuations instantanées de débit et pression sont modifiées par élasticité, compressibilité, bulles, volumes tampons et vannes. Un débit moyen conforme ne garantit pas l’état instantané de la buse ni le signal du capteur."
        },
        {
          "type": "subheading",
          "title": "Évaluer amortissement, réponse dynamique et résidus ensemble"
        },
        {
          "type": "paragraph",
          "text": "Tuyaux, chambres tampons et amortisseurs peuvent réduire les fluctuations, mais modifient volume, réponse en pression, renouvellement et résidus. Mesurer au point terminal les signaux avant/après, le volume délivré et l’écoulement après arrêt. Des bulles piégées non maîtrisées peuvent lisser temporairement le débit tout en rendant les démarrages incohérents."
        },
        {
          "type": "paragraph",
          "text": "Documenter point de mesure, étendue, bande passante, échantillonnage et filtrage. Un affichage stable peut être une moyenne fortement filtrée ; un échantillonnage lent peut manquer des pics. Adapter capteur et acquisition aux fréquences et transitoires recherchés."
        },
        {
          "type": "subheading",
          "title": "Valider séparément bruit et étanchéité à l’arrêt"
        },
        {
          "type": "paragraph",
          "text": "Comparer le bruit à distance, pondération, bruit de fond, support, régime et boîtier identiques. Des dB mesurés dans des conditions différentes ne justifient pas une promesse acoustique de l’instrument. Si nécessaire, enregistrer vitesse, pression et vibration pour distinguer moteur, excitation hydraulique et résonance."
        },
        {
          "type": "paragraph",
          "text": "Les clapets internes servent au cycle de pompage et ne garantissent pas l’étanchéité durable d’une vanne d’isolement. Dénivelé, pression aval stockée et connexions peuvent provoquer reflux, gouttes ou siphonnage à l’arrêt. Tester la tenue dans le sens de pression réel ; si une isolation est nécessaire, évaluer les organes dédiés et leurs pertes supplémentaires."
        }
      ]
    },
    {
      "title": "12. Construire un banc d’essai et une réception reproductibles",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Distinguer performance de la pompe et performance du circuit complet. Établir une base avec tube court et alimentation liquide connue, puis ajouter vannes, filtres, raccords et sortie réels. Modifier un facteur identifié à la fois et relever débit, pressions, tension, courant et température avant/après."
        },
        {
          "type": "subheading",
          "title": "Vérifier le volume délivré par la méthode gravimétrique"
        },
        {
          "type": "formula",
          "expression": "Q_avg = 60 × Δm / (ρ × Δt)",
          "note": "Δm est la masse collectée (g), ρ la masse volumique à la température d’essai (g/mL), Δt la durée (s) ; le résultat est en mL/min. Exemple : 30 g en 15 s, à 1.00 g/mL, donnent 120 mL/min."
        },
        {
          "type": "paragraph",
          "text": "En débit continu, définir une fenêtre après stabilisation et maîtriser changements de récipient, évaporation, projections et gouttes résiduelles. Pour une opération unique, conserver démarrage et arrêt et préciser si les gouttes retardées comptent ; la phase stable ne représente pas le cycle complet. Résolution de balance et erreurs de temps et de densité doivent rester nettement sous la tolérance du projet."
        },
        {
          "type": "paragraph",
          "text": "Valider aussi le débitmètre en ligne sous pulsations : réponse, acquisition, plage, orientation et sensibilité aux bulles influencent les mesures, et l’appareil ajoute une perte de charge. Comparer le volume cumulé par gravimétrie au total en ligne et au signal instantané pour ne pas confondre erreur de mesure et variation de pompe."
        },
        {
          "type": "table",
          "headers": [
            "Essai",
            "Conditions et relevés",
            "Critères à convenir avant les essais"
          ],
          "rows": [
            [
              "Point de fonctionnement et marge",
              "Fluide réel, niveau bas, filtre chargé, limites d’alimentation ; Q, p_in et p_out synchronisés",
              "Débit terminal minimal/maximal, volume et durée"
            ],
            [
              "Autoamorçage et redémarrage",
              "Tube sec, mouillé, après arrêt et après entrée d’air lors du changement de bouteille",
              "Première sortie, stabilisation et nombre de tentatives autorisées"
            ],
            [
              "Étanchéité et maintien à l’arrêt",
              "Pression positive, dépression, dénivelé et durée de maintien",
              "Fuite externe, entrée d’air, reflux ou gouttes admissibles"
            ],
            [
              "Électricité et commande",
              "Démarrage à froid/chaud, charges simultanées et signaux anormaux",
              "Stabilité d’alimentation, état par défaut, retour valide et réponse aux défauts"
            ],
            [
              "Aspiration gaz/liquide",
              "Séquences gazeuses et liquides, mousse et volumes gazeux représentatifs",
              "Durée d’aspiration, résidus, établissement et récupération du vide"
            ],
            [
              "Résultat du procédé",
              "Objets à nettoyer, réactifs et séquence réels",
              "Résidus, transfert entre échantillons et variations admissibles du résultat"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Conserver au minimum identifiant échantillon, référence complète, matériaux, moteur, schéma, lot de fluide, température, alimentation, version logicielle, étalonnage des instruments et données brutes. Comparer à conditions identiques. Une simple moyenne efface les indices de défauts de démarrage, dérive et incidents intermittents."
        },
        {
          "type": "paragraph",
          "text": "Examiner moyenne, dispersion et pire échantillon. Fixer les seuils d’après les besoins avant l’essai, sans les déduire ensuite des performances observées. En cas d’échec, investiguer alimentation, commande, aspiration, refoulement, étanchéité et matériaux, puis retester la configuration corrigée."
        }
      ]
    },
    {
      "title": "13. Durée de vie : relier les heures continues au profil de mission réel",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Ces fiches indiquent 3000 h à balais et 10000 h sans balais pour DPL30, DPL60 et DPL30H, sous tension nominale en continu ; DPGL800 indique 10000 h. Ces valeurs ne sont ni la durée de vie de l’instrument ni une garantie pour tout fluide, toute contre-pression et tout nombre de démarrages."
        },
        {
          "type": "paragraph",
          "text": "Quelques heures quotidiennes peuvent contenir de nombreux cycles courts ; un usage continu peut imposer une forte pression ; un arrêt prolongé peut exposer à un fluide cristallisant. Membrane, clapets, moteur, raccords et électronique subissent des charges différentes : établir le profil de mission."
        },
        {
          "type": "formula",
          "expression": "D = t_on / (t_on + t_off)；T_run = N_cycles × t_on",
          "note": "D est le rapport cyclique, T_run le temps cumulé ; t_on et t_off utilisent la même unité. Relever aussi démarrages, pression, température, fluide et durée de chaque marche. Le rapport cyclique seul ne permet pas de convertir la durée de vie."
        },
        {
          "type": "paragraph",
          "text": "Pendant l’endurance, recontrôler périodiquement débit au point de travail, amorçage, étanchéité, démarrage, courant et échauffement. Une pompe qui tourne encore mais ne fournit plus le débit requis a échoué fonctionnellement. Définir à l’avance les critères d’arrêt : dérive, fuite, impossibilité de redémarrer, défaut de commande ou de procédé."
        },
        {
          "type": "paragraph",
          "text": "Un essai accéléré doit relier facteur d’accélération et mécanisme de défaillance. Augmenter température, pression ou concentration peut créer un défaut absent en service ; ne pas appliquer arbitrairement un facteur de conversion. Choisir effectif et durée selon le risque et les objectifs statistiques. Un seul échantillon réussi ne démontre pas la distribution de durée de vie de la série."
        },
        {
          "type": "paragraph",
          "text": "Préciser les conditions des comparaisons : deux pompes satisfaisant le même instrument prouvent seulement l’adaptation aux conditions validées. Forme proche, débit nominal identique ou essai bref réussi ne démontrent pas une équivalence complète."
        }
      ]
    },
    {
      "title": "14. Sélection standard, adaptation et développement spécifique",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Foreach propose des composants microfluidiques et un accompagnement des circuits : validation de prototypes, adéquation des paramètres et adaptation à l’espace, aux interfaces, au fluide et à la commande. Pour un projet OEM, évaluer d’abord les modèles existants, puis les configurations, et enfin le besoin de développement dédié."
        },
        {
          "type": "table",
          "headers": [
            "Niveau d’intégration",
            "À préciser",
            "Base de livraison"
          ],
          "rows": [
            [
              "Sélection standard",
              "Adéquation du modèle, de la tension, du moteur, des matériaux et interfaces",
              "Fiche officielle, référence complète, configuration échantillon et validation"
            ],
            [
              "Adaptation de configuration",
              "Disponibilité des fils, orientations, matériaux et options pour le modèle choisi",
              "Plans et câblage confirmés, liste de configuration et périmètre des nouveaux essais"
            ],
            [
              "Développement spécifique",
              "Objectifs de performance, espace, interface ou commande non couverts par le standard",
              "Faisabilité, limites du développement, plan d’échantillons, réception et responsabilités"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Une orientation de port résout surtout le montage ; un matériau peut modifier compatibilité et pompage ; moteur et commande influencent alimentation, chaleur, bruit et retour. Même une modification locale nécessite d’identifier les performances affectées et les validations à répéter."
        },
        {
          "type": "paragraph",
          "text": "Placer vannes, raccords, tubes et mesure de pression sur le même schéma pour les évaluer ensemble. Cette approche réduit les omissions entre interfaces et conditions. Périmètre, configurations disponibles, délais, quantités et réception restent à confirmer pour chaque projet."
        }
      ]
    },
    {
      "title": "15. Du prototype à la série : figer configuration et réception traçables",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Après validation du prototype, transformer « cet échantillon fonctionne » en « les livraisons suivantes sont réceptionnées selon les mêmes conditions ». La démarche suivante est recommandée ; procédure et responsabilités doivent être convenues entre fabricant d’équipement et Foreach."
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Figer les exigences : schéma, fluide, plage de travail, cadence, environnement, durée de vie cible et états de défaut.",
            "Identifier l’échantillon : référence complète, matériaux, moteur, ports, orientations, faisceau et versions des plans et documents.",
            "Valider : base, conditions limites, procédé et endurance ; conserver analyses d’échec et révisions.",
            "Monter une présérie : dispersion, efficacité d’assemblage, cohérence des raccordements, outillages de test et remplacement en maintenance.",
            "Convenir de la réception série : distinguer contrôle entrant, essais de sortie et qualification de type ; fixer échantillons, critères et traçabilité.",
            "Gérer les modifications : convenir notification, évaluation et revalidation des changements de matériaux, membranes, clapets, moteurs, fils, raccords ou procédés affectant les performances."
          ]
        },
        {
          "type": "paragraph",
          "text": "Une désignation d’achat courte exige une annexe technique complète. « DPL30 sans balais » n’identifie pas tension, matériaux mouillés, fils et ports. Ne pas limiter la réception à l’aspect et au débit libre : retenir des conditions représentatives selon le risque, reliées à la validation de conception."
        },
        {
          "type": "subheading",
          "title": "Informations à joindre à une demande OEM Foreach"
        },
        {
          "type": "table",
          "headers": [
            "Catégorie",
            "Informations recommandées"
          ],
          "rows": [
            [
              "Appareil et opération",
              "Type d’appareil, fonction de la pompe, volume, durée utile et branches simultanées"
            ],
            [
              "Fluide",
              "Composition ou informations chimiques nécessaires, concentration, température, viscosité, particules, mousse, nettoyants et résidus à l’arrêt"
            ],
            [
              "Circuit",
              "Schéma, matériaux et diamètres intérieur/extérieur des tubes, longueurs, vannes/filtres/raccords, niveaux, mise à l’air et pression terminale"
            ],
            [
              "Performance",
              "Débits minimal/maximal, pressions d’entrée/sortie, pulsations, délais d’amorçage/évacuation, résidus et étanchéité"
            ],
            [
              "Électricité et mécanique",
              "Alimentation, consigne, retour, démarrage, plan de montage, orientation, faisceau et espace de maintenance"
            ],
            [
              "Validation et fourniture",
              "Profil de mission, critères, plan d’échantillons, volume prévu, phase de développement, cohérence série et changements"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Si les informations manquent, commencer par l’usage de l’appareil, son schéma et les problèmes observés. Transformer progressivement les inconnues en mesures ou confirmations, puis en configurations candidates et plan de validation. Le choix de pompe sera ainsi relié explicitement à la fonction d’alimentation, lavage ou évacuation."
        }
      ]
    },
    {
      "title": "16. Documentation et lectures complémentaires",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Les paramètres proviennent des fiches chinoises Foreach ci-dessous : pages de performances pour les conditions, tableaux de sélection pour les configurations, plans et tables électriques pour le montage. Vérifier la révision avant commande et obtenir une confirmation spécifique pour fluide, commande ou interface particuliers."
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00001_A04_cn_DPL30规格书.pdf",
              "label": "Fiche chinoise DPL30 | PS-150B-2412-00001, A04 : performances, matériaux et fils"
            },
            {
              "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00002_A02_cn_DPL60规格书.pdf",
              "label": "Fiche chinoise DPL60 | PS-150B-2412-00002, A02 : performances, dimensions et sélection"
            },
            {
              "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2504-00001_A00_cn_DPL30H规格书.pdf",
              "label": "Fiche chinoise DPL30H | PS-150B-2504-00001, A00 : contre-pression, raccords rigides et commande sans balais"
            },
            {
              "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2506-00001_A00_cn_DPGL800气液混合泵规格书.pdf",
              "label": "Fiche chinoise DPGL800 | PS-150B-2506-00001, A00 : débit gazeux, mise en pression et deux têtes"
            },
            {
              "href": "/resources/datasheets/",
              "label": "Fiches techniques et catalogues Foreach"
            },
            {
              "href": "/",
              "label": "Composants microfluidiques et accompagnement technique Foreach"
            },
            {
              "href": "/resources/technical-articles/miniature-diaphragm-pump-flow-pulsation-reduction/",
              "label": "Causes et réduction des pulsations de débit"
            },
            {
              "href": "/resources/technical-articles/miniature-diaphragm-pump-backflow-check-valve/",
              "label": "Reflux à l’arrêt et choix d’un clapet antiretour"
            }
          ]
        }
      ]
    }
  ],
  "faqTitle": "Questions techniques sur l’intégration OEM Foreach",
  "faqItems": [
    {
      "question": "L’intégration OEM exige-t-elle toujours de développer une nouvelle pompe ?",
      "answer": "Non. Évaluer d’abord les modèles standard avec fluide, point de travail, interfaces et commande définis. S’ils ne suffisent pas, étudier options ou développement et confirmer les effets sur performances, structure et essais. Disponibilité et périmètre restent propres au projet."
    },
    {
      "question": "Pour 120 mL/min, une DPL30 à débit libre de 300 mL/min suffit-elle ?",
      "answer": "Le débit libre seul ne permet pas de conclure. Vérifier le débit avec dépression d’entrée, contre-pression, température, filtre chargé et alimentation réels, puis comparer besoin et marge. Définir conditions défavorables et critères avant validation."
    },
    {
      "question": "La DPL30H fournit-elle 300 mL/min à 600 kPa ?",
      "answer": "Non. 300 mL/min est le débit libre et 600 kPa la pression nominale. Consulter la courbe correspondante et vérifier dans le circuit. La pression nominale n’autorise pas un fonctionnement prolongé vanne fermée."
    },
    {
      "question": "Peut-on compter 12 L/min de liquide avec les deux têtes DPGL800 ?",
      "answer": "Non. Les 6 L/min concernent le gaz à débit libre par tête. Les performances en série, parallèle ou indépendantes dépendent du raccordement, de la pression et de la charge. Mesurer le temps d’aspiration avec le mélange et la tuyauterie réels."
    },
    {
      "question": "Le retour de vitesse prouve-t-il que le liquide est correctement transféré ?",
      "answer": "Il indique la rotation du moteur, pas à lui seul le débit liquide. Il peut persister malgré manque de liquide, entrée d’air ou défaut de clapet. Ajouter selon le procédé une observation du débit, de la pression, du niveau ou des bulles."
    },
    {
      "question": "PTFE et FFKM permettent-ils de supprimer les essais de fluide ?",
      "answer": "Non. Confirmer tous les matériaux mouillés et tester composition, concentration, température, arrêt et nettoyage réels. Après présélection des matériaux, valider la pompe en dynamique et l’aptitude au procédé."
    },
    {
      "question": "Les 10000 h de la fiche sont-elles la durée de vie de l’instrument OEM ?",
      "answer": "Non. Elles correspondent à une tension nominale et une marche continue. Fluide, pression, température, démarrages et arrêts du projet peuvent différer ; utiliser profil de mission, critères de défaillance et endurance pour valider l’application."
    },
    {
      "question": "Quels documents figer après confirmation du modèle ?",
      "answer": "Configuration complète, matériaux, plan de montage, ports et brochage, commande, conditions fluidiques, méthodes de réception et dossier échantillon. Convenir aussi de la traçabilité série et de l’évaluation/revalidation des modifications influant sur les performances."
    }
  ],
  "cta": {
    "title": "Décrivez votre circuit OEM pour évaluer une configuration adaptée",
    "description": "Indiquez fonction, fluide et température, débit cible, pressions d’entrée/sortie, cycle, interfaces, espace et phase du projet. Foreach pourra discuter modèle et configuration et préciser les conditions à valider.",
    "contactLabel": "Soumettre une demande technique",
    "productsLabel": "Voir les pompes à membrane miniatures",
    "productsHref": "/products/pumps/miniature-diaphragm-pumps/"
  }
} satisfies DiaphragmPumpEngineeringArticleCopy;
