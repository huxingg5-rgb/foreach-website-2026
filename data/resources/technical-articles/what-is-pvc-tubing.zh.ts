import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";
import { pvcTubingVariants } from "@/data/products/configurator/pvc-tubing";
import { tubingArticlePhoto, tubingSeriesLinks } from "./tubing-article-support";

const photo = tubingArticlePhoto("pvc");
const sampleVariants = [
  pvcTubingVariants.find(item => item.attributes.hardness === "55A" && item.attributes.innerDiameter === 1.6 && item.attributes.outerDiameter === 3.2)!,
  pvcTubingVariants.find(item => item.attributes.hardness === "55A" && item.attributes.innerDiameter === 1.6 && item.attributes.outerDiameter === 4.8)!,
  ...pvcTubingVariants.filter(item => item.attributes.hardness === "65A").slice(0, 2),
];
const examples = sampleVariants.map(item => [item.model, String(item.attributes.hardness),
  `${item.attributes.innerDiameter} × ${item.attributes.outerDiameter}`, String(item.result?.packaging)]);

export const pvcTubingCopy: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "什么是 PVC 管？仪器软管的硬度、尺寸与接头选型",
    seoTitle: "什么是 PVC 管？仪器软管、硬度与接头选型 | 恒永达 FOREACH",
    seoDescription: "了解仪器用柔性 PVC 管的材料与配方差异，区分连接软管和蠕动泵泵管，按硬度、内外径、壁厚、介质和倒刺接头配合选择清洗、供液与排液管路。",
    coverImage: photo.src, coverAlt: photo.alt,
  },
  deck: "仪器用 PVC 软管由聚氯乙烯配方加工而成，常用于需要柔性布管和液体观察的连接位置。选型时应把硬度、内外径、壁厚、介质和接头作为一组条件，区分普通连接软管与专用蠕动泵泵管。",
  leadBlocks: [
    { type: "paragraph", text: "仪器用 PVC 软管是由聚氯乙烯配方加工而成的柔性管材，常用于清洗液供给、水性介质输送和排液连接。柔性管体便于在仪器内部布置，透明配置则便于观察充液状态和气泡。" },
    { type: "paragraph", text: "PVC 软管可按设备所需长度裁切，并与倒刺接头等配套，组成供液、清洗或排液用的软管连接组件。软管的硬度、内径和壁厚共同影响弯曲、套接及连接保持力，应结合布管空间、输送介质和接头尺寸进行选择。" },
  ],
  sections: [
    { title: "PVC 软管是什么材料？为什么配方影响用途", tocLabel: "材料与配方", blocks: [
      { type: "paragraph", text: "PVC 是聚氯乙烯的英文缩写。柔性 PVC 管通过配方设计获得柔软性和加工性能，配方中的增塑体系及其他添加成分会影响硬度、介质接触表现和使用温度。因此，材料名称只能说明基础聚合物，不能代替具体管材型号。" },
      { type: "paragraph", text: "透明 PVC 软管便于观察充液、颜色变化和部分气泡，也便于布置到狭窄位置。透明度、弯曲能力和长期外观应按成品管检查，不能仅凭手感判断承压或耐化学性。" },
      { type: "figure", ...photo, width: 1500, height: 1500, caption: "恒永达透明柔性 PVC 管实拍，展示盘卷管体与管口。", captionHref: "/products/tubing/pvc-tubing/details/" },
      { type: "paragraph", text: "DEHP-free 与不含邻苯二甲酸酯并不是同一个含义：前者只针对 DEHP，不能据此推断所有邻苯二甲酸酯均被排除。若项目要求特定增塑体系或限制物质，应按具体型号核对对应的材料声明和检测范围。" },
    ] },
    { title: "55A、65A 硬度怎样影响 PVC 软管选择", tocLabel: "硬度与壁厚", blocks: [
      { type: "paragraph", text: "55A、65A 表示邵氏 A 硬度等级。数值较高表示在相同测试条件下对压入的抵抗更强，但硬度不等于壁厚、耐压或泵管寿命。相同硬度的两根管材，也会因为内外径不同而呈现不同的弯曲与装配手感。" },
      { type: "table", headers: ["序号", "检查项目", "对选型的影响"], rows: [
        ["1", "硬度", "影响装配手感、弯曲及夹持表现，需要与管径和配方一起比较"],
        ["2", "壁厚", "影响变形、弯折和接头配合，按内外径共同确定"],
        ["3", "布管半径", "弯曲过急会缩小通流截面，需按实际设备路径检查"],
        ["4", "温度", "影响软管机械状态，检查输送液、清洗液和机内温升"],
        ["5", "使用方式", "静态连接、反复移动与滚轮挤压属于不同任务，应分别验证"],
      ] },
      { type: "paragraph", text: "较软的管材便于弯曲和套接，但应检查负压吸瘪、夹持处变形与接头保持力。较硬的管材同样需要检查装配力和急弯处的缩径，不能简单地按“越软越好”或“越硬越耐压”选型。" },
    ] },
    { title: "PVC 连接软管与蠕动泵泵管有什么区别", tocLabel: "连接管与泵管", blocks: [
      { type: "paragraph", text: "连接软管主要承担输送、布管和密封；蠕动泵泵管还要在滚轮作用下反复压扁与回弹。泵管的材料配方、内径、壁厚、回弹和疲劳性能需要与泵头匹配，普通 PVC 连接管不能仅因材质相同就直接用于泵头。" },
      { type: "list", ordered: true, items: [
        "泵前、泵后连接段：优先检查介质相容性、内外径、吸液阻力、压力和接头密封。",
        "泵头压管段：采用泵头适配的专用泵管规格，核对壁厚、压管间隙、转速与使用方式。",
        "计量或长期运行：记录初期与运行后的流量、回弹状态、磨损和寿命，按实际结果设置更换周期。",
      ] },
      { type: "paragraph", text: "如果流量随着运行时间下降，应区分泵管疲劳、连接段吸瘪、滤器堵塞和接头吸气。仅增加转速不能替代原因排查，也不能将普通软管的硬度等级当作泵管适配证明。" },
    ] },
    { title: "PVC 软管用于哪些仪器管段", tocLabel: "应用与介质", blocks: [
      { type: "table", headers: ["液路位置", "选择重点", "运行检查"], rows: [
        ["清洗液供液段", "配方与清洗剂、浓度和温度匹配", "外观、尺寸、连接和清洗后残留"],
        ["水性介质连接段", "按具体介质选择软管与接头", "流量、气泡、负压变形和液体观察"],
        ["仪器排液段", "按全部废液组成和排放方式选材", "弯折、沉积、液位高度及出口堵塞"],
        ["需要拆装的连接位置", "软管内径、硬度和接头端部结构配合", "装配损伤、密封与抗拔出表现"],
      ] },
      { type: "paragraph", text: "废液管并不因为位于设备末端就可以忽略介质。混合废液会同时接触管材和接头，且停留时间较长；应按全部组分、浓度和清洗方式判断，避免只核对其中一种液体。" },
      { type: "paragraph", text: "有机溶剂、油类或高浓度清洗剂的适用性应逐项核对，不能把 PVC 配方视为统一耐化学材料。对析出、吸附或颗粒敏感的检测，还应比较接触前后的空白与目标物回收，材料相容并不代表检测本底合格。" },
    ] },
    { title: "PVC 管内外径与长度怎样确定", tocLabel: "尺寸与布管", blocks: [
      { type: "paragraph", text: "内径影响流量和内部容积，外径与内径共同确定壁厚。相同内径换用更大的外径，会增加壁厚，也会改变弯曲和套接表现，因此规格应写成内径 × 外径，不能只写一个“管径”。" },
      { type: "formula", expression: "壁厚 t = (D − d) / 2；管内体积 V = πd²L / 4", note: "D 为外径，d 为内径，L 为长度。流阻估算还要输入液体黏度与流量；软管明显变形或折弯后，应使用实际测量结果。" },
      { type: "paragraph", text: "以两种内径均为 1.6 mm 的管材为例，外径 3.2 mm 对应壁厚 0.8 mm，外径 4.8 mm 对应壁厚 1.6 mm。两者在相同长度下的几何容积相同，但软管变形、弯曲空间与接头装配条件不同，不能直接互换。" },
      { type: "list", ordered: true, items: [
        "按目标流量、液体黏度和可用压差选择内径，再计算充液和置换体积。",
        "按压力、负压、布管半径和连接方式核对外径与壁厚。",
        "按机内路径确定长度，避开锐边、夹压和热源，给维护拆装留出合理空间。",
        "在设备工作状态下检查急弯、固定点和吸液段，确认截面未明显收缩。",
      ] },
      { type: "links", items: [{ label: "用流阻计算器检查尺寸与压降", href: "/resources/calculators/fluid-resistance/" }] },
    ] },
    { title: "PVC 软管怎样匹配倒刺接头与快接接口", tocLabel: "接头匹配", blocks: [
      { type: "paragraph", text: "倒刺接头通常通过软管套入后的弹性变形实现配合，首先核对软管内径，再结合硬度、壁厚、倒刺外形和插入长度评价装配。接头标注的适配内径不等于任意同内径软管都具有相同密封和保持力。" },
      { type: "list", ordered: true, items: [
        "查清连接结构：倒刺端通常按软管内径配合；使用夹持管外径的插入式接头时，则核对外径、公差及所需支撑结构。",
        "区分快速断开接口与管端：快接总成本身用于插拔配对，连接软管的一端仍可能是倒刺，需按该管端结构选管。",
        "控制装配：保持切口整齐，按要求插入到位，避免划伤、过度拉伸和使用未验证的润滑剂。",
        "验证保持力与密封：检查工作压力、吸液负压、温度变化及受拉状态；需要夹箍时按具体结构配置。",
      ] },
      { type: "paragraph", text: "倒刺过大或强行套管会增加管口损伤和应力；配合过松则影响密封和抗拔出。接头周围也应保留直管段和支撑，避免管路弯曲或维护拉扯持续作用在连接根部。" },
      { type: "links", items: [{ label: "倒刺接头选型与连接方法", href: "/resources/technical-articles/what-is-a-barbed-fitting/" }, { label: "查看接头产品", href: "/products/fittings/" }] },
    ] },
    { title: "PVC 管的温度、清洗与使用状态怎样检查", tocLabel: "清洗与维护", blocks: [
      { type: "paragraph", text: "PVC 软管的使用温度和压力应按具体配方、尺寸及接头条件确定。不要把一个硬度等级直接换算成通用耐温值，也不要把室温下的短时试验当作长期运行条件。应同时记录工作液温度、清洗温度、机内热源和压力峰值。" },
      { type: "paragraph", text: "清洗或灭菌流程需要覆盖管材、接头与密封件。处理前后应检查颜色、透明度、硬度变化、尺寸、表面黏性、裂纹、密封和检测本底。不能通过随意加热来恢复老化软管，已经硬化、发黏、开裂或变形的管段应按维护要求更换。" },
      { type: "list", ordered: true, items: [
        "初次装机记录型号、批次、长度、接头与使用介质，建立可重复的装配和验收条件。",
        "运行中检查急弯、夹持点、负压段和接头根部，观察流量、气泡及渗漏变化。",
        "清洗后复查外观、尺寸和密封，对检测敏感管路复测本底与残留。",
        "按使用条件制定检查和更换周期，维修换管时核对配方、硬度及尺寸，避免仅按颜色替换。",
      ] },
    ] },
    { title: "恒永达 PVC 管怎样按硬度和尺寸选型", tocLabel: "恒永达规格", blocks: [
      { type: "paragraph", text: "恒永达 PVC 管的选型维度包括 55A、65A 硬度，以及内径和外径。以下列出部分配置，展示硬度、尺寸和包装之间的对应关系；完整组合可在产品选型页查询。" },
      { type: "table", headers: ["型号", "硬度", "内径 × 外径（mm）", "包装"], rows: examples },
      { type: "paragraph", text: "建立 BOM 时保留完整型号、商品编码、硬度和包装单位。与倒刺接头配套时，同时提供接头型号或端部图纸，以及介质、温度、压力或负压、布管半径和拆装要求，便于把管材与连接条件一起匹配。" },
      { type: "links", items: [{ label: "查看 PVC 管完整规格与选型", href: "/products/tubing/pvc-tubing/" }] },
    ] },
    { title: "继续了解其他仪器管材", tocLabel: "相关管材", blocks: [tubingSeriesLinks("pvc")] },
  ],
  faqTitle: "PVC 软管选型补充问题",
  faqItems: [
    { question: "PVC 软管配倒刺接头，除了内径还要看哪些参数？", answer: "还要看软管的外径、壁厚、硬度和配方，以及接头的倒刺外径、轮廓和有效插入长度。相同内径的软管，套接后的变形、贴合和保持状态也会因这些参数不同而变化。选型时应结合介质、温度、压力或负压及布管受力情况，装配后检查插入深度、管口状态、密封和抗拔出表现，不能仅凭套接时的松紧手感判断是否合格。" },
  ],
  cta: { title: "选择 PVC 软管与配套接头", description: "提供介质、硬度、内外径、管长、温压条件和接头要求，恒永达可协助匹配仪器软管配置。", contactLabel: "联系工程师", productsLabel: "查看 PVC 管规格", productsHref: "/products/tubing/pvc-tubing/" },
};
