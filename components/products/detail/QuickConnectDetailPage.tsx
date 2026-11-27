import FittingLocalizedSelectionContent from "@/components/products/detail/FittingLocalizedSelectionContent";
import type { ComponentProps } from "react";
import type { GermanProductDetailContent } from "@/data/products/detail/product-detail-content.de";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import ProductDetailClient from "./ProductDetailClient";
import QuickConnectDetailContent from "./QuickConnectDetailContent";
import QuickConnectQ20ZhContent from "./QuickConnectQ20ZhContent";
import QuickConnectModelZhContent from "./QuickConnectModelZhContent";
import { withHindiQuickConnectConnection } from "@/data/products/detail/quick-connect-detail.hi";
import { withItalianQuickConnectConnection } from "@/data/products/detail/quick-connect-detail.it";
import { getQuickConnectRow } from "@/data/products/detail/quick-connect-model-guidance";
import QuickConnectRelatedArticles from "./QuickConnectRelatedArticles";

/** Shared composition for every quick-connect model and series detail page. */
export default function QuickConnectDetailPage({
  data,
  locale = "zh-CN",
  germanDetail,
  localizedDetail,
}: {
  data: ComponentProps<typeof ProductDetailClient>["data"];
  locale?: TechnicalArticleLocale;
  germanDetail?: GermanProductDetailContent;
  localizedDetail?: ComponentProps<typeof ProductDetailClient>["localizedDetail"];
}) {
  const showChineseSections = locale === "zh-CN";
  const showReviewedQ2001Content = showChineseSections && data.slug === "q2001-pmv-sacn";
  const showModelContent = showChineseSections && Boolean(getQuickConnectRow(data.model || ""));
  return (
    <ProductDetailClient
      key={`${locale}:${data.slug}`}
      data={localizedDetail?.locale === "it" ? withItalianQuickConnectConnection(data) : localizedDetail?.locale === "hi" ? withHindiQuickConnectConnection(data) : data}
      germanDetail={germanDetail}
      localizedDetail={localizedDetail}
      customerCategoryMode="quick-connect-zh"
      customerCategoryContent={showReviewedQ2001Content ? {
        // Q2001 keeps its own reviewed Chinese content; other models use the shared template below.
        selection: <QuickConnectQ20ZhContent section="selection" />,
        delivery: <QuickConnectQ20ZhContent section="delivery" />,
      } : showChineseSections ? {
        selection: showModelContent ? <QuickConnectModelZhContent model={data.model!} section="selection" /> : <QuickConnectDetailContent data={data} section="selection" />,
        delivery: <QuickConnectDetailContent data={data} section="delivery" />,
      } : { selection: <FittingLocalizedSelectionContent data={{ ...data, productTypeId: "quick-connect-fittings" }} locale={locale} germanDraft={!!germanDetail} contentLocale={localizedDetail?.locale} /> }}
      afterContent={<QuickConnectRelatedArticles model={data.model} locale={locale} germanDraft={!!germanDetail} contentLocale={localizedDetail?.locale} />}
    />
  );
}
