const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const newline = css.includes("\r\n") ? "\r\n" : "\n";

const blockPattern =
  /\/\* HOME_ANALYTICAL_PRODUCT_STYLE_START \*\/[\s\S]*?\/\* HOME_ANALYTICAL_PRODUCT_STYLE_END \*\//g;

const matches = [...css.matchAll(blockPattern)];

console.log(
  `高端分析仪器专属样式块数量：${matches.length}`,
);

if (matches.length !== 1) {
  throw new Error(
    "没有唯一找到高端分析仪器专属样式块，已停止修改。",
  );
}

const nextBlock = [
  "/* HOME_ANALYTICAL_PRODUCT_STYLE_START */",

  ".home-flow-mobile-tv-content.is-analytical {",
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

  ".home-flow-mobile-tv-title.is-analytical,",
  ".home-flow-mobile-tv-desc.is-analytical {",
  "  color: #09e9b4 !important;",
  "  text-shadow: none !important;",
  "}",

  "",

  ".home-flow-mobile-tv-tags.is-analytical {",
  "  gap: 6px !important;",
  "}",

  "",

  ".home-flow-mobile-tv-tags.is-analytical",
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
  "  cursor: pointer !important;",
  "  -webkit-tap-highlight-color: transparent;",
  "  transition:",
  "    color 120ms ease,",
  "    background-color 120ms ease,",
  "    border-color 120ms ease,",
  "    transform 120ms ease !important;",
  "}",

  "",

  ".home-flow-mobile-tv-tags.is-analytical",
  "  a.home-flow-mobile-product-tag:active,",
  ".home-flow-mobile-tv-tags.is-analytical",
  "  a.home-flow-mobile-product-tag:focus-visible {",
  "  color: #173368 !important;",
  "  background: #09e9b4 !important;",
  "  border-color: #09e9b4 !important;",
  "  outline: none !important;",
  "  transform: scale(0.97) !important;",
  "}",

  "/* HOME_ANALYTICAL_PRODUCT_STYLE_END */",
].join(newline);

css = css.replace(blockPattern, nextBlock);

fs.writeFileSync(path, css, "utf8");

console.log("");
console.log("修改完成：");
console.log("- 默认背景：72% 透明白");
console.log("- 默认文字：品牌深蓝");
console.log("- 点击背景：荧光色");
console.log("- 点击文字：品牌深蓝");
console.log("- 圆角：4px");
console.log("- 字号：12px");
console.log("- 标签高度：28px");
console.log("- 未在文件末尾追加样式");
