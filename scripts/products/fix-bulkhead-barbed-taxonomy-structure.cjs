const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const targetPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "bulkhead-barbed-fitting-selection.generated.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "bulkhead-barbed-taxonomy-structure-fix.md"
);

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

    if (
      char === '"' ||
      char === "'" ||
      char === "`"
    ) {
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

if (!fs.existsSync(targetPath)) {
  throw new Error(`未找到文件：${targetPath}`);
}

const originalSource = fs.readFileSync(targetPath, "utf8");

const taxonomyRange = extractArray(
  originalSource,
  "bulkheadBarbedFittingTaxonomyItems"
);

if (
  !Array.isArray(taxonomyRange.value) ||
  taxonomyRange.value.length !== 1
) {
  throw new Error(
    `taxonomy数量异常：${
      Array.isArray(taxonomyRange.value)
        ? taxonomyRange.value.length
        : "非数组"
    }/1`
  );
}

/*
 * ProductSelectionClient 的 getTaxonomyLabel()
 * 按现有标准taxonomy结构读取：
 *
 * type: "productType"
 * id: 产品类型ID
 * label: 多语言名称
 *
 * 旧数据的id使用了 "fittings:bulkhead-barbed-fittings"，
 * 并且缺少type，因此名称查询失败并回退显示内部ID。
 */
const fixedTaxonomy = [
  {
    type: "productType",
    id: "bulkhead-barbed-fittings",
    label: {
      zh: "穿板倒刺接头",
      en: "Bulkhead Barbed Fittings",
      es: "Bulkhead Barbed Fittings",
      fr: "Bulkhead Barbed Fittings",
      ko: "Bulkhead Barbed Fittings",
      ru: "Bulkhead Barbed Fittings",
    },
    sortOrder: 405,
  },
];

const updatedSource = replaceArray(
  originalSource,
  taxonomyRange,
  fixedTaxonomy
);

assertTsSyntax(
  "bulkhead-barbed-fitting-selection.generated.ts",
  updatedSource
);

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backupPath =
  `${targetPath}.bak_taxonomy_structure_${stamp}`;

fs.copyFileSync(targetPath, backupPath);
fs.writeFileSync(targetPath, updatedSource, "utf8");

fs.mkdirSync(path.dirname(reportPath), {
  recursive: true,
});

const report = [
  "# 穿板倒刺接头taxonomy结构修复",
  "",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
  "## 原因",
  "",
  "- 原taxonomy缺少 `type: \"productType\"`",
  "- 原taxonomy的 `id` 为 `fittings:bulkhead-barbed-fittings`",
  "- ProductSelectionClient按产品类型ID `bulkhead-barbed-fittings` 查询，因此匹配失败",
  "- 匹配失败后页面回退显示内部ID",
  "",
  "## 修复结果",
  "",
  "- type：productType",
  "- id：bulkhead-barbed-fittings",
  "- 中文名称：穿板倒刺接头",
  "- 未修改组件",
  "- 未修改CSS",
  "- 未修改产品卡片数据",
  "",
  `- 备份：${backupPath}`,
  "",
];

fs.writeFileSync(
  reportPath,
  report.join("\n"),
  "utf8"
);

console.log("");
console.log("============================================");
console.log("穿板倒刺接头taxonomy结构修复完成");
console.log("============================================");
console.log("type：productType");
console.log("id：bulkhead-barbed-fittings");
console.log("显示名称：穿板倒刺接头");
console.log("报告：", reportPath);
console.log("");
