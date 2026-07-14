$ErrorActionPreference = "Stop"

$root = (Get-Location).Path

if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"

$headerPath = Join-Path $root "components\layout\SiteHeader.tsx"
$globalsPath = Join-Path $root "app\globals.css"
$panelPath = Join-Path $root "components\search\GlobalSearchPanel.tsx"
$typesPath = Join-Path $root "data\search\global-search-overlay.types.ts"
$generatorPath = Join-Path $root "scripts\search\generate-global-search-overlay-index.ts"
$generatedPath = Join-Path $root "data\search\global-search-overlay-index.generated.ts"

foreach ($requiredPath in @(
    $headerPath,
    $globalsPath,
    (Join-Path $root "data\search\site-search-index.generated.ts")
)) {
    if (-not (Test-Path -LiteralPath $requiredPath)) {
        throw "未找到必要文件：$requiredPath"
    }
}

foreach ($file in @(
    $headerPath,
    $globalsPath,
    $panelPath,
    $typesPath,
    $generatorPath,
    $generatedPath
)) {
    if (Test-Path -LiteralPath $file) {
        Copy-Item -LiteralPath $file -Destination "$file.bak_search_overlay_$stamp" -Force
    }
}

New-Item -ItemType Directory -Force -Path `
    (Split-Path $panelPath), `
    (Split-Path $typesPath), `
    (Split-Path $generatorPath) |
    Out-Null

# ============================================================
# 1. 全站搜索面板类型
# ============================================================

$typesContent = @'
export type GlobalSearchModule =
  | "products"
  | "compatible-models"
  | "datasheets"
  | "installation-guides"
  | "technical-articles"
  | "material-compatibility"
  | "applications"
  | "news"
  | "pages";

export interface GlobalSearchItem {
  id: string;
  module: GlobalSearchModule;
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
# 2. 完整搜索索引生成脚本
# ============================================================

$generatorContent = @'
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { siteSearchIndex } from "../../data/search/site-search-index.generated";

import type {
  GlobalSearchItem,
  GlobalSearchModule,
} from "../../data/search/global-search-overlay.types";

const ROOT = process.cwd();

const OUTPUT_PATH = path.join(
  ROOT,
  "data",
  "search",
  "global-search-overlay-index.generated.ts"
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

function isNonEmptyString(
  value: string | undefined | null
): value is string {
  return Boolean(value);
}

function cleanImage(image: unknown): string {
  const value = text(image);

  if (!value.startsWith("/")) return "";

  if (
    value.includes("/images/logo/") ||
    value.endsWith("foreach-logo-color.svg")
  ) {
    return "";
  }

  return value;
}

function flattenStrings(
  value: unknown,
  result: string[] = [],
  seen = new WeakSet<object>()
): string[] {
  if (typeof value === "string") {
    const trimmed = value.trim();

    if (trimmed) result.push(trimmed);

    return result;
  }

  if (
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    result.push(String(value));
    return result;
  }

  if (!value || typeof value !== "object") {
    return result;
  }

  if (seen.has(value as object)) {
    return result;
  }

  seen.add(value as object);

  if (Array.isArray(value)) {
    for (const item of value) {
      flattenStrings(item, result, seen);
    }

    return result;
  }

  for (const child of Object.values(value as Record<string, unknown>)) {
    flattenStrings(child, result, seen);
  }

  return result;
}

function uniqueKeywords(values: Array<string | undefined | null>): string[] {
  const result = new Map<string, string>();

  for (const value of values.filter(isNonEmptyString)) {
    const normalized = normalize(value);

    if (normalized && !result.has(normalized)) {
      result.set(normalized, value);
    }
  }

  return [...result.values()];
}

async function importModule(relativePath: string) {
  const fullPath = path.join(ROOT, relativePath);

  if (!fs.existsSync(fullPath)) return null;

  return import(
    `${pathToFileURL(fullPath).href}?globalSearch=${Date.now()}-${Math.random()}`
  );
}

function firstExportedObject(
  importedModule: Record<string, unknown> | null
): Record<string, unknown> | null {
  if (!importedModule) return null;

  for (const value of Object.values(importedModule)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      return value as Record<string, unknown>;
    }
  }

  return null;
}

function getNestedString(
  object: Record<string, unknown> | null,
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

      current = (current as Record<string, unknown>)[part];
    }

    const value = text(current);

    if (value) return value;
  }

  return "";
}

function convertExistingItems(): GlobalSearchItem[] {
  return siteSearchIndex.map((item) => ({
    ...item,
    module: item.module as GlobalSearchModule,
    keywords: uniqueKeywords([
      item.title,
      item.subtitle,
      item.description,
      item.model,
      item.productCode,
      ...(item.keywords ?? []),
    ]),
  }));
}

async function loadInstallationGuides(): Promise<GlobalSearchItem[]> {
  const imported = await importModule(
    "data/resources/installation-guide/installation-guide.zh.ts"
  );

  const data = firstExportedObject(imported);
  const guides = Array.isArray(data?.guides)
    ? data.guides
    : [];

  return guides.flatMap((rawGuide) => {
    if (!rawGuide || typeof rawGuide !== "object") return [];

    const guide = rawGuide as Record<string, unknown>;
    const id = text(guide.id);
    const title = text(guide.title);

    if (!id || !title) return [];

    return [{
      id: `installation-guide:${id}`,
      module: "installation-guides" as const,
      title,
      subtitle: [
        text(guide.category),
        text(guide.series),
      ].filter(isNonEmptyString).join(" · "),
      description: text(guide.description),
      href: `/resources/installation-guide/${id}`,
      actionLabel: "查看教程",
      keywords: uniqueKeywords([
        title,
        text(guide.description),
        ...flattenStrings(guide.tags),
        ...flattenStrings(guide.keywords),
        ...flattenStrings(guide.steps),
      ]),
    }];
  });
}

async function loadTechnicalArticles(): Promise<GlobalSearchItem[]> {
  const imported = await importModule(
    "data/resources/technical-articles/technical-articles.zh.ts"
  );

  const data = firstExportedObject(imported);
  const articles = Array.isArray(data?.articles)
    ? data.articles
    : [];

  return articles.flatMap((rawArticle) => {
    if (!rawArticle || typeof rawArticle !== "object") return [];

    const article = rawArticle as Record<string, unknown>;
    const slug = text(article.slug || article.id);
    const title = text(article.title);

    if (!slug || !title) return [];

    return [{
      id: `technical-article:${slug}`,
      module: "technical-articles" as const,
      title,
      subtitle: [
        text(article.category),
        text(article.date),
      ].filter(isNonEmptyString).join(" · "),
      description: text(article.summary),
      href: `/resources/technical-articles/${slug}`,
      image: cleanImage(article.coverImage),
      actionLabel: "阅读文章",
      keywords: uniqueKeywords([
        title,
        text(article.summary),
        text(article.category),
        text(article.date),
        ...flattenStrings(article.content),
      ]),
    }];
  });
}

async function loadNews(): Promise<GlobalSearchItem[]> {
  const imported = await importModule(
    "data/resources/news/news.zh.ts"
  );

  const data = firstExportedObject(imported);
  const articles = Array.isArray(data?.articles)
    ? data.articles
    : [];

  return articles.flatMap((rawArticle) => {
    if (!rawArticle || typeof rawArticle !== "object") return [];

    const article = rawArticle as Record<string, unknown>;
    const slug = text(article.slug || article.id);
    const title = text(article.title);

    if (!slug || !title) return [];

    return [{
      id: `news:${slug}`,
      module: "news" as const,
      title,
      subtitle: [
        text(article.category),
        text(article.date),
      ].filter(isNonEmptyString).join(" · "),
      description: text(article.summary),
      href: `/resources/news/${slug}`,
      image: cleanImage(article.coverImage),
      actionLabel: "查看新闻",
      keywords: uniqueKeywords([
        title,
        text(article.summary),
        text(article.category),
        text(article.date),
        ...flattenStrings(article.content),
      ]),
    }];
  });
}

async function loadMaterialCompatibility(): Promise<GlobalSearchItem[]> {
  const imported = await importModule(
    "data/resources/material-compatibility/material-compatibility.zh.ts"
  );

  const data = firstExportedObject(imported);

  if (!data) return [];

  const items: GlobalSearchItem[] = [];

  const pageTitle =
    getNestedString(data, [
      ["banner", "title"],
      ["hero", "title"],
    ]) || "材料兼容与可靠选型";

  const pageDescription =
    getNestedString(data, [
      ["banner", "description"],
      ["hero", "description"],
    ]);

  items.push({
    id: "material-compatibility:page",
    module: "material-compatibility",
    title: pageTitle,
    description: pageDescription,
    href: "/resources/material-compatibility",
    actionLabel: "查看材料兼容",
    keywords: uniqueKeywords([
      pageTitle,
      pageDescription,
      ...flattenStrings(data.searchCopy),
      ...flattenStrings(data.tabs),
      ...flattenStrings(data.materialColumns),
      ...flattenStrings(data),
    ]),
  });

  const materialColumns = Array.isArray(data.materialColumns)
    ? data.materialColumns
    : [];

  for (const rawMaterial of materialColumns) {
    const material = text(rawMaterial);

    if (!material) continue;

    items.push({
      id: `material:${normalize(material)}`,
      module: "material-compatibility",
      title: `${material} 材料兼容与特性`,
      subtitle: "材料兼容性",
      description: `查看 ${material} 的介质兼容、材料特性及相关选型信息。`,
      href:
        "/resources/material-compatibility" +
        `?tab=features&q=${encodeURIComponent(material)}`,
      actionLabel: "查看材料",
      keywords: uniqueKeywords([
        material,
        `${material}材料`,
        "材料特性",
        "化学兼容",
      ]),
    });
  }

  const rows = Array.isArray(data.compatibilityRows)
    ? data.compatibilityRows
    : [];

  for (const rawRow of rows) {
    if (!rawRow || typeof rawRow !== "object") continue;

    const row = rawRow as Record<string, unknown>;
    const name = text(row.name);

    if (!name) continue;

    items.push({
      id: `chemical:${normalize(name)}`,
      module: "material-compatibility",
      title: name,
      subtitle: "化学介质兼容性",
      description: "查看该介质与常用工程材料的兼容性参考。",
      href:
        "/resources/material-compatibility" +
        `?tab=compatibility&q=${encodeURIComponent(name)}`,
      actionLabel: "查看兼容表",
      keywords: uniqueKeywords([
        name,
        ...flattenStrings(row.values),
        ...flattenStrings(data.materialColumns),
      ]),
    });
  }

  return items;
}

type ApplicationSource = {
  path: string;
  href: string;
  fallbackTitle: string;
};

const APPLICATION_SOURCES: ApplicationSource[] = [
  {
    path:
      "data/applications/analytical-instruments/analytical-instruments-application.zh.ts",
    href: "/applications/analytical-instruments",
    fallbackTitle: "分析仪器",
  },
  {
    path:
      "data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts",
    href: "/applications/environmental-monitoring",
    fallbackTitle: "环境监测",
  },
  {
    path:
      "data/applications/ivd/ivd-application.zh.ts",
    href: "/applications/ivd",
    fallbackTitle: "IVD",
  },
  {
    path:
      "data/applications/lab-automation/lab-automation-application.zh.ts",
    href: "/applications/lab-automation",
    fallbackTitle: "实验室自动化",
  },
  {
    path:
      "data/applications/life-science/life-science-application.zh.ts",
    href: "/applications/life-science",
    fallbackTitle: "生命科学",
  },
  {
    path:
      "data/applications/synthetic-biology/synthetic-biology-application.zh.ts",
    href: "/applications/synthetic-biology",
    fallbackTitle: "合成生物",
  },
];

async function loadApplications(): Promise<GlobalSearchItem[]> {
  const items: GlobalSearchItem[] = [];

  for (const source of APPLICATION_SOURCES) {
    const imported = await importModule(source.path);
    const data = firstExportedObject(imported);

    if (!data) continue;

    const title =
      getNestedString(data, [
        ["hero", "title"],
        ["banner", "title"],
      ]) || source.fallbackTitle;

    const description =
      getNestedString(data, [
        ["hero", "description"],
        ["banner", "description"],
      ]);

    const image =
      getNestedString(data, [
        ["hero", "backgroundImage"],
        ["hero", "image"],
        ["banner", "image"],
      ]);

    items.push({
      id: `application:${source.href}`,
      module: "applications",
      title,
      subtitle: source.fallbackTitle,
      description,
      href: source.href,
      image: cleanImage(image),
      actionLabel: "查看应用",
      keywords: uniqueKeywords([
        source.fallbackTitle,
        title,
        description,
        ...flattenStrings(data),
      ]),
    });
  }

  return items;
}

function loadSitePages(): GlobalSearchItem[] {
  const pages = [
    {
      id: "about-foreach",
      title: "公司介绍",
      description: "了解 FOREACH 恒永达的发展、定位与微流体业务。",
      href: "/about/foreach",
      keywords: ["公司介绍", "恒永达", "FOREACH", "企业简介"],
    },
    {
      id: "about-quality",
      title: "质量体系",
      description: "了解恒永达质量体系、认证与质量管理能力。",
      href: "/about/quality",
      keywords: ["质量体系", "ISO 9001", "ISO 13485", "CE", "RoHS"],
    },
    {
      id: "about-history",
      title: "发展历程",
      description: "了解恒永达的发展历程与关键节点。",
      href: "/about/history",
      keywords: ["发展历程", "公司历史", "里程碑"],
    },
    {
      id: "about-research",
      title: "研发与制造",
      description: "了解恒永达研发、生产制造与工程能力。",
      href: "/about/research-manufacturing",
      keywords: ["研发制造", "生产能力", "研发中心", "制造"],
    },
    {
      id: "about-culture",
      title: "企业文化",
      description: "了解恒永达企业文化与价值观。",
      href: "/about/culture",
      keywords: ["企业文化", "价值观"],
    },
    {
      id: "contact",
      title: "联系我们",
      description: "提交产品、型号、资料或项目需求。",
      href: "/contact",
      keywords: ["联系我们", "询盘", "技术支持", "提交需求"],
    },
    {
      id: "distributor",
      title: "经销商合作",
      description: "了解 FOREACH 恒永达经销商合作方式。",
      href: "/contact/distributor",
      keywords: ["经销商", "代理商", "渠道合作", "合作伙伴"],
    },
  ];

  return pages.map((page) => ({
    ...page,
    module: "pages" as const,
    actionLabel: "打开页面",
  }));
}

function deduplicate(items: GlobalSearchItem[]): GlobalSearchItem[] {
  const map = new Map<string, GlobalSearchItem>();

  for (const item of items) {
    const key = [
      item.module,
      item.href,
      normalize(item.title),
      normalize(item.model ?? ""),
      item.productCode ?? "",
    ].join("::");

    const existing = map.get(key);

    if (!existing) {
      map.set(key, item);
      continue;
    }

    const existingScore =
      (existing.image ? 2 : 0) +
      (existing.description ? 1 : 0);

    const itemScore =
      (item.image ? 2 : 0) +
      (item.description ? 1 : 0);

    if (itemScore > existingScore) {
      map.set(key, item);
    }
  }

  return [...map.values()];
}

function buildOutput(items: GlobalSearchItem[]): string {
  const serializedItems = JSON.stringify(items);
  const serializedLiteral = JSON.stringify(serializedItems);

  return `/* =========================================================
   global-search-overlay-index.generated.ts
   恒永达官网｜顶部全站搜索面板索引

   自动生成，请勿手动修改。
   使用 JSON.parse 避免 TypeScript 推导超大联合类型。
========================================================= */

