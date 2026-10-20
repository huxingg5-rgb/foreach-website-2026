import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { buildFittingImageAlt, getFittingImageTypeSlug, type FittingImageRecord } from "../../data/products/detail/fitting-image-copy";

// Run with --write to create lossless WebP assets and update exact image URLs.
// Original assets remain available as compatibility URLs. No product slugs change.
const root = process.cwd();
const write = process.argv.includes("--write");
const output = process.argv.find(arg => arg.startsWith("--report-dir="))?.slice(13);
const catalogFile = "data/products/detail/fitting-image-catalog.generated.json";
const photoAliasesFile = "data/products/detail/fitting-photo-url-aliases.generated.json";
const previous: FittingImageRecord[] = fs.existsSync(catalogFile)
  ? JSON.parse(fs.readFileSync(catalogFile, "utf8")) : [];
const source = fs.readFileSync("data/products/selection/fitting-publication.generated.ts", "utf8");
const published = JSON.parse(source.match(/FITTING_PUBLISHED_PRODUCTS[^=]*=\s*(\[[\s\S]*?\n\]);/)![1]) as {
  productTypeId: string; foreachModel: string; imageCard: string;
}[];
const categories = ["barbed-fittings", "thread-to-barbed-fittings", "female-thread-adapters", "bulkhead-barbed-fittings"];
const slug = (value: string) => value.toLowerCase().replace("锥螺纹", "taper-thread").replace(/×/g, "-x-").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const records: FittingImageRecord[] = [];
const renames = new Map<string, string>();

for (const category of categories) {
  const details = JSON.parse(fs.readFileSync(`data/products/generated/fittings/${category}/detail/index.json`, "utf8")) as {
    model: string; productName: string; specs: { label: string; value: string }[];
  }[];
  for (const product of published.filter(p => p.productTypeId === category)) {
    const detail = details.find(p => p.model === product.foreachModel);
    if (!detail) throw new Error(`Missing detail: ${product.foreachModel}`);
    const spec = (pattern: RegExp) => detail.specs.filter(s => pattern.test(s.label)).map(s => s.value);
    const tubeIds = spec(/^接管内径\d*$/);
    const bore = spec(/^通径$/);
    const dimensions = (tubeIds.length ? tubeIds : bore).map(value => {
      if (!/^\d+(?:\.\d+)?\s*mm$/.test(value)) throw new Error(`Unverified dimension: ${detail.model}: ${value}`);
      return String(Number.parseFloat(value));
    });
    const material = spec(/材质$/)[0];
    if (!material || !/^[A-Z]+$/.test(material)) throw new Error(`Unverified material: ${detail.model}`);
    const thread = spec(/^螺纹规格$/)[0] || "";
    // Do not silently strip an unrecognized thread description.
    if (/[^\x20-\x7e×]/.test(thread) && thread !== "3.4 锥螺纹") throw new Error(`Unverified thread: ${detail.model}: ${thread}`);
    const record: FittingImageRecord = {
      model: detail.model, category,
      source: previous.find(p => p.model === detail.model)?.source || product.imageCard,
      src: "", productType: detail.productName, dimensions,
      dimensionKind: tubeIds.length ? "tubeId" : bore.length ? "bore" : null,
      material, color: spec(/^颜色$/)[0] || "", thread,
    };
    const filename = [
      dimensions.length ? dimensions.join("-x-") + "mm" : "",
      record.dimensionKind === "tubeId" ? "tube-id" : record.dimensionKind || "",
      material, getFittingImageTypeSlug(detail.productName), thread, detail.model,
    ].filter(Boolean).map(slug).join("-") + ".webp";
    record.src = `/images/products/fittings/${category}/products/${filename}`;
    if (!fs.existsSync(path.join(root, "public", record.source))) throw new Error(`Missing image: ${record.source}`);
    records.push(record);
    renames.set(record.source, record.src);
  }
}
if (new Set(records.map(p => p.src)).size !== records.length) throw new Error("Duplicate descriptive main-image URL");

