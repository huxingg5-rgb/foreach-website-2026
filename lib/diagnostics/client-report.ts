/** Bounded, opt-in product-page diagnostics; shared client/server schema. */
export const MAX_DIAGNOSTIC_EVENTS = 8;
export const MAX_DIAGNOSTIC_BYTES = 32768;
export const DIAGNOSTIC_ENDPOINT = "/api/diagnostics/client-error/";
export type DiagnosticEvent = {
  kind: "runtime" | "promise" | "resource" | "react";
  at: string; name: string; message: string; stack: string;
  source: string; line: number; column: number;
};
export type ClientDiagnosticReport = {
  version: 1; id: string; at: string; path: string;
  browser: string; build: string;
  viewport: { width: number; height: number; pixelRatio: number };
  events: DiagnosticEvent[];
  resources: { url: string; status: number | null; duration: number }[];
};
export function isProductDiagnosticPath(path: string): boolean {
  return /^\/(?:en\/|es\/|fr\/|ko\/|ru\/)?products(?:\/|$)/.test(path);
}
export function diagnosticUrl(value: unknown): string {
  if (typeof value !== "string" || !value) return "";
  try {
    const url = new URL(value, "https://diagnostic.invalid");
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    const prefix = url.hostname === "diagnostic.invalid" ? "" : url.origin;
    return (prefix + url.pathname).slice(0, 240);
  } catch { return ""; }
}
export function diagnosticText(value: unknown, limit = 600, secret = ""): string {
  if (typeof value !== "string") return "";
  let text = value.slice(0, 8192);
  if (secret) text = text.split(secret).join("[redacted]");
  return text
    .replace(/https?:\/\/[^\s<>"']+/g, (url) => diagnosticUrl(url))
    .replace(/(\/[\w./~%-]+)\?[^\s<>"')]+/g, "$1")
    .replace(/\bBearer\s+[^\s,;]+/gi, "Bearer [redacted]")
    .replace(/\b(password|token|authorization|cookie)\s*[:=]\s*[^\s,;]+/gi, "$1=[redacted]")
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
    .slice(0, limit);
}
function boundedNumber(value: unknown, maximum = 1000000): number {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.min(maximum, value)) : 0;
}
function object(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown> : {};
}
/** Rebuild a whitelist on both sides; never log arbitrary request objects. */
export function normalizeDiagnosticReport(value: unknown, secret = ""): ClientDiagnosticReport | null {
  const input = object(value);
  if (input.version !== 1 || typeof input.path !== "string") return null;
  const path = input.path.split(/[?#]/, 1)[0].slice(0, 240);
  if (!isProductDiagnosticPath(path)) return null;
  const id = diagnosticText(input.id, 64, secret);
  if (!/^[a-zA-Z0-9-]{8,64}$/.test(id)) return null;
  const viewport = object(input.viewport);
  const kinds = new Set(["runtime", "promise", "resource", "react"]);
  const events = (Array.isArray(input.events) ? input.events : [])
    .slice(0, MAX_DIAGNOSTIC_EVENTS)
    .flatMap((entry): DiagnosticEvent[] => {
      const event = object(entry);
      if (!kinds.has(String(event.kind))) return [];
      return [{
        kind: event.kind as DiagnosticEvent["kind"],
        at: diagnosticText(event.at, 32, secret),
        name: diagnosticText(event.name, 100, secret),
        message: diagnosticText(event.message, 600, secret),
        stack: diagnosticText(event.stack, 1800, secret),
        source: diagnosticUrl(event.source),
        line: boundedNumber(event.line), column: boundedNumber(event.column),
      }];
    });
  if (!events.length) return null;
  return {
    version: 1, id, path, at: diagnosticText(input.at, 32, secret),
    browser: diagnosticText(input.browser, 240, secret),
    build: diagnosticText(input.build, 120, secret),
    viewport: {
      width: boundedNumber(viewport.width, 10000),
      height: boundedNumber(viewport.height, 10000),
      pixelRatio: boundedNumber(viewport.pixelRatio, 10),
    },
    events,
    resources: (Array.isArray(input.resources) ? input.resources : [])
      .slice(-32).flatMap((entry) => {
        const resource = object(entry);
        const url = diagnosticUrl(resource.url);
        if (!url || !/\.(?:js|css)(?::\d+)*$/i.test(url)) return [];
        return [{
          url,
          // Resource error events do not expose HTTP status; never invent one.
          status: typeof resource.status === "number" && resource.status > 0
            ? boundedNumber(resource.status, 599) : null,
          duration: Math.round(boundedNumber(resource.duration, 300000)),
        }];
      }),
  };
}
