import { tubingAssemblyReviewCards, tubingAssemblyReviewTypeNames } from "../tubing-assembly-cards.review.zh";
import { tubingAssemblyIntroImages, tubingAssemblyTypeIntrosReview } from "../tubing-assembly-intros.review.zh";
import { getTubingAssemblyPath, getTubingAssemblyDetailPath, type TubingAssemblyType } from "../tubing-assemblies.en";
import { fepTubingVariants } from "../configurator/fep-tubing";
import { ptfeTubingVariants } from "../configurator/ptfe-tubing";
import { pfaTubingVariants } from "../configurator/pfa-tubing";
import type { Metadata } from "next";
import type { ProductDetailPageData, ProductSpecItem } from "./product-detail.types";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import { assemblyDetailIntroductions, assemblyQualityDocuments } from "./tubing-assembly-introductions.review.zh";

export const assemblyConfigurations = ["fep", "ptfe", "pfa", "black-ptfe", "coiled", "sleeved"] as const;
export type AssemblyConfiguration = (typeof assemblyConfigurations)[number];
export type AssemblyFamily = TubingAssemblyType["id"];

const flangedSharedGallery = [
  { file: "flanged-tubing-support-washers.png", alt: "法兰翻边管组件配套垫片与垫圈实拍" },
  { file: "flanged-fittings-and-washers.png", alt: "翻边连接用螺纹接头及配套垫圈实拍" },
].map(image => ({ ...image, src: `/images/products/tubing-assemblies/flanged-tubing/fep/${image.file}` }));

const ferruleSharedGallery = [
  { file: "ferrule-seal-upright.png", alt: "卡套锥形密封件正面实拍" },
  { file: "ferrule-seal-angled.png", alt: "卡套密封件侧放细节实拍" },
  { file: "ferrule-seal-selection.png", alt: "不同外形与颜色的卡套密封件实拍" },
  { file: "ferrule-fittings-and-seals.png", alt: "卡套连接用螺纹接头与配套卡套实拍" },
].map(image => ({ ...image, src: `/images/products/tubing-assemblies/ferrule-kits/gallery/${image.file}` }));

const retainingRingSharedGallery = [
  { file: "retaining-ring-fittings-and-components.png", alt: "卡环连接用螺纹接头与配套环件实拍" },
  { file: "retaining-ring-support-components.png", alt: "卡环连接配套环件及接头实拍" },
  { file: "retaining-ring-sleeve-pair.png", alt: "卡环套件中的金属环与米黄色环件实拍" },
  { file: "micro-retaining-ring-fitting-parts.png", alt: "微型螺纹接头及配套卡环零件实拍" },
].map(image => ({ ...image, src: `/images/products/tubing-assemblies/retaining-ring-kits/gallery/${image.file}` }));

