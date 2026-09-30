import zh from "./solenoid-locales/zh.json";
import en from "./solenoid-locales/en.json";
import es from "./solenoid-locales/es.json";
import fr from "./solenoid-locales/fr.json";
import ko from "./solenoid-locales/ko.json";
import ru from "./solenoid-locales/ru.json";
import type { ProductSelectionProduct } from "../selection/product-selection.types";
import { getSolenoidConfigurationImage, getSolenoidConfigurationGallery } from "./solenoid-images";

export const solenoidLocales = ["zh", "en", "es", "fr", "ko", "ru"] as const;
type Locale = typeof solenoidLocales[number];
const messages: Record<Locale, typeof en> = { zh, en, es, fr, ko, ru };
export const isSolenoidLocale = (value: string): value is Locale => solenoidLocales.includes(value as Locale);
export const solenoidBasePath = "/products/valves/solenoid-valves/";
export const solenoidImage = "/images/products/valves/solenoid-valves/foreach-solenoid-valve-main.webp";
// Own source: PS-122A-003_A02_cn, pp. 3–8. These are model families, not ordering SKUs.
// The older English order table disagrees on material/code mapping; do not use those codes.
export const solenoidConfigurations = [
  { slug: "2-way", key: "two", model: "SV10-2" },
  { slug: "3-way", key: "three", model: "SV10-3" },
] as const;
// Retain existing connection pages for incoming links; selection cards use function first.
export const solenoidConnectionConfigurations = [
  { slug: "sv10-p", key: "base", model: "SV10-P", weight: "30 g" },
  { slug: "sv10-threaded", key: "threaded", model: "SV10-M6 / SV10-U28", weight: "39 g" },
  { slug: "sv10-b16", key: "barbed", model: "SV10-B16", weight: "29 g" },
] as const;
export const solenoidPageConfigurations = [...solenoidConfigurations, ...solenoidConnectionConfigurations];

