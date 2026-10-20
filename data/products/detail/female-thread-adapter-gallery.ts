import { getDescriptiveFittingImageUrl } from "./fitting-image-description";

const imageRoot = "/images/products/fittings/female-thread-adapters/photos/";

const photos = {
  group: "u-us-two-way-female-thread-adapter-family-group-angle.webp",
  blackPair: "u-us-two-way-female-thread-adapter-black-pair.webp",
  lineup: "u-us-two-way-female-thread-adapter-family-lineup.webp",
  utNatural: "ut-u28-tee-female-thread-adapter-natural-single.webp",
  utBlack: "ut-u28-tee-female-thread-adapter-black-single.webp",
  utBlackFront: "ut-u28-tee-female-thread-adapter-black-front-detail.webp",
  utPair: "ut-u28-tee-female-thread-adapter-natural-black-pair.webp",
  uySingle: "uy-u28-y-female-thread-adapter-natural-single.webp",
  uyGroup: "uy-u28-y-female-thread-adapter-natural-group.webp",
  uyLineup: "uy-u28-y-female-thread-adapter-natural-lineup.webp",
  pmuSeparateNut: "pp-bulkhead-female-thread-union-with-separate-metal-nut.webp",
  pmuAssembled: "pp-bulkhead-female-thread-union-fitted-metal-nut-side.webp",
  pmuGroup: "pp-bulkhead-female-thread-unions-assembly-group.webp",
};

type PhotoKey = keyof typeof photos;
type PhotoLocale = "zh" | "en" | "es" | "fr" | "ko" | "ru";

// FIT catalog A02, printed p. 81 (PDF page 82): U is the standard two-way
// female-thread body; US is the square body. These mixed-family photos are
// supplementary, not evidence of a SKU's bore, thread size or black resin.
// The black-only pair belongs only on black U/US models. PMU bulkhead and
// UT/UY three-way fittings are excluded from the U/US photographs.
const familyPhotos: readonly PhotoKey[] = ["group", "lineup"];
const blackPhotos: readonly PhotoKey[] = ["blackPair", "group", "lineup"];
const modelPhotos: Record<string, readonly PhotoKey[]> = {
  "US-M6-05-AC-B": blackPhotos,
  "US-M6-10-AC-B": blackPhotos,
  "US-M6-15-AC-B": blackPhotos,
  "US-M6-05-PP-N": familyPhotos,
  "US-M6-10-PP-N": familyPhotos,
  "US-M6-15-PP-N": familyPhotos,
  "U-U28-20-PP-N": familyPhotos,
  "U-U28-20-AC-B": blackPhotos,
  "U-U28-20-PS-B": blackPhotos,
  "U-M6-20-PP-N": familyPhotos,
  "U-M6-20-AC-B": blackPhotos,
  // FIT catalog A02, printed p. 82 (PDF page 83): UT-U28 is the T-shaped
  // three-way body with two mounting eyelets. Natural and black photos are
  // assigned by color; neither photograph establishes the 1.5/2.0 mm bore.
  // UT-M6 lacks a matching catalog/model image and is deliberately excluded.
  "UT-U28-15-PP-N": ["utNatural", "utPair"],
  "UT-U28-20-PP-N": ["utNatural", "utPair"],
  "UT-U28-15-PS-B": ["utBlack", "utBlackFront", "utPair"],
  "UT-U28-20-PS-B": ["utBlack", "utBlackFront", "utPair"],
  // FIT catalog A02, printed p. 82 (PDF page 83): UY-U28 is the PP Y-shaped
  // three-way body with two mounting eyelets. These are family photographs;
  // the visible shape cannot establish the 1.0/1.5/2.0 mm internal bore.
  "UY-U28-10-PP-N": ["uySingle", "uyGroup", "uyLineup"],
  "UY-U28-15-PP-N": ["uySingle", "uyGroup", "uyLineup"],
  "UY-U28-20-PP-N": ["uySingle", "uyGroup", "uyLineup"],
  // PMU has female fluid ports and an external panel-mounting thread.
  // Match the natural PP body and flange; the metal nut is shown as photographed.
  "PMU-M12-U28-20-PP-N": ["pmuSeparateNut", "pmuAssembled", "pmuGroup"],
};

