import {
  DIAGNOSTIC_ENDPOINT, MAX_DIAGNOSTIC_BYTES, MAX_DIAGNOSTIC_EVENTS,
  diagnosticText, diagnosticUrl, isProductDiagnosticPath, normalizeDiagnosticReport,
  type ClientDiagnosticReport, type DiagnosticEvent,
} from "./client-report";

export type ClientDiagnosticCapture = {
  record: (kind: DiagnosticEvent["kind"], error: unknown, source?: string, line?: number, column?: number) => void;
  snapshot: () => ClientDiagnosticReport | null;
  delivery: () => "local" | "pending" | "sent" | "failed";
};
declare global {
  interface Window { __foreachClientDiagnostics?: ClientDiagnosticCapture }
}
export function isClientDiagnosticMode(win: Window): boolean {
  return isProductDiagnosticPath(win.location.pathname)
    && new URLSearchParams(win.location.search).get("diagnostics") === "1";
}
export function installClientDiagnostics(win: Window): ClientDiagnosticCapture | null {
  if (!isClientDiagnosticMode(win)) return null;
  if (win.__foreachClientDiagnostics) return win.__foreachClientDiagnostics;
  // Optional upload key stays in the fragment/closure, never in the report.
  const candidate = new URLSearchParams(win.location.hash.slice(1)).get("diagnostics-token") || "";
  const token = /^[a-zA-Z0-9_-]{32,128}$/.test(candidate) ? candidate : "";
  const id = Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 12);
  // Keep the bundle identity even if the global error boundary replaces the DOM.
  const runtimeBundle = (() => {
    try {
      const script = win.document.querySelector<HTMLScriptElement>(
        'script[src*="/_next/static/chunks/turbopack-"], script[src*="/_next/static/chunks/webpack-"]',
      );
      return diagnosticUrl(script?.getAttribute("src")) || "unknown";
    } catch { return "unknown"; }
  })();
  const events: DiagnosticEvent[] = [];
  const seen = new Set<string>();
  let delivery: ReturnType<ClientDiagnosticCapture["delivery"]> = "local";
  let timer: number | undefined;
  let sends = 0;
  const resources = () => {
    try {
      return win.performance.getEntriesByType("resource")
        .filter((entry) => /\.(?:js|css)(?:[?#]|$)/i.test(entry.name))
        .slice(-32).map((entry) => {
          const status = (entry as PerformanceResourceTiming & { responseStatus?: number }).responseStatus;
          return { url: diagnosticUrl(entry.name), status: status || null, duration: entry.duration };
        });
    } catch { return []; }
  };
  const snapshot = () => {
    try {
      return normalizeDiagnosticReport({
        version: 1, id, at: new Date().toISOString(), path: win.location.pathname,
        browser: win.navigator.userAgent,
        build: runtimeBundle,
        viewport: { width: win.innerWidth, height: win.innerHeight, pixelRatio: win.devicePixelRatio },
        events: events.slice(), resources: resources(),
      }, token);
    } catch { return null; }
  };
  const send = async () => {
    timer = undefined;
    if (!token || sends >= 2 || !isClientDiagnosticMode(win)) return;
    const report = snapshot();
    if (!report) return;
    const body = JSON.stringify(report);
    if (new TextEncoder().encode(body).byteLength > MAX_DIAGNOSTIC_BYTES) {
      delivery = "failed"; return;
    }
    sends += 1;
    delivery = "pending";
    const controller = new AbortController();
    const timeout = win.setTimeout(() => controller.abort(), 5000);
    try {
      const response = await win.fetch(DIAGNOSTIC_ENDPOINT, {
        method: "POST", mode: "same-origin", credentials: "omit",
        headers: { "Content-Type": "application/json", "X-Diagnostics-Token": token },
        referrerPolicy: "no-referrer", cache: "no-store", keepalive: true,
        signal: controller.signal, body,
      });
      delivery = response.ok ? "sent" : "failed";
    } catch { delivery = "failed"; }
    finally { win.clearTimeout(timeout); }
  };
  const record: ClientDiagnosticCapture["record"] = (kind, error, source = "", line = 0, column = 0) => {
    try {
      if (!isClientDiagnosticMode(win) || (events.length >= MAX_DIAGNOSTIC_EVENTS && kind !== "react")) return;
      const value = error && typeof error === "object" ? error as { name?: unknown; message?: unknown; stack?: unknown } : {};
      const event: DiagnosticEvent = {
        kind, at: new Date().toISOString(),
        name: diagnosticText(value.name, 100, token) || kind,
        message: diagnosticText(typeof error === "string" ? error : value.message, 600, token),
        stack: diagnosticText(value.stack, 1800, token),
        source: diagnosticUrl(source), line, column,
      };
      const signature = JSON.stringify([event.kind, event.name, event.message, event.stack, event.source]);
      if (seen.has(signature)) return;
      seen.add(signature);
      if (events.length >= MAX_DIAGNOSTIC_EVENTS) events.shift();
      events.push(event);
      if (token && sends < 2 && timer === undefined) {
        timer = win.setTimeout(() => { void send(); }, 750);
      }
    } catch { /* Diagnostics must never break the page. */ }
  };
  const capture: ClientDiagnosticCapture = { record, snapshot, delivery: () => delivery };
  win.__foreachClientDiagnostics = capture;
  win.addEventListener("error", (event) => {
    try {
      const target = event.target;
      if (target instanceof Element && (target.tagName === "SCRIPT" || target.tagName === "LINK")) {
        record("resource", "Resource failed to load", target.getAttribute("src") || target.getAttribute("href") || "");
        return;
      }
      const runtime = event as ErrorEvent;
      record("runtime", runtime.error || runtime.message, runtime.filename, runtime.lineno, runtime.colno);
    } catch { /* Ignore failures in the diagnostic hook. */ }
  }, true);
  win.addEventListener("unhandledrejection", (event) => {
    record("promise", event.reason);
  });
  return capture;
}
export function captureReactDiagnostic(error: unknown): ClientDiagnosticCapture | null {
  if (typeof window === "undefined") return null;
  try {
    const capture = installClientDiagnostics(window);
    capture?.record("react", error);
    return capture;
  } catch { return null; }
}
