import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import { FITTING_PUBLISHED_PRODUCTS } from "@/data/products/selection/fitting-publication.generated";
import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";
import { luerFittingSlug } from "./technical-article-availability";

import en from "./luer-fitting-locales/en.json";
import es from "./luer-fitting-locales/es.json";
import fr from "./luer-fitting-locales/fr.json";
import ko from "./luer-fitting-locales/ko.json";
import ru from "./luer-fitting-locales/ru.json";

export { luerFittingSlug } from "./technical-article-availability";

const featuredModels = ["LPS-32-PP-N", "LPR-32-PP-N", "LP-32D-PP-N", "LS-32D-PP-N"] as const;
const featuredProducts = featuredModels.map(model => {
  const product = FITTING_PUBLISHED_PRODUCTS.find(item => item.foreachModel === model);
  if (!product) throw new Error(`Missing luer article product: ${model}`);
  return product;
});

/* Evidence reviewed 2026-10-13:
 * FOREACH A02 tubing/fittings catalogue, printed pp.50–61; current luer selection records.
 * Drawings: LPS-C.pdf, 旋转锁圈公鲁尔接头LPR-C.pdf, 一体式公鲁尔集合-C.pdf,
 * and 443-02-00162-C.pdf (PMLS-U28-32D-PP-N).
 * LP has a luer locking thread; LSL/LRL cores require their lock rings (A02 p.51).
 * 1.6/2.4/3.2 mm are tubing IDs. PMLS U28 is a panel-mount thread, not a fluid port.
 * Lengths are drawing overall lengths, not the installed length of a mated pair.
 * PMLS-32's shared product image is not used as an exact-SKU illustration or linked
 * as a published detail page. Only the published manifest supplies product cards.
 * General lock/slip/6% terminology cross-checked against:
 * https://fluid-components.nordsonmedical.com/Products/Fluid-Components/Luer-Fittings/
 * No competitor pressure, torque, medical conformity, or sterilization claims are transferred.
 * Illustrations added 2026-10-15 from VA-SF06-001_A00_cn_鲁尔接头.mp4:
 * 00:59, 01:01, 01:04, 01:12.4 and 01:16. These show assembly principles,
 * not exact-SKU specifications. The video's 330 kPa claim is not adopted.
 */
