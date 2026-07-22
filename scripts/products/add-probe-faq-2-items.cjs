const fs = require("fs");
const path = require("path");

const root = process.cwd();

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

const file = path.join(root, "data/products/generated/probes/detail/index.json");

if (!fs.existsSync(file)) {
  console.error("找不到文件：data/products/generated/probes/detail/index.json");
  process.exit(1);
}

const backup = `${file}.bak_add_probe_faq_2_${stamp()}`;
fs.copyFileSync(file, backup);

const details = JSON.parse(fs.readFileSync(file, "utf8"));

const extraFaqMap = {
  "sampling-probes": [
    {
      question: "采样针定制前是否必须提供图纸？",
      answer:
        "建议优先提供 2D 图纸、3D 文件或实物样品。如果暂时没有完整图纸，也可以先提供仪器安装空间、目标液体、吸液容量、针体长度和接口要求，由 FOREACH 协助整理初步确认项。"
    },
    {
      question: "采样针如何降低挂液和交叉污染风险？",
      answer:
        "通常需要结合针尖形状、内壁抛光、外壁涂层、清洗方式和液体特性一起确认。对于高残留风险的样本或试剂，可重点评估内壁粗糙度、外壁防挂液处理和清洗站适配。"
    }
  ],

  "piercing-probes": [
    {
      question: "穿刺针针尖是否可以根据耗材材料调整？",
      answer:
        "可以。封膜、橡胶塞、塑料盖或密闭耗材的材料和厚度不同，针尖角度、刃口方向、强度和表面处理都需要重新确认，避免穿刺不稳定、堵针或耗材碎屑进入液路。"
    },
    {
      question: "穿刺取液时为什么要考虑排气结构？",
      answer:
        "密闭耗材在取液时可能产生负压或气阻，影响取液稳定性。通过排气孔、排气槽或独立气液路径设计，可以改善取液连续性，并减少气泡对后端液路的影响。"
    }
  ],

  "wash-probes": [
    {
      question: "清洗针如何降低 carry-over 风险？",
      answer:
        "需要同时确认喷孔方向、清洗液流量、废液抽排路径、针体相对位置和清洗动作。对于残留风险较高的场景，可结合侧孔喷洗、内外壁冲洗和防挂液表面处理。"
    },
    {
      question: "清洗针是否可以和清洗站一起定制？",
      answer:
        "可以。清洗针通常需要和清洗站空间、废液槽、进液路径和抽排路径一起确认。建议提供清洗站结构图、针体运动方向、目标清洗区域和废液回收方式。"
    }
  ],

  "stirring-paddles": [
    {
      question: "搅拌桨如何避免搅拌时产生气泡或飞溅？",
      answer:
        "需要根据反应杯形状、液面高度、目标液量、转速范围和叶片结构确认。叶片角度、桨叶宽度、同轴度和搅拌深度都会影响气泡、飞溅和混匀稳定性。"
    },
    {
      question: "搅拌桨表面涂层主要用于什么场景？",
      answer:
        "表面涂层通常用于降低挂液、改善清洗效果或满足特定介质兼容性要求。是否需要涂层，需要结合样本或试剂类型、清洗方式、颜色要求和寿命要求确认。"
    }
  ]
};

for (const item of details) {
  const extraFaq = extraFaqMap[item.slug];

  if (!extraFaq) {
    continue;
  }

  const existingFaq = Array.isArray(item.faq) ? item.faq : [];

  const existingQuestions = new Set(existingFaq.map((faq) => faq.question));

  for (const faq of extraFaq) {
    if (!existingQuestions.has(faq.question)) {
      existingFaq.push(faq);
    }
  }

  item.faq = existingFaq;
  item.faqs = existingFaq;
  item.faqItems = existingFaq;
}

fs.writeFileSync(file, JSON.stringify(details, null, 2) + "\n", "utf8");

console.log("已给针系列 4 个详情页 FAQ 各增加 2 个问题。");
console.log("备份文件：" + path.relative(root, backup));

for (const item of details) {
  if (extraFaqMap[item.slug]) {
    console.log(`${item.slug}: FAQ 数量 = ${item.faq.length}`);
  }
}