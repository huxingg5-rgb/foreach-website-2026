const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const searchDirs = [
  path.join(process.cwd(), "data-source/product-center/pumps"),
  process.cwd(),
];

const outputPath = path.join(
  process.cwd(),
  "data/products/generated/pumps/pump-xlsx-faq-source-scan.md"
);

function text(value) {
  return String(value || "").trim();
}

function getXlsxFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => {
      const lower = name.toLowerCase();

      return (
        lower.endsWith(".xlsx") &&
        !lower.startsWith("~$")
      );
    })
    .map((name) => path.join(dir, name));
}

const allFiles = [];

for (const dir of searchDirs) {
  for (const file of getXlsxFiles(dir)) {
    if (!allFiles.includes(file)) {
      allFiles.push(file);
    }
  }
}

let md = "";

md += "# 泵系列 xlsx FAQ 来源扫描\n\n";
md += `生成时间：${new Date().toISOString()}\n\n`;

for (const file of allFiles) {
  let wb;

  try {
    wb = XLSX.readFile(file);
  } catch {
    continue;
  }

  md += `## ${file}\n\n`;

  for (const sheetName of wb.SheetNames) {
    const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
      defval: "",
      header: 1,
    });

    const header = rows[0] || [];
    const headerText = header.map(text).join(" | ");

    const looksLikeFaq =
      sheetName.toLowerCase().includes("faq") ||
      headerText.toLowerCase().includes("question") ||
      headerText.includes("问题") ||
      headerText.toLowerCase().includes("answer") ||
      headerText.includes("回答");

    if (!looksLikeFaq) {
      continue;
    }

    md += `### Sheet：${sheetName}\n\n`;
    md += `- 行数：${Math.max(rows.length - 1, 0)}\n`;
    md += `- 表头：${headerText}\n\n`;

    const previewRows = rows.slice(1, 6);

    if (previewRows.length > 0) {
      md += "| 预览行 | 内容 |\n";
      md += "|---|---|\n";

      previewRows.forEach((row, index) => {
        md += `| ${index + 2} | ${row.map(text).join(" | ")} |\n`;
      });

      md += "\n";
    }
  }

  md += "\n";
}

fs.writeFileSync(outputPath, md, "utf8");

console.log("✅ 已生成 FAQ 来源扫描文件：");
console.log(outputPath);