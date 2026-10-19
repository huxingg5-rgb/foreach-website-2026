import assert from 'node:assert/strict';
import { getLanguageHref } from '../../lib/i18n/language-switch';
import type { LocaleCode } from '../../lib/i18n';
import { getReviewDocument } from '../../services/applications/english-review';
import { getEnglishApplicationDocument, getEnglishApplicationMetadata } from '../../services/applications/english-localized';
import { applicationRoutes } from '../../data/applications/application-routes';
import french from '../../data/applications/application-french-reviewed.json';
import russian from '../../data/applications/application-russian-reviewed.json';
import { getLifeScienceApplicationPageData } from '../../services/applications/life-science/getLifeScienceApplicationPageData';
import { getLabAutomationApplicationPageData } from '../../services/applications/lab-automation/getLabAutomationApplicationPageData';
import { getAnalyticalInstrumentsApplicationPageData } from '../../services/applications/analytical-instruments/getAnalyticalInstrumentsApplicationPageData';
import { getEnvironmentalMonitoringApplicationPageData } from '../../services/applications/environmental-monitoring/getEnvironmentalMonitoringApplicationPageData';
import { getSyntheticBiologyApplicationPageData } from '../../services/applications/synthetic-biology/getSyntheticBiologyApplicationPageData';

const han = /[\u3400-\u9fff]/u;
function checkReviewedCopy(source: unknown, translated: unknown, dictionary: Record<string, string>, label: string, keys: Set<string>): number {
  if (typeof source === 'string') {
    if (han.test(source)) {
      keys.add(source);
      assert.ok(dictionary[source], `${label}: missing reviewed copy`);
      assert.equal(translated, dictionary[source], `${label}: runtime copy does not match reviewed copy`);
      assert.ok(!han.test(String(translated)), `${label}: Chinese residue`);
      return 1;
    }
    if (!source.startsWith('/')) assert.equal(translated, source, `${label}: nonlocalized ID, specification or asset changed`);
    return 0;
  }
  if (source && typeof source === 'object') {
    assert.ok(translated && typeof translated === 'object', label);
    assert.deepEqual(Object.keys(translated), Object.keys(source), `${label}: shape`);
    return Object.entries(source).reduce((count, [key, value]) => count + checkReviewedCopy(value, (translated as Record<string, unknown>)[key], dictionary, `${label}.${key}`, keys), 0);
  }
  assert.equal(translated, source, label);
  return 0;
}

async function main() {
  const cases: [string, LocaleCode, string, string][] = [
    ['/fr/applications/life-science/', 'ru', '?group=genomics&lang=fr#workflow', '/ru/applications/life-science/?group=genomics#workflow'],
    ['/es/applications/environmental-monitoring', 'fr', '?group=gasPretreatment&locale=es', '/fr/applications/environmental-monitoring/?group=gasPretreatment'],
    ['/en/applications/life-science/guide-genomics/', 'fr', '#acceptance', '/fr/applications/life-science/guide-genomics/#acceptance'],
    ['/en/applications/life-science/guide-genomics/', 'zh-CN', '#acceptance', '/applications/life-science/'],
    ['/en/applications/ivd/guide-coagulation/', 'ko', '#validation', '/ko/applications/ivd/guide-coagulation/#validation'],
    ['/en/applications/ivd/guide-coagulation/', 'zh-CN', '#validation', '/applications/ivd/'],
    ['/en/applications', 'es', '', '/es/applications/'],
    ['/fr/applications/', 'zh-CN', '', '/applications/ivd/'],
    ['/en/products/tubing-assemblies/', 'zh-CN', '', '/products/'],
    ['/en/products/tubing/peek-tubing/', 'fr', '', '/fr/products/tubing/?productType=peek-tubing'],
    ['/en/products/tubing/peek-tubing/', 'fr', '?source=selection&productType=ptfe-tubing#models', '/fr/products/tubing/?productType=peek-tubing&source=selection#models'],
    ['/en/contact/', 'fr', '?source=applications', '/fr/contact/?source=applications'],
    ['/en/', 'zh-CN', '', '/'],
  ];
  for (const [source, locale, suffix, expected] of cases) {
    assert.equal(getLanguageHref(source, locale, suffix), expected, `${source} -> ${locale}`);
  }
  const locales: LocaleCode[] = ['en', 'es', 'fr', 'ko', 'ru', 'zh-CN'];
  for (const route of applicationRoutes) {
    for (const locale of locales) {
      const result = getLanguageHref(route.path, locale);
      assert.ok(result.endsWith('/'), `${result}: trailing slash`);
      if (locale !== 'zh-CN') assert.equal(result, route.path.replace(/^\/en\//, `/${locale}/`));
      if (route.kind !== 'ivd' && route.slug && locale === 'zh-CN') {
        assert.equal(result, `/applications/${route.kind}/`);
      }
    }
  }
  for (const [slug, marker] of [['sampling-prep-dilution', 'settling'], ['sampling-prep-filtration', 'fraction']] as const) {
    const source = await getReviewDocument('environmental-monitoring', slug);
    assert.ok(source);
    const before = JSON.stringify(source);
    const document = getEnglishApplicationDocument(source, 'environmental-monitoring');
    assert.equal(JSON.stringify(source), before, 'Shared review source must not mutate');
    for (const sectionId of ['working-conditions', 'acceptance', 'fault-recovery']) {
      assert.match(JSON.stringify(document.sections.find(section => section.id === sectionId)), new RegExp(marker, 'i'), `${slug}/${sectionId}`);
    }
    assert.deepEqual(getEnglishApplicationMetadata(source, 'environmental-monitoring').robots, { index: true, follow: true });
    const analytical = await getReviewDocument('analytical-instruments', slug.replace('sampling-prep', 'sample-prep'));
    assert.ok(analytical);
    const analyticalDocument = getEnglishApplicationDocument(analytical, 'analytical-instruments');
    assert.notDeepEqual(document.sections.find(section => section.id === 'working-conditions')?.blocks, analyticalDocument.sections.find(section => section.id === 'working-conditions')?.blocks);
  }
  const loaders = [getLifeScienceApplicationPageData, getLabAutomationApplicationPageData, getAnalyticalInstrumentsApplicationPageData, getEnvironmentalMonitoringApplicationPageData, getSyntheticBiologyApplicationPageData];
  const coverage: Record<string, { keys: number; occurrences: number }> = {};
  for (const [locale, dictionary] of [['fr', french], ['ru', russian]] as const) {
    const keys = new Set<string>();
    let occurrences = 0;
    for (const load of loaders) occurrences += checkReviewedCopy(load('zh-CN'), load(locale), dictionary, `${locale}.${load.name}`, keys);
    assert.deepEqual([...keys].sort(), Object.keys(dictionary).sort(), `${locale}: dictionary scope`);
    coverage[locale] = { keys: keys.size, occurrences };
  }
  assert.ok(!JSON.stringify(loaders.map(load => load('ko'))).includes('잭킹 밸브'), 'Pinch valves must not use the old mistranslation');
  console.log(JSON.stringify({ urlCases: cases.length, routeLocaleCombinations: applicationRoutes.length * locales.length, environmentalTasks: 2, reviewedCopy: coverage }, null, 2));
}
void main();
