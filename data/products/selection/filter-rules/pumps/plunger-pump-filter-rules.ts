/* =========================================================
   plunger-pump-filter-rules.ts
   FOREACH 官网｜柱塞泵筛选选项规则

   统一规则：
   1. 柱塞泵筛选选项始终从当前产品类型全部真实产品中提取
   2. 不再因为前置条件而直接隐藏后续选项
   3. 无法形成真实型号组合的选项，由 ProductSelectionClient
      统一显示为灰色禁用状态
   4. 保留原有 EA / SM / TM、量程和材质排序
========================================================= */

import type {
  ProductFilterOption,
  ProductFilterRuleContext,
} from "../product-filter-rules.types";

import {
  getOptionsFromProducts,
} from "../product-filter-rules.shared";

export function getPlungerPumpFilterOptions(
  context: ProductFilterRuleContext
): ProductFilterOption[] {
  return getOptionsFromProducts(
    context.products,
    context.filterKey
  );
}
