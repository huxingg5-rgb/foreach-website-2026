import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { assemblyText, assemblyUiRows, assemblyFormat, assemblyHtmlLocale } from "../../data/products/configurator/tubing-assembly.intl";
import { assemblyMessageRows } from "../../data/products/configurator/tubing-assembly-errors.intl";
import { localizedAssemblySummary } from "../../data/products/configurator/tubing-assembly-presentation";
import { assemblyView } from "../../components/products/tubing-assemblies/assembly-view";
import { buildFlangedDrawingSheets } from "../../components/products/tubing-assemblies/flanged-tubing-drawing";
import { defaultAssemblyChoice, selectAssemblyFitting, validateFlangedChoice, normalizeFlangedChoice } from "../../data/products/configurator/flanged-tubing";
import { assemblyFittings, assemblyTubes } from "../../data/products/configurator/tubing-assembly-catalog";
import { getAssemblyEntryPreset } from "../../data/products/configurator/tubing-assembly-entry";
import type { FlangedConfiguration } from "../../data/products/configurator/flanged-tubing-configurations";
import { getInquiryAttachmentCopy } from "../../components/forms/company-info-request/InquiryAttachmentField.copy";

const languages = ["en", "es", "fr", "ko", "ru"] as const;
const han = /\p{Script=Han}/u;
const strings = (sheets: string[]) => sheets.flatMap(svg => [...svg.matchAll(/<text\b[^>]*>(.*?)<\/text>/g)].map(match => match[1]));
const record = (choice = { ...defaultAssemblyChoice("flanged-tubing-fep"), length: "150" }): FlangedConfiguration => ({ id: "locale-qa", name: "QA", number: 1, revision: 1, choice, createdAt: "2026-11-11T00:00:00Z", updatedAt: "2026-11-11T00:00:00Z" });

for (const locale of languages) {
  assert.equal(assemblyHtmlLocale(locale), locale);
  for (const row of [...assemblyUiRows, ...assemblyMessageRows]) {
    const value = assemblyText(row[0], locale);
    assert.ok(value && !han.test(value), `${locale}: untranslated glossary entry ${row[0]} => ${value}`);
  }
  assert.equal(assemblyText("1/4-28 UNF", locale), "1/4-28 UNF");
  const html = renderToStaticMarkup(assemblyView(createElement("div", {},
    createElement("select", { value: "翻边", onChange() {} }, createElement("option", { value: "翻边" }, "翻边")),
    createElement("span", { translate: "no" }, "公司"),
    createElement("input", { value: "公司", readOnly: true, placeholder: "填写长度" }),
  ), locale));
  assert.match(html, /value="翻边"/, "canonical option values must not be translated");
  assert.match(html, /translate="no">公司/, "user text is preserved");
  assert.ok(!html.includes('>翻边<'), "option text is localized");
  assert.equal(assemblyFormat("已删除“{name}”。", locale, { name: "公司" }).includes("公司"), true);
  const hint = getInquiryAttachmentCopy(locale).reservedHint.replace("{count}", "1").replace("{remaining}", "4");
  assert.ok(!hint.includes("{") && !han.test(hint), `${locale}: attachment reservation hint is localized`);
}

let drawings = 0;
const entries = ["flanged-tubing", "ferrule-kits", "retaining-ring-kits"].flatMap(family => ["", "fep", "ptfe", "pfa", "black-ptfe"].map(material => material ? `${family}-${material}` : family));
assert.ok(entries.every(entry => getAssemblyEntryPreset(entry)));
for (const entry of entries) for (const mode of ["single", "double"] as const) {
  const choice = { ...defaultAssemblyChoice(entry), mode, length: "150" };
  const before = JSON.stringify(choice), zh = buildFlangedDrawingSheets(record(choice));
  for (const locale of languages) {
    const sheets = buildFlangedDrawingSheets(record(choice), locale);
    assert.ok(strings(sheets).every(text => !han.test(text)), `${entry}/${mode}/${locale}: ${strings(sheets).filter(text => han.test(text)).join(" | ")}`);
    assert.equal(sheets[0].match(/data-source-model="[^"]+"/g)?.join(), zh[0].match(/data-source-model="[^"]+"/g)?.join(), "same exact fitting vectors in every language");
    assert.ok(sheets.every(svg => !/<image\b|<foreignObject\b/.test(svg)), "drawings stay vector");
    drawings += sheets.length;
  }
  assert.equal(JSON.stringify(choice), before, "localization must not mutate configuration data");
}

let fittingCount = 0;
for (const fitting of assemblyFittings) {
  const tube = assemblyTubes.find(tube => ["FEP", "PFA", "PTFE"].includes(tube.material) && fitting.outerDiameters.includes(tube.outer));
  if (!tube) continue;
  const base = defaultAssemblyChoice("flanged-tubing-fep");
  const end = selectAssemblyFitting({ ...base.a, connection: fitting.connection }, fitting.model, tube.outer);
  const choice = normalizeFlangedChoice({ ...base, tubeModel: tube.key, length: "150", a: end, b: end });
  if (validateFlangedChoice(choice)) continue;
  for (const locale of languages) {
    const text = strings(buildFlangedDrawingSheets(record(choice), locale));
    assert.ok(text.every(line => !han.test(line)), `${fitting.model}/${locale}: ${text.filter(line => han.test(line)).join(" | ")}`);
    assert.ok(!han.test(localizedAssemblySummary(choice, locale)), `${fitting.model}/${locale}: summary untranslated`);
  }
  fittingCount++;
}
assert.ok(fittingCount > 50, "cover published fitting families and bore sizes");

for (const locale of languages) {
  const value = record();
  value.name = "公司";
  value.choice.company = "公司"; value.choice.contact = "联系人";
  value.choice.customerPart = "材质：";
  value.choice.labelA = true; value.choice.textA = "本色";
  value.choice.notes = "配置名称；保持客户原文";
  const sheets = strings(buildFlangedDrawingSheets(value, locale)).join("\n");
  for (const raw of ["公司", "联系人", "材质：", "本色", "配置名称；保持客户原文"]) assert.ok(sheets.includes(raw), `${locale}: drawing changed user text ${raw}`);
  const summary = localizedAssemblySummary(value.choice, locale);
  assert.ok(summary.includes("配置名称；保持客户原文") && summary.includes("本色"));
}

const detail = readFileSync("components/products/detail/ProductDetailClient.tsx", "utf8");
assert.match(detail, /isAssemblyConfigurator = isTubingAssembly && Boolean\(getAssemblyEntryPreset/);
assert.match(detail, /FlangedTubingWorkspace locale=\{configuratorLocale\}/);
assert.match(detail, /prepareFlangedPdfAttachment\(record, configuratorLocale\)/);
console.log(`PASS: 6 locales, ${entries.length} entries × single/double ends, ${fittingCount} fitting mappings, ${drawings} localized vector pages, protected user text and canonical SKU values.`);
