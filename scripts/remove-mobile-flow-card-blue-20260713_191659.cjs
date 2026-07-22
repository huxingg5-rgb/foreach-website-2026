const fs = require("fs");

const componentPath =
  "components/home/HomeApplicationFlowSection.tsx";

const cssPath = "app/globals.css";

let component = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

const newline = css.includes("\r\n") ? "\r\n" : "\n";

/* =========================================================
   1. 删除手机端图片的深蓝渐变遮罩
   只修改 createMobileTvBackground，不修改桌面端
========================================================= */

const mobileBlueOverlayPattern =
  /backgroundImage:\s*`\s*linear-gradient\(\s*135deg\s*,\s*rgba\(3\s*,\s*18\s*,\s*42\s*,\s*0\.72\)\s*,\s*rgba\(0\s*,\s*38\s*,\s*86\s*,\s*0\.78\)\s*\)\s*,\s*url\("\$\{imagePath\}"\)\s*`\s*,/g;

const overlayMatches = [
  ...component.matchAll(mobileBlueOverlayPattern),
];

console.log(
  `手机端深蓝遮罩匹配数量：${overlayMatches.length}`,
);

if (overlayMatches.length !== 1) {
  throw new Error(
    "没有唯一找到手机端深蓝遮罩，已停止修改。",
  );
}

component = component.replace(
  mobileBlueOverlayPattern,
  'backgroundImage: `url("${imagePath}")`,',
);

/* =========================================================
   2. 修改现有手机卡片 CSS
   不追加新的 CSS 样式块
========================================================= */

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function updateProperty(body, property, value) {
  const propertyPattern = new RegExp(
    `(^|\\r?\\n)([ \\t]*)${escapeRegExp(
      property,
    )}\\s*:[^;]+;`,
    "gm",
  );

  if (propertyPattern.test(body)) {
    propertyPattern.lastIndex = 0;

    return body.replace(
      propertyPattern,
      `$1$2${property}: ${value};`,
    );
  }

  const indentMatch = body.match(
    /\r?\n([ \t]+)[a-zA-Z-]+\s*:/,
  );

  const indent = indentMatch
    ? indentMatch[1]
    : "    ";

  return (
    body.replace(/\s*$/, "") +
    newline +
    indent +
    `${property}: ${value};`
  );
}

function updateSelector(selector, properties, required = true) {
  const pattern = new RegExp(
    `(^|\\n)([ \\t]*${escapeRegExp(
      selector,
    )}\\s*\\{)([\\s\\S]*?)(\\n[ \\t]*\\})`,
    "g",
  );

  let count = 0;

  css = css.replace(
    pattern,
    (
      fullText,
      lineStart,
      ruleStart,
      originalBody,
      ruleEnd,
    ) => {
      count += 1;

      let body = originalBody;

      for (const [property, value] of Object.entries(
        properties,
      )) {
        body = updateProperty(
          body,
          property,
          value,
        );
      }

      return (
        lineStart +
        ruleStart +
        body +
        ruleEnd
      );
    },
  );

  console.log(`${selector} 规则数量：${count}`);

  if (required && count < 1) {
    throw new Error(
      `没有找到 ${selector} 原有规则，已停止修改。`,
    );
  }
}

/* 外层卡片：直角、透明底 */
updateSelector(
  ".home-flow-mobile-tv-card",
  {
    "border-radius": "0 !important",
    background: "transparent !important",
  },
);

/* 图片显示区域：直角、透明底 */
updateSelector(
  ".home-flow-mobile-tv-screen",
  {
    "border-radius": "0 !important",
    background: "transparent !important",
  },
);

/* 图片层：取消圆角，但保留实际背景图片 */
updateSelector(
  ".home-flow-mobile-tv-image-layer",
  {
    "border-radius": "0 !important",
  },
);

/* 内容层：不再使用蓝色背景 */
updateSelector(
  ".home-flow-mobile-tv-content",
  {
    "border-radius": "0 !important",
    background: "transparent !important",
  },
  false,
);

/*
  兼容可能存在的额外遮罩。
  找不到就跳过，不新增选择器。
*/
const optionalOverlaySelectors = [
  ".home-flow-mobile-tv-card::before",
  ".home-flow-mobile-tv-card::after",
  ".home-flow-mobile-tv-screen::before",
  ".home-flow-mobile-tv-screen::after",
  ".home-flow-mobile-tv-content::before",
  ".home-flow-mobile-tv-content::after",
];

for (const selector of optionalOverlaySelectors) {
  updateSelector(
    selector,
    {
      background: "transparent !important",
      "background-image": "none !important",
    },
    false,
  );
}

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
console.log("- 手机应用卡片取消圆角");
console.log("- 手机图片取消深蓝渐变遮罩");
console.log("- 卡片和内容容器背景透明");
console.log("- 桌面端未修改");
console.log("- 应用切换按钮未修改");
console.log("- 没有追加新的 CSS 样式块");
