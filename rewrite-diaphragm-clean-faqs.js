const fs = require("fs");

const file = "data/products/generated/pumps/diaphragm-pumps/detail/index.json";

const commonLiquidFaqs = [
  {
    question: "隔膜泵适合用于哪些自动化仪器液路场景？",
    answer: "隔膜泵适用于自动化仪器中的清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景，可集成到 IVD、生命科学、实验室自动化和分析检测设备的液路模块中。"
  },
  {
    question: "有刷电机和无刷电机版本应该如何选择？",
    answer: "有刷电机版本适合对成本和基础输送功能更敏感的设备；无刷电机版本更适合长时间运行、维护频率低、寿命和稳定性要求更高的仪器平台。"
  },
  {
    question: "隔膜泵选型时主要关注哪些参数？",
    answer: "选型时建议重点关注泵类型、额定流量、额定压力、电机类型、膜片材质、阀片材质、泵头材质、接口方式和安装空间，并结合实际液体介质进行确认。"
  },
  {
    question: "隔膜泵能否用于废液抽排？",
    answer: "可以。隔膜泵具有一定自吸能力，适合用于仪器内部废液抽排、清洗液回收和低压力液体转移等场景。具体是否适用仍需结合废液成分和过液材料兼容性评估。"
  },
  {
    question: "如果标准型号不能完全满足设备需求怎么办？",
    answer: "如果标准型号在流量、压力、材料、接口方向或安装空间方面不能完全匹配，可点击“型号选择”进入隔膜泵选型页面，按具体参数进一步筛选，或提交需求由工程师协助确认。"
  }
];

const highPressureFaqs = [
  {
    question: "DPL30H 高压液体隔膜泵适合哪些场景？",
    answer: "DPL30H 适用于对输出压力要求更高的自动化仪器液路，例如清洗液输送、管路预充、试剂转移、废液抽排和较高压力液体输送场景。"
  },
  {
    question: "DPL30H 与 DPL30 的主要区别是什么？",
    answer: "DPL30H 的重点是提高耐压能力，额定压力可达 600 kPa；DPL30 更偏向常规液体输送场景，额定压力为 100 kPa。两者可根据压力需求、流量需求和设备空间进行选择。"
  },
  {
    question: "高压隔膜泵选型时需要注意什么？",
    answer: "高压隔膜泵选型时应重点确认额定压力、流量、电机类型、膜片材质、阀片材质、泵头材质和液体兼容性，同时需要结合设备管路阻力和实际工作压力进行评估。"
  },
  {
    question: "有刷和无刷 DPL30H 应该如何选择？",
    answer: "有刷版本适合对成本控制更敏感的设备；无刷版本适合连续运行时间更长、寿命要求更高、维护周期更长的自动化仪器液路。"
  },
  {
    question: "如果需要确认具体型号怎么办？",
    answer: "可点击“型号选择”进入隔膜泵选型页面，按泵类型、流量、耐压、电机类型、膜片材质、阀片材质和泵头材质进行筛选，并选择合适型号。"
  }
];

const gasLiquidFaqs = [
  {
    question: "气液混合隔膜泵适合哪些应用？",
    answer: "气液混合隔膜泵适用于气液混合介质抽排、废液抽吸、管路排空、负压抽吸和气液混合液路处理，可用于 IVD、实验室自动化、生命科学和分析检测设备中的废液处理模块。"
  },
  {
    question: "DPGL800 与普通液体隔膜泵有什么区别？",
    answer: "DPGL800 面向气液混合介质和废液抽吸场景，额定流量为 6 L/min，适合气液混合抽排和管路排空；普通液体隔膜泵更适合清洗液、试剂和常规液体输送。"
  },
  {
    question: "EP/PS 和 FF/PS 材质组合应该如何选择？",
    answer: "EP/PS 适合常规气液混合抽排和废液处理场景；FF/PS 更适合对材料兼容性要求更高的液路。具体选择应结合介质成分、工作环境和寿命要求确认。"
  },
  {
    question: "气液混合隔膜泵选型时需要关注哪些参数？",
    answer: "建议重点关注介质类型、流量、正压能力、负压能力、电机类型、膜片材质、阀片材质、泵头材质和安装空间，并结合设备液路结构进行确认。"
  },
  {
    question: "如果不确定选择哪个 DPGL800 型号怎么办？",
    answer: "可点击“型号选择”进入隔膜泵选型页面，按泵类型、流量、耐压、电机类型和材料组合进行筛选，也可以提交具体工况由工程师协助确认。"
  }
];

const faqBySlug = {
  "dpl30-24db-ep-ps-liquid-diaphragm-pump": commonLiquidFaqs,
  "dpl30-24bb-ep-ps-liquid-diaphragm-pump": commonLiquidFaqs,
  "dpl60-24db-ep-ps-liquid-diaphragm-pump": commonLiquidFaqs,
  "dpl60-24bb-ep-ps-liquid-diaphragm-pump": commonLiquidFaqs,
  "dpl30h-24ds-ep-ps-liquid-diaphragm-pump": highPressureFaqs,
  "dpl30h-24bs-ep-ps-liquid-diaphragm-pump": highPressureFaqs,
  "dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump": gasLiquidFaqs,
  "dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump": gasLiquidFaqs
};

const backup = `${file}.bak_rewrite_clean_faqs_${new Date()
  .toISOString()
  .replace(/[-:T.Z]/g, "")
  .slice(0, 14)}`;

fs.copyFileSync(file, backup);

const data = JSON.parse(fs.readFileSync(file, "utf8"));

let patched = 0;

for (const item of data) {
  const nextFaqs = faqBySlug[item.slug];

  if (!nextFaqs) continue;

  item.faqs = JSON.parse(JSON.stringify(nextFaqs));
  patched++;
}

fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");

console.log("patched:", patched);
console.log("backup:", backup);

data
  .filter((item) => faqBySlug[item.slug])
  .forEach((item) => {
    console.log(item.slug, "faq count:", item.faqs.length, "first:", item.faqs[0].question);
  });
