import type {
  TechnicalArticleItem,
  TechnicalArticleLocale,
} from "./technical-articles.types";

export type PistonPumpArticleLocale = Exclude<
  TechnicalArticleLocale,
  "zh-CN"
>;

export type PistonPumpArticleLink = {
  prefix?: string;
  label: string;
  href: string;
  suffix?: string;
};

export type PistonPumpArticlePart =
  | { type: "paragraph"; text: string }
  | { type: "notice"; label?: string; text: string }
  | { type: "formula"; expression: string; note: string }
  | { type: "bullets"; items: readonly string[] }
  | {
      type: "steps";
      items: readonly { label: string; text: string }[];
    }
  | {
      type: "table";
      headers: readonly string[];
      rows: readonly (readonly string[])[];
    }
  | {
      type: "subsections";
      items: readonly {
        title: string;
        paragraphs: readonly string[];
      }[];
    }
  | {
      type: "figures";
      items: readonly {
        src: string;
        alt: string;
        caption: string;
        width: number;
        height: number;
      }[];
    }
  | { type: "links"; items: readonly PistonPumpArticleLink[] };

export type PistonPumpArticleSection = {
  title: string;
  parts: readonly PistonPumpArticlePart[];
};

export type PistonPumpArticleCopy = {
  slug: string;
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  date: string;
  coverImage: string;
  coverAlt: string;
  intro: readonly PistonPumpArticlePart[];
  sections: readonly PistonPumpArticleSection[];
  faqTitle?: string;
  faq?: readonly { question: string; answer: string }[];
  conclusion?: {
    title: string;
    parts: readonly PistonPumpArticlePart[];
  };
  referencesTitle?: string;
  references?: readonly { label: string; href: string }[];
  cta: {
    title: string;
    description: string;
    contactLabel: string;
    productsLabel: string;
  };
  subject: {
    about: readonly string[];
    mentions: readonly string[];
  };
};

function partToSearchText(part: PistonPumpArticlePart) {
  if (part.type === "paragraph") return part.text;
  if (part.type === "notice") return `${part.label ?? ""} ${part.text}`.trim();
  if (part.type === "formula") return `${part.expression} ${part.note}`;
  if (part.type === "bullets") return part.items.join("\n");
  if (part.type === "steps") {
    return part.items.map((item) => `${item.label}: ${item.text}`).join("\n");
  }
  if (part.type === "table") {
    return [part.headers.join(" | "), ...part.rows.map((row) => row.join(" | "))].join("\n");
  }
  if (part.type === "subsections") {
    return part.items
      .map((item) => `${item.title}\n${item.paragraphs.join("\n")}`)
      .join("\n");
  }
  if (part.type === "figures") {
    return part.items.map((item) => `${item.alt} ${item.caption}`).join("\n");
  }
  return part.items
    .map((item) => `${item.prefix ?? ""}${item.label}${item.suffix ?? ""}`)
    .join("\n");
}

export function pistonPumpCopyToArticle(
  copy: PistonPumpArticleCopy,
): TechnicalArticleItem {
  const introText = copy.intro.map(partToSearchText).filter(Boolean).join("\n\n");
  const content = [
    {
      title: copy.title,
      content: introText,
    },
    ...copy.sections.map((section) => ({
      title: section.title,
      content: section.parts.map(partToSearchText).filter(Boolean).join("\n\n"),
    })),
    ...(copy.conclusion
      ? [
          {
            title: copy.conclusion.title,
            content: copy.conclusion.parts
              .map(partToSearchText)
              .filter(Boolean)
              .join("\n\n"),
          },
        ]
      : []),
  ];

  return {
    id: copy.slug,
    slug: copy.slug,
    category: "pumps-valves",
    title: copy.title,
    summary: copy.summary,
    date: copy.date,
    coverImage: copy.coverImage,
    coverAlt: copy.coverAlt,
    content,
    seoTitle: copy.seoTitle,
    seoDescription: copy.seoDescription,
  };
}
