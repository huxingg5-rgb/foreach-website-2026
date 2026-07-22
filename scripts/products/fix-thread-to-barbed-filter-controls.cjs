const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "thread-to-barbed-fitting-selection.generated.ts"
);

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const panelPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductFilterPanel.tsx"
);

const reportPath = path.join(
  root,
  "reports",
  "thread-to-barbed-filter-controls-fix.md"
);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`未找到文件：${filePath}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function extractArray(source, exportName) {
  const marker = `export const ${exportName} =`;
  const markerIndex = source.indexOf(marker);

  if (markerIndex < 0) {
    throw new Error(`没有找到导出：${exportName}`);
  }

  const start = source.indexOf("[", markerIndex + marker.length);

  if (start < 0) {
    throw new Error(`没有找到数组开始位置：${exportName}`);
  }

  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = "";
      }

      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "[") {
      depth += 1;
      continue;
    }

    if (char === "]") {
      depth -= 1;

      if (depth === 0) {
        return {
          start,
          end: index + 1,
          value: JSON.parse(source.slice(start, index + 1)),
        };
      }
    }
  }

  throw new Error(`数组没有正常结束：${exportName}`);
}

function replaceArray(source, range, value) {
  return (
    source.slice(0, range.start) +
    JSON.stringify(value, null, 2) +
    source.slice(range.end)
  );
}

function replaceOnce(source, pattern, replacement, description) {
  const matches = source.match(pattern) || [];

  if (matches.length !== 1) {
    throw new Error(
      `${description}定位数量异常：${matches.length}`
    );
  }

  return source.replace(pattern, replacement);
}

function assertTsSyntax(fileName, source) {
  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve,
    },
    reportDiagnostics: true,
    fileName,
  });

  const errors = (result.diagnostics || []).filter(
    (diagnostic) =>
      diagnostic.category === ts.DiagnosticCategory.Error
  );

  if (errors.length) {
    throw new Error(
      `${fileName}语法检查失败：\n` +
        errors
          .map((diagnostic) =>
            ts.flattenDiagnosticMessageText(
              diagnostic.messageText,
              "\n"
            )
          )
          .join("\n")
    );
  }
}

/* =========================================================
   1. 修改该系列自己的筛选配置
   ========================================================= */

const originalGenerated = read(generatedPath);

const labelRange = extractArray(
  originalGenerated,
  "threadToBarbedFittingFilterLabels"
);

if (
  !Array.isArray(labelRange.value) ||
  labelRange.value.length !== 6
) {
  throw new Error(
    `筛选标签数量异常：${
      Array.isArray(labelRange.value)
        ? labelRange.value.length
        : "非数组"
    }/6`
  );
}

const desiredInputTypes = {
  filter01: "multiple", // 连接结构
  filter02: "single",   // 密封方式
  filter03: "multiple", // 螺纹规格
  filter04: "multiple", // 接管内径
  filter05: "multiple", // 材质
  filter06: "multiple", // 颜色
};

const updatedLabels = labelRange.value.map((item) => {
  const key = String(item.filterKey || "").trim();

  if (!Object.prototype.hasOwnProperty.call(desiredInputTypes, key)) {
    throw new Error(`发现未知筛选字段：${key}`);
  }

  return {
    ...item,
    inputType: desiredInputTypes[key],
  };
});

const updatedGenerated = replaceArray(
  originalGenerated,
  labelRange,
  updatedLabels
);

/* =========================================================
   2. 密封方式改成两个一排
   ========================================================= */

const originalClient = read(clientPath);

const layoutPattern =
  /\/\*\s*THREAD_TO_BARBED_FINAL_FILTER_LAYOUT[\s\S]*?function getProductFilterGroupLayout\([\s\S]*?if\s*\(\s*productTypeId !==\s*"thread-to-barbed-fittings"\s*\)\s*\{\s*return undefined;\s*\}\s*if\s*\(\s*filterKey ===\s*"filter02"\s*\)\s*\{\s*return "one";\s*\}\s*if\s*\(\s*filterKey ===\s*"filter01"\s*\)\s*\{\s*return "two";\s*\}\s*return undefined;\s*\}/;

const layoutReplacement = `/*
 * THREAD_TO_BARBED_FINAL_FILTER_LAYOUT
 *
 * 螺纹转倒刺接头：
 * filter02 = 密封方式，圆形单选，两个一排
 * filter01 = 连接结构，方形多选，两个一排
 */
