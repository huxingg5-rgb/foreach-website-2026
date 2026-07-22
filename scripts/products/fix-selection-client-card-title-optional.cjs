const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_card_title_optional_${stamp}`);

let text = fs.readFileSync(file, "utf8");

const replacements = [
  ["product.cardTitle.zh", "((product.cardTitle as any)?.zh || \"\")"],
  ["product.cardTitle.en", "((product.cardTitle as any)?.en || \"\")"],
  ["product.cardSubtitle.zh", "((product.cardSubtitle as any)?.zh || \"\")"],
  ["product.cardSubtitle.en", "((product.cardSubtitle as any)?.en || \"\")"],
  ["product.cardDescription.zh", "((product.cardDescription as any)?.zh || \"\")"],
  ["product.cardDescription.en", "((product.cardDescription as any)?.en || \"\")"],
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
  console.error("没有找到 cardTitle / cardSubtitle 的直接读取代码。");
  console.error("请把 ProductSelectionClient.tsx 附近 1308-1320 行发我。");
  process.exit(1);
}

fs.writeFileSync(file, text, "utf8");

console.log("");
console.log("完成：cardTitle / cardSubtitle 可选安全读取修复。");
console.log("替换数量：" + changed);