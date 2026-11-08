import { registerFittingDetail, registerFittingDetailDiagram } from "./fitting-detail-view";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getThreadBarbSelection, THREAD_BARB_MATERIALS, type ThreadBarbIdentity } from "@/data/products/detail/thread-to-barbed-selection.zh";
import { BarbRatioComparison } from "@/components/resources/technical-articles/articles/BarbedExpansionDiagram";
import styles from "./ThreadToBarbedSelectionContent.module.css";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <div className="fx-sec" id={id}><h2>{title}</h2>{children}</div>;
}
function Table({ headers, rows, model = false }: { headers: string[]; rows: ReactNode[][]; model?: boolean }) {
  return <div className="fx-tw"><table className={model ? styles.modelTable : styles.table}>
    <colgroup><col style={{ width: model ? "16%" : "30%" }} />{headers.slice(1).map((_, i) => <col key={i} />)}</colgroup>
    <thead><tr>{headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead>
    <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
  </table></div>;
}
const decimal = (value: number, digits = 1) => Number(value.toFixed(digits)).toString();

export default function ThreadToBarbedSelectionContent({ data }: { data: ThreadBarbIdentity }) {
  const current = getThreadBarbSelection(data);
  if (!current) return null;
  const { model, family, config, thread, threadLabel, tubeCode, sizeCode, profile, material, color,
    tubeId, currentMaterial, seal, sealCopy, features, modelRows, torque, crest, crestSource } = current;
  const modelParts = [[family, "系列"], [thread, "螺纹规格"], [tubeCode, "内径／轮廓"], [material, "主体材质"], [color, "颜色"]];
  const sealInstructions = seal === "thread" ? <>
    <p><strong>{model} 采用螺纹密封，需要辅助密封。</strong>选用 PTFE 生料带或与工作液、清洗液及接头塑料兼容的螺纹密封胶，不在倒刺端随意涂胶。</p>
    <ul><li>生料带的缠绕方向与螺纹旋入方向一致，避免带屑进入流道；用量按端口配合和装配工艺确定。</li>
      <li>选择密封胶时核对塑料适用性、介质相容性及固化条件，达到规定条件后再通液。</li>
      <li>先手动对正旋入，再用匹配工具锁紧；{family === "SAL" ? "L 型出管方向不能靠锁紧后反向松退来调整，应同时满足方向和密封要求。" : "出现偏斜或异常阻力时停止，重新核对螺纹与端口。"}</li></ul>
  </> : seal === "face" ? <>
    <p><strong>{model} 采用底面密封，不需要生料带或螺纹密封胶。</strong>螺纹负责施加压紧力，真正需要贴合的是接头底面与端口密封面。</p>
    <ul><li>同时核对螺纹、端口深度和底面位置，防止螺纹先顶死而密封面未压合。</li><li>清除颗粒、碎屑并检查划伤，不用增加扭矩掩盖密封面损伤。</li><li>固定设备侧端口，工具施力于指定旋拧部位，避免管路承受锁紧扭力。</li></ul>
  </> : seal === "oring" ? <>
    <p><strong>{model} 为带 O 圈配置。</strong>按配套端口结构检查 O 圈安装位置、材质及压紧面，防止夹伤或漏装。</p>
    <ul><li>确认 O 圈与工作液、清洗液兼容，按该配置的扭矩要求锁紧。</li><li>不要用缠绕更多生料带替代 O 圈密封，也不要套用其他 SA 螺纹规格的扭矩。</li></ul>
  </> : <>
    <p><strong>SC 内螺纹侧需要配套硬管接头和管端组件。</strong>硬管接头的螺纹应为 {threadLabel}，同时核对管端密封结构与 SC 内部端面；倒刺侧单独选择 {tubeId.toFixed(1)} mm 内径软管。</p>
    <ul><li>采用翻边接头时，核对翻边管端及配套垫片；采用卡箍接头时，核对该系列卡箍及其安装位置。</li><li>按所选硬管接头的密封方式装配，不因 SC 有内螺纹就默认缠生料带。</li><li>硬管外径与本页软管内径是两套尺寸，应分别选择，并检查中间流道和安装空间。</li></ul>
  </>;

  return <>
    <Section id="fx-features" title="特性与优势">
      <div className="fx-grid" data-thread-barb-selection={family}>{features.map(([title, body]) => <div className="fx-card" key={title}><h3>{title}</h3><p>{body}</p></div>)}</div>
    </Section>

    <Section id="fx-pn" title="型号说明">
      <p>{family} 型号按以下代码段识别，以 {model} 为例。螺纹决定设备端配合，管径代码对应软管内径，后续代码说明倒刺轮廓、材料与颜色。</p>
      <div className={`fx-pn ${styles.modelCode}`} aria-label={`${model} 型号编码拆解`}>
        {modelParts.map(([code, label], i) => <span className={styles.modelPart} key={label}>
          {i > 0 ? <span className={styles.separator} aria-hidden="true">-</span> : null}
          <span className={`fx-seg ${styles.segment}`}><b className={code.length > 4 ? styles.longCode : undefined}>{code}</b><small>{label}</small></span>
        </span>)}
      </div>
      <Table headers={["代码段", "代码"]} rows={modelRows} model />
      <p className="fx-muted">本型号 {sizeCode} 表示 {tubeId.toFixed(1)} mm 软管内径{profile ? `，${profile} 为倒刺轮廓代码` : ""}，不表示管外径或接头流道孔径。各螺纹、管径、轮廓与材料并非任意组合，按完整型号选配。{current.colorPart !== color ? `本型号附加配置：${current.colorPart.slice(1)}。` : ""}</p>
      {thread === "X32" ? <p className="fx-muted">X32 是特殊螺纹代码，不等同于 U32（10-32 UNF），也不代表 X 型倒刺。配合端应按确认图纸核对，不仅凭代码中的“32”判断互换。</p> : null}
    </Section>

    <Section id="fx-sealing" title="螺纹配合与辅助密封">
      {sealInstructions}
      <Table headers={["结构", "连接与安装区别"]} rows={[
        ["SA / SAL：螺纹密封", "常规螺纹密封配置采用生料带或兼容螺纹密封胶；带 O 圈的特定配置按其密封圈与端口结构装配。"],
        ["SB / SBS / SBR：底面密封", "平底密封面接触压紧，不使用生料带或螺纹密封胶；螺纹相同仍需核对密封面与端口深度。"],
        ["SC：内螺纹承接端", "配合硬管接头及管端组件，按硬管端的密封结构装配；软管端仍通过倒刺连接。"],
      ]} />
      <p className="fx-muted">同为 1/4-28 UNF 或 M6 螺纹，不代表不同密封结构可以直接互换。选型时应同时确认螺纹、端面位置、有效旋合长度与工具空间。</p>
    </Section>

    <Section id="fx-expansion" title="倒刺轮廓与软管膨胀比">
      <p>软管插入时需要越过倒刺峰，再贴合倒刺后的管杆。先用软管<strong>未装配内径 d</strong>与<strong>倒刺最大外径 Dᵦ</strong>比较几何配合，再结合壁厚、硬度与回弹检查装配效果。</p>
      <div className={`fx-callout ${styles.formula}`}>
        <p><strong>直径比 λ = Dᵦ ÷ d</strong></p>
        <p><strong>膨胀百分比 ε =（Dᵦ − d）÷ d × 100%</strong></p>
        <p>例如 λ = 1.25，对应膨胀 25%。Dᵦ 应读倒刺峰径，不能用接头流道孔径代入。</p>
      </div>
      {crest ? <>
        <Table headers={["本型号计算项", "名义尺寸与结果"]} rows={[
          ["型号", model],
          ["软管未装配内径 d", `${tubeId.toFixed(1)} mm`],
          ["倒刺峰径 Dᵦ", `${crest.toFixed(1)} mm（${crestSource}）`],
          ["直径比 λ", `${crest.toFixed(1)} ÷ ${tubeId.toFixed(1)} ≈ ${decimal(crest / tubeId, 3)}`],
          ["膨胀百分比 ε", `（${crest.toFixed(1)} − ${tubeId.toFixed(1)}）÷ ${tubeId.toFixed(1)} × 100% ≈ ${decimal((crest / tubeId - 1) * 100)}%`],
        ]} />
        <p className="fx-muted">上述结果按名义尺寸计算。实际软管内径公差、材料状态与倒刺尺寸会改变配合，不代表该连接已达到某一压力或抗拔额定值。</p>
      </> : <p>本型号按 {tubeId.toFixed(1)} mm 软管内径选配；计算时从确认后的本型号零件图读取倒刺峰径。相同管径代码的其他接头不能代替本型号峰径，下方示例仅用于说明计算方法。</p>}
      <h3>同为 3.2 mm 内径软管，倒刺峰径也可能不同</h3>
      <div className={styles.comparison}>
        {(["F", "D"] as const).map(p => <figure className={styles.ratioFigure} key={p}>
          <h3>{p === "F" ? "SA-U32-32F" : "SA-U28-32D"}</h3>
          <p>{p} 型倒刺 · 3.2 mm 软管内径</p>
          <BarbRatioComparison profile={p} />
          <figcaption>{p === "F" ? "峰径 4.0 mm，名义膨胀 25%" : "峰径 4.5 mm，名义膨胀约 40.6%"}</figcaption>
        </figure>)}
      </div>
      <p className="fx-muted">上图为手册倒刺轮廓与尺寸计算示意，两款接头的螺纹也不同；只用于比较软管端配合，不能据此互换设备端接口。</p>
      <ul><li><strong>膨胀越大不等于越可靠：</strong>插入力过大或管口发白、开裂时，需重新核对峰径、管内径、壁厚和材料硬度。</li><li><strong>材料与壁厚一起选：</strong>硅胶、TPU、TPE、PU、PVC 等弹性管材均需按具体牌号与尺寸试装；硬质管材不能仅因内径相同就直接套用。</li><li><strong>按实际工况验证：</strong>检查装配后的密封、抗拔、弯折与长期使用状态；需要卡箍等额外固定时，与软管外径和倒刺结构一并确定。</li></ul>
      <ul className="fx-links"><li><Link href="/resources/technical-articles/barbed-fitting-expansion-ratio/">倒刺接头的膨胀比怎么计算</Link></li></ul>
    </Section>

    <Section id="fx-materials" title="材料说明与软管搭配">
      <p>本型号本体为 <strong>{currentMaterial?.name || material}</strong>。本体、软管、辅助密封材料及可能配置的 O 圈需要分别核对，不能仅凭接头本体材质确定整条液路的耐介质能力。</p>
      <Table headers={["本系列本体材料", "特性与选型重点"]} rows={config.materials.map(code => [
        `${THREAD_BARB_MATERIALS[code].name}${code === material ? "（本型号）" : ""}`, THREAD_BARB_MATERIALS[code].use,
      ])} />
      <h3>软管与辅助材料一起确认</h3>
      <ul><li>按软管内径选择倒刺，再按壁厚、硬度、柔韧性和弯曲空间评估插入与夹持。</li><li>核对工作液和清洗液的成分、浓度、温度及接触时间；循环清洗或长期浸泡后仍要检查软管老化与松动。</li><li>{seal === "thread" ? "螺纹密封胶还需确认对本体塑料的适用性与固化工艺；PTFE 生料带也要避免碎屑进入流道。" : seal === "mating" ? "SC 配套的硬管、翻边或卡箍等接液部件，应与软管和 SC 本体共同评估材料兼容性。" : "底面或 O 圈密封结构按其配套组件评估，不额外叠加未经确认的密封胶或垫片。"}</li></ul>
      <ul className="fx-links"><li><Link href="/resources/material-compatibility/">材料兼容性</Link></li><li><Link href="/resources/technical-articles/fitting-material-selection-guide/">接头材质怎么选</Link></li></ul>
    </Section>

    <Section id="fx-tools" title="配套扭力批与锁紧扭矩">
      <div className={styles.toolRow}><div>
        <h3>T-ST 可调扭力批</h3>
        <p>FOREACH 提供 T-ST 扭力批，商品编码 <strong>956002</strong>，调节范围为 <strong>5–60 cN·m（0.05–0.60 N·m）</strong>。配合匹配的扭力批批头，可在适用量程内控制接头锁紧扭矩，便于小型接头的装配与维护。</p>
        <p>批头需要同时匹配接头的旋拧外形与工具接口。批头能套入不等于该扭矩适合接头；先确定装配要求，再设定工具。</p>
      </div><figure className={styles.toolFigure}>
        <Image src="/images/products/fittings/thread-to-barbed-fittings/details-zh/t-st-torque-driver.webp" alt="FOREACH T-ST 可调扭力批，商品编码 956002" width={1500} height={1500} loading="lazy" />
        <figcaption>T-ST 扭力批 · 手册实物图，批头按接头另行选配</figcaption>
      </figure></div>
      <Table headers={["工具 / 批头", "用途与选配"]} rows={[
        ["956002 · T-ST 扭力批", "可调范围 0.05–0.60 N·m，搭配扭力批批头使用；不能直接混用电批批头。"],
        ...(family === "SBR" ? [["959006 · SBR 扭力批批头", "手册列出的 SBR 可旋转接头配套扭力批批头，与 T-ST 配合使用。"], ["959005 · SBR 电批批头", "用于匹配的电批，不作为 T-ST 扭力批批头使用。"]] : family === "SB" ? [["959003 · SB 电批批头", "手册列为 SB 螺纹转倒刺接头的电批批头。选择电批时按装配工艺控制扭矩，不与 T-ST 扭力批批头混用。"]] : [["本型号批头匹配", family === "SC" ? "按配套硬管接头选择批头；装配时支承 SC 本体，避免软管随锁紧操作扭转。" : "按本型号旋拧部位的形状、尺寸及工具接口选择批头；不可直接套用其他系列的批头编码。"]]),
      ]} />
      <h3>本型号锁紧要求</h3>
      <div className="fx-callout"><p>{torque}</p></div>
      <p className="fx-muted">扭力批的量程不是接头的扭矩额定值。NPT、带 O 圈 G 螺纹及特殊螺纹应按各自配置确认；超出工具量程时换用合适工具，不加长力臂强行锁紧。</p>
    </Section>

    <Section id="fx-install" title="安装与使用步骤">
      <Table headers={["步骤", "操作要点"]} rows={[
        ["1. 核对接口与密封", `确认 ${threadLabel} 配合端、端口深度、密封面和管路空间。${sealCopy[1]}`],
        ["2. 切管与清洁", "使用适合软管的切管工具，垂直切平管口，清除碎屑；检查倒刺是否损伤、软管是否开裂或变硬。"],
        ["3. 安装螺纹端", seal === "mating" ? "支承 SC 本体，按配套硬管接头的说明安装管端组件并锁紧，避免对软管施加扭力。" : `手动对正旋入后，用匹配工具按规定扭矩锁紧。${family === "SAL" ? "同时安排 L 型出管方向，不靠反向松退调整。" : "不要夹持倒刺或拉扯软管来旋紧本体。"}`],
        ["4. 轴向套入软管", "固定接头本体，将软管沿倒刺轴向推入规定位置，确保越过倒刺峰并充分贴合。避免斜插和反复拔插，不用尖锐工具撑伤管口。"],
        ["5. 确认是否需装配辅助", "插入力较大时先复核尺寸、壁厚与硬度，再确定支承夹具或专用插管辅助工艺。润滑、加热或粘接需事先验证材料与洁净度要求，不作为所有型号的默认步骤。"],
        ["6. 检查与维护", "按实际工况检查泄漏、松动、抗拔和管路弯折；需要额外卡箍时确认夹持位置与压力，避免损伤软管。拆装前停机泄压，老化或反复拆装受损的软管及时更换。"],
      ]} />
      <ul className="fx-links"><li><Link href="/resources/technical-articles/threaded-hose-barb-fittings-selection-guide/">螺纹转倒刺接头选型说明</Link></li><li><Link href="/products/fittings/thread-to-barbed-fittings/">查看螺纹转倒刺接头型号</Link></li></ul>
    </Section>
  </>;
}

// Pure server content: resolve the same Chinese template before translating its presentation.
registerFittingDetail(Section, Table, ThreadToBarbedSelectionContent);
registerFittingDetailDiagram(BarbRatioComparison);
