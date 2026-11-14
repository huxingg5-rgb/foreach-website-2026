import Link from "next/link";
import type { ReactNode } from "react";
import type { ProductConfiguratorVariant } from "@/components/products/configurator";
import { fepTubingVariants } from "@/data/products/configurator/fep-tubing";
import { ptfeTubingVariants } from "@/data/products/configurator/ptfe-tubing";
import { pfaTubingVariants } from "@/data/products/configurator/pfa-tubing";
import { peekTubingVariants } from "@/data/products/configurator/peek-tubing";
import { assemblyFamilyGuides } from "@/data/products/tubing-assemblies/detail-content.zh";
import { getAssemblyReviewDetail } from "@/data/products/detail/tubing-assemblies.review.zh";
import { getPublishedAssemblyConfigurations } from "@/data/products/tubing-assemblies/publication";
import { tubingSelectionProfiles, type TubingGuideMaterial } from "@/data/products/tubing/selection-guides.zh";
import { TubingManufacturingContent } from "./TubingContentPhotos";
import { TubingAssemblyPhotos, TubingConnectionPhotos, TubingMaterialPhoto } from "./TubingSelectionVisuals";
import base from "./EaPumpDetailContent.module.css";
import guide from "./EaPumpSelectionContent.module.css";
import styles from "./PvcTubingDetailContent.module.css";
import { tubingView } from "./tubing-view";
import { tubingHtmlLocale } from "@/data/products/tubing/detail-locales";

const variantsByMaterial: Record<TubingGuideMaterial, ProductConfiguratorVariant[]> = {
  fep: fepTubingVariants, ptfe: ptfeTubingVariants, pfa: pfaTubingVariants, peek: peekTubingVariants,
};
const families = ["flanged-tubing", "ferrule-kits", "retaining-ring-kits"] as const;

function Section({ number, material, id, title, children }: {
  number: number; material: TubingGuideMaterial; id: string; title: string; children: ReactNode;
}) {
  return <section className={guide.section} id={`${material}-guide-${id}`}>
    <h2><span className={base.number}>{String(number).padStart(2, "0")}</span>{title}</h2>
    {children}
  </section>;
}

