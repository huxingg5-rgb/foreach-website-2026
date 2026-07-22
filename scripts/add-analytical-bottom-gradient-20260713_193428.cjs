const fs = require("fs");

const componentPath =
  "components/home/HomeApplicationFlowSection.tsx";

const cssPath = "app/globals.css";

let component = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

const componentNewline = component.includes("\r\n")
  ? "\r\n"
  : "\n";

const cssNewline = css.includes("\r\n")
  ? "\r\n"
  : "\n";

/* =========================================================
   1. 给手机内容层增加高端分析仪器识别 class
========================================================= */

const contentAlreadyUpdated =
  /home-flow-mobile-tv-content[\s\S]{0,260}is-analytical/.test(
    component,
  );

if (contentAlreadyUpdated) {
  console.log(
    "手机内容层已经存在 is-analytical class，跳过组件修改。",
  );
} else {
  const oldContentPattern =
    /className=\{\s*isMobileChanging\s*\?\s*"home-flow-mobile-tv-content is-changing"\s*:\s*"home-flow-mobile-tv-content"\s*\}/;

  const matchCount = (
    component.match(
      new RegExp(oldContentPattern.source, "g"),
    ) || []
  ).length;

  console.log(
    `手机内容层原结构数量：${matchCount}`,
  );

  if (matchCount !== 1) {
    throw new Error(
      "没有唯一找到手机内容层 className，已停止修改。",
    );
  }

  const newContentClass = [
    "className={[",
    '                    "home-flow-mobile-tv-content",',
    '                    isMobileChanging ? "is-changing" : "",',
    "                    activeMobileApplication.key ===",
    '                    "analytical-instruments"',
    '                      ? "is-analytical"',
    '                      : "",',
    "                  ]",
    "                    .filter(Boolean)",
    '                    .join(" ")}',
  ].join(componentNewline);

  component = component.replace(
    oldContentPattern,
    newContentClass,
  );

  console.log(
    "已给高端分析仪器内容层增加 is-analytical class。",
  );
}

/* =========================================================
   2. 在现有高端分析仪器专属样式块中增加渐变
========================================================= */

const styleBlockPattern =
  /\/\* HOME_ANALYTICAL_PRODUCT_STYLE_START \*\/[\s\S]*?\/\* HOME_ANALYTICAL_PRODUCT_STYLE_END \*\//;

const styleBlockMatch = css.match(styleBlockPattern);

console.log(
  `专属样式块数量：${styleBlockMatch ? 1 : 0}`,
);

if (!styleBlockMatch) {
  throw new Error(
    "没有找到 HOME_ANALYTICAL_PRODUCT_STYLE 样式块，已停止修改。",
  );
}

const oldStyleBlock = styleBlockMatch[0];

const gradientRule = [
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
].join(cssNewline);

const existingGradientRulePattern =
  /\.home-flow-mobile-tv-content\.is-analytical\s*\{[\s\S]*?\}/;

let newStyleBlock;

if (existingGradientRulePattern.test(oldStyleBlock)) {
  newStyleBlock = oldStyleBlock.replace(
    existingGradientRulePattern,
    gradientRule,
  );

  console.log("已更新原有底部渐变规则。");
} else {
  const marker =
    "/* HOME_ANALYTICAL_PRODUCT_STYLE_START */";

  newStyleBlock = oldStyleBlock.replace(
    marker,
    marker +
      cssNewline +
      gradientRule +
      cssNewline,
  );

  console.log(
    "已在现有专属样式块内增加底部渐变。",
  );
}

css = css.replace(
  oldStyleBlock,
  newStyleBlock,
);

fs.writeFileSync(
  componentPath,
  component,
  "utf8",
);

fs.writeFileSync(
  cssPath,
  css,
  "utf8",
);

console.log("");
console.log("修改完成：");
console.log("- 底部为品牌蓝");
console.log("- 向上逐渐透明");
console.log("- 高端分析仪器标题和说明仍为荧光色");
console.log("- 四个产品标签仍可点击");
console.log("- 其他应用卡片不受影响");
console.log("- 没有在 CSS 文件末尾追加覆盖块");
