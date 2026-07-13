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
