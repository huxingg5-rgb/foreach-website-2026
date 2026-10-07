"use client";

import { useId } from "react";

import type { ProductSelectionCategoryItem } from "./product-selection-ui.types";

type ProductCategoryTabsProps = {
  categories: ProductSelectionCategoryItem[];
  activeCategoryId: string;
  activeCategoryLabel: string;
  mobileCategoryOpen: boolean;
  mobileCategoryPrefix: string;
  onToggleMobileCategory: () => void;
  onCategoryChange: (categoryId: string) => void;
};

export default function ProductCategoryTabs({
  categories,
  activeCategoryId,
  activeCategoryLabel,
  mobileCategoryOpen,
  mobileCategoryPrefix,
  onToggleMobileCategory,
  onCategoryChange,
}: ProductCategoryTabsProps) {
  const categoryTabsId = useId();

  return (
    <section
      className={`category-tabs-wrap ${
        mobileCategoryOpen ? "is-mobile-open" : ""
      }`}
    >
      <button
        className="mobile-category-trigger"
        type="button"
        onClick={onToggleMobileCategory}
        aria-expanded={mobileCategoryOpen}
        aria-controls={categoryTabsId}
      >
        <span>
          {mobileCategoryPrefix}
          {activeCategoryLabel}
        </span>
        <span className="mobile-category-symbol" aria-hidden="true">
          {mobileCategoryOpen ? "−" : "+"}
        </span>
      </button>

      <div className="category-tabs" id={categoryTabsId}>
        {categories.map((category) => (
          <button
            className={`category-tab ${
              activeCategoryId === category.id ? "active" : ""
            }`}
            type="button"
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </section>
  );
}
