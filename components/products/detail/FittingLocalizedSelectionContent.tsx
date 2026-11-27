import type { ComponentProps } from "react";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import QuickConnectDetailContent from "./QuickConnectDetailContent";
import QuickConnectQ20ZhContent from "./QuickConnectQ20ZhContent";
import QuickConnectModelZhContent from "./QuickConnectModelZhContent";
import HardTubeDetailContent from "./HardTubeDetailContent";
import HardTubePlugDetailContent from "./HardTubePlugDetailContent";
import { isHardTubePlug } from "@/data/products/detail/hard-tube-plugs";
import { getQuickConnectRow } from "@/data/products/detail/quick-connect-model-guidance";
import { italianQuickConnectSelectionText } from "@/data/products/detail/quick-connect-selection.it";
import { italianFemaleAdapterSelectionText } from "@/data/products/detail/female-adapter-selection.it";
import { italianCompactFittingSelectionText } from "@/data/products/detail/compact-fitting-selection.it";
import { italianLuerSelectionText } from "@/data/products/detail/luer-fitting-selection.it";
import { italianThreadToBarbedSelectionText } from "@/data/products/detail/thread-to-barbed-selection.it";
import { italianBarbedSelectionText } from "@/data/products/detail/barbed-fitting-selection.it";
import { hindiLuerSelectionText } from "@/data/products/detail/luer-fitting-selection.hi";
import { hindiQuickConnectSelectionText } from "@/data/products/detail/quick-connect-selection.hi";
import { hindiFemaleAdapterSelectionText } from "@/data/products/detail/female-adapter-selection.hi";
import { hindiCompactFittingSelectionText } from "@/data/products/detail/compact-fitting-selection.hi";
import { hindiThreadToBarbedSelectionText } from "@/data/products/detail/thread-to-barbed-selection.hi";
import { hindiBarbedSelectionText } from "@/data/products/detail/barbed-fitting-selection.hi";
import { hindiHardTubeSelectionText } from "@/data/products/detail/hard-tube-selection.hi";
import { italianHardTubeSelectionText } from "@/data/products/detail/hard-tube-selection.it";
import { fittingDetailText } from "@/data/products/detail/fitting-detail-copy.intl";
import { getGermanBarbedSelectionText } from "@/data/products/detail/barbed-fitting-selection.de";
import { getGermanRemainingFittingSelectionText } from "@/data/products/detail/remaining-fitting-selection.de";
import { getGermanHardTubeSelectionText } from "@/data/products/detail/hard-tube-selection.de";
import { getGermanThreadToBarbedSelectionText } from "@/data/products/detail/thread-to-barbed-selection.de";
import { fittingDetailView } from "./fitting-detail-view";
import styles from "./FittingLocalizedSelectionContent.module.css";

type Identity = ComponentProps<typeof QuickConnectDetailContent>["data"];

const germanSelectionText: Partial<Record<string, (value: string) => string>> = {
  "barbed-fittings": getGermanBarbedSelectionText,
  "hard-tube-fittings": getGermanHardTubeSelectionText,
  "thread-to-barbed-fittings": getGermanThreadToBarbedSelectionText,
  "bulkhead-barbed-fittings": getGermanRemainingFittingSelectionText,
  "female-thread-adapters": getGermanRemainingFittingSelectionText,
  "luer-fittings": getGermanRemainingFittingSelectionText,
  "quick-connect-fittings": getGermanRemainingFittingSelectionText,
  filters: getGermanRemainingFittingSelectionText,
  "check-valves": getGermanRemainingFittingSelectionText,
};

/** The exact Chinese product-detail template, including model-specific branches.
 * Articles remain related reading and never replace this selection content. */
export function fittingSelectionTemplate(data: Identity) {
  const type=data.productTypeId;
  if (type === "hard-tube-fittings") return <HardTubeDetailContent data={{...data,specs:data.specs?.filter(s=>s.label).map(s=>({label:s.label!,value:String(s.value??"")}))}} section="selection"/>;
  if (type === "quick-connect-fittings") {
    if (data.slug === "q2001-pmv-sacn") return <QuickConnectQ20ZhContent section="selection"/>;
    const model=data.model || data.foreachModel || "";
    if (getQuickConnectRow(model)) return <QuickConnectModelZhContent model={model} section="selection"/>;
    return <QuickConnectDetailContent data={data} section="selection"/>;
  }
  return <QuickConnectDetailContent data={data} section="selection" variant={type === "luer-fittings" ? "luer-fitting" : "standalone-fitting"}/>;
}

/** Server composition: only translated presentation is serialized to the page.
 * SKU lookup, source specs, component layout and engineering assets stay shared. */
export default function FittingLocalizedSelectionContent({data,locale,germanDraft = false,contentLocale: requestedContentLocale}:{data:Identity;locale:TechnicalArticleLocale;germanDraft?: boolean;contentLocale?: "it" | "hi"}) {
  if (data.productTypeId === "hard-tube-fittings" && isHardTubePlug(data)) return <HardTubePlugDetailContent data={data} locale={requestedContentLocale ?? locale} germanDraft={germanDraft} />;
  const content=fittingSelectionTemplate(data);
  if (locale === "zh-CN") return content;
  const germanText = germanDraft && data.productTypeId ? germanSelectionText[data.productTypeId] : undefined;
  const italianText = requestedContentLocale === "it" ? ({
    "hard-tube-fittings": italianHardTubeSelectionText,
    "barbed-fittings": italianBarbedSelectionText,
    "thread-to-barbed-fittings": italianThreadToBarbedSelectionText,
    "luer-fittings": italianLuerSelectionText,
    "bulkhead-barbed-fittings": italianCompactFittingSelectionText,
    "female-thread-adapters": italianFemaleAdapterSelectionText,
    "quick-connect-fittings": italianQuickConnectSelectionText,
    filters: italianCompactFittingSelectionText,
    "check-valves": italianCompactFittingSelectionText,
  } as Partial<Record<string, (value: string) => string>>)[data.productTypeId ?? ""] : undefined;
  const hindiText = requestedContentLocale === "hi" ? ({
    "hard-tube-fittings": hindiHardTubeSelectionText,
    "barbed-fittings": hindiBarbedSelectionText,
    "thread-to-barbed-fittings": hindiThreadToBarbedSelectionText,
    "quick-connect-fittings": hindiQuickConnectSelectionText,
    "luer-fittings": hindiLuerSelectionText,
    "female-thread-adapters": hindiFemaleAdapterSelectionText,
    "bulkhead-barbed-fittings": hindiCompactFittingSelectionText,
    filters: hindiCompactFittingSelectionText,
    "check-valves": hindiCompactFittingSelectionText,
  } as Partial<Record<string, (value: string) => string>>)[data.productTypeId ?? ""] : undefined;
  const contentLocale = germanText ? "de" : italianText ? "it" : hindiText ? "hi" : locale;
  return <div className={styles.content} lang={contentLocale === "hi" ? "hi-IN" : contentLocale} data-fitting-localized-selection={data.productTypeId} data-fitting-content-source="current-chinese-detail">
    {fittingDetailView(content,{locale:contentLocale,text:germanText ?? italianText ?? hindiText ?? (value=>fittingDetailText(value,locale))})}
  </div>;
}
