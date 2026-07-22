const path = require("path");
const xlsx = require("xlsx");

const root = process.cwd();

const files = [
  path.join(root, "data-source", "product-center", "pumps", "plunger-pump", "ea", "01_EA常规柱塞泵_详情页资料_zh.xlsx"),
  path.join(root, "data-source", "product-center", "pumps", "plunger-pump", "ea", "02_EA常规柱塞泵_规格参数_zh.xlsx"),
  path.join(root, "data-source", "product-center", "pumps", "plunger-pump", "ea", "ea-selection.xlsx"),
];

const fullModelPattern = /EA-\d+-(PMMA|PEEK)-[A-Z0-9]+-[A-Z0-9]+/i;

for (const file of files) {
  console.log("\n==============================");
  console.log("检查文件：", file);

  const workbook = xlsx.readFile(file);

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];

    const rows = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
      raw: false,
    });

    console.log("\nSheet：", sheetName);

    rows.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const text = String(cell || "").trim();

        if (fullModelPattern.test(text)) {
          console.log(`第 ${rowIndex + 1} 行，第 ${colIndex + 1} 列：${text}`);
        }
      });
    });
  });
}
