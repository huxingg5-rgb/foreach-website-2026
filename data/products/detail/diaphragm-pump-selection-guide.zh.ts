import type { DiaphragmPumpGuide } from "./diaphragm-pump-guide";
import { getDiaphragmPumpMainPhoto, getDiaphragmPumpReferenceModel } from "./diaphragm-pump-reference-models";

type Row = readonly [string, string];
type DecisionRow = readonly [string, string, string];

/** Chinese selection/use copy. Sources reviewed 2026-11-13:
 * FOREACH DPL30 CN A04 / EN A03, DPL60 CN A02 / EN A00, DPL30H CN A00,
 * DPGL800 CN A00 and EN PS-150B-2608-00005 A00, pp.3–6.
 * The current DPGL800 EN edition adds the 100%-liquid exclusion and optional PWM/FG;
 * its FG multiplier is 10, while the documented DPL30H five-wire version uses 20.
 * Generic polymer screening only: Parker TSD-5440 pp. Recommended Polymer Families
 * and https://discover.parker.com/ultra-ffkm-orings. No resin brand or grade is inferred.
 */
export const diaphragmSelectionFamilies = {
  DPL30: { temperature: "+5～+80 ℃", voltage: "DC 12 V 或 24 V（±10%，按标签选择）", power: "≤8 W", port: "内径 3.2 mm 软管／倒刺口", curve: "/images/resources/technical-articles/dpl30-liquid-diaphragm-pump/dpl30-flow-pressure.jpg", priority: "紧凑液路中的自吸、预充与一般输送", scenario: "清洗液补充、试剂转移、小流量循环与辅助排液", dimensions: "/images/resources/technical-articles/dpl30-liquid-diaphragm-pump/dpl30-brushless-dimensions.webp" },
  DPL60: { temperature: "+5～+80 ℃", voltage: "DC 12 V 或 24 V（±10%，按标签选择）", power: "≤8.4 W", port: "内径 3.2 mm 软管／倒刺口", curve: "/images/products/pumps/diaphragm-pumps/dpl60/curves/dpl60-liquid-diaphragm-pump-flow-pressure-curve.webp", priority: "先比较任务用液量与可用输送时间", scenario: "较大用液量的清洗、管路置换、补液与循环", dimensions: "/images/resources/technical-articles/dpl60-liquid-diaphragm-pump/dpl60-brushless-dimensions.webp" },
  DPL30H: { temperature: "+5～+40 ℃", voltage: "DC 12 V 或 24 V（±10%，按标签选择）", power: "≤7 W", port: "卡套接头／6×4 mm（外径×内径）硬管", curve: "/images/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump/dpl30h-flow-pressure-curve.webp", priority: "先核对目标背压处的工作流量", scenario: "过滤器、细径管路与阀组后的供液、冲洗和循环", dimensions: "/images/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump/dpl30h-brushless-dimensions.webp" },
  DPGL800: { temperature: "+5～+40 ℃", voltage: "DC 24 V ±10%", power: "≤17 W", port: "G1/8 内螺纹", curve: "/images/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump/dpgl800-gas-flow-pressure-curve.webp", priority: "先定义介质状态、目标真空与抽吸节拍", scenario: "气体、含气废液与气液混合介质的抽吸、负压建立和排空", dimensions: "" },
} as const;

export const diaphragmFamilyDecisions: readonly DecisionRow[] = [
  ["一般液体转移，重视吸程与重新引液", "DPL30：300 mL/min；100 kPa；6 mH₂O", "同时记录液位最低时的吸程和首次出液时间；6 mH₂O 自吸指标不是任意流量下的吸入高度。"],
  ["清洗或置换的用液量较大", "DPL60：600 mL/min；100 kPa；3 mH₂O", "比较真实管路中的供液量与时间。600 mL/min 是空载参考值，吸程也与 DPL30 不同。"],
  ["过滤器、细管或阀组造成较高背压", "DPL30H：300 mL/min；600 kPa；3 mH₂O", "核对该背压下的曲线流量、6×4 mm 硬管连接和 +40 ℃ 介质温度边界。"],
  ["需要建立真空或抽吸气液混合物", "DPGL800：单头空载气体流量 6 L/min", "同时确定目标真空、系统容积和达到目标的时间；不适用于 100% 纯液体泵送。"],
];

