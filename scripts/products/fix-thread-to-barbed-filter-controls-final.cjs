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
  "thread-to-barbed-filter-controls-final-fix.md"
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

function replacePanelLogic(source) {
  const oldBlock = `const isSingleSelectGroup =
            group.key === "productType" ||
            group.key === "filter01";`;

  const newBlock = `const isSingleSelectGroup =
            group.key === "productType" ||
            (
              activeProductTypeId ===
                "thread-to-barbed-fittings"
                ? group.inputType === "single"
                : group.key === "filter01"
            );`;

  if (source.includes(newBlock)) {
    return source;
  }

  const count = source.split(oldBlock).length - 1;

  if (count !== 1) {
    throw new Error(
      `无法唯一定位isSingleSelectGroup旧逻辑：${count}`
    );
  }

  return source.replace(oldBlock, newBlock);
}

function replaceLayoutLogic(source) {
  const oldBlock = `  if (
    filterKey ===
    "filter02"
  ) {
    return "one";
  }

  if (
    filterKey ===
    "filter01"
  ) {
    return "two";
  }`;

  const newBlock = `  if (
    filterKey === "filter01" ||
    filterKey === "filter02"
  ) {
    return "two";
  }`;

  if (source.includes(newBlock)) {
    return source;
  }

  const count = source.split(oldBlock).length - 1;

  if (count !== 1) {
    throw new Error(
      `无法唯一定位螺纹转倒刺布局旧逻辑：${count}`
    );
  }

  return source.replace(oldBlock, newBlock);
}

/* 1. 强制校正该系列筛选数据 */

const originalGenerated = read(generatedPath);

const labelRange = extractArray(
  originalGenerated,
  "threadToBarbedFittingFilterLabels"
);

const expectedTypes = {
  filter01: "multiple",
  filter02: "single",
  filter03: "multiple",
  filter04: "multiple",
  filter05: "multiple",
  filter06: "multiple",
};

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

const updatedLabels = labelRange.value.map((item) => {
  const key = String(item.filterKey || "").trim();

  if (!expectedTypes[key]) {
    throw new Error(`未知筛选字段：${key}`);
  }

  return {
    ...item,
    inputType: expectedTypes[key],
  };
});

const updatedGenerated = replaceArray(
  originalGenerated,
  labelRange,
  updatedLabels
);

/* 2. 修正两个一排 */

const originalClient = read(clientPath);
const updatedClient = replaceLayoutLogic(originalClient);

/* 3. 修正圆形/方形 */

const originalPanel = read(panelPath);
const updatedPanel = replacePanelLogic(originalPanel);

/* 4. 严格校验 */

const finalLabels = extractArray(
  updatedGenerated,
  "threadToBarbedFittingFilterLabels"
).value;

const finalTypeMap = Object.fromEntries(
  finalLabels.map((item) => [
    item.filterKey,
    item.inputType,
  ])
);

for (const [key, expected] of Object.entries(expectedTypes)) {
  if (finalTypeMap[key] !== expected) {
    throw new Error(
      `${key}类型校验失败：${finalTypeMap[key]} / ${expected}`
    );
  }
}

if (
  !updatedPanel.includes(
    'activeProductTypeId ===\n                "thread-to-barbed-fittings"'
  ) ||
  !updatedPanel.includes(
    'group.inputType === "single"'
  )
) {
  throw new Error("圆形/方形判断校验失败。");
}

if (
  !updatedClient.includes(
    'filterKey === "filter01" ||\n    filterKey === "filter02"'
  ) ||
  !updatedClient.includes('return "two";')
) {
  throw new Error("两个一排布局校验失败。");
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

/* 5. 备份并写入 */

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
    `${filePath}.bak_thread_to_barbed_final_${stamp}`;

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

/* 6. 报告 */

const report = [
  "# 螺纹转倒刺接头筛选控件最终修复",
  "",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
  "## 修复后的真实逻辑",
  "",
  "- filter01 连接结构：multiple → 方形多选 → 两个一排",
  "- filter02 密封方式：single → 圆形单选 → 两个一排",
  "- filter03 螺纹规格：multiple → 方形多选",
  "- filter04 接管内径：multiple → 方形多选",
  "- filter05 材质：multiple → 方形多选",
  "- filter06 颜色：multiple → 方形多选",
  "",
  "## 原因",
  "",
  "- ProductFilterPanel仍然硬编码filter01为圆形",
  "- ProductSelectionClient仍然把filter02强制为一行一个",
  "- 因此页面显示与数据配置相反",
  "",
  "## 修改文件",
  "",
  "- data/products/selection/thread-to-barbed-fitting-selection.generated.ts",
  "- components/products/selection/ProductSelectionClient.tsx",
  "- components/products/selection/ProductFilterPanel.tsx",
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
console.log("螺纹转倒刺接头筛选控件最终修复完成");
console.log("============================================");
console.log("密封方式：圆形单选、两个一排");
console.log("连接结构：方形多选、两个一排");
console.log("螺纹规格及以下：方形多选");
console.log("");
console.log("报告：");
console.log(reportPath);
console.log("");
