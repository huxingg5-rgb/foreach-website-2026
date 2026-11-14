export const tubingAssemblyLocales = ["en", "es", "fr", "ko", "ru"] as const;
// Chinese pages use the unprefixed /products/ routes.
export const allTubingAssemblyLocales = ["zh-CN", ...tubingAssemblyLocales] as const;
export type TubingAssemblyLocale = (typeof allTubingAssemblyLocales)[number];

export function isTubingAssemblyLocale(value: string): value is TubingAssemblyLocale {
  return allTubingAssemblyLocales.some(locale => locale === value);
}

export function getTubingAssemblyLocalePrefix(locale: TubingAssemblyLocale) {
  return locale === "zh-CN" ? "" : `/${locale}`;
}

// Small navigation copy stays separate from the server-side product dictionaries.
export const tubingAssemblyNavigation = {
  "zh-CN": { title: "管组件系列", description: "法兰翻边、卡环和卡箍定制管组件", families: ["法兰翻边管组件", "卡环管组件", "卡箍管组件"], descriptions: ["单端或双端翻边连接", "配套卡环压套与密封垫圈", "管端无需预先翻边"] },
  en: { title: "Tubing Assemblies", description: "Custom flanged, compression-ring and ferrule tubing assemblies", families: ["Flanged Tubing Assemblies", "Compression-Ring Tubing Assemblies", "Ferrule Tubing Assemblies"], descriptions: ["Single- or double-flanged tube ends", "Matched compression rings and sealing ferrules", "Tube connections without pre-flanging"] },
  es: { title: "Conjuntos de tubos", description: "Conjuntos de tubos con reborde, anillo de compresión o férula a medida", families: ["Tubos con reborde", "Tubos con anillo de compresión", "Tubos con férula"], descriptions: ["Extremos con reborde simple o doble", "Anillos de compresión y férulas de sellado compatibles", "Conexiones sin reborde previo"] },
  fr: { title: "Assemblages de tubes", description: "Assemblages sur mesure à collet, bague de compression ou ferrule", families: ["Tubes à collet", "Tubes à bague de compression", "Tubes à ferrule"], descriptions: ["Collet à une ou aux deux extrémités", "Bagues de compression et ferrules d’étanchéité assortis", "Raccordement sans collet préalable"] },
  ko: { title: "튜빙 어셈블리", description: "플랜지형, 압축 링형 및 페룰형 맞춤 튜빙 어셈블리", families: ["플랜지형 튜빙 어셈블리", "압축 링형 튜빙 어셈블리", "페룰형 튜빙 어셈블리"], descriptions: ["한쪽 또는 양쪽 끝단 플랜지 가공", "서로 맞는 압축 링과 밀봉 페룰", "사전 플랜지 가공 없는 튜브 연결"] },
  ru: { title: "Трубные сборки", description: "Трубные сборки на заказ с отбортовкой, обжимным кольцом или феррулой", families: ["Сборки с отбортовкой", "Сборки с обжимным кольцом", "Сборки с феррулой"], descriptions: ["Отбортовка одного или обоих концов", "Согласованные обжимные кольца и уплотнительные феррулы", "Соединение без предварительной отбортовки"] },
} satisfies Record<TubingAssemblyLocale, { title: string; description: string; families: string[]; descriptions: string[] }>;
