/**
 * 调整螺纹转倒刺接头筛选顺序与分类
 *
 * 调整后：
 * 1. 密封方式排在连接结构前面
 * 2. SA / SAL = 螺纹密封
 * 3. SB / SBS / SBR = 底面密封
 * 4. SC = 内螺纹转倒刺
 * 5. SC 的连接结构改为直通型
 *
 * 同时修改：
 * - 当前生成数据
 * - 后续数据生成脚本
 *
 * 使用：
 * node scripts/products/fix-thread-to-barbed-filter-order.cjs
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

const generatorPath = path.join(
  root,
  "scripts",
  "products",
  "generate-thread-to-barbed-fitting-selection.cjs"
);

function text(value) {
  return value == null ? "" : String(value).trim();
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

function getSealingValue(seriesCode) {
  if (["SA", "SAL"].includes(seriesCode)) {
    return "螺纹密封";
  }

  if (["SB", "SBS", "SBR"].includes(seriesCode)) {
    return "底面密封";
  }

  if (seriesCode === "SC") {
    return "内螺纹转倒刺";
  }

  return "";
}

function getStructureValue(seriesCode) {
  if (seriesCode === "SAL") {
    return "L型";
  }

  if (seriesCode === "SBR") {
    return "可旋转直通型";
  }

  return "直通型";
}

function createGeneratedSource(
  products,
  taxonomyItems,
  filterLabels
) {
  return `/* =========================================================
   thread-to-barbed-fitting-selection.generated.ts
   来源：05_螺纹转倒刺接头
   数量：${products.length}
   筛选顺序：密封方式 → 连接结构 → 螺纹规格 → 接管内径 → 材质 → 颜色
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

const generatedBackup =
  `${generatedPath}.bak_filter_order_${timestamp}`;

fs.copyFileSync(
  generatedPath,
  generatedBackup
);

const generated = loadTsModule(generatedPath);

const products =
  generated.threadToBarbedFittingSelectionProducts || [];

const taxonomyItems =
  generated.threadToBarbedFittingTaxonomyItems || [];

const filterLabels =
  generated.threadToBarbedFittingFilterLabels || [];

const nextProducts = products.map((product) => {
  const seriesCode = getSeriesCode(product);
  const sealingValue = getSealingValue(seriesCode);
  const structureValue = getStructureValue(seriesCode);

  const nextSearchKeywords = {};

  for (const [locale, value] of Object.entries(
    product.searchKeywords || {}
  )) {
    nextSearchKeywords[locale] = text(value)
      .replace(/内螺纹连接/g, "内螺纹转倒刺")
      .replace(/内螺纹直通型/g, "直通型");
  }

  return {
    ...product,

    filters: {
      ...(product.filters || {}),
      filter01: structureValue,
      filter02: sealingValue,
    },

    connectionStructure: structureValue,
    sealingMethod: sealingValue,

    searchKeywords: nextSearchKeywords,
  };
});

const nextFilterLabels = filterLabels.map((label) => {
  if (label.filterKey === "filter02") {
    return {
      ...label,
      sortOrder: 10,
    };
  }

  if (label.filterKey === "filter01") {
    return {
      ...label,
      sortOrder: 20,
    };
  }

  return label;
});

fs.writeFileSync(
  generatedPath,
  createGeneratedSource(
    nextProducts,
    taxonomyItems,
    nextFilterLabels
  ),
  "utf8"
);

/*
 * 同步修改后续生成脚本，避免下次重新生成又恢复。
 */
let generatorUpdated = false;
let generatorBackup = "";

if (fs.existsSync(generatorPath)) {
  generatorBackup =
    `${generatorPath}.bak_filter_order_${timestamp}`;

  fs.copyFileSync(
    generatorPath,
    generatorBackup
  );

  let generatorSource = fs.readFileSync(
    generatorPath,
    "utf8"
  );

  generatorSource = generatorSource
    .replace(
      'structureZh: "内螺纹直通型"',
      'structureZh: "直通型"'
    )
    .replace(
      'sealingZh: "内螺纹连接"',
      'sealingZh: "内螺纹转倒刺"'
    )
    .replace(
      'sortOrder: (index + 1) * 10,',
      `sortOrder:
        definition.filterKey === "filter02"
          ? 10
          : definition.filterKey === "filter01"
            ? 20
            : (index + 1) * 10,`
    );

  fs.writeFileSync(
    generatorPath,
    generatorSource,
    "utf8"
  );

  generatorUpdated = true;
}

console.log("");
console.log("============================================");
console.log("筛选顺序与分类调整完成");
console.log("============================================");
console.log(`更新产品数量：${nextProducts.length}`);
console.log("");
console.log("筛选顺序：");
console.log("1. 密封方式");
console.log("2. 连接结构");
console.log("3. 螺纹规格");
console.log("4. 接管内径");
console.log("5. 材质");
console.log("6. 颜色");
console.log("");
console.log("密封方式：");
console.log("- SA / SAL：螺纹密封");
console.log("- SB / SBS / SBR：底面密封");
console.log("- SC：内螺纹转倒刺");
console.log("");
console.log(`数据备份：${generatedBackup}`);
console.log(
  generatorUpdated
    ? `生成脚本备份：${generatorBackup}`
    : "未找到原始生成脚本，仅修改当前数据。"
);
