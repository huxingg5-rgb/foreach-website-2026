"use client";

import ProductSelectionCard from "./ProductSelectionCard";
import type { ProductSelectionProductItem } from "./product-selection-ui.types";

type ProductCardGridProps = {
  products: ProductSelectionProductItem[];
  selectedList: ReadonlySet<string>;
  detailButtonText: string;
  addToListText: string;
  addedToListText: string;
  getTitle: (product: ProductSelectionProductItem) => string;
  getSubtitle: (product: ProductSelectionProductItem) => string;
  getDetailHref: (product: ProductSelectionProductItem) => string;
  onToggleList: (product: ProductSelectionProductItem) => void;
};

export default function ProductCardGrid({
  products,
  selectedList,
  detailButtonText,
  addToListText,
  addedToListText,
  getTitle,
  getSubtitle,
  getDetailHref,
  onToggleList,
}: ProductCardGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => {
        const title = getTitle(product);
        const subtitle = getSubtitle(product);

        return (
          <ProductSelectionCard
            product={product}
            title={title}
            subtitle={subtitle}
            detailHref={getDetailHref(product)}
            isAdded={selectedList.has(product.productId)}
            detailButtonText={detailButtonText}
            addToListText={addToListText}
            addedToListText={addedToListText}
            key={product.productId}
            onToggleList={onToggleList}
          />
        );
      })}
    </div>
  );
}
