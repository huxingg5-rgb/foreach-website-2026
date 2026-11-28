import {
  getInstrumentProductGuide,
  type GuideFigure,
  type GuideSection,
  type InstrumentProductGuide,
} from "@/data/products/detail/instrument-product-guides.zh";
import { getChinesePipettingSelectionGuide } from "@/data/products/detail/pipetting-selection-guide.zh";
import { instrumentDetailProfiles, getInstrumentDeliveryRows } from "@/data/products/detail/instrument-detail-content.zh";
import { siteFooterData } from "@/data/site-footer";
import figureSizes from "@/data/products/detail/instrument-guide-figures.generated.json";
import rplFigureSizes from "@/data/products/detail/rpl-guide-figures.intl.generated.json";
import instrumentFigureSizes from "@/data/products/detail/instrument-guide-figures.intl.generated.json";
import { getLocalizedRplGuide } from "@/data/products/detail/rpl-product-guides.intl";
import { getLocalizedInstrumentGuide } from "@/data/products/detail/instrument-product-guides.intl";
import type { InstrumentDeliveryLocale } from "@/data/products/detail/instrument-delivery.intl";
import { getInstrumentRatioCopy } from "@/data/products/detail/instrument-guide-locales/figures";
import { getRplGuideUi } from "@/data/products/detail/rpl-guide-ui.intl";
import deliveryPhotoSets from "@/data/products/detail/instrument-delivery-photos.zh.json";
import PipettingSelectionContent from "./PipettingSelectionContent";
import InstrumentSelectionGuideContent from "./InstrumentSelectionGuideContent";
import InstrumentProductAfterSalesForm from "./InstrumentProductAfterSalesForm";
import RplProductDeliveryContent from "./RplProductDeliveryContent";
import InstrumentLocalizedDeliveryContent from "./InstrumentLocalizedDeliveryContent";
import InstrumentGuideVisual, { isNativeInstrumentFigure } from "./InstrumentGuideVisual";
import base from "./EaPumpDetailContent.module.css";
import styles from "./InstrumentProductSections.module.css";

