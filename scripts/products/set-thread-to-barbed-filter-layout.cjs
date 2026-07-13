const fs = require("fs");
const path = require("path");

const root = process.cwd();

const typeFile = path.join(
  root,
  "components",
  "products",
  "selection",
  "product-selection-ui.types.ts"
);

const groupFile = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductFilterGroup.tsx"
);

const clientFile = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const cssFile = path.join(
  root,
  "app",
  "globals.css"
);

const timestamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

function read(file) {
  if (!fs.existsSync(file)) {
    throw new Error("未找到文件：" + file);
  }

  return fs.readFileSync(file, "utf8");
}

function backup(file) {
  const backupPath =
    file + ".bak_thread_barbed_layout_" + timestamp;

  fs.copyFileSync(file, backupPath);

  console.log("已备份：" + backupPath);
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log("已修改：" + file);
}

/* =========================================================
   1. 扩展筛选组 layout 类型
   ========================================================= */

let typeSource = read(typeFile);

if (!typeSource.includes('layout?: "one" | "two" | "three";')) {
  const oldType = `export type ProductSelectionFilterGroup = {
  key: "productType" | SelectionFilterKey;
  title: string;
  inputType: "single" | "multiple";
  options: ProductSelectionFilterOption[];
};`;

  const newType = `export type ProductSelectionFilterGroup = {
  key: "productType" | SelectionFilterKey;
  title: string;
  inputType: "single" | "multiple";
  options: ProductSelectionFilterOption[];
  layout?: "one" | "two" | "three";
};`;

  if (!typeSource.includes(oldType)) {
    throw new Error(
      "product-selection-ui.types.ts 中未找到 ProductSelectionFilterGroup 类型锚点。"
    );
  }

  backup(typeFile);

  typeSource = typeSource.replace(
    oldType,
    newType
  );

  write(typeFile, typeSource);
} else {
  console.log("类型文件已经支持 layout，跳过。");
}

/* =========================================================
   2. ProductFilterGroup 支持指定布局
   ========================================================= */

let groupSource = read(groupFile);

if (
  !groupSource.includes(
    "if (group.layout) {\n    return group.layout;"
  )
) {
  const oldFunction = `function getLayoutClass(group: ProductSelectionFilterGroup) {
  if (group.key === "productType" || group.key === "filter01") {
    return "one";
  }

  return "two";
}`;

  const newFunction = `function getLayoutClass(group: ProductSelectionFilterGroup) {
  if (group.layout) {
    return group.layout;
  }

  if (group.key === "productType" || group.key === "filter01") {
    return "one";
  }

  return "two";
}`;

  if (!groupSource.includes(oldFunction)) {
    throw new Error(
      "ProductFilterGroup.tsx 中未找到 getLayoutClass 函数锚点。"
    );
  }

  backup(groupFile);

  groupSource = groupSource.replace(
    oldFunction,
    newFunction
  );

  write(groupFile, groupSource);
} else {
  console.log("ProductFilterGroup 已支持自定义布局，跳过。");
}

/* =========================================================
   3. 螺纹转倒刺接头指定布局
   filter02 密封方式：3个一排
   filter01 连接结构：2个一排
   ========================================================= */

let clientSource = read(clientFile);

const clientMarker =
  "THREAD_TO_BARBED_FILTER_GROUP_LAYOUT";

if (!clientSource.includes(clientMarker)) {
  const oldClientBlock = `groups.push({
        key: (label as any).filterKey,
        title: getText(locale, label.label, (label as any).filterKey),
        inputType: label.inputType,
        options: sortHardTubeFilterOptionsForDisplay(
          activeProductTypeId,
          (label as any).filterKey,
          options.map((option) => ({
            ...option,
            label: getLocalizedFilterOptionLabel(
              option.label || option.value,
              locale
            ),
          }))
        ),
      });`;

  const newClientBlock = `const filterKey =
        (label as any).filterKey as SelectionFilterKey;

      /*
       * THREAD_TO_BARBED_FILTER_GROUP_LAYOUT
       *
       * 螺纹转倒刺接头：
       * filter02 密封方式：3个一排
       * filter01 连接结构：2个一排
       */
      let layout:
        ProductSelectionFilterGroup["layout"];

      if (
        activeProductTypeId ===
        "thread-to-barbed-fittings"
      ) {
        if (filterKey === "filter02") {
          layout = "three";
        } else if (filterKey === "filter01") {
          layout = "two";
        }
      }

      groups.push({
        key: filterKey,
        title: getText(
          locale,
          label.label,
          filterKey
        ),
        inputType: label.inputType,
        layout,
        options: sortHardTubeFilterOptionsForDisplay(
          activeProductTypeId,
          filterKey,
          options.map((option) => ({
            ...option,
            label: getLocalizedFilterOptionLabel(
              option.label || option.value,
              locale
            ),
          }))
        ),
      });`;

  if (!clientSource.includes(oldClientBlock)) {
    throw new Error(
      "ProductSelectionClient.tsx 中未找到 groups.push 筛选组代码块。"
    );
  }

  backup(clientFile);

  clientSource = clientSource.replace(
    oldClientBlock,
    newClientBlock
  );

  write(clientFile, clientSource);
} else {
  console.log("螺纹转倒刺筛选布局已经接入，跳过。");
}

/* =========================================================
   4. 增加三列布局 CSS
   ========================================================= */

let cssSource = read(cssFile);

const cssMarker =
  "THREAD_TO_BARBED_FILTER_THREE_COLUMN_START";

if (!cssSource.includes(cssMarker)) {
  const cssPatch = `

/* =========================================================
   THREAD_TO_BARBED_FILTER_THREE_COLUMN_START

   螺纹转倒刺接头：
   密封方式 3 个一排；
   连接结构使用现有 two 布局，2 个一排。
   ========================================================= */

.filter-options.three {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

@media (max-width: 760px) {
  .filter-options.three {
    grid-template-columns: 1fr;
  }
}

/* THREAD_TO_BARBED_FILTER_THREE_COLUMN_END */
`;

  backup(cssFile);

  cssSource += cssPatch;

  write(cssFile, cssSource);
} else {
  console.log("三列布局 CSS 已存在，跳过。");
}

console.log("");
console.log("============================================");
console.log("筛选布局修改完成");
console.log("============================================");
console.log("密封方式：3个一排");
console.log("连接结构：2个一排");
console.log("");
