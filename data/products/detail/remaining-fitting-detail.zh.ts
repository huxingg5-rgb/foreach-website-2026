import { FITTING_PUBLISHED_PRODUCTS } from "@/data/products/selection/fitting-publication.generated";
import { getFemaleThreadAdapterGallery } from "./female-thread-adapter-gallery";
import { getBulkheadBarbedFittingGallery } from "./bulkhead-barbed-fitting-gallery";

// Evidence: FOREACH fittings / elastomer tubing catalog A02 Chinese, PDF pages
// 39–40 (PMB), 49–61 (Luer), 82–85 (female threads), 92–93 (filters),
// 95 (CV), 105 (tools), 109 (materials). Publication data controls available SKUs.
// LS-16D length 13.9 is verified in drawings 443-02-00154 / 00268; PMLS-U28-32D
// crest 4.5 is verified in 443-02-00273 (catalog p.58 has typographical errors).
// Generic resin temperature limits are not product ratings. CAD assets are separate.
export type RemainingFittingIdentity = {
  model?: string; foreachModel?: string; productTypeId?: string; productCode?: string;
  specs?: { label?: string; value?: unknown }[]; additionalImages?: unknown[];
};
type Row = [string, string];
export type DetailFigure = { src: string; alt: string; caption: string };
export type DetailVisualItem = {
  title: string; purpose: string; description: string; action?: string; figure: DetailFigure;
};
export type DetailSection = {
  id: string; title: string; intro?: string; headers?: string[]; rows?: string[][];
  bullets?: string[]; note?: string; figure?: DetailFigure;
  figures?: DetailFigure[]; visualItems?: DetailVisualItem[]; visualColumns?: 2 | 3;
  links?: { href: string; label: string }[];
};
export type RemainingFittingContent = {
  model: string; family: string; type: string; name: string;
  points: Row[]; figures: DetailFigure[]; features: Row[];
  parts: { code: string; label: string; joined?: boolean }[];
  modelRows: Row[]; modelNote: string; comparison: DetailSection;
  sections: DetailSection[]; faqs: { question: string; answer: string }[];
};
const TYPES = new Set(["luer-fittings", "female-thread-adapters", "bulkhead-barbed-fittings", "filters", "check-valves"]);
const COLORS: Record<string, string> = { N: "本色", W: "白色", B: "黑色", R: "红色", G: "绿色", U: "蓝色", O: "橙色", Y: "黄色" };
const MATERIALS: Record<string, Row> = {
  PP: ["PP（聚丙烯）", "质轻，适用于多种水性介质；按试剂成分、浓度和清洗条件确认相容性，避免用材料通用耐温值替代接头的使用条件。"],
  PA: ["PA（聚酰胺／尼龙）", "具有较好的机械强度、韧性和耐磨性；吸湿会影响尺寸及机械状态，长期接液和反复拆装时应一并评估。"],
  AC: ["POM（聚甲醛，代码 AC）", "刚性、耐磨性和尺寸稳定性较好；强酸及氧化性清洗液等工况需专门核对材料相容性。"],
  PS: ["PPS（聚苯硫醚，代码 PS）", "具有较好的耐热性、耐化学性与尺寸稳定性；PS 在本系列中表示 PPS，不表示聚苯乙烯。"],
};
const LUER_NAMES: Record<string, string> = {
  LPR: "旋转锁圈公鲁尔接头", LPS: "固定锁圈公鲁尔接头", LP: "一体式公鲁尔接头",
  LSL: "固定公鲁尔芯子", LRL: "旋转公鲁尔芯子", LS: "一体式母鲁尔接头",
  PMLS: "穿板母鲁尔接头", LPT: "鲁尔锁圈", LCR: "鲁尔识别色环", LNS: "鲁尔滚花螺母", LPBL: "公鲁尔堵头",
};
const FEMALE_NAMES: Record<string, string> = { U: "标准型二通内螺纹接头", US: "方型二通内螺纹接头", UT: "T 型三通内螺纹接头", UY: "Y 型三通内螺纹接头", PMU: "穿板二通内螺纹接头" };
const tubeText = (code: string) => `${(parseInt(code, 10) / 10).toFixed(1)} mm`;
const media = (type: string, name: string, caption: string): DetailFigure => ({ src: `/images/products/fittings/${type}/details-zh/${name}.webp`, alt: caption, caption });
const faq = (rows: Row[]) => rows.map(([question, answer]) => ({ question, answer }));
const publishedFamily = (type: string, family: string) => FITTING_PUBLISHED_PRODUCTS.filter(p => p.productTypeId === type && p.foreachModel.split("-")[0] === family);
const choices = (models: string[], index: number, describe: (code: string) => string) => [...new Set(models.map(m => m.split("-").at(index)!))]
  .sort((a,b) => a.localeCompare(b, "en", { numeric: true }))
  .map(code => `${code} = ${describe(code)}`).join("；");
