import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  getPublishedFittingProductByCode,
} from "../../data/products/selection/fitting-publication.generated";
import {
  pumpSeriesSelectionCards,
} from "../../data/products/generated/pumps/pump-series.selection.generated";
import {
  diaphragmPumpReferenceModels,
} from "../../data/products/detail/diaphragm-pump-reference-models";
import {
  getDiaphragmPumpPath,
  isDiaphragmPumpPublicPath,
} from "../../data/products/detail/diaphragm-pump-routes";
import {
  diaphragmPumpSelectionProducts,
} from "../../data/products/selection/diaphragm-pump-selection.generated";

import type {
  SiteSearchItem,
  SiteSearchModule,
} from "../../data/search/site-search.types";

type UnknownObject = Record<string, unknown>;

const ROOT = process.cwd();

const OUTPUT_PATH = path.join(
  ROOT,
  "data",
  "search",
  "site-search-index.generated.ts"
);

const CHECK_MODE = process.argv.includes("--check");

const PRODUCT_SEARCH_DIRS = [
  path.join(ROOT, "data", "products", "selection"),
  path.join(ROOT, "data", "products", "detail"),
  path.join(ROOT, "data", "products", "generated"),
];

function text(value: unknown): string {
  if (value === null || value === undefined) return "";

  if (typeof value === "string") {
    return value.trim();
  }

  if (
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value).trim();
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => text(item))
      .filter(Boolean)
      .join(" ")
      .trim();
  }

  if (typeof value === "object") {
    const record = value as UnknownObject;

    const preferredKeys = [
      "zh-CN",
      "zh",
      "cn",
      "default",
      "en",
      "text",
      "label",
      "title",
      "name",
      "value",
    ];

    for (const key of preferredKeys) {
      if (!(key in record)) continue;

      const nestedValue = text(record[key]);

      if (nestedValue) return nestedValue;
    }
  }

  return "";
}

function normalize(value: string): string {
  return value
    .toUpperCase()
    .replace(/[‐‑‒–—―﹘﹣－]/g, "-")
    .replace(/\s+/g, "");
}

function isNonEmptyString(
  value: string | undefined | null
): value is string {
  return Boolean(value);
}

function firstText(object: UnknownObject, keys: string[]): string {
  for (const key of keys) {
    const value = text(object[key]);
    if (value) return value;
  }

  return "";
}

type PumpSearchProduct = {
  detailHref: string;
  model: string;
  title: string;
  subtitle: string;
  description: string;
  imageCard: string;
};

function buildPumpSearchProductByHref() {
  const products = new Map<string, PumpSearchProduct>();

  for (const card of pumpSeriesSelectionCards) {
    const detailHref = text(card.detailHref);
    const imageCard = cleanImagePath(text(card.cardImage));
    const content = card.content as UnknownObject | undefined;
    const zhContent =
      content &&
      typeof content.zh === "object" &&
      content.zh !== null
        ? (content.zh as UnknownObject)
        : null;

    if (
      !isProductHref(detailHref) ||
      !imageCard ||
      !zhContent ||
      products.has(detailHref)
    ) {
      continue;
    }

    const slug =
      detailHref.split("/").filter(Boolean).at(-1) ?? "";
    const model = slug.toUpperCase();

    products.set(detailHref, {
      detailHref,
      model,
      title: firstText(zhContent, ["title"]) || model,
      subtitle: firstText(zhContent, ["subtitle"]),
      description: firstText(zhContent, ["description"]),
      imageCard,
    });
  }

  return products;
}

const pumpSearchProductByHref =
  buildPumpSearchProductByHref();

