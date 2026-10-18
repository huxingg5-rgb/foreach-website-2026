import { localizeValvelessPumpCategoryPath } from "@/data/products/selection/valveless-pump-routes";
import { getTubingLanguagePath } from "@/data/products/selection/tubing-selection-routes";
import type { LocaleCode } from "@/lib/i18n";

const LOCALE_PATH_PREFIXES = ["en", "es", "fr", "ko", "ru"] as const;

type LocalePathPrefix = (typeof LOCALE_PATH_PREFIXES)[number];

/* ================================
   判断某个字符串是否是官网语言前缀
   例子：
   en → true
   zh-CN → false，因为中文不放在 URL 前缀里
   products → false
================================ */
function isLocalePathPrefix(value: string): value is LocalePathPrefix {
  return LOCALE_PATH_PREFIXES.includes(value as LocalePathPrefix);
}

/* ================================
   清理路径格式
   作用：
   1. 只保留 pathname，不处理 query 和 hash
   2. 确保路径始终以 / 开头
   3. 避免出现空路径
================================ */
function normalizePathname(pathname: string) {
  const pathOnly = pathname.split("?")[0]?.split("#")[0] || "/";

  if (!pathOnly.startsWith("/")) {
    return `/${pathOnly}`;
  }

  return pathOnly || "/";
}

/* ================================
   去掉路径中的语言前缀
   例子：
   /en/resources/datasheets → /resources/datasheets
   /es/about/history → /about/history
   /fr → /
   /about/history → /about/history
================================ */
export function stripLocalePrefixFromPath(pathname: string) {
  const pathOnly = normalizePathname(pathname);

  const pathParts = pathOnly.split("/").filter(Boolean);

  const firstPart = pathParts[0];

  if (firstPart && isLocalePathPrefix(firstPart)) {
    const restPath = pathParts.slice(1).join("/");

    return restPath ? `/${restPath}` : "/";
  }

  return pathOnly;
}

/* ================================
   根据语言代码获取 URL 前缀
   说明：
   1. 中文返回空字符串，因为中文路径不加 /zh-CN
   2. 外语返回对应前缀
================================ */
function getLocalePathPrefix(localeCode: LocaleCode) {
  switch (localeCode) {
    case "zh-CN":
      return "";

    case "en":
      return "/en";

    case "es":
      return "/es";

    case "fr":
      return "/fr";

    case "ko":
      return "/ko";

    case "ru":
      return "/ru";

    default:
      return "";
  }
}

/* ================================
   根据目标语言生成新路径
   例子：
   当前 /resources/datasheets，切英文 → /en/resources/datasheets
   当前 /en/resources/datasheets，切法文 → /fr/resources/datasheets
   当前 /fr/resources/datasheets，切中文 → /resources/datasheets
   当前 /en，切中文 → /
================================ */
function buildLocalizedPathname(pathname: string, localeCode: LocaleCode) {
  if (localeCode !== "zh-CN" && localeCode !== "en") {
    const source = normalizePathname(pathname).replace(/\/$/, "");
    const probe = source.match(/^\/en\/products\/probes\/selection\/(sampling-probes|piercing-probes|wash-probes|stirring-paddles)$/)?.[1];
    if (probe) return `/${localeCode}/products/probes/${probe}/`;
    // These locales have the control selector and model pages, but not the
    // English control category routes. Use their existing localized entries.
    if (source === "/en/products/control") return `/${localeCode}/products/?category=control`;
    if (source === "/en/products/control/pressure-sensors") return `/${localeCode}/products/control/pdm5-pressure-sensor/`;
    if (source === "/en/products/control/air-bubble-detectors") return `/${localeCode}/products/control/air-bubble-detectors/abd/`;
  }
  if (/^\/(?:en|es|fr|ko|ru)\/applications\/ivd(?:\/|$)/.test(pathname)) {
    return localeCode === "zh-CN" ? "/applications/ivd/" : pathname.replace(/^\/(?:en|es|fr|ko|ru)/, `/${localeCode}`);
  }
  if (/^\/(?:en|es|fr|ko|ru)\/applications\/?$/.test(pathname) && localeCode === "zh-CN") {
    return "/applications/ivd/";
  }
  if (/^\/(?:en|es|fr|ko|ru)\/products\/tubing-assemblies(?:\/|$)/.test(pathname)) {
    if (localeCode === "zh-CN") return "/products/";
    const assemblyPath = pathname.replace(/^\/(?:en|es|fr|ko|ru)/, "");
    return `/${localeCode}${assemblyPath.replace(/\/?$/, "/")}`;
  }
  const tubingPath = getTubingLanguagePath(pathname, localeCode);
  if (tubingPath) return tubingPath;
  const productLocalizedPath = localizeValvelessPumpCategoryPath(
    stripLocalePrefixFromPath(pathname), localeCode,
  );
  const pathWithoutLocale = productLocalizedPath;

  const localePrefix = getLocalePathPrefix(localeCode);

  if (!localePrefix) {
    return pathWithoutLocale;
  }

  return pathWithoutLocale === "/"
    ? localePrefix
    : `${localePrefix}${pathWithoutLocale}`;
}

