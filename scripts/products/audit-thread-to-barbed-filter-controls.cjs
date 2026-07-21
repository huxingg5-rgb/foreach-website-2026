const fs = require("fs");
const path = require("path");

const root = process.cwd();

const productTypeId =
  "thread-to-barbed-fittings";

const reportPath = path.join(
  root,
  "reports",
  "thread-to-barbed-filter-control-audit.md"
);

const searchRoots = [
  path.join(
    root,
    "data",
    "products",
    "selection"
  ),
  path.join(
    root,
    "components",
    "products",
    "selection"
  ),
];

const allowedExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
]);

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

function walk(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const results = [];

  for (
    const entry
    of fs.readdirSync(
      directory,
      {
        withFileTypes: true,
      }
    )
  ) {
    if (
      [
        "node_modules",
        ".next",
        "out",
        ".git",
        "reports",
      ].includes(entry.name)
    ) {
      continue;
    }

    if (
      /\.bak(?:_|$)/i.test(
        entry.name
      )
    ) {
      continue;
    }

    const fullPath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      results.push(
        ...walk(fullPath)
      );
      continue;
    }

    if (
      allowedExtensions.has(
        path.extname(
          entry.name
        ).toLowerCase()
      )
    ) {
      results.push(fullPath);
    }
  }

  return results;
}

function contexts(
  source,
  patterns,
  before = 10,
  after = 24
) {
  const lines =
    source.split(/\r?\n/);

  const results = [];

  lines.forEach(
    (line, index) => {
      const matched =
        patterns.find(
          (pattern) => {
            if (
              typeof pattern ===
              "string"
            ) {
              return line.includes(
                pattern
              );
            }

            return pattern.test(
              line
            );
          }
        );

      if (!matched) {
        return;
      }

      results.push({
        lineNumber:
          index + 1,

        matched:
          typeof matched ===
          "string"
            ? matched
            : String(
                matched
              ),

        content:
          lines
            .slice(
              Math.max(
                0,
                index - before
              ),
              Math.min(
                lines.length,
                index + after + 1
              )
            )
            .join("\n"),
      });
    }
  );

  return results;
}

