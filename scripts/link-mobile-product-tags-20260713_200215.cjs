const fs = require("fs");
const path = require("path");

const componentPath =
  "components/home/HomeApplicationFlowSection.tsx";

const cssPath = "app/globals.css";

let component = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

const newline = component.includes("\r\n")
  ? "\r\n"
  : "\n";

/* =========================================================
   1. 产品标签候选路由

   每个标签从上到下寻找第一个真实存在的页面。
   独立页面不存在时，才回退到对应产品分类。
========================================================= */

const productRouteCandidates = {
  "high-pressure-valve": [
    "/products/valves/high-pressure-valves",
    "/products/valves/high-pressure-valve",
    "/products/valves",
  ],

  "piston-pump": [
    "/products/pumps/plunger-pumps/ea-100-pmma",
    "/products/pumps/plunger-pumps",
    "/products/pumps",
  ],

  "pressure-sensor": [
    "/products/intelligent-control/pressure-detection-modules",
    "/products/intelligent-control",
    "/products",
  ],

  "peek-tubing": [
    "/products/tubing/peek-tubing",
    "/products/tubing",
  ],

  "syringe-pump": [
    "/products/pumps/syringe-pumps",
    "/products/pumps/syringe-pump",
    "/products/pumps",
  ],

  "pipetting-pump": [
    "/products/pumps/pipetting-pumps",
    "/products/pumps/pipetting-pump",
    "/products/pumps",
  ],

  "rotary-valve": [
    "/products/valves/rotary-valves",
    "/products/valves/rotary-valve",
    "/products/valves",
  ],

  "sampling-probe": [
    "/products/needles/sampling-probes",
    "/products/needles/sampling-needles",
    "/products/needles",
    "/products",
  ],

  "multi-channel-pump": [
    "/products/pumps/plunger-pumps",
    "/products/pumps",
  ],

  "solenoid-valve": [
    "/products/valves/solenoid-valves",
    "/products/valves/solenoid-valve",
    "/products/valves",
  ],

  "tubing-component": [
    "/products/tubing",
    "/products",
  ],

  "diaphragm-pump": [
    "/products/pumps/diaphragm-pumps",
    "/products/pumps/diaphragm-pump",
    "/products/pumps",
  ],

  "pinch-valve": [
    "/products/valves/pinch-valves",
    "/products/valves/pinch-valve",
    "/products/valves",
  ],

  sensor: [
    "/products/intelligent-control",
    "/products",
  ],

  "bubble-detector": [
    "/products/intelligent-control/bubble-detection-modules",
    "/products/intelligent-control",
    "/products",
  ],
};

/* =========================================================
   2. 检查路由是否真实存在

   同时兼容：
   app/products/xxx/page.tsx
   app/[locale]/products/xxx/page.tsx
   app/products/xxx/[slug]/page.tsx
========================================================= */

const pageExtensions = [
  "tsx",
  "ts",
  "jsx",
  "js",
];

function fileExistsWithAnyExtension(basePath) {
  return pageExtensions.some((extension) =>
    fs.existsSync(`${basePath}.${extension}`),
  );
}

function routeExists(route) {
  const relativeRoute = route
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");

  const directPageBases = [
    path.join("app", relativeRoute, "page"),
    path.join("app", "[locale]", relativeRoute, "page"),
  ];

  if (
    directPageBases.some((pageBase) =>
      fileExistsWithAnyExtension(pageBase),
    )
  ) {
    return true;
  }

  /*
    支持具体详情页路径：
    /products/pumps/plunger-pumps/ea-100-pmma

    对应：
    app/products/pumps/plunger-pumps/[slug]/page.tsx
  */
  const segments = relativeRoute.split("/");

  if (segments.length > 1) {
    const parentRoute = segments.slice(0, -1).join("/");

    const dynamicPageBases = [
      path.join(
        "app",
        parentRoute,
        "[slug]",
        "page",
      ),
      path.join(
        "app",
        "[locale]",
        parentRoute,
        "[slug]",
        "page",
      ),
    ];

    if (
      dynamicPageBases.some((pageBase) =>
        fileExistsWithAnyExtension(pageBase),
      )
    ) {
      return true;
    }
  }

  return false;
}

const resolvedProductRoutes = {};

console.log("");
console.log("===== 产品标签路由检查 =====");

for (const [tagKey, candidates] of Object.entries(
  productRouteCandidates,
)) {
  const resolvedRoute = candidates.find(routeExists);

  console.log("");
  console.log(`标签：${tagKey}`);

  if (!resolvedRoute) {
    console.log("候选路由全部不存在：");

    candidates.forEach((candidate) => {
      console.log(`  ${candidate}`);
    });

    throw new Error(
      `${tagKey} 没有可用产品页面，已停止修改。`,
    );
  }

  resolvedProductRoutes[tagKey] = resolvedRoute;

  console.log(`跳转：${resolvedRoute}`);
}

/* =========================================================
   3. 删除之前错误的“应用按钮跳转”代码
========================================================= */

const wrongApplicationRouteBlock =
  /\/\* HOME_MOBILE_APPLICATION_ROUTES_START \*\/[\s\S]*?\/\* HOME_MOBILE_APPLICATION_ROUTES_END \*\/\s*/g;

const wrongBlockCount = (
  component.match(wrongApplicationRouteBlock) || []
).length;

console.log("");
console.log(
  `错误的应用路由代码块数量：${wrongBlockCount}`,
);

component = component.replace(
  wrongApplicationRouteBlock,
  "",
);

/* =========================================================
   4. 删除旧的高端分析仪器专属产品映射
========================================================= */

