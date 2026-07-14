const fs = require("fs");
const path = require("path");

const root = process.cwd();

const reportPath = path.join(
  root,
  "mobile-advantage-card-audit.txt",
);

const componentPath = path.join(
  root,
  "components/home/HomeCompanyStrengthSection.tsx",
);

const targetTokens = [
  "home-company-advantages-section",
  "home-advantage-panels",
  "home-advantage-panel",
  "home-panel-content",
  "home-panel-index",
  "home-panel-title",
  "home-panel-line",
  "home-panel-brief",
  "home-panel-detail",
  "home-panel-arrow",
];

const report = [];

function section(title) {
  report.push("");
  report.push("=".repeat(90));
  report.push(title);
  report.push("=".repeat(90));
  report.push("");
}

function getLineNumber(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function walk(directory, extensions, results = []) {
  if (!fs.existsSync(directory)) {
    return results;
  }

  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
  })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === "out" ||
        entry.name.startsWith(".git")
      ) {
        continue;
      }

      walk(fullPath, extensions, results);
      continue;
    }

    if (
      extensions.some((extension) =>
        entry.name.endsWith(extension),
      )
    ) {
      results.push(fullPath);
    }
  }

  return results;
}

function relative(filePath) {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

/* =========================================================
   1. 组件结构
========================================================= */

section("1. HomeCompanyStrengthSection.tsx 中的真实卡片结构");

const component = fs.readFileSync(
  componentPath,
  "utf8",
);

const componentLines = component.split(/\r?\n/);

const matchingLineIndexes = [];

componentLines.forEach((line, index) => {
  if (
    targetTokens.some((token) => line.includes(token)) ||
    /onClick|onPointer|onMouse|onTouch|href=|<Link|<button|role=|tabIndex|aria-expanded/.test(
      line,
    )
  ) {
    matchingLineIndexes.push(index);
  }
});

const displayedLines = new Set();

for (const index of matchingLineIndexes) {
  const start = Math.max(0, index - 4);
  const end = Math.min(
    componentLines.length - 1,
    index + 10,
  );

  for (let cursor = start; cursor <= end; cursor += 1) {
    displayedLines.add(cursor);
  }
}

[...displayedLines]
  .sort((a, b) => a - b)
  .forEach((index) => {
    report.push(
      `${String(index + 1).padStart(5, " ")}: ${componentLines[index]}`,
    );
  });

/* =========================================================
   2. 所有代码引用
========================================================= */

section("2. 项目内所有企业优势卡片代码引用");

const codeFiles = [
  ...walk(path.join(root, "app"), [
    ".tsx",
    ".ts",
    ".jsx",
    ".js",
  ]),
  ...walk(path.join(root, "components"), [
    ".tsx",
    ".ts",
    ".jsx",
    ".js",
  ]),
  ...walk(path.join(root, "data"), [
    ".tsx",
    ".ts",
    ".jsx",
    ".js",
    ".json",
  ]),
];

let codeReferenceCount = 0;

for (const filePath of codeFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    if (
      targetTokens.some((token) => line.includes(token)) ||
      (
        /advantage/i.test(line) &&
        /click|hover|active|focus|pointer|touch|expanded|selected/i.test(
          line,
        )
      )
    ) {
      codeReferenceCount += 1;

      report.push(
        `${relative(filePath)}:${index + 1}: ${line}`,
      );
    }
  });
}

report.push("");
report.push(`代码引用总数：${codeReferenceCount}`);

/* =========================================================
   3. CSS 解析
========================================================= */

function getPreludeBeforeBrace(source, openIndex) {
  let cursor = openIndex - 1;

  while (cursor >= 0 && /\s/.test(source[cursor])) {
    cursor -= 1;
  }

  const end = cursor + 1;

  while (
    cursor >= 0 &&
    source[cursor] !== "{" &&
    source[cursor] !== "}" &&
    source[cursor] !== ";"
  ) {
    cursor -= 1;
  }

  return source.slice(cursor + 1, end).trim();
}

