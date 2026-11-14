"use client";

import { useCallback, useSyncExternalStore } from "react";
import { normalizeDrawingTypes, type CadDrawingType } from "@/data/products/detail/drawing-requirements";
import type { LuerPairChoice } from "./luer-pairing";

export type FittingConfigurationChoice = { kind: "hard-tube"; choice: string }
  | { kind: "quick-connect"; choice: string }
  | { kind: "luer"; choice: LuerPairChoice };
export type SavedFittingConfiguration = { id: string; choice: FittingConfigurationChoice; drawingTypes?: CadDrawingType[] };
export type FittingConfigurations = { version: 1; configurations: SavedFittingConfiguration[]; activeId: string | null };
const empty: FittingConfigurations = { version: 1, configurations: [], activeId: null };
type Validator = (choice: FittingConfigurationChoice) => boolean;

function normalize(raw: unknown): FittingConfigurationChoice | null {
  if (!raw || typeof raw !== "object") return null;
  const { kind, choice } = raw as { kind?: unknown; choice?: unknown };
  if (kind === "hard-tube" || kind === "quick-connect") return typeof choice === "string" ? { kind, choice } : null;
  if (kind !== "luer" || !choice || typeof choice !== "object") return null;
  const value = choice as Record<string, unknown>;
  const model = (key: string) => value[key] === null || typeof value[key] === "string";
  if (value.mode === "single") return { kind, choice: { mode: "single" } };
  if (value.mode === "core" && model("collarModel") && (value.maleModel === undefined || model("maleModel"))) {
    return { kind, choice: { mode: "core", maleModel: value.maleModel as string | null | undefined, collarModel: value.collarModel as string | null } };
  }
  if (value.mode === "pair" && ["maleModel", "femaleModel", "collarModel", "ringModel", "nutModel"].every(model)) {
    return { kind, choice: { mode: "pair", maleModel: value.maleModel as string | null, femaleModel: value.femaleModel as string | null,
      collarModel: value.collarModel as string | null, ringModel: value.ringModel as string | null, nutModel: value.nutModel as string | null } };
  }
  return null;
}

function identity(choice: FittingConfigurationChoice) { return JSON.stringify(normalize(choice)); }

export function parseFittingConfigurations(raw: unknown, valid: Validator): FittingConfigurations {
  if (!raw || typeof raw !== "object") return empty;
  const value = raw as Partial<FittingConfigurations>;
  if (value.version !== 1 || !Array.isArray(value.configurations)) return empty;
  const configurations: SavedFittingConfiguration[] = [];
  for (const item of value.configurations) {
    const choice = normalize(item?.choice);
    if (!choice || !valid(choice)) continue;
    const id = identity(choice);
    if (!configurations.some(saved => saved.id === id)) configurations.push({ id, choice, ...(item.drawingTypes ? { drawingTypes: normalizeDrawingTypes(item.drawingTypes) } : {}) });
  }
  return { version: 1, configurations, activeId: configurations.find(item => item.id === value.activeId)?.id ?? configurations[0]?.id ?? null };
}

export function saveFittingConfiguration(current: FittingConfigurations, choice: FittingConfigurationChoice, editingId: string | null, drawings?: CadDrawingType[]): FittingConfigurations {
  const id = identity(choice), previous = current.configurations.find(item => item.id === id || item.id === editingId);
  const drawingTypes = normalizeDrawingTypes(drawings ?? previous?.drawingTypes);
  const configurations = current.configurations.filter(item => item.id !== editingId || item.id === id)
    .map(item => item.id === id ? { ...item, drawingTypes } : item);
  if (!configurations.some(item => item.id === id)) configurations.splice(editingId ? Math.max(0, current.configurations.findIndex(item => item.id === editingId)) : configurations.length, 0, { id, choice, drawingTypes });
  return { version: 1, configurations, activeId: id };
}

export function removeFittingConfiguration(current: FittingConfigurations, id: string): FittingConfigurations {
  const configurations = current.configurations.filter(item => item.id !== id);
  return { ...current, configurations, activeId: current.activeId === id ? configurations[0]?.id ?? null : current.activeId };
}

const snapshots = new Map<string, FittingConfigurations>();
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };

export function useFittingConfigurations(scope: string | null, valid: Validator) {
  const read = useCallback(() => {
    if (!scope) return empty;
    const cached = snapshots.get(scope);
    if (cached) return cached;
    let value = empty;
    try { value = parseFittingConfigurations(JSON.parse(window.sessionStorage.getItem(`foreach_fitting_configurations_v1:${scope}`) || "null"), valid); } catch { /* Storage is optional. */ }
    snapshots.set(scope, value);
    return value;
  }, [scope, valid]);
  const collection = useSyncExternalStore(subscribe, read, () => empty);
  const update = useCallback((change: (current: FittingConfigurations) => FittingConfigurations) => {
    if (!scope) return;
    const next = parseFittingConfigurations(change(read()), valid);
    snapshots.set(scope, next);
    try { window.sessionStorage.setItem(`foreach_fitting_configurations_v1:${scope}`, JSON.stringify(next)); } catch { /* In-memory selections still work. */ }
    listeners.forEach(listener => listener());
  }, [scope, valid, read]);
  return [collection, update] as const;
}
