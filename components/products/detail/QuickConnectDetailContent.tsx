import { registerFittingDetail } from "./fitting-detail-view";
import Link from "next/link";
import FittingDeliveryZh from "./FittingDeliveryZh";
import BarbedFittingSelectionContent from "./BarbedFittingSelectionContent";
import ThreadToBarbedSelectionContent from "./ThreadToBarbedSelectionContent";
import ThreadToBarbedProductContent from "./ThreadToBarbedProductContent";
import RemainingFittingDetailContent from "./RemainingFittingDetailContent";
import { BarbedProductDetails } from "./BarbedFittingPresentation";
import Image from "next/image";
import type { ReactNode } from "react";
import { getQuickConnectSeriesRows, type QuickConnectSeries } from "@/data/products/detail/getQuickConnectSeriesDetailData";
import { getQuickConnectFittingCadAssets } from "@/data/products/detail/quick-connect-fitting-cad-assets";
import { getQuickConnectDrawingHref } from "@/data/products/detail/quick-connect-drawing-assets";
import { getStandaloneFittingCadAssets } from "@/data/products/detail/standalone-fitting-cad-assets";
import { copy as pressureCopy } from "@/data/resources/technical-articles/instrument-fluidics/quick-disconnect-coupling-pressure-rating.zh";
import luerDetailsJson from "@/data/products/generated/fittings/luer-fittings/detail/index.json";
import styles from "./QuickConnectDetailContent.module.css";

type DetailSpec = { label?: string; value?: unknown };
type DetailIdentity = {
  model?: string;
  foreachModel?: string;
  seriesName?: string;
  seriesCode?: string;
  name?: string;
  slug?: string;
  productTypeId?: string;
  productCode?: string;
  description?: string;
  mainImage?: string | null;
  image?: string | null;
  imageCard?: string | null;
  additionalImages?: unknown[];
  imageAlt?: string;
  mainImageAlt?: string;
  drawingPdfUrl?: string | null;
  drawingUrl?: string | null;
  detailHref?: string;
  advantages?: unknown[];
  commonApplications?: unknown[];
  specs?: DetailSpec[];
};
export type QuickConnectDetailSection = "product" | "selection" | "delivery";
export type FittingDetailVariant = "quick-connect" | "standalone-fitting" | "luer-fitting";
const luerDetails = luerDetailsJson as DetailIdentity[];
const SERIES = {
  Q20: { bore: '1/8"', range: "1.6–6.4 mm" },
  Q40: { bore: '1/4"', range: "6.4–9.5 mm" },
  Q60: { bore: '3/8"', range: "9.5–19.0 mm" },
} satisfies Record<QuickConnectSeries, { bore: string; range: string }>;

function ContentSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <div className="fx-sec" id={id}><h2>{title}</h2>{children}</div>;
}
function DataTable({ headers, rows, wide = false }: { headers?: string[]; rows: ReactNode[][]; wide?: boolean }) {
  return <div className="fx-tw"><table className={wide ? "fx-wide" : headers ? undefined : "fx-kv"}>
    {headers ? <thead><tr>{headers.map(h => <th scope="col" key={h}>{h}</th>)}</tr></thead> : null}
    <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => !headers && j === 0
      ? <th scope="row" key={j}>{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody>
  </table></div>;
}
function PhotoFigure({ src, alt, caption }: { src?: string; alt: string; caption: string }) {
  return <figure>
    {src ? <Image src={src} alt={alt} width={1500} height={1125} loading="lazy" style={{ objectFit: "contain" }} /> : <div className="fx-photo-placeholder" role="img" aria-label={alt}><span>待补图片</span><small>{caption}</small></div>}
    <figcaption>{caption}</figcaption>
  </figure>;
}
function text(value: unknown) {
  return String(value ?? "").trim();
}

function listOf(value: unknown) {
  return Array.isArray(value) ? value.map(text).filter(Boolean) : [];
}

function specValue(data: DetailIdentity, label: string) {
  return text(data.specs?.find((item) => text(item.label) === label)?.value);
}

function ProductContent({ data, variant = "quick-connect" }: { data: DetailIdentity; variant?: FittingDetailVariant }) {
  const model = text(data.model || data.foreachModel || data.slug).toUpperCase();
  const productCode = text(data.productCode) || "以当前产品记录为准";
  const description = text(data.description) || `${model} 的产品资料以当前型号规格、图纸和 3D 资源为准。`;
  const mainImage = text(data.mainImage || data.imageCard || data.image);
  const extraImages = listOf(data.additionalImages);
  const imageCandidates = Array.from(new Set([
    mainImage,
    data.image && data.image !== mainImage ? text(data.image) : "",
    ...extraImages,
  ].filter(Boolean)));
  const advantages = listOf(data.advantages);
  const applications = listOf(data.commonApplications);
  const cad = data.slug && (!data.productTypeId || data.productTypeId === "quick-connect-fittings")
    ? getQuickConnectFittingCadAssets(data.slug)
    : undefined;
  const standaloneCad = data.slug && data.productTypeId
    ? getStandaloneFittingCadAssets(data.productTypeId, data.slug)
    : undefined;
  const drawing = getQuickConnectDrawingHref(model) || standaloneCad?.drawingPdfUrl || text(data.drawingPdfUrl || data.drawingUrl) || null;
  const resourceRows: ReactNode[][] = variant === "luer-fitting" ? [
    ["型号", model],
    ["商品编码", productCode],
    ["鲁尔结构", specValue(data, "鲁尔结构") || text(data.name) || "以当前型号规格为准"],
    ["接管内径", specValue(data, "接管内径") || "以当前型号规格为准"],
    ["螺纹规格", specValue(data, "螺纹规格") || "无独立螺纹规格"],
    ["材质 / 颜色", [specValue(data, "材质"), specValue(data, "颜色")].filter(Boolean).join(" / ") || "以当前型号规格为准"],
    ["二维图纸", drawing ? "当前型号已配置精确图纸" : "当前型号暂未配置公开二维图纸"],
    ["三维模型", "当前型号暂未配置公开 3D 模型"],
  ] : [
    ["型号", model],
    ["商品编码", productCode],
    ["接管内径或螺纹", specValue(data, "接管内径") || specValue(data, "接管内径或螺纹") || "以当前型号规格为准"],
    ["公母端 / 安装 / 阀门", [specValue(data, "公母端"), specValue(data, "安装方式"), specValue(data, "阀门配置")].filter(Boolean).join(" / ") || "以当前型号规格为准"],
    ["外壳 / 密封圈", [specValue(data, "外壳材质"), specValue(data, "密封圈材质")].filter(Boolean).join(" / ") || "以当前型号规格为准"],
    ["二维图纸", drawing ? "当前型号已配置精确图纸" : "当前型号暂未配置公开二维图纸"],
    ["三维模型", cad || standaloneCad ? "当前型号已配置精确 3D 模型" : "当前型号暂未配置 3D 模型"],
  ];
  return <ContentSection id="fx-product-detail" title="产品实物与接口">
    <p>{description}</p>
    <div className="fx-row"><div><h3>{model} 核对重点</h3><p>以下内容直接取当前型号资料，收到样品或批量产品后可按型号逐项核对：</p><ul>
      {(advantages.length ? advantages : ["外观、接口、安装方式和材料以当前型号规格为准"]).map(item => <li key={item}>{item}</li>)}
    </ul>{applications.length ? <><h3>适用液路任务</h3><ul>{applications.map(item => <li key={item}>{item}</li>)}</ul></> : null}</div><div className="fx-pics">
      {(imageCandidates.length ? imageCandidates : [""]).map((src, index) => <PhotoFigure key={`${model}-product-image-${index}`} src={src || undefined} alt={`${model} ${index === 0 ? "产品图" : `资料图 ${index + 1}`}`} caption={`${model} ${index === 0 ? "产品图" : `资料图 ${index + 1}`}`} />)}
    </div></div>
    <DataTable rows={resourceRows} />
  </ContentSection>;
}
function SelectionContent({ series, data }: { series: QuickConnectSeries; data: DetailIdentity }) {
  const config = SERIES[series];
  const curveSize = { Q20: { width: 835, height: 1205 }, Q40: { width: 835, height: 1360 }, Q60: { width: 835, height: 1260 } }[series];
  const rows = getQuickConnectSeriesRows(series);
  const currentModel = String(data.foreachModel || data.model || "").trim().toUpperCase();
  const current = rows.find(row => row.foreachModel === currentModel) || rows[0];
  const example = current?.foreachModel || currentModel;
  // Reuse the reviewed catalogue table; Q60 has no confirmed lower temperature limit.
  const ratingTable = pressureCopy.sections[0].blocks.find(block => block.type === "table");
  const allRatings = ratingTable?.type === "table" ? ratingTable.rows : [];
  const ratings = allRatings.filter(row => row[0] === series);
  const pressure = ratings[0]?.[2] || "以具体型号为准";
  const housings = [...new Set(rows.map(row => row.housingMaterial).filter(Boolean))].join(" / ");
  const tubeCodes = [...new Map(rows.map(row => [row.tubeCode, row.tubeOrThread])).entries()];
  const features = [
    ["咔嗒锁定，按键解锁", "插入到位后确认锁定，按键即可解锁。连接手感可辅助操作，通液前仍需检查密封。"],
    ["断开自动关闭流路", "带阀型号拔下后流路自动封闭，减少更换试剂瓶或拆卸模块时的滴漏。"],
    ["可穿板安装", "穿板型号用配套锁紧螺母固定在设备外壳或面板上，作为设备对外的液路接口。"],
    ["同系列公母端配对", `${series} 公端和母端按同系列配对，两端接管规格、安装和阀门配置可分别核对。`],
    [pressure + " 工作压力", `${series} 标准配置采用 ${housings} 外壳，压力和温度需按具体材料组合及使用工况确认。`],
    ["按液路任务组合接口", "按公母端、带阀与否、安装方式和材料筛选；具体可选组合以在售型号为准。"],
  ];
  return <>
    <ContentSection id="fx-features" title="特性与优势"><div className="fx-grid">{features.map(([title, text]) => <div className="fx-card" key={title}><h3>{title}</h3><p>{text}</p></div>)}</div></ContentSection>
    <ContentSection id="fx-conditions" title={`${series} 系列参数`}>
      <DataTable rows={[["工作压力", pressure], ["工作温度", <>{ratings.map(row => <div key={row[1]}>{row[1]}：{row[3]}</div>)}</>], ["通径", config.bore], ["接管内径", config.range], ["插拔方式", "插入锁定，按键解锁"]]} />
      <p className="fx-muted">以上为标准配置下的参考值，实际可用压力和温度取决于流体、密封材料和使用工况，不能把压力上限与温度上限直接组合使用。带阀不代表适合带压插拔，详见 <Link href="/resources/technical-articles/quick-disconnect-coupling-pressure-rating/">快插接头能承受多大压力</Link>。</p>
    </ContentSection>
    <ContentSection id="fx-pn" title="型号说明">
      <p>{series} 型号由以下几段组成，以 {example} 为例。公母端、接口、安装和阀门配置以当前型号规格及配合端选型结果为准。</p>
      <div className="fx-pn" aria-label={`${series} 型号编码拆解`}>{[
        [series, "系列"], [current?.tubeCode, "接管或螺纹"], [current?.genderCode, "公母端"], [current?.panelCode, "安装方式"], [current?.valvedCode, "阀门配置"],
        [`${current?.shapeCode || ""}${current?.housingCode || ""}${current?.sealCode || ""}`, "外形及材质"],
      ].map(([code, label]) => <span className="fx-seg" key={label}><b>{code || "—"}</b><small>{label}</small></span>)}</div>
      <DataTable headers={["代码段", "代码"]} wide rows={[
        ["系列", `${series} = ${config.bore} 通径`],
        ["接管或螺纹", tubeCodes.map(([code, connection]) => `${code} = ${connection === code ? "以具体型号规格为准" : connection}`).join("；")],
        ["公母端", "P = 公端；S = 母端"], ["安装方式", "M = 穿板；N = 非穿板"], ["阀门配置", "V = 带阀；X = 不带阀"],
        ["外形", "S = 直通；L = L 型，具体组合以当前型号为准"],
        ["材质组合", [...new Set(rows.map(row => `${row.housingCode}${row.sealCode} = ${row.housingMaterial} 外壳 + ${row.sealingRingMaterial} 密封圈`))].join("；")],
      ]} />
      <p className="fx-muted">替换其他品牌的快插接头，可参考 <Link href="/resources/selection-support/fitting-replacement/">接头替换选型</Link>。</p>
    </ContentSection>
    <ContentSection id="fx-mating" title="配对选型">
      <p>快插接头需要一个公端（P）和一个母端（S）成对使用，公母端需同为 {series} 系列。断开后哪一侧关闭，取决于两端是否带阀：</p>
      <DataTable headers={["公端", "母端", "断开后", "适合"]} wide rows={[
        ["带阀（V）", "带阀（V）", <strong key="两端都关闭">两端都关闭</strong>, "拆下试剂瓶、废液桶或模块后，两侧都要封闭"],
        ["带阀（V）", "不带阀（X）", "仅公端一侧关闭", "只需要公端所在一侧封闭"],
        ["不带阀（X）", "带阀（V）", "仅母端一侧关闭", "只需要母端所在一侧封闭"],
        ["不带阀（X）", "不带阀（X）", "两端都敞开", "断开后流路可以敞开"],
      ]} />
      <ul><li><strong>两端接口分别核对</strong>：同系列内按各端软管或螺纹规格选择，不跨系列直接配对。</li><li><strong>安装方式按位置选</strong>：固定在设备面板上的一端选穿板（M），接在外部管路上的一端选非穿板（N）。</li><li><strong>两端材质不同时</strong>，按温度范围较窄、耐化学性较弱的一侧评估整组连接。</li></ul>
    </ContentSection>
    <ContentSection id="fx-flow" title="流量与压降">
      <p>快插接头会给流路带来一定压降，流量越大压降越大。选型时，按流路需要的流量对照下方 {series} 曲线，读出接头带来的压降。</p>
      <figure className="fx-curve"><Image src={`/images/resources/technical-articles/instrument-fluidics/${series.toLowerCase()}-catalog-flow-curves.webp`} alt={`${series} 快插接头流量—压降曲线`} width={curveSize.width} height={curveSize.height} loading="lazy" /><figcaption>{series} 流量—压降曲线。气体与液体分别读取对应图和单位，压降单位为 bar。</figcaption></figure>
      <p className="fx-muted">曲线读数、Kv/Cv 估算方法和计算示例见 <Link href="/resources/technical-articles/quick-disconnect-coupling-flow-pressure-drop/">快插接头流量怎么算</Link>；整条流路的阻力可用 <Link href="/resources/calculators/fluid-resistance/">流阻计算器</Link> 估算。</p>
    </ContentSection>
    <ContentSection id="fx-materials" title="材质与耐化学性">
      <DataTable headers={["外壳 / 密封圈", "工作压力", "工作温度"]} rows={ratings.map(row => [row[1], row[2], row[3]])} />
      <p>{series === "Q20" ? "如需其他密封材料，请结合完整型号另行确认温度、压力和供货配置。" : "材料组合以具体在售型号为准。"}材质是否适用，取决于流体成分、浓度、温度、压力和清洗要求；不确定时，可在选型清单中备注工况，由工程师评估。</p>
      <ul className="fx-links"><li><Link href="/resources/material-compatibility/">材料兼容性</Link></li><li><Link href="/resources/technical-articles/fitting-material-selection-guide/">接头材质怎么选</Link></li></ul>
    </ContentSection>
    <ContentSection id="fx-choose" title="如何选择">
      <h3 style={{ marginTop: 0 }}>{series} 系列内的选项</h3>
      <DataTable headers={["选项", "什么时候选"]} rows={[
        [<strong key="带阀">带阀</strong>, "断开后流路需要封闭，例如试剂、废液、清洗液管路"], [<strong key="不带阀">不带阀</strong>, "断开后流路可以敞开"],
        [<strong key="穿板">穿板</strong>, "接头固定在设备外壳、面板或支架上，作为对外接口"], [<strong key="非穿板">非穿板</strong>, "接头接在管路中间，随管路移动"],
        ...ratings.map(row => [<strong key={row[1]}>{row[1]}</strong>, `参考工作温度：${row[3]}；仍需确认实际介质相容性`]),
      ]} />
      <h3>Q20、Q40、Q60 系列对比</h3>
      <DataTable headers={["系列", "通径", "接管内径", "外壳材质", "工作压力"]} wide rows={(Object.keys(SERIES) as QuickConnectSeries[]).map(s => [
        <strong key={s}>{s}{s === series ? "（本系列）" : ""}</strong>, SERIES[s].bore, SERIES[s].range, s === "Q60" ? "PP" : "POM / PP", allRatings.find(row => row[0] === s)?.[2] || "以具体型号为准",
      ])} />
      <p className="fx-muted">更完整的选型思路见 <Link href="/resources/technical-articles/what-is-a-quick-disconnect-fitting/">什么是快插接头</Link>。<Link href="/products/fittings/quick-connect-fittings/">查看全部快插接头型号</Link>。</p>
    </ContentSection>
    <ContentSection id="fx-install" title="安装与使用注意事项">
      <div className="fx-callout"><p><strong>不要带压插拔。</strong>带阀的作用是断开后封闭流路，不代表接头适合在带压状态下插拔。断开前请先泄压。</p></div>
      <ul><li>穿板型号使用配套锁紧螺母固定；面板开孔尺寸以图纸为准，可点击上方「添加图纸」申请 2D 图纸。</li><li>安装位置要留出按键操作、插入拔出和管路弯曲的空间。</li><li>断开时可能有少量残液流出，重新插合时可能带入少量空气；对此敏感的流路，请在实际工况下评估。</li><li>插合后确认锁定，再检查密封和通液。</li></ul>
      <ul className="fx-links"><li><Link href="/resources/installation-guide/">安装指南</Link></li></ul>
    </ContentSection>
  </>;
}

function NonPairingSelectionContent({ data }: { data: DetailIdentity }) {
  const model = text(data.model || data.foreachModel || data.slug).toUpperCase();
  const specs = (data.specs || []).filter(item => text(item.label) && text(item.value));
  const advantages = listOf(data.advantages);
  const applications = listOf(data.commonApplications);
  return <>
    <ContentSection id="fx-features" title="特性与优势">
      <div className="fx-grid">{(advantages.length ? advantages : ["接口尺寸和材料以当前型号资料为准"]).map((item, index) => <div className="fx-card" key={item}><h3>{item}</h3><p>{index === 0 ? `${model} 的接口、结构和材料按当前产品记录核对。` : "实际适用性需要结合软管、螺纹、介质、温度和装配空间确认。"}</p></div>)}</div>
    </ContentSection>
    <ContentSection id="fx-conditions" title="本型号参数">
      <DataTable rows={specs.map(item => [item.label, text(item.value)])} />
      {applications.length ? <><h3>适用场景</h3><ul>{applications.map(item => <li key={item}>{item}</li>)}</ul></> : null}
      <p className="fx-muted">以上参数取当前型号资料；接口配合、密封方式和材料兼容性需结合实际工况确认。</p>
    </ContentSection>
    <ContentSection id="fx-choose" title="如何选择与使用">
      <p>{text(data.description) || `${model} 的选型应以当前型号规格、接口尺寸、材料和安装空间为准。`}</p>
      <ul><li>先核对接口标准、软管内径或螺纹规格，再确认密封方式。</li><li>根据材料、介质、温度、压力和清洗要求确认兼容性。</li><li>安装前确认尺寸、公差和装配空间，通液前检查密封。</li></ul>
    </ContentSection>
    <ContentSection id="fx-install" title="安装与使用注意事项">
      <div className="fx-callout"><p><strong>请按当前型号图纸安装。</strong>不要把不同接口、材料或密封方式的型号直接替换使用；遇到工况不确定时，请提交型号和使用条件核对。</p></div>
      <ul><li>安装前清洁接口并检查外观、螺纹、倒刺和密封面。</li><li>避免过度拧紧、偏载和强行插入，确认连接稳定后再通液。</li><li>如需替换型号，请同时核对产品编码和最新图纸。</li></ul>
    </ContentSection>
  </>;
}
type LuerRole = "male" | "female" | "accessory";
function luerRole(data: DetailIdentity): LuerRole {
  const series = text(data.seriesCode || data.seriesName || data.model).toUpperCase();
  if (["LS", "PMLS"].includes(series)) return "female";
  if (["LCR", "LPT", "LNS", "LPBL"].includes(series)) return "accessory";
  return "male";
}
function luerTubeSize(data: DetailIdentity) {
  return specValue(data, "接管内径");
}
function luerSeries(data: DetailIdentity) {
  return text(data.seriesCode || data.seriesName || data.model).toUpperCase();
}
function luerNeedsLockRing(data: DetailIdentity) {
  return ["LSL", "LRL"].includes(luerSeries(data));
}
function luerAssemblyLabel(data: DetailIdentity) {
  const label = `${luerSeries(data)} ${luerRole(data) === "male" ? "公端" : "母端"}`;
  return luerNeedsLockRing(data) ? `${label}（需配套锁圈）` : label;
}
function luerHref(data: DetailIdentity) {
  return data.detailHref || (data.slug ? `/products/fittings/luer-fittings/${data.slug}` : "#");
}
function LuerSelectionContent({ data }: { data: DetailIdentity }) {
  const role = luerRole(data);
  const series = luerSeries(data);
  const tube = luerTubeSize(data);
  const pairRole: LuerRole = role === "male" ? "female" : "male";
  const pairs = luerDetails
    .filter((item) => luerRole(item) === pairRole && (!tube || luerTubeSize(item) === tube))
    .filter((item, index, all) => all.findIndex((candidate) => `${luerSeries(candidate)}:${luerTubeSize(candidate)}` === `${luerSeries(item)}:${luerTubeSize(item)}`) === index)
    .slice(0, 12);
  const specs = (data.specs || []).filter(item => text(item.label) && text(item.value));
  const advantages = listOf(data.advantages);
  const roleLabel = role === "male" ? "公鲁尔端" : role === "female" ? "母鲁尔端" : "鲁尔辅助件";
  const assemblyNote = luerNeedsLockRing(data)
    ? "当前型号是公鲁尔芯子，需按配套要求加装 LPT 锁圈后，才作为完整的锁紧式公鲁尔端使用。"
    : series === "LP"
      ? "当前型号是一体式公鲁尔，已带鲁尔锁紧螺纹；配套母端时仍需确认锁合结构。"
      : "当前型号按完整产品记录核对公母端、锁圈和接管规格。";
  return <>
    <ContentSection id="fx-features" title="特性与优势">
      <div className="fx-grid">{(advantages.length ? advantages : ["标准鲁尔接口，具体结构和材料以当前型号资料为准"]).map((item, index) => <div className="fx-card" key={item}><h3>{item}</h3><p>{index === 0 ? `${text(data.model || data.slug).toUpperCase()} 为${roleLabel}，按当前产品记录核对接口和材料。` : "实际适用性需要结合介质、温度、压力、软管和装配空间确认。"}</p></div>)}</div>
    </ContentSection>
    <ContentSection id="fx-luer-mating" title="配套组合">
      {role === "accessory" ? <>
        <p>当前型号属于鲁尔辅助件，不作为独立公母端配对。请先确认它服务于哪一个公鲁尔或母鲁尔组件，再按螺纹、锁圈、色环或堵头功能组合。</p>
        <DataTable rows={specs.map(item => [item.label, text(item.value)])} />
      </> : <>
        <p>{series} 当前为{roleLabel}{tube ? `，适配 ${tube} 接管内径` : ""}。{assemblyNote}鲁尔接口按公端与母端组合使用，材料和颜色不决定接口配合；组合前仍需核对锁紧结构、接管尺寸和介质兼容性。</p>
        <DataTable headers={["当前型号", "可搭配端", "接口尺寸", "用途"]} wide rows={pairs.length ? pairs.map((item) => [
          <Link key={item.slug} href={luerHref(item)}>{text(item.model || item.slug).toUpperCase()}</Link>,
          luerAssemblyLabel(item),
          luerTubeSize(item) || "按标准鲁尔接口",
          item.name || "鲁尔公母端组合",
        ]) : [[text(data.model || data.slug).toUpperCase(), "暂无同尺寸已发布的相反端型号", tube || "以图纸为准", "提交型号和工况确认"]]} />
        <ul><li>公端和母端按标准鲁尔接口组合，优先匹配相同接管内径。</li><li>带锁圈结构的公端应确认母端是否有相应锁紧配合空间；普通滑入式连接不强行替代锁紧结构。</li><li>不同材质可以组成一对，但要按流体、温度、压力和清洗要求评估整组兼容性。</li></ul>
      </>}
    </ContentSection>
    <ContentSection id="fx-conditions" title="本型号参数">
      <DataTable rows={specs.map(item => [item.label, text(item.value)])} />
      <p className="fx-muted">以上参数取当前型号资料；配套组合需要同时确认公母端、接管内径、锁紧结构和材料兼容性。</p>
    </ContentSection>
    <ContentSection id="fx-choose" title="如何选择与使用">
      <p>{text(data.description) || `${text(data.model || data.slug).toUpperCase()} 的选型应以鲁尔端类型、接管内径、材料和安装空间为准。`}</p>
      <ul><li>先判断需要公鲁尔端、母鲁尔端还是穿板母鲁尔端，再选择对应系列。</li><li>按软管实际内径选择 1.6 mm、2.4 mm 或 3.2 mm 等接管规格，不只看系列名称。</li><li>需要抗扭和锁紧时选择带锁圈结构，并确认母端有足够的装配和旋拧空间。</li></ul>
    </ContentSection>
    <ContentSection id="fx-install" title="安装与使用注意事项">
      <div className="fx-callout"><p><strong>组合前确认接口和工况。</strong>不要把普通鲁尔、锁紧鲁尔、螺纹套、滚花螺母或堵头混作同一种公母端；通液前检查插合、锁紧和密封。</p></div>
      <ul><li>安装前清洁接口并检查锥面、锁圈、螺纹和密封面。</li><li>带锁圈型号按图纸和结构旋紧，避免偏载、过度拧紧或强行插入。</li><li>拆装后重新检查泄漏、松动和残液，实际工况不确定时提交整组型号确认。</li></ul>
    </ContentSection>
  </>;
}
export default function QuickConnectDetailContent({ data, section, variant = "quick-connect" }: { data: DetailIdentity; section: QuickConnectDetailSection; variant?: FittingDetailVariant }) {
  if (section === "delivery") return <FittingDeliveryZh />;
  if (["luer-fittings", "female-thread-adapters", "bulkhead-barbed-fittings", "filters", "check-valves"].includes(data.productTypeId || "")) {
    return <section className={styles.detail} data-section={section} id={`fx-detail-${section}`}>
      <RemainingFittingDetailContent data={data} section={section} />
    </section>;
  }
  if (variant === "standalone-fitting") {
    const isBarbed = data.productTypeId === "barbed-fittings";
    return <section className={styles.detail} data-section={section} id={`fx-detail-${section}`}>
      {section === "product" ? (isBarbed ? <BarbedProductDetails data={data} />
        : data.productTypeId === "thread-to-barbed-fittings" ? <ThreadToBarbedProductContent data={data} />
        : <ProductContent data={data} />)
        : isBarbed ? <BarbedFittingSelectionContent data={data} />
        : data.productTypeId === "thread-to-barbed-fittings" ? <ThreadToBarbedSelectionContent data={data} />
        : <NonPairingSelectionContent data={data} />}
    </section>;
  }
  if (variant === "luer-fitting") {
    return <section className={styles.detail} data-section={section} id={`fx-detail-${section}`}>
      {section === "product" ? <ProductContent data={data} variant="luer-fitting" /> : <LuerSelectionContent data={data} />}
    </section>;
  }
  const match = String(data.seriesName || data.foreachModel || data.model || data.slug || "").toUpperCase().match(/^Q(?:20|40|60)/);
  if (!match) return null;
  const series = match[0] as QuickConnectSeries;
  return <section className={styles.detail} data-section={section} id={`fx-detail-${section}`}>
    {section === "product" ? <ProductContent data={data} /> : <SelectionContent series={series} data={data} />}
  </section>;
}

// Pure server content: resolve the same Chinese template before translating its presentation.
registerFittingDetail(ContentSection, DataTable, PhotoFigure, ProductContent, SelectionContent, NonPairingSelectionContent, LuerSelectionContent, QuickConnectDetailContent);
