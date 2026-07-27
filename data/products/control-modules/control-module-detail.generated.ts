export type ControlModuleSpec = {
  label: string;
  value: string;
};

export type ControlModuleFaq = {
  question: string;
  answer: string;
};

export type ControlModuleDetail = {
  slug: string;
  title: string;
  categoryLabel: string;
  intro: string[];
  applications: string[];
  highlights: string[];
  specs: ControlModuleSpec[];
  faqs: ControlModuleFaq[];
  media: {
    images: string[];
    drawing2d: string;
    model3d: string;
  };
};

export const controlModuleDetails: ControlModuleDetail[] = [
  {
    slug: "abd-air-bubble-detector",
    title: "ABD 气泡检测模块",
    categoryLabel: "智控系列",
    intro: [
      "ABD 气泡检测模块用于透明管路中的气泡、液滴和气液状态检测。模块采用非接触式检测方式，通过红外光在气体与液体中的能量差异识别管路状态，不直接接触液体介质，可避免额外污染和流阻。",
      "该模块适用于 IVD、生命科学、实验室自动化、环境监测和食品检测等设备中的液路状态监测，可用于气泡报警、液滴识别、试剂管路状态判断和设备异常保护。产品覆盖 1.6 mm 至 6.4 mm 主流透明软管外径，可根据实际管径选择对应配置。"
    ],
    applications: [
      "气泡报警",
      "液滴检测",
      "透明管路状态监测",
      "试剂管路状态判断",
      "液路异常保护",
      "自动化仪器管路监控"
    ],
    highlights: [
      "非接触式气泡 / 液滴检测",
      "适配 1.6–6.4 mm 透明软管外径",
      "支持 TTL / Modbus RTU 通讯",
      "支持 UART/TTL 数字信号、IO 模拟电压输出和 IO 数字报警输出",
      "气泡 / 液体检测尺寸 > 0.8 mm",
      "气泡检测响应时间 6 ms",
      "液体检测响应时间 6 ms"
    ],
    specs: [
      { label: "产品类型", value: "气泡检测模块" },
      { label: "检测方式", value: "非接触式红外检测" },
      { label: "检测对象", value: "气泡 / 液滴 / 气液状态" },
      { label: "适配管外径", value: "1.6 / 2.0 / 2.5 / 3.2 / 4.0 / 4.8 / 6.0 / 6.4 mm" },
      { label: "适配管材", value: "PU / PVC / PTFE / PFA / FEP 透明管" },
      { label: "检测介质", value: "Liquid / Gas" },
      { label: "可检测尺寸", value: "> 0.8 mm 宽度" },
      { label: "通讯接口", value: "TTL" },
      { label: "通讯协议", value: "Modbus RTU" },
      { label: "输出方式", value: "UART/TTL 数字信号、IO 模拟电压 0–5V、IO 数字报警信号" },
      { label: "工作电压", value: "5V DC ±5%" },
      { label: "工作电流", value: "< 20 mA" },
      { label: "响应时间", value: "气泡检测 6 ms；液体检测 6 ms" },
      { label: "工作温度", value: "15℃–45℃" },
      { label: "储存温度", value: "-25℃–65℃" },
      { label: "外形尺寸", value: "35.4 × 19.6 × 29.4 mm" },
      { label: "重量", value: "6.9 g" }
    ],
    faqs: [
      {
        question: "ABD 气泡检测模块是否接触液体？",
        answer: "不直接接触液体。模块夹持透明管路进行检测，可减少对液路的污染风险和额外流阻。"
      },
      {
        question: "ABD 可以检测哪些管径？",
        answer: "标准配置覆盖 1.6、2.0、2.5、3.2、4.0、4.8、6.0、6.4 mm 透明软管外径。"
      },
      {
        question: "ABD 是否支持 Modbus RTU？",
        answer: "支持。模块通讯接口为 TTL，通讯协议支持 Modbus RTU。"
      },
      {
        question: "ABD 能否检测很小的微气泡？",
        answer: "需要结合实际气泡尺寸判断。可检测气泡或液体宽度为 > 0.8 mm，过小气泡或液柱可能无法稳定识别。"
      }
    ],
    media: {
      images: [
        "/images/logo/foreach-logo-color.svg"
      ],
      drawing2d: "",
      model3d: ""
    }
  },
  {
    slug: "pdm5-pressure-sensor",
    title: "PDM5 压力检测模块",
    categoryLabel: "智控系列",
    intro: [
      "PDM5 压力检测模块用于自动化仪器液路中的压力监测、堵塞预警和系统保护。模块采用 PEEK 流道结构，配备 1/4-28 UNF 内螺纹接口，适合与常见微流体管路和接头系统集成。",
      "该模块输出数字压力信号，支持 I2C 通讯，可用于 IVD、生命科学、实验室自动化和分析仪器中的泵后压力检测、管路堵塞判断、流路异常识别和设备运行状态反馈。"
    ],
    applications: [
      "液路压力监测",
      "管路堵塞预警",
      "泵后压力反馈",
      "流路异常识别",
      "系统保护",
      "自动化仪器状态监控"
    ],
    highlights: [
      "压力范围 10–1200 kPa",
      "I2C 数字输出",
      "PEEK 流道结构",
      "1/4-28 UNF 内螺纹接口",
      "内部体积 ≤55 µL",
      "压力分辨率优于 5 Pa",
      "TEB 优于 1%FS",
      "默认采样率 37.5 Hz，最高可调至 100 Hz"
    ],
    specs: [
      { label: "产品类型", value: "压力检测模块" },
      { label: "压力范围", value: "10–1200 kPa" },
      { label: "输出信号", value: "Digital" },
      { label: "通讯接口", value: "I2C" },
      { label: "默认 I2C 地址", value: "0x6D" },
      { label: "推荐电压", value: "5V" },
      { label: "工作电压", value: "4.7–5.3V" },
      { label: "工作电流", value: "30 mA Peak" },
      { label: "压力分辨率", value: "Better than 5 Pa" },
      { label: "绝对精度 / TEB", value: "Better than 1%FS" },
      { label: "绝对总误差", value: "Better than 7 kPa" },
      { label: "默认采样率", value: "37.5 Hz" },
      { label: "最高采样率", value: "100 Hz 可调" },
      { label: "流道材料", value: "PEEK" },
      { label: "螺纹接口", value: "1/4-28 UNF 内螺纹" },
      { label: "内部体积", value: "≤55 µL" },
      { label: "推荐接头扭矩", value: "≤0.5 N·m" },
      { label: "外形尺寸", value: "30 × 20 × 35 mm" },
      { label: "重量", value: "35 g" },
      { label: "工作温度", value: "0℃–80℃" },
      { label: "使用寿命", value: ">1.5 million pressure cycles" }
    ],
    faqs: [
      {
        question: "PDM5 压力检测模块适合做什么？",
        answer: "适合用于仪器液路中的压力监测、堵塞预警、泵后压力反馈和系统保护。"
      },
      {
        question: "PDM5 的压力范围是多少？",
        answer: "标准压力范围为 10–1200 kPa。"
      },
      {
        question: "PDM5 使用什么通讯方式？",
        answer: "PDM5 使用 I2C 通讯，默认 7-bit I2C 地址为 0x6D。"
      },
      {
        question: "PDM5 的液路接口是什么？",
        answer: "液路接口为 1/4-28 UNF 内螺纹，适合与常见微流体接头和管路系统集成。"
      },
      {
        question: "PDM5 是否适合低死体积液路？",
        answer: "适合。规格书中内部体积为 ≤55 µL。"
      }
    ],
    media: {
      images: [
        "/images/logo/foreach-logo-color.svg"
      ],
      drawing2d: "",
      model3d: ""
    }
  }
];

export function getControlModuleDetailBySlug(slug: string) {
  return controlModuleDetails.find((item) => item.slug === slug) || null;
}

export function getControlModuleDetailSlugs() {
  return controlModuleDetails.map((item) => item.slug);
}

