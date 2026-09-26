import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { liquidChromatographyDocuments } from "../../data/applications/analytical-documents/liquid-chromatography";
import { LC_PRODUCTS, LC_TASK_RESOURCES, lcArticleHref } from "../../data/applications/analytical-documents/liquid-chromatography-resources";
import { liquidChromatographyBodies } from "../../data/applications/analytical-documents/en/liquid-chromatography";
import { getLiquidChromatographyResources } from "../../services/applications/liquid-chromatography-resources";

for (const { slug } of liquidChromatographyDocuments) {
  const resources = getLiquidChromatographyResources(slug);
  const relations = LC_TASK_RESOURCES[slug];
  const body = liquidChromatographyBodies[slug];
  assert.equal(resources.locale, "en");
  assert.equal(resources.videos.length, 0);
  assert.deepEqual(resources.products.map((item) => item.href), relations.products.map((key) => LC_PRODUCTS[key].href));
  assert.equal(new Set(resources.products.map((item) => item.href)).size, resources.products.length);
  assert.deepEqual(resources.articles.map((item) => item.slug), [...new Set(relations.readings.map((item) => item.slug))]);
  assert(resources.articles.length >= 2 && resources.articles.length <= 3);
  assert(!/[\u3400-\u9fff]/.test(JSON.stringify(resources)), `${slug}: English-only resources`);
  for (const product of resources.products) {
    assert(product.href.startsWith("/en/products/"));
    assert(existsSync(`public${product.imageSrc}`), `${slug}: missing image ${product.imageSrc}`);
    assert(body.sections.some((section) => section.blocks.some((block) => block.type === "links" && block.items.some((item) => item.href === product.href))), `${slug}: product must be supported in body`);
  }
  for (const article of resources.articles) {
    assert(article.title && article.summary && article.coverImage);
    if (article.coverImage.startsWith("/")) assert(existsSync(`public${article.coverImage}`), `Missing article cover: ${article.slug}`);
    assert(body.sections.some((section) => section.blocks.some((block) => block.inlineLinks?.some((link) => link.href === lcArticleHref(article.slug)))), `${slug}: missing contextual reading link`);
  }
}

assert.deepEqual(LC_TASK_RESOURCES["lc-sample-loop-loading"].products, ["ea", "sm"]);
assert.deepEqual(LC_TASK_RESOURCES["lc-needle-wash-supply"].products, ["dpl30", "dpl30h"]);
assert.deepEqual(LC_TASK_RESOURCES["lc-waste-aspiration"].products, ["dpl30", "dpgl800"]);
assert.deepEqual(LC_TASK_RESOURCES["lc-derivatization-reagent-dosing"].products, ["rpl4", "rpl635"]);
console.log("PASS: 9 English LC pages; task-specific product/article cards, contextual links and existing image assets.");