function parseCssBlocks(source) {
  const stack = [];
  const blocks = [];

  let quote = null;
  let inComment = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (inComment) {
      if (char === "*" && next === "/") {
        inComment = false;
        index += 1;
      }

      continue;
    }

    if (!quote && char === "/" && next === "*") {
      inComment = true;
      index += 1;
      continue;
    }

    if (quote) {
      if (char === "\\") {
        index += 1;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (char === "{") {
      stack.push({
        prelude: getPreludeBeforeBrace(source, index),
        openIndex: index,
      });

      continue;
    }

    if (char === "}") {
      const current = stack.pop();

      if (!current) {
        continue;
      }

      blocks.push({
        prelude: current.prelude,
        openIndex: current.openIndex,
        closeIndex: index,
        parents: stack.map((item) => item.prelude),
      });
    }
  }

  return blocks;
}

section("3. 所有命中卡片选择器的 CSS 规则");

const cssFiles = [
  ...walk(path.join(root, "app"), [
    ".css",
    ".scss",
  ]),
  ...walk(path.join(root, "components"), [
    ".css",
    ".scss",
  ]),
  ...walk(path.join(root, "styles"), [
    ".css",
    ".scss",
  ]),
];

let matchingCssBlockCount = 0;

for (const filePath of cssFiles) {
  const css = fs.readFileSync(filePath, "utf8");
  const blocks = parseCssBlocks(css);

  for (const block of blocks) {
    const selectorMatches = targetTokens.some((token) =>
      block.prelude.includes(token),
    );

    if (!selectorMatches) {
      continue;
    }

    matchingCssBlockCount += 1;

    const body = css
      .slice(block.openIndex + 1, block.closeIndex)
      .trim();

    const lineNumber = getLineNumber(
      css,
      block.openIndex,
    );

    report.push("-".repeat(90));
    report.push(
      `文件：${relative(filePath)}:${lineNumber}`,
    );

    const mediaParents = block.parents.filter(
      (parent) =>
        parent.startsWith("@media") ||
        parent.startsWith("@supports") ||
        parent.startsWith("@container"),
    );

    report.push(
      `上下文：${
        mediaParents.length > 0
          ? mediaParents.join(" -> ")
          : "全局规则"
      }`,
    );

    report.push(`选择器：${block.prelude}`);
    report.push("{");
    report.push(body);
    report.push("}");
    report.push("");
  }
}

report.push(
  `命中的 CSS 规则总数：${matchingCssBlockCount}`,
);

/* =========================================================
   4. 单独汇总交互属性
========================================================= */

section("4. 企业优势卡片相关交互属性汇总");

const interactionRegex =
  /hover|active|focus|focus-within|pointer-events|cursor|touch-action|transition|transform|animation|opacity|filter|scale|translate|height|max-height|overflow|display|visibility|clip-path|grid-template|scroll-snap/i;

let interactionLineCount = 0;

for (const filePath of cssFiles) {
  const css = fs.readFileSync(filePath, "utf8");
  const blocks = parseCssBlocks(css);

  for (const block of blocks) {
    const related =
      targetTokens.some((token) =>
        block.prelude.includes(token),
      ) ||
      targetTokens.some((token) =>
        css
          .slice(block.openIndex + 1, block.closeIndex)
          .includes(token),
      );

    if (!related) {
      continue;
    }

    const bodyLines = css
      .slice(block.openIndex + 1, block.closeIndex)
      .split(/\r?\n/);

    const suspiciousLines = bodyLines.filter((line) =>
      interactionRegex.test(line),
    );

    if (
      interactionRegex.test(block.prelude) ||
      suspiciousLines.length > 0
    ) {
      interactionLineCount += 1;

      report.push("-".repeat(90));
      report.push(
        `${relative(filePath)}:${getLineNumber(
          css,
          block.openIndex,
        )}`,
      );
      report.push(`选择器：${block.prelude}`);

      const mediaParents = block.parents.filter(
        (parent) =>
          parent.startsWith("@media") ||
          parent.startsWith("@supports") ||
          parent.startsWith("@container"),
      );

      report.push(
        `上下文：${
          mediaParents.length
            ? mediaParents.join(" -> ")
            : "全局规则"
        }`,
      );

      suspiciousLines.forEach((line) => {
        report.push(line.trim());
      });

      report.push("");
    }
  }
}

report.push(
  `含交互或状态属性的规则数量：${interactionLineCount}`,
);

/* =========================================================
   5. 检查之前追加的规则
========================================================= */

section("5. 之前追加的手机端静态规则");

const markerTokens = [
  "HOME_MOBILE_ADVANTAGE_STATIC_START",
  "HOME_MOBILE_ADVANTAGE_STATIC_END",
];

for (const filePath of cssFiles) {
  const css = fs.readFileSync(filePath, "utf8");
  const lines = css.split(/\r?\n/);

  lines.forEach((line, index) => {
    if (
      markerTokens.some((token) =>
        line.includes(token),
      )
    ) {
      const start = Math.max(0, index - 2);
      const end = Math.min(
        lines.length - 1,
        index + 48,
      );

      report.push(
        `文件：${relative(filePath)}:${index + 1}`,
      );

      for (
        let cursor = start;
        cursor <= end;
        cursor += 1
      ) {
        report.push(
          `${String(cursor + 1).padStart(5, " ")}: ${lines[cursor]}`,
        );
      }

      report.push("");
    }
  });
}

/* =========================================================
   6. 数据中的卡片 class
========================================================= */

section("6. 企业优势数据中的 className 和卡片定义");

const dataFiles = codeFiles.filter((filePath) =>
  /home-company-strength/i.test(filePath),
);

for (const filePath of dataFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    if (
      /advantages|className|研发能力|制造交付|quality|research|manufactur/i.test(
        line,
      )
    ) {
      const start = Math.max(0, index - 3);
      const end = Math.min(
        lines.length - 1,
        index + 8,
      );

      report.push(
        `文件：${relative(filePath)}:${index + 1}`,
      );

      for (
        let cursor = start;
        cursor <= end;
        cursor += 1
      ) {
        report.push(
          `${String(cursor + 1).padStart(5, " ")}: ${lines[cursor]}`,
        );
      }

      report.push("");
    }
  });
}

fs.writeFileSync(
  reportPath,
  report.join("\n"),
  "utf8",
);

console.log("");
console.log("检查完成，未修改任何项目文件。");
console.log(`报告：${reportPath}`);
console.log(`CSS 规则数量：${matchingCssBlockCount}`);
console.log(`交互规则数量：${interactionLineCount}`);
