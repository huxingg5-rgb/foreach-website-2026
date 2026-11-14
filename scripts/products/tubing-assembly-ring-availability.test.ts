import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { assemblyFamilies, assemblyFamilyAvailability, assemblyFittingAccessories, assemblyFittings, getAssemblyFitting, getAssemblyTube } from "../../data/products/configurator/tubing-assembly-catalog";
import { assemblyPreviewAsset, assemblyExteriorPreviewAsset } from "../../data/products/configurator/tubing-assembly-preview";
import { compatibleAssemblyTubes, defaultAssemblyChoice, selectAssemblyFitting } from "../../data/products/configurator/flanged-tubing";
import { emptyFlangedConfigurationStore, parseFlangedConfigurationStore, saveFlangedConfiguration } from "../../data/products/configurator/flanged-tubing-configurations";
import { assemblyText } from "../../data/products/configurator/tubing-assembly.intl";
import { assemblyVectorPaths, getAssemblyFittingVector } from "../../data/products/configurator/tubing-assembly-vectors";
import { assemblyView } from "../../components/products/tubing-assemblies/assembly-view";

const publishedFamilies = assemblyFamilies("卡环");
assert.equal(assemblyText("卡环连接", "en"), "Compression-ring connection");
assert.equal(assemblyText("A 端卡环组件", "en"), "Compression-ring kit A");
assert.deepEqual([...publishedFamilies].sort(), ["HFL6", "HSF", "HSF6"]);
assert.equal(assemblyFittings.filter(f => f.connections.includes("卡环")).length, 10);
for (const outer of [1.6, 1.8, 2, 2.5, 3, 3.2, 4]) {
  const options = assemblyFamilyAvailability("卡环", outer);
  assert.deepEqual(options.map(option => option.family), publishedFamilies, "published series remain visible at every tube size");
  assert.deepEqual(options.filter(option => option.available).map(option => option.family), assemblyFamilies("卡环", outer), "visibility must not expand actual compatibility");
}
const atThree = assemblyFamilyAvailability("卡环", 3);
assert.deepEqual(atThree.find(option => option.family === "HSF")?.outerDiameters, [1.6, 3.2]);
assert.equal(atThree.find(option => option.family === "HSF")?.available, false);
assert.equal(atThree.find(option => option.family === "HSF6")?.available, true);
assert.equal(atThree.find(option => option.family === "HFL6")?.available, false);

const base = defaultAssemblyChoice("retaining-ring-kits-ptfe");
const fitting = getAssemblyFitting("HSF6-U28-32-PK-N")!;
const exteriorReference = getAssemblyFitting("HSF6-U28-16-PK-N")!;
assert.equal(fitting.code, "809828");
assert.equal(fitting.cadUrl, undefined, "a display reference must never be registered as the actual product CAD");
assert.notEqual(fitting.drawingUrl, exteriorReference.drawingUrl);
let configurations = 0;
for (const [outer, kitModel, kitCode] of [[2, "CL-1S-20", "809802"], [2.5, "CL-1S-25", "809803"], [3, "CL-1S-30", "809804"], [3.2, "CL-1S-32", "809805"]] as const) {
  const end = selectAssemblyFitting(base.a, fitting.model, outer);
  assert.equal(assemblyPreviewAsset(end, outer), null);
  const exterior = assemblyExteriorPreviewAsset(end, outer)!;
  assert.equal(exterior.kind, "shared-exterior");
  assert.equal(exterior.sourceModel, exteriorReference.model);
  assert.equal(exterior.url, exteriorReference.cadUrl, "reuse the existing small-bore exterior as authorized, without a second image style");
  assert.equal(fitting.material, exteriorReference.material);
  assert.equal(fitting.thread, exteriorReference.thread);
  assert.equal(fitting.color, exteriorReference.color);
  assert.ok(readFileSync(resolve("public", exterior.url.slice(1))).length > 100);
  const original = getAssemblyFittingVector(fitting.model)!;
  assert.equal(original.source, fitting.drawingUrl, "engineering export still uses the actual large-bore PDF geometry");
  assert.ok(original.paths.length > 100);
  assert.equal(original.width, 15.5);
  const pdf = readFileSync(resolve("public", original.source.slice(1)));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  const kits = assemblyFittingAccessories(fitting, "卡环", outer);
  assert.deepEqual(kits.map(kit => [kit.model, kit.productCode]), [[kitModel, kitCode]]);
  const tube = compatibleAssemblyTubes({ ...base, a: end, mode: "single" }).find(tube => tube.outer === outer && tube.material === "PTFE")!;
  assert.ok(tube);
  const choice = { ...base, a: end, b: end, mode: "double" as const, tubeModel: tube.key, length: "5000", tolerance: "5" };
  const saved = saveFlangedConfiguration(emptyFlangedConfigurationStore(), choice, "Ring QA", null);
  const restored = parseFlangedConfigurationStore(JSON.stringify(saved.store)).configurations[0];
  assert.ok(restored);
  for (const side of ["a", "b"] as const) {
    assert.equal(restored.choice[side].fittingModel, fitting.model);
    assert.equal(restored.choice[side].accessoryCode, kitCode);
    assert.equal(assemblyExteriorPreviewAsset(restored.choice[side], outer)?.url, exterior.url);
    assert.equal(getAssemblyFittingVector(restored.choice[side].fittingModel)?.source, fitting.drawingUrl);
  }
  assert.equal(getAssemblyTube(restored.choice.tubeModel)?.outer, outer);
  configurations++;
}

