const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = process.cwd();

const cssPath = path.join(root, "app/globals.css");
const componentPath = path.join(
  root,
  "components/home/HomeCompanyStrengthSection.tsx",
);
const reportPath = path.join(
  root,
  "mobile-advantage-final-position-audit.txt",
);

const css = fs.readFileSync(cssPath, "utf8");
const component = fs.readFileSync(componentPath, "utf8");

const report = [];

function title(text) {
  report.push("");
  report.push("=".repeat(100));
  report.push(text);
  report.push("=".repeat(100));
  report.push("");
}

function getLineNumber(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

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

  return blocks.sort(
    (a, b) => a.openIndex - b.openIndex,
  );
}

const targetSelectors = [
  ".home-company-advantages-section",
  ".home-advantage-panels",
  ".home-advantage-panel",
  ".home-panel-content",
  ".home-panel-index",
  ".home-panel-title",
  ".home-panel-line",
  ".home-panel-copy-group",
  ".home-panel-brief",
  ".home-panel-detail",
  ".home-panel-arrow",
];

/* =========================================================
   1. 当前 JSX 真实结构
========================================================= */

title("1. 当前企业优势卡片 JSX 结构");

const componentLines = component.split(/\r?\n/);

let firstRelevantLine = componentLines.findIndex((line) =>
  line.includes('className="home-advantage-panels"'),
);

let lastRelevantLine = componentLines.findIndex((line) =>
  line.includes("企业优势卡片区域结束"),
);

if (firstRelevantLine < 0) {
  firstRelevantLine = 190;
}

if (lastRelevantLine < firstRelevantLine) {
  lastRelevantLine = firstRelevantLine + 60;
}

const jsxStart = Math.max(0, firstRelevantLine - 4);
const jsxEnd = Math.min(
  componentLines.length - 1,
  lastRelevantLine + 4,
);

for (let index = jsxStart; index <= jsxEnd; index += 1) {
  report.push(
    `${String(index + 1).padStart(5, " ")}: ${componentLines[index]}`,
  );
}

report.push("");
report.push(
  `home-panel-copy-group 数量：${
    component.split("home-panel-copy-group").length - 1
  }`,
);

/* =========================================================
   2. 所有相关 CSS 规则，严格按照文件顺序
========================================================= */

title("2. 所有相关 CSS 规则及其真实顺序");

const blocks = parseCssBlocks(css);

let ruleNumber = 0;

