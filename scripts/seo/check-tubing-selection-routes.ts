import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { onRequest } from "../../functions/_middleware";
import { getLegacyTubingSelectionTarget, getTubingSelectionPath, tubingMaterials } from "../../data/products/selection/tubing-selection-routes";
import { getTubingMaterialCopy } from "../../data/products/tubing/content";

async function main() {
  const routes = JSON.parse(readFileSync("public/_routes.json", "utf8"));
  let redirects = 0;
  let pages = 0;
  for (const locale of ["zh", "en"] as const) {
    const base = locale === "zh" ? "/products/tubing/" : "/en/products/tubing/";
    assert(routes.include.includes(base));
    assert(routes.include.includes(base.slice(0, -1)));
    for (const material of tubingMaterials) {
      const expected = `${base}selection/${material}/`;
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
      const html = readFileSync(join("out", expected, "index.html"), "utf8");
      const copy = getTubingMaterialCopy(material, locale)!;
      assert(html.includes(`<h1`) && html.includes(copy.h1), `${expected}: material heading`);
      assert(html.includes(`rel="canonical" href="https://www.foreachtek.com${expected}"`), `${expected}: canonical`);
      assert(/name="robots" content="noindex, follow"/.test(html), `${expected}: noindex`);
      const schemaText = html.match(/<script[^>]*id="product-selection-structured-data"[^>]*>([\s\S]*?)<\/script>/)?.[1];
      assert(schemaText, `${expected}: selection schema`);
      const graph = JSON.parse(schemaText)["@graph"];
      const list = graph.find((item: { "@type": string }) => item["@type"] === "ItemList");
      assert.equal(list.numberOfItems, 1, `${expected}: one matching card`);
      assert.equal(list.itemListElement[0].url, `https://www.foreachtek.com${base}${material}/`);
      const crumbs = graph.find((item: { "@type": string }) => item["@type"] === "BreadcrumbList");
      assert.equal(crumbs.itemListElement.length, 4);
      const detail = readFileSync(join("out", base, material, "index.html"), "utf8");
      assert(!/name="robots" content="[^"]*noindex/.test(detail), "Detail must remain indexable");
      pages++;
    }
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
  console.log(JSON.stringify({ pages, redirects, errors: 0 }));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
