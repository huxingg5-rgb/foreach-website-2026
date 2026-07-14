$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"

function Backup-IfExists {
    param([string]$RelativePath)

    $fullPath = Join-Path $root $RelativePath
    if (Test-Path $fullPath) {
        Copy-Item $fullPath "$fullPath.bak_grouped_search_$stamp" -Force
    }
}

$backupFiles = @(
    "components\resources\fitting-replacement\FittingReplacementHome.tsx",
    "app\search\page.tsx",
    "app\[locale]\search\page.tsx",
    "components\search\SiteSearchClient.tsx",
    "components\search\site-search.css",
    "data\search\site-search.types.ts",
    "data\search\site-search-index.generated.ts",
    "scripts\search\generate-site-search-index.ts"
)

$backupFiles | ForEach-Object { Backup-IfExists $_ }

$scriptDir = Join-Path $root "scripts\search"
$dataDir = Join-Path $root "data\search"
$componentDir = Join-Path $root "components\search"
$appSearchDir = Join-Path $root "app\search"
$appLocaleSearchDir = Join-Path $root "app\[locale]\search"

New-Item -ItemType Directory -Force -Path `
    $scriptDir, $dataDir, $componentDir, $appSearchDir, $appLocaleSearchDir |
    Out-Null

# ============================================================
# 1. 搜索类型
# ============================================================

$typesPath = Join-Path $dataDir "site-search.types.ts"

$typesContent = @'
export type SiteSearchModule =
  | "products"
  | "compatible-models"
  | "datasheets";

export interface SiteSearchItem {
  id: string;
  module: SiteSearchModule;
  title: string;
  subtitle?: string;
  description?: string;
  href: string;
  image?: string;
  keywords: string[];
  model?: string;
  productCode?: string;
  actionLabel?: string;
}
'@

Set-Content -LiteralPath $typesPath -Value $typesContent -Encoding utf8

# ============================================================
# 2. 搜索索引生成脚本
# ============================================================

$generatorPath = Join-Path $scriptDir "generate-site-search-index.ts"

$generatorContent = @'
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

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

const PRODUCT_SEARCH_DIRS = [
  path.join(ROOT, "data", "products", "selection"),
  path.join(ROOT, "data", "products", "detail"),
  path.join(ROOT, "data", "products", "generated"),
];

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

function firstText(object: UnknownObject, keys: string[]): string {
  for (const key of keys) {
    const value = text(object[key]);
    if (value) return value;
  }

  return "";
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
  if (
    imagePath.includes("/images/logo/") ||
    imagePath.endsWith("foreach-logo-color.svg")
  ) {
    return "";
  }

  return imagePath.startsWith("/") ? imagePath : "";
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

  const href = firstText(object, [
    "detailHref",
    "productHref",
    "href",
    "detailUrl",
    "url",
  ]);

  if (isProductHref(href)) {
    const model = firstText(object, [
      "foreachModel",
      "model",
      "modelNumber",
      "slug",
    ]);

    const productCode = firstText(object, [
      "productCode",
      "goodsCode",
      "sku",
    ]);

    const title =
      firstText(object, [
        "title",
        "productName",
        "name",
        "cardTitle",
      ]) ||
      model ||
      productCode;

    const description = firstText(object, [
      "description",
      "summary",
      "subtitle",
      "cardSubtitle",
    ]);

    const image = cleanImagePath(
      firstText(object, [
        "imagePath",
        "imageSrc",
        "image",
        "coverImage",
        "mainImage",
      ])
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

    if (title) {
      result.push({
        id: `product:${sourceFile}:${href}:${model || title}`,
        module: "products",
        title,
        subtitle: model && model !== title
          ? `型号：${model}`
          : productCode
            ? `商品编码：${productCode}`
            : "",
        description,
        href,
        image,
        model,
        productCode,
        actionLabel: "查看产品",
        keywords: [
          title,
          model,
          productCode,
          description,
          extraKeywords,
          href,
        ].filter(Boolean),
      });
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

      const module = await import(
        `${pathToFileURL(file).href}?search=${Date.now()}-${Math.random()}`
      );

      collectProductItems(
        module,
        relativePath,
        result,
        new WeakSet<object>()
      );
    } catch {
      // 单个历史数据文件不能导入时跳过，不中断全站索引。
    }
  }

  return result;
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

  const module = await import(
    `${pathToFileURL(filePath).href}?compatible=${Date.now()}`
  );

  const products =
    module.fittingReplacementAllCompatibleProducts as Array<{
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
        ].filter(Boolean).join(" · "),
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
        ].filter(Boolean),
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

  const module = await import(
    `${pathToFileURL(filePath).href}?datasheet=${Date.now()}`
  );

  const items = module.datasheetZhItems as Array<{
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
    ].filter(Boolean).join(" · "),
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
    ].filter(Boolean),
  }));
}

function scoreItemQuality(item: SiteSearchItem): number {
  let score = 0;

  if (item.href.includes("#")) score -= 5;
  if (item.href.split("/").filter(Boolean).length >= 4) score += 5;
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
  return `/* =========================================================
   site-search-index.generated.ts
   恒永达官网｜全站搜索静态索引

   自动生成，请勿手动修改。
========================================================= */

