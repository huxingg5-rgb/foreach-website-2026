import type { TubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";
import { getAssemblyDetailMedia } from "@/data/products/tubing-assemblies/detail-media";
import { assemblyDetailView } from "./assembly-detail-view";
import Link from "next/link";
import type { ReactNode } from "react";
import { fepTubingVariants } from "@/data/products/configurator/fep-tubing";
import { assemblyFittings, assemblyFittingAccessories } from "@/data/products/configurator/tubing-assembly-catalog";
import selectionMedia from "@/data/products/tubing-assemblies/fep-selection-media.zh.json";
import base from "../detail/EaPumpDetailContent.module.css";
import guide from "../detail/EaPumpSelectionContent.module.css";
import styles from "./FepFlangedTubingDetailContent.module.css";

function Section({ id, title, number, children }: { id: string; title: string; number?: number; children: ReactNode }) {
  return <section className={guide.section} id={`fep-assembly-${id}`}><h2>{number ? <span className={base.number}>{String(number).padStart(2, "0")}</span> : null}{title}</h2>{children}</section>;
}

function MediaSpace({ name }: { name: string }) {
  return <div data-fep-guide-media-slot={name} hidden />;
}

function SelectionFigure({ name, locale = "zh-CN" }: { name: keyof typeof selectionMedia.images; locale?: TubingAssemblyLocale }) {
  const image = getAssemblyDetailMedia(locale, name, selectionMedia.images[name]);
  return <figure className={styles.selectionFigure} data-fep-selection-media={name}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`${image.src}?size=${image.width}x${image.height}`} alt={image.alt} width={image.width} height={image.height}
      loading="lazy" decoding="async" />
    <figcaption>{image.caption}</figcaption>
  </figure>;
}

function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return <div className={base.tableWrap}><table className={guide.table}>
    <thead><tr>{headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
    <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, column) => column === 0
      ? <th key={column} scope="row">{cell}</th> : <td key={column}>{cell}</td>)}</tr>)}</tbody>
  </table></div>;
}

// Use the configurator catalogue for actual thread/material/accessory combinations.
// These are OD 1.6 mm reference parts, not a drawing for every finished assembly.
const referenceFittings = ["HF", "HF6", "HFL", "HFL6"].flatMap(family => {
  const fittings = assemblyFittings.filter(fitting => fitting.family === family &&
    fitting.connections.includes("翻边") && fitting.outerDiameters.includes(1.6) &&
    assemblyFittingAccessories(fitting, "翻边", 1.6).length > 0);
  return [...new Set(fittings.map(fitting => fitting.thread))].map(thread => {
    const matches = fittings.filter(fitting => fitting.thread === thread);
    return {
      family, thread,
      materials: [...new Set(matches.map(fitting => fitting.material))].join("、"),
      drawing: matches.find(fitting => fitting.drawingUrl),
    };
  });
});

// Wall-thickness examples use the configurator's exact OD/ID pairs; no assembly pressure is inferred.
const pressureExamples = fepTubingVariants.filter(variant => Number(variant.attributes.outerDiameter) === 1.6)
  .map(variant => Number(variant.attributes.innerDiameter)).sort((a, b) => a - b);
const unique = (values: string[]) => [...new Set(values)].join("、");

