"use client";

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
      >
        <span>
          {mobileCategoryPrefix}
          {activeCategoryLabel}
        </span>
        <span className="mobile-category-symbol">
          {mobileCategoryOpen ? "-" : "+"}
        </span>
      </button>

      <div className="category-tabs">
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
