import assert from "node:assert/strict";
import test from "node:test";
import { defaultInquiryAccessoryName, defaultInquiryDrawingTypes, defaultInquirySubmission,
  findDefaultInquiryCartItem, getDefaultInquiryCopy, isDefaultInquiryChoice, isDefaultInquiryCart, isSameInquiryDetailHref } from "../../data/products/detail/default-inquiry";
import { createCartBundle, changeCartGroupDrawingTypes } from "../../components/selection-cart/selection-cart-bundles";
import { parseFittingConfigurations, saveFittingConfiguration } from "../../data/products/configurator/fitting-configurations";
import type { SelectionCartItemInput } from "../../components/selection-cart/selection-cart.types";
import { cadRequestMessage } from "../../data/products/detail/cad-request";
import { FITTING_PUBLISHED_PRODUCTS } from "../../data/products/selection/fitting-publication.generated";
import { HARD_TUBE_ACCESSORY_CONFIGS } from "../../data/products/configurator/hard-tube-accessories";
import { readModelDrawingRequirements } from "../../data/products/configurator/model-drawing-requirements";

const model = "HFL-M6-16-PV-N";
const fitting: SelectionCartItemInput = { sourceType: "pump-selection", sourceLabel: "Products", productName: "Fitting",
  productCode: "809032", foreachModel: model, competitorModels: [], needDrawing: true,
  drawingTypes: defaultInquiryDrawingTypes(true), quantity: 1 };

test("all 648 published fittings use the same inquiry flow and standalone identity", () => {
  assert.equal(FITTING_PUBLISHED_PRODUCTS.length, 648);
  for (const product of FITTING_PUBLISHED_PRODUCTS) {
    const item = { ...fitting, foreachModel: product.foreachModel, productCode: product.productCode,
      id: `pump-selection:${product.productCode}` };
    const bundle = createCartBundle(item, [{ ...fitting, foreachModel: "accessory", productCode: "accessory" }]);
    assert.equal(findDefaultInquiryCartItem(bundle, item), undefined, product.foreachModel);
    assert.equal(findDefaultInquiryCartItem([...bundle, item], item)?.id, item.id);
    assert.equal(defaultInquirySubmission([item])?.requestType, "Product Inquiry");
    assert.equal(defaultInquirySubmission([{ ...item, productCode: "wrong-code" }]), undefined);
  }
});

test("fixed product inquiry metadata survives serialization, mixed inquiries and drawing cancellation", () => {
  const fixed = { ...fitting, foreachModel: "ABD", productCode: "abd", inquiryMode: "product" as const, drawingTypes: [], needDrawing: false };
  const restored = JSON.parse(JSON.stringify(fixed));
  assert.equal(defaultInquirySubmission([restored])?.requestType, "Product Inquiry");
  assert.equal(defaultInquirySubmission([restored, fitting])?.requestType, "Product Inquiry");
  assert.equal(defaultInquirySubmission([{ ...fixed, inquiryMode: undefined }]), undefined);
  assert.deepEqual(readModelDrawingRequirements(null, ["2d", "3d"]), ["2d", "3d"]);
  assert.deepEqual(readModelDrawingRequirements("[]", ["2d", "3d"]), []);
  assert.deepEqual(readModelDrawingRequirements('["3d"]', ["2d", "3d"]), ["3d"]);
  assert.deepEqual(readModelDrawingRequirements("invalid", ["2d", "3d"]), ["2d", "3d"]);
});

test("all single-fitting choice types share the default tile; combinations remain independent", () => {
  assert.equal(isDefaultInquiryChoice({ kind: "luer", choice: { mode: "single" } }), true);
  assert.equal(isDefaultInquiryChoice({ kind: "luer", choice: { mode: "core", collarModel: "LPT-PP-N" } }), false);
  assert.equal(isDefaultInquiryChoice({ kind: "quick-connect", choice: "Q2001-SNV-SACN" }), false);
  assert.equal(isDefaultInquiryChoice({ kind: "hard-tube", choice: "809216" }), false);
});