const structures: Record<AssemblyFamily, { intro: string; parts: { name: string; description: string }[]; connections: string[][]; installation: string }> = {
  "flanged-tubing": {
    intro: "管端向外翻边，配套接头与垫圈支撑翻边部位，并将其压紧在平底端口的密封面上。可指定单端翻边或双端翻边。",
    parts: [
      { name: "管材与翻边端", description: "按内外径与端口尺寸确定翻边形状，明确单端或双端加工。" },
      { name: "螺纹接头", description: "PPS、PVDF、PEEK 接头可选，提供标准及紧凑结构。" },
      { name: "支撑垫圈", description: "按连接型号选择 SUS、PEEK 或 PTFE 垫圈。" },
    ],
    connections: [["常规连接", "M6×1、1/4-28 UNF", "PPS、PVDF、PEEK；标准或紧凑结构"], ["微型连接", "部分配置支持 6-40 UNF", "接头、管径与端口按具体型号确认"]],
    installation: "确认翻边端面、垫圈方向与端口密封面。接头螺纹一致时，仍需核对端口深度与翻边尺寸。",
  },
  "retaining-ring-kits": {
    intro: "由管材、螺纹接头、卡环压套与密封垫圈组合，通过压套与垫圈的配合固定管端并形成密封。",
    parts: [
      { name: "管材", description: "依据管外径选配卡环套件，管内径和成品长度按液路要求确定。" },
      { name: "卡环压套与密封垫圈", description: "按型号配套 SUS、PEEK 部件，安装顺序与方向需按装配要求确认。" },
      { name: "配套接头", description: "6-40 UNF 微型配置与 HSF6 配置可选，A、B 两端可分别指定。" },
    ],
    connections: [["6-40 UNF 配置", "6-40 UNF", "PEEK 接头，接管外径 1.6 mm"], ["HSF6 配置", "M6×1、1/4-28 UNF", "接管外径 1.6、2.0、2.5、3.0、3.2 mm"]],
    installation: "按配套要求安装压套与密封垫圈，使用指定装配工具。管外径、卡环套件和端口需配套确认。",
  },
  "ferrule-kits": {
    intro: "管端无需预先翻边，由配套螺纹接头压紧卡套，实现管路固定与密封。卡套尺寸随管外径和端口结构选择。",
    parts: [
      { name: "管材", description: "确认内外径及管端状态，按安装要求插入配合端口。" },
      { name: "卡套", description: "按系列提供 PP、ETFE 材质，需与管外径和端口几何形状匹配。" },
      { name: "螺纹接头", description: "按系列提供 PPS、PVDF、PEEK、POM、PP 材质及标准、紧凑结构。" },
    ],
    connections: [["平底端口连接", "M6×1、1/4-28 UNF", "接管外径 1.6、2.0、2.5、3.0、3.2 mm"], ["卡套选配", "随接头及端口确定", "PP、ETFE；具体尺寸按型号选择"]],
    installation: "确认卡套方向、管材插入深度与接头拧紧要求。按装配图与规定扭矩安装，避免管路受拉或急弯。",
  },
};

const options: Record<AssemblyConfiguration, { title: string; text: string; rows: string[][] }> = {
  fep: { title: "FEP 管材与长度定制", text: "透明 FEP 管用于仪器内试剂、清洗液及样本相关液路的连接配置。需要观察液体或气泡时，可结合实际管壁与样品确认可视效果。", rows: [["管材", "透明 FEP"], ["尺寸", "按管材尺寸表中的内外径组合选择"], ["成品长度", "按图纸指定，注明测量基准与公差"]] },
  ptfe: { title: "PTFE 管材与长度定制", text: "本色 PTFE 管材按设备液路布局裁切与配套连接。选材时同时提供工作液、清洗液及使用温度。", rows: [["管材", "本色 PTFE"], ["尺寸", "按已列规格选择内外径组合"], ["成品长度", "按安装路径与图纸定制"]] },
  pfa: { title: "PFA 管材与端部定制", text: "PFA 管材可按管长与两端连接要求配置。管端加工及密封部件需结合所选尺寸与配合端口确认。", rows: [["管材", "PFA"], ["参考外径", "1.6 mm"], ["参考内径", "0.5、0.8、1.0 mm"]] },
  "black-ptfe": { title: "黑色 PTFE 与避光配置", text: "用于提出避光要求的仪器液路。请提供试剂敏感波段、遮光要求与安装环境，以确认管材及完整连接部位的遮光表现。", rows: [["管材", "黑色 PTFE"], ["避光要求", "注明敏感波段及验收要求"], ["管路标识", "可指定文字、编号与安装位置"]] },
  coiled: { title: "弹簧管几何尺寸定制", text: "管体螺旋成型，两端保留直管段用于连接。请提供安装空间；如涉及伸缩运动，还需给出行程、运动频率与寿命要求。", rows: [["管材", "FEP、PTFE、PFA 或黑色 PTFE，按成型要求选择"], ["螺旋尺寸", "螺旋直径、圈数、螺距及自然状态长度"], ["端部尺寸", "A、B 两端直管长度与出管方向"]] },
  sleeved: { title: "防磨护套覆盖与位置定制", text: "在管路与机壳、支架等接触的位置配置护套。依据走管路径指定覆盖区间，避免影响端部安装及所需弯曲空间。", rows: [["基础管材", "FEP、PTFE、PFA 或黑色 PTFE"], ["护套", "材质、内径与覆盖长度按图确认"], ["安装位置", "距 A 端或 B 端的距离、固定方式及外部空间"]] },
};

