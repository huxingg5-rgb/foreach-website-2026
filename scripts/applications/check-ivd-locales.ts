import internationalSourceIndex from '../../data/applications/international-locales/source-index.json';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getLocalizedIvdDocument, getIvdMetadata, getLocalizedIvdResources, getIvdNavigation, getIvdBreadcrumbs, getIvdQueryTargets } from '../../services/applications/ivd-localized';
import { getReviewDocument } from '../../services/applications/english-review';
import { getReviewHub } from '../../data/applications/english-review';
import { ivdLocales, ivdRoutes, ivdDocumentHref, resolveLocalizedIvdQuery } from '../../data/applications/ivd-locales/routes';
import { getIvdReadingPlan } from '../../data/applications/ivd-locales/reading';
import sourceStrings from '../../data/applications/ivd-locales/source-strings.json';
import { getTechnicalArticlesPageData } from '../../services/resources/technical-articles/getTechnicalArticlesPageData';
import type { ApplicationDocument } from '../../data/applications/analytical-documents/types';

const links = new Set<string>();
const documents = new Map<string, ApplicationDocument>();
function visit(value: unknown, fn: (key: string, value: string) => void, key = '') {
  if (typeof value === 'string') fn(key, value);
  else if (Array.isArray(value)) value.forEach(item => visit(item, fn, key));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([name, item]) => visit(item, fn, name));
}
async function main() {
  const requested = process.argv.find(arg => arg.startsWith('--locales='))?.slice('--locales='.length).split(',');
  const locales = ivdLocales.filter(locale => !requested || requested.includes(locale));
  assert.ok(locales.length, 'No valid locales requested');
  let productMentions = 0, articleLinks = 0;
  for (const locale of locales) {
    const copy = JSON.parse(fs.readFileSync(path.join(process.cwd(), `data/applications/${locale === 'en' ? 'ivd-locales' : 'international-locales'}/${locale}.json`), 'utf8')) as Record<string, string>;
    const ids = locale === 'en' ? sourceStrings.map((_, index) => String(index)) : Object.values(internationalSourceIndex);
    ids.forEach(id => assert.ok(copy[id]?.trim(), `${locale}: missing ${id}`));
    for (const route of ivdRoutes) {
      const original = locale === 'en' ? (route.slug ? (await getReviewDocument('ivd', route.slug))! : getReviewHub('ivd')) : await getLocalizedIvdDocument('en', route.slug);
      const doc = await getLocalizedIvdDocument(locale, route.slug);
      documents.set(ivdDocumentHref(locale, route.slug), doc);
      assert.deepEqual(doc.sections.map(s => s.id), original.sections.map(s => s.id), `${locale}/${route.slug}: section IDs`);
      assert.deepEqual(doc.references.map(r => r.id), original.references.map(r => r.id), `${locale}/${route.slug}: reference IDs`);
      for (const reading of getIvdReadingPlan(doc)) assert.ok(doc.sections.some(s => s.id === reading.section), `${route.slug}: reading section ${reading.section}`);
      const references = new Set(doc.references.map(ref => ref.id));
      const blocks = [...doc.intro, ...doc.sections.flatMap(s => s.blocks)];
      for (const block of blocks) {
        for (const id of block.references ?? []) assert.ok(references.has(id), `${route.slug}: unknown reference ${id}`);
        if (block.type === 'table') for (const row of block.rows) assert.equal(row.length, block.headers.length, `${route.slug}: table cells`);
        productMentions += block.inlineLinks?.length ?? 0;
        if (block.type === 'links') articleLinks += block.items.filter(item => item.href.includes('/technical-articles/')).length;
      }
      for (const [index, section] of original.sections.entries()) {
        const translated = doc.sections[index];
        if (locale === 'en') {
          assert.deepEqual(translated.blocks.slice(0, section.blocks.length).map(b => b.type), section.blocks.map(b => b.type), `${route.slug}: block structure`);
        } else {
          // Inflected product anchors can appear as adjacent link lists.
          assert.deepEqual(translated.blocks.filter(b => b.type !== 'links').map(b => b.type), section.blocks.filter(b => b.type !== 'links').map(b => b.type), `${route.slug}: localized body structure`);
        }
        assert.deepEqual(translated.blocks.filter(b => b.type === 'table').map(b => b.rows.map(row => row.length)), section.blocks.filter(b => b.type === 'table').map(b => b.rows.map(row => row.length)), `${route.slug}: table structure`);
      }
      const nav = await getIvdNavigation(locale, doc);
      const crumbs = await getIvdBreadcrumbs(locale, doc);
      const resources = getLocalizedIvdResources(locale, doc);
      visit({ doc, nav, crumbs, resources }, (key, value) => {
        assert.ok(!/[\u3400-\u9fff]/u.test(value), `${locale}/${route.slug}: Han text: ${value}`);
        if (key === 'href' && value.startsWith('/')) {
          links.add(value);
          if (/^\/(en|es|fr|ko|ru)\//.test(value)) assert.ok(value.startsWith(`/${locale}/`), `${locale}: wrong-language link ${value}`);
        }
      });
      for (const article of resources.articles) links.add(`/${locale}/resources/technical-articles/${article.slug}/`);
      const metadata = getIvdMetadata(locale, doc);
      assert.equal(metadata.description, doc.description);
      for (const other of ivdLocales) assert.ok(metadata.alternates?.languages?.[other]);
      const expectedParent = crumbs.slice(0, -1).reverse().find(c => c.href);
      assert.ok(expectedParent?.href);
    }
    for (const [topic, target] of Object.entries(getIvdQueryTargets(locale))) {
      assert.equal(resolveLocalizedIvdQuery(`/${locale}/applications/ivd/?instrument=${topic}`), target.href);
      const targetDoc = documents.get(target.href)!;
      for (const id of Object.values(target.modules)) assert.ok(targetDoc.sections.some(section => section.id === id), `${locale}/${topic}: query anchor ${id}`);
    }
  }
  for (const href of links) {
    const [pathname, fragment] = href.split('#');
    if (/^\/(en|es|fr|ko|ru)\/applications\/ivd\//.test(pathname)) {
      const doc = documents.get(pathname);
      assert.ok(doc, `Missing IVD destination: ${href}`);
      if (fragment) assert.ok(doc.sections.some(s => s.id === fragment) || doc.references.some(r => `ref-${r.id}` === fragment) || ['references','related-guides','contact'].includes(fragment), `Missing IVD anchor: ${href}`);
    }
    const article = href.match(/^\/(en|es|fr|ko|ru)\/resources\/technical-articles\/([^/]+)\//);
    if (article) assert.ok(getTechnicalArticlesPageData(article[1] as typeof ivdLocales[number]).articles.some(item => item.slug === article[2]), `Missing published article: ${href}`);
    if (/^\/(documents|downloads|images)\//.test(href)) assert.ok(fs.existsSync(path.join(process.cwd(), 'public', pathname)), `Missing asset: ${href}`);
  }
  const report = { locales, documents: documents.size, sourceStrings: sourceStrings.length, productMentionLinks: productMentions, contextualArticleLinks: articleLinks, internalLinks: [...links].sort(), documentPaths: [...documents.keys()], expectedPages: [...documents].map(([href, doc]) => ({ href, title: doc.title, sections: doc.sections.map(section => section.id), references: doc.references.map(reference => reference.id) })) };
  const output = process.argv.find(arg => arg.startsWith('--output='))?.slice('--output='.length);
  if (output) fs.writeFileSync(output, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ ...report, internalLinks: links.size, documentPaths: documents.size, expectedPages: documents.size }, null, 2));
}
void main();
