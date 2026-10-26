import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";
import details from "../../data/products/generated/pumps/valveless-pumps/detail/index.json";
import { getValvelessForeignContent, getValvelessLocaleCopy, valvelessForeignLocales } from "../../data/products/detail/valveless-pump-locales";
import { applyValvelessPumpLocalizedCopy } from "../../data/products/detail/valveless-pump-localized-adapter";
import { getValvelessPumpSeoTitle } from "../../data/products/detail/valveless-pump-seo";
import { valvelessPumpSelectionProducts } from "../../data/products/selection/valveless-pump-selection.generated";
import { getValvelessPumpCategoryIntro } from "../../data/products/selection/product-type-intro";
import { getLocalizedFilterOptionLabel } from "../../components/products/selection/filter-option-i18n";
import { getValvelessPumpLanguageAlternates, getValvelessPumpPath } from "../../data/products/selection/valveless-pump-routes";
import { getValvelessPumpConfigurator } from "../../data/products/configurator/valveless-pumps";
import { localizeProductConfiguratorConfig } from "../../components/products/configurator/product-variant-configurator.i18n";
import { findMatchingConfiguratorVariants } from "../../components/products/configurator/product-variant-configurator.engine";
import { getProductDatasheet } from "../../data/products/detail/product-detail-resources";

const origin = process.env.VALVELESS_CHECK_ORIGIN || "http://127.0.0.1:3000";
const reportFile = process.env.VALVELESS_CHECK_REPORT || "valveless-page-check.json";
const decode = (text: string) => text.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#x27;|&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">");
const clean = (text: string) => decode(text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]*>/g," ")).replace(/\s+/g," ").trim();
const main = (html: string) => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || "";
const notice = (html: string) => clean(html.match(/<div\b[^>]*data-product-model-row="true"[^>]*>[\s\S]*?<\/div>/)?.[0] || "");
const links = (html: string) => [...html.matchAll(/<link\b[^>]*>/g)].map(m=>m[0]).filter(item=>/rel="(?:canonical|alternate)"/.test(item)).sort();
const attr = (html: string, key: string) => decode([...html.matchAll(/<meta\b[^>]*>/g)].map(m=>m[0]).find(tag=>tag.includes(`="${key}"`))?.match(/content="([^"]*)"/)?.[1] || "");

