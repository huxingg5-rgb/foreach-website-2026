const fs = require("fs");

const filePath =
  "components/home/HomeApplicationFlowSection.tsx";

let source = fs.readFileSync(filePath, "utf8");

const newline = source.includes("\r\n")
  ? "\r\n"
  : "\n";

function findAllIndexes(text, token) {
  const results = [];
  let cursor = 0;

  while (true) {
    const index = text.indexOf(token, cursor);

    if (index < 0) {
      break;
    }

    results.push(index);
    cursor = index + token.length;
  }

  return results;
}

function findMatchingDiv(text, startIndex) {
  const pattern = /<\/?div\b[^>]*>/g;

  pattern.lastIndex = startIndex;

  let depth = 0;
  let match;

  while ((match = pattern.exec(text))) {
    if (match[0].startsWith("</div")) {
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
    `从 ${startIndex} 开始的 div 没有闭合。`,
  );
}

/* =========================================================
   1. 精确识别手机端两组应用按钮
========================================================= */

const tabsToken =
  '<div className="home-flow-mobile-app-tabs">';

const tabsWrapToken =
  'className="home-flow-mobile-app-tabs-wrap"';

const tabsIndexes = findAllIndexes(
  source,
  tabsToken,
);

const tabsWrapIndex =
  source.indexOf(tabsWrapToken);

console.log("");
console.log("===== 手机端结构检查 =====");
console.log(
  `home-flow-mobile-app-tabs 数量：${tabsIndexes.length}`,
);
console.log(
  `home-flow-mobile-app-tabs-wrap 位置：${tabsWrapIndex}`,
);

if (tabsIndexes.length !== 2) {
  throw new Error(
    "当前应用按钮容器不是两组，停止修改。",
  );
}

if (tabsWrapIndex < 0) {
  throw new Error(
    "没有找到手机端应用按钮外层区域。",
  );
}

const insideImageTabs =
  tabsIndexes.filter(
    (index) => index < tabsWrapIndex,
  );

const belowImageTabs =
  tabsIndexes.filter(
    (index) => index > tabsWrapIndex,
  );

console.log(
  `图片内部错误按钮：${insideImageTabs.length}`,
);

console.log(
  `图片下方正确按钮：${belowImageTabs.length}`,
);

if (
  insideImageTabs.length !== 1 ||
  belowImageTabs.length !== 1
) {
  throw new Error(
    "无法唯一识别图片内外两组按钮，停止修改。",
  );
}

const wrongTabsElement = findMatchingDiv(
  source,
  insideImageTabs[0],
);

const correctTabsBefore = findMatchingDiv(
  source,
  belowImageTabs[0],
).text;

console.log("");
console.log("===== 将要删除的图片内错误按钮 =====");
console.log(wrongTabsElement.text);

/* =========================================================
   2. 产品标签路由

   仅供手机端图片内部的产品标签使用。
========================================================= */

const hasProductRouteMap =
  source.includes(
    "const HOME_MOBILE_PRODUCT_TAG_ROUTES",
  );

const hasProductHrefHelper =
  source.includes(
    "function getLocalizedProductHref",
  );

console.log("");
console.log(
  `已有产品路由映射：${hasProductRouteMap}`,
);

console.log(
  `已有多语言产品链接函数：${hasProductHrefHelper}`,
);

if (hasProductRouteMap !== hasProductHrefHelper) {
  throw new Error(
    "现有产品链接基础代码不完整，停止修改。",
  );
}

if (
  !hasProductRouteMap &&
  !hasProductHrefHelper
) {
  const routeBlock = [
    "/* HOME_MOBILE_PRODUCT_TAG_ROUTES_START */",
    "const HOME_MOBILE_PRODUCT_TAG_ROUTES: Record<string, string> = {",
    '  "high-pressure-valve": "/products/valves/high-pressure-valves",',
    '  "piston-pump": "/products/pumps/plunger-pumps",',
    '  "pressure-sensor": "/products/intelligent-control",',
    '  "peek-tubing": "/products/tubing/peek-tubing",',
    '  "syringe-pump": "/products/pumps/syringe-pumps",',
    '  "pipetting-pump": "/products/pumps/pipetting-pumps",',
    '  "rotary-valve": "/products/valves/rotary-valves",',
    '  "sampling-probe": "/products/needles",',
    '  "multi-channel-pump": "/products/pumps",',
    '  "solenoid-valve": "/products/valves/solenoid-valves",',
    '  "tubing-component": "/products/tubing",',
    '  "diaphragm-pump": "/products/pumps/diaphragm-pumps",',
    '  "pinch-valve": "/products/valves",',
    '  "sensor": "/products/intelligent-control",',
    '  "bubble-detector": "/products/intelligent-control",',
    "};",
    "",
    "function getLocalizedProductHref(",
    "  locale: LocaleCode,",
    "  productPath: string,",
    ") {",
    '  return locale === "zh-CN"',
    "    ? productPath",
    "    : `/${locale}${productPath}`;",
    "}",
    "/* HOME_MOBILE_PRODUCT_TAG_ROUTES_END */",
  ].join(newline);

  const insertionTarget =
    "function isPlainObject(";

  const insertionCount =
    source.split(insertionTarget).length - 1;

  console.log(
    `路由代码插入点数量：${insertionCount}`,
  );

  if (insertionCount !== 1) {
    throw new Error(
      "没有唯一找到产品路由代码插入点。",
    );
  }

  source = source.replace(
    insertionTarget,
    routeBlock +
      newline +
      newline +
      insertionTarget,
  );

  console.log(
    "已加入手机端产品标签路由。",
  );
}

/* =========================================================
   3. 把图片内部错误按钮恢复成产品标签
========================================================= */

const productTagsBlock = [
  '<div className="home-flow-mobile-tv-tags">',
  "                      {activeMobileApplication.tags.map((tag) => {",
  "                        const productPath =",
  "                          HOME_MOBILE_PRODUCT_TAG_ROUTES[tag.key] ??",
  '                          "/products";',
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
  "                            {getHomeFlowText(tag.label, locale)}",
  "                          </Link>",
  "                        );",
  "                      })}",
  "                    </div>",
].join(newline);

source =
  source.slice(0, wrongTabsElement.start) +
  productTagsBlock +
  source.slice(wrongTabsElement.end);

/* =========================================================
   4. 写入前检查

   图片内部：必须是产品标签。
   图片下面：必须仍然是 button。
========================================================= */

const finalTabsIndexes = findAllIndexes(
  source,
  tabsToken,
);

const finalProductTagsIndexes =
  findAllIndexes(
    source,
    '<div className="home-flow-mobile-tv-tags">',
  );

const finalWrapIndex =
  source.indexOf(tabsWrapToken);

console.log("");
console.log("===== 修改后结构检查 =====");
console.log(
  `应用按钮容器数量：${finalTabsIndexes.length}`,
);
console.log(
  `产品标签容器数量：${finalProductTagsIndexes.length}`,
);

if (finalTabsIndexes.length !== 1) {
  throw new Error(
    "修改后应用按钮容器不是一组。",
  );
}

if (finalProductTagsIndexes.length !== 1) {
  throw new Error(
    "修改后产品标签容器不是一组。",
  );
}

if (
  finalProductTagsIndexes[0] >
  finalWrapIndex
) {
  throw new Error(
    "产品标签没有放在图片内部。",
  );
}

if (
  finalTabsIndexes[0] <
  finalWrapIndex
) {
  throw new Error(
    "应用按钮仍然留在图片内部。",
  );
}

const finalCorrectTabs = findMatchingDiv(
  source,
  finalTabsIndexes[0],
).text;

if (
  !finalCorrectTabs.includes("<button") ||
  !finalCorrectTabs.includes(
    "handleMobileApplicationChange(index)",
  )
) {
  throw new Error(
    "图片下方应用切换按钮结构异常。",
  );
}

if (
  finalCorrectTabs.includes("<Link") ||
  finalCorrectTabs.includes("href=")
) {
  throw new Error(
    "图片下方应用按钮仍包含跳转链接。",
  );
}

/*
  确认图片下方原有按钮没有被修改。
*/
if (finalCorrectTabs !== correctTabsBefore) {
  throw new Error(
    "图片下方正确按钮发生了意外变化。",
  );
}

fs.writeFileSync(
  filePath,
  source,
  "utf8",
);

console.log("");
console.log("修复完成：");
console.log("- 只修改手机端 JSX");
console.log("- 图片内恢复产品标签");
console.log("- 产品标签支持产品页面跳转");
console.log("- 图片下方应用按钮保持切换功能");
console.log("- PC 端 JSX 未修改");
console.log("- CSS 未修改");
