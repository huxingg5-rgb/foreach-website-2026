import type { ProductDetailPageData } from "./product-detail.types";
import { ea500DriveOptions } from "./ea-pump-selection-guide.zh";

/**
 * Chinese pilot for one existing EA configuration. Keep the source catalogue,
 * other capacities and all translated pages on their existing adapters.
 *
 * Evidence supplied for this change:
 * PS-120B-035 A46, pp. 3, 7-9, 23-27, 30;
 * PS-120B-152 A00, pp. 2-3;
 * UM-120B-003 A00, pp. 4, 8-13.
 */
export const EA_500_PMMA_SAMPLE_SLUG = "ea-500-pmma";
const [basicDrive, fineDrive] = ea500DriveOptions;

const introduction = [
  "EA-500-PMMA 是标称容量为 500 μL 的精密陶瓷柱塞泵，采用透明 PMMA（聚甲基丙烯酸甲酯）泵头，由步进电机驱动柱塞往复运动，用于分析仪器中的试剂加注、样本稀释和缓冲液分配。透明泵头便于观察充液与气泡状态。",
  "基础配置为 1.8° 步进电机、满量程 2000 步，名义分辨率为 0.25 μL/步；可选 0.9°、4000 步配置。实际加液量与准确性还需结合阀路、管路、背压及驱动程序验证。",
  "可按设备需求匹配接口、初始位置光耦、阀组件和驱动器。PMMA（聚甲基丙烯酸甲酯）不耐酒精及强酸，选型时应同时核对泵头、柱塞、密封和配套阀件与实际介质的兼容性。",
];

export const ea500PmmaSpecs: ProductDetailPageData["specs"] = [
  { label: "标称容量", value: "500 μL" },
  { label: "泵头材质", value: "PMMA（聚甲基丙烯酸甲酯，透明）" },
  { label: "柱塞 / 密封", value: "陶瓷 / UHMWPE（超高分子量聚乙烯）" },
  { label: "液路接口", value: "2 × 1/4-28 UNF 平底接口；M6 可选" },
  { label: "基础电机配置", value: `${basicDrive.angle}；满量程 ${basicDrive.fullSteps} 步` },
  { label: "基础分辨率", value: `${basicDrive.resolution} μL/步（500 μL ÷ ${basicDrive.fullSteps} 步）` },
  { label: "可选电机配置", value: `${fineDrive.angle}；满量程 ${fineDrive.fullSteps} 步；${fineDrive.resolution} μL/步` },
  { label: "丝杆导程", value: "1.27 mm" },
  { label: "100% 量程准确性 / 重复性", value: "≤0.5% / ≤0.5%" },
  { label: "2% 量程准确性 / 重复性", value: "≤2.0% / ≤1.5%（柱塞运动行程测试）" },
  { label: "背隙（回程差）", value: "≤1.0%；精确定量需设置回程差补偿" },
  { label: "流体压力", value: "<0.30 MPa；其他压力配置需另行匹配" },
  { label: "预计寿命", value: "500 万次（纯水、常温、50 kPa 背压条件）" },
  { label: "流体 / 工作环境温度", value: "15～40 ℃ / 5～40 ℃" },
  { label: "工作环境湿度", value: "30%～85% RH，无冷凝" },
];

export const ea500PmmaSpecNotes = [
  "分辨率是容量与满量程步数的比值，用于设置运动指令，不代表最小可靠加液量。500 μL 的 2% 为 10 μL；该行程位置的规格指标不能直接作为实际试剂在 10 μL 下的分配保证。",
  "以上为 EA 系列对应容量的规格及配置选项。实际供货的电机、接口、光耦与阀组件按确认配置执行；小液量性能应在实际介质、管路与节拍下测试。",
];

// Existing-page questions retained for quick decisions. Intent cross-check:
// Obsidian 产品GEO问题库/02_泵_问题意图与优先级: P01-04, P01-06, P01-07.
// These are planning intents, not measured demand or customer-test evidence.
const faqs: NonNullable<ProductDetailPageData["faqs"]> = [
  {
    question: "500 μL 容量和每步液量是否代表最小加液量？",
    answer: "500 μL 是标称容量。基础配置下 0.25 μL/步是容量除以 2000 步得到的名义分辨率；最小可靠加液量还受回程差、气泡、阀动作与管路变形影响，需要在目标液量下验证。",
  },
  {
    question: "准确性和重复性 ≤0.5% 适用于所有加液量吗？",
    answer: "这两项指标对应 100% 量程。2% 量程的准确性和重复性分别为 ≤2.0% 和 ≤1.5%，采用柱塞运动行程测试。评估实际试剂时，应使用相同液量、介质、背压与测量方法比较结果。",
  },
  {
    question: "可以匹配阀、光耦反馈和控制器吗？",
    answer: "EA 系列可选初始位置光耦、阀组件、闭环编码器和 ISC1000 集成驱动器。初始位置光耦用于找零，闭环反馈需选配编码器；RS-232、RS-485、CAN 属于配套驱动器的接口，应按实际供货配置接线与控制。",
  },
  {
    question: "EA 柱塞泵可以横向安装吗？",
    answer: "优先使流体出口朝上安装，便于排除气泡。在排气充分的前提下，可按设备空间选择其他安装方向，同时保证支架固定、接管余量与线束防护。",
  },
  {
    question: "什么时候需要重新初始化找零？",
    answer: "配置初始位置光耦时，建议每个测试周期结束后进行初始化，减少累积误差带入下一周期。首次调试或维护后，应先确认运动方向、光耦有效状态及触发后的停车余量；具体停止步数按对应机构与控制设置验证。",
  },
  {
    question: "如何提交定制与应用选型需求？",
    answer: "请提供目标单次液量及允许误差、吸排液完成时间、介质成分与浓度、工作温度和背压，并附安装空间、接口及控制要求。有液路图、现用型号或测试记录时可一并提交，便于匹配泵、阀和管路。",
  },
];

export function applyEa500PmmaSample<T extends ProductDetailPageData>(
  data: T,
  locale: string,
): T {
  if (locale !== "zh" || data.slug !== EA_500_PMMA_SAMPLE_SLUG) return data;
  return {
    ...data,
    advantages: introduction,
    description: introduction.join("\n\n"),
    commonApplications: ["试剂定量加注", "样本稀释", "缓冲液分配"],
    specs: ea500PmmaSpecs,
    faqs,
  };
}

export const ea500PmmaTroubleshooting = [
  ["出液延迟、第一针偏少", "检查泵腔和液路中的气泡、接头密封及阀切换时序，重新充液排气后比较实际收集量。"],
  ["小液量波动或换向后偏量", "核对回程差补偿、阀下游管路及目标液量对应的步数；按相同工况重复测量。"],
  ["电机振动、运行不连续", "核对供货电机、驱动电流、细分及加减速曲线，同时检查管路阻力与机械负载。"],
  ["接口渗漏或泵头出现裂纹", "停止运行并检查介质兼容性、平底密封件及接头扭矩；保留产品标签、现场照片与工况记录，联系售后。"],
] as const;
