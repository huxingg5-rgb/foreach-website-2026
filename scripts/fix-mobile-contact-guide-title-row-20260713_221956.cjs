const fs = require("fs");

const path = "app/contact/contact.css";
let css = fs.readFileSync(path, "utf8");

const startMarker =
  "/* CONTACT_MOBILE_GUIDE_TITLE_ROW_START */";

const endMarker =
  "/* CONTACT_MOBILE_GUIDE_TITLE_ROW_END */";

const block = `/* CONTACT_MOBILE_GUIDE_TITLE_ROW_START */
@media (max-width: 768px) {
  /*
    手机端将编号和标题放在同一行：
    01 应用场景
  */
  .contact-guide-item {
    display: grid !important;
    grid-template-columns: max-content minmax(0, 1fr) !important;
    grid-template-rows: auto auto !important;

    column-gap: 8px !important;
    row-gap: 12px !important;

    align-items: baseline !important;
  }

  /*
    编号只占自身文字宽度，
    不再单独占据一整行。
  */
  .contact-guide-number {
    grid-column: 1 !important;
    grid-row: 1 !important;

    width: auto !important;
    min-width: 0 !important;
    height: auto !important;
    min-height: 0 !important;

    margin: 0 !important;
    padding: 0 !important;

    font-size: 14px !important;
    line-height: 1 !important;
    white-space: nowrap !important;
  }

  /*
    让标题和说明文字直接参与外层网格布局。
  */
  .contact-guide-copy {
    display: contents !important;
  }

  .contact-guide-copy h4 {
    grid-column: 2 !important;
    grid-row: 1 !important;

    margin: 0 !important;
    padding: 0 !important;

    line-height: 1.25 !important;
  }

  /*
    说明文字单独放到下一行，
    使用整个卡片的可用宽度。
  */
  .contact-guide-copy p {
    grid-column: 1 / -1 !important;
    grid-row: 2 !important;

    margin: 0 !important;
    padding: 0 !important;
  }
}
/* CONTACT_MOBILE_GUIDE_TITLE_ROW_END */`;

const pattern =
  /\/\* CONTACT_MOBILE_GUIDE_TITLE_ROW_START \*\/[\s\S]*?\/\* CONTACT_MOBILE_GUIDE_TITLE_ROW_END \*\//g;

const matches = css.match(pattern) || [];

console.log(
  `现有手机端编号标题规则数量：${matches.length}`,
);

if (matches.length > 1) {
  throw new Error(
    "发现多组相同规则，停止修改。",
  );
}

if (matches.length === 1) {
  css = css.replace(pattern, block);
  console.log("已更新现有规则。");
} else {
  css = css.trimEnd() + "\n\n" + block + "\n";
  console.log("已加入手机端编号标题同行规则。");
}

fs.writeFileSync(path, css, "utf8");

const finalMatches = css.match(pattern) || [];

if (finalMatches.length !== 1) {
  throw new Error(
    "写入后的规则数量异常。",
  );
}

console.log("");
console.log("修改完成：");
console.log("- 01 与应用场景在同一行");
console.log("- 编号只占自身宽度");
console.log("- 说明文字放到下一行");
console.log("- 01 至 05 全部统一");
console.log("- 仅手机端生效");
