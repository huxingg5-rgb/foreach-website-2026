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
    "没有找到完整的手机端企业优势文字规则。",
  );
}

const endPosition =
  endIndex + endMarker.length;

const before = css.slice(0, startIndex);
let block = css.slice(startIndex, endPosition);
const after = css.slice(endPosition);

const targetPattern =
  /(\.home-company-advantages-section\s+\.home-panel-title,\s*\.home-company-advantages-section\s+\.home-panel-line\s*\{)([\s\S]*?)(\})/g;

const matches = [
  ...block.matchAll(targetPattern),
];

console.log(
  `标题和横线共用规则数量：${matches.length}`,
);

if (matches.length !== 1) {
  throw new Error(
    "没有唯一找到标题和横线的共用规则。",
  );
}

const fullRule = matches[0][0];
const ruleStart = matches[0][1];
let ruleBody = matches[0][2];
const ruleEnd = matches[0][3];

/*
  只清理这一组选择器中可能存在的旧位移，
  不碰正文和正文容器。
*/
ruleBody = ruleBody
  .replace(
    /^\s*position:\s*[^;]+;\s*$/gm,
    "",
  )
  .replace(
    /^\s*top:\s*[^;]+;\s*$/gm,
    "",
  )
  .trimEnd();

ruleBody += [
  "",
  "    position: relative !important;",
  "    top: 5px !important;",
  "  ",
].join("\n");

const newRule =
  ruleStart +
  ruleBody +
  ruleEnd;

block = block.replace(
  fullRule,
  newRule,
);

css = before + block + after;

fs.writeFileSync(
  path,
  css,
  "utf8",
);

console.log("");
console.log("修改完成：");
console.log("- 标题向下移动 5px");
console.log("- 荧光横线向下移动 5px");
console.log("- 两段正文位置不变");
console.log("- 所有企业优势卡片统一生效");
