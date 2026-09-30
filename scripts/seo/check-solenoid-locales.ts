import assert from "node:assert/strict";
import {getSolenoidContent, expandSolenoidCards, solenoidConfigurations, solenoidConnectionConfigurations, solenoidPageConfigurations, solenoidLocales} from "../../data/products/detail/solenoid-content";

async function main() {
  for (const locale of solenoidLocales) {
    const cards = expandSolenoidCards({productId: "6010-solenoid-valve"}, locale);
    assert.equal(cards.length, 2);
    assert.deepEqual(cards.map(card => card.productId), ["2-way", "3-way"]);
    const prefix = locale === "zh" ? "" : `/${locale}`;
    for (const slug of ["solenoid-valves", ...solenoidPageConfigurations.map(c => c.slug)]) {
      const copy = getSolenoidContent(slug, locale)!;
      const c = solenoidConfigurations.find(c => c.slug === slug);
      const connection = solenoidConnectionConfigurations.find(c => c.slug === slug);
      const isDetail = Boolean(c || connection);
      assert.equal(copy.faqs.length, 6);
      assert.equal(copy.applicationDetails.items.length, 3);
      assert(!/规格书|选型指南|6090\d+|PPVC|0\.38|RS232|RS485|PCTFE|MRV3/.test(JSON.stringify(copy)));
      if (locale !== "zh") assert(!/[\u4e00-\u9fff]/.test(JSON.stringify([copy.title,copy.description,copy.specs,copy.faqs,copy.applicationDetails.items])));
      for (const value of ["-75 kPa – 0.25 MPa","1.4 mm","20 μL","0.03","EPDM / FKM / FFKM","DC 12 / 24 V (±10%)","2.5 W"]) assert(copy.specs.some(row => row.value === value));
      if (c) {
        assert.equal(copy.title, `FOREACH ${copy.cardHeading}`);
        assert.equal(copy.modelName, c.model);
        assert.equal(cards.find(card => card.slug === slug)?.cardSubtitle[locale],copy.cardHeading);
        for (const item of solenoidConnectionConfigurations) assert(copy.specs.some(row => row.label === item.model));
        const other = getSolenoidContent(c.key === "two" ? "3-way" : "2-way", locale)!;
        assert.notEqual(copy.specs[2].value, other.specs[2].value);
        assert.notEqual(copy.description, other.description);
        assert.notEqual(copy.applicationDetails.items[1].title, other.applicationDetails.items[1].title);
      }
      if (connection) {
        assert.equal(copy.modelName, connection.model);
        assert(copy.specs.some(row => row.value === connection.weight));
        if (connection.key !== "threaded") {
          assert.equal(copy.specs[9].value, "PEEK");
          assert(!copy.specs.some(row => row.value.includes("PVDF")), "non-threaded valve must not offer seat choices");
        }
      }
      assert(copy.seoDescription.length < 220);
      for (const href of [copy.detailHref,copy.contactHref,copy.breadcrumbCategoryHref,copy.breadcrumbSeriesHref,...copy.applicationDetails.relatedGuides.links.map(item => item.href)]) assert(href.startsWith(`${prefix}/`));
      if (process.argv.includes("--http")) {
        const response = await fetch(`http://127.0.0.1:3000${copy.detailHref}`);
        assert.equal(response.status,200,copy.detailHref);
        const html = await response.text();
        const decode = (s: string) => s.replace(/&amp;/g,"&").replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">");
        assert(decode(html).includes(copy.seoTitle), `metadata ${copy.detailHref}`);
        assert(decode(html).includes(copy.seoDescription), `description ${copy.detailHref}`);
        assert(html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1].endsWith(copy.detailHref));
        const alternates = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/gi)];
        for (const lang of solenoidLocales) assert(alternates.some(m => m[1] === (lang === "zh" ? "zh-CN" : lang) && m[2].endsWith(`${lang === "zh" ? "" : `/${lang}`}/products/valves/solenoid-valves/${isDetail ? `${slug}/` : ""}`)));
        const graphs = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m => JSON.parse(m[1])["@graph"] || []);
        if (!isDetail) {
          assert(graphs.some(node => node['@type'] === 'CollectionPage'));
          assert.equal(graphs.find(node => node['@type'] === 'ItemList')?.itemListElement.length,2);
          continue;
        }
        const product = graphs.find(node => node["@type"] === "ProductModel");
        assert.equal(product?.name,copy.title);
        assert.equal(product?.model,copy.modelName);
        const faq = graphs.find(node => node["@type"] === "FAQPage");
        assert.deepEqual(faq?.mainEntity.map((q: any) => ({question:q.name,answer:q.acceptedAnswer.text})),copy.faqs);
        const breadcrumb = graphs.find(node => node["@type"] === "BreadcrumbList");
        assert.equal(breadcrumb?.itemListElement.length,isDetail ? 5 : 4);
        assert.equal(breadcrumb?.itemListElement.at(-1).name,copy.breadcrumbLabel);
        assert.equal(breadcrumb?.itemListElement[2].name,copy.breadcrumbCategoryLabel);
      }
    }
    console.log(`${locale}: 6 pages passed${process.argv.includes("--http") ? " (HTTP, metadata, schema, breadcrumbs)" : ""}`);
  }
  assert.equal(getSolenoidContent("invalid","en"),null);
  assert.equal(getSolenoidContent("sv10-p","de"),null);
  console.log("PASS: 36 solenoid locale/page combinations; two functional cards per locale.");
}
main().catch(error => {console.error(error); process.exitCode=1;});
