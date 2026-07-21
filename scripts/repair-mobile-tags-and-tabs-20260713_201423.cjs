const fs = require("fs");

const filePath =
  "components/home/HomeApplicationFlowSection.tsx";

let source = fs.readFileSync(filePath, "utf8");

const newline = source.includes("\r\n")
  ? "\r\n"
  : "\n";

function findAllIndexes(text, token) {
  const indexes = [];
  let cursor = 0;

  while (true) {
    const index = text.indexOf(token, cursor);

    if (index < 0) {
      break;
    }

    indexes.push(index);
    cursor = index + token.length;
  }

  return indexes;
}

function findMatchingDiv(text, startIndex) {
  const pattern = /<\/?div\b[^>]*>/g;
  pattern.lastIndex = startIndex;

  let depth = 0;
  let match;

  while ((match = pattern.exec(text))) {
    const tag = match[0];

    if (tag.startsWith("</div")) {
      depth -= 1;

      if (depth === 0) {
        return {
          start: startIndex,
          end: pattern.lastIndex,
          text: text.slice(
            startIndex,
            pattern.lastIndex,
          ),
        };
      }
    } else {
      depth += 1;
    }
  }

  throw new Error(
    `从位置 ${startIndex} 开始的 div 没有闭合。`,
  );
}

/* =========================================================
   1. 检查上方产品链接基础代码
========================================================= */

const hasProductRouteMap =
  source.includes(
    "HOME_MOBILE_PRODUCT_TAG_ROUTES",
  );

const hasProductHrefHelper =
  source.includes(
    "getLocalizedProductHref",
  );

console.log("");
console.log("===== 产品标签链接基础检查 =====");
console.log(
  `产品路由映射：${hasProductRouteMap ? "存在" : "不存在"}`,
);
console.log(
  `多语言产品链接函数：${hasProductHrefHelper ? "存在" : "不存在"}`,
);

if (!hasProductRouteMap || !hasProductHrefHelper) {
  throw new Error(
    "上方产品标签的路由映射不完整，已停止修改，避免生成无效链接。",
  );
}

/* =========================================================
   2. 找到真正的下方应用按钮区域
========================================================= */

const tabsOpen =
  '<div className="home-flow-mobile-app-tabs">';

const tabsWrapToken =
  'className="home-flow-mobile-app-tabs-wrap"';

let tabsWrapIndex =
  source.indexOf(tabsWrapToken);

if (tabsWrapIndex < 0) {
  throw new Error(
    "没有找到 home-flow-mobile-app-tabs-wrap。",
  );
}

let tabIndexes = findAllIndexes(
  source,
  tabsOpen,
);

console.log("");
console.log("===== 应用按钮容器检查 =====");
console.log(
  `home-flow-mobile-app-tabs 总数量：${tabIndexes.length}`,
);

tabIndexes.forEach((index, order) => {
  console.log(
    `${order + 1}. 位置 ${index}，${
      index < tabsWrapIndex
        ? "位于图片内部，属于错误重复项"
        : "位于图片下方"
    }`,
  );
});

/* =========================================================
   3. 删除图片内部错误出现的应用按钮

   只删除位于 tabs-wrap 之前的 app-tabs。
========================================================= */

const wrongTabIndexes = tabIndexes
  .filter((index) => index < tabsWrapIndex)
  .sort((a, b) => b - a);

console.log("");
console.log(
  `图片内部错误按钮容器：${wrongTabIndexes.length}`,
);

if (wrongTabIndexes.length > 1) {
  throw new Error(
    "图片内部发现多组错误按钮，已停止修改。",
  );
}

for (const wrongIndex of wrongTabIndexes) {
  const wrongElement = findMatchingDiv(
    source,
    wrongIndex,
  );

  console.log("");
  console.log("===== 删除图片内错误按钮 =====");
  console.log(wrongElement.text);

  source =
    source.slice(0, wrongElement.start) +
    source.slice(wrongElement.end);
}

/* 删除后重新定位 */
tabsWrapIndex = source.indexOf(tabsWrapToken);

tabIndexes = findAllIndexes(
  source,
  tabsOpen,
);

const correctTabIndexes =
  tabIndexes.filter(
    (index) => index > tabsWrapIndex,
  );

if (correctTabIndexes.length !== 1) {
  throw new Error(
    `图片下方应用按钮容器数量异常：${correctTabIndexes.length}`,
  );
}

/* =========================================================
   4. 强制恢复图片下方的应用切换按钮

   这里只能是 button，不允许 Link 和 href。
========================================================= */

const correctTabsElement = findMatchingDiv(
  source,
  correctTabIndexes[0],
);

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
  source.slice(0, correctTabsElement.start) +
  correctTabsBlock +
  source.slice(correctTabsElement.end);

/* =========================================================
   5. 恢复图片内部产品标签区域
========================================================= */

const tvCardToken =
  'className="home-flow-mobile-tv-card"';

const tvCardTokenIndex =
  source.indexOf(tvCardToken);

if (tvCardTokenIndex < 0) {
  throw new Error(
    "没有找到 home-flow-mobile-tv-card。",
  );
}

const tvCardStart =
  source.lastIndexOf(
    "<section",
    tvCardTokenIndex,
  );

tabsWrapIndex = source.indexOf(
  tabsWrapToken,
  tvCardStart,
);

if (tvCardStart < 0 || tabsWrapIndex < 0) {
  throw new Error(
    "无法确定手机展示图和下方按钮的边界。",
  );
}

const productTagsOpen =
  '<div className="home-flow-mobile-tv-tags">';

