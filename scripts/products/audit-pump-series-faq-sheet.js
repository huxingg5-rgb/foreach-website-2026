const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const file = path.join(
  process.cwd(),
  "data-source/product-center/pumps/FOREACH_泵系列_产品数据源.xlsx"
);

const outputPath = path.join(
  process.cwd(),
  "data/products/generated/pumps/pump-series-faq-sheet-audit.md"
);

if (!fs.existsSync(file)) {
  throw new Error("未找到泵系列数据源：" + file);
}

const wb = XLSX.readFile(file);
const sheet = wb.Sheets["12_FAQ"];

if (!sheet) {
  throw new Error("未找到 12_FAQ sheet");
}

const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

function text(value) {
  return String(value || "").trim();
}

let md = "";

md += "# 12_FAQ 表格内容审查\n\n";
md += `生成时间：${new Date().toISOString()}\n\n`;
md += `FAQ 行数：${rows.length}\n\n`;

md += "| 行号 | faqId | scope | productId | pumpTypeSlug | questionZh | answerZh |\n";
md += "|---|---|---|---|---|---|---|\n";

rows.forEach((row, index) => {
  md += `| ${index + 2} | ${text(row.faqId)} | ${text(row.scope)} | ${text(row.productId)} | ${text(row.pumpTypeSlug)} | ${text(row.questionZh)} | ${text(row.answerZh)} |\n`;
});

fs.writeFileSync(outputPath, md, "utf8");

console.log("✅ 已导出 12_FAQ 审查文件：");
console.log(outputPath);