import orientableSelection from "./thread-to-barbed-orientable-selection.it.json";
import otherSelection from "./thread-to-barbed-remaining-selection.it.json";
import { fittingDetailText } from "./fitting-detail-copy.intl";
import { italianProductDetailText } from "./product-detail.it";

const selectionCopy: Readonly<Record<string, string>> = { ...orientableSelection, ...otherSelection };

export function italianThreadToBarbedSelectionText(value: string) {
  const english = fittingDetailText(value, "en");
  return selectionCopy[english] ?? italianProductDetailText(english);
}
