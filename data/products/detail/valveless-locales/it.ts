import { getItalianDraftLink } from "@/lib/i18n/draft-languages";
import { getRplSelectionGuide } from "@/data/resources/technical-articles/rpl-selection-links";
import { getValvelessPumpNames } from "../valveless-pump-names";
import copy from "./it.json";
import type { ValvelessLocaleCopy } from "./types";

const guideHref = getRplSelectionGuide("en").href;
const guideLink = getItalianDraftLink(guideHref);

function localizeGuideLink(text: string) {
  return text.replace(guideHref, guideLink.href);
}

export const it: ValvelessLocaleCopy = {
  ...getValvelessPumpNames("it"),
  ...copy,
  category: { ...copy.category, paragraphs: copy.category.paragraphs.map(localizeGuideLink) },
  single: { ...copy.single, paragraphs: copy.single.paragraphs.map(localizeGuideLink) },
};
