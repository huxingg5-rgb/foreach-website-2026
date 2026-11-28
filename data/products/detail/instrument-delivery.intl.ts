import photoSets from "./instrument-delivery-photos.zh.json";
import translations from "./instrument-guide-locales/delivery.json";
import abdHindi from "./instrument-guide-locales/abd-delivery.hi.json";
import abdItalian from "./instrument-guide-locales/abd-delivery.it.json";
import pdm5Hindi from "./instrument-guide-locales/pdm5-delivery.hi.json";
import pdm5Italian from "./instrument-guide-locales/pdm5-delivery.it.json";
import pipettingGerman from "./instrument-guide-locales/pipetting-delivery.de.json";
import pipettingHindi from "./instrument-guide-locales/pipetting-delivery.hi.json";
import pipettingItalian from "./instrument-guide-locales/pipetting-delivery.it.json";
import syringeGerman from "./instrument-guide-locales/syringe-delivery.de.json";
import syringeHindi from "./instrument-guide-locales/syringe-delivery.hi.json";
import syringeItalian from "./instrument-guide-locales/syringe-delivery.it.json";
import hpHindi from "./instrument-guide-locales/hp.hi.json";
import hpItalian from "./instrument-guide-locales/hp.it.json";
import mrv3Hindi from "./instrument-guide-locales/mrv3.hi.json";
import mrv3Italian from "./instrument-guide-locales/mrv3.it.json";
import sv10Hindi from "./instrument-guide-locales/sv10.hi.json";
import sv10Italian from "./instrument-guide-locales/sv10.it.json";
import { getGermanControlGuideText } from "./instrument-control-guide.de";
import { getGermanHpGuideText } from "./instrument-hp-guide.de";
import { getGermanMrv3GuideText } from "./instrument-mrv3-guide.de";
import { getGermanSv10GuideText } from "./instrument-sv10-guide.de";
import { instrumentGuideLocales, type InstrumentGuideLocale } from "./instrument-product-guides.intl";
import { getInstrumentDeliveryRows } from "./instrument-detail-content.zh";
import type { InstrumentProductGuide } from "./instrument-product-guides.zh";

type AuthoredDeliveryLocale = "de" | "it" | "hi";
export type InstrumentDeliveryLocale = InstrumentGuideLocale | AuthoredDeliveryLocale;
type DeliveryText = Readonly<Record<string, string>> | ((value: string) => string);
const authoredDelivery: Record<AuthoredDeliveryLocale, Partial<Record<InstrumentProductGuide["family"], DeliveryText>>> = {
  de: {
    abd: getGermanControlGuideText, pdm5: getGermanControlGuideText,
    hp: getGermanHpGuideText, mrv3: getGermanMrv3GuideText, sv10: getGermanSv10GuideText,
    syringe: syringeGerman, smtp2: pipettingGerman, smtp4: pipettingGerman,
  },
  it: {
    abd: abdItalian, pdm5: pdm5Italian, hp: hpItalian, mrv3: mrv3Italian, sv10: sv10Italian,
    syringe: syringeItalian, smtp2: pipettingItalian, smtp4: pipettingItalian,
  },
  hi: {
    abd: abdHindi, pdm5: pdm5Hindi, hp: hpHindi, mrv3: mrv3Hindi, sv10: sv10Hindi,
    syringe: syringeHindi, smtp2: pipettingHindi, smtp4: pipettingHindi,
  },
};

const messages = new Map(translations.map(row => [row[0], row.slice(1)] as const));
export function instrumentDeliveryText(source: string, locale: string): string {
  const language = instrumentGuideLocales.indexOf(locale as InstrumentGuideLocale);
  if (language < 0 || !/[\u3400-\u9fff]/.test(source)) return source;
  const numbers: string[] = [];
  const key = source.replace(/\d+(?:\.\d+)?/g, value => `{${numbers.push(value) - 1}}`);
  const template = messages.get(key)?.[language];
  if (!template) throw new Error(`Missing ${locale} instrument delivery translation: ${source}`);
  return template.replace(/\{(\d+)\}/g, (_, index: string) => numbers[Number(index)]);
}

