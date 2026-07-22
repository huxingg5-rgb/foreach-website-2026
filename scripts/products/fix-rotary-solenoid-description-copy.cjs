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

const backup = `${file}.bak_fix_rotary_solenoid_description_${stamp()}`;
fs.copyFileSync(file, backup);

const details = JSON.parse(fs.readFileSync(file, "utf8"));

const rotary = details.find((item) => item.slug === "rotary-valves");
const solenoid = details.find((item) => item.slug === "solenoid-valves");

if (!rotary) {
  console.error("没有找到 rotary-valves 数据。");
  process.exit(1);
}

if (!solenoid) {
  console.error("没有找到 solenoid-valves 数据。");
  process.exit(1);
}

/*
  MRV3 主描述：
  不写泛泛的“适用于自动化仪器”，而是写清楚：
  - 多通道流路选择
  - 多瓶试剂 / 清洗液 / 废液路径集中接入
  - 10 / 16 / 24 通道
  - 通道直径、内容积、耐压、接口
  - 选型确认点
*/
rotary.description =
  "MRV3 陶瓷多通道旋转阀用于自动化分析仪器中的多端口流路选择，可将多瓶试剂、清洗液、废液或样本相关路径集中接入一个旋转切换单元。该系列覆盖 10 / 16 / 24 通道配置，通道直径为 1.2mm / 1.0mm / 0.5mm，内容积为 15.8μL / 10μL / 2.9μL，耐压 0.7MPa，接口支持 1/4-28UNF 与 6-40UNF。实际选型时需结合端口数量、目标通径、介质兼容性、接口规格、驱动器、通信接口和安装空间确认。";

rotary.seoDescription =
  "MRV3陶瓷多通道旋转阀用于自动化分析仪器中的多端口流路选择和试剂路径切换，支持10/16/24通道，通道直径1.2/1.0/0.5mm，内容积15.8/10/2.9μL，耐压0.7MPa，接口支持1/4-28UNF和6-40UNF。";

/*
  6010 主描述：
  不写泛泛的“液路通断控制”，而是写清楚：
  - 低压液路开关
  - 试剂 / 清洗液 / 稀释液 / 废液路径
  - 摆臂隔膜阀
  - 基板型 / 螺纹型 / 倒刺型
  - 压力、孔口、CV、膜片材料、电压
  - 选型确认点
*/
solenoid.description =
  "6010 系列电磁阀用于自动化分析仪器中的低压液路通断控制，可用于试剂、清洗液、稀释液和废液路径的开关控制。该系列为摆臂隔膜阀，覆盖基板型、螺纹型和倒刺型结构，使用压力范围为 -75kPa~0.25MPa，孔口直径 1.4mm，阀室内容积 20uL，流量系数 CV 为 0.03。实际选型时需确认通口数、阀形式、接口方式、膜片材质、介质兼容性、额定电压和是否需要节能回路。";

solenoid.seoDescription =
  "6010系列电磁阀用于自动化分析仪器低压液路通断控制，适用于试剂、清洗液、稀释液和废液路径开关，支持基板型、螺纹型和倒刺型结构，压力范围-75kPa~0.25MPa，孔口1.4mm，阀室内容积20uL，CV0.03。";

fs.writeFileSync(file, JSON.stringify(details, null, 2) + "\n", "utf8");

console.log("已修正 MRV3 和 6010 详情页主描述与 SEO 描述。");
console.log("规格表未修改。");
console.log("备份文件：" + path.relative(root, backup));