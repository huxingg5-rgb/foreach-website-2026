// Chinese selection copy only. Reviewed against FOREACH A02 pp.41–47,
// printed p.104 (PDF p.105), and FRGD-140D-2609-0001_001_cn torque workbook.
// Dimensions below are nominal barb CREST diameters, never flow bores.
// SAL-U28-32D uses drawings C-443-01-00144/00145 REV001 (Ø4.5),
// overriding the inconsistent A02 p.42 row. X32 dimensions are not inferred
// from U32: the linked 32D drawing has an inconsistent title/thread identity.
// Catalogue p.104 lists 959003 under T-DT ELECTRIC bits, not T-ST torque bits.

export type ThreadBarbIdentity = {
  model?: string;
  foreachModel?: string;
  slug?: string;
  specs?: Array<{ label?: string; value?: unknown }>;
};
export type CopyRow = [string, string];
type Family = "SA" | "SAL" | "SB" | "SBS" | "SBR" | "SC";
type FamilyCopy = {
  name: string;
  series: string;
  structure: CopyRow;
  threads: string[];
  sizes: string[];
  materials: string[];
  colors: string[];
  profiles: string[];
};

const threadNames: Record<string, string> = {
  U32: "10-32 UNF", U28: "1/4-28 UNF", M5: "M5×0.8", M6: "M6×1",
  "1/8NPT": "1/8-27 NPT", "1/4NPT": "1/4-18 NPT", "3/8NPT": "3/8-18 NPT",
  "G1/8": "G1/8", X32: "3.4 锥螺纹（按配合端图纸核对）",
};
const sizeNames: Record<string, string> = {
  "16": "1.6 mm", "24": "2.4 mm", "32": "3.2 mm", "40": "4.0 mm",
  "48": "4.8 mm", "64": "6.4 mm", "95": "9.5 mm", "127": "12.7 mm",
};
export const THREAD_BARB_MATERIALS: Record<string, { name: string; use: string }> = {
  PP: { name: "PP（聚丙烯）", use: "质量轻，适合多种水性液路。选型时核对工作液、清洗液的浓度与温度；塑料螺纹应控制锁紧扭矩，避免用加力方式补偿端口不匹配。" },
  PA: { name: "PA（聚酰胺）", use: "具有较好的韧性和机械强度。吸湿会影响材料状态与尺寸，长期浸液、湿热或反复清洗时，应以实际介质和使用周期验证配合。" },
  AC: { name: "POM（聚甲醛）", use: "具有较好的刚性和尺寸稳定性，适用于常规工程连接。酸性或强氧化性工作液、清洗液应重点核对兼容性。" },
  PV: { name: "PVDF（聚偏二氟乙烯）", use: "含氟工程塑料，兼具耐化学性与机械性能。用于化学介质时，仍需按浓度、温度、接触时间和应力状态核对适用性。" },
  PK: { name: "PEEK（聚醚醚酮）", use: "具有较高机械强度和耐热性。按完整接头、软管和密封件组合确定工况，材料本身的性能不能直接作为整套连接的压力或温度额定值。" },
};
const colorNames: Record<string, string> = { N: "本色", W: "白色", B: "黑色" };
const families: Record<Family, FamilyCopy> = {
  SA: {
    name: "直通螺纹转倒刺接头", series: "SA = 直通螺纹转倒刺接头；SAL = L 型螺纹转倒刺接头",
    structure: ["直通布管，连接设备与软管", "螺纹端接设备端口，倒刺端连接弹性软管；两端沿轴向布置，适合软管可直线引出的安装位置。"],
    threads: ["U32", "U28", "1/8NPT", "1/4NPT", "3/8NPT", "G1/8", "X32"],
    sizes: ["16", "24", "32", "40", "48", "64", "95", "127"], materials: ["PP", "PA", "PV", "PK"], colors: ["N", "W"], profiles: ["C", "F", "D"],
  },
  SAL: {
    name: "L 型螺纹转倒刺接头", series: "SA = 螺纹转倒刺系列；L = L 型转向结构，合写为 SAL",
    structure: ["L 型转向，便于侧向出管", "螺纹端与倒刺端呈 L 型布置，让软管从端口侧向引出。安装时预留软管弯曲半径，出管方向与锁紧状态需要同时满足。"],
    threads: ["U32", "U28", "1/8NPT"], sizes: ["16", "32", "64"], materials: ["PP", "PA"], colors: ["N", "W"], profiles: ["D"],
  },
  SB: {
    name: "底面密封螺纹转倒刺接头", series: "SB = 标准直通底面密封；SBS = 短款；SBR = 可旋转结构",
    structure: ["底面压紧，连接平底端口", "接头螺纹端的底面与匹配端口密封面贴合，旋紧螺纹提供轴向压紧力。适合具有对应平底密封结构的设备接口。"],
    threads: ["M5", "M6", "U28"], sizes: ["16", "24", "32", "40"], materials: ["PP", "PA", "AC", "PV"], colors: ["N", "W", "B"], profiles: ["D"],
  },
  SBS: {
    name: "短款底面密封螺纹转倒刺接头", series: "SB = 底面密封系列；S = 短款，合写为 SBS；SBR 为可旋转结构",
    structure: ["短款本体，减少轴向占用", "SBS-M6-24D、32D 的手册总长分别为 19.0、21.7 mm；对应 SB-M6 的 24、32 规格为 24.0、26.0 mm。替换时仍需核对螺纹长度与端口深度。"],
    threads: ["M6"], sizes: ["24", "32"], materials: ["PP", "PA"], colors: ["N", "W"], profiles: ["D"],
  },
  SBR: {
    name: "可旋转底面密封螺纹转倒刺接头", series: "SB = 底面密封系列；R = 可旋转结构，合写为 SBR；SBS 为短款",
    structure: ["可旋转结构，便于调整管路方向", "安装布管时便于调整软管方向，减少管路随接头锁紧而扭转。应按装配用途使用，不能据此视为可连续运转的旋转接头。"],
    threads: ["U28"], sizes: ["16", "24", "32"], materials: ["PP"], colors: ["N"], profiles: [],
  },
  SC: {
    name: "内螺纹转倒刺接头", series: "SC = 内螺纹转倒刺接头，用于配合硬管接头连接软管",
    structure: ["内螺纹转接，连接硬管与软管", "内螺纹侧接匹配的硬管接头和管端组件，倒刺侧接弹性软管。适合在同一条液路中转换硬管与软管连接。"],
    threads: ["M6", "U28"], sizes: ["16", "24", "32"], materials: ["PP"], colors: ["N"], profiles: ["D"],
  },
};