import type { GlobalSearchItem } from "./global-search-overlay.types";

const globalSearchOverlayIndexJson = ${serializedLiteral};

export const globalSearchOverlayIndex =
  JSON.parse(globalSearchOverlayIndexJson) as GlobalSearchItem[];
`;
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

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, buildOutput(items), "utf8");

  const counts = items.reduce<Record<string, number>>(
    (result, item) => {
      result[item.module] = (result[item.module] ?? 0) + 1;
      return result;
    },
    {}
  );

  console.log("============================================");
  console.log("顶部全站搜索面板索引生成完成");

  for (const [module, count] of Object.entries(counts)) {
    console.log(`${module}: ${count}`);
  }

  console.log(`总计：${items.length}`);
  console.log(`输出：${OUTPUT_PATH}`);
  console.log("============================================");
}

main();
'@

Set-Content -LiteralPath $generatorPath -Value $generatorContent -Encoding utf8

Write-Host ""
Write-Host "正在生成完整全站搜索索引……" -ForegroundColor Cyan

npx tsx scripts/search/generate-global-search-overlay-index.ts

if ($LASTEXITCODE -ne 0) {
    throw "完整全站搜索索引生成失败。"
}

# ============================================================
# 3. 顶部搜索面板组件
# ============================================================

$panelContent = @'
"use client";

import {
  Fragment,
  type ReactNode,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  GlobalSearchItem,
  GlobalSearchModule,
} from "@/data/search/global-search-overlay.types";

type GlobalSearchPanelProps = {
  isOpen: boolean;
  query: string;
  locale: string;
  onQueryChange: (value: string) => void;
  onClose: () => void;
};

type ScoredItem = {
  item: GlobalSearchItem;
  score: number;
};

const DEFAULT_VISIBLE_COUNT = 6;
const LOAD_MORE_COUNT = 6;

const MODULE_ORDER: GlobalSearchModule[] = [
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
  GlobalSearchModule,
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

function scoreItem(
  item: GlobalSearchItem,
  query: string
): number {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) return 0;

  const title = normalize(item.title);
  const model = normalize(item.model ?? "");
  const productCode = normalize(item.productCode ?? "");
  const subtitle = normalize(item.subtitle ?? "");
  const description = normalize(item.description ?? "");
  const keywords = (item.keywords ?? []).map(normalize);

  let score = 0;

  if (title === normalizedQuery) score += 1200;
  if (model === normalizedQuery) score += 1150;
  if (productCode === normalizedQuery) score += 1100;

  if (
    item.module === "compatible-models" &&
    title === normalizedQuery
  ) {
    score += 600;
  }

  if (title.startsWith(normalizedQuery)) score += 600;
  if (model.startsWith(normalizedQuery)) score += 560;
  if (productCode.startsWith(normalizedQuery)) score += 520;

  if (title.includes(normalizedQuery)) score += 320;
  if (model.includes(normalizedQuery)) score += 300;
  if (productCode.includes(normalizedQuery)) score += 280;
  if (subtitle.includes(normalizedQuery)) score += 180;
  if (description.includes(normalizedQuery)) score += 120;

  for (const keyword of keywords) {
    if (keyword === normalizedQuery) {
      score += 180;
    } else if (keyword.startsWith(normalizedQuery)) {
      score += 100;
    } else if (keyword.includes(normalizedQuery)) {
      score += 45;
    }
  }

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

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
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

  const firstSegment = href.split("/").filter(Boolean)[0];

  if (["en", "es", "fr", "ko", "ru"].includes(firstSegment ?? "")) {
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
  const deferredQuery = useDeferredValue(query);
  const [items, setItems] = useState<GlobalSearchItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [headerBottom, setHeaderBottom] = useState(84);
  const [visibleCounts, setVisibleCounts] = useState<
    Partial<Record<GlobalSearchModule, number>>
  >({});

  useEffect(() => {
    if (!isOpen || items || isLoading) return;

    let cancelled = false;

    setIsLoading(true);

    import("@/data/search/global-search-overlay-index.generated")
      .then((module) => {
        if (!cancelled) {
          setItems(module.globalSearchOverlayIndex);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, isLoading, items]);

  useEffect(() => {
    if (!isOpen) return;

    function updateHeaderBottom() {
      const header = document.querySelector(".site-header");
      const nextBottom =
        header?.getBoundingClientRect().bottom ?? 84;

      setHeaderBottom(Math.max(0, nextBottom));
    }

    updateHeaderBottom();

    window.addEventListener("resize", updateHeaderBottom);
    document.body.classList.add("global-search-lock");

    return () => {
      window.removeEventListener("resize", updateHeaderBottom);
      document.body.classList.remove("global-search-lock");
    };
  }, [isOpen]);

  useEffect(() => {
    setVisibleCounts({});
  }, [deferredQuery]);

  const groupedResults = useMemo(() => {
    const grouped = new Map<GlobalSearchModule, ScoredItem[]>();

    for (const module of MODULE_ORDER) {
      grouped.set(module, []);
    }

    const keyword = deferredQuery.trim();

    if (!keyword || !items) return grouped;

    for (const item of items) {
      const score = scoreItem(item, keyword);

      if (score <= 0) continue;

      grouped.get(item.module)?.push({
        item,
        score,
      });
    }

    for (const module of MODULE_ORDER) {
      const moduleItems = grouped.get(module) ?? [];

      moduleItems.sort((a, b) => {
        return (
          b.score - a.score ||
          a.item.title.localeCompare(b.item.title, "zh-CN")
        );
      });

      grouped.set(module, moduleItems);
    }

    return grouped;
  }, [deferredQuery, items]);

  const visibleModules = MODULE_ORDER.filter((module) => {
    return (groupedResults.get(module)?.length ?? 0) > 0;
  });

  const totalCount = visibleModules.reduce((sum, module) => {
    return sum + (groupedResults.get(module)?.length ?? 0);
  }, 0);

  if (!isOpen) return null;

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
          maxHeight: `calc(100vh - ${headerBottom}px)`,
        }}
      >
        <div className="global-search-panel-inner">
          <header className="global-search-panel-head">
            <div>
              <span>全站搜索</span>
              <strong>
                {deferredQuery.trim()
                  ? `“${deferredQuery.trim()}”`
                  : "搜索产品与技术资料"}
              </strong>
            </div>

            <div className="global-search-panel-head-actions">
              {deferredQuery.trim() ? (
                <span>共 {totalCount} 条结果</span>
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

          {!deferredQuery.trim() ? (
            <div className="global-search-start">
              <p>
                输入产品名称、型号、兼容型号、规格书、教程或技术关键词。
              </p>

              <div className="global-search-suggestions">
                {INITIAL_SUGGESTIONS.map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => onQueryChange(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : isLoading || !items ? (
            <div className="global-search-status">
              正在加载全站搜索数据……
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
                  moduleResults.slice(0, visibleCount);

                const allVisible =
                  visibleCount >= moduleResults.length;

                return (
                  <section
                    className="global-search-module"
                    key={module}
                  >
                    <div className="global-search-module-head">
                      <h2>{MODULE_TEXT[module].title}</h2>
                      <span>{moduleResults.length} 条</span>
                    </div>

                    <div className="global-search-result-grid">
                      {visibleResults.map(({ item }) => (
                        <a
                          className="global-search-result"
                          href={getLocalizedHref(
                            item.href,
                            locale
                          )}
                          key={item.id}
                          onClick={onClose}
                        >
                          {item.image ? (
                            <span className="global-search-result-image">
                              <img
                                src={item.image}
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
                                item.title,
                                deferredQuery
                              )}
                            </strong>

                            {item.subtitle ? (
                              <span className="global-search-result-subtitle">
                                {highlightText(
                                  item.subtitle,
                                  deferredQuery
                                )}
                              </span>
                            ) : null}

                            {item.description ? (
                              <span className="global-search-result-description">
                                {item.description}
                              </span>
                            ) : null}

                            <span className="global-search-result-action">
                              {item.actionLabel ??
                                MODULE_TEXT[module].action}
                              <span aria-hidden="true">→</span>
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>

                    {moduleResults.length >
                    DEFAULT_VISIBLE_COUNT ? (
                      <button
                        className="global-search-more"
                        type="button"
                        onClick={() => {
                          setVisibleCounts((current) => ({
                            ...current,
                            [module]: allVisible
                              ? DEFAULT_VISIBLE_COUNT
                              : Math.min(
                                  moduleResults.length,
                                  visibleCount +
                                    LOAD_MORE_COUNT
                                ),
                          }));
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

Set-Content -LiteralPath $panelPath -Value $panelContent -Encoding utf8

# ============================================================
# 4. 接入 SiteHeader
# ============================================================

$header = Get-Content -LiteralPath $headerPath -Raw -Encoding utf8

if ($header -notmatch 'GlobalSearchPanel') {
    $importAnchor = 'import {' + "`r`n" + '  getLocalizedHref,'

    if (-not $header.Contains($importAnchor)) {
        $importAnchor = 'import {' + "`n" + '  getLocalizedHref,'
    }

    if (-not $header.Contains($importAnchor)) {
        throw "未找到 SiteHeader 导航数据 import 插入位置。"
    }

    $header = $header.Replace(
        $importAnchor,
        'import GlobalSearchPanel from "@/components/search/GlobalSearchPanel";' +
        "`r`n`r`n" +
        $importAnchor
    )
}