const materialMeaning = (code: string) => {
  const name = MATERIALS[code]?.[0] || code;
  return name.startsWith(`${code}（`) ? name.slice(code.length + 1, -1) : name;
};
const publishedLink = (type: string, family: string, label: string) => {
  const item = publishedFamily(type, family)[0];
  return item?.detailHref ? [{ href: item.detailHref, label }] : [];
};
function familyPhotos(data: RemainingFittingIdentity, family: string): DetailFigure[] {
  const gallery = data.productTypeId === "female-thread-adapters" ? getFemaleThreadAdapterGallery({ ...data })
    : data.productTypeId === "bulkhead-barbed-fittings" ? getBulkheadBarbedFittingGallery({ ...data }) : data;
  return (gallery.additionalImages || []).filter((src): src is string => typeof src === "string" && src.includes("/photos/") && src.endsWith(".webp"))
    .slice(0, 2).map((src) => ({ src, alt: `${family} 系列细节参考：${photoCaption(src)}`, caption: photoCaption(src) }));
}
function photoCaption(src: string) {
  if (src.includes("panel-assembly")) return "穿板母鲁尔、色环与锁紧件组合，展示安装位置";
  if (src.includes("core-for-fixed")) return "固定式公鲁尔芯子：观察固定点、倒刺端与不同管径外形";
  if (src.includes("core-for-rotating")) return "旋转式公鲁尔芯子：观察芯子台阶与不同管径外形";
  if (src.includes("identification-ring")) return "识别色环的颜色与外形，颜色用于区分管路";
  if (src.includes("knurled-nut")) return "滚花螺母的颜色与内螺纹，配合穿板母鲁尔固定";
  if (src.includes("plug")) return "公鲁尔堵头与母鲁尔封堵组合参考";
  if (src.includes("one-piece")) return "一体式公鲁尔的外形、颜色或公母对接组合参考";
  if (src.includes("male-luer-lock")) return "锁圈式公鲁尔系列外观参考；固定或旋转结构以型号为准";
  if (src.includes("bulkhead-female-luer")) return "穿板母鲁尔系列：区分鲁尔口、安装螺纹与倒刺端";
  if (src.includes("female-luer")) return "母鲁尔系列的不同管径与材料外观参考";
  if (src.includes("u-us-two-way")) return "U 标准型与 US 方型对照；通径与材料按完整型号识别";
  if (src.includes("ut-u28")) return "UT-U28 系列：三个液路端口与两个安装孔";
  if (src.includes("uy-u28")) return "UY-U28 系列：Y 型分支、液路端口与安装孔";
  if (src.includes("female-thread-union")) return "PMU 穿板二通与螺母装配，液路内螺纹和外侧安装螺纹分开";
  return "PMB 穿板倒刺接头与螺母外观参考；管径和材料以完整型号为准";
}
function materialsSection(codes: string[], current: string, extra?: Row[]): DetailSection {
  return { id: "materials", title: "材料说明与介质选择", intro: `本型号${current}。选型时同时考虑工作液、清洗液、浓度、温度与接触时间。`, headers: ["材料", "特性与选型重点"], rows: [...codes.map(code => MATERIALS[code]), ...(extra || [])], note: "材料特性用于比较选材；整套连接的压力、温度和寿命还取决于软管、配合件及实际工况。" };
}
function barbSection(tube: number, crest?: number): DetailSection {
  return { id: "expansion", title: "软管内径与倒刺膨胀比", intro: `本型号按 ${tube.toFixed(1)} mm 软管内径选配。软管需要越过倒刺峰并贴合管杆，壁厚、硬度和回弹也会影响插入力、密封及抗拔。`, headers: ["项目", "计算与检查"], rows: [
    ["直径比", "λ = 倒刺最大外径 Dᵦ ÷ 软管未装配内径 d"],
    ["膨胀百分比", "ε =（Dᵦ − d）÷ d × 100%"],
    ...(crest ? [["本型号名义尺寸算例", `Dᵦ = ${crest.toFixed(1)} mm，d = ${tube.toFixed(1)} mm；λ ≈ ${(crest/tube).toFixed(3)}，ε ≈ ${((crest/tube-1)*100).toFixed(1)}%。`]] : [["倒刺峰径", "从本型号确认图纸读取最大外径，不用流道孔径、管外径或其他系列的尺寸代入。"]]),
  ], bullets: ["膨胀比越大不等于连接越可靠；管口发白、开裂或插入力异常时应重新核对尺寸与材料。", "管口切平、清洁后沿轴向推入；辅助润湿或润滑工艺需与软管和介质相容，不随意用油脂、胶粘剂或加热改变管口。", "装配后检查密封、抗拔与弯折；如需卡箍等额外固定，应按软管外径和倒刺结构选配。"], note: "几何计算不是压力、抗拔力或寿命的额定值。", links: [{ href: "/resources/technical-articles/barbed-fitting-expansion-ratio/", label: "倒刺接头膨胀比的计算与使用" }] };
}
// A02 pp.50–51: fixed/rotating collar construction and nominal single-part lengths.
// Application choices below follow the assembly motion; they are not performance ratings.
const LUER_STRUCTURE_SELECTION: DetailSection = {
  id: "luer-structure-selection", title: "公鲁尔结构怎么选",
  intro: "先看对接时管路能否转动，再选锁圈结构与安装空间。下图展示两种锁圈的配合剖面及一体式外形，可点击放大。",
  visualColumns: 3,
  visualItems: [
    {
      title: "LPR 旋转锁圈公鲁尔", purpose: "管路不便转动时选",
      description: "锁圈相对芯子独立转动，便于保持软管方向。适合母端固定、短管或两端已固定的管路。",
      action: "保持芯子方向，转动锁圈；预留手指或批头的操作空间。",
      figure: media("luer-fittings", "luer-rotating-collar-cutaway", "旋转锁圈公鲁尔配合剖面：锁圈可相对芯子转动"),
    },
    {
      title: "LPS 固定锁圈公鲁尔", purpose: "一端可随接头转动时选",
      description: "芯子与锁圈通过固定点结合，两者同步转动。适合公头或配对端能够转动的两件式装配。",
      action: "布管最终固定前完成锁合，避免已连接的软管扭紧。",
      figure: media("luer-fittings", "luer-fixed-collar-cutaway", "固定锁圈公鲁尔配合剖面：橙色标注处为限制相对转动的固定点"),
    },
    {
      title: "LP 一体式公鲁尔", purpose: "紧凑布置、简化装配时选",
      description: "本体与锁紧部分一体成型，无需另装芯子和锁圈；可比较更短的单件外形。",
      action: "一体式仍需旋合；至少一端可转动，并留出软管弯曲余量。",
      figure: media("luer-fittings", "luer-one-piece-male", "一体式公鲁尔外形：本体与锁紧部分一体成型"),
    },
  ],
  bullets: [
    "以 1.6 mm 接管内径为例：LP-16D 单件总长 14.85 mm，LPR-16、LPS-16 为 20.0 mm，相差 5.15 mm。这里比较单件长度，对接组合尺寸需另查装配图。",
    "旋转锁圈用于装配时相对芯子转动，不代表接头可作为液路旋转接头持续运转。",
  ],
};
// A02 p.58: this shaped cutout is specifically for the PMLS + LCR panel assembly.
// 9.6 mm is the end-arc centre spacing; 12.8 mm is the overall cutout length.
const LUER_PANEL_INSTALLATION: DetailSection = {
  id: "luer-panel-installation", title: "穿板安装与面板开孔要求",
  intro: "本节适用于 PMLS 穿板母鲁尔 + LCR 色环 + LNS-U28 螺母的配套面板安装。公鲁尔选配 PMLS 时需要核对开孔与板厚；普通 LS 母鲁尔用于管路对接，无需面板开孔。下方装配图与开孔图可点击放大。",
  headers: ["开孔与安装项目", "配套尺寸及说明"],
  rows: [
    ["面板厚度", "≤3.5 mm"],
    ["开孔总长", "12.8 mm"],
    ["两端圆弧中心距", "9.6 mm"],
    ["两侧槽宽", "3.2 mm"],
    ["中部圆弧直径", "Ø6.4 mm；需与两侧槽形组成完整开孔轮廓，不能只加工一个圆孔。"],
    ["安装螺纹", "PMLS 与 LNS-U28 通过 1/4-28 UNF 螺纹固定面板；这是机械安装螺纹，与公母鲁尔的锥面密封位置分开。"],
  ],
  figures: [
    { ...media("luer-fittings", "luer-panel-mounting-stack", "穿板装配位置：PMLS 母鲁尔、LCR 色环、面板与 LNS 滚花螺母；公端可配两件式或一体式公鲁尔。"), caption: "穿板装配位置，点击放大。" },
    { ...media("luer-fittings", "luer-panel-cutout-dimensions", "PMLS 与 LCR 配套开孔，单位 mm：总长 12.8、两端圆弧中心距 9.6、槽宽 3.2、中部圆弧 Ø6.4。"), caption: "PMLS + LCR 开孔图（mm），点击放大。" },
  ],
  bullets: [
    "安装前确认母鲁尔朝向、面板厚度及背面软管和螺母的操作空间；开孔后清除孔缘毛刺。",
    "将色环与面板孔形对正，穿入 PMLS 的安装螺纹，从面板另一侧旋入 LNS-U28 螺母并固定；按装配图保持各零件的相对位置。",
    "面板固定完成后再进行公母鲁尔对接。色环用于接口识别，螺母用于夹持面板，两者均不替代公母锥面的密封配合。",
  ],
  note: "以上孔型用于图示 PMLS 与 LCR 配套安装，并非所有鲁尔接头的通用开孔标准。未使用色环或采用其他固定方案时，应按实际组合图纸确定孔型；加工公差及最终尺寸以确认图纸为准。",
};
function luerContent(data: RemainingFittingIdentity, model: string, family: string): RemainingFittingContent {
  const type = "luer-fittings", fields = model.split("-"), material = fields.at(-2)!, color = fields.at(-1)!;
  const hasTube = ["LPR", "LPS", "LP", "LSL", "LRL", "LS", "PMLS"].includes(family);
  const core = family === "LSL" || family === "LRL", accessory = ["LPT", "LCR", "LNS", "LPBL"].includes(family);
  const tubeCode = hasTube ? fields.at(-3)! : "", tube = hasTube ? parseInt(tubeCode, 10)/10 : 0;
  const models = publishedFamily(type, family).map(p => p.foreachModel);
  const names = LUER_NAMES[family];
  const role: Record<string, string> = {
    LPR: "由公鲁尔芯子与可旋转锁圈组成。锁紧时锁圈相对芯子转动，便于保持软管方向。",
    LPS: "由固定式芯子与锁圈组成，两个固定点限制相对转动；与旋转锁圈款的区别在锁圈和芯子的结合处。",
    LP: "鲁尔端与锁紧部分一体成型，不需要另外装配独立公鲁尔芯子和锁圈。",
    LSL: "这是固定式芯子，需配 LPT 锁圈组成完整公鲁尔；固定点对准装配后限制芯子与锁圈相对旋转。",
    LRL: "这是旋转式芯子，需配 LPT 锁圈组成完整公鲁尔；与固定式芯子的区别在锁圈配合结构。",
    LS: "一端为母鲁尔口，另一端为软管倒刺；用于管路中的公母鲁尔对接。",
    PMLS: "母鲁尔口、外侧安装螺纹与软管倒刺集成于同一本体；用于面板上的可拆卸液路接口。",
    LPT: "独立鲁尔锁圈，与 LSL 或 LRL 芯子配合，分别组成固定式或旋转式公鲁尔。锁圈本身不构成完整流道。",
    LCR: "识别色环安装在穿板母鲁尔处，用于颜色区分与接口识别；它不是密封圈，也不是独立接头。",
    LNS: "带 1/4-28 UNF 内螺纹的滚花螺母，旋在 PMLS 的安装螺纹上，用于夹持面板。",
    LPBL: "以公鲁尔端封堵相匹配的母鲁尔口；没有倒刺接管端，不用于管路贯通。",
  };
  const features: Row[] = [[names, role[family]],
    [hasTube ? `${tube.toFixed(1)} mm 内径软管连接` : family === "LCR" ? "颜色识别，便于区分接口" : family === "LNS" ? "滚花外形，便于装配" : family === "LPBL" ? "封堵闲置母鲁尔口" : "芯子与锁圈分开选配", hasTube ? "倒刺端按软管内径选择，鲁尔配合端与接管尺寸分开识别；两侧软管可分别选定尺寸。" : family === "LCR" ? "可在不同通道配置不同颜色，结合设备标识减少维护时的接错风险。" : family === "LNS" ? "从面板背面安装螺母，保持母鲁尔端方向并预留旋拧空间。" : family === "LPBL" ? "维护或停用支路时，使用匹配堵头关闭母鲁尔接口；拆装前先停流并泄压。" : "LSL、LRL 与 LPT 承担不同作用，可按固定或旋转操作要求选择。"],
    [`${MATERIALS[material]?.[0] || material} · ${COLORS[color]}`, "材料代码与颜色代码分别识别；同色不代表同材质，选配时核对完整型号。"],
  ];
  if (!accessory && !core) features.push(["锥面密封与锁紧配合", "公母鲁尔通过 6% 锥面贴合密封，锁紧结构维持连接；不在锥面缠绕生料带或用胶粘剂补偿损伤。"]);
  if (["LPR", "LPS", "LP", "LS", "LPT", "LNS"].includes(family)) features.push(["可配鲁尔扭力批批头", "可搭配 T-ST 扭力批及 959015 鲁尔批头，按对应装配要求控制锁紧扭矩。"]);
  if (["PMLS", "LCR", "LNS"].includes(family)) features.push(["支持面板接口组合", "PMLS、LCR 色环和 LNS 螺母分别承担接口、识别与固定作用；配套面板厚度不超过 3.5 mm。"]);
  const parts = fields.map((code, i) => ({ code, label: i === 0 ? "系列" : i === fields.length-1 ? "颜色" : i === fields.length-2 ? "材质" : code === "U28" ? "安装螺纹" : "接管内径" }));
  const modelRows: Row[] = [["系列", `${family} = ${names}`]];
  if (fields.includes("U28")) modelRows.push(["安装螺纹", "U28 = 1/4-28 UNF，用于 PMLS 与 LNS 的面板固定配合，不是鲁尔锥面的尺寸代码"]);
  if (hasTube) modelRows.push(["接管内径", choices(models, -3, tubeText) + (tubeCode.endsWith("D") ? "；D 为倒刺轮廓代码" : "")]);
  modelRows.push(["材质", choices(models, -2, materialMeaning)], ["颜色", choices(models, -1, c => COLORS[c] || c)]);
  const figures = family === "LPBL" ? familyPhotos(data, family) : [media(type, `${family.toLowerCase()}-structure`, `${names}结构参考；尺寸与配置按完整型号选择`), ...familyPhotos(data, family)];
  if (family === "LS" && tubeCode === "16D") figures.splice(1, 0, media(type, "ls-16d-dimensions", "LS-16D 零件图细节：总长 13.9 mm，倒刺峰径 2.4 mm，流道孔径 1.2 mm"));
  if (family === "PMLS" && tubeCode === "32D") figures.splice(1, 0, media(type, "pmls-u28-32d-dimensions", "PMLS-U28-32D 零件图细节：总长 25.9 mm，倒刺峰径 4.5 mm，流道孔径 2.4 mm"));
  if (core || family === "LPT") figures.push(media(type, "luer-core-and-locking-collar", "固定式芯子与锁圈的结合位置；旋转式芯子采用不同配合结构"));
  if (["PMLS", "LCR", "LNS"].includes(family)) figures.push(media(type, "luer-panel-assembly", "PMLS、色环和螺母的穿板组合及开孔参考，面板厚度 ≤3.5 mm"));
  const comparison: DetailSection = { id: "differences", title: "鲁尔结构与型号差异", headers: ["系列", "结构与使用区别"], rows: [
    ["LPR / LPS", "两件式锁圈公鲁尔；LPR 锁圈可相对芯子旋转，LPS 通过固定点限制相对旋转。"],
    ["LP / LSL / LRL", "LP 为一体式公鲁尔；LSL、LRL 是芯子，需要搭配 LPT 锁圈。"],
    ["LS / PMLS", "LS 用于管路连接；PMLS 增加 1/4-28 UNF 安装螺纹，可配色环和螺母穿板固定。"],
    ["LPT / LCR / LNS / LPBL", "分别是锁圈、识别色环、安装螺母和堵头，不能因外观相近就混用。"],
    ...(hasTube ? [["16 / 24 / 32", "分别匹配 1.6 / 2.4 / 3.2 mm 软管内径。不同管径的倒刺峰径、流道和长度可能不同，应同时核对空间与流量。"]] : []),
  ] };
  const lengths: Record<string, number[]> = {
    LPR: [20,22.3,25], LPS: [20,22.3,25], LSL: [20,22.3,25], LRL: [20,22.3,25],
    LP: [14.85,17.15,19.85], LS: [13.9,16.2,18.9], PMLS: [20.9,23.3,25.9],
  };
  const peaks = [2.4,3.5,4.5], bores = [1.2,1.7,2.4], tubeCodes = [16,24,32];
  if (hasTube) {
    comparison.rows!.push(...tubeCodes.map((code,i)=>[
      `${family}${family === "PMLS" ? "-U28" : ""}-${code}${["LP","LS","PMLS"].includes(family) ? "D" : ""}`,
      `软管内径 ${(code/10).toFixed(1)} mm；总长 ${lengths[family][i]} mm；倒刺峰径 ${peaks[i]} mm；流道孔径 ${bores[i]} mm。`,
    ]));
    comparison.note = "尺寸为名义值，用于比较结构与安装空间；完整装配仍需按对应零件图及配套软管核对。";
  } else if (family === "LPT") comparison.rows!.push(["LPT 外形", "锁圈外径 11.0 mm，轴向长度 11.0 mm；结合芯子配合结构选型。"]);
  else if (family === "LCR") comparison.rows!.push(["LCR 外形", "色环外径 11.0 mm，配合孔直径 9.55 mm；面板开孔还应匹配定位外形。"]);
  else if (family === "LNS") comparison.rows!.push(["LNS 外形", "滚花螺母外径 11.0 mm，1/4-28 UNF 内螺纹；配合 PMLS 外侧安装螺纹。"]);
  const combination: DetailSection = { id: "combinations", title: "鲁尔配对与配套组合", intro: `${model} 为${names}。按母端安装方式与配套零件选择组合；下图用于说明结构，颜色与管径以完整型号为准，点击可放大。`, visualColumns: 2, visualItems: [
    {
      title: "公母端管路连接", purpose: "LPR / LPS / LP + LS",
      description: "完整公鲁尔与普通母鲁尔配对，两侧软管内径分别选择，无需面板开孔。",
      action: "先确认公母端配合，再分别选择两端管径；图示为锁圈式公端的对接剖面。",
      figure: media(type, "luer-rotating-collar-cutaway", "锁圈式公鲁尔与母鲁尔的管路对接剖面，显示两端接管与中间配合位置"),
    },
    {
      title: "芯子与锁圈分件装配", purpose: "LSL + LPT ／ LRL + LPT",
      description: "LSL 配 LPT 组成固定锁圈公鲁尔；LRL 配 LPT 组成旋转锁圈公鲁尔。",
      action: "芯子需搭配锁圈，不能单独作为完整锁圈接头使用。",
      figure: media(type, "luer-core-collar-parts", "锁圈式公鲁尔由鲁尔芯子与鲁尔锁圈两件组成，展示分件与装配后外形"),
    },
    {
      title: "穿板母端与公端对接", purpose: "PMLS + LNS-U28，可配 LCR",
      description: "用螺母将母端固定在面板上，外侧再配 LPR、LPS 或 LP 公鲁尔；色环用于接口识别。",
      action: "图示组合板厚 ≤3.5 mm；配色环时按 PMLS 与 LCR 配套开孔图加工。",
      figure: media(type, "luer-panel-mated-assembly", "公鲁尔、穿板母鲁尔、色环、面板与固定螺母的完整对接组合"),
    },
    {
      title: "闲置母鲁尔口封堵", purpose: "LPBL + 匹配的母鲁尔口",
      description: "使用公鲁尔堵头关闭闲置母口；图中标明母接头与堵头的位置。",
      action: "色环、螺母和锁圈均不能替代堵头。",
      figure: media(type, "luer-female-port-plug", "母鲁尔接头与公鲁尔堵头的封堵组合，分别标出母接头和堵头"),
    },
  ], note: "鲁尔名称和 6% 锥度不构成任意跨品牌互换、无菌用途或医用认证的承诺。配对后应验证锁紧、密封和拆装效果。", links: [...publishedLink(type, "LPT", "鲁尔锁圈"), ...publishedLink(type, "PMLS", "穿板母鲁尔"), ...publishedLink(type, "LPBL", "鲁尔堵头")] };
  const sections: DetailSection[] = family === "LPBL" ? [combination] : [LUER_STRUCTURE_SELECTION, combination, LUER_PANEL_INSTALLATION];
  if (hasTube) sections.push(barbSection(tube, ({16:2.4,24:3.5,32:4.5} as Record<number,number>)[parseInt(tubeCode,10)]));
  sections.push(materialsSection([...new Set(models.map(m=>m.split("-").at(-2)!))], `采用 ${MATERIALS[material]?.[0] || material}${["LCR", "LNS", "LPT"].includes(family) ? "附件" : "本体"}`));
  if (["LPR", "LPS", "LP", "LS", "LPT", "LNS"].includes(family)) sections.push({ id: "tools", title: "鲁尔扭力批与锁紧要求", intro: "FOREACH 提供 T-ST 可调扭力批（956002），范围 5–60 cN·m，即 0.05–0.60 N·m。鲁尔扭力批批头 959015 用于匹配的 LPR、LPS、LP、LPT、LS、LNS 旋拧外形。", bullets: ["按完整连接组合的装配要求设定扭矩；工具量程不是接头的推荐锁紧值。", "扭力批批头与电批批头分开选用；不要把锁圈拧紧力施加在软管或细长倒刺上。", "出现偏斜、卡涩或过度阻力时停止，检查锥面、螺纹和装配位置；不用增大扭矩补偿损伤。"], figure: { src: "/images/products/fittings/thread-to-barbed-fittings/details-zh/t-st-torque-driver.webp", alt: "T-ST 可调扭力批，商品编码 956002", caption: "T-ST 扭力批；鲁尔批头 959015 另行选配" } });
  sections.push({ id: "installation", title: "鲁尔安装与维护", bullets: [
    "清洁并检查公母锥面、锁紧部位和软管端，剔除毛刺、颗粒和损伤；管路先停流、泄压后再拆装。",
    core ? "先将芯子与匹配的 LPT 锁圈组成完整公鲁尔，再进行公母对接。固定式按定位点装配，旋转式检查锁圈能否正常转动。" : family === "LCR" ? "色环与面板定位孔配合后，再完成母鲁尔与螺母安装；色环承担识别功能，不替代密封件。" : family === "LNS" ? "螺母从 PMLS 安装螺纹侧旋入，夹持面板时保持接口方向；不要把螺母当作液路端口。" : family === "LPBL" ? "将堵头与母鲁尔锥面对正并锁紧；恢复通液前拆下堵头，重新连接并检查密封。" : "公母锥面对正贴合，再按该款锁紧结构旋合；旋转锁圈型应避免让软管跟着锁圈扭转。",
    ...(hasTube ? ["软管沿倒刺轴向推入到位，给两端留出弯曲与应力释放空间；不能靠拉扯软管完成鲁尔分离。"] : []),
    "按实际工作液与工况检查通流、泄漏和锁紧状态；重复拆装后重新检查锥面与螺纹，磨损件及时更换。",
  ] });
  const faqs: Row[] = core || family === "LPT" ? [["芯子或锁圈能单独作为接头使用吗？", "不能。LSL 或 LRL 芯子需与 LPT 锁圈组成完整公鲁尔，再与母鲁尔配对；两类芯子的锁圈相对旋转方式不同。"]]
    : family === "LCR" || family === "LNS" ? [["色环和螺母分别起什么作用？", "LCR 色环用于接口识别，LNS-U28 螺母用于固定 PMLS 穿板母鲁尔；两者都不是锥面密封件。配套面板厚度不超过 3.5 mm。"]]
    : family === "LPBL" ? [["公鲁尔堵头用于哪一端？", "LPBL 用于封堵相匹配的母鲁尔口，不是给公鲁尔端套上的保护帽，也没有贯通接管端。"]]
    : [["鲁尔两端必须连接相同内径的软管吗？", "不必按软管内径相同来配对。先确认完整公母鲁尔结构能够配合，再分别选择两端软管内径，并检查流道变化和流阻。"], ["一体式和锁圈式公鲁尔有什么区别？", "LP 为一体成型；LPR、LPS 由芯子和锁圈组成，分别提供旋转锁圈和固定锁圈结构。LSL、LRL 则是需另配 LPT 锁圈的芯子。"]];
  return { model, family, type, name: names, points: [["结构区别", role[family]], [hasTube ? "管径区别" : "配套区别", hasTube ? `本型号对应 ${tube.toFixed(1)} mm 软管内径，接管内径、倒刺峰径和流道孔径是不同尺寸。` : "附件按作用和配合位置选用，不能因同为环状外形就互换。"], ["材料与颜色", `${MATERIALS[material]?.[0] || material}，${COLORS[color]}；系列合照用于观察外形，不据此判断某个型号的材料或尺寸。`], ["密封与安装", accessory ? "按附件作用完成识别、固定、锁紧或封堵；密封关系由完整公母鲁尔组合决定。" : "鲁尔端靠公母锥面贴合；带倒刺的管路端靠软管与倒刺配合，两个位置分别检查。"]], figures: figures.slice(0,4), features, parts, modelRows, modelNote: "以上为本系列可选型号代码，材料、颜色和管径需按完整型号组合选择。按完整型号选购，配套附件分别确认。", comparison, sections, faqs: faq(faqs) };
}

