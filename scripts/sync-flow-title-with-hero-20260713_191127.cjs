const fs = require("fs");

const path = "app/language-typography.css";
let css = fs.readFileSync(path, "utf8");

const targetSize = "clamp(30px, 8.2vw, 38px)";

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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getLineNumber(source, index) {
  return source.slice(0, index).split("\n").length;
}

const edits = [];

for (const target of targets) {
  const rulePattern = new RegExp(
    `${escapeRegExp(target.selector)}\\s*\\{([\\s\\S]*?)\\}`,
    "g",
  );

  const matches = [...css.matchAll(rulePattern)];

  const mobileMatches = matches.filter((match) => {
    const body = match[1];
    const lineNumber = getLineNumber(css, match.index);

    const hasExpectedLineHeight = new RegExp(
      `line-height\\s*:\\s*${escapeRegExp(
        target.lineHeight,
      )}\\s*;`,
    ).test(body);

    const hasLetterSpacing =
      /letter-spacing\s*:/i.test(body);

    return (
      lineNumber > 500 &&
      hasExpectedLineHeight &&
      !hasLetterSpacing
    );
  });

  console.log("");
  console.log(`选择器：${target.selector}`);
  console.log(`手机端目标数量：${mobileMatches.length}`);

  if (mobileMatches.length !== 1) {
    throw new Error(
      `${target.selector} 没有唯一定位手机端规则，已停止修改。`,
    );
  }

  const match = mobileMatches[0];
  const oldRule = match[0];
  const oldBody = match[1];

  let newBody = oldBody;

  if (/font-size\s*:/i.test(newBody)) {
    newBody = newBody.replace(
      /font-size\s*:\s*[^;]+;/i,
      `font-size: ${targetSize} !important;`,
    );
  } else {
    newBody = newBody.replace(
      /(\r?\n)([ \t]*)line-height\s*:/i,
      `$1$2font-size: ${targetSize} !important;$1$2line-height:`,
    );
  }

  edits.push({
    start: match.index,
    end: match.index + oldRule.length,
    replacement: oldRule.replace(oldBody, newBody),
  });

  console.log(
    `行号：${getLineNumber(css, match.index)}`,
  );
  console.log(`字号：${targetSize} !important`);
}

if (edits.length !== 3) {
  throw new Error(
    `修改数量异常：${edits.length}`,
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
console.log("- 第二屏标题字号与首屏一致");
console.log("- 中文、韩文及其他语言统一");
console.log("- 未修改桌面端");
console.log("- 未追加 CSS 规则");
