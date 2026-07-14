$ErrorActionPreference = "Stop"

$root = (Get-Location).Path

if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"

$headerPath = Join-Path $root "components\layout\SiteHeader.tsx"
$panelPath = Join-Path $root "components\search\GlobalSearchPanel.tsx"
$globalsPath = Join-Path $root "app\globals.css"
$baseGeneratorPath = Join-Path $root "scripts\search\generate-site-search-index.ts"
$lightGeneratorPath = Join-Path $root "scripts\search\generate-global-search-overlay-index.ts"
$oldJsonPath = Join-Path $root "public\search\global-search-index.v1.json"
$newJsonPath = Join-Path $root "public\search-data\global-search-index.v2.json"

foreach ($requiredPath in @(
    $headerPath,
    $panelPath,
    $globalsPath,
    $baseGeneratorPath,
    $lightGeneratorPath
)) {
    if (-not (Test-Path -LiteralPath $requiredPath)) {
        throw "未找到必要文件：$requiredPath"
    }
}

foreach ($path in @(
    $headerPath,
    $panelPath,
    $globalsPath,
    $baseGeneratorPath,
    $lightGeneratorPath,
    $oldJsonPath,
    $newJsonPath
)) {
    if (Test-Path -LiteralPath $path) {
        Copy-Item `
            -LiteralPath $path `
            -Destination "$path.bak_fix_search_display_$stamp" `
            -Force
    }
}

New-Item `
    -ItemType Directory `
    -Force `
    -Path (Split-Path $newJsonPath) |
    Out-Null

# ============================================================
# 1. 修复基础搜索索引对多语言对象的读取
# ============================================================

$baseGenerator = Get-Content `
    -LiteralPath $baseGeneratorPath `
    -Raw `
    -Encoding utf8

$textFunctionPattern = '(?s)function text\(value: unknown\): string \{.*?\}\s*\r?\n\s*function normalize'

$newTextFunction = @'
function text(value: unknown): string {
  if (value === null || value === undefined) return "";

  if (typeof value === "string") {
    return value.trim();
  }

  if (
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value).trim();
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => text(item))
      .filter(Boolean)
      .join(" ")
      .trim();
  }

  if (typeof value === "object") {
    const record = value as UnknownObject;

    const preferredKeys = [
      "zh-CN",
      "zh",
      "cn",
      "default",
      "en",
      "text",
      "label",
      "title",
      "name",
      "value",
    ];

    for (const key of preferredKeys) {
      if (!(key in record)) continue;

      const nestedValue = text(record[key]);

      if (nestedValue) return nestedValue;
    }
  }

  return "";
}

function normalize
'@

$updatedBaseGenerator = [regex]::Replace(
    $baseGenerator,
    $textFunctionPattern,
    $newTextFunction,
    1
)

if ($updatedBaseGenerator -eq $baseGenerator) {
    throw "未找到基础索引 text 函数，未执行修改。"
}

Set-Content `
    -LiteralPath $baseGeneratorPath `
    -Value $updatedBaseGenerator `
    -Encoding utf8

# ============================================================
# 2. 轻量索引移到无路由冲突的 public/search-data
# ============================================================

$lightGenerator = Get-Content `
    -LiteralPath $lightGeneratorPath `
    -Raw `
    -Encoding utf8

$lightGenerator = $lightGenerator.Replace(
    '"public",' + "`r`n" + '  "search",' + "`r`n" + '  "global-search-index.v1.json"',
    '"public",' + "`r`n" + '  "search-data",' + "`r`n" + '  "global-search-index.v2.json"'
)

$lightGenerator = $lightGenerator.Replace(
    '"public",' + "`n" + '  "search",' + "`n" + '  "global-search-index.v1.json"',
    '"public",' + "`n" + '  "search-data",' + "`n" + '  "global-search-index.v2.json"'
)

if ($lightGenerator -notmatch 'global-search-index\.v2\.json') {
    throw "轻量索引输出路径修改失败。"
}

Set-Content `
    -LiteralPath $lightGeneratorPath `
    -Value $lightGenerator `
    -Encoding utf8

# ============================================================
# 3. 覆盖全站搜索组件
#    - Portal 到 document.body
#    - 不受 Header 范围限制
#    - 180ms 防抖
#    - 英文/数字至少 2 字符
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

  const groupedResults = useMemo(() => {
    const grouped = new Map<
      SearchModule,
      ScoredItem[]
    >();

    for (const module of MODULE_ORDER) {
      grouped.set(module, []);
    }

    const normalizedQuery =
      normalize(debouncedQuery);

    if (
      !normalizedQuery ||
      !queryIsLongEnough ||
      !items
    ) {
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
  }, [
    debouncedQuery,
    items,
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
      aria-label="全站搜索结果"
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
            !queryTooShort &&
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
        </div>

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
        ) : queryTooShort ? (
          <div className="global-search-status">
            <strong>请继续输入关键词</strong>
            <p>
              英文字母或数字至少输入 2 个字符；中文可输入 1 个字。
            </p>
          </div>
        ) : loadState === "error" ? (
          <div className="global-search-status">
            <strong>搜索数据加载失败</strong>
            <p>
              请重新启动开发服务并刷新页面。
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
    </section>,
    document.body
  );
}
'@

Set-Content `
    -LiteralPath $panelPath `
    -Value $panelContent `
    -Encoding utf8

# ============================================================
# 4. Header：避免鼠标从 Header 移入 Portal 时关闭搜索
# ============================================================

$header = Get-Content `
    -LiteralPath $headerPath `
    -Raw `
    -Encoding utf8

$header = $header.Replace(
    'onMouseLeave={handleHeaderMouseLeave}',
    'onMouseLeave={isSearchOpen ? undefined : handleHeaderMouseLeave}'
)

$header = $header.Replace(
    '}}              onClick={handleSearchButtonClick}',
    '}}' + "`r`n" + '              onClick={handleSearchButtonClick}'
)

Set-Content `
    -LiteralPath $headerPath `
    -Value $header `
    -Encoding utf8

# ============================================================
# 5. CSS：Portal 全屏白底，彻底脱离 Header 层级
# ============================================================

$css = Get-Content `
    -LiteralPath $globalsPath `
    -Raw `
    -Encoding utf8

$portalStart = "/* GLOBAL_SEARCH_PORTAL_FIX_START */"
$portalEnd = "/* GLOBAL_SEARCH_PORTAL_FIX_END */"

$portalStartIndex = $css.IndexOf($portalStart)
$portalEndIndex = $css.IndexOf($portalEnd)

if (
    $portalStartIndex -ge 0 -and
    $portalEndIndex -gt $portalStartIndex
) {
    $portalEndIndex += $portalEnd.Length

    $css = $css.Remove(
        $portalStartIndex,
        $portalEndIndex - $portalStartIndex
    ).TrimEnd()
}

$portalCss = @'

/* GLOBAL_SEARCH_PORTAL_FIX_START */

.global-search-panel {
  position: fixed !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  max-width: none !important;
  max-height: none !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  z-index: 2147483000 !important;
  border-top: 1px solid #e1e7ef !important;
  background: #ffffff !important;
  box-shadow: none !important;
  transform: none !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.global-search-panel-inner {
  width: min(1440px, calc(100% - 64px)) !important;
  min-height: 100%;
  margin: 0 auto !important;
  padding: 22px 0 56px !important;
  background: #ffffff !important;
}

.global-search-panel-head {
  position: sticky;
  top: 0;
  z-index: 4;
  padding: 4px 0 18px;
  background: #ffffff !important;
}

.global-search-backdrop {
  display: none !important;
}

body.global-search-lock {
  overflow: hidden !important;
}

@media (max-width: 720px) {
  .global-search-panel-inner {
    width: calc(100% - 28px) !important;
    padding-bottom: 38px !important;
  }
}

/* GLOBAL_SEARCH_PORTAL_FIX_END */
'@

$css = $css.TrimEnd() + "`r`n" + $portalCss + "`r`n"

Set-Content `
    -LiteralPath $globalsPath `
    -Value $css `
    -Encoding utf8

# ============================================================
# 6. 重新生成两个索引
# ============================================================

Write-Host ""
Write-Host "正在重新生成基础搜索索引……" -ForegroundColor Cyan

npx tsx scripts/search/generate-site-search-index.ts

if ($LASTEXITCODE -ne 0) {
    throw "基础搜索索引生成失败。"
}

Write-Host ""
Write-Host "正在生成 V2 轻量搜索 JSON……" -ForegroundColor Cyan

npx tsx scripts/search/generate-global-search-overlay-index.ts

if ($LASTEXITCODE -ne 0) {
    throw "V2 轻量搜索 JSON 生成失败。"
}

if (-not (Test-Path -LiteralPath $newJsonPath)) {
    throw "未生成：$newJsonPath"
}

if (Test-Path -LiteralPath $oldJsonPath) {
    Remove-Item `
        -LiteralPath $oldJsonPath `
        -Force
}

$jsonRaw = Get-Content `
    -LiteralPath $newJsonPath `
    -Raw `
    -Encoding utf8

if ($jsonRaw -match '\[object Object\]') {
    throw "V2 索引中仍存在 [object Object]，已停止构建。"
}

$jsonItems = $jsonRaw | ConvertFrom-Json
$jsonSizeKB = [math]::Round(
    (Get-Item $newJsonPath).Length / 1KB,
    1
)

Write-Host ""
Write-Host "V2 搜索索引检查通过：" -ForegroundColor Green
Write-Host "记录数量：$($jsonItems.Count)"
Write-Host "文件大小：$jsonSizeKB KB"
Write-Host "未发现 [object Object]"
Write-Host ""

Write-Host "开始构建检查……" -ForegroundColor Cyan

npm run build

if ($LASTEXITCODE -ne 0) {
    throw "构建未通过，请把新的报错发给我。"
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "全站搜索显示与索引数据已修复。" -ForegroundColor Green
Write-Host ""
Write-Host "请重新启动开发服务：" -ForegroundColor Yellow
Write-Host "npm run dev"
Write-Host ""
Write-Host "测试顺序：" -ForegroundColor Yellow
Write-Host "1. 点击顶部搜索图标"
Write-Host "2. 输入 s，应提示继续输入"
Write-Host "3. 输入 SA，应出现产品结果"
Write-Host "4. 输入 HAX18-PP0，应出现兼容型号"
Write-Host "5. 输入 PEEK，应出现产品、文章和材料结果"
Write-Host "============================================" -ForegroundColor Cyan
