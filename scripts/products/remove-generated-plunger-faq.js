const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const file = path.join(
  process.cwd(),
  "data-source/product-center/pumps/FOREACH_泵系列_产品数据源.xlsx"
);

if (!fs.existsSync(file)) {
  throw new Error("未找到泵系列数据源：" + file);
}

const wb = XLSX.readFile(file);

function readSheet(name) {
  const sheet = wb.Sheets[name];
  if (!sheet) return [];
  return XLSX.utils.sheet_to_json(sheet, { defval: "" });
}

function writeSheet(name, rows) {
  wb.Sheets[name] = XLSX.utils.json_to_sheet(rows);
}

function text(value) {
  return String(value || "").trim();
}

/* =========================================================
   1. 清空之前脚本污染的 12_FAQ

   这里不再自动生成 FAQ。
   FAQ 后续只从正式 FAQ 表导入。
========================================================= */

let faqRows = readSheet("12_FAQ");

faqRows = faqRows.filter((row) => {
  const questionZh = text(row.questionZh);
  const answerZh = text(row.answerZh);

  const isGeneratedFaq =
    questionZh === "柱塞泵是否可以直接按型号下单？" &&
    answerZh.includes("柱塞泵为定制化产品");

  return !isGeneratedFaq;
});

writeSheet("12_FAQ", faqRows);

/* =========================================================
   2. 修改扩展脚本，禁止后续再自动写 FAQ
========================================================= */

const expandScriptPath = path.join(
  process.cwd(),
  "scripts/products/expand-pump-series-from-existing-plunger-data.js"
);

if (fs.existsSync(expandScriptPath)) {
  let content = fs.readFileSync(expandScriptPath, "utf8");

  content = content.replace(
    /const faqsToUpsert = \[\];/g,
    "const faqsToUpsert = []; // 禁止自动生成 FAQ，FAQ 只从正式表格导入"
  );

  content = content.replace(
    /\s+faqsToUpsert\.push\(\{[\s\S]*?enabled:\s*"yes",\s*\}\);\s*/g,
    "\n  // FAQ 不在扩展脚本中自动生成，统一从正式 FAQ 表导入。\n"
  );

  content = content.replace(
    /faqRows = upsert\(faqRows, \["faqId"\], faqsToUpsert\);/g,
    "// faqRows = upsert(faqRows, [\"faqId\"], faqsToUpsert); // 禁止自动写 FAQ"
  );

  fs.writeFileSync(expandScriptPath, content, "utf8");
}

XLSX.writeFile(wb, file);

console.log("✅ 已清理自动生成 FAQ");
console.log("✅ 已禁止扩展脚本继续自动写 FAQ");
console.log(`当前 12_FAQ 剩余行数：${faqRows.length}`);