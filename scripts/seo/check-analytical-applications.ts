/**
 * Read-only checks for the English analytical application documents.
 * Run: npx tsx scripts/seo/check-analytical-applications.ts [--out out]
 * No generator, build, network request or output-file write is performed.
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
import ts from "typescript";
import { analyticalDocumentHref, analyticalDocuments } from "../../data/applications/analytical-documents/registry";
import type { ApplicationBlock, ApplicationDocument } from "../../data/applications/analytical-documents/types";
import { createAnalyticalDocumentMetadata, createAnalyticalDocumentSchema, getEnglishAnalyticalDocument } from "../../services/applications/analytical-documents";
import { getCanonicalUrl, normalizeSiteHref, SITE_ORIGIN } from "../../lib/seo/site-url";

const root = process.cwd();
const arguments_ = process.argv.slice(2);
assert(arguments_.length === 0 || (arguments_.length === 2 && arguments_[0] === "--out" && arguments_[1]), "Usage: tsx scripts/seo/check-analytical-applications.ts [--out directory]");
const outputRoot = arguments_.length ? path.resolve(root, arguments_[1]) : undefined;

function unique(values: readonly string[], label: string) {
  assert.equal(new Set(values).size, values.length, `${label}: duplicate values`);
}

function normalizeText(value: string) {
  return value.normalize("NFC").replace(/\s+/g, " ").trim();
}

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

function blockText(block: ApplicationBlock): string[] {
  switch (block.type) {
    case "paragraph": return [block.text];
    case "subheading": return [block.title];
    case "table": return [block.caption, ...block.headers, ...block.rows.flat(), ...(block.note ? [block.note] : [])];
    case "list": return [...block.items];
    case "flow": return [block.caption, ...block.nodes, ...(block.note ? [block.note] : [])];
    case "callout": return [...(block.title ? [block.title] : []), block.text];
    case "links": return block.items.flatMap((item) => [item.label, ...(item.description ? [item.description] : [])]);
  }
}

function blocks(document: ApplicationDocument) {
  return [...document.intro, ...document.sections.flatMap((section) => section.blocks)];
}

function documentIds(document: ApplicationDocument) {
  return ["analytical-application-document", "application-document-title",
    ...document.sections.flatMap((section) => [section.id, `${section.id}-heading`]),
    ...(document.references.length ? ["references", "references-heading"] : []),
    ...document.references.map((reference) => `ref-${reference.id}`),
    ...(document.related?.length ? ["related-guides", "related-guides-heading"] : [])];
}

function checkData(document: ApplicationDocument) {
  const label = document.slug || "hub";
  assert(document.intro.length && document.sections.length, `${label}: missing intro or sections`);
  for (const value of strings(document)) {
    assert(!/[\u3400-\u9fff]/.test(value), `${label}: Chinese text: ${value.slice(0, 100)}`);
    assert(!/<\/?[a-z][^>]*>/i.test(value), `${label}: raw HTML in structured content`);
  }
  unique(document.sections.map((section) => section.id), `${label} section IDs`);
  unique(document.references.map((reference) => reference.id), `${label} reference IDs`);
  unique(documentIds(document), `${label} rendered IDs`);
  const headings = [document.title, ...document.sections.map((section) => section.title)];
  const referenceIds = new Set(document.references.map((reference) => reference.id));
  const usedReferences = new Set<string>();
  const hrefs = [...document.references.map((reference) => reference.href), ...(document.related ?? []).map((item) => item.href)];
  for (const section of document.sections) {
    assert(/^[a-z][a-z0-9-]*$/.test(section.id), `${label}: invalid section ID ${section.id}`);
    assert(section.title.trim() && section.blocks.length, `${label}: empty section ${section.id}`);
  }
  for (const block of blocks(document)) {
    assert(blockText(block).every((value) => value.trim()), `${label}: empty block text`);
    if (block.type === "subheading" || (block.type === "callout" && block.title)) headings.push(block.title!);
    for (const id of block.references ?? []) {
      assert(referenceIds.has(id), `${label}: unresolved reference ${id}`);
      usedReferences.add(id);
    }
    unique(block.references ?? [], `${label} block citations`);
    if (block.type === "table") {
      assert(block.headers.length >= 2 && block.rows.length > 0, `${label}: empty table ${block.caption}`);
      block.rows.forEach((row, index) => assert.equal(row.length, block.headers.length, `${label}: table ${block.caption}, row ${index + 1} width`));
    }
    if (block.type === "list") assert(block.items.length, `${label}: empty list`);
    if (block.type === "flow") {
      assert(block.nodes.length >= 2, `${label}: incomplete flow`);
      if (block.focusIndex !== undefined) assert(Number.isInteger(block.focusIndex) && block.focusIndex >= 0 && block.focusIndex < block.nodes.length, `${label}: invalid highlighted flow node`);
    }
    if (block.type === "links") {
      assert(block.items.length, `${label}: empty link list`);
      hrefs.push(...block.items.map((item) => item.href));
    }
  }
  unique(headings.map(normalizeText), `${label} headings`);
  for (const reference of document.references) {
    assert(/^[a-z][a-z0-9-]*$/.test(reference.id), `${label}: invalid reference ID ${reference.id}`);
    assert(usedReferences.has(reference.id), `${label}: unused reference ${reference.id}`);
  }
  for (const href of hrefs) {
    assert(href.startsWith("/") || href.startsWith("#") || /^https?:\/\//.test(href), `${label}: unsupported link ${href}`);
    assert(!/^(?:file:|\/\/)|localhost|127\.0\.0\.1|index\.html(?:[?#]|$)/i.test(href), `${label}: preview/H5 link ${href}`);
    if (href.startsWith("#")) assert(documentIds(document).includes(href.slice(1)), `${label}: unresolved local/H5 anchor ${href}`);
  }
  const canonical = getCanonicalUrl(analyticalDocumentHref(document.slug));
  const metadata = createAnalyticalDocumentMetadata(document);
  assert.equal(metadata.title, document.seoTitle, `${label}: metadata title`);
  assert.equal(metadata.description, document.description, `${label}: metadata description`);
  assert.equal(metadata.alternates?.canonical, canonical, `${label}: self canonical`);
  const languages = metadata.alternates?.languages ?? {};
  assert.equal(languages.en, canonical, `${label}: English alternate`);
  if (document.kind !== "hub") assert.deepEqual(Object.keys(languages), ["en"], `${label}: fabricated translation`);
  const schema = createAnalyticalDocumentSchema(document);
  const page = schema["@graph"][0];
  assert("name" in page && "url" in page, `${label}: schema page node`);
  assert.equal(page.name, document.title, `${label}: schema visible title`);
  assert.equal(page.url, canonical, `${label}: schema URL`);
}

type HtmlNode = { tag: string; attrs: Record<string, string>; children: Array<HtmlNode | string> };
const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);

function decode(value: string) {
  const named: Record<string, string> = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
  return value.replace(/&(#x[0-9a-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, code: string) => {
    if (!code.startsWith("#")) return named[code.toLowerCase()] ?? entity;
    const value = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
    return value <= 0x10ffff ? String.fromCodePoint(value) : entity;
  });
}

function attributes(tag: string) {
  return Object.fromEntries([...tag.matchAll(/([^\s=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)].slice(1).map((match) => [match[1].toLowerCase(), decode(match[2] ?? match[3] ?? match[4] ?? "")]));
}

// A dependency-free parser for generated HTML. Scripts/styles are deliberately not visible text.
function parseHtml(html: string): HtmlNode {
  const document: HtmlNode = { tag: "#document", attrs: {}, children: [] };
  const stack = [document];
  const source = html.replace(/<!--[^]*?-->|<script\b[^]*?<\/script\s*>|<style\b[^]*?<\/style\s*>/gi, "");
  const tokens = /<(?:"[^"]*"|'[^']*'|[^'">])*>|[^<]+|</g;
  for (const [token] of source.matchAll(tokens)) {
    const close = /^<\/([a-z][\w:-]*)/i.exec(token);
    if (close) {
      const index = stack.map((node) => node.tag).lastIndexOf(close[1].toLowerCase());
      if (index > 0) stack.length = index;
      continue;
    }
    const open = /^<([a-z][\w:-]*)\b/i.exec(token);
    if (open) {
      const node: HtmlNode = { tag: open[1].toLowerCase(), attrs: attributes(token), children: [] };
      stack.at(-1)!.children.push(node);
      if (!voidTags.has(node.tag) && !/\/\s*>$/.test(token)) stack.push(node);
    } else if (!token.startsWith("<!")) stack.at(-1)!.children.push(decode(token));
  }
  return document;
}

function elements(node: HtmlNode): HtmlNode[] {
  return [node, ...node.children.flatMap((child) => typeof child === "string" ? [] : elements(child))];
}
function content(node: HtmlNode): string {
  return node.children.map((child) => typeof child === "string" ? child : content(child)).join("");
}
function byId(node: HtmlNode, id: string) {
  const match = elements(node).find((element) => element.attrs.id === id);
  assert(match, `Missing rendered element #${id}`);
  return match;
}
function containsText(node: HtmlNode, expected: string, label: string) {
  assert(normalizeText(content(node)).includes(normalizeText(expected)), `${label}: missing raw HTML text: ${expected.slice(0, 110)}`);
}

function localFile(directory: string, pathname: string) {
  const decoded = decodeURIComponent(pathname);
  const target = path.resolve(directory, `.${decoded}`);
  assert(target === directory || target.startsWith(`${directory}${path.sep}`), `Path outside output: ${pathname}`);
  const candidates = path.extname(target) ? [target] : [path.join(target, "index.html"), `${target}.html`, target];
  return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile());
}

function checkLinks(main: HtmlNode, route: string, directory: string) {
  const idsByFile = new Map<string, Set<string>>();
  for (const node of elements(main).filter((element) => element.tag === "a")) {
    const href = node.attrs.href;
    assert(href, `${route}: anchor without href`);
    if (/^(?:mailto:|tel:)/i.test(href)) continue;
    assert(!/^(?:javascript:|data:|file:)/i.test(href), `${route}: unsafe link ${href}`);
    const url = new URL(href, `${SITE_ORIGIN}${route}`);
    if (!/^(?:www\.)?foreachtek\.com$/i.test(url.hostname)) continue;
    const target = localFile(directory, url.pathname);
    assert(target, `${route}: missing internal target ${href}`);
    if (url.hash && /\.html$/i.test(target)) {
      if (!idsByFile.has(target)) idsByFile.set(target, new Set(elements(parseHtml(readFileSync(target, "utf8"))).map((element) => element.attrs.id).filter(Boolean)));
      assert(idsByFile.get(target)!.has(decodeURIComponent(url.hash.slice(1))), `${route}: missing target anchor ${href}`);
    }
  }
}

function checkSchema(html: string, rootNode: HtmlNode, document: ApplicationDocument) {
  const expected = createAnalyticalDocumentSchema(document);
  const canonical = getCanonicalUrl(analyticalDocumentHref(document.slug));
  const candidates = [...html.matchAll(/<script\b([^>]*)>([^]*?)<\/script\s*>/gi)]
    .filter((match) => /type=["']application\/ld\+json["']/i.test(match[1]))
    .map((match) => { try { return JSON.parse(match[2]); } catch { return undefined; } })
    .filter((value) => value?.["@graph"]?.some((item: Record<string, unknown>) => item["@id"] === `${canonical}#page`));
  assert.equal(candidates.length, 1, `${document.slug}: one application JSON-LD graph`);
  const graph = candidates[0]["@graph"] as Array<Record<string, unknown>>;
  const page = graph.find((item) => item["@id"] === `${canonical}#page`)!;
  const expectedPage = expected["@graph"][0] as Record<string, unknown>;
  for (const key of ["@type", "@id", "url", "name", "headline", "description", "inLanguage", "mainEntityOfPage"] as const) {
    assert.deepEqual(page[key], expectedPage[key], `${document.slug}: schema ${key}`);
  }
  if (document.kind === "hub") assert.deepEqual(page.mainEntity, expectedPage.mainEntity, "Hub schema task list");
  else {
    assert.deepEqual(page.articleSection, document.sections.map((section) => section.title), `${document.slug}: visible schema sections`);
    assert.deepEqual(page.citation, expectedPage.citation, `${document.slug}: schema reference URLs`);
  }
  const breadcrumb = graph.find((item) => item["@type"] === "BreadcrumbList");
  assert(breadcrumb, `${document.slug}: missing breadcrumb schema`);
  const expectedBreadcrumb = expected["@graph"][1] as Record<string, unknown>;
  assert.deepEqual(breadcrumb.itemListElement, expectedBreadcrumb.itemListElement, `${document.slug}: breadcrumb schema`);
  const navigation = elements(rootNode).find((node) => node.tag === "nav" && node.attrs["aria-label"] === "Breadcrumb");
  assert(navigation, `${document.slug}: missing visible breadcrumbs`);
  const crumbs = breadcrumb.itemListElement as Array<{ name: string; item: string }>;
  for (const crumb of crumbs) containsText(navigation, crumb.name, `${document.slug} breadcrumb`);
  assert.equal(crumbs.at(-1)?.item, canonical, `${document.slug}: final breadcrumb URL`);
}

function checkHtml(document: ApplicationDocument, documents: ApplicationDocument[], directory: string) {
  const route = analyticalDocumentHref(document.slug);
  const file = localFile(directory, route);
  assert(file, `Missing exported page ${route}`);
  const html = readFileSync(file, "utf8");
  const tree = parseHtml(html);
  const all = elements(tree);
  assert.equal(all.find((node) => node.tag === "html")?.attrs.lang, "en", `${route}: initial HTML language`);
  const rootNode = byId(tree, "analytical-application-document");
  const mains = elements(rootNode).filter((node) => node.tag === "main");
  assert.equal(mains.length, 1, `${route}: one application main`);
  const main = mains[0];
  const headings = elements(main).filter((node) => node.tag === "h1");
  assert.equal(headings.length, 1, `${route}: one H1`);
  assert.equal(normalizeText(content(headings[0])), normalizeText(document.title), `${route}: H1`);
  unique(elements(rootNode).map((node) => node.attrs.id).filter(Boolean), `${route} actual DOM IDs`);
  const article = elements(main).find((node) => node.tag === "article");
  assert(article, `${route}: article body`);
  for (const fragment of document.intro.flatMap(blockText)) containsText(main, fragment, `${route} intro`);
  for (const section of document.sections) {
    const rendered = byId(article, section.id);
    containsText(rendered, section.title, `${route} section`);
    for (const fragment of section.blocks.flatMap(blockText)) containsText(rendered, fragment, `${route} ${section.id}`);
    for (const block of section.blocks.filter((item) => item.type === "table")) {
      const table = elements(rendered).find((node) => node.tag === "table" && node.children.some((child) => typeof child !== "string" && child.tag === "caption" && normalizeText(content(child)).startsWith(normalizeText(block.caption))));
      assert(table, `${route}: missing table ${block.caption}`);
      const rows = elements(table).filter((node) => node.tag === "tr");
      assert.equal(rows.length, block.rows.length + 1, `${route}: rendered table row count ${block.caption}`);
      for (const row of rows) assert.equal(row.children.filter((child) => typeof child !== "string" && (child.tag === "th" || child.tag === "td")).length, block.headers.length, `${route}: rendered table column count ${block.caption}`);
    }
  }
  if (document.references.length) {
    const references = byId(article, "references");
    assert(elements(references).some((node) => node.tag === "details"), `${route}: references disclosure`);
    for (const reference of document.references) {
      const item = byId(references, `ref-${reference.id}`);
      containsText(item, reference.title, `${route} full reference`);
      const link = elements(item).find((node) => node.tag === "a");
      assert(link?.attrs.href, `${route}: missing reference link ${reference.id}`);
      assert.equal(new URL(normalizeSiteHref(link.attrs.href), SITE_ORIGIN).href, new URL(normalizeSiteHref(reference.href), SITE_ORIGIN).href, `${route}: reference target ${reference.id}`);
    }
  }
  for (const related of document.related ?? []) {
    containsText(byId(article, "related-guides"), related.label, `${route} related guide`);
    if (related.description) containsText(byId(article, "related-guides"), related.description, `${route} related description`);
  }
  for (const other of documents.filter((item) => item.slug !== document.slug)) {
    const signature = other.intro.flatMap(blockText).find((value) => value.length >= 80);
    assert(signature, `${other.slug}: no sufficiently distinctive intro text`);
    assert(!normalizeText(content(main)).includes(normalizeText(signature)), `${route}: another document's intro was bundled into main (${other.slug || "hub"})`);
  }
  assert(!/[\u3400-\u9fff]/.test(content(main)), `${route}: Chinese in new application main`);
  const canonical = getCanonicalUrl(route);
  const canonicals = all.filter((node) => node.tag === "link" && node.attrs.rel === "canonical");
  assert.deepEqual(canonicals.map((node) => node.attrs.href), [canonical], `${route}: one self canonical`);
  const title = all.find((node) => node.tag === "title");
  assert.equal(title && normalizeText(content(title)), normalizeText(document.seoTitle), `${route}: HTML title`);
  assert.equal(all.find((node) => node.tag === "meta" && node.attrs.name === "description")?.attrs.content, document.description, `${route}: HTML description`);
  const alternates = all.filter((node) => node.tag === "link" && node.attrs.rel === "alternate" && node.attrs.hreflang);
  unique(alternates.map((node) => node.attrs.hreflang), `${route} hreflang`);
  if (document.kind === "hub") {
    assert.deepEqual(Object.fromEntries(alternates.map((node) => [node.attrs.hreflang, node.attrs.href])), createAnalyticalDocumentMetadata(document).alternates?.languages, `${route}: hub real translations`);
  } else {
    assert(alternates.length <= 1 && alternates.every((node) => node.attrs.hreflang === "en" && node.attrs.href === canonical), `${route}: no fabricated document translations`);
  }
  assert(!all.some((node) => node.tag === "meta" && node.attrs.name === "robots" && /\bnoindex\b/i.test(node.attrs.content)), `${route}: unexpected noindex`);
  checkSchema(html, rootNode, document);
  checkLinks(main, route, directory);
  return { route, htmlBytes: Buffer.byteLength(html), gzipBytes: gzipSync(html).length };
}

function checkRouteEnumeration() {
  const file = path.join(root, "app/[locale]/applications/analytical-instruments/[slug]/page.tsx");
  const source = readFileSync(file, "utf8");
  assert(/export\s+const\s+dynamicParams\s*=\s*false/.test(source), "Application document route must disable unknown dynamic params");
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const declaration = ast.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === "generateStaticParams");
  assert(declaration, "Missing document generateStaticParams");
  const functionSource = declaration.getText(ast).replace(/^export\s+/, "");
  const javascript = ts.transpileModule(functionSource, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
  // Evaluate only this pure registry mapping, not the page's React/CSS imports.
  const parameters = new Function("analyticalDocuments", `${javascript}; return generateStaticParams();`)(analyticalDocuments);
  assert.deepEqual(parameters, analyticalDocuments.filter((document) => document.slug).map(({ slug }) => ({ locale: "en", slug })), "Exactly the registered English-only detail routes must be generated");
}

async function main() {
  unique(analyticalDocuments.map((document) => analyticalDocumentHref(document.slug)), "Registry paths");
  unique(analyticalDocuments.map((document) => document.title), "Registry H1 titles");
  unique(analyticalDocuments.map((document) => document.seoTitle), "Registry SEO titles");
  assert.equal(analyticalDocuments.filter((document) => document.kind === "hub").length, 1, "One hub");
  const documents: ApplicationDocument[] = [];
  for (const metadata of analyticalDocuments) {
    const document = await getEnglishAnalyticalDocument(metadata.slug);
    assert(document, `Missing body ${metadata.slug || "hub"}`);
    checkData(document);
    documents.push(document);
  }
  assert.equal(await getEnglishAnalyticalDocument("not-a-registered-document"), undefined, "Unknown document must not fall back");
  checkRouteEnumeration();
  console.log(`PASS: ${documents.length} English application data records, tables, headings, reference resolution, metadata and route enumeration.`);
  if (!outputRoot) {
    console.log("Static HTML was not checked. Re-run with --out <static-export-directory> after the normalizer and sitemap steps.");
    return;
  }
  assert(existsSync(outputRoot) && statSync(outputRoot).isDirectory(), `Missing output directory: ${outputRoot}`);
  const sizes = documents.map((document) => checkHtml(document, documents, outputRoot));
  for (const document of documents.filter((item) => item.slug)) {
    for (const prefix of ["", "/zh-CN", "/es", "/fr", "/ko", "/ru"]) {
      const translated = `${prefix}/applications/analytical-instruments/${document.slug}/`;
      assert(!localFile(outputRoot, translated), `Fabricated translation was exported: ${translated}`);
    }
  }
  const sitemapFile = path.join(outputRoot, "sitemap.xml");
  assert(existsSync(sitemapFile), "Missing final sitemap.xml");
  const sitemap = readFileSync(sitemapFile, "utf8");
  for (const document of documents) {
    const canonical = getCanonicalUrl(analyticalDocumentHref(document.slug));
    assert.equal([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].filter((match) => decode(match[1]) === canonical).length, 1, `Sitemap must contain ${canonical} exactly once`);
  }
  console.table(sizes);
  console.log("PASS: raw static content (including collapsed references), scoped internal targets/anchors, metadata, JSON-LD, English-only details and sitemap entries.");
  console.log("HTML and gzip byte counts are payload measurements only, not loading-speed or Core Web Vitals results.");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
