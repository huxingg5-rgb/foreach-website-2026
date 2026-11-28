import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { getItalianDatasheetsPageData } from "../../data/resources/datasheets.it";
import { getHindiDatasheetsPageData } from "../../data/resources/datasheets.hi";
import { getMaterialCompatibilityIntlData } from "../../data/resources/material-compatibility/material-compatibility.intl";
import { getChromatographySearchSectionCopy } from "../../data/search/chromatography-section-search";

const outputRoot = join(process.cwd(), "out");
const outputDirectory = join(outputRoot, "search-data");
const locales = { de: "de-DE", it: "it-IT", hi: "hi-IN" } as const;
const entities: Record<string, string> = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: "\u00a0" };

function decode(value: string) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, name) => {
    if (name[0] !== "#") return entities[name] ?? entity;
    return String.fromCodePoint(name[1].toLowerCase() === "x"
      ? Number.parseInt(name.slice(2), 16)
      : Number.parseInt(name.slice(1), 10));
  });
}

function* indexPages(directory: string): Generator<string> {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* indexPages(path);
    else if (entry.name === "index.html") yield path;
  }
}

mkdirSync(outputDirectory, { recursive: true });
for (const locale of Object.keys(locales) as (keyof typeof locales)[]) {
  const language = locales[locale];
  const pages: Record<string, { title: string; description: string; subtitle?: string }> = {};
  for (const page of indexPages(join(outputRoot, locale))) {
    const head = readFileSync(page, "utf8").split("</head>", 1)[0];
    if (!head.includes(`<html lang="${language}"`) ||
        /<meta name="robots" content="[^"]*\bnoindex\b/.test(head)) continue;

    const title = decode(head.match(/<title>([^<]*)<\/title>/)?.[1] ?? "")
      .split(/[|｜]/, 1)[0].trim();
    const description = decode(head.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "").trim();
    if (!title || !description || /[\u3400-\u9fff\ufffd]/u.test(title + description)) continue;

    const route = "/" + relative(outputRoot, dirname(page)).split(sep).join("/");
    pages[route] = { title, description };
  }
  if (!Object.keys(pages).length) throw new Error(`No localized search pages were exported for ${locale}.`);
  console.log(`Localized search page copy (${locale}): ${Object.keys(pages).length} pages.`);

  for (const { href, sourceTitle, title, description } of getChromatographySearchSectionCopy(locale)) {
    pages[`${href}|${sourceTitle}`] = { title, description };
  }

  if (locale === "it" || locale === "hi") {
    const datasheets = locale === "it" ? getItalianDatasheetsPageData() : getHindiDatasheetsPageData();
    for (const item of datasheets.datasheetItems) {
      if (!item.downloadHref) continue;
      const href = item.downloadHref.replace(/\/+($|(?=[?#]))/, "");
      pages[href] = { title: item.title, description: item.description, subtitle: item.label };
    }

    const material = getMaterialCompatibilityIntlData(locale);
    const materialPath = `/${locale}/resources/material-compatibility`;
    const chemicalDescription = locale === "it"
      ? "Verifica la resistenza dei materiali disponibili a questa sostanza."
      : "इस रसायन के प्रति उपलब्ध सामग्रियों के प्रतिरोध की जाँच करें।";
    for (const row of material.compatibilityRows) {
      for (const alias of row.searchAliases ?? []) {
        pages[`${materialPath}?tab=compatibility&q=${encodeURIComponent(alias)}`] = {
          title: row.name,
          description: chemicalDescription,
        };
      }
    }
    for (const row of material.materialFeatureRows) {
      pages[`${materialPath}?tab=features&q=${encodeURIComponent(row.code)}`] = {
        title: `${row.code} – ${row.name}`,
        description: row.feature,
      };
    }
  }
  writeFileSync(join(outputDirectory, `localized-page-copy.${locale}.v1.json`), JSON.stringify(pages));
}
