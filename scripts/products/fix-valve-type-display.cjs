const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "data/products/selection/valve-selection.generated.ts");

if (!fs.existsSync(file)) {
  console.error("找不到文件：" + file);
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
const backup = file + ".bak_fix_valve_chinese_type_" + stamp;
fs.copyFileSync(file, backup);

let text = fs.readFileSync(file, "utf8");

/*
  修复目标：
  页面左侧筛选和上方已选标签正在直接显示 productTypeId，
  所以把 productTypeId 改成中文。

  注意：
  slug / id / href / detailHref 不改，仍然保留英文路由。
*/

const rotary = "\u65cb\u8f6c\u9600";      // 旋转阀
const highPressure = "\u9ad8\u538b\u9600"; // 高压阀
const solenoid = "\u7535\u78c1\u9600";    // 电磁阀

text = text
  .replace(/productTypeId:\s*["']rotary-valves["']/g, `productTypeId: "${rotary}"`)
  .replace(/productTypeId:\s*["']high-pressure-valves["']/g, `productTypeId: "${highPressure}"`)
  .replace(/productTypeId:\s*["']solenoid-valves["']/g, `productTypeId: "${solenoid}"`)
  .replace(/productTypeLabel:\s*["']rotary-valves["']/g, `productTypeLabel: "${rotary}"`)
  .replace(/productTypeLabel:\s*["']high-pressure-valves["']/g, `productTypeLabel: "${highPressure}"`)
  .replace(/productTypeLabel:\s*["']solenoid-valves["']/g, `productTypeLabel: "${solenoid}"`);

fs.writeFileSync(file, text, "utf8");

console.log("已修复阀系列产品类型中文显示");
console.log("已备份：" + path.relative(root, backup));
console.log("");
console.log("当前 productTypeId：");
const matches = text.match(/productTypeId:\s*["'][^"']+["']/g) || [];
for (const item of matches) {
  console.log("  " + item);
}