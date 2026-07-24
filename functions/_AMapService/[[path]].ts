/**
 * Cloudflare Pages Functions｜高德地图安全代理
 *
 * 路由：
 * /_AMapService/*
 *
 * 文件：
 * functions/_AMapService/[[path]].ts
 *
 * 环境变量：
 * AMAP_SECURITY_JS_CODE
 *
 * 说明：
 * 1. 浏览器只持有公开的 NEXT_PUBLIC_AMAP_KEY
 * 2. 安全密钥只保存在 Cloudflare 服务端
 * 3. 当前 Function 在服务端向高德请求追加 jscode
 */

interface AmapProxyEnv {
  AMAP_SECURITY_JS_CODE: string;
}

interface AmapProxyContext {
  request: Request;

  env: AmapProxyEnv;

  params: {
    path?: string | string[];
  };
}

type AmapProxyHandler = (
  context: AmapProxyContext,
) => Response | Promise<Response>;

/* =========================================================
   返回纯文本错误
========================================================= */

function textResponse(
  message: string,
  status: number,
) {
  return new Response(message, {
    status,

    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

/* =========================================================
   读取 Cloudflare 动态路由参数
========================================================= */

function readPathSegments(
  pathValue: string | string[] | undefined,
) {
  if (Array.isArray(pathValue)) {
    return pathValue;
  }

  if (
    typeof pathValue === "string" &&
    pathValue
  ) {
    return [pathValue];
  }

  return [];
}

/* =========================================================
   GET /_AMapService/*
========================================================= */

export const onRequestGet: AmapProxyHandler = async ({
  request,
  env,
  params,
}) => {
  const securityJsCode = String(
    env.AMAP_SECURITY_JS_CODE || "",
  ).trim();

  if (!securityJsCode) {
    return textResponse(
      "AMap proxy is not configured.",
      503,
    );
  }

  const pathSegments = readPathSegments(
    params.path,
  );

  /*
   * 代理目标域名由代码固定。
   * 同时拒绝异常路径，避免被当作通用代理使用。
   */
  if (
    pathSegments.length === 0 ||
    pathSegments.some(
      (segment) =>
        !segment ||
        segment === "." ||
        segment === ".." ||
        segment.includes("\\") ||
        segment.includes(":"),
    )
  ) {
    return textResponse(
      "Invalid AMap proxy path.",
      400,
    );
  }

  const encodedPath = pathSegments
    .map(encodeURIComponent)
    .join("/");

  /*
   * 高德自定义地图样式使用 webapi.amap.com。
   * 其他 Web 服务请求使用 restapi.amap.com。
   */
  const isCustomMapStyle = encodedPath.startsWith(
    "v4/map/styles",
  );

  const upstreamOrigin = isCustomMapStyle
    ? "https://webapi.amap.com/"
    : "https://restapi.amap.com/";

  const incomingUrl = new URL(request.url);

  const upstreamUrl = new URL(
    encodedPath,
    upstreamOrigin,
  );

  /*
   * 复制原请求参数。
   * 浏览器不能自行传入或覆盖 jscode。
   */
  incomingUrl.searchParams.forEach(
    (value, key) => {
      if (key.toLowerCase() !== "jscode") {
        upstreamUrl.searchParams.append(
          key,
          value,
        );
      }
    },
  );

  upstreamUrl.searchParams.set(
    "jscode",
    securityJsCode,
  );

  const upstreamHeaders = new Headers();

  const accept = request.headers.get("Accept");

  const acceptLanguage =
    request.headers.get("Accept-Language");

  const referer =
    request.headers.get("Referer");

  const userAgent =
    request.headers.get("User-Agent");

  if (accept) {
    upstreamHeaders.set("Accept", accept);
  }

  if (acceptLanguage) {
    upstreamHeaders.set(
      "Accept-Language",
      acceptLanguage,
    );
  }

  if (referer) {
    upstreamHeaders.set("Referer", referer);
  }

  if (userAgent) {
    upstreamHeaders.set(
      "User-Agent",
      userAgent,
    );
  }

  const upstreamResponse = await fetch(
    upstreamUrl,
    {
      method: "GET",
      headers: upstreamHeaders,
      redirect: "follow",
    },
  );

  const responseHeaders = new Headers();

  /*
   * 只返回地图服务需要的响应头。
   * 不透传 Cookie 等无关响应头。
   */
  for (const headerName of [
    "Cache-Control",
    "Content-Type",
    "ETag",
    "Expires",
    "Last-Modified",
  ]) {
    const headerValue =
      upstreamResponse.headers.get(headerName);

    if (headerValue) {
      responseHeaders.set(
        headerName,
        headerValue,
      );
    }
  }

  responseHeaders.set(
    "X-Content-Type-Options",
    "nosniff",
  );

  return new Response(
    upstreamResponse.body,
    {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders,
    },
  );
};