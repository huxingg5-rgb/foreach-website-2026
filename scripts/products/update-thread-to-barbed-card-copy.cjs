/**
 * 修改螺纹转倒刺接头筛选卡片三行文案
 *
 * 只更新：
 * data/products/selection/thread-to-barbed-fitting-selection.generated.ts
 *
 * 不修改：
 * - 筛选字段
 * - 产品图片
 * - 页面路由
 * - 详情页
 *
 * 使用：
 * node scripts/products/update-thread-to-barbed-card-copy.cjs
 */

const fs = require("fs");
const path = require("path");
const Module = require("module");
const ts = require("typescript");

const root = process.cwd();

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "thread-to-barbed-fitting-selection.generated.ts"
);

function text(value) {
  return value == null ? "" : String(value).trim();
}

function localized(zh, en) {
  return {
    zh,
    en,
    es: en,
    fr: en,
    ko: en,
    ru: en,
  };
}

function loadTsModule(filePath) {
  const source = fs.readFileSync(filePath, "utf8");

  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: filePath,
  }).outputText;

  const loaded = new Module(filePath, module);
  loaded.filename = filePath;
  loaded.paths = Module._nodeModulePaths(path.dirname(filePath));
  loaded._compile(compiled, filePath);

  return loaded.exports;
}

function getSeriesCode(product) {
  return text(
    product.seriesCode ||
      product.seriesId ||
      product.model?.split("-")[0]
  ).toUpperCase();
}

function getFirstLineZh(seriesCode) {
  const map = {
    SA: "直通螺纹密封螺纹转倒刺接头",
    SAL: "L型螺纹密封螺纹转倒刺接头",
    SB: "直通底面密封螺纹转倒刺接头",
    SBS: "直通底面密封螺纹转倒刺接头",
    SBR: "可旋转底面密封螺纹转倒刺接头",
    SC: "直通内螺纹转倒刺接头",
  };

  return map[seriesCode] || "螺纹转倒刺接头";
}

function getFirstLineEn(seriesCode) {
  const map = {
    SA: "Straight Thread-Seal Thread to Barb Fitting",
    SAL: "Elbow Thread-Seal Thread to Barb Fitting",
    SB: "Straight Bottom-Face-Seal Thread to Barb Fitting",
    SBS: "Straight Bottom-Face-Seal Thread to Barb Fitting",
    SBR: "Swivel Bottom-Face-Seal Thread to Barb Fitting",
    SC: "Straight Female Thread to Barb Fitting",
  };

  return map[seriesCode] || "Thread to Barb Fitting";
}

function createGeneratedSource(products, taxonomyItems, filterLabels) {
  return `/* =========================================================
   thread-to-barbed-fitting-selection.generated.ts
   来源：05_螺纹转倒刺接头
   数量：${products.length}
   卡片文案：三行精简版
   ========================================================= */

import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
  ProductSelectionTaxonomyItem,
} from "./product-selection.types";

export const threadToBarbedFittingSelectionProducts =
${JSON.stringify(products, null, 2)} as ProductSelectionProduct[];

export const threadToBarbedFittingTaxonomyItems =
${JSON.stringify(taxonomyItems, null, 2)} as ProductSelectionTaxonomyItem[];

export const threadToBarbedFittingFilterLabels =
${JSON.stringify(filterLabels, null, 2)} as ProductSelectionFilterLabel[];
`;
}

if (!fs.existsSync(generatedPath)) {
  throw new Error(`未找到筛选数据文件：${generatedPath}`);
}

const timestamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backupPath =
  `${generatedPath}.bak_card_copy_${timestamp}`;

fs.copyFileSync(generatedPath, backupPath);

const generated = loadTsModule(generatedPath);

const products =
  generated.threadToBarbedFittingSelectionProducts || [];
const taxonomyItems =
  generated.threadToBarbedFittingTaxonomyItems || [];
const filterLabels =
  generated.threadToBarbedFittingFilterLabels || [];

const nextProducts = products.map((product) => {
  const seriesCode = getSeriesCode(product);
  const filters = product.filters || {};

  const thread = text(
    filters.filter03 ||
      product.threadSpecification
  );

  const tubeId = text(
    filters.filter04 ||
      product.tubingInnerDiameter
  );

  const material = text(
    filters.filter05 ||
      product.materialCode
  );

  const line1Zh = getFirstLineZh(seriesCode);
  const line2Zh = `适配${thread}转${tubeId}内径软管`;
  const line3Zh = `${material}材质`;

  const line1En = getFirstLineEn(seriesCode);
  const line2En = `Fits ${thread} to ${tubeId} ID tubing`;
  const line3En = `${material} material`;

  return {
    ...product,
    cardSubtitle: localized(
      `${line1Zh}\n${line2Zh}\n${line3Zh}`,
      `${line1En}\n${line2En}\n${line3En}`
    ),
  };
});

fs.writeFileSync(
  generatedPath,
  createGeneratedSource(
    nextProducts,
    taxonomyItems,
    filterLabels
  ),
  "utf8"
);

console.log("");
console.log("============================================");
console.log("螺纹转倒刺接头卡片文案修改完成");
console.log("============================================");
console.log(`更新卡片数量：${nextProducts.length}`);
console.log(`数据文件：${generatedPath}`);
console.log(`备份文件：${backupPath}`);
console.log("");
console.log("示例：");
console.log("直通螺纹密封螺纹转倒刺接头");
console.log("适配10-32 UNF转2.4 mm内径软管");
console.log("PP材质");
