import type { TechnicalArticleLocale } from "./technical-articles.types";

export const hardTubeFittingsSlug = "hard-tube-fittings-selection-guide";
export const flangedTubingAssembliesSlug = "flanged-tubing-assemblies-selection-guide";
export const ferruleFittingSlug = "what-is-a-ferrule-fitting";
export const compressionRingFittingSlug = "what-is-a-compression-ring-fitting";
export const luerFittingSlug = "what-is-a-luer-fitting";
export const barbedFittingSlug = "what-is-a-barbed-fitting";
export const quickDisconnectFittingSlug = "what-is-a-quick-disconnect-fitting";
export const threadedHoseBarbFittingsSlug = "threaded-hose-barb-fittings-selection-guide";
export const barbedFittingExpansionRatioSlug = "barbed-fitting-expansion-ratio";
export const fittingMaterialSelectionSlug = "fitting-material-selection-guide";
export const femaleThreadAdaptersSlug = "female-thread-adapters-selection-guide";
export const bulkheadBarbedFittingSlug = "what-is-a-bulkhead-barbed-fitting";

// Locale-limited articles share this small registry with the header so the
// language switcher never needs to ship article bodies to the browser.
const limitedLocales: Partial<Record<string, readonly TechnicalArticleLocale[]>> = {
};

export function isTechnicalArticleLocaleAvailable(slug: string, locale: TechnicalArticleLocale) {
  return limitedLocales[slug]?.includes(locale) ?? true;
}

export function getTechnicalArticleLanguagePath(pathWithoutLocale: string, locale: TechnicalArticleLocale) {
  const slug = pathWithoutLocale.match(/^\/resources\/technical-articles\/([^/]+)\/?$/)?.[1];
  return slug && !isTechnicalArticleLocaleAvailable(slug, locale)
    ? "/resources/technical-articles/"
    : pathWithoutLocale;
}
