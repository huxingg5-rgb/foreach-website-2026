/* =========================================================
   product-filter-rules.index.ts
   FOREACH 官网｜产品中心筛选规则统一入口

   说明：
   1. ProductSelectionClient 只调用这里
   2. 这里根据 productTypeId 分发到不同产品类型的筛选规则
   3. 当前先接入柱塞泵，后续隔膜泵、移液泵、接头、阀继续扩展
========================================================= */

import type {
  ProductFilterOption,
  ProductFilterRuleContext,
} from "./product-filter-rules.types";
import { getDefaultProductFilterOptions } from "./product-filter-rules.shared";
import { getPlungerPumpFilterOptions } from "./pumps/plunger-pump-filter-rules";

const PLUNGER_PUMP_TYPE_IDS = new Set([
  "plunger-pump",
  "plunger-pumps",
  "piston-pump",
  "piston-pumps",
]);

export function getProductFilterOptions(
  context: ProductFilterRuleContext
): ProductFilterOption[] {
  const productTypeId = context.productTypeId.trim().toLowerCase();

  if (PLUNGER_PUMP_TYPE_IDS.has(productTypeId)) {
    return getPlungerPumpFilterOptions(context);
  }

  return getDefaultProductFilterOptions(context);
}
