export type FaqCategory = {
  key: string;
  label: string;
  section: "产品问题" | "服务支持";
  children: { key: string; label: string; aliases?: string[] }[];
};

export type FaqItem = {
  id: string;
  category: string;
  subcategory: string;
  question: string;
  answer: string[];
  tags: string[];
  aliases: string[];
  links: { label: string; href: string }[];
};

export type ReviewedFaqItem = FaqItem & {
  evidence: { source: string; intent: string; note: string; sourceQuestion?: string };
};
