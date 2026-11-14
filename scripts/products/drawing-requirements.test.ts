import assert from "node:assert/strict";
import test from "node:test";
import { normalizeDrawingTypes, getDrawingTypes, getDrawingRequirementsCopy, drawingRequirementsLine } from "../../data/products/detail/drawing-requirements";
import { cadRequestMessage, type CadRequestConfiguration } from "../../data/products/detail/cad-request";
import { parseDetailConfigurations, saveDetailConfiguration, removeDetailConfiguration } from "../../data/products/configurator/detail-configurations";
import { parseFittingConfigurations, saveFittingConfiguration, removeFittingConfiguration } from "../../data/products/configurator/fitting-configurations";
import { changeCartGroupDrawing, changeCartGroupDrawingTypes, createCartBundle } from "../../components/selection-cart/selection-cart-bundles";
import { emptyEaPumpConfigurations, readEaPumpConfigurations, upsertEaPumpConfiguration, saveEaPumpConfigurations } from "../../data/products/configurator/ea-pump-inquiry-configurations";
import { createEaPumpInquiryConfiguration, getEaPumpInquiryDefaults } from "../../data/products/configurator/ea-pump-inquiry";
import { readEaPumpInquiryDraft, saveEaPumpInquiryDraft } from "../../data/products/configurator/ea-pump-inquiry-draft";
import { defaultFlangedTubingChoice } from "../../data/products/configurator/flanged-tubing";
import { emptyFlangedConfigurationStore, parseFlangedConfigurationStore, saveFlangedConfiguration } from "../../data/products/configurator/flanged-tubing-configurations";
import { createFlangedConfigurationCartItem, snapshotFlangedConfiguration } from "../../data/products/configurator/flanged-tubing-cart";
import type { SelectionCartItemInput } from "../../components/selection-cart/selection-cart.types";

