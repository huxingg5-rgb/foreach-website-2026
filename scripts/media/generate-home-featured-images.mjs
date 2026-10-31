// Homepage-only assets. Keep product-page sources unchanged.
// Run: node scripts/media/generate-home-featured-images.mjs
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
  }
];

async function main() {
  for (const asset of assets) {
    const source = path.join(root, 'public', asset.source);
    const target = path.join(root, 'public', asset.target);
    await fs.mkdir(path.dirname(target), { recursive: true });
    const metadata = await sharp(source).metadata();
    if (metadata.format === 'webp' && metadata.width === 2000 && metadata.height === 1500 && !metadata.hasAlpha) {
      await fs.copyFile(source, target);
    } else {
      // Contain preserves the full source without cropping or stretching.
      // Upscaling small sources does not create additional photographic detail.
      await sharp(source).rotate().flatten({ background: '#ffffff' })
        .resize(2000, 1500, { fit: 'contain', background: '#ffffff' })
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