// Selection-only guidance. PDF pp.82–85 distinguish standard / circlip / PMU
// mounting and show M/E markings and matched bores; they do not rate system flow.
function femaleSelectionSections(model: string, family: string, threadName: string, bore: string, material: string, models: string[]): DetailSection[] {
  const type = "female-thread-adapters";
  const threadCode = threadName === "M6×1" ? "M6" : "U28";
  const matchingHardTubeLink = (series: string, label: string) => {
    const fitting = publishedFamily("hard-tube-fittings", series).find(p => p.foreachModel.split("-")[1] === threadCode);
    return fitting ? [{ href: fitting.detailHref, label }] : [];
  };
  return [
    {
      id: "structure-selection", title: "按液路走向与固定方式选结构",
      intro: `当前型号 ${model} 为${FEMALE_NAMES[family]}。先确定连接两路还是三路、是否穿板，再选螺纹与通径。`,
      visualItems: [
        { title: "U / US 二通", purpose: "两根管路直线对接",
          description: "U 标准型用于 2.0 mm 通径转接；US 方型提供 0.5、1.0、1.5 mm 通径，便于匹配较细管路。",
          action: "U 按型号选 M6 或 U28；本页 US 为 M6。标准型二通用于转接，不直接作穿板固定。",
          figure: media(type, "female-two-way-selection", "U 标准型二通的外形与两端直通剖面，US 为另一种方型外形") },
        { title: "UT T 型三通", purpose: "直通方向加一条侧向支路",
          description: "三个 1/4-28 UNF 端口呈 T 型布置，按管内径选择 1.5 或 2.0 mm 通径。适合需要侧向分支的布管。",
          action: "两个安装孔用于支承本体；按本型号 2D 图核对孔径与孔距，并预留三个管接头的旋拧空间。",
          figure: media(type, "ut-structure-selection", "UT 三通的 T 型端口走向及两个安装孔") },
        { title: "UY Y 型三通", purpose: "两条支路需要向两侧斜向展开",
          description: "三个 1/4-28 UNF 端口呈 Y 型布置，可选 1.0、1.5、2.0 mm 通径。根据管路方向与弯曲空间选择。",
          action: "T / Y 形状不代表固定分流比例；各支路流量还受管长、管内径及下游阻力影响。",
          figure: media(type, "uy-structure-selection", "UY 三通的 Y 型端口走向及两个安装孔") },
        { title: "PMU 穿板二通", purpose: "需要把硬管接口固定在机箱面板上",
          description: "PMU 本体配 M12×1.5 螺母夹持面板，板厚 ≤12.5 mm；两侧仍通过 1/4-28 UNF 液路内螺纹连接管端组件。",
          action: "外侧安装螺纹与两端液路螺纹分别选配。面板孔型和加工尺寸按 PMU 组合图纸确定。",
          figure: media(type, "pmu-panel-assembly", "PMU 穿板二通、面板、螺母及两端硬管接头的装配位置") },
      ],
      note: "卡簧型二通用于板厚 ≤2 mm、卡簧厚度 ≤1 mm 的钣金安装；这种固定方式不能套用到标准 U、US 或 PMU。",
    },
    {
      id: "port-selection", title: "螺纹、通径与管端怎么匹配",
      intro: `本型号液路内螺纹为 ${threadName}，内部通径为 ${bore}。螺纹决定接头能否正确旋合，通径则要与管路内径及流量要求一起选择。`,
      visualItems: [
        { title: "用型号与字唛确认螺纹", purpose: "M 对应 M6，E 对应 1/4-28 UNF",
          description: "接头上的 M / E 字唛用于区分液路内螺纹。M6 型配 M6×1 外螺纹接头，U28 型配 1/4-28 UNF 外螺纹接头。",
          action: "核对完整型号及端口图；M6 与 U28 不互换，也不能把 PMU 的 M12 安装螺纹用于接管。",
          figure: media(type, "female-thread-markings", "螺纹字唛：M 为 M6，E 为 1/4-28 UNF") },
        { title: "按管内径匹配内部通径", purpose: "关注接头与管端交界处的流道连续性",
          description: "优先让接头通孔直径与管路内径一致，并核对管端就位深度和密封位置，使连接处的流道连续。",
          action: "管外径由硬管接头选型决定；相同通径不能单独保证整套装配无滞留，仍需核对实际配合剖面。",
          figure: media(type, "female-thread-bore-match", "T 型与 Y 型三通剖面中的通孔内径及管端交界位置") },
      ],
      headers: ["选型情况", "如何确定"], rows: [
        ["需要较小流道", "先按实际管内径比较 US 或相应三通的通径，再检查目标流量下的流阻。不能为了缩小通径而忽略供液能力。"],
        ["需要改变螺纹", "逐端确认螺纹规格；当前页面的单螺纹代码型号不代表一端 M6、一端 U28。两端异牙规格需按完整型号另外确认。"],
        ["需要分流或汇流", "按管路走向选 UT / UY，再逐支路核对管内径、长度与流量；需要防止支路回流时另外配置相应控制元件。"],
      ],
    },
    {
      id: "combinations", title: "硬管接头与管端组件怎么配",
      intro: `每个液路口分别选配 ${threadName} 外螺纹接头与管端密封组件；二通配两端、三通配三端，管径按各自管路选择。`,
      headers: ["管端形式", "组成与选择依据"], rows: [
        ["法兰翻边管", "外螺纹平底接头 + 对应管外径的垫片 + 已成型翻边管。翻边贴合端口平底，垫片承托翻边，接头提供轴向压紧力。"],
        ["免翻边管", "外螺纹硬管接头 + 该系列规定的卡箍 / 卡环等密封组件 + 对应外径硬管。按接头系列成套配，不能混用不同结构的压紧件。"],
        ["PMU 面板组合", "PMU + 匹配的 M12×1.5 安装螺母 + 两端 U28 管端组件。安装螺母固定本体，两侧管端组件完成液路连接；配件供货范围分别确认。"],
      ],
      bullets: ["先核对端口深度、平底密封面与接头前端剖面，再确认有效旋合长度；仅凭螺纹能旋入不足以判断配套。", "底面密封组合依靠正确的管端与密封组件贴合；不要用生料带补偿管端未到位或端面不匹配。"],
      links: [...matchingHardTubeLink("HFL", "法兰翻边平底接头"), ...matchingHardTubeLink("HNF", "免翻边卡箍接头")],
    },
    {
      ...materialsSection([...new Set(models.map(m => m.split("-").at(-2)!))], `本体为 ${MATERIALS[material][0]}`),
      note: "上表为当前系列在售材料。选材时连同硬管、垫片或卡箍一起核对；树脂通用温度范围不等于整套接头的工作温度。",
    },
    {
      id: "installation", title: "固定、锁紧与装配检查",
      headers: ["装配顺序", "操作重点"], rows: [
        ["先固定本体", family === "PMU" ? "按确认图纸加工面板，去除毛刺，板厚控制在 ≤12.5 mm；用匹配 M12×1.5 螺母夹持本体，再连接两侧管路。" : ["UT", "UY"].includes(family) ? "通过本体的两个安装孔固定，给三个端口和工具留出空间，避免管路侧向拉力集中在接头上。" : "支承二通本体后再装两端管接头，避免本体随管端接头一起旋转、扭曲已连接管路。"],
        ["再装管端组件", "清洁螺纹、管端与密封面，按所选管端组件的顺序就位；手动对正旋入，出现偏斜或卡涩时退出检查。"],
        ["控制锁紧", "按所配硬管接头、密封组件及本体材料确定锁紧要求；PMU 安装螺母与液路端口分别控制，不共用一个未经确认的扭矩。"],
        ["检查整条液路", "在实际工作条件下检查各端口泄漏、各支路通流及固定状态；拆卸前停流泄压，损伤的管端与密封组件及时更换。"],
      ],
      visualItems: [{ title: "配套 T-ST 可调扭力批", purpose: "批头按外螺纹接头的旋拧外形选",
        description: "T-ST 商品编码 956002，量程 5–60 cN·m（0.05–0.60 N·m）。HFL / HNF / HBL 可配 959006 扭力批批头。",
        action: "工具作用在配套管接头上；量程不是推荐锁紧扭矩。扭力批批头与电批批头分开选用。",
        figure: { src: "/images/products/fittings/thread-to-barbed-fittings/details-zh/t-st-torque-driver.webp", alt: "T-ST 可调扭力批，用于配合相应管接头批头", caption: "T-ST 扭力批；按所配接头另选批头" } }],
    },
  ];
}

