// All category locales share one slug. Existing model and asset URLs stay put.
export const VALVELESS_PUMP_CATEGORY_SLUG_ZH = "valveless-metering-pump";
export const VALVELESS_PUMP_CATEGORY_SLUG_INTL = VALVELESS_PUMP_CATEGORY_SLUG_ZH;
export const VALVELESS_PUMP_LEGACY_CATEGORY_SLUG = "valveless-pumps";
export const VALVELESS_PUMP_CATEGORY_LABEL_ZH = "无阀计量泵";

/** Map an unprefixed category pathname, never a model or asset pathname. */
export function localizeValvelessPumpCategoryPath(pathname: string, _locale: string) {
  const path = pathname.replace(/\/+$/, "");
  const categoryPrefix = "/products/pumps/";
  if (
    path !== `${categoryPrefix}${VALVELESS_PUMP_CATEGORY_SLUG_ZH}` &&
    path !== `${categoryPrefix}${VALVELESS_PUMP_LEGACY_CATEGORY_SLUG}`
  ) {
    return pathname;
  }

  return `${categoryPrefix}${VALVELESS_PUMP_CATEGORY_SLUG_ZH}${pathname.endsWith("/") ? "/" : ""}`;
}

export function getValvelessPumpPath(locale: string, modelSlug?: string) {
  const prefix = locale === "zh" || locale === "zh-CN" ? "" : `/${locale}`;
  return modelSlug
    ? `${prefix}/products/pumps/${VALVELESS_PUMP_LEGACY_CATEGORY_SLUG}/${modelSlug}/`
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
