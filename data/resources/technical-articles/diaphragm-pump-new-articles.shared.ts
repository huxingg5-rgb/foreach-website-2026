import type {
  DiaphragmPumpEngineeringArticleCopy,
  EngineeringArticleBlock,
  EngineeringArticleFaqItem,
  EngineeringArticleSection,
} from "./diaphragm-pump-engineering-article.types";

type ArticleMetadata = Omit<
  DiaphragmPumpEngineeringArticleCopy["metadata"],
  "coverImage"
>;
type ArticleCta = DiaphragmPumpEngineeringArticleCopy["cta"];
type ArticleLink = { prefix: string; label: string; suffix?: string };
type ArticleFigure = { alt: string; caption: string };
type ArticleNotice = { label?: string; text: string };

type MotorArticleContent = {
  metadata: ArticleMetadata;
  deck: string;
  lead: readonly string[];
  sections: {
    referenceLife: {
      title: string;
      paragraphs: readonly string[];
      notice: ArticleNotice;
    };
    commutation: { title: string; paragraph: string; figure: ArticleFigure };
    brushedLife: {
      title: string;
      introduction: readonly string[];
      factors: readonly string[];
      conclusion: string;
    };
    brushlessLife: {
      title: string;
      paragraphs: readonly string[];
      figure: ArticleFigure;
    };
    wholePump: {
      title: string;
      paragraphs: readonly string[];
      notice: ArticleNotice;
    };
    operatingFactors: { title: string; items: readonly string[] };
    selection: {
      title: string;
      paragraphs: readonly string[];
      headers: readonly string[];
      rows: readonly (readonly string[])[];
      figure: ArticleFigure;
    };
    accumulatedHours: {
      title: string;
      introduction: string;
      formula: string;
      paragraphs: readonly string[];
      link: ArticleLink;
    };
    conclusion: { title: string; paragraphs: readonly string[] };
  };
  faqTitle: string;
  faqItems: readonly EngineeringArticleFaqItem[];
  cta: ArticleCta;
};

type LifeScienceArticleContent = {
  metadata: ArticleMetadata;
  deck: string;
  lead: readonly string[];
  sections: {
    tasks: {
      title: string;
      introduction: string;
      items: readonly string[];
      figure: ArticleFigure;
      notice: ArticleNotice;
    };
    candidate: {
      title: string;
      introduction: string;
      figure: ArticleFigure;
      headers: readonly string[];
      rows: readonly (readonly string[])[];
      conclusion: string;
    };
    installedFlow: {
      title: string;
      paragraphs: readonly [string, string];
      figure: ArticleFigure;
      link: ArticleLink;
    };
    selfPriming: {
      title: string;
      introduction: string;
      items: readonly string[];
    };
    waste: { title: string; paragraphs: readonly string[] };
    compatibility: {
      title: string;
      introduction: string;
      items: readonly string[];
      notice: ArticleNotice;
    };
    serviceLife: {
      title: string;
      paragraphs: readonly string[];
      link: ArticleLink;
    };
    pulsation: { title: string; paragraphs: readonly string[] };
    installation: {
      title: string;
      introduction: string;
      items: readonly string[];
    };
    alternatives: {
      title: string;
      introduction: string;
      headers: readonly string[];
      rows: readonly (readonly string[])[];
      linkPrefix: string;
      linkSuffix?: string;
      productLabels: readonly [string, string, string, string];
    };
    validation: {
      title: string;
      items: readonly string[];
      notice: ArticleNotice;
    };
    conclusion: {
      title: string;
      paragraphs: readonly string[];
      notice: ArticleNotice;
    };
  };
  faqTitle: string;
  faqItems: readonly EngineeringArticleFaqItem[];
  cta: ArticleCta;
};

const MOTOR_ASSET_BASE =
  "/images/resources/technical-articles/brushed-vs-brushless-diaphragm-pump-3000h-10000h";
const LIFE_SCIENCE_ASSET_BASE =
  "/images/resources/technical-articles/life-science-instrument-dpl60-diaphragm-pump-selection-guide";

const paragraphs = (items: readonly string[]): EngineeringArticleBlock[] =>
  items.map((text) => ({ type: "paragraph", text }));

function notice(item: ArticleNotice): EngineeringArticleBlock {
  return { type: "notice", ...item };
}

function figure(
  assetBase: string,
  filename: string,
  width: number,
  height: number,
  content: ArticleFigure,
): EngineeringArticleBlock {
  return {
    type: "figure",
    src: `${assetBase}/${filename}`,
    width,
    height,
    ...content,
  };
}

function section(
  title: string,
  blocks: EngineeringArticleBlock[],
): EngineeringArticleSection {
  return { title, blocks };
}

function articleLink(
  locale: string,
  path: string,
  content: ArticleLink,
): EngineeringArticleBlock {
  return {
    type: "links",
    items: [{ ...content, href: `/${locale}${path}` }],
  };
}

