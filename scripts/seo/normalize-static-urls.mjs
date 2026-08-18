/**
 * Normalize SEO URLs in the Cloudflare static export.
 *
 * The normalizer runs after `next build` and before sitemap generation. It
 * works from routes that actually exist in `out`, so hreflang never points to
 * a fabricated language page.
 */

import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const OUTPUT_ROOT = path.join(process.cwd(), "out");
const SITE_ORIGIN = "https://www.foreachtek.com";
const SITE_HOSTNAME = new URL(SITE_ORIGIN).hostname;
const INTERNATIONAL_LOCALES = new Set(["en", "es", "fr", "ko", "ru"]);
const HREFLANG_BY_LOCALE = new Map([
  ["zh-CN", "zh-CN"],
  ["en", "en"],
  ["es", "es"],
  ["fr", "fr"],
  ["ko", "ko"],
  ["ru", "ru"],
]);
const STRUCTURED_URL_KEYS = new Set([
  "@id",
  "item",
  "mainEntityOfPage",
  "sameAs",
  "url",
]);
const EXCLUDED_HTML_FILES = new Set(["404.html", "500.html"]);

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === "_next" || entry.name.startsWith(".")) continue;
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) files.push(...(await collectHtmlFiles(absolutePath)));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) files.push(absolutePath);
  }

  return files;
}

function routeFromHtmlFile(filePath) {
  const relativePath = path.relative(OUTPUT_ROOT, filePath).split(path.sep).join("/");
  if (relativePath === "index.html") return "/";
  if (relativePath.endsWith("/index.html")) {
    return `/${relativePath.slice(0, -"/index.html".length)}/`;
  }
  return `/${relativePath.slice(0, -".html".length)}/`;
}

function extractAttributes(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? "";
  }
  return attributes;
}

function hasNoIndex(html) {
  return /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*\bnoindex\b/i.test(html) ||
    /<meta\b[^>]*content=["'][^"']*\bnoindex\b[^"']*["'][^>]*name=["']robots["']/i.test(html);
}

function isSearchRoute(route) {
  const segments = route.split("/").filter(Boolean);
  return segments[0] === "search" ||
    (INTERNATIONAL_LOCALES.has(segments[0]) && segments[1] === "search");
}

function isVerificationRoute(route) {
  const firstSegment = route.split("/").filter(Boolean)[0]?.toLowerCase() ?? "";
  return firstSegment.startsWith("bytedanceverify") ||
    firstSegment.startsWith("baidu_verify_code") ||
    firstSegment.startsWith("googlesiteverification");
}

function isIndexablePage(route, filePath, html) {
  return !EXCLUDED_HTML_FILES.has(path.basename(filePath).toLowerCase()) &&
    !route.includes("/_not-found/") &&
    !route.includes("/api/") &&
    !isSearchRoute(route) &&
    !isVerificationRoute(route) &&
    !hasNoIndex(html);
}

function absoluteRouteUrl(route) {
  return new URL(route, SITE_ORIGIN).toString();
}

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function decodeAttribute(value) {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

function localeRoute(locale, baseSegments) {
  const segments = locale === "zh-CN" ? baseSegments : [locale, ...baseSegments];
  return segments.length > 0 ? `/${segments.join("/")}/` : "/";
}

function routeLocaleAndBase(route) {
  const segments = route.split("/").filter(Boolean);
  const locale = INTERNATIONAL_LOCALES.has(segments[0]) ? segments.shift() : "zh-CN";
  return { locale, baseSegments: segments };
}

function normalizeExistingAlternate(value, routeSet) {
  let url;
  try {
    url = new URL(value, SITE_ORIGIN);
  }
  catch {
    return null;
  }

  const canonicalRoute = url.pathname === "/"
    ? "/"
    : `${url.pathname.replace(/\/+$/, "")}/`;
  return routeSet.has(canonicalRoute) ? absoluteRouteUrl(canonicalRoute) : null;
}

function getAlternates(html, route, routeSet) {
  const alternates = new Map();

  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const attributes = extractAttributes(match[0]);
    if (attributes.rel?.toLowerCase() !== "alternate" || !attributes.hreflang || !attributes.href) {
      continue;
    }

    const normalizedUrl = normalizeExistingAlternate(attributes.href, routeSet);
    if (!normalizedUrl) continue;

    const hreflang = attributes.hreflang.toLowerCase() === "en-us"
      ? "en"
      : attributes.hreflang;
    alternates.set(hreflang, normalizedUrl);
  }

  const { baseSegments } = routeLocaleAndBase(route);
  for (const [locale, hreflang] of HREFLANG_BY_LOCALE) {
    const candidateRoute = localeRoute(locale, baseSegments);
    if (routeSet.has(candidateRoute)) alternates.set(hreflang, absoluteRouteUrl(candidateRoute));
  }

  if (alternates.size < 2) return new Map();
  return alternates;
}

function removeCanonicalAndHreflang(html) {
  return html.replace(/<link\b[^>]*>/gi, (tag) => {
    const attributes = extractAttributes(tag);
    const rel = attributes.rel?.toLowerCase();
    return rel === "canonical" || (rel === "alternate" && attributes.hreflang) ? "" : tag;
  });
}

