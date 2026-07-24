import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

import {
  FITTING_OFFLINE_PRODUCTS,
  FITTING_PUBLICATION_SUMMARY,
  FITTING_PUBLISHED_PRODUCTS,
  getPublishedFittingProductByCode,
  isPublishedFittingDetailRoute,
  isPublishedFittingProductCode,
} from "../../data/products/selection/fitting-publication.generated";
import { quickConnectFittingSelectionProducts } from "../../data/products/selection/quick-connect-fitting-selection.generated";
import { fittingReplacementAllCompatibleProducts } from "../../data/resources/fitting-replacement/all-compatible-products.generated";
import { fittingCompatibleModelProducts } from "../../data/resources/fitting-replacement/compatible-models.generated";
import { siteSearchIndex } from "../../data/search/site-search-index.generated";
import {
  getQuickConnectSeriesRows,
} from "../../data/products/detail/getQuickConnectSeriesDetailData";
import {
  getFittingReplacementHomeData,
} from "../../services/resources/getFittingReplacementHomeData";
import {
  getFittingReplacementDetailStaticParams,
} from "../../services/resources/getFittingReplacementDetailData";

type UnknownRecord = Record<string, unknown>;

const ROOT = process.cwd();
const PUBLIC_ROOT = path.join(ROOT, "public");

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
  return String(value ?? "").trim();
}

function normalize(value: unknown): string {
  return text(value).toUpperCase();
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function publicFile(imagePath: string): string {
  return path.join(
    PUBLIC_ROOT,
    ...imagePath.replace(/^\/+/, "").split("/")
  );
}

function listFiles(directory: string): string[] {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const filePath = path.join(directory, entry.name);
      return entry.isDirectory() ? listFiles(filePath) : [filePath];
    });
}

function sha256(filePath: string): string {
  return createHash("sha256")
    .update(fs.readFileSync(filePath))
    .digest("hex");
}

function readDetailRecords(): Array<
  UnknownRecord & { productTypeId: string }
> {
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
    const records = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    ) as UnknownRecord[];

    return records.map(
      (record) =>
        ({
          ...record,
          productTypeId,
        }) as UnknownRecord & { productTypeId: string }
    );
  });
}

function collectCodes(record: UnknownRecord): string[] {
  return [
    record.productCode,
    record.productId,
    ...(Array.isArray(record.productCodes)
      ? record.productCodes
      : []),
    ...(Array.isArray(record.productIds)
      ? record.productIds
      : []),
  ]
    .map(text)
    .filter(Boolean);
}

function sampleEvenly(values: string[], count: number): string[] {
  if (values.length <= count) return [...values];

  return Array.from({ length: count }, (_, index) => {
    const position = Math.round(
      (index * (values.length - 1)) / (count - 1)
    );
    return values[position];
  });
}

