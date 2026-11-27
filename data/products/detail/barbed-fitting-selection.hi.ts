import baCopy from "./barbed-ba-selection.hi.json";
import blCopy from "./barbed-bl-selection.hi.json";
import btCopy from "./barbed-bt-selection.hi.json";
import byCopy from "./barbed-by-selection.hi.json";
import bblCopy from "./barbed-bbl-selection.hi.json";
import { fittingDetailText } from "./fitting-detail-copy.intl";
import { hindiProductDetailText } from "./product-detail.hi";

const selectionCopy: Readonly<Record<string, string>> = { ...baCopy, ...blCopy, ...btCopy, ...byCopy, ...bblCopy };

export function hindiBarbedSelectionText(value: string) {
  const english = fittingDetailText(value, "en");
  return selectionCopy[english] ?? hindiProductDetailText(english);
}