const oldAnalyticalRouteBlock =
  /\/\* HOME_ANALYTICAL_PRODUCT_LINKS_START \*\/[\s\S]*?\/\* HOME_ANALYTICAL_PRODUCT_LINKS_END \*\/\s*/g;

const oldAnalyticalCount = (
  component.match(oldAnalyticalRouteBlock) || []
).length;

console.log(
  `旧高端分析仪器产品映射数量：${oldAnalyticalCount}`,
);

component = component.replace(
  oldAnalyticalRouteBlock,
  "",
);

/* =========================================================
   5. 写入全部产品标签路由映射
========================================================= */

const productMarkerStart =
  "/* HOME_MOBILE_PRODUCT_TAG_ROUTES_START */";

const productMarkerEnd =
  "/* HOME_MOBILE_PRODUCT_TAG_ROUTES_END */";

const productRouteBlock = [
  productMarkerStart,
  "const HOME_MOBILE_PRODUCT_TAG_ROUTES: Record<string, string> = {",
  ...Object.entries(resolvedProductRoutes).map(
    ([tagKey, route]) =>
      `  "${tagKey}": "${route}",`,
  ),
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
  productMarkerEnd,
].join(newline);

const existingProductRouteBlock =
  /\/\* HOME_MOBILE_PRODUCT_TAG_ROUTES_START \*\/[\s\S]*?\/\* HOME_MOBILE_PRODUCT_TAG_ROUTES_END \*\//;

if (existingProductRouteBlock.test(component)) {
  component = component.replace(
    existingProductRouteBlock,
    productRouteBlock,
  );

  console.log(
    "已更新全部产品标签路由映射。",
  );
} else {
  const insertionTarget =
    "function isPlainObject(";

  const insertionCount =
    component.split(insertionTarget).length - 1;

  if (insertionCount !== 1) {
    throw new Error(
      "没有唯一找到产品路由映射插入位置。",
    );
  }

  component = component.replace(
    insertionTarget,
    productRouteBlock +
      newline +
      newline +
      insertionTarget,
  );

  console.log(
    "已加入全部产品标签路由映射。",
  );
}

/* =========================================================
   6. JSX div 定位工具
========================================================= */

function findDivElementByClassToken(
  source,
  classToken,
) {
  const tokenIndex = source.indexOf(classToken);

  if (tokenIndex < 0) {
    throw new Error(
      `没有找到 class：${classToken}`,
    );
  }

  const openStart = source.lastIndexOf(
    "<div",
    tokenIndex,
  );

  if (openStart < 0) {
    throw new Error(
      `${classToken} 前没有找到 div 开始标签。`,
    );
  }

  const tagPattern = /<\/?div\b[^>]*>/g;
  tagPattern.lastIndex = openStart;

  let depth = 0;
  let match;

  while ((match = tagPattern.exec(source))) {
    if (match[0].startsWith("</div")) {
      depth -= 1;

      if (depth === 0) {
        return {
          start: openStart,
          end: tagPattern.lastIndex,
          text: source.slice(
            openStart,
            tagPattern.lastIndex,
          ),
        };
      }
    } else {
      depth += 1;
    }
  }

  throw new Error(
    `${classToken} 对应的 div 没有闭合。`,
  );
}

/* =========================================================
   7. 恢复下面五个按钮，只负责应用切换
========================================================= */

const tabsElement = findDivElementByClassToken(
  component,
  "home-flow-mobile-app-tabs",
);

const tabsBlock = [
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

component =
  component.slice(0, tabsElement.start) +
  tabsBlock +
  component.slice(tabsElement.end);

console.log(
  "已恢复下面五个应用切换按钮。",
);

/* =========================================================
   8. 把上方产品标签全部改成 Link
========================================================= */

const productTagsElement =
  findDivElementByClassToken(
    component,
    "home-flow-mobile-tv-tags",
  );

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

component =
  component.slice(0, productTagsElement.start) +
  productTagsBlock +
  component.slice(productTagsElement.end);

console.log(
  "已将上方产品标签全部改为产品链接。",
);

/* =========================================================
   9. 确保链接继承原产品标签样式
========================================================= */

const alreadyHasGenericLinkStyle =
  /\.home-flow-mobile-tv-tags[\s\S]{0,240}a\.home-flow-mobile-product-tag/.test(
    css,
  );

console.log("");
console.log(
  `现有通用产品链接样式：${
    alreadyHasGenericLinkStyle ? "有" : "无"
  }`,
);

if (!alreadyHasGenericLinkStyle) {
  const spanSelectorPattern =
    /(\.home-flow-mobile-tv-tags\s+span)(\s*\{)/g;

  const spanSelectorMatches = [
    ...css.matchAll(spanSelectorPattern),
  ];

  console.log(
    `手机产品 span 样式数量：${spanSelectorMatches.length}`,
  );

  if (spanSelectorMatches.length < 1) {
    throw new Error(
      "没有找到现有手机产品标签样式，已停止修改。",
    );
  }

  css = css.replace(
    spanSelectorPattern,
    [
      "$1,",
      ".home-flow-mobile-tv-tags",
      "  a.home-flow-mobile-product-tag$2",
    ].join("\n"),
  );

  console.log(
    "已让产品 Link 继承现有 span 标签样式。",
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
console.log("===== 修改完成 =====");
console.log("- 下方五个应用按钮：只切换内容");
console.log("- 上方产品标签：点击跳转产品页面");
console.log("- 所有应用场景的产品标签均支持跳转");
console.log("- 产品标签现有视觉样式保持不变");
