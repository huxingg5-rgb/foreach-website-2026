const test = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');
const { parseFittingConfigurations, saveFittingConfiguration, removeFittingConfiguration } = require('../../data/products/configurator/fitting-configurations.ts');
const { FITTING_PUBLISHED_PRODUCTS } = require('../../data/products/selection/fitting-publication.generated.ts');
const { getHardTubeAccessoryConfig, getHardTubeAccessory } = require('../../data/products/configurator/hard-tube-accessories.ts');
const { getLuerPairConfig, resolveLuerPair } = require('../../data/products/configurator/luer-pairing.ts');
const { getQuickConnectPairConfig } = require('../../data/products/configurator/quick-connect-pairing.ts');
const { isHardTubePlug } = require('../../data/products/detail/hard-tube-plugs.ts');
const { isStandaloneFittingType } = require('../../data/products/configurator/standalone-fitting-selection.ts');
const { cadRequestMessage, getCadRequestCopy, variantCadConfiguration } = require('../../data/products/detail/cad-request.ts');
const { getHardTubeAccessoryCopy } = require('../../data/products/configurator/hard-tube-accessories.intl.ts');
const { getDetailDatasheet } = require('../../data/products/detail/product-detail-resources.ts');
const { fittingText } = require('../../data/products/detail/fitting-ui.intl.ts');
const { getDiaphragmPumpConfigurator } = require('../../data/products/configurator/diaphragm-pumps.ts');
const locales = ['zh', 'en', 'es', 'fr', 'ko', 'ru'];
const blank = { version: 1, configurations: [], activeId: null };
const hard = getHardTubeAccessoryConfig({ slug: 'hfl-m6-16-pv-n', productCode: '809032' }, 'en');
const validateHard = value => value.kind === 'hard-tube' && (value.choice === 'none' || Boolean(getHardTubeAccessory(hard, value.choice)));

test('fitting configurations save independently of the inquiry list, deduplicate, edit and delete by stable identity', () => {
  const single = { kind: 'hard-tube', choice: 'none' }, washer = { kind: 'hard-tube', choice: hard.accessories[0].productCode };
  const one = saveFittingConfiguration(blank, single, null), two = saveFittingConfiguration(one, washer, null);
  assert.equal(two.configurations.length, 2);
  assert.deepEqual(saveFittingConfiguration(two, single, null).configurations, two.configurations);
  const edited = saveFittingConfiguration(two, washer, one.activeId);
  assert.equal(edited.configurations.length, 1);
  assert.equal(edited.activeId, two.activeId);
  const removed = removeFittingConfiguration(two, two.activeId);
  assert.equal(removed.configurations.length, 1);
  assert.equal(removed.activeId, one.activeId);
  assert.equal(two.configurations.length, 2);
  assert.equal(blank.configurations.length, 0);
});

test('restored fitting configurations reject malformed, stale and incompatible parts', () => {
  const saved = saveFittingConfiguration(blank, {kind:'hard-tube',choice:'none'},null);
  const raw = {...saved, configurations: [...saved.configurations, {choice:{kind:'hard-tube',choice:'not-a-published-accessory'}},
    {choice:{kind:'luer',choice:{mode:'pair'}}}, null, {choice:{kind:'unknown',choice:'none'}}]};
  assert.deepEqual(parseFittingConfigurations(JSON.parse(JSON.stringify(raw)), validateHard), saved);
  assert.deepEqual(parseFittingConfigurations({...saved,version:2}, validateHard), blank);
  assert.deepEqual(parseFittingConfigurations(saved, () => false), blank);
});

