/* eslint-disable @typescript-eslint/no-require-imports -- Existing OCCT/FCAD CLI. */
// Build only the three reviewed display resources used by the Q2001 pilot.
// node scripts/products/build-quick-connect-pilot.cjs <STEP directory> <report directory>
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const crypto = require('node:crypto');
const Module = require('node:module');
const THREE = require('./solenoid-viewer/node_modules/three');
const esbuild = require('./solenoid-viewer/node_modules/esbuild');
const {packCompactCad} = require('./compact-cad/pack.cjs');
const root = path.resolve(__dirname, '../..');
const manifest = require('../../data/products/detail/quick-connect-fitting-cad-manifest.json');

// Exact source BREP faces checked against the matching website renderings:
// nut includes both end faces, flats and bevels; latch includes its plate and pin.
const reviewed = {
  'q2001-pmv-sacn': {steel: [[140, 156]], sealMesh: 1},
  'q2001-smv-sacn': {steel: [[80, 89], [162, 235], [386, 397]]},
  'q2001-snv-sppe': {steel: [[51, 124]]},
};
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const decoder = new Module(__filename, module);
decoder._compile(esbuild.buildSync({entryPoints: [path.join(__dirname, 'solenoid-viewer/compact-cad.js')], bundle: true, platform: 'node', format: 'cjs', write: false}).outputFiles[0].text, __filename);
const {decodeCompactCad} = decoder.exports;

async function main() {
  const [source, reportDirectory] = process.argv.slice(2);
  if (!source || !reportDirectory) throw Error('STEP and report directories are required');
  const files = fs.readdirSync(source);
  fs.mkdirSync(reportDirectory, {recursive: true});
  const occt = await require(path.join(root, 'public/vendor/occt/occt-import-js.js'))();
  const preview = {baseModel: 'Q2001-PMV-SACN', version: '20261105-review2', geometries: {}};
  const report = [];
  for (const [slug, roles] of Object.entries(reviewed)) {
    const product = manifest.products[slug], geometry = manifest.geometries[product.viewerId];
    const filename = files.find(file => file.toLowerCase() === product.sourcePart + '-c.stp');
    if (!filename) throw Error('Missing exact STEP: ' + product.model);
    const step = fs.readFileSync(path.join(source, filename));
    if (sha(step) !== geometry.sourceSha256) throw Error('Source changed: ' + filename);
    const original = fs.readFileSync(path.join(root, 'public', geometry.model3dUrl));
    const raw = zlib.gunzipSync(original);
    const data = decodeCompactCad(raw);
    const result = occt.ReadStepFile(step, {
      linearUnit: 'millimeter', linearDeflectionType: 'absolute_value',
      linearDeflection: .05, angularDeflection: .35,
    });
    if (!result.success || result.meshes.length !== data.meshes.length) throw Error('Mesh structure changed: ' + slug);
    let boundError = 0;
    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    for (const [i, mesh] of result.meshes.entries()) {
      if (mesh.brep_faces.length !== data.meshes[i].brep_faces.length) throw Error('Face order changed: ' + slug);
      // Keep the original feature lines; a coarser display mesh must not add
      // spurious seams across smooth plastic surfaces.
      const sourceGeometry = new THREE.BufferGeometry();
      sourceGeometry.setAttribute('position', new THREE.Float32BufferAttribute(data.meshes[i].attributes.position.array, 3));
      sourceGeometry.setIndex(data.meshes[i].index.array);
      const sourceEdges = new THREE.EdgesGeometry(sourceGeometry, 26);
      mesh.reviewedDisplayEdges = Array.from(sourceEdges.attributes.position.array).map(value => Number(value.toFixed(4)) || 0);
      sourceEdges.dispose(); sourceGeometry.dispose();
      mesh.name = 'Part ' + (i + 1);
      for (const [key, attribute] of Object.entries(mesh.attributes)) {
        attribute.array = attribute.array.map(value => Number(value.toFixed(key === 'position' ? 4 : 3)) || 0);
      }
      mesh.attributes.position.array.forEach((value, j) => {
        min[j % 3] = Math.min(min[j % 3], value); max[j % 3] = Math.max(max[j % 3], value);
      });
      mesh.brep_faces.forEach((face, j) => {
        face.materialRole = i === roles.sealMesh ? 1 : i === 0 && roles.steel.some(([lo, hi]) => j >= lo && j <= hi) ? 2 : 0;
      });
    }
    for (let i = 0; i < 3; i++) boundError = Math.max(boundError, Math.abs(min[i] - data.dimensions.min[i]), Math.abs(max[i] - data.dimensions.max[i]));
    if (boundError > .05) throw Error('Display boundary exceeds tolerance: ' + slug);
    data.meshes = result.meshes;
    data.appearance = {...data.appearance, reviewedQ2001Materials: true};
    // Keep verified engineering dimensions and mating references unchanged.
    const packed = packCompactCad(data);
    if (packed.gzip.length >= original.length * .2) throw Error('Insufficient compression: ' + slug);
    const model3dUrl = `/models/products/fittings/quick-connect/preview-q2001/${product.viewerId}.fcad.gz`;
    fs.mkdirSync(path.dirname(path.join(root, 'public', model3dUrl)), {recursive: true});
    fs.writeFileSync(path.join(root, 'public', model3dUrl), packed.gzip);
    preview.geometries[product.viewerId] = {model3dUrl};
    report.push({model: product.model, sourcePart: product.sourcePart, sourceSha256: geometry.sourceSha256,
      beforeBytes: original.length, afterBytes: packed.gzip.length, maxBoundaryDifferenceMm: boundError,
      linearDeflectionMm: .05, angularDeflectionRadians: .35, ...packed.stats});
  }
  fs.writeFileSync(path.join(root, 'data/products/detail/quick-connect-pilot-preview.json'), JSON.stringify(preview, null, 2) + '\n');
  fs.writeFileSync(path.join(reportDirectory, 'compression-report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report.map(({model, beforeBytes, afterBytes, triangles}) => ({model, beforeBytes, afterBytes, triangles})), null, 2));
}
main().catch(error => {console.error(error); process.exitCode = 1;});
