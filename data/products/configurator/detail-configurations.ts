"use client";

import { useCallback, useSyncExternalStore } from "react";
import { normalizeDrawingTypes, type CadDrawingType } from "@/data/products/detail/drawing-requirements";
import type { ProductConfiguratorVariant } from "@/components/products/configurator/product-variant-configurator.types";

export type DetailConfigurations = { version: 1; variantIds: string[]; activeId: string | null; drawingTypes?: Record<string, CadDrawingType[]> };
const empty: DetailConfigurations = { version: 1, variantIds: [], activeId: null };
const snapshots = new Map<string, DetailConfigurations>();
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };

export function parseDetailConfigurations(raw: unknown, variants: readonly ProductConfiguratorVariant[]): DetailConfigurations {
  if (!raw || typeof raw !== "object") return empty;
  const value = raw as Partial<DetailConfigurations>;
  if (value.version !== 1 || !Array.isArray(value.variantIds)) return empty;
  const allowed = new Set(variants.map(variant => variant.id));
  const variantIds = [...new Set(value.variantIds.filter((id): id is string => typeof id === "string" && allowed.has(id)))];
  const drawingTypes = value.drawingTypes && typeof value.drawingTypes === "object" ? Object.fromEntries(variantIds.map(id => [id, normalizeDrawingTypes(value.drawingTypes?.[id])])) : undefined;
  return { version: 1, variantIds, ...(drawingTypes ? { drawingTypes } : {}), activeId: variantIds.find(id => id === value.activeId) ?? variantIds[0] ?? null };
}

export function saveDetailConfiguration(current: DetailConfigurations, variantId: string, editingId: string | null, drawings?: CadDrawingType[]): DetailConfigurations {
  // One saved entry per catalog configuration; editing never changes inquiry-list items.
  const ids = current.variantIds.filter(id => id !== editingId || id === variantId);
  if (!ids.includes(variantId)) ids.splice(editingId ? Math.max(0, current.variantIds.indexOf(editingId)) : ids.length, 0, variantId);
  const drawingTypes = { ...current.drawingTypes, [variantId]: normalizeDrawingTypes(drawings ?? current.drawingTypes?.[variantId]) };
  if (editingId && editingId !== variantId) delete drawingTypes[editingId];
  return { version: 1, variantIds: ids, activeId: variantId, ...(drawings !== undefined || current.drawingTypes ? { drawingTypes } : {}) };
}

export function removeDetailConfiguration(current: DetailConfigurations, id: string): DetailConfigurations {
  const variantIds = current.variantIds.filter(value => value !== id);
  const drawingTypes = { ...current.drawingTypes };
  delete drawingTypes[id];
  return { ...current, variantIds, ...(current.drawingTypes ? { drawingTypes } : {}), activeId: current.activeId === id ? variantIds[0] ?? null : current.activeId };
}

export function useDetailConfigurations(scope: string | null, variants?: readonly ProductConfiguratorVariant[]) {
  const read = useCallback(() => {
    if (!scope || !variants) return empty;
    const cached = snapshots.get(scope);
    if (cached) return cached;
    let value = empty;
    try { value = parseDetailConfigurations(JSON.parse(sessionStorage.getItem(`foreach_detail_configurations_v1:${scope}`) || "null"), variants); } catch { /* Keep selection usable when browser storage is unavailable. */ }
    snapshots.set(scope, value);
    return value;
  }, [scope, variants]);
  const collection = useSyncExternalStore(subscribe, read, () => empty);
  const update = useCallback((change: (current: DetailConfigurations) => DetailConfigurations) => {
    if (!scope || !variants) return;
    const next = parseDetailConfigurations(change(read()), variants);
    snapshots.set(scope, next);
    try { sessionStorage.setItem(`foreach_detail_configurations_v1:${scope}`, JSON.stringify(next)); } catch { /* In-memory selections still work. */ }
    listeners.forEach(listener => listener());
  }, [scope, variants, read]);
  return [collection, update] as const;
}
