/* =========================================================
   plunger-pump-card-copy.ts
   FOREACH 产品中心｜柱塞泵产品卡片规格文案

   说明：
   1. 卡片只展示硬参数
   2. 中文页面保留中文规格文案
   3. 非中文页面规格参数统一工程英文
========================================================= */

import type {
  ProductSelectionProduct,
  SelectionLocale,
} from "../product-selection.types";

export type ProductCardSpecItem = {
  label: string;
};

type ProductCardSpecKey =
  | "port_1_4_28_m6"
  | "port_6_40_unf"
  | "repeatability_cv_0_5"
  | "resolution_2000"
  | "resolution_2000_2236"
  | "resolution_2540"
  | "resolution_4000";

const PLUNGER_PUMP_CARD_SPEC_COPY: Record<
  ProductCardSpecKey,
  Record<"zh" | "en", string>
> = {
  port_1_4_28_m6: {
    zh: "接口方式：1/4-28 UNF / M6 接口可选",
    en: "Fluidic Port: 1/4-28 UNF / M6 optional",
  },
  port_6_40_unf: {
    zh: "接口方式：6-40 UNF 液路接口",
    en: "Fluidic Port: 6-40 UNF",
  },
  repeatability_cv_0_5: {
    zh: "重复性：(100% 满量程) CV < 0.5%",
    en: "Repeatability: CV < 0.5% at 100% full stroke",
  },
  resolution_2000: {
    zh: "满量程分辨率：2000 步",
    en: "Full Stroke Resolution: 2000 steps",
  },
  resolution_2000_2236: {
    zh: "满量程分辨率：2000 / 2236 Step",
    en: "Full Stroke Resolution: 2000 / 2236 steps",
  },
  resolution_2540: {
    zh: "满量程分辨率：2540 Step",
    en: "Full Stroke Resolution: 2540 steps",
  },
  resolution_4000: {
    zh: "满量程分辨率：4000 Step",
    en: "Full Stroke Resolution: 4000 steps",
  },
};

export const PLUNGER_PUMP_CARD_SPECS_BY_MODEL: Record<
  string,
  ProductCardSpecKey[]
> = {
  /* EA Series */
  "EA-100-PMMA": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "EA-100-PEEK": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "EA-250-PMMA": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "EA-250-PEEK": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "EA-500-PMMA": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "EA-500-PEEK": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "EA-1000-PMMA": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "EA-1000-PEEK": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "EA-2500-PMMA": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000_2236",
  ],
  "EA-2500-PEEK": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000_2236",
  ],
  "EA-5000-PMMA": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "EA-5000-PEEK": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "EA-10000-PMMA": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_4000",
  ],
  "EA-10000-PEEK": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_4000",
  ],

  /* SM Series */
  "SM-50-PMMA": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "SM-100-PMMA": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "SM-100-PEEK": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "SM-250-PMMA": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "SM-250-PEEK": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "SM-500-PMMA": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],
  "SM-1000-PMMA": [
    "port_1_4_28_m6",
    "repeatability_cv_0_5",
    "resolution_2000",
  ],

  /* TM Series */
  "TM-50-PMMA": [
    "port_6_40_unf",
    "repeatability_cv_0_5",
    "resolution_2540",
  ],
  "TM-100-PMMA": [
    "port_6_40_unf",
    "repeatability_cv_0_5",
    "resolution_2540",
  ],
  "TM-250-PMMA": [
    "port_6_40_unf",
    "repeatability_cv_0_5",
    "resolution_2540",
  ],
  "TM-500-PMMA": [
    "port_6_40_unf",
    "repeatability_cv_0_5",
    "resolution_2540",
  ],
};

function getSpecLocale(locale: SelectionLocale): "zh" | "en" {
  return locale === "zh" ? "zh" : "en";
}

export function getProductCardSpecs(
  product: ProductSelectionProduct,
  locale: SelectionLocale = "zh"
): ProductCardSpecItem[] {
  const cardTitle = product.cardTitle as
    | {
        zh?: string;
        en?: string;
      }
    | undefined;

  const model =
    cardTitle?.en ||
    cardTitle?.zh ||
    (product as any).model ||
    (product as any).title ||
    (product as any).productName ||
    "";

  const specLocale = getSpecLocale(locale);

  return (PLUNGER_PUMP_CARD_SPECS_BY_MODEL[model] || []).map((specKey) => ({
    label: PLUNGER_PUMP_CARD_SPEC_COPY[specKey][specLocale],
  }));
}


