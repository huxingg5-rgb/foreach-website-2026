const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

/*
  备份原文件。
  这次只修 TypeScript 类型问题，不改页面样式，不改产品数据。
*/
const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_detailHref_href_type_${stamp}`);

let text = fs.readFileSync(file, "utf8");

let changed = 0;

/*
  修复原因：
  ProductSelectionProduct 类型里没有明确声明 detailHref / href。
  但部分生成数据实际带有 detailHref / href 字段。
  因此在选型页适配层用 (product as any) 读取，避免 TypeScript build 失败。
*/
function replaceOnce(oldText, newText) {
  if (text.includes(oldText)) {
    text = text.replaceAll(oldText, newText);
    changed++;
    console.log("已替换：" + oldText + " -> " + newText);
  }
}

replaceOnce("product.detailHref", "(product as any).detailHref");
replaceOnce("product.href", "(product as any).href");

fs.writeFileSync(file, text, "utf8");

console.log("");
console.log("完成：ProductSelectionClient.tsx detailHref / href 类型兼容修复。");
console.log("替换类型数量：" + changed);