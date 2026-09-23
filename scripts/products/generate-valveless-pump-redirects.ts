import fs from "node:fs";
import { getValvelessPumpRedirectEntries } from "../../lib/seo/valveless-pump-migration";

const file = "public/_redirects";
const original = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
const start = "# BEGIN VALVELESS PUMP DETAIL REDIRECTS";
const end = "# END VALVELESS PUMP DETAIL REDIRECTS";
const remaining = original.replace(new RegExp(`${start}[\\s\\S]*?${end}\\n?`), "").replace(/\n+$/, "\n");
const rules = getValvelessPumpRedirectEntries().flatMap(rule =>
  [rule.source, `${rule.source}/`].map(source => `${source} ${rule.destination} 301`));
const value = `${remaining}${start}\n${rules.join("\n")}\n${end}\n`;
if (process.argv.includes("--check")) {
  if (original !== value) throw new Error("Stale valveless redirects; run products:build-valveless-redirects");
} else fs.writeFileSync(file, value, "utf8");
console.log(JSON.stringify({ check: process.argv.includes("--check"), valvelessRedirectRules: rules.length }));
