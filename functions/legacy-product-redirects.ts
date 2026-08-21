export type LegacyProductLanguage = "cn" | "en";

export interface LegacyProductRedirect {
  readonly legacyId: string;
  readonly productName: string;
  readonly cn: string;
  readonly en: string;
}

/**
 * 已由旧 CMS 后台核实、且已在旧站上线 301 的产品级迁移事实源。
 *
 * 新增记录前必须同时核对旧产品身份、新页面内容和最终 200 状态，
 * 不能根据相似标题或型号猜测永久跳转。
 */
export const LEGACY_PRODUCT_REDIRECTS: Readonly<
  Record<string, LegacyProductRedirect>
> = Object.freeze({
  "12634": {
    legacyId: "12634",
    productName: "300mL/min 液体隔膜泵（DPL30）",
    cn: "/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/",
    en: "/en/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/",
  },
  "12635": {
    legacyId: "12635",
    productName: "300mL/min 高压液体隔膜泵（DPL30H）",
    cn: "/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump/",
    en: "/en/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump/",
  },
  "12636": {
    legacyId: "12636",
    productName: "600mL/min 液体隔膜泵（DPL60）",
    cn: "/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/",
    en: "/en/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/",
  },
  "12637": {
    legacyId: "12637",
    productName: "6L/min 气液混合泵（DPGL800）",
    cn: "/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/",
    en: "/en/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/",
  },
});

export function getLegacyProductTarget(
  legacyId: string | null,
  language: LegacyProductLanguage,
): string | null {
  if (!legacyId) {
    return null;
  }

  return LEGACY_PRODUCT_REDIRECTS[legacyId]?.[language] ?? null;
}
