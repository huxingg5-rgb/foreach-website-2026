import type { PistonPumpGuide } from "./piston-pump-guide.zh";

type Row = readonly [string, string];
export type CompactMotor = { id: string; label: string; rows: Row[]; pins: Row[]; image: string; note: string };
export type CompactSensor = { id: string; label: string; rows: Row[]; image: string; note: string };
const root = "/images/products/pumps/plunger-pump/guide/";

// Preserve the drawing's terminal numbering: A=6, C=4, B=3, D=1 for SM configuration 1.
const smMotorPins: Row[] = [["6 · 蓝色", "A 绕组端"], ["4 · 红色", "C 绕组端，与 A 构成一相"], ["3 · 绿色", "B 绕组端"], ["1 · 黑色", "D 绕组端，与 B 构成另一相"]];

export function getCompactMotors(guide: PistonPumpGuide): CompactMotor[] {
  if (guide.series === "TM") return [{
    id: "tm", label: "两相 1.8° 步进电机",
    rows: [["额定相电流", "0.5 A/相"], ["绕组电阻", "5.1 Ω ±10%"], ["绕组电感", "1.5 mH ±20%"]],
    pins: [["红色", "A+"], ["红白色", "A−"], ["绿色", "B+"], ["绿白色", "B−"]],
    image: `${root}tm-motor-wiring.webp`,
    note: "同一相的两根线连接驱动器对应相输出；旋转方向按安装面观察。TM 电流、线色及行程步数单独匹配，不使用 EA、SM 的端子编号。",
  }];
  if (guide.capacity === 50) return [{
    id: "sm50", label: "50 μL · 两相四线双极电机",
    rows: [["额定相电流", "0.67 A/相"], ["步距角", "1.8°"], ["绕组电阻", "3 Ω ±0.3 Ω"]],
    pins: smMotorPins, image: `${root}sm50-motor-wiring.webp`,
    note: "上表编号为 51065-0600 电机端；转接到 PHR-4 时，蓝、红、绿、黑依次对应 1、2、3、4。相电流相同不表示绕组电阻或连接器相同。",
  }];
  return [
    { id: "sm067", label: "配置 1 · 0.67 A/相", rows: [["驱动电压", "24 V DC"], ["额定相电流", "0.67 A/相"], ["绕组电阻", "7.2 Ω ±10%"], ["绕组电感", "5.1 mH"]], pins: smMotorPins,
      image: `${root}sm-motor-configuration-1.webp`, note: "六孔连接器中 2、5 位为空位。按连接器观察方向核对 1、3、4、6 位，不能直接使用 EA 电机的相序编号。" },
    { id: "sm1", label: "配置 2 · 1 A/相", rows: [["驱动电压", "24 V DC"], ["额定相电流", "1 A/相"], ["绕组电阻", "2.8 Ω ±10%"], ["绕组电感", "4.0 mH"]],
      pins: [["4 · 红色", "A"], ["6 · 黄色", "A̅，与 A 构成一相"], ["1 · 蓝色", "B"], ["3 · 橙色", "B̅，与 B 构成另一相"]],
      image: `${root}sm-motor-configuration-2.webp`, note: "该配置的电流、线色和绕组定义均与配置 1 不同。先确定供货电机版本，再选择驱动器与限流设置。" },
  ];
}

const smSensors: CompactSensor[] = [
  { id: "four", label: "4 线式光耦", image: `${root}sm-sensor-four-wire.webp`,
    rows: [["红色", "LED 正极，供电前串接限流电阻"], ["黑色", "LED 负极"], ["白色", "信号输出，接匹配的上拉电阻"], ["绿色", "输出侧逻辑电源负极"]],
    note: "红线接 5 V、12 V、24 V 时，对应限流电阻参考约 200 Ω、470 Ω、1 kΩ；同时核对控制板的输入电平及白线输出上拉。先实测遮挡与未遮挡状态，再设找零有效电平。" },
  { id: "five", label: "5 线式光耦", image: `${root}sm-sensor-five-wire.webp`,
    rows: [["红色", "LED 正极，串接限流电阻"], ["黑色", "LED 负极"], ["白色", "输出侧逻辑电源：5～12 V"], ["绿色", "逻辑电源负极"], ["蓝色", "信号输出；初始位置低电平，其他位置高电平"]],
    note: "LED 支路与输出逻辑电源分别核对，白线按 5～12 V 配置。接入控制板前确认其输入耐压与电平阈值，不能只按光耦线数判断兼容。" },
  { id: "three", label: "3 线式光耦", image: `${root}sm-sensor-three-wire.webp`,
    rows: [["褐色", "5～24 V DC 电源"], ["蓝色", "电源负极"], ["黑色或白色", "对应入光动作或遮光动作的信号输出"]],
    note: "图中包含两种输出动作；按供货版本使用对应输出线。调试时先读取两种光路状态，确认控制板输入与找零停止逻辑。" },
];

