/** EA pilot guidance: product configuration evidence is PS-120B-035 A46,
 * PS-120B-152 A00 and UM-120B-003 A00. General resin properties are background,
 * not ratings or confirmation of a resin supplier for FOREACH components. */
export const eaGuideRoot = "/images/products/pumps/plunger-pump/ea/selection/";

/** User-supplied physical photos; no wiring variant inferred from appearance. */
export const eaHomeSensorPhotos = [
  { file: "ea-home-sensor-photo-0290-cropped.webp", alt: "光耦实物图 1" },
  { file: "ea-home-sensor-photo-0297-cropped.webp", alt: "光耦实物图 2" },
  { file: "ea-home-sensor-photo-0286-cropped.webp", alt: "光耦实物图 3" },
  { file: "ea-home-sensor-photo-0289-cropped.webp", alt: "光耦实物图 4" },
] as const;

export const ea500DriveOptions = [
  { id: "1.8", angle: "1.8°", fullSteps: 2000, resolution: 500 / 2000 },
  { id: "0.9", angle: "0.9°", fullSteps: 4000, resolution: 500 / 4000 },
] as const;

export const eaHeadMaterials = [
  { name: "PMMA", fullName: "聚甲基丙烯酸甲酯", transparent: true, purpose: "需要直接观察充液和气泡的液路。", check: "不耐酒精及强酸。工作液或清洗液含这些成分时，应改选材料方案。" },
  { name: "PCTG", fullName: "共聚聚酯", transparent: true, purpose: "需要透光泵头时，与 PMMA（聚甲基丙烯酸甲酯）、PSU 一起比较。", check: "不耐强酸、强碱、次氯酸钠和 84 消毒液；不能仅因透明就替换 PMMA（聚甲基丙烯酸甲酯）。" },
  { name: "PSU", fullName: "聚砜", transparent: true, purpose: "需要透光，并关注材料耐水解与热稳定性时，可纳入牌号比较。", check: "通用树脂特性不等于泵可高温运行或蒸汽灭菌；仍按泵、密封与实际清洗条件选型。" },
  { name: "PEEK", fullName: "聚醚醚酮", transparent: false, purpose: "需要非透光泵头，或现有材料不能满足介质要求时，纳入化学兼容性比较。", check: "按具体化学品、浓度和温度查表；不能把 PEEK 当成耐所有酸碱与溶剂的通用材料。" },
  { name: "PVDF", fullName: "聚偏二氟乙烯", transparent: false, purpose: "需要非透光，并关注酸、盐或其他化学介质时，纳入材料候选。", check: "逐项核对工作液与清洗剂，尤其是碱性及混合配方；树脂兼容表不能代替完整泵测试。" },
  { name: "PPS", fullName: "聚苯硫醚", transparent: false, purpose: "EA 系列的非透光选项，可结合结构与材料兼容表比较。", check: "明确实际牌号、介质与密封结构后再确定组合，不能由非透光推导化学兼容性。" },
  { name: "POM", fullName: "聚甲醛", transparent: false, purpose: "EA 系列的非透光选项，可结合加工、结构与介质要求比较。", check: "酸、氧化性清洗液及长期浸液条件需单独核对，不按其他塑料的适用性直接替换。" },
  { name: "PET", fullName: "聚对苯二甲酸乙二醇酯", transparent: false, purpose: "EA 系列的非透光项目选项。", check: "需先确认实际牌号和目标液体的兼容性，再决定是否进入样机。" },
] as const;

