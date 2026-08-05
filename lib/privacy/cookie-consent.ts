/* =========================================================
   lib/privacy/cookie-consent.ts
   FOREACH 官网 Cookie 同意状态管理

   说明：
   1. 仅在浏览器中读取和写入同意状态
   2. 不使用 Next.js 服务端 cookies()
   3. 同意状态 Cookie 属于维持用户隐私选择所需的必要 Cookie
   4. 分析权限关闭时，尝试清除 Google Analytics Cookie
========================================================= */

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

    return {
      version: 1,
      analytics: parsedValue.analytics,
      updatedAt:
        typeof parsedValue.updatedAt === "string"
          ? parsedValue.updatedAt
          : "",
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