function buildDiaphragmPumpReferenceSearchItems(): SiteSearchItem[] {
  const selectionById = new Map(
    diaphragmPumpSelectionProducts.map((product) => [product.productId, product]),
  );

  return diaphragmPumpReferenceModels.map((reference) => {
    const localized = reference.localized.zh;
    const selectionProduct = reference.selectionProductIds
      .map((productId) => selectionById.get(productId))
      .find(Boolean);
    const href = getDiaphragmPumpPath("zh", reference.slug, {
      trailingSlash: false,
    });

    return {
      id: `product:diaphragm-reference:${reference.slug}`,
      module: "products",
      title: reference.model,
      subtitle: localized.cardSubtitle,
      description: localized.seoDescription,
      href,
      image: cleanImagePath(selectionProduct?.imageCard || ""),
      model: reference.model,
      productCode: "",
      actionLabel: "查看产品",
      keywords: [
        reference.model,
        localized.h1,
        localized.cardSubtitle,
        localized.seoDescription,
        href,
      ],
    };
  });
}

function getFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return getFiles(fullPath);
    }

    if (
      entry.isFile() &&
      !entry.name.includes(".bak") &&
      (
        entry.name.endsWith(".ts") ||
        entry.name.endsWith(".json")
      )
    ) {
      return [fullPath];
    }

    return [];
  });
}

function isProductHref(href: string): boolean {
  return (
    href.startsWith("/products/") &&
    !href.includes("?") &&
    href !== "/products/"
  );
}

