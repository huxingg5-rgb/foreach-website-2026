const fs = require("fs");
const path = require("path");

const root = process.cwd();

const desiredOrder = [
  {
    id: "hard-tube-fittings",
    label: "硬管接头",
  },
  {
    id: "barbed-fittings",
    label: "倒刺接头",
  },
  {
    id: "thread-to-barbed-fittings",
    label: "螺纹转倒刺接头",
  },
  {
    id: "luer-fittings",
    label: "鲁尔接头",
  },
  {
    id: "quick-connect-fittings",
    label: "快插接头",
  },
  {
    id: "female-thread-adapters",
    label: "内螺纹互转接头",
  },
  {
    id: "bulkhead-barbed-fittings",
    label: "穿板倒刺接头",
  },
  {
    id: "filters",
    label: "过滤器与单向阀",
  },
];

const desiredIds = new Set(
  desiredOrder.map((item) => item.id)
);

const desiredLabels = new Set(
  desiredOrder.map((item) => item.label)
);

const oldOrRelatedLabels = [
  "倒钩接头",
  "过滤止回阀",
  "面板安装接头",
  "螺纹倒钩接头",
  "直通接头",
  "过滤器与单向阀",
  "过滤器和单向阀",
  "内螺纹互转接头",
  "穿板倒刺接头",
  "硬管接头",
  "倒刺接头",
  "螺纹转倒刺接头",
  "鲁尔接头",
  "快插接头",
];

const routeMapPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "product-route-map.ts"
);

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const reportPath = path.join(
  root,
  "reports",
  "fitting-navigation-and-filter-order-audit.md"
);

const searchRoots = [
  path.join(root, "components"),
  path.join(root, "data"),
  path.join(root, "app"),
];

const allowedExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
]);

function text(value) {
  return String(value ?? "").trim();
}

function relative(filePath) {
  return path
    .relative(root, filePath)
    .replace(/\\/g, "/");
}

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    return "";
  }

  return fs.readFileSync(filePath, "utf8");
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
      /\.bak(?:_|$)/i.test(entry.name)
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
        path.extname(entry.name).toLowerCase()
      )
    ) {
      results.push(fullPath);
    }
  }

  return results;
}

function contexts(
  source,
  matchers,
  before = 8,
  after = 16
) {
  const lines = source.split(/\r?\n/);
  const results = [];

  lines.forEach(
    (line, index) => {
      const matched =
        matchers.find(
          (matcher) => {
            if (
              typeof matcher === "string"
            ) {
              return line.includes(matcher);
            }

            return matcher.test(line);
          }
        );

      if (!matched) {
        return;
      }

      results.push({
        lineNumber:
          index + 1,

        matched:
          typeof matched === "string"
            ? matched
            : String(matched),

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

function parseProductTypeEntries(
  source
) {
  const blockStart =
    source.indexOf(
      "productTypes: {"
    );

  if (blockStart < 0) {
    return [];
  }

  const blockEnd =
    source.indexOf(
      "\n  },\n\n  series:",
      blockStart
    );

  if (blockEnd < 0) {
    return [];
  }

  const block =
    source.slice(
      blockStart,
      blockEnd
    );

  const entryRegex =
    /"([^"]+)":\s*\{([\s\S]*?)\n\s{4}\},/g;

  const entries = [];

  let match;

  while (
    (
      match =
        entryRegex.exec(block)
    )
  ) {
    const slug =
      match[1];

    const body =
      match[2];

    const category =
      body.match(
        /category:\s*"([^"]+)"/
      )?.[1] || "";

    if (
      category !== "fittings"
    ) {
      continue;
    }

    const productTypeId =
      body.match(
        /productTypeId:\s*"([^"]+)"/
      )?.[1] || "";

    const label =
      body.match(
        /label:\s*"([^"]+)"/
      )?.[1] || "";

    entries.push({
      slug,
      productTypeId,
      label,
      order:
        entries.length + 1,
    });
  }

  return entries;
}

