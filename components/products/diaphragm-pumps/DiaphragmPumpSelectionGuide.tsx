import Link from "next/link";
import type { DiaphragmPumpGuide } from "@/data/products/detail/diaphragm-pump-guide";
import { diaphragmFamilyDecisions, diaphragmMaterialDecisions, diaphragmMaterialRoles, diaphragmMaterialValidation, getDiaphragmSelectionGuideZh } from "@/data/products/detail/diaphragm-pump-selection-guide.zh";
import { DiaphragmWiringTools } from "./DiaphragmPumpSelectionTools";
import DiaphragmPumpModelCode from "./DiaphragmPumpModelCode";
import { diaphragmView } from "./diaphragm-view";
import { normalizeDiaphragmPumpLocale } from "@/data/products/detail/diaphragm-pump-routes";
import { diaphragmText } from "@/data/products/detail/diaphragm-pump-ui.intl";
import base from "@/components/products/detail/EaPumpDetailContent.module.css";
import layout from "@/components/products/detail/EaPumpSelectionContent.module.css";
import styles from "./DiaphragmPumpSelectionGuide.module.css";

type Row = readonly [string, string];

// Intrinsic asset dimensions reserve the correct space before each curve loads.
const curveDimensions = {
  DPL30: [2080, 668],
  DPL60: [2366, 778],
  DPL30H: [2354, 715],
  DPGL800: [2363, 1100],
} as const;

