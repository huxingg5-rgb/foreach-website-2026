const fs = require("fs");
const path = require("path");

const root = process.cwd();

function file(rel) {
  return path.join(root, rel);
}

function updateFile(rel, replacers) {
  const full = file(rel);

  if (!fs.existsSync(full)) {
    console.log("未找到，跳过:", rel);
    return;
  }

  let text = fs.readFileSync(full, "utf8");
  const oldText = text;

  for (const [from, to] of replacers) {
    text = text.split(from).join(to);
  }

  if (text !== oldText) {
    const bak = full + ".bak.series-labels";
    if (!fs.existsSync(bak)) {
      fs.copyFileSync(full, bak);
    }
    fs.writeFileSync(full, text, "utf8");
    console.log("已修改:", rel);
  } else {
    console.log("无变化:", rel);
  }
}

/**
 * 1. 修改注射泵筛选数据
 * 左侧筛选项显示：
 * HMD 电磁阀系列注射泵
 * HLD 旋转阀系列注射泵
 */
updateFile("data/products/selection/syringe-pump-selection.generated.ts", [
  ['filter01: "电磁阀注射泵"', 'filter01: "HMD 电磁阀系列注射泵"'],
  ['filter01: "旋转阀注射泵"', 'filter01: "HLD 旋转阀系列注射泵"'],
]);

/**
 * 2. 修改顶部介绍文案
 * 明确写出 HMD / HLD 两个系列
 */
updateFile("data/products/selection/product-type-intro.ts", [
  [
    "产品分为电磁阀系列注射泵和旋转阀系列注射泵。",
    "产品分为 HMD 电磁阀系列注射泵和 HLD 旋转阀系列注射泵。"
  ],
  [
    "The series includes solenoid valve syringe pumps and rotary valve syringe pumps.",
    "The series includes HMD solenoid valve syringe pumps and HLD rotary valve syringe pumps."
  ],
]);

console.log("");
console.log("HMD / HLD 系列名称已更新。");
console.log("下一步：停止 dev 后重新运行 npm run dev，并刷新 /products/pumps/syringe-pumps");