const fs = require("node:fs");
const path = require("node:path");

const project = process.cwd();

const clientPath = path.join(
  project,
  "components",
  "products",
  "detail",
  "ProductDetailClient.tsx"
);

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
  const now = new Date();

  const pad = (value) =>
    String(value).padStart(2, "0");

  return (
    now.getFullYear() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    "-" +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
}

if (!fs.existsSync(clientPath)) {
  throw new Error(
    `未找到文件：${clientPath}`
  );
}

const backupId = timestamp();
const backupPath =
  `${clientPath}.bak_${backupId}`;

fs.copyFileSync(
  clientPath,
  backupPath
);

let source = read(clientPath);

/* =========================================================
   一、加强接头详情判断
========================================================= */

const fittingFunctionPattern =
  /function isFittingDetailData\(data: any\): boolean \{[\s\S]*?\n\}/;

const fittingFunctionMatch =
  source.match(fittingFunctionPattern);

if (!fittingFunctionMatch) {
  throw new Error(
    "未找到 isFittingDetailData()，已停止修改。"
  );
}

const newFittingFunction = `function isFittingDetailData(data: any): boolean {
  const categoryText = [
    data?.sourceType,
    data?.productCategory,
    data?.productType,
    data?.productTypeId,
    data?.productTypeName,
    data?.category,
    data?.categoryId,
    data?.categoryKey,
    data?.series,
    data?.seriesName,
    data?.detailMode,
    data?.slug,
    data?.href,
    data?.detailHref,
  ]
    .map((value) =>
      String(value || "").trim().toLowerCase()
    )
    .filter(Boolean)
    .join(" ");

  const model = String(
    data?.model ||
      data?.displayModel ||
      data?.modelDisplay ||
      data?.foreachModel ||
      ""
  )
    .trim()
    .toUpperCase();

  return (
    categoryText.includes("fitting") ||
    categoryText.includes("connector") ||
    categoryText.includes("quick-connect") ||
    categoryText.includes("hard-tube") ||
    categoryText.includes("luer") ||
    categoryText.includes("barbed") ||
    categoryText.includes("thread-to-barbed") ||
    categoryText.includes("female-thread-adapter") ||
    categoryText.includes("bulkhead-barbed") ||
    categoryText.includes("check-valve") ||
    categoryText.includes("filter") ||
    /^(Q20|Q40|Q60)/.test(model)
  );
}`;

source = source.replace(
  fittingFunctionPattern,
  newFittingFunction
);

console.log("已加强接头详情识别。");

/* =========================================================
   二、给接头生成底部蓝色 Banner
========================================================= */

const fittingCtaMarker =
  "FITTING_BOTTOM_CTA_20260717";

if (!source.includes(fittingCtaMarker)) {
  const functionStart =
    "function getPlungerPumpBottomCta(data: any) {";

  const functionStartIndex =
    source.indexOf(functionStart);

  if (functionStartIndex < 0) {
    throw new Error(
      "未找到 getPlungerPumpBottomCta()。"
    );
  }

  const tubingLine =
    "  const tubingCta = getTubingBottomCtaData(data);";

  const tubingLineIndex =
    source.indexOf(
      tubingLine,
      functionStartIndex
    );

  if (tubingLineIndex < 0) {
    throw new Error(
      "未找到管子 CTA 入口，已停止修改。"
    );
  }

  const fittingCtaCode = `  /* FITTING_BOTTOM_CTA_20260717 */
  if (isFittingDetailData(data)) {
    if (data?.__locale === "en") {
      return {
        title:
          "Fittings for volume orders and custom applications",
        desc:
          "FOREACH can support fitting selection, volume supply, and customization based on port type, tube size, material, sealing element, mounting structure, and application conditions.",
        button:
          "Contact Us",
        href:
          "/contact",
      };
    }

    return {
      title:
        "接头支持批量采购与定制",
      desc:
        "恒永达可根据接口形式、管径、材质、密封件、安装结构及应用工况，提供接头选型、批量供货与定制支持。",
      button:
        "联系我们",
      href:
        "/contact",
    };
  }

`;

  source =
    source.slice(0, tubingLineIndex) +
    fittingCtaCode +
    source.slice(tubingLineIndex);

  console.log(
    "已为接头增加底部蓝色 Banner。"
  );
} else {
  console.log(
    "接头底部 Banner 已存在，跳过重复添加。"
  );
}

/* =========================================================
   三、确认醒目提示仍在 Banner 内
========================================================= */

const noticeMarker =
  'data-bulk-custom-notice="true"';

if (!source.includes(noticeMarker)) {
  throw new Error(
    "没有找到批量定制提示，请先不要继续。"
  );
}

if (
  !source.includes(
    "如有批量采购或定制需求，欢迎联系我们。"
  )
) {
  throw new Error(
    "中文批量定制提示不存在。"
  );
}

/* =========================================================
   四、写入并重新验证
========================================================= */

write(clientPath, source);

const verify = read(clientPath);

if (
  !verify.includes(
    "FITTING_BOTTOM_CTA_20260717"
  )
) {
  throw new Error(
    "接头 CTA 写入验证失败。"
  );
}

if (
  !verify.includes(
    "接头支持批量采购与定制"
  )
) {
  throw new Error(
    "接头 Banner 中文标题写入失败。"
  );
}

if (
  !verify.includes(
    "/^(Q20|Q40|Q60)/.test(model)"
  )
) {
  throw new Error(
    "快插接头识别规则写入失败。"
  );
}

console.log("");
console.log("接头与管子底部 Banner 修复完成。");
console.log(`备份：${backupPath}`);
console.log("");