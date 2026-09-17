import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import details from "../../data/products/generated/pumps/valveless-pumps/detail/index.json";
import { valvelessPumpSelectionProducts } from "../../data/products/selection/valveless-pump-selection.generated";
import { applyValvelessPumpChineseCopy } from "../../data/products/detail/valveless-pump-copy.zh";
import {
  applyRplP4ChineseDetailCopy,
  rplP4ApplicationsZh,
  rplP4DescriptionZh,
  rplP4FaqsZh,
  rplP4PresentationZh,
  rplP4SeoZh,
} from "../../data/products/detail/rpl-p4-copy.zh";

const original = details.find((item) => item.slug === "rpl-p4")!;
const originalSnapshot = JSON.stringify(details);
const data = applyValvelessPumpChineseCopy(original, "zh");
const card = valvelessPumpSelectionProducts.find((item) => item.detailSlug === "rpl-p4")!;
assert.equal(data.model, `Foreach ${card.cardSubtitle.zh}`);
assert.equal(data.modelDisplay, original.modelDisplay);
assert.equal(data.displayModel, original.displayModel);
assert.equal(data.foreachModel, original.foreachModel);
assert.equal(data.productCode, original.productCode);
assert.equal(data.detailHref, original.detailHref);
assert.equal(data.description, rplP4DescriptionZh);
assert.equal(data.seo.title, rplP4SeoZh.title);
assert.equal(data.seo.description, rplP4SeoZh.description);
assert.deepEqual(data.faqs, rplP4FaqsZh);
assert.equal(data.faqs.length, 5);
assert.equal(data.specs.length, original.specs.length);
for (const [index, row] of original.specs.entries()) {
  const updated = data.specs[index];
  if (row.label === "产品类型") {
    assert.equal(updated.value, "RPL 单头无阀计量泵");
  } else if (row.value === "PVDF") {
    assert.equal(updated.value, "聚偏二氟乙烯（PVDF）");
  } else if (row.value === "Al₂O₃") {
    assert.equal(updated.value, "氧化铝（Al₂O₃）");
  } else {
    assert.equal(updated.value, row.value, `Unchanged value: ${row.label}`);
    assert.equal(updated.label, row.label === "排量范围" ? "单圈排量" : row.label);
  }
}
assert.equal(JSON.stringify(details), originalSnapshot, "No source data mutation");
assert.deepEqual(applyRplP4ChineseDetailCopy(data, "zh"), data, "Idempotent P4 copy");
for (const item of details) {
  if (item.slug !== "rpl-p4") {
    assert.equal(applyRplP4ChineseDetailCopy(item, "zh"), item, `Unchanged model: ${item.slug}`);
    const other = applyValvelessPumpChineseCopy(item, "zh");
    assert.ok(!("rplP4ChineseCopy" in other));
    assert.ok(other.seo.title.includes("无阀计量泵"));
    assert.equal(other.faqs.length, 5);
  }
  for (const locale of ["en", "es", "fr", "ko", "ru"]) {
    assert.equal(applyRplP4ChineseDetailCopy(item, locale), item);
    assert.equal(applyValvelessPumpChineseCopy(item, locale), item);
    const foreignSource = applyValvelessPumpChineseCopy(item, "zh", locale);
    assert.ok(!("rplP4ChineseCopy" in foreignSource), `No Chinese P4 override in ${locale} source`);
    assert.deepEqual(foreignSource.faqs, item.faqs);
    assert.deepEqual(foreignSource.seo, item.seo);
    if (item.slug === "rpl-p4") assert.deepEqual(foreignSource.specs, item.specs);
  }
}
assert.equal(applyRplP4ChineseDetailCopy({ slug: "rpl-p4", productTypeId: "other" }, "zh").productTypeId, "other");
assert.ok(rplP4ApplicationsZh.items.every((item) => !item.title.includes("终点控制")));
assert.ok(rplP4ApplicationsZh.items[1].paragraphs.some((text) => text.includes("泵本身不承担")));
assert.ok(!rplP4PresentationZh.bottomCta.desc.includes("配比要求"));
assert.ok(!rplP4PresentationZh.bottomCta.desc.includes("清洗口"));
assert.ok(rplP4PresentationZh.drawingUnavailable.includes("再到选型清单"));

