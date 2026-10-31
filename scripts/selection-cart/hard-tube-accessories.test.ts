import assert from "node:assert/strict";
import test from "node:test";
import sourceProducts from "../../data/products/generated/fittings/hard-tube-fittings/detail/index.json";
import { HARD_TUBE_ACCESSORY_CONFIGS, getHardTubeAccessoryConfig, getHardTubeAccessory, isHardTubeAccessoryCartItem, hardTubeProductCodeText } from "../../data/products/configurator/hard-tube-accessories";
import { HARD_TUBE_ACCESSORY_LOCALES, getHardTubeAccessoryCopy, formatHardTubeCopy, getHardTubeAccessoryKindLabel } from "../../data/products/configurator/hard-tube-accessories.intl";
import { createCartBundle, findHardTubeCartBundle, getHardTubeSelectionSummary, getCartGroupMemberIds, changeCartGroupQuantity, changeCartGroupDrawing } from "../../components/selection-cart/selection-cart-bundles";
import type { SelectionCartItem } from "../../components/selection-cart/selection-cart.types";

const config = (model: string) => {
  const found = HARD_TUBE_ACCESSORY_CONFIGS.find(item => item.model === model);
  assert.ok(found, model);
  return found;
};
const codes = (model: string, diameter?: number) => config(model).accessories.filter(item => diameter === undefined || item.tubeOuterDiameters.includes(diameter)).map(item => item.productCode);

test("all six locales share the four supported series and exact catalog compatibility", () => {
  const expected = sourceProducts.filter(product => /^(standard|compact)-(flat-bottom|ferrule)-fitting$/.test(product.seriesId));
  assert.equal(expected.length, 136);
  assert.deepEqual(HARD_TUBE_ACCESSORY_CONFIGS.map(product => [product.productCode, product.model]), expected.map(product => [product.productCode, product.model]));
  for (const product of HARD_TUBE_ACCESSORY_CONFIGS) {
    assert.deepEqual(getHardTubeAccessoryConfig(product, "zh"), product);
    assert.ok(product.accessories.length > 0, product.model);
    for (const locale of HARD_TUBE_ACCESSORY_LOCALES) {
      const localized = getHardTubeAccessoryConfig({ ...product, productTypeName: `Localized ${product.model}` }, locale);
      assert.ok(localized);
      assert.equal(localized.productName, `Localized ${product.model}`);
      assert.equal(localized.detailHref, `${locale === "zh" ? "" : `/${locale}`}${product.detailHref}`);
      assert.deepEqual(localized.accessories, product.accessories);
      assert.deepEqual(localized.tubeOuterDiameters, product.tubeOuterDiameters);
    }
    assert.equal(getHardTubeAccessoryConfig({ ...product, productCode: "invalid" }, "zh"), undefined);
  }
  for (const product of sourceProducts.filter(product => /retaining-ring|high-pressure/.test(product.seriesId))) assert.equal(getHardTubeAccessoryConfig(product, "zh"), undefined);
});

test("catalog fixtures match thread, tube diameter and fitting construction", () => {
  assert.deepEqual(codes("HFL-M6-16-PV-N"), ["809215", "809216", "809217"]);
  assert.deepEqual(codes("HFL-U28-25-PV-N"), ["809244", "809245", "809246"]);
  assert.deepEqual(codes("HF-M6-20-PK-N", 1.6), ["809215", "809216", "809217"]);
  assert.deepEqual(codes("HF-M6-20-PK-N", 2), ["809221", "809222", "809223"]);
  assert.deepEqual(codes("HF6-U28-32-PS-B", 3), ["809247", "809248", "809249"]);
  assert.deepEqual(codes("HFL6-M6-32-PS-B"), ["809229", "809230"]);
  assert.deepEqual(codes("HN-U28-16-PK-N"), ["809731", "809820"]);
  assert.deepEqual(codes("HN6-U28-32-PV-N", 2.5), ["809735", "809822"]);
  assert.deepEqual(codes("HN6-U28-32-PV-N", 3.2), ["809780", "809650", "809824"]);
  assert.deepEqual(config("HN6-U28-32-PV-N").tubeOuterDiameters, [2, 2.5, 3, 3.2]);
  assert.deepEqual(codes("HNF-M6-16-PV-N"), ["809201", "809202"]);
  assert.deepEqual(codes("HNF6-U28-30-PS-B"), ["809209", "809210"]);
  assert.deepEqual(codes("HNE-U28-32-PP-N"), ["809928"]);
  assert.deepEqual(codes("HNE6-U28-32-PS-B"), ["809928"]);
  const clamp16 = config("HN-M6-16-PV-N").accessories.find(item => item.productCode === "809731");
  assert.deepEqual({ outer: clamp16?.outerDiameter, inner: clamp16?.innerDiameter, height: clamp16?.height }, { outer: 4.6, inner: 1.6, height: 5.6 });
  const clamp32 = config("HN-M6-32-PV-N").accessories.find(item => item.productCode === "809780");
  assert.deepEqual({ outer: clamp32?.outerDiameter, inner: clamp32?.innerDiameter, height: clamp32?.height }, { outer: 4.8, inner: 3.2, height: 4.8 });
});

test("selection names reuse the visible localized product series", () => {
  const product = config("HN-M6-16-PV-N");
  const detail = { ...product, productTypeName: "Hard Tube Fitting", seriesName: "standard knurled clamp fitting", specs: [{ label: "Product Series", value: "Standard Knurled Clamp Fitting" }] };
  assert.equal(getHardTubeAccessoryConfig(detail, "en")?.productName, "Standard Knurled Clamp Fitting");
  assert.equal(getHardTubeAccessoryConfig({ ...detail, seriesName: "Raccord standard à bague" }, "fr")?.productName, "Raccord standard à bague");
});

