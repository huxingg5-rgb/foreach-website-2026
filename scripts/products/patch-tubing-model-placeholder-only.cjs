const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/detail/ProductDetailClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/detail/ProductDetailClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_tubing_model_placeholder_${stamp}`);

let text = fs.readFileSync(file, "utf8");

/*
  1. 增加管路识别函数
  只识别 productCategory/productType/category/detailMode/slug 中的 tubing。
*/
if (!text.includes("function isTubingDetailData(data: any): boolean")) {
  const helper = `
function isTubingDetailData(data: any): boolean {
  return (
    data?.productCategory === "tubing" ||
    data?.productType === "tubing" ||
    data?.category === "tubing" ||
    data?.detailMode === "material_selection" ||
    (typeof data?.slug === "string" && data.slug.includes("-tubing"))
  );
}

`;

  text = text.replace(
    "function getDisplayModelText(data: any): string {",
    helper + "function getDisplayModelText(data: any): string {"
  );
}

/*
  2. 只改红框里的型号显示：
  管路页面显示 XXX-XXX-XX-XX
  其它页面保持原逻辑。
*/
text = text.replace(
  /function getDisplayModelText\(data: any\): string \{[\s\S]*?\n\}\n\nfunction isCustomInquiryMode/,
  `function getDisplayModelText(data: any): string {
  if (isTubingDetailData(data)) {
    return "XXX-XXX-XX-XX";
  }

  if (isCustomInquiryMode(data)) {
    return "定制配置请联系我们";
  }

  return (data as any).displayModel || data.model || "";
}

function isCustomInquiryMode`
);

/*
  3. 只改红框按钮文字：
  管路页面显示“选择型号”
  其它页面保持原逻辑。
*/
text = text.replace(
  /function getModelActionText\(data: any\): string \{[\s\S]*?\n\}/,
  `function getModelActionText(data: any): string {
  if (isTubingDetailData(data)) {
    return "选择型号";
  }

  return isCustomInquiryMode(data) ? "联系我们" : "型号选择";
}`
);

/*
  4. 管路按钮先预留跳转到 #model-selection
  后面做型号选择区或弹窗时，再接这个锚点。
*/
text = text.replace(
  /function getModelActionHref\(data: any\): string \{\s*/,
  `function getModelActionHref(data: any): string {
  if (isTubingDetailData(data)) {
    return data?.modelSelectionHref || "#model-selection";
  }

  `
);

fs.writeFileSync(file, text, "utf8");

console.log("已完成：只修改管路详情页红框型号区域。");
console.log("管路页面现在显示：型号：XXX-XXX-XX-XX / 按钮：选择型号");
console.log("其它产品页面保持原逻辑。");