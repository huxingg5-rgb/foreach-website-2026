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
import { lifeScienceInstrumentDpl60SelectionZhCopy } from "./life-science-instrument-dpl60-selection.zh";
import { brushedVsBrushlessDiaphragmPumpMotorLifeZhCopy } from "./brushed-vs-brushless-diaphragm-pump-motor-life.zh";
import { diaphragmPumpFlowPressureCurveEnCopy } from "./diaphragm-pump-flow-pressure-curve.en";
import { microDiaphragmPumpContinuousDutyLifeEnCopy } from "./micro-diaphragm-pump-continuous-duty-life.en";
import {
  brushedVsBrushlessDiaphragmPumpMotorLifeEnCopy,
  lifeScienceInstrumentDpl60SelectionEnCopy,
} from "./diaphragm-pump-new-articles.en";
import {
  diaphragmPumpFlowPressureCurveEsCopy,
  microDiaphragmPumpContinuousDutyLifeEsCopy,
} from "./diaphragm-pump-engineering-articles.es";
import {
  brushedVsBrushlessDiaphragmPumpMotorLifeEsCopy,
  lifeScienceInstrumentDpl60SelectionEsCopy,
} from "./diaphragm-pump-new-articles.es";
import {
  diaphragmPumpFlowPressureCurveFrCopy,
  microDiaphragmPumpContinuousDutyLifeFrCopy,
} from "./diaphragm-pump-engineering-articles.fr";
import {
  brushedVsBrushlessDiaphragmPumpMotorLifeFrCopy,
  lifeScienceInstrumentDpl60SelectionFrCopy,
} from "./diaphragm-pump-new-articles.fr";
import {
  diaphragmPumpFlowPressureCurveKoCopy,
  microDiaphragmPumpContinuousDutyLifeKoCopy,
} from "./diaphragm-pump-engineering-articles.ko";
import {
  brushedVsBrushlessDiaphragmPumpMotorLifeKoCopy,
  lifeScienceInstrumentDpl60SelectionKoCopy,
} from "./diaphragm-pump-new-articles.ko";
import {
  diaphragmPumpFlowPressureCurveRuCopy,
  microDiaphragmPumpContinuousDutyLifeRuCopy,
} from "./diaphragm-pump-engineering-articles.ru";
import {
  brushedVsBrushlessDiaphragmPumpMotorLifeRuCopy,
  lifeScienceInstrumentDpl60SelectionRuCopy,
} from "./diaphragm-pump-new-articles.ru";

export const diaphragmPumpFlowPressureCurveSlug =
  "diaphragm-pump-flow-pressure-curve-guide" as const;
export const microDiaphragmPumpContinuousDutyLifeSlug =
  "micro-diaphragm-pump-continuous-duty-life" as const;
export const lifeScienceInstrumentDpl60SelectionSlug =
  "life-science-dpl60-600ml-min-diaphragm-pump-selection-guide" as const;
export const brushedVsBrushlessDiaphragmPumpMotorLifeSlug =
  "brushed-vs-brushless-diaphragm-pump-3000h-10000h" as const;

const copyByLocale: Record<
  TechnicalArticleLocale,
  Partial<
    Record<
      DiaphragmPumpEngineeringArticleSlug,
      DiaphragmPumpEngineeringArticleCopy
    >
  >
> = {
  "zh-CN": {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveZhCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeZhCopy,
    [lifeScienceInstrumentDpl60SelectionSlug]:
      lifeScienceInstrumentDpl60SelectionZhCopy,
    [brushedVsBrushlessDiaphragmPumpMotorLifeSlug]:
      brushedVsBrushlessDiaphragmPumpMotorLifeZhCopy,
  },
  en: {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveEnCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeEnCopy,
    [lifeScienceInstrumentDpl60SelectionSlug]:
      lifeScienceInstrumentDpl60SelectionEnCopy,
    [brushedVsBrushlessDiaphragmPumpMotorLifeSlug]:
      brushedVsBrushlessDiaphragmPumpMotorLifeEnCopy,
  },
  es: {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveEsCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeEsCopy,
    [lifeScienceInstrumentDpl60SelectionSlug]:
      lifeScienceInstrumentDpl60SelectionEsCopy,
    [brushedVsBrushlessDiaphragmPumpMotorLifeSlug]:
      brushedVsBrushlessDiaphragmPumpMotorLifeEsCopy,
  },
  fr: {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveFrCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeFrCopy,
    [lifeScienceInstrumentDpl60SelectionSlug]:
      lifeScienceInstrumentDpl60SelectionFrCopy,
    [brushedVsBrushlessDiaphragmPumpMotorLifeSlug]:
      brushedVsBrushlessDiaphragmPumpMotorLifeFrCopy,
  },
  ko: {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveKoCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeKoCopy,
    [lifeScienceInstrumentDpl60SelectionSlug]:
      lifeScienceInstrumentDpl60SelectionKoCopy,
    [brushedVsBrushlessDiaphragmPumpMotorLifeSlug]:
      brushedVsBrushlessDiaphragmPumpMotorLifeKoCopy,
  },
  ru: {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveRuCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeRuCopy,
    [lifeScienceInstrumentDpl60SelectionSlug]:
      lifeScienceInstrumentDpl60SelectionRuCopy,
    [brushedVsBrushlessDiaphragmPumpMotorLifeSlug]:
      brushedVsBrushlessDiaphragmPumpMotorLifeRuCopy,
  },
};

export function isDiaphragmPumpEngineeringArticleSlug(
  slug: string,
): slug is DiaphragmPumpEngineeringArticleSlug {
  return Object.values(copyByLocale).some((localizedCopies) =>
    Object.prototype.hasOwnProperty.call(localizedCopies, slug),
  );
}

export function getDiaphragmPumpEngineeringArticleCopy(
  slug: DiaphragmPumpEngineeringArticleSlug,
  locale: TechnicalArticleLocale,
) {
  const copy = copyByLocale[locale]?.[slug];

  if (!copy) {
    throw new Error(`Missing ${locale} copy for technical article: ${slug}`);
  }

  return copy;
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
  date = "2026-08-24",
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
    date,
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
  const multilingualArticles = [
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

  return [
    createTechnicalArticle(
      brushedVsBrushlessDiaphragmPumpMotorLifeSlug,
      locale,
      ["series:dpl30", "series:dpl60"],
      101,
      "2026-08-25",
    ),
    createTechnicalArticle(
      lifeScienceInstrumentDpl60SelectionSlug,
      locale,
      ["series:dpl60", "application:life-science"],
      100,
      "2026-08-25",
    ),
    ...multilingualArticles,
  ];
}