const primary = (model: string): SelectionCartItem => {
  const product = config(model);
  return { id: `pump-selection:${product.productCode}`, sourceType: "pump-selection", sourceLabel: "产品中心", productCode: product.productCode, foreachModel: product.model, productName: product.productName, quantity: 1, competitorModels: [], needDrawing: false, detailHref: product.detailHref };
};
const bundle = (model: string, code: string) => {
  const product = primary(model);
  const accessory = getHardTubeAccessory(config(model), code);
  assert.ok(accessory);
  return createCartBundle(product, [{ ...product, productCode: code, foreachModel: accessory.model, productName: accessory.kind }]);
};

test("different fittings sharing one accessory remain separate after hydration and group edits", () => {
  const a = config("HFL-U28-25-PV-N");
  const b = config("HF6-U28-25-PK-N");
  const aPair = bundle(a.model, "809245");
  const bPair = bundle(b.model, "809245");
  const another = bundle(a.model, "809246");
  const saved: SelectionCartItem[] = JSON.parse(JSON.stringify([...aPair, ...bPair, ...another, primary(a.model)]));
  assert.equal(findHardTubeCartBundle(saved, a, "809245")?.id, aPair[0].bundleId);
  assert.equal(findHardTubeCartBundle(saved, b, "809245")?.id, bPair[0].bundleId);
  assert.deepEqual(getHardTubeSelectionSummary(saved, a, "809244"), ["809245", "809246", "none", "809244"]);
  assert.deepEqual(getHardTubeSelectionSummary(saved, b, null), ["809245"]);
  assert.deepEqual(getHardTubeSelectionSummary(saved, b, "809215"), ["809245"]);
  const changed = changeCartGroupDrawing(changeCartGroupQuantity(saved, aPair[0].id, 3), aPair[0].id, true);
  assert.deepEqual(changed.map(item => item.quantity), [3, 3, 1, 1, 1, 1, 1]);
  assert.deepEqual(changed.map(item => item.needDrawing), [true, true, false, false, false, false, false]);
  const deleted = getCartGroupMemberIds(changed, aPair[1].id);
  assert.deepEqual(getHardTubeSelectionSummary(changed.filter(item => !deleted.has(item.id)), a, null), ["809246", "none"]);
});

test("accessory persistence supports localized paths but rejects wrong identities and foreign URLs", () => {
  const valid = bundle("HNF-M6-16-PV-N", "809201")[1];
  assert.equal(isHardTubeAccessoryCartItem(valid), true);
  assert.equal(isHardTubeAccessoryCartItem({ ...valid, foreachModel: "made-up" }), false);
  assert.equal(isHardTubeAccessoryCartItem({ ...valid, detailHref: config("HN-U28-16-PK-N").detailHref }), false);
  for (const locale of ["en", "es", "fr", "ko", "ru"]) assert.equal(isHardTubeAccessoryCartItem({ ...valid, detailHref: `/${locale}${valid.detailHref}` }), true);
  for (const prefix of ["/de", "https://example.com", "/en/other"]) assert.equal(isHardTubeAccessoryCartItem({ ...valid, detailHref: `${prefix}${valid.detailHref}` }), false);
  assert.equal(isHardTubeAccessoryCartItem({ ...valid, sourceType: "custom" }), false);
});

test("saved combinations remain recognized across language changes", () => {
  const product = config("HN6-U28-32-PV-N");
  const saved = bundle(product.model, "809650").map(item => ({ ...item, detailHref: `/fr${item.detailHref}` }));
  for (const locale of HARD_TUBE_ACCESSORY_LOCALES) {
    const localized = getHardTubeAccessoryConfig(product, locale)!;
    assert.equal(findHardTubeCartBundle(saved, localized, "809650")?.id, saved[0].bundleId);
    assert.deepEqual(getHardTubeSelectionSummary(saved, localized, null), ["809650"]);
  }
});

test("interface copy covers each locale without untranslated placeholders or Chinese text", () => {
  for (const locale of HARD_TUBE_ACCESSORY_LOCALES) for (const kind of ["垫片", "卡箍"]) {
    const copy = getHardTubeAccessoryCopy(locale);
    for (const template of Object.values(copy)) {
      const text = formatHardTubeCopy(template, { kind: getHardTubeAccessoryKindLabel(kind, locale), material: "PEEK", model: "HN-M6-16-PV-N", thread: "M6×1", diameters: "1.6 mm" });
      assert.ok(!/\{\w+\}/.test(text), `${locale}: ${text}`);
      if (locale !== "zh") assert.ok(!/[\u4e00-\u9fff]/.test(text), `${locale}: ${text}`);
    }
  }
});

test("WS-27 uses the user-approved series name without inventing a numeric SKU", () => {
  const product = config("HFL6-U40-16-PK-N");
  assert.deepEqual(codes(product.model), ["WS-27"]);
  const pair = bundle(product.model, "WS-27");
  assert.equal(isHardTubeAccessoryCartItem(pair[1]), true);
  assert.equal(pair[1].foreachModel, "WS-27");
  assert.equal(hardTubeProductCodeText(pair[1]), "待确认");
  assert.equal(hardTubeProductCodeText(pair[0]), "809841");
  assert.equal(findHardTubeCartBundle(JSON.parse(JSON.stringify(pair)), product, "WS-27")?.accessories.length, 1);
});
