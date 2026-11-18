// Homepage-only assets. Keep product-page sources unchanged.
// Run: node scripts/media/generate-home-featured-images.mjs [asset-id ...]
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
const root = fileURLToPath(new URL('../../', import.meta.url));
const assets = [
  {
    "id": "plunger",
    "source": "/images/home/foreach-ea-sm-tm-piston-pumps-card.webp",
    "target": "/images/home/products/foreach-home-piston-pumps.webp"
  },
  {
    "id": "dpl",
    "source": "/images/home/diaphragm-pump-product-photo-card.webp",
    "target": "/images/home/products/foreach-home-diaphragm-pump.webp"
  },
  {
    "id": "smtp2",
    "source": "/images/products/pumps/pipetting-pumps/foreach-smtp2-1000ul-programmable-gas-displacement-pipetting-pump.webp",
    "target": "/images/home/products/foreach-home-smtp2-pipetting-module.webp"
  },
  {
    "id": "rpl",
    "source": "/images/products/pumps/valveless-pumps/foreach-rpl-p4-valveless-metering-pump-front-angle-card.webp",
    "target": "/images/home/products/foreach-home-valveless-metering-pump.webp"
  },
  {
    "id": "assembly",
    "source": "/images/home/tubing-assemblies-product-photo-card.webp",
    "target": "/images/home/products/foreach-home-tubing-assemblies.webp"
  },
  {
    "id": "tube",
    "source": "/images/home/tubing-product-photo-card.webp",
    "target": "/images/home/products/foreach-home-instrument-tubing.webp"
  },
  {
    "id": "quick",
    "source": "/images/products/fittings/series/catalog-a02-quick-connect-fittings.webp",
    "target": "/images/home/products/foreach-home-quick-connect-fittings.webp"
  },
  {
    "id": "needle",
    "source": "/images/home/probes-product-photo-card.webp",
    "target": "/images/home/products/foreach-home-instrument-probes.webp"
  },
  // These are the source photographs behind the tubing catalog thumbnails.
  { id: 'pvc', source: '/images/products/tubing/pvc-tubing/pvc-tubing-main.webp', target: '/images/home/products/pvc-tubing-card.webp', position: 'north' },
  { id: 'tpu', source: '/images/products/tubing/tpu-tubing/foreach-flexible-tpu-tubing-instrument-routing.webp', target: '/images/home/products/tpu-tubing-card.webp', position: 'north' },
  { id: 'fep', source: '/images/products/tubing/fep-tubing/foreach-fep-tubing-clear-black-options.webp', target: '/images/home/products/fep-tubing-card.webp', position: 'north' },
  { id: 'ptfe', source: '/images/products/tubing/ptfe-tubing/ptfe-tubing-main.webp', target: '/images/home/products/ptfe-tubing-card.webp', position: 'centre' },
  { id: 'peek', source: '/images/products/tubing/peek-tubing/foreach-chemical-resistant-peek-tubing-color-options.webp', target: '/images/home/products/peek-tubing-card.webp', position: 'north' },
  { id: 'pfa', source: '/images/products/tubing/pfa-tubing/pfa-tubing-main.webp', target: '/images/home/products/pfa-tubing-card.webp', position: 'south' },
  { id: 'rotary', source: '/images/products/valves/rotary-valves/foreach-rotary-valve-24-channel-assembly.webp', target: '/images/home/products/mrv3-rotary-valve-card.webp', position: 'centre' },
  { id: 'flanged', source: '/images/home/flanged-tubing-white-shadow.png', target: '/images/home/products/flanged-tubing-card.webp', region: { left: 1, top: 99, width: 1252, height: 939 } },
  { id: 'retaining-ring', source: '/images/home/retaining-ring-kit-white-shadow.png', target: '/images/home/products/retaining-ring-kit-card.webp', position: 'centre' },
  { id: 'ferrule', source: '/images/home/ferrule-kit-white-shadow.png', target: '/images/home/products/ferrule-kit-card.webp', position: 'centre' },
];

async function main() {
  const selected = new Set(process.argv.slice(2));
  for (const asset of assets) {
    if (selected.size && !selected.has(asset.id)) continue;
    const source = path.join(root, 'public', asset.source);
    const target = path.join(root, 'public', asset.target);
    await fs.mkdir(path.dirname(target), { recursive: true });
    const metadata = await sharp(source).metadata();
    if (metadata.format === 'webp' && metadata.width === 2000 && metadata.height === 1500 && !metadata.hasAlpha) {
      await fs.copyFile(source, target);
    } else {
      const image = sharp(source).rotate().flatten({ background: '#ffffff' });
      if (asset.region) image.extract(asset.region);
      await image
        .resize(2000, 1500, { fit: asset.position ? 'cover' : 'contain', position: asset.position, background: '#ffffff' })
        .webp({ quality: 90, effort: 6 }).toFile(target);
    }
    const result = await sharp(target).metadata();
    if (result.format !== 'webp' || result.width !== 2000 || result.height !== 1500) {
      throw new Error('Invalid homepage image: ' + asset.target);
    }
    console.log(asset.target + ' 2000x1500 webp');
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
