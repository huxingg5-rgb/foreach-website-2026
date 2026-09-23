import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getLocalizedSiteHref } from "../../lib/seo/site-url";
import {
  getProductTypeHrefByIds,
  getProductTypeRouteParams,
  resolveProductTypeRoute,
} from "../../data/products/selection/product-route-map";
import {
  localizeValvelessPumpCategoryPath,
  VALVELESS_PUMP_CATEGORY_LABEL_ZH,
} from "../../data/products/selection/valveless-pump-routes";
import { getChineseProductBreadcrumbs } from "../../data/products/detail/chinese-product-breadcrumbs";
import { getVisibleNavigationItems } from "../../data/navigation";
import { siteSearchIndex } from "../../data/search/site-search-index.generated";
import { valvelessPumpIntroZh } from "../../data/products/selection/valveless-pump-copy.zh";
import { valvelessPumpSelectionProducts } from "../../data/products/selection/valveless-pump-selection.generated";
import { applyValvelessPumpChineseCopy } from "../../data/products/detail/valveless-pump-copy.zh";
import { getValvelessPumpCategoryIntro } from "../../data/products/selection/product-type-intro";
import { getLocalizedFilterOptionLabel } from "../../components/products/selection/filter-option-i18n";

const oldPath = "/products/pumps/valveless-pumps/";
const newPath = "/products/pumps/valveless-metering-pump/";
const locales = ["en", "es", "fr", "ko", "ru"] as const;
const models = ["rpl-p4", "rpl-p635", "rpl-p15", "drpl-0109", "drpl-0119"];

const seriesLabels = [
  { value: "RPL 无阀泵", label: "RPL 单头无阀计量泵", count: 3, en: "RPL Single-Head Valveless Metering Pump" },
  { value: "DRPL 双头无阀泵", label: "DRPL 双头无阀计量泵", count: 2, en: "DRPL Dual-Head Valveless Metering Pump" },
];
for (const series of seriesLabels) {
  assert.equal(getLocalizedFilterOptionLabel(series.value, "zh"), series.label);
  assert.equal(getLocalizedFilterOptionLabel(series.value, "zh-CN"), series.label);
  assert.equal(getLocalizedFilterOptionLabel(series.value, "en"), series.en);
  assert.equal(getValvelessPumpCategoryIntro(series.value, "zh")?.title, series.label);
  assert.equal(valvelessPumpSelectionProducts.filter((product) => product.filters?.filter01 === series.value).length, series.count);
}
for (const product of valvelessPumpSelectionProducts) {
  assert.ok(product.cardSubtitle.zh?.includes("无阀计量泵"), product.productId);
  const data = { productTypeId: "valveless-pump", slug: product.detailSlug, title: "baseline title" };
  assert.equal(applyValvelessPumpChineseCopy(data, "zh").title, `Foreach ${product.cardSubtitle.zh}`);
  for (const locale of locales) assert.equal(applyValvelessPumpChineseCopy(data, locale).title, data.title);
}

assert.equal(getProductTypeHrefByIds("pumps", "valveless-pump"), newPath.slice(0, -1));
assert.equal(resolveProductTypeRoute("pumps", "valveless-metering-pump")?.productTypeId, "valveless-pump");
assert.equal(resolveProductTypeRoute("pumps", "valveless-pumps"), null);
const params = getProductTypeRouteParams().filter((item) => item.slug.startsWith("valveless"));
assert.deepEqual(params, [{ category: "pumps", slug: "valveless-metering-pump" }]);
assert.equal(getLocalizedSiteHref(`${oldPath}?series=rpl#models`, "zh-CN"), `${newPath}?series=rpl#models`);
assert.equal(getLocalizedSiteHref(newPath, "zh-CN"), newPath);
assert.equal(localizeValvelessPumpCategoryPath("/images/products/pumps/valveless-pumps/a.webp", "zh"), "/images/products/pumps/valveless-pumps/a.webp");

for (const locale of locales) {
  assert.equal(resolveProductTypeRoute("pumps", "valveless-pumps", locale), null);
  assert.equal(resolveProductTypeRoute("pumps", "valveless-metering-pump", locale)?.productTypeId, "valveless-pump");
  assert.equal(getLocalizedSiteHref(newPath, locale), `/${locale}${newPath}`);
  assert.equal(getLocalizedSiteHref(`/${locale}${oldPath}`, "zh-CN"), newPath);
  for (const model of models) {
    const path = `${oldPath}${model}/`;
    assert.equal(getLocalizedSiteHref(path, "zh-CN"), `${newPath}${model}/`);
    assert.equal(getLocalizedSiteHref(path, locale), `/${locale}${newPath}${model}/`);
  }
}

const breadcrumbs = getChineseProductBreadcrumbs({
  breadcrumbLabel: "RPL-P4", breadcrumbParentLabel: "无阀泵", breadcrumbParentHref: oldPath,
}, "zh");
assert.deepEqual(breadcrumbs?.[2], { label: VALVELESS_PUMP_CATEGORY_LABEL_ZH, href: newPath });
const navigation = JSON.stringify(getVisibleNavigationItems());
assert.ok(navigation.includes(newPath));
for (const locale of locales) assert.ok(navigation.includes(`/${locale}${newPath}`));
assert.equal(siteSearchIndex.filter((item) => item.href.replace(/\/$/, "") === oldPath.slice(0, -1)).length, 0);
const searchIndex = JSON.parse(readFileSync("public/search-data/global-search-index.zh-CN.v3.json", "utf8")) as { h: string; t: string }[];
assert.ok(searchIndex.some((item) => item.h.replace(/\/$/, "") === newPath.slice(0, -1) && item.t === VALVELESS_PUMP_CATEGORY_LABEL_ZH));
assert.ok(!searchIndex.some((item) => item.h.replace(/\/$/, "") === oldPath.slice(0, -1)));

