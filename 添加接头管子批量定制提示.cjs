const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const project = process.cwd();

const clientPath = path.join(
  project,
  "components",
  "products",
  "detail",
  "ProductDetailClient.tsx"
);

const cssPath = path.join(
  project,
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

function requireFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`未找到文件：${filePath}`);
  }
}

function read(filePath) {
  return fs
    .readFileSync(filePath, "utf8")
    .replace(/^\uFEFF/, "");
}

function write(filePath, content) {
  fs.writeFileSync(
    filePath,
    "\uFEFF" + content,
    "utf8"
  );
}

function timestamp() {
  const date = new Date();
  const pad = (value) =>
    String(value).padStart(2, "0");

  return (
    date.getFullYear() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    "-" +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  );
}

requireFile(clientPath);
requireFile(cssPath);

const backupId = timestamp();

fs.copyFileSync(
  clientPath,
  `${clientPath}.bak_${backupId}`
);

fs.copyFileSync(
  cssPath,
  `${cssPath}.bak_${backupId}`
);

let client = read(clientPath);
let css = read(cssPath);

/* =========================================================
   一、增加接头详情判断
========================================================= */

if (!client.includes("function isFittingDetailData")) {
  const tubingFunctionPattern =
    /function isTubingDetailData\(data: any\): boolean \{[\s\S]*?\n\}/;

  const tubingMatch = client.match(
    tubingFunctionPattern
  );

  if (!tubingMatch) {
    throw new Error(
      "未找到 isTubingDetailData()，已停止修改。"
    );
  }

  const fittingHelper = `

function isFittingDetailData(data: any): boolean {
  const categoryValues = [
    data?.productCategory,
    data?.productType,
    data?.category,
    data?.categoryKey,
    data?.detailMode,
  ]
    .map((value) =>
      String(value || "").trim().toLowerCase()
    )
    .filter(Boolean);

  const slug = String(data?.slug || "")
    .trim()
    .toLowerCase();

  return (
    categoryValues.some(
      (value) =>
        value === "fittings" ||
        value === "fitting" ||
        value.includes("fitting") ||
        value.includes("connector")
    ) ||
    slug.includes("fitting") ||
    slug.includes("connector")
  );
}
`;

  const insertPosition =
    tubingMatch.index + tubingMatch[0].length;

  client =
    client.slice(0, insertPosition) +
    fittingHelper +
    client.slice(insertPosition);

  console.log("已增加接头详情判断。");
} else {
  console.log("接头详情判断已存在，跳过。");
}

/* =========================================================
   二、查找页面底部蓝色定制 Banner
========================================================= */

const noticeMarker =
  'data-bulk-custom-notice="true"';

