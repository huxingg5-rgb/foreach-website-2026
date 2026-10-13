import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { onRequest } from "../../functions/_middleware";
import { getLegacyTubingSelectionTarget, getTubingSelectionPath, getTubingDetailPath, getTubingLanguagePath, tubingMaterials } from "../../data/products/selection/tubing-selection-routes";
import { getTubingMaterialCopy } from "../../data/products/tubing/content";
import { getEnabledLocaleCodes } from "../../data/languages";

function readProductModel(html: string, path: string): Record<string, unknown> {
  const models = Array.from(html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g))
    .flatMap(match => {
      const data = JSON.parse(match[1]);
      return data["@graph"] || [data];
    })
    .filter(node => node["@type"] === "ProductModel");
  assert.equal(models.length, 1, `${path}: one product model entity`);
  return models[0];
}

async function main() {
  const baseUrl = process.argv.find(arg => arg.startsWith("--base-url="))?.slice("--base-url=".length);
  const readPage = async (path: string) => {
    if (!baseUrl) return readFileSync(join("out", path, "index.html"), "utf8");
    const response = await fetch(new URL(path, baseUrl));
    assert.equal(response.status, 200, path);
    return response.text();
  };
  const routes = JSON.parse(readFileSync("public/_routes.json", "utf8"));
  let redirects = 0;
  let pages = 0;
  let detailPages = 0;
  let pumpPages = 0;
  const sitemap = baseUrl ? undefined : readFileSync(join("out", "sitemap.xml"), "utf8");
  const languageLocales = ["zh", ...getEnabledLocaleCodes()];
  assert.equal(getTubingSelectionPath("zh-CN"), "/products/tubing/");
  for (const material of tubingMaterials) {
    // The header passes zh-CN; switching to Chinese must keep the material and page role.
    assert.equal(getTubingLanguagePath(`/en/products/tubing/${material}/`, "zh-CN"), `/products/tubing/${material}/`);
    assert.equal(getTubingLanguagePath(`/en/products/tubing/${material}/details/`, "zh-CN"), `/products/tubing/${material}/details/`);
    for (const source of languageLocales) {
      for (const target of languageLocales) {
        assert.equal(getTubingLanguagePath(getTubingDetailPath(source, material), target), getTubingDetailPath(target, material));
        if (["zh", "zh-CN", "en"].includes(source)) {
          assert.equal(getTubingLanguagePath(getTubingSelectionPath(source, material), target),
            ["zh", "zh-CN", "en"].includes(target) ? getTubingSelectionPath(target, material) : `${getTubingSelectionPath(target)}?productType=${material}`);
        }
      }
    }
  }
  for (const locale of ["zh", "en"] as const) {
    const base = locale === "zh" ? "/products/tubing/" : "/en/products/tubing/";
    assert(routes.include.includes(base));
    assert(routes.include.includes(base.slice(0, -1)));
    for (const material of tubingMaterials) {
      const expected = `${base}${material}/`;
      assert.equal(getTubingSelectionPath(locale, material), expected);
      for (const host of ["foreachtek.com", "www.foreachtek.com"]) {
        for (const suffix of ["", "/"]) {
          const url = new URL(`https://${host}${base.slice(0, -1)}${suffix}?productType=${material}&utm_source=test#filters`);
          assert.equal(getLegacyTubingSelectionTarget(url), `${expected}?utm_source=test#filters`);
          const response = await onRequest({ request: new Request(url), next: async () => new Response("pass") });
          assert.equal(response.status, 301);
          assert.equal(response.headers.get("Location"), `https://${host}${expected}?utm_source=test#filters`);
          redirects++;
        }
      }
      const legacyPath = `${base}selection/${material}/`;
      assert.equal(getLegacyTubingSelectionTarget(new URL(`${legacyPath}?utm_source=test#filters`, "https://www.foreachtek.com")), `${expected}?utm_source=test#filters`);
      if (baseUrl) {
        const redirect = await fetch(new URL(legacyPath, baseUrl), { redirect: "manual" });
        assert([301, 308].includes(redirect.status), legacyPath);
        assert.equal(new URL(redirect.headers.get("Location")!, baseUrl).pathname, expected);
      }
      const html = await readPage(expected);
      const copy = getTubingMaterialCopy(material, locale)!;
      assert(html.includes(`<h1`) && html.includes(copy.h1), `${expected}: material heading`);
      assert(html.includes(`rel="canonical" href="https://www.foreachtek.com${expected}"`), `${expected}: canonical`);
      assert(/name="robots" content="index, follow"/.test(html), `${expected}: indexable`);
      assert(!/name="(?:robots|googlebot)" content="[^"]*noindex/.test(html), `${expected}: no indexing exclusion`);
      if (sitemap !== undefined) {
        assert(sitemap.includes(`<loc>https://www.foreachtek.com${expected}</loc>`), `${expected}: sitemap inclusion`);
      }
      const schemaText = html.match(/<script[^>]*id="product-selection-structured-data"[^>]*>([\s\S]*?)<\/script>/)?.[1];
      assert(schemaText, `${expected}: selection schema`);
      const graph = JSON.parse(schemaText)["@graph"];
      const list = graph.find((item: { "@type": string }) => item["@type"] === "ItemList");
      assert.equal(list.numberOfItems, 1, `${expected}: one matching card`);
      assert.equal(list.itemListElement[0].url, `https://www.foreachtek.com${getTubingDetailPath(locale, material)}`);
      const crumbs = graph.find((item: { "@type": string }) => item["@type"] === "BreadcrumbList");
      assert.equal(crumbs.itemListElement.length, 4);
      pages++;
    }
  }
  for (const locale of ["zh", "en", "es", "fr", "ko", "ru"]) {
    for (const material of tubingMaterials) {
      const detailPath = getTubingDetailPath(locale, material);
      const detail = await readPage(detailPath);
      assert(!/name="robots" content="[^"]*noindex/.test(detail), "Detail must remain indexable");
      assert(detail.includes('data-tubing-detail-page="true"'), detailPath);
      assert(detail.includes(`rel="canonical" href="https://www.foreachtek.com${detailPath}"`), detailPath);
      const product = readProductModel(detail, detailPath);
      assert.equal(product.model, undefined, `${detailPath}: material selector must not expose a UI prompt or material name as a model`);
      assert.equal(product.url, `https://www.foreachtek.com${detailPath}`);
      assert(typeof product.name === "string" && product.name.trim(), `${detailPath}: product name retained`);
      if (locale === "zh" || locale === "en") {
        assert(detail.includes(locale === "zh" ? "请选择尺寸" : "Select a Size"), `${detailPath}: selection prompt retained in the UI`);
      }
      detailPages++;
    }
    const pumpPath = `${locale === "zh" ? "" : `/${locale}`}/products/pumps/miniature-diaphragm-pumps/dpl30-db/`;
    const pump = readProductModel(await readPage(pumpPath), pumpPath);
    assert.equal(pump.model, "DPL30-DB", `${pumpPath}: diaphragm pump model unchanged`);
    pumpPages++;
  }
  for (const path of [
    "/en/products/tubing/", "/en/products/tubing/?productType=invalid",
    "/en/products/tubing/ptfe-tubing/?productType=pvc-tubing",
    "/en/products/pumps/?productType=ptfe-tubing", "/fr/products/tubing/?productType=ptfe-tubing",
  ]) {
    assert.equal(getLegacyTubingSelectionTarget(new URL(path, "https://www.foreachtek.com")), undefined);
  }
  const post = await onRequest({ request: new Request("https://www.foreachtek.com/en/products/tubing/?productType=ptfe-tubing", { method: "POST" }), next: async () => new Response("pass") });
  assert.equal(await post.text(), "pass");
  console.log(JSON.stringify({ pages, detailPages, pumpPages, redirects, errors: 0 }));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
