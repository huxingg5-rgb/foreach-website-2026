import type { TubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";
import { getAssemblyDetailMedia } from "@/data/products/tubing-assemblies/detail-media";
import { assemblyDetailView } from "./assembly-detail-view";
import { assemblyDetailText } from "@/data/products/tubing-assemblies/detail-localization";
import Link from "next/link";
import type { ReactNode } from "react";
import type { AssemblyConfiguration, AssemblyFamily } from "@/data/products/detail/tubing-assemblies.review.zh";
import { assemblyFamilyGuides, assemblyGuideMaterials, getAssemblyGuideFittings, getAssemblyGuideMaterial, getAssemblyGuideTubeSizes, type AssemblyMaterialKey } from "@/data/products/tubing-assemblies/detail-content.zh";
import media from "@/data/products/tubing-assemblies/selection-media.zh.json";
import base from "../detail/EaPumpDetailContent.module.css";
import guide from "../detail/EaPumpSelectionContent.module.css";
import layout from "./FepFlangedTubingDetailContent.module.css";
import styles from "./TubingAssemblyDetailContent.module.css";

type GuideImage = {src:string; width:number; height:number; alt:string; caption:string; sha256:string};
const images: Record<string,GuideImage> = media.images;
export function getAssemblyGuideImage(key: string): GuideImage {
  const image=images[key];
  if(!image) throw new Error(`Missing tubing assembly guide image: ${key}`);
  return image;
}
export function AssemblyGuideFigure({name,maxWidth,caption,locale="zh-CN"}: {name:string;maxWidth?:number;caption?:string;locale?:TubingAssemblyLocale}) {
  const image=getAssemblyDetailMedia(locale,name,getAssemblyGuideImage(name));
  return <figure className={layout.selectionFigure} data-assembly-guide-image={name} style={maxWidth ? {maxWidth} : undefined}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`${image.src}?v=${image.sha256?.slice(0,12) ?? "localized"}`} alt={image.alt} width={image.width} height={image.height}
      loading="lazy" decoding="async" style={{height:"auto",aspectRatio:"auto",objectFit:"contain"}} />
    <figcaption>{caption ?? image.caption}</figcaption>
    {name === "ringComponents" && locale !== "zh-CN" ? <RingKitDimensions locale={locale} /> : null}
  </figure>;
}

function RingKitDimensions({locale}: {locale:TubingAssemblyLocale}) {
  const text=(value:string)=>assemblyDetailText(value,locale);
  const rows=[
    ["CL-1S-16","1.6","1.6","HSF6-M6(U28)-16"],
    ["CL-1S-20","2.0","3.2","HSF6-M6(U28)-32"],
    ["CL-1S-25","2.5","3.2","HSF6-M6(U28)-32"],
    ["CL-1S-30","3.0","3.2","HSF6-M6(U28)-32"],
    ["CL-1S-32","3.2","3.2","HSF6-M6(U28)-32"],
    ["CL-1X-16","1.6","1.6","HFL6-U40-16"],
  ];
  return <div className={styles.kitSpecifications}>
    <p>{text("CL-1S：常规 M6×1、1/4-28 UNF 接口；CL-1X：对应 6-40 UNF 微型接口。SUS 压套与 PEEK 密封件配套使用。")}</p>
    <Table headers={["套件型号","接管外径（mm）","尺寸 A（mm）","适配接头"].map(text)} rows={rows} />
  </div>;
}

function Section({id,title,number,children}: {id:string;title:string;number?:number;children:ReactNode}) {
  return <section className={guide.section} id={`assembly-guide-${id}`}>
    <h2>{number ? <span className={base.number}>{String(number).padStart(2,"0")}</span> : null}{title}</h2>{children}
  </section>;
}
function Table({headers,rows}: {headers:string[];rows:ReactNode[][]}) {
  return <div className={base.tableWrap}><table className={guide.table}>
    <thead><tr>{headers.map(header=><th key={header} scope="col">{header}</th>)}</tr></thead>
    <tbody>{rows.map((row,index)=><tr key={index}>{row.map((cell,column)=>column===0 ? <th key={column} scope="row">{cell}</th> : <td key={column}>{cell}</td>)}</tr>)}</tbody>
  </table></div>;
}

