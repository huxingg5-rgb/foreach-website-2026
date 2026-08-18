/**
 * Audit the static export for canonical URL consistency.
 *
 * Usage:
 *   node scripts/seo/audit-url-consistency.mjs
 *   node scripts/seo/audit-url-consistency.mjs --output out --json report.json
 */

import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const SITE_ORIGIN = "https://www.foreachtek.com";
const SITE_HOSTNAME = new URL(SITE_ORIGIN).hostname;
const OUTPUT_ARGUMENT = getArgument("--output") ?? "out";
const JSON_ARGUMENT = getArgument("--json");
const OUTPUT_ROOT = path.resolve(process.cwd(), OUTPUT_ARGUMENT);
const SITE_URL_KEYS = new Set([
  "@id",
  "item",
  "mainEntityOfPage",
  "sameAs",
  "url",
]);
const EXCLUDED_HTML_FILES = new Set(["404.html", "500.html"]);
const PAGE_EXTENSIONS = new Set([
  ".aspx",
  ".htm",
  ".html",
  ".php",
]);

function getArgument(name) {
  const argumentIndex = process.argv.indexOf(name);
  return argumentIndex >= 0 ? process.argv[argumentIndex + 1] : undefined;
}

async function collectFiles(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === "_next" || entry.name.startsWith(".")) continue;

    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath, extension)));
    }
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(extension)) {
      files.push(absolutePath);
    }
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
  const attributePattern = /([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;

  for (const match of tag.matchAll(attributePattern)) {
    attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? "";
  }

  return attributes;
}

function extractLinkTags(html) {
  return [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => ({
    tag: match[0],
    attributes: extractAttributes(match[0]),
  }));
}

function extractAnchorHrefs(html) {
  return [...html.matchAll(/<a\b[^>]*>/gi)]
    .map((match) => extractAttributes(match[0]).href)
    .filter(Boolean);
}

function extractJsonLd(html) {
  const values = [];
  const pattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(pattern)) {
    try {
      values.push(JSON.parse(match[1]));
    }
    catch {
      values.push({ __invalidJsonLd: true });
    }
  }

  return values;
}

function collectStructuredUrls(value, result = [], currentKey = "") {
  if (Array.isArray(value)) {
    for (const item of value) collectStructuredUrls(item, result, currentKey);
    return result;
  }

  if (!value || typeof value !== "object") return result;

  for (const [key, nestedValue] of Object.entries(value)) {
    if (SITE_URL_KEYS.has(key) && typeof nestedValue === "string") {
      result.push({ key, value: nestedValue });
    }
    else if (SITE_URL_KEYS.has(key) && Array.isArray(nestedValue)) {
      for (const item of nestedValue) {
        if (typeof item === "string") result.push({ key, value: item });
        else collectStructuredUrls(item, result, key);
      }
    }
    else {
      collectStructuredUrls(nestedValue, result, key || currentKey);
    }
  }

  return result;
}

function hasNoIndex(html) {
  return /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*\bnoindex\b/i.test(html) ||
    /<meta\b[^>]*content=["'][^"']*\bnoindex\b[^"']*["'][^>]*name=["']robots["']/i.test(html);
}

function isSearchRoute(route) {
  const segments = route.split("/").filter(Boolean);
  return segments[0] === "search" ||
    (["en", "es", "fr", "ko", "ru"].includes(segments[0]) && segments[1] === "search");
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

function looksLikePagePath(pathname) {
  const extension = path.posix.extname(pathname).toLowerCase();
  return !extension || PAGE_EXTENSIONS.has(extension);
}

function isCanonicalPathname(pathname) {
  if (pathname === "/") return true;
  if (!looksLikePagePath(pathname)) return true;
  return pathname.endsWith("/");
}

function toUrl(value) {
  try {
    return new URL(value, SITE_ORIGIN);
  }
  catch {
    return null;
  }
}

function isRelativeUrl(value) {
  return value.startsWith("/") && !value.startsWith("//");
}

function isSiteUrl(value) {
  if (isRelativeUrl(value)) return true;
  const url = toUrl(value);
  return Boolean(url && /(^|\.)foreachtek\.com$/i.test(url.hostname));
}

function normalizedPageUrl(value) {
  const url = toUrl(value);
  if (!url) return null;
  url.protocol = "https:";
  url.hostname = SITE_HOSTNAME;
  url.port = "";
  url.search = "";
  url.hash = "";

  if (looksLikePagePath(url.pathname) && url.pathname !== "/") {
    url.pathname = `${url.pathname.replace(/\/+$/, "")}/`;
  }

  return url.toString();
}

function getUrlIssues(value, { requireAbsolute = true } = {}) {
  const issues = [];
  const url = toUrl(value);

  if (!url) return ["invalid"];
  if (requireAbsolute && isRelativeUrl(value)) issues.push("relative");
  if (url.protocol !== "https:") issues.push("non-https");
  if (url.hostname !== SITE_HOSTNAME) issues.push("hostname");
  if (!isCanonicalPathname(url.pathname)) issues.push("trailing-slash");
  if (url.search) issues.push("query");

  return issues;
}

function compactIssue(page, value, issues, extra = {}) {
  return { page, value, issues, ...extra };
}

function countByIssue(issues) {
  const counts = {};
  for (const issue of issues) {
    for (const name of issue.issues) counts[name] = (counts[name] ?? 0) + 1;
  }
  return counts;
}

function duplicateValues(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([value, count]) => ({ value, count }));
}

