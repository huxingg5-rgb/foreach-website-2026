const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const blockPattern =
  /\/\* HOME_ANALYTICAL_PRODUCT_STYLE_START \*\/[\s\S]*?\/\* HOME_ANALYTICAL_PRODUCT_STYLE_END \*\//;

const blockMatch = css.match(blockPattern);

console.log(
  `高端分析仪器专属样式块数量：${
    blockMatch ? 1 : 0
  }`,
);

if (!blockMatch) {
  throw new Error(
    "没有找到高端分析仪器专属样式块，已停止修改。",
  );
}

const oldBlock = blockMatch[0];

const textRulePattern =
  /(\.home-flow-mobile-tv-title\.is-analytical\s*,\s*\.home-flow-mobile-tv-desc\.is-analytical\s*\{[\s\S]*?color\s*:\s*)#[0-9a-fA-F]{6}(\s*!important\s*;)/;

const ruleMatches = oldBlock.match(textRulePattern);

console.log(
  `标题与说明颜色规则数量：${
    ruleMatches ? 1 : 0
  }`,
);

if (!ruleMatches) {
  throw new Error(
    "没有唯一找到标题和说明的颜色规则，已停止修改。",
  );
}

const newBlock = oldBlock.replace(
  textRulePattern,
  "$1#09e9b4$2",
);

css = css.replace(oldBlock, newBlock);

fs.writeFileSync(path, css, "utf8");

console.log("");
console.log("修改完成：");
console.log("- 高端分析仪器标题：#09e9b4");
console.log("- 说明文字：#09e9b4");
console.log("- 产品标签样式未修改");
console.log("- 未追加新的 CSS 规则");
