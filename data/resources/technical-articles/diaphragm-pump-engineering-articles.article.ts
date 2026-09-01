import type {
  TechnicalArticleCategory,
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
import {
  ivdWasteAspirationPumpSelectionZhCopy,
  labLiquidWasteAspirationTroubleshootingZhCopy,
} from "./application-troubleshooting-articles.zh";
import {
  ivdWasteAspirationPumpSelectionEnCopy,
  labLiquidWasteAspirationTroubleshootingEnCopy,
} from "./application-troubleshooting-articles.en";
import {
  ivdWasteAspirationPumpSelectionEsCopy,
  labLiquidWasteAspirationTroubleshootingEsCopy,
} from "./application-troubleshooting-articles.es";
import {
  ivdWasteAspirationPumpSelectionFrCopy,
  labLiquidWasteAspirationTroubleshootingFrCopy,
} from "./application-troubleshooting-articles.fr";
import {
  ivdWasteAspirationPumpSelectionKoCopy,
  labLiquidWasteAspirationTroubleshootingKoCopy,
} from "./application-troubleshooting-articles.ko";
import {
  ivdWasteAspirationPumpSelectionRuCopy,
  labLiquidWasteAspirationTroubleshootingRuCopy,
} from "./application-troubleshooting-articles.ru";
import {
  diaphragmPump300MlMinFlowMarginZhCopy,
  diaphragmPump300Vs600SelectionZhCopy,
} from "./diaphragm-pump-flow-pressure-series-01-02.zh";
import {
  suctionVsDischargeResistanceDiaphragmPumpZhCopy,
  tubeInnerDiameterAffectsDiaphragmPumpFlowZhCopy,
} from "./diaphragm-pump-flow-pressure-series-03-04.zh";
import {
  diaphragmPump100KpaVs600KpaSelectionZhCopy,
  diaphragmPumpPressureRatingTermsZhCopy,
  highBackpressureFluidPathPressureBudgetZhCopy,
} from "./diaphragm-pump-flow-pressure-series-05-07.zh";
import {
  diaphragmPump300MlMinFlowMarginEnCopy,
  diaphragmPump300Vs600SelectionEnCopy,
} from "./diaphragm-pump-flow-pressure-series-01-02.en";
import {
  suctionVsDischargeResistanceDiaphragmPumpEnCopy,
  tubeInnerDiameterAffectsDiaphragmPumpFlowEnCopy,
} from "./diaphragm-pump-flow-pressure-series-03-04.en";
import {
  diaphragmPump100KpaVs600KpaSelectionEnCopy,
  diaphragmPumpPressureRatingTermsEnCopy,
  highBackpressureFluidPathPressureBudgetEnCopy,
} from "./diaphragm-pump-flow-pressure-series-05-07.en";
import {
  diaphragmPump300MlMinFlowMarginEsCopy,
  diaphragmPump300Vs600SelectionEsCopy,
} from "./diaphragm-pump-flow-pressure-series-01-02.es";
import {
  suctionVsDischargeResistanceDiaphragmPumpEsCopy,
  tubeInnerDiameterAffectsDiaphragmPumpFlowEsCopy,
} from "./diaphragm-pump-flow-pressure-series-03-04.es";
import {
  diaphragmPump100KpaVs600KpaSelectionEsCopy,
  diaphragmPumpPressureRatingTermsEsCopy,
  highBackpressureFluidPathPressureBudgetEsCopy,
} from "./diaphragm-pump-flow-pressure-series-05-07.es";
import {
  diaphragmPump300MlMinFlowMarginFrCopy,
  diaphragmPump300Vs600SelectionFrCopy,
} from "./diaphragm-pump-flow-pressure-series-01-02.fr";
import {
  suctionVsDischargeResistanceDiaphragmPumpFrCopy,
  tubeInnerDiameterAffectsDiaphragmPumpFlowFrCopy,
} from "./diaphragm-pump-flow-pressure-series-03-04.fr";
import {
  diaphragmPump100KpaVs600KpaSelectionFrCopy,
  diaphragmPumpPressureRatingTermsFrCopy,
  highBackpressureFluidPathPressureBudgetFrCopy,
} from "./diaphragm-pump-flow-pressure-series-05-07.fr";
import {
  diaphragmPump300MlMinFlowMarginKoCopy,
  diaphragmPump300Vs600SelectionKoCopy,
} from "./diaphragm-pump-flow-pressure-series-01-02.ko";
import {
  suctionVsDischargeResistanceDiaphragmPumpKoCopy,
  tubeInnerDiameterAffectsDiaphragmPumpFlowKoCopy,
} from "./diaphragm-pump-flow-pressure-series-03-04.ko";
import {
  diaphragmPump100KpaVs600KpaSelectionKoCopy,
  diaphragmPumpPressureRatingTermsKoCopy,
  highBackpressureFluidPathPressureBudgetKoCopy,
} from "./diaphragm-pump-flow-pressure-series-05-07.ko";
import {
  diaphragmPump300MlMinFlowMarginRuCopy,
  diaphragmPump300Vs600SelectionRuCopy,
} from "./diaphragm-pump-flow-pressure-series-01-02.ru";
import {
  suctionVsDischargeResistanceDiaphragmPumpRuCopy,
  tubeInnerDiameterAffectsDiaphragmPumpFlowRuCopy,
} from "./diaphragm-pump-flow-pressure-series-03-04.ru";
import {
  diaphragmPump100KpaVs600KpaSelectionRuCopy,
  diaphragmPumpPressureRatingTermsRuCopy,
  highBackpressureFluidPathPressureBudgetRuCopy,
} from "./diaphragm-pump-flow-pressure-series-05-07.ru";
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
export const labLiquidWasteAspirationTroubleshootingSlug =
  "lab-liquid-waste-aspiration-troubleshooting" as const;
export const ivdWasteAspirationPumpSelectionSlug =
  "ivd-waste-aspiration-liquid-pump-vs-vacuum-pump" as const;
export const diaphragmPump300Vs600SelectionSlug =
  "300-vs-600-ml-min-diaphragm-pump-selection" as const;
export const diaphragmPump300MlMinFlowMarginSlug =
  "300-ml-min-diaphragm-pump-flow-margin" as const;
export const tubeInnerDiameterAffectsDiaphragmPumpFlowSlug =
  "tube-inner-diameter-affects-diaphragm-pump-flow" as const;
export const suctionVsDischargeResistanceDiaphragmPumpSlug =
  "suction-vs-discharge-resistance-diaphragm-pump" as const;
export const diaphragmPumpPressureRatingTermsSlug =
  "diaphragm-pump-pressure-rating-terms" as const;
export const diaphragmPump100KpaVs600KpaSelectionSlug =
  "100-kpa-vs-600-kpa-diaphragm-pump-selection" as const;
export const highBackpressureFluidPathPressureBudgetSlug =
  "high-backpressure-fluid-path-pressure-budget" as const;

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
    [labLiquidWasteAspirationTroubleshootingSlug]:
      labLiquidWasteAspirationTroubleshootingZhCopy,
    [ivdWasteAspirationPumpSelectionSlug]:
      ivdWasteAspirationPumpSelectionZhCopy,
    [diaphragmPump300Vs600SelectionSlug]:
      diaphragmPump300Vs600SelectionZhCopy,
    [diaphragmPump300MlMinFlowMarginSlug]:
      diaphragmPump300MlMinFlowMarginZhCopy,
    [tubeInnerDiameterAffectsDiaphragmPumpFlowSlug]:
      tubeInnerDiameterAffectsDiaphragmPumpFlowZhCopy,
    [suctionVsDischargeResistanceDiaphragmPumpSlug]:
      suctionVsDischargeResistanceDiaphragmPumpZhCopy,
    [diaphragmPumpPressureRatingTermsSlug]:
      diaphragmPumpPressureRatingTermsZhCopy,
    [diaphragmPump100KpaVs600KpaSelectionSlug]:
      diaphragmPump100KpaVs600KpaSelectionZhCopy,
    [highBackpressureFluidPathPressureBudgetSlug]:
      highBackpressureFluidPathPressureBudgetZhCopy,
  },
  en: {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveEnCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeEnCopy,
    [lifeScienceInstrumentDpl60SelectionSlug]:
      lifeScienceInstrumentDpl60SelectionEnCopy,
    [brushedVsBrushlessDiaphragmPumpMotorLifeSlug]:
      brushedVsBrushlessDiaphragmPumpMotorLifeEnCopy,
    [labLiquidWasteAspirationTroubleshootingSlug]:
      labLiquidWasteAspirationTroubleshootingEnCopy,
    [ivdWasteAspirationPumpSelectionSlug]:
      ivdWasteAspirationPumpSelectionEnCopy,
    [diaphragmPump300Vs600SelectionSlug]:
      diaphragmPump300Vs600SelectionEnCopy,
    [diaphragmPump300MlMinFlowMarginSlug]:
      diaphragmPump300MlMinFlowMarginEnCopy,
    [tubeInnerDiameterAffectsDiaphragmPumpFlowSlug]:
      tubeInnerDiameterAffectsDiaphragmPumpFlowEnCopy,
    [suctionVsDischargeResistanceDiaphragmPumpSlug]:
      suctionVsDischargeResistanceDiaphragmPumpEnCopy,
    [diaphragmPumpPressureRatingTermsSlug]:
      diaphragmPumpPressureRatingTermsEnCopy,
    [diaphragmPump100KpaVs600KpaSelectionSlug]:
      diaphragmPump100KpaVs600KpaSelectionEnCopy,
    [highBackpressureFluidPathPressureBudgetSlug]:
      highBackpressureFluidPathPressureBudgetEnCopy,
  },
  es: {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveEsCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeEsCopy,
    [lifeScienceInstrumentDpl60SelectionSlug]:
      lifeScienceInstrumentDpl60SelectionEsCopy,
    [brushedVsBrushlessDiaphragmPumpMotorLifeSlug]:
      brushedVsBrushlessDiaphragmPumpMotorLifeEsCopy,
    [labLiquidWasteAspirationTroubleshootingSlug]:
      labLiquidWasteAspirationTroubleshootingEsCopy,
    [ivdWasteAspirationPumpSelectionSlug]:
      ivdWasteAspirationPumpSelectionEsCopy,
    [diaphragmPump300Vs600SelectionSlug]:
      diaphragmPump300Vs600SelectionEsCopy,
    [diaphragmPump300MlMinFlowMarginSlug]:
      diaphragmPump300MlMinFlowMarginEsCopy,
    [tubeInnerDiameterAffectsDiaphragmPumpFlowSlug]:
      tubeInnerDiameterAffectsDiaphragmPumpFlowEsCopy,
    [suctionVsDischargeResistanceDiaphragmPumpSlug]:
      suctionVsDischargeResistanceDiaphragmPumpEsCopy,
    [diaphragmPumpPressureRatingTermsSlug]:
      diaphragmPumpPressureRatingTermsEsCopy,
    [diaphragmPump100KpaVs600KpaSelectionSlug]:
      diaphragmPump100KpaVs600KpaSelectionEsCopy,
    [highBackpressureFluidPathPressureBudgetSlug]:
      highBackpressureFluidPathPressureBudgetEsCopy,
  },
  fr: {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveFrCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeFrCopy,
    [lifeScienceInstrumentDpl60SelectionSlug]:
      lifeScienceInstrumentDpl60SelectionFrCopy,
    [brushedVsBrushlessDiaphragmPumpMotorLifeSlug]:
      brushedVsBrushlessDiaphragmPumpMotorLifeFrCopy,
    [labLiquidWasteAspirationTroubleshootingSlug]:
      labLiquidWasteAspirationTroubleshootingFrCopy,
    [ivdWasteAspirationPumpSelectionSlug]:
      ivdWasteAspirationPumpSelectionFrCopy,
    [diaphragmPump300Vs600SelectionSlug]:
      diaphragmPump300Vs600SelectionFrCopy,
    [diaphragmPump300MlMinFlowMarginSlug]:
      diaphragmPump300MlMinFlowMarginFrCopy,
    [tubeInnerDiameterAffectsDiaphragmPumpFlowSlug]:
      tubeInnerDiameterAffectsDiaphragmPumpFlowFrCopy,
    [suctionVsDischargeResistanceDiaphragmPumpSlug]:
      suctionVsDischargeResistanceDiaphragmPumpFrCopy,
    [diaphragmPumpPressureRatingTermsSlug]:
      diaphragmPumpPressureRatingTermsFrCopy,
    [diaphragmPump100KpaVs600KpaSelectionSlug]:
      diaphragmPump100KpaVs600KpaSelectionFrCopy,
    [highBackpressureFluidPathPressureBudgetSlug]:
      highBackpressureFluidPathPressureBudgetFrCopy,
  },
  ko: {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveKoCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeKoCopy,
    [lifeScienceInstrumentDpl60SelectionSlug]:
      lifeScienceInstrumentDpl60SelectionKoCopy,
    [brushedVsBrushlessDiaphragmPumpMotorLifeSlug]:
      brushedVsBrushlessDiaphragmPumpMotorLifeKoCopy,
    [labLiquidWasteAspirationTroubleshootingSlug]:
      labLiquidWasteAspirationTroubleshootingKoCopy,
    [ivdWasteAspirationPumpSelectionSlug]:
      ivdWasteAspirationPumpSelectionKoCopy,
    [diaphragmPump300Vs600SelectionSlug]:
      diaphragmPump300Vs600SelectionKoCopy,
    [diaphragmPump300MlMinFlowMarginSlug]:
      diaphragmPump300MlMinFlowMarginKoCopy,
    [tubeInnerDiameterAffectsDiaphragmPumpFlowSlug]:
      tubeInnerDiameterAffectsDiaphragmPumpFlowKoCopy,
    [suctionVsDischargeResistanceDiaphragmPumpSlug]:
      suctionVsDischargeResistanceDiaphragmPumpKoCopy,
    [diaphragmPumpPressureRatingTermsSlug]:
      diaphragmPumpPressureRatingTermsKoCopy,
    [diaphragmPump100KpaVs600KpaSelectionSlug]:
      diaphragmPump100KpaVs600KpaSelectionKoCopy,
    [highBackpressureFluidPathPressureBudgetSlug]:
      highBackpressureFluidPathPressureBudgetKoCopy,
  },
  ru: {
    [diaphragmPumpFlowPressureCurveSlug]: diaphragmPumpFlowPressureCurveRuCopy,
    [microDiaphragmPumpContinuousDutyLifeSlug]:
      microDiaphragmPumpContinuousDutyLifeRuCopy,
    [lifeScienceInstrumentDpl60SelectionSlug]:
      lifeScienceInstrumentDpl60SelectionRuCopy,
    [brushedVsBrushlessDiaphragmPumpMotorLifeSlug]:
      brushedVsBrushlessDiaphragmPumpMotorLifeRuCopy,
    [labLiquidWasteAspirationTroubleshootingSlug]:
      labLiquidWasteAspirationTroubleshootingRuCopy,
    [ivdWasteAspirationPumpSelectionSlug]:
      ivdWasteAspirationPumpSelectionRuCopy,
    [diaphragmPump300Vs600SelectionSlug]:
      diaphragmPump300Vs600SelectionRuCopy,
    [diaphragmPump300MlMinFlowMarginSlug]:
      diaphragmPump300MlMinFlowMarginRuCopy,
    [tubeInnerDiameterAffectsDiaphragmPumpFlowSlug]:
      tubeInnerDiameterAffectsDiaphragmPumpFlowRuCopy,
    [suctionVsDischargeResistanceDiaphragmPumpSlug]:
      suctionVsDischargeResistanceDiaphragmPumpRuCopy,
    [diaphragmPumpPressureRatingTermsSlug]:
      diaphragmPumpPressureRatingTermsRuCopy,
    [diaphragmPump100KpaVs600KpaSelectionSlug]:
      diaphragmPump100KpaVs600KpaSelectionRuCopy,
    [highBackpressureFluidPathPressureBudgetSlug]:
      highBackpressureFluidPathPressureBudgetRuCopy,
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
  category: TechnicalArticleCategory = "pumps-valves",
): TechnicalArticleItem {
  const copy = getDiaphragmPumpEngineeringArticleCopy(slug, locale);

  return {
    id: slug,
    slug,
    relationKeys,
    relationPriority,
    category,
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
  const flowPressureArticles = [
    createTechnicalArticle(
      diaphragmPump300Vs600SelectionSlug,
      locale,
      ["series:dpl30", "series:dpl60"],
      112,
      "2026-08-30",
    ),
    createTechnicalArticle(
      diaphragmPump300MlMinFlowMarginSlug,
      locale,
      ["series:dpl30"],
      111,
      "2026-08-27",
    ),
    createTechnicalArticle(
      tubeInnerDiameterAffectsDiaphragmPumpFlowSlug,
      locale,
      ["series:dpl30", "series:dpl60", "series:dpl30h"],
      110,
      "2026-08-24",
    ),
    createTechnicalArticle(
      suctionVsDischargeResistanceDiaphragmPumpSlug,
      locale,
      ["series:dpl30", "series:dpl60", "series:dpl30h"],
      109,
      "2026-08-21",
    ),
    createTechnicalArticle(
      diaphragmPumpPressureRatingTermsSlug,
      locale,
      ["series:dpl30", "series:dpl60", "series:dpl30h"],
      108,
      "2026-08-18",
    ),
    createTechnicalArticle(
      diaphragmPump100KpaVs600KpaSelectionSlug,
      locale,
      ["series:dpl30", "series:dpl60", "series:dpl30h"],
      107,
      "2026-08-15",
    ),
    createTechnicalArticle(
      highBackpressureFluidPathPressureBudgetSlug,
      locale,
      ["series:dpl30h"],
      106,
      "2026-08-12",
    ),
  ];

  const applicationArticles = [
    createTechnicalArticle(
      ivdWasteAspirationPumpSelectionSlug,
      locale,
      ["series:dpgl800"],
      104,
      "2026-08-09",
      "applications",
    ),
    createTechnicalArticle(
      labLiquidWasteAspirationTroubleshootingSlug,
      locale,
      ["series:dpgl800"],
      103,
      "2026-08-06",
      "applications",
    ),
  ];

  const multilingualArticles = [
    createTechnicalArticle(
      diaphragmPumpFlowPressureCurveSlug,
      locale,
      ["series:dpl30", "series:dpl60", "series:dpl30h"],
      99,
      "2026-07-28",
    ),
    createTechnicalArticle(
      microDiaphragmPumpContinuousDutyLifeSlug,
      locale,
      ["series:dpl30", "series:dpl60"],
      98,
      "2026-07-25",
    ),
  ];

  return [
    ...flowPressureArticles,
    ...applicationArticles,
    createTechnicalArticle(
      brushedVsBrushlessDiaphragmPumpMotorLifeSlug,
      locale,
      ["series:dpl30", "series:dpl60"],
      101,
      "2026-08-03",
    ),
    createTechnicalArticle(
      lifeScienceInstrumentDpl60SelectionSlug,
      locale,
      ["series:dpl60", "application:life-science"],
      100,
      "2026-07-31",
    ),
    ...multilingualArticles,
  ];
}
