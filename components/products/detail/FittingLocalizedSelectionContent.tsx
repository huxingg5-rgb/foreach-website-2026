import type { ComponentProps } from "react";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import QuickConnectDetailContent from "./QuickConnectDetailContent";
import QuickConnectQ20ZhContent from "./QuickConnectQ20ZhContent";
import QuickConnectModelZhContent from "./QuickConnectModelZhContent";
import HardTubeDetailContent from "./HardTubeDetailContent";
import HardTubePlugDetailContent from "./HardTubePlugDetailContent";
import { isHardTubePlug } from "@/data/products/detail/hard-tube-plugs";
import { getQuickConnectRow } from "@/data/products/detail/quick-connect-model-guidance";
import { fittingDetailText } from "@/data/products/detail/fitting-detail-copy.intl";
import { fittingDetailView } from "./fitting-detail-view";
import styles from "./FittingLocalizedSelectionContent.module.css";

type Identity = ComponentProps<typeof QuickConnectDetailContent>["data"];

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
export default function FittingLocalizedSelectionContent({data,locale}:{data:Identity;locale:TechnicalArticleLocale}) {
  if (data.productTypeId === "hard-tube-fittings" && isHardTubePlug(data)) return <HardTubePlugDetailContent data={data} locale={locale} />;
  const content=fittingSelectionTemplate(data);
  if (locale === "zh-CN") return content;
  return <div className={styles.content} lang={locale} data-fitting-localized-selection={data.productTypeId} data-fitting-content-source="current-chinese-detail">
    {fittingDetailView(content,{locale,text:value=>fittingDetailText(value,locale)})}
  </div>;
}
