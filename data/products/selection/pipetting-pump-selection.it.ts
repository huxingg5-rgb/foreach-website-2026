import { getPipettingCopy, type PipettingPageKey } from "./pipetting-pump-seo";
import copy from "./pipetting-pump-selection.it.json";

const italian: Readonly<Record<string, string>> = copy;

export function getItalianPipettingSelectionCopy(key: PipettingPageKey) {
  const source = getPipettingCopy("en", key);
  const text = (english: string) => italian[english] ?? english;
  return {
    title: text(source.title),
    paragraphs: source.paragraphs.map(text),
    seoTitle: text(source.seoTitle),
    description: text(source.description),
    imageAlt: text(source.imageAlt),
  };
}
