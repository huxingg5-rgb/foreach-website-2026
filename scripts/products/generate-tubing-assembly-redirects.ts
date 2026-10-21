import fs from "node:fs";
import { getTubingAssemblyRedirectEntries } from "../../data/products/tubing-assemblies/redirects";

const file = "public/_redirects";
const original = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
const start = "# BEGIN RETIRED TUBING ASSEMBLY REDIRECTS";
const end = "# END RETIRED TUBING ASSEMBLY REDIRECTS";
const block = `${start}\n${getTubingAssemblyRedirectEntries().map(rule => `${rule.source} ${rule.destination} 301`).join("\n")}\n${end}\n`;
// Keep existing generated blocks in their original order: their checks depend on it.
const remaining = original.replace(new RegExp(`${start}[\\s\\S]*?${end}\\n?`), "");
const insertion = "# BEGIN VALVELESS PUMP DETAIL REDIRECTS";
if (!remaining.includes(insertion)) throw new Error("Missing redirect insertion marker");
const expected = remaining.replace(insertion, block + insertion);
if (process.argv.includes("--check")) {
  if (original !== expected) throw new Error("Stale tubing redirects; run products:build-tubing-redirects");
} else fs.writeFileSync(file, expected, "utf8");
console.log(`Tubing assembly redirects: ${getTubingAssemblyRedirectEntries().length} rules verified.`);
