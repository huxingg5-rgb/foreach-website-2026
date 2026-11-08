// Original A02 handbook annotations for Chinese female-thread selection guidance.
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { createCanvas } = require('@napi-rs/canvas');
const sharp = require('sharp');
const root = path.resolve(__dirname, '../..');
const source = path.join(root, 'public/downloads/resources/datasheets/zh-CN/Tubing-and-Fittings/foreach-fittings-and-elastomer-tubing-catalog-a02-cn.pdf');
const output = path.join(root, 'public/images/products/fittings/female-thread-adapters/details-zh');
// PDF page numbers; normalized crops preserve the original engineering annotations.
const illustrations = [
  ['female-two-way-selection', 82, [0.403, 0.255, 0.270, 0.124]],
  ['ut-structure-selection', 83, [0.400, 0.351, 0.168, 0.086]],
  ['uy-structure-selection', 83, [0.400, 0.613, 0.171, 0.118]],
  ['female-thread-markings', 82, [0.092, 0.663, 0.245, 0.080]],
  ['female-thread-bore-match', 83, [0.094, 0.427, 0.246, 0.187]],
  ['pmu-panel-assembly', 83, [0.092, 0.119, 0.287, 0.167]],
];
async function main() {
  const pdfjs = await import(pathToFileURL(path.join(root, 'node_modules/pdfjs-dist/legacy/build/pdf.mjs')).href);
  const document = await pdfjs.getDocument({
    data: new Uint8Array(fs.readFileSync(source)), useSystemFonts: true,
    cMapUrl: path.join(root, 'node_modules/pdfjs-dist/cmaps/'), cMapPacked: true,
    standardFontDataUrl: path.join(root, 'node_modules/pdfjs-dist/standard_fonts/'),
  }).promise;
  try {
    fs.mkdirSync(output, { recursive: true });
    for (const number of [...new Set(illustrations.map(item => item[1]))]) {
      const page = await document.getPage(number), viewport = page.getViewport({ scale: 8 });
      const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      const png = canvas.toBuffer('image/png');
      for (const [name, , [x, y, w, h]] of illustrations.filter(item => item[1] === number)) {
        await sharp(png).extract({ left: Math.round(canvas.width*x), top: Math.round(canvas.height*y), width: Math.round(canvas.width*w), height: Math.round(canvas.height*h) })
          .resize(1420, 1420, { fit: 'contain', background: 'white' })
          .extend({ top: 40, bottom: 40, left: 40, right: 40, background: 'white' })
          .webp({ quality: 96 }).toFile(path.join(output, name+'.webp'));
        console.log(`${name}: A02 PDF page ${number}, 1500 x 1500 WebP`);
      }
    }
  } finally { await document.destroy(); }
}
main().catch(error => { console.error(error); process.exitCode=1; });