test("accessory labels across the hard-tube catalog use the current language and retain model identities", () => {
  for (const config of HARD_TUBE_ACCESSORY_CONFIGS) for (const part of config.accessories) {
    const item = { bundleRole: "accessory" as const, productCode: part.productCode,
      foreachModel: part.model, detailHref: `/fr${config.detailHref}` };
    for (const locale of ["en", "es", "fr", "ko", "ru"]) {
      const label = defaultInquiryAccessoryName(item, locale);
      assert.ok(label, `${config.model}:${part.productCode}:${locale}: missing accessory label`);
      assert.ok(label.includes(config.model), `${config.model}:${part.productCode}:${locale}`);
      assert.doesNotMatch(label, /[\u3400-\u9fff]/);
    }
  }
});

test("fixed products never receive accessory instructions in any language", () => {
  for (const locale of ["zh", "en", "es", "fr", "ko", "ru"]) {
    const fixed = getDefaultInquiryCopy(locale, false), fittings = getDefaultInquiryCopy(locale, true);
    assert.ok(fittings.helper.endsWith(fittings.additionalHelper));
    assert.ok(fittings.touchHelper.endsWith(fittings.additionalHelper));
    assert.equal(fixed.helper.includes(fixed.additionalHelper), false);
    assert.equal(fixed.touchHelper.includes(fixed.additionalHelper), false);
  }
});

test("saved quick-connect pair links remain equivalent across languages without changing routes", () => {
  const href = "/products/fittings/quick-connect-fittings/q2001-snv-sacn";
  assert.equal(isSameInquiryDetailHref(`/en${href}/`, href), true);
  assert.equal(isSameInquiryDetailHref(`/fr${href}`, `/ru${href}/`), true);
  assert.equal(isSameInquiryDetailHref(href, `${href}-other`), false);
  assert.equal(isSameInquiryDetailHref(), false);
});

test("only a CAD-capable new selection receives both document defaults; saved cancellations remain cancelled", () => {
  assert.deepEqual(defaultInquiryDrawingTypes(true), ["2d", "3d"]);
  assert.deepEqual(defaultInquiryDrawingTypes(false), []);
  assert.deepEqual(defaultInquiryDrawingTypes(true, { drawingTypes: [] }), []);
  assert.deepEqual(defaultInquiryDrawingTypes(true, { drawingTypes: ["3d"] }), ["3d"]);
  assert.deepEqual(defaultInquiryDrawingTypes(true, { needDrawing: true }), ["2d"]);
  assert.deepEqual(defaultInquiryDrawingTypes(true, {}), []);
});

test("defaults survive configuration persistence and cart edits carry the exact customer choice", () => {
  const store = saveFittingConfiguration({ version: 1, configurations: [], activeId: null },
    { kind: "hard-tube", choice: "none" }, null, fitting.drawingTypes);
  const restored = parseFittingConfigurations(JSON.parse(JSON.stringify(store)), () => true);
  assert.deepEqual(defaultInquiryDrawingTypes(true, restored.configurations[0]), ["2d", "3d"]);
  const bundle = createCartBundle(fitting, [{ ...fitting, productCode: "809037", foreachModel: "WS-46-18-09-PK-N" }]);
  const changed = changeCartGroupDrawingTypes(bundle, bundle[0].id, []);
  assert.deepEqual(changed.map(item => [item.quantity, item.drawingTypes]), [[1, []], [1, []]]);
  assert.equal(defaultInquirySubmission(changed)?.requestType, "Product Inquiry", "no drawings must still allow a product inquiry");
});

test("product inquiries accept matching accessories, but never capture unknown products or orphan accessories", () => {
  const primary = { ...fitting };
  assert.equal(isDefaultInquiryCart([primary]), true);
  assert.equal(isDefaultInquiryCart([]), false);
  assert.equal(isDefaultInquiryCart([primary, { ...fitting, foreachModel: "SV10-P-3-24-EP/PK" }]), false);
  assert.equal(isDefaultInquiryCart([{ ...fitting, bundleRole: "accessory" }]), false);
  const bundle = createCartBundle(fitting, [{ ...fitting, productCode: "809037", foreachModel: "WS-46-18-09-PK-N" }]);
  assert.equal(isDefaultInquiryCart(bundle), true);
  assert.equal(isDefaultInquiryCart([...bundle, { ...fitting, foreachModel: "washer", bundleRole: "accessory", bundleId: "unrelated" }]), false);
  assert.equal(defaultInquirySubmission([{ ...fitting, foreachModel: "EA-250-PMMA" }]), undefined);
});

