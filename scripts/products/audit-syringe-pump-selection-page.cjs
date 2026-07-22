const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function read(rel) {
  return fs.existsSync(p(rel)) ? fs.readFileSync(p(rel), "utf8") : "";
}

function ok(label, pass) {
  console.log(`${pass ? "✅" : "❌"} ${label}`);
  return pass;
}

let allPass = true;

function check(label, pass) {
  allPass = ok(label, pass) && allPass;
}

const selectionFile = "data/products/selection/syringe-pump-selection.generated.ts";
const routeFile = "data/products/selection/product-route-map.ts";
const introFile = "data/products/selection/product-type-intro.ts";
const clientFile = "components/products/selection/ProductSelectionClient.tsx";
const imageDir = "public/images/products/pumps/syringe-pumps";

const selection = read(selectionFile);
const routeMap = read(routeFile);
const intro = read(introFile);
const client = read(clientFile);

console.log("\n===== 注射泵筛选页写入检查 =====\n");

check("存在 syringe-pump-selection.generated.ts", fs.existsSync(p(selectionFile)));
check("存在注射泵图片目录", fs.existsSync(p(imageDir)));

check("包含 HMD3 卡片", selection.includes("HMD3 电磁阀注射泵"));
check("包含 HMD6 卡片", selection.includes("HMD6 电磁阀注射泵"));
check("包含 HLD3 卡片", selection.includes("HLD3 旋转阀注射泵"));
check("包含 HLD6 卡片", selection.includes("HLD6 旋转阀注射泵"));

check("HMD 筛选项正确", selection.includes("HMD 电磁阀系列注射泵"));
check("HLD 筛选项正确", selection.includes("HLD 旋转阀系列注射泵"));

check("HMD3 图片路径已写入", selection.includes("/images/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump.webp"));
check("HMD6 图片路径已写入", selection.includes("/images/products/pumps/syringe-pumps/foreach-hmd6-solenoid-valve-syringe-pump.webp"));
check("HLD3 图片路径已写入", selection.includes("/images/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump.webp"));
check("HLD6 图片路径已写入", selection.includes("/images/products/pumps/syringe-pumps/foreach-hld6-rotary-valve-syringe-pump.webp"));

check("路由映射包含 syringe-pumps", routeMap.includes("syringe-pumps"));
check("路由映射包含 syringe-pump", routeMap.includes("syringe-pump"));

check("顶部介绍包含 pumps:syringe-pump", intro.includes("pumps:syringe-pump"));
check("顶部介绍图片路径已写入", intro.includes("foreach-syringe-pump-series.webp"));

check("ProductSelectionClient 已 import 注射泵数据", client.includes("syringePumpSelectionProducts"));
check("ProductSelectionClient 已合并注射泵筛选项", client.includes("syringePumpFilterLabels"));
check("ProductSelectionClient 已包含注射泵详情路径", client.includes("/products/pumps/syringe-pumps"));

console.log("\n===== 图片文件放置检查 =====\n");

const imageFiles = [
  "foreach-syringe-pump-series.webp",
  "foreach-hmd3-solenoid-valve-syringe-pump.webp",
  "foreach-hmd6-solenoid-valve-syringe-pump.webp",
  "foreach-hld3-rotary-valve-syringe-pump.webp",
  "foreach-hld6-rotary-valve-syringe-pump.webp",
];

for (const file of imageFiles) {
  const exists = fs.existsSync(p(path.join(imageDir, file)));
  ok(`${file} ${exists ? "已放入" : "未放入，页面会显示暂无图片"}`, exists);
}

console.log("\n===== 检查结果 =====\n");

if (allPass) {
  console.log("✅ 注射泵筛选页代码接入基本成功。");
  console.log("下一步运行：npm run dev");
  console.log("打开：http://localhost:3000/products/pumps/syringe-pumps");
} else {
  console.log("❌ 有关键项未通过，请先根据上面的红叉修正。");
}