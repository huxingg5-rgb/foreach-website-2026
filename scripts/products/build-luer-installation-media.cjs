/* Extract the original A02 panel drawings without redrawing their geometry or dimensions. */
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { createCanvas } = require("@napi-rs/canvas");
const sharp = require("sharp");
const root = path.resolve(__dirname, "../..");
const source = path.join(root, "public/downloads/resources/datasheets/zh-CN/Tubing-and-Fittings/foreach-fittings-and-elastomer-tubing-catalog-a02-cn.pdf");
const output = path.join(root, "public/images/products/fittings/luer-fittings/details-zh");
// Fractions of PDF page 58. Each crop retains the original labels and dimension arrows.
const figures = [
  ["luer-panel-mounting-stack", [0.092, 0.425, 0.27, 0.151]],
  ["luer-panel-cutout-dimensions", [0.12, 0.607, 0.235, 0.11]],
];

async function main() {
  const pdfjs = await import(pathToFileURL(path.join(root, "node_modules/pdfjs-dist/legacy/build/pdf.mjs")).href);
  const document = await pdfjs.getDocument({
    data: new Uint8Array(fs.readFileSync(source)), useSystemFonts: true,
    cMapUrl: path.join(root, "node_modules/pdfjs-dist/cmaps/"), cMapPacked: true,
    standardFontDataUrl: path.join(root, "node_modules/pdfjs-dist/standard_fonts/"),
  }).promise;
  try {
    const page = await document.getPage(58);
    const viewport = page.getViewport({ scale: 8 });
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    const png = canvas.toBuffer("image/png");
    fs.mkdirSync(output, { recursive: true });
    for (const [name, [x, y, width, height]] of figures) {
      const crop = {
        left: Math.round(canvas.width * x), top: Math.round(canvas.height * y),
        width: Math.round(canvas.width * width), height: Math.round(canvas.height * height),
      };
      await sharp(png).extract(crop)
        .resize(1420, 1420, { fit: "contain", background: "white" })
        .extend({ top: 40, bottom: 40, left: 40, right: 40, background: "white" })
        .webp({ quality: 96 }).toFile(path.join(output, name + ".webp"));
      console.log(name + ": A02 page 58, 1500 x 1500 WebP");
    }
  } finally {
    await document.destroy();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
