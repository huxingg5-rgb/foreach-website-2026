import { registerFittingDetail } from "./fitting-detail-view";
import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import {
  describeQuickConnectInterface,
  getQuickConnectFamilyRows,
  getQuickConnectModelGuidance,
  QUICK_CONNECT_SERIES,
  type QuickConnectGuidance,
  type QuickConnectRow,
  type QuickConnectSeries,
} from "@/data/products/detail/quick-connect-model-guidance";
import styles from "./QuickConnectDetailContent.module.css";
import modelStyles from "./QuickConnectModelZhContent.module.css";

// Follow the approved Q2001-PMV-SACN section order and markup. Product facts
// and applicable installation instructions vary with the selected model.
function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <div className="fx-sec" id={id}><h2>{title}</h2>{children}</div>;
}

function Table({ rows, headers, wide = true, rowHeaders = !headers }: {
  rows: ReactNode[][]; headers?: string[]; wide?: boolean; rowHeaders?: boolean;
}) {
  return <div className="fx-tw"><table className={!headers ? "fx-kv" : wide ? "fx-wide" : undefined}>
    {headers && <thead><tr>{headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead>}
    <tbody>{rows.map((cells, i) => <tr key={i}>{cells.map((cell, j) => j === 0 && rowHeaders
      ? <th scope="row" key={j}>{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody>
  </table></div>;
}

function DrawingLink({ g }: { g: QuickConnectGuidance }) {
  return g.drawingHref ? <a href={g.drawingHref} target="_blank" rel="noreferrer">查看 {g.row.foreachModel} 完整 2D 图纸</a> : null;
}

function materialRows(series: QuickConnectSeries) {
  return [...new Map(getQuickConnectFamilyRows(series).map(row => [
    row.housingCode + row.sealingCode, row,
  ])).values()];
}

function temperature(row: QuickConnectRow) {
  return getQuickConnectModelGuidance(row.foreachModel)?.temperature ?? "按本型号确认";
}

function ProductContent({ g }: { g: QuickConnectGuidance }) {
  const { row: r, series, isMale, isValved, isPanel, isThread, isElbow } = g;
  const details = [
    [isMale ? "插口端面与密封圈" : "母端插口与锁定机构", isMale ? "查看插入部位、端面和密封圈" : "查看插口、锁定部位和解锁按键"],
    [isThread ? "设备螺纹连接端" : isMale ? "接管端倒刺" : "按键与接管端倒刺", isThread ? r.tubeOrThread + " 外螺纹，核对牙型与端部" : r.tubeOrThread + " 内径软管接口，查看倒刺轮廓"],
    [isPanel ? "穿板螺纹与锁紧螺母" : isElbow ? "L 型出管与操作空间" : "非穿板外形与连接方向", isPanel ? series + " 穿板" + r.gender + "，核对定位面与配套螺母" : isElbow ? "出管转向 90°，预留按键和软管空间" : "沿轴向对接，预留插拔与管路安装空间"],
  ];
  return <Section id="fx-product-detail" title="产品实物与接口">
    <p>{series} 接头的实物外观、接口结构和检验重点，帮助客户在收到样品或批量产品后快速核对。本页型号为 {r.foreachModel}，商品编码 {r.productCode}。</p>
    <div className="fx-row">
      <div>
        <h3>接头细节</h3>
        <p>按完整型号核对{r.gender}、{r.panelMount}、{r.shape}及 {r.housingMaterial}/{r.sealingRingMaterial} 材料组合，重点看这些部位：</p>
        <ul>
          <li>外观：{isThread ? "螺纹完整，无毛刺、损伤，插合部位清洁" : "无毛刺、无损伤，倒刺轮廓完整，插合部位清洁"}。</li>
          <li>尺寸：管路端为{describeQuickConnectInterface(r)}；{isPanel ? "安装孔、板厚和配套螺母按本型号零件图核对" : isElbow ? "核对弯头出管方向、外形及软管弯曲空间" : "核对外形、接口尺寸和插拔空间"}。</li>
          <li>功能与密封：插入锁定，{isMale ? "操作配套母端按键解锁" : "通过本体按键解锁"}；{isValved ? "本型号带阀，断开后" + r.gender + "侧封闭" : "本型号不带阀，断开后" + r.gender + "侧保持敞开"}，通液后检查连接处密封。</li>
        </ul>
      </div>
      <div className="fx-pics">
        <figure>
          <Image src={"/images/resources/technical-articles/instrument-fluidics/" + series.toLowerCase() + "-series-white.webp"} width={1500} height={1500} alt={series + " 公端与母端对接及分离示例"} style={{ objectFit: "contain" }} />
          <figcaption>{series} 公端与母端示例，具体接口和配置以本页型号为准。</figcaption>
        </figure>
        {details.map(([title, description]) => <figure key={title}>
          <div className="fx-shot"><b>{title}</b>{description}</div>
          <figcaption>{title}</figcaption>
        </figure>)}
      </div>
    </div>
  </Section>;
}

function ModelCode({ g }: { g: QuickConnectGuidance }) {
  const { row: r, series, family } = g;
  const rows = getQuickConnectFamilyRows(series);
  const codes = (key: "tubeCode" | "genderCode" | "panelCode" | "valvedCode", value: "tubeOrThread" | "gender" | "panelMount" | "valved") =>
    [...new Map(rows.map(row => [row[key], row[value]])).entries()].map(([code, name]) => code + " = " + name).join("　");
  const suffix = r.shapeCode + r.housingCode + r.sealingCode;
  const suffixes = [...new Map(rows.map(row => [
    row.shapeCode + row.housingCode + row.sealingCode,
    row.shape + "，" + row.housingMaterial + " 外壳 + " + row.sealingRingMaterial + " 密封圈",
  ])).entries()];
  const segments = [[series, "系列"], [r.tubeCode, g.isThread ? "螺纹接口" : "接管内径"], [r.genderCode, "公母端"], [r.panelCode, "安装方式"], [r.valvedCode, "阀门配置"], [suffix, "材质组合"]];
  return <Section id="fx-pn" title="型号说明">
    <p>{series} 型号由以下几段组成，以 {r.foreachModel} 为例。在上方「搭配选型」中可以选择{g.mateRole}并整理公母端配对。</p>
    <div className="fx-pn" aria-label={r.foreachModel + " 型号编码拆解"}>
      {segments.map(([code, label], index) => <Fragment key={label}>
        {(index === 2 || index === 5) && <span className="fx-dash" aria-hidden="true">-</span>}
        <span className="fx-seg"><b>{code}</b><small>{label}</small></span>
      </Fragment>)}
    </div>
    <Table headers={["代码段", "代码"]} rows={[
      ["系列", series + " = " + family.bore + " 通径"],
      ["接管内径或螺纹", codes("tubeCode", "tubeOrThread")],
      ["公母端", codes("genderCode", "gender")],
      ["安装方式", codes("panelCode", "panelMount")],
      ["阀门配置", codes("valvedCode", "valved")],
      ["材质组合", suffixes.map(([code, name], i) => <Fragment key={code}>{i > 0 && <br />}{code} = {name}</Fragment>)],
    ]} />
    <p className="fx-muted">末段首字母 S 表示直通，L 表示 L 型；后面的代码表示外壳与密封圈材料。{g.isThread ? "本型号的管路连接端为 NPT 外螺纹。" : "接管尺寸表示软管内径，不是管外径或接头通径。"}各选项以已有完整型号为准。替换其他品牌时，可参考 <Link href="/resources/selection-support/fitting-replacement/">接头替换选型</Link>。</p>
  </Section>;
}

function Pairing({ g }: { g: QuickConnectGuidance }) {
  const { row: r, series, mateRole } = g;
  const mates = getQuickConnectFamilyRows(series).filter(row => row.genderCode !== r.genderCode);
  return <Section id="fx-mating" title="配对选型">
    <p>快插接头需要一个公端（P）和一个母端（S）成对使用。本页 {r.foreachModel} 是{r.valved}{r.gender}，应配 {series} {mateRole}。断开后哪一侧关闭，取决于两端是否带阀：</p>
    <Table headers={["公端", "母端", "断开后", "适合"]} rows={[
      ["带阀（V）", "带阀（V）", <strong key="both">两端都关闭</strong>, "拆下试剂瓶、废液桶或模块后，两侧都要封闭"],
      ["带阀（V）", "不带阀（X）", "仅公端一侧关闭", "只需要公端所在一侧封闭"],
      ["不带阀（X）", "带阀（V）", "仅母端一侧关闭", "只需要母端所在一侧封闭"],
      ["不带阀（X）", "不带阀（X）", "两端都敞开", "两侧允许敞开，或已由外部阀门隔离"],
    ]} />
    <ul>
      <li><strong>两端接口可以分别选择</strong>：当前端连接{describeQuickConnectInterface(r)}，{mateRole}按另一侧软管内径或设备螺纹选择；公母端须同为 {series} 系列。</li>
      <li><strong>安装方式按位置选</strong>：{mates.some(row => row.panelCode === "M") ? "需要将" + mateRole + "固定在面板上时选穿板（M），管路中间连接时选非穿板（N）；两端的板厚限值分别核对。" : series + " 当前可选公端为非穿板（N）；需要面板固定时，由穿板母端承担固定。"}</li>
      <li><strong>材料按整组连接评估</strong>：{series === "Q60" ? "本系列标准组合为 PP 外壳与 EPDM 密封圈，仍需核对软管及其他接液材料。" : "两端采用不同材料时，取两种材料均适用的温度和介质条件，同时核对软管。"}</li>
    </ul>
  </Section>;
}

function Choosing({ g }: { g: QuickConnectGuidance }) {
  const { series, isThread, isElbow } = g;
  return <Section id="fx-choose" title="如何选择">
    <h3 style={{ marginTop: 0 }}>{series} 系列内的选项</h3>
    <Table wide={false} headers={["选项", "什么时候选"]} rows={[
      [<strong key="v">带阀</strong>, "断开后本侧流路需要封闭；两侧都需封闭时，公母端都选带阀。"],
      [<strong key="x">不带阀</strong>, "断开后本侧允许敞开，或已有外部阀门隔离。"],
      [<strong key="m">穿板</strong>, series === "Q60" ? "母端需要固定在设备面板上时选用，板厚不超过 7.5 mm；公端按非穿板型号配对。" : "需要把接头固定在设备外壳、面板或支架上时选用；公母端允许板厚不同。"],
      [<strong key="n">非穿板</strong>, isThread ? "螺纹型号直接安装在匹配的设备 NPT 内螺纹口上；软管型号用于管路中间连接。" : "接头接在管路中间，随管路布置；需要面板固定时另选对应穿板型号。"],
      ...materialRows(series).map(row => [<strong key={row.housingCode}>{row.housingMaterial} 外壳 + {row.sealingRingMaterial} 密封圈</strong>, "参考工作温度：" + temperature(row) + "；同时确认介质和清洗液相容性。"]),
      ...(isElbow ? [[<strong key="l">L 型出管</strong>, "接管方向相对插拔轴线转向 90°，适合侧向布管；先确认弯头方向和弯曲空间，不作为连续旋转接头使用。"]] : []),
      ...(isThread ? [[<strong key="npt">NPT 螺纹接口</strong>, "当前为 " + g.row.tubeOrThread + " 外螺纹。按设备内螺纹规格选用，不能把螺纹公称尺寸当作软管内径。"]] : []),
    ]} />
    <h3>Q20、Q40、Q60 系列对比</h3>
    <div className="fx-tw"><table className="fx-wide">
      <thead><tr>{["系列", "通径", "接管内径", "外壳材质", "工作压力"].map(title => <th scope="col" key={title}>{title}</th>)}</tr></thead>
      <tbody>{(Object.keys(QUICK_CONNECT_SERIES) as QuickConnectSeries[]).map(key => <tr key={key} className={key === series ? "fx-hl" : undefined}>
        <td><strong>{key}</strong>{key === series ? "（本系列）" : ""}</td><td>{QUICK_CONNECT_SERIES[key].bore}</td><td>{QUICK_CONNECT_SERIES[key].tubeRange}</td><td>{key === "Q60" ? "PP" : "POM / PP"}</td><td>{key === "Q60" ? "4.2 bar" : "8.3 bar"}</td>
      </tr>)}</tbody>
    </table></div>
    <p className="fx-muted">不同系列的公母端不能仅按接管尺寸互配。更完整的选型思路见 <Link href="/resources/technical-articles/what-is-a-quick-disconnect-fitting/">什么是快插接头</Link>。</p>
  </Section>;
}

function Installation({ g }: { g: QuickConnectGuidance }) {
  const { row: r, family, isPanel, isThread, isElbow, panelMax, series } = g;
  const matePanelMax = family.panelMax[g.isMale ? "S" : "P"];
  // The existing Q60 elbow card photos show a straight outlet. Use the exact
  // model's drawing detail here rather than repeating that image as installation evidence.
  const panelImage = isPanel && isElbow && series === "Q60"
    ? "/images/products/fittings/quick-connect-fittings/q60/" + r.foreachModel.toLowerCase() + "-panel-installation-drawing.webp"
    : r.imageCard;
  return <>
    {isPanel ? <Section id="fx-panel-install" title="穿板安装：开孔与板厚">
      <p>{r.foreachModel} 为穿板{r.gender}，面板由接头定位面与锁紧螺母夹持。先确认安装孔轮廓和实际板厚，再预留公母端插拔、按键操作及软管布置空间。</p>
      <div className="fx-panel-figures">
        <figure><a href={g.cutoutImage} target="_blank" rel="noreferrer" aria-label={"放大 " + series + " 穿板开孔图"}>
          <Image src={g.cutoutImage} width={1500} height={1500} alt={series + " " + family.cutout + "尺寸：" + family.diameter + (family.height ? "，孔高 " + family.height : "")} />
        </a><figcaption>{series} 穿板安装孔，单位 mm；点击查看大图。</figcaption></figure>
        {panelImage && <figure><a href={panelImage} target="_blank" rel="noreferrer" aria-label={"放大 " + r.foreachModel + " 穿板结构图"}>
          <Image src={panelImage} width={1500} height={1500} alt={r.foreachModel + " 穿板" + r.gender + (isElbow ? "零件图局部：穿板螺纹、锁紧螺母与 L 型出管" : "外形与锁紧螺母")} style={{ objectFit: isElbow ? "cover" : "contain" }} />
        </a><figcaption>{isElbow ? "本型号零件图局部：穿板螺纹与 L 型出管。" : "本型号穿板结构；"}具体尺寸查看下方完整 2D 图纸。</figcaption></figure>}
      </div>
      <Table wide={false} rowHeaders headers={["核对项目", "尺寸与选型说明"]} rows={[
        ["当前" + r.gender + "可夹持板厚", <Fragment key="thickness"><strong>≤{panelMax} mm</strong>，适用于本页 {r.foreachModel}；按面板实际厚度核对。</Fragment>],
        ...(matePanelMax !== null ? [["配合端也需穿板时", series + " 穿板" + g.mateRole + "的最大板厚为 " + matePanelMax + " mm，不能套用于本页" + r.gender + "。"]] : []),
        [family.height ? "安装孔圆弧直径" : "安装孔直径", family.diameter],
        ...(family.height ? [["安装孔高度", family.height + "；从圆弧顶部量至平边。"]] : []),
        ["穿板螺纹", family.thread + "，用于与配套锁紧螺母固定面板" + (series === "Q40" ? "；螺纹牙型标注、公差及螺母对边尺寸按本型号零件图确认" : "") + "。"],
        ["螺母与操作空间", "核对本型号螺母外形和工具空间；" + (isElbow ? "背面为 L 型出管，需留出弯头侧向及软管弯曲空间。" : "背面留出软管安装和弯曲空间。")],
      ]} />
      <h3>安装与布置顺序</h3>
      <ul>
        <li><strong>先开孔、核对板厚：</strong>{family.height ? "按图保留 D 形孔的平边，不要只加工圆孔；" : "按圆孔尺寸加工；"}开孔后清除毛刺，分别核对公母端的板厚限值。</li>
        <li><strong>再穿板固定：</strong>将接头与孔形对正，穿入面板后装上配套螺母，确认定位面与螺母夹持牢固。</li>
        <li><strong>最后核对操作空间：</strong>对接方向留出插拔行程，母端按键旁留出手指空间，面板背面留出螺母工具及软管空间，避免扭转软管。</li>
      </ul>
      <p className="fx-muted">板厚表示螺母可夹持的面板厚度，不是相邻安装孔的中心距，也不是两块面板之间的距离。多个接口并排布置时，结合完整接头、配合端及操作空间确定孔距；加工前核对完整零件图。</p>
      <ul className="fx-links"><li><DrawingLink g={g} /></li></ul>
    </Section> : <Section id="fx-connection-install" title={isThread ? "螺纹端安装与空间" : "软管连接与布管"}>
      <p>本型号为非穿板{r.gender}，管路端连接{describeQuickConnectInterface(r)}。{isThread ? "它直接连接设备螺纹口，管路螺纹不能当作穿板固定螺纹。" : "适合管路中间的可拆连接，无需面板开孔。"}</p>
      <Table wide={false} headers={["核对项目", "安装与选型说明"]} rows={[
        [isThread ? "匹配设备接口" : "选择软管", isThread ? r.tubeOrThread + " 外螺纹需配相应 NPT 内螺纹；核对牙型、规格及旋入深度，不以“能旋入”判断兼容。" : "按 " + r.tubeOrThread + " 内径选择软管，同时核对壁厚、材料和夹持力；管内径不是倒刺外径。"],
        [isThread ? "固定与密封" : "插管与固定", isThread ? "在规定的扳手受力位置安装，按接口与介质要求采用适用的螺纹密封方式；避免密封材料进入流道，不用解锁按键或倒刺承受拧紧力。" : "软管端面切齐，沿倒刺轴线装至规定位置；按软管和工况确认是否需要夹持件，装好后检查抗拔与密封。"],
        ["布管与操作空间", isElbow ? "L 型接管方向与插拔轴线成 90°。先确定弯头朝向，再布置软管，避免管路拉力压住按键或使接头侧向受力。" : "直通型需同时留出前方插拔空间和后方管路空间，避免软管在倒刺根部急弯。"],
        ["需要面板固定时", g.isMale ? "可与同系列穿板母端组合，按母端的开孔和板厚要求安装。" : "应改选同系列穿板母端型号，不能用本型号代替面板夹紧结构。"],
      ]} />
      <ul className="fx-links"><li><DrawingLink g={g} /></li></ul>
    </Section>}
    <Section id="fx-install" title="安装与使用注意事项">
      <div className="fx-callout"><p><strong>不要带压插拔。</strong>{g.isValved ? "带阀的作用是断开后封闭本端流路，不代表适合带压插拔。" : "本型号不带阀，断开后本侧保持敞开，需先隔离或排空液体。"}连接或断开前停流并释放残余压力。</p></div>
      <ul>
        <li>{isPanel ? "本型号的安装孔和板厚限值见上方「穿板安装：开孔与板厚」；固定后检查螺母夹持及接头定位。" : isThread ? "设备螺纹按上方要求安装；固定后检查螺纹连接处的密封。" : "软管连接按上方要求安装，避免在倒刺根部急弯，并检查抗拔与密封。"}</li>
        <li>{g.isMale ? "解锁按键位于配套母端上" : "本型号通过母端按键解锁"}；安装位置要留出按键操作、插入拔出和管路弯曲空间。</li>
        <li>插合前检查公端密封圈、母端插口和锁定部位，保持清洁、无损伤；沿轴线对正插入。</li>
        <li>断开时可能有残液，重新插合时可能带入空气；对此敏感的流路，应在实际工况下评估。</li>
        <li>插合后确认锁定，再通液检查密封与流量；不能只凭锁定声判断连接已密封。</li>
      </ul>
      <ul className="fx-links"><li><Link href="/resources/installation-guide/">安装指南</Link></li></ul>
    </Section>
  </>;
}

function SelectionContent({ g }: { g: QuickConnectGuidance }) {
  const { row: r, series, family, isMale, isValved, isPanel, isThread, isElbow, mateRole } = g;
  const materials = materialRows(series);
  const tubes = [...new Map(getQuickConnectFamilyRows(series).filter(row => !/NPT/.test(row.tubeOrThread)).map(row => [row.tubeCode, row.tubeOrThread])).values()];
  const features = [
    ["插入锁定，按键解锁", isMale ? "与 " + series + " 母端插合到位后锁定，断开时操作母端按键，便于拆装仪器液路。" : "接收 " + series + " 公端并锁定，通过本体按键解锁，便于拆卸管路或更换液路模块。"],
    [isValved ? "断开后本端自动关闭" : "本端不带阀，断开保持敞开", isValved ? "本型号" + r.gender + "侧带阀，减少断开后的持续出液；需要两侧都关闭时，" + mateRole + "也选带阀型。" : "适合本侧允许敞开或已有外部阀门隔离的液路；需要本端自动关闭时选 V 型。"],
    [isPanel ? "可穿板安装" : isThread ? "螺纹接口，连接设备端口" : "非穿板，管路中间连接", isPanel ? "用配套锁紧螺母固定在面板上，作为设备液路接口。本型号允许板厚 ≤" + g.panelMax + " mm。" : isThread ? r.tubeOrThread + " 外螺纹连接设备接口，将固定端口转换为可拆接点；安装前核对设备内螺纹。" : "连接 " + r.tubeOrThread + " 内径软管，无需面板开孔。" + (isElbow ? "L 型便于侧向出管，需核对弯头朝向。" : "直通型沿轴向布管，预留前后安装空间。")],
    ["同系列互配，两端接口可不同", "当前端连接" + describeQuickConnectInterface(r) + "，配套 " + series + " " + mateRole + "可按另一侧软管内径或设备螺纹分别选择。"],
    [(series === "Q60" ? "4.2" : "8.3") + " bar 工作压力", r.housingMaterial + " 外壳 + " + r.sealingRingMaterial + " 密封圈配置的参考工作压力为 " + g.pressure + "，使用时同时核对介质和温度。"],
    ["整机可统一用一个系列", series === "Q60" ? "Q60 提供 PP/EPDM 公母端、带阀与不带阀配置，母端可选穿板及 L 型；按已有型号组合接口。" : series + " 可按公母端、阀门、安装方式和材料配置统一设备接口；具体组合以已有型号为准。"],
  ];
  const curve = "/images/resources/technical-articles/instrument-fluidics/" + series.toLowerCase() + "-catalog-flow-curves.webp";
  return <>
    <Section id="fx-features" title="特性与优势"><div className="fx-grid">{features.map(([title, text]) => <div className="fx-card" key={title}><h3>{title}</h3><p>{text}</p></div>)}</div></Section>
    <Section id="fx-conditions" title={series + " 系列参数"}>
      <Table rows={[
        ["工作压力", g.pressure],
        ["工作温度", materials.map((row, i) => <Fragment key={row.housingCode}>{i > 0 && <br />}{row.housingMaterial} 外壳 + {row.sealingRingMaterial} 密封圈：{temperature(row)}</Fragment>)],
        ["通径", family.bore], ["接管内径", tubes.join(" / ")],
        ["插拔方式", "插入锁定，按键解锁"],
        ...(isThread ? [["本型号管路接口", r.tubeOrThread + " 外螺纹，不按软管内径选用"]] : []),
      ]} />
      <p className="fx-muted">以上为标准配置下的参考值，实际可用压力和温度取决于流体、密封材料及使用工况；不能直接将两个上限组合为允许工况。带阀不代表适合带压插拔，详见 <Link href="/resources/technical-articles/quick-disconnect-coupling-pressure-rating/">快插接头能承受多大压力</Link>。</p>
    </Section>
    <ModelCode g={g} />
    <Pairing g={g} />
    <Section id="fx-flow" title="流量与压降">
      <p>快插接头会给流路带来压降。选型时，按目标流量和对应接管规格读取下方 {series} 曲线，评估连接处的压力损失。本型号{isThread ? "使用 " + r.tubeOrThread + " 螺纹接口，螺纹公称尺寸不是流道直径" : "适配 " + r.tubeOrThread + " 内径软管"}。</p>
      <figure className="fx-curve">
        <a href={curve} target="_blank" rel="noreferrer"><Image src={curve} alt={series + " 快插接头流量—压降曲线"} width={835} height={family.curveHeight} /></a>
        <figcaption>{series} 系列流量—压降参考曲线。气体使用 Nm³/min，液体使用 L/min；压降单位为 bar。点击放大。</figcaption>
      </figure>
      <p className="fx-muted">{isElbow ? "本型号为 L 型，转向结构、阀门和配合端共同影响流阻。" : "公母端组合、阀门和两侧管路共同影响流阻。"}没有对应配置曲线时，以整组连接实测校核。曲线读数与计算见 <Link href="/resources/technical-articles/quick-disconnect-coupling-flow-pressure-drop/">快插接头流量怎么算</Link>；整条流路可用 <Link href="/resources/calculators/fluid-resistance/">流阻计算器</Link> 估算。</p>
    </Section>
    <Section id="fx-materials" title="材质与耐化学性">
      <Table headers={["材质组合", "外壳材质", "密封圈材质", "工作温度"]} rows={materials.map(row => [
        [...new Set(getQuickConnectFamilyRows(series).filter(item => item.housingCode === row.housingCode && item.sealingCode === row.sealingCode).map(item => item.shapeCode + item.housingCode + item.sealingCode))].join(" / "),
        row.housingMaterial, row.sealingRingMaterial, temperature(row),
      ])} />
      <p>本型号采用 {r.housingMaterial} 外壳与 {r.sealingRingMaterial} 密封圈。材料是否适用，需结合介质成分、浓度、温度、压力及清洗要求判断；公母端和软管的接液材料要一并核对。需要其他材料组合时，可在选型清单中备注工况确认。</p>
      <ul className="fx-links"><li><Link href="/resources/material-compatibility/">材料兼容性</Link></li><li><Link href="/resources/technical-articles/fitting-material-selection-guide/">接头材质怎么选</Link></li></ul>
    </Section>
    <Choosing g={g} />
    <Installation g={g} />
  </>;
}

export default function QuickConnectModelZhContent({ model, section }: { model: string; section: "product" | "selection" }) {
  const g = getQuickConnectModelGuidance(model);
  if (!g) return null;
  return <div className={styles.detail + " " + modelStyles.content} data-section={section} data-quick-connect-model={g.row.foreachModel}>
    {section === "product" ? <ProductContent g={g} /> : <SelectionContent g={g} />}
  </div>;
}

// Pure server content: resolve the same Chinese template before translating its presentation.
registerFittingDetail(Section, Table, DrawingLink, ProductContent, ModelCode, Pairing, Choosing, Installation, SelectionContent, QuickConnectModelZhContent);
