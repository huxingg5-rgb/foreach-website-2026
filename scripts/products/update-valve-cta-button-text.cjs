const fs = require("fs");
const path = require("path");

const root = process.cwd();

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

const file = path.join(root, "data/products/generated/valves/detail/index.json");

if (!fs.existsSync(file)) {
  console.error("找不到文件：data/products/generated/valves/detail/index.json");
  process.exit(1);
}

const backup = `${file}.bak_cta_button_contact_engineer_${stamp()}`;
fs.copyFileSync(file, backup);

const details = JSON.parse(fs.readFileSync(file, "utf8"));

for (const item of details) {
  if (
    item.slug === "rotary-valves" ||
    item.slug === "high-pressure-valves" ||
    item.slug === "solenoid-valves"
  ) {
    item.bottomCtaButtonText = "联系工程师";
    item.customInquiryButtonText = "联系工程师";

    if (item.bottomCta) {
      item.bottomCta.button = "联系工程师";
      item.bottomCta.buttonText = "联系工程师";
    }

    if (item.customInquiryCta) {
      item.customInquiryCta.button = "联系工程师";
      item.customInquiryCta.buttonText = "联系工程师";
    }
  }
}

fs.writeFileSync(file, JSON.stringify(details, null, 2) + "\n", "utf8");

console.log("已将阀系列底部 CTA 按钮统一改为：联系工程师");
console.log("备份文件：" + path.relative(root, backup));