export function getInstrumentDeliveryPhotos(slug: string, family: InstrumentProductGuide["family"], locale: string) {
  const source = Object.values(photoSets).find(group => (group.slugs as string[]).includes(slug) || (group.families as string[]).includes(family));
  if (!source) return undefined;
  const hasAuthoredDelivery = locale === "de" || locale === "it" || locale === "hi";
  const localized = hasAuthoredDelivery ? authoredDelivery[locale][family] : undefined;
  if (hasAuthoredDelivery && !localized) return undefined;
  const sourceLocale = hasAuthoredDelivery ? "en" : locale;
  const t = (value: string) => {
    const translated = instrumentDeliveryText(value, sourceLocale);
    return typeof localized === "function" ? localized(translated) : localized?.[translated] ?? translated;
  };
  const delivery = getInstrumentDeliveryRows(family, sourceLocale);
  return {
    ...source,
    intro: t(delivery ? "按订单确认的型号、数量和配置交付。" : source.intro),
    rows: source.rows.map((row, index) => {
      const content = delivery?.[index] ?? row;
      return {
        ...row,
        title: t(content.title),
        paragraphs: content.paragraphs.map(t),
        photos: row.photos.map(photo => ({ ...photo, alt: t(photo.alt), caption: t(photo.caption) })),
      };
    }),
  };
}

const common = {
  de: { warranty: (months: number) => `Für dieses Produkt gilt ab dem Erstverkauf eine Garantie von ${months} Monaten.`, lead: "Die Lieferung erfolgt in der bestätigten Ausführung.", otherWarranty: "Andere Produkte, darunter Ventile und Detektionsmodule, haben ab dem Erstverkauf eine Garantie von 12 Monaten." },
  it: { warranty: (months: number) => `La garanzia del prodotto è di ${months} mesi dalla data della prima vendita.`, lead: "Fornitura secondo modello e configurazione confermati.", otherWarranty: "Per gli altri prodotti, tra cui valvole e moduli di rilevamento, la garanzia è di 12 mesi dalla data della prima vendita." },
  hi: { warranty: (months: number) => `पहली बिक्री की तारीख से इस उत्पाद पर ${months} महीने की वारंटी है।`, lead: "पुष्टि किए गए मॉडल और कॉन्फ़िगरेशन के अनुसार आपूर्ति।", otherWarranty: "वाल्व और डिटेक्शन मॉड्यूल सहित अन्य उत्पादों पर पहली बिक्री की तारीख से 12 महीने की वारंटी है।" },
  en: { warranty: (months: number) => `This product is covered for ${months} months from the date of first sale.`, lead: "Supplied in the confirmed model and configuration.", otherWarranty: "Warranty period: other products, including valves and detection modules, are covered for 12 months from the date the product is first sold." },
  es: { warranty: (months: number) => `Este producto tiene una garantía de ${months} meses a partir de la fecha de su primera venta.`, lead: "Suministro según el modelo y la configuración confirmados.", otherWarranty: "Garantía: los demás productos, incluidas válvulas y módulos de detección, tienen 12 meses desde la primera venta del producto." },
  fr: { warranty: (months: number) => `Ce produit est garanti ${months} mois à compter de la date de sa première vente.`, lead: "Livraison selon le modèle et la configuration confirmés.", otherWarranty: "Garantie : les autres produits, dont les vannes et modules de détection, sont garantis 12 mois à compter de la première vente du produit." },
  ko: { warranty: (months: number) => `이 제품의 보증 기간은 최초 판매일로부터 ${months}개월입니다.`, lead: "확정된 모델과 구성으로 납품합니다.", otherWarranty: "보증 기간: 밸브 및 검출 모듈 등 기타 제품은 최초 판매일로부터 12개월 동안 보증합니다." },
  ru: { warranty: (months: number) => `Гарантийный срок изделия — ${months} месяцев с даты первой продажи.`, lead: "Поставка по согласованной модели и комплектации.", otherWarranty: "Гарантия: прочие изделия, включая клапаны и модули обнаружения, покрываются гарантией 12 месяцев с даты первой продажи изделия." },
} as const;
export const getInstrumentDeliveryCommon = (locale: InstrumentDeliveryLocale) => common[locale];
