const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  bulkhead: path.join(
    root,
    "data",
    "products",
    "selection",
    "bulkhead-barbed-fitting-selection.generated.ts"
  ),
  luer: path.join(
    root,
    "data",
    "products",
    "selection",
    "luer-fitting-selection.generated.ts"
  ),
  barbed: path.join(
    root,
    "data",
    "products",
    "selection",
    "barbed-fitting-selection.generated.ts"
  ),
  client: path.join(
    root,
    "components",
    "products",
    "selection",
    "ProductSelectionClient.tsx"
  ),
  uiTypes: path.join(
    root,
    "components",
    "products",
    "selection",
    "product-selection-ui.types.ts"
  ),
  selectionTypes: path.join(
    root,
    "data",
    "products",
    "selection",
    "product-selection.types.ts"
  ),
  routeMap: path.join(
    root,
    "data",
    "products",
    "selection",
    "product-route-map.ts"
  ),
};

const reportPath = path.join(
  root,
  "reports",
  "bulkhead-barbed-product-type-label-audit.md"
);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    return "";
  }

  return fs.readFileSync(filePath, "utf8");
}

function relative(filePath) {
  return path
    .relative(root, filePath)
    .replace(/\\/g, "/");
}

function extractArray(source, exportName) {
  const marker = `export const ${exportName} =`;
  const markerIndex = source.indexOf(marker);

  if (markerIndex < 0) {
    return {
      found: false,
      value: null,
      raw: "",
    };
  }

  const start = source.indexOf("[", markerIndex + marker.length);

  if (start < 0) {
    return {
      found: true,
      value: null,
      raw: "",
    };
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
        const raw = source.slice(start, index + 1);

        try {
          return {
            found: true,
            value: JSON.parse(raw),
            raw,
          };
        } catch (error) {
          return {
            found: true,
            value: null,
            raw,
            error: String(error),
          };
        }
      }
    }
  }

  return {
    found: true,
    value: null,
    raw: "",
  };
}

function contexts(source, patterns, before = 10, after = 24) {
  const lines = source.split(/\r?\n/);
  const matches = [];

  lines.forEach((line, index) => {
    const matchedPattern = patterns.find((pattern) =>
      pattern.test(line)
    );

    if (!matchedPattern) {
      return;
    }

    matches.push({
      lineNumber: index + 1,
      line: line.trim(),
      content: lines
        .slice(
          Math.max(0, index - before),
          Math.min(lines.length, index + after + 1)
        )
        .join("\n"),
    });
  });

  return matches;
}

function listKeys(value) {
  if (!value || typeof value !== "object") {
    return [];
  }

  return Object.keys(value);
}

const source = Object.fromEntries(
  Object.entries(files).map(([key, filePath]) => [
    key,
    read(filePath),
  ])
);

for (const [key, filePath] of Object.entries(files)) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`缺少文件：${key} → ${filePath}`);
  }
}

const bulkheadProducts = extractArray(
  source.bulkhead,
  "bulkheadBarbedFittingSelectionProducts"
);

const bulkheadTaxonomy = extractArray(
  source.bulkhead,
  "bulkheadBarbedFittingTaxonomyItems"
);

const bulkheadLabels = extractArray(
  source.bulkhead,
  "bulkheadBarbedFittingFilterLabels"
);

const luerTaxonomy = extractArray(
  source.luer,
  "luerFittingSelectionTaxonomyItems"
);

const barbedTaxonomy = extractArray(
  source.barbed,
  "barbedFittingTaxonomyItems"
);

const luerProducts = extractArray(
  source.luer,
  "luerFittingSelectionProducts"
);

const barbedProducts = extractArray(
  source.barbed,
  "barbedFittingSelectionProducts"
);

const clientContexts = contexts(
  source.client,
  [
    /selectionTaxonomyItems/,
    /productTypeLabel/,
    /productTypeName/,
    /activeProductTypeId/,
    /selectedTags/,
    /SelectedFilter/,
    /当前/,
    /getLocalized/,
    /resolve.*Label/i,
    /taxonomy/i,
  ],
  12,
  35
);

const uiTypeContexts = contexts(
  source.uiTypes,
  [
    /ProductSelectionCategoryItem/,
    /ProductSelectionSelectedTag/,
    /ProductSelectionFilterGroup/,
    /label/,
    /productType/,
  ],
  8,
  24
);

const selectionTypeContexts = contexts(
  source.selectionTypes,
  [
    /ProductSelectionTaxonomyItem/,
    /ProductSelectionProduct/,
    /Localized/,
    /productTypeLabel/,
    /categoryLabel/,
    /productTypeName/,
    /categoryName/,
  ],
  8,
  24
);

const routeContexts = contexts(
  source.routeMap,
  [
    /bulkhead-barbed-fittings/,
    /getProductTypeFilterOptionsByCategory/,
    /getProductTypeHrefByIds/,
    /label:/,
  ],
  10,
  28
);

const literalSearches = [
  "bulkhead-barbed-fittings",
  "穿板倒刺接头",
];

const literalHits = [];

for (const [key, fileSource] of Object.entries(source)) {
  const lines = fileSource.split(/\r?\n/);

  for (const literal of literalSearches) {
    lines.forEach((line, index) => {
      if (line.includes(literal)) {
        literalHits.push({
          file: relative(files[key]),
          literal,
          line: index + 1,
          content: line.trim(),
        });
      }
    });
  }
}

const report = [];

report.push("# 穿板倒刺接头产品类型名称显示检查");
report.push("");
report.push(`生成时间：${new Date().toLocaleString("zh-CN")}`);
report.push("");

