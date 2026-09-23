import { getProductDatasheet } from "@/data/products/detail/product-detail-resources";
import { getValvelessPumpPath } from "@/data/products/selection/valveless-pump-routes";
import type { TechnicalArticleLocale } from "./technical-articles.types";

// Reuse the product registry: the article must not maintain a second PDF path.
export function getRplSelectionSourceHrefs(locale: TechnicalArticleLocale) {
  const datasheet = getProductDatasheet("rpl-series-en");
  if (!datasheet) throw new Error("RPL selection article requires the registered RPL series datasheet.");
  return {
    product: getValvelessPumpPath(locale, "rpl-p4"),
    datasheet: datasheet.file,
  };
}
