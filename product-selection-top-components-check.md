# 产品中心顶部组件检查

## 1. ProductCategoryTabs.tsx 完整内容

"use client";

import type { ProductSelectionCategoryItem } from "./product-selection-ui.types";

type ProductCategoryTabsProps = {
  categories: ProductSelectionCategoryItem[];
  activeCategoryId: string;
  activeCategoryLabel: string;
  mobileCategoryOpen: boolean;
  mobileCategoryPrefix: string;
  onToggleMobileCategory: () => void;
  onCategoryChange: (categoryId: string) => void;
};

export default function ProductCategoryTabs({
  categories,
  activeCategoryId,
  activeCategoryLabel,
  mobileCategoryOpen,
  mobileCategoryPrefix,
  onToggleMobileCategory,
  onCategoryChange,
}: ProductCategoryTabsProps) {
  return (
    <section
      className={`category-tabs-wrap ${
        mobileCategoryOpen ? "is-mobile-open" : ""
      }`}
    >
      <button
        className="mobile-category-trigger"
        type="button"
        onClick={onToggleMobileCategory}
      >
        <span>
          {mobileCategoryPrefix}
          {activeCategoryLabel}
        </span>
        <span className="mobile-category-symbol">
          {mobileCategoryOpen ? "-" : "+"}
        </span>
      </button>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            className={`category-tab ${
              activeCategoryId === category.id ? "active" : ""
            }`}
            type="button"
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </section>
  );
}

---

## 2. ResourceSearchBar.tsx 完整内容

"use client";

/* =========================================================
   ResourceSearchBar.tsx
   鎭掓案杈惧畼缃戯綔璧勬簮涓績閫氱敤鎼滅储鏍忕粍浠?
   鏂囦欢璺緞锛?   components/resources/ResourceSearchBar.tsx

   浣滅敤锛?   1. 缁熶竴璧勬簮涓績鎼滅储鏍忕粨鏋?   2. 鏂伴椈銆佹妧鏈枃绔犮€佽鏍间功涓嬭浇銆佹潗鏂欏吋瀹圭瓑椤甸潰閮藉彲浠ュ鐢?   3. 鎼滅储鏍忔牱寮忕敱 ResourceSearchBar.module.css 绠＄悊
   4. 椤甸潰鍙礋璐ｄ紶鍏?value / onChange / onSearch
========================================================= */

import type { FormEvent } from "react";

import styles from "./ResourceSearchBar.module.css";

export type ResourceSearchBarClassNames = {
  root?: string;
  form?: string;
  input?: string;
  button?: string;
  recent?: string;
  recentLabel?: string;
  recentButton?: string;
};

export type ResourceSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  searchButtonText?: string;
  recentLabel?: string;
  recentKeywords?: string[];
  showRecentKeywords?: boolean;
  classNames?: ResourceSearchBarClassNames;
};

function normalizeKeyword(value: string) {
  return value.trim().toUpperCase();
}

