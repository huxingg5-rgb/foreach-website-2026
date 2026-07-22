const fs = require("fs");

const cssPath = "app/globals.css";
let css = fs.readFileSync(cssPath, "utf8");

const targetFontSize = "clamp(30px, 8.2vw, 38px)";

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
      const block = stack.pop();

      if (!block) {
        throw new Error(`第 ${index} 个字符附近存在多余的 }`);
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
    throw new Error("CSS 中存在未闭合的 {");
  }

  return blocks;
}

function getMobileMedia(ancestors) {
  for (const ancestor of ancestors) {
    if (!ancestor.trim().startsWith("@media")) {
      continue;
    }

    const maxWidthMatch = ancestor.match(
      /max-width\s*:\s*(\d+(?:\.\d+)?)px/i,
    );

    if (
      maxWidthMatch &&
      Number(maxWidthMatch[1]) <= 768
    ) {
      return ancestor;
    }
  }

  return null;
}

function isFlowTitleSelector(prelude) {
  const selectors = prelude
    .split(",")
    .map((selector) => selector.trim());

  return selectors.some(
    (selector) =>
      selector === ".home-flow-title" ||
      selector.endsWith(" .home-flow-title"),
  );
}

const blocks = parseCssBlocks(css);
const edits = [];

for (const block of blocks) {
  const mobileMedia = getMobileMedia(block.ancestors);

  if (!mobileMedia) {
    continue;
  }

  if (!isFlowTitleSelector(block.prelude)) {
    continue;
  }

  const bodyStart = block.openIndex + 1;
  const bodyEnd = block.closeIndex;
  const body = css.slice(bodyStart, bodyEnd);

  const fontSizePattern =
    /font-size\s*:\s*[^;]+;/i;

  const fontSizeMatch = body.match(fontSizePattern);

  if (!fontSizeMatch) {
    throw new Error(
      `手机规则 ${block.prelude} 中没有找到 font-size。`,
    );
  }

  const oldFontSize = fontSizeMatch[0]
    .replace(/^font-size\s*:\s*/i, "")
    .replace(/;$/, "")
    .trim();

  const updatedBody = body.replace(
    fontSizePattern,
    `font-size: ${targetFontSize} !important;`,
  );

  edits.push({
    start: bodyStart,
    end: bodyEnd,
    replacement: updatedBody,
  });

  console.log("");
  console.log(`选择器：${block.prelude}`);
  console.log(`媒体查询：${mobileMedia}`);
  console.log(`原字号：${oldFontSize}`);
  console.log(`新字号：${targetFontSize} !important`);
}

console.log("");
console.log(`手机端第二屏标题规则数量：${edits.length}`);

if (edits.length < 1) {
  throw new Error(
    "没有找到手机端 .home-flow-title 原规则，已停止修改。",
  );
}

if (edits.length > 8) {
  throw new Error(
    `匹配到 ${edits.length} 个规则，数量异常，已停止修改。`,
  );
}

edits
  .sort((a, b) => b.start - a.start)
  .forEach((edit) => {
    css =
      css.slice(0, edit.start) +
      edit.replacement +
      css.slice(edit.end);
  });

fs.writeFileSync(cssPath, css, "utf8");

console.log("");
console.log("修改完成：");
console.log(
  `手机端 .home-flow-title = ${targetFontSize}`,
);
console.log("所有语言统一，桌面端未修改，未追加 CSS。");
