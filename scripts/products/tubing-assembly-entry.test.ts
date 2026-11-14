import assert from "node:assert/strict";
import { getPublishedAssemblyConfigurations } from "../../data/products/tubing-assemblies/publication";
import { getAssemblyEntryPreset, assemblyChoiceMatchesEntry } from "../../data/products/configurator/tubing-assembly-entry";
import { assemblyCompatibilityWarnings, compatibleAssemblyTubes, defaultAssemblyChoice, endConnection, flangedTubingBom, validateFlangedChoice } from "../../data/products/configurator/flanged-tubing";
import { assemblyAccessory, getAssemblyFitting, getAssemblyTube } from "../../data/products/configurator/tubing-assembly-catalog";
import { emptyFlangedConfigurationStore, parseFlangedConfigurationStore, saveFlangedConfiguration } from "../../data/products/configurator/flanged-tubing-configurations";
import { createFlangedConfigurationCartItem } from "../../data/products/configurator/flanged-tubing-cart";
import { buildFlangedDrawingSheets } from "../../components/products/tubing-assemblies/flanged-tubing-drawing";

const expectedConnections = { "flanged-tubing": "翻边", "ferrule-kits": "卡箍", "retaining-ring-kits": "卡环" } as const;
const expectedTubes = {
  fep: ["FEP", "透明", 0.3],
  ptfe: ["PTFE", "本色", 0.8],
  pfa: ["PFA", "透明", 0.5],
  "black-ptfe": ["PTFE", "黑色", 0.8],
} as const;
let store = emptyFlangedConfigurationStore(), drawings = 0;
for (const family of Object.keys(expectedConnections) as (keyof typeof expectedConnections)[]) {
  for (const configuration of [undefined, ...getPublishedAssemblyConfigurations(family)]) {
    const slug = configuration ? `${family}-${configuration}` : family;
    const expected = expectedTubes[(configuration || "fep") as keyof typeof expectedTubes];
    assert.ok(expected, `${slug}: every published material needs an explicit entry expectation`);
    assert.ok(getAssemblyEntryPreset(slug), `${slug}: every published page must have a selector`);
    const initial = defaultAssemblyChoice(slug), tube = getAssemblyTube(initial.tubeModel)!;
    assert.deepEqual([tube.material, tube.color, tube.inner, tube.outer], [...expected, 1.6], `${slug}: page-specific tube and color`);
    assert.equal(initial.length, "", "a new entry must not inherit another saved configuration's length");
    assert.equal(initial.labelA, false);
    assert.equal(initial.labelB, false);
    assert.ok(assemblyChoiceMatchesEntry(initial, slug));
    for (const end of [initial.a, initial.b]) {
      assert.equal(endConnection(end), expectedConnections[family]);
      const fitting = getAssemblyFitting(end.fittingModel)!;
      assert.ok(fitting.outerDiameters.includes(tube.outer));
      assert.equal(end.thread, fitting.thread);
      assert.equal(end.material, fitting.material);
      assert.equal(end.color, fitting.color);
      assert.ok(assemblyAccessory(end.fittingModel, end.accessoryCode)?.tubeOuterDiameters.includes(tube.outer));
    }
    const available = compatibleAssemblyTubes(initial);
    assert.ok(available.some(item => item.key === tube.key));
    assert.deepEqual(available.filter(item => item.material === "PFA").map(item => [item.outer, item.inner]), [[1.6, 0.5], [1.6, 0.8], [1.6, 1]], "PFA must use the three fixed catalog sizes");
    assert.ok(available.every(item => ["FEP", "PTFE", "PFA"].includes(item.material) && item.outer <= 3.2));
    for (const mode of ["single", "double"] as const) {
      const choice = { ...initial, mode, length: "735", tolerance: "2", company: "图纸核对", contact: "选型测试", customerPart: slug, application: "试剂管路" };
      assert.equal(validateFlangedChoice(choice), null);
      assert.deepEqual(assemblyCompatibilityWarnings(choice), []);
      const saved = saveFlangedConfiguration(store, choice, `${slug}-${mode}`, null, "2026-11-11T02:00:00Z", `${slug}-${mode}`);
      store = parseFlangedConfigurationStore(JSON.stringify(saved.store));
      const record = store.configurations.find(item => item.id === saved.record.id)!;
      assert.equal(record.choice.tubeModel, tube.key, "saving and reopening must preserve the exact material row");
      assert.equal(record.choice.mode, mode);
      assert.equal(endConnection(record.choice.a), expectedConnections[family]);
      if (mode === "double") assert.equal(endConnection(record.choice.b), expectedConnections[family]);
      const bom = flangedTubingBom(record.choice);
      assert.ok(bom[0].specification.includes(tube.material));
      assert.ok(bom[0].specification.includes(tube.model));
      const sheets = buildFlangedDrawingSheets(record), svg = sheets.join("");
      assert.ok(svg.includes(tube.material));
      assert.ok(svg.includes("735"));
      assert.ok(svg.includes(`data-mode="${mode}"`));
      assert.ok(svg.includes(`data-source-model="${record.choice.a.fittingModel}"`));
      if (mode === "double") assert.ok(svg.includes(`data-source-model="${record.choice.b.fittingModel}"`));
      assert.ok(!/<image\b|<foreignObject\b|<canvas\b|data:image|NaN|undefined/.test(svg), `${slug}: drawing must remain vector and complete`);
      assert.ok(!/[HV](?:[MLCZ]|["'])/.test(svg), `${slug}: PDF close-path operators must become SVG Z, never operand-free H/V`);
      assert.ok(!svg.includes("外形资料待补充"), `${slug}: default fittings need their own vector geometry`);
      const cart = createFlangedConfigurationCartItem(record, { key: `test:${record.id}`, name: `${record.name}.pdf`, size: 100, pageCount: sheets.length, sha256: "a".repeat(64) });
      assert.equal(cart.flangedConfiguration?.choice.tubeModel, tube.key);
      assert.equal(cart.drawingAttachment?.pageCount, sheets.length);
      drawings++;
    }
  }
}
assert.equal(store.configurations.length, 30);
const fep = defaultAssemblyChoice("flanged-tubing-fep");
assert.equal(assemblyChoiceMatchesEntry(fep, "ferrule-kits-fep"), false, "a page-level action cannot reuse another connection family's active record");
assert.equal(assemblyChoiceMatchesEntry(fep, "flanged-tubing-pfa"), false, "a PFA drawing action cannot reuse an active FEP record");
assert.equal(assemblyChoiceMatchesEntry(defaultAssemblyChoice("flanged-tubing-black-ptfe"), "flanged-tubing-ptfe"), false, "natural and black PTFE entry themes must stay distinct");
assert.equal(assemblyChoiceMatchesEntry(defaultAssemblyChoice("flanged-tubing-pfa"), "flanged-tubing"), true, "generic family pages can reuse their own family's saved materials");
assert.equal(getAssemblyEntryPreset("flanged-tubing-pfa-typo"), null);
assert.throws(() => defaultAssemblyChoice("flanged-tubing-pfa-typo"), /入口/);
console.log(`PASS: 15 published entry themes; ${drawings} single/double save/restore, exact hardware, vector drawing and PDF cart snapshots; PFA fixed sizes and cross-page isolation.`);
