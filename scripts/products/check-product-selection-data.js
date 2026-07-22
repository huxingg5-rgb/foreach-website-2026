const fs = require("fs");
const path = require("path");

const root = process.cwd();

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "product-selection.generated.ts"
);

if (!fs.existsSync(generatedPath)) {
  console.error("找不到 product-selection.generated.ts，请先运行 products:build-data。");
  process.exit(1);
}

const code = fs.readFileSync(generatedPath, "utf8");

function readExportedJsonArray(exportName) {
  const startKey = `export const ${exportName}`;
  const start = code.indexOf(startKey);

  if (start === -1) {
    throw new Error(`找不到导出数据：${exportName}`);
  }

  const equalIndex = code.indexOf("=", start);

  if (equalIndex === -1) {
    throw new Error(`找不到 ${exportName} 的赋值符号`);
  }

  let end = code.indexOf("\n\nexport const ", equalIndex + 1);

  if (end === -1) {
    end = code.indexOf(";\n", equalIndex + 1);
  }

  if (end === -1) {
    end = code.length;
  }

  const jsonText = code
    .slice(equalIndex + 1, end)
    .trim()
    .replace(/;$/, "")
    .trim();

  return JSON.parse(jsonText);
}

function toPublicFilePath(imagePath) {
  const clean = String(imagePath || "").replace(/^\/+/, "");
  return path.join(root, "public", clean);
}

const products = readExportedJsonArray("selectionProducts");
const filterLabels = readExportedJsonArray("selectionFilterLabels");
const taxonomyItems = readExportedJsonArray("selectionTaxonomyItems");

const errors = [];
const warnings = [];

const productIdMap = new Map();

for (const product of products) {
  if (!product.productId) {
    errors.push("存在缺少 productId 的产品。");
    continue;
  }

  if (productIdMap.has(product.productId)) {
    errors.push(`产品 ID 重复：${product.productId}`);
  }

  productIdMap.set(product.productId, product);

  if (!product.categoryId) {
    errors.push(`${product.productId} 缺少 categoryId`);
  }

  if (!product.productTypeId) {
    errors.push(`${product.productId} 缺少 productTypeId`);
  }

  if (!product.seriesId) {
    warnings.push(`${product.productId} 缺少 seriesId`);
  }

  if (!product.cardTitle?.zh) {
    errors.push(`${product.productId} 缺少中文卡片标题 cardTitle.zh`);
  }

  if (!product.cardSubtitle?.zh) {
    warnings.push(`${product.productId} 缺少中文卡片副标题 cardSubtitle.zh`);
  }

  if (product.status === "active") {
    if (!product.imageCard) {
      errors.push(`${product.productId} 是 active 状态，但 imageCard 为空`);
    } else if (!product.imageCard.startsWith("/images/")) {
      errors.push(`${product.productId} 的 imageCard 必须以 /images/ 开头：${product.imageCard}`);
    } else {
      const imageFilePath = toPublicFilePath(product.imageCard);

      if (!fs.existsSync(imageFilePath)) {
        errors.push(`${product.productId} 图片不存在：${product.imageCard}`);
      }
    }
  }

  if (!product.detailSlug) {
    warnings.push(`${product.productId} 缺少 detailSlug，后续详情页无法准确跳转`);
  }
}

const taxonomyKeySet = new Set(
  taxonomyItems.map((item) => `${item.type}::${item.id}`)
);

const filterLabelKeySet = new Set(
  filterLabels.map(
    (item) => `${item.categoryId}::${item.productTypeId}::${item.filterKey}`
  )
);

for (const product of products) {
  if (product.categoryId && !taxonomyKeySet.has(`category::${product.categoryId}`)) {
    warnings.push(`${product.productId} 的 categoryId 未在 taxonomy 中配置：${product.categoryId}`);
  }

  if (
    product.productTypeId &&
    !taxonomyKeySet.has(`productType::${product.productTypeId}`)
  ) {
    warnings.push(`${product.productId} 的 productTypeId 未在 taxonomy 中配置：${product.productTypeId}`);
  }

  if (product.seriesId && !taxonomyKeySet.has(`series::${product.seriesId}`)) {
    warnings.push(`${product.productId} 的 seriesId 未在 taxonomy 中配置：${product.seriesId}`);
  }

  const filters = product.filters || {};

  for (const filterKey of Object.keys(filters)) {
    const labelKey = `${product.categoryId}::${product.productTypeId}::${filterKey}`;

    if (!filterLabelKeySet.has(labelKey)) {
      warnings.push(`${product.productId} 使用了 ${filterKey}，但 selection_filter_labels 中没有对应标签`);
    }
  }
}

for (const label of filterLabels) {
  const hasValue = products.some((product) => {
    return (
      product.categoryId === label.categoryId &&
      product.productTypeId === label.productTypeId &&
      product.filters &&
      product.filters[label.filterKey]
    );
  });

  if (label.visible && !hasValue) {
    warnings.push(
      `${label.categoryId}/${label.productTypeId}/${label.filterKey} 设置为 visible，但没有任何产品使用该字段`
    );
  }
}

console.log("");
console.log("产品中心选型数据巡检结果：");
console.log(`- 产品数量：${products.length}`);
console.log(`- active 产品数量：${products.filter((item) => item.status === "active").length}`);
console.log(`- 筛选标签数量：${filterLabels.length}`);
console.log(`- 分类多语言数量：${taxonomyItems.length}`);
console.log(`- 错误数量：${errors.length}`);
console.log(`- 提示数量：${warnings.length}`);

if (warnings.length > 0) {
  console.log("");
  console.log("提示：");
  warnings.forEach((item) => console.log(`- ${item}`));
}

if (errors.length > 0) {
  console.log("");
  console.log("错误：");
  errors.forEach((item) => console.log(`- ${item}`));
  process.exit(1);
}

console.log("");
console.log("巡检通过。");