function normalizeInternalReference(value, routeSet, { stripQuery = false } = {}) {
  if (
    !value ||
    value.startsWith("#") ||
    /^(?:mailto|tel|javascript|data):/i.test(value)
  ) {
    return value;
  }

  const isAbsolute = /^https?:\/\//i.test(value);
  const isRootRelative = value.startsWith("/") && !value.startsWith("//");
  if (!isAbsolute && !isRootRelative) return value;

  let url;
  try {
    url = new URL(value, SITE_ORIGIN);
  }
  catch {
    return value;
  }

  if (isAbsolute && !/(^|\.)foreachtek\.com$/i.test(url.hostname)) return value;

  const candidateRoute = url.pathname === "/"
    ? "/"
    : `${url.pathname.replace(/\/+$/, "")}/`;
  if (routeSet.has(candidateRoute)) url.pathname = candidateRoute;

  if (stripQuery) url.search = "";

  if (!isAbsolute) return `${url.pathname}${url.search}${url.hash}`;

  url.protocol = "https:";
  url.hostname = SITE_HOSTNAME;
  url.port = "";
  return url.toString();
}

function normalizeAnchorTags(html, routeSet, stats) {
  return html.replace(/<a\b[^>]*>/gi, (tag) => tag.replace(
    /(\bhref\s*=\s*)(["'])(.*?)\2/i,
    (attribute, prefix, quote, href) => {
      const decodedHref = decodeAttribute(href);
      const normalizedHref = normalizeInternalReference(decodedHref, routeSet);
      if (normalizedHref !== decodedHref) stats.normalizedInternalLinks += 1;
      return `${prefix}${quote}${escapeAttribute(normalizedHref)}${quote}`;
    },
  ));
}

function normalizeStructuredValue(value, currentKey, routeSet, stats) {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeStructuredValue(item, currentKey, routeSet, stats));
  }

  if (!value || typeof value !== "object") return value;

  for (const [key, nestedValue] of Object.entries(value)) {
    if (STRUCTURED_URL_KEYS.has(key) && typeof nestedValue === "string") {
      const normalizedValue = normalizeInternalReference(nestedValue, routeSet, { stripQuery: true });
      if (normalizedValue !== nestedValue) stats.normalizedStructuredUrls += 1;
      value[key] = normalizedValue;
    }
    else if (STRUCTURED_URL_KEYS.has(key) && Array.isArray(nestedValue)) {
      value[key] = nestedValue.map((item) => {
        if (typeof item !== "string") {
          return normalizeStructuredValue(item, key, routeSet, stats);
        }

        const normalizedValue = normalizeInternalReference(item, routeSet, { stripQuery: true });
        if (normalizedValue !== item) stats.normalizedStructuredUrls += 1;
        return normalizedValue;
      });
    }
    else {
      value[key] = normalizeStructuredValue(nestedValue, key || currentKey, routeSet, stats);
    }
  }

  return value;
}

function normalizeJsonLd(html, routeSet, stats) {
  return html.replace(
    /(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi,
    (fullMatch, openingTag, jsonText, closingTag) => {
      try {
        const value = JSON.parse(jsonText);
        normalizeStructuredValue(value, "", routeSet, stats);
        return `${openingTag}${JSON.stringify(value)}${closingTag}`;
      }
      catch {
        stats.invalidJsonLd += 1;
        return fullMatch;
      }
    },
  );
}

function normalizeOpenGraphUrl(html, canonicalUrl) {
  return html.replace(/<meta\b[^>]*>/gi, (tag) => {
    const attributes = extractAttributes(tag);
    if (attributes.property?.toLowerCase() !== "og:url") return tag;
    return `<meta property="og:url" content="${escapeAttribute(canonicalUrl)}"/>`;
  });
}

function injectSeoLinks(html, canonicalUrl, alternates) {
  const tags = [
    `<link rel="canonical" href="${escapeAttribute(canonicalUrl)}"/>`,
    ...[...alternates.entries()].map(([hreflang, href]) =>
      `<link rel="alternate" hreflang="${escapeAttribute(hreflang)}" href="${escapeAttribute(href)}"/>`),
  ].join("");

  if (!/<\/head>/i.test(html)) throw new Error("Static HTML is missing </head>.");
  return html.replace(/<\/head>/i, `${tags}</head>`);
}

async function main() {
  const htmlFiles = await collectHtmlFiles(OUTPUT_ROOT);
  const pages = [];

  for (const filePath of htmlFiles) {
    const html = await readFile(filePath, "utf8");
    const route = routeFromHtmlFile(filePath);
    if (isIndexablePage(route, filePath, html)) pages.push({ filePath, route, html });
  }

  const routeSet = new Set(pages.map(({ route }) => route));
  const stats = {
    pages: pages.length,
    canonicalLinks: 0,
    hreflangLinks: 0,
    normalizedInternalLinks: 0,
    normalizedStructuredUrls: 0,
    invalidJsonLd: 0,
  };

  for (const page of pages) {
    const canonicalUrl = absoluteRouteUrl(page.route);
    const alternates = getAlternates(page.html, page.route, routeSet);
    let html = removeCanonicalAndHreflang(page.html);
    html = normalizeAnchorTags(html, routeSet, stats);
    html = normalizeJsonLd(html, routeSet, stats);
    html = normalizeOpenGraphUrl(html, canonicalUrl);
    html = injectSeoLinks(html, canonicalUrl, alternates);
    await writeFile(page.filePath, html, "utf8");

    stats.canonicalLinks += 1;
    stats.hreflangLinks += alternates.size;
  }

  console.log("");
  console.log("Static URL normalization complete.");
  console.log(JSON.stringify(stats, null, 2));

  if (stats.invalidJsonLd > 0) {
    throw new Error(`Found ${stats.invalidJsonLd} invalid JSON-LD blocks.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
