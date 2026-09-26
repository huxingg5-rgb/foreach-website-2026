import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import path from "node:path";
import {getPipettingCopy, getPipettingPath, getPipettingAlternates, pipettingLocales, pipettingSeriesSlugs} from "../../data/products/selection/pipetting-pump-seo";

// Local server: tsx scripts/seo/check-pipetting-pages.ts
// Export + sitemap: tsx scripts/seo/check-pipetting-pages.ts --out
const exported = process.argv.includes("--out");
const prerendered = process.argv.includes("--prerender");
const base = process.env.PIPETTING_AUDIT_ORIGIN || "http://127.0.0.1:3000";
const origin = "https://www.foreachtek.com";
const escape = (s:string) => s.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("'","&#x27;").replaceAll("<","&lt;").replaceAll(">","&gt;");
const expectedModels = {category:["smtp2-1000ul","smtp4-100ul","smtp4-500ul"], smtp2:["smtp2-1000ul"], smtp4:["smtp4-100ul","smtp4-500ul"]};
async function main() {
  const sitemap = exported ? await readFile("out/sitemap.xml", "utf8") : "";
  let count = 0;
  for (const locale of pipettingLocales) for (const key of ["category", ...pipettingSeriesSlugs] as const) {
    const route = getPipettingPath(locale,key);
    let html:string;
    if (prerendered) html = await readFile(path.join(".next/server/app",route.replace(/\/$/,"")+".html"),"utf8");
    else if (exported) html = await readFile(path.join("out",route,"index.html"),"utf8");
    else {
      const response=await fetch(base+route);
      assert.equal(response.status,200,route);
      html=await response.text();
    }
    const body=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"");
    const copy=getPipettingCopy(locale,key);
    assert.equal((body.match(/<h1\b/g)||[]).length,1,route+" H1 count");
    assert(body.includes(`>${escape(copy.title)}</h1>`),route+" H1");
    assert(body.includes(`<title>${escape(copy.seoTitle)}</title>`),route+" title");
    assert(body.includes(`<meta name="description" content="${escape(copy.description)}"`),route+" description");
    for(const paragraph of copy.paragraphs) assert(body.includes(escape(paragraph)),route+" initial HTML paragraph");
    assert(body.includes(`<link rel="canonical" href="${origin+route}"`),route+" canonical");
    assert(body.includes('<meta name="robots" content="index, follow"'),route+" robots");
    assert(!body.includes('content="noindex'),route+" noindex");
    for(const [lang,href] of Object.entries(getPipettingAlternates(key))) assert(body.includes(`hrefLang="${lang}" href="${origin+href}"`),route+" hreflang "+lang);
    for(const series of pipettingSeriesSlugs) assert(body.includes(`href="${getPipettingPath(locale,series)}"`),route+" series link");
    if(key!=="category") assert(body.includes(`href="${getPipettingPath(locale)}"`),route+" parent link");
    const schemaMatch=html.match(/<script[^>]*id="product-selection-structured-data"[^>]*>([\s\S]*?)<\/script>/);
    assert(schemaMatch,route+" structured data");
    const graph=JSON.parse(schemaMatch[1])["@graph"];
    const collection=graph.find((x:{"@type":string})=>x["@type"]==="CollectionPage");
    assert.equal(collection.url,origin+route,route+" schema URL");
    const items=graph.find((x:{"@type":string})=>x["@type"]==="ItemList");
    assert.equal(items.numberOfItems,expectedModels[key].length,route+" filtered card count");
    for(const model of expectedModels[key]) assert(items.itemListElement.some((x:{url:string})=>x.url===origin+getPipettingPath(locale)+model+"/"),route+" model "+model);
    if(exported) assert(sitemap.includes(`<loc>${origin+route}</loc>`),route+" sitemap");
    count++;
  }
  console.log(`PASS: ${count} localized pipetting pages; H1, metadata, initial HTML, canonical, hreflang, crawlable links, structured data and filtered models${exported ? ", exported HTML and sitemap" : prerendered ? ", production prerendered HTML" : ""}.`);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
