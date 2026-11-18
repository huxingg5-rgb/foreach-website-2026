import { abdOrderModels } from "../configurator/instrument-inquiry";
import { getAbdDrawingPreview } from "./abd-cad-assets";
import { getCompactInstrumentGuideUi } from "./compact-instrument-guide-ui.intl";
import type { GuideSection, InstrumentProductGuide } from "./instrument-product-guides.zh";
import { mrv3Configurations } from "./mrv3-content";
import { getSolenoidConfiguration, getSolenoidDrawingPdfUrl } from "./solenoid-configurations";

type Profile = {
  selection: readonly string[];
  installation: readonly string[];
  delivery: {
    supply: readonly string[];
    documents: string;
  };
};

export const instrumentDetailProfiles: Partial<Record<InstrumentProductGuide["family"], Profile>> = {
  sv10: {
    selection: ["paths", "materials"],
    installation: ["installation", "electrical"],
    delivery: {
      supply: ["电磁阀：按确认的通路状态、连接形式、电压和接液材料配置供货。", "配套附件：密封件、接头及线束按订单约定提供。"],
      documents: "技术资料：按所选连接形式和电气配置提供对应的安装图纸、接管和接线资料。",
    },
  },
  mrv3: {
    selection: ["channels", "materials"],
    installation: ["installation", "control"],
    delivery: {
      supply: ["旋转阀：按订单提供所选通道数及接口的阀总成或阀头。", "驱动配套：电机、驱动器和线束按确认的供货范围提供。"],
      documents: "技术资料：按实际供货版本提供流路、安装及接口资料。配套驱动器的通信资料对应所选驱动版本。",
    },
  },
  hp: {
    selection: ["paths", "pressure"],
    installation: ["control"],
    delivery: {
      supply: ["高压阀：按确认的阀体、传动和接口配置供货。", "配套附件：锥形接头、管路和线束按订单约定提供。"],
      documents: "技术资料：按供货版本提供阀头流路、安装尺寸与驱动接线资料。",
    },
  },
  syringe: {
    selection: ["capacity", "valves"],
    installation: ["materials", "control"],
    delivery: {
      supply: ["注射泵：按订单确认的行程、通道数和阀配置供货。", "配套部件：注射器、线束及接管附件按确认配置提供。"],
      documents: "技术资料：按所选泵和阀配置提供安装、流路、接线和控制资料。",
    },
  },
  abd: {
    selection: ["tubing"],
    installation: ["wiring", "threshold"],
    delivery: {
      supply: ["气泡检测模块：按确认的夹管外径和结构配置供货。", "配套附件：线束和连接件以订单约定为准。"],
      documents: "技术资料：按供货版本提供安装图纸、针脚定义及输出和通信资料。",
    },
  },
  pdm5: {
    selection: ["range"],
    installation: ["materials", "wiring", "reading"],
    delivery: {
      supply: ["压力检测模块：按确认的绝压量程、接口和型号供货。", "配套附件：接头、密封件和线束按订单约定提供。"],
      documents: "技术资料：按所选量程和供货版本提供安装、接线及压力读数资料。",
    },
  },
};

export function getInstrumentDeliveryRows(family: InstrumentProductGuide["family"], locale = "zh") {
  const copy = instrumentDetailProfiles[family]?.delivery;
  if (!copy) return undefined;
  return [
    { title: "供货内容", paragraphs: copy.supply },
    { title: "随货资料", paragraphs: ["检验资料：产品检验记录按订单约定提供。", copy.documents] },
    { title: "发货与收货", paragraphs: [
      locale === "zh" || locale === "zh-CN"
        ? "国内配送：默认顺丰快递包邮。"
        : "海外配送：运费由客户承担，可在下单时指定快递公司。",
      "交期与物流：按确认的交期发货，发货后提供物流信息。",
      "收货核对：核对型号、数量、附件和随货资料。发现运输损伤或缺件时，请保留包装和照片并及时联系。",
    ] },
  ];
}

