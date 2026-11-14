// Usage: node scripts/products/build-fep-assembly-selection-media.cjs
// Crop only the selected original panels; preserve technical marks and proportions.
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const { pathToFileURL } = require("node:url");
const sharp = require("sharp");
const { createCanvas } = require("@napi-rs/canvas");

const repo = path.resolve(__dirname, "../..");
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const publicPath = src => path.join(repo, "public", src);

async function main() {
  const manifestFile = path.join(repo, "data/products/tubing-assemblies/fep-selection-media.zh.json");
  const manifestBefore = await fs.readFile(manifestFile);
  const media = JSON.parse(manifestBefore.toString("utf8"));
  const manualBytes = await fs.readFile(path.join(repo, media.manual.path));
  if (hash(manualBytes) !== media.manual.sha256) throw new Error("Handbook changed; inspect the selected panels before rebuilding");
  const dimensionsFile = path.join(repo, "data/products/tubing-assemblies/media-dimensions.json");
  const dimensionsBefore = await fs.readFile(dimensionsFile);
  const dimensions = JSON.parse(dimensionsBefore.toString("utf8"));
  const pdfjs = await import(pathToFileURL(require.resolve("pdfjs-dist/legacy/build/pdf.mjs")).href);
  const pdfRoot = path.dirname(require.resolve("pdfjs-dist/package.json"));
  const document = await pdfjs.getDocument({
    data: new Uint8Array(manualBytes), useSystemFonts: true,
    cMapUrl: `${pdfRoot.replaceAll("\\", "/")}/cmaps/`, cMapPacked: true,
    standardFontDataUrl: `${pdfRoot.replaceAll("\\", "/")}/standard_fonts/`,
  }).promise;
  const rendered = new Map();
  const outputs = [];
  try {
    for (const [key, image] of Object.entries(media.images)) {
      let original;
      let bytes;
      if (image.source.kind === "existing") {
        original = bytes = await fs.readFile(publicPath(image.src));
      } else {
        if (image.source.kind === "manual") {
          if (!rendered.has(image.source.page)) {
            const page = await document.getPage(image.source.page);
            const viewport = page.getViewport({ scale: 8 });
            const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
            await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
            rendered.set(image.source.page, canvas.toBuffer("image/png"));
          }
          original = rendered.get(image.source.page);
        } else original = await fs.readFile(path.join(repo, image.source.path));
        const input = await sharp(original).metadata();
        const [x, y, width, height] = image.source.crop;
        const panel = await sharp(original).extract({
          left: Math.round(x * input.width), top: Math.round(y * input.height),
          width: Math.round(width * input.width), height: Math.round(height * input.height),
        }).toBuffer();
        // These technical figures follow their content ratio, as requested. Remove
        // empty paper/canvas margins without trimming labels or stretching parts.
        const trimmed = await sharp(panel).flatten({ background: "#ffffff" })
          .trim({ background: "#ffffff", threshold: 8 }).toBuffer();
        const padding = image.padding ?? media.padding;
        bytes = await sharp(trimmed)
          .resize({ width: media.maxWidth - padding * 2 })
          .extend({ top: padding, right: padding, bottom: padding, left: padding, background: "#ffffff" })
          .webp({ lossless: true, effort: 6 }).toBuffer();
      }
      const metadata = await sharp(bytes).metadata();
      if (metadata.format !== "webp" || metadata.width !== media.maxWidth || !metadata.height) {
        throw new Error(`Invalid selection image: ${image.src}`);
      }
      image.width = metadata.width;
      image.height = metadata.height;
      dimensions[image.src] = { width: metadata.width, height: metadata.height };
      outputs.push({ key, image, bytes, original });
    }
    if (hash(await fs.readFile(dimensionsFile)) !== hash(dimensionsBefore)) throw new Error("Dimensions changed during processing; rebuild against the current file");
    if (hash(await fs.readFile(manifestFile)) !== hash(manifestBefore)) throw new Error("Selection manifest changed during processing; rebuild against the current file");
    for (const { image, bytes } of outputs) {
      if (image.source.kind === "existing") continue; // Reuse compliant WebP originals without re-encoding.
      await fs.mkdir(path.dirname(publicPath(image.src)), { recursive: true });
      await fs.writeFile(publicPath(image.src), bytes);
    }
    const lineEnding = dimensionsBefore.includes(Buffer.from("\r\n")) ? "\r\n" : "\n";
    await fs.writeFile(dimensionsFile, JSON.stringify(dimensions, null, 2).replace(/\n/g, lineEnding) + lineEnding);
    const manifestEnding = manifestBefore.includes(Buffer.from("\r\n")) ? "\r\n" : "\n";
    await fs.writeFile(manifestFile, JSON.stringify(media, null, 2).replace(/\n/g, manifestEnding) + manifestEnding);
    console.log(JSON.stringify(outputs.map(({ key, image, bytes, original }) => ({
      key, src: image.src, source: image.source, width: image.width, height: image.height,
      format: "webp", bytes: bytes.length, sha256: hash(bytes),
      sourceSha256: image.source.kind === "manual" ? hash(manualBytes) : hash(original),
    })), null, 2));
  } finally { await document.destroy(); }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
