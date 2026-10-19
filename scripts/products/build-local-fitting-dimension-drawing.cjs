/* Local CAD test drawing. Geometry and dimensions come from this STEP file;
 * no manufacturing tolerances or dimensions from a different product are used.
 */
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const createOcct = require("../../public/vendor/occt/occt-import-js.js");
const root = path.resolve(__dirname, "../..");
const assetDir = path.join(root, "public/models/products/fittings/local-test");
const code = "443-01-00063";
const input = fs.readFileSync(path.join(assetDir, `${code}.stp`));
const text = input.toString("utf8");
if (!text.startsWith("ISO-10303-21") || !text.includes("SI_UNIT(.MILLI.,.METRE.)")) {
  throw new Error("The drawing requires a readable STEP model in millimeters.");
}
const entities = new Map([...text.matchAll(/#(\d+)\s*=\s*([\s\S]*?);/g)].map(m => [m[1], m[2]]));
const refs = value => [...value.matchAll(/#(\d+)/g)].map(m => m[1]);
const tuple = value => value.slice(value.lastIndexOf("(") + 1).replace(/\)/g, "").split(",").map(Number);
const close = (a, b) => Math.abs(a - b) < 1e-7;
const surfaces = [];
const circles = [];
for (const [id, entity] of entities) {
  if (!/^(CYLINDRICAL_SURFACE|CONICAL_SURFACE|TOROIDAL_SURFACE|CIRCLE)\(/.test(entity)) continue;
  const placement = entities.get(refs(entity)[0]);
  const placementRefs = refs(placement);
  const values = entity.slice(entity.lastIndexOf("#")).split(",").slice(1).map(value => Number(value.replace(/\)/g, "")));
  const surface = { id: `#${id}`, type: entity.split("(")[0],
    center: tuple(entities.get(placementRefs[0])), axis: tuple(entities.get(placementRefs[1])),
    radius: values[0], minorRadius: values[1] };
  (surface.type === "CIRCLE" ? circles : surfaces).push(surface);
}
const axisZ = surface => close(Math.abs(surface.axis[2]), 1);
const axisX = surface => close(Math.abs(surface.axis[0]), 1);
const find = predicate => {
  const surface = surfaces.find(predicate);
  if (!surface) throw new Error("Expected CAD feature is missing; do not reuse this drawing for a different model.");
  return surface;
};
const bore = find(s => s.type === "CYLINDRICAL_SURFACE" && axisZ(s) && close(s.radius, 0.6));
const branchBore = find(s => s.type === "CYLINDRICAL_SURFACE" && axisX(s) && close(s.radius, bore.radius));
const tip = find(s => s.type === "CYLINDRICAL_SURFACE" && axisZ(s) && close(s.radius, 0.8));
const shank = find(s => s.type === "CYLINDRICAL_SURFACE" && axisZ(s) && close(s.radius, 0.9));
const body = find(s => s.type === "CYLINDRICAL_SURFACE" && axisZ(s) && close(s.radius, 1.4));
const shoulder = find(s => s.type === "TOROIDAL_SURFACE" && axisZ(s) && close(s.minorRadius, 0.5) && close(s.center[2], -3.5));
const lip = find(s => s.type === "TOROIDAL_SURFACE" && axisZ(s) && close(s.minorRadius, 0.1) && close(s.center[2], -0.1));
const cone = find(s => s.type === "CONICAL_SURFACE" && axisZ(s));
const crest = circles.find(s => axisZ(s) && close(s.radius, 1) && close(s.center[2], -9));
if (!crest || !text.includes("CONVERSION_BASED_UNIT('DEGREE'")) throw new Error("The barb angle or crest could not be verified.");
const vector = (a, b) => a.map((n, i) => n - b[i]);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a.reduce((sum, value, i) => sum + value * b[i], 0);
const key = point => point.map(v => Math.round(v * 1e6)).join(",");
const n = value => Number(value.toFixed(4));
const f = value => value.toFixed(2);

function meshGeometry(mesh) {
  const positions = mesh.attributes.position.array;
  const indices = mesh.index.array;
  const vertices = [];
  const welded = new Map();
  const ids = [];
  for (let i = 0; i < positions.length; i += 3) {
    const point = positions.slice(i, i + 3);
    const id = key(point);
    if (!welded.has(id)) { welded.set(id, vertices.length); vertices.push(point); }
    ids.push(welded.get(id));
  }
  const triangles = [];
  const edges = new Map();
  for (let i = 0; i < indices.length; i += 3) {
    const tri = indices.slice(i, i + 3).map(id => ids[id]);
    const points = tri.map(id => vertices[id]);
    const normal = cross(vector(points[1], points[0]), vector(points[2], points[0]));
    const length = Math.hypot(...normal);
    if (length < 1e-12) continue;
    const triangle = { ids: tri, points, normal: normal.map(v => v / length) };
    const triangleId = triangles.length;
    triangles.push(triangle);
    for (const [a, b] of [[tri[0], tri[1]], [tri[1], tri[2]], [tri[2], tri[0]]]) {
      const edgeKey = `${Math.min(a, b)}-${Math.max(a, b)}`;
      if (!edges.has(edgeKey)) edges.set(edgeKey, { a, b, triangles: [] });
      edges.get(edgeKey).triangles.push(triangleId);
    }
  }
  return { vertices, triangles, edges: [...edges.values()] };
}

// Visible orthographic feature edges, including smooth silhouettes.
function frontEdges(geometry, bounds) {
  const project = p => [p[2] - bounds.min[2], bounds.max[0] - p[0], p[1]];
  const grid = new Map();
  const cell = 0.3;
  const projected = geometry.triangles.map(t => t.points.map(project));
  projected.forEach((points, id) => {
    const xs = points.map(p => p[0]); const ys = points.map(p => p[1]);
    for (let x = Math.floor(Math.min(...xs) / cell); x <= Math.floor(Math.max(...xs) / cell); ++x) {
      for (let y = Math.floor(Math.min(...ys) / cell); y <= Math.floor(Math.max(...ys) / cell); ++y) {
        const k = `${x},${y}`; if (!grid.has(k)) grid.set(k, []); grid.get(k).push(id);
      }
    }
  });
  function visible(point) {
    const candidates = grid.get(`${Math.floor(point[0] / cell)},${Math.floor(point[1] / cell)}`) || [];
    for (const id of candidates) {
      const [a, b, c] = projected[id];
      const d = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1]);
      if (Math.abs(d) < 1e-10) continue;
      const u = ((b[1] - c[1]) * (point[0] - c[0]) + (c[0] - b[0]) * (point[1] - c[1])) / d;
      const v = ((c[1] - a[1]) * (point[0] - c[0]) + (a[0] - c[0]) * (point[1] - c[1])) / d;
      if (u >= -1e-6 && v >= -1e-6 && u + v <= 1 + 1e-6 && u * a[2] + v * b[2] + (1 - u - v) * c[2] > point[2] + 0.006) return false;
    }
    return true;
  }
  const lines = [];
  for (const edge of geometry.edges) {
    const normals = edge.triangles.map(id => geometry.triangles[id].normal);
    const silhouette = normals.some(normal => normal[1] >= 0) && normals.some(normal => normal[1] < 0);
    const crease = normals.length !== 2 || dot(normals[0], normals[1]) < Math.cos(15 * Math.PI / 180);
    if (!silhouette && !crease) continue;
    const a = project(geometry.vertices[edge.a]); const b = project(geometry.vertices[edge.b]);
    if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.0001) continue;
    if (visible(a.map((v, i) => (v + b[i]) / 2))) lines.push([a.slice(0, 2), b.slice(0, 2)]);
  }
  return lines.map(([a, b]) => `M${n(a[0])},${n(a[1])}L${n(b[0])},${n(b[1])}`).join("");
}

// Intersect the actual triangulated solid with its center plane (Y = 0).
function centerSection(geometry, bounds) {
  const segments = new Map();
  // A sub-micron offset avoids triangles lying exactly on the section plane.
  const planeY = 0.00000037;
  for (const triangle of geometry.triangles) {
    const hits = [];
    for (const [a, b] of [[triangle.points[0], triangle.points[1]], [triangle.points[1], triangle.points[2]], [triangle.points[2], triangle.points[0]]]) {
      if ((a[1] - planeY) * (b[1] - planeY) < 0) {
        const t = (planeY - a[1]) / (b[1] - a[1]);
        hits.push(a.map((v, i) => v + t * (b[i] - v)));
      }
    }
    const unique = [...new Map(hits.map(p => [key(p), p])).values()];
    if (unique.length !== 2) continue;
    const points = unique.map(p => [p[2] - bounds.min[2], bounds.max[0] - p[0]]);
    const a = key(points[0]); const b = key(points[1]);
    if (a !== b) segments.set([a, b].sort().join("|"), { a, b, points });
  }
  const graph = new Map();
  const points = new Map();
  const edges = [...segments.values()];
  edges.forEach((edge, id) => {
    [edge.a, edge.b].forEach((k, i) => { if (!graph.has(k)) graph.set(k, []); graph.get(k).push(id); points.set(k, edge.points[i]); });
  });
  const used = new Set(); const loops = [];
  for (let i = 0; i < edges.length; ++i) {
    if (used.has(i)) continue;
    const first = edges[i].a; let current = first; const loop = [];
    while (true) {
      loop.push(points.get(current));
      const next = (graph.get(current) || []).find(id => !used.has(id));
      if (next === undefined) break;
      used.add(next); current = edges[next].a === current ? edges[next].b : edges[next].a;
      if (current === first) { loops.push(loop); break; }
    }
  }
  if (!loops.length || used.size !== edges.length) throw new Error(`The section contour is incomplete: ${loops.length} loops, ${used.size}/${edges.length} edges, ${[...graph.values()].filter(v => v.length !== 2).length} open nodes.`);
  return loops.map(loop => `M${loop.map(p => `${n(p[0])},${n(p[1])}`).join("L")}Z`).join("");
}

function svgDrawing(front, section, measured, locale) {
  const en = locale === "en";
  const scale = 35;
  const origins = { front: [170, 160], section: [170, 545] };
  const p = (z, x, view = "front") => [origins[view][0] + (z - measured.bounds.min[2]) * scale, origins[view][1] + (measured.bounds.max[0] - x) * scale];
  const fragments = [];
  const add = value => fragments.push(value);
  const line = (a, b, className = "thin") => `<line x1="${n(a[0])}" y1="${n(a[1])}" x2="${n(b[0])}" y2="${n(b[1])}" class="${className}"/>`;
  const label = (x, y, value, anchor = "middle", className = "dimension") => `<text x="${n(x)}" y="${n(y)}" text-anchor="${anchor}" class="${className}">${value}</text>`;
  function horizontal(a, b, y, value) {
    add(line([a[0], a[1] - 3], [a[0], y - 8])); add(line([b[0], b[1] - 3], [b[0], y - 8]));
    add(`<line x1="${n(a[0])}" y1="${y}" x2="${n(b[0])}" y2="${y}" class="thin" marker-start="url(#arrow)" marker-end="url(#arrow)"/>`);
    add(label((a[0] + b[0]) / 2, y - 8, value));
  }
  function vertical(a, b, x, value) {
    add(line([a[0] + 3, a[1]], [x + 8, a[1]])); add(line([b[0] + 3, b[1]], [x + 8, b[1]]));
    add(`<line x1="${x}" y1="${n(a[1])}" x2="${x}" y2="${n(b[1])}" class="thin" marker-start="url(#arrow)" marker-end="url(#arrow)"/>`);
    add(`<text transform="translate(${x - 8},${n((a[1] + b[1]) / 2)}) rotate(-90)" text-anchor="middle" class="dimension">${value}</text>`);
  }
  function leader(point, elbow, value, endX = 670) {
    add(`<path d="M${n(point[0])},${n(point[1])}L${elbow[0]},${elbow[1]}H${endX}" class="thin" marker-start="url(#arrow)"/>`);
    add(label(elbow[0] + 8, elbow[1] - 7, value, "start"));
  }
  add(`<svg xmlns="http://www.w3.org/2000/svg" width="1180" height="850" viewBox="0 0 1180 850" role="img" aria-labelledby="title description">
    <title id="title">${code} — ${en ? "model dimension drawing" : "模型尺寸图"}</title>
    <desc id="description">${en ? "Orthographic view, center section, interface section and model-derived dimensions. No manufacturing tolerances are specified." : "正投影视图、中心剖视图、接口截面及模型几何尺寸；不包含制造公差。"}</desc>
    <defs><marker id="arrow" viewBox="0 0 8 6" refX="0" refY="3" markerWidth="8" markerHeight="6" orient="auto-start-reverse" markerUnits="userSpaceOnUse"><path d="M0 3L8 0L8 6Z" fill="#1b1b1b"/></marker>
    <pattern id="hatch" width="0.2" height="0.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="0.2" stroke="#626262" stroke-width="0.018"/></pattern></defs>
    <style>text{font-family:Arial,'Microsoft YaHei',sans-serif;fill:#1b1b1b}.dimension{font-size:18px}.thin{fill:none;stroke:#1b1b1b;stroke-width:0.9}.outline{fill:none;stroke:#1b1b1b;stroke-width:1.3;vector-effect:non-scaling-stroke}.center{fill:none;stroke:#64717b;stroke-width:0.75;stroke-dasharray:16 4 3 4}.heading{font-size:17px;font-weight:600}.note{font-size:14px;fill:#52606b}.table{font-size:15px}</style>
    <rect width="1180" height="850" fill="white"/><rect x="18" y="18" width="1144" height="814" fill="none" stroke="#8d979f"/>
    <text x="42" y="53" class="heading">${code}  ·  ${en ? "Tee fitting — model dimensions" : "三通接头 · 模型尺寸"}</text>
    <text x="1136" y="53" text-anchor="end" class="note">${en ? "UNIT: mm  /  REFERENCE" : "单位：mm / 模型参考"}</text>
    <path d="M18 72H1162" stroke="#cdd4da"/>
    <g transform="translate(${origins.front.join(" ")}) scale(${scale})"><path d="${front}" class="outline"/></g>
    <g transform="translate(${origins.section.join(" ")}) scale(${scale})"><path d="${section}" fill="url(#hatch)" fill-rule="evenodd" stroke="#1b1b1b" stroke-width="1.3" vector-effect="non-scaling-stroke"/></g>`);
  // Main-view center axes and the section indicators.
  const centerZ = measured.centerZ;
  const frontCenter = p(centerZ, 0);
  add(line([130, frontCenter[1]], [585, frontCenter[1]], "center"));
  add(line([frontCenter[0], 145], [frontCenter[0], 430], "center"));
  horizontal(p(measured.bounds.min[2], 0.7), p(measured.bounds.max[2], 0.7), 101, f(measured.overallLength));
  horizontal(p(measured.bounds.min[2], 0.7), p(centerZ, 1.4), 131, f(measured.centerToEnd));
  horizontal(p(centerZ, 1.4), p(measured.bounds.max[2], 0.7), 131, f(measured.centerToEnd));
  vertical(p(centerZ, measured.bounds.max[0]), p(centerZ, measured.bounds.min[0]), 105, f(measured.overallBranchSpan));
  vertical(p(centerZ, 0), p(centerZ, measured.bounds.min[0]), 600, f(measured.branchCenterToEnd));
  leader(p(-5.4, 1.4), [578, 171], `⌀${f(measured.bodyDiameter)}`);
  leader(p(-0.0292893218813, 0.770710678119), [578, 205], `3×R${f(measured.lipRadius)}`);
  leader(p(-3.853553390593, 1.046446609407), [578, 249], `3×R${f(measured.shoulderRadius)}`);
  leader(p(-1.8, -1), [635, 319], `3×⌀${f(measured.barbDiameter)}`, 730);
  leader(p(-2.6, -0.9), [635, 367], `3×⌀${f(measured.shankDiameter)}`, 730);
  add(label(356, 451, en ? "FRONT VIEW · Y direction" : "主视图 · 沿 Y 方向", "middle", "heading"));
  // Actual center-plane section, showing all three connected bores.
  const sectionCenter = p(centerZ, 0, "section");
  add(line([130, sectionCenter[1]], [585, sectionCenter[1]], "center"));
  add(line([sectionCenter[0], 535], [sectionCenter[0], 804], "center"));
  horizontal(p(-3.5, -0.9, "section"), p(0, -0.7, "section"), 529, `3×${f(measured.hoseEndToFillet)}`);
  leader(p(-0.7, -0.6, "section"), [626, 623], `3×⌀${f(measured.boreDiameter)}`, 735);
  leader(p(-1.525252258054, -0.9, "section"), [626, 675], `3×${f(measured.barbAngle)}°`, 735);
  add(label(356, 804, en ? "SECTION A–A · Y = 0" : "剖视 A–A · Y = 0", "middle", "heading"));
  // The interface section uses the verified coaxial cylindrical radii.
  const cx = 928; const cy = 233; const circleScale = 78;
  add(`<circle cx="${cx}" cy="${cy}" r="${tip.radius * circleScale}" fill="url(#portHatch)" stroke="#1b1b1b" stroke-width="1.3"/>
    <circle cx="${cx}" cy="${cy}" r="${bore.radius * circleScale}" fill="white" stroke="#1b1b1b" stroke-width="1.3"/>`);
  add(line([830, cy], [1026, cy], "center")); add(line([cx, 136], [cx, 330], "center"));
  horizontal([cx - tip.radius * circleScale, cy - 2], [cx + tip.radius * circleScale, cy - 2], 128, `⌀${f(measured.tipDiameter)}`);
  leader([cx + bore.radius * circleScale / Math.sqrt(2), cy + bore.radius * circleScale / Math.sqrt(2)], [1008, 338], `⌀${f(measured.boreDiameter)}`, 1126);
  add(label(cx, 383, en ? "INTERFACE SECTION B–B" : "接口截面 B–B", "middle", "heading"));
  add(label(cx, 406, en ? "Straight tip section, Z = −0.70" : "端部直管段，Z = −0.70", "middle", "note"));
  const rows = en ? [
    ["Main span", f(measured.overallLength)], ["Branch overall span", f(measured.overallBranchSpan)],
    ["Center to each tube end", f(measured.centerToEnd)], ["Tube end to root fillet", f(measured.hoseEndToFillet)],
    ["Flow bore · 3 ports", `⌀${f(measured.boreDiameter)}`], ["Straight tip · 3 ports", `⌀${f(measured.tipDiameter)}`],
    ["Barb crest · 3 ports", `⌀${f(measured.barbDiameter)}`], ["Tube shank · 3 ports", `⌀${f(measured.shankDiameter)}`],
    ["Central body", `⌀${f(measured.bodyDiameter)}`], ["Root fillet", `R${f(measured.shoulderRadius)}`],
    ["Tip round", `R${f(measured.lipRadius)}`], ["Barb taper half-angle", `${f(measured.barbAngle)}°`],
  ] : [
    ["两端总长", f(measured.overallLength)], ["支路外形总长", f(measured.overallBranchSpan)],
    ["中心至各端面", f(measured.centerToEnd)], ["端面至根部圆角起点", f(measured.hoseEndToFillet)],
    ["流道孔径 · 3 处", `⌀${f(measured.boreDiameter)}`], ["端部直管外径 · 3 处", `⌀${f(measured.tipDiameter)}`],
    ["倒刺峰值外径 · 3 处", `⌀${f(measured.barbDiameter)}`], ["接管段外径 · 3 处", `⌀${f(measured.shankDiameter)}`],
    ["主体外径", `⌀${f(measured.bodyDiameter)}`], ["根部圆角", `R${f(measured.shoulderRadius)}`],
    ["端部圆角", `R${f(measured.lipRadius)}`], ["倒刺锥面半角", `${f(measured.barbAngle)}°`],
  ];
  add(`<rect x="802" y="449" width="324" height="323" fill="white" stroke="#9da7af"/>
    <rect x="802" y="449" width="324" height="29" fill="#f1f4f6"/>
    <text x="815" y="469" class="table" font-weight="600">${en ? "MODEL FEATURE" : "模型几何尺寸"}</text>
    <text x="1111" y="469" text-anchor="end" class="table" font-weight="600">mm</text>`);
  rows.forEach(([name, value], i) => {
    const y = 498 + i * 24;
    add(`<path d="M802 ${y + 8}H1126" stroke="#dce1e5"/>`);
    add(label(815, y, name, "start", "table")); add(label(1111, y, value, "end", "table"));
  });
  add(`<text x="1136" y="813" text-anchor="end" class="note">${en ? "MODEL GEOMETRY ONLY · MANUFACTURING TOLERANCES NOT PROVIDED" : "模型几何参考尺寸 · 未提供制造公差"}</text></svg>`);
  return fragments.join("\n").replace('fill="url(#portHatch)"', 'fill="#f4f5f6"');
}

async function main() {
  const occt = await createOcct();
  const result = occt.ReadStepFile(input, { linearUnit: "millimeter", linearDeflectionType: "absolute_value", linearDeflection: 0.003, angularDeflection: 0.12 });
  if (!result.success || result.meshes.length !== 1) throw new Error("Expected one verified part for this test drawing.");
  const geometry = meshGeometry(result.meshes[0]);
  const bounds = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
  geometry.vertices.forEach(p => p.forEach((v, i) => { bounds.min[i] = Math.min(bounds.min[i], v); bounds.max[i] = Math.max(bounds.max[i], v); }));
  const measured = {
    sourceFile: `${code}.stp`, sourceSha256: crypto.createHash("sha256").update(input).digest("hex"), unit: "mm", bounds,
    centerZ: branchBore.center[2], overallLength: bounds.max[2] - bounds.min[2], overallBranchSpan: bounds.max[0] - bounds.min[0],
    centerToEnd: bounds.max[2] - branchBore.center[2], branchCenterToEnd: -bounds.min[0],
    hoseEndToFillet: bounds.max[2] - shoulder.center[2], boreDiameter: bore.radius * 2, tipDiameter: tip.radius * 2,
    shankDiameter: shank.radius * 2, barbDiameter: crest.radius * 2, bodyDiameter: body.radius * 2,
    shoulderRadius: shoulder.minorRadius, lipRadius: lip.minorRadius, barbAngle: cone.minorRadius,
    featureEntities: { bore: bore.id, branchBore: branchBore.id, tip: tip.id, shank: shank.id, crest: crest.id,
      body: body.id, shoulder: shoulder.id, lip: lip.id, cone: cone.id }, manufacturingTolerances: null,
  };
  const front = frontEdges(geometry, bounds);
  const section = centerSection(geometry, bounds);
  for (const locale of ["zh", "en"]) fs.writeFileSync(path.join(assetDir, `${code}-dimensions.${locale}.svg`), svgDrawing(front, section, measured, locale));
  fs.writeFileSync(path.join(assetDir, `${code}-measurements.json`), JSON.stringify(measured, null, 2) + "\n");
  console.log(JSON.stringify({ ...measured, vertices: geometry.vertices.length, frontPathBytes: front.length, sectionPathBytes: section.length }, null, 2));
}
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
