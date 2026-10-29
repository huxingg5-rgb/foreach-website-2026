import type { UrlObject } from "url";
import type { LocaleCode } from "@/lib/i18n";

/** Only bottom-banner links to our inquiry form become modal triggers. */
export function getContactInquiryLocale(href: string | UrlObject): LocaleCode | null {
  const origin = "https://www.foreachtek.com";
  let url: URL;
  try {
    if (typeof href === "string") {
      // A page-local anchor must keep its existing scrolling behavior.
      if (!href.startsWith("/") && !/^https?:\/\//i.test(href)) return null;
      url = new URL(href, origin);
    } else {
      if (href.protocol && !["http:", "https:"].includes(href.protocol)) return null;
      const host = href.hostname || href.host;
      if (host && !["www.foreachtek.com", "foreachtek.com"].includes(host)) return null;
      if (!href.pathname?.startsWith("/")) return null;
      url = new URL(href.pathname, origin);
      url.hash = href.hash || "";
    }
  } catch {
    return null;
  }
  if (!["http:", "https:"].includes(url.protocol) ||
      !["www.foreachtek.com", "foreachtek.com"].includes(url.hostname) ||
      (url.hash && url.hash !== "#form")) return null;
  const match = /^\/(?:(en|es|fr|ko|ru)\/)?contact\/?$/.exec(url.pathname);
  return match ? (match[1] as LocaleCode || "zh-CN") : null;
}
