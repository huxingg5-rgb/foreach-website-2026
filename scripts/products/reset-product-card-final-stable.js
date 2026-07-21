const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "app",
  "products",
  "products.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-reset-product-card-final-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/*
  清理之前多次追加的产品卡片 override。
  保留产品中心宽度、筛选栏宽度，不动页面整体布局。
*/
const removeBlocks = [
  ["/* ===== FOREACH product center enlarge cards START ===== */", "/* ===== FOREACH product center enlarge cards END ===== */"],
  ["/* ===== FOREACH product card clean layout START ===== */", "/* ===== FOREACH product card clean layout END ===== */"],
  ["/* ===== FOREACH product card inner layout only START ===== */", "/* ===== FOREACH product card inner layout only END ===== */"],
  ["/* ===== FOREACH product card inner final layout START ===== */", "/* ===== FOREACH product card inner final layout END ===== */"],
  ["/* ===== FOREACH product card final clean inner START ===== */", "/* ===== FOREACH product card final clean inner END ===== */"],
  ["/* ===== FOREACH product card inner keep highlight START ===== */", "/* ===== FOREACH product card inner keep highlight END ===== */"],
  ["/* ===== FOREACH product card text button layout START ===== */", "/* ===== FOREACH product card text button layout END ===== */"],
  ["/* ===== FOREACH product card button compact START ===== */", "/* ===== FOREACH product card button compact END ===== */"],
  ["/* ===== FOREACH product card text left align START ===== */", "/* ===== FOREACH product card text left align END ===== */"],
  ["/* ===== FOREACH product card final stable START ===== */", "/* ===== FOREACH product card final stable END ===== */"],
];

for (const [startMarker, endMarker] of removeBlocks) {
  const pattern = new RegExp(
    `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`,
    "g"
  );

  content = content.replace(pattern, "");
}

const block = `
/* ===== FOREACH product card final stable START ===== */

/*
  产品中心卡片最终稳定版：
  - 保留顶部绿色线
  - 保留 hover / 选中绿边
  - 保留型号较大、较粗
  - 只优化内部排版
*/

.products-selection-page .product-card {
  min-height: 410px !important;
}

/* 保留顶部绿色线，不弱化 */
.products-selection-page .selected-bar {
  height: 4px !important;
}

/* 保留 hover / 选中绿边 */
.products-selection-page .product-card:hover {
  border-color: var(--brand-cyan, #09e9b4) !important;
}

/* 图片区尽量减少上下左右空白 */
.products-selection-page .product-image {
  height: 245px !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: #ffffff !important;
  overflow: hidden !important;
}

.products-selection-page .product-image img {
  width: auto !important;
  height: auto !important;
  max-width: 96% !important;
  max-height: 230px !important;
  object-fit: contain !important;
  object-position: center !important;
}

/* 图片下方横线完整贯穿 */
.products-selection-page .product-body {
  min-height: 165px !important;
  padding: 18px 14px 18px !important;
  display: flex !important;
  flex: 1 !important;
  flex-direction: column !important;
  border-top: 1px solid var(--line, #e5ebf2) !important;
  box-sizing: border-box !important;
}

/* 型号保持大和粗，只让它靠左 */
.products-selection-page .product-title {
  margin: 0 0 10px !important;
  color: var(--brand-blue, #173368) !important;
  font-size: 22px !important;
  line-height: 1.25 !important;
  font-weight: 650 !important;
  text-align: left !important;
  white-space: nowrap !important;
}

/* 参数文字靠左 */
.products-selection-page .product-param-line {
  margin-top: 0 !important;
  color: rgba(23, 51, 104, 0.82) !important;
  font-size: 15px !important;
  line-height: 1.55 !important;
  font-weight: 400 !important;
  text-align: left !important;
}

/* 按钮区域压缩，不再留太多空白 */
.products-selection-page .product-actions {
  margin-top: 12px !important;
  padding-top: 0 !important;
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 10px !important;
}

.products-selection-page .product-link,
.products-selection-page .list-toggle {
  height: 38px !important;
  min-height: 38px !important;
  padding: 0 12px !important;
  font-size: 13px !important;
  font-weight: 700 !important;
}

@media (max-width: 760px) {
  .products-selection-page .product-card {
    min-height: auto !important;
  }

  .products-selection-page .product-image {
    height: 190px !important;
  }

  .products-selection-page .product-image img {
    max-height: 170px !important;
  }

  .products-selection-page .product-body {
    min-height: auto !important;
    padding: 16px 12px 16px !important;
  }

  .products-selection-page .product-title {
    font-size: 18px !important;
  }

  .products-selection-page .product-param-line {
    font-size: 13px !important;
  }

  .products-selection-page .product-actions {
    margin-top: 10px !important;
    gap: 8px !important;
  }

  .products-selection-page .product-link,
  .products-selection-page .list-toggle {
    height: 36px !important;
    min-height: 36px !important;
  }
}

/* ===== FOREACH product card final stable END ===== */
`;

content = `${content.trimEnd()}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已清理多余卡片样式，并写入最终稳定卡片排版。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
