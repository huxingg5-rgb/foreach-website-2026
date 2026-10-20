/**
 * Local behavioral regression checks. No browser, network or real counter is used.
 * Run: npx tsx scripts/analytics/check-yandex-metrica.ts [--disabled]
 */
import assert from "node:assert/strict";

async function main() {
  const disabled = process.argv.includes("--disabled");
  process.env.NEXT_PUBLIC_YANDEX_METRICA_ID = disabled ? "" : "910000001";
  const cookieJar = new Map<string, string>();
  const storage = new Map<string, string>();
  const calls: unknown[][] = [];
  const events = new EventTarget();
  const browser = {
    location: {
      href: "https://www.foreachtek.com/ru/?utm_source=yandex&email=private@example.com#secret",
      pathname: "/ru/",
      hostname: "www.foreachtek.com",
      protocol: "https:",
    },
    dispatchEvent: events.dispatchEvent.bind(events),
    localStorage: {
      get length() { return storage.size; },
      key: (index: number) => [...storage.keys()][index] ?? null,
      removeItem: (key: string) => storage.delete(key),
    },
  };
  const documentMock = {
    title: "FOREACH",
    referrer: "https://yandex.ru/search/?text=private",
    get cookie() { return [...cookieJar].map(([key, value]) => `${key}=${value}`).join("; "); },
    set cookie(value: string) {
      const [pair] = value.split(";");
      const equals = pair.indexOf("=");
      const name = pair.slice(0, equals);
      if (/Max-Age=0(?:;|$)/.test(value)) cookieJar.delete(name);
      else cookieJar.set(name, pair.slice(equals + 1));
    },
  };
  Object.defineProperty(globalThis, "window", { value: browser, configurable: true });
  Object.defineProperty(globalThis, "document", { value: documentMock, configurable: true });

  const privacy = await import("../../lib/privacy/cookie-consent");
  const metrica = await import("../../lib/analytics/yandex-metrica");
  const analytics = await import("../../lib/analytics/track-event");
  const { YANDEX_METRICA_ID } = await import("../../lib/analytics/yandex-config");
  const browserState = browser as typeof browser & {
    ym?: (...args: unknown[]) => void;
    __foreachMetrica?: { active: boolean; pending: unknown[] };
  };
  function putConsent(value: object) {
    cookieJar.set(privacy.COOKIE_CONSENT_COOKIE_NAME, encodeURIComponent(JSON.stringify(value)));
  }
  function goalNames() {
    return calls.filter((item) => item[1] === "reachGoal").map((item) => item[2]);
  }
  function pendingGoals() {
    return (Reflect.get(browser, "__foreachMetrica") as { pending: unknown[] } | undefined)?.pending;
  }
  const lead = {
    formId: "contact_inquiry_form", formType: "general_inquiry",
    sourceSection: "contact_form_section", locale: "ru",
  };

  putConsent({ version: 1, analytics: true, updatedAt: "2026-09-01" });
  if (disabled) {
    assert.equal(YANDEX_METRICA_ID, 0);
    assert.equal(privacy.readCookieConsent()?.analytics, true);
    metrica.prepareMetrica();
    metrica.markMetricaLoaded();
    analytics.trackLeadGenerated(lead);
    assert.equal(browserState.ym, undefined);
    assert.equal(browserState.__foreachMetrica, undefined);
    console.log("PASS: missing counter ID leaves Yandex disabled and existing consent valid.");
    return;
  }

  assert.equal(privacy.readCookieConsent(), null, "GA4-only permission must not opt into Yandex");
  metrica.prepareMetrica();
  assert.equal(browserState.ym, undefined);
  putConsent({ version: 1, analytics: false, updatedAt: "2026-09-01" });
  assert.equal(privacy.readCookieConsent()?.analytics, false, "old rejection stays valid");
  analytics.trackLeadGenerated(lead);
  assert.equal(browserState.__foreachMetrica, undefined, "no pre-consent queue");

  privacy.writeCookieConsent(true);
  metrica.prepareMetrica();
  browserState.ym = (...args) => { calls.push(args); };
  analytics.trackLeadGenerated(lead);
  metrica.startMetrica();
  assert.equal(calls.length, 0, "no commands before the script is loaded");
  metrica.markMetricaLoaded();
  assert.deepEqual(calls.map((item) => item[1]), ["init", "hit", "reachGoal"]);
  assert.equal(calls[1][2], "https://www.foreachtek.com/ru/?utm_source=yandex");
  assert.equal((calls[1][3] as { referer: string }).referer, "https://yandex.ru/search/");
  assert.deepEqual(goalNames(), ["generate_lead"], "a pending successful inquiry is sent once");
  metrica.startMetrica();
  metrica.trackMetricaPageView();
  assert.equal(calls.length, 3, "no duplicate initialization or pageview");

  browser.location.href = "https://www.foreachtek.com/en/contact/?email=private@example.com";
  browser.location.pathname = "/en/contact/";
  metrica.trackMetricaPageView();
  assert.equal(calls[3][2], "https://www.foreachtek.com/en/contact/");
  assert.equal((calls[3][3] as { params: { locale: string } }).params.locale, "en");

  metrica.trackMetricaGoal("contact_click", {
    locale: "ru", contact_channel: "email", email: "private@example.com",
    message: "private inquiry", source_section: "private@example.com",
  });
  assert.deepEqual(calls.at(-1)?.[3], { locale: "ru", contact_channel: "email" });
  const beforeUnknownGoal = calls.length;
  metrica.trackMetricaGoal("search", { search_term: "private" });
  assert.equal(calls.length, beforeUnknownGoal);
  analytics.trackInquirySubmitError({
    ...lead, errorType: "network_error", submissionStage: "submit",
  });
  assert.equal(goalNames().filter((name) => name === "generate_lead").length, 1);
  assert.equal(goalNames().at(-1), "inquiry_submit_error", "errors are not lead conversions");

  cookieJar.set("_ym_uid", "test");
  cookieJar.set("_ga", "preserve");
  storage.set("_ym_uid", "test");
  storage.set("selection-cart", "preserve");
  privacy.writeCookieConsent(false);
  metrica.stopMetrica();
  assert.equal(calls.at(-1)?.[1], "destruct");
  assert.equal(cookieJar.has("_ym_uid"), false);
  assert.equal(cookieJar.get("_ga"), "preserve");
  assert.equal(storage.get("selection-cart"), "preserve");
  assert.equal(storage.has("_ym_uid"), false);
  const stoppedCalls = calls.length;
  analytics.trackLeadGenerated(lead);
  metrica.trackMetricaPageView();
  metrica.markMetricaLoaded();
  assert.equal(calls.length, stoppedCalls, "late load and new events cannot bypass withdrawal");
  assert.deepEqual(pendingGoals(), []);

  privacy.writeCookieConsent(true);
  metrica.startMetrica();
  assert.equal(calls.filter((item) => item[1] === "init").length, 2);
  assert.equal(goalNames().filter((name) => name === "generate_lead").length, 1);
  metrica.stopMetrica();
  // Loading followed by revocation must discard any queued post-consent goals.
  browserState.__foreachMetrica = undefined;
  analytics.trackLeadGenerated(lead);
  assert.equal(pendingGoals()?.length, 1);
  privacy.writeCookieConsent(false);
  metrica.stopMetrica();
  assert.equal(pendingGoals()?.length, 0);

  assert.equal(metrica.sanitizeMetricaUrl("javascript:alert(1)"), "");
  assert.equal(metrica.sanitizeMetricaUrl("https://a.test/?utm_source=private%40example.com"), "https://a.test/");
  privacy.writeCookieConsent(true);
  browserState.ym = () => { throw new Error("simulated vendor failure"); };
  assert.doesNotThrow(() => metrica.markMetricaLoaded());
  assert.doesNotThrow(() => analytics.trackLeadGenerated(lead));
  assert.doesNotThrow(() => metrica.stopMetrica());
  console.log("PASS: consent migration/rejection, delayed load, deduplication, SPA language changes, goal filtering, successful-lead semantics, withdrawal, cleanup and re-consent.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