function GuideFigures({ figures, wide = false, locale = "zh" }: { figures: readonly GuideFigure[]; wide?: boolean; locale?: string }) {
  if (!figures.length) return null;
  const localized = locale !== "zh" && locale !== "zh-CN";
  const dimensions: Record<string, { width: number; height: number }> = localized ? { ...rplFigureSizes, ...instrumentFigureSizes } : figureSizes;
  const imageHref = (file: string) => `/images/products/detail-guides/${localized ? file in instrumentFigureSizes ? "instrument-intl" : "rpl-intl" : "zh"}/${file}`;
  const ui = getRplGuideUi(locale);
  return <div className={[styles.figures, figures.length > 1 ? styles.figuresPaired : "", wide ? styles.figuresWide : ""].filter(Boolean).join(" ")}>
    {figures.map(figure => <figure className={styles.figure} key={figure.file}>
      <a href={imageHref(figure.file)} target="_blank" rel="noreferrer" aria-label={`${ui.enlarge}${figure.alt}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageHref(figure.file)} alt={figure.alt}
          width={dimensions[figure.file].width}
          height={dimensions[figure.file].height} loading="lazy" decoding="async" />
      </a>
      <figcaption>{figure.caption}{figure.legend?.length ? <ul className={styles.figureLegend}>{figure.legend.map(text => <li key={text}>{text}</li>)}</ul> : null}</figcaption>
    </figure>)}
  </div>;
}

function RatioDiagram({ concentrate, diluent, locale = "zh" }: { concentrate: number; diluent: number; locale?: string }) {
  const total = concentrate + diluent;
  const parts = diluent / concentrate;
  const copy = getInstrumentRatioCopy(locale);
  const chinese = locale === "zh" || locale === "zh-CN";
  return <div className={styles.ratio} data-drpl-ratio-diagram="true">
    <dl className={styles.ratioValues}>
      <div><dt>{copy.concentrate} A</dt><dd>{concentrate} μL{copy.perRev}</dd></div>
      <div><dt>{copy.diluent} B</dt><dd>{diluent} μL{copy.perRev}</dd></div>
      <div><dt>{copy.nominal}</dt><dd>{(total / 1000).toFixed(1)} mL{copy.perRev}</dd></div>
    </dl>
    <p className={styles.ratioLegend}>{copy.ratio} · 1:{parts}</p>
    <p className={styles.note}>{chinese ? `${concentrate} μL 浓缩液 + ${diluent} μL 稀释液，名义合计 ${(total / 1000).toFixed(1)} mL。混合均匀性由下游混合过程验证。` : `${concentrate} μL ${copy.concentrate} + ${diluent} μL ${copy.diluent}; ${copy.nominal} ${(total / 1000).toFixed(1)} mL. ${copy.validation}`}</p>
  </div>;
}

function SelectionSection({ section, guide, locale = "zh" }: { section: GuideSection; guide: InstrumentProductGuide; locale?: string }) {
  const figures = (section.figures ?? (section.figure ? [section.figure] : [])).filter(figure => !isNativeInstrumentFigure(figure.file));
  const split = section.layout === "split" && figures.length === 1;
  const layout = split ? "split" : figures.length > 1 ? "gallery" : section.layout === "wide" ? "wide" : "standard";
  const ui = getRplGuideUi(locale);
  return <section className={styles.section} data-instrument-guide-section={section.id} data-instrument-section-layout={layout}>
    <h2>{section.title}</h2>
    <div className={split ? styles.illustrated : undefined}>
      {split ? <GuideFigures figures={figures} locale={locale} /> : null}
      <div className={split ? styles.explanation : undefined}>
        <p>{section.intro}</p>
        <InstrumentGuideVisual family={guide.family} section={section.id} model={guide.model} locale={locale} />
        {section.ratioDiagram ? <RatioDiagram {...section.ratioDiagram} locale={locale} /> : null}
        {!split ? <GuideFigures figures={figures} wide={section.layout === "wide"} locale={locale} /> : null}
        {section.rows ? split ? <dl className={styles.details}>
          {section.rows.map(([title, value, explanation]) => <div key={title}>
            <dt>{title}</dt><dd><strong>{value}</strong><p>{explanation}</p></dd>
          </div>)}
        </dl> : <>
          <p className={styles.tableHint}>{ui.tableHint}</p>
          <div className={base.tableWrap} role="region" aria-label={section.title} tabIndex={0}>
            <table className={styles.table}>
              <thead><tr>{ui.headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead>
              <tbody>{section.rows.map(([title, value, explanation]) => <tr key={title}><th scope="row">{title}</th><td data-label={ui.headers[1]}>{value}</td><td data-label={ui.headers[2]}>{explanation}</td></tr>)}</tbody>
            </table>
          </div>
        </> : null}
        {section.steps ? <ol className={styles.steps}>{section.steps.map(([title, description]) => <li key={title}><h3>{title}</h3><p>{description}</p></li>)}</ol> : null}
      </div>
    </div>
    {section.note ? <p className={styles.note}>{section.note}</p> : null}
    {section.links?.length ? <p className={styles.reading}>{ui.reading}{section.links.map((link, index) => <span key={link.href}>{index ? " · " : ""}<a href={link.href}>{link.label}</a></span>)}</p> : null}
  </section>;
}

export function InstrumentProductSelectionContent({ guide, locale = "zh" }: { guide: InstrumentProductGuide; locale?: string }) {
  return <div lang={locale === "zh" ? "zh-CN" : locale} className={`${base.content} ${styles.guide}`} data-instrument-selection-guide={guide.slug} data-instrument-guide-family={guide.family}>
    <section className={styles.section}>
      <h2>{getRplGuideUi(locale).features}</h2>
      <p className={base.lead}>{guide.lead}</p>
      <div className={styles.featureGrid}>{guide.features.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    {guide.sections.map(section => <SelectionSection key={section.id} section={section} guide={guide} locale={locale} />)}
  </div>;
}

const imageRoot = "/images/products/pumps/plunger-pump/ea/delivery/";
type DeliveryPhoto = readonly [file: string, alt: string, caption: string, height?: number];
const valvelessPackagingPhotos: readonly (readonly DeliveryPhoto[])[] = [
  [
    ["valveless-pumps-foam-separated-packaging.webp", "无阀泵产品与线束分区放置在泡棉内衬中的包装实拍", "产品与线束分隔防护"],
    ["valveless-pumps-protective-foam-cover.webp", "无阀泵外箱内覆盖在产品上方的泡棉保护盖板", "泡棉盖板保护"],
  ],
  [
    ["valveless-pumps-inspection-record.webp", "无阀泵出厂检验记录装袋后随箱放置的实拍", "随货检验记录"],
    ["valveless-pumps-carton-identification.webp", "无阀泵纸箱上的物料标识卡和外箱追溯标识", "外箱物料与追溯标识"],
  ],
  [
    ["valveless-pumps-packaging-operation.webp", "工作人员在包装台进行无阀泵装箱检查的实拍", "包装作业"],
    ["valveless-pumps-sealed-shipping-carton.webp", "恒永达无阀泵外箱封箱待发状态实拍", "封箱待发"],
  ],
];
const packagingRows = [
  {
    title: "内包装", paragraphs: [
      "产品防护：根据确认的产品结构安排泡棉、分隔或其他防护，减少运输中的碰撞与挤压。",
      "配套附件：线束和其他附件按确认配置提供，与产品妥善分区放置。",
      "产品标识：收货时核对型号、料号、数量与追溯信息。",
    ],
    photos: [
      ["ea-pump-cushioned-carton.webp", "EA 柱塞泵与线束分区放置在泡棉中的包装实拍", "泡棉分隔包装示例"],
      ["ea-500ul-pump-label-and-carton.webp", "EA 500 μL 柱塞泵与包装盒标签实拍", "产品标签示例"],
    ],
  },
  {
    title: "外包装与随货资料", paragraphs: [
      "缓冲装箱：内衬与外箱配合保护产品及配套附件，装箱数量按订单安排。",
      "使用资料：接线、安装和使用资料按实际供货版本及订单约定提供。",
      "质量文件：合格证、检验报告等按项目质量约定提供。",
    ],
    photos: [
      ["ea-pump-protective-foam-cover.webp", "柱塞泵包装盒内泡棉保护层实拍", "缓冲防护示例"],
      ["ea-pump-carton-with-wiring-guide.webp", "EA 柱塞泵包装盒与随货接线资料实拍", "随货资料示例"],
    ],
  },
  {
    title: "发货与收货核对", paragraphs: [
      "发货安排：按确认的订单交期及快递或运输方式安排发货，发货后提供物流信息。",
      "收货核对：核对型号、数量和包装状态；如发现运输损伤或缺件，保留包装及照片并及时联系。",
      "资料确认：尺寸、配置及质量要求按订单或质量约定验收，特殊交付需求在下单时说明。",
    ],
    photos: [
      ["ea-pump-carton-sealing.webp", "工作人员在打包台封装柱塞泵纸箱的实拍", "封箱打包示例"],
      ["ea-pump-sealed-carton-labels.webp", "恒永达柱塞泵封箱待发纸箱及外箱标识实拍", "外箱标识示例"],
    ],
  },
] as const;

export function InstrumentProductDeliveryContent({ guide }: { guide: InstrumentProductGuide }) {
  const isValveless = guide.family === "rpl" || guide.family === "drpl";
  const isPipetting = guide.family === "smtp2" || guide.family === "smtp4";
  const deliveryCopy = getInstrumentDeliveryRows(guide.family);
  const compact = isPipetting || Boolean(deliveryCopy);
  const productPackaging = Object.values(deliveryPhotoSets).find(group =>
    (group.slugs as string[]).includes(guide.slug) || (group.families as string[]).includes(guide.family));
  const photoRoot = productPackaging?.imageRoot ?? (isValveless ? "/images/products/pumps/valveless-pumps/delivery/" : imageRoot);
  const rows = productPackaging?.rows.map((row, index) => ({ ...row,
    ...("copyZh" in row ? row.copyZh : {}),
    ...deliveryCopy?.[index],
    photos: row.photos.map(({ file, alt, caption }) => [file, alt, caption] as const),
  })) ?? packagingRows;
  const localizedIntro = deliveryCopy ? `${guide.model} 按订单确认的型号、数量和配置交付。`
    : productPackaging && "introZh" in productPackaging ? productPackaging.introZh : productPackaging?.intro;
  const packagingIntro = localizedIntro ?? (isValveless
    ? "以下为无阀泵系列包装实拍，内衬、附件、装箱数量和随货资料按订单配置安排。"
    : "以下包装照片为 EA 系列柱塞泵实拍示例，实际产品的内衬、附件、装箱数量和随货资料按订单配置安排。");
  return <section lang="zh-CN" className={compact ? `${base.content} ${base.compactDelivery}` : base.content} aria-label={`${guide.model} 交付与售后`} data-instrument-product-delivery={guide.slug}>
    <h2>交付与售后</h2>
    <p className={base.lead}>{productPackaging ? packagingIntro : `${guide.model} 按确认的型号与配置交付。${packagingIntro}`}</p>
    {rows.map((row, index) => {
      const photos: readonly DeliveryPhoto[] = isValveless ? valvelessPackagingPhotos[index] : row.photos;
      return <div className={base.deliveryRow} key={row.title}>
      <div><h3><span className={base.number}>{String(index + 1).padStart(2, "0")}</span>{row.title}</h3>{row.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
      <div className={base.photos}>{photos.map(([file, alt, caption, height = 1125]) => <figure key={file}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${photoRoot}${file}`} alt={alt} width={1500} height={height} loading="lazy" decoding="async" style={isValveless ? { objectFit: "cover" } : undefined} />
        <figcaption>{caption}</figcaption>
      </figure>)}</div>
    </div>; })}
    <section className={base.guideSection}>
      <h3><span className={base.number}>04</span>保修与售后支持</h3>
      <p>保修期限：{guide.pump ? "泵产品保修期为 18 个月" : "阀及检测模块等其他产品保修期为 12 个月"}，自产品首次销售之日起计算。</p>
      {!compact && <>
        <p>保修范围：适用于产品工艺和材料缺陷；误用、擅自改装、不符合安装与使用要求，以及正常磨损导致的问题不在保修范围内。</p>
        <p>返厂处理：请先联系并获得许可，再按确认要求退回。接液产品需清除化学品及其他有害残留；退回包装、附件、费用与风险按销售条款和双方确认的方案处理。定制品及非标产品的退换按销售条款执行。</p>
      </>}
      <p>联系邮箱：<a className={base.contactLink} href={siteFooterData.emailHref.china}>{siteFooterData.email.china}</a></p>
      <p>联系电话：<a className={base.contactLink} href={siteFooterData.phoneHref.china}>{siteFooterData.phone.china}</a></p>
      <p>服务时间：周一至周五 08:30–18:00（北京时间）。</p>
      <p>售后对接：可通过电话、邮件、下方表单或您的业务负责人联系，说明型号、使用条件与主要问题。</p>
    </section>
    <InstrumentProductAfterSalesForm productModel={guide.model} productType={guide.productType} />
  </section>;
}

