const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();

const targetFile = path.join(
  root,
  "data-source/product-center/pumps/FOREACH_泵系列_产品数据源.xlsx"
);

const searchDirs = [
  path.join(root, "data-source/product-center/pumps"),
  root,
];

const faqSheetNames = ["12_FAQ", "10_FAQ", "09_FAQ"];

function text(value) {
  return String(value || "").trim();
}

function readSheet(wb, name) {
  const sheet = wb.Sheets[name];
  if (!sheet) return [];
  return XLSX.utils.sheet_to_json(sheet, { defval: "" });
}

function writeSheet(wb, name, rows) {
  wb.Sheets[name] = XLSX.utils.json_to_sheet(rows);
}

function normalizeScope(value) {
  const scope = text(value);

  if (!scope) return "pumpType";
  if (scope === "productType") return "pumpType";
  if (scope === "global") return "global";
  if (scope === "series") return "series";
  if (scope === "product") return "product";
  if (scope === "pumpType") return "pumpType";

  return scope;
}

function normalizePumpTypeSlug(row) {
  const raw = text(row.pumpTypeSlug || row.productTypeSlug);

  if (!raw) return "plunger-pumps";
  if (raw === "plunger-pump") return "plunger-pumps";
  if (raw === "plunger-pumps") return "plunger-pumps";

  return raw;
}

function normalizeSeriesSlug(value) {
  const raw = text(value);

  if (!raw) return "";
  if (raw === "ea") return "ea-standard-piston-pumps";
  if (raw === "sm") return "sm-miniature-piston-pumps";
  if (raw === "tm") return "tm-ultra-compact-piston-pumps";

  return raw;
}

function getXlsxFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => {
      const lower = name.toLowerCase();

      return (
        lower.endsWith(".xlsx") &&
        !lower.includes("~$") &&
        !name.includes("FOREACH_泵系列_产品数据源")
      );
    })
    .map((name) => path.join(dir, name));
}

function findFaqSources() {
  const files = [];

  for (const dir of searchDirs) {
    for (const file of getXlsxFiles(dir)) {
      if (!files.includes(file)) {
        files.push(file);
      }
    }
  }

  const sources = [];

  for (const file of files) {
    try {
      const wb = XLSX.readFile(file);

      for (const sheetName of faqSheetNames) {
        if (wb.Sheets[sheetName]) {
          const rows = readSheet(wb, sheetName).filter((row) => {
            return text(row.questionZh) || text(row.questionEn);
          });

          if (rows.length > 0) {
            sources.push({
              file,
              sheetName,
              rows,
            });
          }
        }
      }
    } catch (error) {
      // 跳过不能读取的临时文件
    }
  }

  return sources;
}

if (!fs.existsSync(targetFile)) {
  throw new Error("未找到目标泵系列数据源：" + targetFile);
}

const sources = findFaqSources();

if (sources.length === 0) {
  throw new Error(
    "没有找到可导入的 FAQ 表。请把包含 09_FAQ / 10_FAQ / 12_FAQ 的 xlsx 放到 data-source/product-center/pumps 目录。"
  );
}

console.log("识别到 FAQ 来源：");

for (const source of sources) {
  console.log("- " + source.file + " / " + source.sheetName + " / " + source.rows.length + " 行");
}

const importedRows = [];

for (const source of sources) {
  for (const row of source.rows) {
    const faqId = text(row.faqId);
    const questionZh = text(row.questionZh);
    const answerZh = text(row.answerZh);
    const questionEn = text(row.questionEn);
    const answerEn = text(row.answerEn);

    if (!questionZh && !questionEn) {
      continue;
    }

    importedRows.push({
      faqId:
        faqId ||
        `FAQ-PLUNGER-${String(importedRows.length + 1).padStart(3, "0")}`,
      scope: normalizeScope(row.scope),
      pumpTypeSlug: normalizePumpTypeSlug(row),
      seriesSlug: normalizeSeriesSlug(row.seriesSlug),
      productId: text(row.productId),
      questionZh,
      answerZh,
      questionEn,
      answerEn,
      footnoteIds: text(row.footnoteIds),
      sort: text(row.sort) || (importedRows.length + 1) * 10,
      enabled: text(row.enabled) || "yes",
    });
  }
}

/* =========================================================
   去重：
   同一个 faqId 优先；
   没有 faqId 时用 scope/product/series/question 去重。
========================================================= */

const faqMap = new Map();

for (const row of importedRows) {
  const key = text(row.faqId)
    ? `id:${text(row.faqId)}`
    : [
        "content",
        text(row.scope),
        text(row.pumpTypeSlug),
        text(row.seriesSlug),
        text(row.productId),
        text(row.questionZh),
        text(row.questionEn),
      ].join("||");

  if (!faqMap.has(key)) {
    faqMap.set(key, row);
  }
}

const cleanRows = Array.from(faqMap.values()).sort((a, b) => {
  const sortA = Number(a.sort || 999);
  const sortB = Number(b.sort || 999);

  return sortA - sortB;
});

const targetWb = XLSX.readFile(targetFile);
writeSheet(targetWb, "12_FAQ", cleanRows);
XLSX.writeFile(targetWb, targetFile);

console.log("✅ 已从正式 FAQ 表导入到 12_FAQ");
console.log("FAQ 行数：" + cleanRows.length);