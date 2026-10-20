const imageRoot = "/images/products/fittings/thread-to-barbed-fittings/photos/";

const photos = {
  broadBarb: "sc-m6-pp-female-thread-to-barb-broad-port.webp",
  slimBarb: "sc-m6-pp-female-thread-to-barb-slim-port.webp",
  pair: "sc-m6-pp-female-thread-to-barb-two-angle-pair.webp",
  group: "sc-m6-pp-female-thread-to-barb-three-piece-group.webp",
  sbrSingle: "sbr-u28-pp-swivel-male-thread-to-barb-single-angle.webp",
  sbrGroup: "sbr-u28-pp-swivel-male-thread-to-barb-three-piece-group.webp",
  maleStraightGroup: "male-thread-to-barb-straight-fitting-family-group.webp",
  maleStraightLineup: "male-thread-to-barb-straight-fitting-six-piece-lineup.webp",
};

type PhotoKey = keyof typeof photos;
type PhotoLocale = "zh" | "en" | "es" | "fr" | "ko" | "ru";

// FIT catalog A02, pp. 47–48: SC-M6 has a cylindrical female-thread body;
// SC-U28 has a separate circular flange. These photographs show the M6 form.
// The broad/slim barb views match the corresponding model geometry. They are
// supplementary photographs, not dimensional evidence or replacements for the
// SKU's formal main image. Group photographs show the M6 structural family.
const modelPhotos: Record<string, readonly PhotoKey[]> = {
  "SC-M6-16-PP-N": ["slimBarb", "pair", "group"],
  "SC-M6-32-PP-N": ["broadBarb", "pair", "group"],
  // FIT catalog A02 p. 46: SBR = bottom-seal, rotating straight connector.
  // Unmarked original photos show the SBR family, not measured bore sizes.
  "SBR-U28-16-PP-N": ["sbrSingle", "sbrGroup"],
  "SBR-U28-24-PP-N": ["sbrSingle", "sbrGroup"],
  "SBR-U28-32-PP-N": ["sbrSingle", "sbrGroup"],
};

