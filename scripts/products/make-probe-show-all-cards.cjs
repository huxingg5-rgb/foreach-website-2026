const fs = require("fs");
const path = require("path");

const root = process.cwd();

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

const file = path.join(root, "data/products/selection/probe-selection.generated.ts");

if (!fs.existsSync(file)) {
  console.error("找不到文件：data/products/selection/probe-selection.generated.ts");
  process.exit(1);
}

const backup = `${file}.bak_probe_show_all_cards_${stamp()}`;
fs.copyFileSync(file, backup);

let text = fs.readFileSync(file, "utf8");

/*
  目标：
  1. 针系列不再按“采样针 / 穿刺针 / 清洗针 / 搅拌桨”做筛选
  2. 点击顶部“针系列”后，直接显示 4 张卡片
  3. 产品详情路径仍然保留各自 slug
*/

// 左侧筛选标签只保留“针系列”
text = text.replace(
  /export const probeFilterLabels = \[[\s\S]*?\] as const;/,
  `export const probeFilterLabels = [
  "针系列",
] as const;`
);

// 所有针系列卡片统一归到同一个 productTypeId，保证一次显示 4 张卡片
text = text
  .replace(/productTypeId:\s*"采样针"/g, 'productTypeId: "针系列"')
  .replace(/productTypeId:\s*"穿刺针"/g, 'productTypeId: "针系列"')
  .replace(/productTypeId:\s*"清洗针"/g, 'productTypeId: "针系列"')
  .replace(/productTypeId:\s*"搅拌桨"/g, 'productTypeId: "针系列"')

  .replace(/productTypeLabel:\s*"采样针"/g, 'productTypeLabel: "针系列"')
  .replace(/productTypeLabel:\s*"穿刺针"/g, 'productTypeLabel: "针系列"')
  .replace(/productTypeLabel:\s*"清洗针"/g, 'productTypeLabel: "针系列"')
  .replace(/productTypeLabel:\s*"搅拌桨"/g, 'productTypeLabel: "针系列"')

// filter01 也统一为针系列，避免筛选逻辑继续拆分
  .replace(/filter01:\s*"采样针"/g, 'filter01: "针系列"')
  .replace(/filter01:\s*"穿刺针"/g, 'filter01: "针系列"')
  .replace(/filter01:\s*"清洗针"/g, 'filter01: "针系列"')
  .replace(/filter01:\s*"搅拌桨"/g, 'filter01: "针系列"')

// filters.filter01 同步修改
  .replace(/filter01:\s*"采样针"/g, 'filter01: "针系列"')
  .replace(/filter01:\s*"穿刺针"/g, 'filter01: "针系列"')
  .replace(/filter01:\s*"清洗针"/g, 'filter01: "针系列"')
  .replace(/filter01:\s*"搅拌桨"/g, 'filter01: "针系列"');

// 保证产品中心分类仍然是 needles
text = text
  .replace(/categoryId:\s*"[^"]+"/g, 'categoryId: "needles"')
  .replace(/category:\s*"[^"]+"/g, 'category: "needles"')
  .replace(/categoryLabel:\s*"[^"]+"/g, 'categoryLabel: "针系列"');

fs.writeFileSync(file, text, "utf8");

console.log("已修改针系列筛选逻辑：");
console.log("- 左侧不再分采样针 / 穿刺针 / 清洗针 / 搅拌桨");
console.log("- 点击针系列后直接显示 4 张卡片");
console.log("- 详情页路径不变");
console.log("备份文件：" + path.relative(root, backup));