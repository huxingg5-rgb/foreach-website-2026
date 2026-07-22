const fs = require("fs");
const path = require("path");

const root = process.cwd();

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

const pagePath = path.join(root, "app/products/probes/[slug]/page.tsx");

if (!fs.existsSync(pagePath)) {
  console.error("找不到文件：app/products/probes/[slug]/page.tsx");
  process.exit(1);
}

const backup = `${pagePath}.bak_probe_inquiry_banner_up_20_${stamp()}`;
fs.copyFileSync(pagePath, backup);

let text = fs.readFileSync(pagePath, "utf8");

const styleBlock = `<style
        dangerouslySetInnerHTML={{
          __html: \`
            /*
              PROBE_INQUIRY_BANNER_OFFSET_20PX

              只作用于针系列详情页。
              将底部询盘 banner 轻微上移 20px，
              不影响泵、阀等其他详情页。
            */
            [data-probe-detail-page="true"] [class*="plungerBottomCta"],
            [data-probe-detail-page="true"] [class*="bottomCta"],
            [data-probe-detail-page="true"] [class*="BottomCta"],
            [data-probe-detail-page="true"] [class*="customInquiryCta"],
            [data-probe-detail-page="true"] [class*="CustomInquiryCta"] {
              margin-top: -20px !important;
            }
          \`,
        }}
      />`;

if (text.includes("PROBE_INQUIRY_BANNER_OFFSET_20PX")) {
  text = text.replace(/margin-top:\s*-\d+px\s*!important;/g, "margin-top: -20px !important;");
  console.log("已存在针系列询盘 banner 上移样式，已统一调整为 -20px。");
} else if (text.includes('<div data-probe-detail-page="true">')) {
  text = text.replace(
    '<div data-probe-detail-page="true">',
    `<div data-probe-detail-page="true">
      ${styleBlock}`
  );
  console.log("已在针系列详情页 wrapper 内加入询盘 banner 上移 20px 样式。");
} else if (text.includes("return <ProductDetailView data={toClientData(detail)} />;")) {
  text = text.replace(
    "return <ProductDetailView data={toClientData(detail)} />;",
    `return (
    <div data-probe-detail-page="true">
      ${styleBlock}
      <ProductDetailView data={toClientData(detail)} />
    </div>
  );`
  );
  console.log("已包裹针系列详情页，并加入询盘 banner 上移 20px 样式。");
} else {
  console.error("没有找到可自动插入的位置，请把 app/products/probes/[slug]/page.tsx 末尾 return 部分发我。");
  process.exit(1);
}

fs.writeFileSync(pagePath, text, "utf8");

console.log("完成：针系列详情页底部询盘 banner 已上移 20px。");
console.log("备份文件：" + path.relative(root, backup));
console.log("");
console.log("请测试：");
console.log("/products/probes/sampling-probes");
console.log("/products/probes/piercing-probes");
console.log("/products/probes/wash-probes");
console.log("/products/probes/stirring-paddles");