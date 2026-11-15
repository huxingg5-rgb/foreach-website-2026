import assert from "node:assert/strict";
import { assemblyFittings, assemblyTubes } from "../../data/products/configurator/tubing-assembly-catalog";
import { assemblyVectorSizeMm, getAssemblyFittingVector } from "../../data/products/configurator/tubing-assembly-vectors";
import { defaultAssemblyChoice, flangedTubingBom, selectAssemblyFitting } from "../../data/products/configurator/flanged-tubing";
import { assemblyEndDrawingLayout } from "../../components/products/tubing-assemblies/assembly-end-drawing-layout";
import { buildFlangedDrawingSheets } from "../../components/products/tubing-assemblies/flanged-tubing-drawing";
import { emptyFlangedConfigurationStore, saveFlangedConfiguration } from "../../data/products/configurator/flanged-tubing-configurations";

const fittings = assemblyFittings.filter(f => f.connection === "卡箍");
const missing = fittings.filter(f => !assemblyVectorSizeMm(getAssemblyFittingVector(f.model)));
assert.deepEqual(missing.map(f => f.model), [], "all ferrule fittings need verified physical drawing units");
let cases = 0;
const unavailable = new Set<string>();
for (const fitting of fittings) for (const outer of fitting.outerDiameters) {
  const tube = assemblyTubes.find(t => t.material === "FEP" && t.outer === outer);
  if (!tube) continue;
  const initial = { ...defaultAssemblyChoice("flanged-tubing-fep"), tubeModel: tube.key, length: "1500", tolerance: "5" };
  const a = selectAssemblyFitting(initial.a, fitting.model, outer);
  for (const accessory of fitting.accessories.filter(a => a.tubeOuterDiameters.includes(outer))) {
    const end = { ...a, accessoryCode: accessory.productCode, washer: accessory.material };
    for (const side of ["a", "b"] as const) {
      const diagram = assemblyEndDrawingLayout(end, side, side === "a" ? 105 : 1245)!;
      if (!diagram.accessory) { unavailable.add(accessory.model); continue; }
      assert.ok(diagram.accessoryHeight > 0, `${fitting.model}/${accessory.model}: exact ferrule`);
      const bodyMm = assemblyVectorSizeMm(diagram.fitting)!, ferruleMm = assemblyVectorSizeMm(diagram.accessory)!;
      assert.ok(Math.abs(diagram.accessoryHeight / diagram.height - ferruleMm.height / bodyMm.height) < 1e-8, "no independent fitting/ferrule scaling");
      const separation = Math.abs(diagram.fittingX - diagram.accessoryX) - (diagram.width + diagram.accessoryWidth) / 2;
      assert.ok(Math.abs(separation - diagram.gap) < 1e-8, "exploded gap follows physical part bounds");
      const exposedFace = diagram.accessoryX + (side === "a" ? -1 : 1) * diagram.accessoryWidth / 2;
      assert.ok(Math.abs(exposedFace - (side === "a" ? 105 : 1245)) < 1e-8, "ferrule sealing face stays at the cut tube end");
    }
    const record = saveFlangedConfiguration(emptyFlangedConfigurationStore(), { ...initial, a: end, b: end }, "Configuration", null, "2026-11-15T00:00:00Z").record;
    for (const locale of ["zh", "en", "es", "fr", "ko", "ru"]) {
      const pages = buildFlangedDrawingSheets(record, locale);
      assert.equal(pages.length, 1, `${fitting.model}/${accessory.model}/${locale}: normal configuration stays on one sheet`);
      assert.ok(!pages[0].includes("data-detail-end="), "no separate ferrule detail page");
      assert.match(pages[0], /data-view-layout="exploded"/);
      if (unavailable.has(accessory.model)) assert.ok(!pages.join("").includes('data-accessory-model="' + accessory.model + '"'), "missing CAD must never be replaced by another ferrule");
      else assert.ok(pages[0].includes(accessory.model));
      assert.ok(pages[0].includes("1500 ±5"));
      assert.ok(!pages.join("").match(/NaN|undefined|<image\b/));
      cases++;
    }
  }
}
const exact = getAssemblyFittingVector("HN-M6-16-PV-N")!;
assert.deepEqual([...unavailable], ["CL-0E-32-ET-N"], "only the catalog's known missing exact accessory is unillustrated");
assert.match(exact.source, /443-02-00434-c\.pdf$/);
const size = assemblyVectorSizeMm(exact)!;
assert.ok(Math.abs(size.width - 18.1) < .01 && Math.abs(size.height - 8.2) < .01, "PVDF original must exclude dimension/leader lines");
const initial = { ...defaultAssemblyChoice("flanged-tubing-fep"), length: "1500" };
const sample = selectAssemblyFitting(initial.a, "HN-M6-16-PV-N", 1.6);
const sampleLayout = assemblyEndDrawingLayout(sample, "a", 105)!;
assert.ok(Math.abs(sampleLayout.accessoryHeight / sampleLayout.height - 4.6 / 8.2) < .001, "4.6 mm ferrule vs 8.2 mm grip must be about 56%, not 22%");
for (const mode of ["single", "double"] as const) {
  const record = saveFlangedConfiguration(emptyFlangedConfigurationStore(), { ...initial, a: sample, b: sample, mode }, "Configuration", null).record;
  const pages = buildFlangedDrawingSheets(record);
  assert.equal(pages.length, 1);
  assert.ok(!pages[0].includes("data-detail-end="));
  if (mode === "single") {
    const freeEndNumber = flangedTubingBom(record.choice).findIndex(r => r.part === "B 端") + 1;
    const freeEndRow = pages[0].match(new RegExp(`<g data-bom-part="${freeEndNumber}">([\\s\\S]*?)<\\/g>`))?.[1];
    assert.ok(freeEndRow && !freeEndRow.includes(record.choice.b.accessoryCode!), "a free B end cannot inherit the unused fitting's ferrule code");
  }
}
console.log(`PASS: ${fittings.length} calibrated ferrule fittings; ${cases} size/accessory/locale cases; real proportions, end orientation, exploded spacing, mixed/single/double layouts and exact PVDF original.`);
