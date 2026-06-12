"use client";

import ProductFilterGroup from "./ProductFilterGroup";

import type {
  ProductSelectionCategoryItem,
  ProductSelectionFilterGroup,
} from "./product-selection-ui.types";

type ProductFilterPanelProps = {
  activeCategory: ProductSelectionCategoryItem;
  filterGroups: ProductSelectionFilterGroup[];
  mobileOpenFilterGroups: Record<string, boolean>;
  emptyText: string;
  resetButtonText: string;
  submitButtonText: string;
  onToggleMobileGroup: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
  onResetFilters: () => void;
};

export default function ProductFilterPanel({
  activeCategory,
  filterGroups,
  mobileOpenFilterGroups,
  emptyText,
  resetButtonText,
  submitButtonText,
  onToggleMobileGroup,
  isOptionActive,
  onFilterChange,
  onResetFilters,
}: ProductFilterPanelProps) {
  return (
    <aside className="filter-panel">
      <div className="filter-panel-head">
        <h2>{activeCategory.label}</h2>
        <p>{activeCategory.description}</p>
      </div>

      {filterGroups.length > 0 ? (
        filterGroups.map((group) => (
          <ProductFilterGroup
            group={group}
            mobileOpen={Boolean(mobileOpenFilterGroups[group.key])}
            key={group.key}
            onToggleMobileGroup={onToggleMobileGroup}
            isOptionActive={isOptionActive}
            onFilterChange={onFilterChange}
          />
        ))
      ) : (
        <div className="filter-empty">{emptyText}</div>
      )}

      <div className="filter-panel-actions">
        <button type="button" onClick={onResetFilters}>
          {resetButtonText}
        </button>
        <button type="button">{submitButtonText}</button>
      </div>
    </aside>
  );
}
