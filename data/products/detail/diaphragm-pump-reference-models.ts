import type { ProductSelectionProduct } from "@/data/products/selection/product-selection.types";
import {
  DIAPHRAGM_PUMP_FINAL_ROUTE_PREFIX,
  DIAPHRAGM_PUMP_REFERENCE_ROUTES,
  getDiaphragmPumpPath,
  getDiaphragmPumpReferenceRouteByLegacySlug,
  normalizeDiaphragmPumpLocale,
  type DiaphragmPumpPublicLocale,
} from "./diaphragm-pump-routes";

export type DiaphragmPumpReferenceLocale = DiaphragmPumpPublicLocale;

export type DiaphragmPumpReferenceCopyKey =
  | "dpl30-brushed"
  | "dpl30-brushless"
  | "dpl60-brushed"
  | "dpl60-brushless"
  | "dpl30h-brushed"
  | "dpl30h-brushless"
  | "dpgl800-brushless";

export type DiaphragmPumpReferenceLocalizedCopy = {
  h1: string;
  cardSubtitle: string;
  description: string;
  applications: string;
  seoTitle: string;
  seoDescription: string;
};

export type DiaphragmPumpReferenceModel = {
  slug: string;
  model: string;
  copyKey: DiaphragmPumpReferenceCopyKey;
  sourceSeriesSlug: string;
  configurationCode?: string;
  selectionProductIds: readonly string[];
  legacySlugs: readonly string[];
  localized: Record<
    DiaphragmPumpReferenceLocale,
    DiaphragmPumpReferenceLocalizedCopy
  >;
};

export type DiaphragmPumpCategoryCopy = {
  home: string;
  products: string;
  parent: string;
  liquid: string;
  gasLiquid: string;
  gas: string;
  modelLabel: string;
  seoTitle: string;
  seoDescription: string;
};

export const DIAPHRAGM_PUMP_ROUTE_PREFIX =
  DIAPHRAGM_PUMP_FINAL_ROUTE_PREFIX;

export const DIAPHRAGM_PUMP_CATEGORY_COPY: Record<
  DiaphragmPumpReferenceLocale,
  DiaphragmPumpCategoryCopy
