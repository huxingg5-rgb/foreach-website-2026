const fs = require("fs");
const path = require("path");

const root = process.cwd();

const panelPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductFilterPanel.tsx"
);

const cssPath = path.join(
  root,
  "app",
  "products",
  "products.css"
);

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("未找到文件：" + filePath);
  }

  return fs.readFileSync(filePath, "utf8");
}

function backup(filePath) {
  const backupPath =
    filePath +
    ".bak_thread_to_barbed_layout_" +
    stamp;

  fs.copyFileSync(filePath, backupPath);

  console.log("已备份：" + backupPath);
}

/* =========================================================
   1. 给筛选面板增加当前产品类型标记
   ========================================================= */

let panelSource = read(panelPath);

if (
  !panelSource.includes(
    'data-product-type-id={activeProductTypeId || ""}'
  )
) {
  const asidePattern =
    /<aside\s+className=["']filter-panel["']/;

  if (!asidePattern.test(panelSource)) {
    throw new Error(
      "ProductFilterPanel.tsx 中没有找到 filter-panel aside。"
    );
  }

  backup(panelPath);

  panelSource = panelSource.replace(
    asidePattern,
    `<aside
      className="filter-panel"
      data-product-type-id={activeProductTypeId || ""}`
  );

  fs.writeFileSync(
    panelPath,
    panelSource,
    "utf8"
  );

  console.log("已修改：" + panelPath);
} else {
  console.log(
    "ProductFilterPanel 已有产品类型标记，跳过。"
  );
}

/* =========================================================
   2. 在实际使用的 products.css 中增加专属布局
   ========================================================= */

let cssSource = read(cssPath);

const startMarker =
  "THREAD_TO_BARBED_FILTER_LAYOUT_FINAL_START";

const endMarker =
  "THREAD_TO_BARBED_FILTER_LAYOUT_FINAL_END";

const oldBlockPattern = new RegExp(
  `/\\*\\s*${startMarker}\\s*\\*/[\\s\\S]*?/\\*\\s*${endMarker}\\s*\\*/`,
  "g"
);

cssSource = cssSource
  .replace(oldBlockPattern, "")
  .trimEnd();

const cssPatch = `

/* =========================================================
   THREAD_TO_BARBED_FILTER_LAYOUT_FINAL_START

   螺纹转倒刺接头筛选布局：
   1. 密封方式 filter02：每个选项独占一整行
   2. 连接结构 filter01：两个选项一排
   3. 只影响 thread-to-barbed-fittings
   ========================================================= */

.filter-panel[data-product-type-id="thread-to-barbed-fittings"]
  .filter-group-filter02
  .filter-options,
.filter-panel[data-product-type-id="thread-to-barbed-fittings"]
  [data-filter-key="filter02"]
  .filter-options {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) !important;
}

.filter-panel[data-product-type-id="thread-to-barbed-fittings"]
  .filter-group-filter01
  .filter-options,
.filter-panel[data-product-type-id="thread-to-barbed-fittings"]
  [data-filter-key="filter01"]
  .filter-options {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
}

@media (max-width: 760px) {
  .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
    .filter-group-filter01
    .filter-options,
  .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
    [data-filter-key="filter01"]
    .filter-options {
    grid-template-columns: minmax(0, 1fr) !important;
  }
}

/* THREAD_TO_BARBED_FILTER_LAYOUT_FINAL_END */
`;

backup(cssPath);

fs.writeFileSync(
  cssPath,
  cssSource + cssPatch,
  "utf8"
);

console.log("已修改：" + cssPath);

console.log("");
console.log("============================================");
console.log("螺纹转倒刺筛选布局修改完成");
console.log("============================================");
console.log("密封方式：每个选项独占一整行");
console.log("连接结构：两个选项一排");
console.log("其他产品筛选布局不受影响");
console.log("");