const imageAlts: Record<PhotoLocale, Record<PhotoKey, string>> = {
  zh: {
    pmuSeparateNut: "PMU 穿板二通内螺纹接头 PP 本色实拍：接头与分开放置的金属六角螺母，展示内螺纹接口及外侧安装螺纹",
    pmuAssembled: "PMU 穿板二通内螺纹接头 PP 本色装配侧视图：金属六角螺母旋在外侧安装螺纹上",
    pmuGroup: "PMU 穿板二通内螺纹接头 PP 本色组合实拍：三个接头与金属螺母，展示内螺纹接口、外侧安装螺纹及装配状态",
    group: "U 标准型与 US 方型二通内螺纹接头系列合照：灰色背景上四只黑色及半透明接头，展示本体和内螺纹；非当前型号的专属实拍",
    blackPair: "U 标准型与 US 方型二通内螺纹接头系列对照图：灰色背景上两只黑色接头，展示带筋本体、方形本体和内螺纹；非当前型号的专属实拍",
    lineup: "U 标准型与 US 方型二通内螺纹接头系列排列图：灰色背景上四只黑色及半透明接头，展示两种本体和内螺纹端口；非当前型号的专属实拍",
    utNatural: "UT U28 三通 T 型内螺纹接头 PP 本色系列实拍：半透明单件斜视图，展示三个内螺纹接口和两个安装孔；非特定通径型号的专属实拍",
    utBlack: "UT U28 三通 T 型内螺纹接头黑色系列实拍：单件斜视图，展示内螺纹端口和两个安装孔；非特定通径型号的专属实拍",
    utBlackFront: "UT U28 三通 T 型内螺纹接头黑色系列实拍：正面近景，展示 T 型本体与两个安装孔；非特定通径型号的专属实拍",
    utPair: "UT U28 三通 T 型内螺纹接头系列组合图：灰色背景上的半透明本色与黑色接头，展示相同的 T 型连接结构及安装孔；非单一型号的专属实拍",
    uySingle: "UY U28 三通 Y 型内螺纹接头 PP 本色系列单件实拍：半透明 Y 型本体、内螺纹端口及安装孔；非特定通径型号的专属实拍",
    uyGroup: "UY U28 三通 Y 型内螺纹接头 PP 本色系列组合实拍：五只半透明接头的不同角度，展示 Y 型本体与内螺纹；非特定通径型号的专属实拍",
    uyLineup: "UY U28 三通 Y 型内螺纹接头 PP 本色系列排列实拍：灰色背景上五只半透明接头；非特定通径型号的专属实拍",
  },
  en: {
    pmuSeparateNut: "Natural PP PMU bulkhead female-thread union beside a separate metal hex nut, showing the female fluid port and external mounting thread",
    pmuAssembled: "Natural PP PMU bulkhead female-thread union, side view with a metal hex nut fitted on the external mounting thread",
    pmuGroup: "Natural PP PMU bulkhead female-thread unions and metal nuts: three connectors showing female fluid ports, external mounting threads and assembly views",
    group: "U standard-body and US square-body two-way female-thread adapter family photo: four black and translucent fittings on gray, showing bodies and internal threads; not a model-specific photo",
    blackPair: "U standard-body and US square-body two-way female-thread adapter comparison: two black fittings on gray, showing ribbed and square bodies and internal threads; not a model-specific photo",
    lineup: "U standard-body and US square-body two-way female-thread adapter family lineup: four black and translucent fittings on gray, showing both body styles and female-thread ports; not a model-specific photo",
    utNatural: "UT U28 three-way female-thread tee fitting family in natural PP: translucent single fitting at an angle, showing three female-thread ports and two mounting holes; not specific to one bore size",
    utBlack: "UT U28 black three-way female-thread tee fitting family: angled single-fitting view showing female-thread ports and two mounting holes; not specific to one bore size",
    utBlackFront: "UT U28 black three-way female-thread tee fitting family: front close-up showing the T-shaped body and two mounting holes; not specific to one bore size",
    utPair: "UT U28 three-way female-thread tee fitting family photo: translucent natural-color and black fittings on gray, showing the same T-shaped connection and mounting holes; not a single-model photo",
    uySingle: "UY U28 three-way female-thread Y fitting family in natural PP: one translucent fitting showing the Y-shaped body, female-thread ports and mounting holes; not specific to one bore size",
    uyGroup: "UY U28 three-way female-thread Y fitting family in natural PP: five translucent fittings at different angles showing Y-shaped bodies and internal threads; not specific to one bore size",
    uyLineup: "UY U28 three-way female-thread Y fitting family in natural PP: a row of five translucent fittings on gray; not specific to one bore size",
  },
  es: {
    pmuSeparateNut: "Unión pasamuros PMU con roscas hembra en PP natural junto a una tuerca hexagonal metálica separada, con puerto hembra y rosca exterior de montaje",
    pmuAssembled: "Unión pasamuros PMU con roscas hembra en PP natural, vista lateral con tuerca hexagonal metálica en la rosca exterior de montaje",
    pmuGroup: "Uniones pasamuros PMU con roscas hembra en PP natural y tuercas metálicas: tres conectores con puertos hembra, roscas exteriores de montaje y vistas del conjunto",
    group: "Foto de la familia de adaptadores de dos vías con roscas hembra U de cuerpo estándar y US de cuerpo cuadrado: cuatro racores negros y translúcidos sobre gris, con cuerpos y roscas interiores; no es una foto específica del modelo",
    blackPair: "Comparación de adaptadores de dos vías con roscas hembra U y US: dos racores negros sobre gris, con cuerpo nervado y cuerpo cuadrado y roscas interiores; no es una foto específica del modelo",
    lineup: "Fila de adaptadores de dos vías con roscas hembra U de cuerpo estándar y US de cuerpo cuadrado: cuatro racores negros y translúcidos sobre gris, con ambos cuerpos y puertos roscados; no es una foto específica del modelo",
    utNatural: "Familia UT U28 de racores en T de tres vías con roscas hembra en PP natural: pieza translúcida en vista oblicua, tres puertos roscados y dos orificios de montaje; no corresponde a un diámetro interior específico",
    utBlack: "Familia UT U28 de racores negros en T de tres vías con roscas hembra: vista oblicua de una pieza, puertos roscados y dos orificios de montaje; no corresponde a un diámetro interior específico",
    utBlackFront: "Familia UT U28 de racores negros en T de tres vías con roscas hembra: detalle frontal del cuerpo en T y dos orificios de montaje; no corresponde a un diámetro interior específico",
    utPair: "Foto de la familia UT U28 de racores en T de tres vías con roscas hembra: piezas translúcida natural y negra sobre gris, con la misma conexión en T y orificios de montaje; no es una foto de un único modelo",
    uySingle: "Familia UY U28 de racores en Y de tres vías con roscas hembra en PP natural: una pieza translúcida, cuerpo en Y, puertos roscados y orificios de montaje; no corresponde a un diámetro interior específico",
    uyGroup: "Familia UY U28 de racores en Y de tres vías con roscas hembra en PP natural: cinco piezas translúcidas desde distintos ángulos, cuerpos en Y y roscas interiores; no corresponde a un diámetro interior específico",
    uyLineup: "Familia UY U28 de racores en Y de tres vías con roscas hembra en PP natural: fila de cinco piezas translúcidas sobre gris; no corresponde a un diámetro interior específico",
  },
  fr: {
    pmuSeparateNut: "Raccord union passe-cloison PMU à taraudages femelles en PP naturel avec écrou hexagonal métallique séparé, montrant le port femelle et le filetage extérieur de montage",
    pmuAssembled: "Raccord union passe-cloison PMU à taraudages femelles en PP naturel, vue latérale avec écrou hexagonal métallique sur le filetage extérieur de montage",
    pmuGroup: "Raccords unions passe-cloison PMU à taraudages femelles en PP naturel et écrous métalliques : trois raccords montrant les ports femelles, les filetages de montage et les assemblages",
    group: "Photo de la gamme de raccords à deux voies à taraudages femelles U à corps standard et US à corps carré : quatre raccords noirs et translucides sur fond gris, corps et taraudages visibles ; photo non spécifique au modèle",
    blackPair: "Comparaison des raccords à deux voies à taraudages femelles U et US : deux raccords noirs sur fond gris, avec corps nervuré et corps carré et taraudages visibles ; photo non spécifique au modèle",
    lineup: "Rangée de raccords à deux voies à taraudages femelles U à corps standard et US à corps carré : quatre raccords noirs et translucides sur fond gris, montrant les deux corps et les orifices taraudés ; photo non spécifique au modèle",
    utNatural: "Gamme UT U28 de raccords en T à trois voies taraudées en PP naturel : pièce translucide en vue oblique, trois orifices taraudés et deux trous de fixation ; sans attribution à un diamètre de passage précis",
    utBlack: "Gamme UT U28 de raccords noirs en T à trois voies taraudées : vue oblique d'une pièce, orifices taraudés et deux trous de fixation ; sans attribution à un diamètre de passage précis",
    utBlackFront: "Gamme UT U28 de raccords noirs en T à trois voies taraudées : gros plan de face du corps en T et des deux trous de fixation ; sans attribution à un diamètre de passage précis",
    utPair: "Photo de la gamme UT U28 de raccords en T à trois voies taraudées : pièces translucide naturelle et noire sur fond gris, même raccordement en T et trous de fixation ; photo non spécifique à un seul modèle",
    uySingle: "Gamme UY U28 de raccords en Y à trois voies taraudées en PP naturel : une pièce translucide, corps en Y, orifices taraudés et trous de fixation ; sans attribution à un diamètre de passage précis",
    uyGroup: "Gamme UY U28 de raccords en Y à trois voies taraudées en PP naturel : cinq pièces translucides sous différents angles, corps en Y et taraudages ; sans attribution à un diamètre de passage précis",
    uyLineup: "Gamme UY U28 de raccords en Y à trois voies taraudées en PP naturel : rangée de cinq pièces translucides sur fond gris ; sans attribution à un diamètre de passage précis",
  },
  ko: {
    pmuSeparateNut: "천연색 PP PMU 벌크헤드 암나사 유니온과 분리된 금속 육각 너트: 유체 연결용 암나사 포트와 외부 설치용 나사산",
    pmuAssembled: "천연색 PP PMU 벌크헤드 암나사 유니온 측면: 외부 설치용 나사산에 금속 육각 너트를 장착한 모습",
    pmuGroup: "천연색 PP PMU 벌크헤드 암나사 유니온 세 개와 금속 너트: 암나사 포트, 외부 설치용 나사산 및 조립 상태",
    group: "U 표준 몸체 및 US 사각 몸체 양방향 암나사 어댑터 제품군 사진: 회색 배경 위 검은색 및 반투명 피팅 네 개의 몸체와 내부 나사산을 보여 주며 특정 모델 전용 사진이 아닙니다",
    blackPair: "U 표준 몸체 및 US 사각 몸체 양방향 암나사 어댑터 비교 사진: 회색 배경 위 검은색 피팅 두 개의 리브 몸체, 사각 몸체와 내부 나사산을 보여 주며 특정 모델 전용 사진이 아닙니다",
    lineup: "U 표준 몸체 및 US 사각 몸체 양방향 암나사 어댑터 제품군 배열 사진: 회색 배경 위 검은색 및 반투명 피팅 네 개의 두 가지 몸체와 암나사 포트를 보여 주며 특정 모델 전용 사진이 아닙니다",
    utNatural: "천연색 PP UT U28 3방향 암나사 T 피팅 제품군 사진: 반투명 단품 사선 뷰의 암나사 포트 세 개와 장착 구멍 두 개를 보여 주며 특정 내경 전용 사진이 아닙니다",
    utBlack: "검은색 UT U28 3방향 암나사 T 피팅 제품군 사진: 단품 사선 뷰의 암나사 포트와 장착 구멍 두 개를 보여 주며 특정 내경 전용 사진이 아닙니다",
    utBlackFront: "검은색 UT U28 3방향 암나사 T 피팅 제품군 사진: T자 몸체와 장착 구멍 두 개의 정면 근접 사진이며 특정 내경 전용 사진이 아닙니다",
    utPair: "UT U28 3방향 암나사 T 피팅 제품군 사진: 회색 배경 위 천연색 반투명 및 검은색 피팅의 같은 T자 연결 구조와 장착 구멍을 보여 주며 단일 모델 전용 사진이 아닙니다",
    uySingle: "천연색 PP UY U28 3방향 암나사 Y 피팅 제품군 사진: 반투명 단품의 Y자 몸체, 암나사 포트와 장착 구멍을 보여 주며 특정 내경 전용 사진이 아닙니다",
    uyGroup: "천연색 PP UY U28 3방향 암나사 Y 피팅 제품군 사진: 반투명 피팅 다섯 개의 다양한 각도에서 Y자 몸체와 내부 나사산을 보여 주며 특정 내경 전용 사진이 아닙니다",
    uyLineup: "천연색 PP UY U28 3방향 암나사 Y 피팅 제품군 사진: 회색 배경에 반투명 피팅 다섯 개가 나란히 놓여 있으며 특정 내경 전용 사진이 아닙니다",
  },
  ru: {
    pmuSeparateNut: "Проходная муфта PMU с внутренней резьбой из PP натурального цвета и отдельная металлическая шестигранная гайка: внутренний резьбовой порт и наружная монтажная резьба",
    pmuAssembled: "Проходная муфта PMU с внутренней резьбой из PP натурального цвета, вид сбоку с металлической шестигранной гайкой на наружной монтажной резьбе",
    pmuGroup: "Три проходные муфты PMU с внутренней резьбой из PP натурального цвета и металлические гайки: резьбовые порты, наружная монтажная резьба и варианты сборки",
    group: "Фото серии двухходовых соединителей с внутренней резьбой U со стандартным корпусом и US с квадратным корпусом: четыре чёрные и полупрозрачные детали на сером фоне, видны корпуса и внутренняя резьба; фото не относится к конкретной модели",
    blackPair: "Сравнение двухходовых соединителей с внутренней резьбой U и US: две чёрные детали на сером фоне, ребристый и квадратный корпуса и внутренняя резьба; фото не относится к конкретной модели",
    lineup: "Ряд двухходовых соединителей с внутренней резьбой U со стандартным корпусом и US с квадратным корпусом: четыре чёрные и полупрозрачные детали на сером фоне, оба вида корпусов и резьбовые отверстия; фото не относится к конкретной модели",
    utNatural: "Серия трёхходовых тройников UT U28 с внутренней резьбой из PP натурального цвета: полупрозрачная деталь под углом, три резьбовых порта и два монтажных отверстия; без привязки к диаметру прохода",
    utBlack: "Серия чёрных трёхходовых тройников UT U28 с внутренней резьбой: одна деталь под углом, резьбовые порты и два монтажных отверстия; без привязки к диаметру прохода",
    utBlackFront: "Серия чёрных трёхходовых тройников UT U28 с внутренней резьбой: крупный план спереди, Т-образный корпус и два монтажных отверстия; без привязки к диаметру прохода",
    utPair: "Фото серии трёхходовых тройников UT U28 с внутренней резьбой: полупрозрачная деталь натурального цвета и чёрная деталь на сером фоне, одинаковая Т-образная конструкция и монтажные отверстия; фото не относится к одной модели",
    uySingle: "Серия трёхходовых Y-образных соединителей UY U28 с внутренней резьбой из PP натурального цвета: одна полупрозрачная деталь, Y-образный корпус, резьбовые порты и монтажные отверстия; без привязки к диаметру прохода",
    uyGroup: "Серия трёхходовых Y-образных соединителей UY U28 с внутренней резьбой из PP натурального цвета: пять полупрозрачных деталей под разными углами, Y-образные корпуса и внутренняя резьба; без привязки к диаметру прохода",
    uyLineup: "Серия трёхходовых Y-образных соединителей UY U28 с внутренней резьбой из PP натурального цвета: ряд из пяти полупрозрачных деталей на сером фоне; без привязки к диаметру прохода",
  },
};

