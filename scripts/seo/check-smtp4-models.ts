import assert from "node:assert/strict";
import fs from "node:fs";
import { pipettingPumpSelectionProducts } from "../../data/products/selection/pipetting-pump-selection.generated";
import { getPipettingModelPath } from "../../data/products/selection/pipetting-pump-routes";
import { getPipettingModelMetadata } from "../../services/products/getPipettingModelMetadata";
import { getPipettingFaqs } from "../../data/products/detail/pipetting-pump-faq.locales";
import { pipettingPumpIntroductions } from "../../data/products/detail/pipetting-pump-introductions.locales";
import { getSmtp4CadAssets } from "../../data/products/detail/smtp4-cad-assets";
import details from "../../data/products/generated/pumps/pipetting-pumps/detail/index.json";

async function main() {
 const origin=process.env.SMTP_BASE_URL, locales=["zh","en","es","fr","ko","ru"];
 const cards=pipettingPumpSelectionProducts.filter(item=>item.detailSlug?.startsWith("smtp4-"));
 assert.equal(cards.length,3);
 for(const [capacity,resolution] of [[100,"0.05"],[250,"0.125"],[500,"0.25"]] as const) {
  const slug=`smtp4-${capacity}ul`, detail=details.find(item=>item.slug===slug)!;
  assert(detail);assert.equal(detail.specs.find(row=>row.label==="标称量程")?.value,`${capacity}μL`);
  assert.equal(detail.specs.find(row=>row.label==="定量分辨率")?.value,`${resolution}μL/步`);
  const cad=getSmtp4CadAssets(slug)!;assert(fs.existsSync(`public${cad.model3dUrl}`));
  assert(fs.existsSync(`public${detail.mainImage}`));
  for(const locale of locales) {
   const url=getPipettingModelPath(locale,slug)!;assert(url);
   const meta=getPipettingModelMetadata(locale,slug);assert(meta.title && meta.description);
   assert.equal(pipettingPumpIntroductions[locale][slug].length,3);
   const faqs=getPipettingFaqs(locale,slug)!;assert.equal(faqs.length,5);
   assert(faqs.some(row=>row.answer.includes(resolution)||row.answer.includes(resolution.replace('.',','))));
   const search=JSON.parse(fs.readFileSync(`public/search-data/global-search-index.${locale==='zh'?'zh-CN':locale}.v3.json`,'utf8'));
   assert.equal(search.filter((row:{m:string;h:string})=>row.m==='products'&&row.h===getPipettingModelPath('zh',slug)).length,1);
   if(origin) {
    const response=await fetch(origin+url,{signal:AbortSignal.timeout(120000)});assert.equal(response.status,200,url);
    const html=await response.text(),body=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"");
    assert.equal((body.match(/<h1\b/g)||[]).length,1,url);
    assert(body.includes(`${capacity}`),url+' capacity');assert(body.includes(resolution),url+' resolution');
    assert(body.includes(`href="https://www.foreachtek.com${url}"`),url+' canonical');
    for(const lang of locales)assert(body.includes(`href="https://www.foreachtek.com${getPipettingModelPath(lang,slug)}"`),url+' alternate '+lang);
    assert(body.includes('3D'),url+' viewer entry');
    if(locale!=='zh')assert(!/[\u3400-\u9fff]/.test(body.replace(/<[^>]*>/g,'').replaceAll('简体中文','')),url+' unexpected Chinese copy');
    const schemas=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
    const product=schemas.flatMap(s=>s['@graph']||[s]).find(s=>['Product','ProductModel'].includes(s['@type']));
    assert(product,url+' product schema');
    console.log('PASS '+url);
   }
  }
 }
 console.log('PASS: SMTP4 100/250/500 capacities, six-language copy, routes, search and CAD assets'+(origin?', rendered metadata and schema':''));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
