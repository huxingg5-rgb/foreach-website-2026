# 产品中心管路数据接入检查

生成时间：2026-07-07 20:58:12


## 1. ProductSelectionClient 是否导入管路数据


--- components\products\selection\ProductSelectionClient.tsx line 281 ---
    sortOrder: 40,
  },
  {
    id: "tubing",
    label: "管路系列",
    description: "根据管材、外径、内径和应用需求选择基础配置。",
    sortOrder: 50,

--- components\products\selection\ProductSelectionClient.tsx line 282 ---
  },
  {
    id: "tubing",
    label: "管路系列",
    description: "根据管材、外径、内径和应用需求选择基础配置。",
    sortOrder: 50,
  },

--- components\products\selection\ProductSelectionClient.tsx line 568 ---

function makeDetailHref(product: ProductSelectionProduct) {
  /*
    TUBING_SELECTION_DETAIL_HREF_PATCH_20260707

    管路系列详情链接分支。
    只影响 PVC / TPU / FEP / PTFE / PEEK / PFA 管路卡片。

--- components\products\selection\ProductSelectionClient.tsx line 570 ---
  /*
    TUBING_SELECTION_DETAIL_HREF_PATCH_20260707

    管路系列详情链接分支。
    只影响 PVC / TPU / FEP / PTFE / PEEK / PFA 管路卡片。
    其它产品仍走原来的针、阀、泵逻辑。
  */

--- components\products\selection\ProductSelectionClient.tsx line 571 ---
    TUBING_SELECTION_DETAIL_HREF_PATCH_20260707

    管路系列详情链接分支。
    只影响 PVC / TPU / FEP / PTFE / PEEK / PFA 管路卡片。
    其它产品仍走原来的针、阀、泵逻辑。
  */
  {

--- components\products\selection\ProductSelectionClient.tsx line 584 ---
        ""
    ).trim();

    if (rawHref.includes("/products/tubing/")) {
      return rawHref;
    }


--- components\products\selection\ProductSelectionClient.tsx line 590 ---

    const rawText = JSON.stringify(product || {}).toLowerCase();

    const isTubingProduct =
      rawText.includes("tubing") ||
      rawText.includes("管路") ||
      rawText.includes("pvc 管") ||

--- components\products\selection\ProductSelectionClient.tsx line 591 ---
    const rawText = JSON.stringify(product || {}).toLowerCase();

    const isTubingProduct =
      rawText.includes("tubing") ||
      rawText.includes("管路") ||
      rawText.includes("pvc 管") ||
      rawText.includes("tpu 管") ||

--- components\products\selection\ProductSelectionClient.tsx line 592 ---

    const isTubingProduct =
      rawText.includes("tubing") ||
      rawText.includes("管路") ||
      rawText.includes("pvc 管") ||
      rawText.includes("tpu 管") ||
      rawText.includes("fep 管") ||

--- components\products\selection\ProductSelectionClient.tsx line 599 ---
      rawText.includes("ptfe 管") ||
      rawText.includes("peek 管") ||
      rawText.includes("pfa 管") ||
      rawText.includes("pvc-tubing") ||
      rawText.includes("tpu-tubing") ||
      rawText.includes("fep-tubing") ||
      rawText.includes("ptfe-tubing") ||

--- components\products\selection\ProductSelectionClient.tsx line 600 ---
      rawText.includes("peek 管") ||
      rawText.includes("pfa 管") ||
      rawText.includes("pvc-tubing") ||
      rawText.includes("tpu-tubing") ||
      rawText.includes("fep-tubing") ||
      rawText.includes("ptfe-tubing") ||
      rawText.includes("peek-tubing") ||

--- components\products\selection\ProductSelectionClient.tsx line 601 ---
      rawText.includes("pfa 管") ||
      rawText.includes("pvc-tubing") ||
      rawText.includes("tpu-tubing") ||
      rawText.includes("fep-tubing") ||
      rawText.includes("ptfe-tubing") ||
      rawText.includes("peek-tubing") ||
      rawText.includes("pfa-tubing");

--- components\products\selection\ProductSelectionClient.tsx line 602 ---
      rawText.includes("pvc-tubing") ||
      rawText.includes("tpu-tubing") ||
      rawText.includes("fep-tubing") ||
      rawText.includes("ptfe-tubing") ||
      rawText.includes("peek-tubing") ||
      rawText.includes("pfa-tubing");


--- components\products\selection\ProductSelectionClient.tsx line 603 ---
      rawText.includes("tpu-tubing") ||
      rawText.includes("fep-tubing") ||
      rawText.includes("ptfe-tubing") ||
      rawText.includes("peek-tubing") ||
      rawText.includes("pfa-tubing");

    if (isTubingProduct) {

--- components\products\selection\ProductSelectionClient.tsx line 604 ---
      rawText.includes("fep-tubing") ||
      rawText.includes("ptfe-tubing") ||
      rawText.includes("peek-tubing") ||
      rawText.includes("pfa-tubing");

    if (isTubingProduct) {
      const rawSlug = String(

--- components\products\selection\ProductSelectionClient.tsx line 606 ---
      rawText.includes("peek-tubing") ||
      rawText.includes("pfa-tubing");

    if (isTubingProduct) {
      const rawSlug = String(
        (product as any).detailSlug ||
          (product as any).routeSlug ||

--- components\products\selection\ProductSelectionClient.tsx line 621 ---
        ?.toLowerCase();

      if (
        rawSlug === "pvc-tubing" ||
        rawSlug === "tpu-tubing" ||
        rawSlug === "fep-tubing" ||
        rawSlug === "ptfe-tubing" ||

--- components\products\selection\ProductSelectionClient.tsx line 622 ---

      if (
        rawSlug === "pvc-tubing" ||
        rawSlug === "tpu-tubing" ||
        rawSlug === "fep-tubing" ||
        rawSlug === "ptfe-tubing" ||
        rawSlug === "peek-tubing" ||

--- components\products\selection\ProductSelectionClient.tsx line 623 ---
      if (
        rawSlug === "pvc-tubing" ||
        rawSlug === "tpu-tubing" ||
        rawSlug === "fep-tubing" ||
        rawSlug === "ptfe-tubing" ||
        rawSlug === "peek-tubing" ||
        rawSlug === "pfa-tubing"

--- components\products\selection\ProductSelectionClient.tsx line 624 ---
        rawSlug === "pvc-tubing" ||
        rawSlug === "tpu-tubing" ||
        rawSlug === "fep-tubing" ||
        rawSlug === "ptfe-tubing" ||
        rawSlug === "peek-tubing" ||
        rawSlug === "pfa-tubing"
      ) {

--- components\products\selection\ProductSelectionClient.tsx line 625 ---
        rawSlug === "tpu-tubing" ||
        rawSlug === "fep-tubing" ||
        rawSlug === "ptfe-tubing" ||
        rawSlug === "peek-tubing" ||
        rawSlug === "pfa-tubing"
      ) {
        return `/products/tubing/${rawSlug}`;

--- components\products\selection\ProductSelectionClient.tsx line 626 ---
        rawSlug === "fep-tubing" ||
        rawSlug === "ptfe-tubing" ||
        rawSlug === "peek-tubing" ||
        rawSlug === "pfa-tubing"
      ) {
        return `/products/tubing/${rawSlug}`;
      }

--- components\products\selection\ProductSelectionClient.tsx line 628 ---
        rawSlug === "peek-tubing" ||
        rawSlug === "pfa-tubing"
      ) {
        return `/products/tubing/${rawSlug}`;
      }

      if (rawText.includes("pvc")) return "/products/tubing/pvc-tubing";

--- components\products\selection\ProductSelectionClient.tsx line 631 ---
        return `/products/tubing/${rawSlug}`;
      }

      if (rawText.includes("pvc")) return "/products/tubing/pvc-tubing";
      if (rawText.includes("tpu")) return "/products/tubing/tpu-tubing";
      if (rawText.includes("fep")) return "/products/tubing/fep-tubing";
      if (rawText.includes("ptfe")) return "/products/tubing/ptfe-tubing";

--- components\products\selection\ProductSelectionClient.tsx line 632 ---
      }

      if (rawText.includes("pvc")) return "/products/tubing/pvc-tubing";
      if (rawText.includes("tpu")) return "/products/tubing/tpu-tubing";
      if (rawText.includes("fep")) return "/products/tubing/fep-tubing";
      if (rawText.includes("ptfe")) return "/products/tubing/ptfe-tubing";
      if (rawText.includes("peek")) return "/products/tubing/peek-tubing";

--- components\products\selection\ProductSelectionClient.tsx line 633 ---

      if (rawText.includes("pvc")) return "/products/tubing/pvc-tubing";
      if (rawText.includes("tpu")) return "/products/tubing/tpu-tubing";
      if (rawText.includes("fep")) return "/products/tubing/fep-tubing";
      if (rawText.includes("ptfe")) return "/products/tubing/ptfe-tubing";
      if (rawText.includes("peek")) return "/products/tubing/peek-tubing";
      if (rawText.includes("pfa")) return "/products/tubing/pfa-tubing";

--- components\products\selection\ProductSelectionClient.tsx line 634 ---
      if (rawText.includes("pvc")) return "/products/tubing/pvc-tubing";
      if (rawText.includes("tpu")) return "/products/tubing/tpu-tubing";
      if (rawText.includes("fep")) return "/products/tubing/fep-tubing";
      if (rawText.includes("ptfe")) return "/products/tubing/ptfe-tubing";
      if (rawText.includes("peek")) return "/products/tubing/peek-tubing";
      if (rawText.includes("pfa")) return "/products/tubing/pfa-tubing";


--- components\products\selection\ProductSelectionClient.tsx line 635 ---
      if (rawText.includes("tpu")) return "/products/tubing/tpu-tubing";
      if (rawText.includes("fep")) return "/products/tubing/fep-tubing";
      if (rawText.includes("ptfe")) return "/products/tubing/ptfe-tubing";
      if (rawText.includes("peek")) return "/products/tubing/peek-tubing";
      if (rawText.includes("pfa")) return "/products/tubing/pfa-tubing";

      return "/products";

--- components\products\selection\ProductSelectionClient.tsx line 636 ---
      if (rawText.includes("fep")) return "/products/tubing/fep-tubing";
      if (rawText.includes("ptfe")) return "/products/tubing/ptfe-tubing";
      if (rawText.includes("peek")) return "/products/tubing/peek-tubing";
      if (rawText.includes("pfa")) return "/products/tubing/pfa-tubing";

      return "/products";
    }

## 2. ProductSelectionClient 产品总数组位置


--- components\products\selection\ProductSelectionClient.tsx line 16 ---
  getSeriesFilterOptionsByProductType,
  getSeriesHrefByFilterValue,
  hasProductTypeRouteByIds,
} from "@/data/products/selection/product-route-map";
import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
import {

--- components\products\selection\ProductSelectionClient.tsx line 17 ---
  getSeriesHrefByFilterValue,
  hasProductTypeRouteByIds,
} from "@/data/products/selection/product-route-map";
import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
import {
  selectionFilterLabels as baseSelectionFilterLabels,

--- components\products\selection\ProductSelectionClient.tsx line 18 ---
  hasProductTypeRouteByIds,
} from "@/data/products/selection/product-route-map";
import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
import {
  selectionFilterLabels as baseSelectionFilterLabels,
  selectionProducts as baseSelectionProducts,

--- components\products\selection\ProductSelectionClient.tsx line 21 ---
import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
import {
  selectionFilterLabels as baseSelectionFilterLabels,
  selectionProducts as baseSelectionProducts,
  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import {

--- components\products\selection\ProductSelectionClient.tsx line 23 ---
  selectionFilterLabels as baseSelectionFilterLabels,
  selectionProducts as baseSelectionProducts,
  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import {
  diaphragmPumpSelectionProducts,
  diaphragmPumpTaxonomyItems,

--- components\products\selection\ProductSelectionClient.tsx line 25 ---
  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import {
  diaphragmPumpSelectionProducts,
  diaphragmPumpTaxonomyItems,
  diaphragmPumpFilterLabels,
} from "@/data/products/selection/diaphragm-pump-selection.generated";

--- components\products\selection\ProductSelectionClient.tsx line 28 ---
  diaphragmPumpSelectionProducts,
  diaphragmPumpTaxonomyItems,
  diaphragmPumpFilterLabels,
} from "@/data/products/selection/diaphragm-pump-selection.generated";
import {
  pipettingPumpSelectionProducts,
  pipettingPumpFilterLabels,

--- components\products\selection\ProductSelectionClient.tsx line 30 ---
  diaphragmPumpFilterLabels,
} from "@/data/products/selection/diaphragm-pump-selection.generated";
import {
  pipettingPumpSelectionProducts,
  pipettingPumpFilterLabels,
} from "@/data/products/selection/pipetting-pump-selection.generated";
import {

--- components\products\selection\ProductSelectionClient.tsx line 32 ---
import {
  pipettingPumpSelectionProducts,
  pipettingPumpFilterLabels,
} from "@/data/products/selection/pipetting-pump-selection.generated";
import {
  valvelessPumpSelectionProducts,
  valvelessPumpFilterLabels,

--- components\products\selection\ProductSelectionClient.tsx line 34 ---
  pipettingPumpFilterLabels,
} from "@/data/products/selection/pipetting-pump-selection.generated";
import {
  valvelessPumpSelectionProducts,
  valvelessPumpFilterLabels,
} from "@/data/products/selection/valveless-pump-selection.generated";
import {

--- components\products\selection\ProductSelectionClient.tsx line 36 ---
import {
  valvelessPumpSelectionProducts,
  valvelessPumpFilterLabels,
} from "@/data/products/selection/valveless-pump-selection.generated";
import {
  valveSelectionProducts,
  valveFilterLabels,

--- components\products\selection\ProductSelectionClient.tsx line 38 ---
  valvelessPumpFilterLabels,
} from "@/data/products/selection/valveless-pump-selection.generated";
import {
  valveSelectionProducts,
  valveFilterLabels,
} from "@/data/products/selection/valve-selection.generated";
import {

--- components\products\selection\ProductSelectionClient.tsx line 40 ---
import {
  valveSelectionProducts,
  valveFilterLabels,
} from "@/data/products/selection/valve-selection.generated";
import {
  probeSelectionProducts,
  probeFilterLabels,

--- components\products\selection\ProductSelectionClient.tsx line 42 ---
  valveFilterLabels,
} from "@/data/products/selection/valve-selection.generated";
import {
  probeSelectionProducts,
  probeFilterLabels,
} from "@/data/products/selection/probe-selection.generated";


--- components\products\selection\ProductSelectionClient.tsx line 44 ---
import {
  probeSelectionProducts,
  probeFilterLabels,
} from "@/data/products/selection/probe-selection.generated";

import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";


--- components\products\selection\ProductSelectionClient.tsx line 46 ---
  probeFilterLabels,
} from "@/data/products/selection/probe-selection.generated";

import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

import ProductCardGrid from "./ProductCardGrid";
import ProductCategoryTabs from "./ProductCategoryTabs";

--- components\products\selection\ProductSelectionClient.tsx line 52 ---
import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductEmptyState from "./ProductEmptyState";
import ProductFilterPanel from "./ProductFilterPanel";
import ProductSelectionPagination from "./ProductSelectionPagination";
import ProductSelectionToolbar from "./ProductSelectionToolbar";
import {
  syringePumpFilterLabels,

--- components\products\selection\ProductSelectionClient.tsx line 53 ---
import ProductEmptyState from "./ProductEmptyState";
import ProductFilterPanel from "./ProductFilterPanel";
import ProductSelectionPagination from "./ProductSelectionPagination";
import ProductSelectionToolbar from "./ProductSelectionToolbar";
import {
  syringePumpFilterLabels,
  syringePumpSelectionProducts,

--- components\products\selection\ProductSelectionClient.tsx line 56 ---
import ProductSelectionToolbar from "./ProductSelectionToolbar";
import {
  syringePumpFilterLabels,
  syringePumpSelectionProducts,
} from "@/data/products/selection/syringe-pump-selection.generated";

import type {

--- components\products\selection\ProductSelectionClient.tsx line 57 ---
import {
  syringePumpFilterLabels,
  syringePumpSelectionProducts,
} from "@/data/products/selection/syringe-pump-selection.generated";

import type {
  ProductSelectionFilterLabel,

--- components\products\selection\ProductSelectionClient.tsx line 60 ---
} from "@/data/products/selection/syringe-pump-selection.generated";

import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
  SelectionFilterKey,
  SelectionLocale,

--- components\products\selection\ProductSelectionClient.tsx line 61 ---

import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
  SelectionFilterKey,
  SelectionLocale,
} from "@/data/products/selection/product-selection.types";

--- components\products\selection\ProductSelectionClient.tsx line 64 ---
  ProductSelectionProduct,
  SelectionFilterKey,
  SelectionLocale,
} from "@/data/products/selection/product-selection.types";

import type {
  ProductSelectionCategoryItem,

--- components\products\selection\ProductSelectionClient.tsx line 67 ---
} from "@/data/products/selection/product-selection.types";

import type {
  ProductSelectionCategoryItem,
  ProductSelectionFilterGroup,
  ProductSelectionSelectedTag,
} from "./product-selection-ui.types";

--- components\products\selection\ProductSelectionClient.tsx line 68 ---

import type {
  ProductSelectionCategoryItem,
  ProductSelectionFilterGroup,
  ProductSelectionSelectedTag,
} from "./product-selection-ui.types";


--- components\products\selection\ProductSelectionClient.tsx line 69 ---
import type {
  ProductSelectionCategoryItem,
  ProductSelectionFilterGroup,
  ProductSelectionSelectedTag,
} from "./product-selection-ui.types";

const selectionProducts = [

--- components\products\selection\ProductSelectionClient.tsx line 72 ---
  ProductSelectionSelectedTag,
} from "./product-selection-ui.types";

const selectionProducts = [
  ...baseSelectionProducts,
  ...diaphragmPumpSelectionProducts,
  ...pipettingPumpSelectionProducts,

--- components\products\selection\ProductSelectionClient.tsx line 73 ---
} from "./product-selection-ui.types";

const selectionProducts = [
  ...baseSelectionProducts,
  ...diaphragmPumpSelectionProducts,
  ...pipettingPumpSelectionProducts,
  ...valvelessPumpSelectionProducts,

--- components\products\selection\ProductSelectionClient.tsx line 74 ---

const selectionProducts = [
  ...baseSelectionProducts,
  ...diaphragmPumpSelectionProducts,
  ...pipettingPumpSelectionProducts,
  ...valvelessPumpSelectionProducts,
  ...valveSelectionProducts,

--- components\products\selection\ProductSelectionClient.tsx line 75 ---
const selectionProducts = [
  ...baseSelectionProducts,
  ...diaphragmPumpSelectionProducts,
  ...pipettingPumpSelectionProducts,
  ...valvelessPumpSelectionProducts,
  ...valveSelectionProducts,
  ...probeSelectionProducts,

--- components\products\selection\ProductSelectionClient.tsx line 76 ---
  ...baseSelectionProducts,
  ...diaphragmPumpSelectionProducts,
  ...pipettingPumpSelectionProducts,
  ...valvelessPumpSelectionProducts,
  ...valveSelectionProducts,
  ...probeSelectionProducts,
  ...syringePumpSelectionProducts,

--- components\products\selection\ProductSelectionClient.tsx line 77 ---
  ...diaphragmPumpSelectionProducts,
  ...pipettingPumpSelectionProducts,
  ...valvelessPumpSelectionProducts,
  ...valveSelectionProducts,
  ...probeSelectionProducts,
  ...syringePumpSelectionProducts,
].filter((product, index, array) => {

--- components\products\selection\ProductSelectionClient.tsx line 78 ---
  ...pipettingPumpSelectionProducts,
  ...valvelessPumpSelectionProducts,
  ...valveSelectionProducts,
  ...probeSelectionProducts,
  ...syringePumpSelectionProducts,
].filter((product, index, array) => {
  return index === array.findIndex((item) => item.productId === product.productId);

--- components\products\selection\ProductSelectionClient.tsx line 79 ---
  ...valvelessPumpSelectionProducts,
  ...valveSelectionProducts,
  ...probeSelectionProducts,
  ...syringePumpSelectionProducts,
].filter((product, index, array) => {
  return index === array.findIndex((item) => item.productId === product.productId);
});

--- components\products\selection\ProductSelectionClient.tsx line 111 ---
  );
});

type ProductSelectionClientProps = {
  locale?: SelectionLocale;
  pageData?: unknown;
  initialCategoryId?: string;

--- components\products\selection\ProductSelectionClient.tsx line 132 ---
  "filter08",
];

const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  zh: {
    breadcrumbHome: "首页",
    breadcrumbCurrent: "产品中心",

--- components\products\selection\ProductSelectionClient.tsx line 255 ---
  },
};

const DEFAULT_CATEGORIES: ProductSelectionCategoryItem[] = [
  {
    id: "pumps",
    label: "泵系列",

--- components\products\selection\ProductSelectionClient.tsx line 328 ---
      };
    });

  const categoryMap = new Map<string, ProductSelectionCategoryItem>();

  DEFAULT_CATEGORIES.forEach((category) => {
    categoryMap.set(category.id, category);

--- components\products\selection\ProductSelectionClient.tsx line 343 ---
  );
}

function getProductsByCategory(categoryId: string) {
  return selectionProducts
    .filter((product) => product.categoryId === categoryId)
    .filter((product, index, array) => {

--- components\products\selection\ProductSelectionClient.tsx line 344 ---
}

function getProductsByCategory(categoryId: string) {
  return selectionProducts
    .filter((product) => product.categoryId === categoryId)
    .filter((product, index, array) => {
      return (

--- components\products\selection\ProductSelectionClient.tsx line 355 ---
}

function getFirstProductTypeId(categoryId: string) {
  const products = getProductsByCategory(categoryId);
  const first = products[0];

  return first?.productTypeId || "";

--- components\products\selection\ProductSelectionClient.tsx line 356 ---

function getFirstProductTypeId(categoryId: string) {
  const products = getProductsByCategory(categoryId);
  const first = products[0];

  return first?.productTypeId || "";
}

--- components\products\selection\ProductSelectionClient.tsx line 368 ---
}

function getFilterOptions(
  products: ProductSelectionProduct[],
  filterKey: SelectionFilterKey,
  selectedFilters: SelectedFilterMap,
  productTypeId: string

--- components\products\selection\ProductSelectionClient.tsx line 375 ---
) {
  return getProductFilterOptions({
    productTypeId,
    products,
    filterKey,
    selectedFilters,
  });

--- components\products\selection\ProductSelectionClient.tsx line 396 ---
function getInitialSelectedFilters(
  categoryId: string,
  productTypeId: string,
  initialFilters?: ProductSelectionClientProps["initialFilters"]
): SelectedFilterMap {
  const selected = getDefaultSelectedFilters(categoryId, productTypeId);


--- components\products\selection\ProductSelectionClient.tsx line 465 ---
    .replace(/^-+|-+$/g, "");
}

function findPlungerPumpDetailSlug(product: ProductSelectionProduct) {
  const candidates = [
    product.cardTitle?.en,
    product.cardTitle?.zh,

--- components\products\selection\ProductSelectionClient.tsx line 515 ---
    .replace(/^-+|-+$/g, "");
}

function getPlungerPumpModelSlugForDetailHref(product: ProductSelectionProduct) {
  const existingSlug = normalizePlungerPathPart(product.detailSlug);

  if (/^(ea|sm|tm)-\d+-(pmma|peek)$/i.test(existingSlug)) {

--- components\products\selection\ProductSelectionClient.tsx line 566 ---
/* ===== FOREACH plunger pump model detail href helpers END ===== */


function makeDetailHref(product: ProductSelectionProduct) {
  /*
    TUBING_SELECTION_DETAIL_HREF_PATCH_20260707


--- components\products\selection\ProductSelectionClient.tsx line 584 ---
        ""
    ).trim();

    if (rawHref.includes("/products/tubing/")) {
      return rawHref;
    }


--- components\products\selection\ProductSelectionClient.tsx line 628 ---
        rawSlug === "peek-tubing" ||
        rawSlug === "pfa-tubing"
      ) {
        return `/products/tubing/${rawSlug}`;
      }

      if (rawText.includes("pvc")) return "/products/tubing/pvc-tubing";

--- components\products\selection\ProductSelectionClient.tsx line 631 ---
        return `/products/tubing/${rawSlug}`;
      }

      if (rawText.includes("pvc")) return "/products/tubing/pvc-tubing";
      if (rawText.includes("tpu")) return "/products/tubing/tpu-tubing";
      if (rawText.includes("fep")) return "/products/tubing/fep-tubing";
      if (rawText.includes("ptfe")) return "/products/tubing/ptfe-tubing";

--- components\products\selection\ProductSelectionClient.tsx line 632 ---
      }

      if (rawText.includes("pvc")) return "/products/tubing/pvc-tubing";
      if (rawText.includes("tpu")) return "/products/tubing/tpu-tubing";
      if (rawText.includes("fep")) return "/products/tubing/fep-tubing";
      if (rawText.includes("ptfe")) return "/products/tubing/ptfe-tubing";
      if (rawText.includes("peek")) return "/products/tubing/peek-tubing";

--- components\products\selection\ProductSelectionClient.tsx line 633 ---

      if (rawText.includes("pvc")) return "/products/tubing/pvc-tubing";
      if (rawText.includes("tpu")) return "/products/tubing/tpu-tubing";
      if (rawText.includes("fep")) return "/products/tubing/fep-tubing";
      if (rawText.includes("ptfe")) return "/products/tubing/ptfe-tubing";
      if (rawText.includes("peek")) return "/products/tubing/peek-tubing";
      if (rawText.includes("pfa")) return "/products/tubing/pfa-tubing";

--- components\products\selection\ProductSelectionClient.tsx line 634 ---
      if (rawText.includes("pvc")) return "/products/tubing/pvc-tubing";
      if (rawText.includes("tpu")) return "/products/tubing/tpu-tubing";
      if (rawText.includes("fep")) return "/products/tubing/fep-tubing";
      if (rawText.includes("ptfe")) return "/products/tubing/ptfe-tubing";
      if (rawText.includes("peek")) return "/products/tubing/peek-tubing";
      if (rawText.includes("pfa")) return "/products/tubing/pfa-tubing";


--- components\products\selection\ProductSelectionClient.tsx line 635 ---
      if (rawText.includes("tpu")) return "/products/tubing/tpu-tubing";
      if (rawText.includes("fep")) return "/products/tubing/fep-tubing";
      if (rawText.includes("ptfe")) return "/products/tubing/ptfe-tubing";
      if (rawText.includes("peek")) return "/products/tubing/peek-tubing";
      if (rawText.includes("pfa")) return "/products/tubing/pfa-tubing";

      return "/products";

--- components\products\selection\ProductSelectionClient.tsx line 636 ---
      if (rawText.includes("fep")) return "/products/tubing/fep-tubing";
      if (rawText.includes("ptfe")) return "/products/tubing/ptfe-tubing";
      if (rawText.includes("peek")) return "/products/tubing/peek-tubing";
      if (rawText.includes("pfa")) return "/products/tubing/pfa-tubing";

      return "/products";
    }

--- components\products\selection\ProductSelectionClient.tsx line 638 ---
      if (rawText.includes("peek")) return "/products/tubing/peek-tubing";
      if (rawText.includes("pfa")) return "/products/tubing/pfa-tubing";

      return "/products";
    }
  }


--- components\products\selection\ProductSelectionClient.tsx line 647 ---
    PROBE_DETAIL_HREF_PATCH_FORCE_NEEDLES

    产品中心针系列 categoryId 使用 needles。
    详情页路由使用 /products/probes/[slug]。
    避免生成 /products/probes/undefined。
  */
  if (

--- components\products\selection\ProductSelectionClient.tsx line 648 ---

    产品中心针系列 categoryId 使用 needles。
    详情页路由使用 /products/probes/[slug]。
    避免生成 /products/probes/undefined。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||

--- components\products\selection\ProductSelectionClient.tsx line 685 ---
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;
    }

    return "/products";

--- components\products\selection\ProductSelectionClient.tsx line 688 ---
      return `/products/probes/${probeSlug}`;
    }

    return "/products";
  }

  /*

--- components\products\selection\ProductSelectionClient.tsx line 733 ---
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;
    }

    return "/products";

--- components\products\selection\ProductSelectionClient.tsx line 736 ---
      return `/products/probes/${probeSlug}`;
    }

    return "/products";
  }

  /*

--- components\products\selection\ProductSelectionClient.tsx line 744 ---

    针系列产品类型使用中文显示，详情路径不能依赖 productTypeId。
    这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
    避免生成 /products/probes/undefined。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||

--- components\products\selection\ProductSelectionClient.tsx line 781 ---
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;
    }

    return "/products";

--- components\products\selection\ProductSelectionClient.tsx line 784 ---
      return `/products/probes/${probeSlug}`;
    }

    return "/products";
  }

  /*

--- components\products\selection\ProductSelectionClient.tsx line 793 ---
    阀系列产品类型为了中文显示，productTypeId 可能是“旋转阀 / 高压阀 / 电磁阀”。
    因此详情链接不能只依赖 productTypeId。
    这里优先读取 detailHref / href / detailSlug / routeSlug / slug / seriesSlug。
    避免生成 /products/valves/undefined/。
  */
  if ((product as any)?.categoryId === "valves") {
    const rawHref = String(

--- components\products\selection\ProductSelectionClient.tsx line 825 ---
      valveSlug !== "undefined" &&
      valveSlug !== "null"
    ) {
      return `/products/valves/${valveSlug}`;
    }

    return "/products";

--- components\products\selection\ProductSelectionClient.tsx line 828 ---
      return `/products/valves/${valveSlug}`;
    }

    return "/products";
  }

  

--- components\products\selection\ProductSelectionClient.tsx line 842 ---
    return (
      product.detailHref ||
      product.href ||
      `/products/valves/${product.productTypeId}`
    );
  }


--- components\products\selection\ProductSelectionClient.tsx line 867 ---
      .pop();

    return slug
      ? `/products/pumps/valveless-pumps/${slug}`
      : "/products/pumps/valveless-pumps";
  }


--- components\products\selection\ProductSelectionClient.tsx line 868 ---

    return slug
      ? `/products/pumps/valveless-pumps/${slug}`
      : "/products/pumps/valveless-pumps";
  }

  if (isSyringePump) {

--- components\products\selection\ProductSelectionClient.tsx line 884 ---
      .pop();

    return slug
      ? `/products/pumps/syringe-pumps/${slug}`
      : "/products/pumps/syringe-pumps";
  }
const isDiaphragmPump =

--- components\products\selection\ProductSelectionClient.tsx line 885 ---

    return slug
      ? `/products/pumps/syringe-pumps/${slug}`
      : "/products/pumps/syringe-pumps";
  }
const isDiaphragmPump =
    product.categoryId === "pumps" &&

--- components\products\selection\ProductSelectionClient.tsx line 904 ---
      .pop();

    return slug
      ? `/products/pumps/diaphragm-pumps/${slug}`
      : "/products/pumps/diaphragm-pumps";
  }  const isPipettingPump =
    product.categoryId === "pumps" &&

--- components\products\selection\ProductSelectionClient.tsx line 905 ---

    return slug
      ? `/products/pumps/diaphragm-pumps/${slug}`
      : "/products/pumps/diaphragm-pumps";
  }  const isPipettingPump =
    product.categoryId === "pumps" &&
    ["pipette-pump", "pipetting-pump", "pipetting-pumps"].includes(product.productTypeId);

--- components\products\selection\ProductSelectionClient.tsx line 923 ---
      .pop();

    return slug
      ? `/products/pumps/pipetting-pumps/${slug}`
      : "/products/pumps/pipetting-pumps";
  }


--- components\products\selection\ProductSelectionClient.tsx line 924 ---

    return slug
      ? `/products/pumps/pipetting-pumps/${slug}`
      : "/products/pumps/pipetting-pumps";
  }



--- components\products\selection\ProductSelectionClient.tsx line 938 ---
    const slug = getPlungerPumpModelSlugForDetailHref(product);

    return slug
      ? `/products/pumps/plunger-pumps/${slug}`
      : "/products/pumps/plunger-pumps";
  }


--- components\products\selection\ProductSelectionClient.tsx line 939 ---

    return slug
      ? `/products/pumps/plunger-pumps/${slug}`
      : "/products/pumps/plunger-pumps";
  }

  return `/products/${product.categoryId}/${product.detailSlug}`;

--- components\products\selection\ProductSelectionClient.tsx line 942 ---
      : "/products/pumps/plunger-pumps";
  }

  return `/products/${product.categoryId}/${product.detailSlug}`;
}

export default function ProductSelectionClient({

--- components\products\selection\ProductSelectionClient.tsx line 945 ---
  return `/products/${product.categoryId}/${product.detailSlug}`;
}

export default function ProductSelectionClient({
  locale = "zh",
  initialCategoryId,
  initialProductTypeId,

--- components\products\selection\ProductSelectionClient.tsx line 950 ---
  initialCategoryId,
  initialProductTypeId,
  initialFilters,
}: ProductSelectionClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCategoryId = searchParams.get("category");

--- components\products\selection\ProductSelectionClient.tsx line 1013 ---
    return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);
  });
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [productsPageSize, setProductsPageSize] = useState(12);

  const activeCategory = useMemo(() => {
    return (

--- components\products\selection\ProductSelectionClient.tsx line 1023 ---
    );
  }, [activeCategoryId, categoryItems]);

  const categoryProducts = useMemo(() => {
    return getProductsByCategory(activeCategoryId);
  }, [activeCategoryId]);


--- components\products\selection\ProductSelectionClient.tsx line 1024 ---
  }, [activeCategoryId, categoryItems]);

  const categoryProducts = useMemo(() => {
    return getProductsByCategory(activeCategoryId);
  }, [activeCategoryId]);

  const productTypeOptions = useMemo(() => {

--- components\products\selection\ProductSelectionClient.tsx line 1035 ---
     * 1. 先读取已有产品数据中的产品类型
     * 2. 这部分用于已经有产品卡片的数据，例如 EA 柱塞泵
     */
    categoryProducts.forEach((product) => {
      if (!product.productTypeId) return;

      if (!optionMap.has(product.productTypeId)) {

--- components\products\selection\ProductSelectionClient.tsx line 1062 ---
    });

    return Array.from(optionMap.values());
  }, [activeCategoryId, categoryProducts, locale]);

  const currentTypeProducts = useMemo(() => {
    if (!activeProductTypeId) {

--- components\products\selection\ProductSelectionClient.tsx line 1064 ---
    return Array.from(optionMap.values());
  }, [activeCategoryId, categoryProducts, locale]);

  const currentTypeProducts = useMemo(() => {
    if (!activeProductTypeId) {
      return categoryProducts;
    }

--- components\products\selection\ProductSelectionClient.tsx line 1066 ---

  const currentTypeProducts = useMemo(() => {
    if (!activeProductTypeId) {
      return categoryProducts;
    }

    return categoryProducts.filter((product) => {

--- components\products\selection\ProductSelectionClient.tsx line 1069 ---
      return categoryProducts;
    }

    return categoryProducts.filter((product) => {
      return product.productTypeId === activeProductTypeId;
    });
  }, [activeProductTypeId, categoryProducts]);

--- components\products\selection\ProductSelectionClient.tsx line 1072 ---
    return categoryProducts.filter((product) => {
      return product.productTypeId === activeProductTypeId;
    });
  }, [activeProductTypeId, categoryProducts]);

  const activeFilterLabels = useMemo(() => {
    return getVisibleFilterLabels(activeProductTypeId);

--- components\products\selection\ProductSelectionClient.tsx line 1078 ---
    return getVisibleFilterLabels(activeProductTypeId);
  }, [activeProductTypeId]);

  const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
    const groups: ProductSelectionFilterGroup[] = [];

    if (productTypeOptions.length > 0) {

--- components\products\selection\ProductSelectionClient.tsx line 1079 ---
  }, [activeProductTypeId]);

  const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
    const groups: ProductSelectionFilterGroup[] = [];

    if (productTypeOptions.length > 0) {
      groups.push({

--- components\products\selection\ProductSelectionClient.tsx line 1090 ---
      });
    }

    activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
      const options = getFilterOptions(
        currentTypeProducts,
        label.filterKey,

--- components\products\selection\ProductSelectionClient.tsx line 1092 ---

    activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
      const options = getFilterOptions(
        currentTypeProducts,
        label.filterKey,
        selectedFilters,
        activeProductTypeId

--- components\products\selection\ProductSelectionClient.tsx line 1109 ---
    });

    return groups;
  }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);

  const matchedProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

