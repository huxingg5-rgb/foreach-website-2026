$ErrorActionPreference = "Stop"

$root = (Get-Location).Path

if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"

$headerPath = Join-Path $root "components\layout\SiteHeader.tsx"
$panelPath = Join-Path $root "components\search\GlobalSearchPanel.tsx"
$generatorPath = Join-Path $root "scripts\search\generate-global-search-overlay-index.ts"
$oldGeneratedPath = Join-Path $root "data\search\global-search-overlay-index.generated.ts"
$jsonPath = Join-Path $root "public\search\global-search-index.v1.json"

foreach ($requiredPath in @(
    $headerPath,
    $panelPath,
    (Join-Path $root "data\search\site-search-index.generated.ts")
)) {
    if (-not (Test-Path -LiteralPath $requiredPath)) {
        throw "未找到必要文件：$requiredPath"
    }
}

foreach ($file in @(
    $headerPath,
    $panelPath,
    $generatorPath,
    $oldGeneratedPath,
    $jsonPath
)) {
    if (Test-Path -LiteralPath $file) {
        Copy-Item `
            -LiteralPath $file `
            -Destination "$file.bak_light_search_$stamp" `
            -Force
    }
}

New-Item -ItemType Directory -Force -Path `
    (Split-Path $generatorPath), `
    (Split-Path $jsonPath) |
    Out-Null

# ============================================================
# 1. 轻量 JSON 搜索索引生成器
# ============================================================

$generatorContent = @'
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { siteSearchIndex } from "../../data/search/site-search-index.generated";

type SearchModule =
  | "products"
  | "compatible-models"
  | "datasheets"
  | "installation-guides"
  | "technical-articles"
  | "material-compatibility"
  | "applications"
  | "news"
  | "pages";

type CompactSearchItem = {
  m: SearchModule;
  t: string;
  s?: string;
  d?: string;
  h: string;
  i?: string;
  x: string;
  a?: string;
};

type UnknownObject = Record<string, unknown>;

const ROOT = process.cwd();

const OUTPUT_PATH = path.join(
  ROOT,
  "public",
  "search",
  "global-search-index.v1.json"
);

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

function shorten(value: unknown, maxLength = 150): string {
  const normalized = text(value).replace(/\s+/g, " ");

  if (normalized.length <= maxLength) return normalized;

  return `${normalized.slice(0, maxLength - 1)}…`;
}

function cleanImage(value: unknown): string {
  const image = text(value);

  if (!image.startsWith("/")) return "";

  if (
    image.includes("/images/logo/") ||
    image.endsWith("foreach-logo-color.svg")
  ) {
    return "";
  }

  return image;
}

function compactStrings(
  values: Array<unknown>
): string[] {
  const result = new Map<string, string>();

  for (const value of values) {
    if (Array.isArray(value)) {
      for (const nestedValue of value) {
        const nested = text(nestedValue);
        const key = normalize(nested);

        if (key && !result.has(key)) {
          result.set(key, nested);
        }
      }

      continue;
    }

    const stringValue = text(value);
    const key = normalize(stringValue);

    if (key && !result.has(key)) {
      result.set(key, stringValue);
    }
  }

  return [...result.values()];
}

function buildSearchText(
  values: Array<unknown>
): string {
  return compactStrings(values)
    .map(normalize)
    .filter(Boolean)
    .join("|");
}

function getNestedString(
  object: UnknownObject | null,
  paths: string[][]
): string {
  if (!object) return "";

  for (const pathParts of paths) {
    let current: unknown = object;

    for (const part of pathParts) {
      if (
        !current ||
        typeof current !== "object" ||
        Array.isArray(current)
      ) {
        current = undefined;
        break;
      }

      current = (current as UnknownObject)[part];
    }

    const value = text(current);

    if (value) return value;
  }

  return "";
}

function firstExportedObject(
  importedModule: Record<string, unknown> | null
): UnknownObject | null {
  if (!importedModule) return null;

  for (const value of Object.values(importedModule)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      return value as UnknownObject;
    }
  }

  return null;
}

async function importModule(
  relativePath: string
): Promise<Record<string, unknown> | null> {
  const fullPath = path.join(ROOT, relativePath);

  if (!fs.existsSync(fullPath)) return null;

  try {
    return await import(
      `${pathToFileURL(fullPath).href}?lightSearch=${Date.now()}-${Math.random()}`
    );
  } catch (error) {
    console.warn(`跳过无法导入的数据文件：${relativePath}`);
    console.warn(error);
    return null;
  }
}

function collectValuesByKeys(
  value: unknown,
  allowedKeys: Set<string>,
  maxDepth = 4,
  depth = 0,
  result: string[] = [],
  seen = new WeakSet<object>()
): string[] {
  if (
    !value ||
    typeof value !== "object" ||
    depth > maxDepth
  ) {
    return result;
  }

  if (seen.has(value as object)) {
    return result;
  }

  seen.add(value as object);

  if (Array.isArray(value)) {
    for (const child of value) {
      collectValuesByKeys(
        child,
        allowedKeys,
        maxDepth,
        depth + 1,
        result,
        seen
      );
    }

    return result;
  }

  for (const [key, child] of Object.entries(value as UnknownObject)) {
    if (allowedKeys.has(key)) {
      if (typeof child === "string") {
        result.push(child);
      } else if (Array.isArray(child)) {
        for (const item of child) {
          if (
            typeof item === "string" ||
            typeof item === "number"
          ) {
            result.push(String(item));
          }
        }
      }
    }

    collectValuesByKeys(
      child,
      allowedKeys,
      maxDepth,
      depth + 1,
      result,
      seen
    );
  }

  return result;
}

function convertExistingItems(): CompactSearchItem[] {
  return siteSearchIndex.flatMap((item) => {
    const module = item.module as SearchModule;

    if (
      ![
        "products",
        "compatible-models",
        "datasheets",
      ].includes(module)
    ) {
      return [];
    }

    const title = text(item.title);
    const href = text(item.href);

    if (!title || !href) return [];

    const subtitle = shorten(item.subtitle, 90);
    const description = shorten(item.description, 135);
    const image = cleanImage(item.image);

    return [{
      m: module,
      t: title,
      ...(subtitle ? { s: subtitle } : {}),
      ...(description ? { d: description } : {}),
      h: href,
      ...(image ? { i: image } : {}),
      x: buildSearchText([
        title,
        subtitle,
        description,
        item.model,
        item.productCode,
        item.keywords,
      ]),
      ...(item.actionLabel
        ? { a: text(item.actionLabel) }
        : {}),
    }];
  });
}

async function loadInstallationGuides(): Promise<CompactSearchItem[]> {
  const imported = await importModule(
    "data/resources/installation-guide/installation-guide.zh.ts"
  );

  const data = firstExportedObject(imported);
  const guides = Array.isArray(data?.guides)
    ? data.guides
    : [];

  return guides.flatMap((rawGuide) => {
    if (!rawGuide || typeof rawGuide !== "object") return [];

    const guide = rawGuide as UnknownObject;
    const id = text(guide.id);
    const title = text(guide.title);

    if (!id || !title) return [];

    const subtitle = compactStrings([
      guide.category,
      guide.series,
    ]).join(" · ");

    const description = shorten(guide.description, 135);

    return [{
      m: "installation-guides" as const,
      t: title,
      ...(subtitle ? { s: subtitle } : {}),
      ...(description ? { d: description } : {}),
      h: `/resources/installation-guide/${id}`,
      x: buildSearchText([
        title,
        subtitle,
        description,
        guide.tags,
        guide.keywords,
      ]),
      a: "查看教程",
    }];
  });
}

async function loadTechnicalArticles(): Promise<CompactSearchItem[]> {
  const imported = await importModule(
    "data/resources/technical-articles/technical-articles.zh.ts"
  );

  const data = firstExportedObject(imported);
  const articles = Array.isArray(data?.articles)
    ? data.articles
    : [];

  return articles.flatMap((rawArticle) => {
    if (!rawArticle || typeof rawArticle !== "object") return [];

    const article = rawArticle as UnknownObject;
    const slug = text(article.slug || article.id);
    const title = text(article.title);

    if (!slug || !title) return [];

    const subtitle = compactStrings([
      article.category,
      article.date,
    ]).join(" · ");

    const description = shorten(article.summary, 145);
    const image = cleanImage(article.coverImage);

    const sectionTitles = collectValuesByKeys(
      article.content,
      new Set(["title"]),
      2
    );

    return [{
      m: "technical-articles" as const,
      t: title,
      ...(subtitle ? { s: subtitle } : {}),
      ...(description ? { d: description } : {}),
      h: `/resources/technical-articles/${slug}`,
      ...(image ? { i: image } : {}),
      x: buildSearchText([
        title,
        subtitle,
        description,
        sectionTitles,
      ]),
      a: "阅读文章",
    }];
  });
}

async function loadNews(): Promise<CompactSearchItem[]> {
  const imported = await importModule(
    "data/resources/news/news.zh.ts"
  );

  const data = firstExportedObject(imported);
  const articles = Array.isArray(data?.articles)
    ? data.articles
    : [];

  return articles.flatMap((rawArticle) => {
    if (!rawArticle || typeof rawArticle !== "object") return [];

    const article = rawArticle as UnknownObject;
    const slug = text(article.slug || article.id);
    const title = text(article.title);

    if (!slug || !title) return [];

    const subtitle = compactStrings([
      article.category,
      article.date,
    ]).join(" · ");

    const description = shorten(article.summary, 145);
    const image = cleanImage(article.coverImage);

    const sectionTitles = collectValuesByKeys(
      article.content,
      new Set(["title"]),
      2
    );

    return [{
      m: "news" as const,
      t: title,
      ...(subtitle ? { s: subtitle } : {}),
      ...(description ? { d: description } : {}),
      h: `/resources/news/${slug}`,
      ...(image ? { i: image } : {}),
      x: buildSearchText([
        title,
        subtitle,
        description,
        sectionTitles,
      ]),
      a: "查看新闻",
    }];
  });
}

async function loadMaterialCompatibility(): Promise<CompactSearchItem[]> {
  const imported = await importModule(
    "data/resources/material-compatibility/material-compatibility.zh.ts"
  );

  const data = firstExportedObject(imported);

  if (!data) return [];

  const items: CompactSearchItem[] = [];

  const pageTitle =
    getNestedString(data, [
      ["banner", "title"],
      ["hero", "title"],
    ]) || "材料兼容与可靠选型";

  const pageDescription = shorten(
    getNestedString(data, [
      ["banner", "description"],
      ["hero", "description"],
    ]),
    145
  );

  const materials = Array.isArray(data.materialColumns)
    ? data.materialColumns.map(text).filter(Boolean)
    : [];

  items.push({
    m: "material-compatibility",
    t: pageTitle,
    ...(pageDescription ? { d: pageDescription } : {}),
    h: "/resources/material-compatibility",
    x: buildSearchText([
      pageTitle,
      pageDescription,
      materials,
      "材料兼容",
      "材料特性",
      "材质证明",
      "化学介质",
    ]),
    a: "查看材料兼容",
  });

  for (const material of materials) {
    items.push({
      m: "material-compatibility",
      t: `${material} 材料兼容与特性`,
      s: "材料兼容性",
      d: `查看 ${material} 的介质兼容、材料特性及相关选型信息。`,
      h:
        "/resources/material-compatibility" +
        `?tab=features&q=${encodeURIComponent(material)}`,
      x: buildSearchText([
        material,
        `${material}材料`,
        "材料兼容",
        "材料特性",
        "化学兼容",
      ]),
      a: "查看材料",
    });
  }

  const rows = Array.isArray(data.compatibilityRows)
    ? data.compatibilityRows
    : [];

  for (const rawRow of rows) {
    if (!rawRow || typeof rawRow !== "object") continue;

    const row = rawRow as UnknownObject;
    const name = text(row.name);

    if (!name) continue;

    items.push({
      m: "material-compatibility",
      t: name,
      s: "化学介质兼容性",
      d: "查看该介质与常用工程材料的兼容性参考。",
      h:
        "/resources/material-compatibility" +
        `?tab=compatibility&q=${encodeURIComponent(name)}`,
      x: buildSearchText([
        name,
        "化学介质",
        "材料兼容",
      ]),
      a: "查看兼容表",
    });
  }

  return items;
}

function getFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, {
    withFileTypes: true,
  }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return getFiles(fullPath);
    }

    return entry.isFile() ? [fullPath] : [];
  });
}

async function loadApplications(): Promise<CompactSearchItem[]> {
  const directory = path.join(ROOT, "data", "applications");

  const files = getFiles(directory).filter((filePath) => {
    return (
      filePath.endsWith(".zh.ts") &&
      !filePath.endsWith(".types.ts") &&
      !filePath.includes(".bak")
    );
  });

  const items: CompactSearchItem[] = [];

  for (const filePath of files) {
    const relativePath = path
      .relative(ROOT, filePath)
      .replace(/\\/g, "/");

    const imported = await importModule(relativePath);
    const data = firstExportedObject(imported);

    if (!data) continue;

    const relativeFromApplications = path.relative(
      directory,
      filePath
    );

    const firstSegment =
      relativeFromApplications.split(path.sep)[0] ||
      path.basename(filePath).replace(/\.zh\.ts$/, "");

    const slug = firstSegment.replace(/\.zh\.ts$/, "");

    const title =
      getNestedString(data, [
        ["hero", "title"],
        ["banner", "title"],
        ["seo", "title"],
      ]) || slug;

    const description = shorten(
      getNestedString(data, [
        ["hero", "description"],
        ["banner", "description"],
        ["seo", "description"],
      ]),
      145
    );

    const image = cleanImage(
      getNestedString(data, [
        ["hero", "backgroundImage"],
        ["hero", "image"],
        ["banner", "image"],
      ])
    );

    const namedKeywords = collectValuesByKeys(
      data,
      new Set([
        "title",
        "label",
        "name",
        "keywords",
      ]),
      4
    );

    items.push({
      m: "applications",
      t: title,
      ...(description ? { d: description } : {}),
      h: `/applications/${slug}`,
      ...(image ? { i: image } : {}),
      x: buildSearchText([
        slug,
        title,
        description,
        namedKeywords,
      ]),
      a: "查看应用",
    });
  }

  return items;
}

function loadSitePages(): CompactSearchItem[] {
  const pages = [
    {
      t: "公司介绍",
      d: "了解 FOREACH 恒永达的发展、定位与微流体业务。",
      h: "/about/foreach",
      x: ["公司介绍", "恒永达", "FOREACH", "企业简介"],
    },
    {
      t: "质量体系",
      d: "了解恒永达质量体系、认证与质量管理能力。",
      h: "/about/quality",
      x: ["质量体系", "ISO9001", "ISO13485", "CE", "RoHS"],
    },
    {
      t: "发展历程",
      d: "了解恒永达的发展历程与关键节点。",
      h: "/about/history",
      x: ["发展历程", "公司历史", "里程碑"],
    },
    {
      t: "研发与制造",
      d: "了解恒永达研发、生产制造与工程能力。",
      h: "/about/research-manufacturing",
      x: ["研发制造", "生产能力", "研发中心", "制造"],
    },
    {
      t: "企业文化",
      d: "了解恒永达企业文化与价值观。",
      h: "/about/culture",
      x: ["企业文化", "价值观"],
    },
    {
      t: "联系我们",
      d: "提交产品、型号、资料或项目需求。",
      h: "/contact",
      x: ["联系我们", "询盘", "技术支持", "提交需求"],
    },
    {
      t: "经销商合作",
      d: "了解 FOREACH 恒永达经销商合作方式。",
      h: "/contact/distributor",
      x: ["经销商", "代理商", "渠道合作", "合作伙伴"],
    },
  ];

  return pages.map((page) => ({
    m: "pages" as const,
    t: page.t,
    d: page.d,
    h: page.h,
    x: buildSearchText([
      page.t,
      page.d,
      page.x,
    ]),
    a: "打开页面",
  }));
}

function deduplicate(
  items: CompactSearchItem[]
): CompactSearchItem[] {
  const map = new Map<string, CompactSearchItem>();

  for (const item of items) {
    const key = [
      item.m,
      item.h,
      normalize(item.t),
      normalize(item.s ?? ""),
    ].join("::");

    const existing = map.get(key);

    if (!existing) {
      map.set(key, item);
      continue;
    }

    const existingScore =
      (existing.i ? 2 : 0) +
      (existing.d ? 1 : 0);

    const itemScore =
      (item.i ? 2 : 0) +
      (item.d ? 1 : 0);

    if (itemScore > existingScore) {
      map.set(key, item);
    }
  }

  return [...map.values()];
}

async function main() {
  const [
    installationGuides,
    technicalArticles,
    materialCompatibility,
    applications,
    news,
  ] = await Promise.all([
    loadInstallationGuides(),
    loadTechnicalArticles(),
    loadMaterialCompatibility(),
    loadApplications(),
    loadNews(),
  ]);

  const items = deduplicate([
    ...convertExistingItems(),
    ...installationGuides,
    ...technicalArticles,
    ...materialCompatibility,
    ...applications,
    ...news,
    ...loadSitePages(),
  ]);

  fs.mkdirSync(path.dirname(OUTPUT_PATH), {
    recursive: true,
  });

  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify(items),
    "utf8"
  );

  const counts = items.reduce<Record<string, number>>(
    (result, item) => {
      result[item.m] = (result[item.m] ?? 0) + 1;
      return result;
    },
    {}
  );

  const bytes = fs.statSync(OUTPUT_PATH).size;
  const sizeKB = (bytes / 1024).toFixed(1);

  console.log("============================================");
  console.log("轻量全站搜索 JSON 已生成");

  for (const [module, count] of Object.entries(counts)) {
    console.log(`${module}: ${count}`);
  }

  console.log(`总计：${items.length}`);
  console.log(`JSON 大小：${sizeKB} KB`);
  console.log(`输出：${OUTPUT_PATH}`);
  console.log("============================================");
}

main();
'@

Set-Content `
    -LiteralPath $generatorPath `
    -Value $generatorContent `
    -Encoding utf8

Write-Host ""
Write-Host "正在生成轻量 JSON 搜索索引……" -ForegroundColor Cyan

npx tsx scripts/search/generate-global-search-overlay-index.ts

if ($LASTEXITCODE -ne 0) {
    throw "轻量搜索索引生成失败。"
}

# ============================================================
# 2. 覆盖搜索面板：JSON 加载、预加载、180ms 防抖
# ============================================================

$panelContent = @'
"use client";

import {
  Fragment,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

type SearchModule =
  | "products"
  | "compatible-models"
  | "datasheets"
  | "installation-guides"
  | "technical-articles"
  | "material-compatibility"
  | "applications"
  | "news"
  | "pages";

type CompactSearchItem = {
  m: SearchModule;
  t: string;
  s?: string;
  d?: string;
  h: string;
  i?: string;
  x: string;
  a?: string;
};

type GlobalSearchPanelProps = {
  isOpen: boolean;
  query: string;
  locale: string;
  onQueryChange: (value: string) => void;
  onClose: () => void;
};

type ScoredItem = {
  item: CompactSearchItem;
  score: number;
};

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number }
  ) => number;
  cancelIdleCallback?: (id: number) => void;
};

