import fs from "node:fs";
import path from "node:path";

import { siteSearchIndex } from "../../data/search/site-search-index.generated";
import {
  applyDiaphragmPumpReferenceSearchItem,
  getDiaphragmPumpReferenceModel,
} from "../../data/products/detail/diaphragm-pump-reference-models";
import { isDiaphragmPumpPublicPath } from "../../data/products/detail/diaphragm-pump-routes";
import { datasheetZhItems } from "../../data/resources/datasheets.zh";
import { datasheetEnItems } from "../../data/resources/datasheets.en";
import { installationGuideZhData } from "../../data/resources/installation-guide/installation-guide.zh";
import { getInstallationGuideIntlData } from "../../data/resources/installation-guide/installation-guide.intl";
import { getVisibleNavigationItems } from "../../data/navigation";
import { getInternationalUiText } from "../../lib/international-ui";
import type { LocaleCode } from "../../lib/i18n";
import { getTechnicalArticlesPageData } from "../../services/resources/technical-articles/getTechnicalArticlesPageData";
import { getNewsPageData } from "../../services/resources/news/getNewsPageData";
import { getMaterialCompatibilityPageData } from "../../services/resources/material-compatibility/getMaterialCompatibilityPageData";
import { getAnalyticalInstrumentsApplicationPageData } from "../../services/applications/analytical-instruments/getAnalyticalInstrumentsApplicationPageData";
import { getEnvironmentalMonitoringApplicationPageData } from "../../services/applications/environmental-monitoring/getEnvironmentalMonitoringApplicationPageData";
import { getIvdApplicationPageData } from "../../services/applications/ivd/getIvdApplicationPageData";
import { getLabAutomationApplicationPageData } from "../../services/applications/lab-automation/getLabAutomationApplicationPageData";
import { getLifeScienceApplicationPageData } from "../../services/applications/life-science/getLifeScienceApplicationPageData";
import { getSyntheticBiologyApplicationPageData } from "../../services/applications/synthetic-biology/getSyntheticBiologyApplicationPageData";

type SearchLocale = "zh-CN" | "en" | "es" | "fr" | "ko" | "ru";

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
  k?: string;
  a?: string;
};

type UnknownObject = Record<string, unknown>;

const ROOT = process.cwd();
const OUTPUT_DIRECTORY = path.join(ROOT, "public", "search-data");
const LEGACY_OUTPUT_PATH = path.join(
  OUTPUT_DIRECTORY,
  "global-search-index.v2.json"
);
const SEARCH_LOCALES: SearchLocale[] = [
  "zh-CN",
  "en",
  "es",
  "fr",
  "ko",
  "ru",
];
const CHECK_MODE = process.argv.includes("--check");
const LOCALES_ARGUMENT = process.argv.find((argument) =>
  argument.startsWith("--locales="),
);
const REQUESTED_SEARCH_LOCALES = LOCALES_ARGUMENT
  ? LOCALES_ARGUMENT
      .slice("--locales=".length)
      .split(",")
      .map((locale) => locale.trim())
      .filter((locale): locale is SearchLocale =>
        SEARCH_LOCALES.includes(locale as SearchLocale),
      )
  : SEARCH_LOCALES;

const MODULE_COPY: Record<
  SearchModule,
  { title: string; description: string; action: string }
> = {
  products: {
    title: "Products",
    description: "View product details and selection information.",
    action: "View Product",
  },
  "compatible-models": {
    title: "Compatible Model Search",
    description: "View the corresponding FOREACH compatible product.",
    action: "View Compatible Product",
  },
  datasheets: {
    title: "Datasheets",
    description: "View or download the available product datasheet.",
    action: "View Datasheet",
  },
  "installation-guides": {
    title: "Installation Guides",
    description: "View product usage, operation, installation, and commissioning guidance.",
    action: "View Guide",
  },
  "technical-articles": {
    title: "Technical Articles",
    description: "Read the full technical article.",
    action: "Read Article",
  },
  "material-compatibility": {
    title: "Material Compatibility",
    description: "Review material compatibility information.",
    action: "View Material Data",
  },
  applications: {
    title: "Applications",
    description: "Explore the related fluid handling application.",
    action: "View Application",
  },
  news: {
    title: "News",
    description: "Read the full FOREACH news update.",
    action: "View News",
  },
  pages: {
    title: "Pages",
    description: "Open this FOREACH website page.",
    action: "Open Page",
  },
};