/** One destination for normal clicks, modified clicks and native link actions. */
export function getLanguageHref(pathname: string, locale: LocaleCode, suffix = "") {
  const domain = pathname.match(/^\/(?:en|es|fr|ko|ru)\/applications\/(life-science|lab-automation|analytical-instruments|environmental-monitoring|synthetic-biology)\/[^/]+/)?.[1];
  const useDomainHub = Boolean(domain && locale === "zh-CN");
  // Chinese lists still use their original client pagination, so the foreign
  // static /page/N/ routes must switch to the corresponding Chinese list root.
  const chinesePaginationBase = locale === "zh-CN"
    ? normalizePathname(pathname).match(/^(\/(?:en|es|fr|ko|ru)\/(?:products\/.+|resources\/technical-articles))\/page\/(?:[2-9]\d*|1\d+)\/?$/)?.[1]
    : undefined;
  // YouTube detail slugs are generated only by the foreign detail route; the
  // Chinese route generates the original Chinese guide IDs instead. The SV10
  // overview is English-only, so its other language choices use their guide hub.
  const normalizedSource = normalizePathname(pathname);
  const useInstallationGuideHub =
    (locale === "zh-CN" && /^\/(?:en|es|fr|ko|ru)\/resources\/installation-guide\/youtube-[^/]+\/?$/.test(normalizedSource)) ||
    (locale !== "en" && /^\/en\/resources\/installation-guide\/sv10-solenoid-valve-overview\/?$/.test(normalizedSource));
  const sourcePath = useDomainHub ? `/en/applications/${domain}/`
    : useInstallationGuideHub ? "/resources/installation-guide/"
    : chinesePaginationBase ?? pathname;
  const localizedPath = buildLocalizedPathname(sourcePath, locale);
  const target = new URL(localizedPath, "https://www.foreachtek.com");
  target.pathname = target.pathname === "/" ? "/" : target.pathname.replace(/\/+$/, "") + "/";
  const url = new URL(pathname + suffix, "https://www.foreachtek.com");
  url.searchParams.delete("lang");
  url.searchParams.delete("locale");
  if (chinesePaginationBase) url.searchParams.delete("page");
  // A localized category fallback can carry its own selector (for example productType).
  // Keep that selector authoritative while retaining unrelated source parameters.
  const targetKeys = new Set(target.searchParams.keys());
  for (const [key, value] of url.searchParams) {
    if (!targetKeys.has(key)) target.searchParams.append(key, value);
  }
  // Section IDs from a deep document do not identify sections in its hub fallback.
  const useIvdHub = locale === "zh-CN" && /^\/(?:en|es|fr|ko|ru)\/applications\/ivd(?:\/|$)/.test(pathname);
  const hash = useDomainHub || useIvdHub || useInstallationGuideHub ? "" : target.hash || url.hash;
  return target.pathname + target.search + hash;
}
