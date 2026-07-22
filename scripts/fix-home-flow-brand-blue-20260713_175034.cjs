const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const targetSelectors = [
  ".home-flow-actions .home-flow-btn.is-active",
  ".home-flow-mobile-app-tab.is-active",
];

for (const selector of targetSelectors) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const pattern = new RegExp(
    `([^{}]*${escaped}[^{}]*)\\{([^{}]*)\\}`,
    "g"
  );

  let count = 0;

  css = css.replace(pattern, (full, selectors, body) => {
    count += 1;

    const updatedBody = body
      .replace(
        /(background(?:-color)?\s*:\s*)#061a3a(\s*;)/gi,
        "$1#173368$2"
      )
      .replace(
        /(border-color\s*:\s*)#061a3a(\s*;)/gi,
        "$1#173368$2"
      );

    return `${selectors}{${updatedBody}}`;
  });

  console.log(`${selector} 匹配数量：${count}`);

  if (count < 1) {
    throw new Error(`没有找到 ${selector}，已停止写入。`);
  }
}

fs.writeFileSync(path, css, "utf8");

console.log("两组选中按钮已统一改为品牌蓝 #173368。");