// A02 PDF pp.39–40: PMB panel thickness, hole range, tolerance and wrench turn.
function bulkheadSelectionSections(model: string, tube: number, crest: number, material: string): DetailSection[] {
  return [
    {
      id: "combinations", title: "穿板接头、螺母与软管怎么组合",
      intro: `基本组合为 ${model} + PMBSN-U28 六角螺母 + 两端 ${tube.toFixed(1)} mm 内径软管。PMB 适合把机箱内外软管固定在面板两侧。`,
      visualItems: [
        { title: "PMB 两端接软管", purpose: "需要固定穿板通液时选",
          description: "中部安装螺纹配螺母夹持面板；液体通过两端倒刺接入软管。先按软管内径确定 16D、24D 或 32D。",
          action: "中部 U28 用于机械固定；面板外需要经常插拔时，可比较穿板快插或穿板鲁尔方案。",
          figure: media("bulkhead-barbed-fittings", "pmb-panel-assembly", "PMB 本体穿过面板，PMBSN 螺母固定，两端插接软管，板厚 ≤3.5 mm") },
        { title: "PMBSN-U28 六角螺母", purpose: "与接头、面板一起确认供货",
          description: "PP 本色：PMBSN-U28-PP-N（809464）；PA 白色：PMBSN-U28-PA-W（809498）。两款均为 1/4-28 UNF 内螺纹。",
          action: "螺母按环境、机械要求和装配图选材；名称含 U28 不代表其他系列螺母可直接替代。",
          figure: { src: "/images/products/fittings/bulkhead-barbed-fittings/photos/pp-natural-1-4-28-unf-bulkhead-fitting-hex-nuts.webp", alt: "PMBSN-U28-PP-N 六角螺母实物，配合 PMB 穿板固定", caption: "PMBSN 六角螺母实物参考" } },
      ],
      headers: ["软管内径与型号段", "倒刺尺寸与安装空间"], rows: [
        ["1.6 mm → PMB-U28-16D", "倒刺峰径 2.4 mm，流道孔径 1.2 mm，总长 21.0 mm。"],
        ["2.4 mm → PMB-U28-24D", "倒刺峰径 3.5 mm，流道孔径 1.7 mm，总长 25.0 mm。"],
        ["3.2 mm → PMB-U28-32D", "倒刺峰径 4.5 mm，流道孔径 2.4 mm，总长 31.0 mm。"],
      ],
      note: "本系列两端接管规格相同。两侧软管内径不同时，需要另选变径方案；不能把较小软管强套到大规格倒刺上。",
    },
    {
      id: "panel-installation", title: "面板开孔与固定要求",
      intro: "开孔前同时确认板厚、螺母操作空间及两侧软管弯曲空间，再按以下 PMB 装配要求准备面板。",
      headers: ["项目", "要求与操作"], rows: [
        ["面板厚度", "≤3.5 mm；预留螺母旋入与夹持所需的空间。"],
        ["穿板孔径", "6.5–7.5 mm。按所用接头与面板图纸选定名义孔径后，以 ±0.1 mm 控制加工公差，孔缘无毛刺或划痕。"],
        ["防转与定位", "如面板要求限制接头转动，应按组合图纸确定防转定位形状，不能仅凭圆孔直径推定已具备防转功能。"],
        ["螺母锁紧", "接头穿过面板后装上六角螺母，先手动旋紧，再用扳手补紧 1/8–1/2 圈；保持本体方向并检查夹持状态。"],
        ["密封检查", "装配后按实际工作压力检查软管与倒刺的连接。面板有隔液、气密要求时，同时验证接头与面板之间的密封。"],
      ],
      note: "上述补紧圈数适用于 PMB 螺母装配，不是通用扭矩值。面板夹持与软管密封分别检查；机箱防护要求需按完整面板组合验证。",
    },
    barbSection(tube, crest),
    {
      ...materialsSection(["PP", "PA"], `本体为 ${MATERIALS[material][0]}`),
      bullets: ["PP 本色可作为多种水性介质管路的选材起点，再核对试剂、清洗液与温度条件。", "关注机械强度、韧性和耐磨性时可比较 PA 白色；长期潮湿或接液时，把吸湿后的尺寸及夹持状态一并纳入检查。"],
      note: "软管、本体与螺母按各自接触环境和受力选材。颜色用于识别标准配置，不能单独代表耐压或耐化学等级。",
    },
    {
      id: "installation", title: "插管、工具与使用检查",
      bullets: [
        "先完成面板固定，再支承接头插管。软管切口平整、清洁，两端沿倒刺轴向推入到位，避免斜推或弯折细长倒刺。",
        "六角螺母使用匹配扳手。需要扭矩控制时，先验证面板与材料组合的设定值；不要把鲁尔或硬管接头扭力批的量程作为 PMB 锁紧值。",
        "插入力过大时，先核对软管内径、壁厚和硬度；辅助润湿工艺需确认与工作液及软管相容，不靠强推、油脂或加热勉强装入。",
        "通液后检查软管是否滑脱、连接处是否泄漏、本体是否转动；给两侧软管留出弯曲余量，避免拉力持续作用于面板。",
        "维护前停流泄压；发现管口开裂、永久扩张或倒刺受损时，更换相应零件后重新验证连接。",
      ],
    },
  ];
}

