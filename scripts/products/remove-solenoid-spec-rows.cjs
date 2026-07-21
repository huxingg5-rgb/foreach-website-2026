const fs = require("fs");
const path = require("path");

const root = process.cwd();

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

function abs(relativePath) {
  return path.join(root, relativePath);
}

function backup(filePath, tag) {
  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.bak_${tag}_${stamp()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log("已备份：" + path.relative(root, backupPath));
  }
}

const jsonPath = abs("data/products/generated/valves/detail/index.json");

if (!fs.existsSync(jsonPath)) {
  console.error("找不到文件：data/products/generated/valves/detail/index.json");
  process.exit(1);
}

backup(jsonPath, "remove_solenoid_spec_rows");

const details = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const solenoid = details.find((item) => item.slug === "solenoid-valves");

if (!solenoid) {
  console.error("没有找到 slug = solenoid-valves 的电磁阀数据。");
  process.exit(1);
}

const removeLabels = new Set([
  "型号",
  "通口数",
  "阀形式",
  "重量",
  "功耗-带节电回路启动",
  "功耗-带节电回路保持",
]);

solenoid.specs = (solenoid.specs || []).filter((item) => {
  return !removeLabels.has(item.label);
});

fs.writeFileSync(jsonPath, JSON.stringify(details, null, 2) + "\n", "utf8");

console.log("已删除 6010 电磁阀规格表中的以下字段：");
for (const label of removeLabels) {
  console.log("- " + label);
}

console.log("");
console.log("当前 6010 电磁阀规格表剩余字段：");
for (const item of solenoid.specs) {
  console.log("- " + item.label + "：" + item.value);
}