const locales = ["zh", "en", "es", "fr", "ko", "ru"];
test("normalization preserves explicit none and 3D-only, while upgrading legacy 2D flags", () => {
  assert.deepEqual(normalizeDrawingTypes(["3d", "invalid", "2d", "3d", {}]), ["2d", "3d"]);
  assert.deepEqual(getDrawingTypes({ needDrawing: true }), ["2d"]);
  assert.deepEqual(getDrawingTypes({ needDrawing: true, drawingTypes: ["3d"] }), ["3d"]);
  assert.deepEqual(getDrawingTypes({ needDrawing: true, drawingTypes: [] }), []);
  assert.deepEqual(normalizeDrawingTypes("3d"), []);
});
test("fitting requirements round-trip independently and never change combination identity", () => {
  const empty = { version: 1 as const, configurations: [], activeId: null };
  const first = saveFittingConfiguration(empty, { kind: "hard-tube", choice: "none" }, null, ["2d"]);
  const second = saveFittingConfiguration(first, { kind: "hard-tube", choice: "washer" }, null, ["3d"]);
  const edited = saveFittingConfiguration(second, first.configurations[0].choice, first.activeId, ["2d", "3d"]);
  assert.equal(edited.configurations.length, 2);
  assert.equal(edited.configurations[0].id, first.activeId);
  assert.deepEqual(edited.configurations.map(item => item.drawingTypes), [["2d", "3d"], ["3d"]]);
  assert.deepEqual(parseFittingConfigurations(JSON.parse(JSON.stringify(edited)), () => true), edited);
  assert.deepEqual(removeFittingConfiguration(edited, first.activeId!).configurations[0].drawingTypes, ["3d"]);
  assert.deepEqual(first.configurations[0].drawingTypes, ["2d"], "editing must not mutate the earlier snapshot");
});
test("catalog configurations persist drawings, discard deleted IDs and keep old stores readable", () => {
  const variants = ["a", "b"].map(id => ({ id, model: id, productCode: id, attributes: {} }));
  const legacy = parseDetailConfigurations({ version: 1, variantIds: ["a"], activeId: "a" }, variants);
  assert.equal(legacy.drawingTypes, undefined);
  const one = saveDetailConfiguration(legacy, "a", "a", ["3d"]);
  const two = saveDetailConfiguration(one, "b", null, []);
  const restored = parseDetailConfigurations(JSON.parse(JSON.stringify(two)), variants);
  assert.deepEqual(restored.drawingTypes, { a: ["3d"], b: [] });
  assert.deepEqual(removeDetailConfiguration(restored, "a").drawingTypes, { b: [] });
  const edited = saveDetailConfiguration(two, "b", "a", ["2d"]);
  assert.deepEqual(edited.variantIds, ["b"]);
  assert.deepEqual(edited.drawingTypes, { b: ["2d"] });
});
const part: SelectionCartItemInput = { sourceType: "pump-selection", sourceLabel: "Products", productName: "Fitting", productCode: "809032", foreachModel: "HFL-M6-16-PV-N", competitorModels: [], quantity: 1, needDrawing: true, drawingTypes: ["3d"] };
test("cart group edits apply to every part without changing IDs, quantities or selected models", () => {
  const bundle = createCartBundle(part, [{ ...part, productCode: "washer", foreachModel: "washer" }]);
  const changed = changeCartGroupDrawingTypes(bundle, bundle[0].id, ["2d", "3d"]);
  assert.deepEqual(changed.map(item => item.drawingTypes), [["2d", "3d"], ["2d", "3d"]]);
  assert.deepEqual(changed.map(item => [item.id, item.quantity, item.foreachModel]), bundle.map(item => [item.id, item.quantity, item.foreachModel]));
  assert.deepEqual(changeCartGroupDrawingTypes(changed, bundle[0].id, []).map(item => item.needDrawing), [false, false]);
  assert.deepEqual(changeCartGroupDrawing(bundle, bundle[0].id, true)[0].drawingTypes, ["3d"], "legacy add-drawing actions must preserve 3D-only");
  assert.deepEqual(bundle[0].drawingTypes, ["3d"]);
});
test("all six localized request messages preserve exactly the requested types and full configuration", () => {
  for (const locale of locales) {
    const copy = getDrawingRequirementsCopy(locale);
    for (const value of Object.values(copy)) assert.ok(value.trim());
    if (locale !== "zh") assert.doesNotMatch(JSON.stringify(copy), /[\u3400-\u9fff]/);
    const configuration: CadRequestConfiguration = { id: "config-2", model: part.foreachModel, drawingTypes: ["3d"], rows: [["Thread", "M6×1"], ["Tube OD", "1.6 mm"], ["Washer", "PEEK 0.9 mm"]] as [string, string][] };
    const message = cadRequestMessage(locale, configuration, 2, ["3d"], "STEP requested");
    assert.match(message, /M6×1/); assert.match(message, /1\.6 mm/); assert.match(message, /PEEK 0\.9 mm/);
    assert.ok(message.includes(copy.threeD));
    assert.ok(!message.includes(copy.twoD), "3D-only must never be described as a 2D request");
    assert.ok(drawingRequirementsLine({ drawingTypes: [] }, locale).includes(copy.none));
  }
});
test("piston requirements survive draft navigation, collection restore and quantity edits", () => {
  const storage = new Map<string, string>();
  const oldWindow = globalThis.window;
  Object.defineProperty(globalThis, "window", { configurable: true, value: { sessionStorage: { getItem: (key: string) => storage.get(key) ?? null, setItem: (key: string, value: string) => storage.set(key, value) } } });
  try {
    const slug = "ea-250-pmma", configuration = createEaPumpInquiryConfiguration(getEaPumpInquiryDefaults(slug));
    saveEaPumpInquiryDraft(slug, configuration, 2, ["3d"]);
    const draft = readEaPumpInquiryDraft(slug)!;
    assert.deepEqual(draft.drawingTypes, ["3d"]);
    const first = upsertEaPumpConfiguration(emptyEaPumpConfigurations(), draft, null);
    const edited = upsertEaPumpConfiguration(first, { ...draft, quantity: 3, drawingTypes: ["2d", "3d"] }, first.activeId);
    assert.equal(edited.configurations.length, 1);
    saveEaPumpConfigurations(edited, slug);
    const restored = readEaPumpConfigurations(null, slug);
    assert.equal(restored.configurations[0].quantity, 3);
    assert.deepEqual(restored.configurations[0].drawingTypes, ["2d", "3d"]);
  } finally { Object.defineProperty(globalThis, "window", { configurable: true, value: oldWindow }); }
});
test("assembly drawings are revisioned, restored and frozen with the requested CAD types", () => {
  const choice = { ...defaultFlangedTubingChoice(), length: "1500", tolerance: "5" };
  const first = saveFlangedConfiguration(emptyFlangedConfigurationStore(), choice, "Assembly 1", null, "2026-11-14T01:00:00Z", "drawing-test", ["3d"]);
  const restored = parseFlangedConfigurationStore(JSON.stringify(first.store));
  assert.deepEqual(restored.configurations[0].drawingTypes, ["3d"]);
  const edited = saveFlangedConfiguration(restored, choice, "Assembly 1", first.record.id, "2026-11-14T02:00:00Z", undefined, ["2d", "3d"]);
  assert.equal(edited.store.configurations.length, 1);
  assert.equal(edited.record.revision, 2);
  const snapshot = snapshotFlangedConfiguration(first.record);
  first.record.drawingTypes!.push("2d");
  assert.deepEqual(snapshot.drawingTypes, ["3d"]);
  const attachment = { name: "assembly.pdf", sha256: "a".repeat(64), size: 100, key: "test", pageCount: 1 };
  const item = createFlangedConfigurationCartItem(snapshot, attachment);
  assert.deepEqual(item.drawingTypes, ["3d"]);
  assert.ok(item.drawingAttachment, "existing configuration PDF remains attached independently of requested CAD types");
});