> = {
  zh: {
    home: "首页",
    products: "产品中心",
    parent: "微型隔膜泵",
    liquid: "微型液体隔膜泵",
    gasLiquid: "微型气液混合隔膜泵",
    gas: "微型气体隔膜泵",
    modelLabel: "型号：",
    seoTitle: "微型隔膜泵｜液体、气液混合与真空抽吸｜恒永达",
    seoDescription:
      "恒永达微型隔膜泵覆盖液体输送、高压液路、气体抽吸、负压建立与气液混合物抽排，适用于 IVD、生命科学和实验室自动化设备。",
  },
  en: {
    home: "Home",
    products: "Product Center",
    parent: "Miniature Diaphragm Pumps",
    liquid: "Miniature Liquid Diaphragm Pumps",
    gasLiquid: "Miniature Gas-Liquid Diaphragm Pumps",
    gas: "Miniature Gas Diaphragm Pumps",
    modelLabel: "Model:",
    seoTitle: "Miniature Diaphragm Pumps for Liquid and Vacuum | FOREACH",
    seoDescription:
      "Explore FOREACH miniature diaphragm pumps for liquid transfer, high-pressure fluid circuits, gas aspiration, vacuum generation, and gas-liquid mixture evacuation.",
  },
  es: {
    home: "Inicio",
    products: "Centro de productos",
    parent: "Bombas de diafragma en miniatura",
    liquid: "Bombas miniatura de diafragma para líquidos",
    gasLiquid: "Bombas de diafragma en miniatura gas-líquido",
    gas: "Bombas de diafragma en miniatura para gases",
    modelLabel: "Modelo:",
    seoTitle: "Bombas de diafragma en miniatura para líquidos y vacío | FOREACH",
    seoDescription:
      "Bombas de diafragma en miniatura FOREACH para transferencia de líquidos, circuitos de alta presión, aspiración de gases, generación de vacío y evacuación gas-líquido.",
  },
  fr: {
    home: "Accueil",
    products: "Centre de produits",
    parent: "Pompes à membrane miniatures",
    liquid: "Pompes à membrane miniatures pour liquides",
    gasLiquid: "Pompes à membrane miniatures gaz-liquide",
    gas: "Pompes à membrane miniatures pour gaz",
    modelLabel: "Modèle :",
    seoTitle: "Pompes à membrane miniatures pour liquides et vide | FOREACH",
    seoDescription:
      "Pompes à membrane miniatures FOREACH pour le transfert de liquides, les circuits haute pression, l’aspiration de gaz, la génération de vide et l’évacuation gaz-liquide.",
  },
  ko: {
    home: "홈",
    products: "제품 센터",
    parent: "소형 다이어프램 펌프",
    liquid: "소형 액체 다이어프램 펌프",
    gasLiquid: "소형 기액 혼합 다이어프램 펌프",
    gas: "소형 기체 다이어프램 펌프",
    modelLabel: "모델:",
    seoTitle: "액체 이송 및 진공용 소형 다이어프램 펌프 | FOREACH",
    seoDescription:
      "FOREACH 소형 다이어프램 펌프는 액체 이송, 고압 유로, 가스 흡입, 진공 형성 및 기액 혼합물 배출에 적용됩니다.",
  },
  ru: {
    home: "Главная",
    products: "Каталог продукции",
    parent: "Миниатюрные мембранные насосы",
    liquid: "Миниатюрные жидкостные мембранные насосы",
    gasLiquid: "Миниатюрные газожидкостные мембранные насосы",
    gas: "Миниатюрные газовые мембранные насосы",
    modelLabel: "Модель:",
    seoTitle: "Миниатюрные мембранные насосы для жидкостей и вакуума | FOREACH",
    seoDescription:
      "Миниатюрные мембранные насосы FOREACH для перекачивания жидкостей, контуров высокого давления, всасывания газа, создания вакуума и удаления газожидкостных смесей.",
  },
};

type ReferenceDefinition = {
  slug: string;
  model: string;
  copyKey: DiaphragmPumpReferenceCopyKey;
  configurationCode?: string;
  selectionProductIds: readonly string[];
  kind: "liquid" | "high-pressure" | "gas-liquid";
  motor: "brushed" | "brushless";
  flow: 300 | 600 | 6000;
};

const REFERENCE_DEFINITIONS: readonly ReferenceDefinition[] = [
  { slug: "dpl30-db", model: "DPL30-DB", copyKey: "dpl30-brushed", configurationCode: "DB", selectionProductIds: ["diaphragm-dpl30-brushed"], kind: "liquid", motor: "brushed", flow: 300 },
  { slug: "dpl30-bb", model: "DPL30-BB", copyKey: "dpl30-brushless", configurationCode: "BB", selectionProductIds: ["diaphragm-dpl30-brushless"], kind: "liquid", motor: "brushless", flow: 300 },
  { slug: "dpl60-db", model: "DPL60-DB", copyKey: "dpl60-brushed", configurationCode: "DB", selectionProductIds: ["diaphragm-dpl60-brushed"], kind: "liquid", motor: "brushed", flow: 600 },
  { slug: "dpl60-bb", model: "DPL60-BB", copyKey: "dpl60-brushless", configurationCode: "BB", selectionProductIds: ["diaphragm-dpl60-brushless"], kind: "liquid", motor: "brushless", flow: 600 },
  { slug: "dpl30h-ds", model: "DPL30H-DS", copyKey: "dpl30h-brushed", configurationCode: "DS", selectionProductIds: ["diaphragm-dpl30h-brushed"], kind: "high-pressure", motor: "brushed", flow: 300 },
  { slug: "dpl30h-bs", model: "DPL30H-BS", copyKey: "dpl30h-brushless", configurationCode: "BS", selectionProductIds: ["diaphragm-dpl30h-brushless"], kind: "high-pressure", motor: "brushless", flow: 300 },
  { slug: "dpgl800-bs", model: "DPGL800-BS", copyKey: "dpgl800-brushless", selectionProductIds: ["diaphragm-dpgl800-ff"], kind: "gas-liquid", motor: "brushless", flow: 6000 },
];

