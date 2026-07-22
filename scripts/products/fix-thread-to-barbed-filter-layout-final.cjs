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

const groupPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductFilterGroup.tsx"
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
    filePath + ".bak_thread_barbed_final_layout_" + stamp;

  fs.copyFileSync(filePath, backupPath);
  console.log("已备份：" + backupPath);
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log("已修改：" + filePath);
}

/* =========================================================
   1. ProductFilterPanel
   将 activeProductTypeId 继续传给 ProductFilterGroup
   ========================================================= */

let panel = read(panelPath);
backup(panelPath);

if (!/activeProductTypeId\??:\s*string/.test(panel)) {
  panel = panel.replace(
    /filterGroups:\s*ProductSelectionFilterGroup\[\];/,
    `filterGroups: ProductSelectionFilterGroup[];
  activeProductTypeId?: string;`
  );
}

const panelFunctionPattern =
  /(export default function ProductFilterPanel\(\{\s*\n\s*activeCategory,\s*\n)/;

if (
  !panel.includes("activeProductTypeId,") &&
  panelFunctionPattern.test(panel)
) {
  panel = panel.replace(
    panelFunctionPattern,
    `$1  activeProductTypeId,\n`
  );
}

if (
  !panel.includes(
    "activeProductTypeId={activeProductTypeId}"
  )
) {
  panel = panel.replace(
    /(<ProductFilterGroup\s*\n\s*group=\{group\})/,
    `$1
            activeProductTypeId={activeProductTypeId}`
  );
}

write(panelPath, panel);

/* =========================================================
   2. ProductFilterGroup
   直接按产品类型控制布局
   ========================================================= */

let group = read(groupPath);
backup(groupPath);

if (!/activeProductTypeId\??:\s*string/.test(group)) {
  group = group.replace(
    /group:\s*ProductSelectionFilterGroup;/,
    `group: ProductSelectionFilterGroup;
  activeProductTypeId?: string;`
  );
}

const layoutFunctionPattern =
  /function getLayoutClass\([\s\S]*?\n\}/;

const newLayoutFunction = `function getLayoutClass(
  group: ProductSelectionFilterGroup,
  activeProductTypeId?: string
) {
  /*
   * 螺纹转倒刺接头专属布局：
   *
   * filter02 = 密封方式，每个选项占一整行；
   * filter01 = 连接结构，两个选项一排。
   */
  if (
    activeProductTypeId ===
    "thread-to-barbed-fittings"
  ) {
    if (group.key === "filter02") {
      return "one";
    }

    if (group.key === "filter01") {
      return "two";
    }
  }

  /*
   * 其他产品继续保持原来的公共布局。
   */
  if (
    group.key === "productType" ||
    group.key === "filter01"
  ) {
    return "one";
  }

  return "two";
}`;

if (!layoutFunctionPattern.test(group)) {
  throw new Error(
    "没有找到 ProductFilterGroup.tsx 中的 getLayoutClass 函数。"
  );
}

group = group.replace(
  layoutFunctionPattern,
  newLayoutFunction
);

const groupFunctionPattern =
  /(export default function ProductFilterGroup\(\{\s*\n\s*group,\s*\n)/;

if (
  !group.includes("activeProductTypeId,") &&
  groupFunctionPattern.test(group)
) {
  group = group.replace(
    groupFunctionPattern,
    `$1  activeProductTypeId,\n`
  );
}

group = group.replace(
  /const layoutClass\s*=\s*getLayoutClass\(\s*group\s*\);/,
  `const layoutClass = getLayoutClass(
    group,
    activeProductTypeId
  );`
);

write(groupPath, group);

console.log("");
console.log("============================================");
console.log("筛选布局最终修改完成");
console.log("============================================");
console.log("密封方式：每个选项一整行");
console.log("连接结构：两个选项一排");
console.log("");
