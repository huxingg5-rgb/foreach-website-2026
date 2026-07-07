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

/*
  目标：
  1. 只优化阀系列详情页文案，不改页面样式
  2. specs 规格表保持现有规格书参数，不在这里改
  3. 文案从“泛泛介绍”改为 AI/SEO 更容易理解的长尾词结构
*/

const jsonPath = abs("data/products/generated/valves/detail/index.json");

if (!fs.existsSync(jsonPath)) {
  console.error("找不到阀系列详情 JSON：" + path.relative(root, jsonPath));
  process.exit(1);
}

backup(jsonPath, "seo_copy");

const details = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const copyBySlug = {
  "rotary-valves": {
    title: "MRV3 10/16/24通道陶瓷多通道旋转阀",
    modelName: "MRV3 10/16/24通道陶瓷多通道旋转阀",
    seoTitle: "MRV3陶瓷多通道旋转阀｜10/16/24通道流路切换阀｜恒永达 FOREACH",
    seoDescription:
      "MRV3陶瓷多通道旋转阀用于自动化分析仪器中的试剂选择、样本分配、清洗液切换和废液路径管理，支持10/16/24通道，耐压0.7MPa，内容积低至2.9μL。",
    description:
      "MRV3 10/16/24通道陶瓷多通道旋转阀面向自动化分析仪器中的多路径液路切换场景，可用于试剂选择、样本分配、清洗液切换和废液路径集中管理。该系列采用机械式流道切换结构，通过电机旋转与光耦定位实现端口切换，适合需要多端口、低内容积和稳定定位的液路模块。",
    commonApplications: [
      "IVD 分析仪中的多试剂选择阀",
      "样本针清洗液与废液路径切换",
      "多瓶试剂共用一条主液路的端口选择",
      "自动化分析仪器中的样本分配和试剂分配",
      "生命科学设备中的多通道缓冲液切换",
      "实验室自动化设备中的清洗液、稀释液和废液路径管理"
    ],
    advantages: [
      "适合多试剂、多清洗液和多废液路径集中切换，减少外部管路交叉",
      "10 / 16 / 24 通道规格覆盖不同端口数量需求，便于仪器平台化配置",
      "内容积低至 2.9μL，适合对残留、混液和死体积敏感的分析液路",
      "触液材质包含 PCTFE、氧化锆陶瓷和蓝宝石，适合多种试剂兼容性需求",
      "通电自动复位，配合光耦定位，便于整机控制系统识别初始位置",
      "阀头可更换，适合后期维护、不同通道数量替换和项目配置迭代"
    ],
    faq: [
      {
        question: "MRV3 陶瓷多通道旋转阀适合做什么液路任务？",
        answer:
          "MRV3 更适合做多路径选择和集中切换，例如多瓶试剂选择、样本分配、清洗液切换、废液路径切换和缓冲液切换。它不是单纯的开关阀，而是用于把多个端口集中到同一液路任务中的旋转切换阀。"
      },
      {
        question: "10通道、16通道和24通道应该怎么选？",
        answer:
          "一般根据仪器中需要切换的试剂瓶数量、清洗液数量、废液路径数量和预留端口数量决定。端口数量越多，越适合多试剂平台；端口数量较少时，结构更简单，也更利于控制系统管理。"
      },
      {
        question: "为什么 MRV3 页面按定制配置展示？",
        answer:
          "MRV3 涉及通道数量、通道直径、螺纹接口、触液材质、电机、驱动器、通讯方式和安装空间等配置，实际项目需要结合液路图和整机结构确认，不适合只按一个标准型号直接选择。"
      }
    ],
    searchKeywords: [
      "MRV3陶瓷多通道旋转阀",
      "多通道旋转阀",
      "试剂选择阀",
      "清洗液切换阀",
      "IVD流路切换阀",
      "10通道旋转阀",
      "16通道旋转阀",
      "24通道旋转阀"
    ]
  },

  "high-pressure-valves": {
    title: "HP 25MPa三位七通高压阀",
    modelName: "HP 25MPa三位七通高压阀",
    seoTitle: "HP三位七通高压阀｜25MPa高压流路切换阀｜恒永达 FOREACH",
    seoDescription:
      "HP三位七通高压阀用于HPLC自动进样、高压流路切换、进样位/抽样位/排气位控制和分析仪器高压液路模块，支持25MPa工作压力、10-32UNF接口和0.8μL内体积。",
    description:
      "HP 25MPa三位七通高压阀用于高压分析液路中的进样切换、抽样切换、排气控制和高压流路路径管理，适合 HPLC 自动进样模块、分析仪器高压液路模块和需要低内体积切换的高压流体系统。该产品重点解决高压场景中的密封可靠性、阀位切换稳定性、低内体积和接口一致性问题。",
    commonApplications: [
      "HPLC 自动进样模块中的进样位、抽样位和排气位切换",
      "分析仪器高压液路中的三位七通路径控制",
      "高压样品进样、样品旁路和系统排气液路",
      "高压泵后端流路切换和检测前端路径切换",
      "需要 10-32UNF 接口的高压微流路模块",
      "对内体积和滞留体积敏感的高压分析系统"
    ],
    advantages: [
      "25MPa 最大工作压力，适合高压分析液路和 HPLC 自动进样相关场景",
      "三位七通结构可覆盖进样、抽样、排气等多种液路状态切换",
      "0.4mm 通道直径和 0.8μL 内体积，适合低残留、低滞留体积液路",
      "10-32UNF 接口适配常见高压分析仪器液路连接方式",
      "SUS316L 定子与高分子转子组合，兼顾高压密封与液路切换需求",
      "相邻流道切换时间 100ms，适合自动化控制节拍明确的仪器模块"
    ],
    faq: [
      {
        question: "HP 三位七通高压阀主要用于什么设备？",
        answer:
          "该阀更适合 HPLC 自动进样、高压分析仪器、高压样品切换模块和需要进样位、抽样位、排气位切换的高压液路系统。"
      },
      {
        question: "高压阀选型时最需要确认哪些信息？",
        answer:
          "需要确认系统最大压力、流动相或样品介质、接口规格、切换位置数量、内体积要求、安装空间、电机控制方式和整机控制时序。"
      },
      {
        question: "为什么高压阀不直接按标准商品编码展示？",
        answer:
          "高压阀与客户系统压力、流路连接方式、安装空间和控制方式强相关。官网先按定制配置展示，避免客户只按单个型号选择而忽略压力、接口和液路状态要求。"
      }
    ],
    searchKeywords: [
      "HP三位七通高压阀",
      "25MPa高压阀",
      "HPLC自动进样阀",
      "高压流路切换阀",
      "10-32UNF高压阀",
      "三位七通阀",
      "高压进样阀"
    ]
  },

  "solenoid-valves": {
    title: "6010 2/3通摆臂隔膜电磁阀",
    modelName: "6010 2/3通摆臂隔膜电磁阀",
    seoTitle: "6010系列电磁阀｜2通/3通摆臂隔膜阀｜恒永达 FOREACH",
    seoDescription:
      "6010系列电磁阀用于IVD和自动化分析仪器中的试剂通断、清洗液控制、废液路径控制和阀组集成，支持2通/3通、NO/NC/万向、基板型、螺纹型和倒刺型配置。",
    description:
      "6010 2/3通摆臂隔膜电磁阀用于自动化分析仪器中的液路通断控制，可覆盖试剂路径开关、清洗液路径开关、废液路径控制和小型化阀组集成。该系列包含基板型、螺纹型和倒刺型结构，可根据整机空间、管路连接方式、膜片材质、电压和节能回路进行项目配置。",
    commonApplications: [
      "IVD 分析仪中的试剂路径通断控制",
      "清洗液、稀释液和废液路径开关",
      "样本针清洗模块中的进液和排液控制",
      "自动化分析仪器中的小型化阀组集成",
      "螺纹接头连接的独立液路开关模块",
      "软管连接场景中的倒刺型液路控制"
    ],
    advantages: [
      "2通 / 3通结构可选，适合常开、常闭和万向液路控制需求",
      "基板型适合阀组集成，螺纹型适合标准接头连接，倒刺型适合软管连接",
      "-75kPa~0.25MPa 压力范围覆盖常见试剂、清洗液和废液控制场景",
      "孔口直径 1.4mm、CV 0.03，适合小型自动化仪器液路通断控制",
      "EPDM / FKM / FFKM 膜片可选，便于根据试剂兼容性做项目确认",
      "可选节能回路，适合长时间保持状态的仪器液路控制场景"
    ],
    faq: [
      {
        question: "6010 电磁阀的基板型、螺纹型和倒刺型怎么选？",
        answer:
          "基板型适合多阀集中安装和阀组集成；螺纹型适合使用 M6 或 1/4-28UNF 接头的标准管路连接；倒刺型适合软管连接和空间较紧凑的低压液路。"
      },
      {
        question: "2通、3通、NO、NC、万向分别适合什么场景？",
        answer:
          "2通通常用于单一路径开关；3通可用于路径选择或切换；NO 常开适合默认导通的液路；NC 常闭适合默认关闭的液路；万向结构更适合需要灵活定义端口功能的液路方案。"
      },
      {
        question: "6010 电磁阀为什么要按定制配置确认？",
        answer:
          "6010 涉及结构形式、通口数、阀形式、膜片材质、底板材质、阀座材质、额定电压和节能回路等组合，客户需要结合介质、压力、响应时间、安装空间和控制方式确认最终配置。"
      }
    ],
    searchKeywords: [
      "6010电磁阀",
      "SV10电磁阀",
      "2通电磁阀",
      "3通电磁阀",
      "摆臂隔膜阀",
      "IVD电磁阀",
      "试剂通断阀",
      "基板型电磁阀",
      "螺纹型电磁阀",
      "倒刺型电磁阀"
    ]
  }
};

