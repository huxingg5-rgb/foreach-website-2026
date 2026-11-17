/** Number original engineering annotations; localize their legends in HTML.
 * No product, connection, flow path, pin or dimension is redrawn.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const { replacements, crops } = JSON.parse(fs.readFileSync(path.join(root, "data/products/detail/instrument-guide-locales/figure-masks.json"), "utf8"));
const workArgument = process.argv.indexOf("--work-dir");
if (workArgument < 0 || !process.argv[workArgument + 1]) throw new Error("--work-dir is required");
const work = path.resolve(process.argv[workArgument + 1]);
const sourceDir = path.join(root, "public/images/products/detail-guides/zh");
const outputDir = path.join(root, "public/images/products/detail-guides/instrument-intl");
const escape = value => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

(async () => {
  fs.mkdirSync(outputDir, { recursive: true }); fs.mkdirSync(work, { recursive: true });
  const records = [], dimensions = {};
  for (const [filename, labels] of Object.entries(replacements)) {
    const source = path.join(sourceDir, filename);
    const { data: original, info } = await sharp(source).flatten({ background: "white" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width, height } = info;
    const boxes = labels.map(item => item[0]);
    const markup = labels.map(([box, label, background = "white", foreground = "#173368"]) => {
      const [x1, y1, x2, y2] = box;
      const size = Math.min(38, y2 - y1 - 8, (x2 - x1 - 8) / Math.max(1, String(label).length * 0.7));
      return `<rect x="${x1}" y="${y1}" width="${x2 - x1 + 1}" height="${y2 - y1 + 1}" fill="${background}"/>` +
        (label ? `<text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2}" text-anchor="middle" dominant-baseline="central" font-family="Segoe UI,Arial,sans-serif" font-size="${size}" fill="${foreground}">${escape(label)}</text>` : "");
    }).join("");
    const svg = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${markup}</svg>`);
    const edited = markup ? await sharp(original, { raw: { width, height, channels: 3 } }).composite([{ input: svg }]).removeAlpha().raw().toBuffer() : original;
    let outside = 0;
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const offset = (y * width + x) * 3;
      if (original[offset] === edited[offset] && original[offset + 1] === edited[offset + 1] && original[offset + 2] === edited[offset + 2]) continue;
      if (!boxes.some(([x1, y1, x2, y2]) => x >= x1 && x <= x2 && y >= y1 && y <= y2)) outside++;
    }
    if (outside) throw new Error(`${filename}: ${outside} changed pixels outside annotation masks`);
    const crop = crops[filename];
    let raster = sharp(edited, { raw: { width, height, channels: 3 } });
    if (crop) raster = raster.extract({ left: crop[0], top: crop[1], width: crop[2] - crop[0], height: crop[3] - crop[1] });
    const { data: expected, info: outputInfo } = await raster.raw().toBuffer({ resolveWithObject: true });
    const target = path.join(outputDir, filename);
    await sharp(expected, { raw: { width: outputInfo.width, height: outputInfo.height, channels: 3 } }).webp({ lossless: true, effort: 6 }).toFile(target);
    const decoded = await sharp(target).removeAlpha().raw().toBuffer();
    if (!expected.equals(decoded)) throw new Error(`${filename}: lossless verification failed`);
    dimensions[filename] = { width: outputInfo.width, height: outputInfo.height };
    records.push({ file: filename, sourceSha256: crypto.createHash("sha256").update(fs.readFileSync(source)).digest("hex"), annotationMasks: boxes, crop, outsideMaskDifference: 0, lossless: true });
  }
  fs.writeFileSync(path.join(root, "data/products/detail/instrument-guide-figures.intl.generated.json"), JSON.stringify(dimensions, null, 2) + "\n");
  fs.writeFileSync(path.join(work, "neutral-figure-verification.json"), JSON.stringify(records, null, 2) + "\n");
  console.log(JSON.stringify({ figures: records.length, geometryDifferences: 0 }));
})().catch(error => { console.error(error); process.exitCode = 1; });
