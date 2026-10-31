import assert from "node:assert/strict";
import test from "node:test";
import { changeCartGroupDrawing, changeCartGroupQuantity, createCartBundle, findHflCartBundle, getCartGroupMemberIds, getCartGroups, getHflSelectionSummary, migrateLegacyHflBundle } from "../../components/selection-cart/selection-cart-bundles";
import { HFL_PILOT_WASHERS, HFL_WASHER_PILOT } from "../../data/products/configurator/hfl-m6-16-washers";
import type { SelectionCartItem } from "../../components/selection-cart/selection-cart.types";

const fitting: SelectionCartItem = {
  id: "pump-selection:809032", sourceType: "pump-selection", sourceLabel: "产品中心",
  productCode: "809032", foreachModel: HFL_WASHER_PILOT.model, productName: "标滚平底接头",
  competitorModels: [], quantity: 1, needDrawing: false, detailHref: HFL_WASHER_PILOT.detailHref,
};
const washers = HFL_PILOT_WASHERS.map(washer => ({
  ...fitting, id: `pump-selection:${washer.productCode}`, productCode: washer.productCode,
  foreachModel: washer.model, productName: `${washer.materialLabel} 垫片`,
}));
const unrelated: SelectionCartItem = { ...fitting, id: "pump-selection:609024", productCode: "609024", foreachModel: "SV10-P-3-24-EP/PK", detailHref: "/products/valves/", quantity: 7 };

test("detail summary retains saved pairings and fitting-only selection while appending the current choice once", () => {
  const sus = createCartBundle(fitting, [washers[0]]);
  const peek = createCartBundle(fitting, [washers[1]]);
  const saved = [unrelated, fitting, ...sus, ...peek];
  assert.deepEqual(getHflSelectionSummary(saved, "809217"), ["none", "809215", "809216", "809217"]);
  assert.deepEqual(getHflSelectionSummary(saved, "809216"), ["none", "809215", "809216"]);
  assert.deepEqual(getHflSelectionSummary(saved, "none"), ["none", "809215", "809216"]);
  assert.deepEqual(getHflSelectionSummary(JSON.parse(JSON.stringify(saved)), null), ["none", "809215", "809216"]);
  assert.deepEqual(getHflSelectionSummary([unrelated, fitting, ...peek], "809217"), ["none", "809216", "809217"]);
  assert.deepEqual(getHflSelectionSummary([], "none"), ["none"]);
  assert.deepEqual(getHflSelectionSummary([], null), []);
  assert.deepEqual(getHflSelectionSummary([unrelated, sus[1]], null), []);
  assert.deepEqual(getHflSelectionSummary([sus[0]], null), []);
});

test("one card per fitting/washer combination, with isolated shared controls", () => {
  const peek = createCartBundle(fitting, [washers[1]]);
  const ptfe = createCartBundle(fitting, [washers[2]]);
  const original = [unrelated, ...peek, ...ptfe];
  assert.equal(getCartGroups(original).length, 3);
  assert.equal(findHflCartBundle(original, ["809216"])?.accessories[0].foreachModel, "WS-46-18-09-PK-N");
  const changed = changeCartGroupQuantity(original, peek[0].id, 6);
  assert.deepEqual(changed.map(item => item.quantity), [7, 6, 6, 1, 1]);
  const drawn = changeCartGroupDrawing(changed, peek[0].id, true);
  assert.deepEqual(drawn.map(item => item.needDrawing), [false, true, true, false, false]);
  const removedIds = getCartGroupMemberIds(drawn, peek[1].id);
  assert.deepEqual(drawn.filter(item => !removedIds.has(item.id)), [unrelated, ...ptfe]);
  assert.equal(getCartGroups(JSON.parse(JSON.stringify(drawn))).length, 3);
  assert.equal(original[1].quantity, 1);
});

test("previously saved multi-washer bundles remain readable without matching a new single-washer selection", () => {
  const bundle = createCartBundle(fitting, [washers[1], washers[0]]);
  assert.deepEqual(bundle, createCartBundle(fitting, [washers[0], washers[1]]));
  const original = [unrelated, ...bundle];
  assert.equal(getCartGroups(original).length, 2);
  assert.equal(findHflCartBundle(original, ["809216", "809215"])?.items.length, 3);
  assert.equal(findHflCartBundle(original, ["809215"]), undefined);
  assert.equal(findHflCartBundle(original, ["809215", "809216", "809217"]), undefined);
  assert.equal(findHflCartBundle(original, []), undefined);
  const changed = changeCartGroupQuantity(original, bundle[2].id, 4);
  assert.deepEqual(changed.map(item => item.quantity), [7, 4, 4, 4]);
  const drawn = changeCartGroupDrawing(changed, bundle[0].id, true);
  assert.deepEqual(drawn.map(item => item.needDrawing), [false, true, true, true]);
  const ids = getCartGroupMemberIds(drawn, bundle[1].id);
  assert.deepEqual(drawn.filter(item => !ids.has(item.id)), [unrelated]);
  assert.equal(findHflCartBundle(JSON.parse(JSON.stringify(drawn)), ["809215", "809216"])?.items.length, 3);
});

test("legacy pair is grouped primary-first regardless of stored order", () => {
  const migrated = migrateLegacyHflBundle([washers[1], unrelated, fitting]);
  const groups = getCartGroups(migrated);
  assert.equal(groups.length, 2);
  assert.deepEqual(groups[0].items.map(item => item.productCode), ["809032", "809216"]);
  assert.equal(groups[1].primary, unrelated);
  assert.deepEqual(migrateLegacyHflBundle(migrated), migrated);
});

test("legacy migration preserves unequal quantities and drawing flags", () => {
  const migrated = migrateLegacyHflBundle([{ ...fitting, quantity: 5, needDrawing: true }, { ...washers[1], quantity: 2 }]);
  assert.equal(getCartGroups(migrated).length, 2);
  assert.equal(migrated.filter(item => item.productCode === "809032").reduce((sum, item) => sum + item.quantity, 0), 5);
  assert.equal(migrated.filter(item => item.productCode === "809216").reduce((sum, item) => sum + item.quantity, 0), 2);
  assert.equal(migrated.filter(item => item.productCode === "809032").every(item => item.needDrawing), true);
  assert.equal(migrated.find(item => item.productCode === "809216")?.needDrawing, false);
});

test("ambiguous historical selections and orphaned parts remain readable", () => {
  const ambiguous = [fitting, washers[0], washers[1], unrelated];
  assert.deepEqual(migrateLegacyHflBundle(ambiguous), ambiguous);
  assert.equal(getCartGroups(ambiguous).length, 4);
  const orphan = createCartBundle(fitting, [washers[1]])[1];
  assert.equal(getCartGroups([orphan])[0].primary, orphan);
});
