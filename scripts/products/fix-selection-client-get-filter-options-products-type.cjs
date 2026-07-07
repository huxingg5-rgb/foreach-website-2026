const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_get_filter_options_products_type_${stamp}`);

let text = fs.readFileSync(file, "utf8");

let changed = 0;

/*
  修复位置：
  getFilterOptions(
    currentTypeProducts,
    ...
  )

  TypeScript 认为 currentTypeProducts 和 getFilterOptions 要求的 ProductSelectionProduct[]
  不是同一个类型来源，所以这里做适配层类型兼容。
*/
const patterns = [
  {
    from: /getFilterOptions\(\s*\r?\n\s*currentTypeProducts\s*,/g,
    to: 'getFilterOptions(\n        currentTypeProducts as any,\n',
  },
  {
    from: /getFilterOptions\(\s*currentTypeProducts\s*,/g,
    to: 'getFilterOptions(currentTypeProducts as any,',
  },
];

for (const item of patterns) {
  const before = text;
  text = text.replace(item.from, item.to);
  if (text !== before) changed++;
}

if (changed === 0) {
  console.error("没有找到 getFilterOptions(currentTypeProducts, ...) 调用，请把 ProductSelectionClient.tsx 附近 1240-1270 行发我。");
  process.exit(1);
}

fs.writeFileSync(file, text, "utf8");

console.log("已修复 getFilterOptions 的 currentTypeProducts 类型兼容。");
console.log("修改数量：" + changed);