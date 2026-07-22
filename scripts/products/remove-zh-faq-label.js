const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "ProductDetailClient.tsx"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-remove-zh-faq-label-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

/*
  中文详情页 FAQ 区域：
  只保留“常见问题”，去掉英文 FAQ 小标题。
*/
content = content.replace(
  /\s*<p>FAQ<\/p>/g,
  ""
);

fs.writeFileSync(file, content, "utf8");

console.log("已去掉中文详情页 FAQ 区域中的英文 FAQ 小标题。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
