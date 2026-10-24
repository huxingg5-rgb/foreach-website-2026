// Usage: node scripts/products/build-tm-gallery-images.cjs <source-image-directory>
const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");
const photos = require("../../data/products/detail/tm-pump-gallery.json");

async function main() {
  const sourceDir = process.argv[2];
  if (!sourceDir) throw new Error("Provide the directory containing 02.png through 06.png");
  const outputDir = path.resolve(__dirname, "../../public/images/products/pumps/plunger-pump/tm");
  await fs.mkdir(outputDir, { recursive: true });
  for (const photo of photos) {
    const input = path.join(sourceDir, photo.source);
    const output = path.join(outputDir, photo.filename);
    const original = await sharp(input).metadata();
    await sharp(input).rotate().flatten({ background: "#ffffff" })
      .resize(1500, 1500, { fit: "contain", background: "#ffffff" })
      .webp({ quality: 95, effort: 6 }).toFile(output);
    const result = await sharp(output).metadata();
    if (result.format !== "webp" || result.width !== 1500 || result.height !== 1500) {
      throw new Error(`Invalid gallery image: ${output}`);
    }
    console.log(`${photo.source} (${original.width}x${original.height}) -> ${photo.filename}: WebP 1500x1500`);
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