// Tube catalogue pairs are source tube options, not certified assembly ratings.
function sizeRows(configuration?: AssemblyConfiguration) {
  const materials = [
    { key: "fep", label: "透明 FEP", rows: fepTubingVariants },
    { key: "ptfe", label: "本色 PTFE", rows: ptfeTubingVariants.filter(v => v.attributes.color === "本色") },
    { key: "pfa", label: "PFA", rows: pfaTubingVariants },
    { key: "black-ptfe", label: "黑色 PTFE", rows: ptfeTubingVariants.filter(v => v.attributes.color === "黑色") },
  ];
  return materials.filter(m => !configuration || configuration === "coiled" || configuration === "sleeved" || m.key === configuration).flatMap(material => {
    const pairs = new Map<number, Set<number>>();
    for (const variant of material.rows) {
      const od = Number(variant.attributes.outerDiameter);
      const id = Number(variant.attributes.innerDiameter);
      if (od > 3.2 || ![1.6, 2, 2.5, 3, 3.2].includes(od)) continue;
      if (!pairs.has(od)) pairs.set(od, new Set());
      pairs.get(od)!.add(id);
    }
    return [...pairs].sort(([a], [b]) => a - b).map(([od, ids]) => [material.label, String(od), [...ids].sort((a, b) => a - b).join(" / ")]);
  });
}


type AssemblyFaq = { question: string; answer: string };

// Keep useful configuration and connection answers alongside one common rating boundary.
const configurationFaqs: Record<AssemblyConfiguration, AssemblyFaq[]> = {
  "fep": [
    {
      "question": "透明 FEP 管能用于观察气泡吗？",
      "answer": "透明 FEP 管可用于目视观察液体和气泡。可视程度受管壁、内径及液体颜色影响，建议用实际液体和样品确认。"
    },
    {
      "question": "FEP 管径和长度可以怎样选择？",
      "answer": "可从已列管材尺寸组合中选取内外径，并指定成品长度与公差。其他尺寸及端部加工需求可提供图纸评估。"
    }
  ],
  "ptfe": [
    {
      "question": "同一外径为什么有不同内径？",
      "answer": "同一外径下，不同内径对应不同壁厚。例如外径 2.0 mm 的本色 PTFE 管，内径可选 1.0 或 1.2 mm。结合管长、目标流量和允许压降，从尺寸表选择并核对端部配套。"
    },
    {
      "question": "PTFE 组件选材时要提供哪些介质信息？",
      "answer": "请说明工作液与清洗液的成分、浓度、温度和接触时间，以便一起选择管材、接头及密封部件。"
    }
  ],
  "pfa": [
    {
      "question": "PFA 管有哪些现有尺寸？",
      "answer": "当前参考管材外径为 1.6 mm，内径可选 0.5、0.8、1.0 mm。其他尺寸可提供图纸，由工程师评估管材供应与端部配套。"
    },
    {
      "question": "PFA 组件可以定制哪些部分？",
      "answer": "可指定成品长度与公差、A/B 两端接头和螺纹，并按走管要求提出护套、限位管与标识的位置。连接部件随管径和端口配套。"
    }
  ],
  "black-ptfe": [
    {
      "question": "黑色管材是否适合所有避光试剂？",
      "answer": "需按试剂敏感波段与实际遮光要求确认。黑色外观本身不能替代完整管路的遮光验证。"
    },
    {
      "question": "黑色管路怎样区分不同流路？",
      "answer": "可用文字、编号或热缩管标识区分流路，在装配图上注明标识内容及距 A/B 端的位置。"
    }
  ],
  "coiled": [
    {
      "question": "弹簧管定制需要哪些尺寸？",
      "answer": "需给出管内外径、螺旋直径、圈数、螺距、自然状态长度及两端直管长度；运动工况还需提供行程与频率。"
    },
    {
      "question": "弹簧管用于往复运动时需要哪些信息？",
      "answer": "请提供行程、往复频率、寿命要求及安装空间，用于确定螺旋尺寸、两端直管长度和安装余量，并通过样品验证。"
    }
  ],
  "sleeved": [
    {
      "question": "护套的位置和长度可以指定吗？",
      "answer": "可以。请在图纸上标出护套覆盖长度、距端部的安装位置、固定方式及允许的外部尺寸。"
    },
    {
      "question": "护套如何避开端部安装空间？",
      "answer": "在图纸中标明护套距 A/B 端的位置，留出接头操作、密封部件装配和必要的管路弯曲空间；具体距离随接头型号与安装布局确定。"
    }
  ]
};
const connectionFaqs: Record<AssemblyFamily, AssemblyFaq> = {
  "flanged-tubing": {
    "question": "单端翻边与双端翻边怎样指定？",
    "answer": "可选择一端或两端翻边，并分别注明 A/B 端的接头材质、螺纹和连接方式。单端翻边时，另一端连接按装配图指定。"
  },
  "retaining-ring-kits": {
    "question": "6-40 UNF 与 HSF6 配置怎样选择？",
    "answer": "6-40 UNF 微型配置采用 PEEK 接头，适配外径 1.6 mm 管材。HSF6 提供 M6×1、1/4-28 UNF 螺纹；按端口螺纹和管外径对照规格表选择套件。"
  },
  "ferrule-kits": {
    "question": "卡套连接需要预先翻边吗？",
    "answer": "不需要。配套接头压紧卡套，实现管路固定与密封。装配时按对应型号核对卡套方向、管材插入深度与拧紧要求。"
  }
};
const pressureFaq: AssemblyFaq = {
  question: "整套管组件的最高工作压力是多少？",
  answer: "工作压力取决于管材、内外径、温度、端部连接及装配方式。请提供目标压力与使用介质，以对应配置的确认结果和测试文件为准。",
};

