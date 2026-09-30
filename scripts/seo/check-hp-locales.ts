import assert from "node:assert/strict";
import { getHpValveDetailPath, valveLocales } from "../../data/products/selection/valve-routes";

async function main() {
  const base = process.env.CHECK_BASE_URL || "http://127.0.0.1:3000";
  for (const locale of valveLocales) {
    const path = getHpValveDetailPath(locale);
    const response = await fetch(`${base}${path}`);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
    const graph = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(match => JSON.parse(match[1])["@graph"] || []);
    const product = graph.find(item => item["@type"] === "ProductModel");
    assert(product?.description.includes("HP-26SSU3204"), `${locale}: product-specific description`);
    assert(product.description.includes("SUS316L"), `${locale}: stator material`);
    const faq = graph.find(item => item["@type"] === "FAQPage");
    assert.equal(faq?.mainEntity.length, 6, `${locale}: full HP FAQs`);
    assert(text.includes("10-32 UNF"), `${locale}: port specification`);
    if (locale !== "zh") {
      assert(!/[\u3400-\u9fff]/u.test(text.replace(/简体中文/g, "")), `${locale}: Chinese text leaked into rendered page`);
      assert(!/high-pressurerotating|technical details|Available by configuration|15 cycles|requiresconfirm/.test(text), `${locale}: generic translation artifacts`);
      assert(/150[,. ]000/.test(text), `${locale}: preserve 150,000 cycles, not 15`);
      assert(!/[\u3400-\u9fff]/u.test(JSON.stringify(faq)), `${locale}: localized FAQ schema`);
    }
    console.log(`${locale}: HP description, applications, specifications and FAQs passed`);
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
