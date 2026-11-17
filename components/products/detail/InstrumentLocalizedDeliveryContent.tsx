import type { InstrumentProductGuide } from "@/data/products/detail/instrument-product-guides.zh";
import { getInstrumentDeliveryCommon, getInstrumentDeliveryPhotos } from "@/data/products/detail/instrument-delivery.intl";
import { getRplDeliveryCopy } from "@/data/products/detail/rpl-product-delivery.intl";
import { getRplGuideUi } from "@/data/products/detail/rpl-guide-ui.intl";
import type { InstrumentGuideLocale } from "@/data/products/detail/instrument-product-guides.intl";
import { siteFooterData } from "@/data/site-footer";
import InstrumentProductAfterSalesForm from "./InstrumentProductAfterSalesForm";
import styles from "./EaPumpDetailContent.module.css";

export default function InstrumentLocalizedDeliveryContent({ guide, locale }: { guide: InstrumentProductGuide; locale: InstrumentGuideLocale }) {
  const photos = getInstrumentDeliveryPhotos(guide.slug, guide.family, locale);
  const support = getRplDeliveryCopy(locale);
  if (!photos || !support) return null;
  const copy = getInstrumentDeliveryCommon(locale);
  const title = getRplGuideUi(locale).delivery;
  const warranty = guide.pump ? support.warrantyParagraphs : [copy.otherWarranty, ...support.warrantyParagraphs.slice(1)];
  return <section lang={locale} className={styles.content} aria-label={`${guide.model} — ${title}`}
    data-instrument-product-delivery={guide.slug} data-instrument-delivery-source="FR-QR-YX-011:A00">
    <h2>{title}</h2>
    <p className={styles.lead}>{photos.intro}</p>
    {photos.rows.map((row, index) => <div className={styles.deliveryRow} key={row.title}>
      <div><h3><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>{row.title}</h3>
        {row.paragraphs.map(text => <p key={text}>{text}</p>)}
      </div>
      <div className={styles.photos}>{row.photos.map(photo => <figure key={photo.file}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Preserve approved packaging image assets. */}
        <img src={`${photos.imageRoot}${photo.file}`} alt={photo.alt} width={1500} height={1125} loading="lazy" decoding="async" />
        <figcaption>{photo.caption}</figcaption>
      </figure>)}</div>
    </div>)}
    <section className={styles.guideSection}>
      <h3><span className={styles.number}>04</span>{support.warranty}</h3>
      {warranty.map(text => <p key={text}>{text}</p>)}
      <p>{support.email}: <a className={styles.contactLink} href={siteFooterData.emailHref.global}>{siteFooterData.email.global}</a></p>
      <p>{support.phone}: <a className={styles.contactLink} href={siteFooterData.phoneHref.global}>{siteFooterData.phone.global}</a></p>
      <p>{support.hours}</p><p>{support.support}</p>
    </section>
    <InstrumentProductAfterSalesForm locale={locale} productModel={guide.model} productType={guide.productType} />
  </section>;
}
