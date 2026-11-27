import { fittingDetailText } from "./fitting-detail-copy.intl";
import { hindiProductDetailText } from "./product-detail.hi";
import pressureTranslations from "./hard-tube-pressure-selection.hi.json";
import hnfTranslations from "./hard-tube-hnf-selection.hi.json";
import hnTranslations from "./hard-tube-hn-selection.hi.json";
import hfl6Translations from "./hard-tube-hfl6-selection.hi.json";
import hfTranslations from "./hard-tube-hf-selection.hi.json";
import translations from "./hard-tube-hfl-selection.hi.json";

const copy: Readonly<Record<string, string>> = { ...translations, ...hfTranslations, ...hfl6Translations, ...hnTranslations, ...hnfTranslations, ...pressureTranslations };
export function hindiHardTubeSelectionText(source: string): string {
  const english = fittingDetailText(source, "en");
  const trimmed = english.trim();
  return english.replace(trimmed, copy[trimmed] ?? hindiProductDetailText(trimmed));
}
