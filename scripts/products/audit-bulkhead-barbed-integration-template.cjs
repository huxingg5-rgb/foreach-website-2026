const fs = require("fs");
const path = require("path");

const root = process.cwd();

const selectionDir = path.join(
  root,
  "data",
  "products",
  "selection"
);

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const routeMapPath = path.join(
  selectionDir,
  "product-route-map.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "bulkhead-barbed-integration-template-audit.md"
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
    const fullPath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      results.push(
        ...walk(fullPath)
      );
    } else {
      results.push(fullPath);
    }
  }

  return results;
}

function getContext(
  source,
  pattern,
  before = 15,
  after = 30
) {
  const lines =
    source.split(/\r?\n/);

  const indexes = [];

  lines.forEach(
    (line, index) => {
      if (pattern.test(line)) {
        indexes.push(index);
      }
    }
  );

  return indexes.map(
    (index) => ({
      line:
        index + 1,

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
    })
  );
}

function findArrayRange(
  source,
  exportName
) {
  const declaration =
    new RegExp(
      `export\\s+const\\s+${exportName}\\s*=`
    );

  const match =
    source.match(declaration);

  if (
    !match ||
    match.index == null
  ) {
    return null;
  }

  const start =
    source.indexOf(
      "[",
      match.index +
        match[0].length
    );

  if (start < 0) {
    return null;
  }

  let depth = 0;
  let quote = "";
  let escaped = false;

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
    }

    if (char === "]") {
      depth -= 1;

      if (depth === 0) {
        return {
          start,
          end:
            index + 1,
        };
      }
    }
  }

  return null;
}

function readExportArray(
  source,
  exportName
) {
  const range =
    findArrayRange(
      source,
      exportName
    );

  if (!range) {
    return null;
  }

  try {
    return JSON.parse(
      source.slice(
        range.start,
        range.end
      )
    );
  } catch {
    return null;
  }
}

const files =
  walk(selectionDir);

const luerFiles =
  files.filter(
    (filePath) =>
      /luer.*selection.*generated\.ts$/i.test(
        path.basename(filePath)
      )
  );

if (luerFiles.length !== 1) {
  throw new Error(
    "鲁尔接头生成文件数量异常：" +
      luerFiles.length
  );
}

const luerPath =
  luerFiles[0];

const luerSource =
  read(luerPath);

const exportNames = [
  ...luerSource.matchAll(
    /export\s+const\s+([A-Za-z0-9_]+)\s*=/g
  ),
].map(
  (match) =>
    match[1]
);

const exportDetails =
  exportNames.map(
    (exportName) => {
      const value =
        readExportArray(
          luerSource,
          exportName
        );

      return {
        exportName,

        parsed:
          Array.isArray(value),

        length:
          Array.isArray(value)
            ? value.length
            : null,

        first:
          Array.isArray(value) &&
          value.length
            ? value[0]
            : null,
      };
    }
  );

const clientSource =
  read(clientPath);

const routeMapSource =
  read(routeMapPath);

const luerPageCandidates = [
  path.join(
    root,
    "app",
    "products",
    "fittings",
    "luer-fittings",
    "page.tsx"
  ),
  path.join(
    root,
    "app",
    "products",
    "fittings",
    "luer-fittings",
    "[slug]",
    "page.tsx"
  ),
];

const report = [];

report.push(
  "# 穿板倒刺接头接入模板检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "## 一、鲁尔接头生成文件"
);
report.push("");

report.push(
  `- 文件：${relative(luerPath)}`
);
report.push(
  `- 导出数量：${exportNames.length}`
);
report.push("");

for (
  const detail
  of exportDetails
) {
  report.push(
    `### ${detail.exportName}`
  );
  report.push("");

  report.push(
    `- 可解析数组：${detail.parsed ? "是" : "否"}`
  );

  report.push(
    `- 数量：${detail.length ?? "未知"}`
  );

  report.push("");

  if (detail.first) {
    report.push("```json");
    report.push(
      JSON.stringify(
        detail.first,
        null,
        2
      )
    );
    report.push("```");
  }

  report.push("");
}

report.push(
  "## 二、ProductSelectionClient中的鲁尔接头接入位置"
);
report.push("");

const clientContexts =
  getContext(
    clientSource,
    /luer|鲁尔/i,
    20,
    45
  );

for (
  const context
  of clientContexts
) {
  report.push(
    `### 第${context.line}行附近`
  );
  report.push("");
  report.push("```tsx");
  report.push(
    context.content
  );
  report.push("```");
  report.push("");
}

report.push(
  "## 三、产品路由映射"
);
report.push("");

report.push(
  `- 文件存在：${fs.existsSync(routeMapPath) ? "是" : "否"}`
);
report.push("");

report.push("```ts");
report.push(
  routeMapSource ||
    "文件不存在"
);
report.push("```");
report.push("");

report.push(
  "## 四、鲁尔接头页面路由"
);
report.push("");

for (
  const filePath
  of luerPageCandidates
) {
  report.push(
    `### ${relative(filePath)}`
  );
  report.push("");

  report.push(
    `- 存在：${fs.existsSync(filePath) ? "是" : "否"}`
  );
  report.push("");

  if (fs.existsSync(filePath)) {
    report.push("```tsx");
    report.push(
      read(filePath)
    );
    report.push("```");
  }

  report.push("");
}

report.push(
  "## 五、穿板倒刺接头确定配置"
);
report.push("");

report.push(
  "- 产品类型ID：`bulkhead-barbed-fittings`"
);
report.push(
  "- 型号数量：9"
);
report.push(
  "- 商品编码数量：9"
);
report.push(
  "- 筛选字段：螺纹规格、接管内径、壳体材质、颜色"
);
report.push(
  "- 筛选项统一两个一排"
);
report.push(
  "- 不新增专属CSS"
);
report.push(
  "- 继续复用现有选型页与详情页组件"
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
  report.join("\n") + "\n",
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "穿板倒刺接头接入模板检查完成"
);
console.log(
  "============================================"
);
console.log(
  "鲁尔生成文件：",
  relative(luerPath)
);
console.log(
  "导出项：",
  exportNames.join("、")
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
