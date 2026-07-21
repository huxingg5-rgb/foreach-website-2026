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
  `home-flow-mobile-app-tabs 容器数量：${openingCount}`,
);

if (openingCount !== 1) {
  throw new Error(
    "没有唯一找到手机端应用切换容器。",
  );
}

const startIndex = source.indexOf(openingTag);

/*
  从目标 div 开始，逐层计算 div 深度，
  精确找到该容器对应的结束标签。
*/
function findMatchingDiv(text, start) {
  const pattern = /<\/?div\b[^>]*>/g;

  pattern.lastIndex = start;

  let depth = 0;
  let match;

  while ((match = pattern.exec(text))) {
    const tag = match[0];

    if (tag.startsWith("</div")) {
      depth -= 1;

      if (depth === 0) {
        return {
          start,
          end: pattern.lastIndex,
          text: text.slice(
            start,
            pattern.lastIndex,
          ),
        };
      }
    } else {
      depth += 1;
    }
  }

  throw new Error(
    "没有找到应用切换容器对应的结束 div。",
  );
}

const oldElement = findMatchingDiv(
  source,
  startIndex,
);

console.log("");
console.log("===== 修改前内容 =====");
console.log(oldElement.text);

const newElement = [
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
  source.slice(0, oldElement.start) +
  newElement +
  source.slice(oldElement.end);

/*
  先写入文件。
  不再因为其他位置存在旧辅助函数而阻止本次修复。
*/
fs.writeFileSync(
  filePath,
  source,
  "utf8",
);

/* 写入后重新读取并检查目标区域 */
const savedSource = fs.readFileSync(
  filePath,
  "utf8",
);

const savedStart =
  savedSource.indexOf(openingTag);

if (savedStart < 0) {
  throw new Error(
    "写入后没有找到应用切换容器。",
  );
}

const savedElement = findMatchingDiv(
  savedSource,
  savedStart,
);

const forbiddenPatterns = [
  /HOME_MOBILE_APPLICATION_ROUTES/,
  /getLocalizedApplicationHref/,
  /applicationPath/,
  /href\s*=/,
  /<Link\b/,
];

for (const pattern of forbiddenPatterns) {
  if (pattern.test(savedElement.text)) {
    throw new Error(
      `目标切换区域仍存在错误代码：${pattern}`,
    );
  }
}

if (!/<button\b/.test(savedElement.text)) {
  throw new Error(
    "目标区域没有成功恢复 button。",
  );
}

if (
  !savedElement.text.includes(
    "handleMobileApplicationChange(index)",
  )
) {
  throw new Error(
    "目标按钮没有绑定内容切换函数。",
  );
}

console.log("");
console.log("===== 写入后的内容 =====");
console.log(savedElement.text);

console.log("");
console.log("修复完成：");
console.log("- 下方五个应用项已恢复为 button");
console.log("- 删除目标区域里的 applicationPath");
console.log("- 删除目标区域里的 href");
console.log("- 点击只执行内容切换");
console.log("- 上方产品标签链接未修改");
