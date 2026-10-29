import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";
import { pfaTubingVariants } from "@/data/products/configurator/pfa-tubing";
import { tubingArticlePhoto, tubingAssemblyFigure, tubingSeriesLinks } from "./tubing-article-support";

const photo = tubingArticlePhoto("pfa");
const examples = pfaTubingVariants.map(item => [item.model, item.productCode,
  `${item.attributes.innerDiameter} × ${item.attributes.outerDiameter}`, String(item.result?.packaging)]);

export const pfaTubingCopy: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "什么是 PFA 管？材料性能、洁净度与仪器液路选型",
    seoTitle: "什么是 PFA 管？性能、FEP 区别与管组件选型 | 恒永达 FOREACH",
    seoDescription: "了解 PFA 管在试剂输送、样品前处理和清洗液路中的选型方法，区分材料耐化学性与成品洁净度，比较 PFA、FEP、PTFE，并核对尺寸、温压、管端加工与接头配置。",
    coverImage: photo.src, coverAlt: photo.alt,
  },
  deck: "PFA 管是由可熔融加工的全氟烷氧基聚合物制成的氟塑料管材。用于分析仪器液路时，应同时核对介质相容性、管内体积、连接方式与检测本底，将材料选择落实到完整管组件。",
  leadBlocks: [
    { type: "paragraph", text: "PFA 管是由全氟烷氧基聚合物制成的氟塑料管材，具有较广的耐化学范围，并可通过熔融挤出加工成细管。在分析仪器中，PFA 管用于试剂输送、样品前处理和清洗液路，连接储液容器、泵阀及检测相关部件。" },
    { type: "paragraph", text: "PFA 细管也可按设备接口和布管长度制成定长管组件，配套法兰翻边、卡环或卡箍连接。对于关注检测本底和样品残留的液路，应把管材、接头和清洗过程作为完整接液路径一起考虑，同时根据输送量与端口结构确定管径和组件配置。" },
  ],
  sections: [
    { title: "PFA 管是什么材料？与 PTFE 的加工差异", tocLabel: "材料与加工", blocks: [
      { type: "paragraph", text: "PFA 属于全氟烷氧基聚合物，由四氟乙烯与全氟烷基乙烯基醚类单体共聚而成。它保留了全氟聚合物较广的耐化学范围，同时具备熔融加工能力，可以通过挤出工艺制成细管。" },
      { type: "paragraph", text: "PFA 与 PTFE 不是同一种材料。PTFE 细管常采用糊状挤出和烧结，PFA 则可进行熔融挤出。加工方式不同，会影响工艺选择与管端成型方法；具体公差、表面质量和机械性能仍应使用对应成品管的数据。" },
      { type: "paragraph", text: "PFA 管可呈透明或半透明外观，观察效果取决于管径、壁厚、颜色和照明。外观透明度不能用来判断树脂等级、洁净度或耐压，更不能替代材料和批次记录。" },
    ] },
    { title: "PFA、FEP 与 PTFE 管怎样按工况比较", tocLabel: "管材比较", blocks: [
      { type: "table", headers: ["序号", "比较项目", "选择方法"], rows: [
        ["1", "介质相容性", "把试剂、清洗液及停机残液一起列出，按浓度、温度和接触时间筛选三种材料"],
        ["2", "温压组合", "使用具体管径和接头的允许工作条件，分别检查持续运行与压力峰值"],
        ["3", "观察需求", "比较实际管样中的液面、颜色和气泡可视性，不只比较材料名称"],
        ["4", "检测本底", "在相同接触液、时间和检测方法下比较空白、析出与吸附表现"],
        ["5", "装配与维护", "比较端口适配、管端工艺、布管半径及重复装配后的密封"],
      ] },
      { type: "paragraph", text: "FEP 与 PFA 都可以熔融加工；PTFE、FEP 与 PFA 均需要落实到具体成品规格。温度要求较高的项目，应优先审查对应温度下的管材和连接额定条件；重视液面观察的项目，应直接比较管样。不要把“PFA 更高级”作为替代这些检查的理由。" },
      { type: "paragraph", text: "同样的材料也会因壁厚、长度和接头而呈现不同的流阻、气体渗透与密封状态。若现有 FEP 或 PTFE 管路已经满足介质、检测和寿命要求，更换为 PFA 时仍应明确要改善的指标，并在相同条件下验证。" },
    ] },
    { title: "PFA 管的洁净度怎样评价", tocLabel: "洁净度与残留", blocks: [
      { type: "paragraph", text: "耐化学性描述材料在介质中的适用性，洁净度则与树脂、挤出加工、清洗、包装和装配接触有关。PFA 材料名称本身不是高纯、零析出或低检测本底的证明。对痕量分析，应把洁净度要求写成能测量的验收项目。" },
      { type: "list", ordered: true, items: [
        "先确定目标指标：根据检测方法选择金属元素本底、有机物本底、颗粒、目标物吸附或交叉残留等项目。",
        "建立空白对照：比较原始试剂空白、管材接触后的液体，以及经过接头、泵阀和整套管路后的系统空白。",
        "固定接触条件：记录介质组成、浓度、温度、时间和接触面积；不同条件的结果不能直接用于材料排名。",
        "验证清洗与恢复：按设备实际清洗程序检查冲洗体积、恢复时间和下一份样品的残留。",
        "管理批次与装配：保留材料、管材批次、清洗和包装记录，并控制切管与接头安装过程中的污染。",
      ] },
      { type: "paragraph", text: "对于痕量元素检测，可将 PFA 管作为接液材料进行筛选，但空白最终由整条液路决定。只更换管材而保留不适配的接头、清洗液或容器，不能解决系统本底问题。" },
    ] },
    { title: "PFA 管用于哪些仪器液路任务", tocLabel: "应用位置", blocks: [
      { type: "table", headers: ["液路任务", "PFA 管的选型重点", "装机检查"], rows: [
        ["分析仪器试剂供液", "介质相容性、小口径输送与端口配合", "吸液阻力、气泡与接头负压密封"],
        ["样品前处理连接", "样品和清洗介质共同接触时的适用性", "空白、吸附、置换和交叉残留"],
        ["痕量分析接液段", "与检测方法对应的材料与洁净度要求", "材料空白、连接空白和系统空白"],
        ["清洗或冲洗管路", "清洗剂、温度和循环次数", "处理后的尺寸、密封与本底变化"],
      ] },
      { type: "paragraph", text: "这些任务按具体工况确定配置，不等同于某一型号的通用适用声明。在带蠕动泵的分析系统中，应区分泵头内的反复压管段与泵前、泵后的连接段；普通 PFA 细管不能直接作为滚轮压管使用。" },
      { type: "paragraph", text: "对光敏试剂，应根据目标波段、光照时间及管路暴露位置设计遮光；透明管便于观察，但不能同时当作遮光措施。对脱气液体，应缩短不必要的暴露管长，并检查接头吸气和溶解气体变化。" },
    ] },
    { title: "PFA 管怎样确定内外径、壁厚与长度", tocLabel: "尺寸与内部容积", blocks: [
      { type: "paragraph", text: "选择内径时，同时考虑流量和残留体积；选择外径时，同时考虑接头配合和壁厚。外径不变时，加大内径会减少壁厚，因此相同外径并不代表相同的承压和端部加工条件。" },
      { type: "formula", expression: "壁厚 t = (D − d) / 2；管内体积 V = πd²L / 4", note: "D 为外径，d 为内径，L 为长度。管内体积是几何值；实际清洗置换量还与混合、连接死体积和清洗程序有关。" },
      { type: "paragraph", text: "以外径 1.6 mm 的管材作几何比较，内径 0.5 mm 与 1.0 mm 对应壁厚分别为 0.55 mm 与 0.30 mm；长度均为 1 m 时，管内体积约为 0.196 mL 与 0.785 mL。这个差异说明，同一外径下的内径选择会同时影响置换量和管壁结构。" },
      { type: "paragraph", text: "在稳态、不可压缩牛顿流体的充分发展层流条件下，圆管液阻与内径四次方成反比。提高流量或输送黏度更高的试剂时，应重新计算压降，并加入阀、过滤器、接头及高度差的影响，避免仅按设备接口外径选管。" },
      { type: "links", items: [{ label: "计算管径、长度与液路压降", href: "/resources/calculators/fluid-resistance/" }] },
    ] },
    { title: "PFA 管组件怎样配接头与管端结构", tocLabel: "接头与实物组件", blocks: [
      { type: "paragraph", text: "恒永达 PFA 管可配套法兰翻边、卡环和卡箍管组件。选用哪一种结构，取决于配合端口、管径、密封方式和装配要求。法兰翻边结构应核对成型后的管端及垫圈配合；卡环、卡箍结构则按各自的密封和夹持要求装配。" },
      tubingAssemblyFigure("pfa", "恒永达 PFA 法兰翻边管组件实拍。透明管体与螺纹端接构成定长管组件，管径、长度及两端连接按图配套。"),
      { type: "list", ordered: true, items: [
        "明确 A、B 两端连接，包括接头型号、螺纹、密封面和所需垫圈，避免把螺纹尺寸当作完整接口定义。",
        "标注管内外径、公差、成品长度及长度基准，注明直管段、弯曲路径和固定位置。",
        "按端口要求检查管端加工与装配，避免切口不齐、偏心、过度压紧或管端缩径。",
        "将管材、接头、密封件视为一个组件，验证工作温压、负压密封和重复装配后的状态。",
      ] },
      { type: "paragraph", text: "1.6 mm 与 1/16 英寸并不是完全相同的尺寸。即使接头能够套入或螺纹能够旋合，也要核对允许管径、端口深度和密封位置，才能确定配套关系。" },
      { type: "links", items: [{ label: "查看管组件配置", href: "/products/tubing-assemblies/" }, { label: "硬管接头选型指南", href: "/resources/technical-articles/hard-tube-fittings-selection-guide/" }] },
    ] },
    { title: "PFA 管的温压与长期运行怎样验证", tocLabel: "温压与运行验证", blocks: [
      { type: "paragraph", text: "树脂耐温不能直接作为管组件的工作温度，室温爆破压力也不能作为长期运行压力。应按所选管径、管长和端接结构，核对工作温度下的允许压力与持续时间，并覆盖阀切换、泵启停和堵塞等压力变化。" },
      { type: "paragraph", text: "聚合物管材在持续载荷和温度作用下会发生尺寸变化，管端夹持和密封应力也会随之改变。长期运行评价应包含保压、温度循环、管路固定、接头保持力及清洗循环后的复检。不能通过额外拧紧来替代结构匹配。" },
      { type: "list", ordered: true, items: [
        "建立工况表：工作液、清洗液、温度、流量、连续压力、峰值压力和吸液负压。",
        "检查装配件：记录型号、尺寸、端口及紧固方法，按同一流程制作样件。",
        "验证运行：在组件允许条件内测量密封、流量、气泡、置换及检测本底。",
        "复核运行后状态：检查管端形变、松动、泄漏与检测结果，并将验收条件写入配置要求。",
      ] },
    ] },
    { title: "恒永达 PFA 管的型号与尺寸", tocLabel: "恒永达规格", blocks: [
      { type: "paragraph", text: "恒永达 PFA 管提供外径 1.6 mm 的细管配置，内径按 0.5、0.8、1.0 mm 选择。以下型号、商品编码和包装与官网选型数据对应。" },
      { type: "table", headers: ["型号", "商品编码", "内径 × 外径（mm）", "包装"], rows: examples },
      { type: "paragraph", text: "选择卷管时，保留型号和包装单位；选择定长组件时，补充管长、两端连接图纸、使用工况和检测要求。对洁净度有明确要求的项目，应在需求中直接列出目标检测方法与验收指标。" },
      { type: "links", items: [{ label: "查看 PFA 管完整规格与选型", href: "/products/tubing/pfa-tubing/" }] },
    ] },
    { title: "继续了解其他仪器管材", tocLabel: "相关管材", blocks: [tubingSeriesLinks("pfa")] },
  ],
  faqTitle: "PFA 管选型补充问题",
  faqItems: [
    { question: "PFA 管组件图纸中的长度从哪里量？", answer: "应从图纸指定的两个基准位置测量。管材切割长度指加工装配前的下料长度；组件装配总长指装配后指定外端之间的长度；密封面间距则指两端指定密封面之间的距离。这三种长度不能混用。图纸应标明长度类型、测量基准和公差；弯曲布管还应注明是沿管路中心线计量，还是测量两个位置之间的直线距离。" },
  ],
  cta: { title: "匹配 PFA 管与仪器端口", description: "提供介质、尺寸、管长、温压条件、两端图纸及检测本底要求，恒永达可协助核对管材和管组件配置。", contactLabel: "联系工程师", productsLabel: "查看 PFA 管规格", productsHref: "/products/tubing/pfa-tubing/" },
};
