import type { LocaleCode } from "@/data/languages";

export const SITE_ORIGIN = "https://www.foreachtek.com";
export const SITE_URL = new URL(SITE_ORIGIN);

const INTERNATIONAL_LOCALES = new Set<LocaleCode>([
  "en",
  "es",
  "fr",
  "ko",
  "ru",
]);

function hasFileExtension(pathname: string) {
  const lastSegment = pathname.split("/").filter(Boolean).at(-1) ?? "";
  return /\.[a-z0-9]{1,10}$/i.test(lastSegment);
}

function isNonNavigationalHref(value: string) {
  return (
    value === "" ||
    value === "#" ||
    value.startsWith("#") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("javascript:") ||
    value.startsWith("data:")
  );
}

/**
 * Apply the production URL policy to an internal href while preserving its
 * query string and fragment. External URLs and non-navigation hrefs pass
 * through unchanged.
 */
export function normalizeSiteHref(value: string) {
  const href = value.trim();
  if (isNonNavigationalHref(href)) return value;

  const isAbsolute = /^https?:\/\//i.test(href);
  const isRootRelative = href.startsWith("/") && !href.startsWith("//");
  if (!isAbsolute && !isRootRelative) return value;

  let url: URL;
  try {
    url = new URL(href, SITE_ORIGIN);
  }
  catch {
    return value;
  }

  if (isAbsolute && !/(^|\.)foreachtek\.com$/i.test(url.hostname)) {
    return value;
  }

  if (url.pathname !== "/" && !hasFileExtension(url.pathname)) {
    url.pathname = `${url.pathname.replace(/\/+$/, "")}/`;
  }

  if (!isAbsolute) {
    return `${url.pathname}${url.search}${url.hash}`;
  }

  url.protocol = "https:";
  url.hostname = SITE_URL.hostname;
  url.port = "";
  return url.toString();
}

/** Return an absolute, query-free canonical URL on the production origin. */
export function getCanonicalUrl(value: string) {
  const normalizedHref = normalizeSiteHref(value);
  const url = new URL(normalizedHref, SITE_ORIGIN);
  url.protocol = "https:";
  url.hostname = SITE_URL.hostname;
  url.port = "";
  url.search = "";
  url.hash = "";
  return url.toString();
}

/** Prefix a canonical internal path with a locale without duplicating it. */
export function getLocalizedSiteHref(value: string, locale: LocaleCode) {
  const normalizedHref = normalizeSiteHref(value);
  if (!normalizedHref.startsWith("/")) return normalizedHref;

  const url = new URL(normalizedHref, SITE_ORIGIN);
  const segments = url.pathname.split("/").filter(Boolean);

  if (segments[0] && INTERNATIONAL_LOCALES.has(segments[0] as LocaleCode)) {
    segments.shift();
  }

  if (locale !== "zh-CN") segments.unshift(locale);

  const localizedPath = segments.length > 0 ? `/${segments.join("/")}/` : "/";
  return `${localizedPath}${url.search}${url.hash}`;
}
