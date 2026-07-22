const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "data/products/generated/pumps/pipetting-pumps/selection.generated.ts"
);

if (!fs.existsSync(file)) {
  throw new Error("未找到移液泵筛选页数据文件");
}

const text = fs.readFileSync(file, "utf8");

const required = [
  "SMTP2-1000 μL",
  "SMTP4-100 μL",
  "SMTP4-500 μL",
  "定量分辨率 0.02 μL/微步",
  "定量分辨率 0.05 μL/步",
  "定量分辨率 0.25 μL/步",
  "液面检测与堵塞检测",
  "吸头配置可定制",
  "自动脱吸头",
];

for (const item of required) {
  if (!text.includes(item)) {
    throw new Error(`移液泵筛选页数据缺少内容：${item}`);
  }
}

console.log("移液泵筛选页数据检查通过");
console.log(file);
