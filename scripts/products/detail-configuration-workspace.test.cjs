const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('tsx/cjs');
const { parseDetailConfigurations, saveDetailConfiguration, removeDetailConfiguration } = require('../../data/products/configurator/detail-configurations.ts');
const { getDetailDatasheet, getProductDetailResourceCopy, PRODUCT_CATALOG_EN } = require('../../data/products/detail/product-detail-resources.ts');
const { getSelectionWorkspaceCopy } = require('../../data/products/detail/selection-workspace-copy.ts');
const { getDiaphragmPumpConfigurator } = require('../../data/products/configurator/diaphragm-pumps.ts');
const { getValvelessPumpConfigurator } = require('../../data/products/configurator/valveless-pumps.ts');
const { getSolenoidConfigurator } = require('../../data/products/configurator/solenoid-valves.ts');
const { DIAPHRAGM_PUMP_SERIES_SLUGS } = require('../../data/products/detail/diaphragm-pump-routes.ts');
const { diaphragmPumpReferenceModels } = require('../../data/products/detail/diaphragm-pump-reference-models.ts');
const { solenoidPageConfigurations } = require('../../data/products/detail/solenoid-configurations.ts');
const valvelessModels = require('../../data/products/generated/pumps/valveless-pumps/detail/index.json');
const locales = ['zh', 'en', 'es', 'fr', 'ko', 'ru'];

test('saved configurations reject stale IDs and edit without duplicates or deleting inquiry entries', () => {
  const variants = ['a', 'b', 'c'].map(id => ({id, model:id, productCode:id, attributes:{}}));
  const initial = parseDetailConfigurations({version:1, variantIds:['a', 'foreign-model', 'a'], activeId:'foreign-model'}, variants);
  assert.deepEqual(initial, {version:1, variantIds:['a'], activeId:'a'});
  const two = saveDetailConfiguration(initial, 'b', null);
  assert.deepEqual(two.variantIds, ['a', 'b']);
  assert.deepEqual(saveDetailConfiguration(two, 'c', 'a').variantIds, ['c','b']);
  assert.deepEqual(saveDetailConfiguration(two, 'b', 'a').variantIds, ['b']);
  assert.deepEqual(removeDetailConfiguration(two, 'b'), {version:1,variantIds:['a'],activeId:'a'});
  assert.deepEqual(initial.variantIds, ['a']);
  assert.equal(parseDetailConfigurations({version:2,variantIds:['a']},variants).variantIds.length,0);
});

test('all six workspace and CAD dialog languages are complete and counts are grammatical', () => {
  for (const locale of locales) {
    const copy = getSelectionWorkspaceCopy(locale);
    assert.ok(copy.heading('DPL30').includes('DPL30'));
    assert.ok(copy.configuration(2).includes('2'));
    for (const text of Object.values(copy).filter(value => typeof value === 'string')) assert.ok(text.trim());
    if (locale !== 'zh') assert.doesNotMatch(JSON.stringify([copy,getProductDetailResourceCopy(locale)]),/[\u3400-\u9fff]/);
  }
  assert.match(getSelectionWorkspaceCopy('en').saved(1),/1 saved configuration\./);
  assert.match(getSelectionWorkspaceCopy('en').saved(2),/2 saved configurations\./);
  assert.match(getSelectionWorkspaceCopy('fr').saved(1),/configuration enregistrée\./);
  assert.match(getSelectionWorkspaceCopy('es').saved(1),/configuración guardada\./);
});

