import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import vectorParts from "../../data/products/configurator/tubing-assembly-vector-parts.json";
import { assemblyOriginalPdfView, assemblyVectorStrokes, getAssemblyFittingVector } from "../../data/products/configurator/tubing-assembly-vectors";
import { defaultAssemblyChoice, selectAssemblyFitting } from "../../data/products/configurator/flanged-tubing";
import { getAssemblyTube } from "../../data/products/configurator/tubing-assembly-catalog";
import { emptyFlangedConfigurationStore, saveFlangedConfiguration } from "../../data/products/configurator/flanged-tubing-configurations";
import { buildFlangedDrawingSheets, getFlangedDrawingTemplate } from "../../components/products/tubing-assemblies/flanged-tubing-drawing";

// Regression: PTFE used to bypass the supplied FL/FL6 layouts and all PDF
// outlines were painted with an arbitrary fixed weight after reduction.
for (const [url, view] of Object.entries(vectorParts)) {
  assert.equal(view.paths.length, view.strokeWidths.length, url);
  assert.match(view.sourceSha256, /^[a-f\d]{64}$/);
  assert.ok(existsSync(resolve("public", view.viewAsset.slice(1))));
  const asset = JSON.parse(readFileSync(resolve("public", view.viewAsset.slice(1)), "utf8"));
  assert.equal(asset.source, url);
  assert.equal(Buffer.from(asset.pdf, "base64").subarray(0, 5).toString(), "%PDF-");
  assert.ok(view.strokeWidths.every(value => value > 0));
}
const fitting = getAssemblyFittingVector("HFL-U28-16-PV-N")!;
assert.match(fitting.source, /443-00-00056-c\.pdf$/);
assert.ok(assemblyOriginalPdfView(fitting));
assert.ok(assemblyVectorStrokes(fitting, 120, 71).every(value => value < .5), "reduce original line weights with the geometry, not a fixed .8 stroke");

let layouts = 0;
for (const material of ["fep", "ptfe", "pfa"] as const) {
  const initial = { ...defaultAssemblyChoice(`flanged-tubing-${material}`), length: "160", tolerance: "5" };
  const tube = getAssemblyTube(initial.tubeModel)!;
  for (const mode of ["single", "double"] as const) for (const a of ["HFL-U28-16-PV-N", "HFL6-U28-16-PS-B"]) for (const b of ["HFL-U28-16-PV-N", "HFL6-U28-16-PS-B"]) {
    const choice = { ...initial, mode, a: selectAssemblyFitting(initial.a, a, tube.outer), b: selectAssemblyFitting(initial.b, b, tube.outer) };
    const expected = mode === "single" ? a.startsWith("HFL6") ? "fl6-single" : "fl-single" : a !== b ? "mixed-double" : a.startsWith("HFL6") ? "fl6-double" : "fl-double";
    assert.equal(getFlangedDrawingTemplate(choice).key, expected);
    const record = saveFlangedConfiguration(emptyFlangedConfigurationStore(), choice, "Configuration 7", null, "2026-11-14T08:37:02Z").record;
    for (const locale of ["zh", "en", "es", "fr", "ko", "ru"]) {
      const sheet = buildFlangedDrawingSheets(record, locale)[0];
      assert.match(sheet, new RegExp(`data-template-key="${expected}"`));
      assert.ok(sheet.includes(`${tube.material}`));
      assert.ok(sheet.includes("160 ±5"));
      assert.equal((sheet.match(/data-original-pdf=/g) || []).length, mode === "single" ? 1 : 2);
      assert.equal((sheet.match(/data-original-mirror="true"/g) || []).length, 1);
      assert.equal((sheet.match(/data-original-mirror="false"/g) || []).length, mode === "single" ? 0 : 1);
      assert.ok(sheet.includes('data-source-file="/downloads/products/fittings/2d-drawings/'));
      assert.ok(!/<image\b|<canvas\b|NaN|undefined/.test(sheet));
      layouts++;
    }
  }
}
console.log(`PASS: ${Object.keys(vectorParts).length} original PDF views with source provenance and stroke weights; ${layouts} material/end/layout/locale regressions.`);