console.log("PASS: Six-language category routes, locale links, migrated model URLs, breadcrumbs, navigation and search index.");

async function checkHttp() {
  const origin = process.env.VALVELESS_CHECK_ORIGIN || "http://127.0.0.1:3000";
  async function assertUnavailable(path: string) {
    const response = await fetch(`${origin}${path}`, { redirect: "manual" });
    const html = await response.text();
    // Next dev can flush a 200 streaming shell before notFound() is resolved.
    const streamedNotFound = response.status === 200 &&
      html.includes("NEXT_HTTP_ERROR_FALLBACK;404") &&
      /<meta[^>]+name="robots"[^>]+content="noindex"/.test(html);
    assert.ok(response.status === 404 || streamedNotFound, `Expected unavailable route: ${path} (${response.status})`);
    assert.ok(!/<h1\b[^>]*>[^<]*(?:无阀|Valveless)/i.test(html), `Retired category content still rendered: ${path}`);
    console.log(`Unavailable: ${path} (${response.status}${streamedNotFound ? ", Next dev streamed notFound/noindex" : ""})`);
  }
  const response = await fetch(`${origin}${newPath}`, { redirect: "manual" });
  assert.equal(response.status, 200, newPath);
  const html = await response.text();
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  assert.equal(h1s.length, 1);
  assert.equal(h1s[0][1], valvelessPumpIntroZh.category.title);
  assert.ok(html.includes(`rel="canonical" href="https://www.foreachtek.com${newPath}"`));
  assert.ok(html.includes(VALVELESS_PUMP_CATEGORY_LABEL_ZH));
  assert.ok(html.includes(`<strong>${VALVELESS_PUMP_CATEGORY_LABEL_ZH}</strong>`), "Breadcrumb label");
  assert.ok(html.includes(`<span class="filter-check"></span><span>${VALVELESS_PUMP_CATEGORY_LABEL_ZH}</span>`), "Product-type filter label");
  assert.ok(html.includes(`<span class="selected-tag">${VALVELESS_PUMP_CATEGORY_LABEL_ZH}</span>`), "Selected category tag");
  assert.ok(!html.includes(`href="${oldPath}"`));
  const visibleText = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&");
  for (const paragraph of valvelessPumpIntroZh.category.paragraphs) {
    const paragraphText = paragraph.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    assert.ok(visibleText.includes(paragraphText), `Category paragraph: ${paragraphText}`);
  }
  for (const series of seriesLabels) assert.ok(html.includes(`<span>${series.label}</span>`), `Series filter: ${series.label}`);
  const cardHtml = html.match(/<article\b[^>]*data-product-type-id="valveless-pump"[^>]*>[\s\S]*?<\/article>/g) || [];
  assert.equal(cardHtml.length, 5);
  for (const [index, product] of valvelessPumpSelectionProducts.entries()) {
    assert.ok(cardHtml[index].includes(`<p class="product-title">${product.cardTitle.zh}</p>`), `Model heading: ${product.detailSlug}`);
    assert.ok(cardHtml[index].includes(`<h3 class="product-card-summary product-card-description-heading">${product.cardSubtitle.zh}</h3>`), `Card H3: ${product.detailSlug}`);
  }
  const detailPaths = [...new Set([...html.matchAll(/href="(\/products\/pumps\/valveless-metering-pump\/[^"?#]+)"/g)].map((match) => match[1]))];
  assert.equal(detailPaths.length, 5);
  for (const path of detailPaths) {
    const detail = await fetch(`${origin}${path.endsWith("/") ? path : `${path}/`}`, { redirect: "manual" });
    assert.equal(detail.status, 200, path);
    const detailHtml = await detail.text();
    const slug = path.split("/").filter(Boolean).at(-1);
    const card = valvelessPumpSelectionProducts.find((product) => product.detailSlug === slug);
    const detailH1 = [...detailHtml.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
    assert.equal(detailH1.length, 1);
    assert.equal(detailH1[0][1], `Foreach ${card?.cardSubtitle.zh}`, `Linked detail H1: ${slug}`);
    assert.ok(!detailHtml.includes(`href="${oldPath}"`), `Old category backlink: ${path}`);
    assert.ok(detailHtml.includes(`href="${newPath}"`), `Missing category backlink: ${path}`);
  }
  await assertUnavailable(oldPath);
  for (const locale of locales) {
    const foreign = await fetch(`${origin}/${locale}${newPath}`, { redirect: "manual" });
    assert.equal(foreign.status, 200, locale);
    const foreignHtml = await foreign.text();
    assert.ok(foreignHtml.includes(`hrefLang="zh-CN" href="https://www.foreachtek.com${newPath}"`), `Chinese hreflang: ${locale}`);
    await assertUnavailable(`/${locale}${oldPath}`);
  }
  console.log("PASS: Local category, canonical/hreflang, series labels, five card H3/detail H1 pairs, migrated model routes and unavailable obsolete categories.");
}

if (process.argv.includes("--http")) checkHttp().catch((error) => { console.error(error); process.exitCode = 1; });
