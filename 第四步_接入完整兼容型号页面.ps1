$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"

function Backup-File {
    param([string]$RelativePath)

    $fullPath = Join-Path $root $RelativePath
    if (Test-Path $fullPath) {
        Copy-Item $fullPath "$fullPath.bak_compatible_models_$stamp" -Force
    }
}

$filesToBackup = @(
    "data\resources\fitting-replacement\fitting-replacement.types.ts",
    "data\resources\fitting-replacement\fitting-replacement-series.config.ts",
    "services\resources\getFittingReplacementHomeData.ts",
    "components\resources\fitting-replacement\FittingReplacementHome.tsx",
    "app\resources\selection-support\fitting-replacement\page.tsx"
)

$filesToBackup | ForEach-Object { Backup-File $_ }

$buildScriptPath = Join-Path $root "scripts\resources\build-compatible-model-page-data.ts"
$outputDataPath = Join-Path $root "data\resources\fitting-replacement\all-compatible-products.generated.ts"
$placeholderPath = Join-Path $root "public\images\resources\selection-support\fitting-replacement\compatible-model-placeholder.svg"

New-Item -ItemType Directory -Force -Path `
    (Split-Path $buildScriptPath), `
    (Split-Path $outputDataPath), `
    (Split-Path $placeholderPath) | Out-Null

$placeholderSvg = @'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <rect width="1200" height="900" fill="#f3f6fa"/>
  <rect x="170" y="190" width="860" height="520" rx="18" fill="#ffffff" stroke="#d7dfeb" stroke-width="3"/>
  <circle cx="600" cy="390" r="92" fill="#173368"/>
  <path d="M548 390h104M600 338v104" stroke="#09E9B4" stroke-width="18" stroke-linecap="round"/>
  <text x="600" y="565" text-anchor="middle" font-family="Arial, sans-serif" font-size="54" font-weight="700" fill="#173368">FOREACH</text>
  <text x="600" y="625" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="#6b7789">Compatible fitting model</text>
</svg>
'@

Set-Content -Path $placeholderPath -Value $placeholderSvg -Encoding utf8

$buildScript = @'
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  fittingCompatibleModelProducts,
  type FittingCompatibleModelProduct,
} from "@/data/resources/fitting-replacement/compatible-models.generated";

type Candidate = {
  sourceFile: string;
  productCode: string;
  model: string;
  detailHref: string;
  imagePath: string;
};

const ROOT = process.cwd();

const SEARCH_DIRS = [
  path.join(ROOT, "data", "products", "selection"),
  path.join(ROOT, "data", "products", "detail"),
  path.join(ROOT, "data", "products", "generated", "fittings"),
];

const OUTPUT_PATH = path.join(
  ROOT,
  "data",
  "resources",
  "fitting-replacement",
  "all-compatible-products.generated.ts"
);

const PLACEHOLDER_IMAGE =
  "/images/resources/selection-support/fitting-replacement/compatible-model-placeholder.svg";

function text(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function normalize(value: string): string {
  return value
    .toUpperCase()
    .replace(/[‐‑‒–—―﹘﹣－]/g, "-")
    .replace(/\s+/g, "");
}

function getFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) return getFiles(fullPath);

    if (
      entry.isFile() &&
      (entry.name.endsWith(".ts") || entry.name.endsWith(".json")) &&
      !entry.name.includes(".bak")
    ) {
      return [fullPath];
    }

    return [];
  });
}

function firstText(
  object: Record<string, unknown>,
  keys: string[]
): string {
  for (const key of keys) {
    const value = text(object[key]);
    if (value) return value;
  }

  return "";
}

function collectCandidates(
  value: unknown,
  sourceFile: string,
  candidates: Candidate[],
  seen: WeakSet<object>
) {
  if (!value || typeof value !== "object") return;

  const objectValue = value as object;
  if (seen.has(objectValue)) return;
  seen.add(objectValue);

  if (Array.isArray(value)) {
    for (const item of value) {
      collectCandidates(item, sourceFile, candidates, seen);
    }
    return;
  }

  const object = value as Record<string, unknown>;

  const productCode = firstText(object, [
    "productCode",
    "goodsCode",
    "sku",
    "code",
  ]);

  const model = firstText(object, [
    "foreachModel",
    "model",
    "modelNumber",
    "title",
  ]);

  const detailHref = firstText(object, [
    "detailHref",
    "href",
    "detailUrl",
    "url",
  ]);

  const imagePath = firstText(object, [
    "imagePath",
    "imageSrc",
    "image",
    "coverImage",
    "mainImage",
  ]);

  if ((productCode || model) && (detailHref || imagePath)) {
    candidates.push({
      sourceFile,
      productCode,
      model,
      detailHref,
      imagePath,
    });
  }

  for (const child of Object.values(object)) {
    collectCandidates(child, sourceFile, candidates, seen);
  }
}

async function loadCandidates(): Promise<Candidate[]> {
  const files = SEARCH_DIRS.flatMap(getFiles);
  const candidates: Candidate[] = [];

  for (const file of files) {
    const relative = path.relative(ROOT, file).replace(/\\/g, "/");

    try {
      if (file.endsWith(".json")) {
        const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
        collectCandidates(parsed, relative, candidates, new WeakSet());
        continue;
      }

      const module = await import(
        `${pathToFileURL(file).href}?build=${Date.now()}-${Math.random()}`
      );

      collectCandidates(module, relative, candidates, new WeakSet());
    } catch {
      // 单个辅助数据文件无法导入时跳过，不中断正式数据生成。
    }
  }

  return candidates;
}

function findCandidates(
  product: FittingCompatibleModelProduct,
  candidates: Candidate[]
): Candidate[] {
  const productCode = normalize(product.productCode);
  const foreachModel = normalize(product.foreachModel);

  const codeMatches = candidates.filter((candidate) => {
    return (
      candidate.productCode &&
      normalize(candidate.productCode) === productCode
    );
  });

  if (codeMatches.length > 0) return codeMatches;

  return candidates.filter((candidate) => {
    return candidate.model && normalize(candidate.model) === foreachModel;
  });
}

function detailHrefScore(href: string): number {
  if (!href) return -1;
  if (!href.startsWith("/products/")) return 0;
  if (href.includes("#")) return 20;

  const segments = href.split("/").filter(Boolean);

  /*
    正式详情页通常为：
    /products/fittings/quick-connect-fittings/q2001-pmv-sacn
    分类页通常少一层。
  */
  if (segments.length >= 4) return 100;

  return 10;
}

function chooseDetailHref(candidates: Candidate[]): string {
  return [...new Set(candidates.map((item) => item.detailHref).filter(Boolean))]
    .sort((a, b) => detailHrefScore(b) - detailHrefScore(a))[0] ?? "";
}

function chooseImagePath(candidates: Candidate[]): string {
  return (
    candidates
      .map((item) => item.imagePath)
      .find((imagePath) => imagePath.startsWith("/")) ??
    PLACEHOLDER_IMAGE
  );
}

function buildProducts(
  candidates: Candidate[]
) {
  return fittingCompatibleModelProducts.map((product) => {
    const matches = findCandidates(product, candidates);
    const detailHref = chooseDetailHref(matches);
    const imagePath = chooseImagePath(matches);

    return {
      productCode: product.productCode,
      foreachModel: product.foreachModel,

      /*
        为兼容当前选型清单结构，内部字段名暂时保留 competitorModels。
        前台文案和页面中一律显示为“兼容型号”。
      */
      competitorModels: product.compatibleModels,

      packageText: "",
      showOnHome: true,
      note: "",
      imagePath,
      drawingPdfPath: "",
      detailHref,
      productType: product.productType,
      productSeries: product.productSeries,
    };
  });
}

function buildOutput(products: ReturnType<typeof buildProducts>): string {
  return `/* =========================================================
   all-compatible-products.generated.ts
   恒永达官网｜接头兼容型号查询页面产品数据

   自动生成，请勿手动修改。
   页面只显示“兼容型号”，品牌信息不会输出到前台。
========================================================= */

