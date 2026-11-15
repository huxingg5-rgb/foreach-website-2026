import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { gunzipSync } from "node:zlib";
import { assemblyFittings } from "../../data/products/configurator/tubing-assembly-catalog";
import { decodeCompactCad } from "./solenoid-viewer/compact-cad.js";
import vectorParts from "../../data/products/configurator/tubing-assembly-vector-parts.json";

// Source PDFs use page points and different drawing scales. Calibrate their
// original paths against the matching, approved CAD in millimetres; never
// infer physical dimensions from an arbitrary display box.
const result: Record<string, { width: number; height: number; sourceSha256: string; millimetresPerUnit?: number }> = {};
for (const url of [...new Set(assemblyFittings.map(f => f.cadUrl).filter((url): url is string => Boolean(url)))].sort()) {
  const bytes = readFileSync(resolve("public", url.slice(1)));
  const data = decodeCompactCad(new Uint8Array(bytes[0] === 31 ? gunzipSync(bytes) : bytes));
  const [rx, ry, rz] = data.rotationEuler || [0, 0, 0];
  const [sx, cx, sy, cy, sz, cz] = [Math.sin(rx), Math.cos(rx), Math.sin(ry), Math.cos(ry), Math.sin(rz), Math.cos(rz)];
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const mesh of data.meshes) {
    const points = mesh.attributes.position.array;
    for (let i = 0; i < points.length; i += 3) {
      // The source's XYZ Euler matrix applies Z, Y, then X to each vertex.
      const x1 = cz * points[i] - sz * points[i + 1], y1 = sz * points[i] + cz * points[i + 1];
      const x2 = cy * x1 + sy * points[i + 2], z2 = -sy * x1 + cy * points[i + 2];
      const axial = cx * y1 - sx * z2, radial = -x2;
      minX = Math.min(minX, axial); maxX = Math.max(maxX, axial);
      minY = Math.min(minY, radial); maxY = Math.max(maxY, radial);
    }
  }
  const width = Number((maxX - minX).toFixed(6)), height = Number((maxY - minY).toFixed(6));
  if (!(width > 0 && height > 0)) throw new Error(`Invalid CAD extents: ${url}`);
  result[url] = { width, height, sourceSha256: createHash("sha256").update(bytes).digest("hex") };
}
const pdfParts = vectorParts as Record<string, { width: number; height: number }>;
// Title block visually checked against the original HNE drawing. This SKU has
// no approved CAD; its 5:1 PDF is the dimensional source (16.5 x 9.4 mm).
const reviewedScales: Record<string, number> = { "/downloads/products/fittings/2d-drawings/01/443-02-00690-c.pdf": 5 };
for (const fitting of assemblyFittings) {
  const url = fitting.drawingUrl, part = url && pdfParts[url];
  if (!url || !part || result[url]) continue;
  const size = fitting.cadUrl && result[fitting.cadUrl];
  const proposed = size ? part.width / size.width * 25.4 / 72 : undefined;
  const scale = reviewedScales[url] || (proposed && [.5, 1, 2, 2.5, 4, 5, 10].find(s => Math.abs(proposed / s - 1) < .01));
  if (!scale) continue;
  const millimetresPerUnit = 25.4 / (72 * scale);
  // A rotated hexagonal grip can have a different radial silhouette in CAD.
  // The declared PDF scale applies uniformly to both axes, without stretching.
  if (size && Math.abs(part.height * millimetresPerUnit / size.height - 1) > .2) continue;
  const bytes = readFileSync(resolve("public", url.slice(1)));
  result[url] = { width: part.width * millimetresPerUnit, height: part.height * millimetresPerUnit, millimetresPerUnit, sourceSha256: createHash("sha256").update(bytes).digest("hex") };
}
const target = resolve("data/products/configurator/tubing-assembly-drawing-units.json");
const content = JSON.stringify(result, null, 2) + "\n";
if (process.argv.includes("--check")) {
  if (readFileSync(target, "utf8") !== content) throw new Error("Drawing unit calibration is out of date.");
} else writeFileSync(target, content);
console.log(`PASS: ${Object.keys(result).filter(u => !u.endsWith(".pdf")).length} approved CAD profiles and ${Object.keys(result).filter(u => u.endsWith(".pdf")).length} original PDF views calibrated in millimetres.`);
