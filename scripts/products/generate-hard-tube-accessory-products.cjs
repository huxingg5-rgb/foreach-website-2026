const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "../..");
const source = require(path.join(root, "data/products/generated/fittings/hard-tube-fittings/detail/index.json"));
const series = new Set(["standard-flat-bottom-fitting", "compact-flat-bottom-fitting", "standard-ferrule-fitting", "compact-ferrule-fitting"]);
const products = source.filter(product => series.has(product.seriesId)).map(product => {
  const spec = label => product.specs.find(row => row.label === label)?.value || "";
  return { productCode: product.productCode, model: product.model, slug: product.slug, productName: product.seriesName, thread: spec("螺纹规格"), material: spec("主体材质"), color: spec("颜色") };
});
fs.writeFileSync(path.join(root, "data/products/configurator/hard-tube-accessory-products.generated.json"), JSON.stringify(products, null, 2) + "\n");
console.log(`Generated ${products.length} hard-tube accessory configurator products.`);
