const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_product_type_id_includes_optional_${stamp}`);

let text = fs.readFileSync(file, "utf8");

/*
  修复原因：
  ProductSelectionProduct 统一类型后，productTypeId 是可选字段。
  Array.includes(...) 需要 string 参数，不能直接传 string | undefined。
  只修 .includes(product.productTypeId) 这种判断，不改产品数据、不改页面样式。
*/

let changed = 0;

const before = text;

text = text.replace(
  /\.includes\(\s*product\.productTypeId\s*,?\s*\)/g,
  '.includes(String(product.productTypeId || ""))'
);

if (text !== before) {
  changed++;
}

fs.writeFileSync(file, text, "utf8");

console.log("完成：ProductSelectionClient.tsx productTypeId includes 参数类型修复。");
console.log("修改类型数量：" + changed);

if (changed === 0) {
  console.log("没有找到 .includes(product.productTypeId) 形式。");
  console.log("如果 build 仍报 productTypeId，请把最新报错发我。");
}