const LIQUID_APPLICATIONS: Record<DiaphragmPumpReferenceLocale, string> = {
  zh: "清洗液输送、试剂转移、废液抽排、管路预充、液体循环",
  en: "Wash-fluid delivery, reagent transfer, waste-fluid evacuation, line priming, liquid circulation",
  es: "Transporte de soluciones de limpieza, transferencia de reactivos, evacuación de líquidos residuales, cebado de tuberías y circulación",
  fr: "Transfert de solutions de lavage, transfert de réactifs, évacuation des liquides usagés, amorçage des conduites et circulation",
  ko: "세정액 이송, 시약 이송, 폐액 배출, 배관 프라이밍 및 액체 순환",
  ru: "Подача промывочных растворов, перенос реагентов, удаление отработанной жидкости, заполнение трубопровода и циркуляция",
};

const GAS_LIQUID_APPLICATIONS: Record<DiaphragmPumpReferenceLocale, string> = {
  zh: "气体抽吸、负压建立、气液混合物抽排、密闭容器抽气",
  en: "Gas aspiration, negative-pressure generation, gas-liquid mixture evacuation, closed-vessel air extraction",
  es: "Aspiración de gases, generación de presión negativa, evacuación de mezclas gas-líquido y extracción de aire de recipientes cerrados",
  fr: "Aspiration de gaz, génération de pression négative, évacuation de mélanges gaz-liquide et extraction d’air de récipients fermés",
  ko: "가스 흡입, 부압 형성, 기액 혼합물 배출 및 밀폐 용기 공기 배출",
  ru: "Всасывание газа, создание разрежения, удаление газожидкостных смесей и откачка воздуха из закрытых ёмкостей",
};

function getMotorTerms(definition: ReferenceDefinition) {
  const brushless = definition.motor === "brushless";

  return {
    zh: brushless ? "直流无刷电机" : "直流有刷电机",
    en: brushless ? "Brushless DC" : "Brushed DC",
    es: brushless ? "motor CC sin escobillas" : "motor CC con escobillas",
    fr: brushless ? "moteur CC sans balais" : "moteur CC à balais",
    ko: brushless ? "브러시리스 DC 모터" : "브러시 DC 모터",
    ru: brushless ? "бесщёточным двигателем постоянного тока" : "щёточным двигателем постоянного тока",
  } as const;
}

