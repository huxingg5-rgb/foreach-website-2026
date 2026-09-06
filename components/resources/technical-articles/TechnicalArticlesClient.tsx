"use client";

import { useMemo, useState } from "react";
import type { ComponentType } from "react";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";
import TechnicalArticleCard from "@/components/resources/technical-articles/TechnicalArticleCard";
import type {
  ClassifiedTechnicalArticleItem,
  TechnicalArticleLocale,
  TechnicalArticlePrimaryCategory,
  TechnicalArticleSecondaryCategory,
  TechnicalArticlesPageData,
} from "@/data/resources/technical-articles/technical-articles.types";

interface TechnicalArticlesClientProps {
  pageData: TechnicalArticlesPageData;
}

type SharedComponentProps = Record<string, unknown>;

type ActiveCategoryFilter =
  | { type: "all" }
  | { type: "primary"; key: TechnicalArticlePrimaryCategory }
  | { type: "secondary"; key: TechnicalArticleSecondaryCategory };

type TechnicalArticlesUi = {
  search: string;
  recent: string;
  recentKeywords: string[];
  categories: string;
  allArticles: string;
  empty: string;
  tags: string;
  contact: string;
};

const BreadcrumbComponent =
  SiteBreadcrumb as ComponentType<SharedComponentProps>;
const SupportCtaComponent =
  ResourceSupportCta as ComponentType<SharedComponentProps>;

const TECHNICAL_ARTICLES_PAGE_SIZE = 6;

const technicalArticlesPaginationUi: Partial<Record<
  TechnicalArticleLocale,
  { pagination: string; previous: string; next: string }
