"use client";

import { useCallback, useSyncExternalStore } from "react";
import { normalizeDrawingTypes, type CadDrawingType } from "../detail/drawing-requirements";
import { normalizeInstrumentInquiry, validateInstrumentInquiry, type InstrumentInquiryConfiguration, type InstrumentInquiryFamily } from "./instrument-inquiry";

export type SavedInstrumentInquiry = { id: string; configuration: InstrumentInquiryConfiguration; quantity: number; drawingTypes: CadDrawingType[] };
type Collection = { version: 2; configurations: SavedInstrumentInquiry[]; nextNumber: number };
const empty: Collection = { version: 2, configurations: [], nextNumber: 1 };
const snapshots = new Map<string, Collection>();
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };

export function parseInstrumentInquiries(raw: unknown, family: InstrumentInquiryFamily): Collection {
  if (!raw || typeof raw !== "object") return empty;
  const value = raw as Partial<Omit<Collection, "version">> & { version?: number };
  if (![1, 2].includes(value.version || 0) || !Array.isArray(value.configurations)) return empty;
  const configurations: SavedInstrumentInquiry[] = [];
  for (const item of value.configurations) {
    if (!item || typeof item.id !== "string" || !item.id.startsWith(`${family}-config-`) || configurations.some(row => row.id === item.id)
      || item.configuration?.version !== 1 || item.configuration.family !== family || !item.configuration.choice
      || typeof item.configuration.choice !== "object" || !Object.values(item.configuration.choice).every(option => typeof option === "string")
      || typeof item.configuration.requirements !== "string" || validateInstrumentInquiry(item.configuration, item.quantity)) continue;
    configurations.push({ id: item.id, configuration: normalizeInstrumentInquiry(item.configuration), quantity: item.quantity,
      // Version 1 predates the request to include both CAD drawing types by default.
      drawingTypes: normalizeDrawingTypes(value.version === 1 ? ["2d", "3d"] : item.drawingTypes) });
  }
  return { version: 2, configurations, nextNumber: Math.max(1, ...configurations.map(item => Number(item.id.slice(`${family}-config-`.length)) + 1).filter(Number.isSafeInteger), Number.isSafeInteger(value.nextNumber) ? value.nextNumber! : 1) };
}

export function useInstrumentInquiries(family: InstrumentInquiryFamily) {
  const read = useCallback(() => {
    const cached = snapshots.get(family);
    if (cached) return cached;
    let collection = empty;
    try { collection = parseInstrumentInquiries(JSON.parse(sessionStorage.getItem(`foreach_instrument_inquiry_v1:${family}`) || "null"), family); } catch { /* Storage may be unavailable. */ }
    snapshots.set(family, collection);
    return collection;
  }, [family]);
  const collection = useSyncExternalStore(subscribe, read, () => empty);
  const update = useCallback((change: (current: Collection) => Collection) => {
    const next = parseInstrumentInquiries(change(read()), family);
    snapshots.set(family, next);
    try { sessionStorage.setItem(`foreach_instrument_inquiry_v1:${family}`, JSON.stringify(next)); } catch { /* Keep this tab's in-memory selection. */ }
    listeners.forEach(listener => listener());
  }, [family, read]);
  return [collection, update] as const;
}
