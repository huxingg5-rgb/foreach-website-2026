import type { DiaphragmPumpEngineeringArticleCopy } from "../../diaphragm-pump-engineering-article.types";
import { blindThreadFigure, trappedVolumeFigure, virtualLeakEquations, virtualLeakReferences } from "./shared";

export const copy = {
  metadata: {
    title: "Contrôle d’étanchéité : identifier et prévenir les fuites virtuelles",
    seoTitle: "Contrôle d’étanchéité et fuites virtuelles | FOREACH",
    seoDescription: "Pompage lent sans signal d’hélium ? Identifiez les volumes piégés, le dégazage et les fuites virtuelles à l’aide des courbes de pompage et de remontée de pression.",
    coverImage: trappedVolumeFigure.src,
    coverAlt: "Coupe schématique d’une poche de gaz entre deux soudures se vidant lentement vers une enceinte à vide",
  },
  deck: "Lorsqu’un contrôle d’étanchéité ne localise aucune fuite nette alors que la mise sous vide ralentit, examinez les volumes piégés et le dégazage des matériaux, en plus des fuites réelles. Les taraudages borgnes, les joints en série et les espaces entre soudures peuvent stocker du gaz et le libérer par des passages étroits. Les courbes de pompage et les essais de remontée de pression orientent le diagnostic ; ni l’absence de signal d’hélium ni une seule courbe ne permettent d’exclure une fuite réelle.",
  leadBlocks: [
    { type: "paragraph", text: "Au contrôle final de composants ou d’ensembles étanches au gaz, la fuite mesurée peut fluctuer autour de la limite d’acceptation : une mesure est faible, puis la suivante augmente. Un équipement à vide ou un circuit fluidique d’instrument fonctionnant en dépression peut présenter un problème similaire : le détecteur ne trouve aucun point précis, mais l’évacuation prend plus de temps et la pression de fonctionnement requise n’est pas atteinte." },
    { type: "paragraph", text: "Recherchez les sources de gaz internes autant que les ouvertures vers l’extérieur. Du gaz emprisonné pendant la fabrication ou l’assemblage peut ne sortir que par un passage de faible conductance : c’est une fuite virtuelle typique due à un volume piégé. Le dégazage, la désorption d’humidité et la réévaporation de liquides résiduels peuvent produire des symptômes similaires et doivent être examinés séparément." },
  ],
  sections: [
    {
      title: "Quelle différence entre fuite réelle, externe, interne et virtuelle ?", tocLabel: "Types de fuite",
      blocks: [
        { type: "paragraph", text: "Ces termes décrivent des aspects différents. Réelle ou virtuelle caractérise surtout l’origine du gaz ; externe ou interne caractérise son trajet. Il ne s’agit donc pas de quatre catégories mutuellement exclusives. Déterminez d’où vient le gaz et où il va avant de choisir le contrôle." },
        { type: "list", items: [
          "Fuite réelle : le gaz passe de la haute vers la basse pression par un trou, une fissure ou un défaut d’étanchéité. Un détecteur peut la localiser si la sensibilité, l’accès du gaz traceur et le temps de réponse sont adaptés.",
          "Fuite externe : le gaz traverse la frontière entre le système et son environnement. Sous vide, le gaz extérieur entre généralement dans le système ; dans un circuit sous pression positive, le fluide peut s’échapper vers l’extérieur.",
          "Fuite interne : du gaz passe entre des chambres ou conduites qui devraient être isolées, par exemple au travers d’une vanne fermée. Isolez les tronçons, contrôlez la tenue ou la remontée de pression, puis introduisez le gaz traceur du côté approprié selon le montage d’essai.",
          "Fuite virtuelle : du gaz contenu dans un volume mort interne entre lentement dans l’enceinte par un passage de faible conductance et imite une fuite persistante. Le dégazage, la désorption, la réévaporation et la perméation augmentent également la charge gazeuse. Même s’ils sont parfois regroupés sous ce terme, distinguez ces phénomènes pour trouver la cause.",
        ] },
        { type: "paragraph", text: "Pour une fuite réelle, recherchez le passage de fuite. Pour une fuite virtuelle, recherchez le gaz stocké et les sources internes de libération. L’absence de réponse à une pulvérisation d’hélium signifie seulement qu’aucun signal correspondant n’a été détecté dans les conditions de l’essai ; elle ne prouve pas l’absence de fuite réelle." },
      ],
    },
    {
      title: "Pourquoi une fuite virtuelle ralentit-elle le pompage sans signal d’hélium ?", tocLabel: "Mécanisme des fuites virtuelles",
      blocks: [
        { type: "paragraph", text: "Plus le passage entre la poche et l’enceinte est long et étroit, plus sa conductance est généralement faible et plus le gaz s’échappe lentement. L’enceinte peut déjà être à basse pression alors que la poche continue à l’alimenter, ce qui prolonge la fin de la courbe de pompage." },
        { type: "formula", expression: virtualLeakEquations.balance, note: "Bilan gazeux approché en régime stable : q_total est la charge gazeuse totale en mbar·L/s ; S_eff, la vitesse de pompage effective à l’enceinte en L/s ; p, la pression absolue en mbar. Cette relation suppose une charge approximativement stable et une influence négligeable de la pression de base de la pompe. Le débit nominal de la pompe n’est pas automatiquement égal à S_eff." },
        { type: "paragraph", text: "Augmenter la vitesse de pompage effective peut abaisser la pression pour une même charge gazeuse, mais ne supprime pas le volume piégé. Entre deux cordons de soudure, un cordon extérieur étanche peut empêcher l’hélium d’atteindre la poche, tandis qu’un petit passage côté vide laisse sortir le gaz stocké. Une pression anormale et l’absence de réponse nette à l’hélium peuvent donc coexister." },
        { type: "figure", ...trappedVolumeFigure, alt: "Fuite virtuelle dans une poche entre deux soudures : le gaz sort côté vide tandis que la soudure extérieure bloque l’hélium", caption: "1 Enceinte à vide ; 2 paroi ; 3 poche de gaz ; 4 libération lente par un passage côté vide ; 5 soudure extérieure étanche ; 6 hélium extérieur sans accès à la poche. Coupe schématique, sans échelle. Le pompage ne supprime pas la géométrie qui piège le gaz." },
        { type: "paragraph", text: "Certains volumes morts se remplissent à nouveau lors de chaque remise à la pression atmosphérique. Le pompage suivant présente alors une traîne similaire, parfois interprétée comme une fuite réelle stable. L’humidité adsorbée ou condensée peut aussi rester sur des surfaces froides, puis se désorber ou se réévaporer à plusieurs reprises, allongeant la mise sous vide." },
      ],
    },
    {
      title: "Quelles géométries peuvent piéger du gaz et créer des fuites virtuelles ?", tocLabel: "Volumes piégés",
      blocks: [
        { type: "paragraph", text: "Ces fuites prennent souvent naissance lors de la conception ou de l’assemblage. Recherchez à la fois un volume de stockage et un passage restreint vers la basse pression. Un trou borgne ou deux joints ne suffisent pas, à eux seuls, à établir le diagnostic." },
        { type: "subheading", title: "Taraudages borgnes : le gaz sous la vis s’évacue par les jeux du filetage" },
        { type: "paragraph", text: "Une vis dans un taraudage borgne peut emprisonner du gaz sous son extrémité. Sans évent dédié, le gaz doit parcourir lentement les jeux du filetage jusqu’à l’enceinte ; l’hélium extérieur n’atteint pas directement le fond. Des vis ventilées ou des évents appropriés peuvent être prévus. Comme ils modifient la section et la capacité de charge de la vis, vérifiez également la résistance mécanique." },
        { type: "figure", ...blindThreadFigure, alt: "Gaz retenu au fond d’un taraudage borgne et remontant par les jeux du filetage vers l’enceinte à vide", caption: "1 Enceinte à vide ; 2 tête de vis ; 3 paroi ; 4 volume mort sous la vis ; 5 passage restreint le long du filetage ; 6 fond fermé du trou borgne. Filets et jeux schématiques, sans valeur dimensionnelle. La frontière extérieure fermée empêche l’hélium d’atteindre directement la poche." },
        { type: "subheading", title: "Doubles soudures, joints en série et brides : du gaz entre deux barrières" },
        { type: "list", items: [
          "Deux soudures d’angle : un cordon extérieur étanche et un petit passage côté vide peuvent enfermer une poche de gaz. Définissez la frontière d’étanchéité et la voie d’évacuation dès la conception. Une soudure discontinue ou un évent dédié doivent être évalués selon les efforts, la propreté et l’étanchéité exigés.",
          "Joints en série : sans évent ni prise de contrôle entre deux joints toriques, du gaz peut rester piégé. L’hélium extérieur peut ne pas atteindre le joint intérieur. Si la conception le permet, prévoyez un accès intermédiaire de ventilation, de pompage ou de contrôle et vérifiez les deux joints séparément ; n’ajoutez pas de rainures arbitraires qui compromettent l’étanchéité.",
          "Brides et joints plats : un serrage inadapté, des contacts locaux ou une déformation du joint peuvent laisser des interstices difficiles à évacuer. Maîtrisez la compression et le serrage conformément au montage prévu, plutôt que d’augmenter l’effort pour compenser un défaut de contact ou de ventilation.",
        ] },
      ],
    },
    {
      title: "Comment le dégazage des matériaux et des surfaces peut-il imiter une fuite virtuelle ?", tocLabel: "Dégazage",
      blocks: [
        { type: "paragraph", text: "Les matériaux et les surfaces peuvent libérer du gaz sans présence de cavité fermée. Le traitement diffère de celui d’un volume mort géométrique : choix des matériaux, nettoyage, séchage et étuvage compatible réduisent certaines sources de dégazage ; les volumes piégés nécessitent souvent une meilleure voie d’évacuation." },
        { type: "list", items: [
          "Graisses, joints et résidus de nettoyage : eau, air, solvants retenus et gaz contenus dans les matériaux peuvent être libérés par désorption, diffusion ou évaporation. Choisissez les matériaux selon le niveau de vide visé et limitez les quantités et résidus inutiles.",
          "Pression de vapeur et température : la libération de gaz des lubrifiants, huiles et de l’eau dépend de la température. En vide poussé ou ultravide, évaluez aussi les métaux, matériaux de brasage et traitements de surface. La compatibilité avec un circuit liquide courant ne démontre pas l’aptitude au vide.",
          "Couches anodisées et poreuses : elles favorisent l’adsorption et la rétention de gaz. Leur aptitude dépend du procédé précis, de la propreté et de la pression visée ; la résistance à la corrosion ne suffit pas à déterminer les performances sous vide.",
          "Céramiques, métaux et verre : la porosité et la densité d’une céramique dépendent de sa fabrication. Même un substrat dense porte des couches adsorbées après exposition à l’air. L’étuvage peut réduire certaines charges gazeuses de matériaux compatibles, mais ne répare ni pores traversants, ni fissures, ni fuites réelles.",
        ] },
        { type: "paragraph", text: "Les conditions de nettoyage, séchage et étuvage doivent respecter les limites des joints, adhésifs, capteurs et autres composants. N’imposez pas un même traitement à haute température à tout le circuit fluidique pour accélérer le dégazage." },
      ],
    },
    {
      title: "Comment interpréter les courbes de pompage et les essais de remontée de pression ?", tocLabel: "Diagnostic et contrôles",
      blocks: [
        { type: "paragraph", text: "Comparez la pression en fonction du temps à un enregistrement du système en bon état. Gardez aussi constants que possible le volume, la pompe, les positions de vannes, les conduites, la température et l’historique de remise à l’air. Un pompage plus lent qui finit par retrouver une pression limite similaire fait suspecter un dégazage ou une fuite virtuelle. Un palier de pression plus élevé peut aussi provenir d’une fuite réelle, d’un dégazage continu ou d’une modification du pompage ; il ne suffit pas à conclure." },
        { type: "paragraph", text: "Pour un essai de remontée de pression, évacuez l’enceinte, isolez-la de la pompe, puis enregistrez la pression absolue. Avec un volume et une température stables et les autres influences maîtrisées, une pente assez constante suggère une source continue de gaz ; une pente qui diminue soutient l’hypothèse d’un dégazage ou du vidage progressif d’une poche. Reprenez le pompage, puis répétez le même intervalle d’essai. Fuite réelle et dégazage peuvent coexister." },
        { type: "formula", expression: virtualLeakEquations.isolatedVolume, note: "V est le volume gazeux effectif isolé en L, Δp la variation de pression absolue en mbar et Δt la durée en s ; q_apparent s’exprime en mbar·L/s. Utilisez la relation avec un volume et une température approximativement stables. Tant que fuite réelle, dégazage, gaz piégé et fuite de la vanne d’isolement ne sont pas distingués, le résultat reste une charge gazeuse apparente, pas un taux de fuite externe confirmé." },
        { type: "paragraph", text: "Ce tableau aide à prioriser les vérifications ; un symptôme isolé ne constitue pas un critère d’acceptation." },
        { type: "table", headers: ["Comportement observé", "Premières hypothèses", "Vérifications suivantes"], rows: [
          ["Pompage plus lent, puis pression proche de l’ancienne limite après une longue durée", "Dégazage ou fuite virtuelle ; vérifier aussi la voie de pompage", "Contrôler pompe, vannes, propreté, séchage et volumes morts ; traiter dans les limites des matériaux"],
          ["Palier de pression plus élevé et pentes de remontée répétées assez constantes", "Fuite réelle ou autre source continue de gaz", "Vérifier température et volume effectif, isoler les tronçons et localiser avec un gaz traceur adapté"],
          ["Après fermeture de la vanne, l’autre côté influence encore la chambre isolée", "Fuite de la vanne d’isolement ou entre chambres", "Maîtriser séparément les deux pressions, contrôler par tronçons et appliquer le traceur du côté suspect selon le montage"],
          ["Contrôle statique sans anomalie nette, mais réponse de fuite pendant le mouvement", "Joint mobile ou variation des efforts mécaniques", "Contrôler sous le mouvement et la pression différentielle prévus ; inspecter tige, joints et efforts, puis envisager un soufflet adapté si nécessaire"],
          ["Pompage ralenti après exposition à du gaz humide ou longtemps à l’air", "Adsorption, désorption ou réévaporation d’eau", "Vérifier le gaz et la remise à l’air ; nettoyer, sécher et prolonger le pompage ou étuver dans les limites des composants"],
        ] },
        { type: "paragraph", text: "Si les lectures fluctuent, vérifiez aussi l’étalonnage du détecteur, le bruit de fond, la gamme, l’accès du traceur et le délai d’attente. L’absence de réponse à l’hélium n’est un indice utile qu’après vérification de la capacité du montage à couvrir la zone suspecte." },
      ],
    },
    {
      title: "Comment réduire les fuites virtuelles dès la conception et l’assemblage ?", tocLabel: "Conception et prévention",
      blocks: [
        { type: "paragraph", text: "Examinez où le gaz peut rester et comment il peut s’évacuer. Contrôlez en priorité les taraudages borgnes, les soudures des deux côtés, les joints en série et les interfaces de brides. Un volume mort ne provoque pas automatiquement une fuite virtuelle, mais une voie d’évacuation mal définie demande une évaluation." },
        { type: "paragraph", text: "Examinez aussi ce que les matériaux et surfaces peuvent libérer, et comment les traiter. Définissez avant assemblage le nettoyage, le séchage, le stockage et le dégazage compatibles avec les surfaces retenant l’humidité, lubrifiants, résidus et couches poreuses. Conservez des courbes initiales de pompage et de remontée de pression pour distinguer ensuite contamination, changement de structure et fuite réelle." },
        { type: "paragraph", text: "Dans les circuits fluidiques d’instruments en dépression, vérifiez également la position des joints, l’ajustement du tube et les espaces créés au montage. Les raccords FOREACH pour tubes rigides ci-dessous permettent de comparer des structures de connexion. Les schémas de cet article ne démontrent ni leur aptitude au vide poussé ou à l’ultravide, ni un taux de fuite mesuré ; vérifiez les documents du modèle et les conditions réelles d’utilisation." },
        { type: "paragraph", text: "Les fuites virtuelles sont généralement plus simples à prévenir au stade de la conception. Vérifier tôt les volumes piégés, les évents et l’état des matériaux peut limiter les contrôles répétés, démontages et nettoyages après assemblage." },
      ],
    },
    { title: "Lectures complémentaires et références techniques", tocLabel: "Références", blocks: [virtualLeakReferences("fr", ["Choisir un raccord pour tube rigide : structure, installation et entretien", "Matériaux des raccords : corps, joints et fluides", "Manuel du vide Pfeiffer : connexions et ventilation des trous borgnes", "Manuel du vide Pfeiffer : matériaux et dégazage des surfaces", "Notions de vide Leybold : essais de remontée et de chute de pression"])] },
  ],
  faqTitle: "Questions fréquentes", faqItems: [],
  cta: {
    title: "Vérifiez les connexions et l’étanchéité de votre circuit en dépression",
    description: "Indiquez le fluide, la pression absolue visée, la température, les connexions et les relevés pression–temps pour définir les conditions de choix et de validation.",
    contactLabel: "Contacter le support technique", productsLabel: "Voir les composants fluidiques", productsHref: "/fr/products/",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
