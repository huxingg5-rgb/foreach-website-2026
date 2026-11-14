import { assemblyFittings, assemblyFittingAccessories, assemblyTubes, type AssemblyConnection } from "../configurator/tubing-assembly-catalog";
import type { AssemblyConfiguration, AssemblyFamily } from "../detail/tubing-assemblies.review.zh";

export type AssemblyMaterialKey = "fep" | "ptfe" | "pfa" | "black-ptfe";
export const assemblyGuideMaterials = {
  fep: { name: "透明 FEP", material: "FEP", color: "透明", feature: "透明管身便于观察充液与气泡，可视效果结合管壁、液体颜色及样品确认。", focus: "需要目视观察液体状态时，核对实际管径下的观察效果；同时确认工作液与清洗条件。" },
  ptfe: { name: "本色 PTFE", material: "PTFE", color: "本色", feature: "本色 PTFE 管可用于试剂与清洗液管路，材料兼容性结合介质、浓度和接触时间确认。", focus: "本色 PTFE 的目视观察效果与透明 FEP 不同，需结合安装路径和实际样品确认。" },
  pfa: { name: "PFA", material: "PFA", color: "透明", feature: "透明 PFA 管可按长度与端部要求配置，管材和连接部件分别核对使用条件。", focus: "本页配套管材外径为 1.6 mm，内径按已列组合选择；端部加工、介质与清洗条件一并确认。" },
  "black-ptfe": { name: "黑色 PTFE", material: "PTFE", color: "黑色", feature: "黑色管身用于有避光要求的方案评估，可通过文字或编号识别不同流路。", focus: "提供试剂敏感波段、遮光要求及验收方法，并核对管身与两端连接位置的完整遮光表现。" },
} as const;

type FamilyGuide = {
  name: string; connection: AssemblyConnection; fittingFamilies: string[]; bodyMaterials: string[];
  feature: string; sealing: string; roles: [string,string][]; sealingNote: string;
  restrictions: [string,string,string][]; restrictionNote: string;
  endForm: string; accessory: string; dimensionalNote: string;
  torqueTitle: string; torqueValue?: string; torqueNote: string;
  steps: [string,string][];
};

