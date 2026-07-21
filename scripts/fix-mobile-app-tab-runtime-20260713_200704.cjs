const fs = require("fs");

const filePath =
  "components/home/HomeApplicationFlowSection.tsx";

let source = fs.readFileSync(filePath, "utf8");

const newline = source.includes("\r\n")
  ? "\r\n"
  : "\n";

/* =========================================================
   1. 精确定位下方应用切换容器
========================================================= */

const openingTag =
  '<div className="home-flow-mobile-app-tabs">';

const openingIndex = source.indexOf(openingTag);

console.log(
  `应用切换容器开始位置：${openingIndex}`,
);

if (openingIndex < 0) {
  throw new Error(
    "没有找到 home-flow-mobile-app-tabs 容器。",
  );
}

function findMatchingDiv(text, startIndex) {
  const tagPattern = /<\/?div\b[^>]*>/g;
  tagPattern.lastIndex = startIndex;

  let depth = 0;
  let match;

  while ((match = tagPattern.exec(text))) {
    const tag = match[0];

    if (tag.startsWith("</div")) {
      depth -= 1;

      if (depth === 0) {
        return {
          start: startIndex,
          end: tagPattern.lastIndex,
          text: text.slice(
            startIndex,
            tagPattern.lastIndex,
          ),
        };
      }
    } else {
      depth += 1;
    }
  }

  throw new Error(
    "应用切换容器没有找到对应的结束 div。",
  );
}

const oldTabsElement = findMatchingDiv(
  source,
  openingIndex,
);

console.log("");
console.log("===== 修改前区域 =====");
console.log(oldTabsElement.text);

/* =========================================================
   2. 强制恢复为普通 button

   不含 Link
   不含 href
   不含任何应用页面路由
========================================================= */

const newTabsElement = [
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
  source.slice(0, oldTabsElement.start) +
  newTabsElement +
  source.slice(oldTabsElement.end);

/* =========================================================
   3. 删除错误应用跳转的残留定义
========================================================= */

source = source.replace(
  /\s*\/\* HOME_MOBILE_APPLICATION_ROUTES_START \*\/[\s\S]*?\/\* HOME_MOBILE_APPLICATION_ROUTES_END \*\/\s*/g,
  newline + newline,
);

source = source.replace(
  /\s*const HOME_MOBILE_APPLICATION_ROUTES\s*:\s*Record<string,\s*string>\s*=\s*\{[\s\S]*?\};\s*/g,
  newline,
);

source = source.replace(
  /\s*function getLocalizedApplicationHref\s*\([\s\S]*?\n\}\s*/g,
  newline,
);

/* =========================================================
   4. 严格检查
========================================================= */

const forbiddenTerms = [
  "HOME_MOBILE_APPLICATION_ROUTES",
  "getLocalizedApplicationHref",
];

for (const term of forbiddenTerms) {
  const count = source.split(term).length - 1;

  console.log(`${term} 残留数量：${count}`);

  if (count !== 0) {
    throw new Error(
      `${term} 仍有残留，停止写入。`,
    );
  }
}

const finalOpeningIndex =
  source.indexOf(openingTag);

const finalTabsElement = findMatchingDiv(
  source,
  finalOpeningIndex,
);

const forbiddenInsideTabs = [
  /<Link\b/i,
  /href\s*=/i,
  /applicationPath/i,
  /HOME_MOBILE_APPLICATION_ROUTES/i,
];

for (const pattern of forbiddenInsideTabs) {
  if (pattern.test(finalTabsElement.text)) {
    throw new Error(
      `下方切换区域仍存在错误内容：${pattern}`,
    );
  }
}

if (
  !finalTabsElement.text.includes(
    "handleMobileApplicationChange(index)",
  )
) {
  throw new Error(
    "下方按钮没有绑定切换函数。",
  );
}

if (!/<button\b/.test(finalTabsElement.text)) {
  throw new Error(
    "下方切换区域没有 button。",
  );
}

/*
  这里只检查上方产品链接，绝不删除。
*/
const productLinkCount = (
  source.match(
    /HOME_MOBILE_PRODUCT_TAG_ROUTES|getLocalizedProductHref|home-flow-mobile-product-tag/g,
  ) || []
).length;

console.log(
  `上方产品链接相关标识数量：${productLinkCount}`,
);

fs.writeFileSync(
  filePath,
  source,
  "utf8",
);

console.log("");
console.log("修复完成：");
console.log("- 删除 HOME_MOBILE_APPLICATION_ROUTES 引用");
console.log("- 删除 getLocalizedApplicationHref 引用");
console.log("- 下方五个应用项恢复为 button");
console.log("- 点击只切换图片和内容");
console.log("- 上方产品标签跳转代码未修改");
