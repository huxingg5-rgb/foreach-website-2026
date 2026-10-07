// Translated from the approved Chinese fittings copy, 2026-10-07.
// Existing product names remain primary; synonyms describe the same connection.
import copy from "./fitting-introductions.locales.json";
import type { SelectionLocale } from "./product-selection.types";

export type FittingIntroductionLocale = Exclude<SelectionLocale, "zh">;
export type LocalizedFittingIntroduction = {
  title: string;
  paragraphs: string[];
};

export const fittingIntroductionLocales: Record<
  FittingIntroductionLocale,
  Partial<Record<string, LocalizedFittingIntroduction>>
> = copy;

export function getLocalizedFittingIntroduction(
  locale: SelectionLocale,
  productTypeId = "fittings",
) {
  return locale === "zh"
    ? undefined
    : fittingIntroductionLocales[locale][productTypeId];
}
