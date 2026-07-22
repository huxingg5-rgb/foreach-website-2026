const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

/* =========================================================
   search-ea-full-models-in-xlsx.js
   恒永达官网｜全项目搜索 EA 完整型号

   作用：
   1. 搜索所有 xlsx 文件
   2. 查找 EA-100-PMMA-UF-N 这类完整工程型号
   3. 只读取，不修改任何文件
========================================================= */

const root = process.argv[2] || process.cwd();

const skipDirs = new Set([
  "node_modules",
  ".next",
  ".git",
  "out",
]);

const fullModelPattern = /\bEA-\d+(?:UL)?-(?:PMMA|PEEK)(?:-[A-Z0-9]+){1,4}\b/gi;
const keywordPattern = /UF-N|UF|EA-\d+-(PMMA|PEEK)-/i;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      if (skipDirs.has(item.name)) continue;
      walk(fullPath, files);
      continue;
    }

    if (item.isFile() && item.name.toLowerCase().endsWith(".xlsx")) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = walk(root);

console.log("搜索目录：", root);
console.log("找到 xlsx 文件数量：", files.length);

let totalMatches = 0;

for (const file of files) {
  let workbook;

  try {
    workbook = xlsx.readFile(file);
  } catch (error) {
    console.warn("跳过无法读取文件：", file);
    continue;
  }

  let fileHasMatch = false;

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];

    const rows = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
      raw: false,
    });

    rows.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const text = String(cell || "").trim();

        if (!text) return;

        fullModelPattern.lastIndex = 0;

        const matches = text.match(fullModelPattern);

        if (matches || keywordPattern.test(text)) {
          if (!fileHasMatch) {
            console.log("\n==============================");
            console.log("文件：", file);
            fileHasMatch = true;
          }

          console.log(`Sheet：${sheetName} | 第 ${rowIndex + 1} 行，第 ${colIndex + 1} 列：${text}`);
          totalMatches += 1;
        }
      });
    });
  }
}

console.log("\n搜索完成。匹配数量：", totalMatches);
