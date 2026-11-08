// Chinese detail copy only. Sources reviewed 2026-11-06:
// FOREACH A02 catalogue pp.6–9, 14–25, 104/108 (PDF 105/109 for the latter);
// current model-linked 2D drawings; FRGD-140D-2609-0001_001_cn torque workbook.
// Accessory compatibility stays in hard-tube-accessories.ts, not a second SKU list.
// Drawing revisions take priority for HFL/HNF Ø10, PNC Ø9.15 and PNC6 Ø7.33.
// U40 has two distinct assemblies: WS-27 flange or CL-1X-16 compression ring.
// Do not extend the workbook's U40 *ring* torque to its flanged assembly.
// Do not choose between conflicting PEEK high-pressure torque references here.

export type HardTubeZhIdentity = {
  slug?: string;
  model?: string;
  foreachModel?: string;
  productCode?: string;
  specs?: Array<{ label: string; value: string }>;
};

export type CopyRow = [string, string];
export type DetailImage = { src: string; alt: string; caption: string };
export type HardTubeZhProfile = {
  family: string;
  name: string;
  kind: "flanged" | "ferrule" | "pressure" | "union";
  sizeCodes: CopyRow[];
  materialCodes: CopyRow[];
  colorCodes: CopyRow[];
  threadCodes: CopyRow[];
  geometry: string;
  sizeDifference: string;
  structureDetail: string;
  images: DetailImage[];
  bit?: string;
  electricBit?: string;
  ferruleSeries?: string;
  micro?: boolean;
};

const detailRoot = "/images/products/fittings/hard-tube-fittings/details-zh";
const photoRoot = "/images/products/fittings/hard-tube-fittings/photos";
const pilotRoot = "/images/products/fittings/hard-tube-fittings/hfl-m6-16-pv-n/details";
const drawing = (file: string, caption: string): DetailImage => ({ src: `${detailRoot}/${file}.webp`, alt: caption, caption });
const photo = (file: string, caption: string): DetailImage => ({ src: `${photoRoot}/${file}.webp`, alt: caption, caption });
const pilot = (file: string, caption: string): DetailImage => ({ src: `${pilotRoot}/${file}.webp`, alt: caption, caption });

export const THREAD_CODES: CopyRow[] = [["M6", "M6×1"], ["U28", "1/4-28 UNF"]];
const fiveSizes: CopyRow[] = [["16", "1.6 mm"], ["20", "2.0 mm"], ["25", "2.5 mm"], ["30", "3.0 mm"], ["32", "3.2 mm"]];
const flangedSizes: CopyRow[] = [["20", "1.6 / 2.0 mm"], ["25", "2.5 mm"], ["32", "3.0 / 3.2 mm"]];
const ferruleSizes: CopyRow[] = [["16", "1.6 mm"], ["32", "2.0 / 2.5 / 3.0 / 3.2 mm"]];
const naturalBlack: CopyRow[] = [["N", "本色"], ["B", "黑色"]];
const ppsColors: CopyRow[] = [["B", "黑色"], ["U", "蓝色（按具体规格选配）"]];
const pvdf: CopyRow[] = [["PV", "PVDF（聚偏二氟乙烯）"]];
const pps: CopyRow[] = [["PS", "PPS（聚苯硫醚）"]];
const peek: CopyRow[] = [["PK", "PEEK（聚醚醚酮）"]];
const flangedMaterials: CopyRow[] = [...peek, ...pps, ...pvdf];
const ferruleMaterials: CopyRow[] = [["AC", "POM（聚甲醛）"], ...peek, ...pps, ...pvdf];

