const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_product_filters_optional_${stamp}`);

let text = fs.readFileSync(file, "utf8");

let changed = 0;

const oldText = "const value = product.filters[filterKey];";
const newText = "const value = (product.filters || {})[filterKey];";

if (text.includes(oldText)) {
  text = text.replaceAll(oldText, newText);
  changed++;
  console.log(`已替换：${oldText}`);
  console.log(`改为：${newText}`);
} else if (text.includes(newText)) {
  console.log("这一处已经修过了，不重复修改。");
} else {
  console.error("没有找到目标代码：const value = product.filters[filterKey];");
  console.error("请把 ProductSelectionClient.tsx 附近 1288-1300 行发我。");
  process.exit(1);
}

fs.writeFileSync(file, text, "utf8");

console.log("");
console.log("完成：product.filters 可选安全读取修复。");
console.log("修改数量：" + changed);