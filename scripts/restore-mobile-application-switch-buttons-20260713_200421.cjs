const fs = require("fs");

const path =
  "components/home/HomeApplicationFlowSection.tsx";

let source = fs.readFileSync(path, "utf8");

const newline = source.includes("\r\n")
  ? "\r\n"
  : "\n";

/* =========================================================
   1. 删除错误的应用页面路由映射

   只删除下方应用按钮使用的路由。
   不删除上方产品标签路由。
========================================================= */

const wrongRouteBlockPattern =
  /\s*\/\* HOME_MOBILE_APPLICATION_ROUTES_START \*\/[\s\S]*?\/\* HOME_MOBILE_APPLICATION_ROUTES_END \*\/\s*/g;

const wrongRouteBlocks = [
  ...source.matchAll(wrongRouteBlockPattern),
];

console.log(
  `错误应用路由块数量：${wrongRouteBlocks.length}`,
);

if (wrongRouteBlocks.length > 1) {
  throw new Error(
    "发现多个 HOME_MOBILE_APPLICATION_ROUTES 样式块，已停止修改。",
  );
}

source = source.replace(
  wrongRouteBlockPattern,
  newline + newline,
);

/* =========================================================
   2. 精确寻找下方应用切换区域
========================================================= */

function findDivByClassToken(
  text,
  classToken,
) {
  const tokenIndex = text.indexOf(classToken);

  if (tokenIndex < 0) {
    throw new Error(
      `没有找到 ${classToken}`,
    );
  }

  const openingDivIndex = text.lastIndexOf(
    "<div",
    tokenIndex,
  );

  if (openingDivIndex < 0) {
    throw new Error(
      `${classToken} 前没有找到 div`,
    );
  }

  const divPattern = /<\/?div\b[^>]*>/g;
  divPattern.lastIndex = openingDivIndex;

  let depth = 0;
  let match;

  while ((match = divPattern.exec(text))) {
    if (match[0].startsWith("</div")) {
      depth -= 1;

      if (depth === 0) {
        return {
          start: openingDivIndex,
          end: divPattern.lastIndex,
          content: text.slice(
            openingDivIndex,
            divPattern.lastIndex,
          ),
        };
      }
    } else {
      depth += 1;
    }
  }

  throw new Error(
    `${classToken} 对应的 div 没有闭合`,
  );
}

const tabsElement = findDivByClassToken(
  source,
  "home-flow-mobile-app-tabs",
);

console.log("");
console.log("===== 修改前下方切换区域 =====");
console.log(tabsElement.content);

const containsLink =
  /<Link\b|<a\b/i.test(tabsElement.content);

const containsButton =
  /<button\b/i.test(tabsElement.content);

console.log("");
console.log(`包含 Link：${containsLink}`);
console.log(`包含 button：${containsButton}`);

/* =========================================================
   3. 强制恢复成按钮

   这些按钮只执行 handleMobileApplicationChange，
   不包含 href，不会跳转。
========================================================= */

const correctTabsBlock = [
  '<div className="home-flow-mobile-app-tabs">',
  "                {mobileApplicationCards.map((item, index) => (",
  "                  <button",
  "                    key={item.key}",
  '                    type="button"',
  "                    className={",
  "                      index === activeMobileIndex",
  '                        ? "home-flow-mobile-app-tab is-active"',
  '                        : "home-flow-mobile-app-tab"',
  "                    }",
  "                    onClick={() =>",
  "                      handleMobileApplicationChange(index)",
  "                    }",
  "                  >",
  "                    {getHomeFlowText(item.title, locale)}",
  "                  </button>",
  "                ))}",
  "              </div>",
].join(newline);

source =
  source.slice(0, tabsElement.start) +
  correctTabsBlock +
  source.slice(tabsElement.end);

/* =========================================================
   4. 最终检查

   上方产品标签 Link 必须保留；
   下方应用区域不能再包含 Link 或 href。
========================================================= */

const finalTabsElement = findDivByClassToken(
  source,
  "home-flow-mobile-app-tabs",
);

if (
  /<Link\b|<a\b|href\s*=/i.test(
    finalTabsElement.content,
  )
) {
  throw new Error(
    "下方应用区域仍然存在链接，已停止写入。",
  );
}

const buttonCount = (
  finalTabsElement.content.match(
    /<button\b/g,
  ) || []
).length;

if (buttonCount !== 1) {
  throw new Error(
    `按钮映射结构数量异常：${buttonCount}`,
  );
}

if (
  !finalTabsElement.content.includes(
    "handleMobileApplicationChange(index)",
  )
) {
  throw new Error(
    "下方按钮没有绑定切换函数，已停止写入。",
  );
}

if (
  !source.includes(
    "home-flow-mobile-product-tag",
  )
) {
  console.warn(
    "提示：当前组件未发现上方产品标签 Link，请检查之前的产品链接修改是否已成功。",
  );
} else {
  console.log(
    "上方产品标签链接仍然保留。",
  );
}

fs.writeFileSync(path, source, "utf8");

console.log("");
console.log("修改完成：");
console.log("- 下方五个应用项恢复为 button");
console.log("- 点击只切换展示图和文字");
console.log("- 不再进入应用详情页");
console.log("- 上方产品标签链接未修改");
