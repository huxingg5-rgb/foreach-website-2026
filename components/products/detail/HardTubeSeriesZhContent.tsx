import { registerFittingDetail } from "./fitting-detail-view";
import Link from "next/link";
import type { ReactNode } from "react";
import { formatTubeDiameters, getHardTubeAccessoryConfig } from "@/data/products/configurator/hard-tube-accessories";
import {
  ASSEMBLY_IMAGES, MATERIAL_CHARACTERISTICS,
  type CopyRow, type DetailImage, type HardTubeZhIdentity, type HardTubeZhProfile,
} from "@/data/products/detail/hard-tube-content.zh";
import styles from "./QuickConnectDetailContent.module.css";
import localStyles from "./HardTubeSeriesZhContent.module.css";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <div className="fx-sec" id={id}><h2>{title}</h2>{children}</div>;
}

function Table({ headers, rows, code = false }: { headers: string[]; rows: ReactNode[][]; code?: boolean }) {
  return <div className="fx-tw"><table className={code ? localStyles.modelTable : headers.length > 2 ? "fx-wide" : undefined}>
    {!code && headers.length === 2 ? <colgroup><col style={{ width: "30%" }} /><col /></colgroup> : null}
    <thead><tr>{headers.map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
    <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, column) => column === 0
      ? <th scope="row" key={column}>{cell}</th> : <td key={column}>{cell}</td>)}</tr>)}</tbody>
  </table></div>;
}