export const diaphragmMaterialDecisions: readonly DecisionRow[] = [
  ["EP/PS", "EPDM（三元乙丙橡胶）膜片＋EPDM 阀片＋PPS（聚苯硫醚）泵头", "纯化水及已确认相容的水性介质可从此组合开始评估。含矿物油、燃料等烃类成分时，EPDM 不宜作为默认候选；清洗液也要纳入筛选。"],
  ["FF/PS", "PTFE（聚四氟乙烯）膜片＋FFKM（全氟醚橡胶）阀片＋PPS 泵头", "在 EPDM 不满足介质要求，或项目需要比较另一套接液方案时进入候选。PTFE 与 FFKM 的化学耐受范围较广，但 PPS 泵头仍参与接液，具体配方和动态运行仍需验证。"],
];

export const diaphragmMaterialRoles: readonly Row[] = [
  ["膜片：既接液，也持续变形", "膜片往复运动改变泵腔容积。材料变化可能改变动态响应；浸泡后没有明显腐蚀，只能说明部分材料状态，不能代替连续往复、带压和启停测试。"],
  ["阀片：影响吸入、排出与密封", "阀片启闭将往复容积变化转成单向输送。溶胀、变硬、结晶或颗粒附着，可能先表现为自吸变慢、流量下降和停机回流；不能只看膜片是否完好。"],
  ["泵头：两套组合都采用 PPS", "切换为 PTFE 膜片与 FFKM 阀片，并未把整台泵改成全 PTFE 接液结构。泵腔、接头、管路及其余接液密封件要按完整配方一起筛选。"],
];

export const diaphragmMaterialValidation: readonly DecisionRow[] = [
  ["工作液与清洗液", "名称、各成分浓度、温度、接触时长，以及是否会混成废液", "避免只给出“水性”“酸性”或“酒精清洗”等宽泛描述。"],
  ["动态运行", "实际吸程、背压、启停频率与连续运行时段", "观察首次出液、稳定流量、密封和停机后的恢复；不只做静态浸泡。"],
  ["运行前后对照", "材料尺寸、软硬状态、表面、流量与泄漏的变化", "在相同工况下复测，区分介质影响、沉积堵塞与正常使用磨损。"],
];

