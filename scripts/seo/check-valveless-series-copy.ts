import assert from "node:assert/strict";
import details from "../../data/products/generated/pumps/valveless-pumps/detail/index.json";
import { applyValvelessPumpChineseCopy } from "../../data/products/detail/valveless-pump-copy.zh";
import { getValvelessPumpChineseContent } from "../../data/products/detail/valveless-pump-content.zh";
import { applyValvelessEnglishMaterialNames, expandValvelessMaterialNames } from "../../data/products/detail/valveless-pump-materials.en";
import { valvelessPumpSelectionProducts } from "../../data/products/selection/valveless-pump-selection.generated";

const rawSnapshot = JSON.stringify(details);
const materials: Record<string, string> = { PVDF: "聚偏二氟乙烯（PVDF）", "Al₂O₃": "氧化铝（Al₂O₃）", "ZrO₂": "氧化锆（ZrO₂）" };
for (const original of details) {
  const copy = getValvelessPumpChineseContent(original.slug)!;
  const updated = applyValvelessPumpChineseCopy(original, "zh");
  const card = valvelessPumpSelectionProducts.find(item => item.detailSlug === original.slug)!;
  assert.equal(updated.title, `Foreach ${card.cardSubtitle.zh}`);
  for (const key of ["modelDisplay", "displayModel", "foreachModel", "productCode", "detailHref", "href", "model3dUrl", "drawing2dUrl"] as const) assert.equal(updated[key], original[key], `${original.slug} ${key}`);
  assert.equal(updated.description, copy.description);
  assert.deepEqual(updated.faqs, copy.faqs);
  assert.deepEqual(updated.seo.title, copy.seo.title);
  assert.equal(copy.applicationDetails.items.length, 3);
  assert.ok(copy.applicationDetails.items.every(item => item.paragraphs.length === 3));
  for (const item of copy.applicationDetails.items) {
    assert.ok(item.paragraphs.join("").length > 260, `${original.slug}: substantive content for ${item.title}`);
    assert.match(item.paragraphs[0], /分配泵|加液泵|加注泵|灌装泵|供液泵|计量泵|稀释泵|配液泵/, `${original.slug}: task-specific name for ${item.title}`);
  }
  assert.equal(updated.specs.length, original.specs.length);
  for (const [index, row] of original.specs.entries()) {
    const expected = row.label === "产品类型" ? "RPL 单头无阀计量泵" : original.slug === "rpl-p635" && row.label === "陶瓷套件" ? materials["ZrO₂"] : materials[row.value] || row.value;
    assert.equal(updated.specs[index].value, expected, `${original.slug} ${row.label}`);
  }
  for (const locale of ["en", "es", "fr", "ko", "ru"]) {
    assert.equal(applyValvelessPumpChineseCopy(original, locale), original);
    const legacy = applyValvelessPumpChineseCopy(original, "zh", locale);
    assert.deepEqual(legacy.seo, original.seo);
    assert.deepEqual(legacy.faqs, original.faqs);
    if (locale !== "en") assert.equal(applyValvelessEnglishMaterialNames(legacy, locale), legacy);
  }
}
assert.equal(JSON.stringify(details), rawSnapshot, "Raw source must not mutate");
for (const [short, full] of Object.entries({ PVDF: "polyvinylidene fluoride (PVDF)", "Al₂O₃": "aluminium oxide (Al₂O₃)", "ZrO₂": "zirconium dioxide (ZrO₂)" })) {
  assert.equal(expandValvelessMaterialNames(short), full);
  assert.equal(expandValvelessMaterialNames(full), full, "Idempotent material expansion");
}
const unrelated = { productTypeId: "piston-pump", slug: "rpl-p4", description: "PVDF" };
assert.equal(applyValvelessEnglishMaterialNames(unrelated, "en"), unrelated);
assert.ok(getValvelessPumpChineseContent("drpl-0109")!.description.includes("100 μL"));
assert.ok(getValvelessPumpChineseContent("drpl-0119")!.description.includes("1140 μL"));
console.log("PASS: Five model-specific applications/FAQ, material names, protected identity, unchanged numeric specs and language guards.");

const escape = (text: string) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;");
async function checkHttp() {
  const origin = process.env.VALVELESS_CHECK_ORIGIN || "http://127.0.0.1:3000";
  for (const original of details) {
    const copy = getValvelessPumpChineseContent(original.slug)!;
    const route = `/products/pumps/valveless-pumps/${original.slug}/`;
    const response = await fetch(origin + route);
    assert.equal(response.status, 200);
    const html = await response.text();
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || "";
    assert.ok(main.includes(escape(copy.description)));
    assert.ok(main.includes("该产品为定制品"));
    assert.equal(html.match(/<title>(.*?)<\/title>/)?.[1], escape(copy.seo.title));
    for (const item of copy.applicationDetails.items) {
      assert.ok(main.includes(escape(item.title)), `${original.slug} title`);
      for (const paragraph of item.paragraphs) assert.ok(main.includes(escape(paragraph)), `${original.slug} application paragraph`);
    }
    for (const faq of copy.faqs) {
      assert.ok(main.includes(escape(faq.question)), `${original.slug} FAQ question`);
      assert.ok(main.includes(escape(faq.answer)), `${original.slug} FAQ answer`);
    }
    const graph = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m => JSON.parse(m[1])["@graph"] || []);
    const product = graph.find(item => item["@type"] === "ProductModel");
    assert.equal(product.description, copy.description);
    assert.equal(product.model, original.modelDisplay);
    const faq = graph.find(item => item["@type"] === "FAQPage");
    assert.deepEqual(faq.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => ({ question: item.name, answer: item.acceptedAnswer.text })), copy.faqs);
    const en = await fetch(origin + "/en" + route);
    assert.equal(en.status, 200);
    const enHtml = await en.text();
    if (original.slug.startsWith("rpl")) {
      assert.ok(enHtml.includes("polyvinylidene fluoride (PVDF)"));
      assert.ok(enHtml.includes(original.slug === "rpl-p635" ? "zirconium dioxide (ZrO₂)" : "aluminium oxide (Al₂O₃)"));
    }
    console.log("PASS: Live Chinese content/schema and English material names:", original.slug);
  }
}
if (process.argv.includes("--http")) checkHttp().catch(error => { console.error(error); process.exitCode = 1; });
