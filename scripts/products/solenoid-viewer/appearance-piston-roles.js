// Coordinates are in millimeters in the unmodified, externally released STEP.
// Finish boundaries were checked against the local EA/SM/TM product photographs
// and the CAD's flange, head and motor-end planes. They are visual finishes only.
export const PISTON_ROLES = { black: 0, motor: 1, aluminum: 2, steel: 3, head: 4 };

export function pistonProfile(name) {
  const family = name.slice(0, 2);
  const zUp = ['EA-2500UL', 'EA-5000UL', 'EA-0010ML'].includes(name);
  const large = name === 'EA-0010ML' || name === 'EA-0020ML';
  const head = family === 'SM' ? 95.5 : family === 'TM' ? 71 : large ? (name === 'EA-0010ML' ? 115.5 : 166) : 93.8;
  return { family, axis: zUp ? 2 : 1, zUp, large, head,
    cuts: family === 'SM' ? [41, head] : family === 'TM' ? [13, 20, 34, 40, head] : [9.5, 29, large ? 40 : 38, head] };
}

function bodyRole(height, profile) {
  if (height >= profile.head) return PISTON_ROLES.head;
  if (profile.family === 'SM') return height < 41 ? PISTON_ROLES.motor : PISTON_ROLES.aluminum;
  if (profile.family === 'TM') return (height >= 13 && height < 20) || (height >= 34 && height < 40)
    ? PISTON_ROLES.aluminum : height >= 20 && height < 34 ? PISTON_ROLES.motor : PISTON_ROLES.black;
  return height >= 9.5 && height < 29 ? PISTON_ROLES.motor : PISTON_ROLES.black;
}

function faceOverride(min, max, p, meshIndex) {
  const h0 = min[p.axis], h1 = max[p.axis];
  const horizontal = p.zUp ? [1, 0] : [0, 2];
  const [x, z] = horizontal.map(k => (min[k] + max[k]) / 2);
  const [wx, wz] = horizontal.map(k => max[k] - min[k]);
  // Small separate cylindrical patches close threaded holes in the external
  // export. They follow the surrounding finish, rather than becoming screws.
  if (meshIndex !== 0) return undefined;
  if (p.family === 'EA') {
    // The bent mounting bracket extends behind the black pump housing.
    const backMax = max[horizontal[1]];
    if (h0 >= 42.99 && h1 <= 67 && (backMax <= -21.01
      || min[horizontal[1]] < -23 && backMax <= -11.99)) return PISTON_ROLES.aluminum;
    const corner = (v, target) => Math.abs(Math.abs(v) - target) < 2;
    if (wx <= 6.6 && wz <= 6.6 && corner(x, 15.5) && corner(z, 15.5)
      && (h0 >= 43 && h1 <= 51 || h0 >= 0 && h1 <= 3.01)) return PISTON_ROLES.steel;
    if (!p.large && wx <= 6.6 && wz <= 6.6 && corner(x, 13.79) && corner(z, 13.79)
      && h0 >= 99.29 && h1 <= 105.81) return PISTON_ROLES.steel;
    if (p.large && wx <= 6.6 && wz <= 6.6 && corner(x, 13.79) && corner(z, 13.79)
      && h0 >= 141 && h1 <= 147) return PISTON_ROLES.steel;
  }
  if (p.family === 'SM' && wx <= 6.6 && wz <= 6.6) {
    if (Math.abs(Math.abs(x) - 10.5) < 1.7 && Math.abs(z) < 2 && h0 >= 121 && h1 <= 124.81) return PISTON_ROLES.steel;
    if (Math.abs(Math.abs(x) - 11.5) < 1.7 && Math.abs(Math.abs(z) - 11.5) < 1.7
      && (h0 >= 53 && h1 <= 56.2 || h0 >= 0 && h1 <= 2.01)) return PISTON_ROLES.steel;
  }
  if (p.family === 'TM' && wx <= 5.6 && wz <= 5.6 && Math.abs(Math.abs(x) - 7.7) < 1.6 && Math.abs(Math.abs(z) - 7.7) < 1.6
    && (h0 >= 40.2 && h1 <= 43.2 || h0 >= 71 && h1 <= 84.61)) return PISTON_ROLES.steel;
  return undefined;
}