const SEARCH_INDEX_URL =
  "/search/global-search-index.v1.json";

const DEFAULT_VISIBLE_COUNT = 6;
const LOAD_MORE_COUNT = 6;
const SEARCH_DEBOUNCE_MS = 180;

let cachedSearchItems: CompactSearchItem[] | null = null;
let searchItemsPromise: Promise<CompactSearchItem[]> | null = null;

export function preloadGlobalSearchIndex():
  Promise<CompactSearchItem[]> {
  if (cachedSearchItems) {
    return Promise.resolve(cachedSearchItems);
  }

  if (searchItemsPromise) {
    return searchItemsPromise;
  }

  searchItemsPromise = fetch(SEARCH_INDEX_URL, {
    cache: "force-cache",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `全站搜索索引加载失败：${response.status}`
        );
      }

      return response.json() as Promise<CompactSearchItem[]>;
    })
    .then((items) => {
      cachedSearchItems = items;
      return items;
    })
    .catch((error) => {
      searchItemsPromise = null;
      throw error;
    });

  return searchItemsPromise;
}

const MODULE_ORDER: SearchModule[] = [
  "products",
  "compatible-models",
  "datasheets",
  "installation-guides",
  "technical-articles",
  "material-compatibility",
  "applications",
  "news",
  "pages",
];

