import { normalizeDrawingTypes } from "@/data/products/detail/drawing-requirements";
import {
  createEaPumpInquiryConfiguration, eaPumpInquiryCartId, getEaInquiryProduct, getPistonInquirySeries, validateEaPumpInquiry,
} from "./ea-pump-inquiry";
import type { EaPumpInquiryDraft } from "./ea-pump-inquiry-draft";

export const EA_CONFIGURATION_BUTTONS_PILOT_SLUG = "ea-250-pmma";
export type SavedEaPumpConfiguration = EaPumpInquiryDraft & { id: string; number: number };
export type EaPumpConfigurationCollection = {
  version: 1;
  configurations: SavedEaPumpConfiguration[];
  activeId: string | null;
  nextNumber: number;
};

// Preserve the original EA-250 store; every other product gets its own collection.
const storageKey = (slug: string) => `foreach_ea_configurations_v1:${slug}`;
const memory = new Map<string, EaPumpConfigurationCollection>();
export const emptyEaPumpConfigurations = (): EaPumpConfigurationCollection => ({
  version: 1, configurations: [], activeId: null, nextNumber: 1,
});

export function saveEaPumpConfigurations(collection: EaPumpConfigurationCollection, slug = EA_CONFIGURATION_BUTTONS_PILOT_SLUG) {
  memory.set(slug, collection);
  try { window.sessionStorage.setItem(storageKey(slug), JSON.stringify(collection)); } catch { /* Keep this tab's in-memory copy. */ }
  return collection;
}

/** Editing keeps the number; adding always creates a separate saved configuration. */
export function upsertEaPumpConfiguration(collection: EaPumpConfigurationCollection, draft: EaPumpInquiryDraft, id: string | null) {
  if (validateEaPumpInquiry(draft.configuration.choice, draft.quantity)) return collection;
  const existing = collection.configurations.find(item => item.id === id);
  const number = existing?.number ?? collection.nextNumber;
  const saved: SavedEaPumpConfiguration = {
    id: existing?.id ?? `${getPistonInquirySeries(draft.configuration.choice).toLowerCase()}-config-${number}`, number, quantity: draft.quantity,
    configuration: createEaPumpInquiryConfiguration(draft.configuration.choice), drawingTypes: normalizeDrawingTypes(draft.drawingTypes),
  };
  return {
    ...collection,
    configurations: existing ? collection.configurations.map(item => item.id === id ? saved : item) : [...collection.configurations, saved],
    activeId: saved.id,
    nextNumber: existing ? collection.nextNumber : number + 1,
  };
}

export function removeEaPumpConfiguration(collection: EaPumpConfigurationCollection, id: string) {
  const index = collection.configurations.findIndex(item => item.id === id);
  const configurations = collection.configurations.filter(item => item.id !== id);
  return { ...collection, configurations,
    activeId: collection.activeId === id ? configurations[Math.max(0, index - 1)]?.id ?? null : collection.activeId };
}

export function readEaPumpConfigurations(incomingDraft: EaPumpInquiryDraft | null, slug = EA_CONFIGURATION_BUTTONS_PILOT_SLUG): EaPumpConfigurationCollection {
  const product = getEaInquiryProduct(slug);
  if (!product) return emptyEaPumpConfigurations();
  let collection = memory.get(slug) ?? emptyEaPumpConfigurations();
  try {
    const raw = JSON.parse(window.sessionStorage.getItem(storageKey(slug)) || "null");
    if (raw?.version === 1 && Array.isArray(raw.configurations)) {
      const configurations: SavedEaPumpConfiguration[] = [];
      for (const item of raw.configurations) {
        const config = item?.configuration;
        if (typeof item?.id !== "string" || !Number.isSafeInteger(item.number) || item.number < 1
          || configurations.some(saved => saved.id === item.id || saved.number === item.number)
          || config?.version !== 2 || !config.choice || typeof config.choice.capacity !== "string"
          || getPistonInquirySeries(config.choice) !== product.series
          || !Object.values(config.choice).every(value => typeof value === "string")
          || validateEaPumpInquiry(config.choice, item.quantity)) continue;
        configurations.push({ id: item.id, number: item.number, quantity: item.quantity,
          configuration: createEaPumpInquiryConfiguration(config.choice), drawingTypes: normalizeDrawingTypes(item.drawingTypes) });
      }
      collection = { version: 1, configurations,
        activeId: configurations.find(item => item.id === raw.activeId)?.id ?? configurations[0]?.id ?? null,
        nextNumber: Math.max(1, ...configurations.map(item => item.number + 1), Number.isSafeInteger(raw.nextNumber) ? raw.nextNumber : 1),
      };
    }
  } catch { /* Ignore a damaged or unavailable session store. */ }

  // Migrate a single draft or accept a configuration carried from another page in this series.
  if (incomingDraft && getPistonInquirySeries(incomingDraft.configuration.choice) === product.series) {
    const active = collection.configurations.find(item => item.id === collection.activeId);
    const key = eaPumpInquiryCartId(incomingDraft.configuration);
    if (!active || eaPumpInquiryCartId(active.configuration) !== key || active.quantity !== incomingDraft.quantity || JSON.stringify(active.drawingTypes || []) !== JSON.stringify(incomingDraft.drawingTypes || [])) {
      const existing = collection.configurations.find(item => eaPumpInquiryCartId(item.configuration) === key);
      collection = upsertEaPumpConfiguration(collection, incomingDraft, existing?.id ?? null);
    }
  }
  return saveEaPumpConfigurations(collection, slug);
}
