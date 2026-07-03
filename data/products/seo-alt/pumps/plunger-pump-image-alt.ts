/* =========================================================
   plunger-pump-image-alt.ts
   FOREACH 官网｜柱塞泵产品图片 SEO ALT 规则

   说明：
   1. 这里只处理柱塞泵 / 活塞泵类产品图片 ALT
   2. 当前主要覆盖 EA / SM / TM 系列
   3. 不在这里直接接页面
   4. 不建议一开始手写死 25 条最终文案
   5. 最终文案建议先由 Excel 生成预览表，人工确认后再放入 override
========================================================= */

import type { ProductImageAltInput } from "../product-image-alt.types";
import {
  buildGenericProductImageAlt,
  formatCapacityForAlt,
  joinAltParts,
  normalizeText,
  toUpperCode,
  uniqueNonEmpty,
} from "../product-image-alt.shared";

export type PlungerPumpSeriesCode = "EA" | "SM" | "TM" | string;

/**
 * 人工确认后的柱塞泵 ALT 覆盖表
 *
 * 使用方式：
 * 1. Excel / 脚本先生成 ALT 预览表
 * 2. 人工确认后，再把最终文案写进这里
 * 3. 一旦命中 productId，这里的文案优先级最高
 *
 * 示例：
 * "EA-100-PMMA": "FOREACH EA-100-PMMA 100 µL standard piston pump with PMMA pump head for low-volume reagent dispensing and sample handling"
 */
export const PLUNGER_PUMP_IMAGE_ALT_BY_PRODUCT_ID: Record<string, string> = {
  "EA-100-PMMA": "FOREACH EA-100-PMMA 100 µL standard piston pump with PMMA pump head for low-volume reagent dispensing and small-volume sample handling in IVD analyzers",

  "EA-100-PEEK": "FOREACH EA-100-PEEK 100 µL standard piston pump with PEEK pump head for special reagent dispensing and molecular diagnostics liquid handling",

  "EA-250-PMMA": "FOREACH EA-250-PMMA 250 µL standard piston pump with PMMA pump head for sample dilution and reagent dispensing in biochemistry and immunoassay analyzers",

  "EA-250-PEEK": "FOREACH EA-250-PEEK 250 µL standard piston pump with PEEK pump head for light-sensitive reagent transfer and high-compatibility fluidic modules",

  "EA-500-PMMA": "FOREACH EA-500-PMMA 500 µL standard piston pump with PMMA pump head for reagent transfer, sample dilution and buffer dispensing in automated analyzers",

  "EA-500-PEEK": "FOREACH EA-500-PEEK 500 µL standard piston pump with PEEK pump head for special reagent transfer in molecular diagnostics and analytical instruments",

  "EA-1000-PMMA": "FOREACH EA-1000-PMMA 1000 µL standard piston pump with PMMA pump head for reagent transfer, diluent addition and buffer dispensing in IVD systems",

  "EA-1000-PEEK": "FOREACH EA-1000-PEEK 1000 µL standard piston pump with PEEK pump head for light-sensitive reagent handling in molecular diagnostics and life science instruments",

  "EA-2500-PMMA": "FOREACH EA-2500-PMMA 2.5 mL standard piston pump with PMMA pump head for buffer delivery, diluent addition and wash liquid supply in automated analyzers",

  "EA-2500-PEEK": "FOREACH EA-2500-PEEK 2.5 mL standard piston pump with PEEK pump head for special reagent, buffer and wash liquid transfer in analytical instruments",

  "EA-5000-PMMA": "FOREACH EA-5000-PMMA 5 mL standard piston pump with PMMA pump head for wash liquid addition, buffer delivery and line priming in automated analyzers",

  "EA-5000-PEEK": "FOREACH EA-5000-PEEK 5 mL standard piston pump with PEEK pump head for chemically compatible wash liquid, buffer and life science reagent transfer",

  "EA-10000-PMMA": "FOREACH EA-10000-PMMA 10 mL standard piston pump with PMMA pump head for high-volume wash liquid delivery, buffer refill and system rinsing",

  "EA-10000-PEEK": "FOREACH EA-10000-PEEK 10 mL standard piston pump with PEEK pump head for high-volume special liquid, wash liquid and buffer transfer in analytical instruments",

  "SM-50-PMMA": "FOREACH SM-50-PMMA 50 µL miniature piston pump with PMMA pump head for micro-volume reagent dispensing and sample handling in compact IVD devices",

  "SM-100-PMMA": "FOREACH SM-100-PMMA 100 µL miniature piston pump with PMMA pump head for POCT analyzers, compact liquid handling modules and sample dilution",

  "SM-100-PEEK": "FOREACH SM-100-PEEK 100 µL miniature piston pump with PEEK pump head for special reagent handling in compact molecular diagnostics modules",

  "SM-250-PMMA": "FOREACH SM-250-PMMA 250 µL miniature piston pump with PMMA pump head for compact IVD sample processing and reaction liquid dispensing",

  "SM-250-PEEK": "FOREACH SM-250-PEEK 250 µL miniature piston pump with PEEK pump head for light-sensitive reagent transfer in compact diagnostic instruments",

  "SM-500-PMMA": "FOREACH SM-500-PMMA 500 µL miniature piston pump with PMMA pump head for reagent transfer and reaction liquid dispensing in compact automation modules",

  "SM-1000-PMMA": "FOREACH SM-1000-PMMA 1000 µL miniature piston pump with PMMA pump head for reagent transfer, diluent addition and buffer dispensing in compact instruments",

  "TM-50-PMMA": "FOREACH TM-50-PMMA 50 µL ultra-compact piston pump with PMMA pump head for portable analyzers and low-volume microfluidic control",

  "TM-100-PMMA": "FOREACH TM-100-PMMA 100 µL ultra-compact piston pump with PMMA pump head for portable IVD modules and small-volume liquid handling",

  "TM-250-PMMA": "FOREACH TM-250-PMMA 250 µL ultra-compact piston pump with PMMA pump head for micro-volume reagent transfer and sample processing in compact instruments",

  "TM-500-PMMA": "FOREACH TM-500-PMMA 500 µL ultra-compact piston pump with PMMA pump head for reagent transfer and compact fluid supply in modular liquid handling systems",
};

