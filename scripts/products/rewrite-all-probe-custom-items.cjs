const fs = require("fs");
const path = require("path");

const root = process.cwd();

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

function backup(filePath, tag) {
  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.bak_${tag}_${stamp()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log("已备份：" + path.relative(root, backupPath));
  }
}

function extractFirstJsonArray(raw) {
  const start = raw.indexOf("[");
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < raw.length; i++) {
    const ch = raw[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (ch === "\\") {
      escaped = true;
      continue;
    }

    if (ch === '"') {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (ch === "[") depth++;
    if (ch === "]") depth--;

    if (depth === 0) {
      return raw.slice(start, i + 1);
    }
  }

  return null;
}

const file = path.join(root, "data/products/generated/probes/detail/index.json");

if (!fs.existsSync(file)) {
  console.error("找不到文件：data/products/generated/probes/detail/index.json");
  process.exit(1);
}

backup(file, "rewrite_all_probe_custom_items");

let raw = fs.readFileSync(file, "utf8");
let details;

try {
  details = JSON.parse(raw);
} catch (error) {
  console.log("检测到 JSON 损坏，尝试修复：" + error.message);
  const extracted = extractFirstJsonArray(raw);

  if (!extracted) {
    console.error("无法提取有效 JSON 数组。");
    process.exit(1);
  }

  details = JSON.parse(extracted);
}

const customItems = {
  "sampling-probes": {
    specsTitle: "定制确认项",
    specs: [
      {
        label: "图纸或样品",
        value: "请提供 2D 图纸、3D 文件、实物样品或设备安装空间照片",
      },
      {
        label: "吸液结构",
        value: "需确认外径、内径、总长、有效长度、折弯方向和安装端结构",
      },
      {
        label: "针尖与孔位",
        value: "需确认尖口、平口、V型口、侧孔位置、孔径和液体进出方向",
      },
      {
        label: "低残留工艺",
        value: "内壁抛光、外壁涂层和防挂液处理需根据液体类型、目标容量和清洗方式评估",
      },
      {
        label: "液位检测适配",
        value: "如需 cLLD / 电容式液位检测，需确认针体结构、线缆连接和整机检测方式",
      },
      {
        label: "使用条件",
        value: "请提供液体类型、吸液速度、分液容量、清洗方式和防交叉污染要求",
      },
    ],
  },

  "piercing-probes": {
    specsTitle: "定制确认项",
    specs: [
      {
        label: "图纸或样品",
        value: "请提供耗材图纸、封膜/瓶塞样品、穿刺位置图或设备安装空间",
      },
      {
        label: "穿刺对象",
        value: "需确认封膜、瓶塞、试剂仓、样本仓或密闭耗材的材料、厚度和结构强度",
      },
      {
        label: "针尖结构",
        value: "穿刺针尖、刃口方向、针尖角度、针尖强度和表面处理需根据穿刺阻力确认",
      },
      {
        label: "排气结构",
        value: "如需排气孔、排气槽或侧孔结构，需确认气液路径、排气方向和取液动作",
      },
      {
        label: "安装与运动",
        value: "需确认穿刺深度、运动方向、目标取液位置、安装端结构和设备内部空间",
      },
      {
        label: "工艺可行性",
        value: "侧孔、折弯、焊接、抛光和镀层需结合针管尺寸、针尖结构和穿刺稳定性评估",
      },
    ],
  },

  "wash-probes": {
    specsTitle: "定制确认项",
    specs: [
      {
        label: "图纸或样品",
        value: "请提供清洗站结构图、针体安装空间、清洗液路径和废液路径说明",
      },
      {
        label: "清洗对象",
        value: "需确认样本针、试剂针、针外壁清洗、针内壁冲洗或废液抽排需求",
      },
      {
        label: "喷孔结构",
        value: "侧孔数量、孔径、孔位、喷射方向和目标清洗区域需结合清洗动作确认",
      },
      {
        label: "排废结构",
        value: "废液出口、残液回收路径、抽排方向和废液槽位置需结合清洗站结构确认",
      },
      {
        label: "针体形式",
        value: "单头、双头、多头、弯折结构和安装端需根据清洗站空间定制",
      },
      {
        label: "防残留工艺",
        value: "焊接、抛光、涂层和防挂液处理需结合清洗液、废液性质和寿命要求确认",
      },
    ],
  },

  "stirring-paddles": {
    specsTitle: "定制确认项",
    specs: [
      {
        label: "图纸或样品",
        value: "请提供反应杯结构、搅拌空间、安装端尺寸、现有样品或混匀测试要求",
      },
      {
        label: "反应容器",
        value: "需确认反应杯尺寸、杯底形状、液面高度、可用搅拌空间和运动干涉风险",
      },
      {
        label: "桨叶结构",
        value: "平板、螺旋、90度角叶片或其他叶片形状需根据混匀效果和液体状态确认",
      },
      {
        label: "混匀条件",
        value: "请提供目标液量、转速范围、混匀时间、是否允许气泡、飞溅或沉淀残留",
      },
      {
        label: "安装结构",
        value: "需确认安装端形式、同轴度要求、连接方式、运动方向和驱动结构",
      },
      {
        label: "表面处理",
        value: "涂层、颜色、焊接方式、防挂液要求和清洗方式需根据介质与寿命要求确认",
      },
    ],
  },
};

for (const item of details) {
  const update = customItems[item.slug];

  if (!update) continue;

  item.specsTitle = update.specsTitle;
  item.specTitle = update.specsTitle;
  item.specificationTitle = update.specsTitle;
  item.specs = update.specs;

  console.log(`${item.slug}: 已写入 ${update.specs.length} 条针对性定制确认项`);
}

fs.writeFileSync(file, JSON.stringify(details, null, 2) + "\n", "utf8");

try {
  JSON.parse(fs.readFileSync(file, "utf8"));
  console.log("");
  console.log("JSON 校验通过。");
} catch (error) {
  console.error("写入后 JSON 仍然错误：" + error.message);
  process.exit(1);
}

console.log("");
console.log("请刷新检查：");
console.log("/products/probes/sampling-probes");
console.log("/products/probes/piercing-probes");
console.log("/products/probes/wash-probes");
console.log("/products/probes/stirring-paddles");