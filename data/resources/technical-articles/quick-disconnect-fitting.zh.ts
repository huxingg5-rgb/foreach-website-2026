import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";
import { coverImage } from "./quick-disconnect-fitting-locales/shared";

// Evidence reviewed 2026-10-20: FOREACH A02 catalogue, PDF pages 62–80,
// and the local generated model records / published fitting manifest.
// Q20 dimension tables disagree with the order table for codes 02–04;
// use the consistently documented 01 / 1.6 mm example and no disputed dimensions.
// Valve terminology: Beswick quick-disconnect-selection-guide and CPC PLC pages.
// Double shutoff is not a verified non-spill rating.
// Compatibility wording supplied by the user on 2026-10-20; scoped to matching series/models.
// Valve comparison: A02 PDF p. 63 and published Q2001-SMX-SPPE, Q2001-SMV-SPPE records.
// Panel mounting: A02 PDF pp. 63 / 71 / 77 (printed pp. 62 / 70 / 76).
// Mounting table reproduces the hole drawings and maximum panel thickness by gender.
// Q60 catalogue gives a female limit only; no male panel limit is inferred.
// Q20 individual PDFs C-515-00-03586/03589 show a tail OD conflicting with A02;
// no disputed tail dimensions or derived insertion/travel lengths are used here.
// H2 intent review 2026-10-20: Google English PAA (operation, universality, connection
// failure), Beswick selection guide / QDC basics, CPC quick-disconnect and bottle-cap
// resources. Search-intent evidence only; no keyword-volume or ranking claim.
const productRoot = "/products/fittings/quick-connect-fittings/";

