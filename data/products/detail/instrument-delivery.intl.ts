import photoSets from "./instrument-delivery-photos.zh.json";
import translations from "./instrument-guide-locales/delivery.json";
import { instrumentGuideLocales, type InstrumentGuideLocale } from "./instrument-product-guides.intl";

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

export function getInstrumentDeliveryPhotos(slug: string, family: string, locale: string) {
  const source = Object.values(photoSets).find(group => (group.slugs as string[]).includes(slug) || (group.families as string[]).includes(family));
  if (!source) return undefined;
  const t = (value: string) => instrumentDeliveryText(value, locale);
  return { ...source, intro: t(source.intro), rows: source.rows.map(row => ({ ...row, title: t(row.title),
    paragraphs: row.paragraphs.map(t), photos: row.photos.map(photo => ({ ...photo, alt: t(photo.alt), caption: t(photo.caption) })),
  })) };
}

const common = {
  en: { lead: "Supplied in the confirmed model and configuration.", otherWarranty: "Warranty period: other products, including valves and detection modules, are covered for 12 months from the date the product is first sold." },
  es: { lead: "Suministro según el modelo y la configuración confirmados.", otherWarranty: "Garantía: los demás productos, incluidas válvulas y módulos de detección, tienen 12 meses desde la primera venta del producto." },
  fr: { lead: "Livraison selon le modèle et la configuration confirmés.", otherWarranty: "Garantie : les autres produits, dont les vannes et modules de détection, sont garantis 12 mois à compter de la première vente du produit." },
  ko: { lead: "확정된 모델과 구성으로 납품합니다.", otherWarranty: "보증 기간: 밸브 및 검출 모듈 등 기타 제품은 최초 판매일로부터 12개월 동안 보증합니다." },
  ru: { lead: "Поставка по согласованной модели и комплектации.", otherWarranty: "Гарантия: прочие изделия, включая клапаны и модули обнаружения, покрываются гарантией 12 месяцев с даты первой продажи изделия." },
} as const;
export const getInstrumentDeliveryCommon = (locale: InstrumentGuideLocale) => common[locale];