if ($header -notmatch 'const \[searchQuery, setSearchQuery\]') {
    $stateAnchor = 'const [isSearchOpen, setIsSearchOpen] = useState(false);'

    if (-not $header.Contains($stateAnchor)) {
        throw "未找到 isSearchOpen 状态。"
    }

    $header = $header.Replace(
        $stateAnchor,
        $stateAnchor +
        "`r`n" +
        '  const [searchQuery, setSearchQuery] = useState("");'
    )
}

$formPattern = '(?s)<form\s+ref=\{searchModeRef\}\s+className="site-search-mode-form"\s+action=\{.*?\}\s+method="get"\s*>'

$formReplacement = @'
<form
              ref={searchModeRef}
              className="site-search-mode-form"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
'@

$updatedHeader = [regex]::Replace(
    $header,
    $formPattern,
    $formReplacement,
    1
)

if ($updatedHeader -eq $header -and $header -notmatch 'onSubmit=\{\(event\) =>') {
    throw "未找到顶部搜索 form，未执行替换。"
}

$header = $updatedHeader

if ($header -notmatch 'value=\{searchQuery\}') {
    $inputAnchor = '                  aria-label={headerText.searchAriaLabel}' + "`r`n"

    if (-not $header.Contains($inputAnchor)) {
        $inputAnchor = '                  aria-label={headerText.searchAriaLabel}' + "`n"
    }

    if (-not $header.Contains($inputAnchor)) {
        throw "未找到顶部搜索输入框 aria-label。"
    }

    $inputReplacement =
        $inputAnchor +
        '                  value={searchQuery}' + "`r`n" +
        '                  onChange={(event) => {' + "`r`n" +
        '                    setSearchQuery(event.target.value);' + "`r`n" +
        '                  }}' + "`r`n"

    $header = $header.Replace(
        $inputAnchor,
        $inputReplacement
    )
}

