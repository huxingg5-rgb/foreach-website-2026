import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const sources = JSON.parse(await readFile(path.join(repository, "data/products/selection/product-card-thumbnail-sources.json"), "utf8"));
const targetDirectory = "images/products/card-thumbnails";
await mkdir(path.join(repository, "public", targetDirectory), { recursive: true });
const map = {};
const results = [];
for (const source of sources) {
  const originalPath = path.join(repository, "public", source.replace(/^\//, ""));
  const original = await sharp(originalPath).metadata();
  const name = path.parse(source).name;
  const hash = createHash("sha1").update(source).digest("hex").slice(0, 8);
  const target = `/${targetDirectory}/${name}-${hash}.webp`;
  const output = await sharp(originalPath)
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 84, alphaQuality: 100, effort: 6 })
    .toFile(path.join(repository, "public", target.replace(/^\//, "")));
  map[source] = { src: target, width: output.width, height: output.height };
  results.push({ source, target, originalWidth: original.width, originalHeight: original.height,
    originalBytes: (await stat(originalPath)).size, width: output.width, height: output.height, bytes: output.size });
}
await writeFile(path.join(repository, "data/products/selection/product-card-thumbnails.generated.json"), `${JSON.stringify(map, null, 2)}\n`);
console.log(JSON.stringify(results, null, 2));
