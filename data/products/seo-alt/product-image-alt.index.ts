/* =========================================================
   product-image-alt.index.ts
   FOREACH 官网｜产品图片 SEO ALT 统一入口

   说明：
   1. 前端后续只需要调用 getProductImageAlt
   2. 这里根据 productTypeId 分发到不同产品类型的 ALT 规则
   3. 当前先接柱塞泵规则，暂不影响现有页面
========================================================= */

import type { ProductImageAltInput } from "./product-image-alt.types";
import { buildGenericProductImageAlt, normalizeText } from "./product-image-alt.shared";
import { getPlungerPumpImageAlt } from "./pumps/plunger-pump-image-alt";

const PLUNGER_PUMP_TYPE_IDS = new Set([
  "plunger-pump",
  "plunger-pumps",
  "piston-pump",
  "piston-pumps",
]);

export function getProductImageAlt(input: ProductImageAltInput): string {
  const productTypeId = normalizeText(input.productTypeId).toLowerCase();

  if (PLUNGER_PUMP_TYPE_IDS.has(productTypeId)) {
    return getPlungerPumpImageAlt(input);
  }

  return buildGenericProductImageAlt(input.productId);
}

export type { ProductImageAltInput } from "./product-image-alt.types";
export { getPlungerPumpImageAlt } from "./pumps/plunger-pump-image-alt";
