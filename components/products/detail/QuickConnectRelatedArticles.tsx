import FittingRelatedResources from "./FittingRelatedResources";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

export default function QuickConnectRelatedArticles({
  model,
  locale = "zh-CN",
}: {
  model?: string;
  locale?: TechnicalArticleLocale;
}) {
  return <FittingRelatedResources
    productTypeId="quick-connect-fittings"
    model={model}
    locale={locale}
  />;
}
