"use client";

import type { TubingAssemblyCard } from "@/data/products/tubing-assembly-cards.en";
import { trackProductSelect } from "@/lib/analytics/track-event";
import styles from "./tubing-assembly-cards.module.css";
import type { TubingAssemblyUi } from "@/data/products/tubing-assemblies/localized";

export default function TubingAssemblyCardGrid({ products, selectedList, onToggleList, locale, copy }: {
  products: TubingAssemblyCard[];
  selectedList: ReadonlySet<string>;
  onToggleList: (product: TubingAssemblyCard) => void;
  locale: string;
  copy: Pick<TubingAssemblyUi, "details" | "added" | "addToList">;
}) {
  return <div className="product-grid">
    {products.map((product, index) => <article className={`product-card ${styles.card}`} key={product.productId} data-product-type-id={product.productTypeId}>
      <span className="selected-bar" />
      <div className={`product-image ${styles.image}`}>
        {/* Reference images show connection structures, not every configuration. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.imageCard} alt={product.imageAlt} width={product.imageWidth} height={product.imageHeight} loading="lazy" decoding="async" />
      </div>
      <div className={`product-body ${styles.body}`}>
        <h2 className={`product-title ${styles.title}`}>{product.cardTitle}</h2>
        <p className={`product-card-summary ${styles.summary}`}>{product.cardSubtitle}</p>
        {product.specs.length > 0 && <dl className={styles.specs}>
          {product.specs.map(spec => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}
        </dl>}
        <div className={`product-actions ${product.specs.length === 0 ? styles.actions : ""}`}>
          <a className="product-link" href={product.detailHref} target="_blank" rel="noopener noreferrer" onClick={() => trackProductSelect({
            productId: product.productId, productName: product.cardTitle,
            category: product.categoryId, subcategory: product.productTypeId,
            listId: "product_selection:tubing-assemblies", listName: "product_selection_results", index, locale,
          })}>{copy.details}</a>
          <button className={selectedList.has(product.productId) ? "list-toggle active" : "list-toggle"} type="button" onClick={() => onToggleList(product)}>
            {selectedList.has(product.productId) ? copy.added : copy.addToList}
          </button>
        </div>
      </div>
    </article>)}
  </div>;
}
