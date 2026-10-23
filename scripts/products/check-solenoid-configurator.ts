import assert from "node:assert/strict";
import { getSolenoidConfigurator, solenoidOrderOptions } from "../../data/products/configurator/solenoid-valves";
import { solenoidPageConfigurations } from "../../data/products/detail/solenoid-configurations";
import { localizeProductConfiguratorConfig } from "../../components/products/configurator/product-variant-configurator.i18n";
import {
  findMatchingConfiguratorVariants,
  getSelectionFromVariant,
  updateConfiguratorSelection,
} from "../../components/products/configurator/product-variant-configurator.engine";

// Independent transcription of the supplied ordering table, including its gap at 609027.
const expectedModels = new Map([
  ["609024", "SV10-P-3-24-EP/PK"],
  ["609025", "SV10-P-2NO-24-EP/PK"],
  ["609026", "SV10-P-2NC-24-EP/PK"],
  ["609028", "SV10-P-3-24Y-EP/PK"],
  ["609029", "SV10-U28-2NO-24-EP/PK-1"],
  ["609030", "SV10-U28-2NC-24-EP/PK-1"],
  ["609031", "SV10-U28-3-24-EP/PK-1"],
  ["609032", "SV10-M6-2NO-24-EP/PK-1"],
  ["609033", "SV10-M6-2NC-24-EP/PK-1"],
  ["609034", "SV10-M6-3-24-EP/PK-1"],
]);
assert.equal(solenoidOrderOptions.length, 10);
const seenCodes = new Set<string>();
let configuredPages = 0;
for (const page of solenoidPageConfigurations) {
  const config = getSolenoidConfigurator(page.slug);
  assert.ok(config, page.slug);
  configuredPages++;
  const legacy = page.key === "two" && !page.state;
  const barbed = page.connection === "barbed";
  assert.equal(config.variants.length, barbed ? legacy ? 48 : 24 : legacy ? page.connection === "threaded" ? 4 : 2 : page.connection === "threaded" || page.key === "three" ? 2 : 1);
  assert.equal(config.allowListRemoval, false);
  assert.equal(config.noticeTitle, "清单提示：");
  assert.equal(config.notice, "可多次选型并加入清单，每次请选择不同配置；同一配置无需重复添加。");
  assert.deepEqual(getSelectionFromVariant(config), {});
  assert.deepEqual(findMatchingConfiguratorVariants(config, {}), []);
  for (const [label, value] of barbed ? [["通径", "1.4 mm"]] : [
    ["通径", "1.4 mm"], ["膜片材质", "EPDM"], ["使用电压", "DC 24 V"], ["底板材质", "PEEK"],
  ]) {
    assert.ok(config.fixedSummaryRows?.some(row => row.label === label && row.value === value));
  }
  const valveType = page.key === "three" ? "3" : page.state === "nc" ? "2NC" : "2NO";
  for (const variant of config.variants) {
    if (barbed) {
      assert.equal(config.showProductCode, false);
      assert.match(variant.model, /^SV10-B16-(3|2NC|2NO)-(12|24)Y?-(EP|FK|FF)\/(PK|PF)$/);
      assert.equal(variant.productCode, variant.model, "Unassigned SKU uses model identity without displaying a fabricated SKU");
    } else {
      assert.equal(variant.model, expectedModels.get(variant.productCode));
      if (!legacy) {
        assert.ok(!seenCodes.has(variant.productCode), "Each SKU belongs to exactly one current page");
        seenCodes.add(variant.productCode);
      }
    }
    assert.equal(variant.id, variant.productCode);
    if (!legacy) assert.equal(variant.model.split("-")[2], valveType);
    else assert.match(variant.model, /-(2NC|2NO)-/);
    if (!barbed) assert.match(variant.model, page.connection === "base" ? /^SV10-P-.*EP\/PK$/ : /^SV10-(M6|U28)-.*EP\/PK-1$/);
    let selection = getSelectionFromVariant(config);
    for (const dimension of config.dimensions) {
      selection = updateConfiguratorSelection(config, selection, dimension.key, variant.attributes[dimension.key]);
    }
    assert.deepEqual(findMatchingConfiguratorVariants(config, selection), [variant]);
    assert.deepEqual(getSelectionFromVariant(config, variant), selection);
    assert.deepEqual(findMatchingConfiguratorVariants(config, { [config.dimensions[0].key]: "unsupported" }), []);
  }
  for (const locale of ["en", "es", "fr", "ko", "ru"] as const) {
    const localized = getSolenoidConfigurator(page.slug, locale)!;
    assert.ok(localized);
    assert.equal(localized.localizedLocale, locale);
    assert.deepEqual(localizeProductConfiguratorConfig(localized, locale), localized, "Valve copy must not be replaced by generic tubing translations");
    assert.deepEqual(localized.variants.map(v => [v.id, v.model, v.productCode]), config.variants.map(v => [v.id, v.model, v.productCode]), "Model and SKU identities must remain stable across languages");
    assert(!/[\u4e00-\u9fff]/u.test(JSON.stringify(localized)), `${locale}/${page.slug}: untranslated Chinese`);
    for (const variant of localized.variants) {
      let selection = getSelectionFromVariant(localized);
      for (const dimension of localized.dimensions) {
        selection = updateConfiguratorSelection(localized, selection, dimension.key, variant.attributes[dimension.key]);
      }
      assert.deepEqual(findMatchingConfiguratorVariants(localized, selection), [variant], `${locale}/${variant.model}`);
    }
  }
}
assert.equal(configuredPages, 12);
assert.deepEqual([...seenCodes].sort(), [...expectedModels.keys()].sort());
assert.equal(getSolenoidConfigurator("missing"), undefined);
const barbed = getSolenoidConfigurator("3-way-barbed")!;
assert.equal(findMatchingConfiguratorVariants(barbed, { voltage: 12, diaphragm: "FKM", baseMaterial: "PFA", energySaving: "带节能回路（Y）" })[0]?.model, "SV10-B16-3-12Y-FK/PF");
const priorSelection = { voltage: 24, diaphragm: "EPDM", baseMaterial: "PEEK", energySaving: "标准型（无节能回路）" };
const changedSelection = updateConfiguratorSelection(barbed, priorSelection, "voltage", 12);
assert.deepEqual(changedSelection, { voltage: 12 });
assert.deepEqual(findMatchingConfiguratorVariants(barbed, changedSelection), []);
assert.equal(getSolenoidConfigurator("3-way-base", "de"), undefined);
console.log("PASS: 9 current and 3 legacy selectors in all 6 languages; stable SKUs, localized UI, page scope and explicit selection.");
