import type {
  TechnicalArticleItem,
  TechnicalArticleLocale,
} from "./technical-articles.types";
import { dpl30hArticleEnCopy } from "./dpl30h-high-pressure-liquid-diaphragm-pump.en";
import { dpl30hArticleEsCopy } from "./dpl30h-high-pressure-liquid-diaphragm-pump.es";
import { dpl30hArticleFrCopy } from "./dpl30h-high-pressure-liquid-diaphragm-pump.fr";
import { dpl30hArticleKoCopy } from "./dpl30h-high-pressure-liquid-diaphragm-pump.ko";
import { dpl30hArticleRuCopy } from "./dpl30h-high-pressure-liquid-diaphragm-pump.ru";
import type {
  Dpl30hArticleCopy,
  Dpl30hArticleCopyMap,
} from "./dpl30h-high-pressure-liquid-diaphragm-pump.types";
import { dpl30hArticleZhCopy } from "./dpl30h-high-pressure-liquid-diaphragm-pump.zh";

export type { Dpl30hArticleCopy } from "./dpl30h-high-pressure-liquid-diaphragm-pump.types";

const DPL30H_ARTICLE_ID = "dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide";
export const dpl30hArticleSlug = "dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide";
const DPL30H_ARTICLE_COVER =
  "/images/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump/dpl30h-article-cover.webp";

export const dpl30hStandardModels = [
  { sku: "459007", model: "DPL30H-24DS-EP/PS" },
  { sku: "459008", model: "DPL30H-24BS-EP/PS" },
  { sku: "459019", model: "DPL30H-12DS-EP/PS" },
  { sku: "459020", model: "DPL30H-12BS-EP/PS" },
  { sku: "459034", model: "DPL30H-24DS-FF/PS" },
  { sku: "459035", model: "DPL30H-24BS-FF/PS" },
  { sku: "459036", model: "DPL30H-12DS-FF/PS" },
  { sku: "459037", model: "DPL30H-12BS-FF/PS" },
] as const;

const dpl30hArticleCopy: Dpl30hArticleCopyMap = {
  "zh-CN": dpl30hArticleZhCopy,
  en: dpl30hArticleEnCopy,
  es: dpl30hArticleEsCopy,
  fr: dpl30hArticleFrCopy,
  ko: dpl30hArticleKoCopy,
  ru: dpl30hArticleRuCopy,
};

export function getDpl30hArticleCopy(
  locale: TechnicalArticleLocale,
): Dpl30hArticleCopy {
  return dpl30hArticleCopy[locale] ?? dpl30hArticleCopy.en;
}

export function getDpl30hArticleSummary(locale: TechnicalArticleLocale): string {
  return getDpl30hArticleCopy(locale).section1.paragraphs[0]?.trim() ?? "";
}

export function getDpl30hTechnicalArticle(
  locale: TechnicalArticleLocale,
): TechnicalArticleItem {
  const copy = getDpl30hArticleCopy(locale);

  return {
    id: DPL30H_ARTICLE_ID,
    slug: dpl30hArticleSlug,
    relationKeys: ["series:dpl30h"],
    relationPriority: 100,
    category: "pumps-valves",
    title: copy.metadata.title,
    summary: getDpl30hArticleSummary(locale),
    date: "2026-08-18",
    coverImage: DPL30H_ARTICLE_COVER,
    coverAlt: copy.metadata.coverAlt,
    content: [
      { title: copy.section1.title, content: getDpl30hArticleSummary(locale) },
    ],
    seoTitle: copy.metadata.seoTitle,
    seoDescription: copy.metadata.seoDescription,
  };
}
