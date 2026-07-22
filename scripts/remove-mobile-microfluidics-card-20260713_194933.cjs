const fs = require("fs");

const path = "data/home-application-flow.ts";
let source = fs.readFileSync(path, "utf8");

/* =========================================================
   1. 删除“微流体领域”手机端专属卡片完整定义
========================================================= */

const definitionPattern =
  /\/\*\s*=+\s*\r?\n\s*手机端新增应用卡片：微流体领域[\s\S]*?const microfluidicsMobileCard:\s*HomeFlowMobileApplicationCard\s*=\s*\{[\s\S]*?\r?\n\};\s*\r?\n(?=\s*\/\*\s*=+\s*\r?\n\s*把 PC 应用卡片转换成手机端应用卡片)/g;

const definitionMatches = [
  ...source.matchAll(definitionPattern),
];

console.log(
  `微流体领域卡片定义数量：${definitionMatches.length}`,
);

if (definitionMatches.length !== 1) {
  throw new Error(
    "没有唯一找到微流体领域卡片定义，已停止修改。",
  );
}

source = source.replace(definitionPattern, "");

/* =========================================================
   2. 删除手机端数组中的入口
========================================================= */

const arrayEntryPattern =
  /^[ \t]*microfluidicsMobileCard,\s*\r?\n/gm;

const arrayEntryMatches = [
  ...source.matchAll(arrayEntryPattern),
];

console.log(
  `手机端数组入口数量：${arrayEntryMatches.length}`,
);

if (arrayEntryMatches.length !== 1) {
  throw new Error(
    "没有唯一找到 microfluidicsMobileCard 数组入口，已停止修改。",
  );
}

source = source.replace(arrayEntryPattern, "");

/* =========================================================
   3. 更新原有说明文字
========================================================= */

const replacements = [
  [
    "1. 手机端显示 6 个按钮",
    "1. 手机端显示 5 个按钮",
  ],
  [
    "2. 前 5 个复用 PC 端数据",
    "2. 5 个按钮全部复用 PC 端数据",
  ],
  [
    "3. 第 6 个是新增的“微流体领域”",
    "",
  ],
  [
    "4. 以后手机端内容全部从这里读取，不再写在组件里",
    "3. 以后手机端内容全部从这里读取，不再写在组件里",
  ],
];

for (const [oldText, newText] of replacements) {
  const count = source.split(oldText).length - 1;

  console.log(`${oldText}：${count}`);

  if (count !== 1) {
    throw new Error(
      `说明文字没有唯一匹配：${oldText}`,
    );
  }

  source = source.replace(oldText, newText);
}

/* 清理删除说明行后留下的空白行 */
source = source.replace(
  /(\r?\n[ \t]*)\r?\n([ \t]*3\. 以后手机端内容)/,
  "$1$2",
);

/* =========================================================
   4. 最终确认不再残留
========================================================= */

const remainingReferenceCount = (
  source.match(/microfluidicsMobileCard/g) || []
).length;

console.log(
  `修改后 microfluidicsMobileCard 残留数量：${remainingReferenceCount}`,
);

if (remainingReferenceCount !== 0) {
  throw new Error(
    "仍存在 microfluidicsMobileCard 引用，已停止写入。",
  );
}

fs.writeFileSync(path, source, "utf8");

console.log("");
console.log("修改完成：");
console.log("- 删除手机端“微流体领域”按钮");
console.log("- 删除对应展示内容");
console.log("- 手机应用数量由 6 个改为 5 个");
console.log("- PC 端五个应用卡片未修改");
