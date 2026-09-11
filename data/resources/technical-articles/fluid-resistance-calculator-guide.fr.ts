import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

export const fluidResistanceCalculatorGuideFrCopy = {
  "metadata": {
    "title": "À quoi sert le calcul de résistance fluidique ? Utiliser le calculateur FOREACH pour concevoir un circuit",
    "seoTitle": "Calculateur de résistance fluidique : débit et pertes | FOREACH",
    "seoDescription": "Comparez diamètres de tube et Cv de vanne pour estimer les pertes, calculer le débit disponible et identifier la résistance dominante, puis confrontez les résultats aux courbes de pompe et aux mesures.",
    "coverImage": "/images/resources/technical-articles/fluid-resistance-guide/comparison.fr.svg",
    "coverAlt": "Comparaison des pertes calculées avant et après modification du diamètre et du Cv"
  },
  "deck": "Une pompe satisfait le débit à vide, mais l’alimentation devient insuffisante après ajout des tubes, vannes et raccords. Le calcul de résistance transforme ce problème en données comparables : différentiel nécessaire au débit cible, localisation des pertes et effets du diamètre, de la longueur, du Cv ou de la viscosité. À partir des fonctions réelles du calculateur FOREACH et d’un exemple reproductible, cet article montre comment utiliser les résultats pour concevoir, sélectionner, diagnostiquer et valider un prototype.",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "Dans les analyseurs, appareils IVD et systèmes de laboratoire automatisés, la pompe doit vaincre friction des tubes, pertes locales des vannes et raccords, ainsi que les autres conditions de pression. Remplacer directement une pompe par une version à plus grand débit peut accroître consommation et réglages sans résoudre l’étranglement d’un tube fin ou d’un composant."
    },
    {
      "type": "paragraph",
      "text": "Le calculateur FOREACH accepte des lignes ID définies par diamètre intérieur et longueur, et des lignes Cv définies par coefficient de débit. Il calcule les pertes à débit connu, le débit à perte connue, les statistiques, la courbe PQ du circuit et un export Excel. Il aide à établir un premier bilan et à refaire les calculs après mesure des paramètres."
    },
    {
      "type": "paragraph",
      "text": "Définir d’abord le chemin et le régime étudiés. Les exemples privilégient un liquide monophasique en régime permanent dans un trajet en série. Les estimations ne remplacent pas la validation des pompes, vannes et instruments avec le fluide réel."
    },
    {
      "type": "links",
      "items": [
        {
          "href": "/resources/calculators/fluid-resistance/",
          "label": "Ouvrir le calculateur FOREACH et reproduire l’exemple"
        }
      ]
    }
  ],
  "sections": [
    {
      "title": "1. Que calcule la résistance fluidique ?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Le débit est un volume par unité de temps ; la perte de charge est la pression perdue à travers un tube ou un composant. Pour un fluide et un circuit donnés, maintenir un débit exige un différentiel de pression. Le calcul quantifie cette relation pour déterminer les besoins de pression motrice."
        },
        {
          "type": "subheading",
          "title": "Distinguer pertes par friction et pertes locales"
        },
        {
          "type": "paragraph",
          "text": "La friction le long de la paroi dépend du diamètre, de la longueur, de la vitesse et des propriétés. Les pertes locales proviennent des entrées, coudes, rétrécissements, vannes et autres géométries. Deux raccords de même taille extérieure ne possèdent pas nécessairement le même passage ni la même résistance ; deux tuyaux de même diamètre extérieur n’ont pas forcément le même diamètre intérieur effectif."
        },
        {
          "type": "formula",
          "expression": "Δp_path = ΣΔp_friction + ΣΔp_local",
          "note": "Somme des pertes indiquées sur un même chemin défini. Additionner toutes les pertes de branches parallèles ne donne pas le différentiel entre leurs deux nœuds communs."
        },
        {
          "type": "paragraph",
          "text": "Dans un petit passage, une faible modification du diamètre peut fortement changer la perte. Allonger le tube augmente généralement la friction ; augmenter le débit augmente la vitesse. La relation pression–débit dépend aussi du régime et ne suit pas toujours le carré du débit."
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/fluid-resistance-guide/path.fr.svg",
          "alt": "Schéma de calcul : pompe, tube, composant Cv, sortie et conditions de pression à définir séparément",
          "width": 1400,
          "height": 620,
          "caption": "Identifier le chemin en série puis saisir chaque tube et composant. Le calculateur additionne leurs pertes ; pression du récipient source, dénivelé et pression terminale s’ajoutent séparément au bilan complet."
        }
      ]
    },
    {
      "title": "2. Quels problèmes de conception le calcul aide-t-il à résoudre ?",
      "blocks": [
        {
          "type": "table",
          "headers": [
            "Question",
            "Résultat disponible",
            "Décision éclairée"
          ],
          "rows": [
            [
              "Quelle pression faut-il au débit cible ?",
              "Pertes totales et par élément au débit donné",
              "Établir le bilan et les conditions de travail des pompes candidates"
            ],
            [
              "Quel débit est possible avec le différentiel disponible ?",
              "Débit estimé satisfaisant le modèle saisi",
              "Évaluer si le circuit existant peut respecter le temps de cycle"
            ],
            [
              "Où se trouve la résistance principale ?",
              "Pertes par ligne, friction, pertes locales et pourcentages",
              "Identifier les tubes ou composants à modifier en priorité"
            ],
            [
              "Élargir le tube ou remplacer la vanne ?",
              "Comparaison de plusieurs configurations",
              "Comparer les gains et éviter des remplacements sans base technique"
            ],
            [
              "Que se passe-t-il si la viscosité augmente ?",
              "Pertes et régime pour différentes densités et viscosités",
              "Identifier l’écart entre eau pure et fluide réel"
            ],
            [
              "Comment évolue la pression si la cadence augmente ?",
              "Courbe PQ, points calculés et ajustement",
              "Examiner la résistance selon le débit et définir les prochains essais"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Au début, le calcul compare tubes et composants ; au prototype, il explique les écarts entre débit prévu et mesuré ; lors d’une révision, il évalue longueur, diamètre, vanne ou fluide. La décision finale doit aussi satisfaire montage, compatibilité chimique, résidus, coût et maintenance."
        }
      ]
    },
    {
      "title": "3. Préparer les paramètres du circuit",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Découper le chemin à chaque changement de paramètres et relever diamètre intérieur effectif, longueur et composants. Ne pas remplacer deux diamètres différents par une longueur totale et un diamètre moyen : une restriction locale peut dominer. Vérifier tolérances, déformation sous pression et rétrécissement au montage."
        },
        {
          "type": "table",
          "headers": [
            "Entrée",
            "Source des données",
            "Erreur à éviter"
          ],
          "rows": [
            [
              "Densité, viscosité et température",
              "Données du fluide réel, mesures ou références adaptées",
              "Un préréglage au nom proche ne décrit pas nécessairement la formulation exacte"
            ],
            [
              "Diamètre intérieur et longueur",
              "Plans, fiches et dimensions du montage réel",
              "Ne pas saisir le diamètre extérieur comme intérieur ; la longueur est en mm"
            ],
            [
              "Cv du composant",
              "Documentation du modèle, de la position de vanne et des conditions d’essai",
              "La taille du port, Kv ou le débit maximal ne sont pas Cv"
            ],
            [
              "Coefficient de perte locale ξ",
              "Données adaptées à la géométrie et au régime",
              "Ne pas compter une seconde fois une perte déjà décrite par Cv"
            ],
            [
              "Débit cible ou différentiel disponible",
              "Besoin du cycle ou conditions de pression définies",
              "Toute la pression maximale de la pompe n’est pas disponible pour les seules pertes du circuit"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "L’outil accepte viscosité dynamique ou cinématique. Vérifier les unités : 1 mPa·s = 0.001 Pa·s ; 1 cSt = 10⁻⁶ m²/s. Elles sont liées par μ = ρν, avec μ dynamique, ρ masse volumique et ν cinématique. Copier une valeur dans une unité différente peut provoquer une erreur d’ordre de grandeur."
        },
        {
          "type": "paragraph",
          "text": "Les propriétés de l’eau sont calculées selon la température saisie. Tous les autres préréglages ne disposent pas d’un modèle complet dépendant de la température. Pour un réactif de température, concentration ou formule précises, obtenir densité et viscosité correspondantes puis utiliser la saisie personnalisée. Le nom du préréglage ne valide pas les propriétés."
        }
      ]
    },
    {
      "title": "4. À quelles questions répondent les deux modes ?",
      "blocks": [
        {
          "type": "subheading",
          "title": "Débit connu : calculer les pertes à vaincre"
        },
        {
          "type": "paragraph",
          "text": "Convertir volume de lavage, durée de transfert ou objectif de circulation en débit de travail. Par exemple, 30 mL à délivrer en 30 s utiles correspondent à 60 mL/min. Calculer chaque tronçon à ce débit fournit les pertes de la combinaison actuelle."
        },
        {
          "type": "paragraph",
          "text": "En série, sans dérivation ni fuite et en régime permanent, le débit est identique partout. Le mode à débit connu accepte cependant des valeurs par ligne et les utilise réellement : vérifier chaque ligne, sans supposer qu’une modification du champ supérieur les synchronise. La pertinence physique d’une somme à débits différents dépend du circuit réel."
        },
        {
          "type": "subheading",
          "title": "Perte connue : estimer le débit pour le différentiel disponible"
        },
        {
          "type": "paragraph",
          "text": "Le calcul inverse cherche le débit donnant la perte cible. Il impose actuellement un débit commun à toutes les lignes et convient à un trajet en série clairement défini. Il ne résout pas automatiquement la répartition entre branches parallèles."
        },
        {
          "type": "formula",
          "expression": "Δp_available,loss = Δp_drive − Δp_boundary − ρgΔz",
          "note": "Dans un bilan permanent incompressible simplifié, soustraire au différentiel moteur les pressions aux extrémités et le dénivelé. Traiter séparément la différence de hauteur cinétique si elle est significative. La valeur du calcul inverse doit être disponible pour les pertes saisies, et non être la pression maximale brute de la pompe."
        },
        {
          "type": "paragraph",
          "text": "La capacité d’une pompe à membrane varie avec débit et conditions d’entrée/sortie. Le calcul inverse montre seulement la cohérence entre différentiel saisi et modèle. Il ne prouve pas que la pompe réelle atteindra ce point : vérifier sa courbe, ses conditions d’aspiration et, si nécessaire, mesurer."
        }
      ]
    },
    {
      "title": "5. Exemple : modifier le diamètre ou le Cv ?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Exemple calculé avec le noyau FOREACH : eau à 20 ℃, débit 60 mL/min, tube droit de 1 m en série avec un composant Cv. Le coefficient local supplémentaire du tube est nul. Le composant utilise le modèle d’étranglement par orifice, supposé mince à arête vive. Pressions source et terminale, dénivelés et éléments non indiqués sont exclus."
        },
        {
          "type": "paragraph",
          "text": "Créer une ligne ID : 60 mL/min, diamètre intérieur 1 mm, longueur 1000 mm, ξ = 0. Ajouter une ligne Cv : 60 mL/min et Cv = 0.02. Calculer la base puis ne modifier que le diamètre ou le Cv, toutes les autres conditions restant identiques."
        },
        {
          "type": "table",
          "headers": [
            "Configuration",
            "Perte du tube droit",
            "Perte du composant Cv",
            "Perte totale"
          ],
          "rows": [
            [
              "A : diamètre intérieur 1 mm, Cv = 0.02",
              "40.80 kPa",
              "4.41 kPa",
              "45.21 kPa"
            ],
            [
              "B : diamètre intérieur 2 mm, Cv = 0.02",
              "2.55 kPa",
              "4.41 kPa",
              "6.96 kPa"
            ],
            [
              "C : diamètre intérieur 1 mm, Cv = 0.04",
              "40.80 kPa",
              "1.11 kPa",
              "41.92 kPa"
            ]
          ]
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/fluid-resistance-guide/comparison.fr.svg",
          "alt": "Comparaison empilée des pertes du tube et du composant Cv pour A, B et C ; le tube domine la configuration initiale",
          "width": 1400,
          "height": 740,
          "caption": "Résultats du modèle, sans mesure produit. Le tube représente environ 90 % des pertes initiales ; après élargissement, le composant Cv devient dominant. Les arrondis peuvent créer un léger écart entre valeurs partielles affichées et total."
        },
        {
          "type": "paragraph",
          "text": "Dans la configuration initiale, le tube représente environ 90 % du total. Augmenter Cv réduit la perte de la vanne, mais laisse environ 40.80 kPa dans le tube. Élargir le tube ramène le total à environ 6.96 kPa. Il faut donc étudier d’abord ses dimensions plutôt que déduire la restriction du seul nom ou aspect des composants."
        },
        {
          "type": "subheading",
          "title": "Pourquoi le diamètre a-t-il un effet aussi marqué ?"
        },
        {
          "type": "formula",
          "expression": "Δp = 128μLQ / (πd⁴)",
          "note": "Relation pour un écoulement laminaire pleinement développé, un fluide newtonien et un tube droit rigide circulaire, en unités SI. Les Re calculés, environ 1269 et 635, permettent ici d’interpréter les pertes par la relation laminaire."
        },
        {
          "type": "paragraph",
          "text": "À débit, viscosité et longueur identiques, passer de 1 mm à 2 mm ramène la perte laminaire du tube à environ 1/16 de sa valeur initiale. Son volume géométrique passe toutefois d’environ 0.785 mL à 3.142 mL, soit un facteur 4. Évaluer ce gain avec l’amorçage, le volume de renouvellement et les résidus, pas seulement la résistance minimale."
        },
        {
          "type": "paragraph",
          "text": "Il ne faut pas en conclure que tout circuit doit être élargi en premier. Dans B, la vanne perd déjà plus que le tube ; l’intérêt d’un diamètre encore supérieur diminue. Réexaminer la répartition après chaque modification pour identifier la nouvelle contrainte dominante."
        }
      ]
    },
    {
      "title": "6. Comment lire les résultats ?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Examiner d’abord le total, puis les pertes par ligne et leur part, enfin vitesse et Re pour vérifier régime et hypothèses. Les champs détaillés expliquent le résultat ; ils ne constituent pas tous des objectifs de performance indépendants."
        },
        {
          "type": "table",
          "headers": [
            "Résultat",
            "Sens technique",
            "Utilisation"
          ],
          "rows": [
            [
              "Perte totale ΔPt",
              "Somme des pertes saisies",
              "Intégrer au bilan complet et comparer aux conditions motrices disponibles"
            ],
            [
              "Friction ΔPy et perte locale ΔPj",
              "Origine dans le tube ou dans les composants locaux",
              "Prioriser diamètre/longueur ou composants et rétrécissements"
            ],
            [
              "Vitesse et nombre de Reynolds Re",
              "Régime pour les propriétés et la section effective définies",
              "Contrôler hypothèses, transition ou saisies anormales"
            ],
            [
              "Source de perte maximale et part",
              "Ligne concentrant les pertes dans les conditions saisies",
              "Classer les améliorations sans généraliser à tous les régimes"
            ],
            [
              "Cv global ou équivalent",
              "Expression de la résistance par un coefficient dans des conditions données",
              "Aide à la comparaison ; pas une propriété constante pour tous débits, fluides ou corrections"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Identifier la résistance dominante à partir des pertes au débit saisi. Avec des débits différents selon les lignes, le plus petit Cv équivalent n’a pas nécessairement la perte maximale. Une modification du tube ou du débit peut déplacer la contrainte principale."
        }
      ]
    },
    {
      "title": "7. Utiliser la courbe PQ pour comprendre les marges",
      "blocks": [
        {
          "type": "paragraph",
          "text": "La courbe PQ est calculée pour le circuit saisi à plusieurs débits ; l’ordonnée représente les pertes. Elle montre la pression à consacrer à cette résistance selon le débit, et non la capacité d’une pompe."
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/fluid-resistance-guide/curve.fr.svg",
          "alt": "Courbes de résistance A et B issues du noyau de calcul, avec points à 60 mL/min",
          "width": 1400,
          "height": 800,
          "caption": "Pour le même fluide et Cv, les deux diamètres produisent des courbes différentes. Les points marqués sont à 60 mL/min. Il n’y a ni courbe de pompe ni condition de pression statique dans ce graphique."
        },
        {
          "type": "paragraph",
          "text": "Comparer la pompe dans le même fluide et les conditions pertinentes au besoin du système incluant pressions limites et dénivelé, avec la même référence de pression. Respecter aspiration, plage et stabilité. L’outil n’importe pas automatiquement de courbe de pompe, ne calcule pas leur intersection et ne recommande pas de modèle."
        },
        {
          "type": "paragraph",
          "text": "Avec des débits par ligne, la génération de courbe applique le même facteur à chaque débit. Ce balayage conserve les rapports définis, sans résoudre à nouveau la répartition d’un réseau parallèle à chaque pression. Définir clairement le débit de référence de l’abscisse et son lien avec chaque ligne."
        },
        {
          "type": "paragraph",
          "text": "L’ajustement décrit l’intervalle calculé ; éviter une extrapolation éloignée. R², résidus et autres indicateurs mesurent l’accord avec les points calculés, sans prouver que propriétés, paramètres ou modèle représentent l’appareil réel."
        }
      ]
    },
    {
      "title": "8. Petits passages, faible Reynolds et données Cv",
      "blocks": [
        {
          "type": "paragraph",
          "text": "À petit diamètre ou faible vitesse, la viscosité peut modifier fortement la résistance. Re = ρud/μ relie densité, vitesse moyenne, diamètre intérieur et viscosité dynamique. Il aide à identifier le régime sans déterminer à lui seul la perte exacte de chaque composant complexe."
        },
        {
          "type": "paragraph",
          "text": "Les tubes utilisent Darcy–Weisbach avec estimation du facteur de friction par Churchill. Sans saisie de rugosité, le modèle actuel suppose une paroi lisse. Les corrections d’orifice et de Cv sont des estimations, pas un remplacement universel des courbes mesurées ni des procédures complètes de correction des normes applicables."
        },
        {
          "type": "paragraph",
          "text": "Choisir Cv pour le modèle, la position de vanne, le fluide et les conditions d’étalonnage. Le diamètre équivalent déduit de Cv est une représentation du modèle, pas la mesure du plus petit passage réel. Il ne détermine directement ni passage de particules, ni risque de bouchage, ni cote de fabrication."
        },
        {
          "type": "paragraph",
          "text": "Le sang total et certaines solutions polymères peuvent être non newtoniens ; une viscosité fixe n’est qu’une approximation explicitée. Le préréglage air n’est pas un modèle compressible complet. Forts différentiels, variations de densité, écoulement critique et mélanges gaz/liquide nécessitent un modèle adapté ou des mesures."
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/technical-articles/cv-kv-correction-for-microfluidics/",
              "label": "Pour approfondir : calcul et correction Cv/Kv en microfluidique et étranglement de précision"
            }
          ]
        }
      ]
    },
    {
      "title": "9. Du calcul à la mesure : localiser les écarts",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Fixer les limites de comparaison et mesurer aux mêmes nœuds que le calcul. Des filtres, raccords rapides ou tuyaux non modélisés entre les prises expliquent une perte supérieure sans prouver une erreur de formule. Corriger la différence hydrostatique si les prises sont à des hauteurs différentes."
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Établir une base : fluide et température connus, tubes courts, paramètres confirmés ; relever débit et différentiel stables.",
            "Vérifier unités et géométrie : diamètre intérieur, longueur, débit, Cv/Kv, densité et viscosité, sans double comptage.",
            "Ajouter progressivement le circuit réel et comparer l’accroissement de perte à chaque tube ou composant pour localiser le début de l’écart.",
            "Couvrir les limites : niveau bas, filtre chargé, température, positions de vanne et débits de travail.",
            "Conserver montage, prises, instruments, fluide, version des paramètres, anomalies et données brutes, pas uniquement la moyenne finale."
          ]
        },
        {
          "type": "paragraph",
          "text": "Le débit et la pression instantanés d’une pompe à membrane peuvent pulser. Pour comparer au modèle permanent, définir les fenêtres de moyenne tout en enregistrant les pics utiles au projet. Des moyennes proches ne valident pas pression transitoire, fluctuations de buse ou efficacité du lavage."
        },
        {
          "type": "paragraph",
          "text": "Absence de débit, intermittence ou baisse progressive imposent aussi de vérifier entrées d’air, mise à l’air du bouchon, bulles, vannes, bouchage et alimentation. Le calcul évalue les résistances supposées ; il ne détecte pas ces défauts et ne démontre ni compatibilité chimique, ni amorçage, ni fiabilité à long terme."
        }
      ]
    },
    {
      "title": "10. Exporter pour rendre les comparaisons traçables",
      "blocks": [
        {
          "type": "paragraph",
          "text": "L’export Excel contient résultats, synthèse statistique et données PQ. Il sert à conserver les versions, comparer les changements et communiquer avec le fournisseur, en complément des conditions saisies, du schéma et des essais."
        },
        {
          "type": "paragraph",
          "text": "Nommer clairement les lignes, par exemple « bouteille de lavage vers entrée pompe » ou « tube 1 mm après bloc de vannes », et noter source et état particulier. Consigner séparément formule du fluide, température, origine des propriétés, modèle Cv, hypothèses géométriques, version et date. L’export ne contient pas automatiquement tout le contexte du projet."
        },
        {
          "type": "paragraph",
          "text": "Pour comparer A/B, conserver fluide, débit cible et paramètres non modifiés. Indiquer chaque modification. Si plusieurs conditions changent, distinguer leurs contributions pour ne pas confondre baisse de viscosité, augmentation de diamètre et variation de Cv."
        }
      ]
    },
    {
      "title": "11. Préparer la sélection des pompes, vannes et tubes FOREACH",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Fournir débit cible, pertes par élément, aspiration et pression terminale facilite la discussion bien davantage qu’un débit libre seul. Les résultats définissent les conditions de validation des configurations candidates et indiquent s’il faut d’abord améliorer la tuyauterie."
        },
        {
          "type": "paragraph",
          "text": "Si un tube long et fin domine, comparer diamètre et longueur ; si un composant domine, obtenir Cv, courbe de perte et compatibilité pour sa position ou son modèle. Si la géométrie reste fixe et exige plus de pression, étudier pompe, tenue des raccords et protection de l’instrument. Le calculateur ne garantit aucun modèle."
        },
        {
          "type": "paragraph",
          "text": "Joindre schéma, paramètres, calculs et débits/pressions mesurés. FOREACH peut s’appuyer sur les données des composants pour discuter la sélection et préciser les informations et essais de prototype encore nécessaires."
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/calculators/fluid-resistance/",
              "label": "Ouvrir le calculateur"
            },
            {
              "href": "/resources/technical-articles/foreach-miniature-diaphragm-pump-oem-integration/",
              "label": "Pour approfondir : intégration OEM FOREACH, point de fonctionnement et validation"
            },
            {
              "href": "/products/",
              "label": "Voir les pompes, vannes et composants FOREACH"
            }
          ]
        }
      ]
    }
  ],
  "faqTitle": "Questions sur le calculateur de résistance fluidique",
  "faqItems": [
    {
      "question": "Le calculateur peut-il choisir directement la pompe à acheter ?",
      "answer": "Non. Il calcule la résistance du circuit saisi. Il faut combiner résultats, courbes de pompe, aspiration, pression terminale, dénivelé, fluide et cycle pour sélectionner puis valider une configuration."
    },
    {
      "question": "Le débit calculé à partir d’une perte connue est-il le débit réel ?",
      "answer": "C’est une estimation fondée sur les propriétés et modèles saisis. La capacité réelle de la source à fournir le différentiel, les pertes omises, bulles, bouchages et pulsations peuvent modifier le résultat installé."
    },
    {
      "question": "Peut-on additionner toutes les branches parallèles ?",
      "answer": "Leur somme de pertes n’est pas le différentiel entre les nœuds communs. L’outil ne résout pas automatiquement la répartition d’un réseau parallèle ; définir chemins, débits connus et pressions, puis appliquer une méthode adaptée."
    },
    {
      "question": "Pourquoi élargir un tube est-il parfois plus efficace qu’augmenter Cv ?",
      "answer": "Cela dépend de la répartition initiale. Si le tube fin et long domine, modifier Cv n’agit que sur une faible part. Ici le tube représente environ 90 % du total ; son diamètre est donc plus influent, mais le volume interne supplémentaire doit aussi être évalué."
    },
    {
      "question": "Un très bon ajustement de courbe prouve-t-il l’exactitude du calcul ?",
      "answer": "Non. Il indique seulement l’accord avec les points calculés. Il ne valide ni propriétés, ni géométrie, ni données des composants ; vérifier par des mesures de pression et de débit adaptées."
    },
    {
      "question": "Saisir un fluide permet-il de vérifier les matériaux de la pompe ?",
      "answer": "Non. Le calcul estime les pertes à partir des propriétés physiques, sans évaluer la compatibilité chimique de tête, membrane, clapets, joints ou tubes. Confirmer matériaux et aptitude au procédé séparément."
    }
  ],
  "cta": {
    "title": "Discutez des composants à partir de votre circuit et de ses pertes",
    "description": "Indiquez fluide, température, débit cible, dimensions, paramètres des composants, pressions d’entrée/sortie et résultats calculés ou mesurés pour préciser la sélection et la validation avec FOREACH.",
    "contactLabel": "Soumettre les besoins du circuit",
    "productsLabel": "Utiliser le calculateur",
    "productsHref": "/resources/calculators/fluid-resistance/"
  }
} satisfies DiaphragmPumpEngineeringArticleCopy;
