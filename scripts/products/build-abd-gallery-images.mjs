// Usage: node scripts/products/build-abd-gallery-images.mjs <source-image-directory>
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const gallery = JSON.parse(await fs.readFile(new URL("../../data/products/detail/abd-gallery.json", import.meta.url), "utf8"));

async function main() {
  const sourceDir = process.argv[2];
  if (!sourceDir) throw new Error("Provide the directory containing 91.JPG, 93.JPG and 92.JPG");
  const outputDir = path.resolve(scriptDir, "../../public/images/products/control");
  await fs.mkdir(outputDir, { recursive: true });
  for (const photo of gallery.photos) {
    const input = path.join(sourceDir, photo.source);
    const output = path.join(outputDir, photo.filename);
    const original = await sharp(input).metadata();
    await sharp(input).rotate().flatten({ background: "#ffffff" })
      .resize(gallery.width, gallery.height, { fit: "contain", background: "#ffffff" })
      .webp({ quality: 95, effort: 6 }).toFile(output);
    const result = await sharp(output).metadata();
    if (result.format !== "webp" || result.width !== gallery.width || result.height !== gallery.height) {
      throw new Error(`Invalid gallery image: ${output}`);
    }
    console.log(`${photo.source} (${original.width}x${original.height}) -> ${photo.filename}: WebP ${result.width}x${result.height}`);
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
