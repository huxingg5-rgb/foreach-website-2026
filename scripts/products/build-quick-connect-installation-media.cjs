/* Extract verified Q40/Q60 installation figures from the original A02 CN PDF. */
const fs = require('node:fs'), path = require('node:path'), {pathToFileURL} = require('node:url');
const {createCanvas} = require('@napi-rs/canvas'), sharp = require('sharp');
const root = path.resolve(__dirname, '../..');
const source = 'public/downloads/resources/datasheets/zh-CN/Tubing-and-Fittings/foreach-fittings-and-elastomer-tubing-catalog-a02-cn.pdf';
const figures = [
  {series:'q40', page:71, box:[.142,.462,.20,.052]},
  {series:'q60', page:77, box:[.145,.453,.13,.050]},
];
async function main() {
  const pdfjs = await import(pathToFileURL(path.join(root,'node_modules/pdfjs-dist/legacy/build/pdf.mjs')).href);
  const doc = await pdfjs.getDocument({data:new Uint8Array(fs.readFileSync(path.join(root,source))),
    useSystemFonts:true, cMapUrl:path.join(root,'node_modules/pdfjs-dist/cmaps/'), cMapPacked:true,
    standardFontDataUrl:path.join(root,'node_modules/pdfjs-dist/standard_fonts/'),
  }).promise;
  try { for (const figure of figures) {
    const page=await doc.getPage(figure.page), viewport=page.getViewport({scale:8});
    const canvas=createCanvas(Math.ceil(viewport.width),Math.ceil(viewport.height));
    await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise;
    const [x,y,w,h]=figure.box, output=path.join(root,'public/images/products/fittings/quick-connect-fittings',figure.series);
    fs.mkdirSync(output,{recursive:true});
    await sharp(canvas.toBuffer('image/png')).extract({left:Math.round(canvas.width*x),top:Math.round(canvas.height*y),width:Math.round(canvas.width*w),height:Math.round(canvas.height*h)})
      .resize(1420,1420,{fit:'contain',background:'white'}).extend({top:40,bottom:40,left:40,right:40,background:'white'})
      .webp({quality:96}).toFile(path.join(output,figure.series+'-panel-cutout-dimensions.webp'));
    console.log(figure.series+': original PDF figure, 1500 x 1500 WebP');
  }} finally { await doc.destroy(); }
}
main().catch(e=>{console.error(e);process.exitCode=1;});
