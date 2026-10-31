import { getSmtp2Variant } from "./smtp2-variant-content";

// Source identities are recorded in pipetting-pumps/cad/sources.json.
// Use the uncovered assemblies matching the existing product photographs.
export function getSmtp2CadAssets(slug: string) {
  const variant = getSmtp2Variant(slug);
  if (!variant) return undefined;
  return {
    model: variant.model,
    viewerId: variant.slug,
    model3dUrl: `/models/products/pumps/pipetting-pumps/cad/${variant.slug}.fcad.gz`,
  };
}