export const eaMotorWiring = [
  { id: "four42", label: "4 线双极 · 42 电机", current: "1.2 A/相", resistance: "2.8 Ω ±10%", inductance: "4.5 mH ±20%", file: "ea-motor-42-four-wire-original-hd.webp", fullSizeFile: "ea-motor-42-four-wire-original-hd.svg", page: 16, note: "四根电机引线不等于连接器只有四个孔位；本图为六孔连接器中的对应引脚。请按图识别绕组与引脚。" },
  { id: "fourA", label: "4 线双极 · 电机 A", current: "1.2 A/相", resistance: "1.8 Ω ±10%", inductance: "3.2 mH ±20%", file: "ea-motor-a-four-wire-original-hd.webp", fullSizeFile: "ea-motor-a-four-wire-original-hd.svg", page: 17, note: "额定相电流与 42 电机相同，但电阻、电感与接线图需分别核对，不能只按电流判断为相同电机。" },
  { id: "fourB", label: "4 线双极 · 电机 B", current: "1.5 A/相", resistance: "1.8 Ω ±10%", inductance: "3.2 mH ±20%", file: "ea-motor-b-four-wire-original-hd.webp", fullSizeFile: "ea-motor-b-four-wire-original-hd.svg", page: 18, note: "电机 B 的额定相电流与电机 A 不同，应核对驱动器电流设置及其峰值／有效值定义。" },
  { id: "six", label: "6 线单极电机", current: "1.2 A/相", resistance: "2.8 Ω ±10%", inductance: "3.3 mH ±20%", file: "ea-motor-six-wire-original-hd.webp", fullSizeFile: "ea-motor-six-wire-original-hd.svg", page: 19, note: "图中列出六个端子的相序与中心抽头。应按所选驱动方式及供货接线定义连接，不照搬四线双极接法。" },
] as const;

export const eaHomeSensors = [
  { id: "three", label: "3 线式光耦", file: "ea-home-sensor-three-wire-original-hd.webp", page: 20,
    overview: "带电源与信号输出的配置，先核对控制板输入电平与所选输出动作。",
    rows: [["褐色", "DC 5～24 V 电源"], ["蓝色", "电源负极"], ["黑色或白色", "信号输出；按供货选用其中对应的一路，核对入光／遮光动作"]],
    note: "图示包含两种输出动作，不能把图中的所有颜色都当成同一三线线束。" },
  { id: "four", label: "4 线式光耦", file: "ea-home-sensor-four-wire-original-hd.webp", page: 21,
    overview: "LED 输入与光电输出分开接线，需要外部限流和匹配的输出上拉。",
    rows: [["红色", "LED 正极，串接限流电阻"], ["黑色", "LED 负极"], ["白色", "集电极开路信号输出，配合上拉电阻"], ["绿色", "输出侧逻辑电源负极"]],
    note: "遮挡时输出高电平、未遮挡时输出低电平。LED 电流和输出耐压的最大值是上限，不能当作推荐驱动设置。" },
  { id: "five", label: "5 线式光耦", file: "ea-home-sensor-five-wire-original-hd.webp", page: 22,
    overview: "LED 供电与输出逻辑电源分别接入，输出极性与四线式不同。",
    rows: [["红色", "LED 正极，串接限流电阻"], ["黑色", "LED 负极"], ["白色", "输出侧逻辑电源，要求 <6 V"], ["绿色", "输出侧逻辑电源负极"], ["蓝色", "信号输出；遮挡低电平，未遮挡高电平"]],
    note: "不可把三线式的 DC 5～24 V 电源范围套到本配置的输出逻辑电源。接线前按控制板电平与实际光耦型号核对。" },
] as const;

export const eaUseSteps = [
  { title: "核对供货配置并断电", text: "核对容量、泵头、接口、电机版本、光耦与阀件，确认线束标识及对应图纸。机械固定、接线或调整配管前，停止设备并断开电源。" },
  { title: "固定支架，安排出管方向", text: "支架有 2×M3、孔距 31.8 mm 的常规款与 42.8 mm 的宽支架。按本型号图纸核对安装面，尽量使流体出口朝上，给接头和线束留出空间；不要让管路拉力作用在泵头上。" },
  { title: "连接液路并检查平底密封", text: "核对 1/4-28 UNF 或 M6 接口、孔深、接头及密封件。塑料材质的对应接头推荐扭矩为 0.25～0.30 N·m；只使用一个端口时，另一个端口用合适的堵头密封。不用生料带或螺纹胶代替平底密封。" },
  { title: "按版本连接电机和光耦", text: "用上方电机图核对绕组和端子，再按所选光耦图连接供电与信号。确认信号电平、上拉或限流电路，以及遮挡时的有效状态后再上电。" },
  { title: "设置驱动参数并检查找零", text: "按供货电机与驱动器设置相电流、细分和加减速曲线。配置光耦时，先确认遮挡状态及运动方向，再验证触发后的停车余量；每个测试周期结束后，建议按控制流程重新初始化找零。" },
  { title: "充液、换阀并排出气泡", text: "用与全部接液材料相容的介质充液，按泵腔、阀与整条管路容积安排反复吸排，并检查气泡及泄漏。吸液、阀切换和排液应按实际阀路组织；不得让泵长时间无液运行。" },
  { title: "补偿回程差后验证目标液量", text: "在程序中设置并验证回程差补偿，再按目标液量重复吸排并记录实际收集量。20 μL 以内定量加样，建议截止阀下游使用硬管；同时检查气泡、管路弹性及阀时序。" },
] as const;

