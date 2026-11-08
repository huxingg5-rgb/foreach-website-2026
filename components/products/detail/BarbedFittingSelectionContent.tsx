import { registerFittingDetail } from "./fitting-detail-view";
import Link from "next/link";
import type { ReactNode } from "react";
import { BarbedModelCode, BarbedProfileComparison, BarbedStructureGuide } from "./BarbedFittingPresentation";
import { getBarbedFittingPresentation, type BarbedDetail } from "@/data/products/detail/barbed-fitting-presentation";
import styles from "./BarbedFittingSelectionContent.module.css";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <div className="fx-sec" id={id}><h2>{title}</h2>{children}</div>;
}

function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return <div className="fx-tw"><table className={styles.table}>
    <thead><tr>{headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead>
    <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
  </table></div>;
}

export default function BarbedFittingSelectionContent({ data }: { data: BarbedDetail }) {
  const { model, segments, family, structure, spec, tubeSpecs, tubeCodes, material, color,
    isPlug, isBranch, isReducing, profileFor, suffixFor, currentProfiles,
    hasUnspecifiedProfile, otherCodes, tubing } = getBarbedFittingPresentation(data);
  const features = [
    [isReducing && family === "BA" ? "不同管径直线过渡" : structure?.task || "软管连接", structure?.use || "按接管结构及各端尺寸安排软管连接。"],
    [isReducing ? "各端尺寸分别匹配" : isPlug ? "单端倒刺配管" : "等径软管配管", `${tubing}。先按内径选规格，再核对管材、硬度、壁厚和尺寸公差。`],
    [`${material} 本体`, `当前型号材质为 ${material}，颜色为${color}。接头和软管应同时匹配输送介质、工作温度及清洗条件。`],
  ];

  return <>
    <Section id="fx-features" title="特性与用途">
      <div className="fx-grid">{features.map(([title, description]) => <div className="fx-card" key={title}><h3>{title}</h3><p>{description}</p></div>)}</div>
    </Section>

    <Section id="fx-pn" title="型号与尺寸说明">
      <p>以当前型号 <strong>{model}</strong> 为例，分别读取本体结构、接管尺寸、倒刺轮廓、材料和颜色。</p>
      <BarbedModelCode model={model} />
      <Table headers={["型号段", "含义"]} rows={[
        [family, structure?.name || spec("产品结构")],
        ...tubeCodes.map((code, index) => {
          const diameter = tubeSpecs[index]?.value ?? tubeSpecs[0]?.value;
          const profile = profileFor(code);
          const suffix = suffixFor(code);
          const meaning = profile ? `${profile} 型倒刺轮廓${suffix ? "" : "（型号省略 D）"}` : suffix ? `保留 ${suffix} 接管代码，该端轮廓及代码含义按本型号图纸确认` : "尺寸后未单独标注轮廓字母，按该型号图纸识别轮廓";
          return [code, `${tubeCodes.length > 1 ? `第 ${index + 1} 个接管段：` : ""}适配 ${diameter || "图纸标注尺寸的"} 内径软管；${meaning}`];
        }),
        [segments.at(-2) || "", `${material} 本体`],
        [segments.at(-1) || "", color],
      ]} />
      <h3>为什么有些型号不带倒刺字母？</h3>
      <p>部分型号沿用省略轮廓字母的命名。例如 <strong>BX4-16/24/32-PP-N、BF4-16/24/32-PP-N</strong>，接管尺寸后的 <strong>D 被省略，采用 D 型倒刺轮廓</strong>。这里的 16、24、32 分别代表三个规格，订货时保留原完整型号，如 BF4-16-PP-N。</p>
      <p className="fx-muted">这一省略规则适用于上述 BX4、BF4 型号。其他未标轮廓字母的型号，应按对应图纸确定轮廓，不能仅凭没有字母就全部归为 D 型。{hasUnspecifiedProfile ? `当前 ${model} 的接管段未单独标注轮廓字母，请结合本型号图纸核对。` : ""}</p>
      {!isPlug && !isReducing ? <p>等径型号还会省略重复的接管段：当前 {tubeCodes.join(" / ")} 表示各端采用相同接管规格，接管端数量由{structure?.name || "本体结构"}决定。省略重复尺寸与省略轮廓字母是两种不同的情况。</p> : null}
      <p className="fx-muted">接管尺寸指未装配软管的内径；{isPlug ? "倒刺峰部外径按本型号图纸读取，堵头没有贯通流道。" : "倒刺峰部外径和内部流道孔径是不同尺寸，分别按本型号图纸读取。"}</p>
    </Section>

    <Section id="fx-barb-profiles" title="倒刺轮廓与软管匹配">
      <p>软管沿导入面扩张、越过倒刺峰部，再包覆后方接管段。连接效果取决于倒刺轮廓与软管内径、硬度、壁厚及回弹的共同配合。{currentProfiles.length ? `${otherCodes.length ? `当前型号中的 ${tubeCodes.filter(code => profileFor(code)).join("、")} 接管段` : "当前型号"}采用 ${currentProfiles.join(" / ")} 型轮廓，可对照下图查看。` : "当前型号的轮廓应对照图纸识别。"}{otherCodes.length ? `其中 ${otherCodes.join("、")} 为其他接管代码，不归入下图五种轮廓，该端按本型号图纸确认。` : ""}</p>
      <BarbedProfileComparison currentProfiles={currentProfiles} />
      <div className="fx-callout"><p><strong>几何膨胀率 =（倒刺峰部外径 − 软管初始内径）÷ 软管初始内径 × 100%。</strong><br />膨胀率用于比较装配扩张量，不能直接作为耐压或抗拔脱等级；较大的数值也不代表连接一定更好。</p></div>
      <Table headers={["配管要点", "选择与检查方法"]} rows={[
        ["内径与公差", "先匹配各端接管内径，再核对软管的实际尺寸与公差；异径或多通接头逐端确认。"],
        ["管材、硬度与壁厚", "同内径软管也可能有不同装配表现。使用实际管材比较能否无损装到位，以及装配后的包覆和保持状态。"],
        ["轮廓与膨胀率", "比较导入面、峰部及后方接管段；不要只按一个百分比决定型号。"],
        ["使用后状态", "在实际介质、温度、压力及清洗条件下检查密封和松脱，吸液管路同时检查进气。"],
      ]} />
      <ul className="fx-links"><li><Link href="/resources/technical-articles/barbed-fitting-expansion-ratio/">膨胀比计算、管材试配与公差示例</Link></li></ul>
    </Section>

    <Section id="fx-materials" title="材质与使用条件">
      <p><strong>{model}</strong> 的本体材料为 <strong>{material}</strong>。选材时同时考虑接头与软管，记录液体成分、浓度、温度、接触时间及清洗剂；软管发生溶胀、硬化或回弹变化，也会改变倒刺处的配合。</p>
      <p>压力和温度需要按完整的“接头＋软管＋固定方式”组合评估。材料名称或膨胀率本身不能确定连接的允许压力。对不易扩张的硬管，应选用与管材匹配的连接结构；频繁拆接的位置，可设置专门的可拆接口。</p>
      <ul className="fx-links"><li><Link href="/resources/material-compatibility/">材料兼容性参考</Link></li><li><Link href="/resources/technical-articles/fitting-material-selection-guide/">接头材质怎么选</Link></li></ul>
    </Section>

    <Section id="fx-choose" title="如何选择">
      <p>按连接任务、各端软管内径、倒刺轮廓与管材、接头材料、装配空间的顺序确定候选型号。</p>
      <BarbedStructureGuide />
      <Table headers={["需要完成的连接", "优先查看的结构"]} rows={[
        ["两段软管直线连接", "BA 直通；按两端管径选择等径或异径。"],
        ["转角位置连接", "BL L 型；同时核对出管方向与弯曲余量。"],
        ["主路与支路连接", "BT T 型、BY Y 型；按端口位置分别匹配软管。"],
        ["四路软管连接", "BX4 十字型、BF4 π 型；按布管方向选择本体。"],
        ["封闭软管末端", "BBL 倒刺堵头；确认单端尺寸及封堵后的保持要求。"],
      ]} />
      <h3>当前型号的选型例子</h3>
      <p>需要{structure?.task || "连接软管"}，且{tubing}时，可以把 <strong>{model}</strong> 作为候选。随后用实际软管逐端核对图纸所示轮廓的插装与包覆情况，再结合 {material} 本体、介质和清洗条件确认整组连接。</p>
      {isBranch ? <p>多通接头提供分支或汇合路径，本身不保证等量分液，也不具有止回功能。各支路流量还受管径、长度及末端阻力影响。</p> : isPlug ? <p>堵头用于封闭管端。拆卸前先隔离并释放管路内的压力，取下后检查软管端部是否扩口或受损。</p> : null}
      <ul className="fx-links"><li><Link href="/products/fittings/barbed-fittings/">选择其他倒刺型号</Link></li><li><Link href="/resources/technical-articles/what-is-a-barbed-fitting/">倒刺结构与选型说明</Link></li></ul>
    </Section>

    <Section id="fx-install" title="安装与使用注意事项">
      <ol className={styles.installSteps}>
        <li><strong>准备管端。</strong>切口齐整、清除残屑，检查软管是否开裂、被夹扁或异常扩口，同时检查倒刺表面有无损伤。</li>
        <li><strong>装到规定位置。</strong>按对应结构与装配要求插装，确认软管越过峰部并有效包覆接管段；装配阻力异常时先检查规格和管端状态。</li>
        <li><strong>安排布管与支撑。</strong>预留弯曲空间，避免接头处持续受拉、侧向受力或软管折扁。</li>
        <li><strong>评估外部夹持。</strong>是否使用管夹由实际配合、压力变化、受拉及振动条件决定；管夹需匹配装配后的管外径和有效夹持位置，不能补偿错误管径。</li>
        <li><strong>检查完整连接。</strong>{isPlug ? "检查封堵处的密封与保持状态。" : "在使用条件下检查泄漏、松脱和通液表现，吸液管路同时检查进气。"}运行或清洗后复查；拆卸后的管端检查扩口、切伤和永久变形，再决定是否更换。</li>
      </ol>
    </Section>
  </>;
}

// Pure server content: resolve the same Chinese template before translating its presentation.
registerFittingDetail(Section, Table, BarbedFittingSelectionContent);
