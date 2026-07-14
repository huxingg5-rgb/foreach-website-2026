const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const pattern =
  /\/\* HOME_MOBILE_NEWS_HIGHLIGHT_BUTTON_START \*\/[\s\S]*?\/\* HOME_MOBILE_NEWS_HIGHLIGHT_BUTTON_END \*\//g;

const matches = css.match(pattern) || [];

console.log(
  `现有手机端新闻按钮规则数量：${matches.length}`,
);

if (matches.length !== 1) {
  throw new Error(
    "没有唯一找到手机端新闻按钮规则，停止修改。",
  );
}

const oldBlock = matches[0];

function readValue(property) {
  const expression = new RegExp(
    `${property}\\s*:\\s*([^;]+);`,
  );

  return oldBlock.match(expression)?.[1]?.trim() || "未设置";
}

console.log("");
console.log("===== 修改前实际规则 =====");
console.log(`width：${readValue("width")}`);
console.log(`min-width：${readValue("min-width")}`);
console.log(`max-width：${readValue("max-width")}`);
console.log(`height：${readValue("height")}`);
console.log(`min-height：${readValue("min-height")}`);
console.log(`padding：${readValue("padding")}`);
console.log(`font-size：${readValue("font-size")}`);

const newBlock = `/* HOME_MOBILE_NEWS_HIGHLIGHT_BUTTON_START */
@media (max-width: 768px) {
  .home-news-highlight-card
    .home-news-highlight-footer
    .home-news-highlight-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;

    box-sizing: border-box !important;
    flex: 0 0 96px !important;
    align-self: flex-start !important;

    width: 96px !important;
    min-width: 96px !important;
    max-width: 96px !important;

    height: 34px !important;
    min-height: 34px !important;
    max-height: 34px !important;

    padding: 0 !important;
    border-radius: 6px !important;

    font-size: 12px !important;
    line-height: 1 !important;
    white-space: nowrap !important;
  }
}
/* HOME_MOBILE_NEWS_HIGHLIGHT_BUTTON_END */`;

css = css.replace(pattern, newBlock);

fs.writeFileSync(path, css, "utf8");

const verifyMatches = css.match(pattern) || [];

if (verifyMatches.length !== 1) {
  throw new Error(
    "写入后按钮规则数量异常。",
  );
}

const verifyBlock = verifyMatches[0];

if (
  !verifyBlock.includes("width: 96px !important;") ||
  !verifyBlock.includes("height: 34px !important;") ||
  !verifyBlock.includes("flex: 0 0 96px !important;")
) {
  throw new Error(
    "写入后的按钮尺寸校验失败。",
  );
}

console.log("");
console.log("===== 修改后 =====");
console.log("按钮宽度：96px");
console.log("按钮高度：34px");
console.log("按钮圆角：6px");
console.log("按钮字号：12px");
console.log("只影响首页手机端深蓝新闻卡片");
