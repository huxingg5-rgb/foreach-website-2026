/**
 * Cloudflare Pages Functions｜旧版官网精确重定向
 *
 * 仅处理 www.foreachtek.com 上已确认的旧 ASPX 路径和旧产品 ID。
 * 裸域 foreachtek.com、foreachtek.com.cn、未知产品 ID 及其他路径全部放行。
 */

import {
  getLegacyProductTarget,
  type LegacyProductLanguage,
} from "./legacy-product-redirects";

interface LegacyRedirectContext {
  request: Request;
  next: () => Promise<Response>;
}

type LegacyRedirectHandler = (
  context: LegacyRedirectContext,
) => Response | Promise<Response>;

const BAIDU_VERIFY_PATH = "/baidu_verify_codeva-3SytZbh1AT.html";
const BAIDU_VERIFY_CONTENT = "8fba1099a7a52a28564eca6114d2396c";
const BYTEDANCE_VERIFY_PATH = "/ByteDanceVerify.html";
const BYTEDANCE_VERIFY_CONTENT = "ys91dEc0bPhktzcIz+Yb";
const LEGACY_PRODUCT_PATHS = new Map<string, LegacyProductLanguage>([
  ["/cn/ProductInfo.aspx", "cn"],
  ["/en/ProductInfo.aspx", "en"],
]);
const LEGACY_REDIRECTS = new Map<string, string>([
  ["/cn/history.aspx", "/"],
  ["/cn/NewsInfo.aspx", "/"],
  ["/cn/ProductIndex.aspx", "/"],
  ["/cn/contact.aspx", "/"],
  ["/cn/Index.aspx", "/"],
  ["/en/history.aspx", "/en/"],
  ["/en/News.aspx", "/en/"],
  ["/en/DownList.aspx", "/en/"],
  ["/en/ProductIndex.aspx", "/en/"],
  ["/en/JobList.aspx", "/en/"],
  ["/en/aboutInfo.aspx", "/en/"],
  ["/en/NewsList.aspx", "/en/"],
  ["/en/contact.aspx", "/en/"],
]);

export const onRequest: LegacyRedirectHandler = async ({
  request,
  next,
}) => {
  const method = request.method.toUpperCase();

  if (method !== "GET" && method !== "HEAD") {
    return next();
  }

  const requestUrl = new URL(request.url);

  if (requestUrl.hostname.toLowerCase() !== "www.foreachtek.com") {
    return next();
  }

  // 百度站点文件验证必须保持原始 .html 地址，并直接返回 200。
  if (requestUrl.pathname === BAIDU_VERIFY_PATH) {
    return new Response(
      method === "HEAD" ? null : BAIDU_VERIFY_CONTENT,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
        },
      },
    );
  }

  // 今日头条站点文件验证必须保持原始 .html 地址，并直接返回 200。
  if (requestUrl.pathname === BYTEDANCE_VERIFY_PATH) {
    return new Response(
      method === "HEAD" ? null : BYTEDANCE_VERIFY_CONTENT,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
        },
      },
    );
  }

  const legacyProductLanguage = LEGACY_PRODUCT_PATHS.get(
    requestUrl.pathname,
  );

  if (legacyProductLanguage) {
    const targetPath = getLegacyProductTarget(
      requestUrl.searchParams.get("Id"),
      legacyProductLanguage,
    );

    // 未确认的 ID 不做猜测性永久跳转，交回原站点行为并保留监控能力。
    if (!targetPath) {
      return next();
    }

    const targetUrl = new URL(targetPath, "https://www.foreachtek.com");

    return new Response(null, {
      status: 301,
      headers: {
        Location: targetUrl.toString(),
      },
    });
  }

  const targetPath = LEGACY_REDIRECTS.get(requestUrl.pathname);

  if (!targetPath) {
    return next();
  }

  const targetUrl = new URL(requestUrl);

  targetUrl.protocol = "https:";
  targetUrl.hostname = "www.foreachtek.com";
  targetUrl.port = "";
  targetUrl.pathname = targetPath;
  targetUrl.search = "";
  targetUrl.hash = "";

  return new Response(null, {
    status: 301,
    headers: {
      Location: targetUrl.toString(),
    },
  });
};