function Photo({ image, wide = false }: { image: DetailImage; wide?: boolean }) {
  return <figure className={wide ? localStyles.widePhoto : undefined}>
    <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`查看大图：${image.alt}`}>
      {/* Source drawings and photographs retain their proportions and annotations. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.src} alt={image.alt} width={1500} height={1500} loading="lazy" style={{ objectFit: "contain" }} />
    </a>
    <figcaption>{image.caption}</figcaption>
  </figure>;
}

function Codes({ options }: { options: CopyRow[] }) {
  return <>{options.map(([code, meaning]) => <span className={localStyles.codeOption} key={code}>{code} = {meaning}</span>)}</>;
}

function spec(data: HardTubeZhIdentity, ...labels: string[]) {
  return data.specs?.find(row => labels.includes(row.label))?.value?.trim() || "";
}

function getFeatures(profile: HardTubeZhProfile, material: string, tubeOd: string, flowId: string): CopyRow[] {
  if (profile.micro) return [
    ["Ø4.2 × 9 mm 小型本体", "适合小接口间距的微型液路。6-40 UNF 螺纹与 1.6 mm 管外径分别确认，批头操作空间也需计入布局。"],
    ["两种管端组件可选", "可配法兰翻边与 WS-27 垫片，也可配 CL-1X-16 卡环套件；按端口与管组件工艺选择其中一种方案。"],
    ["PEEK 工程塑料本体", "本型号使用 PEEK 本色本体，材料选择还需覆盖管材及所选垫片或卡环套件。"],
    ["可配置预制管组件", "根据设备接口配置单端或双端组件，并确定管长、限位件与管标，便于整机安装与识别。"],
    ["接头旋拧与管路定位分开", "先将翻边或卡环管端组件正确就位，再旋紧接头；装配时保持管路方向，减少管路跟随扭转。"],
    ["专用批头控制锁紧", "U40 采用 959027 扭力批批头。翻边与卡环方案的预装工艺不同，工具设置按所选组件确认。"],
  ];
  if (profile.kind === "flanged") return [
    ["法兰翻边，平底端面密封", "管端法兰与设备端口底面贴合，支承垫片传递接头压紧力，适用于具有匹配平底端口的泵、阀和液路模块。"],
    ["独立旋拧，便于管路定位", "预先将接头与垫片装入管组件，连接设备时保持管路方向，再旋紧接头，减少硬管随本体扭转。"],
    ["按空间选择本体外形", profile.geometry],
    [`${material} 本体，垫片分别选配`, "垫片可按型号选择 SUS、PEEK 或 PTFE。主体、垫片和管材的材料需要作为完整组合评估。"],
    ["单端或双端翻边管组合", `本型号适配管外径 ${tubeOd}。可按两端设备接口配置接头、垫片、成品管长、限位件及管标。`],
    ["配套扭力批，控制锁紧", `选用与 ${profile.family} 外形匹配的 ${profile.bit} 批头，配合可调扭力批控制装配，减少手感差异造成的过度锁紧。`],
  ];
  if (profile.kind === "ferrule") return [
    ["管端免翻边，直接配卡箍", "平切管端后套入接头与卡箍，按方向定位并装入匹配平底端口，适合需要现场确定管长的液路连接。"],
    ["本体与卡箍分开选", `${profile.family} 对应 ${profile.ferruleSeries} 卡箍。先按实际管外径选规格，再选择 PP 或 ETFE 材料，维护时可分别准备零件。`],
    ["明确管径配套", profile.sizeDifference],
    ["标准与紧凑外形可比较", profile.geometry],
    [`${material} 本体，匹配介质`, "卡箍与管材的接液条件需同时评估。不同本体材料与颜色按系列的具体型号选择。"],
    ["配套批头控制锁紧", `使用 ${profile.bit} 扭力批批头和 T-ST 扭力批控制锁紧。卡箍按单次安装使用，重新装配时准备新卡箍。`],
  ];
  if (profile.kind === "union") return [
    [profile.family === "PUT" ? "三个端口，构建分支" : "两端连接，延长或转接液路", profile.family === "PUT" ? "T 型流路可用于分流或汇流，三个端口分别配接头与管组件；支路流量由系统阻力决定。" : "通过两处内螺纹端口连接两段管路，同螺纹二通与混合螺纹转接二通按设备接口选择。"],
    ["通径与管外径分别选择", `${flowId} 为本体流道内径。外接管径由端口配套的管接头决定，可结合流阻与流路衔接评估。`],
    ["不锈钢本体", "SUS 本体提供金属结构的刚性。接液介质、清洗液以及具体不锈钢牌号需随工况确认。"],
    ["每个端口独立配置", "按各端口的螺纹与密封面选择管接头，可分别确定管路尺寸及走向；密封件跟随对应管接头选择。"],
    ["便于比较二通与三通", profile.family === "PUT" ? "PUT 为 0.5 mm 流道的三通；只需连接两段管路时，可比较 0.8 mm 流道的 PU 二通。" : "PU 的 08 对应 0.8 mm 流道；需要额外分支时，可比较 0.5 mm 流道的 PUT 三通。"],
    ["配套锁紧，避免本体受扭", "锁紧时固定二通或三通本体，再分别操作外接接头。扭矩按外接接头、端口和管材的组合确定。"],
  ];
  return [
    ["1.6 mm 硬管连接", "16 为管外径代码；管内径、壁厚、材料和外径公差另行确定，并匹配高压接收端口。"],
    [profile.family === "PNF" ? "金属卡箍套件" : "一体式 PEEK 结构", profile.family === "PNF" ? "不锈钢接头与独立金属卡箍配套，卡箍夹持与端口配合共同建立连接。" : "接头前端与本体为一体式结构，安装时核对锥面、管端位置和端口深度，减少装配零件。"],
    ["10-32 UNF 锥底端口", "U32 螺纹用于匹配对应高压端口，锥面角度、孔深和管端位置需与接收端口图纸一致。"],
    ["按安装空间选择外形", profile.geometry],
    ["可配二通或三通流路", "匹配 PU-U32 二通或 PUT-U32 三通端口时，可连接两段管路或建立分支；完整流路的使用边界由各组件共同确定。"],
    ["管端定位影响残留空间", "按端口要求将管端插入到位并保持位置，再控制锁紧；避免管端后退留下多余腔隙。"],
  ];
}

export default function HardTubeSeriesZhContent({ data, profile, section }: {
  data: HardTubeZhIdentity;
  profile: HardTubeZhProfile;
  section: "product" | "selection";
}) {
  const model = String(data.model || data.foreachModel || data.slug || "").toUpperCase();
  const parts = model.split("-");
  const config = getHardTubeAccessoryConfig(data, "zh");
  const tubeOd = config?.tubeOuterDiameters.length ? formatTubeDiameters(config.tubeOuterDiameters) : spec(data, "接管外径");
  const flowId = spec(data, "流道内径");
  const material = spec(data, "主体材质");
  const color = spec(data, "颜色");
  const thread = spec(data, "螺纹规格");
  const pressure = spec(data, "额定压力", "耐压");
  const isUnion = profile.kind === "union";
  const isFerrule = profile.kind === "ferrule";
  const isFlanged = profile.kind === "flanged";
  const isMixedUnion = isUnion && parts.length === 6;
  const labels = isMixedUnion ? ["系列", "端口一螺纹", "端口二螺纹", "流道内径", "主体材质", "颜色"]
    : ["系列", "螺纹规格", isUnion ? "流道内径" : "接管外径", "主体材质", "颜色"];
  const accessoryLabel = isFerrule ? "卡箍" : "垫片";
  const materialCode = parts.at(-2) || "";

  if (section === "product") return <section className={styles.detail} data-section="product" id="ht-detail-product" data-content-model={model}>
    <Section id="ht-product-details" title="产品细节与尺寸差异">
      <p>从外形尺寸、接口与配套零件，了解 {model} 及相邻型号的区别。尺寸单位为 mm，点击图片可查看大图。</p>
      <div className="fx-row">
        <div>
          <h3>型号与尺寸差别</h3>
          <ul>
            <li><strong>本型号：</strong>{thread}，{isUnion ? `流道内径 ${flowId}` : `接管外径 ${tubeOd}`}，{material} {color}本体。</li>
            <li><strong>外形与空间：</strong>{profile.geometry}</li>
            <li><strong>{isUnion ? "通径与端口" : "管径与相邻规格"}：</strong>{profile.sizeDifference}</li>
            <li><strong>连接细节：</strong>{profile.structureDetail}</li>
          </ul>
          <p className="fx-muted" style={{ marginTop: 14 }}>图片分别标明型号或结构示例，不按显示大小判断比例。不同螺纹的端口配合以本型号规格及 2D 图纸为准；本体总长不等于安装后的外露长度。</p>
        </div>
        <div className="fx-pics">{profile.images.map(image => <Photo image={image} key={image.src} />)}</div>
      </div>
    </Section>
  </section>;

  const codeRows: ReactNode[][] = [
    ["系列", `${profile.family} = ${profile.name}${profile.micro ? "，本 U40 规格可配翻边垫片或 CL-1X-16 卡环管组件" : isFlanged ? "，配合法兰翻边管与支承垫片使用" : isFerrule ? `，配合 ${profile.ferruleSeries} 卡箍使用` : ""}`],
    ...(isMixedUnion ? [
      ["端口一螺纹", "U32 = 10-32 UNF"], ["端口二螺纹", "U28 = 1/4-28 UNF；两端分别选择配套接头"],
    ] : [["螺纹规格", <Codes key="threads" options={profile.threadCodes} />]]),
    [isUnion ? "流道内径" : "接管外径", <Codes key="sizes" options={profile.sizeCodes} />],
    ["主体材质", <Codes key="materials" options={profile.materialCodes} />],
    ["颜色", <Codes key="colors" options={profile.colorCodes} />],
  ];

  let combinations: CopyRow[];
  if (profile.micro) combinations = [
    ["法兰翻边组合", `${model} ＋ WS-27 系列 SUS 垫片 ＋ 外径 1.6 mm 法兰翻边管。先完成法兰成型，再接入匹配端口。`],
    ["卡环组合", `${model} ＋ CL-1X-16 卡环套件（商品编码 809653）＋ 外径 1.6 mm 硬管。套件为 PEEK 垫圈与 SUS 卡环套，按卡环工艺预装。`],
    ["管组件定制", "单端或双端分别确定连接方案，再确定 FEP / PTFE 管材、内径、成品管长、限位件与管标。"],
  ];
  else if (isFlanged) combinations = [
    ["单端翻边管", `一端使用 ${model} 与匹配垫片，管端加工法兰翻边；另一端按设备要求加工。适合两端连接方式不同的管路。`],
    ["双端翻边管", "两端分别选择接头与垫片，可按各设备端口选择螺纹；共同确定管材、内外径、管长与翻边加工要求。"],
    ["限位件与管标", "O 圈或限位管限制接头滑动；管标可标注流路或装配位置，便于预制管组件的安装与维护。"],
  ];
  else if (isFerrule) combinations = [
    ["单端卡箍连接", `${model} ＋ ${profile.ferruleSeries} 卡箍 ＋ 外径 ${tubeOd} 的硬管。管端平切，按卡箍方向装入匹配平底端口。`],
    ["两端卡箍管组件", "两端分别配接头与新卡箍，按设备端口确定螺纹，并按走线确定管长。每一端的卡箍均按该处实际管外径选择。"],
    ["卡箍与翻边的混合管组件", "同一根管可按两端设备要求采用不同连接方式。翻边端另配翻边接头与垫片，卡箍端保留平切管端并使用对应卡箍。"],
  ];
  else if (isUnion) combinations = profile.family === "PUT" ? [
    ["T 型分支", "PUT-U32-05-SS-N ＋ 三套与 10-32 UNF 端口匹配的外螺纹接头和管组件。可构成分流或汇流连接。"],
    ["各支路管径", "按各支路选用外接接头及管内径、管长，核对端口锥面与插入深度；分流比例需要结合系统阻力验证。"],
    ["安装与固定", "为三个方向预留接头、工具与管路弯曲空间；逐个连接端口并固定本体，避免通过其他支路承受锁紧扭矩。"],
  ] : [
    ["同螺纹二通", "PU-U32-08-SS-N 两端均为 10-32 UNF，分别配匹配的 PNC、PNC6 或 PNF 管接头组件，并核对端口剖面。"],
    ["混合螺纹转接二通", "PU-U32-U28-08-SS-N 一端为 10-32 UNF，另一端为 1/4-28 UNF。两端分别匹配螺纹、端口深度与密封面，不能共用同一套端口假设。"],
    ["管路配置", "两端管外径由所配接头确定，管内径与管长按流阻和管内容积选择；0.8 mm 本体流道不等于外接管的尺寸。"],
  ];
  else combinations = [
    ["连接设备端口", `${model} ＋ 外径 1.6 mm 的匹配硬管${profile.family === "PNF" ? "与本套件金属卡箍" : ""}，装入与其配合的 10-32 UNF 锥底端口。`],
    ["连接两段管路", "可比较 PU-U32 二通，二通两端分别配对应外螺纹接头与管组件；先核对端口剖面，再确定完整组合。"],
    ["构建分支流路", "可比较 PUT-U32 T 型三通，三个端口分别选配管接头；管内径、管长和分支阻力按液路要求确定。"],
  ];

  const materialRows: CopyRow[] = [[`接头本体 · ${material}`, MATERIAL_CHARACTERISTICS[materialCode] || "按完整型号确认材料及其适用介质，并覆盖清洗液、温度和接触时间。"]];
  if (isFlanged) materialRows.push(
    [profile.micro ? "翻边垫片 · SUS" : "翻边垫片 · SUS / PEEK / PTFE", profile.micro ? "U40 的翻边方案使用 WS-27 系列 SUS 支承垫片；外径、内孔与厚度需同时匹配。" : "SUS 为金属支承件；PEEK 具有较高机械强度；PTFE 具有耐化学性和低摩擦特性。不同材料的厚度可能不同，应按配套型号选用。"],
    ["翻边管材 · FEP / PTFE", `可用于法兰翻边管组件。按外径 ${tubeOd} 配套，再确定管内径、壁厚、成品管长与翻边加工条件。`],
  );
  if (profile.micro) materialRows.push(["卡环套件 · PEEK + SUS", "CL-1X-16 采用 PEEK 垫圈与 SUS 卡环套，与翻边垫片方案分开选配。"]);
  if (isFerrule) materialRows.push(
    ["卡箍 · PP", "聚丙烯卡箍具有较好的耐化学性，按具体介质、温度与压紧条件确认；按单次安装准备替换件。"],
    ["卡箍 · ETFE", "乙烯-四氟乙烯共聚物兼具耐化学性与机械性能，尺寸系列仍需与本体和管外径匹配。"],
    ["管材 · 按卡箍适配选择", "按管材、外径公差及壁厚核对夹持与密封条件，保持平整切口；不同硬度的管材不能仅凭外径相同直接替换。"],
  );
  if (profile.kind === "pressure" || isUnion) materialRows.push(
    [profile.family === "PNF" ? "密封部件 · 配套金属卡箍" : isUnion ? "外接接头 · PEEK / SUS 配置" : "前端 · 一体式 PEEK", profile.family === "PNF" ? "使用套件对应的金属卡箍，核对管材硬度、外径公差和端口锥面；不使用平底卡箍接头的塑料卡箍替代。" : isUnion ? "每个端口按完整外接接头选材和密封件；本体材质相同不代表所有外接组合具有相同耐压与耐温。" : "前端锥面参与端口密封，装配时控制压紧，并检查拆接后的压痕、变形和管端状态。"],
    ["管材 · 按高压组合确认", "确认管材、内外径、公差、壁厚、工作液与温度。完整组件的压力能力需同时覆盖接头、管材、端口及装配条件。"],
  );

  return <section className={styles.detail} data-section="selection" id="ht-detail-selection" data-content-model={model}>
    <Section id="ht-features" title="特性与优势">
      <div className="fx-grid">{getFeatures(profile, material, tubeOd, flowId).map(([title, text]) => <div className="fx-card" key={title}><h3>{title}</h3><p>{text}</p></div>)}</div>
    </Section>

    <Section id="ht-model-code" title="型号说明">
      <p>{profile.family} 型号由以下{isMixedUnion ? "六" : "五"}段组成，以 {model} 为例。{isUnion ? "端口螺纹与流道内径分别识别，外接接头和管组件单独选配。" : `螺纹与管径决定接口配合，主体材质与颜色按具体型号选择；${isFerrule ? "卡箍" : isFlanged ? "垫片及管端组件" : "管材与端口"}另行匹配。`}</p>
      <div className={`fx-pn ${localStyles.modelCode}`} aria-label={`${model} 型号编码拆解`}>
        {parts.map((part, index) => <div className={localStyles.modelPart} key={`${index}-${part}`}>
          {index > 0 ? <span className={`fx-dash ${localStyles.separator}`} aria-hidden="true">-</span> : null}
          <span className={`fx-seg ${localStyles.segment}`}><b><span>{part}</span></b><small>{labels[index]}</small></span>
        </div>)}
      </div>
      <Table headers={["代码段", "代码"]} rows={codeRows} code />
      <p className="fx-muted">以上为本系列代码含义，各项不表示可以任意组合，可选配置以完整型号清单为准。本页为 {thread}，{isUnion ? `流道内径 ${flowId}` : `管外径 ${tubeOd}`}，{material} {color}本体。{isUnion ? "流道内径与连接管外径分别确认。" : "管内径与管长按流量、流阻和管内容积要求另行选择。"}</p>
    </Section>

    <Section id="ht-combinations" title={profile.micro ? "翻边与卡环管组件组合" : isFlanged ? "接头与法兰翻边管组合" : isFerrule ? "接头、卡箍与硬管组合" : isUnion ? "二通、三通与管接头组合" : "高压接头与管路组合"}>
      <p>{profile.micro ? "先确定使用翻边还是卡环管端组件，再匹配端口与安装工艺。两种组合使用同一型号本体，但配套件不同。" : isFlanged ? `本型号适配 ${tubeOd} 管外径，采用接头、支承垫片与法兰翻边管的组合。翻边成型在连接设备前完成。` : isFerrule ? `${profile.family} 本体需配 ${profile.ferruleSeries} 卡箍。管端无需翻边，按实际管外径和介质选择卡箍。` : "按接收端口分别确定螺纹、密封结构和管端位置，再选择配套管组件。"}</p>
      <Table headers={["组合方式", "配置与用途"]} rows={combinations} />
      {isFlanged || isFerrule ? <div className="fx-row">
        <div><h3>{profile.micro ? "区分预装与端口锁紧" : isFlanged ? "法兰翻边、垫片与接头的作用" : "卡箍方向与管端位置"}</h3>
          <ul>{(profile.micro ? ["翻边方案先进行法兰成型，垫片支承翻边。", "卡环方案按方向套入压套与垫圈，使用 T-SF-4-SS 安装钳（959016）控制预装。", "管端组件完成后，再用对应批头连接设备端口；卡环钳与扭力批承担不同工序。"] : isFlanged ? ["法兰翻边贴合端口平底密封面。", "垫片位于接头与翻边之间，支承并传递压紧力。", "后方限位件用于限制接头滑动；成品管长与两端零件按组件要求确定。"] : [`使用 ${profile.ferruleSeries} 对应的卡箍，按图示方向装入本体前端。`, "管端平切并清洁，按端口要求插入到位，在锁紧过程中保持管端位置。", "卡箍按单次安装使用；拆下重装时换新卡箍，并检查原夹持位置的管壁。"])
            .map(text => <li key={text}>{text}</li>)}</ul>
        </div>
        <div className="fx-pics"><Photo image={profile.micro ? ASSEMBLY_IMAGES.micro : isFlanged ? ASSEMBLY_IMAGES.flanged : ASSEMBLY_IMAGES.ferrule} wide /></div>
      </div> : null}
      {config?.accessories.length ? <>
        <h3>本型号可选{accessoryLabel}</h3>
        <p>{profile.micro ? "以下为翻边方案的支承垫片；CL-1X-16 属于另一种卡环方案。" : `以下配套与上方选型区一致。${config.tubeOuterDiameters.length > 1 ? `本体覆盖 ${tubeOd}，${accessoryLabel}仍按实际管径分别选择。` : `按 ${tubeOd} 管外径选择，再确认材料。`}`}</p>
        <Table headers={[`${accessoryLabel}型号`, "材质", "适配管外径", "商品编码"]} rows={config.accessories.map(item => [
          item.model, item.materialLabel, formatTubeDiameters(item.tubeOuterDiameters.filter(od => config.tubeOuterDiameters.includes(od))), item.productCode || "按完整型号询配",
        ])} />
        <p className="fx-muted">{isFlanged ? "垫片内孔不等于管外径，外径与厚度也需匹配翻边和端口空间。" : "不同卡箍系列的几何形状不同，不能只按管径或颜色替代。"}接头、配套件及管组件的供货范围按选型清单确定。</p>
      </> : null}
    </Section>

    <Section id="ht-materials" title="材质与耐化学性">
      <p>本型号使用 {material} 本体。材料选择需覆盖工作液、清洗液、浓度、温度和接触时间，并分别确认各接液部件。</p>
      <Table headers={["部件与材料", "材料特点与选择"]} rows={materialRows} />
      <p className="fx-muted">材料特性不等于完整组件的额定耐温或耐压。{pressure ? `本型号当前规格标注 ${pressure}；应用时仍需确认该数据对应的管材、温度、端口和装配条件。` : "使用压力与温度应按接头、配套件、管材和端口的完整组合确认。"}</p>
      <ul className="fx-links"><li><Link href="/resources/material-compatibility/">材料兼容性</Link></li><li><Link href="/resources/technical-articles/fitting-material-selection-guide/">接头材质怎么选</Link></li></ul>
    </Section>

    <Section id="ht-selection" title={isUnion ? "螺纹、通径与安装空间怎么选" : "螺纹、管径与安装空间怎么选"}>
      <Table headers={["选择项目", "本型号及相邻规格的区别"]} rows={[
        ["设备螺纹", `本型号为 ${thread}。${isMixedUnion ? "U32 与 U28 分别位于两端，需逐端匹配。" : profile.micro ? "U40 为 6-40 UNF，不能替代 M6、U28 或 U32。" : isFlanged || isFerrule ? "M6×1 与 1/4-28 UNF 不能互换；切换螺纹时同时核对配套件和端口深度。" : "U32 为 10-32 UNF；与 U28 的 1/4-28 UNF 属于不同螺纹。"}`],
        ["端口密封形式", isFlanged || isFerrule ? `${profile.micro ? "按选定的翻边或卡环方案" : isFerrule ? "按卡箍结构" : "按法兰翻边结构"}匹配平底端口。核对底面、孔深和接头前端空间，不能仅凭螺纹可旋入判断兼容。` : isUnion ? "每个端口分别核对密封面、孔深和配套接头的管端位置；混合螺纹二通尤其需要逐端匹配。" : "选择与本接头前端配合的锥底端口，核对锥面、孔深与管端插入位置。平底翻边或普通塑料卡箍组件不能直接替代。"],
        [isUnion ? "流道与管路尺寸" : "硬管外径", `${isUnion ? `本体流道为 ${flowId}。` : `本型号适配 ${tubeOd} 管外径。`}${profile.sizeDifference}`],
        ["安装空间", `${profile.geometry} 同时预留批头或工具、硬管出管方向及弯曲余量。`],
      ]} />
      <ul className="fx-links"><li><Link href="/products/fittings/hard-tube-fittings/">查看其他硬管接头规格</Link></li><li><Link href={isFlanged ? "/resources/technical-articles/flanged-tubing-assemblies-selection-guide/" : isFerrule ? "/resources/technical-articles/what-is-a-ferrule-fitting/" : "/resources/technical-articles/hard-tube-fittings-selection-guide/"}>{isFlanged ? "翻边管组件选型" : isFerrule ? "卡箍接头的结构与安装" : "硬管接头选型指南"}</Link></li></ul>
    </Section>

    <Section id="ht-torque" title="安装扭矩与扭力批">
      {isFlanged && !profile.micro || isFerrule ? <>
        <p>本型号为 {material} 塑料本体、{thread} 螺纹，推荐锁紧扭矩为 <strong>0.25～0.30 N·m</strong>。{isFerrule ? "过度锁紧会使卡箍产生不可逆变形，影响夹持与密封。" : "过度锁紧可能使法兰翻边产生永久变形，影响密封。"}</p>
        <Table headers={["项目", "配套与设置"]} rows={[
          ["推荐锁紧扭矩", "0.25～0.30 N·m（25～30 cN·m）"],
          ["配套扭力批", "T-ST，商品编码 956002；量程 5～60 cN·m（0.05～0.60 N·m）"],
          [`${profile.family} 扭力批批头`, `商品编码 ${profile.bit}；按本体旋拧外形匹配`],
        ]} />
        <p>按工具说明设置并核对所需扭矩，对正螺纹旋入后再控制锁紧。{profile.electricBit ? `电批批头 ${profile.electricBit} 属于另一种工具配套，不与上述扭力批批头混用。` : "避免用钳子夹持塑料旋钮代替匹配批头。"}</p>
        <p className="fx-muted">上述数值用于本型号 M6 / U28 塑料接头的端口锁紧；管端成型或卡环预装另按相应工艺操作。</p>
      </> : profile.micro ? <>
        <p>HFL6-U40 使用 <strong>959027 扭力批批头</strong>，配合 T-ST 扭力批（956002，量程 0.05～0.60 N·m）。先确定翻边或卡环组合，再确认端口锁紧值。</p>
        <Table headers={["工序或组合", "扭矩与工具要求"]} rows={[
          ["CL-1X-16 卡环组合", "采用塑料本体的 U40 卡环连接，推荐端口锁紧范围为 0.08～0.15 N·m（8～15 cN·m）；按该卡环组件及接收端口确认。"],
          ["WS-27 翻边组合", "锁紧值按翻边、垫片与接收端口的具体组合确认，不能直接沿用卡环组合的数值。"],
          ["卡环预装", "T-SF-4-SS 安装钳，商品编码 959016，用于卡环压套与垫圈预装；扭力批用于预装完成后的端口连接。"],
        ]} />
      </> : profile.kind === "pressure" ? <>
        <p>{profile.family === "PNF" ? "PNF 金属高压接头的手册参考锁紧扭矩为 2.2 N·m，应用前应按本套件、管材与接收端口确认装配值。使用与六方外形及扭矩范围匹配的工具。" : `${profile.family} 为 PEEK 高压接头，锁紧值需按管材、端口锥面与插入深度对应的装配要求确认。请随完整型号提供管材和端口剖面，确认扭矩后再设置工具。`}</p>
        <Table headers={["工具或操作", "选择与使用"]} rows={[
          ["本体配套", profile.family === "PNC" ? "PNC 对应扭力批批头 959021，可配 T-ST 扭力批 956002。" : profile.family === "PNC6" ? "PNC6 带六方操作位，使用与外形匹配的批头或套筒；PNC 的 959021 批头不作为 PNC6 的已确认配套。" : "按 PNF 六方外形匹配套筒或扭矩工具，同时固定接收端口，避免管路承受锁紧力。"],
          ["工具量程", profile.family === "PNF" ? "选用覆盖已确认装配扭矩的工具。T-ST 956002 上限为 0.60 N·m，不能执行 2.2 N·m 的金属高压接头参考值。" : "T-ST 956002 量程为 0.05～0.60 N·m，使用前核对确认后的目标扭矩位于工具量程内。"],
          ["锁紧与复检", "保持管端插入位置，逐步锁紧并验证密封；发现渗漏时先泄压检查管端、密封面和配套，不能持续加力补偿。"],
        ]} />
      </> : <>
        <p>PU / PUT 为内螺纹连接本体，锁紧的是各端口上的外接管接头。应按每个外接接头的材料、管端结构和接收端口确定扭矩，再选择对应工具。</p>
        <Table headers={["外接配置", "工具与扭矩选择"]} rows={[
          ["PNC 外接接头", "可配 959021 批头与 T-ST 956002 扭力批；先确认 PEEK 高压连接的装配扭矩。"],
          ["PNC6 / PNF 外接接头", "按对应六方外形选工具。PNF 金属高压连接的参考扭矩需使用覆盖该值的工具，不使用量程上限 0.60 N·m 的 T-ST 代替。"],
          ["U28 端或其他组合", "按该端的完整接头、密封件和端口结构确认；不能把 U32 端的锁紧值直接用于另一种连接。"],
          ["固定本体", "分别锁紧各端口时固定二通或三通本体，避免其他已连接的管路被带动或扭转。"],
        ]} />
      </>}
    </Section>

    <Section id="ht-installation" title="安装与使用注意事项">
      <div className="fx-callout"><p><strong>{isFlanged ? profile.micro ? "先选定管端组件方案，再进行预装。" : "先完成法兰翻边，再连接设备。" : isFerrule ? "管端平切、卡箍匹配，再控制锁紧。" : "先确认端口与管端位置，再进行锁紧。"}</strong>{isFerrule ? " 卡箍按单次安装使用，拆装时准备对应新件。" : " 拆卸前停机并泄压，按介质要求处理残液。"}</p></div>
      <ul>
        <li><strong>装配前：</strong>{isFlanged ? "检查翻边或卡环管端组件、支承件及端口，保持密封面平整、洁净，清除裂纹、压伤和异物。" : isFerrule ? "用适合管材的切管工具获得平整端面，清除残屑，核对卡箍系列、管径与安装方向。" : "检查螺纹、管端和接收端口，保持锥面或对应密封面洁净，确认管材与配套件无划伤、压扁或明显变形。"}</li>
        <li><strong>连接端口：</strong>{isFlanged ? "让翻边或卡环端部与端口正确就位，保持管路方向，对正螺纹旋入，再按所选组合控制锁紧。" : "按端口要求保持管端插入到位，对正螺纹旋入并控制锁紧；固定接收本体，避免带动其他管路。"}</li>
        <li><strong>通液检查：</strong>在确认的介质、温度与压力下检查渗漏、管端位移及出管处受力；覆盖设备启停工况，吸液侧同时观察进气与气泡。</li>
        <li><strong>维护拆接：</strong>先停机并泄压，检查密封面、管端与配套件。{isFerrule ? "换用新卡箍，并检查原夹持位置是否受损。" : isFlanged ? "翻边或卡环管端组件损伤时处理或更换对应组件。" : "按具体连接工艺确认密封件和管端是否需要更换。"}发现泄漏时先排查配合，不靠继续拧紧补偿损伤。</li>
      </ul>
    </Section>
  </section>;
}

// Pure server content: resolve the same Chinese template before translating its presentation.
registerFittingDetail(Section, Table, Photo, Codes, HardTubeSeriesZhContent);