function getAssemblyFaqs(type: AssemblyFamily, configuration?: AssemblyConfiguration): AssemblyFaq[] {
  if (configuration) return [...configurationFaqs[configuration], connectionFaqs[type], pressureFaq];
  return [
    connectionFaqs[type],
    { question: "A、B 两端可以使用不同连接吗？", answer: "可以分别指定两端连接结构、接头材质与螺纹。请同时提供配合端口图纸及安装空间，确认两端配套配置。" },
    pressureFaq,
    { question: "能否支持样品开发和批量装配？", answer: "支持设备研发配套、按图定制及批量装配。可一并提出样品数量、批量需求、检验项目、管路标签与包装要求。" },
  ];
}

export function getAssemblyReviewDetail(type: AssemblyFamily, configuration?: AssemblyConfiguration) {
  const path = getTubingAssemblyDetailPath(type, configuration);
  const cards = tubingAssemblyReviewCards.filter(card => card.productTypeId === type);
  const card = cards.find(item => item.detailHref === path);
  const intro = tubingAssemblyTypeIntrosReview[type];
  const usesCardImage = ((type === "flanged-tubing" || type === "ferrule-kits") && configuration === "fep")
    || ((type === "flanged-tubing" || type === "retaining-ring-kits") && configuration === "black-ptfe")
    || (type === "flanged-tubing" && configuration === "pfa");
  const image = usesCardImage && card?.imageCard
    ? { src: card.imageCard, alt: card.imageAlt }
    : tubingAssemblyIntroImages[type]!;
  const feature = configuration ? options[configuration] : undefined;
  const structure = structures[type];
  const title = card?.cardTitle ?? tubingAssemblyReviewTypeNames[type];
  const authored = configuration ? assemblyDetailIntroductions[type][configuration] : undefined;
  return {
    type, configuration, path, title, family: tubingAssemblyReviewTypeNames[type], cards,
    description: authored?.seoDescription ?? card?.cardSubtitle ?? intro.paragraphs[0], image,
    introduction: authored?.paragraphs ?? intro.paragraphs,
    applications: authored?.applications ?? ["试剂管路连接", "清洗液管路连接", "仪器内部液路连接", "定制液路装配"],
    seoTitle: authored?.seoTitle,
    structure, feature, sizes: sizeRows(configuration).filter(row => type !== "retaining-ring-kits" || row[0] !== "PFA"),
    compliance: assemblyQualityDocuments,
    faqs: getAssemblyFaqs(type, configuration),
  };
}
export type AssemblyReviewDetail = ReturnType<typeof getAssemblyReviewDetail>;

