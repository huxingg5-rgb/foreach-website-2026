/**
 * Run from the repository root:
 *   node --import tsx scripts/applications/generate-application-routes.ts
 *   node --import tsx scripts/applications/generate-application-routes.ts --check
 * --out supports a staging JSON destination without touching repository files.
 * --redirects-out optionally stages the generated Cloudflare redirect block too.
 * With no --out, both the route map and public/_redirects are generated/checked.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

type RouteEntry = {
  path: string;
  kind: string;
  slug: string;
  template: 'review' | 'analytical';
  aliases: string[];
};
type HierarchyEntry = {
  slug: string;
  level: 'product' | 'task';
  topic: string;
  parentSlug?: string;
};
type DocumentEntry = { slug: string; kind: 'hub' | 'overview' | 'task'; group?: string };

const args = process.argv.slice(2);
const check = args.includes('--check');
const outputFlag = args.indexOf('--out');
const redirectsFlag = args.indexOf('--redirects-out');
const valueFlags = ['--out', '--redirects-out'];
if (args.some((arg, index) => arg !== '--check' && !valueFlags.includes(arg) && !valueFlags.includes(args[index - 1]))) {
  throw new Error('Usage: generate-application-routes.ts [--check] [--out PATH] [--redirects-out PATH]');
}
for (const flag of valueFlags) {
  const index = args.indexOf(flag);
  if (index !== -1 && (!args[index + 1] || args[index + 1].startsWith('--') || args.lastIndexOf(flag) !== index)) {
    throw new Error(`${flag} requires one file path`);
  }
}
const root = process.cwd();
const output = path.resolve(root, outputFlag === -1 ? 'data/applications/application-route-map.json' : args[outputFlag + 1]);
const syncRedirects = outputFlag === -1 || redirectsFlag !== -1;
const redirectsSource = path.join(root, 'public/_redirects');
const redirectsOutput = path.resolve(root, redirectsFlag === -1 ? 'public/_redirects' : args[redirectsFlag + 1]);
// Resolve source metadata from cwd so this script also works from a staging folder.
const sourceRequire = createRequire(path.join(root, 'package.json'));
const source = (relative: string) => sourceRequire(path.join(root, relative));
const { applicationArticleGroups, applicationArticleSlug } = source('data/applications/application-article-links.ts') as {
  applicationArticleGroups: Record<string, readonly string[]>;
  applicationArticleSlug: (kind: string, group: string) => string;
};
const { getReviewHierarchyEntries } = source('data/applications/english-review-hierarchy.ts') as {
  getReviewHierarchyEntries: (kind: string) => HierarchyEntry[];
};
const { analyticalDocuments, IVD_CLINICAL_DOCUMENT_SLUGS } = source('data/applications/analytical-documents/registry.ts') as {
  analyticalDocuments: readonly DocumentEntry[];
  IVD_CLINICAL_DOCUMENT_SLUGS: readonly string[];
};
const { liquidChromatographyDocuments } = source('data/applications/analytical-documents/liquid-chromatography.ts') as {
  liquidChromatographyDocuments: readonly DocumentEntry[];
};

const segmentPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const base = (kind: string) => `/en/applications/${kind}/`;
const flat = (kind: string, slug: string) => base(kind) + (slug ? `${slug}/` : '');
const entries: RouteEntry[] = [];
const byId = new Map<string, RouteEntry>();
function add(kind: string, slug: string, segments: string[], template: RouteEntry['template'] = 'review') {
  if (!segmentPattern.test(kind) || segments.some(segment => !segmentPattern.test(segment))) {
    throw new Error(`Invalid application path segment: ${kind}/${segments.join('/')}`);
  }
  if (slug !== (segments.at(-1) ?? '')) throw new Error(`Source slug must remain the final segment: ${kind}/${slug}`);
  const key = `${kind}/${slug}`;
  if (byId.has(key)) throw new Error(`Duplicate application document: ${key}`);
  const canonical = base(kind) + (segments.length ? `${segments.join('/')}/` : '');
  const oldPath = flat(kind, slug);
  const entry = { path: canonical, kind, slug, template, aliases: oldPath === canonical ? [] : [oldPath] };
  entries.push(entry);
  byId.set(key, entry);
}

for (const [kind, topics] of Object.entries(applicationArticleGroups)) {
  add(kind, '', [], kind === 'analytical-instruments' ? 'analytical' : 'review');
  for (const topic of topics) {
    const slug = applicationArticleSlug(kind, topic);
    add(kind, slug, [slug], slug === 'liquid-chromatography' ? 'analytical' : 'review');
  }
  const hierarchy = getReviewHierarchyEntries(kind);
  const hierarchyBySlug = new Map(hierarchy.map(entry => [entry.slug, entry]));
  for (const entry of hierarchy) {
    if (!topics.includes(entry.topic)) throw new Error(`Unregistered topic: ${kind}/${entry.topic}`);
    const topicSlug = applicationArticleSlug(kind, entry.topic);
    if (entry.level === 'product') {
      if (entry.parentSlug) throw new Error(`Product has an unexpected product parent: ${kind}/${entry.slug}`);
      add(kind, entry.slug, [topicSlug, entry.slug]);
    } else {
      const parent = entry.parentSlug && hierarchyBySlug.get(entry.parentSlug);
      if (!parent || parent.level !== 'product' || parent.topic !== entry.topic) {
        throw new Error(`Task lacks a product parent in the same topic: ${kind}/${entry.slug}`);
      }
      add(kind, entry.slug, [topicSlug, parent.slug, entry.slug]);
    }
  }
}

const analyticalKind = 'analytical-instruments';
const lcRoot = 'liquid-chromatography';
const lcBySlug = new Map(liquidChromatographyDocuments.map(entry => [entry.slug, entry]));
for (const document of liquidChromatographyDocuments) {
  if (document.slug === lcRoot) continue; // Added with the topic pages above.
  if (document.kind === 'overview') {
    add(analyticalKind, document.slug, [lcRoot, document.slug], 'analytical');
  } else if (document.kind === 'task') {
    const parent = document.group && lcBySlug.get(document.group);
    if (!parent || parent.kind !== 'overview' || parent.slug === lcRoot) {
      throw new Error(`LC task lacks a product parent: ${document.slug}`);
    }
    add(analyticalKind, document.slug, [lcRoot, parent.slug, document.slug], 'analytical');
  } else {
    throw new Error(`Unexpected LC document kind: ${document.slug}`);
  }
}

// The generic analytical guides have no device topic. Do not invent one.
const generic = analyticalDocuments.filter(document => document.slug && !lcBySlug.has(document.slug)
  && !IVD_CLINICAL_DOCUMENT_SLUGS.includes(document.slug));
const genericBySlug = new Map(generic.map(document => [document.slug, document]));
for (const document of generic) {
  if (document.kind === 'overview') {
    add(analyticalKind, document.slug, [document.slug]);
  } else if (document.kind === 'task') {
    const parent = document.group && genericBySlug.get(document.group);
    if (!parent || parent.kind !== 'overview') throw new Error(`Generic task lacks a product parent: ${document.slug}`);
    add(analyticalKind, document.slug, [parent.slug, document.slug]);
  } else {
    throw new Error(`Unexpected generic document kind: ${document.slug}`);
  }
}

// Both historical locations resolve directly to the same clinical document.
for (const slug of IVD_CLINICAL_DOCUMENT_SLUGS) {
  const target = byId.get(`ivd/${slug}`);
  if (!target) throw new Error(`Missing clinical alias destination: ${slug}`);
  target.aliases.push(flat(analyticalKind, slug));
}

const byPath = new Map<string, RouteEntry>();
for (const entry of entries) {
  if (byPath.has(entry.path)) throw new Error(`Duplicate canonical path: ${entry.path}`);
  byPath.set(entry.path, entry);
}
const aliases = new Map<string, string>();
for (const entry of entries) {
  entry.aliases = [...new Set(entry.aliases)].sort();
  for (const alias of entry.aliases) {
    if (byPath.has(alias)) throw new Error(`Alias shadows a canonical path: ${alias}`);
    if (aliases.has(alias)) throw new Error(`Duplicate alias: ${alias}`);
    aliases.set(alias, entry.path);
  }
  const segments = entry.path.slice(base(entry.kind).length).split('/').filter(Boolean);
  // Every nested prefix is a real canonical parent, never a made-up folder.
  for (let length = 1; length < segments.length; length += 1) {
    const parentPath = base(entry.kind) + segments.slice(0, length).join('/') + '/';
    if (!byPath.has(parentPath)) throw new Error(`Missing canonical parent: ${parentPath}`);
  }
}
entries.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
const content = JSON.stringify({ version: 1, entries }, null, 2) + '\n';
const outputs = new Map([[output, content]]);
if (syncRedirects) {
  const existingFile = fs.existsSync(redirectsOutput) ? redirectsOutput : redirectsSource;
  const existing = fs.readFileSync(existingFile, 'utf8');
  const eol = existing.includes('\r\n') ? '\r\n' : '\n';
  const startMarker = '# BEGIN APPLICATION ROUTE REDIRECTS';
  const endMarker = '# END APPLICATION ROUTE REDIRECTS';
  const start = existing.indexOf(startMarker);
  const end = existing.indexOf(endMarker);
  if ((start === -1) !== (end === -1) || (start !== -1 && (end < start
    || existing.indexOf(startMarker, start + 1) !== -1 || existing.indexOf(endMarker, end + 1) !== -1))) {
    throw new Error(`Malformed application redirect markers: ${existingFile}`);
  }
  const ruleLines = entries.flatMap(entry => entry.aliases.flatMap(alias => [
    `${alias.slice(0, -1)} ${entry.path} 301`,
    `${alias} ${entry.path} 301`,
  ]));
  const generatedSources = new Set(ruleLines.map(line => line.split(' ')[0]));
  const outsideBlock = start === -1 ? existing : existing.slice(0, start) + existing.slice(end + endMarker.length);
  for (const line of outsideBlock.split(/\r?\n/)) {
    if (generatedSources.has(line.trim().split(/\s+/)[0])) {
      throw new Error(`Application redirect is already defined outside its generated block: ${line}`);
    }
  }
  const block = [startMarker, ...ruleLines, endMarker].join(eol);
  const redirectsContent = start === -1
    ? existing + (existing.endsWith('\n') || existing.length === 0 ? '' : eol) + eol + block + eol
    : existing.slice(0, start) + block + existing.slice(end + endMarker.length);
  outputs.set(redirectsOutput, redirectsContent);
}
for (const [filename, expected] of outputs) {
  if (check && (!fs.existsSync(filename) || fs.readFileSync(filename, 'utf8') !== expected)) {
    throw new Error(`Generated application routing file is stale: ${filename}. Run the route generator.`);
  }
}
if (!check) {
  for (const [filename, expected] of outputs) {
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, expected, 'utf8');
  }
}
console.log(`${check ? 'Verified' : 'Generated'} ${entries.length} canonical application routes and ${aliases.size} direct aliases${syncRedirects ? `; ${aliases.size * 2} Cloudflare rules` : ''}: ${output}`);
