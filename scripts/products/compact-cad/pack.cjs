const zlib = require('node:zlib');
const crypto = require('node:crypto');
const MAGIC = 'FCADL01\0';
function exactScale(values) {
  let scale = 1;
  for (const value of values) {
    if (!Number.isFinite(value) || Object.is(value, -0)) return null;
    while (scale <= 1e12 && (!Number.isSafeInteger(Math.round(value * scale)) || Math.round(value * scale) / scale !== value)) scale *= 10;
    if (scale > 1e12) return null;
  }
  if (values.some(value => !Number.isSafeInteger(Math.round(value * scale)) || Math.round(value * scale) / scale !== value)) return null;
  return scale;
}
function nearestRoot(n) {
  if (n <= 0) return 0;
  let r = Math.floor(Math.sqrt(n));
  while (r * r > n) r--;
  while ((r + 1) * (r + 1) <= n) r++;
  return 4 * n >= 4 * r * r + 4 * r + 1 ? r + 1 : r;
}
function deltaPayload(values, channels) {
  const out = Buffer.allocUnsafe(values.length * 8), prior = new Array(channels).fill(0);
  let offset = 0;
  for (let i = 0; i < values.length; i++) {
    const delta = values[i] - prior[i % channels];
    prior[i % channels] = values[i];
    let value = delta < 0 ? -delta * 2 - 1 : delta * 2;
    if (!Number.isSafeInteger(value)) return null;
    while (value > 127) { out[offset++] = (value % 128) | 128; value = Math.floor(value / 128); }
    out[offset++] = value;
  }
  return out.subarray(0, offset);
}
// Reorder exact integer bytes into component/byte planes before gzip.
function planePayload(values, channels, mode) {
  if (values.length % channels) return null;
  const coded = new Uint32Array(values.length), prior = new Array(channels).fill(0);
  let max = 0;
  for (let i = 0; i < values.length; i++) {
    const n = mode === 'delta' ? values[i] - prior[i % channels] : values[i];
    prior[i % channels] = values[i];
    const value = n < 0 ? -n * 2 - 1 : n * 2;
    if (!Number.isSafeInteger(value) || value > 0xffffffff) return null;
    coded[(i % channels) * (values.length / channels) + Math.floor(i / channels)] = value;
    max = Math.max(max, value);
  }
  const width = max > 0xffffff ? 4 : max > 0xffff ? 3 : max > 0xff ? 2 : 1;
  const payload = Buffer.allocUnsafe(values.length * width);
  for (let k = 0; k < width; k++) for (let i = 0; i < values.length; i++) payload[k * values.length + i] = (coded[i] >>> (k * 8)) & 255;
  return {payload, width, mode};
}
function normalValues(values, scale) {
  if (scale > 1e6 || values.length % 3 || values.some(n => Math.abs(n) > scale)) return null;
  const projected = new Array(values.length), flags = Buffer.allocUnsafe(values.length / 3);
  for (let i = 0; i < values.length; i += 3) {
    let axis = 0;
    if (Math.abs(values[i + 1]) > Math.abs(values[i + axis])) axis = 1;
    if (Math.abs(values[i + 2]) > Math.abs(values[i + axis])) axis = 2;
    const rest = [0, 1, 2].filter(k => k !== axis), sign = values[i + axis] < 0 ? -1 : 1;
    const u = values[i + rest[0]], v = values[i + rest[1]];
    projected[i] = u; projected[i + 1] = v;
    projected[i + 2] = values[i + axis] - sign * nearestRoot(scale * scale - u * u - v * v);
    flags[i / 3] = axis * 2 + (sign < 0 ? 1 : 0);
  }
  return {projected, flags};
}
function packCompactCad(data) {
  const model = structuredClone(data), blocks = [], seen = new Map();
  const stats = {meshes:data.meshes.length, vertices:0, triangles:0, float64Arrays:0, deltaArrays:0, planeArrays:0, normalArrays:0, referenceArrays:0};
  let total = 0, ordinal = 0;
  function encode(values, channels, kind) {
    if (!Array.isArray(values) || values.some(value => !Number.isFinite(value))) throw Error('CAD array must contain finite numbers');
    const scale = kind === 'index' && values.every(value => Number.isSafeInteger(value) && !Object.is(value, -0)) ? 1 : exactScale(values);
    let candidate;
    if (scale !== null) {
      const integers = values.map(value => Math.round(value * scale));
      const payload = deltaPayload(integers, channels);
      if (payload) {
        candidate = {payload, type:'delta', scale, channels};
        let bestBytes = zlib.gzipSync(payload, {level:9}).length;
        function consider(plane, type, flags) {
          if (!plane) return;
          const nextPayload = flags ? Buffer.concat([plane.payload, flags]) : plane.payload;
          const bytes = zlib.gzipSync(nextPayload, {level:9}).length;
          if (bytes + 64 >= bestBytes) return;
          candidate = {payload:nextPayload, type, scale, channels, width:plane.width, mode:plane.mode};
          bestBytes = bytes;
        }
        for (const mode of ['raw', 'delta']) consider(planePayload(integers, channels, mode), 'planes');
        if (kind === 'normal') {
          const normals = normalValues(integers, scale);
          if (normals) for (const mode of ['raw', 'delta']) consider(planePayload(normals.projected, 3, mode), 'normals', normals.flags);
        }
      }
    }
    if (!candidate) {
      const payload = Buffer.allocUnsafe(values.length * 8);
      values.forEach((value, i) => payload.writeDoubleLE(value, i * 8));
      candidate = {type:'f64', payload};
    }
    const {payload, ...format} = candidate;
    const digest = crypto.createHash('sha256').update(JSON.stringify(format)).update(payload).digest('hex');
    const prior = seen.get(digest), currentOrdinal = ordinal++;
    if (prior && prior.length === values.length) { stats.referenceArrays++; return {type:'ref', ref:prior.ordinal, length:values.length}; }
    seen.set(digest, {ordinal:currentOrdinal, length:values.length});
    stats[{f64:'float64Arrays',delta:'deltaArrays',planes:'planeArrays',normals:'normalArrays'}[format.type]]++;
    const info = {...format, offset:total, bytes:payload.length, length:values.length};
    total += payload.length; blocks.push(payload); return info;
  }
  model.meshes.forEach(mesh => {
    stats.vertices += mesh.attributes.position.array.length / 3;
    stats.triangles += mesh.index.array.length / 3;
    mesh.attributes.position.array = encode(mesh.attributes.position.array, 3, 'position');
    if (mesh.attributes.normal) mesh.attributes.normal.array = encode(mesh.attributes.normal.array, 3, 'normal');
    mesh.index.array = encode(mesh.index.array, 1, 'index');
  });
  const json = Buffer.from(JSON.stringify(model)), header = Buffer.alloc(12);
  header.write(MAGIC); header.writeUInt32LE(json.length, 8);
  const raw = Buffer.concat([header, json, ...blocks]);
  const gzip = zlib.gzipSync(raw, {level:9});
  return {raw, gzip, stats:{...stats, metadataBytes:json.length, rawBytes:raw.length, bytes:gzip.length}};
}
module.exports = {packCompactCad, exactScale};
