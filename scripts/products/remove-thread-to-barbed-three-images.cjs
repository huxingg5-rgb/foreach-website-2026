/**
 * 移除螺纹转倒刺筛选页中指定的 3 张产品图
 *
 * 保留型号卡片，只清空 imageCard。
 * 同时给 JPG 导入脚本加入排除规则，避免以后重新导入。
 *
 * 使用：
 * node scripts/products/remove-thread-to-barbed-three-images.cjs
 */

const fs = require("fs");
const path = require("path");
const Module = require("module");
const ts = require("typescript");

const root = process.cwd();

const removedModels = [
  "SA-U32-24F-PP-N",
  "SA-U32-24F-PA-W",
  "SA-U32-16F-PA-W",
];

const removedModelKeys = new Set(
  removedModels.map((item) => item.toUpperCase())
);

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "thread-to-barbed-fitting-selection.generated.ts"
);

const importerPath = path.join(
  root,
  "scripts",
  "products",
  "import-thread-to-barbed-jpg-images.cjs"
);

const publicDir = path.join(
  root,
  "public",
  "images",
  "products",
  "fittings",
  "thread-to-barbed-fittings",
  "products"
);

function text(value) {
  return value == null ? "" : String(value).trim();
}

function normalizeModel(value) {
  return text(value)
    .replace(/[（(][^）)]*[）)]/g, "")
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
   指定型号产品图已移除
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

if (!fs.existsSync(generatedPath)) {
  throw new Error(`未找到筛选数据文件：${generatedPath}`);
}

const timestamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const generatedBackup =
  `${generatedPath}.bak_remove_three_images_${timestamp}`;

fs.copyFileSync(generatedPath, generatedBackup);

const generated = loadTsModule(generatedPath);

const products =
  generated.threadToBarbedFittingSelectionProducts || [];
const taxonomyItems =
  generated.threadToBarbedFittingTaxonomyItems || [];
const filterLabels =
  generated.threadToBarbedFittingFilterLabels || [];

const changedModels = [];

const nextProducts = products.map((product) => {
  const model = normalizeModel(
    product.model ||
      product.foreachModel ||
      product.cardTitle?.zh
  );

  if (!removedModelKeys.has(model)) {
    return product;
  }

  changedModels.push(model);

  return {
    ...product,
    imageCard: "",
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

const deletedPublicFiles = [];

for (const model of removedModels) {
  const filePath = path.join(
    publicDir,
    `${safeFileName(model)}.jpg`
  );

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    deletedPublicFiles.push(filePath);
  }
}

/*
 * 给 JPG 导入脚本增加排除规则。
 * 以后重新执行导入时，这三个型号仍保持无图。
 */
if (fs.existsSync(importerPath)) {
  const importerBackup =
    `${importerPath}.bak_exclude_three_images_${timestamp}`;

  fs.copyFileSync(importerPath, importerBackup);

  let importerSource = fs.readFileSync(
    importerPath,
    "utf8"
  );

  const marker =
    "THREAD_TO_BARBED_EXCLUDED_IMAGE_MODELS";

  if (!importerSource.includes(marker)) {
    const rootAnchor =
      'const root = process.cwd();';

    if (!importerSource.includes(rootAnchor)) {
      throw new Error(
        "未找到 JPG 导入脚本中的 root 锚点，未能加入排除规则。"
      );
    }

    const excludeBlock = `
/* THREAD_TO_BARBED_EXCLUDED_IMAGE_MODELS */
const excludedImageModelKeys = new Set([
  "SA-U32-24F-PP-N",
  "SA-U32-24F-PA-W",
  "SA-U32-16F-PA-W",
]);
`;

    importerSource = importerSource.replace(
      rootAnchor,
      `${rootAnchor}${excludeBlock}`
    );

    const mapAnchor = `const key = normalizeKey(model);
  const candidates = sourceMap.get(key) || [];`;

    if (!importerSource.includes(mapAnchor)) {
      throw new Error(
        "未找到 JPG 导入脚本中的型号匹配锚点，未能加入排除逻辑。"
      );
    }

    const excludeLogic = `const key = normalizeKey(model);

  if (excludedImageModelKeys.has(key)) {
    return {
      ...product,
      imageCard: "",
    };
  }

  const candidates = sourceMap.get(key) || [];`;

    importerSource = importerSource.replace(
      mapAnchor,
      excludeLogic
    );

    fs.writeFileSync(
      importerPath,
      importerSource,
      "utf8"
    );
  }
}

console.log("");
console.log("============================================");
console.log("指定的 3 张产品图已移除");
console.log("============================================");
console.log(`更新型号数量：${changedModels.length}`);
console.log(`删除 public 图片数量：${deletedPublicFiles.length}`);
console.log("");
console.log("型号：");
changedModels.forEach((model) =>
  console.log(`- ${model}`)
);
console.log("");
console.log(`数据备份：${generatedBackup}`);
console.log("型号卡片仍然保留。");
