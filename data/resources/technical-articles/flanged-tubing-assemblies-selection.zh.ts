import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";
import { flangedTubingFaq } from "./flanged-tubing-assemblies-faq.intl";
export { flangedTubingAssembliesSlug } from "./technical-article-availability";

const imageRoot = "/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide";

// Product scope: FOREACH fittings catalog A02, pp. 6–9, and supplied assembly photographs.
// HF, HF6, HFL and HFL6 dimensions checked against the six model-linked website drawings on 2026-10-12.
export const flangedTubingAssembliesCopy: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "翻边管组件如何选型？从密封结构、接口匹配到装机验证",
    seoTitle: "翻边管组件选型：密封结构、接口匹配与装机验证 | FOREACH",
    seoDescription: "了解翻边管组件的密封结构，对比HF、HF6、HFL、HFL6四种平底接头的材料、管径、外形尺寸与前端避空，核对M6×1、1/4-28 UNF接口，确定定制配置及装机验证要求。",
    coverImage: `${imageRoot}/assembly-photo.png`,
    coverAlt: "FOREACH 翻边管组件实物，不同接头与管端翻边的组合",
  },
  deck: "翻边管组件的选型，需要同时确定管材与内外径、两端接头、配套垫片、端口结构和安装尺寸。先确认翻边能在平底端口中正确受压，再确定限位件、管标和装机验证要求。",
  leadBlocks: [
    { type: "paragraph", text: "在分析仪器和自动化液路中，连接泵、阀或液路模块的管组件既要输送介质，也要满足密封、布管和维护更换的要求。一根管能够接上设备，只完成了连接的一部分；管端翻边、垫片和接收端口的配合，决定了压紧力能否作用在正确的密封位置。" },
    { type: "paragraph", text: "对于已有翻边接口的设备，应先核对原组件与端口图纸；对于新的 OEM 液路，则应结合管路走向、端口间距及维护方式确定配置。下面按组件结构、材料尺寸、接头选择和装机检查的顺序说明。" },
    { type: "figure", src: `${imageRoot}/assembly-photo.png`, alt: "多种 FOREACH 翻边管组件实物及其端部连接形式", width: 2760, height: 1217, caption: "翻边管组件实物。接头、管材和端部配置需要按实际流路与设备接口配套选择。" },
  ],
  sections: [
    {
      title: "翻边管组件由哪些部分组成，怎样建立密封？",
      blocks: [
        { type: "paragraph", text: "管端经过预成型后，形成向外展开的法兰翻边。装配时，螺纹接头提供轴向压紧力，通过配套垫片支撑并压紧翻边，使其与匹配的平底端口密封面贴合。因此，螺纹连接与端面密封需要分别确认：螺纹能够旋入，并不代表翻边已经贴合端口底面。" },
        { type: "figure", src: `${imageRoot}/flanged-sealing-structure.png`, alt: "标滚平底接头、垫片与管端法兰翻边的位置关系", width: 2064, height: 996, caption: "HF 标滚平底接头的装配示例：垫片位于接头前端与管端翻边之间。图中 20.5 mm 总长、8.2 mm 头部外径与 2 mm 前端避空属于 HF；四种接头的完整对照见下文。" },
        { type: "paragraph", text: "翻边管组件可选 HF、HF6、HFL、HFL6 四种平底接头。HF 与 HFL 属于标滚平底接头，HF6 与 HFL6 属于紧凑平底接头；它们采用配套垫片压紧管端翻边，但头部尺寸、总长、通孔和前端结构不同。选型需要落实到具体系列与型号，不能用上图的一组尺寸代表全部接头。" },
        { type: "paragraph", text: "完整的预制组件还可以配置限位件和管标。选型时，先区分各零件的作用，再确定哪些配置需要纳入交付图纸。" },
        { type: "table", headers: ["组成部分", "主要作用", "需要确认的内容"], rows: [
          ["管材与管端翻边", "输送介质，并由成型后的管端参与端面密封", "材料、内外径、管长、单端或双端翻边及成型尺寸"],
          ["螺纹接头", "连接端口并提供轴向压紧力", "系列、材料、螺纹、通孔与安装空间"],
          ["垫片", "支撑翻边并传递压紧力", "材料、内外径、厚度及与接头的配套关系"],
          ["O 圈／限位管", "限制接头沿管路滑动", "是否配置、安装位置及允许的活动范围"],
          ["管标", "识别流路、端口或装配位置", "标识内容、方向、位置及两端对应关系"],
        ] },
        { type: "figure", src: `${imageRoot}/assembly-components.png`, alt: "双端翻边管组件的接头、垫片、限位件、硬管及可选管标配置", width: 3012, height: 1280, caption: "双端组件配置示例。图中的管径组合和零件选项需要按两端接口分别核对，并非所有选项可以任意组合。" },
        { type: "paragraph", text: "图中接头后方的 O 圈或限位管用于限制滑动，不能据此把它当作接收端口的密封圈。两端接口不同时，接头和垫片也应分别确认，不能默认左右端使用相同配置。" },
      ],
    },
    {
      title: "管材、接头材料和管径应该怎样分别确定？",
      blocks: [
        { type: "paragraph", text: "材料选型应从介质名称、浓度、工作温度、接触时间和清洗流程开始。FOREACH 翻边管组件的管材可选 FEP、PTFE；接头本体和垫片则有各自的材料与规格范围。接头本体材料不能直接代表整个组件的接液材料，应根据实际结构识别介质接触的表面。" },
        { type: "table", headers: ["部件", "已列配置", "选择时的边界"], rows: [
          ["管材", "FEP、PTFE", "材料兼容性与翻边加工适用性分别确认"],
          ["HF／HF6 接头本体", "PEEK、PVDF、PPS", "按具体型号核对材料、螺纹与接管外径组合"],
          ["HFL 接头本体", "PVDF", "按具体螺纹、管径与颜色配置选择"],
          ["HFL6 接头本体", "M6×1、1/4-28 UNF 的已列配置为 PPS；6-40 UNF 的已列小规格为 PEEK", "不同螺纹和规格的材料不能互相套用"],
          ["配套垫片", "SUS、PEEK、PTFE，按规格提供", "核对内径、外径和厚度；并非每个规格都有全部材料"],
        ] },
        { type: "figure", src: `${imageRoot}/fitting-materials.png`, alt: "PEEK、PVDF 和 PPS 平底接头本体的外观示例", width: 1856, height: 837, caption: "接头本体材料示例。颜色用于识别外观，材料应以型号和交付资料为准；同一种材料也可能有不同颜色。" },
        { type: "paragraph", text: "尺寸说明应把管内径、管外径和接头通孔分开。管内径与管长影响流阻和内部容积；管外径决定接头、垫片和加工工具的配合；接头通孔则需要为指定外径的管材提供合适的安装空间。三者不应使用同一个“管径”名称含糊带过。" },
        { type: "paragraph", text: "当前组件资料列有 1.6、2.0、2.5、3.0、3.2 mm 管外径，内径应与外径成对确定。例如配置图中的 0.8 × 1.6 mm 表示内径 × 外径，不能把这两个数都当成接头适配外径。具体组合还需与所选管材及成型要求匹配。" },
        { type: "paragraph", text: "管材能够耐受目标介质，并不意味着任意壁厚都适用同一种翻边工艺。加工前需要确认工具、材料及内外径的适用范围，成型后检查端部完整性和通道状态。管长也应在图纸中约定测量基准，例如两端密封面之间的长度，避免把下料长度与成品装配长度混用。" },
      ],
    },
    {
      title: "HF、HF6、HFL、HFL6 四种平底接头，怎样选择？",
      blocks: [
        { type: "paragraph", text: "四种平底接头均有 M6×1 与 1/4-28 UNF 配置，选型时先核对螺纹、管外径和材料，再比较头部直径、轴向长度及前端结构。下面的尺寸对应官网所挂载的系列图纸，单位均为 mm；尺寸不包含管端翻边与垫片，也不等于装入端口后露出的长度。" },
        {"type":"figure","src":"/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide/hf-dimensions.png","alt":"HF 接管外径 1.6 至 2.0 mm 规格尺寸剖面图，头部外径 8.2 mm，总长 20.5 mm","width":858,"height":1152,"caption":"HF 标滚平底接头：左侧为 PEEK 本色与 PPS 黑色外观，右侧为接管外径 1.6–2.0 mm 规格尺寸图。单位：毫米。","productViews":[{"src":"/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pk-n-main.jpg","alt":"HF 标滚平底接头 PEEK 本色外观"},{"src":"/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-ps-b-main.jpg","alt":"HF 标滚平底接头 PPS 黑色外观"}]},
        {"type":"figure","src":"/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide/hf6-dimensions.png","alt":"HF6 接管外径 1.6 至 2.0 mm 规格尺寸剖面图，头部外径 6.4 mm，总长 17.6 mm","width":928,"height":1152,"caption":"HF6 紧凑平底接头：左侧为 PEEK 本色与 PPS 黑色外观，右侧为接管外径 1.6–2.0 mm 规格尺寸图。单位：毫米。","productViews":[{"src":"/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pk-n-main.jpg","alt":"HF6 紧凑平底接头 PEEK 本色外观"},{"src":"/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-ps-b-main.jpg","alt":"HF6 紧凑平底接头 PPS 黑色外观"}]},
        {"type":"figure","src":"/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide/hfl-appearance-dimensions.png","alt":"HFL 标滚平底接头黑色与本色外观及尺寸剖面图，头部外径 10 mm，总长 16.5 mm","width":2374,"height":1429,"caption":"HFL 标滚平底接头：黑色与本色外观及尺寸剖面。头部外径 10 mm，总长 16.5 mm，图示前端外径 4.7 mm 对应 M6 版本。单位：毫米。"},
        {"type":"figure","src":"/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide/hfl6-m6-dimensions.png","alt":"HFL6-M6-16 紧凑平底接头尺寸剖面图，头部外径 6 mm，总长 20 mm","width":566,"height":1041,"caption":"HFL6 紧凑平底接头：PPS 黑色外观与 M6、接管外径 1.6 mm 规格尺寸图。头部外径 6 mm，总长 20 mm。单位：毫米。","productViews":[{"src":"/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-16-ps-b-main.jpg","alt":"HFL6-M6-16 紧凑平底接头 PPS 黑色外观","reverse":true}]},
        { type: "table", headers: ["系列", "头部外径／总长", "接管外径", "接头本体材料"], rows: [
          ["HF 标滚平底接头", "8.2／20.5", "1.6–2.0、2.5、3.0–3.2，分三档", "PEEK、PVDF、PPS"],
          ["HF6 紧凑平底接头", "6.4／17.6", "1.6–2.0、2.5、3.0–3.2，分三档", "PEEK、PVDF、PPS"],
          ["HFL 标滚平底接头", "10／16.5", "1.6、2.0、2.5、3.0、3.2，按外径分别选型", "PVDF"],
          ["HFL6 紧凑平底接头", "6／20", "1.6、2.0、2.5、3.0、3.2，按外径分别选型", "PPS；此行对应 M6 与 U28 版本"],
        ] },
        { type: "subheading", title: "HF：标滚结构，按三档管外径选择" },
        { type: "paragraph", text: "HF 的头部外径为 8.2 mm，总长为 20.5 mm，前端有 2 mm 无螺纹避空段。三档接管外径分别为 1.6–2.0、2.5 和 3.0–3.2 mm，对应图纸通孔为 2.2、2.7 和 3.4 mm。可在 PEEK、PVDF、PPS 本体之间按具体型号选择；安装前需检查头部周围的旋拧空间与后方出管空间。" },
        { type: "links", items: [{ prefix: "对应图纸：", href: "/assets/products/fittings/hard-tube-fittings/2d-drawings/hf-standard-flat-bottom.pdf", label: "HF 平底接头尺寸图（M6／1/4-28 UNF）" }] },
        { type: "subheading", title: "HF6：比 HF 更细、更短的紧凑结构" },
        { type: "paragraph", text: "HF6 的头部外径为 6.4 mm，总长为 17.6 mm，比 HF 分别减小 1.8 mm 和 2.9 mm；管径分档、本体材料及 2 mm 前端避空与相应 HF 系列一致。当相邻端口较密或轴向空间有限时，可将 HF6 作为候选，再检查实际端口间距、旋拧操作和拆卸空间。紧凑外形并不构成承压能力更高的依据。" },
        { type: "links", items: [{ prefix: "对应图纸：", href: "/assets/products/fittings/hard-tube-fittings/2d-drawings/hf6-compact-flat-bottom.pdf", label: "HF6 平底接头尺寸图（M6／1/4-28 UNF）" }] },
        { type: "subheading", title: "HFL：较短本体，头部需要更大的径向空间" },
        { type: "paragraph", text: "HFL 的头部外径为 10 mm，总长为 16.5 mm，前端避空为 1 mm。它比 HF 轴向更短，但头部更宽；用于靠近壳体或密集端口的位置时，需要分别核对轴向和径向空间。官网图纸列出 PVDF 本色与黑色配置，接管外径按 1.6、2.0、2.5、3.0、3.2 mm 分别选型，不能沿用 HF 的三档管径分组。" },
        { type: "links", items: [
          { prefix: "对应图纸：", href: "/assets/products/fittings/hard-tube-fittings/2d-drawings/hfl-m6.pdf", label: "HFL-M6 尺寸图" },
          { href: "/assets/products/fittings/hard-tube-fittings/2d-drawings/hfl-u28.pdf", label: "HFL-U28 尺寸图" },
        ] },
        { type: "subheading", title: "HFL6：细长结构，优先检查径向间距与轴向余量" },
        { type: "paragraph", text: "HFL6 的 M6 与 U28 图纸均标注头部外径 6 mm、总长 20 mm，所列本体材料为 PPS。它的径向尺寸小于另外三种，但总长比 HF6 和 HFL 更长，因此不能把“紧凑”理解为各方向都最小。图纸未标注 HF／HF6 那样的 2 mm 前端无螺纹段，端口配合应按 HFL6 自身的前端结构核对。" },
        { type: "paragraph", text: "HFL6 接管外径为 1.6、2.0、2.5、3.0、3.2 mm 时，图纸通孔名义尺寸依次为 1.8、2.2、2.7、3.2、3.4 mm。另有 HFL6-U40-16-PK-N 小规格，采用 6-40 UNF 螺纹、PEEK 本体并适配 1.6 mm 管外径；该型号的安装尺寸应单独确认，不适用上表 M6／U28 的尺寸。" },
        { type: "links", items: [
          { prefix: "对应图纸：", href: "/assets/products/fittings/hard-tube-fittings/2d-drawings/hfl6-m6.pdf", label: "HFL6-M6 尺寸图" },
          { href: "/assets/products/fittings/hard-tube-fittings/2d-drawings/hfl6-u28.pdf", label: "HFL6-U28 尺寸图" },
        ] },
        { type: "subheading", title: "从接头系列落实到管组件配置" },
        { type: "list", ordered: true, items: [
          "先核对设备端口的完整螺纹及平底密封结构，再选择相应系列。M6 与 U28 型号不能互换。",
          "按实际管外径选规格，同时核对通孔及公差。通孔是装管空间，不是管内径，也不是管组件的流道直径。",
          "用头部外径检查相邻接头的干涉，再用总长、装入深度及出管方向检查轴向空间，并预留操作余量。",
          "按接头、管径和端口匹配垫片的材料、内外径及厚度，确认翻边的支撑与压紧位置。",
        ] },
        { type: "paragraph", text: "官网筛选栏中的“标准卡箍接头”和“紧凑卡箍接头”属于其他连接结构。本文四种平底接头指 HF、HF6、HFL、HFL6，不能把筛选栏中的四个分类都当作翻边组件的平底接头方案。既有组件替换时应同时核对系列前缀、图纸版本与端口结构。" },
      ],
    },
    {
      title: "为什么螺纹能够旋入，翻边管组件仍可能漏液？",
      blocks: [
        { type: "paragraph", text: "首先核对完整螺纹规格。M6×1 与 1/4-28 UNF 属于不同规格，不能根据外观接近或能够试拧几圈判断兼容。然后检查端口底面的形状、深度和状态，确认它为当前翻边结构提供了匹配的密封接触面。" },
        { type: "paragraph", text: "对本文所示平底翻边连接，接收端口需要有符合图纸要求的平底密封面。若底孔保留不匹配的锥面，翻边可能无法按设计贴合，出现泄漏或局部残留。与此同时，接头前端、垫片厚度和翻边尺寸会共同影响装配位置，应检查是否在建立有效压紧前就发生了其他部位的干涉。" },
        { type: "figure", src: `${imageRoot}/fitting-front-clearance.png`, alt: "图示平底接头前端的 2 mm 无螺纹避空段", width: 1348, height: 466, caption: "HF／HF6 图纸标注的前端避空段为 2 mm；HFL 为 1 mm，HFL6 的 M6／U28 图纸未标注同类避空段。这些接头尺寸不能直接当作接收端口内螺纹的加工尺寸。" },
        { type: "table", headers: ["核对部位", "图示或配套要求", "装配时如何理解"], rows: [
          ["接头前端", "HF／HF6：2 mm；HFL：1 mm；HFL6 的 M6／U28 图纸未标注同类避空段", "各系列分别核对，不统一套用 2 mm"],
          ["前端直径", "HF／HF6／HFL 的 M6 图纸为 4.7 mm，U28 图纸为 5.1 mm", "这是前端几何尺寸，不是螺纹公称直径，也不是接管外径；不套用于 HFL6"],
          ["接收端口内部", "该类组件的配套加工说明要求内螺纹避空位高度≤1 mm", "与接头前端尺寸分别标注、分别核对，不能混用"],
          ["端口底面", "符合配套图纸的无锥度平底密封面", "检查平面形状、污染、划伤和实际密封接触位置"],
          ["垫片与翻边", "按接头、管径和端口匹配尺寸", "确认安装顺序、零件完整性及压紧位置"],
        ] },
        { type: "paragraph", text: "上述避空要求适用于对应组件和端口设计，不能扩大为所有翻边接头的通用加工标准。对接已有阀体或液路模块时，应提供接收端口剖面图，而不只是一个螺纹名称。" },
      ],
    },
    {
      title: "装配后渗漏，怎样区分零件与安装问题？",
      blocks: [
        { type: "paragraph", text: "渗漏时应先检查接口和零件，再调整装配。持续增加拧紧力可能使塑料翻边产生永久变形，也可能掩盖端口不匹配的问题。安装方法和锁紧扭矩应按具体接头、管材和组件要求执行，不能给所有型号套用同一个数值。" },
        { type: "figure", src: `${imageRoot}/flanged-end-detail.png`, alt: "两种翻边管组件端部的实物特写，可见接头前端、垫片和翻边", width: 1745, height: 897, caption: "端部实物检查应关注翻边、垫片和接头前端的配合。照片用于展示结构，密封是否合格仍需在规定条件下验证。" },
        { type: "list", ordered: true, items: [
          "核对接头型号、管外径、垫片规格与接收端口图纸，排除混装。",
          "检查翻边是否偏斜、开裂或变形，通道是否受到成型或压紧的影响。",
          "检查垫片是否遗漏、装错或损伤，以及端口密封面是否存在划伤和异物。",
          "按规定方法装配，观察旋转接头时是否带动管体扭转。",
          "恢复实际布管状态，排除管长不足、急弯、拉力和侧向力，再按设备工况复测。",
        ] },
        { type: "paragraph", text: "若组件在装配台上正常、装入设备后才发生泄漏，应重点检查管路走向和外部载荷；若问题集中在某一端口，应优先核对该端的零件组合与密封面。这样更容易区分接口匹配、零件状态和布管条件造成的问题。" },
      ],
    },
    {
      title: "样件需要完成哪些装机验证？",
      blocks: [
        { type: "paragraph", text: "一次静态密封检查只能覆盖当时的装配和测试条件。用于仪器的翻边管组件，还应在实际管长、布管和工作节拍下确认表现，并把验收条件写入交付要求。" },
        { type: "table", headers: ["验证项目", "检查内容"], rows: [
          ["尺寸与装配", "管长基准、两端零件配置、端口间距、工具空间及安装后的弯曲状态"],
          ["运行密封", "实际正压或负压、温度和压力变化下的密封表现"],
          ["介质与清洗", "接触实际试剂和清洗液后，管材、翻边及密封状态是否发生变化"],
          ["维护拆装", "按设备规定的次数和方法拆装，检查翻边、垫片和重新连接后的密封"],
          ["批次一致性", "按约定图纸检查材料、尺寸、外观、标识和测试记录"],
        ] },
        { type: "paragraph", text: "测试压力、持续时间、允许泄漏量及拆装次数，应由设备要求和已确认的组件方案共同确定。接头或管材的单件参数不能直接当作完整组件的承压、寿命或重复使用保证。" },
      ],
    },
    {
      title: "定制翻边管组件，需要提供哪些信息？",
      blocks: [
        { type: "paragraph", text: "向 FOREACH 提交需求时，可以将一根管组件的两端分别标为 A 端和 B 端，逐项列出接头、螺纹、垫片和端口要求。单端或双端翻边、管长、限位件及管标内容可结合项目配置，实际可交付组合以确认后的图纸与产品资料为准。" },
        { type: "list", ordered: true, items: [
          "介质：试剂与清洗液名称、浓度、温度、接触时间及运行方式。",
          "管材：FEP 或 PTFE、内径 × 外径、颜色要求、成品管长及测量基准。",
          "A／B 两端：接头系列、材料、完整螺纹规格、垫片要求及接收端口图纸。",
          "安装：管路走向、端口间距、弯曲空间及维护拆卸方式。",
          "识别：是否配置限位件、管标内容、打印方向与安装位置。",
          "验收：尺寸公差、外观、清洁度、运行密封及维护拆装的检查要求。",
        ] },
        { type: "paragraph", text: "已有组件替换项目还应附上原组件照片，并说明具体问题，例如管长不足、安装不便、维护后渗漏或批次差异。将问题对应到结构和工况后，才能判断需要调整的是管材、接头、垫片，还是加工与装配要求。" },
        { type: "links", items: [{ prefix: "继续阅读：", href: "/resources/technical-articles/hard-tube-fittings-selection-guide/", label: "微流体硬管接头选型指南：法兰、卡箍、卡环与管组件" }] },
      ],
    },
  ],
  faqTitle: "常见问题",
  faqItems: flangedTubingFaq["zh-CN"],
  cta: {
    title: "需要确认翻边管组件与设备接口的配套？",
    description: "提供管材、内径 × 外径、成品管长、两端接头及端口图纸，并说明介质、温度、压力、限位件和管标要求，便于确定候选配置与验证项目。",
    contactLabel: "联系我们",
    productsLabel: "查看硬管接头",
    productsHref: "/products/fittings/hard-tube-fittings/",
  },
};

export const flangedTubingAssembliesNavigation = [
  { id: "sealing", label: "组件与密封" },
  { id: "materials", label: "材料与管径" },
  { id: "selection", label: "四种平底接头" },
  { id: "ports", label: "端口与避空" },
  { id: "leak-check", label: "装配与渗漏" },
  { id: "verification", label: "装机验证" },
  { id: "inquiry", label: "定制信息" },
];
