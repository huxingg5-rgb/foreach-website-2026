import Link from "next/link";
import type { ReactNode } from "react";

import { pvcTubingVariants } from "@/data/products/configurator/pvc-tubing";
import { pvcPressurePullOffCopy } from "@/data/resources/technical-articles/pvc-tubing-pressure-rating-pull-off-force.zh";
import { TubingManufacturingContent } from "./TubingContentPhotos";
import { TubingConnectionPhotos, TubingMaterialPhoto } from "./TubingSelectionVisuals";
import base from "./EaPumpDetailContent.module.css";
import guide from "./EaPumpSelectionContent.module.css";
import styles from "./PvcTubingDetailContent.module.css";
import { tubingView } from "./tubing-view";
import { tubingHtmlLocale, tubingText } from "@/data/products/tubing/detail-locales";


const variants = pvcTubingVariants.map(variant => ({
  model: variant.model,
  code: variant.productCode,
  hardness: String(variant.attributes.hardness),
  inner: Number(variant.attributes.innerDiameter),
  outer: Number(variant.attributes.outerDiameter),
  packaging: String(variant.result?.packaging || "按订单确认"),
}));
const sizeExamples = variants.filter(variant => variant.inner === 1.6 && [3.2, 4.8].includes(variant.outer));
const dimensions = (variant: (typeof variants)[number]) => variant.inner.toFixed(1) + " × " + variant.outer.toFixed(1) + " mm";
// Reuse the published test table so these values have one maintained source.
const pressureTestRows = pvcPressurePullOffCopy.sections
  .flatMap(section => section.blocks)
  .flatMap(block => block.type === "table" ? block.rows : [])
  .filter(row => ["M3602002／55A", "E3602002／65A"].includes(String(row[0])));

const guideSections = [
  { id: "features", title: "PVC 管适合我的液路，还是应换一种管材？", label: "先判断是否适合 PVC" },
  { id: "hardness", title: "55A 和 65A 怎么选，硬一点就更耐用吗？", label: "比较硬度与布管" },
  { id: "sizes", title: "内径、外径和壁厚怎么选，管径越大越好吗？", label: "确定管径与充液量" },
  { id: "connections", title: "现有宝塔或快插接头，怎样配 PVC 软管？", label: "匹配现有接头" },
  { id: "conditions", title: "PVC 管能承受多大压力，吸液时会不会吸瘪？", label: "判断压力与负压" },
  { id: "materials", title: "我的试剂和清洗液，会不会损伤管材或影响检测？", label: "核对介质与清洗" },
  { id: "pump-tube", title: "PVC 连接管能放进蠕动泵头，或直接热灭菌吗？", label: "区分泵管与特殊处理" },
  { id: "installation", title: "PVC 管怎么裁切、连接和布管，首次装机检查什么？", label: "完成安装与试运行" },
  { id: "troubleshooting", title: "流量下降、持续气泡、发白或脱管，先查哪里？", label: "按异常现象排查" },
  { id: "maintenance", title: "什么时候换管，替换旧管和批量采购要保留哪些信息？", label: "更换、替代与采购" },
  { id: "manufacturing", title: "对洁净度与尺寸一致性有要求，选管时看什么？", label: "洁净生产与尺寸检查" },
] as const;
type GuideId = (typeof guideSections)[number]["id"];

function Section({ id, number, title, children, group = "guide" }: {
  id: string; number: number; title: string; children: ReactNode; group?: "guide" | "product";
}) {
  return <section className={guide.section} id={"pvc-" + group + "-" + id}>
    <h2><span className={base.number}>{String(number).padStart(2, "0")}</span>{title}</h2>
    {children}
  </section>;
}

function GuideSection({ id, children, locale = "zh" }: { id: GuideId; children: ReactNode; locale?: string }) {
  const index = guideSections.findIndex(section => section.id === id);
  return <Section id={id} number={index + 1} title={tubingText(guideSections[index].title, locale)}>{children}</Section>;
}

