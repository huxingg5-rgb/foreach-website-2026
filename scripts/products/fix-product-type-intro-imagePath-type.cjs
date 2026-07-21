const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "data/products/selection/product-type-intro.ts");

if (!fs.existsSync(file)) {
  console.error("找不到文件：data/products/selection/product-type-intro.ts");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_add_imagePath_type_${stamp}`);

let text = fs.readFileSync(file, "utf8");

const typeName = "ProductTypeIntroContent";

const typeStart =
  text.indexOf(`type ${typeName}`) >= 0
    ? text.indexOf(`type ${typeName}`)
    : text.indexOf(`interface ${typeName}`);

if (typeStart < 0) {
  console.error("没有找到 ProductTypeIntroContent 类型定义，请把 product-type-intro.ts 发我。");
  process.exit(1);
}

const typeBlockEnd = text.indexOf("}", typeStart);

if (typeBlockEnd < 0) {
  console.error("没有找到 ProductTypeIntroContent 类型结束位置。");
  process.exit(1);
}

const typeBlock = text.slice(typeStart, typeBlockEnd);

if (/\bimagePath\??\s*:/.test(typeBlock)) {
  console.log("ProductTypeIntroContent 已经包含 imagePath，不需要修改。");
  process.exit(0);
}

const openBraceIndex = text.indexOf("{", typeStart);

if (openBraceIndex < 0 || openBraceIndex > typeBlockEnd) {
  console.error("没有找到 ProductTypeIntroContent 的 {。");
  process.exit(1);
}

text =
  text.slice(0, openBraceIndex + 1) +
  "\n  imagePath?: string;" +
  text.slice(openBraceIndex + 1);

fs.writeFileSync(file, text, "utf8");

console.log("已给 ProductTypeIntroContent 补充类型字段：");
console.log("  imagePath?: string;");