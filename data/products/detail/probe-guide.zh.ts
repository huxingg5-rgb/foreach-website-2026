/**
 * Customer-facing Chinese selection guidance for custom probe families.
 * Sources were read on 2026-11-13. Source IDs trace general principles;
 * competitor dimensions, coatings, proprietary processes and ratings are not FOREACH specifications.
 */
export type ProbeGuideRow = readonly [string, string];
export type ProbeGuideStep = { title: string; text: string };
export type ProbeComparison = {
  headings: readonly [string, string, string];
  rows: ReadonlyArray<readonly [string, string, string]>;
};
export type ProbeSelectionQuestion = {
  id: string;
  navLabel: string;
  title: string;
  answer: string;
  paragraphs: string[];
  comparison?: ProbeComparison;
  steps?: ProbeGuideStep[];
  note?: string;
  link?: { label: string; href: string };
  sourceIds: string[];
};
export type ProbeGuide = {
  slug: string;
  name: string;
  task: string;
  drawingFocus: string;
  structureNote: string;
  selectionLead: string;
  questions: ProbeSelectionQuestion[];
};

export const probeSelectionSources = {
  hamiltonGauge: { title: "Hamilton — Needle Gauge Chart", url: "https://www.hamiltoncompany.com/knowledge-base/article/needle-gauge-chart" },
  hamiltonLength: { title: "Hamilton — Needle Length Guide", url: "https://www.hamiltoncompany.com/knowledge-base/article/needle-length-guide" },
  hamiltonNeedles: { title: "Hamilton — Laboratory Needles", url: "https://www.hamiltoncompany.com/needles" },
  hamiltonVenting: { title: "Hamilton — Venting Needles", url: "https://www.hamiltoncompany.com/needles/specialty-needles/venting-needles" },
  tecanProbes: { title: "Tecan — Cavro Probes", url: "https://partnering.tecan.com/products/spareparts/probes" },
  tecanClld: { title: "Tecan — How does cLLD work", url: "https://www.tecan.com/knowledge-portal/how-does-clld-work-and-what-are-the-changes-with-introducing-a-new-multisense-airfca" },
  arcmedFinish: { title: "Arcmed — High-Quality Probes for Analytical Applications", url: "https://www.arcmedgroup.com/blog/high-quality-probes-for-analytical-applications" },
  idexProbes: { title: "IDEX Health & Science — Sipper Probes and Assemblies", url: "https://www.idex-hs.com/capabilities/fluidics/component-technology/probes" },
  watersWash: { title: "Waters — Carryover", url: "https://help.waters.com/help/en/product-support/alliance-is-system-support/715008450/B69B8F0.html" },
  ikaMixing: { title: "IKA — Overhead Stirrers: stirring tools for every task", url: "https://www.ika.com/en/Products-LabEq/Overhead-Stirrers-pg187/Overview-cph.html" },
} as const;

