/** Read-only regression checks for the English-only LC module. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { liquidChromatographyDocuments } from "../../data/applications/analytical-documents/liquid-chromatography";
import { analyticalDocumentHref, getAnalyticalDocumentTrail } from "../../data/applications/analytical-documents/registry";
import { getEnglishAnalyticalDocument, createAnalyticalDocumentMetadata } from "../../services/applications/analytical-documents";
import { getVisibleNavigationItems, getLocalizedHref } from "../../data/navigation";

async function main() {
  assert.equal(liquidChromatographyDocuments.length, 9);
  const slugs = new Set(liquidChromatographyDocuments.map((document) => document.slug));
  const searchable = JSON.parse(readFileSync("public/search-data/global-search-index.en.v3.json", "utf8")) as { h: string }[];
  for (const entry of liquidChromatographyDocuments) {
    const document = await getEnglishAnalyticalDocument(entry.slug);
    assert(document);
    const metadata = createAnalyticalDocumentMetadata(document);
    assert.deepEqual(Object.keys(metadata.alternates?.languages ?? {}), ["en"]);
    assert.equal(typeof metadata.alternates?.canonical, "string");
    assert((metadata.alternates?.canonical as string).endsWith(analyticalDocumentHref(entry.slug)));
    assert(document.sections.length >= 6, `${entry.slug}: missing task detail`);
    assert(!/[\u3400-\u9fff]/.test(JSON.stringify(document)), `${entry.slug}: non-English content`);
    assert(document.sections.every((section) => section.blocks.every((block) => block.type !== "callout")), "Use the existing restrained document presentation");
    const trail = getAnalyticalDocumentTrail(entry.slug);
    assert.equal(trail[0].slug, "");
    assert.equal(trail.at(-1)?.slug, entry.slug);
    assert.equal(trail[1].slug, "liquid-chromatography");
    if (entry.kind === "task") assert.equal(trail.at(-2)?.slug, entry.group);
    assert.equal(searchable.filter((item) => item.h === analyticalDocumentHref(entry.slug)).length, 1, "One English search entry per page");
    for (const link of document.related ?? []) {
      const slug = link.href.split("/").filter(Boolean).at(-1);
      assert(slug && slugs.has(slug as typeof entry.slug), "Related LC guides must stay within this module");
    }
  }

  for (const locale of ["en", "zh-CN", "es", "fr", "ko", "ru"]) {
    const navigation = getVisibleNavigationItems(locale);
    const card = navigation.find((item) => item.key === "applications")?.megaDropdown?.cards.find((item) => item.key === "analytical-instruments-card");
    const image = card?.images?.find((item) => item.src.includes("analytical-chromatography-autosampler"));
    assert(image?.href, `${locale}: missing chromatography menu entry`);
    const href = getLocalizedHref(image.href, locale);
    if (locale === "en") assert.equal(href, analyticalDocumentHref("liquid-chromatography"));
    else {
      assert(href.includes("application=chromatography"), `${locale}: original destination changed`);
      assert(!href.includes("/liquid-chromatography"), `${locale}: fabricated translated module`);
    }
  }
  console.log("PASS: 9 LC documents, module ancestry, English-only metadata/search and unchanged non-English menu targets.");
}

main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
