import manifest from "./quick-connect-fitting-cad-manifest.json";
import { getQuickConnectFittingCadAssets } from "./quick-connect-fitting-cad-assets";
import { getFittingDrawingHref } from "./fitting-drawing-assets";

/** Exact-model PDFs from the reviewed FIT delivery, plus existing public Q20 files. */
const PUBLIC_Q20_DRAWING_MODELS = new Set([
  "Q2001-PMV-SACN",
  "Q2001-PMV-SPPE",
  "Q2001-PMX-SACN",
  "Q2001-PMX-SPPE",
  "Q2001-PNV-SACN",
  "Q2001-PNV-SPPE",
  "Q2001-PNX-SACE",
  "Q2001-PNX-SACN",
  "Q2001-PNX-SPPE",
  "Q2001-SMV-SACN",
  "Q2001-SMV-SPPE",
  "Q2001-SMX-SACN",
  "Q2001-SMX-SPPE",
  "Q2001-SNV-SACN",
  "Q2001-SNV-SPPE",
  "Q2001-SNX-SACN",
  "Q2001-SNX-SPPE",
  "Q2002-PMV-SACN",
  "Q2002-PMV-SPPE",
  "Q2002-PMX-SACE",
  "Q2002-PMX-SACN",
  "Q2002-PMX-SPPE",
  "Q2002-PNV-LACN",
  "Q2002-PNV-LPPE",
  "Q2002-PNV-SACN",
  "Q2002-PNV-SPPE",
  "Q2002-PNX-LACN",
  "Q2002-PNX-LPPE",
  "Q2002-PNX-SACE",
  "Q2002-PNX-SACN",
  "Q2002-PNX-SPPE",
]);

function normalizeModel(value: unknown) {
  return String(value || "").trim().toUpperCase();
}

/** Return a web-readable public PDF only when the exact model file exists. */
export function getQuickConnectDrawingHref(value: unknown): string | null {
  const model = normalizeModel(value);
  const shared = getFittingDrawingHref("quick-connect-fittings", model.toLowerCase());
  if (shared) return shared;
  const prepared = getQuickConnectFittingCadAssets(model.toLowerCase());
  if (prepared?.drawingPdfUrl) return prepared.drawingPdfUrl;
  const seriesMatch = model.match(/^Q(20|40|60)/);
  if (!seriesMatch) return null;

  if (seriesMatch[1] === "20" && PUBLIC_Q20_DRAWING_MODELS.has(model)) {
    return `/downloads/resources/selection-support/fitting-replacement/q20/drawings/${model}.pdf`;
  }

  return null;
}

export function hasQuickConnectDrawing(value: unknown) {
  return Boolean(getQuickConnectDrawingHref(value));
}

export function getQuickConnectDrawingModels() {
  return Array.from(new Set([...PUBLIC_Q20_DRAWING_MODELS, ...Object.values(manifest.products).map(product => product.model)]));
}
