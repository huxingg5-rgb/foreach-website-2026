const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const newline = css.includes("\r\n") ? "\r\n" : "\n";

const targetClasses = [
  ".home-flow-mobile-stage",
  ".home-flow-mobile-tv-card",
  ".home-flow-mobile-tv-screen",
  ".home-flow-mobile-tv-image-layer",
  ".home-flow-mobile-tv-content",
  ".home-flow-mobile-tv-main",
];

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
        throw new Error(
          `第 ${index} 个字符附近存在多余的 }`,
        );
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

function selectorIsTarget(prelude) {
  if (prelude.startsWith("@")) {
    return false;
  }

  return targetClasses.some((className) =>
    prelude.includes(className),
  );
}

function getIndent(body) {
  const match = body.match(
    /\r?\n([ \t]+)[a-zA-Z-]+\s*:/,
  );

  return match ? match[1] : "  ";
}

function setProperty(body, property, value) {
  const escapedProperty = property.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  const pattern = new RegExp(
    `(^|\\r?\\n)([ \\t]*)${escapedProperty}\\s*:[^;]+;`,
    "gmi",
  );

  if (pattern.test(body)) {
    pattern.lastIndex = 0;

    return body.replace(
      pattern,
      `$1$2${property}: ${value};`,
    );
  }

  const indent = getIndent(body);

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
  const escapedProperty = property.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  const pattern = new RegExp(
    `(^|\\r?\\n)([ \\t]*)${escapedProperty}\\s*:[^;]+;`,
    "gmi",
  );

  if (!pattern.test(body)) {
    return body;
  }

  pattern.lastIndex = 0;

  return body.replace(
    pattern,
    `$1$2${property}: ${value};`,
  );
}

const blocks = parseCssBlocks(css);

const targetBlocks = blocks
  .filter((block) => selectorIsTarget(block.prelude))
  .sort((a, b) => a.openIndex - b.openIndex);

console.log("");
console.log("===== 找到的移动端电视容器规则 =====");
console.log(`规则总数：${targetBlocks.length}`);

targetBlocks.forEach((block, index) => {
  const body = css.slice(
    block.openIndex + 1,
    block.closeIndex,
  );

  const oldRadius =
    body.match(/border-radius\s*:\s*([^;]+);/i)?.[1] ??
    "未设置";

  console.log("");
  console.log(`${index + 1}. ${block.prelude}`);
  console.log(`原 border-radius：${oldRadius}`);
});

if (targetBlocks.length < 4) {
  throw new Error(
    `只找到 ${targetBlocks.length} 条规则，数量异常，已停止修改。`,
  );
}

const edits = targetBlocks.map((block) => {
  const bodyStart = block.openIndex + 1;
  const bodyEnd = block.closeIndex;

  let body = css.slice(bodyStart, bodyEnd);

  /*
    每一层都明确设为直角。
    无论前面规则还是后面的 !important 规则都会被修改。
  */
  body = setProperty(
    body,
    "border-radius",
    "0 !important",
  );

  /*
    如果存在四角单独设置，也全部清零。
  */
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

  /*
    部分旧样式可能通过 clip-path 做圆角裁切。
    只在原属性已经存在时修改，不新增。
  */
  body = replaceExistingProperty(
    body,
    "clip-path",
    "none !important",
  );

  body = replaceExistingProperty(
    body,
    "-webkit-clip-path",
    "none !important",
  );

  return {
    start: bodyStart,
    end: bodyEnd,
    replacement: body,
  };
});

/* 从文件后方开始替换，避免索引偏移 */
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
console.log("- 外层移动端舞台：直角");
console.log("- 电视卡片外层：直角");
console.log("- 图片裁切层：直角");
console.log("- 图片背景层：直角");
console.log("- 文字内容层：直角");
console.log("- 相关伪元素规则同步处理");
console.log("- 未追加新的 CSS 样式块");
