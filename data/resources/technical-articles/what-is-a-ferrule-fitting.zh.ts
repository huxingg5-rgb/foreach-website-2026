import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";
import { FITTING_PUBLISHED_PRODUCTS } from "@/data/products/selection/fitting-publication.generated";
import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import { ferruleFittingSlug } from "./technical-article-availability";
import en from "./ferrule-fitting-locales/en.json";
import es from "./ferrule-fitting-locales/es.json";
import fr from "./ferrule-fitting-locales/fr.json";
import ko from "./ferrule-fitting-locales/ko.json";
import ru from "./ferrule-fitting-locales/ru.json";

export { ferruleFittingSlug } from "./technical-article-availability";
const imageRoot = "/images/resources/technical-articles/hard-tube-fittings-selection-guide";
const productsHref = "/products/fittings/hard-tube-fittings/?structure=ferrule";
const featuredModels = ["HN-M6-16-PV-N", "HN6-M6-16-PV-N", "HNF-M6-16-PV-N", "HNF6-M6-16-PS-B"] as const;
const featuredProducts = featuredModels.map(model => {
  const product = FITTING_PUBLISHED_PRODUCTS.find(item => item.foreachModel === model);
  if (!product) throw new Error(`Missing ferrule article product: ${model}`);
  return product;
});

