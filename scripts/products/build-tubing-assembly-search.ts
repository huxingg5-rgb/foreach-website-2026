/** Build only tubing-assembly search entries from the current localized page data. */
import fs from "node:fs";
import path from "node:path";
import {
  getLocalizedAssemblyDetail,
  getTubingAssemblySelectionContent,
} from "../../data/products/tubing-assemblies/localized";
import { tubingAssemblyLocales } from "../../data/products/tubing-assemblies/locales";
import { getPublishedAssemblyConfigurations, publishedAssemblyPageCount } from "../../data/products/tubing-assemblies/publication";
import { tubingAssemblyTypes } from "../../data/products/tubing-assemblies.en";
import type { SiteSearchItem } from "../../data/search/site-search.types";

const outputPath = path.resolve("data/products/tubing-assemblies/search.generated.json");
const generated: Record<string, SiteSearchItem[]> = {};

function unique(values: (string | undefined)[]): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value?.trim())))];
}

for (const locale of tubingAssemblyLocales) {
  const content = getTubingAssemblySelectionContent(locale);
  const rootPath = `/${locale}/products/tubing-assemblies/`;
  const overview: SiteSearchItem = {
    id: `tubing-assemblies:${locale}:overview`,
    module: "products",
    title: content.overview.title,
    description: content.overview.paragraphs[0],
    href: rootPath,
    image: content.introImages["flanged-tubing"]?.src,
    keywords: unique([content.ui.category, content.overview.title, ...Object.values(content.typeNames)]),
    actionLabel: content.ui.details,
  };
  const items: SiteSearchItem[] = [overview];

  for (const family of tubingAssemblyTypes) {
    const intro = content.intros[family.id];
    const image = content.introImages[family.id]?.src;
    const familyKeywords = [content.ui.category, content.typeNames[family.id], intro.title];
    items.push({
      id: `tubing-assemblies:${locale}:${family.id}:category`,
      module: "products",
      title: intro.title,
      description: intro.paragraphs[0],
      href: `${rootPath}${family.id}/`,
      image,
      keywords: unique(familyKeywords),
      actionLabel: content.ui.details,
    });

    for (const configuration of [undefined, ...getPublishedAssemblyConfigurations(family.id)]) {
      const detail = getLocalizedAssemblyDetail(locale, family.id, configuration);
      items.push({
        id: `tubing-assemblies:${locale}:${family.id}:${configuration ?? "series"}`,
        module: "products",
        title: String(detail.h1Title ?? detail.name),
        description: String(detail.description),
        href: String(detail.detailHref),
        image: String(detail.mainImage ?? image),
        keywords: unique([
          ...familyKeywords,
          String(detail.h1Title ?? detail.name),
          ...(detail.commonApplications ?? []),
          ...(detail.specs ?? []).map(spec => spec.value),
        ]),
        actionLabel: content.ui.details,
      });
    }
  }

  const paths = new Set(items.map(item => item.href));
  if (items.length !== publishedAssemblyPageCount || paths.size !== publishedAssemblyPageCount) {
    throw new Error(`Expected ${publishedAssemblyPageCount} unique tubing-assembly pages for ${locale}; got ${items.length}/${paths.size}`);
  }
  for (const item of items) {
    if (!item.href.startsWith(rootPath)) throw new Error(`Wrong locale path: ${item.href}`);
    if (/[\u3400-\u9fff]/.test(JSON.stringify(item))) throw new Error(`Untranslated search item: ${item.id}`);
    if (!item.image || !fs.existsSync(path.join("public", item.image))) {
      throw new Error(`Missing search image: ${item.id}: ${item.image}`);
    }
  }
  generated[locale] = items;
}

const expected = `${JSON.stringify(generated, null, 2)}\n`;
if (process.argv.includes("--check")) {
  if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, "utf8") !== expected) {
    throw new Error("Tubing-assembly search snapshot is stale. Run: npx tsx scripts/products/build-tubing-assembly-search.ts");
  }
  console.log(`Tubing-assembly search snapshot is current: ${publishedAssemblyPageCount} pages × ${tubingAssemblyLocales.length} locales.`);
} else {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, expected, "utf8");
  console.log(`Generated tubing-assembly search snapshot: ${publishedAssemblyPageCount} pages × ${tubingAssemblyLocales.length} locales.`);
}
