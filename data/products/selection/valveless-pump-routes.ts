// Categories and models share one public slug. Asset/storage paths stay unchanged.
export const VALVELESS_PUMP_CATEGORY_SLUG_ZH = "valveless-metering-pump";
export const VALVELESS_PUMP_CATEGORY_SLUG_INTL = VALVELESS_PUMP_CATEGORY_SLUG_ZH;
export const VALVELESS_PUMP_LEGACY_CATEGORY_SLUG = "valveless-pumps";
export const VALVELESS_PUMP_CATEGORY_LABEL_ZH = "无阀计量泵";
export const VALVELESS_PUMP_MODEL_SLUGS = ["rpl-p4", "rpl-p635", "rpl-p15", "drpl-0109", "drpl-0119"] as const;

/** Normalize public page paths only; never rewrite images, PDFs or storage paths. */
export function normalizeValvelessPumpPath(pathname: string) {
  const match = /^(\/(?:en\/|es\/|fr\/|ko\/|ru\/)?products\/pumps\/)valveless-pumps(?:\/([^/?#]+))?(\/?)([?#].*)?$/.exec(pathname);
  if (!match || (match[2] && !VALVELESS_PUMP_MODEL_SLUGS.some(slug => slug === match[2]))) return pathname;
  return `${match[1]}${VALVELESS_PUMP_CATEGORY_SLUG_ZH}${match[2] ? `/${match[2]}` : ""}${match[3]}${match[4] || ""}`;
}

/** Compatibility entry point for existing navigation/localization callers. */
export function localizeValvelessPumpCategoryPath(pathname: string, _locale: string) {
  return normalizeValvelessPumpPath(pathname);
}

export function getValvelessPumpPath(locale: string, modelSlug?: string) {
  const prefix = locale === "zh" || locale === "zh-CN" ? "" : `/${locale}`;
  return modelSlug
    ? `${prefix}/products/pumps/${VALVELESS_PUMP_CATEGORY_SLUG_ZH}/${modelSlug}/`
    : `${prefix}/products/pumps/${VALVELESS_PUMP_CATEGORY_SLUG_ZH}/`;
}

export function getValvelessPumpLanguageAlternates(modelSlug?: string) {
  return {
    "zh-CN": getValvelessPumpPath("zh", modelSlug),
    "en-US": getValvelessPumpPath("en", modelSlug),
    es: getValvelessPumpPath("es", modelSlug),
    fr: getValvelessPumpPath("fr", modelSlug),
    ko: getValvelessPumpPath("ko", modelSlug),
    ru: getValvelessPumpPath("ru", modelSlug),
    "x-default": getValvelessPumpPath("zh", modelSlug),
  };
}
