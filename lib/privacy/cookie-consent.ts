/* =========================================================
   lib/privacy/cookie-consent.ts
   FOREACH 官网 Cookie 同意状态管理

   说明：
   1. 仅在浏览器中读取和写入同意状态
   2. 不使用 Next.js 服务端 cookies()
   3. 同意状态 Cookie 属于维持用户隐私选择所需的必要 Cookie
   4. 分析权限关闭时，尝试清除 Google Analytics Cookie
========================================================= */

import { YANDEX_CONSENT_REVISION, YANDEX_METRICA_ID } from "@/lib/analytics/yandex-config";

export const COOKIE_CONSENT_COOKIE_NAME =
  "foreach_cookie_consent_v1";

export const COOKIE_CONSENT_EVENT_NAME =
  "foreach:cookie-consent-updated";

export const OPEN_COOKIE_SETTINGS_EVENT_NAME =
  "foreach:open-cookie-settings";

export type CookieConsentState = {
  version: 1;
  analytics: boolean;
  updatedAt: string;
  analyticsRevision?: string;
};

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function readCookieConsent(): CookieConsentState | null {
  if (!isBrowser()) {
    return null;
  }

  const cookiePrefix = `${COOKIE_CONSENT_COOKIE_NAME}=`;

  const cookieItem = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(cookiePrefix));

  if (!cookieItem) {
    return null;
  }

  try {
    const rawValue = cookieItem.slice(cookiePrefix.length);
    const parsedValue = JSON.parse(
      decodeURIComponent(rawValue),
    ) as Partial<CookieConsentState>;

    if (
      parsedValue.version !== 1 ||
      typeof parsedValue.analytics !== "boolean"
    ) {
      return null;
    }

    // An earlier agreement mentioning only GA4 does not opt a visitor into Yandex.
    // Keep an existing rejection valid; request a fresh choice only for old grants.
    if (
      YANDEX_METRICA_ID &&
      parsedValue.analytics &&
      parsedValue.analyticsRevision !== YANDEX_CONSENT_REVISION
    ) {
      return null;
    }

    return {
      version: 1,
      analytics: parsedValue.analytics,
      updatedAt:
        typeof parsedValue.updatedAt === "string"
          ? parsedValue.updatedAt
          : "",
      analyticsRevision: parsedValue.analyticsRevision,
    };
  } catch {
    return null;
  }
}

export function writeCookieConsent(
  analytics: boolean,
): CookieConsentState {
  const nextConsent: CookieConsentState = {
    version: 1,
    analytics,
    updatedAt: new Date().toISOString(),
    ...(YANDEX_METRICA_ID ? { analyticsRevision: YANDEX_CONSENT_REVISION } : {}),
  };

  if (!isBrowser()) {
    return nextConsent;
  }

  const secureAttribute =
    window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = [
    `${COOKIE_CONSENT_COOKIE_NAME}=${encodeURIComponent(
      JSON.stringify(nextConsent),
    )}`,
    "Path=/",
    `Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
    "SameSite=Lax",
    secureAttribute,
  ]
    .filter(Boolean)
    .join("; ");

  window.dispatchEvent(
    new CustomEvent<CookieConsentState>(
      COOKIE_CONSENT_EVENT_NAME,
      {
        detail: nextConsent,
      },
    ),
  );

  return nextConsent;
}

function expireCookie(
  cookieName: string,
  domain?: string,
) {
  if (!isBrowser()) {
    return;
  }

  const domainAttribute = domain
    ? `; Domain=${domain}`
    : "";

  document.cookie =
    `${cookieName}=; Path=/; Max-Age=0; SameSite=Lax${domainAttribute}`;
}

export function removeGoogleAnalyticsCookies() {
  if (!isBrowser()) {
    return;
  }

  const analyticsCookieNames = document.cookie
    .split(";")
    .map((item) => item.trim().split("=")[0])
    .filter(
      (name) =>
        name === "_ga" ||
        name === "_gid" ||
        name.startsWith("_ga_"),
    );

  const hostname = window.location.hostname;
  const domainCandidates = new Set<string | undefined>([
    undefined,
    hostname,
    `.${hostname}`,
  ]);

  // GA cookies may be scoped to the registrable parent domain (for example
  // .foreach-pump.com while the current host is www.foreach-pump.com).
  const hostnameParts = hostname.split(".").filter(Boolean);
  for (let index = 1; index < hostnameParts.length - 1; index += 1) {
    const parentDomain = hostnameParts.slice(index).join(".");
    domainCandidates.add(parentDomain);
    domainCandidates.add(`.${parentDomain}`);
  }

  for (const cookieName of analyticsCookieNames) {
    for (const domain of domainCandidates) {
      expireCookie(cookieName, domain);
    }
  }
}

export function openCookieSettings() {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(
    new Event(OPEN_COOKIE_SETTINGS_EVENT_NAME),
  );
}

export function removeYandexMetricaCookies() {
  if (!isBrowser()) return;
  const names = document.cookie.split(";").map((item) => item.trim().split("=")[0])
    .filter((name) => name.startsWith("_ym"));
  const hostname = window.location.hostname;
  const domains = new Set<string | undefined>([undefined, hostname, `.${hostname}`]);
  const parts = hostname.split(".");
  for (let index = 1; index < parts.length - 1; index += 1) {
    domains.add(`.${parts.slice(index).join(".")}`);
    domains.add(parts.slice(index).join("."));
  }
  for (const name of names) {
    for (const domain of domains) expireCookie(name, domain);
  }
  try {
    for (let index = window.localStorage.length - 1; index >= 0; index -= 1) {
      const key = window.localStorage.key(index);
      if (key?.startsWith("_ym")) window.localStorage.removeItem(key);
    }
  } catch {
    // Browsers may disallow localStorage; withdrawal must still work.
  }
}