if ($header -notmatch '<GlobalSearchPanel') {
    $panelAnchor = '              </label>' + "`r`n" + '            </form>'

    if (-not $header.Contains($panelAnchor)) {
        $panelAnchor = '              </label>' + "`n" + '            </form>'
    }

    if (-not $header.Contains($panelAnchor)) {
        throw "未找到搜索表单结束位置。"
    }

    $panelReplacement = @'
              </label>

              <GlobalSearchPanel
                isOpen={isSearchOpen}
                query={searchQuery}
                locale={currentLocale}
                onQueryChange={setSearchQuery}
                onClose={() => {
                  setIsSearchOpen(false);
                  searchInputRef.current?.blur();
                }}
              />
            </form>
'@

    $header = $header.Replace(
        $panelAnchor,
        $panelReplacement
    )
}

Set-Content -LiteralPath $headerPath -Value $header -Encoding utf8

# ============================================================
# 5. 顶部搜索面板样式
# ============================================================

$css = Get-Content -LiteralPath $globalsPath -Raw -Encoding utf8

$startMarker = "/* GLOBAL_SEARCH_OVERLAY_START */"
$endMarker = "/* GLOBAL_SEARCH_OVERLAY_END */"

$startIndex = $css.IndexOf($startMarker)
$endIndex = $css.IndexOf($endMarker)

