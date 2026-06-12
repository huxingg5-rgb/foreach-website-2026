"use client";

import type { ProductSelectionSelectedTag } from "./product-selection-ui.types";

type ProductSelectionToolbarProps = {
  total: number;
  resultPrefix: string;
  resultSuffix: string;
  resetButtonText: string;
  selectedTags: ProductSelectionSelectedTag[];
  onRemoveTag: (
    key: ProductSelectionSelectedTag["key"],
    value: string
  ) => void;
  onResetFilters: () => void;
};

export default function ProductSelectionToolbar({
  total,
  resultPrefix,
  resultSuffix,
  resetButtonText,
  selectedTags,
  onRemoveTag,
  onResetFilters,
}: ProductSelectionToolbarProps) {
  return (
    <div className="product-toolbar">
      <div>
        <div className="toolbar-summary">
          {resultPrefix}
          {total}
          {resultSuffix}
        </div>

        <div className="selected-tags">
          {selectedTags.map((item) => (
            <span className="selected-tag" key={`${item.key}-${item.value}`}>
              {item.label}
              <button
                type="button"
                aria-label={`remove ${item.label}`}
                onClick={() => onRemoveTag(item.key, item.value)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <button className="toolbar-reset" type="button" onClick={onResetFilters}>
        {resetButtonText}
      </button>
    </div>
  );
}