// A02 PDF pp.92–93 and 95: use the published filtration ranges and CV-BE
// configuration, not unspecified flow/pressure claims from the family overview.
function flowSelectionSections(filter: boolean, model: string, rating: string): DetailSection[] {
  const task: DetailSection = {
    id: "function-selection", title: "颗粒过滤与防回流怎么选",
    intro: filter ? `当前 ${model} 用于液体颗粒过滤，精度为 ${rating}。先明确下游部件需要拦截的颗粒范围，再确认目标流量下的压降。` : `当前 ${model} 为 PP 壳体、EPDM 膜片的膜片式单向阀。先明确允许流向及可能发生的反向压差，再验证启闭与密封。`,
    visualItems: [
      { title: "F-PE 管路过滤器", purpose: "需要拦截颗粒、保护下游流道",
        description: "工作液中有颗粒杂质，且下游泵、阀或小流道需要保护时，按允许颗粒尺寸比较过滤精度。",
        action: "同时检查污染后压降及更换空间；过滤器不能承担止回功能。",
        figure: media("filters", "filter-flow-direction", "过滤器装配流向：按指定入口与出口连接") },
      { title: "CV 膜片式单向阀", purpose: "需要限制液体沿反方向回流",
        description: "停泵或上下游压差变化时存在反向流动风险，可按要求验证单向阀。阀体箭头指向允许的正向流动。",
        action: "分别检查正向开启和反向密封；若还需防虹吸，应另核对静液压与开启条件，不能仅按止回功能判断。",
        figure: media("check-valves", "check-valve-flow-direction", "单向阀壳体箭头与允许液体流向") },
    ],
    note: "同时需要过滤与止回时，可在单向阀上游设置合适过滤器；把两者压降计入系统，并按整条管路验证流量与止回效果。",
    links: filter ? publishedLink("check-valves", "CV", "膜片式单向阀") : publishedLink("filters", "F", "管路过滤器"),
  };
  const selection: DetailSection = filter ? {
    id: "selection", title: "过滤精度与压降怎么确定",
    headers: ["选型项目", "选择依据"], rows: [
      ["40–60 μm：F-PE-60-32-PP-N", "在这两款中需要更细的颗粒过滤范围时比较此款。先核对下游允许的颗粒尺寸，并实测目标流量下的初始压降。"],
      ["80–100 μm：F-PE-100-32-PP-N", "下游允许较粗过滤范围时可比较此款。不能仅凭精度较粗就承诺更大流量或更长使用寿命。"],
      ["接管与滤材", "两款均接 3.2 mm 内径软管，采用 HDPE 滤材、PP 壳体；60 / 100 为过滤精度代码，不是管径或流量。"],
      ["颗粒负荷与更换", "提供颗粒尺寸、浓度及运行时间；记录新滤器流量或压差，按设备的流量下降、压差上升或污染程度确定更换条件。"],
      ["实际液体与流量", "提供介质、浓度、温度、黏度及目标流量，在实际液体条件下核对压降。单一过滤精度不能换算为保证流量。"],
    ],
    note: "40–60 μm、80–100 μm 表示颗粒过滤范围，不代表绝对截留效率或除菌等级。",
  } : {
    id: "selection", title: "开启压差、通流与止回分别核对",
    headers: ["工况", "需要确认的条件"], rows: [
      ["低压差供液", "核对阀开始正向通流所需的压差，确保系统最小可用正向压差满足开启要求；具体数值按实际介质和温度确认。"],
      ["正常工作流量", "在目标流量下检查阀前后压降，再与软管、过滤器及其他部件阻力一起核对泵的供液能力。"],
      ["停泵或反向受压", "按实际反向压差、持续时间和可接受回流量检查密封；正向能够通流不代表反向止回已验证。"],
      ["脉动、气泡或颗粒", "在实际泵送节拍下检查重复启闭。介质有颗粒时先确定过滤方案，避免颗粒停留在膜片密封位置。"],
    ],
    note: "本页为 B 膜片式 + E（EPDM）的组合。鸭嘴式、FKM 膜片或其他管径属于其他配置，需按相应完整型号确认参数。",
  };
  const installation: DetailSection = {
    id: "installation", title: filter ? "过滤器流向、安装位置与更换" : "单向阀流向、安装与检查",
    headers: ["安装项目", "操作与检查"], rows: [
      ["确认流向", filter ? "按本型号装配图及入口、出口标识连接，保留既定流向；外壳朝向无法确认时先核对图纸，不凭两端外观相似判断可反装。" : "先确认实际液体流向，再让阀体箭头指向出口；反装会阻止所需的正向供液。"],
      ["选择位置", filter ? "放在需要保护的部件上游，并预留更换空间；若放在泵吸入侧，需验证滤器压降及逐渐堵塞对吸入能力的影响。" : "按需要阻断的回流路径确定位置。过滤器与阀串联时，一起核对流向、总压降和泵的最小驱动压差。"],
      ["连接软管", "两端配 3.2 mm 内径软管，支承壳体沿倒刺轴向推入到位。留出弯曲余量，避免软管拉扯壳体接缝。"],
      ["装配验证", filter ? "检查两端密封、初始流量与滤器前后压差；在规定污染负荷下验证更换周期，不以外壳透明度代替压差或流量检查。" : "分别验证正向开启、目标流量下的压降、反向止回及两端连接密封；异常时核对方向、气泡、颗粒和膜片状态。"],
      ["维护与更换", filter ? "停机泄压后更换；不要将已污染滤器反向装回。是否允许反冲洗、清洗或重复使用，应按已确认的产品与设备维护流程执行。" : "停机泄压后更换异常阀。壳体为焊接组件，不通过拆开壳体或拧压接缝修复止回问题。"],
    ],
    note: "两端均为倒刺插管连接，无需在壳体上使用扭力批；润湿或其他插管辅助工艺需与软管、工作液及清洁要求相容。",
  };
  return [task, selection,
    {
      ...barbSection(3.2, filter ? undefined : 4.5),
      ...(filter ? { note: "两款过滤器的倒刺外形应按各自确认图纸核对；不要互套峰径或流道孔径。膨胀比用于检查几何配合，不等于额定压力或抗拔力。" } : {}),
    },
    {
      ...materialsSection(["PP"], filter ? "为 PP 壳体与 HDPE 滤材组合" : "为 PP 壳体与 EPDM 膜片组合", filter ? [["HDPE 滤材", "承担颗粒拦截并直接接液；需与壳体一起核对试剂、清洗液、浓度、温度及持续接触时间。"]] : [["EPDM 膜片", "膜片承担启闭与反向密封；重点核对介质接触后的溶胀、回弹及密封变化，不能只按 PP 壳体选择。"]]),
      note: filter ? "PE 是本页滤材代码，指 HDPE；不能由 PP 外壳推断滤材具有相同相容性。整件可用条件还需按实际液体与工况确认。" : "如需选用 FKM 膜片，应按相应完整型号重新确认结构、外形及工作条件；本页型号采用 EPDM 膜片。",
    },
    installation,
  ];
}

