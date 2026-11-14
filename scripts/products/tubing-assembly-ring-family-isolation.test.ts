import assert from "node:assert/strict";
import { assemblyFamilyLabel, assemblyFittings, getAssemblyFitting, getAssemblyTube } from "../../data/products/configurator/tubing-assembly-catalog";
import { assemblyPreviewAsset } from "../../data/products/configurator/tubing-assembly-preview";
import { compatibleAssemblyTubes, defaultFlangedTubingChoice, normalizeFlangedChoice, reconcileAssemblyEnd, selectAssemblyFitting, validateFlangedChoice, type FlangedEnd } from "../../data/products/configurator/flanged-tubing";
import { emptyFlangedConfigurationStore, parseFlangedConfigurationStore, saveFlangedConfiguration } from "../../data/products/configurator/flanged-tubing-configurations";
import { buildFlangedDrawingSheets } from "../../components/products/tubing-assemblies/flanged-tubing-drawing";
import { getAssemblyFittingVector } from "../../data/products/configurator/tubing-assembly-vectors";

// These are independent parts, not alternative names or substitute geometries.
const identities = [
  ["HSF-U28-16-PK-N", "441-09-00260", "441-09-00260", 20.5],
  ["HSF-U28-32-PEEK-N", "443-02-00758", "443-02-00758", 18.1],
  ["HSF6-M6-18-PS-B", "443-02-00708", "443-02-00708", undefined],
  ["HSF6-M6-16-PS-B", "443-02-00499", "443-02-00499", 20],
  ["HSF6-M6-32-PS-B", "443-02-00500", "443-02-00500", 20],
  ["HSF6-U28-16-PK-N", "441-09-00222", "441-09-00222", 15.5],
  ["HSF6-U28-16-PS-B", "443-02-00497", "443-02-00497", 20],
  ["HSF6-U28-32-PK-N", undefined, "441-09-00289", 15.5],
  ["HSF6-U28-32-PS-B", "443-02-00498", "443-02-00498", 20],
] as const;
const urls = new Set<string>();
assert.equal(assemblyFittings.filter(f => f.family === "HSF").length, 2);
assert.equal(assemblyFittings.filter(f => f.family === "HSF6").length, 7);
assert.equal(assemblyFamilyLabel("HSF"), "HSF · 标准卡环");
assert.equal(assemblyFamilyLabel("HSF6"), "HSF6 · 紧凑卡环");
for (const [model, sourcePart, drawingPart, drawingLength] of identities) {
  const fitting = getAssemblyFitting(model)!;
  assert.equal(fitting.family, model.split("-")[0]);
  assert.equal(fitting.sourcePart, sourcePart, `${model}: preserve its own source part`);
  assert.ok(fitting.drawingUrl?.toLowerCase().includes(drawingPart.toLowerCase()));
  const vector = getAssemblyFittingVector(model)!;
  // HSF PDF paths retain source-page units; the HSF6 projections are in mm.
  if (fitting.family === "HSF6" && drawingLength !== undefined) assert.ok(Math.abs(vector.width - drawingLength) < .001, `${model}: no substituted family silhouette`);
  const oppositeFamily = fitting.family === "HSF" ? "HSF6" : "HSF";
  const opposite = assemblyFittings.filter(f => f.family === oppositeFamily);
  for (const other of opposite) {
    assert.notEqual(fitting.drawingUrl, other.drawingUrl);
    assert.notEqual(vector.source, getAssemblyFittingVector(other.model)?.source);
    if (fitting.cadUrl && other.cadUrl) assert.notEqual(fitting.cadUrl, other.cadUrl);
  }
  if (fitting.cadUrl) {
    assert.ok(!urls.has(fitting.cadUrl), `${model}: this exact ring body must retain a separate CAD asset`);
    urls.add(fitting.cadUrl);
    assert.ok(fitting.cadUrl.includes(`/assembly-${fitting.family.toLowerCase()}-`));
  }
  for (const outer of fitting.outerDiameters) {
    const end = selectAssemblyFitting({ ...defaultFlangedTubingChoice().a, connection: "卡环" }, model, outer);
    assert.equal(assemblyPreviewAsset(end, outer)?.url, fitting.cadUrl);
    const tube = compatibleAssemblyTubes({ ...defaultFlangedTubingChoice(), mode: "single", a: end }).find(t => t.outer === outer)!;
    if (!tube) {
      assert.equal(model, "HSF6-M6-18-PS-B", "only the catalog 1.8 mm fitting lacks a published assembly tube");
      continue;
    }
    const choice = { ...defaultFlangedTubingChoice(), mode: "single" as const, a: end, tubeModel: tube.key, length: "150" };
    const saved = saveFlangedConfiguration(emptyFlangedConfigurationStore(), choice, `${fitting.family} 独立核验`, null);
    const restored = parseFlangedConfigurationStore(JSON.stringify(saved.store)).configurations[0];
    assert.equal(restored.choice.a.fittingModel, model);
    assert.equal(restored.choice.a.series, fitting.family);
    assert.equal(getAssemblyTube(restored.choice.tubeModel)?.outer, outer);
    const sheets = buildFlangedDrawingSheets(restored).join("");
    assert.ok(sheets.includes(vector.source));
    for (const other of opposite) if (other.cadUrl) assert.ok(!sheets.includes(other.cadUrl), `${model}: the opposite family must not leak into its drawing`);
  }
}
// A pipe size absent from HSF does not silently select an HSF6 part.
const hsf = selectAssemblyFitting({ ...defaultFlangedTubingChoice().a, connection: "卡环" }, "HSF-U28-16-PK-N", 1.6);
const unavailable = reconcileAssemblyEnd(hsf, 2);
assert.equal(unavailable.series, "HSF");
assert.equal(unavailable.fittingModel, "");
assert.equal(assemblyPreviewAsset(unavailable, 2), null);
const hsfTubes = compatibleAssemblyTubes({ ...defaultFlangedTubingChoice(), mode: "single", a: hsf });
assert.deepEqual([...new Set(hsfTubes.map(t => t.outer))], [1.6, 3.2]);
const missingCompact: FlangedEnd = selectAssemblyFitting({ ...hsf, series: "HSF6" }, "HSF6-U28-32-PK-N", 3.2);
assert.equal(assemblyPreviewAsset(missingCompact, 3.2), null, "missing exact HSF6 CAD stays absent; HSF 32 is never a fallback");
// A stale full model must not overwrite the explicitly selected ring series.
for (const model of ["HSF-U28-16-PK-N", "HSF6-U28-16-PK-N"]) {
  const actual = selectAssemblyFitting(hsf, model, 1.6);
  const series = actual.series === "HSF" ? "HSF6" : "HSF";
  const conflicting = { ...actual, series };
  const choice = { ...defaultFlangedTubingChoice(), mode: "single" as const, a: conflicting, length: "150" };
  assert.equal(assemblyPreviewAsset(conflicting, 1.6), null);
  assert.equal(reconcileAssemblyEnd(conflicting, 1.6).fittingModel, "");
  const normalized = normalizeFlangedChoice(choice);
  assert.equal(normalized.a.series, series);
  assert.equal(normalized.a.fittingModel, "");
  assert.equal(normalized.a.accessoryCode, "");
  assert.match(validateFlangedChoice(choice)!, /HSF 与 HSF6/);
  assert.throws(() => saveFlangedConfiguration(emptyFlangedConfigurationStore(), choice, "系列冲突", null));
  const valid = saveFlangedConfiguration(emptyFlangedConfigurationStore(), { ...choice, a: actual }, "原配置", null);
  const existing = { ...valid.record, choice };
  // Preserve old records for correction without generating an incorrect drawing.
  assert.equal(parseFlangedConfigurationStore(JSON.stringify({ ...valid.store, configurations: [existing] })).configurations[0].choice.a.series, series);
  assert.throws(() => buildFlangedDrawingSheets(existing));
}
console.log("PASS: 2 HSF and 7 HSF6 identities remain separate through CAD, 2D, tube filtering, saved configurations and missing-model handling.");
