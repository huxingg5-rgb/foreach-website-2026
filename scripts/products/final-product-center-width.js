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
const backupFile = `${file}.backup-final-product-center-width-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH final product center width START ===== */";
const endMarker = "/* ===== FOREACH final product center width END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  产品中心最终宽度修正：
  - 精准覆盖真实 class
  - 主容器从 1320px 放大到 1600px
  - 取消右侧 product-area 的 996px 限制
  - 筛选栏保持 420px
  - 产品区自然展开，仍保持一排 3 张卡片
*/

.products-selection-page .container {
  width: min(1600px, calc(100% - 96px)) !important;
  max-width: 1600px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.products-selection-page .selection-layout {
  display: grid !important;
  grid-template-columns: 420px minmax(0, 1fr) !important;
  gap: 32px !important;
  align-items: start !important;
}

.products-selection-page .product-area {
  width: 100% !important;
  max-width: none !important;
  min-width: 0 !important;
}

.products-selection-page .product-grid {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 28px !important;
}

@media (max-width: 1180px) {
  .products-selection-page .container {
    width: min(100% - 48px, 100%) !important;
    max-width: none !important;
  }

  .products-selection-page .selection-layout {
    grid-template-columns: 1fr !important;
  }

  .products-selection-page .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

@media (max-width: 760px) {
  .products-selection-page .container {
    width: min(100% - 32px, 100%) !important;
  }

  .products-selection-page .product-grid {
    grid-template-columns: 1fr !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已修复产品中心主容器和右侧产品区宽度。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
