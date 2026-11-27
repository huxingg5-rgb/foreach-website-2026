import first from "./quick-q20-selection.hi.json";
import q40 from "./quick-q40-selection.hi.json";
import q60 from "./quick-q60-selection.hi.json";
import remaining from "./quick-q20-remaining-selection.hi.json";
import { hindiFemaleAdapterSelectionText } from "./female-adapter-selection.hi";
import { fittingDetailText } from "./fitting-detail-copy.intl";

const copy: Readonly<Record<string, string>> = { ...first, ...remaining, ...q40, ...q60 };

export function hindiQuickConnectSelectionText(value: string) {
  const english = fittingDetailText(value, "en");
  return copy[english] ?? hindiFemaleAdapterSelectionText(english);
}
