# 隔膜泵筛选问题检查文档

## 当前问题

隔膜泵选型页已经能显示 8 个卡片，但是左侧筛选只显示：

- 产品类型：隔膜泵

没有显示：

- 气泵
- 液泵
- 气液混合泵

目标是按柱塞泵现有筛选页逻辑补齐隔膜泵筛选项，而不是单独写页面。

---

## 1. Git 状态

 M app/products/products.css
 M components/products/selection/ProductCardGrid.tsx
 M components/products/selection/ProductSelectionCard.tsx
 M components/products/selection/ProductSelectionClient.tsx
 M components/selection-cart/GlobalSelectionCartDrawer.tsx
 M components/selection-cart/SelectionCartProvider.tsx
 M components/selection-cart/selection-cart.types.ts
 M data/products/selection/product-route-map.ts
 M data/products/selection/product-type-intro.ts
 M package.json
?? app/products/products.css.bak_20260706_140218
?? app/products/products.css.bak_card_actions_20260706_145558
?? app/products/products.css.bak_card_actions_continue_20260706_145741
?? app/products/products.css.bak_diaphragm_card_style_20260706_211722
?? app/products/products.css.bak_diaphragm_subtitle_multiline_20260706_212104
?? app/products/products.css.bak_drawing_cart_only_20260706_151114
?? app/products/products.css.bak_final_detail_cart_20260706_163743
?? app/products/products.css.bak_mobile_card_final_append_20260706_142435
?? app/products/products.css.bak_mobile_card_font_20260706_142035
?? app/products/products.css.bak_mobile_card_real_fix_20260706_142254
?? app/products/products.css.bak_overall_fix_20260706_162940
?? app/products/pumps/diaphragm-pumps/
?? check-diaphragm-xlsx.js
?? components/products/selection/ProductCardGrid.tsx.bak_card_actions_20260706_145558
?? components/products/selection/ProductCardGrid.tsx.bak_drawing_cart_only_20260706_151114
?? components/products/selection/ProductCardGrid.tsx.bak_final_detail_cart_20260706_163743
?? components/products/selection/ProductCardGrid.tsx.bak_fix_detail_href_runtime_20260706_161703
?? components/products/selection/ProductCardGrid.tsx.bak_overall_fix_20260706_162940
?? components/products/selection/ProductCardGrid.tsx.bak_remove_get_detail_href_20260706_162127
?? components/products/selection/ProductSelectionCard.tsx.bak_card_actions_20260706_145558
?? components/products/selection/ProductSelectionCard.tsx.bak_drawing_cart_only_20260706_151114
?? components/products/selection/ProductSelectionCard.tsx.bak_final_detail_cart_20260706_163743
?? components/products/selection/ProductSelectionCard.tsx.bak_fix_detail_href_runtime_20260706_161703
?? components/products/selection/ProductSelectionCard.tsx.bak_fix_object_child_20260706_163934
?? components/products/selection/ProductSelectionCard.tsx.bak_remove_detail_link_20260706_161438
?? components/products/selection/ProductSelectionClient.tsx.bak_add_diaphragm_medium_filter_20260706_212928
?? components/products/selection/ProductSelectionClient.tsx.bak_card_actions_20260706_145558
?? components/products/selection/ProductSelectionClient.tsx.bak_card_actions_continue_20260706_145741
?? components/products/selection/ProductSelectionClient.tsx.bak_diaphragm_selection_20260706_210016
?? components/products/selection/ProductSelectionClient.tsx.bak_drawing_cart_only_20260706_151114
?? components/products/selection/ProductSelectionClient.tsx.bak_final_detail_cart_20260706_163743
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_breadcrumb_props_20260706_152816
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_grid_props_format_20260706_162432
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_parse_tail_20260706_145849
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_product_selection_type_20260706_162332
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_return_intro_20260706_152558
?? components/products/selection/ProductSelectionClient.tsx.bak_force_diaphragm_pool_20260706_211545
?? components/products/selection/ProductSelectionClient.tsx.bak_overall_fix_20260706_162940
?? components/products/selection/ProductSelectionClient.tsx.bak_pump_cart_display_20260706_153601
?? components/products/selection/ProductSelectionClient.tsx.bak_pump_custom_cart_20260706_154636
?? components/products/selection/ProductSelectionClient.tsx.bak_remove_get_detail_href_20260706_162127
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_fix_cart_table_header_20260706_155155
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_overall_fix_20260706_162940
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_pump_cart_display_20260706_153601
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_pump_custom_cart_20260706_154636
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_pump_drawer_body_20260706_154833
?? components/selection-cart/SelectionCartProvider.tsx.bak_card_actions_20260706_145558
?? components/selection-cart/SelectionCartProvider.tsx.bak_final_detail_cart_20260706_163743
?? components/selection-cart/SelectionCartProvider.tsx.bak_overall_fix_20260706_162940
?? components/selection-cart/SelectionCartProvider.tsx.bak_pump_cart_display_20260706_153601
?? components/selection-cart/SelectionCartProvider.tsx.bak_pump_custom_cart_20260706_154636
?? components/selection-cart/selection-cart.types.ts.bak_card_actions_20260706_145558
?? "data-source/product-center/pumps/FOREACH_\351\232\224\350\206\234\346\263\265\347\263\273\345\210\227_\344\272\247\345\223\201\346\225\260\346\215\256\346\272\220.xlsx"
?? data/products/generated/pumps/diaphragm-pumps/
?? data/products/selection/diaphragm-pump-selection.generated.ts
?? data/products/selection/product-route-map.ts.bak_fix_diaphragm_medium_filter_20260706_212515
?? data/products/selection/product-route-map.ts.bak_fix_diaphragm_medium_routes_safe_20260706_212652
?? data/products/selection/product-route-map.ts.bak_fix_series_insert_position_20260706_212801
?? data/products/selection/product-type-intro.ts.bak_remove_detail_text_20260706_161958
?? diaphragm-pump-filter-fix-context.md
?? diaphragm-pump-selection-inspect.txt
?? generate-diaphragm-selection-bridge.js
?? "iteProjectsforeach-website-2026componentsselection-cartGlobalSelectionCartDrawer.tsx\357\200\242"
?? plunger-selection-structure-check.txt
?? product_card_actions_audit.md
?? product_center_intro_layout_check_and_fix.md
?? product_intro_layout_audit.md
?? product_intro_layout_code_context.md
?? "productsselectionProductSelectionClient.tsx\357\200\242"
?? scripts/products/generate-diaphragm-pump-data.js
?? selection_cart_overall_audit.md
?? "\357\200\272"
?? "\357\200\272s\357\200\252subtitles\357\200\252\357\200\277s\357\200\252[s\357\200\252subtitles\357\200\252]s\357\200\252\357\200\272s\357\200\252[s\357\200\252],',"

---

## 2. ProductSelectionClient import / 数据合并部分


### Line 31

} from "@/data/products/selection/product-route-map";
import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
import {
  selectionFilterLabels,
  selectionProducts as baseSelectionProducts,
  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import { diaphragmPumpSelectionProducts, diaphragmPumpTaxonomyItems } from "@/data/products/selection/diaphragm-pump-selection.generated";
import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

import ProductCardGrid from "./ProductCardGrid";
import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductEmptyState from "./ProductEmptyState";
import ProductFilterPanel from "./ProductFilterPanel";
import ProductSelectionPagination from "./ProductSelectionPagination";
import ProductSelectionToolbar from "./ProductSelectionToolbar";


### Line 32

import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
import {
  selectionFilterLabels,
  selectionProducts as baseSelectionProducts,
  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import { diaphragmPumpSelectionProducts, diaphragmPumpTaxonomyItems } from "@/data/products/selection/diaphragm-pump-selection.generated";
import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

import ProductCardGrid from "./ProductCardGrid";
import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductEmptyState from "./ProductEmptyState";
import ProductFilterPanel from "./ProductFilterPanel";
import ProductSelectionPagination from "./ProductSelectionPagination";
import ProductSelectionToolbar from "./ProductSelectionToolbar";

import type {

### Line 33

import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
import {
  selectionFilterLabels,
  selectionProducts as baseSelectionProducts,
  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import { diaphragmPumpSelectionProducts, diaphragmPumpTaxonomyItems } from "@/data/products/selection/diaphragm-pump-selection.generated";
import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

import ProductCardGrid from "./ProductCardGrid";
import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductEmptyState from "./ProductEmptyState";
import ProductFilterPanel from "./ProductFilterPanel";
import ProductSelectionPagination from "./ProductSelectionPagination";
import ProductSelectionToolbar from "./ProductSelectionToolbar";

import type {
  ProductSelectionFilterLabel,

### Line 34

import {
  selectionFilterLabels,
  selectionProducts as baseSelectionProducts,
  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import { diaphragmPumpSelectionProducts, diaphragmPumpTaxonomyItems } from "@/data/products/selection/diaphragm-pump-selection.generated";
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

### Line 63






const selectionProducts = [
  ...baseSelectionProducts,
  ...diaphragmPumpSelectionProducts,
].filter((product, index, array) => {
  return (
    index ===
    array.findIndex((item) => item.productId === product.productId)
  );
});

const selectionTaxonomyItems = [
  ...baseSelectionTaxonomyItems,
  ...diaphragmPumpTaxonomyItems,

### Line 64





const selectionProducts = [
  ...baseSelectionProducts,
  ...diaphragmPumpSelectionProducts,
].filter((product, index, array) => {
  return (
    index ===
    array.findIndex((item) => item.productId === product.productId)
  );
});

const selectionTaxonomyItems = [
  ...baseSelectionTaxonomyItems,
  ...diaphragmPumpTaxonomyItems,
].filter((item, index, array) => {

### Line 65




const selectionProducts = [
  ...baseSelectionProducts,
  ...diaphragmPumpSelectionProducts,
].filter((product, index, array) => {
  return (
    index ===
    array.findIndex((item) => item.productId === product.productId)
  );
});

const selectionTaxonomyItems = [
  ...baseSelectionTaxonomyItems,
  ...diaphragmPumpTaxonomyItems,
].filter((item, index, array) => {
  return index === array.findIndex((entry) => entry.id === item.id);

### Line 73

    index ===
    array.findIndex((item) => item.productId === product.productId)
  );
});

const selectionTaxonomyItems = [
  ...baseSelectionTaxonomyItems,
  ...diaphragmPumpTaxonomyItems,
].filter((item, index, array) => {
  return index === array.findIndex((entry) => entry.id === item.id);
});

type ProductSelectionClientProps = {
  locale?: SelectionLocale;
  pageData?: unknown;
  initialCategoryId?: string;
  initialProductTypeId?: string;
  initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;

### Line 74

    array.findIndex((item) => item.productId === product.productId)
  );
});

const selectionTaxonomyItems = [
  ...baseSelectionTaxonomyItems,
  ...diaphragmPumpTaxonomyItems,
].filter((item, index, array) => {
  return index === array.findIndex((entry) => entry.id === item.id);
});

type ProductSelectionClientProps = {
  locale?: SelectionLocale;
  pageData?: unknown;
  initialCategoryId?: string;
  initialProductTypeId?: string;
  initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
};

### Line 75

  );
});

const selectionTaxonomyItems = [
  ...baseSelectionTaxonomyItems,
  ...diaphragmPumpTaxonomyItems,
].filter((item, index, array) => {
  return index === array.findIndex((entry) => entry.id === item.id);
});

type ProductSelectionClientProps = {
  locale?: SelectionLocale;
  pageData?: unknown;
  initialCategoryId?: string;
  initialProductTypeId?: string;
  initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
};


---

## 3. ProductSelectionClient 筛选组生成逻辑


### Line 3

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";

/* =========================================================
   ProductSelectionClient.tsx
   恒永达官网｜产品中心选型页客户端组件

   说明：
   1. 本文件只保留状态、筛选、搜索、分页和数据逻辑
   2. 筛选栏 / 产品卡片 / 分页 / 分类按钮已拆成通用模板组件
   3. 数据来源为 Excel 解析生成的数据文件
========================================================= */

import SitePageShell from "@/components/layout/SitePageShell";
import {
  getProductTypeFilterOptionsByCategory,

### Line 21

   说明：
   1. 本文件只保留状态、筛选、搜索、分页和数据逻辑
   2. 筛选栏 / 产品卡片 / 分页 / 分类按钮已拆成通用模板组件
   3. 数据来源为 Excel 解析生成的数据文件
========================================================= */

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
  selectionFilterLabels,
  selectionProducts as baseSelectionProducts,
  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import { diaphragmPumpSelectionProducts, diaphragmPumpTaxonomyItems } from "@/data/products/selection/diaphragm-pump-selection.generated";
import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

import ProductCardGrid from "./ProductCardGrid";
import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductEmptyState from "./ProductEmptyState";

### Line 23

   2. 筛选栏 / 产品卡片 / 分页 / 分类按钮已拆成通用模板组件
   3. 数据来源为 Excel 解析生成的数据文件
========================================================= */

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
  selectionFilterLabels,
  selectionProducts as baseSelectionProducts,
  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import { diaphragmPumpSelectionProducts, diaphragmPumpTaxonomyItems } from "@/data/products/selection/diaphragm-pump-selection.generated";
import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

import ProductCardGrid from "./ProductCardGrid";
import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductEmptyState from "./ProductEmptyState";
import ProductFilterPanel from "./ProductFilterPanel";
import ProductSelectionPagination from "./ProductSelectionPagination";

### Line 40

  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import { diaphragmPumpSelectionProducts, diaphragmPumpTaxonomyItems } from "@/data/products/selection/diaphragm-pump-selection.generated";
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




### Line 404


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

function normalizeDetailPathPart(value: unknown) {
  return String(value || "")
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean)
    .pop() || "";

### Line 587

  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCategoryId = searchParams.get("category");
  const requestedProductTypeId = searchParams.get("productType");

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
  });

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
    () => {
      const initialActiveCategoryId =
        initialCategoryId || categoryItems[0]?.id || "pumps";
      const initialActiveProductTypeId =
        initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

### Line 589

  const requestedCategoryId = searchParams.get("category");
  const requestedProductTypeId = searchParams.get("productType");

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
  });

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
    () => {
      const initialActiveCategoryId =
        initialCategoryId || categoryItems[0]?.id || "pumps";
      const initialActiveProductTypeId =
        initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

      return getInitialSelectedFilters(

### Line 593

    PRODUCT_SELECTION_PAGE_TEXT[locale] || PRODUCT_SELECTION_PAGE_TEXT.zh;

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

### Line 597

  const [activeCategoryId, setActiveCategoryId] = useState(() => {
    return initialCategoryId || categoryItems[0]?.id || "pumps";
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

      return getInitialSelectedFilters(
        initialActiveCategoryId,
        initialActiveProductTypeId,
        initialFilters
      );
    }
  );
  const {
    items: selectionCartItems,

### Line 602

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

      return getInitialSelectedFilters(
        initialActiveCategoryId,
        initialActiveProductTypeId,
        initialFilters
      );
    }
  );
  const {
    items: selectionCartItems,
    addItem,
    removeItem,
    getItem,
  } = useSelectionCart();


### Line 604


    return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
  });

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
  const {
    items: selectionCartItems,
    addItem,
    removeItem,
    getItem,
  } = useSelectionCart();

  const selectedList = useMemo(() => {
    return new Set(

### Line 605

    return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
  });

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
  const {
    items: selectionCartItems,
    addItem,
    removeItem,
    getItem,
  } = useSelectionCart();

  const selectedList = useMemo(() => {
    return new Set(
      selectionCartItems

### Line 608

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
  const {
    items: selectionCartItems,
    addItem,
    removeItem,
    getItem,
  } = useSelectionCart();

  const selectedList = useMemo(() => {
    return new Set(
      selectionCartItems
        .filter((item) => item.sourceType === "pump-selection")
        .map((item) => item.productCode)
    );

### Line 609

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
  const {
    items: selectionCartItems,
    addItem,
    removeItem,
    getItem,
  } = useSelectionCart();

  const selectedList = useMemo(() => {
    return new Set(
      selectionCartItems
        .filter((item) => item.sourceType === "pump-selection")
        .map((item) => item.productCode)
    );
  }, [selectionCartItems]);

### Line 621

  );
  const {
    items: selectionCartItems,
    addItem,
    removeItem,
    getItem,
  } = useSelectionCart();

  const selectedList = useMemo(() => {
    return new Set(
      selectionCartItems
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
  });

### Line 630

    return new Set(
      selectionCartItems
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
  });
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [productsPageSize, setProductsPageSize] = useState(12);

  const activeCategory = useMemo(() => {
    return (
      categoryItems.find((category) => category.id === activeCategoryId) ||
      categoryItems[0] ||
      DEFAULT_CATEGORIES[0]
    );

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

### Line 635

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

### Line 636

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

### Line 643

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

### Line 645


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

### Line 651

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

### Line 652

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

### Line 655

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


### Line 680

    });

    /*
     * 说明：
     * 1. 再从 product-route-map.ts 补充正式产品类型入口
     * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
     * 3. 左侧“产品类型”里也会先显示对应入口
     */
    getProductTypeFilterOptionsByCategory(activeCategoryId).forEach((option) => {
      if (!optionMap.has(option.value)) {
        optionMap.set(option.value, {
          value: option.value,
          label: option.label,
        });
      }
    });

    return Array.from(optionMap.values());
  }, [activeCategoryId, categoryProducts, locale]);

  const currentTypeProducts = useMemo(() => {
    if (!activeProductTypeId) {
      return categoryProducts;
    }

    return categoryProducts.filter((product) => {
      return product.productTypeId === activeProductTypeId;

### Line 690

        optionMap.set(option.value, {
          value: option.value,
          label: option.label,
        });
      }
    });

    return Array.from(optionMap.values());
  }, [activeCategoryId, categoryProducts, locale]);

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


### Line 692

          label: option.label,
        });
      }
    });

    return Array.from(optionMap.values());
  }, [activeCategoryId, categoryProducts, locale]);

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

