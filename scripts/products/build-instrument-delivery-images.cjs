/**
 * Import the user-supplied delivery photos, retaining their complete contents.
 * node scripts/products/build-instrument-delivery-images.cjs \
 *   --source-root <originals-or-delivery-sources> --work-dir <archive-and-report>
 * These are packaging illustrations in the existing 4:3 delivery layout,
 * separate from the square product gallery. Never crop labels or watermarks.
 */
/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS asset builder. */
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { parseArgs } = require("node:util");
const sharp = require("sharp");
const groups = require("../../data/products/detail/instrument-delivery-photos.zh.json");

async function main() {
  const { values } = parseArgs({ options: {
    "source-root": { type: "string" },
    "work-dir": { type: "string" },
  }});
  if (!values["source-root"] || !values["work-dir"]) {
    throw new Error("Both --source-root and --work-dir are required.");
  }
  const root = path.resolve(__dirname, "../..");
  const sourceRoot = path.resolve(values["source-root"]);
  const workDir = path.resolve(values["work-dir"]);
  const archive = path.join(workDir, "delivery-sources");
  const records = Object.entries(groups).flatMap(([group, config]) =>
    config.rows.flatMap(row => row.photos.map(photo => ({
      group, ...photo, url: config.imageRoot + photo.file,
      sourcePath: path.join(sourceRoot, photo.source),
      target: path.join(root, "public", config.imageRoot, photo.file),
    }))));
  // Validate every input before changing the website assets.
  for (const record of records) {
    if (!fs.existsSync(record.sourcePath)) throw new Error(`Missing source: ${record.sourcePath}`);
    if (!record.target.startsWith(path.join(root, "public", "images", "products") + path.sep)) {
      throw new Error(`Unexpected asset path: ${record.target}`);
    }
  }
  fs.mkdirSync(archive, { recursive: true });
  for (const record of records) {
    const input = fs.readFileSync(record.sourcePath);
    const savedSource = path.join(archive, record.source);
    if (savedSource !== record.sourcePath) fs.copyFileSync(record.sourcePath, savedSource);
    const sourceInfo = await sharp(input).metadata();
    fs.mkdirSync(path.dirname(record.target), { recursive: true });
    await sharp(input).rotate().resize(1500, 1125, {
      fit: "contain", background: "#ffffff",
    }).webp({ quality: 95, effort: 6 }).toFile(record.target);
    const decoded = await sharp(record.target).metadata();
    if (decoded.format !== "webp" || decoded.width !== 1500 || decoded.height !== 1125) {
      throw new Error(`Invalid delivery image: ${record.target}`);
    }
    record.sourceArchive = savedSource;
    record.sourceSha256 = crypto.createHash("sha256").update(input).digest("hex");
    record.sourceDimensions = [sourceInfo.width, sourceInfo.height];
    record.dimensions = [decoded.width, decoded.height];
    record.bytes = fs.statSync(record.target).size;
    delete record.sourcePath;
  }
  fs.mkdirSync(workDir, { recursive: true });
  fs.writeFileSync(path.join(workDir, "delivery-image-manifest.json"), JSON.stringify(records, null, 2) + "\n");
  console.log(JSON.stringify({ groups: Object.keys(groups).length, images: records.length,
    bytes: records.reduce((sum, image) => sum + image.bytes, 0), report: workDir }));
}

main().catch(error => { console.error(error); process.exitCode = 1; });
