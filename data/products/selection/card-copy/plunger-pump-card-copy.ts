/* =========================================================
   plunger-pump-card-copy.ts
   FOREACH 官网｜柱塞泵产品卡片三行文案

   数据来源：
   1. FOREACH_柱塞泵官网表格维护版_v2.xlsx
   2. 工作表：04_产品卡片

   渲染原则：
   1. 卡片只展示硬参数
   2. 不在卡片里写应用场景
   3. 不在卡片里写材料可选范围
   4. 详情正文、参数表、FAQ 后续放到详情页
========================================================= */

import type { ProductSelectionProduct } from "../product-selection.types";

export type ProductCardSpecItem = {
  label: string;
};

export const PLUNGER_PUMP_CARD_SPECS_BY_MODEL: Record<
  string,
  ProductCardSpecItem[]
> = {
  /* EA Series */
  "EA-100-PMMA": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "EA-100-PEEK": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "EA-250-PMMA": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "EA-250-PEEK": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "EA-500-PMMA": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "EA-500-PEEK": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "EA-1000-PMMA": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "EA-1000-PEEK": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "EA-2500-PMMA": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 / 2236 Step 满量程分辨率" },
  ],
  "EA-2500-PEEK": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 / 2236 Step 满量程分辨率" },
  ],
  "EA-5000-PMMA": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "EA-5000-PEEK": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "EA-10000-PMMA": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "4000 Step 满量程分辨率" },
  ],
  "EA-10000-PEEK": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "4000 Step 满量程分辨率" },
  ],

  /* SM Series */
  "SM-50-PMMA": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "SM-100-PMMA": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "SM-100-PEEK": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "SM-250-PMMA": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "SM-250-PEEK": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "SM-500-PMMA": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],
  "SM-1000-PMMA": [
    { label: "1/4-28 UNF / M6 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2000 Step 满量程分辨率" },
  ],

  /* TM Series */
  "TM-50-PMMA": [
    { label: "6-40 UNF 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2540 Step 满量程分辨率" },
  ],
  "TM-100-PMMA": [
    { label: "6-40 UNF 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2540 Step 满量程分辨率" },
  ],
  "TM-250-PMMA": [
    { label: "6-40 UNF 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2540 Step 满量程分辨率" },
  ],
  "TM-500-PMMA": [
    { label: "6-40 UNF 液路接口" },
    { label: "100% 量程重复性 < 0.5%" },
    { label: "2540 Step 满量程分辨率" },
  ],
};

export function getProductCardSpecs(product: ProductSelectionProduct) {
  const model = product.cardTitle.en || product.cardTitle.zh;

  return PLUNGER_PUMP_CARD_SPECS_BY_MODEL[model] || [];
}
