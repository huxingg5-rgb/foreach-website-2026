import type { ProductApplicationsContent } from "@/data/products/detail/product-detail.types";
import type { DiaphragmPumpGuide } from "@/data/products/detail/diaphragm-pump-guide";
import { getDiaphragmPumpGuideCopy } from "@/data/products/detail/diaphragm-pump-guide.intl";
import { normalizeDiaphragmPumpLocale } from "@/data/products/detail/diaphragm-pump-routes";
import { siteFooterData } from "@/data/site-footer";
import DiaphragmPumpAfterSalesForm from "./DiaphragmPumpAfterSalesForm";
import DiaphragmPumpSelectionGuide from "./DiaphragmPumpSelectionGuide";
import base from "@/components/products/detail/EaPumpDetailContent.module.css";

type Props = { guide: DiaphragmPumpGuide; locale: string };
const photoRoot = "/images/products/pumps/diaphragm-pumps/delivery/";
const photos = ["diaphragm-pumps-foam-compartments.webp", "diaphragm-pump-label-and-packaging.webp", "diaphragm-pumps-foam-cover.webp", "diaphragm-pumps-packing-list.webp", "diaphragm-pumps-carton-packing.webp", "diaphragm-pumps-sealed-carton-labels.webp"];

export function DiaphragmPumpProductNotes({ guide, locale }: Props) {
  const copy = getDiaphragmPumpGuideCopy(locale, guide);
  return <div data-diaphragm-product-notes={guide.model}>
    <div className={base.specNotes}>
      <p>{copy.notes[guide.gasLiquid ? 1 : 0]}</p>
      <p>{copy.notes[2]}</p>
      <p>{copy.lifeNote}</p>
    </div>
  </div>;
}

export function DiaphragmPumpSelectionContent({ guide, locale }: Props & { applications?: ProductApplicationsContent }) {
  return <DiaphragmPumpSelectionGuide guide={guide} locale={locale} />;
}

export function DiaphragmPumpDeliveryContent({ guide, locale }: Props) {
  const copy = getDiaphragmPumpGuideCopy(locale, guide);
  const lang = normalizeDiaphragmPumpLocale(locale);
  const region = lang === "zh" ? "china" : "global";
  return <section lang={lang === "zh" ? "zh-CN" : lang} className={base.content} data-diaphragm-delivery={guide.model} aria-label={`${guide.model} ${copy.delivery}`}>
    <h2>{copy.delivery}</h2><p className={base.lead}>{guide.model} — {copy.deliveryLead}</p>
    {copy.deliveryRows.map((paragraphs, index) => <div className={base.deliveryRow} key={copy.deliveryTitles[index]}>
      <div><h3><span className={base.number}>{String(index + 1).padStart(2, "0")}</span>{copy.deliveryTitles[index]}</h3>{paragraphs.map(text => <p key={text}>{text}</p>)}</div>
      <div className={base.photos}>{[index * 2, index * 2 + 1].map(photo => <figure key={photos[photo]}>
        {/* Documentary delivery photographs retain their original 4:3 frame. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${photoRoot}${photos[photo]}`} alt={copy.alts[photo]} width={1500} height={1125} loading="lazy" decoding="async" />
        <figcaption>{copy.captions[photo]}</figcaption>
      </figure>)}</div>
    </div>)}
    <section className={base.guideSection}>
      <h3><span className={base.number}>04</span>{copy.deliveryTitles[3]}</h3>
      {copy.warranty.map(text => <p key={text}>{text}</p>)}
      <p>{copy.email}{lang === "zh" ? "：" : ": "}<a className={base.contactLink} href={siteFooterData.emailHref[region]}>{siteFooterData.email[region]}</a></p>
      <p>{copy.phone}{lang === "zh" ? "：" : ": "}<a className={base.contactLink} href={siteFooterData.phoneHref[region]}>{siteFooterData.phone[region]}</a></p>
      <p>{copy.hours}</p>
    </section>
    <DiaphragmPumpAfterSalesForm locale={lang} productModel={guide.model} />
  </section>;
}