function femaleContent(data: RemainingFittingIdentity, model: string, family: string): RemainingFittingContent {
  const type="female-thread-adapters", fields=model.split("-"), material=fields.at(-2)!, color=fields.at(-1)!, boreCode=fields.at(-3)!, bore=tubeText(boreCode);
  const thread=family==="PMU"?fields[2]:fields[1], threadName=thread==="M6"?"M6×1":"1/4-28 UNF";
  const models=publishedFamily(type,family).map(p=>p.foreachModel), name=FEMALE_NAMES[family];
  const geometry: Record<string,string>={U:"两端直线连通，标准型本体用于液路转接。",US:"方型二通本体，外形相同的 05、10、15 型号内部通径不同。",UT:"T 型三通连接三个液路端口，设有两个安装孔。",UY:"Y 型三通连接三个液路端口，分支方向与 T 型不同，设有两个安装孔。",PMU:"二通本体外侧为 M12×1.5 安装螺纹，两端流体口为 1/4-28 UNF 内螺纹。"};
  const parts=fields.map((code,i)=>({code,label:i===0?"系列":i===fields.length-1?"颜色":i===fields.length-2?"本体材质":i===fields.length-3?"通径":family==="PMU"&&i===1?"安装螺纹":"液路螺纹"}));
  const modelRows: Row[]=[["系列",`${family} = ${name}`],...(family==="PMU"?[["安装螺纹","M12 = M12×1.5，配合螺母夹持面板"] as Row]:[]),["液路内螺纹",choices(models,family==="PMU"?2:1,c=>c==="M6"?"M6×1":"1/4-28 UNF")],["内部通径",choices(models,-3,tubeText)],["本体材质",choices(models,-2,c=>MATERIALS[c][0])],["颜色",choices(models,-1,c=>COLORS[c])]];
  const comparison: DetailSection={id:"differences",title:"内螺纹结构与通径差异",headers:["系列","接口与内部通径","结构尺寸与安装"],rows:[
    ["U 标准型二通","本页在售 M6×1 或 1/4-28 UNF，通径 2.0 mm","长度 21.0 mm；用于转接，不能把标准型当作带螺母穿板型。"],
    ["US 方型二通","M6×1，通径 0.5 / 1.0 / 1.5 mm","21.0 × 9.5 × 9.5 mm 本体；相同外形不等于相同流阻。"],
    ["UT 三通 T 型","1/4-28 UNF，通径 1.5 / 2.0 mm","外形参考 27.4 × 18.45 mm，两个安装孔；孔径与孔距按本型号 2D 图确认。"],
    ["UY 三通 Y 型","1/4-28 UNF，通径 1.0 / 1.5 / 2.0 mm","外形参考 25.54 × 22.25 mm，两个安装孔；孔径与孔距按本型号 2D 图确认。"],
    ["PMU 穿板二通","液路口 1/4-28 UNF，通径 2.0 mm","安装螺纹 M12×1.5，配螺母，面板厚度 ≤12.5 mm。"],
  ],note:"以上为系列结构比较。通径表示本体流道孔径，不等于接管外径，也不等于螺纹直径。"};
  const sections: DetailSection[]=femaleSelectionSections(model, family, threadName, bore, material, models);
  return {model,family,type,name,points:[["连接结构",geometry[family]],["液路螺纹",`${threadName} 内螺纹；配合端的螺纹、端口深度与密封面需同时匹配。`],["通径区别",`${boreCode} 表示 ${bore} 内部流道孔径；不能按同一外形判断通径相同。`],["材料区别",`${MATERIALS[material][0]}，${COLORS[color]}；AC 是 POM，PS 是 PPS。`]],figures:[media(type,`${family.toLowerCase()}-structure`,`${name}剖面、外形与通径参考`),...familyPhotos(data,family)],features:[
    [name, geometry[family]],
    [bore + " 内部通径", "把本体通孔与管路内径一起选择，减少接口处流道尺寸突变；外形相同的型号也可能有不同通径。"],
    [threadName + " 液路接口", "两端或三个端口分别配置外螺纹管接头，按各支路管外径选择管端密封组件。"],
    [family === "PMU" ? "面板固定与液路连接分开" : ["UT", "UY"].includes(family) ? "安装孔固定，支路便于布置" : "两端接管，便于液路延长", family === "PMU" ? "M12×1.5 外侧安装螺纹配螺母，支持面板厚度 ≤12.5 mm；内侧 U28 负责液路接管。" : ["UT", "UY"].includes(family) ? "本体设有两个安装孔，按管路方向选择 T 型或 Y 型；按本型号 2D 图确认孔径与孔距，并预留旋拧空间。" : "在两根管路之间配置独立转接本体，分别选择管端接头，标准二通无需穿板安装。"],
    [MATERIALS[material][0], MATERIALS[material][1]],
  ],parts,modelRows,modelNote:"代码表按当前系列在售完整型号列出，不表示所有代码可以任意拼接。通径是本体流道孔径；PMU 的 M12 为安装螺纹，U28 为液路螺纹。",comparison,sections,faqs:faq([["通径代码表示管外径吗？",`不是。${boreCode} 表示本体内部通径 ${bore}。管外径由配套硬管接头确定，管内径还需按流量和流阻选择。`],["相同螺纹的硬管接头能直接互换吗？","还要核对密封形式、端口深度、密封面位置及管端组件。仅螺纹相同不能保证正确压紧与密封。"],["AC 和 PS 分别是什么材料？","本系列 AC 表示 POM（聚甲醛），PS 表示 PPS（聚苯硫醚）。各系列可选材料以完整在售型号为准。"]])};
}

