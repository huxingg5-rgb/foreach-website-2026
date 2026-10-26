// Supplied external-release STEP models and original 2D PDFs.
// DRPL-0119 has separate source files; do not substitute DRPL-0109 assets.
const models: Record<string, string> = { "rpl-p4": "RPL-P4", "rpl-p635": "RPL-P6.35", "rpl-p15": "RPL-P15", "drpl-0109": "DRPL-0109" };
export function getValvelessPumpAssets(slug: string) {
  const model = models[slug];
  if (!model) return undefined;
  const base = `/models/products/pumps/valveless-pumps/${slug}`;
  return { model, viewerId: slug, model3dUrl: `${base}.fcad.gz`, drawingPdfUrl: `${base}-drawing.pdf` };
}
