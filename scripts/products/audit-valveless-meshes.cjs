// Verify lossless removal of whole hidden BREP faces. This checks data integrity,
// not visibility: the separate multi-view review must prove each removal is safe.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const {isDeepStrictEqual} = require('node:util');

const MODEL_IDS = ['rpl-p4', 'rpl-p635', 'rpl-p15', 'drpl-0109'];
const without = (object, keys) => Object.fromEntries(Object.entries(object).filter(([key]) => !keys.includes(key)));
const same = (before, after, label, errors) => {
  if (!isDeepStrictEqual(before, after)) errors.push(`${label} changed`);
};

function inspectModel(model, label, errors) {
  const result = {meshes: model.meshes?.length ?? 0, vertices: 0, triangles: 0, faces: 0,
    emptyFaces: 0, degenerateTriangles: 0, unusedVertices: 0,
    bounds: {min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity]}};
  if (!Array.isArray(model.meshes) || !model.meshes.length) throw new Error(`${label}: no meshes`);
  for (const [meshIndex, mesh] of model.meshes.entries()) {
    const prefix = `${label} mesh ${meshIndex}`, positions = mesh.attributes?.position?.array;
    const indices = mesh.index?.array, faces = mesh.brep_faces;
    if (!Array.isArray(positions) || positions.length % 3) throw new Error(`${prefix}: invalid positions`);
    if (!Array.isArray(indices) || indices.length % 3) throw new Error(`${prefix}: invalid triangle indices`);
    if (!Array.isArray(faces)) throw new Error(`${prefix}: missing BREP slots`);
    const vertexCount = positions.length / 3, triangleCount = indices.length / 3;
    const used = new Uint8Array(vertexCount);
    let validIndices = true, cursor = 0;
    result.vertices += vertexCount;
    result.triangles += triangleCount;
    result.faces += faces.length;
    for (const [key, attribute] of Object.entries(mesh.attributes)) {
      if (!Array.isArray(attribute.array) || attribute.array.some(value => !Number.isFinite(value))) {
        errors.push(`${prefix}: ${key} has invalid numeric values`);
      } else if (vertexCount ? !Number.isInteger(attribute.array.length / vertexCount) || !attribute.array.length : attribute.array.length) {
        errors.push(`${prefix}: ${key} vertex count mismatch`);
      }
    }
    if (mesh.attributes.normal && mesh.attributes.normal.array.length !== positions.length) errors.push(`${prefix}: normal count mismatch`);
    for (const [faceIndex, face] of faces.entries()) {
      if (!Number.isInteger(face.first) || !Number.isInteger(face.last) || face.first !== cursor || face.last < face.first - 1 || face.last >= triangleCount) {
        errors.push(`${prefix} face ${faceIndex}: invalid or discontinuous range`);
      }
      if (face.last === face.first - 1) result.emptyFaces++;
      cursor = face.last + 1;
    }
    if (cursor !== triangleCount) errors.push(`${prefix}: BREP ranges do not cover triangle array`);
    for (const index of indices) {
      if (!Number.isInteger(index) || index < 0 || index >= vertexCount) {
        validIndices = false;
      } else {
        used[index] = 1;
      }
    }
    if (!validIndices) {
      errors.push(`${prefix}: out-of-range or noninteger vertex index`);
      continue;
    }
    for (let vertex = 0; vertex < vertexCount; vertex++) {
      if (!used[vertex]) { result.unusedVertices++; continue; }
      for (let axis = 0; axis < 3; axis++) {
        const value = positions[vertex * 3 + axis];
        result.bounds.min[axis] = Math.min(result.bounds.min[axis], value);
        result.bounds.max[axis] = Math.max(result.bounds.max[axis], value);
      }
    }
    for (let index = 0; index < indices.length; index += 3) {
      const a = indices[index] * 3, b = indices[index + 1] * 3, c = indices[index + 2] * 3;
      const abx = positions[b] - positions[a], aby = positions[b + 1] - positions[a + 1], abz = positions[b + 2] - positions[a + 2];
      const acx = positions[c] - positions[a], acy = positions[c + 1] - positions[a + 1], acz = positions[c + 2] - positions[a + 2];
      if (Math.hypot(aby * acz - abz * acy, abz * acx - abx * acz, abx * acy - aby * acx) < 1e-10) result.degenerateTriangles++;
    }
  }
  if (result.degenerateTriangles) errors.push(`${label}: ${result.degenerateTriangles} degenerate triangles`);
  function inspectRoot(node) {
    if (!node || !Array.isArray(node.meshes) || !Array.isArray(node.children)) throw new Error(`${label}: invalid root tree`);
    if (node.meshes.some(index => !Number.isInteger(index) || index < 0 || index >= model.meshes.length)) errors.push(`${label}: invalid root mesh reference`);
    node.children.forEach(inspectRoot);
  }
  inspectRoot(model.root);
  return result;
}

