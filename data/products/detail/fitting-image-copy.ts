export type FittingImageLocale = "zh" | "en" | "es" | "fr" | "ko" | "ru";
export type FittingImageRecord = {
  model: string;
  category: string;
  source: string;
  src: string;
  productType: string;
  dimensions: string[];
  dimensionKind: "tubeId" | "bore" | null;
  material: string;
  color: string;
  thread: string;
};

// Product types come from the verified detail specifications, not SKU digits.
// Each row is: URL slug, English, Spanish, French, Korean, Russian.
const types: Record<string, readonly string[]> = {
  "直通等径倒刺接头": ["equal-straight-barbed-fitting", "equal straight barbed fitting", "racor recto de espiga de igual diámetro", "raccord cannelé droit à diamètre égal", "동경 직선 바브 피팅", "прямой равнопроходной штуцер"],
  "直通异径倒刺接头": ["reducing-straight-barbed-fitting", "reducing straight barbed fitting", "racor recto reductor de espiga", "raccord cannelé droit réducteur", "이경 직선 바브 피팅", "прямой переходной штуцер"],
  "L型等径倒刺接头": ["equal-elbow-barbed-fitting", "equal elbow barbed fitting", "racor acodado de espiga de igual diámetro", "raccord cannelé coudé à diamètre égal", "동경 엘보 바브 피팅", "угловой равнопроходной штуцер"],
  "L型异径倒刺接头": ["reducing-elbow-barbed-fitting", "reducing elbow barbed fitting", "racor acodado reductor de espiga", "raccord cannelé coudé réducteur", "이경 엘보 바브 피팅", "угловой переходной штуцер"],
  "T型等径倒刺接头": ["equal-tee-barbed-fitting", "equal tee barbed fitting", "racor en T de espiga de igual diámetro", "raccord cannelé en T à diamètre égal", "동경 T형 바브 피팅", "равнопроходной тройник со штуцерами"],
  "T型异径倒刺接头": ["reducing-tee-barbed-fitting", "reducing tee barbed fitting", "racor en T reductor de espiga", "raccord cannelé en T réducteur", "이경 T형 바브 피팅", "переходной тройник со штуцерами"],
  "Y型等径倒刺接头": ["equal-y-barbed-fitting", "equal Y barbed fitting", "racor en Y de espiga de igual diámetro", "raccord cannelé en Y à diamètre égal", "동경 Y형 바브 피팅", "равнопроходной Y-образный штуцер"],
  "Y型异径倒刺接头": ["reducing-y-barbed-fitting", "reducing Y barbed fitting", "racor en Y reductor de espiga", "raccord cannelé en Y réducteur", "이경 Y형 바브 피팅", "переходной Y-образный штуцер"],
  "π型四通等径倒刺接头": ["equal-pi-four-way-barbed-fitting", "equal pi-shaped four-way barbed fitting", "racor de espiga de cuatro vías en pi", "raccord cannelé à quatre voies en pi", "동경 파이형 4방향 바브 피팅", "равнопроходной П-образный штуцер на четыре выхода"],
  "十字型四通等径倒刺接头": ["equal-cross-four-way-barbed-fitting", "equal cross four-way barbed fitting", "racor de espiga en cruz de igual diámetro", "raccord cannelé en croix à diamètre égal", "동경 십자형 4방향 바브 피팅", "равнопроходная крестовина со штуцерами"],
  "倒刺堵头": ["barbed-plug", "barbed plug", "tapón de espiga", "bouchon cannelé", "바브 플러그", "заглушка со штуцером"],
  "直通螺纹密封螺纹转倒刺接头": ["straight-male-thread-to-barb-fitting", "straight male-thread-to-barb fitting", "racor recto de rosca macho a espiga", "raccord droit fileté mâle vers embout cannelé", "직선 수나사-바브 피팅", "прямой штуцер с наружной резьбой"],
  "L型螺纹密封螺纹转倒刺接头": ["elbow-male-thread-to-barb-fitting", "elbow male-thread-to-barb fitting", "racor acodado de rosca macho a espiga", "raccord coudé fileté mâle vers embout cannelé", "엘보 수나사-바브 피팅", "угловой штуцер с наружной резьбой"],
  "直通底面密封螺纹转倒刺接头": ["flat-bottom-seal-male-thread-to-barb-fitting", "flat-bottom-seal male-thread-to-barb fitting", "racor de rosca macho a espiga con sellado de fondo plano", "raccord fileté mâle vers embout cannelé à étanchéité en fond plat", "바닥면 밀봉 수나사-바브 피팅", "штуцер с наружной резьбой и уплотнением по плоскому торцу"],
  "可旋转底面密封螺纹转倒刺接头": ["swivel-male-thread-to-barb-fitting", "swivel male-thread-to-barb fitting", "racor giratorio de rosca macho a espiga", "raccord pivotant fileté mâle vers embout cannelé", "회전형 수나사-바브 피팅", "поворотный штуцер с наружной резьбой"],
  "直通内螺纹转倒刺接头": ["straight-female-thread-to-barb-fitting", "straight female-thread-to-barb fitting", "racor recto de rosca hembra a espiga", "raccord droit fileté femelle vers embout cannelé", "직선 암나사-바브 피팅", "прямой штуцер с внутренней резьбой"],
  "方形二通内螺纹互转接头": ["square-female-thread-union", "square-body female-thread union", "unión de rosca hembra con cuerpo cuadrado", "union filetée femelle à corps carré", "사각 몸체 암나사 유니온", "муфта с внутренней резьбой и квадратным корпусом"],
  "穿板二通内螺纹互转接头": ["bulkhead-female-thread-union", "bulkhead female-thread union", "unión pasamuros de rosca hembra", "union filetée femelle passe-cloison", "벌크헤드 암나사 유니온", "проходная муфта с внутренней резьбой"],
  "直通二通内螺纹互转接头": ["straight-female-thread-union", "straight female-thread union", "unión recta de rosca hembra", "union droite filetée femelle", "직선 암나사 유니온", "прямая муфта с внутренней резьбой"],
  "T型三通内螺纹互转接头": ["tee-female-thread-adapter", "tee female-thread adapter", "adaptador en T de rosca hembra", "adaptateur en T fileté femelle", "T형 암나사 어댑터", "тройник с внутренней резьбой"],
  "Y型三通内螺纹互转接头": ["y-female-thread-adapter", "Y female-thread adapter", "adaptador en Y de rosca hembra", "adaptateur en Y fileté femelle", "Y형 암나사 어댑터", "Y-образный адаптер с внутренней резьбой"],
  "内螺纹六角螺母": ["female-thread-hex-nut", "female-thread hex nut", "tuerca hexagonal", "écrou hexagonal", "육각 너트", "шестигранная гайка"],
  "穿板倒刺接头": ["bulkhead-barbed-fitting", "bulkhead barbed fitting", "racor pasamuros de espiga", "raccord cannelé passe-cloison", "벌크헤드 바브 피팅", "проходной штуцер"],
  "六角螺母": ["hex-nut", "hex nut", "tuerca hexagonal", "écrou hexagonal", "육각 너트", "шестигранная гайка"],
};