function ReferenceRows({ rows }: { rows: readonly Row[] }) {
  return <dl className={layout.referenceRows}>{rows.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl>;
}

function Figure({ src, alt, caption, dimensions, locale }: { src: string; alt: string; caption: string; dimensions?: readonly [number, number]; locale: string }) {
  let imageSrc = src;
  let size = dimensions;
  let axisNote: string | undefined;
  if (locale !== "zh" && dimensions) {
    const translatedRoot = "/images/resources/technical-articles/instrument-fluidics/what-is-a-diaphragm-pump";
    const sourceRoot = "/images/products/pumps/diaphragm-pumps/selection";
    if (src.endsWith("/dpl30-flow-pressure.jpg")) imageSrc = `${translatedRoot}/dpl30-flow-pressure-curve-${locale}.webp`;
    else if (src.endsWith("/dpgl800-gas-flow-pressure-curve.webp")) imageSrc = `${translatedRoot}/dpgl800-gas-flow-pressure-curve-${locale}.webp`;
    else if (src.endsWith("/dpl60-liquid-diaphragm-pump-flow-pressure-curve.webp")) {
      imageSrc = `${sourceRoot}/dpl60-flow-pressure-curve-en.webp`;
      size = [1592, 1002];
      axisNote = "图中横轴：负压／正压（kPa）；纵轴：流量（mL/min）。";
    } else if (src.endsWith("/dpgl800-5l-vacuum-build-up-time-curve.webp")) {
      imageSrc = `${sourceRoot}/dpgl800-5l-vacuum-build-up-time-curve-en.webp`;
      size = [1740, 996];
      axisNote = "图中横轴：压力（kPa）；纵轴：时间（min）；测试容积为 5 L。";
    } else if (src.endsWith("/dpl30h-flow-pressure-curve.webp")) {
      imageSrc = src.replace(/\.webp$/, `-${locale}.webp`);
    }
  }
  const [width, height] = size ?? [1500, 1500];
  return <figure className={dimensions ? `${styles.figure} ${styles.curveFigure}` : styles.figure}>
    {/* Original product/specification artwork is contained without cropping. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={imageSrc} alt={alt} width={width} height={height} style={dimensions ? { aspectRatio: `${width} / ${height}` } : undefined} loading="lazy" decoding="async" />
    <figcaption>{caption}{axisNote ? <span className={styles.axisNote}>{diaphragmText(axisNote, locale)}</span> : null}</figcaption>
  </figure>;
}

export default function DiaphragmPumpSelectionGuide({ guide, locale = "zh" }: { guide: DiaphragmPumpGuide; locale?: string }) {
  const lang = normalizeDiaphragmPumpLocale(locale);
  const content = getDiaphragmSelectionGuideZh(guide);
  const { facts } = content;
  const care: readonly Row[] = [
    ["日常运行", guide.gasLiquid ? "观察达到目标真空的时间、压力保持、排放及废液液位，留意泡沫和沉积。与初始记录相比，抽吸变慢比单纯听到电机声更值得检查。" : "记录引液时间、固定时间内的收集量、入口气泡及出口压力。检查软管折扁、接头松动和滤芯状态，在流量变化初期定位原因。"],
    ["更换工作液或清洗液", "先比较新旧配方、温度与混合残留，再确定相容的冲洗介质和步骤。不能把一种清洗剂的适用性推广到全部膜片、阀片和泵头组合。"],
    ["停机与保存", "含盐、易结晶或易沉积介质不宜按清水的方式直接留置。按介质与供货要求清除残留，确定湿存、排空或其他保存方式，并保留停机时间与复机结果。"],
    ["拆装与更换后", "先断电、卸压并处理介质残留。更换接液或连接部件后，重新验证气密、密封、引液及实际工作表现；维护间隔依据运行记录确定，不用统一天数代替。"],
  ];
  return diaphragmView(<section lang={lang === "zh" ? "zh-CN" : lang} className={`${base.content} ${layout.guide} ${styles.guide}`} data-diaphragm-selection={guide.model} aria-label={`${guide.model} 选型与使用`}>
    <section className={layout.section}>
      <h2>特性与优势</h2>
      <p className={styles.intro}>{guide.model} 面向{facts.scenario}。{facts.priority}，再把材料、控制、接口和运行周期一起纳入选型。</p>
      <div className={layout.featureGrid}>{content.features.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <DiaphragmPumpModelCode guide={guide} locale={lang} />

    <section className={layout.section}>
      <h2>从液路任务选择型号</h2>
      <p>先写清泵在设备中完成什么动作：补液、清洗、置换、循环，还是建立负压与抽吸废液。用液量、完成时间、吸入条件和出口负载决定候选型号；安装尺寸与材料组合随后一起收敛。</p>
      <p className={layout.note}>下表液体泵的三个数值依次为空载流量、额定压力、自吸高度，分别用于初筛，不是同一个保证工作点。</p>
      <div className={base.tableWrap} role="region" aria-label="隔膜泵任务与型号对照" tabIndex={0}>
        <table className={`${layout.table} ${styles.decisionTable}`}>
          <thead><tr><th scope="col">主要任务</th><th scope="col">候选系列与初筛参数</th><th scope="col">决定能否使用的下一步</th></tr></thead>
          <tbody>{diaphragmFamilyDecisions.map(([task, model, decision]) => <tr key={model} className={model.startsWith(`${guide.series}：`) ? styles.currentRow : undefined}><th scope="row">{task}</th><td>{model}</td><td>{decision}</td></tr>)}</tbody>
        </table>
      </div>
      {guide.gasLiquid ? <div className={styles.scope}>
        <h3>把负压抽吸要求写成可验证的任务</h3>
        <p>例如“从环境压力抽至某个目标负压，允许用时多少秒”，还需要同时给出系统有效容积、抽吸通道是否持续进气，以及带液阶段的实际介质状态。只写“真空越高越好”无法判断是否满足设备节拍。</p>
        <p>DPGL800 不适用于 100% 纯液体泵送。若任务是连续纯液体补液或循环，应回到 DPL30、DPL60、DPL30H 等液体泵中筛选。</p>
      </div> : null}
    </section>

    <section className={layout.section}>
      <h2>{guide.gasLiquid ? "气体流量、目标真空与抽吸时间" : "工作点、自吸与完整输送节拍"}</h2>
      <div className={styles.twoColumn}>
        <div>
          <h3>{guide.gasLiquid ? "先看目标压力处还有多少抽气能力" : "沿目标背压读取可用流量"}</h3>
          {guide.gasLiquid ? <>
            <p>6 L/min 是单头空载气体流量；最大负压＜−90 kPa 与最大正压 30 kPa 分别描述边界。不能将空载流量、极限负压和最大正压拼成同时成立的工作状态。</p>
            <p>抽吸接近极限负压时，气体流量下降，达到最后一段目标压力所需时间可能明显增加。入口漏气、出口背压和阀的切换状态也会改变实际结果。</p>
          </> : <>
            <p>先确定目标流量，再估算该流量下过滤器、阀、管路与末端结构的压降。在流量—压力曲线上找到相应压力，读取该条件下的流量，判断能否覆盖任务需求。</p>
            <p>{guide.highPressure ? "DPL30H 的 300 mL/min 是空载值，600 kPa 是额定压力。高压曲线能帮助判断带压输送，但不能理解为在 600 kPa 下仍有 300 mL/min。" : `${guide.series} 的 ${guide.flow} 是空载参考值。出口背压升高或入口条件变差后，应重新比较可用流量，不按额定压力处仍保持空载流量计算。`}</p>
            <p>入口负压曲线与出口正压曲线分别提供参考。两侧同时承受负载时，用整条液路实测；单侧曲线不能直接保证组合工况。</p>
          </>}
        </div>
        <Figure src={facts.curve} alt={`${guide.series} ${guide.gasLiquid ? "气体" : "液体"}流量—压力曲线`} caption={`${guide.series} 原始性能曲线；按图中测试条件读取，安装后的介质与液路需要另行验证。`} dimensions={curveDimensions[guide.series]} locale={lang} />
      </div>
      {guide.gasLiquid ? <div className={styles.twoColumn}>
        <Figure src="/images/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump/dpgl800-5l-vacuum-build-up-time-curve.webp" alt="DPGL800 在 5 L 容积下的真空建立时间参考曲线" caption="5 L 真空建立时间参考。测试容积不是产品容积上限，也不用于直接推算废液抽吸流量。" dimensions={[2367, 1025]} locale={lang} />
        <div><h3>用压力—时间曲线验证设备节拍</h3><p>同时给出起始压力、目标压力和达到目标的时间。对照曲线时先确认压力定义与测试条件，不把“能达到目标真空”直接当作“能在规定时间内达到”。</p><p>容积、漏气与实际进气负载改变后，重新测试；不将 5 L 结果按容积简单线性换算，也不将空腔建压结果当作带气液负载的排空结果。</p></div>
      </div> : <div className={layout.links}>
        <Link href="/resources/calculators/fluid-resistance/">估算管路与阀件流阻</Link>
        <Link href="/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/">流量—压力曲线怎么读</Link>
      </div>}
      <h3>{guide.gasLiquid ? "抽吸系统中容易遗漏的条件" : "自吸高度之外，还要验证什么"}</h3>
      <ReferenceRows rows={content.priming} />
    </section>

    <section className={layout.section}>
      <h2>接液材料怎么选</h2>
      <p>膜片、阀片、泵头分别承担运动、密封与容纳介质的作用。选择材料时，把工作液、清洗液、混合废液、温度和接触时长列在同一张条件表中。</p>
      <ReferenceRows rows={diaphragmMaterialRoles} />
      <div className={base.tableWrap} role="region" aria-label="隔膜泵接液材料组合与选择依据" tabIndex={0}>
        <table className={`${layout.table} ${styles.materialTable}`}><thead><tr><th scope="col">组合</th><th scope="col">膜片／阀片／泵头</th><th scope="col">候选条件与限制</th></tr></thead><tbody>{diaphragmMaterialDecisions.map(([code, materials, decision]) => <tr key={code}><th scope="row">{code}</th><td>{materials}</td><td>{decision}</td></tr>)}</tbody></table>
      </div>
      <h3>从材料初筛走到实际介质验证</h3>
      <div className={base.tableWrap} role="region" aria-label="材料相容性验证条件" tabIndex={0}>
        <table className={layout.table}><thead><tr><th scope="col">阶段</th><th scope="col">需要提供或记录</th><th scope="col">判断要点</th></tr></thead><tbody>{diaphragmMaterialValidation.map(([stage, conditions, decision]) => <tr key={stage}><th scope="row">{stage}</th><td>{conditions}</td><td>{decision}</td></tr>)}</tbody></table>
      </div>
      <p className={layout.note}>材料名称用于初筛，不能代替本配置在实际浓度、温度和动态工况下的验证。当前 {guide.series} 的介质温度为 {facts.temperature}；某种材料能耐受更高温度，也不改变整泵的使用温度。</p>
      <Link className={base.guideLink} href="/resources/material-compatibility/">查看材料相容性参考</Link>
    </section>

    <section className={layout.section}>
      <h2>电机、供电与控制方式</h2>
      <p>当前 {guide.model} 为{content.motorName}配置，供电为 {facts.voltage}，额定功率 {facts.power}。电源选型还要考虑启动与实际负载，不能仅用额定功率除以电压决定设备电源容量。</p>
      {!guide.gasLiquid ? <ReferenceRows rows={[
        ["有刷与无刷的取舍", "有刷配置参考寿命 3,000 h，无刷配置参考寿命 10,000 h，均以额定电压连续运行条件为基础。按每日累计运行、启停次数、温升和维护目标选择；参考寿命不是在任意介质与负载下的整机寿命保证。"],
        ["两线启停与多阶段泵速", "只需按时启停时，先比较供电控制；清洗、排液或待机阶段需要不同泵速时，再确定独立调速输入与可用转速范围。线数表示接口配置，不能单独作为性能高低的判断。"],
        ...(guide.series === "DPL30" || guide.series === "DPL60" ? [["A/B 电机与安装", "DPL30／DPL60 无刷 A/B 等效电机的电气与输出性能一致，机械外形和安装尺寸不同。固定孔位、出线方向与机壳空间按实际供货版本图纸确定。"] as const] : []),
      ]} /> : <><p>DPGL800 采用 24 V 无刷标准配置；额外的 PWM 调速与 FG 转速输出分别选配。先确认是否需要多阶段抽吸、转速诊断，以及设备如何判断实际抽吸完成。</p><p>无刷配置参考寿命为 10,000 h，对应额定电压连续运行条件。气液状态、出口负载、温度和启停频率改变后，按实际运行周期验证耐久表现。</p></>}
      {guide.motor === "series" ? <p className={layout.note}>下方以无刷供电与选配信号作对照。有刷配置按电机“＋”端子标记识别正极，接入额定直流供电与设备启停控制，不套用无刷信号定义。</p> : null}
      <DiaphragmWiringTools guide={guide} locale={lang} />
      <Link className={base.guideLink} href="/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire/">了解两线与多线控制的选择逻辑</Link>
    </section>

    <section className={layout.section}>
      <h2>接口、管路与安装</h2>
      <p>{guide.series} 的连接形式为 {facts.port}。接头名称、管内径和装配方式一起确认，再检查整条管路的气密、流阻、承压及维护空间。</p>
      <div className={content.currentPhoto ? styles.twoColumn : undefined}>
        <ReferenceRows rows={content.connection} />
        {content.currentPhoto ? <Figure src={content.currentPhoto} alt={`${guide.model} 泵头、接口与电机外形实拍`} caption={`${guide.model} 外形实拍；接头、线束及安装尺寸按实际供货配置确定。`} locale={lang} /> : null}
      </div>
      <p>{guide.gasLiquid ? "负压抽吸采用密闭废液瓶时，需要管理瓶盖与连接处的气密；这与液体供液瓶需要适当补气是两种不同的系统条件。" : "液体供液瓶需要适当补气，吸入接头需要保持气密。供液瓶不通气与入口漏气都可能降低流量，但处理方法不同，应分别定位。"}</p>
    </section>

    <section className={layout.section}>
      <h2>安装后的首次使用</h2>
      <p>先建立可重复的初始状态，再逐步加入真实负载。这样后续更换液瓶、清洗或维护时，有相同条件下的结果可比较。</p>
      <ol className={layout.steps}>{content.startup.map(([title, description]) => <li key={title}><h3>{title}</h3><p>{description}</p></li>)}</ol>
    </section>

    <section className={layout.section}>
      <h2>日常维护与异常排查</h2>
      <ReferenceRows rows={care} />
      <h3>按现象逐步定位</h3>
      <div className={base.tableWrap} role="region" aria-label={`${guide.series} 异常现象与排查步骤`} tabIndex={0}>
        <table className={`${layout.table} ${styles.troubleTable}`}><thead><tr><th scope="col">现象</th><th scope="col">可能关联的条件</th><th scope="col">先做什么</th></tr></thead><tbody>{content.faults.map(([symptom, causes, action]) => <tr key={symptom}><th scope="row">{symptom}</th><td>{causes}</td><td>{action}</td></tr>)}</tbody></table>
      </div>
    </section>

    <section className={layout.section}>
      <h2>整机验证与选型记录</h2>
      <p>样机通过的依据是实际任务能否完成，以及温升、停机和维护后能否重复完成。保留以下条件，便于确认配置，也便于后续定位差异。</p>
      <p>{guide.gasLiquid ? "把验收要求写成：在指定容积、起始压力、气液状态和排放条件下，于规定时间内达到目标真空并完成抽吸；停机、换瓶与维护后重复验证。" : "把验收要求写成：在最低液位、指定介质和最不利出口负载下，于规定窗口内完成各支路液量；需要定量时，再单独规定逐次液量误差与重复性。温升后、换瓶后和维护后采用相同方法复测。"}</p>
      <ReferenceRows rows={content.verification} />
      <p>提交选型需求时，附上完整型号、材料组合、接线需求和上述工况；若已有样机测试结果，同时提供液路示意与相同条件下的记录。</p>
    </section>
  </section>, lang);
}
