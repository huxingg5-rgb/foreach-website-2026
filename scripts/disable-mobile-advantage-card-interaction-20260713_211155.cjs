const fs = require("fs");

const cssPath = "app/globals.css";
const componentPath =
  "components/home/HomeCompanyStrengthSection.tsx";

let css = fs.readFileSync(cssPath, "utf8");
const component = fs.readFileSync(
  componentPath,
  "utf8",
);

const newline = css.includes("\r\n")
  ? "\r\n"
  : "\n";

/* =========================================================
   1. 检查真实组件结构
========================================================= */

const requiredClasses = [
  "home-company-advantages-section",
  "home-advantage-panel",
  "home-panel-content",
  "home-panel-arrow",
];

console.log("");
console.log("===== 手机端企业优势卡片结构检查 =====");

for (const className of requiredClasses) {
  const count =
    component.split(className).length - 1;

  console.log(`${className}：${count}`);

  if (count < 1) {
    throw new Error(
      `组件中没有找到 ${className}，停止修改。`,
    );
  }
}

/* =========================================================
   2. 检查当前交互规则
========================================================= */

const interactionPatterns = [
  /\.home-advantage-panel[^{]*(?::hover|:active|:focus|:focus-within)/g,
  /\.home-panel-arrow/g,
  /\.home-advantage-panel/g,
];

console.log("");
console.log("===== 当前 CSS 规则检查 =====");

interactionPatterns.forEach(
  (pattern, index) => {
    const count = (
      css.match(pattern) || []
    ).length;

    console.log(
      `检查项 ${index + 1}：${count}`,
    );
  },
);

/* =========================================================
   3. 手机端静态展示规则

   说明：
   - pointer-events: none 会让卡片不再响应触摸和 hover；
   - 页面上下滑动仍由外层页面处理；
   - PC 端不受影响。
========================================================= */

const markerStart =
  "/* HOME_MOBILE_ADVANTAGE_STATIC_START */";

const markerEnd =
  "/* HOME_MOBILE_ADVANTAGE_STATIC_END */";

const block = [
  markerStart,
  "@media (max-width: 768px) {",
  "  /* 手机端卡片只展示内容，不承担任何交互 */",
  "  .home-company-advantages-section",
  "    .home-advantage-panel {",
  "    pointer-events: none !important;",
  "    cursor: default !important;",
  "    touch-action: pan-y !important;",
  "    -webkit-tap-highlight-color: transparent !important;",
  "    transition: none !important;",
  "    animation: none !important;",
  "  }",
  "",
  "  /* 清除点击、按压、悬停可能产生的位移和缩放 */",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:hover,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:active,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:focus,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:focus-within {",
  "    transform: none !important;",
  "    animation: none !important;",
  "    transition: none !important;",
  "    outline: none !important;",
  "  }",
  "",
  "  /* 卡片内部文字和装饰不再播放交互动画 */",
  "  .home-company-advantages-section",
  "    .home-advantage-panel *,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel::before,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel::after {",
  "    transition: none !important;",
  "    animation: none !important;",
  "  }",
  "",
  "  /* 箭头会让用户误以为卡片可以点击，手机端隐藏 */",
  "  .home-company-advantages-section",
  "    .home-panel-arrow {",
  "    display: none !important;",
  "  }",
  "}",
  markerEnd,
].join(newline);

const existingPattern =
  /\/\* HOME_MOBILE_ADVANTAGE_STATIC_START \*\/[\s\S]*?\/\* HOME_MOBILE_ADVANTAGE_STATIC_END \*\//;

const existingCount = (
  css.match(
    new RegExp(existingPattern.source, "g"),
  ) || []
).length;

console.log("");
console.log(
  `已有手机端静态规则：${existingCount}`,
);

if (existingCount > 1) {
  throw new Error(
    "发现多个重复的手机端静态规则，停止修改。",
  );
}

if (existingCount === 1) {
  css = css.replace(
    existingPattern,
    block,
  );

  console.log("已更新现有规则。");
} else {
  css =
    css.trimEnd() +
    newline +
    newline +
    block +
    newline;

  console.log("已加入手机端静态规则。");
}

fs.writeFileSync(
  cssPath,
  css,
  "utf8",
);

console.log("");
console.log("修改完成：");
console.log("- 只影响手机端企业优势卡片");
console.log("- 卡片不再响应点击、悬停和按压");
console.log("- 去掉位移、缩放和过渡动画");
console.log("- 隐藏交互箭头");
console.log("- PC 端保持原有交互");
