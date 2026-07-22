const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const newline = css.includes("\r\n") ? "\r\n" : "\n";

const blockStart =
  "/* HOME_MOBILE_ADVANTAGE_TEXT_GAP_START */";

const blockEnd =
  "/* HOME_MOBILE_ADVANTAGE_TEXT_GAP_END */";

const offsetStart =
  "/* HOME_MOBILE_ADVANTAGE_COPY_OFFSET_START */";

const offsetEnd =
  "/* HOME_MOBILE_ADVANTAGE_COPY_OFFSET_END */";

const startIndex = css.indexOf(blockStart);
const endIndex = css.indexOf(blockEnd);

if (startIndex < 0 || endIndex < 0 || endIndex <= startIndex) {
  throw new Error(
    "没有找到完整的 HOME_MOBILE_ADVANTAGE_TEXT_GAP 规则。",
  );
}

const blockEndIndex = endIndex + blockEnd.length;

const before = css.slice(0, startIndex);
let block = css.slice(startIndex, blockEndIndex);
const after = css.slice(blockEndIndex);

/*
  恢复之前被改成 13px 的间距。
  因为真正的上移将由 top:-5px 完成。
*/
const margin13Count =
  block.split("margin-top: 13px !important;").length - 1;

const margin18Count =
  block.split("margin-top: 18px !important;").length - 1;

console.log(`margin-top 13px 数量：${margin13Count}`);
console.log(`margin-top 18px 数量：${margin18Count}`);

if (margin13Count > 1) {
  throw new Error(
    "发现多个 margin-top: 13px，停止修改。",
  );
}

if (margin13Count === 1) {
  block = block.replace(
    "margin-top: 13px !important;",
    "margin-top: 18px !important;",
  );

  console.log("已恢复第一段原有间距 18px。");
}

const offsetBlock = [
  offsetStart,
  "  /* 两段说明文字整体上移 5px，不参与 flex 高度计算 */",
  "  .home-company-advantages-section",
  "    .home-panel-brief,",
  "  .home-company-advantages-section",
  "    .home-panel-detail {",
  "    position: relative !important;",
  "    top: -5px !important;",
  "  }",
  offsetEnd,
].join(newline);

const existingOffsetPattern =
  /\/\* HOME_MOBILE_ADVANTAGE_COPY_OFFSET_START \*\/[\s\S]*?\/\* HOME_MOBILE_ADVANTAGE_COPY_OFFSET_END \*\//g;

const existingOffsetMatches =
  block.match(existingOffsetPattern) || [];

console.log(
  `现有文字上移规则数量：${existingOffsetMatches.length}`,
);

if (existingOffsetMatches.length > 1) {
  throw new Error(
    "发现多组文字上移规则，停止修改。",
  );
}

if (existingOffsetMatches.length === 1) {
  block = block.replace(
    existingOffsetPattern,
    offsetBlock,
  );

  console.log("已更新现有文字上移规则。");
} else {
  block = block.replace(
    blockEnd,
    offsetBlock + newline + blockEnd,
  );

  console.log("已在现有手机端规则内部加入上移规则。");
}

css = before + block + after;

fs.writeFileSync(path, css, "utf8");

console.log("");
console.log("修改完成：");
console.log("- 四张卡片统一生效");
console.log("- 第一段和第二段整体上移 5px");
console.log("- 标题位置不变");
console.log("- 绿色装饰线位置不变");
console.log("- 两段之间的距离不变");
console.log("- PC 端不受影响");