for (const item of details) {
  const copy = copyBySlug[item.slug];

  if (!copy) {
    continue;
  }

  /*
    只替换文案字段。
    specs 保持原样，不在这里改。
  */
  item.title = copy.title;
  item.modelName = copy.modelName;
  item.seoTitle = copy.seoTitle;
  item.seoDescription = copy.seoDescription;
  item.description = copy.description;
  item.commonApplications = copy.commonApplications;
  item.advantages = copy.advantages;
  item.faq = copy.faq;
  item.searchKeywords = copy.searchKeywords;
}

fs.writeFileSync(jsonPath, JSON.stringify(details, null, 2) + "\n", "utf8");
console.log("已优化阀系列详情页文案，规格表 specs 未改。");

/*
  让 generateMetadata 优先读取 seoTitle / seoDescription。
  不改页面布局，不改 ProductDetailClient。
*/

const pagePath = abs("app/products/valves/[slug]/page.tsx");

if (fs.existsSync(pagePath)) {
  backup(pagePath, "seo_metadata");

  let pageText = fs.readFileSync(pagePath, "utf8");

  if (!pageText.includes("seoTitle?: string")) {
    pageText = pageText.replace(
      /title:\s*string;/,
      `title: string;
  seoTitle?: string;
  seoDescription?: string;`
    );
  }

  pageText = pageText.replace(
    /title:\s*detail\.title\s*\+\s*"｜"\s*\+\s*detail\.productTypeName\s*\+\s*"｜恒永达 FOREACH",\s*description:\s*detail\.description,/,
    `title: detail.seoTitle || detail.title + "｜" + detail.productTypeName + "｜恒永达 FOREACH",
    description: detail.seoDescription || detail.description,`
  );

  fs.writeFileSync(pagePath, pageText, "utf8");
  console.log("已让阀系列详情页 metadata 优先读取 seoTitle / seoDescription。");
} else {
  console.log("未找到阀系列详情 page.tsx，跳过 metadata 修复。");
}

console.log("");
console.log("请测试：");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");