// A merged CAD face may span head + body, or motor + frame. Split only triangles
// that cross a finish plane; preserve their surface positions and smooth normals.
// No model parts are fabricated, removed, or displaced by this operation.
export function pistonFinishGeometry(src, name, meshIndex) {
  const profile = pistonProfile(name), axis = profile.axis;
  const sourcePositions = src.attributes.position.array, sourceNormals = src.attributes.normal?.array;
  const positions = [...sourcePositions], normals = sourceNormals ? [...sourceNormals] : null;
  const sourceIndices = src.index.array, buckets = Array.from({ length: 5 }, () => []);
  let splitTriangles = 0;
  function vertex(index) { return { position: sourcePositions.slice(index * 3, index * 3 + 3), normal: sourceNormals?.slice(index * 3, index * 3 + 3) }; }
  function clip(poly, level, above) {
    const out = [];
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      const da = a.position[axis] - level, db = b.position[axis] - level;
      const ina = above ? da >= 0 : da <= 0, inb = above ? db >= 0 : db <= 0;
      if (ina) out.push(a);
      if (ina !== inb) {
        const t = da / (da - db);
        const v = { position: a.position.map((n, k) => n + (b.position[k] - n) * t), normal: a.normal?.map((n, k) => n + (b.normal[k] - n) * t) };
        v.position[axis] = level; out.push(v);
      }
    }
    return out;
  }
  for (const face of src.brep_faces || [{ first: 0, last: sourceIndices.length / 3 - 1 }]) {
    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    for (let j = face.first * 3; j <= face.last * 3 + 2; j++) {
      const v = sourceIndices[j] * 3;
      for (let k = 0; k < 3; k++) { min[k] = Math.min(min[k], sourcePositions[v + k]); max[k] = Math.max(max[k], sourcePositions[v + k]); }
    }
    const override = faceOverride(min, max, profile, meshIndex);
    for (let j = face.first * 3; j <= face.last * 3; j += 3) {
      const indices = sourceIndices.slice(j, j + 3);
      if (override !== undefined) { buckets[override].push(...indices); continue; }
      const heights = indices.map(i => sourcePositions[i * 3 + axis]);
      const low = Math.min(...heights), high = Math.max(...heights);
      const levels = profile.cuts.filter(c => low < c - 1e-6 && high > c + 1e-6);
      if (!levels.length) { buckets[bodyRole((low + high) / 2, profile)].push(...indices); continue; }
      splitTriangles++;
      let remaining = indices.map(vertex);
      for (const level of [...levels, Infinity]) {
        const poly = level === Infinity ? remaining : clip(remaining, level, false);
        if (poly.length >= 3) {
          const role = bodyRole(poly.reduce((sum, v) => sum + v.position[axis], 0) / poly.length, profile);
          const start = positions.length / 3;
          for (const v of poly) {
            positions.push(...v.position);
            if (normals) { const length = Math.hypot(...v.normal) || 1; normals.push(...v.normal.map(n => n / length)); }
          }
          for (let k = 1; k < poly.length - 1; k++) buckets[role].push(start, start + k, start + k + 1);
        }
        if (level !== Infinity) remaining = clip(remaining, level, true);
      }
    }
  }
  const indices = [], groups = [];
  buckets.forEach((bucket, materialIndex) => {
    if (!bucket.length) return;
    groups.push({ start: indices.length, count: bucket.length, materialIndex });
    for (const i of bucket) indices.push(i);
  });
  return { positions, normals, indices, groups, splitTriangles };
}
