import type { PumpApplicationArticleCopy, PumpApplicationArticleSlug } from "./pump-application-articles.types";

export const pumpApplicationArticlesFr = {
  "clinical-chemistry-piston-pump-100-250-500-ul-selection": {
    "metadata": {
      "title": "Choisir une pompe à piston de 100, 250 ou 500 μL pour le dosage en biochimie clinique",
      "seoTitle": "Pompes à piston de 100, 250 ou 500 μL en biochimie clinique | Foreach Technology",
      "seoDescription": "Comparez le volume par dose, la fraction de course utilisée, le nombre de distributions et les temps de remplissage, puis évaluez les configurations Foreach EA, SM et TM sur le circuit réel de l'analyseur.",
      "coverImage": "/images/resources/technical-articles/pump-application-guides/piston-capacity-series.png",
      "coverAlt": "Pompes à piston Foreach de plusieurs capacités, notamment 100, 250 et 500 μL"
    },
    "deck": "Comparez le volume par dose, la fraction de course utilisée, le nombre de distributions et les temps de remplissage, puis évaluez les configurations Foreach EA, SM et TM sur le circuit réel de l'analyseur.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "Pour sélectionner une pompe à piston destinée à la biochimie clinique, identifiez d'abord sa fonction : distribution directe de réactif, dosage d'échantillon, ajout de diluant ou déplacement d'un échantillon à la pointe par un liquide système. Les valeurs de 100, 250 et 500 μL désignent des capacités nominales. Le choix dépend du volume réellement délivré à chaque dose, du nombre de doses après une aspiration et du temps disponible pour l'ensemble de la séquence."
      }
    ],
    "sections": [
      {
        "title": "1. Traduire le dosage en données précises",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Si le réactif traverse la chambre de pompage, la compatibilité doit couvrir la tête, le piston, les joints et les vannes. Si le liquide système déplace l'échantillon à la pointe, il faut aussi examiner l'interface entre liquides, l'échantillon résiduel et le transfert complet. Des volumes de consigne similaires peuvent donc nécessiter des circuits mouillés et des méthodes de vérification différents."
          },
          {
            "type": "table",
            "headers": [
              "Donnée d'entrée",
              "Éléments à préciser",
              "Décision correspondante"
            ],
            "rows": [
              [
                "Volumes par dose",
                "Volumes délivrés minimal, habituel et maximal, en μL",
                "Plage de course utile et points d'essai"
              ],
              [
                "Séquence de distribution",
                "Doses par aspiration ; volumes égaux ou variables",
                "Bilan de capacité et nombre d'aspirations"
              ],
              [
                "Fenêtre temporelle",
                "Aspiration, commutation des vannes, distribution, stabilisation et remplissage",
                "Faisabilité du cycle complet"
              ],
              [
                "Circuit de liquide",
                "Composition, température, niveaux, contre-pression, vannes et pointe",
                "Matériaux et volume effectivement délivré"
              ],
              [
                "Intégration",
                "CAO propre à la capacité, raccordements, câbles et exigences d'entraînement",
                "Choix de la série et de la configuration"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Définissez entièrement la tâche avant de classer les capacités. Le nom d'un secteur ne détermine pas la taille d'une pompe, et les différents canaux d'un même instrument ne doivent pas nécessairement employer la même capacité."
          }
        ]
      },
      {
        "title": "2. Une consigne de 20 μL utilise des fractions de course différentes",
        "blocks": [
          {
            "type": "formula",
            "expression": "Fraction de course utilisée ≈ volume de dose demandé / capacité correspondant à la course complète",
            "note": "Comparaison initiale pour une relation déplacement-volume approximativement linéaire et des définitions cohérentes de la consigne et de la course utile. Elle ne prédit pas l'exactitude du volume délivré."
          },
          {
            "type": "table",
            "headers": [
              "Consigne hypothétique de 20 μL",
              "Capacité de 100 μL",
              "Capacité de 250 μL",
              "Capacité de 500 μL"
            ],
            "rows": [
              [
                "Fraction nominale de course utilisée",
                "20%",
                "8%",
                "4%"
              ],
              [
                "Points à vérifier",
                "Distribution réelle de 20 μL et durée du cycle",
                "Distribution à faible course et distributions répétées",
                "Distribution à course encore plus faible, intérêt du remplissage et encombrement"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Ces pourcentages décrivent uniquement l'amplitude du mouvement. Ils ne prouvent pas que la pompe de 100 μL est plus exacte et ne permettent pas d'appliquer une spécification à pleine course à une course de 4 %. La transmission, la synchronisation des vannes, les bulles, la souplesse des tubes, les vitesses d'aspiration et de distribution ainsi que la pointe interviennent. La résolution de commande et le volume nominal par pas ne définissent pas une dose minimale fiable."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/piston-pump-accuracy-repeatability-resolution/",
                "label": "Comprendre exactitude, répétabilité et résolution"
              }
            ]
          }
        ]
      },
      {
        "title": "3. Intégrer les doses répétées et le volume de réserve",
        "blocks": [
          {
            "type": "formula",
            "expression": "n = floor((Vusable − Vreserve) / Vdose)",
            "note": "Pour des doses égales, n estime initialement le nombre de distributions complètes par aspiration. Vusable est le volume aspiré utilisable confirmé, Vreserve la réserve du procédé et Vdose la dose demandée. Vusable doit être au moins égal à Vreserve et Vdose doit être positif. floor désigne l'arrondi à l'entier inférieur."
          },
          {
            "type": "notice",
            "text": "Exemple arithmétique uniquement : distribuer 20 μL dans chacune de huit cuvettes, réserver 10 μL après chaque aspiration et supposer provisoirement que le volume aspiré utilisable égale la capacité nominale. Cette réserve de 10 μL n'est pas une spécification générale Foreach. Confirmez la course utile, l'amorçage et la réserve nécessaires pour le circuit réel.",
            "label": "Hypothèses de l'exemple"
          },
          {
            "type": "table",
            "headers": [
              "Capacité candidate",
              "Doses complètes par aspiration",
              "Aspirations pour huit cuvettes",
              "Remplissages après l'aspiration initiale"
            ],
            "rows": [
              [
                "100 μL",
                "4",
                "2",
                "1"
              ],
              [
                "250 μL",
                "12",
                "1",
                "0"
              ],
              [
                "500 μL",
                "24",
                "1",
                "0"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Les capacités de 250 et de 500 μL couvrent toutes deux les huit cuvettes de cet exemple sans remplissage supplémentaire. Augmenter encore la capacité ne réduit donc pas les remplissages de ce lot. Comparez ensuite les performances réelles, l'encombrement et les exigences de changement de liquide. Recalculez chaque consigne si le volume utile ou les doses diffèrent."
          },
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/pump-application-guides/piston-cycle-fr.webp",
            "alt": "Réservoir, vanne de commutation et pompe à piston distribuant dans plusieurs cuvettes",
            "width": 1200,
            "height": 500,
            "caption": "Schéma du circuit et de la séquence. Retenez la configuration réelle des vannes et de l'entraînement ; le dessin n'implique pas que ces accessoires soient intégrés à un modèle donné."
          }
        ]
      },
      {
        "title": "4. Comparer la séquence complète, au-delà de la vitesse de distribution",
        "blocks": [
          {
            "type": "formula",
            "expression": "Tlot = Σ(Taspiration + Tvanne + Tdistribution + Tstabilisation + Tmouvement et autres actions nécessaires)",
            "note": "Comptez chaque action telle qu'elle se déroule réellement. Si des actions se chevauchent, déterminez le chemin critique à partir de la séquence de commande sans compter deux fois les durées simultanées."
          },
          {
            "type": "paragraph",
            "text": "Éviter un remplissage ne fait gagner du temps que s'il limite le chemin critique. Un instrument qui aspire pendant le déplacement d'un autre mécanisme diffère de celui qui interrompt le dosage pour se remplir. Une pompe plus grande peut aussi modifier le déplacement d'aspiration, les raccordements et les contraintes d'installation."
          },
          {
            "type": "list",
            "items": [
              "Conservez la même taille de lot, les mêmes doses et le même liquide, ainsi que le journal complet des commandes.",
              "Distinguez la première distribution, la première après remplissage, les distributions intermédiaires et la dernière.",
              "Vérifiez le volume délivré avant de comparer les durées de cycle.",
              "Quand la vitesse augmente, examinez les bulles, la réponse des vannes et la fin de distribution. La fin de la commande moteur ne prouve pas que tout le liquide est arrivé dans la cuvette."
            ]
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/piston-pump-acceleration-deceleration-curves/",
                "label": "Accélération et décélération des pompes à piston"
              },
              {
                "href": "/resources/technical-articles/precision-piston-pump-backlash-compensation/",
                "label": "Inversion de mouvement et compensation du jeu"
              }
            ]
          }
        ]
      },
      {
        "title": "5. Comparer les configurations réelles EA, SM et TM",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les informations des séries Foreach proposent des capacités de 100, 250 et 500 μL en EA, SM et TM. Distinguez le positionnement d'une série des possibilités d'une configuration particulière. Une capacité nominale identique ne garantit ni dimensions, ni matériaux, ni raccordements, ni entraînement, ni conditions de performance identiques."
          },
          {
            "type": "table",
            "headers": [
              "Série",
              "Comparaison principale à ce stade",
              "Informations à confirmer"
            ],
            "rows": [
              [
                "Pompe à piston de précision EA",
                "Adaptation d'une plateforme à large choix de capacités à la fonction du canal",
                "Plan propre à la capacité, matériaux, raccordements et commande"
              ],
              [
                "Pompe à piston miniature SM",
                "Disposition de la pompe, de la vanne, des tubes et des câbles dans un instrument compact",
                "Enveloppe totale d'installation et performances à la dose de travail"
              ],
              [
                "Pompe à piston ultracompacte TM",
                "Intégration lorsque l'espace est encore plus limité",
                "Plan du modèle ; tête en PMMA et piston céramique dans la configuration présentée, autres configurations à évaluer séparément"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Les informations EA et SM incluent des raccordements fluidiques 1/4-28 UNF ou M6 ; les configurations TM présentées utilisent du 6-40 UNF. Confirmez le plan réel et prévoyez la saillie des raccords, les courbures des tubes et l'accès de maintenance. Les indicateurs EA à pleine course, la répétabilité SM et la validation propre à chaque configuration TM ne doivent pas être réunis en une seule promesse pour les trois séries."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/products/pumps/piston-pump/standard-piston-pump/",
                "label": "Pompes à piston de précision EA"
              },
              {
                "href": "/products/pumps/piston-pump/miniature-piston-pump/",
                "label": "Pompes à piston miniatures SM"
              },
              {
                "href": "/products/pumps/piston-pump/ultra-compact-piston-pump/",
                "label": "Pompes à piston ultracompactes TM"
              },
              {
                "href": "/resources/technical-articles/piston-pump-head-material-selection/",
                "label": "Choisir les matériaux de la tête et de l'ensemble du circuit mouillé"
              }
            ]
          }
        ]
      },
      {
        "title": "6. Vérifier les doses de travail, en plus de la pleine course",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Couvrez les doses minimale, habituelle et maximale réellement utilisées, ainsi que les états de fonctionnement susceptibles de modifier la distribution. Fixez le nombre de répétitions et les critères d'acceptation selon les exigences de l'instrument et l'objectif de vérification ; un article général ne remplace pas le plan de réception du projet."
          },
          {
            "type": "table",
            "headers": [
              "Groupe de données",
              "Informations à conserver"
            ],
            "rows": [
              [
                "Échantillon et circuit",
                "Modèle, configuration, identifiant d'échantillon, vanne, pointe, tubes, niveaux et contre-pression"
              ],
              [
                "Liquide et mesure",
                "Milieu réel, température, masse volumique, instrument, méthode et incertitude"
              ],
              [
                "Conditions de commande",
                "Dose ou pas, vitesses, synchronisation des vannes, stabilisation et durée de veille"
              ],
              [
                "Résultats bruts",
                "Masses ou volumes individuels, repères première dose/remplissage/régime établi et anomalies"
              ],
              [
                "Acceptation",
                "Exactitude, répétabilité, temps de distribution, comportement de la pointe et justification de chaque critère"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Un essai gravimétrique exige la masse volumique à la température du liquide et la maîtrise de l'évaporation, des gouttes retenues et des pertes de transfert. Une procédure formelle doit aussi évaluer les corrections de poussée de l'air et l'incertitude de mesure. Diviser une masse par la masse volumique ne constitue pas, à lui seul, un étalonnage complet."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "https://www.nist.gov/publications/nistir-7383-selected-procedures-volumetric-calibrations-2019-ed",
                "label": "Fondement méthodologique : procédures NIST d'étalonnage volumétrique ; elles ne certifient pas les performances microlitriques de cette pompe"
              }
            ]
          }
        ]
      },
      {
        "title": "7. Consigner un choix argumenté",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Indiquez les doses et les temps requis, les raisons du choix de capacité, de série et de matériaux, les conditions essayées et les points restant à vérifier. Dans l'exemple arithmétique précédent, 250 μL constitue une capacité candidate pour réduire les remplissages. Ce n'est pas une recommandation finale pour un analyseur réel."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/products/pumps/piston-pump/",
                "label": "Découvrir les produits et séries de pompes à piston Foreach"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Questions fréquentes",
    "faqItems": [
      {
        "question": "Pourquoi ne pas toujours choisir 500 μL ?",
        "answer": "Si 250 μL couvrent déjà les distributions répétées nécessaires, 500 μL n'évitent peut-être aucun remplissage supplémentaire. Comparez les performances réelles aux petites doses, les temps, l'installation et les exigences de changement de liquide."
      },
      {
        "question": "Une pompe de 100 μL distribue-t-elle seulement 100 μL à chaque fois ?",
        "answer": "Non. La capacité nominale et le volume par dose sont différents. La plage utilisable dépend des commandes, de la course effective et de la vérification du volume effectivement délivré."
      },
      {
        "question": "Peut-on programmer dans le micrologiciel la réserve de 10 μL de l'exemple ?",
        "answer": "Pas sans vérification. Il s'agit d'une valeur de bilan illustrative, non d'une exigence produit. L'amorçage, la course utile, les circuits de vannes et la stratégie de distribution déterminent la réserve réelle."
      },
      {
        "question": "Les pompes EA, SM et TM de même capacité sont-elles interchangeables ?",
        "answer": "La capacité seule ne suffit pas. Vérifiez les plans, les raccordements, les matériaux, l'agencement des vannes et de l'entraînement, ainsi que les performances aux doses et aux temps réels."
      },
      {
        "question": "Que faire avant les essais avec le réactif réel ?",
        "answer": "Utilisez les spécifications formelles et des calculs aux hypothèses explicites pour présélectionner les candidats et préparer le circuit d'essai. La compatibilité avec le milieu réel et les performances de distribution restent à vérifier."
      }
    ],
    "cta": {
      "title": "Transformer vos conditions de fonctionnement en une spécification de pompe vérifiable",
      "description": "Précisez le liquide, le volume ou débit visé, les temps, le circuit et les contraintes d'installation pour examiner la configuration de pompe et la méthode de vérification.",
      "contactLabel": "Contacter l'assistance technique",
      "productsLabel": "Découvrir les produits associés",
      "productsHref": "/products/pumps/piston-pump/"
    }
  },
  "diaphragm-pump-multiple-wash-nozzles-flow-balance": {
    "metadata": {
      "title": "Pourquoi plusieurs buses de lavage alimentées par une seule pompe à membrane miniature ont-elles des débits différents ?",
      "seoTitle": "Plusieurs buses de lavage : équilibrer les débits d'une pompe à membrane | Foreach Technology",
      "seoDescription": "Calculez la demande à partir du volume et du temps de chaque buse, distinguez une alimentation totale insuffisante d'une répartition inégale, puis vérifiez chaque branche par collecte et mesures de pression.",
      "coverImage": "/images/resources/technical-articles/pump-application-guides/dpl60-brushless-side-photo.jpg",
      "coverAlt": "Vue de côté d’une pompe à membrane miniature Foreach DPL60 montrant la tête et les raccords de liquide"
    },
    "deck": "Calculez la demande à partir du volume et du temps de chaque buse, distinguez une alimentation totale insuffisante d'une répartition inégale, puis vérifiez chaque branche par collecte et mesures de pression.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "Une pompe et un collecteur ne garantissent pas la même distribution à chaque buse. Un analyseur de biochimie clinique ou un autre instrument à voies de lavage parallèles exige deux vérifications : un débit total suffisant à la pression réelle de fonctionnement et une distribution acceptable dans chaque branche. La seule mesure du débit total peut masquer une buse sous-alimentée. Tous les exemples numériques ci-dessous sont des calculs hypothétiques, et non des résultats mesurés sur un produit."
      }
    ],
    "sections": [
      {
        "title": "1. Définir la tâche de chaque buse",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Remplacez une demande générale de pompe de lavage par des exigences mesurables : nombre de buses simultanément actives, volume par buse, durée d'ouverture des vannes, possibilité de préremplissage et critères d'acceptation du premier cycle et des suivants. Le fonctionnement séquentiel modifie à la fois le débit de pointe et le temps nécessaire à un lot complet."
          },
          {
            "type": "table",
            "headers": [
              "Donnée nécessaire",
              "Pourquoi elle compte",
              "Ce qu'il faut consigner"
            ],
            "rows": [
              [
                "Volume et tolérance par buse",
                "Définit la distribution exigée pour chaque branche",
                "Volumes collectés individuellement, au-delà de leur moyenne"
              ],
              [
                "Temps effectif de distribution",
                "Amorçage, démarrage et retard des vannes consomment du temps",
                "Délai entre la commande et l'arrivée réelle de liquide"
              ],
              [
                "Nombre de branches ouvertes",
                "Définit la demande simultanée maximale",
                "Simultanéité normale et maximale"
              ],
              [
                "Liquide, température et circuit",
                "Influencent résistance, compatibilité et point de fonctionnement",
                "Lot de liquide, température, diamètre intérieur, longueur et composants"
              ]
            ]
          }
        ]
      },
      {
        "title": "2. Calculer la demande totale à partir des volumes individuels",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Supposons quatre buses fonctionnant ensemble, chacune devant délivrer 3 mL en deux secondes effectives. Chaque branche nécessite en moyenne 90 mL/min, soit 360 mL/min au total. Si les deux secondes représentent seulement la fenêtre de commande, retranchez les périodes sans distribution utile avant de calculer le besoin."
          },
          {
            "type": "formula",
            "expression": "Qᵢ = 60 × Vᵢ / tᵢ; Qtotal = ΣQᵢ",
            "note": "Avec V en mL et t en secondes, Q s'exprime en mL/min. Additionnez les branches simultanément actives ; cet exemple n'inclut pas de débit distinct de dérivation ou de retour."
          },
          {
            "type": "paragraph",
            "text": "Les guides Foreach DPL30 et DPL60 décrivent respectivement des classes de débit de 300 et 600 mL/min. La valeur nominale DPL30 ne prouve pas qu'elle puisse assurer cette tâche hypothétique de 360 mL/min. DPL60 est un candidat à évaluer : 600 mL/min n'est pas automatiquement le débit disponible à travers les tubes, vannes et buses installés. Confirmez le point de fonctionnement à la tension, avec le liquide, les conditions d'entrée et la pression de sortie requis."
          },
          {
            "type": "notice",
            "text": "Les 360 mL/min résultent d'une tâche de lavage supposée. Ce n'est ni la spécification d'un analyseur particulier ni une recommandation universelle pour les circuits de lavage parallèles."
          }
        ]
      },
      {
        "title": "3. Un débit total suffisant ne prouve pas une répartition uniforme",
        "blocks": [
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/pump-application-guides/wash-branches-fr.webp",
            "alt": "Une pompe alimente un collecteur ; des tubes et buses séparés débouchent dans des récipients de collecte mesurés individuellement",
            "width": 1200,
            "height": 500,
            "caption": "Disposition conceptuelle : vérifiez séparément l'alimentation totale et chaque distribution. Le dessin ne prescrit ni dimensions réelles de tubes ni performances produit."
          },
          {
            "type": "paragraph",
            "text": "Pour un écoulement stationnaire approximativement incompressible, sans dérivation ni stockage significatif, le débit total est la somme des débits de branche. Chaque branche dépend toutefois de sa propre différence de pression effective et de sa résistance. Une approximation de pression commune n'est utile que si les pressions d'alimentation au collecteur, les pressions de sortie et les hauteurs sont suffisamment proches."
          },
          {
            "type": "paragraph",
            "text": "Le tube commun et l'entrée du collecteur transportent le débit total ; chaque tube aval transporte uniquement son débit de branche. Employer le débit total pour chaque branche surestime ses pertes. Employer le débit d'une branche dans le tube commun sous-estime les pertes partagées."
          },
          {
            "type": "table",
            "headers": [
              "Origine de l'écart",
              "Observation possible",
              "Points à inspecter"
            ],
            "rows": [
              [
                "Diamètre intérieur, longueur ou déformation du tube",
                "Une branche reste constamment plus faible",
                "Tolérances des tubes, profondeur d'insertion, courbures et pincements"
              ],
              [
                "Différences de buses ou de vannes",
                "La position du faible débit suit un composant permuté",
                "Orifice de buse, contamination, ouverture et synchronisation des vannes"
              ],
              [
                "Hauteur de sortie ou immersion",
                "La répartition change après modification du montage",
                "Hauteur et immersion des buses, pression du récipient récepteur"
              ],
              [
                "Bulles ou stockage élastique",
                "Le premier cycle diffère des suivants",
                "Gaz piégé, dilatation des tubes et état d'amorçage"
              ]
            ]
          }
        ]
      },
      {
        "title": "4. Utiliser la sensibilité au diamètre comme modèle de diagnostic",
        "blocks": [
          {
            "type": "formula",
            "expression": "ΔP = 128 μ L Q / (π d⁴)",
            "note": "Pour l'écoulement laminaire stationnaire et pleinement développé d'un liquide newtonien dans un tube droit rigide de section circulaire. μ est la viscosité dynamique, L la longueur et d le diamètre intérieur. Des unités SI cohérentes donnent une perte de pression en Pa."
          },
          {
            "type": "paragraph",
            "text": "Pour un tronçon idéal identique par ailleurs, un diamètre intérieur inférieur de 10 % produit environ 1/0.9⁴ = 1.52 fois la résistance. À différence de pression identique, le débit devient environ 0.9⁴ = 65.6 % de sa valeur initiale. Ce calcul décrit la sensibilité d'un tronçon idéalisé ; il ne prédit pas une baisse de 34.4 % pour tout le système."
          },
          {
            "type": "paragraph",
            "text": "Le circuit installé comprend aussi des orifices de buses, raccords, vannes, filtres et un écoulement pulsé. Les orifices courts, l'écoulement en développement, la turbulence ou les tubes fortement déformables nécessitent des modèles adaptés ou des données de composants. Utilisez les courbes de perte de pression disponibles et vérifiez l'assemblage réel. Une modification du réseau peut aussi déplacer le point de fonctionnement de la pompe."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "https://openstax.org/books/college-physics/pages/12-4-viscosity-and-laminar-flow-poiseuilles-law",
                "label": "Référence physique : OpenStax sur viscosité, écoulement laminaire et loi de Poiseuille"
              }
            ]
          }
        ]
      },
      {
        "title": "5. Mesurer le total et toutes les branches dans le même essai",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Amorcez le système selon sa conception. Fixez liquide, température, tension, niveau du réservoir, hauteur de montage et tubes. Identifiez chaque buse et récipient.",
              "Collectez chaque branche pendant la séquence réelle de commande. Calculez Qᵢ = Vᵢ/t si utile ; pour une courte impulsion de lavage, la mesure principale est le volume délivré par événement.",
              "Relevez les pressions d'entrée, de sortie ou du collecteur avec les positions des capteurs, leurs plages et fréquences d'échantillonnage. Une moyenne lente peut masquer les transitoires d'ouverture.",
              "Comparez la somme des collectes de branche à la distribution totale sur la même fenêtre. Comptabilisez séparément dérivation, retour, fuites et variations de liquide stocké.",
              "Évaluez séparément démarrage, fonctionnement répété et simultanéité maximale. Fixez avant les essais les répétitions et limites d'acceptation à partir des exigences de lavage de l'instrument."
            ]
          },
          {
            "type": "paragraph",
            "text": "Si le total est conforme mais une branche échoue, examinez répartition et synchronisation. Si toutes sont faibles, utilisez les pressions pour distinguer alimentation insuffisante, pertes communes, limitations d'entrée et problèmes électriques. En permutant une buse ou un tube suspect, ne changez qu'un facteur à la fois et observez si l'écart suit le composant."
          }
        ]
      },
      {
        "title": "6. Comparer les modifications selon le temps et la pression",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Modification",
              "Bénéfice possible",
              "Vérification à renouveler"
            ],
            "rows": [
              [
                "Uniformiser dimensions et montage des branches",
                "Réduit les différences de fabrication et de cheminement",
                "Buses, vannes et hauteurs de sortie restent déterminantes"
              ],
              [
                "Ajouter une résistance contrôlée aux branches à fort débit",
                "Peut équilibrer un état de fonctionnement donné",
                "Consomme la marge de pression et modifie le débit total"
              ],
              [
                "Laver par groupes ou séquentiellement",
                "Réduit la demande simultanée",
                "Recalculer temps du lot, service des vannes et commande"
              ],
              [
                "Changer la pompe ou améliorer l'alimentation commune",
                "Peut augmenter la distribution totale au point de fonctionnement",
                "Ne supprime pas automatiquement les différences de résistance"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Partez du volume exigé par la branche défaillante. Augmenter la tension, choisir une pompe plus grande ou ajouter des restrictions sans mesures individuelles peut changer le total sans résoudre la cause. Après réglage, répétez la même méthode d'acceptation, pour toutes les buses, le premier cycle et le temps total de lavage."
          }
        ]
      },
      {
        "title": "7. Poursuivre avec les guides associés",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Cette page traite de la répartition d'une pompe vers plusieurs voies de lavage. La sélection exige aussi la compatibilité du liquide et les contraintes réelles de pression et de commande. Si la distribution diminue avec la durée de fonctionnement, examinez séparément la mise à l'air du réservoir et l'alimentation d'entrée."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/ivd-cleaning-wash-rinse-pump-diaphragm-pump/",
                "label": "Choisir une pompe de lavage et de rinçage pour un instrument"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "Déterminer le point de fonctionnement avec une courbe débit-pression"
              },
              {
                "href": "/resources/technical-articles/tube-inner-diameter-affects-diaphragm-pump-flow/",
                "label": "Effet du diamètre intérieur sur le débit d'une pompe à membrane miniature"
              },
              {
                "href": "/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide/",
                "label": "Guide de sélection des pompes à membrane pour liquides DPL30"
              },
              {
                "href": "/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide/",
                "label": "Guide de sélection des pompes à membrane pour liquides DPL60"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-drop-reservoir-venting/",
                "label": "Débit décroissant en fonctionnement : vérifier la mise à l'air du réservoir"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "Pompes à membrane miniatures pour liquides"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Questions fréquentes",
    "faqItems": [
      {
        "question": "Puis-je diviser le débit total par le nombre de buses ?",
        "answer": "Cela donne une moyenne, sans prouver que chaque buse répond à son besoin. Collectez les volumes individuels sur la même fenêtre de commande et vérifiez la distribution minimale et la variation admissible."
      },
      {
        "question": "Des tubes de même longueur garantissent-ils le même débit ?",
        "answer": "Non. Diamètre intérieur, buses, vannes, raccords, hauteur de sortie et gaz piégé comptent aussi. La longueur identique ne couvre qu'une partie de la régularité du montage."
      },
      {
        "question": "Une pompe de 600 mL/min résoudra-t-elle le problème ?",
        "answer": "Une capacité supérieure est pertinente si le débit total au point réel est insuffisant. Les résistances inégales des branches restent à traiter séparément, et le débit nominal doit être confronté à la courbe de la pompe."
      },
      {
        "question": "Faut-il mesurer le débit moyen ou le volume par lavage ?",
        "answer": "Le débit moyen aide à diagnostiquer une distribution continue. Pour un lavage bref, mesurez aussi volume délivré et temps d'achèvement, car démarrage, amorçage et déplacement des vannes peuvent occuper une grande part de la fenêtre."
      },
      {
        "question": "Quel pourcentage de déséquilibre est acceptable ?",
        "answer": "Il n'existe pas de limite unique pour tous les instruments. Déduisez les critères de l'efficacité de nettoyage, des exigences de contamination résiduelle et de la méthode de mesure, puis répartissez les tolérances entre pompe, vannes, tubes et commande."
      }
    ],
    "cta": {
      "title": "Transformer vos conditions de fonctionnement en une spécification de pompe vérifiable",
      "description": "Précisez le liquide, le volume ou débit visé, les temps, le circuit et les contraintes d'installation pour examiner la configuration de pompe et la méthode de vérification.",
      "contactLabel": "Contacter l'assistance technique",
      "productsLabel": "Découvrir les produits associés",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  },
  "diaphragm-pump-flow-drop-reservoir-venting": {
    "metadata": {
      "title": "Le débit est normal au départ, puis diminue : comment vérifier la mise à l'air du réservoir d'une pompe à membrane miniature ?",
      "seoTitle": "Baisse de débit d'une pompe à membrane : mise à l'air du réservoir | Foreach Technology",
      "seoDescription": "Relevez ensemble pression du ciel gazeux, pression d'entrée et distribution pour examiner une mise à l'air restrictive et distinguer niveau de liquide, obstruction, entrée d'air et contre-pression.",
      "coverImage": "/images/resources/technical-articles/pump-application-guides/dpl30-brushless-rear-photo.jpg",
      "coverAlt": "Vue arrière d’une pompe à membrane miniature Foreach DPL30 montrant le corps et les raccords de liquide"
    },
    "deck": "Relevez ensemble pression du ciel gazeux, pression d'entrée et distribution pour examiner une mise à l'air restrictive et distinguer niveau de liquide, obstruction, entrée d'air et contre-pression.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "Une pompe à membrane miniature dont la distribution est normale au départ puis ralentit n'est pas nécessairement endommagée. Lorsqu'elle prélève dans un réservoir, vérifiez notamment si le gaz remplace le liquide retiré comme prévu. Une baisse peut aussi provenir du niveau, des filtres, des tubes ou de la charge de sortie. Le symptôme seul ne prouve pas une mise à l'air bouchée."
      }
    ],
    "sections": [
      {
        "title": "1. Identifier comment le récipient compense le liquide prélevé",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Bouteilles rigides, poches souples et réservoirs à pression régulée fonctionnent différemment. Une bouteille rigide nécessite généralement un circuit prévu d'échange gazeux ou de contrôle de pression. Une poche souple peut compenser par déformation ; un réservoir pressurisé exige de contrôler son régulateur et son alimentation en gaz. Examinez le schéma fluidique et les instructions avant de considérer une fermeture étanche comme anormale."
          },
          {
            "type": "paragraph",
            "text": "Pour une bouteille rigide ventilée, inspectez tout le trajet gazeux : entrée ambiante, filtre, tube, raccord du bouchon et ouverture interne. Un trou visible ne prouve pas une capacité suffisante en fonctionnement. Une membrane mouillée, un tube plié ou une ouverture immergée peut modifier la perte de pression effective."
          },
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/pump-application-guides/reservoir-vent-fr.webp",
            "alt": "Le gaz entre par l'évent prévu tandis que le liquide rejoint la pompe par une prise immergée ; les pressions du ciel gazeux et de l'entrée sont mesurées séparément",
            "width": 1200,
            "height": 500,
            "caption": "Disposition conceptuelle : séparer les mesures du ciel gazeux et de l'entrée aide à distinguer restrictions gazeuses et pertes du circuit liquide. Ce n'est pas le plan d'un récipient particulier."
          }
        ]
      },
      {
        "title": "2. Pourquoi une bouteille rigide étanche peut devenir plus difficile à vider",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Considérez un modèle explicatif : bouteille rigide entièrement étanche, quantité fixe de gaz à température constante, en négligeant provisoirement évaporation, gaz dissous et fuites. Retirer du liquide agrandit le ciel gazeux et abaisse sa pression absolue."
          },
          {
            "type": "formula",
            "expression": "P₂,abs = P₁,abs × Vg₁ / (Vg₁ + ΔVliquid)",
            "note": "Approximation isotherme de gaz parfait pour une quantité fixe de gaz. P est la pression absolue, Vg₁ le volume gazeux initial et ΔVliquid le volume de liquide retiré. N'utilisez pas une pression relative."
          },
          {
            "type": "paragraph",
            "text": "Supposons un volume gazeux initial de 100 mL à 101.3 kPa absolus. Après retrait de 20 mL, le modèle donne 101.3 × 100/120 ≈ 84.4 kPa absolus, soit environ −16.9 kPa relatifs à la pression ambiante initiale. Ce sont des calculs illustratifs, non des mesures sur une pompe Foreach ou un réservoir réel."
          },
          {
            "type": "paragraph",
            "text": "Les récipients réels peuvent se déformer ou fuir ; les liquides peuvent s'évaporer ou dégazer ; la température peut varier. Le seul volume retiré ne détermine donc pas la pression gazeuse réelle. Le modèle explique pourquoi une admission de gaz limitée peut accroître progressivement la difficulté d'aspiration. Le diagnostic exige toujours des mesures."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "https://www.grc.nasa.gov/www/k-12/BGP/boyle.html",
                "label": "Référence physique : NASA sur la loi de Boyle"
              }
            ]
          }
        ]
      },
      {
        "title": "3. Séparer pression du ciel gazeux et pertes d'aspiration",
        "blocks": [
          {
            "type": "formula",
            "expression": "Pentrée,abs ≈ Pgaz,abs + ρg(zsurface − zentrée) − ΔPaspiration",
            "note": "Relation stationnaire approchée avec unités de pression cohérentes. ρ est la masse volumique du liquide et z l'altitude. Pulsations rapides, accélération et écoulement diphasique nécessitent une analyse supplémentaire."
          },
          {
            "type": "paragraph",
            "text": "Une baisse de pression gazeuse, un niveau descendant et une résistance d'aspiration croissante peuvent tous réduire la pression d'entrée de la pompe. Mesurer le ciel gazeux renseigne sur la compensation du récipient. Une mesure d'entrée supplémentaire montre l'effet combiné de la colonne liquide et de la prise d'aspiration. Le débit de sortie seul ne permet pas de distinguer ces causes de façon fiable."
          },
          {
            "type": "paragraph",
            "text": "L'aspiration d'une pompe à membrane varie au cours du cycle. Un capteur lent peut ne donner qu'une moyenne, sans exclure des difficultés brèves. L'instrumentation ne doit introduire ni prise d'air nouvelle ni volume mort important."
          }
        ]
      },
      {
        "title": "4. Préciser la cause par observations et comparaisons contrôlées",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Cause possible",
              "Indices à examiner",
              "Vérification complémentaire"
            ],
            "rows": [
              [
                "Admission de gaz limitée",
                "La pression gazeuse s'écarte de l'état prévu tandis que la distribution change",
                "Contrôler les pertes gazeuses et comparer un évent autorisé et vérifié sur un banc maîtrisé"
              ],
              [
                "Baisse de niveau ou variation de hauteur d'aspiration",
                "Pression gazeuse normale, mais conditions d'entrée liées à la hauteur de liquide",
                "Répéter au même niveau et à la même hauteur de montage"
              ],
              [
                "Filtre d'aspiration bouché ou tube déformé",
                "Pression gazeuse normale et différence de pression d'aspiration accrue",
                "Inspecter filtre, raccords et courbures, un facteur à la fois"
              ],
              [
                "Entrée d'air à l'aspiration",
                "Bulles ou rétablissement temporaire après amorçage",
                "Vérifier l'intégrité des raccordements ; les bulles visibles ne sont pas le seul indice"
              ],
              [
                "Charge de sortie variable",
                "La pression de sortie monte pendant que la distribution diminue",
                "Inspecter vannes, buses, tubes aval et pression du récipient récepteur"
              ],
              [
                "Évolution électrique, thermique ou du liquide",
                "Variation de tension, courant, température ou conditions liées à la viscosité",
                "Maintenir les autres conditions constantes avant comparaison"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Ces observations structurent l'enquête ; aucune ligne n'est une signature de panne exclusive. Une pression d'entrée de plus en plus négative peut provenir d'une mise à l'air restrictive ou d'un filtre liquide bouché. Associez positions de mesure et comparaisons contrôlées."
          }
        ]
      },
      {
        "title": "5. Rendre la vérification reproductible",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Consignez type de récipient, limites de pression et de vide, liquide, température, niveau initial, volume gazeux, hauteur de montage et trajet de mise à l'air prévu.",
              "À conditions électriques et de commande identiques, relevez temps écoulé, volume cumulé prélevé, débit et pressions gazeuse, d'entrée et de sortie. Conservez aussi tension, courant et niveau de liquide.",
              "Inspectez les circuits gazeux et liquides avant et pendant le symptôme : filtre mouillé, liquide dans l'évent, ouverture immergée ou tube déformé.",
              "Si une comparaison est nécessaire, utilisez un banc contrôlé avec de l'eau ou un substitut adapté et remplacez l'évent uniquement selon une méthode permise par la conception. Gardez niveau initial, température, tubes et temps identiques.",
              "Comparez les historiques de pression et les volumes distribués avant et après. Leur amélioration conjointe, appuyée par l'inspection du composant, renforce le diagnostic ; une brève reprise du débit ne suffit pas."
            ]
          },
          {
            "type": "notice",
            "text": "Avec des réactifs réels, liquides volatils ou systèmes stériles, ne desserrez pas simplement le bouchon et ne contournez pas filtration et maîtrise des vapeurs. La comparaison doit respecter le récipient et l'instrument ; une ouverture provisoire n'est pas une solution technique finalisée."
          },
          {
            "type": "paragraph",
            "text": "L'acceptation doit couvrir la plage de niveaux prévue, la plus longue période de fonctionnement et le prélèvement de pointe. Quelques secondes avec une bouteille pleine ne suffisent pas. Limites de pression et durée d'essai doivent découler des restrictions du récipient, des exigences d'entrée de la pompe et du service de l'instrument."
          }
        ]
      },
      {
        "title": "6. Dimensionner le circuit gazeux selon la demande et la perte admissible",
        "blocks": [
          {
            "type": "paragraph",
            "text": "À pression et température approximativement égales, le débit volumique de gaz entrant doit généralement remplacer le volume de liquide prélevé. Ramenez les débits gazeux annoncés à des conditions de référence compatibles avant de comparer. Le débit d'un filtre n'a de sens qu'avec sa différence de pression et ses conditions d'essai."
          },
          {
            "type": "table",
            "headers": [
              "Donnée de sélection",
              "Informations à obtenir"
            ],
            "rows": [
              [
                "Prélèvement maximal",
                "Débits liquide simultané et de pointe, avec besoin de compensation gazeuse correspondant"
              ],
              [
                "Écart de pression gazeuse admissible",
                "Limites du récipient, exigences d'entrée de la pompe et contraintes du procédé"
              ],
              [
                "Pertes du circuit gazeux",
                "Pertes du filtre, des tubes et raccords au débit gazeux pertinent"
              ],
              [
                "Mouillage et exposition chimique",
                "Compatibilité liquide et vapeur, orientation du montage et drainage"
              ],
              [
                "Service et entretien",
                "Critères de remplacement du fournisseur et méthode de détection des pertes anormales"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Un orifice plus grand ne constitue pas à lui seul une règle de sélection complète. Ne fixez ni taille de pores ni alarme de vide universelle sans connaître les exigences. Filtration, maîtrise de la contamination, compatibilité chimique et résistance gazeuse doivent être évaluées ensemble."
          }
        ]
      },
      {
        "title": "7. Revenir au choix de la pompe après vérification de l'alimentation",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Rétablissez réservoir, aspiration et charge de sortie dans leurs conditions prévues, puis évaluez la capacité de la pompe à accomplir la tâche. Les classes DPL30 à 300 mL/min et DPL60 à 600 mL/min permettent une présélection ; la distribution utilisable dépend toujours de la pression de travail, du liquide et de l'entrée."
          },
          {
            "type": "paragraph",
            "text": "Si l'admission de gaz ou l'aspiration est limitée, une pompe plus grande peut accroître la demande instantanée sans garantir le rétablissement. Une fois les conditions établies, utilisez la courbe correspondante et les mesures de l'assemblage pour décider d'un changement de modèle, de diamètre intérieur ou de synchronisation."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/suction-vs-discharge-resistance-diaphragm-pump/",
                "label": "Résistance à l'aspiration et au refoulement"
              },
              {
                "href": "/resources/technical-articles/self-priming-miniature-liquid-diaphragm-pump-selection/",
                "label": "Diagnostic d'une perte de capacité d'auto-amorçage"
              },
              {
                "href": "/resources/technical-articles/lab-liquid-waste-aspiration-troubleshooting/",
                "label": "Diagnostic d'aspiration : prises d'air et filtres bouchés"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "Courbes débit-pression et point de fonctionnement réel"
              },
              {
                "href": "/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide/",
                "label": "Guide de sélection des pompes à membrane pour liquides DPL30"
              },
              {
                "href": "/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide/",
                "label": "Guide de sélection des pompes à membrane pour liquides DPL60"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-multiple-wash-nozzles-flow-balance/",
                "label": "Distribution inégale entre plusieurs buses de lavage"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "Pompes à membrane miniatures pour liquides"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Questions fréquentes",
    "faqItems": [
      {
        "question": "Le retour du débit après ouverture du bouchon prouve-t-il que la pompe fonctionne bien ?",
        "answer": "Il montre que la modification des conditions du récipient influence la distribution. Cela n'exclut pas à lui seul un problème de pompe ou une entrée d'air. Confirmez par comparaison d'un évent autorisé et mesures de pression synchronisées."
      },
      {
        "question": "Pourquoi une bouteille ventilée peut-elle encore se mettre en dépression ?",
        "answer": "Le gaz a besoin d'une différence de pression pour traverser filtre, tubes et raccords. Un trajet trop petit, bouché, mouillé ou immergé peut ne pas admettre le gaz au rythme du prélèvement liquide."
      },
      {
        "question": "Tout récipient fermé doit-il avoir un évent ?",
        "answer": "Non. Poches souples, réservoirs pressurisés et récipients à atmosphère contrôlée utilisent leurs propres méthodes de compensation ou de régulation. Vérifiez la conception prévue au lieu de transformer chaque récipient en vase ouvert."
      },
      {
        "question": "À quelle dépression faut-il déclencher une alarme ?",
        "answer": "Déduisez-la des limites du récipient, des conditions d'entrée de la pompe et des exigences de l'instrument. Les −16.9 kPa de cet article sont un calcul hypothétique, non un seuil d'alarme ou une pression admissible du produit."
      },
      {
        "question": "Une pompe plus grande empêchera-t-elle la baisse progressive du débit ?",
        "answer": "On ne peut pas le supposer. Corrigez d'abord les restrictions gazeuses ou l'alimentation d'entrée, puis vérifiez distribution et service requis dans les conditions réelles."
      }
    ],
    "cta": {
      "title": "Transformer vos conditions de fonctionnement en une spécification de pompe vérifiable",
      "description": "Précisez le liquide, le volume ou débit visé, les temps, le circuit et les contraintes d'installation pour examiner la configuration de pompe et la méthode de vérification.",
      "contactLabel": "Contacter l'assistance technique",
      "productsLabel": "Découvrir les produits associés",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  }
} satisfies Record<PumpApplicationArticleSlug, PumpApplicationArticleCopy>;
