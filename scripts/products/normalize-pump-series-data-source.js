/* =========================================================
   normalize-pump-series-data-source.js
   恒永达官网｜泵系列 xlsx 数据源规范化脚本

   作用：
   1. 不改页面结构
   2. 只整理泵系列 xlsx 数据源
   3. 正式页面路径保持 /products/pumps/plunger-pumps/[slug]
   4. 数据库预览路径单独使用 /products/pumps-db/plunger-pumps/[seriesSlug]/[slug]
   5. 补齐缺失的选型卡片
========================================================= */

const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const file = path.join(
  process.cwd(),
  "data-source/product-center/pumps/FOREACH_泵系列_产品数据源.xlsx"
);

if (!fs.existsSync(file)) {
  throw new Error("未找到泵系列数据源：" + file);
}

const wb = XLSX.readFile(file);

function readSheet(sheetName) {
  const sheet = wb.Sheets[sheetName];
  if (!sheet) return [];
  return XLSX.utils.sheet_to_json(sheet, { defval: "" });
}

function writeSheet(sheetName, rows) {
  wb.Sheets[sheetName] = XLSX.utils.json_to_sheet(rows);
}

function text(value) {
  return String(value || "").trim();
}

const productSheet = "02_泵产品索引";
const routeSheet = "03_路由与页面映射";
const cardSheet = "07_选型卡片";

const products = readSheet(productSheet);
let routes = readSheet(routeSheet);
let cards = readSheet(cardSheet);

const productMap = new Map(products.map((item) => [text(item.productId), item]));

/* =========================================================
   1. 规范路由表

   正式 canonicalPath：
   /products/pumps/plunger-pumps/[slug]

   数据库预览 databasePreviewHref：
   /products/pumps-db/plunger-pumps/[seriesSlug]/[slug]
========================================================= */

routes = routes.map((route) => {
  const productId = text(route.productId);
  const product = productMap.get(productId) || {};
  const pumpTypeSlug = text(product.pumpTypeSlug || product.productTypeSlug || "plunger-pumps");
  const seriesSlug = text(product.seriesSlug);
  const routeSlug = text(route.routeSlug || product.routeSlug || product.slug);

  const officialPath = `/products/pumps/${pumpTypeSlug}/${routeSlug}`;
  const previewPath = seriesSlug
    ? `/products/pumps-db/${pumpTypeSlug}/${seriesSlug}/${routeSlug}`
    : `/products/pumps-db/${pumpTypeSlug}/${routeSlug}`;

  return {
    ...route,
    routeSlug,
    canonicalPath: officialPath,
    detailHref: officialPath,
    databasePreviewHref: previewPath,
    legacyRedirectFrom: text(route.legacyRedirectFrom),
    trailingSlashPolicy: "no_trailing_slash",
    routeEnabled: "yes",
  };
});

/* =========================================================
   2. 补齐选型卡片

   注意：
   这里先补“结构完整”的卡片，不代表最终正式文案。
   后续正式文案仍以你之前整理的详情页文案为准。
========================================================= */

const existingCardIds = new Set(cards.map((item) => text(item.productId)));

