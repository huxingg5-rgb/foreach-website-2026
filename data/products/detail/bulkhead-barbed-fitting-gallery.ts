import { getDescriptiveFittingImageUrl } from "./fitting-image-description";

const imageRoot = "/images/products/fittings/bulkhead-barbed-fittings/photos/";

const photos = {
  paSide: "pa-white-bulkhead-barbed-fitting-small-body-side.webp",
  paSeparateNut: "pa-white-bulkhead-barbed-fitting-with-separate-pp-nut.webp",
  ppSide: "pp-natural-bulkhead-barbed-fitting-long-body-side.webp",
  ppSeparateNut: "pp-natural-bulkhead-barbed-fitting-with-separate-nut.webp",
  ppAssembled: "pp-natural-bulkhead-barbed-fitting-with-fitted-nut.webp",
  mixedPair: "pa-pp-bulkhead-barbed-fittings-mixed-family-pair.webp",
  ppNuts: "pp-natural-1-4-28-unf-bulkhead-fitting-hex-nuts.webp",
  familyGroup: "pmb-bulkhead-barbed-fittings-assembled-family-group.webp",
} as const;

type PhotoKey = keyof typeof photos;
type PhotoLocale = "zh" | "en" | "es" | "fr" | "ko" | "ru";

// Catalog p. 40 separates PMB connector bodies from PMBSN nuts and PP from PA.
// Match U28 supplementary views by connector material, not the photographed body size.
// These photographs have no dimensional label; retain each SKU's own main image.
const materialPhotos = {
  paWhite: ["paSide", "paSeparateNut"],
  ppNatural: ["ppSide", "ppSeparateNut", "ppAssembled"],
} as const satisfies Record<string, readonly PhotoKey[]>;

const modelPhotos: Record<string, readonly PhotoKey[]> = {
  "PMB-U28-16D-PA-W": materialPhotos.paWhite,
  "PMB-U28-24D-PA-W": materialPhotos.paWhite,
  "PMB-U28-32D-PA-W": materialPhotos.paWhite,
  "PMB-U28-16D-PP-N": materialPhotos.ppNatural,
  "PMB-U28-24D-PP-N": materialPhotos.ppNatural,
  "PMB-U28-32D-PP-N": materialPhotos.ppNatural,
  "PMBSN-U28-PP-N": ["ppNuts"],
};

