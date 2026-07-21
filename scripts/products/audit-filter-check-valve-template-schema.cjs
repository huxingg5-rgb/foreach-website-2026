const fs = require("fs");
const path = require("path");

const root = process.cwd();

const selectionTemplates = [
  path.join(
    root,
    "data",
    "products",
    "selection",
    "barbed-fitting-selection.generated.ts"
  ),
  path.join(
    root,
    "data",
    "products",
    "selection",
    "quick-connect-fitting-selection.generated.ts"
  ),
];

const detailTemplates = [
  path.join(
    root,
    "data",
    "products",
    "generated",
    "fittings",
    "barbed-fittings",
    "detail",
    "index.json"
  ),
  path.join(
    root,
    "data",
    "products",
    "generated",
    "fittings",
    "quick-connect-fittings",
    "detail",
    "index.json"
  ),
];

const contextFiles = [
  {
    filePath: path.join(
      root,
      "components",
      "products",
      "selection",
      "product-selection-ui.types.ts"
    ),
    keywords: [
      "ProductSelectionProduct",
      "ProductSelectionFilterGroup",
      "ProductSelectionTaxonomy",
    ],
  },
  {
    filePath: path.join(
      root,
      "components",
      "products",
      "selection",
      "ProductSelectionClient.tsx"
    ),
    keywords: [
      "barbed-fitting-selection",
      "quick-connect-fitting-selection",
      "barbedFittingSelectionProducts",
      "quickConnectFittingSelectionProducts",
      "allProducts",
      "selectionProducts",
    ],
  },
  {
    filePath: path.join(
      root,
      "app",
      "products",
      "[category]",
      "[slug]",
      "[seriesSlug]",
      "page.tsx"
    ),
    keywords: [
      "barbedFitting",
      "quickConnect",
      "barbed-fittings",
      "quick-connect-fittings",
      "findFittingDetail",
      "generateStaticParams",
    ],
  },
];

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-template-schema-audit.md"
);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    return "";
  }

  return fs.readFileSync(
    filePath,
    "utf8"
  );
}

function relative(filePath) {
  return path
    .relative(root, filePath)
    .replace(/\\/g, "/");
}

function extractExportArrays(source) {
  const results = [];

  const pattern =
    /export\s+const\s+([A-Za-z0-9_$]+)/g;

  let match;

  while (
    (
      match =
        pattern.exec(source)
    )
  ) {
    const exportName =
      match[1];

    const equalIndex =
      source.indexOf(
        "=",
        match.index
      );

    if (equalIndex < 0) {
      continue;
    }

    const arrayStart =
      source.indexOf(
        "[",
        equalIndex
      );

    if (arrayStart < 0) {
      continue;
    }

    let depth = 0;
    let quote = "";
    let escaped = false;
    let lineComment = false;
    let blockComment = false;
    let arrayEnd = -1;

    for (
      let index = arrayStart;
      index < source.length;
      index += 1
    ) {
      const char =
        source[index];

      const next =
        source[index + 1];

      if (lineComment) {
        if (char === "\n") {
          lineComment = false;
        }

        continue;
      }

      if (blockComment) {
        if (
          char === "*" &&
          next === "/"
        ) {
          blockComment = false;
          index += 1;
        }

        continue;
      }

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
        char === "/" &&
        next === "/"
      ) {
        lineComment = true;
        index += 1;
        continue;
      }

      if (
        char === "/" &&
        next === "*"
      ) {
        blockComment = true;
        index += 1;
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
      } else if (char === "]") {
        depth -= 1;

        if (depth === 0) {
          arrayEnd =
            index + 1;
          break;
        }
      }
    }

    if (arrayEnd < 0) {
      continue;
    }

    try {
      const value =
        JSON.parse(
          source.slice(
            arrayStart,
            arrayEnd
          )
        );

      if (Array.isArray(value)) {
        results.push({
          exportName,
          value,
        });
      }
    } catch {
      // 非纯JSON数组跳过。
    }
  }

  return results;
}