const MODULE_TEXT: Record<
  SearchModule,
  {
    title: string;
    action: string;
  }
> = {
  products: {
    title: "产品中心",
    action: "查看产品",
  },
  "compatible-models": {
    title: "兼容型号查询",
    action: "查看兼容产品",
  },
  datasheets: {
    title: "规格书下载",
    action: "查看规格书",
  },
  "installation-guides": {
    title: "安装教程",
    action: "查看教程",
  },
  "technical-articles": {
    title: "技术文章",
    action: "阅读文章",
  },
  "material-compatibility": {
    title: "材料兼容性",
    action: "查看材料信息",
  },
  applications: {
    title: "应用领域",
    action: "查看应用",
  },
  news: {
    title: "新闻资讯",
    action: "查看新闻",
  },
  pages: {
    title: "网站页面",
    action: "打开页面",
  },
};

const INITIAL_SUGGESTIONS = [
  "Q2002",
  "PMC1702",
  "柱塞泵",
  "PEEK",
  "接头安装",
  "ADLM",
];

function normalize(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/[‐‑‒–—―﹘﹣－]/g, "-")
    .replace(/\s+/g, "");
}

function useDebouncedValue(
  value: string,
  delay: number
): string {
  const [debouncedValue, setDebouncedValue] =
    useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [delay, value]);

  return debouncedValue;
}

