import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import { FITTING_PUBLISHED_PRODUCTS } from "@/data/products/selection/fitting-publication.generated";
import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";
import { barbedFittingSlug } from "./technical-article-availability";
import en from "./barbed-fitting-locales/en.json";
import es from "./barbed-fitting-locales/es.json";
import fr from "./barbed-fitting-locales/fr.json";
import ko from "./barbed-fitting-locales/ko.json";
import ru from "./barbed-fitting-locales/ru.json";

export { barbedFittingSlug } from "./technical-article-availability";

// Supplied photos identify equal-size PA bodies, without a verified tubing size.
// Link to selection rather than assigning an unverified model to either photo.
const featuredProducts = [
  { id: "barbed-equal-tee-pa", kind: "tee", imageSrc: "/images/resources/technical-articles/what-is-a-barbed-fitting/tee-pa-black-square.webp" },
  { id: "barbed-equal-elbow-pa", kind: "elbow", imageSrc: "/images/resources/technical-articles/what-is-a-barbed-fitting/elbow-pa-black-square.webp" },
] as const;

function productHref(model: string) {
  const product = FITTING_PUBLISHED_PRODUCTS.find(item => item.foreachModel === model);
  if (!product) throw new Error(`Missing published barbed fitting: ${model}`);
  return `${product.detailHref}/`;
}

/* Evidence reviewed 2026-10-19:
 * FOREACH A02 tubing/fittings catalogue, pp.27-34: six body geometries,
 * tubing IDs, C/F/D/V/X profile table, model naming, PP/PA and report availability.
 * The supplied profile PNG agrees with the catalogue table; preserve it unchanged.
 * Body illustrations are clean crops from catalogue pp.27 (BL), 28 (BA),
 * 30 (BT), 31 (BY), and 32 (BX4/BF4); no dimensions or surrounding copy included.
 * Catalogue p.28: BA-32F tube ID 3.2 mm, crest A 4.0 mm, bore B 2.4 mm,
 * overall length D 23.0 mm. The 25% below is a geometric calculation, not a test.
 * Do not use the inconsistent BA-32D crest dimension or infer tolerances/ratings.
 * Published fitting manifest supplies the exact SKU links used in the article.
 * Sidebar photos show equal-size PA tee/elbow bodies without verified sizes;
 * their type-level cards link to the fitting selection page.
 * BF4/BX4 are catalogue types; no unpublished SKU detail link is fabricated.
 * ISO certificate images in public/images/home/company-honors-original/:
 * ISO 9001:2015 no.04723Q10712R0M and ISO 13485:2016 no.04723Q10000712.
 * Both show expiry 2026-11-14; certificate-body live status was not queried.
 * Claims say certificates obtained; not individual fitting certification.
 * data/about-quality.ts supports company-level inspection/document/traceability capability;
 * no per-piece pressure inspection or specific tolerance is asserted.
 * Market terminology and structure research: ISM barb-connectors-in-depth-design-and-function;
 * CPC hose-barbs-are-they-the-perfect-design; Clippard cms/node/567.
 * Zhihu p/591432011 was read for article organization only (hydraulic scope).
 * ISO standards pages and the European Commission RoHS page distinguish document types.
 * No competitor pressure, durometer, certification or interchangeability claim is transferred.
 */
