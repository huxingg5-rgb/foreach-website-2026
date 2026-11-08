/* eslint-disable @typescript-eslint/no-require-imports -- This asset importer is a standalone CommonJS CLI. */
/* Import the transparent PNG artwork for the Chinese LPS-16-PP-O pilot only.
 * node scripts/products/import-lps-pilot-png-assets.cjs <PNG directory> <audit directory>
 * Source images are read-only. Existing product galleries and CAD assets are untouched.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');
require('tsx/cjs');
const { getLuerPairConfig } = require('../../data/products/configurator/luer-pairing.ts');
const root = path.resolve(__dirname, '../..');
const [sourceDirectory, auditDirectory] = process.argv.slice(2);
if (!sourceDirectory || !auditDirectory) throw Error('PNG source and audit directories are required');
const config = getLuerPairConfig({ model: 'LPS-16-PP-O', productTypeId: 'luer-fittings' }, 'zh');
if (!config) throw Error('Pilot configuration is unavailable');
const parts = [config.base, ...config.mates, ...config.rings, ...config.nuts];
const destination = path.join(root, 'public/images/products/fittings/luer-fittings/assembly-png');
const sha = data => crypto.createHash('sha256').update(data).digest('hex');

async function main() {
  const inputs = [];
  for (const part of parts) {
    const source = path.join(sourceDirectory, `${part.model}.png`);
    const buffer = fs.readFileSync(source);
    const metadata = await sharp(buffer).metadata();
    if (metadata.format !== 'png' || !metadata.hasAlpha || metadata.width !== 800 || metadata.height !== 800) {
      throw Error(`Unexpected source dimensions or transparency: ${source}`);
    }
    inputs.push({ part, source, buffer, metadata });
  }
  fs.mkdirSync(destination, { recursive: true });
  fs.mkdirSync(auditDirectory, { recursive: true });
  const report = [];
  for (const { part, source, buffer, metadata } of inputs) {
    const outputFile = `${part.model.toLowerCase()}.webp`;
    const output = await sharp(buffer).resize(1500, 1500, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ lossless: true, effort: 6 }).toBuffer();
    const target = path.join(destination, outputFile);
    fs.writeFileSync(target, output);
    const decoded = await sharp(output).metadata();
    const { data, info } = await sharp(output).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let transparent = 0, translucent = 0;
    for (let i = 3; i < data.length; i += info.channels) {
      if (data[i] === 0) transparent++;
      else if (data[i] < 255) translucent++;
    }
    if (decoded.format !== 'webp' || decoded.width !== 1500 || decoded.height !== 1500 || !decoded.hasAlpha || !transparent || !translucent) throw Error(`Invalid WebP output: ${target}`);
    if (sha(fs.readFileSync(source)) !== sha(buffer)) throw Error(`Source changed during import: ${source}`);
    report.push({ model: part.model, source, sourceSha256: sha(buffer), sourceWidth: metadata.width, sourceHeight: metadata.height,
      output: path.relative(root, target).replaceAll('\\', '/'), outputSha256: sha(output), bytes: output.length,
      width: decoded.width, height: decoded.height, format: decoded.format, transparent, translucent });
  }
  fs.writeFileSync(path.join(auditDirectory, 'png-import.json'), JSON.stringify({ scope: 'Chinese LPS-16-PP-O configurator only', sourceResolutionNote: '800px source resampled to 1500px; no additional original detail claimed', images: report }, null, 2));
  console.log(JSON.stringify({ imported: report.length, format: 'webp', size: '1500x1500', alpha: 'preserved', bytes: report.reduce((total, image) => total + image.bytes, 0) }, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
