import FittingRelatedResources from "./FittingRelatedResources";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

export default function QuickConnectRelatedArticles({
  model,
  locale = "zh-CN",
  germanDraft = false,
  contentLocale,
}: {
  model?: string;
  locale?: TechnicalArticleLocale;
  germanDraft?: boolean;
  contentLocale?: "it" | "hi";
}) {
  return <FittingRelatedResources
    productTypeId="quick-connect-fittings"
    model={model}
    locale={locale}
    germanDraft={germanDraft}
    contentLocale={contentLocale}
  />;
}