export const luerFittingCopy: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "什么是鲁尔接头？公母结构、锁紧方式与选型方法",
    seoTitle: "什么是鲁尔接头？公母结构、锁紧方式与选型方法 | FOREACH",
    seoDescription: "了解鲁尔接头的锥面密封原理与公母配合，比较锁紧式、插入式及固定和旋转锁圈，结合 FOREACH LPS、LPR、LP、LS、PMLS 说明软管连接、穿板安装、规格选择与漏液排查。",
    coverImage: featuredProducts[1].imageCard,
    coverAlt: "FOREACH LPR-32-PP-N 旋转锁圈公鲁尔接头及剖面",
  },
  deck: "鲁尔接头通过公、母锥面配合连接液路，锁紧式增加锁圈保持连接。本文从密封位置和装配动作入手，说明固定锁圈、旋转锁圈、一体式公鲁尔与穿板母鲁尔的区别，以及 1.6、2.4、3.2 mm 内径软管的配套方法。",
  leadBlocks: [
    { type: "paragraph", text: "鲁尔接头（Luer fitting）是一类通过公、母锥面配合实现连接的流体接头，常用于实验室和分析仪器中的软管转接、注射器连接及可拆卸液路。公鲁尔的外锥面插入母鲁尔的内锥面，两者贴合形成密封；锁紧式还通过外围锁合结构保持连接，便于管路在装配和使用中保持就位。" },
    { type: "paragraph", text: "恒永达（FOREACH）的鲁尔接头包括 LPS 固定锁圈公鲁尔、LPR 旋转锁圈公鲁尔、LP 一体式公鲁尔、LS 母鲁尔和 PMLS 穿板母鲁尔等结构。本文介绍的倒刺接管配置覆盖 1.6、2.4、3.2 mm 软管内径，按系列提供 PP、PA 及部分 PVDF 材料配置，并有锁圈、色环和安装螺母等配件。" },
    { type: "paragraph", text: "选择鲁尔接头时，先看设备一侧需要公头还是母头，再看连接时能否转动管路、另一端怎样接管或固定。把这三个问题分开，才能把“接得上”落实为可安装、可维护的完整连接。" },
  ],
  sections: [
    {
      title: "公鲁尔与母鲁尔怎样配合？密封位置在哪里？",
      blocks: [
        { type: "paragraph", text: "公母的判断依据是中心锥面：向外伸出的锥形接管端为公鲁尔，接收这个锥体的内锥孔为母鲁尔。公头外面即使带有内螺纹锁圈，仍然是公鲁尔；母头外面的锁合凸耳也不会改变它的母接口属性。只看最外层有没有螺纹，容易把公母判断反。" },
        {
          type: "figure",
          src: "/images/resources/technical-articles/what-is-a-luer-fitting/non-panel-luer-assembly.gif",
          alt: "非穿板鲁尔接头公母配合与黄色锁圈装配过程动图",
          width: 900,
          height: 600,
          caption: "非穿板鲁尔接头装配示意：公母接口配合后，通过外围锁圈保持连接。",
        },
        { type: "paragraph", text: "鲁尔常用的 6% 锥度表示沿轴向长度的直径变化比例，即（大端直径－小端直径）÷锥段轴向长度＝0.06，它不是 6° 的锥角。公、母锥面沿轴向接合后，接触面受到压紧，形成液体通道周围的密封配合。" },
        { type: "paragraph", text: "锁紧式连接在锥面外侧增加机械保持结构：母端的凸耳或相应锁合部位与公端锁圈的内螺纹啮合，使已贴合的锥面保持在连接位置。因此，密封应检查中心锥面，防松和保持应检查外围锁合。若锥面夹有异物或已经划伤，锁圈拧紧也可能漏液；此时继续加力并不能修复密封面。" },
        {
          type: "figure",
          src: "/images/resources/technical-articles/what-is-a-luer-fitting/luer-mated-locking-cutaway.webp",
          alt: "公母鲁尔接头连接后的局部剖开示意，显示黄色锁圈与母端外围锁合部位的配合",
          width: 1080, height: 720,
          caption: "公母鲁尔连接后的外围锁合示意：局部剖开的黄色锁圈展示连接保持结构。外围锁合负责保持连接，中心锥面的贴合负责密封。",
        },
      ],
    },
    {
      title: "锁紧式、插入式与旋转锁圈有什么区别？",
      blocks: [
        { type: "paragraph", text: "插入式（Luer slip）与锁紧式（Luer lock）区分的是连接保持方式。插入式将匹配的公母锥面压合，依靠接触摩擦保持；锁紧式在锥面连接之外增加锁合结构。固定锁圈与旋转锁圈则是锁紧式内部的进一步区分，主要影响锁合时的操作动作和管路扭转。" },
        { type: "table", headers: ["连接形式", "怎样完成连接", "选型时主要考虑"], rows: [
          ["插入式 Luer slip", "公母锥面压合，无额外锁紧螺纹", "适合怎样的操作流程，以及轴向拉力和侧向扰动是否受控"],
          ["固定锁圈 Luer lock", "固定锁圈随公头转动，或由可转动的配对端完成锁合", "装配时是否有一端可转动，接好的软管是否会跟着扭转"],
          ["旋转锁圈 Luer lock", "保持公头与管路方向，转动外围锁圈完成锁合", "管路已布置好、配对端固定或不希望带动软管的场合"],
        ] },
        { type: "subheading", title: "固定与旋转的差异，体现在锁合动作中" },
        { type: "paragraph", text: "例如，把一条已经接好软管的公鲁尔连接到固定母接口时，固定锁圈会随公头一起转动，软管也可能被带动。若软管短、两端已固定或靠近其他管路，这种扭转就会使布管变得困难。旋转锁圈可以在保持公头方向的同时完成锁合，因此更便于这类已布管位置的接驳。" },
        {
          type: "figure",
          src: "/images/resources/technical-articles/what-is-a-luer-fitting/fixed-locking-collar-end-view.webp",
          alt: "固定锁圈公鲁尔端面结构示意，芯子与外围锁圈通过限位部位保持相对固定",
          width: 1080, height: 720,
          caption: "固定锁圈结构示意：锁圈与芯子相对固定，锁合时需考虑接头及已连接软管的转动空间。",
          link: { href: `${featuredProducts[0].detailHref}/`, label: "查看 LPS-32-PP-N 产品" },
        },
        {
          type: "figure",
          src: "/images/resources/technical-articles/what-is-a-luer-fitting/rotating-locking-collar-end-view.webp",
          alt: "旋转锁圈公鲁尔端面结构示意，黄色环形箭头表示锁圈与芯子之间可相对转动",
          width: 1080, height: 720,
          caption: "旋转锁圈结构示意：锁圈与芯子可以相对转动，装配时可保持芯子与软管方向，转动外围锁圈完成连接。",
          link: { href: `${featuredProducts[1].detailHref}/`, label: "查看 LPR-32-PP-N 产品" },
        },
        { type: "paragraph", text: "这里的“旋转”描述锁圈的装配功能，不表示接头可以作为液路旋转接头持续运转。连接后仍应给软管留出弯曲余量，避免拉力或侧向力长期集中在锥面连接处。" },
        { type: "subheading", title: "一体式公鲁尔也可以是锁紧式" },
        { type: "paragraph", text: "LP 的“一体式”描述本体与锁紧结构的构成方式，它本身带有鲁尔锁紧螺纹，不能归入无螺纹的插入式。类似地，LSL、LRL 是用于组成公鲁尔的芯子，需要配套锁圈；不能把省去锁圈的芯子直接当成完整的 Luer slip 接头使用。" },
      ],
    },
    {
      title: "FOREACH 鲁尔接头有哪些结构和规格？",
      blocks: [
        { type: "subheading", title: "先按接口功能选择系列" },
        { type: "table", headers: ["系列", "结构与连接任务", "本体材料配置"], rows: [
          ["LPS", "固定锁圈公鲁尔，软管转公鲁尔", "PP"],
          ["LPR", "旋转锁圈公鲁尔，便于保持软管方向", "PP、PA"],
          ["LP", "一体式公鲁尔，带锁紧结构", "PP、PA"],
          ["LS", "母鲁尔，软管转母鲁尔", "PP、PA"],
          ["PMLS", "穿板母鲁尔，将可拆接口固定在面板上", "PP、PA，部分配置为 PVDF"],
          ["LSL / LRL", "固定式 / 旋转式公鲁尔芯，须配套锁圈", "LSL 为 PP、PA；LRL 另有 PVDF 配置"],
        ] },
        { type: "paragraph", text: "上表材料按系列列出，不能理解为每种尺寸、颜色和结构都有全部材料组合。分件装配还要区分芯子与锁圈：芯子形成流体通道，锁圈承担外围锁合；LPT 锁圈、LCR 色环与 LNS 安装螺母的作用也不同，选配时应保留完整零件型号。" },
        { type: "subheading", title: "1.6、2.4、3.2 mm 是软管内径，不是鲁尔口径" },
        { type: "paragraph", text: "倒刺端插入软管内部，因此这几档尺寸按软管内径选择。以 LPR-32-PP-N 为例，32 对应 3.2 mm 接管内径，PP 为材料，N 为本色。鲁尔端的公母与锁紧结构需要另外确认，不能把“3.2 mm 鲁尔”当成完整的接口描述。" },
        { type: "paragraph", text: "这与卡箍、卡环硬管连接的选管方法不同：后者的密封和夹持结构围绕管外壁配合，重点匹配管外径。相同的“1.6 mm”，在倒刺式鲁尔和硬管卡箍型号中可能指向不同的管材尺寸。软管内径确定后，还应结合壁厚、硬度和材料检查倒刺插装与保持状态。" },
        { type: "subheading", title: "轴向空间受限时，再比较本体总长" },
        { type: "table", headers: ["适配软管内径", "LPS 总长", "LPR 总长", "LP 总长"], rows: [
          ["1.6 mm", "20.0 mm", "20.0 mm", "14.85 mm"],
          ["2.4 mm", "22.3 mm", "22.3 mm", "17.15 mm"],
          ["3.2 mm", "25.0 mm", "25.0 mm", "19.85 mm"],
        ] },
        { type: "paragraph", text: "同为 3.2 mm 接管内径时，LP 图示总长比 LPS、LPR 短 5.15 mm，可作为紧凑布置的候选；LPS 与 LPR 的总长相同，两者的主要选择差异是锁圈能否相对芯子转动。不要为了单件更短而忽略锁合时的手指空间、软管扭转以及出口处的弯曲半径。" },
        { type: "paragraph", text: "这些数值是图纸上的单件总长。公母连接后的占用长度还与配对端及接合位置有关，不能直接把单件差值当作整套液路节省的空间。布置设备时，应使用选定双方的装配尺寸。" },
        { type: "links", items: [{ prefix: "需要比较硬管结构时，可参阅：", href: "/resources/technical-articles/hard-tube-fittings-selection-guide/", label: "硬管接头选型指南" }] },
      ],
    },
    {
      title: "软管转接与穿板安装，怎样组成完整液路？",
      blocks: [
        { type: "subheading", title: "软管转接要同时匹配两端" },
        { type: "paragraph", text: "一只鲁尔转倒刺接头承担两个连接：鲁尔端连接设备或另一只接头，倒刺端连接软管。例如，设备已经有母鲁尔口，软管侧应选择与它配合的公鲁尔；软管内径再决定倒刺规格。若两条软管需要对接，则可由一只公鲁尔和一只母鲁尔组成接驳点，两侧软管可以分别选型。" },
        { type: "paragraph", text: "鲁尔接头的公母不规定液体的流动方向。普通贯通接头也不承担止回或断开自封功能；需要限制反向流动或断开后止液时，应在系统中采用具有相应功能的阀或专用连接件。" },
        { type: "subheading", title: "穿板母鲁尔把接驳点固定在面板上" },
        { type: "paragraph", text: "需要从设备外部接入管路时，穿板母鲁尔可以把母接口固定在机壳或面板上，内部通过倒刺连接软管，外部与公鲁尔对接。以 PMLS-U28-32D-PP-N 为例，它的倒刺端连接 3.2 mm 内径软管，中间的 1/4-28 UNF 螺纹用于穿板安装，并与相应安装螺母配合。" },
        { type: "paragraph", text: "这段 U28 螺纹的任务是机械固定，液体沿接头内部通道流动。因此，不能把它当成接入歧管的 1/4-28 平底流体端口。穿板选型需要考虑面板开孔、板厚、螺母可用啮合长度和背面布管空间；若目标是设备内螺纹液口，应另选密封结构与该液口匹配的转接件。" },
        {
          type: "figure",
          src: "/images/resources/technical-articles/what-is-a-luer-fitting/bulkhead-luer-panel-installation.webp",
          alt: "穿板母鲁尔安装示意，接头穿过透明面板，安装螺母位于面板另一侧",
          width: 1080, height: 720,
          caption: "穿板母鲁尔安装示意：本体穿过面板，配套螺母用于固定；一侧倒刺连接软管，另一侧母鲁尔接口用于外部接驳。面板固定与鲁尔接口锁合是两个不同的操作位置。",
        },
        { type: "subheading", title: "选型示例：面板外接一条不便转动的软管" },
        { type: "paragraph", text: "假设设备内外均使用 3.2 mm 内径软管，外部管路已固定走向，维护时需要在面板处拆接。可先评估 PMLS-U28-32D-PP-N 穿板母鲁尔与 LPR-32-PP-N 旋转锁圈公鲁尔：母端提供固定接驳位置，外部公端通过旋转锁圈完成锁合，减少装配时带动整条软管的需要。" },
        {
          type: "figure",
          src: "/images/resources/technical-articles/what-is-a-luer-fitting/luer-collar-tubing-rotation-comparison.webp",
          alt: "固定母接口场景下的装配对比，上方旋转锁圈可保持软管方向，下方固定锁圈转动时会带动软管",
          width: 1080, height: 720,
          caption: "固定母接口场景下的锁合动作对比：上图红色叉号表示软管不随锁圈转动，并非错误安装；下图黄色环形箭头表示固定锁圈随公头转动时会带动软管。软管不便转动时，可优先评估旋转锁圈方案。",
        },
        { type: "list", ordered: true, items: [
          "确定面板端：核对 PMLS 的开孔、板厚、配套螺母及背面软管空间。",
          "确定外接端：检查 LPR 与母端的锥面、锁合配合及操作空间，两端倒刺分别匹配 3.2 mm 内径软管。",
          "确定材料：结合实际介质、浓度、温度和清洗流程，评估 PP 接头与所选软管的适用性。",
          "验证样件：按实际压力、启停节拍和布管状态检查密封、进气、流量与拆接后的连接状态。",
        ] },
        { type: "paragraph", text: "这个例子说明的是候选组合及选择理由，不代表已完成特定设备的装机验证。如果设备已自带母鲁尔口，就不需要重复增加穿板件；若有一端能够自由转动，也可以比较固定锁圈或一体式公鲁尔方案。" },
        { type: "paragraph", text: "颜色和 LCR 色环可辅助区分多条液路，但应与管路标签和接口位置配合使用。颜色不同不会改变锥面配合，也不能单独实现防误接。" },
      ],
    },
    {
      title: "鲁尔接头怎样安装和拆接？",
      blocks: [
        { type: "paragraph", text: "装配应分别完成软管端、鲁尔端和面板固定端的操作。先装好软管并留出操作空间，再进行公母对接；采用分件供货的公鲁尔时，应先按配套要求完成芯子与锁圈装配。" },
        { type: "list", ordered: true, items: [
          "检查零件和管端。确认型号、公母及锁圈配套，检查锥面有无异物、划伤或裂纹，软管切口应平整、无残屑和压扁。",
          "连接倒刺端。使用匹配内径及材料的软管，按该型号的插装要求到位，并给管路留出弯曲余量。不能用过度拉伸软管来迁就错误的倒刺尺寸。",
          "对准鲁尔锥面。保持公母轴线对齐，使锥面正常接合，避免靠锁圈把明显偏斜的两端强行拉在一起。",
          "完成锁合。固定锁圈方案要给接头或配对端留出转动空间；旋转锁圈方案保持芯子与管路方向，转动锁圈。卡涩或无法正常啮合时应退出检查。",
          "按液路要求检漏。先完成规定的静态检查，再覆盖实际运行压力、温度和启停条件；在吸液侧同时观察是否进气。",
          "维护前停机并卸压。拆开后检查锥面、锁圈和软管端部，清理污染并更换损伤件，再按原工况复核连接。",
        ] },
        { type: "paragraph", text: "鲁尔锁圈和穿板螺母是两个不同的受力位置，装配方法与锁紧要求应分别确定。批量装配应将操作方法、工具和检漏判据一同写入工艺；不能把卡环或卡箍接头的推荐扭矩移用到鲁尔锁圈，也不能靠包覆生料带修补鲁尔锥面的损伤。" },
      ],
    },
    {
      title: "锁紧后仍然漏液或进气，应该检查哪里？",
      blocks: [
        { type: "paragraph", text: "先定位异常发生在鲁尔接合处、倒刺与软管之间，还是零件本体。不同位置对应不同的处理方法；只有鲁尔接合处的问题才应进一步检查锥面与锁合配合。反复拧锁圈，对倒刺处的软管损伤没有帮助。" },
        { type: "table", headers: ["观察到的现象", "优先检查", "处理方向"], rows: [
          ["鲁尔接合处渗液", "锥面异物、划伤、偏斜，以及锁合是否正常到位", "停机卸压后清洁和检查，损伤件更换，重新对正连接后复测"],
          ["倒刺根部渗液或软管滑动", "管内径、壁厚、材料、插装位置和持续拉力", "重新确认软管配套与布管固定，不通过继续拧锁圈处理"],
          ["吸液时出现气泡，外部未见滴漏", "连接处进气，同时排查液位、吸液管和介质析气", "在相同吸液条件下分段检查，不能仅凭气泡认定接头故障"],
          ["静态正常，启停或移动管路时异常", "压力峰值、侧向拉扯、软管扭转和连接松动", "改善支撑与活动余量，并在实际节拍下验证"],
        ] },
        { type: "paragraph", text: "若更换接头后流量下降，还应比较通道内径、软管内径与长度、局部弯折以及切口残屑。相同接管尺寸并不代表所有接头具有相同的内部通道，也不能仅凭外形或公母类型判断流阻。" },
      ],
    },
  ],
  faqTitle: "常见问题",
  faqItems: [
    { question: "锁紧式鲁尔一定比插入式更耐压吗？", answer: "锁紧式增加了机械保持结构，但允许工作压力仍由具体公母接头、软管、材料、温度和装配状态共同决定。不能只凭有锁圈就给出压力等级，也不能把其他厂商的压力值移用到当前组合。应按完整连接的规格和应用工况验证。" },
    { question: "不同厂商的鲁尔接头可以直接互换吗？", answer: "公母类型相符只是初步条件，还要核对接口尺寸、锁合结构和适用规格文件，并对实际组合进行密封与保持验证。同样叫鲁尔接头，不代表每种供货配置及工况都能无条件互换。" },
    { question: "鲁尔接头拆开后会自动止液吗？", answer: "本文介绍的普通贯通鲁尔接头没有因此获得自动止液功能。是否自封取决于产品是否具有相应阀结构；需要断开止液的液路，应单独选择具备该功能的连接件或控制阀。" },
    { question: "仪器用鲁尔接头可以直接按医疗成品使用吗？", answer: "鲁尔描述接口类型，不能单凭外形认定成品的医疗适用性、无菌状态或灭菌条件。涉及医疗用途时，应核对具体产品及最终组件的适用文件和验证要求。" },
  ],
  cta: {
    title: "需要确认鲁尔接头与现有液路的配套？",
    description: "提供配对端照片或图纸、软管内外径与材料、介质、温度、压力及安装空间，确认公母接口、锁圈形式和接管方案。",
    contactLabel: "联系技术支持", productsLabel: "查看鲁尔接头", productsHref: "/products/fittings/luer-fittings/",
  },
};

