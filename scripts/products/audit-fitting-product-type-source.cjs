const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetFiles = [
  "components/products/selection/ProductFilterPanel.tsx",
  "components/products/selection/ProductSelectionClient.tsx",
  "data/products/selection/product-route-map.ts",
];

const searchDirectories = [
  "components/products/selection",
  "data/products/selection",
];

const reportPath = path.join(
  root,
  "reports",
  "fitting-product-type-source-audit.md"
);

const patterns = [
  "堵头",
  "过滤器",
  "单向阀",
  "过滤器与单向阀",
  "plug",
  "filter",
  "check-valve",
  "checkValve",
  "productTypeOptions",
  "productTypes",
  "taxonomyItems",
  "filterLabels",
  "typeOptions",
  "productTypeId",
];

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

  const result = [];

  for (
    const entry
    of fs.readdirSync(
      directory,
      {
        withFileTypes: true,
      }
    )
  ) {
    const fullPath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      result.push(
        ...walk(fullPath)
      );
    } else if (
      entry.isFile() &&
      /\.(ts|tsx|json)$/i.test(
        entry.name
      )
    ) {
      result.push(fullPath);
    }
  }

  return result;
}

function getContext(
  source,
  lineIndex,
  before = 10,
  after = 16
) {
  const lines =
    source.split(/\r?\n/);

  const start =
    Math.max(
      0,
      lineIndex - before
    );

  const end =
    Math.min(
      lines.length,
      lineIndex + after + 1
    );

  return lines
    .slice(
      start,
      end
    )
    .map(
      (line, offset) =>
        `${String(
          start + offset + 1
        ).padStart(5, " ")} | ${line}`
    )
    .join("\n");
}

function findPatternMatches(
  source
) {
  const lines =
    source.split(/\r?\n/);

  const matches = [];

  lines.forEach(
    (line, lineIndex) => {
      const matchedPatterns =
        patterns.filter(
          (pattern) =>
            line
              .toLowerCase()
              .includes(
                pattern.toLowerCase()
              )
        );

      if (
        matchedPatterns.length
      ) {
        matches.push({
          lineIndex,
          line:
            line.trim(),
          matchedPatterns,
        });
      }
    }
  );

  return matches;
}

function extractImports(source) {
  return source
    .split(/\r?\n/)
    .filter(
      (line) =>
        /^\s*import\s/.test(
          line
        ) ||
        /^\s*from\s+["']/.test(
          line
        )
    );
}

function extractComponentSignature(
  source,
  componentName
) {
  const patterns = [
    new RegExp(
      `function\\s+${componentName}\\s*\\(`
    ),
    new RegExp(
      `const\\s+${componentName}\\s*=`
    ),
    new RegExp(
      `export\\s+default\\s+function\\s+${componentName}`
    ),
  ];

  let index = -1;

  for (
    const pattern
    of patterns
  ) {
    const match =
      source.match(pattern);

    if (
      match &&
      match.index != null
    ) {
      index =
        match.index;
      break;
    }
  }

  if (index < 0) {
    return "";
  }

  const lineIndex =
    source
      .slice(
        0,
        index
      )
      .split(/\r?\n/)
      .length - 1;

  return getContext(
    source,
    lineIndex,
    5,
    35
  );
}

const report = [];

report.push(
  "# 接头产品种类数据来源检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只检查，没有修改任何文件。"
);
report.push("");

for (
  const relativePath
  of targetFiles
) {
  const filePath =
    path.join(
      root,
      relativePath
    );

  report.push(
    `## ${relativePath}`
  );
  report.push("");

  if (
    !fs.existsSync(filePath)
  ) {
    report.push(
      "文件不存在。"
    );
    report.push("");
    continue;
  }

  const source =
    read(filePath);

  const imports =
    extractImports(source);

  report.push(
    "### import"
  );
  report.push("");
  report.push("```tsx");
  report.push(
    imports.join("\n") ||
    "未找到import"
  );
  report.push("```");
  report.push("");

  const componentName =
    path
      .basename(
        relativePath
      )
      .replace(
        /\.(tsx|ts)$/i,
        ""
      );

  const signature =
    extractComponentSignature(
      source,
      componentName
    );

  report.push(
    "### 组件或函数入口"
  );
  report.push("");
  report.push("```tsx");
  report.push(
    signature ||
    "未识别"
  );
  report.push("```");
  report.push("");

  const matches =
    findPatternMatches(
      source
    );

  report.push(
    `### 关键词匹配：${matches.length}`
  );
  report.push("");

  if (!matches.length) {
    report.push(
      "没有直接匹配。"
    );
    report.push("");
  } else {
    const usedLineIndexes =
      new Set();

    for (
      const match
      of matches
    ) {
      if (
        usedLineIndexes.has(
          match.lineIndex
        )
      ) {
        continue;
      }

      usedLineIndexes.add(
        match.lineIndex
      );

      report.push(
        `匹配：${match.matchedPatterns.join("、")}，第 ${match.lineIndex + 1} 行`
      );
      report.push("");
      report.push("```tsx");
      report.push(
        getContext(
          source,
          match.lineIndex
        )
      );
      report.push("```");
      report.push("");
    }
  }
}

report.push(
  "## 选型目录全局精确搜索"
);
report.push("");

const allFiles =
  searchDirectories
    .flatMap(
      (directory) =>
        walk(
          path.join(
            root,
            directory
          )
        )
    );

const directLabelPatterns = [
  "堵头",
  "过滤器",
  "单向阀",
  "过滤器与单向阀",
];

for (
  const filePath
  of allFiles
) {
  const source =
    read(filePath);

  const lines =
    source.split(/\r?\n/);

  const directMatches = [];

  lines.forEach(
    (line, lineIndex) => {
      const matched =
        directLabelPatterns.filter(
          (pattern) =>
            line.includes(pattern)
        );

      if (matched.length) {
        directMatches.push({
          lineIndex,
          matched,
        });
      }
    }
  );

  if (!directMatches.length) {
    continue;
  }

  report.push(
    `### ${relative(filePath)}`
  );
  report.push("");

  for (
    const match
    of directMatches
  ) {
    report.push(
      `匹配：${match.matched.join("、")}，第 ${match.lineIndex + 1} 行`
    );
    report.push("");
    report.push("```tsx");
    report.push(
      getContext(
        source,
        match.lineIndex,
        8,
        14
      )
    );
    report.push("```");
    report.push("");
  }
}

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
  "接头产品种类数据来源检查完成"
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
  "本次未修改任何文件。"
);
