/** Check every published application URL, including pages excluded by noindex.
 * The general SEO audit intentionally skips noindex pages, so it cannot catch
 * an accidentally retained review setting on a public application page.
 * Run after static URL normalization and sitemap generation.
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const argument = name => {
  const index = process.argv.indexOf(name);
  return index < 0 ? undefined : process.argv[index + 1];
};
const output = path.resolve(argument('--output') ?? 'out');
const reportPath = argument('--json');
const origin = 'https://www.foreachtek.com';
const locales = ['en', 'es', 'fr', 'ko', 'ru'];
const { entries } = JSON.parse(readFileSync('data/applications/application-route-map.json', 'utf8'));
const kinds = [...new Set(entries.map(entry => entry.kind))];
const routes = new Set([
  ...locales.map(locale => `/${locale}/applications/`),
  ...entries.flatMap(entry => locales.map(locale => entry.path.replace(/^\/en\//, `/${locale}/`))),
  ...kinds.map(kind => `/applications/${kind}/`),
]);
const failures = [];
const assert = (condition, route, message) => {
  if (!condition) failures.push({ route, message });
};
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)]
  .map(match => [match[1].toLowerCase(), match[2] ?? match[3]]));
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'gi'))].map(match => attributes(match[0]));
const sitemap = readFileSync(path.join(output, 'sitemap.xml'), 'utf8');
const sitemapCounts = new Map();
for (const [, url] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
  sitemapCounts.set(url, (sitemapCounts.get(url) ?? 0) + 1);
}

for (const route of routes) {
  const file = path.join(output, route, 'index.html');
  if (!existsSync(file)) {
    failures.push({ route, message: 'Missing exported application page' });
    continue;
  }
  const html = readFileSync(file, 'utf8');
  const locale = route.startsWith('/applications/') ? 'zh-CN' : route.split('/')[1];
  for (const meta of tags(html, 'meta')) {
    if (/^(robots|googlebot(?:-news)?)$/i.test(meta.name ?? '')) {
      assert(!/\b(noindex|nofollow|none)\b/i.test(meta.content ?? ''), route, `Blocking ${meta.name}: ${meta.content}`);
    }
  }
  const links = tags(html, 'link');
  const canonicals = links.filter(link => link.rel?.toLowerCase() === 'canonical');
  assert(canonicals.length === 1 && canonicals[0].href === origin + route, route, 'Expected one self-referencing canonical');
  assert(tags(html, 'html')[0]?.lang === locale, route, 'Incorrect document language');
  assert(sitemapCounts.get(origin + route) === 1, route, 'Missing or duplicated sitemap entry');

  const alternates = links.filter(link => link.rel?.toLowerCase() === 'alternate' && link.hreflang);
  const base = locale === 'zh-CN' ? route : route.replace(/^\/(en|es|fr|ko|ru)/, '');
  const expectedAlternates = locales.map(language => [language, `${origin}/${language}${base}`]);
  if (kinds.some(kind => base === `/applications/${kind}/`)) expectedAlternates.push(['zh-CN', origin + base]);
  for (const [language, href] of expectedAlternates) {
    const matches = alternates.filter(link => link.hreflang === language);
    assert(matches.length === 1 && matches[0].href === href, route, `Incorrect or missing ${language} alternate`);
  }
  const defaults = alternates.filter(link => link.hreflang === 'x-default');
  assert(defaults.length <= 1 && (!defaults.length || defaults[0].href === `${origin}/en${base}`), route, 'Incorrect x-default alternate');
}

// Enabling published pages must not expose search results or old aliases.
for (const locale of ['', ...locales]) {
  const route = `${locale ? `/${locale}` : ''}/search/`;
  const file = path.join(output, route, 'index.html');
  assert(existsSync(file), route, 'Missing search page for noindex guard');
  if (existsSync(file)) {
    const meta = tags(readFileSync(file, 'utf8'), 'meta');
    assert(meta.some(item => item.name === 'robots' && /\b(noindex|none)\b/i.test(item.content ?? '')), route, 'Search must remain noindex');
  }
  assert(!sitemapCounts.has(origin + route), route, 'Search must stay out of sitemap');
}
for (const entry of entries) {
  for (const alias of entry.aliases) {
    assert(!sitemapCounts.has(origin + alias), alias, 'Legacy alias must stay out of sitemap');
  }
}

const report = { output, applicationPages: routes.size, languages: ['zh-CN', ...locales], failures };
if (reportPath) writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ applicationPages: routes.size, failures: failures.length, sample: failures.slice(0, 12) }, null, 2));
if (failures.length) process.exitCode = 1;
