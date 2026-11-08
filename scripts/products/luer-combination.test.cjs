const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), zlib = require('node:zlib');
require('tsx/cjs');
const {getLuerPairConfig, getLuerPlugChoice, resolveLuerPair} = require('../../data/products/configurator/luer-pairing.ts');
const {getLuerRole} = require('../../data/products/configurator/luer-combination.ts');
const {resolveLuerCadModels, luerPlacement, luerFemaleOffset, luerCadManifest: manifest} = require('./solenoid-viewer/luer-assembly.js');
const {decodeCompactCad} = require('./solenoid-viewer/compact-cad.js');
const THREE = require('./solenoid-viewer/node_modules/three');
const root = path.resolve(__dirname, '../..'), models = Object.keys(manifest.products);
const configFor = model => getLuerPairConfig({model, productTypeId: 'luer-fittings'}, 'zh');
const cache = new Map();
const data = product => {
  const id = product.geometryId;
  if (!cache.has(id)) cache.set(id, decodeCompactCad(zlib.gunzipSync(fs.readFileSync(path.join(root, 'public', manifest.geometries[id].url)))));
  return cache.get(id);
};

test('every published Luer SKU has a valid default selection, exact images and individual purchase', () => {
  assert.equal(models.length, 137);
  for (const model of models) {
    const config = configFor(model); assert.ok(config, model);
    const parts = resolveLuerPair(config, config.defaultChoice);
    assert.ok(parts.length >= (config.unifiedSelection ? 1 : 2) && parts.length <= 5, model);
    assert.equal(parts[0].model, model, 'The current SKU must remain the cart primary');
    assert.equal(new Set(parts.map(p => p.model)).size, parts.length);
    assert.ok(resolveLuerCadModels(parts.map(p => p.model)), model);
    assert.deepEqual(resolveLuerPair(config, {mode: 'single'}).map(p => p.model), [model]);
    for (const part of parts) {
      assert.ok(fs.existsSync(path.join(root, 'public', part.imagePath)), part.model);
      // Drawings are optional in a release that excludes new 2D files.
      if (part.drawingHref) assert.ok(fs.existsSync(path.join(root, 'public', part.drawingHref)), part.model);
    }
    for (const locale of ['en','es','fr','ko','ru']) assert.deepEqual(getLuerPairConfig({model, productTypeId: 'luer-fittings'}, locale)?.defaultChoice, config.defaultChoice);
  }
  assert.deepEqual(resolveLuerPair(configFor('LPS-16-PP-O'), configFor('LPS-16-PP-O').defaultChoice).map(p => p.model),
    ['LPS-16-PP-O', 'PMLS-U28-16D-PP-N', 'LCR-PA-O', 'LNS-U28-PP-N']);
  assert.equal(configFor('LPS-99-PP-O'), undefined);
});

test('both ends select independently, while cores, mounts and the current SKU keep their required roles', () => {
  let checked = 0;
  for (const model of models) {
    const config = configFor(model);
    for (const male of config.males) for (const female of config.females) {
      const choice = {...config.defaultPairChoice, maleModel: male.model, femaleModel: female.model,
        collarModel: getLuerRole(male.family) === 'core' ? config.defaultPairChoice.collarModel : null,
        ringModel: female.family === 'PMLS' ? config.defaultPairChoice.ringModel : null,
        nutModel: female.family === 'PMLS' ? config.defaultPairChoice.nutModel : null};
      const parts = resolveLuerPair(config, choice);
      assert.ok(parts, model + ' / ' + male.model + ' / ' + female.model);
      assert.ok(resolveLuerCadModels(parts.map(p => p.model)));
      checked++;
    }
    const bad = {...config.defaultPairChoice, maleModel: 'LPS-99-PP-N'};
    assert.equal(resolveLuerPair(config, bad), null);
  }
  assert.ok(checked > 2000);
  const pilot = configFor('LPS-16-PP-O');
  assert.equal(resolveLuerPair(pilot, {...pilot.defaultChoice, maleModel: 'LPS-16-PP-R'}), null);
  assert.equal(resolveLuerPair(pilot, {...pilot.defaultChoice, femaleModel: 'LS-32D-PP-N'}), null, 'Inline LS cannot carry panel accessories');
  assert.equal(resolveLuerCadModels(['LSL-16-PP-N', 'LS-16D-PP-N']), null, 'Core needs its collar');
  assert.equal(resolveLuerCadModels(['LPS-16-PP-O', 'LPT-PP-N', 'LS-16D-PP-N']), null, 'Complete male must not add a second collar');
  assert.equal(resolveLuerCadModels(['LPBL-PP-N', 'LPT-PP-N', 'LS-16D-PP-N']), null);
  assert.ok(resolveLuerCadModels(['LPT-PP-N', 'LSL-16-PP-N', 'PMLS-U28-32D-PA-W', 'LCR-PA-G', 'LNS-U28-PA-R']));
});