// Evidence: fittings catalogue A02, pp.14–19; current published SKU records.
// A02 p.15 says CL-0 for HNF/HNF6, while p.16's table says CL-0X.
// Do not resolve that conflict by inference. No definitive HNF ferrule BOM is published here.
// A02 p.14 torque values in in-lb and N.m disagree; no numerical torque is republished.
export const ferruleFittingCopy: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "什么是卡箍接头？结构原理、型号区别与选型方法",
    seoTitle: "什么是卡箍接头？结构原理、型号区别与选型方法 | FOREACH",
    seoDescription: "了解微流体卡箍接头的组成与密封原理，比较 HN、HN6、HNF、HNF6 系列及翻边连接，掌握端口、管径、材料、配套卡箍与安装维护的选型要点。",
    coverImage: `${imageRoot}/ferrule-fittings-photo.png`,
    coverAlt: "FOREACH 黑色、蓝色及本色卡箍接头与独立卡箍实拍",
  },
  deck: "卡箍接头通过螺纹接头压紧卡箍，实现无需翻边的硬管连接。恒永达 HN、HN6、HNF、HNF6 系列适配 1.6、2.0、2.5、3.0、3.2 mm 管外径，提供 M6×1、1/4-28 UNF 螺纹及多种本体材料，可用于分析仪器和实验室自动化设备的试剂输送、样本处理及清洗液路。",
  leadBlocks: [
    { type: "paragraph", text: "卡箍接头是一种用于微流体硬管连接的螺纹式接头，在相关产品资料中也有卡套接头、免翻边接头等叫法。它由接头本体和配套卡箍组成，通过旋紧接头压紧卡箍，夹持管材并与接收端口配合形成密封，管端无需预先翻边。它可用于分析仪器和实验室自动化设备中的试剂输送、样本处理及清洗液路，连接管路与泵、阀或液路模块。" },
    { type: "paragraph", text: "恒永达（FOREACH）提供 HN、HN6、HNF、HNF6 四类卡箍接头，包含标滚和紧凑两种外形，适配 1.6、2.0、2.5、3.0、3.2 mm 管外径，螺纹规格包括 M6×1 和 1/4-28 UNF，对应平底接收端口。以 HN6 为例，头部外径为 6.4 mm、总长为 15.5 mm；其他系列的外形尺寸按各自图纸选择。" },
    { type: "paragraph", text: "材料方面，HN、HN6 接头本体提供 PEEK、PVDF、POM、PPS 配置，HNF 本体采用 PVDF，HNF6 本体采用 PPS；配套卡箍另有 PP、ETFE 材料配置。根据管外径、介质和安装空间选择相应的接头与卡箍组合，可满足不同仪器液路的装配需求，具体材料与规格以对应型号为准。" },
    { type: "figure", src: `${imageRoot}/ferrule-fittings-photo.png`, alt: "FOREACH 黑色、蓝色及本色卡箍接头与独立卡箍实拍", width: 1846, height: 1245, caption: "卡箍接头及配套零件实拍。不同系列的卡箍应按具体型号配套，不能仅凭外形相似混装。" },
  ],
  sections: [
    {
      title: "什么是卡箍接头？",
      blocks: [
        { type: "paragraph", text: "本文所说的卡箍接头，是用于仪器微流体硬管连接的螺纹式接头。它由接头本体与独立卡箍配合使用：管材穿过接头和卡箍后进入设备端口，旋紧接头建立压紧力。这里的“卡箍”是套在管外的密封与夹持零件，不是套在软管外侧的金属抱箍，也不是卫生级管路中的快装卡箍。" },
        { type: "paragraph", text: "与翻边管端不同，卡箍连接使用平切管端，省去了预先形成法兰翻边的工序。但免翻边并不等于任意管材都能直接安装：管外径、切口质量、卡箍尺寸和接收端口仍需要匹配。" },
        { type: "table", headers: ["组成部分", "在连接中的作用", "需要核对的内容"], rows: [
          ["螺纹接头本体", "与设备端口连接，向卡箍传递压紧力", "系列、螺纹、通孔、材料及安装空间"],
          ["配套卡箍", "受压后夹持管外壁，并参与密封", "型号、适配管外径、材料、方向及安装要求"],
          ["管材", "输送介质，管外壁与卡箍接触", "内外径、外径公差、材料、壁厚和切口状态"],
          ["接收端口", "为螺纹连接和密封接触提供配合位置", "螺纹规格、底面形状、深度及密封面状态"],
        ] },
        { type: "paragraph", text: "HN、HN6、HNF、HNF6 在本文中的讨论范围为 M6×1 或 1/4-28 UNF 平底端口配置。其他结构、其他螺纹或专用高压接头，应按各自的图纸与装配要求判断。" },
      ],
    },
    {
      title: "卡箍接头如何实现密封？",
      blocks: [
        { type: "paragraph", text: "装配时，先将接头与匹配的卡箍按规定方向套入平切管材，使管端处于要求的位置，再把组件送入匹配的接收端口。接头旋入后产生轴向压紧力，卡箍在配合结构中受压，夹持管外壁并与端口密封面配合。有效连接依赖这些部位共同到位，而不是单靠螺纹摩擦。" },
        { type: "figure", src: `${imageRoot}/ferrule-connection-structure-zh.png`, alt: "HN6 紧凑卡箍接头、卡箍和管材的位置及接头尺寸剖面", width: 2010, height: 1022, caption: "HN6 紧凑卡箍连接示例。右侧 6.4 mm 头部外径与 15.5 mm 总长对应图示 HN6，不代表所有卡箍接头；管端位置和卡箍方向须按配套说明核对。" },
        { type: "paragraph", text: "如果管端没有保持在规定位置，或者卡箍装反、管径不匹配，接头可能已经产生明显的拧紧阻力，但密封部位仍未正确贴合。此时继续加力不能替代配套检查，还可能使卡箍或管端产生过度变形。" },
        { type: "paragraph", text: "因此，确认连接时要分开检查两个问题：螺纹是否正确啮合，以及卡箍与管材、端口是否在正确位置形成密封。M6×1 与 1/4-28 UNF 是不同规格，不能用“能试拧几圈”作为兼容依据，也不应通过增加生料带或螺纹胶来补偿密封结构不匹配。" },
      ],
    },
    {
      title: "HN、HN6、HNF、HNF6 有什么区别？先看螺纹长度与安装空间",
      blocks: [
        { type: "paragraph", text: "恒永达 HN、HN6、HNF、HNF6 卡箍接头的区别，除了外形和材料，还包括螺纹段长度、本体总长及配套卡箍结构。这些差别会影响接头与设备端口的安装配合，因此，即使螺纹规格和适配管外径相同，也需要分别核对尺寸。" },
        { type: "subheading", title: "螺纹段相差 2.4 mm，安装时要核对哪些位置？" },
        { type: "paragraph", text: "HN、HN6 的螺纹段长度为 8.1 mm，HNF、HNF6 为 10.5 mm，两组相差 2.4 mm。这里的长度指头部或肩部至接头前端的轴向尺寸，需要与接收端口深度、内螺纹位置和配套卡箍的压紧位置共同核对。" },
        { type: "table", headers: ["系列", "外形", "螺纹段长度", "本体总长"], rows: [
          ["HN", "标滚", "8.1 mm", "18.1 mm"],
          ["HN6", "紧凑", "8.1 mm", "15.5 mm"],
          ["HNF", "标滚", "10.5 mm", "16.5 mm"],
          ["HNF6", "紧凑", "10.5 mm", "20.0 mm"],
        ] },
        { type: "paragraph", text: "螺纹段长度不同，意味着接头与端口的轴向配合需要重新核对，不能直接理解为 HNF、HNF6 装入同一端口后一定深 2.4 mm。实际装入深度还取决于端口与卡箍的装配位置；有效啮合长度则是安装后内、外螺纹实际配合的部分。管端在端口内的位置也应按配套装配要求确认。" },
        { type: "paragraph", text: "选型时，应确认接头能够在卡箍正确就位的情况下完成压紧，并保持满足设计要求的螺纹啮合。对于带肩部的接头，如果肩部提前抵住设备表面，而卡箍尚未充分压紧，就可能出现“已经拧不动，但连接仍未密封”的情况。遇到这种情况，应检查尺寸配合，继续加大锁紧力不能解决位置不匹配。" },
        { type: "paragraph", text: "以下剖面图与分解示意图展示接头、卡箍、管材与接收端口的相对位置，用于理解完整连接的组成。图示不代表上表各型号的尺寸或实际装入深度，具体配合应以对应图纸为准。" },
        { type: "figure", src: `${imageRoot}/ferrule-port-section.png`, alt: "卡箍连接剖面示意：接头本体、管材、卡箍与接收端口的相对位置", width: 513, height: 1332, caption: "卡箍连接剖面示意：管材穿过接头本体与卡箍，卡箍与接收端口配合。" },
        { type: "figure", src: `${imageRoot}/ferrule-connection-exploded.png`, alt: "卡箍连接分解示意：A 管材、B 接头本体、C 卡箍、D 接收端口", width: 1190, height: 1269, caption: "卡箍连接分解示意：A 管材，B 接头本体，C 卡箍，D 接收端口。" },
        { type: "subheading", title: "紧凑外形与本体总长，要分别比较" },
        { type: "figure", src: `${imageRoot}/ferrules-and-fittings-photo.png`, alt: "恒永达独立卡箍与不同外形卡箍接头的组合实拍", width: 2425, height: 1092, caption: "左侧为独立卡箍，右侧为接头本体与卡箍实拍。具体尺寸及配套关系以对应型号图纸为准。" },
        { type: "paragraph", text: "本体总长主要用于评估轴向安装空间，还应结合装入深度确认安装后的外露高度。HN6 的总长为 15.5 mm，比 HN 的 18.1 mm 短；HNF6 虽采用紧凑外形，总长为 20.0 mm，却比 HNF 的 16.5 mm 更长。因此，端口密集时要比较头部直径，轴向空间受限时要比较总长、装配后外露高度以及旋拧和布管空间。" },
        { type: "subheading", title: "再确认管径档位、材料与配套卡箍" },
        { type: "table", headers: ["系列", "结构与本体材料", "管径选择的特点"], rows: [
          ["HN 标滚卡箍接头", "提供 PEEK、PVDF、POM、PPS 配置", "接头本体分 1.6 mm 与 2.0–3.2 mm 两档；卡箍仍按实际管外径分别选择"],
          ["HN6 紧凑卡箍接头", "提供 PEEK、PVDF、POM、PPS 配置", "与 HN 一样区分接头本体管径档位和卡箍的具体管外径"],
          ["HNF 标滚卡箍接头", "当前代表性在售型号采用 PVDF", "按 1.6、2.0、2.5、3.0、3.2 mm 管外径分别选型"],
          ["HNF6 紧凑卡箍接头", "当前代表性在售型号采用 PPS", "按 1.6、2.0、2.5、3.0、3.2 mm 管外径分别选型"],
        ] },
        { type: "paragraph", text: "例如，HN 与 HN6 的“32”档本体用于 2.0、2.5、3.0、3.2 mm 管外径范围，但这不表示一个卡箍可以适配这四种管径。选用 2.5 mm 管材时，仍需选择匹配 2.5 mm 外径的卡箍。HNF 与 HNF6 则按具体管外径区分接头规格，不能套用 HN 的档位规则。" },
        { type: "subheading", title: "配套卡箍要确认到完整型号" },
        { type: "paragraph", text: "HN、HN6 配套使用 CL-0X 卡箍，并按管外径区分 16、20、25、30、32 等规格。CL-0 与 CL-0X 的几何结构不同，不能仅凭都标有“25”就互换。HNF、HNF6 的卡箍请随接头完整型号确认配套清单后采购和装配，不应只凭系列简称或外观确定。" },
        { type: "paragraph", text: "接头本体的材料与卡箍材料要分别选择。卡箍提供 PP、ETFE 材料配置，实际供货应核对完整零件型号；本体是 PEEK 或 PVDF，并不代表整套连接的所有接液表面都是同一种材料。颜色也不能替代材料标识。" },
      ],
    },
    {
      title: "卡箍接头与翻边接头有什么区别？",
      blocks: [
        { type: "figure", src: `${imageRoot}/tube-end-connections-photo.png`, alt: "恒永达三组硬管接头及管端连接结构实拍", width: 2172, height: 1158, caption: "不同管端连接结构实拍，可对照观察接头前端与配套零件的外观差异。" },
        { type: "paragraph", text: "两种连接的主要区别在管端处理与密封零件。翻边连接先把管端加工成向外展开的翻边，再由接头和配套垫片压紧；卡箍连接使用平切管端，由独立卡箍夹持管材并参与密封。选择时应结合已有加工工艺和维护方式，而不是只比较哪一种安装步骤更少。" },
        { type: "table", headers: ["比较项目", "卡箍连接", "翻边连接"], rows: [
          ["管端处理", "平切并按要求清理切口，无需预先翻边", "需要按管材与尺寸完成管端翻边"],
          ["主要密封配合", "管材、卡箍与接收端口配合", "管端翻边、配套垫片与平底端口配合"],
          ["重点检查", "卡箍系列与尺寸、装配方向、管端位置", "翻边成型质量、垫片配置及密封面贴合"],
          ["维护准备", "本文所列卡箍按单次安装要求安排更换", "按具体组件要求检查翻边、垫片和端口状态"],
          ["互换判断", "核对完整装配结构，不能仅看螺纹和管径", "同样需要核对端口与全部配套零件"],
        ] },
        { type: "paragraph", text: "已有稳定翻边工艺、需要交付预制管组件时，可继续评估翻边方案；希望省去管端翻边工序，并能在维护时更换配套卡箍时，可评估卡箍方案。允许工作压力、长期密封和拆接条件应由具体组合的规格与验证结果决定。" },
        { type: "links", items: [{ prefix: "进一步了解：", href: "/resources/technical-articles/flanged-tubing-assemblies-selection-guide/", label: "翻边管组件的结构与选型" }] },
        { type: "paragraph", text: "卡环式连接也无需翻边，但其压套、垫圈和装配方式与这里的卡箍结构不同。不要把“免翻边”视为同一种密封结构；需要同时比较三类方案时，可先阅读硬管接头总览。" },
        { type: "links", items: [{ href: "/resources/technical-articles/hard-tube-fittings-selection-guide/", label: "微流体硬管接头选型指南：法兰、卡箍、卡环与管组件" }] },
      ],
    },
    {
      title: "如何选择合适的卡箍接头？",
      blocks: [
        { type: "subheading", title: "先确定端口，再确定管径与配套零件" },
        { type: "paragraph", text: "首先取得设备端口的完整螺纹和剖面信息，确认其密封结构与目标连接相符。随后确定实际管外径，用它选择接头和卡箍；管内径与管长则用于评估通道容积、流阻和流量需求。接头通孔只是装管配合尺寸，不能直接当作液路内径。" },
        { type: "paragraph", text: "例如，一条外径 2.5 mm 的管路若选择 HN6 系列，应分别确定合适的本体档位和 CL-0X-25 卡箍，再核对螺纹、本体材料、卡箍材料及管材公差。这个过程只能得到候选组合，尚不能据此认定耐压、介质兼容性或装机密封已经合格。" },
        { type: "subheading", title: "把材料选择落实到实际介质和工况" },
        { type: "paragraph", text: "提供介质名称、浓度、工作温度、接触时间及清洗流程，分别核对管材、卡箍和实际接液部件。除了化学兼容性，还要检查管壁在装配压紧后能否保持通道和夹持状态。不能因为某种材料耐受目标介质，就默认任意壁厚、外径公差和卡箍组合都适用。" },
        { type: "subheading", title: "同时检查安装空间和维护条件" },
        { type: "paragraph", text: "密集端口要核对头部直径与相邻件的干涉；靠近壳体的位置要核对轴向长度、出管方向和工具空间。管路连接后还应留出合理弯曲与活动余量，避免把持续拉力、扭转或急弯集中在接头根部。需要定期拆接的设备，应将新卡箍备件和更换步骤纳入维护方案。" },
        { type: "table", headers: ["提供的信息", "用于确认什么"], rows: [
          ["端口螺纹与剖面图", "接头能否正确装入并在规定位置密封"],
          ["管材、内外径与外径公差", "接头、卡箍与管材的尺寸和夹持配合"],
          ["介质、浓度、温度与清洗条件", "接液材料和长期使用条件"],
          ["持续压力、峰值压力、负压与启停节拍", "实际负载及验证工况"],
          ["端口间距、轴向空间与出管方向", "安装、旋拧、布管和拆卸空间"],
          ["维护频率与更换方式", "备件准备及是否适合采用当前连接结构"],
        ] },
      ],
    },
    {
      title: "安装和使用时需要注意什么？",
      blocks: [
        { type: "paragraph", text: "正确安装从管端和零件检查开始。使用适合管材的切管工具获得平整切口，去除残屑并检查端部是否压扁、划伤或变形。随后确认卡箍完整型号、方向及管端位置，在保持组件就位的情况下按具体装配说明锁紧。锁紧方法与扭矩应采用对应型号确认的要求，不给所有塑料接头套用统一数值。" },
        { type: "figure", src: `${imageRoot}/ferrule-assembly-zh.png`, alt: "卡箍接头本体与独立卡箍的典型装配方向", width: 450, height: 235, caption: "典型配置示意。卡箍方向、管端位置和锁紧要求均须与所选系列的装配说明对应。" },
        { type: "subheading", title: "出现异常时，先定位原因再调整装配" },
        { type: "table", headers: ["现象", "优先排查", "处理与复核"], rows: [
          ["旋紧后仍渗漏", "端口是否匹配，卡箍尺寸与方向是否正确，管端是否就位", "停机卸压后检查，按要求更换损伤零件并复测"],
          ["换接头后流量下降", "切口残屑、管端过度挤压、管内径变化及急弯", "在相同介质、管长与泵工况下比较流量和压差"],
          ["静态检查正常，运行时泄漏", "启停压力峰值、温度变化及接头根部拉扯", "检查固定与活动余量，在实际运行工况下验证"],
          ["拆下重装后泄漏", "旧卡箍变形、管外壁损伤和端口污染", "按单次安装要求准备新卡箍，检查管端后重新装配"],
        ] },
        { type: "paragraph", text: "上述现象是排查入口，不是对故障原因的直接判定。例如，流量下降不一定由接头类型造成，也可能来自不同的管内径、切口残屑或管路弯曲。只有保持比较条件一致，才能判断调整装配或更换规格是否解决了问题。" },
        { type: "subheading", title: "区分卡箍更换与接头本体复用" },
        { type: "paragraph", text: "本文所列卡箍按单次安装要求使用：重复安装可能造成不可逆塑性变形。因此，维护时应准备匹配的新卡箍；原管端是否继续使用，需要检查夹持部位有无损伤或变形，必要时按要求重新处理。接头螺母本体是否可继续使用，应单独检查螺纹和受力部位，不能把密封件的更换要求等同于整个接头必须报废。" },
        { type: "subheading", title: "在实际液路中验证完整连接" },
        { type: "paragraph", text: "样件装配后，应在明确的介质、温度和压力条件下检查泄漏、管端位移及流量变化；吸液侧还应检查进气情况。随后覆盖设备实际的启停、压力脉动、温度变化和运动条件，并记录测试持续时间、循环次数及允许泄漏指标。一次静态保压通过，只说明当次条件下的结果，不能代替整机使用验证。" },
        { type: "paragraph", text: "普通卡箍连接的允许压力应由所选接头、卡箍、管材和端口的完整组合确定。不能把专用高压接头的耐压值移用到 HN、HN6、HNF 或 HNF6，也不能仅凭换用更强的接头本体材料就提高整条液路的允许工作压力。" },
      ],
    },
  ],
  faqTitle: "常见问题",
  faqItems: [
    { question: "卡箍接头一定不需要工具吗？", answer: "不一定。是否手拧、是否使用专用批头或扭力工具，以及锁紧要求，应以具体系列和装配说明为准。“免翻边”只表示省去管端翻边工序，并不表示所有型号都可以仅靠手感完成安装。" },
    { question: "管外径相同，CL-0 与 CL-0X 可以互换吗？", answer: "不能仅凭管外径相同判断。两类卡箍的几何结构不同，需要与接头内部结构和端口配合。应核对完整零件型号及经确认的配套清单，不能通过试拧或加大锁紧力证明兼容。" },
    { question: "紧凑卡箍接头比标滚接头更耐压吗？", answer: "不能从外形得出这个结论。紧凑结构主要用于比较安装空间；允许工作压力还取决于接头、卡箍、管材、端口、温度和装配条件，应查看具体组合的规格并进行验证。" },
    { question: "同为 1.6 mm 管外径，内径不同会影响选型吗？", answer: "会。外径用于匹配接头和卡箍，内径影响流阻、内部容积和壁厚。即使外径相同，仍需确认管壁在夹持后的状态以及实际流量、压力和介质要求，不能只核对外径就结束选型。" },
  ],
  cta: {
    title: "需要确认卡箍接头与设备管路的配套？",
    description: "提供端口图纸、管材与内外径、介质、温度、压力及维护要求，确认接头系列、配套卡箍和样件验证方案。",
    contactLabel: "联系技术支持", productsLabel: "查看卡箍接头", productsHref,
  },
};

