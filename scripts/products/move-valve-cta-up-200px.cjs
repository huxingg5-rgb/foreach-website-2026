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

const backup = `${pagePath}.bak_valve_cta_offset_${stamp()}`;
fs.copyFileSync(pagePath, backup);

let text = fs.readFileSync(pagePath, "utf8");

if (text.includes("VALVE_DETAIL_CTA_OFFSET_200PX")) {
  console.log("阀系列详情页已经有 200px 上移修正，无需重复修改。");
} else {
  const oldReturn = "return <ProductDetailView data={toClientData(detail)} />;";

  const newReturn = `return (
    <div data-valve-detail-page="true">
      {/*
        VALVE_DETAIL_CTA_OFFSET_200PX

        只作用于阀系列详情页。
        目的：减少 FAQ 区域下方到蓝色定制 CTA 之间的空白，
        不改公共 ProductDetailClient 结构，不影响泵系列详情页。
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: \`
            [data-valve-detail-page="true"] > main > section:last-of-type,
            [data-valve-detail-page="true"] > div > section:last-of-type {
              margin-top: -200px !important;
            }

            [data-valve-detail-page="true"] [class*="bottomCta"],
            [data-valve-detail-page="true"] [class*="BottomCta"],
            [data-valve-detail-page="true"] [class*="customInquiryCta"],
            [data-valve-detail-page="true"] [class*="CustomInquiryCta"] {
              margin-top: -200px !important;
            }
          \`,
        }}
      />
      <ProductDetailView data={toClientData(detail)} />
    </div>
  );`;

  if (!text.includes(oldReturn)) {
    console.error("没有找到原始 return 语句，无法自动修改。");
    console.error("请把 app/products/valves/[slug]/page.tsx 末尾 return 附近代码发我。");
    process.exit(1);
  }

  text = text.replace(oldReturn, newReturn);

  fs.writeFileSync(pagePath, text, "utf8");

  console.log("已将阀系列详情页底部 CTA 上移 200px。");
  console.log("备份文件：" + path.relative(root, backup));
}

console.log("");
console.log("请测试：");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");