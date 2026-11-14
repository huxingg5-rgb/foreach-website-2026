import { normalizeDrawingTypes, type CadDrawingType } from "@/data/products/detail/drawing-requirements";
import {
  createEaPumpInquiryConfiguration, getEaInquiryProduct, getPistonInquirySeries, validateEaPumpInquiry,
  type EaPumpInquiryConfiguration, type EaPumpInquiryConfigurationV2,
} from "./ea-pump-inquiry";

export type EaPumpInquiryDraft = { configuration: EaPumpInquiryConfigurationV2; quantity: number; drawingTypes?: CadDrawingType[] };
const drafts = new Map<string, EaPumpInquiryDraft>();
const storageKey = (slug: string) => `foreach_ea_inquiry_draft_v2:${slug}`;

export function clearEaPumpInquiryDraft(slug: string) {
  drafts.delete(slug);
  try { window.sessionStorage.removeItem(storageKey(slug)); } catch { /* Memory was already cleared. */ }
}

/** Keep contact/application notes out of URLs. Memory also supports navigation when storage is blocked. */
export function saveEaPumpInquiryDraft(slug: string, configuration: EaPumpInquiryConfiguration, quantity: number, drawingTypes?: CadDrawingType[]) {
  const product = getEaInquiryProduct(slug);
  if (!product || getPistonInquirySeries(configuration.choice) !== product.series || validateEaPumpInquiry(configuration.choice, quantity)) return;
  const draft = { configuration: createEaPumpInquiryConfiguration(configuration.choice), quantity, drawingTypes: normalizeDrawingTypes(drawingTypes) };
  drafts.set(slug, draft);
  try { window.sessionStorage.setItem(storageKey(slug), JSON.stringify(draft)); } catch { /* Use this tab's in-memory draft. */ }
}

export function readEaPumpInquiryDraft(slug: string): EaPumpInquiryDraft | null {
  const product = getEaInquiryProduct(slug);
  if (!product) return null;
  try {
    const raw = window.sessionStorage.getItem(storageKey(slug));
    if (raw) {
      const draft = JSON.parse(raw);
      const config = draft?.configuration;
      if (config && [1, 2].includes(config.version) && config.choice && typeof config.choice === "object"
        && Object.values(config.choice).every(value => typeof value === "string")
        && (config.version === 1 || typeof config.choice.capacity === "string")
        && getPistonInquirySeries(config.choice) === product.series
        && !validateEaPumpInquiry(config.choice, draft.quantity)) {
        const restored = { configuration: createEaPumpInquiryConfiguration(config.choice), quantity: draft.quantity, drawingTypes: normalizeDrawingTypes(draft.drawingTypes) };
        drafts.set(slug, restored);
        return restored;
      }
    }
  } catch { /* Ignore an unavailable store or a damaged draft. */ }
  return drafts.get(slug) || null;
}
