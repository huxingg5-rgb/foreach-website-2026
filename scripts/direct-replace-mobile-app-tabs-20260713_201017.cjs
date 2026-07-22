const fs = require("fs");

const filePath =
  "components/home/HomeApplicationFlowSection.tsx";

let source = fs.readFileSync(filePath, "utf8");

const newline = source.includes("\r\n")
  ? "\r\n"
  : "\n";

const openingTag =
  '<div className="home-flow-mobile-app-tabs">';

const openingCount =
  source.split(openingTag).length - 1;

console.log(
  `home-flow-mobile-app-tabs 数量：${openingCount}`,
);

if (openingCount !== 1) {
  throw new Error(
    "没有唯一找到下方应用按钮容器。",
  );
}

const startIndex = source.indexOf(openingTag);

/*
  这个容器内部没有其他 div，
  所以直接定位它后面的第一个 </div>。
*/
const closingTag = "</div>";

const closingIndex = source.indexOf(
  closingTag,
  startIndex + openingTag.length,
);

if (closingIndex < 0) {
  throw new Error(
    "没有找到下方应用按钮容器的结束标签。",
  );
}

const endIndex =
  closingIndex + closingTag.length;

const oldBlock = source.slice(
  startIndex,
  endIndex,
);

console.log("");
console.log("===== 修改前 =====");
console.log(oldBlock);

if (
  !oldBlock.includes(
    "HOME_MOBILE_APPLICATION_ROUTES",
  )
) {
  console.log(
    "提示：目标区域里没有发现旧路由引用，但仍会强制重建。",
  );
}

const newBlock = [
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
  source.slice(0, startIndex) +
  newBlock +
  source.slice(endIndex);

/*
  删除之前错误加入的应用跳转映射块。
  上方产品标签使用的是 PRODUCT_TAG_ROUTES，
  不会被删除。
*/
source = source.replace(
  /\s*\/\* HOME_MOBILE_APPLICATION_ROUTES_START \*\/[\s\S]*?\/\* HOME_MOBILE_APPLICATION_ROUTES_END \*\/\s*/g,
  newline + newline,
);

/*
  兼容映射常量失去标记的情况。
*/
source = source.replace(
  /\s*const HOME_MOBILE_APPLICATION_ROUTES\s*:\s*Record<string,\s*string>\s*=\s*\{[\s\S]*?\};\s*/g,
  newline,
);

source = source.replace(
  /\s*function getLocalizedApplicationHref\s*\(\s*locale\s*:\s*LocaleCode\s*,\s*applicationPath\s*:\s*string\s*,?\s*\)\s*\{[\s\S]*?\n\}\s*/g,
  newline,
);

fs.writeFileSync(
  filePath,
  source,
  "utf8",
);

/* 写入后重新读取验证 */
const saved = fs.readFileSync(
  filePath,
  "utf8",
);

const savedStart =
  saved.indexOf(openingTag);

const savedEnd =
  saved.indexOf(
    closingTag,
    savedStart + openingTag.length,
  ) + closingTag.length;

const savedBlock = saved.slice(
  savedStart,
  savedEnd,
);

console.log("");
console.log("===== 写入后 =====");
console.log(savedBlock);

const forbiddenInTabs = [
  "HOME_MOBILE_APPLICATION_ROUTES",
  "getLocalizedApplicationHref",
  "applicationPath",
  "<Link",
  "href=",
];

for (const term of forbiddenInTabs) {
  if (savedBlock.includes(term)) {
    throw new Error(
      `下方按钮区域仍然存在：${term}`,
    );
  }
}

if (!savedBlock.includes("<button")) {
  throw new Error(
    "下方区域没有成功恢复 button。",
  );
}

if (
  !savedBlock.includes(
    "handleMobileApplicationChange(index)",
  )
) {
  throw new Error(
    "下方按钮没有绑定切换函数。",
  );
}

const remainingApplicationRouteReferences =
  (
    saved.match(
      /HOME_MOBILE_APPLICATION_ROUTES|getLocalizedApplicationHref/g,
    ) || []
  ).length;

console.log("");
console.log(
  `错误应用跳转残留：${remainingApplicationRouteReferences}`,
);

if (remainingApplicationRouteReferences !== 0) {
  throw new Error(
    "组件其他位置仍有错误应用跳转代码。",
  );
}

const productLinkReferences =
  (
    saved.match(
      /HOME_MOBILE_PRODUCT_TAG_ROUTES|getLocalizedProductHref|home-flow-mobile-product-tag/g,
    ) || []
  ).length;

console.log(
  `上方产品链接标识：${productLinkReferences}`,
);

console.log("");
console.log("文件已写入：");
console.log("- 下方应用按钮恢复为 button");
console.log("- 点击只切换展示内容");
console.log("- 错误应用跳转代码已删除");
console.log("- 上方产品标签链接未删除");
