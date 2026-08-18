import type {
  TechnicalArticleItem,
  TechnicalArticleLocale,
} from "./technical-articles.types";
import { dpgl800ArticleEnCopy } from "./dpgl800-gas-liquid-diaphragm-pump.en";
import { dpgl800ArticleEsCopy } from "./dpgl800-gas-liquid-diaphragm-pump.es";
import { dpgl800ArticleFrCopy } from "./dpgl800-gas-liquid-diaphragm-pump.fr";
import { dpgl800ArticleKoCopy } from "./dpgl800-gas-liquid-diaphragm-pump.ko";
import { dpgl800ArticleRuCopy } from "./dpgl800-gas-liquid-diaphragm-pump.ru";
import type {
  Dpgl800ArticleCopy,
  Dpgl800ArticleCopyMap,
} from "./dpgl800-gas-liquid-diaphragm-pump.types";
import { dpgl800ArticleZhCopy } from "./dpgl800-gas-liquid-diaphragm-pump.zh";

export type { Dpgl800ArticleCopy } from "./dpgl800-gas-liquid-diaphragm-pump.types";

const DPGL800_ARTICLE_ID = "dpgl800-gas-liquid-diaphragm-pump-selection-guide";
export const dpgl800ArticleSlug = "dpgl800-gas-liquid-diaphragm-pump-selection-guide";
const DPGL800_ARTICLE_COVER =
  "/images/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump/dpgl800-article-cover.webp";

export const dpgl800StandardModels = [
  { sku: "459039", model: "DPGL800-24BS6-EP/PS" },
  { sku: "459040", model: "DPGL800-24BS6-FF/PS" },
  { sku: "459041", model: "DPGL800-24BSC-EP/PS" },
] as const;

const dpgl800ArticleCopy: Dpgl800ArticleCopyMap = {
  "zh-CN": dpgl800ArticleZhCopy,
  en: dpgl800ArticleEnCopy,
  es: dpgl800ArticleEsCopy,
  fr: dpgl800ArticleFrCopy,
  ko: dpgl800ArticleKoCopy,
  ru: dpgl800ArticleRuCopy,
};

export function getDpgl800ArticleCopy(
  locale: TechnicalArticleLocale,
): Dpgl800ArticleCopy {
  return dpgl800ArticleCopy[locale] ?? dpgl800ArticleCopy.en;
}

export function getDpgl800ArticleSummary(
  locale: TechnicalArticleLocale,
): string {
  return getDpgl800ArticleCopy(locale).section1.paragraphs[0]?.trim() ?? "";
}

export function getDpgl800TechnicalArticle(
  locale: TechnicalArticleLocale,
): TechnicalArticleItem {
  const articleCopy = getDpgl800ArticleCopy(locale);

  return {
    id: DPGL800_ARTICLE_ID,
    slug: dpgl800ArticleSlug,
    relationKeys: ["series:dpgl800"],
    relationPriority: 100,
    category: "pumps-valves",
    title: articleCopy.metadata.title,
    summary: getDpgl800ArticleSummary(locale),
    date: "2026-08-18",
    coverImage: DPGL800_ARTICLE_COVER,
    coverAlt: articleCopy.metadata.coverAlt,
    content: [
      {
        title: articleCopy.section1.title,
        content: getDpgl800ArticleSummary(locale),
      },
    ],
    seoTitle: articleCopy.metadata.seoTitle,
    seoDescription: articleCopy.metadata.seoDescription,
  };
}
