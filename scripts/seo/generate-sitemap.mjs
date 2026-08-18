/**
 * 根据 Cloudflare Pages 的静态导出目录 out 自动生成 sitemap.xml。
 *
 * 使用方式：
 *   node scripts/seo/generate-sitemap.mjs
 *
 * 生成位置：
 *   out/sitemap.xml
 *
 * 原则：
 * - 只收录实际构建成功的 HTML 页面
 * - 自动排除 404、搜索页、API、Next.js 内部目录和 noindex 页面
 * - URL 去重
 * - 不伪造 lastModified
 */

import {
  readdir,
  readFile,
  stat,
  writeFile,
} from "node:fs/promises";

import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, "out");
const siteOrigin = "https://www.foreachtek.com";

const supportedLocales = new Set([
  "en",
  "es",
  "fr",
  "ko",
  "ru",
]);

const excludedFileNames = new Set([
  "404.html",
  "500.html",
]);

const excludedDirectoryNames = new Set([
  "_next",
  "api",
]);

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    if (
      entry.name.startsWith(".") ||
      excludedDirectoryNames.has(entry.name.toLowerCase())
    ) {
      continue;
    }

    const absolutePath = path.join(
      directory,
      entry.name,
    );

    if (entry.isDirectory()) {
      files.push(
        ...(await collectHtmlFiles(absolutePath)),
      );
      continue;
    }

    if (
      entry.isFile() &&
      entry.name.toLowerCase().endsWith(".html")
    ) {
      files.push(absolutePath);
    }
  }

  return files;
}

function filePathToRoute(absolutePath) {
  const relativePath = path
    .relative(outputRoot, absolutePath)
    .split(path.sep)
    .join("/");

  if (relativePath === "index.html") {
    return "/";
  }

  if (relativePath.endsWith("/index.html")) {
    return `/${relativePath.slice(
      0,
      -"/index.html".length,
    )}/`;
  }

  if (relativePath.endsWith(".html")) {
    return `/${relativePath.slice(
      0,
      -".html".length,
    )}/`;
  }

  return null;
}

function isSearchRoute(route) {
  const segments = route
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.toLowerCase());

  if (segments[0] === "search") {
    return true;
  }

  return (
    supportedLocales.has(segments[0]) &&
    segments[1] === "search"
  );
}

function isSystemRoute(route) {
  const lowerRoute = route.toLowerCase();

  return (
    lowerRoute === "/404/" ||
    lowerRoute === "/500/" ||
    lowerRoute.includes("/_not-found/") ||
    lowerRoute.includes("/api/")
  );
}

function isVerificationRoute(route) {
  const firstSegment = route
    .split("/")
    .filter(Boolean)[0]
    ?.toLowerCase() ?? "";

  return (
    firstSegment.startsWith("bytedanceverify") ||
    firstSegment.startsWith("baidu_verify_code") ||
    firstSegment.startsWith("googlesiteverification")
  );
}