function parseTaxonomyArrays(
  filePath,
  source
) {
  const exports = [
    ...source.matchAll(
      /export\s+const\s+([A-Za-z0-9_]*Taxonomy[A-Za-z0-9_]*)\s*=/g
    ),
  ].map(
    (match) =>
      match[1]
  );

  const results = [];

  for (
    const exportName
    of exports
  ) {
    const marker =
      `export const ${exportName} =`;

    const markerIndex =
      source.indexOf(marker);

    const start =
      source.indexOf(
        "[",
        markerIndex + marker.length
      );

    if (start < 0) {
      continue;
    }

    let depth = 0;
    let quote = "";
    let escaped = false;
    let end = -1;

    for (
      let index = start;
      index < source.length;
      index += 1
    ) {
      const char =
        source[index];

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
      } else if (
        char === "]"
      ) {
        depth -= 1;

        if (depth === 0) {
          end =
            index + 1;
          break;
        }
      }
    }

    if (end < 0) {
      continue;
    }

    const raw =
      source.slice(
        start,
        end
      );

    try {
      const value =
        JSON.parse(raw);

      if (
        !Array.isArray(value)
      ) {
        continue;
      }

      for (
        const item
        of value
      ) {
        const id =
          text(
            item?.id ||
            item?.productTypeId
          );

        const labelValue =
          item?.label ||
          item?.productTypeLabel ||
          item?.productTypeName;

        const label =
          typeof labelValue ===
          "string"
            ? labelValue
            : text(
                labelValue?.zh ||
                labelValue?.["zh-CN"]
              );

        if (
          desiredIds.has(id) ||
          desiredLabels.has(label) ||
          oldOrRelatedLabels.includes(label)
        ) {
          results.push({
            file:
              relative(filePath),
            exportName,
            type:
              text(item?.type),
            id,
            label,
            sortOrder:
              item?.sortOrder ?? "",
            raw:
              item,
          });
        }
      }
    } catch {
      // 不是纯JSON数组，保留给上下文扫描。
    }
  }

  return results;
}

function detectNavigationCandidates(
  files
) {
  const results = [];

  for (
    const filePath
    of files
  ) {
    const source =
      read(filePath);

    const hitCount =
      oldOrRelatedLabels.reduce(
        (count, label) =>
          count +
          (
            source.includes(label)
              ? 1
              : 0
          ),
        0
      );

    const looksLikeNavigation =
      /mega|menu|nav|navigation|header/i.test(
        relative(filePath)
      ) ||
      /MegaMenu|导航|菜单|产品中心/i.test(
        source
      );

    if (
      hitCount >= 2 &&
      looksLikeNavigation
    ) {
      results.push({
        filePath,
        hitCount,
        contexts:
          contexts(
            source,
            oldOrRelatedLabels,
            10,
            24
          ),
      });
    }
  }

  return results.sort(
    (a, b) =>
      b.hitCount -
      a.hitCount
  );
}

const allFiles =
  searchRoots.flatMap(
    walk
  );

const routeMapSource =
  read(routeMapPath);

const clientSource =
  read(clientPath);

const routeEntries =
  parseProductTypeEntries(
    routeMapSource
  );

const taxonomyEntries =
  allFiles.flatMap(
    (filePath) =>
      parseTaxonomyArrays(
        filePath,
        read(filePath)
      )
  );

const navigationCandidates =
  detectNavigationCandidates(
    allFiles
  );

const clientOrderContexts =
  contexts(
    clientSource,
    [
      "selectionTaxonomyItems",
      "getProductTypeFilterOptionsByCategory",
      "sortOrder",
      "productTypeOptions",
      "productTypeId",
      "getTaxonomyLabel",
    ],
    12,
    35
  );

const exactLiteralHits = [];

