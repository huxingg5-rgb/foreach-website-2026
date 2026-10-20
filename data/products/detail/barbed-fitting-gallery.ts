const imageRoot = "/images/products/fittings/barbed-fittings/photos/";

const photos = {
  straightEqualPaSide: "pa-equal-straight-barbed-fitting-side-view.webp",
  straightEqualPaDetail: "pa-equal-straight-barbed-fitting-molded-body-detail.webp",
  straightEqualPpCompact: "pp-equal-straight-barbed-fitting-compact-tapered-body.webp",
  straightEqualPpSide: "pp-equal-straight-barbed-fitting-side-view.webp",
  straightEqualGroupDark: "equal-straight-barbed-fittings-mixed-lineup-dark.webp",
  straightEqualGroupBlue: "equal-straight-barbed-fittings-mixed-lineup-blue.webp",
  tee: "tee-equal-barbed-fittings-three-size-group.webp",
  teeEqualGroup: "equal-tee-barbed-fittings-seven-piece-mixed-lineup.webp",
  teeEqualPaCompact: "pa-equal-tee-barbed-fitting-compact-body.webp",
  teeEqualPaSquareFront: "pa-equal-tee-barbed-fitting-square-body-front.webp",
  teeEqualPaSquareDetail: "pa-equal-tee-barbed-fitting-molded-mark-detail.webp",
  teeReducing: "tee-reducing-barbed-fittings-white-pair.webp",
  teeAbbPaFront: "pa-abb-reducing-tee-barbed-fitting-front-view.webp",
  teeAbbPaDetail: "pa-abb-reducing-tee-barbed-fitting-body-detail.webp",
  teeAabPaFront: "pa-aab-reducing-tee-barbed-fitting-side-port-view.webp",
  teeAabGroup: "aab-reducing-tee-barbed-fittings-mixed-material-group.webp",
  elbow: "elbow-barbed-fittings-size-lineup.webp",
  elbowReducingGroup: "reducing-elbow-barbed-fittings-mixed-material-group.webp",
  elbowReducingPpBlack: "pp-reducing-elbow-barbed-fitting-black-background.webp",
  elbowReducingPpBlue: "pp-reducing-elbow-barbed-fitting-blue-port-close-up.webp",
  elbowEqualPaSide: "pa-equal-elbow-barbed-fitting-rounded-side-view.webp",
  elbowEqualPaRear: "pa-equal-elbow-barbed-fitting-rounded-rear-view.webp",
  elbowEqualPaSquare: "pa-equal-elbow-barbed-fitting-square-body-detail.webp",
  straight: "straight-reducing-barbed-fittings-size-lineup.webp",
  reducerBlack: "straight-reducing-barbed-fittings-black-background-group.webp",
  reducerCloseup: "straight-reducing-barbed-fittings-port-close-up.webp",
  reducerBlue: "straight-reducing-barbed-fittings-blue-background-lineup.webp",
  y: "y-barbed-fittings-size-lineup.webp",
  yEqualDark: "y-equal-barbed-fittings-six-piece-dark-lineup.webp",
  yReducingGroup: "y-reducing-barbed-fittings-mixed-material-group.webp",
  yReducingDetails: "y-reducing-barbed-fittings-three-piece-detail-group.webp",
  yReducingPaSide: "pa-y-reducing-barbed-fitting-side-view.webp",
  yReducingPaPort: "pa-y-reducing-barbed-fitting-large-port-close-up.webp",
  combined: "pi-and-cross-four-way-barbed-fittings-group.webp",
  cross: "cross-four-way-barbed-fittings-pair.webp",
  pi: "pi-four-way-barbed-fittings-size-lineup.webp",
} as const;

type PhotoKey = keyof typeof photos;
type PhotoLocale = "zh" | "en" | "es" | "fr" | "ko" | "ru";

// Family photographs supplement the individual model image. Match the port
// geometry against the fittings catalog, pp. 27–32. The original T photo mixes
// equal and reducing fittings, so its two groups are separated. The original
// straight lineup and the three unbranded photos all show reducing connectors.
// Publication status remains controlled by the published-product connector.
const productPhotos: Record<string, readonly PhotoKey[]> = {
  "T型等径倒刺接头": [],
  "T型异径倒刺接头": [],
  "L型等径倒刺接头": ["elbow"],
  "L型异径倒刺接头": ["elbowReducingGroup"],
  "直通等径倒刺接头": [],
  "直通异径倒刺接头": ["reducerBlack", "reducerBlue", "reducerCloseup", "straight"],
  "Y型等径倒刺接头": ["y", "yEqualDark"],
  "Y型异径倒刺接头": ["yReducingGroup", "yReducingDetails"],
  "十字型四通等径倒刺接头": ["cross", "combined"],
  "π型四通等径倒刺接头": ["pi", "combined"],
};

