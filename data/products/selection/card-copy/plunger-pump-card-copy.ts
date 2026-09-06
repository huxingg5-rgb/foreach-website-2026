import localizedPistonHeadings from "./piston-pump-headings.generated.json";
/* =========================================================
   plunger-pump-card-copy.ts
   FOREACH 产品中心｜柱塞泵产品卡片文案

   说明：
   1. 六语言页面使用“容量 + 产品形态 + 应用 + 泵头材质”的描述性 H3
   2. 型号由卡片组件使用 P 标签单独展示
   3. 西语、法语、韩语、俄语标题读取经校验的生成文案；参数使用对应语言标签
========================================================= */

import type {
  ProductSelectionProduct,
  SelectionLocale,
} from "../product-selection.types";

export type ProductCardSpecItem = {
  label: string;
};

export const PLUNGER_PUMP_CARD_HEADING_ZH_BY_MODEL: Record<string, string> = {
  /* EA Series */
  "EA-100-PMMA":
    "100 μL精密陶瓷柱塞泵，用于微量液体分配、反应液补加和小体积样本处理，采用PMMA泵头",
  "EA-100-PEEK":
    "100 μL精密柱塞泵，用于特殊试剂分配和小体积反应体系，采用PEEK泵头，适合对材料兼容性和避光要求较高的液路",
  "EA-250-PMMA":
    "250 μL精密陶瓷柱塞泵，用于样本稀释、试剂分配和中小体积反应液处理，采用PMMA泵头",
  "EA-250-PEEK":
    "250 μL精密柱塞泵，用于特殊试剂分配和中小体积液路，采用PEEK泵头，适合对材料兼容性和避光要求较高的液路",
  "EA-500-PMMA":
    "500 μL精密陶瓷柱塞泵，用于常规试剂输送、样本稀释和缓冲液定量分配，采用PMMA泵头",
  "EA-500-PEEK":
    "500 μL精密柱塞泵，用于特殊试剂和中等体积液体输送，采用PEEK泵头，适合对材料兼容性和长期稳定性要求较高的液路",
  "EA-1000-PMMA":
    "1 mL精密陶瓷柱塞泵，用于试剂输送、稀释液添加和缓冲液分配，采用PMMA泵头",
  "EA-1000-PEEK":
    "1 mL精密柱塞泵，用于特殊试剂输送和自动化液体处理，采用PEEK泵头，适合避光和高材料兼容性液路",
  "EA-2500-PMMA":
    "2.5 mL精密陶瓷柱塞泵，用于缓冲液输送、稀释液添加和清洗液补充，采用PMMA泵头",
  "EA-2500-PEEK":
    "2.5 mL精密柱塞泵，用于特殊试剂、缓冲液和清洗液输送，采用PEEK泵头，适合长期运行的高兼容性液路",
  "EA-5000-PMMA":
    "5 mL精密陶瓷柱塞泵，用于清洗液添加、缓冲液输送和管路预充，采用PMMA泵头",
  "EA-5000-PEEK":
    "5 mL精密柱塞泵，用于特殊清洗液、缓冲液和中大体积供液，采用PEEK泵头，适合对材料兼容性和稳定性要求较高的液路",
  "EA-10000-PMMA":
    "10 mL精密陶瓷柱塞泵，用于大体积清洗液输送、系统冲洗和管路预充，采用PMMA泵头",
  "EA-10000-PEEK":
    "10 mL精密柱塞泵，用于大体积特殊液体输送、系统冲洗和管路维护，采用PEEK泵头，适合高兼容性和长期运行液路",

  /* SM Series */
  "SM-50-PMMA":
    "50 μL微型精密陶瓷柱塞泵，用于微量试剂加注和小体积样本分配，采用PMMA泵头",
  "SM-100-PMMA":
    "100 μL微型精密陶瓷柱塞泵，用于自动加样和样本稀释，采用PMMA泵头",
  "SM-100-PEEK":
    "100 μL微型精密柱塞泵，用于特殊试剂加注和小体积液体分配，采用PEEK泵头",
  "SM-250-PMMA":
    "250 μL微型精密陶瓷柱塞泵，用于试剂分配和反应液定量添加，采用PMMA泵头",
  "SM-250-PEEK":
    "250 μL微型精密柱塞泵，用于特殊试剂分配和反应液添加，采用PEEK泵头",
  "SM-500-PMMA":
    "500 μL微型精密陶瓷柱塞泵，用于试剂加注和稀释液定量添加，采用PMMA泵头",
  "SM-1000-PMMA":
    "1 mL微型精密陶瓷柱塞泵，用于稀释液添加和缓冲液分配，采用PMMA泵头",

  /* TM Series */
  "TM-50-PMMA":
    "50 μL超微型精密陶瓷柱塞泵，用于紧凑液路中的微量试剂加注，采用PMMA泵头",
  "TM-100-PMMA":
    "100 μL超微型精密陶瓷柱塞泵，用于小型检测模块中的样本分配，采用PMMA泵头",
  "TM-250-PMMA":
    "250 μL超微型精密陶瓷柱塞泵，用于紧凑分析模块中的反应液添加，采用PMMA泵头",
  "TM-500-PMMA":
    "500 μL超微型精密陶瓷柱塞泵，用于模块化液路中的试剂和缓冲液分配，采用PMMA泵头",
};

