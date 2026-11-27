import baCopy from "./barbed-ba-selection.it.json";
import blCopy from "./barbed-bl-selection.it.json";
import btCopy from "./barbed-bt-selection.it.json";
import byCopy from "./barbed-by-selection.it.json";
import bblCopy from "./barbed-bbl-selection.it.json";
import { fittingDetailText } from "./fitting-detail-copy.intl";
import { italianProductDetailText } from "./product-detail.it";

const selectionCopy: Readonly<Record<string, string>> = { ...baCopy, ...blCopy, ...btCopy, ...byCopy, ...bblCopy };

export function italianBarbedSelectionText(value: string) {
  const english = fittingDetailText(value, "en");
  return selectionCopy[english] ?? italianProductDetailText(english);
}
