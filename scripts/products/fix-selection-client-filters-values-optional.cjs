const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_filters_values_optional_${stamp}`);

let text = fs.readFileSync(file, "utf8");

const replacements = [
  [
    "...Object.values(product.filters),",
    "...Object.values(product.filters || {}),"
  ],
  [
    "product.searchKeywords.zh",
    "((product.searchKeywords as any)?.zh || \"\")"
  ],
  [
    "product.searchKeywords.en",
    "((product.searchKeywords as any)?.en || \"\")"
  ],
];

let changed = 0;

for (const [from, to] of replacements) {
  if (text.includes(from)) {
    text = text.replaceAll(from, to);
    changed++;
    console.log(`已替换：${from} -> ${to}`);
  }
}

if (changed === 0) {
  console.error("没有找到 Object.values(product.filters) 或 searchKeywords 直接读取代码。");
  console.error("请把 ProductSelectionClient.tsx 附近 1312-1324 行发我。");
  process.exit(1);
}

fs.writeFileSync(file, text, "utf8");

console.log("");
console.log("完成：filters / searchKeywords 可选安全读取修复。");
console.log("替换数量：" + changed);