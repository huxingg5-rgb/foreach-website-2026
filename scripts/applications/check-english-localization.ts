import assert from 'node:assert/strict';
import fs from 'node:fs';
import { applicationRoutes, resolveApplicationHref } from '../../data/applications/application-routes';
import { getReviewHub, getReviewNav, getReviewBreadcrumb, reviewDomains } from '../../data/applications/english-review';
import { getReviewHierarchyNavigation } from '../../data/applications/english-review-hierarchy';
import { getReviewFooterPlan } from '../../data/applications/english-review-resources';
import { getReviewDocument, isFinalizedEnglishReference } from '../../services/applications/english-review';
import { getEnglishApplicationDocument, getEnglishApplicationMetadata, getEnglishApplicationSchema, translateApplicationEnglish } from '../../services/applications/english-localized';
import { getEnglishReviewResources } from '../../services/applications/english-review-resources';
import { getTechnicalArticlesPageData } from '../../services/resources/technical-articles/getTechnicalArticlesPageData';
import type { ApplicationBlock } from '../../data/applications/analytical-documents/types';

function visit(value: unknown, fn: (key: string, value: string) => void, key = '') {
  if (typeof value === 'string') fn(key, value);
  else if (Array.isArray(value)) value.forEach(item => visit(item, fn, key));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([name, item]) => visit(item, fn, name));
}

function wholePhrase(text: string, phrase: string): number {
  let start = text.indexOf(phrase);
  while (start >= 0) {
    const before = text[start - 1] ?? '';
    const after = text[start + phrase.length] ?? '';
    if ((!/^[A-Za-z0-9]/.test(phrase) || !/[A-Za-z0-9]/.test(before)) && (!/[A-Za-z0-9]$/.test(phrase) || !/[A-Za-z0-9]/.test(after))) return start;
    start = text.indexOf(phrase, start + 1);
  }
  return -1;
}

function checkInlineLinks(block: ApplicationBlock, label: string) {
  const texts = block.type === 'table' ? block.rows.flat() : block.type === 'list' ? block.items : 'text' in block ? [block.text] : [];
  for (const link of block.inlineLinks ?? []) assert.ok(texts.some(text => wholePhrase(text, link.text) >= 0), `${label}: missing inline text ${link.text}`);
  for (const text of texts) {
    const matches = (block.inlineLinks ?? []).map(link => ({ text: link.text, start: wholePhrase(text, link.text) })).filter(item => item.start >= 0).sort((a, b) => a.start - b.start);
    for (let i = 1; i < matches.length; i++) assert.ok(matches[i].start >= matches[i - 1].start + matches[i - 1].text.length, `${label}: overlapping inline links ${matches[i - 1].text} / ${matches[i].text}`);
  }
}

async function main() {
  const routes = applicationRoutes.filter(route => route.kind !== 'ivd' && route.template === 'review' && !isFinalizedEnglishReference(route.kind, route.slug));
  const knownRoutes = new Set(applicationRoutes.map(route => route.path));
  const articles = new Set(getTechnicalArticlesPageData('en').articles.map(article => article.slug));
  const links = new Set<string>();
  const expectedPages = [];
  let inlineLinks = 0;
  for (const route of routes) {
    const source = route.slug ? await getReviewDocument(route.kind, route.slug) : getReviewHub(route.kind);
    assert.ok(source, `${route.path}: missing source`);
    const doc = getEnglishApplicationDocument(source, route.kind);
    assert.deepEqual(doc.sections.map(section => section.id), source.sections.map(section => section.id), `${route.path}: section IDs`);
    assert.deepEqual(doc.references.map(reference => reference.id), source.references.map(reference => reference.id), `${route.path}: reference IDs`);
    assert.equal(new Set(doc.sections.map(section => section.id)).size, doc.sections.length, `${route.path}: duplicate sections`);
    const referenceIds = new Set(doc.references.map(reference => reference.id));
    for (const block of [...doc.intro, ...doc.sections.flatMap(section => section.blocks)]) {
      if (block.type === 'table') block.rows.forEach(row => assert.equal(row.length, block.headers.length, `${route.path}: table columns`));
      for (const id of block.references ?? []) assert.ok(referenceIds.has(id), `${route.path}: reference ${id}`);
      checkInlineLinks(block, route.path);
      inlineLinks += block.inlineLinks?.length ?? 0;
    }
    const navigation = translateApplicationEnglish(getReviewNav(route.kind, source));
    const hierarchy = translateApplicationEnglish(getReviewHierarchyNavigation(route.kind, source));
    const breadcrumbs = translateApplicationEnglish(getReviewBreadcrumb(route.kind, source, route.path));
    const cta = translateApplicationEnglish(getReviewFooterPlan(route.kind, source).cta);
    const domain = translateApplicationEnglish(reviewDomains[route.kind]);
    const resources = getEnglishReviewResources(route.kind, source);
    const metadata = getEnglishApplicationMetadata(source, route.kind);
    assert.equal(metadata.description, doc.description, `${route.path}: metadata description`);
    assert.equal(metadata.title, doc.seoTitle, `${route.path}: metadata title`);
    const schema = getEnglishApplicationSchema(doc, route.path, breadcrumbs);
    visit({ doc, navigation, hierarchy, breadcrumbs, cta, domain, resources, metadata, schema }, (key, value) => {
      assert.ok(!/[\u3400-\u9fff]/u.test(value), `${route.path}: Chinese text ${value}`);
      if (key === 'href' && value.startsWith('/')) {
        links.add(value);
        if (/^\/(en|es|fr|ko|ru)\//.test(value)) assert.ok(value.startsWith('/en/'), `${route.path}: wrong locale ${value}`);
        if (value.startsWith('/en/applications/') && value !== '/en/applications/') assert.ok(knownRoutes.has(resolveApplicationHref(value).split(/[?#]/)[0]), `${route.path}: unknown application ${value}`);
      }
    });
    for (const article of resources.articles) {
      assert.ok(articles.has(article.slug), `${route.path}: missing English article ${article.slug}`);
      links.add(`/en/resources/technical-articles/${article.slug}/`);
    }
    expectedPages.push({ href: route.path, title: doc.title, seoTitle: doc.seoTitle, description: doc.description, sections: doc.sections.map(section => section.id), references: doc.references.map(reference => reference.id) });
  }
  assert.ok(routes.length > 0);
  const result = { documents: routes.length, byKind: Object.fromEntries([...new Set(routes.map(route => route.kind))].map(kind => [kind, routes.filter(route => route.kind === kind).length])), inlineLinks, internalLinks: [...links].sort(), expectedPages };
  const output = process.argv.find(argument => argument.startsWith('--output='))?.slice('--output='.length);
  if (output) fs.writeFileSync(output, JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ ...result, internalLinks: links.size, expectedPages: expectedPages.length }, null, 2));
}
void main();
