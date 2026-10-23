import assert from "node:assert/strict";
import {getValveCardCopy, getValveDetailHeading} from "../../data/products/selection/valve-card-copy";
import fs from "node:fs";
import {getSolenoidConfiguration} from "../../data/products/detail/solenoid-configurations";
import {getSolenoidCardCopy, getSolenoidStateCopy} from "../../data/products/detail/solenoid-card-copy";
import {getSolenoidContent, expandSolenoidCards, solenoidConfigurations, solenoidConnectionConfigurations, solenoidPageConfigurations, solenoidLocales} from "../../data/products/detail/solenoid-content";

async function main() {
  const closedName = {zh: "常闭", en: "normally closed", es: "normalmente cerrada", fr: "normalement fermée", ko: "상시 닫힘", ru: "нормально закрытый"};
  for (const locale of solenoidLocales) {
    const cards = expandSolenoidCards({productId: "6010-solenoid-valve"}, locale);
    assert.equal(cards.length, 9);
    assert.equal(new Set(cards.map(card => card.productId)).size, 9);
    for (const card of cards) {
      const configuration = getSolenoidConfiguration(card.productId)!;
      const copy = getSolenoidCardCopy(card.productId, locale)!;
      assert(copy && !/\n|undefined/.test(copy.heading));
      assert.equal(getValveCardCopy(card, locale)?.heading, copy.heading, "Selection and detail headings share the approved copy");
      if (configuration.state === "nc") {
        const showClosed = configuration.connection !== "threaded";
        assert.equal(copy.heading.toLowerCase().includes(closedName[locale]), showClosed, "Base and barbed cards include NC in every language; threaded headings keep the approved shorter wording");
      }
      assert(copy.heading.includes(configuration.model), "Every current card includes its model");
      if (configuration.state) {
        const prefix = ({base: "SV10-P-2", barbed: "SV10-B16-2", threaded: "SV10-M6/U28-2"})[configuration.connection];
        assert.equal(configuration.model, prefix + configuration.state.toUpperCase());
        assert.equal(card.model, configuration.model);
      }
      assert(fs.existsSync("public" + card.imageCard));
      if (configuration.state) {
        assert.equal(card.specs?.[2].value, getSolenoidStateCopy(locale, configuration.state).label);
        assert(configuration.assets.every(asset => asset.endsWith("2" + configuration.state)));
      }
    }
    assert.deepEqual(cards.map(card => card.productId), ["3-way-base", "3-way-barbed", "3-way-threaded", "2-way-nc-base", "2-way-nc-barbed", "2-way-nc-threaded", "2-way-no-base", "2-way-no-barbed", "2-way-no-threaded"]);
    const prefix = locale === "zh" ? "" : `/${locale}`;
    for (const slug of ["solenoid-valves", ...solenoidPageConfigurations.map(c => c.slug)]) {
      const copy = getSolenoidContent(slug, locale)!;
      if (locale !== "zh") {
        assert.equal(copy.applicationAreas?.length, 3);
        for (const area of copy.applicationAreas!) assert(area.href.startsWith(`/${locale}/applications/`));
      }
      const c = getSolenoidConfiguration(slug);
      const connection = solenoidConnectionConfigurations.find(item => item.key === c?.connection);
      const isDetail = Boolean(c || connection);
      assert.equal(copy.faqs.length, 6);
      assert.equal(copy.applicationDetails.items.length, 3);
      assert(!/规格书|选型指南|6090\d+|PPVC|0\.38|RS232|RS485|PCTFE|MRV3/.test(JSON.stringify(copy)));
      if (locale !== "zh") assert(!/[\u4e00-\u9fff]/.test(JSON.stringify([copy.title,copy.description,copy.specs,copy.faqs,copy.applicationDetails.items])));
      for (const value of ["-75 kPa – 0.25 MPa","1.4 mm","20 μL","0.03","EPDM / FKM / FFKM","DC 12 / 24 V (±10%)","2.5 W"]) assert(copy.specs.some(row => row.value === value));
      if (c) {
        assert.equal(copy.valveIntroductionParagraphs.length, 2, "configuration introductions keep two coherent paragraphs");
        assert(copy.valveIntroductionParagraphs[0].includes(c.model), "Introduction identifies the specific product model");
        assert.equal(copy.h1Title, getSolenoidCardCopy(slug, locale)!.heading, "Preserve the original complete heading sentence");
        assert.equal(getValveDetailHeading(slug, locale), copy.h1Title);
        if (c.state === "nc") {
          const showClosed = c.connection !== "threaded";
          assert.equal(copy.h1Title.toLowerCase().includes(closedName[locale]), showClosed);
          assert(!copy.seoTitle.toLowerCase().includes(closedName[locale]));
        }
        assert(copy.faqs.at(-1)!.answer.includes("M6"), "ordering guidance distinguishes connection variants");
        assert.equal(copy.title, `FOREACH ${copy.cardHeading}`);
        assert.equal(copy.modelName, c.model);
        if (solenoidConfigurations.some(item => item.slug === slug)) assert.equal(cards.find(card => card.slug === slug)?.cardSubtitle[locale],copy.cardHeading);
        const other = getSolenoidContent(c.key === "two" ? "3-way-base" : "2-way-base", locale)!;
        assert.notEqual(copy.specs[2].value, other.specs[2].value);
        assert.notEqual(copy.description, other.description);
        assert.notEqual(copy.applicationDetails.items[1].title, other.applicationDetails.items[1].title);
      }
      if (connection) {
        assert(copy.modelName.startsWith(connection.model.split(" / ")[0]));
        assert(copy.specs.some(row => row.value === connection.weight));
        if (connection.key !== "threaded") {
          assert.equal(copy.specs[9].value, "PEEK");
          assert(!copy.specs.some(row => row.value.includes("PVDF")), "non-threaded valve must not offer seat choices");
        }
      }
      assert(copy.seoDescription.length < 300);
      for (const href of [copy.detailHref,copy.contactHref,copy.breadcrumbCategoryHref,copy.breadcrumbSeriesHref,...copy.applicationDetails.relatedGuides.links.map(item => item.href)]) assert(href.startsWith(`${prefix}/`));
      if (process.argv.includes("--http")) {
        const response = await fetch(`http://127.0.0.1:3000${copy.detailHref}`);
        assert.equal(response.status,200,copy.detailHref);
        const html = await response.text();
        const decode = (s: string) => s.replace(/&amp;/g,"&").replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">");
        const renderedHeading = decode(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "").replace(/<[^>]*>/g, "");
        const expectedHeading = copy.h1Title.trimEnd().replace(/[。．.!！?？;；,，:：、…]+$/u, "").trimEnd();
        assert.equal(renderedHeading, expectedHeading, `visible heading ${copy.detailHref}`);
        assert(decode(html).includes(copy.seoTitle), `metadata ${copy.detailHref}`);
        assert(decode(html).includes(copy.seoDescription), `description ${copy.detailHref}`);
        if (c) assert(decode(html).includes(copy.valveIntroductionParagraphs[0]), `visible model introduction ${copy.detailHref}`);
        assert(html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1].endsWith(copy.detailHref));
        const alternates = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/gi)];
        for (const lang of solenoidLocales) assert(alternates.some(m => m[1] === (lang === "zh" ? "zh-CN" : lang) && m[2].endsWith(`${lang === "zh" ? "" : `/${lang}`}/products/valves/solenoid-valves/${isDetail ? `${slug}/` : ""}`)));
        const graphs = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m => JSON.parse(m[1])["@graph"] || []);
        if (!isDetail) {
          assert(graphs.some(node => node['@type'] === 'CollectionPage'));
          assert.equal(graphs.find(node => node['@type'] === 'ItemList')?.itemListElement.length,9);
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
        assert(breadcrumb?.itemListElement[2].item.endsWith(copy.breadcrumbCategoryHref));
      }
    }
    console.log(`${locale}: 13 pages passed${process.argv.includes("--http") ? " (HTTP, metadata, schema, breadcrumbs)" : ""}`);
  }
  assert.equal(getSolenoidContent("invalid","en"),null);
  assert.equal(getSolenoidContent("sv10-p","de"),null);
  console.log("PASS: 78 solenoid locale/page combinations; nine cards per locale.");
}
main().catch(error => {console.error(error); process.exitCode=1;});