function cleanImagePath(imagePath: string): string {
  const normalizedImagePath = imagePath
    .replace(/\\/g, "/")
    .replace(/^\/?public\//, "/");

  if (
    normalizedImagePath.includes("/images/logo/") ||
    normalizedImagePath.endsWith("foreach-logo-color.svg")
  ) {
    return "";
  }

  return normalizedImagePath.startsWith("/")
    ? normalizedImagePath
    : "";
}

function getProductImage(object: UnknownObject): string {
  const directImage = cleanImagePath(
    firstText(object, [
      "imageCard",
      "imagePath",
      "imageSrc",
      "image",
      "coverImage",
      "mainImage",
    ])
  );

  if (directImage) return directImage;

  const media = Array.isArray(object.media)
    ? object.media
    : [];

  const candidates = media.filter(
    (item): item is UnknownObject =>
      Boolean(item) &&
      typeof item === "object" &&
      !Array.isArray(item)
  );

  const preferred =
    candidates.find((item) => {
      const resourceType = firstText(item, [
        "resourceType",
        "pagePosition",
      ]);

      return /主图|缩略图|MAIN|THUMBNAIL/i.test(
        resourceType
      );
    }) ?? candidates[0];

  if (!preferred) return "";

  const fullPath = cleanImagePath(
    firstText(preferred, ["fullPath", "src", "url"])
  );

  if (fullPath) return fullPath;

  const directory = firstText(preferred, ["path"])
    .replace(/\\/g, "/")
    .replace(/^\/?public\//, "/")
    .replace(/\/+$/, "");
  const fileName = firstText(preferred, ["fileName"])
    .replace(/^\/+/, "");

  return cleanImagePath(
    directory && fileName
      ? `${directory}/${fileName}`
      : ""
  );
}

function collectProductKeywords(
  value: unknown,
  depth = 0,
  result: string[] = [],
  seen = new WeakSet<object>()
): string[] {
  if (
    !value ||
    typeof value !== "object" ||
    depth > 4 ||
    seen.has(value as object)
  ) {
    return result;
  }

  seen.add(value as object);

  if (Array.isArray(value)) {
    for (const item of value) {
      collectProductKeywords(
        item,
        depth + 1,
        result,
        seen
      );
    }

    return result;
  }

  const searchableKeys = new Set([
    "seriesId",
    "category",
    "title",
    "displayName",
    "description",
    "commonApplications",
    "modelDisplay",
    "model",
    "itemCode",
    "productCode",
    "keywords",
    "tags",
    "relationKeys",
    "pageTitle",
  ]);

  for (const [key, child] of Object.entries(
    value as UnknownObject
  )) {
    if (searchableKeys.has(key)) {
      const keywordText = text(child);

      if (keywordText) result.push(keywordText);
    }

    collectProductKeywords(
      child,
      depth + 1,
      result,
      seen
    );
  }

  return result;
}

function collectProductItems(
  value: unknown,
  sourceFile: string,
  result: SiteSearchItem[],
  seen: WeakSet<object>
) {
  if (!value || typeof value !== "object") return;

  const objectValue = value as object;
  if (seen.has(objectValue)) return;
  seen.add(objectValue);

  if (Array.isArray(value)) {
    for (const item of value) {
      collectProductItems(item, sourceFile, result, seen);
    }
    return;
  }

  const object = value as UnknownObject;

  const explicitHref = firstText(object, [
    "detailHref",
    "productHref",
    "href",
    "detailUrl",
    "url",
  ]);
  const canonicalPath = firstText(object, ["path"]);
  const href = explicitHref ||
    (
      canonicalPath &&
      firstText(object, ["seriesId"]) &&
      firstText(object, ["slug"]) &&
      firstText(object, ["description"])
        ? canonicalPath
        : ""
    );

  if (isProductHref(href) && !isDiaphragmPumpPublicPath(href)) {
    const rawModel = firstText(object, [
      "foreachModel",
      "model",
      "modelNumber",
      "seriesId",
      "slug",
    ]);

    const rawProductCode = firstText(object, [
      "productCode",
      "productId",
      "goodsCode",
      "sku",
    ]);

    const isFittingRecord =
      href.startsWith("/products/fittings/") ||
      text(object.categoryId).toLowerCase() === "fittings" ||
      sourceFile.replace(/\\/g, "/").includes("/fittings/");

    const formalFittingProduct =
      isFittingRecord
        ? getPublishedFittingProductByCode(rawProductCode)
        : null;
    const formalPumpProduct =
      !isFittingRecord
        ? pumpSearchProductByHref.get(href)
        : null;

    if (!isFittingRecord || formalFittingProduct) {
      const model =
        formalFittingProduct?.foreachModel ||
        formalPumpProduct?.model ||
        rawModel;
      const finalHref =
        formalFittingProduct?.detailHref ||
        formalPumpProduct?.detailHref ||
        href;
      const productCode =
        formalPumpProduct
          ? ""
          : rawProductCode;

      const title =
        formalPumpProduct?.title ||
        firstText(object, [
          "title",
          "productName",
          "name",
          "cardTitle",
        ]) ||
        model ||
        productCode;

      const description =
        formalPumpProduct?.description ||
        firstText(object, [
          "description",
          "summary",
          "subtitle",
          "cardSubtitle",
          "commonApplications",
        ]);

      const image = cleanImagePath(
        formalFittingProduct?.imageCard ||
          formalPumpProduct?.imageCard ||
          getProductImage(object)
      );

      const extraKeywords = firstText(object, [
        "keywords",
        "searchKeywords",
        "tags",
        "categoryLabel",
        "seriesLabel",
        "productType",
        "productSeries",
      ]);
      const nestedKeywords = collectProductKeywords(
        object
      );

      if (title) {
        result.push({
          id: `product:${sourceFile}:${finalHref}:${model || title}`,
          module: "products",
          title,
          subtitle:
            formalPumpProduct?.subtitle ||
            (
              model && model !== title
                ? `型号：${model}`
                : productCode
                  ? `商品编码：${productCode}`
                  : ""
            ),
          description,
          href: finalHref,
          image,
          model,
          productCode,
          actionLabel: "查看产品",
          keywords: [
            title,
            model,
            productCode,
            description,
            formalPumpProduct?.subtitle,
            extraKeywords,
            ...nestedKeywords,
            finalHref,
          ].filter(isNonEmptyString),
        });
      }
    }
  }

  for (const child of Object.values(object)) {
    collectProductItems(child, sourceFile, result, seen);
  }
}

async function loadProductItems(): Promise<SiteSearchItem[]> {
  const result: SiteSearchItem[] = [];
  const files = PRODUCT_SEARCH_DIRS.flatMap(getFiles);

  for (const file of files) {
    const relativePath = path.relative(ROOT, file).replace(/\\/g, "/");

    try {
      if (file.endsWith(".json")) {
        const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
        collectProductItems(
          parsed,
          relativePath,
          result,
          new WeakSet<object>()
        );
        continue;
      }

      const importedModule = await import(
        `${pathToFileURL(file).href}?search=${Date.now()}-${Math.random()}`
      );

      collectProductItems(
        importedModule,
        relativePath,
        result,
        new WeakSet<object>()
      );
    } catch {
      // 单个历史数据文件不能导入时跳过，不中断全站索引。
    }
  }

  return [
    ...result,
    ...buildDiaphragmPumpReferenceSearchItems(),
  ];
}

async function loadCompatibleItems(): Promise<SiteSearchItem[]> {
  const filePath = path.join(
    ROOT,
    "data",
    "resources",
    "fitting-replacement",
    "all-compatible-products.generated.ts"
  );

  if (!fs.existsSync(filePath)) return [];

  const importedModule = await import(
    `${pathToFileURL(filePath).href}?compatible=${Date.now()}`
  );

  const products =
    importedModule.fittingReplacementAllCompatibleProducts as Array<{
      productCode: string;
      foreachModel: string;
      competitorModels: string[];
      imagePath?: string;
      productType?: string;
      productSeries?: string;
    }>;

  const result: SiteSearchItem[] = [];

  for (const product of products) {
    for (const compatibleModel of product.competitorModels ?? []) {
      result.push({
        id: `compatible:${normalize(compatibleModel)}:${product.productCode}`,
        module: "compatible-models",
        title: compatibleModel,
        subtitle: `对应 FOREACH 型号：${product.foreachModel}`,
        description: [
          product.productType,
          product.productSeries,
          product.productCode
            ? `商品编码 ${product.productCode}`
            : "",
        ].filter(isNonEmptyString).join(" · "),
        href:
          "/resources/selection-support/fitting-replacement" +
          `?q=${encodeURIComponent(compatibleModel)}`,
        image: cleanImagePath(product.imagePath ?? ""),
        model: product.foreachModel,
        productCode: product.productCode,
        actionLabel: "查看兼容产品",
        keywords: [
          compatibleModel,
          product.foreachModel,
          product.productCode,
          product.productType,
          product.productSeries,
        ].filter(isNonEmptyString),
      });
    }
  }

  return result;
}

async function loadDatasheetItems(): Promise<SiteSearchItem[]> {
  const filePath = path.join(
    ROOT,
    "data",
    "resources",
    "datasheets.zh.ts"
  );

  if (!fs.existsSync(filePath)) return [];

  const importedModule = await import(
    `${pathToFileURL(filePath).href}?datasheet=${Date.now()}`
  );

  const items = importedModule.datasheetZhItems as Array<{
    id: string;
    title: string;
    label: string;
    description: string;
    image: string;
    keywords: string;
    downloadHref: string;
    productHref?: string;
    version?: string;
    update?: string;
  }>;

  return items.map((item) => ({
    id: `datasheet:${item.id}`,
    module: "datasheets" as SiteSearchModule,
    title: item.title,
    subtitle: [
      item.label,
      item.version ? `版本 ${item.version}` : "",
      item.update ? `更新 ${item.update}` : "",
    ].filter(isNonEmptyString).join(" · "),
    description: item.description,
    href: item.downloadHref || "/resources/datasheets",
    image: cleanImagePath(item.image),
    actionLabel: "下载规格书",
    keywords: [
      item.title,
      item.label,
      item.description,
      item.keywords,
      item.version,
      item.update,
    ].filter(isNonEmptyString),
  }));
}

function scoreItemQuality(item: SiteSearchItem): number {
  let score = 0;

  if (item.href.includes("#")) score -= 5;
  if (item.href.split("/").filter(isNonEmptyString).length >= 4) score += 5;
  if (item.image) score += 2;
  if (item.model) score += 2;
  if (item.productCode) score += 1;

  return score;
}

function deduplicate(items: SiteSearchItem[]): SiteSearchItem[] {
  const map = new Map<string, SiteSearchItem>();

  for (const item of items) {
    const key =
      item.module === "products"
        ? `${item.module}:${item.href}:${normalize(item.model || item.title)}`
        : `${item.module}:${normalize(item.title)}:${item.productCode || item.href}`;

    const existing = map.get(key);

    if (
      !existing ||
      scoreItemQuality(item) > scoreItemQuality(existing)
    ) {
      map.set(key, item);
    }
  }

  return [...map.values()];
}

function buildOutput(items: SiteSearchItem[]): string {
  /*
    不直接输出超大的数组字面量。
    否则 TypeScript 会尝试推导数千条记录形成的联合类型，
    并报：union type is too complex to represent。
  */
  const serializedItems = JSON.stringify(items);
  const serializedLiteral = JSON.stringify(serializedItems);

  return `/* =========================================================
   site-search-index.generated.ts
   恒永达官网｜全站搜索静态索引

   自动生成，请勿手动修改。
   使用 JSON.parse 避免超大数组触发 TypeScript 联合类型推导。
========================================================= */

import type { SiteSearchItem } from "./site-search.types";

const siteSearchIndexJson = ${serializedLiteral};

export const siteSearchIndex =
  JSON.parse(siteSearchIndexJson) as SiteSearchItem[];
`;
}
async function main() {
  const [
    productItems,
    compatibleItems,
    datasheetItems,
  ] = await Promise.all([
    loadProductItems(),
    loadCompatibleItems(),
    loadDatasheetItems(),
  ]);

  const finalItems = deduplicate([
    ...productItems,
    ...compatibleItems,
    ...datasheetItems,
  ]);
  const invalidProductImages = finalItems.filter((item) => {
    if (item.module !== "products" || !item.image) {
      return item.module === "products";
    }

    const imageFile = path.join(
      ROOT,
      "public",
      ...item.image.replace(/^\/+/, "").split("/")
    );

    return !fs.existsSync(imageFile);
  });

  if (invalidProductImages.length > 0) {
    throw new Error(
      `产品搜索索引存在 ${invalidProductImages.length} 条缺失主图记录：` +
      invalidProductImages
        .slice(0, 10)
        .map((item) => `${item.title} (${item.href})`)
        .join("、")
    );
  }

  const output = buildOutput(finalItems);

  if (CHECK_MODE) {
    const currentOutput = fs.existsSync(OUTPUT_PATH)
      ? fs.readFileSync(OUTPUT_PATH, "utf8")
      : "";

    if (currentOutput !== output) {
      throw new Error(
        "产品搜索索引已过期，请运行 npm run search:generate。"
      );
    }
  } else {
    fs.mkdirSync(path.dirname(OUTPUT_PATH), {
      recursive: true,
    });
    fs.writeFileSync(OUTPUT_PATH, output, "utf8");
  }

  const counts = finalItems.reduce<Record<string, number>>(
    (result, item) => {
      result[item.module] = (result[item.module] ?? 0) + 1;
      return result;
    },
    {}
  );

  console.log("============================================");
  console.log(
    CHECK_MODE
      ? "产品搜索索引检查通过"
      : "产品搜索索引生成完成"
  );
  console.log(`产品中心：${counts.products ?? 0}`);
  console.log(`兼容型号查询：${counts["compatible-models"] ?? 0}`);
  console.log(`规格书下载：${counts.datasheets ?? 0}`);
  console.log(`总计：${finalItems.length}`);
  console.log(`输出：${OUTPUT_PATH}`);
  console.log("============================================");
}

main();



