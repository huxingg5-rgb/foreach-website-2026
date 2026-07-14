const fs = require("fs");

const path = "app/contact/contact.css";
let css = fs.readFileSync(path, "utf8");

const startMarker =
  "/* CONTACT_MOBILE_GUIDE_TITLE_ROW_START */";

const endMarker =
  "/* CONTACT_MOBILE_GUIDE_TITLE_ROW_END */";

const pattern =
  /\/\* CONTACT_MOBILE_GUIDE_TITLE_ROW_START \*\/[\s\S]*?\/\* CONTACT_MOBILE_GUIDE_TITLE_ROW_END \*\//g;

const matches = css.match(pattern) || [];

console.log(
  `现有手机端填写说明规则数量：${matches.length}`,
);

if (matches.length !== 1) {
  throw new Error(
    "没有唯一找到 CONTACT_MOBILE_GUIDE_TITLE_ROW 规则，停止修改。",
  );
}

const newBlock = `/* CONTACT_MOBILE_GUIDE_TITLE_ROW_START */
@media (max-width: 768px) {
  /*
    手机端填写说明：
    编号和标题同一行，正文紧跟其后。
  */
  .contact-guide-item {
    display: grid !important;

    grid-template-columns:
      max-content minmax(0, 1fr) !important;

    grid-template-rows:
      max-content max-content !important;

    column-gap: 8px !important;
    row-gap: 12px !important;

    align-items: baseline !important;
    align-content: start !important;
    justify-content: start !important;

    box-sizing: border-box !important;

    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;

    margin: 0 !important;
    padding: 20px 18px !important;
  }

  /*
    编号仅占自身宽度。
  */
  .contact-guide-number {
    grid-column: 1 !important;
    grid-row: 1 !important;

    display: block !important;

    width: auto !important;
    min-width: 0 !important;
    height: auto !important;
    min-height: 0 !important;

    margin: 0 !important;
    padding: 0 !important;

    font-size: 14px !important;
    line-height: 1.25 !important;
    white-space: nowrap !important;
  }

  /*
    让标题和正文直接参与外层网格布局。
  */
  .contact-guide-copy {
    display: contents !important;
  }

  .contact-guide-copy h4 {
    grid-column: 2 !important;
    grid-row: 1 !important;

    align-self: baseline !important;

    margin: 0 !important;
    padding: 0 !important;

    font-size: 18px !important;
    line-height: 1.3 !important;
  }

  /*
    正文放在下一行，使用整张卡片宽度。
  */
  .contact-guide-copy p {
    grid-column: 1 / -1 !important;
    grid-row: 2 !important;

    align-self: start !important;

    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;

    margin: 0 !important;
    padding: 0 !important;

    line-height: 1.7 !important;
  }
}
/* CONTACT_MOBILE_GUIDE_TITLE_ROW_END */`;

css = css.replace(
  pattern,
  newBlock,
);

fs.writeFileSync(
  path,
  css,
  "utf8",
);

const finalMatches = css.match(pattern) || [];

if (finalMatches.length !== 1) {
  throw new Error(
    "修改后的规则数量异常。",
  );
}

console.log("");
console.log("修改完成：");
console.log("- 01 与应用场景保持同一行");
console.log("- 取消每项固定高度");
console.log("- 标题和正文连续排列");
console.log("- 卡片内边距改为 20px 18px");
console.log("- 标题与正文间距为 12px");
console.log("- 仅手机端生效");