export const barbedFittingCopy: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "什么是倒刺接头？结构类型、软管匹配与质量合规选型",
    seoTitle: "倒刺接头怎么选？C/F/D/V/X结构、软管匹配与认证资料 | FOREACH",
    seoDescription: "结合恒永达 BA、BL、BT、BY、BX4、BF4 倒刺接头，解释接管内径、C/F/D/V/X轮廓与膨胀率、PP和PA材料、ISO质量体系及REACH/RoHS/MSDS资料，说明仪器液路的安装与验证方法。",
    coverImage: "/images/resources/technical-articles/what-is-a-barbed-fitting/barbed-fittings-group-blue.webp",
    coverAlt: "蓝色背景上的恒永达不同尺寸直通、L型、T型和Y型倒刺接头合照",
  },
  deck: "选倒刺接头，要把液路结构、软管配合、材料资料和批量质量要求一起确定。相同的接管内径，并不意味着倒刺轮廓、装配手感或使用条件相同。",
  leadBlocks: [
    { type: "paragraph", text: "倒刺接头是一类将带有凸缘或倒钩轮廓的接管端插入软管内部，利用软管的扩张、回弹与接触配合完成连接的零件，英文常称 barbed fitting 或 hose barb fitting。它可用于仪器内的清洗液、试剂、废液及气路连接；具体能否使用，取决于管材、介质、压力、温度和连接验证。" },
    { type: "paragraph", text: "恒永达倒刺接头涵盖 BA 直通、BL L 型、BT T 型、BY Y 型、BX4 十字型和 BF4 π 型，主要材料包括 PP 与 PA（尼龙），并提供等径、异径等配置。尺寸后面的 C/F/D/V/X 表示倒刺轮廓；1.6、2.4、3.2 mm 等数值表示适配软管内径。这几层信息需要分别读取，才能得到完整的选型结果。" },
    { type: "paragraph", text: "用于设备批量配套时，接头的价值还体现在能否把样机上的连接方式转化为明确的型号、图纸、材料文件及检验要求。恒永达已取得 ISO 9001 和 ISO 13485 质量管理体系认证，倒刺接头可按具体配置沟通提供 REACH、RoHS、MSDS 相关资料。本文将产品结构与这些资料的用途一起说明。" },
  ],
  sections: [
    {
      title: "倒刺接头怎样连接软管，密封和保持有什么区别？",
      blocks: [
        { type: "paragraph", text: "装配时，管端先沿倒刺的导入面扩张，越过凸缘，再包覆后方的接管段。软管内壁与接头表面的贴合形成密封，倒刺轮廓与软管的机械配合帮助保持连接。因此，倒刺既不是拧入软管的螺纹，也不应靠刺破管壁来固定。" },
        { type: "paragraph", text: "判断连接是否合适，要分别看装得进去、留得住和密封得好。插装过于费力可能损伤管端；容易插入但配合松散，也可能在受拉或压力变化时松脱。实际结果由倒刺形状与软管内径、壁厚、硬度、回弹共同决定。" },
        { type: "paragraph", text: "对吸液管路，还要观察是否进气。接头外部没有可见液滴，并不证明负压运行时不会吸入空气；同样，短时间手拉不脱落，也不能代替运行工况下的保持性检查。" },
      ],
    },
    {
      title: "恒永达有哪些倒刺接头类型？先按液路走向选本体",
      blocks: [
        { type: "figure", src: "/images/resources/technical-articles/what-is-a-barbed-fitting/barbed-fittings-group-blue.webp", alt: "蓝色背景上的恒永达不同尺寸直通、L型、T型和Y型倒刺接头合照", width: 2375, height: 1237, caption: "不同本体结构承担对接、转向或分支任务；具体管径、材料和倒刺代码应继续按型号选择。" },
        { type: "table", headers: ["系列与本体", "连接任务", "选型重点"], rows: [
          ["BA 直通型", "连接两段同内径或不同内径软管", "等径对接或异径过渡，两端分别确认配管尺寸"],
          ["BL L 型", "在有限空间内改变管路走向", "弯头尺寸、出口方向及软管弯曲余量"],
          ["BT T 型", "形成主通路与侧支路", "三端尺寸及端口位置，按图纸对应各支路"],
          ["BY Y 型", "形成 Y 形分支或汇合路径", "分支走向与三端管径，结合实际流向布管"],
          ["BX4 十字型", "连接四个方向的软管", "各端布局、装配空间及管路识别"],
          ["BF4 π 型", "形成 π 形多通连接", "按结构图确认各端位置和设备布置空间"],
        ] },
        { type: "figure", src: "/images/resources/technical-articles/what-is-a-barbed-fitting/ba-straight.png", alt: "BA 直通型倒刺接头本体示意图", width: 435, height: 435, caption: "BA 直通型", captionHref: productHref("BA-32F-PP-N") },
        { type: "figure", src: "/images/resources/technical-articles/what-is-a-barbed-fitting/bl-elbow.png", alt: "BL L 型倒刺接头本体示意图", width: 390, height: 390, caption: "BL L 型", captionHref: productHref("BL-32F-PP-N") },
        { type: "figure", src: "/images/resources/technical-articles/what-is-a-barbed-fitting/bt-tee.png", alt: "BT T 型倒刺接头本体示意图", width: 513, height: 366, caption: "BT T 型", captionHref: productHref("BT-32D-PP-N") },
        { type: "figure", src: "/images/resources/technical-articles/what-is-a-barbed-fitting/by-wye.png", alt: "BY Y 型倒刺接头本体示意图", width: 387, height: 459, caption: "BY Y 型", captionHref: productHref("BY-32D-PP-N") },
        { type: "figure", src: "/images/resources/technical-articles/what-is-a-barbed-fitting/bx4-cross.png", alt: "BX4 十字型倒刺接头本体示意图", width: 492, height: 543, caption: "BX4 十字型", captionHref: "/downloads/resources/datasheets/zh-CN/Tubing-and-Fittings/foreach-fittings-and-elastomer-tubing-catalog-a02-cn.pdf#page=32" },
        { type: "figure", src: "/images/resources/technical-articles/what-is-a-barbed-fitting/bf4-pi.png", alt: "BF4 π 型倒刺接头本体示意图", width: 678, height: 285, caption: "BF4 π 型", captionHref: "/downloads/resources/datasheets/zh-CN/Tubing-and-Fittings/foreach-fittings-and-elastomer-tubing-catalog-a02-cn.pdf#page=32" },
        { type: "paragraph", text: "T 型、Y 型和多通本体提供贯通路径，本身不负责等量分液，也不具有止回功能。各支路得到多少流量，还受管径、长度、末端阻力和液位影响；需要防倒流或控制分配量时，应另行配置相应的阀或计量部件。" },
        { type: "paragraph", text: "等径与异径描述各端适配的软管内径。例如 BA-32F-PP-N 用于两端 3.2 mm 内径软管，BA-24F-32F-PP-N 用于 2.4 mm 与 3.2 mm 内径软管之间的过渡。异径 T/Y 型还要核对型号中每个位置对应哪一端，不能仅凭三个数字判断方向。" },
        { type: "paragraph", text: "BBL 倒刺堵头用于封闭软管端部，属于配套封堵件，不应与贯通接头混用。螺纹转倒刺、穿板倒刺和鲁尔转倒刺则承担其他接口任务：它们保留倒刺配管关系，但还需要单独检查螺纹密封、面板安装或公母鲁尔配合。" },
        { type: "links", items: [
          { href: "/products/fittings/barbed-fittings/", label: "查看倒刺接头型号", suffix: "；" },
          { href: "/products/fittings/thread-to-barbed-fittings/", label: "查看螺纹转倒刺接头", suffix: "；" },
          { href: "/resources/technical-articles/what-is-a-luer-fitting/", label: "了解鲁尔端与倒刺端的配合" },
        ] },
      ],
    },
    {
      title: "C、F、D、V、X代表什么？怎样理解膨胀率？",
      blocks: [
        { type: "paragraph", text: "C/F/D/V/X 是尺寸后面的倒刺形状代码，不能与 BA、BL、BT、BY 等本体系列混为一谈。前者说明软管接触的轮廓，后者说明液路连接的形状。一只直通接头和一只 L 型接头可以采用相同的倒刺代码。" },
        { type: "figure", src: "/images/resources/technical-articles/what-is-a-barbed-fitting/barb-profile-c-f-d-v-x.png", alt: "恒永达 C、F、D、V、X 五种倒刺轮廓、膨胀率及系列匹配标识对照表", width: 1364, height: 624, caption: "恒永达倒刺代码对照图。经典、400、200、500、600 是图中的系列匹配标识，不是压力等级或管径；具体替换仍应核对两端尺寸与配管。" },
        { type: "table", headers: ["倒刺代码", "膨胀率范围", "系列匹配标识"], rows: [
          ["C", "42%–69%", "经典系列"],
          ["F", "25%–32%", "400 系列"],
          ["D", "24%–50%", "200 系列"],
          ["V", "32%–60%", "500 系列"],
          ["X", "32%–50%", "600 系列"],
        ] },
        { type: "paragraph", text: "这些区间用于比较各轮廓的配管扩张特征，不表示软管材料的断裂伸长率，也不表示工作时允许膨胀到相应百分比。它们有重叠，不能据此排列出通用的密封、耐压或抗拔脱等级。具体型号仍要结合软管尺寸和材料评估。" },
        { type: "subheading", title: "用一个尺寸算例理解扩张量" },
        { type: "paragraph", text: "若以倒刺峰部外径与未装配软管内径比较，可用下面的几何比值理解装配时需要跨过的扩张量。它只描述直径关系，不计算插入力、密封接触压力或长期保持力。" },
        { type: "formula", expression: "几何扩张比 =（倒刺峰部外径 − 软管初始内径）÷ 软管初始内径 × 100%", note: "计算时两项尺寸采用同一单位，并使用对应型号图纸和实际软管尺寸。" },
        { type: "paragraph", text: "例如 BA-32F 的接管内径为 3.2 mm，图示倒刺峰部外径 A 为 4.0 mm。按标称尺寸计算，(4.0 − 3.2) ÷ 3.2 × 100% = 25%。这里的 25% 是几何算例，不是某种软管的试验结果；也不能把同代码区间的上下限分别套给每一个型号。" },
        { type: "paragraph", text: "对同一种软管，提高扩张程度通常会改变装配阻力和局部变形，但更大的数值不一定带来更好的连接。正确的比较方法是在候选轮廓上使用相同规格的管材，记录装配状态、泄漏和抗拔脱表现，再决定采用哪一种组合。" },
        { type: "links", items: [{ href: "/resources/technical-articles/barbed-fitting-expansion-ratio/", label: "倒刺膨胀比计算与配合验证", prefix: "需要比较具体型号或评估软管公差时，继续阅读", suffix: "，其中包含 F/D 轮廓尺寸算例和公差边界计算。" }] },
      ],
    },
    {
      title: "读懂型号：接管内径、倒刺代码与材料分别看",
      blocks: [
        { type: "table", headers: ["完整型号示例", "各段含义", "实际连接任务"], rows: [
          ["BA-32F-PP-N", "BA 直通；32 为 3.2 mm 内径；F 轮廓；PP；N 本色", "两段 3.2 mm 内径软管对接"],
          ["BA-24F-32F-PP-N", "两端分别为 2.4 mm / 3.2 mm，均为 F 轮廓", "不同内径软管之间过渡"],
          ["BL-32F-PP-N", "BL L 型；3.2 mm 内径；F 轮廓；PP 本色", "在转角位置连接软管"],
          ["BT-32D-PP-N", "BT T 型；等径 3.2 mm；D 轮廓；PP 本色", "形成三通支路"],
          ["BY-32D-PP-N", "BY Y 型；等径 3.2 mm；D 轮廓；PP 本色", "形成 Y 形连接路径"],
        ] },
        { type: "paragraph", text: "等径型号会省略重复的接管段。例如 BL-32D-32D-PP-N 可简写为 BL-32D-PP-N。不同本体的型号规则仍以对应产品表为准，不能给所有零件机械补上字母或端口数量。材料代码 PA 表示尼龙，颜色代码 W 表示白色；颜色是型号识别信息，不代表质量等级。" },
        { type: "subheading", title: "3.2 mm内径软管，不是3.2 mm外径软管" },
        { type: "paragraph", text: "倒刺插入管内，所以先匹配软管内径。外径随后用于确定壁厚、布管空间以及外部夹持件。假设一条软管内径 3.2 mm、外径 6.4 mm，其标称壁厚为 (6.4 − 3.2) ÷ 2 = 1.6 mm；它不能因为外径为 6.4 mm，就选择给 6.4 mm 内径软管使用的倒刺。" },
        { type: "paragraph", text: "接管内径也不是接头内部流道直径。BA-32F 图中的内孔 B 为 2.4 mm，总长 D 为 23.0 mm；3.2 mm 说明适配软管，2.4 mm 才是该图标注的内孔。对流阻或颗粒通过有要求时，应继续核对流道，而不是把软管内径当成整段液路最小孔径。" },
        { type: "links", items: [
          { href: productHref("BA-32F-PP-N"), label: "BA-32F-PP-N 产品与图纸", suffix: "；" },
          { href: productHref("BA-24F-32F-PP-N"), label: "BA-24F-32F-PP-N 异径型号", suffix: "；" },
          { href: productHref("BL-32F-PP-N"), label: "BL-32F-PP-N L 型型号" },
        ] },
      ],
    },
    {
      title: "怎样选择软管与PP、PA接头材料？",
      blocks: [
        { type: "paragraph", text: "倒刺连接需要软管在装配时适当扩张，并在装配后保持包覆。两条内径相同的软管，若材料、硬度、壁厚或尺寸公差不同，实际配合就可能不同。不能只凭“硅胶管”“PVC 管”或“TPU 管”的名称判断合适，也不能把其他厂商推荐的硬度值当成恒永达全部倒刺的统一要求。" },
        { type: "paragraph", text: "恒永达倒刺接头以 PP、PA 配置为主要选择，具体材料组合随型号变化。选材时应同时核对接头和软管与实际液体、浓度、温度、接触时间及清洗剂的相容性。只确认接头耐某种介质，而不检查软管的溶胀、硬化或回弹变化，仍可能留下连接问题。" },
        { type: "paragraph", text: "对于不易扩张的硬管，应评估与管材匹配的硬管连接结构；需要经常拆接的位置，可考虑设置专门的可拆接口。倒刺处强行反复拔插会改变管端状态，不能把首次插装成功等同于允许无限次重复使用。" },
        { type: "links", items: [
          { href: "/resources/technical-articles/fitting-material-selection-guide/", label: "PP、PA 等接头材质的选择方法", suffix: "；" },
          { href: "/resources/material-compatibility/", label: "材料兼容性参考", suffix: "；" },
          { href: "/resources/technical-articles/hard-tube-fittings-selection-guide/", label: "硬管接头选型指南" },
        ] },
      ],
    },
    {
      title: "仪器用接头的质量依据：认证、材料文件与可追溯交付",
      blocks: [
        { type: "paragraph", text: "设备厂采购倒刺接头，除了单件价格，还需要考虑连接失效带来的停机、返工、试剂损失以及维护成本。应比较同一配管工况下的连接结果，以及供应商能否提供明确的规格、材料和质量文件。外形相似或价格不同，都不足以单独判断哪一个更适合仪器。" },
        { type: "subheading", title: "质量管理体系支持供应商审核与批量导入" },
        { type: "paragraph", text: "恒永达已取得 ISO 9001 质量管理体系认证及 ISO 13485 医疗器械质量管理体系认证，证书所列体系覆盖医疗器械设备流体控制元器件及配件的设计开发、生产和服务。对设备制造商而言，这类资料可用于审核供应商的质量管理基础，并与实际图纸、检验要求和交付文件一起评估。" },
        { type: "paragraph", text: "体系认证针对组织及其认证范围，不等于每只倒刺接头都取得医疗器械产品认证，也不代替具体介质、耐压、生物相容性或灭菌适用性验证。项目要求这些性能时，应提交对应材料或产品的专门证据。" },
        { type: "subheading", title: "REACH、RoHS和MSDS分别提供什么信息？" },
        { type: "paragraph", text: "恒永达倒刺接头可按具体型号、材料及项目要求沟通提供 REACH、RoHS、MSDS 相关报告或资料。索取时，应将文件与采购型号和材料配置对应，核对日期、适用对象及检测或声明范围。" },
        { type: "table", headers: ["资料类型", "主要用途", "使用时核对"], rows: [
          ["ISO 9001 / ISO 13485 证书", "质量管理体系与供应商审核", "获证主体、认证范围、有效期及当前证书状态"],
          ["REACH 相关资料", "了解所声明或检测范围内的化学物质合规信息", "对应材料或产品、涉及物质清单、版本与日期"],
          ["RoHS 相关资料", "支持设备项目对受限物质的核查", "样品描述、检测项目、适用型号与声明范围"],
          ["MSDS / SDS", "了解材料安全信息、处理及储存建议", "材料身份、供应商和版本；它不是产品性能认证"],
        ] },
        { type: "paragraph", text: "这些文件各有用途。RoHS 或 REACH 资料不能单独证明接头适合长期接触某种试剂，MSDS 也不证明连接一定不漏液。将材料文件与工况试验并列审核，才能同时回答“材料信息是否完整”和“这条液路能否正常运行”。" },
        { type: "subheading", title: "从样件到批量，关注尺寸、外观和文件的一致性" },
        { type: "paragraph", text: "恒永达质量体系覆盖物料确认、过程检验、终检及交付记录，并配置影像测量等检测能力。对倒刺接头项目，适合把倒刺轮廓、关键尺寸、流道通畅、表面毛刺与损伤，以及型号和材料标识列入双方确认的验收要求。具体抽检比例、测试项目与随货资料应按项目质量约定执行。" },
        { type: "paragraph", text: "批量导入时保留样件确认记录、图纸版本和已验证的软管规格。管材或接头材料发生变更后，应评估是否需要重新验证。这样才能在插装手感或运行表现变化时，沿型号、材料、版本及交付记录定位原因，而不是只凭外观重新寻找相似零件。" },
        { type: "links", items: [
          { href: "/about/quality/", label: "查看恒永达质量体系、认证与检测能力", suffix: "；" },
          { href: "/downloads/resources/datasheets/zh-CN/Tubing-and-Fittings/foreach-fittings-and-elastomer-tubing-catalog-a02-cn.pdf#page=27", label: "下载连接件与橡塑管目录" },
        ] },
      ],
    },
    {
      title: "选型示例：把两段软管接入仪器清洗液路",
      blocks: [
        { type: "paragraph", text: "假设一条清洗液路需要连接两段 3.2 mm 内径软管，接点位于设备内部，运行中保持固定。可先将 BA-32F-PP-N 或 BA-32D-PP-N 作为结构候选；二者都连接相同标称内径的软管，但倒刺轮廓不同，最终选择需要与实际管材配合比较。" },
        { type: "list", ordered: true, items: [
          "确认布局：两管直线对接选择 BA 候选；必须转向时比较 BL，留出接头和软管弯曲空间。",
          "确认配管：记录软管内外径、公差、材料、硬度及供应规格，不能只写“3.2 管”。",
          "确认材料：按清洗液和清洗剂的浓度、温度、接触周期评估 PP 或其他实际可选材料。",
          "确认接口：核对两端倒刺代码、图纸尺寸、插装位置及最小流道，避免接管正确但流阻不合适。",
          "完成样件验证：检查装配、密封、受拉及实际启停工况；吸液段增加负压进气观察。",
          "固定交付要求：将选定完整型号、软管规格、图纸版本及需要的材料和质量文件纳入采购与验收资料。",
        ] },
        { type: "paragraph", text: "如果一端实际为 2.4 mm 内径软管，可评估 BA-24F-32F-PP-N 异径型号，而不是把较小软管强行套在较大规格倒刺上。以上是选型路径示例，不代表这些组合已完成某台仪器的装机验证。" },
      ],
    },
    {
      title: "倒刺接头怎样安装，什么时候需要外部夹持？",
      blocks: [
        { type: "list", ordered: true, items: [
          "检查型号与表面。确认各端管径及倒刺代码，检查流道、导入面和凸缘有无异物、毛刺、裂纹或划伤。",
          "准备平整管端。切口应齐整，去除残屑，避免把被夹扁、开裂或明显拉伸的旧管端直接重新装配。",
          "沿轴线完成插装。将软管推至型号要求的位置，使其越过倒刺并形成完整配合；遇到异常阻力时先核对尺寸和材料。",
          "安排支撑与弯曲余量。避免软管在接头出口处急弯或长期拉住接头，特别是分支多、管路较重的位置。",
          "按实际工况检漏。覆盖规定的工作压力、温度与启停过程，吸液连接同时检查进气，保留样件与测试条件记录。",
        ] },
        { type: "paragraph", text: "是否增加外部软管夹，要依据具体软管、倒刺配合、压力变化、受拉和振动条件决定。夹持件应匹配装配后的管外径及有效夹持位置，避免偏斜或过度压紧造成损伤。不能用一个夹子补偿错误管径，也不能笼统宣称所有倒刺接头都不需要夹持。" },
        { type: "paragraph", text: "未经确认，不要用油脂、溶剂或加热方法来掩盖插装困难；这些处理可能改变材料或污染液路。拆卸前停机卸压，维护后检查接头及管端，再完成必要的连接验证。" },
      ],
    },
    {
      title: "难插、漏液、进气或松脱，分别检查什么？",
      blocks: [
        { type: "table", headers: ["现象", "优先检查", "处理与复核"], rows: [
          ["软管难以插入", "是否把外径当内径；材料、壁厚、轮廓是否匹配", "核对双方规格，检查管端损伤，再比较适配组合"],
          ["装好后慢渗漏", "插装位置、管端裂纹、倒刺划伤或表面异物", "更换损伤件并复装，在规定压力和温度下复测"],
          ["不见漏液但吸液有气泡", "负压连接处进气，以及上游液位、其他接点", "按液路分段排查，区分接点进气与其他气泡来源"],
          ["启停或受拉时松脱", "尺寸配合、管材软化或松弛、压力峰值和外部拉力", "复核运行条件与布管支撑，评估夹持并重新验证"],
          ["更换管材批次后手感改变", "内径、公差、硬度或材料规格是否变化", "对照已确认样件及记录，复测连接性能"],
          ["加接头后流量下降", "接头内孔、软管急弯、局部堵塞和总液路阻力", "核对实际流道与用液端流量，不能只比较接管内径"],
        ] },
        { type: "paragraph", text: "验收标准应在测试前明确，例如允许泄漏、保持要求及流量变化范围，并注明压力、温度、介质、时间和循环条件。仅写“试过不漏”难以用于复现，也不足以支持后续批量验收。" },
      ],
    },
  ],
  faqTitle: "倒刺接头选型常见问题",
  // Question source: Obsidian 产品词库/08_证据与数据/03_问题候选与排名待补.md,
  // barbed-Q1–Q3. These are research candidates, not a search-frequency ranking.
  faqItems: [
    { question: "倒刺接头按软管内径还是外径选择？", answer: "先按软管内径选择接管规格，再核对外径、壁厚、公差、材料和硬度。例如 BA-32F-PP-N 的接管规格对应 3.2 mm 内径软管，并不表示倒刺最大外径也是 3.2 mm。外径用于进一步确认夹持件和安装空间；相同内径搭配不同倒刺轮廓时，仍需核对图纸，并用实际软管验证插装、密封与保持性。" },
    { question: "倒刺连接是否必须使用管夹？", answer: "是否需要管夹，要由具体倒刺与软管的配合及工况决定。应评估软管材料与硬度、工作温度、压力峰值、振动和外部拉力，并按对应装配要求验证密封与防脱性能。需要夹持时，管夹应匹配装配后的管外径及有效夹持位置，避免过度压紧损伤软管或接头；管夹不能补偿错误的配管尺寸。" },
    { question: "变径倒刺接头怎样选两端尺寸？", answer: "分别记录两端软管的内径、外径和材料，再按对应接管规格选择异径型号。例如 BA-24F-32F-PP-N 用于连接 2.4 mm 与 3.2 mm 内径软管，选型时还要核对各端倒刺代码、图纸尺寸和最小流道。对于异径 T 型或 Y 型，应按结构图确认每个尺寸对应的端口位置，不能仅凭型号中数字的顺序判断分支方向。" },
  ],
  cta: {
    title: "把管路要求转成可核对的接头选型条件",
    description: "提供各端软管内外径、材料与硬度、液路走向、介质、压力和温度，以及所需认证和材料文件，便于确认倒刺型号、图纸与样件验证要求。",
    contactLabel: "沟通选型与资料需求",
    productsLabel: "查看倒刺接头型号",
    productsHref: "/products/fittings/barbed-fittings/",
  },
};

