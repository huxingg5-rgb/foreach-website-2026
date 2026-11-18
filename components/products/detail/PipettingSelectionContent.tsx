import Image from "next/image";
import { smtp2OrderModels, smtpAdapters } from "@/data/products/configurator/instrument-inquiry";
import type { InstrumentProductGuide } from "@/data/products/detail/instrument-product-guides.zh";
import { smtp4SelectionModels } from "@/data/products/detail/pipetting-selection-guide.zh";
import { getSmtp2CadAssets } from "@/data/products/detail/smtp2-cad-assets";
import { getSmtp2Variant, smtp2Variants } from "@/data/products/detail/smtp2-variant-content";
import { getSmtp4CadAssets } from "@/data/products/detail/smtp4-cad-assets";
import { GuideBlock } from "./InstrumentGuideBlock";
import InstrumentGuideVisual from "./InstrumentGuideVisual";
import base from "./EaPumpDetailContent.module.css";
import styles from "./CompactInstrumentGuide.module.css";

// PS-130A-2507-00001-001, page 17, SMTP2 accessory ordering rows.
const smtp2Accessories = [
  ["SMTP2-CK", "侧装式防护罩", "729003"],
  ["SMTP2-W", "电源与信号线组（引线 200 mm）", "729005"],
  ["SMTP2-BK", "背装式防护罩", "729006"],
] as const;

function ModelSelection({ guide }: { guide: InstrumentProductGuide }) {
  const smtp2 = getSmtp2Variant(guide.slug);
  const smtp4 = smtp4SelectionModels.find(model => model.slug === guide.slug);
  const example = smtp2?.model ?? smtp4?.orderModel ?? smtp4SelectionModels[0].orderModel;
  const [series, suffix] = example.split("-");
  const segments = [
    [series, "系列"],
    [suffix[0], "标称容量"],
    [suffix[1], "吸头适配器"],
    [suffix[2], "适配直径"],
  ];
  const modelRows = smtp2 ? [
    ...smtp2Variants.map(variant => [variant.model, `移液泵 · ${variant.adapter}（${variant.lengthMm} mm）`, smtp2OrderModels[variant.model]] as const),
    ...smtp2Accessories,
  ] : smtp4SelectionModels.map(variant => [
    variant.orderModel ?? `SMTP4-${variant.capacityUl} μL`,
    `${variant.capacityUl} μL 气体置换式移液泵`,
  ] as const);
  const comparisons = smtp2 ? smtp2Variants.map(variant => ({
    model: variant.model,
    file: `${variant.slug}-adapter-comparison.webp`,
    label: `${variant.adapter} · ${variant.lengthMm} mm`,
    alt: `${variant.model} 实物及无防护罩 2D 局部图，标出 ${variant.adapter} 吸头适配器 ${variant.lengthMm} mm 的标称伸出长度`,
    drawing: getSmtp2CadAssets(variant.slug, "zh"),
  })) : smtp4SelectionModels.map(variant => ({
    model: `SMTP4-${variant.capacityUl} μL`,
    file: variant.preview,
    label: `CAD 高度 ${variant.heightMm} mm`,
    alt: `SMTP4-${variant.capacityUl} μL 的 CAD 安装视图，标注 ${variant.heightMm} mm 外形高度与安装孔位`,
    drawing: getSmtp4CadAssets(variant.slug, "zh"),
  }));

  return <section className={styles.subsection} data-smtp-model-selection={series.toLowerCase()}>
    <h3>{smtp2 ? "1.1 型号说明与订货" : "1.1 型号说明"}</h3>
    <p>以{smtp2 ? "当前型号" : "型号"} {example} 为例，按代码段识别系列、标称容量、吸头适配器和适配直径。</p>
    <div className={styles.modelCode} role="group" aria-label={`${example} 型号编码拆解`}>
      {segments.map(([code, label], index) => (
        <span className={styles.codeSegment} key={label}>
          {index === 1 && <span className={styles.codeDash} aria-hidden="true">-</span>}
          <span className={styles.codeValue}>{code}</span>
          <small>{label}</small>
        </span>
      ))}
    </div>
    <table className={styles.table} aria-label={`${series} 型号代码说明`}>
      <thead><tr><th scope="col">代码段</th><th scope="col">代码含义</th></tr></thead>
      <tbody>
        <tr><th scope="row">系列</th><td>{series} = {smtp2 ? "可编程" : ""}气体置换式移液泵</td></tr>
        <tr><th scope="row">标称容量</th><td>{smtp2 ? "5 = 1000 μL" : <div className={styles.adapterCodes}>
          {smtp4SelectionModels.map(({ capacityCode, capacityUl }) => <span key={capacityCode}>{capacityCode} = {capacityUl} μL</span>)}
        </div>}</td></tr>
        <tr><th scope="row">吸头适配器</th><td><div className={styles.adapterCodes}>
          {smtpAdapters.map(([code, adapter]) => <span key={code}>{code} = {adapter}</span>)}
        </div></td></tr>
        <tr><th scope="row">适配直径</th><td>0 = 默认适配直径</td></tr>
      </tbody>
    </table>

    <h4 className={styles.modelSubheading}>{smtp2 ? "吸头适配器伸出长度对比" : "安装外形对比"}</h4>
    <div className={smtp2 ? styles.adapterComparison : `${styles.adapterComparison} ${styles.mountingComparison}`}>
      {comparisons.map(({ model, file, alt, label, drawing }) => (
        <figure key={model}>
          <Image
            src={`/images/products/detail-guides/zh/${file}`}
            alt={alt}
            width={smtp2 ? 632 : 480}
            height={smtp2 ? 660 : 972}
          />
          <figcaption>
            <span>{model}</span><span>{label}</span>
            {drawing && <a href={drawing.drawingPdfUrl} aria-label={`查看 ${model} 2D 图纸`}>2D 图纸</a>}
          </figcaption>
        </figure>
      ))}
    </div>
    <p className={styles.note}>{smtp2
      ? "左侧为实物照片，右侧为同一比例的 CAD 局部投影。标注采用规格书中的标称伸出长度。"
      : "三图为同一比例的 CAD 安装视图。100 μL 与 250 μL 的源 STEP 外形一致。请按订单配置核对安装尺寸和接口。"}</p>

    <h4 className={styles.modelSubheading}>{smtp2 ? "订货信息" : "型号与规格对照"}</h4>
    <table className={smtp2 ? `${styles.table} ${styles.orderTable}` : styles.table} aria-label={smtp2 ? "SMTP2 泵与配件订货信息" : "SMTP4 型号与规格对照"}>
      <thead><tr><th scope="col">型号</th>{smtp2 && <th scope="col">订货料号</th>}<th scope="col">名称与规格</th></tr></thead>
      <tbody>{modelRows.map(([model, description, code]) => (
        <tr key={model}><th scope="row">{model}</th>{smtp2 && <td>{code}</td>}<td>{description}</td></tr>
      ))}</tbody>
    </table>
  </section>;
}

