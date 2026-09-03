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
  introConditionSentence: string;
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
  modelLabel: string;
  seoTitle: string;
  seoDescription: string;
  liquidSeoTitle: string;
  liquidSeoDescription: string;
  gasLiquidSeoTitle: string;
  gasLiquidSeoDescription: string;
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
    liquid: "用于最高 600 mL/min 低流量液体处理的微型液体隔膜泵",
    gasLiquid: "用于废液抽吸和真空处理的微型气液混合隔膜泵",
    modelLabel: "型号：",
    seoTitle: "微型隔膜泵：液体与气液混合处理｜恒永达",
    seoDescription:
      "探索FOREACH微型隔膜泵，包括用于液体输送、清洗和循环的液体隔膜泵，以及用于废液抽吸、真空处理和气液混合介质的气液混合隔膜泵。",
    liquidSeoTitle: "最高 600 mL/min 微型液体隔膜泵｜恒永达",
    liquidSeoDescription:
      "FOREACH微型液体隔膜泵适用于约0–600 mL/min的液体处理、清洗、循环和仪器液路，并提供标准压力与最高600 kPa高压选项。",
    gasLiquidSeoTitle: "废液抽吸微型气液混合隔膜泵｜恒永达",
    gasLiquidSeoDescription:
      "FOREACH微型气液混合隔膜泵适用于废液抽吸、真空处理和气液混合介质；DPGL800单头空载气体流量6 L/min，最大负压小于-90 kPa。",
  },
  en: {
    home: "Home",
    products: "Product Center",
    parent: "Miniature Diaphragm Pumps",
    liquid: "Miniature Liquid Diaphragm Pumps for Low-Flow Liquid Handling up to 600 mL/min",
    gasLiquid: "Miniature Gas-Liquid Diaphragm Pumps for Waste Aspiration and Vacuum Handling",
    modelLabel: "Model:",
    seoTitle: "Miniature Diaphragm Pumps for Liquid & Gas-Liquid Handling | FOREACH",
    seoDescription:
      "Explore FOREACH miniature diaphragm pumps for liquid transfer, washing, circulation, waste aspiration and vacuum handling, including liquid and gas-liquid diaphragm pump series.",
    liquidSeoTitle: "Miniature Liquid Diaphragm Pumps up to 600 mL/min | FOREACH",
    liquidSeoDescription:
      "Miniature liquid diaphragm pumps for approximately 0–600 mL/min liquid handling, washing, circulation and instrument fluidics, with standard and high-pressure options.",
    gasLiquidSeoTitle: "Miniature Gas-Liquid Diaphragm Pumps for Waste Aspiration | FOREACH",
    gasLiquidSeoDescription:
      "Miniature gas-liquid diaphragm pumps for waste aspiration, vacuum handling and mixed gas-liquid media, including DPGL800 with 6 L/min single-head no-load gas flow and vacuum below -90 kPa.",
  },
  es: {
    home: "Inicio",
    products: "Centro de productos",
    parent: "Bombas de diafragma en miniatura",
    liquid: "Bombas miniatura de diafragma para líquidos de bajo caudal hasta 600 mL/min",
    gasLiquid: "Bombas miniatura de diafragma gas-líquido para aspiración de residuos y manejo de vacío",
    modelLabel: "Modelo:",
    seoTitle: "Bombas de diafragma en miniatura para líquidos y mezclas gas-líquido | FOREACH",
    seoDescription:
      "Explore las bombas de diafragma en miniatura FOREACH para transferencia, lavado, circulación, aspiración de residuos y vacío, con series para líquidos y mezclas gas-líquido.",
    liquidSeoTitle: "Bombas miniatura de diafragma para líquidos hasta 600 mL/min | FOREACH",
    liquidSeoDescription:
      "Bombas miniatura de diafragma para manejar líquidos a aproximadamente 0–600 mL/min en lavado, circulación y circuitos de instrumentos, con opciones estándar y de alta presión.",
    gasLiquidSeoTitle: "Bombas miniatura de diafragma gas-líquido para aspiración de residuos | FOREACH",
    gasLiquidSeoDescription:
      "Bombas miniatura de diafragma gas-líquido para aspiración de residuos, vacío y medios mixtos; DPGL800 ofrece 6 L/min de gas sin carga por cabezal y vacío inferior a -90 kPa.",
  },
  fr: {
    home: "Accueil",
    products: "Centre de produits",
    parent: "Pompes à membrane miniatures",
    liquid: "Pompes à membrane miniatures pour liquides à faible débit jusqu’à 600 mL/min",
    gasLiquid: "Pompes à membrane miniatures gaz-liquide pour l’aspiration des effluents et la gestion du vide",
    modelLabel: "Modèle :",
    seoTitle: "Pompes à membrane miniatures pour liquides et mélanges gaz-liquide | FOREACH",
    seoDescription:
      "Découvrez les pompes à membrane miniatures FOREACH pour le transfert, le lavage, la circulation, l’aspiration des effluents et le vide, avec des séries pour liquides et mélanges gaz-liquide.",
    liquidSeoTitle: "Pompes à membrane miniatures pour liquides jusqu’à 600 mL/min | FOREACH",
    liquidSeoDescription:
      "Pompes à membrane miniatures pour la gestion de liquides à environ 0–600 mL/min, le lavage, la circulation et les circuits d’instruments, avec options standard et haute pression.",
    gasLiquidSeoTitle: "Pompes à membrane miniatures gaz-liquide pour aspiration des effluents | FOREACH",
    gasLiquidSeoDescription:
      "Pompes à membrane miniatures gaz-liquide pour l’aspiration des effluents, le vide et les fluides mixtes ; DPGL800 offre 6 L/min de gaz à vide par tête et un vide inférieur à -90 kPa.",
  },
  ko: {
    home: "홈",
    products: "제품 센터",
    parent: "소형 다이어프램 펌프",
    liquid: "최대 600 mL/min 저유량 액체 처리를 위한 소형 액체 다이어프램 펌프",
    gasLiquid: "폐액 흡인 및 진공 처리를 위한 소형 기액 혼합 다이어프램 펌프",
    modelLabel: "모델:",
    seoTitle: "액체 및 기액 혼합 처리를 위한 소형 다이어프램 펌프 | FOREACH",
    seoDescription:
      "FOREACH 소형 다이어프램 펌프는 액체 이송, 세척, 순환, 폐액 흡인 및 진공 처리에 사용되며 액체용과 기액 혼합용 시리즈를 제공합니다.",
    liquidSeoTitle: "최대 600 mL/min 소형 액체 다이어프램 펌프 | FOREACH",
    liquidSeoDescription:
      "약 0–600 mL/min 액체 처리, 세척, 순환 및 장비 유로용 소형 액체 다이어프램 펌프로 표준 압력과 고압 옵션을 제공합니다.",
    gasLiquidSeoTitle: "폐액 흡인용 소형 기액 혼합 다이어프램 펌프 | FOREACH",
    gasLiquidSeoDescription:
      "폐액 흡인, 진공 처리 및 기액 혼합 유체용 소형 기액 혼합 다이어프램 펌프입니다. DPGL800은 헤드당 무부하 가스 유량이 6 L/min이고 진공은 -90 kPa 미만입니다.",
  },
  ru: {
    home: "Главная",
    products: "Каталог продукции",
    parent: "Миниатюрные мембранные насосы",
    liquid: "Миниатюрные жидкостные мембранные насосы для малых расходов до 600 mL/min",
    gasLiquid: "Миниатюрные газожидкостные мембранные насосы для аспирации отходов и вакуумирования",
    modelLabel: "Модель:",
    seoTitle: "Миниатюрные мембранные насосы для жидкостей и газожидкостных сред | FOREACH",
    seoDescription:
      "Миниатюрные мембранные насосы FOREACH для перекачивания, промывки, циркуляции, аспирации отходов и вакуума, включая серии для жидкостей и газожидкостных сред.",
    liquidSeoTitle: "Миниатюрные жидкостные мембранные насосы до 600 mL/min | FOREACH",
    liquidSeoDescription:
      "Миниатюрные жидкостные мембранные насосы для расхода примерно 0–600 mL/min, промывки, циркуляции и приборных трактов, со стандартными и высоконапорными вариантами.",
    gasLiquidSeoTitle: "Газожидкостные мембранные насосы для аспирации отходов | FOREACH",
    gasLiquidSeoDescription:
      "Миниатюрные газожидкостные насосы для аспирации отходов, вакуума и смешанных сред; DPGL800 обеспечивает 6 L/min газа без нагрузки на головку и вакуум ниже -90 kPa.",
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

function getReferenceServiceLifeHours(definition: ReferenceDefinition) {
  return definition.motor === "brushless" ? "10,000 h" : "3,000 h";
}

function getReferenceLocalizedCopy(
  definition: ReferenceDefinition,
  locale: DiaphragmPumpReferenceLocale,
): Omit<DiaphragmPumpReferenceLocalizedCopy, "introConditionSentence"> {
  const motor = getMotorTerms(definition);
  const isGasLiquid = definition.kind === "gas-liquid";
  const isHighPressure = definition.kind === "high-pressure";
  const flow = definition.flow;
  const model = definition.model;
  const hours = getReferenceServiceLifeHours(definition);
  const applications = isGasLiquid ? GAS_LIQUID_APPLICATIONS[locale] : LIQUID_APPLICATIONS[locale];

  if (locale === "zh") {
    const cardSubtitle = isGasLiquid
      ? `24 V 直流无刷双头微型气液混合隔膜泵，单泵头空载气体流量 6 L/min，寿命 ${hours}`
      : isHighPressure
        ? `600 kPa ${motor.zh}高压微型隔膜泵，寿命 ${hours}，12 V / 24 V 可选`
        : `${flow} mL/min ${motor.zh}微型隔膜泵，寿命 ${hours}，12 V / 24 V 可选`;
    const h1 = `FOREACH ${model} ${cardSubtitle}`;
    const description = isGasLiquid
      ? `${model} 是 24 V 直流无刷双头微型气液混合隔膜泵，专为气体及气液混合物设计，不适用于输送 100% 液体。单泵头空载气体流量为 6 L/min，最大负压为 < -90 kPa，适用于真空抽吸和气液混合物抽排。`
      : isHighPressure
        ? `${model} 是 12 V / 24 V ${motor.zh}高压微型液体隔膜泵，额定压力为 600 kPa，空载流量为 300 mL/min。接口为卡套接头，连接 6×4 mm（外径×内径）的硬管。`
        : `${model} 是 12 V / 24 V ${motor.zh}微型液体隔膜泵，空载流量为 ${flow} mL/min，额定压力为 100 kPa，适用于仪器内部的清洗、试剂、废液与循环液路。`;
    const seoTitle = isGasLiquid
      ? `双头微型气液混合隔膜泵与真空抽吸 | ${model} | 恒永达`
      : isHighPressure
        ? `600 kPa ${motor.zh}高压微型隔膜泵 | ${model} | 恒永达`
        : `${flow} mL/min ${motor.zh}微型液体隔膜泵 | ${model} | 恒永达`;
    return { h1, cardSubtitle, description, applications, seoTitle, seoDescription: description };
  }

  if (locale === "en") {
    const cardSubtitle = isGasLiquid
      ? `24 V Brushless DC Dual-Head Miniature Gas-Liquid Diaphragm Pump, 6 L/min No-Load Gas Flow per Head, ${hours} Service Life`
      : isHighPressure
        ? `600 kPa ${motor.en} High-Pressure Miniature Liquid Diaphragm Pump, ${hours} Service Life, 12 V / 24 V`
        : `${flow} mL/min ${motor.en} Miniature Liquid Diaphragm Pump, ${hours} Service Life, 12 V / 24 V`;
    const h1 = `FOREACH ${model} ${cardSubtitle}`;
    const description = isGasLiquid
      ? `${model} is a 24 V brushless DC dual-head miniature gas-liquid diaphragm pump. Designed for gas and gas-liquid mixtures. It is not suitable for pumping 100% liquid. Its single-head no-load gas flow is 6 L/min and maximum negative pressure is < -90 kPa.`
      : isHighPressure
        ? `${model} is a 12 V / 24 V ${motor.en.toLowerCase()} high-pressure miniature liquid diaphragm pump with 600 kPa rated pressure and 300 mL/min no-load flow. Threaded Port, connects to 6 × 4 mm rigid tubing.`
        : `${model} is a 12 V / 24 V ${motor.en.toLowerCase()} miniature liquid diaphragm pump with ${flow} mL/min no-load flow and 100 kPa rated pressure for instrument wash, reagent, waste, and circulation circuits.`;
    const seoTitle = isGasLiquid
      ? `Dual-Head Miniature Gas-Liquid Diaphragm Pump for Vacuum Aspiration | ${model} | FOREACH`
      : isHighPressure
        ? `600 kPa ${motor.en} High-Pressure Diaphragm Pump | ${model} | FOREACH`
        : `${flow} mL/min ${motor.en} Liquid Diaphragm Pump | ${model} | FOREACH`;
    return { h1, cardSubtitle, description, applications, seoTitle, seoDescription: description };
  }

  if (locale === "es") {
    const cardSubtitle = isGasLiquid
      ? `Bomba de diafragma miniatura gas-líquido de doble cabezal con motor CC sin escobillas de 24 V, caudal de gas sin carga de 6 L/min por cabezal, vida útil de ${hours}`
      : isHighPressure
        ? `Bomba miniatura de diafragma de alta presión para líquidos, 600 kPa, con ${motor.es}, vida útil de ${hours}, 12 V / 24 V`
        : `Bomba miniatura de diafragma para líquidos de ${flow} mL/min con ${motor.es}, vida útil de ${hours}, 12 V / 24 V`;
    const h1 = `FOREACH ${model} ${cardSubtitle}`;
    const description = isGasLiquid
      ? `${model} es una bomba de diafragma en miniatura gas-líquido de doble cabezal, 24 V, con motor CC sin escobillas, diseñada para gases y mezclas gas-líquido. No es adecuada para bombear líquido al 100 %. El caudal de gas sin carga de un cabezal es de 6 L/min y el vacío máximo es < -90 kPa.`
      : isHighPressure
        ? `${model} es una bomba miniatura de diafragma para líquidos con ${motor.es}: presión nominal de 600 kPa, caudal sin carga de 300 mL/min y 12 V / 24 V. El puerto roscado se conecta a un tubo rígido de 6 × 4 mm.`
        : `${model} es una bomba miniatura de diafragma para líquidos con ${motor.es}: caudal sin carga de ${flow} mL/min, presión nominal de 100 kPa y 12 V / 24 V para circuitos de instrumentos.`;
    const seoTitle = isGasLiquid
      ? `Bomba de diafragma en miniatura gas-líquido de doble cabezal | ${model} | FOREACH`
      : isHighPressure
        ? `Bomba de diafragma de alta presión 600 kPa, ${motor.es} | ${model} | FOREACH`
        : `Bomba miniatura de diafragma para líquidos de ${flow} mL/min, ${motor.es} | ${model} | FOREACH`;
    return { h1, cardSubtitle, description, applications, seoTitle, seoDescription: description };
  }

  if (locale === "fr") {
    const cardSubtitle = isGasLiquid
      ? `Pompe à membrane miniature gaz-liquide à double tête avec moteur CC sans balais 24 V, débit de gaz à vide de 6 L/min par tête, durée de vie de ${hours}`
      : isHighPressure
        ? `Pompe à membrane miniature haute pression pour liquides, 600 kPa, avec ${motor.fr}, durée de vie de ${hours}, 12 V / 24 V`
        : `Pompe à membrane miniature pour liquides de ${flow} mL/min avec ${motor.fr}, durée de vie de ${hours}, 12 V / 24 V`;
    const h1 = `FOREACH ${model} ${cardSubtitle}`;
    const description = isGasLiquid
      ? `${model} est une pompe à membrane miniature gaz-liquide à double tête, 24 V, à moteur CC sans balais, conçue pour les gaz et les mélanges gaz-liquide. Elle ne convient pas au pompage de liquide à 100 %. Le débit de gaz sans charge d’une seule tête est de 6 L/min et le vide maximal est < -90 kPa.`
      : isHighPressure
        ? `${model} est une pompe à membrane miniature haute pression pour liquides avec ${motor.fr} : pression nominale de 600 kPa, débit à vide de 300 mL/min et 12 V / 24 V. L’orifice fileté se raccorde à un tube rigide de 6 × 4 mm.`
        : `${model} est une pompe à membrane miniature pour liquides avec ${motor.fr} : débit à vide de ${flow} mL/min, pression nominale de 100 kPa et 12 V / 24 V pour les circuits d’instruments.`;
    const seoTitle = isGasLiquid
      ? `Pompe à membrane miniature gaz-liquide à double tête | ${model} | FOREACH`
      : isHighPressure
        ? `Pompe à membrane haute pression 600 kPa, ${motor.fr} | ${model} | FOREACH`
        : `Pompe à membrane miniature pour liquides ${flow} mL/min, ${motor.fr} | ${model} | FOREACH`;
    return { h1, cardSubtitle, description, applications, seoTitle, seoDescription: description };
  }

  if (locale === "ko") {
    const cardSubtitle = isGasLiquid
      ? `24 V 브러시리스 DC 듀얼 헤드 소형 기액 혼합 다이어프램 펌프, 헤드당 무부하 가스 유량 6 L/min, 수명 ${hours}`
      : isHighPressure
        ? `600 kPa ${motor.ko} 고압 소형 액체 다이어프램 펌프, 수명 ${hours}, 12 V / 24 V`
        : `${flow} mL/min ${motor.ko} 소형 액체 다이어프램 펌프, 수명 ${hours}, 12 V / 24 V`;
    const h1 = `FOREACH ${model} ${cardSubtitle}`;
    const description = isGasLiquid
      ? `${model}는 24 V 브러시리스 DC 듀얼 헤드 소형 기액 혼합 다이어프램 펌프로 가스 및 기액 혼합물용으로 설계되었습니다. 100% 액체 펌핑에는 적합하지 않습니다. 단일 헤드 무부하 가스 유량은 6 L/min이고 최대 부압/진공은 < -90 kPa입니다.`
      : isHighPressure
        ? `${model}는 12 V / 24 V ${motor.ko} 고압 소형 액체 다이어프램 펌프로 정격 압력 600 kPa, 무부하 유량 300 mL/min입니다. 나사 포트는 6 × 4 mm 경질 튜브에 연결됩니다.`
        : `${model}는 12 V / 24 V ${motor.ko} 소형 액체 다이어프램 펌프로 무부하 유량 ${flow} mL/min, 정격 압력 100 kPa이며 장비 내부 액체 회로에 적합합니다.`;
    const seoTitle = isGasLiquid
      ? `진공 흡인용 듀얼 헤드 소형 기액 혼합 다이어프램 펌프 | ${model} | FOREACH`
      : isHighPressure
        ? `600 kPa ${motor.ko} 고압 액체 다이어프램 펌프 | ${model} | FOREACH`
        : `${flow} mL/min ${motor.ko} 소형 액체 다이어프램 펌프 | ${model} | FOREACH`;
    return { h1, cardSubtitle, description, applications, seoTitle, seoDescription: description };
  }

  const cardSubtitle = isGasLiquid
    ? `Двухголовочный миниатюрный газожидкостный мембранный насос 24 V с бесщёточным двигателем постоянного тока, расход газа без нагрузки одной головки 6 L/min, срок службы ${hours}`
    : isHighPressure
      ? `Миниатюрный жидкостный мембранный насос высокого давления 600 kPa с ${motor.ru}, срок службы ${hours}, 12 V / 24 V`
      : `Миниатюрный жидкостный мембранный насос ${flow} mL/min с ${motor.ru}, срок службы ${hours}, 12 V / 24 V`;
  const h1 = `FOREACH ${model} ${cardSubtitle}`;
  const description = isGasLiquid
    ? `${model} — двухголовочный миниатюрный газожидкостный мембранный насос 24 V с бесщёточным двигателем, предназначенный для газа и газожидкостных смесей. Он не подходит для перекачивания 100 % жидкости. Расход газа без нагрузки одной головки составляет 6 L/min, максимальное разрежение — < -90 kPa.`
    : isHighPressure
      ? `${model} — миниатюрный жидкостный мембранный насос высокого давления с ${motor.ru}: номинальное давление 600 kPa, расход без нагрузки 300 mL/min и 12 V / 24 V. Резьбовой порт подключается к жёсткой трубке 6 × 4 мм.`
      : `${model} — миниатюрный жидкостный мембранный насос с ${motor.ru}: расход без нагрузки ${flow} mL/min, номинальное давление 100 kPa и 12 V / 24 V для жидкостных контуров приборов.`;
  const seoTitle = isGasLiquid
    ? `Двухголовочный миниатюрный газожидкостный мембранный насос | ${model} | FOREACH`
    : isHighPressure
      ? `Мембранный насос высокого давления 600 kPa с ${motor.ru} | ${model} | FOREACH`
      : `Миниатюрный жидкостный мембранный насос ${flow} mL/min с ${motor.ru} | ${model} | FOREACH`;
  return { h1, cardSubtitle, description, applications, seoTitle, seoDescription: description };
}

function getReferenceServiceLifeCopy(definition: ReferenceDefinition) {
  const hours = getReferenceServiceLifeHours(definition);

  return {
    zh: {
      descriptionSentence: `规定寿命为 ${hours}（额定电压、连续运行）。`,
      introConditionSentence: "上述规定寿命的条件为额定电压、连续运行。",
    },
    en: {
      descriptionSentence: `The specified service life is ${hours} at rated voltage under continuous operation.`,
      introConditionSentence: "The stated service-life value applies at rated voltage under continuous operation.",
    },
    es: {
      descriptionSentence: `La vida útil especificada es de ${hours} a tensión nominal y en funcionamiento continuo.`,
      introConditionSentence: "El valor de vida útil indicado corresponde a tensión nominal y funcionamiento continuo.",
    },
    fr: {
      descriptionSentence: `La durée de vie spécifiée est de ${hours} à la tension nominale en fonctionnement continu.`,
      introConditionSentence: "La valeur de durée de vie indiquée s’applique à la tension nominale en fonctionnement continu.",
    },
    ko: {
      descriptionSentence: `정격 전압에서 연속 운전할 때의 규정 수명은 ${hours}입니다.`,
      introConditionSentence: "표기된 수명 값은 정격 전압에서의 연속 운전 기준입니다.",
    },
    ru: {
      descriptionSentence: `Указанный срок службы составляет ${hours} при номинальном напряжении и непрерывной работе.`,
      introConditionSentence: "Указанный ресурс относится к работе при номинальном напряжении в непрерывном режиме.",
    },
  } as const;
}

function buildLocalizedCopy(definition: ReferenceDefinition) {
  return Object.fromEntries(
    (["zh", "en", "es", "fr", "ko", "ru"] as const).map((locale) => {
      const copy = getReferenceLocalizedCopy(definition, locale);
      const serviceLife = getReferenceServiceLifeCopy(definition)[locale];

      return [
        locale,
        {
          ...copy,
          description: `${copy.description} ${serviceLife.descriptionSentence}`,
          introConditionSentence: serviceLife.introConditionSentence,
          seoDescription: `${copy.seoDescription} ${serviceLife.descriptionSentence}`,
        },
      ];
    }),
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
