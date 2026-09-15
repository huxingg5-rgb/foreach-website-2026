import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const source = JSON.parse(fs.readFileSync(path.join(root, "data/products/generated/fittings/hard-tube-fittings/detail/index.json"), "utf8"));
const fields = ["productId", "model", "slug", "displayModel", "foreachModel", "modelDisplay", "detailHref", "detailSlug"];
const index = source.map(record => Object.fromEntries(fields.filter(key => typeof record[key] === "string").map(key => [key, record[key]])));
const output = path.join(root, "data/products/selection/hard-tube-link-index.generated.json");
const text = JSON.stringify(index) + "\n";
if (process.argv.includes("--check")) {
  if (!fs.existsSync(output) || fs.readFileSync(output, "utf8") !== text) {
    console.error("Hard-tube link index is stale. Run npm run products:build-link-index."); process.exitCode = 1;
  }
} else { fs.writeFileSync(output, text); }
