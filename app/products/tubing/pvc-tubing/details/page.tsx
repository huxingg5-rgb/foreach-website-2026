import TubingDetailStaticPage, { getTubingMetadata } from "../../_components/TubingDetailStaticPage";
import RelatedResources from "@/components/common/related-resources/RelatedResources";
export const metadata = getTubingMetadata("pvc-tubing");
export default function Page() {
  return <TubingDetailStaticPage slug="pvc-tubing" afterContent={
    <RelatedResources sourceType="product" sourceId="pvc-tubing" locale="zh-CN"
      relationKeys={["category:pvc-tubing"]} includeRelatedArticles />
  } />;
}
