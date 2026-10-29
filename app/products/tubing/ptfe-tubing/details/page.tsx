import TubingDetailStaticPage, { getTubingMetadata } from "../../_components/TubingDetailStaticPage";
import RelatedResources from "@/components/common/related-resources/RelatedResources";
export const metadata = getTubingMetadata("ptfe-tubing");
export default function Page() {
  return <TubingDetailStaticPage slug="ptfe-tubing" afterContent={
    <RelatedResources sourceType="product" sourceId="ptfe-tubing" locale="zh-CN"
      relationKeys={["category:ptfe-tubing"]} includeRelatedArticles />
  } />;
}
