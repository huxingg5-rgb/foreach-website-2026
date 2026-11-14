const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('tsx/cjs');
const { FITTING_PUBLISHED_PRODUCTS } = require('../../data/products/selection/fitting-publication.generated.ts');
const { STANDALONE_FITTING_TYPES, isStandaloneFittingType, buildStandaloneFittingSelection, getStandaloneDimensionValues, pickStandaloneDimension } = require('../../data/products/configurator/standalone-fitting-selection.ts');
const loadSelection = type => buildStandaloneFittingSelection(type,
  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/products/generated/fittings', type === 'hard-tube-plugs' ? 'hard-tube-fittings' : type, 'detail/index.json'), 'utf8')));

test('single fitting selectors contain every published SKU, exact image and identity', async () => {
  const expectedCounts = [144, 47, 17, 6, 2, 1];
  for (const [index, type] of STANDALONE_FITTING_TYPES.entries()) {
    const config = loadSelection(type);
    const expected = FITTING_PUBLISHED_PRODUCTS.filter(row => row.productTypeId === type);
    assert.equal(config.options.length, expectedCounts[index]);
    assert.deepEqual(config.options.map(option => option.productCode).sort(), expected.map(row => row.productCode).sort());
    assert.equal(new Set(config.options.map(option => option.productCode)).size, config.options.length);
    for (const option of config.options) {
      const published = expected.find(row => row.productCode === option.productCode);
      assert.equal(option.model, published.foreachModel);
      assert.equal(option.detailHref, published.detailHref);
      assert.equal(option.imagePath, published.imageCard);
      assert.ok(fs.existsSync(path.resolve(__dirname, '../../public', '.' + option.imagePath)));
      assert.equal(option.specs.find(spec => spec.label === '型号').value, option.model);
      assert.equal(option.specs.find(spec => spec.label === '商品编码').value, option.productCode);
    }
  }
});

test('every SKU is reachable through specification chips; cascades preserve preceding choices', async () => {
  let changes = 0;
  for (const type of STANDALONE_FITTING_TYPES) {
    const config = loadSelection(type);
    for (const target of config.options) {
      let current = config.options[0];
      for (const [index, dimension] of config.dimensions.entries()) {
        const value = target.attributes[dimension.key];
        if (!value) continue;
        assert.ok(getStandaloneDimensionValues(config, current, dimension.key).includes(value), `${target.model}: ${dimension.key}`);
        current = pickStandaloneDimension(config, current, dimension.key, value);
        assert.ok(config.options.includes(current));
        for (const earlier of config.dimensions.slice(0, index + 1)) assert.equal(current.attributes[earlier.key], target.attributes[earlier.key]);
        changes++;
      }
      assert.equal(current.model, target.model, `Unreachable SKU: ${target.model}`);
      for (const dimension of config.dimensions) for (const value of getStandaloneDimensionValues(config, current, dimension.key)) {
        const next = pickStandaloneDimension(config, current, dimension.key, value);
        assert.equal(next.attributes[dimension.key], value);
        assert.ok(config.options.includes(next));
      }
      assert.equal(pickStandaloneDimension(config, current, 'not-a-dimension', 'invalid'), current);
      assert.equal(pickStandaloneDimension(config, current, config.dimensions[0].key, 'invalid'), current);
    }
  }
  assert.ok(changes > 1000);
});

test('reducer ports and separately published barb profiles remain distinct', async () => {
  const config = loadSelection('barbed-fittings');
  const reducer = config.options.find(option => option.model === 'BA-16F-24F-PP-N');
  assert.equal(reducer.attributes.tube1, '1.6 mm');
  assert.equal(reducer.attributes.tube2, '2.4 mm');
  assert.equal(reducer.attributes.tube3, '');
  for (const model of ['BA-16F-PP-N', 'BA-16C-PP-N', 'BA-24F-PP-N', 'BA-24D-PP-N']) {
    const option = config.options.find(row => row.model === model);
    assert.ok(option.attributes.profile.includes(model.split('-')[1].slice(-1)));
  }
});

test('hard-tube plug selection contains the eight exact plug SKUs and only plug dimensions', () => {
  const config = loadSelection('hard-tube-plugs');
  const expected = {
    '809184':'HBL6-U28-PS-B', '809189':'HBL6-M6-PS-B',
    '809178':'HBL-U28-PV-N', '809390':'HBL-U28-PV-B',
    '809180':'HBL-M6-PV-N', '809400':'HBL-M6-PV-B',
    '809526':'HBL6X-M6-PV-N', '809527':'HBL6X-U28-PV-N',
  };
  assert.deepEqual(Object.fromEntries(config.options.map(option => [option.productCode, option.model])), expected);
  assert.deepEqual(config.dimensions.map(field => field.key), ['family', 'thread', 'material', 'color']);
  assert.equal(isStandaloneFittingType('hard-tube-fittings'), false);
  for (const option of config.options) {
    const published = FITTING_PUBLISHED_PRODUCTS.find(row => row.productCode === option.productCode);
    assert.equal(option.imagePath, published.imageCard);
    assert.equal(option.detailHref, published.detailHref);
    assert.equal(option.attributes.material, option.model.includes('-PS-') ? 'PPS' : 'PVDF');
    assert.equal(option.attributes.thread, option.model.includes('-M6-') ? 'M6×1' : '1/4-28 UNF');
    assert.equal(option.attributes.color, option.model.endsWith('-B') ? '黑色' : '本色');
  }
});

test('every plug is reachable from every starting plug through the displayed specification cascade', () => {
  const {fittingText} = require('../../data/products/detail/fitting-ui.intl.ts');
  const config = loadSelection('hard-tube-plugs');
  for (const start of config.options) for (const target of config.options) {
    let current = start;
    for (const [index, field] of config.dimensions.entries()) {
      const value = target.attributes[field.key];
      assert.ok(getStandaloneDimensionValues(config, current, field.key).includes(value));
      current = pickStandaloneDimension(config, current, field.key, value);
      for (const earlier of config.dimensions.slice(0, index + 1)) assert.equal(current.attributes[earlier.key], target.attributes[earlier.key]);
    }
    assert.equal(current.model, target.model, start.model + ' to ' + target.model);
  }
  for (const locale of ['en','es','fr','ko','ru']) {
    assert.doesNotMatch(fittingText(config.name + '选型', locale), /[\u3400-\u9fff]/);
    for (const field of config.dimensions) {
      assert.doesNotMatch(fittingText(field.label, locale), /[\u3400-\u9fff]/);
      for (const option of config.options) assert.doesNotMatch(fittingText(option.attributes[field.key], locale), /[\u3400-\u9fff]/);
    }
  }
});
