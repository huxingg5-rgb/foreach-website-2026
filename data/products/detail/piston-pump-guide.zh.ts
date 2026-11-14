import type { ProductDetailPageData } from "./product-detail.types";

/** Source-backed Chinese detail overlay; generated catalogues remain untouched.
 * EA: PS-120B-035 A46 pp.7–9,16–30; PS-120B-152 A00 pp.2–3; UM-120B-003 A00.
 * SM: PS-120B-013 001 pp.8–15. SM50: PS-120B-030 001 pp.2–7.
 * TM: PS-120B-147/148/149/150 001 (one page each).
 * Optional integrated SMVD: UM-120B-00011 001. Never apply its electronics to a bare pump.
 */
export type PistonSeries = "EA" | "SM" | "TM";
export type PistonHead = "PMMA" | "PEEK";
export type PistonDrive = { id: string; label: string; fullSteps: number; resolution: number };
export type PistonPumpGuide = {
  slug: string;
  model: string;
  series: PistonSeries;
  capacity: number;
  material: PistonHead;
  headName: string;
  drives: PistonDrive[];
  capacityAdvice: string;
  ports: string;
  mounting: string;
  fluidTemperature: string;
  ambientTemperature: string;
  life: string;
  backlash: string;
  integration: string;
  materialAdvice: string;
};

const capacities: Record<PistonSeries, readonly number[]> = {
  EA: [100, 250, 500, 1000, 2500, 5000, 10000],
  SM: [50, 100, 250, 500, 1000],
  TM: [50, 100, 250, 500],
};
const capacityAdvice: Record<number, string> = {
  50: "优先比较小液量工作点的重复性。50 μL 的单次储液量有限，连续加样时需把补液、换阀与排气时间计入节拍；管路残留体积也应一并核对。",
  100: "适合将小液量分配与较短补液周期一起评估。先确定目标液量与每轮分配次数，再比较 50、100、250 μL 配置，避免只按最大容量选泵。",
  250: "可在单次储液量和名义步进增量之间比较。与 100、500 μL 容量对照时，使用相同目标液量、介质和背压测试，并计算补液占用的时间。",
  500: "结合单次液量、连续分配次数和设备节拍安排一次吸液后的分配与补液周期；目标液量较小时，还要比较更小容量在该工作点的表现。",
  1000: "1 mL 容量可用于比较多次分配或较大单次加注。选择前先算出每轮总用液量，并预留排气与换阀过程占用的液量，再验证小液量分配的波动。",
  2500: "2.5 mL 配置的基础满行程为 2236 步，不能套用 2000 步换算。需同时比较每轮储液量、单次分配增量及补液节拍。",
  5000: "5 mL 容量优先按较大单次用液量或一轮多次分配任务评估。基础配置每整步对应 2.5 μL；若目标液量较小，应同时比较较小容量，不能只增加细分便视为达到实测精度。",
  10000: "10 mL 配置以 1.8°、4000 步满行程换算，每整步对应 2.5 μL。储液量增加同时伴随行程变化，安装长度和完成一次吸排液的时间都应重新核对。",
};

export function formatPumpNumber(value: number) {
  return Number(value.toFixed(6)).toString();
}

