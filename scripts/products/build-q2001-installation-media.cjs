/* Extract original installation figures; preserve all dimension labels. */
const fs = require('node:fs'), path = require('node:path'), {pathToFileURL} = require('node:url');
const {createCanvas} = require('@napi-rs/canvas'), sharp = require('sharp');
const root = path.resolve(__dirname, '../..');
const output = path.join(root, 'public/images/products/fittings/quick-connect-fittings/q20');
const figures = [
  {name: 'q20-panel-cutout-dimensions', source: 'public/downloads/resources/datasheets/zh-CN/Tubing-and-Fittings/foreach-fittings-and-elastomer-tubing-catalog-a02-cn.pdf', page: 65, box: [.095, .315, .23, .057]},
  {name: 'q2001-pmv-sacn-panel-thread-nut', source: 'public/downloads/products/fittings/quick-connect-fittings/q2001-pmv-sacn.pdf', page: 1, box: [.45, .36, .275, .26]},
];
async function main() {
  const pdfjs = await import(pathToFileURL(path.join(root, 'node_modules/pdfjs-dist/legacy/build/pdf.mjs')).href);
  fs.mkdirSync(output, {recursive: true});
  for (const figure of figures) {
    const doc = await pdfjs.getDocument({data: new Uint8Array(fs.readFileSync(path.join(root, figure.source))),
      useSystemFonts: true, cMapUrl: path.join(root, 'node_modules/pdfjs-dist/cmaps/'), cMapPacked: true,
      standardFontDataUrl: path.join(root, 'node_modules/pdfjs-dist/standard_fonts/'),
    }).promise;
    try {
      const page = await doc.getPage(figure.page), viewport = page.getViewport({scale: 8});
      const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
      await page.render({canvasContext: canvas.getContext('2d'), viewport}).promise;
      const [x,y,w,h] = figure.box;
      await sharp(canvas.toBuffer('image/png')).extract({left: Math.round(canvas.width*x), top: Math.round(canvas.height*y), width: Math.round(canvas.width*w), height: Math.round(canvas.height*h)})
        .resize(1420, 1420, {fit: 'contain', background: 'white'})
        .extend({top:40,bottom:40,left:40,right:40,background:'white'}).webp({quality:96})
        .toFile(path.join(output, figure.name+'.webp'));
      console.log(figure.name+': original PDF figure, 1500 x 1500 WebP');
    } finally { await doc.destroy(); }
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