for (
  const filePath
  of allFiles
) {
  const source =
    read(filePath);

  const lines =
    source.split(/\r?\n/);

  for (
    const label
    of oldOrRelatedLabels
  ) {
    lines.forEach(
      (line, index) => {
        if (
          line.includes(label)
        ) {
          exactLiteralHits.push({
            file:
              relative(filePath),

            line:
              index + 1,

            label,

            content:
              line.trim(),
          });
        }
      }
    );
  }
}

const report = [];

report.push(
  "# 接头导航与产品种类顺序检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "## 一、目标顺序与名称"
);
report.push("");

desiredOrder.forEach(
  (item, index) => {
    report.push(
      `${index + 1}. ${item.label}（${item.id}）`
    );
  }
);

report.push("");

report.push(
  "## 二、product-route-map.ts 当前接头顺序"
);
report.push("");

if (
  routeEntries.length
) {
  report.push(
    "| 当前顺序 | slug | productTypeId | 名称 |"
  );
  report.push(
    "|---:|---|---|---|"
  );

  for (
    const item
    of routeEntries
  ) {
    report.push(
      `| ${item.order} | ${item.slug} | ${item.productTypeId} | ${item.label} |`
    );
  }
} else {
  report.push(
    "- 未解析到接头productTypes"
  );
}

report.push("");

report.push(
  "## 三、各生成文件中的产品类型taxonomy"
);
report.push("");

if (
  taxonomyEntries.length
) {
  report.push(
    "| 文件 | 导出 | type | id | 名称 | sortOrder |"
  );
  report.push(
    "|---|---|---|---|---|---:|"
  );

  for (
    const item
    of taxonomyEntries
  ) {
    report.push(
      `| ${item.file} | ${item.exportName} | ${item.type} | ${item.id} | ${item.label} | ${item.sortOrder} |`
    );
  }
} else {
  report.push(
    "- 没有解析到相关taxonomy"
  );
}

report.push("");

report.push(
  "## 四、ProductSelectionClient中的排序与名称来源"
);
report.push("");

for (
  const item
  of clientOrderContexts.slice(
    0,
    50
  )
) {
  report.push(
    `### 第${item.lineNumber}行附近`
  );
  report.push("");
  report.push("```tsx");
  report.push(
    item.content
  );
  report.push("```");
  report.push("");
}

report.push(
  "## 五、导航候选文件"
);
report.push("");

if (
  !navigationCandidates.length
) {
  report.push(
    "- 未找到明显的导航候选文件"
  );
  report.push("");
}

for (
  const candidate
  of navigationCandidates.slice(
    0,
    20
  )
) {
  report.push(
    `### ${relative(candidate.filePath)}`
  );
  report.push("");
  report.push(
    `- 命中相关名称：${candidate.hitCount}`
  );
  report.push("");

  for (
    const item
    of candidate.contexts.slice(
      0,
      30
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
  "## 六、所有相关名称命中位置"
);
report.push("");

for (
  const hit
  of exactLiteralHits
) {
  report.push(
    `- ${hit.file}:${hit.line}｜${hit.label}｜\`${hit.content.replace(/`/g, "\\`")}\``
  );
}

report.push("");

report.push(
  "## 七、检查结论待确认项"
);
report.push("");

report.push(
  "- 导航页实际数据源文件"
);
report.push(
  "- 左侧产品种类顺序由taxonomy的sortOrder、路由映射顺序，还是单独排序逻辑控制"
);
report.push(
  "- 旧名称“倒钩接头、过滤止回阀、面板安装接头、螺纹倒钩接头、直通接头”所在文件"
);
report.push(
  "- 是否需要同步修改导航图片与说明文字"
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
  "接头导航与产品种类顺序检查完成"
);
console.log(
  "============================================"
);
console.log(
  "product-route-map接头类型：",
  routeEntries.length
);
console.log(
  "相关taxonomy：",
  taxonomyEntries.length
);
console.log(
  "导航候选文件：",
  navigationCandidates.length
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
