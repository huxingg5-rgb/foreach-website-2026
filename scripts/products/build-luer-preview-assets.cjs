// Use the supplied transparent PNGs; do not recolor or substitute missing SKUs.
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const sharp = require('sharp');
const root = path.resolve(__dirname, '../..');
const catalog = require('../../data/products/detail/luer-cad-manifest.json');
async function main() {
  const source = process.argv[2];
  if (!source) throw Error('Provide the original Luer PNG folder.');
  const files = fs.readdirSync(source);
  const output = path.join(root, 'public/images/products/fittings/luer-fittings/assembly-png');
  fs.mkdirSync(output, {recursive: true});
  const products = {}, missing = [];
  for (const product of Object.values(catalog.products)) {
    const model = product.model;
    const names = [model, model.replace(/^(LP-\d+)D-/, '$1-'), model === 'LPT-PA-O' ? 'LPT-PA--O' : model];
    const filename = files.find(file => names.some(name => file.toUpperCase() === `${name}.PNG`));
    if (!filename) {missing.push(model); continue;}
    const sourceBytes = fs.readFileSync(path.join(source, filename));
    const destination = path.join(output, model.toLowerCase() + '.webp');
    if (!fs.existsSync(destination)) await sharp(sourceBytes).resize(1500, 1500, {fit: 'contain', background: {r: 255, g: 255, b: 255, alpha: 0}})
      .webp({lossless: true}).toFile(destination);
    const meta = await sharp(destination).metadata();
    if (meta.format !== 'webp' || meta.width !== 1500 || meta.height !== 1500 || !meta.hasAlpha) throw Error(`Invalid preview image: ${model}`);
    products[model] = {url: `/images/products/fittings/luer-fittings/assembly-png/${model.toLowerCase()}.webp`,
      sourceFile: filename, sourceSha256: crypto.createHash('sha256').update(sourceBytes).digest('hex')};
  }
  fs.writeFileSync(path.join(root, 'data/products/configurator/luer-preview-assets.json'), JSON.stringify({products, missing}, null, 2) + '\n');
  console.log(JSON.stringify({pngProducts: Object.keys(products).length, useExactCadPreview: missing}));
}
main().catch(error => {console.error(error); process.exitCode = 1;});
