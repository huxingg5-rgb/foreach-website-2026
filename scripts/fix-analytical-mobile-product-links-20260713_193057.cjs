const fs = require("fs");

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

function replaceOnce(source, oldText, newText, label) {
  const count = source.split(oldText).length - 1;

  console.log(`${label} 匹配数量：${count}`);

  if (count !== 1) {
    throw new Error(
      `${label} 不是唯一匹配，已停止修改。`,
    );
  }

  return source.replace(oldText, newText);
}

/* =========================================================
   1. 增加高端分析仪器产品标签链接映射
========================================================= */

const routeMarkerStart =
  "/* HOME_ANALYTICAL_PRODUCT_LINKS_START */";

const routeMarkerEnd =
  "/* HOME_ANALYTICAL_PRODUCT_LINKS_END */";

const routeBlock = [
  routeMarkerStart,
  "const ANALYTICAL_PRODUCT_TAG_LINKS: Record<string, string> = {",
  '  "high-pressure-valve": "/products/valves/high-pressure-valves",',
  '  "piston-pump": "/products/pumps/plunger-pumps/ea-100-pmma",',
  '  "pressure-sensor": "/products",',
  '  "peek-tubing": "/products/tubing/peek-tubing",',
  "};",
  routeMarkerEnd,
].join(componentNewline);

const oldRouteBlockPattern =
  /\/\* HOME_ANALYTICAL_PRODUCT_LINKS_START \*\/[\s\S]*?\/\* HOME_ANALYTICAL_PRODUCT_LINKS_END \*\//;

if (oldRouteBlockPattern.test(component)) {
  component = component.replace(
    oldRouteBlockPattern,
    routeBlock,
  );

  console.log("已更新产品标签链接映射。");
} else {
  const insertionText =
    "function isPlainObject(";

  const insertionCount =
    component.split(insertionText).length - 1;

  console.log(
    `链接映射插入位置数量：${insertionCount}`,
  );

  if (insertionCount !== 1) {
    throw new Error(
      "没有唯一找到 isPlainObject 插入位置。",
    );
  }

  component = component.replace(
    insertionText,
    routeBlock +
      componentNewline +
      componentNewline +
      insertionText,
  );

  console.log("已新增产品标签链接映射。");
}

/* =========================================================
   2. 给高端分析仪器标题增加识别 class
========================================================= */

const oldTitle =
  '<h3 className="home-flow-mobile-tv-title">';

const newTitle = [
  "<h3",
  "                      className={[",
  '                        "home-flow-mobile-tv-title",',
  "                        activeMobileApplication.key ===",
  '                        "analytical-instruments"',
  '                          ? "is-analytical"',
  '                          : "",',
  "                      ]",
  "                        .filter(Boolean)",
  '                        .join(" ")}',
  "                    >",
].join(componentNewline);

if (!component.includes("home-flow-mobile-tv-title") ||
    !component.includes('className="home-flow-mobile-tv-title"')) {
  if (
    !component.includes(
      '"home-flow-mobile-tv-title",',
    )
  ) {
    throw new Error(
      "没有找到手机标题原结构，已停止修改。",
    );
  }

  console.log("手机标题识别 class 已存在。");
} else {
  component = replaceOnce(
    component,
    oldTitle,
    newTitle,
    "手机标题结构",
  );
}

/* =========================================================
   3. 给高端分析仪器说明增加识别 class
========================================================= */

const oldDescription =
  '<p className="home-flow-mobile-tv-desc">';

const newDescription = [
  "<p",
  "                      className={[",
  '                        "home-flow-mobile-tv-desc",',
  "                        activeMobileApplication.key ===",
  '                        "analytical-instruments"',
  '                          ? "is-analytical"',
  '                          : "",',
  "                      ]",
  "                        .filter(Boolean)",
  '                        .join(" ")}',
  "                    >",
].join(componentNewline);

if (
  component.includes(
    'className="home-flow-mobile-tv-desc"',
  )
) {
  component = replaceOnce(
    component,
    oldDescription,
    newDescription,
    "手机说明结构",
  );
} else if (
  !component.includes(
    '"home-flow-mobile-tv-desc",',
  )
) {
  throw new Error(
    "没有找到手机说明原结构，已停止修改。",
  );
} else {
  console.log("手机说明识别 class 已存在。");
}

/* =========================================================
   4. 给标签容器增加识别 class
========================================================= */

const oldTagsContainer =
  '<div className="home-flow-mobile-tv-tags">';

const newTagsContainer = [
  "<div",
  "                      className={[",
  '                        "home-flow-mobile-tv-tags",',
  "                        activeMobileApplication.key ===",
  '                        "analytical-instruments"',
  '                          ? "is-analytical"',
  '                          : "",',
  "                      ]",
  "                        .filter(Boolean)",
  '                        .join(" ")}',
  "                    >",
].join(componentNewline);

if (component.includes(oldTagsContainer)) {
  component = replaceOnce(
    component,
    oldTagsContainer,
    newTagsContainer,
    "手机标签容器",
  );
} else if (
  !component.includes(
    '"home-flow-mobile-tv-tags",',
  )
) {
  throw new Error(
    "没有找到手机标签容器，已停止修改。",
  );
} else {
  console.log("手机标签容器识别 class 已存在。");
}

