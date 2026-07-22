const fs = require("fs");

const path = "app/language-typography.css";
let css = fs.readFileSync(path, "utf8");

const targetSize = "clamp(24px, 6vw, 28px)";

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function lineNumberAt(source, index) {
  return source.slice(0, index).split("\n").length;
}

const targets = [
  {
    selector:
      "body .site-page--compact .home-flow-title",
    lineHeight: "1.05",
  },
  {
    selector:
      "body .site-page--standard .home-flow-title",
    lineHeight: "1.12",
  },
  {
    selector:
      "body .site-page--expanded .home-flow-title",
    lineHeight: "1.18",
  },
];

const edits = [];

for (const target of targets) {
  const selectorPattern = new RegExp(
    `${escapeRegExp(target.selector)}\\s*\\{([\\s\\S]*?)\\}`,
    "g",
  );

  const allMatches = [...css.matchAll(selectorPattern)];

  const mobileMatches = allMatches.filter((match) => {
    const body = match[1];

    const hasExpectedLineHeight = new RegExp(
      `line-height\\s*:\\s*${escapeRegExp(
        target.lineHeight,
      )}\\s*;`,
    ).test(body);

    // 上面的桌面语言规则含有 letter-spacing；
    // 手机端这组三条只有 line-height。
    const hasLetterSpacing =
      /letter-spacing\s*:/i.test(body);

    return (
      hasExpectedLineHeight &&
      !hasLetterSpacing &&
      lineNumberAt(css, match.index) > 500
    );
  });

  console.log("");
  console.log(`选择器：${target.selector}`);
  console.log(`全部规则数量：${allMatches.length}`);
  console.log(`手机目标规则数量：${mobileMatches.length}`);

  if (mobileMatches.length !== 1) {
    throw new Error(
      `${target.selector} 没有唯一找到手机端规则，已停止修改。`,
    );
  }

  const match = mobileMatches[0];
  const fullRule = match[0];
  const oldBody = match[1];

  let newBody = oldBody;

  const fontSizePattern =
    /font-size\s*:\s*[^;]+;/i;

  if (fontSizePattern.test(newBody)) {
    newBody = newBody.replace(
      fontSizePattern,
      `font-size: ${targetSize} !important;`,
    );
  } else {
    const lineHeightPattern =
      /(\r?\n)([ \t]*)line-height\s*:/i;

    if (!lineHeightPattern.test(newBody)) {
      throw new Error(
        `${target.selector} 中没有找到 line-height。`,
      );
    }

    newBody = newBody.replace(
      lineHeightPattern,
      `$1$2font-size: ${targetSize} !important;$1$2line-height:`,
    );
  }

  const newRule = fullRule.replace(
    oldBody,
    newBody,
  );

  edits.push({
    start: match.index,
    end: match.index + fullRule.length,
    replacement: newRule,
  });

  console.log(
    `行号：${lineNumberAt(css, match.index)}`,
  );
  console.log(
    `新字号：${targetSize} !important`,
  );
}

if (edits.length !== 3) {
  throw new Error(
    `最终修改数量不是 3，而是 ${edits.length}。`,
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

fs.writeFileSync(path, css, "utf8");

console.log("");
console.log("修改完成：");
console.log("- 中文、韩文及其他语言字号统一");
console.log(`- 手机端字号：${targetSize}`);
console.log("- 未追加新 CSS 块");
console.log("- 未修改桌面端语言规则");
