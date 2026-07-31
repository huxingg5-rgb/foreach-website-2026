/* =========================================================
   product-filter-rules.shared.ts
   FOREACH 官网｜产品中心筛选规则通用工具

   说明：
   1. 这里放通用筛选工具
   2. 不写具体产品类型的业务判断
========================================================= */

import type {
  ProductFilterOption,
  ProductFilterRuleContext,
} from "./product-filter-rules.types";
import type { ProductSelectionProduct, SelectionFilterKey } from "../product-selection.types";

export function normalizeFilterText(value: unknown): string {
  return String(value ?? "").trim();
}

/* PRODUCT_FILTER_MULTI_VALUE_SPLIT_START */

/*
 * 一个产品字段允许用 | 保存多个筛选值。
 *
 * 例如：
 * 10-32 UNF|1/4-28 UNF
 *
 * 筛选面板中必须拆成两个独立选项，
 * 但产品本身仍可同时匹配这两个选项。
 */
export function getOptionsFromProducts(
  products: ProductSelectionProduct[],
  filterKey: SelectionFilterKey
): ProductFilterOption[] {
  const optionMap =
    new Map<string, ProductFilterOption>();

  products.forEach((product) => {
    const rawValue =
      normalizeFilterText(
        (product.filters || {})[
          filterKey
        ]
      );

    if (!rawValue) {
      return;
    }

    rawValue
      .split("|")
      .map((item) =>
        normalizeFilterText(item)
      )
      .filter(Boolean)
      .forEach((value) => {
        if (optionMap.has(value)) {
          return;
        }

        optionMap.set(value, {
          value,
          label: value,
        });
      });
  });

  return sortProductFilterOptions(
    Array.from(
      optionMap.values()
    ),
    filterKey
  );
}

/* PRODUCT_FILTER_MULTI_VALUE_SPLIT_END */


function getCapacityNumber(value: string): number {
  const matched = value.match(/\d+(\.\d+)?/);
  return matched ? Number(matched[0]) : Number.MAX_SAFE_INTEGER;
}

function getSeriesOrder(value: string): number {
  if (value.includes("EA")) return 1;
  if (value.includes("SM")) return 2;
  if (value.includes("TM")) return 3;
  return 99;
}

function getMaterialOrder(value: string): number {
  if (value.includes("PMMA")) return 1;
  if (value.includes("PEEK")) return 2;
  return 99;
}

function sortProductFilterOptions(
  options: ProductFilterOption[],
  filterKey: SelectionFilterKey
): ProductFilterOption[] {
  const nextOptions = [...options];

  if (filterKey === "filter01") {
    return nextOptions.sort(
      (current, next) =>
        getSeriesOrder(current.value) - getSeriesOrder(next.value)
    );
  }

  if (filterKey === "filter02") {
    return nextOptions.sort(
      (current, next) =>
        getCapacityNumber(current.value) - getCapacityNumber(next.value)
    );
  }

  if (filterKey === "filter03") {
    return nextOptions.sort(
      (current, next) =>
        getMaterialOrder(current.value) - getMaterialOrder(next.value)
    );
  }

  return nextOptions;
}

/**
 * 根据指定依赖筛选项，过滤产品集合
 *
 * 例：
 * 柱塞泵量程 filter02 依赖产品系列 filter01
 * 柱塞泵材质 filter03 依赖产品系列 filter01 + 量程 filter02
 */
export function filterProductsByDependencies(
  products: ProductSelectionProduct[],
  selectedFilters: ProductFilterRuleContext["selectedFilters"],
  dependencyKeys: SelectionFilterKey[]
): ProductSelectionProduct[] {
  if (dependencyKeys.length === 0) {
    return products;
  }

  return products.filter((product) => {
    return dependencyKeys.every((filterKey) => {
      const selectedValues = selectedFilters[filterKey];

      if (!selectedValues || selectedValues.size === 0) {
        return true;
      }

      const productValue = (product.filters || {})[filterKey];

      return Boolean(productValue && selectedValues.has(String(productValue)));
    });
  });
}

/**
 * 默认筛选逻辑：
 * 不做联动，直接从当前产品类型全部产品中提取筛选项。
 */
export function getDefaultProductFilterOptions(
  context: ProductFilterRuleContext
): ProductFilterOption[] {
  return getOptionsFromProducts(context.products, context.filterKey);
}

