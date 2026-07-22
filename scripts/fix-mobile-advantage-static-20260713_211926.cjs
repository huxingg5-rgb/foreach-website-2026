const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const newline = css.includes("\r\n")
  ? "\r\n"
  : "\n";

const startMarker =
  "/* HOME_MOBILE_ADVANTAGE_STATIC_START */";

const endMarker =
  "/* HOME_MOBILE_ADVANTAGE_STATIC_END */";

const pattern =
  /\/\* HOME_MOBILE_ADVANTAGE_STATIC_START \*\/[\s\S]*?\/\* HOME_MOBILE_ADVANTAGE_STATIC_END \*\//g;

const matches = css.match(pattern) || [];

console.log(
  `现有手机端静态规则数量：${matches.length}`,
);

if (matches.length !== 1) {
  throw new Error(
    "没有唯一找到现有 HOME_MOBILE_ADVANTAGE_STATIC 规则，停止修改。",
  );
}

const block = [
  startMarker,
  "@media (max-width: 768px) {",
  "  /* 手机端只保留静态信息展示 */",
  "  .home-company-advantages-section",
  "    .home-advantage-panel {",
  "    pointer-events: none !important;",
  "    cursor: default !important;",
  "    touch-action: pan-y !important;",
  "    -webkit-tap-highlight-color: transparent !important;",
  "",
  "    flex: none !important;",
  "    flex-grow: 0 !important;",
  "    flex-shrink: 0 !important;",
  "    flex-basis: auto !important;",
  "",
  "    transition: none !important;",
  "    animation: none !important;",
  "    will-change: auto !important;",
  "  }",
  "",
  "  /* 父容器进入 hover 时也不允许卡片重新分配宽度 */",
  "  .home-company-advantages-section",
  "    .home-advantage-panels:hover",
  "    .home-advantage-panel,",
  "  .home-company-advantages-section",
  "    .home-advantage-panels:hover",
  "    .home-advantage-panel:hover {",
  "    flex: none !important;",
  "    flex-grow: 0 !important;",
  "    flex-shrink: 0 !important;",
  "    flex-basis: auto !important;",
  "  }",
  "",
  "  .home-company-advantages-section",
  "    .home-advantage-panels,",
  "  .home-company-advantages-section",
  "    .home-advantage-panels:hover {",
  "    gap: 12px !important;",
  "  }",
  "",
  "  /* 背景图保持默认状态，不放大、不增强饱和度 */",
  "  .home-company-advantages-section",
  "    .home-advantage-panel::before,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:hover::before,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:active::before,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:focus::before {",
  "    transform: scale(1.02) !important;",
  "    filter: none !important;",
  "    transition: none !important;",
  "    animation: none !important;",
  "  }",
  "",
  "  /* 遮罩始终保持手机端默认效果 */",
  "  .home-company-advantages-section",
  "    .home-advantage-panel::after,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:hover::after,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:active::after,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:focus::after {",
  "    background: linear-gradient(",
  "      180deg,",
  "      rgba(0, 0, 0, 0.12) 0%,",
  "      rgba(0, 0, 0, 0.32) 58%,",
  "      rgba(0, 0, 0, 0.48) 100%",
  "    ) !important;",
  "    transition: none !important;",
  "  }",
  "",
  "  /* 内容不能因为 hover 横向移动 */",
  "  .home-company-advantages-section",
  "    .home-panel-content,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:hover",
  "    .home-panel-content,",
  "  .home-company-advantages-section",
  "    .home-advantage-panels:hover",
  "    .home-advantage-panel:hover",
  "    .home-panel-content {",
  "    transform: none !important;",
  "    transition: none !important;",
  "    animation: none !important;",
  "  }",
  "",
  "  /* 标题始终使用手机端固定字号 */",
  "  .home-company-advantages-section",
  "    .home-panel-title,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:hover",
  "    .home-panel-title,",
  "  .home-company-advantages-section",
  "    .home-advantage-panels:hover",
  "    .home-advantage-panel:hover",
  "    .home-panel-title {",
  "    font-size: clamp(18px, 2.2vw, 24px) !important;",
  "    line-height: 1.12 !important;",
  "    letter-spacing: 0.01em !important;",
  "    transform: none !important;",
  "    transition: none !important;",
  "  }",
  "",
  "  /* 装饰线始终保持默认长度和品牌色 */",
  "  .home-company-advantages-section",
  "    .home-panel-line,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:hover",
  "    .home-panel-line {",
  "    width: 52px !important;",
  "    background: #09e9b4 !important;",
  "    transform: none !important;",
  "    transition: none !important;",
  "  }",
  "",
  "  /* 两段说明文字始终完整显示，不再由 hover 展开 */",
  "  .home-company-advantages-section",
  "    .home-panel-brief,",
  "  .home-company-advantages-section",
  "    .home-panel-detail,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:hover",
  "    .home-panel-brief,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:hover",
  "    .home-panel-detail {",
  "    opacity: 1 !important;",
  "    transform: none !important;",
  "    pointer-events: none !important;",
  "    transition: none !important;",
  "    animation: none !important;",
  "  }",
  "",
  "  .home-company-advantages-section",
  "    .home-panel-detail,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:hover",
  "    .home-panel-detail {",
  "    max-height: none !important;",
  "    margin-top: 10px !important;",
  "    overflow: visible !important;",
  "  }",
  "",
  "  /* 箭头代表可进入或可点击，手机端直接隐藏 */",
  "  .home-company-advantages-section",
  "    .home-panel-arrow,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:hover",
  "    .home-panel-arrow {",
  "    display: none !important;",
  "    opacity: 0 !important;",
  "    transform: none !important;",
  "    pointer-events: none !important;",
  "  }",
  "",
  "  .home-company-advantages-section",
  "    .home-advantage-panel *,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel::before,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel::after {",
  "    animation: none !important;",
  "    transition: none !important;",
  "  }",
  "}",
  endMarker,
].join(newline);

css = css.replace(pattern, block);

fs.writeFileSync(path, css, "utf8");

console.log("");
console.log("修改完成：");
console.log("- 更新原有手机端静态规则");
console.log("- 未新增第二套覆盖代码");
console.log("- 卡片宽度不再变化");
console.log("- 背景不再放大");
console.log("- 标题字号不再变化");
console.log("- 装饰线不再展开");
console.log("- 说明文字始终显示");
console.log("- 箭头已隐藏");
console.log("- PC 端交互保持不变");
