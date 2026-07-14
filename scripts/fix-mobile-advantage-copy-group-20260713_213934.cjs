const fs = require("fs");

const componentPath =
  "components/home/HomeCompanyStrengthSection.tsx";

const cssPath = "app/globals.css";

let component = fs.readFileSync(
  componentPath,
  "utf8",
);

let css = fs.readFileSync(
  cssPath,
  "utf8",
);

const newline = css.includes("\r\n")
  ? "\r\n"
  : "\n";

/* =========================================================
   1. 给两段正文增加独立容器
========================================================= */

const oldJsx = `                <p className="home-panel-brief"> {/* 企业优势简短说明 */}
                  {getHomeCompanyText(advantage.brief, locale)} {/* 企业优势简短说明多语言文字 */}
                </p> {/* 企业优势简短说明结束 */}

                <p className="home-panel-detail"> {/* 企业优势详细说明 */}
                  {getHomeCompanyText(advantage.detail, locale)} {/* 企业优势详细说明多语言文字 */}
                </p> {/* 企业优势详细说明结束 */}`;

const newJsx = `                <div className="home-panel-copy-group"> {/* 企业优势两段正文独立容器 */}
                  <p className="home-panel-brief"> {/* 企业优势简短说明 */}
                    {getHomeCompanyText(advantage.brief, locale)} {/* 企业优势简短说明多语言文字 */}
                  </p> {/* 企业优势简短说明结束 */}

                  <p className="home-panel-detail"> {/* 企业优势详细说明 */}
                    {getHomeCompanyText(advantage.detail, locale)} {/* 企业优势详细说明多语言文字 */}
                  </p> {/* 企业优势详细说明结束 */}
                </div> {/* 企业优势两段正文独立容器结束 */}`;

const existingGroupCount =
  component.split(
    'className="home-panel-copy-group"',
  ).length - 1;

const oldJsxCount =
  component.split(oldJsx).length - 1;

console.log(
  `现有正文容器数量：${existingGroupCount}`,
);

console.log(
  `原始两段正文结构数量：${oldJsxCount}`,
);

if (existingGroupCount > 1) {
  throw new Error(
    "发现多个 home-panel-copy-group，停止修改。",
  );
}

if (existingGroupCount === 0) {
  if (oldJsxCount !== 1) {
    throw new Error(
      "没有唯一找到原始两段正文 JSX，停止修改。",
    );
  }

  component = component.replace(
    oldJsx,
    newJsx,
  );

  console.log("已增加正文独立容器。");
} else {
  console.log("正文独立容器已存在，跳过 JSX 修改。");
}

/* =========================================================
   2. 重写现有手机端文字规则

   不新增另一套覆盖代码。
   删除原有 brief/detail 单独 top:-5px 的方式。
========================================================= */

const startMarker =
  "/* HOME_MOBILE_ADVANTAGE_TEXT_GAP_START */";

const endMarker =
  "/* HOME_MOBILE_ADVANTAGE_TEXT_GAP_END */";

const textRulePattern =
  /\/\* HOME_MOBILE_ADVANTAGE_TEXT_GAP_START \*\/[\s\S]*?\/\* HOME_MOBILE_ADVANTAGE_TEXT_GAP_END \*\//g;

const textRuleMatches =
  css.match(textRulePattern) || [];

console.log(
  `现有手机端正文规则数量：${textRuleMatches.length}`,
);

if (textRuleMatches.length !== 1) {
  throw new Error(
    "没有唯一找到 HOME_MOBILE_ADVANTAGE_TEXT_GAP 规则。",
  );
}

const newTextRule = [
  startMarker,
  "  /* 标题和荧光线保持原位置，只统一左侧基准线 */",
  "  .home-company-advantages-section",
  "    .home-panel-title,",
  "  .home-company-advantages-section",
  "    .home-panel-line {",
  "    margin-left: 12px !important;",
  "    padding-left: 0 !important;",
  "    text-align: left !important;",
  "  }",
  "",
  "  /* 两段正文作为一个整体，只移动这个整体 */",
  "  .home-company-advantages-section",
  "    .home-panel-copy-group {",
  "    display: flex !important;",
  "    flex-direction: column !important;",
  "    align-items: flex-start !important;",
  "    gap: 2px !important;",
  "",
  "    width: calc(100% - 12px) !important;",
  "    max-width: calc(100% - 12px) !important;",
  "",
  "    margin-top: 18px !important;",
  "    margin-right: 0 !important;",
  "    margin-bottom: 0 !important;",
  "    margin-left: 12px !important;",
  "",
  "    padding: 0 !important;",
  "",
  "    transform: translateY(-5px) !important;",
  "    transition: none !important;",
  "    animation: none !important;",
  "  }",
  "",
  "  /* 清除正文自身的位移和段落外边距 */",
  "  .home-company-advantages-section",
  "    .home-panel-copy-group",
  "    .home-panel-brief,",
  "  .home-company-advantages-section",
  "    .home-panel-copy-group",
  "    .home-panel-detail,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:hover",
  "    .home-panel-copy-group",
  "    .home-panel-brief,",
  "  .home-company-advantages-section",
  "    .home-advantage-panel:hover",
  "    .home-panel-copy-group",
  "    .home-panel-detail {",
  "    position: static !important;",
  "    top: auto !important;",
  "",
  "    width: 100% !important;",
  "    max-width: 100% !important;",
  "",
  "    margin: 0 !important;",
  "    padding: 0 !important;",
  "",
  "    text-align: left !important;",
  "    text-indent: 0 !important;",
  "",
  "    opacity: 1 !important;",
  "    transform: none !important;",
  "    transition: none !important;",
  "    animation: none !important;",
  "    pointer-events: none !important;",
  "  }",
  endMarker,
].join(newline);

css = css.replace(
  textRulePattern,
  newTextRule,
);

/* =========================================================
   3. 防止旧位移标记残留在其他位置
========================================================= */

const oldOffsetPattern =
  /\s*\/\* HOME_MOBILE_ADVANTAGE_COPY_OFFSET_START \*\/[\s\S]*?\/\* HOME_MOBILE_ADVANTAGE_COPY_OFFSET_END \*\/\s*/g;

const oldOffsetCount = (
  css.match(oldOffsetPattern) || []
).length;

console.log(
  `文字规则外残留的旧位移规则：${oldOffsetCount}`,
);

if (oldOffsetCount > 0) {
  css = css.replace(
    oldOffsetPattern,
    newline,
  );

  console.log("已删除残留的旧位移规则。");
}

/* =========================================================
   4. 写入文件
========================================================= */

fs.writeFileSync(
  componentPath,
  component,
  "utf8",
);

fs.writeFileSync(
  cssPath,
  css,
  "utf8",
);

console.log("");
console.log("结构修正完成：");
console.log("- 标题不移动");
console.log("- 荧光线不移动");
console.log("- 两段正文组成独立容器");
console.log("- 只将正文容器上移 5px");
console.log("- 两段正文间距固定为 2px");
console.log("- 所有手机端企业优势卡片统一生效");