const imageAlts: Record<PhotoLocale, Record<PhotoKey, string>> = {
  zh: {
    straightEqualPaSide: "PA 白色 C/D 系列等径直通倒刺接头侧面实拍：双挡环、中心模压面及两个等径接管端；系列参考图",
    straightEqualPaDetail: "PA 白色 C/D 系列等径直通倒刺接头细节实拍：中心模压标记与两侧倒刺轮廓；系列参考图",
    straightEqualPpCompact: "PP 本色 C 系列等径直通倒刺接头实拍：半透明细长本体及两侧渐缩倒刺端；系列参考图",
    straightEqualPpSide: "PP 本色 D 系列等径直通倒刺接头实拍：半透明本体、双挡环及两个等径接管端；系列参考图",
    straightEqualGroupDark: "C/D 系列等径直通倒刺接头合照：深色背景上六只 PA 白色与 PP 本色接头；混合材质系列图",
    straightEqualGroupBlue: "C/D 系列等径直通倒刺接头合照：蓝色背景上六只 PA 白色与 PP 本色接头；混合材质系列图",
    tee: "T型等径倒刺接头实拍：三款不同尺寸的半透明三通接头",
    teeEqualGroup: "T型等径倒刺接头系列合照：深灰背景上的七款乳白色与半透明接头，分别展示三个等径接口",
    teeEqualPaCompact: "PA乳白色小型等径T型倒刺接头系列实拍：紧凑圆身及三个相同口径的接管端",
    teeEqualPaSquareFront: "PA乳白色等径T型倒刺接头系列正面图：方块中心、圆形模压面与三个等径接管端",
    teeEqualPaSquareDetail: "PA乳白色等径T型倒刺接头系列特写：方块中心的模压标记、倒刺轮廓及三个等径端口",
    teeReducing: "T型变径倒刺接头实拍：两款乳白色三通接头，侧支路口径小于直通两端",
    teeAbbPaFront: "PA乳白色ABB变径T型倒刺接头系列正面实拍：中间支路较小，两侧直通接口等径且较大",
    teeAbbPaDetail: "PA乳白色ABB变径T型倒刺接头系列细节：较小中间支路、较大直通两端及中心模压标记",
    teeAabPaFront: "PA乳白色AAB变径T型倒刺接头系列实拍：中间支路与一侧接口等径，另一侧接口较小",
    teeAabGroup: "AAB变径T型倒刺接头系列合照：两款半透明与三款乳白色接头，均有一个较小的直通侧口",
    elbow: "L型倒刺弯头系列实拍：七款不同规格的乳白色与半透明直角接头",
    elbowReducingGroup: "L型变径倒刺接头系列合照：黑底上的一款半透明接头和两款乳白色接头",
    elbowReducingPpBlack: "PP本色L型变径倒刺接头实拍：黑底上的半透明直角接头及大小接管端",
    elbowReducingPpBlue: "PP本色L型变径倒刺接头特写：蓝色织物背景上的半透明接头与大小端口",
    elbowEqualPaSide: "PA乳白色等径L型倒刺接头系列实拍：蓝色织物背景上的圆弯头侧面与两个接管端",
    elbowEqualPaRear: "PA乳白色等径L型倒刺接头系列实拍：圆弯头背面及两侧倒刺结构",
    elbowEqualPaSquare: "PA乳白色等径L型倒刺接头系列特写：方块中心、模压标记与两侧接管端",
    straight: "直通变径倒刺接头实拍：纯黑背景上的九款乳白色与半透明大小口径转换接头",
    reducerBlack: "直通变径倒刺接头黑底合照：九款乳白色与半透明接头斜向分组排列",
    reducerCloseup: "直通变径倒刺接头端口特写：黑底上的乳白色与半透明接头及大小端口细节",
    reducerBlue: "直通变径倒刺接头蓝底系列图：九款乳白色与半透明接头横向排列",
    y: "Y型倒刺接头系列实拍：六款不同规格的乳白色与半透明三通接头",
    yEqualDark: "Y型等径倒刺接头系列合照：深灰背景上的六款乳白色与半透明接头",
    yReducingGroup: "Y型变径倒刺接头系列合照：两款半透明接头与一款乳白色接头，主接口大于两侧分支",
    yReducingDetails: "Y型变径倒刺接头三件合照：从混合系列图中分出的半透明与乳白色变径结构",
    yReducingPaSide: "PA乳白色Y型变径倒刺接头系列实拍：一个较大主接口连接两个较小分支的侧面细节",
    yReducingPaPort: "PA乳白色Y型变径倒刺接头端口特写：较大接管端的倒刺、端口边缘及内孔",
    combined: "四通倒刺接头组合实拍：左侧三款Π型接头与右侧两款十字型接头",
    cross: "十字型四通倒刺接头实拍：两款不同尺寸的半透明接头并排展示",
    pi: "Π型四通倒刺接头实拍：三款不同尺寸的半透明接头上下排列",
  },
  en: {
    straightEqualPaSide: "White PA C/D family equal-bore straight barbed fitting: side view of two stop rings, molded center pad and equal hose ends; family reference photo",
    straightEqualPaDetail: "White PA C/D family equal-bore straight barbed fitting: molded center mark and barb profiles; family reference photo",
    straightEqualPpCompact: "Natural PP C family equal-bore straight barbed fitting: slender translucent body and tapered hose ends; family reference photo",
    straightEqualPpSide: "Natural PP D family equal-bore straight barbed fitting: translucent body, two stop rings and equal hose ends; family reference photo",
    straightEqualGroupDark: "C/D family equal-bore straight barbed fittings: six white PA and natural PP fittings on dark fabric; mixed-material family photo",
    straightEqualGroupBlue: "C/D family equal-bore straight barbed fittings: six white PA and natural PP fittings on blue fabric; mixed-material family photo",
    tee: "Equal-bore tee barbed fittings: three translucent three-way connectors in different sizes",
    teeEqualGroup: "Equal-bore tee barbed fitting family lineup: seven ivory white and translucent connectors on dark gray fabric, each with three equal ports",
    teeEqualPaCompact: "Ivory PA small equal-bore tee barbed fitting family photo: compact rounded body and three hose ends of equal diameter",
    teeEqualPaSquareFront: "Ivory PA equal-bore tee barbed fitting family front view: square center, circular molded pad and three equal hose ends",
    teeEqualPaSquareDetail: "Ivory PA equal-bore tee barbed fitting family close-up: molded center mark, square body, barb profiles and three equal ports",
    teeReducing: "Reducing tee barbed fittings: two white connectors with a smaller side branch",
    teeAbbPaFront: "Ivory PA ABB reducing tee barbed fitting family photo: a smaller perpendicular branch and two equal larger inline ports",
    teeAbbPaDetail: "Ivory PA ABB reducing tee barbed fitting family detail: smaller perpendicular branch, larger inline ends and molded center mark",
    teeAabPaFront: "Ivory PA AAB reducing tee barbed fitting family photo: the perpendicular branch matches one inline port, with the other inline port smaller",
    teeAabGroup: "AAB reducing tee barbed fitting family group: two translucent and three ivory white connectors, each with one smaller inline side port",
    elbow: "Elbow barbed fitting family photo: seven white and translucent right-angle fittings",
    elbowReducingGroup: "Reducing elbow barbed fitting family photo: one translucent and two ivory white connectors on black fabric",
    elbowReducingPpBlack: "Natural PP reducing elbow barbed fitting: a translucent right-angle connector with larger and smaller hose ends on black fabric",
    elbowReducingPpBlue: "Natural PP reducing elbow barbed fitting close-up: translucent connector and different-size ports on blue fabric",
    elbowEqualPaSide: "Ivory PA equal-bore elbow barbed fitting family photo: rounded elbow side view and two hose ends on blue fabric",
    elbowEqualPaRear: "Ivory PA equal-bore elbow barbed fitting family photo: rear view of the rounded elbow and both barbed ends",
    elbowEqualPaSquare: "Ivory PA equal-bore elbow barbed fitting family close-up: square center body, molded mark and two hose ends",
    straight: "Straight reducing barbed fittings: nine white and translucent size-transition connectors on a plain black background",
    reducerBlack: "Straight reducing barbed fittings on black fabric: nine white and translucent connectors in diagonal groups",
    reducerCloseup: "Straight reducing barbed fitting port close-up: white and translucent connectors with larger and smaller ends on black fabric",
    reducerBlue: "Straight reducing barbed fitting lineup: nine white and translucent connectors arranged horizontally on blue fabric",
    y: "Y barbed fitting family photo: six white and translucent three-way connectors in assorted sizes",
    yEqualDark: "Equal-bore Y barbed fitting family photo: six ivory white and translucent connectors on dark gray fabric",
    yReducingGroup: "Reducing Y barbed fitting family photo: two translucent and one ivory white connector with a larger main port and two smaller branches",
    yReducingDetails: "Reducing Y barbed fitting three-piece group: translucent and ivory white reducing connectors separated from a mixed family photo",
    yReducingPaSide: "Ivory PA reducing Y barbed fitting family photo: side view of a larger main hose end and two smaller branches",
    yReducingPaPort: "Ivory PA reducing Y barbed fitting port close-up: barb, rim and bore of the larger hose end",
    combined: "Four-way barbed fitting group: three pi-shaped connectors on the left and two cross connectors on the right",
    cross: "Cross four-way barbed fitting photo: two translucent connector sizes displayed side by side",
    pi: "Pi-shaped four-way barbed fitting photo: three translucent connector sizes arranged vertically",
  },
  es: {
    straightEqualPaSide: "Racor recto de espiga de diámetro igual, familia C/D en PA blanco: vista lateral, dos anillos de tope y zona central moldeada; foto de referencia de la familia",
    straightEqualPaDetail: "Racor recto de espiga de diámetro igual, familia C/D en PA blanco: marca central moldeada y perfiles de espiga; foto de referencia de la familia",
    straightEqualPpCompact: "Racor recto de espiga de diámetro igual, familia C en PP natural: cuerpo translúcido delgado y extremos cónicos; foto de referencia de la familia",
    straightEqualPpSide: "Racor recto de espiga de diámetro igual, familia D en PP natural: cuerpo translúcido, dos anillos de tope y extremos iguales; foto de referencia de la familia",
    straightEqualGroupDark: "Familia C/D de racores rectos de espiga de diámetro igual: seis piezas de PA blanco y PP natural sobre tela oscura; foto de materiales mixtos",
    straightEqualGroupBlue: "Familia C/D de racores rectos de espiga de diámetro igual: seis piezas de PA blanco y PP natural sobre tela azul; foto de materiales mixtos",
    tee: "Racores de espiga en T de diámetro igual: tres conectores translúcidos de tres vías de distintos tamaños",
    teeEqualGroup: "Familia de racores de espiga en T de diámetro igual: siete conectores blancos y translúcidos sobre tela gris oscura, cada uno con tres bocas iguales",
    teeEqualPaCompact: "Familia de racores pequeños en T de PA blanco marfil de diámetro igual: cuerpo redondeado compacto y tres extremos iguales",
    teeEqualPaSquareFront: "Vista frontal de la familia de racores en T de PA blanco marfil de diámetro igual: centro cuadrado, superficie circular moldeada y tres extremos iguales",
    teeEqualPaSquareDetail: "Detalle de la familia de racores en T de PA blanco marfil de diámetro igual: marca moldeada, cuerpo cuadrado, perfiles de espiga y tres bocas iguales",
    teeReducing: "Racores reductores de espiga en T: dos conectores blancos con una derivación lateral de menor diámetro",
    teeAbbPaFront: "Familia de racores reductores ABB en T de PA blanco marfil: ramal perpendicular menor y dos bocas axiales iguales de mayor diámetro",
    teeAbbPaDetail: "Detalle de la familia de racores ABB en T de PA blanco marfil: ramal perpendicular menor, extremos axiales mayores y marca central moldeada",
    teeAabPaFront: "Familia de racores reductores AAB en T de PA blanco marfil: ramal perpendicular igual a una boca axial y la otra boca axial menor",
    teeAabGroup: "Familia de racores reductores AAB en T: dos conectores translúcidos y tres blancos, cada uno con una boca axial lateral menor",
    elbow: "Familia de racores de espiga en L: siete codos blancos y translúcidos de distintos tamaños",
    elbowReducingGroup: "Familia de codos reductores de espiga: un conector translúcido y dos blancos sobre tela negra",
    elbowReducingPpBlack: "Codo reductor de espiga de PP natural: conector translúcido con extremos de distinto diámetro sobre tela negra",
    elbowReducingPpBlue: "Detalle de un codo reductor de espiga de PP natural: conector translúcido y bocas de distinto diámetro sobre tela azul",
    elbowEqualPaSide: "Foto de la familia de codos de espiga de PA blanco marfil de diámetro igual: vista lateral del cuerpo redondeado y dos extremos sobre tela azul",
    elbowEqualPaRear: "Foto de la familia de codos de espiga de PA blanco marfil de diámetro igual: vista posterior del codo redondeado y sus dos espigas",
    elbowEqualPaSquare: "Detalle de la familia de codos de espiga de PA blanco marfil de diámetro igual: cuerpo central cuadrado, marca moldeada y dos extremos",
    straight: "Racores reductores de espiga rectos: nueve conectores blancos y translúcidos de diámetros diferentes sobre fondo negro liso",
    reducerBlack: "Racores reductores de espiga rectos sobre tela negra: nueve conectores blancos y translúcidos en grupos diagonales",
    reducerCloseup: "Detalle de los extremos de racores reductores rectos: conectores blancos y translúcidos con bocas de distinto diámetro sobre tela negra",
    reducerBlue: "Serie de racores reductores de espiga rectos: nueve conectores blancos y translúcidos alineados sobre tela azul",
    y: "Familia de racores de espiga en Y: seis conectores de tres vías blancos y translúcidos de distintos tamaños",
    yEqualDark: "Familia de racores de espiga en Y de diámetro igual: seis conectores blancos y translúcidos sobre tela gris oscura",
    yReducingGroup: "Familia de racores reductores de espiga en Y: dos conectores translúcidos y uno blanco con boca principal mayor y dos ramales menores",
    yReducingDetails: "Grupo de tres racores reductores de espiga en Y: conectores translúcidos y blancos separados de una foto de familia mixta",
    yReducingPaSide: "Familia de racores reductores de espiga en Y de PA blanco marfil: vista lateral de la conexión principal mayor y dos ramales menores",
    yReducingPaPort: "Detalle de la boca de un racor reductor de espiga en Y de PA blanco marfil: espiga, borde y orificio del extremo mayor",
    combined: "Racores de espiga de cuatro vías: tres conectores en forma de pi a la izquierda y dos cruces a la derecha",
    cross: "Racores de espiga en cruz de cuatro vías: dos tamaños de conectores translúcidos colocados lado a lado",
    pi: "Racores de espiga de cuatro vías en forma de pi: tres tamaños de conectores translúcidos en disposición vertical",
  },
  fr: {
    straightEqualPaSide: "Raccord cannelé droit à diamètre égal, gamme C/D en PA blanc : vue latérale, deux bagues de butée et zone centrale moulée ; photo de référence de la gamme",
    straightEqualPaDetail: "Raccord cannelé droit à diamètre égal, gamme C/D en PA blanc : marque centrale moulée et profils cannelés ; photo de référence de la gamme",
    straightEqualPpCompact: "Raccord cannelé droit à diamètre égal, gamme C en PP naturel : corps translucide fin et embouts coniques ; photo de référence de la gamme",
    straightEqualPpSide: "Raccord cannelé droit à diamètre égal, gamme D en PP naturel : corps translucide, deux bagues de butée et embouts égaux ; photo de référence de la gamme",
    straightEqualGroupDark: "Gamme C/D de raccords cannelés droits à diamètre égal : six pièces en PA blanc et PP naturel sur tissu sombre ; photo de plusieurs matériaux",
    straightEqualGroupBlue: "Gamme C/D de raccords cannelés droits à diamètre égal : six pièces en PA blanc et PP naturel sur tissu bleu ; photo de plusieurs matériaux",
    tee: "Raccords cannelés en T à diamètre égal : trois raccords translucides à trois voies de différentes tailles",
    teeEqualGroup: "Gamme de raccords cannelés en T à diamètre égal : sept raccords ivoire et translucides sur tissu gris foncé, chacun avec trois embouts égaux",
    teeEqualPaCompact: "Gamme de petits raccords en T à diamètre égal en PA ivoire : corps arrondi compact et trois embouts de même diamètre",
    teeEqualPaSquareFront: "Vue de face de la gamme de raccords en T à diamètre égal en PA ivoire : centre carré, surface circulaire moulée et trois embouts égaux",
    teeEqualPaSquareDetail: "Gros plan de la gamme de raccords en T à diamètre égal en PA ivoire : marque moulée, corps carré, profils cannelés et trois embouts égaux",
    teeReducing: "Raccords cannelés réducteurs en T : deux raccords blancs avec une dérivation latérale de plus petit diamètre",
    teeAbbPaFront: "Gamme de raccords réducteurs ABB en T en PA ivoire : petite branche perpendiculaire et deux embouts axiaux égaux plus grands",
    teeAbbPaDetail: "Détail de la gamme de raccords ABB en T en PA ivoire : petite branche perpendiculaire, grands embouts axiaux et marque centrale moulée",
    teeAabPaFront: "Gamme de raccords réducteurs AAB en T en PA ivoire : branche perpendiculaire égale à un embout axial, autre embout axial plus petit",
    teeAabGroup: "Gamme de raccords réducteurs AAB en T : deux raccords translucides et trois ivoire, chacun avec un embout axial latéral plus petit",
    elbow: "Gamme de raccords cannelés coudés : sept raccords à angle droit blancs et translucides",
    elbowReducingGroup: "Gamme de raccords cannelés coudés réducteurs : un raccord translucide et deux blancs sur tissu noir",
    elbowReducingPpBlack: "Raccord cannelé coudé réducteur en PP naturel : raccord translucide à extrémités de diamètres différents sur tissu noir",
    elbowReducingPpBlue: "Gros plan d'un raccord cannelé coudé réducteur en PP naturel : raccord translucide et embouts de diamètres différents sur tissu bleu",
    elbowEqualPaSide: "Photo de la gamme de raccords cannelés coudés à diamètre égal en PA ivoire : vue latérale du coude arrondi et des deux embouts sur tissu bleu",
    elbowEqualPaRear: "Photo de la gamme de raccords cannelés coudés à diamètre égal en PA ivoire : vue arrière du coude arrondi et de ses deux embouts",
    elbowEqualPaSquare: "Détail de la gamme de raccords cannelés coudés à diamètre égal en PA ivoire : corps central carré, marque moulée et deux embouts",
    straight: "Raccords cannelés réducteurs droits : neuf raccords blancs et translucides à diamètres différents sur fond noir uni",
    reducerBlack: "Raccords cannelés réducteurs droits sur tissu noir : neuf raccords blancs et translucides disposés en groupes diagonaux",
    reducerCloseup: "Gros plan des embouts de raccords réducteurs droits : raccords blancs et translucides à extrémités de diamètres différents sur tissu noir",
    reducerBlue: "Gamme de raccords cannelés réducteurs droits : neuf raccords blancs et translucides alignés sur tissu bleu",
    y: "Gamme de raccords cannelés en Y : six raccords à trois voies blancs et translucides de différentes tailles",
    yEqualDark: "Gamme de raccords cannelés en Y à diamètre égal : six raccords blancs et translucides sur tissu gris foncé",
    yReducingGroup: "Gamme de raccords cannelés réducteurs en Y : deux raccords translucides et un blanc à embout principal plus grand et deux branches plus petites",
    yReducingDetails: "Groupe de trois raccords cannelés réducteurs en Y : raccords translucides et blancs séparés d'une photo de gamme mixte",
    yReducingPaSide: "Gamme de raccords cannelés réducteurs en Y en PA ivoire : vue latérale du grand embout principal et des deux petites branches",
    yReducingPaPort: "Gros plan d'un raccord cannelé réducteur en Y en PA ivoire : cannelure, bord et alésage du grand embout",
    combined: "Raccords cannelés à quatre voies : trois raccords en forme de pi à gauche et deux croix à droite",
    cross: "Raccords cannelés en croix à quatre voies : deux tailles de raccords translucides présentées côte à côte",
    pi: "Raccords cannelés à quatre voies en forme de pi : trois tailles de raccords translucides disposées verticalement",
  },
  ko: {
    straightEqualPaSide: "흰색 PA C/D 계열 등경 일자 바브 피팅: 두 스토퍼 링, 중앙 성형면과 같은 지름의 호스 연결부를 보여 주는 측면 제품군 참고 사진",
    straightEqualPaDetail: "흰색 PA C/D 계열 등경 일자 바브 피팅: 중앙 성형 표시와 양쪽 바브 형상을 보여 주는 제품군 참고 사진",
    straightEqualPpCompact: "천연색 PP C 계열 등경 일자 바브 피팅: 가늘고 반투명한 몸체와 양쪽 테이퍼 연결부를 보여 주는 제품군 참고 사진",
    straightEqualPpSide: "천연색 PP D 계열 등경 일자 바브 피팅: 반투명 몸체, 두 스토퍼 링과 같은 지름의 호스 연결부를 보여 주는 제품군 참고 사진",
    straightEqualGroupDark: "C/D 계열 등경 일자 바브 피팅: 어두운 천 위 흰색 PA와 천연색 PP 피팅 여섯 개의 혼합 소재 제품군 사진",
    straightEqualGroupBlue: "C/D 계열 등경 일자 바브 피팅: 파란 천 위 흰색 PA와 천연색 PP 피팅 여섯 개의 혼합 소재 제품군 사진",
    tee: "등경 T형 바브 피팅 사진: 크기가 다른 반투명 3방향 커넥터 3종",
    teeEqualGroup: "등경 T형 바브 피팅 제품군 사진: 짙은 회색 천 위에 각 3개의 동일 직경 포트를 갖춘 유백색 및 반투명 커넥터 7종",
    teeEqualPaCompact: "유백색 PA 소형 등경 T형 바브 피팅 제품군 사진: 작은 둥근 몸체와 직경이 같은 호스 연결부 3개",
    teeEqualPaSquareFront: "유백색 PA 등경 T형 바브 피팅 제품군 정면 사진: 사각 중앙 몸체, 원형 성형 면과 동일 직경 연결부 3개",
    teeEqualPaSquareDetail: "유백색 PA 등경 T형 바브 피팅 제품군 확대 사진: 중앙 성형 표시, 사각 몸체, 바브 윤곽과 동일 직경 포트 3개",
    teeReducing: "이경 T형 바브 피팅 사진: 측면 분기 직경이 더 작은 흰색 커넥터 2종",
    teeAbbPaFront: "유백색 PA ABB 이경 T형 바브 피팅 제품군 정면 사진: 작은 수직 분기와 직경이 같은 두 큰 직선 연결부",
    teeAbbPaDetail: "유백색 PA ABB 이경 T형 바브 피팅 제품군 상세 사진: 작은 수직 분기, 큰 직선 연결부와 중앙 성형 표시",
    teeAabPaFront: "유백색 PA AAB 이경 T형 바브 피팅 제품군 사진: 수직 분기와 한쪽 직선 연결부의 직경이 같고 반대쪽 연결부는 작음",
    teeAabGroup: "AAB 이경 T형 바브 피팅 제품군 사진: 한쪽 직선 연결부가 작은 반투명 커넥터 2종과 유백색 커넥터 3종",
    elbow: "L형 바브 피팅 제품군 사진: 크기가 다른 흰색 및 반투명 직각 피팅 7종",
    elbowReducingGroup: "L형 이경 바브 피팅 제품군 사진: 검은 천 위 반투명 커넥터 1종과 유백색 커넥터 2종",
    elbowReducingPpBlack: "천연색 PP L형 이경 바브 피팅: 검은 천 위 반투명 직각 커넥터의 대경 및 소경 호스 연결부",
    elbowReducingPpBlue: "천연색 PP L형 이경 바브 피팅 확대 사진: 파란 천 위 반투명 커넥터와 직경이 다른 포트",
    elbowEqualPaSide: "유백색 PA 등경 L형 바브 피팅 제품군 사진: 파란 천 위 둥근 엘보의 측면과 두 호스 연결부",
    elbowEqualPaRear: "유백색 PA 등경 L형 바브 피팅 제품군 사진: 둥근 엘보의 뒷면과 양쪽 바브 구조",
    elbowEqualPaSquare: "유백색 PA 등경 L형 바브 피팅 제품군 확대 사진: 사각 중앙 몸체, 성형 표시와 두 호스 연결부",
    straight: "일자형 이경 바브 피팅 사진: 검은 단색 배경의 흰색 및 반투명 직경 변환 커넥터 9종",
    reducerBlack: "검은 천 위의 일자형 이경 바브 피팅: 대각선 그룹으로 배열된 흰색 및 반투명 커넥터 9종",
    reducerCloseup: "일자형 이경 바브 피팅 포트 확대 사진: 검은 천 위 흰색 및 반투명 커넥터의 대경 및 소경 끝단",
    reducerBlue: "일자형 이경 바브 피팅 제품군: 파란 천 위에 가로로 배열된 흰색 및 반투명 커넥터 9종",
    y: "Y형 바브 피팅 제품군 사진: 크기가 다른 흰색 및 반투명 3방향 커넥터 6종",
    yEqualDark: "Y형 등경 바브 피팅 제품군 사진: 짙은 회색 천 위 유백색 및 반투명 커넥터 6종",
    yReducingGroup: "Y형 이경 바브 피팅 제품군 사진: 주 연결부가 두 분기보다 큰 반투명 커넥터 2종과 유백색 커넥터 1종",
    yReducingDetails: "Y형 이경 바브 피팅 3종 사진: 혼합 제품군 사진에서 분리한 반투명 및 유백색 이경 커넥터",
    yReducingPaSide: "유백색 PA Y형 이경 바브 피팅 제품군 사진: 큰 주 호스 연결부와 작은 두 분기의 측면",
    yReducingPaPort: "유백색 PA Y형 이경 바브 피팅 포트 확대 사진: 큰 호스 연결부의 바브, 가장자리 및 내경",
    combined: "4방향 바브 피팅 모음: 왼쪽의 Π형 커넥터 3종과 오른쪽의 십자형 커넥터 2종",
    cross: "십자형 4방향 바브 피팅 사진: 서로 다른 크기의 반투명 커넥터 2종을 나란히 배치",
    pi: "Π형 4방향 바브 피팅 사진: 서로 다른 크기의 반투명 커넥터 3종을 세로로 배치",
  },
  ru: {
    straightEqualPaSide: "Прямой равнопроходный штуцер серии C/D из белого PA: вид сбоку, два упорных кольца, центральная литая площадка и равные концы; обзорное фото серии",
    straightEqualPaDetail: "Прямой равнопроходный штуцер серии C/D из белого PA: литая центральная маркировка и профили выступов; обзорное фото серии",
    straightEqualPpCompact: "Прямой равнопроходный штуцер серии C из PP натурального цвета: тонкий полупрозрачный корпус и конические концы; обзорное фото серии",
    straightEqualPpSide: "Прямой равнопроходный штуцер серии D из PP натурального цвета: полупрозрачный корпус, два упорных кольца и равные концы; обзорное фото серии",
    straightEqualGroupDark: "Прямые равнопроходные штуцеры серии C/D: шесть деталей из белого PA и PP натурального цвета на тёмной ткани; фото серии из разных материалов",
    straightEqualGroupBlue: "Прямые равнопроходные штуцеры серии C/D: шесть деталей из белого PA и PP натурального цвета на синей ткани; фото серии из разных материалов",
    tee: "Равнопроходные Т-образные штуцеры «ёлочка»: три полупрозрачных трёхходовых соединителя разных размеров",
    teeEqualGroup: "Серия равнопроходных Т-образных штуцеров: семь молочно-белых и полупрозрачных соединителей на тёмно-серой ткани, каждый с тремя одинаковыми концами",
    teeEqualPaCompact: "Серия малых равнопроходных Т-образных штуцеров из PA цвета слоновой кости: компактный скруглённый корпус и три конца одинакового диаметра",
    teeEqualPaSquareFront: "Серия равнопроходных Т-образных штуцеров из PA цвета слоновой кости, вид спереди: квадратный центр, круглая литая площадка и три одинаковых конца",
    teeEqualPaSquareDetail: "Крупный план серии равнопроходных Т-образных штуцеров из PA цвета слоновой кости: литая маркировка, квадратный корпус, профиль выступов и три одинаковых конца",
    teeReducing: "Переходные Т-образные штуцеры «ёлочка»: два белых соединителя с боковым отводом меньшего диаметра",
    teeAbbPaFront: "Серия переходных Т-образных штуцеров ABB из PA цвета слоновой кости: малый перпендикулярный отвод и два равных больших соосных конца",
    teeAbbPaDetail: "Деталь серии Т-образных штуцеров ABB из PA цвета слоновой кости: малый перпендикулярный отвод, большие соосные концы и литая центральная маркировка",
    teeAabPaFront: "Серия переходных Т-образных штуцеров AAB из PA цвета слоновой кости: перпендикулярный отвод равен одному соосному концу, другой соосный конец меньше",
    teeAabGroup: "Серия переходных Т-образных штуцеров AAB: два полупрозрачных и три молочно-белых соединителя, каждый с одним меньшим соосным боковым концом",
    elbow: "Серия угловых штуцеров «ёлочка»: семь белых и полупрозрачных соединителей под прямым углом",
    elbowReducingGroup: "Серия угловых переходных штуцеров «ёлочка»: один полупрозрачный и два молочно-белых соединителя на чёрной ткани",
    elbowReducingPpBlack: "Угловой переходной штуцер из PP натурального цвета: полупрозрачный соединитель с концами разных диаметров на чёрной ткани",
    elbowReducingPpBlue: "Крупный план углового переходного штуцера из PP натурального цвета: полупрозрачный соединитель с отверстиями разных диаметров на синей ткани",
    elbowEqualPaSide: "Фото серии равнопроходных угловых штуцеров из PA цвета слоновой кости: скруглённый корпус сбоку и два конца на синей ткани",
    elbowEqualPaRear: "Фото серии равнопроходных угловых штуцеров из PA цвета слоновой кости: скруглённый корпус сзади и оба штуцерных конца",
    elbowEqualPaSquare: "Крупный план серии равнопроходных угловых штуцеров из PA цвета слоновой кости: квадратный центральный корпус, литая маркировка и два конца",
    straight: "Прямые переходные штуцеры «ёлочка»: девять белых и полупрозрачных соединителей разных диаметров на чёрном фоне",
    reducerBlack: "Прямые переходные штуцеры «ёлочка» на чёрной ткани: девять белых и полупрозрачных соединителей в диагональных группах",
    reducerCloseup: "Крупный план концов прямых переходных штуцеров: белые и полупрозрачные соединители с большим и малым диаметрами на чёрной ткани",
    reducerBlue: "Серия прямых переходных штуцеров «ёлочка»: девять белых и полупрозрачных соединителей в ряд на синей ткани",
    y: "Серия Y-образных штуцеров «ёлочка»: шесть белых и полупрозрачных трёхходовых соединителей разных размеров",
    yEqualDark: "Серия равнопроходных Y-образных штуцеров: шесть молочно-белых и полупрозрачных соединителей на тёмно-серой ткани",
    yReducingGroup: "Серия переходных Y-образных штуцеров: два полупрозрачных и один молочно-белый соединитель с большим основным концом и двумя меньшими отводами",
    yReducingDetails: "Три переходных Y-образных штуцера: полупрозрачные и молочно-белые соединители, выделенные из общей фотографии серии",
    yReducingPaSide: "Серия переходных Y-образных штуцеров из PA цвета слоновой кости: вид сбоку на большой основной конец и два меньших отвода",
    yReducingPaPort: "Крупный план переходного Y-образного штуцера из PA цвета слоновой кости: выступ, край и отверстие большого конца",
    combined: "Четырёхходовые штуцеры «ёлочка»: три П-образных соединителя слева и два крестовых справа",
    cross: "Крестовые четырёхходовые штуцеры «ёлочка»: два полупрозрачных соединителя разных размеров рядом",
    pi: "П-образные четырёхходовые штуцеры «ёлочка»: три полупрозрачных соединителя разных размеров по вертикали",
  },
};