import type { SiteSearchItem } from "./site-search.types";

export const siteSearchIndex: SiteSearchItem[] =
${JSON.stringify(items, null, 2)};
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

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, buildOutput(finalItems), "utf8");

  const counts = finalItems.reduce<Record<string, number>>(
    (result, item) => {
      result[item.module] = (result[item.module] ?? 0) + 1;
      return result;
    },
    {}
  );

  console.log("============================================");
  console.log("全站搜索索引生成完成");
  console.log(`产品中心：${counts.products ?? 0}`);
  console.log(`兼容型号查询：${counts["compatible-models"] ?? 0}`);
  console.log(`规格书下载：${counts.datasheets ?? 0}`);
  console.log(`总计：${finalItems.length}`);
  console.log(`输出：${OUTPUT_PATH}`);
  console.log("============================================");
}

main();
'@

Set-Content -LiteralPath $generatorPath -Value $generatorContent -Encoding utf8

Write-Host ""
Write-Host "正在生成全站搜索索引……" -ForegroundColor Cyan
npx tsx scripts/search/generate-site-search-index.ts

# ============================================================
# 3. 搜索客户端组件
# ============================================================

$clientPath = Join-Path $componentDir "SiteSearchClient.tsx"

$clientContent = @'
"use client";

import {
  FormEvent,
  useMemo,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { siteSearchIndex } from "@/data/search/site-search-index.generated";
import type {
  SiteSearchItem,
  SiteSearchModule,
} from "@/data/search/site-search.types";

import "./site-search.css";

type SiteSearchClientProps = {
  locale?: string;
};

const MODULE_ORDER: SiteSearchModule[] = [
  "products",
  "compatible-models",
  "datasheets",
];

const MODULE_TEXT: Record<
  SiteSearchModule,
  {
    title: string;
    description: string;
    empty: string;
  }
> = {
  products: {
    title: "产品中心",
    description: "产品型号、商品编码、产品名称及产品详情。",
    empty: "产品中心暂无匹配结果。",
  },
  "compatible-models": {
    title: "兼容型号查询",
    description: "根据现用型号查询对应的 FOREACH 兼容产品。",
    empty: "兼容型号查询暂无匹配结果。",
  },
  datasheets: {
    title: "规格书下载",
    description: "产品规格书、资料名称及相关关键词。",
    empty: "规格书下载暂无匹配结果。",
  },
};

function normalize(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/[‐‑‒–—―﹘﹣－]/g, "-")
    .replace(/\s+/g, "");
}

function scoreItem(item: SiteSearchItem, query: string): number {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;

  const title = normalize(item.title);
  const model = normalize(item.model ?? "");
  const productCode = normalize(item.productCode ?? "");
  const keywordValues = item.keywords.map(normalize);

  let score = 0;

  if (title === normalizedQuery) score += 1000;
  if (model === normalizedQuery) score += 950;
  if (productCode === normalizedQuery) score += 900;

  if (title.startsWith(normalizedQuery)) score += 500;
  if (model.startsWith(normalizedQuery)) score += 480;
  if (productCode.startsWith(normalizedQuery)) score += 460;

  if (title.includes(normalizedQuery)) score += 250;
  if (model.includes(normalizedQuery)) score += 240;
  if (productCode.includes(normalizedQuery)) score += 230;

  for (const keyword of keywordValues) {
    if (keyword === normalizedQuery) score += 180;
    else if (keyword.startsWith(normalizedQuery)) score += 100;
    else if (keyword.includes(normalizedQuery)) score += 50;
  }

  return score;
}

function getLocalizedSearchPath(locale: string) {
  return locale === "zh-CN" || locale === "zh"
    ? "/search"
    : `/${locale}/search`;
}

