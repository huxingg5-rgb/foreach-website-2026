/* eslint-disable @typescript-eslint/no-require-imports -- Run the production TypeScript gallery adapter in Node. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('tsx/cjs');
const { getBarbedFittingGallery, getBarbedFittingImageAlt } = require('../../data/products/detail/barbed-fitting-gallery.ts');
const { connectPublishedFittingProduct } = require('../../data/products/selection/connectPublishedFittingProduct.ts');
const data = require('../../data/products/generated/fittings/barbed-fittings/detail/index.json').map(connectPublishedFittingProduct).filter(Boolean);
const photoRoot = '/images/products/fittings/barbed-fittings/photos/';

test('every equal-straight and equal-tee profile includes the genuine family photographs', () => {
  for (const product of data.filter(p => ['直通等径倒刺接头', 'T型等径倒刺接头'].includes(p.productName || p.name))) {
    const photos = getBarbedFittingGallery(product).additionalImages;
    if (product.model.startsWith('BA-')) {
      for (const file of ['equal-straight-barbed-fittings-mixed-lineup-dark.webp', 'equal-straight-barbed-fittings-mixed-lineup-blue.webp']) assert.ok(photos.includes(photoRoot + file), product.model);
      if (/^BA-\d+F-/.test(product.model)) assert.ok(!photos.some(src => /\/(?:pa|pp)-equal-straight/.test(src)), product.model + ' no wrong-profile close-up');
    } else {
      assert.ok(photos.includes(photoRoot + 'equal-tee-barbed-fittings-seven-piece-mixed-lineup.webp'), product.model);
      if (/^BT-\d+F-/.test(product.model)) assert.ok(!photos.some(src => /\/(?:pa|pp)-equal-tee/.test(src)), product.model + ' no wrong-profile close-up');
    }
  }
});

test('all published galleries preserve source data, deduplicate photos and provide six-language descriptions', async () => {
  const sharp = require('sharp'), checked = new Set();
  assert.equal(data.length, 144);
  for (const product of data) {
    const before = JSON.stringify(product), gallery = getBarbedFittingGallery(product);
    assert.equal(JSON.stringify(product), before, product.model);
    assert.deepEqual(getBarbedFittingGallery({ ...product, ...gallery }), gallery, product.model + ' repeated enrichment');
    const images = gallery.additionalImages || [];
    assert.equal(new Set(images).size, images.length, product.model);
    assert.equal(images.length, gallery.additionalImageAlts?.length || 0, product.model);
    for (const src of images.filter(src => src.startsWith(photoRoot))) {
      if (!checked.has(src)) {
        const filename = path.join(__dirname, '../../public', src);
        assert.ok(fs.existsSync(filename), src);
        const meta = await sharp(filename).metadata();
        assert.equal(meta.format, 'webp', src);assert.equal(meta.width, 1500, src);assert.equal(meta.height, 1500, src);
        await sharp(filename).raw().toBuffer();checked.add(src);
      }
      for (const locale of ['zh', 'en', 'es', 'fr', 'ko', 'ru']) {
        const alt = getBarbedFittingImageAlt(src, locale);assert.ok(alt, src + ' ' + locale);
        if (locale !== 'zh') assert.doesNotMatch(alt, /[\u3400-\u9fff]/, src + ' ' + locale);
      }
    }
  }
  assert.equal(checked.size, 34);
});