function extractJsonArray(
  source,
  exportName
) {
  const marker =
    `export const ${exportName} =`;

  const markerIndex =
    source.indexOf(
      marker
    );

  if (
    markerIndex < 0
  ) {
    return null;
  }

  const start =
    source.indexOf(
      "[",
      markerIndex +
        marker.length
    );

  if (
    start < 0
  ) {
    return null;
  }

  let depth = 0;
  let quote = "";
  let escaped = false;

  for (
    let index = start;
    index <
    source.length;
    index += 1
  ) {
    const char =
      source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (
        char === "\\"
      ) {
        escaped = true;
        continue;
      }

      if (
        char === quote
      ) {
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

    if (
      char === "["
    ) {
      depth += 1;
      continue;
    }

    if (
      char === "]"
    ) {
      depth -= 1;

      if (
        depth === 0
      ) {
        const raw =
          source.slice(
            start,
            index + 1
          );

        try {
          return JSON.parse(
            raw
          );
        } catch {
          return null;
        }
      }
    }
  }

  return null;
}

const files =
  searchRoots.flatMap(
    walk
  );

const productTypeFiles =
  files.filter(
    (filePath) =>
      read(filePath).includes(
        productTypeId
      )
  );

const generatedCandidates =
  productTypeFiles.filter(
    (filePath) =>
      /generated\.ts$/i.test(
        filePath
      )
  );

const filterLabelResults = [];

for (
  const filePath
  of generatedCandidates
) {
  const source =
    read(filePath);

  const exportNames = [
    ...source.matchAll(
      /export\s+const\s+([A-Za-z0-9_]*(?:FilterLabels|filterLabels)[A-Za-z0-9_]*)\s*=/g
    ),
  ].map(
    (match) =>
      match[1]
  );

  for (
    const exportName
    of exportNames
  ) {
    const value =
      extractJsonArray(
        source,
        exportName
      );

    if (
      !Array.isArray(
        value
      )
    ) {
      continue;
    }

    const matching =
      value.filter(
        (item) =>
          String(
            item?.productTypeId ||
            ""
          ).trim() ===
          productTypeId
      );

    if (
      matching.length
    ) {
      filterLabelResults.push({
        filePath,
        exportName,
        items:
          matching,
      });
    }
  }
}

const selectionClientCandidates =
  files.filter(
    (filePath) =>
      /ProductSelectionClient\.tsx$/i.test(
        filePath
      )
  );

const filterPanelCandidates =
  files.filter(
    (filePath) =>
      /ProductFilterPanel\.tsx$/i.test(
        filePath
      )
  );

const selectionContexts = [];

for (
  const filePath
  of selectionClientCandidates
) {
  const source =
    read(filePath);

  selectionContexts.push({
    filePath,
    contexts:
      contexts(
        source,
        [
          "getProductFilterGroupLayout",
          "inputType",
          "multiple",
          "single",
          "radio",
          "checkbox",
          "thread-to-barbed-fittings",
          "group.layout",
        ],
        12,
        32
      ),
  });
}

const panelContexts = [];

for (
  const filePath
  of filterPanelCandidates
) {
  const source =
    read(filePath);

  panelContexts.push({
    filePath,
    contexts:
      contexts(
        source,
        [
          /type=["']radio["']/,
          /type=["']checkbox["']/,
          /inputType/,
          /multiple/,
          /single/,
          /layout/,
          /shouldUseTwoColumns/,
          /optionGrid/,
          /radio/,
          /checkbox/,
        ],
        14,
        36
      ),
  });
}

const allProductTypeContexts = [];

for (
  const filePath
  of productTypeFiles
) {
  const source =
    read(filePath);

  const matched =
    contexts(
      source,
      [
        productTypeId,
        "密封方式",
        "连接结构",
        "螺纹规格",
        "接管内径",
        "材质",
        "颜色",
      ],
      8,
      18
    );

  if (
    matched.length
  ) {
    allProductTypeContexts.push({
      filePath,
      contexts:
        matched,
    });
  }
}

const report = [];

report.push(
  "# 螺纹转倒刺接头筛选控件检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "## 一、目标交互"
);
report.push("");

report.push(
  "- 密封方式：圆形单选"
);
report.push(
  "- 密封方式选项：两个一排"
);
report.push(
  "- 连接结构：方形多选"
);
report.push(
  "- 螺纹规格：方形多选"
);
report.push(
  "- 接管内径：方形多选"
);
report.push(
  "- 材质：方形多选"
);
report.push(
  "- 颜色：方形多选"
);
report.push("");

report.push(
  "## 二、命中产品类型的文件"
);
report.push("");

for (
  const filePath
  of productTypeFiles
) {
  report.push(
    `- ${relative(filePath)}`
  );
}

report.push("");

report.push(
  "## 三、当前筛选标签配置"
);
report.push("");

if (
  !filterLabelResults.length
) {
  report.push(
    "- 未解析到对应FilterLabels数组"
  );
  report.push("");
}

for (
  const result
  of filterLabelResults
) {
  report.push(
    `### ${relative(result.filePath)}｜${result.exportName}`
  );
  report.push("");
  report.push("```json");
  report.push(
    JSON.stringify(
      result.items,
      null,
      2
    )
  );
  report.push("```");
  report.push("");
}

report.push(
  "## 四、ProductSelectionClient筛选组生成逻辑"
);
report.push("");

for (
  const result
  of selectionContexts
) {
  report.push(
    `### ${relative(result.filePath)}`
  );
  report.push("");

  for (
    const item
    of result.contexts.slice(
      0,
      50
    )
  ) {
    report.push(
      `#### 第${item.lineNumber}行附近`
    );
    report.push("");
    report.push("```tsx");
    report.push(
      item.content
    );
    report.push("```");
    report.push("");
  }
}

report.push(
  "## 五、ProductFilterPanel控件渲染逻辑"
);
report.push("");

for (
  const result
  of panelContexts
) {
  report.push(
    `### ${relative(result.filePath)}`
  );
  report.push("");

  for (
    const item
    of result.contexts.slice(
      0,
      60
    )
  ) {
    report.push(
      `#### 第${item.lineNumber}行附近`
    );
    report.push("");
    report.push("```tsx");
    report.push(
      item.content
    );
    report.push("```");
    report.push("");
  }
}

report.push(
  "## 六、产品类型相关上下文"
);
report.push("");

for (
  const result
  of allProductTypeContexts
) {
  report.push(
    `### ${relative(result.filePath)}`
  );
  report.push("");

  for (
    const item
    of result.contexts.slice(
      0,
      40
    )
  ) {
    report.push(
      `#### 第${item.lineNumber}行附近`
    );
    report.push("");
    report.push("```ts");
    report.push(
      item.content
    );
    report.push("```");
    report.push("");
  }
}

report.push(
  "## 七、下一步修改边界"
);
report.push("");

report.push(
  "- 优先修改该产品类型自己的FilterLabels配置"
);
report.push(
  "- 只有公共组件未读取inputType或layout时才小改公共组件"
);
report.push(
  "- 不修改其他接头类型的筛选交互"
);
report.push(
  "- 不修改CSS，继续复用现有圆形单选与方形多选样式"
);
report.push("");

fs.mkdirSync(
  path.dirname(
    reportPath
  ),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  reportPath,
  report.join("\n") +
    "\n",
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "螺纹转倒刺接头筛选控件检查完成"
);
console.log(
  "============================================"
);
console.log(
  "命中文件：",
  productTypeFiles.length
);
console.log(
  "筛选标签配置：",
  filterLabelResults.length
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
