const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const startMarker =
  "/* HOME_MOBILE_NEWS_HIGHLIGHT_BUTTON_START */";

const endMarker =
  "/* HOME_MOBILE_NEWS_HIGHLIGHT_BUTTON_END */";

const block = `/* HOME_MOBILE_NEWS_HIGHLIGHT_BUTTON_START */
@media (max-width: 768px) {
  .home-news-highlight-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;

    width: auto !important;
    min-width: 124px !important;
    height: 42px !important;
    min-height: 42px !important;

    padding: 0 18px !important;
    border-radius: 8px !important;

    font-size: 14px !important;
    line-height: 1 !important;
    white-space: nowrap !important;

    align-self: flex-start !important;
  }
}
/* HOME_MOBILE_NEWS_HIGHLIGHT_BUTTON_END */`;

const pattern =
  /\/\* HOME_MOBILE_NEWS_HIGHLIGHT_BUTTON_START \*\/[\s\S]*?\/\* HOME_MOBILE_NEWS_HIGHLIGHT_BUTTON_END \*\//g;

const matches = css.match(pattern) || [];

console.log(
  `现有手机端新闻按钮规则数量：${matches.length}`,
);

if (matches.length > 1) {
  throw new Error(
    "发现多组手机端新闻按钮规则，停止修改。",
  );
}

if (matches.length === 1) {
  css = css.replace(pattern, block);
  console.log("已更新现有规则。");
} else {
  css = css.trimEnd() + "\n\n" + block + "\n";
  console.log("已增加手机端专用规则。");
}

fs.writeFileSync(path, css, "utf8");

console.log("");
console.log("修改目标：");
console.log("- 只影响首页手机端");
console.log("- 按钮高度 42px");
console.log("- 最小宽度 124px");
console.log("- 字号 14px");
console.log("- PC 端不变");
