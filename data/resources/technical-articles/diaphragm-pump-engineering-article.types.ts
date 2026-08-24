export type DiaphragmPumpEngineeringArticleSlug =
  | "diaphragm-pump-flow-pressure-curve-guide"
  | "micro-diaphragm-pump-continuous-duty-life";

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
  };
};
