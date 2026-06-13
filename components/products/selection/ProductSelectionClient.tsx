"use client";

/* =========================================================
   ProductSelectionClient.tsx
   恒永达官网｜产品中心选型页客户端组件

   说明：
   1. 本文件只保留状态、筛选、搜索、分页和数据逻辑
   2. 筛选栏 / 产品卡片 / 分页 / 分类按钮已拆成通用模板组件
   3. 数据来源为 Excel 解析生成的数据文件
========================================================= */

import SitePageShell from "@/components/layout/SitePageShell";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
import {
  selectionFilterLabels,
  selectionProducts,
  selectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";

import ProductCardGrid from "./ProductCardGrid";
import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductEmptyState from "./ProductEmptyState";
import ProductFilterPanel from "./ProductFilterPanel";
import ProductSelectionPagination from "./ProductSelectionPagination";
import ProductSelectionToolbar from "./ProductSelectionToolbar";

import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
  SelectionFilterKey,
  SelectionLocale,
} from "@/data/products/selection/product-selection.types";

import type {
  ProductSelectionCategoryItem,
  ProductSelectionFilterGroup,
  ProductSelectionSelectedTag,
} from "./product-selection-ui.types";

type ProductSelectionClientProps = {
  locale?: SelectionLocale;
  pageData?: unknown;
};

type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;

const FILTER_KEYS: SelectionFilterKey[] = [
  "filter01",
  "filter02",
  "filter03",
  "filter04",
  "filter05",
  "filter06",
  "filter07",
  "filter08",
];

