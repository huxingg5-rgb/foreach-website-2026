/* Original A02 illustrations for compact Chinese Luer selection guidance. */
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { createCanvas } = require("@napi-rs/canvas");
const sharp = require("sharp");
const root = path.resolve(__dirname, "../..");
const source = path.join(root, "public/downloads/resources/datasheets/zh-CN/Tubing-and-Fittings/foreach-fittings-and-elastomer-tubing-catalog-a02-cn.pdf");
const output = path.join(root, "public/images/products/fittings/luer-fittings/details-zh");
// Page-relative crop boxes retain the original parts and fixed-point annotation.
const illustrations = [
  ["luer-rotating-collar-cutaway", 50, [0.155, 0.578, 0.185, 0.059]],
  ["luer-fixed-collar-cutaway", 50, [0.155, 0.684, 0.185, 0.071]],
  ["luer-one-piece-male", 50, [0.215, 0.412, 0.078, 0.103]],
  ["luer-core-collar-parts", 50, [0.15, 0.278, 0.184, 0.113]],
  ["luer-panel-mated-assembly", 58, [0.096, 0.299, 0.263, 0.106]],
  ["luer-female-port-plug", 58, [0.13, 0.76, 0.215, 0.105]],
];

async function main() {
  const pdfjs = await import(pathToFileURL(path.join(root, "node_modules/pdfjs-dist/legacy/build/pdf.mjs")).href);
  const document = await pdfjs.getDocument({
    data: new Uint8Array(fs.readFileSync(source)), useSystemFonts: true,
    cMapUrl: path.join(root, "node_modules/pdfjs-dist/cmaps/"), cMapPacked: true,
    standardFontDataUrl: path.join(root, "node_modules/pdfjs-dist/standard_fonts/"),
  }).promise;
  try {
    fs.mkdirSync(output, { recursive: true });
    for (const pageNumber of [...new Set(illustrations.map(item => item[1]))]) {
      const page = await document.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 8 });
      const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
      await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
      const png = canvas.toBuffer("image/png");
      for (const [name, , [x, y, width, height]] of illustrations.filter(item => item[1] === pageNumber)) {
        const crop = {
          left: Math.round(canvas.width * x), top: Math.round(canvas.height * y),
          width: Math.round(canvas.width * width), height: Math.round(canvas.height * height),
        };
        await sharp(png).extract(crop).resize(1420, 1420, { fit: "contain", background: "white" })
          .extend({ top: 40, bottom: 40, left: 40, right: 40, background: "white" })
          .webp({ quality: 96 }).toFile(path.join(output, name + ".webp"));
        console.log(`${name}: A02 page ${pageNumber}, 1500 x 1500 WebP`);
      }
    }
  } finally {
    await document.destroy();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
