import assert from "node:assert/strict";
import { test } from "node:test";
import { diagnosticText, diagnosticUrl, normalizeDiagnosticReport, isProductDiagnosticPath, MAX_DIAGNOSTIC_BYTES } from "../../lib/diagnostics/client-report";
import { installClientDiagnostics } from "../../lib/diagnostics/client-capture";
import { receiveClientReport } from "../../lib/diagnostics/receive-client-report";

const token = "fixture_only_0123456789abcdefghijklmnopqrstuvwxyz";
const origin = "https://www.foreachtek.com";
const now = Date.parse("2026-09-08T10:00:00Z");
const env = { CLIENT_DIAGNOSTICS_TOKEN: token, CLIENT_DIAGNOSTICS_EXPIRES_AT: new Date(now + 3600000).toISOString() };
function report() {
  return {
    version: 1, id: "fixture-12345678", at: new Date(now).toISOString(),
    path: "/en/products/pumps/piston-pump/ea-250-pmma/?diagnostics=1#secret",
    browser: "Chrome/149.0.7827.102", build: "/_next/static/chunks/turbopack-test.js",
    viewport: { width: 390, height: 844, pixelRatio: 3 },
    events: [{ kind: "react", at: new Date(now).toISOString(), name: "TypeError", message: "Cannot read fixture.value",
      stack: "TypeError: fixture\n at https://www.foreachtek.com/_next/static/chunks/test.js:123:45", source: "", line: 123, column: 45 }],
    resources: [{ url: origin + "/app.js?token=private", status: 0, duration: 12.6 }],
  };
}
function request(body = JSON.stringify(report()), headers: Record<string, string> = {}, method = "POST") {
  return new Request(origin + "/api/diagnostics/client-error/", {
    method, headers: { Origin: origin, "Content-Type": "application/json", "X-Diagnostics-Token": token, ...headers },
    ...(method === "GET" ? {} : { body }),
  });
}
test("product-only activation excludes homepage, tools and a products-like prefix", () => {
  for (const path of ["/products/", "/en/products/pumps/", "/es/products/", "/fr/products/", "/ko/products/", "/ru/products/"]) assert.ok(isProductDiagnosticPath(path));
  for (const path of ["/", "/en/", "/en/productshop/", "/en/tools/", "//en/products/"]) assert.equal(isProductDiagnosticPath(path), false);
});
test("URLs discard query, fragment, credentials and non-http protocols", () => {
  assert.equal(diagnosticUrl("https://user:pass@example.com/app.js?a=1#b"), "https://example.com/app.js");
  assert.equal(diagnosticUrl("/_next/app.js?key=private#secret"), "/_next/app.js");
  assert.equal(diagnosticUrl("data:text/javascript,private"), "");
  assert.equal(diagnosticUrl("blob:https://example.com/private"), "");
});
test("error text redacts recognized secrets and preserves stack line locations", () => {
  const value = diagnosticText("token=abc password=xyz user@example.com Bearer abc " + token + " https://example.com/app.js:123:45?secret=abc", 1000, token);
  for (const secret of ["token=abc", "password=xyz", "user@example.com", "Bearer abc", token, "?secret"]) assert.ok(!value.includes(secret));
  assert.ok(value.includes("app.js:123:45"));
});
test("normalization whitelists fields and caps event, stack, resource and number limits", () => {
  const input = { ...report(), cookie: "private", form: { email: "private" }, events: Array.from({ length: 20 }, () => ({ ...report().events[0], stack: "x".repeat(5000), line: -3 })),
    resources: Array.from({ length: 50 }, () => ({ url: "/app.js?private=1", status: 0, duration: 400000 })),
    viewport: { width: Infinity, height: 20000, pixelRatio: -1 } };
  const result = normalizeDiagnosticReport(input)!;
  assert.equal(result.events.length, 8); assert.equal(result.events[0].stack.length, 1800);
  assert.equal(result.events[0].line, 0); assert.equal(result.resources.length, 32);
  assert.equal(result.resources[0].status, null); assert.equal(result.resources[0].duration, 300000);
  assert.deepEqual(result.viewport, { width: 0, height: 10000, pixelRatio: 0 });
  assert.equal(result.path, "/en/products/pumps/piston-pump/ea-250-pmma/");
  assert.ok(!JSON.stringify(result).includes("private")); assert.ok(!("cookie" in result));
});
test("invalid report versions, IDs, paths and empty events are rejected", () => {
  for (const patch of [{ version: 2 }, { id: "bad" }, { path: "/en/" }, { events: [] }, { events: [{ kind: "unknown" }] }]) {
    assert.equal(normalizeDiagnosticReport({ ...report(), ...patch }), null);
  }
});
test("receiver is disabled for missing, expired, distant or malformed configuration", async () => {
  for (const config of [{}, { ...env, CLIENT_DIAGNOSTICS_TOKEN: "short" }, { ...env, CLIENT_DIAGNOSTICS_EXPIRES_AT: new Date(now).toISOString() },
    { ...env, CLIENT_DIAGNOSTICS_EXPIRES_AT: new Date(now + 86400001).toISOString() }, { ...env, CLIENT_DIAGNOSTICS_EXPIRES_AT: "invalid" }]) {
    const response = await receiveClientReport(request(), config, () => assert.fail("must not log"), now);
    assert.equal(response.status, 404);
  }
});
test("receiver checks exact origin, upload token, method and content type", async () => {
  const cases: [Request, number][] = [
    [request(undefined, { Origin: "https://evil.example" }), 403],
    [request(undefined, { Origin: "https://www.foreachtek.com.evil.example" }), 403],
    [request(undefined, { "X-Diagnostics-Token": "invalid" }), 403],
    [request(undefined, { "Content-Type": "text/plain" }), 415],
    [request(undefined, { "Content-Type": "application/jsonx" }), 415],
    [request(undefined, {}, "GET"), 405],
  ];
  for (const [req, expected] of cases) assert.equal((await receiveClientReport(req, env, () => assert.fail("must not log"), now)).status, expected);
});
test("receiver accepts a valid report but never logs raw extra fields or secrets", async () => {
  const input = { ...report(), rawBody: "private", events: [{ ...report().events[0], message: "token=" + token + " user@example.com" }] };
  let logged: unknown;
  const response = await receiveClientReport(request(JSON.stringify(input)), env, value => { logged = value; }, now);
  assert.equal(response.status, 202); assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.deepEqual(await response.json(), { accepted: true, id: input.id });
  const text = JSON.stringify(logged);
  for (const secret of ["rawBody", "private", token, "user@example.com", "?diagnostics"]) assert.ok(!text.includes(secret));
});
test("receiver rejects oversized bodies both by header and actual streamed bytes", async () => {
  assert.equal((await receiveClientReport(request("{}", { "Content-Length": String(MAX_DIAGNOSTIC_BYTES + 1) }), env, () => assert.fail("must not log"), now)).status, 413);
  assert.equal((await receiveClientReport(request(" ".repeat(MAX_DIAGNOSTIC_BYTES + 1)), env, () => assert.fail("must not log"), now)).status, 413);
});
test("receiver rejects broken JSON and schema without logging", async () => {
  for (const body of ["{", "null", "[]", "{}", JSON.stringify({ ...report(), path: "/en/" })]) {
    assert.equal((await receiveClientReport(request(body), env, () => assert.fail("must not log"), now)).status, 400);
  }
});

