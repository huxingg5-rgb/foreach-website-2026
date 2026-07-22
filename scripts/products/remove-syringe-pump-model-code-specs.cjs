const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function backup(rel, suffix) {
  const full = p(rel);
  if (!fs.existsSync(full)) return;

  const bak = full + suffix;
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(full, bak);
    console.log("已备份:", rel + suffix);
  }
}

function removeRows(rows) {
  if (!Array.isArray(rows)) return rows;

  return rows.filter((row) => {
    const label = String(row?.label || "").trim();
    return label !== "可选型号" && label !== "商品编码";
  });
}

const jsonRel = "data/products/generated/pumps/syringe-pumps/detail/index.json";

if (!fs.existsSync(p(jsonRel))) {
  console.error("未找到:", jsonRel);
  process.exit(1);
}

backup(jsonRel, ".bak.remove-model-code");

const details = JSON.parse(fs.readFileSync(p(jsonRel), "utf8"));

for (const item of details) {
  item.specs = removeRows(item.specs);
  item.specifications = removeRows(item.specifications);
  item.optionalConfigurations = removeRows(item.optionalConfigurations);
}

fs.writeFileSync(p(jsonRel), JSON.stringify(details, null, 2), "utf8");

console.log("已去掉注射泵详情页规格表中的：可选型号 / 商品编码");
console.log("请重启 dev 后刷新详情页。");