/**
 * 柱塞泵系列英文定位
 */
export const PLUNGER_PUMP_SERIES_LABELS: Record<string, string> = {
  EA: "standard piston pump",
  SM: "miniature piston pump",
  TM: "ultra-compact piston pump",
};

/**
 * 柱塞泵默认应用场景
 * 注意：
 * 这只是兜底，不是最终 SEO 文案。
 * 最终应该优先使用表格正文提炼出来的 applicationPhrases。
 */
export const PLUNGER_PUMP_DEFAULT_APPLICATIONS_BY_SERIES: Record<string, string> = {
  EA: "precision reagent dispensing in IVD and laboratory automation systems",
  SM: "compact IVD reagent dispensing and small-footprint liquid handling modules",
  TM: "space-limited liquid handling in portable analyzers and compact fluidic modules",
};

/**
 * 根据材质生成泵头描述
 */
export function getPlungerPumpMaterialPhrase(materialCode?: string | null): string {
  const code = toUpperCode(materialCode);

  if (code === "PMMA") {
    return "with PMMA pump head";
  }

  if (code === "PEEK") {
    return "with PEEK pump head";
  }

  if (code) {
    return `with ${code} pump head`;
  }

  return "";
}

/**
 * 根据系列生成柱塞泵英文产品类型描述
 */
export function getPlungerPumpSeriesPhrase(seriesCode?: PlungerPumpSeriesCode): string {
  const code = toUpperCode(seriesCode);

  return PLUNGER_PUMP_SERIES_LABELS[code] || "piston pump";
}

/**
 * 根据容量、系列和材质生成兜底应用场景
 *
 * 注意：
 * 这里不要写得过度绝对。
 * 例如不要写 best / only / ideal / most advanced。
 */
export function getPlungerPumpDefaultApplicationPhrase(input: ProductImageAltInput): string {
  const seriesCode = toUpperCode(input.seriesCode);
  const materialCode = toUpperCode(input.materialCode);
  const capacityValue = Number(input.capacityUl);

  if (materialCode === "PEEK" && capacityValue <= 250) {
    return "special reagent handling and molecular diagnostics liquid handling";
  }

  if (materialCode === "PEEK") {
    return "special reagent transfer in analytical and life science instruments";
  }

  if (seriesCode === "EA" && capacityValue >= 2500) {
    return "buffer supply, wash liquid transfer and system priming in automated analyzers";
  }

  return (
    PLUNGER_PUMP_DEFAULT_APPLICATIONS_BY_SERIES[seriesCode] ||
    "precision liquid handling in IVD and analytical instruments"
  );
}

/**
 * 获取柱塞泵应用场景短语
 *
 * 优先级：
 * 1. applicationPhrases：来自 Excel 正文提炼后的英文短语
 * 2. 默认规则：根据系列、容量、材质生成兜底短语
 */
export function getPlungerPumpApplicationPhrase(input: ProductImageAltInput): string {
  const phrases = uniqueNonEmpty(input.applicationPhrases || []);

  if (phrases.length > 0) {
    return phrases.slice(0, 3).join(", ");
  }

  return getPlungerPumpDefaultApplicationPhrase(input);
}

/**
 * 获取柱塞泵产品图片 ALT
 *
 * 优先级：
 * 1. input.customAlt
 * 2. PLUNGER_PUMP_IMAGE_ALT_BY_PRODUCT_ID[productId]
 * 3. 按规则生成
 * 4. 通用兜底
 */
export function getPlungerPumpImageAlt(input: ProductImageAltInput): string {
  const productId = normalizeText(input.productId);

  if (!productId) {
    return buildGenericProductImageAlt(productId);
  }

  const customAlt = normalizeText(input.customAlt);

  if (customAlt) {
    return customAlt;
  }

  const manualAlt = PLUNGER_PUMP_IMAGE_ALT_BY_PRODUCT_ID[productId];

  if (manualAlt) {
    return manualAlt;
  }

  const capacityLabel = formatCapacityForAlt(input.capacityUl);
  const seriesPhrase = getPlungerPumpSeriesPhrase(input.seriesCode);
  const materialPhrase = getPlungerPumpMaterialPhrase(input.materialCode);
  const applicationPhrase = getPlungerPumpApplicationPhrase(input);

  const generatedAlt = joinAltParts([
    "FOREACH",
    productId,
    capacityLabel,
    seriesPhrase,
    materialPhrase,
    "for",
    applicationPhrase,
  ]);

  return generatedAlt || buildGenericProductImageAlt(productId);
}

