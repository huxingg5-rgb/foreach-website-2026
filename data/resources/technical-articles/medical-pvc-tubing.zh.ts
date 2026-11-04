import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";
import { medicalPvcTubingDiameters, medicalPvcTubingImages, medicalPvcTubingSizeRows } from "./medical-pvc-tubing.shared";

/* =========================================================
   医用 PVC 管选型文章（中文源稿）
   页面路径：/resources/technical-articles/medical-pvc-tubing/
   主关键词：医用 PVC 管 / medical PVC tubing
   其他语言：medical-pvc-tubing.{en,es,fr,ko,ru}.ts，按海外读者改写，不逐句对译
========================================================= */

export { medicalPvcTubingSlug } from "./medical-pvc-tubing.shared";

const photos = {
  line: { ...medicalPvcTubingImages.line, alt: "恒永达洁净挤出车间，穿洁净服的操作人员在管材挤出机控制面板前调整工艺参数" },
  gauge: { ...medicalPvcTubingImages.gauge, alt: "挤出线上的在线非接触测径仪，透明管材经导轮穿过测量窗口" },
  resin: { ...medicalPvcTubingImages.resin, alt: "洁净车间内的原料干燥机与真空上料机" },
  die: { ...medicalPvcTubingImages.die, alt: "管材挤出机头口模与冷却定径段特写，透明管坯离开口模进入水槽" },
  tank: { ...medicalPvcTubingImages.tank, alt: "洁净车间内的管材冷却定径水槽，顶部可见洁净送风口与照明" },
};

