const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "data/products/generated/tubing/detail/index.json");

const base = [
  ["pvc-tubing", "PVC 管", "PVC", "聚氯乙烯（PVC）", "1.6mm~19.1mm", "-42℃~75℃", "55A / 65A 硬度，按目录规格选择", "倒刺接头、快插接头等软管连接件"],
  ["tpu-tubing", "TPU 管", "TPU", "热塑性聚氨酯（TPU）", "3.7mm~7.0mm", "-30℃~70℃", "85A / 95A 硬度，按目录规格选择", "倒刺接头、快插接头等软管连接件"],
  ["fep-tubing", "FEP 管", "FEP", "氟化乙烯丙烯共聚物（FEP）", "0.3mm~2.0mm", "-230℃~200℃", "50A / 60A 硬度，按目录规格选择", "平底接头、卡箍接头、卡环接头等硬管连接件"],
  ["ptfe-tubing", "PTFE 管", "PTFE", "聚四氟乙烯（PTFE）", "1.5mm~2.0mm", "-200℃~260℃", "可选本色、黑色和透明颜色，按目录规格选择", "平底接头、卡箍接头、卡环接头等硬管连接件"],
  ["peek-tubing", "PEEK 管", "PEEK", "聚醚醚酮（PEEK）", "0.2mm~0.8mm", "-180℃~225℃", "90A / 95A 硬度，按目录规格选择", "高压接头、平底接头、卡箍接头、卡环接头等硬管连接件"],
  ["pfa-tubing", "PFA 管", "PFA", "全氟烷氧基树脂（PFA）", "0.5mm~1.0mm", "-230℃~200℃", "本色，按目录规格选择", "平底接头、卡箍接头、卡环接头等硬管连接件"]
];

const details = base.map(([slug, title, material, fullName, idRange, temp, extra, connection]) => {
  const faqs = [
    {
      question: `${title}适合哪些液路？`,
      answer: `${title}适用于设备内部流体连接，具体需结合液体介质、目标流量、管径、温度和压力范围确认。`
    },
    {
      question: `${title}内径如何确认？`,
      answer: "内径需要结合目标流量、管路长度、泵阀接口和允许压降确认。内径过小会增加流体阻力，内径过大则可能增加死体积。"
    },
    {
      question: `${title}可以搭配哪些接头？`,
      answer: `${title}可搭配${connection}，具体需要根据管径、端口结构、密封方式和工作压力确认。`
    },
    {
      question: `${title}是否需要评估流阻和压降？`,
      answer: "如果管路较长、内径较小、接头数量较多或目标流量较高，建议评估管路流阻、压降和泵阀匹配情况。"
    },
    {
      question: `${title}选型前需要提供哪些信息？`,
      answer: "建议提供介质、目标流量、内径/外径、管路长度、接头数量、弯折情况、工作温度和压力范围。"
    }
  ];

  return {
    slug,
    title,
    name: title,
    model: title,
    h1Title: title,
    pageTitle: title,
    displayModel: "按材质与尺寸选型",
    productCategory: "tubing",
    productType: "tubing",
    productTypeLabel: "管路系列",
    category: "tubing",
    detailMode: "material_selection",
    image: "/images/products/common/product-placeholder.svg",
    additionalImages: [],
    images: [],
    thumbnails: [],
    description: `${title}采用${fullName}材质，内径范围覆盖 ${idRange}，工作温度范围为 ${temp}。可按项目需求提供 RoHS 等材料合规资料，具体文件随材质与项目要求确认。`,
    shortDescription: `${fullName}，内径范围 ${idRange}，工作温度 ${temp}。`,
    commonApplications: ["试剂输送", "样本路径", "设备内部管路", "泵阀连接", "流体系统集成"],
    features: ["按材质与尺寸选型", "适用于设备内部液路连接", "可结合接头、泵阀和压力范围确认", "支持工程师协助评估流阻与压降"],
    specsTitle: "规格",
    specTitle: "规格",
    specificationTitle: "规格",
    specs: [
      { label: "材料", value: material },
      { label: "材料全称", value: fullName },
      { label: "内径范围", value: idRange },
      { label: "工作温度", value: temp },
      { label: "规格补充", value: extra },
      { label: "适配连接方式", value: connection },
      { label: "材料合规资料", value: "可提供 RoHS 等材料合规资料，具体文件随材质与项目要求确认" }
    ],
    faq: faqs,
    faqs,
    faqItems: faqs,
    detailFaqs: faqs,
    bottomCtaTitle: "需要评估管路流阻与泵阀匹配？",
    bottomCtaDesc: "请提供液体介质、目标流量、管材、内径/外径、管路长度、接头数量、弯折情况、工作温度和压力范围。FOREACH 工程师可协助估算管路压降、流体阻力和死体积，并确认管材、接头与泵阀配置是否匹配。",
    bottomCtaButton: "联系工程师",
    bottomCtaHref: "/contact"
  };
});

fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, JSON.stringify(details, null, 2) + "\n", "utf8");

console.log("已写入：" + path.relative(root, file));
console.log("管路详情 JSON 已补齐，共 " + details.length + " 条。");