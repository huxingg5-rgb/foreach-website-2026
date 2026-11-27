import reviewedSelection from "./female-adapter-selection.it.json";
import { fittingDetailText } from "./fitting-detail-copy.intl";
import { italianProductDetailText } from "./product-detail.it";

const selectionCopy: Readonly<Record<string, string>> = reviewedSelection;

export function italianFemaleAdapterSelectionText(value: string) {
  const english = fittingDetailText(value, "en");
  return selectionCopy[english] ?? italianProductDetailText(english);
}
