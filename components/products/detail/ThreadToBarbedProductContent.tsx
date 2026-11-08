import { registerFittingDetail } from "./fitting-detail-view";
import { getThreadBarbProduct } from "@/data/products/detail/thread-to-barbed-product.zh";

type ProductData = Parameters<typeof getThreadBarbProduct>[0];

export default function ThreadToBarbedProductContent({ data }: { data: ProductData }) {
  const content = getThreadBarbProduct(data);
  if (!content) return null;
  return <div className="fx-sec" id="fx-thread-barb-product-details" data-thread-barb-product={content.family}>
    <h2>产品细节与尺寸差异</h2>
    <p>从接口、倒刺外形和剖面结构，了解 {content.model} 与相关规格的差别。尺寸图按结构规格展示，材料与颜色以完整型号为准；点击图片可查看大图。</p>
    <div className="fx-row">
      <div>
        <h3>接头细节与型号区别</h3>
        <ul>{content.points.map(point => <li key={point.title}><strong>{point.title}：</strong>{point.text}</li>)}</ul>
      </div>
      <div className="fx-pics">{content.figures.map(figure => <figure key={figure.src}>
        <a href={figure.src} target="_blank" rel="noopener noreferrer" aria-label={`查看大图：${figure.alt}`}>
          {/* Keep dimension labels and original proportions, matching the hard-tube detail figures. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={figure.src} alt={figure.alt} width={1500} height={1500} loading="lazy" style={{ objectFit: "contain" }} />
        </a>
        <figcaption>{figure.caption}</figcaption>
      </figure>)}</div>
    </div>
  </div>;
}

// Pure server content: resolve the same Chinese template before translating its presentation.
registerFittingDetail(ThreadToBarbedProductContent);
