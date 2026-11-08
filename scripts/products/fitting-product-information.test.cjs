/* eslint-disable @typescript-eslint/no-require-imports -- Run the real TS data adapters in Node. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('tsx/cjs');
const { FITTING_PUBLISHED_PRODUCTS } = require('../../data/products/selection/fitting-publication.generated.ts');
const { connectPublishedFittingProduct } = require('../../data/products/selection/connectPublishedFittingProduct.ts');
const { withRemainingFittingChineseData, withRemainingFittingProductSpecs } = require('../../data/products/detail/remaining-fitting-detail.zh.ts');
const { localizeProductDetailData } = require('../../data/products/detail/product-detail.intl.ts');
const { localizeQuickConnectDetailData } = require('../../data/products/detail/quick-connect-detail.intl.ts');
const root = path.join(__dirname, '../../data/products/generated/fittings');
const products = fs.readdirSync(root).flatMap(type => {
  const file = path.join(root, type, 'detail/index.json');
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')).flatMap(data => {
    const connected = connectPublishedFittingProduct(data);
    return connected ? [{ ...connected, productTypeId: type, category: 'fittings' }] : [];
  }) : [];
});
function english(data) {
  const source = withRemainingFittingProductSpecs(data);
  return data.productTypeId === 'quick-connect-fittings'
    ? localizeQuickConnectDetailData(source) : localizeProductDetailData(source);
}

test('all published fitting specifications follow the current Chinese rows without losing technical values', () => {
  assert.equal(products.length, FITTING_PUBLISHED_PRODUCTS.length);
  assert.equal(new Set(products.map(p => p.productTypeId)).size, 9);
  for (const data of products) {
    const before = JSON.stringify(data);
    const source = withRemainingFittingChineseData(data);
    const englishSource = withRemainingFittingProductSpecs(data);
    assert.deepEqual(englishSource.specs, source.specs, data.model + ' Chinese source rows');
    assert.deepEqual(englishSource.faqs, data.faqs, data.model + ' unrelated FAQ copy');
    const target = english(data);
    assert.equal(target.specs.length, source.specs.length, data.model + ' row count');
    for (let i = 0; i < source.specs.length; i++) {
      const from = source.specs[i], to = target.specs[i], label = data.model + ' ' + from.label;
      assert.ok(to.label && to.value, label);
      assert.notEqual(to.label, 'Specification', label);
      assert.doesNotMatch(to.label + to.value, /[\u3400-\u9fff]|Available by configuration/, label);
      if (!/[\u3400-\u9fff]/.test(from.value)) assert.equal(to.value, from.value, label + ' literal value');
      assert.deepEqual(to.value.match(/\d+(?:\.\d+)?/g), from.value.match(/\d+(?:\.\d+)?/g), label + ' numeric values');
    }
    assert.equal(JSON.stringify(data), before, data.model + ' source is immutable');
  }
});

test('fluid threads, mounting threads, polymer identities and Luer accessories retain their separate meanings', () => {
  const find = prefix => products.find(p => p.model.startsWith(prefix));
  const rows = data => Object.fromEntries(english(data).specs.map(row => [row.label, row.value]));
  const union = rows(find('U-M6-20-AC-'));
  assert.equal(union['Fluid-Port Female Thread'], 'M6×1');
  assert.equal(union.Material, 'POM (polyoxymethylene, code AC)');
  const panelUnion = rows(find('PMU-'));
  assert.equal(panelUnion['Fluid-Port Female Thread'], '1/4-28 UNF');
  assert.equal(panelUnion['Mounting Thread'], 'M12×1.5');
  for (const prefix of ['PMB-', 'PMLS-', 'LNS-']) {
    const result = rows(find(prefix));
    assert.equal(result['Mounting Thread'], '1/4-28 UNF', prefix);
    assert.ok(!result['Thread Size'], prefix);
  }
  for (const [prefix, meaning] of [
    ['LCR-', 'Luer Identification Ring'],
    ['LPT-', 'Luer Internally Threaded Collar'],
    ['LNS-', 'Luer Knurled Nut'],
    ['LPBL-', 'Male Luer Plug'],
  ]) assert.equal(rows(find(prefix))['Luer structure'], meaning, prefix);
  const threadedQuick = products.find(p => p.productTypeId === 'quick-connect-fittings' && p.specs.some(s => s.label === '螺纹规格'));
  assert.ok(rows(threadedQuick)['Thread size']);
});