--- components\products\selection\ProductSelectionClient.tsx line 1111 ---
    return groups;
  }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);

  const matchedProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return categoryProducts.filter((product) => {

--- components\products\selection\ProductSelectionClient.tsx line 1114 ---
  const matchedProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return categoryProducts.filter((product) => {
      if (activeProductTypeId && product.productTypeId !== activeProductTypeId) {
        return false;
      }

--- components\products\selection\ProductSelectionClient.tsx line 1159 ---

      return searchText.includes(keyword);
    });
  }, [activeProductTypeId, categoryProducts, searchKeyword, selectedFilters]);

  /*
   * 当前产品种类介绍数据

--- components\products\selection\ProductSelectionClient.tsx line 1172 ---
    activeCategoryId,
    activeProductTypeId
  );
  const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
    const tags: ProductSelectionSelectedTag[] = [];

    if (activeProductTypeId) {

--- components\products\selection\ProductSelectionClient.tsx line 1173 ---
    activeProductTypeId
  );
  const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
    const tags: ProductSelectionSelectedTag[] = [];

    if (activeProductTypeId) {
      tags.push({

--- components\products\selection\ProductSelectionClient.tsx line 1202 ---

  const totalProductPages = Math.max(
    1,
    Math.ceil(matchedProducts.length / productsPageSize)
  );

  const safeCurrentProductPage = Math.min(

--- components\products\selection\ProductSelectionClient.tsx line 1210 ---
    totalProductPages
  );

  const pagedProducts = matchedProducts.slice(
    (safeCurrentProductPage - 1) * productsPageSize,
    safeCurrentProductPage * productsPageSize
  );

--- components\products\selection\ProductSelectionClient.tsx line 1211 ---
  );

  const pagedProducts = matchedProducts.slice(
    (safeCurrentProductPage - 1) * productsPageSize,
    safeCurrentProductPage * productsPageSize
  );


--- components\products\selection\ProductSelectionClient.tsx line 1212 ---

  const pagedProducts = matchedProducts.slice(
    (safeCurrentProductPage - 1) * productsPageSize,
    safeCurrentProductPage * productsPageSize
  );

  useEffect(() => {

--- components\products\selection\ProductSelectionClient.tsx line 1216 ---
  );

  useEffect(() => {
    function updateProductsPageSize() {
      setProductsPageSize(getResponsiveProductPageSize());
    }


--- components\products\selection\ProductSelectionClient.tsx line 1217 ---

  useEffect(() => {
    function updateProductsPageSize() {
      setProductsPageSize(getResponsiveProductPageSize());
    }

    updateProductsPageSize();

--- components\products\selection\ProductSelectionClient.tsx line 1220 ---
      setProductsPageSize(getResponsiveProductPageSize());
    }

    updateProductsPageSize();

    window.addEventListener("resize", updateProductsPageSize);


--- components\products\selection\ProductSelectionClient.tsx line 1222 ---

    updateProductsPageSize();

    window.addEventListener("resize", updateProductsPageSize);

    return () => {
      window.removeEventListener("resize", updateProductsPageSize);

--- components\products\selection\ProductSelectionClient.tsx line 1225 ---
    window.addEventListener("resize", updateProductsPageSize);

    return () => {
      window.removeEventListener("resize", updateProductsPageSize);
    };
  }, []);


--- components\products\selection\ProductSelectionClient.tsx line 1239 ---
        ? preferredCategoryId
        : fallbackCategoryId;

    const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
    const preferredProductTypeId =
      requestedProductTypeId || initialProductTypeId;


--- components\products\selection\ProductSelectionClient.tsx line 1243 ---
    const preferredProductTypeId =
      requestedProductTypeId || initialProductTypeId;

    const productTypeExistsInProducts = Boolean(
      preferredProductTypeId &&
        categoryProductsForUrl.some(
          (product) => product.productTypeId === preferredProductTypeId

--- components\products\selection\ProductSelectionClient.tsx line 1245 ---

    const productTypeExistsInProducts = Boolean(
      preferredProductTypeId &&
        categoryProductsForUrl.some(
          (product) => product.productTypeId === preferredProductTypeId
        )
    );

--- components\products\selection\ProductSelectionClient.tsx line 1257 ---

    const nextProductTypeId =
      preferredProductTypeId &&
      (productTypeExistsInProducts || productTypeExistsInRouteMap)
        ? preferredProductTypeId
        : getFirstProductTypeId(nextCategoryId);


--- components\products\selection\ProductSelectionClient.tsx line 1295 ---
    activeProductTypeId,
    selectedFilters,
    searchKeyword,
    productsPageSize,
  ]);
  /*
   * 筛选项联动后的自动清理：

--- components\products\selection\ProductSelectionClient.tsx line 1369 ---
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
  }

  function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
    setMobileOpenFilterGroups((current) => ({
      ...current,
      [key]: !current[key],

--- components\products\selection\ProductSelectionClient.tsx line 1380 ---
    /*
     * 说明：
     * 1. 点击产品类型时，优先跳转正式 URL
     * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/
     * 3. 没配置正式 URL 的类型，才走原来的前端筛选逻辑
     */
    const productTypeHref = getProductTypeHrefByIds(

--- components\products\selection\ProductSelectionClient.tsx line 1399 ---
  }

  function handleFilterChange(
    group: ProductSelectionFilterGroup,
    value: string
  ) {
    /*

--- components\products\selection\ProductSelectionClient.tsx line 1517 ---
    });
  }
  function isFilterOptionActive(
    group: ProductSelectionFilterGroup,
    value: string
  ) {
    /*

--- components\products\selection\ProductSelectionClient.tsx line 1561 ---
     * 说明：
     * 1. 判断当前清除的标签是否命中正式系列路由
     * 2. 例如 EA 常规柱塞泵命中：
     *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
     * 3. 清除后跳回产品类型页：
     *    /products/pumps/plunger-pumps/
     */

--- components\products\selection\ProductSelectionClient.tsx line 1563 ---
     * 2. 例如 EA 常规柱塞泵命中：
     *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
     * 3. 清除后跳回产品类型页：
     *    /products/pumps/plunger-pumps/
     */
    const seriesHref = getSeriesHrefByFilterValue(
      activeCategoryId,

--- components\products\selection\ProductSelectionClient.tsx line 1622 ---
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
  }
  function createProductCartItem(
    product: ProductSelectionProduct
  ): SelectionCartItemInput {
    const title = getText(locale, product.cardTitle, product.productId);


--- components\products\selection\ProductSelectionClient.tsx line 1640 ---
    };
  }

  function toggleProductInList(product: ProductSelectionProduct) {
    const currentItem = getItem("pump-selection", product.productId);

    if (currentItem) {

--- components\products\selection\ProductSelectionClient.tsx line 1652 ---
  }

  return (
    <div className="products-selection-page">
<SitePageShell
        breadcrumbAriaLabel={locale === "zh" ? "面包屑导航" : "Breadcrumb"}
        breadcrumbItems={[

--- components\products\selection\ProductSelectionClient.tsx line 1665 ---
          },
        ]}
      >
        <main className="products-main">
          <div className="products-container">
            <ResourceSearchBar
              value={searchKeyword}

--- components\products\selection\ProductSelectionClient.tsx line 1666 ---
        ]}
      >
        <main className="products-main">
          <div className="products-container">
            <ResourceSearchBar
              value={searchKeyword}
              onChange={setSearchKeyword}

