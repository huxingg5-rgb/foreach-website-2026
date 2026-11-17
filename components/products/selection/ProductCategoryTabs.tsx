"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import categoryTabStyles from "@/components/common/product-category-tab.module.css";

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
  const categoryTabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const revealActiveCategory = () => {
      if (window.innerWidth > 760) return;

      const tabs = categoryTabsRef.current;
      const activeTab = tabs?.querySelector<HTMLElement>(".category-tab.active");
      if (!tabs || !activeTab) return;

      const tabsBounds = tabs.getBoundingClientRect();
      const activeBounds = activeTab.getBoundingClientRect();
      if (activeBounds.left < tabsBounds.left) {
        tabs.scrollLeft += activeBounds.left - tabsBounds.left;
      } else if (activeBounds.right > tabsBounds.right) {
        tabs.scrollLeft += activeBounds.right - tabsBounds.right;
      }
    };

    revealActiveCategory();
    window.addEventListener("resize", revealActiveCategory);
    return () => window.removeEventListener("resize", revealActiveCategory);
  }, [activeCategoryId, activeCategoryLabel]);

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

      <div className="category-tabs" id={categoryTabsId} ref={categoryTabsRef}>
        {categories.map((category) => (
          category.href ? <Link
            key={category.id}
            className={`${categoryTabStyles.tab} category-tab ${activeCategoryId === category.id ? "active" : ""}`}
            href={category.href}
            prefetch={false}
            aria-current={activeCategoryId === category.id ? "page" : undefined}
          >{category.label}</Link> :
          <button
            className={`${categoryTabStyles.tab} category-tab ${
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