const flangedStructure = "管端法兰翻边与端口底面贴合；垫片放在翻边与接头之间承担支承作用。后方 O 圈或限位管用于限制接头滑动，不作为端口密封圈。";
const ferruleStructure = "接头前端内腔容纳配套卡箍，卡箍受压后夹持管外壁并形成密封。HN/HN6 使用 CL-0X，HNF/HNF6 使用 CL-0，不能只按相同管径跨系列替换。";
const perSize = "16、20、25、30、32 分别对应 1.6、2.0、2.5、3.0、3.2 mm 管外径；通孔与配套密封件随规格变化。管外径代码不代表管内径。";
const sharedFlangedSize = "20 档本体覆盖 1.6 / 2.0 mm，25 档对应 2.5 mm，32 档覆盖 3.0 / 3.2 mm；本体可共用的规格，垫片仍需按实际管外径分别选择。";
const sharedFerruleSize = "16 档对应 1.6 mm；32 档本体覆盖 2.0、2.5、3.0、3.2 mm。32 不仅表示 3.2 mm，卡箍仍需一一匹配实际管外径。";
const hnImages = [
  drawing("hn-dimensions", "HN：头部直径 8.2 mm，本体总长 18.1 mm；手册尺寸示例"),
  drawing("hn6-dimensions", "HN6：头部直径 6.4 mm，本体总长 15.5 mm；手册尺寸示例"),
  drawing("cl-0x-size-differences", "CL-0X：1.6、2.0、2.5 mm 管规格的孔径与外形差别"),
  photo("ferrule-seal-variant-lineup", "卡箍实物对比：不同外径与孔径规格，按完整型号匹配"),
];
const hnfImages = [
  drawing("hnf-m6-16-dimensions", "HNF-M6-16 剖面：Ø10 × 16.5 mm，前端卡箍容纳腔"),
  drawing("hnf6-m6-16-dimensions", "HNF6-M6-16 剖面：Ø6 × 20 mm，细长本体"),
  drawing("hnf-m6-32-dimensions", "HNF-M6-32 剖面：3.2 mm 管规格的通孔与卡箍容纳腔"),
  photo("compact-ferrule-fitting-black-tubing-assembly", "HNF6 卡箍管组件实物示例；外形与颜色随型号选择"),
];
const hflImages = [
  pilot("hfl-m6-16-dimensions", "HFL-M6-16 剖面：Ø10 × 16.5 mm，前端无螺纹段 1 mm"),
  pilot("hfl6-m6-16-dimensions", "HFL6-M6-16 剖面：Ø6 × 20 mm，细长本体"),
  pilot("hfl-m6-tube-size-comparison", "HFL-M6：1.6 与 3.2 mm 管规格的通孔对比"),
  photo("flat-bottom-fitting-pvdf-natural-tubing-assembly", "HFL 本色翻边管组件实物示例：翻边、垫片与后方限位件"),
];
const pressureImages = [
  drawing("pnc-dimensions", "PNC 尺寸：头部直径 9.15 mm，本体总长 20.8 mm"),
  drawing("pnc6-dimensions", "PNC6 尺寸：头部外径 7.33 mm，本体总长 28.1 mm"),
  photo("peek-fitting-round-base-tubing-assembly", "PNC 一体式 PEEK 接头与硬管装配实物"),
  photo("peek-fitting-hex-base-tubing-assembly", "PNC6 细长接头与硬管装配实物"),
];