if ($startIndex -ge 0 -and $endIndex -gt $startIndex) {
    $endIndex += $endMarker.Length
    $css = $css.Remove(
        $startIndex,
        $endIndex - $startIndex
    ).TrimEnd()
}

$overlayCss = @'

/* GLOBAL_SEARCH_OVERLAY_START */

body.global-search-lock {
  overflow: hidden;
}

.global-search-backdrop {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1190;
  border: 0;
  background: rgba(7, 20, 43, 0.34);
  cursor: default;
}

.global-search-panel {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1200;
  overflow-y: auto;
  overscroll-behavior: contain;
  border-top: 1px solid rgba(23, 51, 104, 0.1);
  background: #ffffff;
  color: #173368;
  box-shadow: 0 20px 48px rgba(11, 29, 61, 0.18);
}

.global-search-panel-inner {
  width: min(1380px, calc(100% - 56px));
  margin: 0 auto;
  padding: 24px 0 34px;
}

.global-search-panel-head {
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid #e3e9f0;
}

.global-search-panel-head > div:first-child {
  min-width: 0;
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.global-search-panel-head span {
  color: rgba(23, 51, 104, 0.58);
  font-size: 13px;
}

.global-search-panel-head strong {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #173368;
  font-size: 22px;
  line-height: 1.3;
  white-space: nowrap;
}

.global-search-panel-head-actions {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 18px;
}

.global-search-close {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(23, 51, 104, 0.16);
  border-radius: 6px;
  background: #ffffff;
  color: #173368;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
}

.global-search-close:hover {
  border-color: #09e9b4;
  background: #09e9b4;
}

.global-search-start,
.global-search-status {
  padding: 42px 0 26px;
  text-align: center;
}

.global-search-start p,
.global-search-status p {
  margin: 0;
  color: rgba(23, 51, 104, 0.64);
  line-height: 1.7;
}

.global-search-status strong {
  display: block;
  margin-bottom: 8px;
  font-size: 22px;
}

.global-search-suggestions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 9px;
  margin-top: 18px;
}

