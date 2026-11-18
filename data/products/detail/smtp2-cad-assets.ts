import { getSmtp2Variant } from "./smtp2-variant-content";

// Source identities are recorded in pipetting-pumps/cad/sources.json.
// Use the uncovered assemblies matching the existing product photographs.
export function getSmtp2CadAssets(slug: string, locale: string) {
  const variant = getSmtp2Variant(slug);
  if (!variant) return undefined;
  const drawingLocale = locale === "zh" || locale === "zh-CN" ? "zh-cn" : "en";
  return {
    model: variant.model,
    viewerId: variant.slug,
    model3dUrl: `/models/products/pumps/pipetting-pumps/cad/${variant.slug}.fcad.gz`,
    drawingPdfUrl: `/documents/products/pumps/pipetting-pumps/2d-drawings/${variant.slug}-${drawingLocale}.pdf`,
  };
}
