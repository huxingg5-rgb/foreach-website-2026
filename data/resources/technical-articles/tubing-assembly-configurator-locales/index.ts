import { flangedTubingAssembliesSlug, tubingAssemblyConfiguratorSlug } from "../technical-article-availability";
import type { DiaphragmPumpEngineeringArticleCopy } from "../diaphragm-pump-engineering-article.types";
import type { TechnicalArticleLocale } from "../technical-articles.types";
import { tubingAssemblyConfiguratorCopy } from "../tubing-assembly-configurator-guide.zh";
import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";
import ko from "./ko.json";
import ru from "./ru.json";

type InternationalLocale = Exclude<TechnicalArticleLocale, "zh-CN">;
const translations: Record<InternationalLocale, typeof en> = { en, es, fr, ko, ru };
const configuratorScreenshotHeights: Record<InternationalLocale, number> = { en: 1066, es: 1151, fr: 1115, ko: 993, ru: 1102 };

function localizedCopy(locale: InternationalLocale): DiaphragmPumpEngineeringArticleCopy {
  const t = translations[locale];
  const imageRoot = `/images/resources/technical-articles/${tubingAssemblyConfiguratorSlug}/${locale}`;
  const configuratorImage = `${imageRoot}/fep-dual-end-configuration.webp`;
  const drawingImage = `${imageRoot}/fep-dual-end-generated-drawing.webp`;
  return {
    metadata: {
      title: t.title,
      seoTitle: t.seoTitle,
      seoDescription: t.description,
      coverImage: tubingAssemblyConfiguratorCopy.metadata.coverImage,
      coverAlt: t.coverAlt,
    },
    deck: t.deck,
    leadBlocks: [{ type: "paragraph", text: t.lead }],
    sections: [
      {
        title: t.parametersTitle,
        tocLabel: t.parametersToc,
        blocks: [
          { type: "paragraph", text: t.parametersIntro },
          { type: "links", items: [{ label: t.savedLink, href: `/${locale}/products/tubing-assemblies/flanged-tubing/details/` }] },
          { type: "list", ordered: true, items: t.steps },
        ],
      },
      {
        title: t.endsTitle,
        tocLabel: t.endsToc,
        blocks: [
          { type: "paragraph", text: t.endsIntro },
          { type: "links", items: [{ label: t.guideLink, href: `/${locale}/resources/technical-articles/${flangedTubingAssembliesSlug}/` }] },
          { type: "paragraph", text: t.exampleIntro },
          { type: "table", headers: t.headers, rows: t.rows },
          { type: "figure", src: configuratorImage, alt: t.configAlt, caption: t.configCaption, captionHref: configuratorImage, width: 798, height: configuratorScreenshotHeights[locale] },
          { type: "paragraph", text: t.exampleCheck },
        ],
      },
      {
        title: t.drawingTitle,
        tocLabel: t.drawingToc,
        blocks: [
          { type: "paragraph", text: t.drawingIntro },
          { type: "figure", src: drawingImage, alt: t.drawingAlt, caption: t.drawingCaption, captionHref: drawingImage, width: 850, height: 643 },
          { type: "list", items: t.reviews },
          { type: "paragraph", text: t.versions },
        ],
      },
      {
        title: t.sampleTitle,
        tocLabel: t.sampleToc,
        blocks: [{ type: "paragraph", text: t.sample }],
      },
    ],
    faqTitle: "",
    faqItems: [],
    cta: {
      title: t.ctaTitle,
      description: t.ctaDescription,
      contactLabel: t.contact,
      productsLabel: t.start,
      productsHref: "#online-configurator",
    },
  };
}

export const tubingAssemblyConfiguratorTranslations = {
  en: localizedCopy("en"),
  es: localizedCopy("es"),
  fr: localizedCopy("fr"),
  ko: localizedCopy("ko"),
  ru: localizedCopy("ru"),
};
