import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { getValvelessPumpPath, getValvelessPumpLanguageAlternates, normalizeValvelessPumpPath, VALVELESS_PUMP_MODEL_SLUGS } from "../../data/products/selection/valveless-pump-routes";
import { getValvelessPumpRedirectEntries } from "../../lib/seo/valveless-pump-migration";
import { getLocalizedSiteHref, normalizeSiteHref } from "../../lib/seo/site-url";
import { getRplSelectionProducts, rplSelectionArticleSlug } from "../../data/resources/technical-articles/rpl-valveless-metering-pump-selection.article";
import { getRplSelectionSourceHrefs } from "../../data/resources/technical-articles/rpl-selection-sources";
import details from "../../data/products/generated/pumps/valveless-pumps/detail/index.json";

const locales = ["zh-CN", "en", "es", "fr", "ko", "ru"] as const;
const origin = process.env.VALVELESS_CHECK_ORIGIN || "http://127.0.0.1:3000";
const staticMode = process.argv.includes("--static");
const outputRoot = process.env.VALVELESS_OUTPUT_ROOT || "out";
const oldPageLink = /(?:href|src)="(?:https:\/\/www\.foreachtek\.com)?(?:\/(?:en|es|fr|ko|ru))?\/products\/pumps\/valveless-pumps(?:\/|["?#])/;
const redirects = getValvelessPumpRedirectEntries();
const cfRules = readFileSync(staticMode ? path.join(outputRoot, "_redirects") : "public/_redirects", "utf8");
assert.equal(redirects.length, 30);
assert.equal(new Set(redirects.map(rule => rule.source)).size, 30);
assert.deepEqual([...VALVELESS_PUMP_MODEL_SLUGS].sort(), details.map(detail => detail.slug).sort());
for (const rule of redirects) {
  for (const source of [rule.source, `${rule.source}/`]) {
    assert.ok(cfRules.split(/\r?\n/).includes(`${source} ${rule.destination} 301`), source);
    assert.equal(normalizeSiteHref(`${source}?utm_source=test#specifications`), `${rule.destination}?utm_source=test#specifications`);
  }
  assert.notEqual(rule.source + "/", rule.destination);
}
const assetPaths = [...new Set(JSON.stringify(details).match(/\/(?:images|models|documents)\/[^"\s]+/g) || [])];
for (const asset of assetPaths) {
  assert.equal(normalizeValvelessPumpPath(asset), asset, `Asset not migrated: ${asset}`);
  assert.equal(normalizeSiteHref(asset), asset, `Asset normalization: ${asset}`);
  // Raw data also carries optional, unpublished CAD placeholders. The migration
  // must preserve their paths; only assets actually linked in HTML must exist.
}
const missingOptionalAssets = assetPaths.filter(asset => !existsSync(path.join("public", asset)));
if (missingOptionalAssets.length) console.log(`NOTE: ${missingOptionalAssets.length} pre-existing optional asset paths have no local file: ${missingOptionalAssets.join(", ")}`);
const existingMissingLinks = new Map<string, Set<string>>();
assert.equal(normalizeValvelessPumpPath("/products/pumps/valveless-pumps/not-a-model/"), "/products/pumps/valveless-pumps/not-a-model/");
assert.equal(normalizeSiteHref("https://example.com/products/pumps/valveless-pumps/rpl-p4/"), "https://example.com/products/pumps/valveless-pumps/rpl-p4/");
for (const locale of locales) {
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  for (const slug of VALVELESS_PUMP_MODEL_SLUGS) {
    assert.equal(getLocalizedSiteHref(`/products/pumps/valveless-pumps/${slug}/`, locale), getValvelessPumpPath(locale, slug));
  }
  for (const item of getRplSelectionProducts(locale)) {
    assert.ok(item.href.startsWith(`${prefix}/products/pumps/valveless-metering-pump/`), `${locale}: article product link`);
  }
  assert.equal(getRplSelectionSourceHrefs(locale).product, getValvelessPumpPath(locale, "rpl-p4"));
  const search = JSON.parse(readFileSync(`${staticMode ? outputRoot : "public"}/search-data/global-search-index.${locale}.v3.json`, "utf8")) as {h: string; t: string}[];
  const modelResults = search.filter(item => /\/products\/pumps\/valveless-metering-pump\/[^/?#]+\/?$/.test(item.h));
  assert.equal(modelResults.length, 5, `${locale}: five search model results`);
  assert.equal(new Set(modelResults.map(item => item.h)).size, 5);
  assert.ok(!search.some(item => /\/products\/pumps\/valveless-pumps(?:\/|$)/.test(item.h)), `${locale}: no legacy search URL`);
}
console.log(`PASS: 30 model mappings, 60 Cloudflare redirect rules, six-language article/search links and ${assetPaths.length} unchanged asset paths.`);

async function getHtml(route: string) {
  if (staticMode) return readFileSync(path.join(outputRoot, route, "index.html"), "utf8");
  const response = await fetch(origin + route, {redirect: "manual", headers: {"user-agent": "Bingbot"}, signal: AbortSignal.timeout(30000)});
  assert.equal(response.status, 200, route);
  return response.text();
}

function verifyPage(html: string, route: string) {
  assert.ok(!html.includes("NEXT_HTTP_ERROR_FALLBACK;404"), `Not a streamed 404: ${route}`);
  assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+content="noindex"/, route);
  assert.ok(html.includes(`rel="canonical" href="https://www.foreachtek.com${route}"`), `Canonical: ${route}`);
  assert.doesNotMatch(html, oldPageLink, `Old link: ${route}`);
  for (const match of html.matchAll(/(?:href|src)="(\/(?:images|models|documents|downloads)\/[^"?#]+)(?:[^\"]*)"/g)) {
    const asset = decodeURIComponent(match[1].replace(/&amp;/g, "&"));
    if (!existsSync(path.join(staticMode ? outputRoot : "public", asset))) {
      assert.ok(missingOptionalAssets.includes(asset), `${route}: unexpected missing linked asset: ${asset}`);
      const pages = existingMissingLinks.get(asset) || new Set<string>();
      pages.add(route);
      existingMissingLinks.set(asset, pages);
    }
  }
  for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const schema = JSON.stringify(JSON.parse(match[1]));
    assert.doesNotMatch(schema, /https:\/\/www\.foreachtek\.com(?:\/(?:en|es|fr|ko|ru))?\/products\/pumps\/valveless-pumps(?:\/|["#?])/, `Schema: ${route}`);
  }
}

async function checkPages() {
  let pages = 0, oldUrls = 0;
  for (const locale of locales) {
    const prefix = locale === "zh-CN" ? "" : `/${locale}`;
    for (const slug of [undefined, ...VALVELESS_PUMP_MODEL_SLUGS]) {
      const route = getValvelessPumpPath(locale, slug);
      const html = await getHtml(route);
      verifyPage(html, route);
      for (const [language, target] of Object.entries(getValvelessPumpLanguageAlternates(slug))) {
        const code = staticMode && language === "en-US" ? "en" : language;
        assert.ok(new RegExp(`<link[^>]+(?:hrefLang|hreflang)="${code}"[^>]+href="https://www.foreachtek.com${target}"`).test(html), `${route}: ${code}`);
      }
      if (!slug) {
        for (const model of VALVELESS_PUMP_MODEL_SLUGS) assert.ok(html.includes(`href="${getValvelessPumpPath(locale, model)}"`));
      } else if (!staticMode) {
        const old = `${prefix}/products/pumps/valveless-pumps/${slug}`;
        for (const source of [old, `${old}/`]) {
          let response = await fetch(`${origin}${source}?utm_source=migration-test`, {redirect: "manual"});
          // Next may first add the standard trailing slash; Cloudflare rules cover both forms directly.
          if (response.status === 308 && response.headers.get("location")?.includes(`/valveless-pumps/${slug}/`)) {
            response = await fetch(new URL(response.headers.get("location")!, origin), {redirect: "manual"});
          }
          assert.equal(response.status, 301, source);
          assert.equal(new URL(response.headers.get("location")!, origin).pathname, route, source);
          assert.equal(new URL(response.headers.get("location")!, origin).searchParams.get("utm_source"), "migration-test");
          oldUrls++;
        }
      } else {
        assert.ok(!existsSync(path.join(outputRoot, `${prefix}/products/pumps/valveless-pumps/${slug}/index.html`)), `Legacy HTML absent: ${slug}`);
      }
      pages++;
    }
    const articleRoute = `${prefix}/resources/technical-articles/${rplSelectionArticleSlug}/`;
    const article = await getHtml(articleRoute);
    verifyPage(article, articleRoute);
    for (const product of getRplSelectionProducts(locale)) {
      assert.ok(article.split(`href="${product.href}"`).length - 1 >= 2, `${locale}: table and related card for ${product.name}`);
    }
    pages++;
    console.log(`PASS: ${locale}: 5 details, category, RPL article, canonical, hreflang, schema${staticMode ? "" : " and old URL redirects"}.`);
  }
  if (staticMode) {
    const sitemap = readFileSync(path.join(outputRoot, "sitemap.xml"), "utf8");
    assert.ok(!sitemap.includes("/products/pumps/valveless-pumps/"));
    for (const locale of locales) for (const slug of VALVELESS_PUMP_MODEL_SLUGS) assert.ok(sitemap.includes(`<loc>https://www.foreachtek.com${getValvelessPumpPath(locale, slug)}</loc>`));
    let htmlFiles = 0;
    function walk(dir: string) {
      for (const entry of readdirSync(dir, {withFileTypes: true})) {
        if (entry.name === "_next" || entry.name.startsWith(".")) continue;
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(file);
        else if (entry.name.endsWith(".html")) { assert.doesNotMatch(readFileSync(file, "utf8"), oldPageLink, file); htmlFiles++; }
      }
    }
    walk(outputRoot);
    console.log(`PASS: ${htmlFiles} exported HTML files contain no legacy page links; sitemap lists all 30 new model URLs.`);
  }
  console.log(`PASS: ${pages} pages checked; ${oldUrls} old URL variants checked.`);
  for (const [asset, routes] of existingMissingLinks) {
    console.warn(`EXISTING RESOURCE ISSUE: ${asset} is linked from ${routes.size} pages: ${[...routes].join(", ")}`);
  }
}
if (process.argv.includes("--http") || staticMode) checkPages().catch(error => {console.error(error); process.exitCode = 1;});