const APPLICATION_LOADERS: Array<{
  slug: string;
  load: (locale: string) => unknown;
}> = [
  {
    slug: "analytical-instruments",
    load: getAnalyticalInstrumentsApplicationPageData,
  },
  {
    slug: "environmental-monitoring",
    load: getEnvironmentalMonitoringApplicationPageData,
  },
  { slug: "ivd", load: getIvdApplicationPageData },
  {
    slug: "lab-automation",
    load: getLabAutomationApplicationPageData,
  },
  {
    slug: "life-science",
    load: getLifeScienceApplicationPageData,
  },
  {
    slug: "synthetic-biology",
    load: getSyntheticBiologyApplicationPageData,
  },
];

const APPLICATION_FALLBACK_TITLES: Record<
  Exclude<SearchLocale, "zh-CN">,
  Record<string, string>
> = {
  en: {
    "analytical-instruments": "Analytical Instruments",
    "environmental-monitoring": "Environmental Monitoring",
    ivd: "In Vitro Diagnostics (IVD)",
    "lab-automation": "Laboratory Automation",
    "life-science": "Life Science",
    "synthetic-biology": "Synthetic Biology",
  },
  es: {
    "analytical-instruments": "Instrumentos analíticos",
    "environmental-monitoring": "Monitoreo ambiental",
    ivd: "Diagnóstico in vitro (IVD)",
    "lab-automation": "Automatización de laboratorio",
    "life-science": "Ciencias de la vida",
    "synthetic-biology": "Biología sintética",
  },
  fr: {
    "analytical-instruments": "Instruments d’analyse",
    "environmental-monitoring": "Surveillance environnementale",
    ivd: "Diagnostic in vitro (IVD)",
    "lab-automation": "Automatisation de laboratoire",
    "life-science": "Sciences de la vie",
    "synthetic-biology": "Biologie synthétique",
  },
  ko: {
    "analytical-instruments": "분석 기기",
    "environmental-monitoring": "환경 모니터링",
    ivd: "체외진단(IVD)",
    "lab-automation": "실험실 자동화",
    "life-science": "생명 과학",
    "synthetic-biology": "합성 생물학",
  },
  ru: {
    "analytical-instruments": "Аналитические приборы",
    "environmental-monitoring": "Экологический мониторинг",
    ivd: "Диагностика in vitro (IVD)",
    "lab-automation": "Лабораторная автоматизация",
    "life-science": "Науки о жизни",
    "synthetic-biology": "Синтетическая биология",
  },
};

function text(value: unknown): string {
  if (
    value === null ||
    value === undefined ||
    (typeof value !== "string" &&
      typeof value !== "number" &&
      typeof value !== "boolean")
  ) {
    return "";
  }

  return String(value).trim();
}

function normalize(value: string): string {
  return value
    .toUpperCase()
    .replace(/[‐‑‒–—―﹘﹣－]/g, "-")
    .replace(/[\s\-_/·|.]+/g, "");
}

function shorten(value: unknown, maxLength = 150): string {
  const normalized = text(value).replace(/\s+/g, " ");
  return normalized.length <= maxLength
    ? normalized
    : `${normalized.slice(0, maxLength - 1)}…`;
}

