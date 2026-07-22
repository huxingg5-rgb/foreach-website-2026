const fs = require("fs");
const path = require("path");

const componentPath =
  "components/home/HomeApplicationFlowSection.tsx";

const cssPath = "app/globals.css";

let component = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

const componentNewline = component.includes("\r\n")
  ? "\r\n"
  : "\n";

const cssNewline = css.includes("\r\n")
  ? "\r\n"
  : "\n";

/* =========================================================
   1. 扫描项目当前存在的静态页面路由
========================================================= */

function walk(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const output = [];

  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
  })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      output.push(...walk(fullPath));
    } else if (
      /^(page)\.(tsx|ts|jsx|js)$/i.test(entry.name)
    ) {
      output.push(fullPath);
    }
  }

  return output;
}

function pageFileToRoute(filePath) {
  const relative = path
    .relative("app", path.dirname(filePath))
    .replaceAll("\\", "/");

  const segments = relative
    .split("/")
    .filter(Boolean)
    .filter((segment) => {
      // 清除 Next.js 路由组
      if (
        segment.startsWith("(") &&
        segment.endsWith(")")
      ) {
        return false;
      }

      // 清除统一语言动态目录
      if (segment === "[locale]") {
        return false;
      }

      return true;
    });

  // 产品标签应该跳转列表页，不跳转动态详情页
  if (
    segments.some((segment) =>
      segment.includes("["),
    )
  ) {
    return null;
  }

  if (segments[0] === "api") {
    return null;
  }

  return `/${segments.join("/")}`.replace(/\/+$/, "") || "/";
}

const routeFiles = walk("app");

const availableRoutes = new Map();

for (const filePath of routeFiles) {
  const route = pageFileToRoute(filePath);

  if (!route) {
    continue;
  }

  if (!availableRoutes.has(route)) {
    availableRoutes.set(route, filePath);
  }
}

const routeCandidates = {
  "high-pressure-valve": [
    "/products/valves/high-pressure-valves",
    "/products/valves/high-pressure-valve",
  ],

  "piston-pump": [
    "/products/pumps/plunger-pumps",
    "/products/pumps/piston-pumps",
  ],

  "pressure-sensor": [
    "/products/intelligent-control/pressure-sensors",
    "/products/intelligent-control/pressure-detection-modules",
    "/products/sensors/pressure-sensors",
    "/products/control/pressure-sensors",
  ],

  "peek-tubing": [
    "/products/tubing/peek-tubing",
    "/products/tubing/peek",
    "/products/tubes/peek-tubing",
    "/products/tubes/peek",
    "/products/pipelines/peek",
  ],
};

function findRelatedRoutes(key) {
  const searchTerms = {
    "high-pressure-valve": [
      "high-pressure",
      "valve",
    ],
    "piston-pump": [
      "plunger",
      "piston",
    ],
    "pressure-sensor": [
      "pressure",
      "sensor",
      "detection",
      "pdm",
    ],
    "peek-tubing": [
      "peek",
      "tubing",
      "tube",
      "pipeline",
    ],
  }[key];

  return [...availableRoutes.keys()]
    .filter((route) => route.startsWith("/products"))
    .filter((route) =>
      searchTerms.some((term) =>
        route.toLowerCase().includes(term),
      ),
    )
    .slice(0, 12);
}

const resolvedRoutes = {};

console.log("");
console.log("===== 当前产品标签路由检查 =====");

for (const [key, candidates] of Object.entries(
  routeCandidates,
)) {
  const resolved = candidates.find((candidate) =>
    availableRoutes.has(candidate),
  );

  console.log("");
  console.log(`标签：${key}`);

  if (!resolved) {
    console.log("没有命中预设的明确路由。");
    console.log("项目中可能相关的路由：");

    const relatedRoutes = findRelatedRoutes(key);

    if (relatedRoutes.length === 0) {
      console.log("  未找到");
    } else {
      relatedRoutes.forEach((route) => {
        console.log(
          `  ${route}  ←  ${availableRoutes.get(route)}`,
        );
      });
    }

    throw new Error(
      `${key} 没有确认到明确的静态页面，已停止修改。`,
    );
  }

  resolvedRoutes[key] = resolved;

  console.log(`目标路由：${resolved}`);
  console.log(`页面文件：${availableRoutes.get(resolved)}`);
}

/* =========================================================
   2. 插入四个标签的路由映射
========================================================= */

const routeMarkerStart =
  "/* HOME_ANALYTICAL_PRODUCT_ROUTES_START */";

const routeMarkerEnd =
  "/* HOME_ANALYTICAL_PRODUCT_ROUTES_END */";

const routeBlock = [
  routeMarkerStart,
  "const ANALYTICAL_PRODUCT_TAG_ROUTES: Record<string, string> = {",
  ...Object.entries(resolvedRoutes).map(
    ([key, route]) => `  "${key}": "${route}",`,
  ),
  "};",
  "",
  "function getLocalizedProductRoute(",
  "  locale: LocaleCode,",
  "  route: string,",
  ") {",
  '  return locale === "zh-CN"',
  "    ? route",
  "    : `/${locale}${route}`;",
  "}",
  routeMarkerEnd,
].join(componentNewline);