export function createLocalizedMotorArticle(
  locale: string,
  content: MotorArticleContent,
): DiaphragmPumpEngineeringArticleCopy {
  const { sections } = content;

  return {
    metadata: {
      ...content.metadata,
      coverImage: `${MOTOR_ASSET_BASE}/article-cover-${locale}.webp`,
    },
    deck: content.deck,
    leadBlocks: paragraphs(content.lead),
    sections: [
      section(sections.referenceLife.title, [
        ...paragraphs(sections.referenceLife.paragraphs),
        notice(sections.referenceLife.notice),
      ]),
      section(sections.commutation.title, [
        ...paragraphs([sections.commutation.paragraph]),
        figure(
          MOTOR_ASSET_BASE,
          "brushed-vs-brushless-commutation-en.webp",
          1672,
          941,
          sections.commutation.figure,
        ),
      ]),
      section(sections.brushedLife.title, [
        ...paragraphs(sections.brushedLife.introduction),
        { type: "list", items: sections.brushedLife.factors },
        ...paragraphs([sections.brushedLife.conclusion]),
      ]),
      section(sections.brushlessLife.title, [
        ...paragraphs(sections.brushlessLife.paragraphs),
        figure(
          MOTOR_ASSET_BASE,
          "brushed-brushless-lifetime-mechanism-en.webp",
          1448,
          1086,
          sections.brushlessLife.figure,
        ),
      ]),
      section(sections.wholePump.title, [
        ...paragraphs(sections.wholePump.paragraphs),
        notice(sections.wholePump.notice),
      ]),
      section(sections.operatingFactors.title, [
        { type: "list", items: sections.operatingFactors.items },
      ]),
      section(sections.selection.title, [
        ...paragraphs(sections.selection.paragraphs),
        {
          type: "table",
          headers: sections.selection.headers,
          rows: sections.selection.rows,
        },
        figure(
          MOTOR_ASSET_BASE,
          "brushed-brushless-selection-flowchart-en.webp",
          1448,
          1086,
          sections.selection.figure,
        ),
      ]),
      section(sections.accumulatedHours.title, [
        ...paragraphs([sections.accumulatedHours.introduction]),
        { type: "formula", expression: sections.accumulatedHours.formula },
        ...paragraphs(sections.accumulatedHours.paragraphs),
        articleLink(
          locale,
          "/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life",
          sections.accumulatedHours.link,
        ),
      ]),
      section(sections.conclusion.title, paragraphs(sections.conclusion.paragraphs)),
    ],
    faqTitle: content.faqTitle,
    faqItems: content.faqItems,
    cta: content.cta,
  };
}

export function createLocalizedLifeScienceArticle(
  locale: string,
  content: LifeScienceArticleContent,
): DiaphragmPumpEngineeringArticleCopy {
  const { sections } = content;
  const productPaths = [
    "/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump",
    "/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump",
    "/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump",
    "/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump",
  ] as const;

  return {
    metadata: {
      ...content.metadata,
      coverImage: `${LIFE_SCIENCE_ASSET_BASE}/article-cover.webp`,
    },
    deck: content.deck,
    leadBlocks: paragraphs(content.lead),
    sections: [
      section(sections.tasks.title, [
        ...paragraphs([sections.tasks.introduction]),
        { type: "list", items: sections.tasks.items },
        figure(
          LIFE_SCIENCE_ASSET_BASE,
          "life-science-fluid-path.webp",
          1536,
          1024,
          sections.tasks.figure,
        ),
        notice(sections.tasks.notice),
      ]),
      section(sections.candidate.title, [
        ...paragraphs([sections.candidate.introduction]),
        figure(
          LIFE_SCIENCE_ASSET_BASE,
          "dpl60-product.webp",
          1200,
          675,
          sections.candidate.figure,
        ),
        {
          type: "table",
          headers: sections.candidate.headers,
          rows: sections.candidate.rows,
        },
        ...paragraphs([sections.candidate.conclusion]),
      ]),
      section(sections.installedFlow.title, [
        ...paragraphs([sections.installedFlow.paragraphs[0]]),
        figure(
          LIFE_SCIENCE_ASSET_BASE,
          "bench-vs-instrument-fluid-path.webp",
          1600,
          900,
          sections.installedFlow.figure,
        ),
        ...paragraphs([sections.installedFlow.paragraphs[1]]),
        articleLink(
          locale,
          "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide",
          sections.installedFlow.link,
        ),
      ]),
      section(sections.selfPriming.title, [
        ...paragraphs([sections.selfPriming.introduction]),
        { type: "list", items: sections.selfPriming.items },
      ]),
      section(sections.waste.title, paragraphs(sections.waste.paragraphs)),
      section(sections.compatibility.title, [
        ...paragraphs([sections.compatibility.introduction]),
        { type: "list", items: sections.compatibility.items },
        notice(sections.compatibility.notice),
      ]),
      section(sections.serviceLife.title, [
        ...paragraphs(sections.serviceLife.paragraphs),
        articleLink(
          locale,
          "/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life",
          sections.serviceLife.link,
        ),
      ]),
      section(sections.pulsation.title, paragraphs(sections.pulsation.paragraphs)),
      section(sections.installation.title, [
        ...paragraphs([sections.installation.introduction]),
        { type: "list", items: sections.installation.items },
      ]),
      section(sections.alternatives.title, [
        ...paragraphs([sections.alternatives.introduction]),
        {
          type: "table",
          headers: sections.alternatives.headers,
          rows: sections.alternatives.rows,
        },
        {
          type: "links",
          items: productPaths.map((path, index) => ({
            prefix: sections.alternatives.linkPrefix,
            label: sections.alternatives.productLabels[index],
            href: `/${locale}${path}`,
            ...(sections.alternatives.linkSuffix
              ? { suffix: sections.alternatives.linkSuffix }
              : {}),
          })),
        },
      ]),
      section(sections.validation.title, [
        { type: "list", items: sections.validation.items, ordered: true },
        notice(sections.validation.notice),
      ]),
      section(sections.conclusion.title, [
        ...paragraphs(sections.conclusion.paragraphs),
        notice(sections.conclusion.notice),
      ]),
    ],
    faqTitle: content.faqTitle,
    faqItems: content.faqItems,
    cta: content.cta,
  };
}
