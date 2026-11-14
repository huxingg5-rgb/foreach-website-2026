import Link from "next/link";
import dynamic from "next/dynamic";
import { probeDeliverySource, type ProbeGuide, type ProbeGuideRow } from "@/data/products/detail/probe-guide.zh";
import { probeHref, probeLang, probeText } from "@/data/products/detail/probe-guide.intl";
import { siteFooterData } from "@/data/site-footer";
import styles from "./ProbeDetailContent.module.css";

const ProbeAfterSalesForm = dynamic(() => import("./ProbeAfterSalesForm"));

function CheckTable({ rows, locale }: { rows: ProbeGuideRow[]; locale: string }) {
  const headings = [probeText("确认项", locale), probeText("需要核对的内容", locale)];
  return <div className={styles.tableWrap}><table className={styles.table}>
    <thead><tr>{headings.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
    <tbody>{rows.map(([title, text]) => <tr key={title}><th scope="row">{title}</th><td>{text}</td></tr>)}</tbody>
  </table></div>;
}

export function ProbeProductContent({ guide, specs, locale = "zh" }: { guide: ProbeGuide; specs: { label: string; value: string }[]; locale?: string }) {
  const t = (text: string) => probeText(text, locale);
  return <section lang={probeLang(locale)} className={styles.content} data-probe-content="product" aria-label={`${guide.name}: ${t("产品资料")}`}>
    <h2>{t("产品资料")}</h2>
    <p className={styles.lead}>{guide.task}</p>
    <p>{guide.structureNote}</p>
    <h3>{t("定制确认项")}</h3>
    <CheckTable locale={locale} rows={specs.map(item => [item.label, item.value])} />
    <p className={styles.note}>{t("本页展示定制方向与需求确认项。具体材质、尺寸、公差、表面处理和使用条件，以双方确认的图纸、样件及检验要求为准。")}</p>
    <section className={styles.section}>
      <h3>{t("图纸与配套资料")}</h3>
      <dl className={styles.rows}>
        <div><dt>{t("结构图纸或样品")}</dt><dd>{guide.drawingFocus}{" "}{t("可提供 2D 图纸、3D 文件或实物样品；资料不完整时，可先提供安装空间与任务说明。")}</dd></div>
        <div><dt>{t("使用与验收要求")}</dt><dd>{t("说明实际介质、清洗流程、设备动作与验收方法，区分结构尺寸确认和装机功能验证。")}</dd></div>
        <div><dt>{t("项目版本与交付资料")}</dt><dd>{t("定制产品的图纸、检验要求和随货资料按项目确认，样例照片中的尺寸、标签或附件不作为所有版本的供货依据。")}</dd></div>
      </dl>
      <Link className={styles.link} href={probeHref("/contact/#form", locale)}>{t("提交图纸与定制需求")}</Link>
    </section>
  </section>;
}

export function ProbeSelectionContent({ guide, locale = "zh" }: { guide: ProbeGuide; locale?: string }) {
  const t = (text: string) => probeText(text, locale);
  return <section lang={probeLang(locale)} className={styles.content} data-probe-content="selection" data-probe-guide={guide.slug} aria-label={`${guide.name}: ${t("选型与使用")}`}>
    <h2>{t("选型与使用")}</h2>
    <p className={styles.lead}>{guide.selectionLead}</p>
    <nav className={styles.guideNav} aria-label={`${guide.name}: ${t("使用指南目录")}`}>
      {guide.questions.map(question => <a key={question.id} href={`#probe-guide-${question.id}`}>{question.navLabel}</a>)}
    </nav>
    {guide.questions.map((question, index) => <section className={styles.section} id={`probe-guide-${question.id}`} data-probe-question={question.id} key={question.id}>
      <h3><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>{question.title}</h3>
      <p className={styles.answer}>{question.answer}</p>
      {question.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      {question.comparison ? <>
        <p className={styles.scrollHint}>{t("左右滑动表格，查看完整比较。")}</p>
        <div className={styles.tableWrap} role="region" aria-label={question.title} tabIndex={0}>
          <table className={`${styles.table} ${styles.comparison}`}>
            <thead><tr>{question.comparison.headings.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
            <tbody>{question.comparison.rows.map(([name, reason, choice]) => <tr key={name}><th scope="row">{name}</th><td>{reason}</td><td>{choice}</td></tr>)}</tbody>
          </table>
        </div>
      </> : null}
      {question.steps ? <ol className={styles.steps}>{question.steps.map(step => <li key={step.title}><h4>{step.title}</h4><p>{step.text}</p></li>)}</ol> : null}
      {question.note ? <p className={styles.note}>{question.note}</p> : null}
      {question.link ? <Link className={styles.link} href={question.link.href}>{question.link.label}</Link> : null}
    </section>)}
    <Link className={styles.link} href={probeHref("/contact/#form", locale)}>{probeText("带上现用图纸与现场现象，提交{product}选型需求", locale, { product: guide.name })}</Link>
  </section>;
}

const imageRoot = "/images/products/probes/delivery/";
function DeliveryPhoto({ file, alt, caption, locale }: { file: string; alt: string; caption: string; locale: string }) {
  return <figure>
    {/* Documentary packaging photographs retain their original composition and aspect ratio. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`${imageRoot}${file}`} alt={probeText(alt, locale)} width={1500} height={1125} loading="lazy" decoding="async" />
    <figcaption>{probeText(caption, locale)}</figcaption>
  </figure>;
}

export function ProbeDeliveryContent({ guide, locale = "zh" }: { guide: ProbeGuide; locale?: string }) {
  const t = (text: string) => probeText(text, locale);
  const region = probeLang(locale) === "zh-CN" ? "china" : "global";
  return <section lang={probeLang(locale)} className={styles.content} data-probe-content="delivery" data-probe-delivery-source={`${probeDeliverySource.documentId}:${probeDeliverySource.revision}`} aria-label={`${guide.name}: ${t("交付与售后")}`}>
    <h2>{t("交付与售后")}</h2>
    <p className={styles.lead}>{probeText("{product}按确认的图纸与配置交付，以下说明包装防护、随货资料、发货安排与售后支持。", locale, { product: guide.name })}</p>
    <p className={styles.note}>{t("照片为针组件包装实拍示例。线束、端子、防护套、内衬与装箱数量按具体产品配置安排；搅拌桨等不同结构产品采用相应防护方式。")}</p>
    <div className={styles.deliveryRow}>
      <div><h3><span className={styles.number}>01</span>{t("内包装")}</h3>
        <p>{t("单件防护：针组件单独装袋，实拍示例使用透明防护套保护细长针体。")}</p>
        <p>{t("标签核对：按包装标签核对型号、料号与数量，收货时结合订单确认。")}</p>
        <p>{t("附件整理：带线束、端子的版本按确认配置包装，避免运输中受拉或与针体相互挤压。")}</p>
      </div>
      <div className={styles.photos}>
        <DeliveryPhoto locale={locale} file="probe-individual-protective-bag.webp" alt="带标签的针组件独立装袋，透明防护套包覆细长针体" caption="单件装袋与针体防护" />
        <DeliveryPhoto locale={locale} file="probe-bag-and-identification-label.webp" alt="佩戴手套展示独立袋装针组件与产品标识标签" caption="包装标签核对（示例）" />
      </div>
    </div>
    <div className={styles.deliveryRow}>
      <div><h3><span className={styles.number}>02</span>{t("外包装与随货资料")}</h3>
        <p>{t("缓冲装箱：内袋平整放置，配合缓冲材料与外盒，减少碰撞、挤压和针体弯折。")}</p>
        <p>{t("装箱复核：核对产品、数量与包装状态，不同料号按交付要求区分。")}</p>
        <p>{t("随货资料：合格证、检验报告及其他项目资料按双方质量约定提供。")}</p>
      </div>
      <div className={styles.photos}>
        <DeliveryPhoto locale={locale} file="probe-bag-and-protective-carton.webp" alt="独立袋装针组件与长方形防护纸盒实拍" caption="内袋与外盒防护" />
        <DeliveryPhoto locale={locale} file="probe-bagged-components-in-cushioned-carton.webp" alt="多件带标签的袋装针组件平放在有缓冲材料的纸盒中" caption="缓冲装箱（示例）" />
      </div>
    </div>
    <div className={styles.deliveryRow}>
      <div><h3><span className={styles.number}>03</span>{t("发货与收货")}</h3>
        <p>{t("发货安排：按订单确认的交期、快递或运输方式安排发货，特殊交付需求请在下单时说明。")}</p>
        <p>{t("收货信息：发货前核对地址、收货人与联系方式；发货后提供物流信息。")}</p>
        <p>{t("到货核对：收货当日检查名称、数量与包装，按约定时间核对外形、尺寸和规格；发现异常及时联系。")}</p>
      </div>
      <div className={styles.photos}>
        <DeliveryPhoto locale={locale} file="probe-shipment-carton-packing.webp" alt="工作人员将产品内盒装入恒永达运输外箱" caption="运输外箱装箱实拍" />
        <DeliveryPhoto locale={locale} file="probe-sealed-shipment-cartons.webp" alt="已封箱的恒永达运输纸箱及箱外物料标识标签实拍" caption="封箱待发与箱外标识（实拍）" />
      </div>
    </div>
    <section className={styles.section}>
      <h3><span className={styles.number}>04</span>{t("保修与售后支持")}</h3>
      <dl className={styles.rows}>
        <div><dt>{t("保修期限")}</dt><dd>{t("针系列产品保修期为 12 个月，自产品首次销售之日起计算。")}</dd></div>
        <div><dt>{t("保修范围")}</dt><dd>{t("适用于产品工艺和材料缺陷。误用、擅自更改或改装、不符合安装与使用指引，以及正常磨损导致的问题不在保修范围内。")}</dd></div>
        <div><dt>{t("返厂与退换")}</dt><dd>{t("返厂前请先联系并取得许可，按要求清洗消毒、去除化学品等有害残留；退回的运费与风险由客户承担。定制品和非标产品不予退换，质量问题请先联系核实并按双方质量约定处理。")}</dd></div>
      </dl>
      <p>{t("联系邮箱：")}{" "}<a className={styles.link} href={siteFooterData.emailHref[region]}>{siteFooterData.email[region]}</a></p>
      <p>{t("联系电话：")}{" "}<a className={styles.link} href={siteFooterData.phoneHref[region]}>{siteFooterData.phone[region]}</a></p>
      <p>{t("服务时间：周一至周五 08:30–18:00（北京时间）。")}</p>
      <p>{t("可通过电话、邮件或下方表单联系售后，也可由您的业务负责人协助对接。")}</p>
    </section>
    <ProbeAfterSalesForm key={`${locale}:${guide.slug}`} locale={locale} productName={guide.name} />
  </section>;
}