for (const block of blocks) {
  const selectorMatched = targetSelectors.some(
    (selector) =>
      block.prelude.includes(selector),
  );

  if (!selectorMatched) {
    continue;
  }

  const body = css
    .slice(block.openIndex + 1, block.closeIndex)
    .trim();

  const relevantBody =
    /position|top|bottom|margin|padding|display|flex|grid|gap|justify-content|align-items|transform|translate|transition|animation|opacity|max-height|height|line-height|font-size|pointer-events/i.test(
      body,
    );

  if (!relevantBody) {
    continue;
  }

  ruleNumber += 1;

  const mediaParents = block.parents.filter(
    (parent) =>
      parent.startsWith("@media") ||
      parent.startsWith("@supports") ||
      parent.startsWith("@container"),
  );

  report.push("-".repeat(100));
  report.push(`规则序号：${ruleNumber}`);
  report.push(
    `位置：app/globals.css:${getLineNumber(
      css,
      block.openIndex,
    )}`,
  );
  report.push(
    `上下文：${
      mediaParents.length
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

/* =========================================================
   3. 当前所有自定义标记规则
========================================================= */

title("3. 当前所有手机端企业优势自定义规则");

const markerNames = [
  "HOME_MOBILE_ADVANTAGE_STATIC_START",
  "HOME_MOBILE_ADVANTAGE_STATIC_END",
  "HOME_MOBILE_ADVANTAGE_TEXT_GAP_START",
  "HOME_MOBILE_ADVANTAGE_TEXT_GAP_END",
  "HOME_MOBILE_ADVANTAGE_COPY_OFFSET_START",
  "HOME_MOBILE_ADVANTAGE_COPY_OFFSET_END",
  "HOME_MOBILE_ADVANTAGE_COPY_GROUP_START",
  "HOME_MOBILE_ADVANTAGE_COPY_GROUP_END",
];

const cssLines = css.split(/\r?\n/);

for (const marker of markerNames) {
  const indexes = [];

  cssLines.forEach((line, index) => {
    if (line.includes(marker)) {
      indexes.push(index);
    }
  });

  report.push(`${marker}：${indexes.length}`);

  for (const index of indexes) {
    report.push(
      `  app/globals.css:${index + 1}`,
    );
  }
}

function extractMarkerBlock(startMarker, endMarker) {
  const start = css.indexOf(`/* ${startMarker} */`);
  const end = css.indexOf(`/* ${endMarker} */`);

  if (start < 0 || end < 0 || end <= start) {
    report.push("");
    report.push(
      `[未找到完整规则] ${startMarker} → ${endMarker}`,
    );
    return;
  }

  const endPosition =
    end + `/* ${endMarker} */`.length;

  report.push("");
  report.push("-".repeat(100));
  report.push(`${startMarker} → ${endMarker}`);
  report.push(
    `起始行：${getLineNumber(css, start)}`,
  );
  report.push(
    css.slice(start, endPosition),
  );
}

extractMarkerBlock(
  "HOME_MOBILE_ADVANTAGE_STATIC_START",
  "HOME_MOBILE_ADVANTAGE_STATIC_END",
);

extractMarkerBlock(
  "HOME_MOBILE_ADVANTAGE_TEXT_GAP_START",
  "HOME_MOBILE_ADVANTAGE_TEXT_GAP_END",
);

extractMarkerBlock(
  "HOME_MOBILE_ADVANTAGE_COPY_OFFSET_START",
  "HOME_MOBILE_ADVANTAGE_COPY_OFFSET_END",
);

extractMarkerBlock(
  "HOME_MOBILE_ADVANTAGE_COPY_GROUP_START",
  "HOME_MOBILE_ADVANTAGE_COPY_GROUP_END",
);

/* =========================================================
   4. 单独列出所有可能产生垂直位移的声明
========================================================= */

title("4. 所有可能改变上下位置的声明");

const verticalProperties =
  /^(position|top|bottom|margin|margin-top|margin-bottom|padding|padding-top|padding-bottom|height|min-height|max-height|display|flex|flex-direction|justify-content|align-items|gap|row-gap|transform|translate|line-height)\s*:/i;

for (const block of blocks) {
  const selectorMatched = targetSelectors.some(
    (selector) =>
      block.prelude.includes(selector),
  );

  if (!selectorMatched) {
    continue;
  }

  const bodyLines = css
    .slice(block.openIndex + 1, block.closeIndex)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) =>
      verticalProperties.test(line),
    );

  if (bodyLines.length === 0) {
    continue;
  }

  const mediaParents = block.parents.filter(
    (parent) =>
      parent.startsWith("@media") ||
      parent.startsWith("@supports") ||
      parent.startsWith("@container"),
  );

  report.push("-".repeat(100));
  report.push(
    `app/globals.css:${getLineNumber(
      css,
      block.openIndex,
    )}`,
  );
  report.push(
    `上下文：${
      mediaParents.length
        ? mediaParents.join(" -> ")
        : "全局规则"
    }`,
  );
  report.push(`选择器：${block.prelude}`);

  bodyLines.forEach((line) => {
    report.push(`  ${line}`);
  });
}

/* =========================================================
   5. 当前 Git 差异
========================================================= */

title("5. 当前两个文件的 Git 差异");

try {
  const diff = execSync(
    'git diff -- app/globals.css components/home/HomeCompanyStrengthSection.tsx',
    {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
    },
  );

  report.push(diff || "当前没有 Git 差异");
} catch (error) {
  report.push(
    `读取 Git 差异失败：${error.message}`,
  );
}

fs.writeFileSync(
  reportPath,
  report.join("\n"),
  "utf8",
);

console.log("");
console.log("检查完成。");
console.log("未修改任何业务文件。");
console.log(`报告：${reportPath}`);
console.log(`相关 CSS 规则数量：${ruleNumber}`);
