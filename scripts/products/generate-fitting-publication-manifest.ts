import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import * as XLSX from "xlsx";

import { barbedFittingSelectionProducts } from "../../data/products/selection/barbed-fitting-selection.generated";
import { bulkheadBarbedFittingSelectionProducts } from "../../data/products/selection/bulkhead-barbed-fitting-selection.generated";
import { femaleThreadAdapterSelectionProducts } from "../../data/products/selection/female-thread-adapter-selection.generated";
import { filterCheckValveSelectionProducts } from "../../data/products/selection/filter-check-valve-selection.generated";
import { hardTubeFittingSelectionProducts } from "../../data/products/selection/hard-tube-fitting-selection.generated";
import { luerFittingSelectionProducts } from "../../data/products/selection/luer-fitting-selection.generated";
import { quickConnectFittingSelectionProducts } from "../../data/products/selection/quick-connect-fitting-selection.generated";
import { threadToBarbedFittingSelectionProducts } from "../../data/products/selection/thread-to-barbed-fitting-selection.generated";
import { fittingCompatibleModelProducts } from "../../data/resources/fitting-replacement/compatible-models.generated";

type UnknownRecord = Record<string, unknown>;
type OfflineReason =
  | "FORCED_CODE_PREFIX"
  | "NOT_ACTIVE"
  | "PRODUCT_CODE_NOT_FOUND"
  | "PRODUCT_CODE_DUPLICATED"
  | "MODEL_MISMATCH"
  | "NO_MAIN_IMAGE"
  | "MAIN_IMAGE_MISSING"
  | "PLACEHOLDER_IMAGE"
  | "LOGO_IMAGE"
  | "SHARED_IMAGE";

type SourceRecord = {
  productCode: string;
  foreachModel: string;
  productType: string;
  productSeries: string;
  sourceSheet: string;
  sourceRow: number;
};

type SelectionRecord = UnknownRecord & {
  __sourceKey: string;
};

type DetailRecord = UnknownRecord & {
  __productTypeId: string;
};

type PublicationRecord = {
  productCode: string;
  foreachModel: string;
  imageCard: string;
  detailHref: string;
  productTypeId: string;
  productType: string;
  productSeries: string;
  seriesId: string;
};

const ROOT = process.cwd();
const PUBLIC_ROOT = path.join(ROOT, "public");

const PRODUCT_CENTER_SOURCE = path.join(
  ROOT,
  "data-source",
  "product-center",
  "fittings",
  "FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx"
);

const OUTPUT_TS = path.join(
  ROOT,
  "data",
  "products",
  "selection",
  "fitting-publication.generated.ts"
);

const OUTPUT_REPORT = path.join(
  ROOT,
  "audit-reports",
  "接头全站下架清单.md"
);

const PLACEHOLDER_PATTERN =
  /(?:placeholder|no-image|no_image|noimage|default-product|default_product|coming-soon|coming_soon)/i;

const SELECTION_GROUPS = [
  ["hard-tube-fittings", hardTubeFittingSelectionProducts],
  ["barbed-fittings", barbedFittingSelectionProducts],
  ["thread-to-barbed-fittings", threadToBarbedFittingSelectionProducts],
  ["luer-fittings", luerFittingSelectionProducts],
  ["quick-connect-fittings", quickConnectFittingSelectionProducts],
  ["female-thread-adapters", femaleThreadAdapterSelectionProducts],
  ["bulkhead-barbed-fittings", bulkheadBarbedFittingSelectionProducts],
  ["filters-and-check-valves", filterCheckValveSelectionProducts],
] as const;

const DETAIL_GROUPS = [
  ["hard-tube-fittings", "hard-tube-fittings"],
  ["barbed-fittings", "barbed-fittings"],
  ["thread-to-barbed-fittings", "thread-to-barbed-fittings"],
  ["luer-fittings", "luer-fittings"],
  ["quick-connect-fittings", "quick-connect-fittings"],
  ["female-thread-adapters", "female-thread-adapters"],
  ["bulkhead-barbed-fittings", "bulkhead-barbed-fittings"],
  ["check-valves", "check-valves"],
  ["filters", "filters"],
] as const;

function text(value: unknown): string {
  return String(value ?? "").replace(/\u00a0/g, " ").trim();
}