function Table({ label, headers, rows }: { label: string; headers: string[]; rows: readonly (readonly ReactNode[])[] }) {
  return <div className={base.tableWrap} role="region" aria-label={label} tabIndex={0}>
    <table className={guide.table + " " + styles.table}>
      <thead><tr>{headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
      <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, column) => column === 0
        ? <th key={column} scope="row">{cell}</th>
        : <td key={column}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

function TubeSectionDrawing({ variant, locale = "zh" }: { variant: (typeof variants)[number]; locale?: string }) {
  const outerRadius = variant.outer * 11;
  const innerRadius = variant.inner * 11;
  return tubingView(<figure className={styles.dimensionFigure}>
    <svg viewBox="0 0 180 155" role="img" aria-label={dimensions(variant) + " PVC 管截面，内径相同，外径决定壁厚"}>
      <circle cx="90" cy="68" r={outerRadius} fill="#dcefe9" stroke="#173368" strokeWidth="1.5" />
      <circle cx="90" cy="68" r={innerRadius} fill="white" stroke="#173368" strokeWidth="1.5" />
      <path d={"M " + (90 - innerRadius) + " 68 H " + (90 + innerRadius)} stroke="#173368" />
      <text x="90" y="63" textAnchor="middle">ID {variant.inner.toFixed(1)}</text>
      <path d={"M " + (90 - outerRadius) + " 133 H " + (90 + outerRadius) +
        " M " + (90 - outerRadius) + " 127 V 139 M " + (90 + outerRadius) + " 127 V 139"} stroke="#173368" />
      <text x="90" y="151" textAnchor="middle">OD {variant.outer.toFixed(1)} mm</text>
    </svg>
    <figcaption><strong>{dimensions(variant)}（内径 × 外径）</strong><br />
      名义壁厚 {((variant.outer - variant.inner) / 2).toFixed(2)} mm
    </figcaption>
  </figure>, locale);
}

export function PvcTubingSelectionContent({ locale = "zh" }: { locale?: string } = {}) {
  return tubingView(<div className={base.content + " " + guide.guide + " " + styles.content} lang={tubingHtmlLocale(locale)} data-pvc-content="selection">
    <GuideSection locale={locale} id="features">
      <p><strong>需要透明观察、柔性走线和仪器内部连接时，可以先评估 PVC；接液要求决定它能否进入最终方案。</strong>清洗供液、排液和泵前后连接是不同位置，工作液、温度和受力也应分别列出。</p>
      <TubingMaterialPhoto material="pvc" locale={locale} />
      <Table label="按实际液路要求选择管材方向" headers={["你的主要要求", "选型方向", "为什么"]} rows={[
        ["常规气液连接、透明观察、柔性布管", "从所需尺寸的 PVC 管开始试装，同时核对接液条件。", "可以直接观察充液和可见气泡，软管便于连接与转弯。"],
        ["接触有机溶剂、较高温度或对析出很敏感", "先完成材料初筛，必要时比较 FEP、PTFE、PFA 等候选材料。", "PVC 配方影响接液表现，单凭外观或硬度无法判断化学适用性。"],
        ["反复运动、摩擦或泵头挤压", "把运动连接段、泵前后连接段和专用泵管分别选型。", "运动磨损与反复压扁回弹，需要考察不同于静态连接的性能。"],
      ]} />
      <p>替换原有硅胶、TPU 或进口 PVC 管时，先查原管完整料号和尺寸，再比较装配、流量与接液表现。相同颜色和名义管径，只能作为找样线索。</p>
      <div className={guide.links}><Link href="/products/tubing/">比较其他仪器管材</Link></div>
    </GuideSection>

    <GuideSection locale={locale} id="hardness">
      <p><strong>55A 更柔软，适合优先比较套装与柔性走线；65A 相对挺括，适合优先比较管身支撑与固定。</strong>两种硬度都要与壁厚一起选，不能仅凭硬度高低判断耐压或使用寿命。</p>
      <Table label="按装配和布管需求比较 PVC 硬度" headers={["现场情况", "可先比较的方案", "试装时怎样判断"]} rows={[
        ["转弯多、安装空间紧、倒刺套装较费力", "从 55A 方案开始，与同尺寸 65A 比较。", "观察转弯处是否缩径，管口是否无损装到位，以及拆装时是否牵扯接口。"],
        ["管身需要较强支撑，吸液时容易变形", "把 65A 与可选厚壁组合纳入比较。", "在实际负压和最高使用温度下观察管腔，排除固定点夹扁和过急转弯。"],
        ["接头处难以装入，或用力套入后发白", "先复核内径、倒刺峰部、壁厚与导入轮廓。", "切下检查损伤管口，重新选配；不靠强行拉伸或随意加热修正配合。"],
      ]} />
      <p>同一根管子在直线、急弯和扎带夹持位置的表现可能不同。比较样管时，使用同一接头和实际走线路径，才能区分硬度、壁厚及安装方式的影响。</p>
    </GuideSection>

    <GuideSection locale={locale} id="sizes">
      <p><strong>先用流量、液体黏度、管长与可用压差筛内径，再用接头、弯曲空间和受力条件选外径及壁厚。</strong>较大内径通常有利于降低相同条件下的直管流阻，同时增加充液和置换体积；小流量、昂贵试剂或频繁换液管路应同时考虑这两项。</p>
      <p>名义壁厚 =（外径 − 内径）÷ 2。下面两种已列配置的内径均为 1.6 mm，外径分别为 3.2 mm 和 4.8 mm；增加的是管壁，管内的几何通流面积并未增加。</p>
      <div className={styles.dimensionGrid}>{sizeExamples.filter(variant => variant.hardness === "55A").map(variant => <TubeSectionDrawing key={variant.code} variant={variant} locale={locale} />)}</div>
      <Table label="不同内径一米直管的理论容积" headers={["名义内径", "1 m 直管的理论容积", "选型时怎样用"]} rows={[1.6, 2.4, 3.2].map(inner => [
        inner.toFixed(1) + " mm", (Math.PI * inner * inner / 4).toFixed(2) + " mL",
        "用于估算充液、换液和残留体积，另计接头、阀与其他流道。",
      ])} />
      <p className={guide.note}>容积按圆形、未变形管腔计算：V = π × 内径² × 长度 ÷ 4。上表使用 mm 与 1 m 管长换算为 mL，属于几何算例；实际管径公差、软管变形和器件流道会改变整条管路容积。</p>
      <p>若当前流量不足，先检查管长、弯折、滤器和接头内孔，再决定是否增大内径。只换一段更粗的管子，而最窄接头或堵塞位置未变，效果可能有限。</p>
      <div className={guide.links}><Link href="/resources/calculators/fluid-resistance/">估算管径、管长与压降</Link></div>
    </GuideSection>

    <GuideSection locale={locale} id="connections">
      <p><strong>先问清“接头上的尺寸指内径还是外径”。</strong>例如“3.2 mm 接头”可能指适配 3.2 mm 内径的倒刺端，也可能指夹持 3.2 mm 外径的插入端，两者对应的软管规格不同。</p>
      <Table label="PVC 管的不同连接尺寸基准" headers={["连接结构", "先按什么尺寸找管", "还要检查什么"]} rows={[
        ["宝塔／倒刺端", "按接头标注的适配软管内径筛选。", "倒刺实际峰径与轮廓、有效插入长度，以及软管壁厚、硬度和固定方式。"],
        ["带倒刺接管端的快速插拔接头", "软管端仍按适配内径筛选。", "快速插拔是接头之间的连接动作，软管套接端仍需独立核对。"],
        ["直接夹持管外径的插入端", "按接头规定的管外径、公差和支持的管材筛选。", "软管是否得到可靠支撑，锁止后是否变形，以及是否要求支撑内衬。"],
      ]} />
      <p>倒刺峰部通常会使软管产生装配扩张，因此测得的峰径与接头标注的适配内径不是同一个数。配合过松会降低保持，过紧或导入不良又可能损伤管口；应通过完整型号或端部图核对。</p>
      <TubingConnectionPhotos material="pvc" locale={locale} />
      <p>频繁拆装时，可把快插位置设在接头配对端，保留已经装好的软管端。需要卡箍或其他辅助固定时，按管径和结构选择，观察夹紧后是否产生局部压伤。</p>
      <div className={guide.links}><Link href="/resources/technical-articles/barbed-fitting-expansion-ratio/">了解倒刺尺寸与软管扩张</Link><Link href="/products/fittings/barbed-fittings/">按软管内径查倒刺接头</Link></div>
      <h3 className={guide.subheading}>只买卷管，还是把接头和定长管段一起配好？</h3>
      <p>样机需要反复调整管长时，可先按卷选管并试装接头；长度和接口确定后，可提交定长裁切与端部装配需求，减少批量装机时的现场裁切和配件混用。</p>
      <p>PVC 软管按倒刺或适用的快插结构配套。提供管材完整型号、管长及公差、A/B 两端接头、插入位置、固定与标识要求，先确认样件的通流、密封和连接保持。翻边、卡环等硬管组件不能直接按材料名称相近套用。</p>
      <div className={guide.links}><Link href="/contact/">提交定长管与两端接头配套需求</Link></div>
    </GuideSection>

    <GuideSection locale={locale} id="conditions">
      <p><strong>工作压力要落实到“管材型号＋接头＋装配形式＋介质与温度”的组合。</strong>本页型号表没有给出可套用于全部组合的统一额定压力，已有指定型号的试验记录可以帮助判断和安排样件测试。</p>
      <h3 className={guide.subheading}>已有水压记录，分别看连接保持和管体爆破</h3>
      <p>以下来自已公开的常温水压试验：管长约 300 mm，1.6 mm 内径管配 BA-16F-PP-N 倒刺接头。连接耐压项目不加辅助紧固，记录保持超过 60 秒不脱落的压力；管体爆破项目允许辅助固定，以避免接头先脱落。</p>
      <Table label="指定 PVC 管与接头的短时水压试验均值" headers={["受测管材／硬度", "内径 × 外径（mm）", "60 秒不脱落耐压均值", "管体爆破均值"]} rows={pressureTestRows} />
      <p className={guide.note}>这些是指定样本、连接和方法的试验均值，两个项目的固定条件不同。选择连续运行压力还需考虑温度、介质、压力循环、批次与失效后果，不能把试验均值或爆破值直接填入设备的允许工作压力。</p>
      <p>吸液段还要检查负压下是否吸瘪。较长的细管、滤器阻力、过急弯曲和局部夹持，都可能让泵入口附近的管腔更容易收缩。试运行时观察最不利走线位置，并分别记录正常运行和启停、阀切换时的压力。</p>
      <div className={guide.links}><Link href="/resources/technical-articles/pvc-tubing-pressure-rating-pull-off-force/">查看水压、爆破及老化后拉脱力的完整记录</Link></div>
    </GuideSection>

    <GuideSection locale={locale} id="materials">
      <p><strong>需要同时回答两个问题：液体是否改变管材，接触管材后的液体是否影响检测。</strong>前者看尺寸、软硬、外观与连接，后者看吸附、析出、残留和检测本底。仅凭“没有漏液”无法覆盖检测要求。</p>
      <Table label="PVC 管接液适用性的检查方法" headers={["你的使用情况", "优先做什么", "怎样比较结果"]} rows={[
        ["工作液与清洗液不同", "分别列出两类液体的成分、使用浓度、最高温度和最长停留时间。", "保留未接液管样，比较接液后的内外径、质量、软硬及表面状态。"],
        ["样本、试剂或检测本底敏感", "设置未接触管材的同批液体空白，与管材接触组比较。", "观察本底与目标检测指标，并将液体自身波动与接触后的变化分开。"],
        ["混合废液、长期静置或换清洗剂", "按实际全部组分和接触周期评估，纳入冲洗与停机静置。", "先看材料变化，再用实际接头检查处理后的密封与连接保持。"],
      ]} />
      <p>已有 E3602007 的指定清洗液接触记录，包含累计接液 288 小时、另项累计浸泡 408 小时及化学发光本底观察；各项方法、介质和有效记录不同，可按与你的工况相关的项目查看。</p>
      <p>对酮类、卤代烃等有机溶剂，以及高浓度或未知配方清洗剂，应先核对适用材料再装机。若更换清洗液品牌、工作浓度、最高温度或管材配方，原有结果的覆盖范围也要随之复核。</p>
      <div className={guide.links}><Link href="/resources/technical-articles/pvc-tubing-cleaning-fluid-compatibility/">查看清洗液接触、发白与检测本底记录</Link><Link href="/resources/material-compatibility/">做材料兼容性初筛</Link></div>
    </GuideSection>

    <GuideSection locale={locale} id="pump-tube">
      <p><strong>泵前后连接管与泵头内的压管段，应分开选型和建立 BOM。</strong>连接管主要承担输送与密封，蠕动泵管还要反复压扁和回弹；泵头对内径、壁厚、压紧量、转速和疲劳表现都有要求。</p>
      <p>需要蠕动泵输送或夹管阀反复夹压时，先选设备支持的压管规格，再比较运行后的回弹、流量变化和磨损。把普通连接管装进泵头后能出液，只能说明当时能够输送。</p>
      <p>热清洗、湿热或其他灭菌处理也应按对应型号与完整组件的文件执行。材料物性中的温度数值没有同时给出处理时间、压力与循环次数，不能据此确定灭菌流程；有这类需求时，将处理方法和重复次数一并列入选材条件。</p>
    </GuideSection>

    <GuideSection locale={locale} id="installation">
      <ol className={guide.steps}>
        <li><h3>检查并裁出平整管口</h3><p>核对料号与内外径，使用适合软管的切管工具。切口应平整，无压扁、毛边、切屑和划伤；受损端重新裁切。</p></li>
        <li><h3>按接头结构装到规定位置</h3><p>检查接头表面和管腔清洁度，按规定插入深度装配。明显发白、开裂或装入力异常时先停下核对，润滑剂与加热处理应有对应装配依据。</p></li>
        <li><h3>留出转弯和维护余量</h3><p>连接根部保留合适的直管与支撑，避免一出接头就急弯。扎带与夹具用于定位，夹紧后检查管腔；避开锐边、摩擦点和机内热源。</p></li>
        <li><h3>充液后检查密封与通流</h3><p>按设备流程充液排气，观察泵入口、接头及高点的气泡；同时检查管身变形、外部渗漏、流量及启停后的变化。发现异常时先停机并安全泄压，再处理连接。</p></li>
      </ol>
      <p>首次装机保存管材批次、长度、接头型号和走线照片，再记录介质、温度、流量及压力条件。后续维护和换样时，可沿同一状态复核差异。</p>
    </GuideSection>

    <GuideSection locale={locale} id="troubleshooting">
      <Table label="PVC 管运行异常排查" headers={["现象", "优先检查顺序", "处理与复查"]} rows={[
        ["吸不上液、流量逐渐下降", "液源与吸液高度 → 急弯和夹扁 → 泵入口吸瘪 → 滤器或接头堵塞。", "先排除通路问题，再比较管径与长度；保留异常发生时的管腔状态，避免只提高泵速。"],
        ["持续气泡，外面却看不到漏液", "先排尽初始空气，再查吸液端液位、接头配合、管口和吸气位置。", "吸液侧可能从微小间隙进气；分段检查上游连接，处理后重新充液观察。"],
        ["接口渗漏、启停时脱管或维护后松动", "管材与接头尺寸 → 插入深度与管口损伤 → 压力峰值 → 外部牵拉。", "修复损伤并恢复正确装配、支撑和走线，再复查密封与保持。"],
        ["接液时发白，冲洗晾干后恢复", "分别记录湿态与干态外观，检查内外径、软硬、连接及检测结果。", "已有指定试样出现过可恢复发白；使用中需要光学观察时，仍须满足湿态透明度要求。"],
        ["发硬、发黏、开裂或留下永久折痕", "介质与清洗条件、温度、运行时间，以及夹持和受力位置。", "更换受损管段并排查原因；新管仍按原不合适的条件使用，可能再次出现同类问题。"],
      ]} />
      <p>发白的具体原因不能仅凭照片确定。是否继续使用应结合尺寸、机械与检测要求判断；开裂、明显黏化、永久变形或密封保持下降时，应停机处理并更换受损管段。</p>
    </GuideSection>

    <GuideSection locale={locale} id="maintenance">
      <p><strong>按运行与检查结果制定更换周期，发现损伤和性能下降时提前更换。</strong>接触液体、温度、压力循环、夹压和运动次数会影响使用状态，同一型号在不同管段的更换周期也可能不同。</p>
      <p>替换旧管时，优先找回完整料号和原始规格，再核对实际内外径、硬度、接头和管长。旧管可能已经老化或变形，测得的尺寸与手感不能单独作为新管的采购规格。</p>
      <Table label="PVC 管从样件转为批量供货的记录" headers={["需要固定的信息", "记录内容", "变更后重点复核"]} rows={[
        ["管材身份与尺寸", "完整型号、商品编码、配方或材料要求、硬度、内外径及公差。", "更换材料、硬度或尺寸后，复查接液、装配、密封与通流。"],
        ["成品连接与布管", "管长及公差、两端接头、插入深度、固定方式、标签和走线。", "更换接头、固定形式或路径后，复查泄漏、抗拔及压力或负压表现。"],
        ["使用与验收条件", "介质和清洗液、温度、运行压力峰值、静置与循环方式、验收方法。", "改变工况或清洗流程时，复核现有样件结果是否仍覆盖。"],
      ]} />
      <p>未使用的卷材保留包装与批次标签，按对应型号的贮存要求保存，避免挤压、污染及过小盘绕。采购数量按型号的卷长换算；裁切件和带接头组件则分别写明成品长度、套数与装配要求。</p>
      <div className={guide.links}><Link href="/products/tubing/pvc-tubing/">按规格选择 PVC 型号</Link><Link href="/contact/">提交管路条件与配套需求</Link></div>
    </GuideSection>
    <GuideSection locale={locale} id="manufacturing">
      <TubingManufacturingContent locale={locale} />
    </GuideSection>
  </div>, locale);
}