export default function PipettingSelectionContent({ guide }: { guide: InstrumentProductGuide }) {
  const [smtp2, smtp4, currentModel] = guide.features;
  const volume = guide.sections.find(section => section.id === "volume");
  const installation = guide.sections.filter(section => section.id === "tips" || section.id === "control");
  const verification = guide.sections.filter(section => section.id === "commissioning" || section.id === "care");

  return <section
    lang="zh-CN"
    className={base.content + " " + styles.guide}
    aria-label={guide.model + " 选型与使用"}
    data-instrument-selection-guide={guide.slug}
    data-instrument-guide-family={guide.family}
    data-pipetting-selection-content
  >
    <section className={styles.phase} data-selection-phase="selection">
      <h2>1 选型与配置</h2>
      <p>{currentModel[0]}<br />{currentModel[1]}</p>
      <p>{guide.lead}</p>
      <table className={styles.table} aria-label="SMTP2 与 SMTP4 选型对照">
        <thead><tr><th scope="col">选型方向</th><th scope="col">模块功能与设备要求</th></tr></thead>
        <tbody>{[smtp2, smtp4].map(([label, text]) => (
          <tr key={label}><th scope="row">{label}</th><td>{text}</td></tr>
        ))}</tbody>
      </table>
      <ModelSelection guide={guide} />
      {volume && <GuideBlock section={volume} number="1.2" />}
    </section>
    <section className={styles.phase} data-selection-phase="installation">
      <h2>2 装机与接入</h2>
      {installation.map((section, index) => (
        <GuideBlock key={section.id} section={section} number={`2.${index + 1}`}>
          {guide.family === "smtp4" && section.id === "control" && <InstrumentGuideVisual family="smtp4" section="control" model={guide.model} />}
        </GuideBlock>
      ))}
    </section>
    {verification.map((section, index) => <GuideBlock key={section.id} section={section} heading="h2" number={String(index + 3)} />)}
  </section>;
}
