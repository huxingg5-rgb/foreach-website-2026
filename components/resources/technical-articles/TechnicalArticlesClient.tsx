"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ComponentType } from "react";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import ResourceCategorySidebar from "@/components/resources/ResourceCategorySidebar";
import ResourcePagination from "@/components/resources/ResourcePagination";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";
import TechnicalArticleListItem from "@/components/resources/technical-articles/TechnicalArticleListItem";
import articleListStyles from "./TechnicalArticleListItem.module.css";
import { replaceArticleListQuery, takeArticleListScroll, useArticleNavigationSnapshot } from "./articleNavigation";
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

function resolveCategoryFilter(pageData: TechnicalArticlesPageData, category: string | null): ActiveCategoryFilter {
  for (const group of pageData.taxonomy) {
    if (group.key === category) return { type: "primary", key: group.key };
    const child = group.children.find((item) => item.key === category);
    if (child) return { type: "secondary", key: child.key };
  }
  return { type: "all" };
}

export default function TechnicalArticlesClient({
  pageData,
}: TechnicalArticlesClientProps) {
  const ui = technicalArticlesUi[pageData.locale];
  const location = useArticleNavigationSnapshot();
  const listPath = `${pageData.locale === "zh-CN" ? "" : `/${pageData.locale}`}/resources/technical-articles`;
  const isListLocation = location.split("?")[0].replace(/\/$/, "") === listPath;
  const params = useMemo(() => new URLSearchParams(location.split("?")[1] ?? ""), [location]);
  const keyword = params.get("q") ?? "";
  const category = params.get("category");
  const activeFilter = useMemo(() => resolveCategoryFilter(pageData, category), [category, pageData]);
  const expandedPrimary = pageData.taxonomy.find((group) =>
    params.has("expanded") ? group.key === params.get("expanded") :
      group.key === category || group.children.some((child) => child.key === category),
  )?.key ?? null;
  const requestedPage = Number(params.get("page") ?? "1");
  const currentPage = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const restored = useRef(false);
  const pendingScroll = useRef<number | null | undefined>(undefined);

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

  useEffect(() => {
    if (!isListLocation) return;
    if (params.has("page") && params.get("page") !== String(safeCurrentPage)) {
      const next = new URLSearchParams(params);
      if (safeCurrentPage === 1) next.delete("page");
      else next.set("page", String(safeCurrentPage));
      replaceArticleListQuery(next);
    }
  }, [isListLocation, params, safeCurrentPage]);

  useEffect(() => {
    if (!isListLocation || restored.current) return;
    if (pendingScroll.current === undefined) pendingScroll.current = takeArticleListScroll(location);
    const scrollY = pendingScroll.current;
    // Wait until the URL-derived article rows have committed before restoring.
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        restored.current = true;
        if (scrollY !== null) window.scrollTo({ top: scrollY, behavior: "instant" });
      });
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [isListLocation, location]);

  const pagedArticles = useMemo(() => {
    const startIndex =
      (safeCurrentPage - 1) * TECHNICAL_ARTICLES_PAGE_SIZE;

    return filteredArticles.slice(
      startIndex,
      startIndex + TECHNICAL_ARTICLES_PAGE_SIZE,
    );
  }, [filteredArticles, safeCurrentPage]);

  function handleKeywordChange(value: string) {
    updateList({ q: value, page: null });
  }

  function updateList(values: Record<string, string | null>) {
    const next = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(values)) {
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
    }
    replaceArticleListQuery(next);
  }

  function handleAllArticles() {
    updateList({ category: null, expanded: null, page: null });
  }

  function handlePrimaryCategory(key: TechnicalArticlePrimaryCategory) {
    updateList({ category: key, expanded: expandedPrimary === key ? "none" : key, page: null });
  }

  function handleSecondaryCategory(
    primaryKey: TechnicalArticlePrimaryCategory,
    secondaryKey: TechnicalArticleSecondaryCategory,
  ) {
    updateList({ category: secondaryKey, expanded: primaryKey, page: null });
  }

  function handlePageChange(page: number) {
    updateList({ page: String(Math.max(1, Math.min(page, totalPages))) });
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
          historyKey={`technical-articles:${pageData.locale}`}
          historyLocale={pageData.locale}
          showRecentKeywords
        />
      </section>

      <section className="technicalArticlesContentSection">
        <ResourceCategorySidebar
          title={ui?.categories ?? (pageData.locale === "zh-CN" ? "技术分类" : "Technical Categories")}
          items={[
            {
              id: "all",
              label: allArticlesLabel,
              countLabel: formatArticleCount(pageData.locale, pageData.articles.length),
              active: activeFilter.type === "all",
              onSelect: handleAllArticles,
            },
            ...pageData.taxonomy.map((primary) => ({
              id: primary.key,
              label: primary.label,
              countLabel: formatArticleCount(pageData.locale, categoryCounts.primary.get(primary.key) ?? 0),
              active: activeFilter.type === "primary" && activeFilter.key === primary.key,
              expanded: expandedPrimary === primary.key,
              onSelect: () => handlePrimaryCategory(primary.key),
              children: primary.children.map((secondary) => ({
                id: secondary.key,
                label: secondary.label,
                countLabel: formatArticleCount(pageData.locale, categoryCounts.secondary.get(secondary.key) ?? 0),
                active: activeFilter.type === "secondary" && activeFilter.key === secondary.key,
                onSelect: () => handleSecondaryCategory(primary.key, secondary.key),
              })),
            })),
          ]}
        />

        <div className="technicalArticlesMain">
          {filteredArticles.length > 0 ? (
            <>
              <div className={articleListStyles.list}>
                {pagedArticles.map((article) => (
                  <TechnicalArticleListItem
                    key={article.id}
                    article={article}
                    tags={article.tags}
                    href={getArticleHref(pageData.locale, article.slug)}
                    categoryLabel={getCategoryPathLabel(pageData, article)}
                  />
                ))}
              </div>

              <ResourcePagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                ariaLabel={pageData.locale === "zh-CN" ? "技术文章分页" : paginationUi?.pagination ?? "Technical articles pagination"}
                previousLabel={paginationUi?.previous ?? (pageData.locale === "zh-CN" ? "上一页" : "Previous")}
                nextLabel={paginationUi?.next ?? (pageData.locale === "zh-CN" ? "下一页" : "Next")}
                onPageChange={handlePageChange}
              />
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