export const ferruleFittingNavigation = [
  { id: "definition", label: "什么是卡箍接头" },
  { id: "sealing", label: "密封原理" },
  { id: "series", label: "尺寸与安装配合" },
  { id: "comparison", label: "与翻边接头的区别" },
  { id: "selection", label: "选型方法" },
  { id: "installation", label: "安装与使用" },
];

function blockText(block: EngineeringArticleBlock): string {
  switch (block.type) {
    case "paragraph": return block.text;
    case "notice": return [block.label, block.text].filter(Boolean).join(" ");
    case "formula": return [block.expression, block.note].filter(Boolean).join(" ");
    case "table": return [block.headers, ...block.rows].map(row => row.join(" | ")).join("\n");
    case "figure": return [block.alt, block.caption].join(" ");
    case "subheading": return block.title;
    case "list": return block.items.join("\n");
    case "links": return block.items.map(item => [item.prefix, item.label, item.suffix].filter(Boolean).join("")).join(" ");
  }
}

export function getFerruleFittingArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  const copy = getFerruleFittingCopy(locale);
  return [{
    id: ferruleFittingSlug, slug: ferruleFittingSlug, category: "fittings-tubing",
    ...copy.metadata, summary: copy.deck, date: "2026-10-13",
    relationKeys: ["series:hn", "series:hn6", "series:hnf", "series:hnf6"], relationPriority: 150,
    content: [
      { title: "", content: copy.leadBlocks.map(blockText).join("\n\n") },
      ...copy.sections.map(section => ({ title: section.title, content: section.blocks.map(blockText).join("\n\n") })),
      { title: copy.faqTitle, content: copy.faqItems.map(item => `${item.question}\n${item.answer}`).join("\n\n") },
    ],
  }];
}

const translations = { en, es, fr, ko, ru };

export function getFerruleFittingCopy(locale: TechnicalArticleLocale): DiaphragmPumpEngineeringArticleCopy {
  return locale === "zh-CN" ? ferruleFittingCopy : translations[locale] as DiaphragmPumpEngineeringArticleCopy;
}

export function getFerruleFittingNavigation(locale: TechnicalArticleLocale) {
  return ferruleFittingNavigation.map((item, index) => ({
    ...item,
    label: locale === "zh-CN" ? item.label : translations[locale].navigationLabels[index],
  }));
}

export function getFerruleFittingRelatedProducts(locale: TechnicalArticleLocale = "zh-CN"): RelatedResourcesData {
  const label = locale === "zh-CN" ? "卡箍接头" : translations[locale].relatedProductLabel;
  return { locale, articles: [], videos: [], products: featuredProducts.map(product => ({
    id: product.productCode, title: product.foreachModel,
    href: locale === "zh-CN" ? product.detailHref : `/${locale}${product.detailHref}`,
    imageSrc: product.imageCard, imageAlt: `FOREACH ${product.foreachModel} ${label}`,
  })) };
}
