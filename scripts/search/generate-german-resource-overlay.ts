import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { getGermanResourceSearchOverlay } from "../../services/search/getGermanResourceSearchOverlay";

const outputDirectory = join(process.cwd(), "public", "search-data");
mkdirSync(outputDirectory, { recursive: true });

const entries = getGermanResourceSearchOverlay();
if (!entries.length) throw new Error("German resource search overlay is empty.");

writeFileSync(join(outputDirectory, "global-search-resource-overlay.de.v3.json"), JSON.stringify(entries));
console.log(`German resource search overlay: ${entries.length} entries.`);
