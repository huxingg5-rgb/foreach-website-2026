import { registerFittingDetail } from "./fitting-detail-view";
import Link from "next/link";
import type { ReactNode } from "react";
import type { HardTubeAccessoryConfig } from "@/data/products/configurator/hard-tube-accessories";
import styles from "./QuickConnectDetailContent.module.css";
import modelStyles from "./HflM616PvNZhContent.module.css";

// Chinese pilot, exclusively HFL-M6-16-PV-N (809032). Do not widen its scope.
// Sources reviewed 2026-11-06:
// - Model-linked hfl-m6.pdf / hfl6-m6.pdf: HFL Ø10 × 16.5; HFL6 Ø6 × 20.
//   Use these drawings, not catalogue p.6's older HFL Ø9.4 dimension.
// - FOREACH A02 pp.6–9: flange, washer, FEP/PTFE tubing and assemblies;
//   printed pp.104/108: torque driver, matching bits and material characteristics.
// - FRGD-140D-2609-0001_001_cn, 推荐扭矩!O6:R6: plastic M6 0.25–0.30 N·m,
//   consistent with A02 p.6. The older K31 summary has a different lower bound;
//   do not merge values or extend this recommendation to U40/high-pressure fittings.
// - Washer choices and dimensions use the existing configurator source.
// Keep the shared quick-connect CSS and the existing CAD viewer/assets unchanged.

const imageRoot = "/images/products/fittings/hard-tube-fittings/hfl-m6-16-pv-n/details";
const assemblyPhoto = "/images/products/fittings/hard-tube-fittings/photos/flat-bottom-fitting-pvdf-natural-tubing-assembly.webp";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <div className="fx-sec" id={id}><h2>{title}</h2>{children}</div>;
}

function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return <div className="fx-tw"><table className={headers.length > 2 ? "fx-wide" : undefined}>
    {headers.length === 2 ? <colgroup><col style={{ width: "30%" }} /><col /></colgroup> : null}
    <thead><tr>{headers.map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
    <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, column) => column === 0
      ? <th scope="row" key={column}>{cell}</th> : <td key={column}>{cell}</td>)}</tr>)}</tbody>
  </table></div>;
}

