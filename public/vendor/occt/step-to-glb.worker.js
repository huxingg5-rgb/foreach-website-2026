/* STEP import: occt-import-js 0.0.23 (OpenCascade), see LICENSE.md.
 * Parse locally, away from the UI thread. STEP millimeters become glTF meters.
 */
function meshesToGlb(meshes) {
  const parts = [];
  const bufferViews = [];
  const accessors = [];
  const materials = [];
  const gltfMeshes = [];
  let byteLength = 0;
  function addBuffer(values, target) {
    const bytes = new Uint8Array(values.buffer);
    const view = bufferViews.length;
    bufferViews.push({ buffer: 0, byteOffset: byteLength, byteLength: bytes.length, target });
    parts.push(bytes);
    byteLength += bytes.length;
    return view;
  }
  for (const mesh of meshes) {
    const raw = mesh.attributes.position.array;
    const positions = Float32Array.from(raw, value => value / 1000);
    const minimum = [Infinity, Infinity, Infinity];
    const maximum = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < positions.length; ++i) {
      minimum[i % 3] = Math.min(minimum[i % 3], positions[i]);
      maximum[i % 3] = Math.max(maximum[i % 3], positions[i]);
    }
    const positionAccessor = accessors.length;
    accessors.push({ bufferView: addBuffer(positions, 34962), componentType: 5126,
      count: positions.length / 3, type: "VEC3", min: minimum, max: maximum });
    const attributes = { POSITION: positionAccessor };
    if (mesh.attributes.normal) {
      attributes.NORMAL = accessors.length;
      const normals = Float32Array.from(mesh.attributes.normal.array);
      accessors.push({ bufferView: addBuffer(normals, 34962), componentType: 5126,
        count: normals.length / 3, type: "VEC3" });
    }
    const indices = Uint32Array.from(mesh.index.array);
    const indexAccessor = accessors.length;
    accessors.push({ bufferView: addBuffer(indices, 34963), componentType: 5125,
      count: indices.length, type: "SCALAR" });
    const color = mesh.color || [0.2, 0.25, 0.3];
    const material = materials.length;
    materials.push({ pbrMetallicRoughness: { baseColorFactor: [...color, 1],
      metallicFactor: 0.12, roughnessFactor: 0.55 }, doubleSided: true });
    gltfMeshes.push({ name: mesh.name, primitives: [{ attributes,
      indices: indexAccessor, material, mode: 4 }] });
  }
  const document = { asset: { version: "2.0", generator: "FOREACH local STEP preview" },
    scene: 0, scenes: [{ nodes: meshes.map((_, i) => i) }],
    nodes: meshes.map((mesh, i) => ({ name: mesh.name, mesh: i })),
    meshes: gltfMeshes, materials, accessors, bufferViews, buffers: [{ byteLength }] };
  const json = new TextEncoder().encode(JSON.stringify(document));
  const jsonLength = Math.ceil(json.length / 4) * 4;
  const output = new ArrayBuffer(12 + 8 + jsonLength + 8 + byteLength);
  const data = new DataView(output);
  data.setUint32(0, 0x46546c67, true);
  data.setUint32(4, 2, true);
  data.setUint32(8, output.byteLength, true);
  data.setUint32(12, jsonLength, true);
  data.setUint32(16, 0x4e4f534a, true);
  const all = new Uint8Array(output);
  all.fill(32, 20, 20 + jsonLength);
  all.set(json, 20);
  const binaryStart = 20 + jsonLength;
  data.setUint32(binaryStart, byteLength, true);
  data.setUint32(binaryStart + 4, 0x004e4942, true);
  let offset = binaryStart + 8;
  for (const part of parts) { all.set(part, offset); offset += part.length; }
  return output;
}

if (typeof self !== "undefined") {
  let importer;
  self.onmessage = async event => {
    try {
      if (!importer) {
        importScripts("./occt-import-js.js");
        importer = occtimportjs({ locateFile: name => new URL(name, self.location.href).href });
      }
      const occt = await importer;
      const result = occt.ReadStepFile(new Uint8Array(event.data), {
        linearUnit: "millimeter", linearDeflectionType: "absolute_value",
        linearDeflection: 0.005, angularDeflection: 0.15,
      });
      if (!result.success || !result.meshes?.length) throw new Error("STEP_IMPORT_FAILED");
      const glb = meshesToGlb(result.meshes);
      self.postMessage({ glb, partCount: result.meshes.length }, [glb]);
    } catch (error) {
      self.postMessage({ error: error instanceof Error ? error.message : "STEP_IMPORT_FAILED" });
    }
  };
}
if (typeof module !== "undefined") module.exports = { meshesToGlb };
