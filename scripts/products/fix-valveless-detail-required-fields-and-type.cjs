const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "app/products/pumps/valveless-pumps/[slug]/page.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：app/products/pumps/valveless-pumps/[slug]/page.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_required_fields_and_type_cast_${stamp}`);

let text = fs.readFileSync(file, "utf8");

/*
  1. 补齐 ProductDetailClient 必需字段：
     showConfigurator / specSeriesKey
*/
const functionIndex = text.indexOf("function toClientData");

if (functionIndex < 0) {
  console.error("没有找到 function toClientData，请把这个文件发我。");
  process.exit(1);
}

const returnIndex = text.indexOf("return {", functionIndex);

if (returnIndex < 0) {
  console.error("没有找到 toClientData 里的 return {，请把这个文件发我。");
  process.exit(1);
}

const blockEndIndex = text.indexOf("};", returnIndex);

if (blockEndIndex < 0) {
  console.error("没有找到 toClientData 返回对象结束位置，请把这个文件发我。");
  process.exit(1);
}

const returnBlock = text.slice(returnIndex, blockEndIndex);

const additions = [];

if (!/\bshowConfigurator\s*:/.test(returnBlock)) {
  additions.push('    showConfigurator: Boolean((detail as any).showConfigurator ?? false),');
}

if (!/\bspecSeriesKey\s*:/.test(returnBlock)) {
  additions.push('    specSeriesKey: (detail as any).specSeriesKey || "valveless-pumps",');
}

if (additions.length > 0) {
  const insertIndex = returnIndex + "return {".length;
  text =
    text.slice(0, insertIndex) +
    "\n" +
    additions.join("\n") +
    text.slice(insertIndex);

  console.log("已补齐字段：");
  console.log(additions.join("\n"));
} else {
  console.log("showConfigurator / specSeriesKey 已存在，不重复添加。");
}

/*
  2. 修复 ProductDetailClient data 类型兼容。
*/
const oldLine = "return <ProductDetailClient data={toClientData(detail)} />;";
const newLine = "return <ProductDetailClient data={toClientData(detail) as any} />;";

if (text.includes(oldLine)) {
  text = text.replace(oldLine, newLine);
  console.log("已添加 data={toClientData(detail) as any} 类型兼容。");
} else if (text.includes(newLine)) {
  console.log("data as any 已存在，不重复修改。");
} else {
  console.warn("没有找到标准 ProductDetailClient 返回行，字段已补齐，但 data 类型可能还需要手动检查。");
}

fs.writeFileSync(file, text, "utf8");

console.log("完成：无阀泵详情页字段与类型兼容修复。");