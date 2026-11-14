"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { normalizeDrawingTypes, type CadDrawingType } from "@/data/products/detail/drawing-requirements";

const empty: CadDrawingType[] = [];
const snapshots = new Map<string, CadDrawingType[]>();
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
const key = (scope: string) => `foreach_model_drawing_requirements_v1:${scope}`;
export function saveModelDrawingRequirements(scope: string, value: CadDrawingType[]) {
  const next = normalizeDrawingTypes(value);
  snapshots.set(scope, next);
  try { sessionStorage.setItem(key(scope), JSON.stringify(next)); } catch { /* Tab-local memory remains available. */ }
  listeners.forEach(listener => listener());
}
export function readModelDrawingRequirements(raw: string | null, initial: CadDrawingType[] = empty) {
  if (raw === null) return normalizeDrawingTypes(initial);
  try { return normalizeDrawingTypes(JSON.parse(raw)); } catch { return normalizeDrawingTypes(initial); }
}
export function useModelDrawingRequirements(scope: string, defaults: CadDrawingType[] = empty) {
  const defaultsKey = defaults.join(",");
  const initial = useMemo(() => normalizeDrawingTypes(defaultsKey.split(",")), [defaultsKey]);
  const read = useCallback(() => {
    const cached = snapshots.get(scope);
    if (cached) return cached;
    let value = initial;
    try { value = readModelDrawingRequirements(sessionStorage.getItem(key(scope)), initial); } catch { /* Unavailable storage uses the page defaults. */ }
    snapshots.set(scope, value);
    return value;
  }, [scope, initial]);
  const value = useSyncExternalStore(subscribe, read, () => initial);
  const save = useCallback((types: CadDrawingType[]) => saveModelDrawingRequirements(scope, types), [scope]);
  return [value, save] as const;
}
