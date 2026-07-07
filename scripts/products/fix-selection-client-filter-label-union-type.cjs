const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_filter_label_union_type_${stamp}`);

let text = fs.readFileSync(file, "utf8");

const replacements = [
  ["item.productTypeId", "(item as any).productTypeId"],
  ["item.filterKey", "(item as any).filterKey"],
  ["label.productTypeId", "(label as any).productTypeId"],
  ["label.filterKey", "(label as any).filterKey"],
];

let changed = 0;

for (const [from, to] of replacements) {
  if (text.includes(from)) {
    text = text.replaceAll(from, to);
    changed++;
    console.log(`已替换：${from} -> ${to}`);
  }
}

fs.writeFileSync(file, text, "utf8");

console.log("");
console.log("完成：ProductSelectionClient.tsx 筛选标签 union 类型兼容修复。");
console.log("替换类型数量：" + changed);