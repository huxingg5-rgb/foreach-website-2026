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
  Record<SelectionLocale, string>
> = {
  port_1_4_28_m6: {
    zh: "接口方式：1/4-28 UNF / M6 接口可选",
    en: "1/4-28 UNF port; M6 optional",
    es: "Puerto 1/4-28 UNF; M6 opcional",
    fr: "Port 1/4-28 UNF ; M6 en option",
    ko: "1/4-28 UNF 포트; M6 선택 사양",
    ru: "Порт 1/4-28 UNF; M6 опционально",
  },
  port_6_40_unf: {
    zh: "接口方式：6-40 UNF 液路接口",
    en: "6-40 UNF port",
    es: "Puerto 6-40 UNF",
    fr: "Port 6-40 UNF",
    ko: "6-40 UNF 포트",
    ru: "Порт 6-40 UNF",
  },
  repeatability_cv_0_5: {
    zh: "重复性：(100% 满量程) CV < 0.5%",
    en: "CV <0.5% repeatability at full stroke",
    es: "Repetibilidad CV <0,5 % a carrera completa",
    fr: "Répétabilité CV < 0,5 % sur la course complète",
    ko: "전체 행정 반복성 CV <0.5%",
    ru: "Повторяемость CV <0,5 % на полном ходе",
  },
  resolution_2000: {
    zh: "满量程分辨率：2000 步",
    en: "2,000-step full-stroke resolution",
    es: "Resolución de carrera completa: 2.000 pasos",
    fr: "Résolution sur la course complète : 2 000 pas",
    ko: "전체 행정 분해능 2,000스텝",
    ru: "Разрешение полного хода: 2 000 шагов",
  },
  resolution_2000_2236: {
    zh: "满量程分辨率：2000 / 2236 Step",
    en: "2,000 / 2,236-step full-stroke resolution",
    es: "Resolución de carrera completa: 2.000/2.236 pasos",
    fr: "Résolution sur la course complète : 2 000/2 236 pas",
    ko: "전체 행정 분해능 2,000/2,236스텝",
    ru: "Разрешение полного хода: 2 000/2 236 шагов",
  },
  resolution_2540: {
    zh: "满量程分辨率：2540 Step",
    en: "2,540-step full-stroke resolution",
    es: "Resolución de carrera completa: 2.540 pasos",
    fr: "Résolution sur la course complète : 2 540 pas",
    ko: "전체 행정 분해능 2,540스텝",
    ru: "Разрешение полного хода: 2 540 шагов",
  },
  resolution_4000: {
    zh: "满量程分辨率：4000 Step",
    en: "4,000-step full-stroke resolution",
    es: "Resolución de carrera completa: 4.000 pasos",
    fr: "Résolution sur la course complète : 4 000 pas",
    ko: "전체 행정 분해능 4,000스텝",
    ru: "Разрешение полного хода: 4 000 шагов",
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

  return (PLUNGER_PUMP_CARD_SPECS_BY_MODEL[model] || []).map((specKey) => ({
    label: PLUNGER_PUMP_CARD_SPEC_COPY[specKey][locale],
  }));
}


