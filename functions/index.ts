/**
 * Cloudflare Pages Functions｜官网根首页语言定位
 *
 * 文件：
 * functions/index.ts
 *
 * 路由：
 * /
 *
 * 判断优先级：
 * 1. 用户手动选择并保存的语言 Cookie
 * 2. 浏览器 Accept-Language
 * 3. 官网未支持的语言默认进入英文
 *
 * 说明：
 * 1. 中文页面继续使用根路径 /
 * 2. 不使用 IP 或国家定位
 * 3. 搜索引擎爬虫不自动跳转
 * 4. 仅处理 GET 和 HEAD 请求
 */

type WebsiteLocale =
  | "zh-CN"
  | "en"
  | "es"
  | "fr"
  | "ko"
  | "ru";

interface RootLanguageContext {
  request: Request;

  /**
   * 继续返回下一层 Function 或静态页面。
   */
  next: () => Promise<Response>;
}

type RootLanguageHandler = (
  context: RootLanguageContext,
) => Response | Promise<Response>;

const SUPPORTED_LOCALES: WebsiteLocale[] = [
  "zh-CN",
  "en",
  "es",
  "fr",
  "ko",
  "ru",
];

const LOCALE_PATHS: Record<
  WebsiteLocale,
  string
> = {
  "zh-CN": "/",
  en: "/en/",
  es: "/es/",
  fr: "/fr/",
  ko: "/ko/",
  ru: "/ru/",
};

const PREFERENCE_COOKIE_NAMES = [
  "foreach_locale",
  "NEXT_LOCALE",
  "lang",
];

/* =========================================================
   将不同语言格式转换成官网语言代码
========================================================= */

function normalizeLocale(
  value: string | null | undefined,
): WebsiteLocale | null {
  if (!value) {
    return null;
  }

  const normalized =
    String(value)
      .trim()
      .replaceAll("_", "-")
      .toLowerCase();

  /*
   * 当前官网只有一套中文页面。
   * 简体、繁体中文浏览器都进入中文根路径。
   */
  if (
    normalized === "zh" ||
    normalized === "zh-cn" ||
    normalized === "zh-sg" ||
    normalized === "zh-hans" ||
    normalized === "zh-tw" ||
    normalized === "zh-hk" ||
    normalized === "zh-mo" ||
    normalized === "zh-hant"
  ) {
    return "zh-CN";
  }

  if (
    normalized === "en" ||
    normalized.startsWith("en-")
  ) {
    return "en";
  }

  if (
    normalized === "es" ||
    normalized.startsWith("es-")
  ) {
    return "es";
  }

  if (
    normalized === "fr" ||
    normalized.startsWith("fr-")
  ) {
    return "fr";
  }

  if (
    normalized === "ko" ||
    normalized.startsWith("ko-")
  ) {
    return "ko";
  }

  if (
    normalized === "ru" ||
    normalized.startsWith("ru-")
  ) {
    return "ru";
  }

  return null;
}

/* =========================================================
   读取 Cookie
========================================================= */

function readCookie(
  cookieHeader: string,
  name: string,
): string | null {
  if (!cookieHeader) {
    return null;
  }

  const encodedName =
    `${encodeURIComponent(name)}=`;

  const cookieParts =
    cookieHeader.split(";");

  for (const rawPart of cookieParts) {
    const cookiePart = rawPart.trim();

    if (
      !cookiePart.startsWith(encodedName)
    ) {
      continue;
    }

    const rawValue =
      cookiePart.slice(
        encodedName.length,
      );

    try {
      return decodeURIComponent(rawValue);
    }
    catch {
      return rawValue;
    }
  }

  return null;
}

/* =========================================================
   读取用户手动保存的语言
========================================================= */

function readSavedLocale(
  request: Request,
): WebsiteLocale | null {
  const cookieHeader =
    request.headers.get("Cookie") || "";

  for (
    const cookieName
    of PREFERENCE_COOKIE_NAMES
  ) {
    const locale =
      normalizeLocale(
        readCookie(
          cookieHeader,
          cookieName,
        ),
      );

    if (
      locale &&
      SUPPORTED_LOCALES.includes(locale)
    ) {
      return locale;
    }
  }

  return null;
}

/* =========================================================
   根据 Accept-Language 判断浏览器语言
========================================================= */

