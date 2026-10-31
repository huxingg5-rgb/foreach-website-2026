import manifest from "./hard-tube-fitting-cad-manifest.json";
import type { FittingCadFinish } from "./flat-bottom-fitting-cad-assets";

// Exact catalog products share geometry only within the same family/thread/bore.
export function getHardTubeFittingCadAssets(slug: string) {
  if (!Object.hasOwn(manifest.products, slug)) return undefined;
  const product = manifest.products[slug as keyof typeof manifest.products];
  const geometry = manifest.geometries[product.viewerId as keyof typeof manifest.geometries];
  return {
    model: product.model,
    viewerId: product.viewerId,
    fittingProduct: slug,
    fittingFinish: product.finish as FittingCadFinish,
    model3dUrl: geometry.model3dUrl,
  };
}
