"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { ProductConfiguratorVariant } from "@/components/products/configurator/product-variant-configurator.types";

export type SavedTubingConfiguration = { id: string; number: number; variantId: string };
export type TubingConfigurations = {
  version: 1;
  configurations: SavedTubingConfiguration[];
  activeId: string | null;
  nextNumber: number;
};

const empty: TubingConfigurations = { version: 1, configurations: [], activeId: null, nextNumber: 1 };
const snapshots = new Map<string, TubingConfigurations>();
const listeners = new Set<() => void>();
const storageKey = (slug: string) => `foreach_tubing_configurations_v1:${slug}`;
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
const serverSnapshot = () => empty;

export function parseTubingConfigurations(raw: unknown, variants: readonly ProductConfiguratorVariant[]): TubingConfigurations {
  if (!raw || typeof raw !== "object") return empty;
  const value = raw as Partial<TubingConfigurations>;
  if (value.version !== 1 || !Array.isArray(value.configurations)) return empty;
  const allowed = new Set(variants.map(variant => variant.id));
  const configurations: SavedTubingConfiguration[] = [];
  for (const item of value.configurations) {
    if (!item || typeof item.id !== "string" || !item.id || !allowed.has(item.variantId)
      || !Number.isSafeInteger(item.number) || item.number < 1 || configurations.some(saved => saved.id === item.id)) continue;
    configurations.push({ id: item.id, number: item.number, variantId: item.variantId });
  }
  return { version: 1, configurations,
    activeId: configurations.find(item => item.id === value.activeId)?.id ?? configurations[0]?.id ?? null,
    nextNumber: Math.max(1, ...configurations.map(item => item.number + 1), Number.isSafeInteger(value.nextNumber) ? value.nextNumber! : 1),
  };
}

function read(slug: string, variants: readonly ProductConfiguratorVariant[]) {
  const cached = snapshots.get(slug);
  if (cached) return cached;
  let result = empty;
  try { result = parseTubingConfigurations(JSON.parse(window.sessionStorage.getItem(storageKey(slug)) || "null"), variants); } catch { /* An unavailable or damaged session starts empty. */ }
  snapshots.set(slug, result);
  return result;
}

export function upsertTubingConfiguration(collection: TubingConfigurations, variantId: string, editingId: string | null): TubingConfigurations {
  const existing = collection.configurations.find(item => item.id === editingId);
  const number = existing?.number ?? collection.nextNumber;
  const saved = { id: existing?.id ?? `tubing-config-${number}`, number, variantId };
  return { version: 1,
    configurations: existing ? collection.configurations.map(item => item.id === existing.id ? saved : item) : [...collection.configurations, saved],
    activeId: saved.id, nextNumber: existing ? collection.nextNumber : number + 1,
  };
}

export function removeTubingConfiguration(collection: TubingConfigurations, id: string): TubingConfigurations {
  const index = collection.configurations.findIndex(item => item.id === id);
  const configurations = collection.configurations.filter(item => item.id !== id);
  return { ...collection, configurations, activeId: collection.activeId === id ? configurations[Math.max(0, index - 1)]?.id ?? null : collection.activeId };
}

export function useTubingConfigurations(slug: string | null, variants?: readonly ProductConfiguratorVariant[]) {
  const getSnapshot = useCallback(() => slug && variants ? read(slug, variants) : empty, [slug, variants]);
  const collection = useSyncExternalStore(subscribe, getSnapshot, serverSnapshot);
  const update = useCallback((change: (current: TubingConfigurations) => TubingConfigurations) => {
    if (!slug || !variants) return;
    const next = change(read(slug, variants));
    snapshots.set(slug, next);
    try { window.sessionStorage.setItem(storageKey(slug), JSON.stringify(next)); } catch { /* Keep the current tab's in-memory configurations. */ }
    listeners.forEach(listener => listener());
  }, [slug, variants]);
  return [collection, update] as const;
}
