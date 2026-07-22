const fs = require("fs");
const path = require("path");

const root = process.cwd();

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

const pagePath = path.join(root, "app/products/valves/[slug]/page.tsx");

if (!fs.existsSync(pagePath)) {
  console.error("找不到文件：app/products/valves/[slug]/page.tsx");
  process.exit(1);
}

const backup = `${pagePath}.bak_fix_valve_cta_visible_${stamp()}`;
fs.copyFileSync(pagePath, backup);

let text = fs.readFileSync(pagePath, "utf8");

/*
  1. 移除之前所有 VALVE_DETAIL_CTA_OFFSET 相关内联样式。
  原来的负 margin 会把蓝色 CTA 顶上去，导致文字显示不完整。
*/
function removeOldOffsetStyleBlocks(source) {
  let result = source;

  while (result.includes("VALVE_DETAIL_CTA_OFFSET")) {
    const markerIndex = result.indexOf("VALVE_DETAIL_CTA_OFFSET");

    let styleStart = result.lastIndexOf("<style", markerIndex);
    let commentStart = result.lastIndexOf("{/*", markerIndex);
    let start = styleStart;

    if (commentStart !== -1 && commentStart < markerIndex && commentStart > styleStart - 300) {
      start = commentStart;
    }

    const end = result.indexOf("/>", markerIndex);

    if (start === -1 || end === -1) {
      result = result.replace(/VALVE_DETAIL_CTA_OFFSET_[A-Z0-9_]+/g, "VALVE_DETAIL_CTA_OFFSET_REMOVED");
      break;
    }

    result = result.slice(0, start) + result.slice(end + 2);
  }

  return result;
}

text = removeOldOffsetStyleBlocks(text);

/*
  2. 插入安全间距样式：
     - CTA 本身不再上移
     - 只减少 FAQ 区块下方 padding / margin
     - 避免蓝色 CTA 文字被裁切
*/
if (!text.includes("VALVE_DETAIL_CTA_SAFE_SPACING_20260708")) {
  const wrapper = '<div data-valve-detail-page="true">';

  const safeStyle = `<div data-valve-detail-page="true">
      {/*
        VALVE_DETAIL_CTA_SAFE_SPACING_20260708

        阀系列详情页底部间距修正：
        1. 不再对蓝色 CTA 使用负 margin，避免文字被压住
        2. 只压缩 FAQ 区块底部空白
        3. 只作用于阀系列详情页，不影响泵系列详情页
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: \`
            [data-valve-detail-page="true"] [class*="bottomCta"],
            [data-valve-detail-page="true"] [class*="BottomCta"],
            [data-valve-detail-page="true"] [class*="customInquiryCta"],
            [data-valve-detail-page="true"] [class*="CustomInquiryCta"] {
              margin-top: 0 !important;
              transform: none !important;
              position: relative !important;
              top: auto !important;
              overflow: visible !important;
            }

            [data-valve-detail-page="true"] [class*="faqSection"],
            [data-valve-detail-page="true"] [class*="FaqSection"],
            [data-valve-detail-page="true"] section:has([class*="faq"]),
            [data-valve-detail-page="true"] section:has([class*="Faq"]) {
              padding-bottom: 36px !important;
              margin-bottom: 0 !important;
            }
          \`,
        }}
      />`;

  if (!text.includes(wrapper)) {
    console.error("没有找到 data-valve-detail-page 外层容器，无法自动插入安全样式。");
    process.exit(1);
  }

  text = text.replace(wrapper, safeStyle);
}

fs.writeFileSync(pagePath, text, "utf8");

console.log("已修复阀系列底部 CTA 文字被裁切问题。");
console.log("处理方式：取消 CTA 负 margin，只压缩 FAQ 下方空白。");
console.log("备份文件：" + path.relative(root, backup));
console.log("");
console.log("请测试：");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");