export function getCompactSensors(guide: PistonPumpGuide): CompactSensor[] {
  if (guide.series === "SM") return guide.capacity === 50 ? [smSensors[0]] : smSensors;
  return [{
    id: "tm", label: "A / K / E / C 光耦接线", image: `${root}tm-sensor-wiring.webp`,
    rows: [["A", "LED 阳极，串接限流电阻 Rf"], ["K", "LED 阴极，接地"], ["E", "光敏三极管发射极，接地"], ["C", "光敏三极管集电极，连接输出并通过 RL 上拉"]],
    note: "Vcc = 5 V 时，Rf 推荐 150～200 Ω，RL 为 10 kΩ。转接板未配这两个电阻，需由外部电路提供；更换供电电压时重新计算，不能直接沿用这组值。最大额定电流不能作为工作电流设置。",
  }];
}

export function getCompactSteps(guide: PistonPumpGuide) {
  const tm = guide.series === "TM";
  return [
    { title: "核对型号与工况，断电后安装", text: `确认 ${guide.model} 的容量、泵头、线束及接口。流体温度 ${guide.fluidTemperature}，工作环境 ${guide.ambientTemperature}；调整接线或液路前停止设备并断开电源。` },
    { title: tm ? "按双孔安装面固定" : "按四孔安装面固定", text: `${guide.mounting}。${tm ? "螺钉有效旋入长度应结合支架厚度核对，避免顶入机构；安装面和电机外形尺寸分开检查。" : "按安装图定位支架，尽量使出口朝上以便排气；管路与线束保留余量，避免拉扯泵头。"}` },
    { title: tm ? "匹配 6-40 UNF 接头和液路" : "匹配端口与密封件", text: `${guide.ports}。${tm ? "核对接头的螺纹、插入深度及密封形式，不能使用 1/4-28 UNF 或 M6 接头强行装配。按当前接头确定锁紧方式。" : "同时核对孔深、管外径和密封件。对应塑料接头的推荐扭矩为 0.25～0.30 N·m；不用生料带或螺纹胶代替平底密封。"}` },
    { title: "连接电机与光耦", text: tm ? "按红、红白与绿、绿白区分两相绕组。光耦按 A/K/E/C 连接，在上电前确认外部 Rf、RL 已接入并匹配 5 V 参考电路或已验证的其他供电方案。" : "按所选电机版本识别两相绕组，再核对光耦线色、供电和外部限流、上拉电路；50 μL 配置与其他 SM 版本的绕组电阻分别核对。" },
    { title: "确认方向、行程与找零", text: `当前基础满行程为 ${guide.drives[0].fullSteps} 步。先以可控速度检查运动方向和光耦状态，再验证触发后的停车余量；调整细分时同步核对指令单位，不把机械极限当作工作终点。` },
    { title: "充液排气，验证实际分配量", text: `${guide.material === "PEEK" ? "非透光泵头通过管路和排出液确认排气状态。" : "观察透明泵头与管路中的充液、气泡和泄漏。"}协调吸液、换阀与排液，按目标液量重复收集并验证回程差补偿；${tm ? "微小液量应同时检查管路残留体积、气泡与阀切换带来的偏差。" : "20 μL 以内定量加样，建议截止阀下游使用硬管。"}避免长时间无液运行。` },
  ];
}

export function getCompactCare(guide: PistonPumpGuide): Row[] {
  return [
    ["换液与清洗", `${guide.materialAdvice} 记录清洗剂浓度、接触时间及温度，换液后重新验证泄漏与分配结果。`],
    ["含盐或易结晶介质", "停机前按已验证流程清洗，避免残液蒸发结晶影响柱塞和密封。冲洗介质应与整条接液路径相容。"],
    ["小液量波动", `先排除气泡、阀时序和管路弹性影响，再检查换向补偿；本系列背隙指标为 ${guide.backlash}，不直接把该百分比作为固定补偿量。`],
    ["电机振动或未到位", "检查绕组接线、驱动相电流、细分和加减速设置，再检查机械及液路阻力。异常卡滞时停止驱动，不反复强行冲击行程终点。"],
    ["漏液或泵头裂纹", "停止使用，检查介质相容性、接头密封与装配受力；保留产品标签、照片及工况记录，联系售后。"],
  ];
}
