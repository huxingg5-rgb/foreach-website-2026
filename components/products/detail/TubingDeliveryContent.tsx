import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import photos from "@/data/products/tubing/pvc-delivery-photos.zh.json";
import { siteFooterData } from "@/data/site-footer";
import { TubingContentPhoto } from "./TubingContentPhotos";
import delivery from "./FittingDeliveryZh.module.css";
import photoStyles from "./TubingContentPhotos.module.css";
import { tubingView } from "./tubing-view";
import { tubingHtmlLocale, tubingText } from "@/data/products/tubing/detail-locales";

const AfterSalesForm = dynamic(() => import("./FittingAfterSalesForm"));

function PhotoRow({ number, title, images = [], children, locale = "zh" }: { number: number; title: string; images?: (keyof typeof photos.photos)[]; children: ReactNode; locale?: string }) {
  return <div className={`${delivery.row}${images.length ? "" : ` ${delivery.singleRow}`}`}>
    <div><h3><span className={delivery.number}>{String(number).padStart(2, "0")}</span>{title}</h3>{children}</div>
    {images.length ? <div className={`${delivery.photos} ${photoStyles.deliveryPhotos}`}>{images.map(name => <TubingContentPhoto key={name} name={name} locale={locale} />)}</div> : null}
  </div>;
}

export default function TubingDeliveryContent({ locale = "zh" }: { locale?: string } = {}) {
  return tubingView(<section className={`${delivery.delivery} ${delivery.plainDelivery}`} lang={tubingHtmlLocale(locale)} aria-label="管子交付与售后" data-tubing-delivery="true" data-tubing-delivery-source="FR-QR-YX-011:A00">
    <h2>交付与售后</h2>
    <p>管子按型号盘卷装袋、盒装防护，标签便于收货清点与复购。发货后提供物流信息；收货或使用中遇到问题，可联系业务负责人，或通过本页联系方式和表单反馈。</p>
    <p className={photoStyles.note}>以下为包装与发货实拍示例。照片中的型号、长度及批次用于展示标识方式，实际交付按所选型号和订单安排。</p>

    <PhotoRow number={1} title="包装与标识" images={["baggedTubing", "openBox"]} locale={locale}>
      <p>发货前核对产品型号、数量或长度及包装标识。不同型号与规格分别盘卷装袋，方便收货清点。</p>
      <p>标签列明商品编码、型号、数量或长度及批次。保留标签与订单信息，后续补货或反馈问题时可据此查询。</p>
      <p>有指定分装数量、客户编号标签或特殊包装需求，可在下单时一并说明。</p>
    </PhotoRow>

    <PhotoRow number={2} title="盒装防护与使用说明" images={["usageInstructions", "closedBox"]} locale={locale}>
      <p>袋装管子入盒后，结合盘卷尺寸安排固定与缓冲，减少运输中的折弯、挤压和包装破损。盒型与装箱数量随订单安排。</p>
      <p>使用警示说明按对应产品提供，安装前请阅读其中的注意事项和用途限制。</p>
    </PhotoRow>

    <PhotoRow number={3} title="发货与物流" images={["cartonSealing", "shipmentCartons"]} locale={locale}>
      <p>交期与配送：样品和批量订单分别确认交期。国内订单默认顺丰快递，包邮发货。下单时确认收货信息；指定快递、加急或分批交货需求，请提前联系业务负责人。</p>
      <p>物流跟踪：发货后提供物流信息；未按预计时间收到货物时，请联系业务负责人，我们会协助核查。</p>
      <p>随货资料：按订单提供送货或装箱清单，便于清点型号与数量；合格证、检验报告及材料文件按对应产品和双方约定准备。</p>
    </PhotoRow>

    <PhotoRow number={4} title="保修与使用支持" locale={locale}>
      <p>保修期限：管子保修期为 12 个月，自产品首次销售之日起计算。</p>
      <p>使用支持：安装或运行异常时，可提供商品编码、批次、问题现象和照片，并说明介质、清洗条件、温度、压力或真空及配套接头。我们会协助核对管子、连接与使用条件，并按订单及质量约定对接后续处理。</p>
      <p>联系邮箱：<a className={delivery.contactLink} href={siteFooterData.emailHref.china}>{siteFooterData.email.china}</a></p>
      <p>联系电话：<a className={delivery.contactLink} href={siteFooterData.phoneHref.china}>{siteFooterData.phone.china}</a></p>
    </PhotoRow>
    <AfterSalesForm productModel={tubingText("管子", locale)} locale={locale} />
  </section>, locale);
}
