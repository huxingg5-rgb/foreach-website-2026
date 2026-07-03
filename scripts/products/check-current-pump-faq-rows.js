const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const file = path.join(
  process.cwd(),
  "data-source/product-center/pumps/FOREACH_泵系列_产品数据源.xlsx"
);

if (!fs.existsSync(file)) {
  throw new Error("未找到：" + file);
}

const wb = XLSX.readFile(file);
const sheet = wb.Sheets["12_FAQ"];

if (!sheet) {
  console.log("❌ 当前目标数据源没有 12_FAQ sheet");
  process.exit(0);
}

const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

console.log("当前 12_FAQ 行数：" + rows.length);

rows.slice(0, 10).forEach((row, index) => {
  console.log(
    `${index + 2}. ${row.faqId || ""} | ${row.scope || ""} | ${row.productId || ""} | ${row.questionZh || ""}`
  );
});