export const barbedFittingNavigation = [
  { id: "principle", label: "连接与密封原理" },
  { id: "types", label: "本体结构类型" },
  { id: "profiles", label: "倒刺代码与膨胀率", children: [{ id: "expansion-example", label: "尺寸计算示例" }] },
  { id: "models", label: "型号与接管尺寸", children: [{ id: "tube-id", label: "内径与流道的区别" }] },
  { id: "materials", label: "软管与材料匹配" },
  { id: "quality", label: "认证与质量资料", children: [
    { id: "quality-systems", label: "质量管理体系" },
    { id: "material-documents", label: "REACH / RoHS / MSDS" },
    { id: "batch-quality", label: "尺寸与交付一致性" },
  ] },
  { id: "selection-example", label: "完整选型示例" },
  { id: "installation", label: "安装与夹持" },
  { id: "troubleshooting", label: "故障排查与验证" },
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

export function getBarbedFittingArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  const copy = getBarbedFittingCopy(locale);
  return [{
    id: barbedFittingSlug, slug: barbedFittingSlug, category: "fittings-tubing",
    ...copy.metadata, summary: copy.deck, date: "2026-10-19",
    relationKeys: ["category:barbed-fittings", "series:ba", "series:bl", "series:bt", "series:by"], relationPriority: 150,
    content: [
      { title: "", content: copy.leadBlocks.map(blockText).join("\n\n") },
      ...copy.sections.map(section => ({ title: section.title, content: section.blocks.map(blockText).join("\n\n") })),
      { title: copy.faqTitle, content: copy.faqItems.map(item => `${item.question}\n${item.answer}`).join("\n\n") },
    ],
  }];
}

