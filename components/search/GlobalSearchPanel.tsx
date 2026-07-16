"use client";

import {
  Fragment,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

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
  "/search-data/global-search-index.v2.json";

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

const MODULE_TEXT_EN: typeof MODULE_TEXT = {
  products: {
    title: "Products",
    action: "View Product",
  },
  "compatible-models": {
    title: "Compatible Model Search",
    action: "View Compatible Product",
  },
  datasheets: {
    title: "Datasheets",
    action: "View Datasheet",
  },
  "installation-guides": {
    title: "Installation Guides",
    action: "View Guide",
  },
  "technical-articles": {
    title: "Technical Articles",
    action: "Read Article",
  },
  "material-compatibility": {
    title: "Material Compatibility",
    action: "View Material Data",
  },
  applications: {
    title: "Applications",
    action: "View Application",
  },
  news: {
    title: "News",
    action: "View News",
  },
  pages: {
    title: "Pages",
    action: "Open Page",
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

const INITIAL_SUGGESTIONS_EN = [
  "Q2002",
  "PMC1702",
  "Plunger Pump",
  "PEEK",
  "Fitting Installation",
  "ADLM",
];

const ENGLISH_RESULT_DESCRIPTIONS: Record<SearchModule, string> = {
  products: "View product details and selection information.",
  "compatible-models": "View the corresponding FOREACH compatible product.",
  datasheets: "View or download the available product datasheet.",
  "installation-guides": "View installation and commissioning guidance.",
  "technical-articles": "Read the full technical article.",
  "material-compatibility": "Review material compatibility information.",
  applications: "Explore the related fluid handling application.",
  news: "Read the full FOREACH news update.",
  pages: "Open this FOREACH website page.",
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

function getTechnicalText(value: string | undefined): string {
  return (value ?? "")
    .replace(/[\u3400-\u9fff：]/g, "")
    .replace(/^\s*[:：-]\s*/, "")
    .trim();
}

function getEnglishSearchItem(item: CompactSearchItem): CompactSearchItem {
  const technicalText = getTechnicalText(item.s);
  const title = !containsHan(item.t)
    ? item.t
    : technicalText || getPathLabel(item.h);
  const subtitle = item.s && !containsHan(item.s)
    ? item.s
    : undefined;
  const pathKeywords = item.h
    .split(/[/?#_-]+/)
    .filter(Boolean)
    .join(" ");

  return {
    ...item,
    t: title,
    s: subtitle,
    d: ENGLISH_RESULT_DESCRIPTIONS[item.m],
    a: MODULE_TEXT_EN[item.m].action,
    x: [
      item.x,
      normalize(title),
      normalize(pathKeywords),
      normalize(MODULE_TEXT_EN[item.m].title),
    ].join(" "),
  };
}

function normalize(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/[‐‑‒–—―﹘﹣－]/g, "-")
    .replace(/\s+/g, "");
}

function isSearchQueryLongEnough(value: string): boolean {
  const normalizedValue = normalize(value);

  if (!normalizedValue) return false;

  const containsChinese =
    /[\u3400-\u9fff]/.test(normalizedValue);

  return containsChinese || normalizedValue.length >= 2;
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
  if (
    !normalizedQuery ||
    !item.x.includes(normalizedQuery)
  ) {
    return 0;
  }

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

  if (title.startsWith(normalizedQuery)) {
    score += 600;
  } else if (title.includes(normalizedQuery)) {
    score += 330;
  }

  if (subtitle === normalizedQuery) {
    score += 500;
  } else if (subtitle.startsWith(normalizedQuery)) {
    score += 260;
  } else if (subtitle.includes(normalizedQuery)) {
    score += 150;
  }

  return score;
}

function escapeRegExp(value: string): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}

function highlightText(
  value: string,
  query: string
): ReactNode {
  const keyword = query.trim();

  if (!keyword) return value;

  const parts = value.split(
    new RegExp(
      `(${escapeRegExp(keyword)})`,
      "ig"
    )
  );

  return parts.map((part, index) => {
    if (
      part.toLowerCase() ===
      keyword.toLowerCase()
    ) {
      return (
        <mark key={`${part}-${index}`}>
          {part}
        </mark>
      );
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
  const isEnglish = locale === "en";
  const moduleText = isEnglish
    ? MODULE_TEXT_EN
    : MODULE_TEXT;
  const suggestions = isEnglish
    ? INITIAL_SUGGESTIONS_EN
    : INITIAL_SUGGESTIONS;

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

  useEffect(() => {
    if (cachedSearchItems) {
      setItems(cachedSearchItems);
      setLoadState("ready");
      return;
    }

    const idleWindow = window as IdleWindow;
    let idleId: number | undefined;
    let fallbackTimer: number | undefined;
    let cancelled = false;

    const preload = () => {
      void preloadGlobalSearchIndex()
        .then((loadedItems) => {
          if (cancelled) return;

          setItems(loadedItems);
          setLoadState("ready");
        })
        .catch(() => {
          // 正式打开搜索时会再次尝试。
        });
    };

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(
        preload,
        { timeout: 1600 }
      );
    } else {
      fallbackTimer = window.setTimeout(
        preload,
        600
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
        header?.getBoundingClientRect().bottom ??
        84;

      setHeaderBottom(
        Math.max(0, nextBottom)
      );
    }

    updateHeaderBottom();

    window.addEventListener(
      "resize",
      updateHeaderBottom
    );

    window.addEventListener(
      "scroll",
      updateHeaderBottom,
      { passive: true }
    );

    document.body.classList.add(
      "global-search-lock"
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateHeaderBottom
      );

      window.removeEventListener(
        "scroll",
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

  const queryIsLongEnough =
    isSearchQueryLongEnough(debouncedQuery);

  const displayItems = useMemo(() => {
    if (!items || !isEnglish) {
      return items;
    }

    return items.map(getEnglishSearchItem);
  }, [isEnglish, items]);

  const groupedResults = useMemo(() => {
    const grouped = new Map<
      SearchModule,
      ScoredItem[]
    >();

    for (const moduleId of MODULE_ORDER) {
      grouped.set(moduleId, []);
    }

    const normalizedQuery =
      normalize(debouncedQuery);

    if (
      !normalizedQuery ||
      !queryIsLongEnough ||
      !displayItems
    ) {
      return grouped;
    }

    for (const item of displayItems) {
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

    for (const moduleId of MODULE_ORDER) {
      const moduleItems =
        grouped.get(moduleId) ?? [];

      moduleItems.sort((a, b) => {
        return (
          b.score - a.score ||
          a.item.t.localeCompare(
            b.item.t,
            "zh-CN"
          )
        );
      });

      grouped.set(moduleId, moduleItems);
    }

    return grouped;
  }, [
    debouncedQuery,
    displayItems,
    queryIsLongEnough,
  ]);

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

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  const isWaitingForDebounce =
    query.trim() !== debouncedQuery.trim();

  const showLoading =
    Boolean(query.trim()) &&
    (
      isWaitingForDebounce ||
      loadState === "loading" ||
      (!items && loadState !== "error")
    );

  const queryTooShort =
    Boolean(debouncedQuery.trim()) &&
    !queryIsLongEnough;

  return createPortal(
    <section
      className="global-search-panel"
      data-global-search-panel="true"
      aria-label={
        isEnglish
          ? "Site search results"
          : "全站搜索结果"
      }
      style={{
        top: headerBottom,
      }}
      onPointerDownCapture={(event) => {
        event.stopPropagation();
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div className="global-search-panel-inner">
        <div className="global-search-panel-head">
          <div>
            <span>{isEnglish ? "Site Search" : "全站搜索"}</span>

            <strong>
              {query.trim()
                ? `“${query.trim()}”`
                : isEnglish
                  ? "Search products and technical resources"
                  : "搜索产品与技术资料"}
            </strong>
          </div>

          <div className="global-search-panel-head-actions">
            {query.trim() &&
            !showLoading &&
            !queryTooShort &&
            loadState === "ready" ? (
              <span>
                {isEnglish
                  ? `${totalCount} results`
                  : `共 ${totalCount} 条结果`}
              </span>
            ) : null}

            <button
              className="global-search-close"
              type="button"
              aria-label={
                isEnglish
                  ? "Close site search"
                  : "关闭全站搜索"
              }
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </div>

        {!query.trim() ? (
          <div className="global-search-start">
            <p>
              {isEnglish
                ? "Search by product name, model, compatible model, datasheet, guide, or technical keyword."
                : "输入产品名称、型号、兼容型号、规格书、教程或技术关键词。"}
            </p>

            <div className="global-search-suggestions">
              {suggestions.map(
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
            {isEnglish ? "Searching..." : "正在搜索……"}
          </div>
        ) : queryTooShort ? (
          <div className="global-search-status">
            <strong>
              {isEnglish
                ? "Enter another character"
                : "请继续输入关键词"}
            </strong>
            <p>
              {isEnglish
                ? "Enter at least two letters or numbers."
                : "英文字母或数字至少输入 2 个字符；中文可输入 1 个字。"}
            </p>
          </div>
        ) : loadState === "error" ? (
          <div className="global-search-status">
            <strong>
              {isEnglish
                ? "Search data could not be loaded"
                : "搜索数据加载失败"}
            </strong>
            <p>
              {isEnglish
                ? "Refresh the page and try again."
                : "请重新启动开发服务并刷新页面。"}
            </p>
          </div>
        ) : totalCount === 0 ? (
          <div className="global-search-status">
            <strong>
              {isEnglish
                ? "No matching results"
                : "没有找到匹配结果"}
            </strong>
            <p>
              {isEnglish
                ? "Check the model number or try a product name, series, material, or application keyword."
                : "请检查型号是否完整，或尝试产品名称、系列、材料及应用关键词。"}
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
                      {moduleText[module].title}
                    </h2>

                    <span>
                      {isEnglish
                        ? moduleResults.length
                        : `${moduleResults.length} 条`}
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
                          onClick={(event) => {
                            /*
                              MOBILE_SEARCH_LINK_FIX_20260713

                              手机端点击搜索结果时，明确执行页面跳转，
                              避免搜索面板先卸载导致默认链接跳转被中断。
                            */
                            if (
                              event.metaKey ||
                              event.ctrlKey ||
                              event.shiftKey ||
                              event.altKey ||
                              event.button !== 0
                            ) {
                              return;
                            }

                            event.preventDefault();

                            const nextHref =
                              event.currentTarget.href;

                            onClose();
                            window.location.assign(nextHref);
                          }}
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
                                moduleText[module]
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
                        ? isEnglish
                          ? "Show Less"
                          : "收起结果"
                        : isEnglish
                          ? `Show More (${moduleResults.length - visibleCount} remaining)`
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
    </section>,
    document.body
  );
}
