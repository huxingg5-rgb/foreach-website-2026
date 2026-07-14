const fs = require("fs");

const componentPath =
  "components/home/HomeApplicationFlowSection.tsx";

const cssPath = "app/globals.css";

let component = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

const componentNewLine = component.includes("\r\n")
  ? "\r\n"
  : "\n";

const cssNewLine = css.includes("\r\n")
  ? "\r\n"
  : "\n";

const desiredDeclaration = [
  "  // 中文和韩文保持默认字距，其余语言适当收紧",
  "  const compactButtonLabelStyle: CSSProperties | undefined =",
  '    locale === "zh-CN" || locale === "ko"',
  "      ? undefined",
  '      : { letterSpacing: "-0.03em" };',
].join(componentNewLine);

const englishDeclarationPattern =
  /  const englishButtonLabelStyle:\s*CSSProperties\s*\|\s*undefined\s*=\s*[\s\S]*?;\r?\n?/g;

const compactDeclarationPattern =
  /  const compactButtonLabelStyle:\s*CSSProperties\s*\|\s*undefined\s*=\s*[\s\S]*?;\r?\n?/g;

const englishDeclarations = [
  ...component.matchAll(englishDeclarationPattern),
];

const compactDeclarations = [
  ...component.matchAll(compactDeclarationPattern),
];

console.log("");
console.log("===== 1. 检查现有字距变量 =====");
console.log(
  `englishButtonLabelStyle 数量：${englishDeclarations.length}`,
);
console.log(
  `compactButtonLabelStyle 数量：${compactDeclarations.length}`,
);

if (englishDeclarations.length > 1) {
  throw new Error(
    "englishButtonLabelStyle 出现多次，已停止修改。",
  );
}

if (compactDeclarations.length > 1) {
  throw new Error(
    "compactButtonLabelStyle 出现多次，已停止修改。",
  );
}

if (
  englishDeclarations.length === 1 &&
  compactDeclarations.length === 1
) {
  throw new Error(
    "两个字距变量同时存在，已停止修改，避免误删。",
  );
}

if (englishDeclarations.length === 1) {
  component = component.replace(
    englishDeclarationPattern,
    desiredDeclaration + componentNewLine,
  );

  console.log(
    "已将旧英文专用变量改为多语言紧凑变量。",
  );
} else if (compactDeclarations.length === 1) {
  component = component.replace(
    compactDeclarationPattern,
    desiredDeclaration + componentNewLine,
  );

  console.log(
    "已校正现有多语言紧凑变量。",
  );
} else {
  const insertionPattern =
    /^  const productsHref = getLocaleAnchorPath\(locale, "products"\);$/m;

  const insertionMatches = [
    ...component.matchAll(insertionPattern),
  ];

  console.log(
    `字距变量插入位置数量：${insertionMatches.length}`,
  );

  if (insertionMatches.length !== 1) {
    throw new Error(
      "没有唯一找到 productsHref，已停止修改。",
    );
  }

  component = component.replace(
    insertionPattern,
    (matchedText) =>
      matchedText +
      componentNewLine +
      componentNewLine +
      desiredDeclaration,
  );

  console.log(
    "已在原组件变量区域新增字距变量。",
  );
}

/* 将可能存在的旧引用统一改名 */
component = component.replaceAll(
  "englishButtonLabelStyle",
  "compactButtonLabelStyle",
);

function ensureStyleOnTarget(pattern, label) {
  const matches = [...component.matchAll(pattern)];

  console.log(`${label} 匹配数量：${matches.length}`);

  if (matches.length !== 1) {
    throw new Error(
      `${label} 没有唯一匹配，已停止修改。`,
    );
  }

  const match = matches[0];
  const matchIndex = match.index;
  const indentation = match[1];

  const previousLinkIndex =
    component.lastIndexOf("<Link", matchIndex);

  const previousButtonIndex =
    component.lastIndexOf("<button", matchIndex);

  const tagStart = Math.max(
    previousLinkIndex,
    previousButtonIndex,
  );

  if (tagStart < 0) {
    throw new Error(
      `${label} 没有找到所属标签起点。`,
    );
  }

  const currentTagContent = component.slice(
    tagStart,
    matchIndex,
  );

  if (
    currentTagContent.includes(
      "style={compactButtonLabelStyle}",
    )
  ) {
    console.log(`${label} 已存在字距样式，跳过重复添加。`);
    return;
  }

  const styleLine =
    `${indentation}style={compactButtonLabelStyle}` +
    componentNewLine;

  component =
    component.slice(0, matchIndex) +
    styleLine +
    component.slice(matchIndex);

  console.log(`${label} 已接入字距样式。`);
}

