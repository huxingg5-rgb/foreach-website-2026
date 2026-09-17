import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import details from "../../data/products/generated/pumps/valveless-pumps/detail/index.json";
import { getValvelessForeignContent, getValvelessLocaleCopy, valvelessForeignLocales } from "../../data/products/detail/valveless-pump-locales";
import { applyValvelessPumpLocalizedCopy } from "../../data/products/detail/valveless-pump-localized-adapter";
import { getValvelessPumpSeoTitle } from "../../data/products/detail/valveless-pump-seo";
import { valvelessPumpSelectionProducts } from "../../data/products/selection/valveless-pump-selection.generated";
import { getValvelessPumpCategoryIntro } from "../../data/products/selection/product-type-intro";
import { getLocalizedFilterOptionLabel } from "../../components/products/selection/filter-option-i18n";
import { getValvelessPumpLanguageAlternates } from "../../data/products/selection/valveless-pump-routes";

const origin = process.env.VALVELESS_CHECK_ORIGIN || "http://127.0.0.1:3000";
const baselineFile = "E:/0_TemporaryAiKnowledgeBase/Output/Downloads/valveless-locale-before-20260916.json";
const reportFile = "E:/0_TemporaryAiKnowledgeBase/Output/Downloads/valveless-locale-check-20260916.json";
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
    assert.equal(card.cardTitle[locale], card.cardTitle.zh);
    assert.equal(adapter.model, `Foreach ${card.cardSubtitle[locale]}`);
    assert.equal(adapter.description, copy.description);
    assert.equal(adapter.modelDisplay, source.modelDisplay, "Preserve custom configuration metadata");
    assert.equal(adapter.detailHref, source.detailHref);
    assert.equal(adapter.model3dUrl, source.model3dUrl);
    assert.equal(copy.applicationDetails.items.length, 3);
    assert.equal(copy.faqs.length, 5);
    for (const item of copy.applicationDetails.items) {
      assert.equal(item.paragraphs.length, 3);
      assert.ok(item.paragraphs.every(p => p.length > 90), `${locale}/${source.slug}: substantive application copy`);
    }
    const reviewed = JSON.stringify({ description: copy.description, card: copy.cardSummary, apps: copy.applicationDetails, faqs: copy.faqs, specs: copy.specs, seo: copy.metaDescription });
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
  const baseline = new Map((JSON.parse(readFileSync(baselineFile, "utf8")) as {path:string;html:string}[]).map(item=>[item.path,item.html]));
  const results: unknown[] = [];
  for (const locale of ["zh", ...valvelessForeignLocales]) {
    const prefix = locale === "zh" ? "" : `/${locale}`;
    for (const slug of ["category", ...details.map(item=>item.slug)]) {
      const path = slug === "category" ? `${prefix}/products/pumps/valveless-metering-pump/` : `${prefix}/products/pumps/valveless-pumps/${slug}/`;
      const res = await fetch(origin + path, {headers: {"user-agent":"Bingbot"}});
      assert.equal(res.status,200,path);
      const html = await res.text();
      const body = main(html), text = clean(body);
      const old = baseline.get(slug === "category" && locale !== "zh" ? `${prefix}/products/pumps/valveless-pumps/` : path)!;
      assert.ok(old, `Baseline ${path}`);
      assert.ok(links(html).some(link => link.includes(`rel="canonical" href="https://www.foreachtek.com${path}"`)), `Canonical ${path}`);
      for (const [language, href] of Object.entries(getValvelessPumpLanguageAlternates(slug === "category" ? undefined : slug))) {
        assert.ok(links(html).some(link => link.includes(`hrefLang="${language}" href="https://www.foreachtek.com${href}"`)), `Language ${language}: ${path}`);
      }
      assert.equal([...body.matchAll(/<h1\b/g)].length,1,`One H1 ${path}`);
      if(locale === "zh") {
        // Intentional Chinese deltas: P15 speed, bottom CTA and reviewed type label.
        assert.ok(text.includes("无阀计量泵"), `Chinese name ${path}`);
      } else {
        assert.doesNotMatch(text,/\p{Script=Han}/u,`No Chinese DOM ${path}`);
        if(slug === "category") {
          const copy = getValvelessLocaleCopy(locale);
          for(const paragraph of copy.category.paragraphs) assert.ok(text.includes(clean(paragraph)),`Category paragraph ${path}`);
          const summaries = [...body.matchAll(/<h3 class="product-card-summary product-card-description-heading">([\s\S]*?)<\/h3>/g)].map(match=>clean(match[1]));
          assert.equal(summaries.length,5,`Five descriptive card H3s ${path}`);
          for(const card of valvelessPumpSelectionProducts) assert.ok(summaries.includes(clean(card.cardSubtitle[locale as keyof typeof card.cardSubtitle] || "")),`Card ${card.detailSlug}`);
          assert.ok(text.includes(copy.singleName)); assert.ok(text.includes(copy.dualName));
        } else {
          const copy = getValvelessForeignContent(slug,locale)!;
          assert.equal(clean(body.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] || ""),clean(`Foreach ${copy.cardSummary}`),`Card/detail H1 correspondence ${path}`);
          assert.ok(text.includes(clean(copy.description)),`Description ${path}`);
          for(const item of copy.applicationDetails.items) for(const paragraph of item.paragraphs) assert.ok(text.includes(clean(paragraph)),`Application ${path}`);
          for(const faq of copy.faqs) { assert.ok(text.includes(clean(faq.question))); assert.ok(text.includes(clean(faq.answer))); }
          assert.equal(attr(html,"description"),copy.metaDescription);
          assert.equal(attr(html,"og:description"),copy.metaDescription);
          assert.equal(attr(html,"twitter:description"),copy.metaDescription);
          const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
          const productSchemas = schemas.flatMap(schema=>schema["@graph"] || [schema]).filter(schema => ["ProductModel", "FAQPage", "BreadcrumbList", "WebPage"].includes(schema["@type"]));
          assert.doesNotMatch(JSON.stringify(productSchemas),/\p{Script=Han}/u,`No Chinese product structured data ${path}`);
          assert.ok(JSON.stringify(schemas).includes(copy.description),`Schema description ${path}`);
        }
      }
      if(slug !== "category") {
        assert.ok(notice(html),`Notice present ${path}`);
        assert.equal(notice(html),notice(old),`Custom-made notice unchanged ${path}`);
        const title = decode(html.match(/<title>(.*?)<\/title>/)?.[1] || "");
        assert.equal(title, getValvelessPumpSeoTitle(slug,locale));
        assert.equal(title,decode(old.match(/<title>(.*?)<\/title>/)?.[1] || ""));
      }
      results.push({path,status:res.status,characters:text.length,passed:true});
    }
    console.log(`PASS: ${locale}, category + 5 details, content/metadata/notice/URL checks`);
  }
  writeFileSync(reportFile,JSON.stringify({checkedAt:new Date().toISOString(),results},null,2));
}
if(process.argv.includes("--http")) checkHttp().catch(error=>{console.error(error);process.exitCode=1;});