function Table({ label, headers, rows }: { label: string; headers: string[]; rows: (string | ReactNode)[][] }) {
  return <div className={base.tableWrap} role="region" aria-label={label} tabIndex={0}>
    <table className={`${guide.table} ${styles.table}`}>
      <thead><tr>{headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
      <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, column) => column === 0
        ? <th key={column} scope="row">{cell}</th> : <td key={column}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

export default function TubingSelectionContent({ material, locale = "zh" }: { material: TubingGuideMaterial; locale?: string }) {
  const profile = tubingSelectionProfiles[material];
  const innerDiameters = [...new Set(variantsByMaterial[material].map(variant => Number(variant.attributes.innerDiameter)))].sort((a, b) => a - b);
  const sampleDiameters = innerDiameters.length > 3
    ? [innerDiameters[0], innerDiameters[Math.floor(innerDiameters.length / 2)], innerDiameters[innerDiameters.length - 1]] : innerDiameters;
  const section = (number: number, id: string, title: string, children: ReactNode) => <Section key={id} number={number} material={material} id={id} title={title}>{children}</Section>;
  const assemblyConfiguration = profile.assemblyConfiguration;
  const companionFamily = material === "fep" ? "retaining-ring-kits" : "ferrule-kits";
  const companion = assemblyConfiguration ? getAssemblyReviewDetail(companionFamily, assemblyConfiguration) : undefined;
  return tubingView(<div className={`${base.content} ${guide.guide} ${styles.content}`} lang={tubingHtmlLocale(locale)} data-tubing-selection={material}>
    {section(1, "fit", profile.fitQuestion, <>
      <p><strong>{profile.answer}</strong></p>
      {material === "ptfe" || material === "peek" ? <TubingMaterialPhoto material={material} locale={locale} /> : null}
      <Table label={`${profile.name} 管按液路任务选型`} headers={["你的主要任务", "选型方向", "样件检查重点"]} rows={profile.tasks} />
      <div className={guide.links}><Link href="/products/tubing/">比较其他管材</Link></div>
    </>)}
    {section(2, "sizes", "内径、外径和管长怎么选，细管会不会影响流量？", <>
      <p><strong>{profile.sizing}</strong></p>
      <p>内径决定管腔通流面积，外径决定接头配合与安装占用，名义壁厚为（外径 − 内径）÷ 2。较大内径通常有利于降低相同条件下的直管流阻，同时会增加充液、换液和残留体积。</p>
      {material === "fep" ? <TubingMaterialPhoto material={material} locale={locale} /> : null}
      <Table label={`${profile.name} 已列内径的理论充液量`} headers={["已列内径", "1 m 直管理论充液量", "选型时怎样使用"]} rows={sampleDiameters.map(inner => [
        `${inner} mm`, `约 ${(Math.PI * inner * inner / 4).toFixed(3)} mL`, "用于比较充液与换液量；整条液路另计接头、阀和其他流道。",
      ])} />
      <p className={guide.note}>以上按圆形、未变形管腔计算 V = π × 内径² × 长度 ÷ 4，是几何算例；内径取自当前型号，需与该型号外径成组选择。实际公差、变形和端口内腔会影响整条管路的容积。</p>
      <div className={guide.links}><Link href="/resources/calculators/fluid-resistance/">估算管径、管长与压降</Link><Link href={`/products/tubing/${material}-tubing/`}>选择已列管子型号</Link></div>
    </>)}
    {section(3, "connections", "现有设备接头能不能继续用，先核对哪些尺寸？", <>
      <p><strong>{profile.connection}</strong></p>
      <Table label={`${profile.name} 管与现有接头配套`} headers={["现场情况", "先取得的信息", "配套与检查方法"]} rows={profile.connectionRows} />
      {material === "peek" ? <TubingConnectionPhotos material={material} locale={locale} /> : null}
      <p>接头本体与密封件分别核对材料、温度和压力条件。试装时既检查能否正确装到位，也检查端部有无缩径、受损、松脱或渗漏。</p>
      <div className={guide.links}><Link href="/products/fittings/hard-tube-fittings/">查看硬管接头与配套件</Link></div>
    </>)}
    {section(4, "assemblies", "自己裁管装接头，还是选择配好的管组件？", <>
      <p><strong>{profile.assemblyNote}</strong></p>
      {assemblyConfiguration && companion ? <TubingAssemblyPhotos material={assemblyConfiguration} locale={locale} companion={{
        ...companion.image, width: 1500, height: 1500,
        caption: `${profile.name} ${assemblyFamilyGuides[companionFamily].name}实拍`,
        note: assemblyFamilyGuides[companionFamily].feature,
      }} /> : null}
      {assemblyConfiguration ? <Table label={`${profile.name} 管可选管组件`} headers={["组件形式", "适合的装配需求", "进入对应材质配置"]} rows={families.filter(family => getPublishedAssemblyConfigurations(family).includes(assemblyConfiguration)).map(family => [
        assemblyFamilyGuides[family].name, assemblyFamilyGuides[family].feature,
        <Link key={family} href={`/products/tubing-assemblies/${family}/details/${assemblyConfiguration}/`}>查看 {profile.name} {assemblyFamilyGuides[family].name}</Link>,
      ])} /> : <div className={guide.links}><Link href="/products/fittings/hard-tube-fittings/">按外径与端口选择接头</Link><Link href="/contact/">提交定长与端部配套图纸</Link></div>}
      {material === "ptfe" ? <p>有避光要求时，可进一步选择<Link href="/products/tubing-assemblies/flanged-tubing/details/black-ptfe/">黑色 PTFE 翻边管组件</Link>，或在对应卡箍、卡环系列中选择黑色配置。</p> : null}
      <p>卷管适合自行裁切与灵活布管；成品组件适合长度、两端连接和标识已确定的重复装机。询价时写清管材型号、成品长度及测量基准、A/B 两端接头、单端或双端、数量和验收要求，便于按一套配置打样。</p>
    </>)}
    {section(5, "chemistry", profile.chemistryQuestion, <>
      {profile.chemistry.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      <div className={guide.links}><Link href="/resources/material-compatibility/">查询材料兼容性参考</Link></div>
    </>)}
    {section(6, "conditions", "温度、压力或负压怎样核对，材料参数能直接拿来用吗？", <>
      {profile.conditions.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      <p>样件验证记录正常运行、启停和阀切换状态，并检查完整布管在清洗或温度变化后的密封与通流。若缺少对应管径和连接形式的条件，先确认资料和测试方法，再确定设备使用范围。</p>
    </>)}
    {section(7, "installation", "怎么裁切和安装，首次通液检查什么？", <>
      <p>{profile.installationNote}</p>
      <ol className={guide.steps}>
        <li><h3>核对型号并准备管端</h3><p>确认内外径、长度和端部结构，使用适合当前材料及管径的工具。裁后检查端面平整、管腔畅通，无残屑和影响连接的损伤。</p></li>
        <li><h3>按接头结构完成装配</h3><p>核对零件顺序、方向、插入位置与锁紧要求。接头对正端口，支承本体，避免夹坏管子或让管身承受扭转。</p></li>
        <li><h3>固定走线并保留维护空间</h3><p>避免接口附近急弯、锐边、过紧夹持和持续拉力。设备运动或检修时，检查整个行程内的管路状态。</p></li>
        <li><h3>充液排气并检查完整液路</h3><p>按确认的介质与温压条件运行，检查漏液、进气、连接保持、流量和检测表现。异常时先停机卸压，再逐段排查。</p></li>
      </ol>
    </>)}
    {section(8, "troubleshooting", "流量、密封或检测结果异常，先查哪里？", <>
      <Table label={`${profile.name} 管使用异常排查`} headers={["问题现象", "先检查", "下一步"]} rows={profile.issues} />
    </>)}
    {section(9, "replacement", "旧管怎样替换，样件通过后采购需要固定哪些信息？", <>
      <p>{profile.replacement}</p>
      <p>根据实际运行和检查结果安排更换；发现开裂、明显磨损、永久变形、连接保持下降或接液性能变化时，先排查并更换受损部分。未使用的管子保留包装和批次标签，避免污染、挤压与过小盘绕。</p>
      <div className={guide.links}><Link href="/contact/">提交管长、两端接头与工况</Link></div>
    </>)}
    {section(10, "manufacturing", "对洁净度与尺寸一致性有要求，选管时看什么？", <TubingManufacturingContent locale={locale} />)}
  </div>, locale);
}
