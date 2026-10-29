import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";
import { fepTubingVariants } from "@/data/products/configurator/fep-tubing";
import { tubingArticlePhoto, tubingAssemblyFigure, tubingSeriesLinks } from "./tubing-article-support";

const photo = tubingArticlePhoto("fep");
const examples = fepTubingVariants.map(item => [item.model,
  `${item.attributes.innerDiameter} × ${item.attributes.outerDiameter}`, String(item.result?.packaging)]);

export const fepTubingCopy: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "什么是 FEP 管？透明氟塑料管的性能、尺寸与连接选型",
    seoTitle: "什么是 FEP 管？性能、PTFE 区别与管组件选型 | 恒永达 FOREACH",
    seoDescription: "了解 FEP 管的材料特性及其在仪器试剂输送、液面观察和清洗管路中的用途，比较 FEP 与 PTFE、PFA，按内外径、流阻、温压条件和翻边接头选择细管及管组件。",
    coverImage: photo.src, coverAlt: photo.alt,
  },
  deck: "FEP 管是由聚全氟乙丙烯制成的氟塑料管材，具有较广的耐化学范围，并可制成便于观察液体的透明细管。在仪器液路中，选型应同时考虑介质、内外径、管长和端部连接。",
  leadBlocks: [
    { type: "paragraph", text: "FEP 管是由聚全氟乙丙烯制成的氟塑料管材，具有较广的耐化学范围，可通过熔融挤出加工成细管。透明 FEP 管便于观察充液状态、液面和气泡，常用于分析仪器的试剂输送、清洗液供给及泵阀之间的连接。" },
    { type: "paragraph", text: "FEP 细管常按设备布管长度加工，配合法兰翻边、卡环或卡箍结构制成管组件，将管体与两端接头组合后接入仪器液路。选择管组件时，应同时确定内外径、成品长度和端口结构，并结合观察需求选择管材颜色与壁厚。" },
  ],
  sections: [
    { title: "FEP 管是什么材料？为什么能制成透明细管", tocLabel: "材料与外观", blocks: [
      { type: "paragraph", text: "FEP 是四氟乙烯与六氟丙烯的共聚物，中文称为聚全氟乙丙烯。它属于可熔融加工的氟聚合物，可通过熔融挤出制成连续管材。FEP 与 PTFE 都属于氟塑料，但它们的加工方式和成品表现不同，采购时应分别写明材质，不能只使用“氟塑料管”作为规格。" },
      { type: "paragraph", text: "透明 FEP 管有利于观察液柱、充液边界和较大的气泡。实际可视性由管壁厚度、管径、颜色、液体自身的颜色及现场光线共同决定。黑色等着色配置服务于不同布管需求，不能沿用透明管的观察用途。" },
      { type: "figure", ...photo, width: 1500, height: 1500, caption: "恒永达 FEP 管实拍：透明与黑色管材配置。尺寸和颜色按具体型号选择。", captionHref: "/products/tubing/fep-tubing/details/" },
      { type: "paragraph", text: "透明管也不等于光学检测池。将 FEP 管装入气泡传感器、液面传感器或光学检测部件时，需要匹配传感器的适配管径、壁厚和光学条件，再用目标液体验证识别效果。" },
    ] },
    { title: "FEP 管的性能怎样影响仪器液路", tocLabel: "性能与使用条件", blocks: [
      { type: "table", headers: ["序号", "特征", "液路设计中的作用", "配套检查"], rows: [
        ["1", "较广的耐化学范围", "用于试剂、清洗液和溶剂输送选材", "核对液体组成、浓度、温度与接触时间"],
        ["2", "透明配置便于观察", "查看管内充液、液面和气泡", "检查壁厚、颜色、照明与传感器适配"],
        ["3", "低表面能", "用于评估黏附和冲洗需求", "以样本残留与空白测试判断清洗效果"],
        ["4", "可熔融加工", "支持连续挤出和适配的管端成型", "核对成品公差、翻边尺寸和端口结构"],
      ] },
      { type: "paragraph", text: "FEP 的耐化学性应落实到整条接液路径。即使管材与试剂相容，接头本体、密封垫圈、阀内密封件或清洗介质仍会限制组件的使用范围。应把输送、停机浸泡和清洗三个阶段纳入材料核对。" },
      { type: "paragraph", text: "管材表面特征不能直接换算为计量精度。加样结果还受泵、阀、气泡、管路弹性、连接死体积和控制时序影响。对微量输送，应在完整液路中记录实际出液量和重复性。" },
    ] },
    { title: "FEP、PTFE 与 PFA 管怎样选择", tocLabel: "三种氟塑料比较", blocks: [
      { type: "table", headers: ["选择条件", "FEP", "PTFE", "PFA"], rows: [
        ["材料与加工", "可熔融加工的全氟共聚物", "细管常采用糊状挤出与烧结", "可熔融加工的全氟烷氧基聚合物"],
        ["观察管内液体", "透明配置便于观察", "本色配置常呈乳白或半透明", "透明或半透明配置按实物检查可视性"],
        ["试剂输送", "按具体介质和组件条件选择", "按具体介质和组件条件选择", "按具体介质和组件条件选择"],
        ["定长与端部连接", "按管径配置翻边、卡环或卡箍结构", "结合管端工艺与长期夹持状态选择", "按管径、成型尺寸与配合端口选择"],
      ] },
      { type: "paragraph", text: "先用介质和温压条件排除不适配的配置，再比较观察需求、尺寸、连接及维护方式。FEP 的加工方式并不保证每一种成品管都比 PTFE 公差更小；PFA 的材料名称也不代表整套管路的洁净等级。比较时应使用各自的成品规格和同一验收条件。" },
      { type: "paragraph", text: "对脱气液体或溶解氧敏感的检测，应比较目标气体在相同壁厚、温度和管长条件下的表现。气体渗透、接头吸气和液体析气是不同问题，单纯更换管材不能替代对吸液段的排查。" },
    ] },
    { title: "FEP 管在仪器中用于哪些管段", tocLabel: "应用位置", blocks: [
      { type: "list", ordered: true, items: [
        "试剂瓶至泵阀的供液段：将介质兼容性、负压密封和吸液阻力一起检查，透明管便于观察初次充液。",
        "泵阀至取样针的连接段：结合单次输送量选择内径与管长，减少不必要的连接和滞留空间。",
        "清洗液输送段：同时检查清洗剂、使用浓度、冲洗温度及停机接触时间。",
        "分析仪器低压溶剂段：根据脱气位置与流量布置管路，检查气泡和溶剂接触后的尺寸、密封状态。",
      ] },
      { type: "paragraph", text: "普通 FEP 连接管不能直接替代蠕动泵滚轮压管。滚轮位置要求管壁持续压扁、恢复与耐疲劳，应使用与泵头匹配的专用泵管。FEP 管可以用于泵前、泵后连接段，连接位置和过渡接头需纳入液路设计。" },
    ] },
    { title: "FEP 管内径和长度怎样影响流阻与置换量", tocLabel: "尺寸与流阻", blocks: [
      { type: "paragraph", text: "内径决定通流截面，长度决定输送距离和液体停留体积。对于圆管中的充分发展层流，内径对压降的影响比长度更敏感：同样流量下，细管会带来更高压降；加大内径则增加充液和置换所需体积。" },
      { type: "formula", expression: "ΔP = 128μLQ / (πd⁴)；V = πd²L / 4", note: "ΔP 为压降，μ 为动力黏度，L 为管长，Q 为体积流量，d 为内径，V 为管内几何容积。适用于稳态、不可压缩牛顿流体在未明显变形圆管内的充分发展层流；接头损失、泵脉动与气泡另行评估。" },
      { type: "paragraph", text: "在相同长度下，内径从 0.5 mm 增大到 1.0 mm，理想层流液阻降至原来的 1/16，管内几何容积增至 4 倍。这是尺寸计算关系，不是材料性能差异。实际选型应把泵的可用压差、液体黏度、允许残留量与清洗程序放在一起判断。" },
      { type: "list", ordered: true, items: [
        "先确定目标流量、液体黏度和可用压差，估算管路内径。",
        "按设备布置确定管长，计算充液量与置换体积，并检查弯折处是否缩径。",
        "将接头、阀和过滤器的阻力加入系统检查，再用实际液路验证流量与置换结果。",
      ] },
      { type: "links", items: [{ label: "打开流阻计算器", href: "/resources/calculators/fluid-resistance/" }] },
    ] },
    { title: "FEP 管怎样配置翻边接头与定长管组件", tocLabel: "翻边与管组件", blocks: [
      { type: "paragraph", text: "FEP 管可以配成法兰翻边管组件，也可根据端口使用卡环或卡箍连接。翻边结构通过成型后的管端与配套垫圈、接头形成连接；卡环、卡箍结构具有各自的夹持和密封方式，不能仅凭螺纹相同就互换。" },
      tubingAssemblyFigure("fep", "恒永达 FEP 法兰翻边管组件实拍。管端翻边、垫圈与螺纹接头共同构成端部连接。"),
      { type: "list", ordered: true, items: [
        "确定管材、内径与外径。内径服务于流量和内部容积，外径与公差服务于连接配合。",
        "明确 A、B 两端接头、螺纹及端口密封面；核对翻边外形、垫圈和接头之间的装配关系。",
        "标注总长及测量基准，注明单端或双端翻边、弯曲路径和固定位置，避免长度标注与实际安装不一致。",
        "按装配要求完成连接，在工作压力、吸液负压及温度循环条件下验证密封和保持力。",
      ] },
      { type: "paragraph", text: "1/16 英寸外径等于 1.5875 mm，与 1.6 mm 接近但不完全相同。只有接头允许尺寸范围覆盖实际管径时，两者才能使用同一连接配置。紧固时也不能以增加扭矩弥补端口或尺寸不匹配。" },
      { type: "links", items: [{ label: "翻边管组件选型指南", href: "/resources/technical-articles/flanged-tubing-assemblies-selection-guide/" }, { label: "硬管接头选型指南", href: "/resources/technical-articles/hard-tube-fittings-selection-guide/" }] },
    ] },
    { title: "FEP 管的温度、压力和清洗条件怎样确定", tocLabel: "温压与清洗", blocks: [
      { type: "paragraph", text: "FEP 管的允许工作压力取决于管径、壁厚、温度和端部连接。应采用所选管材与接头组合的工作条件，不能把树脂耐温、室温爆破压力和组件使用压力混为一个指标。泵启停、阀切换与出口堵塞形成的峰值压力，也应包含在工况说明中。" },
      { type: "paragraph", text: "负压吸液还要检查管壁变形、局部折弯和接头吸气。正压下不漏液，不能替代负压状态下的密封检查；细管弯曲过急或固定夹压紧，同样会改变吸液表现。" },
      { type: "paragraph", text: "清洗或灭菌流程应明确介质、温度、接触时间和循环次数，并评价处理后的尺寸、机械状态及接液本底。不要将某一种处理方式下的材料表现延伸为全部成品管、接头和密封件都适用。" },
    ] },
    { title: "恒永达 FEP 管有哪些尺寸与配套形式", tocLabel: "恒永达规格", blocks: [
      { type: "paragraph", text: "恒永达 FEP 管按内径与外径组合选择型号，下表中的尺寸顺序为内径 × 外径。管径范围不能拆开任意组合，具体配置按对应型号选取。" },
      { type: "table", headers: ["型号", "内径 × 外径（mm）", "包装"], rows: examples },
      { type: "paragraph", text: "除卷管外，FEP 管还可配套法兰翻边、卡环和卡箍管组件。提交定制需求时，应把管长、两端连接、配合端口图纸和验收条件一起提供，便于将管材型号转为可装配的组件配置。" },
      { type: "links", items: [{ label: "查看 FEP 管规格并选择型号", href: "/products/tubing/fep-tubing/" }, { label: "查看管组件产品", href: "/products/tubing-assemblies/" }] },
    ] },
    { title: "FEP 管装机前的检查顺序", tocLabel: "装机检查", blocks: [
      { type: "list", ordered: true, items: [
        "核对型号、内外径、管长与批次，检查切口、管壁、翻边和外观。",
        "使用实际试剂与清洗液，按工作浓度、温度和接触时间验证材料相容性。",
        "按端口图纸装配，分别检查供液压力和吸液负压下的密封、保持力与管体变形。",
        "在实际照明和传感器条件下检查充液、气泡识别及液面观察效果。",
        "完成连续运行与清洗循环，复核流量、置换量、残留和端部状态。",
      ] },
      { type: "paragraph", text: "验收记录应与具体型号、组件图纸和使用条件对应。更改内径、管长、颜色或接头后，重新检查受影响的输送与检测项目。" },
    ] },
    { title: "继续了解其他仪器管材", tocLabel: "相关管材", blocks: [tubingSeriesLinks("fep")] },
  ],
  faqTitle: "FEP 管选型补充问题",
  faqItems: [
    { question: "定制 FEP 翻边管组件，需要提供哪些尺寸和接头信息？", answer: "需要提供 FEP 管的内径、外径、公差和颜色，注明单端或双端翻边，并明确两端接头、螺纹、垫圈及配合端口。组件长度应标明测量基准，区分管材切割长度与装配后的长度。两端配置不同时，应分别标注 A、B 端，同时提供介质、温度、压力或负压，以及尺寸和密封验收要求。" },
  ],
  cta: { title: "选择 FEP 细管与定长管组件", description: "提供介质、内外径、管长、流量、温压条件及两端端口图纸，恒永达可协助匹配管材与连接配置。", contactLabel: "联系工程师", productsLabel: "查看 FEP 管规格", productsHref: "/products/tubing/fep-tubing/" },
};
