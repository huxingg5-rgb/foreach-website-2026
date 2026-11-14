const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('tsx/cjs');
const { getProductResourceDownloads } = require('../../data/products/detail/product-resource-downloads.ts');
const { getDetailDatasheet, PRODUCT_CATALOG_EN } = require('../../data/products/detail/product-detail-resources.ts');
const { getSelectionWorkspaceCopy } = require('../../data/products/detail/selection-workspace-copy.ts');
const { FITTING_PUBLISHED_PRODUCTS } = require('../../data/products/selection/fitting-publication.generated.ts');
const locales = ['en', 'es', 'fr', 'ko', 'ru'];

test('all download languages use concise localized labels and the same English resources', () => {
  const enSheet = getDetailDatasheet({slug: 'ea-100-pmma'}, 'en');
  for (const locale of locales) {
    const copy = getSelectionWorkspaceCopy(locale);
    const items = getProductResourceDownloads(enSheet, locale);
    assert.deepEqual(items.map(item => item.label), [copy.datasheet, copy.fullCatalog]);
    assert.deepEqual(items.map(item => item.href), [enSheet.file, PRODUCT_CATALOG_EN.file]);
    assert.deepEqual(items.map(item => item.kind), ['datasheet', 'catalog']);
    assert.equal(items[0].id, enSheet.id);
    assert.equal(items[1].download, 'FOREACH-Product-Catalog-EN.pdf');
    for (const item of items) {
      assert.doesNotMatch(item.label, /\(|\)|PDF|English|英语|英文|EA/);
      assert.doesNotMatch(item.label, /[\u3400-\u9fff]/);
    }
  }
  assert.deepEqual(getProductResourceDownloads(enSheet, 'en-US'), getProductResourceDownloads(enSheet, 'en'));
});

test('Chinese downloads stay hidden, and a missing English datasheet never becomes a Chinese or fabricated link', () => {
  const zhSheet = {id:'chinese-only-test', language:'zh', file:'/downloads/resources/datasheets/zh/test-only.pdf', title:'Test', shortTitle:'Test'};
  for (const locale of ['zh', 'zh-CN', 'ZH-cn']) assert.deepEqual(getProductResourceDownloads(zhSheet, locale), []);
  for (const locale of locales) {
    assert.deepEqual(getProductResourceDownloads(null, locale).map(item => item.href), [PRODUCT_CATALOG_EN.file]);
    assert.deepEqual(getProductResourceDownloads(zhSheet, locale).map(item => item.href), [PRODUCT_CATALOG_EN.file]);
  }
});

test('every published fitting retains its own registered family document in all download languages', () => {
  for (const row of FITTING_PUBLISHED_PRODUCTS) {
    const data = {...row, slug: row.detailHref.split('/').pop(), model: row.foreachModel};
    for (const locale of locales) {
      const sheet = getDetailDatasheet(data, locale);
      const items = getProductResourceDownloads(sheet, locale);
      assert.ok(sheet, row.foreachModel);
      assert.equal(items[0].href, sheet.file);
      assert.equal(items[0].id, sheet.id);
      assert.ok(items[0].href.includes('/en/'));
      assert.equal(items.length, 2);
    }
  }
});

test('pump, valve, control, tubing, assembly and probe resources point only to existing PDFs', () => {
  const samples = [
    {slug:'ea-100-pmma'}, {slug:'sm-100-pmma'}, {slug:'tm-100-pmma'},
    {slug:'dpl30-db'}, {slug:'dpl30h-bs'}, {slug:'dpl60'}, {slug:'dpgl800'},
    {slug:'rpl-p635'}, {slug:'rpl-p4'}, {slug:'smtp2-500'}, {slug:'hld3'},
    {slug:'mrv3-d10'}, {slug:'hp'}, {model:'SV10-P-3-24-EP/PK', productTypeId:'solenoid-valves'},
    {slug:'abd-air-bubble-detector'}, {slug:'pdm5-pressure-sensor'},
    {slug:'pvc-tubing'}, {slug:'flanged-tubing'}, {slug:'sampling-probes'},
  ];
  const checked = new Set();
  for (const data of samples) for (const locale of locales) {
    const sheet = getDetailDatasheet(data, locale);
    const items = getProductResourceDownloads(sheet, locale);
    assert.equal(items.length, sheet ? 2 : 1);
    for (const item of items) {
      assert.ok(item.href.includes('/en/'), `${locale}:${data.slug || data.model}`);
      if (checked.has(item.href)) continue;
      const filename = path.join(__dirname, '../../public', item.href);
      const file = fs.openSync(filename, 'r');
      const header = Buffer.alloc(5);
      try { fs.readSync(file, header, 0, 5, 0); } finally { fs.closeSync(file); }
      assert.equal(header.toString(), '%PDF-', item.href);
      checked.add(item.href);
    }
  }
});