// These ten names previously omitted the actual connector type.
const photoRenames: Record<string, string> = {
  "pmb-pa-small-body-side.webp": "pa-white-bulkhead-barbed-fitting-small-body-side.webp",
  "pmb-pa-small-body-with-separate-pp-nut.webp": "pa-white-bulkhead-barbed-fitting-with-separate-pp-nut.webp",
  "pmb-pp-long-body-side.webp": "pp-natural-bulkhead-barbed-fitting-long-body-side.webp",
  "pmb-pp-long-body-with-separate-nut.webp": "pp-natural-bulkhead-barbed-fitting-with-separate-nut.webp",
  "pmb-pp-long-body-with-fitted-nut.webp": "pp-natural-bulkhead-barbed-fitting-with-fitted-nut.webp",
  "pmb-u28-pa-pp-family-pair.webp": "pa-pp-bulkhead-barbed-fittings-mixed-family-pair.webp",
  "pmbsn-u28-pp-natural-hex-nuts.webp": "pp-natural-1-4-28-unf-bulkhead-fitting-hex-nuts.webp",
  "pmu-m12-u28-pp-natural-with-separate-nut.webp": "pp-bulkhead-female-thread-union-with-separate-metal-nut.webp",
  "pmu-m12-u28-pp-natural-fitted-nut-side.webp": "pp-bulkhead-female-thread-union-fitted-metal-nut-side.webp",
  "pmu-m12-u28-pp-natural-assembly-group.webp": "pp-bulkhead-female-thread-unions-assembly-group.webp",
};
for (const [oldName, newName] of Object.entries(photoRenames)) {
  const category = oldName.startsWith("pmu-") ? "female-thread-adapters" : "bulkhead-barbed-fittings";
  const prefix = `/images/products/fittings/${category}/photos/`;
  renames.set(prefix + oldName, prefix + newName);
}
const thumbnails = JSON.parse(fs.readFileSync("data/products/selection/product-card-thumbnails.generated.json", "utf8")) as Record<string, { src: string }>;
for (const record of records) {
  const thumbnail = thumbnails[record.src] || thumbnails[record.source];
  if (thumbnail) {
    const destination = `/images/products/card-thumbnails/${path.basename(record.src, ".webp")}-card.webp`;
    if (thumbnail.src !== destination) renames.set(thumbnail.src, destination);
  }
}

function files(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? files(file) : /\.(ts|tsx|json)$/.test(entry.name) ? [file] : [];
  });
}
const edits: { file: string; text: string }[] = [];
for (const file of [...files("data"), ...files("public/search-data")]) {
  // This compatibility map deliberately contains both old and new URL keys.
  // Renaming its keys would create duplicates and remove legacy URL support.
  if ([catalogFile, photoAliasesFile, "data/resources/technical-articles/fitting-article-images.ts"].includes(file.replaceAll("\\", "/"))) continue;
  const before = fs.readFileSync(file, "utf8");
  let after = before;
  for (const [from, to] of renames) after = after.split(from).join(to);
  // Gallery files store filenames relative to their own imageRoot.
  if (/female-thread-adapter-gallery|bulkhead-barbed-fitting-gallery/.test(file)) {
    for (const [from, to] of Object.entries(photoRenames)) after = after.split(`"${from}"`).join(`"${to}"`);
  }
  if (categories.some(category => file.replaceAll("\\", "/") === `data/products/generated/fittings/${category}/detail/index.json`)) {
    const details = JSON.parse(after) as Record<string, unknown>[];
    for (const detail of details) {
      const record = records.find(p => p.model === detail.model);
      if (!record) continue;
      for (const key of ["imageCard", "mainImage", "image", "imagePath", "imageUrl", "heroImage"]) detail[key] = record.src;
      detail.imageAlt = detail.mainImageAlt = buildFittingImageAlt(record, "zh");
      if ("imageAltEn" in detail) detail.imageAltEn = buildFittingImageAlt(record, "en");
    }
    after = JSON.stringify(details, null, 2) + (before.endsWith("\n") ? "\n" : "");
  }
  if (before !== after) edits.push({ file, text: after });
}
const report = {
  mainImages: records.length, familyPhotosRenamed: Object.keys(photoRenames).length,
  byCategory: Object.fromEntries(categories.map(c => [c, records.filter(r => r.category === c).length])),
  changedDataFiles: edits.map(e => e.file), imageUrls: Object.fromEntries(renames), records,
};
if (output) {
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(path.join(output, write ? "applied.json" : "plan.json"), JSON.stringify(report, null, 2) + "\n");
}
async function apply() {
  if (write) {
    for (const [from, to] of renames) {
      const input = path.join(root, "public", from);
      const destination = path.join(root, "public", to);
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        if (from.endsWith(".webp")) fs.copyFileSync(input, destination);
        else await sharp(input).webp({ lossless: true }).toFile(destination);
      }
    }
    for (const edit of edits) {
      if (output) {
        const backup = path.join(output, "before", edit.file);
        if (!fs.existsSync(backup)) {
          fs.mkdirSync(path.dirname(backup), { recursive: true });
          fs.copyFileSync(edit.file, backup);
        }
      }
      fs.writeFileSync(edit.file, edit.text);
    }
    fs.writeFileSync(catalogFile, JSON.stringify(records, null, 2) + "\n");
    fs.writeFileSync(photoAliasesFile, JSON.stringify(Object.fromEntries([...renames].filter(([from]) => from.includes("/photos/"))), null, 2) + "\n");
  }
  console.log(JSON.stringify({ ...report, records: undefined, imageUrls: undefined, write }, null, 2));
}
apply().catch(error => { console.error(error); process.exitCode = 1; });
