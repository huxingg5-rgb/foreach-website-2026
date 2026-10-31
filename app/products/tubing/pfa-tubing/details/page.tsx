import TubingDetailStaticPage, { getTubingMetadata } from "../../_components/TubingDetailStaticPage";
import RelatedProducts from "@/components/common/related-resources/RelatedProducts";
import RelatedResources from "@/components/common/related-resources/RelatedResources";
import { getPfaTubingAssemblyRelatedProducts } from "@/data/products/tubing-assemblies/related-products";

const pfaAssemblyProducts = getPfaTubingAssemblyRelatedProducts("zh-CN");

export const metadata = getTubingMetadata("pfa-tubing");
export default function Page() {
  return <TubingDetailStaticPage slug="pfa-tubing" afterContent={
    <>
      <RelatedResources sourceType="product" sourceId="pfa-tubing" locale="zh-CN"
        relationKeys={["category:pfa-tubing"]} includeRelatedArticles />
      <RelatedProducts locale="zh-CN" products={pfaAssemblyProducts} />
    </>
  } />;
}
