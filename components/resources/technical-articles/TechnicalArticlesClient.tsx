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

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";
import TechnicalArticleCard from "@/components/resources/technical-articles/TechnicalArticleCard";

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

const TECHNICAL_ARTICLES_PAGE_SIZE = 6;

const technicalArticlesPaginationUi: Record<string, {
  pagination: string;
  previous: string;
  next: string;
}> = {
  es: {
    pagination: "Paginación de artículos técnicos",
    previous: "Anterior",
    next: "Siguiente",
  },
  fr: {
    pagination: "Pagination des articles techniques",
    previous: "Précédente",
    next: "Suivante",
  },
  ko: {
    pagination: "기술 문서 페이지",
    previous: "이전",
    next: "다음",
  },
  ru: {
    pagination: "Страницы технических статей",
    previous: "Назад",
    next: "Далее",
  },
};

const technicalArticlesUi: Record<string, {
  search: string;
  recent: string;
  recentKeywords: string[];
  categories: string;
  empty: string;
  category: string;
  tags: string;
  tagGroups: Record<TechnicalArticleCategory, string[]>;
  contact: string;
}> = {
  es: { search: "Buscar", recent: "Recientes", recentKeywords: ["Racores", "PEEK", "Compatibilidad", "Bomba de émbolo", "IVD"], categories: "Categorías", empty: "No se encontraron artículos técnicos. Pruebe otra palabra clave o categoría.", category: "Categoría:", tags: "Etiquetas:", tagGroups: { "fittings-tubing": ["Racores", "Tubos", "Sellado"], "pumps-valves": ["Bombas", "Válvulas", "Control"], "materials-compatibility": ["Materiales", "Compatibilidad", "Selección"], applications: ["Aplicación", "Sistema", "Selección"] }, contact: "Contactar" },
  fr: { search: "Rechercher", recent: "Récentes", recentKeywords: ["Raccords", "PEEK", "Compatibilité", "Pompe à piston", "IVD"], categories: "Catégories", empty: "Aucun article technique correspondant. Essayez un autre mot-clé ou une autre catégorie.", category: "Catégorie :", tags: "Étiquettes :", tagGroups: { "fittings-tubing": ["Raccords", "Tubes", "Étanchéité"], "pumps-valves": ["Pompes", "Vannes", "Commande"], "materials-compatibility": ["Matériaux", "Compatibilité", "Sélection"], applications: ["Application", "Système", "Sélection"] }, contact: "Nous contacter" },
  ko: { search: "검색", recent: "최근 검색", recentKeywords: ["피팅", "PEEK", "호환성", "플런저 펌프", "IVD"], categories: "기술 분류", empty: "일치하는 기술 자료가 없습니다. 다른 키워드나 분류를 선택하세요.", category: "분류:", tags: "태그:", tagGroups: { "fittings-tubing": ["피팅", "튜브", "밀봉"], "pumps-valves": ["펌프", "밸브", "제어"], "materials-compatibility": ["재질", "호환성", "선정"], applications: ["적용", "시스템", "선정"] }, contact: "문의하기" },
  ru: { search: "Найти", recent: "Недавние", recentKeywords: ["Фитинги", "PEEK", "Совместимость", "Плунжерный насос", "IVD"], categories: "Категории", empty: "Подходящие технические статьи не найдены. Измените запрос или категорию.", category: "Категория:", tags: "Метки:", tagGroups: { "fittings-tubing": ["Фитинги", "Трубки", "Уплотнение"], "pumps-valves": ["Насосы", "Клапаны", "Управление"], "materials-compatibility": ["Материалы", "Совместимость", "Подбор"], applications: ["Применение", "Система", "Подбор"] }, contact: "Связаться" },
};

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
  const localizedTags = technicalArticlesUi[locale]?.tagGroups[article.category];
  if (localizedTags) return localizedTags;

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
  const ui = technicalArticlesUi[pageData.locale];
  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | TechnicalArticleCategory
  >("all");
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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / TECHNICAL_ARTICLES_PAGE_SIZE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const pagedArticles = useMemo(() => {
    const startIndex =
      (safeCurrentPage - 1) * TECHNICAL_ARTICLES_PAGE_SIZE;
    const endIndex = startIndex + TECHNICAL_ARTICLES_PAGE_SIZE;

    return filteredArticles.slice(startIndex, endIndex);
  }, [filteredArticles, safeCurrentPage]);

  function handleKeywordChange(value: string) {
    setKeyword(value);
    setCurrentPage(1);
  }

  function handleCategoryChange(
    category: "all" | TechnicalArticleCategory
  ) {
    setActiveCategory(category);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    const nextPage = Math.max(1, Math.min(page, totalPages));

    setCurrentPage(nextPage);
  }

  const paginationUi = technicalArticlesPaginationUi[pageData.locale];

  return (
    <main className="technicalArticlesPage">
      <section
        className="technicalArticlesHero resource-center-banner"
        style={{
          backgroundImage: `url(${pageData.hero.backgroundImage})`,
        }}
      >
        <div className="technicalArticlesHero__inner resource-center-banner__inner">
          <h1 className="technicalArticlesHero__title resource-center-banner__title">
            {pageData.hero.title}
          </h1>
          <p className="technicalArticlesHero__description resource-center-banner__description">
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
          onChange={handleKeywordChange}
          onSearch={handleKeywordChange}
          placeholder={pageData.search.placeholder}
          searchButtonText={ui?.search ?? (pageData.locale === "zh-CN" ? "搜索" : "Search")}
          recentLabel={ui?.recent ?? (pageData.locale === "zh-CN" ? "最近搜索" : "Recent")}
          recentKeywords={
            ui?.recentKeywords ?? (pageData.locale === "zh-CN"
              ? ["接头", "PEEK", "材料兼容", "柱塞泵", "IVD"]
              : ["Fittings", "PEEK", "Compatibility", "Plunger Pump", "IVD"])
          }
          showRecentKeywords
        />
      </section>

      <section className="technicalArticlesContentSection">
        <aside className="technicalArticlesSidebar">
          <h2 className="technicalArticlesSidebar__title">
            {ui?.categories ?? (pageData.locale === "zh-CN" ? "技术分类" : "Categories")}
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
                onClick={() => handleCategoryChange(category.key)}
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
            <>
              <div className="technicalArticlesGrid">
                {pagedArticles.map((article) => (
                  <TechnicalArticleCard
                    key={article.id}
                    article={article}
                    categoryLabel={getCategoryLabel(pageData, article.category)}
                    tags={getArticleTags(article, pageData.locale)}
                    href={getArticleHref(pageData.locale, article.slug)}
                    locale={pageData.locale}
                    categoryText={ui?.category}
                    tagsText={ui?.tags}
                  />
                ))}
              </div>

              {totalPages > 1 ? (
                <nav
                  className="technicalArticlesPagination"
                  aria-label={
                    pageData.locale === "zh-CN"
                      ? "技术文章分页"
                      : paginationUi?.pagination ??
                        "Technical articles pagination"
                  }
                >
                  <button
                    type="button"
                    className="technicalArticlesPagination__button"
                    disabled={safeCurrentPage <= 1}
                    onClick={() =>
                      handlePageChange(safeCurrentPage - 1)
                    }
                  >
                    {paginationUi?.previous ??
                      (pageData.locale === "zh-CN"
                        ? "上一页"
                        : "Previous")}
                  </button>

                  <span className="technicalArticlesPagination__status">
                    {safeCurrentPage} / {totalPages}
                  </span>

                  <button
                    type="button"
                    className="technicalArticlesPagination__button"
                    disabled={safeCurrentPage >= totalPages}
                    onClick={() =>
                      handlePageChange(safeCurrentPage + 1)
                    }
                  >
                    {paginationUi?.next ??
                      (pageData.locale === "zh-CN" ? "下一页" : "Next")}
                  </button>
                </nav>
              ) : null}
            </>
          ) : (
            <div className="technicalArticlesEmpty">
              <p>
                {ui?.empty ?? (pageData.locale === "zh-CN"
                  ? "没有找到匹配的技术文章，请更换关键词或分类。"
                  : "No matching technical articles found. Please try another keyword or category.")}
              </p>
            </div>
          )}
        </div>
      </section>

      <SupportCtaComponent
        title={pageData.bottomBanner.title}
        description={pageData.bottomBanner.description}
        buttonText={
          pageData.bottomBanner.actions[0]?.label ??
          (ui?.contact ?? (isChinesePage(pageData.locale) ? "联系我们" : "Contact Us"))
        }
        href={pageData.bottomBanner.actions[0]?.href ?? "/contact"}
      />
    </main>
  );
}

