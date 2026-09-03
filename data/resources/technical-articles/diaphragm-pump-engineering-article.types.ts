export type DiaphragmPumpEngineeringArticleSlug =
  | "ink-circulation-supply-return-pump-diaphragm-pump"
  | "300-vs-600-ml-min-ink-circulation-return-pump-selection"
  | "white-ink-circulation-pump-selection-sedimentation"
  | "ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump"
  | "ivd-cleaning-wash-rinse-pump-diaphragm-pump"
  | "diaphragm-pump-flow-pressure-curve-guide"
  | "micro-diaphragm-pump-continuous-duty-life"
  | "life-science-dpl60-600ml-min-diaphragm-pump-selection-guide"
  | "brushed-vs-brushless-diaphragm-pump-3000h-10000h"
  | "lab-liquid-waste-aspiration-troubleshooting"
  | "ivd-waste-aspiration-liquid-pump-vs-vacuum-pump"
  | "300-vs-600-ml-min-diaphragm-pump-selection"
  | "300-ml-min-diaphragm-pump-flow-margin"
  | "tube-inner-diameter-affects-diaphragm-pump-flow"
  | "suction-vs-discharge-resistance-diaphragm-pump"
  | "diaphragm-pump-pressure-rating-terms"
  | "100-kpa-vs-600-kpa-diaphragm-pump-selection"
  | "high-backpressure-fluid-path-pressure-budget"
  | "300-ml-min-micro-liquid-diaphragm-pump-self-priming-loss"
  | "300-ml-min-micro-liquid-diaphragm-pump-motor-runs-no-flow"
  | "300-ml-min-micro-liquid-diaphragm-pump-water-vs-reagent"
  | "300-ml-min-micro-liquid-diaphragm-pump-epdm-ptfe-ffkm";

export type EngineeringArticleFaqItem = {
  question: string;
  answer: string;
};

export type EngineeringArticleLink = {
  href: string;
  label: string;
  prefix?: string;
  suffix?: string;
};

export type EngineeringArticleBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "notice";
      text: string;
      label?: string;
    }
  | {
      type: "formula";
      expression: string;
      note?: string;
    }
  | {
      type: "table";
      headers: readonly string[];
      rows: readonly (readonly string[])[];
    }
  | {
      type: "figure";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption: string;
    }
  | {
      type: "subheading";
      title: string;
    }
  | {
      type: "list";
      items: readonly string[];
      ordered?: boolean;
    }
  | {
      type: "links";
      items: readonly EngineeringArticleLink[];
    };

export type EngineeringArticleSection = {
  title: string;
  blocks: readonly EngineeringArticleBlock[];
};

export type DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: string;
    seoTitle: string;
    seoDescription: string;
    coverImage: string;
    coverAlt: string;
  };
  deck: string;
  leadBlocks: readonly EngineeringArticleBlock[];
  sections: readonly EngineeringArticleSection[];
  faqTitle: string;
  faqItems: readonly EngineeringArticleFaqItem[];
  cta: {
    title: string;
    description: string;
    contactLabel: string;
    productsLabel: string;
    productsHref?: string;
  };
};