if (!client.includes(noticeMarker)) {
  const sectionPattern =
    /<section\b[\s\S]*?<\/section>/g;

  const sections = [];
  let sectionMatch;

  while (
    (sectionMatch = sectionPattern.exec(client)) !== null
  ) {
    const section = sectionMatch[0];

    let score = 0;

    if (/提交定制需求/.test(section)) {
      score += 20;
    }

    if (/Submit.+Custom|custom.+request/i.test(section)) {
      score += 12;
    }

    if (
      /styles\.[A-Za-z0-9_]*(custom|cta)/i.test(
        section
      )
    ) {
      score += 10;
    }

    if (/定制/.test(section)) {
      score += 6;
    }

    if (/<button|<a\b/.test(section)) {
      score += 2;
    }

    if (/faq/i.test(section)) {
      score -= 10;
    }

    if (score > 0) {
      sections.push({
        start: sectionMatch.index,
        end:
          sectionMatch.index +
          sectionMatch[0].length,
        content: section,
        score,
      });
    }
  }

  sections.sort((a, b) => b.score - a.score);

  const target = sections[0];

  if (!target || target.score < 10) {
    throw new Error(
      "无法可靠定位底部蓝色定制 Banner，未写入提示。"
    );
  }

  const section = target.content;

  /*
   * 找 Banner 按钮前最后一个说明段落，
   * 将新提示插入该段落之后。
   */
  const buttonCandidates = [
    section.lastIndexOf("提交定制需求"),
    section.lastIndexOf("Submit"),
    section.lastIndexOf("<button"),
    section.lastIndexOf("<a"),
  ].filter((index) => index >= 0);

  const buttonIndex =
    buttonCandidates.length > 0
      ? Math.max(...buttonCandidates)
      : section.length;

  const beforeButton = section.slice(
    0,
    buttonIndex
  );

  let insertionIndex =
    beforeButton.lastIndexOf("</p>");

  let closeTagLength = "</p>".length;

  if (insertionIndex < 0) {
    insertionIndex =
      beforeButton.lastIndexOf("</h2>");

    closeTagLength = "</h2>".length;
  }

  if (insertionIndex < 0) {
    throw new Error(
      "已找到定制 Banner，但无法定位说明文字结束位置。"
    );
  }

  insertionIndex += closeTagLength;

  const noticeJsx = `

                {(isFittingDetailData(data) ||
                  isTubingDetailData(data)) ? (
                  <p
                    className={
                      styles.bulkCustomNotice
                    }
                    data-bulk-custom-notice="true"
                  >
                    {isEnglish
                      ? "For volume orders or custom requirements, please contact us."
                      : "如有批量采购或定制需求，欢迎联系我们。"}
                  </p>
                ) : null}`;

  const updatedSection =
    section.slice(0, insertionIndex) +
    noticeJsx +
    section.slice(insertionIndex);

  client =
    client.slice(0, target.start) +
    updatedSection +
    client.slice(target.end);

  console.log(
    "已在蓝色定制 Banner 内加入提示。"
  );
} else {
  console.log(
    "Banner 批量定制提示已存在，跳过。"
  );
}

/* =========================================================
   三、加入明显的 Banner 内提示样式
========================================================= */

const cssStart =
  "/* BULK_CUSTOM_NOTICE_START */";

const cssEnd =
  "/* BULK_CUSTOM_NOTICE_END */";

const cssPattern =
  /\/\* BULK_CUSTOM_NOTICE_START \*\/[\s\S]*?\/\* BULK_CUSTOM_NOTICE_END \*\//;

css = css.replace(cssPattern, "");

const cssBlock = `

/* BULK_CUSTOM_NOTICE_START */
.bulkCustomNotice {
  display: inline-flex;
  width: fit-content;
  max-width: 100%;
  align-items: center;
  margin: 18px 0 0;
  padding: 10px 14px;
  border: 1px solid rgba(9, 233, 180, 0.55);
  border-left: 4px solid #09e9b4;
  border-radius: 6px;
  background: rgba(9, 233, 180, 0.1);
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.6;
}

@media (max-width: 767px) {
  .bulkCustomNotice {
    width: 100%;
    box-sizing: border-box;
    margin-top: 16px;
    padding: 10px 12px;
    font-size: 15px;
  }
}
/* BULK_CUSTOM_NOTICE_END */
`;

css = css.trimEnd() + cssBlock + "\n";

/* =========================================================
   四、写入并检查
========================================================= */

write(clientPath, client);
write(cssPath, css);

const verifyClient = read(clientPath);
const verifyCss = read(cssPath);

if (
  !verifyClient.includes(
    'data-bulk-custom-notice="true"'
  )
) {
  throw new Error(
    "Banner 提示 JSX 写入失败。"
  );
}

if (
  !verifyClient.includes(
    "function isFittingDetailData"
  )
) {
  throw new Error(
    "接头判断函数写入失败。"
  );
}

if (
  !verifyCss.includes(
    "BULK_CUSTOM_NOTICE_START"
  )
) {
  throw new Error(
    "Banner 提示样式写入失败。"
  );
}

console.log("");
console.log("修改完成。");
console.log(`备份编号：${backupId}`);
console.log("");