/** Compose on the server and retain existing RPL translations verbatim. */
export function getInstrumentProductSections(slug: string, locale = "zh") {
  if (locale !== "zh" && locale !== "zh-CN") {
    const localizedGuide = getLocalizedRplGuide(slug, locale) || getLocalizedInstrumentGuide(slug, locale);
    if (!localizedGuide) return {};
    return {
      customerCategoryMode: "instrument-product" as const,
      customerCategoryUi: getRplGuideUi(locale),
      customerCategoryContent: {
        selection: instrumentDetailProfiles[localizedGuide.family]
          ? <InstrumentSelectionGuideContent guide={localizedGuide} locale={locale} />
          : <InstrumentProductSelectionContent guide={localizedGuide} locale={locale} />,
        delivery: localizedGuide.family === "rpl" || localizedGuide.family === "drpl"
          ? <RplProductDeliveryContent guide={localizedGuide} locale={locale} />
          : <InstrumentLocalizedDeliveryContent guide={localizedGuide} locale={locale as InstrumentDeliveryLocale} />,
      },
    };
  }
  const guide = getInstrumentProductGuide(slug);
  if (!guide) return {};
  return {
    customerCategoryMode: "instrument-product-zh" as const,
    customerCategoryContent: {
      selection: guide.family === "smtp2" || guide.family === "smtp4"
        ? <PipettingSelectionContent guide={getChinesePipettingSelectionGuide(guide)} />
        : instrumentDetailProfiles[guide.family]
          ? <InstrumentSelectionGuideContent guide={guide} />
          : <InstrumentProductSelectionContent guide={guide} />,
      delivery: <InstrumentProductDeliveryContent guide={guide} />,
    },
  };
}

/** Chinese-only corrections needed to keep the new guide and current standard sheet consistent. */
export function applyInstrumentProductChineseSpecs<T extends { slug: string; specs: { label: string; value: string }[]; advantages?: string[] }>(data: T): T {
  if (data.slug !== "pdm5-pressure-sensor") return data;
  const updates: Record<string, string> = {
    "压力范围": "10–200／400／700／1200 kPa（四档绝压量程）",
    "绝对总误差": "<2／4／7／10 kPa（分别对应上述量程）",
    "推荐接头扭矩": "0.32–0.4 N·m",
    "工作温度": "0–70 ℃",
    "压力分辨率": "5 Pa",
    "默认采样率": "按供货固件和采样设置确认",
    "最高采样率": "有效采集速率 100 Hz（按标准规格）",
  };
  return {
    ...data,
    specs: data.specs.map(row => ({ ...row, value: updates[row.label] ?? row.value })),
    advantages: data.advantages?.map(value => value === "压力分辨率优于 5 Pa" ? "压力分辨率 5 Pa"
      : value === "默认采样率 37.5 Hz，最高可调至 100 Hz" ? "有效采集速率 100 Hz，采样设置按供货固件确认" : value),
  };
}
