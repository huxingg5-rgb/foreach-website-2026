import styles from "./FittingDeliveryZh.module.css";
import dynamic from "next/dynamic";
import { fittingView } from "@/components/products/detail/fitting-view";
import { fittingLocale } from "@/data/products/detail/fitting-ui.intl";
import { FITTING_DELIVERY_POLICY as policy, FITTING_DELIVERY_POLICY_SOURCE as source } from "@/data/products/detail/fitting-delivery.intl";
import { siteFooterData } from "@/data/site-footer";

const FittingAfterSalesForm = dynamic(() => import("./FittingAfterSalesForm"));

const IMAGE_ROOT = "/images/products/fittings/quick-connect-fittings/q2001-pmv-sacn/delivery/";

function DeliveryPhoto({
  file,
  alt,
  caption,
}: {
  file: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure>
      {/* Static WebP assets are shared across fitting detail pages. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${IMAGE_ROOT}${file}`} alt={alt} width={1000} height={750} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** Shared packaging, regional courier and warranty information for all fittings. */
export default function FittingDeliveryZh({locale = "zh", productModel = ""}:{locale?:string; productModel?:string}) {
  const isChinese = fittingLocale(locale) === "zh";
  const region = isChinese ? "domestic" : "overseas";
  const market = isChinese ? "china" : "global";
  return fittingView(
    <section className={`${styles.delivery} ${styles.plainDelivery}`} aria-label="交付与售后" lang={locale} data-fitting-delivery-region={region} data-fitting-delivery-source={`${source.documentId}:${source.revision}`}>
      <h2>交付与售后</h2>
      <p>从出厂检查、分类包装到装箱复核，按您的交付需求安排发货。</p>

      <div className={styles.row}>
        <div>
          <h3><span className={styles.number}>01</span>内包装</h3>
          <p>出厂检查：按对应产品的检验要求完成检查。</p>
          <p>分类装袋：不同型号分别包装。</p>
          <p>标签核对：核对型号、数量及批次信息。</p>
        </div>
        <div className={styles.photos}>
          <DeliveryPhoto
            file="bagged-fittings.webp"
            alt="恒永达接头分袋包装示例，透明袋内可见接头实物"
            caption="分类装袋"
          />
          <DeliveryPhoto
            file="packaging-label.webp"
            alt="恒永达包装标签示例，显示型号 BT-24D-PP-N、数量及条码编号"
            caption="标签核对"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <h3><span className={styles.number}>02</span>外包装</h3>
          <p>缓冲防护：固定内袋，减少碰撞与挤压。</p>
          <p>装箱复核：核对产品、数量和箱外标识。</p>
          <p>随货资料：根据需求准备合格证、检验报告等资料。</p>
        </div>
        <div className={styles.photos}>
          <DeliveryPhoto
            file="open-carton.webp"
            alt="纸箱开箱状态，缓冲材料围护内袋并保持排列"
            caption="缓冲装箱"
          />
          <DeliveryPhoto
            file="inspection-report.webp"
            alt="纸箱内随附的出厂检验报告与袋装接头示例"
            caption="随货资料（示例）"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <h3><span className={styles.number}>03</span>发货快递</h3>
          <p><span>快递方式：</span>{isChinese ? "国内默认顺丰快递。" : policy.overseasShipping}</p>
          <p>发货前：确认收货信息、交付安排及特殊运输需求。</p>
          <p>发货后：提供物流信息，方便跟踪和收货。</p>
        </div>
        <div className={styles.photos}>
          <DeliveryPhoto
            file="carton-sealing.webp"
            alt="工作人员在打包台使用胶带封箱"
            caption="封箱打包"
          />
          <DeliveryPhoto
            file="sealed-carton-labels.webp"
            alt="已封好的恒永达纸箱及箱外物料标识卡"
            caption="封箱待发与箱外标签"
          />
        </div>
      </div>

      <div className={`${styles.row} ${styles.singleRow}`}>
        <div>
          <h3><span className={styles.number}>04</span>保修期</h3>
          <p><span>保修期限：</span>{policy.warranty}</p>
          <p>联系邮箱：<a className={styles.contactLink} href={siteFooterData.emailHref[market]}>{siteFooterData.email[market]}</a>{isChinese ? "。" : "."}</p>
          <p>联系电话：<a className={styles.contactLink} href={siteFooterData.phoneHref[market]}>{siteFooterData.phone[market]}</a>{isChinese ? "。" : "."}</p>
          <p>售后对接：可通过上述邮箱或电话联系我们，我们会协助对接相应售后人员；也可联系您的业务负责人协助安排。</p>
          <p>回复时间：工作日 08:30–18:00（北京时间）。可在线留言，我们会在24个工作小时内回复并跟进。</p>
        </div>
      </div>
      <FittingAfterSalesForm key={`${locale}:${productModel}`} productModel={productModel} locale={locale} />
    </section>, locale
  );
}
