import "server-only";
import { headers } from "next/headers";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import type { SamplingProbeGuideLocale } from "@/data/resources/technical-articles/sampling-probe-guide-links";

export async function getSamplingProbeGuideLocale(locale: TechnicalArticleLocale): Promise<SamplingProbeGuideLocale> {
  if (locale !== "en" || process.env.NODE_ENV !== "development") return locale;
  // The German preview rewrites untranslated pages to English and marks the request in its proxy.
  return (await headers()).get("x-foreach-draft-document-language") === "en" ? "de" : locale;
}
