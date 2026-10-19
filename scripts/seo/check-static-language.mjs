import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// Keep fixtures outside the site output and preserve them for inspection.
const rootArg = process.argv.find(argument => argument.startsWith('--fixtures-root='));
if (!rootArg) throw new Error('Provide --fixtures-root=<audit directory>');
const auditRoot = path.resolve(rootArg.slice('--fixtures-root='.length));
await mkdir(auditRoot, { recursive: true });
const outputRoot = await mkdtemp(path.join(auditRoot, 'static-language-'));
const locales = ['en', 'es', 'fr', 'ko', 'ru'];
const fixtures = [
  ...locales.flatMap(locale => [
    { route: `${locale}/applications/index.html`, lang: locale, review: false },
    { route: `${locale}/applications/ivd/review/index.html`, lang: locale, review: true },
    { route: `${locale}/contact/index.html`, lang: locale, review: false },
  ]),
  { route: 'applications/ivd/index.html', lang: 'zh-CN', review: true },
];
for (const fixture of fixtures) {
  const file = path.join(outputRoot, fixture.route);
  await mkdir(path.dirname(file), { recursive: true });
  fixture.html = `<html class="site" lang="zh-CN"><head><title>Fixture</title>${fixture.review ? '<meta name="robots" content="noindex, nofollow"/>' : ''}</head><body><p>Content stays unchanged.</p></body></html>`;
  await writeFile(file, fixture.html);
}
const run = () => execFileSync(process.execPath, ['scripts/seo/normalize-static-urls.mjs', `--output-root=${outputRoot}`], { encoding: 'utf8' });
run();
const firstPass = new Map();
for (const fixture of fixtures) {
  const html = await readFile(path.join(outputRoot, fixture.route), 'utf8');
  firstPass.set(fixture.route, html);
  assert.match(html, new RegExp(`<html[^>]+lang="${fixture.lang}"`));
  assert.ok(html.includes('<p>Content stays unchanged.</p>'));
  if (fixture.review) {
    assert.equal(html.replace(/lang="[^"]+"/, 'lang="zh-CN"'), fixture.html, 'Review pages must retain robots and other metadata');
  } else {
    assert.equal([...html.matchAll(/rel="canonical"/g)].length, 1);
    assert.ok(!html.includes('/ivd/review/'), 'Hreflang must not include noindex pages');
    assert.equal([...html.matchAll(/rel="alternate"/g)].length, locales.length);
  }
}
run();
for (const fixture of fixtures) assert.equal(await readFile(path.join(outputRoot, fixture.route), 'utf8'), firstPass.get(fixture.route), 'Normalization must be idempotent');
console.log(`Static language checks passed: ${fixtures.length} pages; noindex preserved; canonical/hreflang and idempotence checked. Fixtures: ${outputRoot}`);
