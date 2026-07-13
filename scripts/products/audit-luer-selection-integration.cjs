const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "data/products/selection/product-selection.generated.ts",
  "data/products/selection/product-route-map.ts",
  "components/products/selection/ProductSelectionClient.tsx",
  "components/products/selection/ProductFilterPanel.tsx",
  "data/products/selection/luer-fitting-selection.generated.ts",
];

const reportPath = path.join(
  root,
  "reports",
  "luer-fitting-selection-integration-audit.md"
);

const patterns = [
  "luer",
  "鲁尔",
  "hardTube",
  "threadToBarbed",
  "thread-to-barbed",
  "hard-tube-fittings",
  "selectionProducts",
  "selectionFilterLabels",
  "selectionTaxonomyItems",
  "getSeriesRouteParams",
  "resolveSeriesRoute",
  "productTypeId",
  "filter01",
];

function readFile(relativePath) {
  const absolutePath = path.join(
    root,
    relativePath
  );

  if (!fs.existsSync(absolutePath)) {
    return {
      relativePath,
      absolutePath,
      exists: false,
      content: "",
    };
  }

  return {
    relativePath,
    absolutePath,
    exists: true,
    content: fs.readFileSync(
      absolutePath,
      "utf8"
    ),
  };
}

function collectMatches(content) {
  const lines = content.split(/\r?\n/);
  const matchedIndexes = new Set();

  lines.forEach((line, index) => {
    const lower = line.toLowerCase();

    const matched = patterns.some(
      (pattern) =>
        lower.includes(
          pattern.toLowerCase()
        )
    );

    if (!matched) {
      return;
    }

    for (
      let contextIndex = Math.max(0, index - 4);
      contextIndex <= Math.min(lines.length - 1, index + 8);
      contextIndex += 1
    ) {
      matchedIndexes.add(contextIndex);
    }
  });

  return Array.from(matchedIndexes)
    .sort((a, b) => a - b)
    .map((index) => ({
      lineNumber: index + 1,
      text: lines[index],
    }));
}

const report = [];

report.push(
  "# 鲁尔接头筛选页面接入检查"
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

for (const relativePath of files) {
  const file = readFile(relativePath);

  report.push(
    `## ${relativePath}`
  );
  report.push("");

  if (!file.exists) {
    report.push("文件不存在。");
    report.push("");
    continue;
  }

  report.push(
    `- 文件大小：${Buffer.byteLength(file.content, "utf8")} bytes`
  );
  report.push(
    `- 总行数：${file.content.split(/\r?\n/).length}`
  );
  report.push("");

  const matches =
    collectMatches(file.content);

  if (!matches.length) {
    report.push(
      "没有匹配到目标关键词。"
    );
    report.push("");
    continue;
  }

  report.push("```ts");

  let previousLine = 0;

  for (const item of matches) {
    if (
      previousLine &&
      item.lineNumber >
        previousLine + 1
    ) {
      report.push("...");
    }

    report.push(
      `${String(item.lineNumber).padStart(5, " ")} | ${item.text}`
    );

    previousLine =
      item.lineNumber;
  }

  report.push("```");
  report.push("");
}

const luerGeneratedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "luer-fitting-selection.generated.ts"
);

if (fs.existsSync(luerGeneratedPath)) {
  const content = fs.readFileSync(
    luerGeneratedPath,
    "utf8"
  );

  const productCount =
    (
      content.match(
        /"productId":/g
      ) || []
    ).length;

  const filterLabelCount =
    (
      content.match(
        /"filterKey":/g
      ) || []
    ).length;

  report.push(
    "## 鲁尔接头生成数据确认"
  );
  report.push("");
  report.push(
    `- 产品记录：${productCount}`
  );
  report.push(
    `- 筛选标签：${filterLabelCount}`
  );
  report.push(
    `- 包含 productTypeId=luer-fittings：${content.includes('"productTypeId": "luer-fittings"')}`
  );
  report.push("");
}

report.push("## 下一步");
report.push("");
report.push(
  "根据当前聚合文件的实际结构，将鲁尔接头的产品、筛选标签和产品分类追加进去，并补充产品中心路由。"
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
  "鲁尔接头接入点检查完成"
);
console.log(
  "============================================"
);
console.log(
  `报告：${reportPath}`
);
console.log("");
console.log(
  "本次未修改项目代码。"
);