export const medicalPvcTubingCopy: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "医用 PVC 管怎么选：尺寸精度、洁净生产、认证与材料特性",
    seoTitle: "医用 PVC 管怎么选？尺寸精度、洁净车间与认证 | 恒永达 FOREACH",
    seoDescription: "医用 PVC 管和普通 PVC 软管差在哪？本文从材料特性、内外径公差与在线测径、ISO 8（10 万级）洁净车间挤出、ISO 13485 体系与 RoHS 合规四个方面，说明医疗设备和分析仪器选用 PVC 管时该检查什么。",
    coverImage: photos.line.src,
    coverAlt: photos.line.alt,
  },
  deck: "医用 PVC 管和普通 PVC 软管是同一类聚合物，差别在原料与增塑剂、尺寸精度、生产环境和文件追溯。本文按材料特性、尺寸精度、洁净生产和认证四项，说明医疗设备与分析仪器选用 PVC 管时该检查什么，并介绍恒永达在 10 万级洁净车间挤出与检测 PVC 管的方式。",
  leadBlocks: [
    { type: "paragraph", text: "医用 PVC 管（medical PVC tubing）是用于医疗设备、诊断与分析仪器的柔性聚氯乙烯管，常见于清洗液、试剂、样本、废液和低压气路。它和五金店、水族店里的透明 PVC 软管（vinyl tubing）是同一类材料，但对原料与增塑剂、尺寸一致性、生产环境和随货文件的要求高得多。" },
    { type: "paragraph", text: "选型时可以按四件事逐项检查：材料特性是否适合介质和温度；内外径公差能否保证接头密封和流量一致；生产环境能否控制颗粒和异物；体系认证、合规报告和批次记录是否齐全。下文按这个顺序展开，最后给出询价时可以直接发给供应商的问题清单。" },
  ],
  sections: [
    { title: "医用 PVC 管和普通 PVC 软管有什么不同", tocLabel: "医用与普通", blocks: [
      { type: "paragraph", text: "两者的基础聚合物都是聚氯乙烯，柔软性都来自增塑剂。区别不在“是不是 PVC”，而在配方是否固定、生产过程是否受控，以及出了问题能否追溯。下表列出常见差异。" },
      { type: "table", headers: ["检查项", "通用 PVC 软管", "医疗设备与仪器用 PVC 管"], rows: [
        ["原料", "可能掺用回收料，批次间成分难以追溯", "应使用全新粒料，配方和原料批次固定并有记录"],
        ["增塑剂", "多用 DEHP 等邻苯类增塑剂，一般不提供说明", "说明增塑体系，可按项目提供受限物质检测报告"],
        ["尺寸控制", "以抽检为主，规格表常只给名义尺寸", "挤出时在线测量外径，内径和壁厚按批抽检，给出公差"],
        ["生产环境", "普通车间", "洁净车间挤出，控制颗粒、纤维和油污进入管内"],
        ["文件与追溯", "通常没有批次记录", "在质量管理体系下生产，可追溯原料、工艺和检验记录"],
        ["典型用途", "园艺、排水、水族、一般输水", "医疗设备、IVD 与分析仪器、实验室自动化的液路和气路"],
      ] },
      { type: "paragraph", text: "在行业里，“医用级”（medical grade）通常还意味着原料有生物相容性数据，例如 USP Class VI 或 ISO 10993 系列测试。这类数据针对的是具体配方，不能用“PVC”这个材料名代替。管路如果接触人体、药液，或用于需要注册的器械，应向供应商索取对应型号的资料，并在整机层面完成评价。" },
    ] },
    { title: "PVC 管有哪些材料特性", tocLabel: "材料特性", blocks: [
      { type: "paragraph", text: "PVC 软管的优势是透明、柔软、透气性低、成本低，能直接看到管内的液体和气泡，适合常温水性介质和低压管路。短板是耐温有限、不耐多数有机溶剂，以及增塑剂可能迁移或析出。" },
      { type: "table", headers: ["参数", "恒永达 PVC 管参考值", "选型提示"], rows: [
        ["硬度（邵氏 A）", "55A / 65A", "55A 更柔软、便于套接；65A 更挺、不易吸瘪"],
        ["内径 / 外径", `${medicalPvcTubingDiameters.inner} mm / ${medicalPvcTubingDiameters.outer} mm`, "同一内径有多种壁厚，按“内径 × 外径”完整选型"],
        ["使用温度", "-42 ~ 75 ℃", "参考值，按实际介质、压力和接头验证"],
        ["低温脆化温度", "-46 ℃", "低温环境应留出余量"],
        ["拉伸强度", "14.3 MPa", "以低压管段为主"],
        ["密度 / 吸水率", "1.18 g/cm³ / 0.12%", "—"],
      ] },
      { type: "paragraph", text: "PVC 本身是硬的，软管的柔软性来自增塑剂。传统配方多用 DEHP 等邻苯二甲酸酯。欧盟 RoHS 指令 (EU) 2015/863 已把 DEHP、BBP、DBP、DIBP 四种邻苯列为限用物质，每种不超过 0.1%（按均质材料重量计），医疗器械（含体外诊断器械）和监测控制仪器自 2021 年 7 月 22 日起适用。出口欧盟的设备，管材的 RoHS 报告应覆盖这四项。" },
      { type: "paragraph", text: "增塑 PVC 还会与部分液体发生吸附。研究中，硝酸甘油、地西泮等亲脂性药物会被 PVC 管吸收，胰岛素等蛋白也会吸附在管壁上。对浓度敏感的试剂、样本或标准品，应使用实际液体比较流经管路前后的浓度；有机溶剂流路则改用 PTFE、FEP 等含氟管。" },
      { type: "notice", label: "恒永达资料", text: "恒永达 PVC 管可按型号提供 RoHS 检测报告。需要单独确认 DEHP、BBP、DBP、DIBP 的检测结果时，询价时注明即可。" },
      { type: "links", items: [
        { label: "PVC 软管的硬度、布管与接头选型", href: "/resources/technical-articles/what-is-pvc-tubing/" },
      ] },
    ] },
    { title: "尺寸精度：内外径公差为什么重要", tocLabel: "尺寸精度", blocks: [
      { type: "paragraph", text: "对软管来说，精度指内径、外径、壁厚、同心度和椭圆度的一致性，定长管还包括切割长度。名义尺寸相同的两卷管，如果实际尺寸波动不同，装到同一台设备上的表现也会不同。" },
      { type: "list", items: [
        "接头密封与保持力：倒刺接头靠软管内径和壁厚的弹性变形密封；夹持外径的推入式接头要求外径落在规定公差内。尺寸偏大容易漏液或脱管，偏小则插装困难、管口受损。",
        "流量一致性：层流状态下，管路流阻与内径的四次方成反比。内径偏差会被放大成更大的流阻偏差，多台设备之间的流量、充液时间和清洗效果就会不一致。",
        "管壁均匀性：壁厚不均或椭圆的管子，在负压下更容易局部吸瘪，弯折时也更容易出现死折。",
      ] },
      { type: "formula", expression: "R = 128μL / (πd⁴)；内径偏差 ±5% 时，流阻变化约 −18% ~ +23%", note: "R 为流阻，μ 为液体黏度，L 为管长，d 为内径（层流、刚性圆管近似）。以内径 0.8 mm 的管子为例，内径偏差 ±0.05 mm 时，流阻变化约 −22% ~ +29%。管径越小，同样的绝对偏差影响越大。" },
      { type: "figure", ...photos.gauge, caption: "恒永达挤出线上的在线测径仪：管材连续通过测量窗口，外径在生产过程中实时测量。" },
      { type: "paragraph", text: "恒永达在管材挤出线上配置了在线非接触测径仪（Proton Products InteliSENS DGk 系列）。它采用 LED 与 CCD 的固态测量方式，从多个方向同时测量外径，可计算平均外径和椭圆度，并可设定上下限，外径超差时输出报警信号。与停机后抽检相比，在线测量覆盖的是整卷管材的全长。" },
      { type: "paragraph", text: "在线测径只能看到外径。内径和壁厚需要截取管段离线检测，恒永达质量部配有影像测量仪、视觉测量设备等，用于尺寸和结构特征检测。每个规格都有对应的内外径公差和抽检频次，可随规格资料一并提供。" },
      { type: "links", items: [
        { label: "用流阻计算器核对内径与压降", href: "/resources/calculators/fluid-resistance/" },
        { label: "倒刺接头扩张比怎么算", href: "/resources/technical-articles/barbed-fitting-expansion-ratio/" },
      ] },
    ] },
    { title: "洁净车间生产：ISO 8（10 万级）意味着什么", tocLabel: "洁净生产", blocks: [
      { type: "paragraph", text: "国内常说的“10 万级”来自美国联邦标准 FED-STD-209E 的 Class 100,000。该标准已于 2001 年废止，现在通行的是 ISO 14644-1，对应等级为 ISO 8：每立方米空气中 ≥0.5 μm 的颗粒不超过 3,520,000 个。作为对比，城市室外空气通常约有 3,500 万个，相当于 ISO 9。" },
      { type: "table", headers: ["ISO 14644-1 等级", "旧称（FED-STD-209E）", "≥0.5 μm 颗粒上限（个/m³）"], rows: [
        ["ISO 5", "100 级", "3,520"],
        ["ISO 6", "1,000 级", "35,200"],
        ["ISO 7", "10,000 级", "352,000"],
        ["ISO 8", "100,000 级", "3,520,000"],
        ["ISO 9", "—（约相当于普通室内外空气）", "35,200,000"],
      ] },
      { type: "figure", ...photos.line, caption: "恒永达洁净挤出车间：操作人员穿戴连帽洁净服和口罩，在挤出机控制面板前调整工艺参数。" },
      { type: "paragraph", text: "恒永达的管材挤出线设在 10 万级（ISO 8）洁净车间内。洁净车间依靠高效过滤送风、压差、人员更衣和物料进出管理，减少空气中的颗粒、纤维、毛发和油污落到熔体、管壁或管口上。对透明管来说，这类异物会直接表现为管壁黑点、管内残渣，或在下游检测中变成颗粒本底。" },
      { type: "paragraph", text: "需要分清的是：洁净车间控制的是生产过程中的颗粒和微生物污染，并不意味着管子出厂即无菌，也不代表材料通过了生物相容性测试。需要无菌的管路要另行灭菌并验证；生物相容性要看原料和成品的测试资料。" },
      { type: "paragraph", text: "在国内医疗器械法规中，10 万级也是常见的洁净度要求。例如《医疗器械生产质量管理规范附录 植入性医疗器械》规定，主要与组织、组织液接触的植入性无菌器械，其末道清洁处理、组装、初包装和封口等区域应不低于 10 万级。这说明了该级别在医疗器械行业中的位置，但仪器用管材本身并不属于植入器械。" },
    ] },
    { title: "恒永达 PVC 管怎样挤出成型", tocLabel: "挤出流程", blocks: [
      { type: "paragraph", text: "PVC 软管由粒料经挤出机熔融，从口模挤出成管，再经冷却定型、在线测径和牵引收卷制成。恒永达的挤出线按下面的顺序在洁净车间内完成：" },
      { type: "list", ordered: true, items: [
        "原料准备：粒料在洁净区内按材料要求干燥，经真空上料系统密闭输送到挤出机料斗，减少开放式加料带入的粉尘。",
        "熔融挤出：螺杆把粒料熔融塑化，熔体从机头口模挤出成管坯；温度、转速等参数在控制面板上设定，关键工艺数据进入 MES 记录。",
        "冷却定径：管坯进入冷却水槽定型，内外径在这一段基本确定。",
        "在线测径：成型后的管材连续通过测径仪，外径和椭圆度实时测量，超出设定范围时报警。",
        "牵引、收卷与检验：管材按规格收卷或定长裁切，离线检测内径、壁厚和外观后包装入库。",
      ] },
      { type: "figure", ...photos.resin, caption: "洁净车间内的原料干燥与真空上料设备，粒料经管道密闭输送到挤出机。" },
      { type: "figure", ...photos.die, caption: "挤出机头与冷却定径段：管坯离开口模后立即进入水槽冷却定型。" },
      { type: "figure", ...photos.tank, caption: "洁净车间内的冷却定径水槽，管材在槽内冷却后进入测径和牵引工序。" },
    ] },
    { title: "认证与文件：体系认证、合规报告和批次追溯", tocLabel: "认证与追溯", blocks: [
      { type: "paragraph", text: "供应商说“有认证”时，要分清认证的对象。体系认证证明公司的管理流程受控；合规报告证明材料中的受限物质低于限值；批次记录保证出了问题能查到原因。三者不能互相替代。" },
      { type: "table", headers: ["层次", "证明什么", "恒永达可提供"], rows: [
        ["质量管理体系认证", "研发、采购、生产、检验和交付流程受控", "ISO 9001、ISO 13485 体系认证"],
        ["材料合规报告", "管材中的受限物质低于法规限值", "按型号提供 RoHS 等合规报告"],
        ["生物相容性资料", "原料或成品通过 USP Class VI、ISO 10993 等测试", "按项目需求确认可提供的资料"],
        ["批次追溯", "能查到原料批次、工艺参数和检验记录", "PDM、ERP、MES 系统记录关键物料、工艺和检验数据"],
      ] },
      { type: "paragraph", text: "ISO 13485 是医疗器械质量管理体系标准，认证对象是企业的质量体系，不是某一根管子。它说明供应商按医疗器械行业的要求管理设计、采购、生产和变更，但不代表管材本身是医疗器械，也不代表通过了生物相容性测试。" },
      { type: "links", items: [
        { label: "查看恒永达质量体系", href: "/about/quality/" },
      ] },
    ] },
    { title: "采购医用 PVC 管时要问供应商的 7 个问题", tocLabel: "采购清单", blocks: [
      { type: "paragraph", text: "询价时把下面几个问题一起发给供应商。回答越具体，后续验证越省事。" },
      { type: "list", ordered: true, items: [
        "原料是不是全新粒料？配方或原料供应商变更时，是否提前通知客户？",
        "增塑剂是什么？能否提供 DEHP 等受限物质的检测报告，RoHS 报告是否覆盖 DEHP、BBP、DBP、DIBP 四项？",
        "内径、外径和壁厚的公差是多少？外径是否在线测量，内径和壁厚怎样抽检？",
        "管材在什么环境下挤出、裁切和包装？洁净车间是什么等级，有没有检测记录？",
        "有哪些体系认证？原料或成品有没有 USP Class VI、ISO 10993 等生物相容性资料？",
        "每批货能否追溯到原料批次、生产日期和检验记录？",
        "能否提供样品，按实际介质、温度和接头做装机验证？",
      ] },
      { type: "paragraph", text: "以上问题都可以在向恒永达询价时直接提出，工程师会按型号确认可提供的资料。" },
    ] },
    { title: "恒永达 PVC 管规格与定制", tocLabel: "恒永达规格", blocks: [
      { type: "paragraph", text: "恒永达 PVC 管提供 55A、65A 两种硬度，可按卷购买，也可按图纸定长裁切，或配接头做成管路组件。下表按硬度汇总当前在售规格。" },
      { type: "table", headers: ["硬度", "规格数", "内径范围（mm）", "外径范围（mm）"], rows: medicalPvcTubingSizeRows },
      { type: "paragraph", text: "下单或建立 BOM 时，请保留完整型号、硬度、内径 × 外径和包装单位。需要定长裁切、配接头或特殊尺寸时，请同时提供介质、温度、压力或负压、布管方式和接头图纸，以便确认可行性、起订量和交期。" },
      { type: "links", items: [
        { label: "查看 PVC 管完整规格", href: "/products/tubing/pvc-tubing/" },
        { label: "查看快插接头", href: "/products/fittings/quick-connect-fittings/" },
        { label: "查看倒刺接头", href: "/products/fittings/barbed-fittings/" },
      ] },
    ] },
    { title: "继续了解其他仪器管材", tocLabel: "相关管材", blocks: [
      { type: "links", items: [
        { label: "PVC 管：硬度、布管与软管接头", href: "/resources/technical-articles/what-is-pvc-tubing/" },
        { label: "PTFE 管：材料、流阻与接头选型", href: "/resources/technical-articles/what-is-ptfe-tubing/" },
        { label: "FEP 管：透明细管与翻边连接", href: "/resources/technical-articles/what-is-fep-tubing/" },
        { label: "PFA 管：试剂输送与洁净度控制", href: "/resources/technical-articles/what-is-pfa-tubing/" },
      ] },
    ] },
  ],
  faqTitle: "医用 PVC 管常见问题",
  faqItems: [
    { question: "医用 PVC 管和普通 PVC 软管，价格为什么差别大？", answer: "价格差来自整套生产与质量控制：全新原料和增塑体系的材料成本、洁净车间的运行成本、在线测径和离线检验带来的人工与报废，以及批次记录和合规报告。单换一种增塑剂带来的差价通常有限。通用软管用于园艺、排水等场合没有问题；用在仪器液路、试剂和样本管路时，尺寸波动和异物造成的返工与停机成本，往往比管材差价更高。" },
    { question: "10 万级洁净车间生产的 PVC 管是无菌的吗？", answer: "不是。洁净车间控制的是生产环境中的颗粒和微生物污染，管材出厂前没有经过灭菌。需要无菌的管路，应由整机或组件厂按产品要求灭菌并验证，灭菌方式也要按具体配方确认。" },
    { question: "PVC 管会吸附药物或试剂吗？", answer: "对部分物质会。研究中，硝酸甘油、地西泮等亲脂性药物会被增塑 PVC 管吸收，胰岛素等蛋白会吸附在多种管材的内壁上。对浓度敏感的试剂、样本或标准品，应用实际液体比较流经管路前后的浓度，必要时缩短接触段，或改用 PTFE、FEP 等管材。" },
    { question: "设备出口欧盟，PVC 管要满足哪些要求？", answer: "常见要求是 RoHS。(EU) 2015/863 把 DEHP、BBP、DBP、DIBP 四种邻苯列入限用物质，每种不超过 0.1%，医疗器械（含体外诊断器械）和监测控制仪器自 2021 年 7 月 22 日起适用。询价时应确认管材的 RoHS 报告包含这四项；如有 REACH 等其他要求，也一并说明。" },
    { question: "恒永达 PVC 管可以定长裁切或做成管路组件吗？", answer: "可以。管材可按卷购买，也可按图纸定长裁切，或配倒刺、快插等接头做成管路组件。询价时提供长度、内外径、硬度、两端接头和使用条件，工程师会确认可行性、起订量和交期。" },
  ],
  cta: {
    title: "获取 PVC 管样品与资料",
    description: "提供用途、介质、内外径、硬度、长度和所需文件（如 RoHS 报告、批次记录），恒永达工程师可协助确认规格并安排送样测试。",
    contactLabel: "联系工程师",
    productsLabel: "查看 PVC 管规格",
    productsHref: "/products/tubing/pvc-tubing/",
  },
};
