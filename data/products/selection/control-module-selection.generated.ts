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
    },
    cardSubtitle: {
      zh: "非接触式气泡检测\n液路异常状态识别\n适用于自动化仪器液路保护",
      en: "Non-contact bubble detection\nFluidic abnormal status detection\nFor automated instrument fluidic protection",
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
    },
    cardSubtitle: {
      zh: "液路压力监测\n堵塞预警与状态反馈\n适用于自动化液路系统",
      en: "Fluid pressure monitoring\nBlockage warning and status feedback\nFor automated fluidic systems",
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
      es: "",
      fr: "",
      ko: "",
      ru: "",
    },
    sortOrder: 60,
  },
  {
    type: "series",
    id: "smart-control",
    label: {
      zh: "智控模块",
      en: "Smart Control Modules",
      es: "",
      fr: "",
      ko: "",
      ru: "",
    },
    sortOrder: 60,
  },
];

export const controlModuleFilterLabels: ProductSelectionFilterLabel[] = [];