function auditModel(before, after) {
  const errors = [];
  const beforeStats = inspectModel(before, 'before', errors), afterStats = inspectModel(after, 'after', errors);
  // Source identity, dimensions, hierarchy, transform and appearance all stay exact.
  // Only this new model-level marker may differ.
  same(without(before, ['meshes', 'exteriorOptimized']), without(after, ['meshes', 'exteriorOptimized']), 'Model metadata', errors);
  same(before.meshes.length, after.meshes.length, 'Mesh slot count', errors);
  same(beforeStats.bounds, afterStats.bounds, 'Referenced geometry bounds', errors);
  if (afterStats.triangles > beforeStats.triangles) errors.push('Triangle count increased');
  if (afterStats.vertices > beforeStats.vertices) errors.push('Vertex count increased');
  let retainedFaces = 0, removedFaces = 0;
  for (let meshIndex = 0; meshIndex < Math.min(before.meshes.length, after.meshes.length); meshIndex++) {
    const source = before.meshes[meshIndex], target = after.meshes[meshIndex], prefix = `Mesh ${meshIndex}`;
    same(without(source, ['attributes', 'index', 'brep_faces']), without(target, ['attributes', 'index', 'brep_faces']), `${prefix} metadata/appearance role`, errors);
    same(without(source.index, ['array']), without(target.index, ['array']), `${prefix} index metadata`, errors);
    same(Object.keys(source.attributes).sort(), Object.keys(target.attributes).sort(), `${prefix} attribute names`, errors);
    same(source.brep_faces.length, target.brep_faces.length, `${prefix} original face slot count`, errors);
    const sourceVertexCount = source.attributes.position.array.length / 3;
    for (const [key, attribute] of Object.entries(source.attributes)) {
      if (!target.attributes[key]) continue;
      same(without(attribute, ['array']), without(target.attributes[key], ['array']), `${prefix} ${key} metadata`, errors);
    }
    for (let faceIndex = 0; faceIndex < Math.min(source.brep_faces.length, target.brep_faces.length); faceIndex++) {
      const sourceFace = source.brep_faces[faceIndex], targetFace = target.brep_faces[faceIndex];
      const sourceCount = sourceFace.last - sourceFace.first + 1, targetCount = targetFace.last - targetFace.first + 1;
      const faceLabel = `${prefix} face ${faceIndex}`;
      same(without(sourceFace, ['first', 'last']), without(targetFace, ['first', 'last']), `${faceLabel} identity/material metadata`, errors);
      if (targetCount === 0) { if (sourceCount) removedFaces++; continue; }
      if (targetCount !== sourceCount) { errors.push(`${faceLabel}: partially removed or added triangles (${sourceCount} -> ${targetCount})`); continue; }
      retainedFaces++;
      // Compare ordered vertex attributes rather than compacted index numbers.
      // This proves triangle winding, positions, normals and face order did not change.
      for (const [key, attribute] of Object.entries(source.attributes)) {
        if (!target.attributes[key]) continue;
        const components = attribute.array.length / sourceVertexCount;
        if (!Number.isInteger(components) || components <= 0) { errors.push(`${faceLabel}: invalid source ${key} stride`); continue; }
        let matches = true;
        for (let offset = 0; offset < sourceCount * 3 && matches; offset++) {
          const sourceVertex = source.index.array[sourceFace.first * 3 + offset], targetVertex = target.index.array[targetFace.first * 3 + offset];
          for (let component = 0; component < components; component++) {
            if (attribute.array[sourceVertex * components + component] !== target.attributes[key].array[targetVertex * components + component]) { matches = false; break; }
          }
        }
        if (!matches) errors.push(`${faceLabel}: retained triangle ${key} tuples or order changed`);
      }
    }
  }
  return {passed: errors.length === 0, before: beforeStats, after: afterStats, retainedFaces, removedFaces, errors};
}

function fileStats(buffer) {
  return {bytes: buffer.length, gzipBytes: zlib.gzipSync(buffer, {level: 9}).length,
    sha256: crypto.createHash('sha256').update(buffer).digest('hex')};
}

function run(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 2) {
    if (!['--before', '--after'].includes(argv[index]) || !argv[index + 1] || argv[index + 1].startsWith('--')) throw new Error('Usage: node scripts/products/audit-valveless-meshes.cjs --before DIR --after DIR');
    args[argv[index].slice(2)] = path.resolve(argv[index + 1]);
  }
  if (!args.before || !args.after) throw new Error('Both --before and --after directories are required');
  const results = MODEL_IDS.map(id => {
    try {
      const beforeBytes = fs.readFileSync(path.join(args.before, `${id}.json`));
      const afterBytes = fs.readFileSync(path.join(args.after, `${id}.json`));
      const result = auditModel(JSON.parse(beforeBytes), JSON.parse(afterBytes));
      result.before = {...result.before, ...fileStats(beforeBytes)};
      result.after = {...result.after, ...fileStats(afterBytes)};
      return {id, ...result};
    } catch (error) {
      return {id, passed: false, errors: [error.message]};
    }
  });
  const report = {passed: results.every(result => result.passed), scope: 'Whole-face removal integrity; visibility requires a separate review', ...args, results};
  console.log(JSON.stringify(report, null, 2));
  if (!report.passed) process.exitCode = 1;
  return report;
}

module.exports = {auditModel, run};
if (require.main === module) {
  try { run(process.argv.slice(2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
