// Usage: node scripts/products/build-tubing-assembly-cad-assets.cjs <STEP root> <report directory>
// This supplemental manifest never replaces another product viewer's geometry.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { packCompactCad } = require('./compact-cad/pack.cjs');
const root = path.resolve(__dirname, '../..');
const [sourceRoot, reportDirectory] = process.argv.slice(2);
if (!sourceRoot || !reportDirectory) throw Error('STEP root and report directory are required');
const sources = require('../../data/products/configurator/tubing-assembly-cad-sources.json');

function inspectPose(meshes, gripAt) {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (const mesh of meshes) for (let i = 0; i < mesh.attributes.position.array.length; i++) {
    const v = mesh.attributes.position.array[i];
    min[i % 3] = Math.min(min[i % 3], v); max[i % 3] = Math.max(max[i % 3], v);
  }
  const center = min.map((v, i) => (v + max[i]) / 2);
  // These allowlisted STEP exports have their bore on Y. Reject a different
  // axis rather than guessing from the longest dimension of a compact nut.
  let radius = 0;
  const points = [];
  for (const mesh of meshes) {
    const p = mesh.attributes.position.array;
    for (let i = 0; i < p.length; i += 3) {
      const r = Math.hypot(p[i] - center[0], p[i + 2] - center[2]);
      points.push([p[i + 1], r]); radius = Math.max(radius, r);
    }
  }
  const grip = points.filter(([, r]) => r >= radius * .9998);
  const gripY = grip.reduce((sum, [y]) => sum + y, 0) / grip.length;
  const fraction = (gripY - min[1]) / (max[1] - min[1]);
  if (!['negative-y', 'positive-y'].includes(gripAt)) throw Error('An explicitly reviewed grip direction is required');
  // Canonical body: grip toward -Y, threaded opening toward +Y. The assembly
  // renderer then turns the thread outward for each end without mirroring CAD.
  return { min, max, size: max.map((v, i) => v - min[i]), gripFraction: fraction,
    rotationEuler: gripAt === 'positive-y' ? [Math.PI, 0, 0] : [0, 0, 0] };
}

function validateBoreAxis(text, key, axis = 'y') {
  const entities = new Map([...text.matchAll(/#(\d+)\s*=\s*([\s\S]*?);/g)].map(m => [m[1], m[2]]));
  const cylinders = [];
  for (const value of entities.values()) {
    const cylinder = value.match(/^CYLINDRICAL_SURFACE\([^,]*,#(\d+),([^)]*)\)/);
    if (!cylinder) continue;
    const placement = entities.get(cylinder[1]);
    const refs = [...(placement || '').matchAll(/#(\d+)/g)].map(m => m[1]);
    const direction = entities.get(refs[1])?.match(/\(([-\d.E+]+),([-\d.E+]+),([-\d.E+]+)\)/i)?.slice(1).map(Number);
    const axialIndex = axis === 'z' ? 2 : axis === 'x' ? 0 : 1;
    if (direction && direction.every((v, i) => i === axialIndex ? Math.abs(Math.abs(v) - 1) < 1e-6 : Math.abs(v) < 1e-6)) cylinders.push(Number(cylinder[2]));
  }
  if (cylinders.length < 2) throw Error(`${key}: STEP has no verified ${axis.toUpperCase()}-axis bore`);
  return [...new Set(cylinders.map(r => Number((r * 2).toFixed(5))))].sort((a, b) => a - b);
}

async function main() {
  const occt = await require(path.join(root, 'public/vendor/occt/occt-import-js.js'))();
  const geometries = {}, report = [];
  for (const [key, source] of Object.entries(sources)) {
    const file = path.resolve(sourceRoot, source.file);
    if (!file.startsWith(path.resolve(sourceRoot) + path.sep)) throw Error('Source outside STEP root');
    const bytes = fs.readFileSync(file), text = bytes.toString('utf8');
    if (!text.startsWith('ISO-10303-21;')) throw Error(`${key}: invalid STEP`);
    const part = text.match(/FILE_NAME\('([^']+)'/)?.[1];
    if (part !== source.sourcePart) throw Error(`${key}: source identity changed (${part})`);
    const reviewedFilePart = source.verifiedDrawing && source.filePart;
    if (!path.basename(file).toUpperCase().startsWith(key) && !path.basename(file).toUpperCase().startsWith(source.sourcePart) && !(reviewedFilePart && path.basename(file).startsWith(reviewedFilePart))) throw Error(`${key}: filename identity mismatch`);
    const cylinderDiameters = validateBoreAxis(text, key, source.axis);
    if (source.requiredBoreDiameters?.some(d=>!cylinderDiameters.some(actual=>Math.abs(actual-d)<.001))) throw Error(`${key}: formal drawing bore mismatch`);
    if (source.kind === 'accessory' && Math.abs(cylinderDiameters[0] - Number(key.split('-')[2]) / 10) > .001) throw Error(`${key}: accessory bore mismatch`);
    const result = occt.ReadStepFile(bytes, {linearUnit:'millimeter', linearDeflectionType:'absolute_value', linearDeflection:.01, angularDeflection:.15});
    if (!result.success || !result.meshes.length) throw Error(`${key}: STEP tessellation failed`);
    const pose = inspectPose(result.meshes, source.gripAt || 'negative-y'), id = `assembly-${key.toLowerCase()}`;
    if (source.expectedSize && pose.size.some((v,i)=>Math.abs(v-source.expectedSize[i])>.01)) throw Error(`${key}: verified drawing dimensions changed`);
    if (source.rotationEuler) { pose.rotationEuler = source.rotationEuler; delete pose.gripFraction; }
    const meshes = result.meshes.map((mesh, i) => {
      mesh.name = `${key} ${i + 1}`;
      for (const attribute of ['position', 'normal']) if (mesh.attributes[attribute]) mesh.attributes[attribute].array = mesh.attributes[attribute].array.map(v => Number(v.toFixed(5)));
      return mesh;
    });
    const data = {name:key, success:true, root:{name:id, meshes:meshes.map((_, i) => i), children:[]}, meshes,
      appearance:{fitting:true}, rotationEuler:pose.rotationEuler,
      dimensions:{min:pose.min, max:pose.max, size:pose.size, axes:[[1,0,0],[0,1,0],[0,0,1]]}};
    const packed = packCompactCad(data), model3dUrl = `/models/products/tubing-assemblies/cad/${id}.fcad.gz`;
    const target = path.join(root, 'public', model3dUrl);
    fs.mkdirSync(path.dirname(target), {recursive:true}); fs.writeFileSync(target, packed.gzip);
    geometries[key] = {model3dUrl, sourcePart:part, sourceFile:source.file,
      sourceSha256:crypto.createHash('sha256').update(bytes).digest('hex')};
    report.push({key, ...geometries[key], ...pose, cylinderDiameters, ...packed.stats});
    console.log(`${key}: ${pose.size.map(n => n.toFixed(2)).join(' x ')} mm; ${source.rotationEuler ? 'reviewed source pose' : `grip ${pose.gripFraction.toFixed(3)}`}`);
  }
  fs.writeFileSync(path.join(root, 'data/products/configurator/tubing-assembly-cad-imports.json'), JSON.stringify(geometries, null, 2) + '\n');
  fs.mkdirSync(reportDirectory, {recursive:true});
  fs.writeFileSync(path.join(reportDirectory, 'exact-cad-import-report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(`Imported ${report.length} exact STEP geometries.`);
}
main().catch(error => {console.error(error); process.exitCode = 1;});
