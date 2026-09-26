/** Read-only regression checks for the English instrument-first hub. */
import assert from "node:assert/strict";
import { getEnglishAnalyticalInstrumentLinks } from "../../data/applications/analytical-instruments/navigation";
import { getEnglishAnalyticalDocument, createAnalyticalDocumentSchema } from "../../services/applications/analytical-documents";

async function main() {
  const document = await getEnglishAnalyticalDocument("");
  assert(document);
  const instruments = getEnglishAnalyticalInstrumentLinks();
  assert.equal(instruments.length, 5);
  assert.equal(document.sections.length, 6);
  document.sections.slice(0, 5).forEach((section, index) => {
    const links = section.blocks.flatMap((block) => block.type === "links" ? block.items : []);
    assert.deepEqual(links, [{ label: instruments[index].label, href: instruments[index].href }]);
  });
  assert(!document.sections.some((section) => section.blocks.some((block) => block.type === "callout" || block.type === "flow")));
  const content = JSON.stringify(document);
  assert(!/piston-sample-transfer|piston-reagent-dispensing|piston-dilution|piston-titration/.test(content));
  assert(content.includes("/en/applications/ivd/"));
  const breadcrumb = createAnalyticalDocumentSchema(document)["@graph"].find((node) => node["@type"] === "BreadcrumbList");
  assert(breadcrumb && "itemListElement" in breadcrumb);
  assert.deepEqual(breadcrumb.itemListElement.map((item) => item.name), ["Home", "Applications", "Analytical Instruments"]);
  console.log("PASS: English hub follows five desktop instrument categories, with scoped links and shallow breadcrumbs.");
}

main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