const profiles: Record<string, HardTubeZhProfile> = {
  HF: {
    family: "HF", name: "标滚平底接头", kind: "flanged", sizeCodes: flangedSizes, materialCodes: flangedMaterials, colorCodes: naturalBlack, threadCodes: THREAD_CODES,
    geometry: "HF 头部直径 8.2 mm、本体总长 20.5 mm；HF6 头部直径 6.4 mm、总长 17.6 mm。两者前端无螺纹段均为 2 mm，选型时一并核对端口避空。",
    sizeDifference: sharedFlangedSize, structureDetail: flangedStructure, bit: "809739",
    images: [drawing("hf-dimensions", "HF 外形与剖面尺寸：Ø8.2 × 20.5 mm"), drawing("hf6-dimensions", "HF6 对比尺寸：Ø6.4 × 17.6 mm"), photo("flat-bottom-fitting-body-and-seal-comparison", "HF 系列本体与支承垫片实物对比"), photo("flat-bottom-fitting-sealing-washer-assortment", "SUS、PEEK、PTFE 支承垫片实物示例；规格分别匹配")],
  },
  HF6: {
    family: "HF6", name: "紧凑平底接头", kind: "flanged", sizeCodes: flangedSizes, materialCodes: flangedMaterials, colorCodes: naturalBlack, threadCodes: THREAD_CODES,
    geometry: "HF6 头部直径 6.4 mm、本体总长 17.6 mm；相比 HF 的 Ø8.2 × 20.5 mm，同时减小径向与轴向占用。前端 2 mm 无螺纹段仍需匹配端口避空。",
    sizeDifference: sharedFlangedSize, structureDetail: flangedStructure, bit: "809738",
    images: [drawing("hf6-dimensions", "HF6：Ø6.4 × 17.6 mm，前端无螺纹段 2 mm"), drawing("hf-dimensions", "HF 对比：Ø8.2 × 20.5 mm"), photo("compact-flat-bottom-fitting-variant-comparison", "HF6 系列本体实物对比，外形与材料颜色示例"), photo("flat-bottom-fitting-sealing-washer-assortment", "翻边支承垫片实物：同时核对外径、内孔与厚度")],
  },
  HFL: {
    family: "HFL", name: "标滚平底接头", kind: "flanged", sizeCodes: fiveSizes, materialCodes: pvdf, colorCodes: naturalBlack, threadCodes: THREAD_CODES,
    geometry: "HFL 头部直径 10 mm、本体总长 16.5 mm，前端无螺纹段长 1 mm。HFL6-M6/U28 头部直径 6 mm、总长 20 mm；前者更短，后者更细。",
    sizeDifference: perSize, structureDetail: flangedStructure, images: hflImages, bit: "959006", electricBit: "959005",
  },
  HFL6: {
    family: "HFL6", name: "紧凑平底接头", kind: "flanged", sizeCodes: fiveSizes, materialCodes: [["PS", "PPS（M6 / U28 规格）"], ["PK", "PEEK（U40 规格）"]], colorCodes: [...ppsColors, ["N", "本色（U40 的 PEEK 规格）"]], threadCodes: [...THREAD_CODES, ["U40", "6-40 UNF（1.6 mm 管规格）"]],
    geometry: "HFL6-M6/U28 头部直径 6 mm、本体总长 20 mm，比 HFL 的 Ø10 × 16.5 mm 更细、更长。U40 另为 Ø4.2 × 9 mm 的小型结构，不能按 M6/U28 外形预留空间。",
    sizeDifference: perSize, structureDetail: flangedStructure, images: [hflImages[1], hflImages[0], photo("compact-flat-bottom-fitting-tubing-seal-assembly", "HFL6 翻边管组件：细长本体、垫片与翻边位置"), photo("compact-flat-bottom-fitting-black-tubing-assembly-lineup", "HFL6 黑色管组件实物，不同接管规格分别选配")], bit: "959019", electricBit: "959008",
  },
  HN: { family: "HN", name: "标滚卡箍接头", kind: "ferrule", sizeCodes: ferruleSizes, materialCodes: ferruleMaterials, colorCodes: naturalBlack, threadCodes: THREAD_CODES,
    geometry: "HN 头部直径 8.2 mm、本体总长 18.1 mm；HN6 头部直径 6.4 mm、总长 15.5 mm。两者肩部至前端长度均为 8.1 mm，适配 CL-0X 卡箍。", sizeDifference: sharedFerruleSize, structureDetail: ferruleStructure, images: hnImages, bit: "809739", ferruleSeries: "CL-0X" },
  HN6: { family: "HN6", name: "紧凑卡箍接头", kind: "ferrule", sizeCodes: ferruleSizes, materialCodes: ferruleMaterials, colorCodes: naturalBlack, threadCodes: THREAD_CODES,
    geometry: "HN6 头部直径 6.4 mm、本体总长 15.5 mm；相比 HN 的 Ø8.2 × 18.1 mm，占用空间更小。肩部至前端长度为 8.1 mm，适配 CL-0X 卡箍。", sizeDifference: sharedFerruleSize, structureDetail: ferruleStructure, images: [hnImages[1], hnImages[0], hnImages[2], hnImages[3]], bit: "809738", ferruleSeries: "CL-0X" },
  HNF: { family: "HNF", name: "标滚卡箍接头", kind: "ferrule", sizeCodes: fiveSizes, materialCodes: pvdf, colorCodes: naturalBlack, threadCodes: THREAD_CODES,
    geometry: "HNF 头部直径 10 mm、本体总长 16.5 mm；HNF6 头部直径 6 mm、总长 20 mm。两者均匹配 CL-0 卡箍，但本体径向与轴向空间不同。", sizeDifference: perSize, structureDetail: ferruleStructure, images: hnfImages, bit: "959006", electricBit: "959005", ferruleSeries: "CL-0" },
  HNF6: { family: "HNF6", name: "紧凑卡箍接头", kind: "ferrule", sizeCodes: fiveSizes, materialCodes: pps, colorCodes: ppsColors, threadCodes: THREAD_CODES,
    geometry: "HNF6 头部直径 6 mm、本体总长 20 mm；HNF 头部直径 10 mm、总长 16.5 mm。HNF6 适合较小接口间距，轴向仍需留出本体与工具空间。", sizeDifference: perSize, structureDetail: ferruleStructure, images: [hnfImages[1], hnfImages[0], hnfImages[2], hnfImages[3]], bit: "959019", electricBit: "959008", ferruleSeries: "CL-0" },
  PNC: { family: "PNC", name: "标准型高压接头", kind: "pressure", sizeCodes: [["16", "1.6 mm 管外径"]], materialCodes: peek, colorCodes: [["N", "本色"]], threadCodes: [["U32", "10-32 UNF"]],
    geometry: "PNC 头部直径 9.15 mm、本体总长 20.8 mm；PNC6 头部外径 7.33 mm、总长 28.1 mm。PNC 较短，PNC6 径向更小且带六方操作位。", sizeDifference: "PNC 与 PNC6 均连接外径 1.6 mm 的硬管，16 为管外径代码。两者为一体式 PEEK 结构；PNF 则为不锈钢接头与独立卡箍组成的套件。", structureDetail: "前端锥面与匹配的 10-32 UNF 锥底端口配合。管端插入深度与端口剖面共同影响连接处的残留空间，不能只凭螺纹一致判断兼容。", images: pressureImages, bit: "959021" },
  PNC6: { family: "PNC6", name: "紧凑型高压接头", kind: "pressure", sizeCodes: [["16", "1.6 mm 管外径"]], materialCodes: peek, colorCodes: [["N", "本色"]], threadCodes: [["U32", "10-32 UNF"]],
    geometry: "PNC6 头部外径 7.33 mm、六方对边约 6.31 mm、本体总长 28.1 mm。PNC 为 Ø9.15 × 20.8 mm；紧凑型减小径向占用，但轴向更长。", sizeDifference: "PNC6 与 PNC 的管外径均为 1.6 mm、螺纹均为 10-32 UNF；差别在握持外形与长度。PNF 的独立金属卡箍结构需作为另一套连接方案选择。", structureDetail: "前端一体式锥面与接收端口配合，后方六方用于工具操作。选批头或套筒时核对六方和外形，不能直接套用 PNC 的圆形滚花批头。", images: [pressureImages[1], pressureImages[0], pressureImages[3], pressureImages[2]] },
  PNF: { family: "PNF", name: "卡箍型高压接头套件", kind: "pressure", sizeCodes: [["16", "1.6 mm 管外径"]], materialCodes: [["SS", "SUS 不锈钢"]], colorCodes: [["N", "本色"]], threadCodes: [["U32", "10-32 UNF"]],
    geometry: "PNF 为不锈钢接头与独立卡箍组成的套件，手册本体总长 18.4 mm、头部外径 7.3 mm。与一体式 PEEK 的 PNC/PNC6 相比，零件组成和锁紧方式不同。", sizeDifference: "16 对应 1.6 mm 管外径；金属卡箍需匹配该管径与接收端口。PNF 的卡箍不能换成平底卡箍接头所用的 CL-0 或 CL-0X。", structureDetail: "装配时接头提供轴向压紧力，独立金属卡箍与管壁和匹配锥底端口配合。卡箍方向、管端位置与端口锥面需要共同核对。", images: [drawing("pnf-dimensions", "PNF 本体及独立卡箍剖面示例，尺寸单位 mm"), photo("stainless-steel-fitting-nut-and-ferrule-lineup", "PNF 不锈钢接头与独立卡箍实物"), photo("stainless-steel-fitting-tubing-assembly", "PNF 不锈钢接头与管路装配实物"), pressureImages[0]] },
  PU: { family: "PU", name: "高压内螺纹二通", kind: "union", sizeCodes: [["08", "0.8 mm 流道内径"]], materialCodes: [["SS", "SUS 不锈钢"]], colorCodes: [["N", "本色"]], threadCodes: [["U32", "10-32 UNF"], ["U32-U28", "一端 10-32 UNF，另一端 1/4-28 UNF"]],
    geometry: "PU-U32 为两端 10-32 UNF 内螺纹，本体长 21.8 mm；PU-U32-U28 为两端不同螺纹，本体长 18.4 mm。手册本体横向尺寸均为 8 mm，连接时分别识别两端。", sizeDifference: "型号中的 08 表示 0.8 mm 流道内径，不表示适配外径 0.8 mm 的管。管外径由两端选配的外螺纹接头确定；混合螺纹型号多出一段 U28。", structureDetail: "二通本体提供两处内螺纹端口，需要两套匹配的外螺纹接头与管端组件完成连接。两端各自核对端口底面、锥面或密封件配合，不将 U28 端按 U32 端直接装配。", images: [drawing("pu-u32-dimensions", "PU-U32 同螺纹二通：两端 10-32 UNF，长 21.8 mm"), drawing("pu-u32-u28-dimensions", "PU-U32-U28 转接二通：两端不同螺纹，长 18.4 mm"), pressureImages[2], photo("stainless-steel-fitting-tubing-assembly", "外螺纹接头与管组件示例；二通两端分别匹配") ] },
  PUT: { family: "PUT", name: "高压内螺纹 T 型三通", kind: "union", sizeCodes: [["05", "0.5 mm 流道内径"]], materialCodes: [["SS", "SUS 不锈钢"]], colorCodes: [["N", "本色"]], threadCodes: [["U32", "10-32 UNF（三个端口）"]],
    geometry: "PUT 为圆盘外形的 T 型三通，手册外径为 23.4 mm，三个 10-32 UNF 内螺纹端口用于构建分支。PU 为二通，用于两段管路的直通连接。", sizeDifference: "05 表示 0.5 mm 流道内径，区别于 PU 的 08（0.8 mm）。通径用于评估流阻和流路衔接，不是管外径，也不能据此认定三路流量相等。", structureDetail: "三个端口分别装入匹配的外螺纹接头与管端组件，可构成一路分两路或两路汇一路的流路；流量分配仍取决于各支路阻力与运行条件。", images: [photo("stainless-steel-microfluidic-tee-10-32-ports", "PUT 三通实物：圆盘外形与三个 10-32 UNF 内螺纹端口"), drawing("put-dimensions", "PUT 外形示例：外径 23.4 mm"), drawing("pu-u32-dimensions", "PU 二通对比：两端连接，非三通结构"), pressureImages[2]] },
};

