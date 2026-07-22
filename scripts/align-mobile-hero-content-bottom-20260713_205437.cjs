const fs = require("fs");

const filePath = "app/globals.css";
let css = fs.readFileSync(filePath, "utf8");

const newline = css.includes("\r\n")
  ? "\r\n"
  : "\n";

const markerStart =
  "/* HOME_MOBILE_HERO_BOTTOM_ALIGN_START */";

const markerEnd =
  "/* HOME_MOBILE_HERO_BOTTOM_ALIGN_END */";

const block = [
  markerStart,
  "@media (max-width: 768px) {",
  "  /* 手机端首屏作为文案底部定位容器 */",
  "  .home-hero {",
  "    position: relative !important;",
  "  }",
  "",
  "  /*",
  "     整组文案以底部为基准：",
  "     文案增加时向上扩展，不再从顶部向下堆叠。",
  "  */",
  "  .home-hero-inner {",
  "    position: absolute !important;",
  "    z-index: 3 !important;",
  "",
  "    top: auto !important;",
  "    bottom: clamp(64px, 8svh, 96px) !important;",
  "    left: 18px !important;",
  "    right: 18px !important;",
  "",
  "    width: auto !important;",
  "    max-width: none !important;",
  "    height: auto !important;",
  "    min-height: 0 !important;",
  "",
  "    margin: 0 !important;",
  "    padding: 0 !important;",
  "    transform: none !important;",
  "",
  "    display: flex !important;",
  "    flex-direction: column !important;",
  "    justify-content: flex-end !important;",
  "    align-items: flex-start !important;",
  "    box-sizing: border-box !important;",
  "  }",
  "",
  "  /* 按钮保持在整组文案最下方 */",
  "  .home-hero-actions {",
  "    flex-shrink: 0 !important;",
  "  }",
  "}",
  markerEnd,
].join(newline);

const markedPattern =
  /\/\* HOME_MOBILE_HERO_BOTTOM_ALIGN_START \*\/[\s\S]*?\/\* HOME_MOBILE_HERO_BOTTOM_ALIGN_END \*\//;

const existingCount = (
  css.match(
    new RegExp(markedPattern.source, "g"),
  ) || []
).length;

console.log(
  `已有手机端首屏底部定位代码块：${existingCount}`,
);

if (existingCount > 1) {
  throw new Error(
    "发现多个手机端首屏底部定位代码块，停止修改。",
  );
}

if (existingCount === 1) {
  css = css.replace(
    markedPattern,
    block,
  );

  console.log(
    "已更新现有手机端底部定位代码。",
  );
} else {
  css =
    css.trimEnd() +
    newline +
    newline +
    block +
    newline;

  console.log(
    "已加入手机端首屏底部定位代码。",
  );
}

fs.writeFileSync(
  filePath,
  css,
  "utf8",
);

console.log("");
console.log("修改完成：");
console.log("- 只影响宽度不超过 768px 的手机端");
console.log("- 标题、副标题和按钮整体向下对齐");
console.log("- 按钮作为底部基准");
console.log("- 文案增加时向上扩展");
console.log("- PC 端首屏不受影响");
