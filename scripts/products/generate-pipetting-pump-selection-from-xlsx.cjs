const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const source = path.join(
  process.cwd(),
  "data-source/product-center/pumps/FOREACH_移液泵系列_产品数据源.xlsx"
);

const output = path.join(
  process.cwd(),
  "data/products/selection/pipetting-pump-selection.generated.ts"
);

if (!fs.existsSync(source)) {
  throw new Error(`未找到数据源：${source}`);
}

function readSheet(workbook, name) {
  const sheet = workbook.Sheets[name];
  if (!sheet) {
    throw new Error(`未找到工作表：${name}`);
  }
  return XLSX.utils.sheet_to_json(sheet, { defval: "" });
}

function bool(value) {
  return String(value).trim().toUpperCase() === "TRUE";
}

function splitTags(value) {
  return String(value || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function q(value) {
  return JSON.stringify(value ?? "");
}

const workbook = XLSX.readFile(source);
const rows = readSheet(workbook, "selection").filter((row) => {
  return String(row.enabled).trim().toUpperCase() !== "FALSE";
});

if (rows.length !== 3) {
  throw new Error(`移液泵选型卡片数量应为 3，当前为 ${rows.length}`);
}

const productBlocks = rows
  .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
  .map((row) => {
    const zhKeywords = [
      row.model,
      row.productTypeNameZh,
      row.seriesNameZh,
      row.pumpType,
      row.volume,
      row.cardLine1Zh,
      row.cardLine2Zh,
      row.cardLine3Zh,
      ...splitTags(row.tagsZh),
    ].filter(Boolean).join(" ");

    const enKeywords = [
      row.model,
      row.productTypeNameEn,
      row.seriesNameEn,
      row.volume,
      row.cardLine1En,
      row.cardLine2En,
      row.cardLine3En,
      ...splitTags(row.tagsEn),
    ].filter(Boolean).join(" ");

    return `  {
    productId: ${q(row.productId)},
    categoryId: ${q(row.categoryId)},
    productTypeId: ${q(row.productTypeId)},
    seriesId: ${q(row.seriesId)},
    seriesSlug: ${q(row.seriesSlug)},
    detailSlug: ${q(row.detailSlug)},
    cardTitle: {
      zh: ${q(row.model)},
      en: ${q(row.model)},
    },
    cardSubtitle: {
      zh: ${q(`${row.cardLine1Zh}\n${row.cardLine2Zh}\n${row.cardLine3Zh}`)},
      en: ${q(`${row.cardLine1En}\n${row.cardLine2En}\n${row.cardLine3En}`)},
    },
    imageCard: "",
    imageAlt: {
      zh: ${q(row.imageAltZh)},
      en: ${q(row.imageAltEn)},
    },
    categoryName: {
      zh: "泵",
      en: "Pumps",
    },
    productTypeName: {
      zh: ${q(row.productTypeNameZh)},
      en: ${q(row.productTypeNameEn)},
    },
    seriesName: {
      zh: ${q(row.seriesNameZh)},
      en: ${q(row.seriesNameEn)},
    },
    filters: {
      filter01: ${q(row.pumpType)},
      filter02: ${q(row.volume)},
    },
    filter01: ${q(row.pumpType)},
    filter02: ${q(row.volume)},
    tags: ${JSON.stringify(splitTags(row.tagsZh), null, 6).replace(/\n/g, "\n    ")},
    needDrawing: ${bool(row.needDrawing)},
    needModel3d: ${bool(row.needModel3d)},
    status: "active",
    sortOrder: ${Number(row.sortOrder || 999)},
    searchKeywords: {
      zh: ${q(zhKeywords)},
      en: ${q(enKeywords)},
    },
    source: "pipetting-pump-xlsx",
    reservedConfigSlug: ${q(row.detailSlug)},
  }`;
  })
  .join(",\n");

const result = `import type { ProductSelectionProduct, ProductSelectionFilterLabel } from "./product-selection.types";

export const pipettingPumpSelectionProducts = [
${productBlocks}
] as unknown as ProductSelectionProduct[];

export const pipettingPumpFilterLabels: ProductSelectionFilterLabel[] = [
  {
    categoryId: "pumps",
    productTypeId: "pipette-pump",
    filterKey: "filter01",
    inputType: "single",
    label: {
      zh: "泵类型",
      en: "Pump Type",
      es: "Pump Type",
      fr: "Pump Type",
      ko: "Pump Type",
      ru: "Pump Type",
    },
    visible: true,
    sortOrder: 10,
  },
  {
    categoryId: "pumps",
    productTypeId: "pipette-pump",
    filterKey: "filter02",
    inputType: "multiple",
    label: {
      zh: "量程",
      en: "Volume",
      es: "Volume",
      fr: "Volume",
      ko: "Volume",
      ru: "Volume",
    },
    visible: true,
    sortOrder: 20,
  },
];
`;

fs.writeFileSync(output, result, "utf8");

console.log("generated:", output);
console.log("rows:", rows.length);
