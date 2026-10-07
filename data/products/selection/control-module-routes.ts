const ABD_DATA_SLUG = "abd-air-bubble-detector";
const LOCALES = ["zh", "en", "es", "fr", "ko", "ru"] as const;

/** Keep product identity stable while exposing the category and model URL. */
export function getControlModuleDataSlug(slug: string) {
  return slug === "abd" ? ABD_DATA_SLUG : slug;
}

export function getControlModuleRouteSlug(slug: string) {
  return getControlModuleDataSlug(slug) === ABD_DATA_SLUG ? "abd" : slug;
}

export function getControlModulePath(slug: string, locale = "zh") {
  const prefix = ["zh", "zh-CN", ""].includes(locale) ? "" : `/${locale}`;
  const modelPath = getControlModuleDataSlug(slug) === ABD_DATA_SLUG
    ? "air-bubble-detectors/abd" : getControlModuleRouteSlug(slug);
  return `${prefix}/products/control/${modelPath}/`;
}

/** Resolve supported detail paths without accepting a model under the wrong category. */
export function getControlModuleDetailSlugFromSegments(segments: string[]) {
  if (segments.join("/") === "control/air-bubble-detectors/abd") return ABD_DATA_SLUG;
  if (segments.length === 2 && segments[0] === "control" && segments[1] === "pdm5-pressure-sensor") {
    return segments[1];
  }
  return undefined;
}

export function migrateControlModuleSegments(segments: string[]) {
  return segments.length === 2 && segments[0] === "control" && getControlModuleDataSlug(segments[1]) === ABD_DATA_SLUG
    ? ["control", "air-bubble-detectors", "abd"]
    : segments;
}

export function normalizeControlModulePath(href: string) {
  return href.replace(
    /^(\/(?:en\/|es\/|fr\/|ko\/|ru\/)?products\/control\/)(?:abd-air-bubble-detector|abd)\/?([?#].*)?$/,
    "$1air-bubble-detectors/abd/$2",
  );
}

export function getControlModuleLanguageAlternates(slug: string) {
  return {
    "zh-CN": getControlModulePath(slug),
    "en-US": getControlModulePath(slug, "en"),
    es: getControlModulePath(slug, "es"),
    fr: getControlModulePath(slug, "fr"),
    ko: getControlModulePath(slug, "ko"),
    ru: getControlModulePath(slug, "ru"),
    "x-default": getControlModulePath(slug),
  };
}

export function getControlModuleRedirectEntries() {
  return LOCALES.flatMap((locale) => [ABD_DATA_SLUG, "abd"].map((slug) => ({
    source: `${locale === "zh" ? "" : `/${locale}`}/products/control/${slug}`,
    destination: getControlModulePath(ABD_DATA_SLUG, locale),
    statusCode: 301 as const,
  })));
}