export function getHardTubeZhProfile(model: string): HardTubeZhProfile | undefined {
  const family = model.split("-")[0];
  const profile = profiles[family];
  if (!profile || family !== "HFL6" || !model.startsWith("HFL6-U40-")) return profile;
  return {
    ...profile,
    micro: true,
    geometry: "HFL6-U40 本体直径 4.2 mm、总长 9 mm，螺纹为 6-40 UNF，连接 1.6 mm 外径硬管；与 Ø6 × 20 mm 的 HFL6-M6/U28 外形及配套不同。",
    sizeDifference: "本 U40 规格的管外径为 1.6 mm。可按组件方案选择 WS-27 支承垫片的翻边结构，或 CL-1X-16 卡环套件；两种方案不能混成一套密封堆叠。",
    structureDetail: "翻边方案由管端法兰密封，卡环方案由预装的压套和垫圈形成管端组件。同为 HFL6-U40 接头，配套零件与预装工艺随方案变化。",
    bit: "959027", electricBit: undefined,
    images: [photo("compact-flat-bottom-fitting-peek-6-40-unf-body", "HFL6-U40 PEEK 接头实物：微型本体与 6-40 UNF 螺纹"), photo("compact-flat-bottom-fitting-peek-6-40-unf-disassembled-components", "HFL6-U40 管端配套零件分解示例"), photo("compact-flat-bottom-fitting-peek-6-40-unf-tubing-assembly", "HFL6-U40 与硬管装配实物"), drawing("compression-ring-components", "卡环套件的压套与垫圈结构示意；U40 对应 CL-1X-16")],
  };
}