const localeIndex = { en: 1, es: 2, fr: 3, ko: 4, ru: 5 } as const;
const colors: Record<string, Record<FittingImageLocale, string>> = {
  本色: { zh: "本色", en: "natural", es: "color natural", fr: "naturel", ko: "천연색", ru: "натурального цвета" },
  白色: { zh: "白色", en: "white", es: "blanco", fr: "blanc", ko: "흰색", ru: "белого цвета" },
  黑色: { zh: "黑色", en: "black", es: "negro", fr: "noir", ko: "검은색", ru: "чёрного цвета" },
};
const labels = {
  zh: { tubeId: "接管内径", bore: "通径", thread: "螺纹" },
  en: { tubeId: "tube ID", bore: "bore", thread: "thread" },
  es: { tubeId: "diámetro interior del tubo", bore: "diámetro de paso", thread: "rosca" },
  fr: { tubeId: "diamètre intérieur du tube", bore: "diamètre de passage", thread: "filetage" },
  ko: { tubeId: "튜브 내경", bore: "유로 직경", thread: "나사" },
  ru: { tubeId: "внутренний диаметр трубки", bore: "диаметр прохода", thread: "резьба" },
};

export function fittingImageLocale(locale: string): FittingImageLocale {
  const language = locale.toLowerCase().split("-")[0];
  return Object.prototype.hasOwnProperty.call(labels, language) ? language as FittingImageLocale : "zh";
}

export function getFittingImageTypeSlug(productType: string): string {
  const slug = types[productType]?.[0];
  if (!slug) throw new Error(`Missing descriptive image type: ${productType}`);
  return slug;
}

export function buildFittingImageAlt(record: FittingImageRecord, locale: string): string {
  const language = fittingImageLocale(locale);
  const typeName = language === "zh" ? record.productType : types[record.productType]?.[localeIndex[language]];
  if (!typeName) throw new Error(`Missing fitting image translation: ${record.productType}/${language}`);
  const size = record.dimensionKind && record.dimensions.length
    ? `${record.dimensions.join(" × ")} mm ${labels[language][record.dimensionKind]}`
    : "";
  const color = colors[record.color]?.[language] || "";
  const taper = { zh: "锥", en: "taper", es: "cónica", fr: "conique", ko: "테이퍼", ru: "коническая" };
  const threadValue = record.thread.replace("锥螺纹", taper[language]);
  const thread = record.thread ? `${threadValue} ${labels[language].thread}` : "";
  return [size, `${record.material} ${color} ${typeName}`.replace(/\s+/g, " ").trim(), thread]
    .filter(Boolean).join(language === "zh" ? "，" : ", ") + ` (${record.model})`;
}