report.push("## 一、穿板倒刺接头当前数据结构");
report.push("");

report.push("### taxonomy 第一条");
report.push("");
report.push("```json");
report.push(
  JSON.stringify(
    Array.isArray(bulkheadTaxonomy.value)
      ? bulkheadTaxonomy.value[0]
      : {
          found: bulkheadTaxonomy.found,
          error: bulkheadTaxonomy.error || "",
        },
    null,
    2
  )
);
report.push("```");
report.push("");

report.push("### taxonomy 第一条字段");
report.push("");
report.push(
  `- ${listKeys(
    Array.isArray(bulkheadTaxonomy.value)
      ? bulkheadTaxonomy.value[0]
      : null
  ).join("、") || "未解析"}`
);
report.push("");

report.push("### product 第一条");
report.push("");
report.push("```json");
report.push(
  JSON.stringify(
    Array.isArray(bulkheadProducts.value)
      ? bulkheadProducts.value[0]
      : {
          found: bulkheadProducts.found,
          error: bulkheadProducts.error || "",
        },
    null,
    2
  )
);
report.push("```");
report.push("");

report.push("### filter label 第一条");
report.push("");
report.push("```json");
report.push(
  JSON.stringify(
    Array.isArray(bulkheadLabels.value)
      ? bulkheadLabels.value[0]
      : {
          found: bulkheadLabels.found,
          error: bulkheadLabels.error || "",
        },
    null,
    2
  )
);
report.push("```");
report.push("");

report.push("## 二、正常系列数据结构对比");
report.push("");

report.push("### 鲁尔接头 taxonomy 第一条");
report.push("");
report.push("```json");
report.push(
  JSON.stringify(
    Array.isArray(luerTaxonomy.value)
      ? luerTaxonomy.value[0]
      : {
          found: luerTaxonomy.found,
          error: luerTaxonomy.error || "",
        },
    null,
    2
  )
);
report.push("```");
report.push("");

report.push("### 鲁尔接头 product 第一条");
report.push("");
report.push("```json");
report.push(
  JSON.stringify(
    Array.isArray(luerProducts.value)
      ? luerProducts.value[0]
      : {
          found: luerProducts.found,
          error: luerProducts.error || "",
        },
    null,
    2
  )
);
report.push("```");
report.push("");

report.push("### 倒刺接头 taxonomy 第一条");
report.push("");
report.push("```json");
report.push(
  JSON.stringify(
    Array.isArray(barbedTaxonomy.value)
      ? barbedTaxonomy.value[0]
      : {
          found: barbedTaxonomy.found,
          error: barbedTaxonomy.error || "",
        },
    null,
    2
  )
);
report.push("```");
report.push("");

report.push("### 倒刺接头 product 第一条");
report.push("");
report.push("```json");
report.push(
  JSON.stringify(
    Array.isArray(barbedProducts.value)
      ? barbedProducts.value[0]
      : {
          found: barbedProducts.found,
          error: barbedProducts.error || "",
        },
    null,
    2
  )
);
report.push("```");
report.push("");

report.push("## 三、ProductSelectionClient 名称解析位置");
report.push("");

for (const item of clientContexts.slice(0, 80)) {
  report.push(`### 第${item.lineNumber}行附近`);
  report.push("");
  report.push("```tsx");
  report.push(item.content);
  report.push("```");
  report.push("");
}

report.push("## 四、UI类型定义");
report.push("");

for (const item of uiTypeContexts.slice(0, 30)) {
  report.push(`### 第${item.lineNumber}行附近`);
  report.push("");
  report.push("```ts");
  report.push(item.content);
  report.push("```");
  report.push("");
}

report.push("## 五、选型数据类型定义");
report.push("");

for (const item of selectionTypeContexts.slice(0, 40)) {
  report.push(`### 第${item.lineNumber}行附近`);
  report.push("");
  report.push("```ts");
  report.push(item.content);
  report.push("```");
  report.push("");
}

report.push("## 六、路由映射相关代码");
report.push("");

for (const item of routeContexts.slice(0, 40)) {
  report.push(`### 第${item.lineNumber}行附近`);
  report.push("");
  report.push("```ts");
  report.push(item.content);
  report.push("```");
  report.push("");
}

report.push("## 七、项目内名称命中位置");
report.push("");

for (const hit of literalHits) {
  report.push(
    `- ${hit.file}:${hit.line}｜${hit.literal}｜\`${hit.content.replace(/`/g, "\\`")}\``
  );
}

report.push("");

report.push("## 八、关键统计");
report.push("");
report.push(
  `- 穿板倒刺产品：${
    Array.isArray(bulkheadProducts.value)
      ? bulkheadProducts.value.length
      : "未解析"
  }`
);
report.push(
  `- 穿板倒刺taxonomy：${
    Array.isArray(bulkheadTaxonomy.value)
      ? bulkheadTaxonomy.value.length
      : "未解析"
  }`
);
report.push(
  `- 鲁尔taxonomy：${
    Array.isArray(luerTaxonomy.value)
      ? luerTaxonomy.value.length
      : "未解析"
  }`
);
report.push(
  `- 倒刺taxonomy：${
    Array.isArray(barbedTaxonomy.value)
      ? barbedTaxonomy.value.length
      : "未解析"
  }`
);
report.push("");

fs.mkdirSync(path.dirname(reportPath), {
  recursive: true,
});

fs.writeFileSync(
  reportPath,
  report.join("\n") + "\n",
  "utf8"
);

console.log("");
console.log("============================================");
console.log("穿板倒刺接头产品类型名称检查完成");
console.log("============================================");
console.log("报告：");
console.log(reportPath);
console.log("");
