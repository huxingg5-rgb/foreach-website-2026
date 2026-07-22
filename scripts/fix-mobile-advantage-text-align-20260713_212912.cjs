const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const newline = css.includes("\r\n")
  ? "\r\n"
  : "\n";

const startMarker =
  "/* HOME_MOBILE_ADVANTAGE_TEXT_GAP_START */";

const endMarker =
  "/* HOME_MOBILE_ADVANTAGE_TEXT_GAP_END */";

const pattern =
  /\/\* HOME_MOBILE_ADVANTAGE_TEXT_GAP_START \*\/[\s\S]*?\/\* HOME_MOBILE_ADVANTAGE_TEXT_GAP_END \*\//g;

const matches = css.match(pattern) || [];

console.log(
  `现有手机端文字间距规则数量：${matches.length}`,
);

if (matches.length !== 1) {
  throw new Error(
    "没有唯一找到 HOME_MOBILE_ADVANTAGE_TEXT_GAP 规则，停止修改。",
  );
}

const newBlock = [
  startMarker,
  "  /* 手机端所有文字统一使用同一条左侧基准线 */",
  "  .home-company-advantages-section",
  "    .home-panel-title,",
  "  .home-company-advantages-section",
  "    .home-panel-line,",
  "  .home-company-advantages-section",
  "    .home-panel-brief,",
  "  .home-company-advantages-section",
  "    .home-panel-detail {",
  "    margin-left: 12px !important;",
  "    padding-left: 0 !important;",
  "    text-align: left !important;",
  "  }",
  "",
  "  /* 第一段保留与装饰线之间的距离 */",
  "  .home-company-advantages-section",
  "    .home-panel-brief {",
  "    margin-top: 18px !important;",
  "    margin-right: 0 !important;",
  "    margin-bottom: 0 !important;",
  "    padding-top: 0 !important;",
  "    padding-right: 0 !important;",
  "    padding-bottom: 0 !important;",
  "    max-width: calc(100% - 12px) !important;",
  "  }",
  "",
  "  /* 第二段靠近第一段，但不再清除左边距 */",
  "  .home-company-advantages-section",
  "    .home-panel-detail,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:hover",
  "    .home-panel-detail {",
  "    margin-top: 2px !important;",
  "    margin-right: 0 !important;",
  "    margin-bottom: 0 !important;",
  "    margin-left: 12px !important;",
  "    padding: 0 !important;",
  "    max-width: calc(100% - 12px) !important;",
  "    text-indent: 0 !important;",
  "    transform: none !important;",
  "  }",
  endMarker,
].join(newline);

css = css.replace(pattern, newBlock);

fs.writeFileSync(path, css, "utf8");

console.log("");
console.log("修改完成：");
console.log("- 标题统一左边距 12px");
console.log("- 装饰线统一左边距 12px");
console.log("- 第一段统一左边距 12px");
console.log("- 第二段统一左边距 12px");
console.log("- 两段文字间距调整为 2px");
console.log("- 所有手机端企业优势卡片同时生效");
