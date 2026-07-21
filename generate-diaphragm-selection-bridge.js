const fs = require("fs");
const path = require("path");

const cardsPath = "data/products/generated/pumps/diaphragm-pumps/selection/cards.json";
const mediaPath = "data/products/generated/pumps/diaphragm-pumps/media/media.json";
const outPath = "data/products/selection/diaphragm-pump-selection.generated.ts";

const cards = JSON.parse(fs.readFileSync(cardsPath, "utf8"));
const media = JSON.parse(fs.readFileSync(mediaPath, "utf8"));

function toPublicUrl(fullPath) {
  const value = String(fullPath || "").replaceAll("\\", "/");
  if (!value) return "";
  if (value.startsWith("public/")) return "/" + value.slice("public/".length);
  if (value.startsWith("/public/")) return value.replace(/^\/public\//, "/");
  return value.startsWith("/") ? value : "/" + value;
}

function safeId(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getPumpType(card) {
  const title = String(card.title || "");

  if (title.startsWith("DPGL800")) return "气液混合泵";
  if (
    title.startsWith("DPL30") ||
    title.startsWith("DPL60") ||
    title.startsWith("DPL30H")
  ) {
    return "液泵";
  }

  return "气泵";
}

function getPositivePressure(card) {
  const title = String(card.title || "");

  // 选型页耐压只筛正压
  if (title.startsWith("DPGL800")) return "30 kPa";
  if (title.startsWith("DPL30H")) return "600 kPa";
  if (title.startsWith("DPL30") || title.startsWith("DPL60")) return "100 kPa";

  const pressure = String(card.pressure || "").trim();

  if (pressure.includes("/")) {
    return pressure.split("/")[0].replace("+", "").trim();
  }

  return pressure.replace("+", "").trim();
}

function getServiceLife(card) {
  const title = String(card.title || "");
  const motorType = String(card.motorType || "");

  if (title.startsWith("DPGL800")) return "10000 h";
  if (motorType.includes("无刷")) return "10000 h";
  if (motorType.includes("有刷")) return "3000 h";

  return "";
}

function getEnglishMotor(card) {
  const motorType = String(card.motorType || "");
  if (motorType.includes("无刷")) return "Brushless motor";
  if (motorType.includes("有刷")) return "Brushed motor";
  return motorType;
}

function getChineseSubtitle(card) {
  const serviceLife = getServiceLife(card);

  return [
    card.motorType,
    card.flowRate,
    serviceLife ? `寿命 ${serviceLife}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function getEnglishSubtitle(card) {
  const serviceLife = getServiceLife(card);

  return [
    getEnglishMotor(card),
    card.flowRate,
    serviceLife ? `Service life ${serviceLife}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

const mediaById = new Map(media.map((item) => [item.resourceId, item]));

const products = cards.map((card) => {
  const image = mediaById.get(card.imageKey);
  const imageDiskPath = image?.fullPath
    ? path.join(process.cwd(), image.fullPath)
    : "";

  const imageUrl =
    image && imageDiskPath && fs.existsSync(imageDiskPath)
      ? toPublicUrl(image.fullPath)
      : "";

  const productId = `diaphragm-${safeId(card.cardId || card.title)}`;
  const pumpType = getPumpType(card);
  const positivePressure = getPositivePressure(card);
  const serviceLife = getServiceLife(card);

  return {
    productId,
    id: productId,

    categoryId: "pumps",
    categorySlug: "pumps",

    productTypeId: "diaphragm-pump",
    productTypeSlug: "diaphragm-pumps",

    seriesId: card.targetSeriesSlug,
    seriesSlug: card.targetSeriesSlug,
    detailSlug: card.targetSeriesSlug,

    cardTitle: {
      zh: card.title,
      en: card.title
    },

    cardSubtitle: {
      zh: getChineseSubtitle(card),
      en: getEnglishSubtitle(card)
    },

    imageCard: imageUrl,

    imageAlt: {
      zh: card.alt,
      en: card.alt
    },

    categoryName: {
      zh: "泵",
      en: "Pumps"
    },

    productTypeName: {
      zh: "隔膜泵",
      en: "Diaphragm Pumps"
    },

    seriesName: {
      zh: pumpType,
      en: pumpType === "气液混合泵" ? "Gas-Liquid Pumps" : pumpType === "液泵" ? "Liquid Pumps" : "Gas Pumps"
    },

    filters: {
      productType: "diaphragm-pump",
      filter01: pumpType,
      filter02: card.motorType,
      filter03: card.flowRate,
      filter04: positivePressure,
      series: card.targetSeriesSlug,
      motorType: card.motorType,
      flowRate: card.flowRate,
      pressure: positivePressure,
      serviceLife
    },

    filter01: pumpType,
    filter02: card.motorType,
    filter03: card.flowRate,
    filter04: positivePressure,

    motorType: card.motorType,
    flowRate: card.flowRate,
    pressure: positivePressure,
    serviceLife,

    tags: [
      card.motorType,
      card.flowRate,
      positivePressure,
      serviceLife ? `寿命 ${serviceLife}` : ""
    ].filter(Boolean),

    needDrawing: true,
    needModel3d: true,

    source: "diaphragm-pump-xlsx",
    reservedConfigSlug: card.reservedConfigSlug
  };
});

const taxonomyItems = [
  {
    id: "diaphragm-pump",
    parentId: "pumps",
    level: 2,
    label: {
      zh: "隔膜泵",
      en: "Diaphragm Pumps"
    },
    href: "/products/pumps/diaphragm-pumps",
    enabled: true,
    order: 20
  }
];

const filterLabels = [
  {
    productTypeId: "diaphragm-pump",
    filterKey: "filter01",
    label: {
      zh: "泵类型",
      en: "Pump Type"
    },
    inputType: "single",
    visible: true,
    sortOrder: 10
  },
  {
    productTypeId: "diaphragm-pump",
    filterKey: "filter02",
    label: {
      zh: "电机类型",
      en: "Motor Type"
    },
    inputType: "single",
    visible: true,
    sortOrder: 20
  },
  {
    productTypeId: "diaphragm-pump",
    filterKey: "filter03",
    label: {
      zh: "流量",
      en: "Flow Rate"
    },
    inputType: "single",
    visible: true,
    sortOrder: 30
  },
  {
    productTypeId: "diaphragm-pump",
    filterKey: "filter04",
    label: {
      zh: "耐压",
      en: "Pressure"
    },
    inputType: "single",
    visible: true,
    sortOrder: 40
  }
];

const ts = `import type { ProductSelectionProduct, ProductSelectionFilterLabel } from "./product-selection.types";

export const diaphragmPumpSelectionProducts = ${JSON.stringify(products, null, 2)} as unknown as ProductSelectionProduct[];

export const diaphragmPumpTaxonomyItems = ${JSON.stringify(taxonomyItems, null, 2)} as any[];

export const diaphragmPumpFilterLabels = ${JSON.stringify(filterLabels, null, 2)} as unknown as ProductSelectionFilterLabel[];
`;

fs.writeFileSync(outPath, ts, "utf8");

console.log("generated:", outPath);
console.table(products.map((item) => ({
  title: item.cardTitle.zh,
  type: item.filter01,
  motor: item.filter02,
  flow: item.filter03,
  pressure: item.filter04,
  life: item.serviceLife
})));

console.table(filterLabels.map((item) => ({
  productTypeId: item.productTypeId,
  filterKey: item.filterKey,
  label: item.label.zh
})));