// Connection composition and operating principles: EA A46 pp. 23-26;
// EA user manual pp. 9-12. Photographs illustrate parts, not a supplied kit.
export const eaTubeConnections = [
  {
    id: "flanged",
    title: "翻边＋垫片连接",
    image: "/images/products/tubing-assemblies/flanged-tubing/fep/flanged-tube-fitting-washer-layout.webp",
    imageWidth: 1254,
    imageHeight: 1254,
    alt: "翻边连接组成实拍，展示螺纹接头、配套支撑垫片和透明管端翻边",
    parts: ["螺纹接头", "支撑垫片", "管端翻边"],
    description: "管端预先加工翻边，接头通过配套垫片支撑并压紧翻边，使管端与匹配的平底端口密封面贴合。",
    check: "需要专用设备预制翻边；装配时检查翻边完整性、垫片与端口的配合。",
  },
  {
    id: "ferrule",
    title: "卡箍连接",
    image: "/images/products/fittings/hard-tube-fittings/photos/compact-ferrule-fitting-black-tubing-assembly.webp",
    imageWidth: 1500,
    imageHeight: 1500,
    alt: "卡箍式接头与黑色硬管装配实拍，展示接头前端配套密封部件",
    parts: ["螺纹接头", "配套卡箍", "未翻边硬管"],
    description: "无需预制管端翻边，使用匹配的接头与卡箍连接硬管，可在现场装配。管外径、卡箍和端口必须成套匹配。",
    check: "卡箍占据一定装配高度，需单独核对孔深；一般不作多次拆装后的重复使用。",
  },
] as const;

export const eaMotorSetupChecks = [
  ["先确认配套", "核对电机绕组、额定相电流与驱动器设置，区分峰值和有效值；先以可控的运动确认方向及光耦状态。"],
  ["再设置起停", "从能平稳起动和停止的设置开始，逐项调整速度与加减速。进入较高运行速度前先加速，停车前先减速。"],
  ["出现振动或失步", "检查起停曲线、机械负载和液路阻力，再评估细分与隔振。电流调整应保持在电机、驱动器允许范围内，调整后重新验证液量。"],
] as const;

export const eaCareScenarios = [
  ["含盐或易结晶介质", "避免柱塞长时间暴露在空气中形成结晶。按介质与接液材料安排冲洗、防护及停机流程；需要时匹配密封冲洗选项。"],
  ["更换试剂或清洗液", "同时核对泵头、柱塞、密封、阀和管路的兼容性。当前 PMMA（聚甲基丙烯酸甲酯）泵头不耐酒精及强酸，清洗过程同样适用。"],
  ["停机保存", "根据残留液体的结晶、腐蚀和材料相容性，执行已验证的清洗与保存流程。清洗剂、浓度、时长和保存方式应随实际介质确认。"],
  ["复机或维护后", "检查接头、管路和线束，重新充液排气。配置光耦时先验证初始化，再检查泄漏、换向补偿与目标液量。"],
] as const;

export const eaVerificationFields = [
  ["介质与工况", "工作液及浓度、液体温度、背压或入口真空条件。"],
  ["液路与驱动", "管材、内径和长度，阀切换时序，电机版本、细分、速度、加减速及补偿设置。"],
  ["逐次收集结果", "目标液量、每次实际收集量、测量方法、测试次数，以及气泡、尾液或泄漏等现象。"],
  ["比较与复测", "在相同工况和测量方法下比较平均偏差与波动；改变介质、管路、阀或驱动设置后重新验证。"],
] as const;