### Line 693

        });
      }
    });

    return Array.from(optionMap.values());
  }, [activeCategoryId, categoryProducts, locale]);

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

### Line 698

  }, [activeCategoryId, categoryProducts, locale]);

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

### Line 700

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

### Line 702

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
      const options = getFilterOptions(
        currentTypeProducts,

### Line 703

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
      const options = getFilterOptions(
        currentTypeProducts,
        label.filterKey,

### Line 704


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
      const options = getFilterOptions(
        currentTypeProducts,
        label.filterKey,
        selectedFilters,

### Line 706

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
      const options = getFilterOptions(
        currentTypeProducts,
        label.filterKey,
        selectedFilters,
        activeProductTypeId
      );

### Line 710

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
      const options = getFilterOptions(
        currentTypeProducts,
        label.filterKey,
        selectedFilters,
        activeProductTypeId
      );

      if (options.length === 0) return;

      groups.push({

### Line 723

      });
    }

    activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
      const options = getFilterOptions(
        currentTypeProducts,
        label.filterKey,
        selectedFilters,
        activeProductTypeId
      );

      if (options.length === 0) return;

      groups.push({
        key: label.filterKey,
        title: getText(locale, label.label, label.filterKey),
        inputType: label.inputType,
        options,
      });
    });

    return groups;
  }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);

  const matchedProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();


### Line 728

        currentTypeProducts,
        label.filterKey,
        selectedFilters,
        activeProductTypeId
      );

      if (options.length === 0) return;

      groups.push({
        key: label.filterKey,
        title: getText(locale, label.label, label.filterKey),
        inputType: label.inputType,
        options,
      });
    });

    return groups;
  }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);

  const matchedProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return categoryProducts.filter((product) => {
      if (activeProductTypeId && product.productTypeId !== activeProductTypeId) {
        return false;
      }


### Line 737

        key: label.filterKey,
        title: getText(locale, label.label, label.filterKey),
        inputType: label.inputType,
        options,
      });
    });

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
          return true;
        }

        const value = product.filters[filterKey];


### Line 739

        inputType: label.inputType,
        options,
      });
    });

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
          return true;
        }

        const value = product.filters[filterKey];

        return Boolean(value && selectedValues.has(value));
      });

### Line 743


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
          return true;
        }

        const value = product.filters[filterKey];

        return Boolean(value && selectedValues.has(value));
      });

      if (!filterMatched) {
        return false;
      }

