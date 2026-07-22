const fs = require("fs");

const cssPath = "app/globals.css";
let css = fs.readFileSync(cssPath, "utf8");

// 用等长空格隐藏注释，确保字符下标不变
const maskedCss = css.replace(
  /\/\*[\s\S]*?\*\//g,
  (comment) => " ".repeat(comment.length),
);

function getBlockStackAt(targetIndex) {
  const stack = [];
  let quote = null;

  for (let index = 0; index < targetIndex; index += 1) {
    const char = maskedCss[index];

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
      let cursor = index - 1;

      while (cursor >= 0 && /\s/.test(maskedCss[cursor])) {
        cursor -= 1;
      }

      const preludeEnd = cursor + 1;

      while (
        cursor >= 0 &&
        maskedCss[cursor] !== "{" &&
        maskedCss[cursor] !== "}" &&
        maskedCss[cursor] !== ";"
      ) {
        cursor -= 1;
      }

      const prelude = maskedCss
        .slice(cursor + 1, preludeEnd)
        .trim();

      stack.push({
        prelude,
        openIndex: index,
      });

      continue;
    }

    if (char === "}") {
      stack.pop();
    }
  }

  return stack;
}

const rulePattern = /([^{}]+)\{([^{}]*)\}/g;
const edits = [];

let match;

while ((match = rulePattern.exec(css)) !== null) {
  const selector = match[1].trim();

  const selectors = selector
    .split(",")
    .map((item) => item.trim());

  // 只处理准确的 .home-hero-title，不碰语言和其他组合规则
  if (!selectors.includes(".home-hero-title")) {
    continue;
  }

  const stack = getBlockStackAt(match.index);

  const mobileMedia = stack
    .map((block) => block.prelude)
    .filter((prelude) => prelude.startsWith("@media"))
    .find((prelude) => {
      const widthMatch = prelude.match(
        /max-width\s*:\s*(\d+(?:\.\d+)?)px/i,
      );

      if (!widthMatch) {
        return false;
      }

      return Number(widthMatch[1]) <= 768;
    });

  if (!mobileMedia) {
    continue;
  }

  const fullRule = match[0];
  const openBraceOffset = fullRule.indexOf("{");
  const closeBraceOffset = fullRule.lastIndexOf("}");

  const bodyStart = match.index + openBraceOffset + 1;
  const bodyEnd = match.index + closeBraceOffset;
  const body = css.slice(bodyStart, bodyEnd);

  const fontSizePattern =
    /font-size\s*:\s*([^;!]+?)(\s*!important)?\s*;/i;

  const fontSizeMatch = body.match(fontSizePattern);

  if (!fontSizeMatch) {
    throw new Error(
      `手机端 .home-hero-title 中没有找到 font-size：${mobileMedia}`,
    );
  }

  console.log("");
  console.log("找到手机端标题规则：");
  console.log(`媒体查询：${mobileMedia}`);
  console.log(`原字号：${fontSizeMatch[1].trim()}`);

  const important = fontSizeMatch[2] || "";

  const updatedBody = body.replace(
    fontSizePattern,
    `font-size: clamp(30px, 8.2vw, 38px)${important};`,
  );

  edits.push({
    start: bodyStart,
    end: bodyEnd,
    replacement: updatedBody,
  });
}

console.log(`手机端标题规则匹配数量：${edits.length}`);

if (edits.length < 1) {
  throw new Error(
    "没有找到位于 max-width: 768px 以内的 .home-hero-title 原规则。",
  );
}

if (edits.length > 3) {
  throw new Error(
    `匹配到 ${edits.length} 个手机标题规则，数量异常，已停止修改。`,
  );
}

// 从后向前替换，避免字符下标变化
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
console.log("font-size: clamp(30px, 8.2vw, 38px);");
console.log("未追加新 CSS，未修改桌面端标题。");