function scoreItem(
  item: CompactSearchItem,
  normalizedQuery: string
): number {
  if (!normalizedQuery) return 0;

  if (!item.x.includes(normalizedQuery)) return 0;

  const title = normalize(item.t);
  const subtitle = normalize(item.s ?? "");

  let score = 30;

  if (title === normalizedQuery) score += 1200;

  if (
    item.m === "compatible-models" &&
    title === normalizedQuery
  ) {
    score += 700;
  }

  if (title.startsWith(normalizedQuery)) score += 600;
  else if (title.includes(normalizedQuery)) score += 330;

  if (subtitle === normalizedQuery) score += 500;
  else if (subtitle.startsWith(normalizedQuery)) score += 260;
  else if (subtitle.includes(normalizedQuery)) score += 150;

  return score;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(
  value: string,
  query: string
): ReactNode {
  const keyword = query.trim();

  if (!keyword) return value;

  const parts = value.split(
    new RegExp(`(${escapeRegExp(keyword)})`, "ig")
  );

  return parts.map((part, index) => {
    if (part.toLowerCase() === keyword.toLowerCase()) {
      return <mark key={`${part}-${index}`}>{part}</mark>;
    }

    return (
      <Fragment key={`${part}-${index}`}>
        {part}
      </Fragment>
    );
  });
}

function getLocalizedHref(
  href: string,
  locale: string
): string {
  if (
    !href.startsWith("/") ||
    href.startsWith("/downloads/") ||
    locale === "zh-CN" ||
    locale === "zh"
  ) {
    return href;
  }

  const firstSegment = href
    .split("/")
    .filter(Boolean)[0];

  if (
    ["en", "es", "fr", "ko", "ru"].includes(
      firstSegment ?? ""
    )
  ) {
    return href;
  }

  return `/${locale}${href}`;
}

export default function GlobalSearchPanel({
  isOpen,
  query,
  locale,
  onQueryChange,
  onClose,
}: GlobalSearchPanelProps) {
  const debouncedQuery = useDebouncedValue(
    query,
    SEARCH_DEBOUNCE_MS
  );

  const [items, setItems] =
    useState<CompactSearchItem[] | null>(
      cachedSearchItems
    );

  const [loadState, setLoadState] = useState<
    "idle" | "loading" | "ready" | "error"
  >(cachedSearchItems ? "ready" : "idle");

  const [headerBottom, setHeaderBottom] =
    useState(84);

  const [visibleCounts, setVisibleCounts] =
    useState<
      Partial<Record<SearchModule, number>>
    >({});

  /*
    页面首次加载完成后，浏览器空闲时预取 JSON。
    不阻塞首屏，也不等点击搜索后才开始下载。
  */
  useEffect(() => {
    if (cachedSearchItems) {
      setItems(cachedSearchItems);
      setLoadState("ready");
      return;
    }

    const idleWindow = window as IdleWindow;
    let fallbackTimer: number | undefined;
    let idleId: number | undefined;
    let cancelled = false;

    const preload = () => {
      void preloadGlobalSearchIndex()
        .then((loadedItems) => {
          if (!cancelled) {
            setItems(loadedItems);
            setLoadState("ready");
          }
        })
        .catch(() => {
          /*
            空闲预取失败时不立即打扰用户；
            用户正式打开搜索时还会再次尝试。
          */
        });
    };

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(
        preload,
        { timeout: 1800 }
      );
    } else {
      fallbackTimer = window.setTimeout(
        preload,
        700
      );
    }

    return () => {
      cancelled = true;

      if (
        idleId !== undefined &&
        idleWindow.cancelIdleCallback
      ) {
        idleWindow.cancelIdleCallback(idleId);
      }

      if (fallbackTimer !== undefined) {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, []);

  /*
    打开搜索面板时确保索引可用。
    若空闲预取已经完成，这里会直接读取内存缓存。
  */
  useEffect(() => {
    if (!isOpen || items) return;

    let cancelled = false;

    setLoadState("loading");

    void preloadGlobalSearchIndex()
      .then((loadedItems) => {
        if (cancelled) return;

        setItems(loadedItems);
        setLoadState("ready");
      })
      .catch(() => {
        if (cancelled) return;

        setLoadState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, items]);

  useEffect(() => {
    if (!isOpen) return;

    function updateHeaderBottom() {
      const header =
        document.querySelector(".site-header");

      const nextBottom =
        header?.getBoundingClientRect().bottom ?? 84;

      setHeaderBottom(Math.max(0, nextBottom));
    }

    updateHeaderBottom();

    window.addEventListener(
      "resize",
      updateHeaderBottom
    );

    document.body.classList.add(
      "global-search-lock"
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateHeaderBottom
      );

      document.body.classList.remove(
        "global-search-lock"
      );
    };
  }, [isOpen]);

  useEffect(() => {
    setVisibleCounts({});
  }, [debouncedQuery]);

  const groupedResults = useMemo(() => {
    const grouped = new Map<
      SearchModule,
      ScoredItem[]
    >();

    for (const module of MODULE_ORDER) {
      grouped.set(module, []);
    }

    const normalizedQuery = normalize(
      debouncedQuery
    );

    if (!normalizedQuery || !items) {
      return grouped;
    }

    for (const item of items) {
      const score = scoreItem(
        item,
        normalizedQuery
      );

      if (score <= 0) continue;

      grouped.get(item.m)?.push({
        item,
        score,
      });
    }

    for (const module of MODULE_ORDER) {
      const moduleItems =
        grouped.get(module) ?? [];

      moduleItems.sort((a, b) => {
        return (
          b.score - a.score ||
          a.item.t.localeCompare(
            b.item.t,
            "zh-CN"
          )
        );
      });

      grouped.set(module, moduleItems);
    }

    return grouped;
  }, [debouncedQuery, items]);

  const visibleModules = MODULE_ORDER.filter(
    (module) => {
      return (
        groupedResults.get(module)?.length ?? 0
      ) > 0;
    }
  );

  const totalCount = visibleModules.reduce(
    (sum, module) => {
      return (
        sum +
        (groupedResults.get(module)?.length ?? 0)
      );
    },
    0
  );

  if (!isOpen) return null;

  const isWaitingForDebounce =
    query.trim() !== debouncedQuery.trim();

  const showLoading =
    Boolean(query.trim()) &&
    (
      isWaitingForDebounce ||
      loadState === "loading" ||
      (!items && loadState !== "error")
    );

  return (
    <>
      <button
        className="global-search-backdrop"
        type="button"
        aria-label="关闭全站搜索"
        style={{ top: headerBottom }}
        onClick={onClose}
      />

      <section
        className="global-search-panel"
        aria-label="全站搜索结果"
        style={{
          top: headerBottom,
          maxHeight:
            `calc(100vh - ${headerBottom}px)`,
        }}
      >
        <div className="global-search-panel-inner">
          <header className="global-search-panel-head">
            <div>
              <span>全站搜索</span>

              <strong>
                {query.trim()
                  ? `“${query.trim()}”`
                  : "搜索产品与技术资料"}
              </strong>
            </div>

            <div className="global-search-panel-head-actions">
              {query.trim() &&
              !showLoading &&
              loadState === "ready" ? (
                <span>
                  共 {totalCount} 条结果
                </span>
              ) : null}

              <button
                className="global-search-close"
                type="button"
                aria-label="关闭全站搜索"
                onClick={onClose}
              >
                ×
              </button>
            </div>
          </header>

          {!query.trim() ? (
            <div className="global-search-start">
              <p>
                输入产品名称、型号、兼容型号、规格书、教程或技术关键词。
              </p>

              <div className="global-search-suggestions">
                {INITIAL_SUGGESTIONS.map(
                  (suggestion) => (
                    <button
                      type="button"
                      key={suggestion}
                      onClick={() => {
                        onQueryChange(suggestion);
                      }}
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : showLoading ? (
            <div className="global-search-status">
              正在搜索……
            </div>
          ) : loadState === "error" ? (
            <div className="global-search-status">
              <strong>搜索数据加载失败</strong>
              <p>
                请刷新页面后重试。
              </p>
            </div>
          ) : totalCount === 0 ? (
            <div className="global-search-status">
              <strong>没有找到匹配结果</strong>
              <p>
                请检查型号是否完整，或尝试产品名称、系列、材料及应用关键词。
              </p>
            </div>
          ) : (
            <div
              className="global-search-modules"
              aria-live="polite"
            >
              {visibleModules.map((module) => {
                const moduleResults =
                  groupedResults.get(module) ?? [];

                const visibleCount =
                  visibleCounts[module] ??
                  DEFAULT_VISIBLE_COUNT;

                const visibleResults =
                  moduleResults.slice(
                    0,
                    visibleCount
                  );

                const allVisible =
                  visibleCount >=
                  moduleResults.length;

                return (
                  <section
                    className="global-search-module"
                    key={module}
                  >
                    <div className="global-search-module-head">
                      <h2>
                        {MODULE_TEXT[module].title}
                      </h2>

                      <span>
                        {moduleResults.length} 条
                      </span>
                    </div>

                    <div className="global-search-result-grid">
                      {visibleResults.map(
                        ({ item }) => (
                          <a
                            className="global-search-result"
                            href={getLocalizedHref(
                              item.h,
                              locale
                            )}
                            key={`${item.m}-${item.h}-${item.t}`}
                            onClick={onClose}
                          >
                            {item.i ? (
                              <span className="global-search-result-image">
                                <img
                                  src={item.i}
                                  alt=""
                                  loading="lazy"
                                />
                              </span>
                            ) : (
                              <span
                                className="global-search-result-image global-search-result-image-empty"
                                aria-hidden="true"
                              >
                                F
                              </span>
                            )}

                            <span className="global-search-result-copy">
                              <strong>
                                {highlightText(
                                  item.t,
                                  debouncedQuery
                                )}
                              </strong>

                              {item.s ? (
                                <span className="global-search-result-subtitle">
                                  {highlightText(
                                    item.s,
                                    debouncedQuery
                                  )}
                                </span>
                              ) : null}

                              {item.d ? (
                                <span className="global-search-result-description">
                                  {item.d}
                                </span>
                              ) : null}

                              <span className="global-search-result-action">
                                {item.a ??
                                  MODULE_TEXT[module]
                                    .action}

                                <span aria-hidden="true">
                                  →
                                </span>
                              </span>
                            </span>
                          </a>
                        )
                      )}
                    </div>

                    {moduleResults.length >
                    DEFAULT_VISIBLE_COUNT ? (
                      <button
                        className="global-search-more"
                        type="button"
                        onClick={() => {
                          setVisibleCounts(
                            (current) => ({
                              ...current,
                              [module]: allVisible
                                ? DEFAULT_VISIBLE_COUNT
                                : Math.min(
                                    moduleResults.length,
                                    visibleCount +
                                      LOAD_MORE_COUNT
                                  ),
                            })
                          );
                        }}
                      >
                        {allVisible
                          ? "收起结果"
                          : `查看更多（剩余 ${
                              moduleResults.length -
                              visibleCount
                            } 条）`}
                      </button>
                    ) : null}
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
'@

Set-Content `
    -LiteralPath $panelPath `
    -Value $panelContent `
    -Encoding utf8

# ============================================================
# 3. Header 增加鼠标移入 / 聚焦 / 触摸预加载
# ============================================================

$header = Get-Content `
    -LiteralPath $headerPath `
    -Raw `
    -Encoding utf8

$header = $header.Replace(
    'import GlobalSearchPanel from "@/components/search/GlobalSearchPanel";',
    @'
import GlobalSearchPanel, {
  preloadGlobalSearchIndex,
} from "@/components/search/GlobalSearchPanel";
'@
)

if (
    $header -notmatch
    'preloadGlobalSearchIndex'
) {
    throw "未成功接入 preloadGlobalSearchIndex import。"
}

if (
    $header -notmatch
    'onMouseEnter=\{\(\) => \{\s*void preloadGlobalSearchIndex'
) {
    $buttonAnchor =
        '              aria-expanded={isSearchOpen}' +
        "`r`n"

    if (-not $header.Contains($buttonAnchor)) {
        $buttonAnchor =
            '              aria-expanded={isSearchOpen}' +
            "`n"
    }

    if (-not $header.Contains($buttonAnchor)) {
        throw "未找到顶部搜索按钮 aria-expanded。"
    }

    $buttonReplacement = @'
              aria-expanded={isSearchOpen}
              onMouseEnter={() => {
                void preloadGlobalSearchIndex();
              }}
              onFocus={() => {
                void preloadGlobalSearchIndex();
              }}
              onTouchStart={() => {
                void preloadGlobalSearchIndex();
              }}
'@

    $header = $header.Replace(
        $buttonAnchor,
        $buttonReplacement
    )
}

Set-Content `
    -LiteralPath $headerPath `
    -Value $header `
    -Encoding utf8

# ============================================================
# 4. 删除旧的巨大前端 TS 索引
# ============================================================

if (Test-Path -LiteralPath $oldGeneratedPath) {
    Remove-Item `
        -LiteralPath $oldGeneratedPath `
        -Force
}

Write-Host ""
Write-Host "轻量搜索优化已完成。" -ForegroundColor Green

$oldIndexPath = Join-Path $root "data\search\site-search-index.generated.ts"

if (Test-Path -LiteralPath $oldIndexPath) {
    $oldSizeKB = [math]::Round(
        (Get-Item $oldIndexPath).Length / 1KB,
        1
    )

    Write-Host "原基础 TS 索引：$oldSizeKB KB" -ForegroundColor DarkGray
}

$newSizeKB = [math]::Round(
    (Get-Item $jsonPath).Length / 1KB,
    1
)

Write-Host "新轻量 JSON 索引：$newSizeKB KB" -ForegroundColor Cyan
Write-Host ""

Write-Host "开始构建检查……" -ForegroundColor Cyan

npm run build

if ($LASTEXITCODE -ne 0) {
    throw "构建未通过，请把新的报错发给我。"
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "构建通过。" -ForegroundColor Green
Write-Host "现在的加载方式：" -ForegroundColor Yellow
Write-Host "1. 页面空闲时提前下载 JSON"
Write-Host "2. 鼠标移入搜索图标时提前下载"
Write-Host "3. 搜索索引保存在浏览器内存中"
Write-Host "4. 输入等待 180ms 后再搜索"
Write-Host "5. 每个模块默认只渲染 6 条"
Write-Host ""
Write-Host "建议重新启动开发服务后测试：" -ForegroundColor Yellow
Write-Host "npm run dev"
Write-Host "============================================" -ForegroundColor Cyan