export function getAssemblyReviewMetadata(data: AssemblyReviewDetail): Metadata {
  return {
    title: data.seoTitle ?? `${data.title}｜尺寸、两端连接与定制｜恒永达`,
    description: data.description,
    alternates: { canonical: getCanonicalUrl(data.path) },
    openGraph: { title: data.seoTitle ?? data.title, description: data.description, url: getCanonicalUrl(data.path), locale: "zh_CN", images: [data.image.src] },
  };
}

function getAssemblyParameters(data: AssemblyReviewDetail): ProductSpecItem[] {
  const material = data.configuration === "fep" ? "透明 FEP"
    : data.configuration === "ptfe" ? "本色 PTFE"
    : data.configuration === "pfa" ? "PFA"
    : data.configuration === "black-ptfe" ? "黑色 PTFE"
    : data.type === "retaining-ring-kits" ? "透明 FEP、本色 PTFE、黑色 PTFE"
    : "透明 FEP、本色 PTFE、PFA、黑色 PTFE";
  const familyParameters: Record<AssemblyFamily, ProductSpecItem[]> = {
    "flanged-tubing": [
      { label: "管端形式", value: "单端翻边、双端翻边" },
      { label: "接头结构", value: "标准型、紧凑型" },
      { label: "接头材质", value: "PPS、PVDF、PEEK" },
      { label: "常规螺纹", value: "M6×1、1/4-28 UNF" },
      { label: "支撑垫圈", value: "材料与尺寸按对应接头型号选配" },
    ],
    "retaining-ring-kits": [
      { label: "连接结构", value: "卡环压套与密封垫圈" },
      { label: "配套接头", value: "HSF6 接头、6-40 UNF 微型接头" },
      { label: "接头材质", value: "PPS、PEEK，按对应系列选配" },
      { label: "常规螺纹", value: "M6×1、1/4-28 UNF（HSF6 配置）" },
      { label: "卡环套件", value: "SUS、PEEK 部件，按套件型号配套" },
    ],
    "ferrule-kits": [
      { label: "连接结构", value: "卡套连接，管端无需预先翻边" },
      { label: "接头结构", value: "标准型、紧凑型" },
      { label: "接头材质", value: "PPS、PVDF、PEEK、POM、PP，按对应系列选配" },
      { label: "螺纹规格", value: "M6×1、1/4-28 UNF" },
      { label: "卡套材质", value: "PP、ETFE，按对应型号选配" },
    ],
  };
  const geometryRows = data.feature?.rows.filter(([label]) =>
    ["螺旋尺寸", "端部尺寸", "护套", "安装位置"].includes(label),
  ).map(([label, value]) => ({ label, value })) ?? [];
  return [
    { label: "管材与外观", value: material },
    ...familyParameters[data.type],
    { label: "成品长度", value: "按图定制，可指定长度与公差要求" },
    { label: "A、B 两端", value: "可分别指定接头材质、螺纹及连接形式" },
    ...geometryRows,
    {
      label: "可选配置",
      value: data.configuration === "coiled" ? "防磨护套、限位管、热缩管标识"
        : data.configuration === "sleeved" ? "弹簧管、限位管、热缩管标识"
        : "弹簧管、防磨护套、限位管、热缩管标识",
    },
  ];
}

