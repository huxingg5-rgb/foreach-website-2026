const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('tsx/cjs');
const { controlModuleDetails } = require('../../data/products/control-modules/control-module-detail.generated.ts');
const { getControlModuleProductDetailData } = require('../../services/products/adapters/getControlModuleProductDetailData.ts');
const { applyAbdLocaleCopy, getAbdLocaleCopy } = require('../../data/products/detail/abd-locales.ts');
const { getProbeControlDetailMetadata } = require('../../lib/seo/probe-control-detail-metadata.ts');
const { getProbeDetailAlternates } = require('../../lib/seo/probe-detail-alternates.ts');
const { buildProductSocialMetadata } = require('../../lib/seo/product-social-metadata.ts');
const { getSavedConfigurationText } = require('../../data/products/tubing/configuration-ui.intl.ts');
const { getEaDiagramFile } = require('../../data/products/detail/technical-diagrams.ts');
const { getDiaphragmPumpProductPhotos } = require('../../data/products/detail/diaphragm-pump-product-photos.ts');
const { applyDiaphragmPumpGuideSpecs } = require('../../data/products/detail/diaphragm-pump-guide.intl.ts');
const locales = ['en', 'es', 'fr', 'ko', 'ru'];

test('ABD retains both introductions, all specs, outputs and four source FAQ topics', () => {
  const source = getControlModuleProductDetailData(controlModuleDetails.find(item => item.slug === 'abd-air-bubble-detector'));
  const before = JSON.stringify(source);
  for (const locale of locales) {
    const copy = getAbdLocaleCopy(locale);
    const result = applyAbdLocaleCopy(source, source, locale);
    assert.equal(copy.intro.length, 2);
    assert.equal(result.specs.length, 17);
    assert.equal(result.faqs.length, 4);
    assert.equal(result.commonApplications.length, 6);
    assert.equal(result.advantages.length, 7);
    assert.doesNotMatch(JSON.stringify({ name: copy.name, intro: copy.intro, applications: copy.applications,
      highlights: copy.highlights, specs: copy.specs, faqs: copy.faqs }), /[\u3400-\u9fff]|supports\. communication/);
    for (const [i, spec] of source.specs.entries()) {
      for (const token of spec.value.match(/[\d.]+(?:[–×±%]+[\d.]+)*/g) || [])
        assert.ok(result.specs[i].value.includes(token), `${locale}: lost spec value ${token}`);
    }
    assert.match(result.faqs[2].answer, /TTL.*Modbus RTU/);
    assert.match(result.faqs[3].answer, /> 0\.8 mm/);
    const meta = getProbeControlDetailMetadata(locale, ['control', 'air-bubble-detectors', 'abd']);
    assert.equal(meta.description, copy.description);
    assert.equal(Object.keys(meta.alternates.languages).length, 7);
    assert.equal(meta.alternates.canonical, `/${locale}/products/control/air-bubble-detectors/abd/`);
  }
  assert.equal(JSON.stringify(source), before);
  assert.equal(applyAbdLocaleCopy(source, source, 'zh'), source);
});

test('all four probe detail search descriptions use native product copy and reciprocal alternates', () => {
  for (const slug of ['sampling-probes', 'piercing-probes', 'wash-probes', 'stirring-paddles']) {
    const chinese = `/products/probes/${slug}/`;
    for (const locale of locales) {
      const meta = getProbeControlDetailMetadata(locale, ['probes', slug]);
      assert.ok(meta?.title.absolute);
      assert.doesNotMatch(meta.description, /^Explore |[\u3400-\u9fff]/);
      assert.equal(meta.description, meta.openGraph.description);
      assert.equal(meta.description, meta.twitter.description);
      assert.equal(meta.alternates.languages['zh-CN'], chinese);
      for (const target of locales) assert.equal(meta.alternates.languages[target === 'en' ? 'en-US' : target], `/${target}${chinese}`);
    }
    const social = buildProductSocialMetadata({ data: {}, title: slug, canonicalUrl: chinese });
    assert.equal(social.alternates.languages.fr, `/fr${chinese}`);
  }
  assert.equal(getProbeDetailAlternates('/fr/products/probes/nonexistent/'), undefined);
});

