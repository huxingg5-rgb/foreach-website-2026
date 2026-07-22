const fs = require("fs");
const path = require("path");

/* =========================================================
   check-selection-detail-copy-separation.js
   恒永达官网｜产品中心卡片文案与详情页长文分离检查

   作用：
   1. 检查详情页组件是否误用产品中心 cardSubtitle
   2. 检查产品中心组件是否误用详情页 advantages
   3. 检查详情页生成数据里是否出现卡片短句
   4. 检查产品中心生成数据里是否出现明显详情页长文
   5. 只读取文件，不修改任何文件

   使用方式：
   node scripts/products/check-selection-detail-copy-separation.js
========================================================= */

const root = process.cwd();

const files = {
  detailService: path.join(
    root,
    "services",
    "products",
    "detail",
    "getProductDetailPageData.ts"
  ),
  detailClient: path.join(
    root,
    "components",
    "products",
    "detail",
    "ProductDetailClient.tsx"
  ),
  selectionClient: path.join(
    root,
    "components",
    "products",
    "selection",
    "ProductSelectionClient.tsx"
  ),
  selectionCard: path.join(
    root,
    "components",
    "products",
    "selection",
    "ProductSelectionCard.tsx"
  ),
  detailGenerated: path.join(
    root,
    "data",
    "products",
    "detail",
    "ea-product-details.zh.generated.ts"
  ),
  selectionGenerated: path.join(
    root,
    "data",
    "products",
    "selection",
    "product-selection.generated.ts"
  ),
};

function read(file) {
  if (!fs.existsSync(file)) {
    return "";
  }

  return fs.readFileSync(file, "utf8");
}

function reportError(message) {
  console.error("❌ " + message);
}

function reportOk(message) {
  console.log("✅ " + message);
}

let hasError = false;

const detailService = read(files.detailService);
const detailClient = read(files.detailClient);
const selectionClient = read(files.selectionClient);
const selectionCard = read(files.selectionCard);
const detailGenerated = read(files.detailGenerated);
const selectionGenerated = read(files.selectionGenerated);

/* =========================================================
   1. 详情页不应该使用 cardSubtitle
========================================================= */
const detailLayerContent = [detailService, detailClient].join("\n");

if (/cardSubtitle/.test(detailLayerContent)) {
  hasError = true;
  reportError("详情页代码中出现 cardSubtitle，可能误用了产品中心卡片短文。");
} else {
  reportOk("详情页代码没有使用 cardSubtitle。");
}

/* =========================================================
   2. 产品中心不应该使用详情页长文字段
========================================================= */
const selectionLayerContent = [selectionClient, selectionCard].join("\n");

if (/advantages|commonApplications|detailRecord|ProductDetail/.test(selectionLayerContent)) {
  hasError = true;
  reportError("产品中心代码中出现详情页字段，可能误用了详情页长文数据。");
} else {
  reportOk("产品中心代码没有使用详情页长文字段。");
}

/* =========================================================
   3. 详情页生成数据不应该出现卡片短句
   注意：这里先放当前已经用过的卡片短句，后续卡片文案确定后可以继续补充。
========================================================= */
const cardShortCopyPatterns = [
  "1/4-28 UNF 液路接口",
  "满行程 CV",
  "单泵 / 泵阀一体",
  "容量：100 μL",
  "泵头材料",
  "Volume:",
  "Head Material:",
  "Port:",
];

const pollutedDetailPhrases = cardShortCopyPatterns.filter((phrase) =>
  detailGenerated.includes(phrase)
);

if (pollutedDetailPhrases.length > 0) {
  hasError = true;
  reportError(
    "详情页生成数据中出现了卡片短句：" + pollutedDetailPhrases.join("、")
  );
} else {
  reportOk("详情页生成数据没有发现当前卡片短句。");
}

/* =========================================================
   4. 产品中心卡片文案不应该出现明显详情页长文
   判断方式：cardSubtitle 中如果出现过长段落，提示人工检查。
========================================================= */
const longSubtitleMatches = selectionGenerated.match(
  /"cardSubtitle":\s*\{[\s\S]*?\}/g
) || [];

const suspiciousLongSubtitles = longSubtitleMatches.filter((block) => {
  const compact = block.replace(/\s+/g, "");
  return compact.length > 260;
});

if (suspiciousLongSubtitles.length > 0) {
  hasError = true;
  reportError(
    `发现 ${suspiciousLongSubtitles.length} 个 cardSubtitle 过长，可能把详情页长文放进了产品中心卡片。`
  );
} else {
  reportOk("产品中心 cardSubtitle 未发现明显长文。");
}

console.log("");
console.log("检查完成。");

if (hasError) {
  console.error("结果：存在混用风险，请先处理后再提交。");
  process.exit(1);
}

console.log("结果：产品中心卡片文案与详情页长文目前是分开的。");