function SearchResultItem({ item }: { item: SiteSearchItem }) {
  return (
    <a className="site-search-result-card" href={item.href}>
      {item.image ? (
        <div className="site-search-result-image">
          <img src={item.image} alt="" loading="lazy" />
        </div>
      ) : (
        <div
          className="site-search-result-image site-search-result-image-empty"
          aria-hidden="true"
        >
          <span>FOREACH</span>
        </div>
      )}

      <div className="site-search-result-content">
        <h3>{item.title}</h3>

        {item.subtitle ? (
          <p className="site-search-result-subtitle">
            {item.subtitle}
          </p>
        ) : null}

        {item.description ? (
          <p className="site-search-result-description">
            {item.description}
          </p>
        ) : null}

        <span className="site-search-result-action">
          {item.actionLabel ?? "查看详情"}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  );
}

export default function SiteSearchClient({
  locale = "zh-CN",
}: SiteSearchClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryFromUrl = searchParams.get("q")?.trim() ?? "";
  const [inputValue, setInputValue] = useState(queryFromUrl);

  const groupedResults = useMemo(() => {
    const result: Record<SiteSearchModule, SiteSearchItem[]> = {
      products: [],
      "compatible-models": [],
      datasheets: [],
    };

    if (!queryFromUrl) return result;

    for (const item of siteSearchIndex) {
      const score = scoreItem(item, queryFromUrl);
      if (score <= 0) continue;

      result[item.module].push({
        ...item,
        __score: score,
      } as SiteSearchItem & { __score: number });
    }

    for (const module of MODULE_ORDER) {
      result[module] = result[module]
        .sort((a, b) => {
          const scoreA = (a as SiteSearchItem & { __score: number }).__score;
          const scoreB = (b as SiteSearchItem & { __score: number }).__score;

          return scoreB - scoreA || a.title.localeCompare(b.title, "zh-CN");
        })
        .slice(0, 24);
    }

    return result;
  }, [queryFromUrl]);

  const totalResults = MODULE_ORDER.reduce((sum, module) => {
    return sum + groupedResults[module].length;
  }, 0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const keyword = inputValue.trim();
    const path = getLocalizedSearchPath(locale);

    router.push(
      keyword
        ? `${path}?q=${encodeURIComponent(keyword)}`
        : path
    );
  }

  return (
    <main className="site-search-page">
      <section className="site-search-hero">
        <div className="site-search-container">
          <p className="site-search-eyebrow">FOREACH SEARCH</p>
          <h1>全站搜索</h1>
          <p>
            搜索产品、型号、兼容型号和规格书，并在对应模块中查看结果。
          </p>

          <form className="site-search-form" onSubmit={handleSubmit}>
            <input
              type="search"
              value={inputValue}
              placeholder="搜索产品、型号、兼容型号或规格书"
              aria-label="全站搜索"
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
            />
            <button type="submit">搜索</button>
          </form>
        </div>
      </section>

      <div className="site-search-container site-search-content">
        {!queryFromUrl ? (
          <section className="site-search-initial">
            <h2>请输入搜索关键词</h2>
            <p>
              例如：Q2002、PMC1702、柱塞泵、隔膜泵规格书。
            </p>
          </section>
        ) : (
          <>
            <div className="site-search-summary">
              <div>
                <span>搜索关键词</span>
                <strong>{queryFromUrl}</strong>
              </div>
              <p>共找到 {totalResults} 条结果</p>
            </div>

            {totalResults === 0 ? (
              <section className="site-search-no-result">
                <h2>没有找到匹配结果</h2>
                <p>
                  请检查型号是否完整，或尝试产品名称、系列名称及其他关键词。
                </p>
              </section>
            ) : null}

            {MODULE_ORDER.map((module) => {
              const items = groupedResults[module];
              const text = MODULE_TEXT[module];

              return (
                <section
                  className="site-search-module"
                  key={module}
                  id={`search-module-${module}`}
                >
                  <div className="site-search-module-heading">
                    <div>
                      <h2>{text.title}</h2>
                      <p>{text.description}</p>
                    </div>
                    <span>{items.length} 条</span>
                  </div>

                  {items.length > 0 ? (
                    <div className="site-search-result-grid">
                      {items.map((item) => (
                        <SearchResultItem
                          item={item}
                          key={item.id}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="site-search-module-empty">
                      {text.empty}
                    </div>
                  )}
                </section>
              );
            })}
          </>
        )}
      </div>
    </main>
  );
}
'@

Set-Content -LiteralPath $clientPath -Value $clientContent -Encoding utf8

# ============================================================
# 4. 搜索页面样式
# ============================================================

$cssPath = Join-Path $componentDir "site-search.css"

$cssContent = @'
.site-search-page {
  min-height: 100vh;
  background: #ffffff;
  color: #173368;
}

.site-search-container {
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;
}

.site-search-hero {
  padding: 58px 0 54px;
  background:
    linear-gradient(120deg, rgba(23, 51, 104, 0.98), rgba(23, 51, 104, 0.88));
  color: #ffffff;
}

.site-search-eyebrow {
  margin: 0 0 10px;
  color: #09e9b4;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.site-search-hero h1 {
  margin: 0;
  font-size: clamp(34px, 4vw, 54px);
  line-height: 1.1;
}

.site-search-hero > .site-search-container > p:not(.site-search-eyebrow) {
  max-width: 760px;
  margin: 14px 0 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 16px;
  line-height: 1.7;
}

.site-search-form {
  width: min(900px, 100%);
  display: grid;
  grid-template-columns: minmax(0, 1fr) 112px;
  margin-top: 30px;
}

.site-search-form input {
  height: 54px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, 0.46);
  border-right: 0;
  border-radius: 7px 0 0 7px;
  outline: none;
  background: #ffffff;
  color: #173368;
  font-size: 16px;
}

.site-search-form input:focus {
  border-color: #09e9b4;
  box-shadow: inset 0 0 0 1px #09e9b4;
}

.site-search-form button {
  height: 54px;
  border: 1px solid #09e9b4;
  border-radius: 0 7px 7px 0;
  background: #09e9b4;
  color: #173368;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
}

.site-search-content {
  padding-top: 38px;
  padding-bottom: 80px;
}

.site-search-initial,
.site-search-no-result {
  padding: 54px;
  border: 1px solid #e4eaf1;
  background: #f6f8fb;
  text-align: center;
}

.site-search-initial h2,
.site-search-no-result h2 {
  margin: 0;
  font-size: 28px;
}

.site-search-initial p,
.site-search-no-result p {
  margin: 12px 0 0;
  color: rgba(23, 51, 104, 0.68);
  line-height: 1.7;
}

.site-search-summary {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e1e7ef;
}

.site-search-summary div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.site-search-summary span {
  color: rgba(23, 51, 104, 0.58);
  font-size: 13px;
}

.site-search-summary strong {
  font-size: 28px;
  line-height: 1.2;
}

.site-search-summary p {
  margin: 0;
  color: rgba(23, 51, 104, 0.62);
}

.site-search-no-result {
  margin-top: 28px;
}

.site-search-module {
  padding-top: 44px;
}

.site-search-module + .site-search-module {
  margin-top: 44px;
  border-top: 1px solid #e1e7ef;
}

.site-search-module-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 20px;
}

.site-search-module-heading h2 {
  margin: 0;
  font-size: 28px;
}

.site-search-module-heading p {
  margin: 7px 0 0;
  color: rgba(23, 51, 104, 0.62);
  line-height: 1.6;
}

.site-search-module-heading > span {
  flex: 0 0 auto;
  color: rgba(23, 51, 104, 0.58);
  font-size: 14px;
}

.site-search-result-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.site-search-result-card {
  min-width: 0;
  display: grid;
  grid-template-columns: 138px minmax(0, 1fr);
  min-height: 174px;
  overflow: hidden;
  border: 1px solid #e1e7ef;
  background: #ffffff;
  color: #173368;
  text-decoration: none;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.site-search-result-card:hover {
  border-color: #09e9b4;
  transform: translateY(-1px);
}

.site-search-result-image {
  min-height: 174px;
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #f3f6fa;
}

.site-search-result-image img {
  width: 100%;
  height: 100%;
  max-height: 146px;
  display: block;
  object-fit: contain;
  object-position: center;
}

.site-search-result-image-empty span {
  color: rgba(23, 51, 104, 0.35);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.06em;
}

.site-search-result-content {
  min-width: 0;
  padding: 19px 20px 18px;
  display: flex;
  flex-direction: column;
}

.site-search-result-content h3 {
  margin: 0;
  overflow-wrap: anywhere;
  font-size: 19px;
  line-height: 1.35;
}

.site-search-result-subtitle {
  margin: 8px 0 0;
  color: #173368;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
}

.site-search-result-description {
  margin: 8px 0 0;
  display: -webkit-box;
  overflow: hidden;
  color: rgba(23, 51, 104, 0.62);
  font-size: 13px;
  line-height: 1.55;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.site-search-result-action {
  margin-top: auto;
  padding-top: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #173368;
  font-size: 14px;
  font-weight: 800;
}

.site-search-result-card:hover .site-search-result-action {
  color: #00ad88;
}

.site-search-module-empty {
  padding: 30px;
  border: 1px dashed rgba(23, 51, 104, 0.2);
  background: #f8fafc;
  color: rgba(23, 51, 104, 0.56);
  text-align: center;
}

@media (max-width: 900px) {
  .site-search-result-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .site-search-container {
    width: min(1280px, calc(100% - 28px));
  }

  .site-search-hero {
    padding: 42px 0;
  }

  .site-search-form {
    grid-template-columns: 1fr;
  }

  .site-search-form input {
    border-right: 1px solid rgba(255, 255, 255, 0.46);
    border-radius: 7px;
  }

  .site-search-form button {
    margin-top: 10px;
    border-radius: 7px;
  }

  .site-search-summary,
  .site-search-module-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .site-search-result-card {
    grid-template-columns: 104px minmax(0, 1fr);
  }

  .site-search-result-image {
    min-height: 154px;
    padding: 10px;
  }

  .site-search-result-content {
    padding: 16px;
  }
}
'@

Set-Content -LiteralPath $cssPath -Value $cssContent -Encoding utf8

# ============================================================
# 5. 中文搜索路由
# ============================================================

$zhPagePath = Join-Path $appSearchDir "page.tsx"

$zhPageContent = @'
import type { Metadata } from "next";
import { Suspense } from "react";

import SiteSearchClient from "@/components/search/SiteSearchClient";

export const metadata: Metadata = {
  title: "全站搜索｜FOREACH 恒永达",
  description:
    "搜索 FOREACH 恒永达产品、型号、兼容型号和产品规格书。",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <SiteSearchClient locale="zh-CN" />
    </Suspense>
  );
}
'@

Set-Content -LiteralPath $zhPagePath -Value $zhPageContent -Encoding utf8

# ============================================================
# 6. 多语言搜索路由
# ============================================================

$localePagePath = Join-Path $appLocaleSearchDir "page.tsx"

$localePageContent = @'
import { Suspense } from "react";

import SiteSearchClient from "@/components/search/SiteSearchClient";

const SEARCH_LOCALES = ["en", "es", "fr", "ko", "ru"];

export function generateStaticParams() {
  return SEARCH_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleSearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <SiteSearchClient locale={locale} />
    </Suspense>
  );
}
'@

Set-Content -LiteralPath $localePagePath -Value $localePageContent -Encoding utf8

# ============================================================
# 7. 兼容型号页面读取 ?q=
# ============================================================

$fittingComponentPath = Join-Path $root "components\resources\fitting-replacement\FittingReplacementHome.tsx"

if (Test-Path $fittingComponentPath) {
    $component = Get-Content -LiteralPath $fittingComponentPath -Raw -Encoding utf8

    $component = $component.Replace(
        'import { useMemo, useState } from "react";',
        'import { useEffect, useMemo, useState } from "react";'
    )

    if ($component -notmatch "compatibleQueryFromUrl") {
        $stateAnchor = @'
  const [currentPage, setCurrentPage] = useState(1);

  const { addItem, getItem, removeItem } = useSelectionCart();
'@

        $stateReplacement = @'
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const compatibleQueryFromUrl = new URLSearchParams(
      window.location.search
    ).get("q")?.trim();

    if (!compatibleQueryFromUrl) return;

    setSearchValue(compatibleQueryFromUrl);
    setSubmittedKeyword(compatibleQueryFromUrl);
    setCurrentPage(1);
  }, []);

  const { addItem, getItem, removeItem } = useSelectionCart();
'@

        if ($component.Contains($stateAnchor)) {
            $component = $component.Replace(
                $stateAnchor,
                $stateReplacement
            )
        }
        else {
            Write-Host "提示：未自动找到兼容型号页面状态插入点。" -ForegroundColor Yellow
        }
    }

    Set-Content -LiteralPath $fittingComponentPath -Value $component -Encoding utf8
}

Write-Host ""
Write-Host "全站搜索页面已经生成。" -ForegroundColor Green
Write-Host "结果模块顺序：" -ForegroundColor Cyan
Write-Host "1. 产品中心"
Write-Host "2. 兼容型号查询"
Write-Host "3. 规格书下载"
Write-Host ""

Write-Host "开始构建检查……" -ForegroundColor Cyan
npm run build

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "构建完成后，可测试：" -ForegroundColor Green
Write-Host "http://localhost:3000/search?q=Q2002"
Write-Host "http://localhost:3000/search?q=PMC1702"
Write-Host "http://localhost:3000/search?q=柱塞泵"
Write-Host "============================================" -ForegroundColor Cyan