function cleanImage(value: unknown): string {
  const image = text(value)
    .replace(/\\/g, "/")
    .replace(/^\/?public\//, "/");

  if (!image.startsWith("/")) return "";
  if (
    image.includes("/images/logo/") ||
    image.endsWith("foreach-logo-color.svg")
  ) {
    return "";
  }

  return image;
}

function compactStrings(values: unknown[]): string[] {
  const result = new Map<string, string>();

  function visit(value: unknown) {
    if (Array.isArray(value)) {
      for (const nestedValue of value) visit(nestedValue);
      return;
    }

    const stringValue = text(value);
    const key = normalize(stringValue);
    if (key && !result.has(key)) result.set(key, stringValue);
  }

  for (const value of values) visit(value);
  return [...result.values()];
}

function buildSearchText(values: unknown[]): string {
  return compactStrings(values)
    .map(normalize)
    .filter(Boolean)
    .join("|");
}

function containsHan(value: string): boolean {
  return /[\u3400-\u9fff]/.test(value);
}

function firstWithoutHan(values: unknown[]): string {
  for (const value of values) {
    const candidate = text(value);
    if (candidate && !containsHan(candidate)) return candidate;
  }

  return "";
}

function getTechnicalText(value: string): string {
  return value
    .replace(/[\u3400-\u9fff：｜]/g, "")
    .replace(/^\s*[:：|｜-]\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getPathLabel(href: string): string {
  const segment = href
    .split(/[?#]/)[0]
    .split("/")
    .filter(Boolean)
    .at(-1);

  if (!segment) return "FOREACH";

  return decodeURIComponent(segment)
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) =>
      /^[a-z]+$/.test(word)
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word.toUpperCase()
    )
    .join(" ");
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
    depth > maxDepth ||
    seen.has(value as object)
  ) {
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
      if (Array.isArray(child)) {
        for (const item of child) {
          const itemText = text(item);
          if (itemText) result.push(itemText);
        }
      } else {
        const childText = text(child);
        if (childText) result.push(childText);
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

function ui(locale: SearchLocale, value: string): string {
  return getInternationalUiText(locale as LocaleCode, value);
}

function getModuleCopy(locale: SearchLocale, module: SearchModule) {
  const copy = MODULE_COPY[module];
  return {
    title: ui(locale, copy.title),
    description: ui(locale, copy.description),
    action: ui(locale, copy.action),
  };
}

function loadProductAndCompatibleItems(
  locale: SearchLocale
): CompactSearchItem[] {
  const isChinese = locale === "zh-CN";

  return siteSearchIndex.flatMap((sourceItem) => {
    const item = applyDiaphragmPumpReferenceSearchItem(sourceItem, locale);
    const searchModule = item.module as SearchModule;
    if (
      searchModule !== "products" &&
      searchModule !== "compatible-models"
    ) {
      return [];
    }

    if (
      searchModule === "products" &&
      isDiaphragmPumpPublicPath(sourceItem.href) &&
      !getDiaphragmPumpReferenceModel(item.href)
    ) {
      return [];
    }

    const sourceTitle = text(item.title);
    const href = text(item.href);
    if (!sourceTitle || !href) return [];

    const copy = getModuleCopy(locale, searchModule);
    const technicalTitle = getTechnicalText(sourceTitle);
    const title = isChinese
      ? sourceTitle
      : firstWithoutHan([
          sourceTitle,
          technicalTitle,
          item.model,
          item.productCode,
          getPathLabel(href),
        ]);
    const sourceSubtitle = text(item.subtitle);
    const fallbackModel = firstWithoutHan([item.model]);
    const fallbackProductCode = firstWithoutHan([item.productCode]);
    const subtitle = isChinese
      ? sourceSubtitle
      : firstWithoutHan([sourceSubtitle]) ||
        (fallbackModel && fallbackModel !== title
          ? `Model: ${fallbackModel}`
          : fallbackProductCode && fallbackProductCode !== title
            ? `Product code: ${fallbackProductCode}`
            : "");
    const description = isChinese
      ? shorten(item.description, 135)
      : copy.description;
    const image = cleanImage(item.image);
    const keywords = buildSearchText([
      item.model,
      item.productCode,
      item.keywords,
      sourceTitle,
      sourceSubtitle,
      title,
      subtitle,
      href,
      copy.title,
    ]);

    return [{
      m: searchModule,
      t: title,
      ...(subtitle ? { s: subtitle } : {}),
      ...(description ? { d: description } : {}),
      h: href,
      ...(image ? { i: image } : {}),
      x: buildSearchText([title, subtitle, description, keywords, href]),
      ...(keywords ? { k: keywords } : {}),
      a: isChinese
        ? text(item.actionLabel) || copy.action
        : copy.action,
    }];
  });
}

function loadDatasheets(locale: SearchLocale): CompactSearchItem[] {
  const items = locale === "zh-CN"
    ? datasheetZhItems
    : datasheetEnItems;
  const copy = getModuleCopy(locale, "datasheets");

  return items.flatMap((item) => {
    const title = text(item.title);
    const href = text(item.downloadHref);
    if (!title || !href) return [];

    const subtitle = compactStrings([
      item.label,
      item.version
        ? locale === "zh-CN"
          ? `版本 ${item.version}`
          : `Version ${item.version}`
        : "",
      item.update
        ? locale === "zh-CN"
          ? `更新 ${item.update}`
          : `Updated ${item.update}`
        : "",
    ]).join(" · ");
    const description = shorten(item.description, 135) || copy.description;
    const image = cleanImage(item.image);
    const keywords = buildSearchText([
      item.title,
      item.label,
      item.keywords,
      item.version,
      item.update,
      item.productHref,
      href,
      copy.title,
    ]);

    return [{
      m: "datasheets" as const,
      t: title,
      ...(subtitle ? { s: subtitle } : {}),
      d: description,
      h: href,
      ...(image ? { i: image } : {}),
      x: buildSearchText([title, subtitle, description, keywords]),
      ...(keywords ? { k: keywords } : {}),
      a: copy.action,
    }];
  });
}

function loadInstallationGuides(
  locale: SearchLocale
): CompactSearchItem[] {
  const pageData = locale === "zh-CN"
    ? installationGuideZhData
    : getInstallationGuideIntlData(locale);
  const copy = getModuleCopy(locale, "installation-guides");

  return pageData.guides.flatMap((guide) => {
    const id = text(guide.id);
    const title = text(guide.title);
    if (!id || !title) return [];

    const subtitle = compactStrings([
      guide.category,
      guide.series,
    ]).join(" · ");
    const description = shorten(guide.description, 135) || copy.description;
    const keywords = buildSearchText([
      guide.tags,
      guide.keywords,
      guide.category,
      guide.series,
      copy.title,
      "usage guide",
      "installation guide",
      "使用教程",
      "安装教程",
    ]);

    return [{
      m: "installation-guides" as const,
      t: title,
      ...(subtitle ? { s: subtitle } : {}),
      d: description,
      h: `/resources/installation-guide?guide=${encodeURIComponent(id)}`,
      x: buildSearchText([title, subtitle, description, keywords]),
      ...(keywords ? { k: keywords } : {}),
      a: copy.action,
    }];
  });
}

async function loadTechnicalArticles(
  locale: SearchLocale
): Promise<CompactSearchItem[]> {
  const pageData = await getTechnicalArticlesPageData(locale);
  const copy = getModuleCopy(locale, "technical-articles");

  return pageData.articles.flatMap((article) => {
    const slug = text(article.slug || article.id);
    const title = text(article.title);
    if (!slug || !title) return [];

    const subtitle = compactStrings([
      article.category,
      article.date,
    ]).join(" · ");
    const description = shorten(article.summary, 145) || copy.description;
    const image = cleanImage(article.coverImage);
    const sectionTitles = collectValuesByKeys(
      article.content,
      new Set(["title"]),
      3
    );
    const keywords = buildSearchText([
      sectionTitles,
      article.relationKeys,
      article.category,
      slug,
      copy.title,
    ]);

    return [{
      m: "technical-articles" as const,
      t: title,
      ...(subtitle ? { s: subtitle } : {}),
      d: description,
      h: `/resources/technical-articles/${slug}`,
      ...(image ? { i: image } : {}),
      x: buildSearchText([title, subtitle, description, keywords]),
      ...(keywords ? { k: keywords } : {}),
      a: copy.action,
    }];
  });
}

function loadNews(locale: SearchLocale): CompactSearchItem[] {
  const pageData = getNewsPageData(locale);
  const copy = getModuleCopy(locale, "news");

  return pageData.articles.flatMap((article) => {
    const slug = text(article.slug || article.id);
    const title = text(article.title);
    if (!slug || !title) return [];

    const subtitle = compactStrings([
      article.category,
      article.date,
    ]).join(" · ");
    const description = shorten(article.summary, 145) || copy.description;
    const image = cleanImage(article.coverImage);
    const sectionTitles = collectValuesByKeys(
      article.content,
      new Set(["title"]),
      3
    );
    const keywords = buildSearchText([
      sectionTitles,
      article.category,
      slug,
      copy.title,
    ]);

    return [{
      m: "news" as const,
      t: title,
      ...(subtitle ? { s: subtitle } : {}),
      d: description,
      h: `/resources/news/${slug}`,
      ...(image ? { i: image } : {}),
      x: buildSearchText([title, subtitle, description, keywords]),
      ...(keywords ? { k: keywords } : {}),
      a: copy.action,
    }];
  });
}

async function loadMaterialCompatibility(
  locale: SearchLocale
): Promise<CompactSearchItem[]> {
  const data = await getMaterialCompatibilityPageData(locale);
  const source = data as unknown as UnknownObject;
  const copy = getModuleCopy(locale, "material-compatibility");
  const items: CompactSearchItem[] = [];
  const pageTitle = getNestedString(source, [
    ["banner", "title"],
    ["hero", "title"],
  ]) || copy.title;
  const pageDescription = shorten(
    getNestedString(source, [
      ["banner", "description"],
      ["hero", "description"],
    ]),
    145
  ) || copy.description;
  const materials = Array.isArray(source.materialColumns)
    ? source.materialColumns.map(text).filter(Boolean)
    : [];

  items.push({
    m: "material-compatibility",
    t: pageTitle,
    d: pageDescription,
    h: "/resources/material-compatibility",
    x: buildSearchText([
      pageTitle,
      pageDescription,
      materials,
      copy.title,
    ]),
    k: buildSearchText([materials, copy.title]),
    a: copy.action,
  });

  for (const material of materials) {
    const title = locale === "zh-CN"
      ? `${material} 材料兼容与特性`
      : `${material} ${copy.title}`;

    items.push({
      m: "material-compatibility",
      t: title,
      s: copy.title,
      d: copy.description,
      h:
        "/resources/material-compatibility" +
        `?tab=features&q=${encodeURIComponent(material)}`,
      x: buildSearchText([
        title,
        material,
        copy.title,
        copy.description,
      ]),
      k: buildSearchText([material, copy.title]),
      a: copy.action,
    });
  }

  const rows = Array.isArray(source.compatibilityRows)
    ? source.compatibilityRows
    : [];

  for (const rawRow of rows) {
    if (!rawRow || typeof rawRow !== "object" || Array.isArray(rawRow)) {
      continue;
    }

    const name = text((rawRow as UnknownObject).name);
    if (!name) continue;

    items.push({
      m: "material-compatibility",
      t: name,
      s: copy.title,
      d: copy.description,
      h:
        "/resources/material-compatibility" +
        `?tab=compatibility&q=${encodeURIComponent(name)}`,
      x: buildSearchText([name, copy.title, copy.description]),
      k: buildSearchText([name, copy.title]),
      a: copy.action,
    });
  }

  return items;
}

function loadApplications(locale: SearchLocale): CompactSearchItem[] {
  const copy = getModuleCopy(locale, "applications");

  return APPLICATION_LOADERS.flatMap(({ slug, load }) => {
    const loaded = load(locale);
    if (!loaded || typeof loaded !== "object" || Array.isArray(loaded)) {
      return [];
    }

    const data = loaded as UnknownObject;
    const hero = data.hero &&
      typeof data.hero === "object" &&
      !Array.isArray(data.hero)
      ? data.hero as UnknownObject
      : null;
    const sourceTitle = compactStrings([
      hero?.title,
      hero?.highlight,
    ]).join(" ") || slug;
    const sourceDescription = shorten(hero?.description, 145);
    const fallbackTitle = locale === "zh-CN"
      ? getPathLabel(`/applications/${slug}`)
      : APPLICATION_FALLBACK_TITLES[locale][slug] ||
        getPathLabel(`/applications/${slug}`);
    const title = locale === "zh-CN" || !containsHan(sourceTitle)
      ? sourceTitle
      : fallbackTitle;
    const description = locale === "zh-CN" ||
      !containsHan(sourceDescription)
      ? sourceDescription || copy.description
      : copy.description;
    const image = cleanImage(hero?.backgroundImage || hero?.image);
    const namedKeywords = collectValuesByKeys(
      data,
      new Set([
        "title",
        "highlight",
        "label",
        "name",
        "keywords",
        "tags",
      ]),
      5
    );
    const keywords = buildSearchText([
      slug,
      namedKeywords,
      copy.title,
    ]);

    return [{
      m: "applications" as const,
      t: title,
      d: description,
      h: `/applications/${slug}`,
      ...(image ? { i: image } : {}),
      x: buildSearchText([title, description, keywords]),
      ...(keywords ? { k: keywords } : {}),
      a: copy.action,
    }];
  });
}

function getLocalizedValue(
  value: unknown,
  locale: SearchLocale
): string {
  const directValue = text(value);
  if (directValue) return directValue;
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return "";
  }

  const record = value as UnknownObject;
  return text(
    record[locale] ??
      record[locale === "zh-CN" ? "zh" : "en"] ??
      record.en ??
      record["zh-CN"]
  );
}

function normalizePageHref(href: string): string {
  const trimmed = href.trim();
  if (
    !trimmed.startsWith("/") ||
    trimmed.startsWith("//") ||
    trimmed.startsWith("/downloads/") ||
    trimmed.includes("#") ||
    /\/(?:search)(?:\/|\?|$)/.test(trimmed)
  ) {
    return "";
  }

  const [pathname, query = ""] = trimmed.split("?");
  const normalizedPathname = pathname === "/"
    ? "/"
    : pathname.replace(/\/+$/, "");
  return query ? `${normalizedPathname}?${query}` : normalizedPathname;
}

function loadSitePages(locale: SearchLocale): CompactSearchItem[] {
  const navigation = getVisibleNavigationItems(locale);
  const copy = getModuleCopy(locale, "pages");
  const items: CompactSearchItem[] = [];
  const seen = new WeakSet<object>();

  function visit(value: unknown) {
    if (!value || typeof value !== "object") return;
    const objectValue = value as object;
    if (seen.has(objectValue)) return;
    seen.add(objectValue);

    if (Array.isArray(value)) {
      for (const child of value) visit(child);
      return;
    }

    const object = value as UnknownObject;
    const title = getLocalizedValue(
      object.label ?? object.title,
      locale
    );
    const description = shorten(
      getLocalizedValue(object.description ?? object.alt, locale),
      145
    ) || copy.description;
    const href = normalizePageHref(
      getLocalizedValue(object.href, locale)
    );
    const imageObject = object.image &&
      typeof object.image === "object" &&
      !Array.isArray(object.image)
      ? object.image as UnknownObject
      : null;
    const image = cleanImage(imageObject?.src || object.src);

    if (title && href) {
      items.push({
        m: "pages",
        t: title,
        d: description,
        h: href,
        ...(image ? { i: image } : {}),
        x: buildSearchText([title, description, href, copy.title]),
        k: buildSearchText([title, href, copy.title]),
        a: copy.action,
      });
    }

    for (const child of Object.values(object)) visit(child);
  }

  visit(navigation);
  return items;
}

function scoreItemQuality(item: CompactSearchItem): number {
  return (item.i ? 3 : 0) + (item.d ? 2 : 0) + (item.s ? 1 : 0);
}

function deduplicate(items: CompactSearchItem[]): CompactSearchItem[] {
  const map = new Map<string, CompactSearchItem>();

  for (const item of items) {
    const normalizedHref = item.h.replace(/\/+$/, "") || "/";
    const key = item.m === "pages"
      ? `${item.m}::${normalizedHref}`
      : [item.m, normalizedHref, normalize(item.t)].join("::");
    const existing = map.get(key);

    if (!existing || scoreItemQuality(item) > scoreItemQuality(existing)) {
      map.set(key, item);
    }
  }

  return [...map.values()];
}

async function buildLocaleIndex(
  locale: SearchLocale
): Promise<CompactSearchItem[]> {
  const [technicalArticles, materialCompatibility] = await Promise.all([
    loadTechnicalArticles(locale),
    loadMaterialCompatibility(locale),
  ]);

  return deduplicate([
    ...loadProductAndCompatibleItems(locale),
    ...loadDatasheets(locale),
    ...loadInstallationGuides(locale),
    ...technicalArticles,
    ...materialCompatibility,
    ...loadApplications(locale),
    ...loadNews(locale),
    ...loadSitePages(locale),
  ]);
}

function getOutputPath(locale: SearchLocale): string {
  return path.join(
    OUTPUT_DIRECTORY,
    `global-search-index.${locale}.v3.json`
  );
}

function writeOrCheckOutput(outputPath: string, output: string) {
  if (CHECK_MODE) {
    const currentOutput = fs.existsSync(outputPath)
      ? fs.readFileSync(outputPath, "utf8")
      : "";

    if (currentOutput !== output) {
      throw new Error(
        `全站搜索索引已过期：${outputPath}。` +
          "请运行 npm run search:generate。"
      );
    }
    return;
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, output, "utf8");
}

function getCounts(items: CompactSearchItem[]) {
  return items.reduce<Record<string, number>>((result, item) => {
    result[item.m] = (result[item.m] ?? 0) + 1;
    return result;
  }, {});
}

async function main() {
  const localeIndexes = await Promise.all(
    REQUESTED_SEARCH_LOCALES.map(async (locale) => ({
      locale,
      items: await buildLocaleIndex(locale),
    }))
  );

  for (const { locale, items } of localeIndexes) {
    const output = JSON.stringify(items);
    const outputPath = getOutputPath(locale);
    writeOrCheckOutput(outputPath, output);

    if (locale === "zh-CN") {
      writeOrCheckOutput(LEGACY_OUTPUT_PATH, output);
    }

    const sizeKB = (Buffer.byteLength(output) / 1024).toFixed(1);
    console.log("============================================");
    console.log(
      CHECK_MODE
        ? `全站搜索索引检查通过：${locale}`
        : `全站搜索索引已生成：${locale}`
    );
    for (const [module, count] of Object.entries(getCounts(items))) {
      console.log(`${module}: ${count}`);
    }
    console.log(`总计：${items.length}`);
    console.log(`JSON 大小：${sizeKB} KB`);
    console.log(`输出：${outputPath}`);
  }
}

void main();