test('LSL-16-PP-N starts with a single core and supports collar, panel and inline combinations', () => {
  const config = configFor('LSL-16-PP-N');
  assert.equal(config.allowCoreAssembly, true);
  assert.equal(config.unifiedSelection, true);
  assert.equal(config.defaultChoice.mode, 'single');
  assert.deepEqual(resolveLuerPair(config, config.defaultChoice).map(p => p.model), ['LSL-16-PP-N']);
  assert.equal(resolveLuerPair(config, {...config.defaultPairChoice, collarModel: null}), null, 'The core cannot form a complete pair without a collar');
  assert.equal(resolveLuerPair(config, {...config.defaultPairChoice, maleModel: 'LPS-16-PP-N'}), null, 'The fixed entry must not become a duplicate complete male');
  // A core/collar combination contains exactly the two separately ordered parts.
  for (const collar of config.collars) {
    const parts = resolveLuerPair(config, {mode: 'core', collarModel: collar.model});
    assert.deepEqual(parts.map(p => p.model), ['LSL-16-PP-N', collar.model]);
    assert.ok(resolveLuerCadModels(parts.map(p => p.model)), collar.model);
  }
  assert.equal(resolveLuerPair(config, {mode: 'core', collarModel: null}), null);
  assert.equal(resolveLuerPair(config, {mode: 'core', collarModel: 'LCR-PP-N'}), null);
  assert.deepEqual(resolveLuerPair(config, config.defaultPairChoice).map(p => p.model),
    ['LSL-16-PP-N', 'LPT-PP-N', 'PMLS-U28-16D-PP-N', 'LCR-PP-N', 'LNS-U28-PP-N']);
  assert.deepEqual(resolveLuerPair(config, {...config.defaultPairChoice,
    femaleModel: 'LS-16D-PP-N', ringModel: null, nutModel: null}).map(p => p.model),
    ['LSL-16-PP-N', 'LPT-PP-N', 'LS-16D-PP-N']);
  assert.equal(resolveLuerCadModels(['LSL-16-PP-N', 'LPT-PP-N', 'LCR-PP-N']), null, 'A ring still requires a panel female');
  assert.equal(resolveLuerCadModels(['LSL-16-PP-N', 'LNS-U28-PP-N']), null, 'A nut cannot replace the collar');
  for (const model of models.filter(model => !/^(LSL|LRL|LPT|LCR|LNS)-/.test(model))) {
    const other = configFor(model);
    assert.equal(other.allowCoreAssembly, false, model);
    assert.equal(other.unifiedSelection, false, model);
    assert.equal(other.defaultChoice.mode, 'pair', model);
    assert.equal(resolveLuerPair(other, {mode: 'core', collarModel: 'LPT-PP-N'}), null, model);
  }
});

test('all 12 fixed and rotating cores support a two-part collar purchase with the current core retained', () => {
  const cores = models.filter(model => /^(LSL|LRL)-/.test(model));
  assert.equal(cores.length, 12);
  for (const model of cores) {
    const config = configFor(model);
    assert.equal(config.allowCoreAssembly, true, model);
    assert.ok(config.combinationTypes.includes('core'));
    assert.equal(config.unifiedSelection, model === 'LSL-16-PP-N');
    assert.equal(config.defaultChoice.mode, model === 'LSL-16-PP-N' ? 'single' : 'pair');
    for (const collar of config.collars) {
      const choice = {...config.defaultPairChoice, mode: 'core', collarModel: collar.model};
      const parts = resolveLuerPair(config, choice);
      assert.deepEqual(parts.map(p => p.model), [model, collar.model]);
      assert.ok(resolveLuerCadModels(parts.map(p => p.model)));
      assert.equal(parts.some(p => ['LS', 'PMLS', 'LCR', 'LNS'].includes(p.family)), false);
    }
    assert.equal(resolveLuerPair(config, {mode: 'core', collarModel: null}), null);
    assert.equal(resolveLuerPair(config, {mode: 'core', collarModel: 'LCR-PP-N'}), null);
    assert.equal(resolveLuerPair(config, {mode: 'core', maleModel: 'LPS-16-PP-N', collarModel: 'LPT-PP-N'}), null);
  }
});

