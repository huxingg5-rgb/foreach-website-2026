const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "data/products/selection/card-copy/plunger-pump-card-copy.ts");

if (!fs.existsSync(file)) {
  console.error("找不到文件：data/products/selection/card-copy/plunger-pump-card-copy.ts");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_extra_product_fields_type_${stamp}`);

let text = fs.readFileSync(file, "utf8");

const replacements = [
  ["product.model", "(product as any).model"],
  ["product.title", "(product as any).title"],
  ["product.productName", "(product as any).productName"],
  ["product.name", "(product as any).name"],
  ["product.subtitle", "(product as any).subtitle"],
  ["product.description", "(product as any).description"],
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
console.log("完成：plunger-pump-card-copy.ts 产品额外字段类型兼容修复。");
console.log("替换类型数量：" + changed);