async function main() {
  const publishedCodes = new Set(
    FITTING_PUBLISHED_PRODUCTS.map((product) => product.productCode)
  );
  const offlineCodes = new Set(
    FITTING_OFFLINE_PRODUCTS.map((product) => product.productCode)
  );

  assert(
    publishedCodes.size ===
      FITTING_PUBLICATION_SUMMARY.publishedProductCodes,
    "发布商品编码数量与汇总不一致"
  );
  assert(
    offlineCodes.size ===
      FITTING_PUBLICATION_SUMMARY.offlineProductCodes,
    "下架商品编码数量与汇总不一致"
  );
  assert(
    [...publishedCodes].every(
      (code) =>
        !code.startsWith("136") &&
        !code.startsWith("806")
    ),
    "发布清单仍包含 136* 或 806* 商品编码"
  );

  const logoHashes = new Set(
    listFiles(PUBLIC_ROOT)
      .filter((filePath) =>
        /logo/i.test(path.relative(PUBLIC_ROOT, filePath))
      )
      .map(sha256)
  );
  const publishedImagePaths = new Set<string>();
  const publishedImageHashes = new Set<string>();

  for (const product of FITTING_PUBLISHED_PRODUCTS) {
    const imageFile = publicFile(product.imageCard);
    const normalizedImagePath = product.imageCard.toLowerCase();
    const imageHash = sha256(imageFile);

    assert(
      fs.existsSync(imageFile),
      `发布产品主图不存在：${product.productCode} ${product.imageCard}`
    );
    assert(
      !/logo|placeholder|no[-_]?image|default[-_]?product|coming[-_]?soon/i.test(
        product.imageCard
      ),
      `发布产品仍使用 Logo 或占位图：${product.productCode}`
    );
    assert(
      !product.imageCard.includes(
        "/images/resources/selection-support/fitting-replacement/"
      ),
      `发布产品仍引用型号替代旧图：${product.productCode}`
    );
    assert(
      !publishedImagePaths.has(normalizedImagePath),
      `发布产品仍共用同一主图路径：${product.productCode}`
    );
    assert(
      !publishedImageHashes.has(imageHash),
      `发布产品仍共用相同主图内容：${product.productCode}`
    );
    assert(
      !logoHashes.has(imageHash),
      `发布产品主图内容仍是 Logo：${product.productCode}`
    );

    publishedImagePaths.add(normalizedImagePath);
    publishedImageHashes.add(imageHash);
  }

  for (const product of fittingReplacementAllCompatibleProducts) {
    const formalProduct =
      getPublishedFittingProductByCode(product.productCode);

    assert(
      formalProduct,
      `型号替代仍包含下架产品：${product.productCode}`
    );
    assert(
      normalize(formalProduct.foreachModel) ===
        normalize(product.foreachModel),
      `型号替代 FOREACH 型号不一致：${product.productCode}`
    );
    assert(
      formalProduct.imageCard === product.imagePath,
      `型号替代未使用产品中心主图：${product.productCode}`
    );
  }

  const searchFittingItems = siteSearchIndex.filter(
    (item) =>
      item.productCode &&
      (
        item.href.startsWith("/products/fittings/") ||
        item.module === "compatible-models"
      )
  );

  for (const item of searchFittingItems) {
    assert(
      isPublishedFittingProductCode(item.productCode),
      `全站搜索仍包含下架商品：${item.productCode}`
    );

    const formalProduct =
      getPublishedFittingProductByCode(item.productCode);
    assert(formalProduct, `搜索商品无法回连产品中心：${item.productCode}`);
    assert(
      item.image === formalProduct.imageCard,
      `搜索商品未使用产品中心主图：${item.productCode}`
    );
  }

  const siteSearchText = JSON.stringify(siteSearchIndex);

  for (const code of offlineCodes) {
    assert(
      !siteSearchText.includes(code),
      `PC 全站搜索索引仍包含下架商品：${code}`
    );
  }

  const globalSearchPath = path.join(
    PUBLIC_ROOT,
    "search-data",
    "global-search-index.v2.json"
  );
  const globalSearchText = fs.readFileSync(globalSearchPath, "utf8");

  for (const code of offlineCodes) {
    assert(
      !globalSearchText.includes(code),
      `轻量全站搜索仍包含下架商品：${code}`
    );
  }

  const locales = ["zh-CN", "en", "es", "fr", "ko", "ru"];
  const localeProductCodes = await Promise.all(
    locales.map(async (locale) => {
      const pageData =
        await getFittingReplacementHomeData("q20", locale);
      return pageData.products.map((product) => product.productCode);
    })
  );
  const baselineLocaleCodes = JSON.stringify(localeProductCodes[0]);

  assert(
    localeProductCodes.every(
      (codes) => JSON.stringify(codes) === baselineLocaleCodes
    ),
    "六种语言的型号替代发布结果不一致"
  );

  const q20StaticParams =
    getFittingReplacementDetailStaticParams("q20");
  assert(
    q20StaticParams.every((item) =>
      publishedCodes.has(item.productCode)
    ),
    "型号替代详情静态参数包含下架商品"
  );

  const quickConnectCounts = Object.fromEntries(
    ["Q20", "Q40", "Q60"].map((series) => {
      const rows = getQuickConnectSeriesRows(series);
      assert(
        rows.every((row) =>
          isPublishedFittingProductCode(row.productCode)
        ),
        `${series} 系列数据仍包含下架商品`
      );
      return [series, rows.length];
    })
  );

  const q20All = quickConnectFittingSelectionProducts.filter(
    (product) => normalize(product.seriesId) === "Q20"
  );
  assert(q20All.length === 98, "Q20 原始总数不再是 98");
  assert(
    q20All.filter((product) => normalize(product.status) === "ACTIVE")
      .length === 88,
    "Q20 Active 总数不再是 88"
  );
  assert(
    q20All.filter((product) => normalize(product.status) !== "ACTIVE")
      .length === 10,
    "Q20 非 Active 总数不再是 10"
  );

  const q40Q60ReplacementProducts =
    fittingReplacementAllCompatibleProducts.filter((product) =>
      ["Q40", "Q60"].includes(normalize(product.productSeries))
    );
  const sourceCompatibilityKeys = new Set(
    fittingCompatibleModelProducts.map(
      (product) =>
        `${text(product.productCode)}::${normalize(
          product.foreachModel
        )}`
    )
  );
  assert(
    q40Q60ReplacementProducts.every((product) =>
      sourceCompatibilityKeys.has(
        `${text(product.productCode)}::${normalize(
          product.foreachModel
        )}`
      )
    ),
    "Q40 或 Q60 出现了源数据中不存在的兼容型号关系"
  );

  const detailRecords = readDetailRecords();
  let publishedDetailRoutes = 0;
  let offlineDetailRoutes = 0;

  for (const detail of detailRecords) {
    const codes = collectCodes(detail);
    const shouldPublish =
      codes.length > 0 &&
      codes.every((code) => publishedCodes.has(code));
    const routePublished = isPublishedFittingDetailRoute(
      detail.productTypeId,
      detail.slug
    );

    assert(
      routePublished === shouldPublish,
      `详情路由发布状态不一致：${detail.productTypeId}/${text(
        detail.slug
      )}`
    );

    if (routePublished) publishedDetailRoutes += 1;
    else offlineDetailRoutes += 1;
  }

  const sitemapCandidates = [
    path.join(ROOT, "app", "sitemap.ts"),
    path.join(ROOT, "app", "sitemap.xml"),
    path.join(PUBLIC_ROOT, "sitemap.xml"),
  ];
  const existingSitemaps = sitemapCandidates.filter(fs.existsSync);

  for (const sitemapPath of existingSitemaps) {
    const sitemapText = fs.readFileSync(sitemapPath, "utf8");
    for (const code of offlineCodes) {
      assert(
        !sitemapText.includes(code),
        `sitemap 仍包含下架商品：${code}`
      );
    }
  }

  const offlineSamples = Object.fromEntries(
    [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "PRODUCT_CODE_NOT_FOUND",
      "PRODUCT_CODE_DUPLICATED",
      "MODEL_MISMATCH",
      "NO_MAIN_IMAGE",
      "MAIN_IMAGE_MISSING",
      "PLACEHOLDER_IMAGE",
      "LOGO_IMAGE",
      "SHARED_IMAGE",
    ].map((reason) => [
      reason,
      FITTING_OFFLINE_PRODUCTS.find((product) =>
        product.reasons.includes(
          reason as (typeof product.reasons)[number]
        )
      )?.productCode ?? "—",
    ])
  );

  console.log(
    JSON.stringify(
      {
        summary: FITTING_PUBLICATION_SUMMARY,
        fittingReplacementPublished:
          fittingReplacementAllCompatibleProducts.length,
        fittingReplacementQ20StaticParams:
          q20StaticParams.length,
        q40Q60SourceBackedReplacementProducts:
          q40Q60ReplacementProducts.length,
        searchFittingItems: searchFittingItems.length,
        quickConnectCounts,
        publishedDetailRoutes,
        offlineDetailRoutes,
        sitemapFiles: existingSitemaps.map((filePath) =>
          path.relative(ROOT, filePath).replace(/\\/g, "/")
        ),
        publishedSamples: sampleEvenly(
          [...publishedCodes].sort(),
          8
        ),
        offlineSamples,
        localeProductCounts: Object.fromEntries(
          locales.map((locale, index) => [
            locale,
            localeProductCodes[index].length,
          ])
        ),
      },
      null,
      2
    )
  );
}

main();