const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  zh: {
    breadcrumbHome: "首页",
    breadcrumbCurrent: "产品中心",
    searchPlaceholder: "搜索产品名称、系列、量程、材质等关键词",
    searchButton: "搜索",
    mobileCategoryPrefix: "产品大类：",
    productTypeLabel: "产品类型",
    resultPrefix: "已找到 ",
    resultSuffix: " 个基础配置",
    resetFilters: "清除筛选",
    submitRequirement: "提交需求",
    detailButton: "查看详情",
    addToList: "加入清单",
    addedToList: "已加入清单",
    previousPage: "上一页",
    nextPage: "下一页",
    filterEmpty: "当前产品大类暂无可用筛选项。",
    emptyTitle: "暂无匹配配置",
    emptyDescription: "可以减少筛选条件，或提交需求由工程师协助确认。",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Product Center",
    searchPlaceholder: "Search by product name, series, volume, material, or keyword",
    searchButton: "Search",
    mobileCategoryPrefix: "Category: ",
    productTypeLabel: "Product Type",
    resultPrefix: "",
    resultSuffix: " configurations found",
    resetFilters: "Clear Filters",
    submitRequirement: "Submit Request",
    detailButton: "View Details",
    addToList: "Add to List",
    addedToList: "Added",
    previousPage: "Previous",
    nextPage: "Next",
    filterEmpty: "No filters are available for this category.",
    emptyTitle: "No matching configurations",
    emptyDescription: "Try removing some filters or submit your requirements for engineering support.",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Centro de productos",
    searchPlaceholder: "Buscar por producto, serie, volumen, material o palabra clave",
    searchButton: "Buscar",
    mobileCategoryPrefix: "Categoría: ",
    productTypeLabel: "Tipo de producto",
    resultPrefix: "",
    resultSuffix: " configuraciones encontradas",
    resetFilters: "Borrar filtros",
    submitRequirement: "Enviar solicitud",
    detailButton: "Ver detalles",
    addToList: "Añadir",
    addedToList: "Añadido",
    previousPage: "Anterior",
    nextPage: "Siguiente",
    filterEmpty: "No hay filtros disponibles para esta categoría.",
    emptyTitle: "No hay configuraciones coincidentes",
    emptyDescription: "Reduzca los filtros o envíe sus requisitos para recibir soporte técnico.",
  },
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Centre produits",
    searchPlaceholder: "Rechercher par produit, série, volume, matériau ou mot-clé",
    searchButton: "Rechercher",
    mobileCategoryPrefix: "Catégorie : ",
    productTypeLabel: "Type de produit",
    resultPrefix: "",
    resultSuffix: " configurations trouvées",
    resetFilters: "Effacer les filtres",
    submitRequirement: "Envoyer une demande",
    detailButton: "Voir les détails",
    addToList: "Ajouter",
    addedToList: "Ajouté",
    previousPage: "Précédent",
    nextPage: "Suivant",
    filterEmpty: "Aucun filtre disponible pour cette catégorie.",
    emptyTitle: "Aucune configuration correspondante",
    emptyDescription: "Réduisez les filtres ou envoyez vos besoins pour obtenir une assistance technique.",
  },
  ko: {
    breadcrumbHome: "홈",
    breadcrumbCurrent: "제품 센터",
    searchPlaceholder: "제품명, 시리즈, 용량, 재질 또는 키워드로 검색",
    searchButton: "검색",
    mobileCategoryPrefix: "제품 분류: ",
    productTypeLabel: "제품 유형",
    resultPrefix: "",
    resultSuffix: "개 기본 구성을 찾았습니다",
    resetFilters: "필터 초기화",
    submitRequirement: "요청 제출",
    detailButton: "상세 보기",
    addToList: "목록 추가",
    addedToList: "추가됨",
    previousPage: "이전",
    nextPage: "다음",
    filterEmpty: "이 제품 분류에는 사용할 수 있는 필터가 없습니다.",
    emptyTitle: "일치하는 구성이 없습니다",
    emptyDescription: "필터를 줄이거나 요구사항을 제출해 엔지니어 지원을 받아보세요.",
  },
  ru: {
    breadcrumbHome: "Главная",
    breadcrumbCurrent: "Центр продуктов",
    searchPlaceholder: "Поиск по названию, серии, объему, материалу или ключевому слову",
    searchButton: "Поиск",
    mobileCategoryPrefix: "Категория: ",
    productTypeLabel: "Тип продукта",
    resultPrefix: "Найдено ",
    resultSuffix: " конфигураций",
    resetFilters: "Сбросить фильтры",
    submitRequirement: "Отправить запрос",
    detailButton: "Подробнее",
    addToList: "В список",
    addedToList: "Добавлено",
    previousPage: "Назад",
    nextPage: "Далее",
    filterEmpty: "Для этой категории нет доступных фильтров.",
    emptyTitle: "Нет подходящих конфигураций",
    emptyDescription: "Уменьшите количество фильтров или отправьте требования для инженерной поддержки.",
  },
};

const DEFAULT_CATEGORIES: ProductSelectionCategoryItem[] = [
  {
    id: "pumps",
    label: "泵系列",
    description: "根据泵类型、系列、量程和核心筛选项选择基础配置。",
    sortOrder: 10,
  },
  {
    id: "valves",
    label: "阀系列",
    description: "根据阀类型、系列、通路、位数和材质选择基础配置。",
    sortOrder: 20,
  },
  {
    id: "needles",
    label: "针系列",
    description: "根据针类型、规格和应用场景选择基础配置。",
    sortOrder: 30,
  },
  {
    id: "fittings",
    label: "接头系列",
    description: "根据接头类型、管径、螺纹和材质选择基础配置。",
    sortOrder: 40,
  },
  {
    id: "tubing",
    label: "管路系列",
    description: "根据管材、外径、内径和应用需求选择基础配置。",
    sortOrder: 50,
  },
  {
    id: "control",
    label: "智控系列",
    description: "根据控制方式、驱动类型和系统接口选择基础配置。",
    sortOrder: 60,
  },
];

function getText(
  locale: SelectionLocale,
  value: Partial<Record<SelectionLocale, string>> | undefined,
  fallback = ""
) {
  if (!value) return fallback;

  return value[locale] || value.zh || value.en || fallback;
}

