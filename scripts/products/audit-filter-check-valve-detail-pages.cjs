const fs = require("fs");
const path = require("path");

const root = process.cwd();

const filterJsonPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "filters",
  "detail",
  "index.json"
);

const checkValveJsonPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "check-valves",
  "detail",
  "index.json"
);

const filterPagePath = path.join(
  root,
  "app",
  "products",
  "fittings",
  "filters",
  "[slug]",
  "page.tsx"
);

const checkValvePagePath = path.join(
  root,
  "app",
  "products",
  "fittings",
  "check-valves",
  "[slug]",
  "page.tsx"
);

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-detail-page-audit.md"
);

function exists(filePath) {
  return fs.existsSync(filePath);
}

function readText(filePath) {
  if (!exists(filePath)) {
    return "";
  }

  return fs.readFileSync(
    filePath,
    "utf8"
  );
}

function readJson(filePath) {
  if (!exists(filePath)) {
    return [];
  }

  return JSON.parse(
    fs.readFileSync(
      filePath,
      "utf8"
    )
  );
}

function keysOf(value) {
  if (
    !value ||
    typeof value !== "object"
  ) {
    return [];
  }

  return Object.keys(value);
}

function formatValue(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  return JSON.stringify(
    value,
    null,
    2
  );
}

function makeSample(
  title,
  item
) {
  const lines = [];

  lines.push(`## ${title}`);
  lines.push("");

  if (!item) {
    lines.push("没有数据。");
    lines.push("");
    return lines;
  }

  lines.push(
    `- 顶层字段：${keysOf(item).join("、")}`
  );

  lines.push("");

  for (const key of keysOf(item)) {
    const value = item[key];

    if (
      typeof value === "object" &&
      value !== null
    ) {
      lines.push(`### ${key}`);
      lines.push("");
      lines.push("```json");
      lines.push(
        JSON.stringify(
          value,
          null,
          2
        )
      );
      lines.push("```");
      lines.push("");
    } else {
      lines.push(
        `- ${key}：${formatValue(value)}`
      );
    }
  }

  lines.push("");

  return lines;
}

const filters =
  readJson(filterJsonPath);

const checkValves =
  readJson(checkValveJsonPath);

const filterPageSource =
  readText(filterPagePath);

const checkValvePageSource =
  readText(checkValvePagePath);

const report = [];

report.push(
  "# 过滤器与单向阀详情页检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "## 文件状态"
);
report.push("");

report.push(
  `- 过滤器详情数据：${exists(filterJsonPath) ? "存在" : "缺失"}`
);
report.push(
  `- 单向阀详情数据：${exists(checkValveJsonPath) ? "存在" : "缺失"}`
);
report.push(
  `- 过滤器详情路由：${exists(filterPagePath) ? "存在" : "缺失"}`
);
report.push(
  `- 单向阀详情路由：${exists(checkValvePagePath) ? "存在" : "缺失"}`
);
report.push("");

report.push(
  "## 数据数量"
);
report.push("");

report.push(
  `- 过滤器：${filters.length}`
);
report.push(
  `- 单向阀：${checkValves.length}`
);
report.push("");

report.push(
  "## 路由页面使用情况"
);
report.push("");

report.push(
  `- 过滤器是否使用 ProductDetailClient：${filterPageSource.includes("ProductDetailClient") ? "是" : "否"}`
);
report.push(
  `- 单向阀是否使用 ProductDetailClient：${checkValvePageSource.includes("ProductDetailClient") ? "是" : "否"}`
);
report.push(
  `- 过滤器是否直接读取 JSON：${filterPageSource.includes("index.json") ? "是" : "否"}`
);
report.push(
  `- 单向阀是否直接读取 JSON：${checkValvePageSource.includes("index.json") ? "是" : "否"}`
);
report.push("");

report.push(
  "## 过滤器详情路由源码"
);
report.push("");
report.push("```tsx");
report.push(
  filterPageSource || "文件不存在"
);
report.push("```");
report.push("");

report.push(
  "## 单向阀详情路由源码"
);
report.push("");
report.push("```tsx");
report.push(
  checkValvePageSource || "文件不存在"
);
report.push("```");
report.push("");

report.push(
  ...makeSample(
    "过滤器第一条数据",
    filters[0]
  )
);

report.push(
  ...makeSample(
    "过滤器组件数据",
    filters.find(
      (item) =>
        String(
          item.slug || ""
        ).includes(
          "component"
        )
    )
  )
);

report.push(
  ...makeSample(
    "单向阀第一条数据",
    checkValves[0]
  )
);

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
  "过滤器与单向阀详情页检查完成"
);
console.log(
  "============================================"
);
console.log(
  "过滤器：",
  filters.length
);
console.log(
  "单向阀：",
  checkValves.length
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
