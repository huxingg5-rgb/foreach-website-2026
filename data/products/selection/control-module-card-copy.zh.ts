// Chinese control cards and detail H1s share the same product description.
export const controlModuleCardsZh: Record<string, {
  model: string;
  name: string;
  heading: string;
}> = {
  "abd-air-bubble-detector": {
    model: "ABD",
    name: "气泡检测模块",
    heading: "ABD 气泡检测模块，用于透明管路中的气泡、液滴及气液状态识别，提供适配外径 1.6–6.4 mm 透明软管的配置",
  },
  "pdm5-pressure-sensor": {
    model: "PDM5",
    name: "压力检测模块",
    heading: "PDM5 压力检测模块，用于液路压力监测，压力范围为 10–1200 kPa，采用 PEEK 流道并支持 I²C 通讯",
  },
};

export function getControlModuleDetailHeadingZh(slug: string) {
  const copy = controlModuleCardsZh[slug];
  return copy ? `FOREACH ${copy.heading}` : undefined;
}
