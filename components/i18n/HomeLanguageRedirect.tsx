import Script from "next/script";

/**
 * HomeLanguageRedirect
 *
 * 只在中文根首页 / 中使用。
 *
 * 判断优先级：
 * 1. 用户以前手动选择的语言
 * 2. 浏览器语言
 * 3. 无法识别时默认英文
 *
 * 注意：
 * - 中文路径仍然是 /
 * - 英文路径是 /en/
 * - 西语路径是 /es/
 * - 法语路径是 /fr/
 * - 韩语路径是 /ko/
 * - 俄语路径是 /ru/
 * - 不根据 IP 判断国家
 * - 不在产品页、详情页或其他页面强制跳转
 */

const HOME_LANGUAGE_REDIRECT_SCRIPT = String.raw`
(function () {
  "use strict";

  // 只允许在根首页执行。
  if (window.location.pathname !== "/") {
    return;
  }

  // 搜索引擎爬虫不自动跳转，避免影响首页收录和 SEO。
  var userAgent = navigator.userAgent || "";
  var isSearchBot =
    /bot|crawler|spider|slurp|bingpreview|google-inspectiontool|facebookexternalhit|yandex|baiduspider/i.test(
      userAgent
    );

  if (isSearchBot) {
    return;
  }

  // 官网支持的语言。
  var supportedLocales = ["zh-CN", "en", "es", "fr", "ko", "ru"];

  // 语言与首页路径对应关系。
  var localePaths = {
    "zh-CN": "/",
    en: "/en/",
    es: "/es/",
    fr: "/fr/",
    ko: "/ko/",
    ru: "/ru/"
  };

  // 当前项目中已经使用的语言偏好名称。
  var preferenceKeys = ["foreach_locale", "NEXT_LOCALE", "lang"];

  /**
   * 将不同格式的语言代码统一成官网语言代码。
   */
  function normalizeLocale(value) {
    if (!value) {
      return null;
    }

    var normalized = String(value).trim().toLowerCase();

    if (
      normalized === "zh" ||
      normalized === "zh-cn" ||
      normalized === "zh-hans" ||
      normalized === "zh-sg" ||
      normalized === "zh-tw" ||
      normalized === "zh-hk" ||
      normalized === "zh-hant"
    ) {
      return "zh-CN";
    }

    if (normalized === "en" || normalized.indexOf("en-") === 0) {
      return "en";
    }

    if (normalized === "es" || normalized.indexOf("es-") === 0) {
      return "es";
    }

    if (normalized === "fr" || normalized.indexOf("fr-") === 0) {
      return "fr";
    }

    if (normalized === "ko" || normalized.indexOf("ko-") === 0) {
      return "ko";
    }

    if (normalized === "ru" || normalized.indexOf("ru-") === 0) {
      return "ru";
    }

    return null;
  }

  /**
   * 读取指定 Cookie。
   */
  function readCookie(name) {
    try {
      var prefix = encodeURIComponent(name) + "=";
      var cookieParts = document.cookie ? document.cookie.split(";") : [];

      for (var index = 0; index < cookieParts.length; index += 1) {
        var cookiePart = cookieParts[index].trim();

        if (cookiePart.indexOf(prefix) === 0) {
          return decodeURIComponent(cookiePart.slice(prefix.length));
        }
      }
    } catch (error) {
      // 浏览器限制 Cookie 时继续使用其他方式。
    }

    return null;
  }

  /**
   * 优先读取用户以前手动选择的语言。
   */
  function readSavedLocale() {
    // 先读取 localStorage。
    try {
      for (var index = 0; index < preferenceKeys.length; index += 1) {
        var storageValue = window.localStorage.getItem(preferenceKeys[index]);
        var normalizedStorageLocale = normalizeLocale(storageValue);

        if (
          normalizedStorageLocale &&
          supportedLocales.indexOf(normalizedStorageLocale) !== -1
        ) {
          return normalizedStorageLocale;
        }
      }
    } catch (error) {
      // 隐私模式或浏览器限制 localStorage 时，继续读取 Cookie。
    }

    // 再读取 Cookie。
    for (var cookieIndex = 0; cookieIndex < preferenceKeys.length; cookieIndex += 1) {
      var cookieValue = readCookie(preferenceKeys[cookieIndex]);
      var normalizedCookieLocale = normalizeLocale(cookieValue);

      if (
        normalizedCookieLocale &&
        supportedLocales.indexOf(normalizedCookieLocale) !== -1
      ) {
        return normalizedCookieLocale;
      }
    }

    return null;
  }

  /**
   * 根据浏览器语言判断官网语言。
   *
   * 浏览器语言不属于官网支持范围时，统一返回英文。
   */
  function detectBrowserLocale() {
    var browserLanguages = [];

    if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
      browserLanguages = navigator.languages;
    } else if (navigator.language) {
      browserLanguages = [navigator.language];
    }

    for (var index = 0; index < browserLanguages.length; index += 1) {
      var matchedLocale = normalizeLocale(browserLanguages[index]);

      if (
        matchedLocale &&
        supportedLocales.indexOf(matchedLocale) !== -1
      ) {
        return matchedLocale;
      }
    }

    // 德语、日语、意大利语、葡萄牙语等未适配语言统一进入英文。
    return "en";
  }

  /**
   * 保存最终语言选择。
   *
   * 后续用户在 Header 手动切换语言时，会覆盖这些值。
   */
  function saveLocale(locale) {
    try {
      window.localStorage.setItem("foreach_locale", locale);
      window.localStorage.setItem("NEXT_LOCALE", locale);
      window.localStorage.setItem("lang", locale);
    } catch (error) {
      // localStorage 不可用时仍可依靠 Cookie。
    }

    try {
      var cookieValue =
        encodeURIComponent(locale) +
        "; path=/; max-age=31536000; SameSite=Lax";

      document.cookie = "foreach_locale=" + cookieValue;
      document.cookie = "NEXT_LOCALE=" + cookieValue;
      document.cookie = "lang=" + cookieValue;
    } catch (error) {
      // Cookie 不可用时不阻止页面继续显示。
    }
  }

  // 第一优先级：用户以前选择的语言。
  var savedLocale = readSavedLocale();

  // 第二优先级：浏览器语言。
  // 第三优先级已经包含在 detectBrowserLocale 中，默认是英文。
  var targetLocale = savedLocale || detectBrowserLocale();

  saveLocale(targetLocale);

  // 中文本身就是根路径，不需要跳转。
  if (targetLocale === "zh-CN") {
    document.documentElement.setAttribute("lang", "zh-CN");
    return;
  }

  var targetPath = localePaths[targetLocale] || "/en/";

  // 保留 UTM 等查询参数，但删除旧语言参数。
  var searchParams = new URLSearchParams(window.location.search);

  searchParams.delete("lang");
  searchParams.delete("locale");

  var queryString = searchParams.toString();

  var targetUrl =
    targetPath +
    (queryString ? "?" + queryString : "") +
    window.location.hash;

  // replace 不会让浏览器返回键再次回到自动跳转页。
  window.location.replace(targetUrl);
})();
`;

export default function HomeLanguageRedirect() {
  return (
    <Script
      id="foreach-home-language-redirect"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: HOME_LANGUAGE_REDIRECT_SCRIPT,
      }}
    />
  );
}