export function getDiaphragmSelectionGuideZh(guide: DiaphragmPumpGuide) {
  const facts = diaphragmSelectionFamilies[guide.series];
  const reference = getDiaphragmPumpReferenceModel(guide.slug);
  const currentPhoto = reference ? getDiaphragmPumpMainPhoto(reference.copyKey) : undefined;
  const brushless = guide.motor === "brushless";
  const motorName = guide.motor === "series" ? "有刷／无刷" : brushless ? "无刷" : "有刷";
  const featureMotor: Row = guide.gasLiquid
    ? ["供电、调速与反馈分别确定", "采用 24 V 无刷配置。标准供电与选配 PWM、FG 分别确认；FG 用于观察电机转速，抽吸是否到位仍由真空、流量或液位等实际过程信号判断。"]
    : guide.motor === "series"
      ? ["按运行周期选择电机", "有刷与无刷分别比较 3,000 h、10,000 h 的连续运行参考条件，再按每日运行时间、启停频率与维护计划确认配置。"]
      : brushless
        ? [guide.series === "DPL30" ? "两线无刷便于启停集成" : "无刷配置适配运行与控制需求", guide.series === "DPL30" ? "当前 DPL30-BB 以两线供电接入设备启停。需要独立调速或反馈时，另选相应线束与驱动配置；增加信号线不会自动得到流量闭环。" : "无刷电机采用电子换向，减少机械电刷磨损这一维护因素。需要多阶段泵速或转速反馈时，可进一步比较相应的调速配置。"]
        : ["有刷配置配合明确工作周期", "通过电源启停接入清洗、补液或排液流程。将电刷磨损、每日运行时长与维护周期一起考虑；电刷位于驱动部分，不应描述为直接污染输送液体。"];

  const features: Row[] = guide.gasLiquid ? [
    ["面向气体与气液混合抽吸", "用于含气废液、负压建立与排空任务，不适用于 100% 纯液体泵送。先描述实际介质状态，再决定是否采用气液泵。"],
    ["单头 6 L/min 用于气体初筛", "空载气体流量帮助比较抽气能力。废液速度、气液交替表现及两泵头的系统连接需另外验证，不能将该数值直接当作液体流量。"],
    ["目标真空与建压时间一起看", "最大负压为＜−90 kPa，但设备通常要求在给定时间内达到某个目标。腔体容积、泄漏与抽吸负载共同决定能否满足节拍。"],
    ["出口排放影响入口抽吸", "最大正压 30 kPa 是另一项边界。排出管、过滤器和废液容器状态应与入口侧一起检查，避免出口受阻影响抽吸。"],
    featureMotor,
    ["接液材料覆盖整个抽吸路径", "泵头、膜片与阀片都可能接触废液或冷凝液。混合废液、清洗液及留存在泵内的介质均应纳入材料和维护评估。"],
  ] : [
    ["自吸与重新引液", `${guide.suction} 自吸高度可作为入口条件的初筛依据。开机、换瓶或吸入空气后，仍需测量首次出液时间和稳定供液时间，才能安排设备节拍。`],
    ["隔膜输送，接液腔与驱动分开", "电机带动膜片往复，进出口单向阀组织液体方向。膜片将接液腔与驱动部分分开，适合仪器内的输送与清洗任务；运行液量仍取决于液路条件。"],
    [guide.series === "DPL60" ? "600 mL/min 级任务用液量" : "300 mL/min 级液体输送", guide.series === "DPL60" ? "用于较大清洗量、管路置换和循环需求。先用任务液量与可用时间算所需流量，再检查装入阀和过滤器后的可用工作流量。" : guide.highPressure ? "空载流量与 DPL30 同为 300 mL/min，选择重点在高背压处能保留多少流量，而不是将其当作更大流量版本。" : "适合紧凑设备中的补液、清洗和一般转移。连续输送量与单次精确定量是不同要求，不能把时间控制直接视为已达到加样精度。"],
    [guide.highPressure ? "面向较高阻力液路" : "压力、自吸与流量共同匹配", guide.highPressure ? "600 kPa 额定压力用于高背压候选筛选。过滤器、硬管、阀和腔体的允许压力分别检查，整条液路不能只按泵的压力数字判断。" : `${guide.pressure} 额定压力与空载流量分开使用。入口负压、出口背压、管路缩径及介质黏度变化，都会改变安装后的输送表现。`],
    featureMotor,
    ["膜片、阀片与泵头成套选择", "EPDM／EPDM／PPS 与 PTFE／FFKM／PPS 两套组合分别筛选。选择依据是完整介质与清洗条件，而不是只比较某一种材料的名称。"],
  ];

  const priming: readonly Row[] = guide.gasLiquid ? [
    ["空腔建压与带负载抽吸分开测", "先在已知容积和密封状态下记录压力—时间，再接入真实抽吸通道；这样能区分系统漏气与实际抽吸负载造成的差异。"],
    ["废液瓶的气密与液位一起管理", "若系统利用密闭废液瓶建立负压，瓶盖、接头和切换阀的漏气会持续消耗抽气能力。液位与泡沫状态也应进入控制与维护流程。"],
    ["测试介质状态和排放路径", "记录气液比例、清洗后残留和出口背压。不使用 6 L/min 气体值估算纯液体输送，也不把两泵头直接换算成双倍液体能力。"],
  ] : [
    ["先排完入口空气，才进入有效供液", "首次启动会先处理管内空气；吸管越长、内径越大，待排空的容积也可能越大。接近空载流量不代表泵一启动便已有同样的液体输出。"],
    ["分别检查漏气、通气与吸入阻力", "吸入接头漏气会破坏引液，储液瓶补气不足会使流量逐渐下降，细长管和堵塞过滤器会增加吸入负担。这三种问题不能只靠增加泵速处理。"],
    ["把最低液位和重启纳入节拍", `以储液瓶最低液位、最长吸管及实际液体复测。当前 ${guide.series} 的自吸参考为 ${guide.suction}；达到该高度并不代表仍保持空载流量，也不能当作无限干运转许可。`],
  ];

  const connection: readonly Row[] = guide.gasLiquid ? [
    ["螺纹和密封", "G1/8 内螺纹要匹配对应接头与密封结构，同时看有效通径、插入深度和管路走向；仅确认螺纹名称还不足以判断气密和流阻。"],
    ["泵头与接口方向", "按完整型号确认端口朝向和两泵头连接；预留接头拆装及线束空间。接口方向与实际接线、泵头布置分别核对。"],
    ["抽吸管路", "入口侧首先控制漏气与堵塞，出口侧保持约定的排放条件；废液瓶、阀件和过滤器应作为同一抽吸系统检查。"],
  ] : guide.highPressure ? [
    ["管径与接头成套", "使用配套卡套接头连接 6×4 mm（外径×内径）硬管，核对管外径公差、端面、插入和锁紧要求；不套用柱塞泵的平底接口装配或扭矩。"],
    ["整条液路承压", "管路、接头、阀、过滤器及腔体的允许压力分别确认。特别检查滤芯接近维护状态、末端阀关闭和启停时的压力变化，并设置适合整机的压力限制。"],
    ["温度和维护空间", `当前介质温度为 ${facts.temperature}，不能沿用 DPL30／DPL60 的 +80 ℃ 上限。给硬管和接头留出装配空间，避免管路载荷直接作用于泵头。`],
  ] : [
    ["按软管内径匹配倒刺", "标准倒刺口可接内径 3.2 mm 软管。软管外径相同不代表内径相同；同时确认材料、壁厚、硬度及固定方式，并避免局部折扁和接头缩径。"],
    ["区分吸入与排出管路", "吸入侧关注气密、吸程和过滤器阻力，排出侧关注背压与末端节流。接管时识别进出口方向，不以反接电源或改变电机转向代替更换流路。"],
    ["安装尺寸与 A/B 电机", "DPL30／DPL60 的无刷 A/B 等效电机存在机械尺寸差异。确定供货版本后再固定孔位与外壳空间，管线保留余量，减少振动向机架传递。"],
  ];

  const startup: readonly Row[] = [
    ["确定型号、介质与供电", `核对 ${guide.model} 的电机、线束和材料组合。供电为 ${facts.voltage}，介质温度 ${facts.temperature}；12 V 与 24 V 是不同配置，不是同一泵自动切换。`.replace("；12 V 与 24 V 是不同配置，不是同一泵自动切换。", guide.gasLiquid ? "；编码中出现其他电压，不等于已有对应标准产品。" : "；12 V 与 24 V 是不同配置，不是同一泵自动切换。")],
    ["固定泵体，安排管线", "断电并解除系统压力后安装。按本供货版本图纸定位，给接口、线束和维护操作留空间，避免用硬拉管路的方式对齐安装孔。"],
    [guide.gasLiquid ? "建立密封抽吸路径" : "安排入口供液条件", guide.gasLiquid ? "连接入口、腔体或废液瓶及排放端，先检查瓶盖、接头和阀的气密。液位、泡沫或过滤件的状态应可检查，避免异常介质状态持续进入抽吸路径。" : "确认储液瓶能适当补气、入口液位和吸管走向。先消除折扁、漏气和非必要缩径，再按实际安装位置建立吸程。"],
    ["按接口形式完成接管", connection[0][1]],
    ["核对供电与控制后试机", guide.motor === "brushed" ? "按电机端子正负标识接线，确认额定电压和设备启停控制。观察启动时泵端电压、运行电流和状态，再接入完整工作周期。" : "按所选两线或调速版本接线，分清电机电源与控制信号。配置 PWM、FG 时，先确认电平、悬空状态和频率定义，再进行全速、低速及启停试验。"],
    [guide.gasLiquid ? "先测空腔压力—时间" : "记录首次引液与稳定流量", guide.gasLiquid ? "用已知容积的系统记录从起始压力到目标负压的过程，检查泄漏和排放条件，再加入实际气液负载。每项测试保留起始状态，便于复测。" : "先用相容介质和通畅回路确认输送方向，分别记录启动到首次出液、稳定供液的时间；再恢复真实吸程与背压，检查更换液瓶或入口进气后的恢复。"],
    ["接入实际负载，检查完整节拍", guide.gasLiquid ? "在真实腔体、管路、阀状态和气液比例下测试，记录目标真空达到时间、保持状态和实际排空结果，同时监测电流、温升与异常声响。" : "加入过滤器、阀和末端结构后，在最低液位与不同温升状态下重复收集目标时间内的液体，记录流量、压力、电流、气泡及各支路分配。"],
    ["建立停机与复机流程", "按工作液和清洗液确定冲洗、排残留与保存方式。复机后检查密封和运行表现；含盐、易结晶或易沉积介质应重点比较停机前后的变化。"],
  ];

  const faults: readonly DecisionRow[] = guide.gasLiquid ? [
    ["电机运行但建立不了目标真空", "入口或瓶盖漏气、阀未切换到位、系统容积变化、出口受阻", "先用已知密封容积复测压力—时间，再逐段接回实际管路；不要只凭电机有转速便判定抽吸正常。"],
    ["能达到真空，但抽吸节拍过慢", "目标越接近极限，流量下降；实际容积和漏气增加负载", "记录起始压力、目标压力和时间，区分空腔建压与带气液负载的过程；不把 5 L 曲线直接按容积线性换算。"],
    ["气体测试正常，接入废液后异常", "介质状态、泡沫、沉积、材料变化或排放条件改变", "记录实际气液比例和异常阶段；核对 100% 纯液体排除边界，并检查泵头、阀片、管路和过滤件状态。"],
    ["FG 有信号，实际抽吸仍不足", "转速反馈正常，但入口漏气、阀片密封或抽吸路径有问题", "将 FG、压力曲线与实际排空结果对照。FG 只反映转速，不代替流量、真空或液位反馈。"],
    ["噪声、温升或电流变化", "固定与线束牵拉、出口负载、供电压降或异常运行", "在相同负载下与初始记录比较，检查安装和排放端，停止异常运行后联系技术支持。"],
  ] : [
    ["电机转，但迟迟不出液", "进出口方向、入口漏气、储液不足、吸管堵塞或出口建压负载", "先用相容介质、短且通畅的吸管检查引液，再逐段恢复原液路；记录首次出液时间和入口气泡。"],
    ["开始正常，运行一段时间流量下降", "储液瓶补气不足、液位下降、过滤器堵塞、温升或供电变化", "同步观察瓶内与入口状态、出口压力和泵端电压；一次只改变一个条件，保留同工况对照。"],
    ["水测正常，换试剂后变差", "黏度、温度、析气、阀片状态和材料相容性发生变化", "恢复相同测试条件，用实际工作液复测流量和自吸；检查膜片、阀片是否溶胀、变硬或被沉积物影响。"],
    ["短时分液波动，或多路分配不一致", "预充与启动占用时间、气泡、脉动、阀时序及支路阻力不同", "固定相同时间窗口逐路收集，先比较总量与分配，再评估管路、调速或缓冲；不只看瞬时流量计显示。"],
    ["停机仍滴液或回流", "液位差引起虹吸、残余压力、阀件泄漏或关断能力不足", "比较停机前后压力和液面高度，并单独验证截止与防虹吸措施；输送单向阀不自动等于已满足整机关断要求。"],
    ["异常噪声、振动或温升", "吸入受限、气泡、固定共振、管线牵拉或负载变化", "同时看入口状态、出口压力、电流和安装结构。先定位变化来自泵、管路还是机架，再调整隔振与运行参数。"],
  ];

  const verification: readonly Row[] = guide.gasLiquid ? [
    ["真空与节拍", "系统有效容积、起始压力、目标真空、达到目标的时间、保持时的压力变化，以及是否有持续漏气。"],
    ["真实抽吸状态", "气液比例、工作液与清洗液、液位和泡沫状态、吸排路径及实际排空结果。"],
    ["电气与耐久", "泵端电压、电流、PWM 配置、FG 记录、连续运行时段、启停频率及温升。"],
    ["维护后复测", "更换瓶、管路、过滤件或完成清洗后，在同一容积与压力定义下重新测试，不只比较空载转速。"],
  ] : [
    ["实际工作点", "目标流量、入口液位与压力、出口背压、介质及液温、管径管长、过滤器和阀状态。"],
    ["完整用液周期", "首次出液时间、稳定供液时间、相同窗口内的逐次收集量、各支路液量，以及停机后的尾液。"],
    ["电气与寿命目标", "泵端带载电压、电流、调速信号、每日运行时长、启停频率、温升及维护间隔。"],
    ["对照与验收", "在相同介质和工况下比较初始、温升后与维护前后的结果。更换管路、清洗液或驱动设置后重新验证。"],
  ];

  return { facts, currentPhoto, motorName, features, priming, connection, startup, faults, verification };
}