const end = selectAssemblyFitting(base.a, fitting.model, 3);
assert.equal(assemblyExteriorPreviewAsset({ ...end, series: "HSF" }, 3), null, "do not expand the reference to other families");
assert.equal(assemblyExteriorPreviewAsset(end, 1.6), null, "do not change the actual product's OD compatibility");
for (const known of assemblyFittings.filter(f => f.connections.includes("卡环") && f.cadUrl)) {
  assert.equal(assemblyExteriorPreviewAsset(selectAssemblyFitting(base.a, known.model, known.outerDiameters[0]), known.outerDiameters[0]), null, "existing exact 3D previews remain intact");
}
const part = getAssemblyFittingVector(fitting.model)!;
const scale = .6 * 1020 / 96, width = part.width * scale, height = part.height * scale;
const a = assemblyVectorPaths(part, 170, 106.25, width, height, true);
const b = assemblyVectorPaths(part, 850, 106.25, width, height);
assert.equal(a.length, part.paths.length);
for (let index = 0; index < a.length; index++) {
  const aCoords = a[index].match(/-?\d+(?:\.\d+)?/g)!.map(Number);
  const bCoords = b[index].match(/-?\d+(?:\.\d+)?/g)!.map(Number);
  for (let coord = 0; coord < aCoords.length; coord++) {
    assert.ok(Math.abs(coord % 2 ? aCoords[coord] - bCoords[coord] : aCoords[coord] + bCoords[coord] - 1020) < .002, "both ends use mirrored original geometry on the same tube axis");
  }
}
for (const locale of ["zh", "en", "es", "fr", "ko", "ru"]) {
  const labels = ["HSF · 标准卡环（适配 OD 1.6 / 3.2 mm）", "HSF6 · 紧凑卡环", "灰色系列适配其他管径，切换管径后可选。", "配套卡环：CL-1S-30 · 商品编码 809804 · 接管 OD 3 mm", "查看接头原始2D图纸"];
  for (const label of labels) if (locale !== "zh") assert.ok(!/\p{Script=Han}/u.test(assemblyText(label, locale)), `${locale}: ${label}`);
  const html = renderToStaticMarkup(assemblyView(createElement("select", { defaultValue: "HSF6" }, atThree.map(option => createElement("option", { key: option.family, value: option.family, disabled: !option.available }, `${option.family}（适配 OD ${option.outerDiameters.join(" / ")} mm）`))), locale));
  assert.match(html, /value="HSF" disabled=""/);
  assert.match(html, /value="HSF6" selected=""/);
  assert.ok(!/value="HSF6"[^>]*disabled/.test(html));
}
console.log(`PASS: all 10 ring-capable fittings, strict OD compatibility, authorized exterior-only reuse, separate engineering geometry, ${configurations} saved double-ended configurations and 6 locales.`);
