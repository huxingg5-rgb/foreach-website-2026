/* eslint-disable @typescript-eslint/no-require-imports -- Verify the production data adapter and source-controlled photo registry in Node. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('tsx/cjs');
const registry = require('../../data/products/detail/fitting-series-photos.generated.json');
const { getFittingSeriesGallery, getFittingSeriesKey, isFittingSeriesPhoto } = require('../../data/products/detail/fitting-series-gallery.ts');
const { getSharedFittingPhotoAlt } = require('../../data/products/detail/fitting-series-photo-copy.ts');
const { connectPublishedFittingProduct } = require('../../data/products/selection/connectPublishedFittingProduct.ts');
const { FITTING_PUBLISHED_PRODUCTS } = require('../../data/products/selection/fitting-publication.generated.ts');
const root = path.join(__dirname, '../../data/products/generated/fittings');
const raw = fs.readdirSync(root).flatMap(type => {
  const file = path.join(root, type, 'detail/index.json');
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')).map(p => ({ ...p, productTypeId: type })) : [];
});
const published = raw.map(connectPublishedFittingProduct).filter(Boolean);

test('every published fitting with a same-series real-photo donor has supplementary photographs', () => {
  assert.equal(published.length, FITTING_PUBLISHED_PRODUCTS.length);
  const shared = published.filter(p => p.sharedFittingPhotoSources?.length);
  assert.equal(shared.length, 46);
  for (const product of published) {
    const key = getFittingSeriesKey(product);
    const photos = product.additionalImages || [];
    if (registry[key]?.length) assert.ok(photos.some(isFittingSeriesPhoto), product.model);
    assert.equal(new Set(photos).size, photos.length, product.model);
    if (product.sharedFittingPhotoSources) {
      const donor = published.find(p => p.model === product.sharedFittingPhotoDonor);
      assert.ok(donor, product.model + ' published donor');
      assert.equal(getFittingSeriesKey(donor), key, product.model + ' series boundary');
      assert.ok(product.sharedFittingPhotoSources.every(src => donor.additionalImages.includes(src)));
    }
  }
});

test('model renderings and existing galleries remain intact; unrelated series never provide fallback photos', () => {
  const target = raw.find(p => p.model === 'HF6-M6-20-PS-B');
  const original = { ...target, mainImage: '/images/current-model.webp', additionalImages: ['/images/assembly-context.webp'], additionalImageAlts: ['Original assembly context'] };
  const before = JSON.stringify(original);
  const patch = getFittingSeriesGallery(original);
  assert.equal(JSON.stringify(original), before);
  assert.equal(patch.mainImage, undefined);
  assert.equal(patch.additionalImages[0], original.additionalImages[0]);
  assert.equal(patch.additionalImageAlts[0], original.additionalImageAlts[0]);
  const enriched = { ...original, ...patch };
  assert.deepEqual({ ...enriched, ...getFittingSeriesGallery(enriched) }, enriched);
  for (const model of ['SAL-U28-16D-PP-N', 'BBL-16D-PP-N', 'CV-BE-32-PP-N', 'F-PE-60-32-PP-N']) {
    assert.deepEqual(getFittingSeriesGallery(raw.find(p => p.model === model)), {}, model);
  }
  const withOwnPhoto = { ...original, additionalImages: [patch.sharedFittingPhotoSources[0]] };
  assert.deepEqual(getFittingSeriesGallery(withOwnPhoto), {});
  assert.equal(getFittingSeriesKey({ productTypeId: 'pumps', model: target.model }), null);
});

test('shared photos are real decodable WebP files with localized ALT in all six languages', async () => {
  const sharp = require('sharp');
  const photos = new Set(published.flatMap(p => p.sharedFittingPhotoSources || []));
  assert.ok(photos.size > 10);
  for (const src of photos) {
    const file = path.join(__dirname, '../../public', src);
    const meta = await sharp(file).metadata();
    assert.equal(meta.format, 'webp', src);
    assert.equal(meta.width, 1500, src);assert.equal(meta.height, 1500, src);
    await sharp(file).raw().toBuffer();
  }
  for (const locale of ['zh', 'en', 'es', 'fr', 'ko', 'ru']) {
    const sources = [...photos];
    const first = getSharedFittingPhotoAlt(sources, sources[0], locale);
    const second = getSharedFittingPhotoAlt(sources, sources[1], locale);
    assert.ok(first && second);assert.notEqual(first, second);
    if (locale !== 'zh') assert.doesNotMatch(first, /[\u3400-\u9fff]/);
    assert.equal(getSharedFittingPhotoAlt(sources, '/images/model.webp', locale), undefined);
  }
});