function getTaxonomyLabel(locale: SelectionLocale, id: string) {
  const item = selectionTaxonomyItems.find((entry) => entry.id === id);

  return getText(locale, item?.label, id);
}

function getCategoryItems(locale: SelectionLocale) {
  const generatedCategories = selectionTaxonomyItems
    .filter((item) => item.type === "category")
    .map((item) => {
      const fallback = DEFAULT_CATEGORIES.find(
        (category) => category.id === item.id
      );

      return {
        id: item.id,
        label: getText(locale, item.label, fallback?.label || item.id),
        description:
          fallback?.description ||
          "根据产品类型、系列和筛选条件选择基础配置。",
        sortOrder: item.sortOrder,
      };
    });

  const categoryMap = new Map<string, ProductSelectionCategoryItem>();

  DEFAULT_CATEGORIES.forEach((category) => {
    categoryMap.set(category.id, category);
  });

  generatedCategories.forEach((category) => {
    categoryMap.set(category.id, category);
  });

  return Array.from(categoryMap.values()).sort(
    (current, next) => current.sortOrder - next.sortOrder
  );
}

function getProductsByCategory(categoryId: string) {
  return selectionProducts
    .filter((product) => {
      return product.categoryId === categoryId && product.status === "active";
    })
    .sort((current, next) => current.sortOrder - next.sortOrder);
}

function getFirstProductTypeId(categoryId: string) {
  const products = getProductsByCategory(categoryId);
  const first = products[0];

  return first?.productTypeId || "";
}

function getVisibleFilterLabels(productTypeId: string) {
  return selectionFilterLabels
    .filter((item) => item.productTypeId === productTypeId && item.visible)
    .sort((current, next) => current.sortOrder - next.sortOrder);
}

function getFilterOptions(
  products: ProductSelectionProduct[],
  filterKey: SelectionFilterKey
) {
  const optionMap = new Map<string, { value: string; label: string }>();

  products.forEach((product) => {
    const value = product.filters[filterKey];

    if (!value) return;

    if (!optionMap.has(value)) {
      optionMap.set(value, {
        value,
        label: value,
      });
    }
  });

  return Array.from(optionMap.values());
}

function getDefaultSelectedFilters(
  categoryId: string,
  productTypeId: string
): SelectedFilterMap {
  if (!productTypeId) {
    return {};
  }

  const products = getProductsByCategory(categoryId).filter((product) => {
    return product.productTypeId === productTypeId;
  });

  const selected: SelectedFilterMap = {};
  const labels = getVisibleFilterLabels(productTypeId);

  labels.forEach((label) => {
    const options = getFilterOptions(products, label.filterKey);

    if (label.inputType === "single" && options.length === 1) {
      selected[label.filterKey] = new Set([options[0].value]);
    }
  });

  return selected;
}

function getResponsiveProductPageSize() {
  if (typeof window === "undefined") {
    return 12;
  }

  const width = window.innerWidth;

  if (width <= 760) {
    return 6;
  }

  if (width <= 1280) {
    return 9;
  }

  return 12;
}

function getDefaultMobileOpenFilterGroups(productTypeId: string) {
  const openGroups: Record<string, boolean> = {
    productType: false,
  };

  getVisibleFilterLabels(productTypeId).forEach((filter) => {
    openGroups[filter.filterKey] = false;
  });

  return openGroups;
}

function makeDetailHref(product: ProductSelectionProduct) {
  return `/products/${product.categoryId}/${product.detailSlug}`;
}

