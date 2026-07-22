/* =========================================================
   plunger-pump-filter-rules.ts
   FOREACH 官网｜柱塞泵筛选联动规则

   当前柱塞泵筛选字段：
   filter01：产品系列 EA / SM / TM
   filter02：量程
   filter03：泵头材质

   联动逻辑：
   1. 产品系列始终展示 EA / SM / TM
   2. 量程根据已选产品系列动态生成
   3. 泵头材质根据已选产品系列 + 量程动态生成

   这样可以避免：
   - 选 SM 时仍显示 EA 的 2500μL / 5000μL / 10000μL
   - 选 TM 时仍显示 PEEK
========================================================= */

import type { SelectionFilterKey } from "../../product-selection.types";
import type {
  ProductFilterOption,
  ProductFilterRuleContext,
} from "../product-filter-rules.types";
import {
  filterProductsByDependencies,
  getOptionsFromProducts,
} from "../product-filter-rules.shared";

const PLUNGER_PUMP_FILTER_DEPENDENCIES: Partial<
  Record<SelectionFilterKey, SelectionFilterKey[]>
> = {
  filter01: [],
  filter02: ["filter01"],
  filter03: ["filter01", "filter02"],
};

export function getPlungerPumpFilterOptions(
  context: ProductFilterRuleContext
): ProductFilterOption[] {
  const dependencyKeys =
    PLUNGER_PUMP_FILTER_DEPENDENCIES[context.filterKey] || [];

  const availableProducts = filterProductsByDependencies(
    context.products,
    context.selectedFilters,
    dependencyKeys
  );

  return getOptionsFromProducts(availableProducts, context.filterKey);
}
