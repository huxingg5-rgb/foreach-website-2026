import { applyValvelessPumpReviewedChineseCopy, getValvelessPumpChineseContent } from "./valveless-pump-content.zh";

// Keep P4 resource guidance while sharing the reviewed series copy.
const copy = getValvelessPumpChineseContent("rpl-p4")!;
export const rplP4DescriptionZh = copy.description;
export const rplP4SeoZh = copy.seo;
export const rplP4ApplicationsZh = copy.applicationDetails;
export const rplP4FaqsZh = copy.faqs;

export const rplP4PresentationZh = {
  drawing: "加入图纸需求",
  drawingAdded: "图纸需求已加入",
  drawingUnavailable: "RPL-P4 的 2D 图纸暂未公开。请点击上方“加入图纸需求”，再到选型清单中填写并提交询盘；图纸需求会随清单一并提交，具体配置与图纸版本需另行确认。",
  modelUnavailable: "RPL-P4 暂无公开 3D 模型。如需确认安装空间或申请对应配置的模型文件，请通过“联系我们”说明需求。",
  specNotes: [
    "单圈排量不等于单次加液量或最小可靠加液量；实际输出需结合驱动、液体和管路条件验证。",
    "准确度、重复性与寿命的适用条件需结合具体配置和测试资料确认。耐压值的定义及允许工作背压需另行核对，循环寿命不代表所有工况下的保证寿命。",
  ],
  bottomCta: {
    title: "确认适合您设备的 RPL-P4 无阀计量泵配置",
    desc: "请提供目标单次加液量或连续流量、允许加液时间、工作频次、液体成分、背压、驱动控制需求及安装尺寸。FOREACH 可据此协助核对 RPL-P4 的排量、接液材料、接口和安装配置；如需图纸，请将图纸需求加入选型清单后一并提交。",
    button: "提交定制需求",
    href: "/contact",
  },
};

export function applyRplP4ChineseDetailCopy<T extends { slug?: string; productTypeId?: string }>(data: T, locale: string): T {
  if (locale !== "zh" || data.slug !== "rpl-p4" || data.productTypeId !== "valveless-pump") return data;
  return { ...applyValvelessPumpReviewedChineseCopy(data, locale), rplP4ChineseCopy: rplP4PresentationZh };
}