export default function ProductSelectionClient({
  locale = "zh",
}: ProductSelectionClientProps) {
  const searchParams = useSearchParams();
  const requestedCategoryId = searchParams.get("category");
  const requestedProductTypeId = searchParams.get("productType");

  const pageText =
    PRODUCT_SELECTION_PAGE_TEXT[locale] || PRODUCT_SELECTION_PAGE_TEXT.zh;

  const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);

  const [activeCategoryId, setActiveCategoryId] = useState(() => {
    return categoryItems[0]?.id || "pumps";
  });

  const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
    return getFirstProductTypeId(categoryItems[0]?.id || "pumps");
  });

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
    () =>
      getDefaultSelectedFilters(
        categoryItems[0]?.id || "pumps",
        getFirstProductTypeId(categoryItems[0]?.id || "pumps")
      )
  );

  const [selectedList, setSelectedList] = useState<Set<string>>(() => new Set());
  const [searchKeyword, setSearchKeyword] = useState("");
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [mobileOpenFilterGroups, setMobileOpenFilterGroups] = useState<
    Record<string, boolean>
  >(() => getDefaultMobileOpenFilterGroups(getFirstProductTypeId("pumps")));
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [productsPageSize, setProductsPageSize] = useState(12);

  const activeCategory = useMemo(() => {
    return (
      categoryItems.find((category) => category.id === activeCategoryId) ||
      categoryItems[0] ||
      DEFAULT_CATEGORIES[0]
    );
  }, [activeCategoryId, categoryItems]);

  const categoryProducts = useMemo(() => {
    return getProductsByCategory(activeCategoryId);
  }, [activeCategoryId]);

  const productTypeOptions = useMemo(() => {
    const optionMap = new Map<string, { value: string; label: string }>();

    categoryProducts.forEach((product) => {
      if (!product.productTypeId) return;

      if (!optionMap.has(product.productTypeId)) {
        optionMap.set(product.productTypeId, {
          value: product.productTypeId,
          label: getTaxonomyLabel(locale, product.productTypeId),
        });
      }
    });

    return Array.from(optionMap.values());
  }, [categoryProducts, locale]);

  const currentTypeProducts = useMemo(() => {
    if (!activeProductTypeId) {
      return categoryProducts;
    }

    return categoryProducts.filter((product) => {
      return product.productTypeId === activeProductTypeId;
    });
  }, [activeProductTypeId, categoryProducts]);

  const activeFilterLabels = useMemo(() => {
    return getVisibleFilterLabels(activeProductTypeId);
  }, [activeProductTypeId]);

  const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
    const groups: ProductSelectionFilterGroup[] = [];

    if (productTypeOptions.length > 0) {
      groups.push({
        key: "productType",
        title: pageText.productTypeLabel,
        inputType: "single",
        options: productTypeOptions,
      });
    }

    activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
      const options = getFilterOptions(currentTypeProducts, label.filterKey);

      if (options.length === 0) return;

      groups.push({
        key: label.filterKey,
        title: getText(locale, label.label, label.filterKey),
        inputType: label.inputType,
        options,
      });
    });

    return groups;
  }, [activeFilterLabels, currentTypeProducts, locale, productTypeOptions]);

  const matchedProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return categoryProducts.filter((product) => {
      if (activeProductTypeId && product.productTypeId !== activeProductTypeId) {
        return false;
      }

      const filterMatched = FILTER_KEYS.every((filterKey) => {
        const selectedValues = selectedFilters[filterKey];

        if (!selectedValues || selectedValues.size === 0) {
          return true;
        }

        const value = product.filters[filterKey];

        return Boolean(value && selectedValues.has(value));
      });

      if (!filterMatched) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      const searchText = [
        product.productId,
        product.categoryId,
        product.productTypeId,
        product.seriesId,
        product.detailSlug,
        product.cardTitle.zh,
        product.cardTitle.en,
        product.cardSubtitle.zh,
        product.cardSubtitle.en,
        product.searchKeywords.zh,
        product.searchKeywords.en,
        ...Object.values(product.filters),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchText.includes(keyword);
    });
  }, [activeProductTypeId, categoryProducts, searchKeyword, selectedFilters]);

  const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
    const tags: ProductSelectionSelectedTag[] = [];

    if (activeProductTypeId) {
      tags.push({
        key: "productType",
        value: activeProductTypeId,
        label: getTaxonomyLabel(locale, activeProductTypeId),
      });
    }

    FILTER_KEYS.forEach((filterKey) => {
      const values = selectedFilters[filterKey];

      if (!values || values.size === 0) return;

      values.forEach((value) => {
        tags.push({
          key: filterKey,
          value,
          label: value,
        });
      });
    });

    return tags;
  }, [activeProductTypeId, locale, selectedFilters]);

  const totalProductPages = Math.max(
    1,
    Math.ceil(matchedProducts.length / productsPageSize)
  );

  const safeCurrentProductPage = Math.min(
    currentProductPage,
    totalProductPages
  );

  const pagedProducts = matchedProducts.slice(
    (safeCurrentProductPage - 1) * productsPageSize,
    safeCurrentProductPage * productsPageSize
  );

  useEffect(() => {
    function updateProductsPageSize() {
      setProductsPageSize(getResponsiveProductPageSize());
    }

    updateProductsPageSize();

    window.addEventListener("resize", updateProductsPageSize);

    return () => {
      window.removeEventListener("resize", updateProductsPageSize);
    };
  }, []);

  useEffect(() => {
    const fallbackCategoryId = categoryItems[0]?.id || "pumps";

    const nextCategoryId =
      requestedCategoryId &&
      categoryItems.some((category) => category.id === requestedCategoryId)
        ? requestedCategoryId
        : fallbackCategoryId;

    const categoryProductsForUrl = getProductsByCategory(nextCategoryId);

    const nextProductTypeId =
      requestedProductTypeId &&
      categoryProductsForUrl.some(
        (product) => product.productTypeId === requestedProductTypeId
      )
        ? requestedProductTypeId
        : getFirstProductTypeId(nextCategoryId);

    setActiveCategoryId(nextCategoryId);
    setActiveProductTypeId(nextProductTypeId);
    setSelectedFilters(
      getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
    );
    setSearchKeyword("");
    setMobileCategoryOpen(false);
    setMobileOpenFilterGroups(
      getDefaultMobileOpenFilterGroups(nextProductTypeId)
    );
  }, [categoryItems, requestedCategoryId, requestedProductTypeId]);

  useEffect(() => {
    setCurrentProductPage(1);
  }, [
    activeCategoryId,
    activeProductTypeId,
    selectedFilters,
    searchKeyword,
    productsPageSize,
  ]);

  function handleCategoryChange(categoryId: string) {
    const firstProductTypeId = getFirstProductTypeId(categoryId);

    setActiveCategoryId(categoryId);
    setActiveProductTypeId(firstProductTypeId);
    setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
    setSearchKeyword("");
    setMobileCategoryOpen(false);
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
  }

  function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
    setMobileOpenFilterGroups((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function handleProductTypeChange(productTypeId: string) {
    setActiveProductTypeId(productTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
  }

  function handleFilterChange(
    group: ProductSelectionFilterGroup,
    value: string
  ) {
    if (group.key === "productType") {
      handleProductTypeChange(value);
      return;
    }

    const filterKey = group.key;

    setSelectedFilters((current) => {
      const next: SelectedFilterMap = {
        ...current,
      };

      const currentValues = new Set(next[filterKey] || []);

      if (group.inputType === "single") {
        next[filterKey] = new Set([value]);
      } else if (currentValues.has(value)) {
        currentValues.delete(value);
        next[filterKey] = currentValues;
      } else {
        currentValues.add(value);
        next[filterKey] = currentValues;
      }

      return next;
    });

    setMobileOpenFilterGroups((current) => ({
      ...current,
      [filterKey]: false,
    }));
  }

  function isFilterOptionActive(
    group: ProductSelectionFilterGroup,
    value: string
  ) {
    if (group.key === "productType") {
      return activeProductTypeId === value;
    }

    return Boolean(selectedFilters[group.key]?.has(value));
  }

  function removeSelectedTag(
    key: ProductSelectionSelectedTag["key"],
    value: string
  ) {
    if (key === "productType") {
      setActiveProductTypeId("");
      setSelectedFilters({});
      return;
    }

    setSelectedFilters((current) => {
      const next: SelectedFilterMap = {
        ...current,
      };

      const values = new Set(next[key] || []);
      values.delete(value);

      next[key] = values;

      return next;
    });
  }

  function resetCurrentFilters() {
    const firstProductTypeId = getFirstProductTypeId(activeCategoryId);

    setActiveProductTypeId(firstProductTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
    setSearchKeyword("");
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
  }

  function toggleProductInList(productId: string) {
    setSelectedList((current) => {
      const next = new Set(current);

      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }

      return next;
    });
  }

  return (
    <div data-product-breadcrumb-shell="true" data-product-center-page="true">
<SitePageShell
      breadcrumbAriaLabel={
        locale === "zh" ? "面包屑导航" : "Breadcrumb"
      }
      breadcrumbItems={[
        {
          label: pageText.breadcrumbHome,
          href: locale === "zh" ? "/" : `/${locale}`,
        },
        {
          label: pageText.breadcrumbCurrent,
        },
      ]}
    >
      <main className="products-selection-page page">
      <div className="container">
        

        <ResourceSearchBar
          value={searchKeyword}
          onChange={setSearchKeyword}
          onSearch={setSearchKeyword}
          placeholder={pageText.searchPlaceholder}
          searchButtonText={pageText.searchButton}
          showRecentKeywords={false}
        />

        <ProductCategoryTabs
          categories={categoryItems}
          activeCategoryId={activeCategoryId}
          activeCategoryLabel={activeCategory.label}
          mobileCategoryOpen={mobileCategoryOpen}
          mobileCategoryPrefix={pageText.mobileCategoryPrefix}
          onToggleMobileCategory={() =>
            setMobileCategoryOpen((current) => !current)
          }
          onCategoryChange={handleCategoryChange}
        />

        <section className="selection-section">
          <div className="selection-layout">
            <ProductFilterPanel
              activeCategory={activeCategory}
              filterGroups={filterGroups}
              mobileOpenFilterGroups={mobileOpenFilterGroups}
              onToggleMobileGroup={toggleMobileFilterGroup}
              isOptionActive={isFilterOptionActive}
              onFilterChange={handleFilterChange}
              emptyText={pageText.filterEmpty}
              resetButtonText={pageText.resetFilters}
              submitButtonText={pageText.submitRequirement}
              onResetFilters={resetCurrentFilters}
            />

            <section className="product-area">
              <ProductSelectionToolbar
                total={matchedProducts.length}
                resultPrefix={pageText.resultPrefix}
                resultSuffix={pageText.resultSuffix}
                resetButtonText={pageText.resetFilters}
                selectedTags={selectedTagItems}
                onRemoveTag={removeSelectedTag}
                onResetFilters={resetCurrentFilters}
              />

              {matchedProducts.length > 0 ? (
                <>
                  <ProductCardGrid
                    products={pagedProducts}
                    selectedList={selectedList}
                    detailButtonText={pageText.detailButton}
                    addToListText={pageText.addToList}
                    addedToListText={pageText.addedToList}
                    getTitle={(product) =>
                      getText(locale, product.cardTitle, product.productId)
                    }
                    getSubtitle={(product) =>
                      getText(locale, product.cardSubtitle, "")
                    }
                    getDetailHref={makeDetailHref}
                    onToggleList={toggleProductInList}
                  />

                  <ProductSelectionPagination
                    currentPage={safeCurrentProductPage}
                    totalPages={totalProductPages}
                    previousText={pageText.previousPage}
                    nextText={pageText.nextPage}
                    onPageChange={setCurrentProductPage}
                  />
                </>
              ) : (
                <ProductEmptyState
                  title={pageText.emptyTitle}
                  description={pageText.emptyDescription}
                />
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
    </SitePageShell>
</div>
  );
}