export const quickDisconnectFittingCopy: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "什么是快插接头？公母配对、带阀结构与仪器液路选型",
    seoTitle: "快插接头是什么？公母配对、带阀结构与选型｜恒永达 FOREACH",
    seoDescription: "了解公母两半可快速分离的快插接头，区分不带阀、单侧带阀和双侧带阀结构，结合恒永达 Q20、Q40、Q60 系列与实际型号，说明配对接口、接管内径、穿板安装、密封材料及仪器液路验证方法。",
    coverImage,
    coverAlt: "恒永达三款不同尺寸与形状的快插接头实拍",
  },
  deck: "从公母端能否正确配对，到断开后哪一侧关闭流路，再到软管、密封圈与安装位置，按仪器液路的实际连接任务选择快插接头。",
  leadBlocks: [
    { type: "paragraph", lead: "快插接头由可相互配对的公端和母端组成。", text: "快插接头由可相互配对的公端和母端组成。两半接合后形成连续流路，解除锁定后可快速分离，适合需要更换储液瓶、拆装液路模块或进行设备维护的连接点。英文资料中常称 quick disconnect fitting 或 quick disconnect coupling。" },
    { type: "paragraph", text: "本文讨论的是公母两半可拆分的接头。另一类将管子直接推入夹持机构的插管式接头，也可能被称为“快插”，但其配管方法和释放动作不同。选型时应先确认拆开的对象是两半接头，还是接头中的管子。" },
    { type: "paragraph", text: "恒永达快插接头包括 Q20、Q40、Q60 系列，提供不同接管、螺纹、安装与阀门配置。其中 Q20、Q40 有 PP 或 POM 外壳型号，Q60 目录所列外壳为 PP。系列名称用于确定配对体系，完整型号用于确定每一半的实际配置。" },
  ],
  sections: [
    {
      title: "快插接头如何工作？公端和母端怎样连接？",
      blocks: [
        { type: "paragraph", lead: "快插接头通过公母端插合、机械锁定和密封圈密封来连接液路。", text: "快插接头通过公母端插合、机械锁定和密封圈密封来连接液路。公端的配合头插入母端的插口，母端锁定机构将其保持在接合位置；公端外侧的密封圈与母端配合面形成密封。两半的尾端再分别连接软管或设备端口。这里的“公端、母端”描述快插配合结构，并不等于外螺纹、内螺纹。" },
        { type: "figure", src: "", width: 1000, height: 470, quickDisconnectDiagram: "pair", alt: "Q20 公端与穿板母端原产品图，标明配合头、母端插口、密封圈、解锁片及两侧接管尾端", caption: "图 1｜Q2001-PNV-SPPE 公端与 Q2001-SMV-SPPE 穿板母端。使用原产品侧视图，公端调整朝向以说明接合关系；箭头表示装配方向，不表示液体流向，图示不按比例。" },
        { type: "paragraph", text: "快插接头的锁定、密封和截止承担不同任务。锁定机构防止公母端在正常连接状态下脱开；配合部位的密封圈封闭流路；带阀型号内部还有截止结构，分离时关闭本侧通道。判断是否适用，需要分别核对这三项。" },
        { type: "figure", src: "", width: 1200, height: 300, alt: "快插接头从对准接合到锁定通流、卸压断开的操作流程", caption: "连接状态与阀门状态应分别核对；锁定到位后仍需检查实际密封与通流。", flowNodes: [
          { label: "对准接合", detail: "同配对系列，检查密封圈与接口清洁" },
          { label: "锁定通流", detail: "确认完全接合，检查密封与用液端流量" },
          { label: "卸压断开", detail: "解除锁定，按两半阀门配置判断关闭状态" },
        ] },
        { type: "paragraph", text: "Q 系列采用推压式解锁结构。连接到位的声音或手感可辅助操作，但不能替代锁定检查和检漏。日常维护通常在公母配合处断开，不必每次从倒刺尾端拔下软管，从而减少对管端的反复拉伸。" },
      ],
    },
    {
      title: "带阀和不带阀的快插接头有什么区别？",
      blocks: [
        { type: "paragraph", lead: "“带阀”指接头内部有分离后自动关闭本侧通道的截止结构。", text: "“带阀”指接头内部有分离后自动关闭本侧通道的截止结构。正确配对并完全接合后，阀门打开，形成流体通路；不带阀的接头没有这项自动截止功能，分离后通道仍开放。外部的解锁片负责拆开公母端，与内部是否带阀是两回事。" },
        { type: "paragraph", text: "下面用两款 Q20 穿板母端作对照：Q2001-SMX-SPPE 不带阀，Q2001-SMV-SPPE 带阀。两者的接管规格、安装形式和材料配置相同，型号中这一位置的 X / V 分别表示不带阀 / 带阀。选型时应结合完整型号确认，不能只看外壳或解锁片。" },
        { type: "figure", src: "", width: 1000, height: 1120, quickDisconnectDiagram: "valves", alt: "Q20 带阀与不带阀快插接头对照：下方母端采用穿板倒刺、直通倒刺、弯头倒刺和螺纹尾端的完整产品图，展示不同尾端规格，并用蓝色通道线和红色截止标记说明各组合的接合与分离状态", caption: "图 2｜下方母端展示 Q20 的穿板倒刺、直通倒刺、弯头倒刺和螺纹配置。X 为不带阀，V 为带阀；线条仅示意通道状态，图片不按比例。" },
        { type: "paragraph", text: "先回答一个实际问题：拆开接头以后，设备侧和可拆模块侧，分别是否需要保留液体？以下配置描述的是一对接头的组合；单个型号标注“带阀”，只说明该半接头具有阀门。" },
        { type: "table", headers: ["配对组合", "分离后的流路状态", "适合优先评估的任务"], rows: [
          ["两侧均不带阀", "两侧通道保持开放，需由系统其他部件控制液体", "可先排空、允许通道开放的维护连接"],
          ["一侧带阀、一侧不带阀", "带阀侧关闭，另一侧仍开放", "仅要求设备侧或容器侧截止的连接"],
          ["两侧均带阀", "公母两侧分别关闭各自通道", "模块和设备两侧都需要减少液体流出的连接"],
        ] },
        { type: "paragraph", text: "双侧带阀并不等于零滴漏。分离瞬间，配合腔内的残留液体仍可能释放；重新接合时也可能带入空气。对样品损失、交叉污染或气泡敏感的液路，应单独考核断开溢液量、重接进气量和重新排气所需时间。" },
        { type: "paragraph", text: "Dry break、non-spill 等低溢液结构还涉及阀面形状、接合腔体积及密封动作次序，不能仅凭两半都有阀门便作出判断。带阀快插也不自动具备带压插拔能力，维护动作应遵循所选型号和系统的操作要求。" },
      ],
    },
    {
      title: "恒永达快插接头能否兼容国际品牌的同类产品？",
      blocks: [
        { type: "paragraph", lead: "恒永达快插接头可与国际主流品牌对应系列的同类产品兼容配对。", text: "恒永达快插接头可与国际主流品牌对应系列的同类产品兼容配对。具体兼容关系需按型号确认。" },
        { type: "paragraph", text: "不同品牌或系列的快插接头能否互换，取决于公母配合接口是否匹配。同样的接管尺寸、相似的外形，甚至能够插入，都不能单独证明锁定、密封和阀门开启可靠。先确认配对系列和接口尺寸，再验证实际连接性能。" },
        { type: "paragraph", text: "一半快插接头同时包含两种接口：前端与另一半配合，尾端与软管或设备螺纹端口连接。前端由配对系列、公母结构及阀门组合决定；尾端由接管内径或螺纹规格决定。两半都能接同样粗的软管，并不能证明它们可以互插。" },
        { type: "table", headers: ["核对位置", "需要记录的内容", "常见误判"], rows: [
          ["公母配合端", "系列、配合轮廓、锁定结构、密封位置及阀门组合", "外观相似或插得进去，就认为能可靠互换"],
          ["倒刺尾端", "软管内径、外径、材料、硬度和装配长度", "把接管内径当成接头最小通径或软管外径"],
          ["螺纹尾端", "内外螺纹、标准与牙距、端口深度、实际密封方式", "只写 1/8 或 1/4，忽略 NPT、UNF 等差异"],
          ["穿板部位", "面板厚度、开孔、紧固方式和操作空间", "将安装螺纹当作流体连接螺纹"],
        ] },
        { type: "paragraph", text: "Q20、Q40、Q60 应分别在对应配对系列内选择。跨系列或跨品牌替换时，即使尾端规格相同，也要核对配合尺寸、密封圈压缩与阀门行程，并验证锁定、泄漏和流量。单凭外形或系列对照名称不足以判定可直接替换。" },
      ],
    },
    {
      title: "快插接头尺寸怎么选？接管内径和通径有什么区别？",
      blocks: [
        { type: "paragraph", text: "倒刺尾端先按软管内径选配，螺纹尾端先按螺纹标准和规格选配，再核对公母配合系列，以及完整连接在目标流量下的压降。接管内径描述适配软管的内尺寸，不等于接头内部最小通径，也不等于软管外径。" },
        { type: "paragraph", text: "下面列出已有型号，用来说明系列、配管和安装配置的区别。各行是具体型号的参数组合，不代表同系列全部型号都有相同材料、阀门或安装方式。" },
        { type: "table", headers: ["完整型号", "接管内径", "公母端与安装", "阀门与材料"], rows: [
          ["Q2001-PNV-SPPE", "1.6 mm", "Q20 公端、非穿板、直通", "带阀；PP 外壳、EPDM 密封圈"],
          ["Q2001-SMV-SPPE", "1.6 mm", "Q20 母端、穿板、直通", "带阀；PP 外壳、EPDM 密封圈"],
          ["Q4004-PNV-SPPE", "6.4 mm", "Q40 公端、非穿板、直通", "带阀；PP 外壳、EPDM 密封圈"],
          ["Q6006-SNV-SPPE", "9.5 mm", "Q60 母端、非穿板、直通", "带阀；PP 外壳、EPDM 密封圈"],
        ] },
        { type: "paragraph", text: "以 Q2001-PNV-SPPE 为例，Q20 表示系列，01 在该型号中对应 1.6 mm 接管；P 表示公端，N 表示非穿板，V 表示带阀，后段 S、PP、E 分别表示直通、PP 外壳和 EPDM 密封圈。对应母端 Q2001-SMV-SPPE 中的 S 表示母端，M 表示穿板。相同字母在不同位置承担不同含义，应按完整编码顺序读取。" },
        { type: "paragraph", text: "接管内径不等于整套连接的最小流道。实际流阻还与接头内部通道、阀门结构、两半组合和流体黏度有关。扩大尾端配管，并不一定消除阀门或其他局部位置的限制。" },
      ],
    },
    {
      title: "穿板快插接头怎么安装？开孔和板厚要注意什么？",
      blocks: [
        { type: "paragraph", text: "穿板接头通过本体挡肩与螺母夹住面板。Q20、Q40、Q60 穿板母端允许的最大板厚分别为 8.5 mm、11.5 mm、7.5 mm；Q20、Q40 穿板公端则分别为 3.3 mm、5.5 mm。公端与母端的板厚上限不能混用。" },
        { type: "figure", src: "", width: 1000, height: 680, quickDisconnectDiagram: "panel", alt: "Q20 穿板母端原产品图与安装示意：面板夹在本体挡肩和螺母之间，板厚 t 不超过 8.5 mm，两侧预留插拔、解锁及配管空间", caption: "图 3｜以 Q2001-SMV-SPPE 说明穿板固定方式，允许板厚 t ≤ 8.5 mm。下方为装配位置示意，不按比例；三个系列的开孔与板厚见下表。" },
        { type: "table", headers: ["系列", "开孔尺寸（mm）", "母端最大板厚（mm）", "公端最大板厚（mm）"], rows: [
          ["Q20", "带平边孔：Φ13（0 / −0.3）；平边至对侧 12.1（0 / −0.1）", "8.5", "3.3"],
          ["Q40", "带平边孔：Φ18（0 / −0.5）；平边至对侧 17（0 / −0.3）", "11.5", "5.5"],
          ["Q60", "圆孔：Φ31（0 / −0.5）", "7.5", "手册未列"],
        ] },
        { type: "paragraph", text: "以上取自 A02 手册装配提示。括号内为上、下偏差，例如 Φ13（0 / −0.3）表示孔径 12.7–13.0 mm；Q20、Q40 还需同时满足平边尺寸。穿板螺纹分别为 Q20：1/2″-24UNS，Q40：11/16″-24UNS，Q60：M30×3.5，用于面板固定。" },
        { type: "paragraph", text: "“穿板”与“带阀”是两个独立选项：穿板说明如何固定，带阀说明断开后是否自动截止。确定系列后，再分别选择公母端、穿板或非穿板、带阀或不带阀。" },
        { type: "paragraph", text: "板厚是挡肩与螺母之间夹持的面板厚度，不等于螺纹长度或公母端插合深度。面板外需留出插拔与解锁空间，面板内需留出螺母紧固、尾端接管和软管弯曲空间。" },
      ],
    },
    {
      title: "如何根据介质、压力和流量选择快插接头？",
      blocks: [
        { type: "paragraph", text: "先按输送介质和清洗剂选择相容的接液材料，再核对温度条件下的工作压力、启停峰值和负压要求，最后检查目标流量下的压降。材料、压力和流量需要一起评估，不能只凭接管尺寸或某一个最高额定值确定型号。" },
        { type: "table", headers: ["条件", "落实到选型的检查", "对设备的影响"], rows: [
          ["介质与清洗剂", "名称、浓度、温度、接触时间；分别核对外壳、密封圈及其他接液部件", "本体耐受不代表密封圈或阀内零件同样耐受"],
          ["压力与温度", "正常工作、启停峰值、负压及维护残压；按完整组合核对额定条件", "单一最高压力或温度不能代替组合工况"],
          ["流量与压降", "在目标流量下检查接头前后压差和用液端流量", "吸液侧阻力会改变泵入口条件，出液侧阻力会占用压差余量"],
          ["拆装与污染控制", "拆装频率、残液、进气、清洁和防尘措施", "影响维护时间、排气步骤和交叉污染控制"],
          ["面板与布管", "开孔和板厚、按钮操作空间、软管弯曲半径及拉力支撑", "影响能否顺利接合与长期保持密封"],
        ] },
        { type: "links", items: [
          { href: "/resources/technical-articles/quick-disconnect-coupling-flow-pressure-drop/", label: "快插接头流量与压降：曲线读法和 Kv/Cv 估算" },
          { href: "/resources/technical-articles/quick-disconnect-coupling-pressure-rating/", label: "快插接头承压：工作压力、温度与选型检查" },
        ] },
        { type: "paragraph", text: "材料选择应覆盖正常输送和清洗两个阶段。例如，使用 PP 外壳与 EPDM 密封圈的型号时，需分别评价两种材料，而不能只依据“PP 接头”这个名称判断全部接液部件。若需要其他密封圈材料，应选择有明确记录的完整型号，不把系列可选项视为当前型号的默认配置。" },
        { type: "links", items: [{ href: "/resources/technical-articles/fitting-material-selection-guide/", label: "接头材质选择：本体、密封件与介质条件", prefix: "需要进一步比较材料时，阅读", suffix: "。" }] },
      ],
    },
    {
      title: "更换储液瓶时，怎样减少快插接头断开后的漏液？",
      blocks: [
        { type: "paragraph", text: "先确定断开后哪一侧需要保留液体：仅设备侧需要截止时，可评估单侧带阀；设备侧与储液瓶侧都需要截止时，可评估双侧带阀。阀门关闭用于阻止相应管路继续出液，接合腔内仍可能留下少量残液，因此还要考核断开溢液量，不能把双侧带阀当成零滴漏保证。" },
        { type: "paragraph", text: "假设一台仪器使用 1.6 mm 内径软管连接可拆储液模块和设备面板，维护时希望两侧都关闭流路。若介质与 PP、EPDM 及其他接液部件相容，可将 Q2001-PNV-SPPE 与 Q2001-SMV-SPPE 作为配对候选：非穿板公端位于可拆模块软管上，穿板母端固定在设备面板。" },
        { type: "list", ordered: true, items: [
          "核对两半配置：同为 Q20，分别为公端、母端，且均带阀；在物料清单中分别记录完整型号和商品编码。",
          "核对尾端软管：两侧均按 1.6 mm 内径选管，同时记录外径、壁厚、硬度和实际管材，完成倒刺配合验证。",
          "落实面板安装：按该 Q20 穿板母端的安装图核对孔形、允许板厚和螺母紧固条件，留出解锁、拔出和背面配管空间。",
          "检查运行状态：在目标流量、温度和压力下检漏；处于泵吸液侧时，增加负压进气与用液端流量检查。",
          "检查维护状态：停机卸压后分离，观察两侧关闭、残液量；重新接合后测量进气和排气恢复时间。",
          "形成交付依据：固定接头与软管组合、图纸版本、装配方法和验收条件，便于后续重复采购与维护。",
        ] },
        { type: "paragraph", text: "这是从使用要求推导配置的选型示例，实际介质适配、压降和拆装寿命仍需以该仪器的工况验证。若只要求设备侧截止，应重新评估单侧带阀组合；若要求极低溢液，则需进一步核对专门的低溢液结构和测试数据。" },
      ],
    },
    {
      title: "快插接头漏液、插不进去或流量变小怎么办？",
      blocks: [
        { type: "paragraph", text: "先停机、隔离必要液路并卸压，再按故障位置排查：接合处渗漏重点检查密封圈与接合到位情况；无法插合重点检查错配、异物和残压；流量下降重点检查阀门是否完全开启、通道堵塞和软管急弯。分离后持续出液还要先确认该半接头是否带阀。" },
        { type: "subheading", title: "先复核安装与拆卸过程" },
        { type: "list", ordered: true, items: [
          "装配前核对两半型号，检查锁定机构、密封圈、接口表面和尾端软管。发现划伤、裂纹、缺件或异物时先处理。",
          "先完成尾端和面板安装。软管沿轴线推入倒刺至规定位置，安排支撑，避免管路重量持续侧向拉扯接头。",
          "将公母端对正，按产品要求接合到位并确认锁定。阻力异常时停止，排查错配、异物、阀门受压或密封损伤。",
          "在规定工况下检漏并检查流量。维护前停机、隔离必要液路并释放残压，再操作解锁机构分离。",
          "分离后保护暴露的接口，防止颗粒进入。再次连接前检查密封圈与管端状态，并复核维护后的运行表现。",
        ] },
        { type: "table", headers: ["现象", "优先排查位置", "复核重点"], rows: [
          ["无法插合或锁定", "系列与公母配对、锁定件、异物、残压", "确认完整接合；不要通过强压掩盖错配"],
          ["公母接合处渗漏", "密封圈表面、配合面、接合深度", "更换损伤件后复测工作压力及温度下的密封"],
          ["断开后持续出液", "出液半端是否带阀、阀口异物或损伤", "区分短暂残液与阀门未关闭，检查两半而非只看一侧"],
          ["重接后气泡增多", "连接腔进气、上游供液、尾端负压密封", "分段检查并记录排气恢复时间"],
          ["流量下降", "阀门开启、内部流道、软管急弯和污染堵塞", "对比安装接头前后的实际工作流量与压差"],
        ] },
      ],
    },
  ],
  faqTitle: "快插接头常见问题",
  // Topics reviewed against Obsidian on 2026-10-20:
  // F:/Obsidian Vault/06_数字营销增长/01_SEO/02_关键词与产品命名/产品词库/05_接头与管路附件/quick_快插接头.md
  // The note lists three research candidates, not measured high-frequency searches.
  // Answers follow the reviewed product notes; do not reuse unverified V0 claims.
  faqItems: [
    { question: "快插接头带阀与不带阀有什么区别？", answer: "断开后，带阀的一侧自动关闭通道，不带阀的一侧仍然开放。若两侧都需要截止，公端和母端都要选带阀型号。带阀不等于零滴漏。" },
    { question: "快插接头与插管式接头有何不同？", answer: "快插接头在公端与母端之间拆开；插管式接头则将管子从接头中释放。本文的 Q20、Q40、Q60 属于公母配对结构，日常拆接无需拔下尾端软管。" },
    { question: "不同品牌的快插接头能否互配？", answer: "不能只凭外形或接管尺寸判断。需要核对公母配合尺寸、锁定结构和密封位置；带阀型号还要确认接合后阀门能否完全开启。系列对照表不能代替实际配对验证。" },
  ],
  cta: {
    title: "为可拆液路确定一对完整的快插配置",
    description: "提供两侧接口、断开后的截止要求、介质、压力、温度和面板安装条件，便于核对公母型号、密封材料与样件验证方案。",
    contactLabel: "沟通快插选型",
    productsLabel: "查看快插接头型号",
    productsHref: productRoot,
  },
};

export const quickDisconnectFittingNavigation = [
  { id: "connection", label: "工作原理与公母连接" },
  { id: "valves", label: "带阀与不带阀的区别" },
  { id: "mating", label: "国际品牌兼容" },
  { id: "models", label: "尺寸、内径与通径" },
  { id: "panel-mount", label: "穿板安装与板厚" },
  { id: "conditions", label: "材料与工况选型" },
  { id: "selection-example", label: "换瓶与断开漏液" },
  { id: "installation", label: "漏液与插接故障排查" },
];