function detectBrowserLocale(
  request: Request,
): WebsiteLocale {
  const acceptLanguage =
    request.headers.get(
      "Accept-Language",
    );

  if (!acceptLanguage) {
    return "en";
  }

  /*
   * 示例：
   * fr-CA,fr;q=0.9,en;q=0.8
   *
   * 按 q 权重从高到低判断。
   */
  const languageItems =
    acceptLanguage
      .split(",")
      .map((item, index) => {
        const parts =
          item.trim().split(";");

        const languageTag =
          parts[0]?.trim() || "";

        const qualityPart =
          parts
            .slice(1)
            .find((part) =>
              part.trim().startsWith("q="),
            );

        const parsedQuality =
          qualityPart
            ? Number(
                qualityPart
                  .trim()
                  .slice(2),
              )
            : 1;

        return {
          languageTag,
          quality:
            Number.isFinite(
              parsedQuality,
            )
              ? parsedQuality
              : 0,
          index,
        };
      })
      .filter(
        (item) =>
          item.languageTag &&
          item.quality > 0,
      )
      .sort((first, second) => {
        if (
          first.quality !==
          second.quality
        ) {
          return (
            second.quality -
            first.quality
          );
        }

        return first.index - second.index;
      });

  for (const item of languageItems) {
    const locale =
      normalizeLocale(
        item.languageTag,
      );

    if (
      locale &&
      SUPPORTED_LOCALES.includes(locale)
    ) {
      return locale;
    }
  }

  /*
   * 德语、日语、葡萄牙语、
   * 意大利语等当前未支持语言进入英文。
   */
  return "en";
}

/* =========================================================
   判断搜索引擎爬虫
========================================================= */

function isSearchBot(
  request: Request,
): boolean {
  const userAgent =
    request.headers.get(
      "User-Agent",
    ) || "";

  return /bot|crawler|spider|slurp|bingpreview|google-inspectiontool|facebookexternalhit|yandex|baiduspider/i.test(
    userAgent,
  );
}

/* =========================================================
   生成语言 Cookie
========================================================= */

function buildLocaleCookie(
  name: string,
  locale: WebsiteLocale,
): string {
  return (
    `${encodeURIComponent(name)}=` +
    `${encodeURIComponent(locale)}` +
    "; Path=/" +
    "; Max-Age=31536000" +
    "; SameSite=Lax"
  );
}

/* =========================================================
   GET / 和 HEAD /
========================================================= */

export const onRequest:
  RootLanguageHandler = async ({
    request,
    next,
  }) => {
    const method =
      request.method.toUpperCase();

    /*
     * 根首页仅对普通页面访问执行语言判断。
     */
    if (
      method !== "GET" &&
      method !== "HEAD"
    ) {
      return next();
    }

    /*
     * 搜索引擎继续读取中文默认首页，
     * 避免自动跳转影响根首页收录。
     */
    if (isSearchBot(request)) {
      return next();
    }

    const savedLocale =
      readSavedLocale(request);

    const targetLocale =
      savedLocale ||
      detectBrowserLocale(request);

    /*
     * 中文默认首页就是 /，
     * 继续返回静态首页。
     */
    if (targetLocale === "zh-CN") {
      return next();
    }

    const targetPath =
      LOCALE_PATHS[targetLocale] ||
      "/en/";

    const requestUrl =
      new URL(request.url);

    /*
     * 保留 UTM 等查询参数。
     * URL hash 不会被浏览器发送到服务器，
     * 因此由现有前端兜底脚本负责特殊 hash 场景。
     */
    requestUrl.pathname =
      targetPath;

    requestUrl.searchParams.delete(
      "lang",
    );

    requestUrl.searchParams.delete(
      "locale",
    );

    const responseHeaders =
      new Headers();

    responseHeaders.set(
      "Location",
      requestUrl.toString(),
    );

    responseHeaders.set(
      "Cache-Control",
      "private, no-store",
    );

    responseHeaders.set(
      "Vary",
      "Accept-Language, Cookie",
    );

    /*
     * 同时写入三个现有语言偏好名称，
     * 与 SiteHeader 和浏览器端兜底逻辑保持一致。
     */
    for (
      const cookieName
      of PREFERENCE_COOKIE_NAMES
    ) {
      responseHeaders.append(
        "Set-Cookie",
        buildLocaleCookie(
          cookieName,
          targetLocale,
        ),
      );
    }

    /*
     * 使用临时 307 跳转：
     * 不让浏览器永久缓存错误语言。
     */
    return new Response(null, {
      status: 307,
      headers: responseHeaders,
    });
  };