for (const locale of valvelessForeignLocales) {
  const dictionary = getValvelessLocaleCopy(locale);
  for (const [value, key] of [["RPL 无阀泵", "single"], ["DRPL 双头无阀泵", "dual"]] as const) {
    assert.equal(getValvelessPumpCategoryIntro(value, locale)?.title, dictionary[key].title);
    assert.equal(getLocalizedFilterOptionLabel(value, locale), key === "single" ? dictionary.singleName : dictionary.dualName);
  }
  for (const source of details) {
    const copy = getValvelessForeignContent(source.slug, locale)!;
    const card = valvelessPumpSelectionProducts.find(item => item.detailSlug === source.slug)!;
    const adapter = applyValvelessPumpLocalizedCopy(source, locale);
    const hasSeriesDatasheet = ["rpl-p635", "rpl-p15"].includes(source.slug);
    const datasheetId = (adapter as typeof adapter & { datasheetId?: string }).datasheetId;
    assert.equal(datasheetId, hasSeriesDatasheet ? "rpl-series-en" : undefined, "Only models covered by the English PDF share it");
    const config = getValvelessPumpConfigurator(source.slug, locale)!;
    const chineseConfig = getValvelessPumpConfigurator(source.slug, "zh")!;
    assert.ok(config, `Configurator exists: ${locale}/${source.slug}`);
    assert.equal(config.localizedLocale, locale);
    assert.deepEqual(config.variants, chineseConfig.variants, "Preserve ordering models and SKUs");
    assert.deepEqual(config.dimensions.map(d => d.order), chineseConfig.dimensions.map(d => d.order));
    assert.equal(config.showProductCode, chineseConfig.showProductCode);
    assert.equal(config.emptyInitialSelection, chineseConfig.emptyInitialSelection);
    assert.equal(config.allowListRemoval, chineseConfig.allowListRemoval);
    assert.equal(localizeProductConfiguratorConfig(config, locale), config, "Bypass generic tubing translation");
    assert.doesNotMatch(JSON.stringify(config), /\p{Script=Han}/u, "No Chinese in modal or controls");
    for (const variant of config.variants) {
      assert.deepEqual(findMatchingConfiguratorVariants(config, variant.attributes).map(v => v.id), [variant.id]);
    }
    assert.equal(card.cardTitle[locale], card.cardTitle.zh);
    assert.equal(adapter.model, copy.title);
    assert.equal(copy.introductionParagraphs.length, 3);
    assert.equal(copy.commonApplications.length, 3);
    assert.equal(copy.additionalImageAlts.length, source.additionalImages.length);
    assert.doesNotMatch(copy.additionalImageAlts.join(" "), /\p{Script=Han}/u);
    if (locale !== "en") assert.doesNotMatch(copy.additionalImageAlts.join(" "), /angled view|nameplate view/);
    assert.ok("valvelessIntroductionParagraphs" in adapter);
    assert.deepEqual(adapter.valvelessIntroductionParagraphs, copy.introductionParagraphs);
    assert.equal(copy.description, copy.introductionParagraphs.join("\n\n"));
    assert.ok(copy.title.startsWith(copy.model));
    const cardModel = copy.model.replace(/^RPL-/, "");
    assert.ok(copy.cardSummary.startsWith(`${cardModel} `), `${locale}/${source.slug}: reviewed card model prefix`);
    assert.equal(adapter.description, copy.description);
    assert.equal(adapter.modelDisplay, source.modelDisplay, "Preserve custom configuration metadata");
    assert.equal(adapter.detailHref, getValvelessPumpPath(locale, source.slug));
    assert.equal(adapter.model3dUrl, source.model3dUrl);
    assert.equal(copy.applicationDetails.items.length, 3);
    assert.equal(copy.faqs.length, 5);
    for (const item of copy.applicationDetails.items) {
      assert.equal(item.paragraphs.length, 3);
      assert.ok(item.paragraphs.every(p => p.length > 90), `${locale}/${source.slug}: substantive application copy`);
    }
    const reviewed = JSON.stringify({ title: copy.title, description: copy.description, commonApplications: copy.commonApplications, card: copy.cardSummary, apps: copy.applicationDetails, faqs: copy.faqs, specs: copy.specs, seo: copy.metaDescription });
    assert.doesNotMatch(reviewed, /\p{Script=Han}/u, `${locale}/${source.slug}: no Chinese`);
    assert.doesNotMatch(reviewed, /\{\{|undefined|NaN/, `${locale}/${source.slug}: resolved tokens`);
    source.specs.forEach((row, index) => {
      // Numeric engineering values and port standards stay exactly as supplied.
      if (!/PVDF|Al₂O₃|ZrO₂|cycles|\p{Script=Han}/u.test(row.value)) assert.equal(copy.specs[index].value, row.value);
    });
    if (source.slug.startsWith("rpl")) {
      assert.ok(copy.description.includes("(PVDF)"),`${locale}/${source.slug}: material abbreviation`);
      assert.ok(copy.specs.some(row => row.value === dictionary.materials.pvdf));
      assert.ok(copy.specs.some(row => row.value === (source.slug === "rpl-p635" ? dictionary.materials.zirconia : dictionary.materials.alumina)));
    } else {
      assert.doesNotMatch(copy.description, /PVDF|Al₂O₃|ZrO₂/, "Do not borrow RPL materials for DRPL");
      assert.ok(copy.description.includes(source.slug === "drpl-0109" ? "1:9" : "1:19"));
    }
  }
}
assert.equal(getValvelessForeignContent("other", "fr"), undefined);
assert.equal(getValvelessForeignContent("rpl-p4", "zh"), undefined);
const unrelated = { slug: "rpl-p4", productTypeId: "different-product" };
assert.equal(applyValvelessPumpLocalizedCopy(unrelated, "en"), unrelated);
console.log("PASS: 25 foreign detail adapters, cards, series intros, facts and language guards.");

async function checkHttp() {
  const results: unknown[] = [];
  for (const locale of ["zh", ...valvelessForeignLocales]) {
    const prefix = locale === "zh" ? "" : `/${locale}`;
    for (const slug of ["category", ...details.map(item=>item.slug)]) {
      const path = slug === "category" ? `${prefix}/products/pumps/valveless-metering-pump/` : `${prefix}/products/pumps/valveless-metering-pump/${slug}/`;
      const res = await fetch(origin + path, {headers: {"user-agent":"Bingbot"}});
      assert.equal(res.status,200,path);
      const html = await res.text();
      const body = main(html), text = clean(body);
      assert.ok(links(html).some(link => link.includes(`rel="canonical" href="https://www.foreachtek.com${path}"`)), `Canonical ${path}`);
      for (const [language, href] of Object.entries(getValvelessPumpLanguageAlternates(slug === "category" ? undefined : slug))) {
        assert.ok(links(html).some(link => [language, ...(language === "en-US" ? ["en"] : [])].some(tag => link.toLowerCase().includes(`hreflang="${tag}" href="https://www.foreachtek.com${href}"`.toLowerCase()))), `Language ${language}: ${path}`);
      }
      assert.equal([...body.matchAll(/<h1\b/g)].length,1,`One H1 ${path}`);
      if(locale === "zh") {
        // Intentional Chinese deltas: P15 speed, bottom CTA and reviewed type label.
        assert.ok(text.includes("无阀计量泵"), `Chinese name ${path}`);
      } else {
        assert.doesNotMatch(text,/\p{Script=Han}/u,`No Chinese DOM ${path}`);
        if(slug === "category") {
          const copy = getValvelessLocaleCopy(locale);
          for(const paragraph of copy.category.paragraphs) assert.ok(text.replace(/\s/g, "").includes(clean(paragraph.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")).replace(/\s/g, "")),`Category paragraph ${path}`);
          const summaries = [...body.matchAll(/<h3 class="product-card-summary product-card-description-heading">([\s\S]*?)<\/h3>/g)].map(match=>clean(match[1]));
          assert.equal(summaries.length,5,`Five descriptive card H3s ${path}`);
          for(const card of valvelessPumpSelectionProducts) assert.ok(summaries.includes(clean(card.cardSubtitle[locale as keyof typeof card.cardSubtitle] || "").replace(/[。.!！?？]+$/, "")),`Card ${card.detailSlug}`);
          assert.ok(text.includes(copy.singleName)); assert.ok(text.includes(copy.dualName));
        } else {
          const copy = getValvelessForeignContent(slug,locale)!;
          const datasheet = ["rpl-p635", "rpl-p15"].includes(slug) ? getProductDatasheet("rpl-series-en") : null;
          if (datasheet) {
            const pdfLinks = [...body.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>/g)].filter(match => decode(match[1]) === datasheet.file);
            assert.equal(pdfLinks.length, 2, `Shared English PDF preview and download ${path}`);
            assert.ok(pdfLinks.some(match => /\bdownload(?:=|\s|>)/.test(match[0])), `PDF download action ${path}`);
            assert.doesNotMatch(body, /href="[^\"]*datasheets\/zh-CN\//, `Foreign page must use English PDF ${path}`);
          } else {
            assert.ok(body.includes('data-product-datasheet-empty-state="true"'), `Do not attach an unrelated datasheet ${path}`);
          }
          assert.equal(clean(body.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] || ""),clean(copy.title),`Localized detail H1 ${path}`);
          assert.ok(text.includes(clean(copy.description)),`Description ${path}`);
          const introductionBlock = body.match(/<div[^>]*data-valveless-description="true"[^>]*>([\s\S]*?)<\/div>/)?.[1] || "";
          assert.equal([...introductionBlock.matchAll(/<p\b/g)].length, 3, `Three rendered introduction paragraphs ${path}`);
          for (const application of copy.commonApplications) assert.ok(text.includes(clean(application)), `Common application ${path}`);
          const imageAlts = [...body.matchAll(/<img\b[^>]*alt="([^"]*)"/g)].map(match => decode(match[1]));
          for (const alt of [copy.imageAlt, ...copy.additionalImageAlts]) assert.ok(imageAlts.includes(alt), `Localized gallery ALT ${path}: ${alt}`);
          assert.ok(body.includes(`href="${copy.presentation.bottomCta.href}/"`) || body.includes(`href="${copy.presentation.bottomCta.href}"`), `Localized CTA link ${path}`);
          for(const item of copy.applicationDetails.items) for(const paragraph of item.paragraphs) assert.ok(text.includes(clean(paragraph)),`Application ${path}`);
          for(const faq of copy.faqs) { assert.ok(text.includes(clean(faq.question))); assert.ok(text.includes(clean(faq.answer))); }
          assert.equal(attr(html,"description"),copy.metaDescription);
          assert.equal(attr(html,"og:description"),copy.metaDescription);
          assert.equal(attr(html,"twitter:description"),copy.metaDescription);
          const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
          const productSchemas = schemas.flatMap(schema=>schema["@graph"] || [schema]).filter(schema => ["ProductModel", "FAQPage", "BreadcrumbList", "WebPage"].includes(schema["@type"]));
          assert.doesNotMatch(JSON.stringify(productSchemas),/\p{Script=Han}/u,`No Chinese product structured data ${path}`);
          const productSchema = productSchemas.find(schema => schema["@type"] === "ProductModel");
          assert.equal(productSchema?.description, copy.description, `Schema description ${path}`);
        }
      }
      if(slug !== "category") {
        assert.doesNotMatch(body, /foreach-drpl-dual-head-valveless-pump-2d-drawing\.pdf/, `No obsolete shared drawing ${path}`);
        const config = getValvelessPumpConfigurator(slug, locale)!;
        const expectedModel = config.variants.length === 1 ? config.variants[0].model : config.emptySelectionText!;
        assert.ok(notice(html).includes(expectedModel), `Localized model selector ${path}`);
        assert.doesNotMatch(notice(html), /custom-made|该产品为定制品|se fabrica a medida|fabriqué sur mesure|맞춤 제작 제품|изготавливается на заказ/, `No obsolete custom-product fallback ${path}`);
        const title = decode(html.match(/<title>(.*?)<\/title>/)?.[1] || "");
        assert.equal(title, getValvelessPumpSeoTitle(slug,locale));
      }
      results.push({path,status:res.status,characters:text.length,passed:true});
    }
    console.log(`PASS: ${locale}, category + 5 details, content/metadata/notice/URL checks`);
  }
  writeFileSync(reportFile,JSON.stringify({checkedAt:new Date().toISOString(),results},null,2));
}
if(process.argv.includes("--http")) checkHttp().catch(error=>{console.error(error);process.exitCode=1;});