test('all collar, ring and nut entries share role-valid choices and retain the exact entry SKU', () => {
  const accessories = models.filter(model => /^(LPT|LCR|LNS)-/.test(model));
  assert.equal(accessories.length, 24);
  for (const model of accessories) {
    const config = configFor(model), isCollar = config.baseRole === 'collar';
    assert.equal(config.unifiedSelection, true, model);
    assert.equal(config.defaultChoice.mode, 'single', model);
    assert.deepEqual(config.combinationTypes, isCollar ? ['single', 'core', 'panel', 'inline'] : ['single', 'panel', 'plug']);
    const fixedKey = {collar: 'collarModel', ring: 'ringModel', nut: 'nutModel'}[config.baseRole];
    assert.equal(config.defaultPairChoice[fixedKey], model);
    assert.equal(resolveLuerPair(config, {...config.defaultPairChoice, [fixedKey]: null}), null, model);
    assert.equal(resolveLuerPair(config, {...config.defaultPairChoice,
      [fixedKey]: config[{collar: 'collars', ring: 'rings', nut: 'nuts'}[config.baseRole]].find(p => p.model !== model).model}), null, model);
    if (isCollar) {
      assert(config.males.every(p => getLuerRole(p.family) === 'core'));
      for (const core of config.males) {
        const choice = {mode: 'core', maleModel: core.model, collarModel: model};
        const parts = resolveLuerPair(config, choice);
        assert.deepEqual(parts.map(p => p.model), [model, core.model]);
        assert.ok(resolveLuerCadModels(parts.map(p => p.model)));
      }
      assert.equal(resolveLuerPair(config, {mode: 'core', maleModel: null, collarModel: model}), null);
      assert.equal(resolveLuerPair(config, {mode: 'core', maleModel: 'LPS-16-PP-O', collarModel: model}), null);
    } else {
      assert(config.females.every(p => p.family === 'PMLS'));
      assert.equal(resolveLuerPair(config, {mode: 'core', maleModel: 'LSL-16-PP-N', collarModel: 'LPT-PP-N'}), null);
      assert.equal(resolveLuerPair(config, {...config.defaultPairChoice, femaleModel: 'LS-16D-PP-N', ringModel: null, nutModel: null}), null);
    }
    const parts = resolveLuerPair(config, config.defaultPairChoice);
    assert.equal(parts[0].model, model);
    assert.equal(parts.filter(p => p.model === model).length, 1);
    assert.equal(new Set(parts.map(p => p.model)).size, parts.length);
  }
});