type EventCallback = (event: unknown) => void;
function fakeWindow(search = "?diagnostics=1", hash = "") {
  const listeners = new Map<string, EventCallback>();
  const timers = new Map<number, () => void>();
  const uploads: RequestInit[] = [];
  let sequence = 0;
  const win = {
    location: { pathname: "/en/products/pumps/piston-pump/ea-250-pmma/", search, hash },
    navigator: { userAgent: "Chrome/149.0.7827.102" },
    innerWidth: 390, innerHeight: 844, devicePixelRatio: 3,
    document: { querySelector: () => ({ getAttribute: () => "/_next/static/chunks/turbopack-test.js?secret=1" }) },
    performance: { getEntriesByType: () => [{ name: origin + "/app.js?secret=1", duration: 40, responseStatus: 200 }] },
    addEventListener: (name: string, callback: EventCallback) => listeners.set(name, callback),
    setTimeout: (callback: () => void) => { timers.set(++sequence, callback); return sequence; },
    clearTimeout: (id: number) => timers.delete(id),
    fetch: async (_url: unknown, options: RequestInit) => { uploads.push(options); return { ok: true }; },
  };
  Object.defineProperty(win, "localStorage", { get() { assert.fail("must never read localStorage"); } });
  Object.defineProperty(win, "sessionStorage", { get() { assert.fail("must never read sessionStorage"); } });
  Object.defineProperty(win.document, "cookie", { get() { assert.fail("must never read cookies"); } });
  async function flush() {
    const tasks = [...timers.entries()]; timers.clear();
    for (const [, callback] of tasks) callback();
    await Promise.resolve(); await Promise.resolve();
  }
  return { win: win as unknown as Window, listeners, timers, uploads, flush };
}
test("ordinary visits install no hooks or timers and upload nothing", () => {
  for (const search of ["", "?diagnostics=0", "?other=1"]) {
    const f = fakeWindow(search);
    assert.equal(installClientDiagnostics(f.win), null);
    assert.equal(f.listeners.size, 0); assert.equal(f.timers.size, 0); assert.equal(f.uploads.length, 0);
  }
  const f = fakeWindow(); f.win.location.pathname = "/en/";
  assert.equal(installClientDiagnostics(f.win), null); assert.equal(f.listeners.size, 0);
});
test("capture is idempotent, handles promise and React errors without browser storage", () => {
  const f = fakeWindow();
  const capture = installClientDiagnostics(f.win)!;
  assert.equal(installClientDiagnostics(f.win), capture); assert.equal(f.listeners.size, 2);
  f.listeners.get("unhandledrejection")!({ reason: new TypeError("fixture rejection") });
  f.win.document.querySelector = () => null;
  capture.record("react", new Error("fixture React error"));
  const result = capture.snapshot()!;
  assert.deepEqual(result.events.map(e => e.kind), ["promise", "react"]);
  assert.ok(result.events[0].stack.includes("fixture rejection"));
  assert.equal(result.resources[0].status, 200);
  assert.equal(result.build, "/_next/static/chunks/turbopack-test.js");
  assert.equal(f.timers.size, 0); assert.equal(capture.delivery(), "local");
});
test("capture deduplicates, remains bounded and stops collecting off diagnostic URLs", () => {
  const f = fakeWindow(), capture = installClientDiagnostics(f.win)!;
  capture.record("react", "same"); capture.record("react", "same");
  assert.equal(capture.snapshot()!.events.length, 1);
  for (let i = 0; i < 20; i++) capture.record("resource", "missing " + i, "/app" + i + ".js?private=1");
  assert.equal(capture.snapshot()!.events.length, 8);
  capture.record("react", "fatal after many resource failures");
  assert.ok(capture.snapshot()!.events.some(e => e.message === "fatal after many resource failures"));
  f.win.location.search = ""; capture.record("react", "must not capture");
  assert.ok(!JSON.stringify(capture.snapshot()).includes("must not capture"));
});
test("optional upload strips secrets and sends at most twice with no cookies or referrer", async () => {
  const f = fakeWindow("?diagnostics=1", "#diagnostics-token=" + token);
  const capture = installClientDiagnostics(f.win)!;
  capture.record("react", "fixture " + token); await f.flush();
  assert.equal(capture.delivery(), "sent"); assert.equal(f.uploads.length, 1);
  assert.equal(f.uploads[0].credentials, "omit"); assert.equal(f.uploads[0].referrerPolicy, "no-referrer");
  assert.ok(!String(f.uploads[0].body).includes(token));
  capture.record("runtime", "second"); await f.flush();
  capture.record("promise", "third"); await f.flush();
  assert.equal(f.uploads.length, 2);
});
test("failed upload cannot recurse and leaves a local copy available", async () => {
  const f = fakeWindow("?diagnostics=1", "#diagnostics-token=" + token);
  let attempts = 0;
  f.win.fetch = async () => { attempts++; throw new Error("offline"); };
  const capture = installClientDiagnostics(f.win)!;
  capture.record("react", "original failure"); await f.flush();
  assert.equal(attempts, 1); assert.equal(capture.delivery(), "failed");
  assert.equal(capture.snapshot()!.events[0].message, "original failure");
  assert.equal(f.timers.size, 0);
});
