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

/*
  先尝试从损坏 JSON 中提取第一个完整 JSON 数组。
  这类错误通常是：正常 JSON 后面被追加了一段多余字符。
*/
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

backup(file, "repair_probe_json_before_faq");

let raw = fs.readFileSync(file, "utf8");
let details;

try {
  details = JSON.parse(raw);
  console.log("JSON 当前可解析。");
} catch (error) {
  console.log("检测到 JSON 损坏：" + error.message);

  const extracted = extractFirstJsonArray(raw);

  if (!extracted) {
    console.error("无法从当前文件中提取 JSON 数组。");
    process.exit(1);
  }

  try {
    details = JSON.parse(extracted);
    console.log("已从损坏文件中提取出有效 JSON 数组。");
  } catch (error2) {
    console.error("提取后仍无法解析：" + error2.message);
    process.exit(1);
  }
}

const faqMap = {
  "sampling-probes": [
    {
      question: "采样针是否有标准型号？",
      answer:
        "采样针主要按客户仪器结构来图定制。官网页面只展示典型用途和可定制方向，具体外径、内径、长度、针尖和安装方式需结合图纸确认。"
    },
    {
      question: "采样针为什么需要内壁抛光？",
      answer:
        "内壁抛光可降低液体残留和挂壁风险，有助于提升清洗效果和减少交叉污染，适合试剂、样本和低残留要求较高的液路。"
    },
    {
      question: "是否可以适配液位检测？",
      answer:
        "可以根据项目需求确认电容式液位检测适配方式，需要结合针体结构、线缆连接、安装方式和整机检测方案确认。"
    },
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
      question: "穿刺针和采样针有什么区别？",
      answer:
        "采样针更偏液体吸取和分配，穿刺针更强调穿透封膜、瓶塞或密闭耗材后的取液能力，通常需要确认针尖强度、穿刺角度和排气结构。"
    },
    {
      question: "穿刺针是否可以做排气结构？",
      answer:
        "可以。排气方向、排气槽、侧孔和液体通道需要根据耗材结构和取液动作确认，避免取液不稳定或产生气阻。"
    },
    {
      question: "穿刺针选型需要提供哪些资料？",
      answer:
        "建议提供耗材结构、封膜或瓶塞材料、穿刺深度、取液位置、针体运动方向、安装空间和目标液体类型。"
    },
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
      question: "清洗针主要解决什么问题？",
      answer:
        "清洗针主要用于针外壁清洗、针内壁冲洗、废液抽排和残液处理，目的是降低 carry-over、挂液和交叉污染风险。"
    },
    {
      question: "单头、双头和多头怎么选？",
      answer:
        "需要根据清洗站空间、清洗液入口数量、废液出口数量和清洗动作确认。多头结构适合同时完成冲洗和排废，但对空间和加工一致性要求更高。"
    },
    {
      question: "清洗针是否可以做侧孔？",
      answer:
        "可以。侧孔方向、数量、孔径和位置需要结合清洗液喷射方向、目标清洗区域和废液回收路径确认。"
    },
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
      question: "搅拌桨为什么需要按反应杯定制？",
      answer:
        "搅拌桨的叶片形状、直径、长度和安装端结构都与反应杯尺寸、液量和搅拌空间有关，不能只按单一标准型号选择。"
    },
    {
      question: "如何判断搅拌桨形状？",
      answer:
        "需要结合目标液量、杯底形状、转速范围、混匀时间和是否允许气泡或飞溅确认。平板、螺旋和角叶片适合不同混匀方式。"
    },
    {
      question: "是否可以做表面涂层？",
      answer:
        "可以。涂层主要用于降低挂液、改善清洗效果或满足特定介质要求，具体颜色和材料需根据项目确认。"
    },
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
  const faqs = faqMap[item.slug];

  if (!faqs) continue;

  const normalized = faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
    q: faq.question,
    a: faq.answer
  }));

  item.faq = normalized;
  item.faqs = normalized;
  item.faqItems = normalized;
  item.detailFaqs = normalized;

  console.log(`${item.slug}: FAQ 已写入 ${normalized.length} 条`);
}

fs.writeFileSync(file, JSON.stringify(details, null, 2) + "\n", "utf8");

try {
  const checked = JSON.parse(fs.readFileSync(file, "utf8"));

  console.log("");
  console.log("JSON 修复后可正常解析。");
  for (const slug of Object.keys(faqMap)) {
    const item = checked.find((x) => x.slug === slug);
    console.log(`${slug}: ${item?.faq?.length || 0} 条 FAQ`);
  }
} catch (error) {
  console.error("写入后 JSON 仍然解析失败：" + error.message);
  process.exit(1);
}