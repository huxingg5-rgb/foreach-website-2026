import { productOverviewHeadings } from "./product-overview-headings";
import { productIntroductionsZh } from "./product-introductions.zh";
import type { ProductSelectionProduct } from "./product-selection.types";
import type { FittingIntroZh } from "./fitting-headings.zh";

export const probeOverviewHeadingZh = productOverviewHeadings.needles.zh;
export const probeOverviewParagraphsZh = productIntroductionsZh["needles"];

export const probeTypesZh = [
  { id: "sampling-probes", label: "采样针" },
  { id: "piercing-probes", label: "穿刺针" },
  { id: "wash-probes", label: "清洗针" },
  { id: "stirring-paddles", label: "搅拌桨" },
] as const;

export function getProbeSelectionPathZh(productTypeId?: string) {
  const type = probeTypesZh.find((item) => item.id === productTypeId);
  // Existing /probes/{slug}/ URLs remain product detail pages.
  return type ? `/products/probes/selection/${type.id}/` : "/products/probes/";
}

export function getProbeProductTypeIdZh(product: ProductSelectionProduct) {
  return probeTypesZh.find((type) => type.id === product.detailSlug)?.id || product.productTypeId;
}

export const probeIntrosZh: Record<string, FittingIntroZh> = {
  "sampling-probes": {
    title: "定制采样针与试剂样本针",
    image: { src: "/images/products/probes/sampling-probes/foreach-sampling-probe-main.webp", alt: "FOREACH 定制采样针与试剂样本针", width: 1440, height: 904 },
    paragraphs: productIntroductionsZh["needles:sampling-probes"],
    features: [
      { title: "针管与安装", description: "可定制外径、内径、总长和有效长度，按设备运动方向、安装空间与连接方式确认折弯及安装端。" },
      { title: "针尖与孔位", description: "支持尖口、平口、V 型口与侧孔结构，孔位、孔径和液体进出方向需结合取液任务确认。" },
      { title: "低残留工艺", description: "内壁抛光、外壁涂层和防挂液处理按介质、目标容量及清洗条件评估，以降低挂液、残留和交叉污染风险。" },
      { title: "液位检测与定制", description: "如需 cLLD / 电容式液位检测，请提供针体结构、线缆连接和整机检测方式，并提供图纸、样品或安装空间资料。" },
    ],
  },
  "piercing-probes": {
    title: "定制穿刺针与密闭耗材取液针",
    image: { src: "/images/products/probes/piercing-probes/foreach-piercing-probe-main.webp", alt: "FOREACH 定制穿刺针", width: 1039, height: 939 },
    paragraphs: productIntroductionsZh["needles:piercing-probes"],
    features: [
      { title: "穿刺对象", description: "按封膜、瓶塞及密闭耗材的材料、厚度和结构强度确认针体与针尖方案。" },
      { title: "针尖与强度", description: "针尖角度、刃口方向、针尖强度及表面处理需结合穿刺阻力与运动方式确认。" },
      { title: "气液路径", description: "可定制排气口、排气槽及侧孔，按排气方向、液体路径和取液动作确认孔位。" },
      { title: "安装与定制", description: "请提供耗材图纸或样品、穿刺位置、深度与安装空间；折弯、焊接和安装端结构按整机要求评估。" },
    ],
  },
  "wash-probes": {
    title: "定制清洗针与清洗排废针组件",
    image: { src: "/images/products/probes/wash-probes/foreach-wash-probe-main.webp", alt: "FOREACH 定制清洗针与多头清洗结构", width: 877, height: 800 },
    paragraphs: productIntroductionsZh["needles:wash-probes"],
    features: [
      { title: "针体形式", description: "单头、双头、多头、折弯及安装端按清洗站空间与运动动作定制。" },
      { title: "喷洗结构", description: "侧孔数量、孔径、孔位和喷射方向按清洗液路径与目标清洗区域确认。" },
      { title: "排废路径", description: "废液出口、残液回收路径、抽排方向及废液槽位置需结合清洗站布局确认。" },
      { title: "工艺与定制", description: "请提供清洗站图纸与液路说明；焊接、抛光、涂层和防挂液要求按清洗液、废液性质及寿命要求评估。" },
    ],
  },
  "stirring-paddles": {
    title: "定制搅拌桨与反应液混匀组件",
    image: { src: "/images/products/probes/stirring-paddles/foreach-stirring-paddle-main.webp", alt: "FOREACH 定制搅拌桨与混匀叶片", width: 928, height: 803 },
    paragraphs: productIntroductionsZh["needles:stirring-paddles"],
    features: [
      { title: "容器与空间", description: "按反应杯尺寸、杯底形状、液面高度和可用空间确认桨叶尺寸，并核对运动干涉。" },
      { title: "桨叶结构", description: "平板、螺旋、90 度角叶片或其他形状按液体状态、目标液量和混匀效果确认。" },
      { title: "混匀与安装", description: "请提供转速范围、混匀时间及气泡和飞溅要求，并确认同轴度、驱动连接和安装端结构。" },
      { title: "表面与定制", description: "涂层、焊接和防挂液要求按介质、清洗方式及寿命评估；可提供反应杯图纸、现有样品或混匀测试要求。" },
    ],
  },
};
