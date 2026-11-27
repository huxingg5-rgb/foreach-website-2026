import { getGermanProductSearchTerms } from "@/data/search/german-product-search-terms";
import {
  getTubingAssemblySearchItems,
  isTubingAssemblySearchPath,
} from "@/data/products/tubing-assemblies/search";

export type SearchModule =
  | "products"
  | "compatible-models"
  | "datasheets"
  | "installation-guides"
  | "technical-articles"
  | "material-compatibility"
  | "applications"
  | "news"
  | "pages";

export type CompactSearchItem = {
  m: SearchModule;
  t: string;
  s?: string;
  d?: string;
  h: string;
  i?: string;
  x: string;
  k?: string;
  a?: string;
  g?: true;
};

const SEARCH_INDEX_LOCALES = new Set([
  "en",
  "es",
  "fr",
  "ko",
  "ru",
]);

const cachedSearchItems = new Map<
  string,
  CompactSearchItem[]
>();

const searchItemsPromises = new Map<
  string,
  Promise<CompactSearchItem[]>
>();

function getSearchIndexUrl(locale: string): string {
  if (locale === "de") return "/search-data/global-search-resource-overlay.de.v3.json";
  const indexLocale = SEARCH_INDEX_LOCALES.has(locale)
    ? locale
    : "zh-CN";

  return `/search-data/global-search-index.${indexLocale}.v3.json`;
}

function fetchSearchItems(url: string): Promise<CompactSearchItem[]> {
  return fetch(url, { cache: "no-cache" }).then(response => {
    if (!response.ok) throw new Error(`全站搜索索引加载失败：${response.status}`);
    return response.json() as Promise<CompactSearchItem[]>;
  });
}

function germanOverlayKey(item: CompactSearchItem): string {
  const [pathname, query = ""] = item.h.split("?", 2);
  const path = pathname.replace(/^\/(?:en|de)(?=\/|$)/, "").replace(/\/+$/, "");
  const params = new URLSearchParams(query);
  params.sort();
  return `${item.m}:${path}?${params}`;
}

function mergeGermanResourceSearch(english: CompactSearchItem[], german: CompactSearchItem[]): CompactSearchItem[] {
  const source = new Map(english.map(item => [germanOverlayKey(item), item]));
  const translatedKeys = new Set<string>();
  const replacements = german.map(item => {
    const key = germanOverlayKey(item);
    const original = source.get(key);
    translatedKeys.add(key);
    return original ? { ...item, x: item.x + " " + original.x } : item;
  });
  const remaining = english
    .filter(item => !translatedKeys.has(germanOverlayKey(item)))
    .map(item => {
      if (item.m !== "products") return item;

      const terms = getGermanProductSearchTerms(item.h);
      return terms.length ? { ...item, k: [item.k, ...terms].filter(Boolean).join(" ") } : item;
    });
  return [...remaining, ...replacements];
}

export function getCachedGlobalSearchIndex(
  locale = "zh-CN",
): CompactSearchItem[] | null {
  return cachedSearchItems.get(getSearchIndexUrl(locale)) ?? null;
}

export function preloadGlobalSearchIndex(
  locale = "zh-CN",
): Promise<CompactSearchItem[]> {
  const searchIndexUrl = getSearchIndexUrl(locale);
  const cachedItems = cachedSearchItems.get(searchIndexUrl);

  if (cachedItems) {
    return Promise.resolve(cachedItems);
  }

  const existingPromise = searchItemsPromises.get(searchIndexUrl);

  if (existingPromise) {
    return existingPromise;
  }

  const searchItemsPromise = (locale === "de"
    ? Promise.all([preloadGlobalSearchIndex("en"), fetchSearchItems(searchIndexUrl)])
      .then(([english, german]) => mergeGermanResourceSearch(english, german))
    : fetchSearchItems(searchIndexUrl))
    .then((items) => {
      const tubingItems = locale === "de" ? [] : getTubingAssemblySearchItems(locale);
      if (tubingItems.length) {
        items = [
          ...items.filter(item => !isTubingAssemblySearchPath(item.h)),
          ...tubingItems.map((item): CompactSearchItem => ({
            m: "products", t: item.title, d: item.description, h: item.href, i: item.image,
            x: [item.title, item.description, ...item.keywords].join(" "), a: item.actionLabel,
          })),
        ];
      }
      cachedSearchItems.set(searchIndexUrl, items);
      return items;
    })
    .catch((error) => {
      searchItemsPromises.delete(searchIndexUrl);
      throw error;
    });

  searchItemsPromises.set(searchIndexUrl, searchItemsPromise);

  return searchItemsPromise;
}