function getReferenceLocalizedCopy(definition: ReferenceDefinition, locale: DiaphragmPumpReferenceLocale): DiaphragmPumpReferenceLocalizedCopy {
  const motor = getMotorTerms(definition);
  const isGasLiquid = definition.kind === "gas-liquid";
  const isHighPressure = definition.kind === "high-pressure";
  const flow = definition.flow;
  const model = definition.model;
  const applications = isGasLiquid ? GAS_LIQUID_APPLICATIONS[locale] : LIQUID_APPLICATIONS[locale];

  if (locale === "zh") {
    const h1 = isGasLiquid
      ? "恒永达科技 24 V 直流无刷电机气液混合微型隔膜泵"
      : isHighPressure
        ? `恒永达科技 600 kPa ${motor.zh}高压微型隔膜泵，12 V / 24 V 可选`
        : `恒永达科技 ${flow} mL/min ${motor.zh}微型隔膜泵，12 V / 24 V 可选`;
    const description = isGasLiquid
      ? `${model} 是 24 V 直流无刷气液混合隔膜泵，工作介质为气体及气液混合物。单泵头空载气体流量为 6 L/min，最大负压为 < -90 kPa，适用于真空抽吸和气液混合物抽排。`
      : isHighPressure
        ? `${model} 是 12 V / 24 V ${motor.zh}高压微型液体隔膜泵，额定压力为 600 kPa，空载流量为 300 mL/min。实际采用倒刺接口，并通过卡箍 / 锁紧结构固定软管。`
        : `${model} 是 12 V / 24 V ${motor.zh}微型液体隔膜泵，空载流量为 ${flow} mL/min，额定压力为 100 kPa，适用于仪器内部的清洗、试剂、废液与循环液路。`;
    const seoTitle = isGasLiquid
      ? `气液混合隔膜泵与真空抽吸 | ${model} | 恒永达`
      : isHighPressure
        ? `600 kPa ${motor.zh}高压微型隔膜泵 | ${model} | 恒永达`
        : `${flow} mL/min ${motor.zh}微型液体隔膜泵 | ${model} | 恒永达`;
    const cardSubtitle = isGasLiquid
      ? "24 V 直流无刷双头微型气液混合隔膜泵，单泵头空载气体流量 6 L/min"
      : h1.replace(/^恒永达科技\s*/, "");
    return { h1, cardSubtitle, description, applications, seoTitle, seoDescription: description };
  }

  if (locale === "en") {
    const h1 = isGasLiquid
      ? "FOREACH 24 V Brushless DC Gas-Liquid Diaphragm Pump for Vacuum Aspiration"
      : isHighPressure
        ? `FOREACH 600 kPa ${motor.en} High-Pressure Miniature Liquid Diaphragm Pump, 12 V / 24 V`
        : `FOREACH ${flow} mL/min ${motor.en} Miniature Liquid Diaphragm Pump, 12 V / 24 V`;
    const description = isGasLiquid
      ? `${model} is a 24 V brushless DC gas-liquid diaphragm pump for gas and gas-liquid mixtures. Its single-head no-load gas flow is 6 L/min and maximum negative pressure is < -90 kPa.`
      : isHighPressure
        ? `${model} is a 12 V / 24 V ${motor.en.toLowerCase()} high-pressure miniature liquid diaphragm pump with 600 kPa rated pressure and 300 mL/min no-load flow. The physical connection is a hose barb secured by a clamp/locking structure.`
        : `${model} is a 12 V / 24 V ${motor.en.toLowerCase()} miniature liquid diaphragm pump with ${flow} mL/min no-load flow and 100 kPa rated pressure for instrument wash, reagent, waste, and circulation circuits.`;
    const seoTitle = isGasLiquid
      ? `Gas-Liquid Diaphragm Pump for Vacuum Aspiration | ${model} | FOREACH`
      : isHighPressure
        ? `600 kPa ${motor.en} High-Pressure Diaphragm Pump | ${model} | FOREACH`
        : `${flow} mL/min ${motor.en} Liquid Diaphragm Pump | ${model} | FOREACH`;
    const cardSubtitle = isGasLiquid
      ? "24 V brushless DC dual-head miniature gas-liquid diaphragm pump, 6 L/min no-load gas flow per head"
      : h1.replace(/^FOREACH\s*/, "");
    return { h1, cardSubtitle, description, applications, seoTitle, seoDescription: description };
  }

  if (locale === "es") {
    const h1 = isGasLiquid
      ? "FOREACH Bomba de diafragma gas-líquido de 24 V con motor CC sin escobillas para aspiración en vacío"
      : isHighPressure
        ? `FOREACH Bomba miniatura de diafragma para líquidos de alta presión, 600 kPa, con ${motor.es}, 12 V / 24 V`
        : `FOREACH Bomba miniatura de diafragma para líquidos de ${flow} mL/min con ${motor.es}, 12 V / 24 V`;
    const description = isGasLiquid
      ? `${model} es una bomba de diafragma gas-líquido de 24 V con motor CC sin escobillas para gas y mezclas gas-líquido. El caudal de gas sin carga de un cabezal es de 6 L/min y el vacío máximo es < -90 kPa.`
      : isHighPressure
        ? `${model} es una bomba miniatura de diafragma para líquidos con ${motor.es}: presión nominal de 600 kPa, caudal sin carga de 300 mL/min y 12 V / 24 V. La conexión física es una espiga fijada mediante abrazadera/estructura de bloqueo.`
        : `${model} es una bomba miniatura de diafragma para líquidos con ${motor.es}: caudal sin carga de ${flow} mL/min, presión nominal de 100 kPa y 12 V / 24 V para circuitos de instrumentos.`;
    const seoTitle = isGasLiquid
      ? `Bomba de diafragma gas-líquido para aspiración en vacío | ${model} | FOREACH`
      : isHighPressure
        ? `Bomba de diafragma de alta presión 600 kPa, ${motor.es} | ${model} | FOREACH`
        : `Bomba miniatura de diafragma para líquidos de ${flow} mL/min, ${motor.es} | ${model} | FOREACH`;
    const cardSubtitle = isGasLiquid
      ? "Bomba de diafragma miniatura gas-líquido de doble cabezal, 24 V CC sin escobillas, caudal de gas sin carga de 6 L/min por cabezal"
      : h1.replace(/^FOREACH\s*/, "");
    return { h1, cardSubtitle, description, applications, seoTitle, seoDescription: description };
  }

  if (locale === "fr") {
    const h1 = isGasLiquid
      ? "FOREACH Pompe à membrane gaz-liquide 24 V avec moteur CC sans balais pour aspiration à vide"
      : isHighPressure
        ? `FOREACH Pompe à membrane miniature haute pression pour liquides, 600 kPa, avec ${motor.fr}, 12 V / 24 V`
        : `FOREACH Pompe à membrane miniature pour liquides de ${flow} mL/min avec ${motor.fr}, 12 V / 24 V`;
    const description = isGasLiquid
      ? `${model} est une pompe à membrane gaz-liquide 24 V à moteur CC sans balais pour les gaz et mélanges gaz-liquide. Le débit de gaz sans charge d’une seule tête est de 6 L/min et le vide maximal est < -90 kPa.`
      : isHighPressure
        ? `${model} est une pompe à membrane miniature haute pression pour liquides avec ${motor.fr} : pression nominale de 600 kPa, débit à vide de 300 mL/min et 12 V / 24 V. Le raccord physique est cannelé et serré par collier/structure de verrouillage.`
        : `${model} est une pompe à membrane miniature pour liquides avec ${motor.fr} : débit à vide de ${flow} mL/min, pression nominale de 100 kPa et 12 V / 24 V pour les circuits d’instruments.`;
    const seoTitle = isGasLiquid
      ? `Pompe à membrane gaz-liquide pour aspiration à vide | ${model} | FOREACH`
      : isHighPressure
        ? `Pompe à membrane haute pression 600 kPa, ${motor.fr} | ${model} | FOREACH`
        : `Pompe à membrane miniature pour liquides ${flow} mL/min, ${motor.fr} | ${model} | FOREACH`;
    const cardSubtitle = isGasLiquid
      ? "Pompe à membrane miniature gaz-liquide à double tête, 24 V CC sans balais, débit de gaz à vide de 6 L/min par tête"
      : h1.replace(/^FOREACH\s*/, "");
    return { h1, cardSubtitle, description, applications, seoTitle, seoDescription: description };
  }

  if (locale === "ko") {
    const h1 = isGasLiquid
      ? "FOREACH 24 V 브러시리스 DC 기액 혼합 다이어프램 펌프, 진공 흡인용"
      : isHighPressure
        ? `FOREACH 600 kPa ${motor.ko} 고압 소형 액체 다이어프램 펌프, 12 V / 24 V`
        : `FOREACH ${flow} mL/min ${motor.ko} 소형 액체 다이어프램 펌프, 12 V / 24 V`;
    const description = isGasLiquid
      ? `${model}는 24 V 브러시리스 DC 기액 혼합 다이어프램 펌프로 가스 및 기액 혼합물에 사용됩니다. 단일 헤드 무부하 가스 유량은 6 L/min이고 최대 부압/진공은 < -90 kPa입니다.`
      : isHighPressure
        ? `${model}는 12 V / 24 V ${motor.ko} 고압 소형 액체 다이어프램 펌프로 정격 압력 600 kPa, 무부하 유량 300 mL/min입니다. 실제 연결은 바브 + 클램프/잠금 구조입니다.`
        : `${model}는 12 V / 24 V ${motor.ko} 소형 액체 다이어프램 펌프로 무부하 유량 ${flow} mL/min, 정격 압력 100 kPa이며 장비 내부 액체 회로에 적합합니다.`;
    const seoTitle = isGasLiquid
      ? `진공 흡인용 기액 혼합 다이어프램 펌프 | ${model} | FOREACH`
      : isHighPressure
        ? `600 kPa ${motor.ko} 고압 액체 다이어프램 펌프 | ${model} | FOREACH`
        : `${flow} mL/min ${motor.ko} 소형 액체 다이어프램 펌프 | ${model} | FOREACH`;
    const cardSubtitle = isGasLiquid
      ? "24 V 브러시리스 DC 듀얼 헤드 소형 기액 혼합 다이어프램 펌프, 헤드당 무부하 가스 유량 6 L/min"
      : h1.replace(/^FOREACH\s*/, "");
    return { h1, cardSubtitle, description, applications, seoTitle, seoDescription: description };
  }

  const h1 = isGasLiquid
    ? "FOREACH Газожидкостный мембранный насос 24 V с бесщёточным двигателем постоянного тока для вакуумной аспирации"
    : isHighPressure
      ? `FOREACH Миниатюрный жидкостный мембранный насос высокого давления 600 kPa с ${motor.ru}, 12 V / 24 V`
      : `FOREACH Миниатюрный жидкостный мембранный насос ${flow} mL/min с ${motor.ru}, 12 V / 24 V`;
  const description = isGasLiquid
    ? `${model} — газожидкостный мембранный насос 24 V с бесщёточным двигателем для газа и газожидкостных смесей. Расход газа без нагрузки одной головки составляет 6 L/min, максимальное разрежение — < -90 kPa.`
    : isHighPressure
      ? `${model} — миниатюрный жидкостный мембранный насос высокого давления с ${motor.ru}: номинальное давление 600 kPa, расход без нагрузки 300 mL/min и 12 V / 24 V. Физическое соединение — штуцер с хомутом/фиксирующей конструкцией.`
      : `${model} — миниатюрный жидкостный мембранный насос с ${motor.ru}: расход без нагрузки ${flow} mL/min, номинальное давление 100 kPa и 12 V / 24 V для жидкостных контуров приборов.`;
  const seoTitle = isGasLiquid
    ? `Газожидкостный мембранный насос для вакуумной аспирации | ${model} | FOREACH`
    : isHighPressure
      ? `Мембранный насос высокого давления 600 kPa с ${motor.ru} | ${model} | FOREACH`
      : `Миниатюрный жидкостный мембранный насос ${flow} mL/min с ${motor.ru} | ${model} | FOREACH`;
  const cardSubtitle = isGasLiquid
    ? "Двухголовочный миниатюрный газожидкостный мембранный насос 24 В с бесщёточным двигателем, расход газа без нагрузки 6 л/мин на одну головку"
    : h1.replace(/^FOREACH\s*/, "");
  return { h1, cardSubtitle, description, applications, seoTitle, seoDescription: description };
}

