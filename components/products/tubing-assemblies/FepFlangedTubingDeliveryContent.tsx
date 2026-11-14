import type { TubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";
import { getAssemblyDetailMedia } from "@/data/products/tubing-assemblies/detail-media";
import { assemblyDetailView } from "./assembly-detail-view";
import { siteFooterData } from "@/data/site-footer";
import type { ReactNode } from "react";
import deliveryPhotos from "@/data/products/tubing-assemblies/fep-delivery-photos.zh.json";
import styles from "../detail/FittingDeliveryZh.module.css";

type DeliveryPhotoData = {
  filename: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
};

function DeliveryPhoto({ photo, example = false, locale = "zh-CN" }: { photo: keyof typeof deliveryPhotos.photos; example?: boolean; locale?: TubingAssemblyLocale }) {
  const data: DeliveryPhotoData = deliveryPhotos.photos[photo];
  const { filename, width: originalWidth = deliveryPhotos.width, height: originalHeight = deliveryPhotos.height } = data;
  const image = getAssemblyDetailMedia(locale, photo, { src: `${deliveryPhotos.imageRoot}${filename}`, width: originalWidth, height: originalHeight, alt: data.alt, caption: example && !data.caption.endsWith("示例") ? `${data.caption}示例` : data.caption });
  const { src, alt, caption, width, height } = image;
  const visual = (
    // Static WebP assets preserve the complete photograph or example drawing.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
  );
  return (
    <figure data-fep-assembly-delivery-photo={photo}>
      {visual}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** Customer-facing delivery answers in the shared fitting layout. */
export default function FepFlangedTubingDeliveryContent({ productLabel = "FEP 翻边管组件", configurationVisual, examplePhotos = false, locale = "zh-CN" }: { productLabel?: string; configurationVisual?: ReactNode; examplePhotos?: boolean; locale?: TubingAssemblyLocale } = {}) {
  return assemblyDetailView(<section className={`${styles.delivery} ${styles.plainDelivery}`} data-assembly-content="delivery" data-fep-assembly-content={productLabel === "FEP 翻边管组件" ? "delivery" : undefined} data-fep-assembly-delivery-source="FR-QR-YX-011:A00" aria-label={`${productLabel}交付与售后`}>
    <h2>交付与售后</h2>
    <p>按确认配置完成出厂核对与包装，提供交付信息、随货资料及收货后的问题支持。</p>

    <div className={styles.row}>
      <div>
        <h3><span className={styles.number}>01</span>订单与图纸确认</h3>
        <p>交付依据：按双方确认的图纸和部件清单安排装配与交付。</p>
        <p>配置变更：长度、接头、附件或管标有调整时，同步更新确认版本，避免新旧配置混用。</p>
        <p>样品确认：有装机验证需求时，可先安排样品，确认配置后再衔接批量交付。</p>
      </div>
      <div className={styles.photos}>
        {configurationVisual ?? <><DeliveryPhoto photo="configurationExample" example={examplePhotos} /><DeliveryPhoto photo="drawingExample" example={examplePhotos} /></>}
      </div>
    </div>

    <div className={styles.row}>
      <div>
        <h3><span className={styles.number}>02</span>出厂检查</h3>
        <p>尺寸核对：按照确认图纸核对成品长度及关键连接尺寸。</p>
        <p>配置核对：核对 A/B 端接头、配套附件、管标及数量与确认清单一致。</p>
        <p>专项检验：压力、泄漏等特殊检验项目，在下单时约定测试条件和验收要求。</p>
      </div>
      <div className={styles.photos}>
        <DeliveryPhoto photo="endDimensionInspection" example={examplePhotos} />
        <DeliveryPhoto photo="lengthInspection" example={examplePhotos} />
      </div>
    </div>

    <div className={styles.row}>
      <div>
        <h3><span className={styles.number}>03</span>内包装与标识</h3>
        <p>分类包装：不同管径、长度及端部配置分开包装，便于收货后区分。</p>
        <p>标签识别：按包装标签核对物料编号、配置及数量，保留订单和标签信息，便于后续核查。</p>
        <p>分装要求：需要按套、按指定数量分装，或使用客户编号标签时，可在下单时说明。</p>
      </div>
      <div className={styles.photos}>
        <DeliveryPhoto photo="baggedAssemblies" example={examplePhotos} />
        <DeliveryPhoto photo="innerBox" example={examplePhotos} />
      </div>
    </div>

    <div className={styles.row}>
      <div>
        <h3><span className={styles.number}>04</span>外包装与运输防护</h3>
        <p>管路防护：按管长及端部结构安排固定与缓冲，减少运输中的折弯、挤压和接头磕碰。</p>
        <p>装箱复核：对照装箱清单核对交付配置、数量及外箱标识，便于到货清点。</p>
        <p>特殊要求：有洁净包装、限定装箱数量或其他运输防护要求时，可在订购时一并提出。</p>
      </div>
      <div className={styles.photos}>
        <DeliveryPhoto photo="foamProtection" example={examplePhotos} />
        <DeliveryPhoto photo="labeledBox" example={examplePhotos} />
      </div>
    </div>

    <div className={styles.row}>
      <div>
        <h3><span className={styles.number}>05</span>发货与随货资料</h3>
        <p>交期安排：样品与批量订单分别确认交付时间；加急或分批交货需求可在下单时一并提出。</p>
        <p>运输与运费：国内订单默认顺丰快递，包邮发货。下单时确认收货信息；需指定其他快递或特殊运输方式时，可提前与业务负责人沟通。</p>
        <p>物流跟踪：发货后提供物流信息，未按预计时间收到货物时，可联系业务负责人核查。</p>
        <p>随货资料：提供装箱清单，列明交付配置与数量；合格证、检验报告及材料文件按双方约定随货提供。</p>
      </div>
      <div className={styles.photos}>
        <DeliveryPhoto photo="packingList" example={examplePhotos} />
        <DeliveryPhoto photo="shipmentCartons" example={examplePhotos} />
      </div>
    </div>

    <div className={`${styles.row} ${styles.singleRow}`}><div>
      <h3><span className={styles.number}>06</span>收货与售后</h3>
      <p>收货核对：按装箱清单核对配置与数量，并检查包装、管身和端部状态。</p>
      <p>异常反馈：发现少件、错配或运输破损时，请保留外箱、包装标签和问题照片，联系业务负责人。我们会结合订单及交付记录核查，并反馈处理安排。</p>
      <p>使用支持：遇到安装或使用异常时，可提供配置编号、问题现象及介质、温度、压力等工况，便于核对端口、连接和使用条件。</p>
      <p>保修期限：管组件保修期为 12 个月，自产品首次销售之日起计算。</p>
      <p>保修范围：适用于工艺和材料缺陷；误用、擅自改动、未按规格及使用指引安装使用，以及正常磨损不在保修范围内。</p>
      <p>保质与贮存：产品保质期取决于材料和贮存条件，具体贮存要求可按所选配置确认。</p>
      <p>退回处理：退回产品前需先联系我们取得许可，并按要求清洗消毒、清除化学品等有害残留；定制品及非标产品不支持退换。</p>
      <p>联系邮箱：<a className={styles.contactLink} href={siteFooterData.emailHref.china}>{siteFooterData.email.china}</a></p>
      <p>联系电话：<a className={styles.contactLink} href={siteFooterData.phoneHref.china}>{siteFooterData.phone.china}</a></p>
    </div></div>
  </section>, locale, [DeliveryPhoto]);
}