export function getSolenoidContent(slug: string, locale: string) {
  if (!isSolenoidLocale(locale)) return null;
  const c = solenoidConfigurations.find(item => item.slug === slug);
  const connection = solenoidConnectionConfigurations.find(item => item.slug === slug);
  if (!c && !connection && slug !== "solenoid-valves") return null;
  const configurationImage = c ? getSolenoidConfigurationImage(c.slug, locale) : undefined;
  const t = messages[locale];
  const m = connection ? t.models[connection.key] : undefined;
  const f = c ? t.flowTypes[c.key] : undefined;
  const prefix = locale === "zh" ? "" : `/${locale}`;
  const shortModel = c?.model || connection?.model || "SV10";
  const title = f ? `FOREACH ${f.heading}` : m ? `FOREACH ${m.heading}` : t.seriesTitle;
  const paragraphs = f ? [f.definition, f.operation, f.selection, t.materialIntro] : m ? [m.definition, t.functionIntro, t.materialIntro, m.installation] : [t.seriesDescription, t.seriesIntegration, t.seriesCompare];
  const description = paragraphs.join("\n\n");
  const detailHref = `${prefix}${solenoidBasePath}${c || connection ? `${slug}/` : ""}`;
  const selectionHref = `${prefix}/products/valves/solenoid-valves/`;
  const values = [
    shortModel, t.structure, f?.functionValue || t.functions,
    m?.connection || solenoidConnectionConfigurations.map(item => t.models[item.key].connection).join("; "),
    "-75 kPa – 0.25 MPa", "1.4 mm", "20 μL", "0.03", "EPDM / FKM / FFKM",
    !connection || connection.key === "threaded" ? t.baseMaterial : "PEEK", t.seatMaterial,
    "DC 12 / 24 V (±10%)", "2.5 W", t.saving, t.standardResponse, t.savingResponse,
    "0–50 °C", t.fluidTemperature, "F", connection?.weight || "SV10-P: 30 g; SV10-M6 / SV10-U28: 39 g; SV10-B16: 29 g", t.testConditions,
  ];
  const specs = values.map((value, i) => ({label: t.labels[i], value})).filter((_, i) => i !== 10 || !connection || connection.key === "threaded");
  if (f) specs.splice(4, 0, ...solenoidConnectionConfigurations.map(item => ({label: item.model, value: `${t.models[item.key].connection}. ${t.models[item.key].installation}`})));
  const applicationItems = f && c ? [
    t.applicationItems[c.key === "two" ? 0 : 1],
    {title: f.applicationTitle, paragraphs: [f.applicationText]},
    t.applicationItems[2],
  ] : t.applicationItems;
  const faqs = f && c ? [
    {question: f.faqQuestion, answer: f.operation},
    c.key === "two" ? t.faqs[1] : t.faqs[0],
    ...t.faqs.slice(2),
  ] : t.faqs;
  return {
    __locale: locale, solenoidAuthoredContent: true, slug, category: "valves", categoryId: "valves",
    ...(configurationImage ? {
      mainImage: configurationImage.src, image: configurationImage.src, imageCard: configurationImage.src,
      imageAlt: configurationImage.alt, mainImageAlt: configurationImage.alt,
    } : {}),
    ...(c ? getSolenoidConfigurationGallery(c.slug, locale) : {additionalImages: [], additionalImageAlts: []}),
    productTypeId: "solenoid-valves", productTypeSlug: "solenoid-valves", productTypeName: t.productType,
    model: title, title, name: title, h1Title: title, pageTitle: title, productName: title,
    cardHeading: f?.heading || m?.heading || t.seriesTitle, cardName: f?.cardName || shortModel,
    modelName: shortModel, displayModel: shortModel, modelDisplay: shortModel, productCode: shortModel,
    breadcrumbLabel: c || connection ? shortModel : t.seriesLabel, breadcrumbCategoryLabel: t.valves, breadcrumbSeriesLabel: t.seriesLabel,
    breadcrumbCategoryHref: `${prefix}/products/valves/`, breadcrumbSeriesHref: `${prefix}/products/valves/solenoid-valves/`,
    seoTitle: f ? `${f.heading} | ${shortModel} | FOREACH` : m ? `${shortModel} ${m.descriptor} | FOREACH` : `${t.seriesTitle} | SV10 | FOREACH`,
    seoDescription: f?.seo || m?.seo || t.seriesSeo,
    seriesTitle: t.seriesTitle, introParagraphs: [t.seriesDescription, t.seriesIntegration, t.seriesCompare],
    description, summary: description, overview: description, valveIntroductionParagraphs: paragraphs,
    isCustomOnly: true, isCustomInquiry: true, detailMode: "custom_inquiry", showCustomInquiryCta: true,
    showStandardModelSelector: false, specSeriesKey: slug, specs,
    advantages: [f?.operation || t.functionIntro, t.materialIntro], highlights: [], features: [],
    commonApplications: applicationItems.map(item => item.title),
    faqs, faq: faqs, faqItems: faqs, detailFaqs: faqs,
    applicationDetails: {
      tabLabel: t.applications, title: t.typicalApplications, intro: [f?.definition || t.applicationsIntro], items: applicationItems,
      selectionNote: { title: t.needsTitle, paragraphs: [t.needsText] },
      relatedGuides: {title: t.compareTitle, links: [
        {label: t.allModels, href: selectionHref},
        ...solenoidConfigurations.filter(item => item.slug !== slug).map(item => ({
          label: t.flowTypes[item.key].heading, href: `${prefix}${solenoidBasePath}${item.slug}/`,
        })),
      ]},
    },
    contactHref: `${prefix}/contact/`, detailHref, selectionHref,
    bottomCtaTitle: t.ctaTitle, bottomCtaDescription: t.ctaText, bottomCtaButtonText: t.ctaButton, bottomCtaHref: `${prefix}/contact/`,
    customInquiryTitle: t.ctaTitle, customInquiryDescription: t.ctaText, customInquiryButtonText: t.ctaButton, customInquiryHref: `${prefix}/contact/`,
  };
}

export function expandSolenoidCards(product: ProductSelectionProduct, locale: string): ProductSelectionProduct[] {
  if (product.productId !== "6010-solenoid-valve" || !isSolenoidLocale(locale)) return [product];
  return solenoidConfigurations.map(c => {
    const copy = getSolenoidContent(c.slug, locale)!;
    return {...product, id: c.slug, productId: c.slug, slug: c.slug, detailSlug: c.slug, routeSlug: c.slug,
      seriesId: "6010", seriesSlug: "solenoid-valves", model: c.model, productCode: c.model, code: c.model,
      title: copy.title, name: copy.cardName, productName: copy.cardName, cardTitle: {[locale]: copy.cardName},
      imageCard: copy.imageCard, image: copy.image, cardImage: copy.imageCard,
      imagePath: copy.image, imageUrl: copy.image, imageAlt: copy.imageAlt,
      cardSubtitle: {[locale]: copy.cardHeading}, subtitle: copy.cardHeading,
      description: copy.description, summary: copy.description, tags: [], specs: copy.specs,
      searchKeywords: [c.model, copy.cardHeading, copy.description],
      filter01: "", filter02: "", filter03: "", filter04: "", filters: {},
      href: `${solenoidBasePath}${c.slug}/`, detailHref: `${solenoidBasePath}${c.slug}/`,
    };
  });
}
