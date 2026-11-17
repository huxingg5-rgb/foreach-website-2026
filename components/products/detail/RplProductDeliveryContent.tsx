import type { InstrumentProductGuide } from "@/data/products/detail/instrument-product-guides.zh";
import { getRplDeliveryCopy } from "@/data/products/detail/rpl-product-delivery.intl";
import { getRplGuideUi } from "@/data/products/detail/rpl-guide-ui.intl";
import { siteFooterData } from "@/data/site-footer";
import InstrumentProductAfterSalesForm from "./InstrumentProductAfterSalesForm";
import styles from "./EaPumpDetailContent.module.css";

const root = "/images/products/pumps/valveless-pumps/delivery/";
const photoFiles = [
  ["valveless-pumps-foam-separated-packaging.webp", "valveless-pumps-protective-foam-cover.webp"],
  ["valveless-pumps-inspection-record.webp", "valveless-pumps-carton-identification.webp"],
  ["valveless-pumps-packaging-operation.webp", "valveless-pumps-sealed-shipping-carton.webp"],
] as const;

export default function RplProductDeliveryContent({ guide, locale }: { guide: InstrumentProductGuide; locale: string }) {
  const copy = getRplDeliveryCopy(locale);
  if (!copy) return null;
  const title = getRplGuideUi(locale).delivery;
  return <section lang={locale} className={styles.content} aria-label={`${guide.model} — ${title}`} data-instrument-product-delivery={guide.slug}>
    <h2>{title}</h2>
    <p className={styles.lead}>{guide.model}. {copy.lead}</p>
    {copy.rows.map((row, index) => <div className={styles.deliveryRow} key={row.title}>
      <div><h3><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>{row.title}</h3>{row.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
      <div className={styles.photos}>{row.photos.map(([alt, caption], photoIndex) => <figure key={photoFiles[index][photoIndex]}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Approved 4:3 packaging photographs. */}
        <img src={`${root}${photoFiles[index][photoIndex]}`} alt={alt} width={1500} height={1125} loading="lazy" decoding="async" style={{ objectFit: "cover" }} />
        <figcaption>{caption}</figcaption>
      </figure>)}</div>
    </div>)}
    <section className={styles.guideSection}>
      <h3><span className={styles.number}>04</span>{copy.warranty}</h3>
      {copy.warrantyParagraphs.map(text => <p key={text}>{text}</p>)}
      <p>{copy.email}: <a className={styles.contactLink} href={siteFooterData.emailHref.global}>{siteFooterData.email.global}</a></p>
      <p>{copy.phone}: <a className={styles.contactLink} href={siteFooterData.phoneHref.global}>{siteFooterData.phone.global}</a></p>
      <p>{copy.hours}</p><p>{copy.support}</p>
    </section>
    <InstrumentProductAfterSalesForm locale={locale} productModel={guide.model} productType="陶瓷柱塞泵" />
  </section>;
}
