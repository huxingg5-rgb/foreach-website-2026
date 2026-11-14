const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
require('tsx/cjs');
const { applyFittingProductCopy, fittingProductText } = require('../../data/products/detail/fitting-product-copy.intl.ts');
const { FITTING_PUBLISHED_PRODUCTS } = require('../../data/products/selection/fitting-publication.generated.ts');
const { getFittingDetailAlternates } = require('../../lib/seo/fitting-detail-alternates.ts');
const { buildProductSocialMetadata } = require('../../lib/seo/product-social-metadata.ts');
const { getFittingDetailMetadata } = require('../../lib/seo/fitting-detail-metadata.ts');
const published = new Set(FITTING_PUBLISHED_PRODUCTS.map(p => p.productTypeId + '/' + p.foreachModel));
const root = path.resolve(__dirname, '../../data/products/generated/fittings');
const details = fs.readdirSync(root).flatMap(type => {
  const file = path.join(root, type, 'detail/index.json');
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8'))
    .filter(d => published.has(type + '/' + d.model)).map(d => ({ ...d, productTypeId: type })) : [];
});
const locales = ['en', 'es', 'fr', 'ko', 'ru'];

test('all published fitting introductions and FAQs retain catalog-specific facts in five languages', () => {
  // Threaded plugs already have a dedicated six-language source-copy adapter.
  const localizedModels = details.filter(d => !d.model.startsWith('HBL'));
  assert.equal(localizedModels.length, 640);
  for (const source of localizedModels) {
    const before = JSON.stringify(source);
    for (const locale of locales) {
      const data = applyFittingProductCopy(source, source, locale);
      const prose = JSON.stringify({ description: data.description, applications: data.commonApplications,
        faqs: data.faqs, name: data.name, series: data.seriesName, advantages: data.advantages, cta: data.bottomCta });
      assert.doesNotMatch(prose, /[\u3400-\u9fff]/, `${source.model}/${locale}: untranslated source`);
      assert.equal(data.faqs.length, source.faqs.length, `${source.model}/${locale}: lost FAQ`);
      assert.equal(data.model, source.model);
      assert.equal(data.productCode, source.productCode);
      assert.ok(data.description.includes(source.model));
      const pairs = [[source.description, data.description], ...source.faqs.map((q, i) => [q.answer, data.faqs[i].answer])];
      for (const [original, translated] of pairs) {
        // Sizes, material codes, series and drawing-format tokens stay literal.
        const tokens = original.match(/[A-Za-z0-9][A-Za-z0-9_.%/+−–—\-×÷=<>≤≥°μ³]*/g) || [];
        for (const token of tokens.filter(t => !['L', 'T', 'Y'].includes(t)))
          assert.ok(translated.includes(token), `${source.model}/${locale}: lost ${token}`);
      }
      assert.equal(data.seo.description, data.description);
      assert.ok(data.seo.title.includes(source.model));
    }
    assert.equal(JSON.stringify(source), before, 'localization mutated the Chinese catalog record');
  }
});

test('hard-tube FAQs preserve tubing tolerances, tube-end preparation and high-pressure limits', () => {
  const flat = details.find(d => d.model === 'HFL-M6-16-PV-N');
  const pressure = details.find(d => d.model === 'PUT-U32-05-SS-N');
  const a = applyFittingProductCopy(flat, flat, 'en');
  const b = applyFittingProductCopy(pressure, pressure, 'en');
  assert.match(a.faqs[0].question, /rigid-tubing OD/);
  assert.match(a.faqs[0].answer, /1\.6 mm.*OD tolerance.*tube-end preparation/);
  assert.match(a.faqs[3].answer, /tube end, threads, seals and port face/);
  assert.match(b.faqs[0].answer, /25 MPa.*fluid, temperature, tubing layout and pressure fluctuations/);
  assert.match(b.faqs[2].answer, /0\.5 mm.*pressure drop, fluid velocity and system dead volume/);
});

test('valve and installation behavior stays specific to each quick-disconnect half', () => {
  const valved = details.find(d => d.model === 'Q2001-PMV-SACN');
  const nonValved = details.find(d => d.model === 'Q2001-PNX-SACN');
  const a = applyFittingProductCopy(valved, valved, 'en');
  const b = applyFittingProductCopy(nonValved, nonValved, 'en');
  assert.match(a.description, /1\.6 mm/);
  assert.match(a.description, /POM.*NBR/);
  assert.match(a.description, /mounts through a panel/);
  assert.match(b.description, /inline mounting/);
  assert.match(a.faqs[1].answer, /has a shutoff valve/);
  assert.match(b.faqs[1].answer, /non-valved/);
  assert.doesNotMatch(a.description, /non-spill|zero leakage|dripless/i);
});

test('all published fitting paths have reciprocal six-language alternates', () => {
  for (const p of FITTING_PUBLISHED_PRODUCTS) {
    const chinese = p.detailHref.replace(/\/$/, '') + '/';
    for (const locale of ['zh', ...locales]) {
      const current = (locale === 'zh' ? '' : '/' + locale) + chinese;
      const a = getFittingDetailAlternates(current);
      assert.equal(a.canonical, current);
      assert.deepEqual(Object.keys(a.languages), ['zh-CN', 'en-US', 'es', 'fr', 'ko', 'ru', 'x-default']);
      assert.equal(a.languages['zh-CN'], chinese);
      assert.equal(a.languages['en-US'], '/en' + chinese);
      assert.equal(a.languages['x-default'], chinese);
      for (const l of ['es', 'fr', 'ko', 'ru']) assert.equal(a.languages[l], '/' + l + chinese);
    }
  }
  assert.equal(getFittingDetailAlternates('/en/products/pumps/piston-pump/ea/'), undefined);
});

test('metadata shares localized model copy and actual product image', () => {
  for (const type of new Set(details.map(d => d.productTypeId))) {
    const d = details.find(item => item.productTypeId === type);
    for (const locale of locales) {
      const meta = getFittingDetailMetadata(locale, type, d.slug);
      assert.ok(meta, `${type}/${locale}`);
      assert.doesNotMatch(meta.description, /[\u3400-\u9fff]|^Explore /);
      assert.ok(meta.title.absolute.includes(d.model));
      assert.equal(meta.openGraph.description, meta.description);
      assert.equal(meta.twitter.description, meta.description);
      assert.ok(meta.openGraph.images[0].url.includes('/images/products/fittings/'));
      assert.equal(Object.keys(meta.alternates.languages).length, 7);
    }
  }
  const d = details[0];
  const chinese = buildProductSocialMetadata({ data: d, title: d.model, canonicalUrl: `/products/fittings/${d.productTypeId}/${d.slug}/` });
  assert.ok(chinese.alternates.languages.fr.startsWith('/fr/'));
  assert.equal(getFittingDetailMetadata('es', 'barbed-fittings', 'nonexistent'), undefined);
});

test('existing non-fitting and Chinese data are preserved', () => {
  const other = { category: 'tubing', description: '已有文案' };
  assert.equal(applyFittingProductCopy(other, other, 'es'), other);
  assert.equal(applyFittingProductCopy(details[0], details[0], 'zh'), details[0]);
  assert.equal(fittingProductText('Unknown new source text', 'fr'), 'Unknown new source text');
});
