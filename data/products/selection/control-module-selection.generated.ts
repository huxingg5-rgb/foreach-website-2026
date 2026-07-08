/* =========================================================
   control-module-selection.generated.ts
   产品中心｜智控模块选型页数据

   说明：
   1. 本文件只接入产品中心卡片，不新建独立页面；
   2. 数据结构严格跟 product-selection.generated.ts 的 ProductSelectionProduct 保持一致；
   3. Header 的智控系列仍然走 data/navigation.ts；
   4. 后续如果有 Excel 数据源，再改为脚本生成。
========================================================= */

import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
  ProductSelectionTaxonomyItem,
} from "./product-selection.types";

export const controlModuleSelectionProducts: ProductSelectionProduct[] = [
  {
    productId: "control-abd-air-bubble-detector",
    categoryId: "control",
    productTypeId: "control-module",
    seriesId: "smart-control",
    cardTitle: {
      zh: "ABD 气泡检测模块",
      en: "ABD Air Bubble Detector",
      es: "Detector de burbujas de aire ABD",
      fr: "Détecteur de bulles d'air ABD",
      ko: "ABD 기포 감지 모듈",
      ru: "Детектор воздушных пузырьков ABD",
    },
    cardSubtitle: {
      zh: "非接触式气泡检测\n液路异常状态识别\n适用于自动化仪器液路保护",
      en: "Non-contact bubble detection\nFluidic abnormal status detection\nFor automated instrument fluidic protection",
      es: "Detección de burbujas sin contacto\nDetección de estado anómalo en el circuito fluídico\nPara protección fluídica en instrumentos automatizados",
      fr: "Détection de bulles sans contact\nDétection d'état anormal du circuit fluidique\nPour la protection fluidique des instruments automatisés",
      ko: "비접촉식 기포 감지\n유체 경로 이상 상태 감지\n자동화 장비 유체 보호용",
      ru: "Бесконтактное обнаружение пузырьков\nОбнаружение нештатного состояния жидкостного тракта\nДля защиты жидкостных систем автоматизированных приборов",
    },
    filters: {
      filter01: "气泡检测",
      filter02: "非接触式",
    },
    imageCard: "/images/logo/foreach-logo-color.svg",
    detailSlug: "abd-air-bubble-detector",
    status: "active",
    sortOrder: 6001,
    searchKeywords: {
      zh: "ABD 气泡检测模块 智控模块 气泡检测 气泡传感 液路保护",
      en: "ABD air bubble detector smart control module bubble detection fluidic protection",
      es: "ABD detector de burbujas de aire módulo de control inteligente detección de burbujas protección fluídica",
      fr: "ABD détecteur de bulles d'air module de contrôle intelligent détection de bulles protection fluidique",
      ko: "ABD 기포 감지 모듈 스마트 제어 기포 감지 유체 보호",
      ru: "ABD детектор воздушных пузырьков модуль интеллектуального управления обнаружение пузырьков защита жидкостной системы",
    },
  },
  {
    productId: "control-pdm5-pressure-sensor",
    categoryId: "control",
    productTypeId: "control-module",
    seriesId: "smart-control",
    cardTitle: {
      zh: "PDM5 压力检测模块",
      en: "PDM5 Pressure Sensor",
      es: "Sensor de presión PDM5",
      fr: "Capteur de pression PDM5",
      ko: "PDM5 압력 센서",
      ru: "Датчик давления PDM5",
    },
    cardSubtitle: {
      zh: "液路压力监测\n堵塞预警与状态反馈\n适用于自动化液路系统",
      en: "Fluid pressure monitoring\nBlockage warning and status feedback\nFor automated fluidic systems",
      es: "Monitoreo de presión de fluidos\nAdvertencia de obstrucción y retroalimentación de estado\nPara sistemas fluídicos automatizados",
      fr: "Surveillance de pression fluidique\nAlerte d'obstruction et retour d'état\nPour systèmes fluidiques automatisés",
      ko: "유체 압력 모니터링\n막힘 경고 및 상태 피드백\n자동화 유체 시스템용",
      ru: "Контроль давления жидкости\nПредупреждение о закупорке и обратная связь по состоянию\nДля автоматизированных жидкостных систем",
    },
    filters: {
      filter01: "压力检测",
      filter02: "状态反馈",
    },
    imageCard: "/images/logo/foreach-logo-color.svg",
    detailSlug: "pdm5-pressure-sensor",
    status: "active",
    sortOrder: 6002,
    searchKeywords: {
      zh: "PDM5 压力检测模块 智控模块 压力传感器 堵塞预警 液路监测",
      en: "PDM5 pressure sensor smart control module blockage warning fluid pressure monitoring",
      es: "PDM5 sensor de presión módulo de control inteligente advertencia de obstrucción monitoreo de presión de fluidos",
      fr: "PDM5 capteur de pression module de contrôle intelligent alerte d'obstruction surveillance de pression fluidique",
      ko: "PDM5 압력 센서 스마트 제어 모듈 막힘 경고 유체 압력 모니터링",
      ru: "PDM5 датчик давления модуль интеллектуального управления предупреждение о закупорке контроль давления жидкости",
    },
  },
];

export const controlModuleTaxonomyItems: ProductSelectionTaxonomyItem[] = [
  {
    type: "productType",
    id: "control-module",
    label: {
      zh: "智控模块",
      en: "Smart Control Module",
      es: "Módulo de control inteligente",
      fr: "Module de contrôle intelligent",
      ko: "스마트 제어 모듈",
      ru: "Модуль интеллектуального управления",
    },
    sortOrder: 60,
  },
  {
    type: "series",
    id: "smart-control",
    label: {
      zh: "智控模块",
      en: "Smart Control Modules",
      es: "Módulos de control inteligente",
      fr: "Modules de contrôle intelligent",
      ko: "스마트 제어 모듈",
      ru: "Модули интеллектуального управления",
    },
    sortOrder: 60,
  },
];

export const controlModuleFilterLabels: ProductSelectionFilterLabel[] = [];