export function getFemaleThreadAdapterImageAlt(src: string, locale: string): string | undefined {
  const key = (Object.keys(photos) as PhotoKey[]).find((item) => imageRoot + photos[item] === getDescriptiveFittingImageUrl(src));
  if (!key) return undefined;
  const language = Object.prototype.hasOwnProperty.call(imageAlts, locale) ? locale as PhotoLocale : "zh";
  return imageAlts[language][key];
}

export function getFemaleThreadAdapterGallery(product: Record<string, unknown>): {
  additionalImages?: string[];
  additionalImageAlts?: string[];
} {
  if (product.productTypeId !== "female-thread-adapters") return {};
  const model = String(product.foreachModel || product.model || "").trim().toUpperCase();
  const keys = modelPhotos[model];
  if (!keys) return {};

  const additionalImages: string[] = [];
  const additionalImageAlts: string[] = [];
  const existingImages = Array.isArray(product.additionalImages) ? product.additionalImages : [];
  const existingAlts = Array.isArray(product.additionalImageAlts) ? product.additionalImageAlts : [];
  existingImages.forEach((src, index) => {
    if (typeof src !== "string" || !src || additionalImages.includes(src)) return;
    if (Object.values(photos).some((filename) => imageRoot + filename === getDescriptiveFittingImageUrl(src))) return;
    additionalImages.push(src);
    additionalImageAlts.push(typeof existingAlts[index] === "string" ? existingAlts[index] : "");
  });
  for (const key of keys) {
    additionalImages.push(imageRoot + photos[key]);
    additionalImageAlts.push(imageAlts.zh[key]);
  }
  return { additionalImages, additionalImageAlts };
}
