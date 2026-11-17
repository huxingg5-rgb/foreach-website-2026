/* eslint-disable @typescript-eslint/no-require-imports -- This CLI uses the repository's CommonJS OCCT/FCAD pipeline. */
// node scripts/products/build-abd-cad-assets.cjs SOURCE_DIRECTORY STAGING_DIRECTORY
// Import only the supplied external-release STEP files. Preserve every mesh/face.
const fs = require('node:fs'), path = require('node:path'), zlib = require('node:zlib');
const crypto = require('node:crypto'), assert = require('node:assert/strict');
const { packCompactCad } = require('./compact-cad/pack.cjs');
const root = path.resolve(__dirname, '../..');
const source = process.argv[2], staging = process.argv[3];
const codes = ['16', '20', '25', '32', '48', '60', '64'];
const tessellation = { linearUnit: 'millimeter', linearDeflectionType: 'absolute_value', linearDeflection: .03, angularDeflection: .2 };
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const bounds = meshes => {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (const mesh of meshes) mesh.attributes.position.array.forEach((v, i) => {
    assert(Number.isFinite(v)); min[i % 3] = Math.min(min[i % 3], v); max[i % 3] = Math.max(max[i % 3], v);
  });
  return { min, max, size: max.map((v, i) => v - min[i]), axes: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] };
};
async function main() {
  if (!source || !staging || path.resolve(staging).toLowerCase().startsWith(path.join(root, 'public').toLowerCase())) throw Error('Provide source and staging directories outside public/');
  fs.mkdirSync(staging, { recursive: true });
  const THREE = await import('./solenoid-viewer/node_modules/three/build/three.module.js');
  const occt = await require(path.join(root, 'public/vendor/occt/occt-import-js.js'))();
  const { decodeCompactCad } = await import('data:text/javascript;base64,' + fs.readFileSync(path.join(__dirname, 'solenoid-viewer/compact-cad.js')).toString('base64'));
  // Source Z is up, +X is the connector face. Rigid rotation only; no reflection.
  const rotation = new THREE.Euler().setFromRotationMatrix(new THREE.Matrix4().set(0,1,0,0, 0,0,1,0, 1,0,0,0, 0,0,0,1));
  const models = [];
  for (const code of codes) {
    const model = `ABD-06M-V${code}`, filename = `${model}.stp`, viewerId = model.toLowerCase();
    const input = fs.readFileSync(path.join(source, filename));
    assert(input.subarray(0,128).includes(Buffer.from('ISO-10303-21')), 'Invalid STEP header');
    const raw = occt.ReadStepFile(input, tessellation);
    assert(raw.success && raw.meshes.length >= 10, 'STEP import failed');
    const originalBounds = bounds(raw.meshes);
    const meshes = raw.meshes.map((mesh, index) => {
      const result = structuredClone(mesh);
      result.name = `Part ${index + 1}`;
      // Display finishes from the existing ABD photographs. They make no material-grade claim.
      result.finish = index === 2 ? 'connector' : index >= 3 && index <= 8 ? 'metal' : index === 1 || index === 9 ? 'pcb' : 'polymer';
      for (const attr of ['position', 'normal']) if (result.attributes[attr]) {
        result.attributes[attr].array = result.attributes[attr].array.map(value => +value.toFixed(5) || 0);
      }
      const vertices = result.attributes.position.array.length / 3;
      assert(result.index.array.every(i => Number.isInteger(i) && i >= 0 && i < vertices));
      assert.deepEqual(result.index, mesh.index);
      assert.deepEqual(result.brep_faces, mesh.brep_faces);
      return result;
    });
    const dimensions = bounds(meshes);
    dimensions.size.forEach((size, i) => assert(Math.abs(size - originalBounds.size[i]) < .00002));
    const data = { success: true, name: model, meshes, root: { name: model, meshes: meshes.map((_, i) => i), children: [] },
      appearance: { abd: true }, exteriorOnly: true, assembledOnly: true,
      rotationEuler: [rotation.x, rotation.y, rotation.z], dimensions };
    const packed = packCompactCad(data);
    assert.deepEqual(decodeCompactCad(new Uint8Array(zlib.gunzipSync(packed.gzip))), data);
    assert(packed.gzip.length < 1024 * 1024, 'Unexpectedly large ABD asset');
    fs.writeFileSync(path.join(staging, `${viewerId}.fcad.gz`), packed.gzip);
    models.push({ tubeOdCode: code, model, viewerId, model3dUrl: `/models/products/control/abd/cad/${viewerId}.fcad.gz`,
      sourceFile: filename, sourceSha256: sha(input), assetSha256: sha(packed.gzip), bytes: packed.gzip.length,
      meshCount: meshes.length, triangles: packed.stats.triangles, sourceSizeMm: dimensions.size });
    console.log(JSON.stringify({ model, bytes: packed.gzip.length, meshes: meshes.length, triangles: packed.stats.triangles }));
  }
  // The title blocks identify only V16 and V25. Other ODs must not borrow these drawings.
  const drawings = [];
  for (const [code, file, drawingNumber, drawingProductCode] of [
    ['16', '515-00-04559-C.pdf', 'M-515-00-04559', '809903'],
    ['25', '515-00-0243-C_001.pdf', 'M-515-00-04243', '449052'],
  ]) {
    const bytes = fs.readFileSync(path.join(source, file));
    assert(bytes.subarray(0,5).equals(Buffer.from('%PDF-')), 'Invalid PDF header');
    const name = `abd-06m-v${code}-${drawingNumber.toLowerCase()}-rev001.pdf`;
    fs.writeFileSync(path.join(staging, name), bytes);
    drawings.push({ tubeOdCode: code, model: `ABD-06M-V${code}`, drawingNumber, drawingProductCode, revision: '001',
      drawingPdfUrl: `/documents/products/control/abd/${name}`, sourceFile: file, sha256: sha(bytes), bytes: bytes.length });
  }
  fs.writeFileSync(path.join(staging, 'abd-cad-manifest.json'), JSON.stringify({ version: 1, tessellation, coordinateDecimals: 5,
    geometryPolicy: 'All source meshes, BREP faces and triangle indices retained; coordinates rounded to 0.00001 mm.', models, drawings }, null, 2) + '\n');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
