import { getDiaphragmPumpEngineeringArticleCopy, isDiaphragmPumpEngineeringArticleSlug } from "@/data/resources/technical-articles/diaphragm-pump-engineering-articles.article";
import { germanBatchEngineeringArticleSlugs } from "@/data/resources/technical-articles/engineering-article-slugs.de";
import { getPumpApplicationArticleCopy } from "@/data/resources/technical-articles/pump-application-articles.article";
import waterVsReagent from "@/data/resources/technical-articles/engineering-locales/de/300-ml-min-micro-liquid-diaphragm-pump-water-vs-reagent.json";
import selfPrimingLoss from "@/data/resources/technical-articles/engineering-locales/de/300-ml-min-micro-liquid-diaphragm-pump-self-priming-loss.json";

type BatchSlug = (typeof germanBatchEngineeringArticleSlugs)[number];

const translations: Record<BatchSlug, Readonly<Record<string, string>>> = {
  "300-ml-min-micro-liquid-diaphragm-pump-water-vs-reagent": waterVsReagent,
  "300-ml-min-micro-liquid-diaphragm-pump-self-priming-loss": selfPrimingLoss,
};

export const engineeringArticleTranslationFields: ReadonlySet<string> = new Set([
  "title", "seoTitle", "seoDescription", "coverAlt", "deck", "text", "lead", "label",
  "note", "headers", "rows", "alt", "caption", "imageTitle", "detail", "tocLabel",
  "faqTitle", "faqTocLabel", "question", "answer", "items", "description",
  "contactLabel", "productsLabel", "prefix", "suffix",
]);

export function getEnglishEngineeringArticleSource(slug: string) {
  const applicationCopy = getPumpApplicationArticleCopy(slug, "en");
  if (applicationCopy) return { copy: applicationCopy, showSummary: false };
  if (!isDiaphragmPumpEngineeringArticleSlug(slug)) return null;
  return {
    copy: getDiaphragmPumpEngineeringArticleCopy(slug, "en"),
    showSummary: true,
  };
}

export function getGermanBatchEngineeringArticleCopy(slug: string) {
  const batchSlug = germanBatchEngineeringArticleSlugs.find((entry) => entry === slug);
  if (!batchSlug) return null;
  const source = getEnglishEngineeringArticleSource(slug);
  if (!source) return null;
  const dictionary = translations[batchSlug];
  let isComplete = true;
  function translate<T>(value: T, field: string): T {
    if (typeof value === "string" && value.trim() && engineeringArticleTranslationFields.has(field)) {
      if (!Object.hasOwn(dictionary, value) || !dictionary[value]?.trim()) {
        isComplete = false;
        return value;
      }
      return dictionary[value] as T;
    }
    if (Array.isArray(value)) return value.map((item) => translate(item, field)) as T;
    if (!value || typeof value !== "object") return value;
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translate(item, key)])) as T;
  }
  const copy = translate(source.copy, "");
  if (!isComplete) return null;
  return { ...source, copy };
}