const imageAlts: Record<PhotoLocale, Record<PhotoKey, string>> = {
  zh: {
    broadBarb: "SC M6 内螺纹转倒刺接头 PP 本色系列实拍：无独立挡圈的圆筒本体、较粗倒刺及管口细节",
    slimBarb: "SC M6 内螺纹转倒刺接头 PP 本色系列实拍：无独立挡圈的圆筒本体、细倒刺及侧面结构",
    pair: "SC M6 内螺纹转倒刺接头系列组合图：黑色背景上两只 PP 本色半透明接头的不同角度",
    group: "SC M6 内螺纹转倒刺接头系列组合图：深灰背景上三只 PP 本色半透明接头及原有投影",
    sbrSingle: "SBR U28 可旋转直通外螺纹转倒刺接头系列实拍：PP 本色单件斜视图，展示外螺纹、滚花旋转环和倒刺管口",
    sbrGroup: "SBR U28 可旋转直通外螺纹转倒刺接头系列组合图：黑色背景上三只 PP 本色接头，展示不同角度的螺纹端、旋转环及倒刺端",
    maleStraightGroup: "外螺纹转倒刺直通接头系列合照：黑色背景上五只不同结构的接头，展示螺纹端、倒刺端及其中一只的密封圈；非当前型号的专属实拍",
    maleStraightLineup: "外螺纹转倒刺直通接头系列排列图：黑色背景上六只不同大小的透明及白色接头，展示螺纹端、六角本体和倒刺管口；非当前型号的专属实拍",
  },
  en: {
    broadBarb: "SC M6 female-thread-to-barb fitting family in natural PP: cylindrical body without a separate flange, broad hose barb and port detail",
    slimBarb: "SC M6 female-thread-to-barb fitting family in natural PP: cylindrical body without a separate flange, slim hose barb and side view",
    pair: "SC M6 female-thread-to-barb fitting family photo: two translucent natural PP connectors at different angles on a black background",
    group: "SC M6 female-thread-to-barb fitting family photo: three translucent natural PP connectors with their original shadows on dark gray",
    sbrSingle: "SBR U28 swivel straight male-thread-to-barb fitting family in natural PP: angled single-piece view of the male thread, knurled rotating collar and hose barb",
    sbrGroup: "SBR U28 swivel straight male-thread-to-barb fitting family photo: three natural PP connectors showing threaded ends, rotating collars and hose barbs from different angles on black",
    maleStraightGroup: "Straight male-thread-to-barb fitting family overview: five different fittings on black, showing threaded ends, hose barbs and an O-ring on one fitting; not a model-specific photo",
    maleStraightLineup: "Straight male-thread-to-barb fitting family lineup: six translucent and white fittings of different sizes on black, showing threaded ends, hex bodies and hose barbs; not a model-specific photo",
  },
  es: {
    broadBarb: "Familia SC M6 de racores de rosca hembra a espiga en PP natural: cuerpo cilíndrico sin brida separada, espiga ancha y detalle del orificio",
    slimBarb: "Familia SC M6 de racores de rosca hembra a espiga en PP natural: cuerpo cilíndrico sin brida separada, espiga fina y vista lateral",
    pair: "Foto de la familia SC M6 de racores de rosca hembra a espiga: dos conectores translúcidos de PP natural en distintos ángulos sobre fondo negro",
    group: "Foto de la familia SC M6 de racores de rosca hembra a espiga: tres conectores translúcidos de PP natural y sus sombras originales sobre gris oscuro",
    sbrSingle: "Familia SBR U28 de racores rectos giratorios de rosca macho a espiga en PP natural: vista oblicua de una pieza con rosca, collar moleteado giratorio y espiga",
    sbrGroup: "Foto de la familia SBR U28 de racores rectos giratorios de rosca macho a espiga: tres conectores de PP natural con roscas, collares y espigas vistos desde distintos ángulos sobre fondo negro",
    maleStraightGroup: "Vista de la familia de racores rectos de rosca macho a espiga: cinco racores distintos sobre fondo negro, con roscas, espigas y una junta tórica en uno de ellos; no es una foto específica del modelo",
    maleStraightLineup: "Fila de seis racores rectos de rosca macho a espiga, translúcidos y blancos de distintos tamaños sobre fondo negro, con roscas, cuerpos hexagonales y espigas; no es una foto específica del modelo",
  },
  fr: {
    broadBarb: "Gamme SC M6 de raccords taraudés à embout cannelé en PP naturel : corps cylindrique sans collerette séparée, embout large et détail de l'orifice",
    slimBarb: "Gamme SC M6 de raccords taraudés à embout cannelé en PP naturel : corps cylindrique sans collerette séparée, embout fin et vue latérale",
    pair: "Photo de la gamme SC M6 de raccords taraudés à embout cannelé : deux raccords translucides en PP naturel sous différents angles sur fond noir",
    group: "Photo de la gamme SC M6 de raccords taraudés à embout cannelé : trois raccords translucides en PP naturel et leurs ombres d'origine sur fond gris foncé",
    sbrSingle: "Gamme SBR U28 de raccords droits pivotants à filetage mâle et embout cannelé en PP naturel : vue oblique d'une pièce, filetage, bague moletée pivotante et embout",
    sbrGroup: "Photo de la gamme SBR U28 de raccords droits pivotants à filetage mâle et embout cannelé : trois raccords en PP naturel montrant filetages, bagues et embouts sous différents angles sur fond noir",
    maleStraightGroup: "Vue de la gamme de raccords droits à filetage mâle et embout cannelé : cinq raccords différents sur fond noir, avec filetages, embouts et un joint torique sur l'un d'eux ; photo non spécifique au modèle",
    maleStraightLineup: "Rangée de six raccords droits à filetage mâle et embout cannelé, translucides et blancs de tailles différentes sur fond noir, avec filetages et corps hexagonaux ; photo non spécifique au modèle",
  },
  ko: {
    broadBarb: "천연색 PP SC M6 암나사-바브 피팅 제품군 사진: 별도 플랜지가 없는 원통형 몸체, 굵은 호스 바브와 포트 상세",
    slimBarb: "천연색 PP SC M6 암나사-바브 피팅 제품군 사진: 별도 플랜지가 없는 원통형 몸체, 가는 호스 바브와 측면 구조",
    pair: "SC M6 암나사-바브 피팅 제품군 사진: 검은 배경 위 서로 다른 각도의 천연색 반투명 PP 커넥터 두 개",
    group: "SC M6 암나사-바브 피팅 제품군 사진: 짙은 회색 배경 위 천연색 반투명 PP 커넥터 세 개와 원래 그림자",
    sbrSingle: "천연색 PP SBR U28 회전형 일자 수나사-바브 피팅 제품군 사진: 단품 사선 뷰의 수나사, 요철 회전 링과 호스 바브",
    sbrGroup: "SBR U28 회전형 일자 수나사-바브 피팅 제품군 사진: 검은 배경 위 천연색 PP 커넥터 세 개의 나사 끝단, 회전 링과 호스 바브를 여러 각도에서 표시",
    maleStraightGroup: "일자 수나사-바브 피팅 제품군 사진: 검은 배경 위 구조가 다른 피팅 다섯 개의 나사 끝단, 호스 바브와 한 피팅의 O링을 보여 주며 특정 모델 전용 사진이 아닙니다",
    maleStraightLineup: "일자 수나사-바브 피팅 제품군 배열 사진: 검은 배경 위 크기가 다른 반투명 및 흰색 피팅 여섯 개의 나사 끝단, 육각 몸체와 호스 바브를 보여 주며 특정 모델 전용 사진이 아닙니다",
  },
  ru: {
    broadBarb: "Серия SC M6 переходников с внутренней резьбой на штуцер из PP натурального цвета: цилиндрический корпус без отдельного фланца, широкий штуцер и отверстие",
    slimBarb: "Серия SC M6 переходников с внутренней резьбой на штуцер из PP натурального цвета: цилиндрический корпус без отдельного фланца, тонкий штуцер и вид сбоку",
    pair: "Фото серии SC M6 переходников с внутренней резьбой на штуцер: два полупрозрачных соединителя из PP натурального цвета в разных ракурсах на чёрном фоне",
    group: "Фото серии SC M6 переходников с внутренней резьбой на штуцер: три полупрозрачных соединителя из PP натурального цвета с исходными тенями на тёмно-сером фоне",
    sbrSingle: "Серия SBR U28 прямых поворотных переходников с наружной резьбой на штуцер из PP натурального цвета: одна деталь под углом, наружная резьба, рифлёное вращающееся кольцо и штуцер",
    sbrGroup: "Фото серии SBR U28 прямых поворотных переходников с наружной резьбой на штуцер: три соединителя из PP натурального цвета, резьбовые концы, кольца и штуцеры в разных ракурсах на чёрном фоне",
    maleStraightGroup: "Обзор прямых переходников с наружной резьбой на штуцер: пять разных деталей на чёрном фоне, резьбовые концы, штуцеры и уплотнительное кольцо на одной детали; фото не относится к конкретной модели",
    maleStraightLineup: "Ряд из шести прямых переходников с наружной резьбой на штуцер: полупрозрачные и белые детали разных размеров на чёрном фоне, резьбовые концы и шестигранные корпуса; фото не относится к конкретной модели",
  },
};

