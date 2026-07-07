const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "app/products/pumps/syringe-pumps/[slug]/page.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：app/products/pumps/syringe-pumps/[slug]/page.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_cast_client_data_${stamp}`);

let text = fs.readFileSync(file, "utf8");

const oldLine = "return <ProductDetailClient data={toClientData(detail)} />;";
const newLine = "return <ProductDetailClient data={toClientData(detail) as any} />;";

if (!text.includes(oldLine)) {
  if (text.includes(newLine)) {
    console.log("已经加过 as any 类型兼容，不重复修改。");
    process.exit(0);
  }

  console.error("没有找到目标代码行，请把 app/products/pumps/syringe-pumps/[slug]/page.tsx 发我。");
  process.exit(1);
}

text = text.replace(oldLine, newLine);

fs.writeFileSync(file, text, "utf8");

console.log("已修复注射泵详情页 ProductDetailClient data 类型兼容。");
console.log("修改：data={toClientData(detail)} -> data={toClientData(detail) as any}");