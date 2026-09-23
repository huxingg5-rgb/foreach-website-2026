import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { siteSearchIndex } from "../../data/search/site-search-index.generated";
import { getValvelessForeignContent, getValvelessLocaleCopy, valvelessForeignLocales } from "../../data/products/detail/valveless-pump-locales";

const baselineFile = "E:/0_TemporaryAiKnowledgeBase/Output/Downloads/valveless-search-before-20260916.json";
const current: Record<string, {h?:string; href?:string;t?:string;d?:string;x?:string}[]> = { source: siteSearchIndex };
for (const locale of ["zh-CN", ...valvelessForeignLocales]) current[locale] = JSON.parse(readFileSync(`public/search-data/global-search-index.${locale}.v3.json`,"utf8"));
if(process.argv.includes("--capture")) {
  writeFileSync(baselineFile,JSON.stringify(current));
  console.log("Captured source and six search indexes.");
} else {
  const baseline = JSON.parse(readFileSync(baselineFile,"utf8")) as typeof current;
  const unrelated = (items: typeof current[string]) => items.filter(item=>!String(item.h || item.href).includes("valveless-"));
  for (const key of Object.keys(current)) assert.deepEqual(unrelated(current[key]),unrelated(baseline[key]),`Unrelated search items unchanged: ${key}`);
  for(const locale of valvelessForeignLocales) {
    for(const slug of ["rpl-p4","rpl-p635","rpl-p15","drpl-0109","drpl-0119"]) {
      const item=current[locale].find(item=>item.h?.endsWith(`/valveless-metering-pump/${slug}`));
      const copy=getValvelessForeignContent(slug,locale)!;
      assert.ok(item,`${locale}/${slug}`);
      assert.equal(item.t,`${copy.model} ${getValvelessLocaleCopy(locale).categoryName}`);
      const normalizedApplication = copy.commonApplications[0].toUpperCase().replace(/[‐‑‒–—―﹘﹣－]/g,"-").replace(/[\s\-_/·|.]+/g,"");
      assert.ok(item.x?.includes(normalizedApplication));
      assert.doesNotMatch(JSON.stringify(item),/\p{Script=Han}/u);
    }
  }
  for (const [locale, items] of Object.entries(current)) {
    const products = items.filter(item => /\/products\/pumps\/valveless-metering-pump\/[^/]+\/?$/.test(String(item.h || item.href)));
    assert.equal(products.length, 5, `${locale}: exactly five live model results`);
    assert.equal(new Set(products.map(item => item.h || item.href)).size, 5, `${locale}: no duplicate model result`);
    assert.ok(!items.some(item => /\/valveless-(?:pumps|metering-pump)\/drpl\/?$/.test(String(item.h || item.href))), `${locale}: no retired DRPL route`);
  }
  for (const item of current["zh-CN"].filter(item => /\/valveless-metering-pump\/[^/]+$/.test(String(item.h)))) {
    assert.ok(item.t?.includes("无阀计量泵"), `Chinese search name: ${item.t}`);
  }
  console.log("PASS: Six-language search names, five unique live models, no retired DRPL result; unrelated search items unchanged.");
}
