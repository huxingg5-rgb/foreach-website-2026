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
type SolenoidMessages = typeof en & { seriesFunction?: string; seriesMaterials?: string };
const messages: Record<Locale, SolenoidMessages> = { zh, en, es, fr, ko, ru };
export const isSolenoidLocale = (value: string): value is Locale => solenoidLocales.includes(value as Locale);
export const solenoidBasePath = "/products/valves/solenoid-valves/";
export const solenoidImage = "/images/products/valves/solenoid-valves/foreach-solenoid-valve-main.webp";
import {solenoidConfigurations, solenoidConfigurationName, getSolenoidConfiguration} from "./solenoid-configurations";
import {getSolenoidCardCopy, getSolenoidStateCopy} from "./solenoid-card-copy";
export {solenoidConfigurations} from "./solenoid-configurations";
// Connection specifications shared by the six family pages.
export const solenoidConnectionConfigurations = [
  { slug: "sv10-p", key: "base", model: "SV10-P", weight: "30 g" },
  { slug: "sv10-threaded", key: "threaded", model: "SV10-M6 / SV10-U28", weight: "39 g" },
  { slug: "sv10-b16", key: "barbed", model: "SV10-B16", weight: "29 g" },
] as const;
export {solenoidPageConfigurations} from "./solenoid-configurations";

export function getSolenoidContent(slug: string, locale: string) {
  if (!isSolenoidLocale(locale)) return null;
  const c = getSolenoidConfiguration(slug);
  const connection = solenoidConnectionConfigurations.find(item => item.key === c?.connection);
  if (!c && !connection && slug !== "solenoid-valves") return null;
  const configurationImage = c ? getSolenoidConfigurationImage(c.slug, locale) : undefined;
  const t = messages[locale];
  const introParagraphs = [
    t.seriesDescription, t.seriesFunction, t.seriesIntegration, t.seriesMaterials, t.seriesCompare,
  ].filter((paragraph): paragraph is string => Boolean(paragraph));
  const m = connection ? t.models[connection.key] : undefined;
  const cardCopy = getSolenoidCardCopy(slug, locale);
  const stateCopy = c?.state ? getSolenoidStateCopy(locale, c.state) : undefined;
  const familyFlow = c ? t.flowTypes[c.key] : undefined;
  const f = familyFlow && stateCopy ? {
    ...familyFlow, functionValue: stateCopy.label,
    definition: cardCopy!.heading, operation: stateCopy.operation,
    applicationText: stateCopy.operation,
  } : familyFlow;
  const prefix = locale === "zh" ? "" : `/${locale}`;
  const shortModel = c?.model || connection?.model || "SV10";
  const familyName = c ? solenoidConfigurationName(c.slug, locale) : undefined;
  const heading = cardCopy?.name || (familyName ? `${familyName} ${t.productType}` : undefined);
  const title = heading ? `FOREACH ${heading}` : f ? `FOREACH ${f.heading}` : m ? `FOREACH ${m.heading}` : t.seriesTitle;
  // Keep each paragraph focused: operation first, then installation and wetted materials.
  const joinSentences = (sentences: string[]) => sentences.join(locale === "zh" ? "" : " ");
  const paragraphs = c && m ? [
    t.detailIntro[c.state || c.key],
    joinSentences([m.installation, t.detailMaterials[c.connection]]),
  ] : m && connection ? [
    joinSentences([m.definition, t.functionIntro]),
    joinSentences([m.installation, t.detailMaterials[connection.key]]),
  ] : introParagraphs;
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

  const applicationItems = f && c ? [
    t.applicationItems[c.key === "two" ? 0 : 1],
    {title: f.applicationTitle, paragraphs: [f.applicationText]},
    t.applicationItems[2],
  ] : t.applicationItems;
  const baseFaqs = f && c ? [
    {question: f.faqQuestion, answer: f.operation},
    c.key === "two" ? t.faqs[1] : t.faqs[0],
    ...t.faqs.slice(2),
  ] : t.faqs;
  const faqs = baseFaqs.map((faq, index) => index === baseFaqs.length - 1
    ? {...faq, answer: joinSentences([faq.answer, t.orderingNote])}
    : faq);
  return {
    __locale: locale, solenoidAuthoredContent: true, slug, category: "valves", categoryId: "valves",
    ...(configurationImage ? {
      mainImage: configurationImage.src, image: configurationImage.src, imageCard: configurationImage.cardSrc,
      imageAlt: configurationImage.alt, mainImageAlt: configurationImage.alt,
    } : {}),
    ...(c ? getSolenoidConfigurationGallery(c.slug, locale) : {additionalImages: [], additionalImageAlts: []}),
    productTypeId: "solenoid-valves", productTypeSlug: "solenoid-valves", productTypeName: t.productType,
    model: title, title, name: title, h1Title: cardCopy?.heading || title.replace(/^FOREACH\s+/i, ""), pageTitle: title, productName: title,
    cardHeading: heading || f?.heading || m?.heading || t.seriesTitle, cardName: cardCopy?.name || familyName || shortModel,
    modelName: shortModel, displayModel: shortModel, modelDisplay: shortModel, productCode: shortModel,
    breadcrumbLabel: c || connection ? shortModel : t.seriesLabel, breadcrumbCategoryLabel: t.valves, breadcrumbSeriesLabel: t.seriesLabel,
    breadcrumbCategoryHref: `${prefix}/products/valves/`, breadcrumbSeriesHref: `${prefix}/products/valves/solenoid-valves/`,
    seoTitle: heading ? `${heading} | ${shortModel} | FOREACH` : f ? `${f.heading} | ${shortModel} | FOREACH` : m ? `${shortModel} ${m.heading} | FOREACH` : `${t.seriesTitle} | FOREACH`,
    seoDescription: c ? joinSentences([t.metaFunction[c.state || c.key], t.metaConnection[c.connection]]) : t.seriesSeo,
    searchTerms: t.searchTerms,
    seriesTitle: t.seriesTitle, introParagraphs,
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
          label: solenoidConfigurationName(item.slug, locale), href: `${prefix}${solenoidBasePath}${item.slug}/`,
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
      title: copy.title, name: copy.cardName, productName: copy.cardName, cardTitle: {[locale]: `${c.model} · ${copy.cardName}`},
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