function bulkheadContent(data: RemainingFittingIdentity, model: string): RemainingFittingContent {
  const type="bulkhead-barbed-fittings",family="PMB",f=model.split("-"),material=f[3],color=f[4],tube=parseInt(f[2],10)/10;
  const sizes:Record<string,[number,number,number]>={"16D":[21,2.4,1.2],"24D":[25,3.5,1.7],"32D":[31,4.5,2.4]},[length,crest,bore]=sizes[f[2]];
  return {model,family,type,name:"穿板倒刺接头",points:[["两端倒刺",`两端均连接 ${tube.toFixed(1)} mm 内径软管，通道贯穿面板；倒刺峰径 ${crest.toFixed(1)} mm，内部孔径 ${bore.toFixed(1)} mm。`],["安装螺纹","中部 1/4-28 UNF 外螺纹用于固定面板，配 PMBSN-U28 六角螺母。"],["尺寸区别",`本型号总长 ${length.toFixed(1)} mm；16D、24D、32D 的倒刺峰径、流道和总长不同。`],["材料与面板",`${MATERIALS[material][0]}，${COLORS[color]}；适配面板厚度 ≤3.5 mm，开孔和工具空间同时核对。`]],figures:[media(type,"pmb-structure","PMB 系列剖面与尺寸：16D、24D、32D 分别匹配 1.6、2.4、3.2 mm 软管内径"),media(type,"pmb-panel-assembly","PMB 穿板与 PMBSN 螺母装配，面板厚度 ≤3.5 mm"),...familyPhotos(data,family)],features:[
    ["软管穿板贯通", "将机箱内外软管的连接位置固定在面板上，配六角螺母安装，便于布管与装配检查。"],
    ["两端 " + tube.toFixed(1) + " mm 内径软管", "倒刺峰径 " + crest.toFixed(1) + " mm、内部孔径 " + bore.toFixed(1) + " mm；管径、倒刺峰径与流道孔径分别核对。"],
    ["配套 PMBSN-U28 螺母", "中部 1/4-28 UNF 螺纹用于机械固定；接头与螺母分别选配，适用板厚 ≤3.5 mm。"],
    ["三种管径，按布管空间选择", "当前型号总长 " + length.toFixed(1) + " mm；确定接管内径后，给两侧插管、软管弯曲及扳手操作留出空间。"],
    [MATERIALS[material][0], MATERIALS[material][1]],
  ],parts:f.map((code,i)=>({code,label:["系列","安装螺纹","内径／轮廓","本体材质","颜色"][i]})),modelRows:[["系列","PMB = 穿板倒刺接头"],["安装螺纹","U28 = 1/4-28 UNF，配合安装螺母"],["接管内径／轮廓","16D = 1.6 mm；24D = 2.4 mm；32D = 3.2 mm；D 为倒刺轮廓代码"],["本体材质","PP = 聚丙烯；PA = 聚酰胺／尼龙"],["颜色","N = 本色；W = 白色；当前标准配置为 PP 本色与 PA 白色"]],modelNote:"管径代码表示软管内径，U28 表示安装螺纹，不能把这两种尺寸混用。安装螺母作为配套件分别确认。",comparison:{id:"differences",title:"PMB 管径与尺寸差异",headers:["结构规格","软管内径","峰径／流道孔径","总长"],rows:[["PMB-U28-16D","1.6 mm","2.4 / 1.2 mm","21.0 mm"],["PMB-U28-24D","2.4 mm","3.5 / 1.7 mm","25.0 mm"],["PMB-U28-32D","3.2 mm","4.5 / 2.4 mm","31.0 mm"]],note:"均为 1/4-28 UNF 穿板安装螺纹，面板厚度 ≤3.5 mm。尺寸比较不代表不同管径可直接替换。"},sections:bulkheadSelectionSections(model, tube, crest, material),faqs:faq([["PMB 的 U28 螺纹是液路接口吗？","PMB 的中部 U28 外螺纹用于配安装螺母固定面板，液路通过两端倒刺与软管相连。"],["面板能用多厚，螺母怎么配？","PMB 支持面板厚度不超过 3.5 mm，配 PMBSN-U28 螺母；标准螺母有 PP 本色和 PA 白色。选定孔径后还要检查加工公差、毛刺及安装空间。"],["拧紧螺母后，机箱就能防水吗？","不能由机械夹持推导机箱防水或气密。软管端密封与接头穿板处密封是两个位置，面板密封按机箱要求单独设计和验证。"]])};
}

