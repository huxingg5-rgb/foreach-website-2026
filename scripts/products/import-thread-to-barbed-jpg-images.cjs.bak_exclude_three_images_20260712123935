/**
 * 导入螺纹转倒刺接头 JPG 产品图，并写入筛选卡片 imageCard
 *
 * 本步骤只处理 JPG：
 * 来源：
 * H:\01-官网项目\02_产品中心\fit\Thread with barb\螺纹转倒刺2D图_JPG
 *
 * 目标：
 * public/images/products/fittings/thread-to-barbed-fittings/products/
 *
 * 同时更新：
 * data/products/selection/thread-to-barbed-fitting-selection.generated.ts
 *
 * 不处理 PDF，不创建详情页。
 *
 * 使用：
 * node scripts/products/import-thread-to-barbed-jpg-images.cjs
 */

const fs = require("fs");
const path = require("path");
const Module = require("module");
const ts = require("typescript");

const root = process.cwd();
/* THREAD_TO_BARBED_EXCLUDED_IMAGE_MODELS */
const excludedImageModelKeys = new Set([
  "SA-U32-24F-PP-N",
  "SA-U32-24F-PA-W",
  "SA-U32-16F-PA-W",
]);


const sourceDir =
  process.argv[2] ||
  String.raw`H:\01-官网项目\02_产品中心\fit\Thread with barb\螺纹转倒刺2D图_JPG`;

const targetDir = path.join(
  root,
  "public",
  "images",
  "products",
  "fittings",
  "thread-to-barbed-fittings",
  "products"
);

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "thread-to-barbed-fitting-selection.generated.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "thread-to-barbed-jpg-import-report.json"
);

function text(value) {
  return value == null ? "" : String(value).trim();
}

function normalizeKey(value) {
  return text(value)
    .replace(/[（(][^）)]*[）)]/g, "")
    .replace(/\.[^.]+$/g, "")
    .trim()
    .toUpperCase();
}

function safeFileName(value) {
  return text(value)
    .toLowerCase()
    .replace(/μ/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

function createGeneratedSource(products, taxonomyItems, filterLabels) {
  return `/* =========================================================
   thread-to-barbed-fitting-selection.generated.ts
   来源：05_螺纹转倒刺接头
   数量：${products.length}
   产品图：已从螺纹转倒刺2D图_JPG导入
   自动生成，请勿手工修改
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

if (!fs.existsSync(sourceDir)) {
  throw new Error(`未找到 JPG 源目录：${sourceDir}`);
}

if (!fs.existsSync(generatedPath)) {
  throw new Error(`未找到筛选数据文件：${generatedPath}`);
}

fs.mkdirSync(targetDir, { recursive: true });
fs.mkdirSync(path.dirname(reportPath), { recursive: true });

const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((name) => /\.(jpg|jpeg)$/i.test(name))
  .sort((a, b) => a.localeCompare(b, "zh-CN", { numeric: true }));

if (sourceFiles.length === 0) {
  throw new Error(`JPG 源目录中没有图片：${sourceDir}`);
}

const sourceMap = new Map();

for (const fileName of sourceFiles) {
  const key = normalizeKey(fileName);

  if (!sourceMap.has(key)) {
    sourceMap.set(key, []);
  }

  sourceMap.get(key).push(fileName);
}

const generated = loadTsModule(generatedPath);

const products =
  generated.threadToBarbedFittingSelectionProducts || [];
const taxonomyItems =
  generated.threadToBarbedFittingTaxonomyItems || [];
const filterLabels =
  generated.threadToBarbedFittingFilterLabels || [];

const matched = [];
const unmatchedProducts = [];
const usedSourceFiles = new Set();

const nextProducts = products.map((product) => {
  const model = text(
    product.model ||
      product.foreachModel ||
      product.cardTitle?.zh
  );

  const key = normalizeKey(model);

  if (excludedImageModelKeys.has(key)) {
    return {
      ...product,
      imageCard: "",
    };
  }

  const candidates = sourceMap.get(key) || [];

  if (candidates.length === 0) {
    unmatchedProducts.push({
      productCode: product.productCode || product.productId,
      model,
      normalizedKey: key,
    });

    return product;
  }

  const sourceFileName = candidates[0];
  const sourcePath = path.join(sourceDir, sourceFileName);
  const targetFileName = `${safeFileName(model)}.jpg`;
  const targetPath = path.join(targetDir, targetFileName);

  fs.copyFileSync(sourcePath, targetPath);
  usedSourceFiles.add(sourceFileName);

  const publicPath =
    `/images/products/fittings/thread-to-barbed-fittings/products/${targetFileName}`;

  matched.push({
    productCode: product.productCode || product.productId,
    model,
    sourceFileName,
    targetFileName,
    imageCard: publicPath,
  });

  return {
    ...product,
    imageCard: publicPath,
  };
});

const unusedSourceFiles = sourceFiles
  .filter((fileName) => !usedSourceFiles.has(fileName))
  .map((fileName) => ({
    fileName,
    normalizedKey: normalizeKey(fileName),
  }));

const duplicateSourceKeys = Array.from(sourceMap.entries())
  .filter(([, fileNames]) => fileNames.length > 1)
  .map(([normalizedKey, fileNames]) => ({
    normalizedKey,
    fileNames,
  }));

const timestamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backupPath =
  `${generatedPath}.bak_jpg_import_${timestamp}`;

fs.copyFileSync(generatedPath, backupPath);

fs.writeFileSync(
  generatedPath,
  createGeneratedSource(
    nextProducts,
    taxonomyItems,
    filterLabels
  ),
  "utf8"
);

const report = {
  generatedAt: new Date().toISOString(),
  sourceDir,
  targetDir,
  generatedPath,
  backupPath,
  totalProducts: products.length,
  totalSourceImages: sourceFiles.length,
  matchedProductCount: matched.length,
  unmatchedProductCount: unmatchedProducts.length,
  unusedSourceImageCount: unusedSourceFiles.length,
  duplicateSourceKeyCount: duplicateSourceKeys.length,
  matched,
  unmatchedProducts,
  unusedSourceFiles,
  duplicateSourceKeys,
};

fs.writeFileSync(
  reportPath,
  JSON.stringify(report, null, 2) + "\n",
  "utf8"
);

console.log("");
console.log("============================================");
console.log("螺纹转倒刺接头 JPG 产品图导入完成");
console.log("============================================");
console.log(`筛选产品数量：${products.length}`);
console.log(`JPG 文件数量：${sourceFiles.length}`);
console.log(`成功匹配产品：${matched.length}`);
console.log(`未匹配产品：${unmatchedProducts.length}`);
console.log(`未使用图片：${unusedSourceFiles.length}`);
console.log(`目标目录：${targetDir}`);
console.log(`数据文件：${generatedPath}`);
console.log(`报告文件：${reportPath}`);
console.log("");
console.log("本步骤未处理 PDF。");
console.log("本步骤未新增详情页。");
