"use client";

/* =========================================================
   NewsListClient.tsx
   恒永达官网｜公司新闻列表页客户端组件

   说明：
   1. 展示公司新闻列表
   2. 每页显示 9 条新闻：PC 端对应 3 列 × 3 排
   3. 切换分类或搜索关键词时自动回到第 1 页
========================================================= */

import { useMemo, useState } from "react";
import type { ComponentType } from "react";

import Image from "next/image";
import Link from "next/link";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";

import type {
  NewsArticle,
  NewsCategory,
  NewsPageData,
} from "@/data/resources/news/news.types";

interface NewsListClientProps {
  pageData: NewsPageData;
}

type SharedComponentProps = Record<string, unknown>;

const BreadcrumbComponent =
  SiteBreadcrumb as ComponentType<SharedComponentProps>;

const SupportCtaComponent =
  ResourceSupportCta as ComponentType<SharedComponentProps>;

const NEWS_PAGE_SIZE = 9;

function isChinesePage(locale: string) {
  return locale === "zh-CN";
}

function getNewsHref(locale: string, slug: string) {
  if (isChinesePage(locale)) {
    return `/resources/news/${slug}`;
  }

  return `/${locale}/resources/news/${slug}`;
}

export default function NewsListClient({ pageData }: NewsListClientProps) {
  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | NewsCategory>(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return pageData.articles.filter((article) => {
      const matchCategory =
        activeCategory === "all" || article.category === activeCategory;

      const searchableText = [
        article.title,
        article.summary,
        article.date,
        article.category,
        ...article.content.map((block) => `${block.title} ${block.content}`),
      ]
        .join(" ")
        .toLowerCase();

      const matchKeyword =
        !normalizedKeyword || searchableText.includes(normalizedKeyword);

      return matchCategory && matchKeyword;
    });
  }, [activeCategory, keyword, pageData.articles]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / NEWS_PAGE_SIZE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const pagedArticles = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * NEWS_PAGE_SIZE;
    const endIndex = startIndex + NEWS_PAGE_SIZE;

    return filteredArticles.slice(startIndex, endIndex);
  }, [filteredArticles, safeCurrentPage]);

  function handleKeywordChange(value: string) {
    setKeyword(value);
    setCurrentPage(1);
  }

  function handleCategoryChange(category: "all" | NewsCategory) {
    setActiveCategory(category);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    const nextPage = Math.max(1, Math.min(page, totalPages));

    setCurrentPage(nextPage);
  }

  const pageSummaryText =
    pageData.locale === "zh-CN"
      ? `第 ${safeCurrentPage} / ${totalPages} 页，共 ${filteredArticles.length} 条`
      : `Page ${safeCurrentPage} of ${totalPages}, ${filteredArticles.length} items`;

  return (
    <main className="newsPage">
      <section
        className="newsHero"
        style={{
          backgroundImage: `url(${pageData.hero.backgroundImage})`,
        }}
      >
        <div className="newsHero__inner">
          <h1 className="newsHero__title">{pageData.hero.title}</h1>
          <p className="newsHero__description">{pageData.hero.description}</p>
        </div>
      </section>

      <BreadcrumbComponent
        items={pageData.breadcrumbs}
        breadcrumbs={pageData.breadcrumbs}
        breadcrumbItems={pageData.breadcrumbs}
      />

      <section className="newsSearchSection">
        <ResourceSearchBar
          value={keyword}
          onChange={handleKeywordChange}
          onSearch={handleKeywordChange}
          placeholder={pageData.search.placeholder}
          searchButtonText={pageData.locale === "zh-CN" ? "搜索" : "Search"}
          showRecentKeywords={false}
        />
      </section>

      <section className="newsListSection">
        <div className="newsListSection__head">
          <h2 className="newsListSection__title">{pageData.sectionTitle}</h2>

          <div
            className="newsCategoryTabs"
            aria-label={
              pageData.locale === "zh-CN"
                ? "新闻分类筛选"
                : "News category filters"
            }
          >
            {pageData.categories.map((category) => (
              <button
                key={category.key}
                type="button"
                className={
                  activeCategory === category.key
                    ? "newsCategoryTabs__button isActive"
                    : "newsCategoryTabs__button"
                }
                onClick={() => handleCategoryChange(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {filteredArticles.length > 0 ? (
          <>
            <div className="newsGrid">
              {pagedArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  href={getNewsHref(pageData.locale, article.slug)}
                />
              ))}
            </div>

            {totalPages > 1 ? (
              <div
                className="newsPagination"
                aria-label={
                  pageData.locale === "zh-CN"
                    ? "新闻分页"
                    : "News pagination"
                }
              >
                <button
                  type="button"
                  className="newsPagination__button"
                  disabled={safeCurrentPage <= 1}
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                >
                  {pageData.locale === "zh-CN" ? "上一页" : "Previous"}
                </button>

                <div className="newsPagination__numbers">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        type="button"
                        className={
                          page === safeCurrentPage
                            ? "newsPagination__number isActive"
                            : "newsPagination__number"
                        }
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="newsPagination__button"
                  disabled={safeCurrentPage >= totalPages}
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                >
                  {pageData.locale === "zh-CN" ? "下一页" : "Next"}
                </button>

                <span className="newsPagination__summary">
                  {pageSummaryText}
                </span>
              </div>
            ) : null}
          </>
        ) : (
          <div className="newsEmpty">
            <p>没有找到匹配的新闻，请更换关键词或分类。</p>
          </div>
        )}
      </section>

      <SupportCtaComponent
        title={pageData.bottomBanner.title}
        description={pageData.bottomBanner.description}
        buttonText={pageData.bottomBanner.actions[0]?.label ?? "联系我们"}
        href={pageData.bottomBanner.actions[0]?.href ?? "/contact"}
      />
    </main>
  );
}

interface NewsCardProps {
  article: NewsArticle;
  href: string;
}

function NewsCard({ article, href }: NewsCardProps) {
  return (
    <Link className="newsCard" href={href}>
      <div className="newsCard__image">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="newsCard__body">
        <h3 className="newsCard__title">{article.title}</h3>
        <time className="newsCard__date">{article.date}</time>
        <p className="newsCard__summary">{article.summary}</p>
      </div>
    </Link>
  );
}
