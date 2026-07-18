import { selectionProducts } from "../../data/products/selection/product-selection.generated";
import { diaphragmPumpSelectionProducts } from "../../data/products/selection/diaphragm-pump-selection.generated";
import { pipettingPumpSelectionProducts } from "../../data/products/selection/pipetting-pump-selection.generated";
import { valvelessPumpSelectionProducts } from "../../data/products/selection/valveless-pump-selection.generated";
import { valveSelectionProducts } from "../../data/products/selection/valve-selection.generated";
import { probeSelectionProducts } from "../../data/products/selection/probe-selection.generated";
import { tubingSelectionProducts } from "../../data/products/selection/tubing-selection.generated";
import { hardTubeFittingSelectionProducts } from "../../data/products/selection/hard-tube-fitting-selection.generated";
import { barbedFittingSelectionProducts } from "../../data/products/selection/barbed-fitting-selection.generated";
import { quickConnectFittingSelectionProducts } from "../../data/products/selection/quick-connect-fitting-selection.generated";
import { threadToBarbedFittingSelectionProducts } from "../../data/products/selection/thread-to-barbed-fitting-selection.generated";
import { luerFittingSelectionProducts } from "../../data/products/selection/luer-fitting-selection.generated";
import { bulkheadBarbedFittingSelectionProducts } from "../../data/products/selection/bulkhead-barbed-fitting-selection.generated";
import { femaleThreadAdapterSelectionProducts } from "../../data/products/selection/female-thread-adapter-selection.generated";
import { filterCheckValveSelectionProducts } from "../../data/products/selection/filter-check-valve-selection.generated";
import { syringePumpSelectionProducts } from "../../data/products/selection/syringe-pump-selection.generated";
import { controlModuleSelectionProducts } from "../../data/products/selection/control-module-selection.generated";
import { localizeProductCardSubtitle } from "../../data/products/selection/card-copy/product-card-copy.intl";

const products = [
  ...selectionProducts,
  ...diaphragmPumpSelectionProducts,
  ...pipettingPumpSelectionProducts,
  ...valvelessPumpSelectionProducts,
  ...valveSelectionProducts,
  ...probeSelectionProducts,
  ...tubingSelectionProducts,
  ...hardTubeFittingSelectionProducts,
  ...barbedFittingSelectionProducts,
  ...quickConnectFittingSelectionProducts,
  ...threadToBarbedFittingSelectionProducts,
  ...luerFittingSelectionProducts,
  ...bulkheadBarbedFittingSelectionProducts,
  ...femaleThreadAdapterSelectionProducts,
  ...filterCheckValveSelectionProducts,
  ...syringePumpSelectionProducts,
  ...controlModuleSelectionProducts,
] as any[];

const englishPattern = /\b(?:Fitting|Adapter|Filter|Valve|Material|Housing|Male|Female|Straight|Elbow|Thread|Service|life|motor|Working|temperature|range|Fits|body|Natural|White|Black|Flow|Path|Diameter|Panel|Mount|For)\b/i;

for (const locale of ["es", "fr", "ko", "ru"] as const) {
  const remaining = products
    .map((product) => {
      const source = typeof product.cardSubtitle === "string"
        ? product.cardSubtitle
        : product.cardSubtitle?.[locale] || product.cardSubtitle?.en || product.cardSubtitle?.zh || "";
      return {
        productId: product.productId,
        subtitle: localizeProductCardSubtitle(product, locale, source),
      };
    })
    .filter((item) => englishPattern.test(item.subtitle));

  console.log(`${locale}: ${remaining.length}`);
  console.log(remaining.slice(0, 30));
}
