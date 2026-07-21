const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const newline = css.includes("\r\n")
  ? "\r\n"
  : "\n";

const mainStart =
  "/* HOME_MOBILE_ADVANTAGE_STATIC_START */";

const mainEnd =
  "/* HOME_MOBILE_ADVANTAGE_STATIC_END */";

const gapStart =
  "/* HOME_MOBILE_ADVANTAGE_TEXT_GAP_START */";

const gapEnd =
  "/* HOME_MOBILE_ADVANTAGE_TEXT_GAP_END */";

const mainPattern =
  /\/\* HOME_MOBILE_ADVANTAGE_STATIC_START \*\/[\s\S]*?\/\* HOME_MOBILE_ADVANTAGE_STATIC_END \*\//;

const mainMatches = css.match(
  new RegExp(mainPattern.source, "g"),
) || [];

console.log(
  `手机端企业优势静态规则数量：${mainMatches.length}`,
);

if (mainMatches.length !== 1) {
  throw new Error(
    "没有唯一找到 HOME_MOBILE_ADVANTAGE_STATIC 规则。",
  );
}

let mainBlock = mainMatches[0];

const gapBlock = [
  gapStart,
  "  /* 四张卡片的两段说明统一缩小间距 */",
  "  .home-company-advantages-section",
  "    .home-panel-brief {",
  "    margin-bottom: 0 !important;",
  "    padding-bottom: 0 !important;",
  "  }",
  "",
  "  .home-company-advantages-section",
  "    .home-panel-detail,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:hover",
  "    .home-panel-detail {",
  "    margin: 0 !important;",
  "    padding-top: 0 !important;",
  "  }",
  gapEnd,
].join(newline);

const existingGapPattern =
  /\/\* HOME_MOBILE_ADVANTAGE_TEXT_GAP_START \*\/[\s\S]*?\/\* HOME_MOBILE_ADVANTAGE_TEXT_GAP_END \*\//;

const gapCount = (
  mainBlock.match(
    new RegExp(existingGapPattern.source, "g"),
  ) || []
).length;

console.log(
  `现有段落间距规则数量：${gapCount}`,
);

if (gapCount > 1) {
  throw new Error(
    "发现多组段落间距规则，停止修改。",
  );
}

if (gapCount === 1) {
  mainBlock = mainBlock.replace(
    existingGapPattern,
    gapBlock,
  );
} else {
  /*
    插入到现有手机端 @media 的最后一个结束大括号之前，
    确保覆盖前面的 margin-top 规则。
  */
  const endMarkerIndex =
    mainBlock.lastIndexOf(mainEnd);

  const mediaCloseIndex =
    mainBlock.lastIndexOf(
      "}",
      endMarkerIndex,
    );

  if (mediaCloseIndex < 0) {
    throw new Error(
      "没有找到手机端媒体查询的结束大括号。",
    );
  }

  mainBlock =
    mainBlock.slice(0, mediaCloseIndex) +
    newline +
    newline +
    gapBlock +
    newline +
    mainBlock.slice(mediaCloseIndex);
}

css = css.replace(
  mainPattern,
  mainBlock,
);

fs.writeFileSync(path, css, "utf8");

console.log("");
console.log("修改完成：");
console.log("- 四张企业优势卡片统一生效");
console.log("- 第一段下边距清零");
console.log("- 第二段上边距清零");
console.log("- PC 端不受影响");