function buildLocalizedCopy(definition: ReferenceDefinition) {
  return Object.fromEntries(
    (["zh", "en", "es", "fr", "ko", "ru"] as const).map((locale) => [locale, getReferenceLocalizedCopy(definition, locale)]),
  ) as Record<DiaphragmPumpReferenceLocale, DiaphragmPumpReferenceLocalizedCopy>;
}

export const diaphragmPumpReferenceModels = REFERENCE_DEFINITIONS.map(
  (definition): DiaphragmPumpReferenceModel => {
    const route = DIAPHRAGM_PUMP_REFERENCE_ROUTES.find((item) => item.slug === definition.slug);
    if (!route) throw new Error(`Missing diaphragm-pump route for ${definition.slug}`);
    return {
      slug: definition.slug,
      model: definition.model,
      copyKey: definition.copyKey,
      sourceSeriesSlug: route.sourceSeriesSlug,
      ...(definition.configurationCode ? { configurationCode: definition.configurationCode } : {}),
      selectionProductIds: definition.selectionProductIds,
      legacySlugs: route.legacySlugs,
      localized: buildLocalizedCopy(definition),
    };
  },
);

function normalizeSlug(value: unknown) {
  return String(value || "").split(/[?#]/, 1)[0].split("/").filter(Boolean).at(-1)?.toLowerCase() || "";
}

export function getDiaphragmPumpCategoryCopy(locale: unknown) {
  return DIAPHRAGM_PUMP_CATEGORY_COPY[normalizeDiaphragmPumpLocale(locale)];
}

export function getDiaphragmPumpSelectionHeading(locale: unknown, diaphragmType: unknown) {
  const copy = getDiaphragmPumpCategoryCopy(locale);
  const type = String(diaphragmType || "");
  if (type === "液体隔膜泵") return copy.liquid;
  if (type === "气液混合隔膜泵") return copy.gasLiquid;
  if (type === "气体隔膜泵") return copy.gas;
  return copy.parent;
}

export function getDiaphragmPumpReferenceModel(slug: unknown): DiaphragmPumpReferenceModel | null {
  const normalizedSlug = normalizeSlug(slug);
  return diaphragmPumpReferenceModels.find((item) => item.slug === normalizedSlug) || null;
}

export function getDiaphragmPumpReferenceByLegacySlug(slug: unknown): DiaphragmPumpReferenceModel | null {
  const route = getDiaphragmPumpReferenceRouteByLegacySlug(slug);
  return route ? getDiaphragmPumpReferenceModel(route.slug) : null;
}

export function getDiaphragmPumpReferenceByProductId(productId: unknown): DiaphragmPumpReferenceModel | null {
  const normalizedProductId = String(productId || "").trim().toLowerCase();
  return diaphragmPumpReferenceModels.find((item) => item.selectionProductIds.includes(normalizedProductId)) || null;
}

export function getDiaphragmPumpReferenceFromIdentity(value: unknown): DiaphragmPumpReferenceModel | null {
  if (typeof value === "string") return getDiaphragmPumpReferenceModel(value) || getDiaphragmPumpReferenceByLegacySlug(value);
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  return (
    getDiaphragmPumpReferenceByProductId(record.productId || record.id) ||
    getDiaphragmPumpReferenceModel(record.slug || record.detailSlug || record.routeSlug || record.href) ||
    getDiaphragmPumpReferenceByLegacySlug(record.slug || record.detailSlug || record.routeSlug || record.href)
  );
}

export function isLegacyDiaphragmPumpSlug(slug: unknown) {
  return Boolean(getDiaphragmPumpReferenceByLegacySlug(slug));
}

export function getDiaphragmPumpReferenceRouteSegments() {
  return diaphragmPumpReferenceModels.map((item) => [...DIAPHRAGM_PUMP_ROUTE_PREFIX, item.slug]);
}

export function applyDiaphragmPumpReferenceCard<T extends ProductSelectionProduct>(product: T, locale: unknown): T {
  const targetLocale = normalizeDiaphragmPumpLocale(locale);
  const reference = getDiaphragmPumpReferenceByProductId(product.productId);
  if (!reference) return product;
  const localized = reference.localized[targetLocale];
  return {
    ...product,
    detailSlug: reference.slug,
    cardTitle: { ...(typeof product.cardTitle === "object" ? product.cardTitle : {}), [targetLocale]: reference.model },
    cardSubtitle: { ...(typeof product.cardSubtitle === "object" ? product.cardSubtitle : {}), [targetLocale]: localized.cardSubtitle },
  } as T;
}

export function applyDiaphragmPumpReferenceSearchItem<T extends object>(item: T, locale: unknown): T {
  const record = item as Record<string, unknown>;
  const targetLocale = normalizeDiaphragmPumpLocale(locale);
  const reference = getDiaphragmPumpReferenceByLegacySlug(record.href) || getDiaphragmPumpReferenceModel(record.href);
  if (!reference) return item;
  const localized = reference.localized[targetLocale];
  const keywords = Array.from(new Set([
    ...(Array.isArray(record.keywords) ? record.keywords : []),
    reference.model,
    localized.h1,
    localized.cardSubtitle,
  ].filter(Boolean)));
  return {
    ...item,
    title: reference.model,
    subtitle: localized.cardSubtitle,
    description: localized.seoDescription,
    href: getDiaphragmPumpPath(targetLocale, reference.slug, { trailingSlash: false }),
    model: reference.model,
    keywords,
  } as T;
}