export default function ResourceSearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "璇疯緭鍏ヤ骇鍝?,
  searchButtonText = "鎼滅储",
  recentLabel = "鏈€杩戞悳绱?,
  recentKeywords = ["鏌卞娉?, "Q20", "鐢电闃€", "楂樺帇闃€", "鍘嬪姏浼犳劅鍣?],
  showRecentKeywords = true,
  classNames = {},
}: ResourceSearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(value.trim());
  }

  function handleRecentKeywordClick(keyword: string) {
    onChange(keyword);
    onSearch(keyword);
  }

  const rootClassName = classNames.root ?? styles.searchPanel;
  const formClassName = classNames.form ?? styles.searchRow;
  const inputClassName = classNames.input ?? styles.searchInput;
  const buttonClassName = classNames.button ?? styles.searchButton;
  const recentClassName = classNames.recent ?? styles.historyRow;
  const recentLabelClassName = classNames.recentLabel ?? styles.historyLabel;
  const recentButtonClassName =
    classNames.recentButton ?? styles.historyButton;

  return (
    <section className={rootClassName}>
      <form className={formClassName} onSubmit={handleSubmit}>
        <input
          className={inputClassName}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />

        <button className={buttonClassName} type="submit">
          {searchButtonText}
        </button>
      </form>

      {showRecentKeywords && recentKeywords.length > 0 ? (
        <div className={recentClassName}>
          <span className={recentLabelClassName}>{recentLabel}</span>

          {recentKeywords.map((keyword) => {
            const isActive =
              normalizeKeyword(value) === normalizeKeyword(keyword);

            return (
              <button
                key={keyword}
                className={`${recentButtonClassName} ${
                  isActive ? styles.active : ""
                }`}
                type="button"
                onClick={() => handleRecentKeywordClick(keyword)}
              >
                {keyword}
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

---

## 3. ProductSelectionClient 当前 return 区域


### Line 5

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";

import SitePageShell from "@/components/layout/SitePageShell";
import {
  getProductTypeFilterOptionsByCategory,
  getProductTypeHrefByIds,
  getSeriesFilterOptionsByProductType,
  getSeriesHrefByFilterValue,
  hasProductTypeRouteByIds,
} from "@/data/products/selection/product-route-map";
import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
import {
  selectionFilterLabels as baseSelectionFilterLabels,
  selectionProducts as baseSelectionProducts,
  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import {
  diaphragmPumpSelectionProducts,
  diaphragmPumpTaxonomyItems,
  diaphragmPumpFilterLabels,
} from "@/data/products/selection/diaphragm-pump-selection.generated";


import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

import ProductCardGrid from "./ProductCardGrid";
import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductEmptyState from "./ProductEmptyState";
import ProductFilterPanel from "./ProductFilterPanel";
import ProductSelectionPagination from "./ProductSelectionPagination";
import ProductSelectionToolbar from "./ProductSelectionToolbar";


### Line 9

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";

import SitePageShell from "@/components/layout/SitePageShell";
import {
  getProductTypeFilterOptionsByCategory,
  getProductTypeHrefByIds,
  getSeriesFilterOptionsByProductType,
  getSeriesHrefByFilterValue,
  hasProductTypeRouteByIds,
} from "@/data/products/selection/product-route-map";
import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
import {
  selectionFilterLabels as baseSelectionFilterLabels,
  selectionProducts as baseSelectionProducts,
  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import {
  diaphragmPumpSelectionProducts,
  diaphragmPumpTaxonomyItems,
  diaphragmPumpFilterLabels,
} from "@/data/products/selection/diaphragm-pump-selection.generated";


import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

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

### Line 34

import {
  diaphragmPumpSelectionProducts,
  diaphragmPumpTaxonomyItems,
  diaphragmPumpFilterLabels,
} from "@/data/products/selection/diaphragm-pump-selection.generated";


import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

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



const selectionProducts = [
  ...baseSelectionProducts,
  ...diaphragmPumpSelectionProducts,
].filter((product, index, array) => {
  return index === array.findIndex((item) => item.productId === product.productId);
});

const selectionTaxonomyItems = [
  ...baseSelectionTaxonomyItems,
  ...diaphragmPumpTaxonomyItems,
].filter((item, index, array) => {
  return index === array.findIndex((entry) => entry.id === item.id);
});


### Line 36

  diaphragmPumpTaxonomyItems,
  diaphragmPumpFilterLabels,
} from "@/data/products/selection/diaphragm-pump-selection.generated";


import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

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



const selectionProducts = [
  ...baseSelectionProducts,
  ...diaphragmPumpSelectionProducts,
].filter((product, index, array) => {
  return index === array.findIndex((item) => item.productId === product.productId);
});

const selectionTaxonomyItems = [
  ...baseSelectionTaxonomyItems,
  ...diaphragmPumpTaxonomyItems,
].filter((item, index, array) => {
  return index === array.findIndex((entry) => entry.id === item.id);
});

const selectionFilterLabels = [
  ...baseSelectionFilterLabels,

### Line 38

} from "@/data/products/selection/diaphragm-pump-selection.generated";


import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

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



const selectionProducts = [
  ...baseSelectionProducts,
  ...diaphragmPumpSelectionProducts,
].filter((product, index, array) => {
  return index === array.findIndex((item) => item.productId === product.productId);
});

const selectionTaxonomyItems = [
  ...baseSelectionTaxonomyItems,
  ...diaphragmPumpTaxonomyItems,
].filter((item, index, array) => {
  return index === array.findIndex((entry) => entry.id === item.id);
});

const selectionFilterLabels = [
  ...baseSelectionFilterLabels,
  ...diaphragmPumpFilterLabels,
].filter((label, index, array) => {

### Line 73

  ...baseSelectionTaxonomyItems,
  ...diaphragmPumpTaxonomyItems,
].filter((item, index, array) => {
  return index === array.findIndex((entry) => entry.id === item.id);
});

const selectionFilterLabels = [
  ...baseSelectionFilterLabels,
  ...diaphragmPumpFilterLabels,
].filter((label, index, array) => {
  return (
    index ===
    array.findIndex((item) => {
      return (
        item.productTypeId === label.productTypeId &&
        item.filterKey === label.filterKey
      );
    })
  );
});

type ProductSelectionClientProps = {
  locale?: SelectionLocale;
  pageData?: unknown;
  initialCategoryId?: string;
  initialProductTypeId?: string;
  initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
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

### Line 76

  return index === array.findIndex((entry) => entry.id === item.id);
});

const selectionFilterLabels = [
  ...baseSelectionFilterLabels,
  ...diaphragmPumpFilterLabels,
].filter((label, index, array) => {
  return (
    index ===
    array.findIndex((item) => {
      return (
        item.productTypeId === label.productTypeId &&
        item.filterKey === label.filterKey
      );
    })
  );
});

type ProductSelectionClientProps = {
  locale?: SelectionLocale;
  pageData?: unknown;
  initialCategoryId?: string;
  initialProductTypeId?: string;
  initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
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

### Line 320


  return Array.from(categoryMap.values()).sort(
    (current, next) => current.sortOrder - next.sortOrder
  );
}

function getProductsByCategory(categoryId: string) {
  return selectionProducts
    .filter((product) => product.categoryId === categoryId)
    .filter((product, index, array) => {
      return (
        index ===
        array.findIndex((item) => item.productId === product.productId)
      );
    });
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
  filterKey: SelectionFilterKey,
  selectedFilters: SelectedFilterMap,
  productTypeId: string
) {
  return getProductFilterOptions({
    productTypeId,
    products,
    filterKey,
    selectedFilters,
  });
}
function getDefaultSelectedFilters(
  _categoryId: string,

### Line 648

      initialCategoryId || categoryItems[0]?.id || "pumps";
    const initialActiveProductTypeId =
      initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

    return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);
  });
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

    /*
     * 说明：
     * 1. 先读取已有产品数据中的产品类型
     * 2. 这部分用于已经有产品卡片的数据，例如 EA 柱塞泵
     */
    categoryProducts.forEach((product) => {
      if (!product.productTypeId) return;

      if (!optionMap.has(product.productTypeId)) {
        optionMap.set(product.productTypeId, {
          value: product.productTypeId,
          label: getTaxonomyLabel(locale, product.productTypeId),
        });
      }
    });

    /*
     * 说明：
     * 1. 再从 product-route-map.ts 补充正式产品类型入口
     * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
     * 3. 左侧“产品类型”里也会先显示对应入口

### Line 856


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
    const preferredCategoryId = requestedCategoryId || initialCategoryId;

    const nextCategoryId =
      preferredCategoryId &&
      categoryItems.some((category) => category.id === preferredCategoryId)
        ? preferredCategoryId
        : fallbackCategoryId;

    const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
    const preferredProductTypeId =
      requestedProductTypeId || initialProductTypeId;

    const productTypeExistsInProducts = Boolean(
      preferredProductTypeId &&
        categoryProductsForUrl.some(
          (product) => product.productTypeId === preferredProductTypeId
        )
    );

    const productTypeExistsInRouteMap = Boolean(
      preferredProductTypeId &&
        hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
    );

    const nextProductTypeId =
      preferredProductTypeId &&
      (productTypeExistsInProducts || productTypeExistsInRouteMap)
        ? preferredProductTypeId

### Line 1283

    const currentItem = getItem("pump-selection", product.productId);

    if (currentItem) {
      removeItem(currentItem.id);
      return;
    }

    addItem(createProductCartItem(product));
  }

  return (
    <div className="products-selection-page">
<SitePageShell
        breadcrumbAriaLabel={locale === "zh" ? "面包屑导航" : "Breadcrumb"}
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
        <main className="products-main">
          <div className="products-container">
            {activeProductTypeIntro ? (
              <section
                className="product-type-intro-module"
                aria-label={`${activeProductTypeIntro.title}产品种类说明`}
              >
                <div className="product-type-intro-image">
                  <img
                    src={activeProductTypeIntro.image.src}
                    alt={activeProductTypeIntro.image.alt}
                    loading="lazy"
                  />
                </div>

                <div className="product-type-intro-copy">
                  <h2>{activeProductTypeIntro.title}</h2>
                  {activeProductTypeIntro.paragraphs.map((paragraph) => {
                    const emphasisText = "详情页查看或提交选型需求确认";
                    const emphasisIndex = paragraph.indexOf(emphasisText);


### Line 1285

    if (currentItem) {
      removeItem(currentItem.id);
      return;
    }

    addItem(createProductCartItem(product));
  }

  return (
    <div className="products-selection-page">
<SitePageShell
        breadcrumbAriaLabel={locale === "zh" ? "面包屑导航" : "Breadcrumb"}
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
        <main className="products-main">
          <div className="products-container">
            {activeProductTypeIntro ? (
              <section
                className="product-type-intro-module"
                aria-label={`${activeProductTypeIntro.title}产品种类说明`}
              >
                <div className="product-type-intro-image">
                  <img
                    src={activeProductTypeIntro.image.src}
                    alt={activeProductTypeIntro.image.alt}
                    loading="lazy"
                  />
                </div>

                <div className="product-type-intro-copy">
                  <h2>{activeProductTypeIntro.title}</h2>
                  {activeProductTypeIntro.paragraphs.map((paragraph) => {
                    const emphasisText = "详情页查看或提交选型需求确认";
                    const emphasisIndex = paragraph.indexOf(emphasisText);

                    if (emphasisIndex < 0) {
                      return <p key={paragraph}>{paragraph}</p>;

### Line 1301

          },
          {
            label: pageText.breadcrumbCurrent,
          },
        ]}
      >
        <main className="products-main">
          <div className="products-container">
            {activeProductTypeIntro ? (
              <section
                className="product-type-intro-module"
                aria-label={`${activeProductTypeIntro.title}产品种类说明`}
              >
                <div className="product-type-intro-image">
                  <img
                    src={activeProductTypeIntro.image.src}
                    alt={activeProductTypeIntro.image.alt}
                    loading="lazy"
                  />
                </div>

                <div className="product-type-intro-copy">
                  <h2>{activeProductTypeIntro.title}</h2>
                  {activeProductTypeIntro.paragraphs.map((paragraph) => {
                    const emphasisText = "详情页查看或提交选型需求确认";
                    const emphasisIndex = paragraph.indexOf(emphasisText);

                    if (emphasisIndex < 0) {
                      return <p key={paragraph}>{paragraph}</p>;
                    }

                    return (
                  <p key={paragraph}>
                    {paragraph.slice(0, emphasisIndex)}
                    <strong className="product-type-intro-emphasis">
                      {emphasisText}
                    </strong>
                    {paragraph.slice(emphasisIndex + emphasisText.length)}
                  </p>
                );
              })}
            </div>
          </section>
        ) : null}
        <section className="selection-section">

### Line 1322

                <div className="product-type-intro-copy">
                  <h2>{activeProductTypeIntro.title}</h2>
                  {activeProductTypeIntro.paragraphs.map((paragraph) => {
                    const emphasisText = "详情页查看或提交选型需求确认";
                    const emphasisIndex = paragraph.indexOf(emphasisText);

                    if (emphasisIndex < 0) {
                      return <p key={paragraph}>{paragraph}</p>;
                    }

                    return (
                  <p key={paragraph}>
                    {paragraph.slice(0, emphasisIndex)}
                    <strong className="product-type-intro-emphasis">
                      {emphasisText}
                    </strong>
                    {paragraph.slice(emphasisIndex + emphasisText.length)}
                  </p>
                );
              })}
            </div>
          </section>
        ) : null}
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

### Line 1335

                    <strong className="product-type-intro-emphasis">
                      {emphasisText}
                    </strong>
                    {paragraph.slice(emphasisIndex + emphasisText.length)}
                  </p>
                );
              })}
            </div>
          </section>
        ) : null}
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

### Line 1337

                    </strong>
                    {paragraph.slice(emphasisIndex + emphasisText.length)}
                  </p>
                );
              })}
            </div>
          </section>
        ) : null}
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

### Line 1348

              activeCategory={activeCategory}
              filterGroups={filterGroups}
              mobileOpenFilterGroups={mobileOpenFilterGroups}
              onToggleMobileGroup={toggleMobileFilterGroup}
              isOptionActive={isFilterOptionActive}
              onFilterChange={handleFilterChange}
              emptyText={pageText.filterEmpty}
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

### Line 1395

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












---

## 4. 搜索当前 JSX 中是否已经调用过顶部组件


### Line 283


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

### Line 504

    product.seriesId,
    product.filters?.filter01,
    product.filters?.filter02,
    product.filters?.filter03,
    product.searchKeywords?.en,
    product.searchKeywords?.zh,
  ]
    .map(cleanPlungerHrefText)
    .filter(Boolean)
    .join(" ");

  const directModel = text.match(/\b(EA|SM|TM)[\s_-]*(\d{2,5})(?:\s*(?:UL|U|μL|uL))?[\s_-]*(PMMA|PEEK)\b/i);

  if (directModel) {
    return [

### Line 505

    product.filters?.filter01,
    product.filters?.filter02,
    product.filters?.filter03,
    product.searchKeywords?.en,
    product.searchKeywords?.zh,
  ]
    .map(cleanPlungerHrefText)
    .filter(Boolean)
    .join(" ");

  const directModel = text.match(/\b(EA|SM|TM)[\s_-]*(\d{2,5})(?:\s*(?:UL|U|μL|uL))?[\s_-]*(PMMA|PEEK)\b/i);

  if (directModel) {
    return [
      directModel[1].toLowerCase(),

### Line 591


  const pageText =
    PRODUCT_SELECTION_PAGE_TEXT[locale] || PRODUCT_SELECTION_PAGE_TEXT.zh;

  const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);

  const [activeCategoryId, setActiveCategoryId] = useState(() => {
    return initialCategoryId || categoryItems[0]?.id || "pumps";
  });

  const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";

    return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

### Line 594


  const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);

  const [activeCategoryId, setActiveCategoryId] = useState(() => {
    return initialCategoryId || categoryItems[0]?.id || "pumps";
  });

  const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";

    return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
  });

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(

### Line 599

  });

  const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";

    return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
  });

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
    () => {
      const initialActiveCategoryId =
        initialCategoryId || categoryItems[0]?.id || "pumps";
      const initialActiveProductTypeId =
        initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

### Line 607


  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
    () => {
      const initialActiveCategoryId =
        initialCategoryId || categoryItems[0]?.id || "pumps";
      const initialActiveProductTypeId =
        initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

      return getInitialSelectedFilters(
        initialActiveCategoryId,
        initialActiveProductTypeId,
        initialFilters
      );
    }
  );

### Line 632

        .filter((item) => item.sourceType === "pump-selection")
        .map((item) => item.productCode)
    );
  }, [selectionCartItems]);
const [searchKeyword, setSearchKeyword] = useState("");
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [mobileOpenFilterGroups, setMobileOpenFilterGroups] = useState<
    Record<string, boolean>
  >(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";
    const initialActiveProductTypeId =
      initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

    return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);

### Line 633

        .map((item) => item.productCode)
    );
  }, [selectionCartItems]);
const [searchKeyword, setSearchKeyword] = useState("");
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [mobileOpenFilterGroups, setMobileOpenFilterGroups] = useState<
    Record<string, boolean>
  >(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";
    const initialActiveProductTypeId =
      initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

    return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);
  });

### Line 638

  const [mobileOpenFilterGroups, setMobileOpenFilterGroups] = useState<
    Record<string, boolean>
  >(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";
    const initialActiveProductTypeId =
      initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

    return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);
  });
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [productsPageSize, setProductsPageSize] = useState(12);

  const activeCategory = useMemo(() => {
    return (

### Line 649

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

### Line 650


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

### Line 653

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

    /*
     * 说明：

### Line 744

    return groups;
  }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);

  const matchedProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return categoryProducts.filter((product) => {
      if (activeProductTypeId && product.productTypeId !== activeProductTypeId) {
        return false;
      }

      const filterMatched = FILTER_KEYS.every((filterKey) => {
        const selectedValues = selectedFilters[filterKey];

        if (!selectedValues || selectedValues.size === 0) {

### Line 781

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

### Line 782

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


### Line 791

        .toLowerCase();

      return searchText.includes(keyword);
    });
  }, [activeProductTypeId, categoryProducts, searchKeyword, selectedFilters]);

  /*
   * 当前产品种类介绍数据
   * 说明：
   * 1. 根据当前产品大类和产品类型匹配介绍内容
   * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
   * 3. 找不到时不显示横幅
   */
  const activeProductTypeIntro = getProductTypeIntroByIds(
    activeCategoryId,

### Line 862

    };
  }, []);

  useEffect(() => {
    const fallbackCategoryId = categoryItems[0]?.id || "pumps";
    const preferredCategoryId = requestedCategoryId || initialCategoryId;

    const nextCategoryId =
      preferredCategoryId &&
      categoryItems.some((category) => category.id === preferredCategoryId)
        ? preferredCategoryId
        : fallbackCategoryId;

    const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
    const preferredProductTypeId =

### Line 867

    const preferredCategoryId = requestedCategoryId || initialCategoryId;

    const nextCategoryId =
      preferredCategoryId &&
      categoryItems.some((category) => category.id === preferredCategoryId)
        ? preferredCategoryId
        : fallbackCategoryId;

    const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
    const preferredProductTypeId =
      requestedProductTypeId || initialProductTypeId;

    const productTypeExistsInProducts = Boolean(
      preferredProductTypeId &&
        categoryProductsForUrl.some(

### Line 906

            nextProductTypeId,
            initialFilters
          )
    );
    setSearchKeyword("");
    setMobileCategoryOpen(false);
    setMobileOpenFilterGroups(
      getDefaultMobileOpenFilterGroups(nextProductTypeId)
    );
  }, [
    categoryItems,
    requestedCategoryId,
    requestedProductTypeId,
    initialCategoryId,
    initialProductTypeId,

### Line 907

            initialFilters
          )
    );
    setSearchKeyword("");
    setMobileCategoryOpen(false);
    setMobileOpenFilterGroups(
      getDefaultMobileOpenFilterGroups(nextProductTypeId)
    );
  }, [
    categoryItems,
    requestedCategoryId,
    requestedProductTypeId,
    initialCategoryId,
    initialProductTypeId,
    initialFilters,

### Line 912

    setMobileOpenFilterGroups(
      getDefaultMobileOpenFilterGroups(nextProductTypeId)
    );
  }, [
    categoryItems,
    requestedCategoryId,
    requestedProductTypeId,
    initialCategoryId,
    initialProductTypeId,
    initialFilters,
  ]);

  useEffect(() => {
    setCurrentProductPage(1);
  }, [

### Line 926

  }, [
    activeCategoryId,
    activeProductTypeId,
    selectedFilters,
    searchKeyword,
    productsPageSize,
  ]);
  /*
   * 筛选项联动后的自动清理：
   * 1. 当用户切换产品系列后，量程 / 材质可能不再属于当前系列
   * 2. 这里根据当前可见 filterGroups 自动移除无效筛选值
   * 3. 例如从 EA 切到 SM 后，自动清除 5000μL / 10000μL 等无效量程
   */
  useEffect(() => {
    const allowedValuesByFilterKey = new Map<SelectionFilterKey, Set<string>>();

### Line 990

      return changed ? next : current;
    });
  }, [filterGroups]);

  function handleCategoryChange(categoryId: string) {
    const firstProductTypeId = getFirstProductTypeId(categoryId);

    setActiveCategoryId(categoryId);
    setActiveProductTypeId(firstProductTypeId);
    setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
    setSearchKeyword("");
    setMobileCategoryOpen(false);
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
  }


### Line 996


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

### Line 997

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


### Line 1250

    const firstProductTypeId = getFirstProductTypeId(activeCategoryId);

    setActiveProductTypeId(firstProductTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
    setSearchKeyword("");
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
  }
  function createProductCartItem(
    product: ProductSelectionProduct
  ): SelectionCartItemInput {
    const title = getText(locale, product.cardTitle, product.productId);

    return {
      sourceType: "pump-selection",
      sourceLabel: "产品中心",