export function getInstrumentGuideSectionSource(guide: InstrumentProductGuide, section: GuideSection, locale = "zh"): GuideSection {
  const { family, model, slug } = guide;
  const chinese = locale === "zh" || locale === "zh-CN";
  const ui = getCompactInstrumentGuideUi(locale);
  if (family === "sv10" && section.id === "paths") return {
    ...section,
    title: "通路与断电状态",
    intro: chinese ? `以 ${model} 的供货配置为准。先定断电时哪条支路应保持连通，再核对端口、连接形式及响应时间。`
      : "先定断电时哪条支路应保持连通，再核对端口、连接形式及响应时间。",
  };
  if (family === "sv10" && section.id === "installation") {
    const states = getSolenoidConfiguration(slug)?.assets.length === 2 ? [ui.closed, ui.open] : [""];
    const links = states.flatMap((state, index) => {
      const href = getSolenoidDrawingPdfUrl(slug, locale, index);
      const variantLabel = state ? `${model} ${state}` : model;
      const label = chinese ? `查看 ${variantLabel} 中文 2D 图纸` : `${ui.drawing} · ${variantLabel}`;
      return href ? [{ href, label }] : [];
    });
    return { ...section, links };
  }
  if (family === "mrv3" && section.id === "channels") return {
    ...section,
    title: "通道数、通径与接口对照",
    intro: "先统计试剂、清洗液和预留支路，再按规格表对照公共口通径、阀内体积与接头。每次按阀位选通相应支路。",
    rows: mrv3Configurations.map(({ slug, channels, bore, volume, port }) => [
      slug.toUpperCase(), `${channels} 通道，通径 ${bore} mm，内容积 ${volume} μL`, `接口为 ${port}。`,
    ]),
  };
  if (family === "hp" && section.id === "paths") return {
    ...section,
    title: "进样、装样与排气位置",
    intro: "先按实际流路区分样液、定量管与排气出口，再将程序位置与下列通路逐一对应。",
    rows: [
      ["进样位", "复位并对中后，1–2、3–4、5–6 连通", "先确认复位信号，再执行进样。"],
      ["装样位", "1–6、2–3、4–5 连通", "按阀头端面方向与规格书的角度设置切换动作。"],
      ["排气位", "3–7 连通", "确认排出液去向并单独验证排气路径。"],
    ],
  };
  if (family === "syringe" && section.id === "capacity") return {
    ...section,
    title: "注射器容量与机械行程",
    intro: "先确定最小与最大分注量、连续分注次数及补液节拍，再选注射器。按实际装用的注射器核算行程与液量。",
    rows: section.rows?.map(([label, value, explanation]) => label === "标称容量"
      ? [label, model.endsWith("6") ? "60 mm 系列提供 25 μL–25 mL 注射器容量选项" : "30 mm 系列提供 50 μL–5 mL 注射器容量选项", explanation]
      : [label, value, explanation]),
  };
  if (family === "abd" && section.id === "tubing") return {
    ...section,
    title: "夹管尺寸与检测条件",
    intro: "量取实际管外径后选择夹管槽位。用试剂、管材和实际流速建立检测信号基线。",
    rows: section.rows?.map(([label, value, explanation]) => label === "管外径"
      ? [label, `${abdOrderModels.map(([, od]) => chinese ? od : Number(od).toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })).join(chinese ? "、" : " · ")} mm`, explanation]
      : [label, value, explanation]),
    links: abdOrderModels.flatMap(([code, od]) => {
      const href = getAbdDrawingPreview(code, locale);
      const diameter = Number(od).toLocaleString(locale, { maximumFractionDigits: 1 });
      return href ? [{ href, label: `${ui.tubeOd} ${chinese ? od : diameter} mm · ${ui.drawing}` }] : [];
    }),
  };
  if (family === "pdm5" && section.id === "range") return {
    ...section,
    title: "绝压量程与测量误差",
    intro: "先列最低、常用和峰值压力，按绝压范围选择档位，再核对该档位的总误差和实际需要识别的压力变化。",
    rows: section.rows?.map(([label, value, explanation]) => label === "量程选项"
      ? [label, "10–200、10–400、10–700、10–1200 kPa（绝压）", explanation]
      : [label, value, explanation]),
  };
  if (family === "pdm5" && section.id === "materials") return {
    ...section,
    links: [{ href: `/documents/products/control/pdm5/pdm5-outline-drawing-${chinese ? "zh" : "en"}.pdf`,
      label: chinese ? "查看 PDM5 中文 2D 图纸" : `${ui.drawing} · PDM5` }],
  };
  return section;
}
