import manifest from "./flat-bottom-fitting-cad-manifest.json";

export type FittingCadFinish = "peek" | "natural" | "black";

// Exact product allowlist: family + thread + tube OD must match before sharing
// geometry. Material/color affect the finish, never the model dimensions.
export function getFlatBottomFittingCadAssets(slug: string) {
  if (!Object.hasOwn(manifest.products, slug)) return undefined;
  const product = manifest.products[slug as keyof typeof manifest.products];
  const geometry = manifest.geometries[product.viewerId as keyof typeof manifest.geometries];
  return {
    model: product.model,
    viewerId: product.viewerId,
    fittingFinish: product.finish as FittingCadFinish,
    model3dUrl: geometry.model3dUrl,
  };
}
