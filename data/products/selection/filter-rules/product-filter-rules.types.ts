/* =========================================================
   product-filter-rules.types.ts
   FOREACH 官网｜产品中心筛选规则通用类型

   说明：
   1. 每个产品类型可以有自己的筛选联动规则
   2. 例如柱塞泵、隔膜泵、移液泵、接头、阀后续都可以独立扩展
   3. ProductFilterPanel 只负责渲染，不写产品业务规则
========================================================= */

import type {
  ProductSelectionProduct,
  SelectionFilterKey,
} from "../product-selection.types";

export type ProductFilterOption = {
  value: string;
  label: string;
};

export type ProductFilterRuleContext = {
  productTypeId: string;
  products: ProductSelectionProduct[];
  filterKey: SelectionFilterKey;
  selectedFilters: Partial<Record<SelectionFilterKey, Set<string>>>;
};

export type ProductFilterRuleGetter = (
  context: ProductFilterRuleContext
) => ProductFilterOption[];
