"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { siteSearchIndex } from "@/data/search/site-search-index.generated";
import {
  applyDiaphragmPumpReferenceSearchItem,
  getDiaphragmPumpReferenceByLegacySlug,
  getDiaphragmPumpReferenceModel,
} from "@/data/products/detail/diaphragm-pump-reference-models";
import { isDiaphragmPumpPublicPath } from "@/data/products/detail/diaphragm-pump-routes";
import type {
  SiteSearchItem,
  SiteSearchModule,
} from "@/data/search/site-search.types";
import { getInternationalUiText } from "@/lib/international-ui";
import type { LocaleCode } from "@/lib/i18n";
import {
  trackProductListView,
  trackProductSelect,
  trackSearchNoResults,
  trackSiteSearch,
} from "@/lib/analytics/track-event";

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

const MODULE_TEXT_EN: typeof MODULE_TEXT = {
  products: {
    title: "Products",
    description: "Product models, product codes, names, and detail pages.",
    empty: "No matching products were found.",
  },
  "compatible-models": {
    title: "Compatible Model Search",
    description: "Find the corresponding FOREACH product for an existing model.",
    empty: "No matching compatible models were found.",
  },
  datasheets: {
    title: "Datasheets",
    description: "Product datasheets, document titles, and related keywords.",
    empty: "No matching datasheets were found.",
  },
};

const ENGLISH_RESULT_DESCRIPTIONS: Record<SiteSearchModule, string> = {
  products: "View product details and selection information.",
  "compatible-models": "View the corresponding FOREACH compatible product.",
  datasheets: "View or download the available product datasheet.",
};

function containsHan(value: string): boolean {
  return /[\u3400-\u9fff]/.test(value);
}

