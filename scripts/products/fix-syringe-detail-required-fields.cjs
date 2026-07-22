const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "app/products/pumps/syringe-pumps/[slug]/page.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：app/products/pumps/syringe-pumps/[slug]/page.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_add_required_detail_fields_${stamp}`);

let text = fs.readFileSync(file, "utf8");

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

const insertIndex = returnIndex + "return {".length;

const beforeReturnBlock = text.slice(functionIndex, text.indexOf("};", returnIndex) + 2);

const additions = [];

if (!/\badvantages\s*:/.test(beforeReturnBlock)) {
  additions.push('    advantages: (detail as any).advantages || [],');
}

if (!/\bshowConfigurator\s*:/.test(beforeReturnBlock)) {
  additions.push('    showConfigurator: Boolean((detail as any).showConfigurator ?? false),');
}

if (!/\bspecSeriesKey\s*:/.test(beforeReturnBlock)) {
  additions.push('    specSeriesKey: (detail as any).specSeriesKey || "syringe-pumps",');
}

if (additions.length === 0) {
  console.log("toClientData 里已经有 advantages / showConfigurator / specSeriesKey，不需要修改。");
  process.exit(0);
}

text =
  text.slice(0, insertIndex) +
  "\n" +
  additions.join("\n") +
  text.slice(insertIndex);

fs.writeFileSync(file, text, "utf8");

console.log("已补齐注射泵详情页 ProductDetailClient 必需字段：");
console.log(additions.join("\n"));