import styles from "./FittingDeliveryZh.module.css";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { fittingView } from "@/components/products/detail/fitting-view";
import { fittingLocale } from "@/data/products/detail/fitting-ui.intl";
import { FITTING_DELIVERY_POLICY as policy, FITTING_DELIVERY_POLICY_SOURCE as source } from "@/data/products/detail/fitting-delivery.intl";
import { hindiProductDetailText } from "@/data/products/detail/product-detail.hi";
import { italianProductDetailText } from "@/data/products/detail/product-detail.it";
import { germanFittingDeliveryText } from "@/data/products/detail/fitting-delivery.de";
import { siteFooterData } from "@/data/site-footer";

// Keep the delivery section visible while its form loads on the first tab visit.
const FittingAfterSalesForm = dynamic(() => import("./FittingAfterSalesForm"), { loading: () => null });

const IMAGE_ROOT = "/images/products/fittings/quick-connect-fittings/q2001-pmv-sacn/delivery";

type DeliveryPhoto = {
  file: string;
  alt: string;
  caption: string;
};

type DeliveryGroup = {
  title: string;
  paragraphs: readonly ReactNode[];
  photos: readonly DeliveryPhoto[];
};

type FittingDeliveryContent = {
  introduction: string;
  imageRoot: string;
  groups: readonly DeliveryGroup[];
  warranty: string;
  support: string;
};

function fittingDeliveryGroups(isChinese: boolean): readonly DeliveryGroup[] {
  return [
    {
      title: "内包装",
      paragraphs: [
        "出厂检查：按对应产品的检验要求完成检查。",
        "分类装袋：不同型号分别包装。",
        "标签核对：核对型号、数量及批次信息。",
      ],
      photos: [
        { file: "bagged-fittings.webp", alt: "恒永达接头分袋包装示例，透明袋内可见接头实物", caption: "分类装袋" },
        { file: "packaging-label.webp", alt: "恒永达包装标签示例，显示型号 BT-24D-PP-N、数量及条码编号", caption: "标签核对" },
      ],
    },
    {
      title: "外包装",
      paragraphs: [
        "缓冲防护：固定内袋，减少碰撞与挤压。",
        "装箱复核：核对产品、数量和箱外标识。",
        "随货资料：根据需求准备合格证、检验报告等资料。",
      ],
      photos: [
        { file: "open-carton.webp", alt: "纸箱开箱状态，缓冲材料围护内袋并保持排列", caption: "缓冲装箱" },
        { file: "inspection-report.webp", alt: "纸箱内随附的出厂检验报告与袋装接头示例", caption: "随货资料（示例）" },
      ],
    },
    {
      title: "发货快递",
      paragraphs: [
        <><span>快递方式：</span>{isChinese ? "国内默认顺丰快递。" : policy.overseasShipping}</>,
        "发货前：确认收货信息、交付安排及特殊运输需求。",
        "发货后：提供物流信息，方便跟踪和收货。",
      ],
      photos: [
        { file: "carton-sealing.webp", alt: "工作人员在打包台使用胶带封箱", caption: "封箱打包" },
        { file: "sealed-carton-labels.webp", alt: "已封好的恒永达纸箱及箱外物料标识卡", caption: "封箱待发与箱外标签" },
      ],
    },
  ];
}

/** Shared packaging, regional courier and warranty information. */
export default function FittingDeliveryZh({
  locale = "zh",
  productModel = "",
  sectionId,
  content,
  germanDraft = false,
  contentLocale,
}: {
  locale?: string;
  productModel?: string;
  sectionId?: string;
  content?: FittingDeliveryContent;
  germanDraft?: boolean;
  contentLocale?: "it" | "hi";
}) {
  const isChinese = fittingLocale(locale) === "zh";
  const region = isChinese ? "domestic" : "overseas";
  const market = isChinese ? "china" : "global";
  const imageRoot = content?.imageRoot ?? IMAGE_ROOT;
  const groups = content?.groups ?? fittingDeliveryGroups(isChinese);

  return fittingView(
    <section id={sectionId} className={`${styles.delivery} ${styles.plainDelivery}`} aria-label="交付与售后" lang={germanDraft ? "de" : contentLocale === "hi" ? "hi-IN" : contentLocale ?? locale} data-fitting-delivery-region={region} data-fitting-delivery-source={`${source.documentId}:${source.revision}`}>
      <h2>交付与售后</h2>
      <p>{content?.introduction ?? "从出厂检查、分类包装到装箱复核，按您的交付需求安排发货。"}</p>

      {groups.map(({ title, paragraphs, photos }, index) => (
        <div className={styles.row} key={title}>
          <div>
            <h3><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>{title}</h3>
            {paragraphs.map((paragraph, position) => <p key={position}>{paragraph}</p>)}
          </div>
          <div className={styles.photos}>
            {photos.map(({ file, alt, caption }) => (
              <figure key={file}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${imageRoot}/${file}`} alt={alt} width={1000} height={750} loading="lazy" decoding="async" />
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      ))}

      <div className={`${styles.row} ${styles.singleRow}`}>
        <div>
          <h3><span className={styles.number}>{String(groups.length + 1).padStart(2, "0")}</span>{content ? "保修与售后" : "保修期"}</h3>
          <p><span>保修期限：</span>{content?.warranty ?? policy.warranty}</p>
          <p>联系邮箱：<a className={styles.contactLink} href={siteFooterData.emailHref[market]}>{siteFooterData.email[market]}</a>{isChinese ? "。" : "."}</p>
          <p>联系电话：<a className={styles.contactLink} href={siteFooterData.phoneHref[market]}>{siteFooterData.phone[market]}</a>{isChinese ? "。" : "."}</p>
          <p>{content?.support ?? "售后对接：可通过上述邮箱或电话联系我们，我们会协助对接相应售后人员；也可联系您的业务负责人协助安排。"}</p>
          <p>回复时间：工作日 08:30–18:00（北京时间）。可在线留言，我们会在24个工作小时内回复并跟进。</p>
        </div>
      </div>
      <FittingAfterSalesForm key={`${locale}:${productModel}`} productModel={productModel} locale={germanDraft ? "de" : contentLocale ?? locale} />
    </section>, locale, germanDraft ? germanFittingDeliveryText : contentLocale === "it" ? italianProductDetailText : contentLocale === "hi" ? hindiProductDetailText : undefined
  );
}
