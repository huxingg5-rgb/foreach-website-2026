// Read-only STEP import for the Chinese LPS-16-PP-O pilot and its published mates.
// Usage: node scripts/products/build-luer-pilot-cad-assets.cjs <source-folder>
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const root = path.resolve(__dirname, '../..');
const req = require('node:module').createRequire(path.join(root, 'package.json'));
req('tsx/cjs');
const {getLuerPairConfig} = req('./data/products/configurator/luer-pairing.ts');
const assets = req('./data/products/selection/luer-fitting-asset-map.generated.json');
const {packCompactCad} = require('./compact-cad/pack.cjs');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const geometryBytes = data => JSON.stringify(data.meshes.map(mesh => ({
  positions: mesh.attributes.position.array, normals: mesh.attributes.normal?.array,
  indices: mesh.index.array,
})));

async function main() {
  const source = process.argv[2];
  if (!source) throw Error('Provide the read-only 05-鲁尔 source folder.');
  const config = getLuerPairConfig({model: 'LPS-16-PP-O', productTypeId: 'luer-fittings'}, 'zh');
  const occt = await req('./public/vendor/occt/occt-import-js.js')();
  const {decodeCompactCad} = await import(pathToFileURL(path.join(__dirname, 'solenoid-viewer/compact-cad.js')));
  const publicBase = '/models/products/fittings/luer-fittings/cad';
  const output = path.join(root, 'public', publicBase);
  fs.mkdirSync(path.join(output, 'drawings'), {recursive: true});
  const geometries = {}, products = {}, byHash = new Map();
  for (const part of [config.base, ...config.mates, ...config.rings, ...config.nuts]) {
    const item = assets[part.productCode].itemNumber;
    const baseFolder = part.family === 'LPS' ? '两件套公鲁尔接头/LPS固定锁圈公鲁尔接头/' : '';
    const stepFile = part.family === 'LPS' ? `${baseFolder}LPS-16.stp` : `${item}-C.stp`;
    const drawingFile = `${baseFolder}${item}-C.pdf`;
    const step = fs.readFileSync(path.join(source, stepFile));
    const pdf = fs.readFileSync(path.join(source, drawingFile));
    if (!step.subarray(0, 128).includes(Buffer.from('ISO-10303-21')) || pdf.subarray(0, 5).toString() !== '%PDF-') {
      throw Error(`Invalid source header: ${part.model}`);
    }
    const imported = occt.ReadStepFile(step, {linearUnit: 'millimeter', linearDeflectionType: 'absolute_value', linearDeflection: .01, angularDeflection: .15});
    if (!imported.success || !imported.meshes?.length) throw Error(`STEP import failed: ${part.model}`);
    const hash = sha(geometryBytes(imported));
    let geometryId = byHash.get(hash);
    if (!geometryId) {
      geometryId = `${part.family.toLowerCase()}${part.tube ? '-' + part.tube.replace('.', '') : ''}`;
      if (geometries[geometryId]) throw Error(`Geometry name collision: ${geometryId}`);
      if (part.family === 'LPS' && (imported.meshes.length !== 2 || !imported.meshes.some(m => m.name === '443-02-00171'))) {
        throw Error('LPS must contain the original core and locking collar.');
      }
      const packed = packCompactCad(imported);
      // No simplification or numeric quantization: every array and metadata field survives.
      assert.deepEqual(decodeCompactCad(zlib.gunzipSync(packed.gzip)), imported);
      fs.writeFileSync(path.join(output, `${geometryId}.fcad.gz`), packed.gzip);
      const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
      for (const mesh of imported.meshes) mesh.attributes.position.array.forEach((v, i) => {
        min[i % 3] = Math.min(min[i % 3], v); max[i % 3] = Math.max(max[i % 3], v);
      });
      geometries[geometryId] = {url: `${publicBase}/${geometryId}.fcad.gz`, sha256: sha(packed.gzip),
        geometrySha256: hash, min, max, meshNames: imported.meshes.map(m => m.name), ...packed.stats};
      byHash.set(hash, geometryId);
    }
    const slug = part.model.toLowerCase();
    fs.writeFileSync(path.join(output, 'drawings', `${slug}.pdf`), pdf);
    products[part.model] = {model: part.model, family: part.family, productCode: part.productCode,
      name: part.name, tube: part.tube, material: part.material, color: part.color,
      colorCode: part.model.split('-').at(-1), geometryId,
      sourceFile: stepFile, sourceSha256: sha(step), itemNumber: item,
      drawingUrl: `${publicBase}/drawings/${slug}.pdf`, drawingSha256: sha(pdf)};
    // Verify input bytes were not changed while importing.
    assert.equal(sha(fs.readFileSync(path.join(source, stepFile))), products[part.model].sourceSha256);
  }
  const manifest = {version: 1, unit: 'mm', pilot: config.base.model,
    importSettings: {linearDeflectionMm: .01, angularDeflection: .15}, geometries, products};
  fs.writeFileSync(path.join(root, 'data/products/detail/luer-pilot-cad-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(JSON.stringify({products: Object.keys(products).length, geometries: Object.keys(geometries).length,
    totalCadBytes: Object.values(geometries).reduce((sum, g) => sum + g.bytes, 0), losslessRoundTrip: true}));
}
main().catch(error => {console.error(error); process.exitCode = 1;});
