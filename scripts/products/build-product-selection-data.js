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