function buildGuide(series: PistonSeries, capacity: number, material: PistonHead): PistonPumpGuide {
  const sm50 = series === "SM" && capacity === 50;
  const steps = series === "EA"
    ? (capacity === 10000 ? [4000] : capacity === 2500 ? [2236, 4472] : [2000, 4000])
    : series === "TM" ? [2540] : sm50 ? [2000] : [2000, 2400, 4000];
  const headName = material === "PMMA" ? "PMMA（聚甲基丙烯酸甲酯）" : "PEEK（聚醚醚酮）";
  const model = `${series}-${capacity}-${material}`;
  return {
    slug: model.toLowerCase(), model, series, capacity, material, headName,
    drives: steps.map((fullSteps, i) => ({
      id: `${fullSteps}`, fullSteps, resolution: capacity / fullSteps,
      label: series === "EA" ? (i === 0 ? "1.8°" : "0.9°") : series === "TM" ? "1.8°" : `${fullSteps} 步配置`,
    })),
    capacityAdvice: series === "EA" && capacity === 100
      ? "先确定目标液量与每轮分配次数，再比较 100、250、500 μL 配置。小液量分配还需核对补液周期与目标工作点的重复性，避免只按最大容量选泵。"
      : capacityAdvice[capacity],
    ports: series === "TM" ? "6-40 UNF 接口" : sm50 ? "M6 平底接口" : "2 × 1/4-28 UNF 平底接口；M6 可选",
    mounting: series === "EA" ? "2 × M3；常规孔距 31.8 mm，宽支架 42.8 mm" : series === "SM" ? (sm50 ? "4 × M3；孔距 15 × 35 mm，螺孔深度 4 mm" : "4 × M3；孔距 15 × 35 mm") : "2 × M3；孔距 15 mm，螺孔深度 3.5 mm",
    fluidTemperature: sm50 ? "15～30 ℃" : "15～40 ℃",
    ambientTemperature: series === "SM" ? "10～40 ℃" : "5～40 ℃",
    life: series === "TM" ? "300 万次" : "500 万次（纯水、常温、50 kPa 背压条件）",
    backlash: series === "EA" ? "≤1.0%" : series === "SM" ? "<1.0%" : "<2.0%",
    integration: series === "EA"
      ? "EA 裸泵需配套步进驱动器。阀组件、ISC1000 驱动器与编码器分别选配；EAV、EAD、EAVD 的集成形式应按实际液路和控制接口另行确认。"
      : series === "SM"
        ? "SM 裸泵需配套步进驱动器。需要集成阀与通信控制时，可进一步确认 SMVD；RS-232、RS-485、CAN 属于对应驱动配置，不能直接接到裸泵电机线上。"
        : "TM 配套两相步进驱动器，并将光耦接入控制板检测初始位置。阀路和控制器按整机另行配置，电机与光耦线束不是串行通信接口。",
    materialAdvice: material === "PMMA"
      ? "透明泵头便于观察充液与气泡。PMMA（聚甲基丙烯酸甲酯）不耐酒精及强酸，工作液和清洗液都需满足材料限制。"
      : "非透光泵头需通过管路、排液与运行状态确认排气。PEEK（聚醚醚酮）应按介质成分、浓度和温度核对兼容性，同时检查柱塞、密封与阀件，不能由泵头材料推定整条液路的耐腐蚀性。",
  };
}

export const pistonPumpGuides: readonly PistonPumpGuide[] = (Object.keys(capacities) as PistonSeries[]).flatMap(series =>
  capacities[series].flatMap(capacity => {
    const heads: PistonHead[] = series === "EA" || (series === "SM" && [100, 250].includes(capacity)) ? ["PMMA", "PEEK"] : ["PMMA"];
    return heads.map(material => buildGuide(series, capacity, material));
  }),
);

export function getPistonPumpGuide(slug: string): PistonPumpGuide | undefined {
  return pistonPumpGuides.find(guide => guide.slug === slug);
}

export function getPistonPumpSpecNotes(guide: PistonPumpGuide): string[] {
  const lowVolume = formatPumpNumber(guide.capacity * 0.02);
  return [
    `名义分辨率由容量除以满行程步数得到，不代表最小可靠加液量。${guide.capacity} μL 的 2% 为 ${lowVolume} μL；实际试剂在该目标液量下的结果需结合阀路、管路、背压与驱动设置验证。`,
    guide.series === "EA"
      ? "低量程指标采用柱塞运动行程测试。电机、光耦、阀与驱动器按所选配置匹配，不能由容量或泵头材料推定全部电气配置。"
      : "低量程重复性对应已补偿回程差的条件。接线、接口和安装孔位按当前供货版本匹配，不跨系列套用。",
  ];
}

