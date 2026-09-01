import type {
  TechnicalArticleItem,
  TechnicalArticleLocale,
} from "./technical-articles.types";
import { dpl60ArticleEnCopy } from "./dpl60-liquid-diaphragm-pump.en";
import { dpl60ArticleEsCopy } from "./dpl60-liquid-diaphragm-pump.es";
import { dpl60ArticleFaqCopy } from "./dpl60-liquid-diaphragm-pump.faq";
import { dpl60ArticleFrCopy } from "./dpl60-liquid-diaphragm-pump.fr";
import { dpl60ArticleKoCopy } from "./dpl60-liquid-diaphragm-pump.ko";
import { dpl60ArticleRuCopy } from "./dpl60-liquid-diaphragm-pump.ru";
import type {
  Dpl60ArticleCopy,
  Dpl60ArticleCopyMap,
} from "./dpl60-liquid-diaphragm-pump.types";
import { dpl60ArticleZhCopy } from "./dpl60-liquid-diaphragm-pump.zh";

export type {
  Dpl60ArticleCopy,
  Dpl60StandardModelRow,
} from "./dpl60-liquid-diaphragm-pump.types";

const DPL60_ARTICLE_ID =
  "dpl60-liquid-diaphragm-pump-selection-guide";
export const dpl60ArticleSlug =
  "dpl60-liquid-diaphragm-pump-selection-guide";
const DPL60_ARTICLE_COVER =
  "/images/resources/technical-articles/dpl60-liquid-diaphragm-pump/dpl60-article-cover.webp";

export const dpl60StandardModels = [
  { sku: "459003", model: "DPL60-24DB-EP/PS" },
  { sku: "459004", model: "DPL60-24BB-EP/PS" },
  { sku: "459015", model: "DPL60-12DB-EP/PS" },
  { sku: "459016", model: "DPL60-12BB-EP/PS" },
  { sku: "459030", model: "DPL60-24DB-FF/PS" },
  { sku: "459031", model: "DPL60-24BB-FF/PS" },
  { sku: "459032", model: "DPL60-12DB-FF/PS" },
  { sku: "459033", model: "DPL60-12BB-FF/PS" },
] as const;

const dpl60ArticleCopy: Dpl60ArticleCopyMap = {
  "zh-CN": dpl60ArticleZhCopy,
  en: dpl60ArticleEnCopy,
  es: dpl60ArticleEsCopy,
  fr: dpl60ArticleFrCopy,
  ko: dpl60ArticleKoCopy,
  ru: dpl60ArticleRuCopy,
};

export function getDpl60ArticleCopy(
  locale: TechnicalArticleLocale,
): Dpl60ArticleCopy {
  return dpl60ArticleCopy[locale] ?? dpl60ArticleCopy.en;
}

export function getDpl60ArticleFaq(locale: TechnicalArticleLocale) {
  return getDpl60ArticleFaqCopy(locale).items;
}

export function getDpl60ArticleFaqCopy(locale: TechnicalArticleLocale) {
  return dpl60ArticleFaqCopy[locale] ?? dpl60ArticleFaqCopy.en;
}

export function getDpl60ArticleSummary(
  locale: TechnicalArticleLocale,
): string {
  return (
    getDpl60ArticleCopy(locale).section1.paragraphs.find(
      (paragraph) => paragraph.trim().length > 0,
    )?.trim() ?? ""
  );
}

export function getDpl60TechnicalArticle(
  locale: TechnicalArticleLocale,
): TechnicalArticleItem {
  const articleCopy = getDpl60ArticleCopy(locale);

  return {
    id: DPL60_ARTICLE_ID,
    slug: dpl60ArticleSlug,
    relationKeys: ["series:dpl60"],
    category: "pumps-valves",
    title: articleCopy.metadata.title,
    summary: getDpl60ArticleSummary(locale),
    date: "2026-07-13",
    coverImage: DPL60_ARTICLE_COVER,
    content: [
      {
        title: articleCopy.section1.title,
        content: getDpl60ArticleSummary(locale),
      },
    ],
    seoTitle: articleCopy.metadata.seoTitle,
    seoDescription: articleCopy.metadata.seoDescription,
  };
}