.global-search-suggestions button {
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid rgba(23, 51, 104, 0.15);
  border-radius: 5px;
  background: #f5f7fa;
  color: #173368;
  cursor: pointer;
}

.global-search-suggestions button:hover {
  border-color: #09e9b4;
  background: #ffffff;
}

.global-search-modules {
  padding-top: 4px;
}

.global-search-module {
  padding: 24px 0 4px;
}

.global-search-module + .global-search-module {
  margin-top: 20px;
  border-top: 1px solid #e3e9f0;
}

.global-search-module-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 14px;
}

.global-search-module-head h2 {
  margin: 0;
  color: #173368;
  font-size: 20px;
  line-height: 1.35;
}

.global-search-module-head span {
  color: rgba(23, 51, 104, 0.56);
  font-size: 13px;
}

.global-search-result-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.global-search-result {
  min-width: 0;
  min-height: 132px;
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid #e1e7ef;
  background: #ffffff;
  color: #173368;
  text-decoration: none;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.global-search-result:hover {
  border-color: #09e9b4;
  transform: translateY(-1px);
}

.global-search-result-image {
  min-height: 132px;
  padding: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #f3f6fa;
}

.global-search-result-image img {
  width: 100%;
  height: 100%;
  max-height: 112px;
  display: block;
  object-fit: contain;
}

.global-search-result-image-empty {
  color: rgba(23, 51, 104, 0.28);
  font-size: 24px;
  font-weight: 900;
}

.global-search-result-copy {
  min-width: 0;
  padding: 14px 15px 13px;
  display: flex;
  flex-direction: column;
}

.global-search-result-copy > strong {
  overflow: hidden;
  color: #173368;
  font-size: 16px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.global-search-result-copy mark {
  padding: 0;
  background: rgba(9, 233, 180, 0.3);
  color: inherit;
}

.global-search-result-subtitle {
  margin-top: 5px;
  overflow: hidden;
  color: rgba(23, 51, 104, 0.78);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.global-search-result-description {
  margin-top: 5px;
  display: -webkit-box;
  overflow: hidden;
  color: rgba(23, 51, 104, 0.55);
  font-size: 12px;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.global-search-result-action {
  margin-top: auto;
  padding-top: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #173368;
  font-size: 12px;
  font-weight: 800;
}

.global-search-result:hover .global-search-result-action {
  color: #00a982;
}

.global-search-more {
  min-width: 170px;
  height: 40px;
  margin: 16px auto 0;
  padding: 0 18px;
  display: block;
  border: 1px solid rgba(23, 51, 104, 0.16);
  border-radius: 6px;
  background: #ffffff;
  color: #173368;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
}

.global-search-more:hover {
  border-color: #09e9b4;
  background: #f7fffd;
}

@media (max-width: 1100px) {
  .global-search-result-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .global-search-panel-inner {
    width: min(1380px, calc(100% - 28px));
    padding-top: 16px;
  }

  .global-search-panel-head {
    align-items: flex-start;
  }

  .global-search-panel-head > div:first-child {
    align-items: flex-start;
    flex-direction: column;
    gap: 3px;
  }

  .global-search-panel-head strong {
    max-width: calc(100vw - 140px);
    font-size: 18px;
  }

  .global-search-panel-head-actions > span {
    display: none;
  }

  .global-search-result-grid {
    grid-template-columns: 1fr;
  }

  .global-search-result {
    grid-template-columns: 68px minmax(0, 1fr);
  }

  .global-search-result-image {
    min-height: 124px;
  }
}
/* GLOBAL_SEARCH_OVERLAY_END */
'@

$css = $css.TrimEnd() + "`r`n" + $overlayCss + "`r`n"
Set-Content -LiteralPath $globalsPath -Value $css -Encoding utf8

Write-Host ""
Write-Host "顶部全站搜索面板已接入。" -ForegroundColor Green
Write-Host "已覆盖：" -ForegroundColor Cyan
Write-Host "1. 产品中心"
Write-Host "2. 兼容型号查询"
Write-Host "3. 规格书下载"
Write-Host "4. 安装教程"
Write-Host "5. 技术文章"
Write-Host "6. 材料兼容性"
Write-Host "7. 应用领域"
Write-Host "8. 新闻资讯"
Write-Host "9. 网站页面"
Write-Host ""

Write-Host "开始构建检查……" -ForegroundColor Cyan

npm run build

if ($LASTEXITCODE -ne 0) {
    throw "构建未通过，请把新的报错发给我。"
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "构建通过。" -ForegroundColor Green
Write-Host "打开任意页面，点击顶部搜索图标即可测试。" -ForegroundColor Yellow
Write-Host "建议测试：" -ForegroundColor Yellow
Write-Host "Q2002"
Write-Host "PMC1702"
Write-Host "柱塞泵"
Write-Host "PEEK"
Write-Host "接头安装"
Write-Host "ADLM"
Write-Host "============================================" -ForegroundColor Cyan