import type { FittingReplacementProduct } from "./fitting-replacement.types";

export const fittingReplacementAllCompatibleProducts:
  FittingReplacementProduct[] =
${JSON.stringify(products, null, 2)};
`;
}

async function main() {
  const candidates = await loadCandidates();
  const products = buildProducts(candidates);

  fs.writeFileSync(OUTPUT_PATH, buildOutput(products), "utf8");

  const missingDetail = products.filter((item) => !item.detailHref);
  const placeholderImages = products.filter(
    (item) => item.imagePath === PLACEHOLDER_IMAGE
  );

  console.log("============================================");
  console.log("兼容型号页面数据生成完成");
  console.log(`产品数：${products.length}`);
  console.log(`缺少正式详情页：${missingDetail.length}`);
  console.log(`使用占位图：${placeholderImages.length}`);
  console.log(`输出：${OUTPUT_PATH}`);
  console.log("============================================");
}

main();
'@

Set-Content -Path $buildScriptPath -Value $buildScript -Encoding utf8

# ============================================================
# 更新类型：保留旧字段，增加正式详情地址和分类信息
# ============================================================

$typesPath = Join-Path $root "data\resources\fitting-replacement\fitting-replacement.types.ts"
$types = Get-Content $typesPath -Raw -Encoding utf8

$types = $types `
    -replace "竞品编码", "兼容型号" `
    -replace "竞品", "兼容"

if ($types -notmatch "detailHref\?: string;") {
    $anchor = "  drawingPdfPath: string;"

    if (-not $types.Contains($anchor)) {
        throw "未找到 fitting-replacement.types.ts 的 drawingPdfPath 字段。"
    }

    $addition = @'
  drawingPdfPath: string;

  /* 对应的正式产品详情页；尚未建设详情页时为空 */
  detailHref?: string;

  /* 前台辅助展示的产品分类和系列 */
  productType?: string;
  productSeries?: string;
'@

    $types = $types.Replace($anchor, $addition)
}

Set-Content -Path $typesPath -Value $types -Encoding utf8

# ============================================================
# 更新系列名称，但不删除旧配置
# ============================================================

$configPath = Join-Path $root "data\resources\fitting-replacement\fitting-replacement-series.config.ts"
$config = Get-Content $configPath -Raw -Encoding utf8

$config = $config `
    -replace 'productName: "Q20 快插接头"', 'productName: "接头产品"' `
    -replace 'sourceLabel: "接头替代查询"', 'sourceLabel: "接头兼容型号查询"'

Set-Content -Path $configPath -Value $config -Encoding utf8

Write-Host ""
Write-Host "生成与正式产品关联后的页面数据……" -ForegroundColor Cyan
npx tsx scripts/resources/build-compatible-model-page-data.ts

# ============================================================
# 重写首页 service：保留旧文案结构，但改用完整数据
# ============================================================

$servicePath = Join-Path $root "services\resources\getFittingReplacementHomeData.ts"

$serviceContent = @'
import { fittingReplacementQuickConnectQ20ZhData } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh";

import { getFittingReplacementQuickConnectQ20PageIntl } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.intl";

import { fittingReplacementAllCompatibleProducts } from "@/data/resources/fitting-replacement/all-compatible-products.generated";

import type { FittingReplacementPageData } from "@/data/resources/fitting-replacement/fitting-replacement.types";

import type { FittingReplacementSeriesKey } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

export async function getFittingReplacementHomeData(
  _seriesKey: FittingReplacementSeriesKey = "q20",
  locale: string = "zh"
): Promise<FittingReplacementPageData> {
  const pageText = getFittingReplacementQuickConnectQ20PageIntl(locale);
  const isZh = locale === "zh" || locale === "zh-CN";

  return {
    ...fittingReplacementQuickConnectQ20ZhData,

    products: fittingReplacementAllCompatibleProducts,

    banner: {
      eyebrow: isZh ? "资源中心" : "Resources",
      title: isZh
        ? "接头兼容型号查询"
        : "Fitting Compatible Model Search",
      description: isZh
        ? "输入您当前使用的产品型号，查询对应的 FOREACH 恒永达兼容产品。"
        : "Enter the model currently in use to find corresponding FOREACH compatible products.",
    },

    breadcrumbs: [
      {
        label: isZh ? "首页" : "Home",
        href: isZh ? "/" : `/${locale}`,
      },
      {
        label: isZh ? "资源中心" : "Resources",
        href: isZh ? "/resources" : `/${locale}/resources`,
      },
      {
        label: isZh
          ? "接头兼容型号查询"
          : "Fitting Compatible Model Search",
      },
    ],

    search: {
      placeholder: isZh
        ? "请输入兼容型号"
        : "Enter a compatible model",
      buttonText: isZh ? "查询" : "Search",
    },

    homeText: {
      ...pageText.homeText,

      tabs: {
        replace: isZh ? "兼容型号查询" : "Compatible Model Search",
        guide: "",
      },

      history: {
        label: isZh ? "示例型号" : "Examples",
      },

      productSection: {
        title: isZh ? "兼容产品" : "Compatible Products",
        description: isZh
          ? "输入兼容型号后，可查看匹配产品并加入清单。"
          : "Enter a compatible model to view matched products and add them to your list.",
        countTemplate: isZh
          ? "当前展示 {start}–{end} / 共 {total} 个产品"
          : "Showing {start}–{end} of {total} products",
      },

      productCard: {
        productName: isZh ? "FOREACH 接头产品" : "FOREACH Fitting",
        productCode: isZh ? "商品编码：" : "Product code:",
        foreachModel: isZh ? "FOREACH 型号：" : "FOREACH model:",
        compatibleModels: isZh ? "兼容型号：" : "Compatible models:",
        viewDetail: isZh ? "查看详情" : "View details",
        addToCart: isZh ? "加入清单" : "Add to list",
        addedToCart: isZh ? "已加入清单" : "Added",
      },

      emptyResult: {
        title: isZh
          ? "暂未查询到对应的兼容产品"
          : "No compatible product was found",
        description: isZh
          ? "请确认型号是否完整，或提交现用型号、图纸及产品照片，由工程师协助确认。"
          : "Check the complete model, or submit the model, drawing, and product photo for engineering review.",
      },

      pagination: {
        previous: isZh ? "上一页" : "Previous",
        next: isZh ? "下一页" : "Next",
      },

      guide: pageText.homeText.guide,
    },
  };
}

export function getFittingReplacementHomeProducts(
  _seriesKey: FittingReplacementSeriesKey = "q20"
) {
  return fittingReplacementAllCompatibleProducts;
}

export function getFittingReplacementHomeModelRules(
  _seriesKey: FittingReplacementSeriesKey = "q20"
) {
  return fittingReplacementQuickConnectQ20ZhData.modelRules;
}
'@

Set-Content -Path $servicePath -Value $serviceContent -Encoding utf8

# ============================================================
# 重写首页组件：沿用旧 CSS 类和 ProductBasicCard
# ============================================================

$componentPath = Join-Path $root "components\resources\fitting-replacement\FittingReplacementHome.tsx"

$componentContent = @'
"use client";

import { useMemo, useState } from "react";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { ProductBasicCard } from "@/components/common/product-card";
import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";

import type {
  FittingReplacementPageData,
  FittingReplacementProduct,
} from "@/data/resources/fitting-replacement/fitting-replacement.types";

import { Q20_FITTING_REPLACEMENT_SERIES_CONFIG } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;
const PAGE_SIZE = 8;

interface FittingReplacementHomeProps {
  data: FittingReplacementPageData;
}

function normalizeModel(value: string) {
  return value
    .trim()
    .toUpperCase()
    .replace(/[‐‑‒–—―﹘﹣－]/g, "-")
    .replace(/\s+/g, "");
}

function formatTemplate(
  template: string,
  values: Record<string, string | number>
) {
  return Object.entries(values).reduce((result, [key, value]) => {
    return result.replaceAll(`{${key}}`, String(value));
  }, template);
}

function formatCompatibleModelsForCard(models: string[]) {
  if (models.length === 0) return "-";

  const firstModels = models.slice(0, 3);
  const suffix = models.length > 3 ? ` +${models.length - 3}` : "";

  return `${firstModels.join(" / ")}${suffix}`;
}

function getLocaleFromBreadcrumbs(
  breadcrumbs: FittingReplacementPageData["breadcrumbs"]
) {
  const href = breadcrumbs.find((item) => {
    return /^\/(en|es|fr|ko|ru)(\/|$)/.test(item.href ?? "");
  })?.href;

  return href?.split("/")[1] ?? "zh";
}

function findProductsByCompatibleModel(
  products: FittingReplacementProduct[],
  keyword: string
) {
  const normalizedKeyword = normalizeModel(keyword);

  if (!normalizedKeyword) return [];

  return products.filter((product) => {
    return product.competitorModels.some((compatibleModel) => {
      return normalizeModel(compatibleModel) === normalizedKeyword;
    });
  });
}

export default function FittingReplacementHome({
  data,
}: FittingReplacementHomeProps) {
  const [searchValue, setSearchValue] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { addItem, getItem, removeItem } = useSelectionCart();

  const homeText = data.homeText;
  const pageLocale = getLocaleFromBreadcrumbs(data.breadcrumbs);

  const exampleModels = useMemo(() => {
    const unique = new Map<string, string>();

    for (const product of data.products) {
      for (const model of product.competitorModels) {
        const normalized = normalizeModel(model);

        if (normalized && !unique.has(normalized)) {
          unique.set(normalized, model);
        }

        if (unique.size >= 5) {
          return [...unique.values()];
        }
      }
    }

    return [...unique.values()];
  }, [data.products]);

  const searchResults = useMemo(() => {
    return findProductsByCompatibleModel(data.products, submittedKeyword);
  }, [data.products, submittedKeyword]);

  const visibleProducts = submittedKeyword
    ? searchResults
    : data.products.filter((product) => product.showOnHome);

  const totalPages = Math.max(
    1,
    Math.ceil(visibleProducts.length / PAGE_SIZE)
  );

  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageEnd = pageStart + PAGE_SIZE;

  const paginatedProducts = visibleProducts.slice(pageStart, pageEnd);

  function handleSubmitSearch() {
    const keyword = searchValue.trim();
    setSubmittedKeyword(keyword);
    setCurrentPage(1);
  }

  function handleExampleSearch(model: string) {
    setSearchValue(model);
    setSubmittedKeyword(model);
    setCurrentPage(1);
  }

  function handleOpenDetail(product: FittingReplacementProduct) {
    if (!product.detailHref) return;

    window.open(product.detailHref, "_blank", "noopener,noreferrer");
  }

  function handleToggleCart(product: FittingReplacementProduct) {
    const currentCartItem = getItem(
      SERIES_CONFIG.sourceType,
      product.productCode
    );

    if (currentCartItem) {
      removeItem(currentCartItem.id);
      return;
    }

    addItem({
      sourceType: SERIES_CONFIG.sourceType,
      sourceLabel: SERIES_CONFIG.sourceLabel,
      productName:
        homeText?.productCard.productName ?? SERIES_CONFIG.productName,
      productCode: product.productCode,
      foreachModel: product.foreachModel,
      competitorModels: product.competitorModels,
      quantity: 1,
      needDrawing: false,
      imagePath: product.imagePath,
      detailHref:
        product.detailHref ??
        (pageLocale === "zh"
          ? SERIES_CONFIG.homeHref
          : `/${pageLocale}${SERIES_CONFIG.homeHref}`),
    });
  }

  const hasSearch = Boolean(submittedKeyword);
  const hasResults = searchResults.length > 0;

  return (
    <div className="fitting-replacement-page">
      <section className="frp-hero">
        <div className="frp-container frp-hero-inner">
          <div>
            <h1 className="frp-hero-title">{data.banner.title}</h1>
            <p className="frp-hero-desc">{data.banner.description}</p>
          </div>
        </div>
      </section>

      <main className="frp-main">
        <div className="frp-container">
          <Breadcrumb items={data.breadcrumbs} />

          <section className="frp-search-panel">
            <div className="frp-search-row">
              <input
                className="frp-search-input"
                type="search"
                value={searchValue}
                placeholder={data.search.placeholder}
                onChange={(event) => {
                  setSearchValue(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSubmitSearch();
                  }
                }}
              />

              <button
                className="frp-search-button"
                type="button"
                onClick={handleSubmitSearch}
              >
                {data.search.buttonText}
              </button>
            </div>

            <div className="frp-history-row">
              <span className="frp-history-label">
                {homeText?.history.label ?? "示例型号"}
              </span>

              {exampleModels.map((model) => {
                return (
                  <button
                    className={`frp-history-button ${
                      normalizeModel(submittedKeyword) ===
                      normalizeModel(model)
                        ? "active"
                        : ""
                    }`}
                    type="button"
                    key={model}
                    onClick={() => {
                      handleExampleSearch(model);
                    }}
                  >
                    {model}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <section className="frp-card-section">
          <div className="frp-container">
            {hasSearch && !hasResults ? (
              <div className="frp-empty-result">
                <strong>
                  {homeText?.emptyResult.title ??
                    "暂未查询到对应的兼容产品"}
                </strong>
                <p>
                  {homeText?.emptyResult.description ??
                    "请确认型号是否完整，或联系工程师协助确认。"}
                </p>
              </div>
            ) : (
              <>
                <div className="frp-section-head">
                  <div>
                    <h2>
                      {homeText?.productSection.title ?? "兼容产品"}
                    </h2>
                    <p>
                      {hasSearch
                        ? `查询型号：${submittedKeyword}`
                        : homeText?.productSection.description ??
                          "输入兼容型号后，可查看匹配产品并加入清单。"}
                    </p>
                  </div>

                  <span>
                    {formatTemplate(
                      homeText?.productSection.countTemplate ??
                        "当前展示 {start}–{end} / 共 {total} 个产品",
                      {
                        start:
                          visibleProducts.length === 0
                            ? 0
                            : pageStart + 1,
                        end: Math.min(
                          pageEnd,
                          visibleProducts.length
                        ),
                        total: visibleProducts.length,
                      }
                    )}
                  </span>
                </div>

                <div className="frp-card-grid">
                  {paginatedProducts.map((product) => {
                    const currentCartItem = getItem(
                      SERIES_CONFIG.sourceType,
                      product.productCode
                    );

                    const actions = [];

                    if (product.detailHref) {
                      actions.push({
                        label:
                          homeText?.productCard.viewDetail ??
                          "查看详情",
                        onClick: () => {
                          handleOpenDetail(product);
                        },
                      });
                    }

                    actions.push({
                      label: currentCartItem
                        ? homeText?.productCard.addedToCart ??
                          "已加入清单"
                        : homeText?.productCard.addToCart ??
                          "加入清单",
                      isActive: Boolean(currentCartItem),
                      onClick: () => {
                        handleToggleCart(product);
                      },
                    });

                    return (
                      <ProductBasicCard
                        key={`${product.productCode}-${product.foreachModel}`}
                        imageSrc={product.imagePath}
                        imageAlt={product.foreachModel}
                        title={
                          homeText?.productCard.productName ??
                          SERIES_CONFIG.productName
                        }
                        metaItems={[
                          {
                            label:
                              homeText?.productCard.productCode ??
                              "商品编码：",
                            value: product.productCode,
                          },
                          {
                            label:
                              homeText?.productCard.foreachModel ??
                              "FOREACH 型号：",
                            value: product.foreachModel,
                          },
                          {
                            label:
                              homeText?.productCard.compatibleModels ??
                              "兼容型号：",
                            value: formatCompatibleModelsForCard(
                              product.competitorModels
                            ),
                          },
                        ]}
                        actions={actions}
                      />
                    );
                  })}
                </div>

                {totalPages > 1 ? (
                  <div className="frp-pagination">
                    <button
                      type="button"
                      disabled={safePage <= 1}
                      onClick={() => {
                        setCurrentPage((page) =>
                          Math.max(1, page - 1)
                        );
                      }}
                    >
                      {homeText?.pagination.previous ?? "上一页"}
                    </button>

                    <span>
                      {safePage} / {totalPages}
                    </span>

                    <button
                      type="button"
                      disabled={safePage >= totalPages}
                      onClick={() => {
                        setCurrentPage((page) =>
                          Math.min(totalPages, page + 1)
                        );
                      }}
                    >
                      {homeText?.pagination.next ?? "下一页"}
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
'@

Set-Content -Path $componentPath -Value $componentContent -Encoding utf8

# ============================================================
# 清理中文页面 Metadata 中公开的旧措辞
# ============================================================

$pagePath = Join-Path $root "app\resources\selection-support\fitting-replacement\page.tsx"
$page = Get-Content $pagePath -Raw -Encoding utf8

$page = $page `
    -replace 'title: `\$\{SERIES_CONFIG\.sourceLabel\}｜选型支持｜恒永达`,', 'title: `${SERIES_CONFIG.sourceLabel}｜资源中心｜恒永达`,' `
    -replace 'description: `输入竞品编码、商品编码或恒永达型号，快速查找 \$\{SERIES_CONFIG\.productName\} 对应产品，并查看型号解析信息。`,', 'description: "输入兼容型号，查询对应的 FOREACH 恒永达接头产品。",'

Set-Content -Path $pagePath -Value $page -Encoding utf8

Write-Host ""
Write-Host "检查公开页面代码中是否还存在“竞品”措辞……" -ForegroundColor Cyan

$publicHits = Select-String `
    -Path $componentPath,$servicePath,$pagePath `
    -Pattern "竞品" `
    -SimpleMatch

if ($publicHits) {
    Write-Host "发现以下残留：" -ForegroundColor Yellow
    $publicHits | ForEach-Object {
        Write-Host "$($_.Path):$($_.LineNumber) $($_.Line.Trim())"
    }
}
else {
    Write-Host "本次接入文件中未发现公开“竞品”措辞。" -ForegroundColor Green
}

Write-Host ""
Write-Host "开始构建检查……" -ForegroundColor Cyan
npm run build

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "兼容型号已接入现有页面。" -ForegroundColor Green
Write-Host "保留：原 CSS、卡片、分页、加入清单。" -ForegroundColor Green
Write-Host "调整：只按兼容型号搜索，支持一对多结果。" -ForegroundColor Green
Write-Host "FIT+CL 17 个无详情产品：保留查询和加入清单，隐藏查看详情。" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
git status --short