// Keyed by complete family + thread + tube/profile code; never by tube ID alone.
const crests: Record<string, number> = {
  "SA-U32-16F": 2, "SA-U32-24F": 3, "SA-U32-32F": 4,
  "SA-U28-16D": 2.4, "SA-U28-24D": 3.5, "SA-U28-32D": 4.5, "SA-U28-40D": 5.7, "SA-U28-48D": 7,
  "SA-1/8NPT-24C": 3.5, "SA-1/8NPT-32C": 4.5, "SA-1/8NPT-40C": 5.7, "SA-1/8NPT-48C": 7, "SA-1/8NPT-64C": 8.5,
  "SA-1/4NPT-32D": 4.5, "SA-1/4NPT-64D": 8.5, "SA-1/4NPT-95D": 11.5,
  "SA-G1/8-40C": 5.5, "SA-G1/8-64C": 8.5,
  "SAL-U28-16D": 2.4, "SAL-U28-32D": 4.5, "SAL-U32-16D": 2.4, "SAL-U32-32D": 4.5, "SAL-1/8NPT-64D": 8.5,
  "SB-M5-16D": 2.4, "SB-M5-24D": 3.5, "SB-M5-32D": 4.5, "SB-M5-40D": 5.7,
  "SB-M6-16": 2.9, "SB-M6-24": 3.5, "SB-M6-32": 4.5, "SB-M6-40": 5.2,
  "SB-U28-16": 2.9, "SB-U28-24": 3.5, "SB-U28-32": 4.5, "SB-U28-40": 5.2,
  "SBS-M6-24D": 3.5, "SBS-M6-32D": 4.5,
  "SBR-U28-16": 2.7, "SBR-U28-24": 3.5, "SBR-U28-32": 4.2,
  "SC-U28-16D": 2.7, "SC-U28-24D": 3.8, "SC-U28-32D": 4.5,
  "SC-M6-16": 2.7, "SC-M6-32": 4.5,
};

function options(codes: string[], names: Record<string, string>) {
  return codes.map(code => `${code} = ${names[code]}`).join("；");
}