function topValues(values, limit = 25) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((left, right) => right.count - left.count || left.value.localeCompare(right.value, "en"))
    .slice(0, limit);
}

function routeBucket(route) {
  const segments = route.split("/").filter(Boolean);
  if (["en", "es", "fr", "ko", "ru"].includes(segments[0])) segments.shift();
  if (segments.length === 0) return "home";
  if (segments[0] === "products") return `products:depth-${segments.length - 1}`;
  if (segments[0] === "resources") return `resources:depth-${segments.length - 1}`;
  return `${segments[0]}:depth-${segments.length - 1}`;
}

function countRouteBuckets(routes) {
  const counts = new Map();
  for (const route of routes) {
    const bucket = routeBucket(route);
    counts.set(bucket, (counts.get(bucket) ?? 0) + 1);
  }
  return Object.fromEntries([...counts.entries()].sort());
}

function sitePathKey(value) {
  const url = toUrl(value);
  return url ? `${url.pathname}${url.search}` : value;
}

async function main() {
  const htmlFiles = await collectFiles(OUTPUT_ROOT, ".html");
  const pages = [];

  for (const filePath of htmlFiles) {
    const html = await readFile(filePath, "utf8");
    const route = routeFromHtmlFile(filePath);
    if (!isIndexablePage(route, filePath, html)) continue;

    const links = extractLinkTags(html);
    const canonicalValues = links
      .filter(({ attributes }) => attributes.rel?.toLowerCase() === "canonical")
      .map(({ attributes }) => attributes.href)
      .filter(Boolean);
    const alternates = links
      .filter(({ attributes }) =>
        attributes.rel?.toLowerCase() === "alternate" && attributes.hreflang)
      .map(({ attributes }) => ({
        hreflang: attributes.hreflang,
        href: attributes.href,
      }))
      .filter(({ href }) => Boolean(href));

    pages.push({
      filePath,
      route,
      canonicalValues,
      alternates,
      anchorHrefs: extractAnchorHrefs(html),
      jsonLd: extractJsonLd(html),
    });
  }

  const routeSet = new Set(pages.map(({ route }) => route));
  const canonicalIssues = [];
  const canonicalUrls = [];
  const missingCanonicalPages = [];
  const multipleCanonicalPages = [];
  const canonicalRouteMismatches = [];
  const hreflangIssues = [];
  const duplicateHreflangPages = [];
  const structuredDataIssues = [];
  const invalidJsonLdPages = [];
  const internalLinkIssues = [];

  for (const page of pages) {
    if (page.canonicalValues.length === 0) missingCanonicalPages.push(page.route);
    if (page.canonicalValues.length > 1) multipleCanonicalPages.push(page.route);

    for (const canonicalValue of page.canonicalValues) {
      canonicalUrls.push(normalizedPageUrl(canonicalValue));
      const issues = getUrlIssues(canonicalValue);
      if (issues.length) canonicalIssues.push(compactIssue(page.route, canonicalValue, issues));

      const canonicalUrl = toUrl(canonicalValue);
      if (canonicalUrl && canonicalUrl.pathname !== page.route) {
        canonicalRouteMismatches.push({
          page: page.route,
          canonicalPathname: canonicalUrl.pathname,
          value: canonicalValue,
        });
      }
    }

    const hreflangCounts = new Map();
    for (const alternate of page.alternates) {
      hreflangCounts.set(alternate.hreflang, (hreflangCounts.get(alternate.hreflang) ?? 0) + 1);
      const issues = getUrlIssues(alternate.href);
      const url = toUrl(alternate.href);
      if (url && !routeSet.has(url.pathname)) issues.push("missing-target");
      if (issues.length) {
        hreflangIssues.push(compactIssue(page.route, alternate.href, [...new Set(issues)], {
          hreflang: alternate.hreflang,
        }));
      }
    }
    const duplicateHreflangs = [...hreflangCounts.entries()].filter(([, count]) => count > 1);
    if (duplicateHreflangs.length) {
      duplicateHreflangPages.push({ page: page.route, duplicateHreflangs });
    }

    for (const block of page.jsonLd) {
      if (block.__invalidJsonLd) {
        invalidJsonLdPages.push(page.route);
        continue;
      }
      for (const entry of collectStructuredUrls(block)) {
        if (!isSiteUrl(entry.value)) continue;
        const issues = getUrlIssues(entry.value);
        if (issues.length) {
          structuredDataIssues.push(compactIssue(page.route, entry.value, issues, {
            key: entry.key,
          }));
        }
      }
    }

    for (const href of page.anchorHrefs) {
      if (!isSiteUrl(href) || href.startsWith("#")) continue;
      const url = toUrl(href);
      if (!url || !looksLikePagePath(url.pathname)) continue;

      const canonicalRoute = url.pathname === "/"
        ? "/"
        : `${url.pathname.replace(/\/+$/, "")}/`;
      if (!routeSet.has(canonicalRoute)) continue;

      const issues = [];
      if (!isCanonicalPathname(url.pathname)) issues.push("trailing-slash");
      if (!isRelativeUrl(href) && url.hostname !== SITE_HOSTNAME) issues.push("hostname");
      if (!isRelativeUrl(href) && url.protocol !== "https:") issues.push("non-https");
      if (issues.length) internalLinkIssues.push(compactIssue(page.route, href, issues));
    }
  }

  const validCanonicalUrls = canonicalUrls.filter(Boolean);
  const duplicateCanonicalUrls = duplicateValues(validCanonicalUrls);

  const sitemapPath = path.join(OUTPUT_ROOT, "sitemap.xml");
  let sitemapValues = [];
  try {
    const sitemapXml = await readFile(sitemapPath, "utf8");
    sitemapValues = [...sitemapXml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)]
      .map((match) => match[1].trim());
  }
  catch {
    // Report the missing sitemap through a zero count below.
  }

  const uniqueSitemapValues = [...new Set(sitemapValues)];
  const sitemapIssues = uniqueSitemapValues
    .map((value) => compactIssue("sitemap.xml", value, getUrlIssues(value)))
    .filter(({ issues }) => issues.length);
  const normalizedCanonicalSet = new Set(validCanonicalUrls);
  const sitemapNonCanonical = uniqueSitemapValues.filter((value) =>
    !normalizedCanonicalSet.has(normalizedPageUrl(value)));
  const sitemapPathDuplicates = duplicateValues(uniqueSitemapValues.map(sitePathKey));
  const sitemapSlashVariantDuplicates = duplicateValues(uniqueSitemapValues.map((value) => {
    const url = toUrl(value);
    return url ? url.pathname.replace(/\/+$/, "") || "/" : value;
  }));
  const aspxUrls = uniqueSitemapValues.filter((value) => toUrl(value)?.pathname.toLowerCase().endsWith(".aspx"));
  const localhostUrls = uniqueSitemapValues.filter((value) => /localhost|127\.0\.0\.1|\.vercel\.app/i.test(value));
  const httpUrls = uniqueSitemapValues.filter((value) => value.startsWith("http://"));

  const productSlugParents = new Map();
  for (const { route } of pages) {
    const segments = route.split("/").filter(Boolean);
    const productsIndex = segments.indexOf("products");
    if (productsIndex < 0 || segments.length - productsIndex < 4) continue;
    const locale = productsIndex === 1 ? segments[0] : "zh-CN";
    const slug = segments.at(-1);
    const key = `${locale}:${slug}`;
    const parent = `/${segments.slice(0, -1).join("/")}/`;
    if (!productSlugParents.has(key)) productSlugParents.set(key, new Set());
    productSlugParents.get(key).add(parent);
  }
  const productSlugCollisionCandidates = [...productSlugParents.entries()]
    .filter(([, parents]) => parents.size > 1)
    .map(([key, parents]) => ({ key, parents: [...parents] }));

  const report = {
    generatedAt: new Date().toISOString(),
    siteOrigin: SITE_ORIGIN,
    outputRoot: OUTPUT_ROOT,
    summary: {
      htmlFiles: htmlFiles.length,
      indexablePages: pages.length,
      pagesWithCanonical: pages.length - missingCanonicalPages.length,
      missingCanonical: missingCanonicalPages.length,
      missingCanonicalByRouteType: countRouteBuckets(missingCanonicalPages),
      multipleCanonical: multipleCanonicalPages.length,
      canonicalUrlIssues: canonicalIssues.length,
      canonicalIssueCounts: countByIssue(canonicalIssues),
      canonicalRouteMismatches: canonicalRouteMismatches.length,
      duplicateCanonicalUrls: duplicateCanonicalUrls.length,
      hreflangUrlIssues: hreflangIssues.length,
      hreflangIssueCounts: countByIssue(hreflangIssues),
      duplicateHreflangPages: duplicateHreflangPages.length,
      structuredDataUrlIssues: structuredDataIssues.length,
      structuredDataIssueCounts: countByIssue(structuredDataIssues),
      invalidJsonLdPages: invalidJsonLdPages.length,
      internalLinkIssues: internalLinkIssues.length,
      internalLinkUniqueValues: new Set(internalLinkIssues.map(({ value }) => value)).size,
      internalLinkIssueCounts: countByIssue(internalLinkIssues),
      sitemapUrls: sitemapValues.length,
      sitemapUniqueUrls: uniqueSitemapValues.length,
      sitemapDuplicateUrls: sitemapValues.length - uniqueSitemapValues.length,
      sitemapUrlIssues: sitemapIssues.length,
      sitemapIssueCounts: countByIssue(sitemapIssues),
      sitemapNonCanonical: sitemapNonCanonical.length,
      sitemapPathDuplicates: sitemapPathDuplicates.length,
      sitemapSlashVariantDuplicates: sitemapSlashVariantDuplicates.length,
      sitemapAspxUrls: aspxUrls.length,
      sitemapLocalhostOrPreviewUrls: localhostUrls.length,
      sitemapHttpUrls: httpUrls.length,
      productSlugCollisionCandidates: productSlugCollisionCandidates.length,
    },
    samples: {
      missingCanonicalPages: missingCanonicalPages.slice(0, 25),
      multipleCanonicalPages: multipleCanonicalPages.slice(0, 25),
      canonicalIssues: canonicalIssues.slice(0, 25),
      canonicalRouteMismatches: canonicalRouteMismatches.slice(0, 25),
      duplicateCanonicalUrls: duplicateCanonicalUrls.slice(0, 25),
      hreflangIssues: hreflangIssues.slice(0, 25),
      duplicateHreflangPages: duplicateHreflangPages.slice(0, 25),
      structuredDataIssues: structuredDataIssues.slice(0, 25),
      invalidJsonLdPages: invalidJsonLdPages.slice(0, 25),
      internalLinkIssues: internalLinkIssues.slice(0, 25),
      topInternalLinkIssueValues: topValues(internalLinkIssues.map(({ value }) => value)),
      topStructuredDataIssueValues: topValues(structuredDataIssues.map(({ value }) => value)),
      sitemapIssues: sitemapIssues.slice(0, 25),
      sitemapNonCanonical: sitemapNonCanonical.slice(0, 25),
      sitemapPathDuplicates: sitemapPathDuplicates.slice(0, 25),
      sitemapSlashVariantDuplicates: sitemapSlashVariantDuplicates.slice(0, 25),
      aspxUrls: aspxUrls.slice(0, 25),
      localhostUrls: localhostUrls.slice(0, 25),
      httpUrls: httpUrls.slice(0, 25),
      productSlugCollisionCandidates: productSlugCollisionCandidates.slice(0, 25),
    },
  };

  const reportText = `${JSON.stringify(report, null, 2)}\n`;
  if (JSON_ARGUMENT) {
    const reportPath = path.resolve(process.cwd(), JSON_ARGUMENT);
    await writeFile(reportPath, reportText, "utf8");
    console.log(`JSON report: ${reportPath}`);
  }

  console.log(JSON.stringify(report.summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
