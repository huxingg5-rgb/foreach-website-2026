// Usage: node scripts/products/build-pvc-tubing-delivery-images.cjs <original-uploads-directory>
// Manufacturing and packaging photographs keep their full content and original colors.
/* eslint-disable @typescript-eslint/no-require-imports -- This asset build script runs as CommonJS. */
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const sharp = require("sharp");
const manifest = require("../../data/products/tubing/pvc-delivery-photos.zh.json");

const repo = path.resolve(__dirname, "../..");
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");

async function main() {
  const sourceDirectory = process.argv[2];
  if (!sourceDirectory) throw new Error("Provide the directory containing the original tubing photographs");
  const outputDirectory = path.join(repo, "public", manifest.imageRoot);
  const outputs = [];

  for (const [key, photo] of Object.entries(manifest.photos)) {
    const original = await fs.readFile(path.join(sourceDirectory, photo.source));
    const source = await sharp(original).metadata();
    const bytes = await sharp(original).rotate()
      .resize(photo.width, photo.height, { fit: "contain", background: "#ffffff", withoutEnlargement: true })
      .webp({ quality: 92, effort: 6 }).toBuffer();
    const metadata = await sharp(bytes).metadata();
    if (metadata.format !== "webp" || metadata.width !== photo.width || metadata.height !== photo.height) {
      throw new Error(`Invalid PVC delivery photograph: ${key}`);
    }
    outputs.push({
      key, bytes, filename: photo.filename,
      source: photo.source, sourceWidth: source.width, sourceHeight: source.height,
      width: metadata.width, height: metadata.height, format: metadata.format,
      sourceSha256: hash(original), sha256: hash(bytes),
    });
  }

  await fs.mkdir(outputDirectory, { recursive: true });
  for (const output of outputs) {
    await fs.writeFile(path.join(outputDirectory, output.filename), output.bytes);
  }
  console.log(JSON.stringify(outputs.map(({ bytes, ...output }) => ({
    ...output, file: manifest.imageRoot + output.filename, bytes: bytes.length,
  })), null, 2));
}

main().catch(error => { console.error(error); process.exitCode = 1; });
