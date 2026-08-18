import type {
  TechnicalArticleItem,
  TechnicalArticleLocale,
} from "./technical-articles.types";
import { brushlessWiringArticleEnCopy } from "./brushless-diaphragm-pump-2-wire-vs-5-wire.en";
import { brushlessWiringArticleEsCopy } from "./brushless-diaphragm-pump-2-wire-vs-5-wire.es";
import { brushlessWiringArticleFrCopy } from "./brushless-diaphragm-pump-2-wire-vs-5-wire.fr";
import { brushlessWiringArticleKoCopy } from "./brushless-diaphragm-pump-2-wire-vs-5-wire.ko";
import { brushlessWiringArticleRuCopy } from "./brushless-diaphragm-pump-2-wire-vs-5-wire.ru";
import type {
  BrushlessWiringArticleCopy,
  BrushlessWiringArticleCopyMap,
} from "./brushless-diaphragm-pump-2-wire-vs-5-wire.types";
import { brushlessWiringArticleZhCopy } from "./brushless-diaphragm-pump-2-wire-vs-5-wire.zh";

const BRUSHLESS_WIRING_ARTICLE_ID =
  "brushless-diaphragm-pump-2-wire-vs-5-wire";

export const brushlessWiringArticleSlug =
  "brushless-diaphragm-pump-2-wire-vs-5-wire";

export const brushlessWiringArticleImageBase =
  "/images/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire";

export const brushlessWiringArticleImages = {
  twoWire: `${brushlessWiringArticleImageBase}/dpl60-2-wire-brushless-motor.webp`,
  fiveWire: `${brushlessWiringArticleImageBase}/dpl60-5-wire-brushless-motor.webp`,
} as const;

const brushlessWiringArticleCopy: BrushlessWiringArticleCopyMap = {
  "zh-CN": brushlessWiringArticleZhCopy,
  en: brushlessWiringArticleEnCopy,
  es: brushlessWiringArticleEsCopy,
  fr: brushlessWiringArticleFrCopy,
  ko: brushlessWiringArticleKoCopy,
  ru: brushlessWiringArticleRuCopy,
};

export function getBrushlessWiringArticleCopy(
  locale: TechnicalArticleLocale,
): BrushlessWiringArticleCopy {
  return brushlessWiringArticleCopy[locale] ?? brushlessWiringArticleCopy.en;
}

export function getBrushlessWiringArticleFaq(
  locale: TechnicalArticleLocale,
) {
  return getBrushlessWiringArticleCopy(locale).faqItems;
}

export function getBrushlessWiringTechnicalArticle(
  locale: TechnicalArticleLocale,
): TechnicalArticleItem {
  const copy = getBrushlessWiringArticleCopy(locale);

  return {
    id: BRUSHLESS_WIRING_ARTICLE_ID,
    slug: brushlessWiringArticleSlug,
    relationKeys: [
      "series:dpl30",
      "series:dpl60",
      "series:dpl30h",
      "series:dpgl800",
    ],
    relationPriority: 96,
    category: "pumps-valves",
    title: copy.metadata.title,
    summary: copy.deck,
    date: "2026-08-18",
    coverImage: brushlessWiringArticleImages.twoWire,
    coverAlt: copy.metadata.coverAlt,
    content: [
      {
        title: copy.conclusion.title,
        content: copy.conclusion.text,
      },
    ],
    seoTitle: copy.metadata.seoTitle,
    seoDescription: copy.metadata.seoDescription,
  };
}
