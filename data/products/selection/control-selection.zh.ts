import { productOverviewHeadings } from "./product-overview-headings";
import { productIntroductionsZh } from "./product-introductions.zh";
import { getControlModuleDetailBySlug } from "@/data/products/control-modules/control-module-detail.generated";
import type { ProductSelectionProduct } from "./product-selection.types";

export const controlOverviewHeadingZh = productOverviewHeadings.control.zh;
export const controlOverviewParagraphsZh = productIntroductionsZh["control"];

export const controlTypesZh = [
  { id: "air-bubble-detectors", label: "气泡检测模块", modelSlug: "abd-air-bubble-detector", image: "/images/products/control/foreach-abd-air-bubble-detector.webp" },
  { id: "pressure-sensors", label: "压力检测模块", modelSlug: "pdm5-pressure-sensor", image: "/images/products/control/foreach-pdm5-pressure-sensor.webp" },
] as const;

export function getControlSelectionPathZh(productTypeId?: string) {
  const type = controlTypesZh.find((item) => item.id === productTypeId);
  return type ? `/products/control/${type.id}/` : "/products/control/";
}

export function getControlProductTypeIdZh(product: ProductSelectionProduct) {
  return controlTypesZh.find((type) => type.modelSlug === product.detailSlug)?.id || product.productTypeId;
}

const controlFeaturesZh = {
  "air-bubble-detectors": [
    { title: "检测方式", description: "ABD 采用非接触式红外检测，通过透明管路识别气泡、液滴和气液状态，不直接接触液体介质。" },
    { title: "适配管路", description: "提供适配 1.6–6.4 mm 透明软管外径的配置，管材包括相应透明 PU、PVC、PTFE、PFA、FEP 管；实际检测效果需结合管壁、透光性及介质确认。" },
    { title: "信号与通讯", description: "支持 TTL 接口与 Modbus RTU 协议，提供 UART/TTL 数字信号、IO 模拟电压和 IO 数字报警输出，按设备控制系统匹配。" },
    { title: "检测条件", description: "规格中的可检测气泡或液体宽度为 >0.8 mm，气泡和液体检测响应时间为 6 ms；选型时应结合流速、检测对象及安装位置核对。" },
  ],
  "pressure-sensors": [
    { title: "压力监测", description: "PDM5 标准压力范围为 10–1200 kPa，可用于泵后压力反馈、管路堵塞判断和流路异常识别。" },
    { title: "流道与接口", description: "采用 PEEK 流道及 1/4-28 UNF 内螺纹接口，内部体积 ≤55 μL。应结合介质兼容性、接头密封结构及安装空间确认接管方案。" },
    { title: "信号与通讯", description: "输出数字压力信号，支持 I2C 通讯，默认采样率为 37.5 Hz，最高可调至 100 Hz，按系统采样与反馈要求配置。" },
    { title: "系统集成", description: "选型时应核对实际压力及波动范围、供电条件、通讯接口、工作温度和管路布置，并在完整液路中确认监测与报警条件。" },
  ],
};

export const controlIntrosZh = Object.fromEntries(controlTypesZh.map((type) => {
  const detail = getControlModuleDetailBySlug(type.modelSlug)!;
  return [type.id, {
    title: type.label,
    image: { src: type.image, alt: `FOREACH ${detail.title}`, width: 1500, height: 1500 },
    paragraphs: productIntroductionsZh[`control:${type.id}`],
    features: controlFeaturesZh[type.id],
  }];
}));
