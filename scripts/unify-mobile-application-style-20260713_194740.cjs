const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const newline = css.includes("\r\n") ? "\r\n" : "\n";

const oldMarkerPattern =
  /\/\* HOME_ANALYTICAL_PRODUCT_STYLE_START \*\/[\s\S]*?\/\* HOME_ANALYTICAL_PRODUCT_STYLE_END \*\//g;

const newMarkerPattern =
  /\/\* HOME_MOBILE_APPLICATION_STYLE_START \*\/[\s\S]*?\/\* HOME_MOBILE_APPLICATION_STYLE_END \*\//g;

const oldMatches = [...css.matchAll(oldMarkerPattern)];
const newMatches = [...css.matchAll(newMarkerPattern)];

console.log(
  `旧专属样式块数量：${oldMatches.length}`,
);

console.log(
  `统一样式块数量：${newMatches.length}`,
);

if (
  oldMatches.length + newMatches.length !== 1
) {
  throw new Error(
    "没有唯一找到需要替换的手机应用样式块，已停止修改。",
  );
}

const unifiedBlock = [
  "/* HOME_MOBILE_APPLICATION_STYLE_START */",

  "/* 所有手机端应用卡片统一底部渐变 */",
  ".home-flow-mobile-tv-content {",
  "  background: linear-gradient(",
  "    to top,",
  "    rgba(23, 51, 104, 0.94) 0%,",
  "    rgba(23, 51, 104, 0.72) 34%,",
  "    rgba(23, 51, 104, 0.38) 64%,",
  "    rgba(23, 51, 104, 0) 100%",
  "  ) !important;",
  "  border-radius: 0 !important;",
  "}",

  "",

  "/* 所有手机端应用标题和说明统一为荧光色 */",
  ".home-flow-mobile-tv-title,",
  ".home-flow-mobile-tv-desc {",
  "  color: #09e9b4 !important;",
  "  text-shadow: none !important;",
  "}",

  "",

  "/* 所有标签统一间距 */",
  ".home-flow-mobile-tv-tags {",
  "  display: flex !important;",
  "  flex-wrap: wrap !important;",
  "  gap: 6px !important;",
  "}",

  "",

  "/* 普通标签与可点击标签使用同一视觉 */",
  ".home-flow-mobile-tv-tags span,",
  ".home-flow-mobile-tv-tags",
  "  a.home-flow-mobile-product-tag {",
  "  display: inline-flex !important;",
  "  align-items: center !important;",
  "  justify-content: center !important;",
  "  min-height: 28px !important;",
  "  padding: 4px 8px !important;",
  "  color: #173368 !important;",
  "  background: rgba(255, 255, 255, 0.72) !important;",
  "  border: 1px solid rgba(23, 51, 104, 0.42) !important;",
  "  border-radius: 4px !important;",
  "  box-shadow: none !important;",
  "  text-decoration: none !important;",
  "  font-size: 12px !important;",
  "  font-weight: 500 !important;",
  "  line-height: 1 !important;",
  "  white-space: nowrap !important;",
  "  -webkit-tap-highlight-color: transparent;",
  "  transition:",
  "    color 120ms ease,",
  "    background-color 120ms ease,",
  "    border-color 120ms ease,",
  "    transform 120ms ease !important;",
  "}",

  "",

  ".home-flow-mobile-tv-tags",
  "  a.home-flow-mobile-product-tag {",
  "  cursor: pointer !important;",
  "}",

  "",

  "/* 手机按压反馈 */",
  ".home-flow-mobile-tv-tags span:active,",
  ".home-flow-mobile-tv-tags",
  "  a.home-flow-mobile-product-tag:active,",
  ".home-flow-mobile-tv-tags",
  "  a.home-flow-mobile-product-tag:focus-visible {",
  "  color: #173368 !important;",
  "  background: #09e9b4 !important;",
  "  border-color: #09e9b4 !important;",
  "  outline: none !important;",
  "  transform: scale(0.97) !important;",
  "}",

  "",

  "/* 防止访问过的链接改变颜色 */",
  ".home-flow-mobile-tv-tags",
  "  a.home-flow-mobile-product-tag:visited {",
  "  color: #173368 !important;",
  "}",

  "/* HOME_MOBILE_APPLICATION_STYLE_END */",
].join(newline);

if (oldMatches.length === 1) {
  css = css.replace(
    oldMarkerPattern,
    unifiedBlock,
  );

  console.log(
    "已将高端分析仪器专属样式改为全部应用统一样式。",
  );
} else {
  css = css.replace(
    newMarkerPattern,
    unifiedBlock,
  );

  console.log(
    "已更新全部手机应用统一样式。",
  );
}

fs.writeFileSync(path, css, "utf8");

console.log("");
console.log("修改完成：");
console.log("- 所有手机应用卡片使用相同渐变");
console.log("- 所有标题和说明使用荧光色");
console.log("- 所有标签半透明白底、蓝字");
console.log("- 所有标签圆角为 4px");
console.log("- 所有标签尺寸统一缩小");
console.log("- 按压时荧光色背景、深蓝字");
console.log("- 高端分析仪器已有链接继续保留");
console.log("- 未在 CSS 文件末尾追加重复规则");
