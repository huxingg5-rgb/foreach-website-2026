const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function ok(label, pass) {
  console.log(`${pass ? "✅" : "❌"} ${label}`);
  return pass;
}

let allPass = true;
function check(label, pass) {
  allPass = ok(label, pass) && allPass;
}

const jsonPath = "data/products/generated/pumps/syringe-pumps/detail/index.json";
const pagePath = "app/products/pumps/syringe-pumps/[slug]/page.tsx";

console.log("\n===== 注射泵详情页检查 =====\n");

check("详情 JSON 存在", fs.existsSync(p(jsonPath)));
check("详情动态路由存在", fs.existsSync(p(pagePath)));

const details = fs.existsSync(p(jsonPath))
  ? JSON.parse(fs.readFileSync(p(jsonPath), "utf8"))
  : [];

check("详情页数量为 4", Array.isArray(details) && details.length === 4);

const required = [
  "hmd3-30mm-solenoid-syringe-pump",
  "hmd6-60mm-solenoid-syringe-pump",
  "hld3-30mm-rotary-valve-syringe-pump",
  "hld6-60mm-rotary-valve-syringe-pump"
];

for (const slug of required) {
  const item = details.find((x) => x.slug === slug);
  check(`存在 ${slug}`, Boolean(item));
  if (item) {
    check(`${slug} H1 存在`, Boolean(item.h1Title));
    check(`${slug} 描述存在`, Boolean(item.description));
    check(`${slug} 规格表存在`, Array.isArray(item.specifications) && item.specifications.length >= 8);
    check(`${slug} 应用存在`, Array.isArray(item.commonApplications) && item.commonApplications.length >= 4);
    check(`${slug} FAQ 存在`, Array.isArray(item.faq) && item.faq.length >= 4);
    check(`${slug} 定制模式`, item.isCustomInquiry === true && item.isCustomOnly === true);
    check(`${slug} 图纸按钮开启`, item.showDrawingRequest === true);
    check(`${slug} 3D按钮关闭`, item.show3DRequest === false);
  }
}

console.log("\n===== 检查结果 =====\n");

if (allPass) {
  console.log("✅ 注射泵详情页数据与路由已创建。");
  console.log("下一步打开：");
  for (const slug of required) {
    console.log(`http://localhost:3000/products/pumps/syringe-pumps/${slug}`);
  }
} else {
  console.log("❌ 有检查项未通过，请根据上方红叉修正。");
}
