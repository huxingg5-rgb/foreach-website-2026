import zh from "./inkjet-printer-pumps-locales/zh-CN.json";
import en from "./inkjet-printer-pumps-locales/en.json";
import es from "./inkjet-printer-pumps-locales/es.json";
import fr from "./inkjet-printer-pumps-locales/fr.json";
import ko from "./inkjet-printer-pumps-locales/ko.json";
import ru from "./inkjet-printer-pumps-locales/ru.json";
import { diaphragmPumpSelectionProducts } from "@/data/products/selection/diaphragm-pump-selection.generated";
import { getDiaphragmPumpReferenceByProductId } from "@/data/products/detail/diaphragm-pump-reference-models";
import { getDiaphragmPumpPath } from "@/data/products/detail/diaphragm-pump-routes";
import type { TechnicalArticleLocale } from "./technical-articles.types";
import type {
  DiaphragmPumpEngineeringArticleCopy,
  EngineeringArticleBlock,
} from "./diaphragm-pump-engineering-article.types";

export const inkjetPrinterPumpsSlug = "inkjet-printer-pumps-micro-diaphragm-pumps" as const;

type ArticleText = {
  title: string;
  seoTitle: string;
  description: string;
  coverAlt: string;
  deck: string;
  scope: string;
  sections: {
    title: string;
    tocLabel: string;
    paragraphs: string[];
    table?: { headers: string[]; rows: string[][] };
    figure?: { caption: string };
    productTable?: { headers: string[]; purposes: string[]; modelKeys?: string[] };
    afterParagraphs?: string[];
    note?: string;
    links?: { key: string; label: string }[];
  }[];
  cta: { title: string; description: string; contactLabel: string; productsLabel: string };
};

const texts: Record<TechnicalArticleLocale, ArticleText> = {
  "zh-CN": zh, en, es, fr, ko, ru,
};

// Verified against controlled DPL30 A04, DPL60 A02 and DPL30H A00 specifications.
// Keep numeric values and model destinations tied to the current product sources.
const candidates = [
  ["dpl30", "diaphragm-dpl30-brushed"],
  ["dpl60", "diaphragm-dpl60-brushed"],
  ["dpl30h", "diaphragm-dpl30h-brushed"],
].map(([key, id]) => {
  const product = diaphragmPumpSelectionProducts.find(item => item.productId === id);
  const reference = getDiaphragmPumpReferenceByProductId(id);
  if (!product?.flowRate || !product.pressure || !reference) {
    throw new Error(`Missing inkjet-pump candidate data: ${id}`);
  }
  return {
    key,
    model: reference.model,
    flow: product.flowRate,
    pressure: product.pressure,
    href: getDiaphragmPumpPath("zh", reference.slug),
  };
});

const links: Record<string, string> = {
  dpl30: candidates[0].href,
  dpl60: candidates[1].href,
  dpl30h: candidates[2].href,
  supply: "/resources/technical-articles/ink-circulation-supply-return-pump-diaphragm-pump/",
  flow: "/resources/technical-articles/300-vs-600-ml-min-ink-circulation-return-pump-selection/",
  white: "/resources/technical-articles/white-ink-circulation-pump-selection-sedimentation/",
  pulsation: "/resources/technical-articles/miniature-diaphragm-pump-flow-pulsation-reduction/",
  troubleshooting: "/resources/technical-articles/ink-starvation-inkjet-troubleshooting/",
};

function buildCopy(text: ArticleText, locale: TechnicalArticleLocale): DiaphragmPumpEngineeringArticleCopy {
  const image = `/images/resources/pump-application-guides/inkjet-printer-pumps/inkjet-fluid-path-${locale}.webp`;
  return {
    metadata: {
      title: text.title,
      seoTitle: text.seoTitle,
      seoDescription: text.description,
      coverImage: image,
      coverAlt: text.coverAlt,
    },
    deck: text.deck,
    leadBlocks: [{ type: "notice", text: text.scope }],
    sections: text.sections.map(section => {
      const blocks: EngineeringArticleBlock[] = section.paragraphs.map(paragraph => ({ type: "paragraph", text: paragraph }));
      if (section.table) blocks.push({ type: "table", ...section.table });
      if (section.figure) blocks.push({
        type: "figure", src: image, alt: text.coverAlt,
        width: 1536, height: 1024, caption: section.figure.caption,
      });
      if (section.productTable) {
        const table = section.productTable;
        const models = table.modelKeys?.map(key => {
          const candidate = candidates.find(item => item.key === key);
          if (!candidate) throw new Error(`Unknown inkjet-pump candidate: ${key}`);
          return candidate;
        }) ?? candidates.slice(0, 2);
        blocks.push({
          type: "table", headers: table.headers,
          rows: models.map((candidate, index) => [
            candidate.model, candidate.flow, candidate.pressure, table.purposes[index],
          ]),
        });
      }
      for (const paragraph of section.afterParagraphs ?? []) {
        blocks.push({ type: "paragraph", text: paragraph });
      }
      if (section.note) blocks.push({ type: "notice", text: section.note });
      if (section.links) blocks.push({ type: "links", items: section.links.map(link => {
        const href = links[link.key];
        if (!href) throw new Error(`Unknown inkjet-pump article link: ${link.key}`);
        return { href, label: link.label };
      }) });
      return { title: section.title, tocLabel: section.tocLabel, blocks };
    }),
    // Each question is answered in the body; no repetitive FAQ or empty schema.
    faqTitle: "",
    faqItems: [],
    cta: {
      ...text.cta,
      productsHref: "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
    },
  };
}

export const inkjetPrinterPumpsCopies = Object.fromEntries(
  Object.entries(texts).map(([locale, text]) => [locale, buildCopy(text, locale as TechnicalArticleLocale)]),
) as Record<TechnicalArticleLocale, DiaphragmPumpEngineeringArticleCopy>;
