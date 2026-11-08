/* eslint-disable @typescript-eslint/no-require-imports -- Offline verified CAD surface audit. */
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const Module = require('node:module');
const root = path.resolve(__dirname, '../..');
const THREE = require('./solenoid-viewer/node_modules/three');
const esbuild = require('./solenoid-viewer/node_modules/esbuild');
const reviews = require('./quick-connect-material-source-review.cjs');
const assembly = require('../../data/products/detail/quick-connect-assembly-references.json');
const decoder = new Module(__filename, module);
decoder._compile(esbuild.buildSync({ entryPoints: [path.join(__dirname, 'solenoid-viewer/compact-cad.js')], bundle: true, platform: 'node', format: 'cjs', write: false, logLevel: 'silent' }).outputFiles[0].text, __filename);
const TOLERANCE = 0.012;
const NORMAL_DOT = 0.98;
function treeFor(list) {
  const box = new THREE.Box3();
  for (const t of list) box.union(t.box);
  if (list.length <= 12) return { box, list };
  const size = box.getSize(new THREE.Vector3());
  const axis = size.x >= size.y && size.x >= size.z ? 'x' : size.y >= size.z ? 'y' : 'z';
  list.sort((a, b) => a.center[axis] - b.center[axis]);
  const half = list.length >> 1;
  return { box, left: treeFor(list.slice(0, half)), right: treeFor(list.slice(half)) };
}
const closest = new THREE.Vector3(), barycentric = new THREE.Vector3(), sourceNormal = new THREE.Vector3();
function matchesSurface(point, normal, node) {
  if (node.box.distanceToPoint(point) > TOLERANCE) return false;
  if (!node.list) return matchesSurface(point, normal, node.left) || matchesSurface(point, normal, node.right);
  for (const source of node.list) {
    if (source.box.distanceToPoint(point) > TOLERANCE) continue;
    source.triangle.closestPointToPoint(point, closest);
    if (closest.distanceTo(point) > TOLERANCE) continue;
    source.triangle.getBarycoord(closest, barycentric);
    if (!Number.isFinite(barycentric.x)) continue;
    sourceNormal.set(0, 0, 0).addScaledVector(source.normals[0], barycentric.x).addScaledVector(source.normals[1], barycentric.y).addScaledVector(source.normals[2], barycentric.z).normalize();
    // Opposite normals distinguish plastic/steel mating contact faces even
    // where their positions coincide. Position-only matching is insufficient.
    if (normal.dot(sourceNormal) >= NORMAL_DOT) return true;
  }
  return false;
}
function frame(datum) {
  const flow = new THREE.Vector3(); flow.setComponent(datum.axis, datum.sign);
  const release = new THREE.Vector3(...datum.releaseDirection).normalize();
  if (Math.abs(flow.dot(release)) > 1e-6 || release.lengthSq() < 0.99) throw Error('Invalid reviewed release direction');
  return [flow, release, new THREE.Vector3().crossVectors(flow, release).normalize()];
}
module.exports = function refineFemaleMaterials(manifest, hardware, output) {
  const cache = new Map(), trees = new Map();
  const report = { toleranceMm: TOLERANCE, normalDotMinimum: NORMAL_DOT, checkedFemaleGeometries: 0, fullFaces: [], promotedBodyFaces: [], rejectedHardwareFaces: [], componentOverrides: [], topologyOverrides: [] };
  function load(id) {
    if (!cache.has(id)) cache.set(id, decoder.exports.decodeCompactCad(zlib.gunzipSync(fs.readFileSync(path.join(root, 'public', manifest.geometries[id].model3dUrl)))));
    return cache.get(id);
  }
  function validate(id) {
    const reviewed = reviews[id];
    if (!reviewed || manifest.geometries[id].sourceSha256 !== reviewed.sourceSha256 || load(id).meshes.map(m => m.brep_faces.length).join(',') !== reviewed.faceCounts.join(',')) throw Error('Material source changed; re-review required: ' + id);
    return reviewed;
  }
  function sourceTree(id, meshIndices, ranges) {
    validate(id);
    const key = JSON.stringify([id, meshIndices, ranges]);
    if (trees.has(key)) return trees.get(key);
    const list = [];
    for (const mi of meshIndices) {
      const mesh = load(id).meshes[mi], p = mesh.attributes.position.array, n = mesh.attributes.normal.array, index = mesh.index.array;
      for (const [fi, face] of mesh.brep_faces.entries()) {
        if (ranges && !ranges.some(([a, b]) => fi >= a && fi <= b)) continue;
        for (let i = face.first * 3; i < (face.last + 1) * 3; i += 3) {
          const pts = [0, 1, 2].map(k => new THREE.Vector3(...p.slice(index[i + k] * 3, index[i + k] * 3 + 3)));
          const normals = [0, 1, 2].map(k => new THREE.Vector3(...n.slice(index[i + k] * 3, index[i + k] * 3 + 3)).normalize());
          const box = new THREE.Box3().setFromPoints(pts);
          list.push({ triangle: new THREE.Triangle(...pts), normals, box, center: box.getCenter(new THREE.Vector3()) });
        }
      }
    }
    const tree = treeFor(list); trees.set(key, tree); return tree;
  }
  const completeSources = [
    { id: 'quick-connect-515-00-05223', series: 'Q20', meshes: [0, 2, 3] },
    { id: 'quick-connect-515-00-05317', series: 'Q40', meshes: [1, 2, 3, 4] },
    { id: 'quick-connect-515-00-05303', series: 'Q40', meshes: [1] },
  ];
  for (const [id, geometry] of Object.entries(manifest.geometries)) {
    const product = Object.values(manifest.products).find(p => p.viewerId === id);
    if (product.gender !== 'S') continue;
    report.checkedFemaleGeometries++;
    const data = load(id), masks = output.geometries[id].meshes;
    const review = reviews[id]; if (review) validate(id);
    const sources = [];
    for (const proof of hardware.geometries[id].evidence.filter(e => ['latch', 'nut'].includes(e.kind) && e.transform)) {
      const reference = hardware.references.find(r => r.id === proof.reference && r.kind === proof.kind);
      const transform = proof.transform;
      const inverse = (v, point) => { const result = new THREE.Vector3(); for (let k = 0; k < 3; k++) result.setComponent(transform.p[k], (v.getComponent(k) - (point ? proof.offset[k] : 0)) * transform.s[k]); return result; };
      sources.push({ evidence: { id: proof.reference, meshes: [0], kind: proof.kind, ranges: reference.ranges }, tree: sourceTree(proof.reference, [0], reference.ranges), point: v => inverse(v, true), normal: v => inverse(v, false) });
    }
    const targetDatum = assembly.geometries[id];
    if (!targetDatum || targetDatum.sourceSha256 !== geometry.sourceSha256) throw Error('Assembly reference changed: ' + id);
    const targetFrame = frame(targetDatum), targetCenter = new THREE.Vector3(...targetDatum.center);
    for (const source of completeSources.filter(s => s.series === product.series)) {
      const sourceDatum = assembly.geometries[source.id], sourceFrame = frame(sourceDatum), sourceCenter = new THREE.Vector3(...sourceDatum.center);
      const rotate = v => new THREE.Vector3().addScaledVector(sourceFrame[0], v.dot(targetFrame[0])).addScaledVector(sourceFrame[1], v.dot(targetFrame[1])).addScaledVector(sourceFrame[2], v.dot(targetFrame[2]));
      sources.push({ evidence: { id: source.id, meshes: source.meshes, kind: 'complete isolated steel solids' }, tree: sourceTree(source.id, source.meshes), point: v => rotate(v.clone().sub(targetCenter)).add(sourceCenter), normal: rotate });
    }
    for (let mi = 0; mi < data.meshes.length; mi++) {
      const mesh = data.meshes[mi], mask = masks[mi];
      const componentRole = review?.componentRoles?.[mi];
      if (componentRole === 0 || componentRole === 2) {
        mask.steelFaces = componentRole === 2 ? mesh.brep_faces.map((_, i) => i) : [];
        mask.bodyFaces = componentRole === 0 ? mesh.brep_faces.map((_, i) => i) : [];
        mask.sealFaces = [];
        mask.complete = true;
        report.componentOverrides.push({ id, mesh: mi, role: componentRole, faceCount: mesh.brep_faces.length, reason: review.reason });
        continue;
      }
      const p = mesh.attributes.position.array, n = mesh.attributes.normal.array, index = mesh.index.array;
      const originalHardware = new Set(hardware.geometries[id].meshes[mi].steelFaces);
      const preservedSprings = new Set(mask.steelFaces.filter(f => !originalHardware.has(f)));
      const verified = new Set(), verificationSources = new Map(), vertexCaches = sources.map(() => new Map());
      for (const [fi, face] of mesh.brep_faces.entries()) {
        if ((mask.sealFaces || []).includes(fi) || preservedSprings.has(fi)) continue;
        for (let si = 0; si < sources.length; si++) {
          const source = sources[si], vertexCache = vertexCaches[si];
          let valid = true;
          for (let j = face.first * 3; j < (face.last + 1) * 3 && valid; j += 3) {
            const center = new THREE.Vector3(), normal = new THREE.Vector3();
            for (let k = 0; k < 3; k++) {
              const vi = index[j + k], point = new THREE.Vector3(...p.slice(vi * 3, vi * 3 + 3)), vertexNormal = new THREE.Vector3(...n.slice(vi * 3, vi * 3 + 3)).normalize();
              center.addScaledVector(point, 1 / 3); normal.add(vertexNormal);
              let match = vertexCache.get(vi);
              if (match === undefined) { match = matchesSurface(source.point(point), source.normal(vertexNormal), source.tree); vertexCache.set(vi, match); }
              if (!match) { valid = false; break; }
            }
            if (valid && !matchesSurface(source.point(center), source.normal(normal.normalize()), source.tree)) valid = false;
          }
          if (valid) { verified.add(fi); verificationSources.set(fi, source.evidence); break; }
        }
      }
      for (const fi of verified) {
        if (!mask.steelFaces.includes(fi)) report.fullFaces.push({ id, mesh: mi, face: fi, source: verificationSources.get(fi) });
        if (mask.bodyFaces.includes(fi)) report.promotedBodyFaces.push({ id, mesh: mi, face: fi, source: verificationSources.get(fi) });
      }
      for (const fi of originalHardware) if (!verified.has(fi)) report.rejectedHardwareFaces.push({ id, mesh: mi, face: fi });
      for (const fi of review?.additionalSteelFaces?.[mi] || []) {
        verified.add(fi); report.topologyOverrides.push({ id, mesh: mi, face: fi, reason: review.reason });
      }
      mask.steelFaces = [...new Set([...verified, ...preservedSprings])].sort((a, b) => a - b);
      mask.bodyFaces = mask.bodyFaces.filter(fi => !verified.has(fi));
      delete mask.steelTriangleRanges; delete mask.triangleCount;
      mask.complete = true;
    }
  }
  return report;
};