function normalize(value: unknown): string {
  return text(value).toUpperCase();
}

function productCode(record: UnknownRecord): string {
  return text(
    record.productCode ??
      record.productId ??
      record.goodsCode ??
      record.sku ??
      record.code
  );
}

function recordModel(record: UnknownRecord): string {
  const cardTitle =
    record.cardTitle &&
    typeof record.cardTitle === "object" &&
    !Array.isArray(record.cardTitle)
      ? (record.cardTitle as UnknownRecord).zh
      : record.cardTitle;

  return text(
    record.foreachModel ??
      record.model ??
      record.modelNumber ??
      cardTitle
  );
}

function extractForeachModel(
  rawName: string,
  productCodeValue: string
): string {
  let value = text(rawName);

  if (productCodeValue) {
    const escapedCode = productCodeValue.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    value = value.replace(new RegExp(`\\s*${escapedCode}\\s*$`), "");
  }

  const asciiModelMatches = value.match(
    /[A-Z0-9][A-Z0-9./]*(?:[-_][A-Z0-9./]+)+/gi
  );

  if (asciiModelMatches?.length) {
    return asciiModelMatches[asciiModelMatches.length - 1];
  }

  const tokens = value.split(/\s+/).filter(Boolean);
  const modelToken = [...tokens]
    .reverse()
    .find((token) => /[A-Z]/i.test(token) && /[-_]/.test(token));

  return modelToken ?? value;
}

function addToGroup<T>(
  groups: Map<string, T[]>,
  key: string,
  item: T
) {
  const group = groups.get(key) ?? [];
  group.push(item);
  groups.set(key, group);
}

function listFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const filePath = path.join(directory, entry.name);
      return entry.isDirectory() ? listFiles(filePath) : [filePath];
    });
}

function sha256(filePath: string): string {
  try {
    return createHash("sha256")
      .update(fs.readFileSync(filePath))
      .digest("hex");
  } catch {
    return "";
  }
}

