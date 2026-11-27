import q2001Copy from "./quick-q20-selection.it.json";
import q20RemainingCopy from "./quick-q20-remaining-selection.it.json";
import q40Copy from "./quick-q40-selection.it.json";
import q60Copy from "./quick-q60-selection.it.json";
import { fittingDetailText } from "./fitting-detail-copy.intl";
import { italianProductDetailText } from "./product-detail.it";

const selectionCopy: Readonly<Record<string, string>> = { ...q2001Copy, ...q20RemainingCopy, ...q40Copy, ...q60Copy };

export function italianQuickConnectSelectionText(value: string) {
  const english = fittingDetailText(value, "en");
  return selectionCopy[english] ?? italianProductDetailText(english);
}
