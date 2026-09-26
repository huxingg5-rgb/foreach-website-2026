/** Structured application copy. HTML and runtime rendering are kept out of the content source. */
export type ApplicationLink = { label: string; href: string; description?: string };
export type ApplicationInlineLink = { text: string; href: string; title?: string };
export type ApplicationBlock = (
  | { type: "paragraph"; text: string }
  | { type: "subheading"; title: string }
  | { type: "table"; caption: string; headers: readonly string[]; rows: readonly (readonly string[])[]; note?: string }
  | { type: "list"; items: readonly string[]; ordered?: boolean }
  | { type: "flow"; caption: string; nodes: readonly string[]; focusIndex?: number; note?: string }
  | { type: "callout"; title?: string; text: string }
  | { type: "links"; items: readonly ApplicationLink[] }
) & {
  references?: readonly string[];
  /** Explicit, first-occurrence links inside paragraph or callout copy. */
  inlineLinks?: readonly ApplicationInlineLink[];
};

export type ApplicationSection = { id: string; title: string; blocks: readonly ApplicationBlock[] };
export type ApplicationReference = { id: string; title: string; href: string };
export type ApplicationDocumentBody = {
  intro: readonly ApplicationBlock[];
  sections: readonly ApplicationSection[];
  references: readonly ApplicationReference[];
  related?: readonly ApplicationLink[];
};
export type ApplicationDocumentMetadata = {
  slug: string;
  kind: "hub" | "overview" | "task";
  /** Navigation branch. Empty for the industry hub; equal to slug for a group overview. */
  group?: string;
  title: string;
  navLabel: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  keywords: readonly string[];
};
export type ApplicationDocument = ApplicationDocumentBody & ApplicationDocumentMetadata;
