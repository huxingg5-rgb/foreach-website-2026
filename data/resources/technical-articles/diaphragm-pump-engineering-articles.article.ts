import type {
  TechnicalArticleItem,
  TechnicalArticleLocale,
} from "./technical-articles.types";
import type {
  DiaphragmPumpEngineeringArticleCopy,
  DiaphragmPumpEngineeringArticleSlug,
} from "./diaphragm-pump-engineering-article.types";
import { diaphragmPumpFlowPressureCurveZhCopy } from "./diaphragm-pump-flow-pressure-curve.zh";
import { microDiaphragmPumpContinuousDutyLifeZhCopy } from "./micro-diaphragm-pump-continuous-duty-life.zh";
import { diaphragmPumpFlowPressureCurveEnCopy } from "./diaphragm-pump-flow-pressure-curve.en";
import { microDiaphragmPumpContinuousDutyLifeEnCopy } from "./micro-diaphragm-pump-continuous-duty-life.en";
import {
  diaphragmPumpFlowPressureCurveEsCopy,
  microDiaphragmPumpContinuousDutyLifeEsCopy,
} from "./diaphragm-pump-engineering-articles.es";
import {
  diaphragmPumpFlowPressureCurveFrCopy,
  microDiaphragmPumpContinuousDutyLifeFrCopy,
} from "./diaphragm-pump-engineering-articles.fr";
import {
  diaphragmPumpFlowPressureCurveKoCopy,
  microDiaphragmPumpContinuousDutyLifeKoCopy,
} from "./diaphragm-pump-engineering-articles.ko";
import {
  diaphragmPumpFlowPressureCurveRuCopy,
  microDiaphragmPumpContinuousDutyLifeRuCopy,
} from "./diaphragm-pump-engineering-articles.ru";

export const diaphragmPumpFlowPressureCurveSlug =
  "diaphragm-pump-flow-pressure-curve-guide" as const;
export const microDiaphragmPumpContinuousDutyLifeSlug =
  "micro-diaphragm-pump-continuous-duty-life" as const;

const copyByLocale: Record<
  TechnicalArticleLocale,
  Record<
    DiaphragmPumpEngineeringArticleSlug,
    DiaphragmPumpEngineeringArticleCopy
  >
> = {
  "zh-CN": {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveZhCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeZhCopy,
  },
  en: {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveEnCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeEnCopy,
  },
  es: {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveEsCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeEsCopy,
  },
  fr: {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveFrCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeFrCopy,
  },
  ko: {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveKoCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeKoCopy,
  },
  ru: {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveRuCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeRuCopy,
  },
};

export function isDiaphragmPumpEngineeringArticleSlug(
  slug: string,
): slug is DiaphragmPumpEngineeringArticleSlug {
  return Object.prototype.hasOwnProperty.call(copyByLocale.en, slug);
}

export function getDiaphragmPumpEngineeringArticleCopy(
  slug: DiaphragmPumpEngineeringArticleSlug,
  locale: TechnicalArticleLocale,
) {
  return (copyByLocale[locale] ?? copyByLocale.en)[slug];
}

export function getDiaphragmPumpEngineeringArticleFaq(
  slug: string,
  locale: TechnicalArticleLocale,
) {
  if (!isDiaphragmPumpEngineeringArticleSlug(slug)) {
    return [];
  }

  return getDiaphragmPumpEngineeringArticleCopy(slug, locale).faqItems;
}

function createTechnicalArticle(
  slug: DiaphragmPumpEngineeringArticleSlug,
  locale: TechnicalArticleLocale,
  relationKeys: string[],
  relationPriority: number,
): TechnicalArticleItem {
  const copy = getDiaphragmPumpEngineeringArticleCopy(slug, locale);

  return {
    id: slug,
    slug,
    relationKeys,
    relationPriority,
    category: "pumps-valves",
    title: copy.metadata.title,
    summary: copy.deck,
    date: "2026-08-24",
    coverImage: copy.metadata.coverImage,
    coverAlt: copy.metadata.coverAlt,
    content: [
      {
        title: copy.sections[0].title,
        content: copy.deck,
      },
    ],
    seoTitle: copy.metadata.seoTitle,
    seoDescription: copy.metadata.seoDescription,
  };
}

export function getDiaphragmPumpEngineeringArticles(
  locale: TechnicalArticleLocale,
): TechnicalArticleItem[] {
  return [
    createTechnicalArticle(
      diaphragmPumpFlowPressureCurveSlug,
      locale,
      ["series:dpl30", "series:dpl60", "series:dpl30h"],
      99,
    ),
    createTechnicalArticle(
      microDiaphragmPumpContinuousDutyLifeSlug,
      locale,
      ["series:dpl30", "series:dpl60"],
      98,
    ),
  ];
}
