const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "data/products/selection/filter-rules/product-filter-rules.shared.ts");

if (!fs.existsSync(file)) {
  console.error("找不到文件：data/products/selection/filter-rules/product-filter-rules.shared.ts");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_product_filters_optional_${stamp}`);

let text = fs.readFileSync(file, "utf8");

/*
  修复原因：
  统一 ProductSelectionProduct 类型后，filters 是可选字段。
  原代码 product.filters[filterKey] 在 build 时会报：
  'product.filters' is possibly 'undefined'

  这一步只修安全读取：
  product.filters[filterKey]
  -> (product.filters || {})[filterKey]
*/

let changed = 0;

const replacements = [
  [
    "product.filters[filterKey]",
    "(product.filters || {})[filterKey]"
  ],
  [
    "product.filters?.[filterKey]",
    "(product.filters || {})[filterKey]"
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
  console.log("没有找到 product.filters[filterKey]。");
  console.log("请把 product-filter-rules.shared.ts 附近 20-35 行发我。");
  process.exit(1);
}

fs.writeFileSync(file, text, "utf8");

console.log("");
console.log("完成：product-filter-rules.shared.ts filters 可选安全读取修复。");
console.log("修改类型数量：" + changed);