test("request classification is product consultation and all six locale copies are complete", () => {
  assert.deepEqual(defaultInquirySubmission([fitting]), {
    formId: "product_inquiry_form", formType: "product_inquiry", requestType: "Product Inquiry",
    projectStage: "Product Selection and Quotation", itemsHeading: "Product Inquiry Items:",
  });
  const keys = Object.keys(getDefaultInquiryCopy("zh"));
  for (const locale of ["zh", "en", "es", "fr", "ko", "ru"]) {
    const copy = getDefaultInquiryCopy(locale);
    assert.deepEqual(Object.keys(copy), keys);
    for (const value of Object.values(copy)) assert.ok(value.trim());
    if (locale !== "zh") assert.doesNotMatch(JSON.stringify(copy), /[\u3400-\u9fff]/);
  }
  assert.deepEqual(getDefaultInquiryCopy("zh-CN"), getDefaultInquiryCopy("zh"));
});

test("saved accessory labels follow the current language without changing part identities", () => {
  const accessory = { productCode: "809216", foreachModel: "WS-46-18-09-PK-N", bundleRole: "accessory" as const,
    detailHref: "/products/fittings/hard-tube-fittings/hfl-m6-16-pv-n/" };
  for (const locale of ["en", "es", "fr", "ko", "ru"]) {
    const label = defaultInquiryAccessoryName(accessory, locale)!;
    assert.ok(label.includes("PEEK")); assert.ok(label.includes(model));
    assert.doesNotMatch(label, /[\u3400-\u9fff]/);
  }
  assert.equal(defaultInquiryAccessoryName(accessory, "en"), "PEEK Washer (for HFL-M6-16-PV-N)");
  assert.equal(defaultInquiryAccessoryName({ ...accessory, foreachModel: "unrelated" }, "en"), undefined);
  assert.equal(defaultInquiryAccessoryName({ ...accessory, detailHref: "/other-product/" }, "en"), undefined);
});

test("default membership refers only to the standalone fitting and cannot remove an accessory combination", () => {
  const bundle = createCartBundle(fitting, [{ ...fitting, productCode: "809216", foreachModel: "WS-46-18-09-PK-N" }]);
  assert.equal(findDefaultInquiryCartItem(bundle, fitting), undefined);
  const standalone = { ...fitting, id: "pump-selection:809032", quantity: 3, drawingTypes: [] };
  const mixed = [...bundle, standalone];
  const selected = findDefaultInquiryCartItem(mixed, fitting)!;
  assert.equal(selected.id, standalone.id);
  assert.equal(selected.quantity, 3);
  assert.deepEqual(defaultInquiryDrawingTypes(true, selected), []);
  assert.deepEqual(mixed.filter(item => item.id !== selected.id), bundle);
  assert.equal(findDefaultInquiryCartItem(mixed, { ...fitting, foreachModel: "HFL-M6-16-PK-N" }), undefined);
});

test("the saved fitting-only record belongs to the default tile without deleting other configurations", () => {
  const store = saveFittingConfiguration({ version: 1, configurations: [], activeId: null },
    { kind: "hard-tube", choice: "none" }, null, []);
  const paired = saveFittingConfiguration(store, { kind: "hard-tube", choice: "809216" }, null, ["3d"]);
  const custom = paired.configurations.filter(item => !isDefaultInquiryChoice(item.choice));
  assert.equal(custom.length, 1);
  assert.deepEqual(custom[0].choice, { kind: "hard-tube", choice: "809216" });
  assert.deepEqual(custom[0].drawingTypes, ["3d"]);
  assert.equal(paired.configurations.length, 2, "display grouping must preserve the saved records");
  assert.equal(isDefaultInquiryChoice({ kind: "quick-connect", choice: "none" }), true);
});

test("CAD requests retain the same default label as the detail workspace in every language", () => {
  for (const locale of ["zh", "en", "es", "fr", "ko", "ru"]) {
    const label = getDefaultInquiryCopy(locale).defaultLabel;
    const message = cadRequestMessage(locale, { id: "default", model, label,
      drawingTypes: ["3d"], rows: [["Item code", "809032"], ["Thread", "M6×1"]] }, 1, ["3d"], "");
    assert.equal(message.split("\n")[1], label);
    assert.ok(message.includes("809032")); assert.ok(message.includes("M6×1"));
  }
});