export const PLUNGER_PUMP_CARD_HEADING_EN_BY_MODEL: Record<string, string> = {
  /* EA Series */
  "EA-100-PMMA":
    "100 μL Precision Ceramic Piston Pump for Microliter Liquid Dispensing, Reaction-Liquid Addition and Small-Volume Sample Handling, with a PMMA Pump Head",
  "EA-100-PEEK":
    "100 μL Precision Piston Pump for Specialty Reagent Dispensing and Small-Volume Reaction Systems, with a PEEK Pump Head for Fluid Paths Requiring Material Compatibility and Light Protection",
  "EA-250-PMMA":
    "250 μL Precision Ceramic Piston Pump for Sample Dilution, Reagent Dispensing and Small-to-Medium-Volume Reaction-Liquid Handling, with a PMMA Pump Head",
  "EA-250-PEEK":
    "250 μL Precision Piston Pump for Specialty Reagent Dispensing and Small-to-Medium-Volume Fluid Paths, with a PEEK Pump Head for Applications Requiring Material Compatibility and Light Protection",
  "EA-500-PMMA":
    "500 μL Precision Ceramic Piston Pump for Routine Reagent Transfer, Sample Dilution and Metered Buffer Dispensing, with a PMMA Pump Head",
  "EA-500-PEEK":
    "500 μL Precision Piston Pump for Specialty Reagent and Medium-Volume Liquid Transfer, with a PEEK Pump Head for Fluid Paths Requiring Material Compatibility and Long-Term Stability",
  "EA-1000-PMMA":
    "1 mL Precision Ceramic Piston Pump for Reagent Transfer, Diluent Addition and Buffer Dispensing, with a PMMA Pump Head",
  "EA-1000-PEEK":
    "1 mL Precision Piston Pump for Specialty Reagent Transfer and Automated Liquid Handling, with a PEEK Pump Head for Light-Sensitive and Material-Compatible Fluid Paths",
  "EA-2500-PMMA":
    "2.5 mL Precision Ceramic Piston Pump for Buffer Transfer, Diluent Addition and Wash-Fluid Supply, with a PMMA Pump Head",
  "EA-2500-PEEK":
    "2.5 mL Precision Piston Pump for Specialty Reagent, Buffer and Wash-Fluid Transfer, with a PEEK Pump Head for Material-Compatible Fluid Paths and Long-Term Operation",
  "EA-5000-PMMA":
    "5 mL Precision Ceramic Piston Pump for Wash-Fluid Supply, Buffer Transfer and Line Priming, with a PMMA Pump Head",
  "EA-5000-PEEK":
    "5 mL Precision Piston Pump for Specialty Wash Fluids, Buffers and Medium-to-Large-Volume Supply, with a PEEK Pump Head for Fluid Paths Requiring Material Compatibility and Stability",
  "EA-10000-PMMA":
    "10 mL Precision Ceramic Piston Pump for High-Volume Wash-Fluid Transfer, System Flushing and Line Priming, with a PMMA Pump Head",
  "EA-10000-PEEK":
    "10 mL Precision Piston Pump for High-Volume Specialty Liquid Transfer, System Flushing and Fluid-Line Maintenance, with a PEEK Pump Head for Material-Compatible Fluid Paths and Long-Term Operation",

  /* SM Series */
  "SM-50-PMMA":
    "50 μL Miniature Precision Ceramic Piston Pump for Microliter Reagent Addition and Small-Volume Sample Dispensing, with a PMMA Pump Head",
  "SM-100-PMMA":
    "100 μL Miniature Precision Ceramic Piston Pump for Automated Sampling and Sample Dilution, with a PMMA Pump Head",
  "SM-100-PEEK":
    "100 μL Miniature Precision Piston Pump for Specialty Reagent Addition and Small-Volume Dispensing, with a PEEK Pump Head",
  "SM-250-PMMA":
    "250 μL Miniature Precision Ceramic Piston Pump for Reagent Dispensing and Metered Reaction-Liquid Addition, with a PMMA Pump Head",
  "SM-250-PEEK":
    "250 μL Miniature Precision Piston Pump for Specialty Reagent Dispensing and Reaction-Liquid Addition, with a PEEK Pump Head",
  "SM-500-PMMA":
    "500 μL Miniature Precision Ceramic Piston Pump for Reagent Addition and Metered Diluent Dosing, with a PMMA Pump Head",
  "SM-1000-PMMA":
    "1 mL Miniature Precision Ceramic Piston Pump for Diluent Addition and Buffer Dispensing, with a PMMA Pump Head",

  /* TM Series */
  "TM-50-PMMA":
    "50 μL Ultra-Compact Precision Ceramic Piston Pump for Microliter Reagent Addition in Compact Fluid Paths, with a PMMA Pump Head",
  "TM-100-PMMA":
    "100 μL Ultra-Compact Precision Ceramic Piston Pump for Sample Dispensing in Small Analytical Modules, with a PMMA Pump Head",
  "TM-250-PMMA":
    "250 μL Ultra-Compact Precision Ceramic Piston Pump for Reaction-Liquid Addition in Compact Analytical Modules, with a PMMA Pump Head",
  "TM-500-PMMA":
    "500 μL Ultra-Compact Precision Ceramic Piston Pump for Reagent and Buffer Dispensing in Modular Fluid Paths, with a PMMA Pump Head",
};

