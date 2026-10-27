// Rebuild the approved primary/card photos without touching historical images.
// Usage: node scripts/products/build-diaphragm-primary-photos.cjs <source-directory> [model]
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const photos = require("../../data/products/detail/diaphragm-pump-primary-photos.json");

async function main() {
  const sourceDirectory = process.argv[2];
  if (!sourceDirectory) throw new Error("Provide the directory containing the approved JPG source photos.");
  const root = path.resolve(__dirname, "../..");
  const selectedModel = process.argv[3];
  for (const photo of Object.values(photos)) {
    if (selectedModel && photo.model !== selectedModel) continue;
    const source = fs.readFileSync(photo.sourcePublic
      ? path.join(root, "public", photo.sourcePublic)
      : path.join(sourceDirectory, photo.sourceFile));
    for (const [url, width, height] of [[photo.main, 1500, 1500], [photo.card, 2000, 1500]]) {
      const destination = path.join(root, "public", url);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      await sharp(source).rotate().flatten({ background: "#ffffff" })
        .resize(width, height, { fit: "contain", background: "#ffffff" })
        .webp({ quality: 95, effort: 6 }).toFile(destination);
      const metadata = await sharp(destination).metadata();
      if (metadata.format !== "webp" || metadata.width !== width || metadata.height !== height) {
        throw new Error(`Unexpected encoding or dimensions: ${destination}`);
      }
      console.log(`${photo.model}: ${width}x${height} WebP ${url}`);
    }
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
