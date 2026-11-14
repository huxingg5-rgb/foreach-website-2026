// Usage: node scripts/products/build-ea-gallery-images.mjs <source-image-directory>
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repository = path.resolve(scriptDirectory, "../..");
const photos = JSON.parse(await fs.readFile(path.join(repository, "data/products/detail/ea-pump-gallery.json"), "utf8"));
const matteDirectory = path.join(scriptDirectory, "image-sources/ea-gallery");
const backgrounds = JSON.parse(await fs.readFile(path.join(matteDirectory, "backgrounds.json"), "utf8"));
const sourceDirectory = process.argv[2];
if (!sourceDirectory) throw new Error("Provide the directory containing the original EA series photographs");
const outputDirectory = path.join(repository, "public/images/products/pumps/plunger-pump/ea/gallery");
await fs.mkdir(outputDirectory, { recursive: true });

for (const photo of photos) {
  const input = path.join(sourceDirectory, photo.source);
  const output = path.join(outputDirectory, photo.filename);
  const background = backgrounds.find((entry) => entry.source === photo.source);
  if (!background) throw new Error(`Missing foreground matte: ${photo.source}`);
  // Reconstruct the original gallery raster before changing its backdrop. The matte
  // supplies coverage only; all product color and detail comes from the photograph.
  const original = await sharp(input).rotate().extract(photo.crop).flatten({ background: "#ffffff" })
    .resize(photo.width, photo.height, { fit: "contain", background: "#ffffff" })
    .webp({ quality: 95, effort: 6 }).toBuffer();
  const rgb = await sharp(original).removeAlpha().raw().toBuffer();
  const maskMetadata = await sharp(path.join(matteDirectory, background.mask)).metadata();
  if (maskMetadata.width !== photo.width || maskMetadata.height !== photo.height) {
    throw new Error(`Foreground matte dimensions differ from the photograph: ${background.mask}`);
  }
  const matte = await sharp(path.join(matteDirectory, background.mask)).greyscale().raw().toBuffer();
  let highlightMask;
  if (background.highlights) {
    const highlightPath = path.join(matteDirectory, background.highlights.mask);
    const highlightMetadata = await sharp(highlightPath).metadata();
    if (highlightMetadata.width !== photo.width || highlightMetadata.height !== photo.height) {
      throw new Error(`Highlight matte dimensions differ from the photograph: ${background.highlights.mask}`);
    }
    if (!Number.isFinite(background.highlights.strength) || background.highlights.strength < 0 || background.highlights.strength > 24) {
      throw new Error(`Invalid local highlight correction: ${photo.source}`);
    }
    highlightMask = await sharp(highlightPath).greyscale().raw().toBuffer();
  }
  const pixels = Buffer.alloc(rgb.length);
  for (let y = 0; y < photo.height; y++) {
    for (let x = 0; x < photo.width; x++) {
      const p = y * photo.width + x;
      let shadow = 0;
      for (const [cx, baseY, width] of background.shadows) {
        const dx = (x - cx) / (width * 0.6);
        const dy = (y - baseY - 6) / 23;
        const contactX = (x - cx) / (width * 0.45);
        const contactY = (y - baseY - 2) / 8;
        shadow += 18 * Math.exp(-2 * (dx * dx + dy * dy));
        shadow += 24 * Math.exp(-2 * (contactX * contactX + contactY * contactY));
      }
      const whiteBackdrop = 255 - Math.min(48, shadow);
      const alpha = matte[p] / 255;
      // The nearly clipped white plastic loses its outline against a white backdrop.
      // A bounded correction changes only selected highlights, preserving the original
      // shape and texture. Labels, metal screws, acrylic parts and shadows are excluded.
      const luminance = (rgb[p * 3] + rgb[p * 3 + 1] + rgb[p * 3 + 2]) / 3;
      const highlightWeight = Math.max(0, Math.min(1, (luminance - 195) / 50));
      const gain = highlightMask
        ? 1 - background.highlights.strength * (highlightMask[p] / 255) * highlightWeight / 255
        : 1;
      for (let channel = 0; channel < 3; channel++) {
        pixels[p * 3 + channel] = Math.round(rgb[p * 3 + channel] * gain * alpha + whiteBackdrop * (1 - alpha));
      }
    }
  }
  // Lossless encoding prevents background cleanup from recompressing labels,
  // barcodes, acrylic details, locally corrected white heads, and original wire colors.
  await sharp(pixels, { raw: { width: photo.width, height: photo.height, channels: 3 } })
    .webp({ lossless: true, effort: 6 }).toFile(output);
  const metadata = await sharp(output).metadata();
  if (metadata.format !== "webp" || metadata.width !== 1500 || metadata.height !== 1500) {
    throw new Error(`Invalid square gallery asset: ${photo.filename}`);
  }
  console.log(JSON.stringify({ file: photo.filename, format: metadata.format, width: metadata.width, height: metadata.height }));
}

// The materials section uses a tighter composition; keep the square gallery master intact.
const materialsDirectory = path.join(repository, "public/images/products/pumps/plunger-pump/ea/selection");
await fs.mkdir(materialsDirectory, { recursive: true });
await sharp(path.join(outputDirectory, "foreach-ea-piston-pumps-five-configurations.webp"))
  .extract({ left: 0, top: 300, width: 1500, height: 880 })
  .webp({ lossless: true, effort: 6 })
  .toFile(path.join(materialsDirectory, "ea-pump-materials-configurations-cropped.webp"));
