import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { applicationRoutes } from '../../data/applications/application-routes';
import { applicationTranslationLocales, localizedApplicationHref, localizeApplicationHref, localizedApplicationStaticParams } from '../../data/applications/international-locales/routes';
import { getApplicationTranslationDictionary, getCurrentEnglishApplicationDocument, getLocalizedApplicationDocument, getLocalizedApplicationMetadata, getLocalizedApplicationFooter, getLocalizedApplicationResources, getLocalizedApplicationBreadcrumbs, getLocalizedApplicationNavigation } from '../../services/applications/international-localized';
import { getApplicationIndexData } from '../../data/applications/application-index-locales';
import { getLanguageHref } from '../../lib/i18n/language-switch';
import { getCanonicalUrl } from '../../lib/seo/site-url';
import { getTechnicalArticlesPageData } from '../../services/resources/technical-articles/getTechnicalArticlesPageData';
import type { ApplicationDocument, ApplicationBlock } from '../../data/applications/analytical-documents/types';
import sourceIndex from '../../data/applications/international-locales/source-index.json';
import { isLiquidChromatographySlug } from '../../data/applications/analytical-documents/liquid-chromatography';
import { getLiquidChromatographyResources } from '../../services/applications/liquid-chromatography-resources';

function walk(value: unknown, visit: (value: string, key: string) => void, key = '') {
  if (typeof value === 'string') visit(value, key);
  else if (Array.isArray(value)) value.forEach(item => walk(item, visit, key));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => walk(item, visit, key));
}
function allBlocks(document: ApplicationDocument) { return [...document.intro, ...document.sections.flatMap(section => section.blocks)]; }
function tables(blocks: readonly ApplicationBlock[]) { return blocks.filter(block => block.type === 'table').map(block => ({ columns: block.headers.length, rows: block.rows.map(row => row.length) })); }
function getLinks(value: unknown) { const links = new Set<string>(); walk(value, (value, key) => { if (key === 'href') links.add(value); }); return links; }
const hash = (value: unknown) => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');