const productTagIndexes = findAllIndexes(
  source,
  productTagsOpen,
).filter(
  (index) =>
    index > tvCardStart &&
    index < tabsWrapIndex,
);

console.log("");
console.log(
  `当前图片内产品标签容器：${productTagIndexes.length}`,
);

if (productTagIndexes.length > 1) {
  throw new Error(
    "图片内发现多个产品标签容器，已停止修改。",
  );
}

const productTagsBlock = [
  '<div className="home-flow-mobile-tv-tags">',
  "                      {activeMobileApplication.tags.map((tag) => {",
  "                        const productPath =",
  "                          HOME_MOBILE_PRODUCT_TAG_ROUTES[tag.key];",
  "",
  "                        const tagLabel = getHomeFlowText(",
  "                          tag.label,",
  "                          locale,",
  "                        );",
  "",
  "                        if (!productPath) {",
  "                          return (",
  "                            <span key={tag.key}>",
  "                              {tagLabel}",
  "                            </span>",
  "                          );",
  "                        }",
  "",
  "                        return (",
  "                          <Link",
  "                            key={tag.key}",
  "                            href={getLocalizedProductHref(",
  "                              locale,",
  "                              productPath,",
  "                            )}",
  '                            className="home-flow-mobile-product-tag"',
  "                          >",
  "                            {tagLabel}",
  "                          </Link>",
  "                        );",
  "                      })}",
  "                    </div>",
].join(newline);

if (productTagIndexes.length === 1) {
  const oldProductTagsElement =
    findMatchingDiv(
      source,
      productTagIndexes[0],
    );

  source =
    source.slice(
      0,
      oldProductTagsElement.start,
    ) +
    productTagsBlock +
    source.slice(
      oldProductTagsElement.end,
    );

  console.log(
    "已重建原有产品标签区域。",
  );
} else {
  /*
    产品标签区域已经被错误删除，
    将它重新插入描述段落后面。
  */
  const descToken =
    '<p className="home-flow-mobile-tv-desc">';

  const descStart = source.indexOf(
    descToken,
    tvCardStart,
  );

  if (
    descStart < 0 ||
    descStart > tabsWrapIndex
  ) {
    throw new Error(
      "没有找到手机端应用描述段落。",
    );
  }

  const descEndTagIndex =
    source.indexOf(
      "</p>",
      descStart,
    );

  if (descEndTagIndex < 0) {
    throw new Error(
      "手机端应用描述段落没有闭合。",
    );
  }

  const descEnd =
    descEndTagIndex + "</p>".length;

  source =
    source.slice(0, descEnd) +
    newline +
    newline +
    "                    " +
    productTagsBlock +
    source.slice(descEnd);

  console.log(
    "已在描述文字后重新插入产品标签区域。",
  );
}

/* =========================================================
   6. 最终严格验证
========================================================= */

tabsWrapIndex =
  source.indexOf(tabsWrapToken);

tabIndexes = findAllIndexes(
  source,
  tabsOpen,
);

const tabsBeforeWrap =
  tabIndexes.filter(
    (index) => index < tabsWrapIndex,
  );

const tabsAfterWrap =
  tabIndexes.filter(
    (index) => index > tabsWrapIndex,
  );

console.log("");
console.log("===== 最终结构检查 =====");
console.log(
  `图片内部应用按钮：${tabsBeforeWrap.length}`,
);
console.log(
  `图片下方应用按钮：${tabsAfterWrap.length}`,
);

if (tabsBeforeWrap.length !== 0) {
  throw new Error(
    "图片内部仍有错误应用按钮。",
  );
}

if (tabsAfterWrap.length !== 1) {
  throw new Error(
    "图片下方应用按钮不是唯一一组。",
  );
}

const finalTabsElement = findMatchingDiv(
  source,
  tabsAfterWrap[0],
);

const forbiddenTabTerms = [
  "<Link",
  "href=",
  "applicationPath",
  "HOME_MOBILE_APPLICATION_ROUTES",
  "getLocalizedApplicationHref",
];

for (const term of forbiddenTabTerms) {
  if (finalTabsElement.text.includes(term)) {
    throw new Error(
      `图片下方应用按钮仍包含错误代码：${term}`,
    );
  }
}

if (
  !finalTabsElement.text.includes(
    "handleMobileApplicationChange(index)",
  )
) {
  throw new Error(
    "图片下方按钮没有绑定切换函数。",
  );
}

const finalProductTagIndexes =
  findAllIndexes(
    source,
    productTagsOpen,
  ).filter(
    (index) =>
      index > tvCardStart &&
      index < tabsWrapIndex,
  );

if (finalProductTagIndexes.length !== 1) {
  throw new Error(
    `图片内产品标签区域数量异常：${finalProductTagIndexes.length}`,
  );
}

const finalProductElement =
  findMatchingDiv(
    source,
    finalProductTagIndexes[0],
  );

if (
  !finalProductElement.text.includes(
    "activeMobileApplication.tags.map",
  ) ||
  !finalProductElement.text.includes(
    "getLocalizedProductHref",
  )
) {
  throw new Error(
    "图片内产品标签没有正确恢复。",
  );
}

fs.writeFileSync(
  filePath,
  source,
  "utf8",
);

console.log("");
console.log("修复完成：");
console.log("- 删除图片里面重复的应用按钮");
console.log("- 恢复图片里的产品标签和产品跳转");
console.log("- 图片下方只保留一组应用切换按钮");
console.log("- 应用切换按钮不包含 href");
