import TubingDetailStaticPage, { getTubingMetadata } from "../../_components/TubingDetailStaticPage";
import RelatedResources from "@/components/common/related-resources/RelatedResources";
export const metadata = getTubingMetadata("fep-tubing");
export default function Page() {
  return <TubingDetailStaticPage slug="fep-tubing" afterContent={
    <RelatedResources sourceType="product" sourceId="fep-tubing" locale="zh-CN"
      relationKeys={["category:fep-tubing"]} includeRelatedArticles />
  } />;
}
