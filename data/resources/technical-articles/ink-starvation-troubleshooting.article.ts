import zh from "./ink-starvation-locales/zh-CN.json";
import en from "./ink-starvation-locales/en.json";
import es from "./ink-starvation-locales/es.json";
import fr from "./ink-starvation-locales/fr.json";
import ko from "./ink-starvation-locales/ko.json";
import ru from "./ink-starvation-locales/ru.json";
import inkjetRoutes from "@/data/applications/industrial-inkjet-routes.json";
import { getDiaphragmPumpReferenceByProductId } from "@/data/products/detail/diaphragm-pump-reference-models";
import { getDiaphragmPumpPath } from "@/data/products/detail/diaphragm-pump-routes";
import type { TechnicalArticleLocale } from "./technical-articles.types";
import type {
  DiaphragmPumpEngineeringArticleCopy,
  EngineeringArticleBlock,
} from "./diaphragm-pump-engineering-article.types";

export const inkStarvationTroubleshootingSlug =
  "ink-starvation-inkjet-troubleshooting" as const;

type GuideLink = { key: string; label: string; prefix?: string; suffix?: string };
type GuideFigure = Omit<Extract<EngineeringArticleBlock, { type: "figure" }>, "type">;

type GuideText = {
  title: string;
  seoTitle: string;
  description: string;
  coverAlt: string;
  deck: string;
  scope: string;
  sections: {
    title: string;
    tocLabel: string;
    paragraphs: (string | GuideLink)[];
    figure?: GuideFigure;
    table?: { headers: string[]; rows: string[][] };
    checks?: string[];
    note?: string;
    links?: GuideLink[];
  }[];
  cta: { title: string; description: string; contactLabel: string; productsLabel: string };
};

const texts: Record<TechnicalArticleLocale, GuideText> = {
  "zh-CN": zh, en, es, fr, ko, ru,
};

// Product destinations come from the published model registry used by detail pages.
function modelHref(id: string) {
  const reference = getDiaphragmPumpReferenceByProductId(id);
  if (!reference) throw new Error(`Missing ink-starvation reference product: ${id}`);
  return getDiaphragmPumpPath("zh", reference.slug);
}

const sourceLinks: Record<string, string> = {
  dpl30: modelHref("diaphragm-dpl30-brushed"),
  dpl60: modelHref("diaphragm-dpl60-brushed"),
  supply: "/resources/technical-articles/ink-circulation-supply-return-pump-diaphragm-pump/",
  flow: "/resources/technical-articles/300-vs-600-ml-min-ink-circulation-return-pump-selection/",
  white: "/resources/technical-articles/white-ink-circulation-pump-selection-sedimentation/",
  pulsation: "/resources/technical-articles/miniature-diaphragm-pump-flow-pulsation-reduction/",
  noFlow: "/resources/technical-articles/300-ml-min-micro-liquid-diaphragm-pump-motor-runs-no-flow/",
  filtrationGuide: inkjetRoutes.inkFiltration.slice("/en".length),
  inlineFilter: "/products/fittings/filters/f-pe-60-32-pp-n/",
  airDetector: "/products/control/air-bubble-detectors/abd/",
  pressureSensor: "/products/control/pdm5-pressure-sensor/",
};

function resolveLink({ key, ...text }: GuideLink) {
  const href = sourceLinks[key];
  if (!href) throw new Error(`Unknown ink-starvation source link: ${key}`);
  return { href, ...text };
}

function buildCopy(text: GuideText): DiaphragmPumpEngineeringArticleCopy {
  return {
    metadata: {
      title: text.title,
      seoTitle: text.seoTitle,
      seoDescription: text.description,
      coverImage: "/images/resources/technical-articles/ink-starvation-troubleshooting/ink-starvation-diagnostics.webp",
      coverAlt: text.coverAlt,
    },
    deck: text.deck,
    leadBlocks: [{ type: "notice", text: text.scope }],
    sections: text.sections.map(section => {
      const blocks: EngineeringArticleBlock[] = section.paragraphs.map(paragraph =>
        typeof paragraph === "string"
          ? { type: "paragraph", text: paragraph }
          : { type: "links", items: [resolveLink(paragraph)] }
      );
      if (section.figure) blocks.push({ type: "figure", ...section.figure });
      if (section.table) blocks.push({ type: "table", ...section.table });
      if (section.checks) blocks.push({ type: "list", ordered: true, items: section.checks });
      if (section.note) blocks.push({ type: "notice", text: section.note });
      if (section.links) blocks.push({ type: "links", items: section.links.map(resolveLink) });
      return { title: section.title, tocLabel: section.tocLabel, blocks };
    }),
    // The article answers the diagnostic questions in context; no duplicate FAQ block.
    faqTitle: "",
    faqItems: [],
    cta: {
      ...text.cta,
      productsHref: "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
    },
  };
}

export const inkStarvationCopies = Object.fromEntries(
  Object.entries(texts).map(([locale, text]) => [locale, buildCopy(text)]),
) as Record<TechnicalArticleLocale, DiaphragmPumpEngineeringArticleCopy>;
