export type ProductFilterLocale = "zh" | "zh-CN" | "en" | "es" | "fr" | "ko" | "ru";

type FilterOptionLabelMap = Partial<Record<ProductFilterLocale, string>>;

const FILTER_OPTION_LABELS: Record<string, FilterOptionLabelMap> = {
  "柱塞泵": {
    zh: "柱塞泵",
    en: "Plunger Pump",
    es: "Bomba de émbolo",
    fr: "Pompe à piston",
    ko: "플런저 펌프",
    ru: "Плунжерный насос",
  },
  "隔膜泵": {
    zh: "隔膜泵",
    en: "Diaphragm Pump",
    es: "Bomba de diafragma",
    fr: "Pompe à membrane",
    ko: "다이어프램 펌프",
    ru: "Мембранный насос",
  },
  "移液泵": {
    zh: "移液泵",
    en: "Pipetting Pump",
    es: "Bomba de pipeteo",
    fr: "Pompe de pipetage",
    ko: "피펫팅 펌프",
    ru: "Пипетирующий насос",
  },
  "无阀泵": {
    zh: "无阀泵",
    en: "Valveless Pump",
    es: "Bomba sin válvulas",
    fr: "Pompe sans valve",
    ko: "밸브리스 펌프",
    ru: "Бесклапанный насос",
  },
  "注射泵": {
    zh: "注射泵",
    en: "Syringe Pump",
    es: "Bomba de jeringa",
    fr: "Pompe seringue",
    ko: "시린지 펌프",
    ru: "Шприцевой насос",
  },

  "EA 常规柱塞泵": {
    zh: "EA 常规柱塞泵",
    en: "EA Standard Plunger Pump",
    es: "Bomba de émbolo estándar EA",
    fr: "Pompe à piston standard EA",
    ko: "EA 표준 플런저 펌프",
    ru: "Стандартный плунжерный насос EA",
  },
  "SM 微型柱塞泵": {
    zh: "SM 微型柱塞泵",
    en: "SM Miniature Plunger Pump",
    es: "Bomba de émbolo miniatura SM",
    fr: "Pompe à piston miniature SM",
    ko: "SM 소형 플런저 펌프",
    ru: "Миниатюрный плунжерный насос SM",
  },
  "TM 超微型柱塞泵": {
    zh: "TM 超微型柱塞泵",
    en: "TM Ultra-Compact Plunger Pump",
    es: "Bomba de émbolo ultracompacta TM",
    fr: "Pompe à piston ultra-compacte TM",
    ko: "TM 초소형 플런저 펌프",
    ru: "Сверхкомпактный плунжерный насос TM",
  },

  "DPL 液体隔膜泵": {
    zh: "DPL 液体隔膜泵",
    en: "DPL Liquid Diaphragm Pump",
    es: "Bomba de diafragma para líquidos DPL",
    fr: "Pompe à membrane liquide DPL",
    ko: "DPL 액체 다이어프램 펌프",
    ru: "Мембранный насос DPL для жидкостей",
  },
  "DPL 气体隔膜泵": {
    zh: "DPL 气体隔膜泵",
    en: "DPL Gas Diaphragm Pump",
    es: "Bomba de diafragma para gas DPL",
    fr: "Pompe à membrane gaz DPL",
    ko: "DPL 가스 다이어프램 펌프",
    ru: "Мембранный насос DPL для газа",
  },
  "DPL 气液隔膜泵": {
    zh: "DPL 气液隔膜泵",
    en: "DPL Gas-Liquid Diaphragm Pump",
    es: "Bomba de diafragma gas-líquido DPL",
    fr: "Pompe à membrane gaz-liquide DPL",
    ko: "DPL 기체-액체 다이어프램 펌프",
    ru: "Мембранный насос DPL для газа и жидкости",
  },

  "SMTP2 可编程气体置换式移液泵": {
    zh: "SMTP2 可编程气体置换式移液泵",
    en: "SMTP2 Programmable Gas Displacement Pipetting Pump",
    es: "Bomba de pipeteo por desplazamiento de aire programable SMTP2",
    fr: "Pompe de pipetage à déplacement d’air programmable SMTP2",
    ko: "SMTP2 프로그래머블 공기 치환식 피펫팅 펌프",
    ru: "Программируемый пипетирующий насос SMTP2 с воздушным вытеснением",
  },
  "SMTP4 气体置换式移液泵": {
    zh: "SMTP4 气体置换式移液泵",
    en: "SMTP4 Gas Displacement Pipetting Pump",
    es: "Bomba de pipeteo por desplazamiento de aire SMTP4",
    fr: "Pompe de pipetage à déplacement d’air SMTP4",
    ko: "SMTP4 공기 치환식 피펫팅 펌프",
    ru: "Пипетирующий насос SMTP4 с воздушным вытеснением",
  },

  "HMD 电磁阀系列注射泵": {
    zh: "HMD 电磁阀系列注射泵",
    en: "HMD Solenoid Valve Syringe Pump",
    es: "Bomba de jeringa con válvula solenoide HMD",
    fr: "Pompe seringue à électrovanne HMD",
    ko: "HMD 솔레노이드 밸브 시린지 펌프",
    ru: "Шприцевой насос HMD с электромагнитным клапаном",
  },
  "HLD 旋转阀系列注射泵": {
    zh: "HLD 旋转阀系列注射泵",
    en: "HLD Rotary Valve Syringe Pump",
    es: "Bomba de jeringa con válvula rotativa HLD",
    fr: "Pompe seringue à vanne rotative HLD",
    ko: "HLD 로터리 밸브 시린지 펌프",
    ru: "Шприцевой насос HLD с поворотным клапаном",
  },

  "RPL 单头无阀泵": {
    zh: "RPL 单头无阀泵",
    en: "RPL Single-Head Valveless Pump",
    es: "Bomba sin válvulas de un cabezal RPL",
    fr: "Pompe sans valve mono-tête RPL",
    ko: "RPL 단일 헤드 밸브리스 펌프",
    ru: "Одноголовочный бесклапанный насос RPL",
  },
  "DRPL 双头无阀泵": {
    zh: "DRPL 双头无阀泵",
    en: "DRPL Dual-Head Valveless Pump",
    es: "Bomba sin válvulas de doble cabezal DRPL",
    fr: "Pompe sans valve double tête DRPL",
    ko: "DRPL 듀얼 헤드 밸브리스 펌프",
    ru: "Двухголовочный бесклапанный насос DRPL",
  },

  "多通道旋转阀": {
    zh: "多通道旋转阀",
    en: "Multi-Channel Rotary Valve",
    es: "Válvula rotativa multicanal",
    fr: "Vanne rotative multicanal",
    ko: "다채널 로터리 밸브",
    ru: "Многоканальный поворотный клапан",
  },
  "高压旋转阀": {
    zh: "高压旋转阀",
    en: "High-Pressure Rotary Valve",
    es: "Válvula rotativa de alta presión",
    fr: "Vanne rotative haute pression",
    ko: "고압 로터리 밸브",
    ru: "Поворотный клапан высокого давления",
  },
  "电磁阀": {
    zh: "电磁阀",
    en: "Solenoid Valve",
    es: "Válvula solenoide",
    fr: "Électrovanne",
    ko: "솔레노이드 밸브",
    ru: "Электромагнитный клапан",
  },

  "采样针": {
    zh: "采样针",
    en: "Sampling Probe",
    es: "Sonda de muestreo",
    fr: "Sonde d’échantillonnage",
    ko: "샘플링 프로브",
    ru: "Пробоотборная игла",
  },
  "刺穿针": {
    zh: "刺穿针",
    en: "Piercing Probe",
    es: "Sonda de perforación",
    fr: "Sonde de perçage",
    ko: "피어싱 프로브",
    ru: "Прокалывающая игла",
  },
  "清洗针": {
    zh: "清洗针",
    en: "Wash Probe",
    es: "Sonda de lavado",
    fr: "Sonde de lavage",
    ko: "세척 프로브",
    ru: "Промывочная игла",
  },
  "搅拌杆": {
    zh: "搅拌杆",
    en: "Stirring Paddle",
    es: "Paleta agitadora",
    fr: "Palette d’agitation",
    ko: "교반 패들",
    ru: "Мешалка",
  },

  "智控模块": {
    zh: "智控模块",
    en: "Smart Control Module",
    es: "Módulo de control inteligente",
    fr: "Module de contrôle intelligent",
    ko: "스마트 제어 모듈",
    ru: "Интеллектуальный модуль управления",
  },
  "压力检测模块": {
    zh: "压力检测模块",
    en: "Pressure Monitoring Module",
    es: "Módulo de monitoreo de presión",
    fr: "Module de surveillance de pression",
    ko: "압력 모니터링 모듈",
    ru: "Модуль контроля давления",
  },
  "气泡检测模块": {
    zh: "气泡检测模块",
    en: "Air Bubble Detection Module",
    es: "Módulo de detección de burbujas de aire",
    fr: "Module de détection de bulles d’air",
    ko: "기포 감지 모듈",
    ru: "Модуль обнаружения пузырьков воздуха",
  },
};

function normalizeProductFilterLocale(locale?: string): ProductFilterLocale {
  if (locale === "zh-CN") return "zh";
  if (locale === "en" || locale === "es" || locale === "fr" || locale === "ko" || locale === "ru") {
    return locale;
  }
  return "zh";
}

export function getLocalizedFilterOptionLabel(value: string | number | null | undefined, locale?: string): string {
  const rawValue = String(value ?? "");
  const normalizedLocale = normalizeProductFilterLocale(locale);
  const localized = FILTER_OPTION_LABELS[rawValue];

  if (!localized) {
    return rawValue;
  }

  return localized[normalizedLocale] ?? localized.en ?? rawValue;
}