const imageAlts: Record<PhotoLocale, Record<PhotoKey, string>> = {
  zh: {
    paSide: "PA 白色小型 PMB 穿板倒刺接头侧视实拍：外螺纹安装段与两端倒刺；系列参考图",
    paSeparateNut: "PA 白色小型 PMB 穿板倒刺接头与分开放置的 PP 本色六角螺母；系列装配参考图",
    ppSide: "PP 本色长身 PMB 穿板倒刺接头侧视实拍：半透明本体、外螺纹安装段与两端倒刺；系列参考图",
    ppSeparateNut: "PP 本色长身 PMB 穿板倒刺接头与分开放置的六角螺母；系列装配参考图",
    ppAssembled: "PP 本色长身 PMB 穿板倒刺接头旋入六角螺母后的侧视实拍；系列装配参考图",
    mixedPair: "PMB U28 穿板倒刺接头系列合照：一只 PP 本色长身接头与一只 PA 白色小型接头；混合材质系列图",
    ppNuts: "PMBSN U28 PP 本色六角螺母实拍：三只半透明螺母及内螺纹细节",
    familyGroup: "穿板倒刺接头系列装配合照：两只半透明接头和一只白色接头，均装有六角螺母；系列参考图",
  },
  en: {
    paSide: "White PA small-body PMB bulkhead barbed fitting, side view of mounting threads and both hose barbs; family reference photo",
    paSeparateNut: "White PA small-body PMB bulkhead barbed fitting beside a separate natural PP hex nut; family assembly reference",
    ppSide: "Natural PP long-body PMB bulkhead barbed fitting, side view of translucent body, mounting threads and both hose barbs; family reference photo",
    ppSeparateNut: "Natural PP long-body PMB bulkhead barbed fitting beside a separate hex nut; family assembly reference",
    ppAssembled: "Natural PP long-body PMB bulkhead barbed fitting with hex nut fitted, side view; family assembly reference",
    mixedPair: "PMB U28 bulkhead barbed fitting family pair: one natural PP long-body connector and one white PA small-body connector; mixed-material family photo",
    ppNuts: "PMBSN U28 natural PP hex nuts: three translucent nuts showing internal threads",
    familyGroup: "Bulkhead barbed fitting family assembly photo: two translucent fittings and one white fitting, each with a hex nut fitted; family reference",
  },
  es: {
    paSide: "Racor pasamuros de espiga PMB de cuerpo pequeño en PA blanco: vista lateral de la rosca de montaje y ambas espigas; foto de la familia",
    paSeparateNut: "Racor pasamuros PMB de cuerpo pequeño en PA blanco junto a una tuerca hexagonal separada de PP natural; referencia de montaje de la familia",
    ppSide: "Racor pasamuros de espiga PMB de cuerpo largo en PP natural: cuerpo translúcido, rosca de montaje y ambas espigas; foto de la familia",
    ppSeparateNut: "Racor pasamuros PMB de cuerpo largo en PP natural junto a una tuerca hexagonal separada; referencia de montaje de la familia",
    ppAssembled: "Racor pasamuros PMB de cuerpo largo en PP natural con tuerca hexagonal montada, vista lateral; referencia de montaje de la familia",
    mixedPair: "Familia PMB U28: un racor pasamuros de cuerpo largo en PP natural y otro de cuerpo pequeño en PA blanco; foto de materiales mixtos",
    ppNuts: "Tuercas hexagonales PMBSN U28 de PP natural: tres tuercas translúcidas y sus roscas interiores",
    familyGroup: "Foto de montaje de la familia de racores pasamuros de espiga: dos racores translúcidos y uno blanco, cada uno con tuerca hexagonal montada; referencia de la familia",
  },
  fr: {
    paSide: "Raccord cannelé passe-cloison PMB à petit corps en PA blanc : vue latérale du filetage de montage et des deux embouts ; photo de la gamme",
    paSeparateNut: "Raccord passe-cloison PMB à petit corps en PA blanc avec écrou hexagonal séparé en PP naturel ; référence de montage de la gamme",
    ppSide: "Raccord cannelé passe-cloison PMB à corps long en PP naturel : corps translucide, filetage de montage et deux embouts ; photo de la gamme",
    ppSeparateNut: "Raccord passe-cloison PMB à corps long en PP naturel avec écrou hexagonal séparé ; référence de montage de la gamme",
    ppAssembled: "Raccord passe-cloison PMB à corps long en PP naturel avec écrou hexagonal monté, vue latérale ; référence de montage de la gamme",
    mixedPair: "Gamme PMB U28 : un raccord passe-cloison à corps long en PP naturel et un à petit corps en PA blanc ; photo de plusieurs matériaux",
    ppNuts: "Écrous hexagonaux PMBSN U28 en PP naturel : trois écrous translucides montrant leurs filetages intérieurs",
    familyGroup: "Photo de montage de la gamme de raccords cannelés passe-cloison : deux raccords translucides et un blanc, chacun avec un écrou hexagonal monté ; référence de la gamme",
  },
  ko: {
    paSide: "흰색 PA 소형 PMB 벌크헤드 바브 피팅 측면: 설치용 수나사와 양쪽 호스 바브를 보여 주는 제품군 참고 사진",
    paSeparateNut: "흰색 PA 소형 PMB 벌크헤드 바브 피팅과 분리된 천연색 PP 육각 너트: 제품군 조립 참고 사진",
    ppSide: "천연색 PP 긴 몸체 PMB 벌크헤드 바브 피팅 측면: 반투명 몸체, 설치용 수나사와 양쪽 바브를 보여 주는 제품군 참고 사진",
    ppSeparateNut: "천연색 PP 긴 몸체 PMB 벌크헤드 바브 피팅과 분리된 육각 너트: 제품군 조립 참고 사진",
    ppAssembled: "육각 너트를 장착한 천연색 PP 긴 몸체 PMB 벌크헤드 바브 피팅 측면: 제품군 조립 참고 사진",
    mixedPair: "PMB U28 벌크헤드 바브 피팅 제품군: 천연색 PP 긴 몸체와 흰색 PA 소형 몸체 각 한 개의 혼합 소재 사진",
    ppNuts: "PMBSN U28 천연색 PP 육각 너트: 반투명 너트 세 개와 내부 나사산",
    familyGroup: "벌크헤드 바브 피팅 제품군 조립 사진: 육각 너트를 장착한 반투명 피팅 두 개와 흰색 피팅 한 개; 제품군 참고 사진",
  },
  ru: {
    paSide: "Проходной штуцер PMB с малым корпусом из белого PA: вид сбоку на монтажную резьбу и два штуцерных конца; фото серии",
    paSeparateNut: "Проходной штуцер PMB с малым корпусом из белого PA и отдельная шестигранная гайка из PP натурального цвета; пример сборки серии",
    ppSide: "Проходной штуцер PMB с длинным корпусом из PP натурального цвета: полупрозрачный корпус, монтажная резьба и два штуцерных конца; фото серии",
    ppSeparateNut: "Проходной штуцер PMB с длинным корпусом из PP натурального цвета и отдельная шестигранная гайка; пример сборки серии",
    ppAssembled: "Проходной штуцер PMB с длинным корпусом из PP натурального цвета с установленной шестигранной гайкой, вид сбоку; пример сборки серии",
    mixedPair: "Серия проходных штуцеров PMB U28: длинный корпус из PP натурального цвета и малый корпус из белого PA; фото разных материалов",
    ppNuts: "Шестигранные гайки PMBSN U28 из PP натурального цвета: три полупрозрачные гайки с видимой внутренней резьбой",
    familyGroup: "Фото сборки серии проходных штуцеров: два полупрозрачных штуцера и один белый, каждый с установленной шестигранной гайкой; пример серии",
  },
};

