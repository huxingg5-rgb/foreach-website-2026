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
  const indexLocale = SEARCH_INDEX_LOCALES.has(locale)
    ? locale
    : "zh-CN";

  return `/search-data/global-search-index.${indexLocale}.v3.json`;
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

  const searchItemsPromise = fetch(searchIndexUrl, {
    /*
      搜索索引使用固定文件名，内容会随产品与资讯更新。
      必须向服务器重新验证，避免浏览器长期复用旧链接、
      旧图片字段和缺失的新内容。
    */
    cache: "no-cache",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`全站搜索索引加载失败：${response.status}`);
      }

      return response.json() as Promise<CompactSearchItem[]>;
    })
    .then((items) => {
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
