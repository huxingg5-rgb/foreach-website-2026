"use client";

import { useSyncExternalStore } from "react";

const CHANGE_EVENT = "technical-article-navigation";
const PENDING_KEY = "technical-article-pending-return";
const SCROLL_KEY = "technical-article-list-scroll:";
const RETURN_STATE = "technicalArticleReturn";

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

export function useArticleNavigationSnapshot() {
  return useSyncExternalStore(subscribe, () => window.location.pathname + window.location.search, () => "");
}

export function replaceArticleListQuery(params: URLSearchParams) {
  const query = params.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function normalizedPath(path: string) {
  return path.replace(/\/$/, "");
}

export function validArticleListHref(value: unknown, fallback: string): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return fallback;
  try {
    const url = new URL(value, window.location.origin);
    if (url.origin !== window.location.origin || normalizedPath(url.pathname) !== normalizedPath(fallback)) return fallback;
    return url.pathname + url.search;
  } catch {
    return fallback;
  }
}

export function rememberArticleSource(articleHref: string) {
  const listHref = window.location.pathname + window.location.search;
  try {
    sessionStorage.setItem(PENDING_KEY, JSON.stringify({
      articlePath: normalizedPath(new URL(articleHref, window.location.origin).pathname),
      listHref,
      time: Date.now(),
    }));
    sessionStorage.setItem(SCROLL_KEY + listHref, String(window.scrollY));
  } catch {
    // Navigation still works when browser storage is unavailable.
  }
}

// Bind the source to this article's history entry, not a global last-visited list.
export function attachArticleSource(fallback: string) {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    if (!raw) return;
    sessionStorage.removeItem(PENDING_KEY);
    const pending = JSON.parse(raw);
    if (pending.articlePath !== normalizedPath(window.location.pathname) ||
        !Number.isFinite(pending.time) || Date.now() - pending.time > 30_000) return;
    const href = validArticleListHref(pending.listHref, fallback);
    window.history.replaceState({ ...window.history.state, [RETURN_STATE]: href }, "");
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // A direct visit falls back to the current language's article list.
  }
}

export function useArticleReturnHref(fallback: string) {
  return useSyncExternalStore(subscribe,
    () => validArticleListHref(window.history.state?.[RETURN_STATE], fallback),
    () => fallback);
}

export function takeArticleListScroll(href: string): number | null {
  try {
    const raw = sessionStorage.getItem(SCROLL_KEY + href);
    sessionStorage.removeItem(SCROLL_KEY + href);
    if (raw === null) return null;
    const value = Number(raw);
    return Number.isFinite(value) && value >= 0 ? value : null;
  } catch {
    return null;
  }
}
