import strings from "./luer-fitting-selection.hi.json";
import { fittingDetailText } from "./fitting-detail-copy.intl";
import { hindiProductDetailText } from "./product-detail.hi";

const selection: Readonly<Record<string, string>> = strings;

export function hindiLuerSelectionText(text: string): string {
  const english = fittingDetailText(text, "en");
  return selection[english] ?? hindiProductDetailText(english);
}
