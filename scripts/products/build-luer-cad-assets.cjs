// Import the published Luer catalog from original STEP/PDF files. Source files
// and existing pilot assets are read-only; matching geometry is reused losslessly.
// Usage: node scripts/products/build-luer-cad-assets.cjs <05-鲁尔 folder> [verified-cache-folder]
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const root = path.resolve(__dirname, '../..');
const req = require('node:module').createRequire(path.join(root, 'package.json'));
req('tsx/cjs');
const {FITTING_PUBLISHED_PRODUCTS} = req('./data/products/selection/fitting-publication.generated.ts');
const assets = req('./data/products/selection/luer-fitting-asset-map.generated.json');
const pilot = req('./data/products/detail/luer-pilot-cad-manifest.json');
const {packCompactCad} = require('./compact-cad/pack.cjs');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const geometryBytes = data => JSON.stringify(data.meshes.map(mesh => ({
  positions: mesh.attributes.position.array, normals: mesh.attributes.normal?.array, indices: mesh.index.array,
})));
const names = {LPS: '固定锁圈公鲁尔', LPR: '旋转锁圈公鲁尔', LP: '一体式公鲁尔',
  LSL: '固定式公鲁尔芯子', LRL: '旋转式公鲁尔芯子', LS: '普通母鲁尔', PMLS: '穿板母鲁尔',
  LCR: '识别色环', LPT: '鲁尔锁圈', LNS: '固定螺母', LPBL: '公鲁尔堵头'};
const colors = {N: '本色', W: '白色', B: '黑色', R: '红色', G: '绿色', U: '蓝色', O: '橙色', Y: '黄色'};
const assemblyFolders = {LPS: '两件套公鲁尔接头/LPS固定锁圈公鲁尔接头',
  LPR: '两件套公鲁尔接头/LPR旋转锁圈公鲁尔接头', LP: '一体公鲁尔接头'};
