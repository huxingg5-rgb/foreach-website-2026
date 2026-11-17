/* eslint-disable @typescript-eslint/no-require-imports -- Run the production TypeScript adapters and CommonJS CAD pipeline in Node. */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), zlib = require('node:zlib'), crypto = require('node:crypto');
require('tsx/cjs');
const { getAbdCadAssets, getAbdDrawing, getAbdCadCopy } = require('../../data/products/detail/abd-cad-assets.ts');
const { abdOrderModels } = require('../../data/products/configurator/instrument-inquiry.ts');
const manifest = require('../../data/products/detail/abd-cad-manifest.json');
const root = path.resolve(__dirname, '../..');
const read = url => fs.readFileSync(path.join(root, 'public', url));
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');

test('ABD preview maps each supplied STEP to its exact order model; missing models never fall back', () => {
  const expected = ['16', '20', '25', '32', '48', '60', '64'];
  assert.deepEqual(manifest.models.map(m => m.tubeOdCode), expected);
  for (const code of expected) {
    const cad = getAbdCadAssets(code);
    assert(abdOrderModels.some(([value]) => value === code));
    assert.equal(cad.model, `ABD-06M-V${code}`);
    assert.equal(cad.sourceFile, `${cad.model}.stp`);
    assert.equal(sha(read(cad.model3dUrl)), cad.assetSha256);
    assert.equal(read(cad.model3dUrl).length, cad.bytes);
  }
  assert.equal(new Set(manifest.models.map(m => m.assetSha256)).size, 7);
  for (const code of ['40', 'unsure', '80', '', '../16']) assert.equal(getAbdCadAssets(code), undefined);
});

test('ABD original PDFs remain restricted to their title-block models and retain exact bytes', () => {
  assert.deepEqual(manifest.drawings.map(d => d.tubeOdCode), ['16', '25']);
  assert.equal(getAbdDrawing('16').drawingNumber, 'M-515-00-04559');
  assert.equal(getAbdDrawing('25').drawingNumber, 'M-515-00-04243');
  for (const d of manifest.drawings) {
    const bytes = read(d.drawingPdfUrl);
    assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
    assert.equal(sha(bytes), d.sha256);
  }
  for (const code of ['20', '32', '40', '48', '60', '64', 'unsure']) assert.equal(getAbdDrawing(code), undefined);
  // The historical V16 drawing code is not an order-code source.
  assert.equal(getAbdDrawing('16').drawingProductCode, '809903');
  assert.equal(abdOrderModels.find(([code]) => code === '16')[2], '449050');
});

test('all compact ABD meshes decode with valid triangles and dimensions from the actual vertices', async () => {
  const { decodeCompactCad } = await import('data:text/javascript;base64,' + fs.readFileSync(path.join(__dirname, 'solenoid-viewer/compact-cad.js')).toString('base64'));
  for (const entry of manifest.models) {
    const data = decodeCompactCad(new Uint8Array(zlib.gunzipSync(read(entry.model3dUrl))));
    assert.equal(data.name, entry.model);
    assert.equal(data.meshes.length, entry.meshCount);
    assert.equal(data.meshes.reduce((n, m) => n + m.index.array.length / 3, 0), entry.triangles);
    assert.equal(data.assembledOnly, true);
    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    for (const mesh of data.meshes) {
      const positions = mesh.attributes.position.array;
      assert(mesh.index.array.every(i => Number.isInteger(i) && i >= 0 && i < positions.length / 3));
      positions.forEach((v, i) => { assert(Number.isFinite(v)); min[i % 3] = Math.min(min[i % 3], v); max[i % 3] = Math.max(max[i % 3], v); });
    }
    assert.deepEqual(data.dimensions.min, min);
    assert.deepEqual(data.dimensions.max, max);
    assert.deepEqual(data.dimensions.size, [29.4, 35.4, 19.6]);
    assert.equal(data.meshes[2].finish, 'connector');
    assert(data.meshes.slice(3, 9).every(m => m.finish === 'metal'));
  }
});

test('ABD resource controls have six-language copy without Chinese fallback abroad', () => {
  for (const locale of ['en', 'es', 'fr', 'ko', 'ru']) {
    for (const value of Object.values(getAbdCadCopy(locale))) assert.doesNotMatch(value, /[\u3400-\u9fff]/u);
  }
  assert.match(getAbdCadCopy('zh').model, /型号/);
});