export function getBarbedFittingImageAlt(src: string, locale: string): string | undefined {
  const key = (Object.keys(photos) as PhotoKey[]).find((item) => imageRoot + photos[item] === src);
  if (!key) return undefined;
  const language = Object.prototype.hasOwnProperty.call(imageAlts, locale) ? locale as PhotoLocale : "zh";
  return imageAlts[language][key];
}

export function getBarbedFittingGallery(product: Record<string, unknown>): {
  additionalImages?: string[];
  additionalImageAlts?: string[];
} {
  if (product.productTypeId !== "barbed-fittings") return {};
  const productName = String(product.productName || product.name || "");
  const familyKeys = productPhotos[productName];
  if (!familyKeys) return {};
  const keys: PhotoKey[] = [...familyKeys];
  // These two single-product photos are from the PP reducer source set.
  // Share the mixed group across the L-reducer family, but keep translucent
  // PP-only photos off the white PA models and all equal-bore elbow pages.
  const model = String(product.model || product.modelDisplay || product.slug || "").toUpperCase();
  // FIT catalog p. 28 distinguishes C/D straight bodies from F barb profiles.
  // Use the supplied single photos only for matching body shapes and materials.
  // These family views do not establish a photographed part's exact bore.
  if (productName === "直通等径倒刺接头") {
    const matchedPhotos: Record<string, readonly PhotoKey[]> = {
      "BA-16C-PP-N": ["straightEqualPpCompact"],
      "BA-24D-PP-N": ["straightEqualPpSide"],
      "BA-32D-PP-N": ["straightEqualPpSide"],
      "BA-64C-PP-N": [],
      "BA-16C-PA-W": [],
      "BA-24D-PA-W": [],
      "BA-32D-PA-W": ["straightEqualPaSide", "straightEqualPaDetail"],
      "BA-64C-PA-W": ["straightEqualPaSide", "straightEqualPaDetail"],
    };
    const matched = matchedPhotos[model];
    if (!matched) return {};
    keys.push(...matched, "straightEqualGroupDark", "straightEqualGroupBlue");
  }

  // Catalog pp. 29–30 separates the C/D/V/X lineup from F barb profiles.
  // Match the native photo layers against the current individual model views:
  // the compact PA photo belongs to the small D family; the square-body
  // PA views belong to 40C/64C. Do not infer a photographed bore size.
  if (productName === "T型等径倒刺接头") {
    if (/^BT-(16D|24D|32D|40C|64C|95X)-(PP-N|PA-W)$/.test(model) || model === "BT-127V-PP-N") {
      if (/^BT-(16|24|32)D-PA-W$/.test(model)) {
        keys.push("teeEqualPaCompact");
      } else if (/^BT-(40|64)C-PA-W$/.test(model)) {
        keys.push("teeEqualPaSquareFront", "teeEqualPaSquareDetail");
      }
      keys.push("teeEqualGroup");
      // The earlier three-piece photograph contains only translucent PP.
      if (model.endsWith("-PP-N")) keys.push("tee");
    }
  }
  // FIT catalog p. 30: port 1 is the perpendicular branch, ports 2 and 3
  // are the opposed inline ends. ABB alone is insufficient: these white
  // photos show a SMALLER branch, not the reverse (larger branch) geometry.
  // The unmeasured photos supplement the model main image as family views.
  if (productName === "T型异径倒刺接头") {
    const smallerBranchPaModels = [
      "BT-16D-24D-24D-PA-W",
      "BT-16D-32D-32D-PA-W",
      "BT-24D-32D-32D-PA-W",
      "BT-32D-64T-64T-PA-W",
      "BT-64V-95V-95V-PA-W",
    ];
    const smallerInlineFamilies = [
      "BT-24D-24D-16D",
      "BT-32D-32D-16D",
      "BT-32D-32D-24D",
      "BT-64D-64D-32D",
    ];
    if (smallerBranchPaModels.includes(model)) {
      keys.push("teeAbbPaFront", "teeAbbPaDetail", "teeReducing");
    } else if (smallerInlineFamilies.some((family) => model === `${family}-PA-W`)) {
      keys.push("teeAabPaFront", "teeAabGroup");
    } else if (smallerInlineFamilies.some((family) => model === `${family}-PP-N`)) {
      keys.push("teeAabGroup");
    }
  }
  if (productName === "L型异径倒刺接头" && model.endsWith("-PP-N")) {
    keys.push("elbowReducingPpBlack", "elbowReducingPpBlue");
  }
  // Catalog p. 31 distinguishes equal-bore Y fittings from reducing Y fittings.
  // The mixed source photo is split accordingly. Ivory single-product views
  // belong only to the PA reducers, not to translucent PP or equal-bore models.
  if (productName === "Y型异径倒刺接头" && model.endsWith("-PA-W")) {
    keys.push("yReducingPaSide", "yReducingPaPort");
  }
  // Match the PA photo set to the current model images and catalog p. 27.
  // The small D models have a rounded elbow; the F models have a square body.
  // These are structural family views, not proof of a photographed bore size.
  // BL-95D has different proportions, so do not infer a match from "D" alone.
  if (productName === "L型等径倒刺接头") {
    if (/^BL-(16|24|32)D-PA-W$/.test(model)) {
      keys.push("elbowEqualPaSide", "elbowEqualPaRear");
    } else if (/^BL-(16|24|32|40|64)F-PA-W$/.test(model)) {
      keys.push("elbowEqualPaSquare");
    }
  }

  const existingImages = Array.isArray(product.additionalImages) ? product.additionalImages : [];
  const existingAlts = Array.isArray(product.additionalImageAlts) ? product.additionalImageAlts : [];
  const additionalImages: string[] = [];
  const additionalImageAlts: string[] = [];
  existingImages.forEach((image, index) => {
    if (typeof image !== "string" || !image || additionalImages.includes(image)) return;
    // Also remove a stale broad T-reducer assignment if a caller supplies a
    // gallery enriched by the previous routing. Preserve unrelated images.
    if (productName === "T型异径倒刺接头") {
      const teeKeys: PhotoKey[] = ["teeReducing", "teeAbbPaFront", "teeAbbPaDetail", "teeAabPaFront", "teeAabGroup"];
      const ownedKey = teeKeys.find((key) => image === imageRoot + photos[key]);
      if (ownedKey && !keys.includes(ownedKey)) return;
    }
    if (productName === "T型等径倒刺接头") {
      const teeKeys: PhotoKey[] = ["tee", "teeEqualGroup", "teeEqualPaCompact", "teeEqualPaSquareFront", "teeEqualPaSquareDetail"];
      const ownedKey = teeKeys.find((key) => image === imageRoot + photos[key]);
      if (ownedKey && !keys.includes(ownedKey)) return;
    }
    if (productName === "直通等径倒刺接头") {
      const ownedKeys: PhotoKey[] = ["straightEqualPaSide", "straightEqualPaDetail", "straightEqualPpCompact", "straightEqualPpSide", "straightEqualGroupDark", "straightEqualGroupBlue"];
      if (ownedKeys.some((key) => image === imageRoot + photos[key])) return;
    }
    additionalImages.push(image);
    additionalImageAlts.push(typeof existingAlts[index] === "string" ? existingAlts[index] : "");
  });
  for (const key of keys) {
    const src = imageRoot + photos[key];
    if (additionalImages.includes(src)) continue;
    additionalImages.push(src);
    additionalImageAlts.push(imageAlts.zh[key]);
  }
  return { additionalImages, additionalImageAlts };
}
