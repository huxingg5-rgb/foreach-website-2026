import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { getValvelessPumpSeoTitle } from "../../data/products/detail/valveless-pump-seo";
import { valvelessPumpSelectionProducts } from "../../data/products/selection/valveless-pump-selection.generated";

const locales = ["zh", "en", "es", "fr", "ko", "ru"];
const snapshotPath = "E:/0_TemporaryAiKnowledgeBase/Output/Downloads/valveless-title-before-20260916.json";
const capture = process.argv.includes("--capture");
const compare = process.argv.includes("--compare");
const origin = process.env.VALVELESS_CHECK_ORIGIN || "http://127.0.0.1:3000";
type Snapshot = { title: string; main: string; meta: string[]; links: string[]; schema: unknown[] };
const baseline: Record<string, Snapshot> = compare ? JSON.parse(readFileSync(snapshotPath, "utf8")) : {};
const current: Record<string, Snapshot> = {};

assert.equal(getValvelessPumpSeoTitle("rpl-p4", "zh"), "RPL-P4 无阀计量泵｜FOREACH");
assert.equal(getValvelessPumpSeoTitle("drpl-0119", "en"), "DRPL-0119 Dual-Head Valveless Metering Pump | FOREACH");
assert.equal(getValvelessPumpSeoTitle("rpl-p4", "zh-CN"), getValvelessPumpSeoTitle("rpl-p4", "zh"));
assert.equal(getValvelessPumpSeoTitle("not-a-model", "en"), undefined);
assert.equal(getValvelessPumpSeoTitle("rpl-p4", "de"), undefined);
for (const locale of locales) {
  for (const product of valvelessPumpSelectionProducts) {
    const title = getValvelessPumpSeoTitle(product.detailSlug!, locale)!;
    assert.ok(title.startsWith(product.cardTitle.zh!));
    assert.equal(title.match(/FOREACH/g)?.length, 1);
    assert.doesNotMatch(title, /μL|rev|1:9|1:19|PVDF|Al₂O₃|ZrO₂|Foreach Technology/);
  }
}

async function check() {
  for (const locale of locales) {
    const prefix = locale === "zh" ? "" : `/${locale}`;
    const category = `${prefix}/products/pumps/valveless-metering-pump/`;
    const routes = [category, ...valvelessPumpSelectionProducts.map(item => `${prefix}/products/pumps/valveless-pumps/${item.detailSlug}/`)];
    for (const route of routes) {
      const response = await fetch(origin + route, { headers: { "user-agent": "Bingbot" } });
      assert.equal(response.status, 200, route);
      const html = await response.text();
      const title = html.match(/<title>(.*?)<\/title>/)?.[1] || "";
      const main = (html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || "")
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
      const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map(m => m[0]);
      current[route] = {
        title, main,
        meta: meta.filter(m => !/(?:property="og:title"|name="twitter:title")/.test(m)),
        links: [...html.matchAll(/<link\b[^>]*>/g)].map(m => m[0]).filter(m => /rel="(?:canonical|alternate)"/.test(m)),
        schema: [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1])),
      };
      if (!capture && route !== category) {
        const slug = route.split("/").filter(Boolean).at(-1)!;
        const expected = getValvelessPumpSeoTitle(slug, locale)!;
        assert.equal(title, expected, route);
        assert.equal([...html.matchAll(/<title>/g)].length, 1, route);
        assert.ok(meta.includes(`<meta property="og:title" content="${expected}"/>`), `${route} OG`);
        assert.ok(meta.includes(`<meta name="twitter:title" content="${expected}"/>`), `${route} Twitter`);
      }
      if (compare) {
        assert.ok(baseline[route], `Baseline for ${route}`);
        const { title: oldTitle, ...oldRest } = baseline[route];
        const { title: newTitle, ...newRest } = current[route];
        assert.deepEqual(newRest, oldRest, `No body, description, robots, language links or schema changes: ${route}`);
        if (route === category) assert.equal(newTitle, oldTitle, `Unchanged category title: ${locale}`);
      }
    }
    console.log(`${capture ? "CAPTURE" : "PASS"}: ${locale}: 5 details and category control`);
  }
  if (capture) writeFileSync(snapshotPath, JSON.stringify(current, null, 2));
  else console.log("PASS: 30 concise localized titles, matching social titles; 6 category controls.");
}

if (process.argv.some(arg => ["--http", "--capture", "--compare"].includes(arg))) check().catch(error => { console.error(error); process.exitCode = 1; });