const cardDefaults = {
  "ea-100-pmma": {
    cardTitleZh: "EA-100-PMMA 柱塞泵",
    cardTitleEn: "100 µL PMMA Plunger Pump",
    cardSubtitleZh: "适用于精密液体分配与自动化仪器液路集成",
    cardSubtitleEn: "For precision dispensing and automated fluidic integration",
    cardDescriptionZh:
      "EA 系列柱塞泵适用于 IVD 分析仪、实验室自动化设备和分析仪器中的微量液体吸排、分配和转移场景。",
    cardDescriptionEn:
      "EA series plunger pumps support precision aspiration, dispensing, and transfer tasks in IVD analyzers, laboratory automation systems, and analytical instruments.",
    cardBadges: "Custom|Precision Dispensing|PMMA",
  },
  "ea-250-pmma": {
    cardTitleZh: "EA-250-PMMA 柱塞泵",
    cardTitleEn: "250 µL PMMA Plunger Pump",
    cardSubtitleZh: "适用于中小容量精密分配与自动化液路模块",
    cardSubtitleEn: "For medium-small volume precision dispensing and fluidic modules",
    cardDescriptionZh:
      "EA-250-PMMA 适用于自动化分析仪器中的试剂分配、样本转移和液路模块集成，最终配置需结合应用确认。",
    cardDescriptionEn:
      "EA-250-PMMA is used for reagent dispensing, sample transfer, and fluidic module integration in automated analytical instruments. Final configuration should be confirmed by application.",
    cardBadges: "Custom|250 µL|PMMA",
  },
  "sm-100-pmma": {
    cardTitleZh: "SM-100-PMMA 微型柱塞泵",
    cardTitleEn: "100 µL Miniature PMMA Plunger Pump",
    cardSubtitleZh: "适用于空间紧凑型仪器中的微量液体分配",
    cardSubtitleEn: "For micro-volume dispensing in compact instruments",
    cardDescriptionZh:
      "SM 系列微型柱塞泵适用于空间受限的自动化设备，可用于紧凑型液路系统中的微量吸排、分配和转移。",
    cardDescriptionEn:
      "SM series miniature plunger pumps are designed for space-limited automated instruments and compact fluidic systems requiring micro-volume aspiration, dispensing, and transfer.",
    cardBadges: "Custom|Miniature|PMMA",
  },
};

for (const product of products) {
  const productId = text(product.productId);

  if (!productId || existingCardIds.has(productId)) {
    continue;
  }

  const pumpTypeSlug = text(product.pumpTypeSlug || "plunger-pumps");
  const seriesSlug = text(product.seriesSlug);
  const routeSlug = text(product.routeSlug || product.slug);
  const capacity = text(product.capacity);
  const material = text(product.material);
  const defaults = cardDefaults[productId] || {};

  cards.push({
    productId,
    pumpTypeSlug,
    seriesSlug,
    cardTitleZh: defaults.cardTitleZh || `${text(product.internalModelRef)} 柱塞泵`,
    cardTitleEn: defaults.cardTitleEn || `${capacity} ${material} Plunger Pump`,
    cardSubtitleZh: defaults.cardSubtitleZh || "适用于自动化仪器液路集成",
    cardSubtitleEn: defaults.cardSubtitleEn || "For automated fluidic integration",
    cardDescriptionZh: defaults.cardDescriptionZh || "柱塞泵为定制化产品，具体配置需根据实际应用确认。",
    cardDescriptionEn: defaults.cardDescriptionEn || "Plunger pumps are custom-engineered products. Final configuration should be confirmed by application.",
    cardSpecsZh: `容量：${capacity}|泵头材料：${material}|类型：定制柱塞泵`,
    cardSpecsEn: `Volume: ${capacity}|Pump head: ${material}|Type: Custom plunger pump`,
    cardBadges: defaults.cardBadges || `Custom|${capacity}|${material}`,
    cardImage: `/images/products/pumps/plunger-pump/${text(product.seriesCode).toLowerCase()}/${productId}-card.webp`,
    detailHref: `/products/pumps/${pumpTypeSlug}/${routeSlug}`,
    databasePreviewHref: `/products/pumps-db/${pumpTypeSlug}/${seriesSlug}/${routeSlug}`,
    showInSelection: "yes",
    sort: text(product.sort) || 999,
  });
}

/* =========================================================
   3. 写回 xlsx
========================================================= */

writeSheet(routeSheet, routes);
writeSheet(cardSheet, cards);

XLSX.writeFile(wb, file);

console.log("✅ 已规范化泵系列数据源");
console.log("- 已区分 canonicalPath / databasePreviewHref");
console.log("- 已补齐缺失选型卡片");