export const assemblyFamilyGuides: Record<AssemblyFamily, FamilyGuide> = {
  "flanged-tubing": {
    name: "法兰翻边管组件", connection: "翻边", fittingFamilies: ["HF","HF6","HFL","HFL6"], bodyMaterials: ["PPS","PVDF","PEEK"],
    feature: "预成型翻边配合支撑垫圈，连接匹配的平底端口，可指定单端或双端配置。",
    sealing: "接头旋入端口时，通过配套垫圈将轴向压紧力传递给管端翻边，使翻边贴合端口底部平面，形成端面密封。",
    roles: [["管端翻边","参与密封，需完整、平整，并与管材、垫圈及端口尺寸匹配。"],["支撑垫圈","位于接头前端与翻边之间，支撑翻边并传递压紧力。"],["螺纹接头","连接设备端口并提供压紧力，旋入时保持同轴，避免带动管体扭转。"]],
    sealingNote: "接头后方的 O 型圈或硅胶限位管用于限制滑动，其作用与端口处的翻边密封分开确认。",
    restrictions: [["密封面","接收端口应为无锥度平底，底面平整、清洁，无影响贴合的毛刺、划伤或异物。","锥形底孔或不平整底面不能按设计压紧翻边，容易漏液或形成残留。"],["内螺纹避空位","接收端口的避空位高度应 ≤1 mm，按配合端口图纸核对。","避空位、孔深与端部零件不匹配时，可能在有效压紧前发生干涉。"],["管端与垫圈","翻边无裂纹、偏斜或明显变形，垫圈孔径、厚度和方向正确。","缺件、混装或端部损伤会改变支撑和密封状态。"],["螺纹与布管","分别核对螺纹、装入深度与后方走管空间。","能够旋入螺纹，仍需确认密封面匹配，避免管路受拉或扭转。"]],
    restrictionNote: "接收端口的 ≤1 mm 避空位与 HF/HF6 接头前端图示的 2 mm 结构尺寸属于不同部位，分别标注和核对。已有锥底端口需重新确认连接或转接方案。",
    endForm: "单端翻边、双端翻边；两端可分别匹配接头、垫圈与螺纹。",
    accessory: "支撑垫圈按具体接头与管外径配套 SUS、PEEK 或 PTFE，不能只按外观替换。",
    dimensionalNote: "HF 的头部外径为 8.2 mm、总长 20.5 mm；HF6 对应为 6.4 mm、17.6 mm。HFL、HFL6 及微型连接按具体型号图纸核对。",
    torqueTitle: "常规平底翻边连接的装配参考", torqueValue: "0.25～0.30",
    torqueNote: "该范围用于对应常规平底翻边配置。实际设定值和控制公差需结合接头、管材及端口确认；微型或特殊连接单独核对。",
    steps: [["核对零件与端口","确认翻边、垫圈、接头与端口正确配套，密封面清洁，零件完整。"],["保持同轴，手工旋入","确认螺纹旋入顺畅后再锁紧，出现偏斜或卡涩时停止检查。"],["使用匹配工具控制扭矩","按旋钮外形选择批头，固定接收端口，避免管身承受锁紧力。"],["按工况检查密封","充液排气后，在规定压力、温度和布管状态下检查；渗漏时先卸压排查，不持续增加扭矩。"]],
  },
  "ferrule-kits": {
    name: "卡箍管组件", connection: "卡箍", fittingFamilies: ["HN","HN6","HNF","HNF6","HNE","HNE6"], bodyMaterials: ["PPS","PVDF","PEEK","POM","PP"],
    feature: "管端无需预先翻边，通过匹配的接头与卡箍固定管路，可分别指定两端配置。",
    sealing: "接头将轴向锁紧力传递给配套卡箍。卡箍在规定的安装位置受压，与管外壁及接收端口共同形成固定与密封。管端状态、卡箍方向和插入深度需要一起确认。",
    roles: [["管材","端面裁切平整，按规定深度插入端口，并在锁紧时保持位置。"],["螺纹接头","提供压紧力，系列、螺纹、通孔与卡箍按型号配套。"],["卡箍","按管外径和端口结构选配，方向及材料需要与接头共同确认。"],["接收端口","为配套卡箍提供正确的密封与定位结构，本页常规系列匹配平底端口。"]],
    sealingNote: "卡箍本身带有锥形外形，并不表示接收端口可以使用锥底。HN/HN6 等常规配置仍需核对匹配的平底端口结构。",
    restrictions: [["端口形式","HN/HN6 等常规配置按匹配的平底端口选择，核对底面、孔深和螺纹。","不能依据卡箍的锥形外观，直接改用锥底接收端口。"],["管端与插入深度","使用合适的切管工具得到平整端面，插入深度及卡箍位置按装配要求确定。","切口偏斜、未插到位或锁紧时退管，会影响密封及连接处容积。"],["卡箍规格与方向","按同一根管材外径选择配套卡箍，分别确认卡箍材料、安装顺序和朝向。","不同系列或尺寸不能按外观混装，装反或错配会改变受压状态。"],["拆装与更换","已压紧变形的卡箍按一次安装件处理，拆装时确认更换要求。","重复压紧可能造成不可逆变形，不能通过继续加大扭矩恢复密封。"]],
    restrictionNote: "端口的避空位和孔深按对应接头、卡箍及端口图纸确认，不直接套用翻边连接的尺寸要求。安装后避免管体在接头出口处受拉、扭转或急弯。",
    endForm: "单端或双端卡箍连接；A/B 两端分别指定接头、卡箍、材料及螺纹。",
    accessory: "配套卡箍提供 PP、ETFE 等材料，具体组合按接头系列与管外径确认；接头本体材料与卡箍材料分别记录。",
    dimensionalNote: "HN 的头部外径为 8.2 mm、总长 18.1 mm；HN6 对应为 6.4 mm、15.5 mm。HNF、HNF6 及其他管径按所选型号图纸核对。",
    torqueTitle: "按接头与卡箍组合确认锁紧参数",
    torqueNote: "锁紧值、控制公差及工具按具体接头和卡箍组合确认，并在装配要求中明确。不同系列及材料分别核对，不能将其他连接形式的数值直接用于本组件。",
    steps: [["裁切并检查管端","确认切口平整、清洁，管身无影响卡箍接触的损伤。"],["核对卡箍顺序与方向","按接头、卡箍和端口的配套要求预装，确认卡箍与管端的位置。"],["保持插入深度并锁紧","固定管材位置，确认螺纹顺畅后使用匹配工具，按已确认参数锁紧。"],["检查密封与拆装状态","按实际工况验证连接；拆卸后检查卡箍变形和更换要求，渗漏时先卸压排查。"]],
  },
  "retaining-ring-kits": {
    name: "卡环管组件", connection: "卡环", fittingFamilies: ["HSF","HSF6","HFL6"], bodyMaterials: ["PPS","PEEK"],
    feature: "管端配套卡环压套与密封垫圈，通过预装与螺纹锁紧完成连接，可按状态进行拆接维护。",
    sealing: "管端依次装入接头、卡环压套与密封垫圈。按配套要求将管端与垫圈端面调整到规定位置，再由接头将压套压紧垫圈，使端部得到固定，并与匹配的平底端口形成密封。",
    roles: [["A · 密封垫圈","按套件型号配套，管端与垫圈端面的位置及朝向需要确认。"],["B · 卡环压套","与垫圈配合固定管端，预装状态应按套件与工具要求检查。"],["C · 螺纹接头","提供连接与锁紧力，标准、紧凑和微型接口分别选配。"]],
    sealingNote: "卡环套件与接头后方用于限制滑动的 O 型圈不是同一部件。CL-1S 与 CL-1X 的接口和结构不同，应分别配套。",
    restrictions: [["端口与螺纹","HSF6 常规配置匹配 M6×1、1/4-28 UNF 平底端口；微型连接按自身图纸核对。","同螺纹不代表端口深度、密封面及套件尺寸均兼容。"],["套件对应关系","CL-1S 随管外径配套常规卡环连接，CL-1X-16 用于对应 6-40 UNF 微型配置。","常规套件与微型套件不能只按相近外观混装。"],["管端及预装","管端裁切平整，按规定顺序、方向和端面位置预装；长款 CL-1S 需配套卡环钳辅助。","预装不到位或端面不齐，会影响固定、密封及安装一致性。"],["拆接维护","重新连接前检查压套、垫圈、管端和端口状态，按磨损或变形情况更换。","可拆接不等于零件可以无限次重复使用；受损端部不应继续加压锁紧。"]],
    restrictionNote: "SUS 压套与 PEEK 垫圈作为配套套件使用。安装顺序、方向和端口加工按具体配置确认，避免把翻边垫片、卡箍或其他环件混入卡环组件。",
    endForm: "单端或双端卡环连接；常规 HSF/HSF6 与 6-40 UNF 微型配置分别确认。",
    accessory: "常规套件使用配套的 SUS 卡环压套与 PEEK 密封垫圈。CL-1S 随管外径选配，CL-1X-16 单独匹配微型接口。",
    dimensionalNote: "HSF 与 HSF6、常规与微型接口分别核对。HSF6 的 PPS 与 PEEK 材质可能对应不同本体图纸，应按完整型号及材料选择图纸。",
    torqueTitle: "先确认套件预装，再确认螺纹锁紧",
    torqueNote: "卡环钳预装与接头锁紧是两个步骤。锁紧参数按接头、套件和端口的具体组合确认，不将翻边或卡箍连接的参考值直接套用。",
    steps: [["裁切并预装零件","裁切平整管端，依次装入接头、压套与密封垫圈，核对安装方向。"],["调整端面并使用配套工具","按套件要求调整管端与垫圈端面；长款 CL-1S 使用匹配的卡环钳完成辅助预装。"],["对正端口并锁紧","将预装端部对正对应端口，确认螺纹顺畅，按已确认的装配参数锁紧。"],["检查固定与密封","按工况核对管端固定和密封状态；拆接前卸压，重新安装前检查零件是否受损或变形。"]],
  },
};