function publicFile(imagePath: string): string {
  const normalizedPath = imagePath
    .split(/[?#]/, 1)[0]
    .replace(/^\/+/, "");

  return path.join(PUBLIC_ROOT, ...normalizedPath.split("/"));
}

function publicUrl(filePath: string): string {
  return `/${path.relative(PUBLIC_ROOT, filePath).replace(/\\/g, "/")}`;
}

function readSourceRecords(): SourceRecord[] {
  if (!fs.existsSync(PRODUCT_CENTER_SOURCE)) {
    throw new Error(`找不到产品中心接头数据源：${PRODUCT_CENTER_SOURCE}`);
  }

  const workbook = XLSX.readFile(PRODUCT_CENTER_SOURCE, {
    cellDates: false,
  });
  const records: SourceRecord[] = [];

  for (const sheetName of workbook.SheetNames) {
    if (!/^0[1-8]_/.test(sheetName)) continue;

    const rows = XLSX.utils.sheet_to_json<unknown[]>(
      workbook.Sheets[sheetName],
      {
        header: 1,
        defval: "",
        raw: false,
      }
    );
    const headers = rows[0] ?? [];
    const codeIndex = headers.findIndex(
      (cell) => text(cell) === "商品编码"
    );
    const modelIndex = headers.findIndex(
      (cell) => text(cell) === "恒永达型号"
    );
    const typeIndex = headers.findIndex(
      (cell) => text(cell) === "产品类型"
    );
    const seriesIndex = headers.findIndex(
      (cell) => text(cell) === "产品系列"
    );

    if (codeIndex < 0 || modelIndex < 0) continue;

    for (let index = 2; index < rows.length; index += 1) {
      const row = rows[index] ?? [];
      const code = text(row[codeIndex]);
      const rawModel = text(row[modelIndex]);

      if (!code || !rawModel) continue;

      records.push({
        productCode: code,
        foreachModel: extractForeachModel(rawModel, code),
        productType: typeIndex >= 0 ? text(row[typeIndex]) : "",
        productSeries:
          seriesIndex >= 0 ? text(row[seriesIndex]) : "",
        sourceSheet: sheetName,
        sourceRow: index + 1,
      });
    }
  }

  return records;
}

function readSelectionRecords(): SelectionRecord[] {
  return SELECTION_GROUPS.flatMap(([sourceKey, records]) =>
    (records as readonly UnknownRecord[]).map((record) => ({
      ...record,
      __sourceKey: sourceKey,
    }))
  );
}

function readDetailRecords(): DetailRecord[] {
  return DETAIL_GROUPS.flatMap(([directory, productTypeId]) => {
    const filePath = path.join(
      ROOT,
      "data",
      "products",
      "generated",
      "fittings",
      directory,
      "detail",
      "index.json"
    );

    if (!fs.existsSync(filePath)) return [];

    const records = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    ) as UnknownRecord[];

    return records.map((record) => ({
      ...record,
      __productTypeId: productTypeId,
    }));
  });
}

function collectDetailCodes(record: UnknownRecord): string[] {
  const values = [
    record.productCode,
    record.productId,
    ...(Array.isArray(record.productCodes)
      ? record.productCodes
      : []),
    ...(Array.isArray(record.productIds) ? record.productIds : []),
  ];

  return [
    ...new Set(values.map(text).filter(Boolean)),
  ];
}

function canonicalDetailHref(
  record: SelectionRecord,
  detailsByCode: Map<string, DetailRecord[]>
): string {
  const code = productCode(record);
  const detail = (detailsByCode.get(code) ?? [])[0];

  return text(
    detail?.detailHref ??
      detail?.href ??
      record.detailHref ??
      record.href
  );
}

function addReason(
  reasonsByCode: Map<string, Set<OfflineReason>>,
  code: string,
  reason: OfflineReason
) {
  const reasons = reasonsByCode.get(code) ?? new Set<OfflineReason>();
  reasons.add(reason);
  reasonsByCode.set(code, reasons);
}

function markdownCell(value: string): string {
  return value
    .replace(/\r?\n/g, " ")
    .replace(/\|/g, "\\|")
    .trim();
}

function buildOutput({
  publishedProducts,
  offlineRecords,
  publishedDetailRouteKeys,
  summary,
}: {
  publishedProducts: PublicationRecord[];
  offlineRecords: Array<{
    productCode: string;
    foreachModel: string;
    reasons: OfflineReason[];
  }>;
  publishedDetailRouteKeys: string[];
  summary: Record<string, number>;
}): string {
  return `/* =========================================================
   fitting-publication.generated.ts
   接头产品全站统一发布清单

   自动生成，请勿手动修改。
   生成脚本：
   scripts/products/generate-fitting-publication-manifest.ts
========================================================= */

export type FittingOfflineReason =
  | "FORCED_CODE_PREFIX"
  | "NOT_ACTIVE"
  | "PRODUCT_CODE_NOT_FOUND"
  | "PRODUCT_CODE_DUPLICATED"
  | "MODEL_MISMATCH"
  | "NO_MAIN_IMAGE"
  | "MAIN_IMAGE_MISSING"
  | "PLACEHOLDER_IMAGE"
  | "LOGO_IMAGE"
  | "SHARED_IMAGE";

export interface PublishedFittingProduct {
  productCode: string;
  foreachModel: string;
  imageCard: string;
  detailHref: string;
  productTypeId: string;
  productType: string;
  productSeries: string;
  seriesId: string;
}

export const FITTING_PUBLISHED_PRODUCTS: PublishedFittingProduct[] =
${JSON.stringify(publishedProducts, null, 2)};

export const FITTING_OFFLINE_PRODUCTS: Array<{
  productCode: string;
  foreachModel: string;
  reasons: FittingOfflineReason[];
}> =
${JSON.stringify(offlineRecords, null, 2)};

export const FITTING_PUBLICATION_SUMMARY =
${JSON.stringify(summary, null, 2)} as const;

const publishedCodeSet = new Set(
  FITTING_PUBLISHED_PRODUCTS.map((product) => product.productCode)
);

const publishedProductByCode = new Map(
  FITTING_PUBLISHED_PRODUCTS.map((product) => [
    product.productCode,
    product,
  ])
);

const publishedDetailRouteKeySet = new Set(
${JSON.stringify(publishedDetailRouteKeys, null, 2)}
);

function text(value: unknown): string {
  return String(value ?? "").trim();
}

function collectProductCodes(
  product: Record<string, unknown>
): string[] {
  return [
    product.productCode,
    product.productId,
    ...(Array.isArray(product.productCodes)
      ? product.productCodes
      : []),
    ...(Array.isArray(product.productIds)
      ? product.productIds
      : []),
  ]
    .map(text)
    .filter(Boolean);
}

export function isPublishedFittingProductCode(
  productCode: unknown
): boolean {
  return publishedCodeSet.has(text(productCode));
}

export function isPublishedFittingProduct(
  product: Record<string, unknown>
): boolean {
  const codes = collectProductCodes(product);
  return (
    codes.length > 0 &&
    codes.every((code) => publishedCodeSet.has(code))
  );
}

export function getPublishedFittingProductByCode(
  productCode: unknown
): PublishedFittingProduct | null {
  return publishedProductByCode.get(text(productCode)) ?? null;
}

export function isPublishedFittingDetailRoute(
  productTypeId: unknown,
  slug: unknown
): boolean {
  const key = \`\${text(productTypeId).toLowerCase()}/\${text(slug).toLowerCase()}\`;
  return publishedDetailRouteKeySet.has(key);
}
`;
}

function main() {
  const sourceRecords = readSourceRecords();
  const selectionRecords = readSelectionRecords();
  const detailRecords = readDetailRecords();

  const sourceByCode = new Map<string, SourceRecord[]>();
  const selectionByCode = new Map<string, SelectionRecord[]>();
  const detailsByCode = new Map<string, DetailRecord[]>();

  for (const record of sourceRecords) {
    addToGroup(sourceByCode, record.productCode, record);
  }

  for (const record of selectionRecords) {
    addToGroup(selectionByCode, productCode(record), record);
  }

  for (const record of detailRecords) {
    for (const code of collectDetailCodes(record)) {
      addToGroup(detailsByCode, code, record);
    }
  }

  const reasonsByCode = new Map<string, Set<OfflineReason>>();
  const allCodes = new Set([
    ...sourceByCode.keys(),
    ...selectionByCode.keys(),
  ]);

  for (const code of allCodes) {
    reasonsByCode.set(code, new Set());

    const sourceMatches = sourceByCode.get(code) ?? [];
    const selectionMatches = selectionByCode.get(code) ?? [];

    if (code.startsWith("136") || code.startsWith("806")) {
      addReason(reasonsByCode, code, "FORCED_CODE_PREFIX");
    }

    if (sourceMatches.length === 0) {
      addReason(reasonsByCode, code, "PRODUCT_CODE_NOT_FOUND");
    }

    if (
      sourceMatches.length > 1 ||
      selectionMatches.length > 1
    ) {
      addReason(reasonsByCode, code, "PRODUCT_CODE_DUPLICATED");
    }

    if (
      sourceMatches.length === 1 &&
      selectionMatches.length === 1 &&
      normalize(sourceMatches[0].foreachModel) !==
        normalize(recordModel(selectionMatches[0]))
    ) {
      addReason(reasonsByCode, code, "MODEL_MISMATCH");
    }

    if (selectionMatches.length === 0) {
      addReason(reasonsByCode, code, "NO_MAIN_IMAGE");
      continue;
    }

    const selection = selectionMatches[0];
    if (normalize(selection.status) !== "ACTIVE") {
      addReason(reasonsByCode, code, "NOT_ACTIVE");
    }

    const imagePath = text(selection.imageCard);
    if (!imagePath) {
      addReason(reasonsByCode, code, "NO_MAIN_IMAGE");
      continue;
    }

    const imageFile = publicFile(imagePath);
    if (!fs.existsSync(imageFile) || !sha256(imageFile)) {
      addReason(reasonsByCode, code, "MAIN_IMAGE_MISSING");
    }
  }

  const publicFiles = listFiles(PUBLIC_ROOT);
  const logoFiles = publicFiles.filter((filePath) =>
    /logo/i.test(path.relative(PUBLIC_ROOT, filePath))
  );
  const placeholderFiles = publicFiles.filter((filePath) =>
    PLACEHOLDER_PATTERN.test(path.relative(PUBLIC_ROOT, filePath))
  );

  const logoPaths = new Set(
    logoFiles.map((filePath) => publicUrl(filePath).toLowerCase())
  );
  const placeholderPaths = new Set(
    placeholderFiles.map((filePath) => publicUrl(filePath).toLowerCase())
  );
  const logoHashes = new Set(
    logoFiles.map(sha256).filter(Boolean)
  );
  const placeholderHashes = new Set(
    placeholderFiles.map(sha256).filter(Boolean)
  );

  const imagePathGroups = new Map<string, Set<string>>();
  const imageHashGroups = new Map<string, Set<string>>();
  const imageHashByCode = new Map<string, string>();

  for (const [code, records] of selectionByCode) {
    const imagePath = text(records[0]?.imageCard);
    if (!imagePath) continue;

    const imageFile = publicFile(imagePath);
    const imageHash = sha256(imageFile);
    const normalizedPath = imagePath.toLowerCase();

    const pathCodes =
      imagePathGroups.get(normalizedPath) ?? new Set<string>();
    pathCodes.add(code);
    imagePathGroups.set(normalizedPath, pathCodes);

    if (imageHash) {
      const hashCodes =
        imageHashGroups.get(imageHash) ?? new Set<string>();
      hashCodes.add(code);
      imageHashGroups.set(imageHash, hashCodes);
      imageHashByCode.set(code, imageHash);
    }

    if (
      PLACEHOLDER_PATTERN.test(imagePath) ||
      placeholderPaths.has(normalizedPath) ||
      (imageHash && placeholderHashes.has(imageHash))
    ) {
      addReason(reasonsByCode, code, "PLACEHOLDER_IMAGE");
    }

    if (
      logoPaths.has(normalizedPath) ||
      (imageHash && logoHashes.has(imageHash))
    ) {
      addReason(reasonsByCode, code, "LOGO_IMAGE");
    }
  }

  for (const codes of imagePathGroups.values()) {
    if (codes.size < 2) continue;
    for (const code of codes) {
      addReason(reasonsByCode, code, "SHARED_IMAGE");
    }
  }

  for (const codes of imageHashGroups.values()) {
    if (codes.size < 2) continue;
    for (const code of codes) {
      addReason(reasonsByCode, code, "SHARED_IMAGE");
    }
  }

  const compatibilityByCode = new Map<
    string,
    typeof fittingCompatibleModelProducts
  >();

  for (const product of fittingCompatibleModelProducts) {
    addToGroup(
      compatibilityByCode,
      text(product.productCode),
      product
    );
  }

  for (const [code, products] of compatibilityByCode) {
    const formalMatches = selectionByCode.get(code) ?? [];
    const replacementModels = new Set(
      products.map((product) => normalize(product.foreachModel))
    );

    if (!sourceByCode.has(code)) {
      addReason(reasonsByCode, code, "PRODUCT_CODE_NOT_FOUND");
    }

    if (replacementModels.size > 1) {
      addReason(reasonsByCode, code, "PRODUCT_CODE_DUPLICATED");
    }

    if (
      formalMatches.length === 1 &&
      [...replacementModels].some(
        (replacementModel) =>
          replacementModel !== normalize(recordModel(formalMatches[0]))
      )
    ) {
      addReason(reasonsByCode, code, "MODEL_MISMATCH");
    }
  }

  const publishedCodes = new Set(
    [...reasonsByCode]
      .filter(([, reasons]) => reasons.size === 0)
      .map(([code]) => code)
  );

  const publishedProducts: PublicationRecord[] = [
    ...publishedCodes,
  ]
    .map((code) => {
      const record = selectionByCode.get(code)?.[0];
      if (!record) return null;

      return {
        productCode: code,
        foreachModel: recordModel(record),
        imageCard: text(record.imageCard),
        detailHref: canonicalDetailHref(record, detailsByCode),
        productTypeId: text(record.productTypeId),
        productType: text(
          record.productType ??
            record.productTypeName ??
            record.productTypeLabel
        ),
        productSeries: text(
          record.productSeries ??
            record.series ??
            record.seriesName ??
            record.seriesId
        ),
        seriesId: text(record.seriesId),
      };
    })
    .filter(
      (record): record is PublicationRecord => record !== null
    )
    .sort((left, right) =>
      left.productCode.localeCompare(right.productCode, "en", {
        numeric: true,
      })
    );

  const publishedDetailRouteKeys = detailRecords
    .filter((record) => {
      const codes = collectDetailCodes(record);
      return (
        codes.length > 0 &&
        codes.every((code) => publishedCodes.has(code))
      );
    })
    .map((record) => {
      const productTypeId = text(record.__productTypeId).toLowerCase();
      const slug = text(record.slug).toLowerCase();
      return `${productTypeId}/${slug}`;
    })
    .filter((key) => !key.endsWith("/"))
    .filter((key, index, array) => array.indexOf(key) === index)
    .sort();

  const offlineRecords = [...reasonsByCode]
    .filter(([, reasons]) => reasons.size > 0)
    .map(([code, reasons]) => {
      const selection = selectionByCode.get(code)?.[0];
      const source = sourceByCode.get(code)?.[0];

      return {
        productCode: code,
        foreachModel:
          recordModel(selection ?? {}) ||
          source?.foreachModel ||
          "",
        reasons: [...reasons],
      };
    })
    .sort((left, right) =>
      left.productCode.localeCompare(right.productCode, "en", {
        numeric: true,
      })
    );

  const hasReason = (reason: OfflineReason) =>
    offlineRecords.filter((record) => record.reasons.includes(reason))
      .length;

  const invalidImageCodes = new Set(
    offlineRecords
      .filter((record) =>
        record.reasons.some((reason) =>
          ["NO_MAIN_IMAGE", "MAIN_IMAGE_MISSING"].includes(reason)
        )
      )
      .map((record) => record.productCode)
  );

  const replacementOfflineCodes = new Set(
    [...compatibilityByCode.keys()].filter(
      (code) => !publishedCodes.has(code)
    )
  );

  const summary = {
    totalProductCodes: allCodes.size,
    publishedProductCodes: publishedProducts.length,
    offlineProductCodes: offlineRecords.length,
    forced136: [...allCodes].filter((code) => code.startsWith("136"))
      .length,
    forced806: [...allCodes].filter((code) => code.startsWith("806"))
      .length,
    invalidMainImage: invalidImageCodes.size,
    logoImage: hasReason("LOGO_IMAGE"),
    placeholderImage: hasReason("PLACEHOLDER_IMAGE"),
    sharedImageProductCodes: hasReason("SHARED_IMAGE"),
    fittingReplacementOfflineCodes: replacementOfflineCodes.size,
  };

  const reportLines = [
    "| 型号 | 商品编码 | 兼容型号 |",
    "|---|---|---|",
    ...offlineRecords.map((record) => {
      const compatibleModels = [
        ...new Map(
          (compatibilityByCode.get(record.productCode) ?? [])
            .flatMap((product) => product.compatibleModels)
            .map((model) => [normalize(model), text(model)])
        ).values(),
      ];

      return `| ${markdownCell(record.foreachModel)} | ${markdownCell(
        record.productCode
      )} | ${
        compatibleModels.length
          ? compatibleModels.map(markdownCell).join(" / ")
          : "—"
      } |`;
    }),
    "",
  ];

  fs.mkdirSync(path.dirname(OUTPUT_TS), { recursive: true });
  fs.mkdirSync(path.dirname(OUTPUT_REPORT), { recursive: true });
  fs.writeFileSync(
    OUTPUT_TS,
    buildOutput({
      publishedProducts,
      offlineRecords,
      publishedDetailRouteKeys,
      summary,
    }),
    "utf8"
  );
  fs.writeFileSync(OUTPUT_REPORT, reportLines.join("\n"), "utf8");

  console.log("============================================");
  console.log("接头统一发布清单生成完成");
  console.log(`产品中心商品编码：${summary.totalProductCodes}`);
  console.log(`全站保留：${summary.publishedProductCodes}`);
  console.log(`全站下架：${summary.offlineProductCodes}`);
  console.log(`136 开头：${summary.forced136}`);
  console.log(`806 开头：${summary.forced806}`);
  console.log(`无有效主图：${summary.invalidMainImage}`);
  console.log(`Logo 图片：${summary.logoImage}`);
  console.log(`占位图：${summary.placeholderImage}`);
  console.log(`共用图片产品：${summary.sharedImageProductCodes}`);
  console.log(
    `型号替代同步下架：${summary.fittingReplacementOfflineCodes}`
  );
  console.log(`发布数据：${OUTPUT_TS}`);
  console.log(`下架清单：${OUTPUT_REPORT}`);
  console.log("============================================");
}

main();