export default function TubingAssemblyDetailContent({family,configuration,section,locale="zh-CN"}: {family:AssemblyFamily;configuration?:AssemblyConfiguration;section:"product"|"selection";locale?:TubingAssemblyLocale}) {
  const profile=assemblyFamilyGuides[family];
  const material=getAssemblyGuideMaterial(configuration ?? "fep");
  const productLabel=`${configuration ? material.name : ""}${profile.name}`;
  const fittingRows=getAssemblyGuideFittings(family);
  const sizes=getAssemblyGuideTubeSizes(configuration ?? "fep");
  const referenceSizes=sizes.filter(size=>size.outer===1.6);
  const className=`${base.content} ${guide.guide} ${layout.content}`;
  const sealingImage=family==="flanged-tubing" ? "flangeSealing" : family==="ferrule-kits" ? "ferruleSealing" : "ringSealing";
  const bodyMaterials=[...new Set(fittingRows.flatMap(row=>row.materials.split("、")))].join("、");

  if(section==="product") return assemblyDetailView(<section className={className} data-assembly-content="product" data-assembly-family={family} data-assembly-material={configuration ?? "all"} aria-label={`${productLabel}产品资料`}>
    <Section id="fitting-drawings" title="配套接头与二维图纸">
      <p>下表以管外径 1.6 mm 的配套接头为例，列出接头系列、螺纹及本体材料。按材料和完整型号选择对应图纸，其他管外径在定制中匹配确认。</p>
      <Table headers={["接头系列","接口螺纹","本体材料","接头图纸"]} rows={fittingRows.map(row=>[
        row.family,row.thread,row.materials,
        row.drawings.length ? <div className={styles.drawings} key={`${row.family}-${row.thread}`}>{row.drawings.map(drawing=><a href={drawing.url} key={drawing.url} target="_blank" rel="noopener noreferrer" aria-label={`查看 ${drawing.model} 二维图纸`}>
          {row.drawings.length>1 ? `${drawing.materials} · PDF` : "查看 PDF"}<span className={layout.drawingModel}>{drawing.model}</span>
        </a>)}</div> : "按所选型号确认",
      ])} />
    </Section>
  </section>, locale, [AssemblyGuideFigure]);

  return assemblyDetailView(<section className={className} data-assembly-content="selection" data-assembly-family={family} data-assembly-material={configuration ?? "all"} aria-label={`${productLabel}选型与使用`}>
    <Section id="features" number={1} title="特性与优势">
      <p>{productLabel}可按仪器液路的介质、管径、长度及两端端口配置，用于试剂、清洗液与仪器内部液路连接。先确认管材和连接结构，再核对安装空间及工作条件。</p>
      <div className={guide.featureGrid}>
        <article><h3>{configuration ? `${material.name}管材` : "管材按工况选择"}</h3><p>{configuration ? material.feature : "可比较透明 FEP、PFA、本色 PTFE 与黑色 PTFE，结合介质、观察或避光要求及安装条件选择。"}</p></article>
        <article><h3>{profile.connection}连接结构</h3><p>{profile.feature}</p></article>
        <article><h3>管径按成组规格选择</h3><p>外径提供 {[...new Set(sizes.map(size=>size.outer))].join("、")} mm；内外径按已列组合选配，兼顾流量、管路容积和压降。</p></article>
        <article><h3>A/B 两端分别配置</h3><p>分别对应设备端口，确认两端接头、螺纹、配套件和安装方向。</p></article>
        <article><h3>长度与标识按图确定</h3><p>指定成品长度、公差、测量基准及管标内容，便于装机和后续核对。</p></article>
        <article><h3>适配特殊布管环境</h3><p>可评估弹簧成型、保护套、限位及固定方式，结合运动和接触环境确认。</p></article>
      </div>
    </Section>
    <Section id="sealing" number={2} title="密封原理">
      <div className={layout.selectionColumns}>
        <div><p>{profile.sealing}</p>
          <dl className={guide.referenceRows}>{profile.roles.map(([name,text])=><div key={name}><dt>{name}</dt><dd>{text}</dd></div>)}</dl>
          <p>{profile.sealingNote}</p>
        </div>
        <AssemblyGuideFigure name={sealingImage} maxWidth={560} />
      </div>
    </Section>
    <Section id="restrictions" number={3} title="使用限制与端口匹配">
      <p>接头能够旋入螺纹后，仍需检查底孔形状、密封面、孔深及配套零件。接收端口和管端应在有效锁紧前正确贴合，不能通过持续增加扭矩补偿结构不匹配。</p>
      {family==="flanged-tubing" ? <div className={layout.portComparison}>
        <article><h3>平底端口：匹配的密封形式</h3><p>连续、平整的端面为翻边提供均匀支撑，安装前确认清洁和端面状态。</p><AssemblyGuideFigure name="flatPort" /></article>
        <article><h3>锥底端口：重新匹配连接</h3><p>锥形底孔不能与本平底翻边结构均匀贴合，需确认其他连接或转接方案。</p><AssemblyGuideFigure name="conicalPort" /></article>
      </div> : null}
      <Table headers={["检查部位","使用要求","不符合时的影响"]} rows={profile.restrictions} />
      <p className={guide.note}>{profile.restrictionNote}</p>
    </Section>
    <Section id="materials" number={4} title="材料特性与管材选择">
      <p>说明工作液与清洗液的名称、浓度、温度、接触时间及清洗方式，再分别选择管材与连接件。原材料的通用性能用于初步筛选，完整组件的使用条件按实际配置确认。</p>
      <div className={styles.materialLayout}>
        <div><h3 className={guide.subheading}>{configuration ? `本页管材：${material.name}` : "管材与配套件分别选择"}</h3><p>{configuration ? material.feature : "需要观察充液或气泡时，可比较透明管材；有避光要求时，核对黑色管材与两端连接位置的遮光表现。"}</p><p>{configuration ? material.focus : "从产品资料的管径组合中按同一材料选择内外径，提供工作液、清洗液、温度和接触时间，再确认完整组件的使用条件。"}</p>
          <p>接头本体可按所选系列配套 {bodyMaterials}。{profile.accessory}</p>
        </div>
        <AssemblyGuideFigure name={`${family}:${configuration ?? "fep"}`} maxWidth={360} />
      </div>
      <Table headers={["管材","选型特点","需要确认"]} rows={(Object.entries(assemblyGuideMaterials) as [AssemblyMaterialKey,typeof material][]).map(([key,item])=>[
        `${item.name}${key===configuration ? " · 本页" : ""}`,item.feature,item.focus,
      ])} />
      <div className={guide.links}>{(Object.entries(assemblyGuideMaterials) as [AssemblyMaterialKey,typeof material][]).filter(([key])=>key!==configuration).map(([key,item])=><Link key={key} href={`/products/tubing-assemblies/${family}/details/${key}/`}>{item.name}{profile.name}</Link>)}</div>
    </Section>
    <Section id="pressure" number={5} title="耐压与工作条件">
      <p>允许工作压力由管材、壁厚、温度、介质及两端连接共同确定。提供正常与最高压力、启停或阀切换带来的压力变化；有负压吸液时，一并说明负压条件。</p>
      <Table headers={["需要确认","对选型的影响"]} rows={[
        ["内外径与壁厚","改变内径会同时改变壁厚、流阻和管路容积，需重新核对耐压。"],
        ["介质与温度","常温水测试与实际试剂工况分别确认，升温及清洗条件也需要纳入。"],
        ["端部与设备端口",`${profile.connection}部件、管端及接收端口都应满足要求，单个接头参数不能替代整套组件允许值。`],
        ["验证方法","明确静态或循环压力、持续时间和判定要求，区分工作压力、验证压力及爆破压力。"],
      ]} />
      <div className={layout.pressureExample}>
        <h3>同外径换内径，也要重新核对耐压</h3>
        <p>以下以{configuration ? "本页" : "透明 FEP"} OD 1.6 mm 管材为例，壁厚按（外径 − 内径）÷ 2 计算：</p>
        <Table headers={["外径 OD（mm）","内径 ID（mm）","壁厚（mm）"]} rows={referenceSizes.map(size=>[size.outer.toFixed(1),size.inner.toFixed(1),((size.outer-size.inner)/2).toFixed(2)])} />
        <p className={guide.note}>表中壁厚按所列内外径计算，实际壁厚受内外径公差影响。工作耐压还需结合温度、介质及端部连接条件，按完整组件确认。</p>
      </div>
    </Section>
    <Section id="configuration" number={6} title="管端形式与可配置项目">
      <Table headers={["配置项目","可指定内容","一并确认"]} rows={[
        ["管端与连接",profile.endForm,"两端端口图纸、螺纹、材料与配套件；混合连接另行分别确认。"],
        ["长度与公差","按实际路径指定成品长度 L。","测量基准、单位、公差，以及转弯、安装和维护余量。"],
        ["限位与固定","O 型圈、硅胶管限位或其他固定需求。","所在侧、距基准的位置及接头允许活动范围，避免向端部传递额外拉力。"],
        ["管路标识","文字、编号、所在侧、位置及朝向。","与设备端口和流路对应，黑色管材尤其需要清晰识别。"],
      ]} />
      {family==="flanged-tubing" ? <div className={layout.configurationFigure}><AssemblyGuideFigure name="flangeConfiguration" /></div> : null}
      <h3 className={guide.subheading}>特殊环境可改为弹簧管、增加保护套</h3>
      <p>结合设备安装空间、运动路径和外部接触环境，可提出螺旋成型、保护套及固定方式的要求。基础管材、几何尺寸与端部受力需要同时评估。</p>
      <div className={guide.cards}>
        <article><h3>弹簧管／螺旋成型</h3><p>提供螺旋直径、圈数、螺距、自然状态长度和两端直管段。涉及伸缩或往复运动时，再确认行程、频率及寿命要求，并用样品验证管体与密封状态。</p></article>
        <article><h3>保护套／防磨护套</h3><p>注明套管材料、内径、覆盖长度、固定方式和外部环境，预留端部旋拧与管路弯曲空间，避免护套将拉力或扭矩传到连接处。</p></article>
      </div>
      <p className={guide.note}>成型或增加护套后，基础管材的介质与耐压条件仍需核对；成型、固定和运动要求写入配置图纸。</p>
    </Section>
    <Section id="fitting-size" number={7} title="接头尺寸与安装空间">
      <p>同时核对接口螺纹、接管外径、接头头部尺寸、本体总长及端口深度。紧凑型是否适用，需结合相邻端口、机壳及工具操作空间判断。</p>
      <Table headers={["尺寸项目","检查重点"]} rows={[
        ["接口螺纹","完整规格、端口形式和孔深共同核对，常规与微型接口分别选择。"],
        ["管外径与通孔","按同一根管材外径匹配接头及端部件，通孔尺寸不等于管内径。"],
        ["头部与端口间距","检查相邻接头、壳体及支架的干涉，并留出手指或工具操作空间。"],
        ["总长与装入深度","区分本体总长、旋入部分及安装后外露长度，保留后方出管和转弯空间。"],
        ["配套件位置",`核对${profile.connection}零件的孔径、厚度或预装位置，确认锁紧前没有结构干涉。`],
      ]} />
      <p>{profile.dimensionalNote}</p>
      <div className={layout.dimensionGallery}>
        {family==="flanged-tubing" ? <><AssemblyGuideFigure name="flangeStandardDimensions" /><AssemblyGuideFigure name="flangeCompactDimensions" /></>
          : family==="ferrule-kits" ? <><AssemblyGuideFigure name="ferruleStandardDimensions" /><AssemblyGuideFigure name="ferruleCompactDimensions" /></>
          : <><AssemblyGuideFigure name="ringPpsDimensions" /><AssemblyGuideFigure name="ringComponents" /></>}
      </div>
    </Section>
    <Section id="torque" number={8} title="安装扭矩与操作方法">
      <div className={layout.torqueReference}>
        <h3>{profile.torqueTitle}</h3>
        {profile.torqueValue ? <p className={layout.torqueValue}>{profile.torqueValue} <span>N·m</span></p> : null}
        <p>{profile.torqueNote}</p>
      </div>
      <div className={layout.selectionColumns}>
        <ol className={guide.steps}>{profile.steps.map(([title,text])=><li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ol>
        <AssemblyGuideFigure name={family==="retaining-ring-kits" ? "ringPliers" : "torqueTool"} maxWidth={family==="retaining-ring-kits" ? 360 : 500} />
      </div>
      <p>出现渗漏时，先按设备流程卸压，再排查端口不匹配、错配缺件、端部损伤和管路受力；不要持续增加锁紧力。</p>
    </Section>
  </section>, locale, [AssemblyGuideFigure]);
}
