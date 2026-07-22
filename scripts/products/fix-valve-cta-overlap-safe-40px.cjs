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

const backup = `${pagePath}.bak_fix_valve_cta_overlap_${stamp()}`;
fs.copyFileSync(pagePath, backup);

let text = fs.readFileSync(pagePath, "utf8");

/*
  清理之前的 200px / 90px 上移方案。
  原方案选择器较多，可能造成 CTA 内容被顶到上边界。
*/
text = text.replace(
  /\{\/\*\s*VALVE_DETAIL_CTA_OFFSET_[\s\S]*?\*\/\}\s*<style\s*dangerouslySetInnerHTML=\{\{\s*__html:\s*`[\s\S]*?`,\s*\}\}\s*\/>/,
  `{
        /*
          VALVE_DETAIL_CTA_OFFSET_SAFE_40PX

          只针对阀系列详情页轻微减少 FAQ 到底部 CTA 的空白。
          不再使用多组叠加选择器，避免蓝色 CTA 内部文字被顶上去。
        */
      }
      <style
        dangerouslySetInnerHTML={{
          __html: \`
            [data-valve-detail-page="true"] [class*="bottomCta"],
            [data-valve-detail-page="true"] [class*="BottomCta"],
            [data-valve-detail-page="true"] [class*="customInquiryCta"],
            [data-valve-detail-page="true"] [class*="CustomInquiryCta"] {
              margin-top: -40px !important;
            }
          \`,
        }}
      />`
);

fs.writeFileSync(pagePath, text, "utf8");

console.log("已修复阀系列 CTA 间距：从叠加上移改为单一安全上移 -40px。");
console.log("备份文件：" + path.relative(root, backup));
console.log("");
console.log("请测试：");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");