### Line 787

        ...Object.values(product.filters),
      ]
        .filter(Boolean)
        .join(" ")
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
    activeProductTypeId
  );
  const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
    const tags: ProductSelectionSelectedTag[] = [];

    if (activeProductTypeId) {
      tags.push({
        key: "productType",

### Line 797

  /*
   * 当前产品种类介绍数据
   * 说明：
   * 1. 根据当前产品大类和产品类型匹配介绍内容
   * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
   * 3. 找不到时不显示横幅
   */
  const activeProductTypeIntro = getProductTypeIntroByIds(
    activeCategoryId,
    activeProductTypeId
  );
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


### Line 798

   * 当前产品种类介绍数据
   * 说明：
   * 1. 根据当前产品大类和产品类型匹配介绍内容
   * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
   * 3. 找不到时不显示横幅
   */
  const activeProductTypeIntro = getProductTypeIntroByIds(
    activeCategoryId,
    activeProductTypeId
  );
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

### Line 800

   * 1. 根据当前产品大类和产品类型匹配介绍内容
   * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
   * 3. 找不到时不显示横幅
   */
  const activeProductTypeIntro = getProductTypeIntroByIds(
    activeCategoryId,
    activeProductTypeId
  );
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

### Line 803

   */
  const activeProductTypeIntro = getProductTypeIntroByIds(
    activeCategoryId,
    activeProductTypeId
  );
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

### Line 806

    activeProductTypeId
  );
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


### Line 807

  );
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

### Line 826

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

### Line 891

    const nextProductTypeId =
      preferredProductTypeId &&
      (productTypeExistsInProducts || productTypeExistsInRouteMap)
        ? preferredProductTypeId
        : getFirstProductTypeId(nextCategoryId);

    const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);

    setActiveCategoryId(nextCategoryId);
    setActiveProductTypeId(nextProductTypeId);
    setSelectedFilters(
      hasQuerySelection
        ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
        : getInitialSelectedFilters(
            nextCategoryId,
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

### Line 892

      preferredProductTypeId &&
      (productTypeExistsInProducts || productTypeExistsInRouteMap)
        ? preferredProductTypeId
        : getFirstProductTypeId(nextCategoryId);

    const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);

    setActiveCategoryId(nextCategoryId);
    setActiveProductTypeId(nextProductTypeId);
    setSelectedFilters(
      hasQuerySelection
        ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
        : getInitialSelectedFilters(
            nextCategoryId,
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

### Line 904

        : getInitialSelectedFilters(
            nextCategoryId,
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
    initialFilters,
  ]);

  useEffect(() => {
    setCurrentProductPage(1);
  }, [
    activeCategoryId,
    activeProductTypeId,
    selectedFilters,
    searchKeyword,

### Line 905

            nextCategoryId,
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
    initialFilters,
  ]);

  useEffect(() => {
    setCurrentProductPage(1);
  }, [
    activeCategoryId,
    activeProductTypeId,
    selectedFilters,
    searchKeyword,
    productsPageSize,

### Line 919

    initialCategoryId,
    initialProductTypeId,
    initialFilters,
  ]);

  useEffect(() => {
    setCurrentProductPage(1);
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

    filterGroups.forEach((group) => {
      if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
        return;
      }

### Line 920

    initialProductTypeId,
    initialFilters,
  ]);

  useEffect(() => {
    setCurrentProductPage(1);
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

    filterGroups.forEach((group) => {
      if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
        return;
      }


### Line 928

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

    filterGroups.forEach((group) => {
      if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
        return;
      }

      const filterKey = group.key as SelectionFilterKey;
      allowedValuesByFilterKey.set(
        filterKey,
        new Set(group.options.map((option) => option.value))
      );
    });

    setSelectedFilters((current) => {

### Line 934

   * 筛选项联动后的自动清理：
   * 1. 当用户切换产品系列后，量程 / 材质可能不再属于当前系列
   * 2. 这里根据当前可见 filterGroups 自动移除无效筛选值
   * 3. 例如从 EA 切到 SM 后，自动清除 5000μL / 10000μL 等无效量程
   */
  useEffect(() => {
    const allowedValuesByFilterKey = new Map<SelectionFilterKey, Set<string>>();

    filterGroups.forEach((group) => {
      if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
        return;
      }

      const filterKey = group.key as SelectionFilterKey;
      allowedValuesByFilterKey.set(
        filterKey,
        new Set(group.options.map((option) => option.value))
      );
    });

    setSelectedFilters((current) => {
      let changed = false;
      const next: SelectedFilterMap = {
        ...current,
      };

      FILTER_KEYS.forEach((filterKey) => {

### Line 984

          }

          changed = true;
        }
      });

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

  function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
    setMobileOpenFilterGroups((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

### Line 989


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

  function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
    setMobileOpenFilterGroups((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function handleProductTypeChange(productTypeId: string) {
    /*
     * 说明：
     * 1. 点击产品类型时，优先跳转正式 URL

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

  function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
    setMobileOpenFilterGroups((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function handleProductTypeChange(productTypeId: string) {
    /*
     * 说明：
     * 1. 点击产品类型时，优先跳转正式 URL
     * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/

### Line 994

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
    /*
     * 说明：
     * 1. 点击产品类型时，优先跳转正式 URL
     * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/
     * 3. 没配置正式 URL 的类型，才走原来的前端筛选逻辑
     */
    const productTypeHref = getProductTypeHrefByIds(
      activeCategoryId,

### Line 998

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
    /*
     * 说明：
     * 1. 点击产品类型时，优先跳转正式 URL
     * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/
     * 3. 没配置正式 URL 的类型，才走原来的前端筛选逻辑
     */
    const productTypeHref = getProductTypeHrefByIds(
      activeCategoryId,
      productTypeId
    );

    if (productTypeHref) {

### Line 1012

  function handleProductTypeChange(productTypeId: string) {
    /*
     * 说明：
     * 1. 点击产品类型时，优先跳转正式 URL
     * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/
     * 3. 没配置正式 URL 的类型，才走原来的前端筛选逻辑
     */
    const productTypeHref = getProductTypeHrefByIds(
      activeCategoryId,
      productTypeId
    );

    if (productTypeHref) {
      router.push(productTypeHref);
      return;
    }

    setActiveProductTypeId(productTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
  }

  function handleFilterChange(
    group: ProductSelectionFilterGroup,
    value: string
  ) {
    /*

### Line 1021

      productTypeId
    );

    if (productTypeHref) {
      router.push(productTypeHref);
      return;
    }

    setActiveProductTypeId(productTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
  }

  function handleFilterChange(
    group: ProductSelectionFilterGroup,
    value: string
  ) {
    /*
     * 说明：
     * 1. 产品类型筛选项，例如“柱塞泵”，仍然走 handleProductTypeChange
     * 2. 产品系列筛选项，例如 EA / SM / TM，不再使用 router.push
     * 3. 系列点击改为：
     *    - 原地更新 selectedFilters
     *    - 用 window.history.pushState 同步地址栏
     *    - 不触发 Next.js 页面重新跳转，避免页面明显跳动
     * 4. 普通筛选项，例如容量、材质，继续保留原地筛选逻辑
     */

### Line 1022

    );

    if (productTypeHref) {
      router.push(productTypeHref);
      return;
    }

    setActiveProductTypeId(productTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
  }

  function handleFilterChange(
    group: ProductSelectionFilterGroup,
    value: string
  ) {
    /*
     * 说明：
     * 1. 产品类型筛选项，例如“柱塞泵”，仍然走 handleProductTypeChange
     * 2. 产品系列筛选项，例如 EA / SM / TM，不再使用 router.push
     * 3. 系列点击改为：
     *    - 原地更新 selectedFilters
     *    - 用 window.history.pushState 同步地址栏
     *    - 不触发 Next.js 页面重新跳转，避免页面明显跳动
     * 4. 普通筛选项，例如容量、材质，继续保留原地筛选逻辑
     */
    if (group.key === "productType") {

### Line 1023


    if (productTypeHref) {
      router.push(productTypeHref);
      return;
    }

    setActiveProductTypeId(productTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
  }

  function handleFilterChange(
    group: ProductSelectionFilterGroup,
    value: string
  ) {
    /*
     * 说明：
     * 1. 产品类型筛选项，例如“柱塞泵”，仍然走 handleProductTypeChange
     * 2. 产品系列筛选项，例如 EA / SM / TM，不再使用 router.push
     * 3. 系列点击改为：
     *    - 原地更新 selectedFilters
     *    - 用 window.history.pushState 同步地址栏
     *    - 不触发 Next.js 页面重新跳转，避免页面明显跳动
     * 4. 普通筛选项，例如容量、材质，继续保留原地筛选逻辑
     */
    if (group.key === "productType") {
      handleProductTypeChange(value);

### Line 1058


    /*
     * 说明：
     * 1. 先判断当前筛选项是否命中正式系列路由
     * 2. EA / SM / TM 会命中 product-route-map.ts 里的三级 URL
     * 3. 命中后不 router.push，而是原地切换状态并同步地址栏
     */
    const seriesHref = getSeriesHrefByFilterValue(
      activeCategoryId,
      activeProductTypeId,
      group.key,
      value
    );

    if (seriesHref) {
      const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );

      setSelectedFilters((current) => {
        const next: SelectedFilterMap = {
          ...current,
        };

        /*

### Line 1059

    /*
     * 说明：
     * 1. 先判断当前筛选项是否命中正式系列路由
     * 2. EA / SM / TM 会命中 product-route-map.ts 里的三级 URL
     * 3. 命中后不 router.push，而是原地切换状态并同步地址栏
     */
    const seriesHref = getSeriesHrefByFilterValue(
      activeCategoryId,
      activeProductTypeId,
      group.key,
      value
    );

    if (seriesHref) {
      const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );

      setSelectedFilters((current) => {
        const next: SelectedFilterMap = {
          ...current,
        };

        /*
         * 说明：

### Line 1067

      activeProductTypeId,
      group.key,
      value
    );

    if (seriesHref) {
      const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );

      setSelectedFilters((current) => {
        const next: SelectedFilterMap = {
          ...current,
        };

        /*
         * 说明：
         * 系列筛选属于单选逻辑：
         * - 选择 EA 时，不再同时保留 SM / TM
         * - 选择 SM 时，不再同时保留 EA / TM
         * - 再次点击已选中的系列，则取消选择
         */
        if (isAlreadySelected) {
          delete next[filterKey];
        } else {

### Line 1068

      group.key,
      value
    );

    if (seriesHref) {
      const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );

      setSelectedFilters((current) => {
        const next: SelectedFilterMap = {
          ...current,
        };

        /*
         * 说明：
         * 系列筛选属于单选逻辑：
         * - 选择 EA 时，不再同时保留 SM / TM
         * - 选择 SM 时，不再同时保留 EA / TM
         * - 再次点击已选中的系列，则取消选择
         */
        if (isAlreadySelected) {
          delete next[filterKey];
        } else {
          next[filterKey] = new Set([value]);

### Line 1156

    /*
     * 说明：
     * 1. 这个函数用于告诉筛选面板：当前选项是否处于选中状态
     * 2. productType 是产品类型，例如“柱塞泵”
     * 3. filter01 / filter02 / filter03 是普通筛选项，例如产品系列、量程、材质
     * 4. 这里必须先判断 FILTER_KEYS，避免 TypeScript 认为 string 不能索引 selectedFilters
     */
    if (group.key === "productType") {
      return activeProductTypeId === value;
    }

    if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
      return false;
    }

    const filterKey = group.key as SelectionFilterKey;

    return selectedFilters[filterKey]?.has(value) || false;
  }
  function removeSelectedTag(
    key: string,
    value: string
  ) {
    /*
     * 说明：
     * 1. 这个函数用于移除顶部“已选筛选标签”
     * 2. productType 是产品类型，例如“柱塞泵”

### Line 1180

     * 说明：
     * 1. 这个函数用于移除顶部“已选筛选标签”
     * 2. productType 是产品类型，例如“柱塞泵”
     * 3. filter01 是产品系列，例如 EA / SM / TM
     * 4. 在三级系列页清除 EA / SM / TM 时，应回到二级柱塞泵页面
     */

    if (key === "productType") {
      setActiveProductTypeId("");
      setSelectedFilters({});
      return;
    }

    /*
     * 说明：
     * 1. 判断当前清除的标签是否命中正式系列路由
     * 2. 例如 EA 常规柱塞泵命中：
     *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
     * 3. 清除后跳回产品类型页：
     *    /products/pumps/plunger-pumps/
     */
    const seriesHref = getSeriesHrefByFilterValue(
      activeCategoryId,
      activeProductTypeId,
      key,
      value
    );

### Line 1194

     * 说明：
     * 1. 判断当前清除的标签是否命中正式系列路由
     * 2. 例如 EA 常规柱塞泵命中：
     *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
     * 3. 清除后跳回产品类型页：
     *    /products/pumps/plunger-pumps/
     */
    const seriesHref = getSeriesHrefByFilterValue(
      activeCategoryId,
      activeProductTypeId,
      key,
      value
    );

    if (seriesHref) {
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );

      if (productTypeHref) {
        router.push(productTypeHref);
        return;
      }
    }

    /*

### Line 1195

     * 1. 判断当前清除的标签是否命中正式系列路由
     * 2. 例如 EA 常规柱塞泵命中：
     *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
     * 3. 清除后跳回产品类型页：
     *    /products/pumps/plunger-pumps/
     */
    const seriesHref = getSeriesHrefByFilterValue(
      activeCategoryId,
      activeProductTypeId,
      key,
      value
    );

    if (seriesHref) {
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );

      if (productTypeHref) {
        router.push(productTypeHref);
        return;
      }
    }

    /*
     * 说明：

### Line 1202

      activeCategoryId,
      activeProductTypeId,
      key,
      value
    );

    if (seriesHref) {
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );

      if (productTypeHref) {
        router.push(productTypeHref);
        return;
      }
    }

    /*
     * 说明：
     * selectedFilters 的 key 只能是 SelectionFilterKey。
     * removeSelectedTag 传进来的 key 是 string，
     * 所以这里必须先判断 key 是否属于 FILTER_KEYS，再转换类型。
     */
    if (!FILTER_KEYS.includes(key as SelectionFilterKey)) {
      return;
    }

### Line 1203

      activeProductTypeId,
      key,
      value
    );

    if (seriesHref) {
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );

      if (productTypeHref) {
        router.push(productTypeHref);
        return;
      }
    }

    /*
     * 说明：
     * selectedFilters 的 key 只能是 SelectionFilterKey。
     * removeSelectedTag 传进来的 key 是 string，
     * 所以这里必须先判断 key 是否属于 FILTER_KEYS，再转换类型。
     */
    if (!FILTER_KEYS.includes(key as SelectionFilterKey)) {
      return;
    }


### Line 1242

      } else {
        next[filterKey] = values;
      }

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
  function createProductCartItem(
    product: ProductSelectionProduct
  ): SelectionCartItemInput {
    const title = getText(locale, product.cardTitle, product.productId);

    return {
      sourceType: "pump-selection",
      sourceLabel: "产品中心",
      productName: getTaxonomyLabel(locale, product.productTypeId),
      productCode: product.productId,
      foreachModel: title,
      competitorModels: [],

### Line 1244

      }

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
  function createProductCartItem(
    product: ProductSelectionProduct
  ): SelectionCartItemInput {
    const title = getText(locale, product.cardTitle, product.productId);

    return {
      sourceType: "pump-selection",
      sourceLabel: "产品中心",
      productName: getTaxonomyLabel(locale, product.productTypeId),
      productCode: product.productId,
      foreachModel: title,
      competitorModels: [],
      quantity: 1,
      needDrawing: false,

### Line 1245


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
  function createProductCartItem(
    product: ProductSelectionProduct
  ): SelectionCartItemInput {
    const title = getText(locale, product.cardTitle, product.productId);

    return {
      sourceType: "pump-selection",
      sourceLabel: "产品中心",
      productName: getTaxonomyLabel(locale, product.productTypeId),
      productCode: product.productId,
      foreachModel: title,
      competitorModels: [],
      quantity: 1,
      needDrawing: false,
      imagePath: product.imageCard,

### Line 1247

    });
  }
  function resetCurrentFilters() {
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
      productName: getTaxonomyLabel(locale, product.productTypeId),
      productCode: product.productId,
      foreachModel: title,
      competitorModels: [],
      quantity: 1,
      needDrawing: false,
      imagePath: product.imageCard,
      detailHref: makeDetailHref(product),
    };

### Line 1333

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

### Line 1335

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


### Line 1336

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

---

## 4. ProductSelectionClient 产品过滤逻辑


### Line 91

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
    mobileCategoryPrefix: "产品大类：",
    productTypeLabel: "产品类型",
    resultPrefix: "已找到 ",

### Line 92

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
    mobileCategoryPrefix: "产品大类：",
    productTypeLabel: "产品类型",
    resultPrefix: "已找到 ",
    resultSuffix: " 个基础配置",

### Line 93

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
    mobileCategoryPrefix: "产品大类：",
    productTypeLabel: "产品类型",
    resultPrefix: "已找到 ",
    resultSuffix: " 个基础配置",
    resetFilters: "清除筛选",

### Line 94

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

### Line 312

    categoryMap.set(category.id, category);
  });

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

### Line 324

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

### Line 497

  }

  const text = [
    product.cardTitle?.en,
    product.cardTitle?.zh,
    product.productId,
    product.detailSlug,
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
      directModel[1].toLowerCase(),
      String(Number(directModel[2])),
      directModel[3].toLowerCase(),
    ].join("-");
  }

### Line 498


  const text = [
    product.cardTitle?.en,
    product.cardTitle?.zh,
    product.productId,
    product.detailSlug,
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
      directModel[1].toLowerCase(),
      String(Number(directModel[2])),
      directModel[3].toLowerCase(),
    ].join("-");
  }


### Line 499

  const text = [
    product.cardTitle?.en,
    product.cardTitle?.zh,
    product.productId,
    product.detailSlug,
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
      directModel[1].toLowerCase(),
      String(Number(directModel[2])),
      directModel[3].toLowerCase(),
    ].join("-");
  }

  const seriesMatch = text.match(/\b(EA|SM|TM)\b/i);

### Line 652

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

### Line 1152

  function isFilterOptionActive(
    group: ProductSelectionFilterGroup,
    value: string
  ) {
    /*
     * 说明：
     * 1. 这个函数用于告诉筛选面板：当前选项是否处于选中状态
     * 2. productType 是产品类型，例如“柱塞泵”
     * 3. filter01 / filter02 / filter03 是普通筛选项，例如产品系列、量程、材质
     * 4. 这里必须先判断 FILTER_KEYS，避免 TypeScript 认为 string 不能索引 selectedFilters
     */
    if (group.key === "productType") {
      return activeProductTypeId === value;
    }

    if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
      return false;
    }

    const filterKey = group.key as SelectionFilterKey;

    return selectedFilters[filterKey]?.has(value) || false;
  }
  function removeSelectedTag(
    key: string,
    value: string
  ) {

### Line 1175

  function removeSelectedTag(
    key: string,
    value: string
  ) {
    /*
     * 说明：
     * 1. 这个函数用于移除顶部“已选筛选标签”
     * 2. productType 是产品类型，例如“柱塞泵”
     * 3. filter01 是产品系列，例如 EA / SM / TM
     * 4. 在三级系列页清除 EA / SM / TM 时，应回到二级柱塞泵页面
     */

    if (key === "productType") {
      setActiveProductTypeId("");
      setSelectedFilters({});
      return;
    }

    /*
     * 说明：
     * 1. 判断当前清除的标签是否命中正式系列路由
     * 2. 例如 EA 常规柱塞泵命中：
     *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
     * 3. 清除后跳回产品类型页：
     *    /products/pumps/plunger-pumps/
     */
    const seriesHref = getSeriesHrefByFilterValue(

### Line 1338

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

### Line 1339

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

---

## 5. ProductFilterPanel / ProductFilterGroup 结构


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 7

"use client";

import { useState } from "react";

import type {
  ProductSelectionCategoryItem,
  ProductSelectionFilterGroup,
} from "./product-selection-ui.types";

type ProductFilterPanelProps = {
  activeCategory: ProductSelectionCategoryItem;
  filterGroups: ProductSelectionFilterGroup[];
  mobileOpenFilterGroups?: Record<string, boolean>;
  emptyText: string;
  resetButtonText?: string;
  submitButtonText?: string;
  onToggleMobileGroup?: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
  onResetFilters?: () => void;
};

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 12

  ProductSelectionCategoryItem,
  ProductSelectionFilterGroup,
} from "./product-selection-ui.types";

type ProductFilterPanelProps = {
  activeCategory: ProductSelectionCategoryItem;
  filterGroups: ProductSelectionFilterGroup[];
  mobileOpenFilterGroups?: Record<string, boolean>;
  emptyText: string;
  resetButtonText?: string;
  submitButtonText?: string;
  onToggleMobileGroup?: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
  onResetFilters?: () => void;
};

export default function ProductFilterPanel({
  activeCategory,
  filterGroups,
  mobileOpenFilterGroups = {},

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 13

  ProductSelectionFilterGroup,
} from "./product-selection-ui.types";

type ProductFilterPanelProps = {
  activeCategory: ProductSelectionCategoryItem;
  filterGroups: ProductSelectionFilterGroup[];
  mobileOpenFilterGroups?: Record<string, boolean>;
  emptyText: string;
  resetButtonText?: string;
  submitButtonText?: string;
  onToggleMobileGroup?: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
  onResetFilters?: () => void;
};

export default function ProductFilterPanel({
  activeCategory,
  filterGroups,
  mobileOpenFilterGroups = {},
  emptyText,

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 17

  activeCategory: ProductSelectionCategoryItem;
  filterGroups: ProductSelectionFilterGroup[];
  mobileOpenFilterGroups?: Record<string, boolean>;
  emptyText: string;
  resetButtonText?: string;
  submitButtonText?: string;
  onToggleMobileGroup?: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
  onResetFilters?: () => void;
};

export default function ProductFilterPanel({
  activeCategory,
  filterGroups,
  mobileOpenFilterGroups = {},
  emptyText,
  onToggleMobileGroup,
  isOptionActive,
  onFilterChange,
}: ProductFilterPanelProps) {

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 18

  filterGroups: ProductSelectionFilterGroup[];
  mobileOpenFilterGroups?: Record<string, boolean>;
  emptyText: string;
  resetButtonText?: string;
  submitButtonText?: string;
  onToggleMobileGroup?: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
  onResetFilters?: () => void;
};

export default function ProductFilterPanel({
  activeCategory,
  filterGroups,
  mobileOpenFilterGroups = {},
  emptyText,
  onToggleMobileGroup,
  isOptionActive,
  onFilterChange,
}: ProductFilterPanelProps) {
  /*

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 19

  mobileOpenFilterGroups?: Record<string, boolean>;
  emptyText: string;
  resetButtonText?: string;
  submitButtonText?: string;
  onToggleMobileGroup?: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
  onResetFilters?: () => void;
};

export default function ProductFilterPanel({
  activeCategory,
  filterGroups,
  mobileOpenFilterGroups = {},
  emptyText,
  onToggleMobileGroup,
  isOptionActive,
  onFilterChange,
}: ProductFilterPanelProps) {
  /*
   * 说明：

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 25

  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
  onResetFilters?: () => void;
};

export default function ProductFilterPanel({
  activeCategory,
  filterGroups,
  mobileOpenFilterGroups = {},
  emptyText,
  onToggleMobileGroup,
  isOptionActive,
  onFilterChange,
}: ProductFilterPanelProps) {
  /*
   * 说明：
   * 1. 桌面端只让“产品类型”默认折叠
   * 2. 手机端所有筛选组都使用 is-mobile-open 控制展开
   * 3. 产品类型使用本组件内部状态控制，因为它在桌面端也需要折叠
   */
  const [isProductTypeOpen, setIsProductTypeOpen] = useState(false);


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 26

  onResetFilters?: () => void;
};

export default function ProductFilterPanel({
  activeCategory,
  filterGroups,
  mobileOpenFilterGroups = {},
  emptyText,
  onToggleMobileGroup,
  isOptionActive,
  onFilterChange,
}: ProductFilterPanelProps) {
  /*
   * 说明：
   * 1. 桌面端只让“产品类型”默认折叠
   * 2. 手机端所有筛选组都使用 is-mobile-open 控制展开
   * 3. 产品类型使用本组件内部状态控制，因为它在桌面端也需要折叠
   */
  const [isProductTypeOpen, setIsProductTypeOpen] = useState(false);

  return (

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 29

export default function ProductFilterPanel({
  activeCategory,
  filterGroups,
  mobileOpenFilterGroups = {},
  emptyText,
  onToggleMobileGroup,
  isOptionActive,
  onFilterChange,
}: ProductFilterPanelProps) {
  /*
   * 说明：
   * 1. 桌面端只让“产品类型”默认折叠
   * 2. 手机端所有筛选组都使用 is-mobile-open 控制展开
   * 3. 产品类型使用本组件内部状态控制，因为它在桌面端也需要折叠
   */
  const [isProductTypeOpen, setIsProductTypeOpen] = useState(false);

  return (
    <aside className="filter-panel">
      <div className="filter-panel-head">
        <h2>{activeCategory.label}</h2>

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 30

  activeCategory,
  filterGroups,
  mobileOpenFilterGroups = {},
  emptyText,
  onToggleMobileGroup,
  isOptionActive,
  onFilterChange,
}: ProductFilterPanelProps) {
  /*
   * 说明：
   * 1. 桌面端只让“产品类型”默认折叠
   * 2. 手机端所有筛选组都使用 is-mobile-open 控制展开
   * 3. 产品类型使用本组件内部状态控制，因为它在桌面端也需要折叠
   */
  const [isProductTypeOpen, setIsProductTypeOpen] = useState(false);

  return (
    <aside className="filter-panel">
      <div className="filter-panel-head">
        <h2>{activeCategory.label}</h2>
        <p>{activeCategory.description}</p>

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 47

    <aside className="filter-panel">
      <div className="filter-panel-head">
        <h2>{activeCategory.label}</h2>
        <p>{activeCategory.description}</p>
      </div>

      {filterGroups.length > 0 ? (
        filterGroups.map((group) => {
          const isProductTypeGroup = group.key === "productType";

          /*
           * 单选 / 多选说明：
           * productType：产品类型，单选，圆形
           * filter01：产品系列，单选，圆形
           * 其他筛选项：量程、材质等，多选，方形
           */
          const isSingleSelectGroup =
            group.key === "productType" || group.key === "filter01";

          const activeOption = group.options.find((option) =>
            isOptionActive(group, option.value)

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 48

      <div className="filter-panel-head">
        <h2>{activeCategory.label}</h2>
        <p>{activeCategory.description}</p>
      </div>

      {filterGroups.length > 0 ? (
        filterGroups.map((group) => {
          const isProductTypeGroup = group.key === "productType";

          /*
           * 单选 / 多选说明：
           * productType：产品类型，单选，圆形
           * filter01：产品系列，单选，圆形
           * 其他筛选项：量程、材质等，多选，方形
           */
          const isSingleSelectGroup =
            group.key === "productType" || group.key === "filter01";

          const activeOption = group.options.find((option) =>
            isOptionActive(group, option.value)
          );

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 49

        <h2>{activeCategory.label}</h2>
        <p>{activeCategory.description}</p>
      </div>

      {filterGroups.length > 0 ? (
        filterGroups.map((group) => {
          const isProductTypeGroup = group.key === "productType";

          /*
           * 单选 / 多选说明：
           * productType：产品类型，单选，圆形
           * filter01：产品系列，单选，圆形
           * 其他筛选项：量程、材质等，多选，方形
           */
          const isSingleSelectGroup =
            group.key === "productType" || group.key === "filter01";

          const activeOption = group.options.find((option) =>
            isOptionActive(group, option.value)
          );


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 58

           * 单选 / 多选说明：
           * productType：产品类型，单选，圆形
           * filter01：产品系列，单选，圆形
           * 其他筛选项：量程、材质等，多选，方形
           */
          const isSingleSelectGroup =
            group.key === "productType" || group.key === "filter01";

          const activeOption = group.options.find((option) =>
            isOptionActive(group, option.value)
          );

          const optionTypeClass = isSingleSelectGroup
            ? "is-single"
            : "is-multi";

          /*
           * 筛选项列数说明：
           * 产品系列名称较长，保持一列
           * 产品类型、量程、材质使用两列
           */

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 60

           * filter01：产品系列，单选，圆形
           * 其他筛选项：量程、材质等，多选，方形
           */
          const isSingleSelectGroup =
            group.key === "productType" || group.key === "filter01";

          const activeOption = group.options.find((option) =>
            isOptionActive(group, option.value)
          );

          const optionTypeClass = isSingleSelectGroup
            ? "is-single"
            : "is-multi";

          /*
           * 筛选项列数说明：
           * 产品系列名称较长，保持一列
           * 产品类型、量程、材质使用两列
           */
          const shouldUseTwoColumns =
            group.key === "productType" ||

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 61

           * 其他筛选项：量程、材质等，多选，方形
           */
          const isSingleSelectGroup =
            group.key === "productType" || group.key === "filter01";

          const activeOption = group.options.find((option) =>
            isOptionActive(group, option.value)
          );

          const optionTypeClass = isSingleSelectGroup
            ? "is-single"
            : "is-multi";

          /*
           * 筛选项列数说明：
           * 产品系列名称较长，保持一列
           * 产品类型、量程、材质使用两列
           */
          const shouldUseTwoColumns =
            group.key === "productType" ||
            group.key === "filter02" ||

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 74

          /*
           * 筛选项列数说明：
           * 产品系列名称较长，保持一列
           * 产品类型、量程、材质使用两列
           */
          const shouldUseTwoColumns =
            group.key === "productType" ||
            group.key === "filter02" ||
            group.key === "filter03" ||
            group.options.length > 4;

          const filterOptionsClass = `filter-options${
            shouldUseTwoColumns ? " two" : " one"
          }`;

          /*
           * 手机端展开状态：
           * 1. 产品类型使用 isProductTypeOpen
           * 2. 其他筛选组使用父组件传入的 mobileOpenFilterGroups
           */
          const isMobileOpen = isProductTypeGroup

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 75

           * 筛选项列数说明：
           * 产品系列名称较长，保持一列
           * 产品类型、量程、材质使用两列
           */
          const shouldUseTwoColumns =
            group.key === "productType" ||
            group.key === "filter02" ||
            group.key === "filter03" ||
            group.options.length > 4;

          const filterOptionsClass = `filter-options${
            shouldUseTwoColumns ? " two" : " one"
          }`;

          /*
           * 手机端展开状态：
           * 1. 产品类型使用 isProductTypeOpen
           * 2. 其他筛选组使用父组件传入的 mobileOpenFilterGroups
           */
          const isMobileOpen = isProductTypeGroup
            ? isProductTypeOpen

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 76

           * 产品系列名称较长，保持一列
           * 产品类型、量程、材质使用两列
           */
          const shouldUseTwoColumns =
            group.key === "productType" ||
            group.key === "filter02" ||
            group.key === "filter03" ||
            group.options.length > 4;

          const filterOptionsClass = `filter-options${
            shouldUseTwoColumns ? " two" : " one"
          }`;

          /*
           * 手机端展开状态：
           * 1. 产品类型使用 isProductTypeOpen
           * 2. 其他筛选组使用父组件传入的 mobileOpenFilterGroups
           */
          const isMobileOpen = isProductTypeGroup
            ? isProductTypeOpen
            : Boolean(mobileOpenFilterGroups[group.key]);

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 77

           * 产品类型、量程、材质使用两列
           */
          const shouldUseTwoColumns =
            group.key === "productType" ||
            group.key === "filter02" ||
            group.key === "filter03" ||
            group.options.length > 4;

          const filterOptionsClass = `filter-options${
            shouldUseTwoColumns ? " two" : " one"
          }`;

          /*
           * 手机端展开状态：
           * 1. 产品类型使用 isProductTypeOpen
           * 2. 其他筛选组使用父组件传入的 mobileOpenFilterGroups
           */
          const isMobileOpen = isProductTypeGroup
            ? isProductTypeOpen
            : Boolean(mobileOpenFilterGroups[group.key]);


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 86

            shouldUseTwoColumns ? " two" : " one"
          }`;

          /*
           * 手机端展开状态：
           * 1. 产品类型使用 isProductTypeOpen
           * 2. 其他筛选组使用父组件传入的 mobileOpenFilterGroups
           */
          const isMobileOpen = isProductTypeGroup
            ? isProductTypeOpen
            : Boolean(mobileOpenFilterGroups[group.key]);

          const groupClassName = `filter-group${
            isProductTypeGroup ? " product-type-filter-group" : ""
          }${isMobileOpen ? " is-mobile-open" : ""}`;

          const handleToggleGroup = () => {
            if (isProductTypeGroup) {
              setIsProductTypeOpen((current) => !current);
              return;
            }

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 90

           * 手机端展开状态：
           * 1. 产品类型使用 isProductTypeOpen
           * 2. 其他筛选组使用父组件传入的 mobileOpenFilterGroups
           */
          const isMobileOpen = isProductTypeGroup
            ? isProductTypeOpen
            : Boolean(mobileOpenFilterGroups[group.key]);

          const groupClassName = `filter-group${
            isProductTypeGroup ? " product-type-filter-group" : ""
          }${isMobileOpen ? " is-mobile-open" : ""}`;

          const handleToggleGroup = () => {
            if (isProductTypeGroup) {
              setIsProductTypeOpen((current) => !current);
              return;
            }

            onToggleMobileGroup?.(group.key);
          };


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 102

          const handleToggleGroup = () => {
            if (isProductTypeGroup) {
              setIsProductTypeOpen((current) => !current);
              return;
            }

            onToggleMobileGroup?.(group.key);
          };

          const renderOptions = () => (
            <div className={filterOptionsClass}>
              {group.options.map((option) => {
                const active = isOptionActive(group, option.value);

                return (
                  <button
                    className={`filter-option ${optionTypeClass}${
                      active ? " active" : ""
                    }`}
                    type="button"
                    key={option.value}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 107


            onToggleMobileGroup?.(group.key);
          };

          const renderOptions = () => (
            <div className={filterOptionsClass}>
              {group.options.map((option) => {
                const active = isOptionActive(group, option.value);

                return (
                  <button
                    className={`filter-option ${optionTypeClass}${
                      active ? " active" : ""
                    }`}
                    type="button"
                    key={option.value}
                    onClick={() => onFilterChange(group, option.value)}
                  >
                    <span className="filter-check" />
                    <span>{option.label}</span>
                  </button>

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 108

            onToggleMobileGroup?.(group.key);
          };

          const renderOptions = () => (
            <div className={filterOptionsClass}>
              {group.options.map((option) => {
                const active = isOptionActive(group, option.value);

                return (
                  <button
                    className={`filter-option ${optionTypeClass}${
                      active ? " active" : ""
                    }`}
                    type="button"
                    key={option.value}
                    onClick={() => onFilterChange(group, option.value)}
                  >
                    <span className="filter-check" />
                    <span>{option.label}</span>
                  </button>
                );

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 116

                return (
                  <button
                    className={`filter-option ${optionTypeClass}${
                      active ? " active" : ""
                    }`}
                    type="button"
                    key={option.value}
                    onClick={() => onFilterChange(group, option.value)}
                  >
                    <span className="filter-check" />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          );

          return (
            <section className={groupClassName} key={group.key}>
              <button
                className={`filter-group-trigger${

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 117

                  <button
                    className={`filter-option ${optionTypeClass}${
                      active ? " active" : ""
                    }`}
                    type="button"
                    key={option.value}
                    onClick={() => onFilterChange(group, option.value)}
                  >
                    <span className="filter-check" />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          );

          return (
            <section className={groupClassName} key={group.key}>
              <button
                className={`filter-group-trigger${
                  isProductTypeGroup ? " product-type-filter-toggle" : ""

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 120

                    }`}
                    type="button"
                    key={option.value}
                    onClick={() => onFilterChange(group, option.value)}
                  >
                    <span className="filter-check" />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          );

          return (
            <section className={groupClassName} key={group.key}>
              <button
                className={`filter-group-trigger${
                  isProductTypeGroup ? " product-type-filter-toggle" : ""
                }`}
                type="button"
                onClick={handleToggleGroup}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 128

                );
              })}
            </div>
          );

          return (
            <section className={groupClassName} key={group.key}>
              <button
                className={`filter-group-trigger${
                  isProductTypeGroup ? " product-type-filter-toggle" : ""
                }`}
                type="button"
                onClick={handleToggleGroup}
                aria-expanded={isMobileOpen}
              >
                <span>{group.title}</span>
                <span className="filter-group-symbol" aria-hidden="true">
                  {isMobileOpen ? "-" : "+"}
                </span>
              </button>


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx Line 151

                  <button
                    className="filter-option is-single active"
                    type="button"
                    onClick={() => setIsProductTypeOpen(true)}
                  >
                    <span className="filter-check" />
                    <span>当前：{activeOption.label}</span>
                  </button>
                </div>
              ) : null}

              {isProductTypeGroup ? (
                isProductTypeOpen ? (
                  renderOptions()
                ) : null
              ) : (
                renderOptions()
              )}
            </section>
          );
        })

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 3

"use client";

import type { ProductSelectionFilterGroup } from "./product-selection-ui.types";

type ProductFilterGroupProps = {
  group: ProductSelectionFilterGroup;
  mobileOpen: boolean;
  onToggleMobileGroup: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
};

function getLayoutClass(group: ProductSelectionFilterGroup) {
  if (group.key === "productType" || group.key === "filter01") {
    return "one";
  }


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 6

"use client";

import type { ProductSelectionFilterGroup } from "./product-selection-ui.types";

type ProductFilterGroupProps = {
  group: ProductSelectionFilterGroup;
  mobileOpen: boolean;
  onToggleMobileGroup: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
};

function getLayoutClass(group: ProductSelectionFilterGroup) {
  if (group.key === "productType" || group.key === "filter01") {
    return "one";
  }

  return "two";
}


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 8


import type { ProductSelectionFilterGroup } from "./product-selection-ui.types";

type ProductFilterGroupProps = {
  group: ProductSelectionFilterGroup;
  mobileOpen: boolean;
  onToggleMobileGroup: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
};

function getLayoutClass(group: ProductSelectionFilterGroup) {
  if (group.key === "productType" || group.key === "filter01") {
    return "one";
  }

  return "two";
}

export default function ProductFilterGroup({
  group,

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 9

import type { ProductSelectionFilterGroup } from "./product-selection-ui.types";

type ProductFilterGroupProps = {
  group: ProductSelectionFilterGroup;
  mobileOpen: boolean;
  onToggleMobileGroup: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
};

function getLayoutClass(group: ProductSelectionFilterGroup) {
  if (group.key === "productType" || group.key === "filter01") {
    return "one";
  }

  return "two";
}

export default function ProductFilterGroup({
  group,
  mobileOpen,

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 10


type ProductFilterGroupProps = {
  group: ProductSelectionFilterGroup;
  mobileOpen: boolean;
  onToggleMobileGroup: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
};

function getLayoutClass(group: ProductSelectionFilterGroup) {
  if (group.key === "productType" || group.key === "filter01") {
    return "one";
  }

  return "two";
}

export default function ProductFilterGroup({
  group,
  mobileOpen,
  onToggleMobileGroup,

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 13

  mobileOpen: boolean;
  onToggleMobileGroup: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
};

function getLayoutClass(group: ProductSelectionFilterGroup) {
  if (group.key === "productType" || group.key === "filter01") {
    return "one";
  }

  return "two";
}

export default function ProductFilterGroup({
  group,
  mobileOpen,
  onToggleMobileGroup,
  isOptionActive,
  onFilterChange,
}: ProductFilterGroupProps) {

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 14

  onToggleMobileGroup: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
};

function getLayoutClass(group: ProductSelectionFilterGroup) {
  if (group.key === "productType" || group.key === "filter01") {
    return "one";
  }

  return "two";
}

export default function ProductFilterGroup({
  group,
  mobileOpen,
  onToggleMobileGroup,
  isOptionActive,
  onFilterChange,
}: ProductFilterGroupProps) {
  const modeClass = group.inputType === "single" ? "is-single" : "is-multi";

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 25

}

export default function ProductFilterGroup({
  group,
  mobileOpen,
  onToggleMobileGroup,
  isOptionActive,
  onFilterChange,
}: ProductFilterGroupProps) {
  const modeClass = group.inputType === "single" ? "is-single" : "is-multi";
  const layoutClass = getLayoutClass(group);

  return (
    <div
      className={`filter-group filter-group-${group.key} ${modeClass} layout-${layoutClass} ${
        mobileOpen ? "is-mobile-open" : ""
      }`}
      data-filter-key={group.key}
      data-filter-layout={layoutClass}
      key={group.key}
    >

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 26


export default function ProductFilterGroup({
  group,
  mobileOpen,
  onToggleMobileGroup,
  isOptionActive,
  onFilterChange,
}: ProductFilterGroupProps) {
  const modeClass = group.inputType === "single" ? "is-single" : "is-multi";
  const layoutClass = getLayoutClass(group);

  return (
    <div
      className={`filter-group filter-group-${group.key} ${modeClass} layout-${layoutClass} ${
        mobileOpen ? "is-mobile-open" : ""
      }`}
      data-filter-key={group.key}
      data-filter-layout={layoutClass}
      key={group.key}
    >
      <button

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 33

}: ProductFilterGroupProps) {
  const modeClass = group.inputType === "single" ? "is-single" : "is-multi";
  const layoutClass = getLayoutClass(group);

  return (
    <div
      className={`filter-group filter-group-${group.key} ${modeClass} layout-${layoutClass} ${
        mobileOpen ? "is-mobile-open" : ""
      }`}
      data-filter-key={group.key}
      data-filter-layout={layoutClass}
      key={group.key}
    >
      <button
        className="filter-group-title filter-group-trigger"
        type="button"
        onClick={() => onToggleMobileGroup(group.key)}
      >
        <span>{group.title}</span>
        <span className="filter-group-symbol">{mobileOpen ? "-" : "+"}</span>
      </button>

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 36


  return (
    <div
      className={`filter-group filter-group-${group.key} ${modeClass} layout-${layoutClass} ${
        mobileOpen ? "is-mobile-open" : ""
      }`}
      data-filter-key={group.key}
      data-filter-layout={layoutClass}
      key={group.key}
    >
      <button
        className="filter-group-title filter-group-trigger"
        type="button"
        onClick={() => onToggleMobileGroup(group.key)}
      >
        <span>{group.title}</span>
        <span className="filter-group-symbol">{mobileOpen ? "-" : "+"}</span>
      </button>

      <div className={`filter-options ${layoutClass}`}>
        {group.options.map((option) => {

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 38

    <div
      className={`filter-group filter-group-${group.key} ${modeClass} layout-${layoutClass} ${
        mobileOpen ? "is-mobile-open" : ""
      }`}
      data-filter-key={group.key}
      data-filter-layout={layoutClass}
      key={group.key}
    >
      <button
        className="filter-group-title filter-group-trigger"
        type="button"
        onClick={() => onToggleMobileGroup(group.key)}
      >
        <span>{group.title}</span>
        <span className="filter-group-symbol">{mobileOpen ? "-" : "+"}</span>
      </button>

      <div className={`filter-options ${layoutClass}`}>
        {group.options.map((option) => {
          const active = isOptionActive(group, option.value);


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 43

      data-filter-layout={layoutClass}
      key={group.key}
    >
      <button
        className="filter-group-title filter-group-trigger"
        type="button"
        onClick={() => onToggleMobileGroup(group.key)}
      >
        <span>{group.title}</span>
        <span className="filter-group-symbol">{mobileOpen ? "-" : "+"}</span>
      </button>

      <div className={`filter-options ${layoutClass}`}>
        {group.options.map((option) => {
          const active = isOptionActive(group, option.value);

          return (
            <button
              className={`filter-option filter-btn ${modeClass} ${
                active ? "active" : ""
              }`}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 50

      >
        <span>{group.title}</span>
        <span className="filter-group-symbol">{mobileOpen ? "-" : "+"}</span>
      </button>

      <div className={`filter-options ${layoutClass}`}>
        {group.options.map((option) => {
          const active = isOptionActive(group, option.value);

          return (
            <button
              className={`filter-option filter-btn ${modeClass} ${
                active ? "active" : ""
              }`}
              type="button"
              key={option.value}
              onClick={() => onFilterChange(group, option.value)}
            >
              <span className="filter-check filter-control" />
              <span className="filter-option-text">{option.label}</span>
            </button>

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 51

        <span>{group.title}</span>
        <span className="filter-group-symbol">{mobileOpen ? "-" : "+"}</span>
      </button>

      <div className={`filter-options ${layoutClass}`}>
        {group.options.map((option) => {
          const active = isOptionActive(group, option.value);

          return (
            <button
              className={`filter-option filter-btn ${modeClass} ${
                active ? "active" : ""
              }`}
              type="button"
              key={option.value}
              onClick={() => onFilterChange(group, option.value)}
            >
              <span className="filter-check filter-control" />
              <span className="filter-option-text">{option.label}</span>
            </button>
          );

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 59

          return (
            <button
              className={`filter-option filter-btn ${modeClass} ${
                active ? "active" : ""
              }`}
              type="button"
              key={option.value}
              onClick={() => onFilterChange(group, option.value)}
            >
              <span className="filter-check filter-control" />
              <span className="filter-option-text">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 60

            <button
              className={`filter-option filter-btn ${modeClass} ${
                active ? "active" : ""
              }`}
              type="button"
              key={option.value}
              onClick={() => onFilterChange(group, option.value)}
            >
              <span className="filter-check filter-control" />
              <span className="filter-option-text">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx Line 63

              }`}
              type="button"
              key={option.value}
              onClick={() => onFilterChange(group, option.value)}
            >
              <span className="filter-check filter-control" />
              <span className="filter-option-text">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\product-selection-ui.types.ts Line 18


export type ProductSelectionFilterOption = {
  value: string;
  label: string;
};

export type ProductSelectionFilterGroup = {
  key: "productType" | SelectionFilterKey;
  title: string;
  inputType: "single" | "multiple";
  options: ProductSelectionFilterOption[];
};

export type ProductSelectionSelectedTag = {
  key: "productType" | SelectionFilterKey;
  value: string;
  label: string;
};

export type ProductSelectionProductItem = ProductSelectionProduct;


---

## 6. product-route-map.ts 隔膜泵相关内容


### Line 12

   1. 这里统一管理产品中心正式分类 URL
   2. query 链接继续作为临时筛选状态使用
   3. 动态路由用于 SEO / GEO / AI 抓取 / sitemap / canonical
   4. 当前建立：
      泵系列 → 产品类型 → 产品系列
   5. 产品类型先补齐：
      柱塞泵 / 隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵
   6. 柱塞泵下先预留：
      EA 常规柱塞泵 / SM 微型柱塞泵 / TM 超微型柱塞泵
========================================================= */

import type { SelectionFilterKey } from "./product-selection.types";

export type ProductRouteInitialFilters = Partial<
  Record<SelectionFilterKey, string[]>
>;

export type ProductCategoryRouteEntry = {
  categoryId: string;
  label: string;
  title: string;
  description: string;
};

### Line 78

      label: "柱塞泵",
      title: "柱塞泵 | FOREACH",
      description:
        "柱塞泵适用于自动化分析仪器、IVD、生命科学和实验室自动化设备中的精密液体处理。",
    },

    "diaphragm-pumps": {
      category: "pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      label: "隔膜泵",
      title: "隔膜泵 | FOREACH",
      description:
        "隔膜泵适用于清洗、废液、试剂输送和仪器内部中低流量液体传输场景。",
    },

    "pipetting-pumps": {
      category: "pumps",
      categoryId: "pumps",
      productTypeId: "pipette-pump",
      label: "移液泵",
      title: "移液泵 | FOREACH",
      description:

### Line 81

        "柱塞泵适用于自动化分析仪器、IVD、生命科学和实验室自动化设备中的精密液体处理。",
    },

    "diaphragm-pumps": {
      category: "pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      label: "隔膜泵",
      title: "隔膜泵 | FOREACH",
      description:
        "隔膜泵适用于清洗、废液、试剂输送和仪器内部中低流量液体传输场景。",
    },

    "pipetting-pumps": {
      category: "pumps",
      categoryId: "pumps",
      productTypeId: "pipette-pump",
      label: "移液泵",
      title: "移液泵 | FOREACH",
      description:
        "移液泵适用于自动化移液、加样、分液和微量液体处理场景。",
    },


### Line 92

    },

    "pipetting-pumps": {
      category: "pumps",
      categoryId: "pumps",
      productTypeId: "pipette-pump",
      label: "移液泵",
      title: "移液泵 | FOREACH",
      description:
        "移液泵适用于自动化移液、加样、分液和微量液体处理场景。",
    },

    "syringe-pumps": {
      category: "pumps",
      categoryId: "pumps",
      productTypeId: "syringe-pump",
      label: "注射泵",
      title: "注射泵 | FOREACH",
      description:
        "注射泵适用于高精度进样、注液、梯度控制和稳定流量输出场景。",
    },

    "valveless-pumps": {

### Line 93


    "pipetting-pumps": {
      category: "pumps",
      categoryId: "pumps",
      productTypeId: "pipette-pump",
      label: "移液泵",
      title: "移液泵 | FOREACH",
      description:
        "移液泵适用于自动化移液、加样、分液和微量液体处理场景。",
    },

    "syringe-pumps": {
      category: "pumps",
      categoryId: "pumps",
      productTypeId: "syringe-pump",
      label: "注射泵",
      title: "注射泵 | FOREACH",
      description:
        "注射泵适用于高精度进样、注液、梯度控制和稳定流量输出场景。",
    },

    "valveless-pumps": {
      category: "pumps",

### Line 95

      category: "pumps",
      categoryId: "pumps",
      productTypeId: "pipette-pump",
      label: "移液泵",
      title: "移液泵 | FOREACH",
      description:
        "移液泵适用于自动化移液、加样、分液和微量液体处理场景。",
    },

    "syringe-pumps": {
      category: "pumps",
      categoryId: "pumps",
      productTypeId: "syringe-pump",
      label: "注射泵",
      title: "注射泵 | FOREACH",
      description:
        "注射泵适用于高精度进样、注液、梯度控制和稳定流量输出场景。",
    },

    "valveless-pumps": {
      category: "pumps",
      categoryId: "pumps",
      productTypeId: "valveless-pump",

### Line 135

  series: {
    "ea-standard-piston-pumps": {
      category: "pumps",
      slug: "plunger-pumps",
      categoryId: "pumps",
      productTypeId: "plunger-pump",
      filterKey: "filter01",
      filterValue: "EA 常规柱塞泵",
      initialFilters: {
        filter01: ["EA 常规柱塞泵"],
      },
      label: "EA 常规柱塞泵",
      title: "EA 常规柱塞泵 | FOREACH",
      description:
        "EA 常规柱塞泵适合作为自动化分析仪器中的标准平台型精密液体处理模块。",
    },

    "sm-miniature-piston-pumps": {
      category: "pumps",
      slug: "plunger-pumps",
      categoryId: "pumps",
      productTypeId: "plunger-pump",
      filterKey: "filter01",

### Line 138

      slug: "plunger-pumps",
      categoryId: "pumps",
      productTypeId: "plunger-pump",
      filterKey: "filter01",
      filterValue: "EA 常规柱塞泵",
      initialFilters: {
        filter01: ["EA 常规柱塞泵"],
      },
      label: "EA 常规柱塞泵",
      title: "EA 常规柱塞泵 | FOREACH",
      description:
        "EA 常规柱塞泵适合作为自动化分析仪器中的标准平台型精密液体处理模块。",
    },

    "sm-miniature-piston-pumps": {
      category: "pumps",
      slug: "plunger-pumps",
      categoryId: "pumps",
      productTypeId: "plunger-pump",
      filterKey: "filter01",
      filterValue: "SM 微型柱塞泵",
      initialFilters: {
        filter01: ["SM 微型柱塞泵"],

### Line 151


    "sm-miniature-piston-pumps": {
      category: "pumps",
      slug: "plunger-pumps",
      categoryId: "pumps",
      productTypeId: "plunger-pump",
      filterKey: "filter01",
      filterValue: "SM 微型柱塞泵",
      initialFilters: {
        filter01: ["SM 微型柱塞泵"],
      },
      label: "SM 微型柱塞泵",
      title: "SM 微型柱塞泵 | FOREACH",
      description:
        "SM 微型柱塞泵面向空间受限的自动化仪器液路模块，适用于小型化精密液体处理场景。",
    },

    "tm-ultra-compact-piston-pumps": {
      category: "pumps",
      slug: "plunger-pumps",
      categoryId: "pumps",
      productTypeId: "plunger-pump",
      filterKey: "filter01",

### Line 154

      slug: "plunger-pumps",
      categoryId: "pumps",
      productTypeId: "plunger-pump",
      filterKey: "filter01",
      filterValue: "SM 微型柱塞泵",
      initialFilters: {
        filter01: ["SM 微型柱塞泵"],
      },
      label: "SM 微型柱塞泵",
      title: "SM 微型柱塞泵 | FOREACH",
      description:
        "SM 微型柱塞泵面向空间受限的自动化仪器液路模块，适用于小型化精密液体处理场景。",
    },

    "tm-ultra-compact-piston-pumps": {
      category: "pumps",
      slug: "plunger-pumps",
      categoryId: "pumps",
      productTypeId: "plunger-pump",
      filterKey: "filter01",
      filterValue: "TM 超微型柱塞泵",
      initialFilters: {
        filter01: ["TM 超微型柱塞泵"],

### Line 167


    "tm-ultra-compact-piston-pumps": {
      category: "pumps",
      slug: "plunger-pumps",
      categoryId: "pumps",
      productTypeId: "plunger-pump",
      filterKey: "filter01",
      filterValue: "TM 超微型柱塞泵",
      initialFilters: {
        filter01: ["TM 超微型柱塞泵"],
      },
      label: "TM 超微型柱塞泵",
      title: "TM 超微型柱塞泵 | FOREACH",
      description:
        "TM 超微型柱塞泵适用于对安装空间、结构集成度和微量液体处理要求更高的精密仪器场景。",
    },
  
    "gas-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",

### Line 170

      slug: "plunger-pumps",
      categoryId: "pumps",
      productTypeId: "plunger-pump",
      filterKey: "filter01",
      filterValue: "TM 超微型柱塞泵",
      initialFilters: {
        filter01: ["TM 超微型柱塞泵"],
      },
      label: "TM 超微型柱塞泵",
      title: "TM 超微型柱塞泵 | FOREACH",
      description:
        "TM 超微型柱塞泵适用于对安装空间、结构集成度和微量液体处理要求更高的精密仪器场景。",
    },
  
    "gas-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气体隔膜泵",
      initialFilters: {
        filter01: ["气体隔膜泵"],

### Line 178

      label: "TM 超微型柱塞泵",
      title: "TM 超微型柱塞泵 | FOREACH",
      description:
        "TM 超微型柱塞泵适用于对安装空间、结构集成度和微量液体处理要求更高的精密仪器场景。",
    },
  
    "gas-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气体隔膜泵",
      initialFilters: {
        filter01: ["气体隔膜泵"],
      },
      label: "气泵",
      title: "气体隔膜泵 | FOREACH",
      description:
        "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
    },

    "liquid-diaphragm-pumps": {

### Line 180

      description:
        "TM 超微型柱塞泵适用于对安装空间、结构集成度和微量液体处理要求更高的精密仪器场景。",
    },
  
    "gas-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气体隔膜泵",
      initialFilters: {
        filter01: ["气体隔膜泵"],
      },
      label: "气泵",
      title: "气体隔膜泵 | FOREACH",
      description:
        "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
    },

    "liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",

### Line 182

    },
  
    "gas-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气体隔膜泵",
      initialFilters: {
        filter01: ["气体隔膜泵"],
      },
      label: "气泵",
      title: "气体隔膜泵 | FOREACH",
      description:
        "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
    },

    "liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",

### Line 183

  
    "gas-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气体隔膜泵",
      initialFilters: {
        filter01: ["气体隔膜泵"],
      },
      label: "气泵",
      title: "气体隔膜泵 | FOREACH",
      description:
        "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
    },

    "liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",

### Line 184

    "gas-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气体隔膜泵",
      initialFilters: {
        filter01: ["气体隔膜泵"],
      },
      label: "气泵",
      title: "气体隔膜泵 | FOREACH",
      description:
        "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
    },

    "liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "液体隔膜泵",

### Line 186

      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气体隔膜泵",
      initialFilters: {
        filter01: ["气体隔膜泵"],
      },
      label: "气泵",
      title: "气体隔膜泵 | FOREACH",
      description:
        "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
    },

    "liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "液体隔膜泵",
      initialFilters: {
        filter01: ["液体隔膜泵"],

### Line 188

      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气体隔膜泵",
      initialFilters: {
        filter01: ["气体隔膜泵"],
      },
      label: "气泵",
      title: "气体隔膜泵 | FOREACH",
      description:
        "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
    },

    "liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "液体隔膜泵",
      initialFilters: {
        filter01: ["液体隔膜泵"],
      },
      label: "液泵",

### Line 189

      filterKey: "filter01",
      filterValue: "气体隔膜泵",
      initialFilters: {
        filter01: ["气体隔膜泵"],
      },
      label: "气泵",
      title: "气体隔膜泵 | FOREACH",
      description:
        "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
    },

    "liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "液体隔膜泵",
      initialFilters: {
        filter01: ["液体隔膜泵"],
      },
      label: "液泵",
      title: "液体隔膜泵 | FOREACH",

### Line 191

      initialFilters: {
        filter01: ["气体隔膜泵"],
      },
      label: "气泵",
      title: "气体隔膜泵 | FOREACH",
      description:
        "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
    },

    "liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "液体隔膜泵",
      initialFilters: {
        filter01: ["液体隔膜泵"],
      },
      label: "液泵",
      title: "液体隔膜泵 | FOREACH",
      description:
        "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",

### Line 194

      label: "气泵",
      title: "气体隔膜泵 | FOREACH",
      description:
        "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
    },

    "liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "液体隔膜泵",
      initialFilters: {
        filter01: ["液体隔膜泵"],
      },
      label: "液泵",
      title: "液体隔膜泵 | FOREACH",
      description:
        "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
    },

    "gas-liquid-diaphragm-pumps": {

### Line 196

      description:
        "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
    },

    "liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "液体隔膜泵",
      initialFilters: {
        filter01: ["液体隔膜泵"],
      },
      label: "液泵",
      title: "液体隔膜泵 | FOREACH",
      description:
        "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
    },

    "gas-liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",

### Line 198

    },

    "liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "液体隔膜泵",
      initialFilters: {
        filter01: ["液体隔膜泵"],
      },
      label: "液泵",
      title: "液体隔膜泵 | FOREACH",
      description:
        "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
    },

    "gas-liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",

### Line 199


    "liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "液体隔膜泵",
      initialFilters: {
        filter01: ["液体隔膜泵"],
      },
      label: "液泵",
      title: "液体隔膜泵 | FOREACH",
      description:
        "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
    },

    "gas-liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",

### Line 200

    "liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "液体隔膜泵",
      initialFilters: {
        filter01: ["液体隔膜泵"],
      },
      label: "液泵",
      title: "液体隔膜泵 | FOREACH",
      description:
        "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
    },

    "gas-liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气液混合隔膜泵",

### Line 202

      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "液体隔膜泵",
      initialFilters: {
        filter01: ["液体隔膜泵"],
      },
      label: "液泵",
      title: "液体隔膜泵 | FOREACH",
      description:
        "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
    },

    "gas-liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气液混合隔膜泵",
      initialFilters: {
        filter01: ["气液混合隔膜泵"],

### Line 204

      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "液体隔膜泵",
      initialFilters: {
        filter01: ["液体隔膜泵"],
      },
      label: "液泵",
      title: "液体隔膜泵 | FOREACH",
      description:
        "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
    },

    "gas-liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气液混合隔膜泵",
      initialFilters: {
        filter01: ["气液混合隔膜泵"],
      },
      label: "气液混合泵",

### Line 205

      filterKey: "filter01",
      filterValue: "液体隔膜泵",
      initialFilters: {
        filter01: ["液体隔膜泵"],
      },
      label: "液泵",
      title: "液体隔膜泵 | FOREACH",
      description:
        "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
    },

    "gas-liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气液混合隔膜泵",
      initialFilters: {
        filter01: ["气液混合隔膜泵"],
      },
      label: "气液混合泵",
      title: "气液混合隔膜泵 | FOREACH",

### Line 207

      initialFilters: {
        filter01: ["液体隔膜泵"],
      },
      label: "液泵",
      title: "液体隔膜泵 | FOREACH",
      description:
        "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
    },

    "gas-liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气液混合隔膜泵",
      initialFilters: {
        filter01: ["气液混合隔膜泵"],
      },
      label: "气液混合泵",
      title: "气液混合隔膜泵 | FOREACH",
      description:
        "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",

### Line 210

      label: "液泵",
      title: "液体隔膜泵 | FOREACH",
      description:
        "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
    },

    "gas-liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气液混合隔膜泵",
      initialFilters: {
        filter01: ["气液混合隔膜泵"],
      },
      label: "气液混合泵",
      title: "气液混合隔膜泵 | FOREACH",
      description:
        "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",
    },
},


### Line 212

      description:
        "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
    },

    "gas-liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气液混合隔膜泵",
      initialFilters: {
        filter01: ["气液混合隔膜泵"],
      },
      label: "气液混合泵",
      title: "气液混合隔膜泵 | FOREACH",
      description:
        "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",
    },
},


};

### Line 214

    },

    "gas-liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气液混合隔膜泵",
      initialFilters: {
        filter01: ["气液混合隔膜泵"],
      },
      label: "气液混合泵",
      title: "气液混合隔膜泵 | FOREACH",
      description:
        "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",
    },
},


};

export function getCategoryRouteParams() {

### Line 215


    "gas-liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气液混合隔膜泵",
      initialFilters: {
        filter01: ["气液混合隔膜泵"],
      },
      label: "气液混合泵",
      title: "气液混合隔膜泵 | FOREACH",
      description:
        "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",
    },
},


};

export function getCategoryRouteParams() {
  return Object.keys(productRouteMap.categories).map((category) => ({

### Line 216

    "gas-liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气液混合隔膜泵",
      initialFilters: {
        filter01: ["气液混合隔膜泵"],
      },
      label: "气液混合泵",
      title: "气液混合隔膜泵 | FOREACH",
      description:
        "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",
    },
},


};

export function getCategoryRouteParams() {
  return Object.keys(productRouteMap.categories).map((category) => ({
    category,

### Line 218

      slug: "diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气液混合隔膜泵",
      initialFilters: {
        filter01: ["气液混合隔膜泵"],
      },
      label: "气液混合泵",
      title: "气液混合隔膜泵 | FOREACH",
      description:
        "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",
    },
},


};

export function getCategoryRouteParams() {
  return Object.keys(productRouteMap.categories).map((category) => ({
    category,
  }));
}

### Line 220

      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气液混合隔膜泵",
      initialFilters: {
        filter01: ["气液混合隔膜泵"],
      },
      label: "气液混合泵",
      title: "气液混合隔膜泵 | FOREACH",
      description:
        "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",
    },
},


};

export function getCategoryRouteParams() {
  return Object.keys(productRouteMap.categories).map((category) => ({
    category,
  }));
}

export function getProductTypeRouteParams() {

### Line 221

      filterKey: "filter01",
      filterValue: "气液混合隔膜泵",
      initialFilters: {
        filter01: ["气液混合隔膜泵"],
      },
      label: "气液混合泵",
      title: "气液混合隔膜泵 | FOREACH",
      description:
        "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",
    },
},


};

export function getCategoryRouteParams() {
  return Object.keys(productRouteMap.categories).map((category) => ({
    category,
  }));
}

export function getProductTypeRouteParams() {
  return Object.entries(productRouteMap.productTypes).map(([slug, route]) => ({

### Line 223

      initialFilters: {
        filter01: ["气液混合隔膜泵"],
      },
      label: "气液混合泵",
      title: "气液混合隔膜泵 | FOREACH",
      description:
        "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",
    },
},


};

export function getCategoryRouteParams() {
  return Object.keys(productRouteMap.categories).map((category) => ({
    category,
  }));
}

export function getProductTypeRouteParams() {
  return Object.entries(productRouteMap.productTypes).map(([slug, route]) => ({
    category: route.category,
    slug,

### Line 407

    image: {
      src: "/images/products/pumps/product-types/plunger-pumps/foreach-plunger-pumps-product-type-intro.webp",
      alt: "FOREACH 柱塞泵系列产品图，用于IVD、生命科学和实验室自动化设备中的精密液体处理"
    }
  },

  "pumps:diaphragm-pump": {
    categoryId: "pumps",
    productTypeId: "diaphragm-pump",
    title: "隔膜泵系列",
    paragraphs: [
      "恒永达隔膜泵系列适用于自动化仪器中的清洗、废液、试剂输送、循环液路和中低流量液体传输场景，可用于体外诊断、实验室自动化、生命科学和分析检测设备。",
      "隔膜泵适合对自吸能力、耐腐蚀性、长期运行稳定性和维护便利性有要求的系统，可根据流量、压力、膜片材质、阀片材质和安装空间进行配置选择。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
    ],
    image: {
      src: "/images/products/pumps/product-types/diaphragm-pumps/foreach-diaphragm-pumps-product-type-intro.webp",
      alt: "FOREACH 隔膜泵系列产品图，用于清洗、废液和试剂输送液路"
    }
  },

  "pumps:pipette-pump": {
    categoryId: "pumps",

### Line 409

      alt: "FOREACH 柱塞泵系列产品图，用于IVD、生命科学和实验室自动化设备中的精密液体处理"
    }
  },

  "pumps:diaphragm-pump": {
    categoryId: "pumps",
    productTypeId: "diaphragm-pump",
    title: "隔膜泵系列",
    paragraphs: [
      "恒永达隔膜泵系列适用于自动化仪器中的清洗、废液、试剂输送、循环液路和中低流量液体传输场景，可用于体外诊断、实验室自动化、生命科学和分析检测设备。",
      "隔膜泵适合对自吸能力、耐腐蚀性、长期运行稳定性和维护便利性有要求的系统，可根据流量、压力、膜片材质、阀片材质和安装空间进行配置选择。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
    ],
    image: {
      src: "/images/products/pumps/product-types/diaphragm-pumps/foreach-diaphragm-pumps-product-type-intro.webp",
      alt: "FOREACH 隔膜泵系列产品图，用于清洗、废液和试剂输送液路"
    }
  },

  "pumps:pipette-pump": {
    categoryId: "pumps",
    productTypeId: "pipette-pump",
    title: "移液泵系列",

### Line 417

    paragraphs: [
      "恒永达隔膜泵系列适用于自动化仪器中的清洗、废液、试剂输送、循环液路和中低流量液体传输场景，可用于体外诊断、实验室自动化、生命科学和分析检测设备。",
      "隔膜泵适合对自吸能力、耐腐蚀性、长期运行稳定性和维护便利性有要求的系统，可根据流量、压力、膜片材质、阀片材质和安装空间进行配置选择。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
    ],
    image: {
      src: "/images/products/pumps/product-types/diaphragm-pumps/foreach-diaphragm-pumps-product-type-intro.webp",
      alt: "FOREACH 隔膜泵系列产品图，用于清洗、废液和试剂输送液路"
    }
  },

  "pumps:pipette-pump": {
    categoryId: "pumps",
    productTypeId: "pipette-pump",
    title: "移液泵系列",
    paragraphs: [
      "恒永达移液泵系列面向自动化移液、加样、分液和样本处理场景，可用于体外诊断、生命科学、实验室自动化和分析仪器中的微量液体操作。",
      "产品可结合液面检测、压力监测、堵针识别和控制模块，实现更稳定的吸液、排液和移液过程，适合对重复性、稳定性和系统集成度要求较高的仪器平台。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
    ],
    image: {
      src: "/images/products/pumps/product-types/pipetting-pumps/foreach-pipetting-pumps-product-type-intro.webp",
      alt: "FOREACH 移液泵系列产品图，用于自动化移液、加样和样本处理"

### Line 425

    }
  },

  "pumps:pipette-pump": {
    categoryId: "pumps",
    productTypeId: "pipette-pump",
    title: "移液泵系列",
    paragraphs: [
      "恒永达移液泵系列面向自动化移液、加样、分液和样本处理场景，可用于体外诊断、生命科学、实验室自动化和分析仪器中的微量液体操作。",
      "产品可结合液面检测、压力监测、堵针识别和控制模块，实现更稳定的吸液、排液和移液过程，适合对重复性、稳定性和系统集成度要求较高的仪器平台。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
    ],
    image: {
      src: "/images/products/pumps/product-types/pipetting-pumps/foreach-pipetting-pumps-product-type-intro.webp",
      alt: "FOREACH 移液泵系列产品图，用于自动化移液、加样和样本处理"
    }
  },

  "pumps:syringe-pump": {
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    title: "注射泵系列",
    paragraphs: [

### Line 427


  "pumps:pipette-pump": {
    categoryId: "pumps",
    productTypeId: "pipette-pump",
    title: "移液泵系列",
    paragraphs: [
      "恒永达移液泵系列面向自动化移液、加样、分液和样本处理场景，可用于体外诊断、生命科学、实验室自动化和分析仪器中的微量液体操作。",
      "产品可结合液面检测、压力监测、堵针识别和控制模块，实现更稳定的吸液、排液和移液过程，适合对重复性、稳定性和系统集成度要求较高的仪器平台。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
    ],
    image: {
      src: "/images/products/pumps/product-types/pipetting-pumps/foreach-pipetting-pumps-product-type-intro.webp",
      alt: "FOREACH 移液泵系列产品图，用于自动化移液、加样和样本处理"
    }
  },

  "pumps:syringe-pump": {
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    title: "注射泵系列",
    paragraphs: [
      "恒永达注射泵系列适用于高精度进样、注液、梯度控制和稳定流量输出，可应用于分析仪器、实验室自动化、生命科学和精密液体处理系统。",
      "注射泵可根据注射器规格、行程分辨率、速度范围、控制方式和系统安装空间进行选型，适合需要稳定体积控制和精密注液的设备平台。",

### Line 433

      "恒永达移液泵系列面向自动化移液、加样、分液和样本处理场景，可用于体外诊断、生命科学、实验室自动化和分析仪器中的微量液体操作。",
      "产品可结合液面检测、压力监测、堵针识别和控制模块，实现更稳定的吸液、排液和移液过程，适合对重复性、稳定性和系统集成度要求较高的仪器平台。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
    ],
    image: {
      src: "/images/products/pumps/product-types/pipetting-pumps/foreach-pipetting-pumps-product-type-intro.webp",
      alt: "FOREACH 移液泵系列产品图，用于自动化移液、加样和样本处理"
    }
  },

  "pumps:syringe-pump": {
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    title: "注射泵系列",
    paragraphs: [
      "恒永达注射泵系列适用于高精度进样、注液、梯度控制和稳定流量输出，可应用于分析仪器、实验室自动化、生命科学和精密液体处理系统。",
      "注射泵可根据注射器规格、行程分辨率、速度范围、控制方式和系统安装空间进行选型，适合需要稳定体积控制和精密注液的设备平台。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
    ],
    image: {
      src: "/images/products/pumps/product-types/syringe-pumps/foreach-syringe-pumps-product-type-intro.webp",
      alt: "FOREACH 注射泵系列产品图，用于高精度进样、注液和稳定流量输出"
    }

---

## 7. 隔膜泵桥接数据预览

[
  {
    "productId": "diaphragm-dpl30-brushed",
    "title": "DPL30-24DB-EP/PS",
    "productTypeId": "diaphragm-pump",
    "filter01": "娑蹭綋闅旇啘娉?,
    "filter02": "鏈夊埛鐢垫満",
    "filter03": "300 mL/min",
    "filter04": "3000 h",
    "filters": {
      "productType": [
        "diaphragm-pump",
        "diaphragm-pumps"
      ],
      "filter01": [
        "娑蹭綋闅旇啘娉?
      ],
      "filter02": [
        "鏈夊埛鐢垫満"
      ],
      "filter03": [
        "300 mL/min"
      ],
      "filter04": [
        "3000 h"
      ],
      "series": [
        "dpl30-liquid-diaphragm-pump"
      ],
      "motorType": [
        "鏈夊埛鐢垫満"
      ],
      "flowRate": [
        "300 mL/min"
      ],
      "pressure": [
        "100 kPa"
      ],
      "serviceLife": [
        "3000 h"
      ]
    }
  },
  {
    "productId": "diaphragm-dpl30-brushless",
    "title": "DPL30-24BB-EP/PS",
    "productTypeId": "diaphragm-pump",
    "filter01": "娑蹭綋闅旇啘娉?,
    "filter02": "鏃犲埛鐢垫満",
    "filter03": "300 mL/min",
    "filter04": "10000 h",
    "filters": {
      "productType": [
        "diaphragm-pump",
        "diaphragm-pumps"
      ],
      "filter01": [
        "娑蹭綋闅旇啘娉?
      ],
      "filter02": [
        "鏃犲埛鐢垫満"
      ],
      "filter03": [
        "300 mL/min"
      ],
      "filter04": [
        "10000 h"
      ],
      "series": [
        "dpl30-liquid-diaphragm-pump"
      ],
      "motorType": [
        "鏃犲埛鐢垫満"
      ],
      "flowRate": [
        "300 mL/min"
      ],
      "pressure": [
        "100 kPa"
      ],
      "serviceLife": [
        "10000 h"
      ]
    }
  },
  {
    "productId": "diaphragm-dpl60-brushed",
    "title": "DPL60-24DB-EP/PS",
    "productTypeId": "diaphragm-pump",
    "filter01": "娑蹭綋闅旇啘娉?,
    "filter02": "鏈夊埛鐢垫満",
    "filter03": "600 mL/min",
    "filter04": "3000 h",
    "filters": {
      "productType": [
        "diaphragm-pump",
        "diaphragm-pumps"
      ],
      "filter01": [
        "娑蹭綋闅旇啘娉?
      ],
      "filter02": [
        "鏈夊埛鐢垫満"
      ],
      "filter03": [
        "600 mL/min"
      ],
      "filter04": [
        "3000 h"
      ],
      "series": [
        "dpl60-liquid-diaphragm-pump"
      ],
      "motorType": [
        "鏈夊埛鐢垫満"
      ],
      "flowRate": [
        "600 mL/min"
      ],
      "pressure": [
        "100 kPa"
      ],
      "serviceLife": [
        "3000 h"
      ]
    }
  },
  {
    "productId": "diaphragm-dpl60-brushless",
    "title": "DPL60-24BB-EP/PS",
    "productTypeId": "diaphragm-pump",
    "filter01": "娑蹭綋闅旇啘娉?,
    "filter02": "鏃犲埛鐢垫満",
    "filter03": "600 mL/min",
    "filter04": "10000 h",
    "filters": {
      "productType": [
        "diaphragm-pump",
        "diaphragm-pumps"
      ],
      "filter01": [
        "娑蹭綋闅旇啘娉?
      ],
      "filter02": [
        "鏃犲埛鐢垫満"
      ],
      "filter03": [
        "600 mL/min"
      ],
      "filter04": [
        "10000 h"
      ],
      "series": [
        "dpl60-liquid-diaphragm-pump"
      ],
      "motorType": [
        "鏃犲埛鐢垫満"
      ],
      "flowRate": [
        "600 mL/min"
      ],
      "pressure": [
        "100 kPa"
      ],
      "serviceLife": [
        "10000 h"
      ]
    }
  },
  {
    "productId": "diaphragm-dpl30h-brushed",
    "title": "DPL30H-24DS-EP/PS",
    "productTypeId": "diaphragm-pump",
    "filter01": "娑蹭綋闅旇啘娉?,
    "filter02": "鏈夊埛鐢垫満",
    "filter03": "300 mL/min",
    "filter04": "3000 h",
    "filters": {
      "productType": [
        "diaphragm-pump",
        "diaphragm-pumps"
      ],
      "filter01": [
        "娑蹭綋闅旇啘娉?
      ],
      "filter02": [
        "鏈夊埛鐢垫満"
      ],
      "filter03": [
        "300 mL/min"
      ],
      "filter04": [
        "3000 h"
      ],
      "series": [
        "dpl30h-liquid-diaphragm-pump"
      ],
      "motorType": [
        "鏈夊埛鐢垫満"
      ],
      "flowRate": [
        "300 mL/min"
      ],
      "pressure": [
        "600 kPa"
      ],
      "serviceLife": [
        "3000 h"
      ]
    }
  },
  {
    "productId": "diaphragm-dpl30h-brushless",
    "title": "DPL30H-24BS-EP/PS",
    "productTypeId": "diaphragm-pump",
    "filter01": "娑蹭綋闅旇啘娉?,
    "filter02": "鏃犲埛鐢垫満",
    "filter03": "300 mL/min",
    "filter04": "10000 h",
    "filters": {
      "productType": [
        "diaphragm-pump",
        "diaphragm-pumps"
      ],
      "filter01": [
        "娑蹭綋闅旇啘娉?
      ],
      "filter02": [
        "鏃犲埛鐢垫満"
      ],
      "filter03": [
        "300 mL/min"
      ],
      "filter04": [
        "10000 h"
      ],
      "series": [
        "dpl30h-liquid-diaphragm-pump"
      ],
      "motorType": [
        "鏃犲埛鐢垫満"
      ],
      "flowRate": [
        "300 mL/min"
      ],
      "pressure": [
        "600 kPa"
      ],
      "serviceLife": [
        "10000 h"
      ]
    }
  },
  {
    "productId": "diaphragm-dpgl800-ep",
    "title": "DPGL800-24BS6-EP/PS",
    "productTypeId": "diaphragm-pump",
    "filter01": "姘旀恫娣峰悎闅旇啘娉?,
    "filter02": "鏃犲埛鐢垫満",
    "filter03": "6 L/min",
    "filter04": "10000 h",
    "filters": {
      "productType": [
        "diaphragm-pump",
        "diaphragm-pumps"
      ],
      "filter01": [
        "姘旀恫娣峰悎闅旇啘娉?
      ],
      "filter02": [
        "鏃犲埛鐢垫満"
      ],
      "filter03": [
        "6 L/min"
      ],
      "filter04": [
        "10000 h"
      ],
      "series": [
        "dpgl800-gas-liquid-diaphragm-pump"
      ],
      "motorType": [
        "鏃犲埛鐢垫満"
      ],
      "flowRate": [
        "6 L/min"
      ],
      "pressure": [
        "+30 kPa / 锛?90 kPa"
      ],
      "serviceLife": [
        "10000 h"
      ]
    }
  },
  {
    "productId": "diaphragm-dpgl800-ff",
    "title": "DPGL800-24BS6-FF/PS",
    "productTypeId": "diaphragm-pump",
    "filter01": "姘旀恫娣峰悎闅旇啘娉?,
    "filter02": "鏃犲埛鐢垫満",
    "filter03": "6 L/min",
    "filter04": "10000 h",
    "filters": {
      "productType": [
        "diaphragm-pump",
        "diaphragm-pumps"
      ],
      "filter01": [
        "姘旀恫娣峰悎闅旇啘娉?
      ],
      "filter02": [
        "鏃犲埛鐢垫満"
      ],
      "filter03": [
        "6 L/min"
      ],
      "filter04": [
        "10000 h"
      ],
      "series": [
        "dpgl800-gas-liquid-diaphragm-pump"
      ],
      "motorType": [
        "鏃犲埛鐢垫満"
      ],
      "flowRate": [
        "6 L/min"
      ],
      "pressure": [
        "+30 kPa / 锛?90 kPa"
      ],
      "serviceLife": [
        "10000 h"
      ]
    }
  }
]

---

## 8. 当前产品中心路由生成结果

route map loaded

---

## 9. 需要修复的目标

左侧筛选在 /products/pumps/diaphragm-pumps 下应该显示：

产品类型：
- 当前：隔膜泵

介质类型：
- 气泵
- 液泵
- 气液混合泵

其中当前已有产品：
- 液泵：DPL30 / DPL60 / DPL30H
- 气液混合泵：DPGL800
- 气泵：暂时没有产品，可以先显示，也可以先隐藏

卡片参数格式保持：
有刷电机
300 mL/min
寿命 3000 h

无刷电机
300 mL/min
寿命 10000 h

