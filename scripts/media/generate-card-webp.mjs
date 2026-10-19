import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const articleBase = "images/resources/technical-articles";
const assets = [
  ...["diaphragm-pump", "tubing-assemblies", "tubing", "probes"].map(name => ({
    source: `images/home/${name}-product-photo.png`,
    target: `images/home/${name}-product-photo-card.webp`,
    width: 800,
  })),
  ...[
    ["what-is-a-luer-fitting/pp-panel-mount-luer-photo.png", "luer-fitting"],
    ["hard-tube-fittings-selection-guide/ferrule-fittings-photo.png", "ferrule-fitting"],
    ["hard-tube-fittings-selection-guide/compression-ring-fitting-cover-photo.png", "compression-ring-fitting"],
    ["flanged-tubing-assemblies-selection-guide/assembly-photo.png", "flanged-tubing-assemblies"],
    ["pump-application-guides/piston-capacity-series.png", "piston-capacity-series"],
  ].map(([source, name]) => ({
    source: `${articleBase}/${source}`,
    target: `${articleBase}/thumbnails/${name}.webp`,
    width: 360,
  })),
];

const results = [];
for (const asset of assets) {
  const source = path.join(repository, "public", asset.source);
  const target = path.join(repository, "public", asset.target);
  await mkdir(path.dirname(target), { recursive: true });
  const original = await sharp(source).metadata();
  const output = await sharp(source)
    .resize({ width: asset.width, withoutEnlargement: true })
    .webp({ quality: 84, alphaQuality: 100, effort: 6 })
    .toFile(target);
  results.push({
    source: `/${asset.source}`,
    target: `/${asset.target}`,
    originalWidth: original.width,
    originalHeight: original.height,
    originalBytes: (await stat(source)).size,
    width: output.width,
    height: output.height,
    bytes: output.size,
  });
}
console.log(JSON.stringify(results, null, 2));