export function getThreadBarbSelection(data: ThreadBarbIdentity) {
  const model = String(data.model || data.foreachModel || data.slug || "").trim().toUpperCase();
  const [familyCode, thread, tubeCode, material, colorPart = ""] = model.split("-");
  const family = familyCode as Family;
  const config = families[family];
  if (!config || !thread || !tubeCode || !material) return undefined;
  const sizeCode = tubeCode.match(/^\d+/)?.[0] || "";
  const profile = tubeCode.slice(sizeCode.length);
  const color = colorPart[0];
  const spec = (label: string) => String(data.specs?.find(item => item.label === label)?.value || "");
  const tubeId = parseFloat(spec("接管内径")) || Number(sizeCode) / 10;
  const threadLabel = threadNames[thread] || spec("螺纹规格");
  const hasOring = /O圈/i.test(model + spec("附加配置"));
  const seal = family === "SC" ? "mating" : hasOring ? "oring" : ["SB", "SBS", "SBR"].includes(family) ? "face" : "thread";
  const sealCopy: CopyRow = seal === "mating"
    ? ["按硬管端组件形成密封", "SC 是内螺纹承接端。需要同时选定硬管接头、管外径及翻边／卡箍等管端组件，并核对内部密封位置，不能只凭螺纹可旋入判断配合。"]
    : seal === "oring"
      ? ["带 O 圈配置，核对端口压紧面", "此型号标注带 O 圈，应核对 O 圈材质、安装位置与配合端密封面。O 圈按配套结构受压密封，不能用增加生料带代替正确的密封圈配合。"]
      : seal === "face"
        ? ["底面密封，无需螺纹填料", "匹配端口通过底面贴合压紧形成密封，保持两侧密封面清洁、无划伤。该结构不需要在螺纹上缠生料带或涂密封胶。"]
        : ["螺纹密封，配合辅助密封材料", "按手册在螺纹端使用 PTFE 生料带或与介质及塑料兼容的螺纹密封胶。螺纹规格、配合深度与辅助材料需一并选定。"];
  const currentMaterial = THREAD_BARB_MATERIALS[material];
  const features: CopyRow[] = [
    config.structure,
    sealCopy,
    [`${threadLabel} 转 ${tubeId.toFixed(1)} mm 内径软管`, `本型号倒刺端按 ${tubeId.toFixed(1)} mm 软管内径选配。软管外径、壁厚和硬度需另外确认；软管规格不能用接头通孔直径代替。`],
    [`${currentMaterial?.name || material} 本体`, currentMaterial?.use || "按完整型号核对材料与工作液、清洗液的兼容性。"],
    ["按峰径与管内径核对膨胀比", "软管越过倒刺峰后贴合管杆，形成夹持。膨胀比用于比较几何配合，需结合弹性、壁厚和插入力验证密封与抗拔效果。"],
    ["可配锁紧工具，控制装配扭矩", family === "SBR" ? "可选 T-ST 扭力批（956002）及 SBR 扭力批批头（959006），便于按设定扭矩锁紧。电批批头属于另一类工具，需分别选配。" : "FOREACH 提供 T-ST 可调扭力批。按接头的旋拧部位与外形匹配批头，在适用量程内控制锁紧扭矩，减少手感差异造成的过度拧紧。"],
  ];
  const modelRows: CopyRow[] = [
    ["系列与结构", config.series],
    ["螺纹规格", options(config.threads, threadNames)],
    ["接管内径", options(config.sizes, sizeNames)],
    ["倒刺轮廓", `${config.profiles.map(code => `${code} = ${code} 型倒刺轮廓`).join("；")}${config.profiles.length ? "。" : ""}轮廓字母紧跟管径代码；未标字母的型号按对应图纸识别，不自行补写。`],
    ["主体材质", options(config.materials, Object.fromEntries(Object.entries(THREAD_BARB_MATERIALS).map(([code, value]) => [code, value.name])))],
    ["颜色", options(config.colors, colorNames)],
  ];
  const torque = family === "SC"
    ? "SC 内螺纹侧的锁紧扭矩由配套硬管接头及密封组件决定；装配时支承 SC 本体，并按所选硬管接头的规定锁紧。不要把 SC 的塑料内螺纹承接端当作可任意加力的锁紧件。"
    : thread.includes("NPT")
      ? `${thread === "3/8NPT" ? "3" : "1.5"} N·m：连接件扭矩表对此 NPT 规格的参考值。T-ST 的 0.60 N·m 上限不足，应使用相应量程及匹配批头的工具，并按端口、材料和辅助密封工艺确认装配条件。`
      : thread === "G1/8" && hasOring
        ? "1.5 N·m：连接件扭矩表对带 O 圈 G1/8 配置的参考值。应使用覆盖该扭矩的工具；T-ST 的 0.60 N·m 上限不足。"
        : ["M5", "M6", "U28", "U32"].includes(thread) && ["PP", "PA", "AC"].includes(material)
          ? `0.25–0.30 N·m（25–30 cN·m）：手册对 PP／PA／POM 非 NPT 塑料螺纹的装配参考范围。具体设定值结合配合端和密封工艺确认；${seal === "thread" ? "不能把生料带缠绕阻力或手感作为密封到位的唯一依据。" : "锁紧前确认底面位置与接触状态，避免用加大扭矩补偿端口深度不匹配。"}`
          : "此配置按配合端、材料和密封工艺确认锁紧扭矩；不直接套用其他螺纹或 PP／PA／POM 型号的数值。";
  return { model, family, config, thread, threadLabel, tubeCode, sizeCode, profile, material, color, colorPart,
    tubeId, currentMaterial, seal, sealCopy, features, modelRows, torque,
    crest: crests[`${family}-${thread}-${tubeCode}`],
    crestSource: family === "SAL" && thread === "U28" && tubeCode === "32D" ? "对应型号 2D 零件图" : "接头手册尺寸表",
  };
}
