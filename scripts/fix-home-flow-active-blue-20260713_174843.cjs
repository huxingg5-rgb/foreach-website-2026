const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

function updateRulesContaining(selectorText) {
  const rulePattern = /([^{}]+)\{([^{}]*)\}/g;
  let match;
  let cursor = 0;
  let output = "";
  let count = 0;

  while ((match = rulePattern.exec(css)) !== null) {
    output += css.slice(cursor, match.index);

    const selectors = match[1];
    let body = match[2];

    if (selectors.includes(selectorText)) {
      body = body
        .replace(/border-color\s*:\s*#173368\s*;/gi, "border-color: #061a3a;")
        .replace(/background\s*:\s*#173368\s*;/gi, "background: #061a3a;")
        .replace(/background-color\s*:\s*#173368\s*;/gi, "background-color: #061a3a;");

      count += 1;
    }

    output += `${selectors}{${body}}`;
    cursor = rulePattern.lastIndex;
  }

  output += css.slice(cursor);
  css = output;

  console.log(`${selectorText} 相关规则数量：${count}`);

  if (count < 1) {
    throw new Error(`没有找到 ${selectorText} 相关规则，已停止修改。`);
  }
}

updateRulesContaining(".home-flow-actions .home-flow-btn.is-active");
updateRulesContaining(".home-flow-mobile-app-tab.is-active");

fs.writeFileSync(path, css, "utf8");

console.log("选中状态深蓝已改为 #061a3a。");