console.log("");
console.log("===== 2. 给三处原有按钮接入字距样式 =====");

ensureStyleOnTarget(
  /^([ \t]*)onClick=\{\(\) => setActiveMobileAction\("applications"\)\}/m,
  "应用领域按钮",
);

ensureStyleOnTarget(
  /^([ \t]*)onClick=\{\(\) => setActiveMobileAction\("products"\)\}/m,
  "产品中心按钮",
);

ensureStyleOnTarget(
  /^([ \t]*)onClick=\{\(\) => handleMobileApplicationChange\(index\)\}/m,
  "行业切换按钮",
);

const finalStyleReferenceCount = (
  component.match(
    /style=\{compactButtonLabelStyle\}/g,
  ) || []
).length;

console.log(
  `最终字距样式引用数量：${finalStyleReferenceCount}`,
);

if (finalStyleReferenceCount !== 3) {
  throw new Error(
    "字距样式引用数量不是 3，已停止写入。",
  );
}

/* =========================================================
   修改现有选中规则的字重
========================================================= */

function updateExactCssRule(selector) {
  const rulePattern = /([^{}]+)\{([^{}]*)\}/g;
  const matches = [];

  let match;

  while ((match = rulePattern.exec(css)) !== null) {
    const selectorList = match[1]
      .split(",")
      .map((item) => item.trim());

    if (selectorList.includes(selector)) {
      matches.push({
        index: match.index,
        fullText: match[0],
        selectorText: match[1],
        body: match[2],
      });
    }
  }

  console.log(
    `${selector} 原规则数量：${matches.length}`,
  );

  if (matches.length !== 1) {
    throw new Error(
      `${selector} 没有唯一匹配，已停止修改。`,
    );
  }

  const target = matches[0];
  let body = target.body;

  const propertyPattern =
    /(^|\r?\n)([ \t]*)font-weight\s*:[^;]+;/m;

  if (propertyPattern.test(body)) {
    body = body.replace(
      propertyPattern,
      "$1$2font-weight: 500 !important;",
    );
  } else {
    const indentationMatch = body.match(
      /\r?\n([ \t]+)[a-zA-Z-]+\s*:/,
    );

    const indentation = indentationMatch
      ? indentationMatch[1]
      : "    ";

    body =
      body.replace(/\s*$/, "") +
      cssNewLine +
      indentation +
      "font-weight: 500 !important;" +
      cssNewLine;
  }

  const replacement =
    target.selectorText +
    "{" +
    body +
    "}";

  css =
    css.slice(0, target.index) +
    replacement +
    css.slice(
      target.index + target.fullText.length,
    );

  console.log(
    `${selector} 已修改为 font-weight: 500。`,
  );
}

console.log("");
console.log("===== 3. 修改原有选中状态字重 =====");

updateExactCssRule(
  ".home-flow-actions .home-flow-btn.is-active",
);

updateExactCssRule(
  ".home-flow-mobile-app-tab.is-active",
);

if (
  css.includes(
    "MOBILE_HOME_FLOW_BUTTON_STYLE_20260713",
  )
) {
  throw new Error(
    "CSS 中仍存在以前追加的按钮样式块，已停止写入。",
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
console.log("- 中文 zh-CN：默认字距");
console.log("- 韩文 ko：默认字距");
console.log("- en / es / fr / ru：letter-spacing -0.03em");
console.log("- 两组选中按钮字重：500");
console.log("- 未追加新的 CSS 规则");
