import fs from "node:fs";
import assert from "node:assert/strict";
import { getPipettingRedirectEntries } from "../../data/products/selection/pipetting-pump-routes";

const file = "public/_redirects";
const before = fs.readFileSync(file, "utf8");
const lines = getPipettingRedirectEntries().flatMap(row => [
  `${row.source} ${row.destination} 301`, `${row.source}/ ${row.destination} 301`,
]);
assert.equal(new Set(lines.map(line => line.split(" ")[0])).size, lines.length);
const retained = before.split(/\r?\n/).filter(line =>
  !/^\/(?:en\/|es\/|fr\/|ko\/|ru\/)?products\/pumps\/pipetting-pumps\/\S*\s+/.test(line)
  && line !== "# SMTP2 and SMTP4 canonical product routes",
).join("\n").trimEnd();
const after = `${retained}\n\n# SMTP2 and SMTP4 canonical product routes\n${lines.join("\n")}\n`;
if (process.argv.includes("--check")) assert.equal(before.replace(/\r\n/g, "\n"), after, "Pipetting redirects are stale");
else fs.writeFileSync(file, after);
console.log(`PASS: ${lines.length} pipetting 301 redirects; old SMTP2 family detail goes directly to the series page.`);
