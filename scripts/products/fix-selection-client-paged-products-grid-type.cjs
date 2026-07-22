const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_paged_products_grid_type_${stamp}`);

let text = fs.readFileSync(file, "utf8");

const oldText = "products={pagedProducts}";
const newText = "products={pagedProducts as any}";

if (text.includes(oldText)) {
  text = text.replaceAll(oldText, newText);
  console.log("已替换：");
  console.log(oldText);
  console.log("改为：");
  console.log(newText);
} else if (text.includes(newText)) {
  console.log("这一处已经修过了，不重复修改。");
} else {
  console.error("没有找到 products={pagedProducts}。");
  console.error("请把 ProductSelectionClient.tsx 附近 1915-1925 行发我。");
  process.exit(1);
}

fs.writeFileSync(file, text, "utf8");

console.log("");
console.log("完成：ProductCardGrid products 类型兼容修复。");