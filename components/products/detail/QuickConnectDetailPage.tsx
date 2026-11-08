import FittingLocalizedSelectionContent from "@/components/products/detail/FittingLocalizedSelectionContent";
import type { ComponentProps } from "react";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import ProductDetailClient from "./ProductDetailClient";
import QuickConnectDetailContent from "./QuickConnectDetailContent";
import QuickConnectQ20ZhContent from "./QuickConnectQ20ZhContent";
import QuickConnectModelZhContent from "./QuickConnectModelZhContent";
import { getQuickConnectRow } from "@/data/products/detail/quick-connect-model-guidance";
import QuickConnectRelatedArticles from "./QuickConnectRelatedArticles";

/** Shared composition for every quick-connect model and series detail page. */
export default function QuickConnectDetailPage({
  data,
  locale = "zh-CN",
}: {
  data: ComponentProps<typeof ProductDetailClient>["data"];
  locale?: TechnicalArticleLocale;
}) {
  const showChineseSections = locale === "zh-CN";
  const showReviewedQ2001Content = showChineseSections && data.slug === "q2001-pmv-sacn";
  const showModelContent = showChineseSections && Boolean(getQuickConnectRow(data.model || ""));
  return (
    <ProductDetailClient
      key={`${locale}:${data.slug}`}
      data={data}
      customerCategoryMode="quick-connect-zh"
      customerCategoryContent={showReviewedQ2001Content ? {
        // Q2001 keeps its own reviewed Chinese content; other models use the shared template below.
        selection: <QuickConnectQ20ZhContent section="selection" />,
        delivery: <QuickConnectQ20ZhContent section="delivery" />,
      } : showChineseSections ? {
        selection: showModelContent ? <QuickConnectModelZhContent model={data.model!} section="selection" /> : <QuickConnectDetailContent data={data} section="selection" />,
        delivery: <QuickConnectDetailContent data={data} section="delivery" />,
      } : { selection: <FittingLocalizedSelectionContent data={{ ...data, productTypeId: "quick-connect-fittings" }} locale={locale} /> }}
      afterContent={<QuickConnectRelatedArticles model={data.model} locale={locale} />}
    />
  );
}
