const fs = require("fs");
const path = require("path");

const root = process.cwd();

const appFittingsPath = path.join(
  root,
  "app",
  "products",
  "fittings"
);

const detailClientPath = path.join(
  root,
  "components",
  "products",
  "detail",
  "ProductDetailClient.tsx"
);

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-detail-route-template-audit.md"
);

function walk(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const results = [];

  for (const entry of fs.readdirSync(
    directory,
    {
      withFileTypes: true,
    }
  )) {
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

function extractContext(
  source,
  pattern,
  before = 20,
  after = 60
) {
  const lines = source.split(/\r?\n/);

  const index = lines.findIndex(
    (line) =>
      pattern.test(line)
  );

  if (index < 0) {
    return "";
  }

  return lines
    .slice(
      Math.max(0, index - before),
      Math.min(
        lines.length,
        index + after + 1
      )
    )
    .join("\n");
}

if (!fs.existsSync(appFittingsPath)) {
  throw new Error(
    "未找到接头路由目录：" +
      appFittingsPath
  );
}

const allFiles = walk(
  appFittingsPath
);

const dynamicDetailPages =
  allFiles.filter(
    (filePath) =>
      filePath.endsWith(
        `${path.sep}[slug]${path.sep}page.tsx`
      )
  );

const detailClientPages =
  dynamicDetailPages.filter(
    (filePath) =>
      read(filePath).includes(
        "ProductDetailClient"
      )
  );

const preferredWords = [
  "thread-to-barbed",
  "female-thread",
  "quick-connect",
  "hard-tube",
  "luer",
  "barbed",
];

function scoreRoute(filePath) {
  const normalized =
    relative(filePath);

  let score = 0;

  preferredWords.forEach(
    (word, index) => {
      if (
        normalized.includes(word)
      ) {
        score +=
          preferredWords.length -
          index;
      }
    }
  );

  const source = read(filePath);

  if (
    source.includes(
      "generateStaticParams"
    )
  ) {
    score += 5;
  }

  if (
    source.includes(
      "generateMetadata"
    )
  ) {
    score += 4;
  }

  if (
    source.includes(
      "notFound"
    )
  ) {
    score += 3;
  }

  return score;
}

const selectedPages =
  [...detailClientPages]
    .sort(
      (a, b) =>
        scoreRoute(b) -
        scoreRoute(a)
    )
    .slice(0, 4);

const detailClientSource =
  read(detailClientPath);

const report = [];

report.push(
  "# 接头详情页现有模板检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "## 路由统计"
);
report.push("");

report.push(
  `- 接头动态详情路由：${dynamicDetailPages.length}`
);
report.push(
  `- 使用 ProductDetailClient：${detailClientPages.length}`
);
report.push("");

report.push(
  "## 所有使用 ProductDetailClient 的接头路由"
);
report.push("");

if (
  detailClientPages.length === 0
) {
  report.push(
    "没有找到使用 ProductDetailClient 的接头详情路由。"
  );
} else {
  for (
    const filePath
    of detailClientPages
  ) {
    report.push(
      `- ${relative(filePath)}`
    );
  }
}

report.push("");

report.push(
  "## ProductDetailClient 参数定义"
);
report.push("");

report.push("```tsx");
report.push(
  extractContext(
    detailClientSource,
    /export\s+default\s+function\s+ProductDetailClient|function\s+ProductDetailClient|type\s+ProductDetailClientProps|interface\s+ProductDetailClientProps/,
    50,
    100
  ) ||
    "未定位到组件参数定义"
);
report.push("```");
report.push("");

for (
  const filePath
  of selectedPages
) {
  const source =
    read(filePath);

  report.push(
    `## 参考路由：${relative(filePath)}`
  );
  report.push("");

  report.push(
    `- generateStaticParams：${source.includes("generateStaticParams") ? "有" : "无"}`
  );

  report.push(
    `- generateMetadata：${source.includes("generateMetadata") ? "有" : "无"}`
  );

  report.push(
    `- notFound：${source.includes("notFound") ? "有" : "无"}`
  );

  report.push(
    `- ProductDetailClient：${source.includes("ProductDetailClient") ? "有" : "无"}`
  );

  report.push("");

  report.push("```tsx");
  report.push(source);
  report.push("```");
  report.push("");
}

const possibleAdapters =
  walk(
    path.join(
      root,
      "data"
    )
  ).filter(
    (filePath) => {
      if (
        !/\.(ts|tsx|js|cjs)$/.test(
          filePath
        )
      ) {
        return false;
      }

      const source =
        read(filePath);

      return (
        source.includes(
          "ProductDetailClient"
        ) ||
        source.includes(
          "ProductDetailData"
        ) ||
        source.includes(
          "DetailAdapter"
        )
      );
    }
  );

report.push(
  "## 可能相关的数据适配器"
);
report.push("");

if (
  possibleAdapters.length === 0
) {
  report.push(
    "没有找到明显的数据适配器。"
  );
} else {
  for (
    const filePath
    of possibleAdapters.slice(0, 30)
  ) {
    report.push(
      `- ${relative(filePath)}`
    );
  }
}

report.push("");

fs.mkdirSync(
  path.dirname(reportPath),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  reportPath,
  report.join("\n"),
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "接头详情页模板检查完成"
);
console.log(
  "============================================"
);
console.log(
  "动态详情路由：",
  dynamicDetailPages.length
);
console.log(
  "使用 ProductDetailClient：",
  detailClientPages.length
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
