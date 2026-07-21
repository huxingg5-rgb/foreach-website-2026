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

const backup = `${file}.bak_fix_hp_description_${stamp()}`;
fs.copyFileSync(file, backup);

const details = JSON.parse(fs.readFileSync(file, "utf8"));

const hp = details.find((item) => item.slug === "high-pressure-valves");

if (!hp) {
  console.error("没有找到 high-pressure-valves 数据。");
  process.exit(1);
}

hp.description =
  "HP 三位七通高压阀用于 HPLC 自动进样和分析仪器高压液路中的路径切换，可在进样、排气、旁路和清洗等液路状态之间进行切换。该阀采用三位七通结构，最大工作压力 25MPa，接口规格 10-32UNF，通道直径 0.4mm，内体积 0.8μL，适用于对耐压、密封可靠性、低内体积和阀位切换稳定性有要求的高压分析液路模块。实际选型时需结合流动相或样品介质、系统压力、接口形式、切换逻辑和安装空间确认。";

hp.seoDescription =
  "HP三位七通高压阀用于HPLC自动进样和分析仪器高压液路路径切换，最大工作压力25MPa，接口10-32UNF，通道直径0.4mm，内体积0.8μL，适用于进样、排气、旁路和清洗等高压液路状态切换。";

fs.writeFileSync(file, JSON.stringify(details, null, 2) + "\n", "utf8");

console.log("已修正 HP 高压阀详情页主描述与 SEO 描述。");
console.log("备份文件：" + path.relative(root, backup));