test('catalog documents match the product and always resolve to real PDF files', () => {
  const products = [
    {slug:'ea-100-pmma'}, {slug:'sm-1000-peek'}, {slug:'dpl30'}, {slug:'dpl60-bs'}, {slug:'dpgl800-ds'},
    {slug:'dpl30h-bs'}, {slug:'rpl-p635'}, {slug:'rpl-p15'}, {slug:'smtp2'},
    {slug:'hld3-30mm-rotary-valve-syringe-pump'}, {slug:'hmd6-60mm-solenoid-valve-syringe-pump'},
    {slug:'mrv3'}, {slug:'hp'}, {slug:'high-pressure-valves'}, {slug:'abd'}, {slug:'pdm5-pressure-sensor'},
    {slug:'3-way-base',productTypeId:'solenoid-valves'},
    {slug:'hfl-m6-16',productTypeId:'hard-tube-fittings'},
    {slug:'pvc-tubing'}, {slug:'flanged-tubing-fep'}, {slug:'retaining-ring-kits'}, {slug:'ferrule-kits-ptfe'},
  ];
  for(const product of products) for(const locale of locales) {
    const file = getDetailDatasheet(product,locale);
    if (product.slug === 'dpl30h-bs' && locale !== 'zh') {
      assert.equal(file,null,'DPL30H has no published English datasheet; do not substitute the Chinese PDF');
      continue;
    }
    assert.ok(file,`${locale}:${product.slug}`);
    const resolved = path.join(__dirname,'../../public',file.file);
    assert.ok(fs.existsSync(resolved),file.file);
    assert.equal(fs.readFileSync(resolved).subarray(0,5).toString(),'%PDF-');
    assert.ok(['zh','en'].includes(file.language),file.file);
    if (locale !== 'zh') {
      assert.equal(file.language,'en');
      assert.ok(file.file.includes('/en/'),file.file);
    }
  }
  const generalCatalog = path.join(__dirname,'../../public',PRODUCT_CATALOG_EN.file);
  assert.equal(fs.readFileSync(generalCatalog).subarray(0,5).toString(),'%PDF-');
  assert.equal(getDetailDatasheet({slug:'dpl30h-bs'},'zh').language,'zh');
  assert.match(getDetailDatasheet({slug:'rpl-p15'},'zh').title,/P15/);
  assert.equal(getDetailDatasheet({slug:'rpl-p4'},'en'),null);
  assert.equal(getDetailDatasheet({slug:'tm-100-pmma'},'en'),null);
  assert.equal(getDetailDatasheet({slug:'sampling-probes'},'en'),null);
  assert.equal(getDetailDatasheet({slug:'hfl-m6-16',productTypeId:'hard-tube-fittings'},'es').kind,'catalog');
  assert.match(getDetailDatasheet({slug:'high-pressure-valves'},'fr').id,/^hp-2-position-6-port/);
  for (const slug of ['pvc-tubing','tpu-tubing','fep-tubing','ptfe-tubing','peek-tubing','pfa-tubing','flanged-tubing-fep','retaining-ring-kits','ferrule-kits-ptfe']) {
    for (const locale of locales.filter(value=>value!=='zh')) {
      const resource = getDetailDatasheet({slug},locale);
      assert.equal(resource.kind,'catalog');
      assert.equal(resource.language,'en');
      assert.match(resource.id,/^fittings-and-tubing-catalog-en$/);
    }
  }
});

test('workspace reuses published configurable products with identical model identities in every locale', () => {
  const cases = [
    ...[...DIAPHRAGM_PUMP_SERIES_SLUGS, ...diaphragmPumpReferenceModels.map(row=>row.slug)].map(slug=>[getDiaphragmPumpConfigurator,slug]),
    ...valvelessModels.map(row=>[getValvelessPumpConfigurator,row.slug]),
    ...solenoidPageConfigurations.map(row=>[getSolenoidConfigurator,row.slug]),
  ];
  assert.equal(cases.length,28);
  for(const locale of locales) for(const [getter,slug] of cases) {
    const config = getter(slug,locale), base = getter(slug,'zh');
    assert.ok(config?.variants.length,`${locale}:${slug}`);
    assert.deepEqual(config.variants.map(row=>[row.id,row.model,row.productCode]),base.variants.map(row=>[row.id,row.model,row.productCode]));
    if(locale !== 'zh') assert.doesNotMatch(JSON.stringify(config),/[\u3400-\u9fff]/);
  }
});
