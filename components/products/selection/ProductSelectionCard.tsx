"use client";

import type { ProductSelectionProductItem } from "./product-selection-ui.types";
import { getProductCardSpecs } from "@/data/products/selection/card-copy/plunger-pump-card-copy";

type ProductSelectionCardProps = {
  product: ProductSelectionProductItem;
  title: string;
  subtitle: string;
  detailHref: string;
  isAdded: boolean;
  detailButtonText: string;
  addToListText: string;
  addedToListText: string;
  onToggleList: (productId: string) => void;
};

export default function ProductSelectionCard({
  product,
  title,
  subtitle,
  detailHref,
  isAdded,
  detailButtonText,
  addToListText,
  addedToListText,
  onToggleList,
}: ProductSelectionCardProps) {

  const cardSpecs = getProductCardSpecs(product);

  return (
    <article className="product-card" title={title}>
      <span className="selected-bar" />

      <div className="product-image" aria-label={title}>
        {product.imageCard ? (
          <img src={product.imageCard} alt={title} loading="lazy" />
        ) : (
          <div className="product-image-placeholder">鏆傛棤鍥剧墖</div>
        )}
      </div>

      <div className="product-body">
        <h3 className="product-title">{title}</h3>
        {cardSpecs.length > 0 ? (
          <ul className="product-card-specs" aria-label={`${title} 核心参数`}>
            {cardSpecs.map((spec) => (
              <li key={spec.label}>{spec.label}</li>
            ))}
          </ul>
        ) : null}

        <div className="product-actions">
          <a
            className="product-link"
            href={detailHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {detailButtonText}
          </a>

          <button
            className={`list-toggle ${isAdded ? "active" : ""}`}
            type="button"
            onClick={() => onToggleList(product.productId)}
          >
            {isAdded ? addedToListText : addToListText}
          </button>
        </div>
      </div>
    </article>
  );
}