--- components\products\selection\ProductSelectionClient.tsx line 1738 ---
            />

            <section className="product-area">
              <ProductSelectionToolbar
                total={matchedProducts.length}
                resultPrefix={pageText.resultPrefix}
                resultSuffix={pageText.resultSuffix}

--- components\products\selection\ProductSelectionClient.tsx line 1739 ---

            <section className="product-area">
              <ProductSelectionToolbar
                total={matchedProducts.length}
                resultPrefix={pageText.resultPrefix}
                resultSuffix={pageText.resultSuffix}
                resetButtonText={pageText.resetFilters}

--- components\products\selection\ProductSelectionClient.tsx line 1748 ---
                onResetFilters={resetCurrentFilters}
              />

              {matchedProducts.length > 0 ? (
                <>
                  <ProductCardGrid
                    products={pagedProducts}

--- components\products\selection\ProductSelectionClient.tsx line 1751 ---
              {matchedProducts.length > 0 ? (
                <>
                  <ProductCardGrid
                    products={pagedProducts}
                    selectedList={selectedList}
                    detailButtonText={pageText.detailButton}
                    addToListText={pageText.addToList}

--- components\products\selection\ProductSelectionClient.tsx line 1766 ---
                    onToggleList={toggleProductInList}
                  />

                  <ProductSelectionPagination
                    currentPage={safeCurrentProductPage}
                    totalPages={totalProductPages}
                    previousText={pageText.previousPage}

## 3. ProductSelectionClient 数据合并位置


--- components\products\selection\ProductSelectionClient.tsx line 23 ---
  selectionFilterLabels as baseSelectionFilterLabels,
  selectionProducts as baseSelectionProducts,
  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import {
  diaphragmPumpSelectionProducts,
  diaphragmPumpTaxonomyItems,

--- components\products\selection\ProductSelectionClient.tsx line 25 ---
  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import {
  diaphragmPumpSelectionProducts,
  diaphragmPumpTaxonomyItems,
  diaphragmPumpFilterLabels,
} from "@/data/products/selection/diaphragm-pump-selection.generated";

--- components\products\selection\ProductSelectionClient.tsx line 26 ---
} from "@/data/products/selection/product-selection.generated";
import {
  diaphragmPumpSelectionProducts,
  diaphragmPumpTaxonomyItems,
  diaphragmPumpFilterLabels,
} from "@/data/products/selection/diaphragm-pump-selection.generated";
import {

--- components\products\selection\ProductSelectionClient.tsx line 27 ---
import {
  diaphragmPumpSelectionProducts,
  diaphragmPumpTaxonomyItems,
  diaphragmPumpFilterLabels,
} from "@/data/products/selection/diaphragm-pump-selection.generated";
import {
  pipettingPumpSelectionProducts,

--- components\products\selection\ProductSelectionClient.tsx line 28 ---
  diaphragmPumpSelectionProducts,
  diaphragmPumpTaxonomyItems,
  diaphragmPumpFilterLabels,
} from "@/data/products/selection/diaphragm-pump-selection.generated";
import {
  pipettingPumpSelectionProducts,
  pipettingPumpFilterLabels,

--- components\products\selection\ProductSelectionClient.tsx line 30 ---
  diaphragmPumpFilterLabels,
} from "@/data/products/selection/diaphragm-pump-selection.generated";
import {
  pipettingPumpSelectionProducts,
  pipettingPumpFilterLabels,
} from "@/data/products/selection/pipetting-pump-selection.generated";
import {

--- components\products\selection\ProductSelectionClient.tsx line 31 ---
} from "@/data/products/selection/diaphragm-pump-selection.generated";
import {
  pipettingPumpSelectionProducts,
  pipettingPumpFilterLabels,
} from "@/data/products/selection/pipetting-pump-selection.generated";
import {
  valvelessPumpSelectionProducts,

--- components\products\selection\ProductSelectionClient.tsx line 32 ---
import {
  pipettingPumpSelectionProducts,
  pipettingPumpFilterLabels,
} from "@/data/products/selection/pipetting-pump-selection.generated";
import {
  valvelessPumpSelectionProducts,
  valvelessPumpFilterLabels,

--- components\products\selection\ProductSelectionClient.tsx line 34 ---
  pipettingPumpFilterLabels,
} from "@/data/products/selection/pipetting-pump-selection.generated";
import {
  valvelessPumpSelectionProducts,
  valvelessPumpFilterLabels,
} from "@/data/products/selection/valveless-pump-selection.generated";
import {

--- components\products\selection\ProductSelectionClient.tsx line 35 ---
} from "@/data/products/selection/pipetting-pump-selection.generated";
import {
  valvelessPumpSelectionProducts,
  valvelessPumpFilterLabels,
} from "@/data/products/selection/valveless-pump-selection.generated";
import {
  valveSelectionProducts,

--- components\products\selection\ProductSelectionClient.tsx line 36 ---
import {
  valvelessPumpSelectionProducts,
  valvelessPumpFilterLabels,
} from "@/data/products/selection/valveless-pump-selection.generated";
import {
  valveSelectionProducts,
  valveFilterLabels,

--- components\products\selection\ProductSelectionClient.tsx line 38 ---
  valvelessPumpFilterLabels,
} from "@/data/products/selection/valveless-pump-selection.generated";
import {
  valveSelectionProducts,
  valveFilterLabels,
} from "@/data/products/selection/valve-selection.generated";
import {

--- components\products\selection\ProductSelectionClient.tsx line 39 ---
} from "@/data/products/selection/valveless-pump-selection.generated";
import {
  valveSelectionProducts,
  valveFilterLabels,
} from "@/data/products/selection/valve-selection.generated";
import {
  probeSelectionProducts,

--- components\products\selection\ProductSelectionClient.tsx line 40 ---
import {
  valveSelectionProducts,
  valveFilterLabels,
} from "@/data/products/selection/valve-selection.generated";
import {
  probeSelectionProducts,
  probeFilterLabels,

--- components\products\selection\ProductSelectionClient.tsx line 42 ---
  valveFilterLabels,
} from "@/data/products/selection/valve-selection.generated";
import {
  probeSelectionProducts,
  probeFilterLabels,
} from "@/data/products/selection/probe-selection.generated";


--- components\products\selection\ProductSelectionClient.tsx line 43 ---
} from "@/data/products/selection/valve-selection.generated";
import {
  probeSelectionProducts,
  probeFilterLabels,
} from "@/data/products/selection/probe-selection.generated";

import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

--- components\products\selection\ProductSelectionClient.tsx line 44 ---
import {
  probeSelectionProducts,
  probeFilterLabels,
} from "@/data/products/selection/probe-selection.generated";

import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";


--- components\products\selection\ProductSelectionClient.tsx line 46 ---
  probeFilterLabels,
} from "@/data/products/selection/probe-selection.generated";

import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

import ProductCardGrid from "./ProductCardGrid";
import ProductCategoryTabs from "./ProductCategoryTabs";

--- components\products\selection\ProductSelectionClient.tsx line 55 ---
import ProductSelectionPagination from "./ProductSelectionPagination";
import ProductSelectionToolbar from "./ProductSelectionToolbar";
import {
  syringePumpFilterLabels,
  syringePumpSelectionProducts,
} from "@/data/products/selection/syringe-pump-selection.generated";


--- components\products\selection\ProductSelectionClient.tsx line 56 ---
import ProductSelectionToolbar from "./ProductSelectionToolbar";
import {
  syringePumpFilterLabels,
  syringePumpSelectionProducts,
} from "@/data/products/selection/syringe-pump-selection.generated";

import type {

--- components\products\selection\ProductSelectionClient.tsx line 57 ---
import {
  syringePumpFilterLabels,
  syringePumpSelectionProducts,
} from "@/data/products/selection/syringe-pump-selection.generated";

import type {
  ProductSelectionFilterLabel,

--- components\products\selection\ProductSelectionClient.tsx line 74 ---

const selectionProducts = [
  ...baseSelectionProducts,
  ...diaphragmPumpSelectionProducts,
  ...pipettingPumpSelectionProducts,
  ...valvelessPumpSelectionProducts,
  ...valveSelectionProducts,

--- components\products\selection\ProductSelectionClient.tsx line 75 ---
const selectionProducts = [
  ...baseSelectionProducts,
  ...diaphragmPumpSelectionProducts,
  ...pipettingPumpSelectionProducts,
  ...valvelessPumpSelectionProducts,
  ...valveSelectionProducts,
  ...probeSelectionProducts,

--- components\products\selection\ProductSelectionClient.tsx line 76 ---
  ...baseSelectionProducts,
  ...diaphragmPumpSelectionProducts,
  ...pipettingPumpSelectionProducts,
  ...valvelessPumpSelectionProducts,
  ...valveSelectionProducts,
  ...probeSelectionProducts,
  ...syringePumpSelectionProducts,

--- components\products\selection\ProductSelectionClient.tsx line 77 ---
  ...diaphragmPumpSelectionProducts,
  ...pipettingPumpSelectionProducts,
  ...valvelessPumpSelectionProducts,
  ...valveSelectionProducts,
  ...probeSelectionProducts,
  ...syringePumpSelectionProducts,
].filter((product, index, array) => {

--- components\products\selection\ProductSelectionClient.tsx line 78 ---
  ...pipettingPumpSelectionProducts,
  ...valvelessPumpSelectionProducts,
  ...valveSelectionProducts,
  ...probeSelectionProducts,
  ...syringePumpSelectionProducts,
].filter((product, index, array) => {
  return index === array.findIndex((item) => item.productId === product.productId);

--- components\products\selection\ProductSelectionClient.tsx line 79 ---
  ...valvelessPumpSelectionProducts,
  ...valveSelectionProducts,
  ...probeSelectionProducts,
  ...syringePumpSelectionProducts,
].filter((product, index, array) => {
  return index === array.findIndex((item) => item.productId === product.productId);
});

--- components\products\selection\ProductSelectionClient.tsx line 86 ---

const selectionTaxonomyItems = [
  ...baseSelectionTaxonomyItems,
  ...diaphragmPumpTaxonomyItems,
].filter((item, index, array) => {
  return index === array.findIndex((entry) => entry.id === item.id);
});

--- components\products\selection\ProductSelectionClient.tsx line 93 ---

const selectionFilterLabels = [
  ...baseSelectionFilterLabels,
  ...diaphragmPumpFilterLabels,
  ...pipettingPumpFilterLabels,
  ...valvelessPumpFilterLabels,
  ...valveFilterLabels,

--- components\products\selection\ProductSelectionClient.tsx line 94 ---
const selectionFilterLabels = [
  ...baseSelectionFilterLabels,
  ...diaphragmPumpFilterLabels,
  ...pipettingPumpFilterLabels,
  ...valvelessPumpFilterLabels,
  ...valveFilterLabels,
  ...probeFilterLabels,

--- components\products\selection\ProductSelectionClient.tsx line 95 ---
  ...baseSelectionFilterLabels,
  ...diaphragmPumpFilterLabels,
  ...pipettingPumpFilterLabels,
  ...valvelessPumpFilterLabels,
  ...valveFilterLabels,
  ...probeFilterLabels,
  ...syringePumpFilterLabels,

--- components\products\selection\ProductSelectionClient.tsx line 96 ---
  ...diaphragmPumpFilterLabels,
  ...pipettingPumpFilterLabels,
  ...valvelessPumpFilterLabels,
  ...valveFilterLabels,
  ...probeFilterLabels,
  ...syringePumpFilterLabels,
].filter((label, index, array) => {

--- components\products\selection\ProductSelectionClient.tsx line 97 ---
  ...pipettingPumpFilterLabels,
  ...valvelessPumpFilterLabels,
  ...valveFilterLabels,
  ...probeFilterLabels,
  ...syringePumpFilterLabels,
].filter((label, index, array) => {
  return (

--- components\products\selection\ProductSelectionClient.tsx line 98 ---
  ...valvelessPumpFilterLabels,
  ...valveFilterLabels,
  ...probeFilterLabels,
  ...syringePumpFilterLabels,
].filter((label, index, array) => {
  return (
    index ===

--- components\products\selection\ProductSelectionClient.tsx line 257 ---

const DEFAULT_CATEGORIES: ProductSelectionCategoryItem[] = [
  {
    id: "pumps",
    label: "泵系列",
    description: "根据泵类型、系列、量程和核心筛选项选择基础配置。",
    sortOrder: 10,

--- components\products\selection\ProductSelectionClient.tsx line 263 ---
    sortOrder: 10,
  },
  {
    id: "valves",
    label: "阀系列",
    description: "根据阀类型、系列、通路、位数和材质选择基础配置。",
    sortOrder: 20,

--- components\products\selection\ProductSelectionClient.tsx line 269 ---
    sortOrder: 20,
  },
  {
    id: "needles",
    label: "针系列",
    description: "根据针类型、规格和应用场景选择基础配置。",
    sortOrder: 30,

--- components\products\selection\ProductSelectionClient.tsx line 311 ---
}

function getCategoryItems(locale: SelectionLocale) {
  const generatedCategories = selectionTaxonomyItems
    .filter((item) => item.type === "category")
    .map((item) => {
      const fallback = DEFAULT_CATEGORIES.find(

--- components\products\selection\ProductSelectionClient.tsx line 334 ---
    categoryMap.set(category.id, category);
  });

  generatedCategories.forEach((category) => {
    categoryMap.set(category.id, category);
  });


--- components\products\selection\ProductSelectionClient.tsx line 465 ---
    .replace(/^-+|-+$/g, "");
}

function findPlungerPumpDetailSlug(product: ProductSelectionProduct) {
  const candidates = [
    product.cardTitle?.en,
    product.cardTitle?.zh,

--- components\products\selection\ProductSelectionClient.tsx line 475 ---
    .map(normalizeModelKey)
    .filter(Boolean);

  const matchedDetail = (plungerPumpDetails as any[]).find((detail) => {
    const detailCandidates = [
      detail.model,
      detail.productId,

--- components\products\selection\ProductSelectionClient.tsx line 496 ---
}


/* ===== FOREACH plunger pump model detail href helpers START ===== */

function cleanPlungerHrefText(value: unknown) {
  return String(value || "").trim();

--- components\products\selection\ProductSelectionClient.tsx line 515 ---
    .replace(/^-+|-+$/g, "");
}

function getPlungerPumpModelSlugForDetailHref(product: ProductSelectionProduct) {
  const existingSlug = normalizePlungerPathPart(product.detailSlug);

  if (/^(ea|sm|tm)-\d+-(pmma|peek)$/i.test(existingSlug)) {

--- components\products\selection\ProductSelectionClient.tsx line 563 ---
  return normalizePlungerModelSlug(product.cardTitle?.en || product.cardTitle?.zh || product.productId || product.detailSlug);
}

/* ===== FOREACH plunger pump model detail href helpers END ===== */


function makeDetailHref(product: ProductSelectionProduct) {

--- components\products\selection\ProductSelectionClient.tsx line 644 ---


  /*
    PROBE_DETAIL_HREF_PATCH_FORCE_NEEDLES

    产品中心针系列 categoryId 使用 needles。
    详情页路由使用 /products/probes/[slug]。

--- components\products\selection\ProductSelectionClient.tsx line 646 ---
  /*
    PROBE_DETAIL_HREF_PATCH_FORCE_NEEDLES

    产品中心针系列 categoryId 使用 needles。
    详情页路由使用 /products/probes/[slug]。
    避免生成 /products/probes/undefined。
  */

--- components\products\selection\ProductSelectionClient.tsx line 647 ---
    PROBE_DETAIL_HREF_PATCH_FORCE_NEEDLES

    产品中心针系列 categoryId 使用 needles。
    详情页路由使用 /products/probes/[slug]。
    避免生成 /products/probes/undefined。
  */
  if (

--- components\products\selection\ProductSelectionClient.tsx line 648 ---

    产品中心针系列 categoryId 使用 needles。
    详情页路由使用 /products/probes/[slug]。
    避免生成 /products/probes/undefined。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||

--- components\products\selection\ProductSelectionClient.tsx line 651 ---
    避免生成 /products/probes/undefined。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.categoryId === "needles" ||
    (product as any)?.category === "needles" ||
    (product as any)?.categoryLabel === "针系列"

--- components\products\selection\ProductSelectionClient.tsx line 652 ---
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.categoryId === "needles" ||
    (product as any)?.category === "needles" ||
    (product as any)?.categoryLabel === "针系列"
  ) {

--- components\products\selection\ProductSelectionClient.tsx line 653 ---
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.categoryId === "needles" ||
    (product as any)?.category === "needles" ||
    (product as any)?.categoryLabel === "针系列"
  ) {
    const rawHref = String(

--- components\products\selection\ProductSelectionClient.tsx line 675 ---
      (product as any).seriesSlug ||
      slugFromHref;

    const probeSlug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

--- components\products\selection\ProductSelectionClient.tsx line 681 ---
      .pop();

    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {

--- components\products\selection\ProductSelectionClient.tsx line 682 ---

    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;

--- components\products\selection\ProductSelectionClient.tsx line 683 ---
    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;
    }

--- components\products\selection\ProductSelectionClient.tsx line 685 ---
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;
    }

    return "/products";

--- components\products\selection\ProductSelectionClient.tsx line 692 ---
  }

  /*
    PROBE_DETAIL_HREF_PATCH_20260709

    针系列在产品中心中使用中文 productTypeId 显示筛选项，
    详情路由不能依赖 productTypeId。

--- components\products\selection\ProductSelectionClient.tsx line 699 ---
    这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.category === "probes" ||
    (product as any)?.categoryId === "pumps" ||
    (product as any)?.categoryLabel === "针系列"

--- components\products\selection\ProductSelectionClient.tsx line 700 ---
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.category === "probes" ||
    (product as any)?.categoryId === "pumps" ||
    (product as any)?.categoryLabel === "针系列"
  ) {

--- components\products\selection\ProductSelectionClient.tsx line 701 ---
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.category === "probes" ||
    (product as any)?.categoryId === "pumps" ||
    (product as any)?.categoryLabel === "针系列"
  ) {
    const rawHref = String(

--- components\products\selection\ProductSelectionClient.tsx line 723 ---
      (product as any).seriesSlug ||
      slugFromHref;

    const probeSlug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

--- components\products\selection\ProductSelectionClient.tsx line 729 ---
      .pop();

    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {

--- components\products\selection\ProductSelectionClient.tsx line 730 ---

    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;

--- components\products\selection\ProductSelectionClient.tsx line 731 ---
    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;
    }

--- components\products\selection\ProductSelectionClient.tsx line 733 ---
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;
    }

    return "/products";

--- components\products\selection\ProductSelectionClient.tsx line 740 ---
  }

  /*
    PROBE_DETAIL_HREF_PATCH_20260708

    针系列产品类型使用中文显示，详情路径不能依赖 productTypeId。
    这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。

--- components\products\selection\ProductSelectionClient.tsx line 744 ---

    针系列产品类型使用中文显示，详情路径不能依赖 productTypeId。
    这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
    避免生成 /products/probes/undefined。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||

--- components\products\selection\ProductSelectionClient.tsx line 747 ---
    避免生成 /products/probes/undefined。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.category === "probes" ||
    (product as any)?.categoryId === "pumps" ||
    (product as any)?.categoryLabel === "针系列"

--- components\products\selection\ProductSelectionClient.tsx line 748 ---
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.category === "probes" ||
    (product as any)?.categoryId === "pumps" ||
    (product as any)?.categoryLabel === "针系列"
  ) {

--- components\products\selection\ProductSelectionClient.tsx line 749 ---
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.category === "probes" ||
    (product as any)?.categoryId === "pumps" ||
    (product as any)?.categoryLabel === "针系列"
  ) {
    const rawHref = String(

--- components\products\selection\ProductSelectionClient.tsx line 771 ---
      (product as any).seriesSlug ||
      slugFromHref;

    const probeSlug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

--- components\products\selection\ProductSelectionClient.tsx line 777 ---
      .pop();

    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {

--- components\products\selection\ProductSelectionClient.tsx line 778 ---

    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;

--- components\products\selection\ProductSelectionClient.tsx line 779 ---
    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;
    }

--- components\products\selection\ProductSelectionClient.tsx line 781 ---
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;
    }

    return "/products";

--- components\products\selection\ProductSelectionClient.tsx line 788 ---
  }

  /*
    VALVE_DETAIL_HREF_PATCH_20260707

    阀系列产品类型为了中文显示，productTypeId 可能是“旋转阀 / 高压阀 / 电磁阀”。
    因此详情链接不能只依赖 productTypeId。

--- components\products\selection\ProductSelectionClient.tsx line 793 ---
    阀系列产品类型为了中文显示，productTypeId 可能是“旋转阀 / 高压阀 / 电磁阀”。
    因此详情链接不能只依赖 productTypeId。
    这里优先读取 detailHref / href / detailSlug / routeSlug / slug / seriesSlug。
    避免生成 /products/valves/undefined/。
  */
  if ((product as any)?.categoryId === "valves") {
    const rawHref = String(

--- components\products\selection\ProductSelectionClient.tsx line 795 ---
    这里优先读取 detailHref / href / detailSlug / routeSlug / slug / seriesSlug。
    避免生成 /products/valves/undefined/。
  */
  if ((product as any)?.categoryId === "valves") {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).href ||

--- components\products\selection\ProductSelectionClient.tsx line 815 ---
      (product as any).seriesId ||
      slugFromHref;

    const valveSlug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

--- components\products\selection\ProductSelectionClient.tsx line 821 ---
      .pop();

    if (
      valveSlug &&
      valveSlug !== "undefined" &&
      valveSlug !== "null"
    ) {

--- components\products\selection\ProductSelectionClient.tsx line 822 ---

    if (
      valveSlug &&
      valveSlug !== "undefined" &&
      valveSlug !== "null"
    ) {
      return `/products/valves/${valveSlug}`;

--- components\products\selection\ProductSelectionClient.tsx line 823 ---
    if (
      valveSlug &&
      valveSlug !== "undefined" &&
      valveSlug !== "null"
    ) {
      return `/products/valves/${valveSlug}`;
    }

--- components\products\selection\ProductSelectionClient.tsx line 825 ---
      valveSlug !== "undefined" &&
      valveSlug !== "null"
    ) {
      return `/products/valves/${valveSlug}`;
    }

    return "/products";

--- components\products\selection\ProductSelectionClient.tsx line 832 ---
  }

  
  const isValveProduct =
    product.categoryId === "valves" &&
    ["rotary-valves", "high-pressure-valves", "solenoid-valves"].includes(
      product.productTypeId,

--- components\products\selection\ProductSelectionClient.tsx line 833 ---

  
  const isValveProduct =
    product.categoryId === "valves" &&
    ["rotary-valves", "high-pressure-valves", "solenoid-valves"].includes(
      product.productTypeId,
    );

--- components\products\selection\ProductSelectionClient.tsx line 834 ---
  
  const isValveProduct =
    product.categoryId === "valves" &&
    ["rotary-valves", "high-pressure-valves", "solenoid-valves"].includes(
      product.productTypeId,
    );


--- components\products\selection\ProductSelectionClient.tsx line 838 ---
      product.productTypeId,
    );

  if (isValveProduct) {
    return (
      product.detailHref ||
      product.href ||

--- components\products\selection\ProductSelectionClient.tsx line 842 ---
    return (
      product.detailHref ||
      product.href ||
      `/products/valves/${product.productTypeId}`
    );
  }


--- components\products\selection\ProductSelectionClient.tsx line 846 ---
    );
  }

  const isValvelessPump =
    product.categoryId === "pumps" &&
    ["valveless-pump", "valveless-pumps"].includes(product.productTypeId);


--- components\products\selection\ProductSelectionClient.tsx line 847 ---
  }

  const isValvelessPump =
    product.categoryId === "pumps" &&
    ["valveless-pump", "valveless-pumps"].includes(product.productTypeId);

  const isSyringePump =

--- components\products\selection\ProductSelectionClient.tsx line 848 ---

  const isValvelessPump =
    product.categoryId === "pumps" &&
    ["valveless-pump", "valveless-pumps"].includes(product.productTypeId);

  const isSyringePump =
    product.categoryId === "pumps" &&

--- components\products\selection\ProductSelectionClient.tsx line 850 ---
    product.categoryId === "pumps" &&
    ["valveless-pump", "valveless-pumps"].includes(product.productTypeId);

  const isSyringePump =
    product.categoryId === "pumps" &&
    ["syringe-pump", "syringe-pumps"].includes(product.productTypeId);


--- components\products\selection\ProductSelectionClient.tsx line 851 ---
    ["valveless-pump", "valveless-pumps"].includes(product.productTypeId);

  const isSyringePump =
    product.categoryId === "pumps" &&
    ["syringe-pump", "syringe-pumps"].includes(product.productTypeId);

  if (isValvelessPump) {

--- components\products\selection\ProductSelectionClient.tsx line 852 ---

  const isSyringePump =
    product.categoryId === "pumps" &&
    ["syringe-pump", "syringe-pumps"].includes(product.productTypeId);

  if (isValvelessPump) {
    const rawSlug =

--- components\products\selection\ProductSelectionClient.tsx line 854 ---
    product.categoryId === "pumps" &&
    ["syringe-pump", "syringe-pumps"].includes(product.productTypeId);

  if (isValvelessPump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||

--- components\products\selection\ProductSelectionClient.tsx line 867 ---
      .pop();

    return slug
      ? `/products/pumps/valveless-pumps/${slug}`
      : "/products/pumps/valveless-pumps";
  }


--- components\products\selection\ProductSelectionClient.tsx line 868 ---

    return slug
      ? `/products/pumps/valveless-pumps/${slug}`
      : "/products/pumps/valveless-pumps";
  }

  if (isSyringePump) {

--- components\products\selection\ProductSelectionClient.tsx line 871 ---
      : "/products/pumps/valveless-pumps";
  }

  if (isSyringePump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||

--- components\products\selection\ProductSelectionClient.tsx line 884 ---
      .pop();

    return slug
      ? `/products/pumps/syringe-pumps/${slug}`
      : "/products/pumps/syringe-pumps";
  }
const isDiaphragmPump =

--- components\products\selection\ProductSelectionClient.tsx line 885 ---

    return slug
      ? `/products/pumps/syringe-pumps/${slug}`
      : "/products/pumps/syringe-pumps";
  }
const isDiaphragmPump =
    product.categoryId === "pumps" &&

--- components\products\selection\ProductSelectionClient.tsx line 887 ---
      ? `/products/pumps/syringe-pumps/${slug}`
      : "/products/pumps/syringe-pumps";
  }
const isDiaphragmPump =
    product.categoryId === "pumps" &&
    ["diaphragm-pump", "diaphragm-pumps"].includes(product.productTypeId);


--- components\products\selection\ProductSelectionClient.tsx line 888 ---
      : "/products/pumps/syringe-pumps";
  }
const isDiaphragmPump =
    product.categoryId === "pumps" &&
    ["diaphragm-pump", "diaphragm-pumps"].includes(product.productTypeId);

  if (isDiaphragmPump) {

--- components\products\selection\ProductSelectionClient.tsx line 889 ---
  }
const isDiaphragmPump =
    product.categoryId === "pumps" &&
    ["diaphragm-pump", "diaphragm-pumps"].includes(product.productTypeId);

  if (isDiaphragmPump) {
    const rawSlug =

--- components\products\selection\ProductSelectionClient.tsx line 891 ---
    product.categoryId === "pumps" &&
    ["diaphragm-pump", "diaphragm-pumps"].includes(product.productTypeId);

  if (isDiaphragmPump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||

--- components\products\selection\ProductSelectionClient.tsx line 904 ---
      .pop();

    return slug
      ? `/products/pumps/diaphragm-pumps/${slug}`
      : "/products/pumps/diaphragm-pumps";
  }  const isPipettingPump =
    product.categoryId === "pumps" &&

--- components\products\selection\ProductSelectionClient.tsx line 905 ---

    return slug
      ? `/products/pumps/diaphragm-pumps/${slug}`
      : "/products/pumps/diaphragm-pumps";
  }  const isPipettingPump =
    product.categoryId === "pumps" &&
    ["pipette-pump", "pipetting-pump", "pipetting-pumps"].includes(product.productTypeId);

--- components\products\selection\ProductSelectionClient.tsx line 906 ---
    return slug
      ? `/products/pumps/diaphragm-pumps/${slug}`
      : "/products/pumps/diaphragm-pumps";
  }  const isPipettingPump =
    product.categoryId === "pumps" &&
    ["pipette-pump", "pipetting-pump", "pipetting-pumps"].includes(product.productTypeId);


--- components\products\selection\ProductSelectionClient.tsx line 907 ---
      ? `/products/pumps/diaphragm-pumps/${slug}`
      : "/products/pumps/diaphragm-pumps";
  }  const isPipettingPump =
    product.categoryId === "pumps" &&
    ["pipette-pump", "pipetting-pump", "pipetting-pumps"].includes(product.productTypeId);

  if (isPipettingPump) {

--- components\products\selection\ProductSelectionClient.tsx line 908 ---
      : "/products/pumps/diaphragm-pumps";
  }  const isPipettingPump =
    product.categoryId === "pumps" &&
    ["pipette-pump", "pipetting-pump", "pipetting-pumps"].includes(product.productTypeId);

  if (isPipettingPump) {
    const rawSlug =

--- components\products\selection\ProductSelectionClient.tsx line 910 ---
    product.categoryId === "pumps" &&
    ["pipette-pump", "pipetting-pump", "pipetting-pumps"].includes(product.productTypeId);

  if (isPipettingPump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||

--- components\products\selection\ProductSelectionClient.tsx line 923 ---
      .pop();

    return slug
      ? `/products/pumps/pipetting-pumps/${slug}`
      : "/products/pumps/pipetting-pumps";
  }


--- components\products\selection\ProductSelectionClient.tsx line 924 ---

    return slug
      ? `/products/pumps/pipetting-pumps/${slug}`
      : "/products/pumps/pipetting-pumps";
  }



--- components\products\selection\ProductSelectionClient.tsx line 930 ---



  const isPlungerPump =
    product.categoryId === "pumps" &&
    ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);


--- components\products\selection\ProductSelectionClient.tsx line 931 ---


  const isPlungerPump =
    product.categoryId === "pumps" &&
    ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);

  if (isPlungerPump) {

--- components\products\selection\ProductSelectionClient.tsx line 932 ---

  const isPlungerPump =
    product.categoryId === "pumps" &&
    ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);

  if (isPlungerPump) {
    const slug = getPlungerPumpModelSlugForDetailHref(product);

--- components\products\selection\ProductSelectionClient.tsx line 934 ---
    product.categoryId === "pumps" &&
    ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);

  if (isPlungerPump) {
    const slug = getPlungerPumpModelSlugForDetailHref(product);

    return slug

--- components\products\selection\ProductSelectionClient.tsx line 935 ---
    ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);

  if (isPlungerPump) {
    const slug = getPlungerPumpModelSlugForDetailHref(product);

    return slug
      ? `/products/pumps/plunger-pumps/${slug}`

--- components\products\selection\ProductSelectionClient.tsx line 938 ---
    const slug = getPlungerPumpModelSlugForDetailHref(product);

    return slug
      ? `/products/pumps/plunger-pumps/${slug}`
      : "/products/pumps/plunger-pumps";
  }


--- components\products\selection\ProductSelectionClient.tsx line 939 ---

    return slug
      ? `/products/pumps/plunger-pumps/${slug}`
      : "/products/pumps/plunger-pumps";
  }

  return `/products/${product.categoryId}/${product.detailSlug}`;

--- components\products\selection\ProductSelectionClient.tsx line 962 ---
  const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);

  const [activeCategoryId, setActiveCategoryId] = useState(() => {
    return initialCategoryId || categoryItems[0]?.id || "pumps";
  });

  const [activeProductTypeId, setActiveProductTypeId] = useState(() => {

--- components\products\selection\ProductSelectionClient.tsx line 967 ---

  const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";

    return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
  });

--- components\products\selection\ProductSelectionClient.tsx line 975 ---
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
    () => {
      const initialActiveCategoryId =
        initialCategoryId || categoryItems[0]?.id || "pumps";
      const initialActiveProductTypeId =
        initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);


--- components\products\selection\ProductSelectionClient.tsx line 996 ---
  const selectedList = useMemo(() => {
    return new Set(
      selectionCartItems
        .filter((item) => item.sourceType === "pump-selection")
        .map((item) => item.productCode)
    );
  }, [selectionCartItems]);

--- components\products\selection\ProductSelectionClient.tsx line 1006 ---
    Record<string, boolean>
  >(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";
    const initialActiveProductTypeId =
      initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);


--- components\products\selection\ProductSelectionClient.tsx line 1165 ---
   * 当前产品种类介绍数据
   * 说明：
   * 1. 根据当前产品大类和产品类型匹配介绍内容
   * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
   * 3. 找不到时不显示横幅
   */
  const activeProductTypeIntro = getProductTypeIntroByIds(

--- components\products\selection\ProductSelectionClient.tsx line 1230 ---
  }, []);

  useEffect(() => {
    const fallbackCategoryId = categoryItems[0]?.id || "pumps";
    const preferredCategoryId = requestedCategoryId || initialCategoryId;

    const nextCategoryId =

--- components\products\selection\ProductSelectionClient.tsx line 1380 ---
    /*
     * 说明：
     * 1. 点击产品类型时，优先跳转正式 URL
     * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/
     * 3. 没配置正式 URL 的类型，才走原来的前端筛选逻辑
     */
    const productTypeHref = getProductTypeHrefByIds(

--- components\products\selection\ProductSelectionClient.tsx line 1561 ---
     * 说明：
     * 1. 判断当前清除的标签是否命中正式系列路由
     * 2. 例如 EA 常规柱塞泵命中：
     *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
     * 3. 清除后跳回产品类型页：
     *    /products/pumps/plunger-pumps/
     */

--- components\products\selection\ProductSelectionClient.tsx line 1563 ---
     * 2. 例如 EA 常规柱塞泵命中：
     *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
     * 3. 清除后跳回产品类型页：
     *    /products/pumps/plunger-pumps/
     */
    const seriesHref = getSeriesHrefByFilterValue(
      activeCategoryId,

--- components\products\selection\ProductSelectionClient.tsx line 1627 ---
    const title = getText(locale, product.cardTitle, product.productId);

    return {
      sourceType: "pump-selection",
      sourceLabel: "产品中心",
      productName: getTaxonomyLabel(locale, product.productTypeId),
      productCode: product.productId,

--- components\products\selection\ProductSelectionClient.tsx line 1641 ---
  }

  function toggleProductInList(product: ProductSelectionProduct) {
    const currentItem = getItem("pump-selection", product.productId);

    if (currentItem) {
      removeItem(currentItem.id);

## 4. ProductSelectionClient 筛选过滤位置


--- components\products\selection\ProductSelectionClient.tsx line 104 ---
    index ===
    array.findIndex((item) => {
      return (
        item.productTypeId === label.productTypeId &&
        item.filterKey === label.filterKey
      );
    })

--- components\products\selection\ProductSelectionClient.tsx line 114 ---
type ProductSelectionClientProps = {
  locale?: SelectionLocale;
  pageData?: unknown;
  initialCategoryId?: string;
  initialProductTypeId?: string;
  initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
};

--- components\products\selection\ProductSelectionClient.tsx line 115 ---
  locale?: SelectionLocale;
  pageData?: unknown;
  initialCategoryId?: string;
  initialProductTypeId?: string;
  initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
};


--- components\products\selection\ProductSelectionClient.tsx line 343 ---
  );
}

function getProductsByCategory(categoryId: string) {
  return selectionProducts
    .filter((product) => product.categoryId === categoryId)
    .filter((product, index, array) => {

--- components\products\selection\ProductSelectionClient.tsx line 345 ---

function getProductsByCategory(categoryId: string) {
  return selectionProducts
    .filter((product) => product.categoryId === categoryId)
    .filter((product, index, array) => {
      return (
        index ===

--- components\products\selection\ProductSelectionClient.tsx line 354 ---
    });
}

function getFirstProductTypeId(categoryId: string) {
  const products = getProductsByCategory(categoryId);
  const first = products[0];


--- components\products\selection\ProductSelectionClient.tsx line 355 ---
}

function getFirstProductTypeId(categoryId: string) {
  const products = getProductsByCategory(categoryId);
  const first = products[0];

  return first?.productTypeId || "";

--- components\products\selection\ProductSelectionClient.tsx line 358 ---
  const products = getProductsByCategory(categoryId);
  const first = products[0];

  return first?.productTypeId || "";
}

function getVisibleFilterLabels(productTypeId: string) {

--- components\products\selection\ProductSelectionClient.tsx line 361 ---
  return first?.productTypeId || "";
}

function getVisibleFilterLabels(productTypeId: string) {
  return selectionFilterLabels
    .filter((item) => item.productTypeId === productTypeId && item.visible)
    .sort((current, next) => current.sortOrder - next.sortOrder);

--- components\products\selection\ProductSelectionClient.tsx line 363 ---

function getVisibleFilterLabels(productTypeId: string) {
  return selectionFilterLabels
    .filter((item) => item.productTypeId === productTypeId && item.visible)
    .sort((current, next) => current.sortOrder - next.sortOrder);
}


--- components\products\selection\ProductSelectionClient.tsx line 371 ---
  products: ProductSelectionProduct[],
  filterKey: SelectionFilterKey,
  selectedFilters: SelectedFilterMap,
  productTypeId: string
) {
  return getProductFilterOptions({
    productTypeId,

--- components\products\selection\ProductSelectionClient.tsx line 374 ---
  productTypeId: string
) {
  return getProductFilterOptions({
    productTypeId,
    products,
    filterKey,
    selectedFilters,

--- components\products\selection\ProductSelectionClient.tsx line 381 ---
  });
}
function getDefaultSelectedFilters(
  _categoryId: string,
  _productTypeId: string
): SelectedFilterMap {
  /*

--- components\products\selection\ProductSelectionClient.tsx line 382 ---
}
function getDefaultSelectedFilters(
  _categoryId: string,
  _productTypeId: string
): SelectedFilterMap {
  /*
   * 说明：

--- components\products\selection\ProductSelectionClient.tsx line 394 ---
}

function getInitialSelectedFilters(
  categoryId: string,
  productTypeId: string,
  initialFilters?: ProductSelectionClientProps["initialFilters"]
): SelectedFilterMap {

--- components\products\selection\ProductSelectionClient.tsx line 395 ---

function getInitialSelectedFilters(
  categoryId: string,
  productTypeId: string,
  initialFilters?: ProductSelectionClientProps["initialFilters"]
): SelectedFilterMap {
  const selected = getDefaultSelectedFilters(categoryId, productTypeId);

--- components\products\selection\ProductSelectionClient.tsx line 398 ---
  productTypeId: string,
  initialFilters?: ProductSelectionClientProps["initialFilters"]
): SelectedFilterMap {
  const selected = getDefaultSelectedFilters(categoryId, productTypeId);

  if (!initialFilters) {
    return selected;

--- components\products\selection\ProductSelectionClient.tsx line 435 ---
  return 12;
}

function getDefaultMobileOpenFilterGroups(productTypeId: string) {
  const openGroups: Record<string, boolean> = {
    productType: false,
  };

--- components\products\selection\ProductSelectionClient.tsx line 440 ---
    productType: false,
  };

  getVisibleFilterLabels(productTypeId).forEach((filter) => {
    openGroups[filter.filterKey] = false;
  });


--- components\products\selection\ProductSelectionClient.tsx line 646 ---
  /*
    PROBE_DETAIL_HREF_PATCH_FORCE_NEEDLES

    产品中心针系列 categoryId 使用 needles。
    详情页路由使用 /products/probes/[slug]。
    避免生成 /products/probes/undefined。
  */

--- components\products\selection\ProductSelectionClient.tsx line 652 ---
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.categoryId === "needles" ||
    (product as any)?.category === "needles" ||
    (product as any)?.categoryLabel === "针系列"
  ) {

--- components\products\selection\ProductSelectionClient.tsx line 694 ---
  /*
    PROBE_DETAIL_HREF_PATCH_20260709

    针系列在产品中心中使用中文 productTypeId 显示筛选项，
    详情路由不能依赖 productTypeId。
    这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
  */

--- components\products\selection\ProductSelectionClient.tsx line 695 ---
    PROBE_DETAIL_HREF_PATCH_20260709

    针系列在产品中心中使用中文 productTypeId 显示筛选项，
    详情路由不能依赖 productTypeId。
    这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
  */
  if (

--- components\products\selection\ProductSelectionClient.tsx line 701 ---
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.category === "probes" ||
    (product as any)?.categoryId === "pumps" ||
    (product as any)?.categoryLabel === "针系列"
  ) {
    const rawHref = String(

--- components\products\selection\ProductSelectionClient.tsx line 742 ---
  /*
    PROBE_DETAIL_HREF_PATCH_20260708

    针系列产品类型使用中文显示，详情路径不能依赖 productTypeId。
    这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
    避免生成 /products/probes/undefined。
  */

--- components\products\selection\ProductSelectionClient.tsx line 749 ---
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.category === "probes" ||
    (product as any)?.categoryId === "pumps" ||
    (product as any)?.categoryLabel === "针系列"
  ) {
    const rawHref = String(

--- components\products\selection\ProductSelectionClient.tsx line 790 ---
  /*
    VALVE_DETAIL_HREF_PATCH_20260707

    阀系列产品类型为了中文显示，productTypeId 可能是“旋转阀 / 高压阀 / 电磁阀”。
    因此详情链接不能只依赖 productTypeId。
    这里优先读取 detailHref / href / detailSlug / routeSlug / slug / seriesSlug。
    避免生成 /products/valves/undefined/。

--- components\products\selection\ProductSelectionClient.tsx line 791 ---
    VALVE_DETAIL_HREF_PATCH_20260707

    阀系列产品类型为了中文显示，productTypeId 可能是“旋转阀 / 高压阀 / 电磁阀”。
    因此详情链接不能只依赖 productTypeId。
    这里优先读取 detailHref / href / detailSlug / routeSlug / slug / seriesSlug。
    避免生成 /products/valves/undefined/。
  */

--- components\products\selection\ProductSelectionClient.tsx line 795 ---
    这里优先读取 detailHref / href / detailSlug / routeSlug / slug / seriesSlug。
    避免生成 /products/valves/undefined/。
  */
  if ((product as any)?.categoryId === "valves") {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).href ||

--- components\products\selection\ProductSelectionClient.tsx line 833 ---

  
  const isValveProduct =
    product.categoryId === "valves" &&
    ["rotary-valves", "high-pressure-valves", "solenoid-valves"].includes(
      product.productTypeId,
    );

--- components\products\selection\ProductSelectionClient.tsx line 835 ---
  const isValveProduct =
    product.categoryId === "valves" &&
    ["rotary-valves", "high-pressure-valves", "solenoid-valves"].includes(
      product.productTypeId,
    );

  if (isValveProduct) {

--- components\products\selection\ProductSelectionClient.tsx line 842 ---
    return (
      product.detailHref ||
      product.href ||
      `/products/valves/${product.productTypeId}`
    );
  }


--- components\products\selection\ProductSelectionClient.tsx line 847 ---
  }

  const isValvelessPump =
    product.categoryId === "pumps" &&
    ["valveless-pump", "valveless-pumps"].includes(product.productTypeId);

  const isSyringePump =

--- components\products\selection\ProductSelectionClient.tsx line 848 ---

  const isValvelessPump =
    product.categoryId === "pumps" &&
    ["valveless-pump", "valveless-pumps"].includes(product.productTypeId);

  const isSyringePump =
    product.categoryId === "pumps" &&

--- components\products\selection\ProductSelectionClient.tsx line 851 ---
    ["valveless-pump", "valveless-pumps"].includes(product.productTypeId);

  const isSyringePump =
    product.categoryId === "pumps" &&
    ["syringe-pump", "syringe-pumps"].includes(product.productTypeId);

  if (isValvelessPump) {

--- components\products\selection\ProductSelectionClient.tsx line 852 ---

  const isSyringePump =
    product.categoryId === "pumps" &&
    ["syringe-pump", "syringe-pumps"].includes(product.productTypeId);

  if (isValvelessPump) {
    const rawSlug =

--- components\products\selection\ProductSelectionClient.tsx line 888 ---
      : "/products/pumps/syringe-pumps";
  }
const isDiaphragmPump =
    product.categoryId === "pumps" &&
    ["diaphragm-pump", "diaphragm-pumps"].includes(product.productTypeId);

  if (isDiaphragmPump) {

--- components\products\selection\ProductSelectionClient.tsx line 889 ---
  }
const isDiaphragmPump =
    product.categoryId === "pumps" &&
    ["diaphragm-pump", "diaphragm-pumps"].includes(product.productTypeId);

  if (isDiaphragmPump) {
    const rawSlug =

--- components\products\selection\ProductSelectionClient.tsx line 907 ---
      ? `/products/pumps/diaphragm-pumps/${slug}`
      : "/products/pumps/diaphragm-pumps";
  }  const isPipettingPump =
    product.categoryId === "pumps" &&
    ["pipette-pump", "pipetting-pump", "pipetting-pumps"].includes(product.productTypeId);

  if (isPipettingPump) {

--- components\products\selection\ProductSelectionClient.tsx line 908 ---
      : "/products/pumps/diaphragm-pumps";
  }  const isPipettingPump =
    product.categoryId === "pumps" &&
    ["pipette-pump", "pipetting-pump", "pipetting-pumps"].includes(product.productTypeId);

  if (isPipettingPump) {
    const rawSlug =

--- components\products\selection\ProductSelectionClient.tsx line 931 ---


  const isPlungerPump =
    product.categoryId === "pumps" &&
    ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);

  if (isPlungerPump) {

--- components\products\selection\ProductSelectionClient.tsx line 932 ---

  const isPlungerPump =
    product.categoryId === "pumps" &&
    ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);

  if (isPlungerPump) {
    const slug = getPlungerPumpModelSlugForDetailHref(product);

--- components\products\selection\ProductSelectionClient.tsx line 942 ---
      : "/products/pumps/plunger-pumps";
  }

  return `/products/${product.categoryId}/${product.detailSlug}`;
}

export default function ProductSelectionClient({

--- components\products\selection\ProductSelectionClient.tsx line 947 ---

export default function ProductSelectionClient({
  locale = "zh",
  initialCategoryId,
  initialProductTypeId,
  initialFilters,
}: ProductSelectionClientProps) {

--- components\products\selection\ProductSelectionClient.tsx line 948 ---
export default function ProductSelectionClient({
  locale = "zh",
  initialCategoryId,
  initialProductTypeId,
  initialFilters,
}: ProductSelectionClientProps) {
  const router = useRouter();

--- components\products\selection\ProductSelectionClient.tsx line 953 ---
}: ProductSelectionClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCategoryId = searchParams.get("category");
  const requestedProductTypeId = searchParams.get("productType");

  const pageText =

--- components\products\selection\ProductSelectionClient.tsx line 954 ---
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCategoryId = searchParams.get("category");
  const requestedProductTypeId = searchParams.get("productType");

  const pageText =
    PRODUCT_SELECTION_PAGE_TEXT[locale] || PRODUCT_SELECTION_PAGE_TEXT.zh;

--- components\products\selection\ProductSelectionClient.tsx line 961 ---

  const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);

  const [activeCategoryId, setActiveCategoryId] = useState(() => {
    return initialCategoryId || categoryItems[0]?.id || "pumps";
  });


--- components\products\selection\ProductSelectionClient.tsx line 962 ---
  const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);

  const [activeCategoryId, setActiveCategoryId] = useState(() => {
    return initialCategoryId || categoryItems[0]?.id || "pumps";
  });

  const [activeProductTypeId, setActiveProductTypeId] = useState(() => {

--- components\products\selection\ProductSelectionClient.tsx line 965 ---
    return initialCategoryId || categoryItems[0]?.id || "pumps";
  });

  const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";


--- components\products\selection\ProductSelectionClient.tsx line 966 ---
  });

  const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";

    return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

--- components\products\selection\ProductSelectionClient.tsx line 967 ---

  const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";

    return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
  });

--- components\products\selection\ProductSelectionClient.tsx line 969 ---
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";

    return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
  });

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(

--- components\products\selection\ProductSelectionClient.tsx line 974 ---

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
    () => {
      const initialActiveCategoryId =
        initialCategoryId || categoryItems[0]?.id || "pumps";
      const initialActiveProductTypeId =
        initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

--- components\products\selection\ProductSelectionClient.tsx line 975 ---
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
    () => {
      const initialActiveCategoryId =
        initialCategoryId || categoryItems[0]?.id || "pumps";
      const initialActiveProductTypeId =
        initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);


--- components\products\selection\ProductSelectionClient.tsx line 976 ---
    () => {
      const initialActiveCategoryId =
        initialCategoryId || categoryItems[0]?.id || "pumps";
      const initialActiveProductTypeId =
        initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

      return getInitialSelectedFilters(

--- components\products\selection\ProductSelectionClient.tsx line 977 ---
      const initialActiveCategoryId =
        initialCategoryId || categoryItems[0]?.id || "pumps";
      const initialActiveProductTypeId =
        initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

      return getInitialSelectedFilters(
        initialActiveCategoryId,

--- components\products\selection\ProductSelectionClient.tsx line 980 ---
        initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

      return getInitialSelectedFilters(
        initialActiveCategoryId,
        initialActiveProductTypeId,
        initialFilters
      );

--- components\products\selection\ProductSelectionClient.tsx line 981 ---

      return getInitialSelectedFilters(
        initialActiveCategoryId,
        initialActiveProductTypeId,
        initialFilters
      );
    }

--- components\products\selection\ProductSelectionClient.tsx line 1005 ---
  const [mobileOpenFilterGroups, setMobileOpenFilterGroups] = useState<
    Record<string, boolean>
  >(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";
    const initialActiveProductTypeId =
      initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

--- components\products\selection\ProductSelectionClient.tsx line 1006 ---
    Record<string, boolean>
  >(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";
    const initialActiveProductTypeId =
      initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);


--- components\products\selection\ProductSelectionClient.tsx line 1007 ---
  >(() => {
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";
    const initialActiveProductTypeId =
      initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

    return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);

--- components\products\selection\ProductSelectionClient.tsx line 1008 ---
    const initialActiveCategoryId =
      initialCategoryId || categoryItems[0]?.id || "pumps";
    const initialActiveProductTypeId =
      initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

    return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);
  });

--- components\products\selection\ProductSelectionClient.tsx line 1010 ---
    const initialActiveProductTypeId =
      initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);

    return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);
  });
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [productsPageSize, setProductsPageSize] = useState(12);

--- components\products\selection\ProductSelectionClient.tsx line 1017 ---

  const activeCategory = useMemo(() => {
    return (
      categoryItems.find((category) => category.id === activeCategoryId) ||
      categoryItems[0] ||
      DEFAULT_CATEGORIES[0]
    );

--- components\products\selection\ProductSelectionClient.tsx line 1021 ---
      categoryItems[0] ||
      DEFAULT_CATEGORIES[0]
    );
  }, [activeCategoryId, categoryItems]);

  const categoryProducts = useMemo(() => {
    return getProductsByCategory(activeCategoryId);

--- components\products\selection\ProductSelectionClient.tsx line 1024 ---
  }, [activeCategoryId, categoryItems]);

  const categoryProducts = useMemo(() => {
    return getProductsByCategory(activeCategoryId);
  }, [activeCategoryId]);

  const productTypeOptions = useMemo(() => {

--- components\products\selection\ProductSelectionClient.tsx line 1025 ---

  const categoryProducts = useMemo(() => {
    return getProductsByCategory(activeCategoryId);
  }, [activeCategoryId]);

  const productTypeOptions = useMemo(() => {
    const optionMap = new Map<string, { value: string; label: string }>();

--- components\products\selection\ProductSelectionClient.tsx line 1036 ---
     * 2. 这部分用于已经有产品卡片的数据，例如 EA 柱塞泵
     */
    categoryProducts.forEach((product) => {
      if (!product.productTypeId) return;

      if (!optionMap.has(product.productTypeId)) {
        optionMap.set(product.productTypeId, {

--- components\products\selection\ProductSelectionClient.tsx line 1038 ---
    categoryProducts.forEach((product) => {
      if (!product.productTypeId) return;

      if (!optionMap.has(product.productTypeId)) {
        optionMap.set(product.productTypeId, {
          value: product.productTypeId,
          label: getTaxonomyLabel(locale, product.productTypeId),

--- components\products\selection\ProductSelectionClient.tsx line 1039 ---
      if (!product.productTypeId) return;

      if (!optionMap.has(product.productTypeId)) {
        optionMap.set(product.productTypeId, {
          value: product.productTypeId,
          label: getTaxonomyLabel(locale, product.productTypeId),
        });

--- components\products\selection\ProductSelectionClient.tsx line 1040 ---

      if (!optionMap.has(product.productTypeId)) {
        optionMap.set(product.productTypeId, {
          value: product.productTypeId,
          label: getTaxonomyLabel(locale, product.productTypeId),
        });
      }

--- components\products\selection\ProductSelectionClient.tsx line 1041 ---
      if (!optionMap.has(product.productTypeId)) {
        optionMap.set(product.productTypeId, {
          value: product.productTypeId,
          label: getTaxonomyLabel(locale, product.productTypeId),
        });
      }
    });

--- components\products\selection\ProductSelectionClient.tsx line 1052 ---
     * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
     * 3. 左侧“产品类型”里也会先显示对应入口
     */
    getProductTypeFilterOptionsByCategory(activeCategoryId).forEach((option) => {
      if (!optionMap.has(option.value)) {
        optionMap.set(option.value, {
          value: option.value,

--- components\products\selection\ProductSelectionClient.tsx line 1062 ---
    });

    return Array.from(optionMap.values());
  }, [activeCategoryId, categoryProducts, locale]);

  const currentTypeProducts = useMemo(() => {
    if (!activeProductTypeId) {

--- components\products\selection\ProductSelectionClient.tsx line 1065 ---
  }, [activeCategoryId, categoryProducts, locale]);

  const currentTypeProducts = useMemo(() => {
    if (!activeProductTypeId) {
      return categoryProducts;
    }


--- components\products\selection\ProductSelectionClient.tsx line 1070 ---
    }

    return categoryProducts.filter((product) => {
      return product.productTypeId === activeProductTypeId;
    });
  }, [activeProductTypeId, categoryProducts]);


--- components\products\selection\ProductSelectionClient.tsx line 1072 ---
    return categoryProducts.filter((product) => {
      return product.productTypeId === activeProductTypeId;
    });
  }, [activeProductTypeId, categoryProducts]);

  const activeFilterLabels = useMemo(() => {
    return getVisibleFilterLabels(activeProductTypeId);

--- components\products\selection\ProductSelectionClient.tsx line 1075 ---
  }, [activeProductTypeId, categoryProducts]);

  const activeFilterLabels = useMemo(() => {
    return getVisibleFilterLabels(activeProductTypeId);
  }, [activeProductTypeId]);

  const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {

--- components\products\selection\ProductSelectionClient.tsx line 1076 ---

  const activeFilterLabels = useMemo(() => {
    return getVisibleFilterLabels(activeProductTypeId);
  }, [activeProductTypeId]);

  const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
    const groups: ProductSelectionFilterGroup[] = [];

--- components\products\selection\ProductSelectionClient.tsx line 1095 ---
        currentTypeProducts,
        label.filterKey,
        selectedFilters,
        activeProductTypeId
      );

      if (options.length === 0) return;

--- components\products\selection\ProductSelectionClient.tsx line 1109 ---
    });

    return groups;
  }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);

  const matchedProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

--- components\products\selection\ProductSelectionClient.tsx line 1115 ---
    const keyword = searchKeyword.trim().toLowerCase();

    return categoryProducts.filter((product) => {
      if (activeProductTypeId && product.productTypeId !== activeProductTypeId) {
        return false;
      }


--- components\products\selection\ProductSelectionClient.tsx line 1141 ---

      const searchText = [
        product.productId,
        product.categoryId,
        product.productTypeId,
        product.seriesId,
        product.detailSlug,

--- components\products\selection\ProductSelectionClient.tsx line 1142 ---
      const searchText = [
        product.productId,
        product.categoryId,
        product.productTypeId,
        product.seriesId,
        product.detailSlug,
        product.cardTitle.zh,

--- components\products\selection\ProductSelectionClient.tsx line 1159 ---

      return searchText.includes(keyword);
    });
  }, [activeProductTypeId, categoryProducts, searchKeyword, selectedFilters]);

  /*
   * 当前产品种类介绍数据

--- components\products\selection\ProductSelectionClient.tsx line 1169 ---
   * 3. 找不到时不显示横幅
   */
  const activeProductTypeIntro = getProductTypeIntroByIds(
    activeCategoryId,
    activeProductTypeId
  );
  const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {

--- components\products\selection\ProductSelectionClient.tsx line 1170 ---
   */
  const activeProductTypeIntro = getProductTypeIntroByIds(
    activeCategoryId,
    activeProductTypeId
  );
  const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
    const tags: ProductSelectionSelectedTag[] = [];

--- components\products\selection\ProductSelectionClient.tsx line 1175 ---
  const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
    const tags: ProductSelectionSelectedTag[] = [];

    if (activeProductTypeId) {
      tags.push({
        key: "productType",
        value: activeProductTypeId,

--- components\products\selection\ProductSelectionClient.tsx line 1178 ---
    if (activeProductTypeId) {
      tags.push({
        key: "productType",
        value: activeProductTypeId,
        label: getTaxonomyLabel(locale, activeProductTypeId),
      });
    }

--- components\products\selection\ProductSelectionClient.tsx line 1179 ---
      tags.push({
        key: "productType",
        value: activeProductTypeId,
        label: getTaxonomyLabel(locale, activeProductTypeId),
      });
    }


--- components\products\selection\ProductSelectionClient.tsx line 1198 ---
    });

    return tags;
  }, [activeProductTypeId, locale, selectedFilters]);

  const totalProductPages = Math.max(
    1,

--- components\products\selection\ProductSelectionClient.tsx line 1230 ---
  }, []);

  useEffect(() => {
    const fallbackCategoryId = categoryItems[0]?.id || "pumps";
    const preferredCategoryId = requestedCategoryId || initialCategoryId;

    const nextCategoryId =

--- components\products\selection\ProductSelectionClient.tsx line 1231 ---

  useEffect(() => {
    const fallbackCategoryId = categoryItems[0]?.id || "pumps";
    const preferredCategoryId = requestedCategoryId || initialCategoryId;

    const nextCategoryId =
      preferredCategoryId &&

--- components\products\selection\ProductSelectionClient.tsx line 1233 ---
    const fallbackCategoryId = categoryItems[0]?.id || "pumps";
    const preferredCategoryId = requestedCategoryId || initialCategoryId;

    const nextCategoryId =
      preferredCategoryId &&
      categoryItems.some((category) => category.id === preferredCategoryId)
        ? preferredCategoryId

--- components\products\selection\ProductSelectionClient.tsx line 1234 ---
    const preferredCategoryId = requestedCategoryId || initialCategoryId;

    const nextCategoryId =
      preferredCategoryId &&
      categoryItems.some((category) => category.id === preferredCategoryId)
        ? preferredCategoryId
        : fallbackCategoryId;

--- components\products\selection\ProductSelectionClient.tsx line 1235 ---

    const nextCategoryId =
      preferredCategoryId &&
      categoryItems.some((category) => category.id === preferredCategoryId)
        ? preferredCategoryId
        : fallbackCategoryId;


--- components\products\selection\ProductSelectionClient.tsx line 1236 ---
    const nextCategoryId =
      preferredCategoryId &&
      categoryItems.some((category) => category.id === preferredCategoryId)
        ? preferredCategoryId
        : fallbackCategoryId;

    const categoryProductsForUrl = getProductsByCategory(nextCategoryId);

--- components\products\selection\ProductSelectionClient.tsx line 1237 ---
      preferredCategoryId &&
      categoryItems.some((category) => category.id === preferredCategoryId)
        ? preferredCategoryId
        : fallbackCategoryId;

    const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
    const preferredProductTypeId =

--- components\products\selection\ProductSelectionClient.tsx line 1239 ---
        ? preferredCategoryId
        : fallbackCategoryId;

    const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
    const preferredProductTypeId =
      requestedProductTypeId || initialProductTypeId;


--- components\products\selection\ProductSelectionClient.tsx line 1240 ---
        : fallbackCategoryId;

    const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
    const preferredProductTypeId =
      requestedProductTypeId || initialProductTypeId;

    const productTypeExistsInProducts = Boolean(

--- components\products\selection\ProductSelectionClient.tsx line 1241 ---

    const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
    const preferredProductTypeId =
      requestedProductTypeId || initialProductTypeId;

    const productTypeExistsInProducts = Boolean(
      preferredProductTypeId &&

--- components\products\selection\ProductSelectionClient.tsx line 1244 ---
      requestedProductTypeId || initialProductTypeId;

    const productTypeExistsInProducts = Boolean(
      preferredProductTypeId &&
        categoryProductsForUrl.some(
          (product) => product.productTypeId === preferredProductTypeId
        )

--- components\products\selection\ProductSelectionClient.tsx line 1246 ---
    const productTypeExistsInProducts = Boolean(
      preferredProductTypeId &&
        categoryProductsForUrl.some(
          (product) => product.productTypeId === preferredProductTypeId
        )
    );


--- components\products\selection\ProductSelectionClient.tsx line 1251 ---
    );

    const productTypeExistsInRouteMap = Boolean(
      preferredProductTypeId &&
        hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
    );


--- components\products\selection\ProductSelectionClient.tsx line 1252 ---

    const productTypeExistsInRouteMap = Boolean(
      preferredProductTypeId &&
        hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
    );

    const nextProductTypeId =

--- components\products\selection\ProductSelectionClient.tsx line 1255 ---
        hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
    );

    const nextProductTypeId =
      preferredProductTypeId &&
      (productTypeExistsInProducts || productTypeExistsInRouteMap)
        ? preferredProductTypeId

--- components\products\selection\ProductSelectionClient.tsx line 1256 ---
    );

    const nextProductTypeId =
      preferredProductTypeId &&
      (productTypeExistsInProducts || productTypeExistsInRouteMap)
        ? preferredProductTypeId
        : getFirstProductTypeId(nextCategoryId);

--- components\products\selection\ProductSelectionClient.tsx line 1258 ---
    const nextProductTypeId =
      preferredProductTypeId &&
      (productTypeExistsInProducts || productTypeExistsInRouteMap)
        ? preferredProductTypeId
        : getFirstProductTypeId(nextCategoryId);

    const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);

--- components\products\selection\ProductSelectionClient.tsx line 1259 ---
      preferredProductTypeId &&
      (productTypeExistsInProducts || productTypeExistsInRouteMap)
        ? preferredProductTypeId
        : getFirstProductTypeId(nextCategoryId);

    const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);


--- components\products\selection\ProductSelectionClient.tsx line 1261 ---
        ? preferredProductTypeId
        : getFirstProductTypeId(nextCategoryId);

    const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);

    setActiveCategoryId(nextCategoryId);
    setActiveProductTypeId(nextProductTypeId);

--- components\products\selection\ProductSelectionClient.tsx line 1263 ---

    const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);

    setActiveCategoryId(nextCategoryId);
    setActiveProductTypeId(nextProductTypeId);
    setSelectedFilters(
      hasQuerySelection

--- components\products\selection\ProductSelectionClient.tsx line 1264 ---
    const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);

    setActiveCategoryId(nextCategoryId);
    setActiveProductTypeId(nextProductTypeId);
    setSelectedFilters(
      hasQuerySelection
        ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)

--- components\products\selection\ProductSelectionClient.tsx line 1267 ---
    setActiveProductTypeId(nextProductTypeId);
    setSelectedFilters(
      hasQuerySelection
        ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
        : getInitialSelectedFilters(
            nextCategoryId,
            nextProductTypeId,

--- components\products\selection\ProductSelectionClient.tsx line 1269 ---
      hasQuerySelection
        ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
        : getInitialSelectedFilters(
            nextCategoryId,
            nextProductTypeId,
            initialFilters
          )

--- components\products\selection\ProductSelectionClient.tsx line 1270 ---
        ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
        : getInitialSelectedFilters(
            nextCategoryId,
            nextProductTypeId,
            initialFilters
          )
    );

--- components\products\selection\ProductSelectionClient.tsx line 1277 ---
    setSearchKeyword("");
    setMobileCategoryOpen(false);
    setMobileOpenFilterGroups(
      getDefaultMobileOpenFilterGroups(nextProductTypeId)
    );
  }, [
    categoryItems,

--- components\products\selection\ProductSelectionClient.tsx line 1281 ---
    );
  }, [
    categoryItems,
    requestedCategoryId,
    requestedProductTypeId,
    initialCategoryId,
    initialProductTypeId,

--- components\products\selection\ProductSelectionClient.tsx line 1282 ---
  }, [
    categoryItems,
    requestedCategoryId,
    requestedProductTypeId,
    initialCategoryId,
    initialProductTypeId,
    initialFilters,

--- components\products\selection\ProductSelectionClient.tsx line 1283 ---
    categoryItems,
    requestedCategoryId,
    requestedProductTypeId,
    initialCategoryId,
    initialProductTypeId,
    initialFilters,
  ]);

--- components\products\selection\ProductSelectionClient.tsx line 1284 ---
    requestedCategoryId,
    requestedProductTypeId,
    initialCategoryId,
    initialProductTypeId,
    initialFilters,
  ]);


--- components\products\selection\ProductSelectionClient.tsx line 1291 ---
  useEffect(() => {
    setCurrentProductPage(1);
  }, [
    activeCategoryId,
    activeProductTypeId,
    selectedFilters,
    searchKeyword,

--- components\products\selection\ProductSelectionClient.tsx line 1292 ---
    setCurrentProductPage(1);
  }, [
    activeCategoryId,
    activeProductTypeId,
    selectedFilters,
    searchKeyword,
    productsPageSize,

--- components\products\selection\ProductSelectionClient.tsx line 1358 ---
    });
  }, [filterGroups]);

  function handleCategoryChange(categoryId: string) {
    const firstProductTypeId = getFirstProductTypeId(categoryId);

    setActiveCategoryId(categoryId);

--- components\products\selection\ProductSelectionClient.tsx line 1359 ---
  }, [filterGroups]);

  function handleCategoryChange(categoryId: string) {
    const firstProductTypeId = getFirstProductTypeId(categoryId);

    setActiveCategoryId(categoryId);
    setActiveProductTypeId(firstProductTypeId);

--- components\products\selection\ProductSelectionClient.tsx line 1361 ---
  function handleCategoryChange(categoryId: string) {
    const firstProductTypeId = getFirstProductTypeId(categoryId);

    setActiveCategoryId(categoryId);
    setActiveProductTypeId(firstProductTypeId);
    setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
    setSearchKeyword("");

--- components\products\selection\ProductSelectionClient.tsx line 1362 ---
    const firstProductTypeId = getFirstProductTypeId(categoryId);

    setActiveCategoryId(categoryId);
    setActiveProductTypeId(firstProductTypeId);
    setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
    setSearchKeyword("");
    setMobileCategoryOpen(false);

--- components\products\selection\ProductSelectionClient.tsx line 1363 ---

    setActiveCategoryId(categoryId);
    setActiveProductTypeId(firstProductTypeId);
    setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
    setSearchKeyword("");
    setMobileCategoryOpen(false);
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));

--- components\products\selection\ProductSelectionClient.tsx line 1366 ---
    setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
    setSearchKeyword("");
    setMobileCategoryOpen(false);
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
  }

  function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {

--- components\products\selection\ProductSelectionClient.tsx line 1376 ---
    }));
  }

  function handleProductTypeChange(productTypeId: string) {
    /*
     * 说明：
     * 1. 点击产品类型时，优先跳转正式 URL

--- components\products\selection\ProductSelectionClient.tsx line 1384 ---
     * 3. 没配置正式 URL 的类型，才走原来的前端筛选逻辑
     */
    const productTypeHref = getProductTypeHrefByIds(
      activeCategoryId,
      productTypeId
    );


--- components\products\selection\ProductSelectionClient.tsx line 1385 ---
     */
    const productTypeHref = getProductTypeHrefByIds(
      activeCategoryId,
      productTypeId
    );

    if (productTypeHref) {

--- components\products\selection\ProductSelectionClient.tsx line 1393 ---
      return;
    }

    setActiveProductTypeId(productTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
  }

--- components\products\selection\ProductSelectionClient.tsx line 1394 ---
    }

    setActiveProductTypeId(productTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
  }


--- components\products\selection\ProductSelectionClient.tsx line 1395 ---

    setActiveProductTypeId(productTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
  }

  function handleFilterChange(

--- components\products\selection\ProductSelectionClient.tsx line 1430 ---
     * 3. 命中后不 router.push，而是原地切换状态并同步地址栏
     */
    const seriesHref = getSeriesHrefByFilterValue(
      activeCategoryId,
      activeProductTypeId,
      group.key,
      value

--- components\products\selection\ProductSelectionClient.tsx line 1431 ---
     */
    const seriesHref = getSeriesHrefByFilterValue(
      activeCategoryId,
      activeProductTypeId,
      group.key,
      value
    );

--- components\products\selection\ProductSelectionClient.tsx line 1439 ---
    if (seriesHref) {
      const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );


--- components\products\selection\ProductSelectionClient.tsx line 1440 ---
      const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );

      setSelectedFilters((current) => {

--- components\products\selection\ProductSelectionClient.tsx line 1528 ---
     * 4. 这里必须先判断 FILTER_KEYS，避免 TypeScript 认为 string 不能索引 selectedFilters
     */
    if (group.key === "productType") {
      return activeProductTypeId === value;
    }

    if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {

--- components\products\selection\ProductSelectionClient.tsx line 1552 ---
     */

    if (key === "productType") {
      setActiveProductTypeId("");
      setSelectedFilters({});
      return;
    }

--- components\products\selection\ProductSelectionClient.tsx line 1566 ---
     *    /products/pumps/plunger-pumps/
     */
    const seriesHref = getSeriesHrefByFilterValue(
      activeCategoryId,
      activeProductTypeId,
      key,
      value

--- components\products\selection\ProductSelectionClient.tsx line 1567 ---
     */
    const seriesHref = getSeriesHrefByFilterValue(
      activeCategoryId,
      activeProductTypeId,
      key,
      value
    );

--- components\products\selection\ProductSelectionClient.tsx line 1574 ---

    if (seriesHref) {
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );


--- components\products\selection\ProductSelectionClient.tsx line 1575 ---
    if (seriesHref) {
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );

      if (productTypeHref) {

--- components\products\selection\ProductSelectionClient.tsx line 1614 ---
    });
  }
  function resetCurrentFilters() {
    const firstProductTypeId = getFirstProductTypeId(activeCategoryId);

    setActiveProductTypeId(firstProductTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));

--- components\products\selection\ProductSelectionClient.tsx line 1616 ---
  function resetCurrentFilters() {
    const firstProductTypeId = getFirstProductTypeId(activeCategoryId);

    setActiveProductTypeId(firstProductTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
    setSearchKeyword("");
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));

--- components\products\selection\ProductSelectionClient.tsx line 1617 ---
    const firstProductTypeId = getFirstProductTypeId(activeCategoryId);

    setActiveProductTypeId(firstProductTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
    setSearchKeyword("");
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
  }

--- components\products\selection\ProductSelectionClient.tsx line 1619 ---
    setActiveProductTypeId(firstProductTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
    setSearchKeyword("");
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
  }
  function createProductCartItem(
    product: ProductSelectionProduct

--- components\products\selection\ProductSelectionClient.tsx line 1629 ---
    return {
      sourceType: "pump-selection",
      sourceLabel: "产品中心",
      productName: getTaxonomyLabel(locale, product.productTypeId),
      productCode: product.productId,
      foreachModel: title,
      competitorModels: [],

--- components\products\selection\ProductSelectionClient.tsx line 1678 ---

            <ProductCategoryTabs
              categories={categoryItems}
              activeCategoryId={activeCategoryId}
              activeCategoryLabel={activeCategory.label}
              mobileCategoryOpen={mobileCategoryOpen}
              mobileCategoryPrefix={pageText.mobileCategoryPrefix}

--- components\products\selection\ProductSelectionClient.tsx line 1691 ---
            {activeProductTypeIntro ? (
              <section
                className="product-type-intro-module"
                data-product-type-id={activeProductTypeId || ""}
                aria-label={`${activeProductTypeIntro.title}产品种类说明`}
              >
                <div className="product-type-intro-image">

## 5. ProductCardGrid 接收的数据


--- components\products\selection\ProductSelectionClient.tsx line 48 ---

import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

import ProductCardGrid from "./ProductCardGrid";
import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductEmptyState from "./ProductEmptyState";
import ProductFilterPanel from "./ProductFilterPanel";

--- components\products\selection\ProductSelectionClient.tsx line 1750 ---

              {matchedProducts.length > 0 ? (
                <>
                  <ProductCardGrid
                    products={pagedProducts}
                    selectedList={selectedList}
                    detailButtonText={pageText.detailButton}

--- components\products\selection\ProductSelectionClient.tsx line 1751 ---
              {matchedProducts.length > 0 ? (
                <>
                  <ProductCardGrid
                    products={pagedProducts}
                    selectedList={selectedList}
                    detailButtonText={pageText.detailButton}
                    addToListText={pageText.addToList}

--- components\products\selection\ProductSelectionClient.tsx line 1759 ---
                    getTitle={(product) =>
                      getText(locale, product.cardTitle, product.productId)
                    }
                    getSubtitle={(product) =>
                      getText(locale, product.cardSubtitle, "")
                    }
                    getDetailHref={makeDetailHref}

--- components\products\selection\ProductSelectionClient.tsx line 1762 ---
                    getSubtitle={(product) =>
                      getText(locale, product.cardSubtitle, "")
                    }
                    getDetailHref={makeDetailHref}
                    onToggleList={toggleProductInList}
                  />


## 6. 管路数据文件是否存在

存在：data\products\selection\tubing-selection.generated.ts
存在：data\products\selection\product-route-map.ts
存在：data\products\selection\product-type-intro.ts
存在：data\products\selection\filter-rules\product-filter-rules.index.ts

## 7. 管路数据文件前 120 行

export type TubingSelectionCard = {
  slug: string;
  title: string;
  model: string;
  materialFullName: string;
  innerDiameterRange: string;
  workingTemperature: string;
  href: string;
  detailHref: string;
  productDetailHref: string;
  url: string;
  path: string;
  image: string;
  imagePath: string;
  cardSubtitle: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
};

export const tubingSelectionCards: TubingSelectionCard[] = [
  {
    "slug": "pvc-tubing",
    "href": "/products/tubing/pvc-tubing",
    "detailHref": "/products/tubing/pvc-tubing",
    "productDetailHref": "/products/tubing/pvc-tubing",
    "url": "/products/tubing/pvc-tubing",
    "path": "/products/tubing/pvc-tubing",
    "title": "PVC 绠?,
    "model": "PVC 绠?,
    "materialFullName": "鑱氭隘涔欑儻锛圥VC锛?,
    "innerDiameterRange": "1.6mm~19.1mm",
    "workingTemperature": "-42鈩儈75鈩?,
    "href": "/products/tubing/pvc-tubing",
    "detailHref": "/products/tubing/pvc-tubing",
    "image": "/images/products/tubing/pvc-tubing/pvc-tubing-main.webp",
    "productDetailHref": "/products/tubing/pvc-tubing",
    "url": "/products/tubing/pvc-tubing",
    "path": "/products/tubing/pvc-tubing",
    "imagePath": "/images/products/tubing/pvc-tubing/pvc-tubing-main.webp",
    "cardSubtitle": {
      "zh": "鑱氭隘涔欑儻锛圥VC锛塡\n鍐呭緞鑼冨洿锛?.6mm~19.1mm\\n宸ヤ綔娓╁害锛?42鈩儈75鈩?,
      "en": "鑱氭隘涔欑儻锛圥VC锛塡\nID range: 1.6mm~19.1mm\\nWorking temperature: -42鈩儈75鈩?
    },
    "description": {
      "zh": "鑱氭隘涔欑儻锛圥VC锛夛紝鍐呭緞鑼冨洿 1.6mm~19.1mm锛屽伐浣滄俯搴?-42鈩儈75鈩冦€?,
      "en": "鑱氭隘涔欑儻锛圥VC锛? ID range 1.6mm~19.1mm, working temperature -42鈩儈75鈩?"
    }
  },
  {
    "slug": "tpu-tubing",
    "href": "/products/tubing/tpu-tubing",
    "detailHref": "/products/tubing/tpu-tubing",
    "productDetailHref": "/products/tubing/tpu-tubing",
    "url": "/products/tubing/tpu-tubing",
    "path": "/products/tubing/tpu-tubing",
    "title": "TPU 绠?,
    "model": "TPU 绠?,
    "materialFullName": "鐑鎬ц仛姘ㄩ叝锛圱PU锛?,
    "innerDiameterRange": "3.7mm~7.0mm",
    "workingTemperature": "-30鈩儈70鈩?,
    "href": "/products/tubing/tpu-tubing",
    "detailHref": "/products/tubing/tpu-tubing",
    "image": "/images/products/tubing/tpu-tubing/tpu-tubing-main.webp",
    "productDetailHref": "/products/tubing/tpu-tubing",
    "url": "/products/tubing/tpu-tubing",
    "path": "/products/tubing/tpu-tubing",
    "imagePath": "/images/products/tubing/tpu-tubing/tpu-tubing-main.webp",
    "cardSubtitle": {
      "zh": "鐑鎬ц仛姘ㄩ叝锛圱PU锛塡\n鍐呭緞鑼冨洿锛?.7mm~7.0mm\\n宸ヤ綔娓╁害锛?30鈩儈70鈩?,
      "en": "鐑鎬ц仛姘ㄩ叝锛圱PU锛塡\nID range: 3.7mm~7.0mm\\nWorking temperature: -30鈩儈70鈩?
    },
    "description": {
      "zh": "鐑鎬ц仛姘ㄩ叝锛圱PU锛夛紝鍐呭緞鑼冨洿 3.7mm~7.0mm锛屽伐浣滄俯搴?-30鈩儈70鈩冦€?,
      "en": "鐑鎬ц仛姘ㄩ叝锛圱PU锛? ID range 3.7mm~7.0mm, working temperature -30鈩儈70鈩?"
    }
  },
  {
    "slug": "fep-tubing",
    "href": "/products/tubing/fep-tubing",
    "detailHref": "/products/tubing/fep-tubing",
    "productDetailHref": "/products/tubing/fep-tubing",
    "url": "/products/tubing/fep-tubing",
    "path": "/products/tubing/fep-tubing",
    "title": "FEP 绠?,
    "model": "FEP 绠?,
    "materialFullName": "姘熷寲涔欑儻涓欑儻鍏辫仛鐗╋紙FEP锛?,
    "innerDiameterRange": "0.3mm~2.0mm",
    "workingTemperature": "-230鈩儈200鈩?,
    "href": "/products/tubing/fep-tubing",
    "detailHref": "/products/tubing/fep-tubing",
    "image": "/images/products/tubing/fep-tubing/fep-tubing-main.webp",
    "productDetailHref": "/products/tubing/fep-tubing",
    "url": "/products/tubing/fep-tubing",
    "path": "/products/tubing/fep-tubing",
    "imagePath": "/images/products/tubing/fep-tubing/fep-tubing-main.webp",
    "cardSubtitle": {
      "zh": "姘熷寲涔欑儻涓欑儻鍏辫仛鐗╋紙FEP锛塡\n鍐呭緞鑼冨洿锛?.3mm~2.0mm\\n宸ヤ綔娓╁害锛?230鈩儈200鈩?,
      "en": "姘熷寲涔欑儻涓欑儻鍏辫仛鐗╋紙FEP锛塡\nID range: 0.3mm~2.0mm\\nWorking temperature: -230鈩儈200鈩?
    },
    "description": {
      "zh": "姘熷寲涔欑儻涓欑儻鍏辫仛鐗╋紙FEP锛夛紝鍐呭緞鑼冨洿 0.3mm~2.0mm锛屽伐浣滄俯搴?-230鈩儈200鈩冦€?,
      "en": "姘熷寲涔欑儻涓欑儻鍏辫仛鐗╋紙FEP锛? ID range 0.3mm~2.0mm, working temperature -230鈩儈200鈩?"
    }
  },
  {
    "slug": "ptfe-tubing",
    "href": "/products/tubing/ptfe-tubing",
    "detailHref": "/products/tubing/ptfe-tubing",
    "productDetailHref": "/products/tubing/ptfe-tubing",
    "url": "/products/tubing/ptfe-tubing",
    "path": "/products/tubing/ptfe-tubing",
    "title": "PTFE 绠?,
    "model": "PTFE 绠?,
    "materialFullName": "鑱氬洓姘熶箼鐑紙PTFE锛?,
    "innerDiameterRange": "1.5mm~2.0mm",

## 8. 路由映射里是否有 tubing


--- data\products\selection\product-route-map.ts line 207 ---
      label: "液泵",
      title: "液体隔膜泵 | FOREACH",
      description:
        "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
    },

    "gas-liquid-diaphragm-pumps": {

--- data\products\selection\product-route-map.ts line 492 ---



export const tubingProductRouteMap = {
  "pvc-tubing": "/products/tubing/pvc-tubing",
  "tpu-tubing": "/products/tubing/tpu-tubing",
  "fep-tubing": "/products/tubing/fep-tubing",

--- data\products\selection\product-route-map.ts line 493 ---


export const tubingProductRouteMap = {
  "pvc-tubing": "/products/tubing/pvc-tubing",
  "tpu-tubing": "/products/tubing/tpu-tubing",
  "fep-tubing": "/products/tubing/fep-tubing",
  "ptfe-tubing": "/products/tubing/ptfe-tubing",

--- data\products\selection\product-route-map.ts line 494 ---

export const tubingProductRouteMap = {
  "pvc-tubing": "/products/tubing/pvc-tubing",
  "tpu-tubing": "/products/tubing/tpu-tubing",
  "fep-tubing": "/products/tubing/fep-tubing",
  "ptfe-tubing": "/products/tubing/ptfe-tubing",
  "peek-tubing": "/products/tubing/peek-tubing",

--- data\products\selection\product-route-map.ts line 495 ---
export const tubingProductRouteMap = {
  "pvc-tubing": "/products/tubing/pvc-tubing",
  "tpu-tubing": "/products/tubing/tpu-tubing",
  "fep-tubing": "/products/tubing/fep-tubing",
  "ptfe-tubing": "/products/tubing/ptfe-tubing",
  "peek-tubing": "/products/tubing/peek-tubing",
  "pfa-tubing": "/products/tubing/pfa-tubing",

--- data\products\selection\product-route-map.ts line 496 ---
  "pvc-tubing": "/products/tubing/pvc-tubing",
  "tpu-tubing": "/products/tubing/tpu-tubing",
  "fep-tubing": "/products/tubing/fep-tubing",
  "ptfe-tubing": "/products/tubing/ptfe-tubing",
  "peek-tubing": "/products/tubing/peek-tubing",
  "pfa-tubing": "/products/tubing/pfa-tubing",
};

--- data\products\selection\product-route-map.ts line 497 ---
  "tpu-tubing": "/products/tubing/tpu-tubing",
  "fep-tubing": "/products/tubing/fep-tubing",
  "ptfe-tubing": "/products/tubing/ptfe-tubing",
  "peek-tubing": "/products/tubing/peek-tubing",
  "pfa-tubing": "/products/tubing/pfa-tubing",
};

--- data\products\selection\product-route-map.ts line 498 ---
  "fep-tubing": "/products/tubing/fep-tubing",
  "ptfe-tubing": "/products/tubing/ptfe-tubing",
  "peek-tubing": "/products/tubing/peek-tubing",
  "pfa-tubing": "/products/tubing/pfa-tubing",
};

## 9. 产品类型介绍里是否有 tubing


## 10. 筛选规则里是否有 tubing