function flowComponentContent(model: string, type: string): RemainingFittingContent {
  const filter=type==="filters", f=model.split("-"), grade=f[2], fine=grade==="60", rating=fine?"40–60 μm":"80–100 μm";
  const family=filter?"F":"CV",name=filter?"HDPE 滤材管路过滤器":"EPDM 膜片式单向阀";
  const length=32.7,diameter=19.7;
  const comparison:DetailSection=filter?{id:"differences",title:"过滤精度与尺寸差异",headers:["型号","过滤精度","接管与材料","总长／壳体直径"],rows:[["F-PE-60-32-PP-N","40–60 μm","3.2 mm 内径软管；HDPE 滤材 + PP 壳体","32.7 / 19.7 mm"],["F-PE-100-32-PP-N","80–100 μm","3.2 mm 内径软管；HDPE 滤材 + PP 壳体","32.7 / 19.7 mm"]],note:"代码 60、100 对应精度范围，不应写成统一的 60 μm 或 100 μm 单点值。两款接管内径和标注外形尺寸相同，过滤精度按完整型号识别；安装尺寸以本型号 2D 图为准。"}:{id:"differences",title:"单向阀结构与流向",headers:["本型号配置","含义"],rows:[["B：膜片式","正向压差驱动膜片开启，反向压差使膜片关闭；与鸭嘴式是不同结构。"],["E：EPDM","本型号弹性膜片为 EPDM，需与 PP 壳体一起评估接液兼容性。"],["32：3.2 mm 内径软管","两端均为倒刺接管，壳体箭头表示允许流动方向。"],["外形参考","总长 32.7 mm，壳体直径 19.7 mm；安装时留出两端软管与弯曲空间。"]],note:"本页为 CV-BE-32-PP-N，不将其他膜片材料、鸭嘴式或不同管径型号的参数套用到本型号。"};
  const parts=filter?f.map((code,i)=>({code,label:["系列","滤材","精度","接管内径","壳体材质","颜色"][i]})):[{code:"CV",label:"系列"},{code:"B",label:"密封结构"},{code:"E",label:"膜片材质",joined:true},{code:"32",label:"接管内径"},{code:"PP",label:"壳体材质"},{code:"N",label:"颜色"}];
  const modelRows:Row[]=filter?[["系列","F = 管路过滤器"],["滤材","PE = HDPE（高密度聚乙烯）滤材"],["过滤精度","60 = 40–60 μm；100 = 80–100 μm"],["接管内径","32 = 3.2 mm 软管内径"],["壳体材质","PP = 聚丙烯"],["颜色","N = 本色"]]:[["系列","CV = 单向阀"],["密封结构","B = 膜片式；BE 是结构与膜片材质两个代码的组合"],["膜片材质","E = EPDM（三元乙丙橡胶）"],["接管内径","32 = 3.2 mm 软管内径"],["壳体材质","PP = 聚丙烯"],["颜色","N = 本色"]];
  const sections:DetailSection[]=flowSelectionSections(filter, model, rating);
  return {model,family,type,name,points:filter?[["过滤精度",`${grade} 对应 ${rating}，通过 HDPE 滤材拦截颗粒。`],["材料组合","PE 是滤材代码，PP 是壳体材料，两者不能合并理解为同一种材料。"],["接管与尺寸",`两端适配 3.2 mm 内径软管，总长 ${length.toFixed(1)} mm，壳体直径 ${diameter.toFixed(1)} mm。`],["外观与选型","60 和 100 两款外观相似，不能凭照片判断过滤精度；按完整型号识别。"]]:[["膜片式结构","B 表示膜片式，本型号采用 EPDM 膜片；不按鸭嘴式结构说明。"],["流向标识","阀体箭头表示允许通流的方向，安装前识别入口与出口。"],["接管与尺寸","两端适配 3.2 mm 内径软管，总长 32.7 mm，壳体直径 19.7 mm。"],["材料组合","PP 壳体和 EPDM 膜片分别承担结构与启闭功能，两种材料都需评估介质相容性。"]],figures:filter?[media(type,`f-pe-${grade}-32-pp-n`,`${model} 外形参考；过滤精度按型号识别`),media(type,"f-pe-structure","F-PE 过滤器结构尺寸参考：A 为总长、B 为倒刺外径、C 为壳体直径"),media(type,"filter-flow-direction","过滤器安装流向示意，按产品流向标识连接")]:[media(type,"cv-structure","CV 单向阀结构尺寸参考，流向按阀体箭头识别"),media(type,"check-valve-flow-direction","膜片式单向阀流向示意，箭头指向允许通流方向")],features:filter ? [
    [rating + " 颗粒过滤", "用于液体中颗粒杂质的拦截，按下游泵、阀或细小流道允许的颗粒尺寸选择。"],
    ["HDPE 滤材 + PP 壳体", "滤材与壳体共同接触介质，分别核对工作液和清洗液，避免只按外壳材料选型。"],
    ["两端倒刺，接入软管", "适配 3.2 mm 内径软管；沿轴向插管，按壁厚、硬度与回弹检查密封及抗拔。"],
    ["小型在线安装", "布置在需要保护的部件上游，预留更换空间；把初始和污染后的压降纳入系统流量验证。"],
  ] : [
    ["膜片式止回", "由正向压差开启、反向压差关闭，用于限制液体回流；需要分别验证正向供液与反向密封。"],
    ["箭头指示允许流向", "安装前识别液体入口与出口，使阀体箭头与所需流向一致，便于装配检查。"],
    ["EPDM 膜片 + PP 壳体", "膜片承担启闭与密封，两种接液材料一并评估，尤其关注长期接触后的膜片状态。"],
    ["3.2 mm 内径软管连接", "两端倒刺接入软管，可与过滤器组成颗粒防护及止回管路，同时检查总压降。"],
  ],parts,modelRows,modelNote:filter?"精度代码表示过滤范围，32 表示软管内径；两者均不表示流道孔径或可保证的流量。":"BE 需拆成 B（膜片式）与 E（EPDM）阅读，不代表一项独立的压力等级。",comparison,sections,faqs:faq(filter?[["60、100 是单一过滤精度值吗？","不是。F-PE-60-32-PP-N 对应 40–60 μm，F-PE-100-32-PP-N 对应 80–100 μm；两款均采用 HDPE 滤材、PP 壳体并连接 3.2 mm 内径软管。"],["过滤器能代替单向阀或除菌滤器吗？","不能。这里的规格用于颗粒过滤，不构成止回功能或除菌等级声明。选择时还需验证实际流量下的压降与污染后的变化。"]]:[["BE 两个字母分别表示什么？","B 表示膜片式结构，E 表示 EPDM 膜片；CV-BE-32-PP-N 采用 PP 壳体，匹配 3.2 mm 内径软管。"],["按箭头安装后还要检查什么？","还要分别检查实际工况下的正向开启与通流、反向止回，以及软管连接处的密封。正向能流通不等于反向密封已验证。"]])};
}

export function getRemainingFittingContent(data: RemainingFittingIdentity): RemainingFittingContent | null {
  const model=String(data.foreachModel || data.model || "").trim().toUpperCase(),type=String(data.productTypeId || ""),family=model.split("-")[0];
  if (!TYPES.has(type) || !FITTING_PUBLISHED_PRODUCTS.some(p=>p.productTypeId===type&&p.foreachModel===model)) return null;
  if(type==="luer-fittings"&&LUER_NAMES[family])return luerContent(data,model,family);
  if(type==="female-thread-adapters"&&FEMALE_NAMES[family])return femaleContent(data,model,family);
  if(type==="bulkhead-barbed-fittings"&&family==="PMB")return bulkheadContent(data,model);
  if(type==="filters"||type==="check-valves")return flowComponentContent(model,type);
  return null;
}

function withReviewedFittingSpecs<T extends RemainingFittingIdentity>(data:T,content:RemainingFittingContent):T {
  const specs=data.specs?.map(row=>{
    let {label,value}=row;
    if(content.type==="female-thread-adapters"){
      if(label==="材质")value=MATERIALS[String(value)]?.[0]||value;
      if(label==="螺纹规格"){label="液路内螺纹";if(value==="M6")value="M6×1";}
    }
    if(label==="螺纹规格"&&["PMB","PMLS","LNS"].includes(content.family))label="安装螺纹";
    return {...row,label,value};
  });
  if(content.family==="PMU"&&specs&&!specs.some(s=>s.label==="安装螺纹"))specs.push({label:"安装螺纹",value:"M12×1.5"});
  return {...data,specs};
}

// Both Chinese and English product information start from these reviewed rows.
// Keep this separate from FAQ copy so translating specs never replaces FAQs.
export function withRemainingFittingProductSpecs<T extends RemainingFittingIdentity>(data:T):T {
  const content=getRemainingFittingContent(data);
  return content?withReviewedFittingSpecs(data,content):data;
}

// Apply only in Chinese routes so the visible FAQ and FAQPage share the same facts.
export function withRemainingFittingChineseData<T extends RemainingFittingIdentity>(data:T):T {
  const content=getRemainingFittingContent(data);if(!content)return data;
  return {...withReviewedFittingSpecs(data,content),faqs:content.faqs};
}
