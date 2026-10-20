import { FITTING_PUBLISHED_PRODUCTS } from "./fitting-publication.generated";
import { isHardTubeGuideModel } from "@/data/resources/technical-articles/hard-tube-fittings-related-products";

const supportedTypes = new Set([
  "barbed-fittings",
  "bulkhead-barbed-fittings",
  "thread-to-barbed-fittings",
  "quick-connect-fittings",
  "hard-tube-fittings",
  "luer-fittings",
  "female-thread-adapters",
]);

function modelSeries(model: string) {
  return (model.match(/^Q(?:20|40|60)/i)?.[0] ?? model.split("-")[0]).toLowerCase();
}

/** Category pages collect their published series; model pages keep exact-series videos. */
export function getFittingResourceRelationKeys(productTypeId: string, model?: string): string[] {
  if (["pvc-tubing", "tpu-tubing"].includes(productTypeId)) {
    return [`category:${productTypeId}`];
  }
  if (!supportedTypes.has(productTypeId)) return [];

  const keys: string[] = [];
  if (productTypeId === "hard-tube-fittings") {
    // High-pressure fittings need material guidance, not flanged/ferrule assembly instructions.
    keys.push("topic:fitting-materials");
    if (!model || isHardTubeGuideModel(model)) keys.push("category:hard-tube-fittings");
  } else {
    keys.push(`category:${productTypeId}`);
  }
  // A bulkhead barb still uses the same soft-tubing fit and material-selection principles.
  if (productTypeId === "bulkhead-barbed-fittings") keys.push("category:barbed-fittings");

  const models = model ? [model] : FITTING_PUBLISHED_PRODUCTS
    .filter(product => product.productTypeId === productTypeId)
    .map(product => product.foreachModel);
  return [...new Set([...keys, ...models.map(item => `series:${modelSeries(item)}`)])];
}
