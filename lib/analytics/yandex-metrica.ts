import { readCookieConsent, removeYandexMetricaCookies } from "@/lib/privacy/cookie-consent";
import { YANDEX_METRICA_ID } from "./yandex-config";

type MetricaCommand = [number, string, ...unknown[]];
type MetricaFunction = {
  (...args: MetricaCommand): void;
  a?: MetricaCommand[];
  l?: number;
};
type Goal = { name: string; params: Record<string, string | number> };
type MetricaState = {
  loaded: boolean;
  active: boolean;
  previousUrl: string;
  pending: Goal[];
};

declare global {
  interface Window {
    ym?: MetricaFunction;
    __foreachMetrica?: MetricaState;
  }
}

const GOALS = new Set([
  "generate_lead",
  "contact_click",
  "resource_download",
  "add_to_inquiry_list",
  "begin_inquiry",
  "form_start",
  "inquiry_submit_error",
]);
const PARAMETER_KEYS = new Set([
  "locale", "form_id", "form_type", "source_section", "contact_channel",
  "resource_type", "file_type", "product_category", "error_type", "submission_stage",
]);
const CAMPAIGN_KEYS = new Set([
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "yclid", "ysclid",
]);

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function hasConsent() {
  return isBrowser() && YANDEX_METRICA_ID > 0 && readCookieConsent()?.analytics === true;
}

function getState(): MetricaState {
  return window.__foreachMetrica ??= {
    loaded: false, active: false, previousUrl: "", pending: [],
  };
}

function sendMetrica(command: string, ...args: unknown[]) {
  try {
    if (!window.ym) return false;
    window.ym(YANDEX_METRICA_ID, command, ...args);
    return true;
  } catch {
    // Optional analytics must never interrupt an inquiry or another site action.
    return false;
  }
}

/** Do not forward arbitrary query strings, search text, fragments or credentials. */
export function sanitizeMetricaUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    url.username = "";
    url.password = "";
    url.hash = "";
    for (const [key, item] of Array.from(url.searchParams.entries())) {
      if (!CAMPAIGN_KEYS.has(key) || item.length > 160 || /@|%40/i.test(item)) {
        url.searchParams.delete(key);
      }
    }
    return url.toString();
  } catch {
    return "";
  }
}

/** Define only the standard command stub. No script or request is made here. */
export function prepareMetrica() {
  if (!hasConsent() || window.ym) return;
  const ym: MetricaFunction = (...args) => { (ym.a ??= []).push(args); };
  ym.l = Date.now();
  window.ym = ym;
}

export function trackMetricaPageView() {
  if (!hasConsent()) return;
  const state = getState();
  if (!state.active || !window.ym) return;
  const url = sanitizeMetricaUrl(window.location.href);
  if (!url || url === state.previousUrl) return;
  const referer = state.previousUrl || sanitizeMetricaUrl(document.referrer);
  const segment = window.location.pathname.split("/").filter(Boolean)[0];
  const sent = sendMetrica("hit", url, {
    title: document.title,
    referer,
    params: { locale: ["en", "es", "fr", "ko", "ru"].includes(segment) ? segment : "zh-CN" },
  });
  if (sent) state.previousUrl = url;
}

export function startMetrica() {
  if (!hasConsent()) return;
  const state = getState();
  if (!state.loaded || state.active || !window.ym) return;
  const initialized = sendMetrica("init", {
    defer: true,
    webvisor: false,
    clickmap: false,
    trackLinks: false,
    accurateTrackBounce: false,
    trackHash: false,
    ecommerce: false,
  });
  if (!initialized) return;
  state.active = true;
  trackMetricaPageView();
  for (const goal of state.pending.splice(0)) {
    sendMetrica("reachGoal", goal.name, goal.params);
  }
}

export function markMetricaLoaded() {
  if (!isBrowser() || !YANDEX_METRICA_ID) return;
  getState().loaded = true;
  startMetrica();
}

export function stopMetrica() {
  if (!isBrowser()) return;
  const state = window.__foreachMetrica;
  if (state) {
    if (state.active) sendMetrica("destruct");
    state.active = false;
    state.previousUrl = "";
    state.pending = [];
  }
  removeYandexMetricaCookies();
}

/**
 * Reuse the existing business events independently of GA4 readiness.
 * Only fixed dimensions are forwarded; no form values, item arrays or search text.
 */
export function trackMetricaGoal(name: string, parameters: Record<string, unknown>) {
  if (!hasConsent() || !GOALS.has(name)) return;
  const params: Goal["params"] = {};
  for (const [key, value] of Object.entries(parameters)) {
    if (!PARAMETER_KEYS.has(key)) continue;
    if (typeof value === "string" && /^[\w .:/-]{1,80}$/.test(value)) params[key] = value;
  }
  const state = getState();
  if (state.active && window.ym) {
    sendMetrica("reachGoal", name, params);
  } else {
    if (state.pending.length >= 50) state.pending.shift();
    state.pending.push({ name, params });
  }
}