function getPathLabel(href: string): string {
  const segment = href
    .split(/[?#]/)[0]
    .split("/")
    .filter(Boolean)
    .at(-1);

  if (!segment) {
    return "FOREACH";
  }

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

function getLocalizedResultHref(href: string, locale: string): string {
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

function getEnglishSearchItem(item: SiteSearchItem, locale: string): SiteSearchItem {
  const activeLocale = locale as LocaleCode;
  const title = !containsHan(item.title)
    ? item.title
    : item.model || item.productCode || getPathLabel(item.href);
  const subtitle = item.subtitle && !containsHan(item.subtitle)
    ? item.subtitle
    : item.model && item.model !== title
      ? `Model: ${item.model}`
      : undefined;

  return {
    ...item,
    title,
    subtitle,
    description: getInternationalUiText(
      activeLocale,
      ENGLISH_RESULT_DESCRIPTIONS[item.module],
    ),
    href: getLocalizedResultHref(item.href, locale),
    actionLabel:
      item.module === "datasheets"
        ? getInternationalUiText(activeLocale, "View Datasheet")
        : item.module === "compatible-models"
          ? getInternationalUiText(activeLocale, "View Compatible Product")
          : getInternationalUiText(activeLocale, "View Product"),
    keywords: [
      ...item.keywords,
      title,
      item.href.split(/[/?#_-]+/).join(" "),
      MODULE_TEXT_EN[item.module].title,
    ],
  };
}

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

function SearchResultItem({
  item,
  isEnglish,
  detailsLabel,
  locale,
  index,
}: {
  item: SiteSearchItem;
  isEnglish: boolean;
  detailsLabel: string;
  locale: string;
  index: number;
}) {
  const listId = `site_search:${item.module}`;

  return (
    <a
      className="site-search-result-card"
      href={item.href}
      data-analytics-resource-action={
        item.module === "datasheets" ? "view" : undefined
      }
      data-analytics-resource-id={
        item.module === "datasheets" ? item.id : undefined
      }
      data-analytics-resource-type={
        item.module === "datasheets" ? "datasheet" : undefined
      }
      data-analytics-resource-file-type={
        item.module === "datasheets" ? "pdf" : undefined
      }
      data-analytics-section="site_search_results"
      onClick={() => {
        if (item.module === "datasheets") return;

        trackProductSelect({
          productId: item.productCode || item.model || item.id,
          productName: item.title,
          category: item.module,
          listId,
          listName: "site_search_results",
          index,
          locale,
        });
      }}
    >
      {item.image ? (
        <div className="site-search-result-image">
          <img src={item.image} alt={item.title} loading="lazy" />
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
          {item.actionLabel ?? (isEnglish ? detailsLabel : "查看详情")}
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
  const lastSearchSignatureRef = useRef("");
  const lastListSignaturesRef = useRef<Record<string, string>>({});
  // 四国语言内容缺失时统一回退英文，禁止显示中文；路由仍保留当前 Locale。
  const isEnglish = locale !== "zh-CN" && locale !== "zh";
  const activeLocale = locale as LocaleCode;
  const t = (text: string) => getInternationalUiText(activeLocale, text);
  const moduleText = isEnglish
    ? Object.fromEntries(Object.entries(MODULE_TEXT_EN).map(([key, value]) => [key, { title: t(value.title), description: t(value.description), empty: t(value.empty) }])) as typeof MODULE_TEXT_EN
    : MODULE_TEXT;

  const groupedResults = useMemo(() => {
    const result: Record<SiteSearchModule, SiteSearchItem[]> = {
      products: [],
      "compatible-models": [],
      datasheets: [],
    };

    if (!queryFromUrl) return result;

    for (const sourceItem of siteSearchIndex) {
      const scopedSourceItem = applyDiaphragmPumpReferenceSearchItem(
        sourceItem,
        locale,
      );
      const isDiaphragmProductItem =
        sourceItem.module === "products" &&
        isDiaphragmPumpPublicPath(sourceItem.href);

      if (
        isDiaphragmProductItem &&
        !getDiaphragmPumpReferenceModel(scopedSourceItem.href)
      ) {
        continue;
      }

      const item = isEnglish
        ? getEnglishSearchItem(scopedSourceItem, locale)
        : scopedSourceItem;
      const score = scoreItem(item, queryFromUrl);
      if (score <= 0) continue;

      const isScopedDiaphragmReference = Boolean(
        getDiaphragmPumpReferenceByLegacySlug(sourceItem.href),
      );

      if (
        isScopedDiaphragmReference &&
        result[item.module].some(
          (existing) =>
            existing.href === item.href && existing.title === item.title,
        )
      ) {
        continue;
      }

      result[item.module].push({
        ...item,
        __score: score,
      } as SiteSearchItem & { __score: number });
    }

    for (const moduleId of MODULE_ORDER) {
      result[moduleId] = result[moduleId]
        .sort((a, b) => {
          const scoreA = (a as SiteSearchItem & { __score: number }).__score;
          const scoreB = (b as SiteSearchItem & { __score: number }).__score;

          return scoreB - scoreA || a.title.localeCompare(b.title, isEnglish ? "en" : "zh-CN");
        })
        .slice(0, 24);
    }

    return result;
  }, [isEnglish, locale, queryFromUrl]);

  const totalResults = MODULE_ORDER.reduce((sum, module) => {
    return sum + groupedResults[module].length;
  }, 0);

  useEffect(() => {
    if (!queryFromUrl) return;

    const searchSignature = `${queryFromUrl}|${totalResults}`;
    if (lastSearchSignatureRef.current !== searchSignature) {
      lastSearchSignatureRef.current = searchSignature;
      trackSiteSearch({
        searchTerm: queryFromUrl,
        searchLocation: "site_search",
        locale,
        resultCount: totalResults,
      });

      if (totalResults === 0) {
        trackSearchNoResults({
          searchTerm: queryFromUrl,
          searchLocation: "site_search",
          locale,
        });
      }
    }

    for (const resultModule of MODULE_ORDER) {
      const items = groupedResults[resultModule];
      if (items.length === 0) continue;

      const signature = `${queryFromUrl}|${items.map((item) => item.id).join("|")}`;
      if (lastListSignaturesRef.current[resultModule] === signature) continue;
      lastListSignaturesRef.current[resultModule] = signature;

      const listId = `site_search:${resultModule}`;
      trackProductListView({
        listId,
        listName: "site_search_results",
        locale,
        products: items.map((item, index) => ({
          productId: item.productCode || item.model || item.id,
          productName: item.title,
          category: resultModule,
          listId,
          listName: "site_search_results",
          index,
          locale,
        })),
      });
    }
  }, [groupedResults, locale, queryFromUrl, totalResults]);

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
          <h1>{isEnglish ? t("Site Search") : "全站搜索"}</h1>
          <p>
            {isEnglish
              ? t("Search products, models, compatible models, and datasheets across the FOREACH website.")
              : "搜索产品、型号、兼容型号和规格书，并在对应模块中查看结果。"}
          </p>

          <form className="site-search-form" onSubmit={handleSubmit}>
            <input
              type="search"
              value={inputValue}
              placeholder={
                isEnglish
                  ? t("Search products, models, compatible models, or datasheets")
                  : "搜索产品、型号、兼容型号或规格书"
              }
              aria-label={isEnglish ? t("Site Search") : "全站搜索"}
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
            />
            <button type="submit">{isEnglish ? t("Search") : "搜索"}</button>
          </form>
        </div>
      </section>

      <div className="site-search-container site-search-content">
        {!queryFromUrl ? (
          <section className="site-search-initial">
            <h2>{isEnglish ? t("Enter a search term") : "请输入搜索关键词"}</h2>
            <p>
              {isEnglish
                ? t("For example: Q2002, PMC1702, plunger pump, or diaphragm pump datasheet.")
                : "例如：Q2002、PMC1702、柱塞泵、隔膜泵规格书。"}
            </p>
          </section>
        ) : (
          <>
            <div className="site-search-summary">
              <div>
                <span>{isEnglish ? t("Search Term") : "搜索关键词"}</span>
                <strong>{queryFromUrl}</strong>
              </div>
              <p>
                {isEnglish
                  ? `${totalResults} ${t("results")}`
                  : `共找到 ${totalResults} 条结果`}
              </p>
            </div>

            {totalResults === 0 ? (
              <section className="site-search-no-result">
                <h2>
                  {isEnglish ? t("No matching results") : "没有找到匹配结果"}
                </h2>
                <p>
                  {isEnglish
                    ? t("Check the model number or try a product name, series, or another keyword.")
                    : "请检查型号是否完整，或尝试产品名称、系列名称及其他关键词。"}
                </p>
              </section>
            ) : null}

            {MODULE_ORDER.map((module) => {
              const items = groupedResults[module];
              const text = moduleText[module];

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
                    <span>
                      {isEnglish ? items.length : `${items.length} 条`}
                    </span>
                  </div>

                  {items.length > 0 ? (
                    <div className="site-search-result-grid">
                      {items.map((item, index) => (
                        <SearchResultItem
                          item={item}
                          isEnglish={isEnglish}
                          detailsLabel={t("View Details")}
                          locale={locale}
                          index={index}
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
