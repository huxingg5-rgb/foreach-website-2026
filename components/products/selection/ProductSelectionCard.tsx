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
  onToggleList: (product: ProductSelectionProductItem) => void;
};

function toDisplayText(value: unknown): string {
  if (value === null || value === undefined) return "";

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(toDisplayText).filter(Boolean).join(" / ");
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    const candidates = [
      record.label,
      record.zh,
      record.en,
      record.value,
      record.name,
      record.text,
      record.title,
    ];

    for (const candidate of candidates) {
      const text = toDisplayText(candidate);
      if (text) return text;
    }

    const firstValue = Object.values(record).map(toDisplayText).find(Boolean);
    return firstValue || "";
  }

  return "";
}


/*
  FINAL_CARD_HREF_GUARD_20260707

  卡片最终 href 出口保护：
  如果 EA / SM / TM 柱塞泵被错误传成 /products/probes/[slug]，
  在最终 <a> 前强制改回 /products/pumps/plunger-pumps/[slug]。
*/
function normalizeCardDetailHref(product: ProductSelectionProductItem, href: string): string {
  const rawHref = String(href || "").trim();

  const hrefSlug = rawHref
    .split("/")
    .filter(Boolean)
    .pop()
    ?.toLowerCase();

  const rawSlug = String(
    (product as any).detailSlug ||
      (product as any).slug ||
      (product as any).productId ||
      hrefSlug ||
      ""
  )
    .split("/")
    .filter(Boolean)
    .pop()
    ?.toLowerCase();

  if (rawSlug && /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(rawSlug)) {
    return `/products/pumps/plunger-pumps/${rawSlug}`;
  }

  if (
    rawHref.includes("/products/probes/") &&
    hrefSlug &&
    /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(hrefSlug)
  ) {
    return `/products/pumps/plunger-pumps/${hrefSlug}`;
  }

  return rawHref || "/products";
}


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
  const safeTitle = toDisplayText(title) || product.productId;
  const safeSubtitle = toDisplayText(subtitle);
  const safeDetailHref = normalizeCardDetailHref(product, detailHref);
  const cardSpecs = getProductCardSpecs(product)
    .map((spec) => toDisplayText(spec))
    .filter(Boolean);

  return (
    <article className="product-card" title={safeTitle}>
      <span className="selected-bar" />

      <div className="product-image" aria-label={safeTitle}>
        {product.imageCard ? (
          <img src={product.imageCard} alt={safeTitle} loading="lazy" />
        ) : (
          <div className="product-image-placeholder">暂无图片</div>
        )}
      </div>

      <div className="product-body">
        <h3 className="product-title">{safeTitle}</h3>

        {cardSpecs.length > 0 ? (
          <ul className="product-card-specs" aria-label={`${safeTitle} 关键参数`}>
            {cardSpecs.map((spec, index) => (
              <li key={`${safeTitle}-spec-${index}`}>{spec}</li>
            ))}
          </ul>
        ) : safeSubtitle ? (
          <p className="product-card-summary">{safeSubtitle}</p>
        ) : null}

        <div className="product-actions">
          <a className="product-link" href={safeDetailHref} target="_blank" rel="noopener noreferrer">
            {detailButtonText}
          </a>

          <button
            className={isAdded ? "list-toggle active" : "list-toggle"}
            type="button"
            onClick={() => {
              onToggleList(product);
            }}
          >
            {isAdded ? addedToListText : addToListText}
          </button>
        </div>
      </div>
    </article>
  );
}
