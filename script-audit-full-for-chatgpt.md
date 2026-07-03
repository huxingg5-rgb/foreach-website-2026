# FOREACH 官网脚本源码审查文件

生成时间：07/02/2026 20:42:14
项目路径：F:\WebsiteProjects\foreach-website-2026

---

## package.json

文件路径：package.json

```ts
{
  "name": "foreach-website-2026",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "products:build-data": "node ./scripts/products/build-product-selection-data.js",
    "products:check-data": "node ./scripts/products/check-product-selection-data.js",
    "products:update": "npm run products:build-data && npm run products:check-data"
  },
  "dependencies": {
    "@google/model-viewer": "^4.3.1",
    "next": "16.2.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.6",
    "tailwindcss": "^4",
    "tsx": "^4.22.4",
    "typescript": "^5"
  }
}

```

---

## scripts 目录脚本：add-ea-placeholder-faq.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\add-ea-placeholder-faq.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "data",
  "products",
  "detail",
  "product-detail-faq.zh.ts"
);

if (!fs.existsSync(file)) {
  console.error("找不到 FAQ 文件，请先执行 add-series-faq-structure.js");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-add-ea-placeholder-faq-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

content = content.replace(
  /"EA常规柱塞泵":\s*\[\s*\]/,
  `"EA常规柱塞泵": [
    {
      question: "EA 常规柱塞泵适合哪些应用场景？",
      answer:
        "EA 常规柱塞泵适用于 IVD 诊断设备、生命科学仪器、实验室自动化设备和分析仪器中的试剂分配、定量输送和液路集成场景。",
    },
  ]`
);

fs.writeFileSync(file, content, "utf8");

console.log("已添加 EA 常规柱塞泵 FAQ 占位内容。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：add-faq-bottom-space.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\add-faq-bottom-space.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-faq-bottom-space-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH product detail FAQ bottom space START ===== */";
const endMarker = "/* ===== FOREACH product detail FAQ bottom space END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  FAQ 与页脚之间的底部留白：
  - 避免 FAQ 卡片直接贴到 footer 灰色区域
  - 只影响产品详情页 FAQ 下方
*/

.faqSection {
  margin-bottom: 56px !important;
}

@media (max-width: 768px) {
  .faqSection {
    margin-bottom: 36px !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已增加 FAQ 与页脚之间的底部留白。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：add-series-faq-structure.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\add-series-faq-structure.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();

const faqFile = path.join(
  root,
  "data",
  "products",
  "detail",
  "product-detail-faq.zh.ts"
);

const serviceFile = path.join(
  root,
  "services",
  "products",
  "detail",
  "getProductDetailPageData.ts"
);

const typeFile = path.join(
  root,
  "data",
  "products",
  "detail",
  "product-detail.types.ts"
);

const clientFile = path.join(
  root,
  "components",
  "products",
  "detail",
  "ProductDetailClient.tsx"
);

const cssFile = path.join(
  root,
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

function backup(file) {
  if (!fs.existsSync(file)) return;
  const time = new Date().toISOString().replace(/[:.]/g, "-");
  fs.copyFileSync(file, `${file}.backup-series-faq-${time}`);
}

/* =========================================================
   1. 新增 FAQ 数据文件
   说明：
   - FAQ 按产品系列维护
   - 当前先建立结构
   - 没有最终文案时，可以保持数组为空
========================================================= */
backup(faqFile);

const faqContent = `/* =========================================================
   产品详情页 FAQ 数据
   规则：
   1. FAQ 按产品系列维护
   2. 不按单个型号重复维护
   3. 页面会根据 faqSeries / faqKey 自动读取
========================================================= */

export type ProductDetailFaqZhItem = {
  question: string;
  answer: string;
};

export const productDetailFaqZhBySeries: Record<
  string,
  ProductDetailFaqZhItem[]
> = {
  /*
   * EA-100-PMMA / EA-100-PEEK / EA-250-PMMA 等
   * 同属 EA 常规柱塞泵系列，后续统一在这里补 FAQ。
   */
  "EA常规柱塞泵": [],
};

export function getProductDetailFaqZhBySeries(
  series?: string,
): ProductDetailFaqZhItem[] {
  if (!series) {
    return [];
  }

  return productDetailFaqZhBySeries[series] ?? [];
}
`;

fs.writeFileSync(faqFile, faqContent, "utf8");

/* =========================================================
   2. 更新类型：ProductDetailPageData 增加 faqs
========================================================= */
backup(typeFile);

let typeContent = fs.readFileSync(typeFile, "utf8");

if (!typeContent.includes("export type ProductDetailFaqItem")) {
  typeContent = typeContent.replace(
    /export type ProductDetailCategory[\s\S]*?;/,
    (match) => `${match}

export type ProductDetailFaqItem = {
  question: string;
  answer: string;
};`
  );
}

if (!typeContent.includes("faqs?: ProductDetailFaqItem[]")) {
  typeContent = typeContent.replace(
    /faqKey\?: string;/,
    `faqKey?: string;

  /**
   * FAQ 按产品系列读取。
   * 没有配置 FAQ 时不渲染。
   */
  faqs?: ProductDetailFaqItem[];`
  );
}

fs.writeFileSync(typeFile, typeContent, "utf8");

/* =========================================================
   3. 更新详情页 service：根据 faqSeries 读取 FAQ
========================================================= */
backup(serviceFile);

let serviceContent = fs.readFileSync(serviceFile, "utf8");

if (!serviceContent.includes("getProductDetailFaqZhBySeries")) {
  serviceContent = serviceContent.replace(
    /import type \{/,
    `import { getProductDetailFaqZhBySeries } from "@/data/products/detail/product-detail-faq.zh";

import type {`
  );
}

if (!serviceContent.includes("faqs: getProductDetailFaqZhBySeries")) {
  serviceContent = serviceContent.replace(
    /faqKey: detailRecord\.faqSeries \|\| undefined,/,
    `faqKey: detailRecord.faqSeries || undefined,
    faqs: getProductDetailFaqZhBySeries(
      detailRecord.faqSeries,
    ),`
  );
}

fs.writeFileSync(serviceFile, serviceContent, "utf8");

/* =========================================================
   4. 更新详情页组件：规格区下面渲染 FAQ
   有 FAQ 才显示，空数组不显示
========================================================= */
backup(clientFile);

let clientContent = fs.readFileSync(clientFile, "utf8");

if (!clientContent.includes("styles.faqSection")) {
  const insertAfter = `        </section>`;

  const faqBlock = `
        {data.faqs && data.faqs.length > 0 ? (
          <section className={styles.faqSection}>
            <div className={styles.faqHeader}>
              <h2>常见问题</h2>
              <p>FAQ</p>
            </div>

            <div className={styles.faqList}>
              {data.faqs.map((item, index) => (
                <article
                  className={styles.faqItem}
                  key={\`\${item.question}-\${index}\`}
                >
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
`;

  const firstIndex = clientContent.indexOf(insertAfter, clientContent.indexOf("detailSection"));
  if (firstIndex !== -1) {
    clientContent =
      clientContent.slice(0, firstIndex + insertAfter.length) +
      faqBlock +
      clientContent.slice(firstIndex + insertAfter.length);
  } else {
    console.warn("没有找到 detailSection 结束位置，请手动检查 ProductDetailClient.tsx。");
  }
}

fs.writeFileSync(clientFile, clientContent, "utf8");

/* =========================================================
   5. 增加 FAQ 样式
========================================================= */
backup(cssFile);

let cssContent = fs.readFileSync(cssFile, "utf8");

const startMarker = "/* ===== FOREACH product detail FAQ START ===== */";
const endMarker = "/* ===== FOREACH product detail FAQ END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}`,
  "g"
);

cssContent = cssContent.replace(markerPattern, "").trimEnd();

const faqCss = `
${startMarker}

.faqSection {
  margin-top: 56px;
  padding-top: 40px;
  border-top: 1px solid #dbe3ee;
}

.faqHeader {
  margin-bottom: 26px;
}

.faqHeader h2 {
  margin: 0;
  color: #0b2f5b;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.25;
}

.faqHeader p {
  margin: 8px 0 0;
  color: #708096;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.faqList {
  display: grid;
  gap: 14px;
}

.faqItem {
  padding: 22px 26px;
  border: 1px solid #dbe3ee;
  background: #ffffff;
}

.faqItem h3 {
  margin: 0;
  color: #0b2f5b;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.45;
}

.faqItem p {
  margin: 10px 0 0;
  color: #32445d;
  font-size: 15px;
  line-height: 1.75;
}

@media (max-width: 768px) {
  .faqSection {
    margin-top: 36px;
    padding-top: 28px;
  }

  .faqHeader h2 {
    font-size: 24px;
  }

  .faqItem {
    padding: 18px 16px;
  }
}

${endMarker}
`;

cssContent = `${cssContent}\n\n${faqCss}\n`;

fs.writeFileSync(cssFile, cssContent, "utf8");

console.log("已完成系列 FAQ 结构搭建。");
console.log("新增文件：", faqFile);
console.log("已更新：", typeFile);
console.log("已更新：", serviceFile);
console.log("已更新：", clientFile);
console.log("已更新：", cssFile);

```

---

## scripts 目录脚本：build-product-selection-data.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\build-product-selection-data.js

```ts
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

const root = process.cwd();

const sourceRoot = path.join(root, "data-source", "product-center");
const outputDir = path.join(root, "data", "products", "selection");

const typePath = path.join(outputDir, "product-selection.types.ts");
const generatedPath = path.join(outputDir, "product-selection.generated.ts");
const summaryPath = path.join(outputDir, "product-selection.summary.json");

const locales = ["zh", "en", "es", "fr", "ko", "ru"];

const filterKeys = Array.from({ length: 8 }, (_, index) => {
  return `filter${String(index + 1).padStart(2, "0")}`;
});

function cleanCell(value) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\r\n/g, "\n").trim();
}

function cleanRow(row) {
  const next = {};

  Object.entries(row).forEach(([key, value]) => {
    const cleanKey = cleanCell(key);
    if (!cleanKey) return;
    next[cleanKey] = cleanCell(value);
  });

  return next;
}

function hasAnyValue(row) {
  return Object.values(row).some((value) => cleanCell(value));
}

function readSheet(workbook, sheetName, sourceFile) {
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    console.warn(`跳过 Sheet：${sheetName}，文件中不存在：${sourceFile}`);
    return [];
  }

  return xlsx.utils
    .sheet_to_json(sheet, { defval: "", raw: false })
    .map(cleanRow)
    .filter(hasAnyValue);
}

function toNumber(value, fallback = 0) {
  const text = cleanCell(value);
  if (!text) return fallback;

  const number = Number(text);

  if (Number.isFinite(number)) {
    return number;
  }

  return fallback;
}

function toVisible(value) {
  const text = cleanCell(value).toLowerCase();
  return ["yes", "true", "1", "y", "显示", "是"].includes(text);
}

function findSelectionFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`找不到源数据目录：${dir}`);
    process.exit(1);
  }

  const files = [];

  function walk(currentDir) {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (
        entry.isFile() &&
        entry.name.endsWith("-selection.xlsx") &&
        !entry.name.startsWith("~$")
      ) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);

  return files.sort();
}

function pickLabel(row, prefix = "label") {
  const label = {};

  locales.forEach((locale) => {
    const key =
      locale === "zh"
        ? `${prefix}Zh`
        : locale === "en"
          ? `${prefix}En`
          : locale === "es"
            ? `${prefix}Es`
            : locale === "fr"
              ? `${prefix}Fr`
              : locale === "ko"
                ? `${prefix}Ko`
                : `${prefix}Ru`;

    label[locale] = cleanCell(row[key]);
  });

  return label;
}

function pickTaxonomyLabel(row) {
  const label = {};

  locales.forEach((locale) => {
    label[locale] = cleanCell(row[locale]);
  });

  return label;
}

function writeTypes() {
  const content = `/* =========================================================
   product-selection.types.ts
   产品中心｜选型页数据类型

   说明：
   1. 本文件由脚本生成 / 维护
   2. 产品中心选型页统一使用 filter01 ~ filter08
   3. 前端显示名称由 selection_filter_labels 控制
========================================================= */

export type SelectionLocale = "zh" | "en" | "es" | "fr" | "ko" | "ru";

export type SelectionI18nText = Record<SelectionLocale, string>;

export type SelectionStatus = "active" | "draft" | "hidden";

export type SelectionInputType = "single" | "multiple";

export type SelectionFilterKey =
  | "filter01"
  | "filter02"
  | "filter03"
  | "filter04"
  | "filter05"
  | "filter06"
  | "filter07"
  | "filter08";

export interface ProductSelectionProduct {
  productId: string;
  categoryId: string;
  productTypeId: string;
  seriesId: string;
  cardTitle: {
    zh: string;
    en: string;
  };
  cardSubtitle: {
    zh: string;
    en: string;
  };
  filters: Partial<Record<SelectionFilterKey, string>>;
  imageCard: string;
  detailSlug: string;
  status: SelectionStatus;
  sortOrder: number;
  searchKeywords: {
    zh: string;
    en: string;
  };
}

export interface ProductSelectionFilterLabel {
  categoryId: string;
  productTypeId: string;
  filterKey: SelectionFilterKey;
  label: SelectionI18nText;
  inputType: SelectionInputType;
  sortOrder: number;
  visible: boolean;
}

export interface ProductSelectionTaxonomyItem {
  type: string;
  id: string;
  label: SelectionI18nText;
  sortOrder: number;
}

/* =========================================================
   临时兼容旧产品选型数据文件

   后续旧 data / services 清理完成后，可删除这些宽松类型。
========================================================= */

export type ProductSelectionCategory = Record<string, any>;
export type ProductSelectionPageData = Record<string, any>;
export type ProductSelectionLocale = SelectionLocale;
`;

  fs.writeFileSync(typePath, content, "utf8");
}

function parseWorkbook(filePath) {
  const workbook = xlsx.readFile(filePath);
  const relativeSource = path.relative(root, filePath).replace(/\\/g, "/");

  const productRows = readSheet(workbook, "selection_products", relativeSource);
  const filterLabelRows = readSheet(
    workbook,
    "selection_filter_labels",
    relativeSource
  );
  const taxonomyRows = readSheet(
    workbook,
    "selection_taxonomy_i18n",
    relativeSource
  );

  const products = productRows.map((row) => {
    const filters = {};

    filterKeys.forEach((key) => {
      const value = cleanCell(row[key]);

      if (value) {
        filters[key] = value;
      }
    });

    return {
      productId: cleanCell(row.productId),
      categoryId: cleanCell(row.categoryId),
      productTypeId: cleanCell(row.productTypeId),
      seriesId: cleanCell(row.seriesId),
      cardTitle: {
        zh: cleanCell(row.cardTitleZh),
        en: cleanCell(row.cardTitleEn),
      },
      cardSubtitle: {
        zh: cleanCell(row.cardSubtitleZh),
        en: cleanCell(row.cardSubtitleEn),
      },
      filters,
      imageCard: cleanCell(row.imageCard),
      detailSlug: cleanCell(row.detailSlug),
      status: cleanCell(row.status) || "active",
      sortOrder: toNumber(row.sortOrder, 9999),
      searchKeywords: {
        zh: cleanCell(row.searchKeywordsZh),
        en: cleanCell(row.searchKeywordsEn),
      },
      sourceFile: relativeSource,
    };
  });

  const filterLabels = filterLabelRows
    .map((row) => {
      return {
        categoryId: cleanCell(row.categoryId),
        productTypeId: cleanCell(row.productTypeId),
        filterKey: cleanCell(row.filterKey),
        label: pickLabel(row, "label"),
        inputType: cleanCell(row.inputType) || "multiple",
        sortOrder: toNumber(row.sortOrder, 9999),
        visible: toVisible(row.visible),
        sourceFile: relativeSource,
      };
    })
    .filter((item) => item.filterKey);

  const taxonomyItems = taxonomyRows
    .map((row) => {
      return {
        type: cleanCell(row.type),
        id: cleanCell(row.id),
        label: pickTaxonomyLabel(row),
        sortOrder: toNumber(row.sortOrder, 9999),
        sourceFile: relativeSource,
      };
    })
    .filter((item) => item.type && item.id);

  return {
    products,
    filterLabels,
    taxonomyItems,
  };
}

function validateProducts(products) {
  const errors = [];
  const warnings = [];
  const ids = new Map();

  products.forEach((product) => {
    if (!product.productId) {
      errors.push(`${product.sourceFile} 存在缺少 productId 的产品行`);
      return;
    }

    if (ids.has(product.productId)) {
      errors.push(
        `重复 productId：${product.productId}，来源：${ids.get(
          product.productId
        )} 与 ${product.sourceFile}`
      );
    }

    ids.set(product.productId, product.sourceFile);

    if (!product.categoryId) {
      errors.push(`${product.productId} 缺少 categoryId`);
    }

    if (!product.productTypeId) {
      errors.push(`${product.productId} 缺少 productTypeId`);
    }

    if (!product.seriesId) {
      errors.push(`${product.productId} 缺少 seriesId`);
    }

    if (!product.imageCard) {
      warnings.push(`${product.productId} 的 imageCard 为空`);
    } else if (!product.imageCard.startsWith("/images/")) {
      warnings.push(
        `${product.productId} 的 imageCard 建议以 /images/ 开头：${product.imageCard}`
      );
    }

    if (!product.detailSlug) {
      warnings.push(`${product.productId} 的 detailSlug 为空`);
    }
  });

  return { errors, warnings };
}

function dedupeFilterLabels(items) {
  const map = new Map();

  items.forEach((item) => {
    const key = `${item.categoryId}::${item.productTypeId}::${item.filterKey}`;

    if (!map.has(key)) {
      map.set(key, item);
    }
  });

  return Array.from(map.values()).sort((a, b) => {
    return a.sortOrder - b.sortOrder;
  });
}

function dedupeTaxonomyItems(items) {
  const map = new Map();

  items.forEach((item) => {
    const key = `${item.type}::${item.id}`;

    if (!map.has(key)) {
      map.set(key, item);
    }
  });

  return Array.from(map.values()).sort((a, b) => {
    return a.sortOrder - b.sortOrder;
  });
}

function stripInternalFields(items) {
  return items.map((item) => {
    const next = { ...item };
    delete next.sourceFile;
    return next;
  });
}

function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const sourceFiles = findSelectionFiles(sourceRoot);

  if (sourceFiles.length === 0) {
    console.error(`没有找到任何 -selection.xlsx 文件：${sourceRoot}`);
    process.exit(1);
  }

  const allProducts = [];
  const allFilterLabels = [];
  const allTaxonomyItems = [];

  sourceFiles.forEach((filePath) => {
    const parsed = parseWorkbook(filePath);

    allProducts.push(...parsed.products);
    allFilterLabels.push(...parsed.filterLabels);
    allTaxonomyItems.push(...parsed.taxonomyItems);
  });

  const products = allProducts.sort((a, b) => {
    if (a.categoryId !== b.categoryId) {
      return a.categoryId.localeCompare(b.categoryId);
    }

    if (a.productTypeId !== b.productTypeId) {
      return a.productTypeId.localeCompare(b.productTypeId);
    }

    return a.sortOrder - b.sortOrder;
  });

  const filterLabels = dedupeFilterLabels(allFilterLabels);
  const taxonomyItems = dedupeTaxonomyItems(allTaxonomyItems);

  const { errors, warnings } = validateProducts(products);

  if (errors.length > 0) {
    console.error("解析失败，发现以下错误：");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  writeTypes();

  const generatedContent = `/* =========================================================
   product-selection.generated.ts
   产品中心｜选型页自动生成数据

   来源：
   data-source/product-center 下所有 -selection.xlsx 文件

   注意：
   1. 不要手动修改本文件
   2. 如需修改数据，请修改 Excel 后重新运行脚本
========================================================= */

import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
  ProductSelectionTaxonomyItem,
} from "./product-selection.types";

export const selectionProducts: ProductSelectionProduct[] = ${JSON.stringify(
    stripInternalFields(products),
    null,
    2
  )};

export const selectionFilterLabels: ProductSelectionFilterLabel[] = ${JSON.stringify(
    stripInternalFields(filterLabels),
    null,
    2
  )};

export const selectionTaxonomyItems: ProductSelectionTaxonomyItem[] = ${JSON.stringify(
    stripInternalFields(taxonomyItems),
    null,
    2
  )};
`;

  fs.writeFileSync(generatedPath, generatedContent, "utf8");

  const summary = {
    sourceRoot: "data-source/product-center",
    generatedAt: new Date().toISOString(),
    sourceFiles: sourceFiles.map((filePath) =>
      path.relative(root, filePath).replace(/\\/g, "/")
    ),
    products: products.length,
    activeProducts: products.filter((product) => product.status === "active")
      .length,
    filterLabels: filterLabels.length,
    taxonomyItems: taxonomyItems.length,
    warnings,
  };

  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), "utf8");

  console.log("");
  console.log("产品中心选型数据解析完成：");
  console.log(`- 源表格数量：${sourceFiles.length}`);
  console.log(`- 产品数量：${products.length}`);
  console.log(`- active 产品数量：${summary.activeProducts}`);
  console.log(`- 筛选标签：${filterLabels.length}`);
  console.log(`- 分类多语言：${taxonomyItems.length}`);
  console.log("");
  console.log("已生成：");
  console.log("- data/products/selection/product-selection.types.ts");
  console.log("- data/products/selection/product-selection.generated.ts");
  console.log("- data/products/selection/product-selection.summary.json");

  if (warnings.length > 0) {
    console.log("");
    console.log("提示：");
    warnings.forEach((warning) => console.log(`- ${warning}`));
  }
}

main();

```

---

## scripts 目录脚本：check-ea-full-model-codes.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\check-ea-full-model-codes.js

```ts
const path = require("path");
const xlsx = require("xlsx");

const root = process.cwd();

const files = [
  path.join(root, "data-source", "product-center", "pumps", "plunger-pump", "ea", "01_EA常规柱塞泵_详情页资料_zh.xlsx"),
  path.join(root, "data-source", "product-center", "pumps", "plunger-pump", "ea", "02_EA常规柱塞泵_规格参数_zh.xlsx"),
  path.join(root, "data-source", "product-center", "pumps", "plunger-pump", "ea", "ea-selection.xlsx"),
];

const fullModelPattern = /EA-\d+-(PMMA|PEEK)-[A-Z0-9]+-[A-Z0-9]+/i;

for (const file of files) {
  console.log("\n==============================");
  console.log("检查文件：", file);

  const workbook = xlsx.readFile(file);

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];

    const rows = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
      raw: false,
    });

    console.log("\nSheet：", sheetName);

    rows.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const text = String(cell || "").trim();

        if (fullModelPattern.test(text)) {
          console.log(`第 ${rowIndex + 1} 行，第 ${colIndex + 1} 列：${text}`);
        }
      });
    });
  });
}

```

---

## scripts 目录脚本：check-product-selection-data.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\check-product-selection-data.js

```ts
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

```

---

## scripts 目录脚本：check-selection-detail-copy-separation.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\check-selection-detail-copy-separation.js

```ts
const fs = require("fs");
const path = require("path");

/* =========================================================
   check-selection-detail-copy-separation.js
   恒永达官网｜产品中心卡片文案与详情页长文分离检查

   作用：
   1. 检查详情页组件是否误用产品中心 cardSubtitle
   2. 检查产品中心组件是否误用详情页 advantages
   3. 检查详情页生成数据里是否出现卡片短句
   4. 检查产品中心生成数据里是否出现明显详情页长文
   5. 只读取文件，不修改任何文件

   使用方式：
   node scripts/products/check-selection-detail-copy-separation.js
========================================================= */

const root = process.cwd();

const files = {
  detailService: path.join(
    root,
    "services",
    "products",
    "detail",
    "getProductDetailPageData.ts"
  ),
  detailClient: path.join(
    root,
    "components",
    "products",
    "detail",
    "ProductDetailClient.tsx"
  ),
  selectionClient: path.join(
    root,
    "components",
    "products",
    "selection",
    "ProductSelectionClient.tsx"
  ),
  selectionCard: path.join(
    root,
    "components",
    "products",
    "selection",
    "ProductSelectionCard.tsx"
  ),
  detailGenerated: path.join(
    root,
    "data",
    "products",
    "detail",
    "ea-product-details.zh.generated.ts"
  ),
  selectionGenerated: path.join(
    root,
    "data",
    "products",
    "selection",
    "product-selection.generated.ts"
  ),
};

function read(file) {
  if (!fs.existsSync(file)) {
    return "";
  }

  return fs.readFileSync(file, "utf8");
}

function reportError(message) {
  console.error("❌ " + message);
}

function reportOk(message) {
  console.log("✅ " + message);
}

let hasError = false;

const detailService = read(files.detailService);
const detailClient = read(files.detailClient);
const selectionClient = read(files.selectionClient);
const selectionCard = read(files.selectionCard);
const detailGenerated = read(files.detailGenerated);
const selectionGenerated = read(files.selectionGenerated);

/* =========================================================
   1. 详情页不应该使用 cardSubtitle
========================================================= */
const detailLayerContent = [detailService, detailClient].join("\n");

if (/cardSubtitle/.test(detailLayerContent)) {
  hasError = true;
  reportError("详情页代码中出现 cardSubtitle，可能误用了产品中心卡片短文。");
} else {
  reportOk("详情页代码没有使用 cardSubtitle。");
}

/* =========================================================
   2. 产品中心不应该使用详情页长文字段
========================================================= */
const selectionLayerContent = [selectionClient, selectionCard].join("\n");

if (/advantages|commonApplications|detailRecord|ProductDetail/.test(selectionLayerContent)) {
  hasError = true;
  reportError("产品中心代码中出现详情页字段，可能误用了详情页长文数据。");
} else {
  reportOk("产品中心代码没有使用详情页长文字段。");
}

/* =========================================================
   3. 详情页生成数据不应该出现卡片短句
   注意：这里先放当前已经用过的卡片短句，后续卡片文案确定后可以继续补充。
========================================================= */
const cardShortCopyPatterns = [
  "1/4-28 UNF 液路接口",
  "满行程 CV",
  "单泵 / 泵阀一体",
  "容量：100 μL",
  "泵头材料",
  "Volume:",
  "Head Material:",
  "Port:",
];

const pollutedDetailPhrases = cardShortCopyPatterns.filter((phrase) =>
  detailGenerated.includes(phrase)
);

if (pollutedDetailPhrases.length > 0) {
  hasError = true;
  reportError(
    "详情页生成数据中出现了卡片短句：" + pollutedDetailPhrases.join("、")
  );
} else {
  reportOk("详情页生成数据没有发现当前卡片短句。");
}

/* =========================================================
   4. 产品中心卡片文案不应该出现明显详情页长文
   判断方式：cardSubtitle 中如果出现过长段落，提示人工检查。
========================================================= */
const longSubtitleMatches = selectionGenerated.match(
  /"cardSubtitle":\s*\{[\s\S]*?\}/g
) || [];

const suspiciousLongSubtitles = longSubtitleMatches.filter((block) => {
  const compact = block.replace(/\s+/g, "");
  return compact.length > 260;
});

if (suspiciousLongSubtitles.length > 0) {
  hasError = true;
  reportError(
    `发现 ${suspiciousLongSubtitles.length} 个 cardSubtitle 过长，可能把详情页长文放进了产品中心卡片。`
  );
} else {
  reportOk("产品中心 cardSubtitle 未发现明显长文。");
}

console.log("");
console.log("检查完成。");

if (hasError) {
  console.error("结果：存在混用风险，请先处理后再提交。");
  process.exit(1);
}

console.log("结果：产品中心卡片文案与详情页长文目前是分开的。");

```

---

## scripts 目录脚本：clean-spec-table-column-position.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\clean-spec-table-column-position.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-clean-spec-column-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

/*
  清理之前追加的规格表文字缩进 override
*/
const removeBlocks = [
  [
    "/* ===== FOREACH product detail spec table text indent START ===== */",
    "/* ===== FOREACH product detail spec table text indent END ===== */",
  ],
  [
    "/* ===== FOREACH force spec value column right START ===== */",
    "/* ===== FOREACH force spec value column right END ===== */",
  ],
];

for (const [startMarker, endMarker] of removeBlocks) {
  const pattern = new RegExp(
    `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
    "g"
  );

  content = content.replace(pattern, "");
}

/*
  通过加宽左侧字段列，让右侧参数值自然右移。
  这样比强行给 td 加 padding 更稳定。
*/
content = content.replace(
  /(\.specTable th\s*\{[\s\S]*?width:\s*)300px(\s*;[\s\S]*?\})/,
  "$1360px$2"
);

/*
  保持右侧参数值左对齐，避免回到居中。
*/
content = content.replace(
  /(\.specTable td\s*\{[\s\S]*?text-align:\s*)center(\s*;[\s\S]*?\})/,
  "$1left$2"
);

fs.writeFileSync(file, content, "utf8");

