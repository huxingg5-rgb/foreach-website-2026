const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_get_taxonomy_label_optional_product_type_id_${stamp}`);

let text = fs.readFileSync(file, "utf8");

/*
  修复原因：
  统一 ProductSelectionProduct 类型后，productTypeId 是可选字段。
  getTaxonomyLabel(locale, xxx) 的第二个参数要求 string。
  所以把 product.productTypeId 转成安全字符串。
*/

let changed = 0;

const replacements = [
  [
    "getTaxonomyLabel(locale, product.productTypeId)",
    'getTaxonomyLabel(locale, String(product.productTypeId || ""))'
  ],
  [
    "getTaxonomyLabel(locale, product.categoryId)",
    'getTaxonomyLabel(locale, String(product.categoryId || ""))'
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
  console.log("没有找到 getTaxonomyLabel(locale, product.productTypeId/categoryId) 的直接写法。");
  console.log("如果 build 仍报同类错误，把新的报错发我。");
} else {
  fs.writeFileSync(file, text, "utf8");
  console.log("");
  console.log("完成：getTaxonomyLabel 参数类型修复。");
  console.log("修改类型数量：" + changed);
}