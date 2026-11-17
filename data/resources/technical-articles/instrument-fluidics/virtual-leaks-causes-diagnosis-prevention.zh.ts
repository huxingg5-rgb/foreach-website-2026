import type { DiaphragmPumpEngineeringArticleCopy } from "../diaphragm-pump-engineering-article.types";

export const virtualLeaksArticleSlug = "virtual-leaks-causes-diagnosis-prevention";

// Source: user-supplied 虚漏的成因、判别与规避.docx, received 2026-11-17.
// Preserve its two diagrams and troubleshooting table. Terminology, vented
// threads and rate-of-rise qualifications were checked against the official
// Pfeiffer knowledge book and Leybold vacuum fundamentals linked below.
// No vacuum rating or leak-test result is inferred for the related fittings.
export const copy = {
  metadata: {
    title: "检漏仪找不到漏点，真空度却上不去：虚漏的成因、判别与规避",
    seoTitle: "虚漏的成因、判别与规避：检漏仪找不到漏点怎么办？｜恒永达 FOREACH",
    seoDescription: "检漏仪找不到漏点，真空度却上不去？区分实漏、外漏、内漏与虚漏，结合封闭腔穴和盲孔螺纹剖面图，说明材料放气、抽空曲线、压升测试及设计规避方法。",
    coverImage: "/images/resources/technical-articles/virtual-leaks/trapped-volume.webp",
    coverAlt: "两道焊缝之间的封闭腔穴向真空腔缓慢释放气体的虚漏剖面示意图",
  },
  deck: "检漏仪找不到漏点、抽空却明显变慢时，除了实漏，还要检查结构中的封闭腔穴和材料表面放气。盲孔螺纹、串联密封与焊缝夹层都可能储存气体，并通过狭窄通道缓慢释放。抽空曲线和压升测试可以帮助缩小范围，但不能仅凭喷氦无信号或一条压力曲线就排除实漏。",
  leadBlocks: [
    {
      type: "paragraph",
      text: "气密部件或产品在出货检验时，泄漏读数有时会在指标边缘波动：重复测试，一次很小，再测又偏高，结果在漏与不漏之间反复变化。真空设备和负压流路也可能出现类似现象——检漏仪找不到明确漏点，抽空时间却变长，工作压力迟迟达不到要求。",
    },
    {
      type: "paragraph",
      text: "这时除了检查外部漏孔，还要寻找系统内部的气源。气体可能早已被封在结构里，只能沿细小通道缓慢释放，这就是典型的封闭腔穴型虚漏。材料放气、水分解吸和残留液体再蒸发也会产生相似表现，需要一起排查。",
    },
  ],
  sections: [
    {
      title: "实漏、外漏、内漏与虚漏有什么区别？",
      tocLabel: "泄漏类型",
      blocks: [
        {
          type: "paragraph",
          text: "现场说“漏了”，可能是在描述不同问题。实漏与虚漏主要区分气体来源；外漏与内漏主要区分泄漏路径，因此它们不是四种互斥的分类。先把气体从哪里来、流向哪里说清楚，才能选择合适的检漏方法。",
        },
        {
          type: "list",
          items: [
            "实漏：气体通过真实的漏孔、裂纹或密封间隙，由高压侧流向低压侧。在检测灵敏度、示踪气体可达性和响应时间合适时，可以用检漏仪定位。",
            "外漏：气体跨越系统与外界的边界。真空系统通常表现为外部气体进入内部；正压液路则也可能向外泄漏。",
            "内漏：两段本应隔离的腔室或管路之间窜气，例如关闭的阀门仍有气体通过。可先分段隔离、保压或测压升，再按检测方案向相应一侧引入示踪气体检查。",
            "虚漏：典型情况是内部死空间储存的气体经低流导通道缓慢进入真空腔，表现得像有持续漏孔。放气、解吸、再蒸发和材料渗透也会增加气体负荷，现场常把这些现象一并称作“虚漏”，但定位时应分别辨认。",
          ],
        },
        {
          type: "paragraph",
          text: "便于记忆的说法是：实漏要查泄漏通道，虚漏要查内部储气空间和持续释气源。喷氦没有信号，只说明当前测试条件下没有检测到对应响应，不能直接等同于系统没有实漏。",
        },
      ],
    },
    {
      title: "虚漏为什么会让抽空变慢，喷氦却没有信号？",
      tocLabel: "虚漏机理",
      blocks: [
        {
          type: "paragraph",
          text: "封闭腔穴与真空腔之间的通道越细、越长，流导通常越小，储存的气体释放得越慢。即使真空腔已经抽到较低压力，腔穴里的气体仍可能不断补入，使抽空曲线出现很长的拖尾。",
        },
        {
          type: "formula",
          expression: "近似稳态气体平衡：q总 ≈ S有效 × p",
          note: "q总为进入真空腔的总气体负荷，单位 mbar·L/s；S有效为腔体处的有效抽速，单位 L/s；p为对应绝对压力，单位 mbar。该简化关系用于泵本底压力影响可忽略、气体负荷近似稳定的区间，不能把泵铭牌流量直接作为S有效。",
        },
        {
          type: "paragraph",
          text: "在相同气体负荷下，提高有效抽速可能降低腔内压力，但不能消除储气结构本身。图中的双焊缝夹层就是一个例子：大气侧焊缝封闭，外部喷入的氦气到不了腔穴；腔穴却能通过真空侧的细缝慢慢放气，所以压力异常与氦检漏无明显信号可以同时出现。",
        },
        {
          type: "figure",
          src: "/images/resources/technical-articles/virtual-leaks/trapped-volume.webp",
          alt: "双焊缝夹层形成封闭腔穴，外部氦气被大气侧焊缝阻挡，储气沿真空侧细缝缓慢进入腔体",
          width: 1856,
          height: 1056,
          caption: "封闭腔穴型虚漏剖面示意。图示说明储气空间与慢释放通道，不代表真实尺寸比例；泵的作用不能替代对储气结构的处理。",
        },
        {
          type: "paragraph",
          text: "每次放气恢复到大气压力后，某些死空间又会被重新充满，下一次抽空仍出现相似拖尾，容易被误判为稳定的实漏。如果有水分吸附或凝结，水蒸气还可能在较冷表面滞留并反复解吸、再蒸发，进一步延长抽空时间。",
        },
      ],
    },
    {
      title: "哪些结构容易形成封闭腔穴型虚漏？",
      tocLabel: "结构性气源",
      blocks: [
        {
          type: "paragraph",
          text: "这类虚漏通常在设计与装配阶段形成。排查的关键是同时寻找储气空间和它通向低压侧的细通道，而不是看到盲孔或两道密封就直接判定故障。",
        },
        {
          type: "subheading",
          title: "盲孔螺纹：孔底死空间只能沿螺纹间隙排气",
        },
        {
          type: "paragraph",
          text: "螺钉旋入盲孔后，孔底可能留下封闭气体。若没有专用排气路径，气体只能沿螺纹间隙缓慢进入真空腔，外部氦气又不能直接到达孔底。设计上可采用适用的通气螺钉或排气孔；开孔会改变螺钉截面与承载能力，必须同时复核机械强度。",
        },
        {
          type: "figure",
          src: "/images/resources/technical-articles/virtual-leaks/blind-thread.webp",
          alt: "真空腔内盲孔螺钉的孔底死空间，以及气体沿狭长螺纹间隙缓慢进入真空腔的路径",
          width: 1736,
          height: 1336,
          caption: "盲孔螺纹型虚漏示意。螺纹牙与流动通道采用示意画法，不代表实际配合尺寸；“喷氦无信号”对应图示中外部氦气无法到达孔底的情况。",
        },
        {
          type: "subheading",
          title: "双焊缝、串联密封与法兰夹层：气体被封在两道边界之间",
        },
        {
          type: "list",
          items: [
            "双角焊缝：若大气侧焊缝封闭、真空侧存在细小通道，两焊缝之间就可能形成气囊。应在结构设计中明确密封边界和可排气路径；是否采用断续焊或专用排气结构，须结合承载、清洁和密封要求确认。",
            "串联密封：两道O形圈之间若没有排气或监测通道，夹层气体可能被封住，外部喷氦也难以直接检查内侧密封。可按设计设置中间腔的排气、抽气或检漏通道，分别验证两道密封，而不是随意切槽破坏密封边界。",
            "法兰与垫片夹层：不合理的夹紧、局部接触或垫片变形可能留下难以排气的间隙。应按装配要求控制压缩量和紧固过程，不用一味加大夹紧力代替对接触面和排气路径的检查。",
          ],
        },
      ],
    },
    {
      title: "材料与表面放气为什么会产生类似虚漏的表现？",
      tocLabel: "材料与表面放气",
      blocks: [
        {
          type: "paragraph",
          text: "即使结构没有封闭腔穴，材料内部或表面也可能持续释放气体。它们与死空间虚漏的处理方法并不完全相同：前者更依赖材料选择、清洗、干燥与适用的烘烤工艺，后者往往需要改进排气结构。",
        },
        {
          type: "list",
          items: [
            "油脂、密封材料与清洗残留：吸附的水分、空气、溶剂和材料内部气体可通过解吸、扩散或挥发形成气体负荷。应选择适合目标真空度的材料，并控制非必要的用量和残留。",
            "蒸气压与温度：润滑剂、油和水的释气行为与温度有关。高真空或超高真空设计还应核对金属、焊料及表面处理的蒸气压，不能把常规液路的材料适用性直接套用到真空设备。",
            "阳极氧化与多孔层：多孔表面会增加吸附和留气的机会。是否适用取决于具体处理工艺、清洁状态与目标压力，不能仅凭耐腐蚀性判断真空性能。",
            "陶瓷、金属与玻璃表面：陶瓷的气孔和致密程度会随工艺变化；即使基材致密，暴露于空气后的表面吸附层也可能成为气源。烘烤可以降低适用材料的部分气体负荷，但不能修复贯通孔隙、裂纹或真实漏孔。",
          ],
        },
        {
          type: "paragraph",
          text: "清洗、干燥和烘烤条件必须兼顾密封件、胶粘剂、传感器及其他部件的允许范围。不能为了加快除气，直接给整套液路套用统一的高温工艺。",
        },
      ],
    },
    {
      title: "怎样用抽空曲线和压升测试初步判别虚漏？",
      tocLabel: "现场判别与排查表",
      blocks: [
        {
          type: "paragraph",
          text: "先与系统健康时的压力—时间记录比较，并尽量保持腔体容积、泵、阀位、管路、温度和放气历史一致。抽空明显变慢但长时间后仍接近原有极限压力，会增加放气或虚漏的嫌疑；压力停在偏高位置也可能来自实漏、持续放气或抽气能力变化，不能单独定性。",
        },
        {
          type: "paragraph",
          text: "压升测试是在抽空后隔离真空腔与泵，记录绝对压力随时间的变化。体积和温度稳定、其他影响受控时，较稳定的压升斜率提示持续气体来源；斜率逐渐减小则更支持放气或储气空间逐渐排空。应在继续抽气后重复相同压升区间；实漏与放气也可能同时存在。",
        },
        {
          type: "formula",
          expression: "隔离腔体的表观气体负荷：q表观 ≈ V × Δp / Δt",
          note: "V为隔离后的有效气体容积（L），Δp为绝对压力变化（mbar），Δt为时间（s），结果为mbar·L/s。在体积和温度近似稳定时使用；尚未区分实漏、放气、虚漏与隔离阀内漏时，不能把它直接当作已确认的外漏漏率。",
        },
        {
          type: "paragraph",
          text: "下表用于确定优先排查方向，不作为单项现象的验收判据。",
        },
        {
          type: "table",
          headers: ["现场现象", "优先怀疑", "处理顺序"],
          rows: [
            ["抽空变慢，长时间后接近原有极限压力", "放气或死空间虚漏，也要检查抽气通路", "核对泵与阀位；检查清洁、干燥状态和死体积，再按材料允许条件处理"],
            ["压力停在偏高位置，重复压升测试的斜率较稳定", "实漏或其他持续气体来源", "核对温度与有效容积；分段隔离，并用适合的示踪气体方法定位"],
            ["关阀后，预期隔离的低压腔仍受另一侧压力影响", "隔离阀内漏或腔间窜气", "分别控制两侧压力、分段保压；按方案在可疑一侧引入示踪气体"],
            ["静态测试无明显异常，动作时出现泄漏响应", "运动密封或受力变化造成的动态泄漏", "在规定动作和压差下同步检漏；检查阀杆、密封和连接受力，必要时评估适用的波纹管隔离结构"],
            ["换用潮湿气源或长期暴露空气后，抽空变慢", "水分吸附、解吸或再蒸发", "核对气源与通气方式；清洗、干燥，并在部件允许条件下延长抽气或烘烤"],
          ],
        },
        {
          type: "paragraph",
          text: "如果检漏读数反复变化，还要同时核对检漏仪校准、背景、量程、示踪气体到达路径和等待时间。确认检漏方法能够覆盖可疑位置后，再把喷氦无信号作为判断线索。",
        },
      ],
    },
    {
      title: "怎样在设计和装配阶段减少虚漏？",
      tocLabel: "设计与工艺规避",
      blocks: [
        {
          type: "paragraph",
          text: "结构判据是检查“有没有储气空间，以及气体靠什么路径排出”。盲孔螺纹、双面焊接、串联密封和法兰夹层应列为重点复核位置；有死空间并不一定发生虚漏，但没有清楚的排气路径，就需要进一步评估。",
        },
        {
          type: "paragraph",
          text: "工艺判据是检查“材料与表面会释放什么，以及怎样处理”。对易吸水表面、润滑剂、清洗残留和多孔层，应在装配前确定清洗、干燥、储存及适用的除气方法。装配后保留抽空和压升基线，便于后续区分污染、结构变化与真实泄漏。",
        },
        {
          type: "paragraph",
          text: "负压液路中的连接件也应检查密封位置、接管配合和装配形成的空间。下方恒永达硬管接头入口用于比较液路连接结构；本文的真空机理示意不构成这些产品的高真空、超高真空适用性或漏率证明，具体选型仍应按型号资料和实际工况验证。",
        },
        {
          type: "paragraph",
          text: "虚漏在设计阶段处理通常更容易。把储气空间、排气路径和材料状态提前检查清楚，可以减少装配后反复检漏、拆解和重新清洗的工作。",
        },
      ],
    },
    {
      title: "相关阅读与技术参考",
      tocLabel: "相关阅读与参考",
      blocks: [
        {
          type: "links",
          ordered: true,
          items: [
            { href: "/resources/technical-articles/hard-tube-fittings-selection-guide/", label: "硬管接头选型指南：连接结构、安装与维护" },
            { href: "/resources/technical-articles/fitting-material-selection-guide/", label: "接头材质选择：本体、密封件与介质条件" },
            { href: "https://www.pfeiffervacuum.com/il/en/knowledge/vacuum-technology/knowledge-book/3-mechanical-components-in-vacuum/3.3-connections.html", label: "Pfeiffer 真空知识手册：连接结构与盲孔通气" },
            { href: "https://www.pfeiffervacuum.com/il/en/knowledge/vacuum-technology/knowledge-book/3-mechanical-components-in-vacuum/3.2-materials.html", label: "Pfeiffer 真空知识手册：材料与表面放气" },
            { href: "https://www.leybold.com/content/leybold/en/knowledge/vacuum-fundamentals/leak-detection/pressure-rise-and-drop-tests.html", label: "Leybold 真空基础：压升测试与压力变化判别" },
          ],
        },
      ],
    },
  ],
  faqTitle: "常见问题",
  faqItems: [],
  cta: {
    title: "需要核对负压液路的连接与密封？",
    description: "提供介质、目标绝对压力、温度、连接结构及压力—时间记录，便于梳理选型与验证条件。",
    contactLabel: "联系技术支持",
    productsLabel: "查看液路产品",
    productsHref: "/products/",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
