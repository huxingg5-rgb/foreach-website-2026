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
  "search-data",
  "global-search-index.v2.json"
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
    const searchModule = item.module as SearchModule;

    if (
      ![
        "products",
        "compatible-models",
        "datasheets",
      ].includes(searchModule)
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
      m: searchModule,
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
      h: `/resources/installation-guide?guide=${encodeURIComponent(id)}`,
      x: buildSearchText([
        title,
        subtitle,
        description,
        guide.tags,
        guide.keywords,
              "使用教程",
        "安装教程",
        "操作教程",
        "视频教程",
      ]),
      a: "查看使用教程",
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