// Both plug drawings were checked: same 14.65 mm geometry, different material.
const plugItems = {'LPBL-PP-N': '443-02-00314', 'LPBL-PA-W': '443-02-00355'};
const walk = dir => fs.readdirSync(dir, {withFileTypes: true}).flatMap(entry => entry.isDirectory()
  ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
function writeUnchangedOrNew(file, bytes) {
  if (fs.existsSync(file)) assert.equal(sha(fs.readFileSync(file)), sha(bytes), `Refusing to overwrite an existing asset: ${file}`);
  else fs.writeFileSync(file, bytes);
}

async function main() {
  const [source, cache] = process.argv.slice(2);
  if (!source) throw Error('Provide the original 05-鲁尔 source folder.');
  const files = walk(source);
  const occt = await req('./public/vendor/occt/occt-import-js.js')();
  const {decodeCompactCad} = await import(pathToFileURL(path.join(__dirname, 'solenoid-viewer/compact-cad.js')));
  const publicBase = '/models/products/fittings/luer-fittings/cad';
  const output = path.join(root, 'public', publicBase);
  fs.mkdirSync(path.join(output, 'drawings'), {recursive: true});
  const geometries = {}, products = {}, byHash = new Map(), imports = new Map();
  for (const [id, entry] of Object.entries(pilot.geometries)) {
    const bytes = fs.readFileSync(path.join(root, 'public', entry.url));
    assert.equal(sha(bytes), entry.sha256);
    assert.equal(sha(geometryBytes(decodeCompactCad(zlib.gunzipSync(bytes)))), entry.geometrySha256);
    geometries[id] = entry; byHash.set(entry.geometrySha256, id);
  }
  const rows = FITTING_PUBLISHED_PRODUCTS.filter(row => row.productTypeId === 'luer-fittings');
  for (const row of rows) {
    const model = row.foreachModel, fields = model.split('-'), family = fields[0];
    const item = plugItems[model] || assets[row.productCode]?.itemNumber;
    assert.ok(item && names[family], `Unreviewed product ${model}`);
    const familyFolder = assemblyFolders[family];
    const exactFiles = files.filter(file => path.basename(file).startsWith(item));
    const stepFile = familyFolder ? path.join(source, familyFolder, `${family}-${parseInt(fields[1], 10)}.stp`)
      : family === 'LPBL' ? path.join(source, '443-02-00314-C堵头.stp')
      : exactFiles.find(file => path.basename(file) === `${item}-C.stp`)
        || exactFiles.find(file => path.basename(file) === `${item}_001_cn.stp`);
    const pdfs = exactFiles.filter(file => path.basename(file) === `${item}-C.pdf`);
    const drawingFile = pdfs.find(file => familyFolder && file.includes(path.normalize(familyFolder)))
      || pdfs.find(file => path.dirname(file) === source) || (pdfs.length === 1 ? pdfs[0] : undefined);
    assert.ok(stepFile && drawingFile, `Missing exact sources: ${model}`);
    const step = fs.readFileSync(stepFile), pdf = fs.readFileSync(drawingFile), sourceHash = sha(step);
    assert.ok(step.subarray(0, 128).includes(Buffer.from('ISO-10303-21')) && pdf.subarray(0, 5).toString() === '%PDF-', model);
    let imported = imports.get(sourceHash);
    if (!imported) {
      // Optional cache only accelerates a previously reviewed import. It is keyed
      // by original STEP bytes, and round-trip integrity is checked below.
      const cached = cache && path.join(cache, `${sourceHash}.json`);
      imported = cached && fs.existsSync(cached) ? JSON.parse(fs.readFileSync(cached, 'utf8'))
        : occt.ReadStepFile(step, {linearUnit: 'millimeter', linearDeflectionType: 'absolute_value', linearDeflection: .01, angularDeflection: .15});
      assert.ok(imported.success && imported.meshes?.length, `STEP failed: ${model}`);
      imports.set(sourceHash, imported);
    }
    if (['LPS', 'LPR'].includes(family)) assert.ok(imported.meshes.length === 2 && imported.meshes.some(m => m.name === '443-02-00171'), `Incomplete assembly: ${model}`);
    const geometryHash = sha(geometryBytes(imported));
    let geometryId = byHash.get(geometryHash);
    if (!geometryId) {
      geometryId = `${family.toLowerCase()}-${geometryHash.slice(0, 12)}`;
      const packed = packCompactCad(imported);
      assert.deepEqual(decodeCompactCad(zlib.gunzipSync(packed.gzip)), imported);
      writeUnchangedOrNew(path.join(output, `${geometryId}.fcad.gz`), packed.gzip);
      const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
      for (const mesh of imported.meshes) mesh.attributes.position.array.forEach((v, i) => {
        min[i % 3] = Math.min(min[i % 3], v); max[i % 3] = Math.max(max[i % 3], v);
      });
      geometries[geometryId] = {url: `${publicBase}/${geometryId}.fcad.gz`, sha256: sha(packed.gzip),
        geometrySha256: geometryHash, min, max, meshNames: imported.meshes.map(m => m.name), ...packed.stats};
      byHash.set(geometryHash, geometryId);
    }
    const slug = model.toLowerCase();
    writeUnchangedOrNew(path.join(output, 'drawings', `${slug}.pdf`), pdf);
    products[model] = {model, family, productCode: row.productCode, name: names[family],
      tube: ['LPS', 'LPR', 'LP', 'LSL', 'LRL', 'LS', 'PMLS'].includes(family) ? (parseInt(fields.at(-3), 10) / 10).toFixed(1) : '',
      material: fields.at(-2), color: colors[fields.at(-1)], colorCode: fields.at(-1), geometryId,
      singleRotation: ['LS', 'PMLS'].includes(family) ? [0, Math.PI / 2, 0] : family === 'LCR' ? [0, Math.PI, 0] : [0, 0, -Math.PI / 2],
      sourceFile: path.relative(source, stepFile).replaceAll('\\', '/'), sourceSha256: sourceHash, itemNumber: item,
      drawingSourceFile: path.relative(source, drawingFile).replaceAll('\\', '/'),
      drawingUrl: `${publicBase}/drawings/${slug}.pdf`, drawingSha256: sha(pdf)};
    assert.ok(products[model].color && products[model].material, `Missing appearance: ${model}`);
  }
  assert.equal(Object.keys(products).length, rows.length);
  const manifest = {version: 2, unit: 'mm', pilot: pilot.pilot,
    importSettings: pilot.importSettings, geometries, products};
  fs.writeFileSync(path.join(root, 'data/products/detail/luer-cad-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(JSON.stringify({products: rows.length, geometries: Object.keys(geometries).length,
    sourceSteps: imports.size, losslessRoundTrip: true, existingAssetsPreserved: true}));
}
main().catch(error => {console.error(error); process.exitCode = 1;});