// The protected visible model row remains driven by the shared custom notice.
const client = readFileSync("components/products/detail/ProductDetailClient.tsx", "utf8");
assert.match(client, /data-product-model-row="true"[\s\S]*?\{customProductCopy\.notice\}/);
assert.match(client, /description=\{rplP4Copy\?\.drawingUnavailable\}/);
assert.match(client, /description=\{rplP4Copy\?\.modelUnavailable\}/);
assert.match(client, /onClick=\{handleAddDrawing\}/);
assert.match(client, /configuratorLocale === "zh" && data\.slug === "rpl-p4"/);
console.log("PASS: P4 reviewed copy, unchanged H1/model notice/numeric specs/routes, FAQ, applications and resource guidance.");

async function checkHttp() {
  const origin = process.env.VALVELESS_CHECK_ORIGIN || "http://127.0.0.1:3000";
  const path = "/products/pumps/valveless-pumps/rpl-p4/";
  const response = await fetch(`${origin}${path}`, { redirect: "manual" });
  assert.equal(response.status, 200);
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || "";
  const h1s = [...main.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  assert.equal(h1s.length, 1);
  assert.equal(h1s[0][1], data.model);
  const modelRow = main.match(/<div data-product-model-row="true"[\s\S]*?<\/button>/)?.[0] || "";
  assert.ok(modelRow.includes("型号："));
  assert.ok(modelRow.includes("该产品为定制品"));
  assert.equal(html.match(/<title>(.*?)<\/title>/)?.[1], rplP4SeoZh.title);
  for (const attribute of ["name=\"description\"", "property=\"og:description\"", "name=\"twitter:description\""]) {
    assert.ok(html.includes(`${attribute} content="${rplP4SeoZh.description}"`), attribute);
  }
  assert.ok(main.includes(rplP4DescriptionZh));
  assert.equal([...main.matchAll(/data-product-spec-row="true"/g)].length, original.specs.length);
  assert.equal([...main.matchAll(/data-product-spec-note="true"/g)].length, 2);
  assert.ok(main.includes("加入图纸需求"));
  assert.ok(main.includes(rplP4PresentationZh.drawingUnavailable));
  assert.ok(main.includes(rplP4PresentationZh.bottomCta.title));
  for (const item of rplP4ApplicationsZh.items) {
    assert.ok(main.includes(item.title));
    for (const text of item.paragraphs) assert.ok(main.includes(text));
  }
  for (const faq of rplP4FaqsZh) {
    assert.ok(main.includes(faq.question));
    assert.ok(main.includes(faq.answer));
  }
  const structured = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .flatMap((match) => JSON.parse(match[1])["@graph"] || []);
  const product = structured.find((entry) => entry["@type"] === "ProductModel");
  assert.equal(product.description, rplP4DescriptionZh);
  assert.equal(product.model, original.modelDisplay, "Model-related fields not changed in this round");
  assert.ok(product.url.endsWith(path));
  const faqPage = structured.find((entry) => entry["@type"] === "FAQPage");
  assert.deepEqual(faqPage.mainEntity.map((item: {name: string; acceptedAnswer: {text: string}}) => ({ question: item.name, answer: item.acceptedAnswer.text })), rplP4FaqsZh);
  assert.ok(html.includes('href="/products/pumps/valveless-metering-pump/"'));
  console.log("PASS: Live P4 HTML, metadata/social copy, 13 original spec rows, notes, FAQ/schema and protected model row.");
}

if (process.argv.includes("--http")) {
  checkHttp().catch((error) => { console.error(error); process.exitCode = 1; });
}