>> = {
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

const technicalArticlesUi: Partial<
  Record<TechnicalArticleLocale, TechnicalArticlesUi>
> = {
  es: {
    search: "Buscar",
    recent: "Recientes",
    recentKeywords: ["Racores", "PEEK", "Compatibilidad", "Bomba de pistón", "IVD"],
    categories: "Categorías técnicas",
    allArticles: "Todos los artículos",
    empty: "No se encontraron artículos técnicos. Pruebe otra palabra clave o categoría.",
    tags: "Etiquetas:",
    contact: "Contactar",
  },
  fr: {
    search: "Rechercher",
    recent: "Récentes",
    recentKeywords: ["Raccords", "PEEK", "Compatibilité", "Pompe à piston", "IVD"],
    categories: "Catégories techniques",
    allArticles: "Tous les articles",
    empty: "Aucun article technique correspondant. Essayez un autre mot-clé ou une autre catégorie.",
    tags: "Étiquettes :",
    contact: "Nous contacter",
  },
  ko: {
    search: "검색",
    recent: "최근 검색",
    recentKeywords: ["피팅", "PEEK", "호환성", "피스톤 펌프", "IVD"],
    categories: "기술 분류",
    allArticles: "전체 문서",
    empty: "일치하는 기술 자료가 없습니다. 다른 키워드나 분류를 선택하세요.",
    tags: "태그:",
    contact: "문의하기",
  },
  ru: {
    search: "Найти",
    recent: "Недавние",
    recentKeywords: ["Фитинги", "PEEK", "Совместимость", "Поршневой насос", "IVD"],
    categories: "Технические категории",
    allArticles: "Все статьи",
    empty: "Подходящие технические статьи не найдены. Измените запрос или категорию.",
    tags: "Метки:",
    contact: "Связаться",
  },
};

function isChinesePage(locale: TechnicalArticleLocale) {
  return locale === "zh-CN";
}

function formatArticleCount(locale: TechnicalArticleLocale, count: number) {
  return isChinesePage(locale) ? `（${count}）` : ` (${count})`;
}

function getArticleHref(locale: TechnicalArticleLocale, slug: string) {
  if (isChinesePage(locale)) {
    return `/resources/technical-articles/${slug}`;
  }

  return `/${locale}/resources/technical-articles/${slug}`;
}

function getCategoryPathLabel(
  pageData: TechnicalArticlesPageData,
  article: ClassifiedTechnicalArticleItem,
) {
  const primary = pageData.taxonomy.find(
    (item) => item.key === article.primaryCategory,
  );
  const secondary = primary?.children.find(
    (item) => item.key === article.secondaryCategory,
  );

  if (!primary || !secondary) {
    return `${article.primaryCategory} / ${article.secondaryCategory}`;
  }

  return `${primary.label} / ${secondary.label}`;
}

export default function TechnicalArticlesClient({
  pageData,
}: TechnicalArticlesClientProps) {
  const ui = technicalArticlesUi[pageData.locale];
  const [keyword, setKeyword] = useState("");
  const [activeFilter, setActiveFilter] = useState<ActiveCategoryFilter>({
    type: "all",
  });
  const [expandedPrimary, setExpandedPrimary] =
    useState<TechnicalArticlePrimaryCategory | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryCounts = useMemo(() => {
    const primary = new Map<TechnicalArticlePrimaryCategory, number>();
    const secondary = new Map<TechnicalArticleSecondaryCategory, number>();

    for (const group of pageData.taxonomy) {
      primary.set(group.key, 0);
      for (const child of group.children) {
        secondary.set(child.key, 0);
      }
    }

    for (const article of pageData.articles) {
      primary.set(
        article.primaryCategory,
        (primary.get(article.primaryCategory) ?? 0) + 1,
      );
      secondary.set(
        article.secondaryCategory,
        (secondary.get(article.secondaryCategory) ?? 0) + 1,
      );
    }

    return { primary, secondary };
  }, [pageData.articles, pageData.taxonomy]);

  const filteredArticles = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return pageData.articles.filter((article) => {
      const matchCategory =
        activeFilter.type === "all" ||
        (activeFilter.type === "primary" &&
          article.primaryCategory === activeFilter.key) ||
        (activeFilter.type === "secondary" &&
          article.secondaryCategory === activeFilter.key);

      const searchableText = [
        article.title,
        article.summary,
        article.date,
        getCategoryPathLabel(pageData, article),
        ...article.tags,
        ...article.relatedProducts,
        ...(article.relationKeys ?? []),
        ...article.content.map((block) => `${block.title} ${block.content}`),
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchCategory &&
        (!normalizedKeyword || searchableText.includes(normalizedKeyword))
      );
    });
  }, [activeFilter, keyword, pageData]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / TECHNICAL_ARTICLES_PAGE_SIZE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const pagedArticles = useMemo(() => {
    const startIndex =
      (safeCurrentPage - 1) * TECHNICAL_ARTICLES_PAGE_SIZE;

    return filteredArticles.slice(
      startIndex,
      startIndex + TECHNICAL_ARTICLES_PAGE_SIZE,
    );
  }, [filteredArticles, safeCurrentPage]);

  function handleKeywordChange(value: string) {
    setKeyword(value);
    setCurrentPage(1);
  }

  function handleAllArticles() {
    setActiveFilter({ type: "all" });
    setExpandedPrimary(null);
    setCurrentPage(1);
  }

  function handlePrimaryCategory(key: TechnicalArticlePrimaryCategory) {
    setActiveFilter({ type: "primary", key });
    setExpandedPrimary((current) => (current === key ? null : key));
    setCurrentPage(1);
  }

  function handleSecondaryCategory(
    primaryKey: TechnicalArticlePrimaryCategory,
    secondaryKey: TechnicalArticleSecondaryCategory,
  ) {
    setActiveFilter({ type: "secondary", key: secondaryKey });
    setExpandedPrimary(primaryKey);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }

  const paginationUi = technicalArticlesPaginationUi[pageData.locale];
  const allArticlesLabel =
    ui?.allArticles ??
    (pageData.locale === "zh-CN" ? "全部文章" : "All Articles");

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
          searchButtonText={
            ui?.search ?? (pageData.locale === "zh-CN" ? "搜索" : "Search")
          }
          recentLabel={
            ui?.recent ??
            (pageData.locale === "zh-CN" ? "最近搜索" : "Recent")
          }
          recentKeywords={
            ui?.recentKeywords ??
            (pageData.locale === "zh-CN"
              ? ["接头", "PEEK", "材料兼容", "柱塞泵", "IVD"]
              : ["Fittings", "PEEK", "Compatibility", "Piston Pump", "IVD"])
          }
          showRecentKeywords
        />
      </section>

      <section className="technicalArticlesContentSection">
        <aside className="technicalArticlesSidebar">
          <h2 className="technicalArticlesSidebar__title">
            {ui?.categories ??
              (pageData.locale === "zh-CN" ? "技术分类" : "Technical Categories")}
          </h2>

          <div className="technicalArticlesSidebar__list">
            <div className="technicalArticlesSidebar__group">
              <button
                type="button"
                className={`technicalArticlesSidebar__button technicalArticlesSidebar__button--all${
                  activeFilter.type === "all" ? " isActive" : ""
                }`}
                aria-pressed={activeFilter.type === "all"}
                onClick={handleAllArticles}
              >
                <span className="technicalArticlesSidebar__label">
                  {allArticlesLabel}
                  <span className="technicalArticlesSidebar__count">
                    {formatArticleCount(
                      pageData.locale,
                      pageData.articles.length,
                    )}
                  </span>
                </span>
                <span
                  className="technicalArticlesSidebar__toggle technicalArticlesSidebar__toggle--empty"
                  aria-hidden="true"
                />
              </button>
            </div>

            {pageData.taxonomy.map((primary) => {
              const isExpanded = expandedPrimary === primary.key;
              const isPrimaryActive =
                activeFilter.type === "primary" &&
                activeFilter.key === primary.key;
              const panelId = `technical-articles-${primary.key}`;
              const triggerId = `${panelId}-trigger`;

              return (
                <div
                  className={`technicalArticlesSidebar__group${
                    isExpanded ? " isOpen" : ""
                  }`}
                  key={primary.key}
                >
                  <button
                    type="button"
                    id={triggerId}
                    className={`technicalArticlesSidebar__button technicalArticlesSidebar__button--primary${
                      isPrimaryActive ? " isActive" : ""
                    }`}
                    aria-expanded={isExpanded}
                    aria-controls={isExpanded ? panelId : undefined}
                    aria-pressed={isPrimaryActive}
                    onClick={() => handlePrimaryCategory(primary.key)}
                  >
                    <span className="technicalArticlesSidebar__label">
                      {primary.label}
                      <span className="technicalArticlesSidebar__count">
                        {formatArticleCount(
                          pageData.locale,
                          categoryCounts.primary.get(primary.key) ?? 0,
                        )}
                      </span>
                    </span>
                    <span
                      className="technicalArticlesSidebar__toggle"
                      aria-hidden="true"
                    />
                  </button>

                  {isExpanded ? (
                    <div
                      id={panelId}
                      className="technicalArticlesSidebar__children"
                      role="region"
                      aria-labelledby={triggerId}
                    >
                      {primary.children.map((secondary) => {
                        const isSecondaryActive =
                          activeFilter.type === "secondary" &&
                          activeFilter.key === secondary.key;

                        return (
                          <button
                            type="button"
                            className={`technicalArticlesSidebar__button technicalArticlesSidebar__button--secondary${
                              isSecondaryActive ? " isActive" : ""
                            }`}
                            key={secondary.key}
                            aria-pressed={isSecondaryActive}
                            onClick={() =>
                              handleSecondaryCategory(
                                primary.key,
                                secondary.key,
                              )
                            }
                          >
                            <span className="technicalArticlesSidebar__label">
                              {secondary.label}
                              <span className="technicalArticlesSidebar__count">
                                {formatArticleCount(
                                  pageData.locale,
                                  categoryCounts.secondary.get(secondary.key) ??
                                    0,
                                )}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
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
                    tags={article.tags}
                    href={getArticleHref(pageData.locale, article.slug)}
                    locale={pageData.locale}
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
                    onClick={() => handlePageChange(safeCurrentPage - 1)}
                  >
                    {paginationUi?.previous ??
                      (pageData.locale === "zh-CN" ? "上一页" : "Previous")}
                  </button>

                  <span className="technicalArticlesPagination__status">
                    {safeCurrentPage} / {totalPages}
                  </span>

                  <button
                    type="button"
                    className="technicalArticlesPagination__button"
                    disabled={safeCurrentPage >= totalPages}
                    onClick={() => handlePageChange(safeCurrentPage + 1)}
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
                {ui?.empty ??
                  (pageData.locale === "zh-CN"
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
          (ui?.contact ??
            (isChinesePage(pageData.locale) ? "联系我们" : "Contact Us"))
        }
        href={pageData.bottomBanner.actions[0]?.href ?? "/contact"}
      />
    </main>
  );
}