function Photo({ src, alt, children, wide = false }: { src: string; alt: string; children: ReactNode; wide?: boolean }) {
  return <figure style={wide ? { gridColumn: "1 / -1" } : undefined}>
    <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`查看大图：${alt}`}>
      {/* Engineering drawings retain their full proportions and can be opened at full size. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={1500} height={1500} loading="lazy" style={wide
        ? { objectFit: "cover", aspectRatio: "2 / 1" } // Only the wide diagram's white padding is cropped.
        : { objectFit: "contain" }} />
    </a>
    <figcaption>{children}</figcaption>
  </figure>;
}

const features = [
  ["法兰翻边，平底端面密封", "管端加工法兰翻边，垫片支承翻边，接头旋紧后将翻边压向端口底面。适合连接采用平底端口的泵、阀和液路模块。"],
  ["接头可转动，减少管路扭转", "接头与管路分别装配，旋紧时可保持管路方向，减少硬管随接头转动。也便于预制管组件的定位与接驳。"],
  ["16.5 mm 本体，缩短轴向占用", "HFL 本体总长 16.5 mm，比 HFL6 的 20 mm 短 3.5 mm；头部直径为 10 mm，布置时同时预留径向操作空间。"],
  ["PVDF 本体，多种垫片可选", "本型号采用 PVDF 本体，可配 SUS、PEEK 或 PTFE 垫片。按管材、介质和装配要求选择完整材料组合。"],
  ["可配单端或双端翻边管", "可按设备接口配置单端、双端翻边管组件，并确定管长、两端接头、限位件和管标，便于整机布管与识别。"],
  ["配套扭力批，控制锁紧扭矩", "使用匹配 HFL 外形的批头，配合可调扭力批控制锁紧，减少手感差异造成的过度拧紧。"],
];

export default function HflM616PvNZhContent({ section, config }: {
  section: "product" | "selection";
  config?: HardTubeAccessoryConfig;
}) {
  if (section === "product") return <section className={styles.detail} data-section="product" id="ht-detail-product" data-content-model="HFL-M6-16-PV-N">
    <Section id="hfl-product-details" title="产品细节与尺寸差异">
      <p>从头部外形、接管尺寸和翻边端部，了解 HFL-M6-16-PV-N 与相邻规格的区别。尺寸单位为 mm，点击图片可查看大图。</p>
      <div className="fx-row">
        <div>
          <h3>型号与尺寸差别</h3>
          <ul>
            <li><strong>本型号 HFL：</strong>头部直径 10，本体总长 16.5，前端无螺纹段长 1；采用 PVDF 本色本体。</li>
            <li><strong>对比 HFL6-M6-16：</strong>头部直径 6，本体总长 20。头部更细，但轴向更长，适合的安装空间不同。</li>
            <li><strong>同系列不同管径：</strong>HFL-M6 的 16、20、25、30、32 分别对应 1.6、2.0、2.5、3.0、3.2 的管外径，通孔随规格变化。</li>
            <li><strong>翻边端部：</strong>垫片位于接头与管端翻边之间，翻边贴合平底密封面；接头后方的限位件用于限制滑动。</li>
          </ul>
          <p className="fx-muted" style={{ marginTop: 14 }}>图示为各型号独立尺寸，不按图片显示大小判断比例。本体总长不包含翻边和垫片，也不等于装入端口后的外露长度。</p>
        </div>
        <div className="fx-pics">
          <Photo src={`${imageRoot}/hfl-m6-16-dimensions.webp`} alt="HFL-M6-16 尺寸剖面，头部直径 10 mm、本体总长 16.5 mm">HFL-M6-16：较短本体，头部直径 10 mm</Photo>
          <Photo src={`${imageRoot}/hfl6-m6-16-dimensions.webp`} alt="HFL6-M6-16 对比尺寸，头部直径 6 mm、本体总长 20 mm">HFL6-M6-16：细长结构，头部直径 6 mm</Photo>
          <Photo src={`${imageRoot}/hfl-m6-tube-size-comparison.webp`} alt="HFL-M6 接管外径 1.6 mm 与 3.2 mm 规格的通孔剖面对比">同为 HFL-M6：1.6 与 3.2 mm 管规格的通孔差异</Photo>
          <Photo src={assemblyPhoto} alt="HFL 本色接头翻边管组件实物，展示翻边、垫片与后方限位件">HFL 翻边管组件实物：翻边、垫片及限位件位置</Photo>
        </div>
      </div>
    </Section>
  </section>;

  return <section className={styles.detail} data-section="selection" id="ht-detail-selection" data-content-model="HFL-M6-16-PV-N">
    <Section id="hfl-features" title="特性与优势">
      <div className="fx-grid">{features.map(([title, text]) => <div className="fx-card" key={title}><h3>{title}</h3><p>{text}</p></div>)}</div>
    </Section>

    <Section id="hfl-model-code" title="型号说明">
      <p>HFL 型号由以下五段组成，以 HFL-M6-16-PV-N 为例。螺纹与管径决定接口配合，材质与颜色按所需配置选择；配套垫片和管材单独选配。</p>
      <div className={`fx-pn ${modelStyles.modelCode}`} aria-label="HFL-M6-16-PV-N 型号编码拆解">
        {[["HFL", "系列"], ["M6", "螺纹规格"], ["16", "接管外径"], ["PV", "主体材质"], ["N", "颜色"]].map(([code, label], index) => <div key={code} className={modelStyles.modelPart}>
          {index > 0 ? <span className={`fx-dash ${modelStyles.separator}`} aria-hidden="true">-</span> : null}
          <span className={`fx-seg ${modelStyles.segment}`}><b><span>{code}</span></b><small>{label}</small></span>
        </div>)}
      </div>
      {/* HFL's complete 20-model range: M6/U28 × five tube ODs × PVDF × N/B.
          Verified against model-linked HFL drawings and the product detail source.
          U40, PPS and PEEK belong to other families and are not HFL options. */}
      <div className="fx-tw"><table className={modelStyles.modelTable}>
        <thead><tr><th scope="col">代码段</th><th scope="col">代码</th></tr></thead>
        <tbody>
          <tr><th scope="row">系列</th><td>HFL = 标滚平底接头，配合法兰翻边管与垫片使用</td></tr>
          <tr><th scope="row">螺纹规格</th><td><span className={modelStyles.codeOption}>M6 = M6×1</span><span className={modelStyles.codeOption}>U28 = 1/4-28 UNF</span></td></tr>
          <tr><th scope="row">接管外径</th><td>{[["16", "1.6"], ["20", "2.0"], ["25", "2.5"], ["30", "3.0"], ["32", "3.2"]].map(([code, diameter]) => <span className={modelStyles.codeOption} key={code}>{code} = {diameter} mm</span>)}</td></tr>
          <tr><th scope="row">主体材质</th><td>PV = PVDF（聚偏二氟乙烯）</td></tr>
          <tr><th scope="row">颜色</th><td><span className={modelStyles.codeOption}>N = 本色</span><span className={modelStyles.codeOption}>B = 黑色</span></td></tr>
        </tbody>
      </table></div>
      <p className="fx-muted">以上为 HFL 系列的型号代码。本页型号选用 M6×1 螺纹、1.6 mm 管外径、PVDF 本色本体。接管外径不等于管内径，管内径与管长按流量、流阻和管内容积要求另行选择。</p>
    </Section>

    <Section id="hfl-combinations" title="接头与法兰翻边管组合">
      <p>本型号为翻边平底接头，基本组合为 <strong>HFL-M6-16-PV-N ＋ WS-46-18 规格垫片 ＋ 外径 1.6 mm 法兰翻边管</strong>。管端需先完成法兰成型，再装入匹配的平底端口。</p>
      <Table headers={["组合方式", "配置与用途"]} rows={[
        ["单端翻边管", "一端配置本型号接头、垫片及翻边；另一端按设备连接要求加工，适合两端连接方式不同的管路。"],
        ["双端翻边管", "两端分别配接头与垫片，可按两个设备端口选择螺纹；管材、内外径和成品管长共同确定。"],
        ["限位件与管标", "O 圈或限位管限制接头滑动；管标可标记流路、接口或装配位置，便于安装和维护识别。"],
      ]} />
      <div className="fx-row">
        <div>
          <h3>法兰翻边、垫片与接头各起什么作用</h3>
          <ul>
            <li>管端翻边贴合接收端口的平底密封面。</li>
            <li>垫片支承翻边，接头通过螺纹旋合提供轴向压紧力。</li>
            <li>后方 O 圈／限位管属于限位件，不作为端口密封圈。</li>
          </ul>
        </div>
        <div className="fx-pics">
          <Photo src={`${imageRoot}/flanged-tubing-assembly-options.webp`} alt="双端法兰翻边管组件，标明接头、垫片、限位件及管标" wide>双端组件配置示例；两端零件分别选配，点击查看大图</Photo>
        </div>
      </div>
      <h3>本型号可选垫片</h3>
      <p>以下垫片均匹配本型号的 1.6 mm 管外径，外径为 4.6 mm、内孔为 1.8 mm；材质不同，厚度也有区别。</p>
      <Table headers={["垫片型号", "材质", "厚度", "商品编码"]} rows={(config?.accessories || []).map(item => [
        item.model, item.materialLabel, `${item.thickness} mm`, item.productCode,
      ])} />
      <p className="fx-muted">在上方选型区选择对应垫片，并按所需数量加入清单。接头、垫片及预制管组件的供货范围按清单确定。</p>
    </Section>

    <Section id="hfl-materials" title="材质与耐化学性">
      <p>本型号的 PVDF 本体、配套垫片和管材分别承担连接、支承与输液作用。材料选择应覆盖工作液、清洗液及实际温度。</p>
      <Table headers={["部件与材料", "材料特点与选择"]} rows={[
        ["接头本体 · PVDF", "含氟工程塑料，兼具耐化学性和机械性能。本型号为 PVDF 本色；PPS、PEEK 属于其他具体型号的材料选项。"],
        ["垫片 · SUS 不锈钢", "金属支承件，本型号配套厚度为 0.8 mm；用于支承管端翻边并传递接头的压紧力。"],
        ["垫片 · PEEK", "具有较高机械强度和耐热性能的工程塑料，本型号配套厚度为 0.9 mm，可用于需要非金属垫片的组合。"],
        ["垫片 · PTFE", "具有耐化学性和低摩擦特性的含氟材料，本型号配套厚度为 0.9 mm；装配时控制压紧，避免过度锁紧。"],
        ["管材 · FEP / PTFE", "可用于法兰翻边管组件的含氟管材。本型号匹配外径 1.6 mm，内径、管长及翻边加工要求按组件选择。"],
      ]} />
      <p className="fx-muted">材料特性不等于完整组件的额定耐温或耐压；介质、浓度、温度和接触时间需结合实际接液部件评估。</p>
      <ul className="fx-links"><li><Link href="/resources/material-compatibility/">材料兼容性</Link></li><li><Link href="/resources/technical-articles/fitting-material-selection-guide/">接头材质怎么选</Link></li></ul>
    </Section>

    <Section id="hfl-selection" title="螺纹、管径与安装空间怎么选">
      <Table headers={["选择项目", "本型号及相邻规格的区别"]} rows={[
        ["设备螺纹", <><strong>本型号：M6×1。</strong>设备端口为 1/4-28 UNF 时，应选择对应 HFL-U28 型号及配套垫片；M6 与 U28 不能互换。</>],
        ["端口密封形式", "选择与法兰翻边匹配的平底端口。底面应能与翻边贴合；锥底端口不能直接代替该平底密封结构。"],
        ["硬管外径", <><strong>本型号：1.6 mm。</strong>2.0、2.5、3.0、3.2 mm 管需分别选择 HFL 的 20、25、30、32 规格，并配套相应垫片。</>],
        ["安装空间", "HFL 头部直径 10 mm、总长 16.5 mm；HFL6-M6 头部直径 6 mm、总长 20 mm。分别比较接口间距、轴向余量和批头操作空间。"],
      ]} />
      <ul className="fx-links"><li><Link href="/products/fittings/hard-tube-fittings/">查看其他硬管接头规格</Link></li><li><Link href="/resources/technical-articles/flanged-tubing-assemblies-selection-guide/">翻边管组件选型</Link></li></ul>
    </Section>

    <Section id="hfl-torque" title="安装扭矩与扭力批">
      <p>本型号为 PVDF 塑料本体、M6×1 螺纹，推荐锁紧扭矩为 <strong>0.25～0.30 N·m</strong>。过度锁紧可能使管端翻边产生永久变形，影响密封。</p>
      <div className="fx-tw"><table className="fx-kv"><tbody>
        <tr><th scope="row">推荐锁紧扭矩</th><td>0.25～0.30 N·m（25～30 cN·m）</td></tr>
        <tr><th scope="row">配套扭力批</th><td>T-ST，商品编码 956002</td></tr>
        <tr><th scope="row">扭力批量程</th><td>5～60 cN·m（0.05～0.60 N·m）</td></tr>
        <tr><th scope="row">HFL 扭力批批头</th><td>商品编码 959006</td></tr>
      </tbody></table></div>
      <p>选用匹配 HFL 旋钮外形的 959006 批头，配合 956002 扭力批使用，并按工具说明设置所需扭矩。电批批头 959005 为另一种配套，不与扭力批批头混用。</p>
      <p className="fx-muted">上述锁紧推荐针对本页连接配置，不用于法兰翻边成型，也不套用于 U40 或其他高压接头。</p>
    </Section>

    <Section id="hfl-installation" title="安装与使用注意事项">
      <div className="fx-callout"><p><strong>先完成法兰翻边，再连接设备。</strong>翻边加工需使用适合管材与尺寸的专用设备，也可选择预制翻边管组件；扭力批用于接头锁紧。</p></div>
      <ul>
        <li><strong>装配前：</strong>确认接头、垫片已经按组件工艺穿入管材，检查翻边平整、无开裂，端口底面和螺纹洁净。</li>
        <li><strong>连接端口：</strong>使翻边与垫片正确就位，对正螺纹旋入，保持管路方向，再用配套扭力批控制锁紧。</li>
        <li><strong>通液检查：</strong>在设备规定的介质、温度和压力下检查密封，同时观察管端是否位移、出管处是否受到弯折或拉扯。</li>
        <li><strong>维护拆接：</strong>先停机并泄压，重新连接前检查翻边、垫片和端口底面。翻边损伤时处理或更换管组件，不靠继续拧紧补偿。</li>
      </ul>
    </Section>
  </section>;
}

// Pure server content: resolve the same Chinese template before translating its presentation.
registerFittingDetail(Section, Table, Photo, HflM616PvNZhContent);