/** Chinese review content uses the site's existing product-detail template. */
export function getAssemblySharedDetailData(data: AssemblyReviewDetail): ProductDetailPageData & Record<string, unknown> {
  const paragraphs = [...data.introduction];
  const gallery = (data.type === "flanged-tubing" ? flangedSharedGallery
    : data.type === "ferrule-kits" ? ferruleSharedGallery
    : data.type === "retaining-ring-kits" ? retainingRingSharedGallery : [])
    .filter(image => image.src !== data.image.src);
  return {
    category: "tubing-assemblies", categoryId: "tubing-assemblies",
    __locale: "zh", __reviewLocale: "zh", tubingAuthoredContent: true,
    slug: `${data.type}${data.configuration ? `-${data.configuration}` : ""}`,
    productId: `tubing-assembly-${data.type}-${data.configuration ?? "series"}`,
    productCode: `tubing-assembly-${data.type}-${data.configuration ?? "series"}`,
    productTypeName: "管组件", model: data.title, name: data.title, h1Title: data.title,
    description: data.description, tubingIntroductionParagraphs: paragraphs, advantages: paragraphs,
    commonApplications: data.applications,
    mainImage: data.image.src, imageAlt: data.image.alt,
    additionalImages: gallery.map(image => image.src),
    additionalImageAlts: gallery.map(image => image.alt),
    showConfigurator: false, showDatasheetRequest: false, showDrawingRequest: true,
    show3DRequest: false, cadRequestAvailable: false, detailMode: "custom_inquiry",
    specSeriesKey: data.type,
    specs: getAssemblyParameters(data),
    tubingAssemblySizeTable: {
      title: "管径组合",
      rows: data.sizes.map(([material, outerDiameter, innerDiameters]) => ({ material, outerDiameter, innerDiameters })),
      notes: [
        data.type === "flanged-tubing"
          ? "以上为可选管材尺寸，翻边尺寸及端口配套按装配图确认。"
          : "以上为可选管材尺寸，端部尺寸及端口配套按装配图确认。",
        "接头材质、结构与螺纹按对应型号组合选配。",
        ...(data.type !== "ferrule-kits" ? ["微型选配：6-40 UNF，PEEK 接头，适配管外径 1.6 mm；具体端部配置按对应型号确认。"] : []),
        "工作压力与工作温度按具体组件配置确认。",
      ],
    },
    applicationDetails: {
      tabLabel: "应用与定制", title: `${data.title}应用与定制`,
      intro: ["支持设备研发配套、按图定制、样品开发及批量装配。"],
      items: [
        { title: "仪器液路配套", paragraphs: ["面向体外诊断与自动化分析仪器，按试剂、清洗液等液路的实际介质及连接要求确认组件。"] },
        { title: data.feature?.title ?? "管路配置", paragraphs: [data.feature?.text ?? "可按安装要求选择管材、管径、长度及端部配置。"] },
        { title: "装配图与尺寸确认", paragraphs: ["请提供管内外径、成品长度及公差、长度测量基准、A/B 端口图纸、接头材料、螺纹与安装空间。弹簧管、防磨护套、限位件及标签的位置和尺寸可在装配图中标注。"] },
        { title: "介质与温压条件", paragraphs: ["请说明工作液、浓度、清洗液、接触时间，以及工作压力、温度和所需检验项目，以确认接液材料与完整组件配置。"] },
        { title: "安装与端口确认", paragraphs: [data.structure.installation] },
        { title: "质量文件与交付", paragraphs: [data.compliance] },
      ],
      selectionNote: {
        title: "提交定制需求",
        paragraphs: ["请准备装配图、端口图纸或 BOM，以及样品数量、批量需求和验收要求。", "需要比较管径或管长对压降的影响时，可使用管路流阻计算器进行前期估算。"],
        articleHref: "/en/resources/calculators/fluid-resistance/",
        linkText: "评估管路流阻",
      },
    },
    faqs: data.faqs, detailHref: data.path, selectionHref: getTubingAssemblyPath(data.type),
    breadcrumbs: [
      { label: "首页", href: "/en/" }, { label: "产品中心", href: "/en/products/" },
      { label: "管组件", href: getTubingAssemblyPath() },
      { label: data.family, href: getTubingAssemblyPath(data.type) },
      { label: data.configuration ? data.title : "系列详情" },
    ],
  };
}
