const fs = require("fs");
const path = require("path");

const cssPath = "app/globals.css";
const reportPath =
  process.argv[2] || "home-flow-title-audit.txt";

const css = fs.readFileSync(cssPath, "utf8");
const report = [];

function add(text = "") {
  report.push(text);
}

function lineNumberAt(source, index) {
  return source.slice(0, index).split("\n").length;
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
  const blocks = [];
  const stack = [];

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
      const block = stack.pop();

      if (!block) {
        throw new Error(
          `CSS 第 ${lineNumberAt(source, index)} 行附近存在多余的 }`,
        );
      }

      blocks.push({
        prelude: block.prelude,
        openIndex: block.openIndex,
        closeIndex: index,
        ancestors: stack.map((item) => item.prelude),
      });
    }
  }

  if (stack.length > 0) {
    throw new Error("CSS 存在未闭合的 {");
  }

  return blocks;
}

function readProperty(body, property) {
  const escaped = property.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  const match = body.match(
    new RegExp(
      `${escaped}\\s*:\\s*([^;]+);`,
      "i",
    ),
  );

  return match ? match[1].trim() : "未设置";
}

function mediaMatchesWidth(ancestors, width) {
  const mediaRules = ancestors.filter((item) =>
    item.trim().startsWith("@media"),
  );

  for (const media of mediaRules) {
    const maxMatches = [
      ...media.matchAll(
        /max-width\s*:\s*(\d+(?:\.\d+)?)px/gi,
      ),
    ];

    const minMatches = [
      ...media.matchAll(
        /min-width\s*:\s*(\d+(?:\.\d+)?)px/gi,
      ),
    ];

    for (const match of maxMatches) {
      if (width > Number(match[1])) {
        return false;
      }
    }

    for (const match of minMatches) {
      if (width < Number(match[1])) {
        return false;
      }
    }
  }

  return true;
}

function walkFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const output = [];

  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
  })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      output.push(...walkFiles(fullPath));
      continue;
    }

    if (
      /\.(tsx|ts|jsx|js|json|css|scss)$/i.test(entry.name)
    ) {
      output.push(fullPath);
    }
  }

  return output;
}

add("首页第二屏标题审查报告");
add(`生成时间：${new Date().toLocaleString()}`);
add("");

add("===== 1. 文案来源 =====");

const sourceFiles = [
  ...walkFiles("app"),
  ...walkFiles("components"),
  ...walkFiles("data"),
  ...walkFiles("lib"),
];

const searchTexts = [
  "一套液路系统",
  "让复杂流动更简单",
  "home-flow-title",
];

let sourceHitCount = 0;

for (const filePath of sourceFiles) {
  const source = fs.readFileSync(filePath, "utf8");
  const lines = source.split(/\r?\n/);

  lines.forEach((line, index) => {
    const matchedTexts = searchTexts.filter((text) =>
      line.includes(text),
    );

    if (matchedTexts.length === 0) {
      return;
    }

    sourceHitCount += 1;

    add("");
    add(`文件：${filePath}`);
    add(`行号：${index + 1}`);
    add(`命中：${matchedTexts.join("、")}`);

    const start = Math.max(0, index - 3);
    const end = Math.min(lines.length, index + 5);

    for (let lineIndex = start; lineIndex < end; lineIndex += 1) {
      const marker = lineIndex === index ? ">>" : "  ";

      add(
        `${marker} ${String(lineIndex + 1).padStart(5, " ")} | ${lines[lineIndex]}`,
      );
    }
  });
}

add("");
add(`文案与 class 命中数量：${sourceHitCount}`);
add("");

add("===== 2. 所有 .home-flow-title CSS 规则 =====");

const blocks = parseCssBlocks(css);

const titleBlocks = blocks
  .filter((block) => {
    const selectors = block.prelude
      .split(",")
      .map((item) => item.trim());

    return selectors.some(
      (selector) =>
        selector === ".home-flow-title" ||
        selector.endsWith(" .home-flow-title"),
    );
  })
  .sort((a, b) => a.openIndex - b.openIndex);

add(`规则总数：${titleBlocks.length}`);

titleBlocks.forEach((block, index) => {
  const body = css.slice(
    block.openIndex + 1,
    block.closeIndex,
  );

  const mediaRules = block.ancestors.filter((item) =>
    item.trim().startsWith("@media"),
  );

  add("");
  add(`----- 规则 ${index + 1} -----`);
  add(
    `起始行：${lineNumberAt(css, block.openIndex)}`,
  );
  add(`选择器：${block.prelude}`);

  add(
    `媒体查询：${
      mediaRules.length > 0
        ? mediaRules.join("  >  ")
        : "无，属于全局规则"
    }`,
  );

  add(`font-size：${readProperty(body, "font-size")}`);
  add(`font-weight：${readProperty(body, "font-weight")}`);
  add(`line-height：${readProperty(body, "line-height")}`);
  add(
    `letter-spacing：${readProperty(
      body,
      "letter-spacing",
    )}`,
  );
  add(`margin：${readProperty(body, "margin")}`);
  add(`transform：${readProperty(body, "transform")}`);

  add(
    `390px 是否匹配：${
      mediaMatchesWidth(block.ancestors, 390)
        ? "是"
        : "否"
    }`,
  );

  add(
    `430px 是否匹配：${
      mediaMatchesWidth(block.ancestors, 430)
        ? "是"
        : "否"
    }`,
  );

  add(
    `768px 是否匹配：${
      mediaMatchesWidth(block.ancestors, 768)
        ? "是"
        : "否"
    }`,
  );

  add("完整规则：");
  add(`${block.prelude} {${body}}`);
});

for (const width of [390, 430, 768]) {
  add("");
  add(`===== 3.${width} 宽度下会匹配的规则 =====`);

  const matchingRules = titleBlocks.filter((block) =>
    mediaMatchesWidth(block.ancestors, width),
  );

  matchingRules.forEach((block, index) => {
    const body = css.slice(
      block.openIndex + 1,
      block.closeIndex,
    );

    add(
      `${index + 1}. 行 ${lineNumberAt(
        css,
        block.openIndex,
      )}｜${block.prelude}`,
    );

    add(
      `   font-size：${readProperty(
        body,
        "font-size",
      )}`,
    );

    add(
      `   font-weight：${readProperty(
        body,
        "font-weight",
      )}`,
    );
  });

  if (matchingRules.length > 0) {
    const lastRule =
      matchingRules[matchingRules.length - 1];

    add("");
    add(
      `源码顺序最后一条：行 ${lineNumberAt(
        css,
        lastRule.openIndex,
      )}｜${lastRule.prelude}`,
    );

    add(
      "注意：还需要结合选择器优先级与 !important 判断最终覆盖结果。",
    );
  } else {
    add("没有匹配规则。");
  }
}

fs.writeFileSync(
  reportPath,
  report.join("\r\n"),
  "utf8",
);

console.log(report.join("\n"));
console.log("");
console.log(`报告已生成：${reportPath}`);
console.log("本次没有修改任何项目文件。");
