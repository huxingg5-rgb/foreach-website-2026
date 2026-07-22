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
  "bulkhead-barbed-taxonomy-label-fix.md"
);

function multilingual(zh, en) {
  return {
    zh,
    en,
    es: en,
    fr: en,
    ko: en,
    ru: en,
  };
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
    } else if (char === "]") {
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

const productRange = extractArray(
  originalSource,
  "bulkheadBarbedFittingSelectionProducts"
);

const taxonomyRange = extractArray(
  originalSource,
  "bulkheadBarbedFittingTaxonomyItems"
);

if (
  !Array.isArray(productRange.value) ||
  productRange.value.length !== 11
) {
  throw new Error(
    `选型产品数量异常：${
      Array.isArray(productRange.value)
        ? productRange.value.length
        : "非数组"
    }/11`
  );
}

if (
  !Array.isArray(taxonomyRange.value) ||
  taxonomyRange.value.length !== 1
) {
  throw new Error(
    `分类数据数量异常：${
      Array.isArray(taxonomyRange.value)
        ? taxonomyRange.value.length
        : "非数组"
    }/1`
  );
}

const categoryName = multilingual("接头系列", "Fittings");
const productTypeName = multilingual(
  "穿板倒刺接头",
  "Bulkhead Barbed Fittings"
);

const updatedProducts = productRange.value.map((product) => ({
  ...product,
  categoryName,
  productTypeName,
  productTypeLabel: productTypeName,
}));

const updatedTaxonomy = taxonomyRange.value.map((item) => ({
  ...item,
  categoryName,
  categoryLabel: categoryName,
  productTypeName,
  productTypeLabel: productTypeName,
  label: productTypeName,
  name: productTypeName,
}));

let updatedSource = replaceArray(
  originalSource,
  taxonomyRange,
  updatedTaxonomy
);

/*
 * 上一步替换taxonomy后，products数组位置没有变化，因为taxonomy在products后面。
 * 重新定位products，避免依赖旧位置。
 */
const updatedProductRange = extractArray(
  updatedSource,
  "bulkheadBarbedFittingSelectionProducts"
);

updatedSource = replaceArray(
  updatedSource,
  updatedProductRange,
  updatedProducts
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
  `${targetPath}.bak_taxonomy_label_${stamp}`;

fs.copyFileSync(targetPath, backupPath);
fs.writeFileSync(targetPath, updatedSource, "utf8");

fs.mkdirSync(path.dirname(reportPath), {
  recursive: true,
});

const report = [
  "# 穿板倒刺接头分类名称修复",
  "",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
  "## 修复内容",
  "",
  "- 将内部ID `bulkhead-barbed-fittings` 映射为中文名称“穿板倒刺接头”",
  "- 为分类数据补齐 categoryName",
  "- 为分类数据补齐 productTypeName",
  "- 同步保留 categoryLabel、productTypeLabel、label、name",
  "- 为11条产品数据补齐 categoryName、productTypeName",
  "- 未修改页面组件",
  "- 未修改CSS",
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
console.log("穿板倒刺接头分类名称修复完成");
console.log("============================================");
console.log("产品数据：", updatedProducts.length);
console.log("分类数据：", updatedTaxonomy.length);
console.log("显示名称：穿板倒刺接头");
console.log("报告：", reportPath);
console.log("");