const oldRouteBlockPattern =
  /\/\* HOME_ANALYTICAL_PRODUCT_ROUTES_START \*\/[\s\S]*?\/\* HOME_ANALYTICAL_PRODUCT_ROUTES_END \*\//;

if (oldRouteBlockPattern.test(component)) {
  component = component.replace(
    oldRouteBlockPattern,
    routeBlock,
  );
} else {
  const exportPattern =
    /export default function HomeApplicationFlowSection\(/;

  if (!exportPattern.test(component)) {
    throw new Error(
      "没有找到组件函数入口，已停止修改。",
    );
  }

  component = component.replace(
    exportPattern,
    routeBlock +
      componentNewline +
      componentNewline +
      "export default function HomeApplicationFlowSection(",
  );
}

/* =========================================================
   3. 增加标签选中状态
========================================================= */

if (
  !component.includes(
    "activeMobileProductTagKey",
  )
) {
  const changingStatePattern =
    /(const \[isMobileChanging,\s*setIsMobileChanging\]\s*=\s*useState\(false\);)/;

  if (!changingStatePattern.test(component)) {
    throw new Error(
      "没有找到手机切换状态变量，已停止修改。",
    );
  }

  component = component.replace(
    changingStatePattern,
    [
      "$1",
      "",
      "  // 手机端高端分析仪器产品标签点击状态",
      "  const [",
      "    activeMobileProductTagKey,",
      "    setActiveMobileProductTagKey,",
      "  ] = useState<string | null>(null);",
    ].join(componentNewline),
  );
}

/* 切换应用时清除产品标签状态 */
if (
  !component.includes(
    "setActiveMobileProductTagKey(null);",
  )
) {
  const changingCall =
    "    setIsMobileChanging(true);";

  const count =
    component.split(changingCall).length - 1;

  if (count !== 1) {
    throw new Error(
      `setIsMobileChanging(true) 数量不是 1，而是 ${count}。`,
    );
  }

  component = component.replace(
    changingCall,
    [
      "    setActiveMobileProductTagKey(null);",
      changingCall,
    ].join(componentNewline),
  );
}

/* =========================================================
   4. 判断当前是不是高端分析仪器卡片
========================================================= */

if (
  !component.includes(
    "isAnalyticalMobileApplication",
  )
) {
  const activeCardPattern =
    /(const activeMobileApplication\s*=\s*[\s\S]*?mobileApplicationCards\[0\];)/;

  if (!activeCardPattern.test(component)) {
    throw new Error(
      "没有找到 activeMobileApplication，已停止修改。",
    );
  }

  component = component.replace(
    activeCardPattern,
    [
      "$1",
      "",
      "  const isAnalyticalMobileApplication =",
      '    activeMobileApplication.key === "analytical-instruments";',
    ].join(componentNewline),
  );
}

/* =========================================================
   5. 给内容层增加 is-analytical class
========================================================= */

const oldContentClassPattern =
  /className=\{\s*isMobileChanging\s*\?\s*"home-flow-mobile-tv-content is-changing"\s*:\s*"home-flow-mobile-tv-content"\s*\}/;

if (oldContentClassPattern.test(component)) {
  const newContentClass = [
    "className={[",
    '                    "home-flow-mobile-tv-content",',
    '                    isMobileChanging ? "is-changing" : "",',
    "                    isAnalyticalMobileApplication",
    '                      ? "is-analytical"',
    '                      : "",',
    "                  ]",
    "                    .filter(Boolean)",
    '                    .join(" ")}',
  ].join(componentNewline);

  component = component.replace(
    oldContentClassPattern,
    newContentClass,
  );
} else if (
  !component.includes(
    '? "is-analytical"',
  )
) {
  throw new Error(
    "没有定位到手机内容层 className，已停止修改。",
  );
}

/* =========================================================
   6. 将高端分析仪器四个 span 改为 Link
========================================================= */

const oldTagsPattern =
  /<div className="home-flow-mobile-tv-tags">\s*\{activeMobileApplication\.tags\.map\(\(tag\) => \(\s*<span key=\{tag\.key\}>\s*\{getHomeFlowText\(tag\.label,\s*locale\)\}\s*<\/span>\s*\)\)\}\s*<\/div>/;

const newTagsBlock = [
  '<div className="home-flow-mobile-tv-tags">',
  "                      {activeMobileApplication.tags.map((tag) => {",
  "                        const tagLabel = getHomeFlowText(",
  "                          tag.label,",
  "                          locale,",
  "                        );",
  "",
  "                        const productRoute =",
  "                          isAnalyticalMobileApplication",
  "                            ? ANALYTICAL_PRODUCT_TAG_ROUTES[tag.key]",
  "                            : undefined;",
  "",
  "                        if (!productRoute) {",
  "                          return <span key={tag.key}>{tagLabel}</span>;",
  "                        }",
  "",
  "                        const isTagActive =",
  "                          activeMobileProductTagKey === tag.key;",
  "",
  "                        return (",
  "                          <Link",
  "                            key={tag.key}",
  "                            href={getLocalizedProductRoute(",
  "                              locale,",
  "                              productRoute,",
  "                            )}",
  "                            className={[",
  '                              "home-flow-mobile-product-tag",',
  '                              isTagActive ? "is-active" : "",',
  "                            ]",
  "                              .filter(Boolean)",
  '                              .join(" ")}',
  "                            onPointerDown={() =>",
  "                              setActiveMobileProductTagKey(tag.key)",
  "                            }",
  "                            onClick={() =>",
  "                              setActiveMobileProductTagKey(tag.key)",
  "                            }",
  "                          >",
  "                            {tagLabel}",
  "                          </Link>",
  "                        );",
  "                      })}",
  "                    </div>",
].join(componentNewline);

if (oldTagsPattern.test(component)) {
  component = component.replace(
    oldTagsPattern,
    newTagsBlock,
  );
} else if (
  !component.includes(
    "home-flow-mobile-product-tag",
  )
) {
  throw new Error(
    "没有找到原手机标签 span 结构，已停止修改。",
  );
}

/* =========================================================
   7. 在现有标签样式旁插入专属样式
========================================================= */

const styleMarkerStart =
  "/* HOME_ANALYTICAL_MOBILE_LINK_STYLE_START */";

const styleMarkerEnd =
  "/* HOME_ANALYTICAL_MOBILE_LINK_STYLE_END */";

const styleBlock = [
  styleMarkerStart,
  ".home-flow-mobile-tv-content.is-analytical .home-flow-mobile-tv-title,",
  ".home-flow-mobile-tv-content.is-analytical .home-flow-mobile-tv-desc {",
  "  color: #173368 !important;",
  "  text-shadow: none !important;",
  "}",
  "",
  ".home-flow-mobile-tv-content.is-analytical",
  "  .home-flow-mobile-tv-tags",
  "  a.home-flow-mobile-product-tag {",
  "  display: inline-flex !important;",
  "  align-items: center !important;",
  "  justify-content: center !important;",
  "  min-height: 34px !important;",
  "  padding: 6px 12px !important;",
  "  color: #173368 !important;",
  "  background: #ffffff !important;",
  "  border: 1px solid rgba(23, 51, 104, 0.22) !important;",
  "  border-radius: 4px !important;",
  "  box-shadow: none !important;",
  "  text-decoration: none !important;",
  "  font-weight: 600 !important;",
  "  cursor: pointer !important;",
  "  transition:",
  "    color 140ms ease,",
  "    background-color 140ms ease,",
  "    border-color 140ms ease !important;",
  "}",
  "",
  ".home-flow-mobile-tv-content.is-analytical",
  "  .home-flow-mobile-tv-tags",
  "  a.home-flow-mobile-product-tag.is-active,",
  ".home-flow-mobile-tv-content.is-analytical",
  "  .home-flow-mobile-tv-tags",
  "  a.home-flow-mobile-product-tag:active,",
  ".home-flow-mobile-tv-content.is-analytical",
  "  .home-flow-mobile-tv-tags",
  "  a.home-flow-mobile-product-tag:focus-visible {",
  "  color: #09e9b4 !important;",
  "  background: #173368 !important;",
  "  border-color: #173368 !important;",
  "  outline: none !important;",
  "}",
  styleMarkerEnd,
].join(cssNewline);

const oldStyleBlockPattern =
  /\/\* HOME_ANALYTICAL_MOBILE_LINK_STYLE_START \*\/[\s\S]*?\/\* HOME_ANALYTICAL_MOBILE_LINK_STYLE_END \*\//;

if (oldStyleBlockPattern.test(css)) {
  css = css.replace(
    oldStyleBlockPattern,
    styleBlock,
  );
} else {
  /*
    找到最后一套手机 tags 样式，
    把新交互规则放在它后面，不放到文件末尾。
  */
  const tagRulePattern =
    /(?:^|\n)[^{]*\.home-flow-mobile-tv-tags\s+span[^{]*\{[^{}]*\}/g;

  const tagRules = [...css.matchAll(tagRulePattern)];

  console.log("");
  console.log(
    `现有手机标签 span 样式数量：${tagRules.length}`,
  );

  if (tagRules.length < 1) {
    throw new Error(
      "没有找到现有 .home-flow-mobile-tv-tags span 样式，已停止修改。",
    );
  }

  const lastTagRule = tagRules[tagRules.length - 1];
  const insertIndex =
    lastTagRule.index + lastTagRule[0].length;

  css =
    css.slice(0, insertIndex) +
    cssNewline +
    cssNewline +
    styleBlock +
    css.slice(insertIndex);
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
console.log("- 高端分析仪器标题：品牌蓝");
console.log("- 说明文字：品牌蓝");
console.log("- 四个标签：白底、蓝字、4px 圆角");
console.log("- 点击状态：深蓝底、荧光色字");
console.log("- 四个标签已链接到真实产品页面");
console.log("- 其他应用卡片标签仍保持原 span 结构");
