const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "data",
  "products",
  "detail",
  "product-detail-faq.zh.ts"
);

if (!fs.existsSync(file)) {
  console.error("找不到 FAQ 文件，请先执行 add-series-faq-structure.js");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-add-ea-placeholder-faq-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

content = content.replace(
  /"EA常规柱塞泵":\s*\[\s*\]/,
  `"EA常规柱塞泵": [
    {
      question: "EA 常规柱塞泵适合哪些应用场景？",
      answer:
        "EA 常规柱塞泵适用于 IVD 诊断设备、生命科学仪器、实验室自动化设备和分析仪器中的试剂分配、定量输送和液路集成场景。",
    },
  ]`
);

fs.writeFileSync(file, content, "utf8");

console.log("已添加 EA 常规柱塞泵 FAQ 占位内容。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
