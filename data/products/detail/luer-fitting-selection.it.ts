import strings from "./luer-fitting-selection.it.json";
import { fittingDetailText } from "./fitting-detail-copy.intl";
import { italianProductDetailText } from "./product-detail.it";

const selection: Readonly<Record<string, string>> = strings;

export function italianLuerSelectionText(text: string): string {
  const english = fittingDetailText(text, "en");
  return selection[english] ?? italianProductDetailText(english);
}
