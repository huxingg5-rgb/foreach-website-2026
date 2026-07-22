const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

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

function parseBlocks(source) {
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
      const block = stack.pop();

      if (!block) {
        throw new Error("CSS 中存在多余的 }");
      }

      blocks.push({
        prelude: block.prelude,
        openIndex: block.openIndex,
        closeIndex: index,
      });
    }
  }

  if (stack.length > 0) {
    throw new Error("CSS 中存在未闭合的 {");
  }

  return blocks;
}

function isProcessCardRule(prelude) {
  if (!prelude || prelude.startsWith("@")) {
    return false;
  }

  return prelude
    .split(",")
    .map((selector) => selector.trim())
    .some((selector) => {
      if (
        selector.includes("::") ||
        selector.includes(":before") ||
        selector.includes(":after")
      ) {
        return false;
      }

      const normalized = selector
        .replace(/:[a-zA-Z-]+(?:\([^)]*\))?/g, "")
        .trim();

      return (
        normalized === ".home-flow-process-card" ||
        normalized.endsWith(" .home-flow-process-card")
      );
    });
}

function replaceOrInsertProperty(
  body,
  property,
  value,
) {
  const escaped = property.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  const pattern = new RegExp(
    `(^|\\r?\\n)([ \\t]*)${escaped}\\s*:[^;]+;`,
    "gmi",
  );

  const matches = [...body.matchAll(pattern)];

  if (matches.length > 0) {
    return body.replace(
      pattern,
      `$1$2${property}: ${value};`,
    );
  }

  const indentMatch = body.match(
    /\r?\n([ \t]+)[a-zA-Z-]+\s*:/,
  );

  const newline = body.includes("\r\n")
    ? "\r\n"
    : "\n";

  const indent = indentMatch
    ? indentMatch[1]
    : "  ";

  return (
    body.replace(/\s*$/, "") +
    newline +
    indent +
    `${property}: ${value};` +
    newline
  );
}

function replaceExistingProperty(
  body,
  property,
  value,
) {
  const escaped = property.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  const pattern = new RegExp(
    `(^|\\r?\\n)([ \\t]*)${escaped}\\s*:[^;]+;`,
    "gmi",
  );

  return body.replace(
    pattern,
    `$1$2${property}: ${value};`,
  );
}

const targetBlocks = parseBlocks(css)
  .filter((block) =>
    isProcessCardRule(block.prelude),
  )
  .sort((a, b) => a.openIndex - b.openIndex);

console.log("");
console.log("===== 四个流程卡片圆角规则检查 =====");
console.log(`找到卡片本体规则：${targetBlocks.length}`);

targetBlocks.forEach((block, index) => {
  const body = css.slice(
    block.openIndex + 1,
    block.closeIndex,
  );

  const currentRadius =
    body.match(
      /border-radius\s*:\s*([^;]+);/i,
    )?.[1] || "未设置";

  console.log("");
  console.log(`${index + 1}. ${block.prelude}`);
  console.log(`原圆角：${currentRadius}`);
});

if (targetBlocks.length < 1) {
  throw new Error(
    "没有找到 .home-flow-process-card 现有规则，已停止修改。",
  );
}

const edits = targetBlocks.map((block) => {
  const start = block.openIndex + 1;
  const end = block.closeIndex;

  let body = css.slice(start, end);

  body = replaceOrInsertProperty(
    body,
    "border-radius",
    "0 !important",
  );

  body = replaceExistingProperty(
    body,
    "border-top-left-radius",
    "0 !important",
  );

  body = replaceExistingProperty(
    body,
    "border-top-right-radius",
    "0 !important",
  );

  body = replaceExistingProperty(
    body,
    "border-bottom-left-radius",
    "0 !important",
  );

  body = replaceExistingProperty(
    body,
    "border-bottom-right-radius",
    "0 !important",
  );

  return {
    start,
    end,
    replacement: body,
  };
});

edits
  .sort((a, b) => b.start - a.start)
  .forEach((edit) => {
    css =
      css.slice(0, edit.start) +
      edit.replacement +
      css.slice(edit.end);
  });

fs.writeFileSync(path, css, "utf8");

console.log("");
console.log("修改完成：");
console.log("- 四个流程卡片外框全部改为直角");
console.log("- 右下角绿色装饰保持不变");
console.log("- 桌面端和手机端同步");
console.log("- 未追加新的 CSS 样式块");