test('A02 p58 plugs seal either female family and retain panel accessories without a flowing male or collar', () => {
  const plugs = {'LPBL-PP-N': '809286', 'LPBL-PA-W': '809409'};
  const entries = models.filter(model => /^(LS|PMLS|LCR|LNS|LPBL)-/.test(model));
  assert.ok(entries.length > 20);
  for (const model of models) {
    const config = configFor(model), choice = getLuerPlugChoice(config);
    if (!entries.includes(model)) {
      assert.equal(choice, null, model + ' cannot replace the fixed male/core/collar with a plug');
      assert.ok(!config.combinationTypes.includes('plug'));
      continue;
    }
    assert.ok(choice, model);
    assert.ok(config.combinationTypes.includes('plug'));
    const expectedPlug = config.baseRole === 'plug' ? model : config.base.material === 'PA' ? 'LPBL-PA-W' : 'LPBL-PP-N';
    assert.equal(choice.maleModel, expectedPlug);
    for (const plug of config.males.filter(p => p.family === 'LPBL')) {
      assert.equal(plug.productCode, plugs[plug.model]);
      assert.equal(plug.tube, '', 'A plug has no hose barb size');
      for (const female of config.females) {
        const parts = resolveLuerPair(config, {...choice, maleModel: plug.model, femaleModel: female.model,
          ringModel: female.family === 'PMLS' ? choice.ringModel : null,
          nutModel: female.family === 'PMLS' ? choice.nutModel : null});
        assert.ok(parts, model + ' / ' + plug.model + ' / ' + female.model);
        assert.equal(parts[0].model, model, 'The current SKU stays primary in the cart');
        assert.equal(parts.filter(p => p.family === 'LPBL').length, 1);
        assert.equal(parts.filter(p => ['LPS', 'LPR', 'LP', 'LSL', 'LRL', 'LPT'].includes(p.family)).length, 0);
        assert.ok(resolveLuerCadModels(parts.map(p => p.model)));
      }
    }
    assert.ok(resolveLuerPair(config, choice));
  }
});

function radii(mesh, axis, at) {
  const a = mesh.attributes.position.array, index = mesh.index.array, radial = [0, 1, 2].filter(n => n !== axis), result = [];
  for (let i = 0; i < index.length; i += 3) for (let j = 0; j < 3; j++) {
    const u = index[i + j] * 3, v = index[i + (j + 1) % 3] * 3;
    const t = (at - a[u + axis]) / (a[v + axis] - a[u + axis]);
    if (!Number.isFinite(t) || t < 0 || t > 1) continue;
    const r = Math.hypot(...radial.map(k => a[u + k] + t * (a[v + k] - a[u + k])));
    if (r > 1.8 && r < 2.3) result.push(r);
  }
  return result;
}
test('all male types meet the female cone using the original geometry and rigid placements', () => {
  const female = data(manifest.products['LS-16D-PP-N']).meshes[0], checked = new Set();
  for (const product of Object.values(manifest.products)) {
    if (!['male', 'core', 'plug'].includes(getLuerRole(product.family)) || checked.has(product.geometryId)) continue;
    checked.add(product.geometryId);
    const male = data(product).meshes.find(m => m.name !== '443-02-00171'), pose = luerPlacement(product);
    for (const x of [4, 6, 8]) {
      const left = radii(male, 1, x - pose.position[0]), right = radii(female, 2, x - luerFemaleOffset(product.family));
      assert.ok(left.length && right.length, product.model);
      assert.ok(Math.abs(Math.max(...left) - Math.max(...right)) < .015, product.model + ' cone at ' + x);
    }
  }
});

test('separate collars occupy the original LPS and LPR assembly locations', () => {
  const collar = manifest.products['LPT-PP-N'];
  for (const family of ['LSL', 'LRL']) for (const size of ['16', '24', '32']) {
    const core = manifest.products[`${family}-${size}-PP-N`], assembled = manifest.products[`${family === 'LSL' ? 'LPS' : 'LPR'}-${size}-PP-N`];
    const pose = luerPlacement(collar, {coreFamily: family, coreTube: core.tube});
    const matrix = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(...pose.rotation, pose.order));
    matrix.setPosition(...pose.position);
    const actual = new THREE.Box3();
    const vertices = data(collar).meshes[0].attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) actual.expandByPoint(new THREE.Vector3(...vertices.slice(i, i + 3)).applyMatrix4(matrix));
    const expected = new THREE.Box3();
    const assemblyMatrix = new THREE.Matrix4().makeRotationZ(-Math.PI / 2);
    const reference = data(assembled).meshes.find(m => m.name === '443-02-00171').attributes.position.array;
    for (let i = 0; i < reference.length; i += 3) expected.expandByPoint(new THREE.Vector3(...reference.slice(i, i + 3)).applyMatrix4(assemblyMatrix));
    for (const axis of ['x', 'y', 'z']) {
      assert.ok(Math.abs(actual.min[axis] - expected.min[axis]) < .02, `${family}-${size} collar min ${axis}`);
      assert.ok(Math.abs(actual.max[axis] - expected.max[axis]) < .02, `${family}-${size} collar max ${axis}`);
    }
  }
});