export function getPistonPumpSpecs(guide: PistonPumpGuide): ProductDetailPageData["specs"] {
  const { series, capacity, headName, drives } = guide;
  const basic = drives[0];
  const specs: ProductDetailPageData["specs"] = [
    { label: "标称容量", value: `${capacity} μL` },
    { label: "泵头材质", value: `${headName}；${guide.material === "PMMA" ? "透明" : "非透光"}` },
    { label: series === "TM" ? "柱塞材质" : "柱塞 / 密封", value: series === "TM" ? "陶瓷" : "陶瓷 / UHMWPE（超高分子量聚乙烯）" },
    { label: "液路接口", value: guide.ports },
    { label: "基础电机配置", value: `1.8°；满量程 ${basic.fullSteps} 步` },
    { label: "名义分辨率", value: `${formatPumpNumber(basic.resolution)} μL/步（${capacity} μL ÷ ${basic.fullSteps} 步）` },
  ];
  if (drives.length > 1) specs.push({ label: "其他行程配置", value: drives.slice(1).map(drive => `${drive.label}；满行程 ${drive.fullSteps} 步；${formatPumpNumber(drive.resolution)} μL/步`).join(" / ") });
  if (series === "EA") specs.push({ label: "丝杆导程", value: "1.27 mm" });
  if (series === "SM" && capacity !== 50) specs.push({ label: "工作行程", value: "12.7 mm" });
  specs.push(
    { label: "安装连接", value: guide.mounting },
    { label: "100% 量程准确性 / 重复性", value: series === "TM" ? "<0.5% / <0.5%" : series === "EA" ? "≤0.5% / ≤0.5%" : "0.5% / 0.5%" },
    series === "EA" ? { label: "2% 量程准确性 / 重复性", value: "≤2.0% / ≤1.5%（柱塞运动行程测试）" } : { label: "2% 量程重复性", value: `${series === "TM" ? "<" : ""}1.5%（已补偿回程差）` },
    { label: "背隙（回程差）", value: `${guide.backlash}；精确定量需验证补偿` },
    { label: "流体压力", value: "<0.30 MPa" },
    { label: "预计寿命", value: guide.life },
    { label: "流体 / 工作环境温度", value: `${guide.fluidTemperature} / ${guide.ambientTemperature}` },
    { label: "工作环境湿度", value: "30%～85% RH，无冷凝" },
  );
  if (series === "TM") specs.push({ label: "整泵重量", value: "96 g" });
  return specs;
}

export function applyPistonPumpGuide<T extends ProductDetailPageData>(data: T, guide: PistonPumpGuide): T {
  const basic = guide.drives[0];
  const introduction = [
    `${guide.model} 是标称容量为 ${guide.capacity} μL 的${guide.series === "TM" ? "超微型" : guide.series === "SM" ? "微型" : "精密"}陶瓷柱塞泵，采用 ${guide.headName} 泵头，由步进电机驱动柱塞完成液体吸取与分配。${guide.materialAdvice}`,
    `基础满行程为 ${basic.fullSteps} 步，名义每步液量为 ${formatPumpNumber(basic.resolution)} μL。${guide.capacityAdvice}`,
    `${guide.ports}。${guide.integration}`,
  ];
  const faqs: NonNullable<ProductDetailPageData["faqs"]> = [
    { question: `${guide.capacity} μL 容量和每步液量是否代表最小加液量？`, answer: `标称容量为 ${guide.capacity} μL；基础满行程 ${basic.fullSteps} 步，对应 ${formatPumpNumber(basic.resolution)} μL/步。该比值用于运动指令换算，最小可靠加液量还需在目标液量下验证气泡、回程差、阀动作及管路弹性的影响。` },
    { question: "满量程指标适用于所有加液量吗？", answer: guide.series === "EA" ? `100% 量程准确性与重复性均为 ≤0.5%；2% 量程（${formatPumpNumber(guide.capacity * 0.02)} μL）分别为 ≤2.0% 与 ≤1.5%，采用柱塞运动行程测试。实际试剂分配需按相同工况单独验证。` : `100% 量程准确性与重复性为 ${guide.series === "TM" ? "<0.5%" : "0.5%"}；2% 量程（${formatPumpNumber(guide.capacity * 0.02)} μL）重复性为 ${guide.series === "TM" ? "<1.5%" : "1.5%"}，对应已补偿回程差的条件，不能作为所有加液量的准确性保证。` },
    { question: `当前 ${guide.headName} 泵头如何选择清洗液？`, answer: guide.materialAdvice + " 更换清洗剂或浓度后，应重新验证材料相容性与密封状态。" },
    { question: `${guide.series} 的接口和安装方式是什么？`, answer: `${guide.ports}。安装连接为 ${guide.mounting}。匹配接头时需同时核对螺纹、孔深、管外径与密封结构，并给接管及线束留出空间。` },
    { question: "是否自带阀和通信控制？", answer: guide.integration },
    { question: "首次使用应先检查什么？", answer: `先断电核对当前 ${guide.model} 的接线与机械固定，再确认光耦状态、运动方向和停车余量。使用相容介质充液排气，验证换阀与回程差补偿后，在目标液量下重复收集；流体温度保持在 ${guide.fluidTemperature}。` },
  ];
  return { ...data, advantages: introduction, description: introduction.join("\n\n"), specs: getPistonPumpSpecs(guide), faqs };
}
