/* =========================================================
   product-image-alt.shared.ts
   FOREACH 官网｜产品图片 SEO ALT 通用工具函数

   说明：
   1. 只放通用工具，不放某个产品类型的具体规则
   2. 柱塞泵、隔膜泵、阀、接头后续都可以复用
========================================================= */

export function normalizeText(value: unknown): string {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}

export function toUpperCode(value: unknown): string {
  return normalizeText(value).toUpperCase();
}

export function uniqueNonEmpty(values: Array<string | null | undefined>): string[] {
  const result: string[] = [];

  values.forEach((value) => {
    const text = normalizeText(value);
    if (text && !result.includes(text)) {
      result.push(text);
    }
  });

  return result;
}

export function joinAltParts(parts: Array<string | null | undefined>): string {
  return uniqueNonEmpty(parts).join(" ");
}

/**
 * 将 Excel 里的 µL 数值转成适合 ALT 的英文容量显示
 *
 * 规则：
 * 50    -> 50 µL
 * 100   -> 100 µL
 * 1000  -> 1000 µL
 * 2500  -> 2.5 mL
 * 5000  -> 5 mL
 * 10000 -> 10 mL
 */
export function formatCapacityForAlt(capacityUl?: number | string | null): string {
  if (capacityUl === null || capacityUl === undefined || capacityUl === "") {
    return "";
  }

  const value = Number(capacityUl);

  if (!Number.isFinite(value) || value <= 0) {
    return "";
  }

  if (value > 1000) {
    const mlValue = value / 1000;
    const label = Number.isInteger(mlValue)
      ? String(mlValue)
      : String(Number(mlValue.toFixed(2))).replace(/\.0$/, "");

    return `${label} mL`;
  }

  return `${value} µL`;
}

/**
 * 生成兜底 ALT
 * 正常上线产品不建议长期依赖兜底文案
 */
export function buildGenericProductImageAlt(productId: string): string {
  const safeProductId = normalizeText(productId);

  if (!safeProductId) {
    return "FOREACH precision fluidic component for liquid handling systems";
  }

  return `FOREACH ${safeProductId} precision fluidic component for liquid handling systems`;
}
