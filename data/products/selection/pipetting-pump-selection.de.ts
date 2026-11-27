import { getPipettingCopy, type PipettingPageKey } from "./pipetting-pump-seo";
import copy from "./pipetting-pump-selection.de.json";

const german: Readonly<Record<string, string>> = copy;

export function getGermanPipettingSelectionCopy(key: PipettingPageKey) {
  const source = getPipettingCopy("en", key);
  const text = (value: string) => german[value] ?? value;
  return {
    title: text(source.title),
    paragraphs: source.paragraphs.map(text),
    seoTitle: text(source.seoTitle),
    description: text(source.description),
    imageAlt: text(source.imageAlt),
  };
}