test('saved configuration count uses singular for one in EN, ES and FR', () => {
  assert.match(getSavedConfigurationText('en', 1), /^1 configuration saved/);
  assert.match(getSavedConfigurationText('en', 2), /^2 configurations saved/);
  assert.match(getSavedConfigurationText('es', 1), /^1 configuración guardada/);
  assert.match(getSavedConfigurationText('es', 2), /^2 configuraciones guardadas/);
  assert.match(getSavedConfigurationText('fr', 1), /^1 configuration enregistrée/);
  assert.match(getSavedConfigurationText('fr', 2), /^2 configurations enregistrées/);
});

test('localized technical figures are complete and retain source numbers', () => {
  const root = path.resolve(__dirname, '../../public/images/products/pumps/plunger-pump/ea/selection');
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'localized/localization-manifest.json'), 'utf8'));
  assert.equal(manifest.filter(row => row.geometryUnchanged).length, 40);
  assert.equal(manifest.filter(row => row.plotPixelsUnchanged).length, 5);
  for (const row of manifest.filter(row => row.geometryUnchanged)) {
    const file = getEaDiagramFile(`${row.name}.svg`, row.locale);
    const source = fs.readFileSync(path.join(root, `${row.name}.svg`), 'utf8');
    const localized = fs.readFileSync(path.join(root, file), 'utf8');
    const text = svg => [...svg.matchAll(/<text\b[^>]*>(.*?)<\/text>/gs)].map(match => match[1]).join(' ');
    assert.doesNotMatch(text(localized), /[\u3400-\u9fff]/);
    const numbers = svg => (text(svg).match(/\d+(?:[～.%]+\d+)?/g) || []).sort();
    assert.deepEqual(numbers(localized), numbers(source), `${row.name}/${row.locale}`);
    assert.ok(fs.existsSync(path.join(root, getEaDiagramFile(`${row.name}.webp`, row.locale))));
  }
  assert.equal(getEaDiagramFile('ea-stroke-positions-hd.webp', 'zh'), 'ea-stroke-positions-hd.webp');
});

test('application photo descriptions retain image identities and gas/free-flow distinctions in every locale', () => {
  for (const key of ['dpgl800-brushless', 'dpl30h-brushless', 'dpl30h-brushed']) {
    const source = getDiaphragmPumpProductPhotos(key, 'zh');
    const english = getDiaphragmPumpProductPhotos(key, 'en');
    assert.equal(source.length, 4);
    for (const locale of ['es', 'fr', 'ko', 'ru']) {
      const photos = getDiaphragmPumpProductPhotos(key, locale);
      for (const [i, photo] of photos.entries()) {
        assert.equal(photo.src, source[i].src);
        assert.notEqual(photo.alt, english[i].alt);
        assert.doesNotMatch(photo.alt, /[\u3400-\u9fff]/);
        assert.match(photo.alt, key.startsWith('dpgl') ? /6 L\/min/ : /300 mL\/min/);
        assert.doesNotMatch(photo.alt, key.startsWith('dpgl') ? /300 mL\/min/ : /6 L\/min/);
      }
    }
  }
});

test('humidity notes are localized without changing numerical limits or the source object', () => {
  const source = { slug: 'dpl30h-bs', specs: [{ label: 'Humidity', value: '30%–85% RH (Nonn-Condensing)' }] };
  const before = JSON.stringify(source);
  for (const locale of ['zh', ...locales]) {
    const result = applyDiaphragmPumpGuideSpecs(source, locale);
    assert.match(result.specs[0].value, /^30%–85% RH \(/);
    assert.doesNotMatch(result.specs[0].value, /Nonn-Condensing/);
    if (!['en', 'zh'].includes(locale)) assert.doesNotMatch(result.specs[0].value, /condensing/i);
  }
  assert.equal(JSON.stringify(source), before);
});