test('all published fitting combination rules remain valid and language-independent', () => {
  const counts = {hard:0,luer:0,quick:0,standalone:0,fixed:0};
  for (const row of FITTING_PUBLISHED_PRODUCTS) {
    const data = {...row, slug:row.detailHref.split('/').pop(), model:row.foreachModel};
    for (const locale of locales) assert.equal(getDetailDatasheet(data,locale)?.kind,'catalog',`${locale}:${row.foreachModel}`);
    const h = getHardTubeAccessoryConfig(data,'zh'), l = getLuerPairConfig(data,'zh'), q = getQuickConnectPairConfig(data,'zh');
    if (h) {
      counts.hard++;
      for (const locale of locales) assert.deepEqual(getHardTubeAccessoryConfig(data,locale).accessories.map(part=>part.productCode),h.accessories.map(part=>part.productCode));
    } else if (l) {
      counts.luer++;
      for (const locale of locales) {
        const config = getLuerPairConfig(data,locale), choice = {kind:'luer',choice:config.defaultChoice};
        const saved = saveFittingConfiguration(blank,choice,null);
        const restored = parseFittingConfigurations(JSON.parse(JSON.stringify(saved)), value => value.kind === 'luer' && Boolean(resolveLuerPair(config,value.choice)));
        assert.equal(restored.configurations.length,1,row.foreachModel);
        assert.deepEqual(resolveLuerPair(config,restored.configurations[0].choice.choice).map(part=>part.model),resolveLuerPair(l,l.defaultChoice).map(part=>part.model));
      }
    } else if (q) {
      counts.quick++;
      for (const locale of locales) assert.deepEqual(getQuickConnectPairConfig(data,locale).options.map(part=>part.model),q.options.map(part=>part.model));
    } else if (isHardTubePlug(data) || isStandaloneFittingType(row.productTypeId)) counts.standalone++;
    else counts.fixed++;
  }
  assert.deepEqual(counts,{hard:105,luer:137,quick:175,standalone:225,fixed:6});
  assert.equal(Object.values(counts).reduce((sum,n)=>sum+n,0),648);
});

test('CAD messages preserve each configuration, drawing type, part codes and technical values in all six languages', () => {
  for (const locale of locales) {
    const copy = getCadRequestCopy(locale);
    for (const value of Object.values(copy).filter(item=>typeof item==='string')) {
      assert.ok(value.trim());
      if (locale !== 'zh') assert.doesNotMatch(value,/[\u3400-\u9fff]/);
    }
    const config = getDiaphragmPumpConfigurator('dpl30h-liquid-diaphragm-pump',locale);
    const first = variantCadConfiguration(config,config.variants[0],locale);
    const second = variantCadConfiguration(config,config.variants.at(-1),locale);
    const message = cadRequestMessage(locale,second,2,['2d','3d'],'STEP · M6×1 · 1.6 mm · WS-46-18-09-PT-N · 809217');
    assert.ok(message.includes(second.model));
    assert.ok(message.includes(copy.twoD) && message.includes(copy.threeD));
    for (const [,value] of second.rows) assert.ok(message.includes(value));
    assert.ok(message.includes('STEP · M6×1 · 1.6 mm · WS-46-18-09-PT-N · 809217'));
    assert.notEqual(first.model,second.model);
    if (locale !== 'zh') assert.doesNotMatch(message,/[\u3400-\u9fff]/);
  }
});

test('selection guidance allows saving another configuration without adding to the inquiry list first', () => {
  for (const locale of locales) {
    const copy = getHardTubeAccessoryCopy(locale);
    assert.ok(copy.description && copy.selectionNote);
    if(locale !== 'zh') assert.doesNotMatch(copy.description + copy.selectionNote,/[\u3400-\u9fff]/);
  }
  assert.doesNotMatch(getHardTubeAccessoryCopy('en').description,/list before/);
  assert.doesNotMatch(getHardTubeAccessoryCopy('zh').description,/先加入清单/);
});

test('assembly legend roles are localized without changing tube dimensions', () => {
  for (const locale of locales.filter(value => value !== 'zh')) for (const role of ['公端','穿板母端','普通母端']) {
    const label = fittingText(`${role} 1.6 mm`,locale);
    assert.doesNotMatch(label,/[\u3400-\u9fff]/);
    assert.ok(label.endsWith('1.6 mm'));
  }
});
