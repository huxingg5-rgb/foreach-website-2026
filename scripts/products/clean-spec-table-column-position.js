const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-clean-spec-column-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

/*
  清理之前追加的规格表文字缩进 override
*/
const removeBlocks = [
  [
    "/* ===== FOREACH product detail spec table text indent START ===== */",
    "/* ===== FOREACH product detail spec table text indent END ===== */",
  ],
  [
    "/* ===== FOREACH force spec value column right START ===== */",
    "/* ===== FOREACH force spec value column right END ===== */",
  ],
];

for (const [startMarker, endMarker] of removeBlocks) {
  const pattern = new RegExp(
    `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
    "g"
  );

  content = content.replace(pattern, "");
}

/*
  通过加宽左侧字段列，让右侧参数值自然右移。
  这样比强行给 td 加 padding 更稳定。
*/
content = content.replace(
  /(\.specTable th\s*\{[\s\S]*?width:\s*)300px(\s*;[\s\S]*?\})/,
  "$1360px$2"
);

/*
  保持右侧参数值左对齐，避免回到居中。
*/
content = content.replace(
  /(\.specTable td\s*\{[\s\S]*?text-align:\s*)center(\s*;[\s\S]*?\})/,
  "$1left$2"
);

fs.writeFileSync(file, content, "utf8");

console.log("已清理规格表重复缩进样式，并将左侧字段列调整为 360px。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
