// Usage: node scripts/products/prepare-hsf-native-cad.cjs <Rhino mesh export directory>
// Inputs are native meshes from the exact source STEP parts, not reconstructed silhouettes.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { packCompactCad } = require('./compact-cad/pack.cjs');
const root = path.resolve(__dirname, '../..');
const input = path.resolve(process.argv[2] || '');
if (!process.argv[2]) throw Error('Rhino mesh export directory required');
const specs = [
  { model: 'HSF-U28-16-PK-N', sourcePart: '441-09-00260', expectedSize: [8.2, 20.5, 8.2], drawingDiameterMm: 8.2 },
  { model: 'HSF-U28-32-PEEK-N', sourcePart: '443-02-00758', expectedSize: [8.2, 18.1, 8.2], drawingDiameterMm: 8.5 },
];
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const manifest = {}, report = [];
for (const spec of specs) {
  const file = path.join(input, spec.model + '.mesh.json'), bytes = fs.readFileSync(file), source = JSON.parse(bytes);
  if (source.model !== spec.model || source.sourcePart !== spec.sourcePart || source.unit !== 'mm' || source.objectTypes.join(',') !== 'Brep') throw Error('Source identity mismatch: ' + spec.model);
  const position = [], normal = [], index = [], min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (const mesh of source.meshes) {
    const p = mesh.attributes.position.array, n = mesh.attributes.normal.array, offset = position.length / 3;
    if (p.length !== n.length || p.length % 3 || mesh.index.array.length % 3) throw Error('Invalid native mesh');
    for (let i = 0; i < p.length; i++) {
      if (!Number.isFinite(p[i]) || !Number.isFinite(n[i])) throw Error('Non-finite geometry');
      position.push(p[i] || 0); normal.push(n[i] || 0);
      min[i % 3] = Math.min(min[i % 3], p[i]); max[i % 3] = Math.max(max[i % 3], p[i]);
    }
    for (const i of mesh.index.array) {
      if (!Number.isInteger(i) || i < 0 || i >= p.length / 3) throw Error('Invalid index');
      index.push(i + offset);
    }
  }
  const size = max.map((v, i) => v - min[i]);
  if (size.some((v, i) => Math.abs(v - spec.expectedSize[i]) > .001)) throw Error('Native geometry dimensions changed: ' + spec.model);
  const grip = []; let maxRadius = 0;
  for (let i = 0; i < position.length; i += 3) maxRadius = Math.max(maxRadius, Math.hypot(position[i], position[i + 2]));
  // Include the rib crests: the slightly wider shoulder alone is near the
  // middle of this body and cannot identify its grip direction reliably.
  for (let i = 0; i < position.length; i += 3) if (Math.hypot(position[i], position[i + 2]) > maxRadius * .98) grip.push(position[i + 1]);
  const gripFraction = (grip.reduce((a, b) => a + b, 0) / grip.length - min[1]) / size[1];
  if (!(gripFraction < .45)) throw Error('Unexpected source grip direction');
  const meshes = [{ name: spec.model, attributes: { position: { array: position }, normal: { array: normal } }, index: { array: index } }];
  const data = { name: spec.model, success: true, sourcePart: spec.sourcePart,
    root: { name: spec.model, meshes: [0], children: [] }, meshes, appearance: { fitting: true }, rotationEuler: [0, 0, 0],
    dimensions: { min, max, size, axes: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] } };
  const packed = packCompactCad(data), url = `/models/products/tubing-assemblies/cad/assembly-${spec.model.toLowerCase()}.fcad.gz`;
  fs.writeFileSync(path.join(root, 'public', url), packed.gzip);
  manifest[spec.model] = { model3dUrl: url, sourcePart: spec.sourcePart, sourceMethod: 'Rhino native STEP tessellation',
    meshSha256: hash(bytes), sourceSha256: hash(fs.readFileSync(source.sourceFile)), toleranceMm: source.toleranceMm,
    nativeSizeMm: size, drawingDiameterMm: spec.drawingDiameterMm,
    ...(Math.abs(size[0] - spec.drawingDiameterMm) > .001 ? { reviewNote: 'Native STEP maximum diameter is 8.2 mm; formal PDF specifies 8.5 mm. Source geometry is preserved without scaling.' } : {}) };
  report.push({ model: spec.model, ...manifest[spec.model], gripFraction, ...packed.stats });
}
fs.writeFileSync(path.join(root, 'data/products/configurator/tubing-assembly-hsf-cad.json'), JSON.stringify(manifest, null, 2) + '\n');
fs.writeFileSync(path.join(input, 'hsf-cad-import-report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report.map(r => ({ model: r.model, size: r.nativeSizeMm, vertices: r.vertices, triangles: r.triangles, bytes: r.bytes, reviewNote: r.reviewNote })), null, 2));
