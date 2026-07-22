const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targets = [
  {
    title:
      "内螺纹互转接头生成数据",
    filePath: path.join(
      root,
      "data",
      "products",
      "selection",
      "female-thread-adapter-selection.generated.ts"
    ),
    patterns: [
      "femaleThreadAdapterSelectionProducts",
      "femaleThreadAdapterFilterLabels",
      "femaleThreadAdapterTaxonomyItems",
      '"productTypeId": "female-thread-adapters"',
      '"filter01"',
      '"filter02"',
      '"filter03"',
      '"filter04"',
      '"filter05"',
      "|",
    ],
  },
  {
    title:
      "内螺纹互转接头生成汇总",
    filePath: path.join(
      root,
      "data",
      "products",
      "selection",
      "female-thread-adapter-selection.summary.json"
    ),
    patterns: [
      "productCount",
      "matchedProductImageCount",
      "mappedProductDrawingCount",
      "missingProductImageCount",
      "missingProductDrawingCount",
      "structureCounts",
      "threadValueCounts",
      "materialCounts",
      "colorCounts",
    ],
  },
  {
    title:
      "筛选页面客户端",
    filePath: path.join(
      root,
      "components",
      "products",
      "selection",
      "ProductSelectionClient.tsx"
    ),
    patterns: [
      "luerFittingSelectionProducts",
      "threadToBarbedFittingSelectionProducts",
      "barbedFittingSelectionProducts",
      "hardTubeFittingSelectionProducts",
      "const selectionProducts",
      "const selectionFilterLabels",
      "const selectionTaxonomyItems",
      "splitFilterValues",
      "isProductFilterOptionDisabled",
      "luer-fittings",
      "thread-to-barbed-fittings",
      "female-thread-adapters",
      "detailSlug",
      "makeDetailHref",
    ],
  },
  {
    title:
      "筛选面板",
    filePath: path.join(
      root,
      "components",
      "products",
      "selection",
      "ProductFilterPanel.tsx"
    ),
    patterns: [
      "shouldUseTwoColumns",
      "isLuerFitting",
      "filter01",
      "filter02",
      "filter03",
      "filter04",
      "filter05",
      "isOptionDisabled",
      "disabled",
      "activeProductTypeId",
      "data-product-type-id",
    ],
  },
  {
    title:
      "产品路由表",
    filePath: path.join(
      root,
      "data",
      "products",
      "selection",
      "product-route-map.ts"
    ),
    patterns: [
      '"female-thread-adapters"',
      'productTypeId: "female-thread-adapters"',
      "getProductTypeHrefByIds",
      "getProductTypeFilterOptionsByCategory",
    ],
  },
  {
    title:
      "通用产品类型页面",
    filePath: path.join(
      root,
      "app",
      "products",
      "[category]",
      "[slug]",
      "page.tsx"
    ),
    patterns: [
      "getProductTypeRouteParams",
      "resolveProductTypeRoute",
      "ProductSelectionClient",
    ],
  },
  {
    title:
      "通用详情路由",
    filePath: path.join(
      root,
      "app",
      "products",
      "[category]",
      "[slug]",
      "[seriesSlug]",
      "page.tsx"
    ),
    patterns: [
      "female-thread-adapters",
      "hard-tube-fittings",
      "barbed-fittings",
      "thread-to-barbed-fittings",
      "generateStaticParams",
      "detailSlug",
    ],
  },
];

const reportPath = path.join(
  root,
  "reports",
  "female-thread-adapter-selection-integration-audit.md"
);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(
    filePath,
    "utf8"
  );
}

