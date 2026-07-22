const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "data/products/selection/filter-rules/product-filter-rules.shared.ts");

if (!fs.existsSync(file)) {
  console.error("找不到文件：data/products/selection/filter-rules/product-filter-rules.shared.ts");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_selected_values_has_string_${stamp}`);

let text = fs.readFileSync(file, "utf8");

/*
  修复原因：
  productValue 来源于 filters，类型可能是 string | number | boolean。
  selectedValues 是 Set<string>，has(...) 只能接收 string。
  所以统一转成 String(productValue)。
*/

let changed = 0;

const replacements = [
  [
    "return Boolean(productValue && selectedValues.has(productValue));",
    "return Boolean(productValue && selectedValues.has(String(productValue)));"
  ],
  [
    "selectedValues.has(productValue)",
    "selectedValues.has(String(productValue))"
  ],
];

for (const [from, to] of replacements) {
  if (text.includes(from)) {
    text = text.replaceAll(from, to);
    changed++;
    console.log(`已替换：${from}`);
    console.log(`改为：${to}`);
  }
}

if (changed === 0) {
  console.log("没有找到 selectedValues.has(productValue)。");
  console.log("请把 product-filter-rules.shared.ts 附近 108-116 行发我。");
  process.exit(1);
}

fs.writeFileSync(file, text, "utf8");

console.log("");
console.log("完成：product-filter-rules.shared.ts selectedValues.has 参数类型修复。");
console.log("修改类型数量：" + changed);