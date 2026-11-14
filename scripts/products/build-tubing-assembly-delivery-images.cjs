// Usage: node scripts/products/build-tubing-assembly-delivery-images.cjs <source-directory> [photo-key ...]
// Source filenames are defined in fep-delivery-photos.zh.json. Omit keys to build all photographs.
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const sharp = require("sharp");
const delivery = require("../../data/products/tubing-assemblies/fep-delivery-photos.zh.json");

const repo = path.resolve(__dirname, "../..");
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");

async function main() {
  const sourceDirectory = process.argv[2];
  if (!sourceDirectory) throw new Error("Provide the directory containing the tubing assembly delivery photographs");
  const requestedKeys = process.argv.slice(3);
  const selectedKeys = requestedKeys.length ? requestedKeys : Object.keys(delivery.photos);
  const selectedPhotos = selectedKeys.map(key => {
    if (!Object.hasOwn(delivery.photos, key)) throw new Error(`Unknown delivery photograph: ${key}`);
    return delivery.photos[key];
  });
  const outputDirectory = path.join(repo, "public", delivery.imageRoot);
  const dimensionsFile = path.join(repo, "data/products/tubing-assemblies/media-dimensions.json");
  const dimensionsBefore = await fs.readFile(dimensionsFile);
  const dimensions = JSON.parse(dimensionsBefore.toString("utf8"));
  const outputs = [];

  // Inspection photographs fill 4:3 frames; other photographs retain padding.
  // Example diagrams preserve their original dimensions and lossless text.
  for (const photo of selectedPhotos) {
    const original = await fs.readFile(path.join(sourceDirectory, photo.source));
    const input = await sharp(original).metadata();
    const width = photo.width ?? delivery.width;
    const height = photo.height ?? delivery.height;
    const fit = photo.fit ?? "contain";
    const bytes = await sharp(original).rotate()
      .resize(width, height, { fit, background: "#ffffff", withoutEnlargement: fit !== "cover" })
      .webp(photo.lossless ? { lossless: true, effort: 6 } : { quality: 90, effort: 6 }).toBuffer();
    const metadata = await sharp(bytes).metadata();
    if (metadata.format !== "webp" || metadata.width !== width || metadata.height !== height) {
      throw new Error(`Invalid delivery image: ${photo.filename}`);
    }
    dimensions[delivery.imageRoot + photo.filename] = { width: metadata.width, height: metadata.height };
    outputs.push({ photo, original, input, bytes, width, height });
  }

  if (hash(await fs.readFile(dimensionsFile)) !== hash(dimensionsBefore)) {
    throw new Error("Image dimensions changed during processing; rerun against the current file");
  }
  await fs.mkdir(outputDirectory, { recursive: true });
  for (const { photo, bytes } of outputs) {
    await fs.writeFile(path.join(outputDirectory, photo.filename), bytes);
  }
  const lineEnding = dimensionsBefore.includes(Buffer.from("\r\n")) ? "\r\n" : "\n";
  await fs.writeFile(dimensionsFile, JSON.stringify(dimensions, null, 2).replace(/\n/g, lineEnding) + lineEnding);
  console.log(JSON.stringify(outputs.map(({ photo, original, input, bytes, width, height }) => ({
    source: photo.source,
    sourceWidth: input.width,
    sourceHeight: input.height,
    file: delivery.imageRoot + photo.filename,
    width,
    height,
    format: "webp",
    sourceSha256: hash(original),
    sha256: hash(bytes),
    bytes: bytes.length,
  })), null, 2));
}

main().catch(error => { console.error(error); process.exitCode = 1; });
