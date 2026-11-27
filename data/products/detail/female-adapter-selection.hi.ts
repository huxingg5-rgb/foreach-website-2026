import copy from "./female-adapter-selection.hi.json";
import { hindiCompactFittingSelectionText } from "./compact-fitting-selection.hi";
import { fittingDetailText } from "./fitting-detail-copy.intl";

const selectionCopy: Readonly<Record<string, string>> = copy;

export function hindiFemaleAdapterSelectionText(value: string) {
  const english = fittingDetailText(value, "en");
  return selectionCopy[english] ?? hindiCompactFittingSelectionText(english);
}
