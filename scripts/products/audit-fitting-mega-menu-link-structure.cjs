const fs = require("fs");
const path = require("path");

const root = process.cwd();

const navigationPath = path.join(
  root,
  "data",
  "navigation.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "fitting-mega-menu-link-structure-audit.md"
);

const searchRoots = [
  path.join(root, "components"),
  path.join(root, "app"),
  path.join(root, "data"),
];

const allowedExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
]);

const fittingLabels = [
  "硬管接头",
  "倒刺接头",
  "螺纹转倒刺接头",
  "鲁尔接头",
  "快插接头",
  "内螺纹互转接头",
  "穿板倒刺接头",
  "过滤器与单向阀",
];

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
  patterns,
  before = 10,
  after = 24
) {
  const lines = source.split(/\r?\n/);
  const results = [];

  lines.forEach(
    (line, index) => {
      const matched =
        patterns.find(
          (pattern) => {
            if (
              typeof pattern === "string"
            ) {
              return line.includes(pattern);
            }

            return pattern.test(line);
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

if (!fs.existsSync(navigationPath)) {
  throw new Error(
    "未找到导航数据文件：" +
      navigationPath
  );
}

const navigationSource =
  read(navigationPath);

const allFiles =
  searchRoots.flatMap(
    walk
  );

const productImageContexts =
  contexts(
    navigationSource,
    [
      /function\s+productImage/,
      /const\s+productImage/,
      /productImage\s*=\s*/,
      /key:\s*"fittings-card"/,
      /images:\s*\[/,
    ],
    14,
    40
  );

const fittingCardContexts =
  contexts(
    navigationSource,
    fittingLabels,
    8,
    16
  );

const renderCandidates = [];

for (
  const filePath
  of allFiles
) {
  const source =
    read(filePath);

  const hitCount = [
    /images\.map/,
    /card\.images/,
    /item\.images/,
    /productImage/,
    /image\.href/,
    /item\.href/,
    /<Link/,
    /router\.push/,
    /onClick/,
    /mega/i,
    /menu/i,
  ].reduce(
    (count, pattern) =>
      count +
      (
        pattern.test(source)
          ? 1
          : 0
      ),
    0
  );

  const looksRelevant =
    /navigation|mega|menu|header|siteheader|navbar/i.test(
      relative(filePath)
    ) ||
    (
      source.includes("images.map") &&
      source.includes("navigation")
    );

  if (
    hitCount >= 2 &&
    looksRelevant
  ) {
    renderCandidates.push({
      filePath,
      hitCount,
      contexts:
        contexts(
          source,
          [
            /images\.map/,
            /card\.images/,
            /item\.images/,
            /image\.href/,
            /item\.href/,
            /<Link/,
            /router\.push/,
            /onClick/,
            /href=/,
          ],
          12,
          30
        ),
    });
  }
}

renderCandidates.sort(
  (a, b) =>
    b.hitCount -
    a.hitCount
);

const clickableExamples = [];

for (
  const filePath
  of allFiles
) {
  const source =
    read(filePath);

  const hasImageArray =
    /images:\s*\[/.test(
      source
    );

  const hasHref =
    /href:\s*["'`]/.test(
      source
    );

  const hasProductImage =
    /productImage\(/.test(
      source
    );

  if (
    hasHref &&
    (
      hasImageArray ||
      hasProductImage
    )
  ) {
    clickableExamples.push({
      filePath,
      contexts:
        contexts(
          source,
          [
            /href:\s*["'`]/,
            /productImage\(/,
            /images:\s*\[/,
          ],
          10,
          20
        ),
    });
  }
}

const report = [];

report.push(
  "# 接头 Mega Menu 点击跳转结构检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "## 一、目标跳转"
);
report.push("");

report.push(
  "- 硬管接头 → `/products/fittings/hard-tube-fittings`"
);
report.push(
  "- 倒刺接头 → `/products/fittings/barbed-fittings`"
);
report.push(
  "- 螺纹转倒刺接头 → `/products/fittings/thread-to-barbed-fittings`"
);
report.push(
  "- 鲁尔接头 → `/products/fittings/luer-fittings`"
);
report.push(
  "- 快插接头 → `/products/fittings/quick-connect-fittings`"
);
report.push(
  "- 内螺纹互转接头 → `/products/fittings/female-thread-adapters`"
);
report.push(
  "- 穿板倒刺接头 → `/products/fittings/bulkhead-barbed-fittings`"
);
report.push(
  "- 过滤器与单向阀 → `/products/fittings/filters`"
);
report.push("");

report.push(
  "## 二、data/navigation.ts 中 productImage 与接头卡片"
);
report.push("");

for (
  const item
  of productImageContexts
) {
  report.push(
    `### 第${item.lineNumber}行附近`
  );
  report.push("");
  report.push("```ts");
  report.push(
    item.content
  );
  report.push("```");
  report.push("");
}

report.push(
  "## 三、接头8张卡片当前定义"
);
report.push("");

for (
  const item
  of fittingCardContexts
) {
  report.push(
    `### 第${item.lineNumber}行附近`
  );
  report.push("");
  report.push("```ts");
  report.push(
    item.content
  );
  report.push("```");
  report.push("");
}

report.push(
  "## 四、Mega Menu 渲染候选文件"
);
report.push("");

if (
  !renderCandidates.length
) {
  report.push(
    "- 未找到明显的Mega Menu渲染文件"
  );
  report.push("");
}

for (
  const candidate
  of renderCandidates.slice(
    0,
    20
  )
) {
  report.push(
    `### ${relative(candidate.filePath)}`
  );
  report.push("");
  report.push(
    `- 相关命中：${candidate.hitCount}`
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
  "## 五、项目内已有可点击图片卡片示例"
);
report.push("");

if (
  !clickableExamples.length
) {
  report.push(
    "- 没有找到明显的可点击图片数组示例"
  );
  report.push("");
}

for (
  const example
  of clickableExamples.slice(
    0,
    15
  )
) {
  report.push(
    `### ${relative(example.filePath)}`
  );
  report.push("");

  for (
    const item
    of example.contexts.slice(
      0,
      20
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
  "## 六、下一步需要确认"
);
report.push("");

report.push(
  "- productImage返回对象当前是否包含href"
);
report.push(
  "- Mega Menu图片卡片是否已经支持Link"
);
report.push(
  "- 如果未支持，只给图片卡片增加href，不改布局与CSS"
);
report.push(
  "- 点击后是否需要自动关闭Mega Menu"
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
  "接头Mega Menu点击结构检查完成"
);
console.log(
  "============================================"
);
console.log(
  "渲染候选文件：",
  renderCandidates.length
);
console.log(
  "可点击图片示例：",
  clickableExamples.length
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
