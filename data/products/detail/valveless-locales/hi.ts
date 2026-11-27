import { getHindiDraftLink, hindiEnglishFallbackSuffix } from "@/lib/i18n/draft-languages";
import type { ValvelessLocaleCopy } from "./types";
import copy from "./hi.json";

function localizeGuideLink(text: string) {
  return text.replace(/\[([^\]]+)\]\((\/en\/[^)]+)\)/g, (_, label: string, href: string) => {
    const link = getHindiDraftLink(href);
    return `[${label}${link.hrefLang === "en" ? hindiEnglishFallbackSuffix : ""}](${link.href})`;
  });
}

export const hi: ValvelessLocaleCopy = {
  ...copy,
  category: { ...copy.category, paragraphs: copy.category.paragraphs.map(localizeGuideLink) },
  single: { ...copy.single, paragraphs: copy.single.paragraphs.map(localizeGuideLink) },
};
