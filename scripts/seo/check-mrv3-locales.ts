import assert from "node:assert/strict";
import { getMrv3Content, expandMrv3Cards, mrv3Configurations } from "../../data/products/detail/mrv3-content";
import { mrv3Locales } from "../../data/products/detail/mrv3-locales";
import type { ProductSelectionProduct } from "../../data/products/selection/product-selection.types";

async function main() {
  let pages = 0;
  for (const locale of mrv3Locales) {
    const prefix = locale === "zh" ? "" : `/${locale}`;
    const cards = expandMrv3Cards({ productId: "mrv3-ceramic-rotary-valve" } as ProductSelectionProduct, locale);
    assert.equal(cards.length, 3);
    for (const slug of ["rotary-valves", ...mrv3Configurations.map(c => c.slug)]) {
      const copy = getMrv3Content(slug, locale)!;
      assert(copy, `${locale}/${slug} missing`);
      const c = mrv3Configurations.find(c => c.slug === slug);
      assert.equal(copy.faqs.length, 6);
      assert.equal(copy.applicationDetails.items.length, 4);
      assert.equal(copy.specs.length, c ? 22 : 19);
      const text = JSON.stringify(copy);
      assert(!/\{\d+\}|undefined|PVDF|filter:filter01/.test(text), `${locale}/${slug} stale/unresolved content`);
      const prose = JSON.stringify([copy.faqs, copy.applicationDetails]);
      assert(!/规格书|选型指南|datasheet|selection guide/i.test(prose));
      if (locale !== "zh") {
        const display = JSON.stringify([copy.title, copy.description, copy.specs, copy.faqs, copy.applicationDetails.items]);
        assert(!/[\u4e00-\u9fff]/.test(display), `${locale}/${slug} Chinese fallback`);
      }
      if (c) {
        assert.equal(copy.title, `FOREACH ${copy.cardHeading}`);
        assert.equal(copy.modelName, c.slug.toUpperCase());
        assert.equal(copy.mrv3IntroductionParagraphs?.length, 3);
        const values = copy.specs.map(row => row.value);
        for (const value of [c.channels, `${c.bore} mm`, `${c.volume} μL`, c.port, "0.7 MPa", "PEEK / PCTFE", "RS232 / RS485", "9600 / 57600 / 115200", "48 W"]) assert(values.includes(value));
        assert.equal(cards.find(card => card.productId === slug)?.model, copy.modelName);
        assert.equal(cards.find(card => card.productId === slug)?.cardSubtitle?.[locale], copy.cardHeading);
      }
      for (const href of [copy.contactHref, copy.detailHref, copy.selectionHref, copy.breadcrumbCategoryHref, copy.breadcrumbSeriesHref, ...copy.applicationDetails.relatedGuides.links.map(link => link.href)]) {
        assert(href.startsWith(`${prefix}/`), `${locale}: wrong link ${href}`);
        if (locale === "zh") assert(!/^\/(en|es|fr|ko|ru)\//.test(href));
      }
      assert(copy.seoDescription.length < 220, `${locale}/${slug} excessive metadata`);
      if (process.argv.includes("--http")) {
        const response = await fetch(`http://127.0.0.1:3000${copy.detailHref}`);
        assert.equal(response.status, 200, `${copy.detailHref} HTTP ${response.status}`);
        const html = await response.text();
        assert(html.includes(copy.seoTitle), `${copy.detailHref} metadata title missing`);
        assert(html.includes(copy.seoDescription), `${copy.detailHref} metadata description missing`);
        const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
        assert(canonical?.endsWith(copy.detailHref), `${copy.detailHref} canonical ${canonical}`);
        const alternates = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/gi)];
        for (const language of mrv3Locales) {
          const languageTag = language === "zh" ? "zh-CN" : language;
          const expected = `${language === "zh" ? "" : `/${language}`}/products/valves/rotary-valves/${c ? `${slug}/` : ""}`;
          assert(alternates.some(m => m[1] === languageTag && m[2].endsWith(expected)), `${copy.detailHref} missing ${languageTag} alternate`);
        }
        assert(!/<meta name="robots" content="[^"]*noindex/i.test(html), `${copy.detailHref} obsolete noindex`);
        const graphs = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
          .flatMap(match => JSON.parse(match[1])["@graph"] || []);
        if (!c) {
          assert(graphs.some(node => node['@type'] === 'CollectionPage'));
          assert.equal(graphs.find(node => node['@type'] === 'ItemList')?.itemListElement.length,3);
          pages++;
          continue;
        }
        const webPage = graphs.find(node => node["@type"] === "WebPage");
        assert.equal(webPage?.inLanguage, locale === "zh" ? "zh-CN" : locale);
        const product = graphs.find(node => node["@type"] === "ProductModel");
        assert.equal(product?.model, copy.modelName);
        assert.equal(product?.name, copy.title);
        const faq = graphs.find(node => node["@type"] === "FAQPage");
        assert.deepEqual(faq?.mainEntity.map((question: { name: string; acceptedAnswer: { text: string } }) => ({ question: question.name, answer: question.acceptedAnswer.text })), copy.faqs);
        const breadcrumbs = graphs.find(node => node["@type"] === "BreadcrumbList");
        assert.equal(breadcrumbs?.itemListElement.length, c ? 5 : 4);
        assert.equal(breadcrumbs?.itemListElement.at(-1).name, copy.breadcrumbLabel);
        assert.equal(breadcrumbs?.itemListElement[2].name, copy.breadcrumbCategoryLabel);
      }
      pages++;
    }
    console.log(`${locale}: content, parameters, cards, links${process.argv.includes("--http") ? ", HTTP and metadata" : ""} passed`);
  }
  assert.equal(getMrv3Content("mrv3-d10", "de"), null);
  assert.equal(getMrv3Content("mrv3-invalid", "en"), null);
  console.log(`PASS: ${pages} MRV3 locale/model combinations.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
