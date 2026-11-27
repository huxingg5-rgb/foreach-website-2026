import copy from "./compact-fitting-selection.hi.json";
import { hindiThreadToBarbedSelectionText } from "./thread-to-barbed-selection.hi";
import { fittingDetailText } from "./fitting-detail-copy.intl";

const selectionCopy: Readonly<Record<string, string>> = copy;

export function hindiCompactFittingSelectionText(value: string) {
  const english = fittingDetailText(value, "en");
  return selectionCopy[english] ?? hindiThreadToBarbedSelectionText(english);
}
