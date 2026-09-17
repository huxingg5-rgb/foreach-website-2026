import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import details from "../../data/products/generated/pumps/valveless-pumps/detail/index.json";
import { getValvelessPumpPath, getValvelessPumpLanguageAlternates } from "../../data/products/selection/valveless-pump-routes";
import { getValvelessPumpNames } from "../../data/products/detail/valveless-pump-names";
import { getValvelessLocaleCopy } from "../../data/products/detail/valveless-pump-locales";
import { getDatasheetsStaticPageData } from "../../data/resources/datasheets.i18n";
import { getProductDatasheet } from "../../data/products/detail/product-detail-resources";
import { applyValvelessPumpLocalizedCopy } from "../../data/products/detail/valveless-pump-localized-adapter";

const locales = ["zh-CN", "en", "es", "fr", "ko", "ru"] as const;
const origin = process.env.VALVELESS_CHECK_ORIGIN || "http://127.0.0.1:3000";
const staticOutput = process.argv.includes("--static");
const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
const main = (html: string) => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || html;
const text = (html: string) => decode(main(html).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
const meta = (html: string, key: string) => decode([...html.matchAll(/<meta\b[^>]*>/g)].map(m => m[0]).find(tag => tag.includes(`="${key}"`))?.match(/content="([^"]*)"/)?.[1] || "");

async function get(route: string) {
  let html: string;
  if (staticOutput) {
    html = readFileSync(path.join("out", route, "index.html"), "utf8");
  } else {
    const response = await fetch(origin + route, { headers: { "user-agent": "Bingbot" } });
    assert.equal(response.status, 200, route);
    html = await response.text();
  }
  assert.ok(!html.includes("NEXT_HTTP_ERROR_FALLBACK;404"), `Not a streamed 404: ${route}`);
  assert.ok(!/<meta[^>]+name="robots"[^>]+content="noindex"/.test(html), `Indexable: ${route}`);
  return html;
}

async function check() {
  let pages = 0;
  for (const locale of locales) {
    const prefix = locale === "zh-CN" ? "" : `/${locale}`;
    const label = locale === "zh-CN" ? "无阀计量泵" : getValvelessPumpNames(locale).categoryName;
    const categoryPath = getValvelessPumpPath(locale);
    for (const slug of [undefined, ...details.map(item => item.slug)]) {
      const path = getValvelessPumpPath(locale, slug), html = await get(path);
      const body = text(html);
      assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `One H1: ${path}`);
      assert.equal([...html.matchAll(/rel="canonical"/g)].length, 1, path);
      assert.ok(html.includes(`rel="canonical" href="https://www.foreachtek.com${path}"`), path);
      const expectedAlternates = getValvelessPumpLanguageAlternates(slug);
      assert.equal([...html.matchAll(/rel="alternate" hreflang=/gi)].length, 7, path);
      for (const [language, target] of Object.entries(expectedAlternates)) {
        const languageCode = staticOutput && language === "en-US" ? "en" : language;
        assert.ok(new RegExp(`<link[^>]+(?:hrefLang|hreflang)="${languageCode}"[^>]+href="https://www.foreachtek.com${target}"`).test(html), `${path}: ${language}`);
      }
      // Only exact obsolete category anchors are forbidden; detail and asset parents remain valid.
      assert.doesNotMatch(html, /href="(?:https:\/\/www\.foreachtek\.com)?(?:\/(?:en|es|fr|ko|ru))?\/products\/pumps\/valveless-pumps\/?(?:[?#][^"]*)?"/, `Old category anchor: ${path}`);
      if (slug) assert.ok(html.includes(`href="${categoryPath}"`), `Category breadcrumb/navigation: ${path}`);
      if (!slug) {
        const description = meta(html, "description");
        assert.ok(description.length > 30 && description.length < 220, `Concise category description: ${locale}`);
        if (locale !== "zh-CN") assert.equal(description, getValvelessLocaleCopy(locale).category.metaDescription);
        for (const item of details) assert.ok(html.includes(getValvelessPumpPath(locale, item.slug)), `Model link: ${locale}/${item.slug}`);
      } else {
        if (slug === "rpl-p15") {
          assert.ok(body.includes("5–300 rpm"), `${locale}: approved P15 speed`);
          assert.ok(!body.includes("5–500 rpm"), `${locale}: retired speed`);
        }
        if (locale === "zh-CN") {
          assert.ok(body.includes("该产品为定制品"), `Protected custom-product notice: ${slug}`);
          assert.ok(body.includes("无阀计量泵"));
        } else if (["rpl-p635", "rpl-p15"].includes(slug)) {
          const source = details.find(item => item.slug === slug)!;
          const adapter = applyValvelessPumpLocalizedCopy(source, locale) as typeof source & { datasheetId: string };
          const resource = getProductDatasheet(adapter.datasheetId)!;
          assert.ok(resource && existsSync(`public${resource.file}`), `${locale}/${slug}: real PDF`);
          assert.ok(html.includes(`href="${resource.file}"`), `${locale}/${slug}: PDF link rendered`);
        }
      }
      pages++;
    }
    const index = JSON.parse(readFileSync(`${staticOutput ? "out" : "public"}/search-data/global-search-index.${locale}.v3.json`, "utf8")) as { h: string; t: string; m: string }[];
    const unprefix = (href: string) => href.replace(/^\/(?:en|es|fr|ko|ru)(?=\/)/, "").replace(/\/$/, "");
    assert.ok(index.some(item => unprefix(item.h) === unprefix(categoryPath) && item.t === label), `${locale}: category search result`);
    const resources = getDatasheetsStaticPageData(locale).datasheetItems.filter(item => item.id.includes("valveless-pump"));
    const resourceHtml = await get(`${prefix}/resources/datasheets/`);
    for (const item of resources) {
      assert.equal(item.productHref, categoryPath, `${locale}: resource backlink`);
      assert.ok(text(resourceHtml).includes(item.title), `${locale}: resource name`);
      assert.ok(resourceHtml.includes(`href="${categoryPath}"`));
      if (staticOutput) assert.ok(existsSync(path.join("out", item.downloadHref!)), `${locale}: exported PDF`);
      else {
        const pdf = await fetch(origin + item.downloadHref, { method: "HEAD" });
        assert.equal(pdf.status, 200, `${locale}: PDF response`);
      }
    }
    const guideHtml = await get(`${prefix}/resources/installation-guide/`);
    assert.ok(text(guideHtml).includes(label), `${locale}: installation guide category`);
    if (locale !== "zh-CN") {
      const distributorHtml = await get(`${prefix}/contact/distributor/`);
      assert.ok(text(distributorHtml).includes(label), `${locale}: distributor tag`);
    }
    console.log(`PASS: ${locale}: category, 5 models, SEO, links, search, resources and related labels`);
  }
  if (staticOutput) {
    const sitemap = readFileSync("out/sitemap.xml", "utf8");
    for (const locale of locales) {
      for (const slug of [undefined, ...details.map(item => item.slug)]) {
        assert.ok(sitemap.includes(`<loc>https://www.foreachtek.com${getValvelessPumpPath(locale, slug)}</loc>`), `Sitemap: ${locale}/${slug || "category"}`);
      }
      const prefix = locale === "zh-CN" ? "" : `/${locale}`;
      const retired = `${prefix}/products/pumps/valveless-pumps/`;
      assert.ok(!sitemap.includes(`<loc>https://www.foreachtek.com${retired}</loc>`), `Retired category excluded: ${locale}`);
      assert.ok(!existsSync(path.join("out", retired, "index.html")), `No retired HTML: ${locale}`);
    }
    let htmlCount = 0;
    function checkAllLinks(directory: string) {
      for (const entry of readdirSync(directory, { withFileTypes: true })) {
        if (entry.name.startsWith(".") || entry.name === "_next") continue;
        const file = path.join(directory, entry.name);
        if (entry.isDirectory()) checkAllLinks(file);
        else if (entry.name.endsWith(".html")) {
          htmlCount++;
          assert.doesNotMatch(readFileSync(file, "utf8"), /href="(?:https:\/\/www\.foreachtek\.com)?(?:\/(?:en|es|fr|ko|ru))?\/products\/pumps\/valveless-pumps\/?(?:[?#][^"]*)?"/, `Retired category link in export: ${file}`);
        }
      }
    }
    checkAllLinks("out");
    console.log(`PASS: Sitemap and ${htmlCount} exported HTML files contain no obsolete valveless category links.`);
  }
  console.log(`PASS: ${pages} product pages and 17 resource/cooperation pages; preserved detail addresses and custom-product notices.`);
}
check().catch(error => { console.error(error); process.exitCode = 1; });
