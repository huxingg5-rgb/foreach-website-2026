import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { allTubingAssemblyLocales, getTubingAssemblyLocalePrefix } from "../../data/products/tubing-assemblies/locales";
import { getTubingAssemblySelectionContent, getLocalizedAssemblyDetail, getTubingAssemblyAlternates } from "../../data/products/tubing-assemblies/localized";
import { getPublishedAssemblyConfigurations, isPublishedAssemblyPath } from "../../data/products/tubing-assemblies/publication";
import { getTubingAssemblyRedirectEntries } from "../../data/products/tubing-assemblies/redirects";
import { tubingAssemblyTypes } from "../../data/products/tubing-assemblies.en";
import { getTubingAssemblySearchItems } from "../../data/products/tubing-assemblies/search";
import { onRequest } from "../../functions/_middleware";

const assets = new Set<string>();
function collect(value: unknown) {
  if (typeof value === "string" && value.startsWith("/images/")) assets.add(value);
  else if (Array.isArray(value)) value.forEach(collect);
  else if (value && typeof value === "object") Object.values(value).forEach(collect);
}
let checkedPages = 0;
for (const locale of allTubingAssemblyLocales) {
  const prefix = getTubingAssemblyLocalePrefix(locale);
  const content = getTubingAssemblySelectionContent(locale);
  assert.equal(content.cards.length, 12, `${locale}: twelve active assemblies`);
  collect(content);
  for (const family of tubingAssemblyTypes) {
    assert.equal(getPublishedAssemblyConfigurations(family.id).length, 4);
    for (const configuration of [undefined, ...getPublishedAssemblyConfigurations(family.id)]) {
      collect(getLocalizedAssemblyDetail(locale, family.id, configuration));
    }
    for (const retired of ["coiled", "sleeved"]) {
      assert.equal(isPublishedAssemblyPath(`${prefix}/products/tubing-assemblies/${family.id}/details/${retired}/`), false);
    }
  }
  const items = getTubingAssemblySearchItems(locale);
  assert.equal(items.length, 19);
  for (const item of items) {
    assert.ok(item.href.startsWith(`${prefix}/products/tubing-assemblies/`));
    assert.equal(Object.keys(getTubingAssemblyAlternates(item.href)).length, 7);
    assert.ok(!/\/(coiled|sleeved)\//.test(item.href));
    if (process.argv.includes("--built")) {
      const file = path.join("out", item.href, "index.html");
      assert.ok(fs.existsSync(file), `Missing built route: ${item.href}`);
      const html = fs.readFileSync(file, "utf8");
      assert.ok(html.includes('rel="canonical"'), `Missing canonical: ${item.href}`);
      assert.ok(!html.includes('/zh-CN/products/tubing-assemblies/'), `Invalid Chinese prefix: ${item.href}`);
    }
    checkedPages++;
  }
}
for (const asset of assets) assert.ok(fs.existsSync(path.join("public", asset)), `Missing image: ${asset}`);
const redirects = getTubingAssemblyRedirectEntries();
assert.equal(redirects.length, 60);
assert.equal(new Set(redirects.map(rule => rule.source)).size, 60);
const hostRules = fs.readFileSync("public/_redirects", "utf8");
for (const rule of redirects) {
  assert.match(rule.source, /^\/(en|es|fr|ko|ru)\/products\/tubing-assemblies\/.+\/details\/(coiled|sleeved)\/?$/);
  assert.equal(rule.statusCode, 301);
  assert.ok(hostRules.includes(`${rule.source} ${rule.destination} 301`));
  if (process.argv.includes("--built")) {
    assert.ok(fs.existsSync(path.join("out", rule.destination, "index.html")));
    assert.ok(!fs.existsSync(path.join("out", rule.source, "index.html")));
  }
}
async function checkHostedRedirects() {
  const routes = JSON.parse(fs.readFileSync("public/_routes.json", "utf8")) as { include: string[]; exclude: string[] };
  assert.ok(routes.include.length + routes.exclude.length <= 100, "Cloudflare function route limit");
  const next = async () => new Response("pass-through", { status: 418 });
  for (const rule of redirects) {
    assert.ok(routes.include.includes(`${rule.source.replace(/\/$/, "")}*`), `Missing function route: ${rule.source}`);
    for (const method of ["GET", "HEAD"]) {
      const response = await onRequest({ request: new Request(`https://www.foreachtek.com${rule.source}?ref=legacy`, { method }), next });
      assert.equal(response.status, 301, `${method}: ${rule.source}`);
      assert.equal(response.headers.get("Location"), `https://www.foreachtek.com${rule.destination}?ref=legacy`);
    }
  }
  for (const source of [
    "/products/tubing-assemblies/flanged-tubing/details/coiled/",
    "/zh-CN/products/tubing-assemblies/flanged-tubing/details/coiled/",
    "/en/products/tubing-assemblies/flanged-tubing/details/pfa/",
    "/en/products/tubing-assemblies/unknown/details/coiled/",
    "/en/products/tubing-assemblies/flanged-tubing/details/coiled-extra/",
  ]) {
    assert.equal((await onRequest({ request: new Request(`https://www.foreachtek.com${source}`), next })).status, 418, source);
  }
  assert.equal((await onRequest({ request: new Request(`https://www.foreachtek.com${redirects[0].source}`, { method: "POST" }), next })).status, 418);
  console.log(JSON.stringify({ checkedPages, activeConfigurations: 12, locales: 6, redirects: redirects.length, assets: assets.size, hostedRedirectChecks: 126, functionRoutes: routes.include.length, built: process.argv.includes("--built") }));
}
checkHostedRedirects().catch(error => { console.error(error); process.exitCode = 1; });
