const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const markerPattern =
  /\/\* HOME_MOBILE_NEWS_HIGHLIGHT_BUTTON_START \*\/[\s\S]*?\/\* HOME_MOBILE_NEWS_HIGHLIGHT_BUTTON_END \*\//g;

const markerMatches = css.match(markerPattern) || [];

console.log(
  `手机端新闻按钮规则数量：${markerMatches.length}`,
);

if (markerMatches.length !== 1) {
  throw new Error(
    "没有唯一找到手机端新闻按钮规则，停止修改。",
  );
}

let block = markerMatches[0];

const selectorPattern =
  /(\.home-news-highlight-card\s+\.home-news-highlight-footer\s+\.home-news-highlight-btn\s*\{)([\s\S]*?)(\})/g;

const selectorMatches = [
  ...block.matchAll(selectorPattern),
];

console.log(
  `目标按钮选择器数量：${selectorMatches.length}`,
);

if (selectorMatches.length !== 1) {
  throw new Error(
    "没有唯一找到目标按钮选择器，停止修改。",
  );
}

const fullRule = selectorMatches[0][0];
const ruleStart = selectorMatches[0][1];
let ruleBody = selectorMatches[0][2];
const ruleEnd = selectorMatches[0][3];

/*
  先删除目标规则中可能存在的旧 position 和 top，
  再统一设置为向下 15px。
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

ruleBody += `
    position: relative !important;
    top: 15px !important;
  `;

const newRule =
  ruleStart +
  ruleBody +
  ruleEnd;

block = block.replace(
  fullRule,
  newRule,
);

css = css.replace(
  markerPattern,
  block,
);

fs.writeFileSync(
  path,
  css,
  "utf8",
);

console.log("");
console.log("修改完成：");
console.log("- 首页手机端查看详情按钮向下移动 15px");
console.log("- 按钮尺寸保持不变");
console.log("- 卡片标题和正文不移动");
console.log("- PC 端不受影响");
