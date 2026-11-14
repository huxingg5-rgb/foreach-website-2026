import { getPistonPumpSpecNotes, type PistonPumpGuide } from "@/data/products/detail/piston-pump-guide.zh";
export { default as EaPumpSelectionContent } from "./EaPumpSelectionContent";
import { pistonView } from "./piston-view";
import { siteFooterData } from "@/data/site-footer";
import EaPumpAfterSalesForm from "./EaPumpAfterSalesForm";
import styles from "./EaPumpDetailContent.module.css";

export function PistonPumpSpecNotes({ guide, locale = "zh" }: { guide: PistonPumpGuide; locale?: string }) {
  return pistonView(
    <div className={styles.specNotes}>
      {getPistonPumpSpecNotes(guide).map((note) => <p key={note}>{note}</p>)}
    </div>, locale
  );
}

const imageRoot = "/images/products/pumps/plunger-pump/ea/delivery/";

function DeliveryPhoto({ file, alt, caption }: { file: string; alt: string; caption: string }) {
  return <figure>
    {/* Documentary photographs supplied by the user; retain the complete image. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`${imageRoot}${file}`} alt={alt} width={1500} height={1125} loading="lazy" decoding="async" />
    <figcaption>{caption}</figcaption>
  </figure>;
}

export function PistonPumpDeliveryContent({ guide, locale = "zh" }: { guide: PistonPumpGuide; locale?: string }) {
  const region = locale === "zh" ? "china" : "global";
  return pistonView(
    <section lang={locale === "zh" ? "zh-CN" : locale} className={styles.content} aria-label={`${guide.model} 交付与售后`} data-piston-pump-delivery={guide.model}>
      <h2>交付与售后</h2>
      <p className={styles.lead}>{guide.model} 按确认的型号与配置交付，以下说明包装防护、随货资料、发货安排及售后支持。{guide.series !== "EA" ? "包装照片为 EA 系列实拍示例，实际内衬、附件和装箱数量按当前产品配置安排。" : ""}</p>
      <div className={styles.deliveryRow}>
        <div>
          <h3><span className={styles.number}>01</span>内包装</h3>
          <p>产品防护：泵体采用分隔泡棉固定，减少运输中的碰撞与挤压。</p>
          <p>配套附件：线束及其他附件按确认配置提供，与泵体分区放置。</p>
          <p>产品标识：泵体标签便于核对容量、料号及产品追溯信息。</p>
        </div>
        <div className={styles.photos}>
          <DeliveryPhoto file="ea-pump-cushioned-carton.webp" alt="EA 系列柱塞泵与线束分区放置在泡棉中的内包装实拍" caption="泵体与附件包装" />
          <DeliveryPhoto file="ea-500ul-pump-label-and-carton.webp" alt="佩戴手套展示标有 500 μL 的 EA 柱塞泵及品牌包装盒" caption="产品标签" />
        </div>
      </div>
      <div className={styles.deliveryRow}>
        <div>
          <h3><span className={styles.number}>02</span>外包装与随货资料</h3>
          <p>缓冲装箱：泡棉内衬与外箱配合，保护泵体及配套附件。</p>
          <p>接线资料：随货接线资料对应实际供货版本，便于核对电机和光耦接线。</p>
          <p>质量文件：合格证、检验报告等按项目质量约定提供。</p>
        </div>
        <div className={styles.photos}>
          <DeliveryPhoto file="ea-pump-protective-foam-cover.webp" alt="柱塞泵包装盒内部覆盖的白色泡棉保护层" caption="缓冲防护" />
          <DeliveryPhoto file="ea-pump-carton-with-wiring-guide.webp" alt="EA 系列柱塞泵分隔装箱并放置柱塞泵接口接线指南的实拍" caption="随货接线资料" />
        </div>
      </div>
      <div className={styles.deliveryRow}>
        <div>
          <h3><span className={styles.number}>03</span>发货快递</h3>
          <p>快递方式：按订单确认的快递或运输方式发货。</p>
          <p>交付安排：按确认的订单交期安排发货；特殊交付需求可在下单时说明。</p>
          <p>物流跟踪：发货后提供物流信息，便于跟踪和安排收货。</p>
        </div>
        <div className={styles.photos}>
          <DeliveryPhoto file="ea-pump-carton-sealing.webp" alt="工作人员在打包台使用胶带封装恒永达柱塞泵纸箱" caption="封箱打包" />
          <DeliveryPhoto file="ea-pump-sealed-carton-labels.webp" alt="恒永达封箱待发的纸箱及箱外物料标识卡" caption="外箱标识" />
        </div>
      </div>
      <section className={styles.guideSection}>
        <h3><span className={styles.number}>04</span>保修与售后支持</h3>
        <p>保修期限：泵产品保修期为 18 个月，自产品首次销售之日起计算。</p>
        <p>保修范围：适用于产品工艺和材料缺陷；误用、擅自改装、不符合安装与使用要求，以及正常磨损导致的问题不在保修范围内。</p>
        <p>联系邮箱：<a className={styles.contactLink} href={siteFooterData.emailHref[region]}>{siteFooterData.email[region]}</a></p>
        <p>联系电话：<a className={styles.contactLink} href={siteFooterData.phoneHref[region]}>{siteFooterData.phone[region]}</a></p>
        <p>服务时间：周一至周五 08:30–18:00（北京时间）。</p>
        <p>售后对接：可通过电话、邮件或下方表单联系我们，也可联系您的业务负责人协助安排。</p>
      </section>
      <EaPumpAfterSalesForm locale={locale} productModel={guide.model} />
    </section>, locale
  );
}
