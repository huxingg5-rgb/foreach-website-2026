import assert from "node:assert/strict";
import { buildFlangedDrawingSheets } from "../../components/products/tubing-assemblies/flanged-tubing-drawing";
import { defaultAssemblyChoice, selectAssemblyFitting } from "../../data/products/configurator/flanged-tubing";
import { emptyFlangedConfigurationStore, saveFlangedConfiguration, type FlangedConfiguration } from "../../data/products/configurator/flanged-tubing-configurations";
import { assemblyText } from "../../data/products/configurator/tubing-assembly.intl";

const locales = ["zh", "en", "es", "fr", "ko", "ru"];
const familyEntries = ["flanged-tubing", "ferrule-kits", "retaining-ring-kits"].flatMap(family => ["", "fep", "ptfe", "pfa", "black-ptfe"].map(material => material ? `${family}-${material}` : family));
const texts = (svg: string) => [...svg.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)].map(match => match[1].replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&apos;", "'").replaceAll("&amp;", "&")).join("\n");
const compact = (value: string) => value.replace(/\s/g, "");
const detailText = (pages: string[], locale: string) => pages.map((svg, index) => {
  const body = svg.match(index === 0 ? /<g data-drawing-notes="true">([\s\S]*?)<\/g>/ : /<g data-continuation-content="true">([\s\S]*?)<\/g>/)?.[1] || "";
  return texts(body).split("\n").filter(value => value !== assemblyText("见续页", locale)).join("");
}).join("");
const save = (choice: ReturnType<typeof defaultAssemblyChoice>, name = "Configuration 1") => saveFlangedConfiguration(emptyFlangedConfigurationStore(), choice, name, null, "2026-11-15T00:00:00Z", "00000000-0000-4000-8000-000000000001").record;
let cases = 0;
function check(record: FlangedConfiguration, locale: string, expected?: number) {
  const before = JSON.stringify(record), pages = buildFlangedDrawingSheets(record, locale);
  if (expected !== undefined) assert.equal(pages.length, expected, `${record.choice.a.series}/${record.choice.mode}/${locale}`);
  pages.forEach((svg, index) => {
    assert.ok(texts(svg).includes(assemblyText(`第 ${index + 1} / ${pages.length} 页`, locale)));
    assert.ok(!/data-detail-end=|<image\b|NaN|undefined/.test(svg));
    assert.ok(!/\/downloads\/|图形来源|geometry source/.test(texts(svg)), "internal source URLs do not create customer-facing pages");
    if (index > 0) {
      assert.match(svg, /data-continuation-content="true"/);
      const body = svg.match(/<g data-continuation-content="true">([\s\S]*?)<\/g>/)?.[1] || "";
      assert.ok((body.match(/<text\b/g) || []).length > 0, "no empty continuation pages");
      assert.ok((body.match(/<text\b/g) || []).length <= 23, "continuation lines fit above the BOM");
    }
  });
  assert.equal(JSON.stringify(record), before, "drawing pagination does not alter saved choices");
  cases++;
  return pages;
}

for (const entry of familyEntries) for (const mode of ["single", "double"] as const) {
  const choice = { ...defaultAssemblyChoice(entry), mode, length: "1255", labelA: true, labelB: true, textA: "A-123", textB: "B-456" };
  for (const locale of locales) {
    check(save(choice), locale, 1);
    const short = check(save({ ...choice, notes: "Check label position." }), locale, 1);
    assert.ok(texts(short[0]).includes("Check label position."));
  }
}

const base = { ...defaultAssemblyChoice("flanged-tubing-fep"), length: "1255" };
const ferrule = selectAssemblyFitting(base.a, "HN-M6-16-PV-N", 1.6);
const mixed = { ...base, a: ferrule };
for (const locale of locales) for (const choice of [base, mixed]) {
  const capacity = choice.a.series === "HFL" ? 2 : 3;
  check(save({ ...choice, notes: Array.from({ length: capacity }, (_, i) => `Line-${i + 1}`).join("\n") }), locale, 1);
  const overflow = check(save({ ...choice, notes: Array.from({ length: capacity + 1 }, (_, i) => `Line-${i + 1}`).join("\n") }), locale, 2);
  assert.ok(texts(overflow[0]).includes(assemblyText("见续页", locale)));
  const longNotes = Array.from({ length: 50 }, (_, i) => `REQ-${String(i + 1).padStart(2, "0")}: keep.`).join("\n");
  const long = check(save({ ...choice, notes: longNotes }), locale);
  assert.ok(long.length >= 3, "large requirements split across enough continuation sheets");
  const fullText = compact(long.map(texts).join(""));
  for (const note of longNotes.split("\n")) assert.ok(fullText.includes(compact(note)), `lost requirement: ${note}`);
  const justNotes = long.slice(1).map(svg => svg.match(/<g data-continuation-content="true">([\s\S]*?)<\/g>/)?.[1] || "").join("");
  assert.ok(!justNotes.includes("HFL-U28-16-PV-N"), "notes-only overflow does not duplicate the BOM as prose");

  const values = {
    company: "公司".repeat(60), contact: "联系人".repeat(40), application: "仪器".repeat(60),
    customerPart: "PN".repeat(60), notes: "客户原文：公司；本色；<keep>& unchanged.",
    labelA: true, textA: "甲".repeat(80), labelB: true, textB: "乙".repeat(80),
  };
  const title = "配置".repeat(20);
  const crowded = check(save({ ...choice, ...values }, title), locale);
  assert.ok(crowded.length > 1);
  const content = compact(crowded.map(texts).join(""));
  for (const value of [values.company, values.contact, values.application, values.customerPart, values.notes, values.textA, values.textB, title]) assert.ok(content.includes(compact(value)), `full customer text missing: ${value.slice(0, 20)}`);
  const single = check(save({ ...choice, mode: "single", freeEnd: "针", freeEndNote: "Needle port spec: ".repeat(15) }), locale);
  assert.ok(compact(detailText(single, locale)).includes(compact("Needle port spec: ".repeat(15))), `${locale}: all free-end requirements survive page breaks`);
}
console.log(`PASS: ${cases} pagination cases across six locales; normal/short requirements on one sheet, exact capacity boundaries, complete overflow text, no separate detail/source pages, correct numbering and unchanged configuration data.`);