const translations = { en, es, fr, ko, ru };

export function getBarbedFittingCopy(locale: TechnicalArticleLocale): DiaphragmPumpEngineeringArticleCopy {
  return locale === "zh-CN" ? barbedFittingCopy : translations[locale] as DiaphragmPumpEngineeringArticleCopy;
}

export function getBarbedFittingNavigation(locale: TechnicalArticleLocale) {
  return locale === "zh-CN" ? barbedFittingNavigation : translations[locale].navigation;
}

export function getBarbedFittingSubject(locale: TechnicalArticleLocale) {
  return {
    about: locale === "zh-CN" ? ["倒刺接头", "软管连接", "倒刺轮廓与膨胀率"] : translations[locale].subjectAbout,
    mentions: ["BA", "BL", "BT", "BY", "BX4", "BF4", "PP", "PA", "ISO 9001", "ISO 13485", "REACH", "RoHS", "MSDS"],
  };
}

export function getBarbedFittingRelatedProducts(locale: TechnicalArticleLocale = "zh-CN"): RelatedResourcesData {
  const titles = locale === "zh-CN"
    ? { tee: "PA 等径 T 型倒刺接头", elbow: "PA 等径 L 型倒刺接头" }
    : translations[locale].relatedProductTitles;
  const href = `${locale === "zh-CN" ? "" : `/${locale}`}/products/fittings/barbed-fittings/`;
  return { locale, articles: [], videos: [], products: featuredProducts.map(product => ({
    id: product.id, title: titles[product.kind], href,
    imageSrc: product.imageSrc, imageAlt: `${locale === "zh-CN" ? "恒永达" : "FOREACH"} ${titles[product.kind]}`,
    imageFill: true,
  })) };
}
