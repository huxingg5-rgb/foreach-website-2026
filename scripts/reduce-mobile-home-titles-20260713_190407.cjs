const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const nextSize = "clamp(26px, 6.5vw, 30px)";
const rulePattern = /([^{}]+)\{([^{}]*)\}/g;

let cursor = 0;
let output = "";
let changedCount = 0;
let match;

while ((match = rulePattern.exec(css)) !== null) {
  output += css.slice(cursor, match.index);

  const selectorText = match[1];
  let body = match[2];

  const selectors = selectorText
    .split(",")
    .map((selector) => selector.trim());

  const isTargetTitle = selectors.some(
    (selector) =>
      selector === ".home-hero-title" ||
      selector.endsWith(" .home-hero-title") ||
      selector === ".home-flow-title" ||
      selector.endsWith(" .home-flow-title"),
  );

  if (isTargetTitle) {
    const sizePattern =
      /font-size\s*:\s*clamp\(\s*30px\s*,\s*8\.2vw\s*,\s*38px\s*\)(\s*!important)?\s*;/i;

    if (sizePattern.test(body)) {
      body = body.replace(
        sizePattern,
        (_, important = "") =>
          `font-size: ${nextSize}${important};`,
      );

      changedCount += 1;

      console.log(
        `已修改：${selectors.join(", ")}`,
      );
    }
  }

  output += `${selectorText}{${body}}`;
  cursor = rulePattern.lastIndex;
}

output += css.slice(cursor);

console.log(`修改规则数量：${changedCount}`);

if (changedCount < 2) {
  throw new Error(
    "匹配规则少于 2 个，已停止写入，避免只修改其中一个标题。",
  );
}

if (changedCount > 10) {
  throw new Error(
    "匹配规则数量异常，已停止写入。",
  );
}

fs.writeFileSync(path, output, "utf8");

console.log(
  `手机端标题已统一改为 ${nextSize}`,
);
