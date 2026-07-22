const fs = require("fs");

const cssPath = "app/globals.css";
let css = fs.readFileSync(cssPath, "utf8");

const newline = css.includes("\r\n") ? "\r\n" : "\n";

/*
  解析 CSS 块：
  1. 找到手机端最后生效的 .home-hero-title 字号
  2. 将所有手机端 .home-flow-title 原规则同步为相同字号
  3. 包含语言专属规则，保证所有语言一致
*/
function getPrelude(source, openIndex) {
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
  const blocks = [];
  const stack = [];

  let quote = null;
  let comment = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (comment) {
      if (char === "*" && next === "/") {
        comment = false;
        index += 1;
      }

      continue;
    }

    if (!quote && char === "/" && next === "*") {
      comment = true;
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
        prelude: getPrelude(source, index),
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
        ...block,
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

function getMobileMaxWidth(ancestors) {
  const mediaRules = ancestors.filter((item) =>
    item.trim().startsWith("@media"),
  );

  for (const media of mediaRules) {
    const match = media.match(
      /max-width\s*:\s*(\d+(?:\.\d+)?)px/i,
    );

    if (match) {
      return Number(match[1]);
    }
  }

  return null;
}

function splitSelectors(prelude) {
  return prelude
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isHeroTitleSelector(selector) {
  return selector === ".home-hero-title";
}

function isFlowTitleSelector(selector) {
  if (selector === ".home-flow-title") {
    return true;
  }

  // 兼容所有语言专属规则，例如：
  // html[lang="en"] .home-flow-title
  return /^html\[lang=["'][^"']+["']\]\s+\.home-flow-title$/.test(
    selector,
  );
}

const blocks = parseBlocks(css);

const heroCandidates = [];

for (const block of blocks) {
  const maxWidth = getMobileMaxWidth(block.ancestors);

  if (maxWidth === null || maxWidth > 768) {
    continue;
  }

  const selectors = splitSelectors(block.prelude);

  if (!selectors.some(isHeroTitleSelector)) {
    continue;
  }

  const body = css.slice(
    block.openIndex + 1,
    block.closeIndex,
  );

  const fontSizeMatch = body.match(
    /font-size\s*:\s*([^;!]+?)(\s*!important)?\s*;/i,
  );

  if (!fontSizeMatch) {
    continue;
  }

  heroCandidates.push({
    openIndex: block.openIndex,
    maxWidth,
    fontSize: fontSizeMatch[1].trim(),
    important: Boolean(fontSizeMatch[2]),
  });
}

console.log(
  `手机端首屏标题规则数量：${heroCandidates.length}`,
);

if (heroCandidates.length < 1) {
  throw new Error(
    "没有找到手机端 .home-hero-title 字号，已停止修改。",
  );
}

// 文件位置最后的规则优先生效
heroCandidates.sort(
  (a, b) => b.openIndex - a.openIndex,
);

const activeHeroRule = heroCandidates[0];
const targetFontSize = activeHeroRule.fontSize;

console.log(
  `当前首屏手机字号：${targetFontSize}`,
);
console.log(
  `来源媒体查询：max-width ${activeHeroRule.maxWidth}px`,
);

const edits = [];

for (const block of blocks) {
  const maxWidth = getMobileMaxWidth(block.ancestors);

  if (maxWidth === null || maxWidth > 768) {
    continue;
  }

  const selectors = splitSelectors(block.prelude);

  if (!selectors.some(isFlowTitleSelector)) {
    continue;
  }

  const bodyStart = block.openIndex + 1;
  const bodyEnd = block.closeIndex;
  const body = css.slice(bodyStart, bodyEnd);

  const fontSizePattern =
    /font-size\s*:\s*([^;!]+?)(\s*!important)?\s*;/i;

  const existingFontSize = body.match(fontSizePattern);

  let updatedBody;

  if (existingFontSize) {
    const important = existingFontSize[2] || " !important";

    updatedBody = body.replace(
      fontSizePattern,
      `font-size: ${targetFontSize}${important};`,
    );

    console.log(
      `${block.prelude}：${existingFontSize[1].trim()} → ${targetFontSize}`,
    );
  } else {
    const indentMatch = body.match(
      /\r?\n([ \t]+)[a-zA-Z-]+\s*:/,
    );

    const indent = indentMatch
      ? indentMatch[1]
      : "    ";

    updatedBody =
      body.replace(/\s*$/, "") +
      newline +
      indent +
      `font-size: ${targetFontSize} !important;` +
      newline;

    console.log(
      `${block.prelude}：新增字号 ${targetFontSize}`,
    );
  }

  edits.push({
    start: bodyStart,
    end: bodyEnd,
    replacement: updatedBody,
  });
}

console.log(
  `手机端第二屏标题规则数量：${edits.length}`,
);

if (edits.length < 1) {
  throw new Error(
    "没有找到手机端 .home-flow-title 原规则，已停止修改。",
  );
}

// 从后向前修改，避免位置偏移
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
  `手机端 .home-flow-title 已同步为 ${targetFontSize}`,
);
console.log("所有语言统一，未追加新的 CSS 规则。");
