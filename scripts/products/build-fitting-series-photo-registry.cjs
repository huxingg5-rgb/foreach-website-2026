/* eslint-disable @typescript-eslint/no-require-imports -- Build the compact registry from the production TypeScript adapters. */
const fs = require('node:fs');
const path = require('node:path');
require('tsx/cjs');
const { isPublishedFittingProduct } = require('../../data/products/selection/fitting-publication.generated.ts');
const { getBarbedFittingGallery } = require('../../data/products/detail/barbed-fitting-gallery.ts');
const { getThreadToBarbedFittingGallery } = require('../../data/products/detail/thread-to-barbed-fitting-gallery.ts');
const { getFemaleThreadAdapterGallery } = require('../../data/products/detail/female-thread-adapter-gallery.ts');
const { getBulkheadBarbedFittingGallery } = require('../../data/products/detail/bulkhead-barbed-fitting-gallery.ts');
const { appendQuickConnectSupplementaryImage } = require('../../data/products/detail/quick-connect-gallery.ts');
const { getDescriptiveFittingImageUrl } = require('../../data/products/detail/fitting-image-description.ts');
const { getFittingSeriesKey, getFittingSeriesAttribute, isFittingSeriesPhoto } = require('../../data/products/detail/fitting-series-gallery.ts');
const root = path.resolve(__dirname, '../..');
const source = path.join(root, 'data/products/generated/fittings');
const target = path.join(root, 'data/products/detail/fitting-series-photos.generated.json');
const registry = {};
for (const type of fs.readdirSync(source)) {
  const file = path.join(source, type, 'detail/index.json');
  if (!fs.existsSync(file)) continue;
  for (const raw of JSON.parse(fs.readFileSync(file, 'utf8'))) {
    const data = { ...raw, productTypeId: type };
    if (!isPublishedFittingProduct(data)) continue;
    const product = { ...data, ...getBarbedFittingGallery(data), ...getThreadToBarbedFittingGallery(data), ...getFemaleThreadAdapterGallery(data), ...getBulkheadBarbedFittingGallery(data) };
    if (type === 'quick-connect-fittings') product.additionalImages = appendQuickConnectSupplementaryImage(product.additionalImages || []);
    const key = getFittingSeriesKey(product);
    const photos = [...new Set((product.additionalImages || []).map(getDescriptiveFittingImageUrl).filter(isFittingSeriesPhoto))];
    if (!key || !photos.length) continue;
    for (const src of photos) if (!fs.existsSync(path.join(root, 'public', src))) throw Error('Missing real photograph: ' + src);
    const donor = { model: String(product.foreachModel || product.model), family: String(product.foreachModel || product.model).split('-')[0], material: getFittingSeriesAttribute(product, ['材质', '主体材质', '壳体材质', '外壳材质']), color: getFittingSeriesAttribute(product, ['颜色']), photos };
    const donors = registry[key] ||= [];
    if (!donors.some(d => d.family === donor.family && d.material === donor.material && d.color === donor.color && JSON.stringify(d.photos) === JSON.stringify(photos))) donors.push(donor);
  }
}
const content = JSON.stringify(registry, null, 2) + '\n';
if (process.argv.includes('--check')) {
  if (fs.readFileSync(target, 'utf8') !== content) throw Error('Fitting photo registry needs rebuilding. Run node scripts/products/build-fitting-series-photo-registry.cjs');
} else fs.writeFileSync(target, content);
console.log(JSON.stringify({ series: Object.keys(registry).length, donors: Object.values(registry).flat().length, photos: new Set(Object.values(registry).flatMap(d => d.flatMap(d => d.photos))).size }));
