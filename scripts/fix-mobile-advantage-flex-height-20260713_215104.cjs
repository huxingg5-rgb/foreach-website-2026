const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const startMarker =
  "/* HOME_MOBILE_ADVANTAGE_TEXT_GAP_START */";

const endMarker =
  "/* HOME_MOBILE_ADVANTAGE_TEXT_GAP_END */";

const startIndex = css.indexOf(startMarker);
const endIndex = css.indexOf(endMarker);

if (
  startIndex < 0 ||
  endIndex < 0 ||
  endIndex <= startIndex
) {
  throw new Error(
    "没有找到完整的 HOME_MOBILE_ADVANTAGE_TEXT_GAP 规则。",
  );
}

const endPosition =
  endIndex + endMarker.length;

const before = css.slice(0, startIndex);
let block = css.slice(
  startIndex,
  endPosition,
);
const after = css.slice(endPosition);

/*
  只锁定正文独立容器的 CSS 块，
  不修改两个段落自身的 padding。
*/
const groupPattern =
  /(\.home-company-advantages-section\s+\.home-panel-copy-group\s*\{)([\s\S]*?)(\})/g;

const groupMatches = [
  ...block.matchAll(groupPattern),
];

console.log(
  `正文独立容器规则数量：${groupMatches.length}`,
);

if (groupMatches.length !== 1) {
  throw new Error(
    "没有唯一找到 .home-panel-copy-group 规则。",
  );
}

const fullGroupRule = groupMatches[0][0];
const selectorStart = groupMatches[0][1];
let groupBody = groupMatches[0][2];
const selectorEnd = groupMatches[0][3];

const transformCount = (
  groupBody.match(
    /transform:\s*translateY\(-5px\)\s*!important;/g,
  ) || []
).length;

const gapCount = (
  groupBody.match(
    /gap:\s*2px\s*!important;/g,
  ) || []
).length;

console.log(
  `上移 5px 规则数量：${transformCount}`,
);

console.log(
  `段落间距 2px 规则数量：${gapCount}`,
);

if (transformCount !== 1) {
  throw new Error(
    "正文容器没有唯一的 translateY(-5px) 规则。",
  );
}

if (gapCount !== 1) {
  throw new Error(
    "正文容器没有唯一的 gap: 2px 规则。",
  );
}

/*
  清除可能存在的旧补偿值，
  再增加准确的 8px 高度补偿。
*/
groupBody = groupBody.replace(
  /^\s*padding-bottom:\s*\d+(?:\.\d+)?px\s*!important;\s*$/gm,
  "",
);

const paddingZeroPattern =
  /padding:\s*0\s*!important;/g;

const paddingZeroCount = (
  groupBody.match(paddingZeroPattern) || []
).length;

console.log(
  `正文容器 padding: 0 数量：${paddingZeroCount}`,
);

if (paddingZeroCount !== 1) {
  throw new Error(
    "没有唯一找到正文容器的 padding: 0 规则。",
  );
}

groupBody = groupBody.replace(
  paddingZeroPattern,
  [
    "padding: 0 !important;",
    "    padding-bottom: 8px !important;",
  ].join("\n"),
);

const newGroupRule =
  selectorStart +
  groupBody +
  selectorEnd;

block = block.replace(
  fullGroupRule,
  newGroupRule,
);

css = before + block + after;

fs.writeFileSync(
  path,
  css,
  "utf8",
);

console.log("");
console.log("修改完成：");
console.log("- 保留正文整体上移 5px");
console.log("- 保留两段正文间距 2px");
console.log("- 补回缩小间距造成的 8px 排版高度");
console.log("- 标题和荧光线恢复原位置");
console.log("- 5 张企业优势卡片统一生效");
