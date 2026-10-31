import assert from "node:assert/strict";
import fs from "node:fs";
import { getSmtp2VariantCopy, smtp2Variants } from "../../data/products/detail/smtp2-variant-content";
import { pipettingPumpSelectionProducts } from "../../data/products/selection/pipetting-pump-selection.generated";
import { getPipettingModelPath, getPipettingRedirectEntries } from "../../data/products/selection/pipetting-pump-routes";
import details from "../../data/products/generated/pumps/pipetting-pumps/detail/index.json";

async function main() {
const origin = process.env.SMTP_BASE_URL;
const locales = ["zh", "en", "es", "fr", "ko", "ru"];
const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
const redirects = fs.readFileSync("public/_redirects", "utf8");
const cards = pipettingPumpSelectionProducts.filter(item => item.detailSlug?.startsWith("smtp2-"));
assert.equal(cards.length, 3);
assert(!details.some(item => item.slug === "smtp2-1000ul"));
for (const locale of locales) {
  const titles = new Set<string>(), headings = new Set<string>();
  for (const variant of smtp2Variants) {
    const copy = getSmtp2VariantCopy(variant.slug, locale)!;
    const url = getPipettingModelPath(locale, variant.slug)!;
    const source = details.find(item => item.slug === variant.slug)!;
    assert.equal(source.productCode, variant.model);
    assert.equal(source.mainImage, variant.image);
    assert.equal(source.specs.find(row => row.label === "标称量程")?.value, "1000μL");
    assert.equal(source.specs.find(row => row.label === "吸头适配器")?.value, `${variant.adapter} (${variant.lengthMm} mm)`);
    titles.add(copy.title); headings.add(copy.heading);
    assert(fs.existsSync(`public${variant.image}`));
    assert(fs.existsSync(`public${variant.cardImage}`));
    if (origin) {
      const response = await fetch(origin + url);
      assert.equal(response.status, 200, url);
      const html = await response.text();
      const body = decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ""));
      assert.equal((body.match(/<h1\b/g) || []).length, 1, url);
      assert(body.includes(copy.title), `${url} title`);
      assert(body.includes(copy.heading), `${url} heading`);
      assert(body.includes(copy.paragraphs[0]), `${url} introduction`);
      assert(body.includes(copy.faq.question), `${url} unique FAQ`);
      assert(body.includes(`src="${variant.image}"`), `${url} image`);
      assert(body.includes(`alt="${copy.imageAlt}"`), `${url} ALT`);
      assert(body.includes(`rel="canonical" href="https://www.foreachtek.com${url}"`), `${url} canonical`);
      for (const lang of locales) assert(body.includes(`href="https://www.foreachtek.com${getPipettingModelPath(lang, variant.slug)}"`), `${url} hreflang ${lang}`);
      const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
      const graph = schemas.flatMap(schema => schema["@graph"] || [schema]);
      const product = graph.find(item => ["Product", "ProductModel"].includes(item["@type"]));
      assert(product, `${url} Product schema`);
      assert(JSON.stringify(product).includes(variant.model), `${url} schema identity`);
      assert(JSON.stringify(product).includes(variant.image), `${url} schema image`);
      console.log(`PASS ${url}`);
    }
  }
  assert.equal(titles.size, 3); assert.equal(headings.size, 3);
  const prefix = locale === "zh" ? "" : `/${locale}`;
  const target = `${prefix}/products/pumps/pipetting-pumps/smtp2-programmable-pipetting-module/`;
  for (const old of ["smtp2-1000ul", "smtp2-programmable-pipetting-module/smtp2-1000ul"]) {
    const source = `${prefix}/products/pumps/pipetting-pumps/${old}`;
    for (const suffix of ["", "/"]) assert(redirects.includes(`${source}${suffix} ${target} 301`));
    const rule = getPipettingRedirectEntries().find(row => row.source === source)!;
    assert.equal(rule.destination, target); assert.equal(rule.statusCode, 301);
    if (origin) {
      const response = await fetch(origin + source + "/", {redirect:"manual"});
      assert.equal(response.status, 301, `${source} redirect`);
      assert.equal(new URL(response.headers.get("location")!, origin).pathname, target);
    }
  }
  const search = JSON.parse(fs.readFileSync(`public/search-data/global-search-index.${locale === "zh" ? "zh-CN" : locale}.v3.json`, "utf8"));
  const products = search.filter((item: {m:string;h:string}) => item.m === "products" && /\/smtp2-(?:500|510|520)\/$/.test(item.h));
  assert.equal(products.length, 3);
  for (const variant of smtp2Variants) assert(products.some((item: {t:string;x:string}) => item.t === variant.model && item.x.includes(variant.adapter)));
}
console.log(`PASS: 3 distinct SMTP2 pages × 6 locales, capacity/adapter isolation, search entries and direct old-URL redirects${origin ? ", rendered metadata, copy and schema" : ""}.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
