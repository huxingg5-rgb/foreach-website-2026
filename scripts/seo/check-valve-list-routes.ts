import assert from "node:assert/strict";
import {getValveSelectionPath, getHpValveDetailPath, valveLocales, valveSeriesRoutes} from "../../data/products/selection/valve-routes";

const expectedModels: Record<string,string[]> = {
  "rotary-valves": ["mrv3-d10", "mrv3-d16", "mrv3-d24"],
  "high-pressure-valves": ["hp"],
  "solenoid-valves": ["2-way", "3-way"],
};
async function readPage(path:string) {
  const response = await fetch(`http://127.0.0.1:3000${path}`);
  assert.equal(response.status,200,path);
  const html = await response.text();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical,`https://www.foreachtek.com${path}`);
  assert.equal([...html.matchAll(/<h1\b/g)].length,1,`single H1: ${path}`);
  const graph = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m=>JSON.parse(m[1])["@graph"] || []);
  return {html,graph};
}
async function main() {
  for (const locale of valveLocales) {
    for (const route of valveSeriesRoutes) {
      const path = getValveSelectionPath(locale,route.slug);
      const {html,graph} = await readPage(path);
      assert(graph.some(n=>n["@type"]==="CollectionPage"),path);
      assert(!graph.some(n=>n["@type"]==="ProductModel"),`list must not describe one product: ${path}`);
      const list = graph.find(n=>n["@type"]==="ItemList");
      const expected = expectedModels[route.slug].map(model=>`https://www.foreachtek.com${path}${model}/`);
      assert.deepEqual(list?.itemListElement.map((item:any)=>item.url || item.item?.url || item.item),expected,`model links: ${path}`);
      for (const lang of valveLocales) {
        const tag=lang==='zh'?'zh-CN':lang;
        assert(html.includes(`hrefLang="${tag}" href="https://www.foreachtek.com${getValveSelectionPath(lang,route.slug)}"`),`${path}: ${tag}`);
      }
      const breadcrumb = graph.find(n=>n["@type"]==="BreadcrumbList");
      assert.equal(breadcrumb?.itemListElement.length,4,path);
      assert.equal(breadcrumb?.itemListElement[2].item,`https://www.foreachtek.com${getValveSelectionPath(locale)}`);
    }
    const {graph} = await readPage(getHpValveDetailPath(locale));
    assert(graph.some(n=>n["@type"]==="ProductModel"),`${locale}: HP detail`);
    const breadcrumb = graph.find(n=>n["@type"]==="BreadcrumbList");
    assert.equal(breadcrumb?.itemListElement.at(-1).name,'HP');
    assert.equal(breadcrumb?.itemListElement.at(-2).item,`https://www.foreachtek.com${getValveSelectionPath(locale,'high-pressure-valves')}`);
    console.log(`${locale}: 3 fixed lists and HP detail passed`);
  }
  console.log('PASS: 24 localized routes; server-rendered cards, breadcrumbs, canonical and alternate links.');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
