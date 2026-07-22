const fs = require("fs");

const path =
  "components/home/HomeApplicationFlowSection.tsx";

let source = fs.readFileSync(path, "utf8");

const newline = source.includes("\r\n")
  ? "\r\n"
  : "\n";

/* =========================================================
   1. 删除错误的应用页面路由映射块
========================================================= */

const markedRouteBlockPattern =
  /\s*\/\* HOME_MOBILE_APPLICATION_ROUTES_START \*\/[\s\S]*?\/\* HOME_MOBILE_APPLICATION_ROUTES_END \*\/\s*/g;

const markedRouteBlocks = [
  ...source.matchAll(markedRouteBlockPattern),
];

console.log(
  `带标记的错误应用路由块：${markedRouteBlocks.length}`,
);

source = source.replace(
  markedRouteBlockPattern,
  newline + newline,
);

/* =========================================================
   2. 清理没有标记的残留常量
========================================================= */

const orphanRouteMapPattern =
  /\s*const HOME_MOBILE_APPLICATION_ROUTES\s*:\s*Record<string,\s*string>\s*=\s*\{[\s\S]*?\};\s*/g;

const orphanRouteMaps = [
  ...source.matchAll(orphanRouteMapPattern),
];

console.log(
  `无标记应用路由常量：${orphanRouteMaps.length}`,
);

source = source.replace(
  orphanRouteMapPattern,
  newline,
);

/* =========================================================
   3. 清理没有标记的残留路径函数
========================================================= */

const orphanHelperPattern =
  /\s*function getLocalizedApplicationHref\s*\(\s*locale\s*:\s*LocaleCode\s*,\s*applicationPath\s*:\s*string\s*,?\s*\)\s*\{\s*return\s+locale\s*===\s*"zh-CN"\s*\?\s*applicationPath\s*:\s*`\/\$\{locale\}\$\{applicationPath\}`\s*;\s*\}\s*/g;

const orphanHelpers = [
  ...source.matchAll(orphanHelperPattern),
];

console.log(
  `残留 getLocalizedApplicationHref 函数：${orphanHelpers.length}`,
);

source = source.replace(
  orphanHelperPattern,
  newline,
);

/* =========================================================
   4. 精确定位 JSX 中的 div 容器
========================================================= */

function findMatchingDiv(text, openStart) {
  const divPattern = /<\/?div\b[^>]*>/g;

  divPattern.lastIndex = openStart;

  let depth = 0;
  let match;

  while ((match = divPattern.exec(text))) {
    if (match[0].startsWith("</div")) {
      depth -= 1;

      if (depth === 0) {
        return {
          start: openStart,
          end: divPattern.lastIndex,
          text: text.slice(
            openStart,
            divPattern.lastIndex,
          ),
        };
      }
    } else {
      depth += 1;
    }
  }

  throw new Error(
    "home-flow-mobile-app-tabs 对应的 div 没有闭合。",
  );
}

function findClassDivs(text, classToken) {
  const results = [];
  let searchIndex = 0;

  while (true) {
    const tokenIndex = text.indexOf(
      classToken,
      searchIndex,
    );

    if (tokenIndex < 0) {
      break;
    }

    const openStart = text.lastIndexOf(
      "<div",
      tokenIndex,
    );

    if (openStart < 0) {
      throw new Error(
        `${classToken} 前没有找到 div。`,
      );
    }

    const element = findMatchingDiv(
      text,
      openStart,
    );

    if (
      !results.some(
        (item) => item.start === element.start,
      )
    ) {
      results.push(element);
    }

    searchIndex = tokenIndex + classToken.length;
  }

  return results;
}

const tabsElements = findClassDivs(
  source,
  "home-flow-mobile-app-tabs",
);

console.log(
  `手机应用切换容器数量：${tabsElements.length}`,
);

if (tabsElements.length !== 1) {
  throw new Error(
    "没有唯一找到 home-flow-mobile-app-tabs，已停止修改。",
  );
}

const tabsElement = tabsElements[0];

console.log("");
console.log("===== 修改前的应用切换区域 =====");
console.log(tabsElement.text);

/* =========================================================
   5. 强制重建为 button

   不含 Link、不含 href，只调用切换函数。
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
   6. 最终严格检查
========================================================= */

const remainingWrongTerms = [
  "HOME_MOBILE_APPLICATION_ROUTES",
  "getLocalizedApplicationHref",
];

for (const term of remainingWrongTerms) {
  const count = source.split(term).length - 1;

  console.log(`${term} 残留数量：${count}`);

  if (count !== 0) {
    throw new Error(
      `${term} 仍有残留，停止写入文件。`,
    );
  }
}

const finalTabsElements = findClassDivs(
  source,
  "home-flow-mobile-app-tabs",
);

if (finalTabsElements.length !== 1) {
  throw new Error(
    "修改后的应用切换容器数量异常。",
  );
}

const finalTabsText =
  finalTabsElements[0].text;

const forbiddenPatterns = [
  /<Link\b/i,
  /<a\b/i,
  /href\s*=/i,
  /getLocalizedApplicationHref/i,
];

for (const pattern of forbiddenPatterns) {
  if (pattern.test(finalTabsText)) {
    throw new Error(
      `下方应用切换区域仍包含错误链接：${pattern}`,
    );
  }
}

if (!/<button\b/.test(finalTabsText)) {
  throw new Error(
    "下方应用切换区域没有 button。",
  );
}

if (
  !finalTabsText.includes(
    "handleMobileApplicationChange(index)",
  )
) {
  throw new Error(
    "下方按钮没有绑定应用切换函数。",
  );
}

/*
  上方产品跳转应使用 ProductHref，
  这里只检查，不做删除。
*/
const productLinkCount = (
  source.match(
    /getLocalizedProductHref|home-flow-mobile-product-tag/g,
  ) || []
).length;

console.log(
  `上方产品链接相关标识数量：${productLinkCount}`,
);

fs.writeFileSync(path, source, "utf8");

console.log("");
console.log("修改完成：");
console.log("- 下方五个应用项全部恢复为 button");
console.log("- 已删除 getLocalizedApplicationHref");
console.log("- 已删除 HOME_MOBILE_APPLICATION_ROUTES");
console.log("- 点击只切换图片、标题、描述和产品标签");
console.log("- 上方产品跳转代码未删除");