export function getAssemblyGuideMaterial(configuration: AssemblyConfiguration) {
  const material = assemblyGuideMaterials[configuration as AssemblyMaterialKey];
  if (!material) throw new Error(`No material guide for ${configuration}`);
  return material;
}

export function getAssemblyGuideTubeSizes(configuration: AssemblyConfiguration) {
  const material = getAssemblyGuideMaterial(configuration);
  const tubes = assemblyTubes.filter(tube => tube.material === material.material &&
    (material.material !== "PTFE" || tube.color === material.color) && [1.6,2,2.5,3,3.2].includes(tube.outer));
  const pairs = new Map(tubes.map(tube => [`${tube.outer}:${tube.inner}`,{outer:tube.outer,inner:tube.inner}]));
  return [...pairs.values()].sort((a,b) => a.outer-b.outer || a.inner-b.inner);
}

export function getAssemblyGuideFittings(family: AssemblyFamily, outer = 1.6) {
  const guide = assemblyFamilyGuides[family];
  const pool = assemblyFittings.filter(fitting => guide.fittingFamilies.includes(fitting.family) &&
    guide.bodyMaterials.includes(fitting.material) && fitting.connections.includes(guide.connection) &&
    fitting.outerDiameters.includes(outer) && assemblyFittingAccessories(fitting,guide.connection,outer).length > 0);
  const keys = [...new Set(pool.map(fitting => `${fitting.family}|${fitting.thread}`))];
  return keys.map(key => {
    const matches=pool.filter(fitting=>`${fitting.family}|${fitting.thread}`===key);
    const drawings = [...new Set(matches.flatMap(fitting=>fitting.drawingUrl ? [fitting.drawingUrl] : []))].map(url=>{
      const exact=matches.filter(fitting=>fitting.drawingUrl===url);
      return {url,materials:[...new Set(exact.map(fitting=>fitting.material))].join("、"),model:exact[0].model};
    });
    return {family:matches[0].family,thread:matches[0].thread,materials:[...new Set(matches.map(fitting=>fitting.material))].join("、"),drawings};
  });
}
