import fs from "node:fs";
import path from "node:path";
import { getPistonPumpRedirectEntries } from "../../lib/seo/piston-pump-migration";

const file = path.join(process.cwd(), "public/_redirects");
const original = fs.readFileSync(file, "utf8");
const markerStart = "# BEGIN PISTON PUMP REDIRECTS";
const markerEnd = "# END PISTON PUMP REDIRECTS";
const remaining = original.replace(new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}\\r?\\n?`), "")
  .split(/\r?\n/).filter(line => !/^\/(?:en\/|es\/|fr\/|ko\/|ru\/)?products\/pumps\/(?:plunger-pumps(?:[ /]|$)|piston-pump\/(?:ea-standard|sm-miniature|sm-micro|tm-ultra)[^ ]*pumps\/?\s)/.test(line));
const rules = getPistonPumpRedirectEntries().flatMap(rule => rule.source.endsWith(":path+")
  ? [`${rule.source.replace(":path+", "*")} ${rule.destination.replace(":path+/", ":splat")} 301`]
  : [rule.source, `${rule.source}/`].map(source => `${source} ${rule.destination} 301`));
const value = [markerStart, ...rules, markerEnd, ...remaining].join("\n").replace(/\n+$/, "\n");
if (process.argv.includes("--check")) {
  if (original.replace(/\r\n/g, "\n") !== value) throw new Error("Stale piston pump redirects; run products:build-piston-redirects");
} else fs.writeFileSync(file, value, "utf8");
console.log(JSON.stringify({check:process.argv.includes("--check"),pistonRedirectRules:rules.length,file:"public/_redirects"}));