const guides: Record<string, ProbeGuide> = {
  "sampling-probes": {
    slug: "sampling-probes",
    name: "采样针",
    task: "用于试剂或样本吸取、分配与定量转移。先确认液体、目标液量和容器，再确定针体、针尖及安装结构。",
    drawingFocus: "标出安装基准、总长、有效伸出长度、内外径、折弯方向，以及针尖或侧孔相对容器底部的位置。",
    structureNote: "尖口、平口、V 型口、侧孔和弯折结构按项目选择；内壁抛光、外壁涂层与电容式液位检测适配分别确认。",
    selectionLead: "选采样针，要同时解决伸得到、吸得稳、分得出和洗得净。下面从管径、针尖、表面处理和液位检测的取舍，说明怎样把针体与实际吸分液任务匹配起来。",
    questions: [
      {
        id: "bore", navLabel: "管径与长度", title: "采样针越细越好吗？内径、外径和长度分别影响什么？",
        answer: "不是越细越好。外径先满足容器与机构空间，内径再兼顾流动阻力、颗粒通过和针内容积，长度以能到达工作位置且留有必要运动余量为原则。",
        paragraphs: [
          "对相同长度的直管段，缩小内径可减少内部几何容积，但在相同液体和流量下也会增加流动阻力。黏稠或含颗粒的样本，需要优先检查吸液是否连续、是否容易堵塞，不能只追求小孔径。",
          "外径相同也不表示内径相同：壁厚不同，通液截面就不同。更换针时应同时比较内径、外径和流道长度；同样的泵动作配上不同针体，充液和吸分液表现可能发生变化。",
        ],
        comparison: { headings: ["尺寸", "主要影响", "选择时怎么取舍"], rows: [
          ["外径", "容器开口、机构间隙与针体结构", "先满足杯口、清洗站和运动路径的空间要求，再核对壁厚与安装强度。"],
          ["内径", "流动阻力、颗粒通过与内部容积", "小液量任务关注针内容积；黏稠或含颗粒液体同时关注通畅性和实际吸液速度。"],
          ["长度", "能否到达目标位置、流道容积与安装后伸出量", "按同一安装基准标注总长和有效长度，避免用更长的针体补偿定位不准。"],
        ] },
        note: "针内几何容积、清洗后残留和单次分液量是不同概念，不能用其中一个直接推定另一个。",
        sourceIds: ["hamiltonGauge", "hamiltonLength", "tecanProbes"],
      },
      {
        id: "tip", navLabel: "针尖与侧孔", title: "平口、尖口和侧孔，应该按什么来选？",
        answer: "先区分是否需要穿透封口，再看液体从哪里进出。开口容器的吸分液与穿膜取液是两种任务，针尖并非越尖越适合采样。",
        paragraphs: ["针尖外形与流体开口位置要分开看。侧孔可以把通液口移到针体侧面，但实际孔位必须进入液体、避开遮挡，并与运动方向和容器形状匹配。V 型口等其他形式也应落实到具体开口图纸与试验，而不是仅凭名称选择。"],
        comparison: { headings: ["结构方向", "什么时候考虑", "需要注意的取舍"], rows: [
          ["平口／开放端口", "无需穿透封口的开口容器吸分液", "核对入口与杯底、杯壁的距离，避免运动中抵住底面或使开口被遮挡。"],
          ["尖口／穿刺端", "需要穿过封膜、瓶塞或其他封闭耗材", "同时评估穿刺阻力、针体刚性、碎屑和退针状态，不能只看尖锐程度。"],
          ["侧孔", "需要调整液体入口位置或流出方向", "核对孔口高度与朝向；针尖到位不等于侧孔已进入有效取液位置。"],
        ] },
        link: { label: "需要穿过封膜或瓶塞？查看穿刺针的选择", href: "/products/probes/piercing-probes/" },
        sourceIds: ["hamiltonNeedles", "idexProbes", "tecanProbes"],
      },
      {
        id: "surface", navLabel: "抛光与涂层", title: "内壁抛光和外壁涂层解决的是同一个问题吗？",
        answer: "不是。内壁抛光主要针对流道表面与清洗残留；外壁涂层主要改变外表面的润湿和挂液表现，两者不能互相替代。",
        paragraphs: [
          "液体留在针内与针外带出液滴，是不同的携带路径。内壁较粗糙时，清洗后的样本残留可能更难去除；外壁挂滴则还与实际液体、浸入深度和提针动作有关。应先判断残留发生在哪里，再决定优先调整表面工艺还是运行流程。",
          "涂层也不是所有液体都必须选。若考虑外壁涂层，应把试剂和清洗液的成分、温度、接触时间及反复清洗后的表面状态一起评估。恒永达可按项目评估内壁抛光和外壁涂层，具体工艺及验收条件需分别确认。",
        ],
        note: "表面处理是降低残留风险的手段，仍需通过实际清洗流程确认携带污染表现。",
        sourceIds: ["arcmedFinish", "tecanProbes"],
      },
      {
        id: "level", navLabel: "液位检测", title: "带液位检测线的针，接上电线就能直接检测液面吗？",
        answer: "需要与整机检测方案配合。针体和线缆只是接口的一部分，cLLD 还需要匹配检测电路、参考接地、容器与液体条件。",
        paragraphs: [
          "电容式液位检测利用针体接触液面前后的电容变化判断接触位置。其作用是帮助控制浸入位置，减少吸入空气或过度浸入带来的问题，并不直接测量已经吸入的液体体积。",
          "选型时应把针体结构、连接器、线缆布置与现有控制板对照，并用实际容器、液体和低液位状态调试检测。清洗后挂液、液面泡沫等状态也应纳入装机检查，不能只用清水完成一次触液就确认全部试剂适用。",
        ],
        sourceIds: ["tecanClld", "tecanProbes"],
      },
      {
        id: "carryover", navLabel: "挂液与偏量", title: "出现挂液、偏量或交叉污染，是否应该先换针？",
        answer: "先分清是针外带液、针内残留，还是液路中的气泡和吸液不足，再决定改针尖、改表面还是改程序。直接更换针体，可能保留原来的问题。",
        paragraphs: ["比较新旧方案时，保持泵、阀、管路、液体和测量方法一致，每次只改变一个关键因素。挂滴照片可以帮助定位问题，但不能代替实际液量与携带污染的测量。"],
        comparison: { headings: ["观察到的现象", "先考虑的原因", "优先比较什么"], rows: [
          ["提针后外壁挂滴", "浸入过深、表面润湿或提针动作", "同一液体下比较浸入位置、提针速度和外壁处理前后的带液情况。"],
          ["下一份样本仍检出上一份成分", "内外壁清洗不足，或其他接液部位残留", "按既定检测方法比较清洗前后结果，并区分针体与其余液路的影响。"],
          ["吸液断续、气泡或分液量波动", "入口位置、堵塞、密封、充液或吸液速度", "先确认针孔和液路通畅、无吸气，再判断是否需要改变内径或针尖。"],
        ] },
        sourceIds: ["tecanProbes", "watersWash", "arcmedFinish"],
      },
      {
        id: "use", navLabel: "安装与调试", title: "采样针到手后，怎样调试才能减少反复修改？",
        answer: "先确认机械位置，再确认液路，最后调试液位检测和清洗。把三个环节分开，才能知道结果变化来自哪里。",
        paragraphs: [],
        steps: [
          { title: "先用空行程确认位置", text: "以安装面为基准核对有效伸出长度，低速检查杯口、杯壁、杯底和清洗站间隙。不要通过碰底来确定工作位置。" },
          { title: "再用实际液体确认吸分液", text: "接好液路并充分充液，观察入口位置、气泡、滴液和实际分液量，记录吸分液速度与目标液量。" },
          { title: "最后联调检测与清洗", text: "适配 cLLD 的版本再核对各液位状态；清洗试验同时覆盖针内与针外。保存针体版本和设置，便于复现。" },
        ],
        note: "具体尺寸、材料、检测接口及性能验收条件按确认配置确定。",
        sourceIds: ["hamiltonLength", "tecanClld", "tecanProbes"],
      },
    ],
  },
  "piercing-probes": {
    slug: "piercing-probes", name: "穿刺针",
    task: "用于封膜、瓶塞或密闭耗材的穿刺取液。先确认被穿刺对象和动作，再确定针尖、取液口与排气路径。",
    drawingFocus: "标出耗材和封口结构、穿刺位置、针尖方向、穿刺深度、取液口与排气口，以及安装基准和运动包络。",
    structureNote: "针尖、侧孔、排气孔或排气槽、折弯与焊接结构按耗材和动作评估，并非每个版本同时具备全部结构。",
    selectionLead: "穿得进去只是第一步。穿刺针还要在封口材料、结构刚性、取液位置和容器压力之间取得平衡，才能完成稳定的穿刺、取液与退针动作。",
    questions: [
      {
        id: "point", navLabel: "针尖与碎屑", title: "穿刺针是不是越尖越好？怎样减少穿刺碎屑？",
        answer: "针尖要与封口材料和动作匹配。仅追求尖锐程度，不能同时保证阻力、针尖耐用性和较少的封口碎屑。",
        paragraphs: [
          "针尖形状决定与封膜或瓶塞如何接触、切入，取液口又决定碎屑是否容易进入流道。不同刃口、锥形或侧孔结构的取舍，需要用实际耗材验证；一种封膜上的结果，不能直接用于另一种瓶塞。",
          "先比较穿刺阻力、针体偏转、碎屑和退针状态，再看循环后的针尖变化。出现碎屑时，应同时检查针尖、穿刺方向、耗材支撑与动作，而不是只增加推力或单独要求更尖。",
        ],
        note: "恒永达按项目评估针尖、侧孔及表面结构，不将某一针尖形式表述为对所有耗材都无碎屑。",
        sourceIds: ["hamiltonNeedles", "idexProbes", "tecanProbes"],
      },
      {
        id: "wall", navLabel: "管径与刚性", title: "穿刺时容易弯针，加粗针管还是加厚管壁？",
        answer: "要同时看针管截面、安装支撑和有效伸出长度。加粗或加厚都不是独立选择，因为它们还会影响穿刺开口、通液截面和耗材配合。",
        paragraphs: [
          "在外径不变时，加厚管壁会缩小内径。它可以作为提高结构刚性的方向，但也会改变流道；对黏稠或含颗粒样本，还要核对实际取液通畅性。",
          "如果针体从固定位置伸出过长或安装未对中，仅调整管径可能仍会弯针。应先排除运动干涉与偏载，再结合真实封口阻力选择针管和支撑位置。",
        ],
        sourceIds: ["hamiltonGauge", "tecanProbes"],
      },
      {
        id: "vent", navLabel: "压力平衡", title: "密闭瓶取液为什么越吸越困难？什么时候需要排气？",
        answer: "在密闭容器内，取走液体会使气相空间的压力降低，注入液体则可能使压力升高。取液不稳时，应把压力平衡与针孔堵塞、液路漏气分开判断。",
        paragraphs: [
          "当容器封闭、吸分液量或重复动作使压力变化明显时，可以评估独立排气或压力平衡路径。排气孔、排气槽与取液孔各有作用，不能因为针体上有孔，就认为已经具备有效的压力补偿。",
          "设计时还要确定气体从哪里进入或排出，以及是否需要过滤、密闭回路或其他污染控制。排气口不应在未明确流路的情况下随意对外开放；是否采用及如何实现，按实际耗材和系统要求确认。",
        ],
        sourceIds: ["hamiltonVenting"],
      },
      {
        id: "position", navLabel: "深度与孔位", title: "针尖已经穿透，为什么还是吸不到液体？",
        answer: "针尖穿过封口，不代表取液口已经到达液体中。带侧孔或独立排气结构时，必须分别检查针尖、取液口和气路开口的位置。",
        paragraphs: ["先用实际耗材截面和最低工作液位确定位置关系，再安排穿刺深度。若取液口仍被封口材料遮住、位于液面上方，或抵到容器底部，即使针尖已穿透，取液也可能异常。"],
        comparison: { headings: ["位置", "需要实现什么", "常见判断误区"], rows: [
          ["针尖", "完成穿透并保留与杯底的运动间隙", "只增加穿刺深度，却没有检查底部干涉。"],
          ["取液口", "避开封口遮挡，并在目标取液阶段处于有效液面内", "把针尖位置当成侧孔或液体入口位置。"],
          ["压力平衡开口", "与设计中的气相或压力平衡路径连通", "气孔被封口遮住、被液体淹没，或接入了错误通道。"],
        ] },
        sourceIds: ["hamiltonVenting", "hamiltonLength"],
      },
      {
        id: "use", navLabel: "试穿刺与更换", title: "怎样试穿刺？什么时候应检查或更换针体？",
        answer: "用实际耗材连续验证完整动作，并把穿刺后的取液和退针一起检查。更换时机应依据针尖、针体与结果的变化制定，不能套用统一的穿刺次数。",
        paragraphs: ["首次安装先确认夹持、对中与空行程，再以受控动作进行试穿刺。比较不同耗材批次时，保持针体版本、深度和速度一致，才能判断变化来自针体还是耗材。"],
        steps: [
          { title: "记录一次完整动作", text: "从穿刺到取液、排气和退针连续观察，记录阻力或力值、针体偏转、碎屑、液量与气泡。" },
          { title: "检查重复使用后的变化", text: "在约定循环后检查针尖磨损、孔口堵塞、弯曲和取液结果，按项目确定检查与更换条件。" },
          { title: "异常时先停止并定位", text: "阻力突然升高、针体变形或出现碎屑时先停机。保留耗材和照片，避免自行磨尖、掰直或增大推力继续运行。" },
        ],
        sourceIds: ["hamiltonNeedles", "tecanProbes", "idexProbes"],
      },
    ],
  },
  "wash-probes": {
    slug: "wash-probes", name: "清洗针",
    task: "用于针内外清洗、废液抽排或残液处理。先分清清洗液供给与废液回收任务，再确认孔位、通道和安装空间。",
    drawingFocus: "标出清洗对象、清洗站空间、供液和排废通道、孔口方向、目标覆盖区域，以及安装基准与运动间隙。",
    structureNote: "单头、双头、多头、侧孔与弯折形式按清洗站定制；供液、喷洗和抽排功能需落实到对应通道。",
    selectionLead: "清洗针的目标是把残留带走，而不只是让清洗液流出来。应先分清针内冲洗、针外喷洗和废液抽排，再判断孔位、通道与清洗节拍是否合适。",
    questions: [
      {
        id: "paths", navLabel: "清洗与排废", title: "清洗针选供液、喷洗还是抽排？三者能混用吗？",
        answer: "先按液体走向区分任务。清洗液到达污染部位后，还要有可靠的废液去路；单头、双头或多头描述的是结构数量，不直接等于某一种清洗功能。",
        paragraphs: ["将清洗站拆成供液、接触和排废三个环节，可以看出问题究竟发生在喷不到、冲不净，还是排不走。恒永达可按项目评估单头、多头、侧孔与多路径结构，具体功能落实到每条通道。"],
        comparison: { headings: ["任务", "清洗液或废液怎么走", "选型的关键"], rows: [
          ["针内冲洗", "清洗液经过被清洗针的内部流道", "冲洗路径应覆盖内部接液面，并与泵阀及后续排废连通。"],
          ["针外喷洗", "从外部向针体表面供液", "孔位、朝向与插入位置决定实际覆盖，不能只看是否出水。"],
          ["废液抽排", "把污染液和残液从目标位置带走", "关注抽排口位置、管路通畅和动作时序，避免积液影响下一次清洗。"],
        ] },
        sourceIds: ["tecanProbes", "arcmedFinish"],
      },
      {
        id: "holes", navLabel: "孔位与流量", title: "喷孔越多、流量越大，清洗就越好吗？",
        answer: "不一定。首先要让清洗液到达真正需要清洗的区域，并及时带走污染液；增加孔数或供液量，不能弥补覆盖盲区或排废不足。",
        paragraphs: [
          "在给定供液条件下，改变孔数、孔径和通道，会改变各孔的出液状态。因此要观察每个喷孔的覆盖，而不是只记录泵的标称流量。小孔还应考虑堵塞和维护，出液过强则要检查飞溅及相邻区域污染。",
          "选侧孔与多头结构时，把孔口朝向、针与喷孔之间的距离、清洗站定位及动作顺序一起比较。若排废不及时，单纯增加供液可能只会使清洗槽积液更多。",
        ],
        sourceIds: ["tecanProbes"],
      },
      {
        id: "residue", navLabel: "残留与清洗液", title: "看起来已经冲干净，为什么仍有残留或交叉污染？",
        answer: "看得见的挂滴消失，不表示样本残留已经被清除。还要看清洗液能否去除实际污染物、接触时间是否足够，以及内外接液面是否都被清洗到。",
        paragraphs: [
          "如果清洗液不能有效溶解或带走残留，增加冲洗量未必能达到目标。试剂成分、清洗液与针体材料及涂层要一起评估；这里不提供适用于所有样本的通用清洗剂、浓度或时间。",
          "确认清洗效果应采用项目既定的残留或携带污染检测方法。若结果不达标，分别排查清洗覆盖、实际供液、接触时间、废液回收及其他接液部件，避免把所有残留都归因于清洗针。",
        ],
        sourceIds: ["watersWash", "tecanProbes", "arcmedFinish"],
      },
      {
        id: "channels", navLabel: "多头一致性", title: "多头清洗共用一台泵，各通道会自动一样吗？",
        answer: "不能仅凭共用同一台泵判断一致性。不同支路的管径、长度、弯折、孔口和堵塞状态，会影响实际供液与抽排表现。",
        paragraphs: [
          "选多头结构时，既要看头间距能否匹配工位，也要逐路观察清洗覆盖和排废。某一路通畅，不代表其他支路也达到相同结果；整机测试不能只测其中一个针头。",
          "如果出现同一时间清洗却有的工位积液、有的覆盖不足，应先比较支路连接、孔口方向和动作条件，再决定是否调整结构。针头数量增加后，也要重新检查总供排液能力与清洗节拍。",
        ],
        sourceIds: ["tecanProbes", "arcmedFinish"],
      },
      {
        id: "use", navLabel: "装机清洗试验", title: "清洗针安装后，怎样判断方案真正有效？",
        answer: "按“逐路通液—完整清洗—残留检测”的顺序验证，并把清洗后的结果与清洗耗液、时间一起比较。",
        paragraphs: [],
        steps: [
          { title: "先看清洗路径", text: "确认供液与排废接口，逐路观察喷孔方向、覆盖、堵塞和密封，再组合运行，检查积液与飞溅。" },
          { title: "再用实际污染物", text: "用真实样本或试剂流程进行清洗，按约定方法测残留；记录清洗液、用量、接触时间及排废时序。" },
          { title: "把维护和节拍一起验收", text: "检查连续运行及清洗液、废液液位变化时的表现；停机按确认流程处理残液，发现堵孔时不要自行扩大孔口。" },
        ],
        note: "孔口出液正常只是通液检查，清洗结果仍需按实际方法验收。",
        sourceIds: ["tecanProbes", "watersWash"],
      },
    ],
  },
  "stirring-paddles": {
    slug: "stirring-paddles", name: "搅拌桨",
    task: "用于样本、试剂、稀释液或反应液混匀。先确认反应杯、液量与混匀目标，再选择桨叶、安装结构和运动条件。",
    drawingFocus: "标出反应杯开口、内壁和杯底形状、液面范围、桨叶尺寸、浸入深度、安装端与旋转包络。",
    structureNote: "平板、螺旋或 90 度角叶片按实际混匀任务评估；表面涂层、焊接、同轴度和安装端分别确认。",
    selectionLead: "搅拌桨的选择，应围绕液体怎样流动、何时达到混匀，以及是否产生气泡和飞溅。桨叶形状、杯形、液量、浸入位置和运动程序需要一起考虑。",
    questions: [
      {
        id: "shape", navLabel: "桨叶选择", title: "平板、螺旋和 90 度角叶片，哪一种更适合混匀？",
        answer: "没有脱离杯形和液量的通用最优形状。先判断需要加强上下液层交换、局部流动还是杯内整体循环，再用候选桨叶进行比较。",
        paragraphs: [
          "桨叶的作用是改变液体运动：轴向流动有利于上下循环，径向流动将液体推向杯壁，切向运动则使液体沿容器周向运动。看到液体整体转动，并不能单凭外观确认不同位置已达到均一。",
          "恒永达可按项目评估平板、螺旋和角叶片结构。螺旋类可作为促进上下循环的候选；平板与角叶片还需结合实际叶片角度、杯壁和杯底空间比较，不能只根据“90 度”或“螺旋”的名称推定混匀时间。",
        ],
        sourceIds: ["ikaMixing"],
      },
      {
        id: "speed", navLabel: "转速与气泡", title: "提高转速，就能缩短混匀时间吗？",
        answer: "转速是调节手段之一，同时要满足混匀结果、气泡和飞溅要求。单独追求更快，可能只增加液面扰动而没有解决需要混匀的部位。",
        paragraphs: [
          "应在允许的运动范围内比较转速、搅拌时间、旋转方向和浸入位置。若气泡或飞溅先于目标混匀出现，应回到桨叶尺寸、流动方式和位置寻找原因，而不是继续加速。",
          "不同液量下液面高度会变化，同一程序也可能呈现不同结果。选型试验应覆盖最低和最高工作液量，再确定满足目标的运行组合；不把大容器搅拌设备的转速或几何比例直接套用到反应杯。",
        ],
        sourceIds: ["ikaMixing"],
      },
      {
        id: "position", navLabel: "杯形与位置", title: "搅拌桨能放进反应杯，为什么仍需要确认长度和间隙？",
        answer: "能装入只是静态条件，还要检查旋转、升降及不同液位下的完整运动包络。桨叶与杯底、杯壁的相对位置也会改变被带动的液体区域。",
        paragraphs: ["总长、有效伸出长度和浸入深度应以明确的安装基准区分。若用改变长度来补偿安装偏差，可能同时改变浸入位置和运动间隙，原来的混匀结果就不再适用。"],
        comparison: { headings: ["要比较的位置", "为什么影响结果", "安装时怎么判断"], rows: [
          ["液面与桨叶", "液量变化会改变叶片浸入状态及液面扰动", "在工作液量范围内观察，不只用一个液量确认程序。"],
          ["杯底、杯壁与桨叶", "既影响运动干涉，也影响局部流动和残留区域", "检查完整旋转与升降范围，再验证实际混匀；间隙按确认图纸执行。"],
          ["安装端与桨杆", "紧固、同轴状态或变形会影响运动稳定性", "低速检查摆动和异响，确认异常原因后再进入自动运行。"],
        ] },
        sourceIds: ["ikaMixing"],
      },
      {
        id: "surface", navLabel: "涂层与清洗", title: "搅拌桨做了涂层，是不是就不挂液、也不需要清洗？",
        answer: "涂层可以作为改善表面润湿和挂液的方向，但不能据此省略清洗。是否需要涂层，应由实际介质、带液要求和清洗条件决定。",
        paragraphs: [
          "先区分问题来自桨叶表面、桨杆还是焊接和连接位置，再比较表面处理方案。颜色或外观不能代替材料与涂层兼容性的判断，反复清洗后的表面状态也需要观察。",
          "若混匀后转移到下一份样本，应在实际流程中检查带液和残留。既要看混匀是否达标，也要看清洗后能否满足下一步使用要求。具体涂层、处理部位和清洗方式按项目确认。",
        ],
        sourceIds: ["arcmedFinish", "watersWash"],
      },
      {
        id: "use", navLabel: "混匀与使用", title: "怎样确认已经混匀？到手后应怎样试用？",
        answer: "用能够反映均一性的检测方法确认结果，而不是只看液体是否旋转。安装、运动、混匀和清洗应按顺序验证。",
        paragraphs: ["比较方案时固定杯型、实际液体、液量、检测时间点和取样方法，按项目选择能反映均一性的检测指标。需要时比较不同位置或连续取样的结果，同时记录气泡、飞溅和沉淀残留。"],
        steps: [
          { title: "确认机械运动", text: "按图纸安装，先低速检查紧固、摆动与完整运动间隙，避免用手掰直桨杆或改变叶片角度。" },
          { title: "比较真实混匀结果", text: "带实际液体，在工作液量范围内比较桨叶、位置和运动程序；每次只改变一个主要因素并记录结果。" },
          { title: "检查清洗与使用后状态", text: "按确认流程清洗桨叶、桨杆和连接处，观察表面损伤或变形。出现摆动、异响或干涉时先停止运行。" },
        ],
        note: "搅拌桨供货为按图确认的部件，具体驱动程序、混匀效果与验收条件需在实际杯型和介质中确定。",
        sourceIds: ["ikaMixing", "arcmedFinish"],
      },
    ],
  },
};

export function getProbeGuide(slug: string | undefined): ProbeGuide | null {
  return slug && Object.hasOwn(guides, slug) ? guides[slug] : null;
}

export const probeDeliverySource = { documentId: "FR-QR-YX-011", revision: "A00" } as const;
