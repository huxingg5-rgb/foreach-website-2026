const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const {createHash} = require('node:crypto');
require('tsx/cjs');
const {FITTING_PUBLISHED_PRODUCTS} = require('../../data/products/selection/fitting-publication.generated.ts');
const {getLuerCadAssets} = require('../../data/products/detail/luer-cad-assets.ts');
const {getLuerPairConfig} = require('../../data/products/configurator/luer-pairing.ts');
const {luerCadManifest: manifest, resolveLuerCadModels, luerPlacement, luerMeshColor, LUER_COLORS} = require('./solenoid-viewer/luer-assembly.js');
const {decodeCompactCad} = require('./solenoid-viewer/compact-cad.js');
const pilot = require('../../data/products/detail/luer-pilot-cad-manifest.json');
const root = path.resolve(__dirname, '../..');
const file = url => path.join(root, 'public', url);
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const decoded = new Map();
const decode = id => {
  if (!decoded.has(id)) decoded.set(id, decodeCompactCad(zlib.gunzipSync(fs.readFileSync(file(manifest.geometries[id].url)))));
  return decoded.get(id);
};

test('all 137 published Luer models have exact SKU PDFs and valid original CAD', () => {
  const rows = FITTING_PUBLISHED_PRODUCTS.filter(p => p.productTypeId === 'luer-fittings');
  assert.equal(rows.length, 137);
  assert.equal(Object.keys(manifest.products).length, rows.length);
  assert.equal(new Set(Object.values(manifest.products).map(p => p.family)).size, 11);
  for (const row of rows) {
    const product = manifest.products[row.foreachModel], asset = getLuerCadAssets(row.foreachModel.toLowerCase());
    assert.equal(asset.model, row.foreachModel);
    assert.equal(asset.productCode, row.productCode);
    assert.ok(asset.drawingPdfUrl.endsWith(`/${row.foreachModel.toLowerCase()}.pdf`));
    const pdf = fs.readFileSync(file(asset.drawingPdfUrl));
    assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
    assert.equal(hash(pdf), product.drawingSha256);
    assert.match(product.itemNumber, /^443-02-\d{5}$/);
    assert.ok(product.drawingSourceFile.includes(product.itemNumber));
    assert.equal(decode(product.geometryId).success, true);
    assert.equal(resolveLuerCadModels([row.foreachModel])?.[0].model, row.foreachModel);
    assert.ok(luerPlacement(product, {single: true}).rotation.every(Number.isFinite));
  }
  assert.equal(getLuerCadAssets('lps-99-pp-o'), undefined);
  assert.equal(resolveLuerCadModels(['not-a-model']), null);
});

test('all prepared geometry retains its vertices, topology and checked drawing lengths', () => {
  for (const [id, g] of Object.entries(manifest.geometries)) {
    const bytes = fs.readFileSync(file(g.url)), data = decode(id);
    assert.equal(hash(bytes), g.sha256);
    assert.equal(data.meshes.length, g.meshes);
    const actualHash = hash(JSON.stringify(data.meshes.map(m => ({positions: m.attributes.position.array, normals: m.attributes.normal?.array, indices: m.index.array}))));
    assert.equal(actualHash, g.geometrySha256);
    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    for (const mesh of data.meshes) {
      const vertices = mesh.attributes.position.array;
      assert.equal(mesh.index.array.length % 3, 0);
      assert.ok(mesh.index.array.every(n => Number.isInteger(n) && n >= 0 && n < vertices.length / 3));
      vertices.forEach((v, i) => {assert.ok(Number.isFinite(v)); min[i % 3] = Math.min(min[i % 3], v); max[i % 3] = Math.max(max[i % 3], v);});
    }
    assert.deepEqual(min, g.min); assert.deepEqual(max, g.max);
  }
  const lengths = {LPS: [20, 22.3, 25], LPR: [20, 22.3, 25], LP: [14.85, 17.15, 19.85],
    LSL: [20, 22.3, 25], LRL: [20, 22.3, 25], LS: [13.9, 16.2, 18.9], PMLS: [20.9, 23.2, 25.9]};
  for (const p of Object.values(manifest.products)) {
    const g = manifest.geometries[p.geometryId];
    if (lengths[p.family]) {
      const expected = lengths[p.family][['1.6', '2.4', '3.2'].indexOf(p.tube)];
      const axis = ['LS', 'PMLS'].includes(p.family) ? 2 : 1;
      assert.ok(Math.abs(g.max[axis] - g.min[axis] - expected) < 1e-6, p.model);
    }
    if (['LPS', 'LPR'].includes(p.family)) {
      assert.equal(g.meshes, 2, `Incomplete male assembly: ${p.model}`);
      assert.ok(g.meshNames.includes('443-02-00171'));
      assert.equal(luerMeshColor(p, '443-02-00171'), LUER_COLORS[p.colorCode]);
      assert.equal(luerMeshColor(p, 'core'), LUER_COLORS[p.material === 'PA' ? 'W' : 'N']);
    } else assert.ok(g.meshNames.every(name => luerMeshColor(p, name) === LUER_COLORS[p.colorCode]));
  }
  for (const model of ['LPBL-PP-N', 'LPBL-PA-W']) {
    const g = manifest.geometries[manifest.products[model].geometryId];
    assert.ok(Math.abs(g.max[1] - g.min[1] - 14.65) < 1e-6);
  }
});

test('pilot assets and reviewed assembly compatibility remain intact', () => {
  const identity = {model: pilot.pilot, productTypeId: 'luer-fittings'};
  for (const locale of ['en','es','fr','ko','ru']) assert.deepEqual(getLuerPairConfig(identity, locale)?.defaultChoice, getLuerPairConfig(identity, 'zh')?.defaultChoice);
  const config = getLuerPairConfig(identity, 'zh');
  for (const part of [config.base, ...config.mates, ...config.rings, ...config.nuts]) {
    assert.equal(part.drawingHref, manifest.products[part.model].drawingUrl);
  }
  for (const [id, g] of Object.entries(pilot.geometries)) assert.deepEqual(manifest.geometries[id], g);
  for (const [model, p] of Object.entries(pilot.products)) {
    for (const field of ['geometryId', 'drawingUrl', 'drawingSha256', 'sourceSha256']) assert.equal(manifest.products[model][field], p[field]);
  }
  const models = ['LPS-16-PP-O', 'PMLS-U28-16D-PP-N', 'LCR-PA-O', 'LNS-U28-PP-N'];
  assert.equal(resolveLuerCadModels(models)?.length, 4);
  assert.equal(resolveLuerCadModels(['LPS-16-PP-R', ...models.slice(1)])?.length, 4);
  assert.equal(resolveLuerCadModels(['LPS-16-PP-O', 'LS-16D-PP-N', 'LCR-PA-O']), null);
  assert.equal(resolveLuerCadModels(['LPS-16-PP-O', 'LPS-16-PP-O']), null);
  const positions = models.map(model => luerPlacement(manifest.products[model], {hasRing: true, panelThickness: 2}).position);
  assert.deepEqual(positions[0], [0, 0, 0]);
  [-2.8666666667, 11.8333333333, 15.0833333333].forEach((x, i) => assert.ok(Math.abs(positions[i + 1][0] - x) < 1e-8));
});
