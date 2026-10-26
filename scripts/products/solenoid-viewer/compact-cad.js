// FCADL01: lossless numeric arrays and unchanged CAD metadata. Input is gunzipped.
const MAGIC = 'FCADL01\0';
const fail = message => { throw new Error(`Invalid compact CAD: ${message}`); };
function nearestRoot(n) {
  if (n <= 0) return 0;
  let r = Math.floor(Math.sqrt(n));
  while (r * r > n) r--;
  while ((r + 1) * (r + 1) <= n) r++;
  return 4 * n >= 4 * r * r + 4 * r + 1 ? r + 1 : r;
}
export function decodeCompactCad(bytes) {
  if (!(bytes instanceof Uint8Array) || bytes.byteLength < 12) fail('header');
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (new TextDecoder().decode(bytes.subarray(0, 8)) !== MAGIC) fail('format');
  const jsonLength = view.getUint32(8, true), base = 12 + jsonLength;
  if (!jsonLength || jsonLength > 134217728 || base > bytes.byteLength) fail('metadata length');
  let model;
  try { model = JSON.parse(new TextDecoder('utf-8', {fatal:true}).decode(bytes.subarray(12, base))); }
  catch { fail('metadata JSON'); }
  if (!Array.isArray(model?.meshes) || model.meshes.length > 20000) fail('meshes');
  const arrays = [];
  let nextOffset = 0;
  function array(info) {
    if (!info || !Number.isSafeInteger(info.length) || info.length < 0 || info.length > 30000000) fail('array length');
    if (info.type === 'ref') {
      if (!Number.isSafeInteger(info.ref) || info.ref < 0 || info.ref >= arrays.length || arrays[info.ref].length !== info.length) fail('array reference');
      const result = arrays[info.ref].slice(); arrays.push(result); return result;
    }
    if (!Number.isSafeInteger(info.offset) || info.offset !== nextOffset ||
        !Number.isSafeInteger(info.bytes) || info.bytes < 0 ||
        base + info.offset + info.bytes > bytes.byteLength) fail('array bounds');
    nextOffset += info.bytes;
    const result = new Array(info.length), end = base + info.offset + info.bytes;
    let offset = base + info.offset;
    if (info.type === 'f64') {
      if (info.bytes !== info.length * 8) fail('float length');
      for (let i = 0; i < result.length; i++, offset += 8) {
        const value = view.getFloat64(offset, true);
        if (!Number.isFinite(value)) fail('non-finite float');
        result[i] = value;
      }
    } else {
      if (!Number.isSafeInteger(info.scale) || info.scale <= 0 || info.scale > 1e12 ||
          !Number.isSafeInteger(info.channels) || info.channels < 1 || info.channels > 4) fail('integer format');
      const prior = new Array(info.channels).fill(0);
      if (info.type === 'delta') {
        if (info.bytes < info.length) fail('integer length');
        for (let i = 0; i < result.length; i++) {
          let value = 0, multiplier = 1, byte = 0, count = 0;
          do {
            if (offset >= end || ++count > 8) fail('truncated varint');
            byte = bytes[offset++]; value += (byte & 127) * multiplier;
            if (!Number.isSafeInteger(value)) fail('varint overflow');
            multiplier *= 128;
          } while (byte & 128);
          const delta = value % 2 ? -(value + 1) / 2 : value / 2;
          const channel = i % info.channels, n = prior[channel] + delta;
          if (!Number.isSafeInteger(n)) fail('coordinate overflow');
          prior[channel] = n; result[i] = n / info.scale;
        }
      } else if (info.type === 'planes' || info.type === 'normals') {
        const normals = info.type === 'normals', count = info.length / info.channels;
        if (!Number.isSafeInteger(info.width) || info.width < 1 || info.width > 4 ||
            !['raw', 'delta'].includes(info.mode) || !Number.isInteger(count) ||
            (normals && (info.channels !== 3 || info.scale > 1e6)) ||
            info.bytes !== info.length * info.width + (normals ? info.length / 3 : 0)) fail('plane format');
        for (let i = 0; i < result.length; i++) {
          const channel = i % info.channels, j = channel * count + Math.floor(i / info.channels);
          let value = 0;
          for (let k = 0; k < info.width; k++) value += bytes[offset + k * info.length + j] * 2 ** (k * 8);
          const signed = value % 2 ? -(value + 1) / 2 : value / 2;
          const n = signed + (info.mode === 'delta' ? prior[channel] : 0);
          if (!Number.isSafeInteger(n)) fail('coordinate overflow');
          prior[channel] = n; result[i] = n;
        }
        offset += info.length * info.width;
        if (normals) {
          for (let i = 0; i < result.length; i += 3) {
            const flag = bytes[offset++];
            if (flag > 5) fail('normal axis');
            const axis = Math.floor(flag / 2), sign = flag % 2 ? -1 : 1;
            const u = result[i], v = result[i + 1], residual = result[i + 2];
            if (Math.abs(u) > info.scale || Math.abs(v) > info.scale) fail('normal component');
            const dominant = sign * nearestRoot(info.scale * info.scale - u * u - v * v) + residual;
            const rest = [0, 1, 2].filter(k => k !== axis);
            result[i + axis] = dominant; result[i + rest[0]] = u; result[i + rest[1]] = v;
          }
        }
        for (let i = 0; i < result.length; i++) result[i] /= info.scale;
      } else fail('array encoding');
    }
    if (offset !== end) fail('array trailing bytes');
    arrays.push(result); return result;
  }
  for (const mesh of model.meshes) {
    if (!mesh?.attributes?.position || !mesh?.index) fail('mesh structure');
    const positions = mesh.attributes.position.array = array(mesh.attributes.position.array);
    if (positions.length % 3) fail('position length');
    if (mesh.attributes.normal) {
      const normals = mesh.attributes.normal.array = array(mesh.attributes.normal.array);
      if (normals.length !== positions.length) fail('normal length');
    }
    const indices = mesh.index.array = array(mesh.index.array);
    if (indices.length % 3) fail('triangle length');
    const vertices = positions.length / 3;
    for (const index of indices) if (!Number.isSafeInteger(index) || index < 0 || index >= vertices) fail('triangle index');
  }
  if (base + nextOffset !== bytes.byteLength) fail('payload trailing bytes');
  return model;
}