/** Chinese FEP sample: piston-pump information hierarchy with assembly-specific evidence. */
export default function FepFlangedTubingDetailContent({ section, locale = "zh-CN" }: { section: "product" | "selection"; locale?: TubingAssemblyLocale }) {
  const className = `${base.content} ${guide.guide} ${styles.content}`;
  if (section === "product") return assemblyDetailView(<section className={className} data-section="product"
    data-fep-assembly-content="product" aria-label="FEP 翻边管组件产品资料">
    <Section id="fitting-drawings" title="配套接头与二维图纸">
      <p>下表以管外径 1.6 mm 的配套接头为例，材料与螺纹组合来自当前选型目录。图纸用于核对接头本体尺寸；其他管外径应在定制中选择对应型号及配套垫圈。</p>
      <Table headers={["接头系列", "接口螺纹", "本体材质", "接头图纸"]} rows={referenceFittings.map(item => [
        item.family, item.thread, item.materials,
        item.drawing ? <a href={item.drawing.drawingUrl} key={item.drawing.model} target="_blank" rel="noopener noreferrer"
          aria-label={`查看 ${item.family} ${item.thread} 接管外径 1.6 mm 接头二维图纸`}>查看 PDF<span className={styles.drawingModel}>{item.drawing.model}</span></a> : "按所选型号确认",
      ])} />
    </Section>
  </section>, locale, [SelectionFigure]);

  return assemblyDetailView(<section className={className} data-section="selection" data-fep-assembly-content="selection"
    data-fep-assembly-selection-source="fittings-a02:06,07,09,104,108" aria-label="FEP 翻边管组件选型与使用">
    <Section id="features" number={1} title="特性与优势">
      <p>FEP 法兰翻边管组件用于分析仪器中的试剂、清洗液及内部液路连接。通过预成型的管端翻边与配套接头连接设备，可按管径、管长、两端端口和实际布管环境确定配置。</p>
      <div className={guide.featureGrid}>
        <article><h3>透明管身，便于观察</h3><p>FEP 管便于目视检查充液与气泡；所选管径、管壁及液体颜色会影响观察效果。</p></article>
        <article><h3>平底端口，端面密封</h3><p>通过接头和垫圈支撑并压紧翻边，配合匹配的平底密封面建立连接。</p></article>
        <article><h3>内外径成组选配</h3><p>外径对应端部零件与加工尺寸，内径结合流量、管路容积及允许压降选择。</p></article>
        <article><h3>A/B 两端分别配置</h3><p>可指定单端或双端翻边，两端的螺纹、接头材质及配套件分别匹配设备端口。</p></article>
        <article><h3>按路径定制长度与标识</h3><p>结合安装和维护空间指定成品长度、公差、限位位置及管标内容，便于装机识别。</p></article>
        <article><h3>适配特殊布管环境</h3><p>需要安排管路余量、配合设备运动或减少接触磨损时，可评估弹簧管、保护套等定制方案。</p></article>
      </div>
    </Section>
    <Section id="sealing" number={2} title="密封原理">
      <div className={styles.selectionColumns}>
        <div>
          <p>管端经专用工艺形成法兰翻边。接头旋入设备端口时，轴向压紧力通过支撑垫圈作用于翻边，使翻边与端口底部的平面贴合，形成端面密封。</p>
          <dl className={guide.referenceRows}>
            <div><dt>管端翻边</dt><dd>参与密封，需完整、平整，尺寸与所选管材和端口配套。</dd></div>
            <div><dt>支撑垫圈</dt><dd>位于接头前端与翻边之间，支撑翻边并传递压紧力，尺寸和方向按装配要求确认。</dd></div>
            <div><dt>螺纹接头</dt><dd>将组件连接到端口并施加压紧力。安装时应保持管体自然对正，避免扭转。</dd></div>
          </dl>
          <p>正确装配时，翻边连接部位的接液面由管材形成。O 型圈或限位管位于接头后方，用于限制接头滑动，应与端口处的密封结构分别识别。</p>
        </div>
        <SelectionFigure name="sealing" />
      </div>
    </Section>
    <Section id="restrictions" number={3} title="使用限制：接收端口必须匹配平底密封">
      <p>先确认接收端口的密封面，再核对螺纹、孔深与避空位。管端翻边需要贴合平整的底面；接头能够旋入螺纹后，仍需检查翻边能否连续、均匀地压紧。</p>
      <div className={styles.portComparison}>
        <article data-fep-port-example="flat">
          <h3>平底端口：匹配的密封形式</h3>
          <p>端口底部提供平整的接触面，使管端翻边获得均匀支撑。安装前应清除异物，并检查底面是否存在划伤或毛刺。</p>
          <SelectionFigure name="flatPort" />
        </article>
        <article data-fep-port-example="conical">
          <h3>锥底端口：需要重新匹配连接</h3>
          <p>锥形底孔不能与本平底翻边结构均匀贴合。已有设备使用锥底端口时，应先确认对应的连接或转接方案。</p>
          <SelectionFigure name="conicalPort" />
        </article>
      </div>
      <Table headers={["检查部位", "使用要求", "不符合时的影响"]} rows={[
        ["底孔与密封面", "螺纹底孔须为无锥度平底，密封面应平整、清洁，无影响贴合的划伤、毛刺或异物。", "锥形底孔或不平整的底面不能按设计压紧翻边，容易漏液或形成残留。"],
        ["内螺纹避空位", "接收端口的内螺纹避空位高度应 ≤1 mm，并按配合端口图纸确认。", "需与接头前端结构、垫圈厚度及翻边位置一起核对，避免压紧前发生干涉。"],
        ["螺纹与孔深", "按完整规格匹配 M6×1、1/4-28 UNF 或对应微型接口，并核对端口深度。", "螺纹外观相近或能够试拧几圈，不能作为接口兼容的判据。"],
        ["管端与配套件", "翻边无裂纹、偏斜或明显变形，垫圈规格正确且零件完整。", "缺件、混装或端面损伤会改变支撑与密封接触状态。"],
      ]} />
      <p className={guide.note}>区分两处避空尺寸：≤1 mm 对应接收端口的内螺纹避空位；HF/HF6 图示的 2 mm 对应接头前端结构。两者分别标注和核对，具体加工按配合图纸执行。</p>
    </Section>
    <Section id="materials" number={4} title="材料特性与管材选择">
      <p>先记录工作液与清洗液的名称、浓度、温度、接触时间和清洗方式，再选择管材。材料的耐化学性、透明性、成型方式及使用条件，应结合完整管组件一起判断。</p>
      <Table headers={["管材", "主要特性", "选择时关注"]} rows={[
        ["FEP · 本页配置", "透明氟塑料，具有良好的耐化学性和耐候性，可熔融加工，便于管端及管体成型。", "需要观察液体或气泡时可优先比较；同时核对介质、壁厚、工作温度及翻边加工条件。"],
        ["PTFE · 本色", "化学稳定性好、摩擦系数低，是试剂与清洗液连接的管材候选。", "透明观察效果与 FEP 不同；按实际内外径、安装路径和样品确认适用性。"],
        ["PFA", "综合性能接近 PTFE，可熔融加工，适合按具体工艺确认管端与管体成型。", "按已列内外径组合及实际介质选择，单独确认端部加工和完整连接条件。"],
        ["黑色 PTFE", "在 PTFE 管材基础上提供黑色外观，可用于提出避光要求的方案评估。", "提供敏感波段、遮光要求及验收方法，检查管身和两端连接处的完整遮光表现。"],
      ]} />
      <h3 className={guide.subheading}>接头、垫圈与管材分别核对</h3>
      <p>接头本体可选 {unique(referenceFittings.flatMap(item => item.materials.split("、")))}，支撑垫圈按型号配套 SUS、PEEK 或 PTFE。不同材料的机械性能和配套尺寸不同；同一材料的不同规格也应分别匹配。</p>
      <p>材料的通用性能用于初步筛选。需要高温清洗、特殊溶剂或长期连续接触时，应提供具体条件，再结合管径、端部结构和配套零件确认完整组件的工作温度、耐压及清洗适用性。</p>
      <div className={styles.materialGallery}>
        <SelectionFigure name="fep" />
        <SelectionFigure name="ptfe" />
        <SelectionFigure name="pfa" />
      </div>
      <div className={guide.links}>
        <Link href="/products/tubing-assemblies/flanged-tubing/details/ptfe/">本色 PTFE 管组件</Link>
        <Link href="/products/tubing-assemblies/flanged-tubing/details/pfa/">PFA 管组件</Link>
        <Link href="/products/tubing-assemblies/flanged-tubing/details/black-ptfe/">黑色 PTFE 管组件</Link>
      </div>
    </Section>
    <Section id="pressure" number={5} title="耐压与工作条件">
      <p>管组件的允许工作压力需由管材规格、壁厚、温度、介质、端口和两端连接共同确定。选型时同时说明正常压力、最高压力及启停或阀切换造成的压力变化；有负压吸液时，也应说明负压条件。</p>
      <Table headers={["需要确认", "对选型的影响"]} rows={[
        ["内外径与壁厚", "同外径下改变内径，会同时改变壁厚、流阻和管路容积，耐压需重新核对。"],
        ["温度与介质", "升温及不同介质会改变聚合物管材的使用条件；常温水测试结果与实际试剂工况分别确认。"],
        ["两端连接与设备端口", "管身承压、翻边状态、垫圈支撑和端口密封都需要满足要求；按整套配置确定允许值。"],
        ["运行与测试条件", "明确静态或循环压力、持续时间及允许结果，区分工作压力、验证压力和爆破压力。"],
      ]} />
      <div className={styles.pressureExample}>
        <h3>同外径换内径，也需要重新核对耐压</h3>
        <p>以下以外径 OD 1.6 mm 的 FEP 管为例，壁厚按（外径 − 内径）÷ 2 计算：</p>
        <Table headers={["外径 OD（mm）", "内径 ID（mm）", "壁厚（mm）"]} rows={pressureExamples.map(inner => [
          "1.6", inner.toFixed(1), ((1.6 - inner) / 2).toFixed(2),
        ])} />
        <p className={guide.note}>表中壁厚按所列内外径计算，实际壁厚受内外径公差影响。工作耐压还需结合温度、介质及端部连接条件，按完整组件确认。</p>
      </div>
      <p>管径、管长、材料或端部零件变化后，应重新核对压力条件与装机密封；不要用单个接头的标称压力替代整套管组件的允许工作压力。</p>
    </Section>
    <Section id="configuration" number={6} title="管端形式与可配置项目">
      <Table headers={["配置项目", "可指定内容", "需要一并确认"]} rows={[
        ["单端／双端", "单端翻边、双端翻边；A/B 两端可分别配套接头与垫圈。", "两端端口图纸、螺纹、材料、方向；自由端的切口或后续连接。"],
        ["长度与公差", "按实际安装路径指定成品长度 L。", "长度测量基准、单位、公差，以及转弯和维护余量。"],
        ["限位件", "按需配置 O 型圈或硅胶管限位。", "所在 A/B 侧、距基准的位置及接头允许活动范围。"],
        ["管标", "文字、流路编号或其他识别内容。", "文字、所在侧、位置及朝向，与设备端口对应。"],
      ]} />
      <div className={styles.configurationFigure}><SelectionFigure name="configuration" /></div>
      <h3 className={guide.subheading}>特殊环境可改为弹簧管、增加保护套</h3>
      <p>管组件可根据设备的安装空间、运动路径和外部接触环境调整形式。需要安排管路余量、配合部件移动或减少磨损时，可提出螺旋成型、保护套及相应固定方式的要求。</p>
      <div className={guide.cards}>
        <article><h3>弹簧管／螺旋成型</h3><p>提供螺旋直径、圈数、螺距、自然状态长度和两端直管段。涉及伸缩或往复运动时，再提供行程、频率及寿命要求，用样品验证运动后的管体与密封状态。</p></article>
        <article><h3>保护套／防磨护套</h3><p>管路与机壳、支架等接触时，可按路径增加保护套。注明套管材质、内径、覆盖长度、固定方式及外部环境，预留端部旋拧和管路弯曲空间。</p></article>
      </div>
      <div className={styles.customMedia}>
        <MediaSpace name="coiled-tubing" />
        <MediaSpace name="protective-sleeve" />
      </div>
      <p className={guide.note}>增加护套或改为弹簧管后，仍需核对基础管材的介质与耐压条件，并检查成型、固定和运动对端部受力的影响。尺寸与验证要求在配置图纸中明确。</p>
    </Section>
    <Section id="fitting-size" number={7} title="接头尺寸与安装空间">
      <p>接头选择应同时看螺纹、接管外径、头部直径、本体总长和端口深度。标准与紧凑结构的径向、轴向尺寸不同，需按设备布局分别比较。</p>
      <Table headers={["尺寸项目", "检查方法"]} rows={[
        ["接口螺纹", "核对完整规格和端口图纸。M6×1、1/4-28 UNF、6-40 UNF 分别选择匹配接头。"],
        ["管外径与接头通孔", "按同一根管材的外径匹配接头与垫圈。通孔属于装管空间，不等于管内径或流道直径。"],
        ["头部直径与端口间距", "检查相邻接头、壳体或支架是否干涉，并留出手指或工具的旋拧空间。"],
        ["本体总长与装入深度", "区分接头总长、旋入部分及安装后外露长度，核对后方出管与转弯空间。"],
        ["前端结构与垫圈", "按对应系列核对前端避空、垫圈厚度及翻边位置，确认有效压紧前没有干涉。"],
      ]} />
      <p>以 HF 与 HF6 为例：HF 头部外径为 8.2 mm、总长 20.5 mm；HF6 对应为 6.4 mm、17.6 mm。选择紧凑型后，仍需检查实际旋拧空间。HFL、HFL6 和 6-40 UNF 微型配置按各自型号图纸核对尺寸。</p>
      <div className={styles.dimensionGallery}>
        <SelectionFigure name="hfDimensions" />
        <SelectionFigure name="hf6Dimensions" />
      </div>
    </Section>
    <Section id="torque" number={8} title="安装扭矩与操作方法">
      <div className={styles.torqueReference}>
        <h3>常规平底翻边连接的装配参考</h3>
        <p className={styles.torqueValue}>0.25～0.30 <span>N·m</span></p>
        <p>该范围用于对应常规平底翻边配置的装配参考。实际设定值和控制公差应结合接头、管材及设备端口确认，并按当前图纸与装配要求执行；微型或特殊连接单独核对。</p>
      </div>
      <div className={styles.selectionColumns}>
        <ol className={guide.steps}>
          <li><h3>先核对零件与密封面</h3><p>确认接头、垫圈、翻边及端口正确配套，零件完整，密封面平整、清洁。</p></li>
          <li><h3>保持同轴，手工旋入</h3><p>先确认螺纹旋入顺畅，再进行锁紧。出现偏斜或卡涩时停止并检查，避免错牙和带动管体扭转。</p></li>
          <li><h3>使用匹配工具控制扭矩</h3><p>按接头旋钮外形选择批头，使用可准确设定扭矩的扭力批。固定接收端口，避免通过管身承受锁紧力。</p></li>
          <li><h3>按实际工况检查连接</h3><p>完成充液排气，在规定压力、温度与布管状态下检查密封和输送。发现渗漏时，按设备流程卸压并排查原因。</p></li>
        </ol>
        <SelectionFigure name="torque" />
      </div>
      <p>塑料翻边在过度锁紧后可能产生永久变形。渗漏时应先排查端口不匹配、缺件、翻边损伤或管路受力，避免持续增加扭矩。</p>
      <p className={guide.note}>T-ST 扭力批应配套对应接头系列的批头。先核对工具调节范围、单位与设定精度，再按装配要求锁紧；电批与手动扭力批分别使用对应批头。</p>
    </Section>
  </section>, locale, [SelectionFigure]);
}