/* =========================================================
   5. 将高端分析仪器标签由 span 改成 Link
========================================================= */

const oldTagMapPattern =
  /\{activeMobileApplication\.tags\.map\(\(tag\) => \(\s*<span key=\{tag\.key\}>\s*\{getHomeFlowText\(tag\.label,\s*locale\)\}\s*<\/span>\s*\)\)\}/;

const newTagMap = [
  "{activeMobileApplication.tags.map((tag) => {",
  "                        const tagLabel = getHomeFlowText(",
  "                          tag.label,",
  "                          locale,",
  "                        );",
  "",
  "                        const isAnalytical =",
  "                          activeMobileApplication.key ===",
  '                          "analytical-instruments";',
  "",
  "                        const productHref = isAnalytical",
  "                          ? ANALYTICAL_PRODUCT_TAG_LINKS[tag.key]",
  "                          : undefined;",
  "",
  "                        if (!productHref) {",
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
  "                            href={productHref}",
  '                            className="home-flow-mobile-product-tag"',
  "                          >",
  "                            {tagLabel}",
  "                          </Link>",
  "                        );",
  "                      })}",
].join(componentNewline);

if (oldTagMapPattern.test(component)) {
  component = component.replace(
    oldTagMapPattern,
    newTagMap,
  );

  console.log("已将高端分析仪器标签改为 Link。");
} else if (
  !component.includes(
    'className="home-flow-mobile-product-tag"',
  )
) {
  throw new Error(
    "没有找到原标签 span 映射结构，已停止修改。",
  );
} else {
  console.log("产品标签 Link 已存在。");
}

/* =========================================================
   6. 添加专属视觉样式
   放在现有手机标签样式后，不放到文件末尾
========================================================= */

const styleMarkerStart =
  "/* HOME_ANALYTICAL_PRODUCT_STYLE_START */";

const styleMarkerEnd =
  "/* HOME_ANALYTICAL_PRODUCT_STYLE_END */";

const styleBlock = [
  styleMarkerStart,
  ".home-flow-mobile-tv-title.is-analytical,",
  ".home-flow-mobile-tv-desc.is-analytical {",
  "  color: #173368 !important;",
  "  text-shadow: none !important;",
  "}",
  "",
  ".home-flow-mobile-tv-tags.is-analytical",
  "  a.home-flow-mobile-product-tag {",
  "  display: inline-flex !important;",
  "  align-items: center !important;",
  "  justify-content: center !important;",
  "  min-height: 32px !important;",
  "  padding: 5px 11px !important;",
  "  color: #173368 !important;",
  "  background: #ffffff !important;",
  "  border: 1px solid rgba(23, 51, 104, 0.22) !important;",
  "  border-radius: 4px !important;",
  "  box-shadow: none !important;",
  "  text-decoration: none !important;",
  "  font-weight: 500 !important;",
  "  line-height: 1.2 !important;",
  "  -webkit-tap-highlight-color: transparent;",
  "  transition:",
  "    color 120ms ease,",
  "    background-color 120ms ease,",
  "    border-color 120ms ease !important;",
  "}",
  "",
  ".home-flow-mobile-tv-tags.is-analytical",
  "  a.home-flow-mobile-product-tag:active,",
  ".home-flow-mobile-tv-tags.is-analytical",
  "  a.home-flow-mobile-product-tag:focus-visible {",
  "  color: #09e9b4 !important;",
  "  background: #173368 !important;",
  "  border-color: #173368 !important;",
  "  outline: none !important;",
  "}",
  styleMarkerEnd,
].join(cssNewline);

const oldStylePattern =
  /\/\* HOME_ANALYTICAL_PRODUCT_STYLE_START \*\/[\s\S]*?\/\* HOME_ANALYTICAL_PRODUCT_STYLE_END \*\//;

if (oldStylePattern.test(css)) {
  css = css.replace(
    oldStylePattern,
    styleBlock,
  );

  console.log("已更新专属标签样式。");
} else {
  const tagSpanPattern =
    /(?:^|\r?\n)([^\r\n{}]*\.home-flow-mobile-tv-tags\s+span[^\{]*)\{[^{}]*\}/g;

  const matches = [
    ...css.matchAll(tagSpanPattern),
  ];

  console.log(
    `现有手机标签 span 规则数量：${matches.length}`,
  );

  if (matches.length < 1) {
    throw new Error(
      "没有找到现有手机标签样式位置，已停止修改。",
    );
  }

  const lastMatch = matches[matches.length - 1];

  const insertIndex =
    lastMatch.index + lastMatch[0].length;

  css =
    css.slice(0, insertIndex) +
    cssNewline +
    cssNewline +
    styleBlock +
    css.slice(insertIndex);

  console.log(
    "已在现有手机标签样式后插入专属规则。",
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
console.log("修改完成：");
console.log("- 标题和说明改为品牌蓝");
console.log("- 四个产品标签改为可点击链接");
console.log("- 标签白底、蓝字、4px 圆角");
console.log("- 按下时深蓝底、荧光色字");
console.log("- 其他应用卡片仍使用普通 span");