async function main() {
  const output = process.argv.find(arg => arg.startsWith('--output='))?.slice('--output='.length);
  const baselinePath = process.argv.find(arg => arg.startsWith('--baseline='))?.slice('--baseline='.length);
  const baseline = baselinePath ? JSON.parse(fs.readFileSync(baselinePath, 'utf8')) : undefined;
  const english = new Map<string, ApplicationDocument>();
  for (const route of applicationRoutes) {
    const document = await getCurrentEnglishApplicationDocument(route.kind, route.slug);
    if (baseline) assert.equal(hash(document), baseline.english[route.path], `English body changed: ${route.path}`);
    english.set(route.path, document);
  }
  if (baseline) assert.deepEqual(getApplicationIndexData('en').copy, baseline.indexes.en, 'English index copy changed');
  const results = [], links = new Set<string>();
  for (const locale of applicationTranslationLocales) {
    const dictionary = await getApplicationTranslationDictionary(locale);
    for (const [source, id] of Object.entries(sourceIndex)) {
      assert.ok(dictionary[id]?.trim(), `${locale}: missing ${id}`);
      assert.ok(!/[\u3400-\u9fff]/u.test(dictionary[id]), `${locale}:${id}: Chinese residue`);
      const placeholders = source.match(/\{[A-Za-z]+\}/g) ?? [];
      assert.deepEqual(dictionary[id].match(/\{[A-Za-z]+\}/g) ?? [], placeholders, `${locale}:${id}: placeholders`);
    }
    const documents = new Map<string, ApplicationDocument>();
    const expectedPages = [];
    for (const route of applicationRoutes) {
      const original = english.get(route.path)!;
      const document = await getLocalizedApplicationDocument(locale, route.kind, route.slug);
      const href = localizedApplicationHref(locale, route.kind, route.slug);
      documents.set(href, document);
      assert.equal(document.slug, original.slug);
      assert.equal(document.kind, original.kind);
      assert.deepEqual(document.sections.map(section => section.id), original.sections.map(section => section.id), `${href}: section IDs`);
      assert.deepEqual(document.references.map(ref => ref.id), original.references.map(ref => ref.id), `${href}: reference IDs`);
      const blocks = allBlocks(document), originalBlocks = allBlocks(original);
      assert.deepEqual(tables(blocks), tables(originalBlocks), `${href}: table dimensions`);
      // Inline links whose grammatical form changes can become adjacent link
      // lists; all non-link blocks and every original destination must remain.
      assert.deepEqual(blocks.filter(b => b.type !== 'links').map(b => b.type), originalBlocks.filter(b => b.type !== 'links').map(b => b.type), `${href}: body blocks`);
      const translatedLinks = getLinks(document);
      for (const link of getLinks(original)) assert.ok(translatedLinks.has(localizeApplicationHref(link, locale)), `${href}: dropped link ${link}`);
      const references = new Set(document.references.map(reference => reference.id));
      for (const block of blocks) {
        for (const id of block.references ?? []) assert.ok(references.has(id), `${href}: invalid citation ${id}`);
        if (block.type === 'table') for (const row of block.rows) assert.equal(row.length, block.headers.length, `${href}: table width`);
      }
      const metadata = getLocalizedApplicationMetadata(locale, route.kind, document);
      assert.equal(metadata.title, document.seoTitle);
      assert.equal(metadata.description, document.description);
      assert.equal(metadata.alternates?.canonical, getCanonicalUrl(href));
      for (const other of ['en', ...applicationTranslationLocales] as const) assert.equal(metadata.alternates?.languages?.[other], getCanonicalUrl(localizedApplicationHref(other, route.kind, route.slug)));
      assert.deepEqual(metadata.robots, { index: true, follow: true }, `${href}: published application must allow indexing`);
      const resources = await getLocalizedApplicationResources(locale, route.kind, document);
      if (route.kind === 'analytical-instruments' && isLiquidChromatographySlug(document.slug)) {
        const originalResources = getLiquidChromatographyResources(document.slug);
        assert.deepEqual(resources.products?.map(product => product.href), originalResources.products?.map(product => localizeApplicationHref(product.href, locale)), `${href}: LC product cards`);
        assert.deepEqual(resources.articles?.map(article => article.slug), originalResources.articles?.map(article => article.slug), `${href}: LC technical reading`);
      }
      const footer = await getLocalizedApplicationFooter(locale, route.kind, document);
      const breadcrumbs = await getLocalizedApplicationBreadcrumbs(locale, route.kind, document);
      walk({ document, resources, footer, breadcrumbs }, (text, key) => {
        assert.ok(!/[\u3400-\u9fff]/u.test(text), `${href}: untranslated Chinese ${text}`);
        if (key === 'href' && text.startsWith('/')) {
          links.add(text);
          if (/^\/(en|es|fr|ko|ru)\//.test(text)) assert.ok(text.startsWith(`/${locale}/`), `${href}: wrong language ${text}`);
        }
      });
      for (const article of resources.articles) assert.ok(getTechnicalArticlesPageData(locale).articles.some(candidate => candidate.slug === article.slug), `${href}: unavailable local reading`);
      for (const other of ['en', ...applicationTranslationLocales] as const) assert.equal(getLanguageHref(href, other, '#validation'), localizedApplicationHref(other, route.kind, route.slug) + '#validation');
      expectedPages.push({ href, title: document.title, seoTitle: document.seoTitle, description: document.description, sections: document.sections.map(section => section.id), robots: metadata.robots });
    }
    for (const [href, document] of documents) {
      for (const link of getLinks(document)) {
        const url = new URL(link, 'https://www.foreachtek.com');
        if (url.pathname.startsWith(`/${locale}/applications/`) && url.pathname !== `/${locale}/applications/`) {
          const target = documents.get(url.pathname);
          assert.ok(target, `${href}: missing application target ${link}`);
          if (url.hash) assert.ok(target.sections.some(section => `#${section.id}` === url.hash) || target.references.some(reference => `#ref-${reference.id}` === url.hash) || ['#references', '#related-guides', '#contact'].includes(url.hash), `${href}: missing section ${link}`);
        }
      }
    }
    for (const kind of new Set(applicationRoutes.map(route => route.kind))) {
      assert.equal(localizedApplicationStaticParams(kind).filter(p => p.locale === locale).length, applicationRoutes.filter(route => route.kind === kind && route.slug).length);
      const hub = documents.get(localizedApplicationHref(locale, kind))!;
      const nav = await getLocalizedApplicationNavigation(locale, kind, hub);
      for (const link of getLinks(nav)) assert.ok(documents.has(link), `${locale}: missing navigation target ${link}`);
    }
    const index = getApplicationIndexData(locale);
    for (const area of index.areas) for (const topic of area.topics) assert.ok(documents.has(topic.href), `${locale}: index topic destination ${topic.href}`);
    results.push({ locale, documents: documents.size, pagesIncludingIndex: documents.size + 1, dictionaryStrings: Object.keys(dictionary).length, expectedPages, expectedIndex: { href: `/${locale}/applications/`, title: index.copy.heroTitle + index.copy.heroHighlight, seoTitle: index.copy.seoTitle, description: index.copy.seoDescription } });
  }
  const report = { results, internalLinks: [...links].sort(), englishDocumentsUnchanged: baseline ? english.size : undefined };
  if (output) fs.writeFileSync(output, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ results: results.map(({ expectedPages, ...result }) => result), internalLinks: links.size, englishDocumentsUnchanged: report.englishDocumentsUnchanged }, null, 2));
}
void main();
