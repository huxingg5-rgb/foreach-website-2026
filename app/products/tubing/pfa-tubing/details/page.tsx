import TubingDetailStaticPage, { getTubingMetadata } from "../../_components/TubingDetailStaticPage";
import RelatedResources from "@/components/common/related-resources/RelatedResources";
export const metadata = getTubingMetadata("pfa-tubing");
export default function Page() {
  return <TubingDetailStaticPage slug="pfa-tubing" afterContent={
    <RelatedResources sourceType="product" sourceId="pfa-tubing" locale="zh-CN"
      relationKeys={["category:pfa-tubing"]} includeRelatedArticles />
  } />;
}