function getProductFilterGroupLayout(
  productTypeId: string,
  filterKey: SelectionFilterKey
): ProductSelectionFilterGroup["layout"] | undefined {

  /* BULKHEAD_BARBED_TWO_COLUMN_LAYOUT_START */
  if (productTypeId === "bulkhead-barbed-fittings") {
    return "two";
  }
  /* BULKHEAD_BARBED_TWO_COLUMN_LAYOUT_END */

  /*
   * 过滤器与单向阀筛选页：
   * 从“产品类型”开始，所有筛选选项统一两个一排。
   */
  if (
    productTypeId ===
    "filters"
  ) {
    return "two";
  }

  if (
    productTypeId !==
    "thread-to-barbed-fittings"
  ) {
    return undefined;
  }

  if (
    filterKey === "filter01" ||
    filterKey === "filter02"
  ) {
    return "two";
  }

  return undefined;
}`;

const updatedClient = replaceOnce(
  originalClient,
  layoutPattern,
  layoutReplacement,
  "螺纹转倒刺接头布局函数"
);

/* =========================================================
   3. 让圆形/方形真正读取 inputType
   只影响 thread-to-barbed-fittings
   ========================================================= */

const originalPanel = read(panelPath);

const controlPattern =
  /const isSingleSelectGroup\s*=\s*group\.key === "productType"\s*\|\|\s*group\.key === "filter01";/;

const controlReplacement = `const isSingleSelectGroup =
            group.key === "productType" ||
            (
              activeProductTypeId ===
                "thread-to-barbed-fittings"
                ? group.inputType === "single"
                : group.key === "filter01"
            );`;

const updatedPanel = replaceOnce(
  originalPanel,
  controlPattern,
  controlReplacement,
  "筛选控件圆形/方形判断"
);

/* =========================================================
   4. 校验
   ========================================================= */

const finalLabelRange = extractArray(
  updatedGenerated,
  "threadToBarbedFittingFilterLabels"
);

const finalTypeMap = Object.fromEntries(
  finalLabelRange.value.map((item) => [
    item.filterKey,
    item.inputType,
  ])
);

for (const [key, expected] of Object.entries(desiredInputTypes)) {
  if (finalTypeMap[key] !== expected) {
    throw new Error(
      `${key} inputType校验失败：${finalTypeMap[key]} / ${expected}`
    );
  }
}

if (
  !updatedClient.includes(
    'filterKey === "filter01" ||\n    filterKey === "filter02"'
  )
) {
  throw new Error("两个一排布局校验失败。");
}

if (
  !updatedPanel.includes(
    'group.inputType === "single"'
  )
) {
  throw new Error("筛选控件类型读取校验失败。");
}

assertTsSyntax(
  "thread-to-barbed-fitting-selection.generated.ts",
  updatedGenerated
);

assertTsSyntax(
  "ProductSelectionClient.tsx",
  updatedClient
);

assertTsSyntax(
  "ProductFilterPanel.tsx",
  updatedPanel
);

/* =========================================================
   5. 备份并写入
   ========================================================= */

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backups = [];

for (const filePath of [
  generatedPath,
  clientPath,
  panelPath,
]) {
  const backupPath =
    `${filePath}.bak_thread_to_barbed_controls_${stamp}`;

  fs.copyFileSync(filePath, backupPath);
  backups.push(backupPath);
}

fs.writeFileSync(
  generatedPath,
  updatedGenerated,
  "utf8"
);

fs.writeFileSync(
  clientPath,
  updatedClient,
  "utf8"
);

fs.writeFileSync(
  panelPath,
  updatedPanel,
  "utf8"
);

/* =========================================================
   6. 报告
   ========================================================= */

const report = [
  "# 螺纹转倒刺接头筛选控件修复",
  "",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
  "## 最终交互",
  "",
  "- 密封方式：圆形单选、两个一排",
  "- 连接结构：方形多选、两个一排",
  "- 螺纹规格：方形多选",
  "- 接管内径：方形多选",
  "- 材质：方形多选",
  "- 颜色：方形多选",
  "",
  "## 修改文件",
  "",
  "- data/products/selection/thread-to-barbed-fitting-selection.generated.ts",
  "- components/products/selection/ProductSelectionClient.tsx",
  "- components/products/selection/ProductFilterPanel.tsx",
  "",
  "## 修改边界",
  "",
  "- 圆形/方形的新判断只针对 thread-to-barbed-fittings",
  "- 未修改其他接头系列的控件类型",
  "- 未修改CSS",
  "- 未修改产品数据、图片与详情链接",
  "",
  "## 备份",
  "",
  ...backups.map((item) => `- ${item}`),
  "",
];

fs.mkdirSync(path.dirname(reportPath), {
  recursive: true,
});

fs.writeFileSync(
  reportPath,
  report.join("\n"),
  "utf8"
);

console.log("");
console.log("============================================");
console.log("螺纹转倒刺接头筛选控件修复完成");
console.log("============================================");
console.log("密封方式：圆形单选、两个一排");
console.log("连接结构：方形多选、两个一排");
console.log("螺纹规格：方形多选");
console.log("接管内径：方形多选");
console.log("材质：方形多选");
console.log("颜色：方形多选");
console.log("");
console.log("报告：");
console.log(reportPath);
console.log("");