export function getThreadToBarbedFittingImageAlt(src: string, locale: string): string | undefined {
  const key = (Object.keys(photos) as PhotoKey[]).find((item) => imageRoot + photos[item] === src);
  if (!key) return undefined;
  const language = Object.prototype.hasOwnProperty.call(imageAlts, locale) ? locale as PhotoLocale : "zh";
  return imageAlts[language][key];
}

export function getThreadToBarbedFittingGallery(product: Record<string, unknown>): {
  additionalImages?: string[];
  additionalImageAlts?: string[];
} {
  if (product.productTypeId !== "thread-to-barbed-fittings") return {};
  const model = String(product.foreachModel || product.model || "").trim().toUpperCase();
  const keys: PhotoKey[] = [...(modelPhotos[model] ?? [])];
  // FIT catalog A02 pp. 43–46: straight male-thread families only.
  // Keep the mixed-family overview after model/series-specific photographs.
  // SC female-thread, SAL elbow and plain barbed fittings are excluded.
  if (/^(SA|SB|SBS|SBR)-/.test(model)) keys.push("maleStraightGroup", "maleStraightLineup");
  if (keys.length === 0) return {};

  const additionalImages: string[] = [];
  const additionalImageAlts: string[] = [];
  const existingImages = Array.isArray(product.additionalImages) ? product.additionalImages : [];
  const existingAlts = Array.isArray(product.additionalImageAlts) ? product.additionalImageAlts : [];
  existingImages.forEach((src, index) => {
    if (typeof src !== "string" || !src || additionalImages.includes(src)) return;
    // Rebuild owned photos in their model-specific order; keep other imagery.
    if (Object.values(photos).some((filename) => imageRoot + filename === src)) return;
    additionalImages.push(src);
    additionalImageAlts.push(typeof existingAlts[index] === "string" ? existingAlts[index] : "");
  });
  for (const key of keys) {
    additionalImages.push(imageRoot + photos[key]);
    additionalImageAlts.push(imageAlts.zh[key]);
  }
  return { additionalImages, additionalImageAlts };
}
