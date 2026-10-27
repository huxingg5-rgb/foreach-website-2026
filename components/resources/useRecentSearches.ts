"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const CHANGE_EVENT = "foreach:recent-searches";
const EMPTY = "[]";
const fallback = new Map<string, string>();

function read(key: string) {
  if (fallback.has(key)) return fallback.get(key)!;
  try {
    return window.localStorage.getItem(key) ?? EMPTY;
  } catch {
    return fallback.get(key) ?? EMPTY;
  }
}

function parse(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    const seen = new Set<string>();
    return value.filter((item): item is string => {
      if (typeof item !== "string" || !item.trim()) return false;
      const normalized = item.trim().toUpperCase();
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    }).slice(0, 8).map((item) => item.trim());
  } catch {
    return [];
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/** Only explicit searches are recorded; scopes keep unrelated page histories separate. */
export default function useRecentSearches(scope?: string) {
  const key = scope ? `foreach:recent-searches:v1:${scope}` : "";
  const snapshot = useCallback(() => key ? read(key) : EMPTY, [key]);
  const raw = useSyncExternalStore(subscribe, snapshot, () => EMPTY);
  const keywords = useMemo(() => parse(raw), [raw]);

  function write(next: string[]) {
    if (!key) return;
    const serialized = JSON.stringify(next);
    try {
      window.localStorage.setItem(key, serialized);
      fallback.delete(key);
    } catch {
      // Browsers that block storage still support history during this visit.
      fallback.set(key, serialized);
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  function remember(value: string) {
    const keyword = value.trim();
    if (!key || !keyword) return;
    write([keyword, ...parse(read(key)).filter(
      (item) => item.toUpperCase() !== keyword.toUpperCase(),
    )].slice(0, 8));
  }

  function remove(keyword: string) {
    if (!key) return;
    write(parse(read(key)).filter((item) => item !== keyword));
  }

  return { keywords, remember, remove };
}