type ProductCardSpecKey =
  | "port_1_4_28_m6"
  | "port_6_40_unf"
  | "repeatability_full_0_5"
  | "pmma_head"
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
  repeatability_full_0_5: {
    zh: "满量程重复性：≤0.5%（规定条件）", en: "Full-stroke repeatability ≤0.5% (specified conditions)",
    es: "Repetibilidad a carrera completa ≤0,5 % (condiciones especificadas)", fr: "Répétabilité pleine course ≤0,5 % (conditions spécifiées)",
    ko: "전체 행정 반복성 ≤0.5% (지정 조건)", ru: "Повторяемость полного хода ≤0,5 % (заданные условия)",
  },
  pmma_head: {
    zh: "展示泵头材质：PMMA", en: "Displayed pump head: PMMA", es: "Cabezal mostrado: PMMA",
    fr: "Tête présentée : PMMA", ko: "표시 펌프 헤드: PMMA", ru: "Представленная головка: PMMA",
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
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "EA-100-PEEK": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "EA-250-PMMA": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "EA-250-PEEK": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "EA-500-PMMA": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "EA-500-PEEK": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "EA-1000-PMMA": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "EA-1000-PEEK": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "EA-2500-PMMA": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000_2236",
  ],
  "EA-2500-PEEK": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000_2236",
  ],
  "EA-5000-PMMA": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "EA-5000-PEEK": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "EA-10000-PMMA": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_4000",
  ],
  "EA-10000-PEEK": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_4000",
  ],

  /* SM Series */
  "SM-50-PMMA": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "SM-100-PMMA": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "SM-100-PEEK": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "SM-250-PMMA": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "SM-250-PEEK": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "SM-500-PMMA": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],
  "SM-1000-PMMA": [
    "port_1_4_28_m6",
    "repeatability_full_0_5",
    "resolution_2000",
  ],

  /* TM Series */
  "TM-50-PMMA": [
    "port_6_40_unf",
    "pmma_head",
    "resolution_2540",
  ],
  "TM-100-PMMA": [
    "port_6_40_unf",
    "pmma_head",
    "resolution_2540",
  ],
  "TM-250-PMMA": [
    "port_6_40_unf",
    "pmma_head",
    "resolution_2540",
  ],
  "TM-500-PMMA": [
    "port_6_40_unf",
    "pmma_head",
    "resolution_2540",
  ],
};

function getProductCardModel(product: ProductSelectionProduct) {
  const productIdentity = product as ProductSelectionProduct & {
    model?: string;
    title?: string;
    productName?: string;
  };
  const cardTitle = product.cardTitle as
    | {
        zh?: string;
        en?: string;
      }
    | undefined;

  return (
    cardTitle?.en ||
    cardTitle?.zh ||
    productIdentity.model ||
    productIdentity.title ||
    productIdentity.productName ||
    ""
  );
}

export function getProductCardHeading(
  product: ProductSelectionProduct,
  locale: SelectionLocale = "zh",
) {
  if (locale !== "zh" && locale !== "en") {
    const headings: Record<string, string> = localizedPistonHeadings[locale];
    return headings[getProductCardModel(product)] || "";
  }

  const headingByModel =
    locale === "zh"
      ? PLUNGER_PUMP_CARD_HEADING_ZH_BY_MODEL
      : PLUNGER_PUMP_CARD_HEADING_EN_BY_MODEL;

  return headingByModel[getProductCardModel(product)] || "";
}

export function getProductCardSpecs(
  product: ProductSelectionProduct,
  locale: SelectionLocale = "zh"
): ProductCardSpecItem[] {
  const model = getProductCardModel(product);

  return (PLUNGER_PUMP_CARD_SPECS_BY_MODEL[model] || []).map((specKey) => ({
    label: PLUNGER_PUMP_CARD_SPEC_COPY[specKey][locale],
  }));
}