function getContexts(
  source,
  keywords,
  before = 10,
  after = 22
) {
  const lines =
    source.split(/\r?\n/);

  const ranges = [];

  lines.forEach(
    (line, lineIndex) => {
      if (
        !keywords.some(
          (keyword) =>
            line.includes(keyword)
        )
      ) {
        return;
      }

      ranges.push({
        start:
          Math.max(
            0,
            lineIndex - before
          ),

        end:
          Math.min(
            lines.length - 1,
            lineIndex + after
          ),
      });
    }
  );

  const merged = [];

  for (
    const range
    of ranges.sort(
      (a, b) =>
        a.start - b.start
    )
  ) {
    const previous =
      merged[
        merged.length - 1
      ];

    if (
      previous &&
      range.start <=
        previous.end + 2
    ) {
      previous.end =
        Math.max(
          previous.end,
          range.end
        );
    } else {
      merged.push({
        ...range,
      });
    }
  }

  return merged.map(
    (range) =>
      lines
        .slice(
          range.start,
          range.end + 1
        )
        .map(
          (line, offset) =>
            `${String(
              range.start +
              offset +
              1
            ).padStart(5, " ")} | ${line}`
        )
        .join("\n")
  );
}

const report = [];

report.push(
  "# 过滤器与单向阀生成模板结构检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只读取现有文件，没有修改项目。"
);
report.push("");

report.push(
  "## 1. 选型数据模板"
);
report.push("");

for (
  const filePath
  of selectionTemplates
) {
  report.push(
    `### ${relative(filePath)}`
  );
  report.push("");

  if (!fs.existsSync(filePath)) {
    report.push("文件不存在。");
    report.push("");
    continue;
  }

  const arrays =
    extractExportArrays(
      read(filePath)
    );

  for (
    const item
    of arrays
  ) {
    report.push(
      `#### ${item.exportName}`
    );
    report.push("");

    report.push(
      `- 数量：${item.value.length}`
    );

    const sample =
      item.value[0];

    report.push(
      `- 首条字段：${
        sample &&
        typeof sample === "object"
          ? Object.keys(
              sample
            ).join("、")
          : "无"
      }`
    );
    report.push("");

    report.push("```json");
    report.push(
      JSON.stringify(
        sample || null,
        null,
        2
      )
    );
    report.push("```");
    report.push("");
  }
}

report.push(
  "## 2. 详情数据模板"
);
report.push("");

for (
  const filePath
  of detailTemplates
) {
  report.push(
    `### ${relative(filePath)}`
  );
  report.push("");

  if (!fs.existsSync(filePath)) {
    report.push("文件不存在。");
    report.push("");
    continue;
  }

  const values =
    JSON.parse(
      read(filePath)
    );

  const sample =
    Array.isArray(values)
      ? values[0]
      : null;

  report.push(
    `- 数量：${
      Array.isArray(values)
        ? values.length
        : 0
    }`
  );

  report.push(
    `- 首条字段：${
      sample
        ? Object.keys(
            sample
          ).join("、")
        : "无"
    }`
  );
  report.push("");

  report.push("```json");
  report.push(
    JSON.stringify(
      sample,
      null,
      2
    )
  );
  report.push("```");
  report.push("");
}

report.push(
  "## 3. 类型、选型汇总与详情路由"
);
report.push("");

for (
  const item
  of contextFiles
) {
  report.push(
    `### ${relative(item.filePath)}`
  );
  report.push("");

  if (!fs.existsSync(item.filePath)) {
    report.push("文件不存在。");
    report.push("");
    continue;
  }

  const contexts =
    getContexts(
      read(item.filePath),
      item.keywords
    );

  if (!contexts.length) {
    report.push(
      "未找到关键词上下文。"
    );
    report.push("");
    continue;
  }

  for (
    const context
    of contexts
  ) {
    report.push("```tsx");
    report.push(context);
    report.push("```");
    report.push("");
  }
}

report.push(
  "## 4. 正式生成口径"
);
report.push("");

report.push(
  "- Excel原始行：38"
);
report.push(
  "- 去除完全重复商业产品后：36个SKU"
);
report.push(
  "- 按型号归并后：34个详情页"
);
report.push(
  "- 无型号组件：使用商品编码作为页面标识"
);
report.push(
  "- 过滤器内部类型：`filters`"
);
report.push(
  "- 单向阀内部类型：`check-valves`"
);
report.push(
  "- 前台入口：过滤器与单向阀"
);
report.push(
  "- 通用PDF模糊匹配结果不得绑定"
);
report.push("");

fs.mkdirSync(
  path.dirname(reportPath),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  reportPath,
  report.join("\n") + "\n",
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "过滤器与单向阀模板结构检查完成"
);
console.log(
  "============================================"
);
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
console.log(
  "本次没有修改任何项目文件。"
);