function extractAttributes(tag) {
  const attributes = {};

  for (const match of tag.matchAll(
    /([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g,
  )) {
    attributes[match[1].toLowerCase()] =
      match[2] ?? match[3] ?? "";
  }

  return attributes;
}

function getCanonicalUrls(html) {
  const canonicalValues = [];

  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const attributes = extractAttributes(match[0]);

    if (
      attributes.rel?.toLowerCase() === "canonical" &&
      attributes.href
    ) {
      canonicalValues.push(attributes.href);
    }
  }

  return canonicalValues;
}

function hasNoIndex(html) {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*\bnoindex\b/i.test(
    html,
  ) ||
    /<meta[^>]+content=["'][^"']*\bnoindex\b[^"']*["'][^>]+name=["']robots["']/i.test(
      html,
    );
}

function getSeoSettings(route) {
  const segments = route
    .split("/")
    .filter(Boolean);

  const routeWithoutLocale =
    supportedLocales.has(segments[0])
      ? segments.slice(1)
      : segments;

  if (route === "/") {
    return {
      changefreq: "weekly",
      priority: "1.0",
    };
  }

  if (
    segments.length === 1 &&
    supportedLocales.has(segments[0])
  ) {
    return {
      changefreq: "weekly",
      priority: "0.9",
    };
  }

  const firstSegment =
    routeWithoutLocale[0] ?? "";

  if (firstSegment === "products") {
    return {
      changefreq:
        routeWithoutLocale.length <= 2
          ? "weekly"
          : "monthly",
      priority:
        routeWithoutLocale.length <= 2
          ? "0.9"
          : "0.8",
    };
  }

  if (firstSegment === "resources") {
    return {
      changefreq:
        routeWithoutLocale.length <= 2
          ? "weekly"
          : "monthly",
      priority:
        routeWithoutLocale.length <= 2
          ? "0.8"
          : "0.7",
    };
  }

  if (firstSegment === "applications") {
    return {
      changefreq: "monthly",
      priority: "0.8",
    };
  }

  if (
    firstSegment === "about" ||
    firstSegment === "contact" ||
    firstSegment === "privacy-policy"
  ) {
    return {
      changefreq: "yearly",
      priority: "0.6",
    };
  }

  return {
    changefreq: "monthly",
    priority: "0.6",
  };
}

async function main() {
  const outputInfo = await stat(outputRoot).catch(
    () => null,
  );

  if (!outputInfo?.isDirectory()) {
    throw new Error(
      `没有找到静态导出目录：${outputRoot}\n` +
        "请先执行 npm run build:cloudflare。",
    );
  }

  const htmlFiles = await collectHtmlFiles(
    outputRoot,
  );

  const routeMap = new Map();
  const excludedRoutes = [];

  for (const htmlFile of htmlFiles) {
    const fileName = path
      .basename(htmlFile)
      .toLowerCase();

    if (excludedFileNames.has(fileName)) {
      excludedRoutes.push(
        path.relative(outputRoot, htmlFile),
      );
      continue;
    }

    const route = filePathToRoute(htmlFile);

    if (
      !route ||
      isSearchRoute(route) ||
      isSystemRoute(route) ||
      isVerificationRoute(route)
    ) {
      if (route) {
        excludedRoutes.push(route);
      }
      continue;
    }

    const html = await readFile(
      htmlFile,
      "utf8",
    );

    if (hasNoIndex(html)) {
      excludedRoutes.push(route);
      continue;
    }

    const canonicalValues = getCanonicalUrls(html);
    const expectedCanonical = new URL(
      route,
      siteOrigin,
    ).toString();

    if (
      canonicalValues.length !== 1 ||
      canonicalValues[0] !== expectedCanonical
    ) {
      throw new Error(
        `页面 canonical 与静态路由不一致：${route}\n` +
          `期望：${expectedCanonical}\n` +
          `实际：${canonicalValues.join(", ") || "缺失"}`,
      );
    }

    routeMap.set(route, {
      htmlFile,
      canonicalUrl: canonicalValues[0],
    });
  }

  const routes = [...routeMap.keys()].sort(
    (a, b) => {
      if (a === "/") return -1;
      if (b === "/") return 1;
      return a.localeCompare(b, "en");
    },
  );

  if (routes.length === 0) {
    throw new Error(
      "没有找到可写入 sitemap.xml 的正式页面。",
    );
  }

  if (routes.length > 50000) {
    throw new Error(
      `当前页面数量为 ${routes.length}，超过单个 Sitemap 的 50000 条限制。`,
    );
  }

  const urlEntries = routes.map((route) => {
    const {
      changefreq,
      priority,
    } = getSeoSettings(route);

    const url = routeMap.get(route).canonicalUrl;

    return [
      "  <url>",
      `    <loc>${escapeXml(url)}</loc>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  });

  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urlEntries,
    "</urlset>",
    "",
  ].join("\n");

  const sitemapPath = path.join(
    outputRoot,
    "sitemap.xml",
  );

  await writeFile(
    sitemapPath,
    sitemapXml,
    "utf8",
  );

  /*
   * public/robots.txt 会在 next build 时复制进 out。
   * 这里再写一次，确保构建产物一定包含正确规则。
   */
  const robotsText = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteOrigin}/sitemap.xml`,
    "",
  ].join("\n");

  await writeFile(
    path.join(outputRoot, "robots.txt"),
    robotsText,
    "utf8",
  );

  const languageCounts = {
    "zh-CN": 0,
    en: 0,
    es: 0,
    fr: 0,
    ko: 0,
    ru: 0,
  };

  for (const route of routes) {
    const firstSegment =
      route.split("/").filter(Boolean)[0];

    if (
      firstSegment &&
      supportedLocales.has(firstSegment)
    ) {
      languageCounts[firstSegment] += 1;
    }
    else {
      languageCounts["zh-CN"] += 1;
    }
  }

  console.log("");
  console.log("Sitemap 生成成功。");
  console.log(`输出文件：${sitemapPath}`);
  console.log(`收录 URL：${routes.length}`);
  console.log(
    `中文：${languageCounts["zh-CN"]}`,
  );
  console.log(`英文：${languageCounts.en}`);
  console.log(`西班牙语：${languageCounts.es}`);
  console.log(`法语：${languageCounts.fr}`);
  console.log(`韩语：${languageCounts.ko}`);
  console.log(`俄语：${languageCounts.ru}`);
  console.log(
    `自动排除：${excludedRoutes.length}`,
  );
}

main().catch((error) => {
  console.error("");
  console.error("Sitemap 生成失败：");
  console.error(error);
  process.exitCode = 1;
});
