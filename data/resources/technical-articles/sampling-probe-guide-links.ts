import { samplingProbeSelectionSlug, samplingProbeSectionIds } from "./technical-article-availability";
import type { TechnicalArticleLocale } from "./technical-articles.types";

export type SamplingProbeGuideLocale = TechnicalArticleLocale | "de";
type Section = (typeof samplingProbeSectionIds)[number];

export const samplingProbeApplicationSections = {
  "clinical-probes": "selection-inputs",
  "immunoassay-probes": "side-holes",
  "hematology-probes": "inner-diameter",
  "pipetting-probes": "effective-length",
} as const satisfies Record<string, Section>;

export type SamplingProbeApplication = keyof typeof samplingProbeApplicationSections;

export function isSamplingProbeApplication(slug: string): slug is SamplingProbeApplication {
  return Object.hasOwn(samplingProbeApplicationSections, slug);
}

export function getSamplingProbeGuideHref(locale: SamplingProbeGuideLocale, section?: Section) {
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  return `${prefix}/resources/technical-articles/${samplingProbeSelectionSlug}/${section ? `#${section}` : ""}`;
}
