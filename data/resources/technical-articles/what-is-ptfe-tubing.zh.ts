import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";
import { ptfeTubingVariants } from "@/data/products/configurator/ptfe-tubing";
import { getTubingMaterialCopy } from "@/data/products/tubing/content";
import { getTubingGallery } from "@/data/products/tubing/gallery";
import { tubingAssemblyFigure, tubingSeriesLinks } from "./tubing-article-support";

// Product facts come from the current catalogue. Material background is not an
// assembly rating. Evidence and FAQ selection are recorded in the task report.
const productCopy = getTubingMaterialCopy("ptfe-tubing", "zh")!;
const photo = getTubingGallery("ptfe-tubing")![0];
const examples = ["436013-th1", "436011-th1", "436094-th2", "439093-th2"].map(id => {
  const variant = ptfeTubingVariants.find(item => item.id === id);
  if (!variant) throw new Error(`Missing PTFE article configuration: ${id}`);
  return [variant.model, `${variant.attributes.innerDiameter} × ${variant.attributes.outerDiameter}`,
    String(variant.attributes.color), String(variant.result?.packaging)];
});

export const ptfeTubingCopy: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "什么是 PTFE 管？聚四氟乙烯管的性能、局限与仪器液路选型",
    seoTitle: "什么是 PTFE 管？性能、耐温耐压与选型 | 恒永达 FOREACH",
    seoDescription: "了解 PTFE 聚四氟乙烯管在仪器试剂、清洗和溶剂管路中的用途，区分材料耐温与组件耐压，比较 PTFE 与 PEEK，并按内外径、流阻、冷流、气体渗透和接头条件完成选型。",
    coverImage: photo.src,
    coverAlt: photo.alt.zh,
  },
  deck: "PTFE 管是聚四氟乙烯制成的氟聚合物管材，用于仪器试剂、清洗液和溶剂等液路的材料选型。选择时应把介质相容性、内外径、温压条件和接头配合作为一组要求，兼顾输送、密封与内部容积。",
  leadBlocks: [
    { type: "paragraph", text: "PTFE 管是由聚四氟乙烯制成的氟塑料管材，具有较广的耐化学范围和较低的表面能。在分析仪器和实验室设备中，PTFE 细管用于试剂、清洗液及溶剂输送，连接试剂瓶、泵阀和取样针等液路部件。" },
    { type: "paragraph", text: "在仪器配套中，PTFE 细管也常按指定长度加工，并配置法兰翻边、卡环或卡箍结构及两端接头，制成定长管组件。管径与管长影响液路阻力和内部容积，管端结构则与设备接口配套，选型时应将管材、尺寸和连接方式一起考虑。" },
  ],
  sections: [
    { title: "PTFE 管是什么材料？聚四氟乙烯管怎样加工", tocLabel: "材料与加工", blocks: [
      { type: "paragraph", text: "PTFE 是聚四氟乙烯的英文缩写，其分子结构赋予材料较广的耐化学范围和较低的表面能。仪器管路选型时，应明确写出 PTFE 材质、型号、内外径和使用条件，将材料要求落实到具体成品管。" },
      { type: "paragraph", text: "PTFE 在熔化后仍具有很高的熔体黏度，细管常采用糊状挤出工艺：细粉与加工助剂混合并预成型，挤出管坯，再去除助剂并烧结。烧结用于使颗粒结合形成成品；不能因为原料细粉具有孔隙，就把普通成品管等同于多孔过滤膜或膨体 PTFE。" },
      { type: "paragraph", text: "树脂牌号、挤出和烧结条件会影响尺寸、外观及渗透表现。因此，“同为 PTFE”并不代表公差、透明度、弯曲性能和连接效果完全相同。需要粘接或管端加工时，应使用经确认的表面处理、机械连接或专用成型工艺，不能照搬普通热塑料的热熔装配方法。" },
      { type: "figure", src: photo.src, alt: photo.alt.zh, width: 1500, height: 1500,
        caption: "恒永达 PTFE 管材实物图。管材照片用于辨认外观；尺寸、颜色和包装按具体型号选择。", captionHref: "/products/tubing/ptfe-tubing/details/" },
    ] },
    { title: "PTFE 管有哪些优点和局限？先看它对液路的影响", tocLabel: "性能与局限", blocks: [
      { type: "table", headers: ["材料或成品特征", "对仪器液路的价值", "选型时的边界"], rows: [
        ["较广的耐化学范围", "可用于多种试剂、清洗液和溶剂的材料筛选", "核对介质组成、浓度、温度和接触时间，也要核对接头与密封件"],
        ["低表面能、低固体摩擦系数", "有利于降低某些黏附问题", "不等于对所有样本零吸附，也不能直接推导液体压降低"],
        ["较宽的材料耐温范围", "适合进入有温度要求的候选材料清单", "树脂耐温不是成品管和连接组件的共同额定值"],
        ["长期受载可能蠕变", "可通过合适的夹持及端接结构使用", "长期压紧后密封应力可能变化，需要验证保持力和密封"],
        ["存在气体渗透", "常规输送可按允许气体负荷评估", "除气液体和氧敏感检测要考虑管长、壁厚、温度及停留时间"],
        ["常见本色管呈乳白、半透明至不透明", "可按用途选择本色或其他颜色配置", "能否看清气泡、能否避光，均要对实际样品验证"],
      ] },
      { type: "paragraph", text: "PTFE 的低摩擦系数通常描述固体接触时的摩擦，不是管内液体流阻的计算参数。对圆管中的充分发展层流，压降首先取决于黏度、流量、管长和内径。检测样本的残留还与界面吸附、接头死体积、清洗程序及停留时间有关，不能仅凭“不粘”承诺低残留。" },
    ] },
    { title: "PTFE 管能耐多少温度和压力？材料数据与组件额定值怎样区分", tocLabel: "温度与耐压", blocks: [
      { type: "paragraph", text: "PTFE 管的使用温度应与压力、介质和持续时间一起确定。树脂耐温不能直接作为管组件的额定温度；管壁在持续载荷下的表现，以及接头、卡套和密封件的限制，共同决定管路的使用范围。选型时应核对所选型号在实际温度下的允许工作条件。" },
      { type: "paragraph", text: "PTFE 管没有适用于全部尺寸的统一耐压值。固定外径时，内径增加会使壁厚减小；材料、温度和制造条件相同时，承压能力通常随之降低。爆破压力描述特定试验条件下的破坏点，不能当作连续工作压力。外部加强层或特殊结构也会改变表现，耐压应与具体型号和端接组合对应。" },
      { type: "table", headers: ["核对项目", "需要的条件或资料", "设计判断"], rows: [
        ["连续与峰值压力", "正常输送、阀切换、出口堵塞等状态", "全部工况处于组件允许范围内"],
        ["温度与持续时间", "液体温度、机内温升、清洗及保温时间", "使用对应温度的允许工作条件，不能把两个单独最大值叠加"],
        ["负压吸液", "实际负压、壁厚、弯曲半径和管路支撑", "检查吸瘪、折弯缩径及接头吸气；正压试验不能完全替代"],
        ["连接与重复装配", "管外径、公差、端口结构、装配方法及复装次数", "以管材和端接组合确认密封、保持力及寿命"],
      ] },
      { type: "paragraph", text: "对于 HPLC 等高压液路，应选择有相应工作压力资料的管材和连接组件。PEEK 或不锈钢可以进入候选，但“换成 PEEK”本身不构成耐压验证；仍要匹配内外径、温度、介质和接头。" },
    ] },
    { title: "PTFE 管适合仪器的哪些位置？试剂、清洗与废液管段的区别", tocLabel: "仪器应用位置", blocks: [
      { type: "table", headers: ["管段或任务", "采用 PTFE 的考虑", "需要优先检查的项目"], rows: [
        ["试剂瓶至泵阀的供液段", "按介质兼容性筛选耐化学管材", "吸液阻力、负压密封、液面高度和停留时间"],
        ["清洗液和消毒液连接", "兼顾输送液及清洗介质", "最高使用浓度、清洗温度及长期接触后的管端状态"],
        ["色谱或样本前处理的低压溶剂段", "兼顾溶剂接触与小口径布管", "脱气位置、气体重新进入和泵吸液表现"],
        ["混合废液排放段", "评估不同废液对管路的影响", "混合物兼容性、沉积、出口高度和堵塞时压力"],
        ["泵、阀、取样针或芯片间连接", "可按流量和内部容积匹配尺寸", "内径与长度、端口死体积、接头几何和管端加工"],
      ] },
      { type: "paragraph", text: "这些是液路设计中的候选位置，并非同一种 PTFE 配置可以覆盖所有仪器。微流控接口常按外径选择连接件，细管能插入并不代表能够密封；当芯片只适配弹性软管时，需要按接口要求配置过渡结构。" },
      { type: "paragraph", text: "普通 PTFE 仪器连接管不应直接作为蠕动泵滚轮压管。该位置需要反复压扁后可靠回弹，必须选择泵厂确认的弹性管或专用复合泵管；PVC、硅胶等也需要具体泵管等级与工况依据。" },
    ] },
    { title: "PTFE 管与 PEEK、FEP、PFA 管怎么选？先确定压力与观察需求", tocLabel: "管材比较", blocks: [
      { type: "paragraph", text: "PTFE 与 PEEK 的取舍不只在于“软还是硬”。PTFE 常进入耐化学低压输送的候选，PEEK 常进入需要更高刚性和有额定压力依据的小口径连接的候选。二者都应先通过介质相容性筛选，再核对整套连接条件。" },
      { type: "table", headers: ["判断维度", "PTFE 管", "PEEK 管"], rows: [
        ["压力和尺寸", "按具体壁厚、温度及端接组合确认", "可用于有明确高压额定值的配置，不把高压能力泛化至全部型号"],
        ["介质", "耐化学范围较广，但仍有特殊介质及工况限制", "浓硫酸、浓硝酸等需排除或专项核查；THF、DMSO、二氯甲烷等存在管材溶胀风险"],
        ["机械连接", "关注长期压紧下的蠕变与保持力", "关注刚性、弯曲半径及管端对密封组件的作用"],
        ["温度", "材料耐温不能代替组件额定值", "同样按成品管及连接件的温压组合核对"],
        ["典型液路任务", "试剂、清洗、溶剂和废液等经确认的输送段", "经额定条件确认的分析仪器小口径连接段"],
      ] },
      { type: "paragraph", text: "需要观察液面或气泡时，可评估 FEP、PFA 等更利于观察的管材，并结合壁厚、颜色和照明确认实际可视性。对气体渗透敏感时，应按目标气体及同等几何、温度和流量条件比较数据，不能笼统认为 FEP、PFA 在任何情况下都比 PTFE 更不透气。材料改变也不自动消除接头吸气或液体析气。" },
      { type: "links", items: [
        { label: "PTFE 管材详情与尺寸", href: "/products/tubing/ptfe-tubing/details/" },
        { label: "PEEK 管材详情", href: "/products/tubing/peek-tubing/details/" },
        { label: "FEP 管材详情", href: "/products/tubing/fep-tubing/details/" },
        { label: "PFA 管材详情", href: "/products/tubing/pfa-tubing/details/" },
      ] },
    ] },
    { title: "PTFE 管内径和长度怎么定？同时计算压降与内部容积", tocLabel: "内径与流阻", blocks: [
      { type: "paragraph", text: "先给出目标流量、液体黏度、可用压力和管路长度，再选择内径。对稳态、不可压缩牛顿流体在刚性圆管中的充分发展层流，可用 Hagen–Poiseuille 关系估算沿程压降。该计算不包含接头局部损失、入口效应、泵脉动或气泡，也不能直接套用于非牛顿液体或已明显变形的管路。" },
      { type: "formula", expression: "ΔP = RQ = 128μLQ / (πd⁴)；V = πd²L / 4", note: "ΔP 为压降（Pa），R 为液阻（Pa·s/m³），μ 为动力黏度（Pa·s），L 为管长（m），Q 为体积流量（m³/s），d 为内径（m），V 为管内几何容积（m³）。" },
      { type: "paragraph", text: "以理论算例说明：黏度取 1 mPa·s、管长 1 m、流量 1 mL/min，内径 0.5 mm 时沿程压降约 10.9 kPa，几何容积约 0.196 mL；内径改为 1.0 mm 时，压降约 0.68 kPa，容积约 0.785 mL。这意味着扩大内径可以明显降低压降，同时增加需要置换的液体体积。以上是理想圆管计算，并非恒永达产品实测。" },
      { type: "paragraph", text: "若内径 0.5 mm 的假设公差为 ±0.025 mm，在黏度和长度相同的条件下，液阻相对标称值约变化 −18% 至 +23%。这不是恒永达管材的公差声明，而是说明内径误差为何值得核对。在恒压驱动中它会影响流量；在计量泵系统中则还要结合泵的工作点、阀动作、管路弹性和气泡判断，不能把液阻偏差直接当作加样误差。" },
      { type: "links", items: [{ label: "用流阻计算器估算管路压降", href: "/resources/calculators/fluid-resistance/" }] },
    ] },
    { title: "PTFE 管怎样配接头？冷流、外径公差与管端结构一起检查", tocLabel: "接头与冷流", blocks: [
      { type: "paragraph", text: "连接件通常按管外径及其允许公差配合；内径影响流阻和容积，外径、壁厚和材料状态则参与密封及夹持。1/16 英寸等于 1.5875 mm，与 1.6 mm 接近但并不相等，只有连接件的允许范围覆盖实际尺寸时才能作为同一配套条件使用。螺纹能旋入也不代表端口锥面、平底面或密封位置匹配。" },
      { type: "paragraph", text: "PTFE 在持续压紧下可能发生蠕变，管端形状和密封应力会随时间变化。拧得更紧不一定更可靠：过度挤压可能造成局部缩径、管壁损伤或装配后保持力不稳定。应按所选接头的装配说明控制切口、插入深度、紧固方式和支撑，完成保压、负压及重复装配验证。需要复紧时也应遵循组件要求，不能把定期拧紧作为通用维护方案。" },
      { type: "paragraph", text: "对于定长管组件，图纸要同时标出管材、内外径、总长及长度基准、两端接头、螺纹、管端加工方式和布管要求。翻边、卡环与卡箍等结构的密封方式不同，不能只提交一个螺纹规格就认为整套连接已经确定。" },
      tubingAssemblyFigure("ptfe", "恒永达 PTFE 法兰翻边管组件实拍，展示管体、螺纹接头和端面垫圈。定长组件按管径、长度及两端端口配套。"),
      { type: "links", items: [
        { label: "硬管接头选型指南", href: "/resources/technical-articles/hard-tube-fittings-selection-guide/" },
        { label: "接头产品入口", href: "/products/fittings/" },
        { label: "定制管路组件", href: "/products/tubing-assemblies/" },
      ] },
    ] },
    { title: "PTFE 管会带来气泡或残留吗？怎样区分渗透、漏气与析气", tocLabel: "气泡与洁净度", blocks: [
      { type: "paragraph", text: "气体可以穿过聚合物管壁，渗透与气体种类、分压差、温度、壁厚和暴露面积有关。除气后的液体在较长管段内停留，可能重新吸收气体；吸入气体也不一定立即形成可见气泡。普通成品 PTFE 的气体渗透与多孔膜的贯通孔流动应区分，不能仅凭出现气泡就判定管壁有孔或漏液。" },
      { type: "paragraph", text: "排查时可先在允许工况内缩短吸入管，并用相同内径和长度的对照管段比较；再独立检查接头负压密封、液位和温度变化。如果气泡随接头重新装配显著改变，应优先检查接头吸气；若升温或吸液负压增大后出现气泡，应同时评估液体析气。需要控制溶解氧时，应直接测量相关指标，不能只靠肉眼看气泡。" },
      { type: "paragraph", text: "低吸水性和耐化学性也不等于零析出、零吸附。对痕量分析或易吸附样本，选定树脂、颜色及清洗条件后，应比较空白液、接触后液体和冲洗后样品。更换颜色或批次时，重新检查与检测方法有关的本底和残留；黑色管的避光效果还要按目标波段及管壁条件验证。" },
      { type: "links", items: [{ label: "材料兼容性筛选入口", href: "/resources/material-compatibility/" }] },
    ] },
    { title: "恒永达 PTFE 管有哪些规格？型号、颜色与包装要怎样核对", tocLabel: "恒永达规格", blocks: [
      { type: "paragraph", text: productCopy.intro[1] },
      { type: "paragraph", text: "下表列出部分配置，数值顺序为内径 × 外径，单位为 mm。选型时按完整型号核对尺寸、颜色和包装，TH1、TH2 系列分别对应具体配置。" },
      { type: "table", headers: ["型号", "内径 × 外径（mm）", "颜色", "包装"], rows: examples },
      { type: "paragraph", text: "相同内外径可能对应不同系列、颜色或包装。下单和建立 BOM 时应同时保留完整型号、商品编码及包装单位；100 ft 等于 30.48 m，不等于 100 m。目录中的透明颜色配置只是具体型号记录，不能推广为全部 PTFE 管的外观或气泡检测能力。" },
      { type: "links", items: [{ label: "查看 PTFE 管完整规格并选择型号", href: "/products/tubing/ptfe-tubing/" }] },
    ] },
    { title: "PTFE 管打样后怎样验证？从尺寸到长期运行的检查顺序", tocLabel: "样机验证", blocks: [
      { type: "list", ordered: true, items: [
        "核对型号、颜色、批次和包装，测量内外径及长度，检查切口、弯折和表面损伤；公差采用该配置的确认要求。",
        "用实际试剂及清洗液做接触验证，记录浓度、温度和时间，关注外观、尺寸、质量及检测本底变化。",
        "按实际接头装配，在已确认的组件允许条件内检查静态密封、动态压力变化和吸液负压表现。",
        "在目标流量和实际布管状态下测量压降、出液量、置换时间及气泡，必要时与理论计算和对照管路比较。",
        "经过预定的连续运行、温度循环和维护装配后，再检查密封、管端变形、保持力和检测结果，形成可追溯的验收记录。",
      ] },
      { type: "paragraph", text: "选型的目标是让材料、尺寸和连接共同满足设备任务。向恒永达提交介质及浓度、内外径、管长、流量、温度、工作及峰值压力或负压、接头和布管图后，可以进一步核对候选型号与管组件配置；最终适用性应由约定条件下的样机验证确认。" },
    ] },
    { title: "继续了解其他仪器管材", tocLabel: "相关管材", blocks: [tubingSeriesLinks("ptfe")] },
  ],
  faqTitle: "PTFE 管选型补充问题",
  faqItems: [
    { question: "选择避光试剂用的黑色 PTFE 管，需要明确哪些条件？", answer: "需要明确试剂的避光要求、光源及照射时间、试剂在管内的停留时间，以及管材的尺寸和壁厚。管组件还应检查接头、过渡管段等位置的遮光情况。黑色外观不能单独作为遮光性能的依据，应结合对应管材的透光资料，或在实际使用条件下评价目标试剂的稳定性。" },
    { question: "定制 PTFE 管组件，除了内外径还需要提供什么信息？", answer: "还需要提供管长、长度测量基准及公差，A、B 两端的接头型号、螺纹、密封结构和管端加工要求，并说明输送介质、清洗液、温度、流量、工作压力及吸液负压。对于空间受限或弯曲布管的设备，还应提供布管图和固定位置。仅提供螺纹规格不足以确定连接，配合端口和密封面也需要明确。" },
  ],
  cta: {
    title: "需要为仪器液路选择 PTFE 管与接头？",
    description: "提供介质及浓度、内外径、管长、流量、温度、压力或负压和端接要求，恒永达可协助核对型号与管组件配置。",
    contactLabel: "联系工程师", productsLabel: "查看 PTFE 管规格", productsHref: "/products/tubing/ptfe-tubing/",
  },
};
