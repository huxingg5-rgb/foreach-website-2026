import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {gzipSync} from "node:zlib";
import {getSolenoidRedirectEntries} from "../../lib/seo/solenoid-migration";
import {solenoidConfigurations, matchesSolenoidFilter} from "../../data/products/detail/solenoid-configurations";
import {isSolenoidSearchHref} from "../../data/search/solenoid-search";

async function main() {
  const rules = fs.readFileSync("public/_redirects", "utf8");
  const routes = JSON.parse(fs.readFileSync("public/_routes.json", "utf8"));
  assert(!routes.include.includes("/*"), "Do not route every static page through Functions");
  assert(routes.include.includes("/products/valves/solenoid-valves/*"), "Legacy solenoid redirects need the deployed Function fallback");
  for (const r of getSolenoidRedirectEntries()) {
    assert(rules.includes(`${r.source} ${r.destination} 301`));
    assert(rules.includes(`${r.source.slice(0,-1)} ${r.destination} 301`));
    if (process.argv.includes("--http")) {
      const response = await fetch(`http://localhost:3000${r.source}`, {redirect: "manual"});
      assert.equal(response.status,301,r.source);
      assert.equal(response.headers.get("location"),r.destination);
      assert.equal((await fetch(`http://localhost:3000${r.destination}`)).status,200);
    }
  }
  for (const filter of ["2-way", "3-way", "base", "barbed", "threaded"]) {
    assert.equal(solenoidConfigurations.filter(c => matchesSolenoidFilter(c.slug,filter)).length,filter === "2-way" ? 6 : 3);
  }
  const assetNames = solenoidConfigurations.flatMap(c => [...c.assets]);
  assert.equal(new Set(assetNames).size,7);
  for (const c of solenoidConfigurations) {
    if (c.connection === "barbed" && c.key === "two") assert.equal(c.assets.length,0);
    else assert.equal(c.assets.length,1);
    for (const asset of c.assets) {
      const file = path.join("public/models/valves/6010",`${asset}.json`);
      const bytes = fs.readFileSync(file);
      const model = JSON.parse(bytes.toString());
      assert(model.exteriorOnly && model.dimensions.housing && model.meshes.length);
      assert(!model.drawing && (!model.file || model.file === path.basename(model.file)), "No embedded drawing or local source path in model response");
      assert(model.name.toLowerCase().includes(asset.endsWith("3") ? "-3" : asset.endsWith("2nc") ? "-2nc" : "-2no"));
      assert(model.dimensions.size.every((n: number) => n > 0 && n < 80));
      assert(fs.existsSync(file.replace(/json$/, "png")), "Use supplied original drawings");
      assert(!fs.existsSync(file.replace(/json$/, "svg")), "Generated substitute drawings must stay removed");
      console.log(`${asset}: ${(bytes.length/1024).toFixed(0)} KB JSON / ${(gzipSync(bytes).length/1024).toFixed(0)} KB gzip`);
    }
  }
  for (const locale of ["zh-CN","en","es","fr","ko","ru"]) {
    const items = JSON.parse(fs.readFileSync(`public/search-data/global-search-index.${locale}.v3.json`, "utf8"));
    const solenoid = items.filter((i: {m:string;h:string}) => i.m === "products" && isSolenoidSearchHref(i.h));
    assert.equal(solenoid.length,10);
    for (const c of solenoidConfigurations) assert(solenoid.some((i: {h:string}) => i.h.endsWith(`/${c.slug}/`)));
    assert(!solenoid.some((i: {h:string}) => /\/(2-way|3-way|sv10-p|sv10-b16|sv10-threaded)\/$/.test(i.h)));
  }
  console.log("PASS: seven assets, nine configurations, six-locale search, 60 Cloudflare rules and 30 local 301 redirects" + (process.argv.includes("--http") ? " (HTTP verified)" : ""));
}
main().catch(e=>{console.error(e);process.exitCode=1;});
