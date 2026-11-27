import orientable from "./thread-to-barbed-orientable-selection.hi.json";
import standard from "./thread-to-barbed-remaining-selection.hi.json";
import { hindiBarbedSelectionText } from "./barbed-fitting-selection.hi";
import { fittingDetailText } from "./fitting-detail-copy.intl";

const copy: Readonly<Record<string, string>> = { ...orientable, ...standard };

export function hindiThreadToBarbedSelectionText(value: string) {
  const english = fittingDetailText(value, "en");
  return copy[english] ?? hindiBarbedSelectionText(english);
}
