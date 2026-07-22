const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const projectRoot = process.cwd();
const stamp = new Date()
  .toISOString()
  .replace(/[-:T]/g, "")
  .replace(/\..+$/, "");

const reportPath = path.join(
  projectRoot,
  `mobile-pdf-preview-audit-${stamp}.md`,
);

const includeExtensions = new Set([
  ".tsx",
  ".ts",
  ".jsx",
  ".js",
  ".cjs",
  ".mjs",
  ".css",
  ".scss",
  ".json",
]);

const ignoredDirectoryNames = new Set([
  ".git",
  ".next",
  "node_modules",
  "out",
  "dist",
  "build",
  "coverage",
  "_inspection-reports",
  "reports",
]);

const priorityFiles = [
  path.join(projectRoot, "components", "products", "detail", "ProductDetailClient.tsx"),
  path.join(projectRoot, "components", "products", "detail", "product-detail.module.css"),
  path.join(projectRoot, "app", "globals.css"),
];

const searchGroups = [
  {
    title: "EA-0250UL 精确引用",
    patterns: [/EA-0250UL\.pdf/gi, /EA-0250UL/gi],
  },
  {
    title: "PDF iframe 与参数",
    patterns: [
      /#toolbar=0/gi,
      /navpanes=0/gi,
      /scrollbar=1/gi,
      /<iframe/gi,
      /<object/gi,
      /<embed/gi,
      /application\/pdf/gi,
    ],
  },
  {
    title: "零件图与 PDF URL 变量",
    patterns: [
      /\bdrawingUrl\b/gi,
      /\bdrawingPdfUrl\b/gi,
      /\bpdfUrl\b/gi,
      /\bdetailDrawing\b/gi,
      /\bpartDrawing\b/gi,
      /\bdrawing\b/gi,
      /\.pdf["'`]/gi,
    ],
  },
  {
    title: "下载与跳转逻辑",
    patterns: [
      /\bdownload\s*=/gi,
      /\bdownload\b/gi,
      /window\.open/gi,
      /location\.href/gi,
      /location\.assign/gi,
      /router\.push/gi,
      /target=["']_blank["']/gi,
    ],
  },
  {
    title: "手机端判断与响应式逻辑",
    patterns: [
      /\bisMobile\b/gi,
      /matchMedia/gi,
      /useMediaQuery/gi,
      /navigator\.userAgent/gi,
      /@media\s*\([^)]*max-width/gi,
      /mobile/gi,
    ],
  },
];

function shouldIgnore(filePath) {
  const relative = path.relative(projectRoot, filePath);
  const parts = relative.split(path.sep);

  if (parts.some((part) => ignoredDirectoryNames.has(part))) {
    return true;
  }

  const base = path.basename(filePath).toLowerCase();

  return (
    base.includes(".bak") ||
    base.endsWith(".map") ||
    base.startsWith("mobile-pdf-preview-audit-")
  );
}

function walk(dirPath, files = []) {
  if (!fs.existsSync(dirPath)) {
    return files;
  }

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirectoryNames.has(entry.name)) {
        walk(fullPath, files);
      }
      continue;
    }

    if (!entry.isFile() || shouldIgnore(fullPath)) {
      continue;
    }

    if (includeExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

function getGitOutput(command) {
  try {
    return execSync(command, {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch (error) {
    return `读取失败：${error.message}`;
  }
}

function lineNumberAt(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function collectMatches(filePath, patterns) {
  let content;

  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch {
    return [];
  }

  const result = [];
  const seen = new Set();

  for (const pattern of patterns) {
    pattern.lastIndex = 0;

    let match;
    while ((match = pattern.exec(content)) !== null) {
      const line = lineNumberAt(content, match.index);
      const key = `${line}:${match[0]}`;

      if (!seen.has(key)) {
        seen.add(key);
        result.push({ line, matchText: match[0] });
      }

      if (match.index === pattern.lastIndex) {
        pattern.lastIndex += 1;
      }
    }
  }

  return result.sort((a, b) => a.line - b.line);
}

function getContext(filePath, lineNumber, before = 20, after = 35) {
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  const start = Math.max(1, lineNumber - before);
  const end = Math.min(lines.length, lineNumber + after);
  const output = [];

  for (let index = start; index <= end; index += 1) {
    const marker = index === lineNumber ? ">>" : "  ";
    output.push(
      `${marker} ${String(index).padStart(5, " ")}: ${lines[index - 1]}`,
    );
  }

  return output.join("\n");
}

function addSection(lines, title) {
  lines.push("");
  lines.push(`## ${title}`);
  lines.push("");
}

function addFileContext(lines, filePath, lineNumber, matchText) {
  const relative = path.relative(projectRoot, filePath);
  lines.push(`### ${relative}`);
  lines.push("");
  lines.push(
    `命中行：${lineNumber}；命中内容：\`${matchText.replace(/`/g, "\\`")}\``,
  );
  lines.push("");
  lines.push("```text");
  lines.push(getContext(filePath, lineNumber));
  lines.push("```");
  lines.push("");
}

const allFiles = walk(projectRoot);
const report = [];

report.push("# 手机端 PDF 预览检查报告");
report.push("");
report.push(`- 生成时间：${new Date().toLocaleString("zh-CN")}`);
report.push(`- 项目目录：${projectRoot}`);
report.push("- 本脚本只检查，不修改项目文件。");

addSection(report, "1. Git 状态");
report.push("```text");
report.push(`当前分支：${getGitOutput("git branch --show-current")}`);
report.push("");
report.push(getGitOutput("git status --short") || "工作区干净");
report.push("```");

addSection(report, "2. 优先文件是否存在");
for (const filePath of priorityFiles) {
  report.push(
    `- ${fs.existsSync(filePath) ? "存在" : "不存在"}：\`${path.relative(projectRoot, filePath)}\``,
  );
}

for (const group of searchGroups) {
  addSection(report, group.title);

  const matches = [];

  for (const filePath of allFiles) {
    const fileMatches = collectMatches(filePath, group.patterns);

    for (const item of fileMatches) {
      matches.push({ filePath, ...item });
    }
  }

  if (matches.length === 0) {
    report.push("未找到相关代码。");
    continue;
  }

  const priorityFirst = matches.sort((a, b) => {
    const aPriority = priorityFiles.includes(a.filePath) ? 0 : 1;
    const bPriority = priorityFiles.includes(b.filePath) ? 0 : 1;

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    const pathCompare = a.filePath.localeCompare(b.filePath);
    return pathCompare !== 0 ? pathCompare : a.line - b.line;
  });

  const limitedMatches = [];
  const perFileCount = new Map();

  for (const item of priorityFirst) {
    const currentCount = perFileCount.get(item.filePath) || 0;
    const maxPerFile = priorityFiles.includes(item.filePath) ? 20 : 5;

    if (currentCount >= maxPerFile) {
      continue;
    }

    limitedMatches.push(item);
    perFileCount.set(item.filePath, currentCount + 1);

    if (limitedMatches.length >= 80) {
      break;
    }
  }

  report.push(`共找到 ${matches.length} 处命中，报告展开其中 ${limitedMatches.length} 处。`);
  report.push("");

  for (const item of limitedMatches) {
    addFileContext(report, item.filePath, item.line, item.matchText);
  }
}

addSection(report, "7. public 中 EA-0250UL 与相关 PDF 文件");

const publicRoot = path.join(projectRoot, "public");
const publicFiles = [];

function walkAll(dirPath, files = []) {
  if (!fs.existsSync(dirPath)) {
    return files;
  }

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      walkAll(fullPath, files);
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

for (const filePath of walkAll(publicRoot)) {
  const lower = filePath.toLowerCase();

  if (
    lower.endsWith(".pdf") &&
    (
      lower.includes("ea-0250ul") ||
      lower.includes("ea-250") ||
      lower.includes("drawing") ||
      lower.includes("2d")
    )
  ) {
    publicFiles.push(filePath);
  }
}

if (publicFiles.length === 0) {
  report.push("未找到 EA-0250UL 或相关命名的 PDF 文件。");
} else {
  report.push("| 文件 | 大小 |");
  report.push("|---|---:|");

  for (const filePath of publicFiles.sort()) {
    const sizeKb = Math.round((fs.statSync(filePath).size / 1024) * 10) / 10;
    report.push(`| \`${path.relative(projectRoot, filePath)}\` | ${sizeKb} KB |`);
  }
}

addSection(report, "8. ProductDetailClient 中 PDF 相关完整命中索引");

if (fs.existsSync(priorityFiles[0])) {
  const productLines = fs.readFileSync(priorityFiles[0], "utf8").split(/\r?\n/);
  const indexPatterns = [
    /pdf/i,
    /drawing/i,
    /iframe/i,
    /object/i,
    /embed/i,
    /toolbar/i,
    /download/i,
    /mobile/i,
  ];

  report.push("```text");

  for (let index = 0; index < productLines.length; index += 1) {
    if (indexPatterns.some((pattern) => pattern.test(productLines[index]))) {
      report.push(
        `${String(index + 1).padStart(5, " ")}: ${productLines[index]}`,
      );
    }
  }

  report.push("```");
} else {
  report.push("ProductDetailClient.tsx 不存在。");
}

addSection(report, "9. 下一步修改判断");
report.push("拿到本报告后，需要确认：");
report.push("");
report.push("1. PDF 是通过 iframe、object、embed 还是普通链接加载。");
report.push("2. `#toolbar=0&navpanes=0&scrollbar=1` 是否直接拼接在手机端 URL 上。");
report.push("3. 是否存在 `download`、`window.open` 或跳转逻辑。");
report.push("4. 手机端是否已有媒体查询或 JavaScript 判断。");
report.push("5. EA-0250UL.pdf 的真实 public 路径与 URL 是否一致。");
report.push("6. 最终采用 PDF.js、图片预览或手机端独立预览页。");

fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("");
console.log("============================================");
console.log("检查完成，未修改项目文件。");
console.log("报告位置：");
console.log(reportPath);
console.log("============================================");