export function getBulkheadBarbedFittingImageAlt(src: string, locale: string): string | undefined {
  const key = (Object.keys(photos) as PhotoKey[]).find((item) => imageRoot + photos[item] === getDescriptiveFittingImageUrl(src));
  if (!key) return undefined;
  const language = Object.prototype.hasOwnProperty.call(imageAlts, locale) ? locale as PhotoLocale : "zh";
  return imageAlts[language][key];
}

export function getBulkheadBarbedFittingGallery(product: Record<string, unknown>): {
  additionalImages?: string[];
  additionalImageAlts?: string[];
} {
  if (product.productTypeId !== "bulkhead-barbed-fittings") return {};
  const model = String(product.model || product.modelDisplay || product.slug || "").toUpperCase();
  // The shared assembly group is supplementary context for every product in this category.
  const keys: readonly PhotoKey[] = [...(modelPhotos[model] ?? []), "familyGroup"];
  const existingImages = Array.isArray(product.additionalImages) ? product.additionalImages : [];
  const existingAlts = Array.isArray(product.additionalImageAlts) ? product.additionalImageAlts : [];
  const ownedImages = Object.values(photos).map((file) => imageRoot + file);
  const additionalImages: string[] = [];
  const additionalImageAlts: string[] = [];
  existingImages.forEach((image, index) => {
    if (typeof image !== "string" || !image || additionalImages.includes(image) || ownedImages.includes(getDescriptiveFittingImageUrl(image))) return;
    additionalImages.push(image);
    additionalImageAlts.push(typeof existingAlts[index] === "string" ? existingAlts[index] : "");
  });
  for (const key of keys) {
    additionalImages.push(imageRoot + photos[key]);
    additionalImageAlts.push(imageAlts.zh[key]);
  }
  return { additionalImages, additionalImageAlts };
}
