"use client";

/* =========================================================
   TechnicalArticlesClient.tsx
   恒永达官网｜技术文章列表页客户端组件

   说明：
   1. 版式参考安装教程页面
   2. 顶部使用 ResourceSearchBar 共用搜索栏
   3. 左侧为技术分类
   4. 右侧为技术文章卡片
   5. 点击卡片进入详情页
========================================================= */

import { useMemo, useState } from "react";
import type { ComponentType } from "react";

import Image from "next/image";
import Link from "next/link";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";

import type {
  TechnicalArticleCategory,
  TechnicalArticleItem,
  TechnicalArticlesPageData,
} from "@/data/resources/technical-articles/technical-articles.types";

interface TechnicalArticlesClientProps {
  pageData: TechnicalArticlesPageData;
}

type SharedComponentProps = Record<string, unknown>;

const BreadcrumbComponent =
  SiteBreadcrumb as ComponentType<SharedComponentProps>;

const SupportCtaComponent =
  ResourceSupportCta as ComponentType<SharedComponentProps>;

function isChinesePage(locale: string) {
  return locale === "zh-CN";
}

function getArticleHref(locale: string, slug: string) {
  if (isChinesePage(locale)) {
    return `/resources/technical-articles/${slug}`;
  }

  return `/${locale}/resources/technical-articles/${slug}`;
}

function getCategoryLabel(
  pageData: TechnicalArticlesPageData,
  categoryKey: TechnicalArticleCategory
) {
  return (
    pageData.categories.find((category) => category.key === categoryKey)
      ?.label ?? categoryKey
  );
}

function getArticleTags(article: TechnicalArticleItem, locale: string) {
  if (locale === "zh-CN") {
    if (article.category === "fittings-tubing") {
      return ["接头", "管路", "密封"];
    }

    if (article.category === "pumps-valves") {
      return ["泵阀", "控制", "流体"];
    }

    if (article.category === "materials-compatibility") {
      return ["材料", "兼容", "选型"];
    }

    return ["应用", "系统", "选型"];
  }

  if (article.category === "fittings-tubing") {
    return ["Fittings", "Tubing", "Sealing"];
  }

  if (article.category === "pumps-valves") {
    return ["Pumps", "Valves", "Control"];
  }

  if (article.category === "materials-compatibility") {
    return ["Materials", "Compatibility", "Selection"];
  }

  return ["Application", "System", "Selection"];
}

export default function TechnicalArticlesClient({
  pageData,
}: TechnicalArticlesClientProps) {
  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | TechnicalArticleCategory
  >("all");

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
        getCategoryLabel(pageData, article.category),
        ...article.content.map((block) => `${block.title} ${block.content}`),
      ]
        .join(" ")
        .toLowerCase();

      const matchKeyword =
        !normalizedKeyword || searchableText.includes(normalizedKeyword);

      return matchCategory && matchKeyword;
    });
  }, [activeCategory, keyword, pageData]);

  return (
    <main className="technicalArticlesPage">
      <section
        className="technicalArticlesHero"
        style={{
          backgroundImage: `url(${pageData.hero.backgroundImage})`,
        }}
      >
        <div className="technicalArticlesHero__inner">
          <h1 className="technicalArticlesHero__title">
            {pageData.hero.title}
          </h1>
          <p className="technicalArticlesHero__description">
            {pageData.hero.description}
          </p>
        </div>
      </section>

      <BreadcrumbComponent
        items={pageData.breadcrumbs}
        breadcrumbs={pageData.breadcrumbs}
        breadcrumbItems={pageData.breadcrumbs}
      />

      <section className="technicalArticlesSearchSection">
        <ResourceSearchBar
          value={keyword}
          onChange={setKeyword}
          onSearch={setKeyword}
          placeholder={pageData.search.placeholder}
          searchButtonText={pageData.locale === "zh-CN" ? "搜索" : "Search"}
          recentLabel={pageData.locale === "zh-CN" ? "最近搜索" : "Recent"}
          recentKeywords={
            pageData.locale === "zh-CN"
              ? ["接头", "PEEK", "材料兼容", "柱塞泵", "IVD"]
              : ["Fittings", "PEEK", "Compatibility", "Plunger Pump", "IVD"]
          }
          showRecentKeywords
        />
      </section>

      <section className="technicalArticlesContentSection">
        <aside className="technicalArticlesSidebar">
          <h2 className="technicalArticlesSidebar__title">
            {pageData.locale === "zh-CN" ? "技术分类" : "Categories"}
          </h2>

          <div className="technicalArticlesSidebar__list">
            {pageData.categories.map((category) => (
              <button
                key={category.key}
                type="button"
                className={
                  activeCategory === category.key
                    ? "technicalArticlesSidebar__button isActive"
                    : "technicalArticlesSidebar__button"
                }
                onClick={() => setActiveCategory(category.key)}
              >
                <span>{category.label}</span>
                {category.key !== "all" && (
                  <span className="technicalArticlesSidebar__plus">+</span>
                )}
              </button>
            ))}
          </div>
        </aside>

        <div className="technicalArticlesMain">
          {filteredArticles.length > 0 ? (
            <div className="technicalArticlesGrid">
              {filteredArticles.map((article) => (
                <TechnicalArticleCard
                  key={article.id}
                  article={article}
                  categoryLabel={getCategoryLabel(pageData, article.category)}
                  tags={getArticleTags(article, pageData.locale)}
                  href={getArticleHref(pageData.locale, article.slug)}
                />
              ))}
            </div>
          ) : (
            <div className="technicalArticlesEmpty">
              <p>
                {pageData.locale === "zh-CN"
                  ? "没有找到匹配的技术文章，请更换关键词或分类。"
                  : "No matching technical articles found. Please try another keyword or category."}
              </p>
            </div>
          )}
        </div>
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

interface TechnicalArticleCardProps {
  article: TechnicalArticleItem;
  categoryLabel: string;
  tags: string[];
  href: string;
}

function TechnicalArticleCard({
  article,
  categoryLabel,
  tags,
  href,
}: TechnicalArticleCardProps) {
  return (
    <Link className="technicalArticleCard" href={href}>
      <div className="technicalArticleCard__image">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="technicalArticleCard__body">
        <h3 className="technicalArticleCard__title">{article.title}</h3>

        <div className="technicalArticleCard__meta">
          <span>分类：</span>
          <strong>{categoryLabel}</strong>
        </div>

        <div className="technicalArticleCard__tags">
          <span>标签：</span>
          <div className="technicalArticleCard__tagList">
            {tags.map((tag) => (
              <span key={tag} className="technicalArticleCard__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}