function escapeMarkdown(value) {
  return String(value)
    .replace(/`/g, "\\`");
}

function findContext(
  source,
  pattern,
  contextLines = 8
) {
  const lines =
    source.split(/\r?\n/);

  const indexes = [];

  lines.forEach(
    (line, index) => {
      if (
        line.includes(pattern)
      ) {
        indexes.push(index);
      }
    }
  );

  if (!indexes.length) {
    return [];
  }

  const ranges = [];

  for (const index of indexes) {
    const start =
      Math.max(
        0,
        index - contextLines
      );

    const end =
      Math.min(
        lines.length - 1,
        index + contextLines
      );

    const previous =
      ranges[
        ranges.length - 1
      ];

    if (
      previous &&
      start <= previous.end + 1
    ) {
      previous.end =
        Math.max(
          previous.end,
          end
        );
    } else {
      ranges.push({
        start,
        end,
      });
    }
  }

  return ranges.map(
    ({ start, end }) =>
      lines
        .slice(start, end + 1)
        .map(
          (line, offset) =>
            `${String(
              start +
                offset +
                1
            ).padStart(5, " ")} | ${line}`
        )
        .join("\n")
  );
}

const report = [];

report.push(
  "# 内螺纹互转接头筛选页面接入检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只检查，没有修改项目代码。"
);
report.push("");

for (const target of targets) {
  report.push(
    `## ${target.title}`
  );
  report.push("");

  report.push(
    `文件：\`${target.filePath}\``
  );
  report.push("");

  const source =
    read(target.filePath);

  if (source == null) {
    report.push(
      "状态：**文件不存在**"
    );
    report.push("");
    continue;
  }

  const lines =
    source.split(/\r?\n/);

  report.push(
    `- 文件大小：${Buffer.byteLength(source, "utf8")} bytes`
  );
  report.push(
    `- 总行数：${lines.length}`
  );
  report.push("");

  if (
    target.title ===
    "内螺纹互转接头生成数据"
  ) {
    const productCount =
      (
        source.match(
          /"productId":/g
        ) || []
      ).length;

    const filter02PipeCount =
      (
        source.match(
          /"filter02":\s*"[^"]*\|[^"]*"/g
        ) || []
      ).length;

    report.push(
      `- 产品记录数：**${productCount}**`
    );
    report.push(
      `- 多螺纹产品数：**${filter02PipeCount}**`
    );
    report.push("");
  }

  for (
    const pattern
    of target.patterns
  ) {
    const contexts =
      findContext(
        source,
        pattern
      );

    report.push(
      `### 搜索：\`${escapeMarkdown(pattern)}\``
    );
    report.push("");

    if (!contexts.length) {
      report.push(
        "未找到。"
      );
      report.push("");
      continue;
    }

    contexts
      .slice(0, 8)
      .forEach(
        (context) => {
          report.push(
            "```ts"
          );
          report.push(
            context
          );
          report.push(
            "```"
          );
          report.push("");
        }
      );

    if (
      contexts.length > 8
    ) {
      report.push(
        `其余 ${contexts.length - 8} 处已省略。`
      );
      report.push("");
    }
  }
}

report.push(
  "## 自动判断"
);
report.push("");

const generatedPath =
  targets[0].filePath;

const clientPath =
  targets[2].filePath;

const panelPath =
  targets[3].filePath;

const routeMapPath =
  targets[4].filePath;

const generatedSource =
  read(generatedPath) || "";

const clientSource =
  read(clientPath) || "";

const panelSource =
  read(panelPath) || "";

const routeMapSource =
  read(routeMapPath) || "";

const generatedCount =
  (
    generatedSource.match(
      /"productId":/g
    ) || []
  ).length;

const checks = [
  {
    label:
      "生成产品数量为24",
    passed:
      generatedCount === 24,
  },
  {
    label:
      "已生成产品数组",
    passed:
      generatedSource.includes(
        "femaleThreadAdapterSelectionProducts"
      ),
  },
  {
    label:
      "已生成筛选标签",
    passed:
      generatedSource.includes(
        "femaleThreadAdapterFilterLabels"
      ),
  },
  {
    label:
      "已生成分类数据",
    passed:
      generatedSource.includes(
        "femaleThreadAdapterTaxonomyItems"
      ),
  },
  {
    label:
      "路由表已有内螺纹互转接头",
    passed:
      routeMapSource.includes(
        '"female-thread-adapters"'
      ),
  },
  {
    label:
      "筛选页面尚未导入内螺纹互转数据",
    passed:
      !clientSource.includes(
        "femaleThreadAdapterSelectionProducts"
      ),
  },
  {
    label:
      "筛选代码支持拆分多个值",
    passed:
      clientSource.includes(
        "splitFilterValues"
      ),
  },
  {
    label:
      "筛选面板存在两列布局判断",
    passed:
      panelSource.includes(
        "shouldUseTwoColumns"
      ),
  },
];

for (const check of checks) {
  report.push(
    `- ${check.passed ? "✅" : "❌"} ${check.label}`
  );
}

report.push("");
report.push(
  "## 预计接入内容"
);
report.push("");

report.push("```text");
report.push(
  "1. 导入 femaleThreadAdapterSelectionProducts"
);
report.push(
  "2. 导入 femaleThreadAdapterFilterLabels"
);
report.push(
  "3. 导入 femaleThreadAdapterTaxonomyItems"
);
report.push(
  "4. 合并进现有产品、筛选标签、分类数组"
);
report.push(
  "5. 连接结构使用单列"
);
report.push(
  "6. 螺纹规格、流道内径、材质、颜色使用两列"
);
report.push(
  "7. 接入双向联动置灰"
);
report.push(
  "8. 本阶段不创建详情页"
);
report.push("```");
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
  "内螺纹互转接头接入检查完成"
);
console.log(
  "============================================"
);
console.log(
  `生成产品数量：${generatedCount}`
);
console.log(
  `报告：${reportPath}`
);
console.log("");
console.log(
  "本次未修改任何网站文件。"
);
