import type {
  TechnicalArticleItem,
  TechnicalArticleLocale,
} from "./technical-articles.types";
import { dpl30ArticleEnCopy } from "./dpl30-liquid-diaphragm-pump.en";
import { dpl30ArticleEsCopy } from "./dpl30-liquid-diaphragm-pump.es";
import { dpl30ArticleFrCopy } from "./dpl30-liquid-diaphragm-pump.fr";
import { dpl30ArticleKoCopy } from "./dpl30-liquid-diaphragm-pump.ko";
import { dpl30ArticleRuCopy } from "./dpl30-liquid-diaphragm-pump.ru";
import {
  type Dpl30ArticleCopy,
  type Dpl30ArticleCopyMap,
} from "./dpl30-liquid-diaphragm-pump.types";
import { dpl30ArticleZhCopy } from "./dpl30-liquid-diaphragm-pump.zh";

export type {
  Dpl30ArticleCopy,
  Dpl30SpecificationRow,
  Dpl30ThreeColumnRow,
  Dpl30TwoColumnRow,
} from "./dpl30-liquid-diaphragm-pump.types";

const DPL30_ARTICLE_ID =
  "dpl30-liquid-diaphragm-pump-selection-guide";
export const dpl30ArticleSlug =
  "dpl30-liquid-diaphragm-pump-selection-guide";
const DPL30_ARTICLE_COVER =
  "/images/resources/technical-articles/dpl30-liquid-diaphragm-pump/dpl30-article-cover.webp";

const dpl30ArticleCopy: Dpl30ArticleCopyMap = {
  "zh-CN": dpl30ArticleZhCopy,
  en: dpl30ArticleEnCopy,
  es: dpl30ArticleEsCopy,
  fr: dpl30ArticleFrCopy,
  ko: dpl30ArticleKoCopy,
  ru: dpl30ArticleRuCopy,
};

export function getDpl30ArticleCopy(
  locale: TechnicalArticleLocale,
): Dpl30ArticleCopy {
  return dpl30ArticleCopy[locale] ?? dpl30ArticleCopy.en;
}

/**
 * Related cards automatically use the first non-empty paragraph from the
 * localized article body. No separate summary copy is maintained.
 */
export function getDpl30ArticleSummary(
  locale: TechnicalArticleLocale,
): string {
  const articleCopy = getDpl30ArticleCopy(locale);

  return (
    articleCopy.section1.paragraphs.find(
      (paragraph) => paragraph.trim().length > 0,
    )?.trim() ?? ""
  );
}

export function getDpl30TechnicalArticle(
  locale: TechnicalArticleLocale,
): TechnicalArticleItem {
  const articleCopy = getDpl30ArticleCopy(locale);

  return {
    id: DPL30_ARTICLE_ID,
    slug: dpl30ArticleSlug,
    relationKeys: ["series:dpl30"],
    category: "pumps-valves",
    title: articleCopy.metadata.title,
    summary: getDpl30ArticleSummary(locale),
    date: "2026-08-04",
    coverImage: DPL30_ARTICLE_COVER,
    content: [
      {
        title: articleCopy.section1.title,
        content: getDpl30ArticleSummary(locale),
      },
    ],
    seoTitle: articleCopy.metadata.seoTitle,
    seoDescription: articleCopy.metadata.seoDescription,
  };
}