export const luerFittingNavigation = [
  { id: "sealing", label: "公母结构与密封" },
  { id: "locking", label: "连接与锁紧方式", children: [
    { id: "fixed-vs-rotating", label: "固定与旋转锁圈" },
    { id: "integral-lock", label: "一体式与芯子" },
  ] },
  { id: "series", label: "系列、管径与尺寸", children: [
    { id: "series-choice", label: "系列与材料" },
    { id: "tubing-id", label: "软管内径" },
    { id: "overall-length", label: "本体总长" },
  ] },
  { id: "connection", label: "软管与穿板选型", children: [
    { id: "hose-connection", label: "软管转接" },
    { id: "panel-mount", label: "穿板安装" },
    { id: "selection-example", label: "完整选型示例" },
  ] },
  { id: "installation", label: "安装和拆接" },
  { id: "troubleshooting", label: "漏液与进气排查" },
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

export function getLuerFittingArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  const copy = getLuerFittingCopy(locale);
  return [{
    id: luerFittingSlug, slug: luerFittingSlug, category: "fittings-tubing",
    ...copy.metadata, summary: copy.deck, date: "2026-10-13",
    relationKeys: ["series:lps", "series:lpr", "series:lp", "series:ls", "series:pmls"], relationPriority: 150,
    content: [
      { title: "", content: copy.leadBlocks.map(blockText).join("\n\n") },
      ...copy.sections.map(section => ({ title: section.title, content: section.blocks.map(blockText).join("\n\n") })),
      { title: copy.faqTitle, content: copy.faqItems.map(item => `${item.question}\n${item.answer}`).join("\n\n") },
    ],
  }];
}

const translations = { en, es, fr, ko, ru };

export function getLuerFittingCopy(locale: TechnicalArticleLocale): DiaphragmPumpEngineeringArticleCopy {
  return locale === "zh-CN" ? luerFittingCopy : translations[locale] as DiaphragmPumpEngineeringArticleCopy;
}

export function getLuerFittingNavigation(locale: TechnicalArticleLocale) {
  return locale === "zh-CN" ? luerFittingNavigation : translations[locale].navigation;
}

export function getLuerFittingRelatedProducts(locale: TechnicalArticleLocale = "zh-CN"): RelatedResourcesData {
  const label = locale === "zh-CN" ? "鲁尔接头" : translations[locale].relatedProductLabel;
  return { locale, articles: [], videos: [], products: featuredProducts.map(product => ({
    id: product.productCode, title: product.foreachModel,
    href: locale === "zh-CN" ? `${product.detailHref}/` : `/${locale}${product.detailHref}/`,
    imageSrc: product.imageCard, imageAlt: `FOREACH ${product.foreachModel} ${label}`,
  })) };
}