export const MATERIAL_CHARACTERISTICS: Record<string, string> = {
  PV: "PVDF 为含氟工程塑料，兼具耐化学性和机械性能。应按工作液与清洗液的浓度、温度和接触时间核对适用性。",
  PK: "PEEK 具有较高机械强度和耐热性能，适用于需要工程塑料本体的连接配置；材料性能不能直接当作整套接头的工作温度或压力。",
  PS: "PPS 具有较好的尺寸稳定性和耐热性，适合紧凑接头本体。实际介质适用性及装配扭矩按具体连接配置确定。",
  AC: "POM 具有良好的刚性和加工性能，适用于常规工程连接。用于酸性、氧化性工作液或清洗液时，应先核对材料兼容性。",
  SS: "SUS 不锈钢提供金属结构的刚性和机械强度。具体牌号、表面要求及介质耐腐蚀性需随完整型号和工况确认。",
};

export const ASSEMBLY_IMAGES = {
  flanged: pilot("flanged-tubing-assembly-options", "双端法兰翻边管组件：接头、垫片、限位件与管标分别选配"),
  ferrule: drawing("ferrule-structure", "卡箍接头的本体、卡箍与平底端口配合示意；按本系列选配卡箍"),
  micro: drawing("compression-ring-structure", "卡环管端组件结构示意；U40 采用 CL-1X-16 套件"),
};