console.log("已清理规格表重复缩进样式，并将左侧字段列调整为 360px。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：enlarge-product-center-cards-only.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\enlarge-product-center-cards-only.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "app",
  "products",
  "products.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到产品中心 CSS 文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-enlarge-product-cards-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH product center enlarge cards START ===== */";
const endMarker = "/* ===== FOREACH product center enlarge cards END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  产品中心卡片放大：
  - 不再修改左侧筛选栏宽度
  - 只放大右侧产品卡片、产品图、标题、描述和按钮
  - 电脑端仍保持一排 3 张
*/

.product-card-grid,
.selection-card-grid,
.products-grid {
  grid-template-columns: repeat(3, minmax(340px, 1fr)) !important;
  gap: 32px !important;
}

.product-selection-card,
.product-card {
  min-height: 420px !important;
  padding: 24px !important;
}

.product-selection-card img,
.product-card img {
  max-height: 210px !important;
  object-fit: contain !important;
}

.product-card-image,
.product-image,
.card-image,
.product-selection-card__image {
  min-height: 220px !important;
}

.product-title,
.product-card-title,
.product-selection-card-title {
  font-size: 22px !important;
  line-height: 1.25 !important;
}

.product-param-line,
.product-card-subtitle,
.product-selection-card-subtitle {
  font-size: 15px !important;
  line-height: 1.6 !important;
}

.product-selection-card button,
.product-card button {
  min-height: 44px !important;
  font-size: 15px !important;
}

@media (max-width: 1200px) {
  .product-card-grid,
  .selection-card-grid,
  .products-grid {
    grid-template-columns: repeat(2, minmax(300px, 1fr)) !important;
  }
}

@media (max-width: 768px) {
  .product-card-grid,
  .selection-card-grid,
  .products-grid {
    grid-template-columns: 1fr !important;
  }

  .product-selection-card,
  .product-card {
    min-height: auto !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已放大产品中心右侧产品卡片，筛选栏保持不变。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：final-product-center-width.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\final-product-center-width.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "app",
  "products",
  "products.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-final-product-center-width-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH final product center width START ===== */";
const endMarker = "/* ===== FOREACH final product center width END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  产品中心最终宽度修正：
  - 精准覆盖真实 class
  - 主容器从 1320px 放大到 1600px
  - 取消右侧 product-area 的 996px 限制
  - 筛选栏保持 420px
  - 产品区自然展开，仍保持一排 3 张卡片
*/

.products-selection-page .container {
  width: min(1600px, calc(100% - 96px)) !important;
  max-width: 1600px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.products-selection-page .selection-layout {
  display: grid !important;
  grid-template-columns: 420px minmax(0, 1fr) !important;
  gap: 32px !important;
  align-items: start !important;
}

.products-selection-page .product-area {
  width: 100% !important;
  max-width: none !important;
  min-width: 0 !important;
}

.products-selection-page .product-grid {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 28px !important;
}

@media (max-width: 1180px) {
  .products-selection-page .container {
    width: min(100% - 48px, 100%) !important;
    max-width: none !important;
  }

  .products-selection-page .selection-layout {
    grid-template-columns: 1fr !important;
  }

  .products-selection-page .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

@media (max-width: 760px) {
  .products-selection-page .container {
    width: min(100% - 32px, 100%) !important;
  }

  .products-selection-page .product-grid {
    grid-template-columns: 1fr !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已修复产品中心主容器和右侧产品区宽度。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：fine-tune-product-detail-tab-spacing.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\fine-tune-product-detail-tab-spacing.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("FOREACH product detail tab final clean START");
});

if (!targetFile) {
  console.error("没有找到最终 Tab 样式块。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-tab-spacing-fine-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

/*
  微调 Tab 文字与下方横线距离：
  从偏松改为适中
*/
content = content
  .replace(/padding-bottom:\s*14px\s*!important;/g, "padding-bottom: 10px !important;")
  .replace(/margin-bottom:\s*18px\s*!important;/g, "margin-bottom: 12px !important;")
  .replace(/bottom:\s*-14px\s*!important;/g, "bottom: -10px !important;");

fs.writeFileSync(targetFile, content, "utf8");

console.log("已将详情页 Tab 间距微调为适中。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：fix-faq-footer-gap.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-faq-footer-gap.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-fix-faq-footer-gap-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

/*
  清理之前 FAQ 底部 margin 的覆盖，避免空白落到 footer 灰色区域里。
*/
const removeBlocks = [
  [
    "/* ===== FOREACH product detail FAQ bottom space START ===== */",
    "/* ===== FOREACH product detail FAQ bottom space END ===== */",
  ],
  [
    "/* ===== FOREACH remove detail bottom gap START ===== */",
    "/* ===== FOREACH remove detail bottom gap END ===== */",
  ],
  [
    "/* ===== FOREACH reduce detail page bottom padding START ===== */",
    "/* ===== FOREACH reduce detail page bottom padding END ===== */",
  ],
];

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

for (const [startMarker, endMarker] of removeBlocks) {
  const pattern = new RegExp(
    `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
    "g"
  );
  content = content.replace(pattern, "");
}

const startMarker = "/* ===== FOREACH fix FAQ footer gap START ===== */";
const endMarker = "/* ===== FOREACH fix FAQ footer gap END ===== */";

const markerPattern = new RegExp(
  `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  修复 FAQ 与页脚之间的间距：
  - 间距保留在产品详情页白色区域内
  - 不让空白落到 footer 灰色区域里
*/

.page {
  padding-bottom: 56px !important;
}

.faqSection {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

.detailSection {
  margin-bottom: 0 !important;
}

.panelWrap {
  margin-bottom: 0 !important;
}

@media (max-width: 768px) {
  .page {
    padding-bottom: 36px !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已修复 FAQ 与页脚之间的灰色空白问题。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：fix-product-detail-spec-table-width.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-product-detail-spec-table-width.js

```ts
const fs = require("fs");
const path = require("path");

/* =========================================================
   fix-product-detail-spec-table-width.js
   恒永达官网｜恢复产品详情页规格表原有宽度

   作用：
   1. 保留规格表横线风格
   2. 保留 hover 高亮
   3. 取消 max-width: 1200px 限制
   4. 恢复原来跟随页面内容区的宽度
========================================================= */

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("FOREACH product detail spec table readable override START");
});

if (!targetFile) {
  console.error("没有找到之前添加的规格表 override 样式。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-restore-width-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

/*
  删除强制宽度限制，只保留原页面容器宽度。
*/
content = content.replace(
`.tabNav {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  justify-content: flex-start;
}

.panelWrap {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.specPanelClean {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  border: 0;
  box-shadow: none;
  background: #ffffff;
}`,
`.tabNav {
  justify-content: flex-start;
}

.specPanelClean {
  padding: 0;
  border: 0;
  box-shadow: none;
  background: #ffffff;
}`
);

/*
  如果之前把 td 改成了右对齐，也恢复成左对齐。
*/
content = content.replace(
`.specTable td {
  font-weight: 400;
  text-align: right;
}`,
`.specTable td {
  font-weight: 400;
  text-align: left;
}`
);

fs.writeFileSync(targetFile, content, "utf8");

console.log("已恢复规格表原有宽度，只保留横线与 hover 样式。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：force-card-title-active-green.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\force-card-title-active-green.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "app",
  "products",
  "products.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-force-card-title-active-green-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH force product card title green START ===== */";
const endMarker = "/* ===== FOREACH force product card title green END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  强制产品卡片型号在 hover / 选中状态下变为品牌绿色。
  放在 CSS 最后，覆盖前面 final stable 里把标题改回深蓝色的规则。
*/

.products-selection-page .product-card:hover .product-title,
.products-selection-page .product-card:focus-within .product-title,
.products-selection-page .product-card:has(.list-toggle.active) .product-title,
.products-selection-page .product-card:has(.list-toggle[aria-pressed="true"]) .product-title,
.products-selection-page .product-card:has(.list-toggle[data-active="true"]) .product-title,
.products-selection-page .product-card:has(.list-toggle.is-active) .product-title,
.products-selection-page .product-card.active .product-title,
.products-selection-page .product-card.selected .product-title,
.products-selection-page .product-card.is-selected .product-title,
.products-selection-page .product-card[data-selected="true"] .product-title {
  color: var(--brand-cyan, #09e9b4) !important;
}

${endMarker}
`;

content = `${content.trimEnd()}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已强制设置产品卡片 hover / 选中时型号变为品牌绿色。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：force-product-detail-tab-size.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\force-product-detail-tab-size.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("tabNav") && content.includes("tabButton");
});

if (!targetFile) {
  console.error("没有找到包含 tabNav / tabButton 的详情页 CSS 文件。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-force-tab-size-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

const startMarker = "/* ===== FOREACH force product detail tab size START ===== */";
const endMarker = "/* ===== FOREACH force product detail tab size END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  强制放大详情页资料 Tab：
  规格 / 3D模型 / 零件图
*/

.tabNav {
  justify-content: center !important;
  gap: 66px !important;
}

.tabNav .tabButton {
  font-size: 24px !important;
  line-height: 1.2 !important;
  padding-top: 16px !important;
  padding-bottom: 18px !important;
}

.tabNav .tabButton::after {
  left: 50% !important;
  right: auto !important;
  width: 0 !important;
  transform: translateX(-50%) !important;
}

.tabNav .tabButton.isActive::after {
  width: 46px !important;
  height: 3px !important;
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(targetFile, content, "utf8");

console.log("已强制放大详情页 Tab 字号。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：force-spec-table-grid-column.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\force-spec-table-grid-column.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-force-spec-grid-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH force spec table grid column START ===== */";
const endMarker = "/* ===== FOREACH force spec table grid column END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  强制规格表两列布局：
  - 不再依赖 table th width
  - 每一行固定为 360px + 自适应
  - 右侧参数值自然往右
*/

.specPanelClean .specTable {
  width: 100% !important;
  table-layout: auto !important;
  border-collapse: collapse !important;
}

.specPanelClean .specTable tbody {
  display: block !important;
  width: 100% !important;
}

.specPanelClean .specTable tr[data-product-spec-row="true"] {
  display: grid !important;
  grid-template-columns: 360px minmax(0, 1fr) !important;
  width: 100% !important;
  align-items: stretch !important;
  border-bottom: 1px solid #dbe3ee !important;
}

.specPanelClean .specTable th,
.specPanelClean .specTable td {
  display: flex !important;
  align-items: center !important;
  width: auto !important;
  height: 52px !important;
  padding-top: 14px !important;
  padding-bottom: 14px !important;
  border: 0 !important;
  background: #ffffff !important;
  color: #0b2f5b !important;
  text-align: left !important;
  vertical-align: middle !important;
}

.specPanelClean .specTable th {
  padding-left: 48px !important;
  padding-right: 24px !important;
  font-weight: 600 !important;
  justify-content: flex-start !important;
}

.specPanelClean .specTable td {
  padding-left: 32px !important;
  padding-right: 24px !important;
  font-weight: 400 !important;
  justify-content: flex-start !important;
}

.specPanelClean .specTable tr[data-product-spec-row="true"]:hover th,
.specPanelClean .specTable tr[data-product-spec-row="true"]:hover td {
  background-color: rgba(0, 214, 170, 0.055) !important;
}

@media (max-width: 768px) {
  .specPanelClean .specTable tr[data-product-spec-row="true"] {
    grid-template-columns: minmax(108px, 36%) minmax(0, 1fr) !important;
  }

  .specPanelClean .specTable th,
  .specPanelClean .specTable td {
    min-height: 42px !important;
    height: auto !important;
    padding: 9px 10px !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已强制改为规格表 grid 两列布局，右侧参数值会明显右移。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：force-spec-value-column-right.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\force-spec-value-column-right.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("specTable");
});

if (!targetFile) {
  console.error("没有找到规格表 CSS 文件。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-force-spec-value-right-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

const startMarker = "/* ===== FOREACH force spec value column right START ===== */";
const endMarker = "/* ===== FOREACH force spec value column right END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  强制调整规格表右侧参数值位置：
  - 左侧参数名保持不动
  - 右侧参数值整体往右
  - 放在 CSS 最后，避免被前面的 padding 覆盖
*/

.specPanelClean .specTable td {
  padding-left: 140px !important;
  text-align: left !important;
}

@media (max-width: 768px) {
  .specPanelClean .specTable td {
    padding-left: 16px !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(targetFile, content, "utf8");

console.log("已强制将规格表右侧参数值往右移动。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：hide-detail-product-name.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\hide-detail-product-name.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "ProductDetailClient.tsx"
);

let content = fs.readFileSync(file, "utf8");

/*
  只隐藏详情页顶部的通用产品名称：
  <div className={styles.productName}>{data.name}</div>

  不改 data.name 数据源；
  不改详情页长文；
  不改产品中心卡片；
  不改图片 alt。
*/
const before = content;

content = content.replace(
  /\s*<div className=\{styles\.productName\}>\{data\.name\}<\/div>\r?\n/,
  "\n"
);

if (content === before) {
  console.warn("没有找到 productName 渲染行，可能已经删除过。");
} else {
  fs.writeFileSync(file, content, "utf8");
  console.log("已隐藏详情页顶部 productName，只保留型号标题。");
}

```

---

## scripts 目录脚本：keep-application-title-original.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\keep-application-title-original.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-keep-application-title-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

/*
  保留产品简介文字放大；
  恢复“常见应用：”四个字原来的样式。
*/

// 删除我们之前追加的 applicationTitle 覆盖
content = content.replace(
  /\.applicationTitle\s*\{[\s\S]*?\}\r?\n\r?\n/g,
  ""
);

// 手机端也不要覆盖 applicationTitle，只保留 applicationText
content = content.replace(
  /\.applicationTitle,\s*\r?\n\s*\.applicationText\s*\{/g,
  ".applicationText {"
);

fs.writeFileSync(file, content, "utf8");

console.log("已恢复“常见应用：”标题原样，只保留简介文字优化。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：move-product-detail-spec-value-right.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\move-product-detail-spec-value-right.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("FOREACH product detail spec table text indent START");
});

if (!targetFile) {
  console.error("没有找到规格表文字缩进样式块。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-spec-value-move-right-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

/*
  只让右侧参数值再往右一点：
  th 保持不动
  td 从 48px 调到 84px
*/
content = content.replace(
  /\.specTable td \{\s*padding-left: 48px !important;\s*\}/g,
  `.specTable td {
  padding-left: 84px !important;
}`
);

fs.writeFileSync(targetFile, content, "utf8");

console.log("已将规格表右侧内容整体右移。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：move-spec-label-right-100.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\move-spec-label-right-100.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-spec-label-right-100-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

/*
  将规格表左侧字段名整体向右移动 100px：
  原来 padding-left 48px
  现在改为 148px
*/
content = content.replace(
  /padding:\s*14px\s+32px\s+14px\s+48px\s*!important;/g,
  "padding: 14px 32px 14px 148px !important;"
);

/*
  如果已经被改过，继续统一成 148px，避免重复叠加。
*/
content = content.replace(
  /padding:\s*14px\s+32px\s+14px\s+\d+px\s*!important;/g,
  "padding: 14px 32px 14px 148px !important;"
);

fs.writeFileSync(file, content, "utf8");

console.log("已将规格表左侧字段名向右移动 100px。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：move-spec-value-left-100.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\move-spec-value-left-100.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-spec-value-left-100-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

/*
  将规格表右侧参数值整体向左移动 100px：
  670px -> 570px
*/
content = content.replace(
  /grid-template-columns:\s*670px\s+minmax\(0,\s*1fr\)\s*!important;/g,
  "grid-template-columns: 570px minmax(0, 1fr) !important;"
);

fs.writeFileSync(file, content, "utf8");

console.log("已将规格表右侧参数值整体向左移动 100px。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：move-spec-value-left-200.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\move-spec-value-left-200.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-spec-value-left-200-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

/*
  将规格表右侧参数值再向左移动 200px：
  570px -> 370px
*/
content = content.replace(
  /grid-template-columns:\s*\d+px\s+minmax\(0,\s*1fr\)\s*!important;/g,
  "grid-template-columns: 370px minmax(0, 1fr) !important;"
);

fs.writeFileSync(file, content, "utf8");

console.log("已将规格表右侧参数值再向左移动 200px。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：move-spec-value-right-250.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\move-spec-value-right-250.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-spec-column-plus-250-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

/*
  将规格表右侧参数值整体向右移动 250px：
  当前左列 420px → 670px
*/
content = content.replace(
  /grid-template-columns:\s*420px\s+minmax\(0,\s*1fr\)\s*!important;/g,
  "grid-template-columns: 670px minmax(0, 1fr) !important;"
);

content = content.replace(
  /grid-template-columns:\s*460px\s+minmax\(0,\s*1fr\)\s*!important;/g,
  "grid-template-columns: 670px minmax(0, 1fr) !important;"
);

fs.writeFileSync(file, content, "utf8");

console.log("已将规格表右侧参数值整体向右移动 250px。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-card-button-compact.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-card-button-compact.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "app",
  "products",
  "products.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-card-button-compact-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/*
  删除上一版把按钮区加大的覆盖。
*/
const removeBlocks = [
  [
    "/* ===== FOREACH product card text button layout START ===== */",
    "/* ===== FOREACH product card text button layout END ===== */",
  ],
];

for (const [startMarker, endMarker] of removeBlocks) {
  const pattern = new RegExp(
    `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
    "g"
  );

  content = content.replace(pattern, "");
}

const startMarker = "/* ===== FOREACH product card button compact START ===== */";
const endMarker = "/* ===== FOREACH product card button compact END ===== */";

const markerPattern = new RegExp(
  `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  产品卡片按钮区域压缩：
  - 减少按钮和文字之间的空白
  - 减少按钮本身高度
  - 减少按钮下方底部留白
  - 不改顶部绿线、绿边和型号大小
*/

.products-selection-page .product-card {
  min-height: 400px !important;
}

.products-selection-page .product-body {
  min-height: 190px !important;
  padding: 22px 26px 22px !important;
}

.products-selection-page .product-actions {
  margin-top: 14px !important;
  padding-top: 0 !important;
  gap: 10px !important;
}

.products-selection-page .product-link,
.products-selection-page .list-toggle {
  height: 38px !important;
  min-height: 38px !important;
  padding: 0 12px !important;
  font-size: 13px !important;
}

@media (max-width: 760px) {
  .products-selection-page .product-body {
    min-height: auto !important;
    padding: 18px 14px 16px !important;
  }

  .products-selection-page .product-actions {
    margin-top: 12px !important;
    gap: 8px !important;
  }

  .products-selection-page .product-link,
  .products-selection-page .list-toggle {
    height: 36px !important;
    min-height: 36px !important;
  }
}

${endMarker}
`;

content = `${content.trimEnd()}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已压缩产品卡片按钮区域空白。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-card-inner-keep-highlight.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-card-inner-keep-highlight.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "app",
  "products",
  "products.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-card-inner-keep-green-title-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/*
  清理上一版会弱化绿色线、绿边、标题大小的覆盖。
  这 3 点现在要求保留。
*/
const removeBlocks = [
  [
    "/* ===== FOREACH product card final clean inner START ===== */",
    "/* ===== FOREACH product card final clean inner END ===== */",
  ],
  [
    "/* ===== FOREACH product card inner final layout START ===== */",
    "/* ===== FOREACH product card inner final layout END ===== */",
  ],
  [
    "/* ===== FOREACH product card inner layout only START ===== */",
    "/* ===== FOREACH product card inner layout only END ===== */",
  ],
  [
    "/* ===== FOREACH product card clean layout START ===== */",
    "/* ===== FOREACH product card clean layout END ===== */",
  ],
];

for (const [startMarker, endMarker] of removeBlocks) {
  const pattern = new RegExp(
    `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
    "g"
  );

  content = content.replace(pattern, "");
}

const startMarker = "/* ===== FOREACH product card inner keep highlight START ===== */";
const endMarker = "/* ===== FOREACH product card inner keep highlight END ===== */";

const markerPattern = new RegExp(
  `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  产品中心卡片内部排版优化：
  - 保留顶部绿色线
  - 保留 hover / 选中绿边
  - 保留型号当前字号和粗细
  - 只调整图片、横线、文字位置和按钮位置
*/

.products-selection-page .product-card {
  min-height: 430px !important;
}

/* 产品图区域减少上下左右空白 */
.products-selection-page .product-image {
  height: 250px !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: #ffffff !important;
  overflow: hidden !important;
}

.products-selection-page .product-image img {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: contain !important;
  object-position: center !important;
}

/* 保证图片下方横线是整条，不是断开的 */
.products-selection-page .product-body {
  min-height: 190px !important;
  padding: 22px 26px 24px !important;
  display: flex !important;
  flex: 1 !important;
  flex-direction: column !important;
  border-top: 1px solid var(--line, #e5ebf2) !important;
  box-sizing: border-box !important;
}

/* 保留型号当前大小和粗细，只控制左对齐和间距 */
.products-selection-page .product-title {
  margin: 0 0 12px !important;
  text-align: left !important;
}

/* 参数文字整体靠左，行距舒服一点 */
.products-selection-page .product-param-line {
  margin-top: 0 !important;
  text-align: left !important;
  line-height: 1.58 !important;
}

/* 按钮靠底部 */
.products-selection-page .product-actions {
  margin-top: auto !important;
  padding-top: 26px !important;
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 14px !important;
}

@media (max-width: 760px) {
  .products-selection-page .product-card {
    min-height: auto !important;
  }

  .products-selection-page .product-image {
    height: 190px !important;
  }

  .products-selection-page .product-body {
    min-height: auto !important;
    padding: 18px 16px 18px !important;
  }

  .products-selection-page .product-actions {
    padding-top: 18px !important;
    gap: 10px !important;
  }
}

${endMarker}
`;

content = `${content.trimEnd()}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已保留绿色线、绿边、型号大小，只优化卡片内部排版。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-card-text-button-layout.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-card-text-button-layout.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "app",
  "products",
  "products.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-card-text-button-layout-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const startMarker = "/* ===== FOREACH product card text button layout START ===== */";
const endMarker = "/* ===== FOREACH product card text button layout END ===== */";

const markerPattern = new RegExp(
  `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  产品中心卡片文字区与按钮区排版：
  - 文字区靠左
  - 型号、参数形成独立文字块
  - 按钮位于文字下方
  - 按钮与文字之间留出距离
  - 按钮下方保留底部留白
*/

.products-selection-page .product-body {
  min-height: 250px !important;
  padding: 26px 34px 34px !important;
  display: flex !important;
  flex-direction: column !important;
  border-top: 1px solid var(--line, #e5ebf2) !important;
  box-sizing: border-box !important;
}

.products-selection-page .product-title {
  margin: 0 0 14px !important;
  text-align: left !important;
}

.products-selection-page .product-param-line {
  margin-top: 0 !important;
  text-align: left !important;
  line-height: 1.6 !important;
}

.products-selection-page .product-actions {
  margin-top: 26px !important;
  padding-top: 0 !important;
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 18px !important;
}

.products-selection-page .product-link,
.products-selection-page .list-toggle {
  height: 48px !important;
}

@media (max-width: 760px) {
  .products-selection-page .product-body {
    min-height: auto !important;
    padding: 20px 18px 22px !important;
  }

  .products-selection-page .product-actions {
    margin-top: 20px !important;
    gap: 12px !important;
  }

  .products-selection-page .product-link,
  .products-selection-page .list-toggle {
    height: 40px !important;
  }
}

${endMarker}
`;

content = `${content.trimEnd()}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已调整产品卡片文字区和按钮区排版。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-card-text-left-align.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-card-text-left-align.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "app",
  "products",
  "products.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-card-text-left-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH product card text left align START ===== */";
const endMarker = "/* ===== FOREACH product card text left align END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  产品卡片文字靠左：
  - text-align 已经是左对齐
  - 真正控制左右位置的是 product-body 的 padding-left
  - 这里只减少文字区左侧内边距
*/

.products-selection-page .product-body {
  padding-left: 18px !important;
  padding-right: 18px !important;
}

.products-selection-page .product-title,
.products-selection-page .product-param-line {
  text-align: left !important;
}

.products-selection-page .product-actions {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

${endMarker}
`;

content = `${content.trimEnd()}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已将产品卡片文字区域向左收。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-ea-selection-card-text.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text.js

```ts
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

/* =========================================================
   patch-ea-selection-card-text.js
   恒永达官网｜EA 产品中心卡片文字批量修正脚本

   作用：
   1. 只修改 ea-selection.xlsx 里的卡片标题和卡片说明
   2. 不修改 CSS
   3. 不修改组件
   4. 不修改筛选栏
   5. 不修改图片和按钮
   6. 修改后再执行 build-product-selection-data.js 生成页面数据
========================================================= */

const root = process.cwd();

const sourceFile = path.join(
  root,
  "data-source",
  "product-center",
  "pumps",
  "plunger-pump",
  "ea",
  "ea-selection.xlsx"
);

if (!fs.existsSync(sourceFile)) {
  console.error("找不到源文件：", sourceFile);
  process.exit(1);
}

/* 修改前自动备份，防止误操作 */
const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = sourceFile.replace(/\.xlsx$/i, `.backup-cardtext-${time}.xlsx`);
fs.copyFileSync(sourceFile, backupFile);

function clean(value) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\r\n/g, "\n").trim();
}

function normalizeVolume(unit) {
  const text = clean(unit);
  if (/ul/i.test(text)) return "μL";
  if (/µl/i.test(text)) return "μL";
  if (/μl/i.test(text)) return "μL";
  if (/ml/i.test(text)) return "mL";
  return text || "μL";
}

/* 从原来的副标题 / productId / detailSlug 里提取 EA · 100 μL · PEEK 这种标题 */
function makeCardTitle(row) {
  const source = [
    row.cardSubtitleZh,
    row.cardSubtitleEn,
    row.productId,
    row.detailSlug,
    row.searchKeywordsZh,
    row.searchKeywordsEn,
    ...Object.values(row),
  ]
    .map(clean)
    .filter(Boolean)
    .join(" ");

  const volumeMatch = source.match(/(\d+(?:\.\d+)?)\s*(μL|µL|uL|UL|ml|mL)/i);
  const materialMatch = source.match(/\b(PMMA|PEEK|POM|PPS|PVDF)\b/i);

  const volume = volumeMatch
    ? `${volumeMatch[1]} ${normalizeVolume(volumeMatch[2])}`
    : "";

  const material = materialMatch ? materialMatch[1].toUpperCase() : "";

  return ["EA", volume, material].filter(Boolean).join(" · ");
}

const zhSubtitle =
  "1/4-28 UNF 液路接口 · 满行程 CV < 0.5% · 单泵 / 泵阀一体 / 控制器可选";

const enSubtitle =
  "1/4-28 UNF Fluidic Ports · CV < 0.5% at Full Stroke · Standalone / Valve / Controller Options";

const workbook = xlsx.readFile(sourceFile);
let changedRows = 0;

workbook.SheetNames.forEach((sheetName) => {
  const sheet = workbook.Sheets[sheetName];

  const headerMatrix = xlsx.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    raw: false,
  });

  const originalHeaders = (headerMatrix[0] || []).map(clean).filter(Boolean);

  const rows = xlsx.utils.sheet_to_json(sheet, {
    defval: "",
    raw: false,
  });

  if (rows.length === 0) return;

  const hasCardFields = rows.some((row) => {
    return (
      Object.prototype.hasOwnProperty.call(row, "cardTitleZh") ||
      Object.prototype.hasOwnProperty.call(row, "cardTitleEn") ||
      Object.prototype.hasOwnProperty.call(row, "cardSubtitleZh") ||
      Object.prototype.hasOwnProperty.call(row, "cardSubtitleEn")
    );
  });

  if (!hasCardFields) return;

  const headers = [...originalHeaders];

  ["cardTitleZh", "cardTitleEn", "cardSubtitleZh", "cardSubtitleEn"].forEach(
    (key) => {
      if (!headers.includes(key)) headers.push(key);
    }
  );

  rows.forEach((row) => {
    const title = makeCardTitle(row);

    if (!title) return;

    row.cardTitleZh = title;
    row.cardTitleEn = title;
    row.cardSubtitleZh = zhSubtitle;
    row.cardSubtitleEn = enSubtitle;

    changedRows += 1;
  });

  const nextSheet = xlsx.utils.json_to_sheet(rows, {
    header: headers,
    skipHeader: false,
  });

  /* 尽量保留原来的列宽 */
  if (sheet["!cols"]) {
    nextSheet["!cols"] = sheet["!cols"];
  }

  workbook.Sheets[sheetName] = nextSheet;
});

xlsx.writeFile(workbook, sourceFile);

console.log("已完成 EA 产品中心卡片文字修改");
console.log("修改文件：", sourceFile);
console.log("备份文件：", backupFile);
console.log("修改行数：", changedRows);

```

---

## scripts 目录脚本：patch-ea-selection-card-text-lines.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text-lines.js

```ts
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

/* =========================================================
   patch-ea-selection-card-text-lines.js
   恒永达官网｜EA 产品中心卡片说明改为三行

   作用：
   1. 只修改 ea-selection.xlsx 里的 cardTitle / cardSubtitle
   2. cardSubtitle 改为真正的换行文本
   3. 不修改 CSS
   4. 不修改页面布局
========================================================= */

const root = process.cwd();

const sourceFile = path.join(
  root,
  "data-source",
  "product-center",
  "pumps",
  "plunger-pump",
  "ea",
  "ea-selection.xlsx"
);

if (!fs.existsSync(sourceFile)) {
  console.error("找不到源文件：", sourceFile);
  process.exit(1);
}

/* 修改前自动备份 */
const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = sourceFile.replace(/\.xlsx$/i, `.backup-cardtext-lines-${time}.xlsx`);
fs.copyFileSync(sourceFile, backupFile);

function clean(value) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\r\n/g, "\n").trim();
}

function normalizeVolume(unit) {
  const text = clean(unit);
  if (/ul/i.test(text)) return "μL";
  if (/µl/i.test(text)) return "μL";
  if (/μl/i.test(text)) return "μL";
  if (/ml/i.test(text)) return "mL";
  return text || "μL";
}

function makeCardTitle(row) {
  const source = [
    row.cardSubtitleZh,
    row.cardSubtitleEn,
    row.productId,
    row.detailSlug,
    row.searchKeywordsZh,
    row.searchKeywordsEn,
    ...Object.values(row),
  ]
    .map(clean)
    .filter(Boolean)
    .join(" ");

  const volumeMatch = source.match(/(\d+(?:\.\d+)?)\s*(μL|µL|uL|UL|ml|mL)/i);
  const materialMatch = source.match(/\b(PMMA|PEEK|POM|PPS|PVDF)\b/i);

  const volume = volumeMatch
    ? `${volumeMatch[1]} ${normalizeVolume(volumeMatch[2])}`
    : "";

  const material = materialMatch ? materialMatch[1].toUpperCase() : "";

  return ["EA", volume, material].filter(Boolean).join(" · ");
}

/* 这里改成真正三行，不再用 · 连成一排 */
const zhSubtitle = [
  "1/4-28 UNF 液路接口",
  "满行程 CV < 0.5%",
  "单泵 / 泵阀一体 / 控制器可选",
].join("\n");

const enSubtitle = [
  "1/4-28 UNF Fluidic Ports",
  "CV < 0.5% at Full Stroke",
  "Standalone / Valve / Controller Options",
].join("\n");

const workbook = xlsx.readFile(sourceFile);
let changedRows = 0;

workbook.SheetNames.forEach((sheetName) => {
  const sheet = workbook.Sheets[sheetName];

  const headerMatrix = xlsx.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    raw: false,
  });

  const originalHeaders = (headerMatrix[0] || []).map(clean).filter(Boolean);

  const rows = xlsx.utils.sheet_to_json(sheet, {
    defval: "",
    raw: false,
  });

  if (rows.length === 0) return;

  const hasCardFields = rows.some((row) => {
    return (
      Object.prototype.hasOwnProperty.call(row, "cardTitleZh") ||
      Object.prototype.hasOwnProperty.call(row, "cardTitleEn") ||
      Object.prototype.hasOwnProperty.call(row, "cardSubtitleZh") ||
      Object.prototype.hasOwnProperty.call(row, "cardSubtitleEn")
    );
  });

  if (!hasCardFields) return;

  const headers = [...originalHeaders];

  ["cardTitleZh", "cardTitleEn", "cardSubtitleZh", "cardSubtitleEn"].forEach((key) => {
    if (!headers.includes(key)) headers.push(key);
  });

  rows.forEach((row) => {
    const title = makeCardTitle(row);

    if (!title) return;

    row.cardTitleZh = title;
    row.cardTitleEn = title;
    row.cardSubtitleZh = zhSubtitle;
    row.cardSubtitleEn = enSubtitle;

    changedRows += 1;
  });

  const nextSheet = xlsx.utils.json_to_sheet(rows, {
    header: headers,
    skipHeader: false,
  });

  if (sheet["!cols"]) {
    nextSheet["!cols"] = sheet["!cols"];
  }

  workbook.Sheets[sheetName] = nextSheet;
});

xlsx.writeFile(workbook, sourceFile);

console.log("已完成 EA 产品中心卡片说明三行化");
console.log("修改文件：", sourceFile);
console.log("备份文件：", backupFile);
console.log("修改行数：", changedRows);

```

---

## scripts 目录脚本：patch-ea-selection-detail-slug.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-detail-slug.js

```ts
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

/* =========================================================
   patch-ea-selection-detail-slug.js
   恒永达官网｜修复 EA 产品中心详情页链接

   问题：
   产品中心 detailSlug 是 ea-100ul-pmma
   详情页真实路由是 ea-100-pmma

   作用：
   1. 只修改 ea-selection.xlsx 里的 detailSlug
   2. 把 detailSlug 中的 100ul / 250ul / 500ul 去掉 ul
   3. 不修改样式
   4. 不修改卡片标题
   5. 不修改卡片说明
========================================================= */

const root = process.cwd();

const sourceFile = path.join(
  root,
  "data-source",
  "product-center",
  "pumps",
  "plunger-pump",
  "ea",
  "ea-selection.xlsx"
);

if (!fs.existsSync(sourceFile)) {
  console.error("找不到源文件：", sourceFile);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = sourceFile.replace(/\.xlsx$/i, `.backup-detail-slug-${time}.xlsx`);
fs.copyFileSync(sourceFile, backupFile);

function clean(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

/* 
  把：
  ea-100ul-pmma
  ea-250ul-peek
  ea-10000ul-pmma

  改成：
  ea-100-pmma
  ea-250-peek
  ea-10000-pmma
*/
function fixDetailSlug(slug) {
  return clean(slug).replace(/(\d+)ul/gi, "$1");
}

const workbook = xlsx.readFile(sourceFile);
let changedRows = 0;

workbook.SheetNames.forEach((sheetName) => {
  const sheet = workbook.Sheets[sheetName];

  const rows = xlsx.utils.sheet_to_json(sheet, {
    defval: "",
    raw: false,
  });

  if (rows.length === 0) return;

  const hasDetailSlug = rows.some((row) =>
    Object.prototype.hasOwnProperty.call(row, "detailSlug")
  );

  if (!hasDetailSlug) return;

  const headerMatrix = xlsx.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    raw: false,
  });

  const headers = (headerMatrix[0] || []).map(clean).filter(Boolean);

  rows.forEach((row) => {
    const oldSlug = clean(row.detailSlug);
    const newSlug = fixDetailSlug(oldSlug);

    if (oldSlug && oldSlug !== newSlug) {
      row.detailSlug = newSlug;
      changedRows += 1;
    }
  });

  const nextSheet = xlsx.utils.json_to_sheet(rows, {
    header: headers,
    skipHeader: false,
  });

  if (sheet["!cols"]) {
    nextSheet["!cols"] = sheet["!cols"];
  }

  workbook.Sheets[sheetName] = nextSheet;
});

xlsx.writeFile(workbook, sourceFile);

console.log("已完成 EA 产品中心 detailSlug 修复");
console.log("修改文件：", sourceFile);
console.log("备份文件：", backupFile);
console.log("修改行数：", changedRows);

```

---

## scripts 目录脚本：patch-ea-selection-title-to-model.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-title-to-model.js

```ts
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

/* =========================================================
   patch-ea-selection-title-to-model.js
   恒永达官网｜产品中心卡片标题统一为工程型号

   作用：
   1. 将产品中心卡片标题从 EA · 100 μL · PMMA 改为 EA-100-PMMA
   2. 将 detailSlug 统一为 ea-100-pmma
   3. 保留卡片三行短参数
   4. 不修改详情页长文
   5. 不修改 CSS / 页面样式
========================================================= */

const root = process.cwd();

const sourceFile = path.join(
  root,
  "data-source",
  "product-center",
  "pumps",
  "plunger-pump",
  "ea",
  "ea-selection.xlsx"
);

if (!fs.existsSync(sourceFile)) {
  console.error("找不到源文件：", sourceFile);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = sourceFile.replace(/\.xlsx$/i, `.backup-title-model-${time}.xlsx`);
fs.copyFileSync(sourceFile, backupFile);

function clean(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function parseModelFromRow(row) {
  const source = [
    row.cardTitleZh,
    row.cardTitleEn,
    row.cardSubtitleZh,
    row.cardSubtitleEn,
    row.productId,
    row.detailSlug,
    row.searchKeywordsZh,
    row.searchKeywordsEn,
    ...Object.values(row),
  ]
    .map(clean)
    .filter(Boolean)
    .join(" ");

  const volumeMatch = source.match(/(\d+)\s*(?:μL|µL|uL|UL)?/i);
  const materialMatch = source.match(/\b(PMMA|PEEK)\b/i);

  if (!volumeMatch || !materialMatch) return "";

  const volume = volumeMatch[1];
  const material = materialMatch[1].toUpperCase();

  return `EA-${volume}-${material}`;
}

function makeSlug(model) {
  return model.toLowerCase();
}

const workbook = xlsx.readFile(sourceFile);
let changedRows = 0;

workbook.SheetNames.forEach((sheetName) => {
  const sheet = workbook.Sheets[sheetName];

  const headerMatrix = xlsx.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    raw: false,
  });

  const headers = (headerMatrix[0] || []).map(clean).filter(Boolean);

  const rows = xlsx.utils.sheet_to_json(sheet, {
    defval: "",
    raw: false,
  });

  if (rows.length === 0) return;

  const hasCardFields = rows.some((row) => {
    return (
      Object.prototype.hasOwnProperty.call(row, "cardTitleZh") ||
      Object.prototype.hasOwnProperty.call(row, "cardTitleEn") ||
      Object.prototype.hasOwnProperty.call(row, "detailSlug")
    );
  });

  if (!hasCardFields) return;

  ["cardTitleZh", "cardTitleEn", "detailSlug"].forEach((key) => {
    if (!headers.includes(key)) headers.push(key);
  });

  rows.forEach((row) => {
    const model = parseModelFromRow(row);

    if (!model) return;

    row.cardTitleZh = model;
    row.cardTitleEn = model;
    row.detailSlug = makeSlug(model);

    changedRows += 1;
  });

  const nextSheet = xlsx.utils.json_to_sheet(rows, {
    header: headers,
    skipHeader: false,
  });

  if (sheet["!cols"]) {
    nextSheet["!cols"] = sheet["!cols"];
  }

  workbook.Sheets[sheetName] = nextSheet;
});

xlsx.writeFile(workbook, sourceFile);

console.log("已完成产品中心卡片标题统一为工程型号");
console.log("修改文件：", sourceFile);
console.log("备份文件：", backupFile);
console.log("修改行数：", changedRows);

```

---

## scripts 目录脚本：patch-faq-accordion.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-faq-accordion.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();

const clientFile = path.join(
  root,
  "components",
  "products",
  "detail",
  "ProductDetailClient.tsx"
);

const cssFile = path.join(
  root,
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

function backup(file) {
  const time = new Date().toISOString().replace(/[:.]/g, "-");
  fs.copyFileSync(file, `${file}.backup-faq-accordion-${time}`);
}

if (!fs.existsSync(clientFile)) {
  console.error("找不到文件：", clientFile);
  process.exit(1);
}

if (!fs.existsSync(cssFile)) {
  console.error("找不到文件：", cssFile);
  process.exit(1);
}

backup(clientFile);
backup(cssFile);

/* =========================================================
   1. 修改 ProductDetailClient.tsx
   将 FAQ 从普通列表改为折叠式 Accordion
========================================================= */

let client = fs.readFileSync(clientFile, "utf8");

/*
  在已有 useState 附近加入 FAQ 展开状态。
  默认展开第一条 FAQ。
*/
if (!client.includes("openFaqIndex")) {
  const statePattern = /(const\s+\[activeTab,\s*setActiveTab\][\s\S]*?useState[\s\S]*?;\r?\n)/;

  if (statePattern.test(client)) {
    client = client.replace(
      statePattern,
      `$1  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);\n`
    );
  } else {
    console.warn("没有自动找到 activeTab state，请手动检查 useState 插入位置。");
  }
}

/*
  替换 FAQ map 渲染结构。
*/
const oldFaqMapPattern = /\{data\.faqs\.map\(\(item,\s*index\)\s*=>\s*\(\s*<article[\s\S]*?<\/article>\s*\)\)\}/;

const newFaqMap = `{data.faqs.map((item, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <article
                    className={[
                      styles.faqItem,
                      isOpen ? styles.faqItemOpen : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={\`\${item.question}-\${index}\`}
                  >
                    <button
                      className={styles.faqQuestion}
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenFaqIndex(isOpen ? null : index)
                      }
                    >
                      <span className={styles.faqIndex}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.faqQuestionText}>
                        {item.question}
                      </span>
                      <span
                        className={styles.faqToggle}
                        aria-hidden="true"
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen ? (
                      <p className={styles.faqAnswer}>
                        {item.answer}
                      </p>
                    ) : null}
                  </article>
                );
              })}`;

if (oldFaqMapPattern.test(client)) {
  client = client.replace(oldFaqMapPattern, newFaqMap);
} else {
  console.warn("没有自动匹配到旧 FAQ map，请检查 ProductDetailClient.tsx 中 FAQ 区块。");
}

fs.writeFileSync(clientFile, client, "utf8");

/* =========================================================
   2. 修改 FAQ CSS
   改为折叠式样式
========================================================= */

let css = fs.readFileSync(cssFile, "utf8");

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const startMarker = "/* ===== FOREACH product detail FAQ START ===== */";
const endMarker = "/* ===== FOREACH product detail FAQ END ===== */";

const markerPattern = new RegExp(
  `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
  "g"
);

css = css.replace(markerPattern, "").trimEnd();

const faqAccordionCss = `
${startMarker}

/*
  产品详情页 FAQ：
  - 按系列显示 FAQ
  - Accordion 折叠展开式
  - 不做厚重卡片
  - 更适合后续 3～5 条 FAQ 扩展
*/

.faqSection {
  margin-top: 64px;
  padding-top: 42px;
  border-top: 1px solid #dbe3ee;
}

.faqHeader {
  margin-bottom: 24px;
}

.faqHeader h2 {
  margin: 0;
  color: #0b2f5b;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.faqHeader p {
  margin: 8px 0 0;
  color: #708096;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.faqList {
  border-top: 1px solid #dbe3ee;
}

.faqItem {
  border-bottom: 1px solid #dbe3ee;
  background: #ffffff;
}

.faqQuestion {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr) 36px;
  width: 100%;
  padding: 24px 0;
  border: 0;
  background: transparent;
  color: #0b2f5b;
  text-align: left;
  cursor: pointer;
  align-items: center;
  transition:
    background-color 0.18s ease,
    color 0.18s ease;
}

.faqQuestion:hover {
  background-color: rgba(0, 214, 170, 0.035);
}

.faqIndex {
  color: #00b894;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.faqQuestionText {
  color: #0b2f5b;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.45;
}

.faqToggle {
  display: flex;
  width: 32px;
  height: 32px;
  border: 1px solid #dbe3ee;
  color: #0b2f5b;
  font-size: 22px;
  font-weight: 400;
  line-height: 1;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.18s ease,
    color 0.18s ease;
}

.faqItemOpen .faqToggle {
  border-color: #00d6aa;
  color: #00b894;
}

.faqAnswer {
  margin: -6px 0 24px 72px;
  max-width: 960px;
  color: #32445d;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .faqSection {
    margin-top: 42px;
    padding-top: 30px;
  }

  .faqHeader h2 {
    font-size: 26px;
  }

  .faqQuestion {
    grid-template-columns: 44px minmax(0, 1fr) 30px;
    padding: 20px 0;
  }

  .faqIndex {
    font-size: 15px;
  }

  .faqQuestionText {
    font-size: 17px;
  }

  .faqToggle {
    width: 28px;
    height: 28px;
    font-size: 20px;
  }

  .faqAnswer {
    margin: -4px 0 20px 44px;
    font-size: 15px;
  }
}

${endMarker}
`;

css = `${css}\n\n${faqAccordionCss}\n`;

fs.writeFileSync(cssFile, css, "utf8");

console.log("已将 FAQ 改为折叠展开式 Accordion。");
console.log("修改文件：", clientFile);
console.log("修改文件：", cssFile);

```

---

## scripts 目录脚本：patch-faq-clean-accordion-style.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-faq-clean-accordion-style.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();

const clientFile = path.join(
  root,
  "components",
  "products",
  "detail",
  "ProductDetailClient.tsx"
);

const cssFile = path.join(
  root,
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

function backup(file, label) {
  const time = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = `${file}.backup-${label}-${time}`;
  fs.copyFileSync(file, backupFile);
  return backupFile;
}

if (!fs.existsSync(clientFile)) {
  console.error("找不到文件：", clientFile);
  process.exit(1);
}

if (!fs.existsSync(cssFile)) {
  console.error("找不到文件：", cssFile);
  process.exit(1);
}

const clientBackup = backup(clientFile, "faq-clean-accordion");
const cssBackup = backup(cssFile, "faq-clean-accordion");

/* =========================================================
   1. ProductDetailClient.tsx
   去掉 FAQ 左侧 01 / 02 编号
========================================================= */

let client = fs.readFileSync(clientFile, "utf8");

client = client.replace(
  /\s*<span className=\{styles\.faqIndex\}>[\s\S]*?<\/span>\r?\n/g,
  "\n"
);

fs.writeFileSync(clientFile, client, "utf8");

/* =========================================================
   2. product-detail.module.css
   FAQ 改成干净横线式折叠样式
========================================================= */

let css = fs.readFileSync(cssFile, "utf8");

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const startMarker = "/* ===== FOREACH product detail FAQ START ===== */";
const endMarker = "/* ===== FOREACH product detail FAQ END ===== */";

const markerPattern = new RegExp(
  `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
  "g"
);

css = css.replace(markerPattern, "").trimEnd();

const faqCss = `
${startMarker}

/*
  产品详情页 FAQ：
  - 折叠展开式
  - 去掉编号
  - 去掉卡片感
  - 使用横向分割线
  - 右侧使用 + / −
*/

.faqSection {
  margin-top: 48px;
  padding-top: 0;
  border-top: 0;
}

.faqHeader {
  margin-bottom: 18px;
}

.faqHeader h2 {
  margin: 0;
  color: #0b2f5b;
  font-size: 26px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.faqHeader p {
  display: none;
}

.faqList {
  border-top: 1px solid #dbe3ee;
}

.faqItem {
  border-bottom: 1px solid #dbe3ee;
  background: #ffffff;
}

.faqQuestion {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 34px;
  width: 100%;
  padding: 22px 0;
  border: 0;
  background: transparent;
  color: #0b2f5b;
  text-align: left;
  cursor: pointer;
  align-items: center;
  gap: 24px;
  transition:
    background-color 0.18s ease,
    color 0.18s ease;
}

.faqQuestion:hover {
  background-color: rgba(0, 214, 170, 0.035);
}

.faqQuestionText {
  color: #0b2f5b;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.45;
}

.faqToggle {
  display: flex;
  width: 30px;
  height: 30px;
  color: #0b2f5b;
  font-size: 24px;
  font-weight: 400;
  line-height: 1;
  align-items: center;
  justify-content: center;
  transition:
    color 0.18s ease,
    transform 0.18s ease;
}

.faqItemOpen .faqToggle {
  color: #00b894;
}

.faqAnswer {
  margin: -4px 58px 22px 0;
  max-width: 980px;
  color: #32445d;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .faqSection {
    margin-top: 36px;
  }

  .faqHeader h2 {
    font-size: 24px;
  }

  .faqQuestion {
    grid-template-columns: minmax(0, 1fr) 30px;
    gap: 14px;
    padding: 20px 0;
  }

  .faqQuestionText {
    font-size: 16px;
  }

  .faqToggle {
    width: 28px;
    height: 28px;
    font-size: 22px;
  }

  .faqAnswer {
    margin: -4px 42px 20px 0;
    font-size: 14px;
  }
}

${endMarker}
`;

css = `${css}\n\n${faqCss}\n`;

fs.writeFileSync(cssFile, css, "utf8");

console.log("已将 FAQ 改为更干净的横线折叠样式。");
console.log("修改文件：", clientFile);
console.log("修改文件：", cssFile);
console.log("备份文件：", clientBackup);
console.log("备份文件：", cssBackup);

```

---

## scripts 目录脚本：patch-faq-clean-style.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-faq-clean-style.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-faq-clean-style-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/*
  清理之前的 FAQ 样式块，重新写一版更干净的 FAQ 样式。
*/
const startMarker = "/* ===== FOREACH product detail FAQ START ===== */";
const endMarker = "/* ===== FOREACH product detail FAQ END ===== */";

const markerPattern = new RegExp(
  `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const faqCss = `
${startMarker}

/*
  产品详情页 FAQ 样式：
  - 不做厚重卡片
  - 使用横向分割线
  - 左侧序号增强层级
  - 保持工程型、规格书型页面气质
*/

.faqSection {
  margin-top: 64px;
  padding-top: 42px;
  border-top: 1px solid #dbe3ee;
}

.faqHeader {
  margin-bottom: 24px;
}

.faqHeader h2 {
  margin: 0;
  color: #0b2f5b;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.faqHeader p {
  margin: 8px 0 0;
  color: #708096;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.faqList {
  display: grid;
  border-top: 1px solid #dbe3ee;
}

.faqItem {
  position: relative;
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 24px;
  padding: 26px 0;
  border-bottom: 1px solid #dbe3ee;
  background: transparent;
  transition: background-color 0.18s ease;
}

.faqItem::before {
  content: "01";
  color: #00b894;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.45;
  letter-spacing: 0.04em;
}

.faqItem:nth-child(2)::before {
  content: "02";
}

.faqItem:nth-child(3)::before {
  content: "03";
}

.faqItem:nth-child(4)::before {
  content: "04";
}

.faqItem:nth-child(5)::before {
  content: "05";
}

.faqItem:hover {
  background-color: rgba(0, 214, 170, 0.035);
}

.faqItem h3 {
  margin: 0;
  color: #0b2f5b;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.45;
}

.faqItem p {
  grid-column: 2;
  margin: 10px 0 0;
  color: #32445d;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .faqSection {
    margin-top: 42px;
    padding-top: 30px;
  }

  .faqHeader h2 {
    font-size: 26px;
  }

  .faqItem {
    grid-template-columns: 44px minmax(0, 1fr);
    gap: 14px;
    padding: 22px 0;
  }

  .faqItem::before {
    font-size: 15px;
  }

  .faqItem h3 {
    font-size: 17px;
  }

  .faqItem p {
    font-size: 15px;
  }
}

${endMarker}
`;

content = `${content}\n\n${faqCss}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已优化 FAQ 样式为横线列表风格。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-faq-spacing-animation.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-faq-spacing-animation.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();

const clientFile = path.join(
  root,
  "components",
  "products",
  "detail",
  "ProductDetailClient.tsx"
);

const cssFile = path.join(
  root,
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

function backup(file, label) {
  const time = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = `${file}.backup-${label}-${time}`;
  fs.copyFileSync(file, backupFile);
  return backupFile;
}

if (!fs.existsSync(clientFile)) {
  console.error("找不到文件：", clientFile);
  process.exit(1);
}

if (!fs.existsSync(cssFile)) {
  console.error("找不到文件：", cssFile);
  process.exit(1);
}

const clientBackup = backup(clientFile, "faq-animation");
const cssBackup = backup(cssFile, "faq-animation");

let client = fs.readFileSync(clientFile, "utf8");

/*
  把 FAQ 答案从条件渲染改成固定渲染。
  这样可以通过 CSS 做 max-height / opacity 动画。
*/
client = client.replace(
  /\s*\{isOpen \? \(\s*<p className=\{styles\.faqAnswer\}>\s*\{item\.answer\}\s*<\/p>\s*\) : null\}/g,
  `
                    <div
                      className={styles.faqAnswerWrap}
                      aria-hidden={!isOpen}
                    >
                      <p className={styles.faqAnswer}>
                        {item.answer}
                      </p>
                    </div>`
);

fs.writeFileSync(clientFile, client, "utf8");

let css = fs.readFileSync(cssFile, "utf8");

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const startMarker = "/* ===== FOREACH product detail FAQ START ===== */";
const endMarker = "/* ===== FOREACH product detail FAQ END ===== */";

const markerPattern = new RegExp(
  `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
  "g"
);

css = css.replace(markerPattern, "").trimEnd();

const faqCss = `
${startMarker}

/*
  产品详情页 FAQ：
  - 折叠展开式
  - 左右留出内边距
  - 展开 / 收起加入过渡动画
  - 去掉默认黑色 focus 边框
*/

.faqSection {
  margin-top: 48px;
  padding-top: 0;
  border-top: 0;
}

.faqHeader {
  margin-bottom: 18px;
}

.faqHeader h2 {
  margin: 0;
  color: #0b2f5b;
  font-size: 26px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.faqHeader p {
  display: none;
}

.faqList {
  border-top: 1px solid #dbe3ee;
}

.faqItem {
  border-bottom: 1px solid #dbe3ee;
  background: #ffffff;
}

.faqQuestion {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 34px;
  width: 100%;
  padding: 22px 28px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #0b2f5b;
  text-align: left;
  cursor: pointer;
  align-items: center;
  gap: 24px;
  transition:
    background-color 0.18s ease,
    color 0.18s ease;
}

.faqQuestion:hover {
  background-color: rgba(0, 214, 170, 0.035);
}

.faqQuestion:focus {
  outline: none;
}

.faqQuestion:focus-visible {
  box-shadow: inset 0 0 0 1px rgba(0, 214, 170, 0.55);
}

.faqQuestionText {
  color: #0b2f5b;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.45;
}

.faqToggle {
  display: flex;
  width: 30px;
  height: 30px;
  color: #0b2f5b;
  font-size: 24px;
  font-weight: 400;
  line-height: 1;
  align-items: center;
  justify-content: center;
  transition:
    color 0.18s ease,
    transform 0.18s ease;
}

.faqItemOpen .faqToggle {
  color: #00b894;
  transform: rotate(180deg);
}

.faqAnswerWrap {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-6px);
  transition:
    max-height 0.28s ease,
    opacity 0.22s ease,
    transform 0.22s ease;
}

.faqItemOpen .faqAnswerWrap {
  max-height: 220px;
  opacity: 1;
  transform: translateY(0);
}

.faqAnswer {
  margin: 0;
  padding: 0 72px 24px 28px;
  max-width: 1080px;
  color: #32445d;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .faqSection {
    margin-top: 36px;
  }

  .faqHeader h2 {
    font-size: 24px;
  }

  .faqQuestion {
    grid-template-columns: minmax(0, 1fr) 30px;
    gap: 14px;
    padding: 20px 16px;
  }

  .faqQuestionText {
    font-size: 16px;
  }

  .faqToggle {
    width: 28px;
    height: 28px;
    font-size: 22px;
  }

  .faqAnswer {
    padding: 0 52px 20px 16px;
    font-size: 14px;
  }
}

${endMarker}
`;

css = `${css}\n\n${faqCss}\n`;

fs.writeFileSync(cssFile, css, "utf8");

console.log("已优化 FAQ：增加左右内边距，并加入展开收起动画。");
console.log("修改文件：", clientFile);
console.log("修改文件：", cssFile);
console.log("备份文件：", clientBackup);
console.log("备份文件：", cssBackup);

```

---

## scripts 目录脚本：patch-product-card-inner-final-layout.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-product-card-inner-final-layout.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "app",
  "products",
  "products.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-product-card-inner-final-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/*
  清理之前的卡片内部排版覆盖，避免重复叠加。
*/
const removeBlocks = [
  [
    "/* ===== FOREACH product card clean layout START ===== */",
    "/* ===== FOREACH product card clean layout END ===== */",
  ],
  [
    "/* ===== FOREACH product card inner layout only START ===== */",
    "/* ===== FOREACH product card inner layout only END ===== */",
  ],
  [
    "/* ===== FOREACH product card inner final layout START ===== */",
    "/* ===== FOREACH product card inner final layout END ===== */",
  ],
];

for (const [startMarker, endMarker] of removeBlocks) {
  const pattern = new RegExp(
    `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
    "g"
  );

  content = content.replace(pattern, "");
}

const block = `
/* ===== FOREACH product card inner final layout START ===== */

/*
  产品中心卡片内部最终排版：
  - 不改卡片外框
  - 不改 hover 外观
  - 不改按钮颜色
  - 只调整产品图、文字、横线、按钮位置
*/

.products-selection-page .product-image {
  height: 240px !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
  background: #ffffff !important;
}

.products-selection-page .product-image img {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: contain !important;
  object-position: center !important;
  transform: scale(1.08) !important;
  transform-origin: center center !important;
}

.products-selection-page .product-card:hover .product-image img {
  transform: scale(1.1) !important;
}

.products-selection-page .product-body {
  min-height: 210px !important;
  padding: 22px 18px 22px !important;
  display: flex !important;
  flex: 1 !important;
  flex-direction: column !important;
  border-top: 1px solid var(--line, #e5ebf2) !important;
  box-sizing: border-box !important;
}

.products-selection-page .product-title {
  margin: 0 0 12px !important;
  color: var(--brand-blue, #173368) !important;
  font-size: 22px !important;
  line-height: 1.25 !important;
  font-weight: 650 !important;
  text-align: left !important;
}

.products-selection-page .product-card:hover .product-title {
  color: var(--brand-blue, #173368) !important;
}

.products-selection-page .product-param-line {
  margin-top: 0 !important;
  color: rgba(23, 51, 104, 0.82) !important;
  font-size: 15px !important;
  line-height: 1.58 !important;
  font-weight: 400 !important;
  text-align: left !important;
}

.products-selection-page .product-actions {
  margin-top: auto !important;
  padding-top: 24px !important;
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 14px !important;
}

@media (max-width: 760px) {
  .products-selection-page .product-image {
    height: 190px !important;
  }

  .products-selection-page .product-body {
    min-height: auto !important;
    padding: 18px 14px 16px !important;
  }

  .products-selection-page .product-title {
    font-size: 18px !important;
  }

  .products-selection-page .product-param-line {
    font-size: 13px !important;
  }

  .products-selection-page .product-actions {
    padding-top: 18px !important;
    gap: 10px !important;
  }
}

/* ===== FOREACH product card inner final layout END ===== */
`;

content = `${content.trimEnd()}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已完成产品卡片内部排版优化。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-product-card-inner-layout-only.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-product-card-inner-layout-only.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "app",
  "products",
  "products.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-product-card-inner-layout-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/*
  1. 删除上一版会改变卡片外观的 override
*/
const removeBlocks = [
  [
    "/* ===== FOREACH product card clean layout START ===== */",
    "/* ===== FOREACH product card clean layout END ===== */",
  ],
];

for (const [startMarker, endMarker] of removeBlocks) {
  const pattern = new RegExp(
    `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
    "g"
  );

  content = content.replace(pattern, "");
}

/*
  2. 只添加卡片内部排版调整
*/
const startMarker = "/* ===== FOREACH product card inner layout only START ===== */";
const endMarker = "/* ===== FOREACH product card inner layout only END ===== */";

const markerPattern = new RegExp(
  `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  产品中心卡片内部排版优化：
  - 不改卡片边框
  - 不改 hover 外观
  - 不改按钮颜色
  - 不改顶部选中线
  - 只调整产品图、标题、参数、按钮之间的空间关系
*/

.products-selection-page .product-image {
  padding-top: 22px !important;
  padding-bottom: 12px !important;
}

.products-selection-page .product-image img {
  max-height: 82% !important;
  object-fit: contain !important;
  object-position: center bottom !important;
}

.products-selection-page .product-body {
  padding-top: 20px !important;
  padding-bottom: 20px !important;
}

.products-selection-page .product-title {
  margin-bottom: 10px !important;
}

.products-selection-page .product-param-line {
  margin-top: 0 !important;
  line-height: 1.6 !important;
}

.products-selection-page .product-actions {
  padding-top: 18px !important;
  gap: 14px !important;
}

@media (max-width: 760px) {
  .products-selection-page .product-image {
    padding-top: 18px !important;
    padding-bottom: 10px !important;
  }

  .products-selection-page .product-body {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
  }

  .products-selection-page .product-actions {
    padding-top: 14px !important;
    gap: 10px !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已恢复卡片外观，只调整卡片内部排版。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-product-detail-spec-table-style.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-product-detail-spec-table-style.js

```ts
const fs = require("fs");
const path = require("path");

/* =========================================================
   patch-product-detail-spec-table-style.js
   恒永达官网｜产品详情页规格表样式优化

   作用：
   1. 学习 IDEX 规格表的阅读方式
   2. 去掉强外框，只保留横线
   3. 表格内容左对齐
   4. 限制表格最大宽度
   5. 增加行 hover 高亮状态
   6. 只修改 CSS，不修改数据和页面逻辑
========================================================= */

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

if (!fs.existsSync(detailDir)) {
  console.error("找不到详情页组件目录：", detailDir);
  process.exit(1);
}

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("specTable") || content.includes("specPanelClean");
});

if (!targetFile) {
  console.error("没有找到包含 specTable / specPanelClean 的 CSS 文件。");
  console.error("请先手动搜索：Select-String -Path .\\components\\products\\detail\\*.css, .\\components\\products\\detail\\*.module.css -Pattern \"specTable\"");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-spec-table-${time}`;

fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

const startMarker = "/* ===== FOREACH product detail spec table readable override START ===== */";
const endMarker = "/* ===== FOREACH product detail spec table readable override END ===== */";

const overrideBlock = `
${startMarker}

/*
  产品详情页规格表样式优化：
  - 参考 IDEX 的规格表阅读方式
  - 不做强外框
  - 只保留横向分割线
  - 参数值左对齐
  - 鼠标经过行时浅色高亮，方便阅读
*/

.tabNav {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  justify-content: flex-start;
}

.panelWrap {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.specPanelClean {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  border: 0;
  box-shadow: none;
  background: #ffffff;
}

.specTable {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border: 0;
  background: #ffffff;
}

.specTable tbody {
  border: 0;
}

.specTable tr {
  border: 0;
  transition: background-color 0.18s ease;
}

.specTable th,
.specTable td {
  height: 52px;
  padding: 14px 24px;
  border: 0;
  border-bottom: 1px solid #dbe3ee;
  background: #ffffff;
  color: #0b2f5b;
  line-height: 1.5;
  vertical-align: middle;
  cursor: default;
}

.specTable th {
  width: 300px;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
}

.specTable td {
  font-weight: 400;
  text-align: left;
}

.specTable tr:first-child th,
.specTable tr:first-child td {
  border-top: 1px solid #dbe3ee;
}

.specTable tr:hover th,
.specTable tr:hover td {
  background-color: rgba(0, 214, 170, 0.055);
}

.specTable tr:hover th {
  color: #08294f;
}

@media (max-width: 768px) {
  .panelWrap,
  .specPanelClean,
  .tabNav {
    max-width: 100%;
  }

  .specTable {
    table-layout: auto;
  }

  .specTable th,
  .specTable td {
    padding: 12px 14px;
  }

  .specTable th {
    width: 42%;
    white-space: normal;
  }
}

${endMarker}
`;

// 避免重复追加：如果之前已经加过，就先删除旧 override
const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

content = `${content}\n\n${overrideBlock}\n`;

fs.writeFileSync(targetFile, content, "utf8");

console.log("已完成规格表样式优化。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-product-detail-spec-text-indent.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-product-detail-spec-text-indent.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("specTable");
});

if (!targetFile) {
  console.error("没有找到规格表 CSS 文件。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-spec-text-indent-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

const startMarker = "/* ===== FOREACH product detail spec table text indent START ===== */";
const endMarker = "/* ===== FOREACH product detail spec table text indent END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  规格表文字位置微调：
  - 表格宽度不变
  - 只让表格内文字不要太贴左
  - 保持参数值左对齐
*/

.specTable th {
  padding-left: 48px !important;
}

.specTable td {
  padding-left: 48px !important;
}

@media (max-width: 768px) {
  .specTable th,
  .specTable td {
    padding-left: 16px !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(targetFile, content, "utf8");

console.log("已将规格表文字内容向中间微调。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-product-detail-tab-active-style.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-product-detail-tab-active-style.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("tabButton") && content.includes("isActive");
});

if (!targetFile) {
  console.error("Cannot find detail css file with tabButton/isActive.");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-tab-active-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

const startMarker = "/* ===== FOREACH product detail tab active override START ===== */";
const endMarker = "/* ===== FOREACH product detail tab active override END ===== */";

const overrideBlock = `
${startMarker}

.tabNav {
  gap: 18px;
  border-bottom: 1px solid #dbe3ee;
}

.tabButton {
  position: relative;
  min-width: 108px;
  padding: 14px 18px 16px;
  border: 0;
  background: transparent;
  color: #0b2f5b;
  font-weight: 500;
  cursor: pointer;
  transition:
    color 0.18s ease,
    background-color 0.18s ease;
}

.tabButton:hover {
  background-color: rgba(0, 214, 170, 0.055);
  color: #08294f;
}

.tabButton.isActive {
  background-color: rgba(0, 214, 170, 0.10);
  color: #00cfa5;
  font-weight: 600;
}

.tabButton::after {
  content: "";
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 0;
  height: 0;
  background: transparent;
}

.tabButton.isActive::after {
  height: 3px;
  background: #00d6aa;
}

${endMarker}
`;

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();
content = `${content}\n\n${overrideBlock}\n`;

fs.writeFileSync(targetFile, content, "utf8");

console.log("Updated tab active style.");
console.log("File:", targetFile);
console.log("Backup:", backupFile);

```

---

## scripts 目录脚本：patch-product-detail-tab-bigger-underline.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-product-detail-tab-bigger-underline.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("tabButton") && content.includes("isActive");
});

if (!targetFile) {
  console.error("没有找到详情页 Tab 样式文件。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-tab-bigger-underline-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

const startMarker = "/* ===== FOREACH product detail tab active override START ===== */";
const endMarker = "/* ===== FOREACH product detail tab active override END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  Product detail tabs:
  - 居中排列
  - 文字略放大
  - 选中线居中并加长
  - 不使用背景色，保持干净
*/

.tabNav {
  justify-content: center;
  gap: 66px;
  border-bottom: 1px solid #dbe3ee;
}

.tabButton {
  position: relative;
  min-width: auto;
  padding: 16px 6px 17px;
  border: 0;
  background: transparent;
  color: #0b2f5b;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.2;
  cursor: pointer;
  transition: color 0.18s ease;
}

.tabButton:hover {
  color: #00b894;
  background: transparent;
}

.tabButton.isActive {
  color: #00cfa5;
  font-weight: 600;
  background: transparent;
}

.tabButton::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -1px;
  width: 0;
  height: 0;
  transform: translateX(-50%);
  background: transparent;
  border-radius: 999px;
  transition:
    width 0.18s ease,
    height 0.18s ease,
    background-color 0.18s ease;
}

.tabButton.isActive::after {
  width: 34px;
  height: 3px;
  background: #00d6aa;
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(targetFile, content, "utf8");

console.log("已放大详情页 Tab 文字，并加长居中下划线。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-product-detail-tab-center-style.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-product-detail-tab-center-style.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("tabButton") && content.includes("isActive");
});

if (!targetFile) {
  console.error("没有找到详情页 Tab 样式文件。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-tab-center-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

const startMarker = "/* ===== FOREACH product detail tab active override START ===== */";
const endMarker = "/* ===== FOREACH product detail tab active override END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const centerBlock = `
${startMarker}

/*
  Product detail tabs:
  - 居中排列，接近最初样式
  - 不做大色块
  - 选中状态用文字颜色 + 下划线表达
*/

.tabNav {
  justify-content: center;
  gap: 58px;
  border-bottom: 1px solid #dbe3ee;
}

.tabButton {
  position: relative;
  min-width: auto;
  padding: 14px 2px 15px;
  border: 0;
  background: transparent;
  color: #0b2f5b;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.18s ease;
}

.tabButton:hover {
  color: #00b894;
  background: transparent;
}

.tabButton.isActive {
  color: #00cfa5;
  font-weight: 600;
  background: transparent;
}

.tabButton::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 0;
  background: transparent;
}

.tabButton.isActive::after {
  height: 2px;
  background: #00d6aa;
}

${endMarker}
`;

content = `${content}\n\n${centerBlock}\n`;

fs.writeFileSync(targetFile, content, "utf8");

console.log("已将详情页 Tab 恢复为居中样式。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-product-detail-tab-clean-style.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-product-detail-tab-clean-style.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("tabButton") && content.includes("isActive");
});

if (!targetFile) {
  console.error("Cannot find detail css file with tabButton/isActive.");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-tab-clean-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

const startMarker = "/* ===== FOREACH product detail tab active override START ===== */";
const endMarker = "/* ===== FOREACH product detail tab active override END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const cleanBlock = `
${startMarker}

/*
  Clean tab style:
  - No active background block
  - No button-like visual
  - Active state is shown by text weight and underline only
*/

.tabNav {
  gap: 34px;
  border-bottom: 1px solid #dbe3ee;
}

.tabButton {
  position: relative;
  min-width: auto;
  padding: 14px 2px 15px;
  border: 0;
  background: transparent;
  color: #0b2f5b;
  font-weight: 500;
  cursor: pointer;
  transition:
    color 0.18s ease,
    background-color 0.18s ease;
}

.tabButton:hover {
  color: #00b894;
  background: transparent;
}

.tabButton.isActive {
  color: #00cfa5;
  font-weight: 600;
  background: transparent;
}

.tabButton::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 0;
  background: transparent;
}

.tabButton.isActive::after {
  height: 2px;
  background: #00d6aa;
}

${endMarker}
`;

content = `${content}\n\n${cleanBlock}\n`;

fs.writeFileSync(targetFile, content, "utf8");

console.log("Updated tab style to clean underline version.");
console.log("File:", targetFile);
console.log("Backup:", backupFile);

```

---

## scripts 目录脚本：patch-product-detail-tab-font-24.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-product-detail-tab-font-24.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("FOREACH product detail tab active override START");
});

if (!targetFile) {
  console.error("没有找到详情页 Tab override 样式。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-tab-font-24-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

/*
  将详情页 Tab 文字调整到接近“型号：EA-100-PMMA”的大小
*/
content = content.replace(
  /font-size:\s*(18|21|22|23|24)px;/g,
  "font-size: 24px;"
);

/*
  Tab 字变大后，下划线也略微加长
*/
content = content.replace(
  /width:\s*34px;/g,
  "width: 46px;"
);

fs.writeFileSync(targetFile, content, "utf8");

console.log("已将详情页 Tab 文字调整为 24px，并加长选中下划线。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-product-detail-tab-font-size.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-product-detail-tab-font-size.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("FOREACH product detail tab active override START");
});

if (!targetFile) {
  console.error("没有找到详情页 Tab override 样式。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-tab-font-size-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

/*
  只放大详情页规格 Tab 文字：
  规格 / 3D模型 / 零件图
*/
content = content.replace(
  /font-size:\s*18px;/g,
  "font-size: 21px;"
);

fs.writeFileSync(targetFile, content, "utf8");

console.log("已将详情页 Tab 文字放大到 21px。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-product-detail-tab-spacing.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-product-detail-tab-spacing.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("tabNav") && content.includes("tabButton");
});

if (!targetFile) {
  console.error("没有找到详情页 Tab 样式文件。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-tab-spacing-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

const startMarker = "/* ===== FOREACH product detail tab spacing START ===== */";
const endMarker = "/* ===== FOREACH product detail tab spacing END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  调整详情页资料 Tab 间距：
  - 让选中线离文字远一点
  - 让 Tab 区域和下方规格表保持一点呼吸感
*/

.tabNav {
  margin-bottom: 18px !important;
}

.tabNav .tabButton {
  padding-bottom: 26px !important;
}

.tabNav .tabButton::after {
  bottom: 8px !important;
}

.tabNav .tabButton.isActive::after {
  width: 46px !important;
  height: 3px !important;
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(targetFile, content, "utf8");

console.log("已调整详情页 Tab 文字与下划线间距。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-product-filter-sidebar-420.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-product-filter-sidebar-420.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "app",
  "products",
  "products.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到产品中心 CSS 文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-filter-sidebar-420-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH product center filter sidebar width START ===== */";
const endMarker = "/* ===== FOREACH product center filter sidebar width END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  产品中心筛选区宽度调整：
  - 左侧筛选栏加宽到 420px
  - 页面整体宽度同步放大
  - 右侧产品区仍保持电脑端一排 3 张卡片
*/

.products-page,
.product-selection-page,
.products-container,
.selection-container {
  max-width: 1640px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.product-selection-layout,
.selection-layout,
.products-layout {
  display: grid !important;
  grid-template-columns: 420px minmax(0, 1fr) !important;
  gap: 32px !important;
}

.product-filter-sidebar,
.filter-sidebar,
.selection-sidebar {
  width: 420px !important;
  min-width: 420px !important;
}

.product-card-grid,
.selection-card-grid,
.products-grid {
  grid-template-columns: repeat(3, minmax(300px, 1fr)) !important;
  gap: 28px !important;
}

@media (max-width: 1200px) {
  .product-selection-layout,
  .selection-layout,
  .products-layout {
    grid-template-columns: 340px minmax(0, 1fr) !important;
  }

  .product-filter-sidebar,
  .filter-sidebar,
  .selection-sidebar {
    width: 340px !important;
    min-width: 340px !important;
  }
}

@media (max-width: 768px) {
  .product-selection-layout,
  .selection-layout,
  .products-layout {
    display: block !important;
  }

  .product-filter-sidebar,
  .filter-sidebar,
  .selection-sidebar {
    width: 100% !important;
    min-width: 0 !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已将产品中心左侧筛选栏加宽到 420px。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：patch-product-intro-text-spacing.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-product-intro-text-spacing.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-product-desc-spacing-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH product intro text spacing START ===== */";
const endMarker = "/* ===== FOREACH product intro text spacing END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  产品详情页顶部简介文字优化：
  - 让产品简介更像核心说明，不像小备注
  - 增加行高和上下间距
  - 不影响标题、按钮、规格表
*/

.productDesc {
  margin-top: 20px !important;
  margin-bottom: 28px !important;
  max-width: 960px !important;
  color: #0b2f5b !important;
  font-size: 18px !important;
  font-weight: 400 !important;
  line-height: 1.75 !important;
  letter-spacing: 0 !important;
}

.application {
  margin-top: 4px !important;
}

.applicationTitle {
  margin-bottom: 10px !important;
  font-size: 18px !important;
  line-height: 1.45 !important;
}

.applicationText {
  font-size: 18px !important;
  line-height: 1.65 !important;
}

@media (max-width: 768px) {
  .productDesc {
    margin-top: 16px !important;
    margin-bottom: 22px !important;
    font-size: 16px !important;
    line-height: 1.7 !important;
  }

  .applicationTitle,
  .applicationText {
    font-size: 16px !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已放大产品详情页顶部简介文字，并增加间距。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：reduce-detail-page-bottom-padding.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\reduce-detail-page-bottom-padding.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-reduce-page-bottom-padding-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH reduce detail page bottom padding START ===== */";
const endMarker = "/* ===== FOREACH reduce detail page bottom padding END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  减少产品详情页规格表结束后到页脚之间的空白。
  原 .page 底部 padding 为 72px，这里压缩为 24px。
*/

.page {
  padding-bottom: 24px !important;
}

.detailSection {
  margin-bottom: 0 !important;
}

.panelWrap {
  margin-bottom: 0 !important;
}

/* 规格面板不额外保留底部高度 */
.specPanelClean {
  min-height: 0 !important;
  margin-bottom: 0 !important;
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已减少产品详情页底部空白。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：remove-detail-bottom-gap.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\remove-detail-bottom-gap.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-remove-bottom-gap-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

/*
  去掉产品详情页规格表到页脚之间的白色空白。
*/
content = content
  .replace(/padding-bottom:\s*24px\s*!important;/g, "padding-bottom: 0 !important;")
  .replace(/padding-bottom:\s*32px\s*!important;/g, "padding-bottom: 0 !important;")
  .replace(/padding-bottom:\s*12px\s*!important;/g, "padding-bottom: 0 !important;");

const startMarker = "/* ===== FOREACH remove detail bottom gap START ===== */";
const endMarker = "/* ===== FOREACH remove detail bottom gap END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  最终压缩产品详情页底部空白：
  规格表结束后直接进入页脚区域。
*/

.page {
  padding-bottom: 0 !important;
}

.detailSection {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

.panelWrap {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

.specPanelClean {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已去掉产品详情页规格表下方白色空白。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：remove-zh-faq-label.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\remove-zh-faq-label.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "ProductDetailClient.tsx"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-remove-zh-faq-label-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

/*
  中文详情页 FAQ 区域：
  只保留“常见问题”，去掉英文 FAQ 小标题。
*/
content = content.replace(
  /\s*<p>FAQ<\/p>/g,
  ""
);

fs.writeFileSync(file, content, "utf8");

console.log("已去掉中文详情页 FAQ 区域中的英文 FAQ 小标题。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：reset-final-spec-table-layout.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\reset-final-spec-table-layout.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-final-spec-layout-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/*
  清理之前多次追加的规格表 override，避免 padding / width / grid 互相打架。
*/
const markerPairs = [
  [
    "/* ===== FOREACH product detail spec table readable override START ===== */",
    "/* ===== FOREACH product detail spec table readable override END ===== */",
  ],
  [
    "/* ===== FOREACH product detail spec table text indent START ===== */",
    "/* ===== FOREACH product detail spec table text indent END ===== */",
  ],
  [
    "/* ===== FOREACH force spec value column right START ===== */",
    "/* ===== FOREACH force spec value column right END ===== */",
  ],
  [
    "/* ===== FOREACH force spec table grid column START ===== */",
    "/* ===== FOREACH force spec table grid column END ===== */",
  ],
  [
    "/* ===== FOREACH final spec table layout START ===== */",
    "/* ===== FOREACH final spec table layout END ===== */",
  ],
];

for (const [start, end] of markerPairs) {
  const pattern = new RegExp(
    `${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`,
    "g"
  );
  content = content.replace(pattern, "");
}

const finalBlock = `
/* ===== FOREACH final spec table layout START ===== */

/*
  产品详情页规格表最终样式：
  - 表格宽度保持当前页面宽度
  - 左列字段名固定 420px，让右侧参数值自然靠右
  - 只保留横向分割线
  - 鼠标经过行有浅色高亮
  - 不使用外框和竖线
*/

.specPanelClean {
  padding: 0 !important;
  border: 0 !important;
  box-shadow: none !important;
  background: #ffffff !important;
}

.specPanelClean .specTable {
  display: block !important;
  width: 100% !important;
  border: 0 !important;
  border-collapse: collapse !important;
  table-layout: auto !important;
  background: #ffffff !important;
}

.specPanelClean .specTable tbody {
  display: block !important;
  width: 100% !important;
}

.specPanelClean .specTable tr[data-product-spec-row="true"] {
  display: grid !important;
  grid-template-columns: 420px minmax(0, 1fr) !important;
  width: 100% !important;
  min-height: 56px !important;
  border-bottom: 1px solid #dbe3ee !important;
  transition: background-color 0.18s ease !important;
}

.specPanelClean .specTable tr[data-product-spec-row="true"]:first-child {
  border-top: 1px solid #dbe3ee !important;
}

.specPanelClean .specTable th,
.specPanelClean .specTable td {
  display: flex !important;
  align-items: center !important;
  width: auto !important;
  min-width: 0 !important;
  height: auto !important;
  margin: 0 !important;
  border: 0 !important;
  background: #ffffff !important;
  color: #0b2f5b !important;
  line-height: 1.45 !important;
  text-align: left !important;
  vertical-align: middle !important;
  box-sizing: border-box !important;
  cursor: default !important;
}

.specPanelClean .specTable th {
  padding: 14px 32px 14px 48px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  justify-content: flex-start !important;
  white-space: nowrap !important;
}

.specPanelClean .specTable td {
  padding: 14px 32px 14px 32px !important;
  font-size: 17px !important;
  font-weight: 400 !important;
  justify-content: flex-start !important;
  white-space: normal !important;
}

.specPanelClean .specTable tr[data-product-spec-row="true"]:hover th,
.specPanelClean .specTable tr[data-product-spec-row="true"]:hover td {
  background-color: rgba(0, 214, 170, 0.055) !important;
}

@media (max-width: 768px) {
  .specPanelClean .specTable tr[data-product-spec-row="true"] {
    grid-template-columns: minmax(108px, 36%) minmax(0, 1fr) !important;
    min-height: 42px !important;
  }

  .specPanelClean .specTable th,
  .specPanelClean .specTable td {
    padding: 9px 10px !important;
    font-size: 14px !important;
    white-space: normal !important;
    word-break: break-word !important;
    overflow-wrap: anywhere !important;
  }
}

/* ===== FOREACH final spec table layout END ===== */
`;

content = `${content.trimEnd()}\n\n${finalBlock}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已重置规格表最终样式。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：reset-product-card-final-stable.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\reset-product-card-final-stable.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "app",
  "products",
  "products.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-reset-product-card-final-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/*
  清理之前多次追加的产品卡片 override。
  保留产品中心宽度、筛选栏宽度，不动页面整体布局。
*/
const removeBlocks = [
  ["/* ===== FOREACH product center enlarge cards START ===== */", "/* ===== FOREACH product center enlarge cards END ===== */"],
  ["/* ===== FOREACH product card clean layout START ===== */", "/* ===== FOREACH product card clean layout END ===== */"],
  ["/* ===== FOREACH product card inner layout only START ===== */", "/* ===== FOREACH product card inner layout only END ===== */"],
  ["/* ===== FOREACH product card inner final layout START ===== */", "/* ===== FOREACH product card inner final layout END ===== */"],
  ["/* ===== FOREACH product card final clean inner START ===== */", "/* ===== FOREACH product card final clean inner END ===== */"],
  ["/* ===== FOREACH product card inner keep highlight START ===== */", "/* ===== FOREACH product card inner keep highlight END ===== */"],
  ["/* ===== FOREACH product card text button layout START ===== */", "/* ===== FOREACH product card text button layout END ===== */"],
  ["/* ===== FOREACH product card button compact START ===== */", "/* ===== FOREACH product card button compact END ===== */"],
  ["/* ===== FOREACH product card text left align START ===== */", "/* ===== FOREACH product card text left align END ===== */"],
  ["/* ===== FOREACH product card final stable START ===== */", "/* ===== FOREACH product card final stable END ===== */"],
];

for (const [startMarker, endMarker] of removeBlocks) {
  const pattern = new RegExp(
    `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
    "g"
  );

  content = content.replace(pattern, "");
}

const block = `
/* ===== FOREACH product card final stable START ===== */

/*
  产品中心卡片最终稳定版：
  - 保留顶部绿色线
  - 保留 hover / 选中绿边
  - 保留型号较大、较粗
  - 只优化内部排版
*/

.products-selection-page .product-card {
  min-height: 410px !important;
}

/* 保留顶部绿色线，不弱化 */
.products-selection-page .selected-bar {
  height: 4px !important;
}

/* 保留 hover / 选中绿边 */
.products-selection-page .product-card:hover {
  border-color: var(--brand-cyan, #09e9b4) !important;
}

/* 图片区尽量减少上下左右空白 */
.products-selection-page .product-image {
  height: 245px !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: #ffffff !important;
  overflow: hidden !important;
}

.products-selection-page .product-image img {
  width: auto !important;
  height: auto !important;
  max-width: 96% !important;
  max-height: 230px !important;
  object-fit: contain !important;
  object-position: center !important;
}

/* 图片下方横线完整贯穿 */
.products-selection-page .product-body {
  min-height: 165px !important;
  padding: 18px 14px 18px !important;
  display: flex !important;
  flex: 1 !important;
  flex-direction: column !important;
  border-top: 1px solid var(--line, #e5ebf2) !important;
  box-sizing: border-box !important;
}

/* 型号保持大和粗，只让它靠左 */
.products-selection-page .product-title {
  margin: 0 0 10px !important;
  color: var(--brand-blue, #173368) !important;
  font-size: 22px !important;
  line-height: 1.25 !important;
  font-weight: 650 !important;
  text-align: left !important;
  white-space: nowrap !important;
}

/* 参数文字靠左 */
.products-selection-page .product-param-line {
  margin-top: 0 !important;
  color: rgba(23, 51, 104, 0.82) !important;
  font-size: 15px !important;
  line-height: 1.55 !important;
  font-weight: 400 !important;
  text-align: left !important;
}

/* 按钮区域压缩，不再留太多空白 */
.products-selection-page .product-actions {
  margin-top: 12px !important;
  padding-top: 0 !important;
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 10px !important;
}

.products-selection-page .product-link,
.products-selection-page .list-toggle {
  height: 38px !important;
  min-height: 38px !important;
  padding: 0 12px !important;
  font-size: 13px !important;
  font-weight: 700 !important;
}

@media (max-width: 760px) {
  .products-selection-page .product-card {
    min-height: auto !important;
  }

  .products-selection-page .product-image {
    height: 190px !important;
  }

  .products-selection-page .product-image img {
    max-height: 170px !important;
  }

  .products-selection-page .product-body {
    min-height: auto !important;
    padding: 16px 12px 16px !important;
  }

  .products-selection-page .product-title {
    font-size: 18px !important;
  }

  .products-selection-page .product-param-line {
    font-size: 13px !important;
  }

  .products-selection-page .product-actions {
    margin-top: 10px !important;
    gap: 8px !important;
  }

  .products-selection-page .product-link,
  .products-selection-page .list-toggle {
    height: 36px !important;
    min-height: 36px !important;
  }
}

/* ===== FOREACH product card final stable END ===== */
`;

content = `${content.trimEnd()}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已清理多余卡片样式，并写入最终稳定卡片排版。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：reset-product-detail-tab-clean.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\reset-product-detail-tab-clean.js

```ts
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("tabNav") && content.includes("tabButton");
});

if (!targetFile) {
  console.error("没有找到详情页 Tab 样式文件。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-tab-reset-clean-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

/*
  清理之前多次追加的 Tab override，避免样式互相打架。
*/
const markerPairs = [
  [
    "/* ===== FOREACH product detail tab active override START ===== */",
    "/* ===== FOREACH product detail tab active override END ===== */",
  ],
  [
    "/* ===== FOREACH force product detail tab size START ===== */",
    "/* ===== FOREACH force product detail tab size END ===== */",
  ],
  [
    "/* ===== FOREACH product detail tab spacing START ===== */",
    "/* ===== FOREACH product detail tab spacing END ===== */",
  ],
];

for (const [startMarker, endMarker] of markerPairs) {
  const pattern = new RegExp(
    `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
    "g"
  );
  content = content.replace(pattern, "");
}

const startMarker = "/* ===== FOREACH product detail tab final clean START ===== */";
const endMarker = "/* ===== FOREACH product detail tab final clean END ===== */";

const finalPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(finalPattern, "").trimEnd();

const block = `
${startMarker}

/*
  产品详情页资料 Tab 最终样式：
  - 居中
  - 字号接近“型号：EA-100-PMMA”
  - 文字与下方横线拉开距离
  - 不使用背景色
*/

.tabNav {
  justify-content: center !important;
  gap: 76px !important;
  border-bottom: 1px solid #dbe3ee !important;
  padding-bottom: 14px !important;
  margin-bottom: 18px !important;
}

.tabNav .tabButton {
  position: relative !important;
  min-width: auto !important;
  padding: 0 6px !important;
  border: 0 !important;
  background: transparent !important;
  color: #0b2f5b !important;
  font-size: 24px !important;
  font-weight: 500 !important;
  line-height: 1.2 !important;
  cursor: pointer !important;
}

.tabNav .tabButton:hover {
  color: #00b894 !important;
  background: transparent !important;
}

.tabNav .tabButton.isActive {
  color: #00cfa5 !important;
  font-weight: 600 !important;
  background: transparent !important;
}

.tabNav .tabButton::after {
  content: "" !important;
  position: absolute !important;
  left: 50% !important;
  right: auto !important;
  bottom: -14px !important;
  width: 0 !important;
  height: 0 !important;
  transform: translateX(-50%) !important;
  background: transparent !important;
  border-radius: 999px !important;
}

.tabNav .tabButton.isActive::after {
  width: 46px !important;
  height: 3px !important;
  background: #00d6aa !important;
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(targetFile, content, "utf8");

console.log("已重置详情页 Tab 样式：文字与下方横线已拉开距离。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：search-ea-full-models-in-xlsx.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\search-ea-full-models-in-xlsx.js

```ts
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

/* =========================================================
   search-ea-full-models-in-xlsx.js
   恒永达官网｜全项目搜索 EA 完整型号

   作用：
   1. 搜索所有 xlsx 文件
   2. 查找 EA-100-PMMA-UF-N 这类完整工程型号
   3. 只读取，不修改任何文件
========================================================= */

const root = process.argv[2] || process.cwd();

const skipDirs = new Set([
  "node_modules",
  ".next",
  ".git",
  "out",
]);

const fullModelPattern = /\bEA-\d+(?:UL)?-(?:PMMA|PEEK)(?:-[A-Z0-9]+){1,4}\b/gi;
const keywordPattern = /UF-N|UF|EA-\d+-(PMMA|PEEK)-/i;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      if (skipDirs.has(item.name)) continue;
      walk(fullPath, files);
      continue;
    }

    if (item.isFile() && item.name.toLowerCase().endsWith(".xlsx")) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = walk(root);

console.log("搜索目录：", root);
console.log("找到 xlsx 文件数量：", files.length);

let totalMatches = 0;

for (const file of files) {
  let workbook;

  try {
    workbook = xlsx.readFile(file);
  } catch (error) {
    console.warn("跳过无法读取文件：", file);
    continue;
  }

  let fileHasMatch = false;

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];

    const rows = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
      raw: false,
    });

    rows.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const text = String(cell || "").trim();

        if (!text) return;

        fullModelPattern.lastIndex = 0;

        const matches = text.match(fullModelPattern);

        if (matches || keywordPattern.test(text)) {
          if (!fileHasMatch) {
            console.log("\n==============================");
            console.log("文件：", file);
            fileHasMatch = true;
          }

          console.log(`Sheet：${sheetName} | 第 ${rowIndex + 1} 行，第 ${colIndex + 1} 列：${text}`);
          totalMatches += 1;
        }
      });
    });
  }
}

console.log("\n搜索完成。匹配数量：", totalMatches);

```

---

## scripts 目录脚本：widen-product-center-main-container.js

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\products\widen-product-center-main-container.js

```ts
const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "app",
  "products",
  "products.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-wider-product-center-container-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH product center wider main container START ===== */";
const endMarker = "/* ===== FOREACH product center wider main container END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  产品中心主内容区加宽：
  - 解决产品中心整体内容偏窄的问题
  - 不单独修改筛选栏宽度
  - 不强行修改卡片样式
  - 让搜索、分类、筛选和产品卡片整体占比更合理
*/

.products-page,
.products-container,
.product-selection-page,
.selection-container,
.product-selection-shell,
.products-shell,
.products-main,
.selection-main {
  width: min(100% - 96px, 1600px) !important;
  max-width: 1600px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.product-selection-layout,
.selection-layout,
.products-layout {
  width: 100% !important;
}

@media (max-width: 1200px) {
  .products-page,
  .products-container,
  .product-selection-page,
  .selection-container,
  .product-selection-shell,
  .products-shell,
  .products-main,
  .selection-main {
    width: min(100% - 48px, 100%) !important;
    max-width: none !important;
  }
}

@media (max-width: 768px) {
  .products-page,
  .products-container,
  .product-selection-page,
  .selection-container,
  .product-selection-shell,
  .products-shell,
  .products-main,
  .selection-main {
    width: calc(100% - 32px) !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已加宽产品中心主内容容器。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);

```

---

## scripts 目录脚本：convert-q20-fitting-replacement.ts

文件路径：F:\WebsiteProjects\foreach-website-2026\scripts\resources\convert-q20-fitting-replacement.ts

```ts
/* =========================================================
   convert-q20-fitting-replacement.ts
   恒永达官网｜快插接头 Q20 型号替代资料 Excel 转换脚本

   文件路径：
   scripts/resources/convert-q20-fitting-replacement.ts

   作用：
   1. 读取市场部维护的 Excel 原始资料
   2. 读取 Sheet：型号解析规则
   3. 读取 Sheet：产品数据模板
   4. 只筛选 Q20 数据
   5. 自动生成：
      data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts

   当前数据层级：
   fitting-replacement
   └─ fittings
      └─ quick-connect
         └─ q20

   说明：
   1. Excel 是人维护的数据源
   2. q20.zh.ts 是 Next.js 页面读取的 Q20 产品数据文件
   3. 后期做后台时，这个脚本逻辑可以迁移到后台导入功能中
========================================================= */

import fs from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx";

/* =========================================================
   项目路径配置

   process.cwd() 表示当前执行命令所在的项目根目录。

   执行命令：
   npx tsx scripts/resources/convert-q20-fitting-replacement.ts
========================================================= */
const PROJECT_ROOT = process.cwd();

/* Excel 原始资料路径 */
const SOURCE_EXCEL_PATH = path.join(
  PROJECT_ROOT,
  "data-source",
  "resources",
  "fitting-replacement",
  "Q20系列_测试数据.xlsx"
);

/* 自动生成的 TypeScript 数据文件路径 */
const OUTPUT_TS_PATH = path.join(
  PROJECT_ROOT,
  "data",
  "resources",
  "fitting-replacement",
  "fittings",
  "quick-connect",
  "q20",
  "q20.zh.ts"
);

/* Excel Sheet 名称，必须和 Excel 里保持一致 */
const RULE_SHEET_NAME = "型号解析规则";
const PRODUCT_SHEET_NAME = "产品数据模板";

/* 当前第一版只生成 Q20 */
const TARGET_SERIES = "Q20";

/* =========================================================
   Excel 行数据类型
========================================================= */
type ExcelRow = Record<string, unknown>;

/* =========================================================
   安全读取单元格内容

   说明：
   1. Excel 里可能有空单元格
   2. 商品编码可能被 Excel 识别成数字
   3. 这里统一转成字符串，方便后面写入 TS 文件
========================================================= */
function getCell(row: ExcelRow, key: string): string {
  const value = row[key];

  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

/* =========================================================
   判断“是否”为真

   支持：
   是 / YES / Yes / yes / true / 1
========================================================= */
function isYes(value: string): boolean {
  const normalizedValue = value.trim().toLowerCase();

  return (
    normalizedValue === "是" ||
    normalizedValue === "yes" ||
    normalizedValue === "true" ||
    normalizedValue === "1"
  );
}

/* =========================================================
   读取指定 Sheet

   defval: "" 的作用：
   空单元格也保留为空字符串，避免字段缺失
========================================================= */
function readSheetRows(workbook: XLSX.WorkBook, sheetName: string): ExcelRow[] {
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error(`找不到 Sheet：${sheetName}`);
  }

  return XLSX.utils.sheet_to_json<ExcelRow>(sheet, {
    defval: "",
  });
}

/* =========================================================
   根据字段顺序和字段名称生成 fieldKey

   说明：
   1. fieldKey 是代码内部使用的英文键名
   2. 不能只根据代码判断含义，因为 S 在不同位置含义不同
   3. 所以要根据“字段顺序 / 字段名称”判断
========================================================= */
function getFieldKey(fieldOrder: number, fieldNameZh: string) {
  if (fieldOrder === 1 || fieldNameZh.includes("系列")) {
    return "series";
  }

  if (fieldOrder === 2 || fieldNameZh.includes("管尺寸")) {
    return "tubeOrThread";
  }

  if (fieldOrder === 3 || fieldNameZh.includes("公母端")) {
    return "gender";
  }

  if (fieldOrder === 4 || fieldNameZh.includes("穿板")) {
    return "panelMount";
  }

  if (fieldOrder === 5 || fieldNameZh.includes("带阀")) {
    return "valved";
  }

  if (fieldOrder === 6 || fieldNameZh.includes("形状")) {
    return "shape";
  }

  if (fieldOrder === 7 || fieldNameZh.includes("外壳材质")) {
    return "housingMaterial";
  }

  if (fieldOrder === 8 || fieldNameZh.includes("密封圈材质")) {
    return "sealingRingMaterial";
  }

  throw new Error(`无法识别字段：字段顺序=${fieldOrder}，字段名称=${fieldNameZh}`);
}

/* =========================================================
   生成多语言文本对象

   说明：
   1. zh 必须有
   2. 其他语言如果 Excel 里为空，就不写入
========================================================= */
function buildI18nText(values: {
  zh: string;
  en?: string;
  es?: string;
  fr?: string;
  ko?: string;
  ru?: string;
}) {
  const result: Record<string, string> = {
    zh: values.zh,
  };

  if (values.en) result.en = values.en;
  if (values.es) result.es = values.es;
  if (values.fr) result.fr = values.fr;
  if (values.ko) result.ko = values.ko;
  if (values.ru) result.ru = values.ru;

  return result;
}

/* =========================================================
   读取型号解析规则

   Excel 对应 Sheet：
   型号解析规则

   本脚本只读取 Q20：
   系列 === Q20
========================================================= */
function buildModelRules(ruleRows: ExcelRow[]) {
  return ruleRows
    .filter((row) => getCell(row, "系列") === TARGET_SERIES)
    .filter((row) => isYes(getCell(row, "是否前台显示")))
    .map((row) => {
      const fieldOrder = Number(getCell(row, "字段顺序"));
      const fieldNameZh = getCell(row, "字段名称_中文");
      const code = getCell(row, "代码");

      if (!fieldOrder || !fieldNameZh || !code) {
        throw new Error(
          `型号解析规则存在空字段，请检查：字段顺序=${fieldOrder}，字段名称=${fieldNameZh}，代码=${code}`
        );
      }

      return {
        series: getCell(row, "系列"),
        fieldOrder,
        fieldKey: getFieldKey(fieldOrder, fieldNameZh),
        fieldName: buildI18nText({
          zh: fieldNameZh,
          en: getCell(row, "字段名称_English"),
          es: getCell(row, "字段名称_Español"),
          fr: getCell(row, "字段名称_Français"),
          ko: getCell(row, "字段名称_한국어"),
          ru: getCell(row, "字段名称_Русский"),
        }),
        positionDescription: getCell(row, "取值位置_中文"),
        code,
        meaning: buildI18nText({
          zh: getCell(row, "含义_中文"),
          en: getCell(row, "Meaning_English"),
          es: getCell(row, "Significado_Español"),
          fr: getCell(row, "Signification_Français"),
          ko: getCell(row, "의미_한국어"),
          ru: getCell(row, "Значение_Русский"),
        }),
      };
    });
}

/* =========================================================
   读取产品数据

   Excel 对应 Sheet：
   产品数据模板

   当前表格字段：
   商品编码
   型号
   竞品A编码
   竞品B编码
   竞品C编码
   包装
   是否首页展示
   备注
========================================================= */
function buildProducts(productRows: ExcelRow[]) {
  return productRows
    .filter((row) => getCell(row, "型号").startsWith(TARGET_SERIES))
    .map((row) => {
      const productCode = getCell(row, "商品编码");
      const foreachModel = getCell(row, "型号");

      if (!productCode || !foreachModel) {
        throw new Error(
          `产品数据存在空字段，请检查：商品编码=${productCode}，型号=${foreachModel}`
        );
      }

      const competitorModels = [
        getCell(row, "竞品A编码"),
        getCell(row, "竞品B编码"),
        getCell(row, "竞品C编码"),
      ].filter(Boolean);

      return {
        productCode,
        foreachModel,
        competitorModels,
        packageText: getCell(row, "包装"),
        showOnHome: isYes(getCell(row, "是否首页展示")),
        note: getCell(row, "备注"),
        imagePath: `/images/resources/selection-support/fitting-replacement/q20/products/${foreachModel}.webp`,
        drawingPdfPath: `/downloads/resources/selection-support/fitting-replacement/q20/drawings/${foreachModel}.pdf`,
      };
    });
}

/* =========================================================
   生成 TypeScript 文件内容
========================================================= */
function buildOutputFileContent(params: {
  products: ReturnType<typeof buildProducts>;
  modelRules: ReturnType<typeof buildModelRules>;
}) {
  const { products, modelRules } = params;

  return `/* =========================================================
   q20.zh.ts
   恒永达官网｜接头替代查询｜快插接头 Q20 中文数据

   文件路径：
   data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts

   作用：
   1. 存放快插接头 Q20 的产品数据
   2. 存放 Q20 型号解析规则
   3. 供接头替代查询首页、详情页、选型指引读取

   注意：
   1. 此文件由 scripts/resources/convert-q20-fitting-replacement.ts 自动生成
   2. 不建议手动修改本文件
   3. 如需修改产品数据，请修改 Excel：
      data-source/resources/fitting-replacement/Q20系列_测试数据.xlsx
   4. 修改 Excel 后重新运行：
      npx tsx scripts/resources/convert-q20-fitting-replacement.ts
========================================================= */

import type { FittingReplacementPageData } from "@/data/resources/fitting-replacement/fitting-replacement.types";

export const fittingReplacementQuickConnectQ20ZhData: FittingReplacementPageData = {
  banner: {
    eyebrow: "选型支持",
    title: "接头替代查询",
    description:
      "输入竞品编码、商品编码或恒永达型号，快速查找 Q20 快插接头对应产品。",
  },

  breadcrumbs: [
    {
      label: "首页",
      href: "/",
    },
    {
      label: "资源中心",
      href: "/resources",
    },
    {
      label: "接头替代查询",
      href: "/resources/selection-support/fitting-replacement",
    },
  ],

  search: {
    placeholder: "输入竞品编码、商品编码或恒永达型号",
    buttonText: "搜索",
  },

  products: ${JSON.stringify(products, null, 2)},

  modelRules: ${JSON.stringify(modelRules, null, 2)},
};
`;
}

/* =========================================================
   主流程
========================================================= */
function main() {
  if (!fs.existsSync(SOURCE_EXCEL_PATH)) {
    throw new Error(`找不到 Excel 文件：${SOURCE_EXCEL_PATH}`);
  }

  const workbook = XLSX.readFile(SOURCE_EXCEL_PATH);

  const ruleRows = readSheetRows(workbook, RULE_SHEET_NAME);
  const productRows = readSheetRows(workbook, PRODUCT_SHEET_NAME);

  const modelRules = buildModelRules(ruleRows);
  const products = buildProducts(productRows);

  const outputContent = buildOutputFileContent({
    products,
    modelRules,
  });

  fs.mkdirSync(path.dirname(OUTPUT_TS_PATH), {
    recursive: true,
  });

  fs.writeFileSync(OUTPUT_TS_PATH, outputContent, "utf-8");

  console.log("转换完成");
  console.log(`Excel 文件：${SOURCE_EXCEL_PATH}`);
  console.log(`生成文件：${OUTPUT_TS_PATH}`);
  console.log(`Q20 型号解析规则数量：${modelRules.length}`);
  console.log(`Q20 产品数量：${products.length}`);
}

main(); 
```

---

## 关键相关文件：data\products\detail\plunger-pump-detail.types.ts

文件路径：data\products\detail\plunger-pump-detail.types.ts

文件不存在。

---

## 关键相关文件：data\products\detail\plunger-pump-detail.generated.ts

文件路径：data\products\detail\plunger-pump-detail.generated.ts

文件不存在。

---

## 关键相关文件：data\products\selection\product-selection.generated.ts

文件路径：data\products\selection\product-selection.generated.ts

```ts
/* =========================================================
   product-selection.generated.ts
   产品中心｜选型页自动生成数据

   来源：
   data-source/product-center 下所有 -selection.xlsx 文件

   注意：
   1. 不要手动修改本文件
   2. 如需修改数据，请修改 Excel 后重新运行脚本
========================================================= */

import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
  ProductSelectionTaxonomyItem,
} from "./product-selection.types";

export const selectionProducts: ProductSelectionProduct[] = [
  {
    "productId": "pump-ea-100ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "ea",
    "cardTitle": {
      "zh": "EA-100-PMMA",
      "en": "EA-100-PMMA"
    },
    "cardSubtitle": {
      "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
      "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
    },
    "filters": {
      "filter01": "EA 常规柱塞泵",
      "filter02": "100μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp",
    "detailSlug": "ea-100-pmma",
    "status": "active",
    "sortOrder": 201,
    "searchKeywords": {
      "zh": "EA 常规柱塞泵 100μL PMMA 柱塞泵 plunger pump",
      "en": "EA standard plunger pump 100μL PMMA"
    }
  },
  {
    "productId": "pump-ea-100ul-peek",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "ea",
    "cardTitle": {
      "zh": "EA-100-PEEK",
      "en": "EA-100-PEEK"
    },
    "cardSubtitle": {
      "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
      "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
    },
    "filters": {
      "filter01": "EA 常规柱塞泵",
      "filter02": "100μL",
      "filter03": "PEEK"
    },
    "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-peek.webp",
    "detailSlug": "ea-100-peek",
    "status": "active",
    "sortOrder": 202,
    "searchKeywords": {
      "zh": "EA 常规柱塞泵 100μL PEEK 柱塞泵 plunger pump",
      "en": "EA standard plunger pump 100μL PEEK"
    }
  },
  {
    "productId": "pump-ea-250ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "ea",
    "cardTitle": {
      "zh": "EA-250-PMMA",
      "en": "EA-250-PMMA"
    },
    "cardSubtitle": {
      "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
      "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
    },
    "filters": {
      "filter01": "EA 常规柱塞泵",
      "filter02": "250μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-pmma.webp",
    "detailSlug": "ea-250-pmma",
    "status": "active",
    "sortOrder": 301,
    "searchKeywords": {
      "zh": "EA 常规柱塞泵 250μL PMMA 柱塞泵 plunger pump",
      "en": "EA standard plunger pump 250μL PMMA"
    }
  },
  {
    "productId": "pump-ea-250ul-peek",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "ea",
    "cardTitle": {
      "zh": "EA-250-PEEK",
      "en": "EA-250-PEEK"
    },
    "cardSubtitle": {
      "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
      "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
    },
    "filters": {
      "filter01": "EA 常规柱塞泵",
      "filter02": "250μL",
      "filter03": "PEEK"
    },
    "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-peek.webp",
    "detailSlug": "ea-250-peek",
    "status": "active",
    "sortOrder": 302,
    "searchKeywords": {
      "zh": "EA 常规柱塞泵 250μL PEEK 柱塞泵 plunger pump",
      "en": "EA standard plunger pump 250μL PEEK"
    }
  },
  {
    "productId": "pump-ea-500ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "ea",
    "cardTitle": {
      "zh": "EA-500-PMMA",
      "en": "EA-500-PMMA"
    },
    "cardSubtitle": {
      "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
      "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
    },
    "filters": {
      "filter01": "EA 常规柱塞泵",
      "filter02": "500μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-pmma.webp",
    "detailSlug": "ea-500-pmma",
    "status": "active",
    "sortOrder": 401,
    "searchKeywords": {
      "zh": "EA 常规柱塞泵 500μL PMMA 柱塞泵 plunger pump",
      "en": "EA standard plunger pump 500μL PMMA"
    }
  },
  {
    "productId": "pump-ea-500ul-peek",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "ea",
    "cardTitle": {
      "zh": "EA-500-PEEK",
      "en": "EA-500-PEEK"
    },
    "cardSubtitle": {
      "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
      "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
    },
    "filters": {
      "filter01": "EA 常规柱塞泵",
      "filter02": "500μL",
      "filter03": "PEEK"
    },
    "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-peek.webp",
    "detailSlug": "ea-500-peek",
    "status": "active",
    "sortOrder": 402,
    "searchKeywords": {
      "zh": "EA 常规柱塞泵 500μL PEEK 柱塞泵 plunger pump",
      "en": "EA standard plunger pump 500μL PEEK"
    }
  },
  {
    "productId": "pump-ea-1000ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "ea",
    "cardTitle": {
      "zh": "EA-1000-PMMA",
      "en": "EA-1000-PMMA"
    },
    "cardSubtitle": {
      "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
      "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
    },
    "filters": {
      "filter01": "EA 常规柱塞泵",
      "filter02": "1000μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-pmma.webp",
    "detailSlug": "ea-1000-pmma",
    "status": "active",
    "sortOrder": 501,
    "searchKeywords": {
      "zh": "EA 常规柱塞泵 1000μL PMMA 柱塞泵 plunger pump",
      "en": "EA standard plunger pump 1000μL PMMA"
    }
  },
  {
    "productId": "pump-ea-1000ul-peek",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "ea",
    "cardTitle": {
      "zh": "EA-1000-PEEK",
      "en": "EA-1000-PEEK"
    },
    "cardSubtitle": {
      "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
      "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
    },
    "filters": {
      "filter01": "EA 常规柱塞泵",
      "filter02": "1000μL",
      "filter03": "PEEK"
    },
    "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-peek.webp",
    "detailSlug": "ea-1000-peek",
    "status": "active",
    "sortOrder": 502,
    "searchKeywords": {
      "zh": "EA 常规柱塞泵 1000μL PEEK 柱塞泵 plunger pump",
      "en": "EA standard plunger pump 1000μL PEEK"
    }
  },
  {
    "productId": "pump-ea-2500ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "ea",
    "cardTitle": {
      "zh": "EA-2500-PMMA",
      "en": "EA-2500-PMMA"
    },
    "cardSubtitle": {
      "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
      "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
    },
    "filters": {
      "filter01": "EA 常规柱塞泵",
      "filter02": "2500μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-pmma.webp",
    "detailSlug": "ea-2500-pmma",
    "status": "active",
    "sortOrder": 601,
    "searchKeywords": {
      "zh": "EA 常规柱塞泵 2500μL PMMA 柱塞泵 plunger pump",
      "en": "EA standard plunger pump 2500μL PMMA"
    }
  },
  {
    "productId": "pump-ea-2500ul-peek",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "ea",
    "cardTitle": {
      "zh": "EA-2500-PEEK",
      "en": "EA-2500-PEEK"
    },
    "cardSubtitle": {
      "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
      "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
    },
    "filters": {
      "filter01": "EA 常规柱塞泵",
      "filter02": "2500μL",
      "filter03": "PEEK"
    },
    "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-peek.webp",
    "detailSlug": "ea-2500-peek",
    "status": "active",
    "sortOrder": 602,
    "searchKeywords": {
      "zh": "EA 常规柱塞泵 2500μL PEEK 柱塞泵 plunger pump",
      "en": "EA standard plunger pump 2500μL PEEK"
    }
  },
  {
    "productId": "pump-ea-5000ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "ea",
    "cardTitle": {
      "zh": "EA-5000-PMMA",
      "en": "EA-5000-PMMA"
    },
    "cardSubtitle": {
      "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
      "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
    },
    "filters": {
      "filter01": "EA 常规柱塞泵",
      "filter02": "5000μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-pmma.webp",
    "detailSlug": "ea-5000-pmma",
    "status": "active",
    "sortOrder": 701,
    "searchKeywords": {
      "zh": "EA 常规柱塞泵 5000μL PMMA 柱塞泵 plunger pump",
      "en": "EA standard plunger pump 5000μL PMMA"
    }
  },
  {
    "productId": "pump-ea-5000ul-peek",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "ea",
    "cardTitle": {
      "zh": "EA-5000-PEEK",
      "en": "EA-5000-PEEK"
    },
    "cardSubtitle": {
      "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
      "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
    },
    "filters": {
      "filter01": "EA 常规柱塞泵",
      "filter02": "5000μL",
      "filter03": "PEEK"
    },
    "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-peek.webp",
    "detailSlug": "ea-5000-peek",
    "status": "active",
    "sortOrder": 702,
    "searchKeywords": {
      "zh": "EA 常规柱塞泵 5000μL PEEK 柱塞泵 plunger pump",
      "en": "EA standard plunger pump 5000μL PEEK"
    }
  },
  {
    "productId": "pump-ea-10000ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "ea",
    "cardTitle": {
      "zh": "EA-10000-PMMA",
      "en": "EA-10000-PMMA"
    },
    "cardSubtitle": {
      "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
      "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
    },
    "filters": {
      "filter01": "EA 常规柱塞泵",
      "filter02": "10000μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-pmma.webp",
    "detailSlug": "ea-10000-pmma",
    "status": "active",
    "sortOrder": 801,
    "searchKeywords": {
      "zh": "EA 常规柱塞泵 10000μL PMMA 柱塞泵 plunger pump",
      "en": "EA standard plunger pump 10000μL PMMA"
    }
  },
  {
    "productId": "pump-ea-10000ul-peek",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "ea",
    "cardTitle": {
      "zh": "EA-10000-PEEK",
      "en": "EA-10000-PEEK"
    },
    "cardSubtitle": {
      "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
      "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
    },
    "filters": {
      "filter01": "EA 常规柱塞泵",
      "filter02": "10000μL",
      "filter03": "PEEK"
    },
    "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-peek.webp",
    "detailSlug": "ea-10000-peek",
    "status": "active",
    "sortOrder": 802,
    "searchKeywords": {
      "zh": "EA 常规柱塞泵 10000μL PEEK 柱塞泵 plunger pump",
      "en": "EA standard plunger pump 10000μL PEEK"
    }
  },
  {
    "productId": "pump-sm-50ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "sm",
    "cardTitle": {
      "zh": "SM-50-PMMA",
      "en": "SM-50-PMMA"
    },
    "cardSubtitle": {
      "zh": "SM 微型柱塞泵",
      "en": "SM Miniature Plunger Pump"
    },
    "filters": {
      "filter01": "SM 微型柱塞泵",
      "filter02": "50μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-50ul-pmma.webp",
    "detailSlug": "sm-50-pmma",
    "status": "active",
    "sortOrder": 901,
    "searchKeywords": {
      "zh": "SM 微型柱塞泵 50μL PMMA 柱塞泵 plunger pump",
      "en": "SM miniature plunger pump 50μL PMMA"
    }
  },
  {
    "productId": "pump-sm-100ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "sm",
    "cardTitle": {
      "zh": "SM-100-PMMA",
      "en": "SM-100-PMMA"
    },
    "cardSubtitle": {
      "zh": "SM 微型柱塞泵",
      "en": "SM Miniature Plunger Pump"
    },
    "filters": {
      "filter01": "SM 微型柱塞泵",
      "filter02": "100μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-pmma.webp",
    "detailSlug": "sm-100-pmma",
    "status": "active",
    "sortOrder": 902,
    "searchKeywords": {
      "zh": "SM 微型柱塞泵 100μL PMMA 柱塞泵 plunger pump",
      "en": "SM miniature plunger pump 100μL PMMA"
    }
  },
  {
    "productId": "pump-sm-100ul-peek",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "sm",
    "cardTitle": {
      "zh": "SM-100-PEEK",
      "en": "SM-100-PEEK"
    },
    "cardSubtitle": {
      "zh": "SM 微型柱塞泵",
      "en": "SM Miniature Plunger Pump"
    },
    "filters": {
      "filter01": "SM 微型柱塞泵",
      "filter02": "100μL",
      "filter03": "PEEK"
    },
    "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-peek.webp",
    "detailSlug": "sm-100-peek",
    "status": "active",
    "sortOrder": 903,
    "searchKeywords": {
      "zh": "SM 微型柱塞泵 100μL PEEK 柱塞泵 plunger pump",
      "en": "SM miniature plunger pump 100μL PEEK"
    }
  },
  {
    "productId": "pump-sm-250ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "sm",
    "cardTitle": {
      "zh": "SM-250-PMMA",
      "en": "SM-250-PMMA"
    },
    "cardSubtitle": {
      "zh": "SM 微型柱塞泵",
      "en": "SM Miniature Plunger Pump"
    },
    "filters": {
      "filter01": "SM 微型柱塞泵",
      "filter02": "250μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-pmma.webp",
    "detailSlug": "sm-250-pmma",
    "status": "active",
    "sortOrder": 904,
    "searchKeywords": {
      "zh": "SM 微型柱塞泵 250μL PMMA 柱塞泵 plunger pump",
      "en": "SM miniature plunger pump 250μL PMMA"
    }
  },
  {
    "productId": "pump-sm-250ul-peek",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "sm",
    "cardTitle": {
      "zh": "SM-250-PEEK",
      "en": "SM-250-PEEK"
    },
    "cardSubtitle": {
      "zh": "SM 微型柱塞泵",
      "en": "SM Miniature Plunger Pump"
    },
    "filters": {
      "filter01": "SM 微型柱塞泵",
      "filter02": "250μL",
      "filter03": "PEEK"
    },
    "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-peek.webp",
    "detailSlug": "sm-250-peek",
    "status": "active",
    "sortOrder": 905,
    "searchKeywords": {
      "zh": "SM 微型柱塞泵 250μL PEEK 柱塞泵 plunger pump",
      "en": "SM miniature plunger pump 250μL PEEK"
    }
  },
  {
    "productId": "pump-sm-500ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "sm",
    "cardTitle": {
      "zh": "SM-500-PMMA",
      "en": "SM-500-PMMA"
    },
    "cardSubtitle": {
      "zh": "SM 微型柱塞泵",
      "en": "SM Miniature Plunger Pump"
    },
    "filters": {
      "filter01": "SM 微型柱塞泵",
      "filter02": "500μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-500ul-pmma.webp",
    "detailSlug": "sm-500-pmma",
    "status": "active",
    "sortOrder": 906,
    "searchKeywords": {
      "zh": "SM 微型柱塞泵 500μL PMMA 柱塞泵 plunger pump",
      "en": "SM miniature plunger pump 500μL PMMA"
    }
  },
  {
    "productId": "pump-sm-1000ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "sm",
    "cardTitle": {
      "zh": "SM-1000-PMMA",
      "en": "SM-1000-PMMA"
    },
    "cardSubtitle": {
      "zh": "SM 微型柱塞泵",
      "en": "SM Miniature Plunger Pump"
    },
    "filters": {
      "filter01": "SM 微型柱塞泵",
      "filter02": "1000μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-1000ul-pmma.webp",
    "detailSlug": "sm-1000-pmma",
    "status": "active",
    "sortOrder": 907,
    "searchKeywords": {
      "zh": "SM 微型柱塞泵 1000μL PMMA 柱塞泵 plunger pump",
      "en": "SM miniature plunger pump 1000μL PMMA"
    }
  },
  {
    "productId": "pump-tm-50ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "tm",
    "cardTitle": {
      "zh": "TM-50-PMMA",
      "en": "TM-50-PMMA"
    },
    "cardSubtitle": {
      "zh": "TM 超微型柱塞泵",
      "en": "TM Ultra-Compact Plunger Pump"
    },
    "filters": {
      "filter01": "TM 超微型柱塞泵",
      "filter02": "50μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/tm/pump-tm-50ul-pmma.webp",
    "detailSlug": "tm-50-pmma",
    "status": "active",
    "sortOrder": 1001,
    "searchKeywords": {
      "zh": "TM 超微型柱塞泵 50μL PMMA 柱塞泵 plunger pump",
      "en": "TM ultra-compact plunger pump 50μL PMMA"
    }
  },
  {
    "productId": "pump-tm-100ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "tm",
    "cardTitle": {
      "zh": "TM-100-PMMA",
      "en": "TM-100-PMMA"
    },
    "cardSubtitle": {
      "zh": "TM 超微型柱塞泵",
      "en": "TM Ultra-Compact Plunger Pump"
    },
    "filters": {
      "filter01": "TM 超微型柱塞泵",
      "filter02": "100μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/tm/pump-tm-100ul-pmma.webp",
    "detailSlug": "tm-100-pmma",
    "status": "active",
    "sortOrder": 1002,
    "searchKeywords": {
      "zh": "TM 超微型柱塞泵 100μL PMMA 柱塞泵 plunger pump",
      "en": "TM ultra-compact plunger pump 100μL PMMA"
    }
  },
  {
    "productId": "pump-tm-250ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "tm",
    "cardTitle": {
      "zh": "TM-250-PMMA",
      "en": "TM-250-PMMA"
    },
    "cardSubtitle": {
      "zh": "TM 超微型柱塞泵",
      "en": "TM Ultra-Compact Plunger Pump"
    },
    "filters": {
      "filter01": "TM 超微型柱塞泵",
      "filter02": "250μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/tm/pump-tm-250ul-pmma.webp",
    "detailSlug": "tm-250-pmma",
    "status": "active",
    "sortOrder": 1003,
    "searchKeywords": {
      "zh": "TM 超微型柱塞泵 250μL PMMA 柱塞泵 plunger pump",
      "en": "TM ultra-compact plunger pump 250μL PMMA"
    }
  },
  {
    "productId": "pump-tm-500ul-pmma",
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "seriesId": "tm",
    "cardTitle": {
      "zh": "TM-500-PMMA",
      "en": "TM-500-PMMA"
    },
    "cardSubtitle": {
      "zh": "TM 超微型柱塞泵",
      "en": "TM Ultra-Compact Plunger Pump"
    },
    "filters": {
      "filter01": "TM 超微型柱塞泵",
      "filter02": "500μL",
      "filter03": "PMMA"
    },
    "imageCard": "/images/products/pumps/plunger-pump/tm/pump-tm-500ul-pmma.webp",
    "detailSlug": "tm-500-pmma",
    "status": "active",
    "sortOrder": 1004,
    "searchKeywords": {
      "zh": "TM 超微型柱塞泵 500μL PMMA 柱塞泵 plunger pump",
      "en": "TM ultra-compact plunger pump 500μL PMMA"
    }
  }
];

export const selectionFilterLabels: ProductSelectionFilterLabel[] = [
  {
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "filterKey": "filter01",
    "label": {
      "zh": "产品系列",
      "en": "Series",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "inputType": "single",
    "sortOrder": 10,
    "visible": true
  },
  {
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "filterKey": "filter02",
    "label": {
      "zh": "量程",
      "en": "Volume",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "inputType": "multiple",
    "sortOrder": 20,
    "visible": true
  },
  {
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "filterKey": "filter03",
    "label": {
      "zh": "泵头材质",
      "en": "Pump Head Material",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "inputType": "multiple",
    "sortOrder": 30,
    "visible": true
  },
  {
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "filterKey": "filter04",
    "label": {
      "zh": "",
      "en": "",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "inputType": "multiple",
    "sortOrder": 40,
    "visible": false
  },
  {
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "filterKey": "filter05",
    "label": {
      "zh": "",
      "en": "",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "inputType": "multiple",
    "sortOrder": 50,
    "visible": false
  },
  {
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "filterKey": "filter06",
    "label": {
      "zh": "",
      "en": "",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "inputType": "multiple",
    "sortOrder": 60,
    "visible": false
  },
  {
    "categoryId": "pumps",
    "productTypeId": "plunger-pump",
    "filterKey": "filter07",
    "label": {
      "zh": "",
      "en": "",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "inputType": "multiple",
    "sortOrder": 70,
    "visible": false
  }
];

export const selectionTaxonomyItems: ProductSelectionTaxonomyItem[] = [
  {
    "type": "category",
    "id": "pumps",
    "label": {
      "zh": "泵系列",
      "en": "Pumps",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "sortOrder": 10
  },
  {
    "type": "productType",
    "id": "plunger-pump",
    "label": {
      "zh": "柱塞泵",
      "en": "Plunger Pump",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "sortOrder": 10
  },
  {
    "type": "series",
    "id": "ea",
    "label": {
      "zh": "EA 常规柱塞泵",
      "en": "EA Standard Plunger Pump",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "sortOrder": 10
  },
  {
    "type": "category",
    "id": "valves",
    "label": {
      "zh": "阀系列",
      "en": "Valves",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "sortOrder": 20
  },
  {
    "type": "productType",
    "id": "syringe-pump",
    "label": {
      "zh": "注射泵",
      "en": "Syringe Pump",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "sortOrder": 20
  },
  {
    "type": "category",
    "id": "needles",
    "label": {
      "zh": "针系列",
      "en": "Needles",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "sortOrder": 30
  },
  {
    "type": "productType",
    "id": "diaphragm-pump",
    "label": {
      "zh": "隔膜泵",
      "en": "Diaphragm Pump",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "sortOrder": 30
  },
  {
    "type": "category",
    "id": "fittings",
    "label": {
      "zh": "接头系列",
      "en": "Fittings",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "sortOrder": 40
  },
  {
    "type": "productType",
    "id": "pipette-pump",
    "label": {
      "zh": "移液泵",
      "en": "Pipette Pump",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "sortOrder": 40
  },
  {
    "type": "category",
    "id": "tubing",
    "label": {
      "zh": "管路系列",
      "en": "Tubing",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "sortOrder": 50
  },
  {
    "type": "productType",
    "id": "valveless-pump",
    "label": {
      "zh": "无阀泵",
      "en": "Valveless Pump",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "sortOrder": 50
  },
  {
    "type": "category",
    "id": "control",
    "label": {
      "zh": "智控系列",
      "en": "Control",
      "es": "",
      "fr": "",
      "ko": "",
      "ru": ""
    },
    "sortOrder": 60
  }
];



```

---

## 关键相关文件：components\products\selection\ProductSelectionCard.tsx

文件路径：components\products\selection\ProductSelectionCard.tsx

```ts
"use client";

import type { ProductSelectionProductItem } from "./product-selection-ui.types";
import { getProductCardSpecs } from "@/data/products/selection/card-copy/plunger-pump-card-copy";

type ProductSelectionCardProps = {
  product: ProductSelectionProductItem;
  title: string;
  subtitle: string;
  detailHref: string;
  isAdded: boolean;
  detailButtonText: string;
  addToListText: string;
  addedToListText: string;
  onToggleList: (productId: string) => void;
};

export default function ProductSelectionCard({
  product,
  title,
  subtitle,
  detailHref,
  isAdded,
  detailButtonText,
  addToListText,
  addedToListText,
  onToggleList,
}: ProductSelectionCardProps) {

  const cardSpecs = getProductCardSpecs(product);

  return (
    <article className="product-card" title={title}>
      <span className="selected-bar" />

      <div className="product-image" aria-label={title}>
        {product.imageCard ? (
          <img src={product.imageCard} alt={title} loading="lazy" />
        ) : (
          <div className="product-image-placeholder">鏆傛棤鍥剧墖</div>
        )}
      </div>

      <div className="product-body">
        <h3 className="product-title">{title}</h3>
        {cardSpecs.length > 0 ? (
          <ul className="product-card-specs" aria-label={`${title} 核心参数`}>
            {cardSpecs.map((spec) => (
              <li key={spec.label}>{spec.label}</li>
            ))}
          </ul>
        ) : null}

        <div className="product-actions">
          <a
            className="product-link"
            href={detailHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {detailButtonText}
          </a>

          <button
            className={`list-toggle ${isAdded ? "active" : ""}`}
            type="button"
            onClick={() => onToggleList(product.productId)}
          >
            {isAdded ? addedToListText : addToListText}
          </button>
        </div>
      </div>
    </article>
  );
}





```

---

## 关键相关文件：components\products\selection\ProductSelectionClient.tsx

文件路径：components\products\selection\ProductSelectionClient.tsx

```ts
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";

/* =========================================================
   ProductSelectionClient.tsx
   恒永达官网｜产品中心选型页客户端组件

   说明：
   1. 本文件只保留状态、筛选、搜索、分页和数据逻辑
   2. 筛选栏 / 产品卡片 / 分页 / 分类按钮已拆成通用模板组件
   3. 数据来源为 Excel 解析生成的数据文件
========================================================= */

import SitePageShell from "@/components/layout/SitePageShell";
import {
  getProductTypeFilterOptionsByCategory,
  getProductTypeHrefByIds,
  getSeriesFilterOptionsByProductType,
  getSeriesHrefByFilterValue,
  hasProductTypeRouteByIds,
} from "@/data/products/selection/product-route-map";
import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
import {
  selectionFilterLabels,
  selectionProducts,
  selectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";

import ProductCardGrid from "./ProductCardGrid";
import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductEmptyState from "./ProductEmptyState";
import ProductFilterPanel from "./ProductFilterPanel";
import ProductSelectionPagination from "./ProductSelectionPagination";
import ProductSelectionToolbar from "./ProductSelectionToolbar";

import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
  SelectionFilterKey,
  SelectionLocale,
} from "@/data/products/selection/product-selection.types";

import type {
  ProductSelectionCategoryItem,
  ProductSelectionFilterGroup,
  ProductSelectionSelectedTag,
} from "./product-selection-ui.types";

type ProductSelectionClientProps = {
  locale?: SelectionLocale;
  pageData?: unknown;
  initialCategoryId?: string;
  initialProductTypeId?: string;
  initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
};

type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;

const FILTER_KEYS: SelectionFilterKey[] = [
  "filter01",
  "filter02",
  "filter03",
  "filter04",
  "filter05",
  "filter06",
  "filter07",
  "filter08",
];

const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  zh: {
    breadcrumbHome: "首页",
    breadcrumbCurrent: "产品中心",
    searchPlaceholder: "搜索产品名称、系列、量程、材质等关键词",
    searchButton: "搜索",
    mobileCategoryPrefix: "产品大类：",
    productTypeLabel: "产品类型",
    resultPrefix: "已找到 ",
    resultSuffix: " 个基础配置",
    resetFilters: "清除筛选",
    submitRequirement: "提交需求",
    detailButton: "查看详情",
    addToList: "加入清单",
    addedToList: "已加入清单",
    previousPage: "上一页",
    nextPage: "下一页",
    filterEmpty: "当前产品大类暂无可用筛选项。",
    emptyTitle: "暂无匹配配置",
    emptyDescription: "可以减少筛选条件，或提交需求由工程师协助确认。",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Product Center",
    searchPlaceholder: "Search by product name, series, volume, material, or keyword",
    searchButton: "Search",
    mobileCategoryPrefix: "Category: ",
    productTypeLabel: "Product Type",
    resultPrefix: "",
    resultSuffix: " configurations found",
    resetFilters: "Clear Filters",
    submitRequirement: "Submit Request",
    detailButton: "View Details",
    addToList: "Add to List",
    addedToList: "Added",
    previousPage: "Previous",
    nextPage: "Next",
    filterEmpty: "No filters are available for this category.",
    emptyTitle: "No matching configurations",
    emptyDescription: "Try removing some filters or submit your requirements for engineering support.",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Centro de productos",
    searchPlaceholder: "Buscar por producto, serie, volumen, material o palabra clave",
    searchButton: "Buscar",
    mobileCategoryPrefix: "Categoría: ",
    productTypeLabel: "Tipo de producto",
    resultPrefix: "",
    resultSuffix: " configuraciones encontradas",
    resetFilters: "Borrar filtros",
    submitRequirement: "Enviar solicitud",
    detailButton: "Ver detalles",
    addToList: "Añadir",
    addedToList: "Añadido",
    previousPage: "Anterior",
    nextPage: "Siguiente",
    filterEmpty: "No hay filtros disponibles para esta categoría.",
    emptyTitle: "No hay configuraciones coincidentes",
    emptyDescription: "Reduzca los filtros o envíe sus requisitos para recibir soporte técnico.",
  },
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Centre produits",
    searchPlaceholder: "Rechercher par produit, série, volume, matériau ou mot-clé",
    searchButton: "Rechercher",
    mobileCategoryPrefix: "Catégorie : ",
    productTypeLabel: "Type de produit",
    resultPrefix: "",
    resultSuffix: " configurations trouvées",
    resetFilters: "Effacer les filtres",
    submitRequirement: "Envoyer une demande",
    detailButton: "Voir les détails",
    addToList: "Ajouter",
    addedToList: "Ajouté",
    previousPage: "Précédent",
    nextPage: "Suivant",
    filterEmpty: "Aucun filtre disponible pour cette catégorie.",
    emptyTitle: "Aucune configuration correspondante",
    emptyDescription: "Réduisez les filtres ou envoyez vos besoins pour obtenir une assistance technique.",
  },
  ko: {
    breadcrumbHome: "홈",
    breadcrumbCurrent: "제품 센터",
    searchPlaceholder: "제품명, 시리즈, 용량, 재질 또는 키워드로 검색",
    searchButton: "검색",
    mobileCategoryPrefix: "제품 분류: ",
    productTypeLabel: "제품 유형",
    resultPrefix: "",
    resultSuffix: "개 기본 구성을 찾았습니다",
    resetFilters: "필터 초기화",
    submitRequirement: "요청 제출",
    detailButton: "상세 보기",
    addToList: "목록 추가",
    addedToList: "추가됨",
    previousPage: "이전",
    nextPage: "다음",
    filterEmpty: "이 제품 분류에는 사용할 수 있는 필터가 없습니다.",
    emptyTitle: "일치하는 구성이 없습니다",
    emptyDescription: "필터를 줄이거나 요구사항을 제출해 엔지니어 지원을 받아보세요.",
  },
  ru: {
    breadcrumbHome: "Главная",
    breadcrumbCurrent: "Центр продуктов",
    searchPlaceholder: "Поиск по названию, серии, объему, материалу или ключевому слову",
    searchButton: "Поиск",
    mobileCategoryPrefix: "Категория: ",
    productTypeLabel: "Тип продукта",
    resultPrefix: "Найдено ",
    resultSuffix: " конфигураций",
    resetFilters: "Сбросить фильтры",
    submitRequirement: "Отправить запрос",
    detailButton: "Подробнее",
    addToList: "В список",
    addedToList: "Добавлено",
    previousPage: "Назад",
    nextPage: "Далее",
    filterEmpty: "Для этой категории нет доступных фильтров.",
    emptyTitle: "Нет подходящих конфигураций",
    emptyDescription: "Уменьшите количество фильтров или отправьте требования для инженерной поддержки.",
  },
};

const DEFAULT_CATEGORIES: ProductSelectionCategoryItem[] = [
  {
    id: "pumps",
    label: "泵系列",
    description: "根据泵类型、系列、量程和核心筛选项选择基础配置。",
    sortOrder: 10,
  },
  {
    id: "valves",
    label: "阀系列",
    description: "根据阀类型、系列、通路、位数和材质选择基础配置。",
    sortOrder: 20,
  },
  {
    id: "needles",
    label: "针系列",
    description: "根据针类型、规格和应用场景选择基础配置。",
    sortOrder: 30,
  },
  {
    id: "fittings",
    label: "接头系列",
    description: "根据接头类型、管径、螺纹和材质选择基础配置。",
    sortOrder: 40,
  },
  {
    id: "tubing",
    label: "管路系列",
    description: "根据管材、外径、内径和应用需求选择基础配置。",
    sortOrder: 50,
  },
  {
    id: "control",
    label: "智控系列",
    description: "根据控制方式、驱动类型和系统接口选择基础配置。",
    sortOrder: 60,
  },
];

function getText(
  locale: SelectionLocale,
  value: Partial<Record<SelectionLocale, string>> | undefined,
  fallback = ""
) {
  if (!value) return fallback;

  return value[locale] || value.zh || value.en || fallback;
}

function getTaxonomyLabel(locale: SelectionLocale, id: string) {
  const item = selectionTaxonomyItems.find((entry) => entry.id === id);

  return getText(locale, item?.label, id);
}

function getCategoryItems(locale: SelectionLocale) {
  const generatedCategories = selectionTaxonomyItems
    .filter((item) => item.type === "category")
    .map((item) => {
      const fallback = DEFAULT_CATEGORIES.find(
        (category) => category.id === item.id
      );

      return {
        id: item.id,
        label: getText(locale, item.label, fallback?.label || item.id),
        description:
          fallback?.description ||
          "根据产品类型、系列和筛选条件选择基础配置。",
        sortOrder: item.sortOrder,
      };
    });

  const categoryMap = new Map<string, ProductSelectionCategoryItem>();

  DEFAULT_CATEGORIES.forEach((category) => {
    categoryMap.set(category.id, category);
  });

  generatedCategories.forEach((category) => {
    categoryMap.set(category.id, category);
  });

  return Array.from(categoryMap.values()).sort(
    (current, next) => current.sortOrder - next.sortOrder
  );
}

function getProductsByCategory(categoryId: string) {
  return selectionProducts
    .filter((product) => {
      return product.categoryId === categoryId && product.status === "active";
    })
    .sort((current, next) => current.sortOrder - next.sortOrder);
}

function getFirstProductTypeId(categoryId: string) {
  const products = getProductsByCategory(categoryId);
  const first = products[0];

  return first?.productTypeId || "";
}

function getVisibleFilterLabels(productTypeId: string) {
  return selectionFilterLabels
    .filter((item) => item.productTypeId === productTypeId && item.visible)
    .sort((current, next) => current.sortOrder - next.sortOrder);
}

function getFilterOptions(
  products: ProductSelectionProduct[],
  filterKey: SelectionFilterKey,
  selectedFilters: SelectedFilterMap,
  productTypeId: string
) {
  return getProductFilterOptions({
    productTypeId,
    products,
    filterKey,
    selectedFilters,
  });
}
function getDefaultSelectedFilters(
  _categoryId: string,
  _productTypeId: string
): SelectedFilterMap {
  /*
   * 说明：
   * 1. 二级产品类型页只代表“柱塞泵”
   * 2. 不应该默认选中 EA / SM / TM
   * 3. 三级系列页会通过 initialFilters 单独选中对应系列
   */
  return {};
}

function getInitialSelectedFilters(
  categoryId: string,
  productTypeId: string,
  initialFilters?: ProductSelectionClientProps["initialFilters"]
): SelectedFilterMap {
  const selected = getDefaultSelectedFilters(categoryId, productTypeId);

  if (!initialFilters) {
    return selected;
  }

  FILTER_KEYS.forEach((filterKey) => {
    const values = initialFilters[filterKey];

    if (!values || values.length === 0) {
      return;
    }

    selected[filterKey] = new Set(values.filter(Boolean));
  });

  return selected;
}

function getResponsiveProductPageSize() {
  if (typeof window === "undefined") {
    return 12;
  }

  const width = window.innerWidth;

  if (width <= 760) {
    return 6;
  }

  if (width <= 1280) {
    return 9;
  }

  return 12;
}

function getDefaultMobileOpenFilterGroups(productTypeId: string) {
  const openGroups: Record<string, boolean> = {
    productType: false,
  };

  getVisibleFilterLabels(productTypeId).forEach((filter) => {
    openGroups[filter.filterKey] = false;
  });

  return openGroups;
}

function makeDetailHref(product: ProductSelectionProduct) {
  return `/products/${product.categoryId}/${product.detailSlug}`;
}

export default function ProductSelectionClient({
  locale = "zh",
  initialCategoryId,
  initialProductTypeId,
  initialFilters,
}: ProductSelectionClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCategoryId = searchParams.get("category");
  const requestedProductTypeId = searchParams.get("productType");

  const pageText =
    PRODUCT_SELECTION_PAGE_TEXT[locale] || PRODUCT_SELECTION_PAGE_TEXT.zh;

  const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);

  const [activeCategoryId, setActiveCategoryId] = useState(() => {
    return initialCategoryId || categoryItems[0]?.id || "pumps";
  });

  const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";

    return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
  });

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
    () => {
      const initialActiveCategoryId =
        initialCategoryId || categoryItems[0]?.id || "pumps";
      const initialActiveProductTypeId =
        initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

      return getInitialSelectedFilters(
        initialActiveCategoryId,
        initialActiveProductTypeId,
        initialFilters
      );
    }
  );

  const [selectedList, setSelectedList] = useState<Set<string>>(() => new Set());
  const [searchKeyword, setSearchKeyword] = useState("");
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [mobileOpenFilterGroups, setMobileOpenFilterGroups] = useState<
    Record<string, boolean>
  >(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";
    const initialActiveProductTypeId =
      initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

    return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);
  });
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [productsPageSize, setProductsPageSize] = useState(12);

  const activeCategory = useMemo(() => {
    return (
      categoryItems.find((category) => category.id === activeCategoryId) ||
      categoryItems[0] ||
      DEFAULT_CATEGORIES[0]
    );
  }, [activeCategoryId, categoryItems]);

  const categoryProducts = useMemo(() => {
    return getProductsByCategory(activeCategoryId);
  }, [activeCategoryId]);

  const productTypeOptions = useMemo(() => {
    const optionMap = new Map<string, { value: string; label: string }>();

    /*
     * 说明：
     * 1. 先读取已有产品数据中的产品类型
     * 2. 这部分用于已经有产品卡片的数据，例如 EA 柱塞泵
     */
    categoryProducts.forEach((product) => {
      if (!product.productTypeId) return;

      if (!optionMap.has(product.productTypeId)) {
        optionMap.set(product.productTypeId, {
          value: product.productTypeId,
          label: getTaxonomyLabel(locale, product.productTypeId),
        });
      }
    });

    /*
     * 说明：
     * 1. 再从 product-route-map.ts 补充正式产品类型入口
     * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
     * 3. 左侧“产品类型”里也会先显示对应入口
     */
    getProductTypeFilterOptionsByCategory(activeCategoryId).forEach((option) => {
      if (!optionMap.has(option.value)) {
        optionMap.set(option.value, {
          value: option.value,
          label: option.label,
        });
      }
    });

    return Array.from(optionMap.values());
  }, [activeCategoryId, categoryProducts, locale]);

  const currentTypeProducts = useMemo(() => {
    if (!activeProductTypeId) {
      return categoryProducts;
    }

    return categoryProducts.filter((product) => {
      return product.productTypeId === activeProductTypeId;
    });
  }, [activeProductTypeId, categoryProducts]);

  const activeFilterLabels = useMemo(() => {
    return getVisibleFilterLabels(activeProductTypeId);
  }, [activeProductTypeId]);

  const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
    const groups: ProductSelectionFilterGroup[] = [];

    if (productTypeOptions.length > 0) {
      groups.push({
        key: "productType",
        title: pageText.productTypeLabel,
        inputType: "single",
        options: productTypeOptions,
      });
    }

    activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
      const options = getFilterOptions(
        currentTypeProducts,
        label.filterKey,
        selectedFilters,
        activeProductTypeId
      );

      if (options.length === 0) return;

      groups.push({
        key: label.filterKey,
        title: getText(locale, label.label, label.filterKey),
        inputType: label.inputType,
        options,
      });
    });

    return groups;
  }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);

  const matchedProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return categoryProducts.filter((product) => {
      if (activeProductTypeId && product.productTypeId !== activeProductTypeId) {
        return false;
      }

      const filterMatched = FILTER_KEYS.every((filterKey) => {
        const selectedValues = selectedFilters[filterKey];

        if (!selectedValues || selectedValues.size === 0) {
          return true;
        }

        const value = product.filters[filterKey];

        return Boolean(value && selectedValues.has(value));
      });

      if (!filterMatched) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      const searchText = [
        product.productId,
        product.categoryId,
        product.productTypeId,
        product.seriesId,
        product.detailSlug,
        product.cardTitle.zh,
        product.cardTitle.en,
        product.cardSubtitle.zh,
        product.cardSubtitle.en,
        product.searchKeywords.zh,
        product.searchKeywords.en,
        ...Object.values(product.filters),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchText.includes(keyword);
    });
  }, [activeProductTypeId, categoryProducts, searchKeyword, selectedFilters]);

  /*
   * 当前产品种类介绍数据
   * 说明：
   * 1. 根据当前产品大类和产品类型匹配介绍内容
   * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
   * 3. 找不到时不显示横幅
   */
  const activeProductTypeIntro = getProductTypeIntroByIds(
    activeCategoryId,
    activeProductTypeId
  );
  const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
    const tags: ProductSelectionSelectedTag[] = [];

    if (activeProductTypeId) {
      tags.push({
        key: "productType",
        value: activeProductTypeId,
        label: getTaxonomyLabel(locale, activeProductTypeId),
      });
    }

    FILTER_KEYS.forEach((filterKey) => {
      const values = selectedFilters[filterKey];

      if (!values || values.size === 0) return;

      values.forEach((value) => {
        tags.push({
          key: filterKey,
          value,
          label: value,
        });
      });
    });

    return tags;
  }, [activeProductTypeId, locale, selectedFilters]);

  const totalProductPages = Math.max(
    1,
    Math.ceil(matchedProducts.length / productsPageSize)
  );

  const safeCurrentProductPage = Math.min(
    currentProductPage,
    totalProductPages
  );

  const pagedProducts = matchedProducts.slice(
    (safeCurrentProductPage - 1) * productsPageSize,
    safeCurrentProductPage * productsPageSize
  );

  useEffect(() => {
    function updateProductsPageSize() {
      setProductsPageSize(getResponsiveProductPageSize());
    }

    updateProductsPageSize();

    window.addEventListener("resize", updateProductsPageSize);

    return () => {
      window.removeEventListener("resize", updateProductsPageSize);
    };
  }, []);

  useEffect(() => {
    const fallbackCategoryId = categoryItems[0]?.id || "pumps";
    const preferredCategoryId = requestedCategoryId || initialCategoryId;

    const nextCategoryId =
      preferredCategoryId &&
      categoryItems.some((category) => category.id === preferredCategoryId)
        ? preferredCategoryId
        : fallbackCategoryId;

    const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
    const preferredProductTypeId =
      requestedProductTypeId || initialProductTypeId;

    const productTypeExistsInProducts = Boolean(
      preferredProductTypeId &&
        categoryProductsForUrl.some(
          (product) => product.productTypeId === preferredProductTypeId
        )
    );

    const productTypeExistsInRouteMap = Boolean(
      preferredProductTypeId &&
        hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
    );

    const nextProductTypeId =
      preferredProductTypeId &&
      (productTypeExistsInProducts || productTypeExistsInRouteMap)
        ? preferredProductTypeId
        : getFirstProductTypeId(nextCategoryId);

    const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);

    setActiveCategoryId(nextCategoryId);
    setActiveProductTypeId(nextProductTypeId);
    setSelectedFilters(
      hasQuerySelection
        ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
        : getInitialSelectedFilters(
            nextCategoryId,
            nextProductTypeId,
            initialFilters
          )
    );
    setSearchKeyword("");
    setMobileCategoryOpen(false);
    setMobileOpenFilterGroups(
      getDefaultMobileOpenFilterGroups(nextProductTypeId)
    );
  }, [
    categoryItems,
    requestedCategoryId,
    requestedProductTypeId,
    initialCategoryId,
    initialProductTypeId,
    initialFilters,
  ]);

  useEffect(() => {
    setCurrentProductPage(1);
  }, [
    activeCategoryId,
    activeProductTypeId,
    selectedFilters,
    searchKeyword,
    productsPageSize,
  ]);
  /*
   * 筛选项联动后的自动清理：
   * 1. 当用户切换产品系列后，量程 / 材质可能不再属于当前系列
   * 2. 这里根据当前可见 filterGroups 自动移除无效筛选值
   * 3. 例如从 EA 切到 SM 后，自动清除 5000μL / 10000μL 等无效量程
   */
  useEffect(() => {
    const allowedValuesByFilterKey = new Map<SelectionFilterKey, Set<string>>();

    filterGroups.forEach((group) => {
      if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
        return;
      }

      const filterKey = group.key as SelectionFilterKey;
      allowedValuesByFilterKey.set(
        filterKey,
        new Set(group.options.map((option) => option.value))
      );
    });

    setSelectedFilters((current) => {
      let changed = false;
      const next: SelectedFilterMap = {
        ...current,
      };

      FILTER_KEYS.forEach((filterKey) => {
        const currentValues = next[filterKey];

        if (!currentValues || currentValues.size === 0) {
          return;
        }

        const allowedValues = allowedValuesByFilterKey.get(filterKey);

        if (!allowedValues || allowedValues.size === 0) {
          delete next[filterKey];
          changed = true;
          return;
        }

        const validValues = Array.from(currentValues).filter((value) =>
          allowedValues.has(value)
        );

        if (validValues.length !== currentValues.size) {
          if (validValues.length > 0) {
            next[filterKey] = new Set(validValues);
          } else {
            delete next[filterKey];
          }

          changed = true;
        }
      });

      return changed ? next : current;
    });
  }, [filterGroups]);

  function handleCategoryChange(categoryId: string) {
    const firstProductTypeId = getFirstProductTypeId(categoryId);

    setActiveCategoryId(categoryId);
    setActiveProductTypeId(firstProductTypeId);
    setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
    setSearchKeyword("");
    setMobileCategoryOpen(false);
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
  }

  function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
    setMobileOpenFilterGroups((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function handleProductTypeChange(productTypeId: string) {
    /*
     * 说明：
     * 1. 点击产品类型时，优先跳转正式 URL
     * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/
     * 3. 没配置正式 URL 的类型，才走原来的前端筛选逻辑
     */
    const productTypeHref = getProductTypeHrefByIds(
      activeCategoryId,
      productTypeId
    );

    if (productTypeHref) {
      router.push(productTypeHref);
      return;
    }

    setActiveProductTypeId(productTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
  }

  function handleFilterChange(
    group: ProductSelectionFilterGroup,
    value: string
  ) {
    /*
     * 说明：
     * 1. 产品类型筛选项，例如“柱塞泵”，仍然走 handleProductTypeChange
     * 2. 产品系列筛选项，例如 EA / SM / TM，不再使用 router.push
     * 3. 系列点击改为：
     *    - 原地更新 selectedFilters
     *    - 用 window.history.pushState 同步地址栏
     *    - 不触发 Next.js 页面重新跳转，避免页面明显跳动
     * 4. 普通筛选项，例如容量、材质，继续保留原地筛选逻辑
     */
    if (group.key === "productType") {
      handleProductTypeChange(value);
      return;
    }

    if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
      return;
    }

    const filterKey = group.key as SelectionFilterKey;

    /*
     * 说明：
     * 1. 先判断当前筛选项是否命中正式系列路由
     * 2. EA / SM / TM 会命中 product-route-map.ts 里的三级 URL
     * 3. 命中后不 router.push，而是原地切换状态并同步地址栏
     */
    const seriesHref = getSeriesHrefByFilterValue(
      activeCategoryId,
      activeProductTypeId,
      group.key,
      value
    );

    if (seriesHref) {
      const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );

      setSelectedFilters((current) => {
        const next: SelectedFilterMap = {
          ...current,
        };

        /*
         * 说明：
         * 系列筛选属于单选逻辑：
         * - 选择 EA 时，不再同时保留 SM / TM
         * - 选择 SM 时，不再同时保留 EA / TM
         * - 再次点击已选中的系列，则取消选择
         */
        if (isAlreadySelected) {
          delete next[filterKey];
        } else {
          next[filterKey] = new Set([value]);
        }

        return next;
      });

      /*
       * 说明：
       * 1. 选中系列时，同步到三级 URL
       * 2. 取消系列时，回到二级产品类型 URL
       * 3. 使用 pushState 不触发 Next 路由跳转，页面不会明显跳动
       */
      const nextHref = isAlreadySelected
        ? productTypeHref
        : seriesHref;

      if (nextHref) {
        const normalizedHref = nextHref.endsWith("/")
          ? nextHref
          : `${nextHref}/`;

        window.history.pushState(null, "", normalizedHref);
      }

      return;
    }

    /*
     * 说明：
     * 普通筛选项仍然走前端筛选，不改 URL。
     */
    setSelectedFilters((current) => {
      const next: SelectedFilterMap = {
        ...current,
      };

      const values = new Set(next[filterKey] || []);
      const shouldSelect = !values.has(value);

      if (group.inputType === "single") {
        values.clear();
      }

      if (shouldSelect) {
        values.add(value);
      } else {
        values.delete(value);
      }

      if (values.size === 0) {
        delete next[filterKey];
      } else {
        next[filterKey] = values;
      }

      return next;
    });
  }
  function isFilterOptionActive(
    group: ProductSelectionFilterGroup,
    value: string
  ) {
    /*
     * 说明：
     * 1. 这个函数用于告诉筛选面板：当前选项是否处于选中状态
     * 2. productType 是产品类型，例如“柱塞泵”
     * 3. filter01 / filter02 / filter03 是普通筛选项，例如产品系列、量程、材质
     * 4. 这里必须先判断 FILTER_KEYS，避免 TypeScript 认为 string 不能索引 selectedFilters
     */
    if (group.key === "productType") {
      return activeProductTypeId === value;
    }

    if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
      return false;
    }

    const filterKey = group.key as SelectionFilterKey;

    return selectedFilters[filterKey]?.has(value) || false;
  }
  function removeSelectedTag(
    key: string,
    value: string
  ) {
    /*
     * 说明：
     * 1. 这个函数用于移除顶部“已选筛选标签”
     * 2. productType 是产品类型，例如“柱塞泵”
     * 3. filter01 是产品系列，例如 EA / SM / TM
     * 4. 在三级系列页清除 EA / SM / TM 时，应回到二级柱塞泵页面
     */

    if (key === "productType") {
      setActiveProductTypeId("");
      setSelectedFilters({});
      return;
    }

    /*
     * 说明：
     * 1. 判断当前清除的标签是否命中正式系列路由
     * 2. 例如 EA 常规柱塞泵命中：
     *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
     * 3. 清除后跳回产品类型页：
     *    /products/pumps/plunger-pumps/
     */
    const seriesHref = getSeriesHrefByFilterValue(
      activeCategoryId,
      activeProductTypeId,
      key,
      value
    );

    if (seriesHref) {
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );

      if (productTypeHref) {
        router.push(productTypeHref);
        return;
      }
    }

    /*
     * 说明：
     * selectedFilters 的 key 只能是 SelectionFilterKey。
     * removeSelectedTag 传进来的 key 是 string，
     * 所以这里必须先判断 key 是否属于 FILTER_KEYS，再转换类型。
     */
    if (!FILTER_KEYS.includes(key as SelectionFilterKey)) {
      return;
    }

    const filterKey = key as SelectionFilterKey;

    setSelectedFilters((current) => {
      const next = {
        ...current,
      };

      const values = new Set(next[filterKey] || []);
      values.delete(value);

      if (values.size === 0) {
        delete next[filterKey];
      } else {
        next[filterKey] = values;
      }

      return next;
    });
  }
  function resetCurrentFilters() {
    const firstProductTypeId = getFirstProductTypeId(activeCategoryId);

    setActiveProductTypeId(firstProductTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
    setSearchKeyword("");
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
  }

  function toggleProductInList(productId: string) {
    setSelectedList((current) => {
      const next = new Set(current);

      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }

      return next;
    });
  }

  return (
    <div data-product-breadcrumb-shell="true" data-product-center-page="true">
<SitePageShell
      breadcrumbAriaLabel={
        locale === "zh" ? "面包屑导航" : "Breadcrumb"
      }
      breadcrumbItems={[
        {
          label: pageText.breadcrumbHome,
          href: locale === "zh" ? "/" : `/${locale}`,
        },
        {
          label: pageText.breadcrumbCurrent,
        },
      ]}
    >
      <main className="products-selection-page page">
      <div className="container">
        

        <ResourceSearchBar
          value={searchKeyword}
          onChange={setSearchKeyword}
          onSearch={setSearchKeyword}
          placeholder={pageText.searchPlaceholder}
          searchButtonText={pageText.searchButton}
          showRecentKeywords={false}
        />

        <ProductCategoryTabs
          categories={categoryItems}
          activeCategoryId={activeCategoryId}
          activeCategoryLabel={activeCategory.label}
          mobileCategoryOpen={mobileCategoryOpen}
          mobileCategoryPrefix={pageText.mobileCategoryPrefix}
          onToggleMobileCategory={() =>
            setMobileCategoryOpen((current) => !current)
          }
          onCategoryChange={handleCategoryChange}
        />

        {activeProductTypeIntro ? (
          <section
            className="product-type-intro-module"
            aria-label={`${activeProductTypeIntro.title}产品种类说明`}
          >
            <div className="product-type-intro-image">
              <img
                src={activeProductTypeIntro.image.src}
                alt={activeProductTypeIntro.image.alt}
                loading="lazy"
              />
            </div>

            <div className="product-type-intro-copy">
              <h2>{activeProductTypeIntro.title}</h2>

              {activeProductTypeIntro.paragraphs.map((paragraph) => {
                const emphasisText = "详情页查看或提交选型需求确认";
                const emphasisIndex = paragraph.indexOf(emphasisText);

                if (emphasisIndex < 0) {
                  return <p key={paragraph}>{paragraph}</p>;
                }

                return (
                  <p key={paragraph}>
                    {paragraph.slice(0, emphasisIndex)}
                    <strong className="product-type-intro-emphasis">
                      {emphasisText}
                    </strong>
                    {paragraph.slice(emphasisIndex + emphasisText.length)}
                  </p>
                );
              })}
            </div>
          </section>
        ) : null}
        <section className="selection-section">
          <div className="selection-layout">
            <ProductFilterPanel
              activeCategory={activeCategory}
              filterGroups={filterGroups}
              mobileOpenFilterGroups={mobileOpenFilterGroups}
              onToggleMobileGroup={toggleMobileFilterGroup}
              isOptionActive={isFilterOptionActive}
              onFilterChange={handleFilterChange}
              emptyText={pageText.filterEmpty}
            />

            <section className="product-area">
              <ProductSelectionToolbar
                total={matchedProducts.length}
                resultPrefix={pageText.resultPrefix}
                resultSuffix={pageText.resultSuffix}
                resetButtonText={pageText.resetFilters}
                selectedTags={selectedTagItems}
                onRemoveTag={removeSelectedTag}
                onResetFilters={resetCurrentFilters}
              />

              {matchedProducts.length > 0 ? (
                <>
                  <ProductCardGrid
                    products={pagedProducts}
                    selectedList={selectedList}
                    detailButtonText={pageText.detailButton}
                    addToListText={pageText.addToList}
                    addedToListText={pageText.addedToList}
                    getTitle={(product) =>
                      getText(locale, product.cardTitle, product.productId)
                    }
                    getSubtitle={(product) =>
                      getText(locale, product.cardSubtitle, "")
                    }
                    getDetailHref={makeDetailHref}
                    onToggleList={toggleProductInList}
                  />

                  <ProductSelectionPagination
                    currentPage={safeCurrentProductPage}
                    totalPages={totalProductPages}
                    previousText={pageText.previousPage}
                    nextText={pageText.nextPage}
                    onPageChange={setCurrentProductPage}
                  />
                </>
              ) : (
                <ProductEmptyState
                  title={pageText.emptyTitle}
                  description={pageText.emptyDescription}
                />
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
    </SitePageShell>
</div>
  );
}
















```

---

## 关键相关文件：app\products\products.css

文件路径：app\products\products.css

```ts
/* =========================================================
   products.css
   鎭掓案杈惧畼缃戯綔浜у搧涓績閫夊瀷椤典笓鐢?CSS

   璇存槑锛?
   1. 鍙湇鍔′骇鍝佷腑蹇冮€夊瀷椤?
   2. 浣跨敤 .products-selection-page 鍋氫綔鐢ㄥ煙锛岄伩鍏嶆薄鏌撳叾浠栭〉闈?
   3. 涓ユ牸鎸?H5 棰勮 V7 鐨勭粨鏋勪笌浜や簰杩佺Щ
========================================================= */

.products-selection-page {
  --brand-blue: #173368;
  --brand-cyan: #09e9b4;

  --text-main: #172033;
  --text-sub: #5f6b7a;
  --text-light: #8a96a8;

  --line: #e5ebf2;
  --bg-soft: #f6f9fc;
  --white: #ffffff;

  min-height: 100vh;
  padding: 24px 0 64px;
  background: #ffffff;
  color: var(--text-main);
  line-height: 1.6;
}

.products-selection-page * {
  box-sizing: border-box;
}

.products-selection-page a {
  color: inherit;
  text-decoration: none;
}

.products-selection-page button {
  font-family: inherit;
}

.products-selection-page .container {
  width: min(2200px, calc(100% - 80px));
  margin: 0 auto;
}

.products-selection-page .top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

.products-selection-page .breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-light);
  font-size: 14px;
  white-space: nowrap;
}

.products-selection-page .breadcrumb strong {
  color: var(--brand-blue);
  font-weight: 850;
}

.products-selection-page .list-status {
  min-height: 34px;
  padding: 0 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(23, 51, 104, 0.14);
  border-radius: 999px;
  background: #ffffff;
  color: var(--brand-blue);
  font-size: 13px;
  font-weight: 850;
  white-space: nowrap;
}

.products-selection-page .category-tabs-wrap {
  padding: 16px 0 22px;
  border-bottom: 1px solid var(--line);
  background: #ffffff;
}

.products-selection-page .category-tabs {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
  scrollbar-width: thin;
}

.products-selection-page .category-tab {
  min-height: 44px;
  padding: 0 22px;
  border-radius: 8px;
  border: 1px solid rgba(23, 51, 104, 0.16);
  background: #ffffff;
  color: var(--brand-blue);
  cursor: pointer;
  font-size: 15px;
  font-weight: 850;
  white-space: nowrap;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.products-selection-page .category-tab:hover,
.products-selection-page .category-tab.active {
  color: var(--brand-cyan);
  background: var(--brand-blue);
  border-color: var(--brand-blue);
}

.products-selection-page .selection-section {
  padding-top: 24px;
}

.products-selection-page .selection-layout {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 28px;
  align-items: start;
}

.products-selection-page .filter-panel {
  position: sticky;
  top: 24px;
  border: 1px solid var(--line);
  background: #ffffff;
}

.products-selection-page .filter-head {
  padding: 18px 18px 16px;
  background: #f3f6f9;
  border-bottom: 1px solid var(--line);
}

.products-selection-page .filter-head h3 {
  color: var(--brand-blue);
  font-size: 20px;
  line-height: 1.25;
  font-weight: 920;
}

.products-selection-page .filter-head p {
  margin-top: 6px;
  color: var(--text-sub);
  font-size: 13px;
  line-height: 1.6;
}

.products-selection-page .filter-group {
  border-bottom: 1px solid var(--line);
}

.products-selection-page .filter-group-title {
  padding: 15px 18px 8px;
  color: var(--brand-blue);
  font-size: 14px;
  font-weight: 920;
}

.products-selection-page .filter-options {
  display: grid;
  gap: 8px;
  padding: 0 12px 16px;
}

.products-selection-page .filter-options.two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.products-selection-page .filter-btn {
  min-height: 42px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid transparent;
  background: #f3f6f9;
  color: var(--text-main);
  cursor: pointer;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 780;
  text-align: left;
  transition:
    background 0.18s ease,
    color 0.18s ease;
}

.products-selection-page .filter-btn:hover {
  background: #f8fffd;
}

.products-selection-page .filter-control {
  width: 12px;
  height: 12px;
  flex: 0 0 auto;
  background: #ffffff;
  border: 1.5px solid #b9c5d3;
  position: relative;
  transition:
    border-color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
}

.products-selection-page .filter-btn.is-single .filter-control {
  border-radius: 50%;
}

.products-selection-page .filter-btn.is-multi .filter-control {
  border-radius: 3px;
}

.products-selection-page .filter-btn:hover .filter-control {
  border-color: var(--brand-cyan);
}

.products-selection-page .filter-btn.active {
  color: var(--brand-blue);
  background: #eefbf7;
}

.products-selection-page .filter-btn.active .filter-control {
  background: var(--brand-cyan);
  border-color: var(--brand-cyan);
  box-shadow: 0 0 0 5px rgba(9, 233, 180, 0.14);
}

.products-selection-page .filter-btn.is-single.active .filter-control::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #ffffff;
  transform: translate(-50%, -50%);
}

.products-selection-page .filter-btn.is-multi.active .filter-control::after {
  content: "\2713";
  position: absolute;
  left: 50%;
  top: 50%;
  color: var(--brand-blue);
  font-size: 10px;
  font-weight: 950;
  line-height: 1;
  transform: translate(-50%, -54%);
}

.products-selection-page .filter-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 14px;
  background: #ffffff;
}

.products-selection-page .filter-action-btn {
  min-height: 40px;
  border-radius: 8px;
  border: 1px solid rgba(23, 51, 104, 0.16);
  background: #ffffff;
  color: var(--brand-blue);
  cursor: pointer;
  font-size: 14px;
  font-weight: 850;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.products-selection-page .filter-action-btn:hover {
  background: var(--brand-blue);
  border-color: var(--brand-blue);
  color: var(--brand-cyan);
}

.products-selection-page .product-area {
  min-width: 0;
}

.products-selection-page .product-toolbar {
  margin-bottom: 18px;
  padding: 14px 16px;
  border: 1px solid var(--line);
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.products-selection-page .toolbar-left {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.products-selection-page .product-area-title {
  color: var(--brand-blue);
  font-size: 20px;
  line-height: 1.25;
  font-weight: 920;
  white-space: nowrap;
}

.products-selection-page .product-count {
  color: var(--text-light);
  font-size: 13px;
  font-weight: 760;
  white-space: nowrap;
}

.products-selection-page .selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
}

.products-selection-page .selected-tag {
  min-height: 26px;
  padding: 0 9px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  border: 1px solid rgba(9, 233, 180, 0.28);
  background: rgba(9, 233, 180, 0.11);
  color: var(--brand-blue);
  font-size: 12px;
  font-weight: 850;
  white-space: nowrap;
}

.products-selection-page .selected-tag button {
  width: 15px;
  height: 15px;
  display: inline-grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: rgba(23, 51, 104, 0.08);
  color: var(--brand-blue);
  cursor: pointer;
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
}

.products-selection-page .selected-tag button:hover {
  background: var(--brand-blue);
  color: var(--brand-cyan);
}

.products-selection-page .toolbar-reset {
  min-height: 34px;
  padding: 0 13px;
  border-radius: 999px;
  border: 1px solid rgba(23, 51, 104, 0.16);
  background: #ffffff;
  color: var(--brand-blue);
  cursor: pointer;
  font-size: 13px;
  font-weight: 850;
  white-space: nowrap;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.products-selection-page .toolbar-reset:hover {
  background: var(--brand-blue);
  border-color: var(--brand-blue);
  color: var(--brand-cyan);
}

.products-selection-page .product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.products-selection-page .product-card {
  position: relative;
  min-height: 500px;
  border: 1px solid var(--line);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: translateY(0);
  transition:
    border-color 0.22s ease,
    transform 0.22s ease;
}

.products-selection-page .product-card:hover {
  border-color: var(--brand-cyan);
  transform: translateY(-1px);
}

.products-selection-page .selected-bar {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 4px;
  background: var(--brand-cyan);
  transform: scaleX(0);
  transform-origin: left center;
  opacity: 0;
  pointer-events: none;
}

.products-selection-page .product-card:hover .selected-bar {
  opacity: 1;
  animation: productsSelectionHoverBarGrow 0.36s ease forwards;
}

@keyframes productsSelectionHoverBarGrow {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

.products-selection-page .product-image {
  height: 340px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 46%, rgba(255, 255, 255, 0.9), transparent 35%),
    linear-gradient(135deg, #f4f7fa, #e4ebf2);
}

.products-selection-page .product-visual {
  position: absolute;
  inset: 0;
  transform: scale(1);
  transform-origin: center center;
  transition: transform 0.32s ease;
}

.products-selection-page .product-card:hover .product-visual {
  transform: scale(1.07);
}

.products-selection-page .pump-body {
  position: absolute;
  left: 50%;
  top: 49%;
  width: 76%;
  height: 27%;
  border-radius: 34px;
  transform: translate(-50%, -50%) rotate(-6deg);
  background: linear-gradient(135deg, #ffffff, #d7e2ec);
  box-shadow: 0 18px 42px rgba(23, 51, 104, 0.1);
}

.products-selection-page .pump-head {
  position: absolute;
  left: 24%;
  top: 49%;
  width: 18%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(-6deg);
  background: rgba(255, 255, 255, 0.92);
  border: 14px solid #c7d5e2;
  box-shadow: 0 12px 28px rgba(23, 51, 104, 0.08);
}

.products-selection-page .pump-port {
  position: absolute;
  right: 18%;
  top: 49%;
  width: 11%;
  height: 10%;
  border-radius: 999px;
  transform: translate(0, -50%) rotate(-6deg);
  background: #c1ceda;
  box-shadow: inset 0 0 0 6px rgba(255, 255, 255, 0.6);
}

.products-selection-page .product-visual.pmma .pump-head {
  border-color: rgba(175, 207, 231, 0.96);
}

.products-selection-page .product-visual.peek .pump-head {
  border-color: rgba(64, 75, 84, 0.86);
}

.products-selection-page .product-body {
  min-height: 160px;
  padding: 20px 24px 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.products-selection-page .product-title {
  color: var(--brand-blue);
  font-size: 22px;
  line-height: 1.32;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s ease;
}

.products-selection-page .product-card:hover .product-title {
  color: var(--brand-cyan);
}

.products-selection-page .product-param-line {
  margin-top: 10px;
  color: rgba(23, 51, 104, 0.78);
  font-size: 14px;
  line-height: 1.4;
  font-weight: 400;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.products-selection-page .product-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: auto;
  padding-top: 18px;
}

.products-selection-page .product-link,
.products-selection-page .list-toggle {
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid rgba(23, 51, 104, 0.18);
  background: #ffffff;
  color: var(--brand-blue);
  cursor: pointer;
  font-size: 14px;
  font-weight: 850;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.products-selection-page .product-link:hover,
.products-selection-page .list-toggle:hover,
.products-selection-page .list-toggle.active {
  background: var(--brand-blue);
  border-color: var(--brand-blue);
  color: var(--brand-cyan);
}

.products-selection-page .empty-state {
  min-height: 360px;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 42px;
  border: 1px dashed #cbd5e1;
  background: #ffffff;
  text-align: center;
}

.products-selection-page .empty-state.active {
  display: flex;
}

.products-selection-page .empty-state h3 {
  color: var(--brand-blue);
  font-size: 24px;
  margin-bottom: 8px;
}

.products-selection-page .empty-state p {
  color: var(--text-sub);
}

@media (min-width: 2100px) {
  .products-selection-page .product-grid {
    grid-template-columns: repeat(4, 420px);
    gap: 24px;
  }

  .products-selection-page .product-card {
    width: 420px;
    height: 540px;
    min-height: 540px;
  }

  .products-selection-page .product-image {
    height: 378px;
  }

  .products-selection-page .product-body {
    height: 162px;
    min-height: 162px;
    padding: 20px 22px 20px;
  }
}

@media (max-width: 1600px) {
  .products-selection-page .container {
    width: min(1440px, calc(100% - 56px));
  }

  .products-selection-page .product-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .products-selection-page .product-card {
    min-height: 500px;
  }

  .products-selection-page .product-image {
    height: 340px;
  }

  .products-selection-page .product-body {
    min-height: 160px;
    padding: 20px 22px 20px;
  }
}

@media (max-width: 1180px) {
  .products-selection-page .selection-layout {
    grid-template-columns: 1fr;
  }

  .products-selection-page .filter-panel {
    position: relative;
    top: auto;
  }

  .products-selection-page .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .products-selection-page {
    padding-top: 20px;
  }

  .products-selection-page .container {
    width: min(100% - 32px, 1440px);
  }

  .products-selection-page .top-row,
  .products-selection-page .product-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .products-selection-page .toolbar-left {
    align-items: flex-start;
    flex-direction: column;
  }

  .products-selection-page .filter-options.two,
  .products-selection-page .product-grid {
    grid-template-columns: 1fr;
  }

  .products-selection-page .product-card {
    min-height: 480px;
  }

  .products-selection-page .product-image {
    height: 320px;
  }

  .products-selection-page .product-title {
    font-size: 22px;
  }

  .products-selection-page .product-actions {
    grid-template-columns: 1fr;
  }
}

/* FOREACH_PRODUCTS_LAYOUT_TUNE_V2_START */

/* =========================================================
   浜у搧涓績閫夊瀷椤靛竷灞€寰皟 V2

   鍘熷洜锛?
   1. 2K 涓嬪師 2200px 瀹瑰櫒 + 420px 鍥哄畾鍗＄墖杩囧ぇ
   2. 瀹规槗鍑虹幇妯悜婊氬姩
   3. 闈㈠寘灞?class 涓庡叾瀹冮〉闈㈠彲鑳藉啿绐?
========================================================= */

.products-selection-page {
  padding: 18px 0 56px;
  overflow-x: hidden;
}

.products-selection-page .container {
  width: min(1600px, calc(100% - 72px));
  margin: 0 auto;
}

/* 闈㈠寘灞?*/
.products-selection-page .products-breadcrumb-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 38px;
  padding-bottom: 14px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--line, #e5ebf2);
}

.products-selection-page .products-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-light, #8a96a8);
  font-size: 14px;
  font-weight: 760;
  white-space: nowrap;
}

.products-selection-page .products-breadcrumb strong {
  color: var(--brand-blue, #173368);
  font-weight: 900;
}

.products-selection-page .products-list-status {
  min-height: 34px;
  padding: 0 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(23, 51, 104, 0.14);
  border-radius: 999px;
  background: #ffffff;
  color: var(--brand-blue, #173368);
  font-size: 13px;
  font-weight: 850;
  white-space: nowrap;
}

/* 椤堕儴鍒嗙被 */
.products-selection-page .category-tabs-wrap {
  padding: 0 0 18px;
  margin-bottom: 0;
}

/* 涓讳綋甯冨眬 */
.products-selection-page .selection-section {
  padding-top: 20px;
}

.products-selection-page .selection-layout {
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 22px;
}

/* 宸︿晶绛涢€夌暐寰敹绱?*/
.products-selection-page .filter-head {
  padding: 16px 16px 14px;
}

.products-selection-page .filter-head h3 {
  font-size: 19px;
}

.products-selection-page .filter-group-title {
  padding: 14px 16px 8px;
}

.products-selection-page .filter-options {
  gap: 7px;
  padding: 0 10px 14px;
}

.products-selection-page .filter-btn {
  min-height: 38px;
  padding: 0 10px;
  font-size: 13px;
}

/* 鍙充晶宸ュ叿鏍?*/
.products-selection-page .product-toolbar {
  margin-bottom: 14px;
  padding: 12px 14px;
}

.products-selection-page .product-area-title {
  font-size: 19px;
}

/* 浜у搧缃戞牸锛氶粯璁?3 鍒楋紝2K 鍐嶇粰 4 鍒楋紝浣嗕笉鍥哄畾 420px */
.products-selection-page .product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

/* 鍗＄墖灏哄锛氬彇娑堜箣鍓?420px 鍥哄畾瀹介珮 */
.products-selection-page .product-card {
  width: auto !important;
  height: auto !important;
  min-height: 410px !important;
}

.products-selection-page .product-image {
  height: 255px !important;
}

.products-selection-page .product-body {
  min-height: 142px !important;
  padding: 16px 18px 16px !important;
}

.products-selection-page .product-title {
  font-size: 20px;
  line-height: 1.28;
}

.products-selection-page .product-param-line {
  margin-top: 8px;
  font-size: 13px;
}

.products-selection-page .product-actions {
  gap: 8px;
  padding-top: 14px;
}

.products-selection-page .product-link,
.products-selection-page .list-toggle {
  height: 38px;
  font-size: 13px;
}

/* 2K / 澶у睆锛氬唴瀹逛笉瑕佹棤闄愭斁澶э紝鍗＄墖鏀规垚鏇寸揣鍑戠殑 4 鍒?*/
@media (min-width: 1900px) {
  .products-selection-page .container {
    width: min(1680px, calc(100% - 96px));
  }

  .products-selection-page .product-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 18px;
  }

  .products-selection-page .product-card {
    width: auto !important;
    height: auto !important;
    min-height: 408px !important;
  }

  .products-selection-page .product-image {
    height: 250px !important;
  }

  .products-selection-page .product-body {
    min-height: 142px !important;
    padding: 16px 18px 16px !important;
  }
}

/* 甯歌妗岄潰锛氭洿鎺ヨ繎瀹樼綉姝ｆ枃瀹藉害 */
@media (max-width: 1800px) {
  .products-selection-page .container {
    width: min(1480px, calc(100% - 64px));
  }

  .products-selection-page .selection-layout {
    grid-template-columns: 292px minmax(0, 1fr);
    gap: 20px;
  }

  .products-selection-page .product-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 1280px) {
  .products-selection-page .container {
    width: min(100% - 40px, 1180px);
  }

  .products-selection-page .selection-layout {
    grid-template-columns: 1fr;
  }

  .products-selection-page .filter-panel {
    position: relative;
    top: auto;
  }

  .products-selection-page .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .products-selection-page {
    padding-top: 16px;
  }

  .products-selection-page .container {
    width: min(100% - 32px, 1440px);
  }

  .products-selection-page .products-breadcrumb-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .products-selection-page .product-grid {
    grid-template-columns: 1fr;
  }

  .products-selection-page .product-image {
    height: 260px !important;
  }

  .products-selection-page .product-actions {
    grid-template-columns: 1fr;
  }
}

/* FOREACH_PRODUCTS_LAYOUT_TUNE_V2_END */



/* FOREACH_PRODUCTS_CATEGORY_SPACING_TUNE_START */

/* =========================================================
   浜у搧涓績锛氭悳绱㈡爮涓庝骇鍝佸ぇ绫绘寜閽棿璺濆井璋?

   璇存槑锛?
   1. 涓嶆敼 ResourceSearchBar 缁勪欢
   2. 涓嶆敼鎼滅储鏍忛粯璁ゆ牱寮?
   3. 鍙鍔犳悳绱㈡爮涓嬫柟鍒颁骇鍝佸ぇ绫绘寜閽殑鍛煎惛鎰?
========================================================= */

.products-selection-page .category-tabs-wrap {
  margin-top: 28px !important;
  padding-top: 0 !important;
}

/* 浜у搧澶х被鎸夐挳涓嬮潰鍒颁富浣撳唴瀹逛繚鎸佹甯歌窛绂?*/
.products-selection-page .selection-section {
  padding-top: 22px !important;
}

@media (max-width: 760px) {
  .products-selection-page .category-tabs-wrap {
    margin-top: 22px !important;
  }

  .products-selection-page .selection-section {
    padding-top: 18px !important;
  }
}

/* FOREACH_PRODUCTS_CATEGORY_SPACING_TUNE_END */

/* FOREACH_PRODUCTS_BREADCRUMB_LINE_CLEAN_START */

/* =========================================================
   浜у搧涓績锛氶潰鍖呭睉涓嬫柟绾挎潯涓庣┖鐧芥竻鐞?

   鐩爣锛?
   1. 鍘绘帀闈㈠寘灞戜笅闈㈤偅鏉″垎鍓茬嚎
   2. 鍘绘帀鍒嗗壊绾夸笌闈㈠寘灞戜箣闂寸殑绌虹櫧鍖哄煙
   3. 淇濈暀闈㈠寘灞戜笌鎼滅储鏍忎箣闂寸殑姝ｅ父璺濈
   4. 涓嶆敼 ResourceSearchBar 缁勪欢鏈韩
========================================================= */

.products-selection-page .products-breadcrumb-row {
  border-bottom: none !important;
  box-shadow: none !important;
  padding-bottom: 0 !important;
  margin-bottom: 14px !important;
  min-height: auto !important;
}

/* 闃叉鍓嶉潰琛ヤ竵鎴栦吉鍏冪礌缁х画鐢荤嚎 */
.products-selection-page .products-breadcrumb-row::before,
.products-selection-page .products-breadcrumb-row::after {
  display: none !important;
  content: none !important;
}

/* 闈㈠寘灞戞湰韬笉闇€瑕侀澶栨拺楂?*/
.products-selection-page .products-breadcrumb {
  line-height: 1.4 !important;
}

/* 鎼滅储鏍忕揣鎺ラ潰鍖呭睉鍚庢柟锛屼笉鍐嶈鏃х殑绾挎潯鍖哄煙鎾戝紑 */
.products-selection-page .products-breadcrumb-row + section {
  margin-top: 0 !important;
}

@media (max-width: 760px) {
  .products-selection-page .products-breadcrumb-row {
    margin-bottom: 12px !important;
  }
}

/* FOREACH_PRODUCTS_BREADCRUMB_LINE_CLEAN_END */

/* FOREACH_PRODUCTS_MOBILE_CATEGORY_AND_FILTER_COLLAPSE_START */

/* =========================================================
   浜у搧涓績锛氭墜鏈虹浜у搧澶х被 + 绛涢€夌粍鎶樺彔

   瑙勫垯锛?
   1. PC 绔笉鏀?
   2. 鎵嬫満绔骇鍝佸ぇ绫婚粯璁ゆ姌鍙?
   3. 鎵嬫満绔瓫閫夌粍榛樿鍏ㄩ儴鎶樺彔
   4. 灞曞紑鏄剧ず -
   5. 鏀惰捣鏄剧ず +
   6. 閫夋嫨澶х被 / 绛涢€夐」鍚庤嚜鍔ㄦ敹璧?
========================================================= */

.products-selection-page .mobile-category-trigger {
  display: none;
}

.products-selection-page .mobile-category-symbol,
.products-selection-page .filter-group-symbol {
  display: none;
}

.products-selection-page .filter-group-trigger {
  width: 100%;
  border: none;
  background: transparent;
  font-family: inherit;
  text-align: left;
}

@media (max-width: 760px) {
  .products-selection-page .category-tabs-wrap {
    border: 1px solid rgba(23, 51, 104, 0.12);
    background: #ffffff;
    margin-top: 18px !important;
  }

  .products-selection-page .mobile-category-trigger {
    width: 100%;
    min-height: 58px;
    padding: 0 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    border: none;
    border-bottom: 1px solid rgba(23, 51, 104, 0.12);
    background: #ffffff;
    color: var(--brand-blue, #173368);
    font-size: 20px;
    font-weight: 900;
    font-family: inherit;
    cursor: pointer;
  }

  .products-selection-page .mobile-category-symbol {
    width: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--brand-blue, #173368);
    font-size: 24px;
    line-height: 1;
    font-weight: 900;
  }

  .products-selection-page .category-tabs {
    display: none !important;
    padding: 12px;
    gap: 10px;
    border-bottom: none;
  }

  .products-selection-page .category-tabs-wrap.is-mobile-open .category-tabs {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .products-selection-page .category-tab {
    width: 100%;
    min-height: 42px;
    justify-content: center;
  }

  .products-selection-page .filter-panel {
    display: block !important;
  }

  .products-selection-page .filter-group {
    border-bottom: 1px solid rgba(23, 51, 104, 0.12);
  }

  .products-selection-page .filter-group-trigger {
    min-height: 56px;
    padding: 0 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    cursor: pointer;
  }

  .products-selection-page .filter-group-symbol {
    width: 20px;
    min-width: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--brand-blue, #173368);
    font-size: 24px;
    line-height: 1;
    font-weight: 900;
  }

  .products-selection-page .filter-group .filter-options {
    display: none !important;
  }

  .products-selection-page .filter-group.is-mobile-open .filter-options {
    display: grid !important;
  }
}

/* FOREACH_PRODUCTS_MOBILE_CATEGORY_AND_FILTER_COLLAPSE_END */

/* FOREACH_PRODUCTS_PAGINATION_START */

/* =========================================================
   浜у搧涓績锛氬垎椤垫寜閽?

   璇存槑锛?
   1. 鏍峰紡瀵归綈鈥滄帴澶存浛浠ｆ煡璇⑩€濋〉闈㈡寜閽?
   2. 鐧藉簳 + 娣辫摑瀛?+ 8px 鍦嗚
   3. hover锛氭繁钃濆簳 + 鑽у厜鑹插瓧
   4. 鍒嗛〉褰㈠紡锛氫笂涓€椤?   1 / 2    涓嬩竴椤?
========================================================= */

.products-selection-page .product-pagination {
  width: 100%;
  margin-top: 34px;
  padding-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.products-selection-page .product-page-button {
  min-width: 108px;
  height: 42px;
  padding: 0 20px;
  border: 1px solid rgba(23, 51, 104, 0.22);
  border-radius: 8px;
  background: #ffffff;
  color: var(--brand-blue, #173368);
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease,
    opacity 0.2s ease;
}

.products-selection-page .product-page-button:hover:not(:disabled),
.products-selection-page .product-page-button:focus-visible:not(:disabled) {
  border-color: var(--brand-blue, #173368);
  background: var(--brand-blue, #173368);
  color: var(--brand-cyan, #09e9b4);
  outline: none;
}

.products-selection-page .product-page-button:disabled {
  opacity: 0.42;
  cursor: not-allowed;
}

.products-selection-page .product-page-status {
  min-width: 58px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--brand-blue, #173368);
  font-size: 15px;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
}

@media (max-width: 760px) {
  .products-selection-page .product-pagination {
    margin-top: 22px;
    padding-bottom: 10px;
    gap: 10px;
  }

  .products-selection-page .product-page-button {
    min-width: 78px;
    height: 36px;
    padding: 0 12px;
    border-radius: 8px;
    font-size: 13px;
  }

  .products-selection-page .product-page-status {
    min-width: 48px;
    font-size: 14px;
  }
}

/* FOREACH_PRODUCTS_PAGINATION_END */

/* FOREACH_PRODUCTS_SELECTION_STANDARD_STYLE_START */

/* =========================================================
   浜у搧涓績閫夊瀷椤垫爣鍑嗘牱寮?

   璇存槑锛?
   1. 鍙傝€冩煴濉炴车閫夊瀷 H5 V7
   2. 鍙綔鐢ㄤ簬 .products-selection-page
   3. 浜у搧绫诲瀷 / 浜у搧绯诲垪鍗曞垪
   4. 閲忕▼ / 鏉愯川 / 瑙勬牸鍙傛暟涓ゅ垪
   5. 涓嶄娇鐢?!important锛岄伩鍏嶅悗缁淮鎶ゅ洶闅?
========================================================= */

.products-selection-page {
  --brand-blue: #173368;
  --brand-cyan: #09e9b4;
  --text-main: #172033;
  --text-sub: #5f6b7a;
  --text-light: #8a96a8;
  --line: #e5ebf2;
  --bg-soft: #f6f9fc;
  background: #ffffff;
}

.products-selection-page .container {
  width: min(1320px, calc(100% - 56px));
  margin: 0 auto;
}

/* 椤堕儴鍒嗙被 */
.products-selection-page .category-tabs-wrap {
  padding: 16px 0 22px;
  border-bottom: 1px solid var(--line);
  background: #ffffff;
}

.products-selection-page .category-tabs {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
}

.products-selection-page .category-tab {
  min-height: 44px;
  padding: 0 22px;
  border-radius: 8px;
  border: 1px solid rgba(23, 51, 104, 0.16);
  background: #ffffff;
  color: var(--brand-blue);
  cursor: pointer;
  font-size: 15px;
  font-weight: 850;
  white-space: nowrap;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.products-selection-page .category-tab:hover,
.products-selection-page .category-tab.active {
  color: var(--brand-cyan);
  background: var(--brand-blue);
  border-color: var(--brand-blue);
}

.products-selection-page .mobile-category-trigger {
  display: none;
}

/* 涓诲竷灞€ */
.products-selection-page .selection-section {
  padding-top: 24px;
}

.products-selection-page .selection-layout {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

/* 宸︿晶绛涢€夋爮 */
.products-selection-page .filter-panel {
  position: sticky;
  top: 24px;
  border: 1px solid var(--line);
  background: #ffffff;
}

.products-selection-page .filter-panel-head {
  padding: 18px 18px 16px;
  background: #f3f6f9;
  border-bottom: 1px solid var(--line);
}

.products-selection-page .filter-panel-head h2 {
  margin: 0;
  color: var(--brand-blue);
  font-size: 20px;
  line-height: 1.25;
  font-weight: 920;
}

.products-selection-page .filter-panel-head p {
  margin: 6px 0 0;
  color: var(--text-sub);
  font-size: 13px;
  line-height: 1.6;
}

.products-selection-page .filter-group {
  padding: 0;
  border-bottom: 1px solid var(--line);
}

.products-selection-page .filter-group-title,
.products-selection-page .filter-group-trigger {
  width: 100%;
  min-height: auto;
  margin: 0;
  padding: 15px 18px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0;
  background: transparent;
  color: var(--brand-blue);
  cursor: default;
  font-family: inherit;
  font-size: 14px;
  font-weight: 920;
  line-height: 1.35;
  text-align: left;
}

.products-selection-page .filter-group-symbol {
  display: none;
}

.products-selection-page .filter-options {
  display: grid;
  gap: 8px;
  padding: 0 12px 16px;
}

.products-selection-page .filter-options.one {
  grid-template-columns: 1fr;
}

.products-selection-page .filter-options.two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.products-selection-page .filter-option,
.products-selection-page .filter-btn {
  min-height: 42px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  border: 1px solid transparent;
  border-radius: 0;
  background: #f3f6f9;
  color: var(--text-main);
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 780;
  line-height: 1.2;
  text-align: left;
  transition:
    background 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease;
}

.products-selection-page .filter-option:hover,
.products-selection-page .filter-btn:hover {
  background: #f8fffd;
  color: var(--brand-blue);
}

.products-selection-page .filter-option.active,
.products-selection-page .filter-btn.active {
  background: #eefbf7;
  color: var(--brand-blue);
}

.products-selection-page .filter-check,
.products-selection-page .filter-control {
  position: relative;
  width: 12px;
  height: 12px;
  flex: 0 0 auto;
  border: 1.5px solid #b9c5d3;
  background: #ffffff;
  transition:
    border-color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
}

.products-selection-page .filter-btn.is-single .filter-control,
.products-selection-page .filter-option.is-single .filter-check {
  border-radius: 50%;
}

.products-selection-page .filter-btn.is-multi .filter-control,
.products-selection-page .filter-option.is-multi .filter-check {
  border-radius: 3px;
}

.products-selection-page .filter-btn:hover .filter-control,
.products-selection-page .filter-option:hover .filter-check {
  border-color: var(--brand-cyan);
}

.products-selection-page .filter-btn.active .filter-control,
.products-selection-page .filter-option.active .filter-check {
  background: var(--brand-cyan);
  border-color: var(--brand-cyan);
  box-shadow: 0 0 0 5px rgba(9, 233, 180, 0.14);
}

.products-selection-page .filter-btn.is-single.active .filter-control::after,
.products-selection-page .filter-option.is-single.active .filter-check::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #ffffff;
  transform: translate(-50%, -50%);
}

.products-selection-page .filter-btn.is-multi.active .filter-control::after,
.products-selection-page .filter-option.is-multi.active .filter-check::after {
  content: "\2713";
  position: absolute;
  left: 50%;
  top: 50%;
  color: var(--brand-blue);
  font-size: 10px;
  font-weight: 950;
  line-height: 1;
  transform: translate(-50%, -54%);
}

.products-selection-page .filter-panel-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 14px;
  background: #ffffff;
}

.products-selection-page .filter-panel-actions button {
  min-height: 40px;
  border-radius: 8px;
  border: 1px solid rgba(23, 51, 104, 0.16);
  background: #ffffff;
  color: var(--brand-blue);
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 850;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.products-selection-page .filter-panel-actions button:hover {
  background: var(--brand-blue);
  border-color: var(--brand-blue);
  color: var(--brand-cyan);
}

.products-selection-page .product-area {
  min-width: 0;
  max-width: 996px;
}

/* 鍙充晶宸ュ叿鏍?*/
.products-selection-page .product-toolbar {
  margin-bottom: 18px;
  padding: 14px 16px;
  border: 1px solid var(--line);
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.products-selection-page .toolbar-summary {
  color: var(--text-light);
  font-size: 13px;
  font-weight: 760;
}

.products-selection-page .selected-tags {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.products-selection-page .selected-tag {
  min-height: 26px;
  padding: 0 9px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  border: 1px solid rgba(9, 233, 180, 0.28);
  background: rgba(9, 233, 180, 0.11);
  color: var(--brand-blue);
  font-size: 12px;
  font-weight: 850;
  white-space: nowrap;
}

.products-selection-page .selected-tag button {
  width: 15px;
  height: 15px;
  display: inline-grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: rgba(23, 51, 104, 0.08);
  color: var(--brand-blue);
  cursor: pointer;
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
}

.products-selection-page .toolbar-reset {
  min-height: 34px;
  padding: 0 13px;
  border-radius: 999px;
  border: 1px solid rgba(23, 51, 104, 0.16);
  background: #ffffff;
  color: var(--brand-blue);
  cursor: pointer;
  font-size: 13px;
  font-weight: 850;
  white-space: nowrap;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.products-selection-page .toolbar-reset:hover {
  background: var(--brand-blue);
  border-color: var(--brand-blue);
  color: var(--brand-cyan);
}

/* 浜у搧鍗＄墖 */
.products-selection-page .product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.products-selection-page .product-card {
  position: relative;
  min-height: auto;
  border: 1px solid var(--line);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: translateY(0);
  transition:
    border-color 0.22s ease,
    transform 0.22s ease;
}

.products-selection-page .product-card:hover {
  border-color: var(--brand-cyan);
  transform: translateY(-1px);
}

.products-selection-page .selected-bar {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 4px;
  background: var(--brand-cyan);
  transform: scaleX(0);
  transform-origin: left center;
  opacity: 0;
  pointer-events: none;
}

.products-selection-page .product-card:hover .selected-bar {
  opacity: 1;
  transform: scaleX(1);
}

.products-selection-page .product-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  height: auto;
  padding: 10px;
  position: relative;
  overflow: hidden;
  background: #ffffff;
  border-bottom: 1px solid var(--line);
}

.products-selection-page .product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
  transform: scale(1);
  transition: transform 0.32s ease;
}

.products-selection-page .product-card:hover .product-image img {
  transform: scale(1.045);
}

.products-selection-page .product-body {
  min-height: 150px;
  padding: 18px 20px 18px;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.products-selection-page .product-title {
  margin: 0;
  color: var(--brand-blue);
  font-size: 20px;
  line-height: 1.28;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s ease;
}

.products-selection-page .product-card:hover .product-title {
  color: var(--brand-cyan);
}

.products-selection-page .product-param-line {
  margin-top: 8px;
  color: rgba(23, 51, 104, 0.78);
  font-size: 13px;
  line-height: 1.4;
  font-weight: 400;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.products-selection-page .product-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: auto;
  padding-top: 14px;
}

.products-selection-page .product-link,
.products-selection-page .list-toggle {
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid rgba(23, 51, 104, 0.18);
  background: #ffffff;
  color: var(--brand-blue);
  cursor: pointer;
  font-size: 13px;
  font-weight: 850;
  text-decoration: none;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.products-selection-page .product-link:hover,
.products-selection-page .list-toggle:hover,
.products-selection-page .list-toggle.active {
  background: var(--brand-blue);
  border-color: var(--brand-blue);
  color: var(--brand-cyan);
}

.products-selection-page .product-pagination {
  margin-top: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.products-selection-page .product-page-button {
  min-width: 88px;
  height: 38px;
  padding: 0 16px;
  border: 1px solid rgba(23, 51, 104, 0.18);
  border-radius: 8px;
  background: #ffffff;
  color: var(--brand-blue);
  font-size: 13px;
  font-weight: 850;
  cursor: pointer;
}

.products-selection-page .product-page-button:hover:not(:disabled) {
  background: var(--brand-blue);
  border-color: var(--brand-blue);
  color: var(--brand-cyan);
}

.products-selection-page .product-page-button:disabled {
  opacity: 0.42;
  cursor: not-allowed;
}

.products-selection-page .product-page-status {
  color: var(--brand-blue);
  font-size: 14px;
  font-weight: 850;
}



@media (max-width: 1180px) {
  .products-selection-page .selection-layout {
    grid-template-columns: 1fr;
  }

  .products-selection-page .filter-panel {
    position: relative;
    top: auto;
  }

  .products-selection-page .product-area {
    max-width: none;
  }

  .products-selection-page .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .products-selection-page .container {
    width: min(100% - 32px, 1440px);
  }

  .products-selection-page .mobile-category-trigger {
    width: 100%;
    min-height: 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid rgba(23, 51, 104, 0.16);
    border-radius: 8px;
    background: var(--brand-blue);
    color: var(--brand-cyan);
    font-size: 15px;
    font-weight: 900;
  }

  .products-selection-page .category-tabs {
    display: none;
    margin-top: 12px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .products-selection-page .category-tabs-wrap.is-mobile-open .category-tabs {
    display: grid;
  }

  .products-selection-page .category-tab {
    width: 100%;
  }

  .products-selection-page .filter-group-title,
  .products-selection-page .filter-group-trigger {
    min-height: 52px;
    padding: 0 16px;
    cursor: pointer;
  }

  .products-selection-page .filter-group-symbol {
    display: inline-flex;
  }

  .products-selection-page .filter-group .filter-options {
    display: none;
    padding: 0 16px 16px;
  }

  .products-selection-page .filter-group.is-mobile-open .filter-options {
    display: grid;
  }

  .products-selection-page .filter-options.two {
    grid-template-columns: 1fr;
  }

  .products-selection-page .product-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .products-selection-page .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .products-selection-page .product-card {
    min-height: auto;
  }

  .products-selection-page .product-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    height: auto;
    padding: 8px;
    background: #ffffff;
  }

  .products-selection-page .product-body {
    min-height: auto;
    padding: 14px 12px 12px;
  }

  .products-selection-page .product-title {
    font-size: 16px;
  }

  .products-selection-page .product-param-line {
    font-size: 12px;
  }

  .products-selection-page .product-actions {
    gap: 8px;
    padding-top: 12px;
  }

  .products-selection-page .product-link,
  .products-selection-page .list-toggle {
    height: 34px;
    font-size: 12px;
  }
}

/* FOREACH_PRODUCTS_SELECTION_STANDARD_STYLE_END */

/* SITE_PAGE_SHELL_PRODUCT_CENTER_RESET_START */
/* 浜у搧涓績椤堕儴缁撴瀯鏀圭敱 SitePageShell 缁熶竴鎺у埗 */
.products-selection-page {
  padding-top: 0 !important;
}

@media (max-width: 760px) {
  .products-selection-page {
    padding-top: 0 !important;
  }
}
/* SITE_PAGE_SHELL_PRODUCT_CENTER_RESET_END */


/* ===== FOREACH product center filter sidebar width START ===== */

/*
  产品中心筛选区宽度调整：
  - 左侧筛选栏加宽到 420px
  - 页面整体宽度同步放大
  - 右侧产品区仍保持电脑端一排 3 张卡片
*/

.products-page,
.product-selection-page,
.products-container,
.selection-container {
  max-width: 1640px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.product-selection-layout,
.selection-layout,
.products-layout {
  display: grid !important;
  grid-template-columns: 420px minmax(0, 1fr) !important;
  gap: 32px !important;
}

.product-filter-sidebar,
.filter-sidebar,
.selection-sidebar {
  width: 420px !important;
  min-width: 420px !important;
}

.product-card-grid,
.selection-card-grid,
.products-grid {
  grid-template-columns: repeat(3, minmax(300px, 1fr)) !important;
  gap: 28px !important;
}

@media (max-width: 1200px) {
  .product-selection-layout,
  .selection-layout,
  .products-layout {
    grid-template-columns: 340px minmax(0, 1fr) !important;
  }

  .product-filter-sidebar,
  .filter-sidebar,
  .selection-sidebar {
    width: 340px !important;
    min-width: 340px !important;
  }
}

@media (max-width: 768px) {
  .product-selection-layout,
  .selection-layout,
  .products-layout {
    display: block !important;
  }

  .product-filter-sidebar,
  .filter-sidebar,
  .selection-sidebar {
    width: 100% !important;
    min-width: 0 !important;
  }
}

/* ===== FOREACH product center filter sidebar width END ===== */





/* ===== FOREACH product center wider main container START ===== */

/*
  产品中心主内容区加宽：
  - 解决产品中心整体内容偏窄的问题
  - 不单独修改筛选栏宽度
  - 不强行修改卡片样式
  - 让搜索、分类、筛选和产品卡片整体占比更合理
*/

.products-page,
.products-container,
.product-selection-page,
.selection-container,
.product-selection-shell,
.products-shell,
.products-main,
.selection-main {
  width: min(100% - 96px, 1600px) !important;
  max-width: 1600px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.product-selection-layout,
.selection-layout,
.products-layout {
  width: 100% !important;
}

@media (max-width: 1200px) {
  .products-page,
  .products-container,
  .product-selection-page,
  .selection-container,
  .product-selection-shell,
  .products-shell,
  .products-main,
  .selection-main {
    width: min(100% - 48px, 100%) !important;
    max-width: none !important;
  }
}

@media (max-width: 768px) {
  .products-page,
  .products-container,
  .product-selection-page,
  .selection-container,
  .product-selection-shell,
  .products-shell,
  .products-main,
  .selection-main {
    width: calc(100% - 32px) !important;
  }
}

/* ===== FOREACH product center wider main container END ===== */


/* ===== FOREACH final product center width START ===== */

/*
  产品中心最终宽度修正：
  - 精准覆盖真实 class
  - 主容器从 1320px 放大到 1600px
  - 取消右侧 product-area 的 996px 限制
  - 筛选栏保持 420px
  - 产品区自然展开，仍保持一排 3 张卡片
*/

.products-selection-page .container {
  width: min(1600px, calc(100% - 96px)) !important;
  max-width: 1600px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.products-selection-page .selection-layout {
  display: grid !important;
  grid-template-columns: 420px minmax(0, 1fr) !important;
  gap: 32px !important;
  align-items: start !important;
}

.products-selection-page .product-area {
  width: 100% !important;
  max-width: none !important;
  min-width: 0 !important;
}

.products-selection-page .product-grid {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 28px !important;
}

@media (max-width: 1180px) {
  .products-selection-page .container {
    width: min(100% - 48px, 100%) !important;
    max-width: none !important;
  }

  .products-selection-page .selection-layout {
    grid-template-columns: 1fr !important;
  }

  .products-selection-page .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

@media (max-width: 760px) {
  .products-selection-page .container {
    width: min(100% - 32px, 100%) !important;
  }

  .products-selection-page .product-grid {
    grid-template-columns: 1fr !important;
  }
}

/* ===== FOREACH final product center width END ===== */


/* ===== FOREACH product card final stable START ===== */

/*
  产品中心卡片最终稳定版：
  - 保留顶部绿色线
  - 保留 hover / 选中绿边
  - 保留型号较大、较粗
  - 只优化内部排版
*/

.products-selection-page .product-card {
  min-height: 410px !important;
}

/* 保留顶部绿色线，不弱化 */
.products-selection-page .selected-bar {
  height: 4px !important;
}

/* 保留 hover / 选中绿边 */
.products-selection-page .product-card:hover {
  border-color: var(--brand-cyan, #09e9b4) !important;
}

/* 图片区尽量减少上下左右空白 */
.products-selection-page .product-image {
  height: 245px !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: #ffffff !important;
  overflow: hidden !important;
}

.products-selection-page .product-image img {
  width: auto !important;
  height: auto !important;
  max-width: 96% !important;
  max-height: 230px !important;
  object-fit: contain !important;
  object-position: center !important;
}

/* 图片下方横线完整贯穿 */
.products-selection-page .product-body {
  min-height: 165px !important;
  padding: 18px 14px 18px !important;
  display: flex !important;
  flex: 1 !important;
  flex-direction: column !important;
  border-top: 1px solid var(--line, #e5ebf2) !important;
  box-sizing: border-box !important;
}

/* 型号保持大和粗，只让它靠左 */
.products-selection-page .product-title {
  margin: 0 0 10px !important;
  color: var(--brand-blue, #173368) !important;
  font-size: 22px !important;
  line-height: 1.25 !important;
  font-weight: 650 !important;
  text-align: left !important;
  white-space: nowrap !important;
}

/* 参数文字靠左 */
.products-selection-page .product-param-line {
  margin-top: 0 !important;
  color: rgba(23, 51, 104, 0.82) !important;
  font-size: 15px !important;
  line-height: 1.55 !important;
  font-weight: 400 !important;
  text-align: left !important;
}

/* 按钮区域压缩，不再留太多空白 */
.products-selection-page .product-actions {
  margin-top: 12px !important;
  padding-top: 0 !important;
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 10px !important;
}

.products-selection-page .product-link,
.products-selection-page .list-toggle {
  height: 38px !important;
  min-height: 38px !important;
  padding: 0 12px !important;
  font-size: 13px !important;
  font-weight: 700 !important;
}

@media (max-width: 760px) {
  .products-selection-page .product-card {
    min-height: auto !important;
  }

  .products-selection-page .product-image {
    height: 190px !important;
  }

  .products-selection-page .product-image img {
    max-height: 170px !important;
  }

  .products-selection-page .product-body {
    min-height: auto !important;
    padding: 16px 12px 16px !important;
  }

  .products-selection-page .product-title {
    font-size: 18px !important;
  }

  .products-selection-page .product-param-line {
    font-size: 13px !important;
  }

  .products-selection-page .product-actions {
    margin-top: 10px !important;
    gap: 8px !important;
  }

  .products-selection-page .product-link,
  .products-selection-page .list-toggle {
    height: 36px !important;
    min-height: 36px !important;
  }
}

/* ===== FOREACH product card final stable END ===== */


/* ===== FOREACH force product card title green START ===== */

/*
  强制产品卡片型号在 hover / 选中状态下变为品牌绿色。
  放在 CSS 最后，覆盖前面 final stable 里把标题改回深蓝色的规则。
*/

.products-selection-page .product-card:hover .product-title,
.products-selection-page .product-card:focus-within .product-title,
.products-selection-page .product-card:has(.list-toggle.active) .product-title,
.products-selection-page .product-card:has(.list-toggle[aria-pressed="true"]) .product-title,
.products-selection-page .product-card:has(.list-toggle[data-active="true"]) .product-title,
.products-selection-page .product-card:has(.list-toggle.is-active) .product-title,
.products-selection-page .product-card.active .product-title,
.products-selection-page .product-card.selected .product-title,
.products-selection-page .product-card.is-selected .product-title,
.products-selection-page .product-card[data-selected="true"] .product-title {
  color: var(--brand-cyan, #09e9b4) !important;
}

/* ===== FOREACH force product card title green END ===== */

/* 产品中心：产品卡片响应式布局
   说明：
   1. 大屏保持一排 3 张产品卡片
   2. 中等屏幕、浏览器缩放、笔记本屏幕改为一排 2 张
   3. 手机屏幕也保持一排 2 张
   4. 只作用于产品中心页面，不影响全站样式
========================================================= */

.products-selection-page {
  max-width: 100%;
  overflow-x: clip;
}

.products-selection-page .product-area,
.products-selection-page .product-grid,
.products-selection-page .product-grid > * {
  min-width: 0 !important;
}

/* 中等屏幕及以下：统一 2 个一排 */
@media (max-width: 1500px) {
  .products-selection-page .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }

  .products-selection-page .product-card,
  .products-selection-page .product-card-link {
    min-width: 0 !important;
  }
}

/* 手机屏幕：仍然保持 2 个一排，不切成 1 个一排 */
@media (max-width: 900px) {
  .products-selection-page .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

/* 极窄屏保护：防止按钮和文字撑破卡片 */
@media (max-width: 520px) {
  .products-selection-page .product-grid {
    gap: 10px !important;
  }

  .products-selection-page .product-card {
    min-width: 0 !important;
  }

  .products-selection-page .product-card h3,
  .products-selection-page .product-card-title,
  .products-selection-page .product-name {
    font-size: 16px !important;
    line-height: 1.25 !important;
  }
}

/* 产品型号保护：允许换行，不强制省略 */
.products-selection-page .product-card h3,
.products-selection-page .product-card-title,
.products-selection-page .product-name {
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: clip !important;
  overflow-wrap: anywhere;
}

/* 产品中心：固定产品卡片视觉比例
   说明：
   1. 不写死卡片宽度，让 grid 负责 3 列 / 2 列布局
   2. 固定产品图区域比例，避免缩放时图片区域忽高忽低
   3. 固定内容区最小高度，保证同一行卡片视觉统一
   4. 按钮区域靠底，避免按钮上下跳动
========================================================= */

.products-selection-page .product-card {
  height: 100%;
  min-height: 430px;
  display: flex;
  flex-direction: column;
}

/* 产品图区域：固定比例 */
.products-selection-page .product-card-image,
.products-selection-page .product-image,
.products-selection-page .product-card-media {
  aspect-ratio: 4 / 3;
  min-height: 210px;
  max-height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 产品图本身：保持完整显示，不裁切产品 */
.products-selection-page .product-card-image img,
.products-selection-page .product-image img,
.products-selection-page .product-card-media img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 产品文字区域：统一高度，避免按钮被内容挤得上下不齐 */
.products-selection-page .product-card-content,
.products-selection-page .product-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 产品型号：允许换行，但不要被省略 */
.products-selection-page .product-card h3,
.products-selection-page .product-card-title,
.products-selection-page .product-name {
  min-height: 32px;
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: clip !important;
  overflow-wrap: anywhere;
}

/* 产品描述：给一个稳定高度 */
.products-selection-page .product-card-description,
.products-selection-page .product-card-specs,
.products-selection-page .product-summary {
  min-height: 72px;
}

/* 按钮区域固定在底部 */
.products-selection-page .product-card-actions,
.products-selection-page .product-actions {
  margin-top: auto;
}

/* 中等屏幕：卡片略微降低高度，避免页面过长 */
@media (max-width: 1500px) {
  .products-selection-page .product-card {
    min-height: 400px;
  }

  .products-selection-page .product-card-image,
  .products-selection-page .product-image,
  .products-selection-page .product-card-media {
    min-height: 190px;
    max-height: 230px;
  }
}

/* 手机 / 小窗口：仍保持 2 个一排，但卡片比例压缩一点 */
@media (max-width: 520px) {
  .products-selection-page .product-card {
    min-height: 360px;
  }

  .products-selection-page .product-card-image,
  .products-selection-page .product-image,
  .products-selection-page .product-card-media {
    min-height: 150px;
    max-height: 180px;
  }

  .products-selection-page .product-card h3,
  .products-selection-page .product-card-title,
  .products-selection-page .product-name {
    font-size: 15px !important;
  }
}

/* 产品中心：修复产品类型当前项宽度
   说明：
   1. 产品类型是唯一一个桌面端也需要折叠的筛选组
   2. 折叠后仍然要显示“当前：柱塞泵”
   3. 当前项要和普通筛选项一样撑满一整行
   4. 桌面端产品类型标题右侧必须显示 + / -
========================================================= */

/* 桌面端：产品类型标题保持原筛选标题风格，同时右侧显示 + / - */
.products-selection-page .product-type-filter-group .filter-group-trigger {
  width: 100%;
  min-height: auto;
  margin: 0;
  padding: 15px 18px 8px;
  border: 0;
  background: transparent;
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  color: var(--brand-blue);
  font-family: inherit;
  font-size: 14px;
  font-weight: 920;
  line-height: 1.35;
  text-align: left;
  cursor: pointer;
}

/* 桌面端：强制产品类型右侧 + / - 显示出来 */
.products-selection-page .product-type-filter-group .filter-group-symbol {
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  margin-left: auto;
  color: var(--brand-blue);
  font-size: 18px;
  font-weight: 900;
  line-height: 1;
}

/* 产品类型折叠后的当前项区域：恢复和普通筛选项一致的左右间距 */
.products-selection-page .product-type-current-option {
  padding: 0 12px 16px;
}

/* 当前：柱塞泵 要撑满整行，不要只包住文字 */
.products-selection-page .product-type-current-option .filter-option {
  width: 100%;
  min-height: 42px;
  justify-content: flex-start;
}

/* 桌面端：产品类型未展开时只显示当前项，不显示完整选项 */
@media (min-width: 901px) {
  .products-selection-page .product-type-filter-group:not(.is-mobile-open) > .filter-options {
    display: none !important;
  }

  .products-selection-page .product-type-filter-group.is-mobile-open > .filter-options {
    display: grid !important;
  }
}

/* 产品中心：产品种类介绍区最终整理版
   说明：
   1. 这是产品中心顶部产品种类介绍区的唯一最终样式
   2. 清理掉之前反复追加的重复覆盖块
   3. 左侧产品图放大，右侧正文保持黑色大字号
   4. HaloFlx 固定在右下角，使用荧光色低透明度
   5. 只加粗 .product-type-intro-emphasis 包住的指定文字
========================================================= */

.products-selection-page .product-type-intro-module {
  position: relative !important;
  width: 100% !important;
  margin: 0 0 28px !important;
  padding: 24px 340px 24px 0 !important;
  display: grid !important;
  grid-template-columns: 430px minmax(0, 1fr) !important;
  gap: 46px !important;
  align-items: center !important;
  justify-content: start !important;
  border: 0 !important;
  border-top: 1px solid var(--line) !important;
  background: transparent !important;
}

/* 左侧产品图 */
.products-selection-page .product-type-intro-image {
  width: 430px !important;
  height: 320px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: visible !important;
  border: 0 !important;
  background: transparent !important;
}

.products-selection-page .product-type-intro-image img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  transform: scale(1.16) !important;
  transform-origin: center center !important;
}

/* 右侧文字 */
.products-selection-page .product-type-intro-copy {
  width: 100% !important;
  max-width: 920px !important;
  min-width: 0 !important;
  padding-top: 2px !important;
}

.products-selection-page .product-type-intro-copy h2 {
  margin: 0 0 14px !important;
  color: var(--brand-blue) !important;
  font-size: 31px !important;
  font-weight: 820 !important;
  line-height: 1.22 !important;
}

.products-selection-page .product-type-intro-copy p {
  margin: 0 !important;
  color: #111111 !important;
  font-size: 16.5px !important;
  font-weight: 460 !important;
  line-height: 1.95 !important;
}

.products-selection-page .product-type-intro-copy p + p {
  margin-top: 14px !important;
}

/* 只加粗指定文字，不加粗整段 */
.products-selection-page .product-type-intro-copy .product-type-intro-emphasis {
  color: #111111 !important;
  font-weight: 800 !important;
}

/* HaloFlx 右下角装饰字 */
.products-selection-page .product-type-intro-module::after {
  content: "HaloFlx";
  position: absolute !important;
  top: auto !important;
  right: 28px !important;
  bottom: 18px !important;
  transform: none !important;
  color: #09E9B4 !important;
  font-size: 86px !important;
  font-weight: 840 !important;
  line-height: 1 !important;
  letter-spacing: -0.05em !important;
  opacity: 0.18 !important;
  white-space: nowrap !important;
  pointer-events: none !important;
  user-select: none !important;
}

/* 中等屏幕 */
@media (max-width: 1400px) {
  .products-selection-page .product-type-intro-module {
    padding: 24px 280px 22px 0 !important;
    grid-template-columns: 390px minmax(0, 1fr) !important;
    gap: 38px !important;
  }

  .products-selection-page .product-type-intro-image {
    width: 390px !important;
    height: 290px !important;
  }

  .products-selection-page .product-type-intro-image img {
    transform: scale(1.14) !important;
  }

  .products-selection-page .product-type-intro-copy h2 {
    font-size: 28px !important;
  }

  .products-selection-page .product-type-intro-copy p {
    font-size: 16px !important;
    line-height: 1.9 !important;
  }

  .products-selection-page .product-type-intro-module::after {
    right: 18px !important;
    bottom: 16px !important;
    font-size: 70px !important;
    opacity: 0.16 !important;
  }
}

/* 手机端 */
@media (max-width: 900px) {
  .products-selection-page .product-type-intro-module {
    margin-bottom: 20px !important;
    padding: 22px 0 20px !important;
    grid-template-columns: 1fr !important;
    gap: 14px !important;
  }

  .products-selection-page .product-type-intro-image {
    width: 100% !important;
    height: 230px !important;
  }

  .products-selection-page .product-type-intro-image img {
    transform: scale(1.08) !important;
  }

  .products-selection-page .product-type-intro-copy {
    max-width: 100% !important;
    padding-top: 0 !important;
  }

  .products-selection-page .product-type-intro-copy h2 {
    font-size: 22px !important;
    font-weight: 800 !important;
  }

  .products-selection-page .product-type-intro-copy p {
    font-size: 14px !important;
    line-height: 1.78 !important;
  }

  .products-selection-page .product-type-intro-module::after {
    display: none !important;
  }
}

/* 产品中心：取消左侧筛选栏吸顶
   说明：
   1. 左侧筛选栏不再随着页面滚动一直停在顶部
   2. 让筛选栏恢复普通文档流位置
   3. 只影响产品中心页面，不影响 Header、顶部搜索、产品卡片
========================================================= */

.products-selection-page .filter-panel,
.products-selection-page .product-filter-panel,
.products-selection-page .selection-filter-panel,
.products-selection-page .selection-layout > aside {
  position: static !important;
  top: auto !important;
  align-self: start !important;
  height: auto !important;
  max-height: none !important;
  overflow: visible !important;
}


/* =========================================================
   产品中心：产品卡片核心参数三行文案
   说明：
   1. 文案来自数据层，不在组件里写死
   2. 只展示接口、重复性、满量程分辨率
   3. 不做电商风标签，保持 B2B 工业精密感
========================================================= */

.product-card-specs {
  display: grid;
  gap: 5px;
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
  color: #233a5a;
  font-size: 13px;
  line-height: 1.45;
  text-align: left;
}

.product-card-specs li {
  position: relative;
  padding-left: 12px;
}

.product-card-specs li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: #09E9B4;
}

/* =========================================================
   产品中心：卡片三行参数文字微调
   说明：
   1. 不修改产品图片
   2. 去掉绿色圆点
   3. 三行参数整体略微上移
   4. 参数文字加大 4px
========================================================= */

.products-selection-page .product-card-specs {
  margin-top: -4px;
  font-size: 15px;
  line-height: 1.55;
}

.products-selection-page .product-card-specs li {
  padding-left: 0;
}

.products-selection-page .product-card-specs li::before {
  display: none;
}


/* =========================================================
   产品中心：卡片三行参数间距收紧
   说明：
   1. 只调整三行参数之间的距离
   2. 不修改图片、标题、按钮
========================================================= */

.products-selection-page .product-card-specs {
  gap: 3px;
  line-height: 1.35;
}

```

---

## private-assets 文件结构

- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\ea\EA-0010ML.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\ea\EA-0020ML.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\ea\EA-0050UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\ea\EA-0100UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\ea\EA-0250UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\ea\EA-0500UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\ea\ea-100.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\ea\EA-1000UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\ea\EA-2500UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\ea\EA-5000UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\sm\SM-0050UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\sm\SM-0100UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\sm\SM-0250UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\sm\SM-0500UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\sm\SM-1000UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\tm\TM-0050UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\tm\TM-0100UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\tm\TM-0250UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\2d\tm\TM-0500UL.pdf
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\ea\EA-0100UL.glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\ea\EA-0250UL.glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\ea\EA-0500UL.glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\ea\ea-100.glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\ea\EA-10000UL.glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\ea\EA-1000UL.glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\ea\EA-2500UL.glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\ea\EA-5000UL.glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\sm\SM-0050UL.glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\sm\SM-0100UL.glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\sm\SM-0250UL.glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\sm\SM-0500UL .glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\sm\SM-1000UL.glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\tm\TM-0050UL.glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\tm\TM-0100UL.glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\tm\TM-0250UL.glb
- F:\WebsiteProjects\foreach-website-2026\private-assets\products\pumps\plunger-pumps\3d\tm\TM-0500UL.glb
