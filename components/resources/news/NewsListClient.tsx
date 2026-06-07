"use client";

/* =========================================================
   NewsListClient.tsx
   恒永达官网｜公司新闻列表页客户端组件

   说明：
   1. 展示公司新闻列表
   2. 面包屑直接引用 SiteBreadcrumb
   3. 搜索栏直接引用 ResourceSearchBar，不额外传 classNames
   4. 底部 CTA 直接引用 ResourceSupportCta
   5. 新闻卡片整张可点击进入详情页
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
          onChange={setKeyword}
          onSearch={setKeyword}
          placeholder={pageData.search.placeholder}
          searchButtonText={pageData.locale === "zh-CN" ? "搜索" : "Search"}
          showRecentKeywords={false}
        />
      </section>

      <section className="newsListSection">
        <div className="newsListSection__head">
          <h2 className="newsListSection__title">{pageData.sectionTitle}</h2>

          <div className="newsCategoryTabs" aria-label="新闻分类筛选">
            {pageData.categories.map((category) => (
              <button
                key={category.key}
                type="button"
                className={
                  activeCategory === category.key
                    ? "newsCategoryTabs__button isActive"
                    : "newsCategoryTabs__button"
                }
                onClick={() => setActiveCategory(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="newsGrid">
            {filteredArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                href={getNewsHref(pageData.locale, article.slug)}
              />
            ))}
          </div>
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